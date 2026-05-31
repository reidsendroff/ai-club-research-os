#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" ]]; then
  echo "Usage: bash scripts/check.sh"
  echo "Verifies required research-os files. Installs nothing."
  exit 0
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

required=(
  "CLAUDE.md"
  "AGENTS.md"
  "GEMINI.md"
  "README.md"
  "Makefile"
  ".env.example"
  "memory/canonical/00_project_brief.md"
  "memory/canonical/01_current_state.md"
  "memory/canonical/02_decisions.md"
  "memory/canonical/03_open_questions.md"
  "memory/canonical/04_next_actions.md"
  "memory/canonical/05_constraints.md"
  "memory/canonical/06_glossary.md"
  "evals/log.jsonl"
  "utils/log.py"
  "utils/evidence.py"
  "utils/decision.py"
  "utils/archive.py"
)

missing=0
for f in "${required[@]}"; do
  if [[ ! -e "$f" ]]; then
    echo "MISSING: $f"
    missing=1
  fi
done

python utils/log.py check_run --note "check.sh completed" >/dev/null

if [[ "$missing" -ne 0 ]]; then
  exit 1
fi

echo "research-os check passed"

