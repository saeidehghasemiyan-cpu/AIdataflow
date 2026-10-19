/* ---------- pages: home, chapter map with locks, and a short-page reader ---------- */
let cur=null, ch=0, pg=0, P=[];
const freshSave=()=>({stars:{},done:{},pos:{},badge:{},open:false});
save=freshSave();
const shuffle=a=>a.map(x=>[Math.random(),x]).sort((p,q2)=>p[0]-q2[0]).map(x=>x[1]);
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const chaps=k=>qa(`template.chap[data-book="${k}"]`);
const doneN=k=>save.done[k]||0, unlocked=(k,i)=>save.open||i<=doneN(k);
const bookLocked=k=>k!=='pip'&&!save.open&&doneN('pip')<chaps('pip').length;
function toast(m){ let t=q('#toast'); if(!t){ t=document.createElement('div'); t.id='toast'; t.setAttribute('role','status'); document.body.appendChild(t); } t.textContent=m; t.classList.add('on'); clearTimeout(toast.t); toast.t=setTimeout(()=>t.classList.remove('on'),3200); }
const short=t=>t.replace(/^Chapter \d+\.\s*/,'');
const totalStars=()=>ORDER.reduce((n,k)=>n+(save.stars[k]||[]).length,0);
const starsIn=(k,i)=>(save.stars[k]||[]).filter(x=>String(x).startsWith(i+'-')).length;
function topStars(){ q('#stars').innerHTML=ic('star','pip',20)+totalStars(); }
function show(id){ ['home','map','story'].forEach(x=>q('#'+x).hidden=x!==id); const e=q('#edit-btn'); if(e&&id!=='story') e.hidden=true; window.scrollTo(0,0); }
function reset(){ cleanup.forEach(f=>f()); cleanup=[]; speak(''); }
function speak(){}
function award(key,box){ const g=save.stars[cur]=save.stars[cur]||[]; if(g.includes(key)) return; g.push(key); keep(); topStars(); S.yay(); if(box) confetti(box); const st=q('#stars'); st.classList.remove('gain'); void st.offsetWidth; st.classList.add('gain'); const ts=totalStars(); toast(`+1 star! You now have ${ts} star${ts===1?'':'s'}.`); }
function matchGame(st,pairs,done){ const pick=pairs.slice().sort(()=>Math.random()-.5).slice(0,4), defs=pick.map((p,i)=>[p[1],i]).sort(()=>Math.random()-.5); let sel=null, left=pick.length;
  st.innerHTML=`<div class="match"><div class="col">${pick.map((p,i)=>`<button class="tile mt" data-t="${i}">${esc(p[0])}</button>`).join('')}</div><div class="col">${defs.map(d=>`<button class="tile md" data-d="${d[1]}">${esc(d[0])}</button>`).join('')}</div></div><p class="note">Tap a word, then tap its meaning.</p>`;
  st.onclick=e=>{ const t=e.target.closest('.mt'), d=e.target.closest('.md'), n=q('.note',st);
    if(t&&!t.disabled){ qa('.mt',st).forEach(x=>x.classList.remove('sel')); t.classList.add('sel'); sel=t; S.tick(); }
    else if(d&&!d.disabled&&sel){ if(d.dataset.d===sel.dataset.t){ [d,sel].forEach(x=>{ x.classList.add('on'); x.classList.remove('sel'); x.disabled=true; }); sel=null; left--; S.pop(); n.textContent=left?'Yes! Keep going.':'All matched!'; n.className='note good'; if(!left) done(); }
      else { S.no(); n.textContent='Not that one. Try again.'; n.className='note bad'; } } }; }
function orderGame(st,items,done){ let k=0;
  st.innerHTML=`<ol class="ord"></ol><div class="qopts">${shuffle(items.map((t,i)=>[t,i])).map(x=>`<button class="tile qo" data-i="${x[1]}">${esc(x[0])}</button>`).join('')}</div><p class="note">Tap the steps in the right order, starting with the first.</p>`;
  st.onclick=e=>{ const b=e.target.closest('.qo'); if(!b) return; const n=q('.note',st);
    if(+b.dataset.i===k){ k++; S.pop(); b.remove(); q('.ord',st).insertAdjacentHTML('beforeend',`<li>${esc(items[k-1])}</li>`); n.className='note good'; n.textContent=k<items.length?'Yes! What comes next?':'Perfect order!'; if(k===items.length) done(); }
    else { S.no(); b.classList.add('stuck'); later(()=>b.classList.remove('stuck'),450); n.className='note bad'; n.textContent=k?'Not yet. Which step comes next?':'Not yet. Which step comes first?'; } }; }
function mythGame(st,items,done){ const R=shuffle(items); let k=0, sc=0;
  const draw=()=>{ const it=R[k];
    st.innerHTML=`<div class="row"><span class="pill">Card ${k+1} of ${R.length}</span><span class="pill">${ic('star','pip',14)} ${sc} right</span></div>
      <div class="mcard" id="mcard"><p>${esc(it[0])}</p></div>
      <div class="row mbtns"><button class="b fact" data-a="1">${ic('shield','dash',26)}Fact</button><button class="b myth" data-a="0">${ic('bin','quill',26)}Myth</button></div><p class="note">Is it true? Or is it a myth?</p>`; };
  st.onclick=e=>{ if(e.target.closest('#mnext')){ k++; if(k<R.length) draw(); else { st.innerHTML=`${ic('star','pip',64)}<p class="big">Myth busted! ${sc} of ${R.length} right.</p><p class="note good">${sc===R.length?'Perfect score. You can spot a myth from a mile away!':'Now you know the tricky ones too.'}</p>`; done(); } return; }
    const b=e.target.closest('.mbtns .b'); if(!b) return; const it=R[k], ok=+b.dataset.a===it[1], card=q('#mcard',st); if(ok) sc++;
    qa('.mbtns .b',st).forEach(x=>x.disabled=true); ok?S.yay():S.no();
    card.insertAdjacentHTML('beforeend',`<span class="stampx ${it[1]?'f':'m'}">${it[1]?'Fact!':'Myth!'}</span>`); card.classList.add(ok?'ok':'nope');
    const n=q('.note',st); n.className='note '+(ok?'good':'bad'); n.textContent=(ok?'Yes! ':'Not quite. ')+it[2];
    n.insertAdjacentHTML('afterend',`<button class="b sm" id="mnext">${k<R.length-1?'Next card':'See my score'}</button>`); };
  draw(); }
