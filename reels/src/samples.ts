import type {Brief} from './engine/schema';

const img = (f: string, focusX = 0.5, focusY = 0.5) => ({src: `samples/${f}`, focusX, focusY});
/** Iraaya's own product photos, loaded from its Shopify store rather than copied into this repository. */
const iraayaImg = (file: string, focusY = 0.3) => ({src: `https://cdn.shopify.com/s/files/1/0631/0546/6445/files/${file}&width=1200`, focusX: 0.5, focusY});

/**
 * The five demo brands every customer can try before setting up their own brand.
 * Iraaya is a real brand (its own photos); Kaapiyo, Ojasri, Dhaavo and Mittiko are sample brands with
 * Unsplash photos. Prices and offers appear only because these briefs supply them; the planner never invents them.
 */
export const BRIEFS: Record<string, Omit<Brief, 'themeId' | 'durationSec'>> = {
  iraaya: {
    brand: {name: 'Iraaya', tagline: 'Handloom, unhurried', primary: '#6B1A1A', accent: '#C9A96E', handle: '@iraaya_luxe'},
    objective: 'story',
    hook: 'Woven slowly. Worn for a lifetime.',
    story: 'Every saree is handwoven by master artisans, one thread at a time.',
    productName: 'The Handloom Edit',
    features: ['Pure handloom weaves', 'Ikat patterns, dyed before weaving', 'Made in small batches'],
    cta: 'Explore the edit',
    media: [
      iraayaImg('Image_19.png?v=1782757013', 0.28),
      iraayaImg('Image_23.png?v=1782757080', 0.28),
      iraayaImg('Image_15.png?v=1782756937', 0.28),
      iraayaImg('Image_1.png?v=1782756522', 0.28),
      iraayaImg('1_1afacbdc-7c00-49a4-a719-9f0835e62240.png?v=1780389777', 0.28),
    ],
    intensity: 1,
    showSafeZones: false,
  },
  kaapiyo: {
    brand: {name: 'Kaapiyo', tagline: 'Small-batch filter coffee', primary: '#3D2A1E', accent: '#E8A33D', handle: '@kaapiyo'},
    objective: 'awareness',
    hook: 'Your morning deserves better coffee.',
    story: 'Roasted every Friday, in batches small enough to taste.',
    productName: 'Kaapiyo House Blend',
    features: ['Roasted to order', 'Single-estate beans', 'Pour-over friendly'],
    cta: 'Order a bag',
    media: [img('u_1509042239860-f550ce710b93.jpg', 0.5, 0.55), img('u_1495474472287-4d71bcdd2085.jpg', 0.5, 0.4)],
    intensity: 1,
    showSafeZones: false,
  },
  kaapiyoFounder: {
    brand: {name: 'Kaapiyo', tagline: 'Small-batch filter coffee', primary: '#3D2A1E', accent: '#E8A33D', handle: '@kaapiyo'},
    objective: 'story',
    hook: 'I quit my job to roast coffee.',
    story: 'Founder, Kaapiyo',
    productName: 'Kaapiyo House Blend',
    features: ['Roasted every Friday', 'We know every farmer by name'],
    cta: 'Taste the story',
    voiceover: 'Three years ago I left a desk job with one goal. Coffee that tastes like someone actually cared. Every bag we roast is small enough to check by hand. That is the whole idea.',
    media: [img('u_1495474472287-4d71bcdd2085.jpg', 0.45, 0.4), img('u_1509042239860-f550ce710b93.jpg', 0.5, 0.5)],
    intensity: 1,
    showSafeZones: false,
  },
  ojasri: {
    brand: {name: 'Ojasri', tagline: 'Ayurveda, made gentle', primary: '#5B7F5A', accent: '#C98B4F', handle: '@ojasri.skin'},
    objective: 'launch',
    hook: 'Three drops. Calmer skin by morning.',
    story: 'A cold-pressed face oil built on kumkumadi, for skin that has had enough.',
    productName: 'Kumkumadi Night Oil',
    features: ['Cold-pressed oils', 'Fragrance free', 'Patch-tested'],
    price: '₹1,450',
    cta: 'Shop the oil',
    media: [img('u_1608571423902-eed4a5ad8108.jpg', 0.5, 0.5), img('u_1515377905703-c4788e51af15.jpg', 0.6, 0.4)],
    intensity: 1,
    showSafeZones: false,
  },
  dhaavo: {
    brand: {name: 'Dhaavo', tagline: 'Run your city', primary: '#E4572E', accent: '#F2C14E', handle: '@dhaavo.run'},
    objective: 'launch',
    hook: 'Five a.m. The city is yours.',
    story: 'A running club and kit for people who run before work.',
    productName: 'Dhaavo Dawn Club',
    features: ['Free Sunday group runs', 'Kit tested on monsoon roads', 'Pace groups for every runner'],
    offer: 'First month of club runs free',
    cta: 'Join the club',
    media: [img('u_1502224562085-639556652f33.jpg', 0.5, 0.45), img('u_1594882645126-14020914d58d.jpg', 0.45, 0.5), img('u_1522040942177-269680274214.jpg', 0.5, 0.6)],
    intensity: 1.1,
    showSafeZones: false,
  },
  mittiko: {
    brand: {name: 'Mittiko', tagline: 'Clay, by hand', primary: '#2F4A7A', accent: '#C9A227', handle: '@mittiko.studio'},
    objective: 'showcase',
    hook: 'Made slowly, for slow mornings.',
    story: 'Every bowl is thrown, glazed and fired by hand in our studio.',
    productName: 'The Everyday Set',
    features: ['Food-safe glazes', 'Each piece is one of a kind', 'Dishwasher safe'],
    price: '₹3,200',
    cta: 'Shop the set',
    media: [img('u_1610128361323-6e941c97f023.jpg', 0.45, 0.55), img('u_1523367438061-01c055ce790c.jpg', 0.5, 0.55), img('u_1756411739641-ae2a8146a689.jpg', 0.5, 0.5)],
    intensity: 1,
    showSafeZones: false,
  },
};

/** One sample reel per theme, so every theme has a rendered example. */
export const DEMOS: {brief: keyof typeof BRIEFS; themeId: string; durationSec: 15 | 30 | 45 | 60 | 90}[] = [
  {brief: 'iraaya', themeId: 'quiet-luxury', durationSec: 30},
  {brief: 'iraaya', themeId: 'heritage-story', durationSec: 30},
  {brief: 'iraaya', themeId: 'editorial-magazine', durationSec: 15},
  {brief: 'kaapiyo', themeId: 'film-nostalgia', durationSec: 30},
  {brief: 'kaapiyoFounder', themeId: 'founder-story', durationSec: 30},
  {brief: 'ojasri', themeId: 'product-showcase', durationSec: 30},
  {brief: 'ojasri', themeId: 'gallery-depth', durationSec: 30},
  {brief: 'dhaavo', themeId: 'kinetic-type', durationSec: 15},
  {brief: 'dhaavo', themeId: 'cinematic-noir', durationSec: 30},
  {brief: 'dhaavo', themeId: 'depth-studio', durationSec: 30},
  {brief: 'mittiko', themeId: 'swiss-minimal', durationSec: 30},
  {brief: 'mittiko', themeId: 'quirky-ad', durationSec: 15},
  {brief: 'mittiko', themeId: 'cube-motion', durationSec: 30},
];
