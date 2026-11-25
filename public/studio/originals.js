/* Kathavi Originals — 12 reel formats first made for a real D2C brand (Iraaya) and rebuilt as
   brand-neutral templates: each customer's photos, words, logo and colours fill them. */
(()=>{
const{cover,card,kin,vignette,grad,sweep,flash,pill,brandMark,endCard,det,FA,sgBuf}=window.SGH;
const OG=(o)=>R(Object.assign({orig:true,tone:'dark',grain:.045,fit:{full:1,portrait:1,clean:1},multi:1},o));
const rr=(c,x,y,w,h,r)=>{c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,Math.max(0,Math.min(r,w/2,h/2)));else c.rect(x,y,w,h)};
const ink=col=>lumOf(col)>.55?'#141012':'#FFFFFF';
const shake=(c,amt,t)=>{if(amt>0)c.translate(Math.sin(t*97)*amt,Math.cos(t*83)*amt)};
function star(c,cx,cy,r,fill,stroke,lw=4){c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rad=i%2?r*.45:r;c.lineTo(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad)}c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke()}}
function strike(c,x,y,w,p,col,lw=10){if(p<=0)return;c.save();c.strokeStyle=col;c.lineWidth=lw;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(x+w*E.out(clamp(p)),y-6*clamp(p));c.stroke();c.restore()}
function tw(c,s,o){c.save();c.font=`${o.italic?'italic ':''}${o.weight||400} ${o.size}px ${o.font||F.man}`;if('letterSpacing' in c)c.letterSpacing=(o.ls||0)+'px';const w=c.measureText(String(s)).width;c.restore();return w}
/* silky brand-colour texture: drifting soft bands, used behind quick-cut text */
function silk(c,W,H,col,t,seed=0){c.fillStyle=col;c.fillRect(0,0,W,H);c.save();c.globalCompositeOperation='soft-light';for(let k=0;k<6;k++){const y=H*(k/5)+Math.sin(t*.9+k*1.7+seed)*140,g=c.createLinearGradient(0,y-260,0,y+260);
  g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,k%2?'rgba(255,255,255,.55)':'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.save();c.translate(W/2,y);c.rotate(-.35+Math.sin(seed+k)*.1);c.fillRect(-W,-260,W*2,520);c.restore()}c.restore();vignette(c,W,H,.45)}
function paper(c,W,H,bg,line){c.fillStyle=bg;c.fillRect(0,0,W,H);c.strokeStyle=line;c.lineWidth=1.2;c.beginPath();for(let x=0;x<=W;x+=54){c.moveTo(x+.5,0);c.lineTo(x+.5,H)}for(let y=0;y<=H;y+=54){c.moveTo(0,y+.5);c.lineTo(W,y+.5)}c.stroke()}
function tape(c,x,y,w,rot,col='rgba(240,230,200,.78)'){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle=col;c.fillRect(-w/2,-22,w,44);c.restore()}
function photoCard(c,m,cx,cy,w,h,rot,o={}){c.save();c.translate(cx,cy);c.rotate(rot);c.shadowColor='rgba(0,0,0,.28)';c.shadowBlur=40;c.shadowOffsetY=18;c.fillStyle='#fff';c.fillRect(-w/2-16,-h/2-16,w+32,h+(o.cap?120:32));c.shadowColor='transparent';
  cover(c,m,-w/2,-h/2,w,h,{z:o.z||1.05,fx:o.fx,fy:o.fy});if(o.cap)T(c,o.cap,0,h/2+70,{size:o.capSize||34,align:'center',color:'#1d1a18',weight:600,maxW:w-10});c.restore()}
const gold=ac=>lumOf(ac)<.42||rgb2hsl(...hex2rgb(ac))[1]<.25?'#E2A72E':ac;

/* 1 — Yes, I Am */
OG({id:'og-yesiam',name:'Yes, I Am',desc:'Rapid “You are…” cuts on silky brand-colour textures, a flash to your hero shot answering “Yes, I am.”, a second round, then a tag-a-friend banner.',pal:{bg:'#5E1416',fg:'#FFF4EA',ac:'#F2C14E'},dur:14,pt:4.6,hold:[3.2,10],tags:['Originals','Text on beat'],
 r(c,t,S){const{W,H,p,x}=S;const A=['Always overdressed ✨','A compliment collector',x.f1||'Main character','Fashionably late ⏰','The main character 🎬'],B=[x.f2||'Extra. Always.','A weekend planner',x.f3||'Zero regrets','Wardrobe CEO 👑','Never “just casual”'];
  const quick=(lt,arr,seed)=>{const i=Math.min(arr.length-1,Math.floor(lt/.6)),st=lt-i*.6;silk(c,W,H,i%2?mixHex(p.bg,'#000000',.25):p.bg,t,seed+i);
    T(c,'You are…',W/2,560,{font:F.cor,italic:1,weight:600,size:72,align:'center',color:rgba(p.fg,.85)});const s=1.25-.25*E.outExpo(clamp(st/.18));c.save();c.translate(W/2,960);c.scale(s,s);
    T(c,arr[i],0,0,{font:F.cor,italic:1,weight:700,size:118,align:'center',base:'middle',color:p.fg,maxW:900,alpha:clamp(st/.08)});c.restore();brandMark(c,S,W/2,1640,{size:40,color:rgba(p.fg,.8)})};
  if(t<3)quick(t,A,1);
  else if(t<7){const lt=t-3;cover(c,S.m(0),0,0,W,H,{z:kb(lt,4,1.18,1.04)});grad(c,W,H*.5,H*.5,'rgba(0,0,0,0)','rgba(0,0,0,.72)');flash(c,W,H,1-clamp(lt/.25));
    brandMark(c,S,W/2,300,{size:56,color:'#fff'});const s=1.4-.4*E.outBack(clamp((lt-.2)/.45));c.save();c.translate(W/2,1380);c.scale(s,s);T(c,'Yes, I am 💅',0,0,{font:F.cor,italic:1,weight:700,size:150,align:'center',base:'middle',color:'#fff',alpha:clamp((lt-.2)/.15),shadow:'rgba(0,0,0,.65)',sb:36});c.restore();c.fillStyle=gold(p.ac);const ul=420*E.outExpo(P(lt,.5,.5));c.fillRect(W/2-ul/2,1470,ul,8)}
  else if(t<10)quick(t-7,B,7);
  else{const lt=t-10,m=S.m(1)||S.m(0);cover(c,m,0,0,W,H,{z:kb(lt,4,1.16,1.03)});grad(c,W,H*.5,H*.5,'rgba(0,0,0,0)','rgba(0,0,0,.7)');flash(c,W,H,.8*(1-clamp(lt/.2)));brandMark(c,S,W/2,300,{size:52,color:'#fff'});
    kin(c,'Guilty as charged 🙈',W/2,1160,{t:lt,t0:.2,font:F.cor,italic:1,weight:700,size:110,maxW:940,align:'center',color:'#fff',maxLines:2,alpha:1-P(lt,1.8,.3)});
    kin(c,x.headline,W/2,1160,{t:lt,t0:2.1,font:F.cor,italic:1,weight:700,size:110,maxW:940,align:'center',color:p.ac,maxLines:2});
    const b=E.outExpo(P(lt,2.6,.6));c.save();c.translate(0,(1-b)*260);rr(c,70,1520,W-140,190,26);c.fillStyle=p.bg;c.fill();T(c,'Tag your “Yes, I am” friend 👇',W/2,1600,{size:40,weight:700,align:'center',color:p.fg,maxW:880});
    T(c,[x.cta,x.handle].filter(Boolean).join(' · '),W/2,1665,{size:30,ls:3,align:'center',color:p.ac,weight:600,maxW:880});c.restore()}}});

/* 2 — The Exhibit */
OG({id:'og-exhibit',name:'The Exhibit',desc:'Your product hung in a dark gallery: lights up, a museum placard, deadpan audio-guide close-ups, a velvet rope whose sign changes its mind, then it steps out of the frame.',pal:{bg:'#141113',fg:'#F6EFE4',ac:'#C9A35C'},dur:16,pt:3.8,hold:[4.9,12.6],tags:['Originals','Storytelling'],
 r(c,t,S){const{W,H,p,x}=S,m=S.m(0);const lights=E.inOut(P(t,.2,1.6));
  const room=()=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,mixHex(p.bg,'#000000',.2));g.addColorStop(.72,mixHex(p.bg,'#ffffff',.06));g.addColorStop(.72,mixHex(p.bg,'#000000',.45));g.addColorStop(1,'#050405');c.fillStyle=g;c.fillRect(0,0,W,H);
    c.save();c.globalAlpha=.55*lights;const s=c.createRadialGradient(W/2,820,40,W/2,860,620);s.addColorStop(0,'rgba(255,240,210,.55)');s.addColorStop(1,'rgba(255,240,210,0)');c.fillStyle=s;c.fillRect(0,0,W,H);c.restore();c.fillStyle=`rgba(0,0,0,${.75*(1-lights)})`;c.fillRect(0,0,W,H)};
  const out=E.inOut(P(t,12.8,1.1)),fw=600,fh=800,fx0=W/2,fy0=820;
  if(out<1){room();const z=t>=5&&t<9.6?(t<7.3?1+1.8*E.inOut(P(t,5,.8)):1+1.8*(1-E.inOut(P(t,9,.6)))):1;const fo=t<7.3?det[0]:det[1];
    c.save();c.globalAlpha=1-out;const sx=fw/2,sy=fh/2;c.translate(fx0,fy0);if(z>1){c.translate(-(fo[0]-.5)*fw*(z-1),-(fo[1]-.5)*fh*(z-1));c.scale(z,z)}
    c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=60;c.fillStyle=p.ac;c.fillRect(-sx-34,-sy-34,fw+68,fh+68);c.shadowColor='transparent';c.fillStyle='#0d0b0a';c.fillRect(-sx-12,-sy-12,fw+24,fh+24);cover(c,m,-sx,-sy,fw,fh,{z:1.02});c.restore();
    T(c,String(x.brand||'').toUpperCase()?`${String(x.brand).toUpperCase()} PRESENTS`:'NOW SHOWING',W/2,300,{size:30,ls:12,align:'center',color:p.fg,weight:600,alpha:P(t,1.2,.6)*(1-P(t,4.8,.3))});
    const pl=E.outExpo(P(t,2.7,.7))*(1-P(t,4.8,.3));if(pl>0){c.save();c.translate((1-pl)*500,0);rr(c,W-470,1330,400,300,8);c.fillStyle='#F4EFE6';c.fill();
      T(c,String(x.headline||'Untitled').toUpperCase(),W-440,1395,{size:30,weight:800,color:'#1b1715',maxW:340,ls:1});[['Medium',x.f1||'Mixed, mostly confidence'],['Year',x.label||'Whenever it wants'],['Edition',x.f3||'Extremely limited']].forEach(([k,v],i)=>
        T(c,`${k}: ${v}`,W-440,1455+i*46,{size:24,italic:1,color:'#4a423c',maxW:345}));c.restore()}
    const guide=(st,num,title,line)=>{const a=E.out(P(t,st,.4))*(1-P(t,st+2,.3));if(a<=0)return;c.save();c.globalAlpha=a;rr(c,70,1350,W-140,260,20);c.fillStyle='rgba(12,10,9,.86)';c.fill();
      T(c,'🎧  AUDIO GUIDE · '+num,110,1415,{size:24,ls:4,color:p.ac,weight:700});T(c,title,110,1480,{font:F.cor,italic:1,weight:700,size:54,color:'#fff',maxW:860});T(c,line,110,1545,{size:30,color:'rgba(255,255,255,.8)',maxW:860});c.restore()};
    guide(5.4,'EXHIBIT 01','The Detail',x.sub||'“Contemplating the next one already.”');guide(7.6,'EXHIBIT 02','The Finish',x.f2||'“Second most dramatic thing in the room.”');
    const rope=E.outBack(P(t,9.8,.7))*(1-P(t,12.7,.3));if(rope>0){c.save();c.globalAlpha=Math.min(1,rope);const ry=1330+(1-Math.min(1,rope))*-300;['#C9A35C'].forEach(()=>{});
      [[230,ry],[850,ry]].forEach(([px])=>{c.fillStyle=p.ac;c.fillRect(px-10,ry,20,250);c.beginPath();c.arc(px,ry,22,0,7);c.fill()});c.strokeStyle='#7A1220';c.lineWidth=16;c.beginPath();c.moveTo(240,ry+30);c.quadraticCurveTo(W/2,ry+170+Math.sin(t*4)*10,840,ry+30);c.stroke();
      rr(c,W/2-250,ry+90,500,110,10);c.fillStyle='#F4EFE6';c.fill();const sw=P(t,10.9,.5);T(c,'PLEASE DO NOT TOUCH',W/2,ry+160,{size:34,weight:800,ls:3,align:'center',color:'#1b1715',alpha:1-P(t,11.4,.2)});
      if(sw>0&&t<11.6)strike(c,W/2-210,ry+148,420,sw,'#C0242E',8);T(c,'Please, take it home 🛍️',W/2,ry+160,{size:36,weight:800,align:'center',color:'#1b1715',alpha:P(t,11.5,.3)});c.restore()}}
  if(out>0){c.save();c.globalAlpha=out;const w=fw+(W-fw)*out,h=fh+(H-fh)*out,cx=fx0+(W/2-fx0)*out,cy=fy0+(H/2-fy0)*out;cover(c,m,cx-w/2,cy-h/2,w,h,{z:1.02});c.restore();grad(c,W,H*.45,H*.55,'rgba(0,0,0,0)','rgba(0,0,0,.78)');
    brandMark(c,S,W-90,300,{size:46,align:'right',color:'#fff',alpha:P(t,13.4,.4)});kin(c,'Art that refuses to stay on the wall.',80,1430,{t,t0:13.6,anchor:'bottom',font:F.cor,italic:1,weight:700,size:104,maxW:920,color:'#fff',maxLines:3});
    pill(c,x.cta,W/2,1620,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,14.6,.5)),alpha:P(t,14.6,.2),size:36});T(c,x.handle,W/2,1740,{size:28,ls:4,align:'center',color:'rgba(255,255,255,.75)',alpha:P(t,15,.4),weight:500})}}});