function caseGame(st,items,done){ const R=shuffle(items); let k=0, sc=0;
  const draw=()=>{ const it=R[k], opts=shuffle([[it[1],1],[it[2],0],[it[3],0]]);
    st.innerHTML=`<div class="row"><span class="pill">Case ${k+1} of ${R.length}</span><span class="pill">${ic('star','pip',14)} ${sc} solved</span></div>
      <div class="case">${ic('scan','sky',44)}<p>${esc(it[0])}</p></div><div class="qopts">${opts.map(o=>`<button class="tile qo" data-ok="${o[1]}">${esc(o[0])}</button>`).join('')}</div><p class="note"></p>`; };
  st.onclick=e=>{ if(e.target.closest('#cnext')){ k++; if(k<R.length) draw(); else { st.innerHTML=`${ic('star','pip',64)}<p class="big">Case closed! You solved ${sc} of ${R.length}.</p><p class="note good">${sc===R.length?'Top detective!':'Every case you read makes you sharper.'}</p>`; done(); } return; }
    const b=e.target.closest('.qo'); if(!b||b.disabled) return; const ok=b.dataset.ok==='1', it=R[k], n=q('.note',st); if(ok) sc++;
    qa('.qo',st).forEach(x=>{ x.disabled=true; if(x.dataset.ok==='1') x.classList.add('on'); }); if(!ok) b.classList.add('stuck'); ok?S.yay():S.no();
    n.className='note '+(ok?'good':'bad'); n.textContent=(ok?'Solved! ':'The right answer is lit up. ')+it[4];
    n.insertAdjacentHTML('afterend',`<button class="b sm" id="cnext">${k<R.length-1?'Next case':'See my score'}</button>`); };
  draw(); }
function popGame(st,c,done){ const [,,ask,yes,no,why]=c, all=shuffle(yes.map(t=>[t,1]).concat(no.map(t=>[t,0]))); let left=yes.length, miss=0;
  st.innerHTML=`<p class="big">${esc(ask)}</p><div class="field">${all.map((x,i)=>`<button class="bub2" data-y="${x[1]}" style="--d:${(i%4)*.45}s;--h:${[0,.3,.6,.15][i%4]*360}deg">${esc(x[0])}</button>`).join('')}</div><p class="note">${left} bubbles to pop. Careful: some are tricks!</p>`;
  st.onclick=e=>{ const b=e.target.closest('.bub2'); if(!b||b.disabled) return; const n=q('.note',st);
    if(b.dataset.y==='1'){ b.disabled=true; b.classList.add('pop'); S.pop(); left--;
      if(left){ n.className='note good'; n.textContent=`Pop! ${left} more to find.`; }
      else { S.yay(); qa('.bub2',st).forEach(x=>{ x.disabled=true; if(x.dataset.y==='0') x.classList.add('gone'); }); n.className='note good'; n.textContent=(miss?'All found! ':'All found with no mistakes! ')+why; done(); } }
    else { miss++; S.no(); b.classList.remove('shk'); void b.offsetWidth; b.classList.add('shk'); n.className='note bad'; n.textContent=`"${b.textContent}" does not belong. Look again!`; } }; }
const SG={pip:['See all thirteen stations in one go.','Learn that computers store everything as 0s and 1s.','See that moving data really makes copies.','Learn what cleaning removes and what it keeps.','See how text is cut into tokens and numbered.','Learn why data is split into three boxes.','Feel how a model learns by turning its knobs.','Play the next-word game a model plays.','Learn how examiners test for memorising.','Discover which copies can, and cannot, be deleted.','Tell hand-written rules apart from learning.','Try the job of a human labeller.'],
  quill:['See all eight stops and the crumbs in one go.','Watch a question leave the phone.','Find out what the app packs around your words.','Learn who can peek at your data on the road.','See how your account decides the rule book.','Learn what the inspector pulls aside.','See why answers change each time.','Notice how people create new copies.','Find every copy left behind.','Choose the right house for sensitive data.','Sort data by traffic-light colour.','Keep an AI\'s memory tidy.'],
  dash:['See the agent loop in one go.','Tell an errand apart from a question.','See how an AI finds passages by meaning.','Learn who really presses the button.','Practise giving only the access that is needed.','Watch the context grow on every lap.','Spot a trap hidden in data.','Learn the three keys a leak needs.','Pick the right brake.','Find what an agent leaves behind.','Learn whose words are orders and whose are just information.']};
const CT={myth:['Myth buster','Fact','Read each card. Is it a fact or a myth?'],case:['Detective cases','Case','Read each case and pick what is really going on.'],pop:['Bubble sort','Pop','Pop only the bubbles that fit. Some are tricks!']};
function autoPage(type,items){ const el=document.createElement('div'); el.className='pg'; el.dataset.kind=type==='chal'?'chal':'play'; const sl=document.createElement('div'); sl.className='slot'; sl.dataset.auto=type; sl._items=items; el.appendChild(sl); return {kind:el.dataset.kind,el}; }
const SHAPES=[['1 Sentence',SENT],['2 Tokens','My | cat | Mis | o | sleeps | on | the | warm | laptop | .'],['3 Token IDs','3421 8177 29015 78 51240 322 262 9912 30440 13'],['4 Vectors','ten long lists of numbers, for about a second'],['5 Trace in the weights','a faint nudge spread across billions of knobs']];
const PARTS={pip:[[0,'Pack your backpack'],[4,'The map'],[5,'The data stretch'],[12,'The model stretch'],[16,'Out in the world'],[19,'Wrap-up']],
  quill:[[0,'Get ready'],[4,'The eight stops'],[12,'What stays behind'],[15,'The three houses'],[19,'Wrap-up']],
  dash:[[0,'Get ready'],[4,'The hands'],[10,'In motion'],[14,'Danger and brakes'],[17,'Crumbs, houses and wrap-up']]};
const CHEER=['Nice reading!','You are on a roll!','Keep going, this is the good bit.','Look at you go!','Great stuff.','You are getting good at this.'];

/* pictures */
const VEH={pip:'<span class="wagon"></span>',quill:ic('case','quill',56),dash:`<span class="roll">${ic('wheel','dash',50)}</span>`};
function scene(k,i){ const n=chaps(k).length-1;
  return `<div class="scene" style="--night:${Math.round(i/n*62)}%;--sx:${8+Math.round(i/n*70)}%"><span class="sun"></span><span class="cl" style="--y:18px;--d:38s">${ic('cloud','card',64)}</span><span class="cl" style="--y:58px;--d:55s;animation-delay:-20s">${ic('cloud','card',46)}</span><span class="cl" style="--y:8px;--d:47s;animation-delay:-33s">${ic('cloud','card',52)}</span><span class="hill"></span><span class="hill b"></span><span class="gr"></span><span class="rail"></span><span class="veh">${who(k,64)}${VEH[k]}</span><span class="sign">${i||'Go'}</span></div>`; }
