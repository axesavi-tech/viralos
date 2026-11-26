import React from 'react';
import {Img, Loop, OffthreadVideo, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {isVideo, type Media} from '../engine/schema';
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
  /** static output (posts, PNG export): show a video's poster frame instead of the clip */
  still?: boolean;
};

/** A cropped image with focal-point preservation and a deterministic camera move. */
export const MediaBox: React.FC<Props> = ({media, anim, dur, style, radius, clip, intensity = 1, grade, fallback = '#888', seed = 0, still}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
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
  const zoom = media?.zoom ?? 1;
  const contain = media?.fit === 'contain';
  const video = isVideo(media);
  const showClip = video && !(still && media?.poster);
  const imgSrc = video ? media?.poster : media?.src;

  // The layer that carries the photo or clip. `fit` decides fill vs whole-product; the customer's zoom and focus
  // sit under the theme's camera move, so templates keep their motion and the product stays where they framed it.
  const visual = (fitMode: 'cover' | 'contain', blur?: boolean): React.ReactNode => {
    const st: React.CSSProperties = {width: '100%', height: '100%', objectFit: fitMode, objectPosition: pos, filter: blur ? `${grade ?? ''} blur(38px) saturate(1.1) brightness(0.92)` : grade};
    if (showClip && !blur) {
      const trim = Math.round((media!.trimStart ?? 0) * fps);
      const clipFrames = media!.durationSec ? Math.max(1, Math.round(media!.durationSec * fps) - trim) : 0;
      const v = <OffthreadVideo src={media!.src} muted trimBefore={trim || undefined} style={st} pauseWhenBuffering />;
      return clipFrames ? <Loop durationInFrames={clipFrames} layout="none">{v}</Loop> : v;
    }
    return imgSrc ? <Img src={imgSrc} style={st} /> : null;
  };

  return (
    <div style={{position: 'absolute', overflow: 'hidden', borderRadius: radius, clipPath: clip, background: fallback, ...style}}>
      {media && contain && (imgSrc || !video) ? <div style={{position: 'absolute', inset: '-8%'}}>{visual('cover', true)}</div> : null}
      <div style={{position: 'absolute', inset: 0, ...extra}}>
        {media ? (
          <div style={{position: 'absolute', inset: 0, transform: zoom !== 1 ? `scale(${zoom})` : undefined, transformOrigin: pos}}>
            <div style={{position: 'absolute', inset: 0, transform, transformOrigin: pos}}>{visual(contain ? 'contain' : 'cover')}</div>
          </div>
        ) : null}
      </div>
      {overlay}
    </div>
  );
};