/* 3 — Find the Hidden Message */
OG({id:'og-secret',name:'Find the Hidden Message',desc:'“A secret message is hidden in this photo.” A magnifier searches and misses on purpose, then the reel zooms into the spot to reveal your message and call to action.',pal:{bg:'#0E0C0D',fg:'#FFFFFF',ac:'#F2C14E'},dur:12.5,pt:9.2,hold:[1.6,9.6],tags:['Originals','Interactive'],
 r(c,t,S){const{W,H,p,x}=S,m=S.m(0);const spot=[.5,.7],msg=`you found it 👀 ${x.cta||'comment “FOUND”'}`;
  const zin=E.inOut(P(t,7.7,1.3)),zout=E.inOut(P(t,10.3,1)),Z=1+2.6*zin*(1-zout),SX=W*spot[0],SY=H*spot[1];
  c.save();c.translate(SX,SY);c.scale(Z,Z);c.translate(-SX,-SY);cover(c,m,0,0,W,H,{z:1.04});
  c.save();c.translate(SX,SY);c.rotate(-.14);c.globalCompositeOperation='multiply';T(c,msg,0,0,{font:F.cor,italic:1,weight:700,size:22,maxW:330,align:'center',base:'middle',color:'rgba(30,20,16,.9)'});c.restore();c.restore();
  grad(c,W,0,560,'rgba(0,0,0,.6)','rgba(0,0,0,0)');grad(c,W,H*.7,H*.3,'rgba(0,0,0,0)','rgba(0,0,0,.5)');
  if(t<7.6){T(c,'A secret message is',W/2,300,{font:F.cor,italic:1,weight:700,size:64,align:'center',color:'#fff',p:P(t,.2,.5),shadow:'rgba(0,0,0,.7)',sb:18});T(c,'hidden in this photo 🔍',W/2,380,{font:F.cor,italic:1,weight:700,size:64,align:'center',color:'#fff',p:P(t,.5,.5),shadow:'rgba(0,0,0,.7)',sb:18});
    const path=[[.32,.3],[.72,.42],[.4,.75],[.5,.55]],seg=1.4,k=Math.min(3,Math.floor(Math.max(0,t-1.4)/seg)),lt=Math.max(0,t-1.4)-k*seg,a=path[k],b=path[Math.min(3,k+1)],mv=E.inOut(P(lt,.7,.7));
    const fx=a[0]+(b[0]-a[0])*mv,fy=a[1]+(b[1]-a[1])*mv,cx=W*fx,cy=H*fy,r=170,on=E.outBack(P(t,1.1,.5));if(on>0){c.save();c.globalAlpha=Math.min(1,on);c.beginPath();c.arc(cx,cy,r,0,7);c.clip();
      c.translate(cx,cy);c.scale(2.2,2.2);c.translate(-cx,-cy);cover(c,m,0,0,W,H,{z:1.04});c.restore();c.save();c.globalAlpha=Math.min(1,on);c.strokeStyle='#fff';c.lineWidth=12;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();
      c.strokeStyle=p.ac;c.lineWidth=26;c.lineCap='round';c.beginPath();c.moveTo(cx+r*.72,cy+r*.72);c.lineTo(cx+r*1.35,cy+r*1.35);c.stroke();c.restore();
      if(lt<.7&&t>2.2)T(c,['nope','not here','hmm…','👀'][k],cx,cy-r-30,{size:34,weight:700,align:'center',color:'#fff',alpha:P(lt,.1,.2)*(1-P(lt,.55,.15))})}
    T(c,'Still can’t find it? 🤭',W/2,1560,{font:F.cor,italic:1,weight:700,size:72,align:'center',color:'#fff',p:P(t,6.3,.4),alpha:1-P(t,7.4,.2)})}
  if(zin>0&&zout<1){const a=Math.min(zin,1-zout);c.save();c.globalAlpha=a;c.setLineDash([18,14]);c.strokeStyle=p.ac;c.lineWidth=6;c.beginPath();c.arc(SX,SY,300,0,7);c.stroke();c.setLineDash([]);c.restore();
    pill(c,'You found it! 🎉',W/2,420,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,8.8,.5)),alpha:P(t,8.8,.2)*a,size:40})}
  if(zout>0){brandMark(c,S,W/2,300,{size:52,color:'#fff',alpha:zout});pill(c,x.cta,W/2,1600,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,11,.5)),alpha:P(t,11,.2),size:38});T(c,x.handle,W/2,1720,{size:28,ls:4,align:'center',color:'rgba(255,255,255,.8)',alpha:P(t,11.3,.4),weight:500})}}});

