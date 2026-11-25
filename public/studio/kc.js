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

/* =====================================================================
   BATCH 5 · 25 REELS — occasions & categories
   Celebrate · Lookbook · Taste · Glow · Home
   ===================================================================== */
const petals=(c,W,H,t,col,n=26,seed=1)=>{for(let i=0;i<n;i++){const sx=((i*137+seed*53)%W),sp=60+(i%7)*18,y=((i*211)%H+t*sp)%(H+80)-40,x=sx+Math.sin(t*1.2+i)*30;c.save();c.translate(x,y);c.rotate(t*.8+i);c.globalAlpha=.55+.35*((i%3)/2);c.fillStyle=col;c.beginPath();c.ellipse(0,0,14,7,0,0,7);c.fill();c.restore()}};
const mandala=(c,cx,cy,r,col,p,rot=0)=>{if(p<=0)return;c.save();c.translate(cx,cy);c.rotate(rot);c.strokeStyle=col;c.lineWidth=3;c.globalAlpha=clamp(p);const k=E.outExpo(clamp(p));
  for(let ring=1;ring<=4;ring++){const rr2=r*ring/4*k,n=8*ring;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;c.save();c.rotate(a);c.beginPath();c.ellipse(rr2,0,r*.09*ring/2.2,r*.035*ring/1.6,0,0,7);c.stroke();c.restore()}c.beginPath();c.arc(0,0,rr2,0,7);c.stroke()}c.restore()};
const dots=(c,x1,x2,y,col)=>{c.fillStyle=col;for(let x=x1;x<x2;x+=14){c.beginPath();c.arc(x,y,2.4,0,7);c.fill()}};
const steam=(c,cx,cy,t,col)=>{c.save();c.strokeStyle=col;c.lineWidth=10;c.lineCap='round';for(let k=0;k<3;k++){const ph=(t*.6+k*.33)%1;c.globalAlpha=Math.sin(ph*Math.PI)*.55;c.beginPath();for(let i=0;i<=20;i++){const y=cy-i*18-ph*120,x=cx+(k-1)*70+Math.sin(i*.5+t*2+k)*22;i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}c.restore()};

/* ================= FAMILY 11 · CELEBRATE ================= */
KC({id:'kc-festsale',name:'Festival Sale',fam:'Celebrate',desc:'A rangoli-style mandala blooms, the festival sale headline lands and the price glows — for any festive season.',pal:{bg:'#5B0F2E',fg:'#FFF3DF',ac:'#F2B544'},dur:10,pt:4.6,hold:[2,7],tags:['Celebrate','Festive sale'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mandala(c,W/2,560,420,rgba(p.ac,.75),P(t,.1,1.6),t*.08);mandala(c,W/2,560,240,rgba(p.fg,.5),P(t,.5,1.4),-t*.12);
  const ph=E.outBack(P(t,1.2,.7));c.save();c.translate(W/2,560);c.scale(ph,ph);c.beginPath();c.arc(0,0,200,0,7);c.clip();cover(c,S.m(0),-200,-200,400,400,{z:1.06});c.restore();c.save();c.strokeStyle=p.ac;c.lineWidth=6;c.globalAlpha=ph;c.beginPath();c.arc(W/2,560,206,0,7);c.stroke();c.restore();
  mono(c,x.label||'Festive edit',W/2,1100,{align:'center',color:p.ac,size:24,p:P(t,1.8,.5)});kin(c,x.headline||'The festival sale',W/2,1220,{t,t0:2,font:IS,size:100,maxW:W-160,maxLines:2,color:p.fg,align:'center'});
  if(x.price){const s=E.outBack(P(t,3.2,.5));c.save();c.translate(W/2,1480);c.scale(s,s);rr(c,-230,-70,460,140,70);c.fillStyle=p.ac;c.fill();T(c,'From '+x.price,0,18,{font:IT,weight:700,size:52,align:'center',color:ink(p.ac),maxW:420,maxLines:1});c.restore()}
  if(x.cta)mono(c,x.cta,W/2,1640,{align:'center',color:p.fg,size:24,p:P(t,3.8,.5)});T(c,x.brand,W/2,1730,{font:IS,size:44,align:'center',color:rgba(p.fg,.85),maxW:W-200,maxLines:1,p:P(t,4,.6)})}});
KC({id:'kc-wedding',name:'Wedding Season',fam:'Celebrate',desc:'A gilded filigree frame opens on the product while petals drift down — made for the wedding calendar.',pal:{bg:'#F7EFE4',fg:'#4A1F1A',ac:'#B8862D'},tone:'light',dur:10,pt:4.4,hold:[2,7],tags:['Celebrate','Wedding'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const o=E.inOut(P(t,.3,1.4)),fx=110,fy=300,fw=W-220,fh=1060;
  c.save();clip(c,fx+fw/2*(1-o),fy,fw*o,fh);cover(c,S.m(Math.floor(t/3)%Math.max(1,Math.min(3,S.n))),fx,fy,fw,fh,{z:kb(t%3+1,4,1.12,1.03)});c.restore();
  c.save();c.strokeStyle=p.ac;c.lineWidth=3;c.strokeRect(fx-20,fy-20,fw+40,fh+40);c.lineWidth=1.5;c.strokeRect(fx-34,fy-34,fw+68,fh+68);[[fx-20,fy-20],[fx+fw+20,fy-20],[fx-20,fy+fh+20],[fx+fw+20,fy+fh+20]].forEach(([cx,cy])=>{c.beginPath();c.arc(cx,cy,26,0,7);c.stroke();c.beginPath();c.arc(cx,cy,12,0,7);c.fillStyle=p.ac;c.fill()});c.restore();
  petals(c,W,H,t,rgba('#C8506A',.8),22,3);T(c,'Wedding season',W/2,210,{font:IS,italic:1,size:80,align:'center',color:p.fg,p:P(t,.2,.7)});
  T(c,x.headline,W/2,1500,{font:IS,size:68,align:'center',color:p.fg,maxW:W-180,maxLines:2,p:P(t,2,.7)});if(x.cta)mono(c,x.cta,W/2,1640,{align:'center',color:p.ac,size:24,p:P(t,2.6,.5)});mono(c,x.brand,W/2,1700,{align:'center',color:p.fg,size:20,p:P(t,2.8,.5)})}});
KC({id:'kc-anniversary',name:'Our Anniversary',fam:'Celebrate',desc:'A celebration of your brand’s milestone: the number counts up, confetti, and a thank-you.',pal:{bg:'#111113',fg:'#FFFFFF',ac:'#B9FA70'},dur:9,pt:5.6,hold:[2,6],tags:['Celebrate','Milestone'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const lb=String(x.label||''),yr=lb.match(/(?:since|est\.?|established)\s*(\d{4})/i),cnt=lb.match(/(\d+)\s*(?:years?|yrs)/i),mode=yr?'since':cnt?'years':'thanks',target=yr?+yr[1]:cnt?+cnt[1]:0,n=mode==='years'?Math.round(target*E.out(P(t,.5,1.6))):target;
  if(mode==='since')T(c,'Since',W/2,560,{font:IS,italic:1,size:84,align:'center',color:p.ac,p:P(t,.2,.6)});
  if(mode==='thanks')T(c,'Thank you',W/2,820,{font:IS,italic:1,size:170,align:'center',base:'middle',color:p.fg,p:P(t,.3,.7)});else T(c,String(n),W/2,820,{font:IT,weight:200,size:fit(c,String(target),IT,200,W-200,420),align:'center',base:'middle',color:p.fg,alpha:P(t,.3,.4)});
  if(mode==='years')T(c,(target===1?'year':'years')+' of',W/2,1060,{font:IS,italic:1,size:84,align:'center',color:p.ac,p:P(t,1.6,.6)});
  T(c,x.brand,W/2,1180,{font:IS,size:90,align:'center',color:p.fg,maxW:W-160,maxLines:1,p:P(t,2,.6)});const e=P(t,2.4,2.4);if(e>0&&e<1){for(let i=0;i<50;i++){const a=i*2.4,r=100+e*800*(.4+(i%5)/6),cx=W/2+Math.cos(a)*r,cy=820+Math.sin(a)*r*.7+e*e*500;c.fillStyle=[p.ac,'#fff','#FF5CA8','#7CF2D6'][i%4];c.globalAlpha=1-e;c.fillRect(cx,cy,14,26);c.globalAlpha=1}}
  if(t>4.4){c.save();c.globalAlpha=E.out(P(t,4.4,.8));cover(c,S.m(0),0,0,W,H,{z:kb(t-4.4,4,1.12,1.03)});scrimB(c,W,H,.85,.4);c.restore();kin(c,mode==='thanks'?(x.headline||'Here’s to what’s next.'):'Thank you for being part of it.',80,1460,{t,t0:4.8,font:IS,italic:1,size:84,maxW:900,maxLines:2,color:'#fff',anchor:'bottom'});if(x.cta)pill(c,x.cta,W/2,1600,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,5.6,.5)),alpha:P(t,5.6,.2),size:28})}}});
KC({id:'kc-eos',name:'End of Season',fam:'Celebrate',desc:'Price tags swing in on strings over the product, the season-end line and the final call.',pal:{bg:'#EDE6DA',fg:'#1F1B16',ac:'#C2412D'},tone:'light',dur:9,pt:4,hold:[1.5,6],tags:['Celebrate','Sale'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,640,W,H-640);cover(c,S.m(0),0,640,W,H-640,{z:kb(t,9,1.12,1.03)});c.restore();
  T(c,'End of',80,260,{font:AN,size:150,upper:1,color:p.fg,p:P(t,.1,.5)});T(c,'season',80,410,{font:AN,size:150,upper:1,color:p.ac,p:P(t,.25,.5)});mono(c,x.label||'Final weeks',80,480,{color:p.fg,size:22,p:P(t,.4,.5)});
  [[.62,780,-.25],[.82,720,.18],[.42,820,.12]].forEach(([fx,y,ra],i)=>{const a=P(t,.8+i*.4,.6);if(a<=0)return;const sw=Math.sin(t*2+i)*.08*(1-E.out(clamp(a)))+Math.sin(t*1.4+i)*.03,cx=W*fx;c.save();c.strokeStyle=p.fg;c.lineWidth=2;c.beginPath();c.moveTo(cx,640);c.lineTo(cx,y-60);c.stroke();
    c.translate(cx,y-60);c.rotate(ra+sw);c.globalAlpha=clamp(a*3);c.fillStyle=i===0?p.ac:'#fff';c.beginPath();c.moveTo(-90,30);c.lineTo(0,-10);c.lineTo(90,30);c.lineTo(90,230);c.lineTo(-90,230);c.closePath();c.fill();c.beginPath();c.arc(0,24,10,0,7);c.fillStyle=p.bg;c.fill();
    T(c,i===0?(x.price||'Sale'):pts3(x)[i],0,130,{font:i===0?AN:IT,weight:600,size:i===0?54:26,align:'center',color:i===0?'#fff':p.fg,maxW:160,maxLines:2});c.restore()});
  scrimB(c,W,H,.6,.75);if(x.cta)pill(c,x.cta,W/2,1660,{bg:p.ac,fg:'#fff',s:E.outBack(P(t,2.4,.5)),alpha:P(t,2.4,.2),size:30})}});
KC({id:'kc-weekend',name:'The Weekend Edit',fam:'Celebrate',desc:'A calendar page flips to Saturday and Sunday, each with its own pick for the weekend.',pal:{bg:'#F3EFE7',fg:'#171717',ac:'#2F6BFF'},tone:'light',dur:9,pt:5,hold:[1.5,6.5],tags:['Celebrate','Weekly'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'The weekend edit',80,240,{font:IS,italic:1,size:84,color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,80,300,{color:rgba(p.fg,.6),size:22,p:P(t,.3,.5)});
  ['Sat','Sun'].forEach((d,i)=>{const t0=.8+i*2.6,a=E.outExpo(P(t,t0,.7));if(a<=0)return;const y=420+i*640;c.save();c.globalAlpha=a;c.translate(0,(1-a)*80);c.fillStyle='#fff';c.shadowColor='rgba(0,0,0,.12)';c.shadowBlur=40;c.shadowOffsetY=14;c.fillRect(80,y,W-160,580);c.shadowColor='transparent';
    c.fillStyle=p.ac;c.fillRect(80,y,240,580);T(c,d,200,y+150,{font:IT,weight:800,size:80,align:'center',color:ink(p.ac),upper:1});T(c,String(new Date(Date.now()+((6-new Date().getDay()+7)%7+i)*864e5).getDate()),200,y+330,{font:IT,weight:200,size:150,align:'center',color:ink(p.ac)});
    c.save();clip(c,340,y+20,W-440,420);cover(c,S.m(i),340,y+20,W-440,420,{z:1.06});c.restore();T(c,pts3(x)[i],360,y+520,{font:IS,size:44,color:p.fg,maxW:W-480,maxLines:1});c.restore()});
  if(x.cta)mono(c,x.cta+'  →',80,1720,{color:p.fg,size:24,p:P(t,6,.5)})}});

/* ================= FAMILY 12 · LOOKBOOK ================= */
KC({id:'kc-lookbook',name:'Lookbook',fam:'Lookbook',desc:'Numbered looks turn like pages of a lookbook — Look 01, 02, 03 — with folio numbers and a cover close.',pal:{bg:'#F2EFE9',fg:'#161616',ac:'#161616'},tone:'light',dur:10,pt:1.6,hold:[1.5,7.5],tags:['Lookbook','Collection'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=Math.max(3,Math.min(4,S.n||3)),seg=2,t0=1.6,k=Math.min(n,Math.floor(Math.max(0,t-t0)/seg)),lt=t-t0-k*seg;
  if(t<t0+.4){c.save();c.globalAlpha=1-P(t,t0,.4);T(c,'Lookbook',W/2,860,{font:IS,size:150,align:'center',color:p.fg,p:P(t,.1,.7)});mono(c,x.label||issue(),W/2,940,{align:'center',size:24,color:p.fg,p:P(t,.4,.5)});mono(c,x.brand,W/2,1000,{align:'center',size:22,color:rgba(p.fg,.6),p:P(t,.5,.5)});c.restore()}
  if(t>=t0&&k<n){const sl=E.inOut(clamp(lt/.6));c.save();c.translate((1-sl)*W*.4,0);c.globalAlpha=sl;c.save();clip(c,80,200,W-160,1320);cover(c,S.m(k),80,200,W-160,1320,{z:1.08-.04*(lt/seg)});c.restore();c.restore();
    mono(c,`Look ${String(k+1).padStart(2,'0')}`,80,1600,{color:p.fg,size:26});T(c,pts3(x)[k%3],80,1680,{font:IS,italic:1,size:56,color:p.fg,maxW:700,maxLines:1,p:clamp(lt/.5)});mono(c,`${String(k+1).padStart(2,'0')} / ${String(n).padStart(2,'0')}`,W-80,1600,{align:'right',color:rgba(p.fg,.5),size:22})}
  else if(k>=n)outro(c,S,t,t0+n*seg,{bg:p.bg,fg:p.fg,font:IS,acc:p.fg})}});
KC({id:'kc-runway',name:'Runway',fam:'Lookbook',desc:'A continuous vertical catwalk of looks scrolling up the screen, with look numbers ticking past.',pal:{bg:'#0B0B0C',fg:'#FFFFFF',ac:'#B9FA70'},dur:9,pt:3,hold:[1,6.5],tags:['Lookbook','Motion'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=Math.max(3,Math.min(5,S.n||3)),ch=980,gap=40,off=(t*260)%((ch+gap)*n);
  for(let k=-1;k<n+2;k++){const y=200+k*(ch+gap)-off;if(y>H||y+ch<0)continue;const i=((k%n)+n)%n;c.save();clip(c,140,y,W-280,ch);cover(c,S.m(i),140,y,W-280,ch,{z:1.06});c.restore();mono(c,`Look ${String(i+1).padStart(2,'0')}`,140,y+ch+28,{color:'rgba(255,255,255,.7)',size:20})}
  c.fillStyle=p.bg;c.fillRect(0,0,W,180);grad(c,W,180,140,rgba(p.bg,1),rgba(p.bg,0));c.fillStyle=p.bg;c.fillRect(0,H-260,W,260);grad(c,W,H-400,140,rgba(p.bg,0),rgba(p.bg,1));
  T(c,x.brand,W/2,140,{font:IS,size:64,align:'center',color:p.fg,maxW:W-160,maxLines:1});T(c,x.headline,W/2,1760,{font:IS,italic:1,size:56,align:'center',color:p.fg,maxW:W-160,maxLines:1});mono(c,x.cta,W/2,1830,{align:'center',color:p.ac,size:22})}});
KC({id:'kc-contact',name:'Contact Sheet',fam:'Lookbook',desc:'A photographer’s contact sheet: frames in a grid, a grease-pencil circle marks the pick, then it fills the screen.',pal:{bg:'#1A1A1A',fg:'#F2F2F2',ac:'#E53935'},dur:9,pt:2.6,hold:[1.4,6],grain:.07,tags:['Lookbook','Editorial'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const pick=4,zoom=E.inOut(P(t,3.6,1.1)),cols=3,rows=4,cw=(W-160-20)/cols,chh=cw*1.25,y0=260;
  for(let i=0;i<cols*rows;i++){const cx=80+(i%cols)*(cw+10),cy=y0+Math.floor(i/cols)*(chh+44),a=P(t,.1+i*.06,.3);if(a<=0)continue;c.save();c.globalAlpha=a*(i===pick?1:1-zoom);clip(c,cx,cy,cw,chh);cover(c,S.m(i),cx,cy,cw,chh,{z:1.1+(i%3)*.12,fx:[.5,.4,.6][i%3],fy:[.4,.3,.6][i%2],filter:'contrast(1.05)'});c.restore();
    if(zoom<1)mono(c,`${String(i+12).padStart(3,'0')}A`,cx,cy+chh+28,{size:16,color:'#E8B04B',alpha:1-zoom})}
  const ci=E.outExpo(P(t,1.8,1)),px=80+(pick%cols)*(cw+10)+cw/2,py=y0+Math.floor(pick/cols)*(chh+44)+chh/2;if(ci>0&&zoom<1){c.save();c.globalAlpha=1-zoom;c.strokeStyle=p.ac;c.lineWidth=8;c.lineCap='round';c.beginPath();c.ellipse(px,py,cw*.62,chh*.6,-.1,-.5,-.5+ci*Math.PI*2.1);c.stroke();c.restore()}
  if(zoom>0){const L=(a,b)=>a+(b-a)*zoom;const r={x:L(px-cw/2,0),y:L(py-chh/2,0),w:L(cw,W),h:L(chh,H)};c.save();clip(c,r.x,r.y,r.w,r.h);cover(c,S.m(pick),0,0,W,H,{z:1.06});c.restore();c.save();c.globalAlpha=zoom;scrimB(c,W,H,.8,.45);c.restore();
    T(c,x.headline,80,1470,{font:IS,size:84,color:'#fff',maxW:900,maxLines:2,anchor:'bottom',p:P(t,4.4,.6)});mono(c,'The pick · '+(x.brand||''),80,1560,{color:p.ac,size:22,p:P(t,4.8,.5),maxW:900})}
  mono(c,'Contact sheet',80,200,{color:p.fg,size:22,alpha:1-zoom});mono(c,x.label||issue(),W-80,200,{align:'right',color:rgba(p.fg,.6),size:20,alpha:1-zoom})}});
KC({id:'kc-swatches',name:'Material Swatches',fam:'Lookbook',desc:'Material swatch cards fan out from a stack — each a crop of your product — with the material story.',pal:{bg:'#EDE7DD',fg:'#2A241E',ac:'#8A6A3B'},tone:'light',dur:9,pt:4,hold:[1.5,6],tags:['Lookbook','Material'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'The material',80,260,{font:IS,italic:1,size:84,color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,80,320,{color:p.ac,size:22,p:P(t,.3,.5)});
  const fan=E.outBack(P(t,.8,1.2)),n=4;for(let i=0;i<n;i++){const ang=(-.39+i*.26)*fan,cx=W/2,cy=1700;c.save();c.translate(cx,cy);c.rotate(ang);c.translate(0,-780);c.shadowColor='rgba(0,0,0,.22)';c.shadowBlur=30;c.shadowOffsetY=12;c.fillStyle='#fff';c.fillRect(-210,-360,420,680);c.shadowColor='transparent';
    c.save();clip(c,-194,-344,388,520);cover(c,S.m(0),-194,-344,388,520,{z:2.4,fx:[.3,.45,.6,.5][i],fy:[.3,.5,.7,.85][i]});c.restore();mono(c,`No. ${i+1}`,-190,226,{size:20,color:p.ac});T(c,[...pts3(x),x.label][i]||'',-190,278,{font:IS,size:36,color:p.fg,maxW:380,maxLines:1});c.restore()}
  T(c,x.headline,W/2,1640,{font:IS,size:64,align:'center',color:p.fg,maxW:W-160,maxLines:2,p:P(t,2.6,.6)});if(x.cta)mono(c,x.cta,W/2,1760,{align:'center',color:p.ac,size:22,p:P(t,3,.5)})}});
KC({id:'kc-chapter',name:'Collection Chapter',fam:'Lookbook',desc:'“Chapter” title card in roman numerals, the collection name, then four frames like a film’s opening.',pal:{bg:'#0D0C0B',fg:'#F4ECDF',ac:'#C9A96E'},dur:11,pt:6,hold:[2,8.5],grain:.06,tags:['Lookbook','Launch'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const t0=2.6,seg=1.6,k=Math.floor(Math.max(0,t-t0)/seg),lt=t-t0-k*seg;
  if(t<t0+.3){c.save();c.globalAlpha=1-P(t,t0,.3);T(c,'Chapter',W/2,760,{font:IS,italic:1,size:70,align:'center',color:p.ac,p:P(t,.2,.7)});T(c,'II',W/2,960,{font:IS,size:240,align:'center',color:p.fg,p:P(t,.5,.8)});hair(c,W/2-120,1030,W/2+120,1030,p.ac,2,E.outExpo(P(t,1,.8)));
    T(c,x.label||x.headline,W/2,1120,{font:IS,size:56,align:'center',color:p.fg,maxW:W-200,maxLines:2,p:P(t,1.2,.7)});c.restore()}
  if(t>=t0){const i=k%Math.max(1,Math.min(4,S.n||4));c.save();c.globalAlpha=E.out(clamp(lt/.4));cover(c,S.m(i),0,0,W,H,{z:1.12-.06*(lt/seg),filter:'contrast(1.06) saturate(.92)'});c.restore();vignette(c,W,H,.5);c.fillStyle=p.bg;c.fillRect(0,0,W,200);c.fillRect(0,H-200,W,200);
    T(c,[x.headline,...pts3(x)][k%4],W/2,H-100,{font:IS,italic:1,size:50,align:'center',color:p.fg,maxW:W-200,maxLines:1,alpha:clamp(lt/.4)});mono(c,x.brand,W/2,110,{align:'center',size:20,color:p.ac})}}});

/* ================= FAMILY 13 · TASTE (food & drink) ================= */
KC({id:'kc-menu',name:'The Menu',fam:'Taste',desc:'A printed menu card: items with dotted leaders and prices, the dish shot slides in beside it.',pal:{bg:'#F5EFE3',fg:'#2B2118',ac:'#A23B24'},tone:'light',dur:9,pt:4.4,hold:[1.5,6.5],tags:['Taste','Menu'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.strokeStyle=rgba(p.fg,.6);c.lineWidth=2;c.strokeRect(60,160,W-120,H-320);c.strokeRect(72,172,W-144,H-344);
  T(c,x.brand,W/2,300,{font:IS,size:72,align:'center',color:p.fg,maxW:W-200,maxLines:1,p:P(t,.1,.6)});mono(c,x.label||'Today’s menu',W/2,360,{align:'center',color:p.ac,size:22,p:P(t,.3,.5)});
  c.save();clip(c,120,420,W-240,680);cover(c,S.m(0),120,420,W-240,680,{z:kb(t,9,1.14,1.03)});c.restore();
  const items=[x.headline,...pts3(x)].filter(Boolean).slice(0,4);items.forEach((it,i)=>{const y=1220+i*120,a=P(t,1+i*.4,.5);T(c,it,120,y,{font:IS,size:52,color:p.fg,maxW:600,maxLines:1,p:a});c.save();c.globalAlpha=a;c.font=`400 52px ${IS}`;const w=Math.min(600,c.measureText(it).width);c.restore();if(a>0)dots(c,140+w,W-290,y-8,rgba(p.fg,.35*a));if(i===0&&x.price)T(c,x.price,W-120,y,{font:IS,size:52,align:'right',color:p.ac,p:a});else T(c,'·',W-120,y,{font:IS,size:52,align:'right',color:p.ac,p:a})});
  if(x.cta)mono(c,x.cta,W/2,1700,{align:'center',color:p.fg,size:22,p:P(t,3,.5)})}});
KC({id:'kc-recipe',name:'The Recipe',fam:'Taste',desc:'A recipe card: what goes in, ticked off one by one, then the finished plate.',pal:{bg:'#FFF8EE',fg:'#2E2A24',ac:'#5B8C3E'},tone:'light',dur:10,pt:6,hold:[1.5,7],tags:['Taste','Recipe'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const done=E.inOut(P(t,5.2,1));mono(c,'The recipe',80,250,{color:p.ac,size:24,p:P(t,.1,.5)});T(c,x.headline||x.brand,80,340,{font:IS,size:84,color:p.fg,maxW:920,maxLines:2,p:P(t,.2,.6)});
  c.save();c.globalAlpha=1-done;mono(c,'You’ll need',80,560,{color:p.fg,size:22});[...pts3(x),'A little patience'].slice(0,4).forEach((s,i)=>{const t0=1+i*.8,y=660+i*130;c.beginPath();c.arc(110,y-14,28,0,7);c.strokeStyle=p.ac;c.lineWidth=3;c.stroke();tick(c,110,y-14,28,P(t,t0+.3,.4),p.ac);T(c,s,170,y,{font:IS,size:52,color:p.fg,maxW:820,maxLines:1,p:P(t,t0,.4)})});
  B4tile(c,S.m(0),80,1220,W-160,420,{z:1.5,fy:.45});c.restore();
  if(done>0){c.save();c.globalAlpha=done;c.save();clip(c,80,520,W-160,1100);cover(c,S.m(0),80,520,W-160,1100,{z:kb(t-5.2,4,1.1,1.02)});c.restore();mono(c,'Ready to serve',80,1700,{color:p.ac,size:24});if(x.cta)T(c,x.cta+'  →',80,1780,{font:IT,weight:700,size:44,color:p.fg,maxW:920,maxLines:1});c.restore()}}});
KC({id:'kc-fresh',name:'Fresh & Hot',fam:'Taste',desc:'Steam curls rise from a warm-graded shot while the craving line writes in — made for food and drink.',pal:{bg:'#24130A',fg:'#FFF1DE',ac:'#FFB347'},dur:8,pt:3.6,hold:[1,5.5],grain:.05,tags:['Taste','Appetite'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,8,1.16,1.03),filter:'contrast(1.08) saturate(1.2) sepia(.1) brightness(1.02)'});steam(c,W/2,H*.48,t,'rgba(255,255,255,.9)');
  c.save();c.globalCompositeOperation='screen';const g=c.createRadialGradient(W*.7,H*.25,20,W*.7,H*.25,900);g.addColorStop(0,'rgba(255,170,80,.35)');g.addColorStop(1,'rgba(255,170,80,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();scrimB(c,W,H,.85,.45);scrimT(c,W,H,.5,.25);
  mono(c,x.label||'Fresh today',80,300,{color:p.ac,size:24,p:P(t,.2,.5)});kin(c,x.headline||'Fresh out of the kitchen',80,1440,{t,t0:.6,font:IS,italic:1,size:100,maxW:920,maxLines:2,color:p.fg,anchor:'bottom'});
  mono(c,pts3(x).join('  ·  '),80,1530,{color:'#fff',size:22,p:P(t,1.8,.5),maxW:920});if(x.cta)pill(c,x.cta,W/2,1660,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,2.4,.5)),alpha:P(t,2.4,.2),size:28})}});
KC({id:'kc-tasting',name:'Tasting Notes',fam:'Taste',desc:'A tasting wheel: the product at the centre, notes radiating out on hairlines like a sommelier’s card.',pal:{bg:'#1C1410',fg:'#F6EBDD',ac:'#D98E3A'},dur:9,pt:4.4,hold:[1.5,6.5],tags:['Taste','Notes'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const cx=W/2,cy=900,r=230;T(c,'Tasting notes',W/2,260,{font:IS,italic:1,size:84,align:'center',color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,W/2,320,{align:'center',color:p.ac,size:22,p:P(t,.3,.5)});
  const s=E.outBack(P(t,.5,.7));c.save();c.translate(cx,cy);c.scale(s,s);c.beginPath();c.arc(0,0,r,0,7);c.clip();cover(c,S.m(0),-r,-r,2*r,2*r,{z:1.1});c.restore();c.strokeStyle=p.ac;c.lineWidth=3;c.beginPath();c.arc(cx,cy,r+14,0,7*E.out(P(t,.6,1)));c.stroke();
  const notes=[...pts3(x),x.label].filter(Boolean).slice(0,4),angs=[-2.3,-.75,.75,2.3];notes.forEach((nt,i)=>{const a=angs[i],t0=1.4+i*.5,q=E.outExpo(P(t,t0,.6)),x1=cx+Math.cos(a)*(r+30),y1=cy+Math.sin(a)*(r+30),x2=cx+Math.cos(a)*(r+150),y2=cy+Math.sin(a)*(r+150);hair(c,x1,y1,x2,y2,rgba(p.fg,.6),2,q);
    const right=Math.cos(a)>0;T(c,nt,x2+(right?14:-14),y2+12,{font:IS,italic:1,size:42,align:right?'left':'right',color:p.fg,maxW:Math.min(300,right?W-x2-80:x2-80),maxLines:2,p:P(t,t0+.4,.5)})});
  T(c,x.headline,W/2,1470,{font:IS,size:64,align:'center',color:p.fg,maxW:W-180,maxLines:2,p:P(t,3.6,.6)});if(x.cta)mono(c,x.cta,W/2,1600,{align:'center',color:p.ac,size:22,p:P(t,4,.5)})}});
KC({id:'kc-delivery',name:'Order Now',fam:'Taste',desc:'A delivery route draws across a stylised map to a pin that pops the product — fresh, fast, ordered.',pal:{bg:'#EAF0EC',fg:'#14261C',ac:'#E2552E'},tone:'light',dur:8,pt:4,hold:[1.5,5.5],tags:['Taste','Delivery'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.strokeStyle=rgba(p.fg,.08);c.lineWidth=26;[[0,520,W,640],[0,980,W,860],[260,0,360,H],[760,0,680,H],[0,1360,W,1440]].forEach(([a,b,c2,d])=>{c.beginPath();c.moveTo(a,b);c.lineTo(c2,d);c.stroke()});
  const path=[[150,1560],[330,1490],[380,1120],[720,1010],[760,800]],q=E.inOut(P(t,.6,2));c.save();c.strokeStyle=p.ac;c.lineWidth=10;c.setLineDash([22,16]);c.lineCap='round';c.beginPath();let L=0;const segs=path.slice(1).map((pt,i)=>{const d=Math.hypot(pt[0]-path[i][0],pt[1]-path[i][1]);L+=d;return d});let rem=L*q;c.moveTo(...path[0]);
  for(let i=1;i<path.length&&rem>0;i++){const d=segs[i-1],k=Math.min(1,rem/d);c.lineTo(path[i-1][0]+(path[i][0]-path[i-1][0])*k,path[i-1][1]+(path[i][1]-path[i-1][1])*k);rem-=d}c.stroke();c.restore();
  c.beginPath();c.arc(150,1560,20,0,7);c.fillStyle=p.fg;c.fill();const pin=E.outBack(P(t,2.6,.6));if(pin>0){c.save();c.translate(760,800);c.scale(pin,pin);c.beginPath();c.arc(0,-150,150,0,7);c.fillStyle='#fff';c.fill();c.save();c.beginPath();c.arc(0,-150,136,0,7);c.clip();cover(c,S.m(0),-136,-286,272,272,{z:1.08});c.restore();c.beginPath();c.moveTo(-40,-20);c.lineTo(0,40);c.lineTo(40,-20);c.fillStyle='#fff';c.fill();c.restore()}
  T(c,x.headline||'At your door, fast',80,260,{font:IT,weight:800,size:76,ls:-2,color:p.fg,maxW:920,maxLines:2,p:P(t,.1,.6)});mono(c,pts3(x)[2]||x.label,80,400,{color:p.ac,size:24,p:P(t,.4,.5),maxW:920});if(x.cta)pill(c,x.cta,W/2,1700,{bg:p.ac,fg:'#fff',s:E.outBack(P(t,3.2,.5)),alpha:P(t,3.2,.2),size:30})}});

/* ================= FAMILY 14 · GLOW (beauty & wellness) ================= */
KC({id:'kc-ritual',name:'The Ritual',fam:'Glow',desc:'AM and PM routine steps on a soft gradient — each step with its own moment of the product.',pal:{bg:'#F8EDE8',fg:'#3A2A27',ac:'#C9877A'},tone:'light',dur:10,pt:5,hold:[1.5,7.5],tags:['Glow','Routine'],
 r(c,t,S){const{W,H,p,x}=S;const pm=E.inOut(P(t,5,1)),g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,mixHex(mixHex(p.bg,'#FFE9C7',.6),'#2B2A44',pm));g.addColorStop(1,mixHex(p.bg,'#1E1D33',pm*.9));c.fillStyle=g;c.fillRect(0,0,W,H);
  const fg=pm>.5?'#FFFFFF':p.fg;T(c,'The ritual',80,240,{font:IS,italic:1,size:84,color:fg,p:P(t,.1,.6)});mono(c,pm>.5?'PM':'AM',W-80,230,{align:'right',color:fg,size:30});
  card(c,S.m(pm>.5?1:0),W/2,780,820,820,{z:1.04});const st=pts3(x);st.forEach((s,i)=>{const t0=(pm>.5?5.6:1)+i*.6,y=1330+i*120;c.save();c.globalAlpha=E.out(P(t,t0,.5))*(pm>.5?1:1-clamp((t-4.6)/.4));c.beginPath();c.arc(110,y-14,24,0,7);c.fillStyle=p.ac;c.fill();T(c,String(i+1),110,y-2,{font:IT,weight:700,size:28,align:'center',color:'#fff'});T(c,s,160,y,{font:IS,size:52,color:fg,maxW:840,maxLines:1});c.restore()})}});
KC({id:'kc-ingredients',name:'Ingredients',fam:'Glow',desc:'Clean-label ingredient callouts orbit the product in soft circles — what’s in, nothing hidden.',pal:{bg:'#EEF2EC',fg:'#1F2B22',ac:'#6E9A6B'},tone:'light',dur:9,pt:4.4,hold:[1.5,6.5],tags:['Glow','Ingredients'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'What’s inside',W/2,250,{font:IS,italic:1,size:84,align:'center',color:p.fg,p:P(t,.1,.6)});card(c,S.m(0),W/2,900,680,900,{z:1.03,alpha:E.out(P(t,.3,.6))});
  const ing=[...pts3(x),x.label].filter(Boolean).slice(0,4),pos=[[190,540],[890,620],[180,1180],[900,1260]];ing.forEach((s,i)=>{const[cx,cy]=pos[i],a=E.outBack(P(t,1.2+i*.5,.6)),bob=Math.sin(t*1.5+i)*8;c.save();c.translate(cx,cy+bob);c.scale(a,a);c.beginPath();c.arc(0,0,120,0,7);c.fillStyle='rgba(255,255,255,.92)';c.fill();c.strokeStyle=p.ac;c.lineWidth=3;c.stroke();T(c,s,0,8,{font:IS,size:34,align:'center',base:'middle',color:p.fg,maxW:190,maxLines:3,anchor:'middle'});c.restore()});
  T(c,x.headline,W/2,1490,{font:IS,size:64,align:'center',color:p.fg,maxW:W-180,maxLines:2,p:P(t,3.4,.6)});if(x.cta)mono(c,x.cta,W/2,1620,{align:'center',color:p.ac,size:22,p:P(t,3.8,.5)})}});
