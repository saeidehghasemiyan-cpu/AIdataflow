import re,html,collections
GAMES={'pip':{1:[1],2:[2],3:[10],9:[11],8:[3],10:[4],11:[5],12:[6,7],15:[8],18:[9]},
       'quill':{1:[1],14:[11],5:[2],6:[3],7:[4],8:[5],9:[6],11:[7],12:[8],15:[9],19:[10]},
       'dash':{1:[1],2:[10],5:[2],6:[3],8:[4],10:[5],14:[6],16:[8],17:[9]}}
EMBED={'pip':{4:['g0','shapes']},'quill':{3:['g0'],18:['g9']},'dash':{3:['g0'],15:['g7']}}
def clean(s): return s.replace('&#91;','[').replace('\\[','[').replace('\\]',']').replace('\\_','_')
def inline(s):
    s=html.escape(clean(s),quote=False)
    s=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',s)
    s=re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])',r'<em>\1</em>',s)
    return s
def cells(l): return [c.strip() for c in l.strip().strip('|').split('|')]
def blocks(lines):
    out=[];i=0
    while i<len(lines):
        l=lines[i]
        if not l.strip(): i+=1; continue
        if l.startswith('|'):
            j=i
            while j<len(lines) and lines[j].startswith('|'): j+=1
            rows=[cells(x) for x in lines[i:j]]; out.append(('table',rows[0],rows[2:])); i=j; continue
        m=re.match(r'^(- \[ \] |- |\d+\. )',l)
        if m:
            kind='ck' if m.group(1)=='- [ ] ' else 'ul' if m.group(1)=='- ' else 'ol'
            pat={'ck':r'^- \[ \] ','ul':r'^- (?!\[ \] )','ol':r'^\d+\. '}[kind]
            start=int(re.match(r'\d+',l).group()) if kind=='ol' else 1
            items=[]
            while i<len(lines) and re.match(pat,lines[i]): items.append(re.sub(pat,'',lines[i])); i+=1
            out.append((kind,items,start)); continue
        out.append(('p',l)); i+=1
    return out
ckid=[0]
def table(head,rows):
    return '<div class="tw"><table class="t"><thead><tr>'+''.join(f'<th>{inline(h)}</th>' for h in head)+'</tr></thead><tbody>'+''.join('<tr>'+''.join(f'<td data-label="{html.escape(clean(head[k]) if k<len(head) else "")}">{inline(c)}</td>' for k,c in enumerate(r))+'</tr>' for r in rows)+'</tbody></table></div>'
