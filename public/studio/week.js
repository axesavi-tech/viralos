/* Kathavi "This week": the home an agency client wants. What is waiting for my approval, what goes out, what worked,
   and one tap to start something new. The brand journey stays one click away as the record of the brand's decisions. */
(()=>{const V=window.VIRALOS;if(!V)return;
const {h,q,brand,camps,items,cur,Store,VIEWS,ACT,ICON,fmtD,todayISO,addDays,FORMATS}=V;
ICON.week='M4 5h16v15H4zM4 9h16M9 3v4M15 3v4';

const isoAdd=(d,n)=>addDays(d,n);
function allItems(b){return camps(b).flatMap(c=>items(c).map(it=>({it,c})))}
function row({it,c},act){return`<li class="kw-i"><button type="button" class="kw-open" data-act="open" data-id="${it.id}" aria-label="Open ${h(it.headline||it.title||'entry')}">
 <span class="kw-f ${it.format}">${h(FORMATS[it.format]||it.format)}</span><span class="kw-t"><b>${h(it.headline||it.title||'Untitled')}</b><small>${fmtD(it.date)} · ${h(c.outcome?c.outcome.label:c.name)}${it.qa&&!it.qa.allOk?' · needs a fix':''}</small></span></button>${act||''}</li>`}

VIEWS.week=()=>{const b=brand();if(!b||(!b.genome&&!b.dna))return VIEWS.home();
 const t=todayISO(),wk=isoAdd(t,7),A=allItems(b);
 const toApprove=A.filter(x=>['Generated','Quality checked'].includes(x.it.status)&&(x.it.date||t)<=isoAdd(t,14)).sort((a,z)=>(a.it.date||'').localeCompare(z.it.date||''));
 const goingOut=A.filter(x=>['Approved','Scheduled'].includes(x.it.status)&&x.it.date>=t&&x.it.date<=wk).sort((a,z)=>a.it.date.localeCompare(z.it.date));
 const pub=A.filter(x=>['Published','Analysed','Optimised'].includes(x.it.status));const withM=pub.filter(x=>x.it.metrics&&+x.it.metrics.reach>0);
 const best=withM.slice().sort((a,z)=>(+z.it.metrics.reach||0)-(+a.it.metrics.reach||0))[0];
 const runs=[...Object.values((window.KATHAVI_GROW||{}).RUN||{}),...Object.values((window.KATHAVI_J||{}).RUN||{})].filter(r=>r&&r.phase&&!['done','error'].includes(r.phase));
 const I=b.genome&&b.genome.insights;const meta=(window.VX_PROVIDERS||{}).meta;
 const empty=!A.length;
 return V.head(`This week · ${h(b.name)}`,I&&I.headline?h(I.headline):'Your content, approvals and results in one place.',`<button class="vx-btn sm" data-go="dashboard" type="button">Brand Dashboard</button>`)+`
 ${runs.length?`<div class="vx-card kw-run" role="status"><b>Making now</b> · ${runs.length} ${runs.length>1?'jobs':'job'} running. <button class="vx-btn sm" data-go="${runs.some(r=>r.label)?'grow':'dashboard'}" type="button">See progress</button></div>`:''}
 ${empty?`<div class="vx-card kw-hero"><h2>What do you want to achieve first?</h2><p class="vx-muted">Pick a result. Kathavi plans it, researches your market and makes the content for you to approve.</p>${outcomes(true)}</div>`:''}
 <div class="kw-grid">
  <section class="vx-card"><h2>To approve <span class="kw-n">${toApprove.length}</span></h2>${toApprove.length?`<ul class="kw-list">${toApprove.slice(0,8).map(x=>row(x,`<button class="vx-btn sm pri" type="button" data-act="kwok" data-id="${x.it.id}">Approve</button>`)).join('')}</ul>${toApprove.length>8?`<button class="vx-btn sm" data-go="calendar" type="button">All ${toApprove.length} in Content</button>`:''}${toApprove.length>1?`<button class="vx-btn sm" type="button" data-act="kwokall">Approve all that pass checks</button>`:''}`:`<p class="vx-muted vx-small">${empty?'Nothing yet. Your first pack appears here.':'All caught up.'}</p>`}</section>
  <section class="vx-card"><h2>Going out this week <span class="kw-n">${goingOut.length}</span></h2>${goingOut.length?`<ul class="kw-list">${goingOut.slice(0,8).map(x=>row(x,`<button class="vx-btn sm" type="button" data-act="tostudioid" data-id="${x.it.id}">Visuals</button>`)).join('')}</ul>`:`<p class="vx-muted vx-small">Approved posts for the next 7 days show here.</p>`}
   <p class="vx-small vx-muted">${meta?'Approved posts publish at their scheduled time.':'Publishing straight to Instagram switches on once your Meta app is connected. Until then, download approved posts from Content.'}</p></section>
  <section class="vx-card"><h2>What worked</h2>${withM.length?`<div class="kw-stats"><div><b>${withM.reduce((a,x)=>a+(+x.it.metrics.reach||0),0).toLocaleString('en-IN')}</b><span>reach</span></div><div><b>${pub.length}</b><span>published</span></div></div>${best?`<p class="vx-small">Best: <b>${h(best.it.headline||'')}</b> · ${(+best.it.metrics.reach).toLocaleString('en-IN')} reach. Kathavi uses this when it plans your next posts.</p>`:''}<button class="vx-btn sm" data-go="analytics" type="button">Results</button>`
   :`<p class="vx-muted vx-small">${pub.length?'Log the numbers for your published posts and Kathavi learns what works for your brand.':'Results appear once posts are published.'}</p>${pub.length?'<button class="vx-btn sm" data-go="analytics" type="button">Log results</button>':''}`}</section>
 </div>
 ${empty?'':`<div class="vx-card"><h2>Start something new</h2>${outcomes(false)}</div>`}
 <p class="vx-small vx-muted kw-foot">Your brand: <button class="vx-linkbtn" data-go="home" type="button">Brand journey</button> · <button class="vx-linkbtn" data-go="genome" type="button">Brand Genome</button>${I&&I.readiness?` · launch readiness ${+I.readiness.score||0}/100`:''}</p>`};

function outcomes(big){const O=(window.KATHAVI_GROW||{}).OUT||[];return`<div class="kw-outs ${big?'big':''}">${O.map(o=>`<button type="button" class="kw-out" data-act="kwgrow" data-k="${o.k}"><b>${h(o.t)}</b>${big?`<span>${h(o.d)}</span>`:''}</button>`).join('')}</div>`}
ACT.kwgrow=el=>{if(window.KATHAVI_GROW&&KATHAVI_GROW.pick)KATHAVI_GROW.pick(el.dataset.k);V.go('grow')};
ACT.kwok=el=>{const it=Store.get(el.dataset.id);if(!it)return;it.status='Approved';Store.put(it);V.notify('Approved. It goes out on '+fmtD(it.date)+'.');V.rerender()};
ACT.kwokall=()=>{const b=brand();let n=0;allItems(b).forEach(({it})=>{if(['Generated','Quality checked'].includes(it.status)&&it.qa&&it.qa.allOk){it.status='Approved';Store.put(it);n++}});V.notify(n?`${n} approved. Pieces that still need a fix stay here.`:'Nothing passes every check yet: open a piece to fix it.');V.rerender()};
ACT.tostudioid=el=>{const it=Store.get(el.dataset.id);if(it){cur.vid=it.id;V.toStudio(it)}};
})();