KC({id:'kc-glow',name:'Glow',fam:'Glow',desc:'Dewy light sweeps across the product with drifting shimmer — the luminous beauty reel.',pal:{bg:'#2A1A22',fg:'#FFF4F0',ac:'#FFD3C4'},dur:8,pt:3.4,hold:[1,5.5],tags:['Glow','Beauty'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,8,1.15,1.03),filter:'contrast(1.04) saturate(1.05) brightness(1.04)'});sweep(c,W,H,(t%3)/3,'255,230,215',.45);
  c.save();c.globalCompositeOperation='screen';for(let i=0;i<40;i++){const sx=(i*89)%W,sy=((i*157)%H-t*(20+i%4*10)+H)%H,r=2+(i%4),a=.4+.5*Math.abs(Math.sin(t*3+i));c.fillStyle=`rgba(255,240,230,${a})`;c.beginPath();c.arc(sx,sy,r,0,7);c.fill()}c.restore();
  scrimB(c,W,H,.75,.5);scrimT(c,W,H,.45,.22);kin(c,x.headline||'Your glow, bottled',80,1440,{t,t0:.6,font:IS,italic:1,size:104,maxW:920,maxLines:2,color:p.fg,anchor:'bottom'});mono(c,pts3(x).join('  ·  '),80,1530,{color:p.ac,size:22,p:P(t,1.8,.5),maxW:920});
  if(x.cta)pill(c,x.cta,W/2,1660,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,2.4,.5)),alpha:P(t,2.4,.2),size:28});brandMark(c,S,W/2,300,{size:42,color:'#fff'})}});
KC({id:'kc-loupe',name:'Texture Close-up',fam:'Glow',desc:'A magnifying loupe glides over the product revealing texture in sharp macro detail.',pal:{bg:'#F4EFEA',fg:'#2B2522',ac:'#2B2522'},tone:'light',dur:9,pt:3.4,hold:[1.5,6.5],tags:['Glow','Texture'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const fr={x:80,y:300,w:W-160,h:1200};c.save();clip(c,fr.x,fr.y,fr.w,fr.h);cover(c,S.m(0),fr.x,fr.y,fr.w,fr.h,{z:1.04});c.restore();
  const path=[[.35,.3],[.65,.5],[.42,.72],[.55,.45]],seg=2,k=Math.min(3,Math.floor(t/seg)),lt=t-k*seg,a=path[k],b=path[Math.min(3,k+1)],mv=E.inOut(clamp((lt-1.2)/.8)),fx=a[0]+(b[0]-a[0])*mv,fy=a[1]+(b[1]-a[1])*mv,cx=fr.x+fr.w*fx,cy=fr.y+fr.h*fy,r=200;
  c.save();c.beginPath();c.arc(cx,cy,r,0,7);c.clip();c.translate(cx,cy);c.scale(2.6,2.6);c.translate(-cx,-cy);c.save();clip(c,fr.x,fr.y,fr.w,fr.h);cover(c,S.m(0),fr.x,fr.y,fr.w,fr.h,{z:1.04,filter:'contrast(1.12) saturate(1.1)'});c.restore();c.restore();
  c.save();c.strokeStyle='#fff';c.lineWidth=12;c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=20;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();c.restore();T(c,pts3(x)[k%3],cx,cy+r+60,{font:IS,italic:1,size:44,align:'center',color:'#fff',shadow:'rgba(0,0,0,.6)',sb:16,maxW:500,maxLines:1});
  T(c,'Up close',80,240,{font:IS,italic:1,size:74,color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,W-80,230,{align:'right',color:p.fg,size:20,maxW:460});T(c,x.headline,80,1610,{font:IS,size:58,color:p.fg,maxW:920,maxLines:2,p:P(t,.8,.6)})}});
KC({id:'kc-shades',name:'Shade Finder',fam:'Glow',desc:'Shade dots sampled from your photo line up, the chosen shade grows and fills into the product shot.',pal:{bg:'#FBF7F3',fg:'#2B2522',ac:'#2B2522'},tone:'light',dur:9,pt:2.4,hold:[1.5,6],tags:['Glow','Shades'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const sw=swatches(S.m(0)),pick=2,grow=E.inOut(P(t,3.6,1.2));T(c,'Find your shade',80,260,{font:IS,italic:1,size:84,color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,80,320,{color:rgba(p.fg,.6),size:22,p:P(t,.3,.5)});
  sw.forEach((col,i)=>{const cx=200+i*228,cy=760,a=E.outBack(P(t,.6+i*.25,.5)),sel=i===pick,r=(sel?104:92)*a;if(grow>0&&sel)return;c.beginPath();c.arc(cx,cy,r,0,7);c.fillStyle=col;c.fill();if(sel&&t>2.2){c.strokeStyle=p.fg;c.lineWidth=4;c.beginPath();c.arc(cx,cy,r+16,0,7*E.out(P(t,2.2,.6)));c.stroke()}mono(c,col.toUpperCase(),cx,cy+140,{align:'center',size:18,color:p.fg,alpha:(1-grow)*P(t,1,.4)})});
  if(grow>0){const cx=200+pick*228,R=104+Math.hypot(W,H)*grow;c.save();c.beginPath();c.arc(cx,760,R,0,7);c.clip();c.fillStyle=sw[pick];c.fillRect(0,0,W,H);c.globalAlpha=clamp(grow*1.4-.2);cover(c,S.m(0),0,0,W,H,{z:1.08});c.restore();c.save();c.globalAlpha=grow;scrimB(c,W,H,.8,.45);c.restore();
    T(c,x.headline,80,1460,{font:IS,size:84,color:'#fff',maxW:920,maxLines:2,anchor:'bottom',p:P(t,4.6,.6)});if(x.cta)mono(c,x.cta,80,1560,{color:'#fff',size:24,p:P(t,5,.5)})}}});

/* ================= FAMILY 15 · HOME ================= */
KC({id:'kc-room',name:'In the Room',fam:'Home',desc:'The product framed on a softly lit wall above a console line, as if styled in a real room.',pal:{bg:'#E9E2D7',fg:'#2A2520',ac:'#9C6B3C'},tone:'light',dur:9,pt:3.4,hold:[1.5,6.5],tags:['Home','Styling'],
 r(c,t,S){const{W,H,p,x}=S;const wall=c.createLinearGradient(0,0,W,H);wall.addColorStop(0,mixHex(p.bg,'#ffffff',.3));wall.addColorStop(1,mixHex(p.bg,'#000000',.08));c.fillStyle=wall;c.fillRect(0,0,W,H);
  c.save();c.globalAlpha=.12;c.fillStyle='#000';for(let i=0;i<5;i++){c.beginPath();c.moveTo(W*.1+i*140+t*8,0);c.lineTo(W*.1+i*140+60+t*8,0);c.lineTo(W*.1+i*140+260+t*8,H*.7);c.lineTo(W*.1+i*140+200+t*8,H*.7);c.fill()}c.restore();
  const s=.96+.04*E.outExpo(P(t,.2,1.2)),fw=600*s,fh=760*s,cx=W/2,cy=780;c.save();c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=50;c.shadowOffsetY=30;c.fillStyle='#2A2520';c.fillRect(cx-fw/2-24,cy-fh/2-24,fw+48,fh+48);c.restore();c.fillStyle='#F7F3EC';c.fillRect(cx-fw/2-4,cy-fh/2-4,fw+8,fh+8);cover(c,S.m(0),cx-fw/2+30,cy-fh/2+30,fw-60,fh-60,{z:1.04});
  c.fillStyle=mixHex(p.bg,'#000000',.35);c.fillRect(120,1300,W-240,26);c.fillRect(160,1326,16,260);c.fillRect(W-176,1326,16,260);c.save();c.fillStyle=p.ac;c.beginPath();c.ellipse(320,1270,70,36,0,Math.PI,0);c.fill();c.restore();
  T(c,x.headline,W/2,1690,{font:IS,size:64,align:'center',color:p.fg,maxW:W-180,maxLines:2,p:P(t,1.6,.6)});mono(c,[x.brand,x.cta].filter(Boolean).join('  ·  '),W/2,1790,{align:'center',color:p.ac,size:22,p:P(t,2,.5),maxW:W-160});mono(c,'In the room',W/2,200,{align:'center',color:p.fg,size:22,p:P(t,.1,.5)})}});
KC({id:'kc-3ways',name:'Styled 3 Ways',fam:'Home',desc:'One product, three stylings: a numbered split that cycles, then all three side by side.',pal:{bg:'#F5F1EA',fg:'#1E1B18',ac:'#1E1B18'},tone:'light',dur:9,pt:6.6,hold:[1,6],tags:['Home','Styling'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const seg=1.6,t0=1,all=E.inOut(P(t,t0+seg*3,.8));T(c,'Styled 3 ways',W/2,230,{font:IS,italic:1,size:84,align:'center',color:p.fg,p:P(t,.1,.6)});
  for(let i=0;i<3;i++){if(t<t0+i*seg)continue;const cur=Math.min(2,Math.floor((t-t0)/seg))===i;if(!cur&&all<=0)continue;const L=(a,b)=>a+(b-a)*all,solo={x:80,y:330,w:W-160,h:1180},w3=(W-160-40)/3,tile={x:80+i*(w3+20),y:420,w:w3,h:900};const r={x:L(solo.x,tile.x),y:L(solo.y,tile.y),w:L(solo.w,tile.w),h:L(solo.h,tile.h)};
    c.save();clip(c,r.x,r.y,r.w,r.h);cover(c,S.m(i),r.x,r.y,r.w,r.h,{z:1.08});c.restore();T(c,String(i+1).padStart(2,'0'),r.x+30,r.y+80,{font:IT,weight:200,size:L(110,60),color:'#fff',shadow:'rgba(0,0,0,.35)',sb:16});T(c,pts3(x)[i],all>.5?r.x+r.w/2:80,all>.5?r.y+r.h+60:1600,{font:IS,size:L(56,32),align:all>.5?'center':'left',color:p.fg,maxW:all>.5?r.w:920,maxLines:2})}
  if(all>0&&x.cta)mono(c,x.cta+'  →',W/2,1560,{align:'center',color:p.fg,size:24,alpha:all})}});
KC({id:'kc-moodboard',name:'Moodboard',fam:'Home',desc:'A designer’s moodboard assembles: photo crops pinned, colour chips, a word or two in serif — the vibe, built.',pal:{bg:'#ECE6DC',fg:'#26211C',ac:'#B06A4A'},tone:'light',dur:9,pt:4.6,hold:[1.5,6.5],tags:['Home','Mood'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const sw=swatches(S.m(0));const items=[[.32,.24,440,560,-.05,0,1.05],[.7,.34,380,460,.06,1,1.3],[.36,.6,400,420,.03,2,1.6],[.7,.68,360,500,-.04,0,2.2]];
  items.forEach(([fx,fy,w,h,rot,mi,z],i)=>{const a=E.outBack(P(t,.3+i*.5,.6));if(a<=0)return;c.save();c.translate(W*fx,H*fy-(1-a)*80);c.rotate(rot);c.globalAlpha=Math.min(1,a*2);c.shadowColor='rgba(0,0,0,.18)';c.shadowBlur=26;c.shadowOffsetY=10;c.fillStyle='#fff';c.fillRect(-w/2,-h/2,w,h);c.shadowColor='transparent';cover(c,S.m(mi),-w/2+12,-h/2+12,w-24,h-24,{z,fx:[.5,.4,.6,.5][i],fy:[.4,.6,.75,.3][i]});
    c.beginPath();c.arc(0,-h/2+4,12,0,7);c.fillStyle=p.ac;c.fill();c.restore()});
  sw.forEach((col,i)=>{const a=E.outBack(P(t,2.4+i*.2,.4));c.save();c.translate(140+i*120,1580);c.scale(a,a);c.fillStyle=col;c.fillRect(-50,-50,100,100);c.restore()});
  T(c,x.headline||pts3(x)[0],W-80,1600,{font:IS,italic:1,size:64,align:'right',color:p.fg,maxW:500,maxLines:2,p:P(t,3.2,.6)});mono(c,x.brand,80,200,{color:p.fg,size:22,p:P(t,.1,.5)});mono(c,'Moodboard',W-80,200,{align:'right',color:p.ac,size:22,p:P(t,.1,.5)})}});
KC({id:'kc-cozy',name:'Cozy Season',fam:'Home',desc:'Rain on the window, warm lamp glow inside, the product in soft focus — the slow-evening reel.',pal:{bg:'#1E1712',fg:'#FFF1DF',ac:'#F2B26B'},dur:10,pt:4,hold:[2,7.5],grain:.06,tags:['Home','Mood'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,10,1.12,1.03),filter:'contrast(1.02) saturate(.95) sepia(.18) brightness(.92)'});c.save();c.globalCompositeOperation='screen';const g=c.createRadialGradient(W*.25,H*.3,20,W*.25,H*.3,800);g.addColorStop(0,'rgba(255,180,100,.4)');g.addColorStop(1,'rgba(255,180,100,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  c.save();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=2;for(let i=0;i<70;i++){const sx=(i*53)%W,sy=((i*97)%H+t*(500+i%5*90))%H;c.beginPath();c.moveTo(sx,sy);c.lineTo(sx-6,sy+38);c.stroke()}c.restore();
  for(let i=0;i<16;i++){const sx=(i*173)%W,sy=(i*311+t*12*(i%3))%H;c.beginPath();c.arc(sx,sy,5+(i%4)*3,0,7);c.fillStyle='rgba(255,255,255,.22)';c.fill()}
  scrimB(c,W,H,.75,.5);kin(c,x.headline||'Stay in, slow down',80,1450,{t,t0:1,font:IS,italic:1,size:100,maxW:920,maxLines:2,color:p.fg,anchor:'bottom'});mono(c,[x.brand,x.cta].filter(Boolean).join('  ·  '),80,1560,{color:p.ac,size:22,p:P(t,2.2,.5),maxW:920})}});
KC({id:'kc-care',name:'Care Guide',fam:'Home',desc:'Clean care icons draw in one by one with simple instructions, so the product lasts.',pal:{bg:'#F2F4F1',fg:'#1F2622',ac:'#3D6B57'},tone:'light',dur:9,pt:4.4,hold:[1.5,6.5],tags:['Home','Care'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,0,W,560);cover(c,S.m(0),0,0,W,560,{z:kb(t,9,1.12,1.03)});c.restore();T(c,'Care guide',80,690,{font:IS,size:96,color:p.fg,p:P(t,.2,.6)});mono(c,x.brand,80,750,{color:p.ac,size:22,p:P(t,.4,.5)});
  const icons=[(cx,cy,q)=>{c.beginPath();c.moveTo(cx,cy-44);c.bezierCurveTo(cx+40,cy,cx+34,cy+40,cx,cy+40);c.bezierCurveTo(cx-34,cy+40,cx-40,cy,cx,cy-44);c.stroke()},(cx,cy,q)=>{c.beginPath();c.arc(cx,cy,22,0,7);c.stroke();for(let i=0;i<8;i++){const a=i*Math.PI/4;c.beginPath();c.moveTo(cx+Math.cos(a)*32,cy+Math.sin(a)*32);c.lineTo(cx+Math.cos(a)*44,cy+Math.sin(a)*44);c.stroke()}},(cx,cy,q)=>{c.beginPath();c.moveTo(cx,cy-30);c.arc(cx,cy-38,8,Math.PI/2,Math.PI*2.2);c.moveTo(cx,cy-30);c.lineTo(cx-46,cy+20);c.lineTo(cx+46,cy+20);c.closePath();c.stroke()}];
  const tips=[x.f1?`${x.f1}`:'Handle gently',x.f2?`${x.f2}`:'Keep out of direct sun',x.f3?`${x.f3}`:'Store with care'];tips.forEach((s,i)=>{const t0=1+i*.8,y=920+i*230,a=E.out(P(t,t0,.5));if(a<=0)return;c.save();c.globalAlpha=a;c.beginPath();c.arc(150,y,70,0,7);c.fillStyle='#fff';c.fill();c.strokeStyle=p.ac;c.lineWidth=5;icons[i](150,y,a);c.restore();
    T(c,s,260,y+16,{font:IS,size:52,color:p.fg,maxW:740,maxLines:2,p:P(t,t0+.2,.5)})});if(x.cta)mono(c,x.cta,80,1720,{color:p.ac,size:22,p:P(t,3.6,.5)})}});


/* =====================================================================
   BATCH 6 · 25 POSTS — occasions & categories (static 1080×1350)
   Celebrate · Lookbook · Taste · Glow · Home
   ===================================================================== */
const btn6=(c,text,cx,cy,bg,fg,o={})=>{if(!text)return;c.save();c.font=`600 ${o.size||26}px ${IT}`;if('letterSpacing' in c)c.letterSpacing='2px';const s=String(text).toUpperCase(),w=Math.min(o.maxW||760,c.measureText(s).width+(o.pad||90)),h=(o.size||26)*2.5;rr(c,cx-w/2,cy-h/2,w,h,h/2);c.fillStyle=bg;c.fill();c.restore();T(c,s,cx,cy+1,{font:IT,weight:600,size:o.size||26,align:'center',base:'middle',color:fg,ls:2,maxW:w-50,maxLines:1})};
const frame6=(c,x,y,w,h,col,gap=14,lw=2)=>{c.save();c.strokeStyle=col;c.lineWidth=lw;c.strokeRect(x,y,w,h);c.strokeRect(x+gap,y+gap,w-gap*2,h-gap*2);c.restore()};
const shadowCard6=(c,x,y,w,h,col='#fff',o={})=>{c.save();c.shadowColor=o.sh||'rgba(0,0,0,.2)';c.shadowBlur=o.blur||34;c.shadowOffsetY=o.oy||14;c.fillStyle=col;c.fillRect(x,y,w,h);c.restore()};
const anniv6=x=>{const lb=String(x.label||''),yr=lb.match(/(?:since|est\.?|established)\s*(\d{4})/i),cnt=lb.match(/(\d+)\s*(?:years?|yrs)/i);return yr?{mode:'since',n:+yr[1]}:cnt?{mode:'years',n:+cnt[1]}:{mode:'thanks',n:0}};

/* ================= CELEBRATE ================= */
KP({id:'kc-p-festsale',name:'Festival Offer',fam:'Celebrate',desc:'A rangoli mandala rings your product, with the festival headline, price and brand set like an invitation.',pal:{bg:'#5B0F2E',fg:'#FFF1DC',ac:'#E8B04B'},grain:.04,tags:['Celebrate','Festive','Offer'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const g=c.createRadialGradient(W/2,520,40,W/2,520,700);g.addColorStop(0,rgba(p.ac,.18));g.addColorStop(1,rgba(p.ac,0));c.fillStyle=g;c.fillRect(0,0,W,H);
  mandala(c,W/2,520,430,rgba(p.ac,.55),1,.2);c.save();c.beginPath();c.arc(W/2,520,250,0,7);c.clip();cover(c,S.m(0),W/2-250,270,500,500,{z:1.05});c.restore();c.beginPath();c.arc(W/2,520,258,0,7);c.strokeStyle=p.ac;c.lineWidth=4;c.stroke();
  mono(c,x.label||'Festive edit',W/2,1010,{align:'center',color:p.ac,size:22,maxW:W-200});T(c,x.headline,W/2,1090,{font:IS,size:68,align:'center',color:p.fg,maxW:W-160,maxLines:2,lh:1.05});
  if(x.price)btn6(c,'From '+x.price,W/2,1210,p.ac,ink(p.ac),{size:24});T(c,x.brand,W/2,1305,{font:IS,size:34,align:'center',color:rgba(p.fg,.8),maxW:W-200,maxLines:1})}});
KP({id:'kc-p-wedding',name:'The Wedding Edit',fam:'Celebrate',desc:'An arched portrait in a gilded double frame, soft petals and a wedding-season title — invitation-card calm.',pal:{bg:'#F6EFE4',fg:'#3B2A22',ac:'#B08A4E'},tone:'light',tags:['Celebrate','Wedding'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);frame6(c,40,40,W-80,H-80,rgba(p.ac,.7),14,2);petals(c,W,H,3.2,rgba(p.ac,.35),18,4);
  const aw=560,ah=760,ax=(W-aw)/2,ay=140;c.save();archPath(c,ax,ay,aw,ah);c.clip();cover(c,S.m(0),ax,ay,aw,ah,{z:1.04});c.restore();c.save();archPath(c,ax-14,ay-14,aw+28,ah+28);c.strokeStyle=p.ac;c.lineWidth=2;c.stroke();c.restore();
  T(c,'The Wedding Edit',W/2,1010,{font:IS,italic:1,size:84,align:'center',color:p.fg,maxW:W-180,maxLines:1});hair(c,W/2-90,1050,W/2+90,1050,p.ac,2,1);
  T(c,x.headline,W/2,1120,{font:IS,size:40,align:'center',color:rgba(p.fg,.85),maxW:W-240,maxLines:2});mono(c,[x.brand,x.cta].filter(Boolean).join('  ·  '),W/2,1240,{align:'center',color:p.ac,size:20,maxW:W-200})}});
KP({id:'kc-p-anniversary',name:'Milestone',fam:'Celebrate',desc:'A brand milestone done properly: “Since 2019”, a years count or a simple thank-you, with a photo strip of the journey.',pal:{bg:'#111113',fg:'#F5F4EF',ac:'#B9FA70'},tags:['Celebrate','Anniversary'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const a=anniv6(x);
  if(a.mode==='since'){T(c,'Since',W/2,200,{font:IS,italic:1,size:72,align:'center',color:p.ac});T(c,String(a.n),W/2,420,{font:IT,weight:200,size:fit(c,String(a.n),IT,200,W-200,330),align:'center',base:'middle',color:p.fg})}
  else if(a.mode==='years'){T(c,String(a.n),W/2,340,{font:IT,weight:200,size:fit(c,String(a.n),IT,200,W-200,360),align:'center',base:'middle',color:p.fg});T(c,(a.n===1?'year':'years')+' of',W/2,560,{font:IS,italic:1,size:68,align:'center',color:p.ac})}
  else T(c,'Thank you',W/2,380,{font:IS,italic:1,size:150,align:'center',base:'middle',color:p.fg});
  T(c,x.brand,W/2,a.mode==='years'?650:600,{font:IS,size:52,align:'center',color:p.fg,maxW:W-160,maxLines:1});
  const n=3,w=(W-160-40)/3;for(let i=0;i<n;i++){const x0=80+i*(w+20);B4tile(c,S.m(i),x0,760,w,380,{filter:i===1?'':'saturate(.85)'})}
  T(c,a.mode==='thanks'?(x.headline||'Here’s to what’s next.'):'Thank you for being part of it.',W/2,1220,{font:IS,italic:1,size:44,align:'center',color:rgba(p.fg,.85),maxW:W-160,maxLines:1});mono(c,x.handle,W/2,1290,{align:'center',color:rgba(p.fg,.5),size:20,upper:0})}});
KP({id:'kc-p-eos',name:'End of Season',fam:'Celebrate',desc:'Poster-loud end-of-season type stacked over the product with a clean price tag and final-call line.',pal:{bg:'#E9E4DA',fg:'#121212',ac:'#D2452B'},tone:'light',tags:['Celebrate','Sale'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),W-560,0,560,H);
  ['End','of','season'].forEach((w,i)=>T(c,w,60,260+i*230,{font:AN,size:260,upper:1,color:i===2?p.ac:p.fg,shadow:0}));
  c.save();c.translate(170,1050);c.rotate(-.06);c.fillStyle=p.fg;c.fillRect(-110,-60,420,140);T(c,x.price?'From '+x.price:'Final edit',100,10,{font:IT,weight:700,size:42,align:'center',base:'middle',color:p.bg,maxW:380,maxLines:1});c.restore();
  T(c,x.headline,60,1210,{font:IT,weight:600,size:38,color:p.fg,maxW:440,maxLines:2});mono(c,x.brand,60,1300,{color:rgba(p.fg,.6),size:18,maxW:440})}});
KP({id:'kc-p-weekend',name:'The Weekend Edit',fam:'Celebrate',desc:'Friday, Saturday, Sunday — three framed picks in a row with a relaxed weekend headline.',pal:{bg:'#F3EDE4',fg:'#24201C',ac:'#C0613A'},tone:'light',tags:['Celebrate','Edit'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,x.brand,70,110,{color:rgba(p.fg,.6),size:20,maxW:600});T(c,'The weekend edit',70,250,{font:IS,italic:1,size:104,color:p.fg,maxW:W-140,maxLines:1});
  const days=['Fri','Sat','Sun'],w=(W-140-40)/3,f=pts3(x);days.forEach((d,i)=>{const x0=70+i*(w+20);shadowCard6(c,x0,360,w,640);B4tile(c,S.m(i),x0+12,372,w-24,500);T(c,d,x0+22,940,{font:IS,size:50,color:p.ac});mono(c,f[i]||'',x0+22,980,{color:rgba(p.fg,.65),size:16,maxW:w-40})});
  T(c,x.headline,70,1140,{font:IS,size:56,color:p.fg,maxW:W-140,maxLines:2});if(x.cta)mono(c,x.cta+'  →',70,1290,{color:p.ac,size:22})}});

/* ================= LOOKBOOK ================= */
KP({id:'kc-p-lookbook',name:'Lookbook Cover',fam:'Lookbook',desc:'A quiet lookbook cover: full-bleed image, a thin title band and the season set in small caps.',pal:{bg:'#F4F1EB',fg:'#141414',ac:'#141414'},tone:'light',tags:['Lookbook','Cover'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),60,60,W-120,1010);
  T(c,'Lookbook',60,1180,{font:IS,size:110,color:p.fg});mono(c,x.label||'New season',W-60,1150,{align:'right',color:p.fg,size:20,maxW:420});mono(c,x.brand,W-60,1185,{align:'right',color:rgba(p.fg,.55),size:20,maxW:420});
  hair(c,60,1230,W-60,1230,rgba(p.fg,.25),2,1);mono(c,'Looks 01 — 0'+Math.max(3,Math.min(9,S.n||4)),60,1285,{color:rgba(p.fg,.6),size:18});if(x.cta)mono(c,x.cta+'  →',W-60,1285,{align:'right',color:p.fg,size:18})}});
KP({id:'kc-p-contact',name:'Contact Sheet',fam:'Lookbook',desc:'A film contact sheet: six numbered frames on black with one pick circled in grease pencil.',pal:{bg:'#0E0E0E',fg:'#EDEDED',ac:'#F04E37'},tags:['Lookbook','Film'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,(x.brand||'')+'  ·  contact sheet',60,90,{color:rgba(p.fg,.6),size:18,maxW:W-120});
  const cols=2,rows=3,gw=(W-120-30)/2,gh=300;for(let i=0;i<6;i++){const cx=60+(i%cols)*(gw+30),cy=130+Math.floor(i/cols)*(gh+70);c.fillStyle='#1b1b1b';c.fillRect(cx,cy,gw,gh);B4tile(c,S.m(i%Math.max(1,S.n||1)),cx+10,cy+10,gw-20,gh-20,{z:1.06+i*.04,fx:.3+(i%3)*.2,filter:'grayscale(.15)'});mono(c,String(i+1).padStart(2,'0')+'A',cx,cy+gh+30,{color:'#E3B341',size:16});
   if(i===3){c.save();c.strokeStyle=p.ac;c.lineWidth=7;c.lineCap='round';c.beginPath();c.ellipse(cx+gw/2,cy+gh/2,gw/2+16,gh/2+20,-.04,.3,Math.PI*2+.15);c.stroke();c.restore()}}
  T(c,x.headline,60,1290,{font:IS,italic:1,size:52,color:p.fg,maxW:W-120,maxLines:1})}});
KP({id:'kc-p-material',name:'Material Card',fam:'Lookbook',desc:'A close-up of the material with colour chips pulled from your photo and its key details listed like a swatch card.',pal:{bg:'#F5F2EC',fg:'#1C1A17',ac:'#8C6A43'},tone:'light',tags:['Lookbook','Material'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),70,70,W-140,620,{z:1.8,fx:.5,fy:.55});c.strokeStyle=rgba(p.fg,.15);c.lineWidth=2;c.strokeRect(70,70,W-140,620);
  const sw=swatches(S.m(0)),cw=(W-140-3*20)/4;sw.slice(0,4).forEach((col,i)=>{const x0=70+i*(cw+20);c.fillStyle=col;c.fillRect(x0,730,cw,150);mono(c,col.toUpperCase(),x0,915,{color:rgba(p.fg,.6),size:16})});
  T(c,'The material',70,1030,{font:IS,italic:1,size:78,color:p.fg});const f=pts3(x);f.forEach((s,i)=>{mono(c,'No. '+(i+1),70,1110+i*62,{color:p.ac,size:18});T(c,s,200,1112+i*62,{font:IS,size:38,color:p.fg,maxW:W-280,maxLines:1})});
  mono(c,x.brand,W-70,1300,{align:'right',color:rgba(p.fg,.5),size:18,maxW:600})}});
KP({id:'kc-p-chapter',name:'Chapter Opener',fam:'Lookbook',desc:'A collection told like a book: chapter numeral, collection title and a single inset image on a calm page.',pal:{bg:'#1D2321',fg:'#EFEBE3',ac:'#C7A46B'},tags:['Lookbook','Collection'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,'Chapter',80,140,{color:p.ac,size:22});T(c,'II',80,400,{font:IS,size:300,color:p.fg});
  B4tile(c,S.m(0),W-80-460,100,460,620);T(c,x.label||x.brand,80,860,{font:IS,italic:1,size:92,color:p.fg,maxW:W-160,maxLines:2,lh:1});hair(c,80,980,280,980,p.ac,2,1);
  T(c,x.sub||x.headline,80,1060,{font:IS,size:40,color:rgba(p.fg,.8),maxW:W-200,maxLines:3,lh:1.25});foot(c,S,1220,p.fg)}});
KP({id:'kc-p-lookgrid',name:'Four Looks',fam:'Lookbook',desc:'A tidy 2×2 lookbook grid with look numbers and one line per look.',pal:{bg:'#FAF8F4',fg:'#151515',ac:'#151515'},tone:'light',tags:['Lookbook','Grid'],multi:4,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const gw=(W-140-24)/2,gh=520,f=[...pts3(x),x.headline];
  for(let i=0;i<4;i++){const x0=70+(i%2)*(gw+24),y0=70+Math.floor(i/2)*(gh+90);B4tile(c,S.m(i),x0,y0,gw,gh);mono(c,'Look '+String(i+1).padStart(2,'0'),x0,y0+gh+40,{color:p.fg,size:18});T(c,f[i]||'',x0+gw,y0+gh+42,{font:IS,italic:1,size:30,align:'right',color:rgba(p.fg,.7),maxW:gw-160,maxLines:1})}
  hair(c,70,1270,W-70,1270,rgba(p.fg,.2),2,1);mono(c,x.brand,70,1310,{color:p.fg,size:18,maxW:600});mono(c,x.label||'',W-70,1310,{align:'right',color:rgba(p.fg,.55),size:18,maxW:420})}});

/* ================= TASTE ================= */
KP({id:'kc-p-menu',name:'Menu Card',fam:'Taste',desc:'A printed menu card: framed border, the dish shot, items with dotted leaders and the price.',pal:{bg:'#F5EFE3',fg:'#2B2118',ac:'#A23B24'},tone:'light',tags:['Taste','Menu'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);frame6(c,50,50,W-100,H-100,rgba(p.fg,.35),12,2);
  T(c,x.brand,W/2,170,{font:IS,size:58,align:'center',color:p.fg,maxW:W-260,maxLines:1});mono(c,x.label||'Menu',W/2,215,{align:'center',color:p.ac,size:18,maxW:W-260});
  B4tile(c,S.m(0),120,260,W-240,480);const items=[x.headline,...pts3(x)].filter(Boolean).slice(0,4);
  items.forEach((it,i)=>{const y=830+i*96;T(c,it,120,y,{font:IS,size:44,color:p.fg,maxW:620,maxLines:1});c.font=`400 44px ${IS}`;const w=Math.min(620,c.measureText(it).width);dots(c,140+w,W-280,y-8,rgba(p.fg,.35));T(c,i===0&&x.price?x.price:'·',W-120,y,{font:IS,size:44,align:'right',color:p.ac})});
  if(x.cta)mono(c,x.cta,W/2,1250,{align:'center',color:p.fg,size:20})}});
KP({id:'kc-p-recipe',name:'Recipe Card',fam:'Taste',desc:'An index-card recipe: ruled lines, a taped photo and a “what you’ll need” list from your highlights.',pal:{bg:'#E8DFCF',fg:'#2A2420',ac:'#C0392B'},tone:'light',tags:['Taste','Recipe'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.translate(W/2,H/2+20);c.rotate(-.012);shadowCard6(c,-470,-560,940,1140,'#FFFDF8',{blur:40});
  c.strokeStyle=rgba('#4A7BB7',.25);c.lineWidth=2;for(let y=-330;y<560;y+=62){c.beginPath();c.moveTo(-470,y);c.lineTo(470,y);c.stroke()}c.strokeStyle=rgba(p.ac,.45);c.beginPath();c.moveTo(-380,-560);c.lineTo(-380,580);c.stroke();
  T(c,x.headline,-340,-430,{font:IS,italic:1,size:56,color:p.fg,maxW:420,maxLines:3,lh:1.05});c.save();c.translate(250,-330);c.rotate(.05);c.fillStyle='#fff';c.fillRect(-180,-200,360,400);B4tile(c,S.m(0),-166,-186,332,372);c.fillStyle='rgba(235,225,200,.8)';c.fillRect(-60,-218,120,36);c.restore();
  mono(c,'What you’ll need',-340,-30,{color:p.ac,size:20});pts3(x).forEach((s,i)=>T(c,'—  '+s,-340,48+i*62,{font:IS,size:40,color:p.fg,maxW:760,maxLines:1}));
  mono(c,x.brand,-340,330,{color:rgba(p.fg,.55),size:18,maxW:700});if(x.cta)T(c,x.cta,-340,440,{font:IS,italic:1,size:40,color:p.ac,maxW:760,maxLines:1});c.restore()}});
KP({id:'kc-p-fresh',name:'Fresh & Hot',fam:'Taste',desc:'The dish full-bleed with curling steam, a loud “Fresh” and the order line — appetite first.',pal:{bg:'#1C120D',fg:'#FFF6EA',ac:'#F2A541'},grain:.05,tags:['Taste','Food'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'saturate(1.12) contrast(1.04)'});scrimT(c,W,H,.55,.3);scrimB(c,W,H,.85,.5);steam(c,W/2,620,2.3,'rgba(255,255,255,.9)');
  T(c,'Fresh',70,240,{font:AN,size:210,upper:1,color:p.fg});mono(c,x.brand,72,300,{color:p.ac,size:22,maxW:800});
  T(c,x.headline,70,1130,{font:IS,size:68,color:p.fg,maxW:W-140,maxLines:2,anchor:'bottom'});if(x.cta)btn6(c,x.cta,W-70-230,1250,p.ac,ink(p.ac),{size:22,maxW:460});if(x.price)T(c,x.price,70,1262,{font:IT,weight:600,size:44,color:p.fg,maxW:400,maxLines:1})}});