const KEYS=[['cat',/\bcats?\b|miso|pepper|biscuit/g],['laptop',/laptop|computer|device|screen/g],['phone',/phone|app\b|apps\b/g],['server',/server|data cent|warehouse|storage|provider/g],['db',/database|records?\b|dataset/g],['lock',/lock|encrypt|secur|private/g],['key',/\bkeys?\b|permission|access|scope/g],['door',/door|gateway|log ?in|account/g],['scan',/inspect|scan|check|test|exam|review/g],['bot',/model|robot|neural|agent|\bai\b/g],['cut',/token|chop|\bcut|chunk/g],['crumb',/crumb|cop(y|ies)|logs?\b|trace/g],['house',/house|home|public|business|organisation/g],['book',/book|document|librar|read|story|chapter/g],['mail',/mail|message|letter|memory|note/g],['globe',/\bweb\b|internet|world|countr|network/g],['cal',/calendar|schedule|\bdate|week|month/g],['box',/box|bundle|package|backup|suitcase|context/g],['eye',/\bsee\b|watch|monitor|look/g],['wheel',/wheel|loop|\blaps?\b|cycle/g],['bulb',/idea|means|learn|why|question|understand/g],['shield',/\bsafe|protect|guard|risk|danger|brake/g],['bin',/delet|remov|retire|wash|clean/g],['gear',/knob|setting|weight|tool|machine|train/g],['person',/people|person|user|team|human|lina|sara/g],['flag',/station|journey|route|\bmap\b|stop\b|finish/g],['ice',/ice cream/g],['star',/star|reward|win\b|sticker/g]];
const RIB={story:'Story time',words:'New words',where:'Passport check',qa:'Quiz time',dict:'Dictionary'};
function banner(kind,text){ const A=art(cur,ch); if(A) return ''; if(0) return `<div class="pic strip" role="img" aria-label="${esc(ART[cur][ch])}" style="background-image:url(${A});background-position:center ${[30,70,50,15,85][pg%5]}%">${RIB[kind]?`<span class="rib">${RIB[kind]}</span>`:''}</div>`;
  const t=text.toLowerCase(), cols=['pip','quill','dash','sky','card'];
  const top=KEYS.map(k=>[k[0],(t.match(k[1])||[]).length]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]).slice(0,4).map(x=>x[0]); while(top.length<3) top.push(['bulb','star','flag'][top.length]);
  return `<div class="pic">${RIB[kind]?`<span class="rib">${RIB[kind]}</span>`:''}${who(cur,62)}${top.map((n,i)=>ic(n,cols[(i+ORDER.indexOf(cur)+1)%5],i%2?52:66)).join('')}</div>`; }

/* home */
function home(){ reset(); cur=null; show('home');
  if(!q('.bits')){ const bx=document.createElement('div'); bx.className='bits'; bx.setAttribute('aria-hidden','true'); bx.innerHTML=Array.from({length:14},(_,i)=>`<span style="left:${(i*37)%96}%;top:${40+(i*23)%60}%;animation-duration:${6+(i%5)*1.6}s;animation-delay:-${(i*1.3).toFixed(1)}s">${['0','1','01','10','1101','0110'][i%6]}</span>`).join(''); q('.hero').prepend(bx); }
  q('#parade').innerHTML=who('pip',104)+who('quill',104)+who('dash',104)+ic('cat','pip',54);
  q('#doors').innerHTML=ORDER.map((k,i)=>{ const s=STORY[k], n=chaps(k).length, d=Math.min(doneN(k),n);
    if(bookLocked(k)) return `<button class="door locked" data-booklock="${k}" style="--c:var(--${k})">${who(k,84)}<span class="tag">Journey ${i+1} · locked</span><h2>${s.title}</h2><p>${s.sub}</p><p class="meta">${s.blurb}</p><span class="lockbadge">${ic('lock','card',26)}Finish Pip's journey to open this book</span></button>`;
    return `<a class="door" href="#${k}" style="--c:var(--${k})">${who(k,84)}<span class="tag">Journey ${i+1} · the whole book</span><h2>${s.title}</h2><p>${s.sub}</p><p class="meta">${s.blurb}</p><span class="prog"><i style="width:${d/n*100}%"></i></span><p class="meta">${d} of ${n} chapters done · ${(save.stars[k]||[]).length} stars</p><span class="b" style="--c:var(--${k})">${d?(d<n?'Keep going':'Visit again'):'Start'}</span></a>`; }).join('');
  q('#shelf').innerHTML='<h3>Sticker shelf</h3>'+ORDER.map(k=>`<span class="badge ${save.badge[k]?'got':''}">${who(k,44)}${STORY[k].name}</span>`).join('')+`<span class="how">${ORDER.every(k=>save.badge[k])?'All three stickers. You are a data journey master!':'Finish every chapter of a journey to win its sticker.'}</span>`;
  q('#doors').onclick=e=>{ const b=e.target.closest('[data-booklock]'); if(!b) return; S.no(); b.animate([{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'none'}],{duration:350}); toast(`Locked! Finish all ${chaps('pip').length} chapters of "Pip goes to school" first.`); };
  topStars(); }

/* chapter map */
function mapView(k,msg){ reset(); cur=k; show('map'); const s=STORY[k], T=chaps(k), n=T.length, d=Math.min(doneN(k),n), root=q('#map'); root.style.setProperty('--c',`var(--${k})`);
  q('#m-title').textContent=s.title; q('#m-sub').textContent=`${s.sub} · ${(save.stars[k]||[]).length} stars won`;
  const part=(PARTS[k].filter(x=>x[0]<=Math.min(d,n-1)).pop()||[0,''])[1];
  q('#m-scene').innerHTML=mapHero(k,d,n)+`<div class="mapprog"><span class="prog"><i style="width:${Math.round(d/n*100)}%"></i></span><p><b>${d} of ${n} chapters finished.</b> ${d>=n?'Every chapter is done!':`You are in the part called <b>${esc(part)}</b>. Next stop: <b>${esc(short(T[d].dataset.title))}</b>.`}</p></div>`;
  q('#m-next').innerHTML=`<a class="b glow" href="#${d>=n?k+'-end':k+'-'+d}">${d>=n?'Visit your sticker':d?'Continue: '+esc(short(T[d].dataset.title)):'Start the journey'}</a><a class="b alt sm" href="#home">All journeys</a>`+(msg?`<p class="note bad" style="flex-basis:100%;text-align:left">${msg}</p>`:'');
  q('#board').innerHTML=T.map((t,i)=>{ const part=PARTS[k].find(p=>p[0]===i), st=i<d?'done':i===d?'now':unlocked(k,i)?'open':'lock', z=starsIn(k,i);
    const th=art(k,i,1), inner=(th?`<img class="thumb" loading="lazy" src="${th}" alt="">`:'')+`<span class="num">${i||'•'}</span><b>${esc(short(t.dataset.title))}</b><small>${st==='done'?'Done'+(z?` · ${z} star${z>1?'s':''}`:''):st==='now'?'You are here':st==='open'?'Open':'Locked'}</small>${st==='lock'?ic('lock','card',24):st==='now'?who(k,36):st==='done'?ic('star','pip',24):''}`;
    return (part?`<li class="part">${part[1]}</li>`:'')+(st==='lock'?`<li class="st lock"><button data-lock="${i}">${inner}</button></li>`:`<li class="st ${st}"><a href="#${k}-${i}">${inner}</a></li>`); }).join('');
  q('#board').onclick=e=>{ const b=e.target.closest('[data-lock]'); if(!b) return; S.no(); const li=b.parentNode; li.classList.remove('shake'); void li.offsetWidth; li.classList.add('shake');
    mapMsg(`Still locked. Finish "${short(T[d].dataset.title)}" first.`); };
  const tk=q('#t-open'); q('label[for=t-open]').hidden=!(teacherOK||k==='pip'); tk.checked=!!save.open; tk.onchange=()=>{ save.open=tk.checked; keep(); mapView(k); }; topStars(); }
