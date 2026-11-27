/* Kathavi — campaign platform around the Vitrine studio. Uses Vitrine globals:
   state, TPL, tplById, select, setCopy, renderTpl, handleFiles, resize, KIT, queueThumbs, drawLogoPreview, deliver, toast */
(()=>{
'use strict';
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const id6=()=>Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-3);
const words=s=>String(s||'').trim().split(/\s+/).filter(Boolean).length;
const list=v=>Array.isArray(v)?v.filter(x=>x!=null&&String(x).trim()):String(v||'').split('\n').map(s=>s.trim()).filter(Boolean);
const clampN=(v,a,b)=>Math.max(a,Math.min(b,v));
const fmtD=d=>new Date(d+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short'});
const addDays=(iso,n)=>{const d=new Date(iso+'T00:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const todayISO=()=>{const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)};
const withTimeout=(p,ms)=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r({code:'timeout'}),ms))]);
const STATUSES=['Draft','Generated','Quality checked','Approved','Scheduled','Published','Analysed','Optimised'];
const FORMATS={reel:'Reel',post:'Single post',carousel:'Carousel',story:'Story',short:'YouTube Short'};
const OBJECTIVES=['Brand awareness','Product launch','Customer acquisition','Lead generation','Website traffic','Sales conversion','Customer retention','Community building','Festive campaign','Personal branding','Brand repositioning','Clearance campaign','Educational campaign','Viral content experimentation'];
const CHANNELS=['Instagram','Facebook','LinkedIn','YouTube','TikTok','Pinterest','X','Email','WhatsApp Business'];

/* ============ Storage: private per-user db, browser fallback ============ */
const Store={mode:'local',db:null,uid:null,docs:new Map(),timers:{},chain:{},assets:null,dl:null,tts:null,
  async init(){
    /* signed in on Kathavi: your work lives in your account. If the account cannot be reached, keep trying and say so;
       never fall back to an empty browser copy, which looked like a lost brand and saved new work in the wrong place */
    const account=!!(window.claude&&claude.use&&window.VX);
    for(let i=0;i<5;i++){try{
      if(window.claude&&claude.use){const [db,user,assets,dl,tts]=await withTimeout(Promise.all(['db','user','assets','downloads','tts'].map(n=>claude.use(n).catch(()=>null))),12000);
        this.assets=assets;this.dl=dl;this.tts=tts;
        if(db&&user){const u=await user.id();if(u){this.db=db;this.uid=u;this.mode='cloud'}}
        if(account&&this.mode!=='cloud')throw{code:'unreachable'}}
      if(this.mode==='cloud'){const snap=await withTimeout(this.db.collection('data/users/'+this.uid).get(),15000);this.docs.clear();snap.docs.forEach(d=>this.docs.set(d.id,JSON.parse(JSON.stringify(d.data()))))}
      this.err=false;break}
     catch(e){this.err=true;this.mode='local';if(!account||(e&&e.code==='unauthenticated'))break;if(i<4){notify('Reconnecting to your account…');await new Promise(r=>setTimeout(r,2000*2**i))}}}
    if(this.err&&account){this.mode='offline';return}
    if(this.mode==='local'){try{const s=JSON.parse(localStorage.getItem('viralos.v1')||'{}');Object.entries(s).forEach(([k,v])=>this.docs.set(k,v))}catch(e){}}
  },
  all(type){return[...this.docs.values()].filter(d=>d.type===type)},
  get(k){return this.docs.get(k)},
  put(doc){doc.updated=Date.now();this.docs.set(doc.id,doc);clearTimeout(this.timers[doc.id]);this.timers[doc.id]=setTimeout(()=>this.flush(doc.id),500)},
  flush(k){const doc=this.docs.get(k);
    if(this.mode==='cloud'){const ref=this.db.collection('data/users/'+this.uid).doc(k);
      this.chain[k]=(this.chain[k]||Promise.resolve()).then(()=>doc?ref.set(JSON.parse(JSON.stringify(doc))):ref.delete()).then(()=>{if(this.failed&&this.failed[k]){delete this.failed[k];if(!Object.keys(this.failed).length)notify('Saved.')}}).catch(e=>{
        /* never lose work silently: say so, retry with back-off, and warn before leaving the page while anything is unsaved */
        if(e&&e.code==='quota_exceeded'){notify('Storage is full. Delete an old campaign to save new work.');return}
        this.failed=this.failed||{};const n=(this.failed[k]||0)+1;this.failed[k]=n;if(e&&e.code==='unauthenticated')return;
        notify(n<5?'Could not save your latest change. Retrying…':'Your latest changes are not saved. Check your connection; Kathavi keeps retrying.');setTimeout(()=>{if(this.failed[k])this.flush(k)},Math.min(60000,3000*2**n))});}
    else if(this.mode==='offline'){notify('Not saved: your account is not reachable. Reload when your connection is back.')}
    else{try{localStorage.setItem('viralos.v1',JSON.stringify(Object.fromEntries(this.docs)))}catch(e){notify('This browser could not save. Export a backup from Settings.')}}},
  del(k){this.docs.delete(k);clearTimeout(this.timers[k]);this.flush(k)}
};
addEventListener('beforeunload',e=>{if(Store.failed&&Object.keys(Store.failed).length){e.preventDefault();e.returnValue=''}});
const Session={assets:new Map(),voices:new Map(),files:new Map()};
const pref={get(k,d){try{return JSON.parse(localStorage.getItem('viralos.pref.'+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem('viralos.pref.'+k,JSON.stringify(v))}catch(e){}}};

/* ============ Credits & usage ============ */
const RATE_DEF={journey:2,dna:3,strategy:3,intel:2,directions:2,calendar:4,fix:1,regen:1,copy:1,ads:3,catalogue:2,advisor:2,command:1,scene:1};
const RATE_LABEL={journey:'Specialist recommendation (one step)',dna:'Brand DNA discovery',strategy:'Campaign strategy',intel:'Market & trend intelligence',directions:'Three creative directions',calendar:'Calendar batch (5 entries)',fix:'Fix one entry',regen:'Regenerate one entry',copy:'Copy variations',ads:'Ad kit',catalogue:'Catalogue batch (5 products)',advisor:'Growth advisor',command:'Command bar',scene:'Regenerate one scene'};
function settings(){let s=Store.get('settings');if(!s){s={id:'settings',type:'settings',rates:{...RATE_DEF},allowance:500};}s.rates={...RATE_DEF,...s.rates};return s}
function rate(k){if(window.VX_RATES&&window.VX_RATES[k]!=null)return window.VX_RATES[k];return settings().rates[k]??1}
function ledger(){return Store.get('ledger')||{id:'ledger',type:'ledger',months:{},recent:[]}}
function charge(action,chars){if(window.VX_HOSTED){if(window.VX&&VX.refresh)VX.refresh();return}const L=ledger(),m=todayISO().slice(0,7);const M=L.months[m]||(L.months[m]={calls:0,credits:0,chars:0});
  M.calls++;M.credits+=rate(action);M.chars+=chars;L.recent.unshift({at:Date.now(),action,credits:rate(action),chars});L.recent=L.recent.slice(0,60);Store.put(L);paintCredits()}
function monthUse(){return ledger().months[todayISO().slice(0,7)]||{calls:0,credits:0,chars:0}}
function paintCredits(){const el=q('#vxCredit');if(!el)return;if(window.VX_HOSTED){el.innerHTML=window.VX_BAL!=null?`<b>${Number(window.VX_BAL).toLocaleString('en-IN')}</b>credits available`:'';return}const u=monthUse(),s=settings();el.innerHTML=`<b>${u.credits} / ${s.allowance}</b>credits used this month`}

/* ============ Claude ============ */
let AIP=null;function aiNs(){if(!AIP)AIP=(window.claude&&claude.use)?withTimeout(claude.use('sample'),12000).catch(()=>null):Promise.resolve(null);return AIP}
function parseLoose(t){const a=t.indexOf('{'),b=t.lastIndexOf('}');if(a<0||b<a)throw{code:'bad_json',message:'The AI returned an unreadable answer'};const s=t.slice(a,b+1);try{return JSON.parse(s)}catch(e){
 /* models sometimes put raw line breaks or tabs inside strings, or leave a trailing comma: repair those before giving up */
 let o='',q=false,esc=false;for(const ch of s){if(q){if(esc){esc=false;o+=ch;continue}if(ch==='\\'){esc=true;o+=ch;continue}if(ch==='"'){q=false;o+=ch;continue}if(ch==='\n'){o+='\\n';continue}if(ch==='\r')continue;if(ch==='\t'){o+='\\t';continue}o+=ch}else{if(ch==='"')q=true;o+=ch}}
 o=o.replace(/,\s*([}\]])/g,'$1');try{return JSON.parse(o)}catch(e2){throw{code:'bad_json',message:'The AI returned an unreadable answer'}}}}
async function askJSON(action,input,opts={}){const s=await aiNs();if(!s)throw{code:'no_ai'};
  const o={modelTier:opts.tier||'default',cache:false,action};let v;
  try{v=await s.json(input,o)}catch(e){/* only retry an unreadable answer; a server or timeout error would charge again for nothing */if(e&&(['not_granted','rate_limited','no_ai','timeout','provider_error','insufficient_credits','unauthenticated'].includes(e.code)||e.status>=500))throw e;const r=await s(input,o);v=parseLoose(r.text||'')}
  if(!v||typeof v!=='object')throw{code:'bad_json'};
  charge(action,(typeof input==='string'?input.length:JSON.stringify(input).length)+JSON.stringify(v).length);return v}
function errText(e){const c=e&&e.code;return c==='no_ai'?'The AI is not available in this view.':c==='not_granted'?'AI access was declined for this page.':c==='rate_limited'?'The AI is busy. Wait a minute, then try again.':c==='bad_json'?'The AI returned something unreadable. Try again.':c==='timeout'?'The AI took too long to answer. You were not charged. Try again.':c==='insufficient_credits'?'Not enough credits. Top up in Settings → Billing.':(e&&e.message&&e.code==='provider_error')?'The AI service is unavailable: '+e.message:'Something went wrong with the AI. Try again.'}
function notify(s){if(typeof toast==='function')toast(s);else console.log(s)}

/* ============ Current brand / campaign ============ */
const cur={view:'home',brand:pref.get('brand',null),camp:pref.get('camp',null),calTab:pref.get('calTab','month'),sel:new Set(),wiz:null};
function brand(){return Store.get(cur.brand)||Store.all('brand')[0]||null}
function camps(b){b=b||brand();return Store.all('campaign').filter(c=>!b||c.brandId===b.id).sort((a,b2)=>b2.created-a.created)}
function camp(){const c=Store.get(cur.camp);const b=brand();if(c&&(!b||c.brandId===b.id))return c;return camps()[0]||null}
function items(c){c=c||camp();if(!c)return[];return Store.all('item').filter(i=>i.campaignId===c.id).sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:a.n-b.n)}
function setBrand(b){cur.brand=b?b.id:null;pref.set('brand',cur.brand);applyBrandToStudio()}
function setCamp(c){cur.camp=c?c.id:null;pref.set('camp',cur.camp)}

/* ============ Brand DNA ============ */
const DNA_FIELDS=[['purpose','Brand purpose','t',1],['mission','Mission','t'],['vision','Vision','t'],['value_prop','Value proposition','t',1],['positioning','Product positioning','t',1],['pricing','Pricing position','t'],
 ['personas','Customer personas','l'],['problems','Customer problems & aspirations','l'],['personality','Brand personality','t',1],['tone','Tone of voice','t',1],['archetype','Brand archetype','t'],
 ['typography','Typography','t'],['visual_language','Visual design language','t'],['differentiators','Product differentiators','l',1],['competitive','Competitive positioning','t'],
 ['emotional_triggers','Emotional triggers','l'],['approved_claims','Approved claims','l',1],['restricted_words','Restricted words & phrases','l',1],['cultural','Cultural sensitivities','l'],
 ['pillars','Content pillars','l',1],['cta_styles','Preferred call-to-action styles','l']];
const EXAMPLE_BRAND={name:'Maison Vela',handle:'@maisonvela',website:'https://maisonvela.example',industry:'Premium home fragrance',
 desc:'Maison Vela (a fictional example brand) makes hand-poured soy candles and room mists in small batches. Positioning: quiet luxury for everyday rituals. Personality: calm, warm, considered, modern. Visual style: soft natural light, linen and stone textures, generous negative space.',
 products:'Hand-poured soy candles (220g, 45-hour burn); reed diffusers; room mists; gift sets.',
 audience:'Women and men 25–45 in metros who furnish their homes thoughtfully and gift well.',competitors:'Jo Malone, Diptyque, Bombay Perfumery',
 guidelines:'Colours: Ink #1E2A3A, Wax Gold #C8A97E, Linen #F5F1EA. Typography: an elegant serif for headlines, a clean sans for text. Never use exclamation marks.',
 objective:'Launch the winter candle collection and grow gifting sales.'};
function newBrand(seed){return{id:'b_'+id6(),type:'brand',created:Date.now(),name:'',handle:'',website:'',industry:'',desc:'',products:'',audience:'',competitors:'',guidelines:'',objective:'',
  dna:null,src:{},locked:{},approved:false,versions:[],colors:{primary:'#1E2A3A',secondary:'#C8A97E',light:'#F5F1EA'},vault:{taglines:[],models:[],voices:[],licences:'',photos:[],logo:null},products_list:[],...seed}}
function dnaText(b){const d=b.dna||{};return DNA_FIELDS.map(([k,l])=>d[k]?`${l}: ${Array.isArray(d[k])?d[k].join('; '):d[k]}`:'').filter(Boolean).join('\n')}
function dnaComplete(b){if(!b||!b.dna)return 0;return Math.round(100*DNA_FIELDS.filter(([k])=>list(b.dna[k]).length).length/DNA_FIELDS.length)}
async function discoverDNA(b,onlyUnlocked){
  const keep=onlyUnlocked&&b.dna?Object.fromEntries(Object.entries(b.dna).filter(([k])=>b.locked[k])):{};
  const prompt=`You are a senior brand strategist. Build a Brand DNA profile ONLY from the material below. Do not invent facts, awards, numbers, testimonials or competitor data.
For every field say in "sources" whether it is "provided" (stated in the material) or "inferred" (your reasoned inference).
BRAND: ${b.name} ${b.handle||''}
INDUSTRY: ${b.industry}
WEBSITE (not visited; for reference only): ${b.website}
DESCRIPTION: ${b.desc}
PRODUCTS: ${b.products}
AUDIENCE: ${b.audience}
COMPETITORS NAMED BY THE USER: ${b.competitors}
GUIDELINES: ${b.guidelines}
${Object.keys(keep).length?'LOCKED ATTRIBUTES (keep exactly, stay consistent with them): '+JSON.stringify(keep):''}
Return ONLY JSON: {"dna":{"purpose":"","mission":"","vision":"","value_prop":"","positioning":"","pricing":"","personas":["Name — one-line description, problems, aspirations"],"problems":[""],"personality":"","tone":"","archetype":"","typography":"","visual_language":"","differentiators":[""],"competitive":"","emotional_triggers":[""],"approved_claims":["only claims supported by the material"],"restricted_words":["words/phrases the brand should avoid"],"cultural":[""],"pillars":["4-6 content pillars"],"cta_styles":[""]},"colors":{"primary":"#hex","secondary":"#hex","light":"#hex"},"sources":{"field":"provided|inferred"},"questions":["at most 3 essential questions for the owner"]}`;
  const v=await askJSON('dna',prompt,{tier:'default'});const d=v.dna||{};
  b.dna={...(b.dna||{}),...d,...keep};b.src={...b.src,...(v.sources||{})};Object.keys(keep).forEach(k=>b.src[k]='locked');
  const ok=x=>/^#[0-9a-f]{6}$/i.test(x||'');if(v.colors){['primary','secondary','light'].forEach(k=>{if(ok(v.colors[k])&&!b.locked['colors'])b.colors[k]=v.colors[k]})}
  b.questions=list(v.questions).slice(0,3);b.approved=false;b.versions.push({at:Date.now(),dna:JSON.parse(JSON.stringify(b.dna)),note:onlyUnlocked?'Regenerated unlocked attributes':'Discovered'});b.versions=b.versions.slice(-12);Store.put(b)}
function applyBrandToStudio(){const b=brand();if(!b||typeof KIT==='undefined')return;try{
  Object.assign(KIT,{primary:b.colors.primary,secondary:b.colors.secondary,light:b.colors.light});[['primary','k-primary'],['secondary','k-secondary'],['light','k-light']].forEach(([k,i])=>{const el=q('#'+i);if(el)el.value=KIT[k]});
  if(typeof setCopy==='function')setCopy({brand:b.name||state.copy.brand,handle:b.handle||state.copy.handle});syncLogo();if(typeof drawLogoPreview==='function')drawLogoPreview();if(typeof queueThumbs==='function')queueThumbs()}catch(e){}}

/* ============ Templates catalogue (from Vitrine) ============ */
function tplList(kind){try{return TPL.filter(t=>!kind||t.kind===kind)}catch(e){return[]}}
function tplCatalog(){return['reel','post'].map(k=>k.toUpperCase()+' TEMPLATES: '+tplList(k).filter(t=>!t.multi||t.multi<2).map(t=>`${t.sig?'★':''}${t.id}=${t.name}`).join('; ')).join('\n')+'\nPrefer ★ Signature templates for reels, shorts and stories; vary them across the calendar.'}
function tplFor(it){const want=['reel','short','story'].includes(it.format)?'reel':'post';const t=tplList(want).find(x=>x.id===it.template);return t||tplList(want).find(x=>!x.multi||x.multi<2)||tplList(want)[0]}