KP({id:'kc-p-tasting',name:'Tasting Notes',fam:'Taste',desc:'A flavour wheel around the product with three tasting notes — for coffee, tea, chocolate, wine or spice.',pal:{bg:'#F1E9DE',fg:'#2A1E16',ac:'#8A4B2A'},tone:'light',tags:['Taste','Notes'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Tasting notes',W/2,150,{font:IS,italic:1,size:84,align:'center',color:p.fg});mono(c,x.brand,W/2,200,{align:'center',color:rgba(p.fg,.6),size:20,maxW:W-200});
  const cx=W/2,cy=650,R=360,f=pts3(x),tones=[p.ac,mixHex(p.ac,'#D9A441',.6),mixHex(p.ac,'#6E7B4F',.6)];for(let i=0;i<3;i++){const a0=-Math.PI/2+i*2*Math.PI/3,a1=a0+2*Math.PI/3;c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,R,a0+.02,a1-.02);c.closePath();c.fillStyle=rgba(tones[i],.34);c.fill();
   const am=(a0+a1)/2,tx=cx+Math.cos(am)*(R-80),ty=cy+Math.sin(am)*(R-80);T(c,f[i],tx,ty,{font:IS,italic:1,size:36,align:'center',base:'middle',color:p.fg,maxW:220,maxLines:2})}
  c.save();c.beginPath();c.arc(cx,cy,170,0,7);c.clip();cover(c,S.m(0),cx-170,cy-170,340,340,{z:1.05});c.restore();c.beginPath();c.arc(cx,cy,176,0,7);c.strokeStyle=p.bg;c.lineWidth=10;c.stroke();
  T(c,x.headline,W/2,1130,{font:IS,size:50,align:'center',color:p.fg,maxW:W-160,maxLines:2});mono(c,x.label||'',W/2,1270,{align:'center',color:p.ac,size:20,maxW:W-200})}});
KP({id:'kc-p-order',name:'Order Now',fam:'Taste',desc:'A bold order card: the product on a dark plate, delivery line and one unmissable button.',pal:{bg:'#121417',fg:'#FFFFFF',ac:'#B9FA70'},tags:['Taste','Order'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.beginPath();c.arc(W/2,560,400,0,7);c.fillStyle=mixHex(p.bg,'#FFFFFF',.06);c.fill();c.clip();cover(c,S.m(0),W/2-400,160,800,800,{z:1.04});c.restore();
  mono(c,x.brand,70,100,{color:rgba(p.fg,.65),size:20,maxW:600});mono(c,x.f3||'Order today',W-70,100,{align:'right',color:p.ac,size:20,maxW:400});
  T(c,x.headline,W/2,1080,{font:IT,weight:700,size:58,align:'center',color:p.fg,maxW:W-140,maxLines:2,anchor:'bottom'});if(x.price)T(c,x.price,W/2,1150,{font:IT,weight:300,size:44,align:'center',color:rgba(p.fg,.8)});btn6(c,x.cta||'Order now',W/2,1250,p.ac,ink(p.ac),{size:26})}});

/* ================= GLOW ================= */
KP({id:'kc-p-ritual',name:'AM / PM Ritual',fam:'Glow',desc:'Morning and evening side by side: two moments of the product with the routine steps under each.',pal:{bg:'#F8EDE8',fg:'#3A2A27',ac:'#C9877A'},tone:'light',tags:['Glow','Routine'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;const hw=W/2;c.fillStyle=mixHex(p.bg,'#FFE9C7',.5);c.fillRect(0,0,hw,H);c.fillStyle='#2B2A44';c.fillRect(hw,0,hw,H);
  [[0,'AM',p.fg,0],[hw,'PM','#EDE9F6',1]].forEach(([x0,lb,col,k])=>{mono(c,lb,x0+60,110,{color:k?'#B9B3E0':p.ac,size:24});B4tile(c,S.m(k),x0+60,150,hw-120,620);
   pts3(x).forEach((s,i)=>{const y=880+i*100;c.beginPath();c.arc(x0+78,y-12,18,0,7);c.fillStyle=k?'#B9B3E0':p.ac;c.fill();T(c,String(i+1),x0+78,y-11,{font:IT,weight:700,size:20,align:'center',base:'middle',color:k?'#2B2A44':'#fff'});T(c,s,x0+112,y,{font:IS,size:34,color:col,maxW:hw-170,maxLines:1})})});
  T(c,'The ritual',60,1240,{font:IS,italic:1,size:64,color:p.fg});mono(c,x.brand,W-60,1225,{align:'right',color:'#EDE9F6',size:18,maxW:460})}});
KP({id:'kc-p-ingredients',name:'What’s Inside',fam:'Glow',desc:'The product at the centre with ingredient callouts on fine leader lines — clean, clinical, honest.',pal:{bg:'#F4F3EF',fg:'#1F2421',ac:'#5E7D6A'},tone:'light',tags:['Glow','Ingredients'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'What’s inside',W/2,150,{font:IS,italic:1,size:84,align:'center',color:p.fg});
  card(c,S.m(0),W/2,640,500,720,{z:1.03});const f=[...pts3(x),x.label].filter(Boolean).slice(0,4),pos=[[170,420],[910,500],[170,880],[910,960]],anc=[[400,460],[680,540],[400,840],[680,920]];
  f.forEach((s,i)=>{const[px,py]=pos[i],[ax,ay]=anc[i];hair(c,px+(px<W/2?110:-110),py,ax,ay,rgba(p.fg,.4),2,1);c.beginPath();c.arc(ax,ay,7,0,7);c.fillStyle=p.ac;c.fill();c.beginPath();c.arc(px,py,108,0,7);c.fillStyle='#fff';c.fill();c.strokeStyle=rgba(p.fg,.2);c.lineWidth=2;c.stroke();T(c,s,px,py,{font:IS,size:28,align:'center',base:'middle',color:p.fg,maxW:180,maxLines:3,lh:1.1})});
  T(c,x.headline,W/2,1150,{font:IS,size:48,align:'center',color:p.fg,maxW:W-160,maxLines:2});mono(c,x.brand,W/2,1280,{align:'center',color:p.ac,size:20,maxW:W-200})}});
KP({id:'kc-p-glow',name:'The Glow',fam:'Glow',desc:'Full-bleed skin-light: a warm light leak over the photo and a soft italic headline.',pal:{bg:'#2A1A16',fg:'#FFF4EC',ac:'#F7C9A8'},grain:.04,tags:['Glow','Beauty'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'brightness(1.04) saturate(1.05)'});c.save();c.globalCompositeOperation='screen';const g=c.createRadialGradient(W*.85,H*.12,20,W*.85,H*.12,W*.9);g.addColorStop(0,'rgba(255,190,140,.55)');g.addColorStop(1,'rgba(255,190,140,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  scrimT(c,W,H,.45,.2);scrimB(c,W,H,.8,.5);mono(c,x.brand,70,100,{color:p.fg,size:20,maxW:700});T(c,x.headline||'Your glow, bottled',70,1180,{font:IS,italic:1,size:96,color:p.fg,maxW:W-140,maxLines:2,anchor:'bottom'});
  mono(c,[x.f1,x.f2].filter(Boolean).join('  ·  '),70,1270,{color:p.ac,size:20,maxW:W-140})}});
KP({id:'kc-p-shades',name:'Shade Range',fam:'Glow',desc:'The shade range as tidy swatch dots pulled from your photo, with one shade picked and named.',pal:{bg:'#F6F1EC',fg:'#2B211E',ac:'#B5715A'},tone:'light',tags:['Glow','Shades'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),0,0,W,640);T(c,'Find your shade',70,770,{font:IS,italic:1,size:84,color:p.fg});
  const sw=swatches(S.m(0)),pick=2;sw.slice(0,4).forEach((col,i)=>{const cx=150+i*260,cy=950,r=i===pick?96:82;c.beginPath();c.arc(cx,cy,r,0,7);c.fillStyle=col;c.fill();if(i===pick){c.beginPath();c.arc(cx,cy,r+12,0,7);c.strokeStyle=p.fg;c.lineWidth=3;c.stroke()}mono(c,col.toUpperCase(),cx,cy+140,{align:'center',color:rgba(p.fg,i===pick?.9:.5),size:16})});
  T(c,x.headline,70,1200,{font:IS,size:46,color:p.fg,maxW:W-140,maxLines:1});mono(c,x.brand,70,1280,{color:p.ac,size:20,maxW:600})}});
KP({id:'kc-p-texture',name:'Texture Study',fam:'Glow',desc:'A loupe magnifies the texture of your product — the detail shot, set on the full image.',pal:{bg:'#141312',fg:'#F6F2EC',ac:'#E7C9A5'},tags:['Glow','Detail'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.04,filter:'brightness(.75)'});const lx=W*.6,ly=560,R=300;
  c.save();c.beginPath();c.arc(lx,ly,R,0,7);c.clip();cover(c,S.m(0),0,0,W,H,{z:2.6,fx:.6,fy:.42});c.restore();c.beginPath();c.arc(lx,ly,R,0,7);c.strokeStyle=p.fg;c.lineWidth=8;c.stroke();c.beginPath();c.arc(lx,ly,R+18,0,7);c.strokeStyle=rgba(p.fg,.35);c.lineWidth=2;c.stroke();
  mono(c,'× 2.6',lx+R*.72,ly+R*.72+40,{color:p.ac,size:22});scrimB(c,W,H,.85,.55);mono(c,'Texture study',70,1060,{color:p.ac,size:22});T(c,x.headline,70,1150,{font:IS,italic:1,size:70,color:p.fg,maxW:W-140,maxLines:2});mono(c,x.brand,70,1290,{color:rgba(p.fg,.6),size:18,maxW:700})}});

/* ================= HOME ================= */
KP({id:'kc-p-room',name:'In the Room',fam:'Home',desc:'Your product framed on a softly lit wall above a console with a vase silhouette — styled as if in a real home.',pal:{bg:'#E9E2D7',fg:'#2A2520',ac:'#9C6B3C'},tone:'light',tags:['Home','Interior'],
 r(c,t,S){const{W,H,p,x}=S;const g=c.createRadialGradient(W*.5,300,60,W*.5,400,1000);g.addColorStop(0,mixHex(p.bg,'#FFFFFF',.35));g.addColorStop(1,mixHex(p.bg,'#000000',.06));c.fillStyle=g;c.fillRect(0,0,W,H);
  const fx=240,fy=150,fw=600,fh=640;shadowCard6(c,fx-26,fy-26,fw+52,fh+52,'#2A2520',{blur:40,oy:22});c.fillStyle='#FBF9F5';c.fillRect(fx-6,fy-6,fw+12,fh+12);B4tile(c,S.m(0),fx+30,fy+30,fw-60,fh-60);
  const cy=960;c.fillStyle=mixHex(p.ac,'#000000',.15);c.fillRect(140,cy,W-280,26);c.fillRect(180,cy+26,16,140);c.fillRect(W-196,cy+26,16,140);c.fillStyle=mixHex(p.bg,'#000000',.08);c.fillRect(0,cy+166,W,H-cy-166);
  c.fillStyle=mixHex(p.fg,p.bg,.2);c.beginPath();c.ellipse(260,cy-60,44,60,0,0,7);c.fill();c.fillRect(246,cy-130,28,30);c.strokeStyle=mixHex(p.fg,p.bg,.3);c.lineWidth=3;c.beginPath();c.moveTo(260,cy-130);c.quadraticCurveTo(230,cy-220,200,cy-260);c.moveTo(260,cy-130);c.quadraticCurveTo(300,cy-230,330,cy-250);c.stroke();
  c.fillStyle=mixHex(p.ac,p.bg,.3);c.fillRect(W-380,cy-50,200,24);c.fillRect(W-360,cy-26,170,26);
  T(c,x.headline,70,1240,{font:IS,italic:1,size:56,color:p.fg,maxW:W-140,maxLines:1});mono(c,x.brand,70,1300,{color:rgba(p.fg,.6),size:18,maxW:600});if(x.price)mono(c,x.price,W-70,1300,{align:'right',color:p.ac,size:18,upper:0})}});
KP({id:'kc-p-3ways',name:'Styled 3 Ways',fam:'Home',desc:'Three tall panels — minimal, layered, statement — showing one piece styled three ways.',pal:{bg:'#EFEBE4',fg:'#1F1D1A',ac:'#7A5C3E'},tone:'light',tags:['Home','Styling'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Styled 3 ways',70,170,{font:IS,size:96,color:p.fg});mono(c,x.brand,70,225,{color:rgba(p.fg,.6),size:20,maxW:900});
  const w=(W-140-40)/3,names=['Minimal','Layered','Statement'];names.forEach((nm,i)=>{const x0=70+i*(w+20);B4tile(c,S.m(i),x0,290,w,780,{z:1.06+i*.14,fx:.5,fy:.5-i*.04});mono(c,'0'+(i+1),x0,1115,{color:p.ac,size:20});T(c,nm,x0,1165,{font:IS,italic:1,size:42,color:p.fg,maxW:w,maxLines:1})});
  hair(c,70,1220,W-70,1220,rgba(p.fg,.2),2,1);T(c,x.headline,70,1290,{font:IS,size:38,color:p.fg,maxW:W-140,maxLines:1})}});
KP({id:'kc-p-moodboard',name:'Moodboard',fam:'Home',desc:'A pinned moodboard: tilted photos with tape, colour chips from your images and a handwritten-style note.',pal:{bg:'#E4DDD1',fg:'#2B2621',ac:'#B4553A'},tone:'light',grain:.05,tags:['Home','Moodboard'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const ph=[[300,360,440,540,-.06],[770,330,380,460,.05],[640,800,420,360,-.03]];
  ph.forEach(([cx,cy,w,h,r],i)=>{c.save();c.translate(cx,cy);c.rotate(r);shadowCard6(c,-w/2,-h/2,w,h,'#fff',{blur:24,oy:10});B4tile(c,S.m(i),-w/2+14,-h/2+14,w-28,h-28);c.fillStyle='rgba(240,232,210,.82)';c.fillRect(-55,-h/2-18,110,36);c.restore()});
  const sw=swatches(S.m(0));sw.slice(0,4).forEach((col,i)=>{c.save();c.translate(130+i*0,700+i*110);c.rotate(-.04);c.fillStyle='#fff';c.fillRect(-60,-46,240,92);c.fillStyle=col;c.fillRect(-50,-36,72,72);mono(c,col.toUpperCase(),36,8,{color:rgba(p.fg,.65),size:15});c.restore()});
  T(c,x.headline,80,1170,{font:IS,italic:1,size:60,color:p.fg,maxW:W-160,maxLines:2});mono(c,x.brand,80,1290,{color:p.ac,size:20,maxW:700})}});
KP({id:'kc-p-cozy',name:'Cosy Season',fam:'Home',desc:'A warm window-lit scene: soft muntin shadows across the photo, falling flecks and a slow-living headline.',pal:{bg:'#24180F',fg:'#FFF2E2',ac:'#F0B36B'},grain:.05,tags:['Home','Seasonal'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'sepia(.15) saturate(1.05)'});c.fillStyle='rgba(60,30,10,.18)';c.fillRect(0,0,W,H);
  c.save();c.globalCompositeOperation='screen';c.translate(W*.75,0);c.transform(1,0,-.35,1,0,0);[[-260,170],[-40,110]].forEach(([bx,bw])=>{const g=c.createLinearGradient(bx,0,bx+bw,0);g.addColorStop(0,'rgba(255,200,140,0)');g.addColorStop(.5,'rgba(255,200,140,.22)');g.addColorStop(1,'rgba(255,200,140,0)');c.fillStyle=g;c.fillRect(bx,0,bw,H)});c.restore();
  for(let i=0;i<22;i++){const sx=(i*173)%W,sy=(i*311)%H;c.beginPath();c.arc(sx,sy,4+(i%4)*3,0,7);c.fillStyle='rgba(255,255,255,.22)';c.fill()}
  scrimB(c,W,H,.8,.5);mono(c,x.label||'Cosy season',70,960,{color:p.ac,size:22,maxW:W-140});T(c,x.headline||'Stay in, slow down',70,1160,{font:IS,italic:1,size:84,color:p.fg,maxW:W-140,maxLines:2,anchor:'bottom'});mono(c,[x.brand,x.cta].filter(Boolean).join('  ·  '),70,1270,{color:rgba(p.fg,.75),size:20,maxW:W-140})}});
KP({id:'kc-p-care',name:'Care Card',fam:'Home',desc:'A clean care card: product photo, three drawn care icons and simple instructions so it lasts.',pal:{bg:'#F2F4F1',fg:'#1F2622',ac:'#3D6B57'},tone:'light',tags:['Home','Care'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),0,0,W,470);T(c,'Care guide',70,590,{font:IS,size:84,color:p.fg});mono(c,x.brand,70,640,{color:rgba(p.fg,.6),size:20,maxW:900});
  c.strokeStyle=p.ac;c.lineWidth=5;c.lineCap='round';c.lineJoin='round';const ic=[(cx,cy)=>{c.beginPath();c.moveTo(cx,cy-40);c.bezierCurveTo(cx+36,cy,cx+30,cy+36,cx,cy+36);c.bezierCurveTo(cx-30,cy+36,cx-36,cy,cx,cy-40);c.stroke()},(cx,cy)=>{c.beginPath();c.arc(cx,cy,18,0,7);c.stroke();for(let k=0;k<8;k++){const a=k*Math.PI/4;c.beginPath();c.moveTo(cx+Math.cos(a)*28,cy+Math.sin(a)*28);c.lineTo(cx+Math.cos(a)*40,cy+Math.sin(a)*40);c.stroke()}c.beginPath();c.moveTo(cx-44,cy+44);c.lineTo(cx+44,cy-44);c.stroke()},(cx,cy)=>{c.beginPath();c.moveTo(cx-34,cy+30);c.lineTo(cx-34,cy-10);c.quadraticCurveTo(cx,cy-46,cx+34,cy-10);c.lineTo(cx+34,cy+30);c.closePath();c.stroke()}];
  const tips=[x.f1||'Handle gently',x.f2||'Keep out of direct sun',x.f3||'Store with care'];tips.forEach((s,i)=>{const y=780+i*150;c.beginPath();c.arc(130,y,62,0,7);c.fillStyle=rgba(p.ac,.08);c.fill();c.strokeStyle=p.ac;ic[i](130,y);T(c,s,230,y+14,{font:IS,size:46,color:p.fg,maxW:W-300,maxLines:1})});
  foot(c,S,1220,p.fg)}});


/* =====================================================================
   BATCH 7 · 25 REELS — beyond product brands
   Services · Learn · Fit · Events · B2B
   ===================================================================== */
const btn7=(c,text,cx,cy,bg,fg,a=1,o={})=>{if(!text||a<=0)return;c.save();c.globalAlpha=clamp(a);c.font=`600 ${o.size||28}px ${IT}`;if('letterSpacing' in c)c.letterSpacing='2px';const s=String(text).toUpperCase(),w=Math.min(o.maxW||820,c.measureText(s).width+(o.pad||100)),h=(o.size||28)*2.5,k=o.press?1-.06*Math.sin(clamp(o.press)*Math.PI):1;c.translate(cx,cy);c.scale(k,k);rr(c,-w/2,-h/2,w,h,h/2);c.fillStyle=bg;c.fill();c.restore();T(c,s,cx,cy+1,{font:IT,weight:600,size:o.size||28,align:'center',base:'middle',color:fg,ls:2,maxW:w-50,maxLines:1,alpha:clamp(a)})};
const nums7=x=>{const s=[x.headline,x.sub,x.label,x.f1,x.f2,x.f3].filter(Boolean).join(' ');const m=s.match(/(\d[\d,.]*)\s*(%|x|×|\+|k|K|M|hrs?|hours?|days?|min|mins|minutes)?/);if(!m)return null;const raw=m[1].replace(/,/g,'');const v=parseFloat(raw);if(!isFinite(v)||(/^(19|20)\d\d$/.test(raw)))return null;return{v,dec:(raw.split('.')[1]||'').length,suf:m[2]||'',ctx:s}};
const cursor7=(c,x0,y0,col='#fff')=>{c.save();c.translate(x0,y0);c.beginPath();c.moveTo(0,0);c.lineTo(0,52);c.lineTo(14,40);c.lineTo(26,64);c.lineTo(36,59);c.lineTo(24,36);c.lineTo(42,36);c.closePath();c.fillStyle=col;c.fill();c.strokeStyle='#111';c.lineWidth=3;c.stroke();c.restore()};

/* ================= FAMILY 16 · SERVICES ================= */
KC({id:'kc-book',name:'Book a Slot',fam:'Services',desc:'A week strip slides in, time chips appear and one gets tapped — then your service photo and a booking button. For salons, clinics, studios.',pal:{bg:'#F4F1EC',fg:'#17161A',ac:'#3E5BFF'},tone:'light',dur:10,pt:5,hold:[2,8],tags:['Services','Booking'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,x.brand,80,150,{color:rgba(p.fg,.6),size:22,p:P(t,.3,.5),maxW:900});T(c,x.headline||'Book your slot',80,250,{font:IS,size:76,color:p.fg,maxW:W-160,maxLines:2,p:P(t,.1,.7),lh:1.05});
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],sel=4,a=E.outExpo(P(t,.6,.9));days.forEach((d,i)=>{const cx=80+i*134+60,y=470,on=i===sel&&t>1.6;c.save();c.globalAlpha=a;c.translate((1-a)*200,0);rr(c,cx-56,y-70,112,150,24);c.fillStyle=on?p.ac:'#fff';c.fill();T(c,d,cx,y-18,{font:IT,size:24,align:'center',color:on?'#fff':rgba(p.fg,.6)});T(c,String(i+12),cx,y+44,{font:IT,weight:600,size:44,align:'center',color:on?'#fff':p.fg});c.restore()});
  const times=['10:00','11:30','13:00','15:30','17:00','18:30'],pick=3,tap=P(t,3.4,.5);times.forEach((tm,i)=>{const b=E.outBack(P(t,1.8+i*.12,.5));if(b<=0)return;const cx=80+(i%3)*313+146,cy=700+Math.floor(i/3)*130,on=i===pick&&tap>0;c.save();c.translate(cx,cy);c.scale(b,b);rr(c,-140,-48,280,96,48);c.fillStyle=on?p.fg:'#fff';c.fill();c.strokeStyle=rgba(p.fg,.12);c.lineWidth=2;c.stroke();c.restore();T(c,tm,cx,cy+2,{font:IT,weight:500,size:36,align:'center',base:'middle',color:on?p.bg:p.fg,alpha:b})});
  if(t>3&&t<3.9){const k=E.inOut(P(t,3,.4));cursor7(c,250+(1-k)*300,850+(1-k)*180,'#fff')}
  const rev=E.outExpo(P(t,4,.9));if(rev>0){c.save();clip(c,80,960+(1-rev)*120,W-160,560);cover(c,S.m(0),80,960,W-160,560,{z:kb(t,10,1.12,1.03)});c.restore();c.globalAlpha=1}
  if(rev>0)mono(c,x.f1||'',100,1500,{color:'#fff',size:22,p:P(t,4.6,.5)});btn7(c,x.cta||'Book now',W/2,1640,p.ac,'#fff',P(t,5,.5),{press:P(t,6.4,.4)});outro(c,S,t,8.4,{bg:p.bg,fg:p.fg,acc:p.ac})}});
KC({id:'kc-howitworks',name:'How It Works',fam:'Services',desc:'Three numbered steps draw down a timeline beside a photo card — the simplest way to explain your service.',pal:{bg:'#0F1412',fg:'#F2F4EF',ac:'#B9FA70'},dur:10,pt:5.5,hold:[2,8],tags:['Services','Explainer'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,'How it works',80,200,{color:p.ac,size:24,p:P(t,.1,.5)});kin(c,x.headline,80,330,{t,t0:.3,font:IS,size:80,maxW:W-160,maxLines:2,color:p.fg});
  c.save();clip(c,560,560,440,620);cover(c,S.m(0),560,560,440,620,{z:kb(t,10,1.14,1.03)});c.restore();c.fillStyle=rgba(p.bg,1-E.out(P(t,1,.8)));c.fillRect(560,560,440,620);
  const L=E.inOut(P(t,1.2,4));c.strokeStyle=rgba(p.fg,.2);c.lineWidth=3;c.beginPath();c.moveTo(130,600);c.lineTo(130,600+900*L);c.stroke();
  pts3(x).forEach((s,i)=>{const t0=1.4+i*1.2,y=640+i*320,a=E.outBack(P(t,t0,.5));if(a<=0)return;c.save();c.translate(130,y);c.scale(a,a);c.beginPath();c.arc(0,0,44,0,7);c.fillStyle=p.ac;c.fill();c.restore();T(c,String(i+1),130,y+2,{font:IT,weight:700,size:40,align:'center',base:'middle',color:ink(p.ac),alpha:clamp(a)});
   mono(c,'Step '+(i+1),200,y-20,{color:rgba(p.fg,.55),size:20,p:P(t,t0+.1,.4)});T(c,s,200,y+40,{font:IS,size:46,color:p.fg,maxW:i===2?W-280:330,maxLines:2,p:P(t,t0+.2,.5),lh:1.05})});
  if(x.cta)btn7(c,x.cta,W/2,1680,p.ac,ink(p.ac),P(t,5.6,.5));outro(c,S,t,8.4,{bg:p.bg,fg:p.fg,acc:p.ac})}});
KC({id:'kc-studio',name:'Meet the Studio',fam:'Services',desc:'An arched portrait of your space or team, with your specialisms unfolding as fine-ruled lines underneath.',pal:{bg:'#EFE7DC',fg:'#2A211B',ac:'#9E5E3A'},tone:'light',dur:9,pt:4,hold:[1.5,7],tags:['Services','About'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const k=E.outExpo(P(t,.2,1.2)),aw=640,ah=820,ax=(W-aw)/2,ay=180+(1-k)*80;c.save();c.globalAlpha=k;archPath(c,ax,ay,aw,ah);c.clip();cover(c,S.m(t>4.6&&S.n>1?1:0),ax,ay,aw,ah,{z:kb(t,9,1.16,1.03)});c.restore();c.globalAlpha=1;
  c.save();archPath(c,ax-16,ay-16,aw+32,ah+32);c.strokeStyle=rgba(p.ac,k);c.lineWidth=2;c.stroke();c.restore();T(c,'Meet the studio',W/2,1130,{font:IS,italic:1,size:84,align:'center',color:p.fg,p:P(t,1,.6)});mono(c,x.brand,W/2,1185,{align:'center',color:p.ac,size:22,maxW:W-200,p:P(t,1.2,.5)});
  pts3(x).forEach((s,i)=>{const y=1300+i*100,t0=2+i*.5;hair(c,160,y+30,W-160,y+30,rgba(p.fg,.2),2,E.out(P(t,t0,.6)));mono(c,'0'+(i+1),160,y,{color:p.ac,size:20,p:P(t,t0,.4)});T(c,s,W-160,y+4,{font:IS,size:44,align:'right',color:p.fg,maxW:640,maxLines:1,p:P(t,t0+.15,.5)})});
  outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-visit',name:'Visit Us',fam:'Services',desc:'A pin drops onto a quiet street grid, a photo window opens and your location line types in — for shops, salons and clinics.',pal:{bg:'#ECEEEA',fg:'#16201B',ac:'#E2553D'},tone:'light',dur:9,pt:4.5,hold:[2,7],tags:['Services','Location'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.translate(0,-t*6);c.strokeStyle='#fff';c.lineWidth=36;[[0,520,W,460],[0,1100,W,1180],[300,0,360,H+200],[760,0,700,H+200]].forEach(([a,b,cc,d])=>{c.beginPath();c.moveTo(a,b);c.lineTo(cc,d);c.stroke()});c.strokeStyle=rgba(p.fg,.06);c.lineWidth=14;[[0,820,W,800],[0,1420,W,1460]].forEach(([a,b,cc,d])=>{c.beginPath();c.moveTo(a,b);c.lineTo(cc,d);c.stroke()});c.restore();
  const drop=E.outBounce?E.outBounce(P(t,.6,.9)):E.outBack(P(t,.6,.9)),px=530,py=760-(1-drop)*500;if(P(t,.6,.01)>0){c.save();c.translate(px,py);c.beginPath();c.arc(0,-90,62,Math.PI*.8,Math.PI*2.2);c.lineTo(0,0);c.closePath();c.fillStyle=p.ac;c.fill();c.beginPath();c.arc(0,-90,24,0,7);c.fillStyle='#fff';c.fill();c.restore();const r=P(t,1.5,1.2);if(r>0&&r<1){c.beginPath();c.ellipse(px,762,40+r*160,(40+r*160)*.35,0,0,7);c.strokeStyle=rgba(p.ac,1-r);c.lineWidth=4;c.stroke()}}
  const o=E.outExpo(P(t,2,.9));if(o>0){c.save();c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=40;c.shadowOffsetY=16;rr(c,120,900,W-240,560*o,28);c.fillStyle='#fff';c.fill();c.restore();c.save();rr(c,120,900,W-240,560*o,28);c.clip();cover(c,S.m(0),120,900,W-240,560,{z:kb(t,9,1.12,1.03)});c.restore()}
  T(c,'Visit us',80,230,{font:IS,size:110,color:p.fg,p:P(t,.1,.6)});const loc=x.brand,n=Math.floor(String(loc).length*P(t,2.6,1.2));mono(c,String(loc).slice(0,n),82,300,{color:p.ac,size:24,maxW:W-160,upper:0});
  T(c,x.headline,80,1580,{font:IS,size:56,color:p.fg,maxW:W-160,maxLines:2,p:P(t,3.4,.6)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,acc:p.ac})}});
KC({id:'kc-askus',name:'Ask Us',fam:'Services',desc:'A chat thread: the questions customers always ask, answered in your words with typing dots in between.',pal:{bg:'#EAE8F2',fg:'#18172A',ac:'#5B4BFF'},tone:'light',dur:10,pt:6,hold:[3,8.5],tags:['Services','FAQ'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'You asked',80,200,{font:IS,italic:1,size:90,color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,80,260,{color:rgba(p.fg,.55),size:22,maxW:900,p:P(t,.2,.5)});
  const f=pts3(x),msgs=[['q','How does it work?'],['a',x.sub||x.headline],['q','What makes it different?'],['a',f.join(' · ')]];let y=380;
  msgs.forEach(([k,s],i)=>{const t0=.6+i*1.5,a=E.outBack(P(t,t0+(k==='a'?.6:0),.45));const isQ=k==='q';c.save();c.font=`400 40px ${IT}`;const tw=c.measureText(s).width,bw=Math.min(760,tw+80),lines=Math.min(4,Math.ceil(tw*1.12/(bw-80))),bh=lines*54+50,bx=isQ?80:W-80-bw;c.restore();
   if(!isQ&&t>t0&&t<t0+.6){rr(c,W-80-170,y,170,90,45);c.fillStyle='#fff';c.fill();for(let d=0;d<3;d++){c.beginPath();c.arc(W-80-125+d*40,y+45,9,0,7);c.fillStyle=rgba(p.fg,.3+.5*Math.max(0,Math.sin(t*9-d)));c.fill()}}
   if(a>0){c.save();c.globalAlpha=clamp(a);c.translate(bx+(isQ?0:bw),y);c.scale(a,a);c.translate(-(isQ?0:bw),0);rr(c,0,0,bw,bh,36);c.fillStyle=isQ?'#fff':p.ac;c.fill();c.restore();T(c,s,bx+40,y+62,{font:IT,size:40,color:isQ?p.fg:'#fff',maxW:bw-70,maxLines:4,lh:1.3,alpha:clamp(a)})}
   y+=bh+40});
  if(x.cta)btn7(c,x.cta,W/2,1700,p.fg,p.bg,P(t,7,.5));outro(c,S,t,8.6,{bg:p.bg,fg:p.fg,acc:p.ac})}});

/* ================= FAMILY 17 · LEARN ================= */
KC({id:'kc-lesson',name:'Lesson 01',fam:'Learn',desc:'A notebook page: the lesson title writes itself in, three key points get ticked off in the margin.',pal:{bg:'#FBF8F1',fg:'#1D2233',ac:'#E0482F'},tone:'light',dur:10,pt:6,hold:[2,8.5],tags:['Learn','Education'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.strokeStyle=rgba('#4A7BB7',.18);c.lineWidth=2;for(let y=300;y<H;y+=86){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}c.strokeStyle=rgba(p.ac,.45);c.beginPath();c.moveTo(150,0);c.lineTo(150,H);c.stroke();
  mono(c,'Lesson 01',190,190,{color:p.ac,size:24,p:P(t,.1,.5)});const ttl=x.headline||'',n=Math.floor(ttl.length*E.inOut(P(t,.4,1.6)));T(c,ttl.slice(0,n),190,300,{font:IS,italic:1,size:76,color:p.fg,maxW:W-260,maxLines:2,lh:1.1});
  c.save();c.translate(W-330,520);c.rotate(.04);const a=E.out(P(t,1.6,.6));c.globalAlpha=a;c.fillStyle='#fff';c.shadowColor='rgba(0,0,0,.16)';c.shadowBlur=24;c.fillRect(-10,-10,280,340);c.shadowColor='transparent';clip(c,0,0,260,320);cover(c,S.m(0),0,0,260,320,{z:1.06});c.restore();c.globalAlpha=1;
  pts3(x).forEach((s,i)=>{const t0=2.4+i*1.1,y=990+i*172;tick(c,95,y-14,26,P(t,t0,.4),p.ac);T(c,s,190,y,{font:IS,size:52,color:p.fg,maxW:W-260,maxLines:1,p:P(t,t0+.1,.5)})});
  hair(c,190,1530,190+400*E.out(P(t,5.6,.6)),1530,p.ac,4,1);mono(c,x.brand,190,1600,{color:rgba(p.fg,.6),size:22,p:P(t,5.8,.5),maxW:700});outro(c,S,t,8.4,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-tip',name:'Quick Tip',fam:'Learn',desc:'A giant “Tip” lands, the tip itself fills the screen and a progress bar runs to the save prompt.',pal:{bg:'#FFDD3C',fg:'#111111',ac:'#111111'},tone:'light',dur:8,pt:3.6,hold:[1.5,6.2],tags:['Learn','Tips'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const s=E.outBack(P(t,.1,.6));c.save();c.translate(80,420);c.scale(s,s);T(c,'Tip',0,0,{font:AN,size:360,upper:1,color:p.fg});c.restore();
  c.save();c.translate(W-260,190);c.rotate(.18);c.beginPath();c.arc(0,0,110,0,7);c.fillStyle=p.fg;c.globalAlpha=P(t,.5,.4);c.fill();c.restore();T(c,'#1',W-260,210,{font:AN,size:90,align:'center',base:'middle',color:p.bg,alpha:P(t,.5,.4)});
  kin(c,x.sub||x.headline,80,640,{t,t0:.9,font:IT,weight:700,size:76,maxW:W-160,maxLines:5,color:p.fg,lh:1.1});
  c.save();clip(c,80,1180,W-160,380);cover(c,S.m(0),80,1180,W-160,380,{z:kb(t,8,1.14,1.03)});c.restore();c.fillStyle=rgba(p.bg,1-E.out(P(t,2.4,.6)));c.fillRect(80,1180,W-160,380);
  bar(c,80,1640,W-160,E.inOut(P(t,1,5)),p.fg,rgba(p.fg,.15));mono(c,'Save this for later',80,1710,{color:p.fg,size:24,p:P(t,5.2,.5)});mono(c,x.brand,W-80,1710,{align:'right',color:p.fg,size:24,p:P(t,5.2,.5),maxW:500});outro(c,S,t,6.6,{bg:p.fg,fg:p.bg,font:AN,upper:1,size:120,acc:p.bg})}});
KC({id:'kc-whichone',name:'Which One Are You?',fam:'Learn',desc:'A/B/C options stack in as tappable cards with your photo above — the audience answers in the comments.',pal:{bg:'#14121C',fg:'#FFFFFF',ac:'#FF7A59'},dur:9,pt:4,hold:[2,7],tags:['Learn','Engagement'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Which one',80,220,{font:IT,weight:800,size:100,color:p.fg,p:P(t,.1,.5)});T(c,'are you?',80,330,{font:IS,italic:1,size:100,color:p.ac,p:P(t,.3,.5)});
  c.save();clip(c,80,400,W-160,520);cover(c,S.m(Math.min(S.n-1,Math.floor(Math.max(0,t-1.6)/1.1))%Math.max(1,S.n)),80,400,W-160,520,{z:kb(t,9,1.14,1.03)});c.restore();c.fillStyle=rgba(p.bg,1-E.out(P(t,.5,.7)));c.fillRect(80,400,W-160,520);
  pts3(x).forEach((s,i)=>{const t0=1.6+i*1.1,a=E.outExpo(P(t,t0,.6));if(a<=0)return;const y=990+i*170,hi=Math.floor(Math.max(0,t-1.6)/1.1)===i&&t<5.2;c.save();c.globalAlpha=a;c.translate((1-a)*-120,0);rr(c,80,y,W-160,140,70);c.fillStyle=hi?p.ac:rgba(p.fg,.08);c.fill();c.beginPath();c.arc(150,y+70,42,0,7);c.fillStyle=hi?p.bg:p.ac;c.fill();c.restore();
   T(c,'ABC'[i],150,y+72,{font:IT,weight:800,size:44,align:'center',base:'middle',color:hi?p.ac:ink(p.ac),alpha:a});T(c,s,230,y+86,{font:IT,weight:600,size:46,color:p.fg,maxW:W-360,maxLines:1,alpha:a})});
  T(c,'Tell us in the comments',W/2,1580,{font:IS,italic:1,size:56,align:'center',color:p.fg,p:P(t,5.4,.6)});mono(c,x.brand,W/2,1650,{align:'center',color:rgba(p.fg,.55),size:22,p:P(t,5.6,.5),maxW:W-200});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IT,size:96,acc:p.ac})}});
