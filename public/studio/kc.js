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
const mono=(c,s,x,y,o={})=>T(c,s,x,y,{font:PM,weight:500,size:o.size||24,ls:o.ls??3,upper:o.upper??1,color:o.color||'#fff',align:o.align,alpha:o.alpha,p:o.p,maxW:o.maxW,maxLines:o.maxLines??1,base:o.base});
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

KC({id:'kc-review',name:'Our Promise',fam:'Lifestyle',desc:'A soft note card slides up over the product carrying your brand’s promise, signed with your name, then the call to action.',pal:{bg:'#FFF8F2',fg:'#2A2420',ac:'#E2A72E'},tone:'light',dur:9,pt:3.4,hold:[1.5,6],tags:['Lifestyle','Social proof'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,9,1.14,1.03)});scrimT(c,W,H,.75,.32);grad(c,W,H*.45,H*.55,'rgba(0,0,0,0)','rgba(0,0,0,.35)');
  const up=E.outExpo(P(t,.5,.9)),y0=900+(1-up)*900;c.save();c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=50;c.shadowOffsetY=20;c.fillStyle=p.bg;rr(c,70,y0,W-140,620,40);c.fill();c.restore();
  mono(c,'Our promise',130,y0+110,{color:p.ac,size:22,p:P(t,1.3,.5)});hair(c,130,y0+140,290,y0+140,p.ac,3,E.outExpo(P(t,1.4,.6)));
  T(c,x.sub||x.headline||x.brand,130,y0+230,{font:IS,italic:1,size:54,color:p.fg,maxW:W-260,maxLines:4,p:P(t,2,.7),lh:1.15});
  mono(c,x.handle,130,y0+560,{color:rgba(p.fg,.6),size:20,upper:0,p:P(t,2.8,.6)});T(c,x.brand,W-130,y0+564,{font:IS,size:36,align:'right',color:p.fg,maxW:420,maxLines:1,p:P(t,2.8,.6)});
  if(x.cta)pill(c,x.cta,W/2,1680,{bg:p.fg,fg:p.bg,s:E.outBack(P(t,3.6,.5)),alpha:P(t,3.6,.2),size:28});
  T(c,x.headline,W/2,310,{font:IS,size:80,align:'center',color:'#fff',maxW:W-180,maxLines:2,p:P(t,.2,.7),shadow:'rgba(0,0,0,.45)',sb:30})}});

/* =====================================================================
   BATCH 2 · 25 POSTS (1080×1350) — same five families, static compositions
   ===================================================================== */
const KP=(o)=>Po(Object.assign({kc:true,tone:'dark',grain:.03,fit:{full:1,portrait:1,clean:1},multi:1},o));
const foot=(c,S,y,col,o={})=>{const{W,x}=S;hair(c,80,y,W-80,y,rgba(col,.3),2,1);mono(c,x.brand,80,y+44,{color:col,size:20,maxW:520});mono(c,o.right??x.handle,W-80,y+44,{align:'right',color:rgba(col,.65),size:20,upper:0,maxW:420})};

/* ---- Editorial ---- */
KP({id:'kc-p-cover',name:'The Cover',fam:'Editorial',desc:'A magazine cover: your brand as the masthead, full-bleed shot, cover lines with page numbers.',pal:{bg:'#F4F1EA',fg:'#111113',ac:'#C23B22'},tags:['Editorial','Magazine'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.04,fy:.4});scrimT(c,W,H,.5,.34);scrimB(c,W,H,.82,.5);
  const mh=fit(c,String(x.brand||'').toUpperCase(),IS,400,W-110,240,-2);T(c,x.brand,W/2,90+mh*.74,{font:IS,size:mh,align:'center',upper:1,ls:-2,color:'#fff'});
  mono(c,`Issue ${String(new Date().getMonth()+1).padStart(2,'0')} · ${issue()}`,W/2,90+mh*.74+50,{align:'center',size:20});
  feats(x).forEach((f,i)=>{const y=930+i*74;mono(c,String(i*14+12).padStart(3,'0'),80,y,{size:20});T(c,f,160,y+2,{font:IS,size:46,color:'#fff',maxW:760,maxLines:1})});
  T(c,x.headline,80,1260,{font:IS,italic:1,size:80,color:'#fff',maxW:900,maxLines:2,anchor:'bottom'})}});
KP({id:'kc-p-index',name:'The Index',fam:'Editorial',desc:'A contents page: numbered lines with hairline rules and a strip of photo windows.',pal:{bg:'#111113',fg:'#F5F4EF',ac:'#B9FA70'},tags:['Editorial','List'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,'Index',80,120,{color:p.ac});mono(c,x.brand,W-80,120,{align:'right',color:rgba(p.fg,.6),maxW:600});hair(c,80,150,W-80,150,rgba(p.fg,.3),2,1);
  const n=Math.min(3,Math.max(1,S.n)),tw=(W-160-(n-1)*16)/n;for(let i=0;i<n;i++){c.save();clip(c,80+i*(tw+16),190,tw,560);cover(c,S.m(i),80+i*(tw+16),190,tw,560,{z:1.06});c.restore()}
  const items=[x.headline,...feats(x)].filter(Boolean).slice(0,4);let y=830;items.forEach((s,i)=>{mono(c,String(i+1).padStart(2,'0'),80,y+50,{color:p.ac,size:24});T(c,s,160,y+54,{font:IS,size:60,color:p.fg,maxW:840,maxLines:1});y+=100;hair(c,80,y,W-80,y,rgba(p.fg,.18),2,1)});
  if(x.cta)mono(c,x.cta+'  →',80,H-80,{color:p.fg,size:22,maxW:900})}});
KP({id:'kc-p-caption',name:'Caption Study',fam:'Editorial',desc:'Museum-quiet: one framed photograph with a typed catalogue caption beneath.',pal:{bg:'#EDEAE3',fg:'#1A1A1A',ac:'#1A1A1A'},tone:'light',tags:['Editorial','Minimal'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,110,110,W-220,930);cover(c,S.m(0),110,110,W-220,930,{z:1.03});c.restore();
  hair(c,110,1090,W-110,1090,rgba(p.fg,.35),2,1);mono(c,`01 — ${x.headline||x.brand}`,110,1140,{color:p.fg,size:24,upper:0,ls:1,maxW:W-220});
  mono(c,feats(x).join(' · ')||x.sub,110,1185,{color:rgba(p.fg,.6),size:20,upper:0,ls:1,maxW:W-220});mono(c,x.brand,110,1250,{color:rgba(p.fg,.55),size:18,maxW:500});mono(c,x.label||issue(),W-110,1250,{align:'right',color:rgba(p.fg,.55),size:18,maxW:400})}});
KP({id:'kc-p-quote',name:'The Pull-Quote',fam:'Editorial',desc:'A huge italic pull-quote on paper with a small photo inset and attribution rule.',pal:{bg:'#F6F1E7',fg:'#1D1B19',ac:'#A8743B'},tone:'light',tags:['Editorial','Quote'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'“',80,330,{font:IS,size:300,color:p.ac});
  T(c,x.sub||x.headline,80,420,{font:IS,italic:1,size:92,color:p.fg,maxW:W-160,maxLines:4,lh:1.06});
  c.save();clip(c,W-80-380,H-80-480,380,480);cover(c,S.m(0),W-80-380,H-80-480,380,480,{z:1.05});c.restore();
  hair(c,80,H-170,240,H-170,p.ac,3,1);mono(c,x.brand,80,H-125,{color:p.fg,size:22,maxW:460});if(x.cta)mono(c,x.cta,80,H-85,{color:rgba(p.fg,.6),size:20,maxW:460})}});
KP({id:'kc-p-spread',name:'Feature Page',fam:'Editorial',desc:'Top half photograph, bottom half a set feature: kicker, headline, italic standfirst, folio.',pal:{bg:'#F5F2EC',fg:'#151515',ac:'#8A6A3B'},tone:'light',tags:['Editorial','Layout'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,0,W,700);cover(c,S.m(0),0,0,W,700,{z:1.04,fy:.45});c.restore();
  mono(c,x.label||'Feature',80,790,{color:p.ac,size:22});T(c,x.headline||x.brand,80,880,{font:IS,size:96,color:p.fg,maxW:W-160,maxLines:2,lh:1.02});
  hair(c,80,1090,200,1090,p.ac,3,1);T(c,x.sub,80,1160,{font:IS,italic:1,size:44,color:rgba(p.fg,.8),maxW:W-160,maxLines:2,lh:1.18});foot(c,S,H-110,p.fg,{right:'p. 24'})}});

/* ---- Maison ---- */
KP({id:'kc-p-letterbox',name:'Maison Letterbox',fam:'Maison',desc:'Cinema bands, tracked wordmark, gold hairline frame and the line set in the lower band.',pal:{bg:'#0B0A09',fg:'#F3EBDD',ac:'#C9A96E'},grain:.05,tags:['Luxury','Cinematic'],
 r(c,t,S){const{W,H,p,x}=S;const bar=190;c.fillStyle=p.bg;c.fillRect(0,0,W,H);cover(c,S.m(0),0,bar,W,H-2*bar,{z:1.05});vignette(c,W,H,.4);c.fillStyle=p.bg;c.fillRect(0,0,W,bar);c.fillRect(0,H-bar,W,bar);
  const IT2="'Italiana', serif";T(c,x.brand,W/2,bar/2+6,{font:IT2,size:Math.min(78,fit(c,x.brand||'',IT2,400,W-200,78,20)),ls:20,upper:1,align:'center',base:'middle',color:p.fg});
  c.strokeStyle=rgba(p.ac,.9);c.lineWidth=2;c.strokeRect(60,bar+40,W-120,H-2*bar-80);
  T(c,x.headline,W/2,H-bar+90,{font:IT2,size:54,align:'center',color:p.fg,maxW:W-200,maxLines:1});mono(c,x.label||issue(),W/2,H-bar+150,{align:'center',color:rgba(p.fg,.6),size:18,ls:8})}});
KP({id:'kc-p-arch',name:'Atelier Arch',fam:'Maison',desc:'The product framed in an arched atelier window on warm stone, with a quiet serif lockup.',pal:{bg:'#EFE7DA',fg:'#2B2118',ac:'#9C6B3C'},tone:'light',tags:['Luxury','Shape'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const aw=600,ah=820,ax=W/2-aw/2,ay=90;c.save();archPath(c,ax,ay,aw,ah);c.clip();cover(c,S.m(0),ax,ay,aw,ah,{z:1.05});c.restore();
  c.strokeStyle=p.ac;c.lineWidth=2;archPath(c,ax-22,ay-22,aw+44,ah+44);c.stroke();
  T(c,x.brand,W/2,1030,{font:IS,size:86,align:'center',color:p.fg,maxW:W-160,maxLines:1});mono(c,x.label||'Atelier',W/2,1085,{align:'center',color:p.ac,size:20,ls:8});
  T(c,x.headline,W/2,1170,{font:IS,italic:1,size:46,align:'center',color:rgba(p.fg,.85),maxW:W-200,maxLines:2});if(x.cta)mono(c,x.cta,W/2,H-70,{align:'center',color:p.fg,size:20,ls:6})}});
KP({id:'kc-p-seal',name:'The Seal',fam:'Maison',desc:'Full-bleed shot sealed with a wax monogram in the corner and a serif title.',pal:{bg:'#14100E',fg:'#F2E8D8',ac:'#8E1B23'},tags:['Luxury','Monogram'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.04});scrimB(c,W,H,.82,.45);const init=String(x.brand||'K').trim()[0]?.toUpperCase()||'K',cx=W-210,cy=210,r=120;
  c.save();c.translate(cx,cy);c.shadowColor='rgba(0,0,0,.45)';c.shadowBlur=30;c.shadowOffsetY=10;c.beginPath();for(let i=0;i<=40;i++){const a=i/40*Math.PI*2,rr2=r*(1+.05*Math.sin(i*2.7));c.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2)}c.closePath();
  const gg=c.createRadialGradient(-30,-40,10,0,0,r*1.1);gg.addColorStop(0,mixHex(p.ac,'#ffffff',.25));gg.addColorStop(1,mixHex(p.ac,'#000000',.35));c.fillStyle=gg;c.fill();c.shadowColor='transparent';
  c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=4;c.beginPath();c.arc(0,0,r*.72,0,7);c.stroke();T(c,init,0,6,{font:IS,size:130,align:'center',base:'middle',color:'rgba(255,255,255,.85)'});c.restore();
  T(c,x.headline,80,1110,{font:IS,size:96,color:'#fff',maxW:900,maxLines:2,anchor:'bottom'});mono(c,[x.brand,x.cta].filter(Boolean).join('   ·   '),80,1200,{color:'#fff',size:22,maxW:900})}});
KP({id:'kc-p-viewing',name:'Private Viewing',fam:'Maison',desc:'Your product hung as a gallery piece under a picture light, with a museum placard.',pal:{bg:'#2A2622',fg:'#F4EDE2',ac:'#C9A96E'},tags:['Luxury','Gallery'],
 r(c,t,S){const{W,H,p,x}=S;const wall=c.createLinearGradient(0,0,0,H);wall.addColorStop(0,mixHex(p.bg,'#000000',.3));wall.addColorStop(.82,p.bg);wall.addColorStop(.82,mixHex(p.bg,'#000000',.5));wall.addColorStop(1,'#000');c.fillStyle=wall;c.fillRect(0,0,W,H);
  const cx=W/2,cy=600,fw=560,fh=720;const L=c.createRadialGradient(cx,cy-420,10,cx,cy-80,640);L.addColorStop(0,'rgba(255,236,200,.42)');L.addColorStop(1,'rgba(255,236,200,0)');c.fillStyle=L;c.fillRect(0,0,W,H);
  c.fillStyle=p.ac;c.fillRect(cx-90,cy-fh/2-100,180,14);c.save();c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=50;c.shadowOffsetY=24;c.fillStyle=p.ac;c.fillRect(cx-fw/2-30,cy-fh/2-30,fw+60,fh+60);c.restore();c.fillStyle='#F4EFE6';c.fillRect(cx-fw/2-14,cy-fh/2-14,fw+28,fh+28);cover(c,S.m(0),cx-fw/2,cy-fh/2,fw,fh,{z:1.04});
  c.fillStyle='#F4EFE6';c.fillRect(cx+fw/2-260,cy+fh/2+60,300,140);T(c,x.headline||x.brand,cx+fw/2-240,cy+fh/2+108,{font:IS,size:30,color:'#2a2622',maxW:260,maxLines:1});mono(c,x.label||'Mixed media',cx+fw/2-240,cy+fh/2+146,{color:'#2a2622',size:15,maxW:260,upper:0,ls:1});mono(c,x.price,cx+fw/2-240,cy+fh/2+176,{color:'#2a2622',size:15,maxW:260,upper:0,ls:1});
  mono(c,'Private viewing',80,H-120,{color:rgba(p.fg,.7),size:20,ls:6});T(c,x.brand,80,H-70,{font:IS,size:44,color:p.fg,maxW:560,maxLines:1})}});
