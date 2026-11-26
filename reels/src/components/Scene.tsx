import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {AnimatedText} from './Text';
import {MediaBox} from './Media';
import {alpha, mix} from '../engine/color';
import {prog, SAFE} from '../engine/motion';
import type {ReelSpec, Scene} from '../engine/schema';
import type {Palette, ThemeSpec, TextAnim, MediaAnim, LayoutId} from '../engine/types';

export type SceneCtx = {
  scene: Scene;
  index: number;
  spec: ReelSpec;
  theme: ThemeSpec;
  p: Palette;
  dur: number;
  W: number;
  H: number;
};

const W0 = 1080 - SAFE.left - SAFE.right; // 840 usable text width

const textAnimFor = (c: SceneCtx): TextAnim => (c.scene.textAnim as TextAnim) ?? c.theme.motion.text[c.scene.kind] ?? c.theme.motion.text.default;
const mediaAnimFor = (c: SceneCtx, i = 0): MediaAnim => (c.scene.mediaAnim as MediaAnim) ?? c.theme.motion.media[(c.index + i) % c.theme.motion.media.length];
const m = (c: SceneCtx, i = 0) => {
  const idx = c.scene.media[i] ?? c.scene.media[0];
  return idx === undefined ? undefined : c.spec.media[idx];
};
const speed = (c: SceneCtx) => (c.theme.pacing.energy === 'fast' ? 1.4 : c.theme.pacing.energy === 'slow' ? 0.8 : 1) * c.spec.intensity;

/** eyebrow + title + body stacked inside a box; sizes from theme scale, fitted to the box. */
const Stack: React.FC<{c: SceneCtx; x: number; y: number; w: number; h: number; align?: 'left' | 'center'; ink?: string; muted?: string; hero?: boolean; valign?: 'top' | 'bottom' | 'center'; start?: number}> = ({
  c, x, y, w, h, align = 'left', ink, muted, hero, valign = 'top', start = 6,
}) => {
  const {theme: t, scene: s, p} = c;
  const anim = textAnimFor(c);
  const sp = speed(c);
  const eyebrowH = s.eyebrow ? t.scale.label * 1.9 : 0;
  const bodyH = s.body ? Math.min(h * 0.34, t.scale.body * 4.2) : 0;
  const titleH = h - eyebrowH - bodyH - (s.body ? 24 : 0);
  const maxTitle = hero ? t.scale.hero : t.scale.title;
  const blocks: React.ReactNode[] = [];
  let cy = 0;
  if (s.eyebrow) {
    blocks.push(<AnimatedText key="e" text={s.eyebrow} font={t.fonts.label} w={w} h={eyebrowH} maxSize={t.scale.label} minSize={t.scale.label * 0.8} maxLines={1} color={muted ?? p.accent} anim="fade" start={start} speed={sp} align={align} style={{top: cy}} />);
    cy += eyebrowH;
  }
  if (s.title) {
    blocks.push(
      <AnimatedText key="t" text={s.title} font={t.fonts.display} w={w} h={titleH} maxSize={maxTitle} minSize={Math.round(t.scale.title * 0.42)} maxLines={hero ? 4 : 5} color={ink ?? p.ink} anim={anim} start={start + 4} speed={sp} ease={t.pacing.ease} align={align} accent={alpha(p.accent, 0.55)} style={{top: cy}} valign={s.body || valign === 'top' ? 'top' : valign} />,
    );
    cy += titleH + 24;
  }
  if (s.body) {
    blocks.push(<AnimatedText key="b" text={s.body} font={t.fonts.body} w={w} h={bodyH} maxSize={t.scale.body} minSize={Math.round(t.scale.body * 0.6)} maxLines={4} color={muted ?? p.muted} anim={anim === 'typewriter' ? 'typewriter' : 'lineStagger'} start={start + 16} speed={sp} align={align} style={{top: cy}} />);
  }
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h}}>{blocks}</div>;
};

