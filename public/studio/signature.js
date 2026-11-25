/* Kathavi Signature reels — 12 production-grade motion templates.
   Runs after Vitrine's engine: uses R, TPL, drawMedia, T, fit, E, P, clamp, kb, F, rgba, mixHex, lumOf, state, isBrand. */
(()=>{
const W0=1080,H0=1920,FA="'Anton', 'Oswald', Impact, sans-serif";
try{document.fonts.load("400 100px Anton").then(()=>{try{queueThumbs()}catch(e){}})}catch(e){}
/* ---------- helpers ---------- */
const buf=[];function sgBuf(i,W,H){if(!buf[i]){buf[i]=document.createElement('canvas')}const b=buf[i];if(b.width!==W||b.height!==H){b.width=W;b.height=H}const g=b.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-over';g.globalAlpha=1;g.filter='none';g.clearRect(0,0,W,H);return[b,g]}
const GRADE='contrast(1.06) saturate(1.06)';
function cover(c,m,x,y,w,h,o={}){if(!m)return;drawMedia(c,m,x,y,w,h,{fit:'crop',zoom:o.z||1,px:o.px||0,py:o.py||0,fx:o.fx,fy:o.fy,filter:o.filter||GRADE,alpha:o.alpha})}
function card(c,m,cx,cy,maxW,maxH,o={}){if(!m)return null;const ar=(m.w||1)/(m.h||1);let w=maxW,h=w/ar;if(h>maxH){h=maxH;w=h*ar}const s=o.s??1;w*=s;h*=s;const x=cx-w/2,y=cy-h/2;
  c.save();if(o.alpha!=null)c.globalAlpha*=o.alpha;c.shadowColor='rgba(0,0,0,.45)';c.shadowBlur=70;c.shadowOffsetY=30;c.fillStyle='#000';c.fillRect(x,y,w,h);c.restore();
  drawMedia(c,m,x,y,w,h,{fit:'crop',zoom:o.z||1,filter:GRADE,alpha:o.alpha});if(o.border){c.save();if(o.alpha!=null)c.globalAlpha*=o.alpha;c.strokeStyle=o.border;c.lineWidth=o.bw||3;c.strokeRect(x-o.gap,y-o.gap,w+2*o.gap,h+2*o.gap);c.restore()}return{x,y,w,h}}
function fnt(o,size){return`${o.italic?'italic ':''}${o.weight||400} ${size}px ${o.font||F.man}`}
function lines(c,str,maxW){const ws=String(str||'').split(/\s+/).filter(Boolean),out=[];let l=[];for(const w of ws){const t=[...l,w].join(' ');if(c.measureText(t).width>maxW&&l.length){out.push(l);l=[w]}else l.push(w)}if(l.length)out.push(l);return out}
/* kinetic type: words rise from behind a mask, staggered */
function kin(c,str,x,y,o){if(!str)return 0;let size=o.size;c.save();if('letterSpacing' in c)c.letterSpacing=(o.ls||0)+'px';const s=o.upper?String(str).toUpperCase():String(str);
  c.font=fnt(o,size);let L=lines(c,s,o.maxW);let g=0;while((L.length>(o.maxLines||3)||L.some(l=>c.measureText(l.join(' ')).width>o.maxW))&&g++<30){size*=.93;c.font=fnt(o,size);L=lines(c,s,o.maxW)}
  const lh=size*(o.lh||(o.font===FA?.98:1.02)),sw=c.measureText(' ').width,a=o.alpha??1;let k=0;c.textBaseline='alphabetic';c.fillStyle=o.color||'#fff';
  let y0=o.anchor==='bottom'?y-(L.length-1)*lh:o.anchor==='middle'?y-(L.length-1)*lh/2+size*.35:y;
  L.forEach((ln,i)=>{const ly=y0+i*lh,tw=c.measureText(ln.join(' ')).width;let lx=o.align==='center'?x-tw/2:o.align==='right'?x-tw:x;
    c.save();c.beginPath();c.rect(-50,ly-size*1.05,W0+100,size*1.38);c.clip();
    ln.forEach(w=>{const p=E.outExpo(clamp((o.t-(o.t0||0)-k*(o.st??.08))/(o.d||.7)));const ww=c.measureText(w).width;
      if(p>0){c.globalAlpha=a*Math.min(1,p*1.6);const dy=(1-p)*size*1.15;if(o.stroke){c.strokeStyle=o.color;c.lineWidth=o.stroke;c.strokeText(w,lx,ly+dy)}else c.fillText(w,lx,ly+dy)}lx+=ww+sw;k++});c.restore()});
  c.restore();return L.length*lh}
function track(c,str,x,y,o){const p=E.outExpo(clamp((o.t-(o.t0||0))/(o.d||1.4)));T(c,str,x,y,{...o,ls:(o.ls0??40)+((o.ls||8)-(o.ls0??40))*p,alpha:(o.alpha??1)*p,p:undefined})}
function vignette(c,W,H,a=.55){const g=c.createRadialGradient(W/2,H*.48,H*.22,W/2,H*.5,H*.78);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);c.fillStyle=g;c.fillRect(0,0,W,H)}
function grad(c,W,y,h,a0,a1){const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,a0);g.addColorStop(1,a1);c.fillStyle=g;c.fillRect(0,y,W,h)}
function sweep(c,W,H,p,col='255,236,200',a=.35){if(p<=0||p>=1)return;const x=-W*.6+p*W*2.2;c.save();c.globalCompositeOperation='screen';const g=c.createLinearGradient(x-260,0,x+260,H*.35);g.addColorStop(0,`rgba(${col},0)`);g.addColorStop(.5,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.fillRect(0,0,W,H);c.restore()}
function flash(c,W,H,a){if(a<=0)return;c.save();c.globalAlpha=a;c.fillStyle='#fff';c.fillRect(0,0,W,H);c.restore()}
function pill(c,text,cx,cy,o){if(!text)return;c.save();c.font=`700 ${o.size||34}px ${F.man}`;if('letterSpacing' in c)c.letterSpacing='3px';const tw=c.measureText(String(text).toUpperCase()).width,w=tw+(o.padX||70),h=(o.size||34)*2.3;
  const s=o.s??1;c.translate(cx,cy);c.scale(s,s);c.globalAlpha*=o.alpha??1;c.fillStyle=o.bg;c.beginPath();c.roundRect?c.roundRect(-w/2,-h/2,w,h,h/2):c.rect(-w/2,-h/2,w,h);c.fill();if(o.line){c.strokeStyle=o.line;c.lineWidth=2;c.stroke()}
  c.fillStyle=o.fg;c.textAlign='center';c.textBaseline='middle';c.fillText(String(text).toUpperCase(),1.5,2);c.restore()}
function brandMark(c,S,x,y,o){T(c,S.x.brand,x,y,{font:F.bod,weight:500,size:o.size||64,ls:o.ls??18,upper:1,align:o.align||'center',color:o.color,alpha:o.alpha,base:'middle'})}
function priceTag(c,S,x,y,p,col,ink){if(!S.x.price||p<=0)return;c.save();c.translate(x,y);c.rotate(-.06);const s=E.outBack(clamp(p));c.scale(s,s);c.font=`600 44px ${F.man}`;const w=c.measureText(S.x.price).width+64;
  c.fillStyle=col;c.fillRect(-w/2,-38,w,76);c.fillStyle=ink;c.textAlign='center';c.textBaseline='middle';c.fillText(S.x.price,0,3);c.restore()}
/* shared end card: whole product, uncropped, with brand + CTA */
function endCard(c,S,t,t0,o={}){const{W,H,p,x}=S;const a=E.out(P(t,t0,.6));if(a<=0)return;c.save();c.globalAlpha=a;c.fillStyle=o.bg||p.bg;c.fillRect(0,0,W,H);c.restore();
  const ink=o.ink||p.fg,acc=o.acc||p.ac;brandMark(c,S,W/2,300,{size:70,color:ink,alpha:E.out(P(t,t0+.15,.6))});
  card(c,S.m(o.mi||0),W/2,910,780,900,{s:.9+.1*E.outExpo(P(t,t0,1.1)),alpha:a,border:rgba(acc,.7),gap:22,bw:2});
  kin(c,x.headline,W/2,1480,{t,t0:t0+.35,font:F.cor,italic:1,weight:600,size:78,maxW:900,align:'center',color:ink,maxLines:2});
  pill(c,x.cta,W/2,1650,{size:38,bg:acc,fg:lumOf(acc)>.55?'#141012':'#FFFFFF',s:E.outBack(P(t,t0+.7,.5)),alpha:P(t,t0+.7,.2)});
  T(c,x.handle,W/2,1760,{size:28,ls:4,align:'center',color:rgba(ink,.7),alpha:P(t,t0+.9,.4),weight:500})}
const det=[[.5,.22],[.35,.55],[.62,.78],[.5,.5]];/* detail focal points: face/neck, drape, border, centre */
const words=s=>String(s||'').split(/\s+/).filter(Boolean);
const SIG=(o)=>R(Object.assign({sig:true,tone:'dark',grain:.045,fit:{full:1,portrait:1,clean:1},multi:1},o));

/* 1 — Monogram Reveal */
SIG({id:'sg-monogram',name:'Monogram Reveal',desc:'Your product seen through giant brand letters, a plunge into the frame, then a kinetic headline.',pal:{bg:'#0E0B0C',fg:'#F4EEE6',ac:'#C9A978'},dur:9,pt:4.2,tags:['Signature','Kinetic type'],
 r(c,t,S){const{W,H,p,x}=S,m=S.m(0);c.fillStyle=p.bg;c.fillRect(0,0,W,H);
  const nm=String(x.brand||'').toUpperCase().trim(),w1=nm.split(/\s+/)[0]||'';const word=(nm.length<=10?nm:w1.length>=3&&w1.length<=10?w1:nm.split(/\s+/).map(w=>w[0]).join('').slice(0,4))||'NEW';
  if(t<2.9){const[b,g]=sgBuf(0,W,H);cover(g,m,0,0,W,H,{z:1.15-.08*P(t,0,2.9)});g.globalCompositeOperation='destination-in';const sz=fit(g,word,F.bod,700,980,520,-4);
    const zoom=1+Math.pow(P(t,1.7,1.2),3)*14;g.translate(W/2,H/2);g.scale(zoom,zoom);g.font=`700 ${sz}px ${F.bod}`;g.textAlign='center';g.textBaseline='middle';if('letterSpacing' in g)g.letterSpacing='-4px';g.fillText(word,0,sz*.05);
    c.save();c.globalAlpha=E.out(P(t,.15,.7));c.drawImage(b,0,0);c.restore();
    T(c,x.label,W/2,H/2+330,{size:26,ls:10,upper:1,align:'center',color:p.ac,weight:600,alpha:P(t,.6,.5)*(1-P(t,1.6,.3))})}
  const f=P(t,2.4,.5);if(f>0){c.save();c.globalAlpha=f;cover(c,m,0,0,W,H,{z:kb(t-2.4,5,1.18,1.04)});c.restore();grad(c,W,H*.45,H*.55,'rgba(0,0,0,0)','rgba(0,0,0,.78)');vignette(c,W,H,.35);
    T(c,x.label,90,300,{size:26,ls:8,upper:1,color:'#fff',weight:600,alpha:P(t,2.8,.5)*(1-P(t,6.6,.3))});
    kin(c,x.headline,90,1390,{t,t0:2.9,font:F.cor,italic:1,weight:600,size:160,maxW:880,color:'#fff',lh:.92,anchor:'bottom',alpha:1-P(t,6.6,.3)});
    T(c,x.sub,94,1480,{size:36,color:'rgba(255,255,255,.85)',maxW:820,p:P(t,3.8,.6),alpha:1-P(t,6.6,.3)})}
  endCard(c,S,t,6.7)}});

/* 2 — Editorial Cuts */
SIG({id:'sg-editorial',name:'Editorial Cuts',desc:'Magazine-paced cuts on the beat through four close-ups with giant numerals, then the full look under a masthead.',pal:{bg:'#F3EEE7',fg:'#141012',ac:'#B3122E'},tone:'light',dur:9,pt:4.6,tags:['Signature','Beat cuts'],
 r(c,t,S){const{W,H,p,x}=S;const cuts=[0,.8,1.6,2.4,3.2];const i=t<3.2?Math.floor(t/.8):4;const lab=[x.f1,x.f2,x.f3,x.label];
  if(i<4){const [fx,fy]=det[i];const m=S.m(i);const lt=t-cuts[i];cover(c,m,0,0,W,H,{z:2.3+.25*lt,fx,fy,filter:'contrast(1.1) saturate(1.05)'});grad(c,W,H*.55,H*.45,'rgba(0,0,0,0)','rgba(0,0,0,.55)');
    flash(c,W,H,.55*(1-P(lt,0,.12)));const n='0'+(i+1);T(c,n,70,560,{font:FA,weight:400,ls:2,size:300,color:'#fff',alpha:.95,p:P(lt,0,.25),rise:60});
    kin(c,lab[i]||'',80,1420,{t:lt,font:FA,weight:400,ls:2,size:118,upper:1,maxW:900,color:'#fff',st:.05,d:.45});
    c.fillStyle=p.ac;c.fillRect(80,1470,180*E.outExpo(P(lt,.1,.5)),10)}
  else{const lt=t-3.2;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const mast=String(x.brand||'').toUpperCase();
    cover(c,S.m(0),60,230,W-120,1340,{z:kb(lt,4,1.1,1)});
    const sz=fit(c,mast,F.bod,700,960,330,-6);T(c,mast,W/2,470,{font:F.bod,weight:700,size:sz,ls:-6,align:'center',color:p.ac,p:P(lt,0,.6),rise:80,shadow:'rgba(0,0,0,.18)',sb:24});
    kin(c,x.headline,80,1700,{t:lt,t0:.3,font:F.cor,italic:1,weight:600,size:96,maxW:920,color:p.fg,maxLines:2});
    T(c,x.label,W-80,1590,{size:24,ls:6,upper:1,align:'right',color:p.ac,weight:700,alpha:P(lt,.6,.4)})}
  endCard(c,S,t,6.8,{bg:p.bg})}});

/* 3 — Slit Reveal */
SIG({id:'sg-slit',name:'Slit Reveal',desc:'Seven vertical slits open on the beat, settle into one frame, and an outlined headline fills with colour.',pal:{bg:'#0B0B0D',fg:'#FFFFFF',ac:'#E8C07A'},dur:8.5,pt:3.4,tags:['Signature','Reveal'],
 r(c,t,S){const{W,H,p,x}=S,m=S.m(0);c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=7,sw=W/n;
  for(let k=0;k<n;k++){const o=E.outExpo(P(t,.15+k*.09,.9)),off=(1-E.inOut(P(t,1.2,1.4)))*(k%2?-1:1)*160;if(o<=0)continue;const w=sw*o;
    c.save();c.beginPath();c.rect(k*sw+(sw-w)/2,0,w,H);c.clip();cover(c,m,0,off,W,H,{z:kb(t,7,1.16,1.03)});c.restore()}
  grad(c,W,H*.5,H*.5,'rgba(0,0,0,0)','rgba(0,0,0,.72)');
  const top=String(x.headline||'').toUpperCase(),hsz=Math.max(120,fit(c,top.split(' ').slice(0,2).join(' '),FA,400,900,210));
  const hh=kin(c,top,W/2,1180,{t,t0:1.5,font:FA,weight:400,ls:2,size:hsz,maxW:940,align:'center',color:'#fff',maxLines:3,alpha:1-P(t,6.2,.3)});
  c.fillStyle=p.ac;const ul=420*E.outExpo(P(t,2.4,.8))*(1-P(t,6.2,.3));c.fillRect(W/2-ul/2,1180+hh-hsz*.55,ul,8);
  T(c,x.sub,W/2,1520,{size:36,align:'center',color:'rgba(255,255,255,.88)',maxW:860,p:P(t,3.4,.6),alpha:1-P(t,6.2,.3)});
  brandMark(c,S,W/2,290,{size:52,color:'#fff',alpha:P(t,2,.6)*(1-P(t,6.2,.3))});endCard(c,S,t,6.3)}});

/* 4 — Colour Panels */
SIG({id:'sg-panels',name:'Colour Panels',desc:'Brand-colour panels wipe across, each revealing a new shot and one huge word of your headline.',pal:{bg:'#1B0F10',fg:'#FFF6EC',ac:'#E0A33A'},dur:9,pt:2.2,tags:['Signature','Bold type'],
 r(c,t,S){const{W,H,p,x}=S;const ws=words(x.headline).slice(0,4);const n=Math.max(1,ws.length),seg=5.6/n;const cols=[p.ac,p.fg,mixHex(p.bg,p.ac,.35),p.ac];
  const i=Math.min(n-1,Math.floor(t/seg)),lt=t-i*seg,[fx,fy]=det[i%4],bd=Math.round(t/seg)*seg,dd=t-bd;
  cover(c,S.m(i),0,0,W,H,{z:(i%2?2:1.12)+.12*lt/seg,fx,fy});grad(c,W,H*.4,H*.6,'rgba(0,0,0,0)','rgba(0,0,0,.55)');
  const sz=fit(c,(ws[i]||'').toUpperCase(),FA,400,960,330);T(c,(ws[i]||'').toUpperCase(),W/2,1260,{font:FA,weight:400,ls:2,size:sz,align:'center',color:'#fff',p:P(lt,.25,.45),rise:90,shadow:'rgba(0,0,0,.35)',sb:40});
  T(c,`${i+1} / ${n}`,W-90,300,{size:26,ls:4,align:'right',color:'#fff',weight:700,alpha:.9});brandMark(c,S,90,300,{size:40,align:'left',color:'#fff',ls:12});
  if(bd>0&&bd<n*seg-.01&&Math.abs(dd)<.3){const e=E.inOut((dd+.3)/.6);c.fillStyle=cols[Math.round(t/seg)%4];c.fillRect(-W+e*W*2,0,W,H)}
  if(t>=5.6&&t<6.6){const e=E.inOut(P(t,5.6,.5));c.fillStyle=cols[(i+1)%4];c.fillRect(W*e,0,W,H)}
  endCard(c,S,t,6.1)}});

/* 5 — Type Wall */
SIG({id:'sg-typewall',name:'Type Wall',desc:'Rows of oversized headline type stream in opposite directions while the full product rises front and centre.',pal:{bg:'#120E0F',fg:'#F6F0E8',ac:'#D8B26E'},dur:8,pt:3.6,tags:['Signature','Kinetic type'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const s=(String(x.headline||x.brand)+' — ').toUpperCase();
  c.save();c.font=`400 210px ${FA}`;const tw=c.measureText(s).width;for(let r=0;r<9;r++){const y=210+r*205,dir=r%2?1:-1,off=((t*140*dir)%tw+tw)%tw;
    c.globalAlpha=(r%2?.9:.22)*E.out(P(t,r*.06,.6));c.fillStyle=r%3===1?p.ac:p.fg;if(r%2){c.fillText(s+s+s,-off,y)}else{c.strokeStyle=p.fg;c.lineWidth=2.5;c.strokeText(s+s+s,-off,y)}}c.restore();
  vignette(c,W,H,.6);const rise=E.outExpo(P(t,.6,1.3));card(c,S.m(0),W/2,940+(1-rise)*700,700,1000,{s:.92+.08*rise,border:rgba(p.ac,.8),gap:18,bw:2});
  priceTag(c,S,W/2+260,1420,P(t,2.2,.5),p.ac,'#140F0F');T(c,x.label,W/2,1600,{size:26,ls:8,upper:1,align:'center',color:p.fg,weight:600,p:P(t,1.8,.5)});
  endCard(c,S,t,5.6)}});

/* 6 — Gilded Light */
SIG({id:'sg-gilded',name:'Gilded Light',desc:'A slow cinematic push-in with warm light sweeps, a hairline gold frame that draws itself and a tracked serif title.',pal:{bg:'#120B08',fg:'#FBF3E6',ac:'#D4AF6A'},dur:9,pt:4,tags:['Signature','Luxury'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,9,1.22,1.02),filter:'contrast(1.08) saturate(1.08) sepia(.08)'});vignette(c,W,H,.62);grad(c,W,H*.55,H*.45,'rgba(0,0,0,0)','rgba(10,6,4,.75)');
  sweep(c,W,H,P(t,.4,2.2));sweep(c,W,H,P(t,4.3,2.2),'255,226,170',.28);
  const fp=E.inOut(P(t,.8,1.8)),m=60,L=2*(W-2*m)+2*(H-2*m);c.save();c.strokeStyle=p.ac;c.lineWidth=2.5;c.setLineDash([L*fp,L]);c.strokeRect(m,m,W-2*m,H-2*m);c.restore();
  brandMark(c,S,W/2,300,{size:56,color:p.fg,alpha:P(t,1.2,.8)});
  track(c,String(x.headline||'').toUpperCase(),W/2,1330,{t,t0:1.6,d:1.8,font:F.cor,weight:600,size:fit(c,String(x.headline).toUpperCase(),F.cor,600,900,124,10),align:'center',color:p.fg,ls0:60,ls:10});
  T(c,x.sub,W/2,1430,{font:F.cor,italic:1,size:44,align:'center',color:rgba(p.fg,.9),maxW:820,p:P(t,2.6,.8)});c.fillStyle=p.ac;const lw=200*E.outExpo(P(t,2.4,.8));c.fillRect(W/2-lw/2,1500,lw,2);
  priceTag(c,S,W/2,1600,P(t,3.4,.5),p.ac,'#160E08');endCard(c,S,t,6.8)}});