KP({id:'kc-p-noir',name:'Noir',fam:'Maison',desc:'High-contrast black-and-white with grain, a gold hairline frame and a centred serif title.',pal:{bg:'#0A0A0A',fg:'#FFFFFF',ac:'#E9D5A8'},grain:.08,tags:['Cinematic','Monochrome'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'grayscale(1) contrast(1.25) brightness(.92)'});vignette(c,W,H,.6);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(0,0,W,H);
  c.strokeStyle=rgba(p.ac,.85);c.lineWidth=2;c.strokeRect(50,50,W-100,H-100);
  T(c,x.brand,W/2,H/2-20,{font:IS,size:fit(c,x.brand||'',IS,400,W-220,150),align:'center',base:'middle',color:'#fff'});hair(c,W/2-120,H/2+70,W/2+120,H/2+70,p.ac,2,1);
  T(c,x.headline,W/2,H/2+150,{font:IS,italic:1,size:48,align:'center',color:'#fff',maxW:W-260,maxLines:2});mono(c,x.label||'',W/2,H-110,{align:'center',color:p.ac,size:18,ls:8})}});

/* ---- Product film ---- */
KP({id:'kc-p-spec',name:'Hero Spec',fam:'Product film',desc:'Studio-clean product with three hairline callouts, the name and the price.',pal:{bg:'#F2F2F0',fg:'#111113',ac:'#111113'},tone:'light',tags:['Product','Specs'],
 r(c,t,S){const{W,H,p,x}=S;const bg=c.createRadialGradient(W/2,560,50,W/2,640,900);bg.addColorStop(0,mixHex(p.bg,'#ffffff',.6));bg.addColorStop(1,p.bg);c.fillStyle=bg;c.fillRect(0,0,W,H);
  T(c,x.brand,W/2,110,{font:IT,weight:600,size:26,ls:8,upper:1,align:'center',color:p.fg});const r=card(c,S.m(0),W/2,600,600,800,{border:0,z:1.02});
  const fs=feats(x).length?feats(x):['Thoughtfully made','Built to last','Limited release'];const pts=[[.3,.3,'L',330],[.72,.5,'R',560],[.36,.74,'L',780]];
  fs.slice(0,3).forEach((f,i)=>{const[fx,fy,side,ly]=pts[i];const px=r?r.x+r.w*fx:W/2,py=r?r.y+r.h*fy:600,ex=side==='L'?70:W-70;c.fillStyle=p.fg;c.beginPath();c.arc(px,py,7,0,7);c.fill();hair(c,px,py,px+(ex-px)*.4,ly,p.fg,2,1);hair(c,px+(ex-px)*.4,ly,ex,ly,p.fg,2,1);
    T(c,f,ex,ly-16,{font:IT,weight:600,size:26,align:side==='L'?'left':'right',color:p.fg,maxW:230,maxLines:2,anchor:'bottom'})});
  T(c,x.headline,W/2,1150,{font:IT,weight:700,size:60,ls:-1,align:'center',color:p.fg,maxW:W-160,maxLines:2,anchor:'bottom'});if(x.price)T(c,x.price,W/2,1230,{font:IT,weight:500,size:38,align:'center',color:rgba(p.fg,.7)})}});
KP({id:'kc-p-mask',name:'Type Mask',fam:'Product film',desc:'One giant word with your product photographed inside the letters.',pal:{bg:'#0E0E10',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Product','Typography'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const word=String((x.headline||x.brand||'NEW').split(/\s+/)[0]).toUpperCase().slice(0,10);const size=fit(c,word,AN,400,W-70,640,0);
  if(!this._b)this._b=document.createElement('canvas');const b=this._b;b.width=W;b.height=H;const g=b.getContext('2d');g.clearRect(0,0,W,H);cover(g,S.m(0),0,0,W,H,{z:1.1});g.globalCompositeOperation='destination-in';g.fillStyle='#000';g.font=`400 ${size}px ${AN}`;g.textAlign='center';g.textBaseline='middle';g.fillText(word,W/2,H/2-30);g.globalCompositeOperation='source-over';c.drawImage(b,0,0);
  mono(c,x.brand,W/2,H/2-30-size*.62,{align:'center',size:24,ls:10,color:'#fff',maxW:W-160});T(c,x.headline,W/2,H/2-30+size*.62+30,{font:IT,weight:600,size:40,align:'center',color:'#fff',maxW:W-200,maxLines:2});
  if(x.cta)mono(c,x.cta+'  →',W/2,H-90,{align:'center',size:22,color:p.ac,maxW:W-200})}});
KP({id:'kc-p-duo',name:'Two Angles',fam:'Product film',desc:'Two views side by side on a clean stage, labelled like a product sheet.',pal:{bg:'#ECEBE6',fg:'#141414',ac:'#141414'},tone:'light',tags:['Product','Comparison'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,x.headline,80,150,{font:IT,weight:700,size:66,ls:-1,color:p.fg,maxW:W-160,maxLines:2});const cw=(W-160-20)/2,y=380,h=760;
  [0,1].forEach(i=>{c.save();clip(c,80+i*(cw+20),y,cw,h);cover(c,S.m(i),80+i*(cw+20),y,cw,h,{z:i?1.6:1.04,fy:i?.4:.45});c.restore();mono(c,`${String(i+1).padStart(2,'0')} — ${[x.f1||'Front',x.f2||'Detail'][i]}`,80+i*(cw+20),y+h+44,{color:p.fg,size:20,upper:0,ls:1,maxW:cw})});
  foot(c,S,H-90,p.fg,{right:x.price||x.handle})}});
KP({id:'kc-p-grid',name:'Split Focus',fam:'Product film',desc:'A precise three-image grid with a headline band — the collection at a glance.',pal:{bg:'#101012',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Product','Grid'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const g=14,top=180,hh=900;const A=[[0,0,1,.55],[0,.55,.5,.45],[.5,.55,.5,.45]];
  A.forEach((a,i)=>{const X=a[0]*W+g,Y=top+a[1]*hh+g,Wd=a[2]*W-2*g,Hd=a[3]*hh-2*g;c.save();clip(c,X,Y,Wd,Hd);cover(c,S.m(i),X,Y,Wd,Hd,{z:1.06});c.restore()});
  T(c,x.brand,80,120,{font:IT,weight:700,size:32,ls:2,upper:1,color:'#fff',maxW:600,maxLines:1});mono(c,x.label||'Collection',W-80,120,{align:'right',color:p.ac,size:20,maxW:400});
  T(c,x.headline,80,1180,{font:IT,weight:700,size:60,ls:-1,color:'#fff',maxW:W-160,maxLines:1});mono(c,feats(x).join('  ·  '),80,1250,{color:rgba('#ffffff',.7),size:20,maxW:W-160})}});
KP({id:'kc-p-launch',name:'Now Available',fam:'Product film',desc:'Launch announcement: “Now available”, the product in light, the name, price and call to action.',pal:{bg:'#000000',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Launch','Product'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05});scrimB(c,W,H,.9,.38);scrimT(c,W,H,.5,.25);brandMark(c,S,W/2,110,{size:40,color:'#fff'});
  mono(c,'Now available',80,950,{color:p.ac,size:24});T(c,x.headline,80,1040,{font:IT,weight:700,size:96,ls:-3,color:'#fff',maxW:920,maxLines:2});
  T(c,x.price,80,1265,{font:IT,weight:500,size:44,color:'#fff'});if(x.cta)pill(c,x.cta,W-80-190,1250,{bg:p.ac,fg:ink(p.ac),size:26})}});

/* ---- Kinetic (bold, static) ---- */
KP({id:'kc-p-poster',name:'Bold Poster',fam:'Kinetic',desc:'A gig-poster headline in heavy condensed type across a colour block and photo.',pal:{bg:'#FF4D2E',fg:'#111111',ac:'#111111'},tags:['Kinetic','Poster'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,560,W,H-560);cover(c,S.m(0),0,560,W,H-560,{z:1.05});c.restore();
  const words=String(x.headline||x.brand||'').toUpperCase();T(c,words,60,90,{font:AN,size:200,color:ink(p.bg),maxW:W-120,maxLines:3,lh:.92,base:'top'});
  c.fillStyle=ink(p.bg);c.fillRect(60,H-130,W-120,70);mono(c,[x.brand,x.cta].filter(Boolean).join('   ✦   '),W/2,H-86,{align:'center',color:p.bg,size:24,maxW:W-180})}});
KP({id:'kc-p-outline',name:'Outline Marquee',fam:'Kinetic',desc:'Rows of outlined brand type behind a tilted product card, solid headline below.',pal:{bg:'#F0EEE9',fg:'#111113',ac:'#111113'},tone:'light',tags:['Kinetic','Type'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const word=String(x.brand||'').toUpperCase()+' • ';
  for(let r=0;r<7;r++){const y=150+r*180;c.save();c.font=`400 170px ${AN}`;const w=Math.max(200,c.measureText(word).width);c.restore();for(let k=-2;k<5;k++)T(c,word,k*w-(r%2?w/2:0),y,{font:AN,size:170,color:p.fg,stroke:2,alpha:.2})}
  c.save();c.translate(W/2,560);c.rotate(-.04);c.shadowColor='rgba(0,0,0,.28)';c.shadowBlur=60;c.shadowOffsetY=30;c.fillStyle='#fff';c.fillRect(-260,-340,520,680);c.shadowColor='transparent';cover(c,S.m(0),-246,-326,492,652,{z:1.04});c.restore();
  c.fillStyle=p.bg;c.fillRect(0,1000,W,H-1000);T(c,x.headline,W/2,1090,{font:AN,size:110,align:'center',upper:1,color:p.fg,maxW:W-140,maxLines:2,lh:.95});if(x.cta)mono(c,x.cta+'  ↗',W/2,H-60,{align:'center',color:p.fg,size:22})}});
KP({id:'kc-p-stack',name:'Stacked Type',fam:'Kinetic',desc:'Headline stacked in alternating solid and outline lines with photo strips between.',pal:{bg:'#1B1B1B',fg:'#F7F5F0',ac:'#F2C94C'},tags:['Kinetic','Poster'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const raw=String(x.headline||x.brand||'').toUpperCase().split(/\s+/).filter(Boolean);const L=[];
  if(raw.length<=4)L.push(...raw);else{c.save();c.font=`400 150px ${AN}`;let l='';for(const w of raw){const tt=l?l+' '+w:w;if(c.measureText(tt).width>W-160&&l){L.push(l);l=w}else l=tt}if(l)L.push(l);c.restore();while(L.length>4){const i=L.length-2;L.splice(i,2,L[i]+' '+L[i+1])}}
  const cap=L.length>3?160:210;let y=130;L.forEach((w,i)=>{const sz=Math.min(cap,fit(c,w,AN,400,W-160,cap,0));T(c,w,80,y+sz*.82,{font:AN,size:sz,color:i===1?p.ac:p.fg,stroke:i%2?3:0});y+=sz*.92;if(i===0){const sh=L.length<=4&&raw.length<=4?330:190;c.save();clip(c,80,y+8,W-160,sh);cover(c,S.m(0),80,y+8,W-160,sh,{z:1.12,fy:.4});c.restore();y+=sh+16}});
  foot(c,S,Math.min(y+40,H-110),p.fg,{right:x.cta})}});
KP({id:'kc-p-ticker',name:'Ticker Tape',fam:'Kinetic',desc:'Diagonal event tapes with brand, line and price crossing the photo.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Kinetic','Offer'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05});c.fillStyle='rgba(0,0,0,.18)';c.fillRect(0,0,W,H);
  const band=(ang,y,col,txt,off)=>{c.save();c.translate(W/2,y);c.rotate(ang);c.fillStyle=col;c.fillRect(-W,-56,W*2,112);c.font=`400 68px ${AN}`;const seg=(txt+'  ✦  ').toUpperCase(),w=c.measureText(seg).width;for(let k=-4;k<6;k++)T(c,seg,-W+k*w-off,24,{font:AN,size:68,color:ink(col)});c.restore()};
  band(-.16,430,p.ac,[x.brand,x.label].filter(Boolean).join('  ✦  ')||'New',60);band(.12,760,'#ffffff',[x.headline,x.price].filter(Boolean).join('  ✦  ')||'Now',140);band(-.07,1080,p.bg,[x.brand,x.cta].filter(Boolean).join('  ✦  ')||'Shop',20)}});
KP({id:'kc-p-offer',name:'The Offer',fam:'Kinetic',desc:'A confident offer card: the price huge, the terms in mono, the product beside it.',pal:{bg:'#F2C94C',fg:'#111111',ac:'#111111'},tone:'light',tags:['Offer','Sale'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,W*.48,0,W*.52,H);cover(c,S.m(0),W*.48,0,W*.52,H,{z:1.05});c.restore();
  mono(c,x.label||'Limited offer',70,140,{color:p.fg,size:22,maxW:440});T(c,x.price||x.headline,70,360,{font:AN,size:fit(c,x.price||x.headline||'',AN,400,W*.48-110,190),color:p.fg});
  T(c,x.headline,70,470,{font:IT,weight:700,size:52,color:p.fg,maxW:W*.48-110,maxLines:4,lh:1.05});mono(c,feats(x).join('\n'),70,880,{color:p.fg,size:20,maxW:W*.48-110,upper:0,ls:1,maxLines:4});
  c.fillStyle=p.fg;c.fillRect(70,H-200,W*.48-130,90);T(c,x.cta||'Shop now',70+(W*.48-130)/2,H-144,{font:IT,weight:700,size:30,align:'center',color:p.bg,upper:1,ls:3,maxW:W*.48-170,maxLines:1});mono(c,x.brand,70,H-70,{color:p.fg,size:18,maxW:440})}});

/* ---- Lifestyle ---- */
KP({id:'kc-p-polaroid',name:'Moments',fam:'Lifestyle',desc:'Instant photos scattered on linen with handwritten-style captions.',pal:{bg:'#E8E1D6',fg:'#2C2722',ac:'#B4553A'},tone:'light',tags:['Lifestyle','Memories'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.globalAlpha=.07;for(let i=0;i<H;i+=6){c.fillStyle=i%12?'#fff':'#000';c.fillRect(0,i,W,2)}c.restore();
  const caps=[x.f1,x.f2,x.f3].filter(Boolean),pos=[[.33,.36,-.08],[.66,.42,.07],[.47,.64,-.02]];const n=Math.max(1,Math.min(3,S.n));
  for(let i=0;i<3;i++){const[fx,fy,rot]=pos[i];c.save();c.translate(W*fx,H*fy);c.rotate(rot);c.scale(.8,.8);c.shadowColor='rgba(40,30,20,.28)';c.shadowBlur=40;c.shadowOffsetY=20;c.fillStyle='#FBF9F4';c.fillRect(-250,-290,500,600);c.shadowColor='transparent';
    cover(c,S.m(i%n),-222,-262,444,444,{z:1.05+i*.15,fx:[.5,.4,.6][i],fy:[.4,.3,.6][i],filter:'contrast(1.02) saturate(.92) sepia(.08)'});T(c,caps[i]||x.brand,0,250,{font:IS,italic:1,size:40,align:'center',color:'#3a332c',maxW:430,maxLines:1});c.restore()}
  T(c,x.brand,W/2,120,{font:IS,size:60,align:'center',color:p.fg,maxW:W-200,maxLines:1});T(c,x.headline,W/2,H-80,{font:IS,italic:1,size:50,align:'center',color:p.fg,maxW:W-180,maxLines:1})}});