KC({id:'kc-syllabus',name:'What You’ll Learn',fam:'Learn',desc:'A course outline: modules fill in week by week with a progress rail, then the enrol line.',pal:{bg:'#0D1B2A',fg:'#E8EEF5',ac:'#5CE1E6'},dur:10,pt:6,hold:[2,8.5],tags:['Learn','Course'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,0,W,520);cover(c,S.m(0),0,0,W,520,{z:kb(t,10,1.14,1.03),filter:'saturate(.8)'});c.restore();grad(c,W,520,0,rgba(p.bg,0),rgba(p.bg,1));c.save();c.translate(0,220);grad(c,W,300,0,rgba(p.bg,0),rgba(p.bg,1));c.restore();
  mono(c,x.label||'New course',80,560,{color:p.ac,size:24,p:P(t,.2,.5),maxW:W-160});T(c,'What you’ll learn',80,670,{font:IS,size:90,color:p.fg,p:P(t,.3,.6)});
  const mods=[...pts3(x),x.headline].filter(Boolean).slice(0,4);mods.forEach((s,i)=>{const t0=1.2+i*1,y=820+i*190,a=P(t,t0,.5);if(a<=0)return;rr(c,80,y,W-160,160,20);c.fillStyle=rgba(p.fg,.06*a);c.fill();mono(c,'Module '+(i+1),120,y+60,{color:p.ac,size:20,p:a});T(c,s,120,y+124,{font:IS,size:46,color:p.fg,maxW:W-320,maxLines:1,p:a});tick(c,W-140,y+80,26,P(t,t0+.5,.4),p.ac)});
  bar(c,80,1630,W-160,E.inOut(P(t,1.2,4.6)),p.ac,rgba(p.fg,.12));if(x.cta)mono(c,x.cta+'  →',80,1710,{color:p.fg,size:26,p:P(t,6,.5)});outro(c,S,t,8.4,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-enrol',name:'Enrol Now',fam:'Learn',desc:'An admit-card slides up, gets stamped with your batch or start date, and the fee and enrol button land.',pal:{bg:'#F1ECE2',fg:'#1B1A17',ac:'#2D6A4F'},tone:'light',dur:9,pt:4.6,hold:[2,7],tags:['Learn','Enrol'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Enrolments open',W/2,230,{font:IS,italic:1,size:88,align:'center',color:p.fg,p:P(t,.1,.6)});
  const k=E.outExpo(P(t,.5,1)),y0=360+(1-k)*900;c.save();c.translate(0,y0);c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=50;c.shadowOffsetY=20;c.fillStyle='#fff';c.fillRect(100,0,W-200,1080);c.shadowColor='transparent';c.fillStyle=p.ac;c.fillRect(100,0,W-200,120);
  T(c,x.brand,140,76,{font:IS,size:46,color:'#fff',maxW:W-300,maxLines:1});c.save();clip(c,140,160,320,400);cover(c,S.m(0),140,160,320,400,{z:1.06});c.restore();
  mono(c,'Programme',500,200,{color:rgba(p.fg,.5),size:18});T(c,x.headline,500,260,{font:IS,size:46,color:p.fg,maxW:W-640,maxLines:3,lh:1.05});mono(c,'Batch',500,470,{color:rgba(p.fg,.5),size:18});T(c,x.label||'Starting soon',500,525,{font:IT,weight:600,size:38,color:p.fg,maxW:W-640,maxLines:1});
  c.setLineDash([12,10]);c.strokeStyle=rgba(p.fg,.3);c.lineWidth=2;c.beginPath();c.moveTo(140,640);c.lineTo(W-140,640);c.stroke();c.setLineDash([]);pts3(x).forEach((s,i)=>{tick(c,160,700+i*90,18,P(t,1.6+i*.3,.3),p.ac);T(c,s,200,712+i*90,{font:IS,size:38,color:p.fg,maxW:W-380,maxLines:1})});
  if(x.price){mono(c,'Fee',140,1000,{color:rgba(p.fg,.5),size:18});T(c,x.price,W-140,1010,{font:IT,weight:700,size:56,align:'right',color:p.fg})}c.restore();
  const st=E.outBack(P(t,2.8,.4));if(st>0){c.save();c.translate(330,y0+520);c.rotate(-.2);c.scale(2-st,2-st);c.globalAlpha=Math.min(1,st);c.strokeStyle=p.ac;c.lineWidth=6;rr(c,-150,-56,300,112,14);c.stroke();T(c,'OPEN',0,8,{font:AN,size:72,align:'center',base:'middle',color:p.ac});c.restore()}
  btn7(c,x.cta||'Enrol now',W/2,1620,p.fg,p.bg,P(t,3.6,.5),{press:P(t,5.6,.4)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});

/* ================= FAMILY 18 · FIT ================= */
KC({id:'kc-reps',name:'Rep Counter',fam:'Fit',desc:'A ring fills as the rep count climbs over your training shot, with the moves listed beneath — gym, yoga, studio.',pal:{bg:'#0B0B0C',fg:'#FFFFFF',ac:'#D7FF3A'},dur:9,pt:4.5,hold:[1.5,7],tags:['Fit','Workout'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,9,1.12,1.02),filter:'grayscale(.4) contrast(1.1) brightness(.6)'});scrimB(c,W,H,.85,.45);const reps=12,q=clamp((t-.8)/5),n=Math.min(reps,Math.floor(q*reps)+(t>.8?1:0)),cx=W/2,cy=640;
  c.lineWidth=26;c.strokeStyle=rgba(p.fg,.15);c.beginPath();c.arc(cx,cy,260,0,7);c.stroke();c.strokeStyle=p.ac;c.lineCap='round';c.beginPath();c.arc(cx,cy,260,-Math.PI/2,-Math.PI/2+Math.PI*2*(n/reps));c.stroke();
  const pop=1+.08*Math.max(0,1-((q*reps)%1)*4);c.save();c.translate(cx,cy);c.scale(pop,pop);T(c,String(n),0,0,{font:AN,size:260,align:'center',base:'middle',color:p.fg});c.restore();mono(c,'Reps',cx,cy+170,{align:'center',color:p.ac,size:24});
  pts3(x).forEach((s,i)=>{const on=Math.floor(q*3)===i||(q>=1&&i===2);T(c,s,80,1200+i*110,{font:IT,weight:on?800:500,size:60,color:on?p.ac:rgba(p.fg,.6),maxW:W-160,maxLines:1,upper:1,p:P(t,.4+i*.2,.5)})});
  mono(c,x.brand,80,1620,{color:p.fg,size:22,maxW:W-160,p:P(t,.6,.5)});outro(c,S,t,7.4,{bg:p.bg,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.ac})}});
KC({id:'kc-interval',name:'Interval Timer',fam:'Fit',desc:'A work/rest interval timer sweeps around the clock face, switching colour each round, with the move named on screen.',pal:{bg:'#FF4D2E',fg:'#FFFFFF',ac:'#111111'},dur:10,pt:3,hold:[1,8.4],tags:['Fit','HIIT'],
 r(c,t,S){const{W,H,p,x}=S;const f=pts3(x),seg=2.2,k=Math.max(0,t-.6),round=Math.min(5,Math.floor(k/seg)),ph=(k%seg)/seg,work=round%2===0,bg=work?p.bg:'#1F3BFF';c.fillStyle=bg;c.fillRect(0,0,W,H);
  c.save();c.beginPath();c.arc(W/2,640,300,0,7);c.clip();cover(c,S.m(0),W/2-300,340,600,600,{z:1.1,filter:'contrast(1.05)'});c.restore();c.lineWidth=30;c.strokeStyle='rgba(255,255,255,.25)';c.beginPath();c.arc(W/2,640,340,0,7);c.stroke();c.strokeStyle='#fff';c.lineCap='round';c.beginPath();c.arc(W/2,640,340,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-ph));c.stroke();
  T(c,work?'Work':'Rest',W/2,1150,{font:AN,size:220,align:'center',upper:1,color:'#fff'});T(c,String(Math.ceil((1-ph)*(work?40:20)))+'s',W/2,1300,{font:IT,weight:300,size:96,align:'center',color:'#fff'});
  T(c,work?(f[Math.floor(round/2)%3]||''):'Breathe',W/2,1460,{font:IS,italic:1,size:68,align:'center',color:'#fff',maxW:W-160,maxLines:1});mono(c,`Round ${Math.floor(round/2)+1} / 3`,W/2,1560,{align:'center',color:'rgba(255,255,255,.8)',size:24});mono(c,x.brand,W/2,180,{align:'center',color:'#fff',size:24,maxW:W-200});
  outro(c,S,t,8.4,{bg:'#111111',fg:'#fff',font:AN,upper:1,ls:2,size:130,acc:p.bg})}});
KC({id:'kc-split',name:'Weekly Split',fam:'Fit',desc:'Seven days stack into a training split — each bar slides in with its focus, today highlighted.',pal:{bg:'#F2F2EE',fg:'#111111',ac:'#FF5A1F'},tone:'light',dur:9,pt:5,hold:[2,7.2],tags:['Fit','Plan'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'This week',80,210,{font:AN,size:150,upper:1,color:p.fg,p:P(t,.1,.5)});mono(c,x.brand,80,270,{color:rgba(p.fg,.6),size:22,maxW:900,p:P(t,.3,.5)});
  const f=pts3(x),plan=[f[0],f[1],'Rest',f[2],f[0],f[1],'Rest'],days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],today=3;
  days.forEach((d,i)=>{const t0=.6+i*.22,a=E.outExpo(P(t,t0,.6));if(a<=0)return;const y=360+i*150,on=i===today&&t>2.6,rest=plan[i]==='Rest';c.save();rr(c,80,y,(W-160)*a,124,20);c.fillStyle=on?p.ac:rest?'transparent':'#fff';c.fill();if(rest){c.strokeStyle=rgba(p.fg,.2);c.lineWidth=2;c.setLineDash([10,8]);c.stroke();c.setLineDash([])}c.restore();
   T(c,d,120,y+82,{font:IT,weight:800,size:40,upper:1,color:on?'#fff':p.fg,alpha:a});T(c,plan[i],W-120,y+82,{font:IS,italic:rest?1:0,size:46,align:'right',color:on?'#fff':rest?rgba(p.fg,.45):p.fg,maxW:640,maxLines:1,alpha:a})});
  c.save();clip(c,80,1440,W-160,240);cover(c,S.m(0),80,1440,W-160,240,{z:kb(t,9,1.14,1.03)});c.restore();c.fillStyle=rgba(p.bg,1-E.out(P(t,3,.6)));c.fillRect(80,1440,W-160,240);outro(c,S,t,7.4,{bg:p.bg,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.ac})}});
KC({id:'kc-heartbeat',name:'Heartbeat',fam:'Fit',desc:'A heart-rate line traces across your shot and spikes on the beat as the headline pulses in.',pal:{bg:'#0A0D10',fg:'#FFFFFF',ac:'#FF3B5C'},dur:8,pt:3.4,hold:[1,6.2],tags:['Fit','Energy'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,8,1.14,1.03),filter:'brightness(.55) saturate(.9)'});scrimB(c,W,H,.8,.5);const y0=880,w=W,head=clamp((t-.3)/3)*w*1.6;
  c.save();c.strokeStyle=p.ac;c.lineWidth=8;c.lineJoin='round';c.shadowColor=p.ac;c.shadowBlur=24;c.beginPath();for(let xx=0;xx<=Math.min(w,head);xx+=6){const ph=(xx%360)/360;let y=y0;if(ph>.4&&ph<.45)y-=(ph-.4)/.05*40;else if(ph>=.45&&ph<.5)y=y0-40+(ph-.45)/.05*260;else if(ph>=.5&&ph<.56)y=y0+220-(ph-.5)/.06*420;else if(ph>=.56&&ph<.62)y=y0-200+(ph-.56)/.06*200;xx?c.lineTo(xx,y):c.moveTo(xx,y)}c.stroke();c.restore();
  const beat=1+.05*Math.max(0,Math.sin(t*Math.PI*2.2))**8;c.save();c.translate(80,1360);c.scale(beat,beat);kin(c,x.headline,0,0,{t,t0:1.4,font:IT,weight:800,size:96,maxW:W-160,maxLines:2,color:p.fg,anchor:'bottom',upper:1});c.restore();
  mono(c,x.f1||x.brand,80,1460,{color:p.ac,size:24,maxW:W-160,p:P(t,2.6,.5)});mono(c,x.brand,80,200,{color:p.fg,size:22,maxW:W-160,p:P(t,.2,.5)});outro(c,S,t,6.4,{bg:p.bg,fg:p.fg,font:IT,size:96,acc:p.ac})}});
KC({id:'kc-class',name:'Join the Class',fam:'Fit',desc:'Diagonal energy stripes sweep the screen, the class name slams in, and the schedule line and join button follow.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#7CFFCB'},dur:8,pt:3.6,hold:[1.5,6.2],tags:['Fit','Class'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(t>3.4&&S.n>1?1:0),0,0,W,H,{z:kb(t,8,1.15,1.03),filter:'grayscale(.2) brightness(.7)'});c.save();c.globalCompositeOperation='screen';for(let i=0;i<5;i++){const o=((t*500+i*520)%(W+H*1.2))-H*.6;c.save();c.translate(o,0);c.rotate(-.5);c.fillStyle=rgba(p.ac,.12+.05*(i%2));c.fillRect(0,-200,90+i*30,H*2.5);c.restore()}c.restore();scrimB(c,W,H,.85,.45);
  const s=E.outBack(P(t,.4,.5));c.save();c.translate(80,1000);c.scale(s,s);T(c,'Join the',0,0,{font:IS,italic:1,size:90,color:p.ac});c.restore();T(c,x.label&&!/\d{4}/.test(x.label)?x.label:'Class',80,1220,{font:AN,size:fit(c,(x.label&&!/\d{4}/.test(x.label)?x.label:'Class').toUpperCase(),AN,400,W-160,230),upper:1,color:p.fg,p:P(t,.7,.4)});
  mono(c,pts3(x).join('  ·  '),80,1320,{color:p.fg,size:22,maxW:W-160,p:P(t,1.4,.5)});btn7(c,x.cta||'Join the class',W/2,1560,p.ac,'#111',P(t,2,.5),{press:P(t,4.6,.4)});mono(c,x.brand,W/2,1680,{align:'center',color:rgba(p.fg,.7),size:22,maxW:W-200,p:P(t,2.2,.5)});outro(c,S,t,6.4,{bg:p.bg,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.ac})}});

/* ================= FAMILY 19 · EVENTS ================= */
KC({id:'kc-savedate',name:'Save the Date',fam:'Events',desc:'An envelope opens and an invitation card slides out with your date line, edged in fine gold.',pal:{bg:'#1F2A24',fg:'#F6F0E4',ac:'#C9A86A'},dur:9,pt:4.5,hold:[3,7.2],tags:['Events','Invite'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const ew=860,eh=560,ex=(W-ew)/2,ey=1000,open=E.inOut(P(t,.6,.8)),slide=E.outExpo(P(t,1.4,1.2));
  c.fillStyle=mixHex(p.bg,'#000000',.25);c.fillRect(ex,ey,ew,eh);if(open>=.5){c.save();c.translate(0,ey);c.scale(1,1-2*open);c.fillStyle=mixHex(p.bg,'#000000',.32);c.beginPath();c.moveTo(ex,0);c.lineTo(W/2,eh*.5);c.lineTo(ex+ew,0);c.closePath();c.fill();c.restore()}const cy=ey+60-slide*760,cw=760,ch=900;c.save();c.beginPath();c.rect(0,0,W,ey+eh*.55);c.clip();c.fillStyle=p.fg;c.fillRect((W-cw)/2,cy,cw,ch);frame6(c,(W-cw)/2+24,cy+24,cw-48,ch-48,p.ac,10,2);
  c.save();clip(c,(W-cw)/2+90,cy+90,cw-180,380);cover(c,S.m(0),(W-cw)/2+90,cy+90,cw-180,380,{z:1.05});c.restore();T(c,'Save the date',W/2,cy+560,{font:IS,italic:1,size:78,align:'center',color:p.bg});hair(c,W/2-90,cy+600,W/2+90,cy+600,p.ac,2,1);
  T(c,x.label||x.headline,W/2,cy+680,{font:IT,weight:500,size:40,align:'center',color:p.bg,maxW:cw-160,maxLines:1});T(c,x.brand,W/2,cy+760,{font:IS,size:38,align:'center',color:rgba(p.bg,.7),maxW:cw-160,maxLines:1});c.restore();
  c.fillStyle=mixHex(p.bg,'#000000',.12);c.beginPath();c.moveTo(ex,ey+eh);c.lineTo(ex,ey+eh*.45);c.lineTo(W/2,ey+eh*.8);c.lineTo(ex+ew,ey+eh*.45);c.lineTo(ex+ew,ey+eh);c.closePath();c.fill();
  if(open<.5){c.save();c.translate(0,ey);c.scale(1,1-2*open);c.fillStyle=mixHex(p.bg,'#000000',.18);c.beginPath();c.moveTo(ex,0);c.lineTo(W/2,eh*.5);c.lineTo(ex+ew,0);c.closePath();c.fill();c.restore()}
  if(open<.5){c.beginPath();c.arc(W/2,ey+eh*.5*(1-2*open),46,0,7);c.fillStyle=p.ac;c.fill()}
  mono(c,x.cta||'Details soon',W/2,1680,{align:'center',color:p.ac,size:24,p:P(t,3.2,.5)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-billing',name:'The Bill',fam:'Events',desc:'Poster-stacked lineup: each name slams in on the beat with a flash, over a duotone photo.',pal:{bg:'#1400FF',fg:'#FFFFFF',ac:'#FF3EA5'},dur:8,pt:4.2,hold:[2,6.2],tags:['Events','Lineup'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.globalAlpha=.5;c.globalCompositeOperation='luminosity';cover(c,S.m(0),0,0,W,H,{z:kb(t,8,1.16,1.03),filter:'grayscale(1) contrast(1.3)'});c.restore();c.fillStyle=rgba(p.bg,.45);c.fillRect(0,0,W,H);
  mono(c,x.label||'Live',80,180,{color:p.fg,size:24,maxW:W-160,p:P(t,.1,.4)});T(c,x.brand,80,260,{font:IS,italic:1,size:64,color:p.ac,maxW:W-160,maxLines:1,p:P(t,.2,.5)});
  const names=[...pts3(x),x.headline].filter(Boolean).slice(0,4);names.forEach((nm,i)=>{const t0=.8+i*.7,s=E.outBack(P(t,t0,.35));if(s<=0)return;const y=520+i*260,sz=fit(c,nm.toUpperCase(),AN,400,W-160,i===0?240:170);c.save();c.translate(80,y);c.scale(1,s);T(c,nm,0,0,{font:AN,size:sz,upper:1,color:i%2?p.ac:p.fg,maxW:W-160,maxLines:1});c.restore()});
  for(let i=0;i<4;i++){const f=1-P(t,.8+i*.7,.15);if(f>0&&f<1){c.fillStyle=`rgba(255,255,255,${f*.35})`;c.fillRect(0,0,W,H)}}
  if(x.cta)btn7(c,x.cta,W/2,1660,p.ac,'#fff',P(t,3.8,.4));outro(c,S,t,6.4,{bg:p.bg,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.ac})}});
KC({id:'kc-ticket',name:'Get Tickets',fam:'Events',desc:'A ticket slides in, its stub tears off along the perforation and the price and booking line drop in.',pal:{bg:'#F0E9DD',fg:'#151515',ac:'#E4572E'},tone:'light',dur:9,pt:4.4,hold:[2,7],tags:['Events','Tickets'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Get tickets',80,240,{font:AN,size:150,upper:1,color:p.fg,p:P(t,.1,.5)});
  const k=E.outExpo(P(t,.4,.9)),tear=E.inOut(P(t,2.6,.8)),tx=80+(1-k)*-900,ty=420,tw=W-160,th=900,cut=700;c.save();c.translate(tx,ty);c.rotate(-.02);c.shadowColor='rgba(0,0,0,.18)';c.shadowBlur=40;c.shadowOffsetY=16;c.fillStyle='#fff';c.fillRect(0,0,tw,cut);c.shadowColor='transparent';
  c.save();clip(c,30,30,tw-60,380);cover(c,S.m(0),30,30,tw-60,380,{z:1.06});c.restore();T(c,x.headline,40,500,{font:IS,size:54,color:p.fg,maxW:tw-80,maxLines:2,lh:1.05});mono(c,x.label||x.brand,40,640,{color:p.ac,size:22,maxW:tw-80});
  c.save();c.translate(tear*60,tear*140);c.rotate(tear*.08);c.fillStyle=p.ac;c.shadowColor='rgba(0,0,0,.18)';c.shadowBlur=30;c.fillRect(0,cut,tw,th-cut);c.shadowColor='transparent';T(c,'Admit one',40,cut+90,{font:AN,size:70,upper:1,color:'#fff'});if(x.price)T(c,x.price,tw-40,cut+92,{font:IT,weight:700,size:60,align:'right',color:'#fff'});mono(c,x.brand,40,cut+160,{color:'rgba(255,255,255,.85)',size:18,maxW:tw-80});c.restore();
  c.setLineDash([14,12]);c.strokeStyle=rgba(p.fg,.3*(1-tear));c.lineWidth=3;c.beginPath();c.moveTo(0,cut);c.lineTo(tw,cut);c.stroke();c.setLineDash([]);c.restore();
  btn7(c,x.cta||'Book now',W/2,1600,p.fg,p.bg,P(t,3.6,.5),{press:P(t,5.6,.4)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.ac})}});
KC({id:'kc-venue',name:'The Venue',fam:'Events',desc:'A slow cinematic push into the venue, letterbox bars, and the place, date and RSVP set like film credits.',pal:{bg:'#050505',fg:'#F3EEE6',ac:'#D9B979'},dur:9,pt:4,hold:[1.5,7.2],tags:['Events','Venue'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const i=t>4&&S.n>1?1:0;cover(c,S.m(i),0,0,W,H,{z:kb(t,9,1.25,1.03),filter:'brightness(.78) contrast(1.05)'});const lb=180+120*E.inOut(P(t,0,1.2));c.fillStyle=p.bg;c.fillRect(0,0,W,lb);c.fillRect(0,H-lb,W,lb);
  mono(c,'The venue',W/2,lb-60,{align:'center',color:p.ac,size:22,p:P(t,.8,.5)});const cred=[['Where',x.label||x.brand],['What',x.headline],['How',x.cta||'RSVP']];cred.forEach(([k,v],j)=>{const t0=1.6+j*1.3,a=P(t,t0,.5)*(1-P(t,t0+1.2,.3)*(j<2?1:0));if(a<=0)return;mono(c,k,W/2,H-lb+80,{align:'center',color:p.ac,size:20,p:a});T(c,v,W/2,H-lb+160,{font:IS,italic:1,size:58,align:'center',color:p.fg,maxW:W-160,maxLines:1,alpha:a})});
  outro(c,S,t,7.6,{bg:'#0A0A0A',fg:'#fff',font:IS,acc:p.ac,photo:1})}});
KC({id:'kc-recap',name:'Event Recap',fam:'Events',desc:'A fast recap montage: frames flick through with a running counter and a thank-you to everyone who came.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#FFD23F'},dur:9,pt:2.8,hold:[1,6.8],tags:['Events','Recap'],multi:4,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=Math.max(1,S.n||1),cuts=10,ci=Math.min(cuts-1,Math.floor(t/.62)),run=t<6.2;
  if(run){const m=S.m(ci%n),z=1.08+(ci%3)*.12;c.save();c.translate(W/2,H/2);c.rotate(((ci*37)%7-3)*.01);c.translate(-W/2,-H/2);cover(c,m,0,0,W,H,{z,fx:.3+(ci%4)*.14,fy:.4+(ci%3)*.08,filter:'contrast(1.08)'});c.restore();if((t%.62)<.06){c.fillStyle='rgba(255,255,255,.25)';c.fillRect(0,0,W,H)}
   c.fillStyle='rgba(0,0,0,.25)';c.fillRect(0,0,W,H);mono(c,'Recap',80,170,{color:p.ac,size:24});T(c,String(ci+1).padStart(2,'0'),W-80,220,{font:AN,size:110,align:'right',color:p.fg});scrimB(c,W,H,.75,.6);T(c,x.label||x.headline,80,1620,{font:IT,weight:800,size:70,upper:1,color:p.fg,maxW:W-160,maxLines:2,anchor:'bottom'});mono(c,x.brand,80,1700,{color:p.ac,size:22,maxW:W-160})}
  else{const a=E.out(P(t,6.2,.6));T(c,'Thank you',W/2,840,{font:IS,italic:1,size:150,align:'center',color:p.fg,alpha:a});T(c,'for being there',W/2,960,{font:IT,size:48,align:'center',color:p.ac,alpha:a});mono(c,x.brand,W/2,1080,{align:'center',color:rgba(p.fg,.7),size:24,maxW:W-200,p:a})}
  outro(c,S,t,7.8,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});

/* ================= FAMILY 20 · B2B ================= */
KC({id:'kc-number',name:'The Number',fam:'B2B',desc:'The one number that matters counts up big — only if your copy has one; otherwise your three proof points take the stage.',pal:{bg:'#0B0F1A',fg:'#EEF2FF',ac:'#7C9CFF'},dur:8,pt:4,hold:[2,6.2],tags:['B2B','Proof'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.strokeStyle=rgba(p.fg,.05);c.lineWidth=2;for(let gx=0;gx<W;gx+=90){c.beginPath();c.moveTo(gx,0);c.lineTo(gx,H);c.stroke()}for(let gy=0;gy<H;gy+=90){c.beginPath();c.moveTo(0,gy);c.lineTo(W,gy);c.stroke()}
  mono(c,x.brand,80,180,{color:p.ac,size:24,maxW:W-160,p:P(t,.1,.5)});const nm=nums7(x);
  if(nm){const v=nm.v*E.out(P(t,.5,2)),s=v.toFixed(nm.dec)+nm.suf;T(c,s,80,820,{font:IT,weight:200,size:fit(c,nm.v.toFixed(nm.dec)+nm.suf,IT,200,W-160,380),color:p.fg});bar(c,80,900,W-160,E.out(P(t,.5,2)),p.ac,rgba(p.fg,.1));kin(c,x.headline,80,1080,{t,t0:2.4,font:IS,size:72,maxW:W-160,maxLines:3,color:p.fg})}
  else{kin(c,x.headline,80,520,{t,t0:.3,font:IS,size:84,maxW:W-160,maxLines:3,color:p.fg});pts3(x).forEach((s,i)=>{const t0=1.6+i*.6,y=880+i*210;hair(c,80,y,80+(W-160)*E.out(P(t,t0,.6)),y,rgba(p.fg,.2),2,1);mono(c,'0'+(i+1),80,y+70,{color:p.ac,size:22,p:P(t,t0,.4)});T(c,s,200,y+80,{font:IT,weight:600,size:60,color:p.fg,maxW:W-280,maxLines:1,p:P(t,t0+.1,.5)})})}
  if(x.cta)mono(c,x.cta+'  →',80,1680,{color:p.ac,size:26,p:P(t,4.6,.5)});outro(c,S,t,6.4,{bg:p.bg,fg:p.fg,font:IT,size:96,acc:p.ac})}});
KC({id:'kc-sorted',name:'Chaos → Sorted',fam:'B2B',desc:'Scattered, tilted cards snap into a clean grid — the before/after of what your product does for a team.',pal:{bg:'#F3F3F0',fg:'#121212',ac:'#00B37E'},tone:'light',dur:9,pt:5,hold:[2.5,7.2],tags:['B2B','Workflow'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const k=E.inOut(P(t,2.2,1.4)),f=[...pts3(x),x.headline,x.label,x.cta].filter(Boolean);
  T(c,k<.5?'Before':'After',80,220,{font:AN,size:150,upper:1,color:k<.5?rgba(p.fg,.85):p.ac});mono(c,x.brand,80,280,{color:rgba(p.fg,.6),size:22,maxW:W-160});
  for(let i=0;i<6;i++){const gx=80+(i%2)*(470+20),gy=400+Math.floor(i/2)*250,sx=120+((i*263)%700),sy=420+((i*347)%700),r0=((i*53)%40-20)/100*2.4,cx=sx+(gx-sx)*k,cy=sy+(gy-sy)*k,rot=r0*(1-k)+Math.sin(t*3+i)*.03*(1-k);c.save();c.translate(cx+235,cy+110);c.rotate(rot);c.shadowColor='rgba(0,0,0,.12)';c.shadowBlur=20;c.shadowOffsetY=8;rr(c,-235,-110,470,220,20);c.fillStyle='#fff';c.fill();c.shadowColor='transparent';
   if(i===0){c.save();rr(c,-215,-90,140,180,14);c.clip();cover(c,S.m(0),-215,-90,140,180,{z:1.05});c.restore()}c.fillStyle=k>.9?p.ac:rgba(p.fg,.2);c.beginPath();c.arc(i===0?-40:-190,-60,12,0,7);c.fill();T(c,f[i%f.length]||'',i===0?-50:-200,0,{font:IT,weight:600,size:32,color:p.fg,maxW:i===0?260:400,maxLines:2,lh:1.1});c.restore()}
  T(c,x.headline,80,1260,{font:IS,size:64,color:p.fg,maxW:W-160,maxLines:2,p:P(t,4,.6)});if(x.cta)btn7(c,x.cta,W/2,1600,p.fg,p.bg,P(t,4.6,.5));outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,acc:p.ac})}});
KC({id:'kc-dashboard',name:'The Dashboard',fam:'B2B',desc:'A product window opens, bars grow and a cursor clicks through — your screenshot or photo dropped into a clean app frame.',pal:{bg:'#0E1116',fg:'#E9EDF3',ac:'#4F8CFF'},dur:10,pt:5,hold:[2,8.2],tags:['B2B','SaaS'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const g=c.createRadialGradient(W/2,700,50,W/2,700,900);g.addColorStop(0,rgba(p.ac,.25));g.addColorStop(1,rgba(p.ac,0));c.fillStyle=g;c.fillRect(0,0,W,H);
  kin(c,x.headline,80,260,{t,t0:.2,font:IT,weight:700,size:72,maxW:W-160,maxLines:2,color:p.fg});const o=E.outExpo(P(t,.8,1)),wx=60,wy=470+(1-o)*200,ww=W-120,wh=920;
  c.save();c.globalAlpha=o;c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=60;c.shadowOffsetY=30;rr(c,wx,wy,ww,wh,26);c.fillStyle='#161B22';c.fill();c.shadowColor='transparent';['#FF5F57','#FEBC2E','#28C840'].forEach((cl,i)=>{c.beginPath();c.arc(wx+40+i*34,wy+36,10,0,7);c.fillStyle=cl;c.fill()});c.fillStyle='#0F141A';c.fillRect(wx,wy+70,200,wh-70);
  ['Overview',...pts3(x)].forEach((s,i)=>{const on=i===Math.min(3,Math.floor(Math.max(0,t-3)/1.2));rr(c,wx+16,wy+100+i*70,168,52,10);c.fillStyle=on?rgba(p.ac,.25):'transparent';c.fill();T(c,s,wx+30,wy+134+i*70,{font:IT,size:22,color:on?p.fg:rgba(p.fg,.55),maxW:150,maxLines:1})});
  c.save();rr(c,wx+220,wy+90,ww-240,380,16);c.clip();cover(c,S.m(0),wx+220,wy+90,ww-240,380,{z:1.04});c.restore();const vals=[.45,.7,.55,.85,.62,.95,.78];vals.forEach((v,i)=>{const h=v*300*E.out(P(t,1.6+i*.12,.8)),bx=wx+240+i*((ww-280)/7);rr(c,bx,wy+wh-40-h,((ww-280)/7)-18,h,8);c.fillStyle=i===5?p.ac:rgba(p.fg,.18);c.fill()});c.restore();
  if(t>2.8&&t<7){const ci=Math.min(3,Math.floor((t-3)/1.2));cursor7(c,wx+150+Math.sin(t)*10,wy+120+ci*70)}
  if(x.cta)btn7(c,x.cta,W/2,1600,p.ac,'#fff',P(t,6,.5));mono(c,x.brand,W/2,1720,{align:'center',color:rgba(p.fg,.6),size:22,maxW:W-200,p:P(t,6.2,.5)});outro(c,S,t,8.4,{bg:p.bg,fg:p.fg,font:IT,size:96,acc:p.ac})}});
