import "server-only";
import type { Ctx } from "./ctx";
import { HttpError } from "./ctx";
import { charge, refund, settings } from "./credits";
import { falSubmit } from "./fal";
import { toPublicUrl, getFile, putFile } from "./storage";
import { createJob } from "./jobs";
import { MODELS, buildRequest, clampDuration, omniBody, omniVideo, runwayState, providerConfigured, type VideoKey, type Aspect } from "./videoModels";

const RUNWAY = "https://api.dev.runwayml.com";
const runwayHeaders = () => {
  const k = process.env.RUNWAYML_API_SECRET; if (!k) throw new HttpError(503, "Runway is not configured (RUNWAYML_API_SECRET missing).");
  return { Authorization: `Bearer ${k}`, "X-Runway-Version": "2024-11-06", "Content-Type": "application/json" };
};
async function runwaySubmit(path: string, body: any) {
  const r = await fetch(RUNWAY + path, { method: "POST", headers: runwayHeaders(), body: JSON.stringify(body) });
  const j: any = await r.json().catch(() => ({}));
  if (!r.ok || !j.id) throw new Error("Runway: " + String(j.error || j.message || r.status).slice(0, 300));
  return j.id as string;
}
export async function runwayPoll(id: string) {
  const r = await fetch(`${RUNWAY}/v1/tasks/${encodeURIComponent(id)}`, { headers: runwayHeaders(), cache: "no-store" });
  if (!r.ok) throw new Error("Runway status " + r.status);
  return runwayState(await r.json());
}

/** A file from this workspace's storage as base64 (Gemini needs inline media). Only our own storage, never arbitrary URLs. */
async function ownFileB64(c: Ctx, appUrl: string, maxBytes: number) {
  const m = String(appUrl).match(/[?&]p=([^&]+)/); if (!m) throw new HttpError(400, "Use a photo or clip from your Kathavi media.");
  const blob = await getFile(c, decodeURIComponent(m[1]));
  if (blob.size > maxBytes) throw new HttpError(400, `That file is too large to send (max ${Math.round(maxBytes / 1e6)} MB).`);
  return { data: Buffer.from(await blob.arrayBuffer()).toString("base64"), mime: blob.type || "application/octet-stream" };
}
async function omniRun(c: Ctx, model: string, prompt: string, aspect: "9:16" | "16:9", image?: string, video?: string) {
  const key = process.env.GEMINI_API_KEY; if (!key) throw new HttpError(503, "Gemini is not configured (GEMINI_API_KEY missing).");
  const parts: any[] = [];
  if (video) { const f = await ownFileB64(c, video, 18e6); parts.push({ type: "video", data: f.data, mime_type: f.mime.startsWith("video/") ? f.mime : "video/mp4" }); }
  else if (image) { const f = await ownFileB64(c, image, 15e6); parts.push({ type: "image", data: f.data, mime_type: f.mime.startsWith("image/") ? f.mime : "image/jpeg" }); }
  const r = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key }, body: JSON.stringify(omniBody(model, prompt, aspect, parts)) });
  const j: any = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error("Gemini: " + String(j?.error?.message || r.status).slice(0, 300));
  const v = omniVideo(j); if (!v) throw new Error("Gemini returned no video" + (j?.status ? ` (${j.status})` : ""));
  let bytes: Uint8Array;
  if (v.data) bytes = Buffer.from(v.data, "base64");
  else { const id = String(v.uri).split("/files/")[1]?.split(/[?:]/)[0]; const d = await fetch(`https://generativelanguage.googleapis.com/v1beta/files/${id}:download?alt=media`, { headers: { "x-goog-api-key": key } }); if (!d.ok) throw new Error("Gemini download " + d.status); bytes = new Uint8Array(await d.arrayBuffer()); }
  return putFile(c, bytes, "video/mp4", "video", "omni.mp4");
}

export type FootageIn = { model: VideoKey; prompt: string; imageUrl?: string; videoUrl?: string; duration?: number; aspect?: Aspect; scene?: number | null; itemId?: string | null };

/** Charge, submit, and record a job. Gemini runs synchronously and is recorded as done. Refunds on any failure. */
export async function startFootage(c: Ctx, b: FootageIn) {
  const m = MODELS[b.model]; if (!m) throw new HttpError(400, "Pick a video model.");
  if (!providerConfigured(m.provider, process.env)) throw new HttpError(503, `${m.name} is not connected yet. An admin needs to add its API key.`);
  if (b.videoUrl && !m.edit) throw new HttpError(400, `${m.name} can't edit clips; use Gemini Omni Flash.`);
  const prompt = String(b.prompt || "").trim(); if (!prompt) throw new HttpError(400, "Describe the shot.");
  const aspect: Aspect = (["9:16", "1:1", "4:5", "16:9"] as const).includes(b.aspect as any) ? (b.aspect as Aspect) : "9:16";
  const seconds = clampDuration(m, b.duration);
  const s = await settings(c); const ov = s.providers || {};
  const ch = await charge(c, `vid_${m.key}`, seconds, { model: m.key, seconds });
  try {
    if (m.provider === "gemini") {
      const saved = await omniRun(c, (ov as any).omni_model || m.i2v, prompt, aspect === "16:9" ? "16:9" : "9:16", b.imageUrl, b.videoUrl);
      const job = await createJob(c, "video", "gemini", { model: m.key, prompt, seconds, scene: b.scene ?? null, itemId: b.itemId ?? null }, ch.amount, ch.ref, "done", { url: saved.url, path: saved.path });
      return { job, status: "done", result: { url: saved.url }, credits: ch.amount, balance: ch.balance };
    }
    const providerImage = b.imageUrl ? await toPublicUrl(c, b.imageUrl, 3600) : undefined;
    const req = buildRequest(m.key, { prompt, imageUrl: providerImage, duration: seconds, aspect, overrides: ov as any });
    const common = { model: m.key, prompt, seconds, scene: b.scene ?? null, itemId: b.itemId ?? null };
    if (req.provider === "runway") {
      const id = await runwaySubmit(req.endpoint, req.body);
      const job = await createJob(c, "video", "runway", { ...common, runway: { id } }, ch.amount, ch.ref);
      return { job, status: "running", credits: ch.amount, balance: ch.balance };
    }
    const fal = await falSubmit(req.endpoint, req.body);
    const job = await createJob(c, "video", "fal", { ...common, fal }, ch.amount, ch.ref);
    return { job, status: "running", credits: ch.amount, balance: ch.balance };
  } catch (e) { await refund(c, ch.ref); throw e; }
}