KP({id:'kc-p-journal',name:'The Journal',fam:'Lifestyle',desc:'A notebook page with a taped-in photo and a handwritten-style note.',pal:{bg:'#F3EEE4',fg:'#2D2A26',ac:'#7A8F6A'},tone:'light',tags:['Lifestyle','Story'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.strokeStyle=rgba(p.ac,.22);c.lineWidth=2;for(let y=180;y<H-60;y+=60){c.beginPath();c.moveTo(60,y);c.lineTo(W-60,y);c.stroke()}c.strokeStyle='rgba(192,57,43,.3)';c.beginPath();c.moveTo(140,60);c.lineTo(140,H-60);c.stroke();
  mono(c,new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long'}),W-80,120,{align:'right',upper:0,color:rgba(p.fg,.6),size:22});
  c.save();c.translate(W/2+20,500);c.rotate(-.03);c.shadowColor='rgba(0,0,0,.18)';c.shadowBlur=30;c.shadowOffsetY=12;c.fillStyle='#fff';c.fillRect(-320,-300,640,600);c.shadowColor='transparent';cover(c,S.m(0),-300,-280,600,560,{z:1.05});c.restore();
  const tape=(x0,y0,r)=>{c.save();c.translate(x0,y0);c.rotate(r);c.fillStyle='rgba(232,220,190,.8)';c.fillRect(-80,-22,160,44);c.restore()};tape(W/2-250,205,-.4);tape(W/2+300,210,.35);
  T(c,[x.headline,x.sub].filter(Boolean).join(' — ')||x.brand,170,945,{font:IS,italic:1,size:52,color:p.fg,maxW:W-260,maxLines:4,lh:1.15});T(c,'— '+(x.brand||''),W-90,H-90,{font:IS,italic:1,size:42,align:'right',color:p.ac,maxW:600,maxLines:1})}});
KP({id:'kc-p-palette',name:'Colour Story',fam:'Lifestyle',desc:'The photo beside the four colours Kathavi reads from it, named and numbered.',pal:{bg:'#FAF8F4',fg:'#1C1B19',ac:'#1C1B19'},tone:'light',tags:['Lifestyle','Colour'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const m=S.m(0),sw=swatches(m);c.save();clip(c,80,200,560,1000);cover(c,m,80,200,560,1000,{z:1.04});c.restore();
  T(c,'Colour story',80,140,{font:IS,italic:1,size:64,color:p.fg});mono(c,x.brand,W-80,135,{align:'right',color:rgba(p.fg,.6),size:20,maxW:380});
  sw.forEach((col,i)=>{const y=200+i*254;c.fillStyle=col;c.fillRect(680,y,320,200);mono(c,col.toUpperCase(),680,y+232,{size:18,color:p.fg,ls:1});T(c,[x.f1,x.f2,x.f3,x.label][i]||'',1000,y+234,{font:IS,size:26,align:'right',color:rgba(p.fg,.7),maxW:180,maxLines:1})});
  T(c,x.headline,80,H-60,{font:IS,size:48,color:p.fg,maxW:W-160,maxLines:1})}});
KP({id:'kc-p-review',name:'Our Promise',fam:'Lifestyle',desc:'Your brand’s promise as a soft note card over the product photo, signed with your name.',pal:{bg:'#FFF8F2',fg:'#2A2420',ac:'#E2A72E'},tone:'light',tags:['Lifestyle','Social proof'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.04});scrimT(c,W,H,.6,.3);const y0=640;c.save();c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=50;c.shadowOffsetY=20;c.fillStyle=p.bg;rr(c,70,y0,W-140,600,40);c.fill();c.restore();
  mono(c,'Our promise',130,y0+100,{color:p.ac,size:22});hair(c,130,y0+130,290,y0+130,p.ac,3,1);
  T(c,x.sub||x.headline||x.brand,130,y0+210,{font:IS,italic:1,size:52,color:p.fg,maxW:W-260,maxLines:4,lh:1.15});
  mono(c,x.handle,130,y0+540,{color:rgba(p.fg,.6),size:18,upper:0});T(c,x.brand,W-130,y0+544,{font:IS,size:34,align:'right',color:p.fg,maxW:420,maxLines:1});
  T(c,x.headline,W/2,150,{font:IS,size:76,align:'center',color:'#fff',maxW:W-180,maxLines:2,shadow:'rgba(0,0,0,.45)',sb:30})}});
KP({id:'kc-p-quiet',name:'Quiet Luxury',fam:'Lifestyle',desc:'Generous whitespace, a small photograph and one line of serif — the apothecary-calm post.',pal:{bg:'#F1EEE8',fg:'#2B2A27',ac:'#8C8279'},tone:'light',tags:['Lifestyle','Minimal'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,W/2-230,220,460,600);cover(c,S.m(0),W/2-230,220,460,600,{z:1.04});c.restore();
  mono(c,x.brand,W/2,140,{align:'center',color:p.fg,size:20,ls:10,maxW:W-200});T(c,x.headline,W/2,960,{font:IS,size:64,align:'center',color:p.fg,maxW:W-240,maxLines:2});
  T(c,x.sub,W/2,1110,{font:IT,size:26,align:'center',color:rgba(p.fg,.65),maxW:W-320,maxLines:2});mono(c,x.price||x.cta,W/2,H-100,{align:'center',color:p.ac,size:20,ls:6})}});

/* =====================================================================
   BATCH 3 · 25 REELS — the formats D2C brands post most
   Families: Explain · Sell · Compare · Story · Social
   ===================================================================== */
const join2=(a,b)=>[a,b].filter(Boolean).map(z=>String(z).trim()).map((z,i,arr)=>i<arr.length-1&&!/[.!?…]$/.test(z)?z+'.':z).join(' ');
const pts3=x=>{const f=feats(x);return f.length?f:['Thoughtfully made','Built to last','Limited release']};
const bar=(c,x0,y,w,p,col,bg)=>{c.fillStyle=bg;c.fillRect(x0,y,w,6);c.fillStyle=col;c.fillRect(x0,y,w*clamp(p),6)};
const tick=(c,cx,cy,r,p,col)=>{if(p<=0)return;c.save();c.strokeStyle=col;c.lineWidth=r*.22;c.lineCap='round';c.lineJoin='round';c.beginPath();const a=[cx-r*.45,cy],b=[cx-r*.1,cy+r*.35],d=[cx+r*.5,cy-r*.35];const q=clamp(p);
  if(q<.4){const k=q/.4;c.moveTo(a[0],a[1]);c.lineTo(a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k)}else{const k=(q-.4)/.6;c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.lineTo(b[0]+(d[0]-b[0])*k,b[1]+(d[1]-b[1])*k)}c.stroke();c.restore()};
const cross=(c,cx,cy,r,p,col)=>{if(p<=0)return;c.save();c.strokeStyle=col;c.lineWidth=r*.2;c.lineCap='round';const k=clamp(p);c.beginPath();c.moveTo(cx-r*.4,cy-r*.4);c.lineTo(cx-r*.4+r*.8*Math.min(1,k*2),cy-r*.4+r*.8*Math.min(1,k*2));if(k>.5){const k2=(k-.5)*2;c.moveTo(cx+r*.4,cy-r*.4);c.lineTo(cx+r*.4-r*.8*k2,cy-r*.4+r*.8*k2)}c.stroke();c.restore()};

/* ================= FAMILY 6 · EXPLAIN ================= */
KC({id:'kc-reasons',name:'3 Reasons',fam:'Explain',desc:'“3 reasons you’ll love it” — a giant numeral per reason, each with its own shot, then the product.',pal:{bg:'#111113',fg:'#F5F4EF',ac:'#B9FA70'},dur:11,pt:3.4,hold:[1.6,8],tags:['Explain','List'],
 r(c,t,S){const{W,H,p,x}=S;const R=pts3(x).slice(0,3),seg=2.4,t0=1.6,k=Math.floor((t-t0)/seg),lt=t-t0-k*seg;c.fillStyle=p.bg;c.fillRect(0,0,W,H);
  if(t<t0){T(c,R.length+' reasons',80,820,{font:IT,weight:700,size:150,ls:-5,color:p.fg,p:P(t,.1,.6)});T(c,'you’ll love '+(x.brand?'':'it'),80,960,{font:IS,italic:1,size:96,color:p.ac,p:P(t,.35,.6)});if(x.brand)T(c,x.brand,80,1080,{font:IS,italic:1,size:96,color:p.ac,maxW:900,maxLines:1,p:P(t,.5,.6)})}
  else if(k<R.length){c.save();clip(c,0,0,W,1060);cover(c,S.m(k),0,0,W,1060,{z:1.12-.06*(lt/seg)});c.restore();c.fillStyle=p.bg;c.fillRect(0,1060,W,H-1060);
    const s=1.3-.3*E.outExpo(clamp(lt/.5));c.save();c.translate(80,1060);c.scale(s,s);T(c,String(k+1).padStart(2,'0'),0,170,{font:IT,weight:200,size:240,color:p.ac,alpha:clamp(lt/.2)});c.restore();
    kin(c,R[k],80,1420,{t:lt,t0:.2,font:IT,weight:700,size:76,ls:-2,maxW:920,maxLines:2,color:p.fg});bar(c,80,1600,W-160,(k+lt/seg)/R.length,p.ac,rgba(p.fg,.15))}
  else{const lt2=t-t0-R.length*seg;cover(c,S.m(0),0,0,W,H,{z:kb(lt2,2,1.12,1.03)});scrimB(c,W,H,.85,.4);T(c,x.headline,80,1400,{font:IT,weight:700,size:90,ls:-3,color:'#fff',maxW:900,maxLines:2,anchor:'bottom',p:P(lt2,.2,.6)});if(x.cta)pill(c,x.cta,W/2,1560,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(lt2,.5,.5)),alpha:P(lt2,.5,.2),size:28})}}});

KC({id:'kc-howto',name:'How To',fam:'Explain',desc:'A step-by-step tutorial: Step 01, 02, 03 with a progress rail, a close-up per step and the finished result.',pal:{bg:'#F4F2ED',fg:'#141414',ac:'#141414'},tone:'light',dur:12,pt:4.2,hold:[1.4,9],tags:['Explain','Tutorial'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const st=pts3(x).slice(0,3),seg=2.8,t0=1.4,k=Math.min(st.length,Math.floor(Math.max(0,t-t0)/seg)),lt=t-t0-k*seg;
  mono(c,'How to',80,250,{color:p.fg,size:24,p:P(t,.1,.5)});T(c,x.headline,80,340,{font:IT,weight:700,size:62,ls:-1,color:p.fg,maxW:920,maxLines:2,p:P(t,.2,.6)});
  st.forEach((s,i)=>{const x0=80+i*(W-160)/st.length,w=(W-160)/st.length-14,on=t>=t0+i*seg;c.fillStyle=on?p.fg:rgba(p.fg,.15);c.fillRect(x0,480,w,6);if(i===k&&k<st.length){c.fillStyle=p.fg;c.fillRect(x0,480,w*clamp(lt/seg),6)}})
  if(t<t0){card(c,S.m(0),W/2,1050,820,820,{alpha:E.out(P(t,.2,.6)),z:1.03})}
  else if(k<st.length){c.save();clip(c,80,560,W-160,860);cover(c,S.m(k),80,560,W-160,860,{z:1.6-.15*(lt/seg),fx:[.5,.35,.62][k],fy:[.35,.55,.75][k]});c.restore();
    mono(c,`Step ${String(k+1).padStart(2,'0')}`,80,1500,{color:p.fg,size:24,p:clamp(lt/.3)});kin(c,st[k],80,1590,{t:lt,t0:.2,font:IT,weight:600,size:56,maxW:920,maxLines:2,color:p.fg})}
  else{const l2=t-t0-st.length*seg;card(c,S.m(0),W/2,1000,820,860,{z:1.03,s:.95+.05*E.outExpo(clamp(l2/.6))});mono(c,'The result',80,1520,{color:p.fg,size:24});if(x.cta)T(c,x.cta+'  →',80,1610,{font:IT,weight:700,size:48,color:p.fg,p:P(l2,.3,.6),maxW:920,maxLines:1})}}});

KC({id:'kc-checklist',name:'The Checklist',fam:'Explain',desc:'A clean checklist over the product: each point ticks itself off with a satisfying draw.',pal:{bg:'#0F1A14',fg:'#FFFFFF',ac:'#7CF2A6'},dur:9,pt:4.6,hold:[1.5,6],tags:['Explain','Checklist'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,9,1.14,1.03)});c.fillStyle=rgba(p.bg,.55);c.fillRect(0,0,W,H);scrimB(c,W,H,.6,.5);
  T(c,x.headline,80,420,{font:IT,weight:700,size:84,ls:-2,color:'#fff',maxW:920,maxLines:2,p:P(t,.2,.6)});mono(c,x.brand,80,300,{color:p.ac,size:22,p:P(t,.1,.5)});
  const L=[...pts3(x),x.price?`Just ${x.price}`:null].filter(Boolean).slice(0,4);L.forEach((s,i)=>{const t0=1.2+i*.9,y=720+i*190;const a=E.outExpo(P(t,t0,.5));if(a<=0)return;
    c.save();c.globalAlpha=a;rr(c,80,y-70,W-160,150,28);c.fillStyle='rgba(255,255,255,.1)';c.fill();c.strokeStyle='rgba(255,255,255,.22)';c.lineWidth=2;c.stroke();c.restore();
    c.save();c.globalAlpha=a;c.beginPath();c.arc(160,y+5,38,0,7);c.fillStyle=P(t,t0+.35,.1)>0?p.ac:'rgba(255,255,255,.2)';c.fill();c.restore();tick(c,160,y+5,38,P(t,t0+.35,.4),ink(p.ac));
    T(c,s,230,y+22,{font:IT,weight:600,size:46,color:'#fff',maxW:W-330,maxLines:1,alpha:a})});
  if(x.cta)pill(c,x.cta,W/2,1620,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,1.6+L.length*.9,.5)),alpha:P(t,1.6+L.length*.9,.2),size:28})}});

KC({id:'kc-qa',name:'Asked & Answered',fam:'Explain',desc:'Chat-style Q&A: a question bubble, typing dots, then answer bubbles pop in over a softened product shot.',pal:{bg:'#ECE9E4',fg:'#151515',ac:'#2F6BFF'},tone:'light',dur:10,pt:5.6,hold:[2,7],tags:['Explain','Chat'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.1,filter:'blur(18px) brightness(1.05) saturate(.9)'});c.fillStyle=rgba(p.bg,.55);c.fillRect(0,0,W,H);
  const bub=(txt,right,y,a,col,fg)=>{if(a<=0)return 0;c.save();c.font=`500 44px ${IT}`;const lines=(()=>{const L=[];let l='';String(txt).split(' ').forEach(w=>{if(c.measureText(l+' '+w).width>620&&l){L.push(l);l=w}else l=l?l+' '+w:w});L.push(l);return L.slice(0,3)})();
    const w=Math.max(...lines.map(l=>c.measureText(l).width))+70,h=lines.length*56+46,bx=right?W-80-w:80;const s=.85+.15*E.outBack(clamp(a));c.translate(bx+(right?w:0),y+h);c.scale(s,s);c.translate(-(bx+(right?w:0)),-(y+h));c.globalAlpha=clamp(a*2);
    rr(c,bx,y,w,h,32);c.fillStyle=col;c.fill();lines.forEach((l,i)=>T(c,l,bx+35,y+62+i*56,{font:IT,weight:500,size:44,color:fg}));c.restore();return h+24};
  mono(c,x.brand,W/2,250,{align:'center',color:p.fg,size:22,p:P(t,.1,.5)});let y=360;
  y+=bub(x.headline?`Why ${x.headline.toLowerCase().replace(/[.!?]$/,'')}?`:'Why this one?',true,y,P(t,.4,.4),p.ac,'#fff');
  const A=pts3(x);const typing=t>1.1&&t<1.9;if(typing){rr(c,80,y,150,80,30);c.fillStyle='#fff';c.fill();for(let i=0;i<3;i++){c.beginPath();c.arc(120+i*36,y+40,9,0,7);c.fillStyle=rgba(p.fg,.3+.5*Math.max(0,Math.sin(t*9-i)));c.fill()}}
  A.forEach((a,i)=>{y+=bub(a,false,y,P(t,1.9+i*.8,.4),'#ffffff',p.fg)});
  if(x.cta)y+=bub(x.cta+' →',true,y,P(t,1.9+A.length*.8+.4,.4),p.fg,'#fff')}});

