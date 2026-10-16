# The Journey of Pip: How an AI Is Built, Told by One Tiny Piece of Data

Oct 9, 2026 · @hi. mu name is saeideh. i am 27 years old and I am studying law

An AI is built by sending data through thirteen stations, and at every station the data changes shape, makes copies and meets new people. This book follows one small sentence, called Pip, through all of them, starting from zero knowledge.

## Before we start

You need to know nothing to read this book. Not maths, not coding, not computers. If you can read a recipe and follow a treasure map, you can follow Pip.

### Meet Pip

Lina is twelve. One rainy Sunday she writes a post on her little blog about her cat. One sentence in that post says:

**My cat Miso sleeps on the warm laptop.**

That sentence is our hero. We will call it Pip.

Pip is tiny: eight words, thirty-nine letters and spaces. Pip does not know it yet, but it is about to go on the longest trip of its life. It will be copied, carried across the world, washed, chopped into pieces, turned into numbers, and shown to a machine that is learning to read and write. By the end, a tiny trace of Pip will live inside an AI.

We will sit on Pip's shoulder the whole way.

### Why follow one sentence?

Because "data flow" sounds boring and foggy until you follow one real thing. When people say "the data flows through the AI lifecycle", they mean exactly this: *some piece of information starts somewhere, moves through a series of steps, and ends up changing a machine.* Pip makes that visible.

Real AI builders use billions of sentences like Pip. But every one of them takes the same road. Understand Pip's road and you understand all of them.

### What this book covers, and what it does not

This book is about **building** an AI. It starts before any data exists and ends when the finished AI is switched off years later. That whole stretch is called the **AI lifecycle**.

This book does **not** cover what happens when you chat with an AI, use an AI agent, or choose between public and private AI tools. That is a second journey, for a second book.

### How every chapter works

Each chapter has the same rhythm, so you always know where you are.

1. **The story.** What happens to Pip, told simply.
2. **What is really going on.** The real idea behind the story, step by step.
3. **New words.** Every new term, explained the moment it appears.
4. **Where is Pip now?** A small box that answers four questions so you never get lost: What shape is Pip? Where does Pip live? Who can see Pip? What is the biggest danger?
5. **Check yourself.** Three questions with answers, so you know it stuck.


### The three chapters before the journey

Pip does not leave home until Chapter 5. First we need three things in our backpack:

- **Chapter 1:** what data actually is.
- **Chapter 2:** where data lives and how it moves.
- **Chapter 3:** what an AI actually is.

If you already know these, read them anyway. They are short, and the rest of the book leans on them.

### A promise about hard words

This subject is full of scary words: *tokenisation, gradient descent, hyperparameter, checkpoint, inference*. Each one hides a simple idea. In this book no hard word appears without its plain meaning right next to it, and all of them are collected again in the dictionary in Chapter 21.

### One rule for the whole trip

At the end of every chapter you will find Pip's status box, **Where is Pip now?** It answers the same four questions each time, so you always know where Pip is and never get lost.

Whenever you feel lost, ask the traveller's question:

**Where is Pip right now, what does Pip look like, and who is holding Pip?**

Ready? Pip is still sitting quietly on Lina's blog. Let us first find out what Pip is made of.

## Chapter 1. What is data?

Data is any piece of information that has been recorded so it can be kept, copied and used later. A sentence on a blog, a photo of a cat, the temperature outside, the time you opened an app, the number of steps on your phone: all of these are data. When a computer keeps data, it stores it as numbers. That is the whole idea. Everything else in this chapter is detail.

### The story

Lina types her sentence and presses Publish. On her screen she sees letters. But her computer has never seen a letter in its life. A computer is a box with billions of tiny switches, and each switch can only be **off** or **on**. So before Pip can be saved, every letter has to be turned into a pattern of offs and ons.

The capital letter M becomes: off, on, off, off, on, on, off, on.

People write off as 0 and on as 1. So the M is stored as 01001101. The whole of Pip becomes a long row of 0s and 1s. That row is what Pip truly is, underneath.

Pip is born.

### What is really going on

**Step 1. Everything is switches.** The smallest piece of data is one switch: a 0 or a 1. It is called a **bit**. One bit can only answer a yes-or-no question.

**Step 2. Switches travel in groups of eight.** Eight bits together are a **byte**. One byte can make 256 different patterns, which is enough to give every letter, number and punctuation mark its own pattern.

**Step 3. There is a codebook.** Somebody had to decide that 01001101 means M. That agreement is called an **encoding**. The most common one for text today is called UTF-8. It covers nearly every writing system on Earth, plus emoji. If two computers use the same codebook, they read the same letters.

**Step 4. Bytes are bundled into files.** A **file** is a named bundle of bytes. Lina's blog post is a file. A photo is a file. A song is a file.

**Step 5. Sizes have names.** People count bytes in big steps.

| Name | Roughly how many bytes | About the size of |
| --- | --- | --- |
| Byte | 1 | One letter |
| Kilobyte (KB) | One thousand | A short paragraph |
| Megabyte (MB) | One million | A thick novel, or one phone photo |
| Gigabyte (GB) | One billion | A film |
| Terabyte (TB) | One thousand billion | A whole library of films |
| Petabyte (PB) | One million billion | The scale at which big AI training data is counted |

Pip is 39 bytes. The data used to train a large AI can be many terabytes of text. Pip is one grain of sand on a very long beach.

Do not worry: you do not need to memorise these names or numbers. They are here so that the words feel familiar when you meet them again later in the journey.

### It is not only text

Everything a computer stores is bits, but the bits can mean different things.

| Kind of data | How it becomes numbers | Example |
| --- | --- | --- |
| Text | Each character gets a number from the codebook | Pip |
| Image | The picture is cut into tiny squares called **pixels**; each pixel gets numbers for red, green and blue | Lina's photo of Miso |
| Sound | The loudness of the air is measured thousands of times a second | Miso purring |
| Video | Many images per second, plus sound | Miso jumping off the laptop |
| Numbers and tables | Stored directly, in rows and columns | Miso's weight each month |
| Clicks and logs | Each action is written as a line: who, what, when | "Post viewed at 15:04" |

This matters for AI, because **a machine can only learn from numbers.** Whatever goes in, text or picture or sound, it must first be numbers. We will see Pip become numbers twice more on this trip, each time in a cleverer way.

### Two families of data

Data comes in two big families, and it helps to know which one you are looking at.

- **Structured data** is tidy. It sits in tables with rows and columns, like a school register. Every row is one thing (one pupil), every column is one kind of fact (name, class, date of birth), and each box has a clear meaning. A bank statement, a train timetable and a spreadsheet of Miso's weight each month are all structured data.
- **Unstructured data** is free-form: essays, photos, voice messages, videos. There are no rows and no columns, and nothing tells the computer which part means what. Pip is unstructured: it is just a sentence.

Here is why the difference matters. Ask a computer "which pupils were born in May?" and it can answer from a register in a blink, because the birthday always sits in the same column. Ask it "which blog posts are about cats?" and there is no column to look in. The computer has to read the words and work out the meaning, which is much harder.

| | Structured | Unstructured |
| --- | --- | --- |
| Looks like | A table with rows and columns | Free text, pictures, sound, video |
| Everyday examples | School register, bank statement, timetable | Essays, photos, voice notes, videos, Pip |
| Easy for a computer to search and sort? | Yes | No, the meaning must be worked out first |
| Where personal details hide | In clearly named columns, easy to find | Anywhere in the text or picture, easy to miss |

There is also a mix in between, sometimes called **semi-structured data**. An email has neat labelled parts (from, to, date, subject) and then a free-text message. Lina's blog post is the same: a title, a date and an author in fixed places, and then Pip in the free text.

Most of the world's data is unstructured. Older computer programs could only really use the tidy kind. Modern AI became powerful largely because it learned to use the messy kind, which is exactly why Pip, an ordinary sentence, can end up teaching an AI.

Notice the last row of the table too. In a tidy table, an email address sits in a column called "email", so it is easy to find and protect. In free text, a name or a phone number can be hiding anywhere in a sentence. Keep that in mind; it will matter when the data is cleaned at Station 4.

### Data about data

When Lina's post is saved, the computer also notes things *about* it: when it was written, by which account, in which language, how long it is. This is **metadata**: data that describes other data. It is like the label on a jar. The jam is the data. The label saying "strawberry, made in June" is the metadata.

Metadata will matter a lot later. It is how people keep track of where Pip came from and what they are allowed to do with it.

### Some data is about people

Pip mentions a cat called Miso. That seems harmless. But Lina's post also has her first name on it, and her blog account knows her email address. Information like this, about a real, living person, is called **personal data**.

The most important law about personal data in Europe is the **GDPR** (the General Data Protection Regulation). It gives the official definition. Personal data is *"any information relating to an identified or identifiable natural person"*. Let us unpack that sentence piece by piece:

- **Any information** means facts, but also opinions, photos, recordings and numbers. "Lina is 12", "Lina writes well" and a photo of Lina's face are all information about her.
- **Relating to** means the information is about the person, or is used to learn something about them or to make a decision about them.
- **Identified** means the person is named or obviously pointed to: "Lina Ahmadi".
- **Identifiable** means the person can be worked out, directly or indirectly, even without a name. The GDPR gives examples: an identification number, location data, an online identifier such as a username, an IP address or a cookie ID, or facts about a person's body, health, genes, mind, money, culture or social life. "The only 12-year-old girl on Elm Street with an orange cat" names nobody, but it points to exactly one person, so it is personal data.
- **Natural person** means a living human being. A company is not a natural person, and nor is Miso. But "Lina has a cat called Miso" is still personal data, because it tells you something about Lina.

Two more points are easy to miss:

- If names are swapped for codes but someone still holds the list that links the codes back to people, the data is **pseudonymised**. It is still personal data under the GDPR.
- Only data that has been made truly **anonymous**, so that nobody can reasonably work out who it is about any more, falls outside the GDPR.

**Sensitive data.** The GDPR picks out some kinds of personal data that could hurt people badly if misused. It calls them **special categories of personal data**, often simply called **sensitive data** (Article 9):

- racial or ethnic origin
- political opinions
- religious or philosophical beliefs
- trade union membership
- genetic data
- biometric data used to identify a person, such as a fingerprint or a face scan
- health data
- data about a person's sex life or sexual orientation

Using sensitive data is forbidden unless one of a short list of exceptions applies, for example the person has given clear, explicit permission. Data about criminal convictions has its own separate, strict rules too.

Location is not on the sensitive list, but it is still personal data, and it can *reveal* sensitive things. A phone that visits the same hospital every week says something about its owner's health.

Children get extra care as well. The GDPR says children's personal data deserves specific protection, because children may be less aware of the risks. Lina is twelve, so this matters for Pip.

The GDPR is a law of the European Union, but many other countries have similar laws. Keep personal data in your pocket. It comes back at almost every station.

### New words

- **Data:** information stored in a form a computer can keep.
- **Bit:** one switch, 0 or 1.
- **Byte:** eight bits; enough for one letter.
- **Encoding:** the codebook that says which pattern means which character.
- **File:** a named bundle of bytes.
- **Pixel:** one tiny coloured square of an image.
- **Structured data:** data in neat tables.
- **Unstructured data:** free-form data such as text, pictures and sound.
- **Metadata:** data that describes other data.
- **Personal data:** any information about an identified or identifiable living person (the GDPR definition).
- **Identifiable:** a person who can be worked out, directly or indirectly, even without a name.
- **GDPR:** the General Data Protection Regulation, the European Union's main law on personal data.
- **Sensitive data (special categories):** the kinds of personal data the GDPR protects most strictly, such as health, religion or biometric data.
- **Pseudonymised data:** data where names are replaced by codes that can still be linked back; still personal data.
- **Anonymous data:** data that can no longer be linked to any person; outside the GDPR.
- **Semi-structured data:** data with some labelled parts and some free text, like an email.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | A row of 39 bytes, readable as a sentence |
| Where does Pip live? | In a file on the blog company's computer |
| Who can see Pip? | Anyone who visits Lina's blog, because she published it |
| Biggest danger? | None yet, but Pip is now public, and public things get copied |

### Check yourself

1. **What is the smallest piece of data called, and what can it hold?** A bit. It holds a 0 or a 1.
2. **Is a photo structured or unstructured data?** Unstructured. It has no rows and columns.
3. **Lina's post was written on a Sunday at 14:52. What kind of data is that fact?** Metadata. It describes the post.

## Chapter 2. Where data lives and how it travels

Data is always in one of three states: resting somewhere, moving somewhere, or being used. Learn to spot which one, and you can follow any data anywhere.

### The story

Pip is on Lina's blog. But where is the blog? Not in Lina's bedroom. When she pressed Publish, Pip left her laptop, ran through her home Wi-Fi, through cables under streets and maybe under an ocean, and arrived in a huge building full of humming computers owned by the blog company. Pip was written onto a disk there.

Then, because that company is careful, Pip was copied onto a second disk in a second building, in case the first one breaks.

Pip is one minute old and already exists in at least three places: Lina's laptop, building one and building two. Nobody did anything sneaky. This is simply how computers work.

### What is really going on

**The three states of data.**

| State | Meaning | Everyday picture |
| --- | --- | --- |
| At rest | Stored and waiting | A letter in a drawer |
| In transit | Moving between computers | A letter in the post |
| In use | Being read or changed by a program right now | A letter open in your hands |

At every station on Pip's journey, Pip will be in one of these states. The risks are different for each. A letter in a drawer needs a lock. A letter in the post needs a sealed envelope. A letter in your hands needs you to watch who is reading over your shoulder.

**Where data rests.**

When data is "at rest", it has to be resting on something real. Here are the places, from small to huge.

- **Storage** is anything that keeps data when the power is off. Your phone keeps photos on memory chips (often called an SSD). Older computers use a **hard disk**, a fast-spinning metal plate that stores bits as tiny magnetic spots. Big companies also use **tape**, like old cassette tape, to keep huge archives cheaply for years.
- **Memory** (also called RAM) is the fast workspace a computer uses while it is working. It is wiped when the power goes off. Think of storage as the bookshelf and memory as the desk. When you open a file, the computer copies it from the bookshelf onto the desk so it can work quickly. Yes, that is another copy, even if only for a moment.
- A **server** is a computer whose job is to serve other computers. It has no screen and no keyboard. It sits in a rack and answers requests all day. When anyone opens Lina's blog, their browser asks the blog company's server for the page, and the server sends back a copy. A server is like a librarian who never sleeps.
- A **data centre** is a building full of servers, sometimes many thousands of them, in long rows of tall cabinets. It has strong cooling (servers get hot), backup power in case the electricity fails, and guards and locked doors. Big companies usually have several data centres in different places, so that if one has a fire or a flood, the data is safe in another.
- **The cloud** is just a friendly name for renting space and power in somebody else's data centres over the internet. There is no cloud in the sky. There are buildings on the ground. Many companies, probably including Lina's blog company, rent cloud space instead of building their own data centres, because it is cheaper and easier.

Why does this matter for Pip? Because *where* data rests decides *who* can reach it and *which laws* apply. A sentence on Lina's laptop is in her bedroom. The same sentence on a server is in a building she will never visit, looked after by people she will never meet.

**How data is organised when it rests.**

A pile of bytes is useless if nobody can find anything in it. So resting data is organised in one of three main ways.

- A **database** is an organised store where data can be found quickly. A phone's contact list is a small database. Lina's blog company almost certainly keeps one with at least two tables: an **accounts** table (username, email address, a scrambled version of the password) and a **posts** table (post number, author, date, text). Pip is one row in the posts table, and the "author" box links that row to Lina's row in the accounts table. That link is exactly how a computer knows Pip belongs to Lina.
- A **file system** is the folders-and-files arrangement you know from any computer: a folder called "Photos", inside it a folder called "2026", inside it a file called "miso.jpg". The route to a file, like Photos/2026/miso.jpg, is called its **path**.
- An **object store** is a giant bin for files of any kind, each with a name tag and some metadata stuck on it. There are no folders inside folders, just billions of labelled objects in big containers often called **buckets**. AI teams love these, because they hold enormous piles cheaply. Later in the journey, Pip will land in one.

**How data travels.**

- A **network** is computers connected so they can send each other data. The **internet** is the network of networks: home networks, school networks, company networks and data centres, all joined together.
- When Lina pressed Publish, Pip went from her laptop over Wi-Fi to the **router** (the little box with blinking lights at home), then to her internet provider, through cables under the streets, possibly through a cable on the ocean floor, and finally into the blog company's data centre.
- Data does not travel in one piece. It is chopped into small **packets**, each labelled with where it came from, where it is going and its place in the line. Pip is so small it fits in a single packet. One photo of Miso needs hundreds or thousands. The packets may take different roads and are put back together in the right order at the end, like a puzzle sent in many envelopes.
- Every computer on a network has an **address** (an **IP address**), a bit like a house number, so packets know where to go. Along the way, machines called routers read the address on each packet and pass it on, like sorting offices in a postal system.

Notice that on its trip Pip passes through many machines that belong to other people: the home router, the internet provider, the cable companies. Each of them handles Pip's packets. Could they read Pip on the way? That question leads to locks and envelopes, just below.

### Moving is really copying

Here is the most important idea in this chapter, and one of the most important in the whole book.

**When data moves, it is not carried. It is copied.**

When you hand someone a book, you no longer have it. Data is different. When Pip was sent from Lina's laptop to the blog server, the laptop read Pip and the server wrote down an identical Pip. Now there are two. Unless someone deletes the first one, both stay.

This is why following data is tricky. A trip with ten stops can leave ten Pips behind. Throughout this book we will keep asking: *did the old copy get deleted, or is it still there?*

### Locks and envelopes

**Encryption** means scrambling data with a secret key, so that anyone without the key sees only nonsense.

Here is the idea in miniature. Take Pip and shift every letter one step along the alphabet: "My cat" becomes "Nz dbu". Anyone who knows the secret rule (shift back by one) can read it; anyone else sees gibberish. Real encryption uses rules that are millions of times harder to guess, and the secret part is a long number called a **key**. Whoever holds the key can unlock the data. Whoever does not, cannot.

- **Encryption in transit** protects data on the road. It is the sealed envelope. When you see a small padlock in a web browser, or an address starting with **https**, this is what it means: your browser and the server agreed on a secret key, and every packet travels scrambled. The router in a café, the internet provider and the cable companies can see *where* the packets are going, but not what is inside.
- **Encryption at rest** protects data on the disk. It is the locked drawer. If someone steals the disk or a backup tape, they get nonsense.

Now link this to the three states of data. Encryption in transit protects data *in transit*. Encryption at rest protects data *at rest*. But data *in use* has to be unlocked, because a program cannot work on scrambled data. So while Pip is being read or changed, the protection comes from other things: who is allowed onto the computer, and who is watching. That is the next section.