/* 7 — Anamorphic Film */
SIG({id:'sg-film',name:'Anamorphic Film',desc:'A short brand film: title card, letterboxed drift across the look, film subtitles and closing credits.',pal:{bg:'#000000',fg:'#F1ECE4',ac:'#E2B86F'},dur:10,pt:4.5,tags:['Signature','Cinematic'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle='#000';c.fillRect(0,0,W,H);
  if(t<2){T(c,'a',W/2,880,{font:F.cor,italic:1,size:48,align:'center',color:rgba(p.fg,.8),alpha:P(t,.2,.6)*(1-P(t,1.6,.3))});brandMark(c,S,W/2,990,{size:96,color:p.fg,ls:24,alpha:P(t,.4,.8)*(1-P(t,1.6,.3))});
    T(c,'film',W/2,1110,{font:F.cor,italic:1,size:48,align:'center',color:rgba(p.fg,.8),alpha:P(t,.7,.6)*(1-P(t,1.6,.3))})}
  if(t>=1.8){const lt=t-1.8,bar=330,shots=[[.5,.3,1.5],[.4,.62,1.9],[.5,.5,1.15]],k=Math.min(2,Math.floor(lt/2.1)),[fx,fy,z]=shots[k],st=lt-k*2.1;
    c.save();c.globalAlpha=P(t,1.8,.5);c.beginPath();c.rect(0,bar,W,H-2*bar);c.clip();cover(c,S.m(k),0,bar,W,H-2*bar,{z:z+.08*st,fx,fy,px:(st-1)*-30,filter:'contrast(1.12) saturate(.92)'});c.restore();
    const subs=[x.sub,x.f1&&x.f2?`${x.f1}. ${x.f2}.`:x.f1,x.headline];T(c,subs[k],W/2,H-bar-70,{font:F.cor,italic:1,size:48,align:'center',color:'#FFF7E0',maxW:900,alpha:P(st,.2,.3)*(1-P(st,1.85,.2)),shadow:'rgba(0,0,0,.9)',sb:12})}
  if(t>=8.1){const lt=t-8.1;c.fillStyle='#000';c.globalAlpha=E.out(P(lt,0,.4));c.fillRect(0,0,W,H);c.globalAlpha=1;
    [[x.label,'Collection'],[x.f3||x.f1,'Made'],[x.handle,'Find us']].forEach(([v,k2],i)=>{T(c,k2,W/2,760+i*190,{size:24,ls:8,upper:1,align:'center',color:p.ac,weight:600,p:P(lt,.1+i*.15,.4)});T(c,v,W/2,820+i*190,{font:F.cor,size:52,align:'center',color:p.fg,p:P(lt,.15+i*.15,.4),maxW:900})});
    pill(c,x.cta,W/2,1450,{bg:'transparent',line:p.fg,fg:p.fg,s:1,alpha:P(lt,.6,.4)})}}});

