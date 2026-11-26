import type {Brief} from '../engine/schema';
import {PostSpecSchema, type PostFormat, type PostLayout, type PostSpec, type Slide} from './schema';

/** Which single-post layouts suit each theme, best first. */
const THEME_POSTS: Record<string, PostLayout[]> = {
  'quiet-luxury': ['frame', 'cover', 'split', 'product', 'statement', 'features'],
  'kinetic-type': ['statement', 'hero', 'offer', 'features', 'grid', 'product'],
  'cinematic-noir': ['hero', 'cover', 'statement', 'product', 'features', 'quote'],
  'editorial-magazine': ['cover', 'features', 'split', 'grid', 'quote', 'product'],
  'heritage-story': ['frame', 'quote', 'cover', 'split', 'features', 'product'],
  'swiss-minimal': ['grid', 'statement', 'features', 'product', 'split', 'offer'],
  'quirky-ad': ['offer', 'product', 'statement', 'grid', 'features', 'hero'],
  'product-showcase': ['product', 'features', 'split', 'offer', 'hero', 'grid'],
  'film-nostalgia': ['frame', 'quote', 'hero', 'split', 'grid', 'product'],
  'founder-story': ['quote', 'hero', 'split', 'statement', 'product', 'features'],
  'depth-studio': ['hero', 'product', 'features', 'statement', 'grid', 'cover'],
  'cube-motion': ['grid', 'offer', 'product', 'statement', 'features', 'hero'],
  'gallery-depth': ['frame', 'split', 'cover', 'quote', 'product', 'features'],
};

const trim = (s: string | undefined, n: number) => (s && s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

/** Fill one slide from the brief. Prices and offers only when the brief supplies them. */
const slideFor = (b: Brief, layout: PostLayout, mediaStart: number): Slide | null => {
  const n = b.media.length;
  const m = (k = 1) => Array.from({length: k}, (_, i) => (mediaStart + i) % n);
  const name = b.productName;
  const feats = b.features.filter(Boolean);
  switch (layout) {
    case 'hero': return {layout, eyebrow: b.brand.tagline, title: b.hook, body: trim(b.story, 140), media: m()};
    case 'cover': return {layout, title: name ?? b.hook, body: name ? b.hook : undefined, media: m()};
    case 'split': return b.story ? {layout, eyebrow: name ?? b.brand.tagline, title: b.hook, body: trim(b.story, 160), media: m()} : {layout, eyebrow: b.brand.tagline, title: name ?? b.hook, body: feats[0], media: m()};
    case 'product': return name ? {layout, title: name, body: feats[0] ?? b.brand.tagline, price: b.price, media: m()} : null;
    case 'features': return feats.length >= 2 ? {layout, eyebrow: name ? 'Why ' + name : b.brand.tagline, title: name ?? b.hook, items: feats.slice(0, 3), media: m()} : null;
    case 'statement': return {layout, eyebrow: b.brand.tagline, title: b.hook, media: []};
    case 'offer': return b.offer ? {layout, eyebrow: b.price ?? name, title: b.offer, cta: b.cta, media: m()} : null;
    case 'grid': return n >= 2 ? {layout, eyebrow: b.brand.tagline, title: name ?? b.hook, media: m(3)} : null;
    case 'frame': return {layout, eyebrow: b.brand.tagline, title: name ?? b.hook, media: m()};
    case 'quote': {
      // the founder's own words when there is a voiceover, otherwise the story line
      const said = b.voiceover ? b.voiceover.match(/[^.!?]+[.!?]+/g)?.slice(0, 2).join(' ').trim() : undefined;
      const text = said && said.length >= 40 ? said : b.story && b.story.length >= 40 ? b.story : undefined;
      return text ? {layout, eyebrow: b.voiceover ? b.story ?? b.brand.name : b.brand.name, title: b.hook, body: trim(text, 170), media: []} : null;
    }
    case 'cta': return {layout, cta: b.cta, media: []};
  }
};

const finish = (b: Brief, themeId: string, format: PostFormat, kind: 'single' | 'carousel', slides: Slide[], id: string): PostSpec => {
  const tags = b.brand.name.replace(/[^A-Za-z0-9]/g, '');
  const caption = [b.hook, b.story, b.features.filter(Boolean).length ? b.features.filter(Boolean).map((f) => '• ' + f).join('\n') : undefined, b.offer, b.price ? `${b.productName ?? 'Now'}: ${b.price}` : undefined, `${b.cta}${b.brand.handle ? ' · ' + b.brand.handle : ''}`, `#${tags}`]
    .filter(Boolean).join('\n\n').slice(0, 2200);
  const altText = slides.map((s) => {
    const words = [s.title, s.body].filter(Boolean).join('. ');
    const photo = s.media.length ? b.media[s.media[0] % b.media.length]?.alt : undefined;
    return trim(`${photo ? photo + '. ' : ''}${b.brand.name} post: ${words || b.hook}`, 300)!;
  });
  return PostSpecSchema.parse({version: 1, id, kind, themeId, format, brand: b.brand, media: b.media, slides, caption, altText});
};

/** A ready set for one brief: the theme's best single posts and one carousel. */
export const planPosts = (b: Brief, format: PostFormat = 'portrait', count = 6): PostSpec[] => {
  const order = THEME_POSTS[b.themeId] ?? THEME_POSTS['quiet-luxury'];
  const out: PostSpec[] = [];
  let mi = 0;
  for (const layout of order) {
    if (out.length >= count - 1) break;
    const s = slideFor(b, layout, mi);
    if (!s) continue;
    mi += 1;
    out.push(finish(b, b.themeId, format, 'single', [s], `${b.themeId}-${format}-${layout}`));
  }
  const car = planCarousel(b, format);
  if (car) out.splice(Math.min(1, out.length), 0, car);
  return out;
};

/** Cover → story → features → product → offer → call to action. */
export const planCarousel = (b: Brief, format: PostFormat = 'portrait'): PostSpec | null => {
  const seq: PostLayout[] = ['cover', (b.voiceover || (b.story && b.story.length >= 40)) ? 'quote' : 'statement', 'features', 'product', 'offer', 'cta'];
  const slides: Slide[] = [];
  let mi = 0;
  for (const l of seq) {
    const s = slideFor(b, l, mi);
    if (!s) continue;
    if (s.media.length) mi += 1;
    slides.push(s);
  }
  if (slides.length < 3) return null;
  slides[0] = {...slides[0], eyebrow: undefined, body: slides[0].body ?? 'Swipe →'};
  return finish(b, b.themeId, format, 'carousel', slides, `${b.themeId}-${format}-carousel`);
};