const Scrim: React.FC<{from?: number; strength?: number}> = ({from = 0.4, strength = 0.78}) => (
  <AbsoluteFill style={{background: `linear-gradient(to bottom, rgba(0,0,0,0) ${from * 100}%, rgba(0,0,0,${strength}) 92%)`}} />
);

/* ---------------------------------- layouts --------------------------------- */

const FullBleed: React.FC<{c: SceneCtx}> = ({c}) => (
  <AbsoluteFill>
    <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{inset: 0}} intensity={c.spec.intensity} grade={c.theme.decor.grade} seed={c.index} />
    <Scrim from={0.3} strength={0.86} />
    <Stack c={c} x={SAFE.left} y={900} w={W0} h={1480 - 900} ink="#FFFFFF" muted="rgba(255,255,255,0.86)" hero={c.scene.kind === 'hook'} valign="bottom" />
  </AbsoluteFill>
);

const Framed: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const rule = prog(f, 0, 30, 'glide');
  return (
    <AbsoluteFill>
      <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{left: 130, top: 270, width: 820, height: 900}} intensity={c.spec.intensity * 0.7} grade={c.theme.decor.grade} seed={c.index} />
      {c.theme.decor.frameRule ? <div style={{position: 'absolute', left: 104, top: 244, width: 872, height: 952, border: `1.5px solid ${c.p.line}`, opacity: rule}} /> : null}
      <Stack c={c} x={SAFE.left + 20} y={1222} w={W0 - 40} h={1480 - 1222} align="center" />
    </AbsoluteFill>
  );
};

const Split: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const g = prog(f, 0, 18, c.theme.pacing.ease);
  return (
    <AbsoluteFill>
      <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{left: 0, top: 0, width: 1080, height: 1010}} intensity={c.spec.intensity} grade={c.theme.decor.grade} seed={c.index} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1010 + (1 - g) * 120, bottom: 0, background: c.p.surface}} />
      <Stack c={c} x={SAFE.left} y={1066} w={W0} h={1480 - 1066} ink={c.p.inkOnSurface} muted={alpha(c.p.inkOnSurface, 0.78)} hero valign="center" />
    </AbsoluteFill>
  );
};

const Magazine: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const mast = prog(f, 0, 20, 'silk');
  const t = c.theme;
  return (
    <AbsoluteFill>
      <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{inset: 0}} intensity={c.spec.intensity} seed={c.index} />
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.86) 88%)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 236, opacity: mast, transform: `translateY(${(1 - mast) * -30}px)`}}>
        <AnimatedText text={c.spec.brand.name} font={{...t.fonts.display, tracking: -0.02}} w={936} h={230} maxSize={t.scale.hero} minSize={90} maxLines={1} color="#FFFFFF" anim="fade" align="center" style={{left: 72}} />
      </div>
      <div style={{position: 'absolute', left: SAFE.left, top: 470, right: SAFE.right, height: 3, background: '#FFFFFF', transform: `scaleX(${mast})`, transformOrigin: 'left'}} />
      <div style={{position: 'absolute', left: SAFE.left, top: 486, fontFamily: `"${t.fonts.label.family}"`, fontWeight: 700, fontSize: 22, letterSpacing: '0.2em', color: '#FFF', opacity: mast}}>
        {`ISSUE ${String(c.index + 1).padStart(2, '0')}  ·  ${(c.spec.brand.tagline ?? 'The edit').toUpperCase()}`}
      </div>
      <Stack c={c} x={SAFE.left} y={980} w={W0 - 60} h={1480 - 980} ink="#FFFFFF" muted="rgba(255,255,255,0.88)" valign="bottom" />
    </AbsoluteFill>
  );
};

