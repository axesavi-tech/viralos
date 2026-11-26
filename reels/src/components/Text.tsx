import React from 'react';
import {useCurrentFrame} from 'remotion';
import {fit, overflowLog, type FontSpec} from '../engine/fit';
import {prog, EASE, type EaseName} from '../engine/motion';
import type {TextAnim} from '../engine/types';

type Props = {
  text: string;
  font: FontSpec;
  w: number;
  h: number;
  maxSize: number;
  minSize?: number;
  maxLines?: number;
  color: string;
  anim: TextAnim;
  start?: number;
  speed?: number;
  ease?: EaseName;
  align?: 'left' | 'center' | 'right';
  accent?: string;
  style?: React.CSSProperties;
  valign?: 'top' | 'center' | 'bottom';
};

/** One block of fitted, animated text. Every animation is a pure function of the frame. */
export const AnimatedText: React.FC<Props> = ({text, font, w, h, maxSize, minSize, maxLines = 4, color, anim, start = 0, speed = 1, ease = 'silk', align = 'left', accent, style, valign = 'top'}) => {
  const frame = useCurrentFrame() - start;
  const f = fit(text, font, {w, h}, maxSize, minSize ?? Math.max(18, Math.round(maxSize * 0.42)), maxLines);
  if (f.overflow && !overflowLog.includes(text)) {
    overflowLog.push(text);
    console.log('QA_OVERFLOW ' + text);
  }
  const lh = f.size * font.lineHeight;
  const base: React.CSSProperties = {
    fontFamily: `"${font.family}"`,
    fontWeight: font.weight as any,
    fontStyle: font.style ?? 'normal',
    fontSize: f.size,
    lineHeight: `${lh}px`,
    letterSpacing: font.tracking ? `${font.tracking}em` : undefined,
    color,
    whiteSpace: 'pre',
  };
  const s = (n: number) => n / speed;
  const justify = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
  const top = valign === 'bottom' ? h - f.height : valign === 'center' ? (h - f.height) / 2 : 0;

  let wordIndex = 0;
  const lines = f.lines.map((line, li) => {
    const words = line.split(' ');
    const lineP = prog(frame, s(li * 5), s(18), ease);
    let lineStyle: React.CSSProperties = {display: 'flex', justifyContent: justify, height: lh, ...(anim === 'maskUp' ? {clipPath: 'inset(-40% -8% -32% -8%)'} : {})};
    let content: React.ReactNode = line;

    switch (anim) {
      case 'fade': {
        const p = prog(frame, s(li * 4), s(26), ease);
        lineStyle = {...lineStyle, opacity: p, filter: `blur(${(1 - p) * 6}px)`};
        break;
      }
      case 'trackIn': {
        const p = prog(frame, s(li * 6), s(34), 'silk');
        content = <span style={{letterSpacing: `${(font.tracking ?? 0) + (1 - p) * 0.25}em`, opacity: p}}>{line}</span>;
        break;
      }
      case 'maskUp':
        content = <span style={{display: 'inline-block', transform: `translateY(${(1 - lineP) * 140}%)`}}>{line}</span>;
        break;
      case 'lineStagger': {
        const p = prog(frame, s(li * 8), s(24), ease);
        lineStyle = {...lineStyle, opacity: p, transform: `translateY(${(1 - p) * 28}px)`};
        break;
      }
      case 'slideIn': {
        const p = prog(frame, s(li * 4), s(16), ease);
        lineStyle = {...lineStyle, opacity: p, transform: `translateX(${(1 - p) * -60}px)`};
        break;
      }
      case 'typewriter': {
        const before = f.lines.slice(0, li).join('').length;
        const shown = Math.max(0, Math.min(line.length, Math.floor(frame * 1.1 * speed) - before));
        const caret = shown < line.length && shown > 0 && Math.floor(frame / 8) % 2 === 0;
        content = (
          <span>
            {line.slice(0, shown)}
            <span style={{opacity: 0}}>{line.slice(shown)}</span>
            {caret ? <span style={{position: 'absolute', marginLeft: -f.size * 0.05}}>▍</span> : null}
          </span>
        );
        break;
      }
      case 'wordRise':
      case 'punch':
      case 'stamp':
        content = words.map((wd, wi) => {
          const i = wordIndex++;
          const st = s(i * (anim === 'wordRise' ? 3 : 4));
          const p = prog(frame, st, s(anim === 'wordRise' ? 14 : 10), anim === 'wordRise' ? ease : 'pop');
          const t =
            anim === 'wordRise'
              ? `translateY(${(1 - p) * 0.7 * f.size}px)`
              : anim === 'punch'
                ? `scale(${0.4 + 0.6 * p})`
                : `scale(${2.2 - 1.2 * p}) rotate(${(1 - p) * -8}deg)`;
          return (
            <span key={wi} style={{display: 'inline-block', opacity: Math.min(1, p * 1.4), transform: t, transformOrigin: '50% 70%'}}>
              {wd}
              {wi < words.length - 1 ? ' ' : ''}
            </span>
          );
        });
        break;
      case 'highlight': {
        const p = prog(frame, s(10 + li * 6), s(18), 'glide');
        const tp = prog(frame, s(li * 4), s(14), ease);
        content = (
          <span style={{position: 'relative', opacity: tp}}>
            <span style={{position: 'absolute', left: -6, right: -6, bottom: lh * 0.08, height: lh * 0.38, background: accent ?? '#FFE066', transformOrigin: 'left', transform: `scaleX(${p})`, zIndex: 0}} />
            <span style={{position: 'relative'}}>{line}</span>
          </span>
        );
        break;
      }
    }
    return (
      <div key={li} style={lineStyle}>
        {content}
      </div>
    );
  });

  return <div style={{position: 'absolute', width: w, height: h, ...style}}><div style={{...base, position: 'absolute', top, width: w}}>{lines}</div></div>;
};

export const easeOf = (n: EaseName) => EASE[n];
