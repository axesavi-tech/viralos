import {z} from 'zod';
import {BrandSchema, MediaSchema} from '../engine/schema';

export const PostFormat = z.enum(['portrait', 'square', 'story']);
export type PostFormat = z.infer<typeof PostFormat>;
export const FORMAT_SIZE: Record<PostFormat, {w: number; h: number; label: string}> = {
  portrait: {w: 1080, h: 1350, label: 'Post 4:5'},
  square: {w: 1080, h: 1080, label: 'Post 1:1'},
  story: {w: 1080, h: 1920, label: 'Story 9:16'},
};

export const PostLayout = z.enum(['hero', 'cover', 'split', 'product', 'features', 'statement', 'offer', 'grid', 'frame', 'quote', 'cta']);
export type PostLayout = z.infer<typeof PostLayout>;

export const SlideSchema = z.object({
  layout: PostLayout,
  eyebrow: z.string().max(60).optional(),
  title: z.string().max(120).optional(),
  body: z.string().max(200).optional(),
  items: z.array(z.string().max(60)).max(4).optional(),
  price: z.string().max(24).optional(),
  cta: z.string().max(40).optional(),
  media: z.array(z.number().int().min(0)).max(4).default([]),
});
export type Slide = z.infer<typeof SlideSchema>;

/** One post, or one carousel (several slides), in one theme and format. */
export const PostSpecSchema = z.object({
  version: z.literal(1),
  id: z.string(),
  kind: z.enum(['single', 'carousel']),
  themeId: z.string(),
  format: PostFormat,
  brand: BrandSchema,
  media: z.array(MediaSchema).min(1),
  slides: z.array(SlideSchema).min(1).max(10),
  caption: z.string().max(2200).optional(),
  altText: z.array(z.string().max(300)).optional(),
});
export type PostSpec = z.infer<typeof PostSpecSchema>;
