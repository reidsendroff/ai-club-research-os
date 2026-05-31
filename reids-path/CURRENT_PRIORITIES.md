# CURRENT_PRIORITIES.md — Active Execution Plan

This file contains Reid's ranked priorities right now, organized by time horizon. It is the working document — the thing to open when deciding how to spend the next hour, week, or month. It should be updated after every major milestone or decision.

**Current date: March 2026**
**Reid's grade: Sophomore**
**Days until USAAIO Round 2: ~28 (April 4–5, 2026)**

---

## The One Filter

Before adding anything to Reid's plate, ask:

> Does this compound toward one of the four pillars — USAAIO gold, Codeforces International Master, Henstock publication, or public visibility?

If no: it doesn't belong here.

---

## Tier 1 — Critical Path (Non-Negotiable Right Now)

These are the two things that matter most in the next 30 days. Everything else bends around them.

### 1. USAAIO Round 2 — April 4–5 at MIT
**Status: 28 days out**
**Target outcome: Medal; Camp qualification (top 12)**

What to do between now and April 4:
- **Transformers**: Be able to derive multi-head attention from scratch. Implement a transformer encoder in PyTorch without reference. Understand positional encoding, layer norm, residual connections — why each exists.
- **Generative AI**: Know VAEs, GANs, and diffusion models at derivation level, not just usage. Understand the ELBO, the discriminator/generator dynamic, the denoising score matching objective.
- **Backpropagation**: Be able to derive gradients by hand for any standard architecture — MLP, CNN, attention layer. This is tested explicitly.
- **GPU problems**: Round 2 allows GPU use. Practice running PyTorch training loops efficiently on GPU. Know how to debug shape errors fast.
- **Past problems**: Work through the 2025 Round 2 problems at forum.beaver-edge.ai. Time yourself. Identify failure modes.
- **Do not cram breadth** — Close the depth gaps on transformers and generative AI. Those are the gold-level differentiators.

What to do at Round 2:
- Perform. Treat every problem as consequential.
- Make connections. The top 12 students in this room are future colleagues. USAAIO Camp peers have direct pipelines into frontier labs.
- If Camp is offered: accept. Rearrange everything else around it.

---

### 2. Henstock Project 1 — Spatio-Temporal Clustering
**Status: Arriving within weeks**
**Target outcome: Deliver high-quality first work product; establish professional credibility**

What to do now (before it arrives):
- Review spatio-temporal clustering methods: DBSCAN/HDBSCAN on spatial data, temporal clustering approaches, visualization libraries (Plotly, Kepler.gl, Folium)
- Review clinicaltrials.gov data structure — understand what the underlying data looks like
- Be ready to move immediately when the project brief arrives — don't let it sit

What to do when it arrives:
- Read the brief carefully. Ask one or two clarifying questions if needed — not ten.
- Deliver more than expected. Show research taste: don't just run the algorithm, interpret what the clusters mean clinically.
- Communicate progress proactively — don't wait to be asked for an update.
- Document everything cleanly. This work may become public.

What NOT to do:
- Don't treat this as a homework assignment with a deadline.
- Don't disappear for two weeks then submit a rushed result.
- Don't forget that Henstock already knows Reid's ceiling from E-82. The bar is set high.

---

## Tier 2 — High Priority (This Month / This Semester)

These matter a lot but don't compete with Tier 1 right now.

### 3. GitHub Audit and Public Profile
**Status: Not started**
**Target: Complete by end of April 2026**

- Audit all existing projects: WiFi forecasting, ArgueMaster, MyClassPal, Harvard coursework projects, clustering work
- For each: clean up the README, ensure code is documented, push to public GitHub
- Create a personal site (simple is fine — trajectory-focused, not resume-formatted)
- The site should lead with: research interests, Henstock collaboration, USAAIO, Codeforces rating
- Do not make it look like a college application. Make it look like a researcher's profile.

### 4. Junior Year Course Decision
**Status: DECIDED — Proof-based Linear Algebra**
**Target: Enroll by April/May 2026**

Decision: Replace Spanish (Year 3) with **proof-based Linear Algebra** (abstract vector spaces, linear maps, eigentheory with proofs — NOT the applied/computational version).

