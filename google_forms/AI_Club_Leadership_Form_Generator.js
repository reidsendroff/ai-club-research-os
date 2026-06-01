/**
 * AI Club Leadership Application Form Generator
 *
 * Run this in Google Apps Script while logged into the Google account that should
 * own the form and response spreadsheet.
 *
 * What it creates:
 * - Google Form: "AI Club Leadership Application 2026-2027"
 * - Linked response Google Sheet
 * - Resume upload field
 * - Optional demo video upload field
 * - Project evidence, role fit, grit, presentation, and commitment questions
 *
 * Important:
 * Google Forms file upload questions usually require respondents to sign into
 * Google and may be restricted by your school/domain settings. For that reason,
 * this form also asks for resume/demo links as fallbacks.
 */

const CONFIG = {
  formTitle: 'AI Club Leadership Application 2026-2027',
  sheetTitle: 'AI Club Leadership Applications 2026-2027 Responses',
  canvasModuleName: 'June 15 Leadership Project Showcase',
  projectSubmitDeadline: 'Saturday, June 13, 2026 at 11:59 PM',
  showcaseDate: 'Monday, June 15, 2026',
  demoFormat: 'Up to 5 minutes total: 4-minute demo + 1-minute Q&A',
  contactEmail: 'reid@sendroff.com',
};

const ROLES = [
  'VP / COO — meeting ops, project-team check-ins, scrums, blockers, follow-through',
  'CMO / Social Media — announcements, Instagram/TikTok, clips, project showcases',
  'Treasurer / Resources — API budget, parent donations, reimbursements, tool access',
  'Secretary / Systems — attendance, notes, Canvas records, deadlines, AI Club Brain',
  'TA / Administrative Assistant — meeting help, member support, presentations',
  'Project Lead — owns a build team, keeps the team moving, makes demos real',
];

function createAIClubLeadershipApplication() {
  const form = FormApp.create(CONFIG.formTitle)
    .setDescription(
      [
        'Use this form to apply for AI Club leadership for 2026-2027.',
        '',
        `June 15 is the leadership project showcase. Submit your best project by ${CONFIG.projectSubmitDeadline}.`,
        `Showcase date: ${CONFIG.showcaseDate}.`,
        `Demo format: ${CONFIG.demoFormat}.`,
        '',
        'We are looking for evidence of grit, AI/build skill, coding or vibe-coding ability, presentation skill, and role fit.',
        'Free tools count. Paid tools count. What matters is what you built, what you learned, and how clearly you can explain it.',
      ].join('\n')
    )
    .setCollectEmail(true)
    .setLimitOneResponsePerUser(false)
    .setAllowResponseEdits(true)
    .setConfirmationMessage(
      'Submitted. Keep building before June 15. Be ready to show the real project and explain what you learned.'
    );

  const sheet = SpreadsheetApp.create(CONFIG.sheetTitle);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  addIdentitySection_(form);
  addRoleSection_(form);
  addProjectSection_(form);
  addUploadsSection_(form);
  addGritAndPresentationSection_(form);
  addCommitmentSection_(form);
  addIntegritySection_(form);

  addResponseProcessingSheet_(sheet);

  Logger.log(`FORM_EDIT_URL: ${form.getEditUrl()}`);
  Logger.log(`FORM_PUBLIC_URL: ${form.getPublishedUrl()}`);
  Logger.log(`SHEET_URL: ${sheet.getUrl()}`);

  return {
    formEditUrl: form.getEditUrl(),
    formPublicUrl: form.getPublishedUrl(),
    sheetUrl: sheet.getUrl(),
  };
}

