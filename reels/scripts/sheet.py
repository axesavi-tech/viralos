import sys,glob
from PIL import Image, ImageDraw
pre=sys.argv[1]; fs=sorted(glob.glob(f'out/stills/{pre}__*.jpg'))
ims=[Image.open(f) for f in fs]; w,h=ims[0].size; s=0.55
tw,th=int(w*s),int(h*s)
sheet=Image.new('RGB',(tw*len(ims),th),'white')
for i,im in enumerate(ims): sheet.paste(im.resize((tw,th)),(i*tw,0))
sheet.save(f'out/sheet_{pre}.jpg',quality=82); print(sheet.size)