/* 8 — Infinite Frame */
SIG({id:'sg-infinite',name:'Infinite Frame',desc:'A hypnotic zoom through frames within frames of your look, landing on the full product and a bold title.',pal:{bg:'#EFE8DD',fg:'#171214',ac:'#9E1C2B'},tone:'light',dur:8,pt:2.3,tags:['Signature','Loop'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const r=.66,cyc=1.25,f=t<5?(t/cyc)%1:0,z=Math.pow(1/r,E.inOut(f));
  if(t<5.2){for(let k=0;k<7;k++){const s=z*Math.pow(r,k),w=W*.92*s,h=H*.86*s;if(w<20)break;const x0=W/2-w/2,y0=H*.5-h/2;c.fillStyle='#FFFFFF';c.fillRect(x0-14*s,y0-14*s,w+28*s,h+28*s);cover(c,S.m(0),x0,y0,w,h,{z:1.05})}
    grad(c,W,H*.6,H*.4,'rgba(0,0,0,0)','rgba(0,0,0,.6)');kin(c,String(x.headline).toUpperCase(),W/2,1500,{t,t0:.4,font:FA,weight:400,ls:2,size:120,maxW:940,align:'center',color:'#fff',maxLines:2});
    T(c,x.label,W/2,300,{size:26,ls:8,upper:1,align:'center',color:'#fff',weight:700,shadow:'rgba(0,0,0,.6)',sb:20,p:P(t,.4,.5)})}
  endCard(c,S,t,5,{bg:p.bg})}});

