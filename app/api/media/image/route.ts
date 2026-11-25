import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { charge, refund, settings } from "@/lib/credits";
import { falRun, firstUrl } from "@/lib/fal";
import { importUrl, toPublicUrl } from "@/lib/storage";
import { createJob } from "@/lib/jobs";
export const maxDuration = 300;
const SIZES: Record<string, any> = { "9:16": { w: 1080, h: 1920, flux: "portrait_16_9" }, "4:5": { w: 1080, h: 1350, flux: { width: 1080, height: 1350 } }, "1:1": { w: 1080, h: 1080, flux: "square_hd" }, "16:9": { w: 1920, h: 1080, flux: "landscape_16_9" } };
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  const prompt = String(b.prompt || "").slice(0, 3000); if (prompt.length < 8) throw new HttpError(400, "Describe the image you want.");
  const size = SIZES[b.aspect] || SIZES["4:5"]; const s = await settings(c);
  const refs: string[] = []; for (const u of (b.refUrls || []).slice(0, 3)) refs.push(await toPublicUrl(c, u, 1800));
  const ch = await charge(c, "image", 1, { aspect: b.aspect });
  try {
    const fidelity = refs.length ? " Keep the product in the reference image exactly as it is: same colours, weave, pattern, border, texture and drape. Change only the setting, light and composition." : "";
    const out = refs.length
      ? await falRun(s.providers.image_model_edit || "fal-ai/nano-banana/edit", { prompt: prompt + fidelity + ` Aspect ratio ${b.aspect || "4:5"}.`, image_urls: refs, num_images: 1, output_format: "png" })
      : await falRun(s.providers.image_model_text || "fal-ai/flux-pro/v1.1", { prompt, image_size: size.flux, num_images: 1, output_format: "png", safety_tolerance: "2" });
    const url = firstUrl(out); if (!url) throw new Error("The image model returned nothing.");
    const saved = await importUrl(c, url, "image", "image/png");
    const job = await createJob(c, "image", "fal", { prompt, refs: !!refs.length, aspect: b.aspect }, ch.amount, ch.ref, "done", { url: saved.url, path: saved.path });
    return json({ job, url: saved.url, credits: ch.amount, balance: ch.balance, fidelityNote: refs.length ? "Generated from your product photo. Compare side by side before approving." : "" });
  } catch (e) { await refund(c, ch.ref); throw e; }
});