KC({id:'kc-plugsin',name:'Plugs Right In',fam:'B2B',desc:'Your brand at the centre, nodes orbit in and connect with live lines — perfect for integrations and how-it-connects stories.',pal:{bg:'#0A0A0F',fg:'#F4F4F8',ac:'#B9FA70'},dur:9,pt:4.4,hold:[2,7.2],tags:['B2B','Integrations'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const cx=W/2,cy=780,f=[...pts3(x),'Your team','Your data','Your tools'];
  f.forEach((s,i)=>{const a0=i/6*Math.PI*2+t*.15,r=380*E.outBack(P(t,.6+i*.15,.7)),nx=cx+Math.cos(a0)*r,ny=cy+Math.sin(a0)*r*.9;if(r<=0)return;const L=P(t,1.6+i*.15,.5);c.strokeStyle=rgba(p.ac,.5*L);c.lineWidth=2;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+(nx-cx)*L,cy+(ny-cy)*L);c.stroke();
   const d=((t*.8+i*.17)%1);if(L>=1){c.beginPath();c.arc(cx+(nx-cx)*d,cy+(ny-cy)*d,6,0,7);c.fillStyle=p.ac;c.fill()}c.save();c.font=`500 26px ${IT}`;const w=Math.min(300,c.measureText(s).width+50);c.restore();rr(c,nx-w/2,ny-34,w,68,34);c.fillStyle='#16161E';c.fill();c.strokeStyle=rgba(p.fg,.15);c.stroke();T(c,s,nx,ny+2,{font:IT,weight:500,size:26,align:'center',base:'middle',color:p.fg,maxW:w-30,maxLines:1})});
  const s=E.outBack(P(t,.2,.6));c.save();c.translate(cx,cy);c.scale(s,s);c.beginPath();c.arc(0,0,150,0,7);c.fillStyle=p.ac;c.shadowColor=p.ac;c.shadowBlur=60;c.fill();c.shadowBlur=0;c.beginPath();c.arc(0,0,134,0,7);c.clip();cover(c,S.m(0),-134,-134,268,268,{z:1.05});c.restore();
  T(c,'Plugs right in',80,240,{font:IS,italic:1,size:96,color:p.fg,p:P(t,.1,.6)});mono(c,x.brand,80,300,{color:p.ac,size:22,maxW:W-160,p:P(t,.3,.5)});T(c,x.headline,80,1400,{font:IT,weight:600,size:58,color:p.fg,maxW:W-160,maxLines:2,p:P(t,3,.6)});if(x.cta)mono(c,x.cta+'  →',80,1620,{color:p.ac,size:26,p:P(t,3.6,.5)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-plan',name:'The Plan',fam:'B2B',desc:'A clean pricing card rises with your price and what’s included ticked off one by one — then the start button.',pal:{bg:'#F5F5F7',fg:'#111114',ac:'#6E44FF'},tone:'light',dur:9,pt:4.6,hold:[2.5,7.2],tags:['B2B','Pricing'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Simple pricing',W/2,220,{font:IS,italic:1,size:88,align:'center',color:p.fg,p:P(t,.1,.6)});
  const k=E.outExpo(P(t,.4,1)),cx=120,cy=340+(1-k)*400,cw=W-240,ch=1180;c.save();c.globalAlpha=k;c.shadowColor='rgba(20,10,60,.18)';c.shadowBlur=60;c.shadowOffsetY=24;rr(c,cx,cy,cw,ch,36);c.fillStyle='#fff';c.fill();c.shadowColor='transparent';c.save();rr(c,cx,cy,cw,300,36);c.clip();c.fillRect(cx,cy+100,cw,200);cover(c,S.m(0),cx,cy,cw,300,{z:1.05});c.restore();
  mono(c,x.brand,cx+60,cy+380,{color:p.ac,size:22,maxW:cw-120});T(c,x.price||'Get in touch',cx+60,cy+500,{font:IT,weight:700,size:x.price?110:76,color:p.fg,maxW:cw-120,maxLines:1});hair(c,cx+60,cy+560,cx+cw-60,cy+560,rgba(p.fg,.12),2,1);
  pts3(x).forEach((s,i)=>{const y=cy+650+i*100;tick(c,cx+80,y-12,20,P(t,1.6+i*.4,.35),p.ac);T(c,s,cx+130,y,{font:IT,size:40,color:p.fg,maxW:cw-200,maxLines:1,p:P(t,1.7+i*.4,.4)})});c.restore();
  btn7(c,x.cta||'Get started',W/2,cy+ch-110,p.ac,'#fff',P(t,3.2,.5)*k,{press:P(t,5.4,.4)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,acc:p.ac})}});


/* =====================================================================
   BATCH 8 · 25 POSTS — beyond product brands (static 1080×1350)
   Services · Learn · Fit · Events · B2B
   ===================================================================== */
/* ================= SERVICES ================= */
KP({id:'kc-p-book',name:'Book a Slot',fam:'Services',desc:'A booking card: week strip with the day picked, open time chips and your photo — for salons, clinics and studios.',pal:{bg:'#F4F1EC',fg:'#17161A',ac:'#3E5BFF'},tone:'light',tags:['Services','Booking'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,x.brand,70,110,{color:rgba(p.fg,.6),size:20,maxW:900});T(c,x.headline||'Book your slot',70,200,{font:IS,size:68,color:p.fg,maxW:W-140,maxLines:2,lh:1.05});
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];days.forEach((d,i)=>{const cx=70+i*134+60,y=390,on=i===4;rr(c,cx-56,y-66,112,140,22);c.fillStyle=on?p.ac:'#fff';c.fill();T(c,d,cx,y-18,{font:IT,size:22,align:'center',color:on?'#fff':rgba(p.fg,.6)});T(c,String(i+12),cx,y+40,{font:IT,weight:600,size:40,align:'center',color:on?'#fff':p.fg})});
  ['10:00','11:30','13:00','15:30','17:00','18:30'].forEach((tm,i)=>{const cx=70+(i%3)*323+150,cy=560+Math.floor(i/3)*110,on=i===3;rr(c,cx-145,cy-42,290,84,42);c.fillStyle=on?p.fg:'#fff';c.fill();T(c,tm,cx,cy+2,{font:IT,weight:500,size:32,align:'center',base:'middle',color:on?p.bg:p.fg})});
  c.save();clip(c,70,730,W-140,440);cover(c,S.m(0),70,730,W-140,440,{z:1.05});c.restore();btn7(c,x.cta||'Book now',W/2,1250,p.ac,'#fff',1,{size:26})}});
KP({id:'kc-p-howitworks',name:'How It Works',fam:'Services',desc:'Three numbered steps down a timeline beside a tall photo — explain your service in one glance.',pal:{bg:'#0F1412',fg:'#F2F4EF',ac:'#B9FA70'},tags:['Services','Explainer'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,'How it works',70,120,{color:p.ac,size:22});T(c,x.headline,70,220,{font:IS,size:68,color:p.fg,maxW:W-140,maxLines:2,lh:1.05});
  c.save();clip(c,600,380,410,820);cover(c,S.m(0),600,380,410,820,{z:1.05});c.restore();c.strokeStyle=rgba(p.fg,.2);c.lineWidth=3;c.beginPath();c.moveTo(114,420);c.lineTo(114,1080);c.stroke();
  pts3(x).forEach((s,i)=>{const y=440+i*300;c.beginPath();c.arc(114,y,42,0,7);c.fillStyle=p.ac;c.fill();T(c,String(i+1),114,y+2,{font:IT,weight:700,size:38,align:'center',base:'middle',color:ink(p.ac)});mono(c,'Step '+(i+1),180,y-14,{color:rgba(p.fg,.55),size:18});T(c,s,180,y+44,{font:IS,size:42,color:p.fg,maxW:390,maxLines:2,lh:1.05})});
  foot(c,S,1250,p.fg,{right:x.cta||x.handle})}});
KP({id:'kc-p-studio',name:'Meet the Studio',fam:'Services',desc:'An arched portrait of your space or team with your specialisms set on fine rules — warm and personal.',pal:{bg:'#EFE7DC',fg:'#2A211B',ac:'#9E5E3A'},tone:'light',tags:['Services','About'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const aw=470,ah=640,ax=70,ay=120;c.save();archPath(c,ax,ay,aw,ah);c.clip();cover(c,S.m(0),ax,ay,aw,ah,{z:1.05});c.restore();c.save();archPath(c,ax-14,ay-14,aw+28,ah+28);c.strokeStyle=p.ac;c.lineWidth=2;c.stroke();c.restore();
  T(c,'Meet the',600,330,{font:IS,italic:1,size:72,color:p.fg});T(c,'studio',600,410,{font:IS,size:96,color:p.fg});mono(c,x.brand,600,470,{color:p.ac,size:20,maxW:420});T(c,x.sub||x.headline,600,560,{font:IS,size:34,color:rgba(p.fg,.8),maxW:410,maxLines:5,lh:1.25});
  pts3(x).forEach((s,i)=>{const y=900+i*100;hair(c,70,y+30,W-70,y+30,rgba(p.fg,.2),2,1);mono(c,'0'+(i+1),70,y,{color:p.ac,size:20});T(c,s,W-70,y+4,{font:IS,size:42,align:'right',color:p.fg,maxW:760,maxLines:1})});if(x.cta)mono(c,x.cta+'  →',70,1270,{color:p.fg,size:20})}});
KP({id:'kc-p-visit',name:'Visit Us',fam:'Services',desc:'A pin on a quiet street grid with a photo window of your place — for shops, salons and clinics.',pal:{bg:'#ECEEEA',fg:'#16201B',ac:'#E2553D'},tone:'light',tags:['Services','Location'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.strokeStyle='#fff';c.lineWidth=34;[[0,430,W,380],[0,960,W,1030],[290,0,350,H],[760,0,690,H]].forEach(([a,b,cc,d])=>{c.beginPath();c.moveTo(a,b);c.lineTo(cc,d);c.stroke()});
  const px=520,py=560;c.save();c.translate(px,py);c.beginPath();c.arc(0,-86,60,Math.PI*.8,Math.PI*2.2);c.lineTo(0,0);c.closePath();c.fillStyle=p.ac;c.fill();c.beginPath();c.arc(0,-86,22,0,7);c.fillStyle='#fff';c.fill();c.restore();c.beginPath();c.ellipse(px,562,90,30,0,0,7);c.strokeStyle=rgba(p.ac,.4);c.lineWidth=3;c.stroke();
  c.save();c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=40;c.shadowOffsetY=16;rr(c,110,660,W-220,440,26);c.fillStyle='#fff';c.fill();c.restore();c.save();rr(c,110,660,W-220,440,26);c.clip();cover(c,S.m(0),110,660,W-220,440,{z:1.05});c.restore();
  T(c,'Visit us',70,180,{font:IS,size:110,color:p.fg});mono(c,x.brand,72,240,{color:p.ac,size:22,maxW:W-140});T(c,x.headline,70,1200,{font:IS,size:48,color:p.fg,maxW:W-140,maxLines:1});if(x.cta)mono(c,x.cta+'  →',70,1270,{color:p.fg,size:20})}});
KP({id:'kc-p-askus',name:'You Asked',fam:'Services',desc:'An FAQ as a chat thread: the questions people always ask, answered in your own words.',pal:{bg:'#EAE8F2',fg:'#18172A',ac:'#5B4BFF'},tone:'light',tags:['Services','FAQ'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'You asked',70,170,{font:IS,italic:1,size:90,color:p.fg});mono(c,x.brand,70,230,{color:rgba(p.fg,.55),size:20,maxW:900});
  const msgs=[['q','How does it work?'],['a',x.sub||x.headline],['q','What makes it different?'],['a',pts3(x).join(' · ')]];let y=310;
  msgs.forEach(([k,s])=>{const isQ=k==='q';c.save();c.font=`400 38px ${IT}`;const tw=c.measureText(s).width,bw=Math.min(780,tw+80),lines=Math.min(4,Math.ceil(tw*1.12/(bw-80))),bh=lines*52+48,bx=isQ?70:W-70-bw;c.restore();rr(c,bx,y,bw,bh,34);c.fillStyle=isQ?'#fff':p.ac;c.fill();T(c,s,bx+40,y+60,{font:IT,size:38,color:isQ?p.fg:'#fff',maxW:bw-70,maxLines:4,lh:1.3});y+=bh+36});
  if(x.cta)btn7(c,x.cta,W/2,1250,p.fg,p.bg,1,{size:24});else mono(c,'Ask us anything',W/2,1260,{align:'center',color:p.fg,size:20})}});

/* ================= LEARN ================= */
KP({id:'kc-p-lesson',name:'Lesson Notes',fam:'Learn',desc:'A ruled notebook page: lesson title in ink, three key points ticked in the margin and a taped photo.',pal:{bg:'#FBF8F1',fg:'#1D2233',ac:'#E0482F'},tone:'light',tags:['Learn','Education'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.strokeStyle=rgba('#4A7BB7',.18);c.lineWidth=2;for(let y=260;y<H;y+=80){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}c.strokeStyle=rgba(p.ac,.45);c.beginPath();c.moveTo(140,0);c.lineTo(140,H);c.stroke();
  mono(c,'Lesson 01',180,150,{color:p.ac,size:22});T(c,x.headline,180,240,{font:IS,italic:1,size:64,color:p.fg,maxW:470,maxLines:4,lh:1.08});c.save();c.translate(W-230,330);c.rotate(.05);c.fillStyle='#fff';c.shadowColor='rgba(0,0,0,.16)';c.shadowBlur=24;c.fillRect(-150,-180,300,360);c.shadowColor='transparent';B4tile(c,S.m(0),-136,-166,272,300);c.fillStyle='rgba(235,225,200,.8)';c.fillRect(-55,-198,110,34);c.restore();
  pts3(x).forEach((s,i)=>{const y=720+i*160;tick(c,90,y-14,26,1,p.ac);T(c,s,180,y,{font:IS,size:50,color:p.fg,maxW:W-260,maxLines:1})});hair(c,180,1190,560,1190,p.ac,4,1);mono(c,x.brand,180,1260,{color:rgba(p.fg,.6),size:20,maxW:700})}});
KP({id:'kc-p-tip',name:'Quick Tip',fam:'Learn',desc:'Big “Tip #1”, the tip set loud in your words and a save-for-later line — the most-saved post format.',pal:{bg:'#FFDD3C',fg:'#111111',ac:'#111111'},tone:'light',tags:['Learn','Tips'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Tip',70,330,{font:AN,size:320,upper:1,color:p.fg});c.save();c.translate(W-200,170);c.rotate(.18);c.beginPath();c.arc(0,0,100,0,7);c.fillStyle=p.fg;c.fill();c.restore();T(c,'#1',W-200,190,{font:AN,size:82,align:'center',base:'middle',color:p.bg});
  T(c,x.sub||x.headline,70,480,{font:IT,weight:700,size:64,color:p.fg,maxW:W-140,maxLines:5,lh:1.1});c.save();clip(c,70,860,W-140,300);cover(c,S.m(0),70,860,W-140,300,{z:1.05});c.restore();
  hair(c,70,1220,W-70,1220,rgba(p.fg,.3),3,1);mono(c,'Save this for later',70,1280,{color:p.fg,size:22});mono(c,x.brand,W-70,1280,{align:'right',color:p.fg,size:22,maxW:520})}});
KP({id:'kc-p-whichone',name:'Which One Are You?',fam:'Learn',desc:'A/B/C answer cards under your photo — the audience replies in the comments.',pal:{bg:'#14121C',fg:'#FFFFFF',ac:'#FF7A59'},tags:['Learn','Engagement'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Which one',70,170,{font:IT,weight:800,size:92,color:p.fg});T(c,'are you?',70,270,{font:IS,italic:1,size:92,color:p.ac});c.save();clip(c,70,330,W-140,420);cover(c,S.m(0),70,330,W-140,420,{z:1.05});c.restore();
  pts3(x).forEach((s,i)=>{const y=800+i*140;rr(c,70,y,W-140,116,58);c.fillStyle=rgba(p.fg,.08);c.fill();c.beginPath();c.arc(130,y+58,38,0,7);c.fillStyle=p.ac;c.fill();T(c,'ABC'[i],130,y+60,{font:IT,weight:800,size:40,align:'center',base:'middle',color:ink(p.ac)});T(c,s,200,y+72,{font:IT,weight:600,size:42,color:p.fg,maxW:W-300,maxLines:1})});
  T(c,'Tell us in the comments',70,1285,{font:IS,italic:1,size:44,color:p.fg});mono(c,x.brand,W-70,1280,{align:'right',color:rgba(p.fg,.55),size:18,maxW:340})}});
KP({id:'kc-p-syllabus',name:'What You’ll Learn',fam:'Learn',desc:'A course outline: module rows with ticks under a header photo, plus the course line and how to join.',pal:{bg:'#0D1B2A',fg:'#E8EEF5',ac:'#5CE1E6'},tags:['Learn','Course'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,0,W,420);cover(c,S.m(0),0,0,W,420,{z:1.05,filter:'saturate(.85)'});c.restore();c.save();c.translate(0,180);grad(c,W,240,0,rgba(p.bg,0),rgba(p.bg,1));c.restore();
  mono(c,x.label||'New course',70,470,{color:p.ac,size:22,maxW:W-140});T(c,'What you’ll learn',70,570,{font:IS,size:80,color:p.fg});
  [...pts3(x),x.headline].filter(Boolean).slice(0,4).forEach((s,i)=>{const y=640+i*140;rr(c,70,y,W-140,120,18);c.fillStyle=rgba(p.fg,.06);c.fill();mono(c,'Module '+(i+1),105,y+46,{color:p.ac,size:18});T(c,s,105,y+96,{font:IS,size:40,color:p.fg,maxW:W-300,maxLines:1});tick(c,W-130,y+60,22,1,p.ac)});
  if(x.cta)mono(c,x.cta+'  →',70,1280,{color:p.fg,size:22});mono(c,x.brand,W-70,1280,{align:'right',color:rgba(p.fg,.55),size:18,maxW:460})}});
KP({id:'kc-p-enrol',name:'Enrolments Open',fam:'Learn',desc:'An admit card with programme, batch, what’s included and fee — stamped OPEN.',pal:{bg:'#F1ECE2',fg:'#1B1A17',ac:'#2D6A4F'},tone:'light',tags:['Learn','Enrol'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Enrolments open',W/2,150,{font:IS,italic:1,size:80,align:'center',color:p.fg});const y0=210;shadowCard6(c,90,y0,W-180,1000,'#fff',{blur:50,oy:20});c.fillStyle=p.ac;c.fillRect(90,y0,W-180,110);T(c,x.brand,130,y0+70,{font:IS,size:42,color:'#fff',maxW:W-260,maxLines:1});
  c.save();clip(c,130,y0+150,300,370);cover(c,S.m(0),130,y0+150,300,370,{z:1.06});c.restore();mono(c,'Programme',470,y0+190,{color:rgba(p.fg,.5),size:18});T(c,x.headline,470,y0+250,{font:IS,size:42,color:p.fg,maxW:W-600,maxLines:3,lh:1.05});mono(c,'Batch',470,y0+440,{color:rgba(p.fg,.5),size:18});T(c,x.label||'Starting soon',470,y0+492,{font:IT,weight:600,size:34,color:p.fg,maxW:W-600,maxLines:1});
  c.setLineDash([12,10]);c.strokeStyle=rgba(p.fg,.3);c.lineWidth=2;c.beginPath();c.moveTo(130,y0+580);c.lineTo(W-130,y0+580);c.stroke();c.setLineDash([]);pts3(x).forEach((s,i)=>{tick(c,150,y0+640+i*84,18,1,p.ac);T(c,s,190,y0+652+i*84,{font:IS,size:36,color:p.fg,maxW:W-360,maxLines:1})});
  if(x.price){mono(c,'Fee',130,y0+930,{color:rgba(p.fg,.5),size:18});T(c,x.price,W-130,y0+940,{font:IT,weight:700,size:54,align:'right',color:p.fg})}
  c.save();c.translate(320,y0+480);c.rotate(-.2);c.strokeStyle=p.ac;c.lineWidth=6;rr(c,-140,-52,280,104,14);c.stroke();T(c,'OPEN',0,8,{font:AN,size:66,align:'center',base:'middle',color:p.ac});c.restore();if(x.cta)mono(c,x.cta+'  →',W/2,1290,{align:'center',color:p.fg,size:22})}});

/* ================= FIT ================= */
KP({id:'kc-p-reps',name:'Rep Count',fam:'Fit',desc:'A full rep ring over your training shot with the moves listed loud — gym, yoga, studio.',pal:{bg:'#0B0B0C',fg:'#FFFFFF',ac:'#D7FF3A'},tags:['Fit','Workout'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'grayscale(.4) contrast(1.1) brightness(.6)'});scrimB(c,W,H,.85,.45);const cx=W/2,cy=500;c.lineWidth=24;c.strokeStyle=rgba(p.fg,.15);c.beginPath();c.arc(cx,cy,230,0,7);c.stroke();c.strokeStyle=p.ac;c.lineCap='round';c.beginPath();c.arc(cx,cy,230,-Math.PI/2,Math.PI*1.5-.001);c.stroke();
  T(c,'12',cx,cy,{font:AN,size:230,align:'center',base:'middle',color:p.fg});mono(c,'Reps',cx,cy+150,{align:'center',color:p.ac,size:22});pts3(x).forEach((s,i)=>T(c,s,70,940+i*100,{font:IT,weight:i===0?800:500,size:56,color:i===0?p.ac:rgba(p.fg,.75),maxW:W-140,maxLines:1,upper:1}));mono(c,x.brand,70,1280,{color:p.fg,size:20,maxW:W-140})}});
KP({id:'kc-p-interval',name:'Work / Rest',fam:'Fit',desc:'A bold interval card: your shot in a timer ring, WORK 40s / REST 20s and the moves for each round.',pal:{bg:'#FF4D2E',fg:'#FFFFFF',ac:'#111111'},tags:['Fit','HIIT'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W/2,H);c.fillStyle='#1F3BFF';c.fillRect(W/2,0,W/2,H);c.save();c.beginPath();c.arc(W/2,460,260,0,7);c.clip();cover(c,S.m(0),W/2-260,200,520,520,{z:1.08});c.restore();c.lineWidth=26;c.strokeStyle='#fff';c.lineCap='round';c.beginPath();c.arc(W/2,460,300,-Math.PI/2,Math.PI*.83);c.stroke();c.strokeStyle='rgba(255,255,255,.35)';c.beginPath();c.arc(W/2,460,300,Math.PI*.9,Math.PI*1.45);c.stroke();
  T(c,'Work',W/4,900,{font:AN,size:150,align:'center',upper:1,color:'#fff'});T(c,'40s',W/4,1010,{font:IT,weight:300,size:72,align:'center',color:'#fff'});T(c,'Rest',W*.75,900,{font:AN,size:150,align:'center',upper:1,color:'#fff'});T(c,'20s',W*.75,1010,{font:IT,weight:300,size:72,align:'center',color:'#fff'});
  mono(c,pts3(x).join('  ·  '),W/2,1140,{align:'center',color:'#fff',size:22,maxW:W-120});mono(c,'3 rounds',W/2,1200,{align:'center',color:'rgba(255,255,255,.8)',size:20});mono(c,x.brand,W/2,1280,{align:'center',color:'#fff',size:20,maxW:W-160})}});
KP({id:'kc-p-split',name:'Weekly Split',fam:'Fit',desc:'Seven days, seven bars — your training split with rest days dashed and today highlighted.',pal:{bg:'#F2F2EE',fg:'#111111',ac:'#FF5A1F'},tone:'light',tags:['Fit','Plan'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'This week',70,170,{font:AN,size:136,upper:1,color:p.fg});mono(c,x.brand,70,225,{color:rgba(p.fg,.6),size:20,maxW:900});const f=pts3(x),plan=[f[0],f[1],'Rest',f[2],f[0],f[1],'Rest'];
  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach((d,i)=>{const y=280+i*118,on=i===3,rest=plan[i]==='Rest';rr(c,70,y,W-140,98,18);c.fillStyle=on?p.ac:rest?'transparent':'#fff';c.fill();if(rest){c.strokeStyle=rgba(p.fg,.2);c.lineWidth=2;c.setLineDash([10,8]);c.stroke();c.setLineDash([])}T(c,d,110,y+64,{font:IT,weight:800,size:34,upper:1,color:on?'#fff':p.fg});T(c,plan[i],W-110,y+64,{font:IS,italic:rest?1:0,size:40,align:'right',color:on?'#fff':rest?rgba(p.fg,.45):p.fg,maxW:640,maxLines:1})});
  c.save();clip(c,70,1120,W-140,190);cover(c,S.m(0),70,1120,W-140,190,{z:1.05});c.restore()}});
KP({id:'kc-p-heartbeat',name:'Heartbeat',fam:'Fit',desc:'A glowing heart-rate line across your shot and an all-caps headline — pure energy.',pal:{bg:'#0A0D10',fg:'#FFFFFF',ac:'#FF3B5C'},tags:['Fit','Energy'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'brightness(.55) saturate(.9)'});scrimB(c,W,H,.8,.5);const y0=620;c.save();c.strokeStyle=p.ac;c.lineWidth=8;c.lineJoin='round';c.shadowColor=p.ac;c.shadowBlur=24;c.beginPath();for(let xx=0;xx<=W;xx+=6){const ph=(xx%360)/360;let y=y0;if(ph>.4&&ph<.45)y-=(ph-.4)/.05*40;else if(ph>=.45&&ph<.5)y=y0-40+(ph-.45)/.05*240;else if(ph>=.5&&ph<.56)y=y0+200-(ph-.5)/.06*380;else if(ph>=.56&&ph<.62)y=y0-180+(ph-.56)/.06*180;xx?c.lineTo(xx,y):c.moveTo(xx,y)}c.stroke();c.restore();
  mono(c,x.brand,70,110,{color:p.fg,size:20,maxW:W-140});T(c,x.headline,70,1170,{font:IT,weight:800,size:88,color:p.fg,maxW:W-140,maxLines:3,anchor:'bottom',upper:1,lh:1});mono(c,pts3(x).join('  ·  '),70,1270,{color:p.ac,size:20,maxW:W-140})}});
KP({id:'kc-p-class',name:'Join the Class',fam:'Fit',desc:'Diagonal light stripes over your shot, a huge class name and the join line — studio-poster energy.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#7CFFCB'},tags:['Fit','Class'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'grayscale(.2) brightness(.7)'});c.save();c.globalCompositeOperation='screen';for(let i=0;i<4;i++){c.save();c.translate(-200+i*380,0);c.rotate(-.5);c.fillStyle=rgba(p.ac,.12+.05*(i%2));c.fillRect(0,-200,90+i*30,H*2.5);c.restore()}c.restore();scrimB(c,W,H,.85,.45);
  const nm=x.label&&!/\d{4}/.test(x.label)?x.label:'Class';T(c,'Join the',70,880,{font:IS,italic:1,size:84,color:p.ac});T(c,nm,70,1070,{font:AN,size:fit(c,nm.toUpperCase(),AN,400,W-140,210),upper:1,color:p.fg});mono(c,pts3(x).join('  ·  '),70,1150,{color:p.fg,size:20,maxW:W-140});
  btn7(c,x.cta||'Join the class',300,1250,p.ac,'#111',1,{size:24,maxW:460});mono(c,x.brand,W-70,1258,{align:'right',color:rgba(p.fg,.75),size:18,maxW:400})}});

/* ================= EVENTS ================= */
KP({id:'kc-p-savedate',name:'Save the Date',fam:'Events',desc:'A gold-edged invitation card resting on its envelope — date line, photo and your name.',pal:{bg:'#1F2A24',fg:'#F6F0E4',ac:'#C9A86A'},tags:['Events','Invite'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const ex=120,ey=760,ew=W-240,eh=500;c.fillStyle=mixHex(p.bg,'#000000',.25);c.fillRect(ex,ey,ew,eh);c.save();c.translate(0,ey);c.scale(1,-1);c.fillStyle=mixHex(p.bg,'#000000',.32);c.beginPath();c.moveTo(ex,0);c.lineTo(W/2,eh*.5);c.lineTo(ex+ew,0);c.closePath();c.fill();c.restore();
  const cw=720,ch=900,cx=(W-cw)/2,cy=130;c.save();c.translate(W/2,cy+ch/2);c.rotate(-.025);c.translate(-W/2,-(cy+ch/2));c.fillStyle=p.fg;c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=40;c.fillRect(cx,cy,cw,ch);c.shadowColor='transparent';frame6(c,cx+24,cy+24,cw-48,ch-48,p.ac,10,2);B4tile(c,S.m(0),cx+90,cy+90,cw-180,380);
  T(c,'Save the date',W/2,cy+560,{font:IS,italic:1,size:74,align:'center',color:p.bg});hair(c,W/2-90,cy+600,W/2+90,cy+600,p.ac,2,1);T(c,x.label||x.headline,W/2,cy+680,{font:IT,weight:500,size:38,align:'center',color:p.bg,maxW:cw-160,maxLines:1});T(c,x.brand,W/2,cy+760,{font:IS,size:36,align:'center',color:rgba(p.bg,.7),maxW:cw-160,maxLines:1});c.restore();
  c.fillStyle=mixHex(p.bg,'#000000',.12);c.beginPath();c.moveTo(ex,ey+eh);c.lineTo(ex,ey+eh*.45);c.lineTo(W/2,ey+eh*.8);c.lineTo(ex+ew,ey+eh*.45);c.lineTo(ex+ew,ey+eh);c.closePath();c.fill();mono(c,x.cta||'Details soon',W/2,ey+eh-40,{align:'center',color:p.ac,size:20,maxW:ew-80})}});
KP({id:'kc-p-bill',name:'The Bill',fam:'Events',desc:'A gig-poster bill: names stacked in condensed caps over a duotone photo, venue and date up top.',pal:{bg:'#1400FF',fg:'#FFFFFF',ac:'#FF3EA5'},tags:['Events','Lineup'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.globalAlpha=.5;c.globalCompositeOperation='luminosity';cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'grayscale(1) contrast(1.3)'});c.restore();c.fillStyle=rgba(p.bg,.45);c.fillRect(0,0,W,H);
  mono(c,x.label||'Live',70,120,{color:p.fg,size:22,maxW:W-140});T(c,x.brand,70,200,{font:IS,italic:1,size:60,color:p.ac,maxW:W-140,maxLines:1});[...pts3(x),x.headline].filter(Boolean).slice(0,4).forEach((nm,i)=>T(c,nm,70,430+i*210,{font:AN,size:fit(c,nm.toUpperCase(),AN,400,W-140,i===0?210:150),upper:1,color:i%2?p.ac:p.fg,maxW:W-140,maxLines:1}));
  if(x.cta)btn7(c,x.cta,W/2,1270,p.ac,'#fff',1,{size:24})}});
KP({id:'kc-p-ticket',name:'Admit One',fam:'Events',desc:'A ticket with a torn-away stub: event photo, title, date line and price.',pal:{bg:'#F0E9DD',fg:'#151515',ac:'#E4572E'},tone:'light',tags:['Events','Tickets'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Get tickets',70,170,{font:AN,size:136,upper:1,color:p.fg});const tw=W-140,cut=720;c.save();c.translate(70,250);c.rotate(-.015);shadowCard6(c,0,0,tw,cut);B4tile(c,S.m(0),30,30,tw-60,400);T(c,x.headline,40,520,{font:IS,size:52,color:p.fg,maxW:tw-80,maxLines:2,lh:1.05});mono(c,x.label||x.brand,40,670,{color:p.ac,size:20,maxW:tw-80});
  c.setLineDash([14,12]);c.strokeStyle=rgba(p.fg,.3);c.lineWidth=3;c.beginPath();c.moveTo(0,cut);c.lineTo(tw,cut);c.stroke();c.setLineDash([]);c.save();c.translate(30,60);c.rotate(.04);c.fillStyle=p.ac;c.shadowColor='rgba(0,0,0,.18)';c.shadowBlur=30;c.fillRect(0,cut,tw,200);c.shadowColor='transparent';T(c,'Admit one',40,cut+90,{font:AN,size:66,upper:1,color:'#fff'});if(x.price)T(c,x.price,tw-40,cut+92,{font:IT,weight:700,size:56,align:'right',color:'#fff'});mono(c,x.cta||x.brand,40,cut+160,{color:'rgba(255,255,255,.85)',size:18,maxW:tw-80});c.restore();c.restore()}});
KP({id:'kc-p-venue',name:'The Venue',fam:'Events',desc:'A widescreen still of the venue between black letterbox bars, with where / what / how set as film credits.',pal:{bg:'#050505',fg:'#F3EEE6',ac:'#D9B979'},tags:['Events','Venue'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);B4tile(c,S.m(0),0,250,W,700,{filter:'brightness(.85) contrast(1.05)'});mono(c,'The venue',W/2,170,{align:'center',color:p.ac,size:22});T(c,x.brand,W/2,120,{font:IS,size:40,align:'center',color:rgba(p.fg,.7),maxW:W-200,maxLines:1});
  [['Where',x.label||x.brand],['What',x.headline],['How',x.cta||'RSVP']].forEach(([k,v],i)=>{const cx=W/6+i*W/3;mono(c,k,cx,1040,{align:'center',color:p.ac,size:18});T(c,v,cx,1110,{font:IS,italic:1,size:38,align:'center',color:p.fg,maxW:W/3-40,maxLines:3,lh:1.1})})}});
KP({id:'kc-p-recap',name:'Recap',fam:'Events',desc:'A tight photo grid of the day with frame numbers and a thank-you to everyone who came.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#FFD23F'},tags:['Events','Recap'],multi:4,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const g=12,cw=(W-g*3)/2,chh=380;for(let i=0;i<4;i++){const x0=g+(i%2)*(cw+g),y0=g+Math.floor(i/2)*(chh+g);B4tile(c,S.m(i),x0,y0,cw,chh,{z:1.06+i*.06,fx:.35+i*.1});T(c,String(i+1).padStart(2,'0'),x0+cw-20,y0+70,{font:AN,size:56,align:'right',color:p.fg,shadow:1})}
  mono(c,'Recap',70,880,{color:p.ac,size:22});T(c,'Thank you',70,1020,{font:IS,italic:1,size:130,color:p.fg});T(c,'for being there',70,1100,{font:IT,size:44,color:p.ac});hair(c,70,1180,W-70,1180,rgba(p.fg,.2),2,1);mono(c,x.label||x.brand,70,1250,{color:rgba(p.fg,.8),size:20,maxW:600});mono(c,x.handle,W-70,1250,{align:'right',color:rgba(p.fg,.6),size:20,upper:0,maxW:360})}});

/* ================= B2B ================= */
KP({id:'kc-p-number',name:'The Number',fam:'B2B',desc:'One big figure from your copy on a blueprint grid — or, with no figure, your three proof points.',pal:{bg:'#0B0F1A',fg:'#EEF2FF',ac:'#7C9CFF'},tags:['B2B','Proof'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.strokeStyle=rgba(p.fg,.05);c.lineWidth=2;for(let gx=0;gx<W;gx+=90){c.beginPath();c.moveTo(gx,0);c.lineTo(gx,H);c.stroke()}for(let gy=0;gy<H;gy+=90){c.beginPath();c.moveTo(0,gy);c.lineTo(W,gy);c.stroke()}mono(c,x.brand,70,120,{color:p.ac,size:22,maxW:W-140});const nm=nums7(x);
  if(nm){const s=nm.v.toFixed(nm.dec)+nm.suf;T(c,s,70,620,{font:IT,weight:200,size:fit(c,s,IT,200,W-140,360),color:p.fg});bar(c,70,700,W-140,1,p.ac,rgba(p.fg,.1));T(c,x.headline,70,860,{font:IS,size:66,color:p.fg,maxW:W-140,maxLines:3})}
  else{T(c,x.headline,70,300,{font:IS,size:76,color:p.fg,maxW:W-140,maxLines:3,lh:1.05});pts3(x).forEach((s,i)=>{const y=640+i*180;hair(c,70,y,W-70,y,rgba(p.fg,.2),2,1);mono(c,'0'+(i+1),70,y+70,{color:p.ac,size:20});T(c,s,190,y+80,{font:IT,weight:600,size:54,color:p.fg,maxW:W-260,maxLines:1})})}
  if(x.cta)mono(c,x.cta+'  →',70,1270,{color:p.ac,size:22})}});
KP({id:'kc-p-sorted',name:'Before / After',fam:'B2B',desc:'Left: scattered, tilted task cards. Right: the same work sorted into a clean column — what your product does.',pal:{bg:'#F3F3F0',fg:'#121212',ac:'#00B37E'},tone:'light',tags:['B2B','Workflow'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.fillStyle='#fff';c.fillRect(W/2,0,W/2,H);const f=[...pts3(x),x.label,x.cta].filter(Boolean);T(c,'Before',40,150,{font:AN,size:104,upper:1,color:rgba(p.fg,.8)});T(c,'After',W/2+40,150,{font:AN,size:104,upper:1,color:p.ac});
  f.slice(0,4).forEach((s,i)=>{const cx=80+((i*97)%200),cy=260+i*190,r=((i*53)%40-20)/100*1.8;c.save();c.translate(cx+190,cy+70);c.rotate(r);c.shadowColor='rgba(0,0,0,.12)';c.shadowBlur=16;c.shadowOffsetY=6;rr(c,-190,-70,380,140,18);c.fillStyle='#fff';c.fill();c.shadowColor='transparent';T(c,s,-160,10,{font:IT,weight:600,size:28,color:p.fg,maxW:320,maxLines:2});c.restore()});
  f.slice(0,4).forEach((s,i)=>{const y=240+i*170;rr(c,W/2+40,y,W/2-80,140,18);c.fillStyle=p.bg;c.fill();c.beginPath();c.arc(W/2+90,y+70,16,0,7);c.fillStyle=p.ac;c.fill();T(c,s,W/2+130,y+80,{font:IT,weight:600,size:28,color:p.fg,maxW:W/2-200,maxLines:2})});
  c.save();clip(c,40,1000,W-80,160);cover(c,S.m(0),40,1000,W-80,160,{z:1.05});c.restore();T(c,x.headline,40,1260,{font:IS,size:46,color:p.fg,maxW:W-80,maxLines:1});mono(c,x.brand,40,1310,{color:rgba(p.fg,.55),size:18,maxW:700})}});
