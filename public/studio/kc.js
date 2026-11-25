/* Kathavi Collection — world-class, ready-to-use templates. Batch 1: 25 reels in five design families.
   Every template: brand-agnostic, 1–4 media, any brand-name length, Instagram safe areas (key text between y≈250 and y≈1560). */
(()=>{
'use strict';
const SG=window.SGH;if(!SG)return;
const{cover,card,kin,vignette,grad,sweep,flash,pill,brandMark,endCard}=SG;
const IS="'Instrument Serif', 'Cormorant Garamond', serif",IT="'Inter Tight', 'Manrope', sans-serif",PM="'IBM Plex Mono', 'Courier Prime', monospace",AN="'Anton', Impact, sans-serif";
const KC=(o)=>R(Object.assign({kc:true,tone:'dark',grain:.035,fit:{full:1,portrait:1,clean:1},multi:1},o));
const ink=col=>lumOf(col)>.55?'#111113':'#FFFFFF';
const roman=n=>['I','II','III','IV','V','VI'][n]||String(n+1);
const issue=()=>{const d=new Date();return d.toLocaleString('en-GB',{month:'long'}).toUpperCase()+' '+d.getFullYear()};
const feats=x=>[x.f1,x.f2,x.f3].filter(Boolean);
const clip=(c,x,y,w,h)=>{c.beginPath();c.rect(x,y,w,h);c.clip()};
/* Readable text over any photo: eased multi-stop scrims (no hard band). */
const scrimB=(c,W,H,a=.78,from=.42)=>{const g=c.createLinearGradient(0,H*from,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.35,`rgba(0,0,0,${a*.35})`);g.addColorStop(.7,`rgba(0,0,0,${a*.8})`);g.addColorStop(1,`rgba(0,0,0,${a})`);c.fillStyle=g;c.fillRect(0,H*from,W,H*(1-from))};
const scrimT=(c,W,H,a=.6,to=.3)=>{const g=c.createLinearGradient(0,0,0,H*to);g.addColorStop(0,`rgba(0,0,0,${a})`);g.addColorStop(.6,`rgba(0,0,0,${a*.35})`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H*to)};
const hair=(c,x1,y1,x2,y2,col,lw=2,p=1)=>{if(p<=0)return;c.save();c.strokeStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(x1,y1);c.lineTo(x1+(x2-x1)*clamp(p),y1+(y2-y1)*clamp(p));c.stroke();c.restore()};
const mono=(c,s,x,y,o={})=>T(c,s,x,y,{font:PM,weight:500,size:o.size||24,ls:o.ls??3,upper:o.upper??1,color:o.color||'#fff',align:o.align,alpha:o.alpha,p:o.p,maxW:o.maxW,base:o.base});
/* Shared closing frame: brand + CTA + handle, in the template's family voice. */
function outro(c,S,t,t0,f={}){const{W,H,p,x}=S,a=E.out(P(t,t0,.6));if(a<=0)return;const bg=f.bg||p.bg,fg=f.fg||ink(bg);
  c.save();c.globalAlpha=a;c.fillStyle=bg;c.fillRect(0,0,W,H);c.restore();
  if(f.photo){c.save();c.globalAlpha=a*.22;cover(c,S.m(0),0,0,W,H,{z:1.1,filter:'grayscale(1) contrast(1.1)'});c.restore()}
  T(c,x.brand,W/2,820,{font:f.font||IS,size:f.size||120,align:'center',color:fg,ls:f.ls??2,upper:f.upper,p:P(t,t0+.15,.7),maxW:W-160,maxLines:2,base:'middle'});
  hair(c,W/2-90,930,W/2+90,930,f.acc||p.ac,2,E.outExpo(P(t,t0+.4,.8)));
  if(x.cta)T(c,x.cta,W/2,1020,{font:IT,weight:600,size:40,align:'center',color:fg,p:P(t,t0+.6,.6),maxW:W-200,maxLines:1});
  mono(c,x.handle,W/2,1090,{align:'center',color:rgba(fg,.6),size:22,upper:0,p:P(t,t0+.8,.6)})}

/* ================= FAMILY 1 · EDITORIAL ================= */
KC({id:'kc-cover',name:'The Cover',fam:'Editorial',desc:'Your brand as a magazine masthead over a full-bleed cover shot, cover lines with page numbers, then the page turns to the feature spread.',pal:{bg:'#F4F1EA',fg:'#111113',ac:'#C23B22'},dur:10,pt:2.2,hold:[1.6,6],tags:['Editorial','Magazine'],
 r(c,t,S){const{W,H,p,x}=S;const turn=E.inOut(P(t,5.6,.9));
  c.save();c.translate(-turn*W,0);
  cover(c,S.m(0),0,0,W,H,{z:kb(t,6,1.12,1.02),fy:.4});scrimT(c,W,H,.5,.32);scrimB(c,W,H,.82,.5);
  const mh=fit(c,String(x.brand||'').toUpperCase(),IS,400,W-120,260,-2);
  T(c,x.brand,W/2,250+mh*.72,{font:IS,size:mh,align:'center',color:'#fff',upper:1,ls:-2,p:P(t,.1,.7),rise:60});
  mono(c,`Issue ${String(new Date().getMonth()+1).padStart(2,'0')} · ${issue()}`,W/2,250+mh*.72+56,{align:'center',size:22,p:P(t,.5,.6)});
  feats(x).concat(x.headline?[]:[]).forEach((f,i)=>{const y=1170+i*96;mono(c,String(i*14+12).padStart(3,'0'),80,y,{size:22,color:p.ac===undefined?'#fff':'#fff',p:P(t,1+i*.25,.5)});T(c,f,170,y+2,{font:IS,size:54,color:'#fff',maxW:760,maxLines:1,p:P(t,1.05+i*.25,.5)})});
  if(x.headline)T(c,x.headline,80,1560,{font:IS,italic:1,size:84,color:'#fff',maxW:860,maxLines:2,anchor:'bottom',p:P(t,1.9,.7)});
  c.restore();
  if(turn>0){c.save();c.translate((1-turn)*W,0);c.fillStyle=p.bg;c.fillRect(0,0,W,H);
    cover(c,S.m(1),0,0,W,1120,{z:kb(t-5.6,4,1.1,1),fy:.45});
    mono(c,'The feature',80,1220,{color:p.ac,size:22,p:P(t,6.2,.5)});
    kin(c,x.headline||x.brand,80,1320,{t,t0:6.3,font:IS,size:92,maxW:920,maxLines:2,color:p.fg});
    T(c,x.sub,80,1500,{font:IT,size:34,color:rgba(p.fg,.75),maxW:880,maxLines:2,p:P(t,7,.6)});
    hair(c,80,1620,W-80,1620,rgba(p.fg,.25),2,E.outExpo(P(t,7.2,1)));mono(c,x.cta,80,1680,{color:p.fg,size:24,p:P(t,7.5,.6),maxW:600});mono(c,x.handle,W-80,1680,{align:'right',color:rgba(p.fg,.6),size:22,upper:0,p:P(t,7.6,.6)});
    c.restore()}}});

KC({id:'kc-index',name:'The Index',fam:'Editorial',desc:'A numbered contents page: each line draws in, opens into a photo window, and the list resolves into the hero shot.',pal:{bg:'#111113',fg:'#F5F4EF',ac:'#B9FA70'},dur:11,pt:3.4,hold:[1.2,7.5],tags:['Editorial','List'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);
  const items=[x.headline,...feats(x)].filter(Boolean).slice(0,4);const n=items.length||1;
  mono(c,'Index',80,300,{color:p.ac,p:P(t,.1,.5)});T(c,x.brand,W-80,300,{font:PM,size:24,align:'right',color:rgba(p.fg,.6),upper:1,ls:3,p:P(t,.1,.5)});
  hair(c,80,340,W-80,340,rgba(p.fg,.3),2,E.outExpo(P(t,.2,1)));
  const open=k=>E.inOut(P(t,1.6+k*1.5,.6))*(1-E.inOut(P(t,2.9+k*1.5,.5)));const hero=E.inOut(P(t,1.6+n*1.5,1));
  let y=440;items.forEach((s,i)=>{const o=open(i);
    mono(c,String(i+1).padStart(2,'0'),80,y+56,{color:p.ac,size:26,p:P(t,.4+i*.18,.5)});
    T(c,s,170,y+60,{font:IS,size:72,color:p.fg,maxW:820,maxLines:1,p:P(t,.45+i*.18,.6),alpha:1-hero*.85});
    const h=o*620;if(h>2){c.save();clip(c,80,y+100,W-160,h);cover(c,S.m(i),80,y+100,W-160,620,{z:1.15-.08*o});c.restore()}
    y+=110+h;hair(c,80,y,W-80,y,rgba(p.fg,.18),2,E.outExpo(P(t,.5+i*.18,1)))});
  if(hero>0){const r0={x:80,y:440,w:W-160,h:620},r1={x:0,y:0,w:W,h:H};const L=(a,b)=>a+(b-a)*hero;c.save();clip(c,L(r0.x,r1.x),L(r0.y,r1.y),L(r0.w,r1.w),L(r0.h,r1.h));
    cover(c,S.m(0),0,0,W,H,{z:kb(t-(1.6+n*1.5),4,1.12,1.02)});scrimB(c,W,H,.82,.42);c.restore();
    T(c,x.sub||x.headline,80,1450,{font:IS,size:76,color:'#fff',maxW:900,maxLines:2,anchor:'bottom',p:P(t,2.4+n*1.5,.7)});
    if(x.cta)pill(c,x.cta,W/2,1580,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,3+n*1.5,.5)),alpha:P(t,3+n*1.5,.2),size:30})}}});

