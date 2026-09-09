from PIL import Image, ImageOps
from pathlib import Path
import json, math
src=Path(r"C:\Users\pmap1\.codex\generated_images\01a07236-a688-7701-a20d-0cfad10d2b21\exec-d750dd2f-2b0b-4078-8973-1de0e6ded43d.png")
out=Path(r"E:\PROYECTOS\CHAT GPT\Stunafy\public\assets\mascots")
out.mkdir(parents=True,exist_ok=True)
im=Image.open(src).convert('RGBA')
alpha=im.getchannel('A'); bbox=alpha.getbbox(); im=im.crop(bbox)
cell_w,cell_h=192,208
# Keep a complete body with breathing room inside every cell.
scale=min((cell_h-8)/im.height,(cell_w-12)/im.width)
base=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS)

def frame(row,col):
    f=base.copy()
    if row==2: f=ImageOps.mirror(f)
    angle=0; dx=0; dy=0; sx=1
    if row==0: dy=[1,0,-1,0,1,0,-1,0][col]
    elif row in (1,2): angle=[-3,2,-2,3,-3,2,-2,3][col]; dx=[-3,0,3,0,-3,0,3,0][col]
    elif row==3: angle=[-5,-2,2,5,2,-2,-5,0][col]; dx=[-2,0,2,3,1,-1,-3,0][col]
    elif row==4: dy=[-2,-9,-14,-8,-2,0,-5,-10][col]; angle=[-3,2,4,-2,-4,2,4,-2][col]
    elif row==5: angle=[8,5,2,-2,-5,-8,-4,3][col]; dy=[2,1,0,0,1,2,1,0][col]
    elif row==6: dx=[-2,-1,0,1,2,1,0,-1][col]; dy=[1,0,-1,0,1,0,-1,0][col]
    elif row==7: angle=[-10,-6,0,7,12,5,-4,-9][col]; dx=[-5,-2,2,6,3,-2,-6,-3][col]; sx=[1.0,1.04,1.08,1.02,.98,1.06,1.1,1.03][col]; dy=[1,0,-2,-1,1,2,0,-1][col]
    elif row==8: angle=[-3,-1,1,3,2,0,-2,-3][col]; dy=[0,-1,0,1,0,-1,0,1][col]
    elif row==9: angle=[-8,-5,-2,1,4,7,4,0][col]; dx=[-2,-1,0,1,2,1,0,-1][col]
    elif row==10: f=ImageOps.mirror(f); angle=[0,4,7,4,0,-4,-7,-4][col]; dx=[1,2,1,0,-1,-2,-1,0][col]
    if sx!=1: f=f.resize((round(f.width*sx),f.height),Image.Resampling.BICUBIC)
    if angle: f=f.rotate(angle,Image.Resampling.BICUBIC,expand=True)
    canvas=Image.new('RGBA',(cell_w,cell_h),(0,0,0,0)); x=(cell_w-f.width)//2+dx; y=(cell_h-f.height)//2+dy; canvas.alpha_composite(f,(x,y)); return canvas
atlas=Image.new('RGBA',(cell_w*8,cell_h*11),(0,0,0,0))
used={0:7,1:8,2:8,3:4,4:5,5:8,6:6,7:6,8:6,9:8,10:8}
for r in range(11):
    for c in range(used[r]): atlas.alpha_composite(frame(r,c),(c*cell_w,r*cell_h))
atlas.save(out/'tuno-atlas.png',optimize=True)
atlas.save(out/'tuno.webp',method=6,quality=88)
meta={'spriteVersionNumber':2,'id':'tuno','name':'Tuno','atlas':'tuno-atlas.png','appAsset':'tuno.webp','cellWidth':cell_w,'cellHeight':cell_h,'columns':8,'rows':11,'states':{'idle':0,'running-right':1,'running-left':2,'waving':3,'jumping':4,'failed':5,'waiting':6,'capeDance':7,'review':8},'lookRows':[9,10],'source':'User-provided tuno reference plus generated canonical base art','notes':'Cape dance uses varied body/cape silhouettes and directional sway.'}
(out/'tuno.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
print(atlas.size, (out/'tuno.webp').stat().st_size)
