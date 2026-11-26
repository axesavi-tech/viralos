// Renders every demo brand's post set in its theme (and a story + square sample) and reports text overflow and blank images.
// Usage: npx tsx scripts/posts-qa.mts [outDir]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {BRIEFS, DEMOS} from '../src/samples';
import {planPosts} from '../src/posts/plan';
import type {PostFormat, PostSpec} from '../src/posts/schema';

const outDir = process.argv[2] ?? 'out/posts';
fs.mkdirSync(outDir, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/Root.tsx'), publicDir: path.resolve('public')});
const abs = (spec: PostSpec): PostSpec => ({...spec, media: spec.media.map((m) => ({...m, src: m.src.startsWith('http') ? m.src : `/public/${m.src}`}))});
const jobs: {name: string; spec: PostSpec; slide: number}[] = [];
for (const d of DEMOS) {
  const formats: PostFormat[] = d.themeId === 'quiet-luxury' ? ['portrait', 'square', 'story'] : ['portrait'];
  for (const f of formats) {
    const set = planPosts({...BRIEFS[d.brief], themeId: d.themeId, durationSec: d.durationSec} as any, f);
    for (const spec of set) spec.slides.forEach((_, i) => jobs.push({name: `${d.brief}__${spec.id}__${i}`, spec, slide: i}));
  }
}
const overflow = new Set<string>();
const files: string[] = [];
for (const j of jobs) {
  const inputProps = {spec: abs(j.spec), slide: j.slide};
  const comp = await selectComposition({serveUrl, id: 'Post', inputProps, browserExecutable: '/usr/bin/google-chrome'});
  const out = path.join(outDir, `${j.name}.jpg`);
  await renderStill({serveUrl, composition: comp, inputProps, output: out, imageFormat: 'jpeg', jpegQuality: 78, scale: 0.4, browserExecutable: '/usr/bin/google-chrome',
    onBrowserLog: (l) => { if (l.text.startsWith('QA_OVERFLOW')) overflow.add(`${j.name}: ${l.text.slice(12)}`); }});
  files.push(out);
}
const blank = JSON.parse(execFileSync('python3', ['scripts/blank.py', ...files]).toString());
console.log(JSON.stringify({images: files.length, overflow: [...overflow], blank}, null, 1));
