import {mix, readable, isDark, contrast} from '../engine/color';
import type {ThemeSpec, Palette} from '../engine/types';
import type {Brand} from '../engine/schema';

const acc = (b: Brand) => b.accent ?? b.primary;
const fin = (p: Omit<Palette, 'inkOnSurface' | 'onAccent'> & Partial<Palette>): Palette => ({
  ...p,
  ink: readable(p.bg, [p.ink, '#111111', '#ffffff']),
  muted: readable(p.bg, [p.muted, p.ink], 3.2),
  inkOnSurface: readable(p.surface, [p.inkOnSurface ?? p.ink, '#111111', '#ffffff']),
  onAccent: readable(p.accent, [p.onAccent ?? '#ffffff', '#111111', '#ffffff']),
} as Palette);

/** Make sure the brand colour is usable as an accent on this background; otherwise shift it. */
const accentOn = (bg: string, c: string, min = 2.2) => (contrast(bg, c) >= min ? c : readable(bg, [c], min));

export const THEMES: ThemeSpec[] = [
  {
    id: 'quiet-luxury',
    name: 'Quiet Luxury',
    mood: 'Unhurried, assured, tactile',
    description: 'Slow dissolves, generous space, a fine serif set wide. Product framed like a gallery piece.',
    fonts: {
      display: {family: 'Cormorant Garamond', weight: 400, lineHeight: 1.05, tracking: 0.01},
      body: {family: 'Cormorant Garamond', weight: 400, style: 'italic', lineHeight: 1.25},
      label: {family: 'Manrope', weight: 500, lineHeight: 1.2, tracking: 0.32, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = mix('#F3EEE6', b.primary, 0.05);
      return fin({bg, surface: mix(bg, '#ffffff', 0.5), ink: '#2A2622', muted: '#7A7066', accent: accentOn(bg, mix(b.primary, '#2A2622', 0.15)), line: mix('#2A2622', bg, 0.75)});
    },
    pacing: {weights: {hook: 1.3, story: 1.4, product: 1.4, feature: 1.1, detail: 1.2, offer: 1, cta: 1.1, logo: 1}, transitionFrames: 22, energy: 'slow', ease: 'glide'},
    motion: {text: {default: 'trackIn', hook: 'fade', story: 'lineStagger'}, media: ['kenBurns', 'zoomOut', 'panUp'], transitions: ['dissolve', 'dissolve', 'iris']},
    layouts: {default: ['framed'], hook: ['fullBleed'], story: ['framed'], feature: ['framed', 'split'], detail: ['collage'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.06, vignette: 0.1, texture: 'paper', frameRule: true},
    logoAnim: 'fade',
    cta: 'minimal',
    captionStyle: 'editorial',
    scale: {hero: 128, title: 96, body: 46, label: 24},
  },
  {
    id: 'kinetic-type',
    name: 'Kinetic Typography',
    mood: 'Loud, rhythmic, scroll-stopping',
    description: 'Words punch in on the beat, colour blocks flip, product snaps in between lines.',
    fonts: {
      display: {family: 'Anton', weight: 400, lineHeight: 0.95, transform: 'uppercase', tracking: 0.005},
      body: {family: 'Inter', weight: 600, lineHeight: 1.2},
      label: {family: 'Inter', weight: 800, lineHeight: 1.1, tracking: 0.12, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = isDark(b.primary) ? b.primary : mix(b.primary, '#0B0B0C', 0.15);
      return fin({bg, surface: acc(b) === b.primary ? '#F4F1EA' : acc(b), ink: '#FFFFFF', muted: '#E8E8E8', accent: acc(b) === b.primary ? '#F4F1EA' : acc(b), line: '#FFFFFF'});
    },
    pacing: {weights: {hook: 0.9, story: 0.8, product: 0.9, feature: 0.6, detail: 0.6, offer: 0.8, cta: 0.9, logo: 0.6}, transitionFrames: 8, energy: 'fast', ease: 'snap'},
    motion: {text: {default: 'punch', story: 'wordRise', cta: 'stamp'}, media: ['zoomOut', 'tiltIn', 'float'], transitions: ['whip', 'blockWipe', 'swipe', 'cut']},
    layouts: {default: ['typeOnly'], product: ['split'], feature: ['typeOnly', 'split'], detail: ['split'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.04, vignette: 0, texture: 'none'},
    logoAnim: 'stamp',
    cta: 'block',
    captionStyle: 'box',
    scale: {hero: 220, title: 170, body: 52, label: 30},
  },
  {
    id: 'cinematic-noir',
    name: 'Cinematic Noir',
    mood: 'Dramatic, suspenseful, premium',
    description: 'Letterboxed frames, a spotlight that finds the product, italic serif whispered over black.',
    fonts: {
      display: {family: 'Playfair Display', weight: 400, style: 'italic', lineHeight: 1.05},
      body: {family: 'Inter', weight: 400, lineHeight: 1.35},
      label: {family: 'Inter', weight: 600, lineHeight: 1.2, tracking: 0.42, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = '#0A0A0B';
      return fin({bg, surface: '#151517', ink: '#F2EEE8', muted: '#9A958E', accent: accentOn(bg, mix(acc(b), '#E9C98B', 0.35), 3), line: '#3A3833'});
    },
    pacing: {weights: {hook: 1.4, story: 1.2, product: 1.6, feature: 1, detail: 1.1, offer: 1, cta: 1, logo: 1.1}, transitionFrames: 18, energy: 'slow', ease: 'glide'},
    motion: {text: {default: 'maskUp', hook: 'fade', logo: 'fade'}, media: ['spotlight', 'kenBurns', 'curtain'], transitions: ['iris', 'filmBurn', 'dissolve']},
    layouts: {default: ['noir'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.12, vignette: 0.55, texture: 'none', letterbox: true, grade: 'contrast(1.12) saturate(0.85)'},
    logoAnim: 'mask',
    cta: 'minimal',
    captionStyle: 'editorial',
    scale: {hero: 120, title: 92, body: 40, label: 22},
  },
  {
    id: 'editorial-magazine',
    name: 'Editorial Magazine',
    mood: 'Fashion-forward, confident, curated',
    description: 'A cover with a masthead, cover lines and multi-frame spreads that turn like pages.',
    fonts: {
      display: {family: 'DM Serif Display', weight: 400, lineHeight: 0.98},
      body: {family: 'Manrope', weight: 500, lineHeight: 1.3},
      label: {family: 'Manrope', weight: 700, lineHeight: 1.1, tracking: 0.2, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = '#FAF8F4';
      return fin({bg, surface: '#111111', ink: '#111111', muted: '#55524D', accent: accentOn(bg, b.primary, 3), line: '#111111'});
    },
    pacing: {weights: {hook: 1.3, story: 1, product: 1.2, feature: 1, detail: 1.1, offer: 1, cta: 1, logo: 0.9}, transitionFrames: 14, energy: 'medium', ease: 'silk'},
    motion: {text: {default: 'slideIn', hook: 'maskUp'}, media: ['parallax', 'kenBurns', 'panLeft'], transitions: ['pageTurn', 'swipe', 'pageTurn']},
    layouts: {default: ['magazine'], story: ['collage'], feature: ['collage', 'split'], detail: ['collage'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.03, vignette: 0, texture: 'none', frameRule: true},
    logoAnim: 'letters',
    cta: 'minimal',
    captionStyle: 'editorial',
    scale: {hero: 210, title: 104, body: 40, label: 24},
  },
  {
    id: 'heritage-story',
    name: 'Heritage Story',
    mood: 'Warm, handmade, rooted',
    description: 'Arched windows, woven textures and motif borders; documentary pacing for craft and origin stories.',
    fonts: {
      display: {family: 'Yeseva One', weight: 400, lineHeight: 1.08},
      body: {family: 'Libre Caslon Text', weight: 400, lineHeight: 1.4},
      label: {family: 'Manrope', weight: 700, lineHeight: 1.2, tracking: 0.28, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = mix('#EFE3CF', b.primary, 0.08);
      const accent = accentOn(bg, mix(b.primary, '#5A1E14', 0.25), 3.5);
      return fin({bg, surface: accent, ink: '#3B2418', muted: '#7A5A44', accent, line: mix(accent, bg, 0.35)});
    },
    pacing: {weights: {hook: 1.2, story: 1.6, product: 1.3, feature: 1.1, detail: 1.3, offer: 1, cta: 1, logo: 1}, transitionFrames: 20, energy: 'slow', ease: 'glide'},
    motion: {text: {default: 'lineStagger', hook: 'wordRise'}, media: ['panUp', 'kenBurns', 'parallax'], transitions: ['paperTear', 'dissolve', 'paperTear']},
    layouts: {default: ['arch'], story: ['framed', 'arch'], feature: ['arch', 'collage'], detail: ['collage'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.08, vignette: 0.15, texture: 'motif'},
    logoAnim: 'fade',
    cta: 'minimal',
    captionStyle: 'editorial',
    scale: {hero: 120, title: 92, body: 40, label: 24},
  },
  {
    id: 'swiss-minimal',
    name: 'Swiss Minimalism',
    mood: 'Precise, rational, modern',
    description: 'Visible grid, flush-left grotesk, one accent colour, block wipes on the column lines.',
    fonts: {
      display: {family: 'Inter', weight: 800, lineHeight: 0.98, tracking: -0.035},
      body: {family: 'Inter', weight: 400, lineHeight: 1.3},
      label: {family: 'Space Grotesk', weight: 700, lineHeight: 1.1, tracking: 0.04},
    },
    palette: (b) => {
      const bg = '#F2F2F0';
      return fin({bg, surface: accentOn(bg, b.primary, 3), ink: '#0E0E0E', muted: '#5C5C5C', accent: accentOn(bg, b.primary, 3), line: '#CFCFCB'});
    },
    pacing: {weights: {hook: 1, story: 1, product: 1.1, feature: 0.9, detail: 0.9, offer: 0.9, cta: 1, logo: 0.8}, transitionFrames: 12, energy: 'medium', ease: 'snap'},
    motion: {text: {default: 'slideIn', hook: 'maskUp'}, media: ['still', 'panLeft', 'zoomOut'], transitions: ['blockWipe', 'shutter', 'blockWipe']},
    layouts: {default: ['swissGrid'], hook: ['swissGrid', 'typeOnly'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0, vignette: 0, texture: 'grid'},
    logoAnim: 'mask',
    cta: 'block',
    captionStyle: 'box',
    scale: {hero: 180, title: 120, body: 40, label: 28},
  },
  {
    id: 'quirky-ad',
    name: 'Quirky Advertising',
    mood: 'Playful, surprising, high-contrast',
    description: 'Stickers, tilted cards, bouncy springs and copy that answers back.',
    fonts: {
      display: {family: 'Syne', weight: 800, lineHeight: 0.98},
      body: {family: 'Space Grotesk', weight: 500, lineHeight: 1.25},
      label: {family: 'Unbounded', weight: 800, lineHeight: 1.1, tracking: 0.02, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = mix(acc(b), '#FFF6D6', 0.78);
      return fin({bg, surface: '#111111', ink: '#111111', muted: '#3B3B3B', accent: accentOn(bg, b.primary, 2.6), line: '#111111'});
    },
    pacing: {weights: {hook: 0.9, story: 0.9, product: 1, feature: 0.75, detail: 0.7, offer: 0.9, cta: 0.9, logo: 0.6}, transitionFrames: 10, energy: 'fast', ease: 'pop'},
    motion: {text: {default: 'stamp', story: 'wordRise', feature: 'punch'}, media: ['tiltIn', 'float', 'zoomOut'], transitions: ['swipe', 'whip', 'iris', 'blockWipe']},
    layouts: {default: ['sticker'], story: ['sticker', 'typeOnly'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.03, vignette: 0, texture: 'halftone'},
    logoAnim: 'stamp',
    cta: 'sticker',
    captionStyle: 'box',
    scale: {hero: 170, title: 120, body: 46, label: 28},
  },
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    mood: 'Clear, benefit-led, conversion-focused',
    description: 'Floating product with soft studio light, feature callouts with leader lines, a price tag only when supplied.',
    fonts: {
      display: {family: 'Space Grotesk', weight: 700, lineHeight: 1.0, tracking: -0.02},
      body: {family: 'Manrope', weight: 500, lineHeight: 1.3},
      label: {family: 'Manrope', weight: 700, lineHeight: 1.1, tracking: 0.16, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = mix('#F5F5F7', b.primary, 0.07);
      return fin({bg, surface: '#FFFFFF', ink: '#121314', muted: '#5D6066', accent: accentOn(bg, b.primary, 3), line: mix('#121314', bg, 0.7)});
    },
    pacing: {weights: {hook: 1, story: 0.9, product: 1.4, feature: 1, detail: 1, offer: 1.1, cta: 1.1, logo: 0.7}, transitionFrames: 12, energy: 'medium', ease: 'silk'},
    motion: {text: {default: 'slideIn', hook: 'wordRise', offer: 'punch'}, media: ['float', 'zoomOut', 'parallax'], transitions: ['swipe', 'dissolve', 'iris']},
    layouts: {default: ['floating'], hook: ['fullBleed'], story: ['split'], detail: ['collage'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0, vignette: 0.06, texture: 'gradient'},
    logoAnim: 'fade',
    cta: 'product',
    captionStyle: 'box',
    scale: {hero: 140, title: 96, body: 42, label: 24},
  },
  {
    id: 'film-nostalgia',
    name: 'Film Nostalgia',
    mood: 'Warm, personal, memory-like',
    description: 'Grainy warm grade, film-frame borders, date stamps and light-leak burns between moments.',
    fonts: {
      display: {family: 'Fraunces', weight: 400, style: 'italic', lineHeight: 1.05},
      body: {family: 'Fraunces', weight: 400, lineHeight: 1.3},
      label: {family: 'JetBrains Mono', weight: 500, lineHeight: 1.2, tracking: 0.08, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = '#1B1712';
      return fin({bg, surface: '#F1E7D6', ink: '#F4EBDD', muted: '#BFAF96', accent: accentOn(bg, mix(acc(b), '#F2A65A', 0.45), 3), line: '#F1E7D6', inkOnSurface: '#2A2118'});
    },
    pacing: {weights: {hook: 1.2, story: 1.4, product: 1.2, feature: 1, detail: 1.1, offer: 1, cta: 1, logo: 1}, transitionFrames: 16, energy: 'medium', ease: 'glide'},
    motion: {text: {default: 'typewriter', hook: 'fade'}, media: ['kenBurns', 'panLeft', 'zoomOut'], transitions: ['filmBurn', 'filmBurn', 'dissolve']},
    layouts: {default: ['filmFrame'], hook: ['fullBleed'], detail: ['collage'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.2, vignette: 0.45, texture: 'film', grade: 'sepia(0.22) saturate(1.1) contrast(1.05)'},
    logoAnim: 'fade',
    cta: 'minimal',
    captionStyle: 'editorial',
    scale: {hero: 118, title: 90, body: 40, label: 24},
  },
  {
    id: 'founder-story',
    name: 'Founder Story',
    mood: 'Honest, human, direct-to-camera',
    description: 'Talking-head or portrait footage, a lower-third name card and word-by-word captions with B-roll cutaways.',
    fonts: {
      display: {family: 'Instrument Serif', weight: 400, lineHeight: 1.02},
      body: {family: 'Inter', weight: 600, lineHeight: 1.25},
      label: {family: 'Inter', weight: 600, lineHeight: 1.2, tracking: 0.14, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = '#101012';
      return fin({bg, surface: '#FFFFFF', ink: '#FFFFFF', muted: '#C9C9CC', accent: accentOn(bg, acc(b), 3), line: '#FFFFFF', inkOnSurface: '#111111'});
    },
    pacing: {weights: {hook: 1.1, story: 1.5, product: 1.1, feature: 1, detail: 1, offer: 1, cta: 1, logo: 0.8}, transitionFrames: 10, energy: 'medium', ease: 'silk'},
    motion: {text: {default: 'wordRise', hook: 'highlight'}, media: ['kenBurns', 'zoomOut', 'panUp'], transitions: ['cut', 'dissolve', 'cut', 'whip']},
    layouts: {default: ['lowerThird'], detail: ['collage'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.04, vignette: 0.25, texture: 'none'},
    logoAnim: 'fade',
    cta: 'pill',
    captionStyle: 'karaoke',
    scale: {hero: 130, title: 96, body: 50, label: 26},
  },
  {
    id: 'depth-studio',
    name: 'Depth Studio',
    mood: 'Immersive, premium, tech-forward',
    description: '3D: photos float at different depths, cube turns between scenes, the product stands on a reflective floor.',
    fonts: {
      display: {family: 'Unbounded', weight: 600, lineHeight: 1.04, tracking: -0.02},
      body: {family: 'Inter', weight: 400, lineHeight: 1.3},
      label: {family: 'Inter', weight: 600, lineHeight: 1.1, tracking: 0.16, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = mix('#0B0C10', b.primary, 0.16);
      return fin({bg, surface: mix('#171920', b.primary, 0.12), ink: '#F4F5F7', muted: '#A9ADB8', accent: accentOn(bg, acc(b), 3), line: '#FFFFFF', inkOnSurface: '#F4F5F7'});
    },
    pacing: {weights: {hook: 1, story: 1, product: 1.4, feature: 1.1, detail: 1.1, offer: 1, cta: 1, logo: 0.8}, transitionFrames: 16, energy: 'medium', ease: 'silk'},
    motion: {text: {default: 'maskUp', hook: 'trackIn', offer: 'punch'}, media: ['orbit', 'dolly', 'tilt3d'], transitions: ['cube', 'zoomThrough', 'cube']},
    layouts: {default: ['depthStack', 'floor'], hook: ['fullBleed'], product: ['floor'], feature: ['cube', 'depthStack'], detail: ['depthStack'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.03, vignette: 0.35, texture: 'none'},
    logoAnim: 'mask',
    cta: 'pill',
    captionStyle: 'box',
    scale: {hero: 120, title: 88, body: 40, label: 24},
  },
  {
    id: 'cube-motion',
    name: 'Cube Motion',
    mood: 'Bold, playful, scroll-stopping',
    description: '3D: a spinning photo cube, cards that flip in and fly through the screen.',
    fonts: {
      display: {family: 'Archivo Black', weight: 400, lineHeight: 0.98, tracking: -0.01},
      body: {family: 'Manrope', weight: 500, lineHeight: 1.3},
      label: {family: 'Manrope', weight: 700, lineHeight: 1.1, tracking: 0.14, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = mix('#FFF8EC', b.primary, 0.08);
      return fin({bg, surface: '#FFFFFF', ink: '#141414', muted: '#555555', accent: accentOn(bg, b.primary, 3), line: '#141414'});
    },
    pacing: {weights: {hook: 0.9, story: 1, product: 1.2, feature: 1, detail: 1, offer: 1.1, cta: 1, logo: 0.7}, transitionFrames: 12, energy: 'fast', ease: 'snap'},
    motion: {text: {default: 'punch', story: 'wordRise', offer: 'stamp'}, media: ['tilt3d', 'orbit', 'float'], transitions: ['flip', 'cube', 'zoomThrough']},
    layouts: {default: ['cube'], hook: ['typeOnly'], story: ['floor'], detail: ['depthStack'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0, vignette: 0, texture: 'halftone'},
    logoAnim: 'stamp',
    cta: 'block',
    captionStyle: 'karaoke',
    scale: {hero: 132, title: 96, body: 42, label: 24},
  },
  {
    id: 'gallery-depth',
    name: 'Gallery Depth',
    mood: 'Calm, editorial, gallery-like',
    description: '3D: a slow walk past photos hung at different depths, with soft dolly moves and page flips.',
    fonts: {
      display: {family: 'Playfair Display', weight: 400, lineHeight: 1.04},
      body: {family: 'Inter', weight: 400, lineHeight: 1.35},
      label: {family: 'Inter', weight: 600, lineHeight: 1.1, tracking: 0.18, transform: 'uppercase'},
    },
    palette: (b) => {
      const bg = mix('#F3F0EA', b.primary, 0.05);
      return fin({bg, surface: '#FFFFFF', ink: '#151515', muted: '#5E5A55', accent: accentOn(bg, b.primary, 3), line: mix('#151515', bg, 0.6)});
    },
    pacing: {weights: {hook: 1.2, story: 1.3, product: 1.3, feature: 1, detail: 1.2, offer: 1, cta: 1, logo: 1}, transitionFrames: 20, energy: 'slow', ease: 'glide'},
    motion: {text: {default: 'lineStagger', hook: 'maskUp'}, media: ['dolly', 'orbit', 'kenBurns'], transitions: ['zoomThrough', 'flip', 'dissolve']},
    layouts: {default: ['depthStack'], hook: ['fullBleed'], product: ['floor'], story: ['split'], cta: ['cta'], logo: ['logo']},
    decor: {grain: 0.03, vignette: 0.12, texture: 'paper'},
    logoAnim: 'fade',
    cta: 'minimal',
    captionStyle: 'editorial',
    scale: {hero: 120, title: 88, body: 40, label: 22},
  },
];

export const themeById = (id: string) => THEMES.find((t) => t.id === id) ?? THEMES[0];
