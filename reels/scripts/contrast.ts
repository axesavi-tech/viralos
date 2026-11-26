import {THEMES} from '../src/themes';
import {contrast} from '../src/engine/color';
import {BRIEFS} from '../src/samples';
let fails = 0, checks = 0;
for (const [k, b] of Object.entries(BRIEFS)) for (const t of THEMES) {
  const p = t.palette(b.brand);
  const pairs: [string, string, string, number][] = [['ink/bg', p.ink, p.bg, 4.5], ['muted/bg', p.muted, p.bg, 3], ['inkOnSurface/surface', p.inkOnSurface, p.surface, 4.5], ['onAccent/accent', p.onAccent, p.accent, 4.5]];
  for (const [n, a, c, min] of pairs) { checks++; const r = contrast(a, c); if (r < min) { fails++; console.log(`FAIL ${k} × ${t.id} ${n} ${r.toFixed(2)} < ${min}`); } }
}
console.log(`contrast checks: ${checks}, failures: ${fails}`);
