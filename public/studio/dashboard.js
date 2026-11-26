/* Kathavi — Brand Dashboard.
 * The whole brand on one page: thesis, signature insight, strength, positioning, audiences, identity, voice,
 * content, launch, risks, proof and the 90-day plan. Every mark is clickable: a panel explains the logic
 * (who decided, why, what it rests on, what else was considered, sources) and lets the owner change it.
 * A change re-runs everything that depends on it, then the dashboard redraws.
 */
(()=>{const V=window.VIRALOS,J=window.KATHAVI_J;if(!V||!J)return;
const {q,h,brand,go,rerender,notify,VIEWS,ACT,ICON}=V;
const {STAGES,ALL_D,SPEC,G,valOf,show,THEME_NAME,RUN}=J;

/* ---------- helpers ---------- */
/* a decision written before the name was chosen can say "[Brand]": show the brand's name instead */
const nameIn=(b,v)=>typeof v==='string'?v.replace(/\[(?:brand|brand name|name|your brand)\]/gi,b.name&&b.name!=='New brand'?b.name:'the brand'):Array.isArray(v)?v.map(x=>nameIn(b,x)):v;
const val=(b,k)=>nameIn(b,valOf(b,k));
const fld=k=>{const [d,f]=k.split('.');const D=ALL_D.find(x=>x.id===d);return D&&{d:D,f:D.F.find(x=>x.k===f)}};
const arr=v=>Array.isArray(v)?v:v?[v]:[];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const pct=t=>{const out=[];String(t||'').replace(/([A-Za-z][^%,;:()]*?)\s*[:\-–]?\s*(\d{1,3})\s*%/g,(_,n,p)=>{out.push({n:n.trim().replace(/^(and|&)\s+/i,''),p:+p})});return out.filter(x=>x.p>0&&x.p<=100)};
const split2=s=>{const m=String(s).match(/^(.*?)\s+[—–-]\s+(.*)$/);return m?[m[1],m[2]]:[s,'']};
const hexRgb=x=>{const n=parseInt(String(x).slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255]};
const lum=x=>{const c=hexRgb(x).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const contrast=(a,b)=>{const A=lum(a),B=lum(b);return(Math.max(A,B)+.05)/(Math.min(A,B)+.05)};
const KX={};let kxN=0;
/* register something explainable; returns the attribute to put on the element */
const kx=o=>{const id='k'+(++kxN);KX[id]=o;return`data-kx="${id}" tabindex="0" role="button"`};
const fieldX=(b,key,extra={})=>{const F=fld(key);const s=G(b).f[key]||{};return kx({title:F?F.f.l:key,key,stage:F&&F.d.stage.key,sp:s.sp||(F&&F.d.sp),value:F?show(F.f,s.value):'',why:s.why,alts:(s.alts||[]).map(a=>F?show(F.f,a):String(a)),by:s.by,auto:s.auto,...extra})};
function brandColors(b){const p=val(b,'identity.palette')||[];const role=r=>(p.find(c=>new RegExp(r,'i').test(c.role||''))||{}).hex;
 const prim=role('primary')||(p[0]||{}).hex||b.colors?.primary||'#2B1B3D',acc=role('accent|secondary')||(p[1]||{}).hex||b.colors?.secondary||'#C8A97E',
  light=role('light|background')||b.colors?.light||'#F5F1EA',dark=role('dark|text')||'#17131C';return{prim,acc,light,dark,p}}

/* ---------- small charts (SVG, drawn by hand so each mark can be clicked) ---------- */
function gauge(v,label,attrs,col){const r=46,c=2*Math.PI*r,a=clamp(v,0,100)/100;return`<figure class="kd-gauge" ${attrs}>
 <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--vx-soft)" stroke-width="10"/>
 <circle cx="60" cy="60" r="${r}" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c*a} ${c}" transform="rotate(-90 60 60)" class="kd-arc"/></svg>
 <b>${Math.round(v)}</b><figcaption>${h(label)}</figcaption></figure>`}
function radar(items,col){const n=items.length;if(n<3)return'';const C=170,R=118;const pt=(i,v)=>{const a=-Math.PI/2+i*2*Math.PI/n;return[C+Math.cos(a)*R*v,C+Math.sin(a)*R*v]};
 const ring=k=>items.map((_,i)=>pt(i,k).join(',')).join(' ');const poly=items.map((x,i)=>pt(i,clamp(x.score,0,100)/100).join(',')).join(' ');
 return`<svg viewBox="0 0 340 340" class="kd-radar" role="img" aria-label="Brand strength by dimension">
 ${[.25,.5,.75,1].map(k=>`<polygon points="${ring(k)}" fill="none" stroke="var(--vx-line)"/>`).join('')}
 ${items.map((_,i)=>{const[x,y]=pt(i,1);return`<line x1="${C}" y1="${C}" x2="${x}" y2="${y}" stroke="var(--vx-line)"/>`}).join('')}
 <polygon points="${poly}" fill="${col}" fill-opacity=".18" stroke="${col}" stroke-width="2.5" class="kd-poly"/>
 ${items.map((x,i)=>{const[px,py]=pt(i,clamp(x.score,0,100)/100);const[lx,ly]=pt(i,1.17);return`<g ${x.attrs}><circle cx="${px}" cy="${py}" r="7" fill="${col}" stroke="var(--vx-panel)" stroke-width="2"/>
  <text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" class="kd-ax">${h(x.dimension)}</text><text x="${lx}" y="${ly+14}" text-anchor="middle" class="kd-axv">${Math.round(x.score)}</text></g>`}).join('')}</svg>`}
function posMap(m,b,col){if(!m||!m.points)return'<p class="vx-muted">No map yet.</p>';const W=560,H=400,P=46;const X=v=>P+clamp(v,0,100)/100*(W-2*P),Y=v=>H-P-clamp(v,0,100)/100*(H-2*P);
 return`<svg viewBox="0 0 ${W} ${H}" class="kd-map" role="img" aria-label="Positioning map">
 <rect x="${P}" y="${P}" width="${W-2*P}" height="${H-2*P}" fill="none" stroke="var(--vx-line)"/>
 <line x1="${W/2}" y1="${P}" x2="${W/2}" y2="${H-P}" stroke="var(--vx-line)" stroke-dasharray="4 4"/><line x1="${P}" y1="${H/2}" x2="${W-P}" y2="${H/2}" stroke="var(--vx-line)" stroke-dasharray="4 4"/>
 <text x="${P}" y="${H-P+20}" class="kd-ax">${h(m.x.low||'')}</text><text x="${W-P}" y="${H-P+20}" text-anchor="end" class="kd-ax">${h(m.x.high||'')}</text>
 <text x="${W/2}" y="${H-8}" text-anchor="middle" class="kd-axl">${h(m.x.label||'')} →</text>
 <text x="${P+8}" y="${P+16}" class="kd-ax">↑ ${h(m.y.high||'')}</text><text x="${P+8}" y="${H-P-8}" class="kd-ax">↓ ${h(m.y.low||'')}</text>
 <text x="14" y="${H/2}" text-anchor="middle" class="kd-axl" transform="rotate(-90 14 ${H/2})">${h(m.y.label||'')} →</text>
 ${m.points.map(p=>{const x=X(+p.x||0),y=Y(+p.y||0),k=p.kind;const a=kx({title:p.name,value:k==='brand'?'Your position':k==='gap'?'Open space no one owns':'Competitor (from the research)',why:p.why,sp:'architect',extra:`${m.x.label}: ${p.x}/100 · ${m.y.label}: ${p.y}/100`,stage:k==='brand'?'define':'discover',insight:'map'});
  const me=m.points.find(q=>q.kind==='brand');const near=me&&Math.abs(X(+me.x)-x)<90&&Math.abs(Y(+me.y)-y)<60;const ly=near&&Y(+me.y)>y?y-34:y+42;
  return k==='gap'?`<g ${a}><circle cx="${x}" cy="${y}" r="26" fill="${col}" fill-opacity=".1" stroke="${col}" stroke-dasharray="4 3"/><text x="${x}" y="${ly}" text-anchor="middle" class="kd-pl kd-gapl">${h(p.name)}</text></g>`
   :k==='brand'?`<g ${a}><circle cx="${x}" cy="${y}" r="16" fill="${col}" fill-opacity=".18" class="kd-pulse"/><circle cx="${x}" cy="${y}" r="8" fill="${col}"/><text x="${x<P+70?x-14:x>W-P-70?x+14:x}" y="${y<P+44?y+34:y-16}" text-anchor="${x<P+70?'start':x>W-P-70?'end':'middle'}" class="kd-pl kd-me">${h(p.name||b.name)}</text></g>`
   :`<g ${a}><circle cx="${x}" cy="${y}" r="6" fill="var(--vx-mute)"/><text x="${x+10}" y="${y+4}" class="kd-pl">${h(p.name)}</text></g>`}).join('')}</svg>`}
function riskGrid(risks,col){const cell=56,P=34;const g=[];for(let l=1;l<=5;l++)for(let i=1;i<=5;i++){const heat=(l*i)/25;g.push(`<rect x="${P+(i-1)*cell}" y="${P+(5-l)*cell}" width="${cell-3}" height="${cell-3}" rx="6" fill="${col}" fill-opacity="${.04+heat*.32}"/>`)}
 const dots=risks.map((r,n)=>{const i=clamp(+r.impact||1,1,5),l=clamp(+r.likelihood||1,1,5);const sameCell=x=>clamp(+x.impact||1,1,5)===i&&clamp(+x.likelihood||1,1,5)===l;const same=risks.slice(0,n).filter(sameCell).length,k=risks.filter(sameCell).length;
  /* risks sharing a cell sit side by side (two rows when there are more than three) instead of on top of each other */
  const row=k>3?Math.floor(same/Math.ceil(k/2)):0,colN=k>3?Math.ceil(k/2):k,ci=k>3?same%colN:same,rad=k>2?9:11,dx=(ci-(colN-1)/2)*(rad*2+2),dy=k>3?(row-.5)*(rad*2+2):0;
  return`<g ${kx({title:r.risk,value:`Likelihood ${l}/5 · impact ${i}/5`,why:r.mitigation?'Mitigation: '+r.mitigation:'',sp:'quality',stage:'learn',insight:'risk'})}><circle cx="${P+(i-.5)*cell+dx}" cy="${P+(5-l+.5)*cell+dy}" r="${rad}" fill="var(--vx-ink)"/><text x="${P+(i-.5)*cell+dx}" y="${P+(5-l+.5)*cell+dy+4}" text-anchor="middle" class="kd-rn">${n+1}</text></g>`}).join('');
 return`<svg viewBox="0 0 ${P+5*cell+10} ${P+5*cell+30}" class="kd-risk" role="img" aria-label="Risk matrix">${g.join('')}${dots}
 <text x="${P}" y="${P+5*cell+22}" class="kd-ax">Impact →</text><text x="12" y="${P+5*cell}" class="kd-ax" transform="rotate(-90 12 ${P+5*cell})">Likelihood →</text></svg>`}
function donut(parts,cols){const tot=parts.reduce((a,x)=>a+x.v,0)||1;let acc=0;const r=70,c=2*Math.PI*r;
 return`<svg viewBox="0 0 200 200" class="kd-donut" aria-hidden="true">${parts.map((x,i)=>{const len=c*x.v/tot;const s=`<circle cx="100" cy="100" r="${r}" fill="none" stroke="${cols[i%cols.length]}" stroke-width="26" stroke-dasharray="${len-2} ${c}" stroke-dashoffset="${-acc}" transform="rotate(-90 100 100)" ${x.attrs||''}/>`;acc+=len;return s}).join('')}</svg>`}

/* ---------- the dashboard ---------- */
function building(b,R){const st=R.stage?STAGES.find(s=>s.key===R.stage):null;const pct=Math.round(100*(R.phase==='research'?.04:R.phase==='insights'?.96:R.phase==='done'?1:.06+.88*R.done/Math.max(1,R.total)));
 const sp=R.phase==='research'?['market']:R.phase==='insights'?['architect']:st?[...new Set(st.D.map(d=>d.sp))]:[];
 return`<section class="kd-build"><div class="kd-orbit" aria-hidden="true">${Object.keys(SPEC).map((k,i)=>`<span style="--i:${i};--c:${SPEC[k].c}" class="${sp.includes(k)?'on':''}">${SPEC[k].i}</span>`).join('')}<b>${pct}%</b></div>
 <div><small>Building ${h(b.name)}</small><h2>${R.phase==='research'?'Researching your market live on the web':R.phase==='insights'?'The Chief Brand Architect is writing your insights':st?`${st.n}. ${st.name}: ${h(st.q)}`:'Preparing'}</h2>
 <p class="vx-muted">${sp.map(k=>h(SPEC[k].n)).join(' · ')}${R.last?` · <span class="kd-warn">${h(R.last)}</span>`:''}</p>
 <ol class="kd-steps">${STAGES.map(s=>{const doneS=STAGES.indexOf(s)<STAGES.findIndex(x=>x.key===R.stage)||R.phase==='insights';return`<li class="${s.key===R.stage?'on':doneS?'done':''}">${s.name}</li>`}).join('')}<li class="${R.phase==='insights'?'on':''}">Insights</li></ol></div></section>`}

VIEWS.dashboard=()=>{const b=brand();if(!b)return V.VIEWS.home();for(const k in KX)delete KX[k];kxN=0;
 const g=G(b),I=g.insights||{},R=RUN[b.id],col=brandColors(b),running=R&&!['done','error'].includes(R.phase);
 if(!I.headline&&!running)return V.head(`<span class="jx-kicker">${h(b.name)}</span>Brand Dashboard`,'Your whole brand on one page, with the reasoning behind every point.')+`
  <div class="vx-card kd-empty"><h2>Build the dashboard</h2><p>The specialists research your market live, decide every stage (keeping anything you already wrote), and the Chief Brand Architect writes the insights. About 5 minutes.</p>
  <button class="vx-btn pri" data-act="kdbuild" type="button">Build my brand dashboard</button>${R&&R.phase==='error'?`<p class="kd-warn">Last attempt stopped: ${h(R.last||'')}</p>`:''}</div>`;
 const dec=ALL_D.reduce((a,d)=>a+d.F.filter(f=>valOf(b,d.id+'.'+f.k)!=null).length,0),tot=ALL_D.reduce((a,d)=>a+d.F.length,0);
 const yours=Object.values(g.f).filter(s=>s.by==='you'&&(s.status==='edited'||s.status==='accepted')).length;
 const str=(I.strength||[]).map(x=>({...x,score:+x.score||0}));const strAvg=str.length?str.reduce((a,x)=>a+x.score,0)/str.length:0;
 const tag=val(b,'naming.tagline'),stmt=val(b,'positioning.statement');
 const style=`--kp:${col.prim};--ka:${col.acc};--kl:${col.light};--kd:${col.dark}`;
 return`<div class="kd" style="${style}">
 ${running?building(b,R):''}
 ${!running&&I.at&&Object.values(g.f).some(x=>x&&x.at&&x.at>I.at+2000)?`<div class="kd-stale" role="status"><span>Some decisions changed after these insights were written${R&&R.phase==='decide'?'':' (an update may have stopped when a page closed)'}.</span><button class="vx-btn sm pri" data-act="kdinsights" type="button">Update the insights</button></div>`:''}
 <header class="kd-hero">
  <div class="kd-id"><small>${h(g.type?g.type[0].toUpperCase()+g.type.slice(1)+' brand':'Brand')} · Brand Dashboard</small>
   <h1 ${fieldX(b,'naming.name')}>${h(b.name)}</h1>${tag?`<p class="kd-tag" ${fieldX(b,'naming.tagline')}>${h(tag)}</p>`:''}
   ${I.headline?`<p class="kd-thesis" ${kx({title:'Brand thesis',value:I.headline,why:(I.why||{}).headline,sp:'architect',stage:'define',insight:'headline'})}>${h(I.headline)}</p>`:''}
   <div class="kd-strip">${col.p.map(c=>`<i style="background:${c.hex}" ${fieldX(b,'identity.palette')} title="${h(c.hex+' '+(c.role||''))}"></i>`).join('')}</div>
   <div class="vx-row kd-actions"><button class="vx-btn sm" data-act="kdfeedback" type="button" ${running?'disabled title="Wait for the build to finish"':''}>Give feedback</button><button class="vx-btn sm" data-act="kdrebuild" type="button" ${running?'disabled':''}>Rebuild everything</button><button class="vx-btn sm" data-go="genome" type="button">Brand Genome</button></div></div>
  <div class="kd-kpis">
   ${gauge(strAvg,'Brand strength',kx({title:'Brand strength',value:`${Math.round(strAvg)}/100, the average of 7 dimensions`,why:'Scored by the Chief Brand Architect from every decision and the research. Open the dimensions below to see each reason.',sp:'architect',insight:'strength'}),col.prim)}
   ${gauge(+((I.readiness||{}).score)||0,'Launch readiness',kx({title:'Launch readiness',value:`${(I.readiness||{}).score||0}/100`,why:(I.why||{}).readiness,list:[...(I.readiness?.blockers||[]).map(x=>'Blocker: '+x),...(I.readiness?.next||[]).map(x=>'Next: '+x)],sp:'architect',insight:'readiness'}),col.acc)}
   <figure class="kd-stat" ${kx({title:'Decisions',value:`${dec} of ${tot} made: ${yours} by you, ${dec-yours} by the specialists`,why:'Every decision can be changed. What you write yourself is never overwritten when the brand is rebuilt.',sp:'architect'})}><b>${dec}<small>/${tot}</small></b><figcaption>decisions · ${yours} yours</figcaption><span class="kd-split"><i style="width:${dec?100*yours/dec:0}%"></i></span></figure>
   <figure class="kd-stat" ${kx({title:'Live research',value:`${(g.research?.sources||[]).length} sources, ${g.research?.searches||0} web searches`,list:(g.research?.sources||[]).map(s=>s.title+' — '+s.url),sp:'market',stage:'discover'})}><b>${(g.research?.sources||[]).length}</b><figcaption>research sources</figcaption></figure>
  </div></header>

 ${I.signature_insight?`<section class="kd-sig" ${kx({title:I.signature_insight.title,value:I.signature_insight.insight,why:'So what: '+I.signature_insight.so_what,sp:'architect',insight:'signature'})}><small>Signature insight</small><h2>${h(I.signature_insight.title)}</h2><p>${h(I.signature_insight.insight)}</p><p class="kd-so">→ ${h(I.signature_insight.so_what)}</p></section>`:''}
 ${(I.opportunities||[]).length?`<section class="kd-ops">${I.opportunities.map((o,i)=>`<article ${kx({title:o.title,value:o.insight,why:'Rests on: '+(o.evidence||''),list:['Action: '+o.action],sp:'architect',insight:'opportunity'})}><span>0${i+1}</span><h3>${h(o.title)}</h3><p>${h(o.insight)}</p><b>${h(o.action)}</b></article>`).join('')}</section>`:''}

 <section class="kd-row">
  <div class="kd-card kd-w2"><h2>Where ${h(b.name)} stands</h2><p class="kd-sub">${h((I.positioning_map?.x?.label||''))} × ${h((I.positioning_map?.y?.label||''))}. Competitors from the live research; open space circled.</p>${posMap(I.positioning_map,b,col.prim)}
   ${stmt?`<p class="kd-quote" ${fieldX(b,'positioning.statement')}>${h(stmt)}</p>`:''}</div>
  <div class="kd-card"><h2>Brand strength</h2><p class="kd-sub">Seven dimensions, scored with reasons. Click a point.</p>${radar(str.map(x=>({...x,attrs:kx({title:x.dimension,value:`${Math.round(x.score)}/100`,why:x.why,sp:'architect',insight:'strength'})})),col.prim)}</div>
 </section>

 <section class="kd-card"><h2>The journey, decision by decision</h2><p class="kd-sub">Each dot is a step. Filled by the specialists · ringed if you wrote or changed it · click to see the reasoning.</p>
  <div class="kd-river">${STAGES.map(s=>`<div class="kd-col"><b>${s.n}. ${s.name}</b>${s.D.map(d=>{const fs=d.F.map(f=>G(b).f[d.id+'.'+f.k]||{});const n=fs.filter(x=>x.value!=null&&x.status!=='rejected').length,y=fs.filter(x=>x.by==='you').length;
   return`<button class="kd-node ${n===d.F.length?'full':n?'part':''} ${y?'yours':''}" ${kx({title:d.title,value:d.desc,list:d.F.map(f=>`${f.l}: ${show(f,valOf(b,d.id+'.'+f.k))||'—'}`),sp:d.sp,stage:s.key,deliverable:d.id})} style="--c:${SPEC[d.sp].c}"><i></i><span>${h(d.title)}</span></button>`}).join('')}</div>`).join('')}</div></section>

 <section class="kd-row">
  <div class="kd-card kd-w2"><h2>Who it is for</h2>${personas(b)}</div>
  <div class="kd-card"><h2>What moves them</h2>${chips(b,'audience.motivations','kd-up')}<h3>What holds them back</h3>${chips(b,'audience.anxieties','kd-down')}<h3>Buying moments</h3>${chips(b,'audience.moments','')}</div>
 </section>

 <section class="kd-row">
  <div class="kd-card kd-w2 kd-identity"><h2>Identity</h2>${identity(b,col)}</div>
  <div class="kd-card"><h2>Voice</h2>${voice(b,col)}</div>
 </section>

 <section class="kd-row">
  <div class="kd-card"><h2>Content system</h2>${content(b,col)}</div>
  <div class="kd-card kd-w2"><h2>First things to post</h2>${firstContent(b)}</div>
 </section>

 <section class="kd-card"><h2>Launch</h2>${launch(b,col,I)}</section>

 <section class="kd-row">
  <div class="kd-card"><h2>Risks</h2><p class="kd-sub">Likelihood × impact. Click a number.</p>${riskGrid(I.risks||[],col.prim)}<ol class="kd-rl">${(I.risks||[]).map(r=>`<li>${h(r.risk)}</li>`).join('')}</ol></div>
  <div class="kd-card"><h2>Proof ledger</h2><p class="kd-sub">What the brand claims, and what proves it.</p><ul class="kd-proof">${(I.proof||[]).map(p=>`<li class="${p.status==='have'?'have':'need'}" ${kx({title:p.claim,value:p.status==='have'?'Proof in hand':'Proof needed before you say it publicly',why:'Evidence: '+p.evidence,sp:'quality',stage:'learn',insight:'proof'})}><b>${p.status==='have'?'✓':'!'}</b><span>${h(p.claim)}</span></li>`).join('')}</ul></div>
  <div class="kd-card"><h2>Customer journey</h2>${journey(b)}</div>
 </section>

 <section class="kd-card"><h2>The next 90 days</h2><div class="kd-plan">${(I.plan90||[]).map(p=>`<div ${kx({title:'Weeks '+p.weeks,value:p.focus,why:'Measure: '+p.metric,sp:'growth',stage:'launch',insight:'plan'})}><small>Weeks ${h(p.weeks)}</small><b>${h(p.focus)}</b><span>${h(p.metric)}</span></div>`).join('')}</div></section>

 <section class="kd-row">
  <div class="kd-card kd-w2"><h2>Market research</h2><p class="kd-sub">${h(String(g.research?.data?.summary||'').replace(/<\/?cite\b[^>]*>/gi,''))}</p>${research(b)}</div>
  <div class="kd-card"><h2>Experiments</h2>${experiments(b)}</div>
 </section>
 </div>`};

function personas(b){const P=arr(val(b,'audience.personas'));if(!P.length)return'<p class="vx-muted">Not decided yet.</p>';
 return`<div class="kd-pers">${P.map((p,i)=>{const[n,d]=split2(p);return`<article ${fieldX(b,'audience.personas',{value:p})}><span class="kd-pa">${h(n.trim()[0]||'?')}</span><h3>${h(n)}</h3><p>${h(d)}</p></article>`}).join('')}</div>`}
function chips(b,k,cls){const L=arr(val(b,k));return L.length?`<div class="kd-chips">${L.map(x=>`<span class="${cls}" ${fieldX(b,k,{value:x})}>${h(x)}</span>`).join('')}</div>`:'<p class="vx-muted">—</p>'}
function identity(b,col){const p=col.p;const typo=val(b,'identity.typography')||'';const mood=arr(val(b,'direction.moodwords'));
 const sw=p.map(c=>{const onLight=contrast(c.hex,'#FFFFFF'),onDark=contrast(c.hex,'#111111');const best=onLight>onDark?'white':'black';const r=Math.max(onLight,onDark);
  return`<button class="kd-sw" style="--c:${c.hex}" ${fieldX(b,'identity.palette',{title:`${c.hex} · ${c.role||'colour'}`,extra:`Text on it: ${best} at ${r.toFixed(1)}:1 contrast (${r>=4.5?'passes':'fails'} WCAG AA for body text).`})}><i style="color:${best==='white'?'#fff':'#111'}">Aa</i><b>${h(c.hex)}</b><small>${h(c.role||'')}</small><em class="${r>=4.5?'ok':'bad'}">${r.toFixed(1)}:1</em></button>`}).join('');
 return`<div class="kd-pal">${sw||'<p class="vx-muted">No palette yet.</p>'}</div>
 <div class="kd-type" ${fieldX(b,'identity.typography')}><span class="kd-spec" style="color:${col.prim}">${h(b.name)}</span><span class="kd-spec2">${h(val(b,'naming.tagline')||'The quick brown fox')}</span><small>${h(typo)}</small></div>
 ${val(b,'direction.idea')?`<p class="kd-idea" ${fieldX(b,'direction.idea')}><b>Creative idea</b> ${h(val(b,'direction.idea'))}</p>`:''}
 ${mood.length?`<div class="kd-mood">${mood.map((m,i)=>`<span style="font-size:${15+((i*7)%4)*3}px" ${fieldX(b,'direction.moodwords',{value:m})}>${h(m)}</span>`).join('')}</div>`:''}
 ${val(b,'direction.art')?`<p class="kd-art" ${fieldX(b,'direction.art')}><b>Art direction</b> ${h(val(b,'direction.art'))}</p>`:''}
 ${(val(b,'motionlang.themes')||[]).length?`<div class="kd-themes">${val(b,'motionlang.themes').map(id=>`<button ${fieldX(b,'motionlang.themes',{value:THEME_NAME(id)})} type="button"><img src="/studio/reels/themes/${id}.jpg" alt=""><span>${h(THEME_NAME(id))}</span></button>`).join('')}</div>`:''}`}
function voice(b,col){const T=arr(val(b,'personality.traits'));
 const bars=T.map(t=>{const m=String(t).match(/^(?:is\s+)?(.+?),?\s+not\s+(.+)$/i);const a=m?m[1]:t,z=m?m[2]:'';return`<div class="kd-trait" ${fieldX(b,'personality.traits',{value:t})}><b style="color:${col.prim}">${h(a)}</b>${z?`<span>not ${h(z)}</span>`:''}</div>`}).join('');
 const arch=val(b,'personality.archetype');
 return`${arch?`<p class="kd-arch" ${fieldX(b,'personality.archetype')}><b>${h(split2(String(arch).replace(/:/,' —'))[0])}</b></p>`:''}${bars}
 ${val(b,'voice.tone')?`<p class="kd-tone" ${fieldX(b,'voice.tone')}>${h(val(b,'voice.tone'))}</p>`:''}
 <h3>We say</h3>${chips(b,'voice.say','kd-say')}<h3>We never say</h3>${chips(b,'voice.avoid','kd-avoid')}`}
function content(b,col){const P=arr(val(b,'pillars.pillars'));const cols=[col.prim,col.acc,'#5B7B6F','#B5651D','#4A5A8C','#8C4A6B'];
 const fm=pct(val(b,'pillars.formats'));
 return`${P.length?`<div class="kd-don">${donut(P.map((p,i)=>({v:1,attrs:fieldX(b,'pillars.pillars',{value:p})})),cols)}<b>${P.length}<small>pillars</small></b></div>
 <ul class="kd-leg">${P.map((p,i)=>`<li ${fieldX(b,'pillars.pillars',{value:p})}><i style="background:${cols[i%cols.length]}"></i>${h(split2(p)[0])}</li>`).join('')}</ul>`:''}
 ${fm.length?`<h3>Format mix</h3><div class="kd-bars">${fm.map(x=>`<div ${fieldX(b,'pillars.formats')}><span>${h(x.n)}</span><i style="width:${x.p}%;background:${col.prim}"></i><b>${x.p}%</b></div>`).join('')}</div>`:''}
 ${val(b,'pillars.cadence')?`<p class="kd-sub" ${fieldX(b,'pillars.cadence')}>${h(val(b,'pillars.cadence'))}</p>`:''}`}
function firstContent(b){const H=arr(val(b,'launchcontent.hooks')),R=arr(val(b,'launchcontent.reels')),C=arr(val(b,'launchcontent.carousels'));
 return`${H.length?`<div class="kd-hooks">${H.map(x=>`<blockquote ${fieldX(b,'launchcontent.hooks',{value:x})}>${h(x)}</blockquote>`).join('')}</div>`:''}
 <div class="kd-two"><div><h3>Reels</h3><ol>${R.map(x=>`<li ${fieldX(b,'launchcontent.reels',{value:x})}>${h(x)}</li>`).join('')}</ol></div><div><h3>Carousels and posts</h3><ol>${C.map(x=>`<li ${fieldX(b,'launchcontent.carousels',{value:x})}>${h(x)}</li>`).join('')}</ol></div></div>
 <div class="vx-row"><button class="vx-btn sm" data-go="reels" type="button">Make a reel</button><button class="vx-btn sm" data-go="campaigns" type="button">Plan a campaign</button></div>`}
function launch(b,col,I){const ph=arr(val(b,'gtm.phases')),ch=arr(val(b,'gtm.channels')),bud=pct(val(b,'gtm.budget')),k=arr(val(b,'gtm.kpis'));const cols=[col.prim,col.acc,'#5B7B6F','#B5651D','#4A5A8C','#8C4A6B'];
 return`${ph.length?`<div class="kd-phases">${ph.map((p,i)=>{const[n,d]=split2(p);return`<div ${fieldX(b,'gtm.phases',{value:p})}><span>${i+1}</span><b>${h(n)}</b><p>${h(d)}</p></div>`}).join('')}</div>`:''}
 <div class="kd-three"><div><h3>Budget split</h3>${bud.length?`<div class="kd-stack">${bud.map((x,i)=>`<i style="flex:${x.p};background:${cols[i%cols.length]}" ${fieldX(b,'gtm.budget')} title="${h(x.n+' '+x.p+'%')}"></i>`).join('')}</div><ul class="kd-leg">${bud.map((x,i)=>`<li><i style="background:${cols[i%cols.length]}"></i>${h(x.n)} <b>${x.p}%</b></li>`).join('')}</ul>`:`<p class="kd-sub">${h(val(b,'gtm.budget')||'—')}</p>`}</div>
 <div><h3>Channels, in priority order</h3><ol class="kd-ch">${ch.map(x=>{const[n,d]=split2(x);return`<li ${fieldX(b,'gtm.channels',{value:x})}><b>${h(n)}</b> <span>${h(d)}</span></li>`}).join('')}</ol></div>
 <div><h3>What to measure</h3><ul class="kd-kpi">${k.map(x=>{const[n,d]=split2(x);return`<li ${fieldX(b,'gtm.kpis',{value:x})}><b>${h(n)}</b><span>${h(d)}</span></li>`}).join('')}</ul></div></div>`}
function journey(b){const S=arr(val(b,'journeymap.stages'));return S.length?`<ol class="kd-flow">${S.map(x=>{const p=String(x).split(/\s+[—–-]\s+/);return`<li ${fieldX(b,'journeymap.stages',{value:x})}><b>${h(p[0])}</b><span>${h(p.slice(1).join(' · '))}</span></li>`}).join('')}</ol>`:'<p class="vx-muted">—</p>'}
function research(b){const r=G(b).research;if(!r)return'<p class="vx-muted">No live research yet.</p>';const C=r.data?.competitors||[];
 return`${C.length?`<table class="kd-tab"><thead><tr><th>Competitor</th><th>Positioning</th><th>Price</th></tr></thead><tbody>${C.map(c=>`<tr ${kx({title:c.name,value:c.positioning,why:[c.price_band&&'Price: '+c.price_band,c.channels&&'Sells on: '+c.channels].filter(Boolean).join(' · '),list:c.url?['Source: '+c.url]:[],sp:'market',stage:'discover'})}><td><b>${h(c.name)}</b></td><td>${h(c.positioning||'')}</td><td>${h(c.price_band||'—')}</td></tr>`).join('')}</tbody></table>`:''}
 ${(r.data?.trends||[]).length?`<h3>Trends</h3><ul class="kd-trends">${r.data.trends.map(t=>`<li ${kx({title:t.trend,value:t.evidence,list:t.url?['Source: '+t.url]:[],sp:'market',stage:'discover'})}>${h(t.trend)}</li>`).join('')}</ul>`:''}
 ${(r.sources||[]).length?`<details class="kd-src"><summary>${r.sources.length} sources</summary><ol>${r.sources.map(s=>`<li><a href="${h(s.url)}" target="_blank" rel="noopener">${h(s.title)}</a></li>`).join('')}</ol></details>`:''}`}
function experiments(b){const T=arr(val(b,'experiments.tests'));return T.length?`<ul class="kd-exp">${T.map(t=>{const p=String(t).split(/\s+[—–-]\s+/);return`<li ${fieldX(b,'experiments.tests',{value:t})}><b>${h(p[0])}</b>${p.slice(1).map(x=>`<span>${h(x)}</span>`).join('')}</li>`}).join('')}</ul>`:'<p class="vx-muted">—</p>'}

/* ---------- the explain panel ---------- */
const edText=(f,v)=>v==null?'':f.t==='palette'?v.map(c=>`${c.hex} ${c.role||''}`.trim()).join('\n'):f.t==='themes'?v.join('\n'):Array.isArray(v)?v.join('\n'):String(v);
function panel(){let p=q('#kxPanel');if(!p){p=document.createElement('aside');p.id='kxPanel';p.className='kx-panel';p.setAttribute('aria-label','Why this');document.body.appendChild(p)}return p}
function openKX(id){const o=KX[id];if(!o)return;const b=brand();const S=SPEC[o.sp]||SPEC.architect;const st=o.stage&&STAGES.find(s=>s.key===o.stage);
 const before=st?STAGES.slice(0,STAGES.indexOf(st)).map(s=>s.name):[];
 const p=panel();p.innerHTML=`<div class="kx-in"><button class="kx-x" data-act="kxclose" type="button" aria-label="Close">×</button>
 <div class="kx-who"><span class="jx-av" style="--c:${S.c}">${S.i}</span><div><small>${o.by==='you'?'Your decision':o.insight?'Insight by':'Decided by'}</small><b>${h(o.by==='you'?'You':S.n)}</b></div></div>
 <h2>${h(o.title)}</h2>${o.value?`<p class="kx-val">${h(o.value)}</p>`:''}${o.extra?`<p class="kx-extra">${h(o.extra)}</p>`:''}
 ${o.why?`<h3>The logic</h3><p>${h(o.why)}</p>`:''}
 ${(o.list||[]).length?`<ul class="kx-list">${o.list.map(x=>`<li>${/^Source: https?:/.test(x)?`<a href="${h(x.slice(8))}" target="_blank" rel="noopener">${h(x.slice(8))}</a>`:h(x)}</li>`).join('')}</ul>`:''}
 ${(o.alts||[]).length?`<h3>Also considered</h3><ul class="kx-list">${o.alts.map(a=>`<li>${h(a)}</li>`).join('')}</ul>`:''}
 <h3>What it rests on</h3><p class="vx-small">${o.insight?'Every decision in the Brand Genome and the live market research.':st?`Your idea, the live market research${before.length?', and the decisions in '+before.join(', '):''}.`:'Your idea and the live market research.'} ${h(S.n)}: ${h(S.method)}</p>
 ${o.key?`<h3>Change it</h3><label class="jx-sm" for="kxEdit">${fld(o.key).f.t==='text'?'Your version':fld(o.key).f.t==='palette'?'One colour per line: #RRGGBB role':'One item per line'}</label><textarea id="kxEdit" rows="5" class="jx-ed">${h(edText(fld(o.key).f,G(b).f[o.key]?.value))}</textarea>
  <div class="vx-row"><button class="vx-btn sm pri" data-act="kxsave" data-k="${id}" type="button">Save and update the brand</button><button class="vx-btn sm" data-act="kxonly" data-k="${id}" type="button">Save only</button></div>
  <p class="vx-small vx-muted">"Save and update" re-runs every later stage and the insights, keeping everything you wrote yourself.</p>`
 :o.insight||o.deliverable?`<h3>Disagree?</h3><textarea id="kxEdit" rows="3" class="jx-ed" placeholder="Tell the specialists what is wrong or what you want instead"></textarea><button class="vx-btn sm pri" data-act="kxfeed" data-k="${id}" type="button">Send and update the brand</button>`:''}
 ${o.stage?`<p><button class="jx-link" data-go="${o.stage}" type="button">Open this in ${h(st.name)}</button></p>`:''}</div>`;
 p.classList.add('on');setTimeout(()=>{const x=p.querySelector('.kx-x');x&&x.focus()},30)}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-kx]');if(t&&q('#view-dashboard')&&q('#view-dashboard').contains(t)){e.preventDefault();openKX(t.dataset.kx)}});
document.addEventListener('keydown',e=>{const t=e.target.closest&&e.target.closest('[data-kx]');if(t&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openKX(t.dataset.kx)}if(e.key==='Escape'){const p=q('#kxPanel');p&&p.classList.remove('on')}});
ACT.kxclose=()=>{const p=q('#kxPanel');p&&p.classList.remove('on')};
/* the explain panel lives outside the studio root, so its buttons and links are wired here */
document.addEventListener('click',e=>{const p=q('#kxPanel');if(!p||!e.target.closest||!p.contains(e.target))return;
 const g=e.target.closest('[data-go]');if(g){e.preventDefault();ACT.kxclose();V.go(g.dataset.go);return}
 const a=e.target.closest('[data-act]');const fn=a&&ACT[a.dataset.act];if(fn){e.preventDefault();e.stopPropagation();fn(a,e)}});
function saveEdit(id,ripple){const o=KX[id],b=brand(),F=fld(o.key),t=q('#kxEdit');if(!F||!t)return;const raw=t.value.trim();if(!raw){notify('Write something first.');return}
 const v=F.f.t==='text'?raw:F.f.t==='palette'?raw.split(/\n|,(?=\s*#)/).map(l=>{const m=l.match(/#[0-9a-f]{6}/i);return m?{hex:m[0].toUpperCase(),role:l.replace(m[0],'').replace(/^[,\s]+/,'').trim().slice(0,30)}:null}).filter(Boolean):F.f.t==='themes'?raw.split(/[\n,]/).map(x=>x.trim().toLowerCase().replace(/\s+/g,'-')).filter(x=>J.THEME_IDS.includes(x)):V.list(raw.split(/\n|;\s/));
 if(Array.isArray(v)&&!v.length){notify('That format was not recognised.');return}
 const g=G(b);g.f[o.key]={...(g.f[o.key]||{}),value:v,status:'edited',by:'you',auto:false,at:Date.now()};g.log.unshift({at:Date.now(),d:F.d.id,what:'changed on the dashboard',sp:F.d.sp,f:F.f.l});J.save(b);ACT.kxclose();
 if(ripple){const i=STAGES.findIndex(s=>s.key===F.d.stage.key);const next=STAGES[i+1];notify('Updating everything that depends on it…');(next?J.recomputeFrom(b,next.key):J.writeInsights(b).then(rerender))}else rerender()}
ACT.kxsave=el=>saveEdit(el.dataset.k,true);ACT.kxonly=el=>saveEdit(el.dataset.k,false);
ACT.kxfeed=el=>{const o=KX[el.dataset.k],b=brand(),t=q('#kxEdit');const msg=t&&t.value.trim();if(!msg){notify('Write your feedback first.');return}feedback(b,msg,o.stage||'define');ACT.kxclose()};
function feedback(b,msg,stageKey){const g=G(b);const s=STAGES.find(x=>x.key===stageKey)||STAGES[1];s.D.forEach(d=>{g.inputs[d.id]=[g.inputs[d.id],msg].filter(Boolean).join(' · ').slice(-300)});g.log.unshift({at:Date.now(),d:s.D[0].id,what:'feedback: '+msg.slice(0,60),sp:'architect'});J.save(b);notify('Thanks. The specialists are revising from '+s.name+' onwards…');J.recomputeFrom(b,s.key)}
ACT.kdbuild=()=>{const b=brand();J.autopilot(b)};
ACT.kdinsights=async el=>{const b=brand();el.disabled=true;el.textContent='Writing…';try{await J.writeInsights(b);notify('Insights updated.')}catch(e){notify(V.errText(e))}rerender()};
ACT.kdrebuild=()=>{const b=brand();V.confirmBox('Rebuild the whole brand?','The specialists research the market again and re-decide every stage. Everything you wrote yourself stays. About 5 minutes and the same credits as a new build.','Rebuild',()=>J.autopilot(b,0,{force:true,research:true}))};
ACT.kdfeedback=()=>{const m=q('#vxModal');m.innerHTML=`<div class="box"><h3>Tell the specialists what to change</h3><p class="vx-small">Say it in your own words. They revise from the stage you pick onwards, keeping what you wrote yourself.</p>
 <textarea id="kdFb" rows="4" class="jx-ed" placeholder="e.g. We are more premium than this; lead with the weavers, not discounts"></textarea>
 <label class="jx-sm" for="kdSt">Start from</label><select id="kdSt">${STAGES.map(s=>`<option value="${s.key}" ${s.key==='define'?'selected':''}>${s.n}. ${s.name}</option>`).join('')}</select>
 <div class="vx-row" style="margin-top:12px"><button class="vx-btn pri" data-act="kdfbgo" type="button">Revise my brand</button><button class="vx-btn" data-act="kdfbx" type="button">Cancel</button></div></div>`;m.classList.add('on')};
ACT.kdfbgo=()=>{const m=q('#vxModal'),t=q('#kdFb'),s=q('#kdSt');const msg=t&&t.value.trim();if(!msg){notify('Write your feedback first.');return}m.classList.remove('on');feedback(brand(),msg,s.value)};
ACT.kdfbx=()=>q('#vxModal').classList.remove('on');
ICON.dashboard='M4 13h6V4H4zM14 20h6V11h-6zM4 20h6v-3H4zM14 7h6V4h-6z';
})();
