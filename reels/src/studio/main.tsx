import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {Reel, timeline, totalFrames} from '../Reel';
import {plan} from '../engine/planner';
import {THEMES, themeById} from '../themes';
import {BRIEFS} from '../samples';
import type {Brief, ReelSpec} from '../engine/schema';
import {PostsPanel} from './PostsPanel';
import {MediaPanel, FrameEditor, probeVideo, MAX_MEDIA, type LibItem} from './MediaPanel';
import {isVideo, type Media} from '../engine/schema';
import {FORMAT_SIZE, type PostFormat, type PostSpec} from '../posts/schema';

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
type ParentMsg = {type: 'kathavi:brand'; ws?: string | null; brand?: ParentBrand | null; media?: {src: string; kind?: 'image' | 'video'; poster?: string}[]; product?: {name?: string; price?: string} | null};

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
    media: (m.media ?? []).filter((x) => x?.src).slice(0, MAX_MEDIA).map((x) => ({src: x.src, kind: x.kind, poster: x.poster, focusX: 0.5, focusY: 0.45})),
    intensity: 1,
    showSafeZones: false,
  } as Draft;
};

const KIND_LABEL: Record<string, string> = {hook: 'Hook', story: 'Story', product: 'Product', feature: 'Feature', detail: 'Detail', gallery: 'Gallery', offer: 'Offer', cta: 'Call to action', logo: 'Logo'};