/* 4 — Born to… Forced to… */
OG({id:'og-bornto',name:'Born to… Forced to…',desc:'Split screen: your photo says “Born to…”, a notebook card answers “Forced to…”. Three rounds, then a plot-twist stamp.',pal:{bg:'#F6F1E7',fg:'#1A1716',ac:'#C0242E'},tone:'light',dur:14,pt:2.2,hold:[.4,12],tags:['Originals','Relatable'],
 r(c,t,S){const{W,H,p,x}=S;const R3=[['stand out','blend in on Monday calls 💻'],['make an entrance','wait for “a special occasion”'],['be noticed','save the best for later']],seg=4,i=Math.min(2,Math.floor(t/seg)),lt=t-i*seg;
  if(t<12){const sp=E.inOut(P(lt,0,.4)),half=960;c.save();c.beginPath();c.rect(0,0,W,half);c.clip();cover(c,S.m(i),(1-sp)*-W*(i%2?-1:1),0,W,half,{z:1.1+.04*lt,fx:.5,fy:.3});c.restore();grad(c,W,half-380,380,'rgba(0,0,0,0)','rgba(0,0,0,.6)');
    T(c,'Born to…',70,half-200,{size:36,weight:700,ls:3,color:'#fff',p:P(lt,.3,.3)});kin(c,R3[i][0],70,half-70,{t:lt,t0:.45,font:F.cor,italic:1,weight:700,size:100,maxW:940,color:'#fff',maxLines:2,anchor:'bottom'});
    paper(c,W,0,0,'');c.save();c.translate(0,half);const pg=c.createLinearGradient(0,0,0,H-half);pg.addColorStop(0,'#FBF8F1');pg.addColorStop(1,'#F1ECE1');c.fillStyle=pg;c.fillRect(0,0,W,H-half);c.strokeStyle='rgba(80,120,200,.25)';c.lineWidth=2;
    for(let y=120;y<H-half;y+=78){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}c.strokeStyle='rgba(200,40,50,.45)';c.beginPath();c.moveTo(130,0);c.lineTo(130,H-half);c.stroke();
    T(c,'Forced to…',170,190,{size:36,weight:700,ls:3,color:'#3b3532',p:P(lt,1.4,.3)});kin(c,R3[i][1],170,320,{t:lt,t0:1.6,font:F.cor,italic:1,weight:700,size:84,maxW:840,color:'#1d1a18',maxLines:2});
    T(c,`${i+1}/3`,W-70,90,{size:26,weight:700,align:'right',color:'#8a817a'});c.restore();brandMark(c,S,W/2,1830,{size:34,color:'#6b625c'})}
  else{const lt=t-12;cover(c,S.m(0),0,0,W,H,{z:kb(lt,2,1.15,1.05)});grad(c,W,H*.4,H*.6,'rgba(0,0,0,0)','rgba(0,0,0,.72)');flash(c,W,H,1-clamp(lt/.2));
    const s=2-E.outBack(P(lt,.15,.35));c.save();c.translate(W/2,820);c.rotate(-.12);c.scale(s,s);c.globalAlpha=P(lt,.15,.1);c.strokeStyle=p.ac;c.lineWidth=12;rr(c,-330,-110,660,220,18);c.stroke();T(c,'PLOT TWIST',0,32,{font:FA,size:120,ls:6,align:'center',color:p.ac});c.restore();
    kin(c,'Wear it anyway.',W/2,1260,{t:lt,t0:.5,font:F.cor,italic:1,weight:700,size:120,maxW:940,align:'center',color:'#fff',maxLines:2});pill(c,x.cta,W/2,1520,{bg:p.ac,fg:'#fff',s:E.outBack(P(lt,1,.4)),alpha:P(lt,1,.2),size:36});brandMark(c,S,W/2,300,{size:50,color:'#fff'})}}});

