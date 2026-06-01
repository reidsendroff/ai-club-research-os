# AI Club Leadership Application Form

A self-contained JavaScript form that, on submit, writes every application to your
Google Sheet and saves each resume to Google Drive.

**Everything goes to this Sheet:**
https://docs.google.com/spreadsheets/d/1J4n_hF-st2dlv07qnyQaE3sRVIWnUgVYA7H6KX6qcsU/edit

## Files

| File | What it is |
|---|---|
| `leadership-form.js` | The form itself (vanilla JS — renders UI, validates, encodes resume, POSTs). |
| `index.html` | A host page. Open it to run the form; configure `endpoint` here. |
| `Code.gs` | Google Apps Script backend — the database layer. Writes to the Sheet + Drive. |

## Setup (about 5 minutes)

1. **Open the Sheet** (link above) → **Extensions ▸ Apps Script**.
2. Delete the starter code, **paste all of `Code.gs`**, and **Save**.
3. In the Apps Script editor, select **`setupHeaders`** in the function dropdown and click **Run**.
   Authorize when prompted (it needs Sheets + Drive). This writes the header row and
   creates the `Applications` tab + the `AI Club Leadership Resumes` Drive folder.
4. **Deploy ▸ New deployment ▸ Web app:**
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**, copy the **Web app URL**.
5. Paste that URL into **`endpoint`** in `index.html` (and/or `CONFIG.endpoint` in `leadership-form.js`).
6. Open `index.html`, submit a test → a new row appears in the Sheet with a link to the resume.

> If you change `Code.gs` later, redeploy with **Deploy ▸ Manage deployments ▸ Edit ▸ New version**.

## What the form collects (one row per applicant)

Timestamp · Full Name · Email · Grade · Discord · Phone · Status ·
Positions (ranked) · Project Name · Project Link · Video Link · Live Demo ·
AI Tools Used · What It Does · Why You · Availability · **Resume (Drive link)** ·
Ack: Commitment · Ack: Own Work

## Audit — what was added vs. the original form

The original form had: positions (multi-select), full name, email, grade (optional),
"why you" (optional), submit. That is not enough to actually select leadership. Added:

- **Resume upload** (required; PDF/Word, ≤5MB) → saved to Drive, linked in the Sheet.
- **"Your best project" block** — name, repo/site link, **video link**, optional live demo,
  AI tools used, and a short "what it does." This is the core requirement from the June 1
  plan (every applicant submits a real, vibe-coded project; the form sits on top of that video).
- **Discord username** — the leadership server launches June 17, so it is needed up front.
- **Status** — New applicant / Current member / Current leadership reapplying (policy: current
  leaders reapply on the same terms).
- **Ranked positions** — selection order is captured as a 1..n preference instead of a flat list.
- **Two required acknowledgements** — the 75% attendance + deliverables + performance/PIP model,
  and a "this is my own work / info is accurate" confirmation.
- **Real submission UX** — required-field validation, error banner, file-size/type checks,
  a success screen with the key dates, and a writable database behind it.
- **Grade is now required** (eligibility), and **role cards now show a description** for each seat.

## Role descriptions (source of truth)

Pulled from `AI_Club_OS/02_Leadership_and_Roles.md`, `MEGA_CONTEXT.md` §30, and
`June1_Meeting_Plan.js`:

- **VP / Chief Operations** — runs meetings, agenda 48h ahead, scrum facilitation, team liaison.
- **CMO / Social Media** — all IG/TikTok/Discord, three posts per meeting.
- **CFO / Treasurer** — ledger, parent donation drive, API funds within 5 days.
- **EA / Secretary** — attendance within 24h, strikes, competition calendar, minutes.
- **TA / Administrative Assistant** — *not defined in the brain.* Synthesized as presentation/meeting
  support. **Confirm the wording or add a charter to `02_Leadership_and_Roles.md`.**