KP({id:'kc-p-dashboard',name:'The Dashboard',fam:'B2B',desc:'Your screenshot or photo in a clean app window with sidebar and bar chart, on a soft glow.',pal:{bg:'#0E1116',fg:'#E9EDF3',ac:'#4F8CFF'},tags:['B2B','SaaS'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const g=c.createRadialGradient(W/2,700,50,W/2,700,900);g.addColorStop(0,rgba(p.ac,.25));g.addColorStop(1,rgba(p.ac,0));c.fillStyle=g;c.fillRect(0,0,W,H);T(c,x.headline,70,180,{font:IT,weight:700,size:62,color:p.fg,maxW:W-140,maxLines:2,lh:1.05});
  const wx=50,wy=340,ww=W-100,wh=820;c.save();c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=60;c.shadowOffsetY=30;rr(c,wx,wy,ww,wh,26);c.fillStyle='#161B22';c.fill();c.restore();['#FF5F57','#FEBC2E','#28C840'].forEach((cl,i)=>{c.beginPath();c.arc(wx+40+i*34,wy+36,10,0,7);c.fillStyle=cl;c.fill()});c.fillStyle='#0F141A';c.fillRect(wx,wy+70,200,wh-70);
  ['Overview',...pts3(x)].forEach((s,i)=>{rr(c,wx+16,wy+100+i*70,168,52,10);c.fillStyle=i===1?rgba(p.ac,.25):'transparent';c.fill();T(c,s,wx+30,wy+134+i*70,{font:IT,size:22,color:i===1?p.fg:rgba(p.fg,.55),maxW:150,maxLines:1})});
  c.save();rr(c,wx+220,wy+90,ww-240,360,16);c.clip();cover(c,S.m(0),wx+220,wy+90,ww-240,360,{z:1.04});c.restore();[.45,.7,.55,.85,.62,.95,.78].forEach((v,i)=>{const h=v*270,bw=(ww-280)/7;rr(c,wx+240+i*bw,wy+wh-40-h,bw-18,h,8);c.fillStyle=i===5?p.ac:rgba(p.fg,.18);c.fill()});cursor7(c,wx+150,wy+190);
  mono(c,x.brand,70,1260,{color:rgba(p.fg,.6),size:20,maxW:600});if(x.cta)mono(c,x.cta+'  →',W-70,1260,{align:'right',color:p.ac,size:20,maxW:400})}});
KP({id:'kc-p-plugsin',name:'Plugs Right In',fam:'B2B',desc:'Your brand at the hub with six connected nodes on glowing lines — integrations at a glance.',pal:{bg:'#0A0A0F',fg:'#F4F4F8',ac:'#B9FA70'},tags:['B2B','Integrations'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Plugs right in',70,170,{font:IS,italic:1,size:92,color:p.fg});mono(c,x.brand,70,230,{color:p.ac,size:20,maxW:W-140});const cx=W/2,cy=680;
  [...pts3(x),'Your team','Your data','Your tools'].forEach((s,i)=>{const a0=i/6*Math.PI*2-Math.PI/2,nx=cx+Math.cos(a0)*370,ny=cy+Math.sin(a0)*320;c.strokeStyle=rgba(p.ac,.5);c.lineWidth=2;c.beginPath();c.moveTo(cx,cy);c.lineTo(nx,ny);c.stroke();c.beginPath();c.arc(cx+(nx-cx)*.55,cy+(ny-cy)*.55,6,0,7);c.fillStyle=p.ac;c.fill();
   c.save();c.font=`500 26px ${IT}`;const w=Math.min(300,c.measureText(s).width+50);c.restore();rr(c,nx-w/2,ny-34,w,68,34);c.fillStyle='#16161E';c.fill();c.strokeStyle=rgba(p.fg,.15);c.stroke();T(c,s,nx,ny+2,{font:IT,weight:500,size:26,align:'center',base:'middle',color:p.fg,maxW:w-30,maxLines:1})});
  c.save();c.translate(cx,cy);c.beginPath();c.arc(0,0,140,0,7);c.fillStyle=p.ac;c.shadowColor=p.ac;c.shadowBlur=60;c.fill();c.shadowBlur=0;c.beginPath();c.arc(0,0,124,0,7);c.clip();cover(c,S.m(0),-124,-124,248,248,{z:1.05});c.restore();
  T(c,x.headline,70,1170,{font:IT,weight:600,size:52,color:p.fg,maxW:W-140,maxLines:2});if(x.cta)mono(c,x.cta+'  →',70,1290,{color:p.ac,size:22})}});
KP({id:'kc-p-plan',name:'Simple Pricing',fam:'B2B',desc:'A clean pricing card: your price, what’s included ticked off and the start button.',pal:{bg:'#F5F5F7',fg:'#111114',ac:'#6E44FF'},tone:'light',tags:['B2B','Pricing'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);T(c,'Simple pricing',W/2,150,{font:IS,italic:1,size:80,align:'center',color:p.fg});const cx=130,cy=220,cw=W-260,ch=1060;c.save();c.shadowColor='rgba(20,10,60,.18)';c.shadowBlur=60;c.shadowOffsetY=24;rr(c,cx,cy,cw,ch,36);c.fillStyle='#fff';c.fill();c.restore();c.save();rr(c,cx,cy,cw,280,36);c.clip();c.fillStyle='#fff';c.fillRect(cx,cy+100,cw,180);cover(c,S.m(0),cx,cy,cw,280,{z:1.05});c.restore();
  mono(c,x.brand,cx+60,cy+350,{color:p.ac,size:20,maxW:cw-120});T(c,x.price||'Get in touch',cx+60,cy+460,{font:IT,weight:700,size:x.price?100:70,color:p.fg,maxW:cw-120,maxLines:1});hair(c,cx+60,cy+510,cx+cw-60,cy+510,rgba(p.fg,.12),2,1);
  pts3(x).forEach((s,i)=>{const y=cy+600+i*90;tick(c,cx+80,y-12,20,1,p.ac);T(c,s,cx+130,y,{font:IT,size:38,color:p.fg,maxW:cw-200,maxLines:1})});btn7(c,x.cta||'Get started',W/2,cy+ch-100,p.ac,'#fff',1,{size:26})}});


/* =====================================================================
   BATCH 9 · 25 REELS — new visual languages
   Paper · 3D Type · Boards · Scrapbook · Retro
   ===================================================================== */
const OFF9={};const off9=(k,w,h)=>{let o=OFF9[k];if(!o){o=document.createElement('canvas');OFF9[k]=o}if(o.width!==w||o.height!==h){o.width=w;o.height=h}const g=o.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';g.clearRect(0,0,w,h);return[o,g]};
const hash9=(i)=>{const s=Math.sin(i*127.1+11.7)*43758.5453;return s-Math.floor(s)};
const wrap9=(s,n)=>{const w=String(s||'').toUpperCase().split(/\s+/),L=[];let cur='';w.forEach(x=>{if((cur+' '+x).trim().length>n&&cur){L.push(cur);cur=x}else cur=(cur+' '+x).trim()});if(cur)L.push(cur);return L.map(l=>l.slice(0,n))};
const tape9=(c,x,y,w,rot,col='rgba(238,226,196,.82)')=>{c.save();c.translate(x,y);c.rotate(rot);c.fillStyle=col;c.beginPath();c.moveTo(-w/2,-20);for(let i=0;i<=6;i++)c.lineTo(-w/2+i*w/6,-20+(i%2?3:-3));c.lineTo(w/2,20);for(let i=6;i>=0;i--)c.lineTo(-w/2+i*w/6,20+(i%2?-3:3));c.closePath();c.fill();c.restore()};
const scan9=(c,W,H,a=.18,t=0)=>{c.save();c.fillStyle=`rgba(0,0,0,${a})`;for(let y=(t*40)%6;y<H;y+=6)c.fillRect(0,y,W,3);c.restore()};

/* ================= FAMILY 21 · PAPER ================= */
KC({id:'kc-papercut',name:'Paper Cut',fam:'Paper',desc:'Layered paper hills slide up with soft shadows, then your photo appears through a cut-out circle — handmade, tactile.',pal:{bg:'#F3E9DA',fg:'#2B2420',ac:'#E07A5F'},tone:'light',dur:9,pt:4,hold:[2,7.2],tags:['Paper','Craft'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const cols=[mixHex(p.ac,'#FFFFFF',.55),mixHex(p.ac,'#FFFFFF',.3),p.ac,mixHex(p.ac,'#000000',.2)];
  const hole=E.outBack(P(t,1.6,.8));if(hole>0){c.save();c.beginPath();c.arc(W/2,640,330*hole,0,7);c.clip();cover(c,S.m(0),W/2-330,310,660,660,{z:kb(t,9,1.14,1.03)});c.restore();c.save();c.beginPath();c.arc(W/2,640,330*hole,0,7);c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=14;c.stroke();c.restore()}
  cols.forEach((col,i)=>{const k=E.outExpo(P(t,.1+i*.18,1)),base=H-(1-k)*900,y0=base-560+i*150;c.save();c.shadowColor='rgba(60,30,10,.28)';c.shadowBlur=30;c.shadowOffsetY=-8;c.fillStyle=col;c.beginPath();c.moveTo(0,H+10);c.lineTo(0,y0);for(let xx=0;xx<=W;xx+=20)c.lineTo(xx,y0+Math.sin(xx/(160+i*40)+i*1.7+t*.3)*(40+i*10));c.lineTo(W,H+10);c.closePath();c.fill();c.restore()});
  const hc=ink(mixHex(p.ac,'#000000',.2));T(c,x.headline,W/2,1470,{font:IS,size:76,align:'center',color:hc,maxW:W-160,maxLines:2,p:P(t,2.4,.6)});mono(c,x.brand,W/2,1680,{align:'center',color:hc,size:24,p:P(t,2.8,.5),maxW:W-200});
  T(c,x.label||x.brand,W/2,190,{font:IS,italic:1,size:60,align:'center',color:p.fg,maxW:W-160,maxLines:1,p:P(t,.8,.6)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-fold',name:'Paper Fold',fam:'Paper',desc:'Your photo unfolds like a paper map — accordion panels open one by one with crisp shading on every crease.',pal:{bg:'#E9E4DC',fg:'#1E1B18',ac:'#1E1B18'},tone:'light',dur:9,pt:4,hold:[2.2,7.2],tags:['Paper','Reveal'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=5,fx=90,fw=W-180,fy=330,fh=1080,pw=fw/n,open=E.inOut(P(t,.4,2.2));
  for(let i=0;i<n;i++){const ko=clamp(open*n-i*.85),sx=Math.max(.04,ko),x0=fx+i*pw;c.save();c.translate(x0,fy);c.scale(sx,1);c.beginPath();c.rect(0,0,pw,fh);c.clip();cover(c,S.m(0),-i*pw,0,fw,fh,{z:1.04});const sh=i%2?.22:.06;c.fillStyle=`rgba(0,0,0,${sh*(1-ko)+sh*.4})`;c.fillRect(0,0,pw,fh);c.restore()}
  c.save();c.globalAlpha=.25;c.strokeStyle='#000';c.lineWidth=2;for(let i=1;i<n;i++){const x0=fx+i*pw;c.beginPath();c.moveTo(x0,fy);c.lineTo(x0,fy+fh);c.stroke()}c.restore();
  T(c,x.headline,80,220,{font:IS,size:76,color:p.fg,maxW:W-160,maxLines:2,p:P(t,2.6,.6),lh:1.05});mono(c,x.brand,80,1520,{color:p.fg,size:24,p:P(t,3,.5),maxW:W-160});if(x.cta)mono(c,x.cta+'  →',80,1580,{color:rgba(p.fg,.6),size:22,p:P(t,3.2,.5)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-torn',name:'Torn Reveal',fam:'Paper',desc:'A sheet of paper tears away along a ragged edge to reveal your photo; the headline rides on a torn strip.',pal:{bg:'#F7F3EA',fg:'#141414',ac:'#D94F30'},tone:'light',dur:8,pt:3.6,hold:[2,6.2],tags:['Paper','Reveal'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,8,1.14,1.03)});const k=E.inOut(P(t,1,1.2)),edge=(y0,dir)=>{c.beginPath();c.moveTo(0,dir<0?-10:H+10);c.lineTo(0,y0);for(let xx=0;xx<=W;xx+=18)c.lineTo(xx,y0+(hash9(xx)*2-1)*22);c.lineTo(W,dir<0?-10:H+10);c.closePath()};
  const top=H*.5-k*H*.62;c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=30;c.shadowOffsetY=10;c.fillStyle=p.bg;edge(top,-1);c.fill();c.restore();c.save();c.fillStyle=p.bg;c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=30;c.shadowOffsetY=-10;edge(H*.5+k*H*.62,1);c.fill();c.restore();
  if(k<.6){T(c,x.brand,W/2,H*.5-60-k*H*.6,{font:IS,size:84,align:'center',color:p.fg,maxW:W-160,maxLines:1})}
  const s=E.outExpo(P(t,2.4,.7));if(s>0){c.save();c.translate(-W*(1-s),1240);c.rotate(-.04);c.fillStyle=p.ac;c.beginPath();c.moveTo(40,0);for(let xx=40;xx<=W-40;xx+=16)c.lineTo(xx,(hash9(xx+3)*2-1)*8);for(let xx=W-40;xx>=40;xx-=16)c.lineTo(xx,230+(hash9(xx+9)*2-1)*8);c.closePath();c.fill();T(c,x.headline,90,140,{font:IT,weight:800,size:64,color:ink(p.ac),maxW:W-200,maxLines:2,upper:1,anchor:'bottom',lh:1});c.restore()}
  mono(c,x.cta||x.brand,80,1580,{color:'#fff',size:24,p:P(t,3,.5),maxW:W-160});outro(c,S,t,6.6,{bg:p.bg,fg:p.fg,font:IT,size:96,acc:p.ac})}});
KC({id:'kc-sticky',name:'Sticky Notes',fam:'Paper',desc:'Sticky notes slap onto a cork board one by one with your three points, beside a pinned photo.',pal:{bg:'#B98C5E',fg:'#2A1F14',ac:'#FFE066'},tone:'light',dur:9,pt:4.6,hold:[2.5,7.2],tags:['Paper','List'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);for(let i=0;i<500;i++){c.fillStyle=`rgba(${hash9(i)>.5?'60,35,10':'255,240,210'},${.12+hash9(i+7)*.12})`;c.fillRect(hash9(i+1)*W,hash9(i+2)*H,3+hash9(i+3)*5,3+hash9(i+4)*5)}
  const ph=E.outBack(P(t,.2,.6));c.save();c.translate(W*.62,520);c.rotate(.06);c.scale(ph,ph);c.fillStyle='#fff';c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=24;c.shadowOffsetY=10;c.fillRect(-250,-320,500,620);c.shadowColor='transparent';B4tile(c,S.m(0),-230,-300,460,500);T(c,x.brand,-230,270,{font:IS,italic:1,size:36,color:p.fg,maxW:460,maxLines:1});c.restore();
  c.beginPath();c.arc(W*.62,210,16,0,7);c.fillStyle='#D64545';c.fill();const notes=[x.headline,...pts3(x)].filter(Boolean).slice(0,4),cols=['#FFE066','#FF9EBB','#8FE3CF','#A6C8FF'],pos=[[60,240,-.08],[60,800,.05],[460,1000,-.04],[120,1320,.07]];
  notes.forEach((s,i)=>{const t0=1+i*.7,a=P(t,t0,.25);if(a<=0)return;const sc=1+.25*(1-E.out(a)),[px,py,r]=pos[i];c.save();c.translate(px+190,py+180);c.rotate(r);c.scale(sc,sc);c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=18;c.shadowOffsetY=8;c.fillStyle=cols[i];c.fillRect(-190,-180,380,360);c.shadowColor='transparent';c.fillStyle='rgba(0,0,0,.06)';c.fillRect(-190,-180,380,40);T(c,s,-160,-90,{font:IS,italic:i===0?1:0,size:i===0?50:46,color:p.fg,maxW:320,maxLines:4,lh:1.1,alpha:E.out(a)});c.restore()});
  outro(c,S,t,7.6,{bg:'#2A1F14',fg:'#fff',font:IS,acc:p.ac})}});
KC({id:'kc-shards',name:'Paper Shards',fam:'Paper',desc:'Coloured paper triangles fly in and lock together into a faceted frame around your photo.',pal:{bg:'#14213D',fg:'#FFFFFF',ac:'#FCA311'},dur:8,pt:3.6,hold:[2,6.2],tags:['Paper','Geometric'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const fx=170,fy=360,fw=W-340,fh=920;const a=E.out(P(t,1.6,.8));if(a>0){c.save();c.globalAlpha=a;clip(c,fx,fy,fw,fh);cover(c,S.m(0),fx,fy,fw,fh,{z:kb(t,8,1.14,1.03)});c.restore()}
  const cols=[p.ac,mixHex(p.ac,'#FFFFFF',.4),mixHex(p.bg,'#FFFFFF',.2),'#E5E5E5',mixHex(p.ac,'#000000',.25)],pts=[];for(let i=0;i<=6;i++)pts.push([fx+fw*i/6,fy]);for(let i=1;i<=8;i++)pts.push([fx+fw,fy+fh*i/8]);for(let i=5;i>=0;i--)pts.push([fx+fw*i/6,fy+fh]);for(let i=7;i>=1;i--)pts.push([fx,fy+fh*i/8]);
  pts.forEach((q,i)=>{const nq=pts[(i+1)%pts.length],cx=(q[0]+nq[0])/2,cy=(q[1]+nq[1])/2,dx=cx-W/2,dy=cy-(fy+fh/2),L=Math.hypot(dx,dy),ox=cx+dx/L*90,oy=cy+dy/L*90,k=E.outExpo(P(t,.1+i*.035,.7)),fly=(1-k)*900;c.save();c.translate(dx/L*fly,dy/L*fly);c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(nq[0],nq[1]);c.lineTo(ox,oy);c.closePath();c.fillStyle=cols[i%5];c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=12;c.fill();c.restore()});
  T(c,x.headline,W/2,200,{font:IT,weight:800,size:66,align:'center',color:p.fg,maxW:W-160,maxLines:2,p:P(t,2.2,.6),lh:1.05});mono(c,x.brand,W/2,1560,{align:'center',color:p.ac,size:24,p:P(t,2.6,.5),maxW:W-200});if(x.cta)mono(c,x.cta,W/2,1620,{align:'center',color:p.fg,size:22,p:P(t,2.8,.5)});outro(c,S,t,6.6,{bg:p.bg,fg:p.fg,font:IT,size:96,acc:p.ac})}});

/* ================= FAMILY 22 · 3D TYPE ================= */
KC({id:'kc-extrude',name:'Extruded Type',fam:'3D Type',desc:'Your headline rendered as chunky extruded 3D letters that swing into place over a colour field, photo behind.',pal:{bg:'#FF5D8F',fg:'#FFF4E8',ac:'#3A0CA3'},dur:8,pt:3.6,hold:[1.6,6.2],tags:['3D Type','Bold'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,H*.55,W,H*.45);cover(c,S.m(0),0,H*.55,W,H*.45,{z:kb(t,8,1.12,1.03)});c.restore();
  const lines=wrap9(x.headline||x.brand,12).slice(0,4),sw=E.outBack(P(t,.2,1)),ang=(1-sw)*.6+Math.sin(t*1.2)*.03,SZ=Math.min(lines.length>3?180:230,...lines.map(l=>fit(c,l,AN,400,W-200,230)));lines.forEach((ln,i)=>{const sz=SZ,y=230+sz*.5+i*(sz*.95),depth=26;c.save();c.translate(W/2,y);c.transform(1,ang*.25,-ang*.6,1,0,0);for(let d=depth;d>0;d-=2){T(c,ln,d*.9,d*.7,{font:AN,size:sz,align:'center',base:'middle',color:mixHex(p.ac,'#000000',d/depth*.4)})}T(c,ln,0,0,{font:AN,size:sz,align:'center',base:'middle',color:p.fg});c.restore()});
  mono(c,x.brand,W/2,H*.55-50,{align:'center',color:p.fg,size:24,p:P(t,1.4,.5),maxW:W-200});if(x.cta)btn7(c,x.cta,W/2,1700,p.ac,'#fff',P(t,2.4,.5));outro(c,S,t,6.6,{bg:p.ac,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.bg})}});
KC({id:'kc-echo',name:'Echo Type',fam:'3D Type',desc:'Your brand name repeats in outlined echoes that cascade down the screen, collapsing into one solid word.',pal:{bg:'#0D0D0D',fg:'#F2F2F2',ac:'#00F5D4'},dur:8,pt:4.2,hold:[2,6.2],tags:['3D Type','Kinetic'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const word=String(x.brand||'').toUpperCase(),sz=fit(c,word,AN,400,W-120,220),col=E.inOut(P(t,2.6,1.2)),n=9;
  for(let i=n;i>=1;i--){const y=H/2+(i-n/2)*sz*.62*(1-col)+Math.sin(t*2+i*.5)*10*(1-col);c.save();c.font=`400 ${sz}px ${AN}`;c.textAlign='center';c.textBaseline='middle';c.lineWidth=2;c.strokeStyle=rgba(i%3===0?p.ac:p.fg,.25+.6*(1-i/n));c.globalAlpha=1-col*.9;c.strokeText(word,W/2,y);c.restore()}
  T(c,word,W/2,H/2,{font:AN,size:sz,align:'center',base:'middle',color:p.fg,alpha:col});const ph=E.outExpo(P(t,3.6,.8));if(ph>0){c.save();clip(c,140,H/2+sz*.7,W-280,(560)*ph);cover(c,S.m(0),140,H/2+sz*.7,W-280,560,{z:1.05});c.restore()}
  T(c,x.headline,W/2,H/2-sz*.7-40,{font:IS,italic:1,size:58,align:'center',color:p.ac,maxW:W-160,maxLines:2,p:P(t,3.4,.6),anchor:'bottom'});outro(c,S,t,6.6,{bg:p.bg,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.ac})}});
KC({id:'kc-wordwall',name:'Word Window',fam:'3D Type',desc:'A giant word fills the frame and your photo plays inside the letters, then the letters open into the full picture.',pal:{bg:'#F2EEE6',fg:'#111111',ac:'#111111'},tone:'light',dur:8,pt:2.6,hold:[1,5.8],tags:['3D Type','Reveal'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const word=(String(x.label&&x.label.length<10?x.label:(x.headline||'').split(' ')[0]||x.brand)).toUpperCase(),grow=E.inOut(P(t,3.4,1.2));
  const[o,g]=off9('ww',W,H);const lines=word.length>5?[word.slice(0,Math.ceil(word.length/2)),word.slice(Math.ceil(word.length/2))]:[word];g.fillStyle='#000';g.textAlign='center';g.textBaseline='middle';const sz=Math.min(...lines.map(l=>{g.font=`400 100px ${AN}`;return 100*(W-60)/Math.max(1,g.measureText(l).width)}),900/lines.length);g.font=`400 ${sz}px ${AN}`;
  g.save();g.translate(W/2,H/2);g.scale(1+grow*6,1+grow*6);lines.forEach((l,i)=>g.fillText(l,0,(i-(lines.length-1)/2)*sz*.92));g.restore();if(grow>.6){g.fillStyle=`rgba(0,0,0,${(grow-.6)/.4})`;g.fillRect(0,0,W,H)}g.globalCompositeOperation='source-in';cover(g,S.m(0),0,0,W,H,{z:kb(t,8,1.2,1.04)});
  c.globalAlpha=E.out(P(t,.1,.6));c.drawImage(o,0,0);c.globalAlpha=1;mono(c,x.brand,80,140,{color:grow>.6?'#fff':p.fg,size:24,maxW:W-160});if(grow>.8){scrimB(c,W,H,.75,.5);T(c,x.headline,80,1560,{font:IS,size:76,color:'#fff',maxW:W-160,maxLines:2,anchor:'bottom',p:P(t,4.6,.6)});if(x.cta)mono(c,x.cta,80,1650,{color:'#fff',size:24,p:P(t,5,.5)})}
  outro(c,S,t,6.6,{bg:p.bg,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.fg})}});
KC({id:'kc-slice',name:'Sliced Type',fam:'3D Type',desc:'Your headline is sliced in two and the halves glide apart like a blade cut, revealing the photo in the gap.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#FF4D00'},dur:8,pt:3.4,hold:[1.8,6.2],tags:['3D Type','Reveal'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const open=E.inOut(P(t,1.4,1.2)),gap=open*820,word=wrap9(x.headline||x.brand,10).slice(0,2),sz=Math.min(...word.map(l=>fit(c,l,AN,400,W-120,260)));
  c.save();clip(c,0,H/2-gap/2,W,gap);cover(c,S.m(0),0,H/2-410,W,820,{z:kb(t,8,1.14,1.03)});c.restore();
  [-1,1].forEach(sd=>{c.save();c.translate(sd*open*40,sd*gap/2);c.beginPath();sd<0?c.rect(-100,0,W+200,H/2):c.rect(-100,H/2,W+200,H/2);c.clip();word.forEach((l,i)=>T(c,l,W/2,H/2+(i-(word.length-1)/2)*sz*.95,{font:AN,size:sz,align:'center',base:'middle',color:i%2?p.ac:p.fg}));c.restore()});
  c.strokeStyle=p.ac;c.lineWidth=4;const bl=E.out(P(t,.6,.6));c.beginPath();c.moveTo(0,H/2);c.lineTo(W*bl,H/2);c.globalAlpha=1-open;c.stroke();c.globalAlpha=1;mono(c,x.brand,80,150,{color:p.fg,size:24,maxW:W-160,p:P(t,.2,.5)});if(x.cta)mono(c,x.cta+'  →',80,1760,{color:p.ac,size:24,p:P(t,2.8,.5)});outro(c,S,t,6.6,{bg:p.bg,fg:p.fg,font:AN,upper:1,ls:2,size:130,acc:p.ac})}});
KC({id:'kc-drum',name:'Type Drum',fam:'3D Type',desc:'Words roll past on a turning 3D drum — each of your points rotates to the front, then the headline locks in.',pal:{bg:'#E8E1FF',fg:'#1B1036',ac:'#7B2FF7'},tone:'light',dur:9,pt:5.4,hold:[1.5,7.2],tags:['3D Type','Kinetic'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const items=[...pts3(x),x.headline].filter(Boolean),n=items.length,step=Math.min(n-1,Math.max(0,(t-.6)/1.3)),st=Math.floor(step)+E.inOut(step%1),R=360,cy=760;
  items.forEach((s,i)=>{const a=(i-st)*(Math.PI*2/6),z=Math.cos(a);if(z<0)return;const y=cy+Math.sin(a)*R;c.save();c.translate(W/2,y);c.scale(1,Math.max(.05,z));T(c,s,0,0,{font:IT,weight:800,size:i===n-1?84:96,align:'center',base:'middle',color:i===Math.round(st)?p.ac:rgba(p.fg,.35+.5*z),maxW:W-140,maxLines:1,upper:1});c.restore()});
  c.fillStyle=rgba(p.ac,.12);c.fillRect(0,cy-80,W,160);hair(c,0,cy-80,W,cy-80,rgba(p.ac,.4),2,1);hair(c,0,cy+80,W,cy+80,rgba(p.ac,.4),2,1);
  c.save();clip(c,80,1240,W-160,440);cover(c,S.m(0),80,1240,W-160,440,{z:kb(t,9,1.14,1.03)});c.restore();c.fillStyle=rgba(p.bg,1-E.out(P(t,.4,.8)));c.fillRect(80,1240,W-160,440);mono(c,x.brand,80,200,{color:p.fg,size:24,maxW:W-160,p:P(t,.2,.5)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IT,size:96,acc:p.ac})}});

/* ================= FAMILY 23 · BOARDS ================= */
KC({id:'kc-splitflap',name:'Departures Board',fam:'Boards',desc:'A split-flap departures board clatters through letters until your headline settles — travel-terminal charm.',pal:{bg:'#101010',fg:'#F5F1E6',ac:'#F2C230'},dur:9,pt:4.6,hold:[3,7.2],tags:['Boards','Kinetic'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,'Departures',80,160,{color:p.ac,size:28,p:P(t,.1,.4)});mono(c,x.brand,W-80,160,{align:'right',color:rgba(p.fg,.6),size:22,maxW:520,p:P(t,.1,.4)});
  const cols=13,cw=(W-160)/cols,chh=122,rows=[...wrap9(x.headline,cols).slice(0,4),'',...wrap9(pts3(x)[0]||'',cols).slice(0,1)],CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
  rows.forEach((row,r)=>{for(let k=0;k<cols;k++){const ch=row[k]||' ',x0=80+k*cw,y0=260+r*(chh+14),settle=.6+r*.5+k*.09+hash9(r*31+k)*.6,done=t>settle+.6,flick=Math.floor(t*22+k*3+r*7),cur=done?ch:(t<.4?' ':CH[(flick+CH.indexOf(ch)+37)%CH.length]),ph=done?0:(t*22)%1;
    rr(c,x0+3,y0,cw-6,chh,8);c.fillStyle='#1D1D1D';c.fill();c.save();c.beginPath();c.rect(x0+3,y0,cw-6,chh);c.clip();c.translate(x0+cw/2,y0+chh/2);c.scale(1,done?1:Math.abs(Math.cos(ph*Math.PI))*.8+.2);T(c,cur,0,4,{font:PM,weight:700,size:80,align:'center',base:'middle',color:r===rows.length-1?p.ac:p.fg});c.restore();c.fillStyle='rgba(0,0,0,.55)';c.fillRect(x0+3,y0+chh/2-2,cw-6,4)}});
  c.save();clip(c,80,1200,W-160,400);cover(c,S.m(0),80,1200,W-160,400,{z:kb(t,9,1.12,1.03)});c.restore();c.fillStyle=rgba(p.bg,1-E.out(P(t,3.4,.6)));c.fillRect(80,1200,W-160,400);if(x.cta)mono(c,'Gate  ·  '+x.cta,80,1680,{color:p.ac,size:24,p:P(t,4,.5),maxW:W-160});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:PM,acc:p.ac})}});
KC({id:'kc-led',name:'LED Ticker',fam:'Boards',desc:'Your message scrolls across a glowing LED dot-matrix sign above your photo — shopfront-sign nostalgia.',pal:{bg:'#060606',fg:'#FF6A00',ac:'#FF6A00'},dur:9,pt:3.6,hold:[1,7.2],tags:['Boards','Retro'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const msg=('  '+[x.brand,x.headline,x.cta].filter(Boolean).join('  ★  ')+'  ').toUpperCase(),[o,g]=off9('led',Math.max(8,msg.length*7),9);g.fillStyle='#fff';g.font=`8px ${PM}`;g.textBaseline='top';g.fillText(msg,0,0);const d=g.getImageData(0,0,o.width,9).data;
  const cs=20,rows=9,cols=Math.floor((W-80)/cs),off=Math.floor(t*14)%o.width,y0=260;rr(c,30,y0-30,W-60,rows*cs+60,20);c.fillStyle='#111';c.fill();
  for(let r=0;r<rows;r++)for(let k=0;k<cols;k++){const sx=(k+off)%o.width,on=d[(r*o.width+sx)*4+3]>110;c.beginPath();c.arc(50+k*cs,y0+r*cs+cs/2,7,0,7);c.fillStyle=on?p.fg:'#2A1A10';if(on){c.shadowColor=p.fg;c.shadowBlur=12}c.fill();c.shadowBlur=0}
  c.save();clip(c,80,560,W-160,900);cover(c,S.m(0),80,560,W-160,900,{z:kb(t,9,1.12,1.03),filter:'contrast(1.05) saturate(1.05)'});c.restore();c.fillStyle=rgba('#FF6A00',.06+.04*Math.sin(t*8));c.fillRect(80,560,W-160,900);
  T(c,x.headline,80,1580,{font:IT,weight:700,size:56,color:'#fff',maxW:W-160,maxLines:2,p:P(t,1.6,.6)});mono(c,x.brand,80,1720,{color:p.fg,size:22,maxW:W-160,p:P(t,2,.5)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:PM,acc:p.ac})}});
KC({id:'kc-scoreboard',name:'Scoreboard',fam:'Boards',desc:'A stadium scoreboard lights up row by row with your points, the big headline in the top panel.',pal:{bg:'#0B2A1A',fg:'#FFFFFF',ac:'#FFD400'},dur:9,pt:4.6,hold:[2.5,7.2],tags:['Boards','Sport'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);for(let i=0;i<14;i++){c.fillStyle=`rgba(255,255,255,${.02+(i%2)*.02})`;c.fillRect(0,i*140,W,70)}rr(c,50,180,W-100,1220,30);c.fillStyle='#0A0A0A';c.fill();c.strokeStyle='#333';c.lineWidth=8;c.stroke();
  const flick=t<.6?0:1;c.save();clip(c,80,210,W-160,420);cover(c,S.m(0),80,210,W-160,420,{z:kb(t,9,1.12,1.03),filter:'contrast(1.1)'});c.restore();scan9(c,W,630,.12*flick,t);c.fillStyle=`rgba(0,0,0,${1-E.out(P(t,.3,.5))})`;c.fillRect(80,210,W-160,420);
  T(c,x.headline,W/2,740,{font:AN,size:fit(c,String(x.headline||'').toUpperCase(),AN,400,W-200,110),align:'center',upper:1,color:p.ac,maxW:W-200,maxLines:1,p:P(t,.8,.3)});
  pts3(x).forEach((s,i)=>{const y=860+i*150,on=P(t,1.6+i*.5,.2);rr(c,90,y,W-180,124,12);c.fillStyle='#151515';c.fill();T(c,s,130,y+84,{font:IT,weight:700,size:46,upper:1,color:on>0?p.fg:'#222',maxW:W-420,maxLines:1});T(c,'0'+(i+1),W-130,y+86,{font:PM,weight:700,size:60,align:'right',color:on>0?p.ac:'#222'})});
  mono(c,x.brand,W/2,1340,{align:'center',color:rgba(p.fg,.7),size:22,maxW:W-200,p:P(t,3,.5)});if(x.cta)btn7(c,x.cta,W/2,1560,p.ac,'#111',P(t,3.4,.5));outro(c,S,t,7.6,{bg:'#0A0A0A',fg:'#fff',font:AN,upper:1,ls:2,size:130,acc:p.ac})}});
