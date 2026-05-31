# MEGA CONTEXT — Reid Sendroff Projects
# Full Claude Code / Codex Session Context

This is the single most important file in this directory.
It captures everything built, every rule established, every technical pattern,
and every convention discovered across the full project history.
Read this before writing a single line of code or content.

---

## 1. WHO THIS IS

**Reid Sendroff**

- Sophomore at Northern Highlands Regional High School (NHRHS), Allendale, NJ
- Email: sendroffr@st.northernhighlands.org
- Runs two student organizations: AI Club and CS Club
- Built and shipped a production AI web application: MyClassPal.ai
- Works with his co-president Ben Shamosh (shamoshb@gmail.com)

---

## 2. THE THREE PROJECTS

### 2A. MyClassPal.ai — Production AI Tutoring App

**What it is:** An AI tutor that connects to a student's Canvas LMS and generates personalized
study experiences from their actual coursework. Not a generic chatbot. A production product.

**Live URL:** myclasspal.ai

**Tech Stack:**
- Frontend: React
- Backend: FastAPI (Python)
- Database: PostgreSQL
- LMS Integration: Canvas API — 9 endpoints
- Token Security: AES-256-GCM encryption
- AI: OpenAI API — primary model GPT-4o
- Scale: 41 data models, 21 shipped features

**Core Features:**
- Canvas sync — pulls real courses, assignments, deadlines automatically
- Mastery Mode — students prove understanding through practice, not clicking "complete"
- Homework guardrail — adversarially tested, refuses to complete assignments by design
- My Skills dashboard — tracks what the student actually knows vs. what they've seen

**How to describe it (never deviate from this):**
- To students: "A production AI tutoring app that connects to Canvas, tracks mastery, and refuses to do your homework."
- To admins/faculty: "Privacy-first LMS-integrated AI tutor. No trackers, no data sold, academic integrity enforced at the AI layer."
- To parents: "The same stack used by professional engineers. Built by a student who built the app that won't do his homework for him."

NEVER call it: a project, a prototype, a school project, an app he's working on.

---

### 2B. Northern Highlands AI Club

**Type:** Building club. Students ship real AI products and compete nationally.
**Location:** Room 133 @ 2:45 (always this exact format)
**Advisor:** Mr. Michael Novak
**Co-Presidents:** Reid Sendroff + Ben Shamosh
**Sign-off:** — Reid & Ben (never "The AI Club Leadership Team")

**Other Officers:**
- VP/COO (2) — meeting ops, agenda, scrum facilitation
- VP Content/CMO (2) — all announcements and social media (Arjun leads this)
- Treasurer (2) — API fund, budget, reimbursements
- Secretary (2) — attendance, competition calendar, minutes

**What's been built for this club:**
- Full 12-file Operating System (AI_Club_OS/)
- 5-file Docs library (AI_Club_Docs/)
- 15-page Strategic Plan Word document
- Three PowerPoint decks
- Gmail draft emails to reid@sendroff.com and shamoshb@gmail.com
- CLAUDE.md, AI_Club.md, CS_Club.md, MEGA_CONTEXT.md context files

---

### 2C. Northern Highlands CS Club

**Type:** Competitive programming club
**Location:** Room 133 @ 2:45 (same room, same time)
**Officers:** Reid Sendroff, Max, Matthew, Alex
**Sign-off:** — Reid, Max, Matthew, and Alex (all four, always)

**Critical rule:** "Competitive programming" is NEVER abbreviated as "CP." Always spelled out in full.

**Language taught:** Java. Input method: Scanner only.
BufferedReader and StringTokenizer are NOT taught in club — members who want those are
directed to learn independently.

---

## 3. UNIVERSAL CONTENT RULES

These apply to every piece of content — announcements, emails, docs, decks, proposals — for
any of Reid's projects. No exceptions.

**BANNED:**
- Em dashes (—) in any form. Replace with comma, period, or restructure.
- "Thank you for your time." Never, anywhere.
- Corporate language, press release tone, newsletter voice.
- "Let's build." / "Stay curious." / Any motivational slogan as a closer.
- Emojis used as bullet labels (🧠 🏗 🎬 etc.)
- "Hey Club Members" or any group salutation in posts.
- "The AI Club Leadership Team" as sign-off.
- Abbreviating competitive programming as "CP."
- Calling MyClassPal a project, prototype, or school assignment.
- Generic descriptions ("we're covering AI tools") — always be specific.

**REQUIRED:**
- Human voice. Reads like a smart person texted it to a friend.
- Specificity. Name the demo, the person, what was built.
- "Room 133 @ 2:45" — exact format, every time.
- Real names in sign-offs.
- Facts do the work. No editorializing credentials.
  ("She grew a division from $10M to $100M against Salesforce" needs no decoration.)

---

## 4. THE ANNOUNCEMENT SYSTEM

Three posts per meeting. Every meeting. No exceptions.

**7AM Hook (under 80 words)**
- Lead with the most interesting specific thing happening today
- NO time reference in the body — "Room 133 @ 2:45" at the bottom only
- Reads like a tip from a friend
- AI Club close: Room 133 @ 2:45. / — Reid & Ben
- CS Club close: Room 133 @ 2:45. / — Reid, Max, Matthew, and Alex

**1PM Reminder (under 200 words)**
- Opens: "Reminder — [Club] is today at 2:45 in Room 133."
- One paragraph per agenda item: specific, 2-3 sentences, compelling
- Closes with one sentence answering: "why today specifically?"

**You Missed It (under 150 words)**
- Opens: "You missed a good one." or natural variation
- Past tense — what HAPPENED, not what was planned
- Lead with the most surprising/memorable moment
- Tease next meeting with one specific thing

