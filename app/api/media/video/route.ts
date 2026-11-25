import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { charge, refund, settings } from "@/lib/credits";
import { falSubmit } from "@/lib/fal";
import { toPublicUrl } from "@/lib/storage";
import { createJob } from "@/lib/jobs";
export const maxDuration = 60;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  if (!b.imageUrl) throw new HttpError(400, "Pick a product photo to animate.");
  const dur = Number(b.duration) === 10 ? 10 : 5; const s = await settings(c);
  const image_url = await toPublicUrl(c, b.imageUrl, 3600);
  const ch = await charge(c, "video_5s", dur / 5, { duration: dur });
  try {
    const model = s.providers.video_model || "fal-ai/kling-video/v2.1/standard/image-to-video";
    const fal = await falSubmit(model, { prompt: String(b.prompt || "").slice(0, 2400) + " Preserve the product's exact colours, pattern and texture.", image_url, duration: String(dur), aspect_ratio: b.aspect || "9:16", negative_prompt: "blur, distort, warped fabric, changed pattern, extra limbs, text, watermark" });
    const job = await createJob(c, "video", "fal", { fal, prompt: b.prompt, duration: dur, scene: b.scene ?? null, itemId: b.itemId ?? null }, ch.amount, ch.ref);
    return json({ job, credits: ch.amount, balance: ch.balance });
  } catch (e) { await refund(c, ch.ref); throw e; }
});
