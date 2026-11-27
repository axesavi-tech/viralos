/* Kathavi Grow: start from the result you want, not from a tool.
   Pick an outcome, add one line if you like, and the specialists produce the whole pack: strategy, live market research,
   creative direction, and a finished, quality-checked content calendar. The studios stay available for fine-tuning. */
(()=>{const V=window.VIRALOS;if(!V)return;
const {q,h,brand,go,rerender,notify,VIEWS,ACT,FORM,ICON,Store}=V;
ICON.grow='M4 19l5-6 4 3 7-9M15 7h5v5';

/* outcome → plan. The mix and duration are where each outcome's results usually come from; the owner can adjust before starting. */
const OUT=[
 {k:'launch',t:'Launch a product',d:'Build anticipation, reveal it, and convert the first buyers.',obj:'Product launch',days:15,mix:{reel:5,post:4,carousel:2,story:6,short:0},ask:'What are you launching, and when?',ph:'e.g. Our new Tussar silk collection, launching on 5 December'},
 {k:'sales',t:'Sell more this month',d:'Turn attention into orders with proof, offers and urgency.',obj:'Sales conversion',days:30,mix:{reel:8,post:6,carousel:3,story:10,short:0},ask:'Anything to push? (optional)',ph:'e.g. Bestsellers, gifting, free shipping above ₹2,999'},
 {k:'followers',t:'Grow followers',d:'Reels and shareable posts that reach new people and make them follow.',obj:'Brand awareness',days:30,mix:{reel:12,post:6,carousel:4,story:8,short:0},ask:'Who do you want to reach? (optional)',ph:'e.g. Working women in Pune and Bengaluru'},
 {k:'festive',t:'Festive or seasonal campaign',d:'Own a moment people already buy for.',obj:'Festive campaign',days:15,mix:{reel:6,post:5,carousel:2,story:8,short:0},ask:'Which festival or season?',ph:'e.g. Wedding season, Diwali, Durga Puja'},
 {k:'offer',t:'Announce an offer',d:'A short, sharp burst that makes the offer impossible to miss.',obj:'Clearance campaign',days:7,mix:{reel:3,post:3,carousel:1,story:6,short:0},ask:'What is the offer?',ph:'e.g. 20% off the summer edit until Sunday'},
 {k:'trust',t:'Build trust',d:'Show the proof: craft, reviews, people and process.',obj:'Educational campaign',days:30,mix:{reel:6,post:4,carousel:6,story:6,short:0},ask:'What should people believe? (optional)',ph:'e.g. Every saree is handwoven and traceable to its weaver'},
 {k:'leads',t:'Get enquiries',d:'Make people message, call or book.',obj:'Lead generation',days:15,mix:{reel:5,post:4,carousel:3,story:6,short:0},ask:'Where should enquiries go?',ph:'e.g. WhatsApp, a booking link, a store visit'},
 {k:'winback',t:'Win back past customers',d:'Bring people who bought before back for the next one.',obj:'Customer retention',days:15,mix:{reel:3,post:4,carousel:2,story:6,short:0},ask:'Anything new for them? (optional)',ph:'e.g. New arrivals, early access, a thank-you offer'}];
const RUN={};const st={pick:null};
const rate=k=>V.rate(k);
const sum=m=>Object.values(m).reduce((a,n)=>a+(+n||0),0);
const PL={reel:['reel','reels'],post:['post','posts'],carousel:['carousel','carousels'],story:['story','stories'],short:['Short','Shorts']};
const mixText=m=>Object.entries(m).filter(([,n])=>n>0).map(([k,n])=>`${n} ${(PL[k]||[k,k+'s'])[n>1?1:0]}`).join(' · ');
const cost=m=>rate('strategy')+(rate('research')||25)+rate('directions')+rate('journey')+Math.ceil(sum(m)/5)*rate('calendar')+Math.min(6,Math.ceil(sum(m)/4))*rate('fix');
const STEPS=[['strategy','Strategy'],['research','Live market research'],['directions','Creative directions'],['pick','Choosing the best direction'],['write','Writing the content'],['polish','Quality pass'],['done','Ready']];
function channelsFor(b){const g=b&&b.genome&&b.genome.f||{};const t=JSON.stringify((g['gtm.channels']||{}).value||'')+' '+JSON.stringify((b&&b.channels)||'');/* whole words only, and 'X' only as a capital on its own (it matched any letter x before) */
 const ch=V.CHANNELS.filter(c=>c==='X'?/(^|[^A-Za-z])X([^A-Za-z]|$)|Twitter/.test(t):new RegExp('\\b'+c.split(' ')[0]+'\\b','i').test(t));return ch.length?ch.slice(0,3):['Instagram']}

VIEWS.grow=()=>{const b=brand();if(!b)return V.head('Grow','Start from the result you want.')+V.needBrand();
 const runs=Object.values(RUN).filter(r=>r.brand===b.id&&r.phase!=='done'&&r.phase!=='error');
 const packs=V.camps(b).filter(c=>c.outcome);
 return V.head('What do you want to achieve?',`Pick a result. ${h(b.name)}'s specialists plan and make everything for it, using your Brand Genome and live market research.`)
 +`${runs.map(progress).join('')}
 <div class="ko-grid" role="list">${OUT.map(o=>`<button class="ko-card ${st.pick===o.k?'on':''}" role="listitem" type="button" data-act="kopick" data-k="${o.k}" aria-expanded="${st.pick===o.k}"><b>${h(o.t)}</b><span>${h(o.d)}</span><small>${o.days} days · ${h(mixText(o.mix))}</small></button>`).join('')}</div>
 ${st.pick?form(b,OUT.find(o=>o.k===st.pick)):''}
 ${packs.length?`<div class="vx-card"><h2>Your outcome packs</h2><div class="ko-packs">${packs.map(packRow).join('')}</div></div>`:''}`};

function form(b,o){const w=st.w&&st.w.k===o.k?st.w:(st.w={k:o.k,brief:'',start:V.addDays(V.todayISO(),1),days:o.days,mix:{...o.mix},channels:channelsFor(b)});
 return`<form class="vx-card ko-form" data-form="kostart"><h2>${h(o.t)}</h2>
 <div class="vx-f"><label for="ko-brief">${h(o.ask)}</label><input type="text" id="ko-brief" name="brief" value="${h(w.brief)}" placeholder="${h(o.ph)}" ${/optional/.test(o.ask)?'':'required'}></div>
 <p class="ko-get"><b>You get</b> ${o.days}-day plan · ${h(mixText(w.mix))} · captions, hooks and hashtags · each piece quality-checked · on ${h(w.channels.join(', '))}</p>
 <details class="ko-adj"><summary>Adjust the plan</summary><div class="vx-fields">
  <div class="vx-f"><label for="ko-start">Start</label><input type="date" id="ko-start" name="start" value="${h(w.start)}"></div>
  <div class="vx-f"><label for="ko-days">Days</label><input type="number" id="ko-days" name="days" min="3" max="90" value="${w.days}"></div>
  ${Object.keys(V.FORMATS).map(k=>`<div class="vx-f"><label for="ko-m-${k}">${V.FORMATS[k]}s</label><input type="number" id="ko-m-${k}" name="mix_${k}" min="0" max="40" value="${+w.mix[k]||0}"></div>`).join('')}</div>
  <div class="vx-f"><span class="vx-lab">Channels</span><div class="vx-row">${V.CHANNELS.map(c=>`<label class="vx-tog"><input type="checkbox" name="ch" value="${c}" ${w.channels.includes(c)?'checked':''}> ${c}</label>`).join('')}</div></div></details>
 <div class="vx-row"><button class="vx-btn pri" type="submit">Make it <span class="ko-cost">· about ${Math.max(3,Math.round(sum(w.mix)/15)+4)} minutes · ${cost(w.mix)} credits</span></button><span class="vx-small vx-muted">You can review, change or regenerate every piece before anything is published.</span></div>
 <span class="vx-status" id="koSt"></span></form>`}

function progress(r){const i=STEPS.findIndex(s=>s[0]===r.phase);return`<div class="vx-card ko-run" role="status" aria-live="polite"><div class="ko-run-h"><b>${h(r.label)}</b><span>${r.phase==='write'&&r.total?`${r.n} of ${r.total} pieces`:r.phase==='polish'&&r.total?`fixing ${r.n} of ${r.total}`:''}</span></div>
 <ol class="ko-steps">${STEPS.map((s,j)=>`<li class="${j<i?'ok':j===i?'now':''}">${s[1]}</li>`).join('')}</ol>${r.note?`<p class="vx-small vx-muted">${h(r.note)}</p>`:''}</div>`}
function packRow(c){const its=V.items(c),ok=its.filter(i=>i.qa&&i.qa.allOk).length,r=RUN[c.id];const err=r&&r.phase==='error';
 return`<div class="ko-pack"><div><b>${h(c.outcome.label)}</b><span class="vx-small vx-muted">${h(c.name)} · ${its.length} pieces${its.length?`, ${ok} pass every check`:''}${c.outcome.brief?' · '+h(c.outcome.brief):''}</span>${err?`<span class="vx-small" style="color:var(--vx-bad,#b3261e)">Stopped: ${h(r.err)}</span>`:''}</div>
 <div class="vx-row">${err||(!its.length&&!(r&&r.phase!=='done'))?`<button class="vx-btn sm pri" data-act="koresume" data-c="${c.id}" type="button">${err?'Continue':'Finish making it'}</button>`:''}${its.length?`<button class="vx-btn sm pri" data-act="koopen" data-c="${c.id}" data-v="calendar" type="button">Review content</button><button class="vx-btn sm" data-act="koopen" data-c="${c.id}" data-v="studio" type="button">Make the visuals</button>`:''}<button class="vx-btn sm" data-act="koopen" data-c="${c.id}" data-v="campaigns" type="button">Strategy</button></div></div>`}

ACT.kopick=el=>{st.pick=st.pick===el.dataset.k?null:el.dataset.k;rerender();if(st.pick){const f=q('#ko-brief');f&&f.focus()}};
ACT.koopen=el=>{const c=Store.get(el.dataset.c);if(!c)return;V.setCamp(c);go(el.dataset.v)};
ACT.koresume=el=>{const c=Store.get(el.dataset.c);if(c)make(c)};
FORM.kostart=f=>{const b=brand(),o=OUT.find(x=>x.k===st.pick),fd=new FormData(f),w=st.w;
 w.brief=String(fd.get('brief')||'').trim();w.start=fd.get('start')||w.start;w.days=Math.max(3,Math.min(90,+fd.get('days')||o.days));Object.keys(V.FORMATS).forEach(k=>w.mix[k]=Math.max(0,Math.min(40,+fd.get('mix_'+k)||0)));w.channels=fd.getAll('ch');if(!w.channels.length)w.channels=['Instagram'];
 if(!sum(w.mix)){q('#koSt').textContent='Add at least one piece of content.';return}
 const need=cost(w.mix);if(window.VX_BAL!=null&&window.VX_BAL<need){q('#koSt').textContent=`This needs about ${need} credits and you have ${window.VX_BAL}. Top up in Settings → Billing.`;return}
 const c={id:'c_'+V.id6(),type:'campaign',brandId:b.id,created:Date.now(),name:`${b.name} · ${o.t}`,objective:o.obj,duration:w.days,start:w.start,channels:w.channels,mix:{...w.mix},notes:w.brief?`${o.t}: ${w.brief}`:o.t,language:'English',reelLen:'mixed',dir:null,outcome:{key:o.k,label:o.t,brief:w.brief,at:Date.now()}};
 Store.put(c);V.setCamp(c);st.pick=null;st.w=null;make(c)};

/* the production line: each step saves its result on the campaign, so a stopped run continues where it left off */
async function make(c){const b=Store.get(c.brandId)||brand();if(RUN[c.id]&&!['done','error'].includes(RUN[c.id].phase))return;
 const r=RUN[c.id]={brand:b.id,label:c.outcome?c.outcome.label:c.name,phase:'strategy',n:0,total:0};const paint=()=>{if(V.cur.view==='grow')rerender()};paint();
 try{
  if(!c.strategy){await V.genStrategy(c,b)}
  r.phase='research';paint();if(!c.intel){try{await liveIntel(c,b)}catch(e){r.note='Live research was not available; the plan uses the brand and strategy instead.';await V.genIntel(c,b)}}
  r.phase='directions';paint();if(!c.directions||!c.directions.length)await V.genDirections(c,b);
  r.phase='pick';paint();if(c.dir==null){c.dir=await pickDirection(c,b);Store.put(c)}
  r.phase='write';const miss=()=>V.slotPlan(c).filter(s=>!Store.get('i_'+c.id.slice(2)+'_'+s.n));r.total=V.slotPlan(c).length;r.n=r.total-miss().length;paint();
  const todo=miss(),batches=[];for(let i=0;i<todo.length;i+=5)batches.push(todo.slice(i,i+5));
  await V.pool(batches,3,async sl=>{const got=await V.genBatch(c,b,sl);
   sl.forEach(s=>{const x=(got||[]).find(g=>+g.n===s.n);if(!x)return;const it=V.mkItem(c,s,x);it.status='Generated';V.runQA(it);Store.put(it)});r.n=r.total-miss().length;paint()});
  /* quality pass: sign every caption with the brand (the most common miss), then let the editor fix what still fails, a few at a time */
  r.phase='polish';paint();const sign=b.handle?'@'+String(b.handle).replace(/^@/,''):b.name;
  V.items(c).forEach(it=>{const miss=(it.qa&&it.qa.checks||[]).some(x=>!x.ok&&/Brand name or handle/.test(x.label));if(miss&&it.caption!=null){it.caption=String(it.caption||'').trimEnd()+`\n\n— ${sign}`;V.runQA(it);Store.put(it)}});
  const bad=V.items(c).filter(it=>it.qa&&!it.qa.allOk).slice(0,6);r.total=bad.length;r.n=0;await V.pool(bad,3,async it=>{try{await V.fixItem(it,'fix')}catch(e){}r.n++;paint()});
  r.phase='done';notify(`${r.label}: ${V.items(c).length} pieces ready to review.`)}
 catch(e){r.phase='error';r.err=V.errText(e)}
 paint()}

async function liveIntel(c,b){const X=window.VX;if(!X)throw new Error('no research');
 const r=await X.api('/api/research',{json:{brief:`${V.brandBrief(b)}\nCampaign: ${c.name} — ${c.objective}, ${c.duration} days from ${c.start}, channels ${c.channels.join(', ')}. ${c.notes||''} Market: India first.`}});
 const j=r.job?await X.job(r.job):{status:'done',result:r};if(j.status!=='done')throw new Error(j.error||'research failed');
 const t=String(j.result.text||'').replace(/<\/?cite\b[^>]*>/gi,'');const a=t.indexOf('{'),z=t.lastIndexOf('}');const v=JSON.parse(t.slice(a,z+1));
 const src0=j.result.sources||[];const src=src0.length?src0:[...new Map((v.sections||[]).flatMap(s=>(s.points||[]).map(p=>p.source)).concat((v.trends||[]).map(t=>t.source)).filter(u=>/^https:\/\//.test(u||'')).map(u=>[u,{url:u,title:u.replace(/^https:\/\/(www\.)?/,'').split('/')[0]}])).values()];const cited=new Set(src.map(x=>x.url));(v.sections||[]).forEach(s=>(s.points||[]).forEach(p=>{if(p.label==='verified'&&!(p.source&&(cited.has(p.source)||/^https:\/\//.test(p.source))))p.label='hypothesis'}));
 c.intel={sections:v.sections,trends:v.trends,sources:src,searches:j.result.searches||0,live:true,at:Date.now()};Store.put(c)}
async function pickDirection(c,b){const D=c.directions||[];if(D.length<2)return 0;
 try{const v=await V.askJSON('journey',`You are Kathavi's Creative Director. The owner wants this result: ${c.outcome?c.outcome.label:c.objective}${c.outcome&&c.outcome.brief?' ('+c.outcome.brief+')':''}.
Brand: ${b.name}. Proposition: ${c.strategy&&c.strategy.proposition||''}
Pick the ONE creative direction most likely to get that result for this brand, considering the audience and channels (${c.channels.join(', ')}).
${D.map((d,i)=>`${i}. ${d.name} — ${d.style}: ${d.rationale}`).join('\n')}
Return ONLY JSON: {"pick":0,"why":"one sentence"}`,{tier:'quick'});const n=Math.max(0,Math.min(D.length-1,+v.pick||0));c.dirWhy=String(v.why||'').slice(0,240);return n}catch(e){return 0}}

/* Today and the brand dashboard point to the outcome hub */
/* leaving the page stops a run part-way (the step in progress is lost): ask first */
addEventListener('beforeunload',e=>{if(Object.values(RUN).some(r=>!['done','error'].includes(r.phase))){e.preventDefault();e.returnValue=''}});
window.KATHAVI_GROW={OUT,make,RUN};
})();
