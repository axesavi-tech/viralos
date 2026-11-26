import { ctx, route, json, requireWrite } from "@/lib/ctx";
import { charge, refund, settings } from "@/lib/credits";
import { complete, toMessages } from "@/lib/anthropic";
import { createJob } from "@/lib/jobs";
export const maxDuration = 300;
const ACTIONS = /^[a-z_0-9]{1,24}$/;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  const action = ACTIONS.test(b.action || "") ? b.action : "studio_ai";
  const s = await settings(c);
  const tier = b.opts?.modelTier === "complex" ? "text_model_complex" : b.opts?.modelTier === "quick" ? "text_model_quick" : "text_model";
  const model = s.providers[tier] || "claude-sonnet-5-5";
  const images = (b.images || []).filter((i: any) => /^image\/(png|jpeg|webp|gif)$/.test(i?.media_type) && typeof i.data === "string" && i.data.length < 7_000_000);
  const ch = await charge(c, action, 1, { model });
  const maxTokens = Math.min(16000, Number(b.opts?.maxTokens) || 12000);
  // With the AI worker running on our server, the call is queued and answered there, free of the hosting time limit;
  // the studio polls /api/jobs/<id>. Without a fresh worker heartbeat, answer directly as before.
  if (b.opts?.queue !== false && (await workerUp(c))) {
    try {
      const id = await createJob(c, "ai", "anthropic", { model, max_tokens: maxTokens, messages: toMessages(b.input, images) }, ch.amount, ch.ref, "queued" as any);
      return json({ job: id, credits: ch.amount, balance: ch.balance });
    } catch (e) { await refund(c, ch.ref); throw e; }
  }
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
