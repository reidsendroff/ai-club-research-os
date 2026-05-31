# Claude Code Prompt — Reid's Path App

Paste this entire prompt into Claude Code to scaffold the project.

---

## Project Brief

Build a personal web application called **Reid's Path** for Reid Sendroff, a 16-year-old competitive programmer and ML researcher targeting a frontier AI lab offer (Anthropic, OpenAI, DeepMind, or equivalent) by June 2028 upon high school graduation.

This app has three purposes:
1. **Accomplishments Timeline** — a living, visual proof-of-work record Reid can share with mentors, researchers, and lab contacts
2. **Goal Backcast Tracker** — the four pillars with progress toward June 2028, milestone checklists, and a live countdown
3. **Decision Filter Tool** — a Claude-powered tool that evaluates "Should I do X?" against Reid's strategic context and gives a direct yes/no recommendation

This is not a generic student portfolio. It is a strategic execution tool optimized for a specific, unusual goal: a direct frontier lab offer at 18 without a college degree.

---

## Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **Anthropic SDK** (for Decision Filter feature)
- **Data layer**: single `src/data/reid-data.json` file — all accomplishments, milestones, and pillar status live here. No database. Editing this one file updates the whole app.
- **Deploy target**: Vercel or GitHub Pages (keep it zero-infrastructure)

---

## Repo Structure

```
reids-path/
├── README.md
├── CLAUDE.md                    # Strategic context — DO NOT DELETE
├── REID_TIMELINE.md             # Chronological record
├── GOALS_BACKCAST.md            # Backward planning from 2028
├── CURRENT_PRIORITIES.md        # Active execution plan
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/
│   │   └── reid-data.json       # Single source of truth for all dynamic data
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Countdown.jsx
│   │   ├── PillarTracker.jsx
│   │   ├── MilestoneChecklist.jsx
│   │   ├── Timeline.jsx
│   │   ├── DecisionFilter.jsx
│   │   └── NavBar.jsx
│   └── styles/
│       └── index.css
├── .env.example
├── package.json
└── vite.config.js
```

---

## Data Schema — `reid-data.json`

