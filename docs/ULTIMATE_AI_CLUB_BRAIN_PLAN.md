# Ultimate AI Club Brain Plan

## Purpose

Build a shareable AI Club brain that turns the AI Club Leadership Drive into durable, source-backed Markdown knowledge. The goal is for future leaders to understand what happened, what worked, what failed, what to reuse, and how to run the club without needing Reid or Ben to verbally reconstruct the past.

## Current Access Status

Drive folder provided:

`https://drive.google.com/drive/folders/0AEs-cOkNMceMUk9PVA`

Current blocker: the Google Drive connector returned an empty listing for the shared-drive-style root link, and Chrome automation is blocked by an open extension UI on the Drive page. The folder is visible in the user's browser, but the ingestion run cannot honestly claim to have read every file until Chrome automation is unblocked or direct subfolder/file IDs are supplied.

## Source Priority

1. Meeting Presentations
2. Meeting Presentations / Product Presentations
3. Videos/Photos from Meetings
4. Meeting Notes
5. Meeting Plans
6. Announcements Context
7. Announcements
8. AI Club Operating System
9. Guest Speakers
10. Project Presentations
11. Ramapo College Conference Recordings
12. Squad Groups for Competition
13. Google Forms
14. Attendance / leaderboard / marketing sheets
15. Miscellaneous

## Output Structure

Use this structure inside `research-os`:

```text
drive_ingest/
  raw_inventory/
  raw_exports/
  transcripts/
  summaries/
  image_notes/
  presentation_notes/
  announcement_notes/
  meeting_notes/
```

Durable findings go into:

```text
evidence/
decisions/
memory/scratchpads/
memory/canonical/   # human-curated only
```

## File-Level Processing Rules

### Videos

For each video:

- Preserve title, folder path, file id or URL, modified date, owner, and source folder.
- Download or export if allowed.
- Extract or transcribe audio.
- Produce a transcript Markdown file.
- Produce a structured summary:
  - meeting or event
  - presenters
  - demos shown
  - tools mentioned
  - decisions made
  - reusable language
  - project status
  - action items
  - open questions
  - source limitations

### Images

For each image:

- Preserve source metadata.
- Describe visible content.
- Tag likely use: meeting photo, project screenshot, announcement asset, slide capture, people/context, unclear.
- Do not identify students beyond names already present in surrounding source material.

### Presentations

For each deck:

- Export slide text where possible.
- Summarize slide-by-slide.
- Extract meeting purpose, topic, demo flow, technical concepts, reusable visuals, and speaker notes if present.
- Map to AI Club operating themes: recruiting, project demos, AI tools, competitions, leadership, guest speakers, meeting operations.

### Docs and Notes

For each doc:

- Extract title, headings, decisions, tasks, owners, dates, and reusable language.
- Identify whether it should update canonical memory, remain evidence only, or become a decision record.

### Sheets and Forms

For each sheet/form:

- Extract schema and purpose.
- Do not publish sensitive student-level data into public materials.
- Summarize aggregate use: attendance, teams, leaderboard, survey, marketing, or operations.

## Markdown Products to Create

1. `AI_CLUB_DRIVE_MASTER_INDEX.md`
   - every folder and file, with status and processing notes

2. `AI_CLUB_HISTORY_FROM_DRIVE.md`
   - chronological history of meetings, demos, guest speakers, competitions, and projects

3. `AI_CLUB_PRESENTATION_LIBRARY.md`
   - every deck summarized with reuse notes

4. `AI_CLUB_VIDEO_TRANSCRIPT_INDEX.md`
   - every video, transcript path, and summary

5. `AI_CLUB_ANNOUNCEMENT_BRAIN.md`
   - announcement examples, patterns, copy rules, high-performing language

6. `AI_CLUB_PROJECT_AND_PRODUCT_BRAIN.md`
   - all products, demos, project presentations, and technical artifacts

7. `AI_CLUB_LEADERSHIP_OPERATING_MANUAL.md`
   - how future leaders should use research-os to run meetings, campaigns, project teams, and accountability systems

8. `AI_CLUB_RESEARCH_OS_USER_GUIDE.md`
   - practical instructions for officers using this repo

## Ingestion Phases

### Phase 1: Inventory

Get the full folder tree. No summaries yet. The artifact is a complete file manifest with file IDs, folder paths, MIME types, and processing status.

### Phase 2: Text Exports

Fetch Docs, Slides, Sheets, PDFs, and text-like files. Create evidence files for each durable source.

### Phase 3: Media Queue

Queue videos and images. Record which files can be downloaded and which need manual export.

### Phase 4: Transcription

Transcribe videos in batches. Keep raw transcripts separate from summaries.

### Phase 5: Synthesis

Create cross-source Markdown files: history, presentations, announcements, project/product brain, leadership manual, and research-os guide.

### Phase 6: Curation

Human reviews summaries and promotes only stable findings into `memory/canonical/`.

## Public Repo Safety

If this repo is public:

- Do not include private student attendance records.
- Do not include raw student emails, phone numbers, grades, or sensitive personal details.
- Do not include API keys, tokens, Drive cookies, or downloaded files with restricted licenses.
- Keep raw transcripts public only if the Drive folder itself is intended to be public and the human approves.
- When unsure, publish summaries and source references, not raw private data.

## Go / No-Go Gates

Go:

- Folder tree is fully listed.
- File inventory has stable IDs.
- Sensitive data policy is confirmed.
- Transcription tool is available or a manual transcript source exists.

No-go:

- Drive remains visible only through a blocked browser tab.
- Videos cannot be downloaded or transcribed.
- Public repo policy for student data is not decided.
- The user expects "everything summarized" without allowing enough time for video transcription.

