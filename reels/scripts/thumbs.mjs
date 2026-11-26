// Renders one small preview image per theme into public/themes/ (shown on the Reel Studio theme buttons).
// Usage: node scripts/thumbs.mjs <composition ids, one per theme>
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import {timeline} from './timeline.mjs';
const ids = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/Root.tsx'), publicDir: path.resolve('public')});
for (const id of ids) {
  const comp = await selectComposition({serveUrl, id, browserExecutable: '/usr/bin/google-chrome'});
  const tl = timeline(comp.props); const s = tl[Math.min(2, tl.length - 1)];
  const theme = comp.props.themeId;
  await renderStill({serveUrl, composition: comp, frame: s.from + Math.round(s.dur * 0.7), output: `public/themes/${theme}.jpg`, imageFormat: 'jpeg', jpegQuality: 72, scale: 0.16, browserExecutable: '/usr/bin/google-chrome'});
  console.log(theme);
}
