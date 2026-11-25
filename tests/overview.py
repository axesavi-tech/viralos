import asyncio,sys,base64,json,io
sys.path.insert(0,'.')
import shots
from PIL import Image,ImageDraw,ImageFont
from playwright.async_api import async_playwright
DEMO="{brand:'MAISON VELA',handle:'@maisonvela',headline:'Made to be noticed',sub:'Hand-poured in small batches, made to last',cta:'Shop the edit',price:'₹ 2,499',label:'Winter collection · 2026',f1:'Hand-finished',f2:'45-hour burn',f3:'Small batch'}"
async def main():
  async with async_playwright() as pw:
    b=await pw.chromium.launch();pg=await b.new_page(viewport={'width':1440,'height':900})
    await pg.route('**/*',shots.h);await pg.add_init_script(open('init.js').read())
    await pg.goto('http://vx.test/studio/index.html#studio');await pg.wait_for_timeout(4500);await pg.evaluate(f"setCopy({DEMO})")
    meta=await pg.evaluate("TPL.filter(t=>t.kc).map(t=>[t.id,t.kind,t.dur,t.pt||t.dur*.5])")
    f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
    for kind,label in (('reel','Reels'),('post','Posts')):
      sel=[m for m in meta if (m[1]=='post')==(kind=='post')];cols=20;tw,th=(108,192) if kind=='reel' else (108,135);rows=(len(sel)+cols-1)//cols
      o=Image.new('RGB',(cols*(tw+6)+6,rows*(th+6)+60),'#111113');d=ImageDraw.Draw(o);d.text((10,16),f'Kathavi Collection · all {len(sel)} {label}',fill='#B9FA70',font=f)
      for i,(tid,k,dur,pt) in enumerate(sel):
        tt=99 if k=='post' else min(pt,dur*.7)
        u=await pg.evaluate(f"""(()=>{{const tpl=TPL.find(x=>x.id==='{tid}');const cv=document.createElement('canvas');cv.width={tw*2};cv.height={th*2};renderTpl(cv.getContext('2d'),tpl,{tt},{tw*2}/1080);return cv.toDataURL('image/jpeg',.85)}})()""")
        im=Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))).resize((tw,th));o.paste(im,(6+(i%cols)*(tw+6),54+(i//cols)*(th+6)))
      o.save(f'/home/claude/out/kathavi-collection-all-{kind}s.jpg',quality=84)
    await b.close()
asyncio.run(main())