KC({id:'kc-didyouknow',name:'Did You Know',fam:'Explain',desc:'A curiosity hook — “Did you know?” — then a single fact set huge, with the product as proof.',pal:{bg:'#FFE45C',fg:'#111111',ac:'#111111'},tone:'light',dur:9,pt:3.6,hold:[1.2,6],tags:['Explain','Fact'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const rev=E.inOut(P(t,4.8,.9));
  const q=1.4-.4*E.outBack(P(t,.1,.6));c.save();c.translate(W/2,520);c.scale(q,q);T(c,'Did you',0,0,{font:AN,size:190,align:'center',upper:1,color:p.fg,alpha:P(t,.1,.2)});T(c,'know?',0,190,{font:AN,size:190,align:'center',upper:1,color:p.fg,alpha:P(t,.25,.2)});c.restore();
  kin(c,x.sub||x.headline,80,1000,{t,t0:1.2,font:IS,italic:1,size:78,maxW:920,maxLines:4,color:p.fg,lh:1.08});
  if(rev>0){const yy=H*(1-rev);c.save();clip(c,0,yy,W,H-yy);cover(c,S.m(0),0,0,W,H,{z:kb(t-4.8,3,1.1,1.02)});scrimB(c,W,H,.8,.45);c.restore();
    T(c,x.headline,80,1460,{font:IT,weight:700,size:84,ls:-2,color:'#fff',maxW:900,maxLines:2,anchor:'bottom',p:P(t,5.5,.6)});mono(c,[x.brand,x.cta].filter(Boolean).join('  ·  '),80,1560,{color:'#fff',size:22,p:P(t,5.9,.5),maxW:900})}}});

/* ================= FAMILY 7 · SELL ================= */
KC({id:'kc-sale',name:'Sale Countdown',fam:'Sell',desc:'A ticking “ends in” clock, the price landing with weight, flashes of the product, and the call to action.',pal:{bg:'#C8102E',fg:'#FFFFFF',ac:'#FFE45C'},dur:9,pt:4.4,hold:[2,6.5],tags:['Sell','Sale'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const k=Math.floor(t/1.4);c.save();clip(c,0,820,W,H-820);cover(c,S.m(k),0,820,W,H-820,{z:1.14-.06*((t%1.4)/1.4)});c.restore();
  mono(c,x.label||'Sale',80,240,{color:ink(p.bg),size:24,p:P(t,.1,.5)});T(c,x.headline||'The sale is on',80,400,{font:AN,size:120,upper:1,color:ink(p.bg),maxW:920,maxLines:2,lh:.95,p:P(t,.2,.5)});
  const rem=Math.max(0,86399-Math.floor(t*37)),hh=String(Math.floor(rem/3600)).padStart(2,'0'),mm=String(Math.floor(rem/60)%60).padStart(2,'0'),ss=String(rem%60).padStart(2,'0');
  mono(c,'Ends in',80,640,{color:ink(p.bg),size:22,p:P(t,.6,.4)});[hh,mm,ss].forEach((v,i)=>{const bx=80+i*220;c.save();c.globalAlpha=E.out(P(t,.7+i*.1,.4));rr(c,bx,670,190,120,16);c.fillStyle=rgba('#000000',.25);c.fill();T(c,v,bx+95,758,{font:IT,weight:700,size:80,align:'center',color:ink(p.bg)});c.restore();if(i<2)T(c,':',bx+205,752,{font:IT,weight:700,size:70,align:'center',color:ink(p.bg),alpha:t%1<.5?1:.35})});
  if(x.price){const s=E.outBack(P(t,2.2,.5));c.save();c.translate(W-230,1500);c.rotate(-.08);c.scale(s,s);c.beginPath();c.arc(0,0,170,0,7);c.fillStyle=p.ac;c.fill();T(c,'Now',0,-50,{font:PM,size:24,align:'center',upper:1,ls:4,color:ink(p.ac)});T(c,x.price,0,40,{font:AN,size:fit(c,x.price,AN,400,270,96),align:'center',color:ink(p.ac)});c.restore()}
  if(x.cta)pill(c,x.cta,300,1700,{bg:'#fff',fg:'#111',s:E.outBack(P(t,2.8,.5)),alpha:P(t,2.8,.2),size:30})}});

KC({id:'kc-restock',name:'Back in Stock',fam:'Sell',desc:'“Back in stock” stamps onto the product, a stock bar fills and the urgency line follows.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#B9FA70'},dur:8,pt:2.4,hold:[1.6,5.5],tags:['Sell','Restock'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,8,1.15,1.03)});scrimB(c,W,H,.85,.4);scrimT(c,W,H,.65,.28);
  const s=2.2-1.2*E.outBack(P(t,.4,.45));c.save();c.translate(W/2,700);c.rotate(-.1);c.scale(s,s);c.globalAlpha=P(t,.4,.1);rr(c,-380,-130,760,260,24);c.fillStyle=p.ac;c.fill();c.strokeStyle=ink(p.ac);c.lineWidth=6;rr(c,-362,-112,724,224,16);c.stroke();
  T(c,'Back in',0,-12,{font:AN,size:110,upper:1,align:'center',color:ink(p.ac)});T(c,'stock',0,100,{font:AN,size:110,upper:1,align:'center',color:ink(p.ac)});c.restore();if(P(t,.4,.45)>=1&&t<1.1)flash(c,W,H,.15*(1-(t-.85)/.25));
  T(c,x.headline,80,1330,{font:IT,weight:700,size:76,ls:-2,color:'#fff',maxW:920,maxLines:2,anchor:'bottom',p:P(t,1.2,.6)});
  mono(c,'Selling fast',80,1420,{color:p.ac,size:22,p:P(t,1.6,.5)});bar(c,80,1450,W-160,.25+.55*E.outExpo(P(t,1.8,2)),p.ac,'rgba(255,255,255,.2)');
  if(x.cta)pill(c,x.cta,W/2,1590,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,2.6,.5)),alpha:P(t,2.6,.2),size:28});brandMark(c,S,W/2,300,{size:42,color:'#fff'})}});

KC({id:'kc-drop',name:'The Drop',fam:'Sell',desc:'A product drop: a lock and date tease, the lock clicks open and the piece is revealed with its time.',pal:{bg:'#0A0A0A',fg:'#FFFFFF',ac:'#FF5CA8'},dur:9,pt:5.4,hold:[1.5,6],tags:['Sell','Launch'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const un=E.inOut(P(t,2.6,.6)),rev=E.inOut(P(t,3.4,1));
  if(rev<1){c.save();c.globalAlpha=1-rev;cover(c,S.m(0),0,0,W,H,{z:1.15,filter:'blur(30px) brightness(.5)'});
    const cx=W/2,cy=820;c.strokeStyle=p.fg;c.lineWidth=18;c.beginPath();c.arc(cx,cy-80-un*60,90,Math.PI,0);c.lineTo(cx+90,cy-20-un*60);c.moveTo(cx-90,cy-80-un*60);c.lineTo(cx-90,cy-20);c.stroke();rr(c,cx-140,cy-30,280,230,30);c.fillStyle=p.fg;c.fill();c.beginPath();c.arc(cx,cy+60,22,0,7);c.fillStyle=p.bg;c.fill();
    mono(c,'The drop',W/2,1180,{align:'center',size:26,color:p.ac,p:P(t,.3,.5)});T(c,x.label||'Coming soon',W/2,1270,{font:IT,weight:700,size:64,ls:-1,align:'center',color:p.fg,maxW:W-160,maxLines:1,p:P(t,.5,.5)});c.restore()}
  if(rev>0){c.save();c.globalAlpha=rev;cover(c,S.m(0),0,0,W,H,{z:1.2-.15*rev});scrimB(c,W,H,.85,.42);c.restore();flash(c,W,H,.5*(1-clamp((t-3.4)/.4))*(t>3.4?1:0));
    mono(c,'Unlocked',80,1250,{color:p.ac,size:24,p:P(t,4,.5)});kin(c,x.headline,80,1340,{t,t0:4.1,font:IT,weight:700,size:90,ls:-3,maxW:920,maxLines:2,color:'#fff'});if(x.cta)pill(c,x.cta,W/2,1620,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,4.8,.5)),alpha:P(t,4.8,.2),size:28})}}});

KC({id:'kc-bundle',name:'The Bundle',fam:'Sell',desc:'Product + product + product = one price: cards slide together with plus signs into a bundle offer.',pal:{bg:'#F3EFE8',fg:'#1A1A1A',ac:'#E2552E'},tone:'light',dur:9,pt:4,hold:[1.5,6],tags:['Sell','Bundle'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=Math.max(2,Math.min(3,S.n)),merge=E.inOut(P(t,3.4,.9));
  T(c,x.headline||'Better together',W/2,420,{font:IS,size:72,align:'center',color:p.fg,maxW:W-160,maxLines:2,anchor:'bottom',p:P(t,.1,.6)});
  for(let i=0;i<n;i++){const a=E.outBack(P(t,.6+i*.6,.6)),y0=660+i*330,cx=W/2+(i%2?120:-120)*(1-merge),cy=y0+(860-y0)*merge*.0;const rot=(i%2?.05:-.05)*(1-merge);
    c.save();c.translate(cx,y0+(1-a)*80);c.rotate(rot);c.globalAlpha=Math.min(1,a*2)*(1-merge*.0);c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=40;c.shadowOffsetY=16;c.fillStyle='#fff';c.fillRect(-250,-140,500,280);c.shadowColor='transparent';cover(c,S.m(i),-236,-126,300,252,{z:1.05});
    T(c,pts3(x)[i]||'',80,10,{font:IT,weight:600,size:30,color:p.fg,maxW:150,maxLines:3,base:'middle',anchor:'middle'});c.restore();
    if(i<n-1){const pa=E.outBack(P(t,.9+i*.6,.4));c.save();c.translate(W/2,y0+165);c.scale(pa,pa);T(c,'+',0,24,{font:IT,weight:300,size:90,align:'center',color:p.ac});c.restore()}}
  if(merge>0){c.save();c.globalAlpha=merge;c.fillStyle=rgba(p.bg,.92);c.fillRect(0,0,W,H);c.restore();T(c,'=',W/2,760,{font:IT,weight:200,size:200,align:'center',color:p.ac,alpha:merge});
    T(c,x.price||'One price',W/2,1000,{font:AN,size:fit(c,x.price||'One price',AN,400,W-200,220),align:'center',color:p.fg,alpha:merge});T(c,'for the set',W/2,1100,{font:IS,italic:1,size:60,align:'center',color:p.fg,alpha:merge});
    if(x.cta)pill(c,x.cta,W/2,1300,{bg:p.fg,fg:p.bg,s:E.outBack(P(t,4.4,.5)),alpha:P(t,4.4,.2),size:30});mono(c,x.brand,W/2,1420,{align:'center',color:p.fg,size:22,alpha:merge})}}});

KC({id:'kc-giftguide',name:'Gift Guide',fam:'Sell',desc:'A ribboned gift guide: three tagged picks, one after another, with the gifting line to close.',pal:{bg:'#7A1F2B',fg:'#FFF6EC',ac:'#E8C07A'},dur:10,pt:6.4,hold:[1.5,7],tags:['Sell','Gifting'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const P3=pts3(x),seg=1.8,t0=1.2,k=Math.min(2,Math.floor(Math.max(0,t-t0)/seg)),lt=t-t0-k*seg;
  c.fillStyle=rgba(p.ac,.9);c.fillRect(W/2-14,380,28,1060);c.fillRect(0,600,W,28);
  T(c,'The gift guide',W/2,240,{font:IS,italic:1,size:96,align:'center',color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,W/2,300,{align:'center',color:p.ac,size:22,p:P(t,.3,.5)});
  if(t>=t0){const a=E.outBack(clamp(lt/.6)),cx=W/2,cy=980;c.save();c.translate(cx,cy+(1-a)*120);c.rotate((k-1)*.04);c.globalAlpha=Math.min(1,a*2);c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=50;c.shadowOffsetY=20;c.fillStyle='#FFF6EC';c.fillRect(-330,-400,660,800);c.shadowColor='transparent';cover(c,S.m(k),-310,-380,620,640,{z:1.05});
    T(c,P3[k],0,330,{font:IS,size:52,align:'center',color:'#2a1a1a',maxW:560,maxLines:1});c.restore();
    c.save();c.translate(cx+300,cy-360);c.rotate(.25);c.fillStyle=p.ac;rr(c,-90,-36,180,72,10);c.fill();T(c,`No. ${k+1}`,0,12,{font:PM,size:24,align:'center',upper:1,ls:3,color:ink(p.ac)});c.restore()}
  T(c,x.headline||'Wrapped and ready',W/2,1560,{font:IS,size:60,align:'center',color:p.fg,maxW:W-180,maxLines:1,p:P(t,6.6,.6)});if(x.cta)mono(c,x.cta,W/2,1640,{align:'center',color:p.ac,size:24,p:P(t,7,.5)})}});

/* ================= FAMILY 8 · COMPARE ================= */
KC({id:'kc-beforeafter',name:'Before / After',fam:'Compare',desc:'A swipe line wipes from a flat, muted “before” to the full-colour “after”, with labels that follow the line.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#B9FA70'},dur:9,pt:5,hold:[1.5,6.5],tags:['Compare','Transformation'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;const A=S.n>1?S.m(1):S.m(0),B=S.m(0),sw=E.inOut(P(t,1.4,1.4))-.18*Math.sin(Math.PI*P(t,3.2,1.2))*(t<4.4?1:0),X=W*clamp(sw);
  cover(c,A,0,0,W,H,{z:1.06,filter:S.n>1?'none':'grayscale(.85) brightness(.85) contrast(.9)'});c.save();clip(c,0,0,X,H);cover(c,B,0,0,W,H,{z:1.06,filter:'contrast(1.08) saturate(1.15)'});c.restore();
  if(X>2&&X<W-2){c.fillStyle='#fff';c.fillRect(X-3,0,6,H);c.beginPath();c.arc(X,H/2,46,0,7);c.fillStyle='#fff';c.fill();T(c,'‹ ›',X,H/2+14,{font:IT,weight:700,size:40,align:'center',color:'#111'})}
  pill(c,'Before',W-170,330,{bg:'rgba(0,0,0,.55)',fg:'#fff',size:24,alpha:1-clamp(sw*1.4)});pill(c,'After',170,330,{bg:p.ac,fg:ink(p.ac),size:24,alpha:clamp(sw*2-.2)});
  scrimB(c,W,H,.75,.55);T(c,x.headline,80,1470,{font:IT,weight:700,size:84,ls:-2,color:'#fff',maxW:900,maxLines:2,anchor:'bottom',p:P(t,4.6,.6)});mono(c,[x.brand,x.cta].filter(Boolean).join('  ·  '),80,1570,{color:p.ac,size:22,p:P(t,5,.5),maxW:900})}});