KC({id:'kc-caption',name:'Caption Study',fam:'Editorial',desc:'Slow, museum-quiet: a full-bleed shot with a typed catalogue caption, then three detail crops, each with its own note.',pal:{bg:'#EDEAE3',fg:'#1A1A1A',ac:'#1A1A1A'},tone:'light',dur:12,pt:1.8,hold:[3,9],tags:['Editorial','Detail'],
 r(c,t,S){const{W,H,p,x}=S;const shots=[[.5,.45,1.05],[.32,.35,2.2],[.62,.62,2.4],[.5,.25,2.0]],seg=2.6,i=Math.min(3,Math.floor(t/seg)),lt=t-i*seg,[fx,fy,z]=shots[i];
  c.fillStyle=p.bg;c.fillRect(0,0,W,H);
  const fr={x:70,y:200,w:W-140,h:1300};c.save();clip(c,fr.x,fr.y,fr.w,fr.h);cover(c,S.m(i===0?0:i%Math.max(1,S.n)),fr.x,fr.y,fr.w,fr.h,{z:z*(1+.04*lt/seg),fx,fy});c.restore();
  if(lt<.35&&i>0){c.save();c.globalAlpha=1-lt/.35;c.fillStyle=p.bg;c.fillRect(fr.x,fr.y,fr.w,fr.h);c.restore()}
  const notes=[x.headline,x.f1||'Detail',x.f2||'Finish',x.f3||'Form'];const cap=`${String(i+1).padStart(2,'0')} — ${notes[i]||''}`;
  const typed=cap.slice(0,Math.floor(cap.length*clamp((lt-.3)/.9)));
  mono(c,typed+(lt%1<.5&&typed.length<cap.length?'▍':''),70,1580,{color:p.fg,size:26,upper:0,ls:1,maxW:W-140});
  mono(c,x.brand,70,1630,{color:rgba(p.fg,.55),size:20});mono(c,x.label||issue(),W-70,1630,{align:'right',color:rgba(p.fg,.55),size:20,upper:1});
  hair(c,70,1540,W-70,1540,rgba(p.fg,.35),2,E.outExpo(P(t,.2,1.2)));
  if(t>10.4)outro(c,S,t,10.4,{bg:p.bg,fg:p.fg,font:IS,acc:p.fg})}});

KC({id:'kc-quote',name:'The Pull-Quote',fam:'Editorial',desc:'A magazine pull-quote set huge over a softened photo, line by line, with an attribution rule — then the product, sharp.',pal:{bg:'#1D1B19',fg:'#F6F1E7',ac:'#D8B67A'},dur:10,pt:3.6,hold:[1,6.5],tags:['Editorial','Quote'],
 r(c,t,S){const{W,H,p,x}=S;const clear=E.inOut(P(t,6.4,1));
  cover(c,S.m(0),0,0,W,H,{z:kb(t,10,1.15,1.03),filter:`blur(${(1-clear)*14}px) brightness(${.55+.45*clear})`});c.fillStyle=rgba(p.bg,.55*(1-clear));c.fillRect(0,0,W,H);
  if(clear<1){c.save();c.globalAlpha=1-clear;T(c,'“',80,560,{font:IS,size:300,color:p.ac,p:P(t,.1,.6)});
    kin(c,x.sub||x.headline,80,720,{t,t0:.5,font:IS,italic:1,size:96,maxW:900,maxLines:5,color:p.fg,st:.12,d:.8,lh:1.08});
    hair(c,80,1380,260,1380,p.ac,3,E.outExpo(P(t,3,.8)));mono(c,x.brand,300,1390,{color:rgba(p.fg,.8),size:24,p:P(t,3.2,.6)});c.restore()}
  if(clear>0){c.save();c.globalAlpha=clear;scrimB(c,W,H,.82,.45);c.restore();T(c,x.headline,80,1470,{font:IS,size:80,color:'#fff',maxW:900,maxLines:2,anchor:'bottom',p:P(t,7,.7)});
    mono(c,[x.cta,x.handle].filter(Boolean).join('   ·   '),80,1560,{color:p.ac,size:24,p:P(t,7.6,.6),maxW:900,upper:0})}}});

