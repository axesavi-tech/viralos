import asyncio,sys,base64,json,io
sys.path.insert(0,'.')
import shots
from PIL import Image,ImageStat
from playwright.async_api import async_playwright
LONG="{brand:'KORA COFFEE ROASTERS & CO',handle:'@koracoffeeroasters',headline:'Roasted this morning, delivered by Friday',sub:'Single-origin beans from small farms, roasted to order in tiny batches',cta:'Order your first bag',price:'₹ 1,290',label:'Harvest edition · 2027',f1:'Single origin',f2:'Roasted to order',f3:'Ships in 24 hours'}"
MIN="{brand:'Ora',handle:'',headline:'New',sub:'',cta:'',price:'',label:'',f1:'',f2:'',f3:''}"
async def main():
  async with async_playwright() as pw:
    b=await pw.chromium.launch();pg=await b.new_page(viewport={'width':1440,'height':900});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
    await pg.route('**/*',shots.h);await pg.add_init_script(open('init.js').read())
    await pg.goto('http://vx.test/studio/index.html#studio');await pg.wait_for_timeout(4500)
    meta=await pg.evaluate("TPL.filter(t=>t.kc).map(t=>[t.id,t.kind,t.dur,t.pt||0,t.name,t.fam])")
    print('kc:',len(meta),'reels',sum(1 for m in meta if m[1]!='post'),'posts',sum(1 for m in meta if m[1]=='post'))
    res={}
    for vname,cp,media in (('long1',LONG,"state.media.slice(0,1)"),('min0',MIN,"[]")):
      await pg.evaluate(f"setCopy({cp})");await pg.evaluate(f"window._full=window._full||state.media.slice();state.media={media.replace('state.media','window._full')}")
      for tid,kind,dur,pt,nm,fam in meta:
        times=[99] if kind=='post' else [round(dur*.3,2),round(dur*.6,2),round(dur*.95,2)]
        for tt in times:
          before=len(errs)
          d=await pg.evaluate(f"""(()=>{{try{{const tpl=TPL.find(x=>x.id==='{tid}');const cv=document.createElement('canvas');const post=tpl.kind==='post';cv.width=post?216:180;cv.height=post?270:320;renderTpl(cv.getContext('2d'),tpl,{tt},post?.2:1/6);return cv.toDataURL('image/jpeg',.8)}}catch(e){{return 'ERR:'+e.message}}}})()""")
          if d.startswith('ERR:'):res.setdefault(tid,[]).append(f'{vname}@{tt} THROW {d}');continue
          im=Image.open(io.BytesIO(base64.b64decode(d.split(',')[1]))).convert('L');sd=ImageStat.Stat(im).stddev[0]
          if sd<5:res.setdefault(tid,[]).append(f'{vname}@{tt} blank sd={sd:.1f}')
          if len(errs)>before:res.setdefault(tid,[]).append(f'{vname}@{tt} console: {errs[before][:120]}')
          if tt==times[0] or kind=='post':im.convert('RGB').save(f'qa/{vname}_{tid}.jpg',quality=70)
    json.dump({'meta':meta,'issues':res},open('qa_res.json','w'),indent=1);print('issues:',len(res));[print(k,v) for k,v in list(res.items())[:40]];await b.close()
asyncio.run(main())