const Collage: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const a = prog(f, 0, 22, c.theme.pacing.ease);
  const b = prog(f, 8, 22, c.theme.pacing.ease);
  const border = c.theme.id === 'film-nostalgia' ? c.p.surface : c.p.bg;
  return (
    <AbsoluteFill>
      <MediaBox media={m(c, 0)} anim={mediaAnimFor(c, 0)} dur={c.dur} style={{left: 72, top: 270, width: 560, height: 720, outline: `14px solid ${border}`, transform: `translateY(${(1 - a) * 80}px) rotate(-2deg)`, opacity: a}} intensity={c.spec.intensity} grade={c.theme.decor.grade} seed={c.index} />
      <MediaBox media={m(c, 1)} anim={mediaAnimFor(c, 1)} dur={c.dur} style={{left: 470, top: 610, width: 520, height: 600, outline: `14px solid ${border}`, transform: `translateY(${(1 - b) * 120}px) rotate(2.5deg)`, opacity: b, boxShadow: '0 30px 60px rgba(0,0,0,0.25)'}} intensity={c.spec.intensity} grade={c.theme.decor.grade} seed={c.index + 1} />
      <Stack c={c} x={SAFE.left} y={1262} w={W0} h={1480 - 1262} start={12} />
    </AbsoluteFill>
  );
};

const Arch: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const o = prog(f, 0, 30, 'glide');
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 160, top: 262, width: 760, height: 920, borderRadius: '380px 380px 0 0', border: `2px solid ${c.p.line}`, opacity: o, transform: `scale(${1.03 - 0.03 * o})`}} />
      <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{left: 182, top: 284, width: 716, height: 876, borderRadius: '358px 358px 0 0'}} intensity={c.spec.intensity * 0.8} grade={c.theme.decor.grade} seed={c.index} />
      <svg width={1080} height={40} style={{position: 'absolute', top: 1180}}>
        <line x1={360} y1={20} x2={500} y2={20} stroke={c.p.accent} strokeWidth={2} opacity={o} />
        <path d="M540 6 L552 20 L540 34 L528 20 Z" fill={c.p.accent} opacity={o} />
        <line x1={580} y1={20} x2={720} y2={20} stroke={c.p.accent} strokeWidth={2} opacity={o} />
      </svg>
      <Stack c={c} x={SAFE.left + 30} y={1240} w={W0 - 60} h={1480 - 1240} align="center" />
    </AbsoluteFill>
  );
};

const TypeOnly: React.FC<{c: SceneCtx}> = ({c}) => {
  const flip = c.index % 2 === 1;
  const bg = flip ? c.p.accent : c.p.bg;
  const ink = flip ? c.p.onAccent : c.p.ink;
  const mm = m(c);
  return (
    <AbsoluteFill style={{background: bg}}>
      {mm && c.scene.kind !== 'hook' ? <MediaBox media={mm} anim="zoomOut" dur={c.dur} style={{left: 620, top: 1180, width: 290, height: 290, borderRadius: '50%'}} seed={c.index} /> : null}
      <Stack c={c} x={SAFE.left} y={300} w={W0} h={c.scene.kind === 'hook' || !mm ? 1150 : 860} ink={ink} muted={alpha(ink, 0.8)} hero valign="center" />
    </AbsoluteFill>
  );
};

const Floating: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const g = prog(f, 0, 24, 'silk');
  const lead = prog(f, 18, 18, 'glide');
  const isOffer = c.scene.kind === 'offer';
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 240, top: 1100, width: 600, height: 60, borderRadius: '50%', background: 'rgba(0,0,0,0.16)', filter: 'blur(22px)', opacity: g}} />
      <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{left: 170, top: 290, width: 740, height: 800, borderRadius: 48, boxShadow: '0 50px 90px rgba(0,0,0,0.18)', transform: `translateY(${(1 - g) * 90}px)`, opacity: g}} intensity={c.spec.intensity} seed={c.index} />
      {c.scene.kind === 'feature' ? (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <circle cx={720} cy={560} r={14} fill={c.p.accent} opacity={lead} />
          <line x1={720} y1={560} x2={720 + 0 * lead} y2={560 + 640 * lead} stroke={c.p.accent} strokeWidth={3} />
        </svg>
      ) : null}
      {isOffer ? (
        <div style={{position: 'absolute', left: 620, top: 250, transform: `rotate(-8deg) scale(${0.6 + 0.4 * prog(f, 10, 14, 'pop')})`, background: c.p.accent, color: c.p.onAccent, borderRadius: 999, padding: '22px 38px', fontFamily: `"${c.theme.fonts.display.family}"`, fontWeight: 700, fontSize: 52}}>
          {c.scene.eyebrow ?? 'Offer'}
        </div>
      ) : null}
      <Stack c={{...c, scene: isOffer ? {...c.scene, eyebrow: undefined} : c.scene}} x={SAFE.left} y={1210} w={W0} h={1480 - 1210} align="center" />
    </AbsoluteFill>
  );
};

