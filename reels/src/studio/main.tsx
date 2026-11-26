import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {Reel, timeline, totalFrames} from '../Reel';
import {plan} from '../engine/planner';
import {THEMES, themeById} from '../themes';
import {BRIEFS} from '../samples';
import type {Brief, ReelSpec} from '../engine/schema';

/**
 * Kathavi Reel Studio.
 * Standalone it shows the five demo brands. Inside the Kathavi studio (?embed=1) it also receives the
 * customer's own brand (name, colours, handle, Brand Vault photos) from the parent page, saves reels to
 * the workspace through /api/docs and uploads photos to the Brand Vault through /api/assets.
 */

const EMBED = new URLSearchParams(location.search).has('embed');
const base = new URL('.', location.href).href.replace(/\/$/, '');
const abs = (src: string) => (/^(https?:|blob:|data:|\/)/.test(src) ? src : `${base}/${src}`);
const DURS = [15, 30, 45, 60, 90] as const;

const DEMOS: {key: string; label: string; theme: string}[] = [
  {key: 'iraaya', label: 'Iraaya · handloom sarees', theme: 'quiet-luxury'},
  {key: 'kaapiyo', label: 'Kaapiyo · filter coffee', theme: 'film-nostalgia'},
  {key: 'kaapiyoFounder', label: 'Kaapiyo · founder story', theme: 'founder-story'},
  {key: 'ojasri', label: 'Ojasri · Ayurvedic skincare', theme: 'gallery-depth'},
  {key: 'dhaavo', label: 'Dhaavo · running club', theme: 'depth-studio'},
  {key: 'mittiko', label: 'Mittiko · handmade ceramics', theme: 'cube-motion'},
];

type Draft = Brief;
type ParentBrand = {name?: string; tagline?: string; primary?: string; accent?: string; handle?: string};
type ParentMsg = {type: 'kathavi:brand'; ws?: string | null; brand?: ParentBrand | null; media?: {src: string}[]; product?: {name?: string; price?: string} | null};