**The FOMO Formula**

FOMO is never manufactured. It comes only from specificity.
"Reid built a live image editor that responds to natural language" = FOMO.
"We're covering AI image tools" = nothing.
If the description could apply to any club meeting anywhere, rewrite it.

---

## 5. TECHNICAL PATTERNS — PPTX GENERATION

All PowerPoint files use pptxgenjs v4.0.1. These rules were learned through production errors.

```javascript
// SETUP
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10" wide x 5.625" tall

// COLORS — never use # prefix, ever
const PURPLE   = '7C3AED';   // AI Club primary
const TEAL     = '00D4AA';   // AI Club accent
const BLACK    = '080810';   // AI Club background
const WHITE    = 'FFFFFF';
const PURPLE_L = 'A78BFA';
const SUBTEXT  = 'C4B5FD';
const CARD1    = '13102B';
const MUTED    = '94A3B8';
const DARK2    = '0E0E1A';

// CS CLUB / DOCX COLORS
const BLUE     = '1E3A5F';
const BLUE_L   = '2E6DA4';
const TEAL_D   = '0D7377';

// SMART QUOTES — use Unicode, never XML entities
// &#x201C; renders as literal text in pptxgenjs — WRONG
// " and " — CORRECT
s.addText('She said "it worked"', { ... });

// NEVER REUSE OPTION OBJECTS
// Wrong: const opts = {...}; slide1.addShape(opts); slide2.addShape(opts);
// Right: pass a fresh object literal every time

// SLIDE DIMENSIONS (inches)
// Full width: 10.0"
// Full height: 5.625"
// Card overflow check: startX + numCards*(cardW + gapX) must be <= 10.0"
```

**AI Club Deck Pattern — Tall Pillars (Slide 1 right column):**
```javascript
const pw = 1.46, ph = 4.9, pgap = 0.1, px0 = 5.38, py = 0.35;
// 3 pillars: each at px0 + i*(pw+pgap), checks out to ~9.96" max
```

**Card Layout — 3 across:**
```javascript
const cw = 2.94, ch = 2.8, cgap = 0.14, cx0 = 0.38;
// 3 cards: 0.38 + 2*(2.94+0.14) = 6.54" — safe
```

**File output:**
```javascript
pres.writeFile({ fileName: '/sessions/friendly-dreamy-lovelace/mnt/reids-path/filename.pptx' })
  .then(() => console.log('Done!'))
  .catch(e => console.error(e));
```

---

## 6. TECHNICAL PATTERNS — DOCX GENERATION

All Word documents use docx (docx-js). These rules were learned through production errors.

```javascript
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat, ExternalHyperlink
} = require('docx');
const fs = require('fs');

// PAGE SIZE — US Letter in DXA (twips, 1 inch = 1440 DXA)
// Width: 12240 DXA (8.5"), Height: 15840 DXA (11")
// Standard margins: 1440 DXA (1 inch) all sides

// SHADING — always use ShadingType.CLEAR (not ShadingType.SOLID)
shading: { fill: 'F2F4F7', type: ShadingType.CLEAR }

// BULLETS — use Unicode text characters, never raw unicode in format string
levels: [{
  level: 0,
  format: LevelFormat.BULLET,
  text: '•',         // bullet character as string
  alignment: AlignmentType.LEFT,
  style: { paragraph: { indent: { left: 720, hanging: 360 } } }
}]

// NO \n IN PARAGRAPH TEXT
// Wrong: new TextRun({ text: 'Line one\nLine two' })
// Right: two separate Paragraph objects

// TABLE WIDTHS — two standard sizes used
const FULL_WIDTH = 9360;    // DXA — full text area width
const INNER = 9160;         // DXA — inside callout cell

// COLOR CONSTANTS — must be declared before use (MUTED bug)
const MUTED = '888888';     // Declare at TOP of file with other constants

// OUTPUT
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/sessions/friendly-dreamy-lovelace/mnt/reids-path/filename.docx', buffer);
  console.log('Done!');
});
```

**Callout box pattern:**
```javascript
function callout(label, text, bg = 'F2F4F7', accent = '2E6DA4') {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [200, 9160],
    rows: [new TableRow({ children: [
      new TableCell({
        borders: NO_BORDERS, width: { size: 200, type: WidthType.DXA },
        shading: { fill: accent, type: ShadingType.CLEAR },
        children: [new Paragraph({ children: [new TextRun({ text: '', size: 20 })] })]
      }),
      new TableCell({
        borders: NO_BORDERS, width: { size: 9160, type: WidthType.DXA },
        shading: { fill: bg, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 200, right: 200 },
        children: [
          new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, font: 'Arial', color: accent })] }),
          new Paragraph({ children: [new TextRun({ text, size: 21, font: 'Arial', color: '374151' })] })
        ]
      })
    ]})]
  });
}
```

---

## 7. FILES BUILT IN THIS PROJECT

**PowerPoint Decks**

| File | Description | Slides | Theme |
|---|---|---|---|
| MyClassPal_Ramapo_v4.pptx | MyClassPal pitch to Ramapo College AI Club | 3 (Hook / Demo / Implications) | Purple/Teal on near-black |
| AI_Club_GPT_Images_2.pptx | ChatGPT Images 2.0 technical deep dive | 6 | Green/Teal (10A37F) |
| AI_Club_Agentic_System.pptx | Agentic Orchestration System + MyClassPal | 7 | Purple/Teal |

