import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { charge, refund, settings } from "@/lib/credits";
import { falSubmit } from "@/lib/fal";
import { speakScript, DEFAULT_STYLE } from "@/lib/eleven";
import { putFile, toPublicUrl } from "@/lib/storage";
import { createJob } from "@/lib/jobs";
export const maxDuration = 300;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  const script = String(b.script || "").trim(); if (script.length < 5) throw new HttpError(400, "Write what the presenter should say.");
  if (!b.photoUrl) throw new HttpError(400, "Choose a face photo.");
  if (!b.consent) throw new HttpError(400, "Confirm you have consent from the person in the photo.");
  const v = (await c.sb.from("vx_voices").select("el_voice_id,name").eq("workspace_id", c.ws).eq("id", b.voiceId).maybeSingle()).data;
  if (!v) throw new HttpError(400, "Choose a voice with a consent record.");
  const secs = Math.max(5, Math.ceil(script.split(/\s+/).length / 2.5));
  const tts = await charge(c, "tts_1k", Math.max(1, script.length / 1000));
  let av: any;
  try {
    const audio = await speakScript(v.el_voice_id, script, DEFAULT_STYLE);
    const a = await putFile(c, audio, "audio/mpeg", "voice");
    av = await charge(c, "avatar_10s", secs / 10, { seconds: secs });
    const s = await settings(c);
    const fal = await falSubmit(s.providers.avatar_model || "heygen/avatar-6/image-to-video", { image_url: await toPublicUrl(c, b.photoUrl, 3600), audio_url: await toPublicUrl(c, a.url, 3600), resolution: "1080p" });
    const job = await createJob(c, "avatar", "fal", { fal, voice: v.name, seconds: secs, audio: a.url, consent: b.consent }, av.amount, av.ref);
    return json({ job, audioUrl: a.url, credits: tts.amount + av.amount });
  } catch (e) { await refund(c, tts.ref); if (av) await refund(c, av.ref); throw e; }
});
