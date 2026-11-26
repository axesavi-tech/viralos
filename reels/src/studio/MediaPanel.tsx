import React, {useRef} from 'react';
import {isVideo, type Media} from '../engine/schema';

/** One item in the customer's reel library: a photo or clip, and whether this reel uses it. */
export type LibItem = {m: Media; on: boolean};
export const MAX_MEDIA = 8;

const secs = (s?: number) => (s ? (s < 60 ? `${Math.round(s)}s` : `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`) : '');
const thumbOf = (m: Media, abs: (s: string) => string) => (isVideo(m) ? (m.poster ? abs(m.poster) : '') : abs(m.src));

/** Read a clip's length and grab a still frame, so posts and thumbnails can show it. */
export const probeVideo = (file: File): Promise<{durationSec?: number; poster?: Blob}> =>
  new Promise((resolve) => {
    const v = document.createElement('video');
    const url = URL.createObjectURL(file);
    let done = false;
    const finish = (r: {durationSec?: number; poster?: Blob}) => { if (done) return; done = true; URL.revokeObjectURL(url); resolve(r); };
    v.muted = true; v.playsInline = true; v.preload = 'auto'; v.src = url;
    v.onloadedmetadata = () => { v.currentTime = Math.min(0.6, (v.duration || 1) / 2); };
    v.onseeked = () => {
      const w = Math.min(720, v.videoWidth || 720);
      const h = Math.round(w * (v.videoHeight || 1280) / (v.videoWidth || 720));
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      try { cv.getContext('2d')!.drawImage(v, 0, 0, w, h); cv.toBlob((b) => finish({durationSec: v.duration || undefined, poster: b ?? undefined}), 'image/jpeg', 0.86); }
      catch { finish({durationSec: v.duration || undefined}); }
    };
    v.onerror = () => finish({});
    setTimeout(() => finish({durationSec: v.duration || undefined}), 8000);
  });

