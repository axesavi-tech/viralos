import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, continueRender, delayRender, Audio} from 'remotion';
import {ReelSpec} from './engine/schema';
import {themeById} from './themes';
import {SceneView} from './components/Scene';
import {TransitionIn} from './components/Transition';
import {Grain, Letterbox, SafeZones, Texture, Vignette} from './components/Decor';
import {ensureFonts} from './engine/fonts';
import {alpha} from './engine/color';
import {SAFE} from './engine/motion';

export const timeline = (spec: ReelSpec) => {
  const t = themeById(spec.themeId);
  const T = t.pacing.transitionFrames;
  let at = 0;
  return spec.scenes.map((s, i) => {
    const from = i === 0 ? 0 : at - (s.transitionIn === 'cut' ? 0 : T);
    const start = Math.max(0, from);
    at = start + s.frames;
    return {scene: s, from: start, dur: s.frames, overlap: i === 0 || s.transitionIn === 'cut' ? 0 : T};
  });
};
export const totalFrames = (spec: ReelSpec) => {
  const tl = timeline(spec);
  const last = tl[tl.length - 1];
  return last.from + last.dur;
};

const Captions: React.FC<{spec: ReelSpec}> = ({spec}) => {
  const f = useCurrentFrame();
  const t = themeById(spec.themeId);
  const p = t.palette(spec.brand);
  const cur = spec.captions.find((c) => f >= c.from && f < c.to);
  if (!cur || t.captionStyle === 'none') return null;
  const words = cur.text.split(' ');
  const per = (cur.to - cur.from) / words.length;
  const active = Math.floor((f - cur.from) / per);
  const box: React.CSSProperties = {position: 'absolute', left: SAFE.left, width: 1080 - SAFE.left - SAFE.right, top: 1300, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 14px', fontFamily: `"${t.fonts.body.family}"`, fontWeight: 700, fontSize: 50, lineHeight: 1.3, textAlign: 'center'};
  return (
    <div style={box}>
      {words.map((w, i) => {
        const on = i === active;
        const said = i <= active;
        if (t.captionStyle === 'karaoke')
          return <span key={i} style={{color: on ? p.onAccent : '#fff', background: on ? p.accent : 'rgba(0,0,0,0.62)', padding: '2px 10px', margin: '3px 0', borderRadius: 8, opacity: said ? 1 : 0.7}}>{w}</span>;
        if (t.captionStyle === 'box') return <span key={i} style={{color: '#fff', background: 'rgba(0,0,0,0.78)', padding: '2px 10px', opacity: said ? 1 : 0.35}}>{w}</span>;
        return <span key={i} style={{color: p.ink, fontStyle: 'italic', fontFamily: `"${t.fonts.display.family}"`, fontWeight: 400, textShadow: `0 1px 12px ${alpha(p.bg, 0.9)}`, opacity: said ? 1 : 0.3}}>{w}</span>;
      })}
    </div>
  );
};

export const Reel: React.FC<ReelSpec & {fontBase?: string}> = (props) => {
  const {fontBase, ...spec} = props as any as ReelSpec & {fontBase?: string};
  const [ready, setReady] = useState(typeof window !== 'undefined' && (window as any).__kathaviFonts === true);
  const [handle] = useState(() => (ready ? null : delayRender('Loading theme fonts')));
  useEffect(() => {
    if (ready) return;
    ensureFonts(fontBase).then(() => {
      (window as any).__kathaviFonts = true;
      setReady(true);
      if (handle !== null) continueRender(handle);
    });
  }, []);
  const theme = themeById(spec.themeId);
  const p = theme.palette(spec.brand);
  const tl = timeline(spec);
  if (!ready) return <AbsoluteFill style={{background: p.bg}} />;
  return (
    <AbsoluteFill style={{background: p.bg, overflow: 'hidden'}}>
      <Texture kind={theme.decor.texture} p={p} />
      {tl.map((x, i) => (
        <Sequence key={x.scene.id} from={x.from} durationInFrames={x.dur} layout="none">
          <SceneWrap spec={spec} index={i} overlap={x.overlap} dur={x.dur} />
        </Sequence>
      ))}
      <Captions spec={spec} />
      <Letterbox on={theme.decor.letterbox} />
      <Vignette amount={theme.decor.vignette} />
      <Grain amount={theme.decor.grain} />
      {spec.audioSrc ? <Audio src={spec.audioSrc} /> : null}
      {spec.showSafeZones ? <SafeZones /> : null}
    </AbsoluteFill>
  );
};

const SceneWrap: React.FC<{spec: ReelSpec; index: number; overlap: number; dur: number}> = ({spec, index, overlap, dur}) => {
  const f = useCurrentFrame();
  const theme = themeById(spec.themeId);
  const p = theme.palette(spec.brand);
  const scene = spec.scenes[index];
  const tp = overlap > 0 ? Math.min(1, f / overlap) : 1;
  const opaque = !['fullBleed', 'magazine', 'lowerThird', 'split'].includes(scene.layout ?? '') && scene.layout !== 'typeOnly';
  return (
    <TransitionIn id={scene.transitionIn} p={tp} accent={p.accent} seed={index}>
      <AbsoluteFill style={{background: opaque ? p.bg : undefined}}>
        {opaque ? <Texture kind={theme.decor.texture} p={p} /> : null}
        <SceneView c={{scene, index, spec, theme, p, dur, W: spec.width, H: spec.height}} />
      </AbsoluteFill>
    </TransitionIn>
  );
};