KC({id:'kc-spread',name:'Double Spread',fam:'Editorial',desc:'Two pages slide together like an open magazine: photo on one, a set paragraph with a drop cap on the other, then they swap.',pal:{bg:'#F5F2EC',fg:'#151515',ac:'#8A6A3B'},tone:'light',dur:11,pt:2.6,hold:[2,7],tags:['Editorial','Layout'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const sw=E.inOut(P(t,5,1)),gut=H/2;
  const page=(top,which,a)=>{const y=top?0:gut;c.save();clip(c,0,y,W,gut);
    if(which==='photo')cover(c,S.m(top?0:1),0,y,W,gut,{z:kb(t,11,1.12,1.02),fy:.45});
    else{c.fillStyle=p.bg;c.fillRect(0,y,W,gut);const txt=[x.sub,x.headline].filter(Boolean).join('. ')||x.brand;const cap=String(txt).trim()[0]||'';
      mono(c,x.label||'Feature',80,y+150,{color:p.ac,size:22,p:P(t,a,.5)});T(c,x.headline||x.brand,80,y+260,{font:IS,size:92,color:p.fg,maxW:W-160,maxLines:2,p:P(t,a+.1,.7),lh:1.02});
      hair(c,80,y+470,200,y+470,p.ac,3,E.outExpo(P(t,a+.3,.6)));T(c,x.sub,80,y+560,{font:IS,italic:1,size:54,color:rgba(p.fg,.85),maxW:W-160,maxLines:3,p:P(t,a+.4,.7),lh:1.18});
      mono(c,feats(x).join('  /  ')||x.label,80,y+gut-150,{color:rgba(p.fg,.6),size:20,maxW:W-160,p:P(t,a+.5,.6)});mono(c,`p. ${top?'24':'25'}`,W-80,y+gut-150,{align:'right',color:rgba(p.fg,.5),size:20,p:P(t,a+.5,.6)})}
    c.restore()};
  c.save();c.translate(0,(1-E.outExpo(P(t,0,.9)))*-gut);page(true,sw>.5?'text':'photo',5.6);c.restore();
  c.save();c.translate(0,(1-E.outExpo(P(t,.15,.9)))*gut);page(false,sw>.5?'photo':'text',.8);c.restore();
  if(sw>0&&sw<1){c.fillStyle=p.fg;c.fillRect(0,gut-2+(sw-.5)*40,W*Math.sin(sw*Math.PI),4)}
  hair(c,0,gut,W,gut,rgba(p.fg,.25),2,1);
  T(c,x.brand,W/2,gut,{font:PM,size:22,ls:6,upper:1,align:'center',color:p.fg,base:'middle',alpha:.0});
  if(t>9.4)outro(c,S,t,9.4,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});

/* ================= FAMILY 2 · MAISON ================= */
KC({id:'kc-letterbox',name:'Maison Letterbox',fam:'Maison',desc:'Black bars part like a cinema curtain, the wordmark tracks in, a gold hairline frames a slow push on the product.',pal:{bg:'#0B0A09',fg:'#F3EBDD',ac:'#C9A96E'},dur:12,pt:4.2,hold:[2.5,8],grain:.06,tags:['Luxury','Cinematic'],
 r(c,t,S){const{W,H,p,x}=S;const open=E.inOut(P(t,1.6,1.6)),bar=(H/2+4)*(1-open)+300*open;
  cover(c,S.m(Math.floor(Math.max(0,t-3)/3)%Math.max(1,Math.min(3,S.n))),0,0,W,H,{z:kb(t%3+1,4,1.14,1.04),filter:'contrast(1.05) saturate(.92)'});vignette(c,W,H,.5);scrimB(c,W,H,.7,.5);
  c.fillStyle=p.bg;c.fillRect(0,0,W,bar);c.fillRect(0,H-bar,W,bar);
  const tr=E.outExpo(P(t,.2,1.8));T(c,x.brand,W/2,open<.05?H/2:bar/2+10,{font:"'Italiana', serif",size:Math.min(96,fit(c,x.brand||'',"'Italiana', serif",400,W-200,96,24)),ls:24+40*(1-tr),upper:1,align:'center',base:'middle',color:p.fg,alpha:tr});
  const fr=E.outExpo(P(t,3,1.4));if(fr>0){c.save();c.strokeStyle=rgba(p.ac,.9);c.lineWidth=2;c.globalAlpha=fr;c.strokeRect(70,bar+50,W-140,H-2*bar-100);c.restore()}
  if(x.headline&&t>4)T(c,x.headline,W/2,H-bar+130,{font:"'Italiana', serif",size:64,align:'center',color:p.fg,maxW:W-200,maxLines:1,p:P(t,4.4,.9)});
  mono(c,x.label||issue(),W/2,x.headline?H-bar+215:H-bar/2,{align:'center',color:rgba(p.fg,.6),size:20,ls:8,p:P(t,3.4,.8),base:'middle'});
  if(t>10.2)outro(c,S,t,10.2,{bg:p.bg,fg:p.fg,font:"'Italiana', serif",upper:1,ls:12,size:88,acc:p.ac})}});

KC({id:'kc-arch',name:'Atelier Arch',fam:'Maison',desc:'The product appears through an arched atelier window that slowly grows until it fills the frame.',pal:{bg:'#EFE7DA',fg:'#2B2118',ac:'#9C6B3C'},tone:'light',dur:10,pt:2.8,hold:[1.5,6.5],tags:['Luxury','Shape'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const g=E.inOut(P(t,4.2,1.6));
  const aw=560+(W+400-560)*g,ah=900+(H+400-900)*g,ax=W/2-aw/2,ay=380-(380+200)*g;
  c.save();archPath(c,ax,ay,aw,ah);c.clip();cover(c,S.m(0),0,0,W,H,{z:kb(t,10,1.2,1.04)});c.restore();
  if(g<1){c.save();c.globalAlpha=1-g;c.strokeStyle=p.ac;c.lineWidth=2;archPath(c,ax-24,ay-24,aw+48,ah+48);c.stroke();c.restore();
    T(c,x.brand,W/2,1420,{font:IS,size:92,align:'center',color:p.fg,p:P(t,.4,.8),maxW:W-160,maxLines:1,alpha:1-g});
    mono(c,x.label||'Atelier',W/2,1490,{align:'center',color:p.ac,size:22,ls:8,p:P(t,.8,.7),alpha:1-g});
    T(c,x.sub,W/2,1600,{font:IS,italic:1,size:42,align:'center',color:rgba(p.fg,.8),maxW:W-200,maxLines:2,p:P(t,1.2,.7),alpha:1-g})}
  if(g>0){c.save();c.globalAlpha=g;scrimB(c,W,H,.8,.45);c.restore();T(c,x.headline,W/2,1450,{font:IS,size:86,align:'center',color:'#fff',maxW:W-180,maxLines:2,anchor:'bottom',p:P(t,5.4,.8)});
    if(x.cta)mono(c,x.cta,W/2,1560,{align:'center',color:'#fff',size:24,ls:6,p:P(t,6,.6)})}
  if(t>8.6)outro(c,S,t,8.6,{bg:p.bg,fg:p.fg,acc:p.ac})}});

KC({id:'kc-seal',name:'The Seal',fam:'Maison',desc:'A wax-seal monogram presses into the screen with a soft impact, breaks open and reveals the collection.',pal:{bg:'#14100E',fg:'#F2E8D8',ac:'#8E1B23'},dur:10,pt:5,hold:[2.6,7],tags:['Luxury','Monogram'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const press=P(t,.3,.5),brk=E.inOut(P(t,2.4,1));const init=String(x.brand||'K').trim()[0]?.toUpperCase()||'K';
  if(brk>0){c.save();c.globalAlpha=brk;cover(c,S.m(Math.floor(Math.max(0,t-3.4)/1.8)%Math.max(1,Math.min(4,S.n))),0,0,W,H,{z:kb((t-3.4)%1.8+.2,2,1.1,1.03)});grad(c,W,H*.5,H*.5,'rgba(0,0,0,0)','rgba(0,0,0,.65)');c.restore()}
  if(brk<1){const s=press<1?2.2-1.2*E.outBack(press):1,cx=W/2,cy=H/2-60,r=230;c.save();c.translate(cx,cy);c.scale(s,s);c.globalAlpha=Math.min(1,press*3)*(1-brk);
    for(let k=0;k<2;k++){const off=k?brk*260:-brk*260;c.save();c.translate(off,0);c.beginPath();if(k)c.rect(0,-r*1.3,r*1.4,r*2.6);else c.rect(-r*1.4,-r*1.3,r*1.4,r*2.6);c.clip();
      c.beginPath();for(let i=0;i<=40;i++){const a=i/40*Math.PI*2,rr2=r*(1+.05*Math.sin(i*2.7));c.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2)}c.closePath();const gg=c.createRadialGradient(-60,-80,20,0,0,r*1.1);gg.addColorStop(0,mixHex(p.ac,'#ffffff',.25));gg.addColorStop(1,mixHex(p.ac,'#000000',.35));c.fillStyle=gg;c.fill();
      c.strokeStyle=rgba('#000000',.25);c.lineWidth=6;c.beginPath();c.arc(0,0,r*.72,0,7);c.stroke();T(c,init,0,10,{font:IS,size:250,align:'center',base:'middle',color:rgba('#ffffff',.85)});c.restore()}
    c.restore();if(press>.6&&press<1)flash(c,W,H,(1-press)*.25)}
  T(c,x.brand,W/2,1430,{font:IS,size:78,align:'center',color:p.fg,ls:4,upper:1,maxW:W-180,maxLines:1,p:P(t,1.2,.8),alpha:1-brk*.0});
  if(brk>.5){T(c,x.headline,W/2,1540,{font:IS,italic:1,size:56,align:'center',color:'#fff',maxW:W-200,maxLines:2,p:P(t,3.6,.8)});if(x.cta)mono(c,x.cta,W/2,1640,{align:'center',color:'#fff',size:22,ls:6,p:P(t,4.4,.6)})}
  if(t>8.6)outro(c,S,t,8.6,{bg:p.bg,fg:p.fg,acc:p.ac})}});

KC({id:'kc-viewing',name:'Private Viewing',fam:'Maison',desc:'A slow dolly along a gallery wall of framed pieces under picture lights, settling on the hero with a placard.',pal:{bg:'#2A2622',fg:'#F4EDE2',ac:'#C9A96E'},dur:11,pt:6.8,hold:[1.5,7],tags:['Luxury','Gallery'],
 r(c,t,S){const{W,H,p,x}=S;const wall=c.createLinearGradient(0,0,0,H);wall.addColorStop(0,mixHex(p.bg,'#000000',.3));wall.addColorStop(.75,p.bg);wall.addColorStop(.75,mixHex(p.bg,'#000000',.5));wall.addColorStop(1,'#000');c.fillStyle=wall;c.fillRect(0,0,W,H);
  const n=3,gap=760,pan=-gap*(n-1)*E.inOut(P(t,.6,6.4)),zoom=1+.35*E.inOut(P(t,7.2,1.4));
  c.save();c.translate(W/2,860);c.scale(zoom,zoom);c.translate(-W/2,-860);
  for(let i=0;i<n;i++){const cx=W/2+i*gap+pan,cy=860,fw=520,fh=700;if(cx<-500||cx>W+500)continue;
    const L=c.createRadialGradient(cx,cy-420,10,cx,cy-100,620);L.addColorStop(0,'rgba(255,236,200,.42)');L.addColorStop(1,'rgba(255,236,200,0)');c.fillStyle=L;c.fillRect(cx-700,cy-800,1400,1500);
    c.fillStyle='#000';c.fillRect(cx-10,cy-fh/2-150,20,40);c.fillStyle=p.ac;c.fillRect(cx-90,cy-fh/2-118,180,14);
    c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=50;c.shadowOffsetY=24;c.fillStyle=p.ac;c.fillRect(cx-fw/2-30,cy-fh/2-30,fw+60,fh+60);c.shadowColor='transparent';c.fillStyle='#F4EFE6';c.fillRect(cx-fw/2-14,cy-fh/2-14,fw+28,fh+28);
    cover(c,S.m(i),cx-fw/2,cy-fh/2,fw,fh,{z:1.04});
    if(zoom<1.02){c.fillStyle='#F4EFE6';c.fillRect(cx+fw/2-170,cy+fh/2+70,170,90);mono(c,`No. ${i+1}`,cx+fw/2-155,cy+fh/2+108,{color:'#2a2622',size:18});T(c,[x.f1,x.f2,x.f3][i]||x.brand,cx+fw/2-155,cy+fh/2+142,{font:IS,size:24,color:'#2a2622',maxW:140,maxLines:1})}}
  c.restore();
  mono(c,'Private viewing',W/2,250,{align:'center',color:rgba(p.fg,.8),size:22,ls:8,p:P(t,.2,.8)});
  T(c,x.brand,W/2,330,{font:IS,size:64,align:'center',color:p.fg,p:P(t,.4,.8),maxW:W-200,maxLines:1});
  if(t>7.4){T(c,x.headline,W/2,1520,{font:IS,italic:1,size:64,align:'center',color:p.fg,maxW:W-200,maxLines:2,p:P(t,7.6,.8)});if(x.cta)pill(c,x.cta,W/2,1660,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,8.2,.5)),alpha:P(t,8.2,.2),size:28})}}});

