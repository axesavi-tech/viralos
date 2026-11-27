import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { charge, refund, settings } from "@/lib/credits";
import { falRun, firstUrl } from "@/lib/fal";
import { importUrl, toPublicUrl } from "@/lib/storage";
import { createJob } from "@/lib/jobs";
import { chain, openaiModelsFor } from "@/lib/engines";
import { startImage } from "@/lib/openai";
export const maxDuration = 300;
const SIZES: Record<string, any> = { "9:16": { w: 1080, h: 1920, flux: "portrait_16_9", oa: "1024x1536" }, "4:5": { w: 1080, h: 1350, flux: { width: 1080, height: 1350 }, oa: "1024x1536" }, "1:1": { w: 1080, h: 1080, flux: "square_hd", oa: "1024x1024" }, "16:9": { w: 1920, h: 1080, flux: "landscape_16_9", oa: "1536x1024" } };

/* Post images. From a real product photo: the product-fidelity engine (keeps the product exact), with the other as backup.
   A new scene with no product photo: the image engine with the best prompt following, in background mode; the studio
   waits on the job. The customer sees one button and one result; the router picks the engine. */
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  const prompt = String(b.prompt || "").slice(0, 3000); if (prompt.length < 8) throw new HttpError(400, "Describe the image you want.");
  const aspect = SIZES[b.aspect] ? b.aspect : "4:5"; const size = SIZES[aspect]; const s = await settings(c);
  const refs: string[] = []; for (const u of (b.refUrls || []).slice(0, 3)) refs.push(await toPublicUrl(c, u, 1800));
  const ch = await charge(c, "image", 1, { aspect });
  const fluxReq = { model: s.providers.image_model_text || "fal-ai/flux-pro/v1.1", input: { prompt, image_size: size.flux, num_images: 1, output_format: "png", safety_tolerance: "2" } };
  try {
    const engines = chain(refs.length ? "image_product" : "image");
    for (const e of engines) {
      try {
        if (e === "fal") {
          const fidelity = refs.length ? " Keep the product in the reference image exactly as it is: same colours, weave, pattern, border, texture and drape. Change only the setting, light and composition." : "";
          const out = refs.length
            ? await falRun(s.providers.image_model_edit || "fal-ai/nano-banana/edit", { prompt: prompt + fidelity + ` Aspect ratio ${aspect}.`, image_urls: refs, num_images: 1, output_format: "png" })
            : await falRun(fluxReq.model, fluxReq.input);
          const url = firstUrl(out); if (!url) throw new Error("The image model returned nothing.");
          const saved = await importUrl(c, url, "image", "image/png");
          const job = await createJob(c, "image", "fal", { prompt, refs: !!refs.length, aspect }, ch.amount, ch.ref, "done", { url: saved.url, path: saved.path });
          return json({ job, url: saved.url, credits: ch.amount, balance: ch.balance, fidelityNote: refs.length ? "Generated from your product photo. Compare side by side before approving." : "" });
        }
        if (e === "openai" && !refs.length) {
          const m = await openaiModelsFor(s.providers);
          const rid = await startImage(`${prompt}\nFormat: ${aspect} social post image, composed for ${size.w}×${size.h}.`, m.text, m.image, size.oa);
          const job = await createJob(c, "image", "openai", { openai: { id: rid, model: m.image }, prompt, aspect, fallback: fluxReq }, ch.amount, ch.ref, "running");
          return json({ job, pending: true, credits: ch.amount, balance: ch.balance, fidelityNote: "" });
        }
      } catch (err) { console.error("[image engine]", e, (err as Error).message); }
    }
    throw new Error("No image engine could make this image right now.");
  } catch (e) { await refund(c, ch.ref); throw e; }
});