/* 5 — Yes… But… */
OG({id:'og-yesbut',name:'Yes… But…',desc:'Split screen with a honest “YES… BUT…”, then the BUT is crossed out and becomes “AND it can be yours”.',pal:{bg:'#111012',fg:'#FFFFFF',ac:'#B9FA70'},dur:11,pt:7.6,hold:[.5,8.6],tags:['Originals','Relatable'],
 r(c,t,S){const{W,H,p,x}=S,half=980;c.fillStyle=p.bg;c.fillRect(0,0,W,H);
  c.save();c.beginPath();c.rect(0,0,W,half);c.clip();cover(c,S.m(0),0,0,W,half,{z:kb(t,11,1.15,1.03)});c.restore();grad(c,W,half-460,460,'rgba(0,0,0,0)','rgba(0,0,0,.8)');
  T(c,'YES,',70,half-210,{font:FA,size:110,ls:3,color:'#fff',p:P(t,.3,.35),shadow:'rgba(0,0,0,.6)',sb:20});kin(c,x.headline,70,half-70,{t,t0:.6,font:F.cor,italic:1,weight:700,size:86,maxW:940,color:'#fff',maxLines:2,anchor:'bottom'});
  c.save();c.translate(0,half);c.fillStyle=mixHex(p.bg,'#ffffff',.06);c.fillRect(0,0,W,H-half);
  const b=S.m(1);if(b){c.save();c.globalAlpha=.35;cover(c,b,0,0,W,H-half,{z:1.2,filter:'grayscale(1) contrast(1.1)'});c.restore();c.fillStyle='rgba(10,10,12,.55)';c.fillRect(0,0,W,H-half)}
  const sw=P(t,5.6,.5),bw=tw(c,'BUT',{font:FA,size:110,ls:3});T(c,'BUT',70,220,{font:FA,size:110,ls:3,color:'#fff',p:P(t,2.6,.35),alpha:1-P(t,6.3,.2)});if(t<6.35)strike(c,60,182,bw+30,sw,p.ac,14);
  T(c,'AND',70,220,{font:FA,size:110,ls:3,color:p.ac,p:P(t,6.3,.35)});
  kin(c,'now everything else feels ordinary.',70,360,{t,t0:3,font:F.cor,italic:1,weight:700,size:80,maxW:940,color:'#fff',maxLines:2,alpha:1-P(t,6.2,.25)});
  kin(c,'it can be yours.',70,360,{t,t0:6.5,font:F.cor,italic:1,weight:700,size:96,maxW:940,color:'#fff',maxLines:2});
  pill(c,x.cta,W/2,640,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,7.4,.45)),alpha:P(t,7.4,.2),size:36});T(c,x.handle,W/2,770,{size:28,ls:4,align:'center',color:'rgba(255,255,255,.7)',alpha:P(t,7.8,.4),weight:500});c.restore();
  brandMark(c,S,W/2,250,{size:46,color:'#fff',alpha:P(t,.2,.5)})}});