KC({id:'kc-noir',name:'Noir to Colour',fam:'Maison',desc:'Starts in grainy black-and-white with a serif title card; colour floods in from the centre on the reveal.',pal:{bg:'#0A0A0A',fg:'#FFFFFF',ac:'#E9D5A8'},dur:9,pt:5.6,hold:[1,5.5],grain:.08,tags:['Cinematic','Colour'],
 r(c,t,S){const{W,H,p,x}=S;const col=E.inOut(P(t,3.6,1.4));
  cover(c,S.m(0),0,0,W,H,{z:kb(t,9,1.18,1.04),filter:'grayscale(1) contrast(1.25) brightness(.9)'});
  if(col>0){c.save();c.beginPath();c.arc(W/2,H*.45,Math.hypot(W,H)*col,0,7);c.clip();cover(c,S.m(0),0,0,W,H,{z:kb(t,9,1.18,1.04),filter:'contrast(1.06) saturate(1.1)'});c.restore()}
  vignette(c,W,H,.55);
  if(col<1){c.save();c.globalAlpha=1-col;c.fillStyle='rgba(0,0,0,.35)';c.fillRect(0,0,W,H);
    T(c,x.brand,W/2,H/2-40,{font:IS,size:fit(c,x.brand||'',IS,400,W-200,150),align:'center',base:'middle',color:'#fff',p:P(t,.4,1),rise:0});
    hair(c,W/2-120,H/2+60,W/2+120,H/2+60,'#fff',2,E.outExpo(P(t,1,.9)));mono(c,x.label||'A film',W/2,H/2+120,{align:'center',size:22,ls:8,p:P(t,1.3,.8)});c.restore()}
  if(col>.4){scrimB(c,W,H,.8,.45);kin(c,x.headline,80,1450,{t,t0:4.6,font:IS,size:90,maxW:900,maxLines:2,color:'#fff',anchor:'bottom'});
    if(x.cta)mono(c,x.cta+'  →',80,1560,{color:p.ac,size:24,p:P(t,5.4,.6)})}
  if(t>7.6)outro(c,S,t,7.6,{bg:'#0A0A0A',fg:'#fff',font:IS,acc:p.ac,photo:1})}});

/* ================= FAMILY 3 · PRODUCT FILM ================= */
KC({id:'kc-spec',name:'Hero Spec',fam:'Product film',desc:'Product on a clean stage; hairline callouts draw out to three specs, the price lands, studio calm.',pal:{bg:'#F2F2F0',fg:'#111113',ac:'#111113'},tone:'light',dur:10,pt:4.8,hold:[2,7],tags:['Product','Specs'],
 r(c,t,S){const{W,H,p,x}=S;const bg=c.createRadialGradient(W/2,820,50,W/2,900,1100);bg.addColorStop(0,mixHex(p.bg,'#ffffff',.6));bg.addColorStop(1,p.bg);c.fillStyle=bg;c.fillRect(0,0,W,H);
  const s=.86+.14*E.outExpo(P(t,.1,1.4));const r=card(c,S.m(0),W/2,850,780,1000,{s,alpha:E.out(P(t,.1,.6)),border:0,z:1.02});
  c.save();c.globalAlpha=.18*E.out(P(t,.3,.8));c.fillStyle='#000';c.beginPath();c.ellipse(W/2,1370,320,26,0,0,7);c.filter='blur(18px)';c.fill();c.restore();c.filter='none';
  T(c,x.brand,W/2,290,{font:IT,weight:600,size:30,ls:8,upper:1,align:'center',color:p.fg,p:P(t,.3,.6)});
  const fs=feats(x).length?feats(x):['Thoughtfully made','Built to last','Limited release'];
  const pts=[[.3,.32,'L',420],[.72,.52,'R',700],[.36,.74,'L',980]];
  fs.slice(0,3).forEach((f,i)=>{const[fx,fy,side,ly]=pts[i];const t0=2+i*.7,a=E.outExpo(P(t,t0,.8));if(a<=0)return;const px=r?r.x+r.w*fx:W/2,py=r?r.y+r.h*fy:840,ex=side==='L'?70:W-70;
    c.save();c.fillStyle=p.fg;c.beginPath();c.arc(px,py,7*a,0,7);c.fill();c.restore();hair(c,px,py,px+(ex-px)*.4,ly,p.fg,2,a);hair(c,px+(ex-px)*.4,ly,ex,ly,p.fg,2,P(t,t0+.4,.5));
    T(c,f,ex,ly-18,{font:IT,weight:600,size:30,align:side==='L'?'left':'right',color:p.fg,maxW:300,maxLines:2,anchor:'bottom',p:P(t,t0+.5,.5)})});
  T(c,x.headline,W/2,1500,{font:IT,weight:700,size:64,ls:-1,align:'center',color:p.fg,maxW:W-160,maxLines:2,anchor:'bottom',p:P(t,4.4,.7)});
  if(x.price){T(c,x.price,W/2,1590,{font:IT,weight:500,size:40,align:'center',color:rgba(p.fg,.7),p:P(t,5,.6)})}
  if(t>8.4)outro(c,S,t,8.4,{bg:p.bg,fg:p.fg,font:IT,size:96,acc:p.fg})}});

KC({id:'kc-mask',name:'Type Mask',fam:'Product film',desc:'One giant word fills the screen with the product inside the letters, then the letters open into the full shot.',pal:{bg:'#0E0E10',fg:'#FFFFFF',ac:'#B9FA70'},dur:9,pt:1.6,hold:[.8,5],tags:['Product','Typography'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const word=String((x.headline||x.brand||'NEW').split(/\s+/)[0]).toUpperCase().slice(0,10);const open=E.inOut(P(t,2.6,1.4));
  const size=fit(c,word,AN,400,W-60,720,0);
  if(!this._b)this._b=document.createElement('canvas');const b=this._b;b.width=W;b.height=H;const g=b.getContext('2d');g.clearRect(0,0,W,H);
  cover(g,S.m(0),0,0,W,H,{z:kb(t,9,1.25,1.02)});g.globalCompositeOperation='destination-in';g.fillStyle='#000';g.font=`400 ${size*(1+open*5)}px ${AN}`;g.textAlign='center';g.textBaseline='middle';
  if(open<.98)g.fillText(word,W/2,H/2-40);else g.fillRect(0,0,W,H);g.globalCompositeOperation='source-over';
  c.globalAlpha=E.out(P(t,.1,.6));c.drawImage(b,0,0);c.globalAlpha=1;
  if(open<.6){mono(c,x.brand,W/2,H/2-40-size*.62,{align:'center',size:24,ls:10,color:'#fff',p:P(t,.6,.6),alpha:1-open*1.6});mono(c,x.label||'Introducing',W/2,H/2-40+size*.62,{align:'center',size:22,ls:8,color:p.ac,p:P(t,.8,.6),alpha:1-open*1.6})}
  if(open>.5){scrimB(c,W,H,.8,.45);kin(c,x.headline,80,1460,{t,t0:3.8,font:IT,weight:700,size:88,ls:-2,maxW:900,maxLines:2,color:'#fff',anchor:'bottom'});
    T(c,x.sub,80,1540,{font:IT,size:32,color:'rgba(255,255,255,.8)',maxW:900,maxLines:2,p:P(t,4.5,.6)});if(x.cta)pill(c,x.cta,W/2,1680,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,5,.5)),alpha:P(t,5,.2),size:28})}
  if(t>7.6)outro(c,S,t,7.6,{bg:p.bg,fg:'#fff',font:IT,size:96,acc:p.ac})}});

