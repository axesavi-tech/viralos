import {z} from 'zod';

/** Brand DNA: everything a theme needs to adapt to a customer, nothing theme-specific. */
export const BrandSchema = z.object({
  name: z.string().min(1).max(40),
  tagline: z.string().max(80).optional(),
  primary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  logoUrl: z.string().optional(),
  handle: z.string().max(40).optional(),
});
export type Brand = z.infer<typeof BrandSchema>;

export const MediaSchema = z.object({
  src: z.string(),
  /** focal point 0..1, preserved when cropping to 9:16 */
  focusX: z.number().min(0).max(1).default(0.5),
  focusY: z.number().min(0).max(1).default(0.5),
  alt: z.string().optional(),
});
export type Media = z.infer<typeof MediaSchema>;

export const SceneKind = z.enum(['hook', 'story', 'product', 'feature', 'detail', 'offer', 'cta', 'logo']);
export type SceneKind = z.infer<typeof SceneKind>;

export const TransitionId = z.enum(['cut', 'dissolve', 'swipe', 'whip', 'filmBurn', 'paperTear', 'iris', 'shutter', 'blockWipe', 'pageTurn', 'cube', 'flip', 'zoomThrough']);
export type TransitionId = z.infer<typeof TransitionId>;

export const SceneSchema = z.object({
  id: z.string(),
  kind: SceneKind,
  frames: z.number().int().min(12).max(900),
  eyebrow: z.string().max(40).optional(),
  title: z.string().max(90).optional(),
  body: z.string().max(160).optional(),
  /** index into spec.media */
  media: z.array(z.number().int().min(0)).max(4).default([]),
  layout: z.string().optional(),
  textAnim: z.string().optional(),
  mediaAnim: z.string().optional(),
  transitionIn: TransitionId.default('dissolve'),
});
export type Scene = z.infer<typeof SceneSchema>;

/** A fully resolved, validated reel. This is what gets rendered — never arbitrary code. */
export const ReelSpecSchema = z.object({
  version: z.literal(1),
  themeId: z.string(),
  fps: z.literal(30),
  width: z.number().int(),
  height: z.number().int(),
  brand: BrandSchema,
  media: z.array(MediaSchema).max(12),
  scenes: z.array(SceneSchema).min(2).max(16),
  intensity: z.number().min(0.4).max(1.6).default(1),
  captions: z.array(z.object({text: z.string(), from: z.number().int(), to: z.number().int()})).default([]),
  showSafeZones: z.boolean().default(false),
  audioSrc: z.string().optional(),
});
export type ReelSpec = z.infer<typeof ReelSpecSchema>;

/** What a user (or the AI Creative Director) supplies. The planner turns this into a ReelSpec. */
export const BriefSchema = z.object({
  brand: BrandSchema,
  themeId: z.string(),
  durationSec: z.union([z.literal(15), z.literal(30), z.literal(45), z.literal(60), z.literal(90)]),
  objective: z.enum(['launch', 'showcase', 'story', 'offer', 'awareness']).default('showcase'),
  hook: z.string().max(90),
  story: z.string().max(160).optional(),
  productName: z.string().max(60).optional(),
  features: z.array(z.string().max(60)).max(6).default([]),
  /** only shown if the brand supplies it — never invented */
  price: z.string().max(24).optional(),
  offer: z.string().max(60).optional(),
  cta: z.string().max(40).default('Shop now'),
  voiceover: z.string().max(900).optional(),
  media: z.array(MediaSchema).min(1).max(12),
  intensity: z.number().min(0.4).max(1.6).default(1),
  showSafeZones: z.boolean().default(false),
});
export type Brief = z.infer<typeof BriefSchema>;
