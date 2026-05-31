# AI Club — How to Prompt Claude for Announcements

A reusable guide for getting the best results from Claude when generating AI Club content.

---

## The Master Prompt (Copy This)

Use this when you need a full set of three announcements written in one shot:

```
You are writing announcements for the Northern Highlands AI Club.

The club is run by Reid Sendroff and Ben Shamosh. It meets in Room 133 @ 2:45.
The tone is human, direct, and specific. No em dashes. No "Thank you for your time."
No formal language. Reads like a real person wrote it, not a brand account.

Write three posts:
1. A 7AM hook — short, exciting, no time reference, room/time at the bottom only
2. A 1PM reminder — full agenda with one paragraph per demo, room and time prominent
3. A You Missed It recap — past tense, what actually happened, tease next meeting

Here is the meeting information:
[PASTE AGENDA, DEMOS, PRESENTERS, ANYTHING SPECIAL HERE]
```

---

## How to Give Claude the Meeting Info

The more specific you are, the better the output. Paste or type:

- **Demo names** — exact names, not descriptions ("ChatGPT Images 2.0" not "image AI")
- **Presenters** — first names ("Reid", "Ben", "Arjun")
- **What's new or surprising** — what would someone tell a friend about this meeting?
- **Any guests** — name and one line on who they are
- **Room and time** — always Room 133 @ 2:45 unless changed
- **Any housekeeping** — elections, new members, upcoming competitions

**Weak input:**
> "Meeting is tomorrow, we're doing AI stuff"

**Strong input:**
> "Reid is demoing the new image pipeline he built in MyClassPal — GPT-4o generates images from assignment prompts. Ben is showing how he set up Claude Routines to auto-summarize class notes. Arjun is doing a live walkthrough of the Instagram content calendar he built in Canva. Room 133 @ 2:45."

---

## Regeneration Prompts

When the first draft isn't quite right, use these targeted fixes:

**Too formal:**
> "Make this sound more like a real person texted it. Less professional, more human."

**Too long:**
> "Cut the 7AM post in half. Keep the most interesting thing and the room/time."

**Too vague:**
> "The demo description for [NAME] is too generic. Rewrite it with a specific detail about what they built or showed."

**Em dashes snuck in:**
> "Remove all em dashes. Replace with a comma or a period, whichever reads better."

**You Missed It is too dry:**
> "Rewrite the You Missed It post. Lead with the most surprising or interesting thing that happened, not a list of what was on the agenda."

---

## The Super Prompt (Full Leadership Context)

Use this when you want Claude to act as a 20+ year experienced club leader reviewing or writing content:

```
You are a club leader with over 20 years of experience building and sustaining student organizations.
You have seen what works and what doesn't across hundreds of meetings, dozens of leadership transitions,
and every kind of student engagement challenge.

You are helping Reid Sendroff and Ben Shamosh run the Northern Highlands AI Club — a technical building
club where students ship real projects, compete nationally, and work with production AI tools.

The club meets in Room 133 @ 2:45. Tone is always human and direct. No em dashes.
No corporate language. Specific over vague. Names over titles.

[DESCRIBE WHAT YOU NEED HERE]
```

---

## Content Types Claude Can Generate for AI Club

| What You Need | What to Ask For |
|---|---|
| Three-post announcement set | "Write the 7AM, 1PM, and You Missed It posts for this meeting: [agenda]" |
| Email to Mr. Novak | "Write a short, direct email to our faculty advisor about [topic]. No em dashes. Get to the point in line one." |
| Presentation outline | "Create a slide-by-slide outline for a [X]-minute AI Club presentation on [topic]" |
| PowerPoint deck | "Build a [N]-slide PPTX on [topic] with a [color/theme] theme. Audience is high school students." |
| Word document / proposal | "Create a formal Word document proposing [topic] to school administration. Include [sections]." |
| Meeting agenda | "Write a 60-minute meeting agenda for AI Club covering [topics]. Use the scrum format." |
| Member email | "Draft an email to the AI Club team about [topic]. Human tone, signed from Reid and Ben." |

---

## Things That Always Help

- **Tell Claude the audience.** "High school students in a technical club" gives different output than "general audience."
- **Give an example of tone.** Paste a previous post that worked and say "match this tone."
- **Say what you don't want.** "No em dashes, no formal language, no bullet points in the 7AM post" prevents Claude from guessing.
- **Iterate, don't restart.** If 80% is right, ask Claude to fix the specific parts that aren't — don't ask for a full rewrite.
