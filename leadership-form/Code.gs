/* ============================================================================
   AI Club Leadership Application — Google Apps Script backend
   ----------------------------------------------------------------------------
   This is the "database" layer. It receives each submission from
   leadership-form.js, saves the resume to a Drive folder, and appends one row
   to the Google Sheet below.

   SETUP (one time):
     1. Open the target Sheet:
        https://docs.google.com/spreadsheets/d/1J4n_hF-st2dlv07qnyQaE3sRVIWnUgVYA7H6KX6qcsU/edit
     2. Extensions ▸ Apps Script. Paste this whole file in. Save.
     3. Run setupHeaders() once (authorize when prompted) to write the header row.
     4. Deploy ▸ New deployment ▸ type "Web app".
          - Execute as: Me
          - Who has access: Anyone
        Copy the Web app URL and paste it into CONFIG.endpoint in leadership-form.js.
   ========================================================================== */

// Everything goes to THIS sheet (the one you designed).
var SHEET_ID   = '1J4n_hF-st2dlv07qnyQaE3sRVIWnUgVYA7H6KX6qcsU';
var SHEET_NAME = 'Applications';                 // tab name; created if missing
var RESUME_FOLDER_NAME = 'AI Club Leadership Resumes'; // auto-created in your Drive

var HEADERS = [
  'Timestamp', 'Full Name', 'Email', 'Grade', 'Discord', 'Phone', 'Status',
  'Positions (ranked)', 'Project Name', 'Project Link', 'Video Link', 'Live Demo',
  'AI Tools Used', 'What It Does', 'Why You', 'Availability',
  'Resume', 'Ack: Commitment', 'Ack: Own Work'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // serialize writes so rows never collide
    var data = JSON.parse(e.postData.contents);

    var sheet = getSheet_();
    var resumeUrl = data.resume && data.resume.base64 ? saveResume_(data) : '';

    sheet.appendRow([
      new Date(),
      data.fullName || '', data.email || '', data.grade || '', data.discord || '',
      data.phone || '', data.status || '', data.positions || '',
      data.projectName || '', data.projectLink || '', data.videoLink || '', data.demoLink || '',
      data.aiTools || '', data.whatItDoes || '', data.whyYou || '', data.availability || '',
      resumeUrl, data.ackCommit || '', data.ackOwn || ''
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

// Health check: open the Web app URL in a browser to confirm it's live.
function doGet() {
  return json_({ ok: true, service: 'AI Club Leadership Application', sheet: SHEET_ID });
}

function getSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0e0e1a').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveResume_(data) {
  var folder = getResumeFolder_();
  var bytes = Utilities.base64Decode(data.resume.base64);
  var safeName = (data.fullName || 'applicant').replace(/[^\w\-]+/g, '_');
  var blob = Utilities.newBlob(bytes, data.resume.mimeType, safeName + '__' + data.resume.filename);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getResumeFolder_() {
  var it = DriveApp.getFoldersByName(RESUME_FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(RESUME_FOLDER_NAME);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run once from the editor to lay down the header row.
function setupHeaders() {
  getSheet_();
}
