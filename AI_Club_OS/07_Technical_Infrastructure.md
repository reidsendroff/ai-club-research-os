# 07 — Technical Infrastructure

---

## Overview

The club's technical infrastructure is the foundation everything else is built on. Without GitHub, without a terminal, without API access, we are a discussion club — not a building club. Getting and maintaining access to the right tools is a leadership responsibility, not an afterthought.

---

## The GitHub Organization

Every project team works inside the club's GitHub organization. Personal repos are fine for experiments. Anything the club competes with, presents publicly, or maintains across graduating classes lives in the org.

**Organization name:** `nhregional-aiclub` (or current name — verify with Co-Presidents)

**Access levels:**
- Co-Presidents: Owner
- All Officers: Maintainer
- Project Team Leads: Write access to their team's repos
- General Members: Write access to their team's repos only
- Alumni: Read access (on request)

**Rules:**
- No API keys, credentials, or tokens in any repo — ever. Use `.env` files and add them to `.gitignore`.
- Every team repo needs a README that explains what the project does and how to run it.
- When a member graduates, their team's repos stay in the org. Credentials get rotated.

---

## Tool Access by Tier

### Tier 1 — Cannot Build Without These
These are the first access requests submitted to administration every September. Non-negotiable.

| Tool | Why | Status to Confirm Annually |
|---|---|---|
| GitHub (github.com) | Version control, code collaboration, competition submissions | Request unblock on school network |
| VS Code in browser (vscode.dev) | Development environment, no install required | Request unblock on school devices |
| Terminal / Shell Access | Run Node.js, Python, any backend code | Request on Room 133 PCs specifically |
| Node.js + npm | JavaScript and TypeScript development | Install on Room 133 PCs |
| Python 3 + pip | AI/ML work, data science, backend APIs | Install on Room 133 PCs |
| Replit (replit.com) | Cloud IDE, collaborative coding, no setup | Request unblock on school network |

---

### Tier 2 — Significantly Improves Outcomes

| Tool | Why | Notes |
|---|---|---|
| OpenAI API | Powers most student projects | Club account with shared key — Treasurer manages credits |
| Anthropic Claude API | Alternative model, used in MyClassPal and other projects | Same as above |
| Vercel / Railway / Render | Free hosting for live project demos | Required for competition submissions that need a live URL |
| Postman / Hoppscotch | API testing during development | Browser versions available |
| Figma (figma.com) | UI/UX design, competition submission design docs | Free for students |
| Google Colab | Browser-based Python + GPU, ML experiments | No local setup required |

---

### Tier 3 — Operations and Communication

| Tool | Why | Notes |
|---|---|---|
| Discord | Primary async communication for project teams | Club server managed by VP/COO |
| Canva | Social media content, Instagram/TikTok design | Used by VP Content team |
| Notion | Project documentation, sprint planning, meeting notes | Free for students |
| YouTube (unrestricted) | Technical tutorials and documentation | Request unrestricted access during open lab hours |
| Stack Overflow, MDN, docs sites | Developer reference | Request unblock if restricted |

---

## How to Request New Tool Access

When a team needs a tool not on the approved list:

1. **Team Lead submits a request to VP/COO.** One paragraph: what the tool is, why they need it, what project it's for, whether it has a free tier.

2. **VP/COO reviews within 48 hours.** If it's clearly fine (browser-based, free, no account required, non-sensitive), they approve directly.

3. **If it requires network unblock or admin approval:** VP/COO documents the request and forwards to Co-Presidents. Co-Presidents add it to the ongoing tools request list for Mr. Novak.

4. **Co-Presidents submit batched tool requests to administration** once per month (not piecemeal). Batching increases approval rate and reduces administrative friction.

**What to include in an admin request:**
- Tool name and URL
- What it does in one sentence
- Why students can't do without it for their project
- Whether a browser-only version is available (reduces IT objections)
- Which competition or deliverable requires it

---

## API Key Management

API keys are club assets, not personal property.

**Rules:**
- Club API keys are stored in a shared secrets manager (1Password or equivalent) accessible to Co-Presidents and Treasurer
- Keys are never pasted into Discord, group chats, or any document that isn't explicitly secured
- Keys are never committed to any GitHub repo
- When a key is compromised or suspected compromised, it is rotated immediately — not "after the demo"
- When an officer graduates, their access to club secrets is revoked

**Distribution to teams:**
- Treasurer creates separate API keys (or sub-accounts) for each team where the API supports it
- Each team is responsible for their own usage — do not share keys between teams
- Usage is reviewed monthly

---

## Room 133 Open Lab Configuration

The ideal Room 133 PC setup:

- Node.js LTS installed
- Python 3.11+ installed with pip
- Git installed and GitHub accessible on the school network
- VS Code installed or vscode.dev accessible
- Chrome or Firefox (not restricted by school proxy)
- Terminal accessible (not locked down)

**Who maintains this:** Co-Presidents coordinate with Mr. Novak and IT at the start of each academic year. Configuration is documented and updated in this OS annually.

**What to do when something breaks in open lab:**
1. Member documents what broke and what they were trying to do
2. Reports to VP/COO
3. VP/COO logs it in the issues tracker (shared doc or GitHub issues)
4. Co-Presidents escalate to IT/Mr. Novak with documentation
5. Workaround (Replit, personal device, cloud IDE) is communicated to affected members within 24 hours

---

## Deployment and Live Demos

For competition submissions and club showcases, projects should be live — not just running locally.

**Approved free hosting platforms:**
- Vercel (frontend, Next.js, static sites)
- Railway (backend, databases, full-stack)
- Render (backend, free tier with spin-up delay)
- GitHub Pages (static sites only)

**Standard:** Every project that competes should have a live URL. "It works on my laptop" is not an acceptable demo for a national competition.

**Before any competition submission:**
- Team Lead confirms the live deployment is working
- VP/COO tests the URL independently (not the same device as the builder)
- URL is included in the competition submission and the club's project record
