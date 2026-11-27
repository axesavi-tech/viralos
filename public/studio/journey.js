/* Kathavi — the brand journey.
 * Seven stages from idea to a learning brand, run by nine AI specialists and a Chief Brand Architect.
 * Every recommendation is a proposal: the owner accepts, edits, rejects or writes their own. Accepted decisions form
 * the Brand Genome, which every later specialist and every studio tool builds on.
 */
(()=>{const V=window.VIRALOS;if(!V)return;
const {q,qa,h,Store,brand,go,rerender,notify,askJSON,errText,list,ACT,VIEWS,AFTER,head,NAV,ICON}=V;

/* ---------------- specialists ---------------- */
const SPEC={
 architect:{n:'Chief Brand Architect',i:'CA',c:'#2B1B3D',mission:'Turns your idea into a sequenced brand programme, resolves conflicting advice and decides the next best step.',
  method:'Strategic sequencing, decision gates, dependency mapping.',owns:'The journey plan and the Brand Genome as a whole.',asks:'Approves nothing on your behalf; flags decisions only you can make.'},
 market:{n:'Market & Audience Analyst',i:'MA',c:'#1F6F78',mission:'Finds where the opportunity is and who it is for: category, trends, audiences and competitors.',
  method:'Jobs-to-be-done, segmentation, consumer psychology, trend analysis (sustainable shifts vs hype).',owns:'Idea brief, market snapshot, audience profiles, competitive gaps.',asks:'Marks every market statement as a hypothesis until you verify it.'},
 strategist:{n:'Brand Strategist',i:'BS',c:'#8A2E1F',mission:'Defines what the brand stands for and why anyone should care.',
  method:'Purpose, positioning statement, value proposition, archetypes, proof points.',owns:'Positioning, personality, brand story.',asks:'Claims must be provable; you approve every promise.'},
 verbal:{n:'Verbal Identity Strategist',i:'VI',c:'#A0522D',mission:'Names the brand and gives it a voice people recognise without the logo.',
  method:'Naming linguistics, tone of voice, messaging architecture, claim discipline.',owns:'Name and tagline options, voice, vocabulary, messaging.',asks:'Names, handles and domains need a trademark and availability check before use.'},
 creative:{n:'Creative Director',i:'CD',c:'#5B3A8C',mission:'Sets the creative vision so every asset feels like one brand.',
  method:'Art direction, campaign concepts, creative quality standards.',owns:'Creative direction and art direction rules.',asks:'Rejects generic or off-brand work.'},
 visual:{n:'Visual Designer',i:'VD',c:'#2E6B3F',mission:'Builds the visual identity: colour, type, imagery and layout rules.',
  method:'Colour psychology, typographic hierarchy, design systems, accessibility contrast.',owns:'Palette, typography, imagery, logo direction.',asks:'Checks colour contrast and legibility on phones.'},
 content:{n:'Story & Content Strategist',i:'SC',c:'#B5651D',mission:'Turns strategy into stories, content pillars and the first content people see.',
  method:'Editorial pillars, hooks, narrative arcs, platform-native formats, conversion copy.',owns:'Content pillars, launch content, storefront and bio copy.',asks:'No invented testimonials, numbers or offers.'},
 motion:{n:'Film & Motion Director',i:'FM',c:'#1D4E89',mission:'Gives the brand a motion and sound language for reels, ads and video.',
  method:'Pacing, transitions, cinematography, sonic identity.',owns:'Motion themes, pacing, music and voice direction.',asks:'Uses only music and voices you have rights to.'},
 growth:{n:'Growth Marketer',i:'GM',c:'#C0392B',mission:'Gets the brand found, bought and recommended, and learns what works.',
  method:'Go-to-market, channel strategy, community, creators, experiments, KPIs.',owns:'Launch plan, channel playbook, KPIs and experiments.',asks:'Budgets in shares, not invented amounts; you set the money.'},
 quality:{n:'Quality & Governance Lead',i:'QG',c:'#4A4A4A',mission:'Keeps everything accurate, consistent, accessible and compliant.',
  method:'Brand consistency audits, advertising claims (ASCI), accessibility, cultural sensitivity, AI-content labelling.',owns:'Review gates before anything goes public.',asks:'Escalates anything legal, sensitive or irreversible to you.'},
};
const THEME_IDS=['quiet-luxury','kinetic-type','cinematic-noir','editorial-magazine','heritage-story','swiss-minimal','quirky-ad','product-showcase','film-nostalgia','founder-story','depth-studio','cube-motion','gallery-depth'];
const THEME_NAME=id=>id.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');

/* ---------------- stages and deliverables ----------------
 * field: k key, l label, t type (text|list|palette|themes), g guidance for the specialist, dna Genome section, sync legacy target */
const STAGES=[
 {key:'discover',n:1,name:'Discover',q:'What is worth building, for whom, and why?',out:'A clear opportunity',sp:['market','architect'],tools:[['brands','Brand profile'],['campaigns','Market intelligence (in Campaigns)']],D:[
  {id:'idea',title:'Idea brief',sp:'market',desc:'Your idea, sharpened into a brief every specialist can work from.',F:[
   {k:'summary',l:'The idea in one paragraph',t:'text',g:'What it is, for whom, the problem it solves or desire it serves',dna:'strategic',sync:'desc'},
   {k:'category',l:'Category',t:'text',g:'The market category in a few words',dna:'commercial',sync:'industry'},
   {k:'offer',l:'What you will sell',t:'list',g:'Products, services or plans, one per line; only what the owner described or clearly implied',dna:'product',sync:'products'},
   {k:'market',l:'Where you will sell',t:'text',g:'Geography and main sales channels (D2C site, marketplaces, app stores, retail)',dna:'channel'},
   {k:'price_tier',l:'Price positioning',t:'text',g:'Mass, masstige, premium or luxury, with one-line reasoning; no invented prices',dna:'commercial',sync:'dna.pricing'}]},
  {id:'market',title:'Market snapshot',sp:'market',desc:'Trends, white space and risks, stated as hypotheses to check.',F:[
   {k:'trends',l:'Trends that matter',t:'list',g:'3-5 durable shifts relevant to this idea, each phrased as a hypothesis to validate',dna:'strategic'},
   {k:'whitespace',l:'The gap to own',t:'text',g:'The underserved need or position this brand can own',dna:'strategic'},
   {k:'risks',l:'Risks and assumptions to test',t:'list',g:'What could make this fail; what to verify first',dna:'commercial'}]},
  {id:'audience',title:'Audience',sp:'market',desc:'Who the brand is for, what moves them and what holds them back.',F:[
   {k:'personas',l:'Core audiences',t:'list',g:'2-3 personas: "Name — who they are; job to be done; what they value"',dna:'consumer',sync:'dna.personas'},
   {k:'motivations',l:'Motivations and emotional triggers',t:'list',g:'What makes them buy',dna:'consumer',sync:'dna.emotional_triggers'},
   {k:'anxieties',l:'Anxieties and objections',t:'list',g:'What stops them buying, and what reassures them',dna:'consumer',sync:'dna.problems'},
   {k:'moments',l:'Buying moments',t:'list',g:'Occasions and triggers when they look for this',dna:'consumer'}]},
  {id:'competition',title:'Competitive landscape',sp:'market',desc:'Who else they consider, and where you can be different.',F:[
   {k:'alternatives',l:'Alternatives customers consider',t:'list',g:'Competitor types or examples to check (say "examples to verify"); include doing nothing',dna:'strategic'},
   {k:'their_positions',l:'How alternatives position themselves',t:'list',g:'Common positions and claims in the category',dna:'strategic'},
   {k:'gaps',l:'Gaps you can exploit',t:'list',g:'Where alternatives fall short for the core audience',dna:'strategic',sync:'dna.competitive'}]}]},
 {key:'define',n:2,name:'Define',q:'What does the brand stand for, and how does it sound?',out:'A strategic foundation',sp:['strategist','verbal'],tools:[['brands','Brand DNA']],D:[
  {id:'positioning',title:'Positioning',sp:'strategist',desc:'Purpose, promise and the reason to believe.',F:[
   {k:'purpose',l:'Purpose',t:'text',g:'Why the brand exists beyond profit, one sentence',dna:'strategic',sync:'dna.purpose'},
   {k:'statement',l:'Positioning statement',t:'text',g:'For [audience] who [need], [brand] is the [frame] that [benefit] because [reason to believe]',dna:'strategic',sync:'dna.positioning'},
   {k:'value_prop',l:'Value proposition',t:'text',g:'The core promise in plain words',dna:'strategic',sync:'dna.value_prop'},
   {k:'differentiators',l:'Differentiators',t:'list',g:'3-4 things that are true and different',dna:'product',sync:'dna.differentiators'},
   {k:'proof',l:'Proof points',t:'list',g:'Evidence the owner can show (process, materials, people, guarantees); mark any that need confirming',dna:'product',sync:'dna.approved_claims'}]},
  {id:'personality',title:'Personality and values',sp:'strategist',desc:'How the brand behaves, like a person would.',F:[
   {k:'archetype',l:'Archetype',t:'text',g:'One archetype with a one-line why',dna:'strategic',sync:'dna.archetype'},
   {k:'traits',l:'Personality traits',t:'list',g:'4-5 traits, each "is X, not Y"',dna:'verbal',sync:'dna.personality'},
   {k:'values',l:'Values',t:'list',g:'3-4 values with what each means in behaviour',dna:'strategic'}]},
  {id:'naming',title:'Name and tagline',sp:'verbal',desc:'Options to consider, with the reasoning. Keep your own name if you have one.',F:[
   {k:'name',l:'Brand name',t:'text',g:'If the owner already has a name, return it unchanged and offer variants only as alternatives; else a distinctive, easy to say name. Never claim availability.',dna:'verbal',sync:'name'},
   {k:'tagline',l:'Tagline',t:'text',g:'Short, ownable, no clichés',dna:'verbal',sync:'tagline'},
   {k:'handles',l:'Handle and domain ideas',t:'list',g:'@handle and domain ideas; say they need an availability and trademark check',dna:'channel'}]},
  {id:'voice',title:'Voice and messaging',sp:'verbal',desc:'How the brand speaks, and what it never says.',F:[
   {k:'tone',l:'Tone of voice',t:'text',g:'Describe the voice in 2-3 sentences with an example line',dna:'verbal',sync:'dna.tone'},
   {k:'say',l:'Words and phrases we use',t:'list',g:'Signature vocabulary',dna:'verbal'},
   {k:'avoid',l:'Words and phrases we avoid',t:'list',g:'Clichés, risky claims, off-brand words',dna:'verbal',sync:'dna.restricted_words'},
   {k:'messages',l:'Key messages',t:'list',g:'3-4 message pillars, one line each',dna:'verbal'}]},
  {id:'story',title:'Brand story',sp:'strategist',desc:'The origin and the belief, told so people remember it.',F:[
   {k:'origin',l:'Origin story',t:'text',g:'Built only from what the owner shared; leave gaps as [ask the founder]',dna:'strategic'},
   {k:'manifesto',l:'Manifesto',t:'text',g:'6-8 short lines in the brand voice',dna:'verbal'}]}]},
 {key:'design',n:3,name:'Design',q:'What does the brand look and move like?',out:'Brand DNA and design system',sp:['creative','visual','motion'],tools:[['vault','Brand Vault'],['studio','Creative Studio']],D:[
  {id:'direction',title:'Creative direction',sp:'creative',desc:'The creative idea that ties every asset together.',F:[
   {k:'idea',l:'Creative idea',t:'text',g:'A big idea or creative territory in one line, plus one sentence on how it shows up',dna:'visual'},
   {k:'moodwords',l:'Mood words',t:'list',g:'5-6 words for the feel',dna:'visual'},
   {k:'art',l:'Art direction',t:'text',g:'Photography and styling: light, setting, colour grading, people, props, composition',dna:'visual',sync:'dna.visual_language'},
   {k:'never',l:'What we never do visually',t:'list',g:'Visual clichés and off-brand choices to avoid',dna:'visual'}]},
  {id:'identity',title:'Visual identity',sp:'visual',desc:'Colour, type and logo direction, ready for every template.',F:[
   {k:'palette',l:'Colour palette',t:'palette',g:'4-5 colours with roles: primary, accent, light background, dark text, support. Ensure text contrast.',dna:'visual',sync:'colors'},
   {k:'typography',l:'Typography',t:'text',g:'Headline and body pairing (widely available fonts), with why',dna:'visual',sync:'dna.typography'},
   {k:'logo',l:'Logo direction',t:'text',g:'Wordmark/symbol concept, style, what it should evoke; a brief for a designer',dna:'visual'}]},
  {id:'motionlang',title:'Motion and sound',sp:'motion',desc:'How reels and video should feel and sound.',F:[
   {k:'themes',l:'Recommended reel themes',t:'themes',g:'2-3 theme ids from the list that fit the brand',dna:'motion'},
   {k:'pacing',l:'Pacing and transitions',t:'text',g:'Rhythm, cut speed, transitions, camera movement',dna:'motion'},
   {k:'sound',l:'Sonic direction',t:'text',g:'Music mood and genres, voice character; licensed music only',dna:'sonic'}]}]},
 {key:'create',n:4,name:'Create',q:'What stories will the brand tell first?',out:'A content library',sp:['content','motion','creative'],tools:[['campaigns','Campaigns'],['calendar','Content Calendar'],['reels','Reel Studio'],['images','Image Studio'],['copy','Copy Studio'],['video','Video Studio'],['voice','Voice Studio']],D:[
  {id:'pillars',title:'Content pillars',sp:'content',desc:'What the brand posts about, and in what mix.',F:[
   {k:'pillars',l:'Content pillars',t:'list',g:'4-5 pillars: "Pillar — what it covers"',dna:'channel',sync:'dna.pillars'},
   {k:'formats',l:'Format mix',t:'text',g:'Reels, carousels, posts and stories split as shares, with why',dna:'channel'},
   {k:'cadence',l:'Posting rhythm',t:'text',g:'A sustainable weekly rhythm for a small team',dna:'channel'}]},
  {id:'launchcontent',title:'First content',sp:'content',desc:'Hooks and concepts for the first two weeks, ready to make in the studios.',F:[
   {k:'hooks',l:'Opening hooks',t:'list',g:'6 scroll-stopping first lines in the brand voice',dna:'verbal'},
   {k:'reels',l:'Reel concepts',t:'list',g:'4 reel ideas: "Title — scene idea — theme id"',dna:'motion'},
   {k:'carousels',l:'Carousel and post concepts',t:'list',g:'4 ideas: "Title — slide flow"',dna:'channel'},
   {k:'ctas',l:'Calls to action',t:'list',g:'CTAs matched to funnel stage',dna:'verbal',sync:'dna.cta_styles'}]}]},
 {key:'experience',n:5,name:'Experience',q:'What happens when someone finds the brand?',out:'A storefront and journey that convert',sp:['content','growth','visual'],tools:[['catalogue','Product Catalogue'],['copy','Copy Studio']],D:[
  {id:'storefront',title:'Storefront and profile',sp:'content',desc:'The words and structure of your site, store page or app listing, and your social profile.',F:[
   {k:'hero',l:'Home or listing headline',t:'text',g:'Headline + subline for the website, store front or app store page',dna:'channel'},
   {k:'sections',l:'Page structure',t:'list',g:'Sections in order, each with its job',dna:'channel'},
   {k:'bio',l:'Instagram bio',t:'text',g:'Under 150 characters, with a clear next step',dna:'channel'},
   {k:'highlights',l:'Story highlights',t:'list',g:'4-6 highlight names and what each holds',dna:'channel'}]},
  {id:'journeymap',title:'Customer journey',sp:'growth',desc:'How people should feel and what they need at each moment.',F:[
   {k:'stages',l:'Journey moments',t:'list',g:'Discover, consider, buy or sign up, first use, repeat, recommend: "Moment — what they need — how we deliver it"',dna:'consumer'},
   {k:'trust',l:'Trust builders',t:'list',g:'What reassures buyers here (returns, guarantees, reviews to collect, demos); only what the owner can honour',dna:'commercial'},
   {k:'first_use',l:'First experience',t:'text',g:'Physical: unboxing and first wear/use. Digital: onboarding and time to value.',dna:'product'}]}]},
 {key:'launch',n:6,name:'Launch',q:'How will people find, buy and talk about it?',out:'A market activation plan',sp:['growth'],tools:[['campaigns','Campaigns'],['ads','Ad Studio'],['automations','Automations']],D:[
  {id:'gtm',title:'Go-to-market plan',sp:'growth',desc:'Phases, channels and what success looks like.',F:[
   {k:'phases',l:'Launch phases',t:'list',g:'Tease, launch, sustain: "Phase (timing) — goal — key actions"',dna:'channel'},
   {k:'channels',l:'Priority channels',t:'list',g:'Channel — role — why, in priority order',dna:'channel'},
   {k:'budget',l:'Budget split',t:'text',g:'Shares by channel or activity as percentages only; the owner sets the amount',dna:'commercial'},
   {k:'kpis',l:'Launch KPIs',t:'list',g:'Metric — why it matters (no invented targets; suggest how to set them)',dna:'performance'}]},
  {id:'community',title:'Community and creators',sp:'growth',desc:'Who to partner with and how to build a following.',F:[
   {k:'creators',l:'Creator profile',t:'text',g:'The kind of creators to work with, audience fit over follower count',dna:'channel'},
   {k:'ideas',l:'Community ideas',t:'list',g:'Rituals, UGC prompts, events or programmes',dna:'channel'},
   {k:'pr',l:'Story angles for press',t:'list',g:'Newsworthy angles from what is true about the brand',dna:'strategic'}]}]},
 {key:'learn',n:7,name:'Learn',q:'What is working, and what do we change?',out:'Evidence-based improvements',sp:['growth','quality'],tools:[['analytics','Analytics']],D:[
  {id:'experiments',title:'Experiments',sp:'growth',desc:'What to test first, so decisions come from evidence.',F:[
   {k:'tests',l:'Experiment backlog',t:'list',g:'"Hypothesis — test — metric — decision rule", 4-5 items',dna:'performance'},
   {k:'signals',l:'Signals to watch weekly',t:'list',g:'Leading indicators and what each tells you',dna:'performance'}]},
  {id:'review',title:'Brand review',sp:'quality',desc:'An audit of every decision so far: consistency, claims, accessibility and sensitivity.',F:[
   {k:'consistency',l:'Consistency issues',t:'list',g:'Where decisions conflict with each other; say "none found" if none',dna:'performance'},
   {k:'claims',l:'Claims to substantiate',t:'list',g:'Statements that need proof before public use (ASCI)',dna:'commercial'},
   {k:'access',l:'Accessibility',t:'list',g:'Contrast, legibility, captions, alt text',dna:'visual'},
   {k:'sensitivity',l:'Cultural and ethical checks',t:'list',g:'Anything that could misrepresent communities or crafts',dna:'strategic'}]}]},
];
const DNA_SECTIONS=[['strategic','Strategic DNA','Purpose, positioning and difference'],['consumer','Consumer DNA','Audiences, motives and moments'],['product','Product DNA','Offer, proof and first experience'],
 ['verbal','Verbal DNA','Name, voice and messages'],['visual','Visual DNA','Colour, type and art direction'],['motion','Motion DNA','Reel themes and pacing'],['sonic','Sonic DNA','Music and voice'],
 ['channel','Channel DNA','Content, profiles and platforms'],['commercial','Commercial DNA','Price, risks and trust'],['performance','Performance DNA','KPIs, experiments and learning']];
const ALL_D=STAGES.flatMap(s=>s.D.map(d=>({...d,stage:s})));
const dById=id=>ALL_D.find(d=>d.id===id);

/* ---------------- genome state ---------------- */
/* Existing brands bring their Brand DNA with them: anything already in the profile arrives as the owner's own decision. */
const G=b=>{if(!b.genome){const g=b.genome={v:1,type:'',idea:b.desc||'',f:{},inputs:{},notes:{},log:[]};const d=b.dna||{};
  const put=(key,v)=>{if(v!=null&&String(Array.isArray(v)?v.join(''):v).trim())g.f[key]={value:v,status:'edited',by:'you',at:Date.now(),imported:true}};
  STAGES.forEach(s=>s.D.forEach(D=>D.F.forEach(f=>{if(!f.sync)return;const k=D.id+'.'+f.k;
   if(f.sync.startsWith('dna.'))put(k,f.t==='list'?list(d[f.sync.slice(4)]):Array.isArray(d[f.sync.slice(4)])?d[f.sync.slice(4)].join('; '):d[f.sync.slice(4)]);
   else if(f.sync==='name'&&b.name)put(k,b.name);else if(f.sync==='tagline')put(k,(b.vault?.taglines||[])[0]);else if(f.sync==='industry')put(k,b.industry);
   else if(f.sync==='products'&&b.products)put(k,list(String(b.products).split(/;\s*|\n/)));else if(f.sync==='desc')put(k,b.desc);
   else if(f.sync==='colors'&&b.dna&&b.colors)put(k,[['primary',b.colors.primary],['accent',b.colors.secondary],['light background',b.colors.light]].filter(([,x])=>/^#[0-9a-f]{6}$/i.test(x||'')).map(([role,hex])=>({hex:hex.toUpperCase(),role})))})));}
 return b.genome};
const fk=(d,f)=>d.id+'.'+f.k;
const decided=s=>s&&(s.status==='accepted'||s.status==='edited');
const valOf=(b,key)=>{const s=G(b).f[key];return decided(s)?s.value:null};
const show=(f,v)=>v==null?'':f.t==='palette'?(v||[]).map(c=>`${c.hex} ${c.role||''}`).join(', '):f.t==='themes'?(v||[]).map(THEME_NAME).join(', '):Array.isArray(v)?v.join('; '):String(v);
const dProg=(b,d)=>{const n=d.F.filter(f=>decided(G(b).f[fk(d,f)])).length;return{n,of:d.F.length}};
const sProg=(b,s)=>{let n=0,of=0;s.D.forEach(d=>{const p=dProg(b,d);n+=p.n;of+=p.of});return{n,of,pct:of?Math.round(100*n/of):0}};
const allProg=b=>{let n=0,of=0;STAGES.forEach(s=>{const p=sProg(b,s);n+=p.n;of+=p.of});return{n,of,pct:of?Math.round(100*n/of):0}};
const BUSY={};
/* what one specialist step costs: the server prices 'journey' like any studio AI call unless an admin sets its own rate */
/* the server's rate, also before your account has answered (the old local default of 2 under-quoted a build by half) */
const COST=()=>{const R=window.VX_RATES;return R?(R.journey??R.studio_ai??6):window.VX?6:V.rate('journey')};

/* Accepted decisions flow into the brand profile every existing studio already reads. */
function sync(b){const g=G(b);b.dna=b.dna||{};
 ALL_D.forEach(d=>d.F.forEach(f=>{if(!f.sync)return;const v=valOf(b,fk(d,f));if(v==null)return;
  if(f.sync.startsWith('dna.'))b.dna[f.sync.slice(4)]=v;
  else if(f.sync==='name'){if(String(v).trim())b.name=String(v).trim().slice(0,60)}
  else if(f.sync==='tagline'){b.vault=b.vault||{taglines:[]};b.vault.taglines=[String(v),...(b.vault.taglines||[]).filter(x=>x!==v)].slice(0,8)}
  else if(f.sync==='colors'&&Array.isArray(v)){const pick=r=>(v.find(c=>new RegExp(r,'i').test(c.role||''))||{}).hex;const ok=x=>/^#[0-9a-f]{6}$/i.test(x||'');
   const p=pick('primary')||v[0]?.hex,s=pick('accent|secondary')||v[1]?.hex,l=pick('light|background')||v[2]?.hex;if(ok(p))b.colors.primary=p;if(ok(s))b.colors.secondary=s;if(ok(l))b.colors.light=l}
  else if(f.sync==='products')b.products=Array.isArray(v)?v.join('; '):String(v);
  else b[f.sync]=Array.isArray(v)?v.join('; '):String(v)}));
 const aud=valOf(b,'audience.personas');if(aud)b.audience=list(aud).join('; ');
 b.approved=false;g.updated=Date.now()}
function save(b){sync(b);Store.put(b);try{V.paintCredits()}catch(e){}}

/* ---------------- the AI call ---------------- */
/* each decision trimmed so late steps (with 60+ decisions) still answer within the time limit */
function genomeText(b,limit=70,each=200){const lines=[];ALL_D.forEach(d=>d.F.forEach(f=>{const v=valOf(b,fk(d,f));if(v!=null){const t=show(f,v);lines.push(`${d.title} / ${f.l}: ${t.length>each?t.slice(0,each)+'…':t}`)}}));return lines.slice(0,limit).join('\n')||'(no decisions yet)'}
function fieldSpec(f){return`- "${f.k}" (${f.t==='text'?'string':f.t==='list'?'array of strings':f.t==='palette'?'array of {"hex":"#RRGGBB","role":"primary|accent|light background|dark text|support"}':'array of theme ids'}): ${f.l}. ${f.g}`}
/* the live market research every specialist reads (searched on the web, with sources) */
function dossierText(g){const r=g.research&&g.research.data;if(!r)return'';const L=[];
 if(r.summary)L.push('Summary: '+r.summary);
 (r.competitors||[]).slice(0,6).forEach(c=>L.push(`Competitor: ${c.name} — ${c.positioning||''}${c.price_band?' · price '+c.price_band:''}${c.channels?' · '+c.channels:''}`));
 (r.price_bands||[]).slice(0,4).forEach(x=>L.push(`Price band: ${x.band} ${x.range||''} ${x.examples?'('+x.examples+')':''}`));
 (r.trends||[]).slice(0,5).forEach(t=>L.push(`Trend: ${t.trend}${t.evidence?' — '+t.evidence:''}`));
 (r.audience_signals||[]).slice(0,4).forEach(a=>L.push('Audience signal: '+a));
 (r.whitespace||[]).slice(0,3).forEach(w=>L.push('White space: '+w));
 return 'LIVE MARKET RESEARCH (searched on the web for this brand; cite it, and treat anything not in it as a hypothesis):\n'+L.join('\n').slice(0,3800)}
function prompt(b,d,only){const g=G(b),S=SPEC[d.sp];const F=only?d.F.filter(f=>f.k===only):d.F;
 const rejected=F.map(f=>{const r=(g.f[fk(d,f)]||{}).rejected||[];return r.length?`${f.k}: ${r.map(x=>show(f,x)).join(' | ')}`:''}).filter(Boolean).join('\n');
 return`You are Kathavi's ${S.n}, a world-class practitioner. Mission: ${S.mission} Methods: ${S.method} Standard: ${S.asks}
You are helping a founder build a ${g.type||'consumer'} brand on digital platforms (branding, storytelling, marketing; not choosing what to manufacture).
THE OWNER'S IDEA, IN THEIR WORDS: ${g.idea||b.desc||b.name}
${b.name?'CURRENT BRAND NAME: '+b.name:''}
DECISIONS SO FAR (fixed; build on them and stay consistent):
${genomeText(b)}
${dossierText(g)}
${g.inputs[d.id]?'OWNER DIRECTION FOR THIS STEP: '+g.inputs[d.id]:''}
${rejected?'THE OWNER REJECTED THESE BEFORE (do not propose them or near-copies):\n'+rejected:''}
TASK: ${d.title}. ${d.desc}
Fields:
${F.map(fieldSpec).join('\n')}
${F.some(f=>f.t==='themes')?'Theme ids you may use: '+THEME_IDS.join(', '):''}
Rules: be specific to this brand, never generic. Never invent facts, statistics, prices, awards, reviews, testimonials or competitor details presented as verified; frame market views as hypotheses. Names, handles and domains always need an availability and trademark check. Indian context unless the owner says otherwise. Plain, confident language, no clichés.
For each field give your recommended value, a "why" (one sentence, under 20 words), and ${d.id==='review'?'an empty "alternatives" array (an audit has no alternatives)':'two genuinely different "alternatives" of the same type'}.
Keep it tight so it reads well on a phone: every string under 30 words, lists at most 5 items, alternatives shorter than the main value.
Return ONLY JSON: {"fields":{"<key>":{"value":...,"why":"","alternatives":[...]}},"note":"one line from you to the owner","question":"one question only the owner can answer, or empty"}`}
function coerce(f,v){if(v==null)return null;
 if(f.t==='text')return typeof v==='string'?v.trim():Array.isArray(v)?v.join('; '):String(v);
 if(f.t==='list')return list(Array.isArray(v)?v.map(x=>typeof x==='string'?x:JSON.stringify(x)):String(v).split(/\n|;\s/)).slice(0,10);
 if(f.t==='palette'){const a=(Array.isArray(v)?v:[]).map(c=>typeof c==='string'?{hex:c,role:''}:c).filter(c=>/^#[0-9a-f]{6}$/i.test(c?.hex||''));return a.length?a.slice(0,6).map(c=>({hex:c.hex.toUpperCase(),role:String(c.role||'').slice(0,30)})):null}
 if(f.t==='themes'){const a=(Array.isArray(v)?v:[v]).map(String).filter(x=>THEME_IDS.includes(x));return a.length?a.slice(0,3):null}return null}
/* Websites the owner mentions are read live (once a week per site) so specialists work from the real site, not guesses. */
const DOMAIN_RX=/(?:https?:\/\/)?(?<![@\w.])((?:[a-z0-9-]+\.)+(?:com|in|co|net|org|store|shop|io|app|co\.in|studio|design|fashion|art|me|xyz))(\/[^\s,;]*)?/i;
async function siteFor(b,d){const g=G(b);const src=[g.inputs[d.id]||'',g.idea||'',b.website||''].join(' ');const m=src.match(DOMAIN_RX);if(!m||!window.VX||!VX.api)return null;
 const url=m[1].toLowerCase()+(m[2]||'');const c=(g.sites||{})[url];if(c&&Date.now()-c.at<7*864e5)return c;
 try{const r=await VX.api('/api/web/read',{json:{url}});const clean=x=>String(x||'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFD]/g,' ').replace(/[\uD800-\uDFFF]/g,'');const text=clean((r.pages||[]).map(p=>`# ${p.title||p.url}\n${String(p.text||'').slice(0,2500)}`).join('\n\n')).slice(0,7000);
  const site={url,at:Date.now(),title:r.title||'',desc:r.description||'',colors:(r.colors||[]).slice(0,6),text};g.sites={...(g.sites||{}),[url]:site};Store.put(b);return site}
 catch(e){return{url,at:0,error:e&&e.message||'Could not read that website'}}}
async function recommend(d,only,o={}){const b=o.b||brand();if(!b)return;const g=G(b);BUSY[d.id]=only||'all';if(!o.quiet)rerender();
 try{const site=d.stage&&d.stage.key==='learn'?null:await siteFor(b,d);const siteText=site&&site.text?site.text.slice(0,d.stage&&d.stage.key==='discover'?7000:3000):'';
  const full=prompt(b,d,only)+(site&&site.text?`\nWEBSITE ${site.url}, READ LIVE JUST NOW (use its real facts, words, products and tone; never claim anything it does not say):\nTitle: ${site.title}\nDescription: ${site.desc}\nColours seen: ${(site.colors||[]).join(', ')}\n${siteText}`:site&&site.error?`\nThe owner mentioned ${site.url} but it could not be read (${site.error}). Say so in your note.`:'');
  /* a step that runs past the time limit is refunded; ask the faster model once instead of failing */
  let v;try{v=await askJSON('journey',full,{tier:'default'})}catch(e){if(e&&e.code==='timeout'){notify('That took too long, so a faster specialist model is finishing it.');v=await askJSON('journey',full,{tier:'quick'})}else throw e}
  const out=v.fields||{};
  (only?d.F.filter(f=>f.k===only):d.F).forEach(f=>{const r=out[f.k];if(!r)return;const key=fk(d,f),cur=g.f[key]||{};if(decided(cur)&&!only&&!(o.force&&cur.by!=='you'))return;if(cur.by==='you'&&o.force)return;
   const val=coerce(f,r.value);if(val==null||(Array.isArray(val)&&!val.length))return;
   g.f[key]={...cur,value:val,status:o.auto?'accepted':'proposed',auto:!!o.auto,by:'ai',sp:d.sp,why:String(r.why||'').slice(0,300),alts:(Array.isArray(r.alternatives)?r.alternatives:[]).map(a=>coerce(f,a)).filter(a=>a!=null&&(!Array.isArray(a)||a.length)).slice(0,3),at:Date.now()}});
  g.notes[d.id]={note:String(v.note||'').slice(0,300),question:String(v.question||'').slice(0,200),site:site&&site.text?site.url:'',at:Date.now()};
  g.log.unshift({at:Date.now(),d:d.id,what:'recommended',sp:d.sp});g.log=g.log.slice(0,40);save(b)}
 catch(e){if(o.auto)throw e;notify(errText(e))}finally{delete BUSY[d.id];if(!o.quiet)rerender()}}

/* ---------------- views ---------------- */
const av=(k,sz='')=>{const S=SPEC[k];return`<span class="jx-av ${sz}" style="--c:${S.c}" title="${h(S.n)}" aria-hidden="true">${S.i}</span>`};
const brandPick=()=>{const bs=Store.all('brand');const b=brand();return bs.length>1?`<label class="jx-bp"><span>Brand</span><select data-act="pickbrand" aria-label="Brand">${bs.map(x=>`<option value="${x.id}" ${b&&x.id===b.id?'selected':''}>${h(x.name||'Untitled')}</option>`).join('')}</select></label>`:''};
const spChip=k=>`<span class="jx-sp">${av(k,'sm')}<span>${h(SPEC[k].n)}</span></span>`;
const ring=(pct,lbl)=>`<span class="jx-ring" style="--p:${pct}" role="img" aria-label="${lbl||pct+'% decided'}"><b>${pct}%</b></span>`;

function startView(){return head('Start your brand','Describe your idea in a line. Kathavi’s specialists turn it into a brand you shape, decision by decision.')+`
 <form class="vx-card jx-start" data-form="jstart">
  <label class="jx-big" for="jx-idea">What are you building?</label>
  <textarea id="jx-idea" name="idea" rows="3" required maxlength="600" placeholder="Handwoven Sambalpuri ikat sarees for women who wear tradition in a modern way"></textarea>
  <fieldset class="jx-type"><legend>It is a</legend>${[['physical','Physical product'],['digital','Digital product or app'],['service','Service']].map(([v,l],i)=>`<label><input type="radio" name="type" value="${v}" ${i===0?'checked':''}><span>${l}</span></label>`).join('')}</fieldset>
  <label class="jx-sm" for="jx-name">Brand name <span class="vx-muted">(optional: leave blank and we will suggest names)</span></label>
  <input id="jx-name" name="name" maxlength="60" autocomplete="off">
  <label class="jx-auto"><input type="checkbox" name="auto" checked><span><b>Build my whole brand now</b> · live market research, all 7 stages decided by the specialists, and your Brand Dashboard. About 5 minutes and ${25+20*COST()+COST()} credits. You can change anything afterwards.</span></label>
  <div class="vx-row"><button class="vx-btn pri" type="submit">Start my brand</button><span class="vx-small vx-muted">Untick to go step by step: the Discover stage first (about ${4*COST()} credits), approving each decision.</span></div>
 </form>
 <div class="vx-card jx-how"><h2>How it works</h2><ol class="jx-steps">${STAGES.map(s=>`<li><b>${s.n}. ${s.name}</b><span>${h(s.q)}</span></li>`).join('')}</ol>
 <p class="vx-small vx-muted">At every step a specialist recommends, explains why and offers alternatives. You accept, edit, reject or write your own. Accepted decisions become your Brand Genome, and every studio tool uses it.</p></div>`}

function nextStep(b){for(const s of STAGES)for(const d of s.D){const p=dProg(b,d);if(p.n<p.of)return{s,d,p}}return null}

VIEWS.home=()=>{const b=brand();if(!b||(!b.genome&&!b.dna)||V.cur.jstart)return startView()+(b&&V.cur.jstart?`<p><button class="vx-btn sm" data-act="jback" type="button">← Back to ${h(b.name)}</button></p>`:'');const g=G(b),P=allProg(b),nx=nextStep(b);
 return head(h(b.name||'Your brand'),h(g.idea||b.desc||''),`${brandPick()}<button class="vx-btn sm" data-act="jnew" type="button">Start another brand</button><button class="vx-btn sm" data-go="genome" type="button">Brand Genome</button>`)+`
 <div class="jx-path" role="list">${STAGES.map(s=>{const p=sProg(b,s);return`<button class="jx-stage ${p.pct===100?'done':p.n?'on':''}" role="listitem" data-go="${s.key}" type="button"><span class="jx-n">${p.pct===100?'✓':s.n}</span><b>${s.name}</b><small>${p.n}/${p.of}</small><i style="width:${p.pct}%"></i></button>`}).join('')}</div>
 <div class="jx-grid">
  <div class="vx-card jx-next">${av('architect')}<div><small>Chief Brand Architect · next best step</small>
   ${nx?`<h2>${h(nx.d.title)}</h2><p>${h(nx.d.desc)} ${nx.p.n?`${nx.p.n} of ${nx.p.of} decided.`:''}</p><div class="vx-row"><button class="vx-btn pri" data-go="${nx.s.key}" type="button">Go to ${nx.s.name}</button>${!G(b).f[fk(nx.d,nx.d.F[0])]?`<button class="vx-btn" data-act="jrec" data-d="${nx.d.id}" data-thengo="${nx.s.key}" type="button">${BUSY[nx.d.id]?'Working…':'Get recommendations'}</button>`:''}</div>`
     :`<h2>Every decision is made</h2><p>Your Brand Genome is complete. Keep creating, and revisit Learn after each campaign.</p><button class="vx-btn pri" data-go="create" type="button">Create content</button>`}</div></div>
  <div class="vx-card jx-sum">${ring(P.pct,'Brand Genome '+P.pct+'% decided')}<div><h2>Brand Genome</h2><p class="vx-small">${P.n} of ${P.of} decisions made · ${g.type?h(g.type[0].toUpperCase()+g.type.slice(1))+' brand':'Brand'}</p><button class="vx-btn sm" data-go="genome" type="button">Open</button></div></div>
 </div>
 <div class="vx-card"><h2>Your specialists</h2><div class="jx-team">${Object.keys(SPEC).map(k=>{const S=SPEC[k];return`<details class="jx-member">${'<summary>'+av(k)+`<span><b>${h(S.n)}</b><small>${h(S.mission)}</small></span></summary>`}<dl><dt>Method</dt><dd>${h(S.method)}</dd><dt>Owns</dt><dd>${h(S.owns)}</dd><dt>Ground rule</dt><dd>${h(S.asks)}</dd><dt>Works in</dt><dd>${STAGES.filter(s=>s.sp.includes(k)||s.D.some(d=>d.sp===k)).map(s=>s.name).join(', ')||'Every stage'}</dd></dl></details>`}).join('')}</div></div>
 ${g.log.length?`<div class="vx-card"><h2>Recent decisions</h2><ul class="jx-log">${g.log.slice(0,6).map(l=>{const d=dById(l.d);return`<li>${av(l.sp||'architect','sm')}<span>${h(d?d.title:l.d)} · ${h(l.what)}${l.f?': '+h(l.f):''}</span><time>${new Date(l.at).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</time></li>`}).join('')}</ul></div>`:''}`};

function fieldRow(b,d,f){const key=fk(d,f),s=G(b).f[key]||{},busy=BUSY[d.id]===f.k,editing=cur.jedit===key;
 const val=s.value,has=val!=null&&!(Array.isArray(val)&&!val.length)&&s.status!=='rejected';
 const pill=s.status==='accepted'?'<span class="jx-pill ok">Accepted</span>':s.status==='edited'?'<span class="jx-pill you">Yours</span>':s.status==='proposed'?'<span class="jx-pill ai">Suggested</span>':s.status==='rejected'?'<span class="jx-pill no">Rejected</span>':'';
 const body=editing?editor(f,key,val):has?valueHTML(f,val):`<p class="jx-empty">${s.status==='rejected'?'Rejected. Ask for another suggestion or write your own.':'Not decided yet.'}</p>`;
 const alts=(s.alts||[]).filter(a=>JSON.stringify(a)!==JSON.stringify(val));
 return`<div class="jx-field ${s.status||'empty'}" id="f-${key.replace('.','-')}"><div class="jx-fh"><b>${h(f.l)}</b>${pill}</div>${body}
  ${!editing&&s.why&&s.status==='proposed'?`<p class="jx-why"><span>Why:</span> ${h(s.why)}</p>`:''}
  ${!editing&&alts.length&&s.status!=='accepted'&&s.status!=='edited'?`<div class="jx-alts"><span>Other options</span>${alts.map((a,i)=>`<button class="jx-alt" data-act="jalt" data-key="${key}" data-i="${(s.alts||[]).indexOf(a)}" type="button">${f.t==='palette'?swatches(a):h(show(f,a).slice(0,140))}</button>`).join('')}</div>`:''}
  ${editing?'':`<div class="jx-acts">${s.status==='proposed'?`<button class="vx-btn sm pri" data-act="jok" data-key="${key}" type="button">Accept</button>`:''}
   ${has?`<button class="vx-btn sm" data-act="jedit" data-key="${key}" type="button">Edit</button>`:`<button class="vx-btn sm" data-act="jedit" data-key="${key}" type="button">Write my own</button>`}
   ${has&&s.status!=='edited'&&s.status!=='accepted'?`<button class="vx-btn sm" data-act="jno" data-key="${key}" type="button">Reject</button>`:''}
   ${(decided(s))?`<button class="vx-btn sm ghost" data-act="jreopen" data-key="${key}" type="button">Change</button>`:`<button class="vx-btn sm ghost" data-act="jone" data-d="${d.id}" data-f="${f.k}" type="button" ${busy?'disabled':''}>${busy?'Thinking…':s.value!=null?'Suggest another':'Suggest'}</button>`}</div>`}</div>`}
const swatches=a=>`<span class="jx-sw">${(a||[]).map(c=>`<i style="background:${c.hex}" title="${h(c.hex+' '+(c.role||''))}"></i>`).join('')}</span>`;
function valueHTML(f,v){if(f.t==='palette')return`<div class="jx-pal">${v.map(c=>`<span><i style="background:${c.hex}"></i><b>${h(c.hex)}</b><small>${h(c.role||'')}</small></span>`).join('')}</div>`;
 if(f.t==='themes')return`<div class="jx-themes">${v.map(id=>`<span><img src="/studio/reels/themes/${id}.jpg" alt="" loading="lazy"><b>${h(THEME_NAME(id))}</b></span>`).join('')}</div>`;
 if(Array.isArray(v))return`<ul class="jx-list">${v.map(x=>`<li>${h(x)}</li>`).join('')}</ul>`;return`<p class="jx-val">${h(v)}</p>`}
function editor(f,key,v){const txt=f.t==='palette'?(v||[]).map(c=>`${c.hex} ${c.role||''}`).join('\n'):f.t==='themes'?(v||[]).join('\n'):Array.isArray(v)?v.join('\n'):String(v??'');
 const hint=f.t==='text'?'':f.t==='palette'?'One colour per line: #RRGGBB role':f.t==='themes'?'One theme id per line: '+THEME_IDS.join(', '):'One item per line';
 return`<label class="jx-sm" for="ed-${key}">${hint||'Your version'}</label><textarea id="ed-${key}" class="jx-ed" rows="${f.t==='text'?3:5}">${h(txt)}</textarea>
 <div class="jx-acts"><button class="vx-btn sm pri" data-act="jsave" data-key="${key}" type="button">Save</button><button class="vx-btn sm" data-act="jcancel" type="button">Cancel</button></div>`}

function stageView(s){return()=>{const b=brand();if(!b)return startView();const g=G(b),p=sProg(b,s),i=STAGES.indexOf(s),nxt=STAGES[i+1],prv=STAGES[i-1];
 const anyBusy=s.D.some(d=>BUSY[d.id]);
 return head(`<span class="jx-kicker">Stage ${s.n} of 7 · ${h(b.name)}</span>${s.name}`,h(s.q),`${brandPick()}${ring(p.pct)}<button class="vx-btn pri" data-act="jstage" data-s="${s.key}" type="button" ${anyBusy?'disabled':''} title="About ${COST()} credits per step">${anyBusy?'Specialists working…':'Recommend everything here'}</button>`)+`
 <div class="jx-crew">${s.sp.map(spChip).join('')}<span class="vx-small vx-muted">Outcome: ${h(s.out)} · each recommendation step uses about ${COST()} credits</span></div>
 ${s.D.map(d=>{const dp=dProg(b,d),n=g.notes[d.id],busy=BUSY[d.id]==='all',pend=d.F.filter(f=>(g.f[fk(d,f)]||{}).status==='proposed').length;
  return`<section class="vx-card jx-d" id="d-${d.id}"><div class="jx-dh"><div><h2>${h(d.title)}</h2><p class="vx-small vx-muted">${h(d.desc)}</p></div><div class="jx-dmeta">${spChip(d.sp)}<span class="vx-small">${dp.n}/${dp.of} decided</span></div></div>
   <div class="jx-dir"><label class="jx-sm" for="in-${d.id}">Your direction <span class="vx-muted">(optional)</span></label><div class="vx-row"><input id="in-${d.id}" data-jin="${d.id}" value="${h(g.inputs[d.id]||'')}" placeholder="Anything the specialist should know or follow. Mention a website and it will be read." maxlength="300">
    <button class="vx-btn ${dp.n||Object.keys(g.f).some(k=>k.startsWith(d.id+'.'))?'':'pri'}" data-act="jrec" data-d="${d.id}" type="button" ${busy?'disabled':''}>${busy?'Working…':Object.keys(g.f).some(k=>k.startsWith(d.id+'.'))?'Recommend again':'Recommend'}</button></div></div>
   ${n&&(n.note||n.question)?`<div class="jx-note">${av(d.sp,'sm')}<div>${n.site?`<p class="jx-read">Read ${h(n.site)} live for this step</p>`:''}${n.note?`<p>${h(n.note)}</p>`:''}${n.question?`<p class="jx-q"><b>Question for you:</b> ${h(n.question)} <span class="vx-muted">Answer in “Your direction” and recommend again.</span></p>`:''}</div></div>`:''}
   ${busy?`<div class="jx-busy" role="status"><span class="jx-dots"><i></i><i></i><i></i></span>${h(SPEC[d.sp].n)} is working on it…</div>`:''}
   <div class="jx-fields">${d.F.map(f=>fieldRow(b,d,f)).join('')}</div>
   ${pend>1?`<div class="jx-bulk"><button class="vx-btn sm" data-act="jall" data-d="${d.id}" type="button">Accept all ${pend} suggestions</button></div>`:''}
  </section>`}).join('')}
 <div class="vx-card jx-tools"><h2>Tools for this stage</h2><div class="vx-row">${s.tools.map(([k,l])=>`<button class="vx-btn sm" data-go="${k}" type="button">${h(l)}</button>`).join('')}</div></div>
 <nav class="jx-pager" aria-label="Stages">${prv?`<button class="vx-btn" data-go="${prv.key}" type="button">← ${prv.n}. ${prv.name}</button>`:'<span></span>'}${nxt?`<button class="vx-btn pri" data-go="${nxt.key}" type="button">${nxt.n}. ${nxt.name} →</button>`:`<button class="vx-btn pri" data-go="genome" type="button">See your Brand Genome →</button>`}</nav>`}}
STAGES.forEach(s=>{VIEWS[s.key]=stageView(s)});

VIEWS.genome=()=>{const b=brand();if(!b)return startView();const g=G(b),P=allProg(b);
 const by={};ALL_D.forEach(d=>d.F.forEach(f=>{const v=valOf(b,fk(d,f));if(v==null)return;(by[f.dna]=by[f.dna]||[]).push({d,f,v})}));
 return head(`<span class="jx-kicker">${h(b.name)}</span>Brand Genome`,'The single source of truth every specialist and studio builds on. Only decisions you accepted or wrote appear here.',`${brandPick()}${ring(P.pct)}<button class="vx-btn sm" data-act="jexport" type="button">Copy as text</button>`)+`
 <div class="jx-genome">${DNA_SECTIONS.map(([k,l,sub])=>{const rows=by[k]||[];return`<section class="vx-card jx-dna"><h2>${l}<small>${sub}</small></h2>
  ${rows.length?rows.map(({d,f,v})=>`<div class="jx-gr"><span class="jx-gl">${h(f.l)}<button class="jx-link" data-go="${d.stage.key}" type="button">${d.stage.name}</button></span>${valueHTML(f,v)}</div>`).join('')
   :`<p class="vx-small vx-muted">Nothing decided yet. ${(()=>{const d=ALL_D.find(d=>d.F.some(f=>f.dna===k));return d?`<button class="jx-link" data-go="${d.stage.key}" type="button">Start in ${d.stage.name}</button>`:''})()}</p>`}</section>`}).join('')}</div>`};

/* ---------------- actions ---------------- */
const cur=V.cur;
const keyParts=key=>{const [di,fkk]=key.split('.');const d=dById(di);return{d,f:d&&d.F.find(f=>f.k===fkk)}};
function log(b,d,what,f){const g=G(b);g.log.unshift({at:Date.now(),d:d.id,what,sp:d.sp,f:f?f.l:''});g.log=g.log.slice(0,40)}
ACT.jrec=async el=>{const d=dById(el.dataset.d);const inp=q('#in-'+d.id);if(inp){const b=brand();G(b).inputs[d.id]=inp.value.trim();Store.put(b)}if(el.dataset.thengo){go(el.dataset.thengo)}await recommend(d)};
ACT.jone=async el=>{await recommend(dById(el.dataset.d),el.dataset.f)};
ACT.jstage=async el=>{const s=STAGES.find(x=>x.key===el.dataset.s);const b=brand();s.D.forEach(d=>{const inp=q('#in-'+d.id);if(inp)G(b).inputs[d.id]=inp.value.trim()});Store.put(b);
 for(const d of s.D){const p=dProg(brand(),d);if(p.n<p.of)await recommend(d)}};
ACT.jok=el=>{const b=brand(),s=G(b).f[el.dataset.key];if(!s)return;s.status='accepted';s.at=Date.now();const {d,f}=keyParts(el.dataset.key);log(b,d,'accepted',f);save(b);rerender()};
ACT.jall=el=>{const b=brand(),d=dById(el.dataset.d);d.F.forEach(f=>{const s=G(b).f[fk(d,f)];if(s&&s.status==='proposed'){s.status='accepted';s.at=Date.now()}});log(b,d,'accepted all');save(b);rerender()};
ACT.jno=el=>{const b=brand(),s=G(b).f[el.dataset.key];if(!s)return;s.rejected=[...(s.rejected||[]),s.value].slice(-6);s.status='rejected';const {d,f}=keyParts(el.dataset.key);log(b,d,'rejected',f);save(b);rerender()};
ACT.jalt=el=>{const b=brand(),s=G(b).f[el.dataset.key];if(!s)return;const a=(s.alts||[])[+el.dataset.i];if(a==null)return;if(s.value!=null&&s.status!=='rejected')s.alts=[...s.alts.filter((_,i)=>i!==+el.dataset.i),s.value];s.value=a;s.status='proposed';s.why='';Store.put(b);rerender()};
ACT.jedit=el=>{cur.jedit=el.dataset.key;rerender();setTimeout(()=>{const t=q('#ed-'+CSS.escape(el.dataset.key));if(t){t.focus();t.setSelectionRange(t.value.length,t.value.length)}},20)};
ACT.jcancel=()=>{cur.jedit=null;rerender()};
ACT.jnew=()=>{V.cur.jstart=true;go('home')};ACT.jback=()=>{V.cur.jstart=false;go('home')};
ACT.jreopen=el=>{const b=brand(),s=G(b).f[el.dataset.key];if(!s)return;
 /* your own answer stays yours: Change opens it for editing; an accepted suggestion goes back to being a suggestion with its alternatives */
 if(s.status==='edited'){ACT.jedit(el);return}s.status='proposed';save(b);rerender()};
ACT.jsave=el=>{const key=el.dataset.key,{d,f}=keyParts(key),t=q('#ed-'+CSS.escape(key));if(!t)return;const raw=t.value.trim();if(!raw){notify('Write something first, or cancel.');return}
 let v;if(f.t==='text')v=raw;else if(f.t==='list')v=list(raw);else if(f.t==='palette'){v=raw.split('\n').map(l=>{const m=l.match(/#[0-9a-f]{6}/i);return m?{hex:m[0].toUpperCase(),role:l.replace(m[0],'').trim().slice(0,30)}:null}).filter(Boolean);if(!v.length){notify('Use colours like #1E2A3A primary');return}}
 else{v=raw.split(/[\n,]/).map(x=>x.trim()).filter(x=>THEME_IDS.includes(x));if(!v.length){notify('Use theme ids from the list');return}}
 const b=brand(),g=G(b),s=g.f[key]||{};g.f[key]={...s,value:v,status:'edited',by:'you',at:Date.now()};cur.jedit=null;log(b,d,'wrote their own',f);save(b);rerender()};
ACT.jexport=()=>{const b=brand();V.copyText(`${b.name} — Brand Genome\n\n`+DNA_SECTIONS.map(([k,l])=>{const rows=[];ALL_D.forEach(d=>d.F.forEach(f=>{const v=valOf(b,fk(d,f));if(v!=null&&f.dna===k)rows.push(`${f.l}: ${show(f,v)}`)}));return rows.length?`${l}\n${rows.join('\n')}`:''}).filter(Boolean).join('\n\n'))};
document.addEventListener('change',e=>{const t=e.target;if(t&&t.dataset&&t.dataset.jin){const b=brand();if(!b)return;G(b).inputs[t.dataset.jin]=t.value.trim();Store.put(b)}});
V.FORM.jstart=async f=>{const fd=new FormData(f);const idea=String(fd.get('idea')||'').trim();if(!idea)return;const type=String(fd.get('type')||'physical'),name=String(fd.get('name')||'').trim();
 const all=Store.all('brand');const b={id:'b_'+Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-3),type:'brand',created:Date.now(),name:name||'',handle:'',website:'',industry:'',desc:idea,products:'',audience:'',competitors:'',guidelines:'',objective:'',
  dna:null,src:{},locked:{},approved:false,versions:[],colors:{primary:'#1E2A3A',secondary:'#C8A97E',light:'#F5F1EA'},vault:{taglines:[],models:[],voices:[],licences:'',photos:[],logo:null},products_list:[],
  genome:{v:1,type,idea,f:{},inputs:{},notes:{},log:[]}};
 if(!name){b.name='New brand'}
 if(name){b.genome.f['naming.name']={value:name,status:'edited',by:'you',at:Date.now()}}
 V.cur.jstart=false;Store.put(b);V.cur.brand=b.id;try{localStorage.setItem('viralos.pref.brand',JSON.stringify(b.id))}catch(e){}void all;
 if(fd.get('auto')){go('dashboard');await autopilot(b);return}
 go('discover');
 /* one line in, a full first prescription out: the whole Discover stage, idea brief first so the rest builds on it */
 for(const d of STAGES[0].D)await recommend(d)};


/* ================= Autopilot: one line in, a whole brand out =================
 * 1. the Market & Audience Analyst researches the market live on the web (sources kept);
 * 2. every stage is decided in order, the steps of a stage in parallel, each building on what came before;
 * 3. the Chief Brand Architect reads everything and writes the insights behind the Brand Dashboard.
 * Every decision stays editable; a change re-runs what depends on it. */
const RUN={};// per brand id: {phase, stage, done, total, error, at}
async function aiJob(input,action,opts){let r=await VX.api('/api/ai',{json:{input,action,opts}});if(!r.job)return r;const t0=Date.now();let wait=1500;
 for(;;){await new Promise(x=>setTimeout(x,wait));wait=Math.min(3000,wait+300);let j;try{j=await VX.api('/api/jobs/'+r.job)}catch(e){if(Date.now()-t0<330000)continue;throw e}
  if(j.status==='done')return{...j.result,credits:r.credits};if(j.status==='failed')throw{code:'provider_error',message:j.error||'Research failed'};if(Date.now()-t0>330000)throw{code:'timeout'}}}
const parseJ=t=>{const a=String(t||'').indexOf('{'),z=String(t||'').lastIndexOf('}');return JSON.parse(String(t).slice(a,z+1))};
async function researchMarket(b){const g=G(b);
 const p=`You are Kathavi's Market & Audience Analyst with live web search. Research the market for this brand idea, searching several times (competitor brand sites, marketplaces, reputable news and industry sources). India unless the idea says otherwise.
IDEA: ${g.idea||b.desc} ${b.name&&b.name!=='New brand'?'(brand name: '+b.name+')':''} · type: ${g.type||'physical'}
Report only what your searches support; say "not found" rather than guess. Never invent numbers or prices.
Return ONLY JSON: {"summary":"under 90 words","competitors":[{"name":"","positioning":"under 18 words","price_band":"as published, or empty","channels":"","url":"https://..."}],"price_bands":[{"band":"entry|mid|premium|luxury","range":"as found","examples":""}],"trends":[{"trend":"","evidence":"under 20 words","url":"https://..."}],"audience_signals":["under 20 words each"],"whitespace":["gaps no competitor owns, under 20 words"]}
At most 6 competitors, 4 price bands, 5 trends, 4 audience signals, 3 white spaces.`;
 const r=await aiJob(p,'research',{research:true,searches:8,maxTokens:6000});let data={};try{data=parseJ(r.text)}catch(e){data={summary:String(r.text||'').slice(0,600)}}
 /* web search answers can carry <cite index=…> markers inside the text: keep the words, drop the markers */
 const clean=v=>typeof v==='string'?v.replace(/<\/?cite\b[^>]*>/gi,'').replace(/\s{2,}/g,' ').trim():Array.isArray(v)?v.map(clean):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,clean(x)])):v;data=clean(data);
 const own=[];const add=(u,t)=>{if(typeof u==='string'&&/^https:\/\//.test(u)&&!own.some(x=>x.url===u))own.push({url:u,title:t||u.replace(/^https:\/\/(www\.)?/,'').split('/')[0]})};
 (data.competitors||[]).forEach(c=>add(c.url,c.name));(data.trends||[]).forEach(t=>add(t.url,t.trend));
 /* the pages the analyst actually cited in its findings come first, then the rest of what the searches returned */
 const src=[...own];(r.sources||[]).forEach(x=>{if(x&&x.url&&!src.some(y=>y.url===x.url))src.push(x)});
 g.research={at:Date.now(),data,sources:src.slice(0,20),searches:r.searches||0};save(b);return g.research}
async function writeInsights(b){const g=G(b);
 const p=`You are Kathavi's Chief Brand Architect. Read every decision and the live research, then write the insight layer of the brand's dashboard: sharp, specific, non-obvious, defensible. Scores are your reasoned judgement (say why); never invent market numbers.
BRAND: ${b.name} · ${g.type||'physical'} · idea: ${g.idea||b.desc}
DECISIONS:
${genomeText(b,80,160)}
${dossierText(g)}
Return ONLY JSON:
{"headline":"the brand thesis in under 16 words",
"signature_insight":{"title":"under 8 words","insight":"under 35 words: something the founder would not have seen","so_what":"under 25 words: what to do about it"},
"opportunities":[{"title":"under 8 words","insight":"under 30 words","evidence":"which decision or research point it rests on","action":"under 18 words"}],
"strength":[{"dimension":"Distinctiveness|Clarity|Credibility|Emotional pull|Market timing|Channel fit|Consistency","score":0,"why":"under 22 words"}],
"positioning_map":{"x":{"label":"axis that matters to buyers","low":"","high":""},"y":{"label":"","low":"","high":""},"points":[{"name":"","x":0,"y":0,"kind":"brand|competitor|gap","why":"under 18 words"}]},
"risks":[{"risk":"under 14 words","likelihood":1,"impact":1,"mitigation":"under 18 words"}],
"readiness":{"score":0,"blockers":["under 14 words"],"next":["under 14 words"]},
"proof":[{"claim":"under 12 words","evidence":"what proves it","status":"have|need"}],
"plan90":[{"weeks":"1-2","focus":"under 10 words","metric":"under 8 words"}],
"why":{"headline":"under 30 words","readiness":"under 30 words","map":"under 30 words"}}
3 opportunities, all 7 strength dimensions (0-100), map points 0-100 with the brand, 3-6 competitors from the research and 1-2 gaps, 4-6 risks (1-5 scales), 3-6 proof items, 6 plan rows covering 12 weeks.`;
 const v=await askJSON('journey',p,{tier:'default'});g.insights={...v,at:Date.now()};save(b);return g.insights}
async function runWave(b,ds,o){await Promise.all(ds.map(d=>recommend(d,null,{...o,b,auto:true,quiet:true}).catch(e=>{/* one more try for an unreadable answer; never for timeouts or credit errors */if(e&&e.code==='bad_json')return recommend(d,null,{...o,b,auto:true,quiet:true});throw e}).then(()=>{RUN[b.id].done++;paint()}).catch(e=>{RUN[b.id].errors=(RUN[b.id].errors||0)+1;RUN[b.id].last=errText(e);paint()})))}
const paint=()=>{if(['dashboard','home'].includes(V.cur.view))rerender()};
/* decisions made in the same wave as the name can say "[Brand]": once the name exists, write it in */
function fillName(b){const n=b.name;if(!n||n==='New brand')return;const re=/\[(?:brand|brand name|name|your brand)\]/gi;const f=v=>typeof v==='string'?v.replace(re,n):Array.isArray(v)?v.map(f):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,f(x)])):v;
 let ch=false;Object.values(G(b).f).forEach(x=>{if(!x||x.by==='you')return;const s0=JSON.stringify(x.value);if(re.test(s0)){re.lastIndex=0;x.value=f(x.value);ch=true}re.lastIndex=0});if(ch)save(b)}
async function autopilot(b,from=0,o={}){if(RUN[b.id]&&RUN[b.id].phase&&RUN[b.id].phase!=='done'&&RUN[b.id].phase!=='error')return;
 const stages=STAGES.slice(from);const R=RUN[b.id]={phase:'research',stage:null,done:0,total:stages.reduce((a,s)=>a+s.D.length,0),errors:0,at:Date.now()};paint();
 try{if(!G(b).research||o.research){try{await researchMarket(b)}catch(e){R.last='Live research was not available ('+errText(e)+'); the specialists continued from your idea.'}}
  for(const s of stages){R.phase='decide';R.stage=s.key;paint();await runWave(b,s.D,{force:!!o.force});fillName(b)}
  R.phase='insights';R.stage=null;paint();await writeInsights(b);R.phase='done';G(b).built=Date.now();save(b)}
 catch(e){R.phase='error';R.last=errText(e)}paint()}
/* a change ripples forward: every later stage (and the insights) is re-decided, keeping everything you wrote yourself */
addEventListener('beforeunload',e=>{if(Object.values(RUN).some(r=>r&&r.phase&&!['done','error'].includes(r.phase))){e.preventDefault();e.returnValue=''}});
async function recomputeFrom(b,stageKey){const i=Math.max(0,STAGES.findIndex(s=>s.key===stageKey));return autopilot(b,i,{force:true})}
window.KATHAVI_J={STAGES,ALL_D,SPEC,THEME_IDS,THEME_NAME,G,valOf,fk,show,decided,dById,save,recommend,autopilot,recomputeFrom,researchMarket,writeInsights,RUN,av,dossierText,coerce,genomeText};

/* every studio prompt (campaigns, copy, ads, calendar) reads the Genome through brandBrief */
/* kept short: every studio prompt carries it, and long prompts are slower and costlier */
window.KATHAVI_GENOME=b=>{if(!b||!b.genome)return'';const lines=[];ALL_D.forEach(d=>d.F.forEach(f=>{if(f.sync&&f.sync.startsWith('dna.'))return;const v=valOf(b,fk(d,f));if(v!=null)lines.push(`${f.l}: ${show(f,v).slice(0,220)}`)}));return lines.join('\n').slice(0,6000)};

/* ---------------- navigation ---------------- */
Object.assign(ICON,{discover:'M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3',define:'M4 4h16v4H4zM4 10h10v4H4zM4 16h13v4H4z',design:'M12 3a9 9 0 100 18c1 0 1.5-.6 1.5-1.4 0-.9-.7-1.3-.7-2.1 0-.8.6-1.5 1.5-1.5H16a5 5 0 005-5c0-4.4-4-8-9-8zM7.5 11.5h.01M10.5 7.5h.01M15 8h.01',
 create:'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z',experience:'M3 5h18v12H3zM8 21h8M12 17v4',launch:'M5 19c1-3 3-5 6-6l3-3c3-3 6-4 7-4 0 1-1 4-4 7l-3 3c-1 3-3 5-6 6zM9 15l-3-3',learn:'M4 19V9M10 19V5M16 19v-7M22 19H2',
 genome:'M7 3c0 6 10 6 10 12s-10 6-10 6M17 3c0 6-10 6-10 12M8 7h8M8 17h8',today:'M4 6h16M4 12h16M4 18h10'});
})();