const FilmFrame: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const g = prog(f, 0, 26, 'glide');
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 110, top: 270, width: 860, height: 1000, background: c.p.surface, transform: `rotate(${-1.5 + 1.5 * g}deg) translateY(${(1 - g) * 40}px)`, boxShadow: '0 40px 80px rgba(0,0,0,0.5)'}}>
        <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{left: 30, top: 30, width: 800, height: 830}} intensity={c.spec.intensity} grade={c.theme.decor.grade} seed={c.index} />
        <div style={{position: 'absolute', left: 30, bottom: 34, fontFamily: '"JetBrains Mono"', fontSize: 24, color: mix(c.p.inkOnSurface, c.p.surface, 0.3)}}>{`${c.spec.brand.name.toUpperCase()}  ·  ROLL 01  ·  ${String(c.index + 1).padStart(2, '0')}`}</div>
        <div style={{position: 'absolute', right: 52, top: 806, fontFamily: '"JetBrains Mono"', fontSize: 28, color: '#FF8A3D', textShadow: '0 0 8px rgba(255,120,40,0.8)'}}>{`'26  ${String(11).padStart(2, '0')}  ${String(c.index + 3).padStart(2, '0')}`}</div>
      </div>
      <Stack c={c} x={SAFE.left} y={1300} w={W0} h={1480 - 1300} align="center" />
    </AbsoluteFill>
  );
};

const LowerThird: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const bar = prog(f, 6, 18, 'snap');
  return (
    <AbsoluteFill>
      <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{inset: 0}} intensity={c.spec.intensity * 0.6} grade={c.theme.decor.grade} seed={c.index} />
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)'}} />
      <Stack c={{...c, scene: {...c.scene, body: undefined}}} x={SAFE.left} y={300} w={W0} h={520} ink="#FFFFFF" muted="rgba(255,255,255,0.9)" />
      {c.scene.body ? (
        <div style={{position: 'absolute', left: SAFE.left, top: 1060, width: W0 * bar, height: 120, background: c.p.surface, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 12, background: c.p.accent}} />
          <AnimatedText text={c.scene.body} font={c.theme.fonts.body} w={W0 - 60} h={100} maxSize={44} minSize={26} maxLines={2} color={c.p.inkOnSurface} anim="fade" start={14} valign="center" style={{left: 36, top: 10}} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const SwissGrid: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const g = prog(f, 0, 16, 'snap');
  const mm = m(c);
  return (
    <AbsoluteFill>
      {mm ? <MediaBox media={mm} anim={mediaAnimFor(c)} dur={c.dur} style={{left: 180, top: 780, width: 720, height: 620, clipPath: `inset(0 ${100 - g * 100}% 0 0)`}} intensity={c.spec.intensity} seed={c.index} /> : null}
      <div style={{position: 'absolute', left: 180, top: 740, width: 180 * g, height: 18, background: c.p.accent}} />
      <div style={{position: 'absolute', left: SAFE.left, top: 1380, fontFamily: `"${c.theme.fonts.label.family}"`, fontWeight: 700, fontSize: 64, color: c.p.accent}}>{String(c.index + 1).padStart(2, '0')}</div>
      <Stack c={{...c, scene: {...c.scene, body: undefined}}} x={SAFE.left} y={262} w={W0} h={mm ? 470 : 1000} hero={!mm} />
      {c.scene.body ? (
        <AnimatedText text={c.scene.body} font={c.theme.fonts.body} w={540} h={110} maxSize={c.theme.scale.body} minSize={26} maxLines={3} color={c.p.muted} anim="slideIn" start={14} style={{left: 360, top: 1370}} />
      ) : null}
    </AbsoluteFill>
  );
};

const Sticker: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const g = prog(f, 0, 16, 'pop');
  const st = prog(f, 12, 12, 'pop');
  const rot = c.index % 2 === 0 ? -4 : 3.5;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 140, top: 330, width: 760, height: 780, background: '#111', transform: `translate(18px,18px) rotate(${rot}deg) scale(${g})`}} />
      <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{left: 140, top: 330, width: 760, height: 780, border: '8px solid #111', transform: `rotate(${rot}deg) scale(${g})`}} intensity={c.spec.intensity} seed={c.index} />
      {c.scene.eyebrow ? (
        <div style={{position: 'absolute', left: 660, top: 262, width: 250, height: 250, borderRadius: '50%', background: c.p.accent, color: c.p.onAccent, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 26, boxSizing: 'border-box', transform: `rotate(${12 - 20 * (1 - st)}deg) scale(${st})`, fontFamily: `"${c.theme.fonts.label.family}"`, fontWeight: 800, fontSize: 30, lineHeight: 1.05, border: '6px solid #111'}}>
          {c.scene.eyebrow.toUpperCase()}
        </div>
      ) : null}
      <Stack c={{...c, scene: {...c.scene, eyebrow: undefined}}} x={SAFE.left} y={1190} w={W0} h={1480 - 1190} />
    </AbsoluteFill>
  );
};

