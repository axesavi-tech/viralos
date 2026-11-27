import "server-only";
import { openaiReady, models, pickText, pickImage } from "./openai";

/* Kathavi's engine router: every task goes to the engine that does it best, with a fallback when that engine is
   missing or fails. Customers never see engine names; only platform admins do (Admin console → Engines). */

export type Task = "research" | "strategy" | "writing" | "image" | "image_text" | "image_product" | "voice" | "video";
export const ready = () => ({
  claude: !!process.env.ANTHROPIC_API_KEY, openai: openaiReady(), gemini: !!process.env.GEMINI_API_KEY,
  fal: !!process.env.FAL_KEY, runway: !!process.env.RUNWAYML_API_SECRET, voice: !!process.env.ELEVENLABS_API_KEY,
});

/** Why each engine leads its task; shown to admins next to the routing table. */
const PLAN: Record<Task, { chain: (keyof ReturnType<typeof ready>)[]; why: string }> = {
  research: { chain: ["openai", "claude"], why: "Broadest live web search with citations; Claude with web search if it fails." },
  strategy: { chain: ["claude", "openai"], why: "Kathavi's specialist prompts and brand frameworks are tuned for Claude's long, structured reasoning." },
  writing: { chain: ["claude", "openai"], why: "Brand voice, copy and scripts follow the Brand Genome most faithfully." },
  image: { chain: ["fal", "openai"], why: "New scenes without words: Nano Banana (about ₹3 an image) with GPT Image as backup." },
  image_text: { chain: ["openai", "fal"], why: "Images that must show readable words (poster, menu, price card): GPT Image renders text best; charged at the image_text rate." },
  image_product: { chain: ["fal", "openai"], why: "From a real product photo: Nano Banana keeps the product exact; GPT Image edit as backup." },
  voice: { chain: ["voice"], why: "Natural multilingual voiceover and cloning." },
  video: { chain: ["runway", "fal", "gemini"], why: "Picked per shot by the footage catalogue (quality, people, sound, cost)." },
};

export function chain(task: Task) { const r = ready(); return PLAN[task].chain.filter((e) => r[e]); }
export function lead(task: Task) { return chain(task)[0] || null; }

/** The routing table with the concrete models, for the admin console. */
export async function table(providers: Record<string, string>) {
  const ids = ready().openai ? await models() : [];
  const oaText = pickText(ids, providers.openai_text_model), oaImg = pickImage(ids, "generate", providers.openai_image_model), oaEdit = pickImage(ids, "edit", providers.openai_image_model);
  const model: Record<string, string> = {
    "research:openai": oaText, "research:claude": providers.text_model || "claude-sonnet-5-5",
    "strategy:claude": providers.text_model || "claude-sonnet-5-5", "strategy:openai": oaText,
    "writing:claude": providers.text_model || "claude-sonnet-5-5", "writing:openai": oaText,
    "image:fal": providers.image_model_scene || "fal-ai/nano-banana", "image:openai": oaImg, "image_text:openai": oaImg, "image_text:fal": providers.image_model_scene || "fal-ai/nano-banana",
    "image_product:fal": providers.image_model_edit || "fal-ai/nano-banana/edit", "image_product:openai": oaEdit,
  };
  return (Object.keys(PLAN) as Task[]).map((t) => ({ task: t, why: PLAN[t].why, engines: PLAN[t].chain.map((e) => ({ engine: e, ready: ready()[e], model: model[`${t}:${e}`] || "" })) }));
}
export async function openaiModelsFor(providers: Record<string, string>) {
  const ids = await models();
  return { text: pickText(ids, providers.openai_text_model), image: pickImage(ids, "generate", providers.openai_image_model), edit: pickImage(ids, "edit", providers.openai_image_model), seen: ids.length };
}

/** True when the image itself must carry readable words. An explicit flag wins; otherwise read the prompt, ignoring "no text". */
export function needsWords(prompt: string, flag?: unknown) {
  if (flag === true) return true; if (flag === false) return false;
  const p = prompt.toLowerCase();
  if (/\b(no|without) (text|words|lettering|typography|letters)\b/.test(p)) return false;
  return /\b(headline|typography|lettering|text reading|text that says|words? ["“']|title card|poster|menu card|price card|price tag|signage|quote card|banner reading|caption on the image)\b/.test(p);
}