**Why Linear Algebra over the other options:**
- It is the mathematical substrate under everything Reid needs: transformers (attention is matrix operations), GNNs (adjacency matrices, spectral methods), diffusion models (covariance), PCA
- USAAIO explicitly tests linear algebra at gold level
- Makes Henstock Project 2 (GNNs/spectral graph theory) dramatically more tractable
- Unlocks Real Analysis and measure-theoretic Probability Theory as future courses — those require proof-based LA as prerequisite
- A proof-based LA course is a genuine signal of mathematical maturity to any frontier lab evaluator

**Where to take it (evaluate in priority order):**
- Harvard Extension — builds the transcript relationship
- MIT OCW 18.700 (Linear Algebra) — the proof-based version, not 18.06
- Local university dual-enrollment — if a proof-based section is available

**Key qualifier:** Must be proof-based (vector spaces, linear maps, proofs), not applied/computational (solving systems with MATLAB).

**Other courses ranked for future reference:**
1. ~~Linear Algebra (proof-based)~~ — **SELECTED**
2. Graph Theory — strong #2, direct Henstock/CF overlap, consider for senior year
3. Real Analysis — gateway to measure theory, take after LA
4. Probability Theory (measure-theoretic) — requires Real Analysis first
5. Algorithms & Complexity (graduate level) — least marginal value given CF coach

---

## Tier 3 — Important But Not Urgent (This Summer / Next 6 Months)

These need to happen but can wait until after Round 2 and Project 1 are addressed.

### 5. Codeforces Rating Progress
**Current: Expert (1618) | Next target: Candidate Master (~1900)**
- Profile: https://codeforces.com/profile/AlgoMaster2024
- LeetCode: https://leetcode.com/u/1Reid/ (Max Rating 1917, Top 3.9%)
- Continue regular contest participation (2–3 per month minimum)
- Use Top 10 U.S. coach sessions to target algorithmic gaps, not just contest review
- Focus areas: graph theory, advanced DP, segment tree applications — overlap with Henstock Project 2 (GNNs)
- Track rating weekly; if stagnating, bring to coach for diagnosis

### 6. Henstock Project 2 — GNN / Knowledge Graph
**Status: Not started; arriving after Project 1**
**Target: Initiated by Summer 2026**

Prerequisites to build before it starts:
- GNN fundamentals: message passing, graph convolution, GraphSAGE, GAT
- Neo4j basics: Cypher queries, graph data model
- Knowledge graph concepts: entities, relations, triple stores, Open Targets data structure
- PyTorch Geometric: the primary GNN library; know the basics before the project arrives

This is the project most likely to produce a publication. Invest in the prerequisites now so execution isn't blocked by basics when the work begins.

### 7. Network Activation — Philip Greenspun and Scott Brazina
**Status: Connection exists; not yet activated toward a specific goal**
**Target: At least one substantive exchange by Summer 2026**

- Share USAAIO Round 2 result with Scott Brazina after April — keep him updated on milestones
- If Camp is selected, that is the moment to ask Scott for a warm introduction to Philip Greenspun for a formal conversation
- If not selected, still update Scott; continue building the relationship toward junior year
- Philip Greenspun: MIT alum, strong MIT recommendation track record — relationship is most valuable for MIT application and for MIT network that leads to lab connections

---

## What to Cut / Deprioritize

These are explicitly low-priority given the current phase:

- **Spanish Year 3** — Cut. The time is worth more elsewhere.
- **Generic hackathons or coding competitions** without selective signal — Low ROI unless adding to the competitive programming track or producing a real artifact
- **Any new project that isn't Henstock** — Reid does not need more projects right now. He needs to execute the ones he has with exceptional depth.
- **MyClassPal maintenance beyond what's already committed** — Preserve time for Henstock and Round 2 prep. MyClassPal is a strong existing signal; the Presidential AI Challenge submission is done. The Congressional App Challenge submission is a reasonable next milestone but should not crowd out Pillar work. Additional feature work beyond that has diminishing returns unless heading toward a publication or major user milestone.
- **Extracurricular additions of any kind** — The profile is not thin. The bottleneck is depth and execution, not breadth.

## The Four Active Risks — Watch These

**Risk 1: Too Many Good Things, Not Enough Great Things**
Reid's biggest risk is not weakness — it is diffusion. Eight 7/10 signals lose to two 10/10 signals in a frontier lab evaluation. The four pillars exist to force this discipline.

