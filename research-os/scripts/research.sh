#!/usr/bin/env bash
set -euo pipefail

AGENT="gemini"
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --help) echo "Usage: bash scripts/research.sh [--agent NAME] [--dry-run]"; exit 0 ;;
    --agent) AGENT="$2"; shift 2 ;;
    --dry-run) DRY_RUN=1; shift ;;
    *) echo "Unknown arg: $1" >&2; exit 2 ;;
  esac
done

echo "Research workflow for agent: $AGENT"
echo "Read canonical memory, inspect evidence gaps, write memory/scratchpads/${AGENT}_latest.md."
[[ "$DRY_RUN" == "1" ]] && exit 0
python "$(dirname "$0")/../utils/log.py" research_workflow --agent "$AGENT" --note "research checklist printed" >/dev/null

