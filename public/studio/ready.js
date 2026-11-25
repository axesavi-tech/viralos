/* Ready-to-use mode: customers see only finished Kathavi Collection templates, already filled with their
   media, brand and AI-written words, ranked best-first. No models, palettes, layouts or settings.
   Admins (hosted) or the owner (standalone) can switch to the full studio. */
(()=>{
'use strict';
if(typeof buildGrid!=='function'||!window.KC_IDS)return;
const KEY='kathavi.studio.mode';
const css=document.createElement('style');css.textContent=`
body.kc-ready #palSeg,body.kc-ready #fitSeg,body.kc-ready #setSeg,body.kc-ready .lenctl,body.kc-ready #tab-e,body.kc-ready #tab-c,
body.kc-ready #filters,body.kc-ready #aiFoot,body.kc-ready #paneT .ai,body.kc-ready #sampleBtn,body.kc-ready .palette-row,body.kc-ready #logoMode,
body.kc-ready .logo-prev{display:none!important}
body.kc-ready #kcIntro{display:block}
#kcIntro{display:none;margin:0 0 14px;padding:16px 18px;border-radius:16px;background:var(--raise,#f1efe9);border:1px solid var(--line,#e4e3dd)}
#kcIntro b{display:block;font:400 24px/1.15 'Instrument Serif',serif;margin-bottom:4px}
#kcIntro span{font:500 12.5px/1.45 'Inter Tight',sans-serif;opacity:.75}
#kcMode{white-space:nowrap}
.kc-kinds{display:flex;gap:6px;margin:8px 0 10px}.kc-kinds button{font:600 12px 'Inter Tight',sans-serif;padding:6px 14px;border-radius:999px;border:1px solid var(--line,#e4e3dd);background:transparent;color:inherit;cursor:pointer}.kc-kinds button[aria-pressed=true]{background:#111113;color:#F5F4EF;border-color:#111113}`;document.head.append(css);
let ready=true;try{ready=localStorage.getItem(KEY)!=='full'}catch(e){}
let canToggle=!window.VX_HOSTED;            // standalone owner always; hosted only for platform admins

let headOrig=null,kind='all';function apply(){document.body.classList.toggle('kc-ready',ready);
  const hs=document.querySelector('.logo small');if(hs){if(headOrig==null)headOrig=hs.textContent;hs.textContent=ready?`${window.KC_IDS.length} ready-to-use templates · export`:headOrig.replace(/\b\d{2,3}\b/,String(TPL.length))}
  if(ready){state.filter='kc';document.querySelectorAll('#filters [data-f]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.f==='kc')))}
  const t=document.getElementById('kcMode');if(t){t.hidden=!canToggle;t.textContent=ready?'Full studio':'Ready-to-use view'}
  const h=document.querySelector('#paneT');if(h&&!document.getElementById('kcIntro')){const d=document.createElement('div');d.id='kcIntro';
    d.innerHTML='<b>Your ready-to-use templates</b><div class="kc-kinds" role="group" aria-label="Show"><button type="button" data-kind="all" aria-pressed="true">All</button><button type="button" data-kind="reel" aria-pressed="false">Reels</button><button type="button" data-kind="post" aria-pressed="false">Posts</button></div><span>Add your product photos and logo once. Every template below is already built with them and with words written for your brand — best matches first. Pick one, adjust the words if you like, and export.</span>';h.prepend(d);d.querySelectorAll('[data-kind]').forEach(b=>b.onclick=()=>{kind=b.dataset.kind;d.querySelectorAll('[data-kind]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));try{buildGrid()}catch(e){}})}
  const cc=[...document.querySelectorAll('.pane.left h3')].find(x=>/^Copy/.test(x.textContent));if(cc)cc.firstChild.textContent=ready?'Your words ':'Copy ';
  try{buildGrid()}catch(e){}}

/* Rank the collection by how well each template suits the customer's media (scores come from the engine's analysis + AI director). */
const _b=buildGrid;window.buildGrid=function(){if(ready){state.filter='kc';const keep=TPL.slice();const kc=keep.filter(t=>t.kc);if(state.scores&&Object.keys(state.scores).length)kc.sort((a,b)=>(state.scores[b.id]||0)-(state.scores[a.id]||0));
  TPL.splice(0,TPL.length,...kc.filter(t=>kind==='all'||t.kind===kind));try{state.filter='rec';_b()}finally{TPL.splice(0,TPL.length,...keep);state.filter='kc'}}else _b()};

/* AI in the background: when a customer adds new media, the AI director reads it once, writes the words and re-ranks. */
let lastSig='',timer=0;
const _mc=window.mediaChanged;window.mediaChanged=function(){_mc.apply(this,arguments);if(!ready||state.samples||!state.media.length)return;
  const sig=state.media.map(m=>m.name+':'+m.w+'x'+m.h).join('|');if(sig===lastSig)return;clearTimeout(timer);
  timer=setTimeout(()=>{lastSig=sig;const b=document.getElementById('aiBtn');if(b&&!b.disabled)b.click()},1200)};

function mount(){const bar=document.getElementById('exportBtn');if(bar&&!document.getElementById('kcMode')){const t=document.createElement('button');t.type='button';t.id='kcMode';t.className='btn ghost';
    t.onclick=()=>{ready=!ready;try{localStorage.setItem(KEY,ready?'ready':'full')}catch(e){}if(!ready){state.filter='rec'}apply()};bar.before(t)}
  apply()}
if(window.VX&&window.VX.me)window.VX.me().then(d=>{canToggle=!!(d&&d.isAdmin);apply()}).catch(()=>{});
window.addEventListener('vx:me',e=>{canToggle=!!(e.detail&&e.detail.isAdmin);if(!canToggle&&!ready){ready=true}apply()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
