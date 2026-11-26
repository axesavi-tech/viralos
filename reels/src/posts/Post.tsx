import React, {useEffect, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender} from 'remotion';
import {fit, type FontSpec} from '../engine/fit';
import {alpha, isDark} from '../engine/color';
import {ensureFonts} from '../engine/fonts';
import {themeById} from '../themes';
import {MediaBox} from '../components/Media';
import {Grain, Texture, Vignette} from '../components/Decor';
import type {Palette, ThemeSpec} from '../engine/types';
import {FORMAT_SIZE, type PostSpec, type Slide} from './schema';

/* ---------- static fitted text ---------- */

type TextProps = {text: string; font: FontSpec; x: number; y: number; w: number; h: number; max: number; min?: number; lines?: number; color: string; align?: 'left' | 'center' | 'right'; valign?: 'top' | 'center' | 'bottom'; style?: React.CSSProperties};
const Txt: React.FC<TextProps> = ({text, font, x, y, w, h, max, min, lines = 4, color, align = 'left', valign = 'top', style}) => {
  const f = fit(text, font, {w, h}, max, min ?? Math.max(16, Math.round(max * 0.45)), lines);
  if (f.overflow) console.log('QA_OVERFLOW ' + text);
  const lh = f.size * font.lineHeight;
  const top = valign === 'bottom' ? h - f.height : valign === 'center' ? (h - f.height) / 2 : 0;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>
      <div style={{position: 'absolute', left: 0, right: 0, top, fontFamily: `"${font.family}"`, fontWeight: font.weight as any, fontStyle: font.style ?? 'normal', fontSize: f.size, lineHeight: `${lh}px`, letterSpacing: font.tracking ? `${font.tracking}em` : undefined, color, textAlign: align, whiteSpace: 'pre'}}>
        {f.lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
};

/* ---------- context ---------- */

type Ctx = {spec: PostSpec; s: Slide; i: number; n: number; t: ThemeSpec; p: Palette; W: number; H: number; M: number; top: number; bottom: number; k: number};
const med = (c: Ctx, j = 0) => {
  const idx = c.s.media[j] ?? c.s.media[0] ?? j % c.spec.media.length;
  return c.spec.media[idx % c.spec.media.length];
};
const Photo: React.FC<{c: Ctx; j?: number; style: React.CSSProperties; radius?: number}> = ({c, j = 0, style, radius}) => (
  <MediaBox media={med(c, j)} anim="still" still dur={1} style={style} radius={radius} grade={c.t.decor.grade} fallback={c.p.surface} />
);

/** eyebrow + title + body stacked in a box, sized from the theme's scale */
const Stack: React.FC<{c: Ctx; x: number; y: number; w: number; h: number; ink?: string; muted?: string; accent?: string; align?: 'left' | 'center'; valign?: 'top' | 'center' | 'bottom'; hero?: boolean; titleLines?: number}> = ({c, x, y, w, h, ink, muted, accent, align = 'left', valign = 'top', hero, titleLines}) => {
  const {t, s, p, k} = c;
  const eyeH = s.eyebrow ? Math.round(t.scale.label * 2.1) : 0;
  const bodyH = s.body ? Math.min(Math.round(h * 0.34), Math.round(t.scale.body * k * 4.4)) : 0;
  const gap = s.body ? 22 : 0;
  const titleH = Math.max(80, h - eyeH - bodyH - gap);
  // measure the title to position the block when centring/bottom-aligning
  const tf = s.title ? fit(s.title, t.fonts.display, {w, h: titleH}, Math.round((hero ? t.scale.hero : t.scale.title) * k), Math.round(t.scale.title * k * 0.4), titleLines ?? (hero ? 4 : 5)) : null;
  const bf = s.body ? fit(s.body, t.fonts.body, {w, h: bodyH}, Math.round(t.scale.body * k), Math.round(t.scale.body * k * 0.62), 4) : null;
  const used = eyeH + (tf ? tf.height : 0) + (bf ? gap + bf.height : 0);
  let cy = valign === 'center' ? y + (h - used) / 2 : valign === 'bottom' ? y + h - used : y;
  const out: React.ReactNode[] = [];
  if (s.eyebrow) { out.push(<Txt key="e" text={s.eyebrow} font={t.fonts.label} x={x} y={cy} w={w} h={eyeH} max={t.scale.label} min={Math.round(t.scale.label * 0.75)} lines={1} color={accent ?? muted ?? p.accent} align={align} />); cy += eyeH; }
  if (s.title && tf) { out.push(<Txt key="t" text={s.title} font={t.fonts.display} x={x} y={cy} w={w} h={tf.height + 2} max={tf.size} min={tf.size} lines={titleLines ?? 5} color={ink ?? p.ink} align={align} />); cy += tf.height + gap; }
  if (s.body && bf) out.push(<Txt key="b" text={s.body} font={t.fonts.body} x={x} y={cy} w={w} h={bf.height + 2} max={bf.size} min={bf.size} lines={4} color={muted ?? p.muted} align={align} />);
  return <>{out}</>;
};

const BrandMark: React.FC<{c: Ctx; color: string; x?: number; y?: number; align?: 'left' | 'center'}> = ({c, color, x, y, align = 'left'}) => (
  <Txt text={c.spec.brand.name} font={c.t.fonts.display} x={x ?? c.M} y={y ?? c.top - 4} w={c.W - 2 * c.M - 160} h={60} max={40} min={22} lines={1} color={color} align={align} />
);
const Counter: React.FC<{c: Ctx; color: string}> = ({c, color}) =>
  c.n > 1 ? <Txt text={`${c.i + 1} / ${c.n}`} font={c.t.fonts.label} x={c.W - c.M - 140} y={c.top} w={140} h={40} max={c.t.scale.label} lines={1} color={color} align="right" /> : null;
const Pill: React.FC<{c: Ctx; text: string; x: number; y: number; bg: string; fg: string; size?: number; center?: boolean}> = ({c, text, x, y, bg, fg, size = 30, center}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: center ? 'translateX(-50%)' : undefined, background: bg, color: fg, borderRadius: c.t.cta === 'block' ? 6 : 999, padding: `${Math.round(size * 0.6)}px ${Math.round(size * 1.2)}px`, fontFamily: `"${c.t.fonts.label.family}"`, fontWeight: c.t.fonts.label.weight as any, fontSize: size, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap'}}>{text}</div>
);
const Scrim: React.FC<{from?: number; to?: number; dir?: 'bottom' | 'top'}> = ({from = 0.35, to = 0.82, dir = 'bottom'}) => (
  <AbsoluteFill style={{background: `linear-gradient(to ${dir}, rgba(0,0,0,0) ${from * 100}%, rgba(0,0,0,${to}) 100%)`}} />
);

/* ---------- layouts ---------- */

const Hero: React.FC<{c: Ctx}> = ({c}) => (
  <AbsoluteFill>
    <Photo c={c} style={{inset: 0}} />
    <Scrim from={0.3} to={0.84} />
    <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0) 22%)'}} />
    <BrandMark c={c} color="#FFFFFF" />
    <Counter c={c} color="#FFFFFF" />
    <Stack c={c} x={c.M} y={c.H * 0.5} w={c.W - 2 * c.M} h={c.bottom - c.H * 0.5} ink="#FFFFFF" muted="rgba(255,255,255,0.86)" accent={c.p.accent && !isDark(c.p.accent) ? c.p.accent : '#FFFFFF'} valign="bottom" hero />
  </AbsoluteFill>
);