function addIdentitySection_(form) {
  form.addPageBreakItem().setTitle('Applicant Info');

  form.addTextItem()
    .setTitle('Full name')
    .setRequired(true);

  form.addTextItem()
    .setTitle('School email')
    .setHelpText('Use the email you actually check.')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());

  form.addListItem()
    .setTitle('Grade next school year')
    .setChoiceValues(['9', '10', '11', '12'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Discord username or phone number, optional')
    .setHelpText('Only add this if you are comfortable being contacted there.');
}

function addRoleSection_(form) {
  form.addPageBreakItem().setTitle('Role Interest');

  form.addCheckboxItem()
    .setTitle('Which roles are you interested in?')
    .setHelpText('Select every role you would seriously consider. We will match people to role fit.')
    .setChoiceValues(ROLES)
    .setRequired(true);

  form.addListItem()
    .setTitle('Top choice role')
    .setChoiceValues(ROLES)
    .setRequired(true);

  form.addListItem()
    .setTitle('Second choice role')
    .setChoiceValues(['No second choice'].concat(ROLES))
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Why are you a fit for your top-choice role?')
    .setHelpText('Be specific. Name the work you can own every week.')
    .setRequired(true);
}

function addProjectSection_(form) {
  form.addPageBreakItem().setTitle('Best Project Submission');

  form.addTextItem()
    .setTitle('Project title')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('One-paragraph project description')
    .setHelpText('What did you build, who is it for, and what does it do?')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Project link')
    .setHelpText('Live app, website, demo, Drive folder, GitHub repo, or any link that shows the project.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Code or GitHub link, optional')
    .setHelpText('If the code is private, say that in the project description.');

  form.addCheckboxItem()
    .setTitle('Tools used')
    .setHelpText('Select everything that materially helped you build the project.')
    .setChoiceValues([
      'Claude Code',
      'Codex',
      'Cursor',
      'Windsurf',
      'ChatGPT',
      'Gemini',
      'Replit',
      'GitHub Copilot',
      'Python',
      'JavaScript / TypeScript',
      'HTML / CSS',
      'No-code or low-code tool',
      'Other',
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Was this solo or team-built?')
    .setChoiceValues(['Solo', 'Team-built'])
    .showOtherOption(false)
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('If team-built, what did you personally build?')
    .setHelpText('If solo, write "solo." If team-built, be honest and specific.');

  form.addParagraphTextItem()
    .setTitle('What broke, and how did you fix it?')
    .setHelpText('This is one of the most important questions. We are looking for grit and problem-solving.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What would you improve next?')
    .setRequired(true);
}

function addUploadsSection_(form) {
  form.addPageBreakItem().setTitle('Uploads');

  form.addTextItem()
    .setTitle('Demo video link, optional but recommended')
    .setHelpText('Paste a Drive, YouTube unlisted, Loom, or other link. This helps if the June 15 meeting runs long.');

  try {
    form.addFileUploadItem()
      .setTitle('Demo video upload, optional')
      .setHelpText('Optional fallback if you prefer uploading directly. Video link is also accepted above.')
      .setRequired(false)
      .setMaxFiles(1)
      .setMaxFileSize(1024);
  } catch (error) {
    form.addParagraphTextItem()
      .setTitle('Demo upload unavailable')
      .setHelpText('File uploads are not available in this account/domain. Use the demo video link field above.');
  }

  form.addTextItem()
    .setTitle('Resume link, optional fallback')
    .setHelpText('Paste a Google Drive link if file upload does not work.');

  try {
    form.addFileUploadItem()
      .setTitle('Resume upload')
      .setHelpText('Upload a resume if you have one. PDF preferred. If you do not have a resume, upload a one-page summary of your projects and experience.')
      .setRequired(false)
      .setMaxFiles(1)
      .setMaxFileSize(10);
  } catch (error) {
    form.addParagraphTextItem()
      .setTitle('Resume upload unavailable')
      .setHelpText('File uploads are not available in this account/domain. Use the resume link field above.');
  }
}

function addGritAndPresentationSection_(form) {
  form.addPageBreakItem().setTitle('Grit and Presentation');

  form.addParagraphTextItem()
    .setTitle('What is the strongest evidence that you have grit?')
    .setHelpText('A real example beats a generic answer.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What is the strongest evidence that you can communicate or present well?')
    .setHelpText('This can be public speaking, teaching, announcements, videos, demos, writing, or helping others understand something.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Can you present live on June 15, 2026?')
    .setChoiceValues([
      'Yes',
      'No, but I will submit a recorded demo',
      'Not sure yet',
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('I understand the June 15 demo format')
    .setChoiceValues([
      CONFIG.demoFormat,
      'If many people apply, the format may switch to shorter lightning demos',
      'I should show the real project, not just talk about it',
    ])
    .setValidation(FormApp.createCheckboxValidation().requireSelectExactly(3).build())
    .setRequired(true);
}

function addCommitmentSection_(form) {
  form.addPageBreakItem().setTitle('Leadership Commitment');

  form.addCheckboxItem()
    .setTitle('Leadership expectations')
    .setHelpText('Check each item only if you actually agree.')
    .setChoiceValues([
      'I can attend at least 75% of AI Club meetings next year',
      'I can own weekly responsibilities without Reid or Ben chasing me',
      'I can respond to leadership messages within a reasonable time',
      'I understand leadership is not honorary',
      'I understand I may be moved out of leadership if I consistently do not perform',
    ])
    .setValidation(FormApp.createCheckboxValidation().requireSelectExactly(5).build())
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What weekly responsibility can you realistically own?')
    .setHelpText('Examples: attendance, announcements, team check-ins, project team leadership, budget tracking, Canvas updates.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Summer availability')
    .setChoiceValues([
      'I can help over the summer',
      'I can help a little over the summer',
      'I cannot help much over the summer',
    ])
    .setRequired(true);
}

function addIntegritySection_(form) {
  form.addPageBreakItem().setTitle('Integrity and Permission');

  form.addCheckboxItem()
    .setTitle('Final confirmations')
    .setChoiceValues([
      'I represented my project honestly',
      'I disclosed team help or outside help where relevant',
      'I give AI Club permission to discuss or showcase my project internally',
      'I understand Reid and Ben will use this form plus the June 15 demo to make leadership decisions',
    ])
    .setValidation(FormApp.createCheckboxValidation().requireSelectExactly(4).build())
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Anything else Reid and Ben should know?')
    .setRequired(false);
}

function addResponseProcessingSheet_(sheet) {
  const rubric = sheet.insertSheet('Review Rubric');
  rubric.getRange(1, 1, 1, 5).setValues([[
    'Applicant',
    'Grit',
    'AI / build skill',
    'Presentation skill',
    'Role fit',
  ]]);
  rubric.getRange(2, 1, 1, 5).setValues([[
    'Use one row per serious candidate',
    '1-5',
    '1-5',
    '1-5',
    '1-5',
  ]]);

  const notes = sheet.insertSheet('Decision Notes');
  notes.getRange(1, 1, 1, 6).setValues([[
    'Applicant',
    'Recommended role',
    'Evidence',
    'Concern',
    'Decision',
    'Follow-up',
  ]]);
}