def wc(h): return len(re.findall(r"[A-Za-z0-9']+",re.sub(r'<[^>]+>',' ',h)))
def render(bl,kind,st):
    o=[]
    def add(h,solo=False,colon=False): o.append({'h':h,'w':wc(h),'solo':solo,'colon':colon})
    for b in bl:
        if b[0]=='p':
            t=b[1]; c=clean(t)
            if c.startswith('[embedded content:'):
                e=st['embeds'].pop(0) if st['embeds'] else None
                if e: add(f'<div class="slot" data-extra="{e}"></div>' if not e.startswith('g') else f'<div class="slot" data-game="{e[1:]}"></div>',solo=True)
                continue
            cls=' class="shout"' if re.fullmatch(r'\*\*[^*]+\*\*',t) else ' class="quote"' if re.fullmatch(r'\*[^*]+\*',t) else ''
            add(f'<p{cls}>{inline(t)}</p>',colon=c.rstrip().endswith(':') or bool(cls and 'shout' in cls))
        elif b[0]=='table':
            head,rows=b[1],b[2]
            if kind=='where': add(f'<p class="pass-h">{inline(head[0])} · {inline(head[1])}</p><div class="pass">'+''.join(f'<div class="stamp"><b>{inline(r[0])}</b><span>{inline(r[1])}</span></div>' for r in rows)+'</div>')
            elif kind=='dict' and len(head)==3:
                for k in range(0,len(rows),18):
                    add(f'<p class="pass-h">{" · ".join(inline(h) for h in head)}</p><div class="cards dict">'+''.join(f'<button class="fc"><b>{inline(r[0])}</b><span>{inline(r[1])} <i>{inline(head[2])} {inline(r[2])}</i></span></button>' for r in rows[k:k+18])+'</div>',solo=True)
            else:
                step=7 if len(rows)>9 else len(rows)
                for k in range(0,len(rows),step): add(table(head,rows[k:k+step]))
        elif b[0]=='ck':
            add('<div class="cks">'+''.join(f'<label class="ck" for="ck{(ckid.__setitem__(0,ckid[0]+1) or ckid[0])}"><input type="checkbox" id="ck{ckid[0]}"><span>{inline(x)}</span></label>' for x in b[1])+'</div>')
        elif b[0] in('ul','ol'):
            items=b[1]
            if kind=='words':
                ms=[re.match(r'^\*\*(.+?):\*\*\s*(.*)$',x) for x in items]
                if all(ms):
                    add('<div class="cards">'+''.join(f'<button class="fc"><b>{inline(m.group(1))}</b><span>{inline(m.group(2))}</span></button>' for m in ms)+'</div>'); st['nwords']=len(ms); continue
            if kind=='qa':
                ms=[re.match(r'^\*\*(.+?)\*\*\s*(.*)$',x) for x in items]
                if all(ms):
                    for k in range(0,len(ms),5):
                        add('<div class="qas">'+''.join(f'<div class="qa"><p class="qq"><span class="qn">{b[2]+k+n}</span> {inline(m.group(1))}</p><button class="b sm alt reveal">Show the answer</button><p class="aa" hidden>{inline(m.group(2))}</p></div>' for n,m in enumerate(ms[k:k+5]))+'</div>',solo=len(ms)>5)
                    continue
            step=6 if len(items)>8 else len(items)
            for k in range(0,len(items),step):
                part=items[k:k+step]
                if b[0]=='ul': add('<ul class="stick">'+''.join(f'<li>{inline(x)}</li>' for x in part)+'</ul>')
                else: add(f'<ol class="steps" style="counter-reset:s {b[2]-1+k}">'+''.join(f'<li>{inline(x)}</li>' for x in part)+'</ol>')
    return o
LIMIT=150
def pages(bl,kind,heading):
    groups=[];cur=[];w=0
    for b in bl:
        slot='class="slot"' in b['h']
        if cur and (slot or cur[-1].get('slotpg') or b['solo'] and w>40 or w+b['w']>LIMIT and w>35):
            carry=[]
            if cur[-1]['colon'] and len(cur)>1 and not slot: carry=[cur.pop()]
            groups.append(cur); cur=carry; w=sum(x['w'] for x in cur)
        if slot: b['slotpg']=True
        cur.append(b); w+=b['w']
    if cur: groups.append(cur)
    out=[];n=sum(1 for g in groups if not g[0].get('slotpg'));k=0
    for g in groups:
        if g[0].get('slotpg'): out.append(f'<div class="pg" data-kind="play">{g[0]["h"]}</div>'); continue
        k+=1; part=f' <small>part {k} of {n}</small>' if n>1 else ''
        out.append(f'<div class="pg sec {kind}" data-kind="{kind}"><h2><span>{inline(heading)}{part}</span></h2>'+''.join(x['h'] for x in g)+'</div>')
    return ''.join(out)