function mapMsg(m){ let n=q('#m-next .note'); if(!n){ n=document.createElement('p'); n.className='note bad'; n.style.cssText='flex-basis:100%;text-align:left'; q('#m-next').appendChild(n); } n.textContent=m; }

/* reader */
const STG={watch:['Watch','eye'],story:['Story','book'],learn:['Learn','bulb'],words:['New words','mail'],check:['Check-in','flag'],chal:['Challenge','star'],dict:['Dictionary','book']};
function openChapter(k,i,start){ cur=k; ch=i; const frag=chaps(k)[i].content.cloneNode(true);
  const raw=qa('.pg',frag).map(el=>({kind:el.dataset.kind||'',el})), list=[]; let ord=false;
  raw.forEach(p=>{ list.push(p);
    if(!ord&&!['qa','words','dict','play','where'].includes(p.kind)){ const ol=q('ol.steps',p.el); if(ol){ const li=qa('li',ol).map(x=>x.textContent); if(li.length>=3&&li.length<=7&&li.every(t=>t.length<240)){ ord=true; list.push(autoPage('order',li)); } } } });
  ((INFO[k]||{})[i]||[]).forEach(([key,img,cap])=>{ const kl=key.toLowerCase(); let at=list.findIndex(x=>x.kind!=='info'&&x.el.querySelector&&x.el.querySelector('h2')&&x.el.querySelector('h2').textContent.toLowerCase().includes(kl)); if(at<0) at=list.findIndex(x=>x.kind!=='info'&&x.el.textContent.toLowerCase().includes(kl)); const hh=x=>{ const e=x&&x.el.querySelector&&x.el.querySelector('h2'); return e?e.textContent.replace(/part \d+ of \d+/i,'').trim():''; }; while(at>=0&&list[at+1]&&hh(list[at])&&hh(list[at+1])===hh(list[at])) at++; const el=document.createElement('div'); el.className='pg'; el.dataset.kind='info';
    el.innerHTML=`<figure class="info"><button class="zoom" aria-label="Show the picture bigger"><img src="img/${img}.webp" alt="${esc(cap)}"></button><figcaption>${esc(cap)}</figcaption></figure>`; list.splice(at<0?1:at+1,0,{kind:'info',el}); });
  const drop=(DROP[k]||{})[i]||[]; for(let j=list.length-1;j>=0;j--) if(drop.includes(list[j].kind)) list.splice(j,1);
  const V=(VIDS[k]||{})[i]; if(V){ Object.keys(V).forEach(key=>{ if(key==='cover'||key==='finish') return; const el=key==='lead'?q('.lead',frag):(list.find(x=>{ const h=x.el.querySelector&&x.el.querySelector('h2'); return h&&h.textContent.trim().startsWith(key); })||{}).el; besideVid(el,V[key]); }); }
  const EV=(ENDVID[k]||{})[i]; if(EV){ const el=document.createElement('div'); el.className='pg endvid'; el.innerHTML=`<h2>${esc(EV[1])}</h2><p>${esc(EV[2])}</p><figure class="vclip"><video src="${EV[0]}.mp4" poster="${EV[0]}.jpg" controls playsinline preload="metadata"></video></figure>`; let at=list.findIndex(x=>['words','where','qa','dict'].includes(x.kind)); if(at<0) at=list.length; list.splice(at,0,{kind:'video',el}); }
  if(CHAL[k]&&CHAL[k][i]&&!drop.includes('chal')) list.push(autoPage('chal')); else if(list.some(x=>x.kind==='dict')) list.push(autoPage('chal'));
  let prevSt='learn'; list.forEach(x=>{ let s={video:'watch',film:'watch',story:'story',words:'words',where:'check',qa:'check',dict:'dict',chal:'chal'}[x.kind]; if(x.kind==='play') s=q('.slot[data-match]',x.el)?'words':prevSt; if(x.kind==='info') s=prevSt; x.stage=s||'learn'; prevSt=x.stage; });
  const FC=(FILMCH[k]||{})[i]; if(FC){ const el=document.createElement('div'); el.className='pg filmpg'; el.innerHTML=`<figure class="vclip vhero"><video src="${FC}.mp4" poster="${FC}.jpg" controls playsinline preload="auto"></video></figure>`; const ld=q('.lead',frag); if(ld){ const lp=document.createElement('div'); lp.className='pg sec'; lp.appendChild(ld); list.unshift({kind:'',el:lp,stage:'learn'}); } list.unshift({kind:'video',el,stage:'watch'}); }
  P=(FC?[]:[{kind:'cover',el:q('.lead',frag)}]).concat(list,[{kind:'finish',el:document.createElement('div')}]);
  P.steps=[...new Set(list.map(x=>x.stage))];
  const wds=list.reduce((a,x)=>a+(x.kind==='play'||x.kind==='chal'||x.kind==='film'?0:x.el.textContent.split(/\s+/).length),0), gms=list.filter(x=>x.kind==='play'||x.kind==='chal').length;
  P.mins=Math.max(2,Math.round(wds/130+gms*1.5));
  pg=start&&start<P.length-1?start:0; show('story'); q('#story').style.setProperty('--c',`var(--${k})`); drawPage(); }