/* 6 — Gold Star Behaviour */
OG({id:'og-goldstar',name:'Gold Star Behaviour',desc:'A sticker chart on grid paper: taped photo cards slide in and earn a shiny gold star each, the chart fills, then a bonus round earns three.',pal:{bg:'#F7F2E8',fg:'#1D1A18',ac:'#E2A72E'},tone:'light',dur:17,pt:6.2,hold:[1.2,13],tags:['Originals','Trend format'],
 r(c,t,S){const{W,H,p,x}=S;paper(c,W,H,p.bg,'rgba(60,90,140,.10)');const habits=['Chose quality over quantity','Got three compliments before noon','Wore the good one on a Tuesday','Didn’t wait for a sale','Treated themselves. Zero guilt.'];
  T(c,'Gold star behaviour ⭐',W/2,210,{font:F.cor,italic:1,weight:700,size:84,align:'center',color:p.fg,p:P(t,.1,.5)});T(c,`The ${x.brand||'brand'} chart`.toUpperCase(),W/2,280,{size:26,ls:8,align:'center',color:'#8a8077',weight:700,p:P(t,.3,.5)});
  const seg=2.1,start=.9,done=k=>t>=start+k*seg+1.15;for(let k=0;k<5;k++){const cx=W/2-2*150+k*150,cy=390;star(c,cx,cy,48,done(k)?gold(p.ac):null,done(k)?mixHex(gold(p.ac),'#000000',.25):'#b8afa5',4);
    if(done(k)){const pp=E.outBack(P(t,start+k*seg+1.15,.35));c.save();c.translate(cx,cy);c.scale(pp,pp);star(c,0,0,48,gold(p.ac),mixHex(gold(p.ac),'#000000',.25),4);c.restore()}}
  const bonus=t>=start+5*seg+.2;if(!bonus){const k=Math.min(4,Math.max(0,Math.floor((t-start)/seg))),lt=t-start-k*seg;if(t>=start){const in_=E.outExpo(P(lt,0,.5)),outp=E.inOut(P(lt,seg-.35,.35));
      const cx=W/2+(1-in_)*W-outp*W*1.1,rot=(k%2?.04:-.05);photoCard(c,S.m(k),cx,960,600,720,rot,{cap:habits[k],capSize:36,fx:.5,fy:.35});tape(c,cx-200,560,170,-.3);tape(c,cx+200,560,170,.28);
      const sp=P(lt,1.1,.3);if(sp>0){const s=2.4-1.4*E.outBack(sp);c.save();c.translate(cx+250,690);c.rotate(.2);c.scale(s,s);c.globalAlpha=Math.min(1,sp*3);star(c,0,0,90,gold(p.ac),'#fff',8);c.restore()}}}
  else{const lt=t-(start+5*seg+.2);const in_=E.outBack(P(lt,0,.6));photoCard(c,S.m(0),W/2,1000,620,740,-.03,{cap:'Bought it before it sold out',capSize:36,fx:.5,fy:.3,z:1.05+0*in_});
    pill(c,'BONUS ROUND 👀',W/2,560,{bg:p.fg,fg:'#fff',s:E.outBack(P(lt,.2,.4)),alpha:P(lt,.2,.2),size:32});for(let s2=0;s2<3;s2++){const sp=P(lt,.8+s2*.35,.3);if(sp<=0)continue;const s=2.2-1.2*E.outBack(sp);c.save();c.translate(W/2+160+s2*95,690+s2*40);c.rotate(.2);c.scale(s,s);star(c,0,0,70,gold(p.ac),'#fff',7);c.restore()}
    const b=E.outExpo(P(lt,2,.6));if(b>0){c.save();c.translate(0,(1-b)*300);rr(c,60,1560,W-120,210,24);c.fillStyle=lumOf(p.fg)<.3?p.fg:'#1D1A18';c.fill();T(c,'Certified gold star 🏅',W/2,1645,{font:F.cor,italic:1,weight:700,size:58,align:'center',color:gold(p.ac)});
      T(c,[x.cta,x.handle].filter(Boolean).join(' · '),W/2,1715,{size:30,ls:3,align:'center',color:'#fff',weight:600,maxW:880});c.restore()}}
  if(!bonus)brandMark(c,S,W/2,1800,{size:36,color:'#6b625c'})}});

/* 7 — The One-of-One Edit */
OG({id:'og-oneofone',name:'The One-of-One Edit',desc:'A full-screen photo with a strip of thumbnails; a frame steps along the strip with a shutter flash and the background follows it, ending on “one of one”.',pal:{bg:'#0E0D0F',fg:'#FFFFFF',ac:'#E8C07A'},dur:13,pt:4.4,hold:[1.6,9.6],tags:['Originals','Carousel'],multi:3,
 r(c,t,S){const{W,H,p,x}=S;const n=Math.max(3,Math.min(6,S.n||4)),step=1.35,s0=1.2,k=Math.max(0,Math.min(n-1,Math.floor((t-s0)/step))),lt=t-s0-k*step;
  if(t<10.4){cover(c,S.m(k),0,0,W,H,{z:1.12-.06*clamp(lt/step)});if(k>0&&lt<.35){c.save();c.globalAlpha=1-lt/.35;cover(c,S.m(k-1),0,0,W,H,{z:1.06});c.restore()}grad(c,W,H*.55,H*.45,'rgba(0,0,0,0)','rgba(0,0,0,.7)');grad(c,W,0,420,'rgba(0,0,0,.5)','rgba(0,0,0,0)');
    flash(c,W,H,t>s0?.5*(1-clamp(lt/.12)):0);T(c,(x.label||'The edit').toUpperCase(),W/2,280,{size:28,ls:10,align:'center',color:'#fff',weight:700,p:P(t,.2,.5)});
    const th=210,tw2=150,g=18,tot=n*tw2+(n-1)*g,x0=W/2-tot/2,y0=1400,strip=E.outExpo(P(t,.4,.7));for(let i=0;i<n;i++){const xx=x0+i*(tw2+g),yy=y0+(1-strip)*200;c.save();c.globalAlpha=strip*(i===k&&t>=s0?1:.75);rr(c,xx,yy,tw2,th,10);c.clip();cover(c,S.m(i),xx,yy,tw2,th,{z:1.1});c.restore()}
    if(t>=s0){const fx=x0+k*(tw2+g)-(1-E.outExpo(clamp(lt/.3)))*(tw2+g)*(k>0?1:0);c.strokeStyle='#fff';c.lineWidth=6;rr(c,fx-10,y0-10,tw2+20,th+20,14);c.stroke();
      T(c,`No. ${String(k+1).padStart(2,'0')}`,W/2,1720,{size:30,ls:6,align:'center',color:p.ac,weight:700,p:P(lt,.1,.3)})}
    brandMark(c,S,W/2,1830,{size:34,color:'rgba(255,255,255,.85)'})}
  else{const lt=t-10.4;cover(c,S.m(0),0,0,W,H,{z:kb(lt,2.6,1.14,1.04)});flash(c,W,H,.7*(1-clamp(lt/.2)));grad(c,W,H*.4,H*.6,'rgba(0,0,0,0)','rgba(0,0,0,.75)');
    kin(c,'One of one.',W/2,1180,{t:lt,t0:.2,font:F.cor,italic:1,weight:700,size:150,maxW:940,align:'center',color:'#fff',maxLines:1});T(c,x.headline,W/2,1290,{size:38,align:'center',color:'rgba(255,255,255,.88)',maxW:880,p:P(lt,.7,.4)});
    pill(c,x.cta,W/2,1480,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(lt,1.1,.4)),alpha:P(lt,1.1,.2),size:36});brandMark(c,S,W/2,300,{size:52,color:'#fff'})}}});

