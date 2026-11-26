// Kathavi AI worker: runs long Claude calls on the Supabase server, where there is no 30-second hosting limit.
// The web app queues a job in vx_jobs (provider 'anthropic'); this worker claims it, calls Claude and stores the
// answer; the studio polls /api/jobs/<id>. A heartbeat in vx_settings('ai_worker') tells the app the worker is up;
// without a fresh heartbeat the app falls back to answering directly.
import pg from "pg";

const KEY = process.env.ANTHROPIC_API_KEY;
const PARALLEL = Number(process.env.AI_WORKER_PARALLEL || 4);
const TIMEOUT_MS = Number(process.env.AI_WORKER_TIMEOUT_MS || 240000);
if (!KEY) { console.error("ANTHROPIC_API_KEY missing"); process.exit(1); }

// connection from PGHOST, PGUSER, PGPASSWORD, PGDATABASE
const pool = new pg.Pool({ max: PARALLEL + 2 });
const log = (...a) => console.log(new Date().toISOString(), ...a);

async function heartbeat() {
  await pool.query(
    `insert into public.vx_settings(key,value,updated_at) values('ai_worker', jsonb_build_object('at', now(), 'parallel', $1::int), now())
     on conflict (key) do update set value=excluded.value, updated_at=now()`, [PARALLEL]);
}

async function claim() {
  const r = await pool.query(
    `update public.vx_jobs set status='running', updated_at=now()
      where id = (select id from public.vx_jobs where provider='anthropic' and status='queued' order by created_at for update skip locked limit 1)
      returning id, request`);
  return r.rows[0] || null;
}

async function callClaude(req) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", signal: ctl.signal,
      headers: { "x-api-key": KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: req.model, max_tokens: req.max_tokens || 8000, system: req.system || undefined, messages: req.messages, tools: req.tools || undefined }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j?.error?.message || `Claude returned ${r.status}`);
    const blocks = (j.content || []).filter((b) => b.type === "text");
    const text = blocks.map((b) => b.text).join("");
    // web research: keep the pages Claude cited so the studio can show its sources
    const sources = new Map();
    const keep = (url, title) => { if (url && /^https:\/\//.test(url) && !sources.has(url)) sources.set(url, { url, title: title || url }); };
    blocks.forEach((b) => (b.citations || []).forEach((c) => keep(c.url, c.title)));
    // a JSON answer rarely carries citations, so also keep the pages the searches actually returned
    (j.content || []).filter((b) => b.type === "web_search_tool_result" && Array.isArray(b.content)).forEach((b) => b.content.forEach((r) => keep(r.url, r.title)));
    return { text, truncated: j.stop_reason === "max_tokens", usage: j.usage, sources: [...sources.values()], searches: j.usage?.server_tool_use?.web_search_requests || 0 };
  } finally { clearTimeout(t); }
}

async function work(job) {
  const t0 = Date.now();
  try {
    const out = await callClaude(job.request || {});
    // the request (with any images) is no longer needed once answered
    await pool.query(`update public.vx_jobs set status='done', result=$2, request=jsonb_build_object('model', request->'model'), updated_at=now() where id=$1`, [job.id, out]);
    log("done", job.id, Date.now() - t0, "ms");
  } catch (e) {
    const msg = e?.name === "AbortError" ? "The AI took too long to answer." : String(e?.message || e).slice(0, 300);
    await pool.query(`update public.vx_jobs set status='failed', error=$2, updated_at=now() where id=$1`, [job.id, msg]);
    log("failed", job.id, msg);
  }
}

let busy = 0;
async function loop() {
  while (busy < PARALLEL) {
    let job = null;
    try { job = await claim(); } catch (e) { log("claim error", e.message); break; }
    if (!job) break;
    busy++; work(job).finally(() => { busy--; });
  }
}

await heartbeat();
setInterval(() => heartbeat().catch((e) => log("heartbeat error", e.message)), 15000);
setInterval(() => loop().catch((e) => log("loop error", e.message)), 700);
log("Kathavi AI worker up, parallel", PARALLEL);