function mount(p){ const s=STORY[cur], box=p.el;
  qa('.slot',box).forEach(sl=>{ const st=document.createElement('div'); st.className='stage'; let ttl, cap, go, key, goal, tag='Game';
    if(sl.dataset.game!=null){ const gi=+sl.dataset.game, g=s.scenes[gi]; tag=gi?'Game':'Movie'; ttl=g.t; cap=g.say; goal=SG[cur][gi]; key=ch+'-g'+gi; go=d=>g.go(st,d); }
    else if(sl.dataset.auto==='film'){ tag='Picture show'; ttl='The chapter in pictures'; goal='See the big idea of this chapter before you read it.'; cap='Watch the show. Tap any picture to see it again.'; key=ch+'-w'; go=d=>filmGame(st,FILM[cur][ch],d); }
    else if(sl.dataset.auto==='chal'&&!(CHAL[cur]&&CHAL[cur][ch])){ const pairs=P.filter(x=>x.kind==='dict').flatMap(x=>qa('.fc',x.el).map(c=>[q('b',c).textContent,q('span',c).firstChild.textContent.trim()])).filter(p=>p[1].length<160); tag='Chapter challenge'; ttl='Dictionary match'; goal='Prove you know the most important words of the whole book.'; cap='Match four words to their meanings. Play again for new words.'; key=ch+'-c'; go=d=>matchGame(st,pairs,d); }
    else if(sl.dataset.auto==='chal'){ const c=CHAL[cur][ch], t=CT[c[0]]; tag='Chapter challenge'; ttl=t[0]; goal=c[1]; cap=t[2]; key=ch+'-c'; go=d=>({myth:mythGame,case:caseGame,pop:popGame})[c[0]](st,c[0]==='pop'?c:c[2],d); }
    else if(sl.dataset.auto==='order'){ ttl='Put it in order'; goal='Remember the steps in the right order.'; cap='Tap the steps one by one, starting with the first.'; key=ch+'-aorder'; go=d=>orderGame(st,sl._items,d); }
    else if(sl.dataset.match){ const prev=P[pg-1], pairs=prev?qa('.fc',prev.el).map(c=>[q('b',c).textContent,q('span',c).textContent]):[]; tag='Word game'; ttl='Word match'; goal="Remember this chapter's new words."; cap='Tap a word, then tap its meaning. They are shuffled every time.'; key=ch+'-m'; go=d=>matchGame(st,pairs,d); }
    else { tag='Look'; ttl="Pip's five shapes"; goal='See the five shapes Pip takes on the journey.'; cap='From something anyone can read to something nobody can.'; go=()=>{ if(cur==='pip'){ st.innerHTML=`<figure class="info" style="box-shadow:none"><button class="zoom" aria-label="Show the picture bigger"><img src="img/info-shapes.webp" alt="Pip's five shapes: sentence, tokens, token IDs, vectors and a trace in the weights."></button></figure>`; return; } st.innerHTML=SHAPES.map((x,i)=>`<div class="tile ${i===4?'on':''}" style="max-width:none;width:100%"><b>${x[0]}</b><span class="${i>0&&i<3?'mono':''}">${x[1]}</span></div>`).join(''); }; }
    const won=key&&(save.stars[cur]||[]).includes(key);
    sl.innerHTML=`<div class="ghead"><span class="gtag">${ic(tag==='Chapter challenge'?'star':tag==='Movie'?'eye':'gear','pip',20)}${tag}${won?' · star won':''}</span><p class="play-h">${esc(ttl)}</p><p class="goal">${ic('flag','quill',24)}<span><b>Goal:</b> ${esc(goal)}</span></p><p class="play-c">${cap}</p></div>`; sl.appendChild(st); go(()=>{ award(key,st); q('#next').classList.add('glow'); }); }); }

function trail(){ const S2=P.steps, cs=P[pg].stage, ci=P[pg].kind==='finish'?S2.length:P[pg].kind==='cover'?-1:S2.indexOf(cs);
  return S2.map((s,si)=>{ const idx=P.map((x,i)=>x.stage===s?i:-1).filter(i=>i>=0), state=si<ci?'done':si===ci?'now':'todo';
    return `<li class="${state}"><button class="sbtn" data-p="${idx[0]}" aria-label="Go to step ${si+1}: ${STG[s][0]}"><span class="dot">${state==='done'?ic('star','pip',22):ic(STG[s][1],state==='now'?'card':'card',22)}</span><b>${STG[s][0]}</b></button>${state==='now'&&idx.length>1?`<span class="mini">${idx.map(i=>`<button data-p="${i}" class="${i<pg?'past':i===pg?'here':''}" aria-label="Page ${idx.indexOf(i)+1} of ${idx.length} in this step"></button>`).join('')}</span>`:''}</li>`; }).join('')
    +`<li class="fin ${ci>=S2.length?'now':''}"><span class="dot">${ic('key','pip',22)}</span><b>${ch===chaps(cur).length-1?'Sticker':'Unlock'}</b></li>`; }