/* 8 — Rethought */
OG({id:'og-rethought',name:'Rethought',desc:'An infographic story: “as usual” is crossed out for “rethought”, the old perceptions strike through one by one, then your product answers them with three ticks.',pal:{bg:'#1C1C1C',fg:'#F2E9DA',ac:'#C9A96E'},dur:14,pt:6.2,hold:[3.6,10.6],tags:['Originals','Infographic'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.globalAlpha=.06;c.strokeStyle=p.ac;c.lineWidth=2;for(let yy=-60;yy<H+60;yy+=120)for(let xx=-60;xx<W+60;xx+=120){c.beginPath();c.moveTo(xx,yy-40);c.lineTo(xx+40,yy);c.lineTo(xx,yy+40);c.lineTo(xx-40,yy);c.closePath();c.stroke()}c.restore();
  const sc=t<4?0:t<8?1:t<11?2:3;T(c,`${String(sc+1).padStart(2,'0')} / 04`,W-80,180,{size:24,ls:6,align:'right',color:p.ac,weight:700});c.fillStyle=rgba(p.fg,.15);c.fillRect(80,215,W-160,3);c.fillStyle=p.ac;c.fillRect(80,215,(W-160)*clamp(t/14),3);brandMark(c,S,80,180,{size:32,align:'left',color:p.fg});
  if(sc===0){T(c,'Shopping,',80,820,{font:F.cor,italic:1,weight:700,size:130,color:p.fg,p:P(t,.2,.5)});const w=tw(c,'as usual.',{font:F.cor,italic:1,weight:700,size:130});T(c,'as usual.',80,960,{font:F.cor,italic:1,weight:700,size:130,color:rgba(p.fg,.6),p:P(t,.6,.5)});
    strike(c,70,915,w+20,P(t,1.6,.5),p.ac,12);T(c,'rethought.',80,1110,{font:F.cor,italic:1,weight:700,size:140,color:p.ac,p:P(t,2.2,.5)})}
  if(sc===1){const lt=t-4;T(c,'How people see it',80,520,{size:30,ls:6,upper:1,color:p.ac,weight:700,p:P(lt,0,.4)});['💸  Expensive','🏛️  Complicated','🔒  Out of reach'].forEach((s,i)=>{const a=E.outExpo(P(lt,.4+i*.5,.5)),y=640+i*240;if(a<=0)return;c.save();c.translate((1-a)*-200,0);c.globalAlpha=a;
      rr(c,80,y,W-160,190,20);c.fillStyle=rgba(p.fg,.07);c.fill();c.strokeStyle=rgba(p.fg,.2);c.lineWidth=2;c.stroke();T(c,s,130,y+120,{size:62,weight:700,color:p.fg});c.restore();strike(c,120,y+98,W-280,P(lt,2.3+i*.3,.4),p.ac,10)})}
  if(sc===2){const lt=t-8;cover(c,S.m(0),80,420,W-160,820,{z:kb(lt,3,1.12,1.02)});c.strokeStyle=p.ac;c.lineWidth=2;c.strokeRect(80,420,W-160,820);kin(c,x.headline,80,1360,{t:lt,t0:.3,font:F.cor,italic:1,weight:700,size:84,maxW:920,color:p.fg,maxLines:2});
    [x.f1,x.f2,x.f3].filter(Boolean).forEach((s,i)=>{const a=P(lt,1+i*.4,.4);if(a<=0)return;c.fillStyle=p.ac;c.beginPath();c.arc(104,1540+i*80,22,0,7);c.fill();T(c,'✓',104,1551+i*80,{size:28,weight:800,align:'center',color:p.bg});T(c,s,150,1552+i*80,{size:38,weight:600,color:p.fg,p:a})})}
  if(sc===3)endCard(c,S,t,11)}});

/* 9 — Cinematic Film */
OG({id:'og-cinematic',name:'Cinematic Film',desc:'A slow, classy brand film: wordmark opening, gentle push-ins across your photos with film grain and serif subtitles, closing on your tagline.',pal:{bg:'#0B0908',fg:'#F5EDE0',ac:'#C9A96E'},dur:15,pt:5,hold:[2.2,12.4],tags:['Originals','Cinematic'],grain:.09,multi:3,
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const subs=[x.sub,x.f1,x.f2,x.f3].filter(Boolean),n=Math.max(1,Math.min(4,S.n||3));
  if(t<2.4){brandMark(c,S,W/2,H/2,{size:90,color:p.fg,alpha:E.out(P(t,.3,.9))*(1-P(t,2,.4))});c.fillStyle=p.ac;const lw=240*E.outExpo(P(t,.8,1));c.fillRect(W/2-lw/2,H/2+90,lw,2)}
  if(t>=2&&t<12.8){const lt=t-2,seg=10.8/n,i=Math.min(n-1,Math.floor(lt/seg)),st=lt-i*seg,fo=[[.5,.35],[.45,.55],[.55,.4],[.5,.6]][i];
    c.save();c.globalAlpha=E.out(P(lt,0,.8));cover(c,S.m(i),0,0,W,H,{z:1.18-.1*(st/seg),fx:fo[0],fy:fo[1],px:(i%2?-1:1)*(st/seg-.5)*60,filter:'contrast(1.08) saturate(.9) sepia(.06)'});c.restore();
    if(i>0&&st<.8){c.save();c.globalAlpha=1-st/.8;cover(c,S.m(i-1),0,0,W,H,{z:1.08,filter:'contrast(1.08) saturate(.9) sepia(.06)'});c.restore()}
    vignette(c,W,H,.65);grad(c,W,H*.62,H*.38,'rgba(0,0,0,0)','rgba(0,0,0,.7)');const s=subs[i%Math.max(1,subs.length)]||'';T(c,s,W/2,1600,{font:F.cor,italic:1,weight:600,size:56,align:'center',color:p.fg,maxW:900,alpha:P(st,.4,.5)*(1-P(st,seg-.5,.4)),shadow:'rgba(0,0,0,.8)',sb:14});
    brandMark(c,S,W/2,250,{size:40,color:rgba(p.fg,.85)})}
  if(t>=12.4){const lt=t-12.4;c.fillStyle=p.bg;c.globalAlpha=E.out(P(lt,0,.6));c.fillRect(0,0,W,H);c.globalAlpha=1;brandMark(c,S,W/2,860,{size:84,color:p.fg,alpha:P(lt,.3,.6)});
    T(c,x.headline,W/2,1000,{font:F.cor,italic:1,weight:600,size:60,align:'center',color:p.ac,maxW:900,p:P(lt,.8,.6)});T(c,x.handle,W/2,1100,{size:26,ls:6,align:'center',color:rgba(p.fg,.7),weight:500,p:P(lt,1.2,.6)})}}});