/* 9 — Launch Countdown */
SIG({id:'sg-countdown',name:'Launch Countdown',desc:'3-2-1 punch cuts with giant numerals over close-ups, a flash, then the reveal with price and a pulsing call to action.',pal:{bg:'#0D0A0B',fg:'#FFFFFF',ac:'#FF4D2E'},dur:8.5,pt:4,tags:['Signature','Launch'],
 r(c,t,S){const{W,H,p,x}=S;if(t<3){const i=Math.floor(t),lt=t-i,[fx,fy]=det[i];cover(c,S.m(i),0,0,W,H,{z:2.4-.3*lt,fx,fy,filter:'contrast(1.15) saturate(.6) brightness(.7)'});
    const s=1.35-.35*E.outExpo(P(lt,0,.35));c.save();c.translate(W/2,H/2);c.scale(s,s);T(c,String(3-i),0,0,{font:FA,weight:400,ls:2,size:760,align:'center',base:'middle',color:p.ac,alpha:1-P(lt,.82,.18)});c.restore();
    T(c,i===0?'Dropping in':i===1?String(x.label||'Coming'):'Ready?',W/2,1560,{size:40,ls:10,upper:1,align:'center',color:'#fff',weight:700,p:P(lt,.1,.3)})}
  else{const lt=t-3;cover(c,S.m(0),0,0,W,H,{z:kb(lt,4,1.15,1.02)});flash(c,W,H,1-P(lt,0,.35));grad(c,W,H*.4,H*.6,'rgba(0,0,0,0)','rgba(0,0,0,.8)');
    T(c,'Now live',90,320,{size:30,ls:8,upper:1,color:p.ac,weight:800,p:P(lt,.2,.4)});kin(c,String(x.headline).toUpperCase(),90,1360,{t:lt,t0:.3,font:FA,weight:400,ls:2,size:150,maxW:900,color:'#fff',maxLines:3,anchor:'bottom'});
    priceTag(c,S,250,1470,P(lt,1,.5),'#fff','#111');const pu=1+.05*Math.sin(lt*6)*P(lt,1.6,.3);pill(c,x.cta,W/2,1640,{bg:p.ac,fg:'#fff',s:E.outBack(P(lt,1.3,.5))*pu,size:38})}
  endCard(c,S,t,6.6)}});