**Risk 2: Polished Projects That Aren't Actually Differentiated**
A project can look impressive and still be interchangeable with dozens of other student projects. The test is: would this survive scrutiny from a Henstock or an Anthropic researcher? If not, it doesn't move the needle.

**Risk 3: Leadership Becoming Administration**
CS Club and AI Club are valuable when they reinforce Reid's technical identity and produce real output. They become low-ROI when they turn into event planning and headcount management. Keep both technically substantive or reduce time investment.

**Risk 4: School Consuming Deep-Work Time**
Academic excellence is necessary but should not crowd out the work that creates rarity. Maintain high performance efficiently — perfectionism beyond a threshold steals time from higher-leverage technical work.

---

## Weekly Execution Template

A rough structure to protect the priorities:

| Block | Focus |
|-------|-------|
| Weekdays (after school, 1–2 hrs) | Alternate: USAAIO prep (pre-April) / Henstock project (post-arrival) / Codeforces problems |
| Saturday (2–3 hrs) | Deep work: transformer derivation, GNN study, or Henstock project |
| Sunday (1 hr) | Codeforces contest (participate live) or review; GitHub/profile maintenance |

After Round 2 (April 5+), restructure:
- Shift USAAIO prep time to Henstock Project 1 execution
- Add 30 min/week to GNN prerequisites (toward Project 2)
- Begin GitHub audit and personal site

**Summer 2026 Plan (do NOT add a formal class — risk of diffusion):**
1. Henstock Project 1 — full attention, professional delivery (this IS the AI/ML learning)
2. Competitive programming — CF contests + coach sessions toward Candidate Master
3. SAT English prep — necessary, time-boxed
4. Self-study — transformer derivation and generative AI depth for next USAAIO cycle
5. If time opens up: PyTorch Geometric basics as prep for Henstock Project 2

---

## Decision Log

Use this section to record major decisions and the reasoning behind them. Useful for maintaining consistency over time.

| Date | Decision | Reasoning |
|------|----------|-----------|
| March 2026 | Initiated Henstock collaboration | Highest-leverage professional relationship; directly supports Pillar 3 |
| March 2026 | Primary goal set as 2028 lab offer over MIT | Window argument: 2028 vs 2032 timing is decisive; same preparation required for both paths |
| March 2026 | Spanish deprioritized beyond Year 2 | Zero ROI for any evaluator that matters; time worth more on technical depth |
| March 2026 | Junior year course: Proof-based Linear Algebra | Replaces Spanish. Substrate under transformers, GNNs, diffusion models. Unlocks Real Analysis and measure-theoretic Probability later. USAAIO gold-level tested. Highest-leverage math course for all four pillars. |
| March 2026 | Summer 2026: No formal class | Henstock research + CF contests + SAT English + transformer self-study. Adding a class risks diffusion — Henstock project IS the AI/ML learning. |

---

## Milestone Tracker

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| USAAIO Round 2 at MIT | April 4–5, 2026 | Upcoming |
| USAAIO Camp selection | Spring 2026 | Pending Round 2 |
| Henstock Project 1 initiated | April–May 2026 | Awaiting brief |
| GitHub audit complete | April 2026 | Not started |
| Personal site live | April–May 2026 | Not started |
| Junior year course selected | April–May 2026 | **Decided: Proof-based Linear Algebra** |
| Codeforces Candidate Master | Late 2026 | In progress (1618) |
| Henstock Project 1 complete | Summer 2026 | Not started |
| Henstock Project 2 initiated | Summer 2026 | Not started |
| USAAIO 2027 Camp | Spring 2027 | Future |
| Codeforces Master | Mid 2027 | Future |
| Henstock preprint submitted | Early 2028 | Future |
| Codeforces International Master | Late 2027–Early 2028 | Future |
| USAAIO Gold Medal | 2028 | Future |
| Frontier lab offer | June 2028 | North star |

---

## Update Rule

Update this file:
- After every major competition result
- When a Henstock project phase completes
- When a course or schedule decision is finalized
- When a new high-leverage opportunity appears
- At the start of each semester to reset priorities

When updating: check that Tier 1 items are still the right Tier 1 items. Ruthlessly reassign or cut anything that no longer clears the filter.

---

*Last updated: March 2026*
*Maintained by: David Sendroff*
