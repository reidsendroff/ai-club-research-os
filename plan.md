# AI Club Brain Roadmap

## Purpose

Build the AI Club Brain into the durable operating system for the Northern Highlands AI Club: a public, structured, evidence-backed knowledge base that future leaders can use to run meetings, project teams, announcements, competitions, technical systems, and leadership transitions without depending on Reid or Ben to personally reconstruct context.

This roadmap starts from the current repository state:

- `AI_Club_OS/` holds the club operating system.
- `AI_Club_Docs/` holds announcement and communication systems.
- `research-os/` holds the human-in-the-loop research agent workspace.
- `outputs/` holds generated meeting, leadership, audit, and presentation artifacts.
- `leadership-form/` and related materials support leadership applications and candidate review.

## North Star

By the 2026-2027 school year, AI Club should operate like a small technical company:

- Leaders own specific functions.
- Project teams ship real work.
- Meetings generate artifacts, not just discussion.
- Announcements consistently drive attendance.
- Competition prep is calendar-driven.
- AI agents and human officers work from the same source of truth.
- The club memory survives leadership turnover.

## Roadmap Overview

| Phase | Track | Outcome |
|---|---|---|
| 1 | Foundation | Clean source inventory, canonical roadmap, public repo safety |
| 2 | AI Club OS | Complete leadership, meeting, project, announcement, finance, competition, and succession systems |
| 3 | Research OS | Make the Markdown research-agent workflow usable by all leaders |
| 4 | Agentic AI Implementation | Add agent workflows that help officers research, summarize, plan, audit, and rank club work |
| 5 | Obsidian Second Brain | Turn the repo into an Obsidian-friendly knowledge graph for officers |
| 6 | Drive Ingestion | Convert Google Drive presentations, videos, notes, sheets, and announcements into structured Markdown |
| 7 | Leadership + Project Execution | Use the system for applications, role assignment, project-team reviews, and June 15 showcase follow-up |
| 8 | Public Sharing | Publish a polished, safe version that future leaders can clone and use |

## Phase 1: Foundation

### Goals

- Establish `plan.md` as the top-level roadmap.
- Keep the repo safe for public GitHub use.
- Separate public operating knowledge from private student records.
- Preserve all generated artifacts with clear paths and dates.

### Work

- Audit current repo structure and remove accidental junk only after review.
- Keep `.env`, credentials, database URLs, raw student submissions, private attendance, and sensitive media out of Git.
- Create a source inventory for:
  - AI Club OS files
  - announcement docs
  - meeting plans
  - presentation decks
  - leadership form assets
  - Research OS memory/evidence/decisions
- Mark each artifact as:
  - public-ready
  - needs redaction
  - private/internal only
  - obsolete

### Deliverables

- `plan.md`
- public/private artifact inventory
- GitHub-safe repo checklist

## Phase 2: AI Club Operating System

### Goals

Make `AI_Club_OS/` the complete written operating manual for the club.

### Work

- Update leadership roles with concrete responsibilities:
  - Presidents
  - VP / COO
  - CMO / Social Media
  - Treasurer / Resources
  - Secretary / Systems
  - TA / Administrative Assistant
  - Project Leads
- Add role scorecards:
  - what the role owns
  - weekly responsibilities
  - expected artifacts
  - tools required
  - common failure modes
  - how Reid and Ben evaluate performance
- Expand project-team process:
  - team formation
  - build logs
  - bi-weekly scrums
  - GitHub repo standards
  - competition readiness
  - demo requirements
- Update meeting runbooks for:
  - normal build meetings
  - guest speaker meetings
  - project showcase meetings
  - leadership selection meetings
  - competition sprint meetings
- Keep the announcement system aligned with the actual voice of the club:
  - specific
  - persuasive
  - direct
  - not corporate
  - no fake hype

### Deliverables

- updated `AI_Club_OS/*.md`
- leadership scorecard templates
- project-team review template
- meeting artifact checklist

## Phase 3: Research OS for Club Leaders

### Goals

Make `research-os/` usable by future officers who are not Reid.

### Work

- Clarify how leaders should use:
  - `memory/canonical/`
  - `memory/scratchpads/`
  - `evidence/`
  - `decisions/`
  - `prompts/`
