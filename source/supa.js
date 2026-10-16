/* ---------- Supabase backend (used when hosted outside Claude) ---------- */
const SUPA=window.PQD_SUPA||null;
async function rpc(fn,args){ const r=await fetch(SUPA.url+'/rest/v1/rpc/'+fn,{method:'POST',headers:{'Content-Type':'application/json',apikey:SUPA.key,Authorization:'Bearer '+SUPA.key},body:JSON.stringify(args)});
  if(!r.ok) throw {code:'net',status:r.status}; const t=await r.text(); return t?JSON.parse(t):null; }
function sbRef(id,hash){ return { get:async()=>{ const d=await rpc('pqd_login',{p_id:id,p_hash:hash}); return {exists:!!d,data:()=>d}; },
  update:async o=>{ const ok=await rpc('pqd_save',{p_id:id,p_hash:hash,p_progress:o.progress}); if(!ok) throw {code:'net'}; } }; }
async function sbSignIn(nick,pass){ const id=slug(nick); nick=nick.trim().slice(0,20);
  if(id.length<2) throw 'Pick a nickname with at least 2 letters or numbers.'; if(pass.length<4) throw 'Pick a password with at least 4 characters.';
  let salt; try{ salt=await rpc('pqd_salt',{p_id:id}); }catch(e){ throw 'Could not reach the save box. Check your internet and try again.'; }
  if(salt){ const h=await pbkdf(pass,salt), d=await rpc('pqd_login',{p_id:id,p_hash:h}); if(!d) throw 'That password does not match this nickname. Try again, or choose a different nickname.';
    teacherOK=!!d.owner; return begin(id,d.nick||nick,d.progress,true,sbRef(id,h),h,`Welcome back, ${d.nick||nick}! Carry on where you stopped.`); }
  const s=rnd(), h=await pbkdf(pass,s), r=await rpc('pqd_signup',{p_id:id,p_nick:nick,p_salt:s,p_hash:h,p_progress:freshSave()});
  if(!r||r.error) throw r&&r.error==='taken'?'That nickname was just taken. Please choose another one.':'The save box is busy. Please try again in a minute.';
  teacherOK=false; return begin(id,nick,r.progress,true,sbRef(id,h),h,`Hello, ${nick}! Your journey starts now.`); }
async function sbAuto(){ const me=lsGet('pqd3:me'); if(!me||!me.id||!me.hash) return false;
  try{ const d=await rpc('pqd_login',{p_id:me.id,p_hash:me.hash}); if(!d) return false; teacherOK=!!d.owner; begin(me.id,d.nick||me.nick,d.progress,true,sbRef(me.id,me.hash),me.hash,`Welcome back, ${d.nick||me.nick}!`); return true; }
  catch(e){ begin(me.id,me.nick,lsGet('pqd3:p:'+me.id),true,sbRef(me.id,me.hash),me.hash,`Welcome back, ${me.nick}! (offline for now)`); return true; } }

/* ---------- questions: everyone can ask, the owner reads them ---------- */
function where(){ if(cur&&!q('#story').hidden&&ch<chaps(cur).length) return {book:cur,chapter:ch,title:chaps(cur)[ch].dataset.title,page:pg+1};
  if(cur) return {book:cur,chapter:-1,title:STORY[cur].title+' (map)',page:0}; return {book:'',chapter:-1,title:'Home page',page:0}; }
async function saveQuestion(text){ const w=where();
  if(SUPA){ if(!player||!player.hash) throw 0; const ok=await rpc('pqd_ask',{p_id:player.id,p_hash:player.hash,p_book:w.book,p_chapter:w.chapter,p_title:w.title,p_page:w.page,p_question:text}); if(!ok) throw 0; return; }
  const db=await dbReady; if(!db) throw 0; await db.doc('questions/'+Date.now()+'-'+rnd().slice(0,6)).set({nick:player?player.nick:'',book:w.book,chapter:w.chapter,chapterTitle:w.title,page:w.page,question:text,status:'new',at:Date.now()}); }
async function loadInbox(){ if(SUPA) return (await rpc('pqd_inbox',{p_id:player.id,p_hash:player.hash})||[]).map(x=>({id:x.id,nick:x.nick,title:x.chapter_title,page:x.page,question:x.question,status:x.status,at:Date.parse(x.created)}));
  const db=await dbReady, s=await db.collection('questions').get(); return s.docs.map(d=>{ const x=d.data(); return {id:d.id,nick:x.nick,title:x.chapterTitle,page:x.page,question:x.question,status:x.status,at:x.at}; }).sort((a,b)=>b.at-a.at); }
