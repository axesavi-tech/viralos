/** Deterministic text fitting: wraps words and finds the largest size that fits a box. */
let ctx: CanvasRenderingContext2D | null = null;
const getCtx = () => {
  if (!ctx) ctx = document.createElement('canvas').getContext('2d');
  return ctx!;
};

export type FontSpec = {family: string; weight: string | number; style?: 'normal' | 'italic'; tracking?: number; lineHeight: number; transform?: 'uppercase' | 'none'};

const measure = (text: string, size: number, f: FontSpec) => {
  const c = getCtx();
  c.font = `${f.style ?? 'normal'} ${f.weight} ${size}px "${f.family}"`;
  const w = c.measureText(text).width;
  return w + (f.tracking ?? 0) * size * Math.max(0, text.length - 1);
};

export const wrap = (text: string, size: number, maxWidth: number, f: FontSpec) => {
  const t = f.transform === 'uppercase' ? text.toUpperCase() : text;
  const words = t.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const cand = line ? line + ' ' + w : w;
    if (measure(cand, size, f) <= maxWidth || !line) line = cand;
    else {
      lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  const widest = Math.max(0, ...lines.map((l) => measure(l, size, f)));
  return {lines, widest};
};

export type Fitted = {size: number; lines: string[]; overflow: boolean; height: number};

const cache = new Map<string, Fitted>();
export const fit = (text: string, f: FontSpec, box: {w: number; h: number}, maxSize: number, minSize: number, maxLines = 4): Fitted => {
  const key = [text, f.family, f.weight, f.style, f.tracking, f.lineHeight, f.transform, box.w, box.h, maxSize, minSize, maxLines].join('|');
  const hit = cache.get(key);
  if (hit) return hit;
  let lo = minSize, hi = maxSize, best: Fitted | null = null;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    const {lines, widest} = wrap(text, mid, box.w, f);
    const h = lines.length * mid * f.lineHeight;
    const ok = widest <= box.w + 0.5 && h <= box.h && lines.length <= maxLines;
    if (ok) {
      best = {size: mid, lines, overflow: false, height: h};
      lo = mid;
    } else hi = mid;
  }
  if (!best) {
    const {lines} = wrap(text, minSize, box.w, f);
    best = {size: minSize, lines, overflow: true, height: lines.length * minSize * f.lineHeight};
  }
  best.size = Math.floor(best.size);
  cache.set(key, best);
  return best;
};

/** Collected by the QA run: any text that could not fit at its minimum size. */
export const overflowLog: string[] = [];
