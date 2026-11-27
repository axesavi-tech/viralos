/* Kathavi Studio: one place to make anything. A bar across the top of every making mode lets the owner pick the
   calendar entry they are working on and switch between Design (templates), Cinematic reel, Voice & subtitles and
   New photo. The entry's words follow them into every mode; the engine behind each mode is chosen by Kathavi. */
(()=>{const V=window.VIRALOS;if(!V)return;
const {h,q,brand,camp,items,cur,Store,VIEWS,AFTER,ACT}=V;
const MODES=[['studio','Design','Posts, carousels, stories and reels from your templates'],['reels','Cinematic reel','A premium motion reel with depth and 3D'],['video','Voice & subtitles','Your voiceover and captions on a reel'],['images','New photo','A new photo of your product, in any setting']];
const FMT={reel:'Reel',post:'Post',carousel:'Carousel',story:'Story',short:'Short'};
function entries(){const c=camp();return c?items(c).slice().sort((a,b)=>(a.n||0)-(b.n||0)):[]}
function current(){const E=entries();return E.find(x=>x.id===cur.vid)||null}
function bar(v){const c=camp(),E=entries(),it=current();
 return`<div class="ks-bar" role="navigation" aria-label="Studio">
  <div class="ks-modes" role="tablist">${MODES.map(([k,l,d])=>`<button type="button" role="tab" class="ks-mode ${v===k?'on':''}" aria-selected="${v===k}" data-act="ksmode" data-v="${k}" title="${h(d)}">${l}</button>`).join('')}</div>
  <label class="ks-entry"><span>Working on</span><select data-act="ksentry" aria-label="Calendar entry to work on"><option value="">${c?'A blank design':'No campaign yet'}</option>${E.map(x=>`<option value="${x.id}" ${it&&it.id===x.id?'selected':''}>Day ${h(String(x.day||x.n||''))} · ${FMT[x.format]||x.format} · ${h(String(x.headline||x.hook||'').slice(0,48))}</option>`).join('')}</select></label>
 </div>`}
/* the rendered modes get the bar at the top; Design is a fixed page, so the bar is inserted once and refreshed */
['reels','video','images'].forEach(v=>{const f=VIEWS[v];if(!f)return;VIEWS[v]=o=>bar(v)+f(o)});
function paintStudioBar(){const host=q('#view-studio');if(!host)return;let el=host.querySelector(':scope > .ks-bar');const html=bar('studio');if(el)el.outerHTML=html;else host.insertAdjacentHTML('afterbegin',html)}
const prevOnGo=window.KATHAVI_ONGO;window.KATHAVI_ONGO=v=>{if(prevOnGo)prevOnGo(v);if(v==='studio')paintStudioBar()};

/* the entry's words go into the cinematic reel too */
const prevReels=AFTER.reels;AFTER.reels=(el,o)=>{if(prevReels)prevReels(el,o);const it=current();const f=document.getElementById('reelFrame');if(!f||!it||!AFTER.reels.last)return;
 const send=AFTER.reels.last;AFTER.reels.last=()=>{};/* the original sends brand+media; re-send it with the entry */
 const b=brand(),obj={launch:'launch','Product launch':'launch',offer:'offer','Clearance campaign':'offer','Festive campaign':'offer','Sales conversion':'offer','Brand awareness':'awareness'}[camp()?.objective]||'showcase';
 const entry={hook:it.hook||it.headline||'',story:it.headline&&it.hook&&it.headline!==it.hook?it.headline:'',features:(it.details||[]).slice(0,3),cta:it.cta||'',objective:obj};
 const tag=b&&b.vault&&(b.vault.taglines||[])[0];const P=b&&(b.products_list||[])[0];
 const msg={type:'kathavi:brand',ws:(window.VX&&window.VX.ws)||null,brand:b?{name:b.name||'',tagline:typeof tag==='string'?tag:(tag&&tag.text)||'',primary:b.colors&&b.colors.primary,accent:b.colors&&b.colors.secondary,handle:b.handle||''}:null,
  media:b?((b.vault&&b.vault.photos)||[]).filter(p=>p&&p.url).map(p=>({src:p.url,kind:/^video\//.test(p.type||p.contentType||'')||/\.(mp4|mov|webm)(\?|$)/i.test(p.url)?'video':'image'})):[],product:P?{name:P.name||'',price:P.price||''}:null,entry};
 const s2=()=>{try{f.contentWindow.postMessage(msg,location.origin)}catch(e){}};f.addEventListener('load',s2);AFTER.reels.last=s2;s2()};

ACT.ksmode=el=>{V.go(el.dataset.v)};
ACT.ksentry=el=>{const id=el.value;cur.vid=id||null;const it=id&&Store.get(id);
 if(cur.view==='studio'){if(it)V.toStudio(it);paintStudioBar()}else V.rerender()};
/* selects fire 'change', not 'click': route them to the same action */
document.addEventListener('change',e=>{const t=e.target;if(t&&t.matches&&t.matches('select[data-act=ksentry]'))ACT.ksentry(t)});
if(cur.view==='studio')setTimeout(paintStudioBar,0);
})();