/* ============ Quality gates ============ */
const CLAIM_RX=/\b(guarantee[ds]?|best in the world|world'?s best|number one|#1|100%|cure[sd]?|miracle|cheapest|lowest price ever|clinically proven|risk[- ]free)\b/gi;
function itemText(it){return[it.headline,it.hook,it.caption,it.cta,...(it.scenes||[]).flatMap(s=>[s.on_screen,s.voiceover]),...(it.slides||[]).flatMap(s=>[s.headline,s.body]),...(it.frames||[]).map(f=>f.text)].filter(Boolean).join(' \n ')}
function quality(it,b){const C=[],add=(ok,label,cat='spec')=>C.push({ok:!!ok,label,cat});const cap=String(it.caption||''),tags=list(it.hashtags);
  add(cap.length>0&&cap.length<=2200,'Caption within 2,200 characters');
  add(cap.split('\n')[0].length<=125,'Caption opening line fits the 125-character preview');
  add(tags.length>=3&&tags.length<=5,'3 to 5 hashtags');add(words(it.cta)>0,'Call to action present');
  add(words(it.headline)>0&&words(it.headline)<=8,'Headline 8 words or fewer');add(words(it.hook)>0&&words(it.hook)<=12,'Hook 12 words or fewer');
  if(it.format==='reel'||it.format==='short'){const sc=it.scenes||[],tot=sc.reduce((a,s)=>a+(+s.t||0),0),d=+it.duration||tot;
    add(sc.length>=3,'At least 3 scenes');add(Math.abs(tot-d)<=1,`Scenes add up to ${d}s (now ${tot}s)`);add(sc[0]&&+sc[0].t<=3,'Hook scene 3 seconds or less');
    add(sc.every(s=>words(s.on_screen)<=7),'On-screen text 7 words or fewer per scene');add(sc.every(s=>words(s.voiceover)<=(+s.t||0)*2.7+2),'Voiceover fits its scene (about 2.5 words a second)');
    add(it.format==='short'?d<=60:d<=180,it.format==='short'?'Short is 60 seconds or less':'Reel is 3 minutes or less')}
  if(it.format==='carousel'){const s=it.slides||[];add(s.length>=3&&s.length<=10,'3 to 10 slides');add(s.every(x=>words(x.headline)<=8),'Slide headlines 8 words or fewer');add(s.every(x=>words(x.body)<=30),'Slide body 30 words or fewer')}
  if(it.format==='story'){const f=it.frames||[];add(f.length>=2&&f.length<=7,'2 to 7 frames');add(f.every(x=>+x.t>=3&&+x.t<=15),'Each frame 3 to 15 seconds');add(f.every(x=>words(x.text)<=12),'Frame text 12 words or fewer');add(f.some(x=>String(x.sticker||'').trim()),'At least one interactive sticker')}
  if(it.format==='post')add(words(it.visual)>=8,'Visual brief written (8+ words)');
  const txt=itemText(it),low=txt.toLowerCase(),dna=(b&&b.dna)||{};
  const bad=list(dna.restricted_words).filter(w=>w.length>2&&low.includes(w.toLowerCase()));add(!bad.length,bad.length?`Restricted words used: ${bad.slice(0,3).join(', ')}`:'No restricted words','brand');
  const approved=list(dna.approved_claims).join(' ').toLowerCase();const claims=[...new Set((txt.match(CLAIM_RX)||[]).map(x=>x.toLowerCase()))].filter(x=>!approved.includes(x));
  add(!claims.length,claims.length?`Unverified claim to review: "${claims[0]}"`:'No unverifiable claims','brand');
  add(!/["“][^"”]{8,}["”]\s*[—–-]\s*[A-Z][a-z]+/.test(txt),'No invented testimonials','brand');
  const nm=String(b?.name||'').toLowerCase(),hd=String(b?.handle||'').toLowerCase().replace('@','');add(!nm||low.includes(nm)||(hd&&low.includes(hd))||tags.some(t=>t.toLowerCase().includes(nm.replace(/\s/g,''))),'Brand name or handle appears','brand');
  const spec=C.filter(c=>c.cat==='spec'),br=C.filter(c=>c.cat==='brand');
  return{checks:C,score:Math.round(100*C.filter(c=>c.ok).length/C.length),integrity:Math.round(100*br.filter(c=>c.ok).length/br.length),specOk:spec.every(c=>c.ok),allOk:C.every(c=>c.ok),vpi:vpi(it)}}
function vpi(it){const F=[];const hk=String(it.hook||'');const add=(ok,pts,label)=>F.push({ok:!!ok,pts,label});
  add(words(hk)>0&&words(hk)<=8,20,'Hook is 8 words or fewer');add(/\?|\d|\byou(r)?\b/i.test(hk),15,'Hook uses a question, number or "you"');
  add(it.scenes?.[0]?+it.scenes[0].t<=2:it.slides?.[0]?words(it.slides[0].headline)<=6:words(it.headline)<=6,15,'Opening lands in 2 seconds or 6 words');
  add((it.scenes||[]).length?it.scenes.every(s=>words(s.on_screen)>0):true,10,'Text on screen throughout (sound-off viewing)');
  add(/\b(shop|save|share|comment|tap|follow|dm|book|discover|watch|swipe)\b/i.test(it.cta||''),10,'Action-verb call to action');
  add(/\b(save|share|send|tag)\b/i.test(it.caption||''),10,'Caption invites saves or shares');
  add(/\b(woven|touch|light|feel|story|secret|hands|heirloom|why|pov|wait|behind)\b/i.test(itemText(it)),20,'Curiosity or sensory language');
  return{score:F.filter(f=>f.ok).reduce((a,f)=>a+f.pts,0),factors:F}}
function runQA(it){const b=brand();it.qa=quality(it,b);if(['Draft','Generated','Quality checked'].includes(it.status))it.status=it.qa.allOk?'Quality checked':'Generated';return it.qa}

/* ============ Prompts for campaign generation ============ */
function brandBrief(b){const gx=window.KATHAVI_GENOME?window.KATHAVI_GENOME(b):'';return`BRAND: ${b.name} ${b.handle||''} — ${b.industry}\n${b.desc}\nPRODUCTS: ${b.products}\nAUDIENCE: ${b.audience}\nBRAND DNA (approved=${!!b.approved}):\n${dnaText(b)}${gx?'\nBRAND GENOME (decisions the owner accepted; follow them):\n'+gx:''}`}
async function genStrategy(c,b){const v=await askJSON('strategy',`You are a world-class marketing strategist. Build the campaign strategy. Choose only the frameworks that fit this problem (STP, AIDA, PAS, Jobs to Be Done, customer journey, funnel, Hero-Hub-Help, content pillars, behavioural economics, ethical persuasion) and say why. Never invent market data, metrics or testimonials.
${brandBrief(b)}
CAMPAIGN: ${c.name}. Objective: ${c.objective}. Duration ${c.duration} days from ${c.start}. Channels: ${c.channels.join(', ')}. Reel length: ${+c.reelLen>0?c.reelLen+' seconds':'mixed 15s and 30s'}. Content mix: ${Object.entries(c.mix).filter(([,n])=>n).map(([k,n])=>n+' '+k).join(', ')}.
Creative thought from the owner: ${c.notes||'none'}
Return ONLY JSON: {"summary":"2 sentences","frameworks":[{"name":"","why":""}],"audience":[{"segment":"","why":"","funnel":"Awareness|Consideration|Conversion|Retention"}],"proposition":"","creative_direction":"","key_messages":["4-6"],"pillars":["4-5 content pillars for this campaign"],"platform_strategy":[{"platform":"","role":"","formats":""}],"journey":["step"],"success_metrics":[{"metric":"","target":"suggested target, marked as a hypothesis","why":""}],"budget":[{"scenario":"Lean|Balanced|Accelerated","monthly_inr":0,"split":""}],"experiments":[{"hypothesis":"","test":"","measure":""}],"measurement_plan":["how to measure each metric with which tool"]}`,{tier:'default'});c.strategy=v;Store.put(c)}
async function genIntel(c,b){const v=await askJSON('intel',`You are a market research analyst. You have NO web access and no analytics data. Using only general knowledge and the brand material below, write a marketing intelligence brief. Label every point honestly: "verified" ONLY if it is stated in the brand material below, "hypothesis" for your reasoned assumptions, "unavailable" for things that need real data (name the data needed). Never fabricate numbers, competitor metrics or sentiment.
${brandBrief(b)}
Competitors named by the owner: ${b.competitors||'none'}
Campaign: ${c.objective}, ${c.duration} days from ${c.start}, India-first.
Return ONLY JSON: {"sections":[{"title":"What customers care about|What competitors communicate|Where differentiation is possible|Content the brand should create|Audiences to prioritise|Channels to use|Campaign angles","points":[{"text":"","label":"verified|hypothesis|unavailable"}]}],"trends":[{"name":"","type":"format|topic|seasonal|cultural|visual","window":"month or date range","scores":{"brand":1,"audience":1,"timeliness":1,"creative":1,"commercial":1,"complexity":1,"confidence":1},"recommendation":"participate|adapt|ignore","why":""}]}
Scores are 1-5 (complexity: 5 = easiest). Give 6 trends. Seasonal events must be real Indian or global occasions in the campaign window.`);c.intel=v;Store.put(c)}
async function genDirections(c,b){const v=await askJSON('directions',`You are a world-class creative director (fashion photography, cinematography, consumer psychology). Propose THREE materially different creative directions for this campaign. Avoid generic AI aesthetics.
${brandBrief(b)}
Campaign: ${c.name} — ${c.objective}. Proposition: ${c.strategy?.proposition||''}. Key messages: ${list(c.strategy?.key_messages).join('; ')}
Return ONLY JSON: {"directions":[{"name":"2-4 words","style":"e.g. Editorial photography|Luxury minimalism|Cinematic storytelling|Emotional storytelling|Cultural storytelling|Product-led|UGC-inspired|Motion graphics","rationale":"","art_direction":"","moodboard":["5 concrete reference images to shoot or find"],"colours":["#hex","#hex","#hex","#hex"],"colour_treatment":"","typography":"","composition":"","lighting":"","camera":"","styling":"","background":"","narrative":"","consistency":["rules every asset must follow"]}]}`,{tier:'default'});c.directions=(v.directions||[]).slice(0,3);c.dir=null;Store.put(c)}
function slotPlan(c){const mix=Object.entries(c.mix).filter(([,n])=>n>0);const total=mix.reduce((a,[,n])=>a+n,0);const seq=[];const left=Object.fromEntries(mix);
  while(seq.length<total){for(const [k] of mix){if(left[k]>0&&seq.length<total){seq.push(k);left[k]--}}}
  return seq.map((f,i)=>({n:i+1,format:f,date:addDays(c.start,Math.floor(i*c.duration/total)),platform:f==='short'?'YouTube':(c.channels.includes('Instagram')||!c.channels.length?'Instagram':c.channels[0]),duration:f==='reel'||f==='short'?reelDur(c,f,i):undefined}))}
function reelDur(c,f,i){const L=+c.reelLen;let d=L>0?L:(i%3===0?30:15);if(f==='short')d=Math.min(60,d);return d}
const ITEM_SCHEMA=`{"n":0,"title":"","objective":"","persona":"","pillar":"","funnel":"Awareness|Consideration|Conversion|Retention","headline":"max 8 words","hook":"max 10 words","details":["3 short product/craft details, max 3 words each"],"brief":"creative brief, 2 sentences","visual":"visual requirements, art-directed","caption":"first line max 125 chars, \\n line breaks","cta":"","hashtags":["3-5, no #"],"window":"recommended publishing window, e.g. Tue 7-9pm IST","hypothesis":"what we expect and why (hypothesis)","template":"template id from the catalogue",
 "scenes":[{"t":3,"visual":"","on_screen":"max 7 words","voiceover":"max 2.5 words per second","ai_prompt":"30+ word production prompt for an AI video model incl. 9:16"}] (reel/short only; t sums to duration; first t<=3),
 "slides":[{"headline":"max 8 words","body":"max 25 words"}] (carousel only, 5-8 slides),
 "frames":[{"t":5,"text":"max 12 words","sticker":"poll/quiz/link or empty"}] (story only, 3-5 frames)}`;
async function genBatch(c,b,slots){const dir=c.directions?.[c.dir]||{};
  const v=await askJSON('calendar',`You are the content lead of a world-class creative department. Write finished, ready-to-publish calendar entries.
${brandBrief(b)}
CAMPAIGN: ${c.name} — ${c.objective}. Proposition: ${c.strategy?.proposition||''}. Key messages: ${list(c.strategy?.key_messages).join('; ')}. Pillars: ${list(c.strategy?.pillars).join('; ')}.
CHOSEN CREATIVE DIRECTION: ${dir.name||''} — ${dir.art_direction||''} Lighting: ${dir.lighting||''} Narrative: ${dir.narrative||''}
RULES: real specific copy, no placeholders; no invented testimonials, prices, discounts or claims beyond the approved claims; avoid restricted words; language: ${c.language||'English'}.
${tplCatalog()}
Pick a REEL template for reel/short/story and a POST template for post/carousel.
Write these ${slots.length} entries (keep n, format, date, platform, duration as given): ${JSON.stringify(slots)}
Return ONLY JSON: {"items":[${ITEM_SCHEMA}]}`);
  return(v.items||[]).filter(x=>x&&x.n!=null)}
function mkItem(c,slot,x){const it={id:'i_'+c.id.slice(2)+'_'+slot.n,type:'item',campaignId:c.id,n:slot.n,format:slot.format,date:slot.date,platform:slot.platform,duration:slot.duration,status:'Draft',created:Date.now()};
  Object.assign(it,sanitize(x,slot));return it}
function sanitize(x,slot){const o={};['title','objective','persona','pillar','funnel','headline','hook','brief','visual','caption','cta','window','hypothesis','template'].forEach(k=>o[k]=String(x[k]??''));
  o.details=list(x.details).slice(0,3);o.hashtags=list(x.hashtags).map(t=>t.replace(/^#/,'').replace(/\s+/g,''));
  if(slot.format==='reel'||slot.format==='short'){o.scenes=(x.scenes||[]).map(s=>({t:+s.t||3,visual:String(s.visual||''),on_screen:String(s.on_screen||''),voiceover:String(s.voiceover||''),ai_prompt:String(s.ai_prompt||'')}));o.duration=+slot.duration||o.scenes.reduce((a,s)=>a+s.t,0)}
  if(slot.format==='carousel')o.slides=(x.slides||[]).map(s=>({headline:String(s.headline||''),body:String(s.body||'')}));
  if(slot.format==='story')o.frames=(x.frames||[]).map(f=>({t:+f.t||5,text:String(f.text||''),sticker:String(f.sticker||'')}));return o}
function itemJSON(it){const o={n:it.n,format:it.format,date:it.date,platform:it.platform,duration:it.duration};['title','objective','persona','pillar','funnel','headline','hook','details','brief','visual','caption','cta','hashtags','window','hypothesis','template','scenes','slides','frames'].forEach(k=>{if(it[k]!=null)o[k]=it[k]});return o}
async function fixItem(it,action='fix'){const b=brand(),c=Store.get(it.campaignId);const fails=(it.qa?.checks||[]).filter(x=>!x.ok).map(x=>x.label);
  const ask=action==='regen'?`Rewrite this entry with a fresh, stronger idea that fits the same slot.`:`These quality checks failed:\n- ${fails.join('\n- ')}\nFix every one, keep everything that already works.`;
  const v=await askJSON(action,`You are the content lead. ${ask}
${brandBrief(b)}
Campaign: ${c?.name} — ${c?.objective}. Direction: ${c?.directions?.[c.dir]?.name||''}.
ENTRY: ${JSON.stringify(itemJSON(it))}
Return ONLY JSON of the complete corrected entry, same shape: ${ITEM_SCHEMA}`);
  Object.assign(it,sanitize(v.item||v,it));runQA(it);Store.put(it);return it}

/* ============ Views ============ */
const ICON={home:'M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',brands:'M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.6 6.5 19.5l1-6.3L3 8.9 9 8z',campaigns:'M4 5h16M4 12h16M4 19h10',calendar:'M5 5h14v15H5zM5 10h14M9 3v4M15 3v4',studio:'M4 4h16v12H4zM8 20h8M12 16v4',images:'M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4',video:'M4 6h11v12H4zM15 10l5-3v10l-5-3',reels:'M4 4h16v16H4zM8 4v16M16 4v16M10.5 9.5l3 2.5-3 2.5z',more:'M5 12h.01M12 12h.01M19 12h.01',copy:'M5 4h10l4 4v12H5zM9 12h6M9 16h6',voice:'M12 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3zM5 11a7 7 0 0014 0M12 18v3',ads:'M4 10v4l10 5V5L4 10zM18 9a4 4 0 010 6',catalogue:'M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10',vault:'M5 4h14v16H5zM12 10a2 2 0 100 4 2 2 0 000-4z',analytics:'M4 20V10M10 20V4M16 20v-7M21 20H3',automations:'M4 12a8 8 0 0114-5l2-2v6h-6l2-2a5 5 0 10.5 6',account:'M12 8a4 4 0 100 8 4 4 0 000-8zM3 12h2M19 12h2M12 3v2M12 19v2'};
const NAV=[['home','Journey','j'],['dashboard','Brand Dashboard','j'],['grow','Grow','j'],['discover','Discover','s'],['define','Define','s'],['design','Design','s'],['create','Create','s'],['experience','Experience','s'],['launch','Launch','s'],['learn','Learn','s'],['genome','Brand Genome','j'],
 ['today','Today','t'],['brands','My Brands','t'],['campaigns','Campaigns','t'],['calendar','Content Calendar','t'],['studio','Creative Studio','t'],['images','Image Studio','t'],['video','Video Studio','t'],['reels','Reel Studio','t'],['copy','Copy Studio','t'],['voice','Voice Studio','t'],['ads','Ad Studio','t'],['catalogue','Product Catalogue','t'],['vault','Brand Vault','t'],['analytics','Analytics','t'],['automations','Automations','t'],['account','Settings','x']];
function svg(k){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICON[k]}"/></svg>`}
/* Navigation follows the brand journey: Journey, the seven stages, the Brand Genome, then the studio tools (folded away) and settings. */
function buildNav(){const open=pref.get('navTools',false)||NAV.some(n=>n[2]==='t'&&n[0]===cur.view);const M=['home','dashboard','grow','genome'];
 const btn=([k,l,g],i)=>`<button class="vx-nav${g==='s'?' vx-stage':''}" type="button" data-go="${k}"${M.includes(k)?' data-m="1"':''}>${g==='s'?`<span class="vx-sn">${NAV.filter(n=>n[2]==='s').findIndex(n=>n[0]===k)+1}</span>`:svg(k)}<span>${l}</span></button>`;
 const grp=g=>NAV.filter(n=>(n[2]||'x')===g);
 q('#vxNav').innerHTML=btn(grp('j')[0])+btn(grp('j')[1])+`<div class="vx-navlab">Brand journey</div>`+grp('s').map(btn).join('')+btn(grp('j')[2])+'<hr>'+
  `<button class="vx-nav vx-navtog" type="button" data-act="navtools" aria-expanded="${open}">${svg('more')}<span>Studio tools</span><b aria-hidden="true">${open?'–':'+'}</b></button><div class="vx-navgrp"${open?'':' hidden'}>${grp('t').map(btn).join('')}</div><hr>`+
  grp('x').map(btn).join('')+`<button class="vx-nav vx-more" type="button" data-act="navmore" aria-expanded="false">${svg('more')}<span>More</span></button>`}
function go(v,opts){if(!NAV.some(n=>n[0]===v))v='home';cur.view=v;if(NAV.some(n=>n[0]===v&&n[2]==='t')){const tg=q('.vx-navgrp'),tb=q('.vx-navtog');if(tg&&tg.hidden){tg.hidden=false;if(tb){tb.setAttribute('aria-expanded','true');tb.querySelector('b').textContent='–'}}}{const r=q('.vx-rail');if(r)r.classList.remove('more-open');const mb=q('.vx-more');if(mb)mb.setAttribute('aria-expanded','false')}qa('.vx-nav').forEach(b=>b.setAttribute('aria-current',b.dataset.go===v?'page':'false'));
  qa('.vx-view').forEach(s=>{const on=s.id==='view-'+v;s.hidden=!on;if(!on&&s.id!=='view-studio')s.innerHTML=''});if(location.hash!=='#'+v)history.replaceState(null,'','#'+v);
  if(v==='studio'){setTimeout(()=>{try{resize()}catch(e){}},30)}else render(v,opts);const el=q('#view-'+v);if(el)el.scrollTop=0}
function render(v,opts){const f=VIEWS[v];if(!f)return;const el=q('#view-'+v);el.innerHTML=f(opts)||'';if(AFTER[v])AFTER[v](el,opts);el.querySelectorAll('textarea[data-dna]').forEach(fitTa)}
function fitTa(t){t.style.height='auto';t.style.height=(t.scrollHeight+2)+'px'}
document.addEventListener('input',e=>{if(e.target.matches&&e.target.matches('textarea[data-dna]'))fitTa(e.target)})
function rerender(){render(cur.view)}
function done(stId,text){rerender();const s=q('#'+stId);if(s)s.textContent=text}
const VIEWS={},AFTER={};
function head(title,sub,right=''){return`<div class="vx-head"><div><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}</div><div class="vx-row">${right}</div></div>`}
function needBrand(){return`<div class="vx-card vx-empty vx-wrap"><h2>Start with your brand</h2><p>Describe your idea in a line and Kathavi\u2019s specialists build the brand with you, one decision at a time. Every studio then works from it.</p><div class="vx-row" style="justify-content:center"><button class="vx-btn pri" data-act="go" data-v="home" type="button">Start my brand</button><button class="vx-btn" data-act="go" data-v="brands" type="button">I already have Brand DNA</button></div></div>`}
function needCamp(){return`<div class="vx-card vx-empty vx-wrap"><h2>No campaign yet</h2><p>Plan one and Kathavi will write the strategy, creative directions and the full calendar.</p><div class="vx-row" style="justify-content:center"><button class="vx-btn pri" data-act="newcamp" type="button">Plan a campaign</button></div></div>`}
function campPicker(){const cs=camps();if(!cs.length)return'';const c=camp();return`<select data-act="pickcamp" aria-label="Campaign" style="width:auto;min-width:220px">${cs.map(x=>`<option value="${x.id}" ${c&&x.id===c.id?'selected':''}>${h(x.name)}${x.paused?' (paused)':''}</option>`).join('')}</select>`}
function chip(t,cls=''){return`<span class="vx-chip ${cls}">${h(t)}</span>`}
function scoreChip(s){return chip(s+'%',s>=100?'ok':s>=80?'warn':'bad')}

/* ---- Home ---- */
VIEWS.today=()=>{const b=brand(),c=camp(),its=items(c),u=monthUse(),s=settings();
  const appr=its.filter(i=>['Approved','Scheduled','Published','Analysed','Optimised'].includes(i.status)).length;
  const up=Store.all('item').filter(i=>i.date>=todayISO()&&!Store.get(i.campaignId)?.paused).sort((a,b2)=>a.date<b2.date?-1:1).slice(0,6);
  const next=[];if(!b)next.push(['Set up your Brand DNA','brands']);else{if(!b.dna)next.push(['Discover your Brand DNA','brands']);else if(!b.approved)next.push(['Review and approve your Brand DNA','brands']);
    if(!b.vault?.photos?.length)next.push(['Add product photos to the Brand Vault','vault']);if(!c)next.push(['Plan your first campaign','campaigns']);}
  if(c){if(!its.length)next.unshift(['Generate the content calendar for "'+c.name+'"','calendar']);const fails=its.filter(i=>i.qa&&!i.qa.allOk).length;if(fails)next.push([`Fix ${fails} entries that fail quality checks`,'calendar']);const wait=its.filter(i=>i.status==='Quality checked').length;if(wait)next.push([`Approve ${wait} quality-checked entries`,'calendar']);
    const reels=its.filter(i=>(i.format==='reel'||i.format==='short')&&['Approved','Quality checked'].includes(i.status)&&!Session.assets.get(i.id));if(reels.length)next.push([`Render ${reels.length} reels in the Video Studio`,'video'])}
  const recent=[...Session.assets.values()].flat().slice(-8).reverse();
  return`<section class="vx-hero"><svg class="deco" viewBox="0 0 340 300" aria-hidden="true">${[[150,40,-8,'var(--vx-soft)'],[95,60,-2,'var(--vx-sand)'],[40,78,5,'var(--vx-ink)']].map(([x,y,r,f],i)=>`<g transform="rotate(${r} ${x+75} ${y+100})"><rect x="${x}" y="${y}" width="150" height="200" rx="14" fill="${f}" stroke="var(--vx-line)"/>${i===2?`<text x="${x+18}" y="${y+170}" font-family="Instrument Serif,serif" font-style="italic" font-size="34" fill="var(--vx-acc-ink)">Reel</text><text x="${x+18}" y="${y+30}" font-family="IBM Plex Mono,monospace" font-size="10" letter-spacing="1" fill="var(--vx-acc-ink)" opacity=".7">9:16 · 15S</text>`:''}</g>`).join('')}</svg>
   <small>Your AI creative department${b?' · '+h(b.name):''}</small><h1>What are we <em>creating</em> today?</h1>
   <form class="vx-cmd" data-form="cmd"><textarea id="vxCmd" aria-label="Describe what you want to create" placeholder="Create a 30-day premium Instagram campaign for my new collection, using minimalist editorial photography and cinematic reels"></textarea><button class="vx-btn pri" type="submit">Create</button></form>
   <div class="vx-quick"><button type="button" data-act="newcamp">Plan a campaign</button><button type="button" data-act="go" data-v="reels">Create a reel</button><button type="button" data-act="go" data-v="studio">Design a creative</button><button type="button" data-act="go" data-v="ads">Launch an ad</button><button type="button" data-act="go" data-v="copy">Write copy</button></div>
   <p class="vx-status" id="cmdStatus" style="color:var(--vx-mute);margin:10px 0 0"></p></section>
  <div class="vx-two vx-wrap" style="margin-top:18px"><div>
   ${c?`<div class="vx-card"><h2><span>${h(c.name)}</span>${chip(c.paused?'Paused':'In production',c.paused?'warn':'acc')}</h2><p class="vx-muted vx-small" style="margin:0">${h(c.duration)}-day ${h(c.objective.toLowerCase())} · ${h(c.channels.join(', '))}${c.directions?.[c.dir]?' · '+h(c.directions[c.dir].name):''}</p>
     <div class="vx-stats"><div class="vx-stat"><b>${its.length}</b><span>Content planned</span></div><div class="vx-stat"><b>${its.filter(i=>i.format==='reel'||i.format==='short').length}</b><span>Reels planned</span></div><div class="vx-stat"><b>${(Store.get('a_'+c.id)?.matrix||[]).length}</b><span>Ad variants</span></div><div class="vx-stat"><b>${appr}</b><span>Approved</span></div></div>
     <div class="vx-meter" role="img" aria-label="${appr} of ${its.length} approved"><i style="width:${its.length?appr/its.length*100:0}%"></i></div><p class="vx-small vx-muted">${appr} of ${its.length} content items approved</p>
     <div class="vx-row"><button class="vx-btn sm" data-act="go" data-v="calendar" type="button">Open calendar</button><button class="vx-btn sm" data-act="go" data-v="campaigns" type="button">Strategy</button><button class="vx-btn sm" data-act="zip" type="button">Download package</button></div></div>`:b?needCamp():needBrand()}
   <div class="vx-card"><h2>Upcoming content</h2>${up.length?`<ul class="vx-list">${up.map(i=>`<li><span class="when">${fmtD(i.date)}</span><span style="flex:1">${h(i.headline||i.title)}<br><span class="vx-small vx-muted">${FORMATS[i.format]} · ${h(i.platform)}</span></span>${chip(i.status,i.status==='Approved'?'ok':'')}<button class="vx-btn sm" data-act="open" data-id="${i.id}" type="button">Open</button></li>`).join('')}</ul>`:'<p class="vx-muted">Nothing scheduled yet.</p>'}</div>
   <div class="vx-card"><h2>Recently generated assets</h2>${recent.length?`<div class="vx-thumbs">${recent.map(a=>a.kind==='video'?`<video src="${a.url}" muted playsinline></video>`:`<img src="${a.url}" alt="${h(a.name)}">`).join('')}</div>`:'<p class="vx-muted">Renders from this session appear here.</p>'}</div>
  </div><div>
   <div class="vx-card"><h2>Recommended next</h2>${next.length?`<ul class="vx-list">${next.slice(0,5).map(([t,v],i)=>`<li><span style="flex:1">${i===0?'<b>'+h(t)+'</b>':h(t)}</span><button class="vx-btn sm${i===0?' pri':''}" data-act="go" data-v="${v}" type="button">${i===0?'Start':'Go'}</button></li>`).join('')}</ul>`:'<p class="vx-muted">You are up to date.</p>'}</div>
   <div class="vx-card"><h2>Brand health</h2>${b?`<p class="vx-small" style="margin:0 0 6px">Brand DNA ${dnaComplete(b)}% complete · ${b.approved?chip('Approved','ok'):chip('Not approved','warn')} · ${Object.values(b.locked||{}).filter(Boolean).length} attributes locked</p>
     <div class="vx-meter"><i style="width:${dnaComplete(b)}%"></i></div>${its.length?`<p class="vx-small">Average Brand Integrity across this campaign: <b>${Math.round(its.reduce((a,i)=>a+(i.qa?.integrity||0),0)/its.length)}%</b></p>`:''}`:'<p class="vx-muted">No brand yet.</p>'}</div>
   <div class="vx-card"><h2>Credits</h2>${window.VX_HOSTED?`<p style="margin:0"><b style="font:800 30px var(--vx-disp)">${Number(window.VX_BAL||0).toLocaleString('en-IN')}</b> <span class="vx-muted">credits available</span></p><div class="vx-row" style="margin-top:8px"><button class="vx-btn sm" data-act="go" data-v="account" type="button">Buy credits</button></div>`:`<p style="margin:0"><b style="font:800 30px var(--vx-disp)">${u.credits}</b> <span class="vx-muted">of ${s.allowance} used this month · ${u.calls} AI calls</span></p><div class="vx-meter" style="margin-top:8px"><i style="width:${Math.min(100,u.credits/s.allowance*100)}%;background:var(--vx-acc)"></i></div>`}<p class="vx-small vx-muted">Credits measure AI work. Rendering in your browser is free.</p></div>
  </div></div>`};

/* ---- Brands ---- */
VIEWS.brands=()=>{const bs=Store.all('brand'),b=brand();
  if(!b||cur.newBrand)return head('Tell us about your business','Paste whatever you have: a description, product list, your About page text, guidelines. Kathavi only uses what you provide.')+brandForm(cur.newBrand||newBrand());
  const d=b.dna;return head(h(b.name)+' Brand DNA',`${dnaComplete(b)}% complete · ${b.versions.length} version${b.versions.length===1?'':'s'} · ${b.approved?'approved':'not yet approved'}`,
   `${bs.length>1?`<select data-act="pickbrand" aria-label="Brand" style="width:auto">${bs.map(x=>`<option value="${x.id}" ${x.id===b.id?'selected':''}>${h(x.name)}</option>`).join('')}</select>`:''}<button class="vx-btn" data-act="addbrand" type="button">Add brand</button><button class="vx-btn" data-act="editsrc" type="button">Edit inputs</button>`)
  +`<div class="vx-wrap">${!d?`<div class="vx-card"><h2>Discover the Brand DNA</h2><p>Kathavi reads your inputs and drafts every attribute, marking what came from you and what it inferred.</p><div class="vx-row"><button class="vx-btn pri" data-act="dna" type="button">Discover my brand · ${rate('dna')} credits</button><span class="vx-status" id="dnaSt"></span></div></div>`:
   `<div class="vx-card"><h2><span>Review, correct and lock</span><span class="vx-row"><button class="vx-btn sm" data-act="dna" data-unlocked="1" type="button">Regenerate unlocked · ${rate('dna')} credits</button><button class="vx-btn sm pri" data-act="approvedna" type="button">${b.approved?'Approved ✓':'Approve Brand DNA'}</button></span></h2>
    <p class="vx-small vx-muted" style="margin-top:0">Locked attributes are never changed by AI. Every campaign, script and caption uses the approved version.</p><span class="vx-status" id="dnaSt"></span>
    ${b.questions?.length?`<div class="vx-note"><b>Kathavi would like to know:</b><ul style="margin:4px 0 0">${b.questions.map(x=>`<li>${h(x)}</li>`).join('')}</ul>Add the answers to your inputs and regenerate.</div>`:''}
    <div class="vx-f"><span class="vx-lab">Brand colours</span><div class="vx-row">${['primary','secondary','light'].map(k=>`<label class="vx-tog"><input type="color" data-bcol="${k}" value="${h(b.colors[k])}"> ${k==='light'?'Light':k[0].toUpperCase()+k.slice(1)}</label>`).join('')}<label class="vx-tog"><input type="checkbox" data-lock="colors" ${b.locked.colors?'checked':''}> Lock</label></div></div>
    <div class="vx-dna">${DNA_FIELDS.map(([k,l,t,crit])=>{const v=d[k];const val=Array.isArray(v)?v.join('\n'):(v||'');const src=b.src?.[k];
      return`<div class="vx-attr ${b.locked[k]?'locked':''}"><header><b>${l}${crit?' *':''}</b><span class="vx-row">${src?`<span class="vx-tag ${src==='inferred'?'hyp':'ver'}">${src==='inferred'?'AI inference':src==='locked'?'Locked':'From your input'}</span>`:''}<label class="vx-tog"><input type="checkbox" data-lock="${k}" ${b.locked[k]?'checked':''}> Lock</label></span></header>
      <textarea data-dna="${k}" data-list="${t==='l'?1:''}" aria-label="${l}" ${b.locked[k]?'readonly':''}>${h(val)}</textarea></div>`}).join('')}</div>
    <p class="vx-small vx-muted">* Critical attributes. Lists take one item per line.</p></div>
   <div class="vx-card"><h2>Version history</h2><table class="vx-table"><thead><tr><th>When</th><th>Change</th><th></th></tr></thead><tbody>${b.versions.slice().reverse().map((x,i)=>`<tr><td>${new Date(x.at).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})}</td><td>${h(x.note)}</td><td class="n">${i?`<button class="vx-btn sm" data-act="restoredna" data-i="${b.versions.length-1-i}" type="button">Restore</button>`:'Current'}</td></tr>`).join('')}</tbody></table></div>`}</div>`};
function brandForm(b){return`<form class="vx-card vx-wrap" data-form="brand"><input type="hidden" name="id" value="${b.id}"><div class="vx-fields">
  <div class="vx-f"><label for="bf-name">Business name</label><input type="text" id="bf-name" name="name" value="${h(b.name)}" required></div>
  <div class="vx-f"><label for="bf-handle">Social handle</label><input type="text" id="bf-handle" name="handle" value="${h(b.handle)}"></div>
  <div class="vx-f"><label for="bf-web">Website</label><input type="url" id="bf-web" name="website" value="${h(b.website)}" placeholder="https://"></div>
  <div class="vx-f"><label for="bf-ind">Industry</label><input type="text" id="bf-ind" name="industry" value="${h(b.industry)}"></div></div>
  <div class="vx-f"><label for="bf-desc">Business description, positioning, personality, a simple thought — anything</label><textarea id="bf-desc" name="desc">${h(b.desc)}</textarea></div>
  <div class="vx-fields"><div class="vx-f"><label for="bf-prod">Products</label><textarea id="bf-prod" name="products">${h(b.products)}</textarea></div>
  <div class="vx-f"><label for="bf-aud">Target audience</label><textarea id="bf-aud" name="audience">${h(b.audience)}</textarea></div>
  <div class="vx-f"><label for="bf-comp">Competitors</label><textarea id="bf-comp" name="competitors">${h(b.competitors)}</textarea></div>
  <div class="vx-f"><label for="bf-guide">Existing brand guidelines (colours, fonts, do's and don'ts)</label><textarea id="bf-guide" name="guidelines">${h(b.guidelines)}</textarea></div>
</div>
   ${dropField({id:'bf-logo',name:'logo',label:'Logo',accept:'image/png,image/jpeg,image/webp,image/svg+xml',title:'Drop your logo here',hint:'PNG or SVG with a transparent background works best · optional',current:b.vault?.logo?.url,currentName:b.vault?.logo?.name,mono:(b.name||'').trim().charAt(0).toUpperCase()||null,wide:true})}
  <p class="vx-note">Kathavi can't open websites from inside this page, so it never claims to have read yours. Paste the text you want analysed.</p>
  <div class="vx-row"><button class="vx-btn pri" type="submit">Save and discover Brand DNA · ${rate('dna')} credits</button><button class="vx-btn" type="button" data-act="example">Fill with an example brand</button>${Store.all('brand').length?'<button class="vx-btn" type="button" data-act="cancelbrand">Cancel</button>':''}<span class="vx-status" id="dnaSt"></span></div></form>`}

/* ---- Campaigns ---- */
VIEWS.campaigns=()=>{const b=brand();if(!b)return head('Campaigns')+needBrand();const c=camp();
  if(cur.wiz||!c)return head('Plan a campaign','Thought → strategy → creative concept → content. You see the cost before anything is generated.')+wizard(b);
  const st=c.strategy,step=cur.cstep||'strategy';
  return head(h(c.name),`${h(c.objective)} · ${c.duration} days from ${fmtD(c.start)} · ${h(c.channels.join(', '))}`,`${campPicker()}<button class="vx-btn" data-act="newcamp" type="button">New campaign</button>`)
  +`<div class="vx-wrap"><div class="vx-steps" role="tablist">${[['strategy','Strategy'],['intel','Intelligence & trends'],['dirs','Creative directions'],['gen','Calendar production'],['measure','Measurement']].map(([k,l])=>`<button type="button" role="tab" data-act="cstep" data-s="${k}" aria-current="${k===step?'step':'false'}">${l}</button>`).join('')}</div>
  <div class="vx-row" style="margin-bottom:12px"><button class="vx-btn sm" data-act="pause" type="button">${c.paused?'Resume campaign':'Pause campaign'}</button><button class="vx-btn sm" data-act="dupcamp" type="button">Duplicate</button><button class="vx-btn sm" data-act="zip" type="button">Download package</button><button class="vx-btn sm" data-act="renamecamp" type="button">Rename</button><button class="vx-btn sm vx-danger" data-act="delcamp" type="button" style="margin-left:auto">Delete campaign…</button></div>${titleFix(c)}
  ${step==='strategy'?(st?stratHTML(st):genBtn('strategy','Write the strategy')):''}
  ${step==='intel'?(c.intel?intelHTML(c.intel):genBtn('intel','Build intelligence brief')):''}
  ${step==='dirs'?dirsHTML(c):''}${step==='gen'?genHTML(c):''}${step==='measure'?(st?`<div class="vx-card vx-prose"><h2>Measurement plan</h2><table class="vx-table stack"><thead><tr><th>Metric</th><th>Target (hypothesis)</th><th>Why</th></tr></thead><tbody>${(st.success_metrics||[]).map(m=>`<tr><td>${h(m.metric)}</td><td>${h(m.target)}</td><td>${h(m.why)}</td></tr>`).join('')}</tbody></table><h3>How to measure</h3><ul>${list(st.measurement_plan).map(x=>`<li>${h(x)}</li>`).join('')}</ul><p class="vx-small vx-muted">Targets are hypotheses until real results come in. Log results in Analytics.</p></div>`:genBtn('strategy','Write the strategy')):''}
  <span class="vx-status" id="campSt"></span></div>`};
function titleFix(c){const t=JSON.stringify(c.strategy||{});const m=t.match(/spelling ['\u2018\u201c"\\]+([^'\u2019\u201d"\\]{3,80})['\u2019\u201d"\\]/i);if(!m||m[1].trim()===c.name.trim())return'';return`<div class="vx-card" style="display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap"><span>The strategy uses the title <b>${h(m[1].trim())}</b>. Use it for this campaign?</span><button class="vx-btn sm pri" data-act="fixtitle" data-t="${h(m[1].trim())}" type="button">Use this title</button></div>`}
function genBtn(k,l){return`<div class="vx-card"><p>Not generated yet.</p><button class="vx-btn pri" data-act="gen1" data-k="${k}" type="button">${l} · ${rate(k)} credits</button></div>`}
function wizard(b){const w=cur.wiz||(cur.wiz={name:'',objective:'Brand awareness',duration:30,start:addDays(todayISO(),1),channels:['Instagram'],mix:{reel:12,post:8,carousel:4,story:6,short:0},notes:'',language:'English'});
  const total=Object.values(w.mix).reduce((a,n)=>a+(+n||0),0),calls=Math.ceil(total/5),cr=rate('strategy')+rate('intel')+rate('directions')+calls*rate('calendar');
  return`<form class="vx-card vx-wrap" data-form="wiz"><div class="vx-fields">
  <div class="vx-f"><label for="w-name">Campaign name</label><input type="text" id="w-name" name="name" value="${h(w.name)}" placeholder="${h(b.name)} — Chapter II" required></div>
  <div class="vx-f"><label for="w-obj">Objective</label><select id="w-obj" name="objective">${OBJECTIVES.map(o=>`<option ${o===w.objective?'selected':''}>${o}</option>`).join('')}</select></div>
  <div class="vx-f"><label for="w-dur">Duration</label><select id="w-dur" name="duration">${[7,15,30,60,90].map(d=>`<option value="${d}" ${+w.duration===d?'selected':''}>${d} days</option>`).join('')}<option value="custom" ${![7,15,30,60,90].includes(+w.duration)?'selected':''}>Custom</option></select></div>
  <div class="vx-f"><label for="w-days">Days (custom)</label><input type="number" id="w-days" name="days" min="3" max="120" value="${h(w.duration)}"></div>
  <div class="vx-f"><label for="w-start">Start date</label><input type="date" id="w-start" name="start" value="${h(w.start)}"></div>
  <div class="vx-f"><label for="w-len">Reel length</label><select id="w-len" name="reelLen"><option value="mixed" ${w.reelLen==='mixed'||!w.reelLen?'selected':''}>Mixed (15s and 30s)</option>${[6,10,15,20,30,45,60,90].map(d=>`<option value="${d}" ${+w.reelLen===d?'selected':''}>${d} seconds</option>`).join('')}<option value="custom" ${w.reelLen&&w.reelLen!=='mixed'&&![6,10,15,20,30,45,60,90].includes(+w.reelLen)?'selected':''}>Custom</option></select></div>
  <div class="vx-f"><label for="w-lenc">Custom reel length (seconds)</label><input type="number" id="w-lenc" name="reelLenC" min="5" max="180" value="${h(+w.reelLen||'')}" placeholder="e.g. 25"></div>
  <div class="vx-f"><label for="w-lang">Language</label><select id="w-lang" name="language">${['English','Hinglish','Hindi','Marathi','Tamil','Bengali','Spanish','French','Arabic'].map(l=>`<option ${l===w.language?'selected':''}>${l}</option>`).join('')}</select></div></div>
  <div class="vx-f"><span class="vx-lab">Channels</span><div class="vx-row">${CHANNELS.map(ch=>`<label class="vx-tog"><input type="checkbox" name="ch" value="${ch}" ${w.channels.includes(ch)?'checked':''}> ${ch}</label>`).join('')}</div></div>
  <div class="vx-f"><span class="vx-lab">Content mix</span><div class="vx-fields">${Object.keys(FORMATS).map(k=>`<div class="vx-f"><label for="w-m-${k}">${FORMATS[k]}s</label><input type="number" id="w-m-${k}" name="mix_${k}" min="0" max="60" value="${+w.mix[k]||0}"></div>`).join('')}</div></div>
  <div class="vx-f"><label for="w-notes">Creative thought or brief (optional)</label><textarea id="w-notes" name="notes" placeholder="e.g. Minimalist editorial photography, cinematic reels, a mix of storytelling and product ads">${h(w.notes)}</textarea></div>
  <div class="vx-note" id="wizCost"><b>Cost before you generate:</b> ${total} entries → strategy, intelligence, three creative directions and ${calls} calendar batches = <b>${cr} credits</b> (${3+calls} AI calls). No images or videos are rendered until you approve them; rendering runs free in your browser.</div>
  <div class="vx-row"><button class="vx-btn pri" type="submit">Create campaign &amp; plan strategy</button>${camps().length?'<button class="vx-btn" type="button" data-act="cancelwiz">Cancel</button>':''}<span class="vx-status" id="campSt"></span></div></form>`}
function stratHTML(s){return`<div class="vx-card vx-prose"><h2>Strategy</h2><p>${h(s.summary)}</p><h3>Proposition</h3><p>${h(s.proposition)}</p><details class="vx-more-strat"><summary>Show the full strategy: creative direction, audience, messages, platforms, budget, experiments</summary><h3>Creative direction</h3><p>${h(s.creative_direction)}</p>
 <h3>Frameworks used</h3><ul>${(s.frameworks||[]).map(f=>`<li><b>${h(f.name)}</b> — ${h(f.why)}</li>`).join('')}</ul>
 <h3>Target audience</h3><ul>${(s.audience||[]).map(a=>`<li><b>${h(a.segment)}</b> ${chip(a.funnel||'')} — ${h(a.why)}</li>`).join('')}</ul>
 <h3>Key messages</h3><ul>${list(s.key_messages).map(x=>`<li>${h(x)}</li>`).join('')}</ul><h3>Content pillars</h3><div class="vx-row">${list(s.pillars).map(x=>chip(x)).join('')}</div>
 <h3>Platform strategy</h3><table class="vx-table stack"><thead><tr><th>Platform</th><th>Role</th><th>Formats</th></tr></thead><tbody>${(s.platform_strategy||[]).map(p=>`<tr><td>${h(p.platform)}</td><td>${h(p.role)}</td><td>${h(p.formats)}</td></tr>`).join('')}</tbody></table>
 <h3>Conversion journey</h3><ol>${list(s.journey).map(x=>`<li>${h(x)}</li>`).join('')}</ol>
 <h3>Budget scenarios</h3><table class="vx-table stack"><thead><tr><th>Scenario</th><th class="n">Monthly (₹)</th><th>Split</th></tr></thead><tbody>${(s.budget||[]).map(x=>`<tr><td>${h(x.scenario)}</td><td class="n">${(+x.monthly_inr||0).toLocaleString('en-IN')}</td><td>${h(x.split)}</td></tr>`).join('')}</tbody></table>
 <h3>Experimentation plan</h3><ul>${(s.experiments||[]).map(x=>`<li><b>${h(x.hypothesis)}</b> — test: ${h(x.test)}; measure: ${h(x.measure)}</li>`).join('')}</ul>
 </details><div class="vx-row"><button class="vx-btn sm" data-act="gen1" data-k="strategy" type="button">Regenerate · ${rate('strategy')} credits</button></div></div>`}
function intelHTML(v){const lab=l=>`<span class="vx-tag ${l==='verified'?'ver':l==='hypothesis'?'hyp':''}">${l==='verified'?'Verified from your input':l==='hypothesis'?'AI hypothesis':'Needs real data'}</span>`;
 return`<div class="vx-card vx-prose"><h2>Marketing intelligence</h2><p class="vx-small vx-muted">No web or analytics access was used. Nothing below is a measured fact unless marked verified.</p>${(v.sections||[]).map(s=>`<h3>${h(s.title)}</h3><ul>${(s.points||[]).map(p=>`<li>${h(p.text)} ${lab(p.label)}</li>`).join('')}</ul>`).join('')}</div>
 <div class="vx-card"><h2>Trend opportunities</h2><div class="vx-scroll"><table class="vx-table stack"><thead><tr><th>Opportunity</th><th>Window</th><th class="n">Score</th><th>Call</th><th>Why</th></tr></thead><tbody>${(v.trends||[]).map(t=>{const sc=t.scores||{},tot=Object.values(sc).reduce((a,n)=>a+(+n||0),0);return`<tr><td><b>${h(t.name)}</b><br><span class="vx-small vx-muted">${h(t.type)}</span></td><td>${h(t.window)}</td><td class="n">${tot}/35</td><td>${chip(t.recommendation,t.recommendation==='participate'?'ok':t.recommendation==='adapt'?'warn':'')}</td><td>${h(t.why)}</td></tr>`}).join('')}</tbody></table></div>
 <p class="vx-small vx-muted">Scores add brand fit, audience fit, timeliness, creative potential, commercial relevance, ease and confidence (1–5 each). A trend is never a guarantee of reach.</p><button class="vx-btn sm" data-act="gen1" data-k="intel" type="button">Regenerate · ${rate('intel')} credits</button></div>`}
function dirsHTML(c){if(!c.directions?.length)return genBtn('directions','Create three creative directions');
 return`<p class="vx-muted">Pick the direction every asset will follow.</p><div class="vx-dirs">${c.directions.map((d,i)=>`<article class="vx-dir" aria-pressed="${c.dir===i}"><div class="sw">${list(d.colours).slice(0,4).map(x=>`<i style="background:${/^#[0-9a-f]{3,6}$/i.test(x)?x:'#888'}"></i>`).join('')}</div>
  <h3 style="font:800 20px var(--vx-disp);margin:6px 0 0">${h(d.name)}</h3><span class="vx-small vx-muted">${h(d.style)}</span><p style="margin:4px 0">${h(d.rationale)}</p>
  <dl><dt>Art direction</dt><dd>${h(d.art_direction)}</dd><dt>Lighting</dt><dd>${h(d.lighting)}</dd><dt>Camera</dt><dd>${h(d.camera)}</dd><dt>Composition</dt><dd>${h(d.composition)}</dd><dt>Typography</dt><dd>${h(d.typography)}</dd><dt>Styling</dt><dd>${h(d.styling)}</dd><dt>Background</dt><dd>${h(d.background)}</dd><dt>Narrative</dt><dd>${h(d.narrative)}</dd></dl>
  <details><summary>Moodboard &amp; consistency rules</summary><ul>${list(d.moodboard).map(x=>`<li>${h(x)}</li>`).join('')}</ul><ul>${list(d.consistency).map(x=>`<li>${h(x)}</li>`).join('')}</ul></details>
  <button class="vx-btn ${c.dir===i?'':'pri'}" data-act="pickdir" data-i="${i}" type="button" style="margin-top:auto">${c.dir===i?'Chosen ✓':'Choose this direction'}</button></article>`).join('')}</div>
  <div class="vx-row" style="margin-top:12px"><button class="vx-btn sm" data-act="gen1" data-k="directions" type="button">Regenerate directions · ${rate('directions')} credits</button></div>`}
function genHTML(c){const its=items(c),plan=slotPlan(c),miss=plan.filter(s=>!its.some(i=>i.n===s.n)),fails=its.filter(i=>i.qa&&!i.qa.allOk);
 return`<div class="vx-card"><h2>Calendar production</h2>${c.dir==null?`<p class="vx-note">Choose a creative direction first.</p>`:''}
  <p>${its.length} of ${plan.length} entries written. ${its.length?`${its.filter(i=>i.qa?.allOk).length} pass every quality check.`:''}</p>
  <div class="vx-meter"><i style="width:${plan.length?its.length/plan.length*100:0}%"></i></div>
  <div class="vx-row" style="margin-top:12px">${miss.length?`<button class="vx-btn pri" data-act="gencal" type="button" ${c.dir==null?'disabled':''}>Generate ${miss.length} entries · ${Math.ceil(miss.length/5)*rate('calendar')} credits</button>`:''}
  ${fails.length?`<button class="vx-btn" data-act="fixall" type="button">Fix ${fails.length} failing entries · ${fails.length*rate('fix')} credits</button>`:''}${its.length?'<button class="vx-btn" data-act="go" data-v="calendar" type="button">Open calendar</button>':''}</div></div>`}

/* ---- Calendar ---- */
VIEWS.calendar=()=>{const b=brand();if(!b)return head('Content Calendar')+needBrand();const c=camp();if(!c)return head('Content Calendar')+needCamp();
  const its=items(c),t=cur.calTab;const f=cur.calFilter||'all',vis=its.filter(i=>f==='all'||i.format===f||i.status===f);
  return head('Content Calendar',`${h(c.name)} · ${its.length} entries · drag to reschedule or change status`,campPicker())+`<div class="vx-wrap">
   <div class="vx-row" style="justify-content:space-between;margin-bottom:12px"><div class="vx-tabs" role="tablist">${[['month','Month'],['week','Week'],['day','Daily'],['list','List'],['kanban','Kanban']].map(([k,l])=>`<button role="tab" type="button" data-act="caltab" data-t="${k}" aria-selected="${t===k}">${l}</button>`).join('')}</div>
   <div class="vx-row"><select data-act="calfilter" aria-label="Filter" style="width:auto"><option value="all">All entries</option>${Object.entries(FORMATS).map(([k,l])=>`<option value="${k}" ${f===k?'selected':''}>${l}s</option>`).join('')}${STATUSES.map(s=>`<option ${f===s?'selected':''}>${s}</option>`).join('')}</select>
   <button class="vx-btn sm" data-act="approveqc" type="button">Approve all quality-checked</button>${t==='list'?`<button class="vx-btn sm" data-act="approvesel" type="button">Approve selected</button>`:''}</div></div>
   ${!its.length?`<div class="vx-card vx-empty"><h2>No entries yet</h2><button class="vx-btn pri" data-act="cstepgo" data-s="gen" type="button">Generate the calendar</button></div>`:t==='month'?monthHTML(c,vis):t==='week'||t==='day'?weekHTML(c,vis,t==='day'?1:7):t==='list'?listHTML(vis):kanbanHTML(vis)}</div>`};
function pill(i){return`<div role="button" tabindex="0" class="vx-pill ${i.format} ${i.status.replace(/\s/g,'')==='Qualitychecked'?'':i.status}" draggable="true" data-id="${i.id}" data-act="open" title="${h(FORMATS[i.format]+' · '+i.status)}">${h(FORMATS[i.format])}: ${h(i.headline||i.title)}</div>`}
function monthHTML(c,its){const s=new Date(c.start+'T00:00:00'),pad=(s.getDay()+6)%7,days=c.duration+pad,cells=Math.ceil(days/7)*7;let out=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="dh">${d}</div>`).join('');
  for(let i=0;i<cells;i++){const k=i-pad,iso=addDays(c.start,k),inR=k>=0&&k<c.duration;out+=`<div class="vx-day ${inR?'':'off'}" data-date="${inR?iso:''}"><span class="dn">${fmtD(iso)}</span>${inR?its.filter(x=>x.date===iso).map(pill).join(''):''}</div>`}
  return`<div class="vx-month">${out}</div>`}
function weekHTML(c,its,n){const wk=clampN(cur.week||0,0,Math.ceil(c.duration/n)-1);cur.week=wk;const s0=addDays(c.start,wk*n);
  return`<div class="vx-row" style="margin-bottom:10px"><button class="vx-btn sm" data-act="wk" data-d="-1" type="button" ${wk?'':'disabled'}>Previous</button><b>${fmtD(s0)}${n>1?' – '+fmtD(addDays(s0,n-1)):''}</b><button class="vx-btn sm" data-act="wk" data-d="1" type="button">Next</button></div>
  <div style="display:grid;gap:10px">${Array.from({length:n},(_,i)=>addDays(s0,i)).filter(d=>d<addDays(c.start,c.duration)).map(d=>`<div class="vx-card vx-day" data-date="${d}" style="min-height:0"><b>${new Date(d+'T00:00:00').toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}</b>${its.filter(x=>x.date===d).map(i=>`<div class="vx-row" style="justify-content:space-between;border-top:1px solid var(--vx-line);padding-top:8px"><div style="flex:1;min-width:200px">${pill(i)}<p class="vx-small" style="margin:4px 0 0">${h(i.hook)}</p><span class="vx-small vx-muted">${h(i.platform)} · ${h(i.window)} · ${h(i.pillar)} · ${h(i.funnel)}</span></div>${i.qa?scoreChip(i.qa.score):''}${chip(i.status)}</div>`).join('')||'<span class="vx-small vx-muted">No content</span>'}</div>`).join('')}</div>`}
function listHTML(its){return`<div class="vx-card vx-scroll"><table class="vx-table stack"><thead><tr><th><input type="checkbox" data-act="selall" aria-label="Select all"></th><th>Date</th><th>Format</th><th>Headline</th><th>Pillar · funnel</th><th class="n">Quality</th><th class="n">Viral index</th><th>Status</th></tr></thead><tbody>${its.map(i=>`<tr><td><input type="checkbox" data-sel="${i.id}" ${cur.sel.has(i.id)?'checked':''} aria-label="Select ${h(i.headline)}"></td><td>${fmtD(i.date)}</td><td>${FORMATS[i.format]}</td><td><button class="vx-btn sm" data-act="open" data-id="${i.id}" type="button" style="white-space:normal;text-align:left">${h(i.headline||i.title)}</button></td><td>${h(i.pillar)} · ${h(i.funnel)}</td><td class="n">${i.qa?scoreChip(i.qa.score):'—'}</td><td class="n">${i.qa?i.qa.vpi.score:'—'}</td><td>${chip(i.status,i.status==='Approved'?'ok':'')}</td></tr>`).join('')}</tbody></table></div>`}
function kanbanHTML(its){return`<div class="vx-kanban">${STATUSES.map(s=>{const L=its.filter(i=>i.status===s);return`<div class="vx-col" data-status="${s}"><h4>${s}<span>${L.length}</span></h4>${L.map(i=>`<div role="button" tabindex="0" class="vx-kcard" draggable="true" data-id="${i.id}" data-act="open"><b>${fmtD(i.date)}</b> · ${FORMATS[i.format]}<br>${h(i.headline||i.title)}</div>`).join('')}</div>`}).join('')}</div>`}

/* ---- Item drawer ---- */
function openItem(id){const it=Store.get(id);if(!it)return;if(!it.qa)runQA(it);const d=q('#vxDrawer'),Q=it.qa,tags=list(it.hashtags).map(t=>'#'+t).join(' ');
  const fld=(k,l,ta)=>`<div class="vx-f"><label for="it-${k}">${l}</label>${ta?`<textarea id="it-${k}" data-it="${k}">${h(it[k])}</textarea>`:`<input type="text" id="it-${k}" data-it="${k}" value="${h(it[k])}">`}</div>`;
  d.innerHTML=`<div class="vx-row" style="justify-content:space-between"><span class="vx-small vx-muted">${FORMATS[it.format]} · ${h(it.platform)} · ${fmtD(it.date)} · day ${it.n}</span><button class="vx-btn sm" data-act="closedrawer" type="button">Close</button></div>
  <h2>${h(it.headline||it.title)}</h2><div class="vx-row">${scoreChip(Q.score)}<span class="vx-chip">Brand Integrity ${Q.integrity}%</span><span class="vx-chip acc" title="Heuristic, not a prediction">Viral Potential Index ${Q.vpi.score}</span>
  <select data-it="status" aria-label="Status" style="width:auto">${STATUSES.map(s=>`<option ${s===it.status?'selected':''}>${s}</option>`).join('')}</select></div>
  <div class="vx-row" style="margin:12px 0">${it.status!=='Approved'?`<button class="vx-btn pri sm" data-act="approve1" data-id="${it.id}" type="button">Approve</button>`:''}
   ${['reel','short','story'].includes(it.format)?`<button class="vx-btn sm" data-act="tovideo" data-id="${it.id}" type="button">Produce video</button>`:`<button class="vx-btn sm" data-act="renderimg" data-id="${it.id}" type="button">Render image${it.format==='carousel'?'s':''}</button>`}
   <button class="vx-btn sm" data-act="tostudio" data-id="${it.id}" type="button">Open in Creative Studio</button>${!Q.allOk?`<button class="vx-btn sm" data-act="fix1" data-id="${it.id}" type="button">Fix checks · ${rate('fix')}</button>`:''}
   <button class="vx-btn sm" data-act="regen1" data-id="${it.id}" type="button">Regenerate · ${rate('regen')}</button><button class="vx-btn sm" data-act="dup1" data-id="${it.id}" type="button">Duplicate</button><button class="vx-btn sm" data-act="copycap" data-id="${it.id}" type="button">Copy caption</button></div>
  <span class="vx-status" id="itSt"></span>
  <h3>Quality gates</h3><ul class="vx-checks">${Q.checks.map(c=>`<li class="${c.ok?'':c.cat==='brand'?'r':'f'}">${h(c.label)}</li>`).join('')}</ul>
  <details><summary>Viral Potential Index factors (heuristic)</summary><ul class="vx-checks">${Q.vpi.factors.map(f=>`<li class="${f.ok?'':'f'}">${h(f.label)} (${f.pts})</li>`).join('')}</ul></details>
  <div class="vx-fields" style="margin-top:12px">${fld('date','Date').replace('type="text"','type="date"')}${fld('window','Publishing window')}${fld('pillar','Content pillar')}${fld('funnel','Funnel stage')}${fld('persona','Target persona')}${fld('objective','Content objective')}</div>
  ${fld('headline','Headline')}${fld('hook','Opening hook')}${fld('brief','Creative brief',1)}${fld('visual','Visual requirements',1)}${fld('caption','Caption',1)}
  <div class="vx-fields">${fld('cta','Call to action')}<div class="vx-f"><label for="it-tags">Hashtags</label><input type="text" id="it-tags" data-it="hashtags" value="${h(tags)}"></div></div>
  ${it.scenes?`<h3>Script · ${it.duration}s</h3>${it.scenes.map((s,i)=>`<div class="vx-scene"><input type="number" min="1" max="30" data-sc="${i}" data-k="t" value="${s.t}" aria-label="Scene ${i+1} seconds"><textarea data-sc="${i}" data-k="on_screen" aria-label="On-screen text">${h(s.on_screen)}</textarea><textarea data-sc="${i}" data-k="voiceover" aria-label="Voiceover">${h(s.voiceover)}</textarea><span class="vx-small vx-muted">#${i+1}</span></div>`).join('')}<details><summary>AI video prompts</summary><div class="vx-copy">${h(it.scenes.map((s,i)=>`Scene ${i+1} (${s.t}s): ${s.ai_prompt}`).join('\n\n'))}</div></details>`:''}
  ${it.slides?`<h3>Slides</h3>${it.slides.map((s,i)=>`<div class="vx-scene" style="grid-template-columns:40px minmax(0,1fr) minmax(0,1.4fr)"><b>${i+1}</b><textarea data-sl="${i}" data-k="headline" aria-label="Slide ${i+1} headline">${h(s.headline)}</textarea><textarea data-sl="${i}" data-k="body" aria-label="Slide ${i+1} body">${h(s.body)}</textarea></div>`).join('')}`:''}
  ${it.frames?`<h3>Story frames</h3><table class="vx-table"><thead><tr><th>#</th><th class="n">Sec</th><th>Text</th><th>Sticker</th></tr></thead><tbody>${it.frames.map((f,i)=>`<tr><td>${i+1}</td><td class="n">${f.t}</td><td>${h(f.text)}</td><td>${h(f.sticker)}</td></tr>`).join('')}</tbody></table>`:''}
  <h3>Performance hypothesis</h3><p class="vx-small">${h(it.hypothesis)} <span class="vx-tag hyp">Hypothesis</span></p>
  ${Session.assets.get(it.id)?`<h3>Rendered assets</h3><div class="vx-thumbs">${Session.assets.get(it.id).map(a=>a.kind==='video'?`<video src="${a.url}" controls playsinline></video>`:`<img src="${a.url}" alt="${h(a.name)}">`).join('')}</div>`:''}`;
  d.dataset.id=id;d.classList.add('on');d.focus()}
function saveItemField(el){const d=q('#vxDrawer'),it=Store.get(d.dataset.id);if(!it)return;
  if(el.dataset.it){const k=el.dataset.it;it[k]=k==='hashtags'?el.value.split(/[\s,]+/).map(t=>t.replace(/^#/,'')).filter(Boolean):el.value}
  else if(el.dataset.sc!=null){const s=it.scenes[+el.dataset.sc];s[el.dataset.k]=el.dataset.k==='t'?(+el.value||1):el.value;it.duration=it.scenes.reduce((a,x)=>a+(+x.t||0),0)}
  else if(el.dataset.sl!=null){it.slides[+el.dataset.sl][el.dataset.k]=el.value}
  if(el.dataset.it!=='status')runQA(it);Store.put(it)}

/* ---- Studio hand-off & image rendering ---- */
function copyFor(it,slide){const b=brand(),c=Store.get(it.campaignId);return{brand:b?.name||state.copy.brand,handle:b?.handle||state.copy.handle,headline:slide?slide.headline:it.headline,sub:slide?slide.body:(it.hook||''),cta:it.cta||state.copy.cta,label:c?.name||'',f1:it.details?.[0]||state.copy.f1,f2:it.details?.[1]||state.copy.f2,f3:it.details?.[2]||state.copy.f3}}
function toStudio(it){const t=tplFor(it);setCopy(copyFor(it));if(t)select(t.id);go('studio');notify('Loaded "'+(it.headline||'entry')+'" into '+(t?t.name:'the studio'))}
function withCopy(cp,fn){const save={...state.copy};Object.assign(state.copy,cp);try{return fn()}finally{Object.assign(state.copy,save)}}
async function renderStill(tpl,cp){const[W,H]=tpl.size;const cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');withCopy(cp,()=>renderTpl(g,tpl,tpl.kind==='reel'?tpl.pt:99,1));return new Promise(r=>cv.toBlob(r,'image/png'))}
async function renderItemImages(it){const t=tplFor(it);if(!t)throw{code:'no_tpl'};const out=[];const slides=it.format==='carousel'?it.slides:it.format==='story'?it.frames.map(f=>({headline:f.text,body:f.sticker})):[null];
  for(const [i,s] of slides.entries()){const blob=await renderStill(t,copyFor(it,s));out.push({kind:'image',blob,url:URL.createObjectURL(blob),name:`day${String(it.n).padStart(2,'0')}-${it.format}${slides.length>1?'-'+(i+1):''}.png`})}
  Session.assets.set(it.id,out);return out}

/* ---- Image Studio ---- */
VIEWS.images=()=>{const c=camp();if(!brand())return head('Image Studio')+needBrand();if(!c)return head('Image Studio')+needCamp();const its=items(c).filter(i=>['post','carousel','story'].includes(i.format));
  return head('Image Studio','Branded posts, carousels and stories rendered from your own product photos and the Kathavi template library.',campPicker())+`<div class="vx-wrap">
  <div class="vx-note"><b>Product fidelity:</b> your photos are composited exactly as uploaded, never regenerated by AI, so product colours, patterns and textures stay true. Text, logo and prices are drawn as design layers. ${state.samples?'<b>You are seeing sample media.</b> Add real product photos in the Brand Vault.':''}</div>
  <div class="vx-row" style="margin-bottom:12px"><button class="vx-btn pri" data-act="renderall" type="button">Render all approved (${its.filter(i=>i.status==='Approved').length})</button><button class="vx-btn" data-act="renderall" data-all="1" type="button">Render all ${its.length}</button><span class="vx-status" id="imgSt"></span></div>
  <div class="vx-grid">${its.map(i=>{const A=Session.assets.get(i.id);const t=tplFor(i);return`<div class="vx-card"><h2 style="font-size:16px"><span>${fmtD(i.date)} · ${FORMATS[i.format]}</span>${chip(i.status,i.status==='Approved'?'ok':'')}</h2><p style="margin:0 0 6px">${h(i.headline)}</p>
   <label class="vx-small vx-muted" for="tp-${i.id}">Template</label><select id="tp-${i.id}" data-tplfor="${i.id}">${tplList('post').map(x=>`<option value="${x.id}" ${t&&t.id===x.id?'selected':''}>${h(x.name)}</option>`).join('')}${i.format==='story'?tplList('reel').map(x=>`<option value="${x.id}" ${t&&t.id===x.id?'selected':''}>${h(x.name)} (9:16)</option>`).join(''):''}</select>
   ${A?`<div class="vx-thumbs" style="margin-top:8px">${A.map(a=>`<img src="${a.url}" alt="${h(a.name)}" style="aspect-ratio:auto">`).join('')}</div>`:''}
   <div class="vx-row" style="margin-top:8px"><button class="vx-btn sm" data-act="renderimg" data-id="${i.id}" type="button">${A?'Re-render':'Render'}</button>${A?`<button class="vx-btn sm" data-act="saveasset" data-id="${i.id}" type="button">Save</button>`:''}<button class="vx-btn sm" data-act="tostudio" data-id="${i.id}" type="button">Edit in studio</button></div></div>`}).join('')||'<p class="vx-muted">This campaign has no posts, carousels or stories.</p>'}</div></div>`};

/* ---- Video Studio ---- */
VIEWS.reels=()=>head('Reel Studio','Reels built from your brand, in 13 motion themes including 3D. Pick a theme, edit the words, save to your workspace.')+`<div class="vx-card" style="padding:0;overflow:hidden"><iframe id="reelFrame" src="/studio/reels/index.html?embed=1" title="Reel Studio" style="width:100%;height:calc(100vh - 170px);min-height:760px;border:0;display:block" allow="clipboard-write; autoplay"></iframe></div>`;
AFTER.reels=()=>{const f=document.getElementById('reelFrame');if(!f)return;const b=brand();const tag=b&&b.vault&&(b.vault.taglines||[])[0];const P=b&&(b.products_list||[])[0];
 const msg={type:'kathavi:brand',ws:(window.VX&&window.VX.ws)||null,brand:b?{name:b.name||'',tagline:typeof tag==='string'?tag:(tag&&tag.text)||'',primary:b.colors&&b.colors.primary,accent:b.colors&&b.colors.secondary,handle:b.handle||''}:null,media:b?((b.vault&&b.vault.photos)||[]).filter(p=>p&&p.url).map(p=>({src:p.url,kind:/^video\//.test(p.type||p.contentType||'')||/\.(mp4|mov|webm)(\?|$)/i.test(p.url)?'video':'image'})):[],product:P?{name:P.name||'',price:P.price||''}:null};
 const send=()=>{try{f.contentWindow.postMessage(msg,location.origin)}catch(e){}};f.addEventListener('load',send);
 if(!window.__vxReelReady){window.__vxReelReady=true;window.addEventListener('message',e=>{if(e.origin===location.origin&&e.data&&e.data.type==='kathavi:ready'){const fr=document.getElementById('reelFrame');if(fr&&cur.view==='reels')AFTER.reels.last&&AFTER.reels.last()}})}AFTER.reels.last=send};
VIEWS.video=()=>{const c=camp();if(!brand())return head('Video Studio')+needBrand();if(!c)return head('Video Studio')+needCamp();
  const vids=items(c).filter(i=>['reel','short','story'].includes(i.format));const it=Store.get(cur.vid)&&vids.find(x=>x.id===cur.vid)||vids[0];if(!it)return head('Video Studio')+`<div class="vx-card vx-empty vx-wrap"><h2>No reels in this campaign yet</h2><p>Generate the campaign's content calendar to plan its reels, or make one now in Reel Studio from your brand and photos.</p><div class="vx-row" style="justify-content:center"><button class="vx-btn pri" data-act="go" data-v="calendar" type="button">Generate the calendar</button><button class="vx-btn" data-act="go" data-v="reels" type="button">Open Reel Studio</button></div></div>`;cur.vid=it.id;
  const sc=vidScenes(it),tot=sc.reduce((a,s)=>a+s.t,0),t=tplFor(it),mode=cur.vmode||'economy',voice=Session.voices.get(it.id);
  return head('Video Studio','Brief → script → scenes → voiceover → subtitles → branding → render → quality check. Every scene is editable on its own.',campPicker())+`<div class="vx-wrap vx-two">
  <div><div class="vx-card"><div class="vx-f"><label for="v-item">Reel</label><select id="v-item" data-act="pickvid">${vids.map(v=>`<option value="${v.id}" ${v.id===it.id?'selected':''}>${fmtD(v.date)} · ${FORMATS[v.format]} · ${h(v.headline)}</option>`).join('')}</select></div>
   <div class="vx-f"><span class="vx-lab">Production mode</span><div class="vx-tabs" role="tablist">${[['economy','Economy'],['pro','Professional'],['cine','Cinematic']].map(([k,l])=>`<button type="button" role="tab" data-act="vmode" data-m="${k}" aria-selected="${mode===k}">${l}</button>`).join('')}</div></div>
   ${mode==='economy'?`<p class="vx-small">Your product photos and clips, animated by a Kathavi template, with on-screen text, subtitles and your voiceover. Renders here, free, at 1080×1920.</p>`:
     `<div class="vx-note">${mode==='pro'?'Professional mode mixes AI-generated scenes with your footage.':'Cinematic mode generates every scene with a premium video model.'} No video-generation provider is connected to Kathavi yet, so these scenes are produced from the prompt pack below in your video tool (any AI video tool). Import the clips back as media, then render here in Economy mode to add text, subtitles, voice and branding.</div>
      <div class="vx-row"><button class="vx-btn sm" data-act="copyprompts" type="button">Copy prompt pack</button></div><div class="vx-copy">${h(sc.map((s,i)=>`Scene ${i+1} · ${s.t}s · 9:16\n${s.ai_prompt||s.visual}`).join('\n\n'))}</div>`}
   <div class="vx-f"><label for="v-tpl">Motion template</label><select id="v-tpl" data-act="vtpl">${tplList('reel').filter(x=>!x.multi||x.multi<2).map(x=>`<option value="${x.id}" ${t&&t.id===x.id?'selected':''}>${h(x.name)}</option>`).join('')}</select></div>
   ${it.scenes?`<div class="vx-row" style="margin:10px 0"><label class="vx-lab" for="v-len">Reel length</label><input type="number" id="v-len" min="3" max="180" value="${tot}" style="width:90px" aria-label="Reel length in seconds"> <span class="vx-small vx-muted">seconds</span><button class="vx-btn sm" data-act="vlen" type="button">Set length</button>${[6,15,30,60].map(d=>`<button class="vx-btn sm" data-act="vlen" data-d="${d}" type="button">${d}s</button>`).join('')}</div>
   ${it.qa&&it.qa.checks.some(c=>!c.ok&&/Voiceover fits|add up/.test(c.label))?`<div class="vx-note">The script no longer fits ${tot}s. <button class="vx-btn sm" data-act="fitscript" type="button">Rewrite script for ${tot}s · ${rate('fix')} credit</button></div>`:''}`:''}
   <h3>Scenes · ${tot}s</h3>${sc.map((s,i)=>`<div class="vx-scene"><input type="number" min="1" max="30" data-vs="${i}" data-k="t" value="${s.t}" aria-label="Scene ${i+1} seconds"><textarea data-vs="${i}" data-k="on" aria-label="Scene ${i+1} on-screen text">${h(s.on)}</textarea><textarea data-vs="${i}" data-k="vo" aria-label="Scene ${i+1} voiceover">${h(s.vo)}</textarea><button class="vx-btn sm" data-act="regenscene" data-i="${i}" type="button" title="Regenerate this scene (${rate('scene')} credit)">↻</button></div>`).join('')}
   <div class="vx-row" style="margin-top:10px"><label class="vx-tog"><input type="checkbox" id="v-subs" ${cur.subs!==false?'checked':''} data-act="subs"> Burn in subtitles</label><select data-act="subpos" aria-label="Subtitle position" style="width:auto">${[['upper','Upper'],['middle','Middle'],['lower','Lower']].map(([k,l])=>`<option value="${k}" ${(cur.subPos||'middle')===k?'selected':''}>${l}</option>`).join('')}</select>
   <label class="vx-btn sm" for="v-voice">${voice?'Replace voiceover':'Add your voiceover'}<input type="file" id="v-voice" accept="audio/*" hidden></label>${voice?chip('Voice: '+voice.name,'ok'):chip('No voiceover','warn')}</div>
   <p class="vx-small vx-muted">Record yourself reading the script (see Voice Studio for a teleprompter) and upload it. Product media comes from the Brand Vault.</p></div></div>
  <div><div class="vx-card"><div class="vx-phone"><canvas id="vCv" width="540" height="960" aria-label="Reel preview"></canvas></div>
   <div class="vx-row" style="margin-top:10px"><button class="vx-btn pri" data-act="vrender" type="button">Render ${tot}s video</button><span class="vx-status" id="vSt"></span></div><div id="vQA"></div></div></div></div>`};
function setLength(it,L){const sc=it.scenes,tot=sc.reduce((a,s)=>a+(+s.t||0),0)||1;let acc=0;
  sc.forEach((s,i)=>{s.t=Math.max(1,Math.round((+s.t||1)*L/tot));if(i===0)s.t=Math.min(3,s.t)});const diff=L-sc.reduce((a,s)=>a+s.t,0);
  for(let k=sc.length-1,d=diff;d!==0&&k>=0;k=(k-1+sc.length)%sc.length){if(k===0&&sc.length>1){k=sc.length;continue}const step=d>0?1:-1;if(sc[k].t+step>=1){sc[k].t+=step;d-=step}else if(sc.every((x,j)=>j===0||x.t<=1))break}
  it.duration=sc.reduce((a,s)=>a+s.t,0);runQA(it);Store.put(it)}
function vidScenes(it){if(it.format==='story')return(it.frames||[]).map(f=>({t:+f.t||5,on:f.text,vo:'',visual:f.text}));return(it.scenes||[]).map(s=>({t:+s.t||3,on:s.on_screen,vo:s.voiceover,ai_prompt:s.ai_prompt,visual:s.visual}))}
function drawSubs(g,text,W,H){const pos=cur.subPos||'middle';if(!text)return;g.save();g.font='600 44px Manrope, sans-serif';const ws=String(text).split(/\s+/),lines=[];let l='';for(const w of ws){const t=l?l+' '+w:w;if(g.measureText(t).width>W-200&&l){lines.push(l);l=w}else l=t}if(l)lines.push(l);
  const L=lines.slice(-3),lh=56,bh=L.length*lh+28,y=pos==='upper'?300:pos==='lower'?H-300-bh:Math.round(H*.64-bh/2);g.fillStyle='rgba(0,0,0,.62)';const bw=Math.min(W-120,Math.max(...L.map(x=>g.measureText(x).width))+60);g.beginPath();g.roundRect?g.roundRect((W-bw)/2,y,bw,bh,18):g.rect((W-bw)/2,y,bw,bh);g.fill();
  g.fillStyle='#fff';g.textAlign='center';g.textBaseline='top';L.forEach((x,i)=>g.fillText(x,W/2,y+14+i*lh));g.restore()}
function drawVideoFrame(g,tpl,sc,tg,k,subs){const W=1080,H=1920;let acc=0,i=0;for(;i<sc.length-1;i++){if(tg<acc+sc[i].t)break;acc+=sc[i].t}const s=sc[i],tl=Math.max(0,tg-acc);
  const tt=s.t<=tpl.dur?Math.min(tl,tpl.dur-.01):tl*(tpl.dur-.01)/s.t;const M=state.media.slice(),n=M.length;
  if(n)state.media=M.slice(i%n).concat(M.slice(0,i%n));try{withCopy({headline:s.on||' ',sub:''},()=>renderTpl(g,tpl,tt,k))}finally{state.media=M}
  g.setTransform(k,0,0,k,0,0);if(subs)drawSubs(g,s.vo,W,H);g.setTransform(1,0,0,1,0,0)}
let vPrev=null;function previewLoop(){const cv=q('#vCv');if(!cv||cur.view!=='video'){vPrev=null;return}const it=Store.get(cur.vid);if(!it){vPrev=null;return}const sc=vidScenes(it),tot=sc.reduce((a,s)=>a+s.t,0)||1,tpl=tplFor(it);
  const t=((performance.now()/1000)%tot);try{drawVideoFrame(cv.getContext('2d'),tpl,sc,t,cv.width/1080,cur.subs!==false)}catch(e){}vPrev=requestAnimationFrame(previewLoop)}
async function renderVideo(it){const tpl=tplFor(it),sc=vidScenes(it),tot=sc.reduce((a,s)=>a+s.t,0),st=q('#vSt');
  const cv=document.createElement('canvas');cv.width=1080;cv.height=1920;const g=cv.getContext('2d');
  if(!cv.captureStream||!window.MediaRecorder){st.textContent='This browser cannot record video. Use Chrome, Edge or Safari 17+ on a computer.';return}
  const stream=cv.captureStream(30);let actx=null,src=null,hasAudio=false;const voice=Session.voices.get(it.id);
  if(voice){try{actx=new AudioContext();const buf=await actx.decodeAudioData(await voice.file.arrayBuffer());src=actx.createBufferSource();src.buffer=buf;const dst=actx.createMediaStreamDestination();src.connect(dst);dst.stream.getAudioTracks().forEach(t=>stream.addTrack(t));hasAudio=true}catch(e){st.textContent='Could not read the voiceover file; rendering without audio.'}}
  const types=['video/mp4;codecs=avc1.640028,mp4a.40.2','video/mp4;codecs=avc1','video/mp4','video/webm;codecs=vp9,opus','video/webm'];const mime=types.find(t=>MediaRecorder.isTypeSupported(t))||'';const ext=mime.includes('mp4')?'mp4':'webm';
  const rec=new MediaRecorder(stream,{mimeType:mime||undefined,videoBitsPerSecond:12e6});const chunks=[];rec.ondataavailable=e=>e.data.size&&chunks.push(e.data);const done=new Promise(r=>rec.onstop=r);
  state.media.forEach(m=>{if(m.type==='video'){try{m.el.currentTime=0;m.el.play()}catch(e){}}});
  drawVideoFrame(g,tpl,sc,0,1,cur.subs!==false);rec.start(250);if(src)src.start();const t0=performance.now();
  await new Promise(res=>{const step=()=>{const t=(performance.now()-t0)/1000;if(t>=tot){res();return}drawVideoFrame(g,tpl,sc,t,1,cur.subs!==false);st.textContent=`Recording ${t.toFixed(0)} / ${tot}s · keep this tab open`;requestAnimationFrame(step)};step()});
  const recSec=(performance.now()-t0)/1000;rec.stop();if(src)try{src.stop()}catch(e){};await done;if(actx)actx.close();stream.getTracks().forEach(t=>t.stop());
  const blob=new Blob(chunks,{type:mime||'video/webm'}),url=URL.createObjectURL(blob),name=`day${String(it.n).padStart(2,'0')}-${it.format}.${ext}`;
  const meta=await new Promise(r=>{const v=document.createElement('video');v.preload='metadata';v.muted=true;v.onloadedmetadata=()=>r({w:v.videoWidth,h:v.videoHeight,d:v.duration});v.onerror=()=>r({});v.src=url;setTimeout(()=>r({}),4000)});
  const dur=isFinite(meta.d)&&meta.d>0?meta.d:recSec,C=[[Math.abs(dur-tot)<=.6,`Duration ${dur.toFixed(1)}s (planned ${tot}s)${isFinite(meta.d)?'':' · measured while recording'}`],[!meta.w||(meta.w===1080&&meta.h===1920),`Resolution ${meta.w?meta.w+'×'+meta.h:'1080×1920 (canvas)'}`],[blob.size>10000,`File ${(blob.size/1048576).toFixed(1)} MB, ${ext.toUpperCase()}`],[!voice||hasAudio,voice?(hasAudio?'Voiceover track included':'Voiceover could not be added'):'No voiceover (add one for sound)'],[cur.subs===false||sc.every(s=>!s.vo||s.t>0),cur.subs===false?'Subtitles off':'Subtitles timed to each scene']];
  q('#vQA').innerHTML=`<h3>Video quality checks</h3><ul class="vx-checks">${C.map(([ok,l])=>`<li class="${ok?'':'f'}">${h(l)}</li>`).join('')}</ul>${ext==='webm'?'<p class="vx-small vx-muted">Instagram accepts WebM uploads from a computer; convert to MP4 for the phone app.</p>':''}`;
  Session.assets.set(it.id,[{kind:'video',blob,url,name}]);st.textContent='Rendered.';deliver(blob,name,true)}

/* ---- Copy Studio ---- */
const COPY_TYPES=['Social media caption','Advertising copy','Product description','Website headline','Landing page copy','Blog article','Email campaign','WhatsApp campaign','Video script','Instagram hooks','LinkedIn thought leadership','SEO metadata','Campaign tagline','Calls to action'];
VIEWS.copy=()=>{const b=brand();if(!b)return head('Copy Studio')+needBrand();const r=cur.copyOut;const sl=(k,l,v=3)=>`<div class="vx-f"><label for="cp-${k}">${l}</label><input type="range" id="cp-${k}" name="${k}" min="1" max="5" value="${v}"></div>`;
  return head('Copy Studio','Brand-true copy in three variations, checked for restricted words and unverifiable claims.')+`<div class="vx-wrap vx-two"><form class="vx-card" data-form="copy">
  <div class="vx-fields"><div class="vx-f"><label for="cp-type">Content type</label><select id="cp-type" name="type">${COPY_TYPES.map(t=>`<option>${t}</option>`).join('')}</select></div>
  <div class="vx-f"><label for="cp-lang">Language</label><select id="cp-lang" name="lang">${['English','Hinglish','Hindi','Marathi','Tamil','Bengali','Spanish','French','Arabic'].map(l=>`<option>${l}</option>`).join('')}</select></div>
  <div class="vx-f"><label for="cp-len">Length</label><select id="cp-len" name="len"><option>Short</option><option selected>Medium</option><option>Long</option></select></div>
  <div class="vx-f"><label for="cp-aud">Audience</label><select id="cp-aud" name="aud">${(list(b.dna?.personas).length?list(b.dna.personas):[b.audience||'General']).map(p=>`<option>${h(p.slice(0,90))}</option>`).join('')}</select></div></div>
  <div class="vx-f"><label for="cp-brief">What is it for?</label><textarea id="cp-brief" name="brief" required placeholder="e.g. Announce the crimson ikat drop for wedding season, link in bio"></textarea></div>
  <div class="vx-f"><label for="cp-tone">Tone</label><input type="text" id="cp-tone" name="tone" value="${h(b.dna?.tone||'')}"></div>
  <div class="vx-fields">${sl('formality','Formality')}${sl('humour','Humour',1)}${sl('emotion','Emotional intensity')}${sl('commercial','Commercial intent')}${sl('creativity','Creativity',4)}${sl('reading','Reading level')}</div>
  <div class="vx-row"><button class="vx-btn pri" type="submit">Write 3 variations · ${rate('copy')} credit${rate('copy')>1?'s':''}</button><span class="vx-status" id="cpSt"></span></div></form>
  <div>${r?r.map((v,i)=>{const it={caption:v.text,headline:v.title,hook:'',cta:'',hashtags:[]};const Q=quality(it,b).checks.filter(c=>c.cat==='brand');
    return`<div class="vx-card"><h2><span>Variation ${i+1}${v.title?' · '+h(v.title):''}</span><button class="vx-btn sm" data-act="copytext" data-t="${h(v.text)}" type="button">Copy</button></h2><div class="vx-copy">${h(v.text)}</div><div class="vx-row">${Q.map(c=>chip(c.label,c.ok?'ok':'warn')).join('')}${v.chars?chip(String(v.text).length+' characters'):''}</div><p class="vx-small vx-muted">${h(v.why||'')}</p></div>`}).join(''):'<div class="vx-card vx-empty"><p>Variations appear here.</p></div>'}</div></div>`};

/* ---- Voice Studio ---- */
VIEWS.voice=()=>{const b=brand(),c=camp();if(!b)return head('Voice Studio')+needBrand();const vids=items(c).filter(i=>i.scenes);const it=vids.find(x=>x.id===cur.vid)||vids[0];if(it)cur.vid=it.id;const V=b.vault.voices||[];
  return head('Voice Studio','Script, pacing and your own recorded voice. Cloned voices need a verified consent record first.')+`<div class="vx-wrap vx-two"><div>
  <div class="vx-card"><h2>Voiceover script</h2>${it?`<select data-act="pickvid" aria-label="Reel">${vids.map(v=>`<option value="${v.id}" ${v.id===it.id?'selected':''}>${fmtD(v.date)} · ${h(v.headline)}</option>`).join('')}</select>
   <table class="vx-table" style="margin-top:8px"><thead><tr><th class="n">Sec</th><th>Line</th><th class="n">Words/sec</th></tr></thead><tbody>${it.scenes.map(s=>{const r=words(s.voiceover)/(+s.t||1);return`<tr><td class="n">${s.t}</td><td>${h(s.voiceover)}</td><td class="n">${r>2.7?chip(r.toFixed(1),'bad'):r.toFixed(1)}</td></tr>`}).join('')}</tbody></table>
   <div class="vx-row" style="margin-top:10px"><button class="vx-btn" data-act="prompter" type="button">Start teleprompter</button>${Store.tts?`<button class="vx-btn" data-act="ttsprev" type="button">Hear the pacing</button>`:''}
   <label class="vx-btn" for="vo-up">${Session.voices.get(it.id)?'Replace recording':'Upload my recording'}<input type="file" id="vo-up" accept="audio/*" hidden></label>${Session.voices.get(it.id)?chip('Recording added','ok'):''}</div>
   <div id="prompter" class="vx-copy" style="font:700 26px/1.35 var(--vx-disp);min-height:120px;margin-top:12px" aria-live="polite">Press Start, then read each line as it lights up.</div>
   <p class="vx-small vx-muted">This preview voice is for checking pacing only and is not added to videos. Your uploaded recording becomes the reel's soundtrack in the Video Studio.</p>`:'<p class="vx-muted">Generate a campaign with reels to get scripts.</p>'}</div></div>
  <div><div class="vx-card"><h2>Voice consent register</h2><p class="vx-small">Voice cloning may only use a voice whose owner has given verified permission. Record it here before any clone is made. Public figures are never cloned.</p>
   ${V.length?`<table class="vx-table"><thead><tr><th>Voice owner</th><th>Scope</th><th>Date</th><th>Verified</th></tr></thead><tbody>${V.map(v=>`<tr><td>${h(v.owner)}</td><td>${h(v.scope)}</td><td>${h(v.date)}</td><td>${v.verified?chip('Yes','ok'):chip('No','bad')}</td></tr>`).join('')}</tbody></table>`:''}
   <form data-form="voice" style="margin-top:10px"><div class="vx-fields"><div class="vx-f"><label for="vc-o">Voice owner</label><input type="text" id="vc-o" name="owner" required></div><div class="vx-f"><label for="vc-s">Permitted use</label><input type="text" id="vc-s" name="scope" value="${h(b.name)} social content"></div></div>
   <label class="vx-tog"><input type="checkbox" name="verified" required> I have the owner's written consent on file</label><div class="vx-row" style="margin-top:8px"><button class="vx-btn sm" type="submit">Add consent record</button></div></form></div></div></div>`};

/* ---- Ad Studio ---- */
VIEWS.ads=()=>{const b=brand(),c=camp();if(!b)return head('Ad Studio')+needBrand();if(!c)return head('Ad Studio')+needCamp();const A=Store.get('a_'+c.id);
  if(!A)return head('Ad Studio','Performance creative for Meta, Google, YouTube and LinkedIn, built as a test matrix.',campPicker())+`<div class="vx-card vx-wrap"><p>Kathavi writes audiences, hooks, offers, creative concepts and platform copy. Kathavi then builds a test matrix that varies one factor at a time against a control.</p><button class="vx-btn pri" data-act="genads" type="button">Generate ad kit · ${rate('ads')} credits</button><span class="vx-status" id="adSt"></span></div>`;
  const M=A.matrix||[];return head('Ad Studio',`${M.length} variants in the test matrix · ${M.filter(m=>m.approved).length} approved`,campPicker()+`<button class="vx-btn sm" data-act="genads" type="button">Regenerate · ${rate('ads')}</button>`)+`<div class="vx-wrap">
  <div class="vx-note">No ad account is connected. Nothing is ever launched or spent from Kathavi: approved variants export as a launch sheet you set up in Ads Manager or Google Ads.</div>
  <div class="vx-card vx-scroll"><h2>Ad creative matrix</h2><table class="vx-table stack"><thead><tr><th>Approve</th><th>Test</th><th>Audience</th><th>Hook</th><th>Offer</th><th>Concept</th><th>Format</th><th>CTA</th><th>Limits</th><th></th></tr></thead><tbody>${M.map((m,i)=>{const L=adLimits(m,A);return`<tr><td><input type="checkbox" data-adok="${i}" ${m.approved?'checked':''} aria-label="Approve variant ${i+1}"></td><td>${m.control?chip('Control','acc'):h(m.varies)}</td><td>${h(m.audience)}</td><td>${h(m.hook)}</td><td>${h(m.offer)}</td><td>${h(m.concept)}</td><td>${h(m.format)}</td><td>${h(m.cta)}</td><td>${L.every(x=>x.ok)?chip('OK','ok'):chip(L.filter(x=>!x.ok).map(x=>x.l).join(', '),'warn')}</td><td><button class="vx-btn sm" data-act="adstudio" data-i="${i}" type="button">Design</button></td></tr>`}).join('')}</tbody></table></div>
  <div class="vx-grid" style="margin-top:16px"><div class="vx-card"><h2>Meta copy</h2>${(A.meta?.primary||[]).map(t=>`<div class="vx-copy">${h(t)}</div>`).join('')}<h3>Headlines (40 characters)</h3>${(A.meta?.headlines||[]).map(t=>`<div class="vx-row">${h(t)} ${t.length>40?chip(t.length+'','bad'):''}</div>`).join('')}</div>
   <div class="vx-card"><h2>Google responsive search</h2><h3>Headlines (30 characters)</h3>${(A.google?.headlines||[]).map(t=>`<div class="vx-row">${h(t)} ${t.length>30?chip(t.length+'','bad'):''}</div>`).join('')}<h3>Descriptions (90 characters)</h3>${(A.google?.descriptions||[]).map(t=>`<div class="vx-row">${h(t)} ${t.length>90?chip(t.length+'','bad'):''}</div>`).join('')}</div>
   <div class="vx-card"><h2>Audiences</h2>${(A.audiences||[]).map(a=>`<h3>${h(a.name)}</h3><p class="vx-small"><b>Recommended:</b> ${h(a.recommended)}<br><b>Available on the platform:</b> ${h(a.available)} <span class="vx-tag hyp">Check in Ads Manager</span></p>`).join('')}</div>
   <div class="vx-card"><h2>Budget, retargeting, A/B plan</h2><table class="vx-table"><tbody>${(A.budget||[]).map(x=>`<tr><td>${h(x.scenario)}</td><td class="n">₹${(+x.daily_inr||0).toLocaleString('en-IN')}/day</td><td>${h(x.split)}</td></tr>`).join('')}</tbody></table><h3>Retargeting</h3><p class="vx-small">${h(A.retargeting)}</p><h3>A/B testing plan</h3><ul class="vx-small">${list(A.ab_plan).map(x=>`<li>${h(x)}</li>`).join('')}</ul><h3>Landing page</h3><p class="vx-small">${h(A.landing)}</p></div></div></div>`};
function adLimits(m,A){return[{ok:String(m.hook||'').length<=125,l:'hook over 125 chars'},{ok:String(m.cta||'').length<=30,l:'CTA long'}]}
function buildMatrix(A){const f={audience:A.audiences.map(a=>a.name),hook:list(A.hooks),offer:list(A.offers),concept:list(A.concepts),format:list(A.formats),cta:list(A.ctas)};
  const base=Object.fromEntries(Object.entries(f).map(([k,v])=>[k,v[0]||'']));const M=[{...base,control:true,varies:'',approved:false}];
  Object.entries(f).forEach(([k,v])=>v.slice(1,4).forEach(x=>M.push({...base,[k]:x,varies:k[0].toUpperCase()+k.slice(1),control:false,approved:false})));return M.slice(0,24)}

/* ---- Catalogue ---- */
VIEWS.catalogue=()=>{const b=brand();if(!b)return head('Product Catalogue')+needBrand();const P=b.products_list||[],R=b.catRules||(b.catRules={inStock:true,noDisc:true,newFirst:true});
  return head('Product Catalogue','Product descriptions, SEO, highlights, Instagram creative and ad lines for each product, in batches.')+`<div class="vx-wrap">
  <div class="vx-card"><h2>Add products</h2><form data-form="prod" class="vx-fields"><div class="vx-f"><label for="pr-sku">SKU</label><input type="text" id="pr-sku" name="sku" required></div><div class="vx-f"><label for="pr-name">Name</label><input type="text" id="pr-name" name="name" required></div><div class="vx-f"><label for="pr-price">Price</label><input type="text" id="pr-price" name="price"></div><div class="vx-f"><label for="pr-col">Collection</label><input type="text" id="pr-col" name="collection"></div><div class="vx-f"><label for="pr-st">Status</label><select id="pr-st" name="status"><option>In stock</option><option>Out of stock</option><option>Discontinued</option></select></div><div class="vx-f"><label for="pr-d">Facts (material, weave, size, care)</label><input type="text" id="pr-d" name="facts"></div><div class="vx-f"><label class="vx-tog"><input type="checkbox" name="isnew"> New collection</label><button class="vx-btn sm" type="submit">Add</button></div></form>
   ${dropField({id:'pr-csv',kind:'csv',label:'Or import a CSV',accept:'.csv,text/csv',title:'Drop a product CSV here',hint:'Columns: sku, name, price, collection, status, facts, new',wide:true})}
   <p class="vx-small vx-muted">Shopify and WooCommerce sync come with the hosted version. Nothing is ever written back to a store without your approval.</p></div>
  <div class="vx-card"><h2><span>Products · ${P.length}</span><span class="vx-row"><label class="vx-tog"><input type="checkbox" data-rule="inStock" ${R.inStock?'checked':''}> Only in stock</label><label class="vx-tog"><input type="checkbox" data-rule="noDisc" ${R.noDisc?'checked':''}> Skip discontinued</label><label class="vx-tog"><input type="checkbox" data-rule="newFirst" ${R.newFirst?'checked':''}> New collections first</label>
   <button class="vx-btn pri sm" data-act="gencat" type="button">Generate content · ${rate('catalogue')} credits per 5</button></span></h2><span class="vx-status" id="catSt"></span>
   ${P.length?`<div class="vx-scroll"><table class="vx-table stack"><thead><tr><th>SKU</th><th>Product</th><th>Status</th><th>SEO title</th><th>SEO description</th><th>Quality</th><th></th></tr></thead><tbody>${P.map((p,i)=>{const g=p.gen||{};const ok=g.seo_title?[g.seo_title.length<=60,g.seo_desc.length<=155,list(g.highlights).length>=3]:[];
    return`<tr><td>${h(p.sku)}</td><td><b>${h(p.name)}</b><br><span class="vx-small vx-muted">${h(p.price)} · ${h(p.collection)}${p.isnew?' · New':''}</span></td><td>${h(p.status)}</td><td>${h(g.seo_title||'—')}</td><td>${h(g.seo_desc||'—')}</td><td>${ok.length?(ok.every(Boolean)?chip('OK','ok'):chip('Check lengths','warn')):'—'}</td><td><button class="vx-btn sm" data-act="prodview" data-i="${i}" type="button">View</button></td></tr>`}).join('')}</tbody></table></div>`:'<p class="vx-muted">No products yet.</p>'}</div>
  ${cur.prod!=null&&P[cur.prod]?.gen?prodDetail(P[cur.prod]):''}</div>`};
function prodDetail(p){const g=p.gen;return`<div class="vx-card"><h2>${h(p.name)} <span class="vx-small vx-muted">SKU ${h(p.sku)}</span></h2><h3>Product description</h3><div class="vx-copy">${h(g.description)}</div><h3>Highlights</h3><ul>${list(g.highlights).map(x=>`<li>${h(x)}</li>`).join('')}</ul><h3>Instagram caption</h3><div class="vx-copy">${h(g.instagram)}</div><h3>Ad variations</h3>${list(g.ads).map(x=>`<div class="vx-copy">${h(x)}</div>`).join('')}<h3>Reel concept</h3><p>${h(g.reel)}</p><h3>Cross-sell</h3><p>${h(g.cross_sell)}</p></div>`}

/* ---- Vault ---- */
VIEWS.vault=()=>{const b=brand();if(!b)return head('Brand Vault')+needBrand();const V=b.vault;
  return head('Brand Vault','Everything Kathavi designs with. Product photos here feed every template, render and reel.')+`<div class="vx-wrap vx-grid">
  <div class="vx-card"><h2>Product photographs &amp; clips</h2>${V.photos.length?`<div class="vx-thumbs">${V.photos.map((p,i)=>`<figure style="margin:0"><img src="${h(p.url)}" alt="${h(p.name)}" style="aspect-ratio:4/5"><button class="vx-btn sm" data-act="delphoto" data-i="${i}" type="button" style="width:100%;margin-top:4px">Remove</button></figure>`).join('')}</div>`:'<p class="vx-muted">No photos yet. Templates are showing samples.</p>'}
   <label class="vx-btn pri" for="va-ph" style="margin-top:10px">Upload photos or clips<input type="file" id="va-ph" accept="image/*,video/*" multiple hidden></label><p class="vx-small vx-muted">${Store.assets?'Saved to your private storage.':'Storage is unavailable in this view: photos are used this session only.'} Up to 8 lead the templates.</p></div>
  <div class="vx-card"><h2>Logo &amp; colours</h2><div class="vx-row">${['primary','secondary','light'].map(k=>`<span><i class="vx-swatch" style="background:${h(b.colors[k])}"></i> ${h(b.colors[k])}</span>`).join('')}</div><p class="vx-small">Typography: ${h(b.dna?.typography||'—')}</p>${dropField({id:'va-logo',label:'Logo',accept:'image/png,image/jpeg,image/webp,image/svg+xml',title:'Drop your logo here',hint:'PNG or SVG with a transparent background works best',current:V.logo?.url,currentName:V.logo?.name,mono:(b.name||'').trim().charAt(0).toUpperCase()||null,remove:'dellogo'})}<p class="vx-small vx-muted">${V.logo?'Shown on every reel and post template for this brand.':'No logo yet: templates set your brand name in their own type.'}</p></div>
  <div class="vx-card"><h2>Approved taglines</h2>${V.taglines.map((t,i)=>`<div class="vx-row" style="justify-content:space-between"><span>${h(t)}</span><button class="vx-btn sm" data-act="deltag" data-i="${i}" type="button">Remove</button></div>`).join('')}<form data-form="tag" class="vx-row" style="margin-top:8px"><input type="text" name="t" aria-label="New tagline" required style="flex:1"><button class="vx-btn sm" type="submit">Add</button></form></div>
  <div class="vx-card"><h2>Reference models</h2><p class="vx-small">Only people with recorded consent may appear as reference models.</p>${V.models.map(m=>`<p class="vx-small"><b>${h(m.name)}</b> · ${h(m.scope)} · ${h(m.date)} ${m.consent?chip('Consent on file','ok'):chip('No consent','bad')}</p>`).join('')}<form data-form="model"><div class="vx-fields"><div class="vx-f"><label for="mo-n">Name</label><input type="text" id="mo-n" name="name" required></div><div class="vx-f"><label for="mo-s">Usage scope</label><input type="text" id="mo-s" name="scope" value="Social media, 12 months"></div></div><label class="vx-tog"><input type="checkbox" name="consent" required> Signed model release on file</label><div class="vx-row" style="margin-top:6px"><button class="vx-btn sm" type="submit">Add model</button></div></form></div>
  <div class="vx-card"><h2>Copyright &amp; licences</h2><textarea data-vault="licences" aria-label="Licence notes" placeholder="Music licences, photographer credits, font licences…">${h(V.licences)}</textarea></div>
  <div class="vx-card"><h2>Restricted words</h2><div class="vx-row">${list(b.dna?.restricted_words).map(w=>chip(w,'bad')).join('')||'<span class="vx-muted">Set them in Brand DNA.</span>'}</div><h3>Approved claims</h3><ul class="vx-small">${list(b.dna?.approved_claims).map(w=>`<li>${h(w)}</li>`).join('')}</ul></div>
  <div class="vx-card"><h2>Approved campaigns</h2>${camps(b).map(c=>{const its=items(c);return`<p class="vx-small"><b>${h(c.name)}</b> · ${its.filter(i=>i.status==='Approved').length}/${its.length} approved</p>`}).join('')||'<p class="vx-muted">None yet.</p>'}</div></div>`};

/* ---- Analytics ---- */
const METRICS=[['reach','Reach'],['impressions','Impressions'],['likes','Likes'],['comments','Comments'],['saves','Saves'],['shares','Shares'],['clicks','Link clicks'],['completion','Video completion %'],['followers','Followers gained'],['leads','Leads'],['orders','Orders'],['spend','Ad spend ₹'],['revenue','Revenue ₹']];
VIEWS.analytics=()=>{const c=camp();if(!brand())return head('Analytics')+needBrand();if(!c)return head('Analytics')+needCamp();const its=items(c),pub=its.filter(i=>['Published','Analysed','Optimised'].includes(i.status));
  const withM=pub.filter(i=>i.metrics&&+i.metrics.reach>0),sum=k=>withM.reduce((a,i)=>a+(+i.metrics[k]||0),0);const reach=sum('reach'),eng=sum('likes')+sum('comments')+sum('saves')+sum('shares');
  const byF=Object.keys(FORMATS).map(f=>{const L=withM.filter(i=>i.format===f);if(!L.length)return null;const er=L.reduce((a,i)=>{const m=i.metrics;return a+((+m.likes||0)+(+m.comments||0)+(+m.saves||0)+(+m.shares||0))/(+m.reach||1)},0)/L.length;return[f,er,L.length]}).filter(Boolean);
  return head('Analytics','Actual results you log, kept apart from AI hypotheses.',campPicker())+`<div class="vx-wrap">
  <div class="vx-stats"><div class="vx-stat"><b>${pub.length}</b><span>Published</span></div><div class="vx-stat"><b>${reach.toLocaleString('en-IN')}</b><span>Reach (actual)</span></div><div class="vx-stat"><b>${reach?(eng/reach*100).toFixed(1)+'%':'—'}</b><span>Engagement rate (actual)</span></div><div class="vx-stat"><b>${sum('spend')&&sum('revenue')?(sum('revenue')/sum('spend')).toFixed(2)+'×':'—'}</b><span>ROAS (actual)</span></div></div>
  ${byF.length?`<div class="vx-card"><h2>Engagement rate by format <span class="vx-tag ver">Actual</span></h2>${byF.map(([f,er,n])=>`<div style="display:grid;grid-template-columns:9em minmax(0,1fr) 5em;gap:10px;align-items:center;margin:6px 0"><span>${FORMATS[f]} (${n})</span><div class="vx-meter"><i style="width:${Math.min(100,er*100/Math.max(...byF.map(x=>x[1]))) }%;background:var(--vx-acc)"></i></div><span class="vx-small" style="text-align:right">${(er*100).toFixed(1)}%</span></div>`).join('')}</div>`:''}
  <div class="vx-card"><h2><span>AI Growth Advisor</span><button class="vx-btn sm pri" data-act="advisor" type="button" ${withM.length<3?'disabled':''}>Get recommendations · ${rate('advisor')}</button></h2>${withM.length<3?'<p class="vx-muted">Log results for at least 3 published entries to get recommendations.</p>':''}<span class="vx-status" id="advSt"></span>
   ${c.advice?`<p class="vx-small vx-muted">Based on ${c.advice.n} entries with logged results. Patterns are correlations, not proven causes.</p>${(c.advice.recs||[]).map(r=>`<h3>${h(r.question)}</h3><p>${h(r.answer)} <span class="vx-tag ${r.confidence==='high'?'ver':'hyp'}">${h(r.confidence)} confidence</span></p><p class="vx-small vx-muted">Evidence: ${h(r.evidence)}</p>`).join('')}`:''}</div>
  <div class="vx-card vx-scroll"><h2>Log results</h2><p class="vx-small vx-muted">Mark an entry as Published in the calendar, then enter numbers from Instagram Insights, YouTube Studio or Ads Manager.</p>
   ${pub.length?`<table class="vx-table"><thead><tr><th>Entry</th>${METRICS.map(([,l])=>`<th class="n">${l}</th>`).join('')}<th>Prediction</th></tr></thead><tbody>${pub.map(i=>`<tr><td style="min-width:180px">${fmtD(i.date)} · ${FORMATS[i.format]}<br>${h(i.headline)}</td>${METRICS.map(([k])=>`<td><input type="number" min="0" data-met="${i.id}" data-k="${k}" value="${h(i.metrics?.[k]??'')}" style="width:90px" aria-label="${k}"></td>`).join('')}<td class="vx-small">${h(i.hypothesis)} <span class="vx-tag hyp">Hypothesis</span></td></tr>`).join('')}</tbody></table>`:'<p class="vx-muted">Nothing published yet.</p>'}</div></div>`};

/* ---- Automations ---- */
VIEWS.automations=()=>{const c=camp();if(!brand())return head('Automations')+needBrand();if(!c)return head('Automations')+needCamp();const its=items(c);
  return head('Automations','Approval-driven publishing: Draft → Generated → Quality checked → Approved → Scheduled → Published → Analysed → Optimised.',campPicker())+`<div class="vx-wrap">
  <div class="vx-stats" style="grid-template-columns:repeat(auto-fill,minmax(120px,1fr))">${STATUSES.map(s=>`<div class="vx-stat"><b>${its.filter(i=>i.status===s).length}</b><span>${s}</span></div>`).join('')}</div>
  <div class="vx-card"><h2>Publishing connections</h2><table class="vx-table"><tbody>${CHANNELS.map(ch=>`<tr><td>${ch}</td><td>${chip('Not connected')}</td><td class="vx-small vx-muted">Export package ready</td></tr>`).join('')}</tbody></table><p class="vx-small">Direct publishing needs the official platform APIs and your authorisation, which come with the hosted version. Kathavi never shows a post as published unless you mark it.</p></div>
  <div class="vx-card"><h2>Bulk actions</h2><div class="vx-row"><button class="vx-btn" data-act="approveqc" type="button">Approve all quality-checked</button><button class="vx-btn" data-act="schedule" type="button">Mark approved as scheduled</button><button class="vx-btn pri" data-act="zip" type="button">Download ready-to-publish package (ZIP)</button></div></div>
  <div class="vx-card"><h2>Next 14 days</h2><ul class="vx-list">${its.filter(i=>i.date>=todayISO()&&i.date<=addDays(todayISO(),14)).map(i=>`<li><span class="when">${fmtD(i.date)}</span><span style="flex:1">${h(i.headline)} <span class="vx-small vx-muted">· ${h(i.window)}</span></span>${chip(i.status)}${i.status==='Scheduled'?`<button class="vx-btn sm" data-act="markpub" data-id="${i.id}" type="button">Mark published</button>`:''}</li>`).join('')||'<li class="vx-muted">Nothing in the next 14 days.</li>'}</ul></div></div>`};

/* ---- Settings ---- */
const READY=[['Brand DNA, Brand Vault, persistence','Live','Saved privately to your account'],['Strategy, intelligence, 3 creative directions, calendar','Live','Claude, with cost shown first'],['Quality gates, Brand Integrity, Viral Potential Index','Live','Deterministic checks, not AI self-grading'],['Branded images (144 templates)','Live','Rendered in your browser from your photos'],['Reels with subtitles and your voiceover','Live','Economy mode, 1080×1920'],['ZIP campaign package','Live','Downloads to your computer'],['Copy, Ad and Catalogue studios','Live',''],
 ['AI image generation and premium AI video','Needs provider','Prompt packs exported; generate in Higgsfield, Runway or similar'],['Text-to-speech and voice cloning','Needs provider','Upload your own recording today'],['Website crawling and live market data','Needs backend','Paste text instead'],['Social publishing and ad activation','Needs backend','Official APIs plus your authorisation'],['Shopify / WooCommerce sync','Needs backend','CSV import today'],['Sign-up, teams, roles, payments (Razorpay/Stripe), admin console','Needs backend','Next phase on Vercel + Supabase']];
VIEWS.account=()=>{const s=settings(),u=monthUse(),L=ledger();const th=pref.get('theme','system');
  return head('Settings','Theme, credits, data and readiness.')+`<div class="vx-wrap vx-two"><div>
  <div class="vx-card"><h2>Appearance</h2><div class="vx-tabs" role="tablist">${[['system','System'],['light','Light'],['dark','Dark']].map(([k,l])=>`<button role="tab" type="button" data-act="theme" data-t="${k}" aria-selected="${th===k}">${l}</button>`).join('')}</div></div>
  <div class="vx-card"><h2>Credit rates</h2><p class="vx-small vx-muted">Credits measure AI work so you can see cost before generating. No payment is connected. Change rates without code.</p><table class="vx-table"><tbody>${Object.keys(RATE_DEF).map(k=>`<tr><td>${RATE_LABEL[k]}</td><td class="n"><input type="number" min="0" max="50" data-rate="${k}" value="${s.rates[k]}" style="width:80px" aria-label="${RATE_LABEL[k]} credits"></td></tr>`).join('')}<tr><td><b>Monthly allowance</b></td><td class="n"><input type="number" min="0" data-allow value="${s.allowance}" style="width:80px" aria-label="Monthly allowance"></td></tr></tbody></table></div>
  <div class="vx-card"><h2>Usage this month</h2><p>${u.calls} AI calls · ${u.credits} credits · about ${Math.round(u.chars/4).toLocaleString('en-IN')} tokens</p><table class="vx-table"><tbody>${L.recent.slice(0,12).map(r=>`<tr><td>${new Date(r.at).toLocaleString('en-IN',{dateStyle:'short',timeStyle:'short'})}</td><td>${h(RATE_LABEL[r.action]||r.action)}</td><td class="n">${r.credits}</td></tr>`).join('')}</tbody></table></div></div>
  <div><div class="vx-card"><h2>Your data</h2><p class="vx-small">${Store.mode==='cloud'?'Saved privately to your account: nobody else who opens this page can read it.':'Saved in this browser only. Open this page on claude.ai to save to your account.'}</p><div class="vx-row"><button class="vx-btn" data-act="backup" type="button">Export backup (JSON)</button><label class="vx-btn" for="st-imp">Import backup<input type="file" id="st-imp" accept="application/json" hidden></label><button class="vx-btn" data-act="wipe" type="button">Delete all data</button></div></div>
  <div class="vx-card"><h2>Readiness assessment</h2><table class="vx-table stack"><thead><tr><th>Capability</th><th>Status</th><th>Note</th></tr></thead><tbody>${READY.map(([a,b2,c])=>`<tr><td>${a}</td><td>${chip(b2,b2==='Live'?'ok':'warn')}</td><td class="vx-small">${c}</td></tr>`).join('')}</tbody></table></div>
  <div class="vx-card"><h2>Plans <span class="vx-tag hyp">Illustrative, to validate</span></h2><table class="vx-table"><tbody>${[['Free','₹0','Product discovery'],['Creator','₹999','Individual creators'],['Growth','₹2,499','Small businesses'],['Professional','₹5,999','Established brands'],['Agency','₹14,999','Agencies, multiple brands'],['Enterprise','Custom','Large organisations']].map(r=>`<tr><td>${r[0]}</td><td class="n">${r[1]}</td><td class="vx-small">${r[2]}</td></tr>`).join('')}</tbody></table></div></div></div>`};

/* ============ ZIP export ============ */
function csvCell(v){v=Array.isArray(v)?v.join(' '):String(v??'');return/[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
async function exportZip(){const c=camp(),b=brand();if(!c||!b){notify('Nothing to export yet');return}if(!window.JSZip){notify('The ZIP library did not load. Check your connection.');return}
  const z=new JSZip(),its=items(c),slug=(b.name+'-'+c.name).toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,60),st=c.strategy||{};
  z.file('README.txt',`${b.name} — ${c.name}\n${c.objective} · ${c.duration} days from ${c.start}\n\ncalendar.csv: every entry with caption, hashtags, window and status.\ncaptions/: one ready-to-paste caption per entry.\nscripts/: reel scripts and AI video prompts.\nassets/: images and videos rendered in this session.\nads/: ad matrix and copy.\nstrategy.md, directions.md, intelligence.md, measurement.md.\n\nGenerated with VIRALOS. Performance figures are hypotheses until measured.`);
  z.file('strategy.md',`# ${c.name}\n\n${st.summary||''}\n\n## Proposition\n${st.proposition||''}\n\n## Key messages\n${list(st.key_messages).map(x=>'- '+x).join('\n')}\n\n## Pillars\n${list(st.pillars).map(x=>'- '+x).join('\n')}\n\n## Frameworks\n${(st.frameworks||[]).map(f=>`- ${f.name}: ${f.why}`).join('\n')}\n\n## Journey\n${list(st.journey).map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\n## Experiments\n${(st.experiments||[]).map(x=>`- ${x.hypothesis} | ${x.test} | ${x.measure}`).join('\n')}\n`);
  z.file('directions.md',(c.directions||[]).map((d,i)=>`# ${i===c.dir?'[CHOSEN] ':''}${d.name}\n${d.rationale}\n\nArt direction: ${d.art_direction}\nLighting: ${d.lighting}\nCamera: ${d.camera}\nNarrative: ${d.narrative}\nMoodboard:\n${list(d.moodboard).map(x=>'- '+x).join('\n')}`).join('\n\n'));
  if(c.intel)z.file('intelligence.md',(c.intel.sections||[]).map(s=>`## ${s.title}\n${(s.points||[]).map(p=>`- ${p.text} [${p.label}]`).join('\n')}`).join('\n\n'));
  z.file('measurement.md',`# Measurement plan\n${(st.success_metrics||[]).map(m=>`- ${m.metric}: ${m.target} (hypothesis) — ${m.why}`).join('\n')}\n\n${list(st.measurement_plan).map(x=>'- '+x).join('\n')}`);
  const cols=['n','date','platform','format','status','title','objective','persona','pillar','funnel','headline','hook','brief','visual','caption','cta','hashtags','window','hypothesis','template'];
  z.file('calendar.csv','﻿'+cols.join(',')+',quality,brand_integrity,viral_index\n'+its.map(i=>cols.map(k=>csvCell(k==='hashtags'?list(i.hashtags).map(t=>'#'+t):i[k])).join(',')+`,${i.qa?.score??''},${i.qa?.integrity??''},${i.qa?.vpi?.score??''}`).join('\n'));
  its.forEach(i=>{const nm=`day${String(i.n).padStart(2,'0')}-${i.format}`;z.file(`captions/${nm}.txt`,`${i.caption}\n\n${list(i.hashtags).map(t=>'#'+t).join(' ')}`);
    if(i.scenes)z.file(`scripts/${nm}.md`,`# ${i.headline}\n${i.duration}s · hook: ${i.hook}\n\n${i.scenes.map((s,k)=>`## Scene ${k+1} (${s.t}s)\nVisual: ${s.visual}\nOn screen: ${s.on_screen}\nVoiceover: ${s.voiceover}\nAI prompt: ${s.ai_prompt}`).join('\n\n')}`);
    if(i.slides)z.file(`scripts/${nm}.md`,`# ${i.headline}\n\n${i.slides.map((s,k)=>`## Slide ${k+1}\n${s.headline}\n${s.body}`).join('\n\n')}`)});
  for(const [k,arr] of Session.assets){const it=Store.get(k);if(!it||it.campaignId!==c.id)continue;arr.forEach(a=>z.file('assets/'+a.name,a.blob))}
  const A=Store.get('a_'+c.id);if(A){z.file('ads/matrix.csv','﻿approved,test,audience,hook,offer,concept,format,cta\n'+A.matrix.map(m=>[m.approved?'yes':'no',m.control?'control':m.varies,m.audience,m.hook,m.offer,m.concept,m.format,m.cta].map(csvCell).join(',')).join('\n'));z.file('ads/copy.md',`## Meta primary text\n${list(A.meta?.primary).map(x=>'- '+x).join('\n')}\n\n## Meta headlines\n${list(A.meta?.headlines).map(x=>'- '+x).join('\n')}\n\n## Google headlines\n${list(A.google?.headlines).map(x=>'- '+x).join('\n')}\n\n## Google descriptions\n${list(A.google?.descriptions).map(x=>'- '+x).join('\n')}`)}
  const blob=await z.generateAsync({type:'blob'});saveBlob(blob,slug+'.zip')}
function saveBlob(blob,name){const m=q('#vxModal');m.innerHTML=`<div class="box"><h3>${h(name)}</h3><p>${(blob.size/1048576).toFixed(2)} MB ready.</p><div class="vx-row" style="justify-content:flex-end"><button class="vx-btn" data-act="closemodal" type="button">Close</button>${Store.dl?'<button class="vx-btn pri" data-act="dosave" type="button">Save file</button>':''}</div>${Store.dl?'':'<p class="vx-small vx-muted">Saving files works when this page is open on claude.ai.</p>'}</div>`;m.classList.add('on');m._blob=blob;m._name=name}
function confirmBox(title,text,label,fn){const m=q('#vxModal');m.innerHTML=`<div class="box"><h3>${h(title)}</h3><p>${h(text)}</p><div class="vx-row" style="justify-content:flex-end"><button class="vx-btn" data-act="closemodal" type="button">Cancel</button><button class="vx-btn pri" data-act="confirmok" type="button">${h(label)}</button></div></div>`;m._fn=fn;m.classList.add('on')}

/* ============ Actions ============ */
async function busy(stId,btn,fn){const st=q('#'+stId);if(btn)btn.disabled=true;try{await fn(st)}catch(e){console.error(e);if(st)st.textContent=errText(e);else notify(errText(e))}finally{if(btn&&document.contains(btn))btn.disabled=false}}
const ACT={
 navtools:a=>{const o=a.getAttribute('aria-expanded')!=='true';pref.set('navTools',o);a.setAttribute('aria-expanded',o);a.querySelector('b').textContent=o?'–':'+';const g=a.nextElementSibling;if(g)g.hidden=!o},
 go:el=>go(el.dataset.v),newcamp:()=>{cur.wiz=wizardSeed();go('campaigns')},cancelwiz:()=>{cur.wiz=null;rerender()},
 dellogo:()=>{const b=brand();b.vault.logo=null;Store.put(b);LOGO_KEY=null;syncLogo();rerender();notify('Logo removed')},
 example:()=>{cur.newBrand=newBrand(EXAMPLE_BRAND);rerender()},addbrand:()=>{cur.newBrand=newBrand();rerender()},editsrc:()=>{cur.newBrand=brand();rerender()},cancelbrand:()=>{cur.newBrand=null;rerender()},
 dna:(el)=>{const b=brand();busy('dnaSt',el,async st=>{st.innerHTML='<span class="vx-busy"></span> Reading your brand…';await discoverDNA(b,!!el.dataset.unlocked);applyBrandToStudio();rerender()})},
 approvedna:()=>{const b=brand();b.approved=true;DNA_FIELDS.forEach(([k,,,crit])=>{if(crit)b.locked[k]=true});b.versions.push({at:Date.now(),dna:JSON.parse(JSON.stringify(b.dna)),note:'Approved; critical attributes locked'});Store.put(b);rerender();notify('Brand DNA approved')},
 restoredna:el=>{const b=brand(),v=b.versions[+el.dataset.i];if(!v)return;b.dna=JSON.parse(JSON.stringify(v.dna));b.versions.push({at:Date.now(),dna:v.dna,note:'Restored version from '+new Date(v.at).toLocaleDateString('en-IN')});b.approved=false;Store.put(b);rerender()},
 cstep:el=>{cur.cstep=el.dataset.s;rerender()},cstepgo:el=>{cur.cstep=el.dataset.s;go('campaigns')},
 gen1:el=>{const c=camp(),b=brand(),k=el.dataset.k;busy('campSt',el,async st=>{st.innerHTML='<span class="vx-busy"></span> Working…';if(k==='strategy')await genStrategy(c,b);if(k==='intel')await genIntel(c,b);if(k==='directions')await genDirections(c,b);st.textContent='';rerender()})},
 pickdir:el=>{const c=camp();c.dir=+el.dataset.i;Store.put(c);cur.cstep='gen';rerender()},
 gencal:el=>{const c=camp(),b=brand();busy('campSt',el,async st=>{const miss=slotPlan(c).filter(s=>!Store.get('i_'+c.id.slice(2)+'_'+s.n));
   for(let i=0;i<miss.length;i+=5){const sl=miss.slice(i,i+5);st.innerHTML=`<span class="vx-busy"></span> Writing entries ${i+1}–${i+sl.length} of ${miss.length}…`;const got=await genBatch(c,b,sl);
     sl.forEach(s=>{const x=got.find(g=>+g.n===s.n);if(!x)return;const it=mkItem(c,s,x);it.status='Generated';runQA(it);Store.put(it)});if(cur.view==='campaigns')q('#view-campaigns .vx-meter i')&&(q('#view-campaigns .vx-meter i').style.width=(items(c).length/slotPlan(c).length*100)+'%')}
   done('campSt',`Calendar written: ${items(c).length} entries, ${items(c).filter(i=>i.qa?.allOk).length} pass every check.`)})},
 fixall:el=>{const its=items().filter(i=>i.qa&&!i.qa.allOk);busy('campSt',el,async st=>{let n=0;for(const it of its){st.innerHTML=`<span class="vx-busy"></span> Fixing ${++n} of ${its.length}…`;await fixItem(it)}done('campSt',`Done. ${items().filter(i=>i.qa?.allOk).length} of ${items().length} entries pass every check.`)})},
 pause:()=>{const c=camp();c.paused=!c.paused;Store.put(c);rerender()},
 dupcamp:()=>{const c=camp(),n={...JSON.parse(JSON.stringify(c)),id:'c_'+id6(),name:c.name+' (copy)',created:Date.now(),advice:null};Store.put(n);items(c).forEach(i=>{const x=JSON.parse(JSON.stringify(i));x.id='i_'+n.id.slice(2)+'_'+i.n;x.campaignId=n.id;x.status='Draft';x.metrics=null;Store.put(x)});setCamp(n);rerender();notify('Campaign duplicated')},
 delcamp:()=>{const c=camp();confirmBox('Delete campaign?',`"${c.name}" and its ${items(c).length} entries will be deleted for good.`,'Delete',()=>{items(c).forEach(i=>Store.del(i.id));Store.del('a_'+c.id);Store.del(c.id);setCamp(camps()[0]||null);rerender()})},
 caltab:el=>{cur.calTab=el.dataset.t;pref.set('calTab',cur.calTab);rerender()},wk:el=>{cur.week=(cur.week||0)+(+el.dataset.d);rerender()},
 open:el=>openItem(el.dataset.id),closedrawer:()=>{q('#vxDrawer').classList.remove('on');rerender()},
 approve1:el=>{const it=Store.get(el.dataset.id);it.status='Approved';Store.put(it);openItem(it.id);paintIfVisible()},
 approveqc:()=>{let n=0;items().forEach(i=>{if(i.status==='Quality checked'){i.status='Approved';Store.put(i);n++}});notify(n+' entries approved');rerender()},
 approvesel:()=>{let n=0;cur.sel.forEach(id=>{const i=Store.get(id);if(i){i.status='Approved';Store.put(i);n++}});cur.sel.clear();notify(n+' entries approved');rerender()},
 schedule:()=>{let n=0;items().forEach(i=>{if(i.status==='Approved'){i.status='Scheduled';Store.put(i);n++}});notify(n+' entries marked as scheduled');rerender()},
 markpub:el=>{const i=Store.get(el.dataset.id);i.status='Published';Store.put(i);rerender()},
 fix1:el=>{const it=Store.get(el.dataset.id);busy('itSt',el,async st=>{st.innerHTML='<span class="vx-busy"></span> Fixing…';await fixItem(it);openItem(it.id)})},
 regen1:el=>{const it=Store.get(el.dataset.id);busy('itSt',el,async st=>{st.innerHTML='<span class="vx-busy"></span> Rewriting…';await fixItem(it,'regen');openItem(it.id)})},
 dup1:el=>{const it=Store.get(el.dataset.id),its=items(Store.get(it.campaignId)),n=Math.max(...its.map(i=>i.n))+1;const x={...JSON.parse(JSON.stringify(it)),n,id:'i_'+it.campaignId.slice(2)+'_'+n,status:'Draft'};Store.put(x);openItem(x.id)},
 copycap:el=>{const it=Store.get(el.dataset.id);copyText(`${it.caption}\n\n${list(it.hashtags).map(t=>'#'+t).join(' ')}`)},copytext:el=>copyText(el.dataset.t),
 tostudio:el=>{q('#vxDrawer').classList.remove('on');toStudio(Store.get(el.dataset.id))},
 tovideo:el=>{q('#vxDrawer').classList.remove('on');cur.vid=el.dataset.id;go('video')},
 renderimg:el=>{const it=Store.get(el.dataset.id);busy(cur.view==='images'?'imgSt':'itSt',el,async st=>{if(st)st.innerHTML='<span class="vx-busy"></span> Rendering…';const out=await renderItemImages(it);if(st)st.textContent=`${out.length} image${out.length>1?'s':''} rendered.`;if(q('#vxDrawer').classList.contains('on'))openItem(it.id);else rerender()})},
 renderall:el=>{const its=items().filter(i=>['post','carousel','story'].includes(i.format)&&(el.dataset.all||i.status==='Approved'));busy('imgSt',el,async st=>{let n=0;for(const it of its){st.innerHTML=`<span class="vx-busy"></span> Rendering ${++n} of ${its.length}…`;await renderItemImages(it);await new Promise(r=>setTimeout(r,20))}done('imgSt',`${its.length} entries rendered.`)})},
 saveasset:el=>{const A=Session.assets.get(el.dataset.id)||[];if(A.length===1)saveBlob(A[0].blob,A[0].name);else if(A.length&&window.JSZip){const z=new JSZip();A.forEach(a=>z.file(a.name,a.blob));z.generateAsync({type:'blob'}).then(b=>saveBlob(b,A[0].name.replace(/-\d+\.png$/,'')+'.zip'))}},
 vmode:el=>{cur.vmode=el.dataset.m;rerender()},
 vlen:el=>{const it=Store.get(cur.vid);if(!it||!it.scenes)return;const L=clampN(+(el.dataset.d||q('#v-len').value)||15,3,180);setLength(it,L);rerender()},
 fitscript:el=>{const it=Store.get(cur.vid);busy('vSt',el,async st=>{st.innerHTML='<span class="vx-busy"></span> Rewriting the script to fit…';await fixItem(it);done('vSt','Script rewritten for '+it.duration+'s.')})},subs:el=>{cur.subs=el.checked},
 vrender:el=>{const it=Store.get(cur.vid);busy('vSt',el,async()=>{await renderVideo(it)})},
 copyprompts:()=>{const it=Store.get(cur.vid);copyText(vidScenes(it).map((s,i)=>`Scene ${i+1} · ${s.t}s · 9:16\n${s.ai_prompt||s.visual}`).join('\n\n'))},
 regenscene:el=>{const it=Store.get(cur.vid),i=+el.dataset.i;busy('vSt',el,async st=>{st.innerHTML='<span class="vx-busy"></span> Rewriting scene…';const s=it.scenes[i];const v=await askJSON('scene',`Rewrite scene ${i+1} of this ${it.duration}s ${FORMATS[it.format]} for ${brand().name}. Keep t=${s.t}. Brand tone: ${brand().dna?.tone||''}. Neighbouring scenes: ${JSON.stringify(it.scenes.map(x=>x.on_screen))}. Current: ${JSON.stringify(s)}. Return ONLY JSON {"t":${s.t},"visual":"","on_screen":"max 7 words","voiceover":"max ${Math.floor(s.t*2.5)} words","ai_prompt":"30+ words, 9:16"}`);
   it.scenes[i]={t:s.t,visual:String(v.visual||s.visual),on_screen:String(v.on_screen||s.on_screen),voiceover:String(v.voiceover||s.voiceover),ai_prompt:String(v.ai_prompt||s.ai_prompt)};runQA(it);Store.put(it);done('vSt','Scene '+(i+1)+' rewritten.')})},
 genads:el=>{const c=camp(),b=brand();busy('adSt',el,async st=>{if(st)st.innerHTML='<span class="vx-busy"></span> Writing the ad kit…';const v=await askJSON('ads',`You are a performance marketing lead. Build an ad kit for this campaign. Never promise results, invent testimonials, or use fake urgency.
${brandBrief(b)}
Campaign: ${c.name} — ${c.objective}. Proposition: ${c.strategy?.proposition||''}.
Return ONLY JSON: {"objective":"","audiences":[{"name":"","recommended":"who and why","available":"how to approximate it with Meta/Google targeting that actually exists"}],"hooks":["4"],"offers":["3, only offers the brand can honour; no invented discounts — use value/craft/free services"],"concepts":["3"],"formats":["Reel","Carousel","Single image"],"ctas":["3, platform button names"],"meta":{"primary":["3, max 125 chars"],"headlines":["5, max 40 chars"]},"google":{"headlines":["8, max 30 chars"],"descriptions":["4, max 90 chars"]},"budget":[{"scenario":"Test|Scale|Always-on","daily_inr":0,"split":""}],"retargeting":"","ab_plan":["4 steps"],"landing":"landing page recommendation"}`);
   v.id='a_'+c.id;v.type='ads';v.campaignId=c.id;v.audiences=(v.audiences||[]).slice(0,4);v.matrix=buildMatrix(v);Store.put(v);rerender()})},
 adstudio:el=>{const A=Store.get('a_'+camp().id),m=A.matrix[+el.dataset.i];setCopy({headline:m.hook.split(/[.!?]/)[0].split(' ').slice(0,6).join(' '),sub:m.offer,cta:m.cta,label:m.concept});const t=tplList(m.format==='Reel'?'reel':'post')[0];if(t)select(t.id);go('studio')},
 gencat:el=>{const b=brand(),R=b.catRules;let P=b.products_list.filter(p=>(!R.inStock||p.status==='In stock')&&(!R.noDisc||p.status!=='Discontinued'));if(R.newFirst)P=P.slice().sort((a,c)=>(c.isnew?1:0)-(a.isnew?1:0));
   busy('catSt',el,async st=>{if(!P.length){st.textContent='No products match the rules.';return}for(let i=0;i<P.length;i+=5){const B=P.slice(i,i+5);st.innerHTML=`<span class="vx-busy"></span> Products ${i+1}–${i+B.length} of ${P.length}…`;
     const v=await askJSON('catalogue',`Write e-commerce content for these products. Use only the facts given; never invent materials, certifications or discounts. Keep SKUs exactly.
${brandBrief(b)}
PRODUCTS: ${JSON.stringify(B.map(p=>({sku:p.sku,name:p.name,price:p.price,collection:p.collection,facts:p.facts})))}
Return ONLY JSON {"products":[{"sku":"","seo_title":"max 60 chars","seo_desc":"max 155 chars","description":"80-140 words","highlights":["3-5"],"instagram":"caption with 3-5 hashtags","ads":["2 ad lines"],"reel":"one-line reel concept","cross_sell":""}]}`);
     (v.products||[]).forEach(g=>{const p=b.products_list.find(x=>x.sku===g.sku);if(p)p.gen=g});Store.put(b)}done('catSt',`Content written for ${P.length} products.`)})},
 prodview:el=>{cur.prod=+el.dataset.i;rerender()},
 delphoto:el=>{const b=brand();b.vault.photos.splice(+el.dataset.i,1);Store.put(b);rerender();notify('Removed from the vault. Reload to clear it from the studio.')},
 deltag:el=>{const b=brand();b.vault.taglines.splice(+el.dataset.i,1);Store.put(b);rerender()},
 advisor:el=>{const c=camp(),its=items(c).filter(i=>i.metrics&&+i.metrics.reach>0);busy('advSt',el,async st=>{st.innerHTML='<span class="vx-busy"></span> Analysing results…';
   const v=await askJSON('advisor',`You are a growth analyst. Using ONLY the actual results below, answer each question. State evidence from the data; say when data is insufficient; never claim causation — these are correlations. Confidence: high only with a clear, repeated pattern.
DATA: ${JSON.stringify(its.map(i=>({date:i.date,format:i.format,pillar:i.pillar,funnel:i.funnel,hook:i.hook,window:i.window,metrics:i.metrics})))}
Questions: Which formats perform best? Which audience segments respond? Which hooks should be repeated? Which content should be stopped? Which creative directions should be tested next? Which publishing windows look promising? What should the next calendar include?
Return ONLY JSON {"recs":[{"question":"","answer":"","evidence":"","confidence":"high|medium|low"}]}`);
   c.advice={n:its.length,at:Date.now(),recs:v.recs||[]};its.forEach(i=>{if(i.status==='Analysed')i.status='Optimised';Store.put(i)});Store.put(c);rerender()})},
 theme:el=>{pref.set('theme',el.dataset.t);applyTheme();rerender()},
 backup:()=>{saveBlob(new Blob([JSON.stringify(Object.fromEntries(Store.docs),null,1)],{type:'application/json'}),'kathavi-backup-'+todayISO()+'.json')},
 wipe:()=>confirmBox('Delete all data?','Every brand, campaign, entry and setting will be deleted. Export a backup first if you might need it.','Delete everything',()=>{[...Store.docs.keys()].forEach(k=>Store.del(k));setBrand(null);setCamp(null);go('home')}),
 closemodal:()=>q('#vxModal').classList.remove('on'),
 dosave:async()=>{const m=q('#vxModal');try{await Store.dl.save({filename:m._name,data:m._blob});m.classList.remove('on');notify('Saved')}catch(e){notify(e&&e.code==='declined'?'Save cancelled':'Could not save here')}},
 renamecamp:()=>{const c=camp();const m=q('#vxModal');m.innerHTML=`<div class="box"><h3>Rename campaign</h3><div class="vx-f"><label for="vxRename">Campaign name</label><input id="vxRename" type="text" maxlength="80" value="${h(c.name)}"></div><div class="vx-row" style="justify-content:flex-end"><button class="vx-btn" data-act="closemodal" type="button">Cancel</button><button class="vx-btn pri" data-act="confirmok" type="button">Rename</button></div></div>`;m._fn=()=>{const v=(q('#vxRename')?.value||'').trim();if(v){c.name=v;Store.put(c);rerender()}};m.classList.add('on');setTimeout(()=>q('#vxRename')?.focus(),30)},
fixtitle:el=>{const c=camp();c.name=el.dataset.t;Store.put(c);rerender()},
navmore:el=>{const r=q('.vx-rail');const on=!r.classList.contains('more-open');r.classList.toggle('more-open',on);el.setAttribute('aria-expanded',on?'true':'false')},
confirmok:()=>{const m=q('#vxModal');m.classList.remove('on');if(m._fn)m._fn()},
 zip:el=>{exportZip().catch(e=>{console.error(e);notify('Could not build the package')})},
 prompter:el=>{const it=Store.get(cur.vid)||items().find(i=>i.scenes);if(!it)return;const P=q('#prompter');let i=0;clearTimeout(cur.pt);const step=()=>{if(i>=it.scenes.length){P.textContent='Done. Upload your recording.';return}P.textContent=it.scenes[i].voiceover;cur.pt=setTimeout(step,(+it.scenes[i].t||3)*1000);i++};let n=3;const cd=()=>{if(n){P.textContent=String(n--);cur.pt=setTimeout(cd,800)}else step()};cd()},
 ttsprev:async el=>{const it=Store.get(cur.vid)||items().find(i=>i.scenes);try{await Store.tts.speak(it.scenes.map(s=>s.voiceover).join(' '))}catch(e){notify(e&&e.code==='rate_limited'?'Voice is busy; try again shortly':'Could not play the voice')}}
};
function wizardSeed(){const b=brand();return{name:'',objective:'Brand awareness',duration:30,start:addDays(todayISO(),1),channels:['Instagram'],mix:{reel:12,post:8,carousel:4,story:6,short:0},notes:'',language:'English',_b:b&&b.id}}
function paintIfVisible(){if(['calendar','home','automations'].includes(cur.view))render(cur.view)}
function copyText(t){navigator.clipboard.writeText(t).then(()=>notify('Copied'),()=>notify('Select the text and copy it'))}

/* ============ Forms ============ */
const FORM={
 cmd:async f=>{const t=q('#vxCmd').value.trim();if(!t)return;const st=q('#cmdStatus');st.innerHTML='<span class="vx-busy"></span> Planning…';
   let v=null;try{v=await askJSON('command',`Interpret this request for a marketing studio. Request: "${t}". Return ONLY JSON {"action":"campaign|reel|creative|ad|copy|brand","campaign":{"name":"","objective":"one of: ${OBJECTIVES.join(', ')}","duration":30,"channels":["Instagram"],"notes":"the creative intent"},"copy":{"type":"","brief":""}}`)}catch(e){v=localIntent(t);if(e.code!=='no_ai')st.textContent=errText(e)}
   v=v||localIntent(t);st.textContent='';if(!brand()){go('brands');return}
   if(v.action==='campaign'){const w=wizardSeed(),c=v.campaign||{};Object.assign(w,{name:c.name||'',objective:OBJECTIVES.includes(c.objective)?c.objective:w.objective,duration:+c.duration||30,channels:list(c.channels).filter(x=>CHANNELS.includes(x)).length?list(c.channels).filter(x=>CHANNELS.includes(x)):w.channels,notes:c.notes||t});scaleMix(w);cur.wiz=w;go('campaigns')}
   else if(v.action==='copy'){cur.copySeed=v.copy;go('copy')}else go({reel:'video',creative:'studio',ad:'ads',brand:'brands'}[v.action]||'campaigns')},
 brand:f=>{const fd=new FormData(f);const b=Store.get(fd.get('id'))||cur.newBrand||newBrand();['name','handle','website','industry','desc','products','audience','competitors','guidelines'].forEach(k=>b[k]=String(fd.get(k)||'').trim());
   if(!b.name)return;Store.put(b);setBrand(b);cur.newBrand=null;const lf=fd.get('logo');if(lf&&lf.size)addLogo(lf);rerender();const btn=q('[data-act="dna"]');if(btn&&!b.dna)btn.click()},
 wiz:f=>{const fd=new FormData(f),w=cur.wiz;w.name=String(fd.get('name')).trim();w.objective=fd.get('objective');w.duration=fd.get('duration')==='custom'?clampN(+fd.get('days')||30,3,120):+fd.get('duration');w.start=fd.get('start')||addDays(todayISO(),1);w.language=fd.get('language');w.notes=fd.get('notes');
   w.channels=fd.getAll('ch');w.reelLen=fd.get('reelLen')==='custom'?String(clampN(+fd.get('reelLenC')||30,5,180)):fd.get('reelLen');Object.keys(FORMATS).forEach(k=>w.mix[k]=clampN(+fd.get('mix_'+k)||0,0,60));if(!Object.values(w.mix).some(Boolean)){q('#campSt').textContent='Add at least one content item to the mix.';return}
   const b=brand(),c={id:'c_'+id6(),type:'campaign',brandId:b.id,created:Date.now(),name:w.name||b.name+' campaign',objective:w.objective,duration:w.duration,start:w.start,channels:w.channels.length?w.channels:['Instagram'],mix:{...w.mix},notes:w.notes,language:w.language,reelLen:w.reelLen||'mixed',dir:null};
   Store.put(c);setCamp(c);cur.wiz=null;cur.cstep='strategy';render('campaigns');const st=q('#campSt');
   busy('campSt',null,async()=>{st.innerHTML='<span class="vx-busy"></span> Writing the strategy (1 of 3)…';await genStrategy(c,b);st.innerHTML='<span class="vx-busy"></span> Intelligence and trends (2 of 3)…';await genIntel(c,b);st.innerHTML='<span class="vx-busy"></span> Three creative directions (3 of 3)…';await genDirections(c,b);cur.cstep='dirs';rerender()})},
 copy:f=>{const fd=new FormData(f),b=brand(),o=Object.fromEntries(fd);const btn=f.querySelector('[type=submit]');busy('cpSt',btn,async st=>{st.innerHTML='<span class="vx-busy"></span> Writing…';
   const v=await askJSON('copy',`You are a world-class copywriter. Write 3 distinct variations of: ${o.type}.
${brandBrief(b)}
Brief: ${o.brief}. Audience: ${o.aud}. Language: ${o.lang}. Length: ${o.len}. Tone: ${o.tone}. On 1-5 scales — formality ${o.formality}, humour ${o.humour}, emotional intensity ${o.emotion}, commercial intent ${o.commercial}, creativity ${o.creativity}, reading level ${o.reading} (1=very simple).
Never invent testimonials, statistics, guarantees or urgency. Avoid the restricted words.
Return ONLY JSON {"variations":[{"title":"short label","text":"the copy","why":"one line on the approach"}]}`);cur.copyOut=(v.variations||[]).slice(0,3);rerender()})},
 voice:f=>{const fd=new FormData(f),b=brand();b.vault.voices=b.vault.voices||[];b.vault.voices.push({owner:fd.get('owner'),scope:fd.get('scope'),date:todayISO(),verified:!!fd.get('verified')});Store.put(b);rerender()},
 prod:f=>{const fd=new FormData(f),b=brand();b.products_list.push({sku:String(fd.get('sku')).trim(),name:fd.get('name'),price:fd.get('price'),collection:fd.get('collection'),status:fd.get('status'),facts:fd.get('facts'),isnew:!!fd.get('isnew')});Store.put(b);rerender()},
 tag:f=>{const b=brand();b.vault.taglines.push(new FormData(f).get('t'));Store.put(b);rerender()},
 model:f=>{const fd=new FormData(f),b=brand();b.vault.models.push({name:fd.get('name'),scope:fd.get('scope'),consent:!!fd.get('consent'),date:todayISO()});Store.put(b);rerender()}
};
function localIntent(t){const s=t.toLowerCase();const dm=s.match(/(\d+)\s*-?\s*day/);return{action:/campaign|calendar|\d+\s*-?\s*day/.test(s)?'campaign':/\bad(s|vert)?\b/.test(s)?'ad':/reel|video|short/.test(s)?'reel':/caption|copy|email|blog|write/.test(s)?'copy':/design|poster|post|creative/.test(s)?'creative':'campaign',campaign:{name:'',duration:dm?+dm[1]:30,notes:t,channels:['Instagram']},copy:{brief:t}}}
function scaleMix(w){const k=w.duration/30;w.mix={reel:Math.max(1,Math.round(12*k)),post:Math.max(1,Math.round(8*k)),carousel:Math.max(1,Math.round(4*k)),story:Math.max(1,Math.round(6*k)),short:0}}

/* ============ Events ============ */
function bind(){const root=q('#vx');
 document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g&&root.contains(g)){go(g.dataset.go);return}
   const a=e.target.closest('[data-act]');if(!a)return;if(!(root.contains(a)||q('#vxDrawer').contains(a)||q('#vxModal').contains(a)))return;if(a.tagName==='SELECT'||(a.tagName==='INPUT'&&a.type!=='button'))return;const fn=ACT[a.dataset.act];if(fn){e.preventDefault();fn(a,e)}});
 document.addEventListener('submit',e=>{const f=e.target.closest('[data-form]');if(!f)return;e.preventDefault();FORM[f.dataset.form]&&FORM[f.dataset.form](f)});
 document.addEventListener('change',async e=>{const t=e.target;
   if(t.dataset.act==='pickcamp'){setCamp(Store.get(t.value));rerender();return}if(t.dataset.act==='pickbrand'){setBrand(Store.get(t.value));setCamp(camps()[0]||null);rerender();return}
   if(t.dataset.act==='subs'){cur.subs=t.checked;return}
   if(t.dataset.act==='subpos'){cur.subPos=t.value;return}
   if(t.dataset.act==='calfilter'){cur.calFilter=t.value;rerender();return}if(t.dataset.act==='pickvid'){cur.vid=t.value;rerender();return}
   if(t.dataset.act==='vtpl'){const it=Store.get(cur.vid);it.template=t.value;Store.put(it);return}if(t.dataset.tplfor){const it=Store.get(t.dataset.tplfor);it.template=t.value;Store.put(it);return}
   if(t.dataset.act==='selall'){qa('[data-sel]').forEach(c=>{c.checked=t.checked;t.checked?cur.sel.add(c.dataset.sel):cur.sel.delete(c.dataset.sel)});return}
   if(t.dataset.sel){t.checked?cur.sel.add(t.dataset.sel):cur.sel.delete(t.dataset.sel);return}
   if(t.dataset.lock){const b=brand();b.locked[t.dataset.lock]=t.checked;Store.put(b);rerender();return}
   if(t.dataset.bcol){const b=brand();b.colors[t.dataset.bcol]=t.value;Store.put(b);applyBrandToStudio();return}
   if(t.dataset.rule){const b=brand();b.catRules[t.dataset.rule]=t.checked;Store.put(b);return}
   if(t.dataset.it==='status'){saveItemField(t);paintIfVisible();return}
   if(t.dataset.met){const i=Store.get(t.dataset.met);i.metrics=i.metrics||{};i.metrics[t.dataset.k]=t.value===''?null:+t.value;if(i.status==='Published'&&+i.metrics.reach>0)i.status='Analysed';Store.put(i);return}
   if(t.dataset.rate){const s=settings();s.rates[t.dataset.rate]=clampN(+t.value||0,0,50);Store.put(s);paintCredits();return}if(t.hasAttribute('data-allow')){const s=settings();s.allowance=Math.max(0,+t.value||0);Store.put(s);paintCredits();return}
   if(t.id==='v-voice'||t.id==='vo-up'){const f=t.files[0];if(f){Session.voices.set(cur.vid||items().find(i=>i.scenes)?.id,{file:f,name:f.name});rerender()}return}
   if(t.id==='va-ph'){await addPhotos([...t.files]);return}if(t.id==='va-logo'){const f=t.files[0];if(f)await addLogo(f);return}
   if(t.id==='pr-csv'){const f=t.files[0];if(f)importCSV(await f.text());return}if(t.id==='st-imp'){const f=t.files[0];if(f)importBackup(await f.text());return}});
 document.addEventListener('input',e=>{const t=e.target;const wf=t.closest&&t.closest('[data-form=wiz]');if(wf){const tot=Object.keys(FORMATS).reduce((a,k)=>a+(+(wf.querySelector('[name=mix_'+k+']')||{}).value||0),0),calls=Math.ceil(tot/5),cr=rate('strategy')+rate('intel')+rate('directions')+calls*rate('calendar');const n=q('#wizCost');if(n)n.innerHTML=`<b>Cost before you generate:</b> ${tot} entries → strategy, intelligence, three creative directions and ${calls} calendar batches = <b>${cr} credits</b> (${3+calls} AI calls). No images or videos are rendered until you approve them; rendering runs free in your browser.`}
 if(t.dataset.dna){const b=brand();b.dna[t.dataset.dna]=t.dataset.list?list(t.value):t.value;b.approved=false;Store.put(b);return}
   if(t.dataset.vault){const b=brand();b.vault[t.dataset.vault]=t.value;Store.put(b);return}
   if(q('#vxDrawer').contains(t)&&(t.dataset.it||t.dataset.sc!=null||t.dataset.sl!=null)&&t.dataset.it!=='status'){saveItemField(t);return}
   if(t.dataset.vs!=null){const it=Store.get(cur.vid);if(!it)return;const i=+t.dataset.vs,k=t.dataset.k;if(it.format==='story'){const f=it.frames[i];if(k==='t')f.t=+t.value||1;if(k==='on')f.text=t.value}else{const s=it.scenes[i];if(k==='t'){s.t=+t.value||1;it.duration=it.scenes.reduce((a,x)=>a+(+x.t||0),0)}if(k==='on')s.on_screen=t.value;if(k==='vo')s.voiceover=t.value}runQA(it);Store.put(it)}});
 /* drag & drop: calendar days and kanban columns */
 document.addEventListener('dragstart',e=>{const p=e.target.closest&&e.target.closest('.vx-pill,.vx-kcard');if(p){e.dataTransfer.setData('text/vx-item',p.dataset.id);e.dataTransfer.effectAllowed='move'}});
 document.addEventListener('dragover',e=>{const z=e.target.closest&&e.target.closest('.vx-day[data-date]:not([data-date=""]),.vx-col');if(z&&[...e.dataTransfer.types].includes('text/vx-item')){e.preventDefault();qa('.drop').forEach(x=>x!==z&&x.classList.remove('drop'));z.classList.add('drop')}});
 document.addEventListener('drop',e=>{const z=e.target.closest&&e.target.closest('.vx-day[data-date],.vx-col');const id=e.dataTransfer.getData('text/vx-item');qa('.drop').forEach(x=>x.classList.remove('drop'));if(!z||!id)return;e.preventDefault();const it=Store.get(id);if(!it)return;
   if(z.dataset.status)it.status=z.dataset.status;else if(z.dataset.date)it.date=z.dataset.date;Store.put(it);rerender()});
 document.addEventListener('keydown',e=>{const rb=e.target.closest&&e.target.closest('[role=button][data-act]');if(rb&&(e.key==='Enter'||e.key===' ')){e.preventDefault();rb.click();return}
   if(rb&&rb.classList.contains('vx-kcard')&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){const it=Store.get(rb.dataset.id),k=STATUSES.indexOf(it.status)+(e.key==='ArrowRight'?1:-1);if(STATUSES[k]){it.status=STATUSES[k];Store.put(it);rerender();const n=document.querySelector(`.vx-kcard[data-id="${it.id}"]`);if(n)n.focus()}return}
   if(e.key==='Escape'){if(q('#vxModal').classList.contains('on'))q('#vxModal').classList.remove('on');else if(q('#vxDrawer').classList.contains('on')){q('#vxDrawer').classList.remove('on');rerender()}}});
 addEventListener('hashchange',()=>{const v=location.hash.slice(1);if(v&&v!==cur.view)go(v)})}
AFTER.video=()=>{if(!vPrev)vPrev=requestAnimationFrame(previewLoop)};
AFTER.copy=()=>{if(cur.copySeed){const s=cur.copySeed;cur.copySeed=null;if(s.brief)q('#cp-brief').value=s.brief;if(COPY_TYPES.includes(s.type))q('#cp-type').value=s.type}};

/* ============ Media in, CSV, backup ============ */
async function addPhotos(files){const b=brand();if(!b)return;handleFiles(files);
  for(const f of files){let rec={name:f.name,url:URL.createObjectURL(f),kind:f.type.startsWith('video')?'video':'image'};
    if(Store.assets){try{const r=await Store.assets.upload(f);rec={...rec,id:r.id,url:r.url}}catch(e){notify('Could not store '+f.name+' (max 20 MB); using it for this session only')}}b.vault.photos.push(rec)}
  b.vault.photos=b.vault.photos.slice(-24);Store.put(b);rerender()}

/* ---------- Drop zone: one file field component used everywhere (logo, CSV, audio) ---------- */
const DROP_ICON={image:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="m4.5 17.5 4.8-4.6 3.2 3 2.7-2.6 4.3 4.2"/></svg>',
 csv:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h8l4.5 4.5v12.5H6z"/><path d="M14 3.5V8h4.5M9 12.5h6M9 15.5h6M9 18.5h4"/></svg>',
 audio:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13v-2M8 16V8M12 19V5M16 15V9M20 13v-2"/></svg>'};
function dropField(o){const kind=o.kind||'image',has=!!o.current;
  return`<div class="vx-dropf${o.wide?' wide':''}"><span class="vx-lab" id="${o.id}-l">${h(o.label)}</span>
  <label class="vx-drop${has?' has':''}" for="${o.id}" data-kind="${kind}">
   <span class="vx-drop-prev${kind==='image'?' checker':''}">${has&&kind==='image'?`<img src="${h(o.current)}" alt="">`:o.mono?`<i>${h(o.mono)}</i>`:DROP_ICON[kind]}</span>
   <span class="vx-drop-txt"><b class="vx-drop-name">${has?h(o.currentName||'Current file'):h(o.title||'Drop a file here')}</b><small>${has?'Drop a new file or browse to replace':h(o.hint||'')}</small></span>
   <span class="vx-drop-cta">${has?'Replace':'Browse'}</span>
   <input type="file" class="vx-sr" id="${o.id}"${o.name?` name="${o.name}"`:''} accept="${o.accept}"${o.required?' required':''} aria-labelledby="${o.id}-l">
  </label>${o.remove&&has?`<button class="vx-linkbtn" type="button" data-act="${o.remove}">Remove</button>`:''}</div>`}
function dropShow(inp){const z=inp.closest('.vx-drop');if(!z)return;const f=inp.files&&inp.files[0];if(!f)return;z.classList.add('has');
  z.querySelector('.vx-drop-name').textContent=f.name;z.querySelector('small').textContent=`${(f.size/1024<1024?Math.max(1,Math.round(f.size/1024))+' KB':(f.size/1048576).toFixed(1)+' MB')} · ready`;z.querySelector('.vx-drop-cta').textContent='Replace';
  const pv=z.querySelector('.vx-drop-prev');if(z.dataset.kind==='image'&&/^image\//.test(f.type)){pv.innerHTML='';const im=new Image();im.alt='';im.src=URL.createObjectURL(f);pv.appendChild(im)}}
document.addEventListener('change',e=>{const t=e.target;if(t&&t.matches&&t.matches('.vx-drop input[type=file]'))dropShow(t)},true);
['dragenter','dragover'].forEach(ev=>document.addEventListener(ev,e=>{const z=e.target.closest&&e.target.closest('.vx-drop');if(!z)return;e.preventDefault();z.classList.add('over')}));
['dragleave','drop'].forEach(ev=>document.addEventListener(ev,e=>{const z=e.target.closest&&e.target.closest('.vx-drop');if(!z)return;if(ev==='dragleave'&&z.contains(e.relatedTarget))return;z.classList.remove('over');
  if(ev==='drop'){e.preventDefault();const f=e.dataTransfer&&e.dataTransfer.files;if(!f||!f.length)return;const inp=z.querySelector('input[type=file]');try{const dt=new DataTransfer();dt.items.add(f[0]);inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}))}catch(_){}}}));
/* Logos belong to a brand. The engine draws whichever brand is selected; with no logo it typesets the brand name. */
let LOGO_KEY=null,LOGO_FEED=false;
function feedEngine(f){const inp=q('#logoFile');if(!inp)return;try{const dt=new DataTransfer();dt.items.add(f);inp.files=dt.files;LOGO_FEED=true;inp.dispatchEvent(new Event('change'))}catch(e){}finally{LOGO_FEED=false}}
async function saveLogo(b,f){let rec={name:f.name,url:URL.createObjectURL(f)};if(Store.assets){try{const r=await Store.assets.upload(f);rec={name:f.name,id:r.id,url:r.url}}catch(e){}}b.vault.logo=rec;Store.put(b);LOGO_KEY=b.id+'|'+rec.url}
async function addLogo(f){const b=brand();if(!b)return;feedEngine(f);await saveLogo(b,f);rerender()}
async function syncLogo(){if(typeof clearLogo!=='function')return;const b=brand();const L=b?.vault?.logo;const key=b?(b.id+'|'+(L?.url||'')):'';if(key===LOGO_KEY)return;LOGO_KEY=key;
  if(!L?.url){clearLogo();return}try{const r=await fetch(L.url);if(!r.ok)throw 0;const bl=await r.blob();if(LOGO_KEY!==key)return;feedEngine(new File([bl],L.name||'logo.png',{type:bl.type}))}catch(e){clearLogo()}}
/* A logo uploaded in Creative Studio is saved to the selected brand too. Capture phase runs before the engine clears the input. */
document.addEventListener('change',e=>{const t=e.target;if(t&&t.id==='logoFile'&&!LOGO_FEED&&t.files&&t.files[0]){const b=brand();if(b)saveLogo(b,t.files[0])}},true);
document.addEventListener('click',e=>{if(e.target&&e.target.id==='logoClear'){const b=brand();if(b&&b.vault.logo){b.vault.logo=null;Store.put(b);LOGO_KEY=b.id+'|'}}},true);
async function restoreMedia(){const b=brand();if(!b)return;const P=(b.vault.photos||[]).filter(p=>p.id).slice(-8);if(P.length){const files=[];for(const p of P){try{const r=await fetch(p.url);if(r.ok){const bl=await r.blob();files.push(new File([bl],p.name,{type:bl.type}))}}catch(e){}}if(files.length)handleFiles(files)}
}
function parseCSV(t){const rows=[];let r=[],c='',qd=false;for(let i=0;i<t.length;i++){const ch=t[i];if(qd){if(ch==='"'&&t[i+1]==='"'){c+='"';i++}else if(ch==='"')qd=false;else c+=ch}else if(ch==='"')qd=true;else if(ch===','){r.push(c);c=''}else if(ch==='\n'||ch==='\r'){if(ch==='\r'&&t[i+1]==='\n')i++;r.push(c);rows.push(r);r=[];c=''}else c+=ch}if(c||r.length){r.push(c);rows.push(r)}return rows.filter(x=>x.some(v=>v.trim()))}
function importCSV(t){const R=parseCSV(t.replace(/^﻿/,''));if(R.length<2){notify('No rows found');return}const hd=R[0].map(x=>x.trim().toLowerCase()),b=brand();let n=0;
  R.slice(1).forEach(r=>{const o=Object.fromEntries(hd.map((k,i)=>[k,(r[i]||'').trim()]));if(!o.sku||!o.name)return;const st=/disc/i.test(o.status)?'Discontinued':/out/i.test(o.status)?'Out of stock':'In stock';b.products_list.push({sku:o.sku,name:o.name,price:o.price||'',collection:o.collection||'',status:st,facts:o.facts||o.description||'',isnew:/^(y|yes|true|1)$/i.test(o.new||'')});n++});Store.put(b);notify(n+' products imported');rerender()}
function importBackup(t){try{const o=JSON.parse(t);let n=0;Object.values(o).forEach(d=>{if(d&&d.id&&d.type){Store.put(d);n++}});notify(n+' records restored');go('home')}catch(e){notify('That file is not a Kathavi backup')}}
function applyTheme(){const t=pref.get('theme','system');if(t==='system')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=t}

/* ============ Boot ============ */
async function boot(){applyTheme();buildNav();bind();paintCredits();const start=location.hash.slice(1)||'home';go(start);
  await Store.init();paintCredits();
  if(Store.mode==='offline'){const box=document.createElement('div');box.className='vx-card vx-offline';box.setAttribute('role','alert');box.innerHTML='<h2>We could not reach your account</h2><p class="vx-muted">Your brands and campaigns are safe on Kathavi. The connection to your account did not answer for about a minute. Try again in a moment.</p><button class="vx-btn pri" type="button" onclick="location.reload()">Try again</button>';qa('.vx-view').forEach(x=>x.hidden=true);(q('.vx-main')||document.body).prepend(box);const sb=q('#vxStore');if(sb)sb.textContent='Not connected';return}
  const b=brand();if(b){setBrand(b);restoreMedia()}
  const sb=q('#vxStore');if(sb)sb.textContent=Store.mode==='cloud'?'Saved to your account':'Saved in this browser';render(cur.view)}
window.VIRALOS={fixItem,genStrategy,genIntel,genDirections,genBatch,mkItem,setCamp,id6,OBJECTIVES,CHANNELS,dropField,Store,go,quality:(it)=>quality(it,brand()),slotPlan,runQA,exportZip,cur,VIEWS,AFTER,ACT,FORM,NAV,ICON,render,rerender,buildNav,head,chip,h,q,qa,list,words,fmtD,todayISO,addDays,brand,camp,camps,items,Session,notify,busy,done,FORMATS,tplFor,tplList,renderItemImages,renderStill,withCopy,copyFor,vidScenes,saveBlob,paintCredits,rate,copyText,needBrand,needCamp,campPicker,brandBrief,askJSON,errText,setLength,confirmBox};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