const Cover: React.FC<{c: Ctx}> = ({c}) => (
  <AbsoluteFill>
    <Photo c={c} style={{inset: 0}} />
    <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.78) 100%)'}} />
    <Txt text={c.spec.brand.name} font={c.t.fonts.display} x={c.M} y={c.top - 10} w={c.W - 2 * c.M} h={170} max={190} min={70} lines={1} color="#FFFFFF" align="center" />
    <div style={{position: 'absolute', left: c.M, right: c.M, top: c.top + 172, height: 2, background: 'rgba(255,255,255,0.8)'}} />
    <Txt text={(c.spec.brand.tagline ?? 'The edit').toUpperCase()} font={c.t.fonts.label} x={c.M} y={c.top + 186} w={c.W - 2 * c.M} h={34} max={c.t.scale.label} lines={1} color="#FFFFFF" align="center" />
    <Counter c={c} color="#FFFFFF" />
    <Stack c={{...c, s: {...c.s, eyebrow: undefined}}} x={c.M} y={c.H * 0.56} w={c.W * 0.78} h={c.bottom - c.H * 0.56} ink="#FFFFFF" muted="rgba(255,255,255,0.86)" valign="bottom" hero />
  </AbsoluteFill>
);

const Split: React.FC<{c: Ctx}> = ({c}) => {
  const ph = Math.round(c.H * (c.H > 1400 ? 0.56 : 0.54));
  return (
    <AbsoluteFill style={{background: c.p.surface}}>
      <Photo c={c} style={{left: 0, top: 0, width: c.W, height: ph}} />
      <Counter c={c} color="#FFFFFF" />
      <div style={{position: 'absolute', left: c.M, top: ph + 44, width: 64, height: 4, background: c.p.accent}} />
      <Stack c={c} x={c.M} y={ph + 76} w={c.W - 2 * c.M} h={c.bottom - ph - 76} ink={c.p.inkOnSurface} muted={alpha(c.p.inkOnSurface, 0.74)} valign="center" />
    </AbsoluteFill>
  );
};

