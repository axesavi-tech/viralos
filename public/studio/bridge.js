/* Kathavi hosted bridge: gives the studio the same capability interface it uses inside Claude
   (sample, db, user, assets, downloads, tts), backed by the Kathavi server and its credit ledger. */
(()=>{
'use strict';
window.VX_HOSTED=true;
let WS=null,ME=null,mePromise=null;
async function api(path,opts={}){
  const headers={...(opts.headers||{})};if(WS)headers['x-workspace']=WS;
  if(opts.json!==undefined){headers['content-type']='application/json';opts.body=JSON.stringify(opts.json)}
  const r=await fetch(path,{method:opts.method||(opts.body?'POST':'GET'),headers,body:opts.body,credentials:'same-origin'});
  if(r.status===401){location.href='/login?next='+encodeURIComponent('/studio/index.html'+location.hash);throw{code:'unauthenticated',message:'Sign in again.'}}
  const ct=r.headers.get('content-type')||'';const data=ct.includes('json')?await r.json():await r.blob();
  if(!r.ok){const e={code:data&&data.code||(r.status===402?'insufficient_credits':r.status===429?'rate_limited':r.status===504?'timeout':'error'),message:data&&data.error||('Request failed ('+r.status+')'),status:r.status};
    if(e.code==='insufficient_credits')window.dispatchEvent(new CustomEvent('vx:nocredits',{detail:e}));throw e}
  return data}
async function me(force){if(ME&&!force)return ME;if(!mePromise||force)mePromise=api('/api/me').then(d=>{ME=d;WS=d.workspace&&d.workspace.id;window.VX_BAL=d.balance;window.VX_RATES=d.rates;window.dispatchEvent(new CustomEvent('vx:me',{detail:d}));return d}).finally(()=>{mePromise=null});return mePromise}
let refreshT=0;function refresh(){clearTimeout(refreshT);refreshT=setTimeout(()=>me(true).then(()=>{try{VIRALOS.paintCredits()}catch(e){}}).catch(()=>{}),400)}
const b64=blob=>new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>res(String(fr.result).split(',')[1]);fr.onerror=rej;fr.readAsDataURL(blob)});
function parseLoose(t){const a=t.indexOf('{'),b=t.lastIndexOf('}');if(a<0||b<a)throw{code:'bad_json',message:'Claude returned no JSON'};return JSON.parse(t.slice(a,b+1))}

/* ---- capabilities ---- */
async function sampleCall(input,opts={}){await me();const images=[];for(const bl of (opts.images||[]).slice(0,6)){if(bl&&bl.size)images.push({media_type:bl.type||'image/jpeg',data:await b64(bl)})}
  const r=await api('/api/ai',{json:{input,opts:{modelTier:opts.modelTier},action:opts.action,images}});if(r.balance!=null){window.VX_BAL=r.balance;try{VIRALOS.paintCredits()}catch(e){}}
  if(opts.onText)try{opts.onText({text:r.text,delta:r.text})}catch(e){}return{text:r.text,truncated:!!r.truncated}}
const sample=Object.assign((i,o)=>sampleCall(i,o),{json:async(i,o)=>parseLoose((await sampleCall(i,o)).text),limits:async()=>({images:true})});
const db={collection(){return{
  async get(){const d=await api('/api/docs');return{docs:d.docs.map(x=>({id:x.id,exists:true,data:()=>x.data,metadata:{fromCache:false,hasPendingWrites:false}})),size:d.docs.length,empty:!d.docs.length}},
  doc(id){return{id,async set(data){await api('/api/docs',{method:'PUT',json:{id,data}})},async delete(){await api('/api/docs?id='+encodeURIComponent(id),{method:'DELETE'})}}}}}};
const user={id:async()=>{await me();return WS},email:async()=>(await me()).user.email,can:async()=>true,canEdit:async()=>!['viewer','analyst'].includes((await me()).role),isOwner:async()=>(await me()).role==='owner'};
const assets={async upload(blob,folder){const fd=new FormData();fd.append('file',blob,blob.name||('upload.'+((blob.type||'').split('/')[1]||'bin')));if(folder)fd.append('folder',folder);return api('/api/assets',{body:fd})},async list(){return{assets:[],usage:{}}},async delete(){}};
const downloads={async save({filename,data}){const blob=data instanceof Blob?data:new Blob([data]);const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=filename||'download';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);return true}};
let audioEl=null;const ttsListeners=[];
const tts={async speak(text,o={}){const t=Array.isArray(text)?text.map(x=>x.text).join(' '):String(text);const r=await api('/api/voice/speak',{json:{text:t.slice(0,4000),voiceId:o.voiceId||'stock'}});refresh();
  const blob=await api(r.url);if(audioEl)audioEl.pause();audioEl=new Audio(URL.createObjectURL(blob));ttsListeners.forEach(f=>f({state:'speaking'}));await audioEl.play();await new Promise(res=>audioEl.onended=res);ttsListeners.forEach(f=>f({state:'idle',reason:'completed'}))},
  stop(){if(audioEl)audioEl.pause()},onState(f){ttsListeners.push(f)},setRate(){},pause(){audioEl&&audioEl.pause()},resume(){audioEl&&audioEl.play()}};
const caps={sample,db,user,assets,downloads,tts};
window.claude={use:async name=>{try{await me()}catch(e){return null}return caps[name]||null}};

/* ---- helpers for the hosted features ---- */
async function job(id,onTick){for(let i=0;i<240;i++){const j=await api('/api/jobs/'+id);if(onTick)onTick(j,i);if(j.status==='done'||j.status==='failed'){refresh();return j}await new Promise(r=>setTimeout(r,i<10?4000:8000))}throw{message:'Still processing. Check back in a few minutes.'}}
async function fileFromUrl(url,name){const b=await api(url);return new File([b],name||('asset.'+((b.type||'').split('/')[1]||'bin')),{type:b.type})}
window.VX={api,me,refresh,job,fileFromUrl,uploadBlob:(b,f)=>assets.upload(b,f),get ws(){return WS}};
window.addEventListener('vx:nocredits',()=>{try{VIRALOS.notify('Not enough credits. Opening Billing…');setTimeout(()=>VIRALOS.go('account'),900)}catch(e){}});
me().catch(()=>{});
})();