function drawPage(){ reset(); const s=STORY[cur], T=chaps(cur), n=P.length, p=P[pg], box=q('#chapter'), t=T[ch], next=q('#next'), prev=q('#prev'), last=ch===T.length-1;
  save.pos[cur]=[ch,pg]; keep(); topStars(); q('#tomap').href='#'+cur; q('#s-who').innerHTML=who(cur,72);
  q('#s-title').textContent=t.dataset.title; q('#s-step').textContent=`${s.title} · ${ch?`chapter ${ch} of ${T.length-1}`:'the beginning'}`;
  q('#pbar').innerHTML=`<ol class="trail">${trail()}</ol>`;
  next.classList.remove('glow'); prev.textContent=pg?'Back':'Map'; box.onclick=null; let say='';
  const goal=last?'win the '+s.name+' sticker':`unlock "${esc(short(T[ch+1].dataset.title))}"`;
  if(p.kind==='cover'){ const VV=(VIDS[cur]||{})[ch]; const A=art(cur,ch); if(VV&&VV.cover) q('#pic').innerHTML=vclip(VV.cover).replace('<figure class="vclip"','<figure class="vclip vhero"'); else q('#pic').innerHTML=A?`<figure class="artf"><img src="${A}" alt="${esc(ART[cur][ch])}"></figure>`:scene(cur,ch); box.replaceChildren(p.el);
    say=`<b>This chapter has ${P.steps.length} steps:</b> ${P.steps.map(x=>STG[x][0]).join(' → ')}.<br>It takes about ${P.mins} minutes. Finish every step to ${goal}!`; next.textContent="Let's go!"; next.classList.add('glow'); }
  else if(p.kind==='finish'){ if(doneN(cur)<=ch){ save.done[cur]=ch+1; keep(); pushNow(); } const g0=save.stars[cur]=save.stars[cur]||[]; if(!g0.includes(ch+'-done')){ g0.push(ch+'-done'); keep(); topStars(); } const z=starsIn(cur,ch);
    p.el.className='stage fin'; p.el.innerHTML=`<div class="burst"></div>${who(cur,110)}<h2 style="font-size:34px">${ch?'Chapter '+ch:'The beginning'} complete!</h2><p class="big">${z} star${z===1?'':'s'} from this chapter · ${Math.min(doneN(cur),T.length)} of ${T.length} chapters done</p>${last?'<p class="note good">That was the last chapter. Your sticker is waiting!</p>':`<p class="unl">${ic('key','pip',30)}<span>Unlocked: <b>${esc(T[ch+1].dataset.title)}</b></span></p>`}<a class="b alt sm" href="#${cur}">Back to the map</a>`;
    q('#pic').innerHTML=''; { const VV=(VIDS[cur]||{})[ch]; if(VV&&VV.finish) p.el.insertAdjacentHTML('beforeend',vclip(VV.finish)); } box.replaceChildren(p.el); confetti(p.el); S.yay(); say=last?'<b>You did it!</b> You finished the whole book.':'<b>Brilliant!</b> The next chapter is open now. Keep the streak going!'; next.textContent=last?'Claim your sticker':'Open the next chapter'; next.classList.add('glow'); }
  else { q('#pic').innerHTML=p.kind==='play'||p.kind==='chal'||p.kind==='film'||p.kind==='info'||p.kind==='video'?'':banner(p.kind,p.el.textContent); box.replaceChildren(p.el); p.el.classList.remove('flyin'); void p.el.offsetWidth; p.el.classList.add('flyin'); mount(p);
    const si=P.steps.indexOf(p.stage), idx=P.map((x,i)=>x.stage===p.stage?i:-1).filter(i=>i>=0), lastIn=idx[idx.length-1]===pg, nx=P.steps[si+1];
    const intro={video:(p.el.classList&&p.el.classList.contains('endvid'))?'Quick recap video! (Press play if it does not start by itself.) Then the new words.':'Watch Pip\'s welcome film! (Press play if it does not start by itself.) Then read on.',info:'Picture this! Tap the picture to see it bigger.',film:'Watch the picture show first!',story:'Story time!',words:'New words! Tap a card to flip it.',where:`Passport check: where is ${s.name} now?`,qa:'Say your answer out loud, then peek.',dict:'Tap any word to see what it means.',play:'Play time! Win a star.',chal:'A brand-new game with its own goal. Win the chapter star!'}[p.kind]||CHEER[(ch+pg)%CHEER.length];
    say=`<b>Step ${si+1} of ${P.steps.length}: ${STG[p.stage][0]}.</b> ${intro} ${pg===n-2?`<span class="up">Last page! Then you ${goal}.</span>`:lastIn&&nx?`<span class="up">Next up: ${STG[nx][0]}.</span>`:''}`;
    next.textContent=pg===n-2?'Finish chapter':lastIn&&nx?'Next step':'Next';
    box.onclick=e=>{ const fc=e.target.closest('.fc'), rv=e.target.closest('.reveal'), zm=e.target.closest('.zoom');
      if(zm){ const o=document.createElement('div'); o.className='lightbox'; o.innerHTML=zm.innerHTML+'<span class="b sm">Close</span>'; o.onclick=()=>o.remove(); document.body.appendChild(o); S.pop(); }
      if(fc){ fc.classList.toggle('open'); S.pop(); }
      if(rv){ const a=rv.nextElementSibling; a.hidden=!a.hidden; rv.textContent=a.hidden?'Show the answer':'Hide the answer'; S.tick(); const set=rv.closest('.qas'); if(!set.dataset.done&&qa('.aa',set).every(x=>!x.hidden)){ set.dataset.done=1; award(ch+'-q'+pg,box.firstElementChild); next.classList.add('glow'); } } }; }
  const sb=q('#s-say'); sb.innerHTML=say; sb.classList.remove('popin'); void sb.offsetWidth; sb.classList.add('popin'); updEdit(); window.scrollTo(0,0);
  if(p.kind==='video'){ const v=q('video',p.el); v.onended=()=>{ next.classList.add('glow'); S.yay(); }; const pr=v.play(); if(pr&&pr.catch) pr.catch(()=>{ v.muted=false; }); cleanup.push(()=>v.pause()); } }
function endView(k){ reset(); cur=k; ch=chaps(k).length; P=[]; show('story'); const s=STORY[k], root=q('#story'), box=q('#chapter'), st=document.createElement('div'), nk=ORDER[ORDER.indexOf(k)+1]; root.style.setProperty('--c',`var(--${k})`);
  save.badge[k]=1; keep(); q('#tomap').href='#'+k; q('#s-who').innerHTML=who(k,72); q('#s-title').textContent=s.title; q('#s-step').textContent='The end'; q('#pbar').innerHTML=''; q('#pic').innerHTML=scene(k,ch-1);
  st.className='stage'; st.innerHTML=`${who(k,120)}<h2 style="font-size:34px">You won the ${s.name} sticker!</h2><p class="big">${(save.stars[k]||[]).length} stars on this journey.</p><div class="quiz" id="qz"></div><p class="note" id="qn">Three quick questions to finish.</p>`; box.replaceChildren(st); box.onclick=null;
  confetti(st); S.yay(); quiz(q('#qz',st),s.quiz,r=>{ const n=q('#qn',st); n.className='note good'; n.textContent=r===3?'Three out of three. Brilliant!':`${r} out of 3. Visit the map to reread any chapter.`; confetti(st); });
  q('#s-say').textContent=nk?`That was my whole book! Next up: ${STORY[nk].name}.`:'That was the last journey. You now know where data goes: when AI is built, used and put to work.';
  q('#prev').textContent='Map'; const next=q('#next'); next.textContent=nk?`Next journey: ${STORY[nk].name}`:'Back to the start'; next.classList.add('glow'); }

function route(){ const m=location.hash.slice(1).match(/^(pip|quill|dash)(?:-(\d+|end))?$/); if(!m) return home(); const k=m[1], T=chaps(k);
  if(bookLocked(k)){ home(); toast(`That book is locked. Finish "Pip goes to school" first.`); return; }
  if(m[2]==null) return mapView(k);
  if(m[2]==='end') return (save.open||doneN(k)>=T.length)?endView(k):mapView(k,'Finish every chapter to claim the sticker.');
  const i=+m[2]; if(i>=T.length) return mapView(k);
  if(!unlocked(k,i)) return mapView(k,`That chapter is still locked. Finish "${short(T[doneN(k)].dataset.title)}" first.`);
  const pos=save.pos[k]; openChapter(k,i,pos&&pos[0]===i?pos[1]:0); }
function step(d){ if(!cur||q('#story').hidden) return; const T=chaps(cur);
  if(ch>=T.length){ if(d>0){ const nk=ORDER[ORDER.indexOf(cur)+1]; location.hash=nk||'home'; } else location.hash=cur; return; }
  if(d<0){ if(pg>0){ pg--; S.step(); drawPage(); } else location.hash=cur; return; }
  if(pg<P.length-1){ pg++; S.step(); drawPage(); } else location.hash=ch===T.length-1?cur+'-end':cur+'-'+(ch+1); }