```json
{
  "profile": {
    "name": "Reid Sendroff",
    "school": "Northern Highlands Regional High School",
    "graduationYear": 2028,
    "grade": "Sophomore",
    "targetDate": "2028-06-01",
    "targetGoal": "Frontier AI Lab Offer",
    "targetOrgs": ["Anthropic", "OpenAI", "DeepMind", "xAI"],
    "currentRatings": {
      "codeforces": { "rating": 1618, "level": "Expert", "percentile": "Top 6%" },
      "leetcode": { "rating": 1917, "level": "Candidate Master", "percentile": "Top 3.9%" }
    }
  },
  "pillars": [
    {
      "id": "usaaio",
      "name": "USAAIO Camp / Gold Medal",
      "description": "The single highest-leverage competition credential. Gold or Camp selection is the signal frontier labs recognize immediately.",
      "targetYear": 2028,
      "progress": 20,
      "status": "in_progress",
      "milestones": [
        { "id": "r1_2026", "label": "Round 1 Honor Roll (Score 107)", "completed": true, "date": "2026-01" },
        { "id": "r2_2026", "label": "Round 2 at MIT", "completed": false, "date": "2026-04-05", "upcoming": true },
        { "id": "camp_2026", "label": "Camp Selection (Top 12)", "completed": false, "date": "2026-06" },
        { "id": "r1_2027", "label": "Round 1 — Top Score", "completed": false, "date": "2027-01" },
        { "id": "camp_2027", "label": "Camp Selection 2027", "completed": false, "date": "2027-04" },
        { "id": "gold_2028", "label": "Gold Medal", "completed": false, "date": "2028-04" }
      ]
    },
    {
      "id": "codeforces",
      "name": "Codeforces International Master",
      "description": "Top 1–2% of all competitive programmers globally. Combined with USAAIO Camp, this profile is essentially unprecedented at 18.",
      "targetYear": 2028,
      "progress": 35,
      "status": "in_progress",
      "milestones": [
        { "id": "expert", "label": "Expert (1618)", "completed": true, "date": "2025-10" },
        { "id": "candidate_master", "label": "Candidate Master (~1900)", "completed": false, "date": "2026-12" },
        { "id": "master", "label": "Master (~2100)", "completed": false, "date": "2027-06" },
        { "id": "intl_master", "label": "International Master (~2300)", "completed": false, "date": "2028-01" }
      ]
    },
    {
      "id": "research",
      "name": "Published Research with Henstock",
      "description": "The artifact that makes Reid discoverable before any hiring conversation starts. A preprint or paper transforms Reid from impressive applicant to genuine research peer.",
      "targetYear": 2028,
      "progress": 10,
      "status": "in_progress",
      "milestones": [
        { "id": "collab_initiated", "label": "Collaboration initiated with Prof. Henstock", "completed": true, "date": "2026-03" },
        { "id": "project1_received", "label": "Project 1 brief received", "completed": false, "date": "2026-04" },
        { "id": "project1_complete", "label": "Project 1 complete", "completed": false, "date": "2026-08" },
        { "id": "project2_initiated", "label": "Project 2 (GNN/KG) initiated", "completed": false, "date": "2026-09" },
        { "id": "draft_written", "label": "Paper draft written", "completed": false, "date": "2027-09" },
        { "id": "preprint", "label": "arXiv preprint or conference submission", "completed": false, "date": "2028-01" }
      ]
    },
    {
      "id": "visibility",
      "name": "Public Visibility",
      "description": "Labs find candidates. Candidates don't find labs. Reid needs to be findable by the right people before any formal application.",
      "targetYear": 2028,
      "progress": 25,
      "status": "in_progress",
      "milestones": [
        { "id": "linkedin_active", "label": "LinkedIn profile active", "completed": true, "date": "2025-10" },
        { "id": "github_audit", "label": "GitHub audit complete", "completed": false, "date": "2026-04" },
        { "id": "personal_site", "label": "Personal site live", "completed": false, "date": "2026-05" },
        { "id": "research_public", "label": "Research artifact public", "completed": false, "date": "2027-06" },
        { "id": "lab_contact", "label": "Known by name inside at least one frontier lab", "completed": false, "date": "2027-12" }
      ]
    }
  ],
  "accomplishments": [
    {
      "id": "game_dev",
      "date": "2021-01",
      "endDate": "2024-01",
      "category": "projects",
      "title": "Game Development — 5 Unity Games",
      "description": "Developed 5 interactive games in Unity using C#. Explored OOP, physics engines, real-time interactivity, and gameplay mechanics.",
      "tags": ["C#", "Unity", "OOP"],
      "signal": "foundation"
    },
    {
      "id": "honors_math_physics",
      "date": "2024-09",
      "category": "academic",
      "title": "Selected for Honors Math Analysis & AP Physics",
      "description": "Selected as 1 of 14 students for both Honors Math Analysis and AP Physics as a freshman.",
      "tags": ["mathematics", "physics", "academic"],
      "signal": "strong"
    },
    {
      "id": "jhu_cty",
      "date": "2024-06",
      "category": "academic",
      "title": "Johns Hopkins CTY — Data Structures & Algorithms",
      "description": "Completed Data Structures & Algorithms through Johns Hopkins Center for Talented Youth.",
      "tags": ["algorithms", "data structures"],
      "signal": "strong"
    },
    {
      "id": "ai_stock_trading",
      "date": "2025-03",
      "endDate": "2025-05",
      "category": "projects",
      "title": "AI Stock Trading System",
      "description": "Designed AI-powered trading system using ensemble models (Random Forest + XGBoost) with real-time sentiment analysis from financial news via GPT-4. Optimized trading thresholds using gradient descent; visualized backtest results with equity curves.",
      "tags": ["Python", "XGBoost", "GPT-4", "time-series"],
      "signal": "strong"
    },
    {
      "id": "accelerado_intern",
      "date": "2025-06",
      "endDate": "2025-08",
      "category": "experience",
      "title": "Software Engineering Intern — Accelerado.ai",
      "description": "Built NLP pipeline using Whisper (ASR) + GPT-4 API to classify call quality and predict conversion likelihood. Integrated voice analytics for real-time tracking of thousands of client calls daily.",
      "tags": ["NLP", "Whisper", "GPT-4", "microservices"],
      "signal": "strong"
    },
    {
      "id": "ucf_summer",
      "date": "2025-07",
      "category": "competition",
      "title": "UCF Competitive Programming Summer Institute — Silver Medal",
      "description": "2nd Place individually in the final competition. Competed against students entering 11th, 12th grade, and first-year college.",
      "tags": ["competitive programming", "algorithms"],
      "signal": "strong"
    },
    {
      "id": "harvard_e82",
      "date": "2025-09",
      "endDate": "2025-12",
      "category": "academic",
      "title": "Harvard Extension CSCI E-82 — A-, Distinguished Performance",
      "description": "Completed graduate-level Advanced Machine Learning, Data Mining & AI. Instructor: Professor Peter V. Henstock. Grade: A-, Distinguished Performance Recognition. Competed against Master's and PhD students.",
      "tags": ["ML", "deep learning", "Harvard", "graduate-level"],
      "signal": "elite"
    },
    {
      "id": "nba_analytics",
      "date": "2025-09",
      "category": "projects",
      "title": "NBA Player Analytics — PCA, t-SNE, UMAP",
      "description": "Applied PCA, MDS, t-SNE, and UMAP to NBA player performance data to uncover role-based patterns. Compared interpretability and clustering quality across dimensionality reduction techniques.",
      "tags": ["PCA", "t-SNE", "UMAP", "Python"],
      "signal": "strong"
    },
    {
      "id": "codeforces_expert",
      "date": "2025-10",
      "category": "competition",
      "title": "Codeforces Expert — Rating 1618, Top 6% Globally",
      "description": "Reached Expert through consistent performance in international mixed-age competitive programming contests. Notable: Div 2 Round 1052 — Rank 942/50,000 (Top 1.9% globally).",
      "url": "https://codeforces.com/profile/AlgoMaster2024",
      "tags": ["competitive programming", "algorithms"],
      "signal": "elite"
    },
    {
      "id": "leetcode_1917",
      "date": "2025-10",
      "category": "competition",
      "title": "LeetCode Max Rating 1917 — Top 3.9% Globally",
      "description": "Recognized for high performance in algorithmic coding challenges emphasizing efficiency, data structures, and dynamic programming.",
      "url": "https://leetcode.com/u/1Reid/",
      "tags": ["competitive programming", "algorithms"],
      "signal": "strong"
    },
    {
      "id": "kaggle_3rd",
      "date": "2025-10",
      "category": "competition",
      "title": "Kaggle ML Competition — 3rd Place (Harvard Extension)",
      "description": "3rd out of 25 teams in graduate-level ML competition. Built XGBoost + CNN ensemble. Competed against Master's and PhD students while in 10th grade.",
      "tags": ["XGBoost", "CNN", "Kaggle", "ensemble"],
      "signal": "strong"
    },
    {
      "id": "dec_research",
      "date": "2025-10",
      "category": "research",
      "title": "Deep Embedded Clustering Research Extension",
      "description": "Extended DEC framework; compared DEC vs. DCSS vs. R-DEC. Evaluated with normalized mutual information and reconstruction loss. Explored latent space optimization and feature disentanglement.",
      "tags": ["DEC", "unsupervised learning", "representation learning", "Harvard"],
      "signal": "strong"
    },
    {
      "id": "geospatial_clustering",
      "date": "2025-10",
      "category": "research",
      "title": "Density-Based Clustering for Geospatial Analysis",
      "description": "K-Means, DBSCAN, HDBSCAN for urban crime hotspot detection. PAI@5% = 16.23%. 10-minute recorded research presentation (Oct 21, 2025).",
      "tags": ["DBSCAN", "HDBSCAN", "geospatial", "Python"],
      "signal": "strong"
    },
    {
      "id": "neural_net_scratch",
      "date": "2025-10",
      "category": "projects",
      "title": "Neural Network from Scratch — 94% Accuracy",
      "description": "Implemented full forward/backpropagation using only NumPy. No deep learning libraries. 94% test accuracy. Demonstrates strong conceptual understanding of neural network mathematics.",
      "tags": ["NumPy", "backpropagation", "deep learning"],
      "signal": "strong"
    },
    {
      "id": "argumaster",
      "date": "2025-11",
      "category": "projects",
      "title": "ArgueMaster.com — AI Debate Coach",
      "description": "Built real-time AI debate coach using ChatGPT API and ElevenLabs voice synthesis. 10+ persona styles, adjustable difficulty, multi-agent LLM orchestration for counterargument generation and real-time scoring.",
      "tags": ["ChatGPT API", "ElevenLabs", "multi-agent", "deployed"],
      "signal": "strong"
    },
    {
      "id": "calico_silver",
      "date": "2025-11",
      "category": "competition",
      "title": "CALICO — Silver Medal, Top 10.7% (117/1,092 teams)",
      "description": "UC Berkeley open informatics competition. Mixed-age field including collegiate and adult competitors. Solved 9 timed ICPC-style algorithmic problems.",
      "tags": ["competitive programming", "algorithms", "UC Berkeley"],
      "signal": "strong"
    },
    {
      "id": "myclasspal",
      "date": "2025-10",
      "category": "projects",
      "title": "MyClassPal.ai — Founder & Lead Developer",
      "description": "AI-driven study planning platform with Canvas LMS integration, adaptive planning, AI tutoring, mastery mode, confidence-accuracy matrix, AP Exam Mode, and responsible AI guardrails. Submitted to Presidential AI Challenge (Track II).",
      "tags": ["Canvas LMS", "OpenAI API", "React", "production"],
      "signal": "strong"
    },
    {
      "id": "ucf_div1",
      "date": "2025-12",
      "category": "competition",
      "title": "UCF Division 1 Programming Contest — 8th Place",
      "description": "8th of ~90 participants in top competitive division. Solved 7 university-level algorithmic problems. Top 10% as a 10th grader.",
      "tags": ["competitive programming", "algorithms", "UCF"],
      "signal": "strong"
    },
    {
      "id": "ap_physics_5",
      "date": "2025-05",
      "category": "academic",
      "title": "AP Physics — Score 5",
      "description": "Perfect score on AP Physics. Selected as 1 of 14 students for the course as a freshman.",
      "tags": ["physics", "AP", "academic"],
      "signal": "strong"
    },
    {
      "id": "psat_math_perfect",
      "date": "2025-10",
      "category": "academic",
      "title": "PSAT Math — 760/760 (Perfect Score)",
      "description": "Perfect score on PSAT Math section.",
      "tags": ["mathematics", "standardized testing"],
      "signal": "strong"
    },
    {
      "id": "wifi_forecasting",
      "date": "2025-09",
      "category": "research",
      "title": "WiFi Demand Forecasting — Cisco Collaboration",
      "description": "Co-developed time-series forecasting system with Cisco industry collaborator. ~10 years of WiFi sales data. Predicted WiFi 6/6E/7 demand 6 months ahead. Hybrid SARIMA + Random Forest with Bayesian optimization (Optuna). ~92% accuracy, MAPE ~8%.",
      "tags": ["time-series", "SARIMA", "Random Forest", "Optuna", "Cisco"],
      "signal": "elite"
    },
    {
      "id": "usaaio_honor_roll",
      "date": "2026-01",
      "category": "competition",
      "title": "USAAIO 2026 — Honor Roll, Round 2 Qualifier",
      "description": "Score 107 (national cutoff: 98). Qualified for Round 2 at MIT (April 4–5, 2026). Demonstrated strength in AI theory, ML, probabilistic modeling, and algorithmic reasoning.",
      "tags": ["USAAIO", "AI Olympiad", "MIT"],
      "signal": "elite"
    },
    {
      "id": "henstock_collab",
      "date": "2026-03",
      "category": "research",
      "title": "Research Collaboration — Professor Peter V. Henstock",
      "description": "Active research collaboration with Prof. Henstock (Incyte ML Group Leader, Harvard Lecturer, former Pfizer ML/AI Lead, PhD in AI). Two projects: (1) spatio-temporal clustering for clinical trials, (2) GNN/knowledge graph on clinical trials database.",
      "tags": ["GNN", "knowledge graphs", "clinical trials", "research"],
      "signal": "elite"
    }
  ],
  "currentFocus": [
    "USAAIO Round 2 at MIT — April 4–5, 2026",
    "Henstock Project 1 — spatio-temporal clustering (arriving soon)",
    "Close transformer derivation gaps for gold-level performance",
    "GitHub audit and personal site launch",
    "Junior year course swap — replace Spanish with deep learning course"
  ],
  "mentors": [
    {
      "name": "Professor Peter V. Henstock",
      "role": "Research Collaborator",
      "context": "Incyte ML Group Leader; Harvard Lecturer (14+ years); former Pfizer ML/AI Lead; PhD in AI; top 5 pharma AI leader in US. Also taught Reid's Harvard E-82 course."
    },
    {
      "name": "Philip Greenspun",
      "role": "MIT Alum, Potential Mentor",
      "context": "Connection facilitated by Scott Brazina."
    },
    {
      "name": "Scott Brazina",
      "role": "MIT Connector",
      "context": "MIT alum with strong recommendation track record. Key network connector."
    },
    {
      "name": "Top 10 U.S. Codeforces Competitor",
      "role": "Competitive Programming Coach",
      "context": "Coaching Reid toward International Master."
    }
  ]
}
```