KC({id:'kc-turn',name:'Turntable',fam:'Product film',desc:'Product cards rotate on a polished stage with a soft floor reflection, each turn revealing the next angle.',pal:{bg:'#E9E7E2',fg:'#141414',ac:'#141414'},tone:'light',dur:10,pt:1.2,hold:[1,7],tags:['Product','3D'],
 r(c,t,S){const{W,H,p,x}=S;const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,mixHex(p.bg,'#ffffff',.5));bg.addColorStop(.7,p.bg);bg.addColorStop(.7,mixHex(p.bg,'#000000',.04));bg.addColorStop(1,mixHex(p.bg,'#ffffff',.2));c.fillStyle=bg;c.fillRect(0,0,W,H);
  const n=Math.max(2,Math.min(4,S.n)),seg=1.8,k=Math.floor(Math.max(0,t-.6)/seg),lt=Math.max(0,t-.6)-k*seg,rot=E.inOut(clamp((lt-1.2)/.6)),phase=rot<.5?1-rot*2:(rot-.5)*2,idx=(rot<.5?k:k+1)%n;
  const cw=620,ch=820,cx=W/2,cy=860,sx=Math.max(.02,phase);
  const draw=(flip)=>{c.save();c.translate(cx,flip?cy+ch+20:cy);c.scale(sx,flip?-1:1);c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=flip?0:60;c.shadowOffsetY=flip?0:30;c.fillStyle='#fff';c.fillRect(-cw/2,-ch/2,cw,ch);c.shadowColor='transparent';cover(c,S.m(idx),-cw/2+12,-ch/2+12,cw-24,ch-24,{z:1.03});c.restore()};
  c.save();c.globalAlpha=.18;draw(true);c.restore();const fl=c.createLinearGradient(0,cy+ch/2,0,cy+ch/2+260);fl.addColorStop(0,rgba(mixHex(p.bg,'#ffffff',.2),.55));fl.addColorStop(1,rgba(mixHex(p.bg,'#ffffff',.2),1));c.fillStyle=fl;c.fillRect(0,cy+ch/2+10,W,H);
  c.globalAlpha=E.out(P(t,0,.6));draw(false);c.globalAlpha=1;
  T(c,x.brand,W/2,280,{font:IT,weight:600,size:30,ls:8,upper:1,align:'center',color:p.fg,p:P(t,.2,.6)});
  T(c,x.headline,W/2,1440,{font:IT,weight:700,size:62,ls:-1,align:'center',color:p.fg,maxW:W-200,maxLines:2,p:P(t,.8,.7)});
  mono(c,`${String(idx+1).padStart(2,'0')} / ${String(n).padStart(2,'0')}`,W/2,1640,{align:'center',color:rgba(p.fg,.6),size:22});
  if(t>8.4)outro(c,S,t,8.4,{bg:p.bg,fg:p.fg,font:IT,size:96,acc:p.fg})}});

KC({id:'kc-grid',name:'Split Focus',fam:'Product film',desc:'The frame splits into a precise grid of angles that shuffle on the beat, then merge into one hero image.',pal:{bg:'#101012',fg:'#FFFFFF',ac:'#B9FA70'},dur:9,pt:2.4,hold:[1,5.5],tags:['Product','Grid'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const merge=E.inOut(P(t,5.6,1.1)),g=14;
  const lay=[[[0,0,1,.5],[0,.5,.5,.5],[.5,.5,.5,.5]],[[0,0,.5,.5],[.5,0,.5,.5],[0,.5,1,.5]],[[0,0,.5,1],[.5,0,.5,.5],[.5,.5,.5,.5]]];const k=Math.min(2,Math.floor(t/1.6)),A=lay[k],B=lay[Math.min(2,k+1)],mv=E.inOut(clamp((t-k*1.6-1.2)/.4));
  const top=240,hh=1320;
  A.forEach((a,i)=>{const b=k<2?B[i]:a;const r=a.map((v,j)=>v+(b[j]-v)*mv);let X=r[0]*W+g,Y=top+r[1]*hh+g,Wd=r[2]*W-2*g,Hd=r[3]*hh-2*g;
    X+=(0-X)*merge;Y+=(0-Y)*merge;Wd+=(W-Wd)*merge;Hd+=(H-Hd)*merge;const ap=E.outExpo(P(t,i*.12,.7));c.save();c.globalAlpha=merge>0&&i>0?1-merge:ap;clip(c,X,Y,Wd,Hd);cover(c,S.m(merge>.5?0:i),X,Y,Wd,Hd,{z:1.12-.06*mv});c.restore()});
  T(c,x.brand,80,190,{font:IT,weight:700,size:34,ls:2,upper:1,color:'#fff',p:P(t,.2,.6),alpha:1-merge,maxW:600,maxLines:1});mono(c,x.label||'Collection',W-80,190,{align:'right',color:p.ac,size:22,p:P(t,.3,.6),alpha:1-merge});
  T(c,feats(x)[k]||x.headline,80,1650,{font:IT,weight:600,size:44,color:'#fff',maxW:900,maxLines:1,p:clamp((t-k*1.6)/.4),alpha:1-merge});
  if(merge>0){c.save();c.globalAlpha=merge;scrimB(c,W,H,.82,.42);c.restore();kin(c,x.headline,80,1460,{t,t0:6.2,font:IT,weight:700,size:90,ls:-2,maxW:900,maxLines:2,color:'#fff',anchor:'bottom'});if(x.cta)pill(c,x.cta,W/2,1620,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,6.8,.5)),alpha:P(t,6.8,.2),size:28})}}});

KC({id:'kc-launch',name:'Countdown Launch',fam:'Product film',desc:'Three, two, one in ultra-light numerals on black; a ring closes, the product snaps into light with the launch line.',pal:{bg:'#000000',fg:'#FFFFFF',ac:'#B9FA70'},dur:9,pt:5.2,hold:[3.6,6.5],tags:['Launch','Countdown'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);
  if(t<3.3){const k=Math.min(2,Math.floor(t/1.1)),lt=t-k*1.1;const ring=clamp(lt/1.05);c.save();c.strokeStyle=rgba(p.fg,.18);c.lineWidth=3;c.beginPath();c.arc(W/2,H/2,330,0,7);c.stroke();c.strokeStyle=p.ac;c.lineWidth=5;c.beginPath();c.arc(W/2,H/2,330,-Math.PI/2,-Math.PI/2+ring*Math.PI*2);c.stroke();c.restore();
    const s=1.15-.15*E.outExpo(clamp(lt/.4));c.save();c.translate(W/2,H/2);c.scale(s,s);T(c,String(3-k),0,10,{font:IT,weight:200,size:380,align:'center',base:'middle',color:p.fg,alpha:E.out(clamp(lt/.2))*(1-clamp((lt-.85)/.25))});c.restore();
    mono(c,x.label||'Launching',W/2,H/2+420,{align:'center',color:rgba(p.fg,.7),size:22,ls:8});mono(c,x.brand,W/2,H/2-420,{align:'center',color:rgba(p.fg,.7),size:22,ls:8})}
  else{const lt=t-3.3;cover(c,S.m(0),0,0,W,H,{z:1.25-.2*E.outExpo(clamp(lt/1.2))});flash(c,W,H,.9*(1-clamp(lt/.35)));scrimB(c,W,H,.85,.4);scrimT(c,W,H,.45,.25);
    mono(c,'Now available',80,1240,{color:p.ac,size:24,p:P(lt,.6,.5)});kin(c,x.headline,80,1330,{t:lt,t0:.7,font:IT,weight:700,size:100,ls:-3,maxW:900,maxLines:2,color:'#fff'});
    T(c,x.price,80,1580,{font:IT,weight:500,size:44,color:'#fff',p:P(lt,1.4,.6)});if(x.cta)pill(c,x.cta,W-80-180,1566,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(lt,1.6,.5)),alpha:P(lt,1.6,.2),size:26});brandMark(c,S,W/2,300,{size:44,color:'#fff',alpha:P(lt,.4,.6)})}}});