const Noir: React.FC<{c: SceneCtx}> = ({c}) => (
  <AbsoluteFill>
    <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} style={{left: 0, top: 300, width: 1080, height: 900}} intensity={c.spec.intensity} grade={c.theme.decor.grade} seed={c.index} />
    <AbsoluteFill style={{background: 'linear-gradient(to bottom, #0A0A0B 0%, rgba(10,10,11,0) 22%, rgba(10,10,11,0) 52%, #0A0A0B 64%)'}} />
    <Stack c={c} x={SAFE.left + 20} y={1180} w={W0 - 40} h={1480 - 1180} align="center" />
  </AbsoluteFill>
);

/* ---------------------------- CTA & logo scenes ---------------------------- */

const CtaScene: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const {theme: t, p, scene: s} = c;
  const g = prog(f, 8, 18, t.cta === 'sticker' || t.cta === 'block' ? 'pop' : 'silk');
  const mm = m(c);
  const label = s.title ?? 'Shop now';
  const btnBase: React.CSSProperties = {position: 'absolute', left: '50%', top: 1150, transform: `translateX(-50%) scale(${0.7 + 0.3 * g})`, opacity: g, fontFamily: `"${t.fonts.label.family}"`, fontWeight: 700, fontSize: 34, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap'};
  let btn: React.ReactNode;
  switch (t.cta) {
    case 'minimal':
      btn = (
        <div style={{...btnBase, color: p.ink, transform: `translateX(-50%)`}}>
          {label}
          <div style={{height: 2, background: p.accent, marginTop: 16, transform: `scaleX(${g})`}} />
        </div>
      );
      break;
    case 'pill':
    case 'product':
      btn = <div style={{...btnBase, background: p.accent, color: p.onAccent, padding: '30px 64px', borderRadius: 999}}>{label} →</div>;
      break;
    case 'sticker':
      btn = <div style={{...btnBase, background: p.accent, color: p.onAccent, padding: '30px 60px', border: '6px solid #111', boxShadow: '10px 10px 0 #111', transform: `translateX(-50%) rotate(-3deg) scale(${0.6 + 0.4 * g})`}}>{label}!</div>;
      break;
    case 'block':
    default:
      btn = <div style={{...btnBase, background: p.accent, color: p.onAccent, padding: '34px 70px'}}>{label}</div>;
  }
  return (
    <AbsoluteFill>
      {mm && (t.cta === 'product' || t.cta === 'sticker' || t.cta === 'pill') ? (
        <MediaBox media={mm} anim="zoomOut" dur={c.dur} style={{left: 290, top: 300, width: 500, height: 560, borderRadius: t.cta === 'sticker' ? 0 : 36, border: t.cta === 'sticker' ? '8px solid #111' : undefined}} seed={c.index} />
      ) : (
        <AnimatedText text={c.spec.brand.name} font={t.fonts.display} w={W0} h={300} maxSize={t.scale.hero} minSize={60} maxLines={2} color={p.ink} anim={t.motion.text.default} align="center" valign="center" style={{left: SAFE.left, top: 520}} />
      )}
      {s.body ? <AnimatedText text={s.body} font={t.fonts.body} w={W0} h={140} maxSize={t.scale.body} minSize={24} maxLines={2} color={p.muted} anim="fade" start={6} align="center" valign="center" style={{left: SAFE.left, top: 930}} /> : null}
      {btn}
      {s.eyebrow ? <AnimatedText text={s.eyebrow} font={t.fonts.label} w={W0} h={60} maxSize={t.scale.label} minSize={18} maxLines={1} color={p.muted} anim="fade" start={18} align="center" style={{left: SAFE.left, top: 1330}} /> : null}
    </AbsoluteFill>
  );
};