/* 10 — Craft Detail */
SIG({id:'sg-loupe',name:'Craft Detail',desc:'A loupe glides over three craft details with drawn callouts and large labels, then the whole piece.',pal:{bg:'#0F0D0C',fg:'#F7F1E8',ac:'#D9B36C'},dur:9.5,pt:3,tags:['Signature','Craft story'],
 r(c,t,S){const{W,H,p,x}=S,m=S.m(0);cover(c,m,0,0,W,H,{z:1.08,filter:'brightness(.55) saturate(.8)'});const pts=[[.5,.3],[.4,.58],[.6,.8]],labs=[x.f1,x.f2,x.f3];
  const seg=2,i=Math.min(2,Math.floor(t/seg)),lt=t-i*seg,a=pts[i],b=pts[Math.min(2,i+1)],mv=E.inOut(P(lt,1.5,.5)),fx=a[0]+(b[0]-a[0])*(i<2?mv:0),fy=a[1]+(b[1]-a[1])*(i<2?mv:0);
  if(t<6.3){const cx=W*(.18+.64*fx),cy=H*(.14+.72*fy),r=230;c.save();c.beginPath();c.arc(cx,cy,r,0,7);c.clip();cover(c,m,cx-r,cy-r,2*r,2*r,{z:3.2,fx,fy});c.restore();
    c.strokeStyle=p.ac;c.lineWidth=4;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();const side=cx>W/2?-1:1,lx=cx+side*(r+30),ly=cy,ex=side>0?W-80:80,lp=E.outExpo(P(lt,.25,.6))*(1-mv);
    c.lineWidth=2;c.beginPath();c.moveTo(lx,ly);c.lineTo(lx+(ex-lx)*lp,ly);c.stroke();
    kin(c,String(labs[i]||'').toUpperCase(),side>0?W-80:80,ly-30,{t:lt,t0:.45,font:FA,weight:400,ls:2,size:76,maxW:420,align:side>0?'right':'left',color:p.fg,maxLines:2,alpha:1-mv});
    T(c,'0'+(i+1)+' / 03',side>0?W-80:80,ly+50,{size:24,ls:6,align:side>0?'right':'left',color:p.ac,weight:700,alpha:P(lt,.6,.3)*(1-mv)})}
  brandMark(c,S,W/2,280,{size:46,color:p.fg,alpha:.9*(1-P(t,6,.3))});endCard(c,S,t,6.2)}});

