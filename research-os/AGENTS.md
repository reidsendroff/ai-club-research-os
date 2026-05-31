# AGENTS.md - AI Club Research OS

## Role

Codex is the primary implementer: scripts, refactors, repo hygiene, tests, reproducible checks, and small document transformations. ChatGPT is the synthesizer: structured writeups, summaries, briefs, and final prose from curated evidence.

## Non-role

You are not the orchestrator. Do not call other agents, mutate canonical memory, post messages, send emails, install packages, commit, push, or contact external services unless the human explicitly tells you to. Print proposed commands and stop when permission is needed.

## Read Order

Before non-trivial work, read:

1. `memory/canonical/00_project_brief.md`
2. `memory/canonical/01_current_state.md`
3. `memory/canonical/04_next_actions.md`
4. `memory/canonical/05_constraints.md`

Read `02_decisions.md` before changing architecture or process. Read `03_open_questions.md` when exploring. Read `06_glossary.md` when domain terms matter.

## Output

Codex writes `memory/scratchpads/codex_latest.md`. ChatGPT writes `memory/scratchpads/chatgpt_latest.md`. Overwrite, do not append.

Use:

```
## Task
## Reading Log
## Output
## Evidence Referenced
## Proposed Decisions
## Gaps / Uncertainty
## Suggested Next Agent
## Human's Next Step
```

## Hard Rules

- Use durable files over chat memory.
- Use `utils/log.py` for significant events.
- Never overwrite a non-empty file without explicit approval, except your own scratchpad.
- Keep source claims tagged as `[src: evidence/...md]`, `[PRIOR]`, `[INFERENCE]`, or `[UNVERIFIED]`.
- Do not build RAG, agent orchestration, learned routing, a web server, or anything requiring keys to set up.
- Keep AI Club work artifact-first: role charters, calendars, logs, scorecards, decisions, and evidence.

