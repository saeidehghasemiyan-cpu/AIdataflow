/* ---------- picture shows: one animated infographic per chapter ----------
   each frame: 'icon|label|caption' */
const FILM={
pip:[
['book|One sentence|We follow just one sentence: Pip.','cat|About a cat|Lina writes: "My cat Miso sleeps on the warm laptop."','server|13 stations|Pip will visit thirteen stations on the way to an AI.','bot|Inside an AI|At the end, Pip becomes a tiny nudge inside a model.'],
['laptop|Lina types|Lina types her sentence and presses Publish.','gear|Switches|A computer only has switches: off and on.','box|0s and 1s|Every letter becomes 8 switches, like 01001101.','cal|Metadata|Facts about the post are saved too: when, where, which device.'],
['laptop|At home|Pip is born on Lina\'s laptop.','lock|Locked road|HTTPS locks Pip in an envelope while it travels.','server|Server|A copy lands on the website\'s server.','crumb|Copies|Moving is really copying. The old copy stays behind.'],
['book|Examples|Instead of rules, we show the machine examples.','gear|Weights|It turns billions of knobs called weights.','bulb|Patterns|It finds patterns: what word usually comes next?','bot|A model|The finished file of knobs is the model.'],
['flag|Plan|The journey starts with a plan.','db|Data stretch|Collect, store, wash, label, number and split the data.','gear|Model stretch|School, factory, finishing school and exams.','globe|Out in the world|Move in, watch over it, and finally say goodbye.'],
['person|People meet|Engineers, lawyers and privacy experts meet.','bulb|What for?|They decide what the AI is for.','shield|Only what we need|They choose what data they need, and what to avoid.','book|Written down|Every decision is written in documents.'],
['globe|The web|Billions of public pages exist.','eye|Crawler|A crawler visits pages and copies them.','cat|Pip is copied|At 3 a.m. Lina\'s post is copied too.','person|Nobody asked|Lina was never asked. Opt-outs and rules matter.'],
['server|Warehouse|All the raw copies land in a giant warehouse.','book|Catalogue|A catalogue lists what is inside.','lock|Locks|Only some people may get in.','cal|Leaving date|Raw data should not stay forever.'],
['db|Raw pile|Pip arrives in a pile full of adverts and repeats.','bin|Remove junk|Repeats, adverts and broken text are washed out.','shield|Hide personal bits|Phone numbers and emails are removed.','star|Clean text|Clean, useful writing comes out of the wash.'],
['person|Labellers|People add stickers to examples.','star|Ground truth|Trusted labels become the answers.','bot|Machine labels|Machines can label for other machines too.','scan|Watch for bias|If labels are unfair, the model learns unfair.'],
['cat|Words|"My cat Miso sleeps"','cut|Chop|Text is cut into tokens: My · cat · Mis · o','box|Numbers|Each token gets an ID number, like 8177.','globe|Meaning map|Embeddings place similar words close together.'],
['db|All the data|The clean data is shuffled.','book|Training box|The big box is for learning.','scan|Practice box|A small box is for practice quizzes.','lock|Exam box|The exam box stays locked until the end.'],
['cat|Show the start|The model sees "My cat Miso sleeps on the warm…"','bot|Guess|It guesses the next word.','scan|Check|The loss says how wrong the guess was.','gear|Nudge knobs|Every knob is nudged a tiny bit. Repeat billions of times.'],
['server|Machines|Thousands of chips work together for weeks.','gear|Settings|Humans pick the learning speed and batch size.','box|Checkpoints|The model is saved like a game, again and again.','shield|Blur|Deliberate blur makes it hard to remember any one person.'],
['bot|Base model|The base model can only continue text.','mail|Instructions|It learns from good question-and-answer examples.','person|Preferences|People pick the better of two answers.','shield|Values|It learns rules about what not to do.'],
['scan|Can it work?|Tests check skills and accuracy.','person|Is it fair?|Tests compare results for different groups.','lock|Does it leak?|Tests check it does not repeat private text.','shield|Red team|Friendly attackers try to break it before release.'],
['box|Pack it|Weights, tokeniser and settings are packed up.','lock|Vault|The weights are kept in a locked vault.','server|Servers|Serving machines get ready to answer.','door|Open the door|People can now use it, carefully at first.'],
['eye|Watch|The team monitors answers and errors.','cal|Drift|The world changes, the model stays frozen.','mail|Feedback|Thumbs up and down flow back.','wheel|New model|Each new model starts the journey again.'],
['bin|Retire|Old models are switched off.','db|Delete data|Every copy must be found and erased.','person|Remove a person|Removing one person\'s data is hard.','gear|Baked in|You cannot take one egg out of a baked cake.'],
['lock|Locksmith|Security: locks and keys.','shield|Lifeguard|Privacy: people\'s data used fairly.','book|Referee|Law: the rules of the game.','pen|Scribe|Documentation: records of everything.'],
['flag|13 stations|From plan to last stop.','box|5 shapes|Sentence, tokens, IDs, vectors, a trace in the weights.','crumb|Copies|Every station leaves copies.','bulb|4 questions|What, where, who, how long?'],
['book|A to Z|Every hard word from the journey.','bulb|Look it up|Tap any word to see its meaning.','star|Master|Knowing the words makes you a master.'],
['scan|Part A|The backpack: data, storage, AI.','db|Part B|Getting the data ready.','gear|Part C|Making the model.','globe|Part D|Out in the world and home again.']],
quill:[
['phone|A question|Quill is one question sent to an AI.','globe|There and back|It travels out and back in three seconds.','crumb|Crumbs|Copies are left behind along the way.','house|Three houses|Public, business and private AI.'],
['gear|Building|Building an AI took months.','phone|Using|Using it takes seconds.','lock|Frozen|Your chat does not change the model\'s weights.','mail|No memory|The app re-sends the conversation each time.'],
['person|User|You type the question.','house|Operator|The company that offers the app.','server|Provider|The company that runs the model.','book|Rules|Terms and policies set the rules.'],
['phone|Keyboard|Stop 1','box|Suitcase|Stop 2','globe|Road|Stop 3','door|Front door|Stop 4','scan|Inspector|Stop 5','bot|Model|Stop 6'],
['person|Think first|Lina decides what to type.','phone|Device layers|Keyboard, apps and the browser see it first.','box|Saved|The device may store drafts and history.','shield|Leave it out|What you never send cannot leak.'],
['book|House rules|The system prompt is packed in.','mail|History|Earlier messages are re-sent.','phone|Attachments|Photos and files ride along.','star|Quill|Your seven words go in last.'],
['phone|Phone|The suitcase leaves Lina\'s phone.','lock|Locked tunnel|TLS hides the contents on the road.','eye|Snoopers|Others only see where it goes, not what it says.','server|Provider|The provider unlocks and reads it.'],
['key|Who are you?|Authentication checks your account.','door|What may you do?|Authorisation checks your rights.','gear|Not too much|Rate limits stop floods.','crumb|Write it down|Logs and usage are recorded.'],
['scan|Scanner|Software reads every message.','shield|Allowed?|Is the content safe?','lock|Secrets?|Is sensitive data leaving?','person|Reviewers|Flagged chats may be read by trained people.'],
['box|Suitcase in|The model reads the whole context.','bot|Token by token|It writes one piece at a time.','wheel|Dice|Each word is chosen by weighted dice.','bin|Keeps nothing|The model itself remembers nothing afterwards.'],
['scan|Checked again|The answer is checked on the way out.','mail|Streaming|Words stream back piece by piece.','db|Saved|The turn is saved in history.','crumb|Counted|Usage is counted for the bill.'],
['phone|On screen|The answer lands on Lina\'s screen.','star|Thumbs|Rating can send the chat for review.','person|People move it|Copying, sharing, screenshots.','book|Say where|Tell people it came from AI.'],
['phone|Device|Crumb 1: on the device.','db|History|Crumb 2: saved chats.','crumb|Logs|Crumb 3: server logs.','box|Backups|Crumb 4: backups that expire later.'],
['mail|Your chat|A chat is saved.','scan|Eligible?|Settings decide if it can be used for training.','gear|Future model|It may help train a future model.','shield|Opt out|Switching off stops training use, not storage.'],
['mail|A fact|"Has a cat named Miso."','db|Saved note|The system saves a note about you.','box|Packed in|The note is added to future suitcases.','eye|See and delete|Good apps let you view and delete memories.'],
['house|Public AI|A personal account with a provider.','person|Sara\'s list|Sara pastes clients\' details.','crumb|Wrong house|The data now sits under consumer rules.','shield|Better way|Ask for a template, add names later.'],
['house|Business AI|The organisation signs a contract.','book|Promises|No training, set retention, security proof.','gear|Admin panel|Admins choose settings for everyone.','person|Still careful|People can still paste the wrong thing.'],
['house|Private AI|The model runs on your own servers.','lock|Stays home|Data never leaves the building.','gear|Your job|You do the security and updates.','phone|On device|Some AI runs on the phone itself.'],
['house|House 1|Personal account, personal rules.','house|House 2|Contract, company rules.','house|House 3|Own servers, own rules.','box|Fourth house|AI hidden inside other products.'],
['person|Habits|Think before you paste.','shield|Traffic light|Green, amber, red data.','book|Duties|Organisations give tools and rules.','flag|If it goes wrong|Tell someone quickly.'],
['flag|8 stops|Out, model, and back.','crumb|Crumbs|Copies left behind.','house|3 houses|Public, business, private.','bulb|One question|Where does my data go?'],
['book|A to Z|Every hard word from Quill\'s trip.','bulb|Look it up|Tap any word to see its meaning.','star|Master|Knowing the words makes you a master.'],
['scan|Part A|The basics.','globe|Part B|The trip out.','bot|Part C|The model and the trip home.','crumb|Part D|What stays behind.','house|Part E|Houses and habits.']],
dash:[
['bot|Hands|Dash is an errand run by an AI with hands.','wheel|Laps|It runs in laps: think, ask, act, observe.','shield|Traps|A stranger sets a trap.','lock|Brakes|Brakes keep it safe.'],
['mail|Chatbot|A chatbot only answers.','gear|Agent|An agent fetches data and takes actions.','globe|Two directions|Data comes in, and actions go out.','shield|Blast radius|It can only harm what it can reach.'],
['person|Sara|The user gives the errand.','gear|Harness|The harness runs the tools.','book|Tool makers|Every tool maker sees some data.','eye|Untrusted|Strangers\' text is information, never orders.'],
['bulb|Think|The model plans.','mail|Ask|It asks for a tool.','gear|Act|The harness runs it.','eye|Observe|The result is added to the context.'],
['book|Collect|Choose the documents.','cut|Chunk|Cut them into passages.','globe|Embed|Give each passage a meaning fingerprint.','db|Store|Keep them in an index.'],
['mail|Question|Sara asks a question.','scan|Search|Find passages close in meaning.','lock|Permission|Keep only what Sara may see.','bot|Answer|Passages go into the prompt.'],
['book|Menu|The model sees a list of tools.','mail|Request|It writes a note asking for one.','gear|Harness acts|The harness presses the button.','box|Result|The result goes back to the model.'],
['mail|Search words|The query goes to a search company.','globe|Strangers\' pages|Pages are written by anyone.','shield|Careful|Pages can hide tricks.','book|Citations|Show where facts came from.'],
['key|Permission slip|OAuth gives limited access.','phone|Your apps|Calendar, email, drive.','box|Over-fetching|Connectors can bring too much.','bin|Revoke|You can take the key back.'],
['mail|Big job|4,000 invoices to add up.','gear|Write code|The model writes a program.','lock|Sandbox|The code runs in a sealed box.','box|New files|Files it creates are data too.'],
['bulb|Think|Lap 1 starts.','gear|Act|A tool runs.','box|Snowball|The context grows each lap.','flag|Stop|Done, a limit, or a human stops it.'],
['pen|Notes|The agent writes notes for later.','db|Kept|Notes are stored between runs.','cal|Stale|Old notes can be wrong.','shield|Poison|A stranger\'s text could sneak in.'],
['bot|Orchestrator|One agent splits the job.','person|Sub-agents|Helpers each do a part.','mail|Hand-offs|Briefs go down, results come up.','eye|Isolation|Readers of strangers\' text get no send tools.'],
['mail|Errand|Sara asks for reminders.','wheel|7 laps|The context is sent to the model seven times.','shield|Trap|A planted note tries to give orders.','lock|Stopped|Three layers stop the leak.'],
['book|Hidden text|A note hides inside data.','bot|Mixed up|The model sees orders and content together.','globe|Leak paths|Links and images can carry data out.','shield|Layers|Training, limits and approvals.'],
['db|Key 1|Access to private data.','eye|Key 2|Exposure to untrusted content.','globe|Key 3|A way to send data out.','lock|Pull one|Remove any key and the door stays shut.'],
['key|Least privilege|Only the access needed.','person|Approval|A human says yes first.','lock|Sandbox|Run inside a sealed box.','eye|See and undo|Logs and undo buttons.'],
['crumb|Trace|Every tool call is recorded.','server|Other systems|Apps keep their own logs.','pen|Changes|What was changed is a crumb too.','person|Rights|People\'s rights still apply.'],
['house|House 1|Personal agent, personal rules.','house|House 2|Admins choose tools and brakes.','house|House 3|Your own agents on your own servers.','key|Own identity|Unattended agents get their own account.'],
['shield|Risks|Four families of agent risk.','flag|Traffic light|Some actions need a human.','person|Habits|Eight habits for people.','bin|Stop it|If harm happens, stop and revoke access.'],
['gear|Hands|Look up, tools, web, apps, code.','wheel|Loop|Think, ask, act, observe.','key|3 keys|Private data, strangers, a way out.','lock|6 brakes|Limits that keep it safe.'],
['book|A to Z|Every hard word from Dash\'s errand.','bulb|Look it up|Tap any word to see its meaning.','star|Master|Knowing the words makes you a master.'],
['scan|Part A|Hands and cast.','book|Part B|Looking things up.','gear|Part C|Tools, web, connectors, code.','wheel|Part D|Loop, memory, teams.','shield|Part E|Danger, brakes, crumbs.']]};
function filmGame(st,frames,done){ const F=frames.map(f=>f.split('|')), cols=['pip','quill','dash','sky']; let k=-1, tm=null;
  st.innerHTML=`<div class="film"><div class="fsky"><span class="fsun"></span></div><ol class="fnodes" style="--n:${F.length}">${F.map((f,i)=>`<li data-i="${i}"><span class="fbub">${ic(f[0],cols[i%4],46)}</span><b>${esc(f[1])}</b></li>`).join('')}</ol><span class="fwho">${who(cur,58)}</span><p class="fcap" aria-live="polite">Press play to start the show.</p></div>
    <div class="row"><button class="b" id="fplay">${ic('eye','card',22)} Play</button><span class="cnt" id="fcnt"></span></div>`;
  const go=i=>{ k=i; const L=qa('.fnodes li',st), li=L[i]; L.forEach((x,j)=>{ x.classList.toggle('lit',j<=i); x.classList.toggle('here',j===i); });
    const fl=q('.film',st).getBoundingClientRect(), r=li.getBoundingClientRect(); const sm=fl.width<560; q('.fwho',st).style.transform=sm?`translate(${Math.max(0,r.left-fl.left+r.width/2-58)}px,${r.top-fl.top-8}px) scale(.62)`:`translate(${r.left-fl.left+r.width/2-29}px,${r.top-fl.top-62}px)`;
    const c=q('.fcap',st); c.innerHTML=`<b>${esc(F[i][1])}:</b> ${esc(F[i][2])}`; c.classList.remove('popin'); void c.offsetWidth; c.classList.add('popin'); q('#fcnt',st).textContent=`Scene ${i+1} of ${F.length}`; S.pop(); };
  const play=()=>{ clearInterval(tm); st.classList.remove('ended'); go(0); tm=setInterval(()=>{ if(k<F.length-1) go(k+1); else { clearInterval(tm); st.classList.add('ended'); q('.fcap',st).innerHTML='<b>The end!</b> Tap any picture to see it again.'; q('#fplay',st).innerHTML=ic('wheel','card',22)+' Watch again'; done(); } },3200); };
  cleanup.push(()=>clearInterval(tm));
  st.onclick=e=>{ if(e.target.closest('#fplay')) play(); const li=e.target.closest('.fnodes li'); if(li){ clearInterval(tm); go(+li.dataset.i); if(k===F.length-1) done(); } };
  later(play,700); }
