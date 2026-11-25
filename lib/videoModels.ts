/* Kathavi AI footage: one catalogue for every video model, and pure request builders.
   No secrets or network here, so it is unit-testable. Prices verified Nov 2026 (provider list prices). */

export type VideoKey = "seedance" | "kling" | "wan" | "veo" | "runway" | "minimax" | "omni";
export type Provider = "fal" | "runway" | "gemini";
export type Aspect = "9:16" | "1:1" | "4:5" | "16:9";
export type Job = "film" | "people" | "hero" | "sound" | "lifestyle" | "draft" | "edit";

export type ModelInfo = {
  key: VideoKey; name: string; provider: Provider; bestFor: string; job: Job;
  i2v: string; t2v?: string; edit?: boolean;
  durations: number[]; defaultDuration: number; usdPerSec: number; credPerSec: number; audio: boolean; note?: string;
};

/** credPerSec ≈ provider $/s × ₹85 × 3 margin ÷ ₹0.83 per credit (largest pack) — rounded up. */
export const MODELS: Record<VideoKey, ModelInfo> = {
  seedance: { key: "seedance", name: "Seedance 2.5", provider: "fal", job: "film", bestFor: "Premium cinematic reels and multi-scene storytelling",
    i2v: "bytedance/seedance-2.5/image-to-video", t2v: "bytedance/seedance-2.5/text-to-video", durations: [5, 8, 10, 15], defaultDuration: 8, usdPerSec: 0.47, credPerSec: 146, audio: true },
  kling: { key: "kling", name: "Kling 4.0", provider: "fal", job: "people", bestFor: "Fashion, realistic human movement, product reels",
    i2v: "kling/v4/flash/image-to-video", durations: [5, 8, 10, 15], defaultDuration: 5, usdPerSec: 0.094, credPerSec: 30, audio: false,
    note: "Uses Kling 4.0 Flash until the full Kling 4.0 API opens; switch with the kling_model setting." },
  wan: { key: "wan", name: "Wan 3.0", provider: "fal", job: "draft", bestFor: "Creative visual storytelling and affordable drafts",
    i2v: "alibaba/wan-3.0/image-to-video", durations: [5, 8, 10], defaultDuration: 5, usdPerSec: 0.10, credPerSec: 31, audio: true },
  veo: { key: "veo", name: "Google Veo 3.1", provider: "fal", job: "sound", bestFor: "Cinematic ads with dialogue and sound",
    i2v: "fal-ai/veo3.1/image-to-video", durations: [4, 6, 8], defaultDuration: 8, usdPerSec: 0.40, credPerSec: 124, audio: true },
  runway: { key: "runway", name: "Runway Gen-4.5", provider: "runway", job: "hero", bestFor: "Product campaigns with controlled visual direction",
    i2v: "gen4.5", t2v: "gen4.5", durations: [5, 8, 10], defaultDuration: 5, usdPerSec: 0.12, credPerSec: 38, audio: false },
  minimax: { key: "minimax", name: "MiniMax H3", provider: "fal", job: "lifestyle", bestFor: "Emotional storytelling and lifestyle reels",
    i2v: "minimax/h3/image-to-video", t2v: "minimax/h3/image-to-video", durations: [5, 8, 10, 15], defaultDuration: 6, usdPerSec: 0.06, credPerSec: 19, audio: false },
  omni: { key: "omni", name: "Gemini Omni Flash", provider: "gemini", job: "edit", bestFor: "Fast everyday clips and editing a clip by instruction",
    i2v: "gemini-omni-1.1-flash", t2v: "gemini-omni-1.1-flash", edit: true, durations: [10], defaultDuration: 10, usdPerSec: 0.10, credPerSec: 31, audio: true,
    note: "Length is chosen by the model (up to 10 s); billed as 10 s." },
};

export const JOBS: Record<Job, { label: string; model: VideoKey; hint: string }> = {
  film: { label: "Cinematic brand film", model: "seedance", hint: "Slow, premium, story-led shots" },
  people: { label: "Person wearing or using it", model: "kling", hint: "Natural human movement" },
  hero: { label: "Product hero shot", model: "runway", hint: "Precise camera moves around the product" },
  sound: { label: "Ad with sound or dialogue", model: "veo", hint: "Native audio and lip-sync" },
  lifestyle: { label: "Emotional lifestyle moment", model: "minimax", hint: "Mood, warmth, everyday scenes" },
  draft: { label: "Quick draft / high volume", model: "wan", hint: "Cheapest way to explore ideas" },
  edit: { label: "Edit a clip by instruction", model: "omni", hint: "“Make it evening”, “add falling petals”" },
};

/** Suggest a job from a template's tags/name, so the panel opens on the right model. */
export function jobForTemplate(t: { name?: string; tags?: string[]; desc?: string } | null | undefined): Job {
  const s = [t?.name, t?.desc, ...(t?.tags || [])].join(" ").toLowerCase();
  if (/cinematic|film|story|editorial|luxury/.test(s)) return "film";
  if (/model|wear|outfit|fashion|try|people|ugc/.test(s)) return "people";
  if (/sound|dialogue|voice|talking|ad\b|ads\b/.test(s)) return "sound";
  if (/lifestyle|mood|emotion|calm|warm/.test(s)) return "lifestyle";
  if (/product|hero|launch|drop|price|offer|sale/.test(s)) return "hero";
  return "draft";
}

