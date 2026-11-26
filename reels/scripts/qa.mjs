// Automated QA: text fit, blank frames, colour contrast. Renders a frame from every scene of every demo.
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const ids = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/Root.tsx'), publicDir: path.resolve('public')});
fs.mkdirSync('out/stills', {recursive: true});
const report = [];
for (const id of ids) {
  const overflow = new Set();
  const comp = await selectComposition({serveUrl, id, browserExecutable: '/usr/bin/google-chrome'});
  const {timeline} = await import('./timeline.mjs');
  const tl = timeline(comp.props);
  const files = [];
  for (const [i, s] of tl.entries()) {
    for (const at of [0.35, 0.8]) {
      const frame = Math.min(comp.durationInFrames - 1, s.from + Math.round(s.dur * at));
      const out = `out/stills/${id}__${String(i).padStart(2, '0')}${at === 0.8 ? 'b' : ''}.jpg`;
      await renderStill({serveUrl, composition: comp, frame, output: out, imageFormat: 'jpeg', jpegQuality: 80, scale: 0.4, browserExecutable: '/usr/bin/google-chrome',
        onBrowserLog: (l) => { if (l.text.startsWith('QA_OVERFLOW')) overflow.add(l.text.slice(12)); }});
      files.push(out);
    }
  }
  const blank = JSON.parse(execFileSync('python3', ['scripts/blank.py', ...files]).toString());
  report.push({id, scenes: tl.length, frames: files.length, overflow: [...overflow], blank});
  console.log(JSON.stringify(report[report.length - 1]));
}
fs.writeFileSync('out/qa-report.json', JSON.stringify(report, null, 2));