KC({id:'kc-receipt',name:'The Receipt',fam:'Boards',desc:'A thermal receipt prints out line by line — your points as items, your price as the total, a barcode to finish.',pal:{bg:'#D9D4CB',fg:'#1A1A1A',ac:'#1A1A1A'},tone:'light',dur:9,pt:5.2,hold:[3,7.2],tags:['Boards','Fun'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.fillStyle='#2B2B2B';rr(c,140,90,W-280,90,20);c.fill();const prt=E.inOut(P(t,.3,4.2)),rw=W-360,rx=180,len=1500*prt;
  c.save();c.beginPath();c.rect(rx-20,150,rw+40,len+30);c.clip();c.save();c.translate(0,150+len-1500);c.shadowColor='rgba(0,0,0,.18)';c.shadowBlur=24;c.fillStyle='#FBFAF6';c.beginPath();c.moveTo(rx,0);c.lineTo(rx+rw,0);c.lineTo(rx+rw,1480);for(let xx=rx+rw;xx>=rx;xx-=24)c.lineTo(xx,1480+((xx/24)%2?14:0));c.closePath();c.fill();c.shadowColor='transparent';
  T(c,x.brand,W/2,140,{font:PM,weight:700,size:40,align:'center',color:p.fg,maxW:rw-60,maxLines:2,upper:1});mono(c,x.label||'',W/2,250,{align:'center',color:p.fg,size:20,maxW:rw-60});c.setLineDash([8,8]);c.strokeStyle=p.fg;c.lineWidth=2;c.beginPath();c.moveTo(rx+30,300);c.lineTo(rx+rw-30,300);c.stroke();
  const items=[x.headline,...pts3(x)].filter(Boolean);items.forEach((s,i)=>{const y=380+i*90;T(c,String(i+1).padStart(2,'0')+'  '+s,rx+30,y,{font:PM,size:28,color:p.fg,maxW:rw-140,maxLines:1,upper:1});T(c,i===0&&x.price?'':'✓',rx+rw-30,y,{font:PM,size:28,align:'right',color:p.fg})});
  const ty=380+items.length*90+30;c.beginPath();c.moveTo(rx+30,ty);c.lineTo(rx+rw-30,ty);c.stroke();c.setLineDash([]);if(x.price){T(c,'TOTAL',rx+30,ty+90,{font:PM,weight:700,size:44,color:p.fg});T(c,x.price,rx+rw-30,ty+90,{font:PM,weight:700,size:44,align:'right',color:p.fg})}
  T(c,'*** THANK YOU ***',W/2,ty+200,{font:PM,size:30,align:'center',color:p.fg});for(let i=0;i<46;i++){const bw=1+Math.floor(hash9(i)*4)*2;c.fillStyle=p.fg;c.fillRect(rx+60+i*((rw-120)/46),ty+260,bw,140)}mono(c,x.cta||x.handle,W/2,ty+450,{align:'center',color:p.fg,size:20,upper:0,maxW:rw-60});c.restore();c.restore();
  outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:PM,acc:p.fg})}});
KC({id:'kc-swingtag',name:'Swing Tag',fam:'Boards',desc:'A kraft swing tag on a string swings in, settles with a little bounce, and shows your price and details.',pal:{bg:'#EDE6DA',fg:'#2A2118',ac:'#B7864E'},tone:'light',dur:8,pt:3.6,hold:[2,6.2],tags:['Boards','Price'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,0,W,H*.42);cover(c,S.m(0),0,0,W,H*.42,{z:kb(t,8,1.12,1.03)});c.restore();const sw=Math.exp(-t*.9)*Math.sin(t*4.2)*.5*(t>.2?1:0)+(t<.2?.8:0),px=W/2,py=H*.42-40;
  c.strokeStyle='#8A7356';c.lineWidth=4;c.beginPath();c.moveTo(px,py);c.lineTo(px+Math.sin(sw)*180,py+Math.cos(sw)*180);c.stroke();c.save();c.translate(px+Math.sin(sw)*180,py+Math.cos(sw)*180);c.rotate(-sw);
  const tw=560,th=860;c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=30;c.shadowOffsetY=14;c.fillStyle='#D7B98E';c.beginPath();c.moveTo(-tw/2+80,0);c.lineTo(tw/2-80,0);c.lineTo(tw/2,80);c.lineTo(tw/2,th);c.lineTo(-tw/2,th);c.lineTo(-tw/2,80);c.closePath();c.fill();c.shadowColor='transparent';c.beginPath();c.arc(0,50,18,0,7);c.fillStyle=p.bg;c.fill();c.strokeStyle='#8A7356';c.lineWidth=3;c.stroke();
  T(c,x.brand,0,170,{font:IS,size:46,align:'center',color:p.fg,maxW:tw-80,maxLines:2});hair(c,-120,220,120,220,p.fg,2,1);T(c,x.headline,0,310,{font:IS,italic:1,size:42,align:'center',color:p.fg,maxW:tw-100,maxLines:3,lh:1.1});pts3(x).forEach((s,i)=>mono(c,s,0,500+i*50,{align:'center',color:rgba(p.fg,.75),size:20,maxW:tw-80}));
  if(x.price)T(c,x.price,0,760,{font:IT,weight:700,size:84,align:'center',color:p.fg,maxW:tw-60,maxLines:1});c.restore();outro(c,S,t,6.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});

/* ================= FAMILY 24 · SCRAPBOOK ================= */
KC({id:'kc-scrapbook',name:'Scrapbook Page',fam:'Scrapbook',desc:'Photos get taped onto a kraft page one by one, with doodled arrows and little captions — personal and warm.',pal:{bg:'#D8C3A5',fg:'#2B2118',ac:'#C8553D'},tone:'light',grain:.06,dur:9,pt:4.6,hold:[2.5,7.2],tags:['Scrapbook','Personal'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);for(let i=0;i<300;i++){c.fillStyle=`rgba(80,50,20,${hash9(i)*.08})`;c.fillRect(hash9(i+1)*W,hash9(i+2)*H,2,2)}
  const ph=[[330,520,520,620,-.07],[770,860,430,520,.06],[360,1300,500,440,.03]],f=pts3(x);ph.forEach(([cx,cy,w,h,r],i)=>{const a=E.outBack(P(t,.4+i*.9,.5));if(a<=0)return;c.save();c.translate(cx,cy);c.rotate(r*a+(1-a)*.4);c.scale(.6+.4*a,.6+.4*a);c.globalAlpha=clamp(a*1.4);c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=20;c.shadowOffsetY=8;c.fillStyle='#FFFDF8';c.fillRect(-w/2,-h/2,w,h);c.shadowColor='transparent';B4tile(c,S.m(i),-w/2+16,-h/2+16,w-32,h-90);T(c,f[i]||'',-w/2+20,h/2-28,{font:IS,italic:1,size:32,color:p.fg,maxW:w-40,maxLines:1});c.restore();tape9(c,cx+(i%2?-80:90),cy-h/2+6,140,(i%2?-.3:.25))});
  const dr=P(t,3.2,.8);if(dr>0){c.save();c.strokeStyle=p.ac;c.lineWidth=6;c.lineCap='round';c.setLineDash([2000]);c.lineDashOffset=2000*(1-dr);c.beginPath();c.moveTo(660,330);c.bezierCurveTo(820,300,900,420,870,560);c.stroke();c.setLineDash([]);c.restore()}
  T(c,x.headline,640,250,{font:IS,italic:1,size:54,color:p.fg,maxW:400,maxLines:2,p:P(t,3,.6),lh:1.05});T(c,x.brand,W-80,1640,{font:IS,size:44,align:'right',color:p.fg,maxW:440,maxLines:1,p:P(t,3.6,.5)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-stamp',name:'Postage Stamp',fam:'Scrapbook',desc:'Your photo becomes a perforated postage stamp; a postmark thumps down with your brand around the ring.',pal:{bg:'#F0E8D8',fg:'#23324A',ac:'#B23A48'},tone:'light',dur:8,pt:3.6,hold:[2,6.2],tags:['Scrapbook','Vintage'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);for(let i=0;i<5;i++){c.strokeStyle=rgba(p.fg,.12);c.lineWidth=3;c.beginPath();for(let xx=0;xx<=W;xx+=10)c.lineTo(xx,250+i*22+Math.sin(xx/60)*10);c.stroke()}
  const s=E.outBack(P(t,.3,.7)),sw=620,sh=780,cx=W/2,cy=860;c.save();c.translate(cx,cy);c.rotate(-.03);c.scale(s,s);c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=30;c.fillStyle='#fff';c.beginPath();c.rect(-sw/2,-sh/2,sw,sh);c.fill();c.shadowColor='transparent';c.fillStyle=p.bg;const r=14;for(let xx=-sw/2;xx<=sw/2;xx+=34){c.beginPath();c.arc(xx,-sh/2,r,0,7);c.fill();c.beginPath();c.arc(xx,sh/2,r,0,7);c.fill()}for(let yy=-sh/2;yy<=sh/2;yy+=34){c.beginPath();c.arc(-sw/2,yy,r,0,7);c.fill();c.beginPath();c.arc(sw/2,yy,r,0,7);c.fill()}
  B4tile(c,S.m(0),-sw/2+40,-sh/2+40,sw-80,sh-200);T(c,x.price||'',sw/2-50,sh/2-60,{font:IS,size:48,align:'right',color:p.ac});T(c,x.brand,-sw/2+50,sh/2-60,{font:IS,italic:1,size:36,color:p.fg,maxW:sw-260,maxLines:1});c.restore();
  const m=P(t,1.6,.15),mk=1+.5*(1-m);if(m>0){c.save();c.translate(cx+250,cy-330);c.rotate(.25);c.scale(mk,mk);c.globalAlpha=.8*m;c.strokeStyle=p.ac;c.lineWidth=6;c.beginPath();c.arc(0,0,150,0,7);c.stroke();c.beginPath();c.arc(0,0,110,0,7);c.stroke();c.fillStyle=p.ac;c.font=`700 24px ${PM}`;const str=(String(x.brand||'').toUpperCase()+' · ').repeat(3).slice(0,40);for(let i=0;i<str.length;i++){c.save();c.rotate(i/str.length*Math.PI*2);c.fillText(str[i],-8,-118);c.restore()}T(c,'★',0,10,{font:IT,size:60,align:'center',base:'middle',color:p.ac});for(let i=0;i<4;i++){c.beginPath();for(let xx=160;xx<420;xx+=8)c.lineTo(xx,-48+i*32+Math.sin(xx/24)*8);c.stroke()}c.restore()}
  T(c,x.headline,80,1480,{font:IS,size:64,color:p.fg,maxW:W-160,maxLines:2,p:P(t,2.2,.6)});if(x.cta)mono(c,x.cta,80,1700,{color:p.ac,size:24,p:P(t,2.6,.5)});outro(c,S,t,6.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-zine',name:'Cut-Up Zine',fam:'Scrapbook',desc:'Photocopied halftone photo and a ransom-note headline built from cut-out letters — punk zine attitude.',pal:{bg:'#F2F0EA',fg:'#0F0F0F',ac:'#FF2E63'},tone:'light',grain:.08,dur:8,pt:3.6,hold:[2,6.2],tags:['Scrapbook','Punk'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.translate(W/2,620);c.rotate(-.04);clip(c,-400,-460,800,920);cover(c,S.m(0),-400,-460,800,920,{z:kb(t,8,1.1,1.03),filter:'grayscale(1) contrast(1.8) brightness(1.05)'});c.globalCompositeOperation='multiply';c.fillStyle='#FF2E63';c.globalAlpha=.5;c.fillRect(-400,-460,800,920);c.restore();
  const words=wrap9(x.headline,11).slice(0,3),fonts=[AN,IS,PM,IT];let k=0;words.forEach((w,wi)=>{let xx=80;const y=1200+wi*150,size=Math.min(108,(W-160)/Math.max(1,w.length)*1.4);for(const ch of w){const a=P(t,.6+k*.05,.15);k++;if(ch===' '){xx+=size*.4;continue}const f=fonts[(k*7)%4],bg=hash9(k)>.5?'#fff':(hash9(k+3)>.5?'#0F0F0F':'#FF2E63'),fg=bg==='#fff'?'#0F0F0F':'#fff';c.save();c.font=`700 ${size}px ${f}`;const cw=c.measureText(ch).width+20;c.restore();if(a>0){c.save();c.translate(xx+cw/2,y);c.rotate((hash9(k+9)-.5)*.25);c.scale(1+.3*(1-a),1+.3*(1-a));c.fillStyle=bg;c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=6;c.fillRect(-cw/2,-size*.62,cw,size*1.05);c.shadowColor='transparent';T(c,ch,0,size*.28,{font:f,weight:700,size:size*.9,align:'center',color:fg});c.restore()}xx+=cw+6}});
  tape9(c,W/2,170,220,.04);mono(c,x.brand,80,1700,{color:p.fg,size:26,p:P(t,2.6,.5),maxW:W-160});outro(c,S,t,6.6,{bg:'#0F0F0F',fg:'#fff',font:AN,upper:1,ls:2,size:130,acc:p.ac})}});
KC({id:'kc-specimen',name:'Specimen Card',fam:'Scrapbook',desc:'A museum specimen card: your product pinned under a typed label with catalogue number and notes.',pal:{bg:'#EFEBE0',fg:'#2D2A24',ac:'#5C6B4E'},tone:'light',dur:9,pt:4.6,hold:[2.5,7.2],tags:['Scrapbook','Museum'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);frame6(c,60,60,W-120,H-120,rgba(p.fg,.3),12,2);mono(c,'Specimen',W/2,170,{align:'center',color:p.ac,size:24,p:P(t,.1,.4)});
  const a=E.out(P(t,.4,1));card(c,S.m(0),W/2,700,560,760,{z:1.03,alpha:a});c.save();c.globalAlpha=a;[[W/2-200,360],[W/2+200,1040]].forEach(([px,py])=>{c.beginPath();c.arc(px,py,10,0,7);c.fillStyle='#8B8B8B';c.fill();c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=2;c.beginPath();c.moveTo(px+4,py+4);c.lineTo(px+24,py+30);c.stroke()});c.restore();
  const lab=E.outExpo(P(t,1.6,.8));c.save();c.translate(0,(1-lab)*300);c.globalAlpha=lab;c.fillStyle='#FFFDF6';c.shadowColor='rgba(0,0,0,.12)';c.shadowBlur=16;c.fillRect(140,1180,W-280,420);c.shadowColor='transparent';c.strokeStyle=p.fg;c.lineWidth=2;c.strokeRect(160,1200,W-320,380);
  mono(c,'No. '+String(1+Math.floor(hash9(String(x.brand||'').length)*900)).padStart(3,'0'),190,1250,{color:p.ac,size:20});const txt=x.headline||'',n=Math.floor(txt.length*P(t,2.2,1.4));T(c,txt.slice(0,n),190,1330,{font:IS,italic:1,size:46,color:p.fg,maxW:W-380,maxLines:2});mono(c,pts3(x).join(' · '),190,1490,{color:rgba(p.fg,.7),size:18,maxW:W-380,p:P(t,3.6,.5)});mono(c,x.brand,190,1545,{color:p.fg,size:18,maxW:W-380,p:P(t,3.8,.5)});c.restore();outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});
KC({id:'kc-filmstrip',name:'Film Strip',fam:'Scrapbook',desc:'A 35mm film strip scrolls through with sprocket holes and frame numbers, then one frame enlarges as the hero.',pal:{bg:'#1A1A1A',fg:'#F2E9D8',ac:'#FF8C42'},dur:9,pt:5,hold:[2,7.2],tags:['Scrapbook','Film'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=Math.max(1,S.n||1),sx=200,sw=W-400,fh=sw*1.25,gap=60,scroll=(t*260)%((fh+gap)*6),grow=E.inOut(P(t,4,1));
  if(grow<1){c.save();c.globalAlpha=1-grow;c.fillStyle='#0C0C0C';c.fillRect(sx-80,0,sw+160,H);for(let i=-1;i<8;i++){const y=i*(fh+gap)-scroll%(fh+gap)+40;B4tile(c,S.m((i+60)%n),sx,y,sw,fh,{filter:'sepia(.2) contrast(1.05)'});mono(c,String((i+60)%36+1)+'A',sx-60,y+40,{color:p.ac,size:18});for(let h=0;h<10;h++){const hy=y+h*(fh+gap)/10;rr(c,sx-60,hy,30,40,6);c.fillStyle=p.bg;c.fill();rr(c,sx+sw+30,hy,30,40,6);c.fill()}}c.restore()}
  if(grow>0){c.save();c.globalAlpha=grow;cover(c,S.m(0),0,0,W,H,{z:1.05+.1*(1-grow),filter:'sepia(.15)'});scrimB(c,W,H,.8,.5);T(c,x.headline,80,1560,{font:IS,size:80,color:p.fg,maxW:W-160,maxLines:2,anchor:'bottom'});mono(c,x.brand,80,1650,{color:p.ac,size:24,maxW:W-160});c.restore()}
  mono(c,'35mm  ·  '+(x.label||'Roll 01'),80,120,{color:p.fg,size:20,maxW:W-160,p:P(t,.2,.5)});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:IS,acc:p.ac})}});

/* ================= FAMILY 25 · RETRO ================= */
KC({id:'kc-crt',name:'CRT Boot',fam:'Retro',desc:'A curved CRT monitor boots up: green text types your message, then the photo flickers on with scanlines.',pal:{bg:'#050805',fg:'#39FF6A',ac:'#39FF6A'},dur:9,pt:5.4,hold:[3,7.2],tags:['Retro','Tech'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle='#1B1B18';c.fillRect(0,0,W,H);const sx=70,sy=200,sw=W-140,sh=1300;rr(c,sx-30,sy-30,sw+60,sh+60,60);c.fillStyle='#2C2B26';c.fill();rr(c,sx,sy,sw,sh,48);c.fillStyle=p.bg;c.fill();c.save();rr(c,sx,sy,sw,sh,48);c.clip();
  const on=E.out(P(t,.1,.4));c.fillStyle=`rgba(57,255,106,${.04*on})`;c.fillRect(sx,sy+sh/2-sh/2*on,sw,sh*on);const lines=['> BOOTING '+String(x.brand||'').toUpperCase()+'...','> LOADING '+(pts3(x)[0]||'').toUpperCase(),'> '+(x.headline||'').toUpperCase(),'> READY_'];let y=sy+100;
  lines.forEach((l,i)=>{const t0=.5+i*.8,n=Math.floor(l.length*clamp((t-t0)/.7));if(n<=0)return;T(c,l.slice(0,n)+(i===lines.length-1&&Math.floor(t*3)%2?'█':''),sx+60,y,{font:PM,weight:700,size:40,color:p.fg,maxW:sw-120,maxLines:3,lh:1.3});y+=140});
  const ph=P(t,4,.5);if(ph>0){const fl=ph<1?(Math.floor(t*30)%2?.4:1):1;c.globalAlpha=fl;cover(c,S.m(0),sx,sy+760,sw,sh-760,{z:kb(t,9,1.1,1.03),filter:'saturate(.7) contrast(1.2) hue-rotate(-10deg)'});c.globalAlpha=1;c.fillStyle='rgba(57,255,106,.12)';c.fillRect(sx,sy+760,sw,sh-760)}
  scan9(c,W,H,.22,t);const g=c.createRadialGradient(W/2,sy+sh/2,sh*.3,W/2,sy+sh/2,sh*.8);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.6)');c.fillStyle=g;c.fillRect(sx,sy,sw,sh);c.restore();
  c.beginPath();c.arc(W-130,sy+sh+70,10,0,7);c.fillStyle='#39FF6A';c.fill();mono(c,x.brand,sx,sy+sh+80,{color:'#8C8A80',size:20,maxW:700});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:PM,acc:p.ac})}});
KC({id:'kc-pixel',name:'Pixel Resolve',fam:'Retro',desc:'Your photo starts as big chunky pixels and resolves step by step into full sharpness — 8-bit to HD.',pal:{bg:'#0F0F1A',fg:'#FFFFFF',ac:'#FF3CAC'},dur:8,pt:4.6,hold:[3.4,6.2],tags:['Retro','Reveal'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const steps=[6,10,16,28,48,90,180,W],k=Math.min(steps.length-1,Math.floor(Math.max(0,t-.3)/.45)),res=steps[k],ry=Math.round(res*H/W);
  if(res>=W)cover(c,S.m(0),0,0,W,H,{z:1.04});else{const[o,g]=off9('px',res,ry);cover(g,S.m(0),0,0,res,ry,{z:1.04});c.save();c.imageSmoothingEnabled=false;c.drawImage(o,0,0,W,H);c.restore();c.strokeStyle='rgba(0,0,0,.15)';c.lineWidth=1;if(res<=28){for(let i=0;i<=res;i++){c.beginPath();c.moveTo(i*W/res,0);c.lineTo(i*W/res,H);c.stroke()}for(let j=0;j<=ry;j++){c.beginPath();c.moveTo(0,j*H/ry);c.lineTo(W,j*H/ry);c.stroke()}}}
  mono(c,`${res>=W?'HD':res+'px'}`,W-80,140,{align:'right',color:p.fg,size:26});mono(c,x.brand,80,140,{color:p.fg,size:24,maxW:700});if(k>=steps.length-1){scrimB(c,W,H,.8,.5);kin(c,x.headline,80,1560,{t,t0:3.8,font:IT,weight:800,size:84,maxW:W-160,maxLines:2,color:p.fg,anchor:'bottom'});if(x.cta)mono(c,x.cta+'  →',80,1650,{color:p.ac,size:24,p:P(t,4.4,.5)})}
  outro(c,S,t,6.6,{bg:p.bg,fg:p.fg,font:PM,acc:p.ac})}});
KC({id:'kc-dialog',name:'Retro Dialogs',fam:'Retro',desc:'Old-school OS windows pop up one after another — a photo viewer, your points as alerts — then a click on OK.',pal:{bg:'#008080',fg:'#000000',ac:'#000080'},dur:9,pt:4.6,hold:[2.5,7.2],tags:['Retro','Fun'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const win=(x0,y0,w,h,title,a)=>{if(a<=0)return false;c.save();c.globalAlpha=clamp(a*2);const s=.8+.2*E.outBack(a);c.translate(x0+w/2,y0+h/2);c.scale(s,s);c.translate(-w/2,-h/2);c.fillStyle='#C0C0C0';c.fillRect(0,0,w,h);c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.moveTo(0,h);c.lineTo(0,0);c.lineTo(w,0);c.stroke();c.strokeStyle='#404040';c.beginPath();c.moveTo(w,0);c.lineTo(w,h);c.lineTo(0,h);c.stroke();const g=c.createLinearGradient(0,0,w,0);g.addColorStop(0,p.ac);g.addColorStop(1,'#1084D0');c.fillStyle=g;c.fillRect(6,6,w-12,52);T(c,title,20,42,{font:IT,weight:700,size:26,color:'#fff',maxW:w-120,maxLines:1});c.fillStyle='#C0C0C0';c.fillRect(w-52,14,36,34);T(c,'×',w-34,40,{font:IT,weight:700,size:28,align:'center',color:'#000'});return true};
  if(win(80,180,W-160,880,(x.brand||'photo')+'.jpg',P(t,.2,.4))){B4tile(c,S.m(0),24,74,W-208,780);c.restore()}
  pts3(x).forEach((s,i)=>{if(win(140+i*40,860+i*120,W-280-i*80,300,'Message',P(t,1.4+i*.8,.3))){T(c,'ⓘ',60,170,{font:IT,size:70,color:'#0000CC'});T(c,s,150,160,{font:IT,size:38,color:'#000',maxW:W-480-i*80,maxLines:2});const bx=(W-280-i*80)/2-80;c.fillStyle='#C0C0C0';c.fillRect(bx,215,160,58);c.strokeStyle='#000';c.lineWidth=3;c.strokeRect(bx,215,160,58);T(c,'OK',bx+80,254,{font:IT,size:28,align:'center',color:'#000'});c.restore()}});
  if(t>4&&t<5.2){const k=E.inOut(P(t,4,.6));cursor7(c,300+k*260,1600-k*200,'#fff')}c.fillStyle='#C0C0C0';c.fillRect(0,H-90,W,90);c.fillStyle='#fff';c.fillRect(0,H-90,W,4);rr(c,14,H-76,200,62,4);c.fillStyle='#C0C0C0';c.fill();c.strokeStyle='#404040';c.lineWidth=3;c.stroke();T(c,'Start',90,H-34,{font:IT,weight:800,size:30,color:'#000'});mono(c,x.cta||x.handle,W-30,H-36,{align:'right',color:'#000',size:20,upper:0,maxW:620});
  outro(c,S,t,7.6,{bg:p.ac,fg:'#fff',font:IT,size:96,acc:'#fff'})}});
KC({id:'kc-vhs',name:'VHS Tape',fam:'Retro',desc:'Tracking lines, colour bleed and a PLAY ▶ timestamp — your footage as a home-video tape from the 90s.',pal:{bg:'#000000',fg:'#FFFFFF',ac:'#00E5FF'},dur:8,pt:3.6,hold:[1.5,6.2],tags:['Retro','Video'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle='#000';c.fillRect(0,0,W,H);const jit=(hash9(Math.floor(t*12))-.5)*8;c.save();c.translate(jit,0);cover(c,S.m(0),0,0,W,H,{z:kb(t,8,1.1,1.03),filter:'saturate(1.3) contrast(1.1) blur(1px)'});c.globalCompositeOperation='screen';c.globalAlpha=.22;cover(c,S.m(0),10,0,W,H,{z:kb(t,8,1.1,1.03),filter:'hue-rotate(150deg) saturate(2)'});c.restore();
  const by=(t*420)%(H+300)-150;c.save();c.globalAlpha=.6;cover(c,S.m(0),0,by,W,60,{z:1.1});c.fillStyle='rgba(255,255,255,.25)';c.fillRect(0,by,W,10);c.restore();for(let i=0;i<40;i++){const yy=hash9(i+Math.floor(t*20))*H;c.fillStyle='rgba(255,255,255,.08)';c.fillRect(0,yy,W,2)}
  scrimT(c,W,H,.55,.2);scrimB(c,W,H,.85,.45);T(c,'PLAY ▶',80,180,{font:PM,weight:700,size:60,color:'#fff',shadow:1,alpha:Math.floor(t*2)%2||t>2?1:.35});T(c,'SP',W-80,180,{font:PM,weight:700,size:52,align:'right',color:p.fg,shadow:1});const sec=Math.floor(t);T(c,`00:0${Math.min(9,sec)}:${String(Math.floor((t%1)*30)).padStart(2,'0')}`,W-80,H-200,{font:PM,weight:700,size:48,align:'right',color:p.fg,shadow:1});
  T(c,x.headline,80,H-330,{font:PM,weight:700,size:58,color:p.fg,maxW:W-160,maxLines:3,upper:1,shadow:1,anchor:'bottom',p:P(t,1.2,.4)});mono(c,x.brand,80,H-200,{color:p.ac,size:26,maxW:600,p:P(t,1.6,.4)});outro(c,S,t,6.6,{bg:'#000',fg:'#fff',font:PM,acc:p.ac})}});
KC({id:'kc-arcade',name:'Press Start',fam:'Retro',desc:'An arcade title screen: pixel stars, a blinking PRESS START, your points as a high-score table.',pal:{bg:'#07001A',fg:'#FFFFFF',ac:'#FFE600'},dur:9,pt:4.6,hold:[2,7.2],tags:['Retro','Game'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);for(let i=0;i<120;i++){const sx=hash9(i)*W,sy=(hash9(i+50)*H+t*(40+hash9(i+9)*160))%H;c.fillStyle=hash9(i+3)>.8?p.ac:'#fff';c.fillRect(Math.floor(sx/6)*6,Math.floor(sy/6)*6,6,6)}
  const title=String(x.brand||'').toUpperCase(),sz=fit(c,title,PM,700,W-140,120);[['#FF3CAC',8],['#00E5FF',4],[p.ac,0]].forEach(([col,o])=>T(c,title,W/2+o,300+o,{font:PM,weight:700,size:sz,align:'center',color:col,p:P(t,.2,.4)}));
  c.save();clip(c,190,420,W-380,560);const[o,g]=off9('arc',160,236);cover(g,S.m(0),0,0,160,236,{z:1.05});c.imageSmoothingEnabled=false;c.drawImage(o,190,420,W-380,560);c.restore();c.strokeStyle=p.ac;c.lineWidth=8;c.strokeRect(186,416,W-372,568);
  mono(c,'High scores',W/2,1080,{align:'center',color:p.ac,size:28,p:P(t,1,.4)});pts3(x).forEach((s,i)=>{const y=1170+i*80,a=P(t,1.4+i*.4,.2);T(c,['1ST','2ND','3RD'][i],120,y,{font:PM,weight:700,size:36,color:['#FF3CAC','#00E5FF',p.ac][i],alpha:a});T(c,s.toUpperCase(),260,y,{font:PM,size:34,color:'#fff',maxW:W-380,maxLines:1,alpha:a})});
  if(t>3&&Math.floor(t*2.5)%2)T(c,x.cta?String(x.cta).toUpperCase():'PRESS START',W/2,1560,{font:PM,weight:700,size:52,align:'center',color:'#fff',maxW:W-120,maxLines:1});mono(c,'© '+(x.brand||''),W/2,1700,{align:'center',color:rgba('#fff',.5),size:20,maxW:W-200});outro(c,S,t,7.6,{bg:p.bg,fg:p.fg,font:PM,acc:p.ac})}});


/* =====================================================================
   BATCH 10 · 25 POSTS — new visual languages (static 1080×1350)
   Paper · 3D Type · Boards · Scrapbook · Retro
   ===================================================================== */
/* ================= PAPER ================= */
KP({id:'kc-p-papercut',name:'Paper Cut',fam:'Paper',desc:'Layered paper hills with soft shadows and your photo seen through a cut-out circle — handmade and tactile.',pal:{bg:'#F3E9DA',fg:'#2B2420',ac:'#E07A5F'},tone:'light',tags:['Paper','Craft'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.beginPath();c.arc(W/2,470,290,0,7);c.clip();cover(c,S.m(0),W/2-290,180,580,580,{z:1.05});c.restore();c.beginPath();c.arc(W/2,470,290,0,7);c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=14;c.stroke();
  const cols=[mixHex(p.ac,'#FFFFFF',.55),mixHex(p.ac,'#FFFFFF',.3),p.ac,mixHex(p.ac,'#000000',.2)];cols.forEach((col,i)=>{const y0=820+i*110;c.save();c.shadowColor='rgba(60,30,10,.28)';c.shadowBlur=30;c.shadowOffsetY=-8;c.fillStyle=col;c.beginPath();c.moveTo(0,H+10);c.lineTo(0,y0);for(let xx=0;xx<=W;xx+=20)c.lineTo(xx,y0+Math.sin(xx/(160+i*40)+i*1.7)*(36+i*8));c.lineTo(W,H+10);c.closePath();c.fill();c.restore()});
  const hc=ink(mixHex(p.ac,'#000000',.2));T(c,x.label||x.brand,W/2,110,{font:IS,italic:1,size:50,align:'center',color:p.fg,maxW:W-160,maxLines:1});T(c,x.headline,W/2,1190,{font:IS,size:62,align:'center',color:hc,maxW:W-140,maxLines:2});mono(c,x.brand,W/2,1300,{align:'center',color:hc,size:20,maxW:W-200})}});
KP({id:'kc-p-fold',name:'Paper Fold',fam:'Paper',desc:'Your photo printed on an accordion-folded sheet — alternating light and shade on every crease.',pal:{bg:'#E9E4DC',fg:'#1E1B18',ac:'#1E1B18'},tone:'light',tags:['Paper','Layout'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const n=5,fx=90,fw=W-180,fy=290,fh=820,pw=fw/n;c.save();c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=40;c.shadowOffsetY=20;c.fillStyle='#fff';c.fillRect(fx,fy,fw,fh);c.restore();
  for(let i=0;i<n;i++){const x0=fx+i*pw;c.save();c.beginPath();c.rect(x0,fy,pw,fh);c.clip();cover(c,S.m(0),fx,fy,fw,fh,{z:1.04});c.fillStyle=i%2?'rgba(0,0,0,.18)':'rgba(255,255,255,.08)';c.fillRect(x0,fy,pw,fh);const g=c.createLinearGradient(x0,0,x0+pw,0);g.addColorStop(0,i%2?'rgba(0,0,0,.12)':'rgba(255,255,255,.1)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(x0,fy,pw,fh);c.restore()}
  T(c,x.headline,90,200,{font:IS,size:66,color:p.fg,maxW:W-180,maxLines:2,anchor:'bottom',lh:1.05});mono(c,x.brand,90,1180,{color:p.fg,size:22,maxW:W-180});if(x.cta)mono(c,x.cta+'  →',90,1240,{color:rgba(p.fg,.6),size:20})}});
KP({id:'kc-p-torn',name:'Torn Strip',fam:'Paper',desc:'Full-bleed photo with ragged torn-paper edges top and bottom and the headline on a torn coloured strip.',pal:{bg:'#F7F3EA',fg:'#141414',ac:'#D94F30'},tone:'light',tags:['Paper','Bold'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05});const edge=(y0,top)=>{c.beginPath();c.moveTo(0,top?-10:H+10);c.lineTo(0,y0);for(let xx=0;xx<=W;xx+=18)c.lineTo(xx,y0+(hash9(xx+(top?0:5))*2-1)*20);c.lineTo(W,top?-10:H+10);c.closePath()};
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=24;c.fillStyle=p.bg;edge(150,1);c.fill();edge(H-170,0);c.fill();c.restore();T(c,x.brand,70,100,{font:IS,size:54,color:p.fg,maxW:W-140,maxLines:1});mono(c,x.cta||x.handle,70,H-70,{color:p.fg,size:20,maxW:W-140});
  c.save();c.translate(0,880);c.rotate(-.04);c.fillStyle=p.ac;c.beginPath();c.moveTo(40,0);for(let xx=40;xx<=W-40;xx+=16)c.lineTo(xx,(hash9(xx+3)*2-1)*8);for(let xx=W-40;xx>=40;xx-=16)c.lineTo(xx,200+(hash9(xx+9)*2-1)*8);c.closePath();c.fill();T(c,x.headline,90,130,{font:IT,weight:800,size:56,color:ink(p.ac),maxW:W-200,maxLines:2,upper:1,anchor:'bottom',lh:1});c.restore()}});
KP({id:'kc-p-sticky',name:'Sticky Notes',fam:'Paper',desc:'Colourful sticky notes on cork with your headline and three points, next to a pinned photo.',pal:{bg:'#B98C5E',fg:'#2A1F14',ac:'#FFE066'},tone:'light',tags:['Paper','List'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);for(let i=0;i<420;i++){c.fillStyle=`rgba(${hash9(i)>.5?'60,35,10':'255,240,210'},${.12+hash9(i+7)*.12})`;c.fillRect(hash9(i+1)*W,hash9(i+2)*H,3+hash9(i+3)*5,3+hash9(i+4)*5)}
  c.save();c.translate(W*.64,470);c.rotate(.06);c.fillStyle='#fff';c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=24;c.shadowOffsetY=10;c.fillRect(-230,-300,460,580);c.shadowColor='transparent';B4tile(c,S.m(0),-212,-282,424,470);T(c,x.brand,-212,250,{font:IS,italic:1,size:34,color:p.fg,maxW:424,maxLines:1});c.restore();c.beginPath();c.arc(W*.64,180,16,0,7);c.fillStyle='#D64545';c.fill();
  const notes=[x.headline,...pts3(x)].filter(Boolean).slice(0,4),cols=['#FFE066','#FF9EBB','#8FE3CF','#A6C8FF'],pos=[[50,170,-.08],[60,640,.05],[430,860,-.04],[100,1000,.06]];notes.forEach((s,i)=>{const[px,py,r]=pos[i];c.save();c.translate(px+170,py+160);c.rotate(r);c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=18;c.shadowOffsetY=8;c.fillStyle=cols[i];c.fillRect(-170,-160,340,320);c.shadowColor='transparent';c.fillStyle='rgba(0,0,0,.06)';c.fillRect(-170,-160,340,36);T(c,s,-140,-80,{font:IS,italic:i===0?1:0,size:i===0?46:42,color:p.fg,maxW:285,maxLines:4,lh:1.1});c.restore()})}});
KP({id:'kc-p-shards',name:'Paper Shards',fam:'Paper',desc:'Coloured paper triangles form a faceted frame around your photo on a deep ground.',pal:{bg:'#14213D',fg:'#FFFFFF',ac:'#FCA311'},tags:['Paper','Geometric'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const fx=180,fy=270,fw=W-360,fh=800;B4tile(c,S.m(0),fx,fy,fw,fh);const cols=[p.ac,mixHex(p.ac,'#FFFFFF',.4),mixHex(p.bg,'#FFFFFF',.2),'#E5E5E5',mixHex(p.ac,'#000000',.25)],pts=[];for(let i=0;i<=6;i++)pts.push([fx+fw*i/6,fy]);for(let i=1;i<=8;i++)pts.push([fx+fw,fy+fh*i/8]);for(let i=5;i>=0;i--)pts.push([fx+fw*i/6,fy+fh]);for(let i=7;i>=1;i--)pts.push([fx,fy+fh*i/8]);
  pts.forEach((q,i)=>{const nq=pts[(i+1)%pts.length],cx=(q[0]+nq[0])/2,cy=(q[1]+nq[1])/2,dx=cx-W/2,dy=cy-(fy+fh/2),L=Math.hypot(dx,dy);c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(nq[0],nq[1]);c.lineTo(cx+dx/L*80,cy+dy/L*80);c.closePath();c.fillStyle=cols[i%5];c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=12;c.fill();c.shadowBlur=0});
  T(c,x.headline,W/2,170,{font:IT,weight:800,size:56,align:'center',color:p.fg,maxW:W-160,maxLines:2,anchor:'bottom',lh:1.05});mono(c,x.brand,W/2,1210,{align:'center',color:p.ac,size:22,maxW:W-200});if(x.cta)mono(c,x.cta,W/2,1270,{align:'center',color:p.fg,size:20})}});