const Product: React.FC<{c: Ctx}> = ({c}) => {
  const cw = Math.round(c.W * 0.64), chh = Math.round(Math.min(cw * 1.2, (c.bottom - c.top) * 0.6));
  const cx = (c.W - cw) / 2, cy = c.top + 90;
  return (
    <AbsoluteFill>
      <BrandMark c={c} color={c.p.ink} />
      <Counter c={c} color={c.p.muted} />
      <div style={{position: 'absolute', left: cx + 40, top: cy + chh - 10, width: cw - 80, height: 50, borderRadius: '50%', background: 'rgba(0,0,0,0.22)', filter: 'blur(24px)'}} />
      <Photo c={c} style={{left: cx, top: cy, width: cw, height: chh, boxShadow: '0 40px 80px rgba(0,0,0,0.22)'}} radius={28} />
      {c.s.price ? <Pill c={c} text={c.s.price} x={cx + cw - 40} y={cy - 26} bg={c.p.accent} fg={c.p.onAccent} size={30} center /> : null}
      <Stack c={{...c, s: {...c.s, eyebrow: undefined}}} x={c.M} y={cy + chh + 50} w={c.W - 2 * c.M} h={c.bottom - (cy + chh + 50)} align="center" valign="center" />
    </AbsoluteFill>
  );
};