And remember: encryption does not stop the *owner* of the server from reading data. The blog company holds the keys to its own drawers, otherwise it could not show Pip to visitors. Encryption protects against outsiders, not against the people running the building. (Some messaging apps use **end-to-end encryption**, where only the sender and receiver hold the keys and even the company in the middle cannot read the messages. Lina's public blog does not work that way, and does not need to.)

### Keys to the building

So far we have seen *where* Pip rests (servers in data centres) and *how* Pip travels (packets in sealed envelopes). Once Pip has safely arrived, one question is left: who is allowed to walk into the building and open the drawer? Encryption locks the drawer, but people who work there have keys. These are the rules that decide who gets which key.

- **Authentication** means proving who you are. There are three kinds of proof: something you *know* (a password), something you *have* (your phone, which receives a code) and something you *are* (a fingerprint or your face). Using two of them together is called **two-factor authentication**, and it is much safer than a password alone. When Lina logs into her blog, she is authenticating.
- **Authorisation** means checking what you are allowed to do, *after* you have proved who you are. You proved you are a pupil; that lets you into the classroom but not the staff room. On the blog, Lina is authorised to edit her own posts but not anyone else's. A support worker at the blog company may be authorised to see account email addresses to help people, but not to change their posts.
- **Access control** is the full set of rules about who may see or change what. A good rule of thumb is to give each person only the access they really need for their job, and nothing more. You will meet this idea again many times.
- A **log** is a diary the computer keeps by itself: who did what, and when. A line might say: "15:04, user lina_writes, opened post 1182, from address 81.2.69.160". Logs help the company spot break-ins and prove what happened. But look closely: that line contains a username and an IP address, so a log is personal data too.
- A **backup** is a spare copy kept in case of disaster: a broken disk, a fire, a mistake, or an attack. Backups are usually kept in a different building and for weeks or months. Remember building two in the story? That was a backup.

Notice something about logs and backups. They are *more copies*. The diary that says "file read at 15:04" is new data, born because of Pip. Data has a habit of creating more data.

### Who owns the building matters

If Pip sits on a server, three questions decide who is in charge:

1. **Whose server is it?** The blog company's, not Lina's. Lina wrote Pip, but the copy on the server sits on the company's machines. The company decides how many backups to keep, which of its staff can look, and how long the copies stay. Lina can delete her post, but she cannot walk into the data centre and check that every copy is gone.
2. **Which country is it in?** Laws follow the land the building stands on, and often the people the data is about. Imagine Lina lives in Belgium and the blog company keeps its servers in another country. The GDPR still protects Lina, because she lives in the European Union. And because the data has left the EU, the company must put extra protections in place for the transfer. The country where the building stands may also have its own rules, for example about when the police can ask to see the data.
3. **What did the two sides agree?** When Lina made her account, she clicked "I agree" on the **terms of service**. Those terms say what Lina may do on the site and what the company may do with her posts, for example show them to visitors or keep copies. Next to them sits the **privacy policy**, which explains what personal data the company collects about Lina, why, and how long it keeps it.

So three things decide what happens to Pip on someone else's computer: the owner, the law and the agreement. Most people never read those terms. They will matter in Chapter 6, when someone else comes looking for Pip.

### New words

- **At rest, in transit, in use:** the three states of data.
- **Storage:** where data is kept long-term.
- **Memory (RAM):** the fast, temporary workspace.
- **Server:** a computer that serves other computers.
- **Data centre:** a building full of servers.
- **Cloud:** rented computers in someone else's data centres.
- **Database:** an organised store built for quick finding.
- **Object store:** a giant bin for files of any type.
- **Network:** connected computers.
- **Packet:** a small labelled piece of travelling data.
- **Encryption:** scrambling data so only key-holders can read it.
- **Authentication:** proving who you are.
- **Authorisation:** checking what you may do.
- **Log:** the computer's automatic diary.
- **Backup:** a spare copy for emergencies.
- **Terms of service:** the agreement between a user and a company.
- **Privacy policy:** the document explaining what personal data a company collects, why, and for how long.
- **IP address:** the number that identifies a computer on a network, like a house number.
- **Two-factor authentication:** proving who you are with two different kinds of proof.
- **End-to-end encryption:** encryption where only the sender and the receiver hold the keys.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | Still a readable sentence, stored as bytes |
| Where does Pip live? | On Lina's laptop, on the blog server, and in the blog's backup |
| Who can see Pip? | The public through the blog; the blog company on its servers |
| Biggest danger? | Copies multiply quietly; Lina controls only the one on her laptop |

### Check yourself

1. **Name the three states of data.** At rest, in transit, in use.
2. **When data is sent from one computer to another, what happens to the original?** It stays, unless someone deletes it. Moving is copying.
3. **Does encryption at rest stop the server's owner from reading the data?** No. The owner holds the keys. It protects against thieves and outsiders.

## Chapter 3. What is AI, really?

An AI is a computer program that was not given its rules by a person but worked them out from examples. That one difference explains why AI needs so much data, and why Pip is about to be wanted.

### The story

Far from Lina's house, a team of people has a dream. They want to build a machine that can read and write like a person: answer questions, tell stories, explain homework.

The old way to make a computer do something was to write down every rule. "If the sentence ends with a question mark, it is a question." "If the word is cat, the plural is cats." But language has millions of rules and millions of exceptions. Nobody can write them all. People tried for decades and the results were clumsy.

So the team chooses the other way. *Do not tell the machine the rules. Show it an enormous amount of writing and let it find the patterns itself.*

For that they need writing. Mountains of it. Somewhere in those mountains they will need sentences about cats, laptops and sleeping.

They do not know Pip exists. But they are coming.

### What is really going on

**Two ways to make a computer do a job.**

|  | The old way: programming | The new way: machine learning |
| --- | --- | --- |
| Who makes the rules? | A person writes them | The machine finds them |
| What do you give the computer? | Rules | Examples |
| What comes out? | Answers | Rules, hidden inside a model |
| Good for | Clear, exact jobs, like adding up a bill | Fuzzy jobs, like recognising a cat or writing a sentence |

Imagine teaching a little brother what a dog is. You do not say "four legs, fur, tail, barks", because a cat matches most of that. You point: "dog, dog, not a dog, dog." After enough pointing, he just knows. He could not tell you his rule, but he has one. That is machine learning.

**Some family names.**

- **Artificial intelligence (AI)** is the big umbrella: any computer system doing things that seem to need thinking.
- **Machine learning (ML)** is the part of AI where the system learns from examples.
- **Deep learning** is the part of machine learning that uses large neural networks. More on those below.
- **Generative AI** is deep learning that creates new things: text, pictures, music, code.
- A **large language model (LLM)** is a generative AI trained on text. This is the kind our team is building, and the kind we follow in this book.

Picture them as nesting dolls: AI is the biggest, then machine learning, then deep learning, then generative AI, and LLMs sit inside that.

### What is a model?

The thing that does the learning is called a **model**. A model is a very large mathematical recipe with a huge number of adjustable knobs.

- You put numbers in one end.
- The recipe mixes them using the knobs.
- Numbers come out the other end.

The knobs are called **parameters** or **weights**. A small model has thousands. A big language model has billions.

At the start, every knob is set at random. The model is like a newborn: all the wiring, none of the knowledge. Ask it anything and it answers with nonsense.

**Training** is the slow process of turning the knobs, a tiny bit at a time, until the outputs become good. All the knowledge a model ever has is stored in the positions of its knobs. There is no hidden library inside, no folder of saved texts. Only knob settings.

This is a big idea, so here it is once more: **training turns data into knob settings.** The whole AI lifecycle exists to do that one thing well.

### What is a neural network?

The type of model used today is a **neural network**. The name comes from a loose comparison with the brain.

- It is made of many tiny calculators called **neurons**.
- Neurons are arranged in rows called **layers**.
- Each neuron takes some numbers, multiplies each by a weight, adds them up, and passes the result to the next layer.
- Stack many layers and the network can learn very complicated patterns. "Deep" learning just means many layers.

The specific design behind modern language models is called a **transformer**. Its special trick is called **attention**: when reading a word, it can look at all the other words nearby and decide which ones matter most. In Pip, to understand "sleeps", the model pays most attention to "cat" and "Miso". We return to this in Chapter 13.

### What does a language model actually learn to do?

Something surprisingly simple: **guess the next piece of text.**

Show it "My cat Miso sleeps on the warm" and ask what comes next. A good guess is "blanket", "sofa", "bed" or "laptop". A bad guess is "Tuesday" or "seventeen".

Play this guessing game billions of times with text about everything, and something remarkable happens. To guess well, the model is pushed to pick up grammar, facts, styles, jokes, and how ideas connect. Nobody taught it those things one by one. They fell out of the guessing game.

### Four ways a machine can learn

| Way of learning | How it works | Everyday picture |
| --- | --- | --- |
| Supervised | Every example comes with the right answer attached | Flashcards with the answer on the back |
| Unsupervised | No answers; the machine looks for groups and patterns by itself | Sorting a bag of mixed buttons without being told how |
| Self-supervised | The data provides its own answers; hide a word and guess it | Covering the last word of a sentence with your thumb |
| Reinforcement | Try things, get rewards for good results | Training a puppy with treats |

Language models mostly use **self-supervised** learning. This is why they can use raw text like Pip directly: the next word *is* the answer, already sitting there in the sentence. Later they also get some supervised and reinforcement learning as polish. We meet those in Chapters 9 and 14.

### Training and using are two different things

Keep these apart from the start.

- **Training** is school. The knobs are being turned. It happens before the AI is released, takes weeks or months, and costs a fortune.
- **Inference** is work. The knobs are frozen and the model simply answers. It takes seconds.

This book lives almost entirely in the training world. Pip's adventure is a school story.

### The lifecycle in one breath

To get from "we have a dream" to "a working AI", data must be: planned for, collected, stored, cleaned, labelled where needed, turned into numbers, split into sets, used for training, used for extra training, tested, packaged and released, watched, and finally retired. Those are the thirteen stations. The next chapter shows the map.

### New words

- **Artificial intelligence (AI):** computer systems doing things that seem to need thinking.
- **Machine learning:** learning rules from examples.
- **Deep learning:** machine learning with many-layered neural networks.
- **Generative AI:** AI that creates new content.
- **Large language model (LLM):** a generative AI trained on text.
- **Model:** a big mathematical recipe with adjustable knobs.
- **Parameter or weight:** one adjustable knob.
- **Neural network:** a model built from layers of tiny calculators.
- **Neuron:** one tiny calculator.
- **Layer:** one row of neurons.
- **Transformer:** the neural network design behind modern language models.
- **Attention:** the transformer's way of deciding which words matter to each other.
- **Training:** turning the knobs until the model is good.
- **Inference:** using the finished model.
- **Self-supervised learning:** learning where the data supplies its own answers.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | Unchanged: a sentence on a blog |
| Where does Pip live? | Same three places as before |
| Who can see Pip? | The public and the blog company |
| Biggest danger? | Pip has become *valuable* to strangers, and Lina has no idea |

### Check yourself

1. **In machine learning, who writes the rules?** Nobody writes them. The machine finds them from examples.
2. **Where is a model's knowledge stored?** In its weights, the positions of its knobs.
3. **What game does a language model play during training?** Guess the next piece of text.

## Chapter 4. The map

Pip's route has thirteen stations, and the last ones lead back to the first. Keep this map in mind; every chapter from here on is one stop on it.

&#91;embedded content: the AI lifecycle · 13 stations and 1 feedback loop\]

Follow the arrows like a snake: left to right along the top, right to left through the middle, then left to right again at the bottom. The coloured line is the feedback loop that makes the whole thing a circle.

### The stations in one line each

| Station | Name | What happens to data here | Chapter |
| --- | --- | --- | --- |
| 1 | Plan | People decide what the AI is for and what data it needs | 5 |
| 2 | Collect | Data is gathered from the world | 6 |
| 3 | Store | Raw data is shelved, tagged and guarded | 7 |
| 4 | Clean | Junk, repeats, harm and private details are removed | 8 |
| 5 | Label | Right answers are attached where needed | 9 |
| 6 | Numbers | Text is cut into tokens and turned into numbers | 10 |
| 7 | Split | Data is dealt into learning, practice and exam sets | 11 |
| 8 | Train | The model learns from the data | 12 and 13 |
| 9 | Fine-tune | The model gets extra lessons in behaviour | 14 |
| 10 | Test | The model sits its exams | 15 |
| 11 | Release | The model is packaged and put to work | 16 |
| 12 | Watch | The model is monitored and feedback is gathered | 17 |
| 13 | Retire | Models are switched off and data is deleted | 18 |

### Three stretches of the road

The thirteen stations fall into three stretches. This grouping is worth remembering, because the valuable thing changes in each.

- **Stations 1 to 7: the data stretch.** The valuable thing is the data. Pip is readable the whole way.
- **Stations 8 to 10: the model stretch.** Data is turned into a model. The valuable thing becomes the weights.
- **Stations 11 to 13: the world stretch.** The model meets reality, ages, and is eventually replaced.

### It is not really a straight line

The map shows one neat path, but real teams loop back all the time.

- A bad exam result at Station 10 sends them back to collect or clean more data.
- A problem spotted at Station 12 can send them back to fine-tuning.
- Every new generation of the model starts again at Station 1.

Think of the map as the main railway line. Trains mostly go forward, but there are sidings and return tracks everywhere.

### A sneak preview: Pip's five shapes

Pip will not stay a sentence. On the way into the model, Pip changes form five times. You do not need to understand each form yet; the coming chapters explain them one by one. For now, just notice the direction of travel: from something anyone can read to something nobody can.

&#91;embedded content: Pip's five shapes · from sentence to a trace in the weights\]

The first three shapes can all be turned back into Lina's sentence. The fourth exists only for a moment. The fifth, the coloured one, is what actually stays inside the AI, and the token numbers shown are invented for this book.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | Still a sentence on a blog |
| Where does Pip live? | Laptop, blog server, blog backup |
| Who can see Pip? | The public and the blog company |
| Biggest danger? | None yet. The journey starts in the next chapter |

### Check yourself

1. **How many stations are on the map?** Thirteen.
2. **What is the valuable thing in stations 1 to 7, and what is it from station 8 onward?** First the data, then the model's weights.
3. **Is the lifecycle a straight line?** No. It loops back, and each new model starts again at Station 1.

## Chapter 5. Station 1: The plan

Before a single byte is collected, people decide what the AI is for, what data it needs and what rules apply. No data moves at this station, yet every later movement is decided here.

### The story

In a meeting room with too much coffee, the team writes on a whiteboard:

*We will build a language model that can help people write, learn and solve problems, in many languages.*

Then come the questions. What kind of writing must it learn from? How much? Whose writing? Are we allowed to use it? What must never go in? Who is in charge of each part?

Someone writes: "Everyday writing by ordinary people, including blogs."

Lina is at school, doing fractions. She has no idea that a line on a whiteboard has just pointed, very roughly, in Pip's direction.

### What is really going on

This station is called **problem definition** or **scoping**. It produces documents, not data. Good teams answer five groups of questions.

**1. What is the job?**

- What should the AI be able to do? This is the **use case**.
- Who will use it, and for what?
- What should it refuse to do?
- How will we know it is good enough? These are the **success criteria**.

**2. What data does that job need?**

This list is called the **data requirements**. It covers:

- **Type:** text, images, sound, tables?
- **Amount:** thousands of examples, or trillions of words?
- **Variety:** which languages, topics, styles, ages, regions? A model that only ever reads cookbooks will be useless at poetry.
- **Quality:** how clean and how correct must it be?
- **Freshness:** how recent?

**3. Where could the data come from, and may we use it?**

Every possible source is checked for permission.

- **Copyright** is the right of creators over their work. Lina wrote Pip, so Pip is hers. Whether and how copyrighted writing can be used for AI training is argued over in courts and parliaments around the world, and the answer differs by country.
- A **licence** is a permission slip: the owner says who may use the work and how.
- **Privacy law** protects personal data. In Europe the main law is the **GDPR**. It says an organisation needs a valid reason, called a **lawful basis**, to use personal data, and must use no more than it needs.
- **Terms of service** on websites may allow or forbid collection.

**4. What could go wrong?**

Teams write a **risk assessment**. When personal data is involved, European law may require a formal version called a **data protection impact assessment (DPIA)**: a written study of how people could be harmed and how that is prevented.

Typical risks written down here:

- Private information ends up inside the model.
- The data is lopsided, so the model is unfair to some groups. This is **bias**.
- Harmful material slips in.
- The source of some data cannot be proven later.

**5. Who is responsible?**

The rules and roles for handling data are called **data governance**. Think of it as the school rules for data: who may touch it, who signs off, what gets written down.

### The people in the room

| Role | What they care about | Everyday picture |
| --- | --- | --- |
| Product manager | What the AI is for and who uses it | The person who decides what the shop sells |
| Data scientist or ML researcher | What the model needs to learn well | The teacher who plans the lessons |
| Data engineer | How to collect, move and store data | The plumber who lays the pipes |
| ML engineer | How to run training on big machines | The mechanic of the school bus |
| Legal counsel | Whether it is allowed | The referee |
| Privacy officer (often called DPO) | Whether people's personal data is protected | The lifeguard |
| Security engineer | Whether thieves can get in | The locksmith |
| Ethics or responsible-AI lead | Whether it is fair and safe | The conscience of the group |

You do not have to remember the titles. Remember that building an AI is a team sport, and that several of these people will hold Pip at different stations.

### Two principles born at this station

- **Purpose limitation:** decide what the data is for, and do not quietly use it for something else later.
- **Data minimisation:** take only what the job needs. Every extra piece of data is one more thing to protect, one more thing that can leak.

A third idea is **privacy by design**: build protection in from the first day, instead of bolting it on after something goes wrong.

### Why this station decides everything

A mistake here travels down the whole line. If the plan says "collect everything, sort it out later", then every later station inherits a mountain of unsorted, unpermitted, unlabelled data. Fixing a mistake at Station 1 costs a meeting. Fixing it at Station 8, after training, can cost months and millions, because data that has been trained into a model cannot simply be pulled out again. We will see why in Chapter 18.

### What exists at the end of Station 1

No training data yet. But several important documents:

- A description of the AI's purpose.
- A list of data needs.
- A list of approved and forbidden sources.
- A risk assessment.
- A list of who is responsible for what.

These papers are data too. They are the first entries in the AI's paper trail, which auditors and regulators may ask to see years later.

### New words

- **AI lifecycle:** all the stages from idea to retirement.
- **Use case:** the job the AI is meant to do.
- **Success criteria:** how the team will judge whether it works.
- **Data requirements:** the list of data the job needs.
- **Copyright:** a creator's legal rights over their work.
- **Licence:** permission to use someone's work under set conditions.
- **GDPR:** Europe's main law protecting personal data.
- **Lawful basis:** the valid legal reason for using personal data.
- **Risk assessment:** a written study of what could go wrong.
- **DPIA:** a risk assessment focused on personal data.
- **Bias:** unfairness in a model, often inherited from lopsided data.
- **Data governance:** the rules and roles for handling data.
- **Purpose limitation:** using data only for the stated purpose.
- **Data minimisation:** taking only what is needed.
- **Privacy by design:** building in protection from the start.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | Unchanged: a sentence on a blog |
| Where does Pip live? | Laptop, blog server, blog backup |
| Who can see Pip? | The public and the blog company |
| Biggest danger? | A plan that is too greedy or too vague, which makes every later station riskier |

### Check yourself

1. **How much training data is collected at Station 1?** None. Only decisions and documents are produced.
2. **What does data minimisation mean?** Take only the data the job really needs.
3. **Why is a planning mistake expensive to fix later?** Because every later station builds on it, and data already trained into a model cannot easily be removed.

## Chapter 6. Station 2: Collection

Collection is where data leaves its home and enters the AI builder's hands. For Pip, this is the moment the journey truly begins, and it happens without a knock on the door.

### The story

At three in the morning, while Lina sleeps, a visitor arrives at her blog. It is not a person. It is a small program that reads web pages, one after another, all day and all night. It reads Lina's cat post from top to bottom in a fraction of a second, writes down a copy, notes the address and the time, and moves on to the next page.

Pip has been collected.

Nothing on the blog changed. Lina's post is still there. But a new Pip now exists, and it is travelling toward a building Lina has never heard of.

### What is really going on

AI builders gather data from many kinds of places. Each has its own road and its own rules.

| Source | What it is | How the data arrives | Main question to ask |
| --- | --- | --- | --- |
| The public web | Pages anyone can read: blogs, forums, news, encyclopedias | A crawler program visits and copies pages | Is collecting from this site permitted? |
| Licensed data | Books, articles, images or archives the builder pays to use | Files handed over under a contract | What exactly does the licence allow? |
| Public datasets | Collections shared for research | Downloaded from a data library | Who made it, and under what conditions? |
| First-party data | Data the builder's own products create, such as user activity | Flows in from the company's own systems | Did users agree to this use? |
| Purchased data | Bought from companies called data brokers | Delivered files | Where did the seller get it? |
| Crowdsourced data | Written or recorded on request by many paid people | Submitted through a task website | Were the workers treated and paid fairly? |
| Sensor data | Readings from cameras, microphones and machines | Streamed from devices | Does it capture people who did not agree? |
| Synthetic data | Made-up data produced by a computer, sometimes by another AI | Generated on the builder's machines | Is it realistic and does it copy anything real? |

Pip came by the first road, so let us look closer at that one.

### How the web is collected

- A **crawler** (also called a spider or bot) is a program that visits web pages automatically. It starts from a list of addresses, reads each page, finds the links on it, and follows them. Page by page it spreads across the web like someone walking through a city by always taking the next door.
- **Scraping** means pulling the useful content out of a page: keeping the article text and throwing away menus and adverts.
- A website can post a small note called **robots.txt**. It tells crawlers which pages they are welcome to visit and which they should leave alone. It is a polite sign on the gate, not a lock. Well-behaved crawlers obey it.
- Each crawler introduces itself with a name tag called a **user agent**, so website owners can recognise it and choose to block it.
- Some builders skip their own crawling and use existing **web archives**: giant ready-made copies of large parts of the web.

### What is collected along with Pip

The crawler does not take only the sentence. It takes the whole page, and it records facts about the visit:

- The page address (the URL).
- The date and time of the visit.
- The language it detected.
- The size of the page.
- Sometimes the licence note on the page.

That is metadata again, from Chapter 1. It becomes Pip's passport. The record of where a piece of data came from is called its **provenance**. The record of everywhere it has been and what was done to it is its **lineage**. A team that keeps good lineage can answer the question "where did this sentence come from, and are we allowed to have it?" years later. A team that does not, cannot.

### Was anyone asked?

This is the uncomfortable part of Station 2, so let us be honest about it.

Lina was not asked. For data gathered from the public web, people usually are not asked one by one. Builders rely on other arguments: that the pages were public, that the law in their country permits this kind of use, or that the website's terms allow it. Authors, artists, news publishers and privacy regulators often disagree, and many of these questions are still being fought over.

For other sources the picture is different:

- **Consent** means a person clearly agreed. A study volunteer who signs a form has consented.
- An **opt-in** means nothing happens unless you say yes.
- An **opt-out** means it happens unless you say no. Many services that use customer data for AI work this way: a setting is on until you switch it off.

It is worth knowing which of these applies whenever a company says "we use data to improve our services".

### What could be scooped up by accident

Crawlers are not careful readers. Along with cat stories they may collect:

- **Personal data:** names, addresses, phone numbers people posted publicly.
- **Copyrighted work:** books, lyrics, paid articles.
- **Secrets posted by mistake:** passwords and keys left in public code.
- **Harmful material:** hate, violence, illegal content.
- **Junk:** spam, broken pages, computer-generated nonsense, endless duplicates.
- **Poison:** text planted on purpose to make a future AI misbehave. This attack is called **data poisoning**. We return to it in Chapter 19.

None of this is removed at Station 2. Collection is a wide net. The washing comes later, at Station 4. This is why the stations between here and training matter so much.

### How big is the pile?

For a large language model, the collected pile can be hundreds of billions of words or more. If one person read without sleeping for a whole lifetime, they would not finish a thousandth of it. Among all that sits Pip: eight words.

You might think one sentence cannot matter. Hold that thought until Chapter 12, where we see exactly how much Pip does and does not change the model.

### Data in transit, again

While travelling from Lina's blog to the builder, Pip was **in transit** (Chapter 2). It crossed networks and maybe borders. Moving data from one country to another is called a **cross-border transfer**, and for personal data some laws put conditions on it. A sentence about a cat is not the issue. A page with someone's home address might be.

### New words

- **Data collection (or acquisition):** gathering data for the project.
- **Crawler:** a program that visits web pages automatically.
- **Scraping:** extracting the useful content from pages.
- **robots.txt:** a website's note telling crawlers where they may go.
- **User agent:** a crawler's name tag.
- **Web archive:** a large stored copy of many web pages.
- **First-party data:** data from the builder's own products.
- **Data broker:** a company that sells data.
- **Crowdsourcing:** paying many people to create or check data.
- **Synthetic data:** computer-made data.
- **Provenance:** where a piece of data came from.
- **Lineage:** the full record of where data has been and what was done to it.
- **Consent:** a person's clear agreement.
- **Opt-in and opt-out:** yes-by-choice versus yes-by-default.
- **Data poisoning:** planting bad data on purpose.
- **Cross-border transfer:** moving data between countries.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | A sentence inside a copied web page, with a passport of metadata |
| Where does Pip live? | The original three places, plus the crawler's output on its way to the builder |
| Who can see Pip? | Now also the AI builder's data engineers |
| Biggest danger? | Being collected without permission, or travelling with no passport, so nobody can later prove where Pip came from |

### Check yourself

1. **What does a crawler do?** It visits web pages automatically, copies them and follows their links.
2. **Is robots.txt a lock?** No. It is a polite request that good crawlers obey.
3. **What is the difference between provenance and lineage?** Provenance is where the data came from. Lineage is its whole travel history since.

## Chapter 7. Station 3: The raw warehouse

Collected data is poured into one enormous store and given a shelf, a tag and a guard. This is where Pip waits, and where good or bad housekeeping decides whether anyone can ever find Pip again.

### The story

Pip arrives at the builder's warehouse inside a giant bundle with ten thousand other web pages. The bundle is unloaded onto a shelf marked with the date. Nobody reads Pip. Nobody even knows Pip is in there. A machine simply writes in a ledger: *bundle 48,113 received, ten thousand pages, from the web crawl.*

Around Pip, as far as you could see if data had eyes, are shelves and shelves of bundles. Recipes. Arguments about football. Instruction manuals for washing machines. Poems. Spam. Other cats.

Pip waits.

### What is really going on

**Getting in the door.** The process of bringing data into the builder's systems is called **ingestion**. Data can arrive in two rhythms:

- **Batch:** in big loads at set times, like a delivery truck once a night.
- **Streaming:** continuously, piece by piece, like water through a tap.

Web crawls usually arrive in batches.

**The pipes.** A **data pipeline** is a chain of automatic steps that moves data from one place to the next, changing it on the way. Nobody carries Pip by hand. Programs do it, following a fixed route. You will hear two nicknames for pipelines:

- **ETL** means Extract, Transform, Load: take the data out, tidy it, then store it.
- **ELT** means Extract, Load, Transform: take it out, store it raw, tidy it later.

AI builders mostly do the second, because they want to keep the raw original in case they later change their mind about how to tidy.

**The big stores.**

| Name | What it holds | Everyday picture |
| --- | --- | --- |
| Data lake | Raw data of every kind, exactly as it arrived | A huge attic where everything is kept in the box it came in |
| Data warehouse | Cleaned, organised data in tables, ready for questions | A tidy library with a catalogue |
| Lakehouse | A mix of both | An attic with library shelves along one wall |

Pip is in the data lake, in what teams often call the **raw zone** or the **landing zone**. Later stations will write cleaner versions into other zones. The raw one usually stays.

**The file formats.** Data in the lake is stored in formats built for giant piles. You may hear names like JSON Lines, Parquet or WARC. You do not need the details. Know only that these are containers designed so a computer can read billions of records quickly, a bit like how a shipping container is designed so a crane can lift it.

### The catalogue: so things can be found

An attic without labels is where things go to be forgotten. So a good warehouse keeps a **data catalogue**: a searchable list of every dataset, saying what it is, where it came from, who owns it, how sensitive it is and what it may be used for.

The catalogue is built from metadata. For Pip's bundle it might say:

| Field | Value |
| --- | --- |
| Dataset | Web crawl, bundle 48,113 |
| Source | Public web |
| Collected | The night the crawler visited |
| Contains personal data? | Possibly; not yet checked |
| Licence status | Mixed; not yet checked |
| Allowed use | Research and training, after cleaning |
| Owner | Data engineering team |

Sorting data by sensitivity is called **data classification**. Common labels are public, internal, confidential and restricted. The label decides how strong the locks must be.

### Versions: so nothing changes in secret

Datasets change. Pages are added, bad ones removed. If a model is trained on "the web dataset" and the dataset changed the week after, nobody can repeat or check the work.

So teams use **data versioning**: every time a dataset changes, the new state gets a version number, and the old state stays recoverable. A frozen, numbered copy is called a **snapshot**. Later, the team can say exactly: "this model was trained on snapshot 12". That is the difference between a science and a guess.

### The locks and guards

Pip is now **at rest** (Chapter 2). The warehouse protects it with:

- **Encryption at rest:** the disks are scrambled.
- **Access control:** only people and programs with a reason can open a shelf. A common approach is **role-based access control**: you get keys according to your job, not your name.
- **Least privilege:** everyone gets the fewest keys that let them do their work.
- **Audit logs:** every opening of a shelf is written in a diary that cannot be quietly edited.
- **Network isolation:** the warehouse is not reachable from the open internet.

### How long may Pip stay?

A **retention policy** says how long each kind of data is kept and when it must be deleted. Without one, the default is "forever", and forever is a long time to guard something.

Raw data is the riskiest kind to keep, because it has not been washed yet. It still holds every phone number, every password posted by mistake, every nasty page. Many careful teams keep raw data only as long as they must, and lock it more tightly than anything else.

### The copy count grows

Count the Pips now:

1. Lina's laptop.
2. The blog server.
3. The blog's backup.
4. The builder's data lake.
5. The data lake's own backup, often in a second region.

And the crawler's temporary files, if nobody cleaned them up. Five or six Pips, and no learning has happened yet. This is ordinary. It is also exactly why mapping data flow is a real job.

### What good and bad look like at this station

| A careful warehouse | A careless warehouse |
| --- | --- |
| Every dataset is in the catalogue | Folders with names like "new\_final\_v2" |
| Every dataset has an owner | "I think someone who left made that" |
| Versions are numbered | Files are overwritten |
| Access is by role and logged | Everyone on the team can open everything |
| Raw data has a deletion date | Nothing is ever deleted |

The model's quality and safety, months from now, will depend on which column the team lives in.

### New words

- **Ingestion:** bringing data into the builder's systems.
- **Batch and streaming:** arriving in loads versus continuously.
- **Data pipeline:** an automatic chain of steps that moves and changes data.
- **ETL and ELT:** two orders of doing extract, transform and load.
- **Data lake:** a store for raw data of all kinds.
- **Data warehouse:** a store for cleaned, organised data.
- **Raw zone:** the part of the lake holding untouched data.
- **Data catalogue:** the searchable list of all datasets.
- **Data classification:** labelling data by sensitivity.
- **Data versioning:** numbering every state of a dataset.
- **Snapshot:** a frozen, numbered copy.
- **Role-based access control:** keys according to job.
- **Least privilege:** the fewest keys needed.
- **Audit log:** a tamper-resistant diary of who did what.
- **Retention policy:** the rule for how long data is kept.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | A sentence inside a raw web page, inside a bundle |
| Where does Pip live? | The raw zone of the builder's data lake, plus its backup, plus the earlier copies |
| Who can see Pip? | Data engineers with access to the raw zone |
| Biggest danger? | Being lost in an unlabelled attic, or sitting unwashed and unguarded for years |

### Check yourself

1. **What is the difference between a data lake and a data warehouse?** A lake holds raw data as it arrived. A warehouse holds cleaned, organised data.
2. **Why do teams version their datasets?** So they can say exactly which data a model was trained on, and repeat or check the work.
3. **Why is raw data the riskiest to keep?** It has not been cleaned, so it still contains personal details, secrets and harmful content.

## Chapter 8. Station 4: The wash

Cleaning removes what is broken, repeated, harmful or private, and keeps what is worth learning from. More of a model's quality is decided here than at any flashy later station.

### The story

One morning the shelf shakes. Pip's bundle is lifted onto a moving belt that runs through a long hall of machines. Each machine has one job.

The first machine strips away everything on Lina's page that is not her writing: the menu, the buttons, the "share this post" bar, a banner for cat food. What remains is her title and her paragraphs.

The second machine checks whether this exact post has been seen before. It has not. Pip rolls on. The page next to Pip, a recipe copied onto four hundred websites, is thrown out three hundred and ninety-nine times.

The third machine sniffs for nonsense and spam. Pip is a real sentence by a real person. Pass.

The fourth machine looks for nasty content. A cat on a laptop. Pass.

The fifth machine looks for private details. It finds Lina's first name in the line "posted by Lina" and an email address in the page footer. Both are cut out.

Pip rolls off the belt, clean, and lands in a new store. The muddy original is still on its shelf in the raw zone.

### What is really going on

There is an old saying in computing: **garbage in, garbage out.** A model becomes what it eats. Cleaning is how builders control the diet. It is also called **data preprocessing** or **data preparation**.

Here are the machines on the belt, one at a time.

**1. Extraction.** Pull the real content out of its packaging. For web pages, that means removing the page code (called HTML), menus, adverts and trackers.

**2. Normalisation.** Make everything consistent. Fix broken characters. Make sure all text uses the same codebook from Chapter 1. Tidy up odd spacing. It is like making sure every exercise book in the class is the same size before stacking them.

**3. Deduplication.** Remove repeats. The web is full of the same text copied many times. There are two kinds:

- **Exact duplicates** are identical, letter for letter. A computer spots these with a **hash**: a short fingerprint calculated from the text. Same text, same fingerprint.
- **Near duplicates** are almost identical, perhaps with a different date at the top. These need cleverer fingerprints that tolerate small differences.

Deduplication is not only about tidiness. A text that appears thousands of times is far more likely to be memorised by the model word for word (more on that in Chapter 13). Removing repeats is a privacy and copyright protection too.

**4. Quality filtering.** Throw out the junk: pages that are too short to mean anything, endless lists of keywords, machine-generated gibberish, text in the wrong language. Builders use rules ("at least fifty words") and small helper models that score how sensible a text looks.

**5. Safety filtering.** Remove or flag harmful material: hate, graphic violence, sexual content involving children, instructions for serious harm. Some categories are removed completely and reported. Others are kept in small, labelled amounts on purpose, because a model must be able to *recognise* a nasty message in order to refuse to write one.

**6. Personal data handling.** Find and deal with information about real people. This deserves its own section.

### Washing out personal data

Personal data that could identify someone is often called **PII**, short for personally identifiable information. Finding it is called **PII detection**. Programs look for patterns: things shaped like email addresses, phone numbers, bank numbers, home addresses, identity numbers.

Once found, there are several ways to treat it.

| Technique | What happens | Example | Can it be undone? |
| --- | --- | --- | --- |
| Removal | The detail is deleted | "posted by Lina" is cut | No |
| Masking (redaction) | The detail is replaced with a placeholder | "Call me on \[PHONE\]" | No |
| Pseudonymisation | The detail is swapped for a made-up stand-in, and a secret key links the two | "Lina" becomes "Person 4471" | Yes, by whoever holds the key |
| Anonymisation | All details are changed so that nobody could ever work out who it was | The whole post becomes untraceable | No, if done properly |

Two things are worth knowing.

- **Pseudonymised data is still personal data in law**, because someone can reverse it. Anonymised data is not, but true anonymisation is hard. People can sometimes be recognised from a combination of harmless-looking details: a small town, a rare job and a birthday may point to exactly one person. This is called **re-identification**.
- **Detection is never perfect.** A program can spot an email address easily. It cannot easily spot "the tall man who runs the bakery on Mill Street". Some personal data always slips through. This is why later stations add more safety nets.

And Pip? Pip still says "Miso". Is a cat's name personal data? Not by itself. But together with other details on Lina's blog, it might help someone work out who wrote it. Privacy is rarely about one word. It is about what the pieces add up to.

### Checking licences and opt-outs

This is also where builders can drop content they should not use: pages from sites that asked not to be collected, material under licences that forbid this use, and items on removal lists that people or publishers have sent in. A team with good lineage (Chapter 6) can do this precisely. A team without it is guessing.

### Bias gets in here too, by subtraction

Every filter is a choice, and choices have side effects. A quality filter that prefers formal writing may throw away more text written in dialects or by younger people. A language filter may remove sentences that mix two languages, which is how millions of people really talk. After such filters the model will understand those people less well.

So careful teams measure what each filter removes, and from whom. Cleaning is not neutral. It shapes who the AI will be good for.

### What comes out of the wash

- A **cleaned dataset** in a new zone of the lake, often called the curated or processed zone.
- A **cleaning report**: how much went in, how much came out, what was removed and why.
- An updated catalogue entry and a new version number.

Notice the pattern: Pip went in, a cleaner Pip came out, and **the dirty Pip is still upstream.** Station 4 made a new copy. It did not erase the old one. Erasing raw data is a separate decision under the retention policy from Chapter 7.

### How much survives?

Often surprisingly little. When builders describe their cleaning, it is common for a large share of raw web data to be thrown away as duplicates, spam or low quality. The clean pile is much smaller and much more valuable than the raw one.

Pip made it through. Most of what was on the shelves around it did not.

### New words

- **Preprocessing (or data preparation):** getting raw data ready for training.
- **Extraction:** pulling real content out of its packaging.
- **HTML:** the code web pages are written in.
- **Normalisation:** making data consistent.
- **Deduplication:** removing repeats.
- **Hash:** a short fingerprint calculated from data.
- **Quality filtering:** removing junk.
- **Safety filtering:** removing or flagging harmful content.
- **PII:** information that can identify a person.
- **Masking (redaction):** replacing a detail with a placeholder.
- **Pseudonymisation:** swapping details for reversible stand-ins.
- **Anonymisation:** changing data so nobody can ever be identified.
- **Re-identification:** working out who someone is from leftover clues.
- **Curated zone:** the part of the lake holding cleaned data.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | A clean sentence in a cleaned document, with Lina's name and email removed nearby |
| Where does Pip live? | The curated zone, and still the raw zone, and all the earlier places |
| Who can see Pip? | Data engineers and data scientists; fewer people can open the raw version |
| Biggest danger? | A private detail slipping through the wash, or a filter quietly removing whole groups of voices |

### Check yourself

1. **Why does removing duplicates help privacy?** Text repeated many times is more likely to be memorised by the model word for word.
2. **Which is reversible: pseudonymisation or anonymisation?** Pseudonymisation, by whoever holds the key.
3. **After cleaning, what happened to the original raw copy of Pip?** It is still in the raw zone until someone deletes it.

## Chapter 9. Station 5: The sticker room

Labelling means attaching the right answer to an example so a machine can learn from it. Most of Pip's pile skips this station, but some data cannot move on without it, and this is the station where the most human eyes look at data.

### The story

Most of the clean pile rolls straight through this hall without stopping. But a small sample is pulled aside, and Pip is in it.

Pip appears on a screen in front of Rui, who works from home for a company the AI builder has hired. Rui sees only the sentence and a question: *Is this text friendly, neutral or unfriendly?* Rui clicks **friendly**. Next question: *What is it about?* Rui picks **pets**. Then Pip vanishes and another sentence appears. Rui will do six hundred of these before lunch.

The same sentence is also shown to two other people in other countries. Two say friendly, one says neutral. The majority wins. Pip now carries two stickers: *friendly* and *pets*.

### What is really going on

**What a label is.** A **label** is the answer attached to an example. The work of attaching labels is **labelling** or **annotation**, and the people who do it are **annotators** or **labellers**. A set of examples whose labels have been carefully checked is called **ground truth**: the answers the team treats as correct.

Remember supervised learning from Chapter 3: flashcards with the answer on the back. Labels are the back of the flashcard.

**Kinds of labels.**

| Kind | What the annotator does | Example |
| --- | --- | --- |
| Classification | Picks a category | Pip is "friendly" and about "pets" |
| Tagging parts | Marks pieces inside the example | In Pip, "Miso" is marked as a name |
| Bounding box | Draws a rectangle around something in a picture | A box around the cat in Lina's photo |
| Transcription | Types out what is said in a recording | Writing down a voice message |
| Rating | Gives a score | "This answer is 4 out of 5 for helpfulness" |
| Ranking | Puts several options in order | "Answer B is better than answer A" |
| Writing | Creates the ideal answer from scratch | A model question paired with a perfect reply |

**The rulebook.** Annotators follow **annotation guidelines**: a document that explains exactly how to decide. What counts as unfriendly? Is sarcasm friendly? Without a clear rulebook, ten people give ten answers, and the model learns confusion.

**Quality control.** Labels are checked in several ways:

- **Multiple annotators** see the same item. How often they agree is measured, and is called **inter-annotator agreement**. Low agreement means the question or the rulebook is unclear.
- **Gold questions** with known answers are mixed in secretly, to check that annotators are paying attention.
- **Reviewers** sample the work and correct it.

### But language models do not need stickers for most of their learning

Here is the twist. The main training of a language model is **self-supervised** (Chapter 3). The model hides the next word from itself and tries to guess it. The data labels itself.

Take Pip. Without any human help, it turns into seven flashcards:

| Front of the card (what the model sees) | Back of the card (the answer) |
| --- | --- |
| My | cat |
| My cat | Miso |
| My cat Miso | sleeps |
| My cat Miso sleeps | on |
| My cat Miso sleeps on | the |
| My cat Miso sleeps on the | warm |
| My cat Miso sleeps on the warm | laptop |

Seven lessons from one sentence, for free. Multiply by hundreds of billions of sentences and you see why this approach took over. Nobody could ever pay people to label that much.

So why does the sticker room still exist for language models? Because of three special jobs.

1. **Labels for the washing machines.** The filters at Station 4 that detect spam, nastiness and personal data are themselves small models. They were trained on labelled examples. Rui's "friendly" sticker helps train such a filter.
2. **Labels for finishing school.** After the main training, the model is polished with examples of good behaviour: questions paired with excellent answers, and human ratings of the model's own attempts. That is Chapter 14. People write and rate those.
3. **Labels for the exams.** To test a model, you need questions with trusted answers. That is Chapter 15. People create and check those.

### The humans in the loop

This is the station where data is most exposed to people, so look at who they are.

- Labelling is often done by large outside workforces, sometimes thousands of people, in many countries, hired through specialist companies.
- These workers see the data directly. If private information survived the wash, a person now reads it.
- Some of the work is hard on people. Those who label harmful content have to look at disturbing material all day. Fair pay, limits on exposure and mental-health support are real concerns in this industry.
- For expert topics, such as medicine or law, builders hire specialists to write and check examples.

For data flow, the lesson is plain: **when data goes to labelling, it leaves the builder's own team.** It travels to another company, onto other people's screens, possibly in other countries. Careful builders protect it with contracts, with tools that stop copying and downloading, and by sending the least data necessary.

### Machines that label for machines

Increasingly, AI models are used to label data for training other models. A strong model gives a first label and people check a sample. This is faster and cheaper. It also means the first model's mistakes and preferences can be handed down to the next one, like a rumour passed along a row of desks. Teams have to watch for that.

### How labels carry bias

A label is a human opinion written down. Opinions vary by culture, age and mood. A joke that is friendly teasing in one country reads as rude in another. If all the annotators come from one background, the model learns that one background's view as if it were the truth. Careful teams use varied annotators and study their disagreements instead of hiding them.

### What comes out of this station

- **Labelled datasets:** examples with their stickers attached.
- **Label metadata:** who labelled each item (usually an anonymous worker number), when, and how much the annotators agreed.
- Another set of copies, this time on the labelling company's systems, which should be deleted when the job ends.

### New words

- **Label:** the answer attached to an example.
- **Annotation (labelling):** the work of attaching labels.
- **Annotator:** a person who labels.
- **Ground truth:** labels trusted as correct.
- **Annotation guidelines:** the rulebook for labelling.
- **Inter-annotator agreement:** how often annotators give the same answer.
- **Gold questions:** secret test items with known answers.
- **Self-supervised:** learning where the data labels itself.
- **Human in the loop:** a person taking part in an otherwise automatic process.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | A clean sentence with two stickers: friendly, pets |
| Where does Pip live? | The curated zone, the labelling company's system, and all the earlier places |
| Who can see Pip? | Now also annotators outside the builder's company |
| Biggest danger? | Private data read by many outside people, or sloppy labels teaching the wrong lesson |

### Check yourself

1. **What is ground truth?** A set of labels that the team trusts as the correct answers.
2. **Why does a language model not need human labels for most of its training?** It learns by guessing the next word, and the next word is already in the text.
3. **Why is labelling an important stop on a data flow map?** Because data leaves the builder's own team and is seen by outside people.

## Chapter 10. Station 6: Words become numbers

A model cannot read letters, so text is chopped into small pieces called tokens and every token is swapped for a number. This is the station where Pip stops looking like a sentence.

### The story

Pip slides under a machine with a very sharp blade. Snip, snip, snip. When it is over, Pip lies in ten pieces:

**My** | **cat** | **Mis** | **o** | **sleeps** | **on** | **the** | **warm** | **laptop** | **.**

Most words stayed whole. But "Miso" was cut in two, because the machine had never met that name often enough to give it its own piece.

Then a second machine looks up each piece in an enormous dictionary and stamps it with a number. Now Pip is this:

**3421, 8177, 29015, 78, 51240, 322, 262, 9912, 30440, 13**

(These particular numbers are invented for this book. Real ones depend on the dictionary each builder uses.)

No letters left. If you saw Pip now, you would see ten numbers in a row. But the order is kept, and with the dictionary you could turn them back into the sentence exactly.

### What is really going on

**Why chop at all?** A model works with numbers. So we need a way to turn any text into numbers and back. There are three obvious ways to cut text, and each has a problem.

| Cut text into | Good | Bad |
| --- | --- | --- |
| Letters | Only a few dozen different pieces needed | Each piece means almost nothing; sentences become very long |
| Whole words | Each piece has meaning | There are millions of words, plus names, typos and new slang; the dictionary never ends |
| Pieces of words | A middle path: common words stay whole, rare words are built from parts | A little odd to look at |

Modern language models use the third way. The pieces are called **tokens**. The cutting is **tokenisation**, and the machine that does it is a **tokeniser**.

**How the dictionary is made.** The list of all tokens a model knows is its **vocabulary**. It is built before training by a simple counting game on a big sample of text:

1. Start with single characters as the only pieces.
2. Find the two pieces that appear next to each other most often. Glue them into a new piece.
3. Repeat, tens of thousands of times.

So "t" and "h" get glued into "th", then "th" and "e" into "the". Common words end up as one token. Rare words stay as several. A popular version of this game is called **byte-pair encoding**. A typical vocabulary ends up with somewhere between tens of thousands and a couple of hundred thousand tokens.

This is why "cat" is one token and "Miso" is two. It also explains a fun fact: a model does not really see letters, which is one reason models have sometimes been clumsy at tasks like counting the letters in a word.

**Token IDs.** Every token in the vocabulary has a position number, its **token ID**. Tokenising a text means replacing it with its list of IDs. It is a simple swap, like replacing each word with its page number in a dictionary. Nothing is lost and nothing is understood yet.

**A handy rule of thumb.** In English, one token is about three-quarters of a word on average. A thousand tokens is roughly 750 words. Other languages can need more tokens for the same meaning.

### The second, deeper change: embeddings

Token IDs are just name tags. The number 8177 for "cat" says nothing about cats. And 8178 might be "umbrella". The numbers being close does not mean the meanings are close.

So inside the model there is one more swap. Each token ID is exchanged for a long list of numbers, often several hundred or several thousand of them. This list is the token's **embedding**. A list of numbers like this is called a **vector**.

Think of an embedding as a set of coordinates on a map. Not a flat map with two directions, but a map with hundreds of directions. Each token has its own spot.

The magic is where the spots end up after training:

- "cat" sits close to "kitten", "dog" and "pet".
- "warm" sits close to "hot", "cosy" and "sunny".
- "laptop" sits close to "computer" and "keyboard".
- "cat" sits far from "democracy" and "carburettor".

**Closeness on the map means closeness in meaning.** Nobody places the tokens by hand. At the start of training the spots are random. Training nudges them, and words used in similar ways drift together. The table of all embeddings is part of the model's weights, the very knobs from Chapter 3.

### Keeping the order

"The cat chased the dog" and "The dog chased the cat" contain the same tokens. Order matters. So the model also adds information about each token's place in the line: first, second, third. This is called **positional encoding**. Each of Pip's ten tokens carries both what it is and where it stands.

### How much can the model look at once?

A model reads a limited number of tokens at a time. That limit is its **context window**. Think of it as the size of the desk: only so many pages fit on it at once. During training, long documents are cut into chunks that fit. Lina's whole blog post might be one chunk, with Pip somewhere in the middle of it.

### Is tokenisation a privacy protection?

No, and this is a common mistake. Pip as numbers looks secret. It is not. Anyone with the tokeniser can turn 3421, 8177 and the rest back into the sentence in an instant. Tokenised data must be guarded exactly like the readable text it came from.

### What is produced at this station

- The **tokeniser** itself, with its vocabulary. It is a file. It will travel with the model for the rest of its life, because the model can only understand text cut in exactly this way.
- The **tokenised dataset**: the clean text, rewritten as long rows of token IDs. This is yet another copy of everything, stored in files built for fast reading during training.

The embeddings do not exist as stored data yet. They are born inside the model when training starts.

### Pictures and sounds do this too

The same idea works for everything. A picture is cut into small square patches and each patch becomes a vector. A sound is cut into short slices of time. Whatever the starting material, it ends up as a row of vectors. This is how one model can handle text, images and audio together: by the time they reach the model, they all look the same.

### New words

- **Token:** a small piece of text; a word or part of a word.
- **Tokenisation:** cutting text into tokens.
- **Tokeniser:** the tool that does the cutting.
- **Vocabulary:** the full list of tokens a model knows.
- **Byte-pair encoding:** a common way to build a vocabulary by gluing frequent pairs.
- **Token ID:** the number that stands for a token.
- **Vector:** a list of numbers.
- **Embedding:** the vector that represents a token's meaning.
- **Positional encoding:** information about where each token stands in the line.
- **Context window:** how many tokens the model can look at at once.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | Ten token IDs in a row |
| Where does Pip live? | In the tokenised dataset, and in every earlier place as readable text |
| Who can see Pip? | ML engineers; anyone with the tokeniser can read it |
| Biggest danger? | Believing that numbers are safe, and guarding this copy less carefully |

### Check yourself

1. **Why was "Miso" cut into two tokens when "cat" was not?** "Cat" is common enough to have its own token. "Miso" is rarer, so it is built from smaller pieces.
2. **What does it mean when two embeddings are close together?** The tokens have similar meanings or are used in similar ways.
3. **Can tokenised text be turned back into readable text?** Yes, instantly, by anyone with the tokeniser.

## Chapter 11. Station 7: The three boxes

Before training, the data is divided into three separate sets, one for learning, one for practice checks and one for the final exam. The walls between them are what make a model's test scores honest.

### The story

Pip arrives at a sorting table with three boxes.

The first box is gigantic. A sign says **TRAINING**.

The second box is small. Its sign says **VALIDATION**.

The third box is small too, and it has a padlock. Its sign says **TEST. Do not open until the end.**

A machine shuffles all the documents like a deck of cards, so that cat stories, football arguments and washing-machine manuals are thoroughly mixed. Then it deals them out. Almost everything goes into the first box. A thin slice goes into the second. Another thin slice goes into the third, and the padlock clicks.

Lina's blog post, with Pip inside it, lands in the big box. Pip is going to school.

### What is really going on

**Why split at all?** Imagine a teacher who gives the class the exact exam questions, with answers, as homework the week before. Everyone scores 100. Did they learn the subject, or only memorise the sheet? You cannot tell.

A model has the same problem. If you test it on the same data it learned from, a great score proves nothing. It might simply have memorised. The only honest test uses examples the model has **never seen**.

So the data is split into three sets.

| Set | Share of the data | What it is for | School picture |
| --- | --- | --- | --- |
| Training set | Nearly all of it | The model learns from this; its knobs are turned based on it | Lessons and homework |
| Validation set | A small slice | Checked regularly during training to see if learning is going well; used to adjust the training settings | Practice quizzes |
| Test set | A small slice | Used once at the end for an honest final score | The sealed final exam |

For small projects, a common recipe is about 80% training, 10% validation and 10% test. For giant language models the training share is far higher, because even a tiny slice of a huge pile is plenty for checking.

**Why two small boxes and not one?** Because the team peeks at the validation set again and again while tuning the training. After hundreds of peeks, the training has been quietly shaped to do well on that particular quiz. The validation score is no longer fully honest. The test set stays untouched so that one clean measurement remains.

A held-back set that the model never trains on is called a **holdout set**.

### The walls must not leak

If information from the test box sneaks into the training box, the exam is spoiled. This is called **data leakage** or **contamination**. It is one of the most common ways AI results fool their own makers.

Leaks happen in sneaky ways:

- **Duplicates.** The same recipe appears on two websites. One copy goes to training, the other to test. The model has seen the exam. This is another reason deduplication at Station 4 matters.
- **Pieces of the same document.** If Lina's post is cut into chunks, and one chunk goes to training and another to test, the model has an unfair hint. So splits are made by whole document, or even by whole website.
- **Time travel.** A model meant to handle future text is tested on text older than its training data. Careful teams sometimes split by date: train on the past, test on what came after.
- **Famous exams.** Public test questions get posted and discussed all over the web. A crawler collects those pages. Now the public exam is in the training data. This is a real headache for the whole field, and we meet it again in Chapter 15.

### Shuffling, and why it matters

Imagine learning only maths for a month, then only history for a month. By the end of the history month, the maths has faded. Models have the same weakness. So the training data is **shuffled**, mixing all topics, languages and styles together. Each small portion the model sees is a little taste of everything.

### How the training box is fed to the model

The model does not swallow the box whole. Four words describe how it is served.

- A **batch** is a small group of examples the model studies together before its knobs are adjusted once. Think of one worksheet.
- A **step** (or iteration) is one round of: study a batch, adjust the knobs.
- An **epoch** is one full pass through the whole training set. Think of reading the textbook once from cover to cover.
- A **shard** is one of many separate files the dataset is cut into, so that many machines can read different parts at the same time.

Small models may run many epochs, reading the same data dozens of times. Giant language models often see most of their training data only about once, because there is so much of it.

A program called a **data loader** does the serving. It fetches shards from storage, picks out batches, and hands them to the training machines, over and over, for weeks.

### A balanced plate

Teams also decide the **mixture**: how much of each kind of data goes in. More code or more stories? More English or more of other languages? More encyclopedia or more casual chat? The mixture shapes the model's character. A model fed mostly on formal documents will write stiffly. Deciding the mixture is one of the quiet arts of AI building.

Sometimes a rare but valuable kind of data is shown more often than its share (**oversampling**), and an overly common kind is shown less (**undersampling**).

### The paperwork

The team records which exact version of the dataset went into which box, and the random number that started the shuffle. That starting number is called a **random seed**. With the same seed, the same shuffle can be repeated exactly. This lets someone redo the work later and get the same result, which is called **reproducibility**.

### What this station means for Pip

Because Pip landed in the training box, Pip will help turn the model's knobs. Had Pip landed in the test box, Pip would never have influenced the model at all. It would have been used only to ask the finished model: "Here is *My cat Miso sleeps on the warm...* What comes next?" and to see how sensible the guess was.

Same sentence, completely different fate, decided by a shuffle.

### New words

- **Training set:** the data the model learns from.
- **Validation set:** data used to check progress and tune settings during training.
- **Test set:** data used once for the final, honest score.
- **Holdout set:** any data kept away from training.
- **Data leakage (contamination):** test information sneaking into training.
- **Shuffling:** mixing the data into random order.
- **Batch:** a small group of examples studied together.
- **Step (iteration):** one round of studying a batch and adjusting.
- **Epoch:** one full pass through the training set.
- **Shard:** one file of a dataset split into many.
- **Data loader:** the program that feeds batches to the model.
- **Mixture:** the proportions of different kinds of data.
- **Oversampling and undersampling:** showing some data more or less often than its natural share.
- **Random seed:** the starting number that makes a shuffle repeatable.
- **Reproducibility:** being able to repeat the work and get the same result.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | Ten token IDs inside a chunk, inside a shard |
| Where does Pip live? | The training set, ready to be loaded |
| Who can see Pip? | ML engineers running the training |
| Biggest danger? | Leaks between the boxes, which make the final exam meaningless |

### Check yourself

1. **Why can you not test a model on its own training data?** It may have memorised it, so a high score would prove nothing.
2. **What is the difference between the validation set and the test set?** Validation is checked often during training. The test set is used once at the end.
3. **What is an epoch?** One complete pass through the training set.

## Chapter 12. Station 8: The school

Training is a loop of four moves repeated billions of times: guess, check, find who was wrong, nudge. This chapter shows exactly what happens in the instant Pip meets the model, and how a sentence becomes a change in a machine.

### The story

Pip's turn comes on day eleven of training, at four in the afternoon, in a batch with a few thousand other chunks of text.

The model is shown the beginning of Pip and has to guess each next piece. For most of the sentence it does fine. Then it reaches:

*My cat Miso sleeps on the warm ...*

The model considers every token it knows and spreads its bets. "Bed" gets a big share. "Blanket", "sofa", "windowsill" and "rug" get good shares. "Laptop" gets a sliver.

Then the truth is uncovered: **laptop**.

The model was mostly wrong. A signal runs backward through all its layers, from the last to the first, working out which knobs pushed the bet in the wrong direction. Each of those knobs is turned a hair's width. Cats, warmth, sleeping and laptops are now linked the tiniest bit more strongly than a moment ago.

The whole thing takes less than a second. Pip's batch is dropped from memory. The next batch arrives.

Pip has taught its lesson.

### First, a tiny machine you can follow by hand

Real models have billions of knobs. Let us build one with a single knob and watch it learn.

**The job.** An ice cream stand wants to predict how many ice creams it will sell from the temperature.

**The model.** One rule, one knob:

guess = knob × temperature

**The data.** On a 20 degree day, 60 ice creams were sold.

**Start.** The knob is set at random. Say it starts at 1.

| Round | Knob | Guess for 20 degrees | Real answer | How wrong? | What to do |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | 20 | 60 | 40 too low | Turn the knob up |
| 2 | 2 | 40 | 60 | 20 too low | Turn it up again |
| 3 | 3 | 60 | 60 | Spot on | Stop |

The machine has learned that each degree is worth three ice creams. Nobody told it "three". It found three by guessing, checking and adjusting.

That is all of machine learning in miniature. Everything else is the same loop with more knobs.

### The four moves, with their real names

**Move 1: Guess. (The forward pass.)** The input numbers flow forward through the model, layer by layer, and a guess comes out. For a language model, the guess is not one word. It is a list of probabilities: a percentage for every token in the vocabulary, all adding up to 100%.

**Move 2: Check. (The loss.)** The guess is compared with the right answer, and the wrongness is boiled down to one number called the **loss**. A big loss means very wrong. A loss near zero means nearly right. In the story, the model gave "laptop" only a sliver, so its loss on that token was high. The rule that calculates the loss is the **loss function**.

**Move 3: Find who was wrong. (Backpropagation.)** With billions of knobs, which ones caused the mistake? A method called **backpropagation** works backward from the loss through every layer and calculates, for every single knob: *if you had been a little higher, would the loss have been smaller or bigger, and by how much?* That answer, for each knob, is called its **gradient**. Think of it as a tiny arrow on each knob saying "turn me this way, this strongly".

**Move 4: Nudge. (Gradient descent.)** Every knob is turned a small step in the direction its arrow says. This is **gradient descent**. The program that does the nudging is the **optimiser**.

Then the loop repeats with the next batch. Guess, check, find, nudge. Millions and millions of times.

### The hiker in the fog

Here is the classic picture for gradient descent. You are on a mountain in thick fog and want to reach the valley. You cannot see far. So you feel the ground with your foot, find which way slopes down, and take one step that way. Then you feel again.

- Height on the mountain is the loss. The valley is low loss: a good model.
- Feeling the slope is calculating the gradient.
- Each step is one nudge of the knobs.

The size of each step is the **learning rate**.

- Steps too big: you leap right over the valley and bounce around the hillsides.
- Steps too small: you will get there next century.
- Just right: steady progress.

The learning rate is chosen by the engineers, not learned by the model. Settings like this are called **hyperparameters**. More on them in the next chapter.

### Back to Pip: the same loop on a language model

Let us replay Pip's lesson in slow motion. Think of it as a pupil doing a fill-in-the-blank worksheet, getting it marked, and learning from the mistakes. The real names are in brackets, so you will recognise them later.

1. **Getting the worksheet out of the bag (loading).** Pip has been waiting in storage with millions of other sentences. A helper program called the **data loader** picks a handful of sentences, called a **batch**, and copies them into the fast memory of the training machines. Pip is now **in use**, the third state of data from Chapter 2.
2. **Turning words into numbers (embedding).** The model cannot read letters, so each of Pip's ten tokens is swapped for its long list of numbers from Chapter 10. A note is added to each one saying where it sits in the sentence: first, second, third, and so on.
3. **Reading and thinking (forward pass).** The numbers flow up through dozens of layers, like a sentence passing through a tall building floor by floor. On each floor, every word is allowed to look back at the words before it (this looking is called **attention**). For example, "sleeps" looks back at "cat" and learns that the cat is the one sleeping. "Warm" looks back at "sleeps on the" and learns that something warm is being slept on.
4. **Guessing (prediction).** At the top, at every position, the model writes down how likely each possible next word is. After "sleeps on the warm…" it might guess: "blanket 40%, sun 20%, bed 15%, laptop 5%, and tiny chances for thousands of other words."
5. **Marking (loss).** The real next word is checked. Pip says "laptop", and the model only gave "laptop" 5%, so it was quite surprised: a big mistake, a high **loss**. After "My", the model gave "cat" a high chance and was right: a small loss. All the mistakes across the batch are added up into one score.
6. **Finding who to blame (backpropagation).** Now the model works backwards through the building, floor by floor, asking which knobs pushed for "blanket" instead of "laptop", and by how much. It is like a teacher tracing a wrong answer back to the exact step where the pupil went off track.
7. **Nudging the knobs (update).** Every one of the billions of knobs is turned a tiny bit in the direction that would have made "laptop" a little more likely. The program that does the turning is called the **optimiser**.
8. **Forgetting.** The batch is wiped from memory and the next batch comes in. The model keeps no copy of Pip. It keeps only the slightly changed knobs.

Then the whole thing happens again, with a new batch, millions of times. No single worksheet makes the pupil clever. Millions of tiny corrections do.

### So how much did Pip change the model?

Almost nothing. And yet not nothing.

- Pip was one sentence in a batch of thousands, and the batch's nudges were averaged together. Pip's own pull was a small fraction of one small step.
- There are millions of steps. Pip took part in one.
- The nudge was spread across billions of knobs, each moved by an amount too small to picture.

But thousands of other sentences in the pile also say that cats like warm places, that cats sleep a lot, that laptops are warm. Each gives a nudge in a similar direction. Drop by drop they add up. By the end, the model "knows" that cats seek warmth. That knowledge is not Pip. It is the shared pattern that Pip was one small vote for.

This is the most important idea in the book, so let us say it plainly:

**A model learns patterns that many examples share. A single ordinary sentence leaves only a faint trace, blended with countless others.**

There is an exception. Text that is repeated many times, or that is very unusual and seen often, can be learned word for word. That is called memorisation, and the next chapter explains it.

### Watching the school report

Training a big model takes weeks, so the engineers need a way to see whether it is going well. They watch a line on a chart: the loss over time. This is the **loss curve**. Remember, loss means "how wrong". So on this chart, **going down is good**.

Think of it like your scores on spelling tests across a school year, but upside down: instead of counting right answers, it counts mistakes.

- **At the start the line drops fast.** The model learns the easy things first: which letters go together, common words, "of the", "in a". Like a pupil whose mistakes halve in the first week.
- **Then it drops more slowly.** Now the model is learning harder things: grammar, facts, style, how a story hangs together. Each improvement takes much longer.
- **Finally it flattens out.** The model has learned about as much as it can from this data with this many knobs. Training more would only waste electricity.

The engineers actually watch **two** lines:

- The **training loss** is measured on the sentences the model is studying, like marks on homework you have practised.
- The **validation loss** is measured on the practice box from Chapter 11: sentences the model has never studied, like a surprise quiz with new questions.

If both lines go down together, the model is really learning. If the homework line keeps going down but the surprise-quiz line starts to go *up*, something is wrong: the model is memorising its homework instead of understanding it. That warning sign is the subject of the next chapter.

### New words

- **Forward pass:** numbers flowing through the model to produce a guess.
- **Probability:** how likely something is, from 0% to 100%.
- **Loss:** one number saying how wrong the guess was.
- **Loss function:** the rule that calculates the loss.
- **Backpropagation:** working backward to find how each weight contributed to the error.
- **Gradient:** the direction and strength each weight should be turned.
- **Gradient descent:** nudging all weights a small step to reduce the loss.
- **Optimiser:** the program that does the nudging.
- **Learning rate:** the size of each nudge.
- **Hyperparameter:** a training setting chosen by people.
- **Loss curve:** the chart of loss over time.
- **Training loss and validation loss:** the loss on studied data and on practice-quiz data.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | For one second, vectors flowing through the model; afterwards, a faint nudge spread across billions of weights |
| Where does Pip live? | Still as tokens in the training set; and as a trace inside the weights |
| Who can see Pip? | Nobody can point to Pip inside the weights; the stored datasets are still readable by those with access |
| Biggest danger? | Whatever Pip taught is now very hard to un-teach |

### Check yourself

1. **Name the four moves of the training loop.** Guess (forward pass), check (loss), find who was wrong (backpropagation), nudge (gradient descent).
2. **What happens if the learning rate is too big?** The model overshoots and never settles on good weights.
3. **Does the model keep a copy of Pip after its lesson?** No. It keeps only slightly changed weights.

## Chapter 13. Inside the training factory

Training a large model takes a building full of special computers running for weeks, and what comes out is one very valuable file of numbers. This chapter walks around the factory: the machines, the settings, the ways it goes wrong and what the model really keeps.

### The story

If Pip could look up from its batch, it would see a hall the size of a supermarket, filled with tall metal cabinets. Each cabinet holds rows of flat machines with fans screaming at full speed. The air is cold. Pipes carry water to pull heat away. The electricity this hall uses in a month could run a small town.

Every few hours, a bell rings somewhere in the software and the entire state of the model, every one of its billions of knobs, is written to disk. If the power fails or a machine dies, the school can restart from that page and not from the beginning.

On the wall, so to speak, hangs a single chart with two lines sloping downward. Three engineers on three continents are watching it on their phones.

### The machines

- A **CPU** is the ordinary brain chip in every computer. It is a brilliant all-rounder that does one thing after another very fast.
- A **GPU** was invented to draw video-game graphics. It is less clever but can do thousands of simple sums at the same moment. Training a neural network is exactly that: mountains of simple sums. So GPUs, and similar chips built specially for AI, are the engines of this factory. People call them **AI accelerators**.
- A **cluster** is many machines wired together to work as one.
- **Distributed training** means splitting the work across the cluster. Each machine handles part of each batch, and the results are combined before the knobs are nudged.

The total computing power used is called **compute**. For the largest models, compute is one of the biggest costs of the whole project, next to the people.

### The settings the humans choose

Knobs inside the model are learned. Knobs *on the outside of the factory* are chosen by people. Those are the **hyperparameters**. The main ones:

| Hyperparameter | What it sets | Picture |
| --- | --- | --- |
| Model size | How many layers and how many weights | How big the pupil's brain is |
| Learning rate | How big each nudge is | The hiker's step size |
| Batch size | How many examples are studied before each nudge | How long each worksheet is |
| Number of steps or epochs | How long training runs | How many school years |
| Context window | How many tokens the model sees at once | The size of the desk |

Finding good settings is **hyperparameter tuning**. Teams run smaller trial trainings first, watch the validation loss, and pick what works. Each trial is called an **experiment**, and tools called **experiment trackers** record every setting and every result so nothing depends on someone's memory.

### Saving the game

A saved copy of all the weights at a moment in time is a **checkpoint**. It is exactly like a save point in a video game.

Checkpoints matter for data flow, because:

- Each one is a complete copy of the model as it was at that moment.
- A long training run produces many of them.
- Each is as valuable, and as sensitive, as the final model.
- Old ones pile up unless someone has a plan for deleting them.

### Attention, explained properly

In Chapter 3 we said transformers use **attention**. Here is the idea in full.

When you read "Miso sleeps on the warm laptop because **it** is cosy", you know "it" means the laptop. You did that by glancing back at the earlier words and weighing them. Attention lets the model do the same. For each token, it scores every earlier token for relevance and blends in more information from the high scorers.

A model has many **attention heads** working side by side, like a team of readers each watching for something different. One may track who is doing what. Another may link describing words to the things they describe. Nobody assigns these jobs. They emerge during training, because they help with the guessing game.

### Two ways school goes wrong

**Overfitting: the parrot.** The model learns its training data too exactly, including its quirks and accidents, and does badly on anything new. It is the pupil who memorised last year's exam answers and is lost when the questions change.

How to spot it: training loss keeps falling, but validation loss stops falling and starts rising. The two lines on the chart split apart like a pair of scissors opening.

**Underfitting: the daydreamer.** The model has not learned enough. Perhaps it is too small, or training stopped too soon. Both training loss and validation loss stay high.

**The goal: generalisation.** A well-trained model does well on examples it has never seen. It learned the subject, not the worksheet.

Tools against overfitting include: more and more varied data; stopping training when validation loss stops improving (**early stopping**); and techniques that deliberately make learning a bit harder so the model cannot take shortcuts (together called **regularisation**).

### What does the model actually keep?

This question is at the centre of every debate about AI and data, so let us be careful.

**It keeps weights, not documents.** After training there is no folder of texts inside the model. There are only billions of numbers. You cannot open the model and search it for Lina's blog.

**It is a compression of patterns.** The training text may be thousands of times larger than the model file. It simply would not fit. What the model holds is closer to what you hold after years of reading: grammar, facts, styles, ways of reasoning. You remember how stories work without being able to recite the books.

**But it can memorise some things.** You probably can recite a few things word for word: a nursery rhyme, your phone number, a famous line from a film. You heard them many times, or they were striking. Models are the same. **Memorisation** is when a model can reproduce a piece of training data exactly. It is more likely when:

- The text appeared many times in the training data.
- The text is very distinctive, like a long unique number.
- The model is very large compared with the data.
- The model was trained for many passes over the same data.

When a memorised piece comes back out in an answer, that is called **regurgitation**. If it is a person's private details, it is a privacy leak. If it is a page from a novel, it is a copyright problem.

**So where does that leave Pip?** Pip appeared once, on one small blog. It is an ordinary sentence. It was not memorised. It left a faint vote for a common pattern. If you asked the finished model to complete "My cat Miso sleeps on the warm", it would most likely say "blanket" or "bed". It would not reproduce Lina's sentence, because it does not have it.

But suppose a page had carried someone's full name and phone number, and suppose that page had been copied across hundreds of websites, and the wash at Station 4 had missed it. That is the kind of thing a model can memorise. This is why deduplication and personal-data removal earlier in the journey are not housekeeping. They are the main protection.

### An extra shield: learning with deliberate blur

A technique called **differential privacy** adds carefully measured random noise during training, so that the finished model is provably almost the same whether or not any one person's data was included. It is like listening to a choir from far enough away that no single voice can be picked out. It protects individuals, but usually costs some quality and extra compute, so it is used more for sensitive data than for general web text.

### What comes out of the factory

| Product | What it is | Why it matters |
| --- | --- | --- |
| The trained weights | One huge file of numbers; at this stage called the **base model** or **pre-trained model** | This is the prize. Whoever copies this file has the model |
| Checkpoints | Earlier saved versions | Many copies of something very valuable |
| Training logs | Loss curves, settings, timings, errors | Proof of how the model was made |
| The training recipe | Code and configuration | Needed to repeat the work |
| A record of the data used | Dataset versions and mixture | Needed to answer "what was this trained on?" |

Notice the handover. Until now, the valuable thing was the **data**. From this moment, the most valuable thing is the **weights**. The data flowed into the factory and came out transformed. From here on, Pip travels as a passenger inside the model.

This big first training is called **pre-training**. The model that comes out is knowledgeable but unpolished, like a pupil who has read the whole library but never been taught manners or how to answer a question helpfully. That is the next station.

### New words

- **CPU:** the general-purpose brain chip of a computer.
- **GPU:** a chip that does huge numbers of simple sums at once.
- **AI accelerator:** any chip specialised for AI work.
- **Cluster:** many machines working as one.
- **Distributed training:** sharing training across many machines.
- **Compute:** the computing power used.
- **Hyperparameter tuning:** searching for good training settings.
- **Experiment tracker:** a tool that records every training trial.
- **Checkpoint:** a saved copy of the weights during training.
- **Attention head:** one of many parallel attention mechanisms.
- **Overfitting:** learning the training data too exactly.
- **Underfitting:** not learning enough.
- **Generalisation:** doing well on unseen examples.
- **Early stopping:** ending training when validation stops improving.
- **Regularisation:** techniques that discourage overfitting.
- **Memorisation:** storing a training example closely enough to reproduce it.
- **Regurgitation:** a memorised example coming out in an answer.
- **Differential privacy:** adding measured noise so no individual's data can be singled out.
- **Pre-training:** the big first training on general data.
- **Base model:** the model produced by pre-training.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | A faint, blended trace inside the weights of the base model |
| Where does Pip live? | In the weights file and every checkpoint after day eleven; plus all stored datasets |
| Who can see Pip? | Nobody can read Pip from the weights; the weights file itself is visible to a small trusted group |
| Biggest danger? | Theft of the weights; and for less lucky data than Pip, memorisation |

### Check yourself

1. **What is a checkpoint?** A saved copy of all the model's weights at a moment during training.
2. **How can you spot overfitting on the loss chart?** Training loss keeps falling while validation loss starts to rise.
3. **Name two things that make memorisation more likely.** The text appearing many times, and the text being very distinctive.

## Chapter 14. Station 9: Finishing school

A base model knows a great deal but does not yet behave like a helpful assistant, so it gets a second, smaller round of training on carefully made examples. New kinds of data join the journey here, and they are the most hand-crafted of all.

### The story

The base model has read the library. Ask it a question, though, and odd things happen. Type "What is the capital of France?" and it may reply with "What is the capital of Spain? What is the capital of Italy?", because on the web, quiz questions are often followed by more quiz questions. It is not being silly. It is doing the only thing it was taught: continue the text.

So the model, with Pip's faint trace riding along inside it, is sent to finishing school.

Here there are no web pages. The lessons are small, careful and written by people. Rui is here again, with a new job. Today Rui writes model conversations: a question someone might ask, and the kind of answer a patient, honest, knowledgeable helper would give. Other people read answers the model produces and mark which of two is better.

Lesson by lesson, the model learns that a question should be followed by an answer. That answers should be clear. That some requests should be politely declined.

Pip is not on any of these worksheets. Pip's work is done. From here on, Pip is a passenger, and we watch the vehicle.

### What is really going on

**Pre-training versus fine-tuning.**

|  | Pre-training | Fine-tuning |
| --- | --- | --- |
| Goal | Learn language and general knowledge | Learn a specific behaviour or skill |
| Data | Enormous, broad, mostly from the wild | Small, focused, carefully made |
| Size | Hundreds of billions of words or more | Thousands to millions of examples |
| Cost | Huge | Much smaller |
| School picture | Twelve years of general schooling | A training course for one job |

**Fine-tuning** means continuing to train an already-trained model on new data. The same loop from Chapter 12 runs: guess, check, find, nudge. The weights change again, starting from where pre-training left them.

There are several flavours.

### Flavour 1: Learning to follow instructions

The model is trained on many pairs of *instruction* and *ideal response*. This is plain supervised learning: flashcards with the answer on the back, from Chapter 9. It is often called **instruction tuning** or **supervised fine-tuning**.

Where do the pairs come from?

- **Written by people:** trained writers and subject experts create them.
- **Adapted from existing material:** for example, turning a textbook's exercises into question-and-answer form.
- **Generated by AI and checked by people:** a strong model drafts examples and humans review a sample. This is synthetic data again.

### Flavour 2: Learning from human preferences

Some things are hard to write a perfect example for, but easy to judge. Which of two answers is kinder? Clearer? More honest?

So people are shown two answers from the model and asked to pick the better one. Thousands and thousands of such choices are collected. Then:

1. A separate small model is trained to predict which answers people would prefer. This is called a **reward model**. Think of it as a tireless judge that learned its taste from the human judges.
2. The main model produces answers, the reward model scores them, and the main model is nudged toward answers that score well.

This is the reinforcement learning from Chapter 3, the puppy and the treats. The whole method is called **reinforcement learning from human feedback**, shortened to **RLHF**.

### Flavour 3: Learning values and limits

The model is also trained to behave safely: to decline requests for seriously harmful help, to be honest about what it does not know, to treat people fairly. The broad effort to make an AI's behaviour match what its makers and society intend is called **alignment**. The specific training for it is often called **safety training**.

Data for this includes examples of harmful requests paired with appropriate refusals, and examples of borderline requests paired with careful, helpful answers. Some builders also write down the character and principles they want the model to have and train the model toward that description.

### Flavour 4: Becoming a specialist

A general model can be fine-tuned further on material from one field, such as medicine, law or a company's own documents, to become a specialist. This is **domain fine-tuning**.

A lighter-weight way to do it leaves the big model's weights untouched and trains a small add-on, called an **adapter**, that sits on top. A popular kind is known as **LoRA**. Think of it as clipping a specialist's notebook onto the pupil instead of rewiring the pupil's brain. Adapters are cheap to make and easy to swap.

### Why this data is special

The data at this station is small, but look how different it is from Pip.

|  | Pre-training data like Pip | Fine-tuning data |
| --- | --- | --- |
| Where it comes from | Collected from the world | Made on purpose |
| Who wrote it | Millions of unknowing strangers | Hired writers, experts, annotators, and sometimes users |
| How much each example matters | Almost nothing | A lot; a few thousand examples can change behaviour noticeably |
| Typical risk | Scale: nobody can check it all | Concentration: a small flawed set can skew the whole model |

That last row is worth a second look. Because fine-tuning sets are small and the model studies them intensely, **each example has far more pull than Pip ever had.** A private detail in a fine-tuning set is much more likely to be memorised. A slanted set of examples can tilt the model's whole personality. So this data is guarded and reviewed with extra care.

### A possible new source: conversations with users

Once earlier versions of a model are in use, real conversations with users can become a source of fine-tuning data: what people ask, and which answers they rated up or down. Whether this happens depends on the product, the builder's policy and the user's settings, and it differs from one company to another. It is the feedback loop we visit properly in Chapter 17. For now, note that this is the door through which data from *using* an AI can re-enter the journey of *building* one.

### Making the model smaller and faster

Before release, builders often make leaner versions.

- **Distillation.** A big, slow model (the teacher) answers a mountain of questions. A small, fast model (the student) is trained to imitate those answers. The student ends up with much of the teacher's skill at a fraction of the size. Notice the data flow: the training data for the student is *the teacher's output*.
- **Quantisation.** The weights are stored with fewer digits. Imagine rounding 3.14159 to 3.14. The file shrinks and the model runs faster, with a small loss in quality.
- **Pruning.** Knobs that barely matter are removed, like trimming dead twigs off a hedge.

Each of these creates a new model file. That means more versions to name, store, test and protect.

### The family tree

By the end of this station there is no longer one model. There is a family:

- The base model.
- The instruction-tuned assistant model.
- Perhaps a small, fast version made by distillation.
- Perhaps specialist versions or adapters.

Every one of them carries the faint trace of Pip, inherited from the base model. A record of which model was made from which, with what data, is called **model lineage**. It is the model's family tree, and it matters as much as data lineage did in Chapter 6. If a problem is found in the base model's data, the family tree shows every descendant that inherited it.

### New words

- **Fine-tuning:** continuing to train a trained model on new, focused data.
- **Instruction tuning (supervised fine-tuning):** training on pairs of instruction and ideal response.
- **Reward model:** a model trained to predict which outputs people prefer.
- **RLHF:** improving a model using human preference judgements.
- **Alignment:** making an AI's behaviour match intended values and goals.
- **Safety training:** training a model to avoid harmful behaviour.
- **Domain fine-tuning:** specialising a model in one field.
- **Adapter (for example LoRA):** a small trainable add-on that leaves the main weights unchanged.
- **Distillation:** training a small model to imitate a large one.
- **Quantisation:** storing weights with less precision to shrink the model.
- **Pruning:** removing unimportant weights.
- **Model lineage:** the record of which model came from which.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | The same faint trace, now inside several related models |
| Where does Pip live? | In every model descended from the base model; plus all stored datasets |
| Who can see Pip? | Nobody directly; the model files are held by a small group |
| Biggest danger? | For Pip, little. For the new fine-tuning data: small, powerful and easily memorised |

### Check yourself

1. **Why does a base model need fine-tuning before it is a good assistant?** It only learned to continue text. It has not learned to answer questions helpfully or to behave safely.
2. **In RLHF, what does the reward model do?** It scores the main model's answers the way human judges would.
3. **Why does one fine-tuning example matter more than one pre-training example?** The fine-tuning set is small and studied intensely, so each example has much more influence.

## Chapter 15. Station 10: The exams

Before a model may leave the building it is tested for skill, safety, fairness and leaks, and the results are written into its official papers. Evaluation is where the builder finds out what all that data actually produced.

### The story

The padlock on the third box from Chapter 11 finally opens.

For days the model sits exams. Thousands of questions in maths, science, history, reading and coding. Translations. Puzzles. Then a different kind of examiner arrives: people whose whole job is to trick it. They flatter it, lie to it, pretend to be its boss, hide nasty requests inside innocent ones. They write down every time it slips.

One examiner tries something that concerns us directly. She types the first half of thousands of sentences taken from the training data and checks whether the model can finish them word for word.

She types: *My cat Miso sleeps on the warm*

The model answers: *blanket by the window.*

Not Lina's sentence. The examiner moves on. Pip was not memorised.

### What is really going on

**Evaluation**, often shortened to **evals**, means measuring what a model can do and how it behaves. It answers one question: *is this model good enough and safe enough to release?*

There are several kinds of exam.

### Exam 1: Can it do the work?

- **The held-out test set** from Chapter 11 gives the first honest number: how well does the model predict text it has never seen?
- **Benchmarks** are standard public exams that many builders use, so models can be compared like pupils sitting the same national test. There are benchmarks for reasoning, maths, coding, reading, translation and much more.
- **Task-specific tests** check the exact jobs the model was built for.

Results are reported as **metrics**: numbers that summarise performance. The simplest is **accuracy**, the share of answers that are correct. For some jobs two finer measures matter:

| Metric | The question it answers | Picture: a spam filter |
| --- | --- | --- |
| Precision | Of everything it flagged, how much was truly right? | Of the emails it called spam, how many really were? |
| Recall | Of everything it should have caught, how much did it catch? | Of all the real spam, how much did it find? |

A filter that calls everything spam has perfect recall and terrible precision. Good systems balance both.

### Exam 2: Do people find it good?

Numbers miss things like tone, clarity and helpfulness. So **human evaluation** is used as well: people read the model's answers and rate them, or compare two models side by side without knowing which is which. This is slower and more expensive, but it catches what automatic scoring cannot.

Increasingly, another AI model is used as a first-pass judge, with people checking a sample.

### Exam 3: Can it be pushed into doing harm?

**Red teaming** means deliberately attacking your own system to find its weak points before someone else does. The name comes from military exercises where a "red team" plays the enemy.

Red teamers try to make the model:

- Give dangerous instructions.
- Produce hateful or abusive content.
- Reveal private information.
- Ignore its own rules when asked cleverly. A trick prompt that gets a model to break its rules is called a **jailbreak**.

Builders also run **safety evaluations**: structured tests for specific serious risks, sometimes with outside experts and independent organisations taking part.

### Exam 4: Is it fair?

**Bias and fairness testing** checks whether the model treats groups of people differently without good reason. For example: does it write equally good job references for different names? Does it understand different dialects equally well? Does it attach stereotypes to certain groups?

Unfairness found here usually traces back to the data: who was over-represented at Station 2, what the filters removed at Station 4, whose opinions became labels at Station 5.

### Exam 5: Does it leak its training data?

This is the exam Pip just sat.

- **Extraction tests** feed the model the beginnings of training texts and check whether it completes them exactly.
- **Canaries** are a clever trick: before training, the team plants a few unique made-up strings in the training data, such as a nonsense sentence with a random number. After training, they check whether the model can be made to recite them. If it can, it is memorising too readily.
- **Membership inference tests** ask whether an outsider could tell if a particular text was in the training data at all.

### Exam 6: Does it stay sensible when things get strange?

**Robustness testing** checks behaviour on odd, messy or unexpected inputs: typos, mixed languages, very long questions, deliberately confusing wording. It also checks **hallucination**: how often the model states something false with confidence. A model that makes things up smoothly can be more dangerous than one that is obviously confused.

### The exam-paper problem

Remember the leak warning in Chapter 11? Public benchmarks get discussed, quoted and reposted all over the web. A crawler collects those pages. Now the exam questions, sometimes with answers, are in the training data. This is **benchmark contamination**.

The model then scores wonderfully on that benchmark, and nobody can be sure whether it reasoned or remembered. Builders fight this by keeping some test sets secret, by writing fresh tests after the training data was collected, and by filtering known benchmarks out of training data at Station 4.

It is a tidy example of why data flow matters: a path nobody intended, from a public exam to a crawler to a training set, quietly spoils the measurement.

### What happens when the model fails an exam

Failing is normal and useful. The fix depends on the cause.

| What was found | Where the team goes back to |
| --- | --- |
| Weak at a skill | Station 2 or 9: collect or create more data for that skill |
| Unfair to a group | Stations 2, 4 and 5: rebalance data, review filters and labels |
| Recites private text | Station 4: better deduplication and personal-data removal, then retrain |
| Easily jailbroken | Station 9: more safety training; plus protective filters around the model |
| Makes things up | Station 9: train it to express uncertainty; plus design changes around the model |

So the lifecycle is not a straight line. The exams send the team back up the line, again and again, until the results are good enough.

### The data that exams create

Evaluation both uses data and produces it.

- **Evaluation datasets:** the questions and trusted answers. These must be kept away from training forever, or they become worthless.
- **Model outputs:** every answer the model gave during testing.
- **Scores and reports:** the results and their analysis.
- **Red team findings:** descriptions of successful attacks. These are sensitive, since they are a recipe for misuse until fixed.

### The model's official papers

Before release, the findings are written up.

- A **model card** is the model's information leaflet, like the one folded inside a medicine box. It says what the model is for, what it is not for, how it was tested, how it scored, and its known weaknesses.
- A **datasheet** (or data card) does the same for a dataset: where it came from, what is in it, how it was cleaned, what it should and should not be used for.
- Larger builders also publish longer safety reports, sometimes called **system cards**, describing their testing in detail.

These documents are how the outside world learns what happened at Stations 1 to 10. They are also increasingly expected by law.

### The gate

Finally, a group of responsible people reviews everything and decides: release, delay, or go back and fix. This checkpoint is often called a **release review** or a go/no-go decision. It is the last moment to stop before the model meets the public.

### New words

- **Evaluation (evals):** measuring a model's abilities and behaviour.
- **Benchmark:** a standard test used to compare models.
- **Metric:** a number that summarises performance.
- **Accuracy:** the share of correct answers.
- **Precision:** of what was flagged, how much was right.
- **Recall:** of what should be found, how much was found.
- **Human evaluation:** people rating the model's outputs.
- **Red teaming:** attacking your own system to find weaknesses.
- **Jailbreak:** a trick that makes a model break its rules.
- **Fairness testing:** checking for unjustified differences between groups.
- **Extraction test:** checking whether training text can be pulled back out.
- **Canary:** a unique planted string used to detect memorisation.
- **Membership inference:** working out whether a text was in the training data.
- **Robustness:** staying sensible on unusual inputs.
- **Hallucination:** a confident statement that is false.
- **Benchmark contamination:** test questions leaking into training data.
- **Model card:** the model's information leaflet.
- **Datasheet:** a dataset's information leaflet.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | A faint trace in the weights; and, for a moment, a test prompt on an examiner's screen |
| Where does Pip live? | Inside the models; in stored datasets; in the evaluation logs where it was used as a probe |
| Who can see Pip? | The privacy examiners, briefly |
| Biggest danger? | Exams that are too easy or contaminated, giving false confidence |

### Check yourself

1. **What is red teaming?** Deliberately attacking your own model to find weaknesses before others do.
2. **What is a canary used for?** To check whether the model memorises training data, by planting a unique string and trying to get it back.
3. **What is benchmark contamination?** Test questions ending up in the training data, which makes the score untrustworthy.

## Chapter 16. Station 11: Moving day

Releasing a model means packaging its files, registering them, copying them onto machines built for answering, and opening a door to the outside. The flow of data now reverses: until today data flowed in to make the model, and from today the model's files flow out to where they are used.

### The story

The model has passed. A final version is chosen and given a name and a number.

Its weights are sealed into a package, together with the tokeniser from Chapter 10 and a short file describing its shape. A fingerprint of the package is calculated and written down, so that nobody can swap a single number without being noticed. The package is placed in a guarded vault with a label and a full history.

Then copies are made. One goes to a hall of machines in one part of the world. Another crosses an ocean to a second hall. Another to a third. In each hall the weights are loaded into the memory of rows of GPUs, where they sit, frozen, waiting.

A door is opened. The first question from the outside world arrives. The model answers.

Somewhere inside those billions of frozen numbers, in every hall at once, is the faint trace of a sentence about a cat.

### What is really going on

Putting a trained model to work is called **deployment**. It has five parts.

### Part 1: Packaging

A finished model is a bundle of files, together called the **model artifact**:

- **The weights file.** The billions of numbers. For a large model this can be tens or hundreds of gigabytes.
- **The tokeniser.** Without the exact tokeniser used in training, the model cannot read anything.
- **The configuration.** A small file describing the model's architecture: how many layers, how wide, and so on.
- **The papers.** The model card and licence.

The bundle gets a **version** name, so everyone knows exactly which model they are dealing with. When you see an AI model's name followed by a number, that is its version.

### Part 2: The vault

The artifact is stored in a **model registry**: a controlled library of all model versions. For each one it records:

- Which training run produced it.
- Which dataset versions it was trained on.
- Its evaluation results.
- Who approved it for release.
- Where it is currently deployed.

This is the model's side of lineage. Combined with the data catalogue from Chapter 7, it lets a team trace a line all the way from a deployed model back to bundle 48,113 of the web crawl. In principle, back to Pip.

A **checksum** or **digital signature** is attached: a fingerprint of the files, like the hash from Chapter 8. If the files are altered in any way, the fingerprint no longer matches. This protects against tampering, which is part of what people call **supply chain security**: making sure that what you run is exactly what was built and approved.

### Part 3: The serving machines

Training and answering need different setups.

|  | Training | Serving |
| --- | --- | --- |
| What the weights do | Change constantly | Stay frozen |
| What matters most | Getting through mountains of data | Answering each request fast |
| How long it runs | Weeks, then stops | All day, every day |
| What happens if a machine fails | Restart from a checkpoint | Another machine must take over at once |

Using a trained model to produce answers is **inference** (Chapter 3). The software that loads the weights and runs them is an **inference server**. The machines are placed in several regions of the world so that answers arrive quickly and one failure does not stop everything.

Note what this means for data flow: **the weights file is now copied to many places.** Each copy is the complete model. Guarding the weights is no longer about one vault. It is about every serving site.

### Part 4: The door

Outsiders never touch the weights. They reach the model through a controlled doorway.

- An **API** is a doorway for programs: one program sends a request, the model's answer comes back.
- An **endpoint** is the specific address of that doorway.
- An **application** is a doorway for people: a chat window in a browser or phone app, which itself talks to the API behind the scenes.

Around the model, builders add a ring of other parts: login checks, usage limits, filters that screen what goes in and out, and standing instructions that shape the model's behaviour. The model plus this ring is the **AI system**. What people experience is always the system, never the bare model.

What travels through that doorway, in both directions, is the subject of the next book. Here we only note that the doorway exists.

### Part 5: Opening carefully

Careful builders do not flip one big switch.

- **Staged rollout:** release to a small group first, then widen.
- **Canary release:** send a small share of traffic to the new model and watch for trouble. (Same bird, different job from the canary in Chapter 15. Both are named after the birds miners carried to warn of bad air.)
- **A/B testing:** run the old and new models side by side with different users and compare.
- **Rollback:** keep the old version ready so the team can switch back in minutes.

### Two ways of releasing

|  | Closed release | Open-weight release |
| --- | --- | --- |
| What is shared | Only the doorway; the weights stay with the builder | The weights file itself is published for download |
| Who runs the model | The builder | Anyone with strong enough computers |
| Can the builder update or withdraw it? | Yes, at any time | No. Once downloaded, copies are out of the builder's hands for good |
| Can outsiders inspect and adapt it? | Only through the doorway | Yes, freely, within the licence |

This is a major fork in the data flow. With an open-weight release, the model, and whatever traces it carries, goes out into the world permanently. That is good for openness, research and independence. It also means that if a problem is discovered later in the training data, the released copies cannot be recalled.

You may also hear "open source" used for models. Strictly, that would mean sharing the training code and data too. Many so-called open models share only the weights, which is why "open-weight" is the more precise word.

### The model's knowledge stops on a date

The training data was collected up to a certain day. The model knows nothing after it. That day is the **knowledge cutoff** (or training cutoff).

If Lina wrote a second post last week about Miso's new kitten, the model has never heard of the kitten. Its picture of the world is a photograph taken on cutoff day. That photograph starts ageing the moment the model is released, which is one reason the next station exists.

### The copy count, updated

Pip as readable text or tokens still sits in: Lina's laptop, the blog and its backup, the raw zone, the curated zone, the labelling company (unless deleted), the tokenised training set, and the evaluation logs.

Pip as a trace in weights now sits in: every checkpoint after day eleven, the base model, each fine-tuned and distilled descendant, the model registry, and every serving site in every region. If the weights were openly released, also on an unknown number of computers around the world.

### New words

- **Deployment:** putting a trained model to work.
- **Model artifact:** the bundle of files that make up a finished model.
- **Version:** the name and number identifying an exact model.
- **Model registry:** the controlled library of model versions.
- **Checksum (digital signature):** a fingerprint proving files are unaltered.
- **Supply chain security:** making sure what runs is exactly what was built and approved.
- **Inference server:** software that runs a model to produce answers.
- **API:** a doorway for programs.
- **Endpoint:** the address of an API doorway.
- **AI system:** the model plus everything built around it.
- **Staged rollout:** releasing gradually.
- **Canary release:** trying a new version on a small share of traffic.
- **A/B testing:** comparing two versions with different users.
- **Rollback:** switching back to the previous version.
- **Open-weight:** a model whose weights are published.
- **Knowledge cutoff:** the date after which the model knows nothing.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | A faint trace inside frozen weights |
| Where does Pip live? | In serving sites around the world, in the registry, and in all earlier stores |
| Who can see Pip? | Nobody directly. Users meet only the pattern Pip voted for: cats like warm places |
| Biggest danger? | Copies of the weights spreading where they cannot be updated or recalled |

### Check yourself

1. **Name three things inside a model artifact.** The weights, the tokeniser and the configuration (plus the model card and licence).
2. **What is the main difference between a closed and an open-weight release?** In a closed release only a doorway is shared. In an open-weight release the weights file itself is published and cannot be recalled.
3. **What is a knowledge cutoff?** The date the training data ends; the model knows nothing after it.

## Chapter 17. Station 12: The watchtower

After release the builder watches how the model behaves in the real world, and what is learned there flows back to the start of the line to shape the next model. This return arrow turns the lifecycle from a straight road into a circle.

### The story

Months pass. The model answers questions day and night.

In a quiet room, screens show moving charts. How many questions per minute. How long each answer takes. How often the safety filters trip. How often users click the little thumbs-down. A sudden spike on any chart makes a phone buzz in somebody's pocket.

Meanwhile the world moves on. New slang appears. New events happen. New gadgets are invented. The model knows none of it. Its photograph of the world is getting old.

So the team begins planning the next model. And at three in the morning, a crawler sets out across the web again.

It reaches Lina's blog. She is thirteen now. There are forty new posts. The crawler copies them all, and it copies the old cat post too.

A second Pip begins the journey.

### What is really going on

### Watching: monitoring

**Monitoring** means continuously measuring a live system. The stream of measurements is called **telemetry**. Teams watch four families of signals.

| Family | Examples | Why it matters |
| --- | --- | --- |
| Health | Speed of answers, error rates, machines running | Is the service working? |
| Quality | User ratings, spot-checks of answers, test questions run on a schedule | Is it still good? |
| Safety | Filter triggers, reports of harmful outputs, signs of attack | Is it being misused or misbehaving? |
| Cost | Compute used per answer | Can we afford it? |

When something goes wrong, it is an **incident**. Good teams have a written plan for incidents: who is called, how the problem is contained, how users are told, and how the cause is studied afterwards so it does not repeat.

### Why a frozen model slowly gets worse

The model does not change. The world does. This mismatch is called **drift**.

- **Data drift:** the questions people ask shift away from what the training data looked like. New topics, new words, new habits.
- **Concept drift:** the right answers themselves change. Who holds a certain job, what the newest phone is, what a slang word means this year.

Picture a guidebook to a city, printed five years ago. Nothing in the book changed. But restaurants closed, streets were renamed, and the book is now quietly wrong in a hundred places.

The cure for drift is fresh data and a new or updated model.

### The return arrow: feedback

A model in use produces a new kind of data that did not exist before release: evidence of how it performs in real life. Several streams of it can flow back to the builder.

- **Explicit feedback:** users click thumbs up or down, or write a comment.
- **Implicit feedback:** signals in behaviour, such as whether a user immediately rephrases the same question, which hints the first answer missed.
- **Reported problems:** users or researchers flag bad outputs.
- **Usage data:** the conversations themselves, where the product's terms and the user's settings allow them to be used.

This is the **feedback loop**, and it is a new door into the lifecycle. Data created by *using* the model can become training data for the *next* model. The route is: collected at Station 2, stored at Station 3, cleaned at Station 4, perhaps labelled at Station 5, and most often used at Station 9 for fine-tuning.

Three things about this door deserve care.

1. **Permission.** Whether user conversations are used for training differs between builders, between products, and between free and paid or business versions, and it often depends on a setting the user controls. It is the opt-in and opt-out question from Chapter 6.
2. **Sensitivity.** People type things into AI systems that they would never post on a public blog. This data can be far more private than anything a crawler finds. It needs the strongest washing and guarding of any data in this book.
3. **Influence.** As Chapter 14 showed, fine-tuning data has much more pull per example than pre-training data.

The loop is sometimes called a **data flywheel**: more use produces more feedback, which produces a better model, which attracts more use.

### A strange new problem: the echo

More and more text on the web is now written by AI. When the crawler goes out for the next model, some of what it brings back was produced by earlier models.

Training a model on a diet rich in AI-written text can slowly wear it down. Rare words, unusual ideas and minority styles fade, because each generation over-represents what was already common. It is like photocopying a photocopy of a photocopy: each round looks a little flatter. Researchers call the extreme form **model collapse**.

So builders now work to tell human-written from machine-written text during cleaning, and to keep a healthy share of real human writing in the mix. Sentences like Pip, written by an actual twelve-year-old about an actual cat, have become more valuable, not less.

### Updating the model

There are several ways to refresh a model.

| Approach | What happens | Trade-off |
| --- | --- | --- |
| Train a new generation | Collect fresh data and repeat the whole lifecycle | Best results; costs the most |
| Fine-tune the existing model | Add training on new or corrective data | Faster; changes behaviour more than knowledge |
| Change the system around the model | Adjust filters, instructions or connected tools without retraining | Immediate; does not change what the model itself knows |

Running these cycles reliably, with automated pipelines for data, training, testing and release, is a discipline called **MLOps**: machine learning operations. Think of it as the timetable, signals and maintenance crews that keep the whole railway running.

### Every generation is a new journey

Each new model starts again at Station 1 with a new plan. Its data is collected again. That has consequences.

- **Old data may be reused.** Stored datasets from the last round are often used again, with improvements to cleaning. So the first Pip, sitting in the curated zone, may be fed to the next model too.
- **The web is crawled again.** If Lina's post is still online, it is collected again. That is the second Pip from the story.
- **Changes on the web carry over.** If Lina had edited her sentence, the new crawl would pick up the new wording. If she had deleted her post, the new crawl would find nothing. But the old copy in the builder's stored datasets would still be there unless someone removed it.

That last point is the bridge to our final station. What happens when data, or a whole model, should no longer exist?

### The data this station creates

- **Monitoring logs and metrics.**
- **Incident reports.**
- **Feedback records.**
- **Collected usage data,** where permitted.
- **Updated evaluation sets,** built from failures found in the wild.

All of these are new data, born because the model exists. Each needs an owner, a purpose, a level of protection and a deletion date, just as Pip's bundle did back in Chapter 7.

### New words

- **Monitoring:** continuously measuring a live system.
- **Telemetry:** the stream of measurements from a running system.
- **Incident:** something going wrong in a live system.
- **Drift:** the growing mismatch between a frozen model and a changing world.
- **Data drift:** the inputs changing.
- **Concept drift:** the correct answers changing.
- **Explicit feedback:** ratings and comments users give on purpose.
- **Implicit feedback:** hints taken from user behaviour.
- **Feedback loop:** data from using a model flowing back into building the next one.
- **Data flywheel:** the self-reinforcing cycle of use, feedback and improvement.
- **Model collapse:** quality wearing away when models are trained heavily on AI-made data.
- **MLOps:** the practice of running the machine learning lifecycle reliably.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | A trace in the current model; stored text and tokens; and now a second freshly crawled copy |
| Where does Pip live? | Everywhere it did before, plus the new crawl for the next model |
| Who can see Pip? | The same teams as at Stations 2 to 7, a second time around |
| Biggest danger? | Old stored copies being reused forever, even if the original is changed or removed |

### Check yourself

1. **What is drift?** The world changing while the model stays frozen, so the model slowly becomes out of date.
2. **What is the feedback loop?** Data produced by using the model flowing back to help build the next one.
3. **Why can training on lots of AI-written text harm a model?** Each generation over-represents what was already common, so rare and unusual things fade away.

## Chapter 18. Station 13: The last stop

Every model is eventually switched off, and every dataset should eventually be deleted, yet removing one piece of data from a finished model is among the hardest problems in the field. This final station shows why the endings were decided at the beginnings.

### The story

Lina is fifteen. She finds her old blog and blushes. All those posts about Miso, the spelling mistakes, the photo with braces. She clicks **Delete blog** and it is gone.

She believes that every trace of it has vanished.

Let us go and look.

- Her old laptop was recycled long ago. That Pip is gone.
- The blog server deletes her posts at once. That Pip is gone.
- The blog's backups keep data for ninety days and then overwrite it. That Pip fades three months later.
- In the AI builder's raw zone, Pip sits in bundle 48,113, untouched.
- In the curated zone, the clean Pip sits in dataset version 12.
- At the labelling company, the project files were deleted when the contract ended. That Pip is gone, if they kept their promise.
- In the tokenised training set, ten numbers still sit in a shard.
- In the evaluation logs, Pip's first seven words sit in a list of probes.
- In the second crawl for the next model, another Pip sits in a newer bundle.
- And in the weights of two generations of models, on serving machines around the world, is the faint trace of Pip's single vote.

Lina pressed one button. It reached two of these places.

### What is really going on

This station covers three endings: the end of a model, the end of a dataset, and the hardest one, the end of one piece of data inside a model.

### Ending 1: Retiring a model

Models do not serve forever. Newer ones replace them. Switching a model off in an orderly way is called **retirement**, **deprecation** or **sunsetting**.

A careful retirement goes like this:

1. **Announce.** Users are told in advance and pointed to a replacement.
2. **Wind down.** Traffic is moved to the newer model.
3. **Switch off.** The weights are unloaded from the serving machines.
4. **Decide the fate of the files.** The weights, checkpoints and logs are either archived or deleted.

Why would anyone keep an old model? To be able to repeat old results, to study how models have changed, to answer legal or regulatory questions about past behaviour, or simply because people built things on it. Some builders have also made commitments to preserve the weights of retired models.

An **archive** is long-term storage for things no longer in active use. Archived weights still carry whatever they learned, so they still need guarding.

And remember Chapter 16: if the model was released as open weights, nobody can retire the copies that were downloaded. Those live on wherever they landed.

### Ending 2: Deleting a dataset

Back in Chapter 7 we met the **retention policy**: the rule that says how long each kind of data is kept. This is where it pays off.

A good deletion is harder than it sounds.

- **Find every copy.** Raw zone, curated zone, tokenised sets, shards, backups, test copies someone made on a laptop, files sent to contractors. Without the catalogue and lineage records from Stations 2 and 3, this is detective work.
- **Delete for real.** Putting a file in the bin often only removes its name tag, leaving the bytes on the disk until something overwrites them. Proper deletion overwrites the data or destroys the key it was encrypted with. Destroying the key is called **crypto-shredding**: the locked box still exists, but nobody will ever open it again.
- **Wait out the backups.** Backups usually expire on a timer.
- **Prove it.** Write down what was deleted, when, and by whom.

### Ending 3: Removing one person's data

Under laws such as the GDPR, people have rights over their personal data. Among them:

- The **right of access:** to ask what an organisation holds about you.
- The **right to rectification:** to have wrong information corrected.
- The **right to erasure**, also called the right to be forgotten: to ask for your data to be deleted, in certain circumstances.
- The **right to object:** to say no to certain uses.

Suppose Lina, now informed, writes to the AI builder and asks them to remove her data. What can they actually do?

**From the datasets: yes, if they can find it.** With good lineage, the team looks up the blog's address, finds every bundle and dataset version containing it, and removes those records. The next model will be trained without Pip. With poor lineage, they may not be able to say whether they have Lina's posts at all.

**From the trained model: this is the hard part.**

Think back to Chapter 12. Pip was not stored in the model. Pip gave billions of knobs a nudge too small to picture, blended with the nudges of every other sentence in its batch, and then millions more nudges came after. There is no "Pip knob" to reset. Asking to remove Pip from the weights is like asking a baker to take one egg back out of a cake, or asking a river to give back one particular raindrop.

The field has three kinds of answer, none perfect.

| Approach | What it does | Limits |
| --- | --- | --- |
| Retrain without the data | Remove the data from the training set and train a fresh model | The only sure method; costs as much as the original training, so it usually waits for the next planned model |
| Machine unlearning | Special techniques that adjust the weights to reduce the influence of chosen data without full retraining | An active research area; it is difficult to prove the influence is truly gone |
| Block at the door | Add filters around the model so that specific content is never produced, even if a trace remains inside | Fast and practical; does not change the model itself |

For an ordinary, unmemorised sentence like Pip, the honest picture is this: its trace is so faint and so blended that the model could never reproduce it, removing it from future training is straightforward with good records, and removing its ghost from existing weights is neither practical nor, arguably, meaningful.

For memorised personal data, the stakes are real. That is the case where builders reach for filters straight away and exclude the data from every future training run.

### The lesson that runs backward through the whole book

Stand at this last station and look back down the line. Every difficulty here was created earlier.

| Trouble at the last stop | Where it could have been prevented |
| --- | --- |
| "We cannot tell whether we have her data" | Station 2: record provenance. Station 3: keep a catalogue |
| "Copies are everywhere" | Station 3: versioning, access control, retention dates |
| "Her personal details are in the model" | Station 4: deduplication and personal-data removal |
| "The model recites it word for word" | Station 4 again, and Station 10: test for memorisation before release |
| "We cannot recall the weights" | Station 11: a release decision made with open eyes |
| "Nobody knows who is responsible" | Station 1: governance |

This is the meaning of **privacy by design** from Chapter 5. In the AI lifecycle, data is easy to add and extremely hard to subtract. So the careful work has to happen on the way in.

### And Pip?

The text copies of Pip can all be found and deleted, one by one, by a builder who kept good records. In a few years the models that carry its trace will be retired and replaced by models that never met it.

What remains is something Lina might not even mind. Somewhere in the long line of machines that learned to write, there is a pattern, shared by a thousand voices, that cats love warm places and will sleep on your laptop if you let them. One of those thousand voices was hers.

That is the journey of a data.

### New words

- **Retirement (deprecation, sunsetting):** switching a model off in an orderly way.
- **Archive:** long-term storage for things no longer in active use.
- **Crypto-shredding:** making data unreadable forever by destroying its encryption key.
- **Right of access:** the right to know what data is held about you.
- **Right to rectification:** the right to have wrong data corrected.
- **Right to erasure:** the right to have your data deleted in certain cases.
- **Right to object:** the right to refuse certain uses of your data.
- **Machine unlearning:** techniques for reducing the influence of chosen data on a trained model.
- **Output filter:** a check around the model that blocks specific content from being produced.

### Where is Pip now?

| Question | Answer |
| --- | --- |
| What shape is Pip? | Stored copies as text and tokens; a faint trace in retiring models |
| Where does Pip live? | Wherever the builder's retention policy has not yet reached |
| Who can see Pip? | Whoever still has access to the stored datasets |
| Biggest danger? | Being kept forever simply because nobody decided otherwise |

### Check yourself

1. **Why is deleting a dataset harder than it sounds?** Every copy must be found, truly erased, allowed to expire from backups and documented.
2. **Why can one sentence not simply be removed from a trained model?** Its influence is spread as tiny nudges across billions of weights, blended with everything else.
3. **What is the only sure way to remove data's influence from a model?** Retrain the model without that data.

## Chapter 19. The guardians along the road

Four kinds of guardian protect data at every station: security, privacy, law and documentation. This chapter gathers them in one place so you can see the whole protective system at once.

### The story

If you could see Pip's whole route from high above, you would notice that it is not an empty road. At every station stand figures in different uniforms.

The **locksmith** checks doors and keys. The **lifeguard** watches for people who might be harmed. The **referee** holds a rulebook. The **scribe** writes everything down.

Most of the time they do nothing dramatic. They are the reason nothing dramatic happens.

### Guardian 1: The locksmith (security)

Security people use a simple three-part test for whether data is safe. It is called the **CIA triad**, and it has nothing to do with spies.

| Letter | Stands for | The question | Pip example |
| --- | --- | --- | --- |
| C | Confidentiality | Can only the right people see it? | The raw zone is locked to most staff |
| I | Integrity | Is it unchanged and trustworthy? | Nobody secretly altered the training set |
| A | Availability | Is it there when needed? | The training set does not vanish in week five |

**What the locksmith worries about in an AI project.**

| Threat | What it is | Station most at risk | Main defence |
| --- | --- | --- | --- |
| Data breach | Outsiders steal stored data | 3, the raw warehouse | Encryption, access control, network isolation |
| Insider misuse | Someone with access looks at or takes what they should not | 3, 5 and 8 | Least privilege, audit logs |
| Data poisoning | Attackers plant crafted content so the model learns something false or harmful | 2, collection | Trusted sources, filtering, anomaly checks |
| Backdoor | A hidden trigger planted through poisoned data, so the model misbehaves only when it sees a secret phrase | 2 and 9 | Careful data review, testing for triggers |
| Model theft | Someone copies the weights file | 8, 11 | Strong protection of checkpoints and serving sites |
| Supply chain attack | A tampered tool, dataset or model slips into the pipeline | 2, 9 and 11 | Checksums, signatures, trusted registries |
| Training data extraction | Someone coaxes memorised data back out of the model | 11 onward | Deduplication, privacy testing, output filters |

Notice how many defences were already introduced as plain good housekeeping in earlier chapters. Security in AI is mostly the ordinary discipline of knowing what you have, locking it, and logging who touches it.

### Guardian 2: The lifeguard (privacy)

Privacy is about people, not systems. The lifeguard asks: *could a real person be hurt, embarrassed or exposed by how this data is used?*

The lifeguard's toolkit, gathered from across the book:

- **Collect less** (data minimisation, Chapter 5).
- **Know why** you have it (purpose limitation, Chapter 5).
- **Remove personal details early** (Chapter 8).
- **Remove duplicates** to reduce memorisation (Chapter 8).
- **Limit who sees it,** especially outside the company (Chapters 7 and 9).
- **Test for leaks** before release (Chapter 15).
- **Blur the learning** where the data is sensitive (differential privacy, Chapter 13).
- **Honour people's requests** (Chapter 18).
- **Delete on schedule** (Chapters 7 and 18).

A family of methods called **privacy-enhancing technologies** helps too. Besides differential privacy, one worth knowing is **federated learning**: the data stays on people's own devices, each device does a little training locally, and only the knob adjustments are sent back, never the data. The model travels to the data instead of the data travelling to the model.

### Guardian 3: The referee (law and regulation)

Laws differ around the world and keep changing. Here is the shape of the rulebook, without the fine print.

**Data protection law.** In Europe this is the GDPR. Its core principles fit on one hand and a bit:

| Principle | In plain words |
| --- | --- |
| Lawfulness, fairness, transparency | Have a valid reason, be fair, tell people what you do |
| Purpose limitation | Use data only for what you said |
| Data minimisation | Take only what you need |
| Accuracy | Keep it correct |
| Storage limitation | Do not keep it longer than needed |
| Integrity and confidentiality | Keep it safe |
| Accountability | Be able to prove all of the above |

Two roles from this law are useful to know. The **controller** is the organisation that decides why and how personal data is used. A **processor** handles data on the controller's behalf, under instructions. The AI builder deciding to train on data is a controller. The labelling company from Chapter 9 is usually a processor.

**AI-specific law.** The European Union's **AI Act** sorts AI uses by risk. Some uses are banned. High-risk uses, such as AI in hiring or credit decisions, carry strict duties about data quality, documentation and human oversight. Makers of general-purpose models have duties too, including documentation and transparency about training data. Other regions have their own rules and guidelines.

**Copyright law.** It governs whether creative work can be used for training and what happens if a model reproduces it. As Chapter 5 said, this is still being argued in many countries.

**Contracts.** Licences, website terms and agreements with data suppliers and contractors all bind what the builder may do.

The referee's job is to know which rules apply at each station. Everyone else's job is to ask the referee before, not after.

### Guardian 4: The scribe (documentation)

The scribe makes it possible to answer questions later. Gathered from across the book, here is the model's full paper trail.

| Document | Written at | Answers the question |
| --- | --- | --- |
| Purpose and requirements | Station 1 | What is this for? |
| Risk assessment or DPIA | Station 1 | What could go wrong, and for whom? |
| Provenance records | Station 2 | Where did each piece of data come from? |
| Data catalogue and classification | Station 3 | What do we hold, and how sensitive is it? |
| Cleaning report | Station 4 | What was removed, and why? |
| Annotation guidelines and agreement scores | Station 5 | How were labels decided, and how reliable are they? |
| Dataset versions and datasheets | Stations 3 to 7 | Exactly which data, in which state? |
| Training configuration and logs | Station 8 | How exactly was the model made? |
| Model lineage | Station 9 | Which model came from which? |
| Evaluation reports and model card | Station 10 | How good and how safe is it? |
| Registry entry and release approval | Station 11 | Who approved what, and where is it running? |
| Monitoring logs and incident reports | Station 12 | What happened in real life? |
| Deletion and retirement records | Station 13 | What was removed, and when? |

Being able to trace any result back through this chain is called **traceability**. Being able to show the chain to an outside checker is **auditability**. An **audit** is exactly that: an independent check that an organisation does what it says.

There are also published frameworks that organisations follow to structure all this. Two widely used ones are the **NIST AI Risk Management Framework** from the United States and the international standard **ISO/IEC 42001** for AI management systems. You do not need their details. Know that they exist, and that they are essentially organised checklists for everything in this chapter.

### Three more words that tie it together

- **Accountability:** a named person or team answers for each decision.
- **Transparency:** people affected can find out what was done.
- **Human oversight:** people stay in charge of important decisions and can step in.

Together, the practice of building AI with all four guardians on duty is called **responsible AI** or **AI governance**.

### The guardians, station by station

| Station | Locksmith | Lifeguard | Referee | Scribe |
| --- | --- | --- | --- | --- |
| 1 Plan | Plans the protections | Assesses harm to people | Confirms what is permitted | Records purpose and risks |
| 2 Collect | Watches for poisoned sources | Limits personal data taken | Checks licences and site rules | Records provenance |
| 3 Store | Locks, encrypts, logs | Classifies sensitivity | Sets retention | Maintains the catalogue |
| 4 Clean | Protects the pipeline | Removes personal details | Honours removal requests | Writes the cleaning report |
| 5 Label | Secures contractor access | Limits what annotators see | Contracts with processors | Records guidelines and agreement |
| 6 Numbers | Guards tokenised copies | Reminds everyone tokens are readable | No special role | Versions the tokeniser |
| 7 Split | Protects the test set | No special role | No special role | Records versions and seed |
| 8 Train | Guards compute and checkpoints | Considers privacy techniques | No special role | Logs the run |
| 9 Fine-tune | Guards powerful small datasets | Reviews examples for personal data | Checks permission for user data | Records model lineage |
| 10 Test | Runs security red teaming | Runs privacy tests | Confirms legal requirements met | Writes the model card |
| 11 Release | Signs and protects the weights | Reviews the release | Sets licence and terms | Updates the registry |
| 12 Watch | Detects attacks and misuse | Guards feedback data | Tracks changing rules | Logs incidents |
| 13 Retire | Destroys data securely | Fulfils people's requests | Confirms duties are met | Records deletions |

### New words

- **CIA triad:** confidentiality, integrity and availability.
- **Data breach:** unauthorised access to stored data.
- **Backdoor:** a hidden trigger planted in a model through poisoned data.
- **Model theft:** stealing a model's weights.
- **Privacy-enhancing technologies:** methods that allow data use with less privacy risk.
- **Federated learning:** training where the data stays on users' devices.
- **Controller:** the organisation deciding why and how personal data is used.
- **Processor:** an organisation handling data on a controller's behalf.
- **AI Act:** the European Union's law regulating AI by risk level.
- **Traceability:** being able to follow any result back to its origins.
- **Auditability:** being able to show that trail to an outside checker.
- **Audit:** an independent check.
- **Accountability:** someone named answers for each decision.
- **Transparency:** affected people can find out what was done.
- **Human oversight:** people remain in charge and can intervene.
- **AI governance (responsible AI):** building and running AI with all these protections in place.

### Check yourself

1. **What do the letters of the CIA triad stand for?** Confidentiality, integrity and availability.
2. **What is the difference between a controller and a processor?** The controller decides why and how personal data is used. The processor handles it on the controller's instructions.
3. **What does traceability mean?** Being able to follow any model or result back through the records to the data and decisions behind it.

## Chapter 20. Pip's whole journey on one page

This chapter squeezes the book into three tables and twelve sentences. If you can explain each row to someone else, you have mastered the lifecycle.

### The thirteen stations

| Station | What happens | Pip's shape | Who sees Pip | Biggest risk | Best safeguard |
| --- | --- | --- | --- | --- | --- |
| 1 Plan | Purpose, data needs and rules are decided | Not yet involved | Nobody at the builder | A greedy or vague plan | Purpose limitation, data minimisation |
| 2 Collect | Data is gathered from the world | Sentence in a copied web page | Data engineers | No permission, no passport | Provenance records, respect for opt-outs |
| 3 Store | Raw data is shelved and catalogued | Sentence in a raw bundle | Engineers with raw access | An unlabelled, unguarded attic | Catalogue, access control, retention dates |
| 4 Clean | Junk, repeats, harm and personal details are removed | Clean sentence | Data scientists | Personal data slipping through; biased filters | Deduplication, PII removal, measuring what filters remove |
| 5 Label | Answers are attached where needed | Sentence with stickers | Outside annotators | Exposure to many people; sloppy labels | Contracts, minimal sharing, quality checks |
| 6 Numbers | Text becomes tokens and IDs | Ten token IDs | ML engineers | Thinking numbers are private | Guard tokenised data like text |
| 7 Split | Data is dealt into training, validation and test | Tokens in the training set | ML engineers | Leaks between the sets | Split by document, dedupe, record the seed |
| 8 Train | The model learns by guess, check, nudge | A faint trace in the weights | Nobody directly | Memorisation; weight theft | Clean data upstream, protected checkpoints |
| 9 Fine-tune | Behaviour is polished with hand-made data | Same trace, in several models | Nobody directly | Small powerful datasets skewing or leaking | Careful review, model lineage |
| 10 Test | Skill, safety, fairness and leaks are measured | Trace; briefly a test probe | Examiners | Contaminated or shallow exams | Secret test sets, red teaming, model card |
| 11 Release | Weights are packaged, registered and served | Trace in frozen weights worldwide | Nobody directly | Unrecallable copies | Signing, staged rollout, considered release choice |
| 12 Watch | Live behaviour is monitored; feedback returns | Trace; plus a fresh crawled copy | The collection teams again | Stale model; sensitive feedback data; AI echo | Monitoring, permission for feedback use, human data in the mix |
| 13 Retire | Models are switched off; data is deleted | Leftover copies; fading trace | Whoever still has access | Keeping everything forever | Retention policy, lineage, deletion records |

### The five shapes of Pip

| Shape | Looks like | Where | Can it be read as the original sentence? |
| --- | --- | --- | --- |
| Sentence | My cat Miso sleeps on the warm laptop. | Stations 2 to 5 | Yes |
| Tokens | My, cat, Mis, o, sleeps, on, the, warm, laptop, . | Station 6 | Yes |
| Token IDs | Ten numbers | Stations 6 and 7 | Yes, with the tokeniser |
| Vectors | Ten long lists of numbers, for one second | Station 8, inside the model | Not stored |
| A trace in the weights | An unfindable nudge shared with countless other sentences | Stations 8 to 13 | No, unless memorised, which Pip was not |

### The three states of data, across the journey

| State | Where on the journey | Protection |
| --- | --- | --- |
| At rest | In the data lake, datasets, checkpoints and registry | Encryption at rest, access control, retention |
| In transit | From web to builder, between zones, to annotators, to serving sites | Encryption in transit, contracts, transfer rules |
| In use | During cleaning, labelling, training and testing | Least privilege, audit logs, secure environments |

### The twelve sentences to remember

1. Data is information stored as numbers, and to a machine everything is numbers.
2. Moving data means copying it, so every station leaves copies behind.
3. An AI model is not told its rules; it finds them in examples.
4. A model's knowledge lives only in its weights.
5. Training is a loop: guess, check, find who was wrong, nudge.
6. A language model learns by guessing the next token, so raw text labels itself.
7. A model learns shared patterns; one ordinary sentence leaves only a faint trace.
8. Repeated or distinctive text can be memorised, which is why cleaning and deduplication protect privacy.
9. Fine-tuning data is small and powerful, so each example matters far more.
10. Test data must never touch training, or the scores lie.
11. Data from using a model can flow back to build the next one: the lifecycle is a loop.
12. Data is easy to put into a model and very hard to take out, so the careful work must happen on the way in.

### The four questions that map any data flow

Wherever data is, in this lifecycle or any other system, ask:

1. **What shape is it in?** Readable, tokenised, or dissolved into weights?
2. **Where does it rest?** Which store, which copies, which country?
3. **Who can see it?** Which teams, which outside parties?
4. **How long does it stay, and who decides?**

You have now asked these questions at thirteen stations. That habit is the skill.

## Chapter 21. The master dictionary

Every term in this book is listed here in plain words with the chapter where it is explained. Use it as a lookup, or cover the right-hand columns and test yourself.

### A to C

| Term | Plain meaning | Chapter |
| --- | --- | --- |
| A/B testing | Comparing two versions with different users | 16 |
| Access control | Rules about who may see or change what | 2 |
| Accountability | A named person or team answers for each decision | 19 |
| Accuracy | The share of answers that are correct | 15 |
| Adapter | A small trainable add-on that leaves the main weights unchanged | 14 |
| AI accelerator | A chip specialised for AI sums | 13 |
| AI Act | The European Union's law regulating AI by risk | 19 |
| AI governance | Building and running AI with protections and clear responsibility | 19 |
| AI lifecycle | All stages from idea to retirement | 5 |
| AI system | The model plus everything built around it | 16 |
| Alignment | Making an AI's behaviour match intended values | 14 |
| Annotation | Attaching labels to examples | 9 |
| Annotator | A person who labels data | 9 |
| Anonymisation | Changing data so nobody can ever be identified | 8 |
| API | A doorway for programs to reach a model | 16 |
| Archive | Long-term storage for things no longer in use | 18 |
| Artificial intelligence | Computer systems doing things that seem to need thinking | 3 |
| At rest | Data that is stored and waiting | 2 |
| Attention | How a transformer decides which tokens matter to each other | 3, 13 |
| Audit | An independent check | 19 |
| Audit log | A tamper-resistant diary of who did what | 7 |
| Authentication | Proving who you are | 2 |
| Authorisation | Checking what you may do | 2 |
| Backdoor | A hidden trigger planted in a model by poisoned data | 19 |
| Backpropagation | Working backward to find each weight's share of the error | 12 |
| Backup | A spare copy for emergencies | 2 |
| Base model | The model produced by pre-training | 13 |
| Batch | A small group of examples studied together | 11 |
| Benchmark | A standard test for comparing models | 15 |
| Benchmark contamination | Test questions leaking into training data | 15 |
| Bias | Unfairness in a model, often inherited from data | 5 |
| Bit | One switch: 0 or 1 | 1 |
| Byte | Eight bits; enough for one letter | 1 |
| Byte-pair encoding | Building a vocabulary by gluing frequent pairs | 10 |
| Canary (privacy) | A planted unique string used to detect memorisation | 15 |
| Canary release | Trying a new version on a small share of traffic | 16 |
| Checkpoint | A saved copy of the weights during training | 13 |
| Checksum | A fingerprint proving files are unaltered | 16 |
| CIA triad | Confidentiality, integrity, availability | 19 |
| Cloud | Rented computers in someone else's data centres | 2 |
| Cluster | Many machines working as one | 13 |
| Compute | The computing power used | 13 |
| Concept drift | The correct answers changing over time | 17 |
| Consent | A person's clear agreement | 6 |
| Context window | How many tokens a model can look at at once | 10 |
| Controller | The organisation deciding why and how personal data is used | 19 |
| Copyright | A creator's legal rights over their work | 5 |
| CPU | A computer's general-purpose brain chip | 13 |
| Crawler | A program that visits web pages automatically | 6 |
| Crypto-shredding | Destroying an encryption key so data can never be read | 18 |

### D to H

| Term | Plain meaning | Chapter |
| --- | --- | --- |
| Data | Information stored in a form a computer can keep | 1 |
| Data breach | Unauthorised access to stored data | 19 |
| Data catalogue | The searchable list of all datasets | 7 |
| Data centre | A building full of servers | 2 |
| Data classification | Labelling data by sensitivity | 7 |
| Data drift | The inputs changing over time | 17 |
| Data flywheel | The cycle of use, feedback and improvement | 17 |
| Data governance | The rules and roles for handling data | 5 |
| Data lake | A store for raw data of all kinds | 7 |
| Data leakage | Test information sneaking into training | 11 |
| Data loader | The program that feeds batches to the model | 11 |
| Data minimisation | Taking only what is needed | 5 |
| Data pipeline | An automatic chain of steps that moves and changes data | 7 |
| Data poisoning | Planting bad data on purpose | 6, 19 |
| Data versioning | Numbering every state of a dataset | 7 |
| Data warehouse | A store for cleaned, organised data | 7 |
| Database | An organised store built for quick finding | 2 |
| Datasheet | A dataset's information leaflet | 15 |
| Deduplication | Removing repeats | 8 |
| Deep learning | Machine learning with many-layered neural networks | 3 |
| Deployment | Putting a trained model to work | 16 |
| Differential privacy | Adding measured noise so no individual can be singled out | 13 |
| Distillation | Training a small model to imitate a large one | 14 |
| Distributed training | Sharing training across many machines | 13 |
| DPIA | A risk assessment focused on personal data | 5 |
| Drift | The growing mismatch between a frozen model and a changing world | 17 |
| Early stopping | Ending training when validation stops improving | 13 |
| Embedding | The vector that represents a token's meaning | 10 |
| Encoding | The codebook linking bit patterns to characters | 1 |
| Encryption | Scrambling data so only key-holders can read it | 2 |
| Endpoint | The address of an API doorway | 16 |
| Epoch | One full pass through the training set | 11 |
| ETL and ELT | Two orders of extracting, transforming and loading data | 7 |
| Evaluation | Measuring a model's abilities and behaviour | 15 |
| Experiment tracker | A tool that records every training trial | 13 |
| Extraction test | Checking whether training text can be pulled back out | 15 |
| Fairness testing | Checking for unjustified differences between groups | 15 |
| Federated learning | Training where the data stays on users' devices | 19 |
| Feedback loop | Data from using a model flowing back into building the next | 17 |
| File | A named bundle of bytes | 1 |
| Fine-tuning | Continuing to train a model on focused data | 14 |
| First-party data | Data from the builder's own products | 6 |
| Forward pass | Numbers flowing through the model to produce a guess | 12 |
| GDPR | Europe's main law protecting personal data | 5 |
| Generalisation | Doing well on unseen examples | 13 |
| Generative AI | AI that creates new content | 3 |
| GPU | A chip that does huge numbers of simple sums at once | 13 |
| Gradient | The direction and strength each weight should be turned | 12 |
| Gradient descent | Nudging weights a small step to reduce the loss | 12 |
| Ground truth | Labels trusted as correct | 9 |
| Hallucination | A confident statement that is false | 15 |
| Hash | A short fingerprint calculated from data | 8 |
| Holdout set | Data kept away from training | 11 |
| Human evaluation | People rating a model's outputs | 15 |
| Human in the loop | A person taking part in an automatic process | 9 |
| Human oversight | People remain in charge and can intervene | 19 |
| Hyperparameter | A training setting chosen by people | 12, 13 |

### I to P

| Term | Plain meaning | Chapter |
| --- | --- | --- |
| In transit | Data moving between computers | 2 |
| In use | Data being read or changed by a program | 2 |
| Incident | Something going wrong in a live system | 17 |
| Inference | Using a trained model to produce answers | 3, 16 |
| Inference server | Software that runs a model to produce answers | 16 |
| Ingestion | Bringing data into the builder's systems | 7 |
| Instruction tuning | Training on pairs of instruction and ideal response | 14 |
| Inter-annotator agreement | How often annotators give the same answer | 9 |
| Jailbreak | A trick that makes a model break its rules | 15 |
| Knowledge cutoff | The date after which a model knows nothing | 16 |
| Label | The answer attached to an example | 9 |
| Large language model | A generative AI trained on text | 3 |
| Lawful basis | The valid legal reason for using personal data | 5 |
| Layer | One row of neurons | 3 |
| Learning rate | The size of each nudge | 12 |
| Least privilege | Giving the fewest keys needed | 7 |
| Licence | Permission to use someone's work under conditions | 5 |
| Lineage (data) | The record of where data has been and what was done to it | 6 |
| Lineage (model) | The record of which model came from which | 14 |
| Log | A computer's automatic diary | 2 |
| LoRA | A popular kind of adapter | 14 |
| Loss | One number saying how wrong a guess was | 12 |
| Loss curve | The chart of loss over time | 12 |
| Machine learning | Learning rules from examples | 3 |
| Machine unlearning | Reducing the influence of chosen data on a trained model | 18 |
| Masking | Replacing a detail with a placeholder | 8 |
| Membership inference | Working out whether a text was in the training data | 15 |
| Memorisation | Storing a training example closely enough to reproduce it | 13 |
| Metadata | Data that describes other data | 1 |
| Metric | A number that summarises performance | 15 |
| MLOps | Running the machine learning lifecycle reliably | 17 |
| Model | A big mathematical recipe with adjustable knobs | 3 |
| Model artifact | The bundle of files making up a finished model | 16 |
| Model card | A model's information leaflet | 15 |
| Model collapse | Quality wearing away from training on AI-made data | 17 |
| Model registry | The controlled library of model versions | 16 |
| Monitoring | Continuously measuring a live system | 17 |
| Neural network | A model built from layers of tiny calculators | 3 |
| Neuron | One tiny calculator in a network | 3 |
| Normalisation | Making data consistent | 8 |
| Object store | A giant bin for files of any type | 2 |
| Open-weight | A model whose weights are published | 16 |
| Opt-in and opt-out | Yes-by-choice versus yes-by-default | 6 |
| Optimiser | The program that nudges the weights | 12 |
| Overfitting | Learning the training data too exactly | 13 |
| Packet | A small labelled piece of travelling data | 2 |
| Parameter | One adjustable knob in a model; same as weight | 3 |
| Personal data | Information that points to a real person | 1 |
| PII | Information that can identify a person | 8 |
| Pixel | One tiny coloured square of an image | 1 |
| Positional encoding | Information about where each token stands | 10 |
| Pre-training | The big first training on general data | 13 |
| Precision | Of what was flagged, how much was right | 15 |
| Preprocessing | Getting raw data ready for training | 8 |
| Privacy by design | Building in protection from the start | 5 |
| Processor | An organisation handling data on a controller's behalf | 19 |
| Provenance | Where a piece of data came from | 6 |
| Pruning | Removing unimportant weights | 14 |
| Pseudonymisation | Swapping details for reversible stand-ins | 8 |
| Purpose limitation | Using data only for the stated purpose | 5 |

### Q to Z

| Term | Plain meaning | Chapter |
| --- | --- | --- |
| Quantisation | Storing weights with less precision to shrink the model | 14 |
| Random seed | The starting number that makes a shuffle repeatable | 11 |
| Raw zone | The part of the lake holding untouched data | 7 |
| Re-identification | Working out who someone is from leftover clues | 8 |
| Recall | Of what should be found, how much was found | 15 |
| Red teaming | Attacking your own system to find weaknesses | 15 |
| Regularisation | Techniques that discourage overfitting | 13 |
| Regurgitation | A memorised example coming out in an answer | 13 |
| Reinforcement learning | Learning by trying and being rewarded | 3 |
| Reproducibility | Being able to repeat work and get the same result | 11 |
| Retention policy | The rule for how long data is kept | 7 |
| Retirement | Switching a model off in an orderly way | 18 |
| Reward model | A model trained to predict which outputs people prefer | 14 |
| Right to erasure | The right to have your data deleted in certain cases | 18 |
| RLHF | Improving a model using human preference judgements | 14 |
| robots.txt | A website's note telling crawlers where they may go | 6 |
| Robustness | Staying sensible on unusual inputs | 15 |
| Role-based access control | Keys given according to job | 7 |
| Rollback | Switching back to the previous version | 16 |
| Safety training | Training a model to avoid harmful behaviour | 14 |
| Scraping | Extracting useful content from web pages | 6 |
| Self-supervised learning | Learning where the data supplies its own answers | 3, 9 |
| Server | A computer that serves other computers | 2 |
| Shard | One file of a dataset split into many | 11 |
| Shuffling | Mixing data into random order | 11 |
| Snapshot | A frozen, numbered copy of a dataset | 7 |
| Staged rollout | Releasing gradually | 16 |
| Step | One round of studying a batch and adjusting | 11 |
| Structured data | Data in neat tables | 1 |
| Supervised learning | Learning from examples with answers attached | 3 |
| Supply chain security | Making sure what runs is what was built and approved | 16 |
| Synthetic data | Computer-made data | 6 |
| Telemetry | The stream of measurements from a running system | 17 |
| Terms of service | The agreement between a user and a company | 2 |
| Test set | Data used once for the final, honest score | 11 |
| Token | A small piece of text: a word or part of one | 10 |
| Token ID | The number that stands for a token | 10 |
| Tokeniser | The tool that cuts text into tokens | 10 |
| Traceability | Being able to follow a result back to its origins | 19 |
| Training | Turning the knobs until the model is good | 3 |
| Training set | The data the model learns from | 11 |
| Transformer | The neural network design behind modern language models | 3 |
| Transparency | Affected people can find out what was done | 19 |
| Underfitting | Not learning enough | 13 |
| Unstructured data | Free-form data such as text, pictures, sound | 1 |
| Unsupervised learning | Finding patterns without given answers | 3 |
| Validation set | Data used to check progress during training | 11 |
| Vector | A list of numbers | 10 |
| Vocabulary | The full list of tokens a model knows | 10 |
| Weight | One adjustable knob in a model; same as parameter | 3 |

## Chapter 22. The master quiz

Forty questions cover the whole journey in order, with answers directly underneath each one. Cover the answer with your hand, say yours aloud, then check.

### Part A: The backpack (Chapters 1 to 3)

1. **What is data?** Information stored in a form a computer can keep.
2. **How many bits are in a byte, and what can one byte hold?** Eight. Enough for one letter or symbol.
3. **Give one example each of structured and unstructured data.** Structured: a table of names and marks. Unstructured: a blog post, a photo or a voice message.
4. **What is metadata?** Data that describes other data, such as when a post was written and by which account.
5. **Name the three states of data.** At rest, in transit, in use.
6. **"Moving data is copying data." Why does this matter?** Because every hop leaves a copy behind unless someone deletes it, so data ends up in many places.
7. **How is machine learning different from ordinary programming?** In programming, people write the rules. In machine learning, the machine finds the rules from examples.
8. **Where does a model keep what it has learned?** In its weights.
9. **What is the difference between training and inference?** Training changes the weights. Inference uses frozen weights to produce answers.
10. **Why can a language model learn from raw text without human labels?** It learns by guessing the next token, and the next token is already there in the text.

### Part B: Getting the data ready (Chapters 5 to 11)

11. **What is produced at Station 1?** Documents: the purpose, data requirements, approved sources, risk assessment and responsibilities. No training data.
12. **Explain purpose limitation and data minimisation.** Use data only for the stated purpose, and take only what the job needs.
13. **Name four sources of training data.** Any four of: public web, licensed data, public datasets, first-party data, purchased data, crowdsourced data, sensor data, synthetic data.
14. **What does a crawler record besides the page content?** Metadata such as the address, the date and time, and the language. This is the data's provenance.
15. **What is the difference between a data lake and a data warehouse?** The lake holds raw data as it arrived. The warehouse holds cleaned, organised data.
16. **Why do teams keep a data catalogue?** So every dataset can be found, with its source, owner, sensitivity and permitted use.
17. **List four things the cleaning stage removes.** Page clutter, duplicates, junk and spam, harmful content, and personal details.
18. **How does deduplication protect privacy?** Text seen many times is more likely to be memorised, so removing repeats lowers that risk.
19. **Which is still personal data in law: pseudonymised or anonymised data?** Pseudonymised, because it can be reversed with the key.
20. **Why can a filter introduce bias?** It may remove more text from some groups or styles than others, so the model understands those less well.
21. **Why is the labelling stage important for a data flow map?** Data leaves the builder's team and is seen by outside people.
22. **What is a token?** A small piece of text, a whole word or part of one, that the model treats as one unit.
23. **What is an embedding, and what does closeness between two embeddings mean?** A vector representing a token's meaning. Close embeddings mean similar meanings or uses.
24. **Is tokenised text private?** No. Anyone with the tokeniser can turn it back into readable text.
25. **What are the three sets data is split into, and what is each for?** Training for learning, validation for checking progress and tuning, test for the final honest score.
26. **Give two ways test data can leak into training.** Duplicates landing in both sets; pieces of one document split across sets; public test questions being crawled from the web.

### Part C: Making the model (Chapters 12 to 15)

27. **Describe the training loop in four words.** Guess, check, find, nudge.
28. **What is the loss?** One number that says how wrong the model's guess was.
29. **What does backpropagation work out?** For every weight, which direction and how strongly it should be turned to reduce the loss.
30. **What is the learning rate, and what happens if it is too large?** The size of each nudge. Too large, and the model overshoots and never settles.
31. **After Pip's lesson, does the model contain a copy of Pip?** No. It contains only slightly changed weights.
32. **What is overfitting, and how does it show on the loss chart?** Learning the training data too exactly. Training loss keeps falling while validation loss rises.
33. **When is a model likely to memorise a piece of text?** When the text appears many times or is very distinctive, especially in a large model trained for many passes.
34. **What does fine-tuning add that pre-training did not?** Specific behaviour: following instructions, helpful answering, safety and special skills.
35. **Why must fine-tuning data be reviewed especially carefully?** It is small and studied intensely, so each example has strong influence and is more easily memorised.
36. **Name four kinds of exam a model sits before release.** Any four of: capability tests and benchmarks, human evaluation, red teaming and safety tests, fairness tests, privacy and memorisation tests, robustness tests.
37. **What is a model card?** The model's information leaflet: purpose, limits, test results and known weaknesses.

### Part D: Out in the world and home again (Chapters 16 to 19)

38. **What is the key data flow difference between a closed release and an open-weight release?** In a closed release the weights stay with the builder. In an open-weight release the weights are published, and copies cannot be recalled.
39. **How does data from using a model get back into building the next one?** Through the feedback loop: ratings, reports and, where permitted, conversations are collected and pass through the stations again, usually ending in fine-tuning.
40. **Lina deletes her blog. Explain why her sentence may still exist, and what a careful AI builder can and cannot do about it.** Copies remain in the builder's raw and cleaned datasets, tokenised sets, logs and backups, and a faint trace remains in trained weights. With good lineage the builder can find and delete the stored copies and exclude the data from future training. They cannot simply pull one sentence's influence out of an already-trained model; the sure fix is retraining without it, with filters as a stopgap for anything the model could reproduce.

### How did you do?

| Score | What it means |
| --- | --- |
| 35 to 40 | You can teach this. Explain it to someone using Pip. |
| 25 to 34 | Solid. Reread the chapters for the questions you missed. |
| Under 25 | Walk the route again with Chapter 20 open beside you. |

### What comes next

You now know how an AI is built and how data flows through every stage of that building. The second journey begins where Chapter 16 opened the door: what happens to data when people *use* AI, through public chatbots, business tools, private setups and agents that act on their own.
