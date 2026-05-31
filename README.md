# AI Club Research OS

This is a human-in-the-loop research-agent workspace for the Northern Highlands AI Club. It turns scattered club context into durable memory, evidence files, decision logs, and repeatable workflow checklists.

The purpose is not to automate the club. The purpose is to help Reid, Ben, and the human orchestrator make better decisions about the club with less context loss.

## Quickstart

```bash
cd C:/Projects/AI_Club_Brain/research-os
bash scripts/check.sh
python utils/log.py scaffold_checked --note "manual pulse"
```

If `bash` is unavailable on Windows, run:

```powershell
python utils\log.py scaffold_checked --note "manual pulse"
python utils\evidence.py --help
python utils\decision.py --help
python utils\archive.py --help
```

## Directory Map

- `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`: role rules for each agent.
- `memory/canonical/`: human-curated project memory. Agents propose changes, humans promote.
- `memory/scratchpads/`: agent-written latest work. Overwrite, do not append.
- `memory/transcripts/`: archived scratchpads.
- `evidence/`: one file per durable finding.
- `decisions/`: full decision records.
- `evals/log.jsonl`: append-only heartbeat log.
- `scripts/`: workflow checklists.
- `utils/`: Python stdlib-only helpers.
- `prompts/`: reusable session prompts.

## Workflows

```bash
make check
make setup
make research A=gemini
make code A=codex
make critique A=gemini
make synthesize A=chatgpt
make curate
```

The scripts do not install packages. They print instructions, verify files, and log events.

## Operating Loop

1. Human chooses one task.
2. Agent reads canonical memory in the required order.
3. Agent writes only its scratchpad.
4. Human reviews and promotes durable findings into canonical memory, evidence, or decisions.
5. Significant actions are logged in `evals/log.jsonl`.

## Current Project Focus

The first research question is whether the AI Club can be run as a self-sustaining, high-accountability building program in 2026-2027 without Reid or Ben becoming the bottleneck.

The current missing source is the AI Club Leadership Google Drive link. Until provided, live Drive documents remain `[UNVERIFIED]`.

