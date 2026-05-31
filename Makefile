PYTHON ?= python
A ?= codex

.PHONY: check setup research code critique synthesize curate archive

check:
	bash scripts/check.sh

setup:
	bash scripts/setup.sh

research:
	bash scripts/research.sh --agent "$(A)"

code:
	bash scripts/code.sh --agent "$(A)"

critique:
	bash scripts/critique.sh --agent "$(A)"

synthesize:
	bash scripts/synthesize.sh --agent "$(A)"

curate:
	bash scripts/curate.sh

archive:
	$(PYTHON) utils/archive.py --days 14

