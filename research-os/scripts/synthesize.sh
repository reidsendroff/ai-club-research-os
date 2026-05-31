#!/usr/bin/env bash
set -euo pipefail

AGENT="chatgpt"
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --help) echo "Usage: bash scripts/synthesize.sh [--agent NAME] [--dry-run]"; exit 0 ;;
    --agent) AGENT="$2"; shift 2 ;;
    --dry-run) DRY_RUN=1; shift ;;
    *) echo "Unknown arg: $1" >&2; exit 2 ;;
  esac
done

echo "Synthesis workflow for agent: $AGENT"
echo "Turn evidence and scratchpad findings into a clear draft for human review."
[[ "$DRY_RUN" == "1" ]] && exit 0
python "$(dirname "$0")/../utils/log.py" synthesize_workflow --agent "$AGENT" --note "synthesis checklist printed" >/dev/null