KC({id:'kc-thisorthat',name:'This or That',fam:'Compare',desc:'Split screen, two picks, a live poll bar that tips — built to get comments.',pal:{bg:'#111113',fg:'#FFFFFF',ac:'#B9FA70'},dur:8,pt:4,hold:[1,5.5],tags:['Compare','Engagement'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;const half=H/2,sp=E.outExpo(P(t,.1,.7));c.save();clip(c,0,0,W,half);cover(c,S.m(0),(1-sp)*-W,0,W,half,{z:1.1});c.restore();c.save();clip(c,0,half,W,half);cover(c,S.m(1),(1-sp)*W,half,W,half,{z:1.1,fy:.45});c.restore();
  grad(c,W,half-260,260,'rgba(0,0,0,0)','rgba(0,0,0,.6)');grad(c,W,H-300,300,'rgba(0,0,0,0)','rgba(0,0,0,.6)');
  T(c,pts3(x)[0],80,half-60,{font:IT,weight:700,size:60,color:'#fff',maxW:700,maxLines:1,p:P(t,.6,.5)});T(c,pts3(x)[1],80,H-120,{font:IT,weight:700,size:60,color:'#fff',maxW:700,maxLines:1,p:P(t,.8,.5)});
  const s=E.outBack(P(t,1,.5));c.save();c.translate(W/2,half);c.scale(s,s);c.beginPath();c.arc(0,0,92,0,7);c.fillStyle=p.ac;c.fill();T(c,'or',0,18,{font:IS,italic:1,size:70,align:'center',color:ink(p.ac)});c.restore();
  const v=.5+.14*Math.sin(Math.min(t,5)*1.7)*E.out(P(t,1.6,.8)),ap=P(t,1.6,.4);if(ap>0){c.save();c.globalAlpha=ap;rr(c,W-330,half-140,250,280,26);c.fillStyle='rgba(0,0,0,.55)';c.fill();
    [[v,'This'],[1-v,'That']].forEach(([q,l],i)=>{T(c,`${Math.round(q*100)}%`,W-205,half-60+i*140,{font:IT,weight:700,size:52,align:'center',color:'#fff'});mono(c,l,W-205,half-20+i*140,{align:'center',size:18,color:p.ac})});c.restore()}
  mono(c,'Comment your pick',W/2,300,{align:'center',size:24,color:'#fff',p:P(t,2,.5)});mono(c,x.brand,W/2,250,{align:'center',size:20,color:'rgba(255,255,255,.7)'})}});

KC({id:'kc-usvsusual',name:'Ours vs The Usual',fam:'Compare',desc:'Two columns: your brand versus “the usual”, ticks and crosses drawing row by row.',pal:{bg:'#F4F2ED',fg:'#141414',ac:'#1E8E5A'},tone:'light',dur:9,pt:5,hold:[1.5,6],tags:['Compare','Benefits'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,80,200,W-160,480);cover(c,S.m(0),80,200,W-160,480,{z:kb(t,9,1.12,1.03)});c.restore();
  const cA=620,cB=880;T(c,x.brand,cA,800,{font:IT,weight:700,size:34,align:'center',color:p.fg,maxW:230,maxLines:2,p:P(t,.4,.5),base:'middle'});T(c,'The usual',cB,800,{font:IT,weight:500,size:34,align:'center',color:rgba(p.fg,.5),p:P(t,.5,.5),base:'middle'});
  hair(c,80,850,W-80,850,rgba(p.fg,.25),2,E.outExpo(P(t,.6,.6)));
  pts3(x).slice(0,4).forEach((f,i)=>{const y=960+i*175,t0=1.2+i*.9;T(c,f,80,y+16,{font:IT,weight:600,size:46,color:p.fg,maxW:440,maxLines:1,p:P(t,t0,.4)});
    c.save();c.beginPath();c.arc(cA,y,40,0,7);c.fillStyle=rgba(p.ac,.15*P(t,t0,.3));c.fill();c.restore();tick(c,cA,y,40,P(t,t0+.25,.4),p.ac);cross(c,cB,y,40,P(t,t0+.45,.4),rgba(p.fg,.4));hair(c,80,y+75,W-80,y+75,rgba(p.fg,.1),2,1)});
  if(x.cta)T(c,x.cta+'  →',80,1680,{font:IT,weight:700,size:50,color:p.fg,p:P(t,4.6,.6),maxW:920,maxLines:1})}});

KC({id:'kc-pov',name:'POV',fam:'Compare',desc:'Native, text-on-screen POV format: the caption types in like a creator’s, over a handheld-feel shot.',pal:{bg:'#000000',fg:'#FFFFFF',ac:'#FFFFFF'},dur:8,pt:4,hold:[1,5.5],tags:['Compare','Native'],
 r(c,t,S){const{W,H,p,x}=S;const k=Math.floor(t/2.6);cover(c,S.m(k),0,0,W,H,{z:1.12+.03*Math.sin(t*1.3),px:Math.sin(t*1.7)*10,py:Math.cos(t*1.3)*8});
  const txt='POV: '+(x.headline?x.headline.charAt(0).toLowerCase()+x.headline.slice(1):'you found the one');const n=Math.floor(txt.length*clamp((t-.3)/1.6));
  c.save();c.font=`600 58px ${IT}`;const L=[];let l='';txt.slice(0,n).split(' ').forEach(w=>{if(c.measureText(l+' '+w).width>W-260&&l){L.push(l);l=w}else l=l?l+' '+w:w});L.push(l);c.restore();
  L.forEach((ln,i)=>{if(!ln)return;c.save();c.font=`600 58px ${IT}`;const w=c.measureText(ln).width+44;c.restore();rr(c,W/2-w/2,540+i*84-56,w,78,14);c.fillStyle='#fff';c.fill();T(c,ln,W/2,540+i*84,{font:IT,weight:600,size:58,align:'center',color:'#111'})});
  if(t>3.2&&x.sub){const a=P(t,3.2,.4);c.save();c.globalAlpha=a;c.font=`600 44px ${IT}`;T(c,x.sub,W/2,1420,{font:IT,weight:600,size:44,align:'center',color:'#fff',maxW:W-200,maxLines:2,shadow:'rgba(0,0,0,.6)',sb:16});c.restore()}
  mono(c,x.handle,W/2,1580,{align:'center',upper:0,size:24,color:'#fff',p:P(t,4,.5)})}});

KC({id:'kc-pricereveal',name:'Guess the Price',fam:'Compare',desc:'“Guess the price” — digits spin like a slot machine and land on your price, with a confetti pop.',pal:{bg:'#1B1464',fg:'#FFFFFF',ac:'#FFD23F'},dur:8,pt:4.8,hold:[1.5,5.5],tags:['Compare','Engagement'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);card(c,S.m(0),W/2,660,820,760,{z:1.03,alpha:E.out(P(t,.1,.5))});
  T(c,'Guess the price',W/2,1110,{font:IT,weight:800,size:82,ls:-2,align:'center',color:p.fg,p:P(t,.3,.5)});
  const price=String(x.price||'₹ 999'),done=t>3.4;const chars=price.split('');c.save();c.font=`400 150px ${AN}`;const cw=chars.map(ch=>c.measureText(ch).width),tot=cw.reduce((a,b)=>a+b,0);c.restore();let px=W/2-tot/2;
  chars.forEach((ch,i)=>{const lock=t>1.8+i*.25;const d=/\d/.test(ch)&&!lock?String(Math.floor((t*23+i*7)%10)):ch;T(c,d,px+cw[i]/2,1340,{font:AN,size:150,align:'center',color:lock?p.ac:'#fff',alpha:P(t,1.2,.3)});px+=cw[i]});
  if(done){const e=clamp((t-3.4)/1.2);for(let i=0;i<40;i++){const a=i*2.4,r=200+e*700*(.4+(i%5)/6),cx=W/2+Math.cos(a)*r,cy=1300+Math.sin(a)*r*.7+e*e*400;c.fillStyle=[p.ac,'#fff','#FF5CA8','#7CF2D6'][i%4];c.globalAlpha=1-e;c.fillRect(cx,cy,14,26);c.globalAlpha=1}
    if(x.cta)pill(c,x.cta,W/2,1560,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,3.8,.5)),alpha:P(t,3.8,.2),size:28})}
  mono(c,x.brand,W/2,250,{align:'center',size:22,color:'rgba(255,255,255,.7)'})}});

/* ================= FAMILY 9 · STORY ================= */
KC({id:'kc-bts',name:'Behind the Scenes',fam:'Story',desc:'Camcorder-style BTS: REC dot, timecode, viewfinder corners and handheld moments from the studio.',pal:{bg:'#000000',fg:'#FFFFFF',ac:'#FF3B30'},dur:10,pt:3,hold:[1,7.5],grain:.08,tags:['Story','BTS'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;const k=Math.floor(t/2.2);cover(c,S.m(k),0,0,W,H,{z:1.18+.03*Math.sin(t*2),px:Math.sin(t*2.3)*14,py:Math.cos(t*1.7)*10,filter:'contrast(1.1) saturate(.85) sepia(.1)'});
  if((t%2.2)<.12)flash(c,W,H,.35);vignette(c,W,H,.55);
  c.strokeStyle='#fff';c.lineWidth=5;const m=70,L=70;[[m,m+150],[W-m,m+150],[m,H-m-150],[W-m,H-m-150]].forEach(([cx,cy],i)=>{const sx=i%2?-1:1,sy=i>1?-1:1;c.beginPath();c.moveTo(cx,cy+sy*L);c.lineTo(cx,cy);c.lineTo(cx+sx*L,cy);c.stroke()});
  if(t%1<.6){c.beginPath();c.arc(m+50,m+200,16,0,7);c.fillStyle=p.ac;c.fill()}mono(c,'REC',m+80,m+209,{size:26,color:'#fff'});
  const tc=`00:${String(Math.floor(t)).padStart(2,'0')}:${String(Math.floor((t%1)*24)).padStart(2,'0')}`;mono(c,tc,W-m-30,m+209,{align:'right',size:26,color:'#fff'});
  mono(c,'Behind the scenes',W/2,H-m-250,{align:'center',size:24,color:'#fff',p:P(t,.4,.5)});T(c,pts3(x)[k%3]||x.headline,W/2,H-m-180,{font:IT,weight:600,size:56,align:'center',color:'#fff',maxW:W-220,maxLines:1,alpha:clamp(((t%2.2)-.2)/.3)});
  mono(c,x.brand,W/2,m+300,{align:'center',size:20,color:'rgba(255,255,255,.75)'})}});

