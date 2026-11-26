import React, {useMemo, useRef, useState} from 'react';
import {Thumbnail} from '@remotion/player';
import {toPng} from 'html-to-image';
import {PostSlide} from '../posts/Post';
import {planPosts} from '../posts/plan';
import {FORMAT_SIZE, type PostFormat, type PostSpec} from '../posts/schema';
import {FACES} from '../engine/fonts';
import {themeById} from '../themes';
import type {Brief} from '../engine/schema';

const LAYOUT_LABEL: Record<string, string> = {hero: 'Hero photo', cover: 'Magazine cover', split: 'Photo and story', product: 'Product card', features: 'Three reasons', statement: 'Big statement', offer: 'Offer', grid: 'Photo grid', frame: 'Gallery frame', quote: 'Quote', cta: 'Call to action'};

/** @font-face rules with the font files inlined, so a downloaded PNG uses the theme's real fonts. */
const fontCss = new Map<string, Promise<string>>();
const embedFonts = (families: string[], fontBase: string) => {
  const key = families.join('|');
  if (!fontCss.has(key)) {
    fontCss.set(key, Promise.all(FACES.filter((f) => families.includes(f.family)).map(async (f) => {
      const blob = await (await fetch(`${fontBase}/${f.file}`)).blob();
      const data = await new Promise<string>((res) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.readAsDataURL(blob); });
      return `@font-face{font-family:"${f.family}";src:url(${data}) format("woff2");font-weight:${f.weight};font-style:${f.style ?? 'normal'};}`;
    })).then((rules) => rules.join('\n')));
  }
  return fontCss.get(key)!;
};

type Props = {d: Brief; abs: (src: string) => string; fontBase: string; onSave?: (spec: PostSpec) => Promise<void>; setNote: (s: string) => void; format: PostFormat};

export const PostsPanel: React.FC<Props> = ({d, abs, fontBase, onSave, setNote, format}) => {
  const posts = useMemo(() => {
    try { return planPosts(d, format).map((p) => ({...p, media: p.media.map((m) => ({...m, src: abs(m.src)}))})); } catch { return []; }
  }, [d, format, abs]);
  const [sel, setSel] = useState(0);
  const [slide, setSlide] = useState(0);
  const [busy, setBusy] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState<{spec: PostSpec; slide: number} | null>(null);
  const cur = posts[Math.min(sel, posts.length - 1)];
  const size = FORMAT_SIZE[format];
  if (!cur) return <div className="posts-empty">Add a photo and a hook to see your posts.</div>;
  const n = cur.slides.length;
  const s = Math.min(slide, n - 1);
  const big = {w: Math.min(520, Math.round(560 * size.w / size.h)), h: 0};
  big.h = Math.round(big.w * size.h / size.w);
  const tile = 150;

  const download = async (spec: PostSpec, i: number) => {
    setExporting({spec, slide: i});
    await new Promise((r) => setTimeout(r, 60));
    // wait for images and fonts inside the export node
    const node = exportRef.current!;
    for (let k = 0; k < 40; k++) {
      const imgs = [...node.querySelectorAll('img')];
      if (imgs.length && imgs.every((im) => im.complete && im.naturalWidth > 0)) break;
      if (!imgs.length && k > 4) break;
      await new Promise((r) => setTimeout(r, 150));
    }
    const t = themeById(spec.themeId);
    const css = await embedFonts([t.fonts.display.family, t.fonts.body.family, t.fonts.label.family], fontBase);
    const url = await toPng(node.firstElementChild as HTMLElement, {width: size.w, height: size.h, pixelRatio: 1, cacheBust: true, fontEmbedCSS: css});
    const a = document.createElement('a');
    a.href = url;
    a.download = `${spec.brand.name.replace(/\W+/g, '-').toLowerCase()}-${spec.id}${spec.slides.length > 1 ? `-${i + 1}` : ''}.png`;
    document.body.appendChild(a); a.click(); a.remove();
    setExporting(null);
  };
  const downloadAll = async () => {
    setBusy(true);
    try {
      for (let i = 0; i < n; i++) { setNote(`Preparing slide ${i + 1} of ${n}…`); await download(cur, i); }
      setNote(n > 1 ? `${n} slides downloaded.` : 'Post downloaded.');
    } catch (e: any) { setNote(`Could not export: ${e.message ?? e}`); setExporting(null); } finally { setBusy(false); }
  };
  const copy = async (text: string, what: string) => {
    try { await navigator.clipboard.writeText(text); } catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    setNote(`${what} copied.`);
  };

  return (
    <div className="posts">
      <div className="posts-main">
        <div className="post-big" style={{width: big.w, height: big.h}}>
          <Thumbnail component={PostSlide as any} inputProps={{spec: cur, slide: s, fontBase} as any} compositionWidth={size.w} compositionHeight={size.h} durationInFrames={1} fps={30} frameToDisplay={0} style={{width: big.w, height: big.h}} />
        </div>
        {n > 1 ? (
          <div className="post-pager">
            <button onClick={() => setSlide(Math.max(0, s - 1))} disabled={s === 0} aria-label="Previous slide">←</button>
            <span>Slide {s + 1} of {n}</span>
            <button onClick={() => setSlide(Math.min(n - 1, s + 1))} disabled={s === n - 1} aria-label="Next slide">→</button>
          </div>
        ) : null}
        <div className="post-actions">
          <button className="primary" disabled={busy} onClick={downloadAll}>{n > 1 ? `Download ${n} slides (PNG)` : 'Download PNG'}</button>
          {onSave ? <button className="secondary" disabled={busy} onClick={async () => { setBusy(true); try { await onSave(cur); } finally { setBusy(false); } }}>Save to workspace</button> : null}
          <button className="secondary" onClick={() => copy(cur.caption ?? '', 'Caption')}>Copy caption</button>
        </div>
        <details className="post-alt"><summary>Caption and alt text</summary><p className="cap">{cur.caption}</p>{(cur.altText ?? []).map((a, i) => <p key={i} className="alt"><b>Alt text{n > 1 ? ` ${i + 1}` : ''}:</b> {a}</p>)}</details>
      </div>
      <div className="post-tiles" role="list" aria-label="Your posts">
        {posts.map((p, i) => (
          <button key={p.id} role="listitem" className={'post-tile' + (i === sel ? ' on' : '')} onClick={() => { setSel(i); setSlide(0); }} aria-label={`${p.kind === 'carousel' ? 'Carousel' : LAYOUT_LABEL[p.slides[0].layout]}`}>
            <Thumbnail component={PostSlide as any} inputProps={{spec: p, slide: 0, fontBase} as any} compositionWidth={size.w} compositionHeight={size.h} durationInFrames={1} fps={30} frameToDisplay={0} style={{width: tile, height: Math.round(tile * size.h / size.w)}} />
            <span>{p.kind === 'carousel' ? `Carousel · ${p.slides.length} slides` : LAYOUT_LABEL[p.slides[0].layout]}</span>
          </button>
        ))}
      </div>
      <div ref={exportRef} aria-hidden="true" style={{position: 'fixed', left: -20000, top: 0, width: size.w, height: size.h, pointerEvents: 'none'}}>
        {exporting ? <Thumbnail component={PostSlide as any} inputProps={{spec: exporting.spec, slide: exporting.slide, fontBase} as any} compositionWidth={size.w} compositionHeight={size.h} durationInFrames={1} fps={30} frameToDisplay={0} style={{width: size.w, height: size.h}} /> : null}
      </div>
    </div>
  );
};
