import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import type {TransitionId} from '../engine/schema';
import {EASE} from '../engine/motion';

/**
 * Wraps the *incoming* scene. p goes 0→1 across the overlap with the previous scene.
 * Every transition is a CSS function of p, so renders are frame-deterministic.
 */
export const TransitionIn: React.FC<{id: TransitionId; p: number; accent: string; seed: number; children: React.ReactNode}> = ({id, p, accent, seed, children}) => {
  if (p >= 1 || id === 'cut') return <AbsoluteFill>{children}</AbsoluteFill>;
  const e = EASE.glide(p);
  const dir = seed % 2 === 0 ? 1 : -1;
  switch (id) {
    case 'dissolve':
      return <AbsoluteFill style={{opacity: e}}>{children}</AbsoluteFill>;
    case 'swipe':
      return <AbsoluteFill style={{clipPath: dir > 0 ? `inset(0 0 0 ${100 - e * 100}%)` : `inset(0 ${100 - e * 100}% 0 0)`}}>{children}</AbsoluteFill>;
    case 'whip': {
      const x = (1 - EASE.snap(p)) * 100 * dir;
      return <AbsoluteFill style={{transform: `translateX(${x}%)`, filter: `blur(${(1 - p) * 26}px)`}}>{children}</AbsoluteFill>;
    }
    case 'iris':
      return <AbsoluteFill style={{clipPath: `circle(${e * 120}% at 50% 48%)`}}>{children}</AbsoluteFill>;
    case 'filmBurn': {
      const flash = interpolate(p, [0, 0.45, 1], [0, 1, 0]);
      return (
        <AbsoluteFill>
          <AbsoluteFill style={{opacity: interpolate(p, [0.35, 0.65], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{children}</AbsoluteFill>
          <AbsoluteFill style={{background: 'radial-gradient(circle at 70% 40%, #FFF3D6 0%, #FF9A3C 35%, rgba(180,40,0,0.6) 70%, transparent 100%)', opacity: flash, mixBlendMode: 'screen'}} />
        </AbsoluteFill>
      );
    }
    case 'paperTear': {
      // jagged edge sweeping upward
      const y = 100 - e * 112;
      const pts: string[] = [];
      for (let i = 0; i <= 20; i++) {
        const jag = (i % 2 === 0 ? 2.2 : -2.2) + ((i * 37 + seed) % 5) * 0.4;
        pts.push(`${i * 5}% ${y + jag}%`);
      }
      return (
        <AbsoluteFill style={{clipPath: `polygon(${pts.join(',')}, 100% 100%, 0% 100%)`}}>
          {children}
        </AbsoluteFill>
      );
    }
    case 'shutter': {
      const n = 6;
      return (
        <AbsoluteFill>
          {Array.from({length: n}).map((_, i) => {
            const q = Math.max(0, Math.min(1, p * 1.6 - i * 0.1));
            const top = (i / n) * 100;
            return (
              <AbsoluteFill key={i} style={{clipPath: `inset(${top}% 0 ${100 - top - (100 / n) * EASE.snap(q)}% 0)`}}>
                {children}
              </AbsoluteFill>
            );
          })}
        </AbsoluteFill>
      );
    }
    case 'blockWipe': {
      const a = EASE.snap(Math.min(1, p * 2));
      const b = EASE.snap(Math.max(0, p * 2 - 1));
      return (
        <AbsoluteFill>
          <AbsoluteFill style={{clipPath: `inset(0 ${100 - b * 100}% 0 0)`}}>{children}</AbsoluteFill>
          <div style={{position: 'absolute', top: 0, bottom: 0, left: `${b * 100}%`, width: `${(a - b) * 100}%`, background: accent}} />
        </AbsoluteFill>
      );
    }
    case 'pageTurn': {
      const r = (1 - e) * -85 * dir;
      return (
        <AbsoluteFill style={{perspective: 2400}}>
          <AbsoluteFill style={{transform: `rotateY(${r}deg)`, transformOrigin: dir > 0 ? 'left center' : 'right center', boxShadow: `0 0 80px rgba(0,0,0,${0.5 * (1 - e)})`}}>{children}</AbsoluteFill>
        </AbsoluteFill>
      );
    }
    case 'cube': {
      // the incoming scene is the next face of a cube turning towards the viewer
      const a = (1 - e) * 90 * dir;
      return (
        <AbsoluteFill style={{perspective: 2200, perspectiveOrigin: '50% 50%'}}>
          <AbsoluteFill style={{transform: `translateZ(-540px) rotateY(${a}deg) translateZ(540px)`, transformOrigin: '50% 50%', backfaceVisibility: 'hidden'}}>
            {children}
            <AbsoluteFill style={{background: `rgba(0,0,0,${0.55 * (1 - e)})`}} />
          </AbsoluteFill>
        </AbsoluteFill>
      );
    }
    case 'flip': {
      const a = (1 - EASE.pop(p)) * -95;
      return (
        <AbsoluteFill style={{perspective: 2600}}>
          <AbsoluteFill style={{transform: `rotateX(${a}deg) scale(${0.9 + 0.1 * e})`, transformOrigin: '50% 0%', backfaceVisibility: 'hidden', boxShadow: `0 40px 120px rgba(0,0,0,${0.45 * (1 - e)})`}}>{children}</AbsoluteFill>
        </AbsoluteFill>
      );
    }
    case 'zoomThrough': {
      // flies in from behind the camera
      const z = (1 - e) * 900;
      return (
        <AbsoluteFill style={{perspective: 1600}}>
          <AbsoluteFill style={{transform: `translateZ(${z}px)`, opacity: Math.min(1, p * 2.2), filter: `blur(${(1 - e) * 18}px)`}}>{children}</AbsoluteFill>
        </AbsoluteFill>
      );
    }
    default:
      return <AbsoluteFill>{children}</AbsoluteFill>;
  }
};
