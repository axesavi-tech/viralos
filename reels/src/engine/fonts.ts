import {loadFont} from '@remotion/fonts';
import {staticFile, continueRender, delayRender} from 'remotion';

type Face = {family: string; file: string; weight: string; style?: 'normal' | 'italic'};

const F = (family: string, file: string, weight: string, style: 'normal' | 'italic' = 'normal'): Face => ({family, file, weight, style});

export const FACES: Face[] = [
  F('Cormorant Garamond', 'cormorant-garamond-latin-400-normal.woff2', '400'),
  F('Cormorant Garamond', 'cormorant-garamond-latin-600-normal.woff2', '600'),
  F('Cormorant Garamond', 'cormorant-garamond-latin-400-italic.woff2', '400', 'italic'),
  F('Playfair Display', 'playfair-display-latin-400-normal.woff2', '400'),
  F('Playfair Display', 'playfair-display-latin-700-normal.woff2', '700'),
  F('Playfair Display', 'playfair-display-latin-400-italic.woff2', '400', 'italic'),
  F('Inter', 'inter-latin-400-normal.woff2', '400'),
  F('Inter', 'inter-latin-600-normal.woff2', '600'),
  F('Inter', 'inter-latin-800-normal.woff2', '800'),
  F('Bebas Neue', 'bebas-neue-latin-400-normal.woff2', '400'),
  F('Space Grotesk', 'space-grotesk-latin-500-normal.woff2', '500'),
  F('Space Grotesk', 'space-grotesk-latin-700-normal.woff2', '700'),
  F('DM Serif Display', 'dm-serif-display-latin-400-normal.woff2', '400'),
  F('Archivo Black', 'archivo-black-latin-400-normal.woff2', '400'),
  F('Syne', 'syne-latin-600-normal.woff2', '600'),
  F('Syne', 'syne-latin-800-normal.woff2', '800'),
  F('Fraunces', 'fraunces-latin-400-normal.woff2', '400'),
  F('Fraunces', 'fraunces-latin-700-normal.woff2', '700'),
  F('Fraunces', 'fraunces-latin-400-italic.woff2', '400', 'italic'),
  F('JetBrains Mono', 'jetbrains-mono-latin-500-normal.woff2', '500'),
  F('Anton', 'anton-latin-400-normal.woff2', '400'),
  F('Instrument Serif', 'instrument-serif-latin-400-normal.woff2', '400'),
  F('Instrument Serif', 'instrument-serif-latin-400-italic.woff2', '400', 'italic'),
  F('Unbounded', 'unbounded-latin-600-normal.woff2', '600'),
  F('Unbounded', 'unbounded-latin-800-normal.woff2', '800'),
  F('Libre Caslon Text', 'libre-caslon-text-latin-400-normal.woff2', '400'),
  F('Manrope', 'manrope-latin-500-normal.woff2', '500'),
  F('Manrope', 'manrope-latin-700-normal.woff2', '700'),
  F('Yeseva One', 'yeseva-one-latin-400-normal.woff2', '400'),
];

let loading: Promise<void> | null = null;
export const ensureFonts = (fontBase?: string) => {
  if (!loading) {
    loading = Promise.all(
      FACES.map((f) =>
        loadFont({
          family: f.family,
          url: fontBase ? `${fontBase}/${f.file}` : staticFile(`fonts/${f.file}`),
          weight: f.weight,
          style: f.style,
        }).catch(() => undefined),
      ),
    ).then(() => undefined);
  }
  return loading;
};

/** Blocks rendering until every face is ready, so text measurement is exact. */
export const useFontsReady = (fontBase?: string) => {
  if (typeof window === 'undefined') return;
  if ((window as any).__kathaviFontsReady) return;
  const h = delayRender('fonts');
  ensureFonts(fontBase).then(() => {
    (window as any).__kathaviFontsReady = true;
    continueRender(h);
  });
};