export function clampDuration(m: ModelInfo, d: unknown): number {
  const n = Math.round(Number(d) || m.defaultDuration);
  return m.durations.reduce((best, x) => (Math.abs(x - n) < Math.abs(best - n) ? x : best), m.durations[0]);
}
export function creditsFor(m: ModelInfo, seconds: number) { return Math.ceil(m.credPerSec * seconds); }

const PRESERVE = " Keep the product exactly as in the image: same colours, pattern, texture, shape and proportions. No added text, logos or watermarks.";
const RUNWAY_RATIO: Record<Aspect, string> = { "9:16": "720:1280", "1:1": "960:960", "4:5": "832:1104", "16:9": "1280:720" };
const WAN_RATIO: Record<Aspect, string> = { "9:16": "9:16", "1:1": "1:1", "4:5": "3:4", "16:9": "16:9" };

export type BuildIn = { prompt: string; imageUrl?: string; duration: number; aspect: Aspect; overrides?: Record<string, string> };
export type Built = { provider: Provider; endpoint: string; body: any };

/** Build the exact provider request. imageUrl must already be a URL the provider can fetch (fal/runway). */
export function buildRequest(key: VideoKey, x: BuildIn): Built {
  const m = MODELS[key]; if (!m) throw new Error("Unknown model");
  const prompt = String(x.prompt || "").slice(0, 1800) + (x.imageUrl ? PRESERVE : "");
  const d = clampDuration(m, x.duration);
  const ov = x.overrides || {};
  if (!x.imageUrl && !m.t2v) throw new Error(`${m.name} needs a product photo to animate.`);
  switch (key) {
    case "seedance":
      return x.imageUrl
        ? { provider: "fal", endpoint: ov.seedance_model || m.i2v, body: { image_url: x.imageUrl, prompt, duration: d, resolution: "720p", generate_audio: true } }
        : { provider: "fal", endpoint: m.t2v!, body: { prompt, duration: d, resolution: "720p", aspect_ratio: x.aspect === "4:5" ? "3:4" : x.aspect, generate_audio: true } };
    case "kling":
      return { provider: "fal", endpoint: ov.kling_model || m.i2v, body: { start_image_url: x.imageUrl, prompt, duration: d } };
    case "wan":
      return { provider: "fal", endpoint: m.i2v, body: { start_image_url: x.imageUrl, prompt, duration: d, resolution: "720p", aspect_ratio: WAN_RATIO[x.aspect], audio: true } };
    case "veo":
      return { provider: "fal", endpoint: m.i2v, body: { image_url: x.imageUrl, prompt, duration: `${d}s`, resolution: "720p", aspect_ratio: x.aspect === "16:9" ? "16:9" : x.aspect === "9:16" ? "9:16" : "auto", generate_audio: true } };
    case "minimax": {
      const body: any = { prompt, duration: d, resolution: "768P", prompt_expansion_mode: "balanced" };
      if (x.imageUrl) body.image_url = x.imageUrl;
      return { provider: "fal", endpoint: m.i2v, body };
    }
    case "runway": {
      const body: any = { model: "gen4.5", promptText: prompt.slice(0, 1000), ratio: x.imageUrl ? RUNWAY_RATIO[x.aspect] : (x.aspect === "16:9" ? "1280:720" : "720:1280"), duration: d };
      if (x.imageUrl) body.promptImage = x.imageUrl;
      return { provider: "runway", endpoint: x.imageUrl ? "/v1/image_to_video" : "/v1/text_to_video", body };
    }
    case "omni":
      return { provider: "gemini", endpoint: ov.omni_model || m.i2v, body: { prompt, aspect: x.aspect === "16:9" ? "16:9" : "9:16" } };
  }
}

/** Gemini Interactions request (image/video parts are base64 filled in by the server). */
export function omniBody(model: string, prompt: string, aspect: "9:16" | "16:9", parts: { type: "image" | "video"; data: string; mime_type: string }[]) {
  return { model, input: parts.length ? [...parts, { type: "text", text: prompt }] : prompt, response_format: { type: "video", aspect_ratio: aspect, resolution: "720p" }, background: false, store: false, stream: false };
}
/** Pull the video out of a Gemini interaction response. */
export function omniVideo(j: any): { data?: string; uri?: string; mime: string } | null {
  for (const s of j?.steps || []) if (s?.type === "model_output") for (const c of s.content || []) if (c?.type === "video" && (c.data || c.uri)) return { data: c.data, uri: c.uri, mime: c.mime_type || "video/mp4" };
  return null;
}
/** Runway task → state. */
export function runwayState(t: any): { state: "running" } | { state: "done"; url: string } | { state: "failed"; error: string } {
  const s = String(t?.status || "").toUpperCase();
  if (s === "SUCCEEDED") { const url = Array.isArray(t.output) ? t.output[0] : t.output?.url; return url ? { state: "done", url } : { state: "failed", error: "Finished without a file" }; }
  if (s === "FAILED" || s === "CANCELLED" || s === "CANCELED") return { state: "failed", error: String(t.failure || t.failureCode || "Runway could not generate this clip").slice(0, 300) };
  return { state: "running" };
}
export function providerConfigured(p: Provider, env: Record<string, string | undefined>) {
  return p === "fal" ? !!env.FAL_KEY : p === "runway" ? !!env.RUNWAYML_API_SECRET : !!env.GEMINI_API_KEY;
}
