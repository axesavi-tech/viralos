import {plan} from '../src/engine/planner';
import {timeline, totalFrames} from '../src/Reel';
import {THEMES} from '../src/themes';
import {BRIEFS} from '../src/samples';
let bad=0, n=0; const notShown:string[]=[];
for (const t of THEMES) for (const d of [15,30,45,60,90] as const) for (const N of [1,2,3,5,8]) {
  const b:any = {...BRIEFS.iraaya, themeId:t.id, durationSec:d, media: Array.from({length:N},(_,i)=>({src:`p${i}.jpg`,focusX:.5,focusY:.5}))};
  const s = plan(b); n++;
  const tf = totalFrames(s); if (tf !== d*30) { bad++; console.log('dur', t.id, d, N, tf); }
  const shown = new Set(s.scenes.flatMap(x=>x.media)); if (shown.size < N) notShown.push(`${t.id} ${d}s N=${N} shown=${shown.size}`);
  const g = s.scenes.filter(x=>x.kind==='gallery'); for (const x of g) if (x.frames/x.media.length < 24) console.log('short gallery', t.id, d, N, x.frames, x.media.length);
}
console.log('plans', n, 'bad durations', bad, 'not all shown', notShown.length); console.log(notShown.slice(0,5).join('\n'));
const s = plan({...BRIEFS.iraaya, themeId:'quiet-luxury', durationSec:15, media: Array.from({length:8},(_,i)=>({src:`p${i}.jpg`,focusX:.5,focusY:.5}))} as any);
console.log(s.scenes.map(x=>`${x.id}:${x.layout}:${x.frames}:[${x.media}]`).join('  '));
