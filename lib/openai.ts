import "server-only";

/* OpenAI engine: live web research and post images through the Responses API.
   Long work runs in OpenAI's background mode, so no request waits on the 30-second hosting limit:
   we start a response, store its id in a job, and the studio's job polling picks up the result. */

const API = "https://api.openai.com/v1";
export const openaiReady = () => !!process.env.OPENAI_API_KEY;
const headers = () => ({ Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" });

async function call(path: string, init: RequestInit = {}, timeoutMs = 20000) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(API + path, { ...init, headers: { ...headers(), ...(init.headers || {}) }, signal: ctl.signal, cache: "no-store" });
    const j: any = await r.json().catch(() => ({}));
    if (!r.ok) { const e: any = new Error(j?.error?.message || `OpenAI returned ${r.status}`); e.status = r.status; e.code = r.status === 429 ? "rate_limited" : "provider_error"; throw e; }
    return j;
  } finally { clearTimeout(t); }
}

/* ---------- picking the newest model this account can use ---------- */
let modelCache: { at: number; ids: string[] } | null = null;
export async function models(): Promise<string[]> {
  if (modelCache && Date.now() - modelCache.at < 3_600_000) return modelCache.ids;
  try { const j = await call("/models", {}, 8000); modelCache = { at: Date.now(), ids: (j.data || []).map((m: any) => String(m.id)) }; }
  catch { modelCache = { at: Date.now() - 3_000_000, ids: [] }; } // retry in ~10 minutes
  return modelCache.ids;
}
const ver = (m: RegExpMatchArray) => Number(m[1]) * 1000 + Number(m[2] || 0);
const dated = /-\d{4}-\d{2}-\d{2}$/;

/** Best general model: the highest-numbered plain "gpt-N(.M)" (no mini, nano, audio, realtime, codex…). */
export function pickText(ids: string[], override?: string) {
  if (override) return override;
  const c = ids.filter((id) => !dated.test(id)).map((id) => ({ id, m: id.match(/^gpt-(\d+)(?:\.(\d+))?(?:-([a-z]+))?$/) }))
    .filter((x) => x.m && !/mini|nano|audio|realtime|search|codex|image|tts|transcribe|chat|instant|oss/.test(x.m[3] || ""));
  c.sort((a, b) => ver(b.m!) - ver(a.m!) || (a.m![3] ? 1 : 0) - (b.m![3] ? 1 : 0));
  return c[0]?.id || "gpt-5";
}
/** Best image model: the highest "gpt-image-N(.M)"; for edits prefer an editing-precision variant, otherwise the everyday one. */
export function pickImage(ids: string[], purpose: "generate" | "edit" = "generate", override?: string) {
  if (override) return override;
  const c = ids.filter((id) => !dated.test(id)).map((id) => ({ id, m: id.match(/^gpt-image-(\d+)(?:\.(\d+))?(?:-([a-z]+))?$/) })).filter((x) => x.m && x.m[3] !== "mini");
  const pref = (s?: string) => (!s ? 1 : purpose === "edit" ? (s === "sunburst" ? 0 : 2) : s === "flare" ? 0 : 2);
  c.sort((a, b) => ver(b.m!) - ver(a.m!) || pref(a.m![3]) - pref(b.m![3]));
  return c[0]?.id || "gpt-image-1";
}

/* ---------- background responses ---------- */
export async function startResearch(prompt: string, model: string, maxTokens = 12000) {
  const body: any = { model, input: prompt, tools: [{ type: "web_search" }], background: true, store: true, max_output_tokens: maxTokens };
  try { return (await call("/responses", { method: "POST", body: JSON.stringify(body) })).id as string; }
  catch (e: any) {
    if (e.status === 400 && /web_search/.test(e.message)) { body.tools = [{ type: "web_search_preview" }]; return (await call("/responses", { method: "POST", body: JSON.stringify(body) })).id as string; }
    throw e;
  }
}
export async function startImage(prompt: string, model: string, imageModel: string, size: string) {
  const tool: any = { type: "image_generation", model: imageModel, size, quality: "high" };
  const body: any = { model, input: prompt, tools: [tool], tool_choice: { type: "image_generation" }, background: true, store: true };
  try { return (await call("/responses", { method: "POST", body: JSON.stringify(body) })).id as string; }
  catch (e: any) {
    if (e.status === 400 && /model/.test(e.message)) { delete tool.model; return (await call("/responses", { method: "POST", body: JSON.stringify(body) })).id as string; }
    throw e;
  }
}

export type OaState = { state: "running" } | { state: "failed"; error: string } | { state: "done"; text: string; sources: { url: string; title: string }[]; searches: number; image?: string; truncated: boolean };
export async function poll(id: string): Promise<OaState> {
  const j = await call(`/responses/${encodeURIComponent(id)}`, {}, 15000);
  if (j.status === "queued" || j.status === "in_progress") return { state: "running" };
  if (j.status === "failed" || j.status === "cancelled") return { state: "failed", error: j.error?.message || `The research engine stopped (${j.status}).` };
  const out: any[] = j.output || [];
  const texts: string[] = []; const src = new Map<string, { url: string; title: string }>();
  for (const o of out) if (o.type === "message") for (const c of o.content || []) if (c.type === "output_text") {
    texts.push(c.text || "");
    for (const a of c.annotations || []) if (a.type === "url_citation" && /^https:\/\//.test(a.url || "")) src.set(a.url, { url: a.url, title: a.title || a.url });
  }
  for (const o of out) if (o.type === "web_search_call") for (const s of o.action?.sources || []) if (/^https:\/\//.test(s.url || "") && !src.has(s.url)) src.set(s.url, { url: s.url, title: s.title || s.url });
  const image = out.find((o) => o.type === "image_generation_call" && o.result)?.result;
  return { state: "done", text: texts.join("\n"), sources: [...src.values()], searches: out.filter((o) => o.type === "web_search_call").length, image, truncated: j.status === "incomplete" };
}