KC({id:'kc-unbox',name:'Unboxing',fam:'Story',desc:'A branded box lid lifts away, tissue parts and the product rises out with a soft glow.',pal:{bg:'#EFE8DD',fg:'#2B2118',ac:'#1E2A3A'},tone:'light',dur:9,pt:4.2,hold:[1.5,6],tags:['Story','Unboxing'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const lid=E.inOut(P(t,1.2,1)),rise=E.outExpo(P(t,2.2,1.2)),bx=W/2-380,by=900,bw=760,bh=520;
  c.save();c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=60;c.shadowOffsetY=30;c.fillStyle=p.ac;c.fillRect(bx,by,bw,bh);c.restore();
  c.save();clip(c,0,0,W,by+40);const iw=600,ih=640;cover(c,S.m(0),W/2-iw/2,by+60-ih*rise,iw,ih,{z:1.04});c.restore();
  c.fillStyle=mixHex(p.ac,'#000000',.2);c.fillRect(bx,by,bw,40);c.fillStyle=p.ac;c.fillRect(bx,by+40,bw,bh-40);T(c,x.brand,W/2,by+bh/2+40,{font:IS,size:60,align:'center',color:ink(p.ac),ls:6,upper:1,maxW:bw-120,maxLines:1});
  if(lid<1){c.save();c.translate(W/2+lid*500,by-20-lid*600);c.rotate(lid*.5);c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=40;c.fillStyle=mixHex(p.ac,'#ffffff',.08);c.fillRect(-bw/2-20,-50,bw+40,90);c.restore()}
  if(rise>.5){c.save();c.globalCompositeOperation='screen';const g=c.createRadialGradient(W/2,by-100,20,W/2,by-100,600);g.addColorStop(0,'rgba(255,240,210,.45)');g.addColorStop(1,'rgba(255,240,210,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore()}
  mono(c,'Unboxing',W/2,240,{align:'center',size:24,color:p.fg,p:P(t,.2,.5)});T(c,x.headline,W/2,1560,{font:IS,size:66,align:'center',color:p.fg,maxW:W-180,maxLines:2,p:P(t,3.4,.6)});if(x.cta)mono(c,x.cta,W/2,1680,{align:'center',size:22,color:p.fg,p:P(t,3.8,.5)})}});

KC({id:'kc-dayin',name:'A Day With',fam:'Story',desc:'Morning, afternoon, evening: a timeline of moments with the product through the day.',pal:{bg:'#F6EFE6',fg:'#2A2420',ac:'#E07A3F'},tone:'light',dur:10,pt:5,hold:[1.4,7.5],tags:['Story','Lifestyle'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const tm=['8:00','13:00','20:00'],seg=2.4,t0=1,k=Math.min(2,Math.floor(Math.max(0,t-t0)/seg)),lt=t-t0-k*seg;
  T(c,'A day with',80,230,{font:IS,italic:1,size:64,color:p.fg,p:P(t,.1,.5)});T(c,x.brand,80,320,{font:IS,size:84,color:p.fg,maxW:920,maxLines:1,p:P(t,.25,.5)});
  hair(c,120,420,120,1700,rgba(p.fg,.2),3,1);c.fillStyle=p.ac;c.fillRect(118,420,6,1280*clamp((t-t0)/(seg*3)));
  for(let i=0;i<=k&&t>=t0;i++){const y=470+i*420,a=E.outExpo(clamp((t-t0-i*seg)/.6));c.save();c.globalAlpha=a;c.beginPath();c.arc(121,y+20,16,0,7);c.fillStyle=p.ac;c.fill();
    mono(c,tm[i],170,y+30,{color:p.fg,size:24});c.save();clip(c,170+(1-a)*60,y+60,560,320);cover(c,S.m(i),170+(1-a)*60,y+60,560,320,{z:1.08});c.restore();T(c,pts3(x)[i],760,y+180,{font:IS,italic:1,size:44,color:p.fg,maxW:260,maxLines:3});c.restore()}
  if(t>t0+seg*3-.2&&x.cta)mono(c,x.cta+'  →',170,1760,{color:p.ac,size:24,p:P(t,t0+seg*3,.5)})}});

KC({id:'kc-founder',name:'Founder’s Note',fam:'Story',desc:'A personal letter: the note writes itself beside a photo, closing with a signature line.',pal:{bg:'#F7F3EC',fg:'#26221E',ac:'#26221E'},tone:'light',dur:11,pt:7,hold:[1.5,8],tags:['Story','Founder'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,80,200,W-160,700);cover(c,S.m(0),80,200,W-160,700,{z:kb(t,11,1.12,1.03),filter:'contrast(1.02) saturate(.9) sepia(.08)'});c.restore();
  mono(c,'A note from us',80,980,{color:p.fg,size:22,p:P(t,.4,.5)});const body=join2(x.sub,x.headline)||'Thank you for being here.';
  c.save();c.font=`italic 400 56px ${IS}`;const L=[];let l='';body.split(' ').forEach(w=>{if(c.measureText(l+' '+w).width>W-160&&l){L.push(l);l=w}else l=l?l+' '+w:w});L.push(l);c.restore();
  const tot=L.join('').length;let sh=Math.floor(tot*clamp((t-1)/4.5));L.slice(0,6).forEach((ln,i)=>{const s2=ln.slice(0,Math.max(0,sh));sh-=ln.length;T(c,s2,80,1090+i*72,{font:IS,italic:1,size:56,color:p.fg})});
  const sy=1090+Math.min(6,L.length)*72+70;hair(c,80,sy,300,sy,p.fg,2,E.outExpo(P(t,5.8,.8)));T(c,'— '+(x.brand||''),80,sy+70,{font:IS,italic:1,size:52,color:p.fg,maxW:900,maxLines:1,p:P(t,6.2,.6)})}});

KC({id:'kc-madeby',name:'How It’s Made',fam:'Story',desc:'From idea to you: a horizontal process line with numbered stages, close-ups and timestamps.',pal:{bg:'#1A1714',fg:'#F2EADF',ac:'#D9A86C'},dur:11,pt:6,hold:[1.5,8],tags:['Story','Process'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const st=[...pts3(x),'Made for you'].slice(0,4),seg=2.1,t0=1.2,k=Math.min(st.length-1,Math.floor(Math.max(0,t-t0)/seg)),lt=t-t0-k*seg;
  T(c,'How it’s made',80,260,{font:IS,size:90,color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,80,320,{color:p.ac,size:22,p:P(t,.3,.5)});
  const y0=430,x0=110,x1=W-110;hair(c,x0,y0,x1,y0,rgba(p.fg,.2),3,1);c.fillStyle=p.ac;c.fillRect(x0,y0-2,(x1-x0)*clamp((t-t0)/(seg*st.length)),5);
  st.forEach((s,i)=>{const cx=x0+(x1-x0)*(i/(st.length-1)),on=t>=t0+i*seg;c.beginPath();c.arc(cx,y0,on?18:12,0,7);c.fillStyle=on?p.ac:rgba(p.fg,.3);c.fill();mono(c,String(i+1).padStart(2,'0'),cx,y0+60,{align:'center',size:20,color:on?p.ac:rgba(p.fg,.4)})});
  if(t>=t0){c.save();clip(c,80,560,W-160,900);cover(c,S.m(k),80,560,W-160,900,{z:1.5-.2*clamp(lt/seg),fx:[.5,.35,.62,.5][k],fy:[.3,.55,.75,.45][k],filter:'contrast(1.06) saturate(.92)'});c.restore();
    mono(c,`Stage ${String(k+1).padStart(2,'0')}`,80,1540,{color:p.ac,size:22,p:clamp(lt/.3)});kin(c,st[k],80,1630,{t:lt,t0:.15,font:IS,size:70,maxW:920,maxLines:1,color:p.fg})}}});

/* ================= FAMILY 10 · SOCIAL ================= */
KC({id:'kc-giveaway',name:'Giveaway',fam:'Social',desc:'A giveaway announcement: the prize, then three entry steps that tick off, with the closing date.',pal:{bg:'#FF5CA8',fg:'#111111',ac:'#111111'},tone:'light',dur:10,pt:6,hold:[1.6,7],tags:['Social','Giveaway'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const g=1.3-.3*E.outBack(P(t,.1,.6));c.save();c.translate(W/2,330);c.scale(g,g);T(c,'Giveaway',0,0,{font:AN,size:180,upper:1,align:'center',base:'middle',color:ink(p.bg),alpha:P(t,.1,.2)});c.restore();
  card(c,S.m(0),W/2,780,640,560,{z:1.03,alpha:E.out(P(t,.5,.5))});T(c,'Win: '+(x.headline||x.brand),W/2,1150,{font:IT,weight:700,size:52,align:'center',color:ink(p.bg),maxW:W-160,maxLines:2,p:P(t,1,.5)});
  const steps=['Follow '+(x.handle||'us'),'Like this post','Tag a friend who needs it'];steps.forEach((s,i)=>{const t0=2.2+i*1,y=1320+i*120;const a=E.outExpo(P(t,t0,.5));if(a<=0)return;c.save();c.globalAlpha=a;rr(c,80,y-50,W-160,96,48);c.fillStyle='rgba(255,255,255,.85)';c.fill();c.restore();
    c.save();c.globalAlpha=a;c.beginPath();c.arc(140,y-2,30,0,7);c.fillStyle='#111';c.fill();c.restore();tick(c,140,y-2,30,P(t,t0+.3,.4),'#fff');T(c,s,200,y+14,{font:IT,weight:600,size:40,color:'#111',maxW:W-320,maxLines:1,alpha:a})});
  mono(c,x.label||'Winner announced soon',W/2,1720,{align:'center',color:ink(p.bg),size:22,p:P(t,5.6,.5)})}});

KC({id:'kc-pick',name:'Pick a Number',fam:'Social',desc:'Three numbered picks shown one by one, then all together: “comment 1, 2 or 3”.',pal:{bg:'#0F0F10',fg:'#FFFFFF',ac:'#B9FA70'},dur:9,pt:6.6,hold:[1,6],tags:['Social','Engagement'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const seg=1.6,t0=.8,all=E.inOut(P(t,t0+seg*3,.8));
  T(c,'Which one are you?',W/2,250,{font:IT,weight:700,size:64,ls:-1,align:'center',color:p.fg,p:P(t,.1,.5),maxW:W-160,maxLines:1});
  for(let i=0;i<3;i++){const st=t0+i*seg,on=t>=st;if(!on)continue;const solo={x:80,y:360,w:W-160,h:1100},tile={x:80+i*((W-160+20)/3),y:520,w:(W-160-40)/3,h:620};
    const L=(a,b)=>a+(b-a)*all;const cur=i===Math.min(2,Math.floor((t-t0)/seg));if(!cur&&all<=0)continue;const r={x:L(solo.x,tile.x),y:L(solo.y,tile.y),w:L(solo.w,tile.w),h:L(solo.h,tile.h)};
    c.save();clip(c,r.x,r.y,r.w,r.h);cover(c,S.m(i),r.x,r.y,r.w,r.h,{z:1.08});c.restore();c.save();c.beginPath();c.arc(r.x+70*(1-all)+50*all,r.y+70*(1-all)+50*all,L(56,40),0,7);c.fillStyle=p.ac;c.fill();c.restore();
    T(c,String(i+1),r.x+70*(1-all)+50*all,r.y+70*(1-all)+50*all+L(22,16),{font:IT,weight:800,size:L(60,44),align:'center',color:ink(p.ac)});
    if(all<.5)T(c,pts3(x)[i],r.x+40,r.y+r.h-50,{font:IT,weight:700,size:58,color:'#fff',maxW:r.w-80,maxLines:1,shadow:'rgba(0,0,0,.6)',sb:20});else T(c,pts3(x)[i],r.x+r.w/2,r.y+r.h+60,{font:IT,weight:600,size:30,align:'center',color:'#fff',maxW:r.w,maxLines:2})}
  if(all>0){T(c,'Comment 1, 2 or 3',W/2,1420,{font:IT,weight:800,size:76,ls:-2,align:'center',color:p.ac,alpha:all,maxW:W-160,maxLines:1});mono(c,x.brand,W/2,1520,{align:'center',size:22,color:'#fff',alpha:all})}}});

KC({id:'kc-lineup',name:'The Lineup',fam:'Social',desc:'The range in a row: products glide past on a shelf line with names and prices, then settle.',pal:{bg:'#EDEAE4',fg:'#151515',ac:'#151515'},tone:'light',dur:9,pt:6,hold:[1,6],tags:['Social','Range'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=Math.max(3,Math.min(5,S.n||3)),cw=440,gap=50,pan=80+(1-E.inOut(P(t,.4,4.6)))*(W*.9);
  T(c,'The lineup',80,260,{font:IS,size:96,color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,80,320,{color:rgba(p.fg,.6),size:22,p:P(t,.3,.5)});
  const sy=1250;c.fillStyle=mixHex(p.bg,'#000000',.08);c.fillRect(0,sy,W,14);
  for(let i=0;i<n;i++){const cx=pan+i*(cw+gap)+cw/2;if(cx<-cw||cx>W+cw)continue;c.save();c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=40;c.shadowOffsetY=20;c.fillStyle='#fff';c.fillRect(cx-cw/2,sy-700,cw,700);c.restore();
    cover(c,S.m(i),cx-cw/2+14,sy-686,cw-28,560,{z:1.04});T(c,[x.f1,x.f2,x.f3,x.label,x.headline][i]||x.brand,cx-cw/2+24,sy-60,{font:IS,size:40,color:p.fg,maxW:cw-60,maxLines:1});mono(c,i===0?x.price:'',cx-cw/2+24,sy-24,{color:rgba(p.fg,.6),size:20,upper:0})}
  T(c,x.headline,80,1480,{font:IS,italic:1,size:64,color:p.fg,maxW:920,maxLines:2,p:P(t,5.6,.6)});if(x.cta)mono(c,x.cta+'  →',80,1640,{color:p.fg,size:24,p:P(t,6,.5)})}});

KC({id:'kc-newin',name:'New In',fam:'Social',desc:'Swipe-style new arrivals: cards flick across with a NEW tag and swipe dots, like a carousel in motion.',pal:{bg:'#101010',fg:'#FFFFFF',ac:'#B9FA70'},dur:9,pt:2.4,hold:[1,6.5],tags:['Social','New arrivals'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=Math.max(3,Math.min(5,S.n||3)),seg=1.6,k=Math.min(n-1,Math.floor(t/seg)),lt=t-k*seg,sw=k<n-1?E.inOut(clamp((lt-1.15)/.45)):0;
  T(c,'New in',80,280,{font:AN,size:150,upper:1,color:p.fg,p:P(t,.1,.5)});mono(c,x.brand,W-80,270,{align:'right',color:p.ac,size:22,maxW:500});
  const draw=(i,dx,a)=>{if(i>=n)return;c.save();c.globalAlpha=a;c.translate(W/2+dx,980);c.rotate(dx/W*.12);c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=60;c.shadowOffsetY=30;rr(c,-380,-520,760,1040,30);c.fillStyle='#1c1c1c';c.fill();c.shadowColor='transparent';c.save();rr(c,-380,-520,760,1040,30);c.clip();cover(c,S.m(i),-380,-520,760,1040,{z:1.05});c.restore();
    pill(c,'New',-260,-430,{bg:p.ac,fg:ink(p.ac),size:24});T(c,[x.f1,x.f2,x.f3,x.headline,x.label][i]||x.brand,-340,460,{font:IT,weight:700,size:48,color:'#fff',maxW:680,maxLines:1,shadow:'rgba(0,0,0,.6)',sb:18});c.restore()};
  draw(k+1,0,sw*.0+(k<n-1?1:0)*Math.min(1,sw*3));draw(k,-sw*W*1.1,1);
  for(let i=0;i<n;i++){c.beginPath();c.arc(W/2-(n-1)*18+i*36,1600,i===k?10:7,0,7);c.fillStyle=i===k?p.ac:'rgba(255,255,255,.35)';c.fill()}if(x.cta)mono(c,x.cta+'  →',W/2,1690,{align:'center',size:24,color:'#fff'})}});

KC({id:'kc-festive',name:'Season’s Greetings',fam:'Social',desc:'Warm bokeh lights drift over the product as a greeting writes in — for any festival or season.',pal:{bg:'#1A0F0A',fg:'#FFF3DF',ac:'#F2B544'},dur:10,pt:5,hold:[1.5,7],grain:.05,tags:['Social','Festive'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,10,1.14,1.03),filter:'brightness(.82) saturate(1.05)'});c.fillStyle=rgba(p.bg,.35);c.fillRect(0,0,W,H);
  c.save();c.globalCompositeOperation='screen';for(let i=0;i<34;i++){const sx=(i*97%W),sy=((i*173)%H+t*(20+i%5*8))%H,r=18+(i%6)*10,a=.15+.25*Math.abs(Math.sin(t*.8+i));const g=c.createRadialGradient(sx,sy,0,sx,sy,r);g.addColorStop(0,rgba(p.ac,a));g.addColorStop(1,rgba(p.ac,0));c.fillStyle=g;c.fillRect(sx-r,sy-r,r*2,r*2)}c.restore();
  scrimB(c,W,H,.75,.45);const greet=/greet|festive|season|diwali|eid|christmas|holiday|new year|onam|pongal|navratri|holi/i.test(x.label||'')?x.label:'Season’s greetings';
  kin(c,greet,W/2,1260,{t,t0:.8,font:IS,italic:1,size:110,maxW:W-160,maxLines:2,color:p.fg,align:'center'});hair(c,W/2-120,1380,W/2+120,1380,p.ac,2,E.outExpo(P(t,2.4,.8)));
  T(c,'from all of us at',W/2,1450,{font:IT,size:32,align:'center',color:rgba(p.fg,.8),p:P(t,2.8,.6)});T(c,x.brand,W/2,1530,{font:IS,size:64,align:'center',color:p.fg,maxW:W-200,maxLines:1,p:P(t,3.1,.6)})}});

/* =====================================================================
   BATCH 4 · 25 POSTS — D2C formats (static 1080×1350)
   ===================================================================== */
const B4tile=(c,m,x0,y0,w,h,o={})=>{c.save();clip(c,x0,y0,w,h);cover(c,m,x0,y0,w,h,{z:o.z||1.06,fx:o.fx,fy:o.fy,filter:o.filter});c.restore()};

/* ---- Explain ---- */
KP({id:'kc-p-reasons',name:'3 Reasons',fam:'Explain',desc:'Three numbered reasons beside the product, set big and confident.',pal:{bg:'#111113',fg:'#F5F4EF',ac:'#B9FA70'},tags:['Explain','List'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),W*.52,0,W*.48,H);const R=pts3(x).slice(0,3);
  T(c,R.length+' reasons',70,170,{font:IT,weight:700,size:84,ls:-3,color:p.fg});T(c,'to love '+(x.brand||'it'),70,250,{font:IS,italic:1,size:58,color:p.ac,maxW:W*.52-110,maxLines:1});
  R.forEach((r,i)=>{const y=420+i*270;T(c,String(i+1).padStart(2,'0'),70,y+80,{font:IT,weight:200,size:110,color:p.ac});T(c,r,70,y+150,{font:IT,weight:600,size:44,color:p.fg,maxW:W*.52-120,maxLines:2});hair(c,70,y+230,W*.52-50,y+230,rgba(p.fg,.15),2,1)});
  if(x.cta)mono(c,x.cta+'  →',70,H-60,{color:p.fg,size:20,maxW:W*.52-110})}});
