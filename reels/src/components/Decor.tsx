import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, random} from 'remotion';
import {alpha, mix} from '../engine/color';
import type {Palette, Texture as TextureKind} from '../engine/types';

/** Film grain: SVG turbulence whose seed steps every 2 frames (deterministic). */
export const Grain: React.FC<{amount: number}> = ({amount}) => {
  const f = useCurrentFrame();
  if (amount <= 0) return null;
  const seed = Math.floor(f / 2) % 97;
  return (
    <AbsoluteFill style={{mixBlendMode: 'overlay', opacity: amount * 2.2, pointerEvents: 'none'}}>
      <svg width="100%" height="100%">
        <filter id={`g${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{amount: number}> = ({amount}) =>
  amount > 0 ? <AbsoluteFill style={{pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,${amount}) 100%)`}} /> : null;

export const Texture: React.FC<{kind: TextureKind; p: Palette}> = ({kind, p}) => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  switch (kind) {
    case 'paper':
      return (
        <AbsoluteFill style={{opacity: 0.5, mixBlendMode: 'multiply'}}>
          <svg width="100%" height="100%">
            <filter id="paper">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={4} seed={7} />
              <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.5  0 0 0 0 0.45  0 0 0 0.18 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#paper)" />
          </svg>
        </AbsoluteFill>
      );
    case 'grid': {
      const cols = 6, gx = width / cols;
      return (
        <AbsoluteFill>
          <svg width={width} height={height}>
            {Array.from({length: cols + 1}).map((_, i) => (
              <line key={i} x1={i * gx} y1={0} x2={i * gx} y2={height} stroke={p.line} strokeWidth={1.5} />
            ))}
            {Array.from({length: 13}).map((_, i) => (
              <line key={'h' + i} x1={0} y1={i * (height / 12)} x2={width} y2={i * (height / 12)} stroke={p.line} strokeWidth={1} opacity={0.6} />
            ))}
          </svg>
        </AbsoluteFill>
      );
    }
    case 'motif': {
      const c = alpha(p.accent, 0.13);
      return (
        <AbsoluteFill>
          <svg width={width} height={height}>
            <defs>
              <pattern id="motif" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M60 14 L74 60 L60 106 L46 60 Z" fill="none" stroke={c} strokeWidth="2" />
                <circle cx="60" cy="60" r="6" fill={c} />
                <circle cx="0" cy="0" r="4" fill={c} />
                <circle cx="120" cy="120" r="4" fill={c} />
              </pattern>
              <pattern id="border" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 6 C40 18 40 42 30 54 C20 42 20 18 30 6 Z" fill={alpha(p.accent, 0.5)} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#motif)" />
            <rect x={0} y={0} width={width} height={60} fill="url(#border)" />
            <rect x={0} y={height - 60} width={width} height={60} fill="url(#border)" />
          </svg>
        </AbsoluteFill>
      );
    }
    case 'film': {
      const flick = 0.04 * random(`fl${Math.floor(f / 3)}`);
      return (
        <AbsoluteFill style={{pointerEvents: 'none'}}>
          <AbsoluteFill style={{background: '#FFE3B0', opacity: flick, mixBlendMode: 'screen'}} />
          <svg width={width} height={height} style={{position: 'absolute'}}>
            {Array.from({length: 22}).map((_, i) => (
              <g key={i}>
                <rect x={14} y={i * 90 + 20 - (f * 2) % 90} width={26} height={44} rx={6} fill="#000" opacity={0.55} />
                <rect x={width - 40} y={i * 90 + 20 - (f * 2) % 90} width={26} height={44} rx={6} fill="#000" opacity={0.55} />
              </g>
            ))}
          </svg>
        </AbsoluteFill>
      );
    }
    case 'gradient':
      return <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 38%, ${mix(p.bg, '#ffffff', 0.7)} 0%, ${p.bg} 55%, ${mix(p.bg, p.accent, 0.12)} 100%)`}} />;
    case 'halftone':
      return (
        <AbsoluteFill style={{opacity: 0.22}}>
          <svg width={width} height={height}>
            <defs>
              <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform={`rotate(20) translate(${(f * 0.6) % 26},0)`}>
                <circle cx="13" cy="13" r="4" fill={p.accent} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </AbsoluteFill>
      );
    default:
      return null;
  }
};

export const Letterbox: React.FC<{on?: boolean}> = ({on}) =>
  on ? (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 150, background: '#000'}} />
      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 150, background: '#000'}} />
    </AbsoluteFill>
  ) : null;

export const SafeZones: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 250, background: 'rgba(255,0,80,0.18)', borderBottom: '2px dashed #ff3366'}} />
    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 440, background: 'rgba(255,0,80,0.18)', borderTop: '2px dashed #ff3366'}} />
    <div style={{position: 'absolute', top: 250, bottom: 440, right: 0, width: 168, background: 'rgba(255,0,80,0.12)', borderLeft: '2px dashed #ff3366'}} />
  </AbsoluteFill>
);