/* ================= FAMILY 4 · KINETIC ================= */
KC({id:'kc-beat',name:'Beat Cuts',fam:'Kinetic',desc:'Hard cuts every half-second across your shots, one bold word per cut, flash rules — built for trending audio.',pal:{bg:'#0C0C0C',fg:'#FFFFFF',ac:'#FF4D2E'},dur:8,pt:1.3,hold:[.5,5.5],tags:['Kinetic','Beat'],
 r(c,t,S){const{W,H,p,x}=S;const words=String([x.headline,...feats(x)].filter(Boolean).join(' ')||x.brand).split(/\s+/).filter(Boolean).slice(0,9);const bt=.5,k=Math.floor(t/bt),lt=t-k*bt,end=words.length*bt+.3;
  if(t<end){cover(c,S.m(k),0,0,W,H,{z:1.22-.12*E.outExpo(clamp(lt/bt)),fx:[.5,.3,.7,.5][k%4],fy:[.4,.3,.6,.5][k%4],filter:k%3===2?'grayscale(1) contrast(1.3)':'contrast(1.1) saturate(1.15)'});c.fillStyle='rgba(0,0,0,.28)';c.fillRect(0,0,W,H);
    flash(c,W,H,.55*(1-clamp(lt/.1)));const w=(words[k]||'').toUpperCase();const sz=fit(c,w,AN,400,W-120,360,0);const sc=1.25-.25*E.outExpo(clamp(lt/.22));
    c.save();c.translate(W/2,H/2);c.scale(sc,sc);T(c,w,0,0,{font:AN,size:sz,align:'center',base:'middle',color:k%4===3?p.ac:'#fff'});c.restore();
    c.fillStyle=p.ac;c.fillRect(0,H/2+sz*.55,W*E.outExpo(clamp(lt/.3)),10);mono(c,`${String(k+1).padStart(2,'0')}/${String(words.length).padStart(2,'0')}`,80,300,{size:22});mono(c,x.brand,W-80,300,{align:'right',size:22})}
  else{const lt=t-end;cover(c,S.m(0),0,0,W,H,{z:kb(lt,3,1.12,1.02)});scrimB(c,W,H,.85,.4);T(c,x.brand,W/2,1300,{font:AN,size:150,align:'center',upper:1,color:'#fff',maxW:W-120,maxLines:1,p:P(lt,0,.4)});
    if(x.cta)pill(c,x.cta,W/2,1480,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(lt,.4,.5)),alpha:P(lt,.4,.2),size:30});mono(c,x.handle,W/2,1580,{align:'center',upper:0,size:22,p:P(lt,.6,.5)})}}});

KC({id:'kc-outline',name:'Outline Marquee',fam:'Kinetic',desc:'Rows of outlined type scroll in opposite directions behind a floating product card; the solid headline locks in front.',pal:{bg:'#F0EEE9',fg:'#111113',ac:'#111113'},tone:'light',dur:9,pt:3.4,hold:[1,6],tags:['Kinetic','Type'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const word=String(x.brand||'').toUpperCase()+' • ';
  for(let r=0;r<9;r++){const y=160+r*205,dir=r%2?1:-1,off=((t*120*dir)%1600+1600)%1600;c.save();c.font=`400 190px ${AN}`;const w=Math.max(200,c.measureText(word).width);c.restore();
    for(let k=-2;k<6;k++)T(c,word,k*w-off+(r%2?0:w/2),y,{font:AN,size:190,color:p.fg,stroke:2,alpha:.22+(r===4?.3:0)})}
  const s=E.outBack(P(t,.3,.9)),bob=Math.sin(t*1.6)*12;c.save();c.translate(W/2,860+bob);c.rotate(-.03+Math.sin(t*.8)*.015);c.scale(s,s);c.shadowColor='rgba(0,0,0,.28)';c.shadowBlur=60;c.shadowOffsetY=30;c.fillStyle='#fff';c.fillRect(-300,-400,600,800);c.shadowColor='transparent';cover(c,S.m(Math.floor(t/2.2)%Math.max(1,S.n)),-286,-386,572,772,{z:1.04});c.restore();
  c.fillStyle=p.bg;c.fillRect(0,1330,W,360);kin(c,x.headline,W/2,1420,{t,t0:1.4,font:AN,size:120,maxW:W-140,maxLines:2,color:p.fg,align:'center',upper:1});
  if(x.cta)mono(c,x.cta+'  ↗',W/2,1640,{align:'center',color:p.fg,size:26,p:P(t,2.4,.6)})}});

KC({id:'kc-stack',name:'Stacked Type',fam:'Kinetic',desc:'The headline stacks word by word in alternating solid and outline, photos slide between the lines like a poster being built.',pal:{bg:'#1B1B1B',fg:'#F7F5F0',ac:'#F2C94C'},dur:9,pt:4.6,hold:[1.5,6.5],tags:['Kinetic','Poster'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const raw=String(x.headline||x.brand||'').toUpperCase().split(/\s+/).filter(Boolean);const words=[];if(raw.length<=5)words.push(...raw);else{c.save();c.font=`400 150px ${AN}`;let l='';for(const w of raw){const tt=l?l+' '+w:w;if(c.measureText(tt).width>W-160&&l){words.push(l);l=w}else l=tt}if(l)words.push(l);c.restore()}
  while(words.length>5){const i=words.length-2;words.splice(i,2,words[i]+' '+words[i+1])}let y=words.length>3?360:420;
  const cap=words.length>4?150:words.length>3?170:210;words.forEach((w,i)=>{const a=E.outExpo(P(t,.3+i*.45,.6)),sz=Math.min(cap,fit(c,w,AN,400,W-160,cap,0));const dx=(1-a)*(i%2?W:-W);
    T(c,w,80+dx,y+sz*.82,{font:AN,size:sz,color:i===1?p.ac:p.fg,stroke:i%2?3:0});y+=sz*.92;
    if(i===0||i===2){const ph=E.inOut(P(t,.6+i*.45,.7)),hh=200*ph;if(hh>1){c.save();clip(c,80,y+8,W-160,hh);cover(c,S.m(i/2),80,y+8,W-160,200,{z:1.15,fy:[.35,.55][i/2]});c.restore()}y+=200+16}});y=Math.min(y,1560);
  hair(c,80,Math.min(y+30,1560),W-80,Math.min(y+30,1560),rgba(p.fg,.4),2,E.outExpo(P(t,2.8,.8)));
  mono(c,x.brand,80,Math.min(y+80,1610),{color:p.fg,size:22,p:P(t,3,.6),maxW:500});mono(c,x.cta,W-80,Math.min(y+80,1610),{align:'right',color:p.ac,size:22,p:P(t,3.2,.6),maxW:440});
  if(t>7.6)outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.ac})}});

KC({id:'kc-zoom',name:'Zoom Through',fam:'Kinetic',desc:'Each shot rushes forward and the next appears inside it — a continuous push through your product story.',pal:{bg:'#000000',fg:'#FFFFFF',ac:'#7CF2D6'},dur:8,pt:2.2,hold:[1,5.5],tags:['Kinetic','Transition'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle='#000';c.fillRect(0,0,W,H);const seg=1.5,k=Math.floor(t/seg),lt=(t-k*seg)/seg,cut=E.inOut(clamp((lt-.65)/.35));
  cover(c,S.m(k),0,0,W,H,{z:1.05+.3*lt+3*cut*cut,filter:`blur(${cut*10}px)`});
  if(cut>0){const s=.18+.82*cut,ww=W*s,hh=H*s;c.save();c.globalAlpha=Math.min(1,cut*2);clip(c,W/2-ww/2,H/2-hh/2,ww,hh);cover(c,S.m(k+1),W/2-ww/2,H/2-hh/2,ww,hh,{z:1.05});c.restore()}
  scrimB(c,W,H,.8,.45);const L=[x.headline,...feats(x),x.cta].filter(Boolean);const ln=L[k%L.length]||'';
  T(c,ln,80,1500,{font:IT,weight:700,size:86,ls:-2,color:'#fff',maxW:900,maxLines:2,anchor:'bottom',p:clamp(lt*4),alpha:1-cut});
  mono(c,x.brand,80,300,{size:22,color:'#fff'});c.fillStyle=p.ac;c.fillRect(80,320,(W-160)*((t%seg)/seg),3)}});

