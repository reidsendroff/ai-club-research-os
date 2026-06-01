/* ============================================================================
   Northern Highlands AI Club — Leadership Application Form
   ----------------------------------------------------------------------------
   Self-contained vanilla JS. Drop into any page:
       <div id="ai-club-form"></div>
       <script src="leadership-form.js"></script>

   Configure the backend in index.html before going live:
       window.AICLUB_CONFIG = { endpoint: '...apps-script-url...', adminUrl: '...' }

   On submit: POSTs JSON (base64 resume included) to a Google Apps Script Web App
   (Code.gs), which appends a row to the Google Sheet and saves the resume to Drive.
   ========================================================================== */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // CONFIG
  // ---------------------------------------------------------------------------
  var CFG = Object.assign({
    endpoint:     'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE',
    adminUrl:     'https://docs.google.com/spreadsheets/d/1J4n_hF-st2dlv07qnyQaE3sRVIWnUgVYA7H6KX6qcsU/edit',
    cycle:        '2026-2027',
    seats:        5,
    maxResumeMB:  5,
    closingDate:  'June 8',
    presentDate:  'June 15',
    decisionDate: 'June 16'
  }, window.AICLUB_CONFIG || {});

  // ---------------------------------------------------------------------------
  // POSITIONS  (descriptions from AI_Club_OS/02_Leadership_and_Roles.md +
  //             MEGA_CONTEXT.md §30 + June1_Meeting_Plan.js)
  // ---------------------------------------------------------------------------
  var POSITIONS = [
    {
      id:    'vp',
      tag:   'VP / CHIEF OPERATIONS',
      title: 'Leading team projects',
      desc:  'Own every meeting end-to-end: agenda distributed 48 hours ahead, room and AV ready, scrums on time, and one VP assigned as liaison to each project team. If a meeting runs poorly, that is a VP failure — own it and fix it.'
    },
    {
      id:    'cmo',
      tag:   'CMO / SOCIAL MEDIA',
      title: 'Announcements & content',
      desc:  'Make the club impossible to miss. Three posts every meeting across Instagram, TikTok, and Discord — 7AM, 1PM, and "You Missed It." Consistency over cleverness. If a meeting goes out silently, that is on you.'
    },
    {
      id:    'cfo',
      tag:   'CFO / TREASURER',
      title: 'Funds & donations',
      desc:  'Keep money moving: ledger updated within 48 hours of every transaction, September parent donation drive, and API funds to every project team in under five days. No team should ever be blocked from building because of a funding delay.'
    },
    {
      id:    'ea',
      tag:   'EA / SECRETARY',
      title: 'Records & sign-ins',
      desc:  'Be the club\'s memory. Attendance logged within 24 hours of every meeting, strike tracking, the competition-deadline calendar, and brief meeting minutes. Every dispute should be answerable from your records alone.'
    },
    {
      id:    'ta',
      tag:   'TA / ADMINISTRATIVE ASSISTANT',
      title: 'Presentations & support',
      desc:  'Keep the presentation queue running smoothly: help teams prep their demos, manage the slide deck and handoff order, and back up any officer who needs an extra set of hands before or during a meeting.'
    }
  ];

  var AI_TOOLS = [
    'Claude Code', 'OpenAI Codex', 'Cursor', 'Windsurf',
    'ChatGPT / Claude chat', 'Gemini', 'Other'
  ];

  // ---------------------------------------------------------------------------
  // CSS
  // ---------------------------------------------------------------------------
  var CSS = [
    '.acf{',
      '--bg:#08080f;--surface:#0e0e1a;--surface2:#10101e;',
      '--b1:#23233a;--b2:#2d2d48;',
      '--label:#818cf8;--head:#f4f4ff;--body:#c7c7d6;--muted:#5b5b72;',
      '--accent:#8b8bfd;--accent-inv:#0a0a14;',
      '--teal:#00d4aa;--red:#f87171;',
      'color:var(--body);background:var(--bg);',
      'max-width:760px;margin:0 auto;padding:48px 28px 64px;',
      'font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;',
      '-webkit-font-smoothing:antialiased;',
    '}',
    '.acf *{box-sizing:border-box}',

    /* mono label */
    '.acf .mono{font:600 11px/1.4 ui-monospace,"SF Mono",Menlo,Consolas,monospace;letter-spacing:.14em;text-transform:uppercase}',

    /* top bar */
    '.acf .topbar{display:flex;justify-content:space-between;align-items:center;color:var(--label);margin-bottom:34px}',
    '.acf .topbar .dot{color:var(--accent)}',

    /* hero */
    '.acf h1{font-size:42px;line-height:1.05;font-weight:800;color:var(--head);letter-spacing:-.02em;margin:0 0 14px}',
    '.acf .sub{color:#9a9ab0;max-width:600px;margin:0 0 36px}',

    /* section labels */
    '.acf .sec{color:var(--label);margin:34px 0 14px;display:flex;align-items:center;gap:8px}',
    '.acf .req{color:var(--red);letter-spacing:0;font:inherit}',

    /* position cards */
    '.acf .card{background:var(--surface);border:1px solid var(--b1);border-radius:12px;',
      'padding:16px 18px;margin-bottom:10px;',
      'display:flex;align-items:flex-start;gap:16px;cursor:pointer;',
      'transition:border-color .15s,background .15s}',
    '.acf .card:hover{border-color:var(--b2)}',
    '.acf .card.on{border-color:var(--accent);background:#14142a}',
    '.acf .card-body{flex:1}',
    '.acf .card-tag{color:var(--label);margin-bottom:5px}',
    '.acf .card-title{color:var(--head);font-weight:700;font-size:17px;margin-bottom:6px}',
    '.acf .card-desc{color:#8a8aa0;font-size:13px;line-height:1.5}',
    '.acf .card-check{flex:0 0 22px;width:22px;height:22px;margin-top:2px;',
      'border:1.5px solid var(--b2);border-radius:6px;',
      'display:flex;align-items:center;justify-content:center;',
      'color:var(--accent-inv);font-weight:800;font-size:12px;font-family:inherit}',
    '.acf .card.on .card-check{background:var(--accent);border-color:var(--accent)}',
    '.acf .count{color:var(--muted);margin:4px 0 6px}',

    /* form rows and fields */
    '.acf .row{display:flex;gap:16px;flex-wrap:wrap}',
    '.acf .field{flex:1 1 280px;margin-bottom:18px}',
    '.acf .field.wide{flex-basis:100%}',
    '.acf label.lbl{display:block;color:var(--label);margin-bottom:8px}',
    '.acf .opt{color:var(--muted)}',
    '.acf input,.acf textarea,.acf select{',
      'width:100%;background:var(--surface2);border:1px solid var(--b1);border-radius:10px;',
      'color:var(--head);padding:12px 14px;font-size:15px;outline:none;transition:border-color .15s}',
    '.acf input::placeholder,.acf textarea::placeholder{color:#4d4d63}',
    '.acf input:focus,.acf textarea:focus,.acf select:focus{border-color:var(--accent)}',
    '.acf textarea{min-height:96px;resize:vertical;font-family:inherit}',
    '.acf select{appearance:none;-webkit-appearance:none;cursor:pointer;',
      'background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\'%3E%3Cpath d=\'M2 4l4 4 4-4\' stroke=\'%23818cf8\' stroke-width=\'1.6\' fill=\'none\'/%3E%3C/svg%3E");',
      'background-repeat:no-repeat;background-position:right 14px center}',
    '.acf .ferr{color:var(--red);font-size:12.5px;margin-top:5px;display:none}',
    '.acf .field.bad input,.acf .field.bad textarea,.acf .field.bad select{border-color:var(--red)}',
    '.acf .field.bad .ferr{display:block}',

    /* chips (multi-select pills) */
    '.acf .chips{display:flex;flex-wrap:wrap;gap:8px}',
    '.acf .chip{border:1px solid var(--b1);background:var(--surface2);color:var(--body);',
      'border-radius:999px;padding:8px 14px;cursor:pointer;font-size:13px;transition:all .15s}',
    '.acf .chip:hover{border-color:var(--b2)}',
    '.acf .chip.on{border-color:var(--accent);background:#14142a;color:var(--head)}',

    /* file drop zone */
    '.acf .dropzone{border:1px dashed var(--b2);background:var(--surface2);border-radius:10px;',
      'padding:22px;text-align:center;cursor:pointer;transition:border-color .15s}',
    '.acf .dropzone:hover,.acf .dropzone.over{border-color:var(--accent)}',
    '.acf .dropzone.has{border-style:solid;border-color:var(--accent)}',
    '.acf .dz-icon{font-size:24px;margin-bottom:8px}',
    '.acf .dz-name{color:var(--head);font-weight:600;font-size:15px}',
    '.acf .dz-hint{color:var(--muted);font-size:12px;margin-top:4px}',
    '.acf .dropzone input[type=file]{display:none}',

    /* acknowledgements */
    '.acf .ack{display:flex;gap:12px;align-items:flex-start;background:var(--surface);',
      'border:1px solid var(--b1);border-radius:10px;padding:14px 16px;margin-bottom:10px;cursor:pointer}',
    '.acf .ack input[type=checkbox]{margin-top:3px;accent-color:var(--accent);width:16px;height:16px;flex:0 0 auto}',
    '.acf .ack span{font-size:13.5px;color:var(--body)}',

    /* top error banner */
    '.acf .banner{border-radius:10px;padding:13px 16px;margin-bottom:18px;font-size:14px;display:none}',
    '.acf .banner.show{display:block;background:#2a1414;border:1px solid #5a2a2a;color:#fca5a5}',

    /* footer */
    '.acf .foot{display:flex;justify-content:space-between;align-items:center;margin-top:28px}',
    '.acf .admin-link{color:var(--muted);text-decoration:none;transition:color .15s}',
    '.acf .admin-link:hover{color:var(--body)}',
    '.acf .submit-btn{background:var(--accent);color:var(--accent-inv);border:none;border-radius:10px;',
      'padding:14px 28px;font-weight:700;font-size:15px;cursor:pointer;transition:opacity .15s,transform .06s}',
    '.acf .submit-btn:hover{opacity:.9}',
    '.acf .submit-btn:active{transform:translateY(1px)}',
    '.acf .submit-btn:disabled{opacity:.45;cursor:not-allowed}',

    /* page footer */
    '.acf .pgfoot{display:flex;justify-content:space-between;color:var(--muted);margin-top:48px}',

    /* success screen */
    '.acf .success{text-align:center;padding:72px 20px}',
    '.acf .success .big{font-size:36px;font-weight:800;color:var(--head);margin-bottom:14px}',
    '.acf .success .hi{color:var(--teal)}',
    '.acf .success p{color:var(--body);max-width:480px;margin:0 auto 10px}',

    /* responsive */
    '@media(max-width:560px){.acf h1{font-size:30px}.acf{padding:32px 16px 48px}}'
  ].join('');

  // ---------------------------------------------------------------------------
  // HELPERS
  // ---------------------------------------------------------------------------
  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function h(strings) {
    // tagged-template-style helper — just returns the string for plain calls
    return typeof strings === 'string' ? strings : strings.join('');
  }

  function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(String(reader.result).split(',')[1]); };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // ---------------------------------------------------------------------------
  // HTML BUILDERS
  // ---------------------------------------------------------------------------
  function mkField(type, name, label, placeholder, required) {
    var reqMark  = required ? '<span class="req">*</span>' : '<span class="opt mono">(optional)</span>';
    var reqAttr  = required ? ' data-req' : '';
    return (
      '<div class="field" data-fw="' + name + '">' +
        '<label class="lbl mono">' + label + ' ' + reqMark + '</label>' +
        '<input type="' + type + '" name="' + name + '" placeholder="' + esc(placeholder) + '"' + reqAttr + '>' +
        '<div class="ferr">Required.</div>' +
      '</div>'
    );
  }

  function mkTextarea(name, label, placeholder, required) {
    var reqMark = required ? '<span class="req">*</span>' : '<span class="opt mono">(optional)</span>';
    var reqAttr = required ? ' data-req' : '';
    return (
      '<div class="field wide" data-fw="' + name + '">' +
        '<label class="lbl mono">' + label + ' ' + reqMark + '</label>' +
        '<textarea name="' + name + '" placeholder="' + esc(placeholder) + '"' + reqAttr + '></textarea>' +
        '<div class="ferr">Required.</div>' +
      '</div>'
    );
  }

  function mkSelect(name, label, options, required) {
    var reqMark = required ? '<span class="req">*</span>' : '';
    var reqAttr = required ? ' data-req' : '';
    var opts = '<option value="">Select…</option>' +
      options.map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + '</option>'; }).join('');
    return (
      '<div class="field" data-fw="' + name + '">' +
        '<label class="lbl mono">' + label + ' ' + reqMark + '</label>' +
        '<select name="' + name + '"' + reqAttr + '>' + opts + '</select>' +
        '<div class="ferr">Required.</div>' +
      '</div>'
    );
  }

  function mkPositionCards() {
    return POSITIONS.map(function (p) {
      return (
        '<div class="card" data-pos="' + p.id + '">' +
          '<div class="card-body">' +
            '<div class="card-tag mono">' + esc(p.tag) + '</div>' +
            '<div class="card-title">' + esc(p.title) + '</div>' +
            '<div class="card-desc">' + esc(p.desc) + '</div>' +
          '</div>' +
          '<div class="card-check" data-badge></div>' +
        '</div>'
      );
    }).join('');
  }

  function mkChips() {
    return AI_TOOLS.map(function (t) {
      return '<div class="chip" data-tool="' + esc(t) + '">' + esc(t) + '</div>';
    }).join('');
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  function render(mount) {
    // inject styles once
    if (!document.getElementById('acf-style')) {
      var style = document.createElement('style');
      style.id = 'acf-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    mount.innerHTML = (
      '<div class="acf">' +

        // top bar
        '<div class="topbar mono">' +
          '<span><span class="dot">●</span> POSITIONS OPEN · ' + esc(CFG.cycle) + '</span>' +
          '<span>' + CFG.seats + ' SEATS</span>' +
        '</div>' +

        // hero
        '<h1>Apply for the AI Club<br>leadership team.</h1>' +
        '<p class="sub">Pick as many positions as you’d like — apply for all five if you want. We’ll match your skill set to the role that fits best. Every application requires the project you are most proud of and your resume.</p>' +

        // error banner
        '<div class="banner" data-banner></div>' +

        // ── POSITIONS ─────────────────────────────────────────────────────────
        '<div class="sec mono">Select positions <span class="req">*</span></div>' +
        mkPositionCards() +
        '<div class="count mono" data-count>0 of ' + POSITIONS.length + ' selected</div>' +

        // ── YOUR BEST PROJECT ─────────────────────────────────────────────────
        '<div class="sec mono">Your best project <span class="req">*</span></div>' +
        '<div class="row">' +
          mkField('text', 'project_name', 'Project name', 'What it’s called', true) +
          mkField('url',  'project_link', 'Repo / site URL', 'github.com/you/project', true) +
        '</div>' +
        '<div class="row">' +
          mkField('url', 'video_link', 'Project video', 'YouTube, Drive, or Loom link', true) +
          mkField('url', 'demo_link',  'Live demo URL', 'Optional — if deployed', false) +
        '</div>' +
        '<div class="field wide" data-fw="tools">' +
          '<label class="lbl mono">AI tools you used <span class="req">*</span></label>' +
          '<div class="chips" data-tools>' + mkChips() + '</div>' +
          '<div class="ferr">Select at least one.</div>' +
        '</div>' +
        mkTextarea('what_it_does', 'What it does / problem it solves',
          'A few sentences on what you built, what problem it solves, and why it matters.', true) +

        // ── ABOUT YOU ─────────────────────────────────────────────────────────
        '<div class="sec mono">About you <span class="req">*</span></div>' +
        '<div class="row">' +
          mkField('text',  'full_name', 'Full name',  'Alex Rivera',    true) +
          mkField('email', 'email',     'School email', 'you@school.edu', true) +
        '</div>' +
        '<div class="row">' +
          mkField('text', 'grade',   'Grade',            '11',                         true) +
          mkField('text', 'discord', 'Discord username', 'For the leadership server',   true) +
        '</div>' +
        '<div class="row">' +
          mkSelect('status', 'Your status', [
            'New applicant',
            'Current member',
            'Current leadership — reapplying'
          ], true) +
          mkField('tel', 'phone', 'Phone', 'Optional', false) +
        '</div>' +

        // ── FIT ───────────────────────────────────────────────────────────────
        '<div class="sec mono">Fit <span class="opt mono">(optional)</span></div>' +
        mkTextarea('why_you', 'Why you',
          'A sentence or two on what you’d bring to the role(s) you selected.', false) +
        mkTextarea('availability', 'Availability',
          'Can you make Room 133 open lab (Mon/Wed/Fri) and bi-weekly scrums? Any conflicts we should know about?', false) +

        // ── RESUME ────────────────────────────────────────────────────────────
        '<div class="sec mono">Resume <span class="req">*</span></div>' +
        '<label class="dropzone" data-dz>' +
          '<div class="dz-icon">📄</div>' +
          '<div class="dz-name" data-dz-name>Click to upload — or drag and drop</div>' +
          '<div class="dz-hint">PDF or Word · max ' + CFG.maxResumeMB + ' MB</div>' +
          '<input type="file" data-file accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">' +
        '</label>' +
        '<div class="ferr" data-file-err>Please attach your resume (PDF or Word, under ' + CFG.maxResumeMB + ' MB).</div>' +

        // ── ACKNOWLEDGE ───────────────────────────────────────────────────────
        '<div class="sec mono">Acknowledge <span class="req">*</span></div>' +
        '<label class="ack">' +
          '<input type="checkbox" data-ack="commit">' +
          '<span>I understand this is a real role with real accountability: 75 % attendance minimum, deliverables every meeting, monthly 1:1s, and a formal improvement plan if I’m not meeting expectations. Mid-year replacement is possible.</span>' +
        '</label>' +
        '<label class="ack">' +
          '<input type="checkbox" data-ack="own">' +
          '<span>This project is my own work and everything in this application is accurate.</span>' +
        '</label>' +

        // ── FOOTER ────────────────────────────────────────────────────────────
        '<div class="foot">' +
          '<a class="admin-link mono" href="' + esc(CFG.adminUrl) + '" target="_blank" rel="noopener">Admin →</a>' +
          '<button class="submit-btn" data-submit>Submit application</button>' +
        '</div>' +

        '<div class="pgfoot mono">' +
          '<span>Northern Highlands AI Club</span>' +
          '<span>2026–27</span>' +
        '</div>' +

      '</div>'
    );

    wire(mount);
  }

  // ---------------------------------------------------------------------------
  // WIRE INTERACTIONS
  // ---------------------------------------------------------------------------
  function wire(mount) {
    var selectedPositions = []; // order = priority ranking
    var selectedTools     = [];
    var resumeFile        = null;

    var root    = mount.querySelector('.acf');
    var banner  = root.querySelector('[data-banner]');
    var countEl = root.querySelector('[data-count]');
    var dz      = root.querySelector('[data-dz]');
    var dzName  = root.querySelector('[data-dz-name]');
    var fileInp = root.querySelector('[data-file]');
    var fileErr = root.querySelector('[data-file-err]');
    var btn     = root.querySelector('[data-submit]');

    // -- position cards -------------------------------------------------------
    root.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.dataset.pos;
        var idx = selectedPositions.indexOf(id);
        if (idx >= 0) {
          selectedPositions.splice(idx, 1);
          card.classList.remove('on');
        } else {
          selectedPositions.push(id);
          card.classList.add('on');
        }
        updateBadges();
      });
    });

    function updateBadges() {
      root.querySelectorAll('.card').forEach(function (card) {
        var rank = selectedPositions.indexOf(card.dataset.pos);
        card.querySelector('[data-badge]').textContent = rank >= 0 ? String(rank + 1) : '';
      });
      countEl.textContent = selectedPositions.length + ' of ' + POSITIONS.length + ' selected';
    }

    // -- tool chips -----------------------------------------------------------
    root.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var t = chip.dataset.tool;
        var idx = selectedTools.indexOf(t);
        if (idx >= 0) { selectedTools.splice(idx, 1); chip.classList.remove('on'); }
        else          { selectedTools.push(t);         chip.classList.add('on');   }
      });
    });

    // -- drag-and-drop on drop zone -------------------------------------------
    dz.addEventListener('dragover',  function (e) { e.preventDefault(); dz.classList.add('over'); });
    dz.addEventListener('dragleave', function ()  { dz.classList.remove('over'); });
    dz.addEventListener('drop', function (e) {
      e.preventDefault(); dz.classList.remove('over');
      var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) setFile(f);
    });

    // -- file input -----------------------------------------------------------
    fileInp.addEventListener('change', function (e) {
      var f = e.target.files && e.target.files[0];
      if (f) setFile(f);
    });

    function setFile(f) {
      var maxBytes = CFG.maxResumeMB * 1024 * 1024;
      var allowed  = /\.(pdf|doc|docx)$/i.test(f.name);
      if (!allowed) {
        showFileErr('Only PDF or Word files (.pdf, .doc, .docx) are accepted.');
        return;
      }
      if (f.size > maxBytes) {
        showFileErr('That file is ' + (f.size / 1024 / 1024).toFixed(1) + ' MB. Please upload one under ' + CFG.maxResumeMB + ' MB.');
        return;
      }
      resumeFile = f;
      fileErr.style.display = 'none';
      dz.classList.add('has');
      dzName.textContent = '✓ ' + f.name;
    }

    function showFileErr(msg) {
      resumeFile = null;
      dz.classList.remove('has');
      dzName.textContent = 'Click to upload — or drag and drop';
      fileErr.textContent = msg;
      fileErr.style.display = 'block';
    }

    // -- submit ---------------------------------------------------------------
    btn.addEventListener('click', function () {
      hideBanner();
      var ok = true;
      var first = null;

      // required text fields
      root.querySelectorAll('[data-fw]').forEach(function (fw) {
        var inp = fw.querySelector('[data-req]');
        if (!inp) return;
        fw.classList.remove('bad');
        var empty = !String(inp.value).trim();
        if (inp.tagName === 'SELECT') empty = !inp.value;
        if (empty) {
          fw.classList.add('bad');
          ok = false;
          first = first || fw;
        }
      });

      // positions
      if (selectedPositions.length === 0) {
        ok = false;
        first = first || root.querySelector('.card');
      }

      // tools — mark the tools field wrapper
      var toolsFw = root.querySelector('[data-fw="tools"]');
      if (toolsFw) {
        toolsFw.classList.toggle('bad', selectedTools.length === 0);
        if (selectedTools.length === 0) { ok = false; first = first || toolsFw; }
      }

      // resume
      if (!resumeFile) {
        fileErr.textContent = 'Please attach your resume (PDF or Word, under ' + CFG.maxResumeMB + ' MB).';
        fileErr.style.display = 'block';
        ok = false;
        first = first || dz;
      }

      // acknowledgements
      var ackCommit = root.querySelector('[data-ack="commit"]').checked;
      var ackOwn    = root.querySelector('[data-ack="own"]').checked;
      if (!ackCommit || !ackOwn) {
        ok = false;
        first = first || root.querySelector('.ack');
      }

      if (!ok) {
        showBanner('Please complete the highlighted fields and check both acknowledgements.');
        if (first && first.scrollIntoView) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      doSubmit();
    });

    // -- build and POST payload -----------------------------------------------
    function doSubmit() {
      btn.disabled = true;
      btn.textContent = 'Submitting…';

      function val(name) {
        var el = root.querySelector('[name="' + name + '"]');
        return el ? String(el.value).trim() : '';
      }

      var rankedPositions = selectedPositions.map(function (id, i) {
        var p = POSITIONS.find(function (x) { return x.id === id; });
        return (i + 1) + '. ' + p.tag + ' — ' + p.title;
      }).join(' | ');

      fileToBase64(resumeFile)
        .then(function (b64) {
          var payload = {
            fullName:    val('full_name'),
            email:       val('email'),
            grade:       val('grade'),
            discord:     val('discord'),
            phone:       val('phone'),
            status:      val('status'),
            positions:   rankedPositions,
            projectName: val('project_name'),
            projectLink: val('project_link'),
            videoLink:   val('video_link'),
            demoLink:    val('demo_link'),
            aiTools:     selectedTools.join(', '),
            whatItDoes:  val('what_it_does'),
            whyYou:      val('why_you'),
            availability: val('availability'),
            ackCommit:   'Yes',
            ackOwn:      'Yes',
            resume: {
              filename: resumeFile.name,
              mimeType: resumeFile.type || 'application/octet-stream',
              base64:   b64
            }
          };

          return fetch(CFG.endpoint, {
            method:  'POST',
            // text/plain avoids the OPTIONS preflight on Apps Script
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body:    JSON.stringify(payload)
          });
        })
        .then(function (res) { return res.json().catch(function () { return { ok: true }; }); })
        .then(function (data) {
          if (data && data.ok === false) throw new Error(data.error || 'Server error.');
          showSuccess(val('full_name'));
        })
        .catch(function (err) {
          btn.disabled = false;
          btn.textContent = 'Submit application';
          showBanner('Submission failed: ' + (err && err.message ? err.message : String(err)) +
            '. Try again or email reid@sendroff.com.');
        });
    }

    // -- helpers --------------------------------------------------------------
    function showBanner(msg) {
      banner.textContent = msg;
      banner.className = 'banner show';
    }
    function hideBanner() {
      banner.className = 'banner';
    }

    function showSuccess(fullName) {
      var first = (fullName || '').split(' ')[0] || 'You';
      root.innerHTML =
        '<div class="success">' +
          '<div class="big">Application <span class="hi">received.</span></div>' +
          '<p>Got it, ' + esc(first) + '. Your project, resume, and role picks are logged.</p>' +
          '<p>Declaration deadline: <strong>' + esc(CFG.closingDate) + '</strong>.' +
          ' Presentations: <strong>' + esc(CFG.presentDate) + '</strong>.' +
          ' Decisions via Discord: <strong>' + esc(CFG.decisionDate) + '</strong>.</p>' +
        '</div>';
    }
  }

  // ---------------------------------------------------------------------------
  // INIT
  // ---------------------------------------------------------------------------
  function init() {
    var mount = document.getElementById('ai-club-form');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'ai-club-form';
      document.body.appendChild(mount);
    }
    render(mount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
