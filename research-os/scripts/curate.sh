#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" ]]; then
  echo "Usage: bash scripts/curate.sh [--dry-run]"
  echo "Prints human curation checklist. Does not mutate canonical memory."
  exit 0
fi

echo "Human curation checklist:"
echo "1. Review latest scratchpad."
echo "2. Promote durable findings into evidence/."
echo "3. Promote accepted process changes into decisions/."
echo "4. Update canonical memory manually."
echo "5. Keep 04_next_actions to 10 items or fewer."

if [[ "${1:-}" != "--dry-run" ]]; then
  python "$(dirname "$0")/../utils/log.py" curate_checklist --note "curation checklist printed" >/dev/null
fi

