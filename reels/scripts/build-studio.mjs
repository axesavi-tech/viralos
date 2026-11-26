// Builds the Reel Studio page into the Kathavi app at public/studio/reels/ (served at /studio/reels/index.html).
import {build} from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const here = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.resolve(here, '../public/studio/reels');
fs.rmSync(out, {recursive: true, force: true});
fs.mkdirSync(out, {recursive: true});

await build({
  entryPoints: [path.join(here, 'src/studio/main.tsx')],
  bundle: true, minify: true, format: 'iife', jsx: 'automatic', target: 'es2020',
  define: {'process.env.NODE_ENV': '"production"'},
  outfile: path.join(out, 'app.js'), logLevel: 'warning',
});
const v = Date.now().toString(36);
const shell = fs.readFileSync(path.join(here, 'src/studio/shell.html'), 'utf8').replace('<script>/*APP*/</script>', `<script src="app.js?v=${v}"></script>`);
fs.writeFileSync(path.join(out, 'index.html'), shell);
for (const dir of ['fonts', 'samples', 'themes']) fs.cpSync(path.join(here, 'public', dir), path.join(out, dir), {recursive: true});
console.log('Reel Studio built into', path.relative(process.cwd(), out));
