/* Kathavi Trend Lab — 12 original reels in the 2026 short-form styles:
   velocity ramps, swipe transitions, liquid glass, stacked splits, cutout collage, chrome, bold minimalism,
   dreamy slow-mo, transformation reveal, multi-clip rush, kinetic type, parallax depth. Original designs. */
(()=>{
const{cover,card,kin,vignette,grad,sweep,flash,pill,brandMark,priceTag,endCard,det,words,FA,sgBuf,fnt}=window.SGH;
const LAB=(o)=>R(Object.assign({lab:true,tone:'dark',grain:.04,fit:{full:1,portrait:1,clean:1},multi:1},o));
const seeded=(n,s)=>{const o=[];for(let i=0;i<n;i++){s=(s*9301+49297)%233280;o.push(s/233280)}return o};
function zoomBlur(c,m,W,H,z,amt,fx,fy){cover(c,m,0,0,W,H,{z,fx,fy});if(amt<=.02)return;c.save();for(let i=1;i<=5;i++){c.globalAlpha=.16*amt;cover(c,m,0,0,W,H,{z:z*(1+i*.045*amt),fx,fy})}c.restore()}
function dirBlur(c,m,W,H,dx,o){cover(c,m,0,0,W,H,{...o,px:(o.px||0)+dx});const a=Math.min(1,Math.abs(dx)/200);if(a<.05)return;c.save();for(let i=1;i<=4;i++){c.globalAlpha=.18*a;cover(c,m,0,0,W,H,{...o,px:(o.px||0)+dx-Math.sign(dx)*i*40})}c.restore()}
function rrect(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,Math.max(0,Math.min(r,w/2,h/2)));else c.rect(x,y,w,h)}
function slam(c,str,x,y,o){const p=clamp((o.t-(o.t0||0))/(o.d||.28));if(p<=0||!str)return;const s=1+(1-E.outExpo(p))*.7;c.save();c.translate(x,y);c.scale(s,s);
  T(c,String(str).toUpperCase(),0,0,{font:FA,weight:400,size:o.size,ls:2,align:'center',base:'middle',color:o.color,alpha:Math.min(1,p*2)*(o.alpha??1),maxW:o.maxW||960,maxLines:o.maxLines||2,lh:.95});c.restore()}

/* 1 — Velocity Ramp */
LAB({id:'tl-velocity',name:'Velocity Ramp',desc:'Speed-ramped zooms that crawl, then burst on the beat with zoom blur, one headline word slamming in per hit.',pal:{bg:'#0A0A0B',fg:'#FFFFFF',ac:'#FF4D2E'},dur:9,pt:2.1,hold:[4.6,6.7],tags:['Trend Lab','Speed ramp'],
 r(c,t,S){const{W,H,p,x}=S;const ws=words(x.headline).slice(0,4);const n=Math.max(1,ws.length),seg=4.8/n;
  if(t<4.8){const i=Math.floor(t/seg),lt=t-i*seg,ramp=Math.pow(clamp((lt-(seg-.45))/.45),3),[fx,fy]=det[i%4];
    zoomBlur(c,S.m(i),W,H,1.08+.04*lt+ramp*.9,ramp,fx,fy);grad(c,W,H*.5,H*.5,'rgba(0,0,0,0)','rgba(0,0,0,.55)');flash(c,W,H,.85*(1-clamp(lt/.1)));
    slam(c,ws[i],W/2,H*.62,{t:lt,size:260,color:'#fff'});c.fillStyle=p.ac;c.fillRect(W/2-60,H*.62+150,120*E.outExpo(clamp(lt/.4)),10);
    T(c,`${i+1}/${n}`,W-90,300,{size:28,ls:4,align:'right',color:'#fff',weight:700})}
  else{const lt=t-4.8;cover(c,S.m(0),0,0,W,H,{z:1.25-.1*E.outExpo(clamp(lt/1.4))});flash(c,W,H,1-clamp(lt/.25));grad(c,W,H*.45,H*.55,'rgba(0,0,0,0)','rgba(0,0,0,.75)');
    kin(c,x.headline,80,1450,{t:lt,t0:.2,font:FA,weight:400,ls:2,size:150,maxW:920,color:'#fff',anchor:'bottom',maxLines:3});T(c,x.sub,82,1540,{size:36,color:'rgba(255,255,255,.88)',maxW:860,p:clamp((lt-.6)/.5)})}
  endCard(c,S,t,6.8)}});

/* 2 — Swipe Cut */
LAB({id:'tl-swipe',name:'Swipe Cut',desc:'Camera-swipe transitions with motion blur carry you between looks, with a sliding caption strip.',pal:{bg:'#111012',fg:'#FFFFFF',ac:'#E7C48A'},dur:9,pt:1.6,hold:[.3,6.6],tags:['Trend Lab','Fashion transitions'],
 r(c,t,S){const{W,H,p,x}=S;const shots=[[0,.5,.35,1.15],[1,.5,.5,1.1],[2,.5,.6,1.12],[0,.5,.3,1.6]],seg=1.65,labs=[x.f1,x.f2,x.f3,x.label];
  if(t<6.6){const i=Math.min(3,Math.floor(t/seg)),lt=t-i*seg,sw=clamp((lt-(seg-.3))/.3),e=E.inOut(sw),dir=i%2?-1:1,[mi,fx,fy,z]=shots[i];
    dirBlur(c,S.m(mi),W,H,-dir*e*W*1.1,{z:z+.03*lt,fx,fy});if(sw>0){const[mj,fx2,fy2,z2]=shots[(i+1)%4];c.save();c.beginPath();c.rect(dir>0?W*(1-e*1.1):-W*.1,0,W*e*1.1+2,H);c.clip();dirBlur(c,S.m(mj),W,H,dir*(1-e)*W,{z:z2,fx:fx2,fy:fy2});c.restore()}
    grad(c,W,H*.6,H*.4,'rgba(0,0,0,0)','rgba(0,0,0,.6)');const lp=E.outExpo(clamp(lt/.5))*(1-sw);c.save();c.globalAlpha=lp;c.fillStyle=p.ac;c.fillRect(0,1380,(W-160)*lp,120);c.restore();
    T(c,String(labs[i]||'').toUpperCase(),90,1462,{font:FA,weight:400,size:66,ls:3,color:'#141012',alpha:lp,maxW:W-260});T(c,'0'+(i+1),W-90,1462,{font:FA,size:66,align:'right',color:'#fff',alpha:lp});
    brandMark(c,S,W/2,290,{size:46,color:'#fff'})}
  endCard(c,S,t,6.5)}});

/* 3 — Liquid Glass */
LAB({id:'tl-glass',name:'Liquid Glass',desc:'Frosted glass panels drift over your look with soft refraction edges, carrying the headline and details.',pal:{bg:'#0C0B10',fg:'#FFFFFF',ac:'#CFE3FF'},dur:9,pt:3.4,hold:[2.6,6.6],tags:['Trend Lab','Liquid glass'],
 r(c,t,S){const{W,H,p,x}=S,m=S.m(0);const z=kb(t,9,1.18,1.04);cover(c,m,0,0,W,H,{z});vignette(c,W,H,.35);
  const glass=(gx,gy,gw,gh,a,r)=>{if(a<=0)return;c.save();c.globalAlpha=a;rrect(c,gx,gy,gw,gh,r);c.clip();c.filter='blur(26px) brightness(1.12) saturate(1.2)';cover(c,m,0,0,W,H,{z});c.filter='none';
    c.fillStyle='rgba(255,255,255,.16)';c.fillRect(gx,gy,gw,gh);c.fillStyle='rgba(20,14,16,.22)';c.fillRect(gx,gy,gw,gh);const g=c.createLinearGradient(gx,gy,gx+gw,gy+gh);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(.35,'rgba(255,255,255,.05)');g.addColorStop(1,'rgba(255,255,255,.25)');
    c.restore();c.save();c.globalAlpha=a;c.strokeStyle=g;c.lineWidth=3;rrect(c,gx+1.5,gy+1.5,gw-3,gh-3,r);c.stroke();c.restore()};
  const a1=E.outExpo(clamp((t-.4)/.9)),y1=1180+(1-a1)*160+Math.sin(t*1.3)*8;glass(70,y1,W-140,360,a1,48);
  T(c,x.label,120,y1+80,{size:26,ls:6,upper:1,color:'#fff',weight:700,alpha:a1});kin(c,x.headline,120,y1+215,{t,t0:.9,font:F.cor,italic:1,weight:700,size:124,maxW:W-260,color:'#fff',maxLines:2});
  const det3=[x.f1,x.f2,x.f3].filter(Boolean);det3.forEach((d,i)=>{const a=E.outExpo(clamp((t-2.2-i*.25)/.7)),gy=320+i*150+Math.sin(t*1.6+i)*6;glass(W-500,gy,430,120,a,60);T(c,d,W-285,gy+74,{size:38,align:'center',color:'#fff',weight:700,alpha:a,maxW:380,shadow:'rgba(0,0,0,.35)',sb:10})});
  priceTag(c,S,230,1660,clamp((t-3.2)/.5),'rgba(255,255,255,.92)','#111');brandMark(c,S,120,270,{size:44,align:'left',color:'#fff'});endCard(c,S,t,6.7)}});

/* 4 — Stacked Split */
LAB({id:'tl-stack',name:'Stacked Split',desc:'Three stacked panels slide in from alternating sides with different crops, then merge into one full frame.',pal:{bg:'#0E0D0D',fg:'#FFFFFF',ac:'#F2C14E'},dur:8.5,pt:2,hold:[3.6,6.3],tags:['Trend Lab','Split screen'],
 r(c,t,S){const{W,H,p,x}=S;c.fillStyle=p.bg;c.fillRect(0,0,W,H);const mg=E.inOut(clamp((t-3.4)/1));const foc=[[.5,.25,1.6],[.5,.55,1.9],[.5,.82,1.8]];
  if(mg<1){for(let k=0;k<3;k++){const e=E.outExpo(clamp((t-.15-k*.25)/.8)),dir=k%2?1:-1,bh=(H-40)/3,y=k*(bh+20),[fx,fy,z]=foc[k];if(e<=0)continue;
    c.save();c.globalAlpha=1-mg;c.beginPath();c.rect(0,y,W,bh);c.clip();cover(c,S.m(k),dir*(1-e)*W,y,W,bh,{z:z+.05*t,fx,fy,px:dir*t*14});c.restore()}
    T(c,String(x.f1||'').toUpperCase(),70,(H-40)/3-50,{font:FA,size:72,color:'#fff',ls:3,alpha:clamp((t-.9)/.3)*(1-mg),shadow:'rgba(0,0,0,.5)',sb:20});
    T(c,String(x.f2||'').toUpperCase(),W-70,2*(H-40)/3-30,{font:FA,size:72,align:'right',color:'#fff',ls:3,alpha:clamp((t-1.3)/.3)*(1-mg),shadow:'rgba(0,0,0,.5)',sb:20});
    T(c,String(x.f3||'').toUpperCase(),70,H-90,{font:FA,size:72,color:'#fff',ls:3,alpha:clamp((t-1.7)/.3)*(1-mg),shadow:'rgba(0,0,0,.5)',sb:20})}
  if(mg>0){c.save();c.globalAlpha=mg;cover(c,S.m(0),0,0,W,H,{z:1.2-.12*mg});c.restore();grad(c,W,H*.45,H*.55,'rgba(0,0,0,0)','rgba(0,0,0,.72)');
    kin(c,String(x.headline).toUpperCase(),W/2,1440,{t,t0:3.9,font:FA,weight:400,ls:2,size:160,maxW:940,align:'center',color:'#fff',anchor:'bottom',maxLines:3});c.fillStyle=p.ac;const w=300*E.outExpo(clamp((t-4.4)/.6));c.fillRect(W/2-w/2,1490,w,10)}
  endCard(c,S,t,6.4)}});

/* 5 — Cutout Collage */
LAB({id:'tl-cutout',name:'Cutout Collage',desc:'Torn-paper cutouts, tape and handwritten notes assemble in stop-motion steps on textured paper.',pal:{bg:'#EFE6D6',fg:'#211A16',ac:'#B3261E'},tone:'light',dur:9,pt:4,hold:[3.6,6.6],tags:['Trend Lab','Mixed media'],
 r(c,t,S){const{W,H,p,x}=S;const ts=Math.floor(t*12)/12,j=seeded(8,Math.floor(t*12)+5).map(v=>(v-.5)*3);c.fillStyle=p.bg;c.fillRect(0,0,W,H);
  c.save();c.globalAlpha=.07;for(let i=0;i<140;i++){const r=seeded(3,i+11);c.fillStyle=i%2?'#7a6a55':'#fff';c.fillRect(r[0]*W,r[1]*H,2+r[2]*5,1+r[2]*3)}c.restore();
  const torn=(x0,y0,w,h,seed)=>{const r=seeded(80,seed);c.beginPath();c.moveTo(x0,y0+r[0]*10);for(let i=1;i<=20;i++)c.lineTo(x0+w*i/20,y0+r[i]*14);for(let i=1;i<=20;i++)c.lineTo(x0+w+r[20+i]*12,y0+h*i/20);for(let i=1;i<=20;i++)c.lineTo(x0+w-w*i/20,y0+h-r[40+i]*14);for(let i=1;i<=20;i++)c.lineTo(x0-r[60+i]*12,y0+h-h*i/20);c.closePath()};
  const piece=(k,x0,y0,w,h,rot,t0,mi,fx,fy,z)=>{const s=ts<t0?0:ts<t0+.17?1.12:1;if(!s)return;c.save();c.translate(x0+w/2+j[k],y0+h/2+j[k+1]);c.rotate(rot);c.scale(s,s);c.shadowColor='rgba(40,25,10,.35)';c.shadowBlur=30;c.shadowOffsetY=14;torn(-w/2-14,-h/2-14,w+28,h+28,k*17+3);c.fillStyle='#FBF8F1';c.fill();c.shadowColor='transparent';
    torn(-w/2,-h/2,w,h,k*31+7);c.clip();cover(c,S.m(mi),-w/2,-h/2,w,h,{z,fx,fy});c.restore();
    c.save();c.translate(x0+w/2+j[k],y0-6);c.rotate(rot*.5-.08);c.fillStyle='rgba(238,226,196,.85)';c.fillRect(-80,-22,160,44);c.restore()};
  piece(0,140,330,800,1020,-.03,.25,0,.5,.45,1.05);piece(2,560,1180,430,430,.06,1,1,.5,.5,1.6);piece(4,90,1260,400,330,-.07,1.5,2,.5,.5,1.4);
  const hp=ts>=2?1:0;if(hp){c.save();c.translate(W/2+j[5],1680+j[6]);c.rotate(-.04);c.fillStyle=p.ac;c.fillRect(-430,-70,860,140);c.restore();T(c,String(x.headline||'').toUpperCase(),W/2+j[5],1700+j[6],{font:FA,size:78,ls:3,align:'center',color:'#FFF7EA',maxW:820,maxLines:1})}
  if(ts>=2.6){T(c,x.sub,620,1110,{font:F.cor,italic:1,weight:600,size:44,color:p.fg,maxW:380,maxLines:3});c.strokeStyle=p.fg;c.lineWidth=3;c.beginPath();c.moveTo(600,1080);c.quadraticCurveTo(560,1040,520,1000);c.stroke()}
  brandMark(c,S,W/2,220,{size:52,color:p.fg});endCard(c,S,t,6.7,{bg:p.bg})}});

/* 6 — Chrome Drop */
LAB({id:'tl-chrome',name:'Chrome Drop',desc:'Liquid-chrome headline with a travelling glint and star sparkles over a cool-graded look. Y2K energy, kept premium.',pal:{bg:'#07080B',fg:'#FFFFFF',ac:'#B9C6D8'},dur:8.5,pt:3,hold:[3,6.2],tags:['Trend Lab','Y2K chrome'],
 r(c,t,S){const{W,H,p,x}=S;cover(c,S.m(0),0,0,W,H,{z:kb(t,8,1.15,1.03),filter:'contrast(1.12) saturate(.8) hue-rotate(-8deg) brightness(.85)'});vignette(c,W,H,.6);grad(c,W,H*.4,H*.6,'rgba(0,0,0,0)','rgba(0,0,10,.7)');
  const str=String(x.headline||'').toUpperCase(),a=E.outExpo(clamp((t-.5)/.9));if(a>0){c.save();const sz=Math.min(230,fit(c,str.split(' ').slice(0,2).join(' '),FA,400,920,230));c.font=`400 ${sz}px ${FA}`;
    const L=[];{const ws=str.split(' ');let l='';ws.forEach(w=>{const tt=l?l+' '+w:w;if(c.measureText(tt).width>940&&l){L.push(l);l=w}else l=tt});L.push(l)}
    const y0=1300-(L.length-1)*sz*.95;L.slice(0,3).forEach((ln,i)=>{const y=y0+i*sz*.95+(1-a)*80,g=c.createLinearGradient(0,y-sz*.85,0,y+sz*.1);g.addColorStop(0,'#FFFFFF');g.addColorStop(.42,'#AEB9C8');g.addColorStop(.5,'#3E4654');g.addColorStop(.62,'#E8EEF6');g.addColorStop(1,'#7D8798');
      c.globalAlpha=a;c.textAlign='center';c.lineWidth=6;c.strokeStyle='rgba(10,12,20,.85)';c.strokeText(ln,W/2,y);c.fillStyle=g;c.fillText(ln,W/2,y);
      const gx=((t*700+i*240)%(W+800))-400;c.save();c.globalCompositeOperation='source-atop';c.globalAlpha=0;c.restore();c.save();c.beginPath();c.rect(gx,y-sz,140,sz*1.2);c.clip();c.globalAlpha=a*.85;c.fillStyle='rgba(255,255,255,.9)';c.fillText(ln,W/2,y);c.restore()});c.restore()}
  const star=(sx,sy,r,ph)=>{const s=Math.max(0,Math.sin(t*3+ph));if(s<=0)return;c.save();c.translate(sx,sy);c.scale(s,s);c.fillStyle='#fff';c.beginPath();for(let k=0;k<8;k++){const rr2=k%2?r*.18:r,an=k*Math.PI/4;c.lineTo(Math.cos(an)*rr2,Math.sin(an)*rr2)}c.closePath();c.fill();c.restore()};
  star(220,900,40,0);star(860,780,28,1.7);star(780,1480,34,3.1);star(160,1560,22,4.4);
  T(c,x.label,W/2,300,{size:26,ls:8,upper:1,align:'center',color:p.ac,weight:700,p:clamp((t-.3)/.5)});T(c,x.sub,W/2,1520,{size:36,align:'center',color:'rgba(255,255,255,.9)',maxW:860,p:clamp((t-1.6)/.6)});
  priceTag(c,S,W/2,1640,clamp((t-2.2)/.5),'#E8EEF6','#0B0C10');endCard(c,S,t,6.3)}});

/* 7 — Bold Minimal */
LAB({id:'tl-minimal',name:'Bold Minimal',desc:'A flat field of unexpected colour, your look inside a shape that morphs from circle to frame, and oversized type.',pal:{bg:'#1A1414',fg:'#FFF3E6',ac:'#E9452F'},dur:8,pt:3.2,hold:[2.8,5.8],tags:['Trend Lab','Bold minimalism'],
 r(c,t,S){const{W,H,p,x}=S;const field=p.ac,ink=lumOf(field)>.55?'#141012':'#FFF6EC',ink2=p.bg;c.fillStyle=field;c.fillRect(0,0,W,H);const m=S.m(0),g=E.outExpo(clamp((t-.2)/1)),mo=E.inOut(clamp((t-1.4)/1.1));
  const ar=(m&&m.w?m.w/m.h:.75),fh0=Math.min(960,700/ar),fw=fh0*ar,fh=fh0,cs=520*g,w=cs+(fw-cs)*mo,h=cs+(fh-cs)*mo,r=(cs/2)*(1-mo)+24*mo,cx=W/2,cy=900;
  if(g>0){c.save();rrect(c,cx-w/2,cy-h/2,w,h,r);c.clip();card(c,m,cx,cy,Math.max(w,h*ar),Math.max(h,w/ar),{});c.restore()}
  const ws=words(String(x.headline).toUpperCase());T(c,ws.slice(0,2).join(' '),W/2,330,{font:FA,size:fit(c,ws.slice(0,2).join(' '),FA,400,960,210),align:'center',color:ink2,ls:2,p:clamp((t-.6)/.5),rise:60});
  T(c,ws.slice(2).join(' '),W/2,1580,{font:FA,size:Math.min(200,fit(c,ws.slice(2).join(' ')||' ',FA,400,960,200)),align:'center',color:ink2,ls:2,p:clamp((t-1.8)/.5),rise:60});
  T(c,x.label,W/2,1700,{size:28,ls:8,upper:1,align:'center',color:ink,weight:800,p:clamp((t-2.3)/.4)});pill(c,x.cta,W/2,1790,{bg:ink2,fg:field,s:E.outBack(clamp((t-2.6)/.5)),size:34});
  endCard(c,S,t,6,{bg:field,ink:ink2,acc:ink2})}});

/* 8 — Dream Slow-Mo */
LAB({id:'tl-dream',name:'Dream Slow-Mo',desc:'Slow, soft crossfades with bloom, drifting light leaks and quiet lowercase captions. Emotional and aesthetic.',pal:{bg:'#120D0C',fg:'#FFF6EE',ac:'#F3B6A0'},dur:10,pt:4.2,hold:[1.2,7.6],tags:['Trend Lab','Slow motion'],
 r(c,t,S){const{W,H,p,x}=S;const shots=[[0,.5,.35,1.12],[1,.45,.55,1.4],[0,.5,.7,1.5]],seg=2.6;const i=Math.min(2,Math.floor(t/seg)),lt=t-i*seg;
  const draw=(k,a,l)=>{const[mi,fx,fy,z]=shots[k];c.save();c.globalAlpha=a;cover(c,S.m(mi),0,0,W,H,{z:z+.035*l,fx,fy,filter:'saturate(.92) contrast(.96) brightness(1.04)'});c.restore()};
  draw(i,1,lt);const xf=clamp((lt-(seg-.9))/.9);if(xf>0&&i<2){c.save();c.filter='blur('+(12*(1-xf))+'px)';draw(i+1,E.inOut(xf),0);c.restore();c.filter='none'}
  c.save();c.globalCompositeOperation='screen';c.globalAlpha=.32;c.filter='blur(36px)';draw(i,1,lt);c.restore();c.filter='none';
  c.save();c.globalCompositeOperation='screen';[[.2,.25,'255,160,110'],[.85,.6,'255,120,160']].forEach(([lx,ly,col],k)=>{const gx=W*(lx+.08*Math.sin(t*.6+k)),gy=H*(ly+.05*Math.cos(t*.5+k)),g=c.createRadialGradient(gx,gy,0,gx,gy,W*.7);g.addColorStop(0,`rgba(${col},.42)`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.fillRect(0,0,W,H)});c.restore();
  vignette(c,W,H,.4);const caps=[String(x.sub||'').toLowerCase(),String([x.f1,x.f2].filter(Boolean).join(' · ')).toLowerCase(),String(x.headline||'').toLowerCase()];
  if(t<7.8)T(c,caps[i],W/2,1500,{font:F.cor,italic:1,weight:500,size:60,align:'center',color:p.fg,maxW:880,alpha:E.inOut(clamp((lt-.3)/.8))*(1-clamp((lt-(seg-.5))/.4)),shadow:'rgba(0,0,0,.5)',sb:24});
  T(c,String(x.brand||'').toLowerCase(),W/2,290,{font:F.cor,italic:1,size:52,align:'center',color:p.fg,alpha:.9});endCard(c,S,t,7.7)}});

/* 9 — Transformation Reveal */
LAB({id:'tl-reveal',name:'Thread to Look',desc:'A before-and-after reveal: a single detail of the craft opens in a circle that sweeps out to the finished look.',pal:{bg:'#0E0C0B',fg:'#FFFFFF',ac:'#E0B36A'},dur:8.5,pt:3.4,hold:[3.6,6.2],tags:['Trend Lab','Before / after'],
 r(c,t,S){const{W,H,p,x}=S;const m=S.m(0);cover(c,m,0,0,W,H,{z:3.2-.25*t,fx:.55,fy:.72,filter:'saturate(.25) contrast(1.15) brightness(.75)'});
  T(c,'Before',90,300,{size:28,ls:8,upper:1,color:'#fff',weight:700,alpha:1-clamp((t-1.6)/.3)});T(c,String(x.f1||'The thread').toUpperCase(),90,1500,{font:FA,size:130,color:'#fff',ls:3,p:clamp((t-.3)/.5),rise:60,alpha:1-clamp((t-1.6)/.3),maxW:900});
  const rv=E.inOut(clamp((t-1.7)/1.3));if(rv>0){const r=rv*Math.hypot(W,H)*.62,cx=W*.5,cy=H*.45;c.save();c.beginPath();c.arc(cx,cy,r,0,7);c.clip();cover(c,m,0,0,W,H,{z:1.25-.15*rv});c.restore();
    if(rv<1){c.strokeStyle=p.ac;c.lineWidth=8;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke()}}
  if(t>2.9){grad(c,W,H*.45,H*.55,'rgba(0,0,0,0)','rgba(0,0,0,.72)');T(c,'After',90,300,{size:28,ls:8,upper:1,color:p.ac,weight:700,p:clamp((t-3)/.4)});
    kin(c,x.headline,90,1470,{t,t0:3.1,font:F.cor,italic:1,weight:600,size:150,maxW:900,color:'#fff',anchor:'bottom',maxLines:2});T(c,x.sub,92,1560,{size:36,color:'rgba(255,255,255,.88)',maxW:860,p:clamp((t-3.7)/.5)})}
  endCard(c,S,t,6.3)}});

/* 10 — Photo Rush */
LAB({id:'tl-rush',name:'Photo Rush',desc:'A 14-cut multi-clip rush on the beat with a running counter, landing on a held hero frame.',pal:{bg:'#0B0B0C',fg:'#FFFFFF',ac:'#FF3B6B'},dur:8.5,pt:4.2,hold:[3.6,6.2],tags:['Trend Lab','Multi-clip'],
 r(c,t,S){const{W,H,p,x}=S;const N=14,cut=.24;if(t<N*cut){const i=Math.floor(t/cut),r=seeded(3,i*7+3),mi=i%Math.max(1,S.n),z=1.1+r[2]*1.4;cover(c,S.m(mi),0,0,W,H,{z,fx:.25+r[0]*.5,fy:.15+r[1]*.7});
    flash(c,W,H,.35*(1-clamp((t-i*cut)/.06)));c.save();c.strokeStyle='#fff';c.lineWidth=4;c.strokeRect(50,50,W-100,H-100);c.restore();
    T(c,String(i+1).padStart(2,'0')+' / '+N,W-90,300,{font:FA,size:64,align:'right',color:'#fff',ls:2});T(c,'REC',90,300,{size:30,color:p.ac,weight:800,ls:4,alpha:Math.floor(t*4)%2?1:.3})}
  else{const lt=t-N*cut;cover(c,S.m(0),0,0,W,H,{z:1.18-.1*E.outExpo(clamp(lt/1.2))});flash(c,W,H,1-clamp(lt/.25));grad(c,W,H*.45,H*.55,'rgba(0,0,0,0)','rgba(0,0,0,.72)');
    kin(c,String(x.headline).toUpperCase(),80,1460,{t:lt,t0:.15,font:FA,weight:400,ls:2,size:150,maxW:920,color:'#fff',anchor:'bottom',maxLines:3});T(c,x.sub,82,1550,{size:36,color:'rgba(255,255,255,.88)',maxW:860,p:clamp((lt-.6)/.5)})}
  endCard(c,S,t,6.3)}});

/* 11 — Type Is Hero */
LAB({id:'tl-typehero',name:'Type Is Hero',desc:'Kinetic typography leads: each word stretches in on a colour-flipping field, then your look appears inside the letters.',pal:{bg:'#141012',fg:'#FFF4EA',ac:'#E9452F'},dur:9,pt:5.2,hold:[4.2,6.6],tags:['Trend Lab','Kinetic type'],
 r(c,t,S){const{W,H,p,x}=S;const ws=words(String(x.headline).toUpperCase()).slice(0,5),n=Math.max(1,ws.length),seg=3.6/n;
  if(t<3.6){const i=Math.floor(t/seg),lt=t-i*seg,bg=[p.bg,p.ac,p.fg][i%3],ink=[p.fg,p.fg,p.bg][i%3];c.fillStyle=bg;c.fillRect(0,0,W,H);
    const sy=.2+.8*E.outBack(clamp(lt/.35)),sz=fit(c,ws[i],FA,400,980,560);c.save();c.translate(W/2,H/2);c.scale(1+(1-sy)*.3,sy);T(c,ws[i],0,sz*.35,{font:FA,size:sz,align:'center',color:ink,ls:2});c.restore();
    T(c,ws.slice(0,i+1).join(' '),W/2,H-300,{size:30,ls:6,align:'center',color:ink,weight:700,alpha:.7})}
  else{const lt=t-3.6,[b,g]=sgBuf(1,W,H);cover(g,S.m(0),0,0,W,H,{z:1.1});g.globalCompositeOperation='destination-in';g.font=`400 100px ${FA}`;const L=[];{let l='';ws.forEach(w=>{const tt=l?l+' '+w:w;g.font=`400 300px ${FA}`;if(g.measureText(tt).width>980&&l){L.push(l);l=w}else l=tt});L.push(l)}
    const sz=Math.min(...L.map(l=>fit(g,l,FA,400,1000,420))),grow=1+Math.pow(clamp((lt-1.7)/.9),3)*9;const[mb,mg]=sgBuf(2,W,H);mg.translate(W/2,H/2);mg.scale(grow,grow);mg.font=`400 ${sz}px ${FA}`;mg.textAlign='center';mg.textBaseline='middle';mg.fillStyle='#000';L.forEach((l,k)=>mg.fillText(l,0,(k-(L.length-1)/2)*sz*.92));g.drawImage(mb,0,0);
    c.fillStyle=p.bg;c.fillRect(0,0,W,H);const fade=clamp((lt-2)/.6);if(fade>0)cover(c,S.m(0),0,0,W,H,{z:1.1,alpha:fade});c.drawImage(b,0,0);
    T(c,x.label,W/2,300,{size:26,ls:8,upper:1,align:'center',color:p.fg,weight:700,p:clamp(lt/.5),alpha:1-fade})}
  endCard(c,S,t,6.7)}});

/* 12 — Parallax Depth */
LAB({id:'tl-depth',name:'Parallax Depth',desc:'2.5D depth: a soft-focus backdrop, giant type in the middle layer and the full product floating in front, each moving at its own speed.',pal:{bg:'#0E0C0D',fg:'#FFFFFF',ac:'#D7B27A'},dur:9,pt:3.6,hold:[2.6,6.6],tags:['Trend Lab','3D depth'],
 r(c,t,S){const{W,H,p,x}=S,m=S.m(0);const drift=Math.sin(t*.7);cover(c,m,0,0,W,H,{z:1.35,px:drift*30,filter:'blur(22px) brightness(.55) saturate(1.1)'});
  const str=String(x.headline||'').toUpperCase();c.save();c.font=`400 300px ${FA}`;const sz=Math.min(320,fit(c,str.split(' ')[0]||' ',FA,400,1000,320));
  const a=E.outExpo(clamp((t-.2)/1));const ws=words(str).slice(0,3);ws.forEach((w,i)=>{const wsz=Math.min(290,fit(c,w,FA,400,860,290)),y=430+i*270,dx=drift*(30+i*10)+(1-a)*(i%2?-1:1)*400;c.globalAlpha=a*(i===1?1:.35);T(c,w,W/2+dx,y,{font:FA,size:wsz,align:'center',color:i===1?p.ac:'#fff',ls:4})});c.restore();
  const ea=E.outExpo(clamp((t-.7)/1.2));c.save();c.translate(W/2+drift*-60,980+(1-ea)*300);c.transform(1,.02*drift,-.03*drift,1,0,0);card(c,m,0,0,640,900,{s:.9+.1*ea,alpha:ea,border:rgba(p.ac,.7),gap:16,bw:2});c.restore();
  sweep(c,W,H,clamp((t-1.6)/2.2),'255,240,210',.22);T(c,x.sub,W/2,1660,{size:36,align:'center',color:'rgba(255,255,255,.9)',maxW:860,p:clamp((t-2)/.6)});
  priceTag(c,S,W/2+250,1480,clamp((t-2.4)/.5),p.ac,'#140F0C');brandMark(c,S,W/2,240,{size:46,color:'#fff'});endCard(c,S,t,6.7)}});

/* ---------- library integration ---------- */
const lab=TPL.filter(t=>t.lab);for(const t of lab)TPL.splice(TPL.indexOf(t),1);const after=TPL.filter(t=>t.sig).length;TPL.splice(after,0,...lab);
const fl=document.getElementById('filters');if(fl){const b=document.createElement('button');b.type='button';b.dataset.f='lab';b.setAttribute('aria-pressed','false');b.textContent='Trend Lab · '+lab.length;const sigB=fl.querySelector('[data-f=sig]');sigB?sigB.after(b):fl.prepend(b)}
try{const n=TPL.length;document.querySelectorAll('.logo small,#paneT .ai p').forEach(el=>{el.textContent=el.textContent.replace(/\b120\b/,String(n))})}catch(e){}
const _sc=scoreAll;scoreAll=function(){_sc();TPL.forEach(t=>{if(t.lab&&state.scores[t.id]!=null)state.scores[t.id]=Math.min(98,state.scores[t.id]+12)})};
})();
