import {Easing, interpolate} from 'remotion';

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const EASE = {
  silk: Easing.bezier(0.22, 1, 0.36, 1),
  glide: Easing.bezier(0.45, 0, 0.15, 1),
  snap: Easing.bezier(0.7, 0, 0.2, 1),
  pop: Easing.bezier(0.34, 1.56, 0.64, 1),
  linear: Easing.linear,
};
export type EaseName = keyof typeof EASE;

/** 0..1 progress of a window starting at `start` lasting `len` frames. */
export const prog = (frame: number, start: number, len: number, ease: EaseName = 'silk') =>
  interpolate(frame, [start, start + Math.max(1, len)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE[ease]});

/** Mulberry32: tiny deterministic RNG so every render of the same spec is identical. */
export const rng = (seedStr: string) => {
  let a = 0;
  for (let i = 0; i < seedStr.length; i++) a = (Math.imul(31, a) + seedStr.charCodeAt(i)) | 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Instagram Reels safe area for 1080x1920 (top bar, caption/CTA area at bottom, action rail on the right). */
export const SAFE = {top: 250, bottom: 440, left: 72, right: 168};
export const safeBox = (W: number, H: number) => ({
  x: SAFE.left,
  y: SAFE.top,
  w: W - SAFE.left - SAFE.right,
  h: H - SAFE.top - SAFE.bottom,
});