/* 11 — Grid Shuffle */
SIG({id:'sg-grid',name:'Grid Shuffle',desc:'Six tiles pop in, shuffle places like a lookbook, and one tile expands into the full-screen hero.',pal:{bg:'#F6F1EA',fg:'#141012',ac:'#B8862E'},tone:'light',dur:9,pt:2.2,tags:['Signature','Lookbook'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const gx=60,gy=360,g=20,cw=(W-2*gx-g)/2,ch=(1220-2*g)/3;const order=[0,1,2,3,4,5],sh=[4,0,5,1,3,2];
  const sp=E.inOut(P(t,2.2,.9)),ex=E.inOut(P(t,4,1));const foc=[[.5,.2],[.5,.5],[.4,.6],[.6,.8],[.5,.35],[.45,.7]];
  T(c,x.label,W/2,250,{size:26,ls:8,upper:1,align:'center',color:p.ac,weight:700,p:P(t,.2,.4),alpha:1-ex});
  for(const k of [0,2,3,4,5,1]){const a=order[k],b=sh[k],ax=gx+(a%2)*(cw+g),ay=gy+Math.floor(a/2)*(ch+g),bx=gx+(b%2)*(cw+g),by=gy+Math.floor(b/2)*(ch+g);
    let X=ax+(bx-ax)*sp,Y=ay+(by-ay)*sp,w=cw,h=ch;const pop=E.outBack(P(t,.2+k*.12,.5));if(pop<=0)continue;
    if(k===1){X+=(0-X)*ex;Y+=(0-Y)*ex;w+=(W-w)*ex;h+=(H-h)*ex}else if(ex>0&&ex>=1)continue;
    c.save();c.translate(X+w/2,Y+h/2);c.scale(pop,pop);cover(c,S.m(k===1?0:k+1),-w/2,-h/2,w,h,{z:k===1?1.1-.08*ex:1.9,fx:foc[k][0],fy:foc[k][1],alpha:k===1?1:1-ex});c.restore()}
  if(ex>0){grad(c,W,H*.5,H*.5,'rgba(0,0,0,0)','rgba(0,0,0,.7)');kin(c,x.headline,80,1440,{t,t0:4.6,anchor:'bottom',font:F.cor,italic:1,weight:600,size:140,maxW:900,color:'#fff',maxLines:2});T(c,x.sub,82,1530,{size:36,color:'rgba(255,255,255,.88)',maxW:860,p:P(t,5.2,.5)})}
  brandMark(c,S,W/2,1680,{size:44,color:p.fg,alpha:P(t,1,.5)*(1-ex)});endCard(c,S,t,6.8,{bg:p.bg})}});

