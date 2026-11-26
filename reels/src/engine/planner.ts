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

  // 2. Allocate screen time by the theme's pacing weights (accounting for transition overlaps).
  const T = theme.pacing.transitionFrames;
  const weights = beats.map((b) => theme.pacing.weights[b.kind] ?? 1);
  const wsum = weights.reduce((a, b) => a + b, 0);
  const trans = beats.map((_, i) => (i === 0 ? 'cut' : theme.motion.transitions[(i - 1) % theme.motion.transitions.length]));
  const overlaps = trans.filter((t, i) => i > 0 && t !== 'cut').length;
  const budget = total + T * overlaps;
  let frames = weights.map((w) => Math.max(36, Math.round((budget * w) / wsum)));
  const diff = budget - frames.reduce((a, b) => a + b, 0);
  frames[0] += diff; // land exactly on the requested duration

  // 3. Assign media round-robin (collages take two), layouts and transitions from the theme vocabulary.
  let mi = 0;
  const nextMedia = (n = 1) => Array.from({length: n}).map(() => mi++ % brief.media.length);
  // multi-photo 3D layouts: a different photo leads each time, the others fill the depth behind it
  const rotateMedia = (n: number) => { const r = Array.from({length: n}, (_, i) => (mi + i) % brief.media.length); mi++; return r; };
  const scenes: Scene[] = beats.map((b, i) => {
    const layouts = (theme.layouts[b.kind] ?? theme.layouts.default) as LayoutId[];
    const layout = layouts[i % layouts.length];
    const media = b.kind === 'logo' || (layout === 'typeOnly' && b.kind === 'hook') ? [] : layout === 'collage' ? nextMedia(2) : layout === 'depthStack' || layout === 'cube' ? rotateMedia(3) : b.kind === 'cta' ? [0] : nextMedia(1);
    const transitionIn = trans[i];
    return {id: `s${i}-${b.kind}`, kind: b.kind, frames: frames[i], eyebrow: b.eyebrow, title: b.title, body: b.body, media, layout, transitionIn} as Scene;
  });
  void pick;

  // 4. Captions from voiceover, spread across the reel in short phrases.
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
