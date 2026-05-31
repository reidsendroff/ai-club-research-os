# 11 — AI Prompt Playbook

---

## Overview

The AI Club uses AI to run itself. Not ironically — practically. Every officer should know how to use Claude or ChatGPT to do their job faster and better. This document is the operational guide for that.

---

## The Master Announcement Prompt

Use this to generate all three meeting posts in one shot. Copy it, fill in the meeting details, paste it into Claude.

```
You are writing announcements for the Northern Highlands AI Club.

The club is led by Reid Sendroff and Ben Shamosh. It meets in Room 133 @ 2:45.

Tone rules:
- Human and direct. No corporate language. Reads like a real person wrote it.
- No em dashes — use commas or periods instead.
- No "Thank you for your time" or anything like it.
- Specific over vague. Name the demo, name the person, describe what was built.
- Sign off as "— Reid & Ben" unless otherwise specified.

Write three posts:

POST 1 — 7AM HOOK
Short and punchy. Lead with what's exciting. No time reference anywhere in the body — "Room 133 @ 2:45" goes at the very bottom only. Under 80 words.

POST 2 — 1PM REMINDER  
Full agenda. One detailed paragraph per demo (2–3 sentences each). Room and time prominent. Reads like someone describing exactly what they'd walk into. Under 200 words.

POST 3 — YOU MISSED IT
Past tense. Written like a genuine recap, not a copy of the agenda. Lead with the most interesting thing that happened — the moment, the reaction, the surprise. Tease next meeting specifically. Under 150 words.

MEETING INFO:
[Paste your agenda, demos, presenter names, anything special here]
```

---

## The Email Prompt (Admin / Mr. Novak)

```
Write a short email from Reid Sendroff and Ben Shamosh, Co-Presidents of the Northern Highlands AI Club, to Mr. Michael Novak, our faculty advisor.

Rules:
- Get to the point in the first sentence. State the ask or the purpose immediately.
- No em dashes.
- No "Thank you for your time."
- Professional but human — not stiff.
- Short. Under 150 words unless the ask requires more detail.
- Signed from Reid and Ben.

Email purpose: [Describe what you need to communicate or request]
Key details: [Any specifics — dates, room numbers, specific asks, context]
```

---

## The Meeting Agenda Prompt

```
Create a 60-minute meeting agenda for the Northern Highlands AI Club.

Format: Standard meeting (not a scrum sprint).
Audience: High school students with varying technical skill levels.
Room: 133. Time: 2:45.

Meeting segments:
- 0:00–5:00: Announcements (Secretary)
- 5:00–20:00: Leadership feature
- 20:00–45:00: Member spotlight (1–2 presentations)
- 45:00–57:00: Work block
- 57:00–60:00: Close / next steps

This meeting is covering: [Describe topics, demos, presenters]
Any special notes: [Guests, competitions coming up, anything unusual]

Output the agenda as a clean, formatted document that VP/COO can distribute to officers.
```

---

## The Presentation Outline Prompt

```
Create a slide-by-slide outline for a [X]-minute AI Club presentation on [TOPIC].

Audience: High school students in a technical building club. Some know how to code, some don't. Assume curiosity but not expertise.

Presentation principles:
- Lead with what changed or what's new — not history or background
- Show don't tell — every technical claim should have a demo or screenshot planned
- One concrete takeaway: something the audience can try before the next meeting
- No more than 6–8 slides for a 15-minute presentation

For each slide include:
- Slide title
- What goes on it (visuals, code, demo, text)
- What the presenter says (2–3 sentence talking points)
- Time allocation

Topic: [TOPIC]
Presenter: [NAME]
Time available: [X] minutes
Key points to cover: [List anything that must be included]
```

---

## The Member Communication Prompt

```
Write a message to the AI Club member group chat from Reid and Ben.

Tone: Direct, warm, human. No corporate language. Reads like a text from a real person.
Length: Short — this is a group chat, not an email.
No em dashes.

Message purpose: [What do you need to communicate?]
Any specific details: [Deadlines, room changes, shoutouts, etc.]
```

---

## The Scrum Debrief Prompt

After a scrum meeting, use this to generate a summary:

```
I just ran a scrum meeting for the Northern Highlands AI Club. Here are the team updates:

[Paste your notes on what each team presented — even rough notes work]

Write a brief post-meeting summary (under 150 words) to share with the full club. Include:
- What each team shipped or showed
- Any blockers mentioned that leadership should follow up on
- One highlight from the meeting
- What's expected at the next scrum

Tone: Factual and direct. Not promotional.
```

---

## The Proposal / Document Prompt

```
You are a writer with 20+ years of experience helping student organizations communicate with school administration.

Write a [document type: proposal / email / one-pager / formal request] for the Northern Highlands AI Club.

Audience: School administration and faculty advisor (Mr. Michael Novak).
Tone: Professional, specific, results-oriented. Not stiff. Not overly formal.
Frame everything in terms of student outcomes and competitive advantage for the school.

Document purpose: [What is this asking for or communicating?]
Key asks or points: [List them]
Any context or background: [Anything the reader needs to know]
Length: [Short / medium / full document]
```

---

## Tips for Better AI Output

**Be specific.** "Write an announcement about our meeting" gives you a generic result. "Write a 7AM announcement — Reid is showing a live image editor he built with GPT-4o inside MyClassPal, it takes homework prompts and generates diagrams" gives you something usable.

**Give examples.** If you have a post that worked well, paste it and say "match this tone."

**Say what you don't want.** "No em dashes, no bullet points in the 7AM post, no corporate language" prevents Claude from guessing wrong.

**Iterate, don't restart.** If 80% is right, say "the first two paragraphs are good, but the closing is too formal — rewrite just that part."

**Use the You Missed It to document reality, not plans.** Tell Claude what actually happened, not what was on the agenda. The best recaps come from real moments.

---

## What AI Should NOT Do for This Club

- **Write competition submissions without human editing.** AI can draft, structure, and improve. The final voice needs to sound like the team that built the thing.
- **Make strategic decisions.** "Should we enter this competition?" is a Co-President conversation, not a Claude conversation.
- **Replace leadership judgment.** AI handles execution. Humans handle direction.
- **Communicate with administration without review.** Every email to Mr. Novak or any admin gets read by a Co-President before it's sent.