---

## Component Specs

### `Countdown.jsx`
- Large, prominent countdown to June 1, 2028
- Show: days remaining, percentage of time elapsed since January 2024 (when Reid started building seriously)
- Tone: focused urgency, not anxiety. Think mission control, not doomsday.

### `PillarTracker.jsx`
- Four pillar cards, each showing:
  - Name and description
  - Progress bar (0–100%)
  - Status badge: Not Started / In Progress / Complete
  - Expandable milestone checklist with completion checkboxes
  - Next upcoming milestone highlighted
- Color coding: use a dark, focused palette. Not playful. This is a mission dashboard.

### `Timeline.jsx`
- Vertical timeline, chronological, filterable by category:
  - All / Academic / Competition / Projects / Research / Experience
- Each entry shows: date, title, description, signal badge (Foundation / Strong / Elite)
- Elite signal items visually distinguished (border accent, badge)
- Clicking an entry expands the full description

### `DecisionFilter.jsx`
- Text input: "Should I do X?"
- On submit: calls Anthropic API with CLAUDE.md as system prompt context
- Returns: YES / NO / CONDITIONAL with 2–3 sentence reasoning grounded in the four pillars
- Show which pillar(s) the activity does or doesn't compound toward
- Rate limit: basic debounce, no need for auth

