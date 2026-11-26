// Usage: serve a folder holding clip1.mp4, clip2.mp4 and sample u_*.jpg photos (MEDIA_DIR, MEDIA_HOST), then run.
// Renders frames from reels that mix photos and video clips, across every theme, to check clips play and framing applies.
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
import {plan} from '../src/engine/planner';
import {timeline} from '../src/Reel';
import {BRIEFS} from '../src/samples';
import {THEMES} from '../src/themes';
const host = process.env.MEDIA_HOST ?? 'http://localhost:8766';
const media: any[] = [
  {src: `${host}/clip1.mp4`, kind: 'video', durationSec: 4, focusX: 0.5, focusY: 0.5},
  ...fs.readdirSync(process.env.MEDIA_DIR ?? '/tmp/mt').filter((f) => /^u_.*\.jpg$/.test(f)).map((f, i) => ({src: `${host}/${f}`, focusX: 0.5, focusY: 0.4, zoom: i === 1 ? 1.8 : 1, fit: i === 2 ? 'contain' : 'cover'})),
  {src: `${host}/clip2.mp4`, kind: 'video', durationSec: 3, trimStart: 1, focusX: 0.5, focusY: 0.5},
].slice(0, 8);
const serveUrl = await bundle({entryPoint: path.resolve('src/Root.tsx'), publicDir: path.resolve('public')});
fs.mkdirSync('out/media', {recursive: true});
const only = process.argv.slice(2);
for (const t of THEMES.filter((x) => !only.length || only.includes(x.id))) {
  const spec = plan({...(BRIEFS as any).iraaya, themeId: t.id, durationSec: 15, media} as any);
  const comp = await selectComposition({serveUrl, id: 'Reel', inputProps: spec as any, browserExecutable: '/usr/bin/google-chrome'});
  const tl = timeline(spec as any);
  for (const [i, s] of tl.entries()) {
    const frame = Math.min(comp.durationInFrames - 1, s.from + Math.round(s.dur * 0.5));
    await renderStill({serveUrl, composition: comp, frame, inputProps: spec as any, output: `out/media/${t.id}__${String(i).padStart(2, '0')}.jpg`, imageFormat: 'jpeg', jpegQuality: 75, scale: 0.3, browserExecutable: '/usr/bin/google-chrome'});
  }
  console.log(t.id, spec.scenes.map((s) => `${s.kind}[${s.media}]`).join(' '));
}