export const MediaPanel: React.FC<{
  lib: LibItem[];
  setLib: (l: LibItem[]) => void;
  abs: (s: string) => string;
  busy: boolean;
  embed: boolean;
  onUpload: (files: FileList | null) => void;
  editing: number | null;
  setEditing: (i: number | null) => void;
}> = ({lib, setLib, abs, busy, embed, onUpload, editing, setEditing}) => {
  const inUse = lib.filter((x) => x.on).length;
  const input = useRef<HTMLInputElement>(null);
  const toggle = (i: number) => {
    const on = !lib[i].on;
    if (!on && inUse <= 1) return; // a reel needs at least one
    setLib(lib.map((x, j) => (j === i ? {...x, on} : x)));
  };
  const move = (i: number, d: -1 | 1) => {
    const j = i + d; if (j < 0 || j >= lib.length) return;
    const l = [...lib]; [l[i], l[j]] = [l[j], l[i]]; setLib(l);
    if (editing === i) setEditing(j); else if (editing === j) setEditing(i);
  };
  const remove = (i: number) => { setLib(lib.filter((_, j) => j !== i)); setEditing(null); };
  const room = MAX_MEDIA - lib.length;

  return (
    <div className="media">
      {lib.length ? (
        <>
          <p className="media-count">{inUse} of {lib.length} in this reel · up to {MAX_MEDIA} photos or clips</p>
          <ol className="media-grid">
            {lib.map((x, i) => {
              const t = thumbOf(x.m, abs);
              return (
                <li key={x.m.src + i} className={(x.on ? 'on' : 'off') + (editing === i ? ' editing' : '')}>
                  <button className="media-tile" onClick={() => setEditing(editing === i ? null : i)} aria-label={`Frame ${isVideo(x.m) ? 'clip' : 'photo'} ${i + 1}`} title="Adjust framing and zoom">
                    {t ? <img src={t} alt="" style={{objectPosition: `${(x.m.focusX ?? 0.5) * 100}% ${(x.m.focusY ?? 0.5) * 100}%`}} /> : <video src={abs(x.m.src)} muted playsInline preload="metadata" />}
                    <span className="media-n">{i === 0 ? 'Lead' : i + 1}</span>
                    {isVideo(x.m) ? <span className="media-vid">▶ {secs(x.m.durationSec)}</span> : null}
                  </button>
                  <div className="media-ctl">
                    <label className="media-use" title={x.on ? 'Used in this reel' : 'Not used in this reel'}>
                      <input type="checkbox" checked={x.on} onChange={() => toggle(i)} aria-label={`Use item ${i + 1} in this reel`} />Use
                    </label>
                    <span>
                      <button aria-label="Move earlier" onClick={() => move(i, -1)} disabled={i === 0}>‹</button>
                      <button aria-label="Move later" onClick={() => move(i, 1)} disabled={i === lib.length - 1}>›</button>
                      <button aria-label="Remove" onClick={() => remove(i)}>×</button>
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      ) : <p className="hint">No photos or clips yet.</p>}
      <label className={'file' + (room <= 0 || busy ? ' disabled' : '')}>
        {room <= 0 ? `${MAX_MEDIA} of ${MAX_MEDIA} added · remove one to add another` : `Add photos or video clips${lib.length ? ` (${room} more)` : ''}`}
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime" multiple disabled={busy || room <= 0}
          onChange={(e) => { onUpload(e.target.files); if (input.current) input.current.value = ''; }} />
      </label>
      <p className="hint">The first item leads the reel. Untick an item to leave it out; every ticked item gets screen time. Tap one to frame it.{embed ? ' Clips up to 50 MB.' : ' Files stay in your browser.'}</p>
    </div>
  );
};

/** Framing for one photo or clip: drag to place the product, zoom, fill or show-all, and where a clip starts. */
export const FrameEditor: React.FC<{item: Media; abs: (s: string) => string; onChange: (p: Partial<Media>) => void; onClose: () => void}> = ({item, abs, onChange, onClose}) => {
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{x: number; y: number; fx: number; fy: number} | null>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const fx = item.focusX ?? 0.5, fy = item.focusY ?? 0.5, zoom = item.zoom ?? 1, fit = item.fit ?? 'cover';
  const pos = `${fx * 100}% ${fy * 100}%`;
  const video = isVideo(item);
  const clamp = (v: number) => Math.min(1, Math.max(0, Math.round(v * 1000) / 1000));
  const onDown = (e: React.PointerEvent) => { (e.target as Element).setPointerCapture?.(e.pointerId); drag.current = {x: e.clientX, y: e.clientY, fx, fy}; };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current; const r = box.current?.getBoundingClientRect(); if (!d || !r) return;
    // dragging the picture right reveals more of its left side, so the focus moves the other way
    onChange({focusX: clamp(d.fx - (e.clientX - d.x) / r.width / zoom), focusY: clamp(d.fy - (e.clientY - d.y) / r.height / zoom)});
  };
  const onUp = () => { drag.current = null; };
  const st: React.CSSProperties = {width: '100%', height: '100%', objectFit: fit, objectPosition: pos, transform: `scale(${zoom})`, transformOrigin: pos, pointerEvents: 'none', userSelect: 'none'};
  const setTrim = (t: number) => { onChange({trimStart: t}); if (vid.current) vid.current.currentTime = t; };

  return (
    <div className="frame-ed" role="group" aria-label="Framing">
      <div className="frame-head"><b>Frame this {video ? 'clip' : 'photo'}</b><button onClick={onClose} aria-label="Close framing">Done</button></div>
      <div className="frame-box" ref={box} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        onWheel={(e) => onChange({zoom: Math.min(3, Math.max(1, Math.round((zoom - e.deltaY / 600) * 100) / 100))})}>
        {fit === 'contain' ? (video && item.poster ? <img src={abs(item.poster)} alt="" className="frame-blur" /> : !video ? <img src={abs(item.src)} alt="" className="frame-blur" /> : null) : null}
        {video ? <video ref={vid} src={abs(item.src)} muted loop autoPlay playsInline style={st} onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).currentTime = item.trimStart ?? 0; }} />
          : <img src={abs(item.src)} alt="" style={st} draggable={false} />}
        <span className="frame-safe" aria-hidden />
      </div>
      <p className="hint">Drag to place the product. The dashed area stays clear of Instagram's buttons.</p>
      <label>Zoom <span className="frame-val">{zoom.toFixed(2)}×</span>
        <input type="range" min={1} max={3} step={0.05} value={zoom} onChange={(e) => onChange({zoom: Number(e.target.value)})} />
      </label>
      <div className="seg">
        <button className={fit === 'cover' ? 'on' : ''} onClick={() => onChange({fit: 'cover'})}>Fill the frame</button>
        <button className={fit === 'contain' ? 'on' : ''} onClick={() => onChange({fit: 'contain', zoom: 1})}>Show whole product</button>
      </div>
      {video && item.durationSec ? (
        <label>Start clip at <span className="frame-val">{(item.trimStart ?? 0).toFixed(1)}s of {item.durationSec.toFixed(1)}s</span>
          <input type="range" min={0} max={Math.max(0, item.durationSec - 1)} step={0.1} value={item.trimStart ?? 0} onChange={(e) => setTrim(Number(e.target.value))} />
        </label>
      ) : null}
      <button className="secondary" onClick={() => onChange({focusX: 0.5, focusY: 0.5, zoom: 1, fit: 'cover', trimStart: 0})}>Reset framing</button>
    </div>
  );
};