const hex = (v: unknown, fallback: string) => {
  const s = String(v ?? '').trim();
  if (/^#[0-9a-f]{6}$/i.test(s)) return s.toUpperCase();
  if (/^#[0-9a-f]{3}$/i.test(s)) return ('#' + s.slice(1).split('').map((c) => c + c).join('')).toUpperCase();
  return fallback;
};
const fromDemo = (k: string, durationSec: Draft['durationSec'] = 30): Draft => {
  const demo = DEMOS.find((x) => x.key === k) ?? DEMOS[0];
  return JSON.parse(JSON.stringify({...BRIEFS[demo.key], themeId: demo.theme, durationSec}));
};
/** A first draft from the customer's own brand. Words are a starting point the customer edits; price only if their catalogue has one. */
const fromBrand = (m: ParentMsg, durationSec: Draft['durationSec'] = 30): Draft => {
  const b = m.brand ?? {};
  const name = (b.name || 'Your brand').slice(0, 40);
  return {
    brand: {name, tagline: b.tagline?.slice(0, 60) || undefined, primary: hex(b.primary, '#222222'), accent: hex(b.accent, hex(b.primary, '#C9A96E')), handle: b.handle?.slice(0, 40) || undefined},
    themeId: 'quiet-luxury',
    durationSec,
    objective: 'showcase',
    hook: (b.tagline || `Meet ${name}.`).slice(0, 90),
    story: undefined,
    productName: m.product?.name?.slice(0, 60) || undefined,
    features: [],
    price: m.product?.price ? String(m.product.price).slice(0, 24) : undefined,
    cta: 'Shop now',
    media: (m.media ?? []).filter((x) => x?.src).slice(0, 12).map((x) => ({src: x.src, focusX: 0.5, focusY: 0.45})),
    intensity: 1,
    showSafeZones: false,
  } as Draft;
};

const KIND_LABEL: Record<string, string> = {hook: 'Hook', story: 'Story', product: 'Product', feature: 'Feature', detail: 'Detail', offer: 'Offer', cta: 'Call to action', logo: 'Logo'};

const App: React.FC = () => {
  const [parent, setParent] = useState<ParentMsg | null>(null);
  const [preset, setPreset] = useState('iraaya');
  const [d, setD] = useState<Draft>(() => fromDemo('iraaya'));
  const [order, setOrder] = useState<string[] | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const player = useRef<PlayerRef>(null);
  const [vh, setVh] = useState(() => window.innerHeight);
  useEffect(() => { const f = () => setVh(window.innerHeight); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  const ph = Math.max(480, Math.min(vh - (EMBED ? 90 : 150), Math.round((window.innerWidth < 1050 ? Math.min(320, window.innerWidth - 40) : 9999) * 16 / 9)));
  const pw = Math.round(ph * 9 / 16);

  // Receive the customer's brand from the Kathavi studio around this page.
  useEffect(() => {
    if (!EMBED) return;
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== location.origin || e.data?.type !== 'kathavi:brand') return;
      const m = e.data as ParentMsg;
      setParent(m);
      if (m.brand?.name) { setPreset('mine'); setOrder(null); setD((x) => fromBrand(m, x.durationSec)); }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({type: 'kathavi:ready'}, location.origin);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const set = (patch: Partial<Draft>) => setD((x) => ({...x, ...patch}));
  const setBrand = (patch: Partial<Draft['brand']>) => setD((x) => ({...x, brand: {...x.brand, ...patch}}));
  const choose = (k: string) => { setPreset(k); setOrder(null); setNote(''); setD((x) => (k === 'mine' && parent ? fromBrand(parent, x.durationSec) : fromDemo(k, x.durationSec))); };

  const planned = useMemo((): {spec: ReelSpec | null; err: string} => {
    if (!d.media.length) return {spec: null, err: 'Add at least one photo to make a reel. Upload here, or add photos to your Brand Vault.'};
    if (!d.hook.trim()) return {spec: null, err: 'Write a hook: the first line people read.'};
    try {
      const s = plan({...d, features: d.features.filter(Boolean), price: d.price || undefined, offer: d.offer || undefined, story: d.story || undefined, productName: d.productName || undefined});
      if (order && order.length === s.scenes.length && order.every((id) => s.scenes.some((x) => x.id === id))) s.scenes = order.map((id) => s.scenes.find((x) => x.id === id)!);
      return {spec: s, err: ''};
    } catch (e: any) {
      return {spec: null, err: e?.issues?.[0]?.message ?? String(e?.message ?? e)};
    }
  }, [d, order]);
  const spec = planned.spec;

  const playable = useMemo(() => spec && {...spec, media: spec.media.map((m) => ({...m, src: abs(m.src)})), fontBase: `${base}/fonts`}, [spec]);
  const tl = spec ? timeline(spec) : [];
  const dur = spec ? totalFrames(spec) : 30;

  const move = (i: number, dir: -1 | 1) => {
    if (!spec) return;
    const ids = spec.scenes.map((s) => s.id);
    const j = i + dir;
    if (j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    setOrder(ids);
  };

  const api = async (path: string, init: RequestInit) => {
    const headers = new Headers(init.headers);
    if (parent?.ws) headers.set('x-workspace', parent.ws);
    const r = await fetch(path, {...init, headers, credentials: 'same-origin'});
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data?.error || `Request failed (${r.status})`);
    return data;
  };

  const onUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    const list = [...files].slice(0, 12);
    if (!EMBED) { set({media: list.map((f) => ({src: URL.createObjectURL(f), focusX: 0.5, focusY: 0.5}))}); setOrder(null); return; }
    setBusy(true); setNote('Uploading photos to your Brand Vault…');
    const media: Draft['media'] = [];
    for (const f of list) {
      try {
        const fd = new FormData(); fd.append('file', f, f.name); fd.append('folder', 'reels');
        const r = await api('/api/assets', {method: 'POST', body: fd});
        media.push({src: r.url, focusX: 0.5, focusY: 0.5});
      } catch {
        media.push({src: URL.createObjectURL(f), focusX: 0.5, focusY: 0.5});
      }
    }
    set({media}); setOrder(null); setBusy(false);
    setNote(media.some((m) => m.src.startsWith('blob:')) ? 'Some photos could not be stored (20 MB maximum each). They work in this preview but will not be saved with the reel.' : 'Photos added.');
  };

  const save = async () => {
    if (!spec) return;
    if (d.media.some((m) => m.src.startsWith('blob:'))) { setNote('Upload the photos to your Brand Vault before saving, so the reel can be opened again later.'); return; }
    setBusy(true); setNote('Saving…');
    try {
      const id = 'reel_' + Date.now().toString(36);
      const theme = themeById(d.themeId);
      await api('/api/docs', {method: 'PUT', headers: {'content-type': 'application/json'}, body: JSON.stringify({id, data: {
        type: 'reel', title: `${d.brand.name} · ${theme.name} · ${d.durationSec}s`, brandName: d.brand.name, themeId: d.themeId, durationSec: d.durationSec,
        demo: preset !== 'mine', brief: d, spec, savedAt: new Date().toISOString(),
      }})});
      setNote('Saved to your workspace. MP4 export arrives with the render service.');
    } catch (e: any) {
      setNote(`Could not save: ${e.message}`);
    } finally { setBusy(false); }
  };

  const copy = async () => {
    if (!spec) return;
    const text = JSON.stringify(spec, null, 2);
    try { await navigator.clipboard.writeText(text); } catch { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
    setNote('Reel spec copied.');
  };

  const is3D = (id: string) => ['depth-studio', 'cube-motion', 'gallery-depth'].includes(id);

  return (
    <div className={'app' + (EMBED ? ' embed' : '')}>
      {EMBED ? null : (
        <header>
          <div className="mark">Kathavi <span>Reel Studio</span></div>
          <div className="sub">Try a demo brand, switch themes and edit the words. Themes, layouts and motion stay separate from your content.</div>
        </header>
      )}
      <aside className="left">
        <section>
          <h3>Brand</h3>
          <select value={preset} onChange={(e) => choose(e.target.value)} aria-label="Brand">
            {parent?.brand?.name ? <option value="mine">{parent.brand.name} · your brand</option> : null}
            <optgroup label="Demo brands">
              {DEMOS.map((x) => <option key={x.key} value={x.key}>{x.label}</option>)}
            </optgroup>
          </select>
          {preset !== 'mine' ? <p className="hint">A demo brand, to try Kathavi before setting up your own.</p> : null}
        </section>
        <section>
          <h3>Theme</h3>
          <div className="themes">
            {THEMES.map((t) => (
              <button key={t.id} className={t.id === d.themeId ? 'on' : ''} title={t.description} onClick={() => { setOrder(null); set({themeId: t.id}); }}>
                <img src={`${base}/themes/${t.id}.jpg`} alt="" loading="lazy" />
                <span>{t.name}{is3D(t.id) ? <em>3D</em> : null}</span>
              </button>
            ))}
          </div>
        </section>
        <section>
          <h3>Identity</h3>
          <label>Name<input value={d.brand.name} maxLength={40} onChange={(e) => setBrand({name: e.target.value})} /></label>
          <label>Tagline<input value={d.brand.tagline ?? ''} maxLength={60} onChange={(e) => setBrand({tagline: e.target.value || undefined})} /></label>
          <label>Handle<input value={d.brand.handle ?? ''} maxLength={40} onChange={(e) => setBrand({handle: e.target.value || undefined})} /></label>
          <div className="row">
            <label className="color">Primary<input type="color" value={d.brand.primary} onChange={(e) => setBrand({primary: e.target.value.toUpperCase()})} /></label>
            <label className="color">Accent<input type="color" value={d.brand.accent ?? d.brand.primary} onChange={(e) => setBrand({accent: e.target.value.toUpperCase()})} /></label>
          </div>
        </section>
        <section>
          <h3>Photos</h3>
          {d.media.length ? <div className="thumbs">{d.media.map((m, i) => <img key={i} src={abs(m.src)} alt="" />)}</div> : <p className="hint">No photos yet.</p>}
          <label className="file">{EMBED ? 'Upload photos to your Brand Vault' : 'Use your own photos'}<input type="file" accept="image/*" multiple disabled={busy} onChange={(e) => onUpload(e.target.files)} /></label>
          {EMBED ? null : <p className="hint">Photos stay in your browser; nothing is uploaded.</p>}
        </section>
      </aside>

      <main>
        <div className="stage" style={{width: pw, height: ph}}>
          {playable ? (
            <Player ref={player} component={Reel as any} inputProps={playable as any} durationInFrames={dur} fps={30} compositionWidth={1080} compositionHeight={1920}
              style={{width: pw, height: ph}} controls loop autoPlay acknowledgeRemotionLicense />
          ) : (
            <div className="empty">
              <p>{planned.err}</p>
              {d.media.length ? null : (
                <div className="empty-actions">
                  <label className="btn-light">Upload photos<input type="file" accept="image/*" multiple disabled={busy} onChange={(e) => onUpload(e.target.files)} /></label>
                  <button className="btn-ghost" onClick={() => choose('iraaya')}>Try a demo brand</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="meta" aria-live="polite">{note || (spec ? `${(dur / 30).toFixed(1)}s · ${spec.scenes.length} scenes · 1080×1920 · 30fps` : '')}</div>
      </main>

      <aside className="right">
        <section>
          <h3>Length</h3>
          <div className="seg">{DURS.map((s) => <button key={s} className={s === d.durationSec ? 'on' : ''} onClick={() => { setOrder(null); set({durationSec: s}); }}>{s}s</button>)}</div>
          <h3>Motion intensity</h3>
          <input type="range" min={0.4} max={1.6} step={0.1} value={d.intensity} aria-label="Motion intensity" onChange={(e) => set({intensity: Number(e.target.value)})} />
          <label className="check"><input type="checkbox" checked={d.showSafeZones} onChange={(e) => set({showSafeZones: e.target.checked})} />Show Instagram safe zones</label>
        </section>
        <section>
          <h3>Words</h3>
          <label>Hook<textarea rows={2} maxLength={90} value={d.hook} onChange={(e) => set({hook: e.target.value})} /></label>
          <label>Story<textarea rows={2} maxLength={160} value={d.story ?? ''} onChange={(e) => set({story: e.target.value})} /></label>
          <label>Product<input maxLength={60} value={d.productName ?? ''} onChange={(e) => set({productName: e.target.value})} /></label>
          {[0, 1, 2].map((i) => (
            <label key={i}>Feature {i + 1}<input maxLength={60} value={d.features[i] ?? ''} onChange={(e) => { const f = [...d.features]; f[i] = e.target.value; set({features: f}); }} /></label>
          ))}
          <div className="row">
            <label>Price<input maxLength={24} placeholder="optional" value={d.price ?? ''} onChange={(e) => set({price: e.target.value})} /></label>
            <label>Offer<input maxLength={60} placeholder="optional" value={d.offer ?? ''} onChange={(e) => set({offer: e.target.value})} /></label>
          </div>
          <label>Button<input maxLength={40} value={d.cta} onChange={(e) => set({cta: e.target.value})} /></label>
          <p className="hint">Price and offer appear only when you fill them in.</p>
        </section>
        <section>
          <h3>Scenes</h3>
          <ol className="scenes">
            {spec?.scenes.map((s, i) => (
              <li key={s.id}>
                <button className="seek" onClick={() => player.current?.seekTo(tl[i].from + 2)}>
                  <b>{KIND_LABEL[s.kind]}</b><span>{s.layout} · {(s.frames / 30).toFixed(1)}s</span>
                </button>
                <span className="mv"><button aria-label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</button><button aria-label="Move down" onClick={() => move(i, 1)} disabled={i === spec.scenes.length - 1}>↓</button></span>
              </li>
            ))}
          </ol>
          {EMBED ? <button className="primary" onClick={save} disabled={!spec || busy}>Save reel to workspace</button> : null}
          <button className={EMBED ? 'secondary' : 'primary'} onClick={copy} disabled={!spec}>Copy reel spec (JSON)</button>
        </section>
      </aside>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
