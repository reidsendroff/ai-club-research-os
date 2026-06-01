# AI Club Leadership Form Audit

## Blunt Audit

The current form is visually strong, but it is not enough to make leadership decisions.

What it currently captures:
- Name
- Email
- Grade
- Positions of interest
- Short "why you" response

What it does not capture yet:
- The applicant's actual project.
- A demo video or project link.
- A resume upload.
- Evidence of grit.
- Evidence of AI/tool fluency.
- Presentation availability for June 15.
- Role ranking and role fit.
- Whether they understand the time commitment.
- Whether they agree to attendance and accountability expectations.
- Whether they used paid tools, free tools, teammates, templates, or starter code.
- Whether the project can be shown publicly.

That means the current form would create a weak dataset. You would still need to chase people manually before deciding leadership.

## What The Form Needs

### Identity
- Full name
- School email
- Grade
- Discord or phone, optional

### Role Interest
- Roles interested in
- Top choice
- Second choice
- Role fit explanation

Recommended roles:
- VP / COO
- CMO / Social Media
- Treasurer / Resources
- Secretary / Systems
- TA / Administrative Assistant
- Project Lead

### Best Project Submission
- Project title
- Project link
- Code/repo link, optional
- Demo video link or file upload
- Short description
- Tools used
- AI tools used
- Whether the project was solo or team-built
- What the applicant personally built
- What broke and how they fixed it
- What they would improve next

### Resume
- Resume upload, PDF preferred
- Resume link fallback, because Google Forms file upload can be domain-restricted

### Grit / Communication
- Hardest blocker
- How they solved it
- One thing they learned
- Why this project shows they should lead

### June 15 Logistics
- Can present live on June 15
- If no, submit recorded demo
- Agreement to a 4-minute demo + 1-minute Q&A

### Commitment
- Can attend at least 75% of meetings next year
- Can own weekly responsibilities
- Understands that leadership is not honorary
- Agrees to be moved out of leadership if they consistently do not perform

### Permissions / Integrity
- Confirms the work is honestly represented
- Identifies teammates or external help
- Gives permission for the project to be discussed or shown in AI Club materials

## Recommendation

Use the Google Apps Script generator in:

`google_forms/AI_Club_Leadership_Form_Generator.js`

It creates:
- A Google Form
- A linked Google Sheet response database
- File upload fields for resume and demo video
- Structured questions for project evidence, role fit, grit, presentation, and commitment

