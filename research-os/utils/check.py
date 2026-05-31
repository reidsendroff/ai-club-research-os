#!/usr/bin/env python3
import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path


REQUIRED = [
    "CLAUDE.md",
    "AGENTS.md",
    "GEMINI.md",
    "README.md",
    "Makefile",
    ".env.example",
    "memory/canonical/00_project_brief.md",
    "memory/canonical/01_current_state.md",
    "memory/canonical/02_decisions.md",
    "memory/canonical/03_open_questions.md",
    "memory/canonical/04_next_actions.md",
    "memory/canonical/05_constraints.md",
    "memory/canonical/06_glossary.md",
    "evals/log.jsonl",
    "utils/log.py",
    "utils/evidence.py",
    "utils/decision.py",
    "utils/archive.py",
    "prompts/project_bootstrap_superprompt.md",
]


def word_count(path):
    text = path.read_text(encoding="utf-8")
    return len(re.findall(r"\b\S+\b", text))


def main():
    parser = argparse.ArgumentParser(description="Verify required research-os files without installing anything.")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[1]
    missing = [p for p in REQUIRED if not (root / p).exists()]
    counts = {name: word_count(root / name) for name in ["CLAUDE.md", "AGENTS.md", "GEMINI.md"]}
    too_long = {name: count for name, count in counts.items() if count > 500}

    log_path = root / "evals" / "log.jsonl"
    if log_path.exists():
        with log_path.open(encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    json.loads(line)

    result = {
        "missing": missing,
        "instruction_word_counts": counts,
        "jsonl_ok": True,
    }
    print(json.dumps(result, indent=2, sort_keys=True))

    if args.dry_run:
        return

    record = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "event": "python_check_run",
        "agent": "codex",
        "note": "utils/check.py completed",
    }
    with log_path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, sort_keys=True) + "\n")

    if missing or too_long:
        raise SystemExit(1)


if __name__ == "__main__":
    main()

