import "server-only";

const EL = "https://api.elevenlabs.io/v1";
const elKey = () => {
  const k = process.env.ELEVENLABS_API_KEY;
  if (!k) throw new Error("Voice is not configured yet.");
  return k;
};

async function fail(r: Response, who: string): Promise<never> {
  let msg = `${r.status}`;
  try {
    const j = await r.json();
    msg = j?.detail?.message || j?.detail?.status || j?.detail || j?.message || j?.error || JSON.stringify(j);
  } catch {
    try { msg = await r.text(); } catch {}
  }
  throw new Error(`Voice service: ${typeof msg === "string" ? msg.slice(0, 300) : JSON.stringify(msg).slice(0, 300)}`);
}

/* ---------------- Voice: ElevenLabs instant voice clone ---------------- */

export async function cloneVoice(name: string, samples: { blob: Blob; filename: string }[], description: string, opts: { denoise?: boolean; labels?: Record<string, string> } = {}) {
  const fd = new FormData();
  fd.append("name", name);
  fd.append("description", description);
  fd.append("remove_background_noise", opts.denoise === false ? "false" : "true");
  if (opts.labels && Object.keys(opts.labels).length) fd.append("labels", JSON.stringify(opts.labels));
  for (const s of samples) fd.append("files", s.blob, s.filename);
  const r = await fetch(`${EL}/voices/add`, { method: "POST", headers: { "xi-api-key": elKey() }, body: fd });
  if (!r.ok) await fail(r, "ElevenLabs voice cloning");
  const j = (await r.json()) as { voice_id: string; requires_verification?: boolean };
  return j;
}

export async function deleteVoice(voiceId: string) {
  const r = await fetch(`${EL}/voices/${voiceId}`, { method: "DELETE", headers: { "xi-api-key": elKey() } });
  if (!r.ok && r.status !== 404) await fail(r, "ElevenLabs delete voice");
}

export type VoiceStyle = { stability: number; similarity: number; style: number; speed: number };

/** Split a long script at sentence boundaries into chunks the TTS model handles comfortably. */
export function chunkScript(text: string, max = 2400) {
  const clean = text.replace(/\r/g, "").trim();
  if (clean.length <= max) return [clean];
  const parts = clean.match(/[^.!?।\n]+[.!?।]*\s*|\n+/g) ?? [clean];
  const out: string[] = [];
  let cur = "";
  for (const p of parts) {
    if ((cur + p).length > max && cur) { out.push(cur.trim()); cur = ""; }
    if (p.length > max) { for (let i = 0; i < p.length; i += max) out.push(p.slice(i, i + max)); continue; }
    cur += p;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

export async function speak(voiceId: string, text: string, style: VoiceStyle, opts: { previous?: string; next?: string } = {}) {
  const model = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
  const r = await fetch(`${EL}/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": elKey(), "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: model,
      previous_text: opts.previous || undefined,
      next_text: opts.next || undefined,
      voice_settings: {
        stability: style.stability,
        similarity_boost: style.similarity,
        style: style.style,
        use_speaker_boost: true,
        speed: style.speed,
      },
    }),
  });
  if (!r.ok) await fail(r, "ElevenLabs speech");
  return new Uint8Array(await r.arrayBuffer());
}

export async function speakScript(voiceId: string, script: string, style: VoiceStyle) {
  const chunks = chunkScript(script);
  const bufs: Uint8Array[] = [];
  for (let i = 0; i < chunks.length; i++) {
    bufs.push(await speak(voiceId, chunks[i], style, { previous: chunks[i - 1]?.slice(-400), next: chunks[i + 1]?.slice(0, 400) }));
  }
  const total = bufs.reduce((n, b) => n + b.length, 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const b of bufs) { out.set(b, o); o += b.length; }
  return out; // MP3 frames concatenate cleanly
}

export const DEFAULT_STYLE: VoiceStyle = { stability: 0.5, similarity: 0.8, style: 0.2, speed: 1 };
/** A stock ElevenLabs voice used before the workspace clones its own. */
export const STOCK_VOICE = process.env.ELEVENLABS_DEFAULT_VOICE || "21m00Tcm4TlvDq8ikWAM";
