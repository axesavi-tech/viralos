import {BriefSchema, ReelSpecSchema, type Brief, type ReelSpec, type Scene, type SceneKind} from './schema';
import {themeById} from '../themes';
import {rng} from './motion';
import type {LayoutId} from './types';

/**
 * Rules-based Creative Director. Turns a brief into a validated scene-by-scene storyboard.
 * The LLM director (director.ts) produces the same Brief shape, so both paths render identically
 * and no generated code ever runs.
 */
export const plan = (input: Brief): ReelSpec => {
  const brief = BriefSchema.parse(input);
  const theme = themeById(brief.themeId);
  const fps = 30;
  const total = brief.durationSec * fps;
  const r = rng(`${brief.brand.name}|${brief.themeId}|${brief.hook}`);
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)];

  // 1. Choose the beats for this length and objective.
  const maxFeatures = brief.durationSec <= 15 ? 1 : brief.durationSec <= 30 ? 2 : brief.durationSec <= 45 ? 3 : brief.durationSec <= 60 ? 4 : 6;
  const feats = brief.features.slice(0, maxFeatures);
  const beats: {kind: SceneKind; eyebrow?: string; title?: string; body?: string}[] = [];
  beats.push({kind: 'hook', title: brief.hook, eyebrow: brief.objective === 'launch' ? 'Introducing' : undefined});
  if (brief.story && brief.durationSec >= 30) beats.push({kind: 'story', title: brief.story});
  if (brief.productName) beats.push({kind: 'product', eyebrow: brief.objective === 'launch' ? 'New' : brief.brand.name, title: brief.productName, body: brief.durationSec <= 15 ? feats[0] : undefined});
  feats.forEach((ft, i) => {
    if (brief.durationSec <= 15 && brief.productName) return;
    beats.push({kind: 'feature', eyebrow: String(i + 1).padStart(2, '0'), title: ft});
  });
  if (brief.durationSec >= 60 && brief.media.length > 2) beats.push({kind: 'detail', eyebrow: 'In detail', title: brief.productName ?? brief.brand.name});
  // Price / offer only if supplied — the engine never invents discounts.
  if (brief.offer || brief.price) beats.push({kind: 'offer', eyebrow: brief.price, title: brief.offer ?? brief.productName ?? 'Available now'});
  beats.push({kind: 'cta', title: brief.cta, body: brief.brand.handle, eyebrow: brief.brand.tagline});
  if (brief.durationSec >= 30) beats.push({kind: 'logo'});

  // 2. Which photos/clips each beat would show. Collages take two, 3D layouts three; a different item leads each time.
  const N = brief.media.length;
  const layoutFor = (kind: SceneKind, i: number) => { const ls = (theme.layouts[kind] ?? theme.layouts.default) as LayoutId[]; return ls[i % ls.length]; };
  let mi = 0;
  const nextMedia = (n = 1) => Array.from({length: n}).map(() => mi++ % N);
  const rotateMedia = (n: number) => { const r = Array.from({length: n}, (_, i) => (mi + i) % N); mi++; return r; };
  const mediaFor = (kind: SceneKind, layout: LayoutId) =>
    kind === 'logo' || (layout === 'typeOnly' && kind === 'hook') ? [] : layout === 'collage' ? nextMedia(2) : layout === 'depthStack' || layout === 'cube' ? rotateMedia(3) : kind === 'cta' ? [0] : nextMedia(1);
  const firstPass = beats.map((b, i) => mediaFor(b.kind, layoutFor(b.kind, i)));

  // 3. Every photo and clip the customer chose gets screen time: whatever the story beats did not use plays as a
  //    gallery montage right after the hook, at least ~0.9 s per item, in groups of up to four.
  const used = new Set(firstPass.flat());
  const left = Array.from({length: N}, (_, i) => i).filter((i) => !used.has(i));
  const groups: number[][] = [];
  for (let i = 0; i < left.length; i += 4) groups.push(left.slice(i, i + 4));
  const plan2 = beats.map((b, i) => ({b, media: firstPass[i], layout: layoutFor(b.kind, i)}));
  plan2.splice(Math.min(1, plan2.length), 0, ...groups.map((g) => ({b: {kind: 'gallery' as SceneKind}, media: g, layout: 'montage' as LayoutId})));

  // 4. Allocate screen time by the theme's pacing weights (accounting for transition overlaps).
  const T = theme.pacing.transitionFrames;
  const weights = plan2.map((x) => (x.b.kind === 'gallery' ? 0.5 * x.media.length : theme.pacing.weights[x.b.kind] ?? 1));
  const minF = plan2.map((x) => (x.b.kind === 'gallery' ? 27 * x.media.length + T : 36));
  const wsum = weights.reduce((a, b) => a + b, 0);
  const trans = plan2.map((_, i) => (i === 0 ? 'cut' : theme.motion.transitions[(i - 1) % theme.motion.transitions.length]));
  const overlaps = trans.filter((t, i) => i > 0 && t !== 'cut').length;
  const budget = total + T * overlaps;
  const frames = weights.map((w, i) => Math.max(minF[i], Math.round((budget * w) / wsum)));
  // land exactly on the requested duration: take any surplus from the longest scenes
  let diff = budget - frames.reduce((a, b) => a + b, 0);
  while (diff < 0) { const j = frames.indexOf(Math.max(...frames)); const cut = Math.min(-diff, frames[j] - minF[j]); if (cut <= 0) break; frames[j] -= cut; diff += cut; }
  frames[0] += diff;

  // 5. Scenes. Ids are stable per kind so the customer's photo choices survive edits to other scenes.
  const seen: Record<string, number> = {};
  const scenes: Scene[] = plan2.map((x, i) => {
    const n = (seen[x.b.kind] = (seen[x.b.kind] ?? 0) + 1);
    const id = `${x.b.kind}-${n}`;
    const chosen = brief.assign?.[id]?.filter((k) => k < N);
    const media = chosen && chosen.length && x.media.length ? chosen.slice(0, Math.max(x.media.length, x.layout === 'montage' ? 8 : x.media.length)) : x.media;
    return {id, kind: x.b.kind, frames: frames[i], eyebrow: x.b.eyebrow, title: x.b.title, body: x.b.body, media, layout: x.layout, transitionIn: trans[i]} as Scene;
  });
  void pick;

  // 6. Captions from voiceover, spread across the reel in short phrases.
  const captions: ReelSpec['captions'] = [];
  if (brief.voiceover) {
    const words = brief.voiceover.split(/\s+/).filter(Boolean);
    const chunks: string[] = [];
    for (let i = 0; i < words.length; i += 5) chunks.push(words.slice(i, i + 5).join(' '));
    const ctaIdx = scenes.findIndex((x) => x.kind === 'cta');
    const end = ctaIdx > 0 ? scenes.slice(0, ctaIdx).reduce((a, x) => a + x.frames - T, T) : total - 30;
    const span = Math.floor((end - 15) / Math.max(1, chunks.length));
    chunks.forEach((c, i) => captions.push({text: c, from: 15 + i * span, to: 15 + (i + 1) * span}));
  }

  return ReelSpecSchema.parse({
    version: 1,
    themeId: theme.id,
    fps,
    width: 1080,
    height: 1920,
    brand: brief.brand,
    media: brief.media,
    scenes,
    intensity: brief.intensity,
    captions,
    showSafeZones: brief.showSafeZones,
  });
};

/** Theme switching keeps all content: re-plan the same brief with a different theme. */
export const switchTheme = (brief: Brief, themeId: string) => plan({...brief, themeId});