const LogoScene: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const {theme: t, p, spec} = c;
  const g = prog(f, 4, 24, 'silk');
  const name = spec.brand.name;
  let mark: React.ReactNode;
  const fs: React.CSSProperties = {fontFamily: `"${t.fonts.display.family}"`, fontWeight: t.fonts.display.weight as any, fontStyle: t.fonts.display.style, fontSize: Math.min(t.scale.hero, (W0 * 1.6) / Math.max(4, name.length)), color: p.ink, whiteSpace: 'nowrap', textTransform: t.fonts.display.transform === 'uppercase' ? 'uppercase' : undefined};
  switch (t.logoAnim) {
    case 'stamp':
      mark = <div style={{...fs, transform: `scale(${2 - g}) rotate(${(1 - g) * -10}deg)`, opacity: Math.min(1, g * 2)}}>{name}</div>;
      break;
    case 'outline':
      mark = <div style={{...fs, color: 'transparent', WebkitTextStroke: `2px ${p.ink}`, opacity: g}}>{name}</div>;
      break;
    case 'letters':
      mark = (
        <div style={fs}>
          {name.split('').map((ch, i) => {
            const q = prog(f, 2 + i * 2, 12, 'silk');
            return <span key={i} style={{display: 'inline-block', opacity: q, transform: `translateY(${(1 - q) * 40}px)`}}>{ch === ' ' ? ' ' : ch}</span>;
          })}
        </div>
      );
      break;
    case 'mask':
      mark = <div style={{overflow: 'hidden'}}><div style={{...fs, transform: `translateY(${(1 - g) * 110}%)`}}>{name}</div></div>;
      break;
    case 'fade':
    default:
      mark = <div style={{...fs, opacity: g, letterSpacing: `${(1 - g) * 0.2}em`}}>{name}</div>;
  }
  const tag = spec.brand.tagline;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      {spec.brand.logoUrl ? <img src={spec.brand.logoUrl} style={{width: 260, opacity: g, marginBottom: 40}} /> : null}
      {mark}
      <div style={{width: 120 * g, height: 2, background: p.accent, margin: '34px 0'}} />
      {tag ? <div style={{fontFamily: `"${t.fonts.label.family}"`, fontWeight: t.fonts.label.weight as any, fontSize: t.scale.label, letterSpacing: `${t.fonts.label.tracking ?? 0.2}em`, textTransform: 'uppercase', color: p.muted, opacity: prog(f, 14, 20)}}>{tag}</div> : null}
      {spec.brand.handle ? <div style={{position: 'absolute', top: 1400, fontFamily: `"${t.fonts.body.family}"`, fontSize: 32, color: p.muted, opacity: prog(f, 20, 20)}}>{spec.brand.handle}</div> : null}
    </AbsoluteFill>
  );
};