def words(s): return collections.Counter(re.findall(r"[A-Za-z0-9']+",s.lower()))
out=[];report=[]
for book in ['pip','quill','dash']:
    md=open(book+'.md').read().split('\n')
    title=md[0][2:]; md=[l for k,l in enumerate(md) if k!=2]   # drop the byline (date and author chip)
    idxs=[k for k,l in enumerate(md) if l.startswith('## ')]
    pre=[l for l in md[1:idxs[0]] if l.strip()]
    src_words=words(re.sub(r'^\|[\s\-|]+\|$','',re.sub(r'^(#+ |- \[ \] |- |\d+\. )','',re.sub(r'^.*embedded content:.*$','',clean('\n'.join(md)),flags=re.M),flags=re.M),flags=re.M).replace('|',' ').replace('*',' '))
    gen=''
    for ci,a in enumerate(idxs):
        seg=md[a+1:(idxs[ci+1] if ci+1<len(idxs) else len(md))]; ctitle=clean(md[a][3:])
        hs=[k for k,l in enumerate(seg) if l.startswith('### ')]
        lead=seg[:hs[0]] if hs else seg
        st={'embeds':list(EMBED[book].get(ci,[])),'nwords':0}
        isdict='dictionary' in ctitle.lower(); isquiz='master quiz' in ctitle.lower()
        h='<div class="lead">'+(f'<p class="booktitle">{inline(title)}</p>'+''.join(f'<p>{inline(x)}</p>' for x in pre) if ci==0 else '')
        lb=[b for b in blocks(lead)]
        # lead paragraphs go in the bubble; anything else (or an embed) starts the body
        body='';bodyb=[];inlead=True
        for b in lb:
            if inlead and b[0]=='p' and not clean(b[1]).startswith('[embedded'): h+=f'<p>{inline(b[1])}</p>'
            else: inlead=False; bodyb+=render([b],'',st)
        h+='</div>'
        games=''.join(f'<div class="slot" data-game="{g}"></div>' for g in GAMES[book].get(ci,[]))
        placed=False; pend=None
        if bodyb: h+=pages(bodyb,'','Take a look')
        for n,s in enumerate(hs):
            ht=clean(seg[s][4:]); sb=blocks(seg[s+1:(hs[n+1] if n+1<len(hs) else len(seg))])
            kind='story' if ht=='The story' else 'words' if ht.startswith('New words') else 'where' if ht.startswith('Where is') else 'qa' if (ht=='Check yourself' or (isquiz and ht.startswith('Part'))) else 'dict' if isdict else ''
            rb=render(sb,kind,st)
            if not rb: pend=ht; continue
            if pend: rb.insert(0,{'h':f'<p class="shout">{inline(pend)}</p>','w':4,'solo':False,'colon':True}); pend=None
            h+=pages(rb,kind,ht)
            if kind=='story' and games: h+=''.join(f'<div class="pg" data-kind="play"><div class="slot" data-game="{g}"></div></div>' for g in GAMES[book].get(ci,[])); placed=True
            if kind=='words' and st['nwords']>=3: h+='<div class="pg" data-kind="play"><div class="slot" data-match="1"></div></div>'
        if games and not placed: h+=''.join(f'<div class="pg" data-kind="play"><div class="slot" data-game="{g}"></div></div>' for g in GAMES[book].get(ci,[]))
        out.append(f'<template class="chap" data-book="{book}" data-title="{html.escape(ctitle)}">{h}</template>'); gen+=' '+ctitle+' '+h
    gw=words(html.unescape(re.sub(r'<[^>]+>',' ',re.sub(r'<button class="b sm alt reveal">Show the answer</button>|<span class="qn">\d+</span>|<small>part \d+ of \d+</small>|<span>Take a look</span>','',gen))))
    src_words+=words(title) if False else collections.Counter()
    miss={w:c-gw[w] for w,c in src_words.items() if gw[w]<c}
    extra={w:c-src_words[w] for w,c in gw.items() if src_words[w]<c}
    report.append((book,sum(src_words.values()),sum(gw.values()),'missing',dict(list(miss.items())[:12]),'extra',dict(list(extra.items())[:12])))
    assert '*' not in re.sub(r'<[^>]+>','',gen), [m for m in re.findall(r'.{30}\*.{30}',re.sub(r'<[^>]+>','',gen))][:5]
for r in report: print(r)
s=open('base.html').read()
def rep(a,b,cnt=1):
    global s
    assert a in s,a[:60]; s=s.replace(a,b,cnt)
i=s.index('<main id="story" hidden>'); j=s.index('</main>',i)+7
s=s[:i]+'''<main id="map" hidden>
    <div class="shead"><span id="m-sub"></span><h1 id="m-title"></h1></div>
    <div id="m-scene"></div>
    <div id="m-next" class="row" style="justify-content:flex-start"></div>
    <ol class="board" id="board"></ol>
    <label class="ck" for="t-open"><input type="checkbox" id="t-open"><span>Teacher mode: unlock every chapter</span></label>
  </main>
  <main id="story" hidden>
    <div class="rhead"><a class="tg" id="tomap" href="#home">Back to the map</a><span id="s-step"></span></div>
    <h1 id="s-title"></h1>
    <div class="pbar" id="pbar"></div>
    <div id="pic"></div>
    <div class="say"><span id="s-who"></span><div class="bubble" id="s-say"></div></div>
    <article id="chapter"></article>
    <div class="nav"><button class="b alt" id="prev">Back</button><button class="b" id="next">Next</button></div>
  </main>'''+s[j:]
