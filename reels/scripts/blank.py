import sys, json
from PIL import Image, ImageStat
bad=[]
for f in sys.argv[1:]:
    st=ImageStat.Stat(Image.open(f).convert('L'))
    if st.stddev[0] < 6: bad.append(f.split('/')[-1])
print(json.dumps(bad))
