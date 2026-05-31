#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" ]]; then
  echo "Usage: bash scripts/setup.sh"
  echo "Prints manual setup instructions. Installs nothing."
  exit 0
fi

cat <<'EOF'
Manual setup:
1. Copy .env.example to .env if local paths need overrides.
2. Authenticate desired CLI agents outside this scaffold.
3. Provide or waive the AI Club Leadership Google Drive link.
4. Run: bash scripts/check.sh
EOF

python "$(dirname "$0")/../utils/log.py" setup_instructions_printed --note "setup.sh completed" >/dev/null

