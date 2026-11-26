import {plan} from '../src/engine/planner';
import {totalFrames} from '../src/Reel';
import {BRIEFS} from '../src/samples';
import {THEMES} from '../src/themes';
let bad=0,n=0;
for (const b of Object.values(BRIEFS)) for (const t of THEMES) for (const d of [15,30,45,60,90] as const) { n++; const f=totalFrames(plan({...b, themeId:t.id, durationSec:d} as any)); if (f!==d*30){bad++; console.log(t.id,d,f);} }
console.log(`${n} combos, ${bad} wrong length`);