/* ---------- 3D layouts ---------- */

/** Three photo cards floating at different depths; the camera drifts around them. */
const DepthStack: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const g = prog(f, 0, 28, 'silk');
  const t = f / Math.max(1, c.dur);
  const k = c.spec.intensity;
  const orbit = (-7 + 14 * t) * k;
  const card = (i: number, x: number, y: number, z: number, ry: number, w: number, h: number) => (
    <MediaBox key={i} media={m(c, i)} anim={i === 0 ? mediaAnimFor(c) : 'still'} dur={c.dur} intensity={k} seed={c.index + i}
      style={{left: 540 - w / 2 + x, top: y, width: w, height: h, borderRadius: 28, boxShadow: '0 40px 80px rgba(0,0,0,0.35)', transform: `translateZ(${z + (1 - g) * (i === 0 ? 500 : -300)}px) rotateY(${ry}deg)`, opacity: i === 0 ? 1 : 0.92 * g}} />
  );
  return (
    <AbsoluteFill style={{perspective: 2000, perspectiveOrigin: '50% 38%'}}>
      <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateY(${orbit}deg) rotateX(4deg)`}}>
        {card(2, -210, 300, -520, 14, 520, 680)}
        {card(1, 220, 360, -260, -12, 540, 700)}
        {card(0, 0, 400, 0, 0, 600, 740)}
      </div>
      <Stack c={c} x={SAFE.left} y={1200} w={W0} h={1480 - 1200} align="center" />
    </AbsoluteFill>
  );
};

/** A turning cube with the brand's photos on its faces. */
const Cube: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const g = prog(f, 0, 30, 'pop');
  const t = f / Math.max(1, c.dur);
  const k = c.spec.intensity;
  const S = 560;
  const ang = -42 + 84 * t * k - (1 - g) * 120;
  const face = (i: number, tf: string, shade: number) => (
    <div key={i} style={{position: 'absolute', left: 0, top: 0, width: S, height: S, transform: tf, backfaceVisibility: 'hidden'}}>
      <MediaBox media={m(c, i)} anim="still" dur={c.dur} style={{inset: 0}} seed={c.index + i} />
      <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${shade})`}} />
    </div>
  );
  return (
    <AbsoluteFill style={{perspective: 2200, perspectiveOrigin: '50% 30%'}}>
      <div style={{position: 'absolute', left: 540 - 300, top: 1050, width: 600, height: 70, borderRadius: '50%', background: 'rgba(0,0,0,0.28)', filter: 'blur(26px)', opacity: g}} />
      <div style={{position: 'absolute', left: 540 - S / 2, top: 400, width: S, height: S, transformStyle: 'preserve-3d', transform: `scale(${0.7 + 0.3 * g}) rotateX(-12deg) rotateY(${ang}deg)`}}>
        {face(0, `translateZ(${S / 2}px)`, 0)}
        {face(1, `rotateY(90deg) translateZ(${S / 2}px)`, 0.22)}
        {face(2, `rotateY(-90deg) translateZ(${S / 2}px)`, 0.22)}
        {face(0, `rotateY(180deg) translateZ(${S / 2}px)`, 0.3)}
        <div style={{position: 'absolute', width: S, height: S, background: c.p.accent, transform: `rotateX(90deg) translateZ(${S / 2}px)`}} />
      </div>
      <Stack c={c} x={SAFE.left} y={1200} w={W0} h={1480 - 1200} align="center" />
    </AbsoluteFill>
  );
};