rep('<button class="tg" id="t-read" aria-pressed="false">Read to me</button>','')
rep("const keep=()=>","let keep=()=>")
rep('</style>',open('extra.css').read()+'\n'+open('design.css').read()+'\n</style>')
rep("localStorage.getItem('pqd')","localStorage.getItem('pqd3')"); rep("localStorage.setItem('pqd',","localStorage.setItem('pqd3',")
rep('</defs></svg>','''<symbol id="i-cloud" viewBox="0 0 48 48"><path d="M12 36a9 9 0 0 1 1-18 12 12 0 0 1 23 3 8 8 0 0 1-1 15z"/></symbol>
<symbol id="i-bulb" viewBox="0 0 48 48"><path d="M16 30a13 13 0 1 1 16 0v5H16z"/><path d="M18 41h12" class="n"/></symbol>
<symbol id="i-shield" viewBox="0 0 48 48"><path d="M24 4 40 10v12c0 11-7 18-16 22C15 40 8 33 8 22V10z"/><path d="M17 23l5 5 9-10" class="n"/></symbol>
<symbol id="i-bin" viewBox="0 0 48 48"><path d="M11 14h26l-3 28H14z"/><path d="M7 14h34M19 14V8h10v6" class="n"/></symbol>
<symbol id="i-gear" viewBox="0 0 48 48"><path d="M24 4v7M24 37v7M4 24h7M37 24h7M10 10l5 5M33 33l5 5M38 10l-5 5M15 33l-5 5" class="n"/><circle cx="24" cy="24" r="13"/><circle cx="24" cy="24" r="5" class="w"/></symbol>
<symbol id="i-flag" viewBox="0 0 48 48"><path d="M12 6h24l-6 9 6 9H12z"/><path d="M12 4v40" class="n"/></symbol>
<symbol id="i-pen" viewBox="0 0 48 48"><path d="M8 40l3-11L33 7l8 8-22 22z"/><path d="M28 12l8 8M11 29l8 8" class="n"/></symbol>
<symbol id="i-person" viewBox="0 0 48 48"><circle cx="24" cy="14" r="8"/><path d="M8 44a16 16 0 0 1 32 0z"/></symbol>
</defs></svg>''')
i=s.index('function speak(t){'); j=s.index('\n',i); s=s[:i]+s[j:]
i=s.index('/* ---------- pages ---------- */'); j=s.index('</script>',i)
s=s[:i]+open('challenges.js').read()+'\n'+open('films.js').read()+'\n'+open('art.js').read()+'\n'+open('supa.js').read()+'\n'+open('pages.js').read()+'\n'+s[j:]
rep('<script>\nconst q=','\n'.join(out)+'\n<script>\nconst q=')
open('data-journeys.html','w').write(s); print('bytes',len(s))
import shutil,os
cfg='<script>window.PQD_SUPA={url:"https://iewswvwmnapvpwizxsyu.supabase.co",key:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlld3N3dndtbmFwdnB3aXp4c3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjIwMTksImV4cCI6MjEwNzYzODAxOX0.bAGN_waGAvDYv_bY-AQehJmNcW6Dy5QbPtbauZfTiR0"};</script>'
head='<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n'+cfg+'\n'
body=s
i=body.index('<title>'); j=body.index('</style>')+8
site=head+body[i:j]+'\n</head>\n<body>\n'+body[j:]+'\n</body>\n</html>\n'
os.makedirs('site/img',exist_ok=True)
open('site/index.html','w').write(site)
for f in os.listdir('img'):
    if f.startswith(('test','pip0-v')): continue
    shutil.copy('img/'+f,'site/img/'+f)
open('site/staticwebapp.config.json','w').write('{"globalHeaders":{"Cache-Control":"no-cache"},"mimeTypes":{".webp":"image/webp",".mp4":"video/mp4"}}')
print('site built', len(os.listdir('site/img')),'media files')
