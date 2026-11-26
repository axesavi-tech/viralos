import React from 'react';
import {Img, interpolate, useCurrentFrame} from 'remotion';
import type {Media} from '../engine/schema';
import type {MediaAnim} from '../engine/types';
import {prog} from '../engine/motion';

type Props = {
  media?: Media;
  anim: MediaAnim;
  dur: number;
  style?: React.CSSProperties;
  radius?: number | string;
  clip?: string;
  intensity?: number;
  grade?: string;
  fallback?: string;
  seed?: number;
};

/** A cropped image with focal-point preservation and a deterministic camera move. */
export const MediaBox: React.FC<Props> = ({media, anim, dur, style, radius, clip, intensity = 1, grade, fallback = '#888', seed = 0}) => {
  const f = useCurrentFrame();
  const t = Math.min(1, f / Math.max(1, dur));
  const k = intensity;
  let transform = '';
  let extra: React.CSSProperties = {};
  let overlay: React.ReactNode = null;
  const dir = seed % 2 === 0 ? 1 : -1;

  switch (anim) {
    case 'kenBurns':
      transform = `scale(${1.06 + 0.1 * t * k}) translate(${dir * 1.5 * t * k}%, ${-1 * t * k}%)`;
      break;
    case 'zoomOut':
      transform = `scale(${1.22 - 0.16 * prog(f, 0, dur * 0.8, 'silk') * k})`;
      break;
    case 'panUp':
      transform = `scale(1.18) translateY(${(4 - 8 * t) * k}%)`;
      break;
    case 'panLeft':
      transform = `scale(1.18) translateX(${dir * (5 - 10 * t) * k}%)`;
      break;
    case 'parallax':
      transform = `scale(1.2) translate(${dir * (3 - 6 * t) * k}%, ${(2 - 4 * t) * k}%)`;
      break;
    case 'float': {
      const y = Math.sin((f / 30) * Math.PI * 0.6) * 1.2 * k;
      transform = `scale(${1.02 + 0.03 * t}) translateY(${y}%)`;
      break;
    }
    case 'tiltIn': {
      const p = prog(f, 0, 14, 'pop');
      transform = `scale(${0.85 + 0.15 * p}) rotate(${(1 - p) * -6 * dir}deg)`;
      break;
    }
    case 'spotlight': {
      const p = prog(f, 0, Math.min(40, dur * 0.6), 'glide');
      transform = `scale(${1.1 + 0.06 * t})`;
      const r = interpolate(p, [0, 1], [12, 95]);
      overlay = <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at ${45 + 10 * t}% 45%, transparent ${r * 0.55}%, rgba(0,0,0,${0.92 - 0.5 * p}) ${r}%)`}} />;
      break;
    }
    case 'curtain': {
      const p = prog(f, 0, Math.min(36, dur * 0.6), 'glide');
      transform = `scale(${1.08 + 0.05 * t})`;
      extra = {clipPath: `inset(0 ${50 - 50 * p}% 0 ${50 - 50 * p}%)`};
      break;
    }
    case 'orbit':
      // slow camera orbit around the subject
      transform = `perspective(1600px) rotateY(${dir * (9 - 18 * t) * k}deg) scale(1.2)`;
      break;
    case 'dolly':
      // push-in through depth with a slight downward tilt
      transform = `perspective(1400px) translateZ(${(40 + 150 * t) * k}px) rotateX(${(5 - 5 * t) * k}deg) scale(1.08)`;
      break;
    case 'tilt3d': {
      const p = prog(f, 0, 22, 'pop');
      transform = `perspective(1400px) rotateX(${(1 - p) * 24 * k}deg) rotateY(${(1 - p) * -10 * dir * k}deg) scale(${1.16 + 0.04 * t})`;
      break;
    }
    case 'still':
    default:
      transform = 'scale(1.02)';
  }

  const pos = media ? `${(media.focusX ?? 0.5) * 100}% ${(media.focusY ?? 0.5) * 100}%` : '50% 50%';
  return (
    <div style={{position: 'absolute', overflow: 'hidden', borderRadius: radius, clipPath: clip, background: fallback, ...style}}>
      <div style={{position: 'absolute', inset: 0, ...extra}}>
        {media ? (
          <Img src={media.src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform, transformOrigin: pos, filter: grade}} />
        ) : null}
      </div>
      {overlay}
    </div>
  );
};