const Features: React.FC<{c: Ctx}> = ({c}) => {
  const items = (c.s.items ?? []).slice(0, 3);
  const colW = Math.round(c.W * 0.4);
  const tw = c.W - colW - c.M - 56;
  const headH = Math.round((c.bottom - c.top) * 0.36);
  const rowsTop = c.top + 70 + headH + 20;
  const rowH = Math.floor((c.bottom - rowsTop) / Math.max(1, items.length));
  return (
    <AbsoluteFill>
      <Photo c={c} style={{left: c.W - colW, top: 0, width: colW, height: c.H}} />
      <BrandMark c={c} color={c.p.ink} />
      <Stack c={{...c, s: {...c.s, body: undefined}}} x={c.M} y={c.top + 70} w={tw} h={headH} valign="bottom" titleLines={4} />
      {items.map((it, j) => (
        <React.Fragment key={j}>
          <div style={{position: 'absolute', left: c.M, top: rowsTop + j * rowH, width: tw, height: 2, background: alpha(c.p.ink, 0.18)}} />
          <Txt text={String(j + 1).padStart(2, '0')} font={c.t.fonts.label} x={c.M} y={rowsTop + j * rowH + 22} w={80} h={36} max={c.t.scale.label + 4} lines={1} color={c.p.accent} />
          <Txt text={it} font={c.t.fonts.body} x={c.M + 84} y={rowsTop + j * rowH + 16} w={tw - 84} h={rowH - 30} max={Math.round(c.t.scale.body * c.k * 1.05)} min={22} lines={3} color={c.p.ink} />
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};

const Statement: React.FC<{c: Ctx}> = ({c}) => (
  <AbsoluteFill>
    <BrandMark c={c} color={c.p.ink} />
    <Counter c={c} color={c.p.muted} />
    <div style={{position: 'absolute', left: c.M, top: c.top + 110, width: 90, height: 6, background: c.p.accent}} />
    <Stack c={c} x={c.M} y={c.top + 150} w={c.W - 2 * c.M} h={c.bottom - c.top - 230} valign="center" hero titleLines={5} />
    {c.spec.brand.handle ? <Txt text={c.spec.brand.handle} font={c.t.fonts.label} x={c.M} y={c.bottom - 40} w={c.W - 2 * c.M} h={40} max={c.t.scale.label} lines={1} color={c.p.muted} /> : null}
  </AbsoluteFill>
);

const Offer: React.FC<{c: Ctx}> = ({c}) => {
  const ph = Math.round(c.H * 0.42);
  return (
    <AbsoluteFill style={{background: c.p.accent}}>
      <Photo c={c} style={{left: 0, top: c.H - ph, width: c.W, height: ph}} />
      <BrandMark c={c} color={c.p.onAccent} />
      <Counter c={c} color={c.p.onAccent} />
      <Stack c={c} x={c.M} y={c.top + 80} w={c.W - 2 * c.M} h={c.H - ph - c.top - 150} ink={c.p.onAccent} muted={alpha(c.p.onAccent, 0.82)} accent={c.p.onAccent} valign="center" hero />
      {c.s.cta ? <Pill c={c} text={c.s.cta} x={c.M} y={c.H - ph - 100} bg={c.p.onAccent} fg={c.p.accent} size={28} /> : null}
    </AbsoluteFill>
  );
};

const Grid: React.FC<{c: Ctx}> = ({c}) => {
  const g = 10, stripH = Math.round(c.H * 0.3);
  const gh = c.H - stripH - g, bw = Math.round(c.W * 0.6);
  return (
    <AbsoluteFill style={{background: c.p.bg}}>
      <Photo c={c} j={0} style={{left: 0, top: 0, width: bw - g / 2, height: gh}} />
      <Photo c={c} j={1} style={{left: bw + g / 2, top: 0, width: c.W - bw - g / 2, height: gh / 2 - g / 2}} />
      <Photo c={c} j={2} style={{left: bw + g / 2, top: gh / 2 + g / 2, width: c.W - bw - g / 2, height: gh / 2 - g / 2}} />
      <Counter c={c} color="#FFFFFF" />
      <Stack c={c} x={c.M} y={gh + 30} w={c.W - 2 * c.M} h={Math.min(stripH - 60, c.bottom - gh - 30)} valign="center" titleLines={3} />
    </AbsoluteFill>
  );
};

const Frame: React.FC<{c: Ctx}> = ({c}) => {
  const fw = c.W - 2 * (c.M + 40), fh = Math.round((c.bottom - c.top) * 0.62);
  return (
    <AbsoluteFill>
      <BrandMark c={c} color={c.p.ink} align="center" x={c.M} />
      <Counter c={c} color={c.p.muted} />
      <div style={{position: 'absolute', left: c.M + 40 - 16, top: c.top + 84, width: fw + 32, height: fh + 32, border: `2px solid ${alpha(c.p.ink, 0.25)}`}} />
      <Photo c={c} style={{left: c.M + 40, top: c.top + 100, width: fw, height: fh}} />
      <Stack c={c} x={c.M} y={c.top + 100 + fh + 50} w={c.W - 2 * c.M} h={c.bottom - (c.top + 100 + fh + 50)} align="center" valign="center" titleLines={3} />
    </AbsoluteFill>
  );
};

const Quote: React.FC<{c: Ctx}> = ({c}) => (
  <AbsoluteFill>
    <BrandMark c={c} color={c.p.ink} />
    <Counter c={c} color={c.p.muted} />
    <Txt text="“" font={c.t.fonts.display} x={c.M - 8} y={c.top + 60} w={260} h={260} max={300} lines={1} color={c.p.accent} />
    <Stack c={{...c, s: {...c.s, title: c.s.body ?? c.s.title, body: undefined, eyebrow: undefined}}} x={c.M} y={c.top + 250} w={c.W - 2 * c.M} h={c.bottom - c.top - 400} valign="center" titleLines={6} />
    <div style={{position: 'absolute', left: c.M, top: c.bottom - 100, width: 60, height: 3, background: c.p.accent}} />
    <Txt text={c.s.eyebrow ?? c.spec.brand.name} font={c.t.fonts.label} x={c.M} y={c.bottom - 80} w={c.W - 2 * c.M} h={40} max={c.t.scale.label} lines={1} color={c.p.muted} />
  </AbsoluteFill>
);

const Cta: React.FC<{c: Ctx}> = ({c}) => {
  const mid = (c.top + c.bottom) / 2;
  return (
    <AbsoluteFill>
      <Counter c={c} color={c.p.muted} />
      <Txt text={c.spec.brand.name} font={c.t.fonts.display} x={c.M} y={mid - 230} w={c.W - 2 * c.M} h={190} max={Math.round(c.t.scale.hero * 1.1)} min={60} lines={2} color={c.p.ink} align="center" valign="bottom" />
      {c.spec.brand.tagline ? <Txt text={c.spec.brand.tagline} font={c.t.fonts.label} x={c.M} y={mid - 20} w={c.W - 2 * c.M} h={44} max={c.t.scale.label + 2} lines={1} color={c.p.muted} align="center" /> : null}
      {c.s.cta ? <Pill c={c} text={c.s.cta} x={c.W / 2} y={mid + 60} bg={c.p.accent} fg={c.p.onAccent} size={32} center /> : null}
      {c.spec.brand.handle ? <Txt text={c.spec.brand.handle} font={c.t.fonts.body} x={c.M} y={mid + 210} w={c.W - 2 * c.M} h={50} max={34} lines={1} color={c.p.ink} align="center" /> : null}
    </AbsoluteFill>
  );
};

const LAYOUTS = {hero: Hero, cover: Cover, split: Split, product: Product, features: Features, statement: Statement, offer: Offer, grid: Grid, frame: Frame, quote: Quote, cta: Cta};
const FULL_BLEED = new Set(['hero', 'cover', 'grid']);

/** One slide of a post, at the format's full size. Static: no animation, so it renders the same at any frame. */
export const PostSlide: React.FC<{spec: PostSpec; slide: number; fontBase?: string}> = ({spec, slide, fontBase}) => {
  // Text is measured to fit its box, so nothing is laid out until the theme fonts have loaded.
  const [ready, setReady] = useState(() => typeof window !== 'undefined' && !!(window as any).__kathaviFonts);
  const [handle] = useState(() => (ready ? null : delayRender('fonts')));
  useEffect(() => {
    if (ready) return;
    ensureFonts(fontBase).then(() => { (window as any).__kathaviFonts = true; setReady(true); if (handle !== null) continueRender(handle); }).catch(() => { setReady(true); if (handle !== null) continueRender(handle); });
  }, [ready, handle, fontBase]);
  const t = themeById(spec.themeId);
  const p = t.palette(spec.brand);
  const {w: W, h: H} = FORMAT_SIZE[spec.format];
  const story = spec.format === 'story';
  const M = 84;
  const c: Ctx = {spec, s: spec.slides[slide] ?? spec.slides[0], i: slide, n: spec.slides.length, t, p, W, H, M, top: story ? 250 : 80, bottom: story ? H - 440 : H - 80, k: spec.format === 'square' ? 0.82 : story ? 1 : 0.9};
  const L = LAYOUTS[c.s.layout] ?? Hero;
  const bg = c.s.layout === 'split' ? p.surface : c.s.layout === 'offer' ? p.accent : p.bg;
  return (
    <AbsoluteFill style={{background: bg, overflow: 'hidden'}}>
      {FULL_BLEED.has(c.s.layout) || c.s.layout === 'offer' ? null : <Texture kind={t.decor.texture} p={p} />}
      {ready ? <L c={c} /> : null}
      {t.decor.vignette > 0.2 && FULL_BLEED.has(c.s.layout) ? <Vignette amount={t.decor.vignette * 0.6} /> : null}
      {t.decor.grain > 0 ? <Grain amount={t.decor.grain * 0.7} /> : null}
      {story ? null : <div style={{position: 'absolute', inset: 0, boxShadow: `inset 0 0 0 1px ${alpha(isDark(bg) ? '#FFFFFF' : '#000000', 0.04)}`}} />}
    </AbsoluteFill>
  );
};