/** The product stands on a perspective floor with a soft reflection. */
const Floor: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const g = prog(f, 0, 26, 'silk');
  const t = f / Math.max(1, c.dur);
  const k = c.spec.intensity;
  const ry = (-8 + 16 * t) * k;
  const cardStyle = {left: 290, width: 500, height: 560, borderRadius: 24};
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: -600, right: -600, top: 1120, height: 1400, transformOrigin: '50% 0%', transform: 'perspective(900px) rotateX(74deg)',
        backgroundImage: `linear-gradient(${alpha(c.p.line, 0.22)} 2px, transparent 2px), linear-gradient(90deg, ${alpha(c.p.line, 0.22)} 2px, transparent 2px)`, backgroundSize: '120px 120px',
        backgroundPosition: `0 ${-t * 240 * k}px`, maskImage: 'linear-gradient(to bottom, black, transparent 70%)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 70%)'}} />
      <div style={{position: 'absolute', inset: 0, perspective: 1800}}>
        <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} intensity={k} seed={c.index}
          style={{...cardStyle, top: 560, boxShadow: '0 30px 70px rgba(0,0,0,0.35)', transform: `translateY(${(1 - g) * 120}px) rotateY(${ry}deg)`, opacity: g}} />
        <MediaBox media={m(c)} anim={mediaAnimFor(c)} dur={c.dur} intensity={k} seed={c.index}
          style={{...cardStyle, top: 1124, transform: `translateY(${(1 - g) * -120}px) rotateY(${ry}deg) scaleY(-1)`, opacity: 0.28 * g,
            maskImage: 'linear-gradient(to top, black, transparent 45%)', WebkitMaskImage: 'linear-gradient(to top, black, transparent 45%)'}} />
      </div>
      <Stack c={c} x={SAFE.left} y={SAFE.top} w={W0} h={280} align="center" valign="center" />
    </AbsoluteFill>
  );
};

/**
 * Gallery montage: the customer's extra photos and clips, cut on the beat inside one scene.
 * Each item is shown through the theme's own single-photo layout, so the montage keeps the template's look.
 */
const SINGLE: LayoutId[] = ['fullBleed', 'framed', 'split', 'magazine', 'arch', 'floating', 'filmFrame', 'lowerThird', 'swissGrid', 'sticker', 'noir', 'floor'];
const Montage: React.FC<{c: SceneCtx}> = ({c}) => {
  const f = useCurrentFrame();
  const items = c.scene.media.length ? c.scene.media : [0];
  const base = ([...(c.theme.layouts.hook ?? []), ...(c.theme.layouts.product ?? []), ...(c.theme.layouts.feature ?? []), ...c.theme.layouts.default] as LayoutId[]).find((l) => SINGLE.includes(l)) ?? 'fullBleed';
  const L = LAYOUTS[base] ?? FullBleed;
  const each = c.dur / items.length;
  const X = Math.min(8, Math.round(each / 4)); // short cross-fade between items
  return (
    <AbsoluteFill>
      {items.map((mi, i) => {
        const from = Math.round(i * each);
        const len = Math.round((i + 1) * each) - from + (i < items.length - 1 ? X : 0);
        const local = f - from;
        const op = i === 0 ? 1 : Math.min(1, Math.max(0, local / Math.max(1, X)));
        const sub: SceneCtx = {...c, dur: len, index: c.index + i, scene: {...c.scene, media: [mi], eyebrow: undefined, title: undefined, body: undefined, mediaAnim: c.theme.motion.media[(c.index + i) % c.theme.motion.media.length]}};
        return (
          <Sequence key={i} from={from} durationInFrames={len} layout="none">
            <AbsoluteFill style={{opacity: op}}><L c={sub} /></AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const LAYOUTS: Record<LayoutId, React.FC<{c: SceneCtx}>> = {
  fullBleed: FullBleed, framed: Framed, split: Split, magazine: Magazine, collage: Collage, arch: Arch, typeOnly: TypeOnly,
  floating: Floating, filmFrame: FilmFrame, lowerThird: LowerThird, swissGrid: SwissGrid, sticker: Sticker, noir: Noir, cta: CtaScene, logo: LogoScene,
  depthStack: DepthStack, cube: Cube, floor: Floor, montage: Montage,
};

export const SceneView: React.FC<{c: SceneCtx}> = ({c}) => {
  const id = (c.scene.layout as LayoutId) ?? 'framed';
  const L = LAYOUTS[id] ?? Framed;
  return <L c={c} />;
};