KC({id:'kc-ticker',name:'Ticker Tape',fam:'Kinetic',desc:'Diagonal ticker bands with your brand and offer cross the photo like event tape; the bands lift away to the hero line.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#B9FA70'},dur:8,pt:2.2,hold:[1,5],tags:['Kinetic','Offer'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,8,1.15,1.03)});c.fillStyle='rgba(0,0,0,.2)';c.fillRect(0,0,W,H);const lift=E.inOut(P(t,4.6,.9));
  const band=(ang,y,col,txt,dir,i)=>{c.save();c.translate(W/2,y-lift*1400*(i%2?-1:1));c.rotate(ang);c.fillStyle=col;c.fillRect(-W,-62,W*2,124);c.font=`400 76px ${AN}`;const seg=(txt+'  ✦  ').toUpperCase(),w=c.measureText(seg).width;const off=((t*260*dir)%w+w)%w;
    for(let k=-4;k<6;k++)T(c,seg,-W+k*w-off,26,{font:AN,size:76,color:ink(col)});c.restore()};
  const s1=[x.brand,x.label].filter(Boolean).join('  ✦  '),s2=[x.headline,x.price].filter(Boolean).join('  ✦  ');
  const inA=E.outExpo(P(t,.1,.7));c.save();c.globalAlpha=inA;band(-.18,640,p.ac,s1||'New',1,0);band(.14,1020,'#ffffff',s2||'Now',-1,1);band(-.08,1380,p.bg,s1||'New',1,2);c.restore();
  if(lift>0){c.save();c.globalAlpha=lift;scrimB(c,W,H,.82,.42);c.restore();kin(c,x.headline,80,1450,{t,t0:5.1,font:AN,size:130,maxW:900,maxLines:2,color:'#fff',anchor:'bottom',upper:1});if(x.cta)pill(c,x.cta,W/2,1610,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,5.8,.5)),alpha:P(t,5.8,.2),size:28})}}});

/* ================= FAMILY 5 · LIFESTYLE ================= */
KC({id:'kc-polaroid',name:'Moments',fam:'Lifestyle',desc:'Instant photos drop onto a linen table one by one with soft shadows and handwritten-style captions.',pal:{bg:'#E8E1D6',fg:'#2C2722',ac:'#B4553A'},tone:'light',dur:10,pt:4.6,hold:[1.5,6.5],tags:['Lifestyle','Memories'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.globalAlpha=.07;for(let i=0;i<H;i+=6){c.fillStyle=i%12?'#fff':'#000';c.fillRect(0,i,W,2)}c.restore();
  const caps=[x.f1,x.f2,x.f3,x.headline].filter(Boolean);const pos=[[.38,.3,-.09],[.63,.42,.07],[.42,.55,-.03],[.6,.34,.04]];const n=Math.max(3,Math.min(4,S.n||3));
  for(let i=0;i<n;i++){const t0=.3+i*1,a=P(t,t0,.7);if(a<=0)continue;const e=E.outBack(a),[fx,fy,rot]=pos[i];const cx=W*fx,cy=H*fy-(1-e)*200,s=(1.35-.35*e)*.88;
    c.save();c.translate(cx,cy);c.rotate(rot+(1-e)*.25);c.scale(s,s);c.globalAlpha=Math.min(1,a*3);c.shadowColor='rgba(40,30,20,.28)';c.shadowBlur=40;c.shadowOffsetY=20;c.fillStyle='#FBF9F4';c.fillRect(-250,-290,500,600);c.shadowColor='transparent';
    cover(c,S.m(i),-222,-262,444,444,{z:1.05,filter:'contrast(1.02) saturate(.92) sepia(.08)'});T(c,caps[i%Math.max(1,caps.length)]||x.brand,0,250,{font:IS,italic:1,size:40,align:'center',color:'#3a332c',maxW:430,maxLines:1});c.restore()}
  T(c,x.brand,W/2,290,{font:IS,size:64,align:'center',color:p.fg,p:P(t,.1,.6),maxW:W-200,maxLines:1});
  if(t>4.8){c.fillStyle=rgba(p.bg,.0);kin(c,x.sub||x.headline,W/2,1470,{t,t0:5,font:IS,italic:1,size:62,maxW:W-180,maxLines:2,color:p.fg,align:'center'})}
  if(t>8.6)outro(c,S,t,8.6,{bg:p.bg,fg:p.fg,acc:p.ac})}});