/* 10 — The Effect */
OG({id:'og-effect',name:'The Effect',desc:'Before/after with attitude: a cool, flat “before”, cheeky lines, then a fabric sweep built from your product photo crosses the screen on the drop to reveal the “after”.',pal:{bg:'#0D0C0E',fg:'#FFFFFF',ac:'#E3B04B'},dur:12,pt:6,hold:[2.6,8.6],tags:['Originals','Before / after'],multi:2,
 r(c,t,S){const{W,H,p,x}=S;const A=S.m(1)||S.m(0),B=S.m(0),sw=P(t,4,.9),e=E.inOut(sw);const brand=String(x.brand||'IT').toUpperCase();
  const bump=t>4.6&&t<5.4?(1-P(t,4.6,.8))*14:0;c.save();shake(c,bump,t);
  cover(c,A,0,0,W,H,{z:1.12+.03*t,filter:'grayscale(.75) contrast(.95) brightness(.85) hue-rotate(160deg) saturate(.4)'});
  if(e>0){const X=W*1.3*e-W*.15;c.save();c.beginPath();c.moveTo(0,0);c.lineTo(X+260,0);c.lineTo(X-260,H);c.lineTo(0,H);c.closePath();c.clip();cover(c,B,0,0,W,H,{z:1.1-.04*e,filter:'contrast(1.08) saturate(1.12)'});c.restore();
    if(sw<1){c.save();c.beginPath();c.moveTo(X+260,0);c.lineTo(X+420,0);c.lineTo(X-100,H);c.lineTo(X-260,H);c.closePath();c.clip();cover(c,B,X-200,0,520,H,{z:3,fx:.55,fy:.6});c.globalCompositeOperation='screen';c.fillStyle='rgba(255,230,180,.25)';c.fillRect(0,0,W,H);c.restore()}}
  c.restore();flash(c,W,H,t>4.55&&t<5?.85*(1-P(t,4.55,.45)):0);grad(c,W,H*.5,H*.5,'rgba(0,0,0,0)','rgba(0,0,0,.65)');
  const L=(s,t0,t1,y,col)=>{const a=P(t,t0,.25)*(1-P(t,t1,.2));if(a<=0)return;const s2=1.2-.2*E.outExpo(P(t,t0,.3));c.save();c.translate(W/2,y);c.scale(s2,s2);T(c,s,0,0,{font:FA,size:104,ls:3,align:'center',base:'middle',color:col||'#fff',alpha:a,maxW:960});c.restore()};
  L('THE OLD LOOK',.3,1.9,1240);L('HAD THE MIC.',.8,1.9,1360,p.ac);L(`THEN ${brand.length>14?'THIS':brand}`,2.1,3.9,1240);L('INTERRUPTED.',2.6,3.9,1360,p.ac);
  L(String(x.headline||'').toUpperCase(),5.2,8.2,1300,'#fff');
  kin(c,'Same you. New energy.',W/2,1240,{t,t0:8.5,font:F.cor,italic:1,weight:700,size:110,maxW:940,align:'center',color:'#fff',maxLines:2,alpha:1-P(t,10.6,.3)});
  pill(c,x.cta,W/2,1520,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(t,9.3,.4)),alpha:P(t,9.3,.2)*(1-P(t,10.6,.3)),size:36});brandMark(c,S,W/2,300,{size:48,color:'#fff',alpha:P(t,4.8,.5)});endCard(c,S,t,10.7)}});

/* 11 — Big News */
OG({id:'og-bignews',name:'Big News',desc:'A playful announcement: googly eyes peek in with “Psst…”, the headline lands with a screen shake, a number rolls like a slot machine, and a warm thank-you closes it.',pal:{bg:'#F5EFE4',fg:'#1D1A18',ac:'#8E1B23'},tone:'light',dur:15,pt:3.6,hold:[5.5,11],tags:['Originals','Announcement'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);c.save();c.strokeStyle=rgba(p.ac,.35);c.lineWidth=3;c.strokeRect(40,40,W-80,H-80);c.restore();
  const sh=t>2.6&&t<4.6?Math.max(0,1-((t-2.6)%.7)/.35)*16:0;c.save();shake(c,sh,t);
  if(t<2.6){const up=E.outBack(P(t,.2,.6));const eye=(ex,ey)=>{c.fillStyle='#fff';c.strokeStyle=p.fg;c.lineWidth=6;c.beginPath();c.arc(ex,ey,70,0,7);c.fill();c.stroke();const lx=Math.sin(t*3)*24;c.fillStyle=p.fg;c.beginPath();c.arc(ex+lx,ey+10,30,0,7);c.fill()};
    c.save();c.translate(0,(1-up)*400);eye(W/2-90,1640);eye(W/2+90,1640);c.restore();T(c,'Psst…',W/2,820,{font:F.cor,italic:1,weight:700,size:180,align:'center',color:p.fg,p:P(t,.5,.5)});T(c,'yes, you.',W/2,960,{size:44,weight:600,align:'center',color:p.ac,p:P(t,1.2,.5)})}
  else if(t<5.2){const L=['We have news.','Big news.','Really big news.'];L.forEach((s,i)=>{const a=P(t,2.6+i*.7,.15);if(a<=0)return;T(c,s,W/2,700+i*190,{font:F.cor,italic:1,weight:700,size:i===2?120:100,align:'center',color:i===2?p.ac:p.fg,alpha:a})})}
  c.restore();
  if(t>=5.2&&t<8.6){const lt=t-5.2;cover(c,S.m(0),110,320,W-220,880,{z:kb(lt,3.4,1.12,1.02)});c.strokeStyle=p.ac;c.lineWidth=3;c.strokeRect(110,320,W-220,880);kin(c,x.headline,W/2,1380,{t:lt,t0:.3,font:F.cor,italic:1,weight:700,size:96,maxW:900,align:'center',color:p.fg,maxLines:2});
    const ul=500*E.outExpo(P(lt,1,.6));c.fillStyle=p.ac;c.fillRect(W/2-ul/2,1440,ul,6);T(c,x.sub,W/2,1540,{size:36,align:'center',color:'#4a443f',maxW:860,p:P(lt,1.3,.5)})}
  if(t>=8.6&&t<11.4){const lt=t-8.6,mt=String(x.label||'').match(/\d{2,4}/),target=mt?mt[0]:'NEW',rollP=E.out(P(lt,.3,1.6));T(c,'Mark the date',W/2,560,{size:30,ls:8,upper:1,align:'center',color:p.ac,weight:700,p:P(lt,0,.4)});
    const ch=target.split(''),cw=170,x0=W/2-(ch.length*cw)/2;ch.forEach((d,i)=>{const bx=x0+i*cw,by=760;rr(c,bx+8,by,cw-16,300,18);c.fillStyle=p.fg;c.fill();c.save();rr(c,bx+8,by,cw-16,300,18);c.clip();const done=rollP>=.999||lt>.3+1.6*(.55+i*.12);
      const spin=done?0:(lt*30+i*7)%10;const show=done?d:(/\d/.test(d)?String(Math.floor(spin)):String.fromCharCode(65+Math.floor(spin*2.5)%26));T(c,show,bx+cw/2,by+150,{font:FA,size:200,align:'center',base:'middle',color:p.bg});c.restore()});
    T(c,x.label,W/2,1200,{size:40,weight:600,align:'center',color:p.fg,p:P(lt,1.9,.4),maxW:900})}
  if(t>=11.4){const lt=t-11.4;brandMark(c,S,W/2,640,{size:90,color:p.fg,alpha:P(lt,0,.5)});kin(c,'Thank you for being here.',W/2,880,{t:lt,t0:.3,font:F.cor,italic:1,weight:700,size:92,maxW:900,align:'center',color:p.fg,maxLines:2});
    pill(c,x.cta,W/2,1180,{bg:p.ac,fg:ink(p.ac),s:E.outBack(P(lt,1,.4)),alpha:P(lt,1,.2),size:36});T(c,x.handle,W/2,1300,{size:28,ls:4,align:'center',color:'#5a534d',p:P(lt,1.3,.4),weight:500});
    const dots='.'.repeat(1+Math.floor(lt*3)%3);T(c,'More soon'+dots,W/2,1600,{size:30,ls:6,upper:1,align:'center',color:p.ac,weight:700,alpha:P(lt,1.6,.4)})}}});

