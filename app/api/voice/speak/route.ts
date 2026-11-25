import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { charge, refund } from "@/lib/credits";
import { speakScript, DEFAULT_STYLE, STOCK_VOICE } from "@/lib/eleven";
import { putFile } from "@/lib/storage";
export const maxDuration = 300;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  const text = String(b.text || "").trim().slice(0, 20000); if (!text) throw new HttpError(400, "Nothing to say.");
  let voice = STOCK_VOICE;
  if (b.voiceId && b.voiceId !== "stock") {
    const v = (await c.sb.from("vx_voices").select("el_voice_id").eq("workspace_id", c.ws).eq("id", b.voiceId).maybeSingle()).data;
    if (!v) throw new HttpError(400, "That voice has no consent record in this workspace.");
    voice = v.el_voice_id;
  }
  const ch = await charge(c, "tts_1k", Math.max(1, text.length / 1000));
  try {
    const audio = await speakScript(voice, text, { ...DEFAULT_STYLE, speed: Math.min(1.2, Math.max(0.8, Number(b.speed) || 1)) });
    const f = await putFile(c, audio, "audio/mpeg", "voice");
    return json({ url: f.url, credits: ch.amount, balance: ch.balance });
  } catch (e) { await refund(c, ch.ref); throw e; }
});
