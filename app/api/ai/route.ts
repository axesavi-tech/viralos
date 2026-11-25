import { ctx, route, json, requireWrite } from "@/lib/ctx";
import { charge, refund, settings } from "@/lib/credits";
import { complete, toMessages } from "@/lib/anthropic";
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
  try {
    const r = await complete(model, toMessages(b.input, images), { maxTokens: Math.min(16000, Number(b.opts?.maxTokens) || 12000) });
    return json({ text: r.text, truncated: r.truncated, credits: ch.amount, balance: ch.balance });
  } catch (e) { await refund(c, ch.ref); throw e; }
});