/* 12 — Split Horizon */
SIG({id:'sg-split',name:'Split Horizon',desc:'Two halves glide in opposite directions around a running headline band, then part like doors on the full look.',pal:{bg:'#101012',fg:'#FFFFFF',ac:'#C9A978'},dur:8.5,pt:2.5,tags:['Signature','Motion'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const open=E.inOut(P(t,3.8,1.1)),band=170,hh=(H-band)/2;
  if(open>0){cover(c,S.m(0),0,0,W,H,{z:kb(t-3.8,4,1.16,1.02)});grad(c,W,H*.5,H*.5,'rgba(0,0,0,0)','rgba(0,0,0,.7)')}
  const off=open*(hh+band);c.save();c.beginPath();c.rect(0,-off,W,hh);c.clip();cover(c,S.m(0),0,-off,W,hh,{z:1.7,fx:.5,fy:.28,px:-80+t*40});c.restore();
  c.save();c.beginPath();c.rect(0,hh+band+off,W,hh);c.clip();cover(c,S.m(1),0,hh+band+off,W,hh,{z:1.9,fx:.5,fy:.75,px:80-t*40});c.restore();
  if(open<1){c.save();c.globalAlpha=1-open;c.fillStyle=p.ac;c.fillRect(0,hh,W,band);const s=(String(x.headline)+'  •  ').toUpperCase();c.font=`400 104px ${FA}`;const tw=c.measureText(s).width,o=(t*220)%tw;c.fillStyle='#120D0B';c.textBaseline='middle';c.fillText(s+s+s,-o,hh+band/2+4);c.restore()}
  if(open>0){kin(c,x.headline,80,1420,{t,t0:4.3,anchor:'bottom',font:F.cor,italic:1,weight:600,size:140,maxW:900,color:'#fff',maxLines:2,alpha:1-P(t,6.4,.3)});T(c,x.sub,82,1510,{size:36,color:'rgba(255,255,255,.88)',maxW:860,p:P(t,4.9,.5),alpha:1-P(t,6.4,.3)})}
  brandMark(c,S,W/2,300,{size:48,color:'#fff',alpha:P(t,.3,.5)});endCard(c,S,t,6.5)}});