q('#prev').onclick=()=>step(-1); q('#next').onclick=()=>step(1);
q('#pbar').onclick=e=>{ const b=e.target.closest('button'); if(b){ pg=+b.dataset.p; S.pop(); drawPage(); } };
document.addEventListener('keydown',e=>{ if(/INPUT|TEXTAREA/.test(e.target.tagName)) return; if(e.key==='ArrowRight') step(1); if(e.key==='ArrowLeft') step(-1); });
const tgl=(id,fn)=>{ const b=q(id); b.onclick=()=>{ const on=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',on); fn(on); }; };
tgl('#t-sfx',on=>{ sfxOn=on; if(on) S.pop(); });
tgl('#t-music',on=>music(on));

window.addEventListener('hashchange',route);

/* ---------- players: nickname + password, progress saved for next time ---------- */
let player=null, teacherOK=false;
const slug=n=>n.trim().toLowerCase().replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,24);
const rnd=()=>[...crypto.getRandomValues(new Uint8Array(16))].map(b=>b.toString(16).padStart(2,'0')).join('');
async function pbkdf(pw,salt){ const enc=new TextEncoder(), key=await crypto.subtle.importKey('raw',enc.encode(pw),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:enc.encode(salt),iterations:120000,hash:'SHA-256'},key,256); return [...new Uint8Array(bits)].map(b=>b.toString(16).padStart(2,'0')).join(''); }
const lsGet=k=>{ try{ return JSON.parse(localStorage.getItem(k)||'null'); }catch(e){ return null; } }, lsSet=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} };
const dbReady=(async()=>{ try{ if(window.PQD_SUPA||!window.claude||!window.claude.use) return null; const [d,u]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
  if(u){ try{ teacherOK=!!(await u.isOwner())||!!(await u.canEdit()); }catch(e){} if(d){ try{ if((await u.can('data.write'))===false) return null; }catch(e){} } } return d; }catch(e){ return null; } })();
function mergeSave(a,b){ a=Object.assign(freshSave(),a||{}); b=b||{}; const o=freshSave(); o.open=!!a.open;
  [...new Set(Object.keys(a.done).concat(Object.keys(b.done||{})))].forEach(k=>o.done[k]=Math.max(a.done[k]||0,(b.done||{})[k]||0));
  [...new Set(Object.keys(a.stars).concat(Object.keys(b.stars||{})))].forEach(k=>o.stars[k]=[...new Set((a.stars[k]||[]).concat((b.stars||{})[k]||[]))]);
  [...new Set(Object.keys(a.badge).concat(Object.keys(b.badge||{})))].forEach(k=>{ if(a.badge[k]||(b.badge||{})[k]) o.badge[k]=1; });
  o.pos=Object.assign({},b.pos||{},a.pos); return o; }
keep=()=>{ if(!player) return; save.t=Date.now(); lsSet('pqd3:p:'+player.id,save); if(player.remote){ clearTimeout(keep.t); keep.t=setTimeout(pushRemote,2500); } };
function pushNow(){ if(player&&player.remote){ clearTimeout(keep.t); pushRemote(); } }
async function pushRemote(){ if(!player||!player.remote) return; if(pushRemote.busy){ pushRemote.again=true; return; } pushRemote.busy=true;
  try{ const snap=await player.ref.get(); const remote=snap.exists?snap.data().progress:null; const m=mergeSave(save,remote); m.t=save.t; save=m; lsSet('pqd3:p:'+player.id,save);
      await player.ref.update({progress:JSON.parse(JSON.stringify(save)),updated:Date.now()}); pushRemote.fails=0; }
  catch(e){ if(e&&e.code==='invalid_argument'){ player.remote=false; toast('Progress is now saved on this device only.'); } else { pushRemote.fails=(pushRemote.fails||0)+1; clearTimeout(keep.t); keep.t=setTimeout(pushRemote,Math.min(60000,4000*pushRemote.fails)); } }
  pushRemote.busy=false; if(pushRemote.again){ pushRemote.again=false; pushRemote(); } }
function begin(id,nick,prog,remote,ref,hash,msg){ player={id,nick,remote,ref,hash}; if(!window.PQD_SUPA&&id==='saeideh') teacherOK=true; save=mergeSave(prog,lsGet('pqd3:p:'+id)); if(remote) setTimeout(pushNow,400); lsSet('pqd3:me',{id,nick,hash}); lsSet('pqd3:p:'+id,save);
  const g=q('#gate'); if(g) g.hidden=true; const c=q('#who-btn'); c.hidden=false; c.textContent=nick+' · switch player'; route(); toast(msg); updAsk(); }
async function signIn(nick,pass){ if(window.PQD_SUPA) return sbSignIn(nick,pass); const id=slug(nick); nick=nick.trim().slice(0,20);
  if(id.length<2) throw 'Pick a nickname with at least 2 letters or numbers.'; if(pass.length<4) throw 'Pick a password with at least 4 characters.';
  const db=await dbReady;
  if(db){ try{ const ref=db.doc('players/'+id); let snap=await ref.get();
      if(snap.exists&&snap.data().hash){ const d=snap.data(), h=await pbkdf(pass,d.salt); if(h!==d.hash) throw 'That password does not match this nickname. Try again, or choose a different nickname.'; return begin(id,d.nick||nick,d.progress,true,ref,h,`Welcome back, ${d.nick||nick}! Carry on where you stopped.`); }
      const lease=await ref.acquire({holder:id+'-'+rnd(),ttlMs:6000}); if(!lease.acquired) throw 'Someone is creating that nickname right now. Please choose another one.';
      snap=await ref.get(); if(snap.exists&&snap.data().hash) throw 'That nickname was just taken. Please choose another one.';
      const salt=rnd(), h=await pbkdf(pass,salt), prog=freshSave(); await ref.set({nick,salt,hash:h,progress:prog,created:Date.now(),updated:Date.now()});
      return begin(id,nick,prog,true,ref,h,`Hello, ${nick}! Your journey starts now.`);
    }catch(e){ if(typeof e==='string') throw e; if(!(e&&(e.code==='invalid_argument'||e.code==='not_granted'))) throw 'Could not reach the save box. Please try again in a moment.'; } }
  const acct=lsGet('pqd3:acct:'+id);
  if(acct){ const h=await pbkdf(pass,acct.salt); if(h!==acct.hash) throw 'That password does not match this nickname.'; return begin(id,nick,lsGet('pqd3:p:'+id),false,null,h,`Welcome back, ${nick}!`); }
  const salt=rnd(), h=await pbkdf(pass,salt); lsSet('pqd3:acct:'+id,{salt,hash:h}); return begin(id,nick,freshSave(),false,null,h,`Hello, ${nick}! Progress is saved on this device.`); }
async function autoSignIn(){ if(window.PQD_SUPA) return sbAuto(); const me=lsGet('pqd3:me'); if(!me||!me.id||!me.hash) return false; const db=await dbReady;
  if(db){ try{ const ref=db.doc('players/'+me.id), snap=await ref.get(); if(snap.exists&&snap.data().hash===me.hash){ const d=snap.data(); begin(me.id,d.nick||me.nick,d.progress,true,ref,me.hash,`Welcome back, ${d.nick||me.nick}!`); return true; } }catch(e){} }
  const acct=lsGet('pqd3:acct:'+me.id); if(acct&&acct.hash===me.hash){ begin(me.id,me.nick,lsGet('pqd3:p:'+me.id),false,null,me.hash,`Welcome back, ${me.nick}!`); return true; } return false; }
