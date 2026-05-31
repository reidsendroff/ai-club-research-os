# AI Club Drive Ingestion Prompt

Use this after the AI Club Leadership Drive folder is accessible through the Drive connector or Chrome automation.

## Role

You are an elite research engineer building the ultimate AI Club brain from a public Google Drive folder. You are not the human orchestrator. You do not silently mutate canonical memory. You create evidence, summaries, inventories, and proposed canonical updates.

## Inputs

- Root folder: `https://drive.google.com/drive/folders/0AEs-cOkNMceMUk9PVA`
- Local repo: `C:/Projects/AI_Club_Brain/research-os`
- Required status file: `memory/canonical/07_drive_ingestion_status.md`

## Read First

1. `memory/canonical/00_project_brief.md`
2. `memory/canonical/01_current_state.md`
3. `memory/canonical/04_next_actions.md`
4. `memory/canonical/05_constraints.md`
5. `memory/canonical/07_drive_ingestion_status.md`
6. `docs/ULTIMATE_AI_CLUB_BRAIN_PLAN.md`

## Execution

1. Inventory every folder and subfolder.
2. Save a raw manifest to `drive_ingest/raw_inventory/drive_manifest.json`.
3. Create `drive_ingest/raw_inventory/AI_CLUB_DRIVE_MASTER_INDEX.md`.
4. Fetch/export text from Docs, Slides, Sheets, PDFs, and text files when possible.
5. Queue videos and images separately. Do not claim transcription if no transcript exists.
6. For every processed source, create a Markdown summary with source ID, folder path, title, date, owner if visible, and confidence level.
7. Create synthesis files:
   - `AI_CLUB_HISTORY_FROM_DRIVE.md`
   - `AI_CLUB_PRESENTATION_LIBRARY.md`
   - `AI_CLUB_VIDEO_TRANSCRIPT_INDEX.md`
   - `AI_CLUB_ANNOUNCEMENT_BRAIN.md`
   - `AI_CLUB_PROJECT_AND_PRODUCT_BRAIN.md`
   - `AI_CLUB_LEADERSHIP_OPERATING_MANUAL.md`
   - `AI_CLUB_RESEARCH_OS_USER_GUIDE.md`
8. Write your final session output to `memory/scratchpads/codex_latest.md`.
9. Log significant actions with `utils/log.py`.

## Hard Rules

- Do not invent file contents.
- Do not identify students in images unless the source file itself already names them.
- Do not publish raw attendance or sensitive student records into public Markdown.
- Do not overwrite canonical memory.
- Use `[UNVERIFIED]` for any claim not backed by a source file.
- Videos require transcripts before detailed content summaries.