/* hold sections for smart length stretching: [end of intro, start of outro] */
const HOLD={'sg-monogram':[3.6,6.5],'sg-editorial':[3.8,6.7],'sg-slit':[3.2,6.1],'sg-panels':[.4,5.5],'sg-typewall':[2.6,5.5],'sg-gilded':[3,6.7],'sg-film':[2.4,8],'sg-infinite':[1,4.9],'sg-countdown':[4.2,6.5],'sg-loupe':[.5,6.1],'sg-grid':[5.4,6.7],'sg-split':[5,6.4]};
TPL.forEach(t=>{if(HOLD[t.id])t.hold=HOLD[t.id]});
/* ---------- library integration ---------- */
const sg=TPL.filter(t=>t.sig);for(const t of sg)TPL.splice(TPL.indexOf(t),1);TPL.unshift(...sg);
const sigCount=TPL.filter(t=>t.sig).length;
const _score=scoreAll;scoreAll=function(){_score();TPL.forEach(t=>{if(t.sig&&state.scores[t.id]!=null)state.scores[t.id]=Math.min(99,state.scores[t.id]+14)})};
const _build=buildGrid;buildGrid=function(){const f=state.filter;if(f==='sig'||f==='lab'){const keep=TPL.slice();TPL.splice(0,TPL.length,...keep.filter(t=>t[f]));try{state.filter='reel';_build()}finally{TPL.splice(0,TPL.length,...keep);state.filter=f}}else _build()};
const fl=document.getElementById('filters');if(fl){const b=document.createElement('button');b.type='button';b.dataset.f='sig';b.setAttribute('aria-pressed','false');b.textContent='Signature · '+sigCount;fl.prepend(b)}
state.sel='sg-monogram';
window.SGH={cover,card,kin,track,vignette,grad,sweep,flash,pill,brandMark,priceTag,endCard,det,words,FA,sgBuf,lines,fnt};
})();