- Create officer workflows:
  - write an announcement
  - summarize a meeting
  - plan a project sprint
  - audit a leadership candidate
  - prepare a guest speaker brief
  - create a competition prep plan
  - promote useful notes into canonical memory
- Add examples of good scratchpads and bad scratchpads.
- Add a weekly curation routine for Secretary / Systems.

### Deliverables

- AI Club Research OS user guide
- officer workflow prompts
- weekly curation checklist
- decision log examples

## Phase 4: Agentic AI Implementation

### Goals

Add practical AI-agent workflows that help leaders run the club without creating a fragile black-box automation system.

The agents should assist human leaders. They should not replace human judgment.

### Agent Roles

| Agent | Job |
|---|---|
| Meeting Summarizer | Converts notes, slides, transcripts, and chat logs into meeting summaries and action items |
| Announcement Writer | Drafts 7AM / 11AM / 1PM announcement sets using the club voice |
| Project Coach | Reviews project-team updates and suggests next build steps |
| Competition Scout | Tracks competitions, deadlines, eligibility, and required artifacts |
| Leadership Reviewer | Audits applications and demos against role scorecards |
| Research Librarian | Converts Drive artifacts into structured Markdown and evidence files |
| Technical Reviewer | Checks project repos for README quality, deployability, GitHub hygiene, and obvious bugs |
| Memory Curator Assistant | Suggests what should be promoted into canonical memory |

### Implementation Strategy

- Start with CLI-driven workflows, not a custom orchestration server.
- Use Markdown files as durable inputs and outputs.
- Keep each agent single-purpose.
- Require every agent output to include:
  - task
  - sources read
  - findings
  - uncertainty
  - recommended next action
- Keep humans in charge of:
  - final leadership decisions
  - canonical memory changes
  - public announcements
  - sensitive student data

### Candidate Workflows

1. **Meeting Debrief Agent**
   - Input: meeting slides, notes, attendance, recordings if available
   - Output: meeting recap, decisions, action items, reusable announcement language

2. **June 15 Showcase Review Agent**
   - Input: leadership forms, Canvas submissions, GitHub links, demo notes
   - Output: candidate scorecards and role-fit recommendations

3. **Project Sprint Agent**
   - Input: project team updates
   - Output: blockers, next technical steps, demo readiness, competition fit

4. **Announcement Agent**
   - Input: meeting plan, speaker/demo context, past examples
   - Output: 7AM / 11AM / 1PM announcements

5. **Drive Ingestion Agent**
   - Input: Google Drive folder exports
   - Output: master index, deck summaries, video summaries, image notes, evidence files

### Deliverables

- `research-os/prompts/agentic_workflows/`
- reusable agent prompt library
- CLI runbook for Claude, Gemini, Codex, and ChatGPT
- sample outputs for each agent role
- safety rules for student data and public repo use

## Phase 5: Obsidian Second Brain

### Goals

Make the AI Club Brain work as an Obsidian vault so leaders can browse, search, link, and maintain club knowledge like a real second brain.

### Vault Structure

```text
AI_Club_Brain/
  00_Home.md
  01_AI_Club_OS/
  02_Meetings/
  03_Projects/
  04_Leadership/
  05_Competitions/
  06_Announcements/
  07_Technical/
  08_Evidence/
  09_Decisions/
  10_Templates/
```

### Obsidian Features to Add

- Home dashboard with links to the most important operating files.
- Maps of content for:
  - leadership
  - project teams
  - meetings
  - competitions
  - announcements
  - technical infrastructure
- Consistent YAML frontmatter:
  - `type`
  - `status`
  - `owner`
  - `updated`
  - `source`
  - `visibility`
- Tags:
  - `#leadership`
  - `#meeting`
  - `#project`
  - `#announcement`
  - `#competition`
  - `#technical`
  - `#evidence`
  - `#private-review`
- Templates for:
  - meeting recap
  - project update
  - candidate review
  - announcement set
  - competition brief
  - decision record
  - evidence note

### Operating Rules

- Obsidian is the reading and curation layer.
- GitHub remains the version-control layer.
- Research OS remains the agent workflow layer.
- Sensitive student data must stay out of the public vault.
- Canonical notes should be reviewed before promotion.