async function markQ(id,st){ if(SUPA) return rpc('pqd_mark',{p_id:player.id,p_hash:player.hash,p_qid:id,p_status:st}); const db=await dbReady; return db.doc('questions/'+id).update({status:st}); }
function modal(id,html){ let g=q('#'+id); if(!g){ g=document.createElement('div'); g.id=id; g.className='gate'; document.body.appendChild(g); } g.innerHTML=html; g.hidden=false; g.onclick=e=>{ if(e.target===g||e.target.closest('[data-x]')) g.hidden=true; }; return g; }
function openAsk(){ const w=where();
  const g=modal('ask',`<form class="gcard wide" id="aform"><div class="row" style="justify-content:flex-start">${who(cur||'pip',48)}<h2>Ask a question</h2></div>
    <p>Stuck on something, or curious? Write your question. Saeideh collects all the questions and answers them in the team meeting.</p>
    <p class="gsmall">You are on: ${esc(w.title)}${w.page?' · page '+w.page:''}</p>
    <label for="a-txt">Your question</label><textarea id="a-txt" rows="5" maxlength="2000" placeholder="for example: What is the difference between a token and a word?"></textarea>
    <p class="note" id="a-msg" aria-live="polite"></p>
    <div class="row" style="justify-content:flex-start"><button class="b" type="submit" id="a-go">Send my question</button><button class="b alt" type="button" data-x>Close</button></div></form>`);
  later(()=>q('#a-txt').focus(),50);
  q('#aform').onsubmit=async e=>{ e.preventDefault(); const t=q('#a-txt').value.trim(), m=q('#a-msg'), b=q('#a-go'); if(t.length<3){ m.className='note bad'; m.textContent='Write your question first.'; return; }
    b.disabled=true; b.textContent='Sending…'; try{ await saveQuestion(t); S.yay(); m.className='note good'; m.textContent='Thank you! Your question is saved. Ask another one any time.'; q('#a-txt').value=''; }
    catch(x){ S.no(); m.className='note bad'; m.textContent='Could not send it right now. Please try again in a moment.'; } b.disabled=false; b.textContent='Send my question'; }; }
async function openInbox(){ const g=modal('inbox',`<div class="gcard wide"><div class="row" style="justify-content:space-between"><h2>Questions from learners</h2><button class="b alt sm" data-x>Close</button></div><div id="ib-list"><p class="note">Loading…</p></div></div>`);
  const draw=async()=>{ const L=q('#ib-list',g); let rows; try{ rows=await loadInbox(); }catch(e){ L.innerHTML='<p class="note bad">Could not load the questions.</p>'; return; }
    const n=rows.filter(r=>r.status!=='answered').length;
    L.innerHTML=`<p class="gsmall">${rows.length} question${rows.length===1?'':'s'} · ${n} still to answer</p>`+(rows.length?rows.map(r=>`<div class="qrow ${r.status==='answered'?'done':''}"><p class="qq">${esc(r.question)}</p><p class="gsmall">${esc(r.nick||'?')} · ${esc(r.title||'')}${r.page?' · page '+r.page:''} · ${new Date(r.at).toLocaleString()}</p><button class="b sm ${r.status==='answered'?'alt':''}" data-q="${esc(String(r.id))}" data-s="${r.status==='answered'?'new':'answered'}">${r.status==='answered'?'Mark as not answered':'Mark as answered'}</button></div>`).join(''):'<p class="note">No questions yet.</p>'); };
  g.addEventListener('click',async e=>{ const b=e.target.closest('[data-q]'); if(!b) return; b.disabled=true; try{ await markQ(SUPA?+b.dataset.q:b.dataset.q,b.dataset.s); }catch(x){} draw(); }); draw(); }
function updAsk(){ let a=q('#ask-btn'); if(!a){ a=document.createElement('button'); a.id='ask-btn'; a.className='askfab'; a.innerHTML='<span class="qm">?</span><span>Ask a question</span>'; a.onclick=openAsk; document.body.appendChild(a); }
  a.hidden=!player; let i=q('#inbox-btn'); if(!i){ i=document.createElement('button'); i.id='inbox-btn'; i.className='tg'; i.textContent='Questions inbox'; i.onclick=openInbox; q('#t-sfx').before(i); } i.hidden=!(player&&teacherOK); }