**MyClassPal v4 Slide Structure:**
1. The Hook — Left: problem statement + pillars. Right: 3 tall vertical cards (Learns from Canvas / Earns mastery / No tracking)
2. Demo — Clean holding slide with play button oval for screen recording
3. Implications — 3 impact cards (won't write essay / data not product / works Monday) + ethics bar

**Word Documents**

| File | Description | Pages |
|---|---|---|
| AI_Club_Strategic_Plan_2026.docx | Full strategic plan for AI Club to present to Mr. Novak | 15 |

Strategic Plan sections: Executive Summary, Problem (single point of failure), Vision, Org Structure (table), Funding Model (table), Meeting Structure (tables), Room 133 Open Lab, Tools Unblock (3 tier tables), Competition Calendar (table), Participation & Accountability, Succession Planning, Year 1 Timeline (table), Formal Asks (3 priorities), Closing Statement

**Markdown Files**

| File | Description |
|---|---|
| CLAUDE.md | Master session context, universal rules, file index |
| AI_Club.md | Complete AI Club context reference |
| CS_Club.md | Complete CS Club context reference |
| MASTER_PROMPT.md | Copy-paste context loader for any Claude session |
| MEGA_CONTEXT.md | This file |
| AI_Club_OS/00-11 | 12-file AI Club Operating System |
| AI_Club_Docs/01-05 | Announcement system, templates, insights, prompt guides |

---

## 8. THE AGENTIC ORCHESTRATION SYSTEM

Reid built a multi-agent dispatch system for MyClassPal development.

**Invocation:** `/orchestrate [task description]`

**Five Agents:**

| Agent | Role | Constraints |
|---|---|---|
| Architect | Read-only analysis, schema and system design | Never writes code |
| Implementer | Bounded code changes within a file allowlist | Cannot touch files outside its scope |
| Debugger | Minimal diff bug fixes | Must explain the exact line that changed and why |
| Critic | Adversarial review of Implementer output | Never implements, only critiques |
| Orchestrator | Owns sensitive work, final assembly, coordinates all agents | The only agent with unrestricted file access |

**Auto-Split Rules (mechanical dispatch):**
- Schema change → Architect first
- 3+ files touched OR spans client + server → Implementer
- Concrete traceable bug → Debugger
- Ambiguous requirement → Architect first
- After any implementation → Critic always runs

**Five Orchestrator Modes:**
- solo — Single agent, no split
- codex — Optimized for OpenAI Codex integration
- gemini — Optimized for Gemini context window
- debug — Debugger + Critic only
- full — All five agents in sequence

---

## 9. GMAIL CONNECTOR

Connector UUID: 2701e52f-b826-4aaf-8b25-11f2a97c98b0
Tool prefix: mcp__8490d780-3587-4f5f-9f7a-f3edf90c39b7__

CRITICAL LIMITATION: The Gmail connector only supports create_draft.
It does NOT have a send tool. Drafts must be sent manually from Gmail.

Drafts created in this session:
- To: reid@sendroff.com — Subject: "AI Club Strategic Plan — Building a Self-Sustaining Program"
- To: shamoshb@gmail.com — Subject: "AI Club Strategic Plan" (humanized version, signed as Reid)

---

## 10. PEOPLE DIRECTORY

| Name | Role | Contact |
|---|---|---|
| Reid Sendroff | AI Club Co-President, CS Club Officer, MyClassPal builder | sendroffr@st.northernhighlands.org |
| Ben Shamosh | AI Club Co-President | shamoshb@gmail.com |
| Mr. Michael Novak | AI Club Faculty Advisor | — |
| Arjun | AI Club VP Content, social media lead | — |
| Max | CS Club Officer | — |
| Matthew | CS Club Officer | — |
| Alex | CS Club Officer | — |
| Marie Aiello | Guest speaker, SVP ContinuumGlobal, Adweek AI Power 50 | — |
| David Sendroff | Parent (david@sendroff.com) | david@sendroff.com |

---

## 11. KNOWN ERRORS AND FIXES

**pptxgenjs: Smart quotes render as literal XML**
Error: `&#x201C;text&#x201D;` renders as literal characters in slides.
Fix: Use JavaScript Unicode: `"` and `"` in all string values.

**pptxgenjs: Card overflow off right edge**
Error: Cards extend past the 10" slide boundary.
Fix: Always verify: `startX + numCards * (cardWidth + gap) <= 10.0`

**docx-js: ReferenceError on constant used before declaration**
Error: MUTED used in footer section but declared later in the file.
Fix: Declare ALL color constants at the top of the file, before any function or usage.

**docx-js: Incorrect shading type**
Error: `ShadingType.SOLID` causes unexpected rendering in some Word versions.
Fix: Always use `ShadingType.CLEAR` for background fills.

**pptxgenjs: Reused option objects cause shared mutation**
Error: Passing the same object reference to multiple `addShape` or `addText` calls.
Fix: Pass a fresh object literal inline every time. Never store and reuse options objects.

---

## 12. OUTPUT FILE PATHS

All final outputs go to: `/sessions/friendly-dreamy-lovelace/mnt/reids-path/`

Subdirectories:
- AI_Club_OS/ — 12 operating system markdown files
- AI_Club_Docs/ — Announcement docs, prompt guides

Temp work goes to: `/sessions/friendly-dreamy-lovelace/`
(JS scripts, intermediate files — this directory resets between sessions)

---

## 13. PACKAGE DEPENDENCIES

```bash
# In /sessions/friendly-dreamy-lovelace/
npm install pptxgenjs     # v4.0.1 — PPTX generation
npm install docx          # docx-js — Word document generation
pip install [package] --break-system-packages  # always use this flag for pip
```

---

## 14. THE CORE PRINCIPLE

Everything built for Reid reflects one belief:

**The work is serious. The voice is human. The output is specific.**

A high school student built a production app that competes with EdTech startups.
His club ships real projects and enters national competitions.
The announcements, the documents, the presentations — all of it reflects
the same standard: nothing generic, nothing inflated, nothing that doesn't
trust the facts to do the work.

When in doubt: be more specific, cut the decoration, trust the content.

---

## 15. MYCLASSPAL PRESENTATION ITERATION HISTORY

The MyClassPal deck went through four versions. Understanding why each version failed or
succeeded is essential context for any future slide work.

**v1 — Original (Rejected)**
Built before this session. Baseline that v2 was generated from.
Problems carried into v2: XML entity rendering, card overflow, too much text.

**v2 — First Generated Version**
What broke:
- Smart quotes written as XML entities rendered as literal characters in slides
- Privacy card overflowed: `cardW` was 2.44", right edge landed at x=10.18"

Fixes applied:
- All smart quotes converted to JavaScript Unicode escapes
- `cardW` reduced from 2.44 to 2.35 so right edge lands exactly at 10.0"
- Output: MyClassPal_Ramapo_v2.pptx

**v3 — Redesign (5-Second Test Applied)**
Trigger: "Too much text — not appealing to audience."
What changed: Complete redesign. 5-second test as governing design principle.
- Slide 1: Big bold problem statement + 3 tall vertical pillars (right)
- Slide 2: 3 large impact statements + ethics bar
- Every text element stripped to minimum: one bold claim, one supporting sentence per card
- Output: MyClassPal_Ramapo_v3.pptx

**v4 — Demo Slide Added (Final)**
Trigger: Reid wanted a holding slide for live screen recording demo.
What changed: Inserted Slide 2 "See It In Action" between Hook and Implications.
- Demo items: Canvas sync / Mastery Mode / My Skills dashboard / Homework guardrail
- Full deck: Hook, Demo, Implications
- Output: MyClassPal_Ramapo_v4.pptx

---

## 16. THE 5-SECOND TEST — SLIDE DESIGN PRINCIPLE

The most important design rule discovered during the v2 to v3 redesign.

**The rule:** A slide must communicate its core message to someone in the back row in 5 seconds.
If it takes longer, the slide has failed regardless of how much information it contains.

**How to apply it:**
- Can you read every element from 15 feet away? If not, the font is too small.
- Does the slide have ONE primary message? If you can't state it in 7 words, the slide is doing too much.
- Would someone who glanced at this slide for 5 seconds know what the presenter is arguing?

**The transformation:**

Before (v2): "Canvas Integration: MyClassPal connects to your school's Canvas LMS to
automatically sync your courses, assignments, and due dates, providing personalized study
recommendations based on your actual coursework."

After (v3): "Learns from Canvas" (headline) + "Pulls real courses, assignments, and deadlines
automatically. Nothing generic." (subtext)

Same information. v3 version is readable in 2 seconds.

---

## 17. AI CLUB MEETING HISTORY — KEY SESSIONS

**Meeting: 04/27/2026**

The most comprehensively documented meeting. Three major demos plus scrum format.

**Demo 1 — Ben Shamosh: Claude Routines**
How to build reusable AI workflows that run automatically. Routines abstract the prompt
engineering layer so non-engineers can trigger repeatable AI behaviors.

**Demo 2 — Reid Sendroff: ChatGPT Images 2.0**
Native GPT-4o image generation (model: gpt-image-1). Three major changes: text rendering
fixed, contextual editing, conversation memory. Live API demo.
Key technical detail: Model string is `gpt-image-1`.

**Demo 3 — Arjun: Marketing Masterclass**
How the AI Club's social media is being rebuilt. Canva + AI-generated content frameworks.
Instagram content calendar. Arjun owns VP Content role — this demo was him teaching
the team to use tools so social media becomes distributed.

Before-you-post rule established: Before any content goes live, consult with Reid and Ben.

---

## 18. AI CLUB SOCIAL MEDIA STRATEGY

**Platform focus:** Instagram primary, TikTok secondary.
**Content owner:** Arjun (VP Content) leads, team of 2 officers.
**Approval chain:** Draft, Reid and Ben review, Post.

**Content types:**
- Meeting announcements (3 posts per meeting)
- Project spotlights (member demos, short-form)
- Competition updates (entries, results, what was learned)
- Tool breakdowns (short explainers on tools the club is using)

**The handoff plan:**
Reid and Ben guide social strategy initially, then responsibility drifts to Arjun's team.
The goal is for leadership to be the approvers, not the creators.

**Brand rule:** Every post reflects the club as a building club. Captions should describe
what was actually built, not just that something was built.

---

## 19. THE SELF-SUSTAINING CLUB PROBLEM — HOW IT WAS SOLVED

**The problem diagnosed:**
The AI Club was functioning well because Reid was highly motivated and technically capable.
That is not a foundation. It is a single point of failure. When one person carries meetings,
announcements, technical direction, and logistics, the club's quality is tied entirely to
that person's availability. Three compounding risks: burnout, graduation, missed member potential.

**The original framing:** "The club runs on Reid."
**The reframe:** "The club runs on systems, not people."

**What changed in the Strategic Plan:**
- Renamed the problem section from "Single Point of Failure" to "Too Concentrated at the Top"
- Changed all first-person references to Reid and Ben as co-leaders
- Distributed accountability across 8 officer positions with non-overlapping ownership
- Introduced scrum format to make member output mandatory, not optional
- Built the succession protocol to ensure institutional knowledge survives graduation
- Created the open lab concept so the club exists beyond weekly meetings

---

## 20. THE ANNOUNCEMENT QUALITY FRAMEWORK — THE MARIE AIELLO CASE STUDY

**The 7 specific failures of the original announcement:**

**Failure 1 — Formatted header as opener**
`🎤 This Monday: Someone Who Actually Ships AI for a Living 🎤`
Zero specific facts. Pure wrapper.
Fix: Open with the most interesting specific fact.

**Failure 2 — Salutation**
`Hey Club Members,`
Triggers the "formal club communication" reflex. Gets filed under "read later, never."
Fix: No salutation. First sentence is the content.

**Failure 3 — Section dividers and headers**
Signals "this is a document" not "this is something interesting happening."
Fix: Paragraphs. Momentum. Invisible structure.

**Failure 4 — Editorializing credentials**
`She does not talk about AI. She ships it.`
The writer doing the reader's reaction for them. The credentials already prove this.
Fix: State the credentials. Stop. Trust the reader.

**Failure 5 — Emoji bullet labels on agenda**
Every emoji says "this text alone isn't interesting enough." It is.
Fix: Write agenda items as sentences in a paragraph.

**Failure 6 — Motivational closer**
`Let's build.`
A slogan. Says nothing, adds nothing.
Fix: "Room 133 @ 2:45. — Reid & Ben." Complete. Personal. Done.

**Failure 7 — Impersonal sign-off**
`-- The AI Club Leadership Team`
Distances the reader from the real people running the club.
Fix: Always real names.

**The core diagnosis:**
The announcement did not trust its own content. Every decoration, every editorial, every
emoji was the writer quietly saying "I'm not sure the facts are enough." They always are.
The job is to get out of the way.

---

## 21. THE MYCLASSPAL DEMO STRATEGY

**Demo order (from v4 slide structure):**
1. Canvas sync — show it pulling real live data. Establishes it's not a mockup.
2. Mastery Mode — show a student required to prove understanding before progress is marked.
3. My Skills dashboard — aggregate view of what a student actually knows.
4. Homework guardrail — attempt to get it to write an essay. Watch it refuse.

**Demo notes:**
- Always show the product before explaining the tech stack.
- The guardrail demo is the most memorable moment. Save it for last.
- If showing to students: lead with Canvas sync (relatable), end with guardrail (provocative).
- If showing to administrators: lead with privacy architecture, then show the guardrail.
- If showing to parents: lead with what their student could build, end with MyClassPal as proof.

**The line that always lands:** "A student built the AI that won't do his homework for him."

---

## 22. THE STRATEGIC PLAN — KEY DECISIONS AND REASONING

**Why a 15-page document, not a 1-page ask**
Mr. Novak and school administration respond to thoroughness. A 15-page document with tables,
timelines, and a tiered unblock list signals "we have thought about every implication." The
length is a signal of seriousness, not padding.

**The 3-tier tools unblock structure**
- Tier 1 (GitHub, VS Code, Terminal): "Cannot build without these." Low risk, high need. Easy yes.
- Tier 2 (OpenAI API, Claude API, Vercel): "Significantly improves outcomes." Moderate ask.
- Tier 3 (Discord, YouTube unrestricted): "Operations and communication." Long-term.

**The parent donation pitch framing**
Don't ask parents for money for "the club." Ask them to invest in their student's access to
professional tools. "Every dollar goes directly to a project team. No overhead. Their student
builds with the same APIs used by engineers at Google and Anthropic."

**Room 133 open lab concept**
The highest-leverage single change. Students who have a place to build will build.
Three days per week (Monday/Wednesday/Friday after school). One officer present. Secretary tracks.

**Succession protocol rationale**
Every outgoing officer must complete a one-page transition document before their last meeting.
Covers: what they do week to week, recurring tasks and timing, tools and accounts, key contacts,
what went well, what they'd do differently, one piece of advice for the next person.

---

## 23. EMAIL ITERATION HISTORY — AI CLUB INTERNAL COMMUNICATIONS

**The social media team email**
Final version covered specifically and only: Arjun's team taking over social media creation,
using Canva and Instagram, with Reid and Ben guiding strategy initially before handing full
creative ownership to Arjun.

The framing that landed: "Reid and Ben will guide it at first, and then it will drift over
to Arjun teaching the team how to use the tools."

**The Reid to Ben strategic plan email**
- "Wanted to loop you in before we take it to Novak" vs. "This is what the plan covers"
- Conversational paragraph, not bullet points
- Signed as Reid (Reid writing to Ben, not them writing together)

**The David to Reid strategic plan email**
- Summary paragraph first, then 5 bullet highlights, then one closing line
- Signed from David (parent account, david@sendroff.com)

---

## 24. PRESENTATION DECK DETAILS — GPT IMAGES 2.0

**File:** AI_Club_GPT_Images_2.pptx
**Slides:** 6
**Theme:** Green/Teal — primary color 10A37F (OpenAI green), background near-black 0A0A0F

**Slide-by-slide:**
1. Title — "ChatGPT Images 2.0" headline, Reid as presenter, OpenAI green accent bar
2. What Changed — Before/After comparison. Text rendering fixed, contextual editing, conversation memory.
3. Three Upgrades — Text rendering fixed / Contextual editing / Conversation memory. Each with technical explanation.
4. Use Cases — 6 cards: Homework diagrams, UI mockups, Social media content, Study materials, Presentation graphics, Code-to-visual conversion.
5. API Code Block — Live code example. Model string: `gpt-image-1`
6. Live Demo + Takeaways — Clean closing slide.

Key technical fact: Model string is `gpt-image-1` (not dall-e-3, not gpt-4o).

---

## 25. PRESENTATION DECK DETAILS — AGENTIC SYSTEM

**File:** AI_Club_Agentic_System.pptx
**Slides:** 7
**Theme:** Purple/Teal — 7C3AED purple, 00D4AA teal

**Slide-by-slide:**
1. Title — "Agentic Systems + MyClassPal"
2. The Orchestrator — 5 jobs of the Orchestrator.
3. Five Agents Diagram — Visual map with handoff arrows.
4. Auto-Split Rules — Table format. Condition to agent. 5 rows.
5. Five Modes — solo / codex / gemini / debug / full
6. End-to-End Example — 9-step walkthrough of a real task
7. What This Means For You — How club members apply multi-agent thinking

---

## 26. CLAUDE DESIGN PROMPT

A fully self-contained design prompt for commissioning AI-generated brand work.

**What it covers:**
- Brand identity (dark background, purple primary 7C3AED, teal accent 00D4AA, no light mode)
- Five deliverables (app icon, splash screen, social card, OG image, loading animation spec)
- Design rules (no gradients that look like consumer apps, no white backgrounds, no mascots)
- Typography (system font stack, specific weight rules)

**Key design rule embedded:**
"This is a tool for students who are serious. The design should feel like a product engineers
use, not an app teenagers download."

The prompt is self-contained: zero external context required.

---

## 27. AI CLUB OPERATING SYSTEM — SECTION SUMMARIES

The 12-file OS was built to solve the single point of failure problem at an operational level.

| File | What Problem It Solves |
|---|---|
| 00_README.md | Navigation — which file answers which question |
| 01_Identity_and_Mission.md | Prevents identity drift — "building club" not "discussion club" |
| 02_Leadership_and_Roles.md | Eliminates ambiguity about who owns what decision |
| 03_Meeting_Runbook.md | Meetings run well without Reid or Ben in the room |
| 04_Member_System.md | Passive members get tracked and accountability is automatic |
| 05_Project_Teams.md | Teams form, run, and get evaluated consistently every year |
| 06_Announcement_Playbook.md | VP Content can write great posts without asking leadership |
| 07_Technical_Infrastructure.md | Admin access requests are organized and repeatable |
| 08_Financial_OS.md | Money is tracked, distributed, and spent correctly without oversight |
| 09_Competition_Playbook.md | Teams enter competitions and know exactly how to prepare |
| 10_Succession_Protocol.md | Club survives graduation of founding leadership |
| 11_AI_Prompt_Playbook.md | Any officer can use AI to do their job without asking Reid |

**The one-line philosophy behind the OS:**
"If you do something that works and it isn't written here, write it here."

---

## 28. ANNOUNCEMENT SAMPLES LIBRARY

Ten full three-post sets were created covering every scenario the club will encounter.
All live in `AI_Club_OS/12_Announcement_Super_Prompt_and_Samples.md`.

**Scenarios covered:**
- Live product demo (MyClassPal)
- New AI model drop (GPT-4o Images)
- Guest speaker
- Competition results debrief
- Agentic systems deep dive
- New member kickoff (September)
- End of year showcase
- Hackathon prep (MIT Blueprint)
- Tools unblock win (GitHub + terminal access)
- Standard scrum sprint

---

## 29. WHAT NEVER TO DO — THE COMPLETE BLACKLIST

| What was produced | Why it was wrong | What replaced it |
|---|---|---|
| `&#x201C;sorry, AI is down.&#x201D;` in PPTX | XML entities render as literal text | `"Sorry, AI is down."` |
| cardW = 2.44 with 3 right-column cards | Overflow to x=10.18" | cardW = 2.35 |
| `const MUTED` declared after footer usage | ReferenceError at runtime | Moved to top of file |
| Em dashes in any content | Reads corporate/formal | Comma, period, or restructure |
| "The AI Club Leadership Team" as sign-off | Impersonal | "Reid & Ben" |
| "Let's build." as closer | Motivational poster language | Remove entirely |
| "Hey Club Members," opener | Triggers formal communication reflex | No salutation — start with content |
| Emoji section labels | Signals text isn't interesting enough alone | Prose paragraphs |
| `--` double hyphens | Sloppy substitute for punctuation | Comma or period |
| "She does not talk about AI. She ships it." | Editorializing what facts already prove | Remove the editorial |
| "Reid is doing everything" framing | Narcissistic, inaccurate — Ben is co-president | "Reid and Ben" throughout |
| Strategic plan signed only by Reid | Excludes co-president | Both names in closing + cover page |
| "project" or "prototype" for MyClassPal | Undersells a live production app | "production app," "live product" |
| Generic demo descriptions | Could apply to any meeting anywhere | Specific: "GPT-4o image editor that responds to natural language" |

---

## 30. THE SELF-SUSTAINING CLUB — FULL PLAN FOR 2026-2027

### The Problem This Solves

Reid is the club. He stays up until midnight to run it. That is a single point of failure
dressed up as dedication. The goal for 2026-2027 is to build the club into a machine that
runs without requiring any one person to carry it — especially Reid.

The measure of success: Reid can miss three consecutive meetings and the club gets better,
not worse, because the systems held and the members stepped up.

---

### The Proposal to Mr. Novak

Before anything else works, we need three specific things from school administration.
This is the formal ask.

**Ask 1 — Room 133 open access (3 days per week)**
Monday, Wednesday, and Friday after school. At least one officer present as supervisor.
Students use school PCs to work on their AI projects. Secretary logs sign-ins.
This is the highest-leverage change in the plan. Students who have a place to build will build.
Students who have to wait for a meeting every two weeks won't.

**Ask 2 — Tool access unblock (Tier 1 immediately)**
GitHub, VS Code, and terminal access need to be unblocked on school PCs.
These are not optional. You cannot build a production application without version control
and a code editor. This is the equivalent of asking a robotics team to build robots without
being allowed to use the workshop.

**Ask 3 — Parent contact list for donation drive outreach**
We want to run an opt-in parent donation drive in September. Every dollar goes directly to
a project team's API budget. No overhead, no general fund. Parents can see exactly where
their money goes and what their student builds with it. We need a way to reach them.

---

### The Funding Model — Parent Donation Drive

**When:** September, first two weeks of school.

**The pitch (exactly this framing):**
"We're splitting the club into project teams. Each team gets equal access to the same AI APIs
used by engineers at Anthropic, Google, and OpenAI. Every dollar donated goes directly to a
team's project budget. No overhead. At the end of the year, your student presents what they
built at our showcase. We'd like to get every team a $100-200 budget for the year."

**Why this works:**
- It's specific. Parents are not donating to "the club." They're funding their student's team.
- It has a clear output. The showcase at year-end is the accountability event.
- It's modest. $100-200 per team is accessible for most families.
- It mirrors how real companies fund engineering teams.

**Target:** 5 project teams. $150 per team = $750 total. 15-20 parent donors at $50 each covers it.

**What the money covers:** OpenAI API credits, Claude API credits, Vercel hosting,
any other production tools the team needs to ship.

**Treasurer owns this process:** Distribution happens at the start of Q2 (after teams are
scoped and stable). Each team gets a funded account or shared API key. Monthly spending
reported to Treasurer. Over-budget requests require Co-President approval.

---

### Project Team Structure

**Number of teams:** 5 (adjustable based on enrollment)
**Team size:** 4 members per team
**Duration:** Full academic year. No mid-year reshuffling except for extraordinary circumstances.

**Why 4 members:**
- Meets Congressional App Challenge team size requirements (up to 4)
- Enough to distribute work across build, design, documentation, and presentation
- Small enough that everyone has a real role and accountability is clear
- Fits 5 teams into a 20-25 member club without overlap

**Team composition (each team should have):**
- At least one person who can build (code, API integration)
- At least one person who can present (demo, write, explain)
- Mixed experience levels: one or two strong builders, one or two newer members learning

**Team formation (September Week 2-3):**
1. New member interest forms: what have you built, what do you want to build, what tools do you know
2. VP/COO drafts team assignments based on skill fit, interest fit, balance
3. Assignments announced at Week 3 meeting
4. Teams have one week to raise serious objections. After that, final.

**Each team has two roles:**
- Team Lead: owns scrum presentation, coordinates with VP/COO liaison, makes final call on direction
- VP/COO Liaison: one VP/COO assigned per team, checks in between meetings, unblocks issues

**Project selection criteria (every project must meet all three):**
1. It builds something. Not a research paper or a presentation about a topic. An artifact — code, tool, application — that didn't exist before.
2. It uses AI in a meaningful way. The AI is a core part of the project's function, not decoration.
3. It has realistic scope. Something that can be meaningfully progressed every two weeks.

---

### The Scrum Meeting Format

**Cadence:** Every two weeks. Same day, same room, same time.

**Each team presents in this order (3-4 minutes per team, 5 teams = 15-20 minutes total):**

1. What we built since last time — specific, demoable if possible
2. The tech behind it — one or two sentences on what tools or approaches they used
3. The problem we hit — the actual blocker, not a vague "it was hard"
4. How we solved it (or why we haven't yet) — honest
5. What we'll do before the next meeting — one specific, committed goal

**This format is non-negotiable.** Teams that show up with "we didn't make progress" need
to explain why and what the blocker is. That is not failure. Showing up with nothing and
no explanation is failure.

**After scrum:** 30-minute open work block. Teams work on their projects with officers
available to unblock. This is the time when real help happens.

**The guest demo slot (optional, at end of meeting):**
On meetings where a member, officer, or guest has something worth showing the full club,
they get 10-15 minutes after scrum. This is where Reid used to do everything. Now it's
distributed: any member with something worth showing can take this slot.

---

### Leadership Structure for 2026-2027

Eight officer positions. Two per role. Every position has a primary job and a clear
accountability standard.

**Co-Presidents — Reid Sendroff & Ben Shamosh**
Primary job: Set direction, remove blockers, represent the club to administration, parents,
and the outside world. Final sign-off on all external communications and budget decisions
over $50. The club's identity lives here.

What they do NOT own: Day-to-day meeting logistics, attendance tracking, social media posts,
budget line items under $50.

---

**Vice Presidents / Chief Operations Officers (2 positions)**
Primary job: Make sure every meeting runs exactly as planned, every week, without the
Presidents having to think about it.

What they own:
- Weekly meeting agenda (built and distributed 48 hours before each meeting)
- Room setup and AV
- Sign-in process and member check-ins
- Scrum facilitation and timing
- Following up with teams that missed a scrum commitment
- One VP/COO assigned as liaison to each project team

Accountability standard: If a meeting runs poorly (wrong room, no agenda, teams didn't know
what was expected), that is a VP/COO failure.

---

**Social Media Marketing Managers / Chief Marketing Officers (2 positions)**
Primary job: Make the club visible. Three posts per meeting, every meeting, no exceptions.

What they own:
- All Instagram and TikTok posts
- The three-post announcement system (7AM, 1PM, You Missed It) for every meeting
- Recruitment content
- Competition announcement posts
- Visual brand consistency (Canva, templates, color system)

Approval chain: Draft, Reid and Ben review, post. No content goes live without Co-President
review until the CMO team has demonstrated consistent quality.

Accountability standard: If there is a meeting and no announcement goes out, that is a CMO
failure. No exceptions, no excuses.

Skills required: Canva, Instagram scheduling, basic copywriting. Claude and ChatGPT for
drafting. The tools exist. The job is to use them consistently.

---

**Treasurers (2 positions)**
Primary job: Money is tracked, distributed, and spent correctly. No team should ever be
unable to build because of a funding delay.

What they own:
- Club fund ledger (updated within 48 hours of every transaction)
- Parent donation drive logistics (September)
- API fund distribution to project teams (start of Q2)
- Monthly balance report shared with all officers
- Reimbursement processing for club-approved expenses

Accountability standard: If a team can't access their API budget because of an administrative
delay, that is a Treasurer failure. Should never take more than 5 school days to process.

---

**Secretaries (2 positions)**
Primary job: Track everything. The club's memory.

What they own:
- Attendance at every meeting (sign-in sheet, logged within 24 hours)
- Written warnings to members hitting 80% attendance or below
- Competition deadline calendar (updated at start of each semester)
- Meeting minutes (brief: what was decided, not what was said)
- Strike tracking for scrum absences
- Room 133 open lab sign-in logs

Accountability standard: If a member disputes their attendance record and the Secretary
doesn't have documentation, that is a Secretary failure. Every meeting must be logged.

---

### Participation and Accountability — 2026-2027 Enforcement

This is being tracked strictly next year. The rules below are enforced, not suggested.

**Attendance minimum:** 75% to remain in good standing.

**Warning threshold:** Secretary sends a written notice at 80% or below.

**What "not in good standing" means:**
- Ineligible to represent the club in competitions
- Ineligible for spotlight presentation slots
- Ineligible for leadership consideration
- Does not receive credit for club participation

**Excused absences:** Member notifies VP/COO at least 24 hours in advance with a reason.
Two excused absences per semester maximum. Secretary marks these separately.

**Scrum accountability (strike system):**

| Strikes | Consequence |
|---|---|
| 1 | Logged. No action. |
| 2 | VP/COO sends a direct check-in: "Noticed X — anything blocking you?" |
| 3 | 1:1 meeting with VP/COO. Required, not optional. |
| 4 | Membership review. Presidents, VP/COO, and member meet. Options: resolve, adjust, or exit. |

Strikes reset at the start of each semester.

**Missing a scrum without 48-hour advance notice = 1 strike.**
Presenting with nothing to show = allowed once per semester, logged, triggers a check-in.

---

### Competition Calendar 2026-2027

Every team must target at least one competition per year. This is non-negotiable.

| Competition | Team Size | Deadline | Why Enter |
|---|---|---|---|
| Congressional App Challenge | 1-4 | November | The flagship. National judges. Real evaluation. |
| MIT Blueprint Hackathon | 4 | February | The best hackathon available to high schoolers. |
| FBLA Computer Science | 1-3 | Jan-Feb | Overlaps both clubs. Dual-credit opportunity. |
| Kode with Klossy | Individual | March | National. Good for members building independently. |
| Regeneron ISEF | 1-2 | April | Via local science fair. Highest national prestige. |
| Local hackathons | Varies | Rolling | Lower stakes, good practice, real deadlines. |

**Four weeks before every deadline:**
- Team Lead confirms submission requirements to VP/COO
- VP/COO confirms the team is on track
- Co-Presidents briefed on what's being submitted

**Two weeks before:**
- Live deployment is up and stable
- Written components drafted and reviewed

**One week before:**
- Full submission reviewed by someone outside the team
- Submit early if at all possible. Never submit on deadline day.

**After results:**
Win or lose, the team presents at the next meeting. The work happened regardless of the result.

---

### What Success Looks Like at Year End

The AI Club for 2026-2027 is successful if:

1. At least 3 project teams submitted to a national competition
2. Room 133 had consistent open lab attendance across the year (not just meeting days)
3. The three-post announcement system ran for every single meeting without a failure
4. A new officer cohort was elected and fully onboarded before seniors graduated
5. At least one member built something that reached users outside the school
6. Reid and Ben could have missed 30% of meetings and the club would have been fine

That last point is the real test. If the club still needs Reid to function at the same level,
the system failed. If it ran better because the systems held, it worked.

---

### The Proposal Email to Mr. Novak

Use `Email_Protocol.md` format. This is the ask stripped to its core:

Subject: AI Club — Structure and Resource Plan for 2026-2027

> Mr. Novak, we want to share how we're restructuring the AI Club for next year and make
> three specific asks before the year ends.
>
> What's changing:
> - Five project teams of 4 students each, each with equal funding from a parent donation drive
> - Bi-weekly scrum meetings where teams present their progress (no more single-presenter meetings)
> - 8 elected officer positions with distinct, non-overlapping responsibilities
> - Strict 75% participation requirement with Secretary-tracked records
>
> The three asks:
> - Room 133 access 3 days per week after school (Monday, Wednesday, Friday)
> - Tier 1 tool unblock on school PCs (GitHub, VS Code, terminal)
> - Permission to contact parents through the school for our September donation drive
>
> We've written a full plan covering structure, funding, competitions, and succession.
> Happy to walk through it whenever works for you.
>
> Reid and Ben

---

## 31. KEY DATES — FULL YEAR CALENDAR

| When | What |
|---|---|
| September Week 1 | New member onboarding, interest forms, parent donation drive launch |
| September Week 2-3 | Team formation, project selection, API budget distribution plan |
| October | Projects scoped and building, first scrums |
| October-November | Congressional App Challenge — teams building toward deadline |
| November | Congressional App Challenge deadline |
| December | Mid-year review, attendance reports, budget reconciliation |
| January | Second semester kickoff, new member onboarding |
| January-February | FBLA prep, MIT Blueprint Hackathon (February) |
| March-April | Competition season (Kode with Klossy, Regeneron) |
| April | End-of-year showcase, officer elections |
| April-May | Incoming officers shadow current officers |
| May | Transition documents completed, handoff, year closes |