const App: React.FC = () => {
  const [parent, setParent] = useState<ParentMsg | null>(null);
  const [preset, setPreset] = useState('iraaya');
  const [d, setD] = useState<Draft>(() => fromDemo('iraaya'));
  // Library: every photo/clip the customer added (up to 8), each ticked in or out of this reel. d.media = the ticked ones.
  const [lib, setLibState] = useState<LibItem[]>(() => fromDemo('iraaya').media.map((m) => ({m, on: true})));
  const [editing, setEditing] = useState<number | null>(null);
  const [picker, setPicker] = useState<string | null>(null);
  const setLib = (l: LibItem[]) => { setLibState(l); setOrder(null); setD((x) => ({...x, media: l.filter((i) => i.on).map((i) => i.m), assign: undefined})); };
  const loadDraft = (x: Draft) => { setLibState(x.media.slice(0, MAX_MEDIA).map((m) => ({m, on: true}))); setEditing(null); setPicker(null); return {...x, media: x.media.slice(0, MAX_MEDIA)}; };
  /** framing edits keep the scene choices: only the item's look changes */
  const patchItem = (i: number, p: Partial<Media>) => setLibState((l) => {
    const n = l.map((x, j) => (j === i ? {...x, m: {...x.m, ...p}} : x));
    setD((x) => ({...x, media: n.filter((k) => k.on).map((k) => k.m)}));
    return n;
  });
  const [order, setOrder] = useState<string[] | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<'reels' | 'posts'>(() => (new URLSearchParams(location.search).get('mode') === 'posts' ? 'posts' : 'reels'));
  const [pformat, setPformat] = useState<PostFormat>('portrait');
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
      if (m.brand?.name) { setPreset('mine'); setOrder(null); setD((x) => loadDraft(fromBrand(m, x.durationSec))); }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({type: 'kathavi:ready'}, location.origin);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const set = (patch: Partial<Draft>) => setD((x) => ({...x, ...patch}));
  const setBrand = (patch: Partial<Draft['brand']>) => setD((x) => ({...x, brand: {...x.brand, ...patch}}));
  const choose = (k: string) => { setPreset(k); setOrder(null); setNote(''); setD((x) => loadDraft(k === 'mine' && parent ? fromBrand(parent, x.durationSec) : fromDemo(k, x.durationSec))); };

  const planned = useMemo((): {spec: ReelSpec | null; err: string} => {
    if (!d.media.length) return {spec: null, err: 'Add at least one photo or clip to make a reel. Upload here, or add photos to your Brand Vault.'};
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

  const playable = useMemo(() => spec && {...spec, media: spec.media.map((m) => ({...m, src: abs(m.src), poster: m.poster ? abs(m.poster) : undefined})), fontBase: `${base}/fonts`}, [spec]);
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
    const room = MAX_MEDIA - lib.length;
    const all = [...files].filter((f) => /^(image|video)\//.test(f.type));
    const list = all.slice(0, Math.max(0, room));
    if (!list.length) { setNote(room <= 0 ? `A reel can use up to ${MAX_MEDIA} photos or clips. Remove one to add another.` : 'Choose JPG, PNG or WEBP photos, or MP4, MOV or WEBM clips.'); return; }
    setBusy(true); setNote(EMBED ? 'Uploading to your Brand Vault…' : 'Adding…');
    const up = async (f: Blob, name: string) => {
      const fd = new FormData(); fd.append('file', f, name); fd.append('folder', 'reels');
      return (await api('/api/assets', {method: 'POST', body: fd})).url as string;
    };
    const added: Media[] = []; let local = 0;
    for (const f of list) {
      const video = f.type.startsWith('video/');
      const meta = video ? await probeVideo(f) : {};
      let src = '', poster: string | undefined;
      if (EMBED) {
        try { src = await up(f, f.name); } catch { src = URL.createObjectURL(f); local++; }
        if (meta.poster) { try { poster = await up(meta.poster, f.name.replace(/\.[^.]+$/, '') + '-poster.jpg'); } catch { poster = URL.createObjectURL(meta.poster); } }
      } else {
        src = URL.createObjectURL(f); poster = meta.poster ? URL.createObjectURL(meta.poster) : undefined;
      }
      added.push({src, kind: video ? 'video' : 'image', durationSec: meta.durationSec, poster, focusX: 0.5, focusY: 0.5});
    }
    setLib([...lib, ...added.map((m) => ({m, on: true}))]);
    setBusy(false);
    const skipped = all.length - list.length;
    setNote([local ? 'Some files could not be stored (50 MB maximum each). They work in this preview but will not be saved with the reel.' : `${added.length} added.`,
      skipped ? `${skipped} not added: a reel can use up to ${MAX_MEDIA}.` : ''].filter(Boolean).join(' '));
  };

  /** Customer picks which photo(s) a scene shows. Montages toggle items; other scenes swap their lead. */
  const pickFor = (sceneId: string, current: number[], layout: string | undefined, idx: number) => {
    let next: number[];
    if (layout === 'montage') {
      next = current.includes(idx) ? current.filter((x) => x !== idx) : [...current, idx].slice(0, 8);
      if (!next.length) return;
    } else {
      next = [idx, ...current.slice(1).filter((x) => x !== idx)];
      while (next.length < current.length) next.push((next[next.length - 1] + 1) % d.media.length);
    }
    setD((x) => ({...x, assign: {...(x.assign ?? {}), [sceneId]: next}}));
  };

  const save = async () => {
    if (!spec) return;
    if (d.media.some((m) => m.src.startsWith('blob:'))) { setNote('Upload the photos and clips to your Brand Vault before saving, so the reel can be opened again later.'); return; }
    setBusy(true); setNote('Saving…');
    try {
      const id = 'reel_' + Date.now().toString(36);
      const theme = themeById(d.themeId);
      await api('/api/docs', {method: 'PUT', headers: {'content-type': 'application/json'}, body: JSON.stringify({id, data: {
        type: 'reel', title: `${d.brand.name} · ${theme.name} · ${d.durationSec}s`, brandName: d.brand.name, themeId: d.themeId, durationSec: d.durationSec,
        demo: preset !== 'mine', brief: d, library: lib.map((x) => ({...x.m, inReel: x.on})), spec, savedAt: new Date().toISOString(),
      }})});
      setNote('Saved to your workspace. MP4 export arrives with the render service.');
    } catch (e: any) {
      setNote(`Could not save: ${e.message}`);
    } finally { setBusy(false); }
  };

  const savePost = async (p: PostSpec) => {
    if (p.media.some((m) => m.src.startsWith('blob:'))) { setNote('Upload the photos to your Brand Vault before saving, so the post can be opened again later.'); return; }
    setNote('Saving…');
    try {
      const id = 'post_' + Date.now().toString(36);
      await api('/api/docs', {method: 'PUT', headers: {'content-type': 'application/json'}, body: JSON.stringify({id, data: {
        type: 'post', title: `${p.brand.name} · ${themeById(p.themeId).name} · ${p.kind === 'carousel' ? 'carousel' : p.slides[0].layout} · ${FORMAT_SIZE[p.format].label}`,
        brandName: p.brand.name, themeId: p.themeId, format: p.format, demo: preset !== 'mine', spec: p, savedAt: new Date().toISOString(),
      }})});
      setNote('Post saved to your workspace.');
    } catch (e: any) { setNote(`Could not save: ${e.message}`); }
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
          <h3>Photos &amp; clips</h3>
          <MediaPanel lib={lib} setLib={setLib} abs={abs} busy={busy} embed={EMBED} onUpload={onUpload} editing={editing} setEditing={setEditing} />
          {editing !== null && lib[editing] ? <FrameEditor item={lib[editing].m} abs={abs} onChange={(p) => patchItem(editing, p)} onClose={() => setEditing(null)} /> : null}
        </section>
      </aside>

      <main>
        <div className="modes" role="tablist" aria-label="What to make">
          <button role="tab" aria-selected={mode === 'reels'} className={mode === 'reels' ? 'on' : ''} onClick={() => setMode('reels')}>Reels</button>
          <button role="tab" aria-selected={mode === 'posts'} className={mode === 'posts' ? 'on' : ''} onClick={() => setMode('posts')}>Posts, carousels &amp; stories</button>
        </div>
        {mode === 'posts' ? (
          d.media.length ? <PostsPanel d={d} abs={abs} fontBase={`${base}/fonts`} format={pformat} setNote={setNote} onSave={EMBED ? savePost : undefined} /> : <div className="stage" style={{width: pw, height: ph}}><div className="empty"><p>{planned.err}</p></div></div>
        ) : (
        <div className="stage" style={{width: pw, height: ph}}>
          {playable ? (
            <Player ref={player} component={Reel as any} inputProps={playable as any} durationInFrames={dur} fps={30} compositionWidth={1080} compositionHeight={1920}
              style={{width: pw, height: ph}} controls loop autoPlay acknowledgeRemotionLicense />
          ) : (
            <div className="empty">
              <p>{planned.err}</p>
              {d.media.length ? null : (
                <div className="empty-actions">
                  <label className="btn-light">Upload photos or clips<input type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime" multiple disabled={busy} onChange={(e) => onUpload(e.target.files)} /></label>
                  <button className="btn-ghost" onClick={() => choose('iraaya')}>Try a demo brand</button>
                </div>
              )}
            </div>
          )}
        </div>
        )}
        <div className="meta" aria-live="polite">{note || (spec ? `${(dur / 30).toFixed(1)}s · ${spec.scenes.length} scenes · 1080×1920 · 30fps` : '')}</div>
      </main>

      <aside className="right">
        <section>
          {mode === 'posts' ? (<>
            <h3>Format</h3>
            <div className="seg">{(Object.keys(FORMAT_SIZE) as PostFormat[]).map((f) => <button key={f} className={f === pformat ? 'on' : ''} onClick={() => setPformat(f)}>{FORMAT_SIZE[f].label}</button>)}</div>
          </>) : (<>
          <h3>Length</h3>
          <div className="seg">{DURS.map((s) => <button key={s} className={s === d.durationSec ? 'on' : ''} onClick={() => { setOrder(null); set({durationSec: s}); }}>{s}s</button>)}</div>
          </>)}
          {mode === 'posts' ? null : <h3>Motion intensity</h3>}
          {mode === 'posts' ? null : <input type="range" min={0.4} max={1.6} step={0.1} value={d.intensity} aria-label="Motion intensity" onChange={(e) => set({intensity: Number(e.target.value)})} />}
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
        {mode === 'posts' ? null : <section>
          <h3>Scenes</h3>
          <ol className="scenes">
            {spec?.scenes.map((s, i) => (
              <li key={s.id}>
                <div className="scene-row">
                  <button className="seek" onClick={() => player.current?.seekTo(tl[i].from + 2)}>
                    <b>{KIND_LABEL[s.kind] ?? s.kind}</b><span>{s.layout === 'montage' ? `${s.media.length} items` : s.layout} · {(s.frames / 30).toFixed(1)}s</span>
                  </button>
                  {s.media.length ? (
                    <button className={'scene-media' + (picker === s.id ? ' on' : '')} onClick={() => setPicker(picker === s.id ? null : s.id)} aria-label={`Choose photos for ${KIND_LABEL[s.kind] ?? s.kind}`} title="Choose which photo or clip this scene shows">
                      {(() => { const mm = d.media[s.media[0]]; const src = mm ? (isVideo(mm) ? mm.poster : mm.src) : ''; return src ? <img src={abs(src)} alt="" /> : <span>▶</span>; })()}
                    </button>
                  ) : null}
                  <span className="mv"><button aria-label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</button><button aria-label="Move down" onClick={() => move(i, 1)} disabled={i === spec.scenes.length - 1}>↓</button></span>
                </div>
                {picker === s.id ? (
                  <div className="scene-pick">
                    <p className="hint">{s.layout === 'montage' ? 'Tap to add or remove items from this montage.' : s.media.length > 1 ? 'Tap the photo or clip that should lead this scene.' : 'Tap the photo or clip for this scene.'}</p>
                    <div>{d.media.map((mm, k) => {
                      const src = isVideo(mm) ? mm.poster : mm.src;
                      return <button key={k} className={s.media.includes(k) ? 'on' : ''} onClick={() => pickFor(s.id, s.media, s.layout, k)} aria-pressed={s.media.includes(k)} aria-label={`Item ${k + 1}`}>
                        {src ? <img src={abs(src)} alt="" /> : <span>▶</span>}{s.layout === 'montage' && s.media.includes(k) ? <i>{s.media.indexOf(k) + 1}</i> : null}
                      </button>;
                    })}</div>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          {EMBED ? <button className="primary" onClick={save} disabled={!spec || busy}>Save reel to workspace</button> : null}
          <button className={EMBED ? 'secondary' : 'primary'} onClick={copy} disabled={!spec}>Copy reel spec (JSON)</button>
        </section>}
      </aside>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