KC({id:'kc-journal',name:'The Journal',fam:'Lifestyle',desc:'A notebook page: a photo is taped in, the note writes itself line by line, a pressed-flower calm.',pal:{bg:'#F3EEE4',fg:'#2D2A26',ac:'#7A8F6A'},tone:'light',dur:10,pt:5.4,hold:[2,7],tags:['Lifestyle','Story'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.strokeStyle=rgba(p.ac,.22);c.lineWidth=2;for(let y=260;y<H-120;y+=64){c.beginPath();c.moveTo(70,y);c.lineTo(W-70,y);c.stroke()}c.strokeStyle=rgba('#C0392B',.3);c.beginPath();c.moveTo(150,120);c.lineTo(150,H-120);c.stroke();
  mono(c,new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long'}),W-80,200,{align:'right',upper:0,color:rgba(p.fg,.6),size:24,p:P(t,.1,.6)});
  const a=E.outBack(P(t,.3,.8));c.save();c.translate(W/2+30,680);c.rotate(-.035);c.scale(.9+.1*a,.9+.1*a);c.globalAlpha=Math.min(1,a*2);c.shadowColor='rgba(0,0,0,.18)';c.shadowBlur=30;c.shadowOffsetY=12;c.fillStyle='#fff';c.fillRect(-350,-340,700,680);c.shadowColor='transparent';cover(c,S.m(0),-330,-320,660,640,{z:1.05});c.restore();
  const tape=(x0,y0,r)=>{c.save();c.translate(x0,y0);c.rotate(r);c.fillStyle='rgba(232,220,190,.8)';c.fillRect(-80,-22,160,44);c.restore()};if(a>.6){tape(W/2-270,345,-.4);tape(W/2+330,350,.35)}
  const note=[x.headline,x.sub].filter(Boolean).join(' — ')||x.brand;const lines2=(()=>{c.font=`italic 400 58px ${IS}`;const L=[];let l='';String(note).split(' ').forEach(w=>{if(c.measureText(l+' '+w).width>W-280&&l){L.push(l);l=w}else l=l?l+' '+w:w});L.push(l);return L.slice(0,5)})();
  const tot=lines2.join('').length;let shown=Math.floor(tot*clamp((t-1.4)/3));lines2.forEach((l,i)=>{const s=l.slice(0,Math.max(0,shown));shown-=l.length;T(c,s,190,1136+i*64,{font:IS,italic:1,size:56,color:p.fg})});
  T(c,'— '+(x.brand||''),W-90,1136+Math.max(lines2.length,2)*64+40,{font:IS,italic:1,size:44,align:'right',color:p.ac,p:P(t,4.6,.6),maxW:600,maxLines:1});
  if(t>8.6)outro(c,S,t,8.6,{bg:p.bg,fg:p.fg,acc:p.ac})}});

KC({id:'kc-sunday',name:'Slow Sunday',fam:'Lifestyle',desc:'Long, warm cross-dissolves with drifting light and a single quiet line of text — the calm-scroll reel.',pal:{bg:'#F2E9DC',fg:'#FFFFFF',ac:'#F2E9DC'},dur:12,pt:3,hold:[2,9],grain:.05,tags:['Lifestyle','Calm'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;const n=Math.max(1,Math.min(4,S.n)),seg=3.2,k=Math.floor(t/seg),lt=t-k*seg;
  cover(c,S.m(k),0,0,W,H,{z:1.08+.06*(lt/seg),px:(k%2?-1:1)*(lt/seg-.5)*40,filter:'contrast(1.02) saturate(.95) sepia(.12) brightness(1.03)'});
  if(lt<1.2&&k>0){c.save();c.globalAlpha=1-E.inOut(lt/1.2);cover(c,S.m(k-1),0,0,W,H,{z:1.14,filter:'contrast(1.02) saturate(.95) sepia(.12) brightness(1.03)'});c.restore()}
  c.save();c.globalCompositeOperation='screen';const L=c.createRadialGradient(W*(.2+.1*Math.sin(t*.3)),H*.2,20,W*.3,H*.3,900);L.addColorStop(0,'rgba(255,214,160,.35)');L.addColorStop(1,'rgba(255,214,160,0)');c.fillStyle=L;c.fillRect(0,0,W,H);c.restore();
  scrimT(c,W,H,.55,.32);scrimB(c,W,H,.4,.75);
  const lines=[x.sub||x.headline,x.headline,x.f1,x.cta].filter(Boolean);const line=lines[k%lines.length]||'';
  T(c,line,W/2,360,{font:IS,italic:1,size:58,align:'center',color:'#fff',maxW:W-200,maxLines:2,alpha:E.out(clamp((lt-.6)/.8))*(1-clamp((lt-seg+.6)/.5)),shadow:'rgba(0,0,0,.35)',sb:20});
  mono(c,x.brand,W/2,1580,{align:'center',size:22,ls:8,color:'#fff'})}});

KC({id:'kc-palette',name:'Colour Story',fam:'Lifestyle',desc:'Kathavi reads the colours in your photo and lays them out as named swatches, then the photo blooms from the swatch strip.',pal:{bg:'#FAF8F4',fg:'#1C1B19',ac:'#1C1B19'},tone:'light',dur:10,pt:3,hold:[2,6.5],tags:['Lifestyle','Colour'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const m=S.m(0),sw=swatches(m),bloom=E.inOut(P(t,4.6,1.4));
  T(c,'Colour story',80,300,{font:IS,italic:1,size:72,color:p.fg,p:P(t,.1,.7)});mono(c,x.brand,80,350,{color:rgba(p.fg,.6),size:22,p:P(t,.3,.6)});
  const top=480,h=840,cw=(W-160)/sw.length;
  sw.forEach((col,i)=>{const a=E.outExpo(P(t,.6+i*.25,.8));const hh=h*a;c.fillStyle=col;c.fillRect(80+i*cw,top+(h-hh),cw-12,hh);
    mono(c,col.toUpperCase(),80+i*cw,top+h+50,{size:20,color:p.fg,p:P(t,1+i*.25,.5),ls:1});T(c,[x.f1,x.f2,x.f3,x.label][i]||'',80+i*cw,top+h+92,{font:IS,size:32,color:rgba(p.fg,.75),maxW:cw-20,maxLines:1,p:P(t,1.1+i*.25,.5)})});
  if(bloom>0){const L=(a,b)=>a+(b-a)*bloom;c.save();clip(c,L(80,0),L(top,0),L(W-160,W),L(h,H));cover(c,m,0,0,W,H,{z:kb(t-4.6,4,1.12,1.02)});c.restore();c.save();c.globalAlpha=bloom;scrimB(c,W,H,.8,.45);c.restore();
    T(c,x.headline,80,1470,{font:IS,size:84,color:'#fff',maxW:900,maxLines:2,anchor:'bottom',p:P(t,5.6,.7)});if(x.cta)mono(c,x.cta,80,1560,{color:'#fff',size:24,p:P(t,6.2,.6)})}}});
const SW=new WeakMap();
function swatches(m){if(!m)return['#2B2B2B','#8C8279','#C9A96E','#F7F2EB'];const src=mediaSrc(m);if(SW.has(m)&&SW.get(m).src===src)return SW.get(m).c;try{const cv=document.createElement('canvas');cv.width=cv.height=32;const g=cv.getContext('2d',{willReadFrequently:true});g.drawImage(src,0,0,32,32);const d=g.getImageData(0,0,32,32).data,B={};
  for(let i=0;i<d.length;i+=4){const k=[d[i]>>5,d[i+1]>>5,d[i+2]>>5].join(',');(B[k]=B[k]||{n:0,r:0,g:0,b:0}).n++;B[k].r+=d[i];B[k].g+=d[i+1];B[k].b+=d[i+2]}
  const L=Object.values(B).sort((a,b)=>b.n-a.n).map(v=>rgb2hex(v.r/v.n,v.g/v.n,v.b/v.n)),out=[];for(const col of L){if(out.every(o=>{const a=hex2rgb(o),b=hex2rgb(col);return Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2])>60}))out.push(col);if(out.length===4)break}
  while(out.length<4)out.push(mixHex(out[0]||'#888888',out.length%2?'#ffffff':'#000000',.35));out.sort((a,b)=>lumOf(a)-lumOf(b));SW.set(m,{src,c:out});return out}catch(e){return['#2B2B2B','#8C8279','#C9A96E','#F7F2EB']}}

KC({id:'kc-review',name:'Love Note',fam:'Lifestyle',desc:'A five-star customer note slides up as a soft card over the product, stars fill one by one, then the call to action.',pal:{bg:'#FFF8F2',fg:'#2A2420',ac:'#E2A72E'},tone:'light',dur:9,pt:3.4,hold:[1.5,6],tags:['Lifestyle','Social proof'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,9,1.14,1.03)});scrimT(c,W,H,.75,.32);grad(c,W,H*.45,H*.55,'rgba(0,0,0,0)','rgba(0,0,0,.35)');
  const up=E.outExpo(P(t,.5,.9)),y0=900+(1-up)*900;c.save();c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=50;c.shadowOffsetY=20;c.fillStyle=p.bg;rr(c,70,y0,W-140,620,40);c.fill();c.restore();
  for(let i=0;i<5;i++){const a=E.outBack(P(t,1.3+i*.15,.4));c.save();c.translate(150+i*70,y0+110);c.scale(a,a);c.beginPath();for(let k=0;k<10;k++){const ang=-Math.PI/2+k*Math.PI/5,rad=k%2?12:28;c.lineTo(Math.cos(ang)*rad,Math.sin(ang)*rad)}c.closePath();c.fillStyle=p.ac;c.fill();c.restore()}
  T(c,'“'+(x.sub||'Exactly what I hoped for — and better in person.')+'”',130,y0+220,{font:IS,italic:1,size:54,color:p.fg,maxW:W-260,maxLines:4,p:P(t,2,.7),lh:1.15});
  mono(c,'Verified customer',130,y0+560,{color:rgba(p.fg,.6),size:20,p:P(t,2.8,.6)});T(c,x.brand,W-130,y0+564,{font:IS,size:36,align:'right',color:p.fg,maxW:420,maxLines:1,p:P(t,2.8,.6)});
  if(x.cta)pill(c,x.cta,W/2,1680,{bg:p.fg,fg:p.bg,s:E.outBack(P(t,3.6,.5)),alpha:P(t,3.6,.2),size:28});
  T(c,x.headline,W/2,310,{font:IS,size:80,align:'center',color:'#fff',maxW:W-180,maxLines:2,p:P(t,.2,.7),shadow:'rgba(0,0,0,.45)',sb:30})}});

/* ---------- library integration: Kathavi Collection leads the library ---------- */
const kc=TPL.filter(t=>t.kc);for(const t of kc)TPL.splice(TPL.indexOf(t),1);TPL.splice(0,0,...kc);
const fl=document.getElementById('filters');if(fl&&!fl.querySelector('[data-f=kc]')){const b=document.createElement('button');b.type='button';b.dataset.f='kc';b.setAttribute('aria-pressed','false');b.textContent='Kathavi Collection · '+kc.length;fl.prepend(b)}
const _b=buildGrid;buildGrid=function(){const f=state.filter;if(f==='kc'){const keep=TPL.slice();TPL.splice(0,TPL.length,...keep.filter(t=>t.kc));try{state.filter='reel';_b()}finally{TPL.splice(0,TPL.length,...keep);state.filter=f}}else _b()};
try{const n=TPL.length;document.querySelectorAll('.logo small,#paneT .ai p').forEach(el=>{el.textContent=el.textContent.replace(/\b1[2-9]\d\b/,String(n))})}catch(e){}
const _sc=scoreAll;scoreAll=function(){_sc();TPL.forEach(t=>{if(t.kc&&state.scores[t.id]!=null)state.scores[t.id]=Math.min(98,Math.round(state.scores[t.id]*.9+8))})};
window.KC_IDS=kc.map(t=>t.id);
})();
