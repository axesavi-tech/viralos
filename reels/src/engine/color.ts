export type RGB = [number, number, number];

export const hexToRgb = (h: string): RGB => {
  const n = parseInt(h.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
export const rgbToHex = ([r, g, b]: RGB) =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

export const mix = (a: string, b: string, t: number) => {
  const x = hexToRgb(a), y = hexToRgb(b);
  return rgbToHex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t]);
};

const lin = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
export const luminance = (h: string) => {
  const [r, g, b] = hexToRgb(h);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
export const contrast = (a: string, b: string) => {
  const la = luminance(a), lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/** Pick the candidate with the best contrast; if none reaches `min`, push towards black/white until it does. */
export const readable = (bg: string, candidates: string[], min = 4.5) => {
  const best = [...candidates].sort((a, b) => contrast(b, bg) - contrast(a, bg))[0];
  if (contrast(best, bg) >= min) return best;
  const target = luminance(bg) > 0.4 ? '#000000' : '#ffffff';
  for (let t = 0.1; t <= 1.0001; t += 0.1) {
    const c = mix(best, target, t);
    if (contrast(c, bg) >= min) return c;
  }
  return target;
};

export const alpha = (h: string, a: number) => {
  const [r, g, b] = hexToRgb(h);
  return `rgba(${r},${g},${b},${a})`;
};

export const isDark = (h: string) => luminance(h) < 0.18;