### `Header.jsx`
- Name, current grade, target goal, target date
- Current ratings: Codeforces Expert 1618, LeetCode 1917
- Links: GitHub, LinkedIn, Codeforces profile

### `NavBar.jsx`
- Four sections: Overview / Timeline / Pillars / Decision Filter
- Sticky top nav

---

## Design Direction

- **Dark mode only** — this is a technical mission dashboard, not a student portfolio
- **Color palette**: dark background (#0a0a0f), accent color deep blue/indigo (#6366f1), success green (#22c55e), warning amber (#f59e0b)
- **Typography**: monospace for ratings and numbers, clean sans-serif for text
- **Tone**: focused, serious, mission-oriented. Think: a researcher's working environment, not a college application website
- **No stock photos, no generic icons** — data and text only
- **Density**: information-dense but not cluttered. Every element earns its space.

---

## Environment Variables

```
VITE_ANTHROPIC_API_KEY=your_key_here
```

Note: For the Decision Filter, the API key is used client-side via Vite. This is acceptable for a personal tool — add a note in README that this should not be deployed publicly without a backend proxy.

---

## System Prompt for Decision Filter (use verbatim)

```
You are Reid's Path strategic advisor. Reid Sendroff is a 16-year-old competitive programmer and ML researcher targeting a direct offer from a Tier-1 frontier AI lab (Anthropic, OpenAI, DeepMind, or xAI) by June 2028, upon high school graduation at age 18.

His strategy centers on four pillars:
1. USAAIO Camp / Gold Medal — the highest-leverage competition credential for this goal
2. Codeforces International Master — top 1-2% globally, unprecedented at 18 combined with USAAIO Camp
3. Published research with Professor Peter Henstock — clinical AI, GNNs, spatio-temporal clustering
4. Public visibility — GitHub, personal site, research artifacts, lab network

The window argument: entering the workforce in 2028 vs. 2032 is the decisive variable. Entry-level and mid-level technical roles are compressing rapidly. The people who will have irreplaceable context are those who got inside frontier labs during 2025–2029, not those who arrived with a degree in 2032.

When evaluating any activity, apply these filters:
- Does this compound toward one of the four pillars?
- Does this build rare, measurable skill?
- Does this increase Reid's visibility to people inside frontier labs?
- Is it better than the next-best use of the same time?
- Would a frontier lab technical evaluator — not a college admissions reader — find this impressive?

Respond with:
- A clear YES, NO, or CONDITIONAL
- 2–3 sentences of direct reasoning
- Which pillar(s) this does or doesn't compound toward
- If CONDITIONAL, state exactly what would make it worth doing

Be direct. Do not hedge. Do not optimize for college admissions optics. Optimize for the 2028 lab offer.
```

---

## README Instructions to Include

- How to clone and run locally
- How to update `reid-data.json` to log new accomplishments and update milestone status
- How to set the Anthropic API key for the Decision Filter
- Note about not deploying publicly with client-side API key
- How to deploy to Vercel (one command)

---

## Build Order

Build in this sequence:

1. Scaffold repo with Vite + React + Tailwind
2. Create `reid-data.json` with all data above
3. Build `Header` and `NavBar`
4. Build `Countdown`
5. Build `PillarTracker` with milestone checklists
6. Build `Timeline` with category filter
7. Build `DecisionFilter` with Anthropic API integration
8. Wire everything together in `App.jsx`
9. Polish dark mode styling
10. Write `README.md`

Do not add features beyond this spec. Keep it lean, fast, and maintainable by a single person editing one JSON file.