KP({id:'kc-p-howto',name:'How To',fam:'Explain',desc:'A three-step guide: numbered close-ups in a row with one-line instructions.',pal:{bg:'#F4F2ED',fg:'#141414',ac:'#141414'},tone:'light',tags:['Explain','Tutorial'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,'How to',70,110,{color:p.fg,size:22});T(c,x.headline,70,190,{font:IT,weight:700,size:66,ls:-2,color:p.fg,maxW:W-140,maxLines:2});
  const st=pts3(x).slice(0,3),w=(W-140-2*20)/3;st.forEach((s,i)=>{const x0=70+i*(w+20);B4tile(c,S.m(i),x0,380,w,680,{z:1.5,fx:[.5,.35,.62][i],fy:[.35,.55,.75][i]});c.beginPath();c.arc(x0+44,424,30,0,7);c.fillStyle=p.fg;c.fill();T(c,String(i+1),x0+44,436,{font:IT,weight:700,size:32,align:'center',color:p.bg});
    T(c,s,x0,1110,{font:IT,weight:600,size:34,color:p.fg,maxW:w,maxLines:3})});foot(c,S,H-100,p.fg,{right:x.cta})}});
KP({id:'kc-p-checklist',name:'The Checklist',fam:'Explain',desc:'Ticked benefit rows over a softened product shot — fast to read, easy to save.',pal:{bg:'#0F1A14',fg:'#FFFFFF',ac:'#7CF2A6'},tags:['Explain','Checklist'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05});c.fillStyle=rgba(p.bg,.62);c.fillRect(0,0,W,H);mono(c,x.brand,70,110,{color:p.ac,size:20,maxW:900});T(c,x.headline,70,210,{font:IT,weight:700,size:76,ls:-2,color:'#fff',maxW:W-140,maxLines:2});
  const L=[...pts3(x),x.price?`Just ${x.price}`:null].filter(Boolean).slice(0,4);L.forEach((s,i)=>{const y=520+i*170;rr(c,70,y-62,W-140,130,26);c.fillStyle='rgba(255,255,255,.1)';c.fill();c.beginPath();c.arc(140,y+3,34,0,7);c.fillStyle=p.ac;c.fill();tick(c,140,y+3,34,1,ink(p.ac));T(c,s,200,y+18,{font:IT,weight:600,size:42,color:'#fff',maxW:W-300,maxLines:1})});
  if(x.cta)mono(c,x.cta,70,H-70,{color:'#fff',size:22,maxW:900})}});
KP({id:'kc-p-qa',name:'Asked & Answered',fam:'Explain',desc:'A chat thread over a soft photo: one question, three answers, your call to action.',pal:{bg:'#ECE9E4',fg:'#151515',ac:'#2F6BFF'},tone:'light',tags:['Explain','Chat'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.1,filter:'blur(18px) brightness(1.05)'});c.fillStyle=rgba(p.bg,.55);c.fillRect(0,0,W,H);
  const bub=(txt,right,y,col,fg)=>{c.save();c.font=`500 52px ${IT}`;const L=[];let l='';String(txt).split(' ').forEach(w=>{if(c.measureText(l+' '+w).width>700&&l){L.push(l);l=w}else l=l?l+' '+w:w});L.push(l);const w=Math.max(...L.map(z=>c.measureText(z).width))+76,h=L.slice(0,3).length*66+50,bx=right?W-70-w:70;rr(c,bx,y,w,h,36);c.fillStyle=col;c.fill();L.slice(0,3).forEach((z,i)=>T(c,z,bx+38,y+72+i*66,{font:IT,weight:500,size:52,color:fg}));c.restore();return h+30};
  mono(c,x.brand,W/2,100,{align:'center',color:p.fg,size:20,maxW:900});let y=170;y+=bub(x.headline?`Why ${x.headline.toLowerCase().replace(/[.!?]$/,'')}?`:'Why this one?',true,y,p.ac,'#fff');pts3(x).forEach(a=>{y+=bub(a,false,y,'#fff',p.fg)});if(x.cta)bub(x.cta+' →',true,y,p.fg,'#fff')}});
KP({id:'kc-p-didyouknow',name:'Did You Know',fam:'Explain',desc:'A bold curiosity post: “Did you know?”, one fact in italic serif, product as proof.',pal:{bg:'#FFE45C',fg:'#111111',ac:'#111111'},tone:'light',tags:['Explain','Fact'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Did you know?',70,190,{font:AN,size:150,upper:1,color:p.fg,maxW:W-140,maxLines:1});
  T(c,x.sub||x.headline,70,330,{font:IS,italic:1,size:72,color:p.fg,maxW:W-140,maxLines:4,lh:1.08});B4tile(c,S.m(0),70,760,W-140,470,{z:1.08});mono(c,[x.brand,x.cta].filter(Boolean).join('  ·  '),70,H-50,{color:p.fg,size:20,maxW:W-140})}});

/* ---- Sell ---- */
KP({id:'kc-p-sale',name:'The Sale',fam:'Sell',desc:'A sale poster: big condensed headline, the price in a seal, your end-date line, the product.',pal:{bg:'#C8102E',fg:'#FFFFFF',ac:'#FFE45C'},tags:['Sell','Sale'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),0,560,W,H-560);mono(c,x.label||'Sale',70,110,{color:ink(p.bg),size:22,maxW:900});
  T(c,x.headline||'The sale is on',70,190,{font:AN,size:150,upper:1,color:ink(p.bg),maxW:W-140,maxLines:2,lh:.92,base:'top'});
  if(x.price){c.save();c.translate(W-220,700);c.rotate(-.08);c.beginPath();c.arc(0,0,160,0,7);c.fillStyle=p.ac;c.fill();T(c,'Now',0,-48,{font:PM,size:22,align:'center',upper:1,ls:4,color:ink(p.ac)});T(c,x.price,0,40,{font:AN,size:fit(c,x.price,AN,400,250,90),align:'center',color:ink(p.ac)});c.restore()}
  if(x.cta)pill(c,x.cta,W/2,H-90,{bg:'#fff',fg:'#111',size:28})}});
KP({id:'kc-p-restock',name:'Back in Stock',fam:'Sell',desc:'A solid “Back in stock” stamp across the product, with the line and call to action below.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Sell','Restock'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05});scrimB(c,W,H,.85,.45);c.save();c.translate(W/2,460);c.rotate(-.1);rr(c,-360,-120,720,240,24);c.fillStyle=p.ac;c.fill();c.strokeStyle=ink(p.ac);c.lineWidth=6;rr(c,-342,-102,684,204,16);c.stroke();
  T(c,'Back in',0,-10,{font:AN,size:100,upper:1,align:'center',color:ink(p.ac)});T(c,'stock',0,92,{font:AN,size:100,upper:1,align:'center',color:ink(p.ac)});c.restore();
  T(c,x.headline,70,1120,{font:IT,weight:700,size:70,ls:-2,color:'#fff',maxW:W-140,maxLines:2,anchor:'bottom'});mono(c,[x.brand,x.cta].filter(Boolean).join('   ·   '),70,1220,{color:p.ac,size:22,maxW:W-140})}});
KP({id:'kc-p-drop',name:'The Drop',fam:'Sell',desc:'A drop announcement: the date line huge, a blurred teaser of the product, the lock icon.',pal:{bg:'#0A0A0A',fg:'#FFFFFF',ac:'#FF5CA8'},tags:['Sell','Launch'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.15,filter:'blur(26px) brightness(.55)'});const cx=W/2,cy=430;c.strokeStyle=p.fg;c.lineWidth=16;c.beginPath();c.arc(cx,cy-70,80,Math.PI,0);c.lineTo(cx+80,cy-10);c.moveTo(cx-80,cy-70);c.lineTo(cx-80,cy-10);c.stroke();rr(c,cx-125,cy-20,250,200,26);c.fillStyle=p.fg;c.fill();
  mono(c,'The drop',W/2,780,{align:'center',color:p.ac,size:26});T(c,x.label||'Coming soon',W/2,880,{font:IT,weight:800,size:90,ls:-3,align:'center',color:p.fg,maxW:W-140,maxLines:2});T(c,x.headline,W/2,1110,{font:IS,italic:1,size:50,align:'center',color:rgba(p.fg,.85),maxW:W-180,maxLines:2});mono(c,x.handle,W/2,H-70,{align:'center',upper:0,color:'#fff',size:22})}});
KP({id:'kc-p-bundle',name:'The Bundle',fam:'Sell',desc:'Three product tiles joined by plus signs, equalling one bundle price.',pal:{bg:'#F3EFE8',fg:'#1A1A1A',ac:'#E2552E'},tone:'light',tags:['Sell','Bundle'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,x.headline||'Better together',W/2,170,{font:IS,size:72,align:'center',color:p.fg,maxW:W-140,maxLines:2});const n=Math.max(2,Math.min(3,S.n)),w=n===3?270:380,gap=(W-140-n*w)/(n-1);
  for(let i=0;i<n;i++){const x0=70+i*(w+gap);c.save();c.shadowColor='rgba(0,0,0,.15)';c.shadowBlur=30;c.shadowOffsetY=12;c.fillStyle='#fff';c.fillRect(x0,330,w,460);c.restore();B4tile(c,S.m(i),x0+12,342,w-24,360);T(c,pts3(x)[i],x0+w/2,760,{font:IT,weight:600,size:26,align:'center',color:p.fg,maxW:w-30,maxLines:1});if(i<n-1)T(c,'+',x0+w+gap/2,600,{font:IT,weight:300,size:70,align:'center',color:p.ac})}
  T(c,'=',W/2,930,{font:IT,weight:200,size:120,align:'center',color:p.ac});T(c,x.price||'One price',W/2,1110,{font:AN,size:fit(c,x.price||'One price',AN,400,W-240,170),align:'center',color:p.fg});T(c,'for the set',W/2,1180,{font:IS,italic:1,size:44,align:'center',color:p.fg});if(x.cta)mono(c,x.cta,W/2,H-60,{align:'center',color:p.fg,size:22})}});
KP({id:'kc-p-gift',name:'Gift Guide',fam:'Sell',desc:'A ribboned gift card with a tag: the product as the perfect present.',pal:{bg:'#7A1F2B',fg:'#FFF6EC',ac:'#E8C07A'},tags:['Sell','Gifting'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'The gift guide',W/2,150,{font:IS,italic:1,size:88,align:'center',color:p.fg});mono(c,x.brand,W/2,205,{align:'center',color:p.ac,size:20,maxW:900});
  c.save();c.translate(W/2,720);c.rotate(-.02);c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=50;c.shadowOffsetY=20;c.fillStyle='#FFF6EC';c.fillRect(-340,-420,680,840);c.restore();B4tile(c,S.m(0),W/2-320,320,640,660);
  c.fillStyle=rgba(p.ac,.92);c.fillRect(W/2-16,300,32,840);c.fillRect(W/2-340,620,680,32);c.save();c.translate(W/2+300,330);c.rotate(.22);c.fillStyle=p.ac;rr(c,-110,-40,220,80,10);c.fill();T(c,'For you',0,14,{font:IS,italic:1,size:36,align:'center',color:ink(p.ac)});c.restore();
  T(c,x.headline||'Wrapped and ready',W/2,1100,{font:IS,size:50,align:'center',color:'#2a1a1a',maxW:600,maxLines:1});T(c,pts3(x).join(' · '),W/2,1210,{font:IT,size:28,align:'center',color:p.fg,maxW:W-160,maxLines:1});if(x.cta)mono(c,x.cta,W/2,H-60,{align:'center',color:p.ac,size:22})}});

/* ---- Compare ---- */
KP({id:'kc-p-beforeafter',name:'Before / After',fam:'Compare',desc:'A clean split: muted “before” on the left, full-colour “after” on the right, labelled.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Compare','Transformation'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;const A=S.n>1?S.m(1):S.m(0);c.save();clip(c,0,0,W/2,H);cover(c,A,0,0,W,H,{z:1.04,filter:S.n>1?'none':'grayscale(.85) brightness(.85) contrast(.9)'});c.restore();c.save();clip(c,W/2,0,W/2,H);cover(c,S.m(0),0,0,W,H,{z:1.04,filter:'contrast(1.08) saturate(1.15)'});c.restore();
  c.fillStyle='#fff';c.fillRect(W/2-3,0,6,H);c.beginPath();c.arc(W/2,H/2,44,0,7);c.fill();T(c,'‹ ›',W/2,H/2+14,{font:IT,weight:700,size:38,align:'center',color:'#111'});
  pill(c,'Before',190,110,{bg:'rgba(0,0,0,.55)',fg:'#fff',size:24});pill(c,'After',W-190,110,{bg:p.ac,fg:ink(p.ac),size:24});scrimB(c,W,H,.75,.6);T(c,x.headline,70,1240,{font:IT,weight:700,size:70,ls:-2,color:'#fff',maxW:W-140,maxLines:2,anchor:'bottom'})}});
KP({id:'kc-p-thisorthat',name:'This or That',fam:'Compare',desc:'Two picks stacked with a big “or” — ask your audience to choose in the comments.',pal:{bg:'#111113',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Compare','Engagement'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;const h=H/2;B4tile(c,S.m(0),0,0,W,h);B4tile(c,S.m(1),0,h,W,h,{fy:.45});grad(c,W,h-220,220,'rgba(0,0,0,0)','rgba(0,0,0,.6)');grad(c,W,H-240,240,'rgba(0,0,0,0)','rgba(0,0,0,.6)');
  T(c,pts3(x)[0],70,h-50,{font:IT,weight:700,size:56,color:'#fff',maxW:700,maxLines:1});T(c,pts3(x)[1],70,H-60,{font:IT,weight:700,size:56,color:'#fff',maxW:700,maxLines:1});
  c.beginPath();c.arc(W-160,h,90,0,7);c.fillStyle=p.ac;c.fill();T(c,'or',W-160,h+20,{font:IS,italic:1,size:72,align:'center',color:ink(p.ac)});pill(c,'Comment your pick',W/2,90,{bg:'rgba(0,0,0,.55)',fg:'#fff',size:22})}});
KP({id:'kc-p-vs',name:'Ours vs The Usual',fam:'Compare',desc:'A comparison table: your brand versus the usual, ticks and crosses row by row.',pal:{bg:'#F4F2ED',fg:'#141414',ac:'#1E8E5A'},tone:'light',tags:['Compare','Benefits'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),70,70,W-140,420);const cA=640,cB=900;T(c,x.brand,cA,590,{font:IT,weight:700,size:32,align:'center',color:p.fg,maxW:230,maxLines:2,base:'middle'});T(c,'The usual',cB,590,{font:IT,weight:500,size:32,align:'center',color:rgba(p.fg,.5),base:'middle'});
  hair(c,70,640,W-70,640,rgba(p.fg,.25),2,1);pts3(x).slice(0,4).forEach((f,i)=>{const y=730+i*150;T(c,f,70,y+16,{font:IT,weight:600,size:42,color:p.fg,maxW:460,maxLines:1});c.beginPath();c.arc(cA,y,38,0,7);c.fillStyle=rgba(p.ac,.15);c.fill();tick(c,cA,y,38,1,p.ac);cross(c,cB,y,38,1,rgba(p.fg,.4));hair(c,70,y+70,W-70,y+70,rgba(p.fg,.1),2,1)});
  if(x.cta)T(c,x.cta+'  →',70,H-60,{font:IT,weight:700,size:42,color:p.fg,maxW:W-140,maxLines:1})}});
