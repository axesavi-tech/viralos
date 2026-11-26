// Render stills at the midpoint of every scene of every demo, for visual QA.
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const ids = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/Root.tsx'), publicDir: path.resolve('public')});
for (const id of ids) {
  const comp = await selectComposition({serveUrl, id, browserExecutable: '/usr/bin/google-chrome'});
  const {timeline} = await import('./timeline.mjs');
  const tl = timeline(comp.props);
  let i = 0;
  for (const s of tl) {
    const frame = Math.min(comp.durationInFrames - 1, s.from + Math.round(s.dur * 0.62));
    await renderStill({serveUrl, composition: comp, frame, output: `out/stills/${id}__${String(i).padStart(2,'0')}.jpg`, imageFormat: 'jpeg', jpegQuality: 80, scale: 0.4, browserExecutable: '/usr/bin/google-chrome', chromiumOptions: {gl: 'swangle'}});
    i++;
  }
  console.log('done', id, tl.length);
}
