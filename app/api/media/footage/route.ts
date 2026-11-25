import { ctx, route, json, requireWrite } from "@/lib/ctx";
import { settings, VIDEO_RATES } from "@/lib/credits";
import { startFootage } from "@/lib/video";
import { MODELS, JOBS, providerConfigured } from "@/lib/videoModels";
export const dynamic = "force-dynamic";
export const maxDuration = 300; // Gemini Omni answers synchronously

/** The AI footage catalogue: models, what each is best for, credits per second, and whether it is connected. */
export const GET = route(async (req: Request) => {
  const c = await ctx(req); const s = await settings(c);
  const models = Object.values(MODELS).map(m => ({
    key: m.key, name: m.name, bestFor: m.bestFor, job: m.job, durations: m.durations, defaultDuration: m.defaultDuration,
    creditsPerSecond: s.rates[`vid_${m.key}`] ?? VIDEO_RATES[`vid_${m.key}`], textOnly: !!m.t2v, edit: !!m.edit, audio: m.audio, note: m.note || null,
    available: providerConfigured(m.provider, process.env),
  }));
  return json({ models, jobs: JOBS });
});

export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  return json(await startFootage(c, { model: b.model, prompt: b.prompt, imageUrl: b.imageUrl || undefined, videoUrl: b.videoUrl || undefined, duration: b.duration, aspect: b.aspect, scene: b.scene ?? null, itemId: b.itemId ?? null }));
});