KP({id:'kc-p-pov',name:'POV',fam:'Compare',desc:'Native POV text boxes over a full-bleed shot — reads like a creator’s post.',pal:{bg:'#000000',fg:'#FFFFFF',ac:'#FFFFFF'},tags:['Compare','Native'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05});const txt='POV: '+(x.headline?x.headline.charAt(0).toLowerCase()+x.headline.slice(1):'you found the one');c.save();c.font=`600 56px ${IT}`;const L=[];let l='';txt.split(' ').forEach(w=>{if(c.measureText(l+' '+w).width>W-240&&l){L.push(l);l=w}else l=l?l+' '+w:w});L.push(l);c.restore();
  L.slice(0,3).forEach((ln,i)=>{c.save();c.font=`600 56px ${IT}`;const w=c.measureText(ln).width+44;c.restore();rr(c,W/2-w/2,330+i*82-54,w,76,14);c.fillStyle='#fff';c.fill();T(c,ln,W/2,330+i*82,{font:IT,weight:600,size:56,align:'center',color:'#111'})});
  if(x.sub)T(c,x.sub,W/2,1180,{font:IT,weight:600,size:40,align:'center',color:'#fff',maxW:W-180,maxLines:2,shadow:'rgba(0,0,0,.6)',sb:16});mono(c,x.handle,W/2,H-60,{align:'center',upper:0,color:'#fff',size:22})}});
KP({id:'kc-p-guess',name:'Guess the Price',fam:'Compare',desc:'“Guess the price” with the product and a question mark — answer revealed in the caption.',pal:{bg:'#1B1464',fg:'#FFFFFF',ac:'#FFD23F'},tags:['Compare','Engagement'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);card(c,S.m(0),W/2,560,820,760,{z:1.03});T(c,'Guess the price',W/2,1060,{font:IT,weight:800,size:84,ls:-2,align:'center',color:p.fg});
  T(c,((String(x.price||'').match(/^[^\d]*/)||[''])[0].trim()+' ? ? ?').trim(),W/2,1210,{font:AN,size:130,align:'center',color:p.ac});mono(c,'Answer in the caption · '+(x.brand||''),W/2,H-50,{align:'center',color:'rgba(255,255,255,.7)',size:20,maxW:W-160})}});

/* ---- Story ---- */
KP({id:'kc-p-bts',name:'Behind the Scenes',fam:'Story',desc:'A viewfinder frame with REC and timecode over a candid studio moment.',pal:{bg:'#000000',fg:'#FFFFFF',ac:'#FF3B30'},grain:.08,tags:['Story','BTS'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(1)||S.m(0),0,0,W,H,{z:1.08,filter:'contrast(1.1) saturate(.85) sepia(.1)'});vignette(c,W,H,.55);c.strokeStyle='#fff';c.lineWidth=5;const m=60,L=70;[[m,m],[W-m,m],[m,H-m],[W-m,H-m]].forEach(([cx,cy],i)=>{const sx=i%2?-1:1,sy=i>1?-1:1;c.beginPath();c.moveTo(cx,cy+sy*L);c.lineTo(cx,cy);c.lineTo(cx+sx*L,cy);c.stroke()});
  c.beginPath();c.arc(m+50,m+60,16,0,7);c.fillStyle=p.ac;c.fill();mono(c,'REC',m+80,m+69,{size:26});mono(c,'00:12:08',W-m-30,m+69,{align:'right',size:26});mono(c,'Behind the scenes',W/2,H-m-120,{align:'center',size:24});T(c,x.headline||x.brand,W/2,H-m-50,{font:IT,weight:600,size:52,align:'center',color:'#fff',maxW:W-200,maxLines:1})}});
KP({id:'kc-p-unbox',name:'Unboxing',fam:'Story',desc:'The product rising from its branded box, with a soft glow and the line below.',pal:{bg:'#EFE8DD',fg:'#2B2118',ac:'#1E2A3A'},tone:'light',tags:['Story','Unboxing'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const bx=W/2-360,by=760,bw=720,bh=420;B4tile(c,S.m(0),W/2-290,170,580,620);c.save();c.globalCompositeOperation='screen';const g=c.createRadialGradient(W/2,by-80,20,W/2,by-80,520);g.addColorStop(0,'rgba(255,240,210,.4)');g.addColorStop(1,'rgba(255,240,210,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  c.save();c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=50;c.shadowOffsetY=24;c.fillStyle=p.ac;c.fillRect(bx,by,bw,bh);c.restore();c.fillStyle=mixHex(p.ac,'#000000',.2);c.fillRect(bx,by,bw,36);T(c,x.brand,W/2,by+bh/2+30,{font:IS,size:56,align:'center',color:ink(p.ac),ls:6,upper:1,maxW:bw-100,maxLines:1});
  mono(c,'Unboxing',W/2,110,{align:'center',color:p.fg,size:22});T(c,x.headline,W/2,1260,{font:IS,size:54,align:'center',color:p.fg,maxW:W-160,maxLines:1})}});
KP({id:'kc-p-day',name:'A Day With',fam:'Story',desc:'Morning, afternoon, evening — three moments with the product on a timeline.',pal:{bg:'#F6EFE6',fg:'#2A2420',ac:'#E07A3F'},tone:'light',tags:['Story','Lifestyle'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'A day with',70,120,{font:IS,italic:1,size:56,color:p.fg});T(c,x.brand,70,200,{font:IS,size:72,color:p.fg,maxW:W-140,maxLines:1});
  hair(c,110,270,110,H-70,rgba(p.fg,.25),3,1);['8:00','13:00','20:00'].forEach((tm,i)=>{const y=290+i*335;c.beginPath();c.arc(111,y+20,15,0,7);c.fillStyle=p.ac;c.fill();mono(c,tm,150,y+28,{color:p.fg,size:22});B4tile(c,S.m(i),150,y+50,540,260);T(c,pts3(x)[i],720,y+170,{font:IS,italic:1,size:40,color:p.fg,maxW:300,maxLines:3})})}});
KP({id:'kc-p-founder',name:'Founder’s Note',fam:'Story',desc:'A personal note in italic serif beside a photo, signed with your name.',pal:{bg:'#F7F3EC',fg:'#26221E',ac:'#26221E'},tone:'light',tags:['Story','Founder'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),70,70,W-140,560,{filter:'contrast(1.02) saturate(.9) sepia(.08)'});mono(c,'A note from us',70,710,{color:p.fg,size:22});
  T(c,join2(x.sub,x.headline)||'Thank you for being here.',70,800,{font:IS,italic:1,size:54,color:p.fg,maxW:W-140,maxLines:5,lh:1.18});hair(c,70,H-140,290,H-140,p.fg,2,1);T(c,'— '+(x.brand||''),70,H-70,{font:IS,italic:1,size:48,color:p.fg,maxW:W-140,maxLines:1})}});
KP({id:'kc-p-made',name:'How It’s Made',fam:'Story',desc:'Four process stages as numbered close-ups on a dark, crafted page.',pal:{bg:'#1A1714',fg:'#F2EADF',ac:'#D9A86C'},tags:['Story','Process'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'How it’s made',70,150,{font:IS,size:84,color:p.fg});mono(c,x.brand,70,205,{color:p.ac,size:20,maxW:900});const st=[...pts3(x),'Made for you'].slice(0,4),w=(W-140-20)/2,h=440;
  st.forEach((s,i)=>{const x0=70+(i%2)*(w+20),y0=280+Math.floor(i/2)*(h+80);B4tile(c,S.m(i),x0,y0,w,h,{z:1.5,fx:[.5,.35,.62,.5][i],fy:[.3,.55,.75,.45][i],filter:'contrast(1.06) saturate(.92)'});mono(c,String(i+1).padStart(2,'0'),x0+20,y0+44,{color:p.ac,size:22});T(c,s,x0,y0+h+50,{font:IS,size:38,color:p.fg,maxW:w,maxLines:1})})}});

/* ---- Social ---- */
KP({id:'kc-p-giveaway',name:'Giveaway',fam:'Social',desc:'Giveaway post: the prize, three entry steps with ticks, and the closing line.',pal:{bg:'#FF5CA8',fg:'#111111',ac:'#111111'},tone:'light',tags:['Social','Giveaway'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Giveaway',W/2,180,{font:AN,size:170,upper:1,align:'center',color:ink(p.bg)});card(c,S.m(0),W/2,500,820,440,{z:1.03});T(c,'Win: '+(x.headline||x.brand),W/2,800,{font:IT,weight:700,size:48,align:'center',color:ink(p.bg),maxW:W-140,maxLines:2});
  ['Follow '+(x.handle||'us'),'Like this post','Tag a friend who needs it'].forEach((s,i)=>{const y=960+i*110;rr(c,70,y-46,W-140,90,45);c.fillStyle='rgba(255,255,255,.85)';c.fill();c.beginPath();c.arc(130,y-1,28,0,7);c.fillStyle='#111';c.fill();tick(c,130,y-1,28,1,'#fff');T(c,s,190,y+14,{font:IT,weight:600,size:38,color:'#111',maxW:W-300,maxLines:1})});
  mono(c,x.label||'Winner announced soon',W/2,H-30,{align:'center',color:ink(p.bg),size:20,maxW:W-140})}});
KP({id:'kc-p-pick',name:'Pick a Number',fam:'Social',desc:'Three numbered picks side by side: “comment 1, 2 or 3”.',pal:{bg:'#0F0F10',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Social','Engagement'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Which one are you?',W/2,160,{font:IT,weight:700,size:72,ls:-2,align:'center',color:p.fg,maxW:W-140,maxLines:1});const w=(W-140-40)/3;
  for(let i=0;i<3;i++){const x0=70+i*(w+20);B4tile(c,S.m(i),x0,260,w,700);c.beginPath();c.arc(x0+56,316,40,0,7);c.fillStyle=p.ac;c.fill();T(c,String(i+1),x0+56,332,{font:IT,weight:800,size:46,align:'center',color:ink(p.ac)});T(c,pts3(x)[i],x0+w/2,1030,{font:IT,weight:600,size:34,align:'center',color:'#fff',maxW:w,maxLines:2})}
  T(c,'Comment 1, 2 or 3',W/2,1200,{font:IT,weight:800,size:76,ls:-2,align:'center',color:p.ac,maxW:W-140,maxLines:1});mono(c,x.brand,W/2,H-50,{align:'center',color:'#fff',size:20,maxW:900})}});
KP({id:'kc-p-lineup',name:'The Lineup',fam:'Social',desc:'The range on a shelf: framed product cards with names and a starting price.',pal:{bg:'#EDEAE4',fg:'#151515',ac:'#151515'},tone:'light',tags:['Social','Range'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'The lineup',70,170,{font:IS,size:96,color:p.fg});mono(c,x.brand,70,225,{color:rgba(p.fg,.6),size:20,maxW:900});const n=3,w=(W-140-40)/3,sy=1000;c.fillStyle=mixHex(p.bg,'#000000',.08);c.fillRect(0,sy,W,14);
  for(let i=0;i<n;i++){const x0=70+i*(w+20);c.save();c.shadowColor='rgba(0,0,0,.18)';c.shadowBlur=30;c.shadowOffsetY=14;c.fillStyle='#fff';c.fillRect(x0,sy-620,w,620);c.restore();B4tile(c,S.m(i),x0+12,sy-608,w-24,480);T(c,[x.f1,x.f2,x.f3][i]||x.brand,x0+20,sy-70,{font:IS,size:34,color:p.fg,maxW:w-40,maxLines:1});mono(c,i===0?x.price:'',x0+20,sy-32,{color:rgba(p.fg,.6),size:18,upper:0})}
  T(c,x.headline,70,1160,{font:IS,italic:1,size:58,color:p.fg,maxW:W-140,maxLines:2});if(x.cta)mono(c,x.cta+'  →',70,H-50,{color:p.fg,size:22})}});
KP({id:'kc-p-newin',name:'New In',fam:'Social',desc:'“New in” headline with a hero card and NEW sticker — the arrivals post.',pal:{bg:'#101010',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Social','New arrivals'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'New in',70,190,{font:AN,size:170,upper:1,color:p.fg});mono(c,x.brand,W-70,170,{align:'right',color:p.ac,size:20,maxW:460});
  c.save();c.translate(W/2,750);c.rotate(-.02);c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=60;c.shadowOffsetY=30;rr(c,-400,-450,800,900,30);c.fillStyle='#1c1c1c';c.fill();c.restore();c.save();c.translate(W/2,750);c.rotate(-.02);rr(c,-400,-450,800,900,30);c.clip();cover(c,S.m(0),-400,-450,800,900,{z:1.04});c.restore();
  c.save();c.translate(W/2+330,330);c.rotate(.2);c.beginPath();c.arc(0,0,90,0,7);c.fillStyle=p.ac;c.fill();T(c,'NEW',0,16,{font:AN,size:52,align:'center',color:ink(p.ac)});c.restore();T(c,x.headline,70,1270,{font:IT,weight:700,size:52,color:'#fff',maxW:W-140,maxLines:1})}});
KP({id:'kc-p-festive',name:'Season’s Greetings',fam:'Social',desc:'Warm bokeh lights over the product with a festive greeting from your brand.',pal:{bg:'#1A0F0A',fg:'#FFF3DF',ac:'#F2B544'},grain:.05,tags:['Social','Festive'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'brightness(.82) saturate(1.05)'});c.fillStyle=rgba(p.bg,.35);c.fillRect(0,0,W,H);c.save();c.globalCompositeOperation='screen';for(let i=0;i<30;i++){const sx=i*97%W,sy=i*173%H,r=18+(i%6)*10,a=.15+.2*((i*37%10)/10);const g=c.createRadialGradient(sx,sy,0,sx,sy,r);g.addColorStop(0,rgba(p.ac,a));g.addColorStop(1,rgba(p.ac,0));c.fillStyle=g;c.fillRect(sx-r,sy-r,r*2,r*2)}c.restore();
  scrimB(c,W,H,.78,.45);const greet=/greet|festive|season|diwali|eid|christmas|holiday|new year|onam|pongal|navratri|holi/i.test(x.label||'')?x.label:'Season’s greetings';T(c,greet,W/2,1000,{font:IS,italic:1,size:104,align:'center',color:p.fg,maxW:W-140,maxLines:2,anchor:'bottom'});
  hair(c,W/2-110,1060,W/2+110,1060,p.ac,2,1);T(c,'from all of us at',W/2,1130,{font:IT,size:30,align:'center',color:rgba(p.fg,.8)});T(c,x.brand,W/2,1210,{font:IS,size:58,align:'center',color:p.fg,maxW:W-180,maxLines:1})}});

/* ---------- library integration: Kathavi Collection leads the library ---------- */
const kc=TPL.filter(t=>t.kc);for(const t of kc)TPL.splice(TPL.indexOf(t),1);TPL.splice(0,0,...kc);
const fl=document.getElementById('filters');if(fl&&!fl.querySelector('[data-f=kc]')){const b=document.createElement('button');b.type='button';b.dataset.f='kc';b.setAttribute('aria-pressed','false');b.textContent='Kathavi Collection · '+kc.length;fl.prepend(b)}
const _b=buildGrid;buildGrid=function(){const f=state.filter;if(f==='kc'){const keep=TPL.slice();TPL.splice(0,TPL.length,...keep.filter(t=>t.kc));try{state.filter='rec';_b()}finally{TPL.splice(0,TPL.length,...keep);state.filter=f}}else _b()};
try{const n=TPL.length;document.querySelectorAll('.logo small,#paneT .ai p').forEach(el=>{el.textContent=el.textContent.replace(/\b1[2-9]\d\b/,String(n))})}catch(e){}
const _sc=scoreAll;scoreAll=function(){_sc();TPL.forEach(t=>{if(t.kc&&state.scores[t.id]!=null)state.scores[t.id]=Math.min(98,Math.round(state.scores[t.id]*.9+8))})};
window.KC_IDS=kc.map(t=>t.id);
})();