function showGate(){ let g=q('#gate'); if(!g){ g=document.createElement('div'); g.id='gate'; g.className='gate';
    g.innerHTML=`<form class="gcard" id="gform" novalidate><div class="row" style="justify-content:flex-start">${who('pip',58)}${who('quill',58)}${who('dash',58)}</div><h2>Who is playing?</h2><p>Choose a nickname and a secret password. Use the same ones next time to carry on exactly where you stopped.</p>
      <label for="g-nick">Nickname</label><input id="g-nick" autocomplete="username" maxlength="20" placeholder="for example: SpaceCat">
      <label for="g-pass">Password</label><input id="g-pass" type="password" autocomplete="current-password" maxlength="60" placeholder="at least 4 characters">
      <p class="note bad" id="g-err" aria-live="polite"></p><button class="b" id="g-go" type="submit">Let's play!</button>
      <p class="gsmall" id="g-mode">Getting the save box ready…</p><p class="gsmall">Do not use a password you use anywhere else.</p></form>`;
    document.body.appendChild(g);
    dbReady.then(d=>{ q('#g-mode').textContent=(d||window.PQD_SUPA)?'Your progress is saved to this site, so you can carry on from any device.':'Your progress will be saved in this browser on this device.'; });
    q('#gform').onsubmit=async e=>{ e.preventDefault(); const btn=q('#g-go'), err=q('#g-err'); btn.disabled=true; btn.textContent='Checking…'; err.textContent='';
      try{ await signIn(q('#g-nick').value,q('#g-pass').value); S.yay(); }catch(x){ err.textContent=typeof x==='string'?x:'Something went wrong. Please try again.'; S.no(); }
      btn.disabled=false; btn.textContent="Let's play!"; }; }
  g.hidden=false; q('#g-pass').value=''; later(()=>q('#g-nick').focus(),50); }
(()=>{ const c=document.createElement('button'); c.className='tg'; c.id='who-btn'; c.hidden=true; q('#t-sfx').before(c);
  c.onclick=()=>{ clearTimeout(keep.t); if(player&&player.remote) pushRemote(); player=null; teacherOK=false; updAsk(); try{ localStorage.removeItem('pqd3:me'); }catch(e){} save=freshSave(); c.hidden=true; location.hash='home'; showGate(); }; })();
/* ---------- owner-only: suggest an edit, saved for Claude to apply ---------- */
function pageText(el){ const c=el.cloneNode(true); qa('button.reveal,.slot>.stage',c).forEach(x=>x.remove()); qa('[hidden]',c).forEach(x=>x.hidden=false);
  const h=document.createElement('div'); h.style.cssText='position:absolute;left:-9999px;top:0;width:700px'; h.appendChild(c); document.body.appendChild(h); const t=h.innerText.replace(/\n{3,}/g,'\n\n').trim(); h.remove(); return t; }
function updEdit(){ let b=q('#edit-btn'); if(!b){ b=document.createElement('button'); b.id='edit-btn'; b.className='editfab'; b.innerHTML=ic('pen','pip',24)+'<span>Suggest an edit</span>'; b.onclick=openEdit; document.body.appendChild(b); }
  b.hidden=!(teacherOK&&cur&&!q('#story').hidden&&P[pg]&&P[pg].kind!=='finish'&&ch<chaps(cur).length); }
function openEdit(){ const p=P[pg], T=chaps(cur), where=`${STORY[cur].title} · ${T[ch].dataset.title} · page ${pg+1}`, before=p.kind==='cover'?p.el.innerText.trim():pageText(p.el);
  let g=q('#edit'); if(!g){ g=document.createElement('div'); g.id='edit'; g.className='gate'; document.body.appendChild(g); }
  g.innerHTML=`<form class="gcard wide" id="eform"><div class="row" style="justify-content:flex-start">${ic('pen','pip',40)}<h2>Suggest an edit</h2></div>
    <p>Change the words below exactly the way you want them. Your change is saved here, and Claude applies it to the book and the website when you ask.</p>
    <p class="gsmall">${esc(where)}</p>
    <label for="e-txt">The text on this page</label><textarea id="e-txt" rows="12"></textarea>
    <label for="e-note">A note for Claude (optional)</label><input id="e-note" maxlength="400" placeholder="for example: make this simpler, or add an example">
    <p class="note bad" id="e-msg" aria-live="polite"></p>
    <div class="row" style="justify-content:flex-start"><button class="b" type="submit" id="e-go">Save my edit</button><button class="b alt" type="button" id="e-x">Cancel</button></div></form>`;
  q('#e-txt').value=before; g.hidden=false; later(()=>q('#e-txt').focus(),50);
  q('#e-x').onclick=()=>{ g.hidden=true; };
  q('#eform').onsubmit=async e=>{ e.preventDefault(); const after=q('#e-txt').value.trim(), note=q('#e-note').value.trim(), m=q('#e-msg'), btn=q('#e-go');
    if(after===before&&!note){ m.textContent='Nothing has changed yet. Edit the text or write a note.'; return; }
    btn.disabled=true; btn.textContent='Saving…'; const db=await dbReady;
    try{ if(window.PQD_SUPA){ const ok=await rpc('pqd_edit',{p_id:player.id,p_hash:player.hash,p_book:cur,p_chapter:ch,p_title:T[ch].dataset.title,p_page:pg+1,p_kind:p.kind||'text',p_before:before,p_after:after,p_note:note}); if(!ok) throw 0; } else { if(!db) throw 0; await db.doc('edits/'+Date.now()+'-'+rnd().slice(0,6)).set({book:cur,chapter:ch,chapterTitle:T[ch].dataset.title,page:pg+1,kind:p.kind||'text',before,after,note,by:player?player.nick:'',at:Date.now(),status:'new'}); }
      g.hidden=true; S.yay(); toast('Saved! When you are ready, tell Claude: "apply my website edits".'); }
    catch(x){ m.textContent='Could not save here. Copy your new text and paste it to Claude instead.'; q('#e-txt').select(); }
    btn.disabled=false; btn.textContent='Save my edit'; }; }
dbReady.then(()=>{ if(cur) updEdit(); });
document.addEventListener('visibilitychange',async()=>{ if(!player) return;
  if(document.hidden){ pushNow(); return; }
  if(player.remote){ try{ const snap=await player.ref.get(); if(snap.exists){ const before=JSON.stringify([save.done,save.stars]); save=mergeSave(save,snap.data().progress); if(JSON.stringify([save.done,save.stars])!==before&&q('#story').hidden) route(); topStars(); } }catch(e){} } });
window.addEventListener('pagehide',pushNow);
route();
autoSignIn().then(ok=>{ if(!ok) showGate(); });