/* 12 — Detail Story */
OG({id:'og-detail',name:'Detail Story',desc:'An art-film look at one image: four close-ups, each with a short line that changes how you see it, then a slow pull-back to the whole piece in a fine gallery frame.',pal:{bg:'#0F0D0C',fg:'#F7F0E4',ac:'#C9A96E'},dur:14,pt:10.6,hold:[1,9.6],tags:['Originals','Storytelling'],grain:.07,
 r(c,t,S){const{W,H,p,x}=S,m=S.m(0);const pts=[[.5,.22],[.35,.5],[.62,.7],[.5,.42]],lines=['Look closer.',x.f1||'Every detail has a reason.',x.f2||'Made to be noticed.','Every detail, intentional.'],seg=2.4;
  if(t<9.6){const i=Math.min(3,Math.floor(t/seg)),st=t-i*seg,[fx,fy]=pts[i];c.fillStyle='#000';c.fillRect(0,0,W,H);c.save();c.globalAlpha=E.out(P(st,0,.6));cover(c,m,0,0,W,H,{z:2.6-.25*(st/seg),fx,fy,filter:i===0?`blur(${(1-E.out(P(st,0,1)))*8}px)`:'contrast(1.06)'});c.restore();
    vignette(c,W,H,.6);grad(c,W,H*.65,H*.35,'rgba(0,0,0,0)','rgba(0,0,0,.65)');T(c,lines[i],W/2,1600,{font:F.cor,italic:1,weight:600,size:64,align:'center',color:p.fg,maxW:900,alpha:P(st,.5,.5)*(1-P(st,seg-.4,.35)),shadow:'rgba(0,0,0,.8)',sb:14});
    T(c,`0${i+1}`,90,300,{size:26,ls:6,color:p.ac,weight:700,alpha:.9})}
  else{const lt=t-9.6,pb=E.inOut(P(lt,0,1.8));c.fillStyle=p.bg;c.fillRect(0,0,W,H);const fw=W-(W-760)*pb,fh=H-(H-1010)*pb,fx2=W/2-fw/2,fy2=860-fh/2*(pb)-(H/2-fh/2)*(1-pb)*0;const cy=H/2+(860-H/2)*pb;
    cover(c,m,W/2-fw/2,cy-fh/2,fw,fh,{z:1.6-.6*pb,fx:.5,fy:.42});if(pb>.6){c.save();c.globalAlpha=(pb-.6)/.4;c.strokeStyle=p.ac;c.lineWidth=2;c.strokeRect(W/2-fw/2-24,cy-fh/2-24,fw+48,fh+48);c.restore()}
    T(c,x.headline,W/2,1490,{font:F.cor,italic:1,weight:600,size:72,align:'center',color:p.fg,maxW:900,p:P(lt,1.6,.6)});brandMark(c,S,W/2,1600,{size:40,color:rgba(p.fg,.85),alpha:P(lt,2,.5)});T(c,x.handle,W/2,1690,{size:26,ls:6,align:'center',color:rgba(p.fg,.6),weight:500,p:P(lt,2.3,.5)})}}});

/* ---------- library integration ---------- */
const og=TPL.filter(t=>t.orig);for(const t of og)TPL.splice(TPL.indexOf(t),1);const after=TPL.filter(t=>t.sig||t.lab).length;TPL.splice(after,0,...og);
const fl=document.getElementById('filters');if(fl){const b=document.createElement('button');b.type='button';b.dataset.f='orig';b.setAttribute('aria-pressed','false');b.textContent='Originals · '+og.length;const prev=fl.querySelector('[data-f=lab]')||fl.querySelector('[data-f=sig]');prev?prev.after(b):fl.prepend(b)}
const _b=buildGrid;buildGrid=function(){const f=state.filter;if(f==='orig'){const keep=TPL.slice();TPL.splice(0,TPL.length,...keep.filter(t=>t.orig));try{state.filter='reel';_b()}finally{TPL.splice(0,TPL.length,...keep);state.filter=f}}else _b()};
try{const n=TPL.length;document.querySelectorAll('.logo small,#paneT .ai p').forEach(el=>{el.textContent=el.textContent.replace(/\b1[2-4]\d\b/,String(n))})}catch(e){}
const _sc=scoreAll;scoreAll=function(){_sc();TPL.forEach(t=>{if(t.orig&&state.scores[t.id]!=null)state.scores[t.id]=Math.min(97,state.scores[t.id]+10)})};
})();