### Deliverables

- `00_Home.md`
- Obsidian folder structure
- note templates
- tag system
- officer guide: "How to use the AI Club Brain in Obsidian"

## Phase 6: Google Drive Ingestion

### Goals

Convert the AI Club Leadership Google Drive into a durable, searchable Markdown archive.

### Work

- Inventory every folder and file.
- Export or summarize:
  - meeting presentations
  - product presentations
  - videos/photos
  - announcement context
  - meeting notes
  - meeting plans
  - Google Forms
  - attendance and leaderboard sheets
  - guest speaker materials
- For videos:
  - transcribe
  - summarize
  - extract decisions and reusable language
- For decks:
  - summarize slide-by-slide
  - identify meeting purpose
  - extract demos, tools, and project examples
- For sheets/forms:
  - document schema and purpose
  - avoid exposing student-level private data

### Deliverables

- `AI_CLUB_DRIVE_MASTER_INDEX.md`
- `AI_CLUB_HISTORY_FROM_DRIVE.md`
- `AI_CLUB_PRESENTATION_LIBRARY.md`
- `AI_CLUB_VIDEO_TRANSCRIPT_INDEX.md`
- `AI_CLUB_ANNOUNCEMENT_BRAIN.md`
- `AI_CLUB_PROJECT_AND_PRODUCT_BRAIN.md`
- `AI_CLUB_LEADERSHIP_OPERATING_MANUAL.md`
- `AI_CLUB_RESEARCH_OS_USER_GUIDE.md`

## Phase 7: Leadership + Project Execution

### Goals

Use the roadmap to run the actual 2026-2027 leadership transition and project-team system.

### Work

- Collect leadership applications.
- Collect June 15 project submissions.
- Review candidates using:
  - form responses
  - project evidence
  - GitHub links
  - demo performance
  - role fit
  - availability
  - communication skill
- Assign leadership roles based on function, not popularity.
- Create project teams.
- Create GitHub repos for each team.
- Set the first 30 days of meetings.
- Set first competition targets.

### Deliverables

- leadership candidate review packet
- final leadership roster
- project-team roster
- first-month meeting calendar
- competition target list
- summer setup checklist

## Phase 8: Public Sharing

### Goals

Make the AI Club Brain useful to future leaders and potentially reusable by other school clubs.

### Work

- Clean public-facing README.
- Add setup instructions:
  - clone repo
  - open in Obsidian
  - use Research OS
  - write announcements
  - run project teams
  - maintain canonical memory
- Redact private data.
- Add examples without exposing sensitive student information.
- Keep raw data and private records out of public GitHub.

### Deliverables

- polished public README
- quickstart guide for officers
- quickstart guide for another school starting an AI club
- public-safe sample workflows

## Priority Order

1. Finish leadership and project execution artifacts needed for June 15.
2. Add Obsidian-ready home page and vault structure.
3. Build agentic workflows for announcements, meeting summaries, project review, and candidate review.
4. Finish Drive ingestion inventory and summaries.
5. Polish public sharing docs.
6. Keep improving the AI Club OS as the club learns what actually works.

## Near-Term Action List

- [ ] Create Obsidian `00_Home.md`.
- [ ] Create templates for meeting recaps, project updates, announcement sets, and candidate reviews.
- [ ] Add `research-os/prompts/agentic_workflows/`.
- [ ] Create first agent workflow: Announcement Writer.
- [ ] Create second agent workflow: Meeting Summarizer.
- [ ] Create third agent workflow: Leadership Reviewer.
- [ ] Create Drive master index from available Drive links and local artifacts.
- [ ] Update AI Club OS leadership roles after June 15 decisions.
- [ ] Write the officer guide for using AI Club Brain in Obsidian.

## Definition of Done

The AI Club Brain is working when:

- A new officer can open the repo and understand what to do next.
- A leader can open Obsidian and navigate the club knowledge base.
- A meeting produces a recap, decisions, and next actions.
- Project teams have documented repos and update rhythms.
- Announcements can be produced from reusable context without sounding generic.
- Leadership decisions are supported by artifacts, not memory or vibes.
- Agent workflows help leaders move faster without making hidden decisions.
- The public repo contains useful operating knowledge without leaking private student data.