/* ================= 3D TYPE ================= */
KP({id:'kc-p-extrude',name:'Extruded Type',fam:'3D Type',desc:'Chunky extruded 3D headline letters on a colour field with your photo below.',pal:{bg:'#FF5D8F',fg:'#FFF4E8',ac:'#3A0CA3'},tags:['3D Type','Bold'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,H*.58,W,H*.42);cover(c,S.m(0),0,H*.58,W,H*.42,{z:1.05});c.restore();const lines=wrap9(x.headline||x.brand,12).slice(0,4),SZ=Math.min(lines.length>3?150:190,...lines.map(l=>fit(c,l,AN,400,W-160,190)));
  lines.forEach((ln,i)=>{const y=110+SZ*.5+i*SZ*.95;c.save();c.translate(W/2,y);c.transform(1,.02,-.12,1,0,0);for(let d=24;d>0;d-=2)T(c,ln,d*.9,d*.7,{font:AN,size:SZ,align:'center',base:'middle',color:mixHex(p.ac,'#000000',d/24*.4)});T(c,ln,0,0,{font:AN,size:SZ,align:'center',base:'middle',color:p.fg});c.restore()});mono(c,x.brand,W/2,H*.58-30,{align:'center',color:p.fg,size:22,maxW:W-200})}});
KP({id:'kc-p-echo',name:'Echo Type',fam:'3D Type',desc:'Your brand name in stacked outline echoes fading down the page, one solid line and a photo strip.',pal:{bg:'#0D0D0D',fg:'#F2F2F2',ac:'#00F5D4'},tags:['3D Type','Graphic'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const word=String(x.brand||'').toUpperCase(),sz=fit(c,word,AN,400,W-100,200);c.font=`400 ${sz}px ${AN}`;c.textAlign='center';c.textBaseline='middle';c.lineWidth=2;
  for(let i=1;i<=7;i++){c.strokeStyle=rgba(i%3===0?p.ac:p.fg,.75-i*.09);c.strokeText(word,W/2,120+sz*.5+i*sz*.62)}T(c,word,W/2,120+sz*.5,{font:AN,size:sz,align:'center',base:'middle',color:p.fg});
  c.save();clip(c,70,H-430,W-140,300);cover(c,S.m(0),70,H-430,W-140,300,{z:1.05});c.restore();T(c,x.headline,70,H-70,{font:IS,italic:1,size:46,color:p.ac,maxW:W-140,maxLines:1})}});
KP({id:'kc-p-wordwindow',name:'Word Window',fam:'3D Type',desc:'One giant word fills the frame with your photo showing through the letters.',pal:{bg:'#F2EEE6',fg:'#111111',ac:'#111111'},tone:'light',tags:['3D Type','Graphic'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const word=(String(x.label&&x.label.length<10?x.label:(x.headline||'').split(' ')[0]||x.brand)).toUpperCase(),lines=word.length>5?[word.slice(0,Math.ceil(word.length/2)),word.slice(Math.ceil(word.length/2))]:[word];
  const[o,g]=off9('pww',W,H);g.fillStyle='#000';g.textAlign='center';g.textBaseline='middle';g.font=`400 100px ${AN}`;const sz=Math.min(...lines.map(l=>100*(W-60)/Math.max(1,g.measureText(l).width)),900/lines.length);g.font=`400 ${sz}px ${AN}`;lines.forEach((l,i)=>g.fillText(l,W/2,H/2-30+(i-(lines.length-1)/2)*sz*.92));g.globalCompositeOperation='source-in';cover(g,S.m(0),0,0,W,H,{z:1.05});c.drawImage(o,0,0);
  mono(c,x.brand,70,90,{color:p.fg,size:22,maxW:W-140});T(c,x.headline,70,H-90,{font:IS,size:52,color:p.fg,maxW:W-140,maxLines:1});if(x.cta)mono(c,x.cta+'  →',70,H-40,{color:rgba(p.fg,.6),size:18})}});
KP({id:'kc-p-slice',name:'Sliced Type',fam:'3D Type',desc:'The headline cut in two with your photo in the gap — a sharp, editorial blade cut.',pal:{bg:'#111111',fg:'#FFFFFF',ac:'#FF4D00'},tags:['3D Type','Bold'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const gap=560,word=wrap9(x.headline||x.brand,10).slice(0,2),sz=Math.min(...word.map(l=>fit(c,l,AN,400,W-120,220)));c.save();clip(c,0,H/2-gap/2,W,gap);cover(c,S.m(0),0,H/2-gap/2,W,gap,{z:1.05});c.restore();
  [-1,1].forEach(sd=>{c.save();c.translate(sd*30,sd*gap/2);c.beginPath();sd<0?c.rect(-100,0,W+200,H/2):c.rect(-100,H/2,W+200,H/2);c.clip();word.forEach((l,i)=>T(c,l,W/2,H/2+(i-(word.length-1)/2)*sz*.95,{font:AN,size:sz,align:'center',base:'middle',color:i%2?p.ac:p.fg}));c.restore()});
  mono(c,x.brand,70,80,{color:p.fg,size:20,maxW:W-140});if(x.cta)mono(c,x.cta+'  →',70,H-50,{color:p.ac,size:20})}});
KP({id:'kc-p-drum',name:'Type Drum',fam:'3D Type',desc:'Your points stacked on a 3D drum — the middle one bold and highlighted, the rest curving away.',pal:{bg:'#E8E1FF',fg:'#1B1036',ac:'#7B2FF7'},tone:'light',tags:['3D Type','List'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const items=[x.f1,x.headline,x.f2,x.f3].filter(Boolean),cy=520,R=330;mono(c,x.brand,70,90,{color:p.fg,size:22,maxW:W-140});
  items.forEach((s,i)=>{const a=(i-1)*(Math.PI/5),z=Math.cos(a);if(z<=0)return;c.save();c.translate(W/2,cy+Math.sin(a)*R);c.scale(1,z);T(c,s,0,0,{font:IT,weight:800,size:i===1?70:80,align:'center',base:'middle',color:i===1?p.ac:rgba(p.fg,.3+.5*z),maxW:W-120,maxLines:1,upper:1});c.restore()});
  c.fillStyle=rgba(p.ac,.12);c.fillRect(0,cy-70,W,140);hair(c,0,cy-70,W,cy-70,rgba(p.ac,.4),2,1);hair(c,0,cy+70,W,cy+70,rgba(p.ac,.4),2,1);c.save();clip(c,70,900,W-140,380);cover(c,S.m(0),70,900,W-140,380,{z:1.05});c.restore()}});

/* ================= BOARDS ================= */
KP({id:'kc-p-splitflap',name:'Departures Board',fam:'Boards',desc:'A split-flap departures board spelling out your headline, with your photo at the gate.',pal:{bg:'#101010',fg:'#F5F1E6',ac:'#F2C230'},tags:['Boards','Graphic'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);mono(c,'Departures',70,100,{color:p.ac,size:26});mono(c,x.brand,W-70,100,{align:'right',color:rgba(p.fg,.6),size:20,maxW:520});const cols=13,cw=(W-140)/cols,chh=108,rows=[...wrap9(x.headline,cols).slice(0,4),'',...wrap9(pts3(x)[0]||'',cols).slice(0,1)];
  rows.forEach((row,r)=>{for(let k=0;k<cols;k++){const x0=70+k*cw,y0=160+r*(chh+12);rr(c,x0+3,y0,cw-6,chh,8);c.fillStyle='#1D1D1D';c.fill();T(c,row[k]||' ',x0+cw/2,y0+chh/2+4,{font:PM,weight:700,size:72,align:'center',base:'middle',color:r===rows.length-1?p.ac:p.fg});c.fillStyle='rgba(0,0,0,.55)';c.fillRect(x0+3,y0+chh/2-2,cw-6,4)}});
  c.save();clip(c,70,930,W-140,330);cover(c,S.m(0),70,930,W-140,330,{z:1.05});c.restore();if(x.cta)mono(c,'Gate  ·  '+x.cta,70,1305,{color:p.ac,size:20,maxW:W-140})}});
KP({id:'kc-p-led',name:'LED Sign',fam:'Boards',desc:'Your message in glowing LED dot-matrix over your photo — shopfront-sign nostalgia.',pal:{bg:'#060606',fg:'#FF6A00',ac:'#FF6A00'},tags:['Boards','Retro'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const msg=(()=>{let m='';for(const w of String(x.brand||'').toUpperCase().split(/\s+/)){if((m+' '+w).trim().length>14)break;m=(m+' '+w).trim()}return m||String(x.brand||'').toUpperCase().slice(0,14)})(),[o,g]=off9('pled',Math.max(8,msg.length*6+2),9);g.fillStyle='#fff';g.font=`8px ${PM}`;g.textBaseline='top';g.fillText(msg,1,0);const d=g.getImageData(0,0,o.width,9).data;
  const cs=Math.min(20,(W-100)/o.width),y0=110;rr(c,30,y0-30,W-60,9*cs+60,20);c.fillStyle='#111';c.fill();const ox=(W-o.width*cs)/2;for(let r=0;r<9;r++)for(let k=0;k<o.width;k++){const on=d[(r*o.width+k)*4+3]>110;c.beginPath();c.arc(ox+k*cs+cs/2,y0+r*cs+cs/2,cs*.36,0,7);c.fillStyle=on?p.fg:'#2A1A10';if(on){c.shadowColor=p.fg;c.shadowBlur=12}c.fill();c.shadowBlur=0}
  c.save();clip(c,70,y0+9*cs+80,W-140,H-(y0+9*cs+80)-230);cover(c,S.m(0),70,y0+9*cs+80,W-140,H-(y0+9*cs+80)-230,{z:1.05});c.restore();T(c,x.headline,70,H-140,{font:IT,weight:700,size:48,color:'#fff',maxW:W-140,maxLines:1});mono(c,pts3(x).join('  ★  '),70,H-70,{color:p.fg,size:20,maxW:W-140})}});
KP({id:'kc-p-scoreboard',name:'Scoreboard',fam:'Boards',desc:'A stadium scoreboard: your photo on the screen, the headline in lights and your points in numbered rows.',pal:{bg:'#0B2A1A',fg:'#FFFFFF',ac:'#FFD400'},tags:['Boards','Sport'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);for(let i=0;i<10;i++){c.fillStyle=`rgba(255,255,255,${.02+(i%2)*.02})`;c.fillRect(0,i*140,W,70)}rr(c,50,60,W-100,1230,30);c.fillStyle='#0A0A0A';c.fill();c.strokeStyle='#333';c.lineWidth=8;c.stroke();c.save();clip(c,80,90,W-160,440);cover(c,S.m(0),80,90,W-160,440,{z:1.05,filter:'contrast(1.1)'});c.restore();scan9(c,W,530,.1,0);
  T(c,x.headline,W/2,650,{font:AN,size:fit(c,String(x.headline||'').toUpperCase(),AN,400,W-200,100),align:'center',upper:1,color:p.ac,maxW:W-200,maxLines:1});pts3(x).forEach((s,i)=>{const y=720+i*140;rr(c,90,y,W-180,116,12);c.fillStyle='#151515';c.fill();T(c,s,130,y+78,{font:IT,weight:700,size:42,upper:1,color:p.fg,maxW:W-420,maxLines:1});T(c,'0'+(i+1),W-130,y+80,{font:PM,weight:700,size:56,align:'right',color:p.ac})});mono(c,x.brand,W/2,1200,{align:'center',color:rgba(p.fg,.7),size:20,maxW:W-200})}});
KP({id:'kc-p-receipt',name:'The Receipt',fam:'Boards',desc:'A thermal receipt: your points as line items, your price as the total, thank-you line and barcode.',pal:{bg:'#D9D4CB',fg:'#1A1A1A',ac:'#1A1A1A'},tone:'light',tags:['Boards','Fun'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();clip(c,0,0,360,H);cover(c,S.m(0),0,0,360,H,{z:1.05});c.restore();const rx=420,rw=W-480;c.save();c.translate(0,0);c.rotate(.012);c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=30;c.fillStyle='#FBFAF6';c.beginPath();c.moveTo(rx,40);c.lineTo(rx+rw,40);c.lineTo(rx+rw,1290);for(let xx=rx+rw;xx>=rx;xx-=24)c.lineTo(xx,1290+((xx/24)%2?14:0));c.closePath();c.fill();c.shadowColor='transparent';
  T(c,x.brand,rx+rw/2,130,{font:PM,weight:700,size:32,align:'center',color:p.fg,maxW:rw-50,maxLines:2,upper:1});mono(c,x.label||'',rx+rw/2,220,{align:'center',color:p.fg,size:16,maxW:rw-50});c.setLineDash([8,8]);c.strokeStyle=p.fg;c.lineWidth=2;c.beginPath();c.moveTo(rx+24,260);c.lineTo(rx+rw-24,260);c.stroke();
  const items=[x.headline,...pts3(x)].filter(Boolean);items.forEach((s,i)=>T(c,String(i+1).padStart(2,'0')+' '+s,rx+24,330+i*80,{font:PM,size:24,color:p.fg,maxW:rw-60,maxLines:2,upper:1,lh:1.2}));const ty=330+items.length*80+20;c.beginPath();c.moveTo(rx+24,ty);c.lineTo(rx+rw-24,ty);c.stroke();c.setLineDash([]);
  if(x.price){T(c,'TOTAL',rx+24,ty+80,{font:PM,weight:700,size:38,color:p.fg});T(c,x.price,rx+rw-24,ty+80,{font:PM,weight:700,size:38,align:'right',color:p.fg})}T(c,'*** THANK YOU ***',rx+rw/2,ty+170,{font:PM,size:24,align:'center',color:p.fg});for(let i=0;i<40;i++){c.fillStyle=p.fg;c.fillRect(rx+50+i*((rw-100)/40),ty+220,1+Math.floor(hash9(i)*4)*2,120)}mono(c,x.cta||x.handle,rx+rw/2,ty+390,{align:'center',color:p.fg,size:18,upper:0,maxW:rw-50});c.restore()}});
KP({id:'kc-p-swingtag',name:'Swing Tag',fam:'Boards',desc:'A kraft swing tag hanging over your photo, with brand, headline, details and price.',pal:{bg:'#EDE6DA',fg:'#2A2118',ac:'#B7864E'},tone:'light',tags:['Boards','Price'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:1.05});c.fillStyle='rgba(0,0,0,.12)';c.fillRect(0,0,W,H);const px=W*.68,py=-10;c.strokeStyle='#8A7356';c.lineWidth=4;c.beginPath();c.moveTo(px,py);c.lineTo(px-20,250);c.stroke();c.save();c.translate(px-20,250);c.rotate(.08);
  const tw=500,th=800;c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=40;c.shadowOffsetY=20;c.fillStyle='#D7B98E';c.beginPath();c.moveTo(-tw/2+70,0);c.lineTo(tw/2-70,0);c.lineTo(tw/2,70);c.lineTo(tw/2,th);c.lineTo(-tw/2,th);c.lineTo(-tw/2,70);c.closePath();c.fill();c.shadowColor='transparent';c.beginPath();c.arc(0,46,16,0,7);c.fillStyle='rgba(0,0,0,.35)';c.fill();
  T(c,x.brand,0,160,{font:IS,size:42,align:'center',color:p.fg,maxW:tw-70,maxLines:2});hair(c,-110,210,110,210,p.fg,2,1);T(c,x.headline,0,290,{font:IS,italic:1,size:38,align:'center',color:p.fg,maxW:tw-90,maxLines:3,lh:1.1});pts3(x).forEach((s,i)=>mono(c,s,0,470+i*46,{align:'center',color:rgba(p.fg,.75),size:18,maxW:tw-70}));if(x.price)T(c,x.price,0,710,{font:IT,weight:700,size:76,align:'center',color:p.fg,maxW:tw-60,maxLines:1});c.restore()}});

/* ================= SCRAPBOOK ================= */
KP({id:'kc-p-scrapbook',name:'Scrapbook Page',fam:'Scrapbook',desc:'Taped photos on a kraft page with handwritten-style captions and a doodled arrow.',pal:{bg:'#D8C3A5',fg:'#2B2118',ac:'#C8553D'},tone:'light',grain:.06,tags:['Scrapbook','Personal'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);for(let i=0;i<260;i++){c.fillStyle=`rgba(80,50,20,${hash9(i)*.08})`;c.fillRect(hash9(i+1)*W,hash9(i+2)*H,2,2)}const f=pts3(x),ph=[[310,400,480,560,-.07],[780,700,400,480,.06],[340,1050,460,400,.03]];
  ph.forEach(([cx,cy,w,h,r],i)=>{c.save();c.translate(cx,cy);c.rotate(r);c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=20;c.shadowOffsetY=8;c.fillStyle='#FFFDF8';c.fillRect(-w/2,-h/2,w,h);c.shadowColor='transparent';B4tile(c,S.m(i),-w/2+16,-h/2+16,w-32,h-84);T(c,f[i]||'',-w/2+20,h/2-26,{font:IS,italic:1,size:30,color:p.fg,maxW:w-40,maxLines:1});c.restore();tape9(c,cx+(i%2?-70:80),cy-h/2+6,130,(i%2?-.3:.25))});
  c.save();c.strokeStyle=p.ac;c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(640,260);c.bezierCurveTo(800,230,880,340,850,440);c.stroke();c.restore();T(c,x.headline,610,170,{font:IS,italic:1,size:50,color:p.fg,maxW:420,maxLines:2,lh:1.05});T(c,x.brand,W-70,1290,{font:IS,size:40,align:'right',color:p.fg,maxW:440,maxLines:1})}});
KP({id:'kc-p-stamp',name:'Postage Stamp',fam:'Scrapbook',desc:'Your photo as a perforated postage stamp with a postmark ring carrying your brand name.',pal:{bg:'#F0E8D8',fg:'#23324A',ac:'#B23A48'},tone:'light',tags:['Scrapbook','Vintage'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const sw=560,sh=700,cx=W/2-40,cy=560;c.save();c.translate(cx,cy);c.rotate(-.03);c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=30;c.fillStyle='#fff';c.fillRect(-sw/2,-sh/2,sw,sh);c.shadowColor='transparent';c.fillStyle=p.bg;const r=13;for(let xx=-sw/2;xx<=sw/2;xx+=32){c.beginPath();c.arc(xx,-sh/2,r,0,7);c.fill();c.beginPath();c.arc(xx,sh/2,r,0,7);c.fill()}for(let yy=-sh/2;yy<=sh/2;yy+=32){c.beginPath();c.arc(-sw/2,yy,r,0,7);c.fill();c.beginPath();c.arc(sw/2,yy,r,0,7);c.fill()}
  B4tile(c,S.m(0),-sw/2+36,-sh/2+36,sw-72,sh-180);T(c,x.price||'',sw/2-46,sh/2-56,{font:IS,size:44,align:'right',color:p.ac});T(c,x.brand,-sw/2+46,sh/2-56,{font:IS,italic:1,size:32,color:p.fg,maxW:sw-240,maxLines:1});c.restore();
  c.save();c.translate(cx+260,cy-270);c.rotate(.25);c.globalAlpha=.8;c.strokeStyle=p.ac;c.lineWidth=6;c.beginPath();c.arc(0,0,140,0,7);c.stroke();c.beginPath();c.arc(0,0,102,0,7);c.stroke();c.fillStyle=p.ac;c.font=`700 22px ${PM}`;const str=(String(x.brand||'').toUpperCase()+' · ').repeat(3).slice(0,38);for(let i=0;i<str.length;i++){c.save();c.rotate(i/str.length*Math.PI*2);c.fillText(str[i],-7,-110);c.restore()}T(c,'★',0,10,{font:IT,size:56,align:'center',base:'middle',color:p.ac});for(let i=0;i<4;i++){c.beginPath();for(let xx=150;xx<380;xx+=8)c.lineTo(xx,-44+i*30+Math.sin(xx/24)*8);c.stroke()}c.restore();
  T(c,x.headline,70,1050,{font:IS,size:60,color:p.fg,maxW:W-140,maxLines:2});if(x.cta)mono(c,x.cta,70,1260,{color:p.ac,size:22})}});
KP({id:'kc-p-zine',name:'Cut-Up Zine',fam:'Scrapbook',desc:'Riso-pink halftone photo and a ransom-note headline built from cut-out letters — zine attitude.',pal:{bg:'#F2F0EA',fg:'#0F0F0F',ac:'#FF2E63'},tone:'light',grain:.08,tags:['Scrapbook','Punk'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.translate(W/2,450);c.rotate(-.04);clip(c,-380,-380,760,760);cover(c,S.m(0),-380,-380,760,760,{z:1.05,filter:'grayscale(1) contrast(1.8) brightness(1.05)'});c.globalCompositeOperation='multiply';c.fillStyle='#FF2E63';c.globalAlpha=.5;c.fillRect(-380,-380,760,760);c.restore();tape9(c,W/2,80,220,.04);
  const words=wrap9(x.headline,11).slice(0,3),fonts=[AN,IS,PM,IT];let k=0;words.forEach((w,wi)=>{let xx=70;const y=960+wi*130,size=Math.min(96,(W-140)/Math.max(1,w.length)*1.4);for(const ch of w){k++;if(ch===' '){xx+=size*.4;continue}const f=fonts[(k*7)%4],bg=hash9(k)>.5?'#fff':(hash9(k+3)>.5?'#0F0F0F':'#FF2E63'),fg=bg==='#fff'?'#0F0F0F':'#fff';c.save();c.font=`700 ${size}px ${f}`;const cw=c.measureText(ch).width+18;c.restore();c.save();c.translate(xx+cw/2,y);c.rotate((hash9(k+9)-.5)*.25);c.fillStyle=bg;c.shadowColor='rgba(0,0,0,.2)';c.shadowBlur=6;c.fillRect(-cw/2,-size*.62,cw,size*1.05);c.shadowColor='transparent';T(c,ch,0,size*.28,{font:f,weight:700,size:size*.9,align:'center',color:fg});c.restore();xx+=cw+6}});
  mono(c,x.brand,70,1300,{color:p.fg,size:22,maxW:W-140})}});
KP({id:'kc-p-specimen',name:'Specimen Card',fam:'Scrapbook',desc:'A museum specimen card: product pinned above a typed label with catalogue number and notes.',pal:{bg:'#EFEBE0',fg:'#2D2A24',ac:'#5C6B4E'},tone:'light',tags:['Scrapbook','Museum'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);frame6(c,50,50,W-100,H-100,rgba(p.fg,.3),12,2);mono(c,'Specimen',W/2,130,{align:'center',color:p.ac,size:22});card(c,S.m(0),W/2,520,520,640,{z:1.03});[[W/2-190,230],[W/2+190,810]].forEach(([px,py])=>{c.beginPath();c.arc(px,py,10,0,7);c.fillStyle='#8B8B8B';c.fill()});
  c.fillStyle='#FFFDF6';c.shadowColor='rgba(0,0,0,.12)';c.shadowBlur=16;c.fillRect(130,900,W-260,360);c.shadowColor='transparent';c.strokeStyle=p.fg;c.lineWidth=2;c.strokeRect(150,920,W-300,320);mono(c,'No. '+String(1+Math.floor(hash9(String(x.brand||'').length)*900)).padStart(3,'0'),180,970,{color:p.ac,size:18});
  T(c,x.headline,180,1040,{font:IS,italic:1,size:42,color:p.fg,maxW:W-360,maxLines:2});mono(c,pts3(x).join(' · '),180,1170,{color:rgba(p.fg,.7),size:16,maxW:W-360});mono(c,x.brand,180,1210,{color:p.fg,size:16,maxW:W-360})}});
KP({id:'kc-p-filmstrip',name:'Film Strip',fam:'Scrapbook',desc:'A horizontal 35mm strip with three frames, sprocket holes and frame numbers, headline beneath.',pal:{bg:'#1A1A1A',fg:'#F2E9D8',ac:'#FF8C42'},tags:['Scrapbook','Film'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.translate(W/2,560);c.rotate(-.06);const sw=W*1.3,sh=560;c.fillStyle='#0C0C0C';c.fillRect(-sw/2,-sh/2,sw,sh);for(let i=0;i<40;i++){const xx=-sw/2+20+i*(sw/40);rr(c,xx,-sh/2+20,26,36,6);c.fillStyle=p.bg;c.fill();rr(c,xx,sh/2-56,26,36,6);c.fill()}
  for(let i=0;i<3;i++){const fw=(sw-200)/3.2,x0=-fw*1.5-30+i*(fw+30);B4tile(c,S.m(i),x0,-sh/2+80,fw,sh-160,{filter:'sepia(.15)'});mono(c,(12+i)+'A',x0,sh/2-70,{color:p.ac,size:18})}c.restore();
  T(c,x.headline,70,1060,{font:IS,size:66,color:p.fg,maxW:W-140,maxLines:2});mono(c,'35mm  ·  '+(x.label||x.brand),70,1250,{color:p.ac,size:20,maxW:W-140})}});

/* ================= RETRO ================= */
KP({id:'kc-p-crt',name:'CRT Screen',fam:'Retro',desc:'Your photo on a curved green-phosphor monitor with typed command lines and scanlines.',pal:{bg:'#050805',fg:'#39FF6A',ac:'#39FF6A'},tags:['Retro','Tech'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle='#1B1B18';c.fillRect(0,0,W,H);const sx=60,sy=60,sw=W-120,sh=1120;rr(c,sx-24,sy-24,sw+48,sh+48,56);c.fillStyle='#2C2B26';c.fill();rr(c,sx,sy,sw,sh,44);c.fillStyle='#050805';c.fill();c.save();rr(c,sx,sy,sw,sh,44);c.clip();
  ['> RUN '+String(x.brand||'').toUpperCase(),'> '+(x.headline||'').toUpperCase(),'> READY_'].forEach((l,i)=>T(c,l,sx+50,sy+90+i*110,{font:PM,weight:700,size:36,color:p.fg,maxW:sw-100,maxLines:2,lh:1.3}));cover(c,S.m(0),sx,sy+430,sw,sh-430,{z:1.05,filter:'saturate(.7) contrast(1.2)'});c.fillStyle='rgba(57,255,106,.12)';c.fillRect(sx,sy+430,sw,sh-430);
  scan9(c,W,H,.22,0);const g=c.createRadialGradient(W/2,sy+sh/2,sh*.3,W/2,sy+sh/2,sh*.8);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.6)');c.fillStyle=g;c.fillRect(sx,sy,sw,sh);c.restore();c.beginPath();c.arc(W-110,1265,10,0,7);c.fillStyle='#39FF6A';c.fill();mono(c,pts3(x).join('  ·  '),sx,1270,{color:'#8C8A80',size:18,maxW:sw-120})}});
KP({id:'kc-p-pixel',name:'8-Bit / HD',fam:'Retro',desc:'Your photo split down the middle — chunky 8-bit pixels on the left, full HD on the right.',pal:{bg:'#0F0F1A',fg:'#FFFFFF',ac:'#FF3CAC'},tags:['Retro','Graphic'],
 r(c,t,S){const{W,H,p,x}=S;const[o,g]=off9('ppx',24,30);cover(g,S.m(0),0,0,24,30,{z:1.04});c.save();c.imageSmoothingEnabled=false;c.drawImage(o,0,0,W,H);c.restore();c.save();clip(c,W/2,0,W/2,H);cover(c,S.m(0),0,0,W,H,{z:1.04});c.restore();c.fillStyle=p.ac;c.fillRect(W/2-4,0,8,H);
  mono(c,'8-bit',70,90,{color:'#fff',size:24});mono(c,'HD',W-70,90,{align:'right',color:'#fff',size:24});scrimB(c,W,H,.85,.5);T(c,x.headline,70,1230,{font:IT,weight:800,size:66,color:'#fff',maxW:W-140,maxLines:2,anchor:'bottom'});mono(c,x.brand,70,1300,{color:p.ac,size:20,maxW:W-140})}});
KP({id:'kc-p-dialog',name:'Retro Dialogs',fam:'Retro',desc:'Old-school OS windows: a photo viewer with your image and an alert box carrying your headline.',pal:{bg:'#008080',fg:'#000000',ac:'#000080'},tags:['Retro','Fun'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const win=(x0,y0,w,h,title)=>{c.fillStyle='#C0C0C0';c.fillRect(x0,y0,w,h);c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.moveTo(x0,y0+h);c.lineTo(x0,y0);c.lineTo(x0+w,y0);c.stroke();c.strokeStyle='#404040';c.beginPath();c.moveTo(x0+w,y0);c.lineTo(x0+w,y0+h);c.lineTo(x0,y0+h);c.stroke();const g=c.createLinearGradient(x0,0,x0+w,0);g.addColorStop(0,p.ac);g.addColorStop(1,'#1084D0');c.fillStyle=g;c.fillRect(x0+6,y0+6,w-12,48);T(c,title,x0+20,y0+40,{font:IT,weight:700,size:24,color:'#fff',maxW:w-120,maxLines:1});c.fillStyle='#C0C0C0';c.fillRect(x0+w-50,y0+12,34,32);T(c,'×',x0+w-33,y0+37,{font:IT,weight:700,size:26,align:'center',color:'#000'})};
  win(60,60,W-120,760,(x.brand||'photo')+'.jpg');B4tile(c,S.m(0),80,124,W-160,676);win(150,700,W-300,380,'Message');T(c,'ⓘ',210,860,{font:IT,size:70,color:'#0000CC'});T(c,x.headline,300,840,{font:IT,size:38,color:'#000',maxW:W-520,maxLines:3,lh:1.2});const bx=W/2-80;c.fillStyle='#C0C0C0';c.fillRect(bx,990,160,58);c.strokeStyle='#000';c.lineWidth=3;c.strokeRect(bx,990,160,58);T(c,'OK',W/2,1029,{font:IT,size:28,align:'center',color:'#000'});cursor7(c,W/2+40,1020,'#fff');
  c.fillStyle='#C0C0C0';c.fillRect(0,H-80,W,80);c.fillStyle='#fff';c.fillRect(0,H-80,W,4);rr(c,14,H-66,190,54,4);c.fillStyle='#C0C0C0';c.fill();c.strokeStyle='#404040';c.lineWidth=3;c.stroke();T(c,'Start',84,H-29,{font:IT,weight:800,size:28,color:'#000'});mono(c,x.cta||x.handle,W-30,H-32,{align:'right',color:'#000',size:18,upper:0,maxW:620})}});
KP({id:'kc-p-vhs',name:'VHS Still',fam:'Retro',desc:'Your photo as a paused VHS frame: PLAY ▶, SP, timestamp, colour bleed and tracking lines.',pal:{bg:'#000000',fg:'#FFFFFF',ac:'#00E5FF'},tags:['Retro','Video'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle='#000';c.fillRect(0,0,W,H);cover(c,S.m(0),0,0,W,H,{z:1.05,filter:'saturate(1.3) contrast(1.1) blur(1px)'});c.save();c.globalCompositeOperation='screen';c.globalAlpha=.22;cover(c,S.m(0),10,0,W,H,{z:1.05,filter:'hue-rotate(150deg) saturate(2)'});c.restore();c.save();c.globalAlpha=.6;cover(c,S.m(0),-14,880,W,50,{z:1.06});c.fillStyle='rgba(255,255,255,.25)';c.fillRect(0,880,W,8);c.restore();for(let i=0;i<30;i++){c.fillStyle='rgba(255,255,255,.08)';c.fillRect(0,hash9(i)*H,W,2)}
  scrimT(c,W,H,.55,.2);scrimB(c,W,H,.85,.45);T(c,'PAUSE ❚❚',70,130,{font:PM,weight:700,size:54,color:'#fff',shadow:1});T(c,'SP',W-70,130,{font:PM,weight:700,size:48,align:'right',color:'#fff',shadow:1});T(c,'00:04:12',W-70,H-70,{font:PM,weight:700,size:42,align:'right',color:'#fff',shadow:1});
  T(c,x.headline,70,H-160,{font:PM,weight:700,size:52,color:'#fff',maxW:W-140,maxLines:3,upper:1,shadow:1,anchor:'bottom'});mono(c,x.brand,70,H-70,{color:p.ac,size:22,maxW:600})}});
KP({id:'kc-p-arcade',name:'Press Start',fam:'Retro',desc:'An arcade title card: chromatic brand name, pixelated photo, high-score table of your points.',pal:{bg:'#07001A',fg:'#FFFFFF',ac:'#FFE600'},tags:['Retro','Game'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);for(let i=0;i<110;i++){c.fillStyle=hash9(i+3)>.8?p.ac:'#fff';c.fillRect(Math.floor(hash9(i)*W/6)*6,Math.floor(hash9(i+50)*H/6)*6,6,6)}const title=String(x.brand||'').toUpperCase(),sz=fit(c,title,PM,700,W-120,110);[['#FF3CAC',8],['#00E5FF',4],[p.ac,0]].forEach(([col,o])=>T(c,title,W/2+o,170+o,{font:PM,weight:700,size:sz,align:'center',color:col}));
  const[o,g]=off9('parc',150,100);cover(g,S.m(0),0,0,150,100,{z:1.05});c.save();c.imageSmoothingEnabled=false;c.drawImage(o,150,260,W-300,(W-300)*100/150);c.restore();c.strokeStyle=p.ac;c.lineWidth=8;c.strokeRect(146,256,W-292,(W-300)*100/150+8);
  mono(c,'High scores',W/2,880,{align:'center',color:p.ac,size:26});pts3(x).forEach((s,i)=>{const y=960+i*76;T(c,['1ST','2ND','3RD'][i],120,y,{font:PM,weight:700,size:34,color:['#FF3CAC','#00E5FF',p.ac][i]});T(c,s.toUpperCase(),260,y,{font:PM,size:32,color:'#fff',maxW:W-380,maxLines:1})});T(c,x.cta?String(x.cta).toUpperCase():'PRESS START',W/2,1270,{font:PM,weight:700,size:46,align:'center',color:'#fff',maxW:W-120,maxLines:1})}});

/* ---------- library integration: Kathavi Collection leads the library ---------- */
const kc=TPL.filter(t=>t.kc);for(const t of kc)TPL.splice(TPL.indexOf(t),1);TPL.splice(0,0,...kc);
const fl=document.getElementById('filters');if(fl&&!fl.querySelector('[data-f=kc]')){const b=document.createElement('button');b.type='button';b.dataset.f='kc';b.setAttribute('aria-pressed','false');b.textContent='Kathavi Collection · '+kc.length;fl.prepend(b)}
const _b=buildGrid;buildGrid=function(){const f=state.filter;if(f==='kc'){const keep=TPL.slice();TPL.splice(0,TPL.length,...keep.filter(t=>t.kc));try{state.filter='rec';_b()}finally{TPL.splice(0,TPL.length,...keep);state.filter=f}}else _b()};
try{const n=TPL.length;document.querySelectorAll('.logo small,#paneT .ai p').forEach(el=>{el.textContent=el.textContent.replace(/\b1[2-9]\d\b/,String(n))})}catch(e){}
const _sc=scoreAll;scoreAll=function(){_sc();TPL.forEach(t=>{if(t.kc&&state.scores[t.id]!=null)state.scores[t.id]=Math.min(98,Math.round(state.scores[t.id]*.9+8))})};
window.KC_IDS=kc.map(t=>t.id);
})();
