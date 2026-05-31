# AI CLUB RESEARCH-OS PROJECT BOOTSTRAP SUPER PROMPT

> Paste this into a fresh agent session when bootstrapping or repairing the AI Club research-os. This is the AI Club-specific execution prompt derived from the universal research-os pattern.

## PART 0 - What this is

research-os is a human-in-the-loop AI research-and-coding operating system. A human orchestrator coordinates specialist CLI agents through durable Markdown memory, evidence-backed decisions, and workflow scripts.

Non-negotiables:

1. The human is the orchestrator. No agent autonomously invokes another agent.
2. Durable artifacts beat live conversations.
3. Evidence beats consensus.
4. Human curation beats autonomous memory mutation.
5. Scratchpads are agent-written. `memory/canonical/` is human-curated.

Anti-scope: no RAG, vector DB, embeddings layer, orchestration framework, RL, fine-tuning, learned routing, custom server, webhook dispatcher, or API-key-required setup.

## PART 1 - Intake

PROJECT_NAME: ai-club-research-os

DOMAIN: Northern Highlands AI Club operations, leadership accountability, project-team execution, communications, competitions, and succession.

HUMAN_ORCHESTRATOR: David Sendroff / Reid Sendroff context owner and strategic operator [UNVERIFIED].

SUPERVISOR/STAKEHOLDER: Reid Sendroff and Ben Shamosh, AI Club Co-Presidents; Mr. Michael Novak, Faculty Advisor.

REPO_PATH: C:/Projects/AI_Club_Brain/research-os

ONE_SENTENCE_OBJECTIVE: Build a research-agent operating system that helps the AI Club become a self-sustaining, evidence-backed, high-accountability technical building program for 2026-2027.

CENTRAL_QUESTION: Can the AI Club operate at a high level without Reid or Ben being the bottleneck, while preserving fairness, technical seriousness, and administrator trust?

HYPOTHESIS/MECHANISM: Explicit role ownership, artifact-based accountability, bi-weekly scrums, project teams, open lab access, funding workflows, competition deadlines, and durable memory reduce bottleneck risk because the system carries context.

SUCCESS_CRITERIA:

- Canonical memory captures the active club operating model.
- Recommendations cite evidence or are tagged `[UNVERIFIED]`.
- Leadership accountability becomes student-safe operating policy.
- Project-team feasibility is evaluated with owners, dates, and artifacts.
- Agent scratchpads can be curated into evidence and decisions.

PRIMARY_DELIVERABLE: A usable `research-os` scaffold for AI Club strategy, policy, meeting planning, communications, and evidence-backed operating decisions.

INPUTS/DATA_SOURCES:

- `C:/Projects/AI_Club_Brain/AI_Club_OS/*.md`
- `C:/Projects/AI_Club_Brain/AI_Club_Docs/*.md`
- `C:/Projects/AI_Club_Brain/reids-path/AI_Club.md`
- `C:/Projects/AI_Club_Brain/reids-path/CLAUDE.md`
- `C:/Projects/AI_Club_Brain/reids-path/MEGA_CONTEXT.md`
- `C:/Projects/AI_Club_Brain/AI_Club_Strategic_Plan_2026.docx`
- `C:/Projects/AI_Club_Brain/AI_Club_June1_Meeting_Plan.docx`
- AI Club Leadership Google Drive link [UNVERIFIED].

PRIOR_ART/BENCHMARK: Existing AI Club OS and Strategic Plan. Benchmark: the club works if at least 3 teams submit to national competitions, Room 133 open lab is active, the announcement system runs every meeting, succession works, and Reid/Ben can miss meetings without quality collapse.

CANONICAL_KEY: `artifact_id`

HARD_CONSTRAINTS: school context, student privacy, advisor approval, no unsourced current claims, no autonomous agent orchestration, no secret handling.

KNOWN_RISKS: missing Drive context, policy spread across too many files, over-documentation without live execution, current deadlines changing, accountability language becoming too corporate.

AGENTS_AVAILABLE: claude, codex, gemini, chatgpt [UNVERIFIED authentication].

TIME_BUDGET: part-time through summer 2026 and 2026-2027 school year.

## PART 2 - Agent Contract

You are a specialist, not the orchestrator. You may propose another agent and stop. You never call it. You never write to `memory/canonical/`; propose changes in your scratchpad. Never commit, push, install, or contact external services without explicit instruction.

## PART 3 - Scaffold

Create the standard research-os structure at `REPO_PATH`: `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `README.md`, `Makefile`, `.env.example`, `memory/canonical/*.md`, `memory/scratchpads/`, `memory/transcripts/`, `evidence/`, `decisions/`, `evals/log.jsonl`, `scripts/*.sh`, `utils/*.py`, and `prompts/project_bootstrap_superprompt.md`.

Instruction files must be 500 words or fewer.

## PART 4 - Evidence Discipline

Every non-trivial factual claim carries one tag: `[src: evidence/...md]`, `[PRIOR]`, `[INFERENCE]`, or `[UNVERIFIED]`. When unsure, write `[UNVERIFIED]`.

## PART 5 - Feasibility-first Method

Before building dashboards or automation:

1. Define the task precisely.
2. Acquire inputs.
3. Build the canonical record table.
4. Define target answer.
5. Measure coverage and missingness.
6. Write feasibility report first.

## PART 6 - Session Protocol

Read in order: `00_project_brief`, `01_current_state`, `04_next_actions`, `05_constraints`. Conditionally read decisions, questions, and glossary. Write to `memory/scratchpads/<agent>_latest.md` using:

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

## PART 7 - Execute Now

Scaffold idempotently. Seed canonical memory from the intake. Write evidence files for local source inventory, self-sustaining plan, and leadership-accountability audit. Create a first Codex scratchpad with the feasibility plan. Run checks. Log `scaffold_complete`. End with intake echo, scaffold summary, verification, feasibility plan, seeded questions, risks, and human next step.

