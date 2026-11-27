import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { charge, refund, settings } from "@/lib/credits";
import { complete, toMessages } from "@/lib/anthropic";
import { createJob } from "@/lib/jobs";
import { lead } from "@/lib/engines";
import { startResearch } from "@/lib/openai";
import { openaiModelsFor } from "@/lib/engines";
export const maxDuration = 300;
const ACTIONS = /^[a-z_0-9]{1,24}$/;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  const research = !!b.opts?.research;
  const action = research ? "research" : ACTIONS.test(b.action || "") ? b.action : "studio_ai";
  const s = await settings(c);
  const tier = b.opts?.modelTier === "complex" ? "text_model_complex" : b.opts?.modelTier === "quick" ? "text_model_quick" : "text_model";
  const model = s.providers[tier] || "claude-sonnet-5-5";
  const images = (b.images || []).filter((i: any) => /^image\/(png|jpeg|webp|gif)$/.test(i?.media_type) && typeof i.data === "string" && i.data.length < 7_000_000);
  const ch = await charge(c, action, 1, { model });
  const maxTokens = Math.min(16000, Number(b.opts?.maxTokens) || 12000);
  const claudeTools = research ? [{ type: process.env.ANTHROPIC_WEB_SEARCH_TOOL || "web_search_20250305", name: "web_search", max_uses: Math.min(10, Number(b.opts?.searches) || 8) }] : undefined;
  const claudeReq = { model: research ? (s.providers.text_model || "claude-sonnet-5-5") : model, max_tokens: maxTokens, messages: toMessages(b.input, images), tools: claudeTools };

  // Research goes to the research engine (live web search, runs in the engine's background mode); if it can't start,
  // Claude with web search takes over through our worker. The job remembers the fallback in case the engine fails later.
  if (research && lead("research") === "openai" && typeof b.input === "string") {
    try {
      const m = await openaiModelsFor(s.providers);
      const rid = await startResearch(b.input, m.text, maxTokens);
      const id = await createJob(c, "ai", "openai", { openai: { id: rid, model: m.text }, fallback: claudeReq }, ch.amount, ch.ref, "running");
      return json({ job: id, credits: ch.amount, balance: ch.balance });
    } catch { /* fall through to Claude */ }
  }
  // With the AI worker running on our server, the call is queued and answered there, free of the hosting time limit;
  // the studio polls /api/jobs/<id>. Without a fresh worker heartbeat, answer directly as before.
  if (b.opts?.queue !== false && (await workerUp(c))) {
    try {
      const id = await createJob(c, "ai", "anthropic", claudeReq, ch.amount, ch.ref, "queued" as any);
      return json({ job: id, credits: ch.amount, balance: ch.balance });
    } catch (e) { await refund(c, ch.ref); throw e; }
  }
  if (research) { await refund(c, ch.ref); throw new HttpError(503, "Live research is not available right now. You were not charged.", "worker_down"); }
  try {
    const r = await complete(model, toMessages(b.input, images), { maxTokens });
    return json({ text: r.text, truncated: r.truncated, credits: ch.amount, balance: ch.balance });
  } catch (e) { await refund(c, ch.ref); throw e; }
});

let hb: { at: number; up: boolean } | null = null;
async function workerUp(c: Awaited<ReturnType<typeof ctx>>) {
  if (hb && Date.now() - hb.at < 10_000) return hb.up;
  const { data } = await c.sb.from("vx_settings").select("value").eq("key", "ai_worker").maybeSingle();
  const at = Date.parse((data?.value as any)?.at || "");
  hb = { at: Date.now(), up: Number.isFinite(at) && Date.now() - at < 45_000 };
  return hb.up;
}
