/* Kathavi AI footage — seven video models behind one panel in the Creative Studio.
   Turns the customer's own product photos into motion (or edits a clip), and drops the result into
   the media tray so every reel and post template uses it. Text, logo, price and CTA stay template-drawn. */
(()=>{
'use strict';
const X=window.VX;if(!X||typeof handleFiles!=='function')return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const FILES=new Map();                                   // media name → original File (needed to upload clips for editing)
const _hf=window.handleFiles;window.handleFiles=function(files){[...files].forEach(f=>FILES.set(f.name,f));return _hf(files)};
let CAT=null,job=null,model=null,busy=false;
const JOB_ORDER=['film','people','hero','sound','lifestyle','draft','edit'];

async function catalogue(){if(CAT)return CAT;try{CAT=await X.api('/api/media/footage')}catch(e){CAT={models:[],jobs:{},error:e.message||'Could not load models'}}return CAT}
const mOf=k=>CAT.models.find(m=>m.key===k);
function suggestJob(){try{const t=curTpl&&curTpl();if(!t)return'film';const s=[t.name,t.desc,...(t.tags||[])].join(' ').toLowerCase();
  return/cinematic|film|story|editorial|luxury/.test(s)?'film':/model|wear|outfit|fashion|people|ugc/.test(s)?'people':/sound|dialogue|voice|talking/.test(s)?'sound':/lifestyle|mood|emotion|calm|warm/.test(s)?'lifestyle':/product|hero|launch|drop|price|offer|sale/.test(s)?'hero':'film'}catch(e){return'film'}}
function sources(){const ms=(state.samples?[]:state.media)||[];return ms.map((m,i)=>({i,m,label:`${i+1}. ${m.name||m.type}`}))}
function cost(){const m=mOf(model);if(!m)return 0;const d=+(document.getElementById('afDur')?.value||m.defaultDuration);return Math.ceil(m.creditsPerSecond*d)}

function render(){const box=document.getElementById('aiFoot');if(!box)return;const keep={p:box.querySelector('#afPrompt')?.value,a:box.querySelector('#afAspect')?.value};
  if(CAT.error){box.innerHTML=`<h3>AI footage</h3><p class="hint">${esc(CAT.error)}</p>`;return}
  const m=mOf(model),src=sources(),isEdit=job==='edit',imgs=src.filter(s=>s.m.type==='image'),vids=src.filter(s=>s.m.type==='video');
  const srcOpts=isEdit?vids.map(s=>`<option value="${s.i}">${esc(s.label)}</option>`).join(''):`${imgs.map(s=>`<option value="${s.i}">Animate ${esc(s.label)}</option>`).join('')}${m&&m.textOnly?'<option value="text">No photo — create from words</option>':''}`;
  box.innerHTML=`<h3>AI footage</h3>
   <p class="hint">Turns your product photos into motion. The template still draws your logo, words and price, so they stay exact.</p>
   <div class="chips" role="radiogroup" aria-label="What should the clip do?" style="margin:10px 0 8px">${JOB_ORDER.filter(k=>CAT.jobs[k]).map(k=>`<button type="button" class="btn sm${k===job?' primary':''}" role="radio" aria-checked="${k===job}" data-afjob="${k}" title="${esc(CAT.jobs[k].hint)}">${esc(CAT.jobs[k].label)}</button>`).join('')}</div>
   <div class="fields">
    <div class="f w"><label for="afModel">Quality</label><select id="afModel">${CAT.models.filter(x=>x.available&&(isEdit?x.edit:true)).sort((a,b)=>b.creditsPerSecond-a.creditsPerSecond).map(x=>`<option value="${x.key}" ${x.key===model?'selected':''}>${esc(x.bestFor.split(/[,;]/)[0])} — ${x.creditsPerSecond} credits a second</option>`).join('')}</select>${m?`<p class="hint" style="margin-top:4px">Chosen for this shot${m.audio?' · with sound':''}. Change it only if you want a different look or price.</p>`:''}</div>
    <div class="f w"><label for="afSrc">${isEdit?'Clip to edit (up to 10 s)':'Start from'}</label><select id="afSrc">${srcOpts||'<option value="">Add a photo to your media first</option>'}</select></div>
    <div class="f w"><label for="afPrompt">${isEdit?'What should change?':'Describe the shot'}</label><textarea id="afPrompt" rows="3" placeholder="${isEdit?'Make it golden hour; add slowly falling petals':'Slow dolly-in, soft window light, fabric moving gently in a breeze'}"></textarea></div>
    <div class="f"><label for="afDur">Length</label><select id="afDur">${(m?m.durations:[5]).map(d=>`<option value="${d}" ${m&&d===m.defaultDuration?'selected':''}>${d} s${m&&m.key==='omni'?' (up to)':''}</option>`).join('')}</select></div>
    <div class="f"><label for="afAspect">Shape</label><select id="afAspect"><option value="9:16">9:16 reel / story</option><option value="4:5">4:5 post</option><option value="1:1">1:1 post</option><option value="16:9">16:9 wide</option></select></div>
   </div>
   <div class="row" style="display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap"><button type="button" class="btn primary sm" id="afGo" ${(!m||!m.available||busy||(!srcOpts))?'disabled':''}>Generate · <span id="afCost">${cost()}</span> credits</button><button type="button" class="btn sm" id="afStill" ${vids.length?'':'disabled'} title="Turn the latest clip into a still for post templates">Still for posts</button></div>
   <p class="hint" id="afSt" role="status" aria-live="polite" style="margin-top:8px"></p>
   <p class="hint" style="margin-top:6px">Compare AI clips with your real product before publishing. Credits are refunded automatically if a clip fails.</p>`;
  if(keep.p)box.querySelector('#afPrompt').value=keep.p;if(keep.a)box.querySelector('#afAspect').value=keep.a;
  box.querySelectorAll('[data-afjob]').forEach(b=>b.onclick=()=>{job=b.dataset.afjob;const want=CAT.jobs[job].model;model=(mOf(want)?.available?want:(CAT.models.find(x=>x.available&&(job!=='edit'||x.edit))?.key||want));render()});
  box.querySelector('#afModel').onchange=e=>{model=e.target.value;render()};
  box.querySelector('#afDur').onchange=()=>{box.querySelector('#afCost').textContent=cost()};
  box.querySelector('#afGo').onclick=generate;box.querySelector('#afStill').onclick=still}

const st=t=>{const e=document.getElementById('afSt');if(e)e.innerHTML=t};
async function imageBlob(m){if(FILES.has(m.name)&&FILES.get(m.name).type.startsWith('image'))return FILES.get(m.name);
  const el=m.el,w=m.w||el.naturalWidth,h=m.h||el.naturalHeight,s=Math.min(1,2048/Math.max(w,h)),c=document.createElement('canvas');c.width=Math.round(w*s);c.height=Math.round(h*s);c.getContext('2d').drawImage(el,0,0,c.width,c.height);
  return new Promise(r=>c.toBlob(b=>r(new File([b],(m.name||'photo').replace(/\.\w+$/,'')+'.jpg',{type:'image/jpeg'})),'image/jpeg',.92))}
async function generate(){if(busy)return;const m=mOf(model);const srcV=document.getElementById('afSrc').value,prompt=document.getElementById('afPrompt').value.trim()||defaultPrompt(),dur=+document.getElementById('afDur').value,aspect=document.getElementById('afAspect').value;
  busy=true;document.getElementById('afGo').disabled=true;
  try{const body={model,prompt,duration:dur,aspect};
    if(srcV!==''&&srcV!=='text'){const item=state.media[+srcV];
      if(job==='edit'){const f=FILES.get(item.name);if(!f)throw{message:'Re-add this clip to your media so it can be uploaded for editing.'};if((item.el.duration||0)>10.5)throw{message:'Gemini Omni edits clips up to 10 seconds. Trim it first.'};st('<span class="vx-busy"></span> Uploading the clip…');body.videoUrl=(await X.uploadBlob(f,'footage')).url}
      else{st('<span class="vx-busy"></span> Uploading the photo…');body.imageUrl=(await X.uploadBlob(await imageBlob(item),'footage')).url}}
    st(`<span class="vx-busy"></span> ${esc(m.name)} is creating your clip…${m.key==='omni'?' (about a minute)':' (usually 1–5 minutes)'}`);
    const r=await X.api('/api/media/footage',{json:body});X.refresh();
    let url=r.result&&r.result.url;
    if(!url){const j=await X.job(r.job,(x,i)=>st(`<span class="vx-busy"></span> ${esc(m.name)} is rendering… ${Math.round(i*6)}s`));if(j.status!=='done')throw{message:`The clip failed and ${r.credits} credits were refunded. ${j.error||''}`};url=j.result.url}
    const f=await X.fileFromUrl(url,`ai-${model}-${Date.now().toString(36)}.mp4`);handleFiles([f]);
    st(`Clip added to your media (${r.credits} credits). Every template now uses it — pick one and press play.`);
  }catch(e){st(esc(e.message||'Something went wrong.'))}finally{busy=false;const g=document.getElementById('afGo');if(g)g.disabled=false}}
function defaultPrompt(){const c=state.copy||{};return job==='people'?`A person naturally wearing/using the product, walking slowly towards camera, soft daylight, editorial fashion feel. ${c.headline||''}`
  :job==='hero'?'Slow orbiting camera move around the product on a clean surface, soft studio light, shallow depth of field'
  :job==='sound'?`Cinematic product ad with ambient sound. ${c.headline||''}`
  :job==='lifestyle'?'A warm everyday moment with the product, natural window light, gentle handheld movement'
  :job==='edit'?'Make it golden hour with soft warm light':'Slow cinematic push-in, elegant lighting, gentle motion, premium editorial mood'}
async function still(){const vids=state.media.filter(m=>m.type==='video');const v=vids[vids.length-1];if(!v)return;const el=v.el;
  const grab=()=>{const c=document.createElement('canvas');c.width=el.videoWidth;c.height=el.videoHeight;c.getContext('2d').drawImage(el,0,0);c.toBlob(b=>{handleFiles([new File([b],(v.name||'clip').replace(/\.\w+$/,'')+'-still.png',{type:'image/png'})]);st('Still added — use it in any post template.')},'image/png')};
  el.pause();const t=(el.duration||2)*.45;if(Math.abs(el.currentTime-t)<.05)grab();else{el.addEventListener('seeked',()=>{grab();el.play().catch(()=>{})},{once:true});el.currentTime=t}}

async function mount(){const media=document.getElementById('mediaList')?.closest('section');if(!media||document.getElementById('aiFoot'))return;
  const s=document.createElement('section');s.className='card';s.id='aiFoot';s.innerHTML='<h3>AI footage</h3><p class="hint"><span class="vx-busy"></span> Loading models…</p>';media.after(s);
  await catalogue();job=suggestJob();const want=CAT.jobs[job]?.model;model=mOf(want)?.available?want:(CAT.models.find(x=>x.available)?.key||want);render()}
const _mc=window.mediaChanged;if(typeof _mc==='function')window.mediaChanged=function(){_mc.apply(this,arguments);if(CAT&&!busy)render()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
