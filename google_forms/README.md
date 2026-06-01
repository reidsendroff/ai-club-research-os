# AI Club Google Forms

## Files

- `AI_Club_Leadership_Form_Audit.md` audits the current leadership form and lists the missing fields.
- `AI_Club_Leadership_Form_Generator.js` is a Google Apps Script file that creates the leadership application form and linked response spreadsheet.

## How To Run

1. Go to `script.google.com`.
2. Create a new Apps Script project.
3. Paste the contents of `AI_Club_Leadership_Form_Generator.js` into `Code.gs`.
4. Run `createAIClubLeadershipApplication`.
5. Approve the Google permissions.
6. Open Apps Script logs to get:
   - Form edit URL
   - Form public URL
   - Linked response Sheet URL

## Important Notes

Google Forms file upload questions may require respondents to sign into Google and may be restricted by school/domain settings. The generated form includes both upload fields and link fallback fields for resumes and demo videos.

The linked spreadsheet includes extra tabs:
- `Review Rubric`
- `Decision Notes`

Use the Sheet as the leadership database.

