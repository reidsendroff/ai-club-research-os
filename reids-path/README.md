# Reid's Path — Strategic Execution Dashboard

A personal web application for Reid Sendroff, a 16-year-old competitive programmer and ML researcher targeting a frontier AI lab offer (Anthropic, OpenAI, DeepMind, or equivalent) by June 2028 upon high school graduation.

## Three Purposes

1. **Accomplishments Timeline** — a living, visual proof-of-work record to share with mentors, researchers, and lab contacts
2. **Goal Backcast Tracker** — four pillars with progress toward June 2028, milestone checklists, and a live countdown
3. **Decision Filter** — a Claude-powered tool that evaluates "Should I do X?" against strategic context and gives a direct recommendation

## Quick Start

```bash
# Clone and install
git clone https://github.com/reidsendroff/reids-path.git
cd reids-path
npm install

# Run locally
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Updating Data

All dynamic content lives in a single file: **`src/data/reid-data.json`**

To log a new accomplishment, add an entry to the `accomplishments` array:

```json
{
  "id": "unique_id",
  "date": "2026-04",
  "category": "competition",
  "title": "Your Accomplishment Title",
  "description": "Details about what happened.",
  "tags": ["tag1", "tag2"],
  "signal": "strong"
}
```

Signal levels: `"foundation"`, `"strong"`, `"elite"`

Categories: `"academic"`, `"competition"`, `"projects"`, `"research"`, `"experience"`

To update milestone status, find the milestone in the `pillars` array and set `"completed": true`.

To update Codeforces/LeetCode ratings, edit `profile.currentRatings`.

## Decision Filter Setup

The Decision Filter uses the Anthropic API to evaluate activities against the four pillars.

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Anthropic API key:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-...
   ```

3. Restart the dev server.

> **Warning:** The API key is used client-side. Do not deploy this publicly without adding a backend proxy. This is a personal tool.

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set the `VITE_ANTHROPIC_API_KEY` environment variable in Vercel's project settings.

## Tech Stack

- React (Vite)
- Tailwind CSS v4
- Anthropic SDK (Decision Filter)
- Zero infrastructure — single JSON data file, no database

## File Structure

```
reids-path/
├── CLAUDE.md                    # Strategic context
├── REID_TIMELINE.md             # Chronological record
├── GOALS_BACKCAST.md            # Backward planning from 2028
├── CURRENT_PRIORITIES.md        # Active execution plan
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   └── reid-data.json       # Single source of truth
│   └── components/
│       ├── Header.jsx
│       ├── NavBar.jsx
│       ├── Countdown.jsx
│       ├── PillarTracker.jsx
│       ├── Timeline.jsx
│       └── DecisionFilter.jsx
├── .env.example
├── package.json
└── vite.config.js
```
