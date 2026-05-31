const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, Header, Footer, LevelFormat
} = require('docx');
const fs = require('fs');

// COLORS
const PURPLE    = '7C3AED';
const TEAL      = '00D4AA';
const BLACK     = '080810';
const WHITE     = 'FFFFFF';
const PURPLE_L  = 'A78BFA';
const DARK_BG   = '1A1030';
const MUTED     = '888888';
const CARD_BG   = 'F4F1FF';
const TEAL_BG   = 'E6FBF7';
const RED_BG    = 'FFF1F1';
const RED_ACC   = 'DC2626';
const BLUE_BG   = 'EFF6FF';
const BLUE_ACC  = '2563EB';
const GOLD_BG   = 'FFFBEB';
const GOLD_ACC  = 'D97706';
const BODY      = '374151';
const SUBTEXT   = '6B7280';

const NO_BORDERS = {
  top:    { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left:   { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right:  { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
};

const THIN_BOTTOM = {
  top:    { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E5E7EB' },
  left:   { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right:  { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
};

function sp(n = 80) { return new Paragraph({ spacing: { before: 0, after: n } }); }

function accent(text, color = PURPLE) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [160, 9200],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [
      new TableCell({
        borders: NO_BORDERS,
        width: { size: 160, type: WidthType.DXA },
        shading: { fill: color, type: ShadingType.CLEAR },
        children: [new Paragraph({ children: [new TextRun({ text: '', size: 18 })] })]
      }),
      new TableCell({
        borders: NO_BORDERS,
        width: { size: 9200, type: WidthType.DXA },
        shading: { fill: CARD_BG, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        children: [new Paragraph({ children: [new TextRun({ text, size: 20, font: 'Arial', color: BODY })] })]
      })
    ]})]
  });
}

function callout(label, text, bg = CARD_BG, acc = PURPLE) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [200, 9160],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [
      new TableCell({
        borders: NO_BORDERS,
        width: { size: 200, type: WidthType.DXA },
        shading: { fill: acc, type: ShadingType.CLEAR },
        children: [new Paragraph({ children: [new TextRun({ text: '', size: 18 })] })]
      }),
      new TableCell({
        borders: NO_BORDERS,
        width: { size: 9160, type: WidthType.DXA },
        shading: { fill: bg, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 200, right: 200 },
        children: [
          new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, font: 'Arial', color: acc })] }),
          new Paragraph({ children: [new TextRun({ text, size: 20, font: 'Arial', color: BODY })] })
        ]
      })
    ]})]
  });
}

function sectionHeader(title, subtitle = '') {
  const rows = [
    new TableRow({ children: [
      new TableCell({
        borders: NO_BORDERS,
        shading: { fill: PURPLE, type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 280, right: 280 },
        children: [
          new Paragraph({
            children: [new TextRun({ text: title, bold: true, size: 28, font: 'Arial', color: WHITE })],
          }),
          ...(subtitle ? [new Paragraph({ children: [new TextRun({ text: subtitle, size: 20, font: 'Arial', color: 'D9D5FF' })] })] : [])
        ]
      })
    ]})
  ];
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows
  });
}

function twoCol(leftLabel, leftVal, rightLabel, rightVal, lBg = CARD_BG, rBg = TEAL_BG, lAcc = PURPLE, rAcc = TEAL) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [4600, 4760],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [
      new TableCell({
        borders: NO_BORDERS,
        width: { size: 4600, type: WidthType.DXA },
        shading: { fill: lBg, type: ShadingType.CLEAR },
        margins: { top: 140, bottom: 140, left: 200, right: 100 },
        children: [
          new Paragraph({ children: [new TextRun({ text: leftLabel, bold: true, size: 18, font: 'Arial', color: lAcc })] }),
          new Paragraph({ children: [new TextRun({ text: leftVal, size: 20, font: 'Arial', color: BODY })] })
        ]
      }),
      new TableCell({
        borders: NO_BORDERS,
        width: { size: 4760, type: WidthType.DXA },
        shading: { fill: rBg, type: ShadingType.CLEAR },
        margins: { top: 140, bottom: 140, left: 200, right: 100 },
        children: [
          new Paragraph({ children: [new TextRun({ text: rightLabel, bold: true, size: 18, font: 'Arial', color: rAcc })] }),
          new Paragraph({ children: [new TextRun({ text: rightVal, size: 20, font: 'Arial', color: BODY })] })
        ]
      })
    ]})]
  });
}

function bullet(text, indent = 360) {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, font: 'Arial', color: BODY })],
    indent: { left: indent, hanging: 280 },
    spacing: { before: 40, after: 40 },
    bullet: { level: 0 }
  });
}

function subBullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 19, font: 'Arial', color: SUBTEXT })],
    indent: { left: 720, hanging: 280 },
    spacing: { before: 20, after: 20 },
    bullet: { level: 1 }
  });
}

function h2(text, color = PURPLE) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, font: 'Arial', color })],
    spacing: { before: 200, after: 80 }
  });
}

function body(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, font: 'Arial', color: BODY })],
    spacing: { before: 40, after: 80 }
  });
}

function timerRow(label, duration, color = PURPLE) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [7200, 2160],
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E5E7EB' },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE }
    },
    rows: [new TableRow({ children: [
      new TableCell({
        borders: THIN_BOTTOM,
        margins: { top: 100, bottom: 100, left: 0, right: 0 },
        children: [new Paragraph({ children: [new TextRun({ text: label, size: 20, font: 'Arial', color: BODY, bold: true })] })]
      }),
      new TableCell({
        borders: THIN_BOTTOM,
        margins: { top: 100, bottom: 100, left: 0, right: 0 },
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: duration, size: 20, font: 'Arial', color, bold: true })]
        })]
      })
    ]})]
  });
}

function competitionCard(name, url, deadline, teamSize, prize, notes) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [
      new TableCell({
        borders: {
          top: { style: BorderStyle.SINGLE, size: 2, color: 'E5E7EB' },
          bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E5E7EB' },
          left: { style: BorderStyle.SINGLE, size: 12, color: TEAL },
          right: { style: BorderStyle.NONE }
        },
        shading: { fill: TEAL_BG, type: ShadingType.CLEAR },
        margins: { top: 140, bottom: 140, left: 220, right: 200 },
        children: [
          new Paragraph({ children: [new TextRun({ text: name, bold: true, size: 22, font: 'Arial', color: PURPLE })] }),
          new Paragraph({ children: [new TextRun({ text: url, size: 18, font: 'Arial', color: TEAL })] }),
          sp(60),
          new Table({
            width: { size: 8900, type: WidthType.DXA },
            columnWidths: [2200, 2200, 2200, 2300],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
            rows: [new TableRow({ children: [
              new TableCell({ borders: NO_BORDERS, children: [
                new Paragraph({ children: [new TextRun({ text: 'Deadline', bold: true, size: 16, font: 'Arial', color: SUBTEXT })] }),
                new Paragraph({ children: [new TextRun({ text: deadline, size: 19, font: 'Arial', color: BODY })] })
              ]}),
              new TableCell({ borders: NO_BORDERS, children: [
                new Paragraph({ children: [new TextRun({ text: 'Team Size', bold: true, size: 16, font: 'Arial', color: SUBTEXT })] }),
                new Paragraph({ children: [new TextRun({ text: teamSize, size: 19, font: 'Arial', color: BODY })] })
              ]}),
              new TableCell({ borders: NO_BORDERS, children: [
                new Paragraph({ children: [new TextRun({ text: 'Prize / Award', bold: true, size: 16, font: 'Arial', color: SUBTEXT })] }),
                new Paragraph({ children: [new TextRun({ text: prize, size: 19, font: 'Arial', color: BODY })] })
              ]}),
              new TableCell({ borders: NO_BORDERS, children: [
                new Paragraph({ children: [new TextRun({ text: 'Key Note', bold: true, size: 16, font: 'Arial', color: SUBTEXT })] }),
                new Paragraph({ children: [new TextRun({ text: notes, size: 19, font: 'Arial', color: BODY })] })
              ]})
            ]})]
          })
        ]
      })
    ]})]
  });
}

// ─────────────────────────────────────────────────────────────────
// COVER PAGE
// ─────────────────────────────────────────────────────────────────
const coverTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [9360],
  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [
    new TableCell({
      borders: NO_BORDERS,
      shading: { fill: BLACK, type: ShadingType.CLEAR },
      margins: { top: 800, bottom: 800, left: 400, right: 400 },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'NORTHERN HIGHLANDS AI CLUB', size: 20, font: 'Arial', color: TEAL, bold: true })]
        }),
        sp(120),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'June 1, 2026', bold: true, size: 48, font: 'Arial', color: WHITE })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Meeting Roadmap', bold: true, size: 48, font: 'Arial', color: PURPLE_L })]
        }),
        sp(160),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Second-to-Last Meeting of the Year', size: 22, font: 'Arial', color: '9CA3AF' })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Room 133 @ 2:45', size: 22, font: 'Arial', color: TEAL })]
        }),
        sp(200),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Reid Sendroff + Ben Shamosh, Co-Presidents', size: 20, font: 'Arial', color: '9CA3AF' })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Mr. Michael Novak, Faculty Advisor', size: 20, font: 'Arial', color: '6B7280' })]
        }),
      ]
    })
  ]})]
});

// ─────────────────────────────────────────────────────────────────
// AGENDA OVERVIEW
// ─────────────────────────────────────────────────────────────────
const agendaSection = [
  sp(),
  h2('MEETING AGENDA AT A GLANCE'),
  timerRow('Pre-meeting setup', '2:40 PM', MUTED),
  timerRow('PART 1 — Leadership announcement + application process', '20 min', RED_ACC),
  timerRow('PART 1B — Running the club like a company (accountability framework)', '10 min', RED_ACC),
  timerRow('PART 2 — New AI tools and innovations', '25 min', PURPLE),
  timerRow('PART 3 — AI competitions and summer opportunities', '15 min', TEAL),
  timerRow('Closing + next meeting preview', '5 min', MUTED),
  sp(),
  callout('Why this meeting matters', 'School ends June 17. This is the second-to-last meeting. Leadership must be decided before summer so a Discord server and 2026-2027 plan can be built over break. Every item in this meeting feeds directly into that.', GOLD_BG, GOLD_ACC),
  sp(),
];

// ─────────────────────────────────────────────────────────────────
// PART 1 — LEADERSHIP
// ─────────────────────────────────────────────────────────────────
const part1 = [
  sectionHeader('PART 1 — LEADERSHIP', '20 minutes | The most important segment of the year'),
  sp(120),
  h2('The Problem — Say This Directly'),
  callout('Open with this, word for word', 'Reid is the club right now. He is up until midnight making this work. That is not sustainable and it is not the goal. The goal for next year is a club that runs on systems and people, not on one person burning out. Leadership next year has to actually do the work.', RED_BG, RED_ACC),
  sp(),
  body('The honest diagnosis: when we selected leadership in September 2025, we did interviews. We asked people about their experience. We did not see what they could build. That was a mistake. Claude Code did not exist yet. Vibe coding did not exist yet as a real workflow. The bar has changed completely and the selection process needs to change with it.'),
  sp(),
  h2('What We Need From Leadership in 2026-2027'),
  bullet('Run the three-post announcement system every single meeting without being asked'),
  bullet('Facilitate bi-weekly scrums (VP/COO): keep teams on time, follow up on blockers'),
  bullet('Manage API fund and parent donation drive (Treasurer): money tracked, teams funded'),
  bullet('Track attendance strictly: 75% minimum enforced, strikes logged (Secretary)'),
  bullet('Create content for Instagram and TikTok consistently (CMO): not one person, a system'),
  bullet('Build things. Leadership is not a title. It is a demonstrated output.'),
  sp(),
  callout('The new standard', 'Every leadership applicant must submit a vibe-coded AI project. This shows they can use the tools that exist now, not the tools that existed a year ago. An interview alone is not enough.', CARD_BG, PURPLE),
  sp(120),
  h2('Leadership Positions Open for 2026-2027'),
  twoCol('VP / Chief Operations Officer', '2 positions\nMeeting ops, scrum facilitation, one VP assigned as liaison to each project team.\nAccountability: if a meeting runs poorly, that is a VP/COO failure.', 'CMO / Social Media Manager', '2 positions\nAll Instagram, TikTok, and Discord posts. 3 posts per meeting, every meeting.\nAccountability: if a meeting happens without announcements, that is a CMO failure.', CARD_BG, BLUE_BG, PURPLE, BLUE_ACC),
  sp(80),
  twoCol('Treasurer', '2 positions\nParent donation drive (September), API fund distribution, monthly budget reports, reimbursements.\nAccountability: no team waits more than 5 days for funds.', 'Secretary', '2 positions\nAttendance at every meeting logged within 24 hours. Competition deadline calendar. Strike tracking. Room 133 open lab sign-ins.\nAccountability: if a member disputes a record and there is no documentation, that is a Secretary failure.', GOLD_BG, TEAL_BG, GOLD_ACC, TEAL),
  sp(120),
  h2('How to Apply'),
  callout('Application requirement', 'Build a vibe-coded AI project using any tool: Claude Code, OpenAI Codex, Cursor, Windsurf, or any agentic AI workflow. It does not have to be perfect. It has to be real. Show what you can build with the tools that exist today.', TEAL_BG, TEAL),
  sp(),
  bullet('Application opens: today, June 1, 2026'),
  bullet('Deadline to declare your position: June 8, 2026'),
  bullet('Option A: Present your project live at the final meeting (June 15, 2026)'),
  bullet('Option B: Submit a recorded demo by June 10, 2026'),
  bullet('Decisions announced: June 16, 2026 via Discord'),
  bullet('New leadership Discord server launched: June 17, 2026 (last day of school)'),
  sp(),
  h2('Selection Criteria'),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [4680, 4680],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [
      new TableRow({ children: [
        new TableCell({ borders: NO_BORDERS, shading: { fill: CARD_BG, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 160, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: 'Quality of the project', bold: true, size: 20, font: 'Arial', color: PURPLE })] }), new Paragraph({ children: [new TextRun({ text: 'Does it do something real? Would it work outside of a school demo?', size: 19, font: 'Arial', color: BODY })] })] }),
        new TableCell({ borders: NO_BORDERS, shading: { fill: BLUE_BG, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 160, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: 'Use of agentic AI tools', bold: true, size: 20, font: 'Arial', color: BLUE_ACC })] }), new Paragraph({ children: [new TextRun({ text: 'Did they use Claude Code, Codex, or another agent? Did they use it seriously?', size: 19, font: 'Arial', color: BODY })] })] })
      ]}),
      new TableRow({ children: [
        new TableCell({ borders: NO_BORDERS, shading: { fill: TEAL_BG, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 160, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: 'Communication', bold: true, size: 20, font: 'Arial', color: TEAL })] }), new Paragraph({ children: [new TextRun({ text: 'Can they explain what they built, how it works, and what it is for?', size: 19, font: 'Arial', color: BODY })] })] }),
        new TableCell({ borders: NO_BORDERS, shading: { fill: GOLD_BG, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 160, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: 'Fit for the role', bold: true, size: 20, font: 'Arial', color: GOLD_ACC })] }), new Paragraph({ children: [new TextRun({ text: 'Does what they built show the skills the position actually requires?', size: 19, font: 'Arial', color: BODY })] })] })
      ]}),
    ]
  }),
  sp(120),
  callout('Warning to current leadership', 'Anyone who holds a leadership position this year and wants to continue next year must apply on the same terms as everyone else. And this is the new standard going forward: if any leadership member does not meet their output expectations during the year, they will be replaced mid-year. The club is not a title. The role requires the work.', RED_BG, RED_ACC),
  sp(),
];

// ─────────────────────────────────────────────────────────────────
// PART 1B — RUNNING THE CLUB LIKE A COMPANY (ACCOUNTABILITY FRAMEWORK)
// ─────────────────────────────────────────────────────────────────
function pipField(label, desc) {
  return new TableRow({ children: [
    new TableCell({ borders: NO_BORDERS, width: { size: 2800, type: WidthType.DXA }, shading: { fill: CARD_BG, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 100 },
      children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 19, font: 'Arial', color: PURPLE })] })] }),
    new TableCell({ borders: NO_BORDERS, width: { size: 6560, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 100, right: 100 },
      children: [new Paragraph({ children: [new TextRun({ text: desc, size: 19, font: 'Arial', color: BODY })] })] }),
  ]});
}

const part1b = [
  sectionHeader('PART 1B — RUNNING THE CLUB LIKE A COMPANY', 'Leadership accountability framework | Draft for Ben to review'),
  sp(120),
  callout('For Ben — read this first', 'This is a proposal for how we run leadership in 2026-2027: treat every leadership seat like a real job. Each role gets a written job description, measurable expectations, deliverables due on specific dates, scheduled performance reviews with a grade, and a formal improvement-or-exit process if someone is not delivering. The goal is a high-functioning team where strong contribution is the standard, not the exception. Read it, mark it up, and we will align before we present any of this to the members.', GOLD_BG, GOLD_ACC),
  sp(),
  h2('The Core Idea'),
  body('We run the club like a company. Leadership is not an honorary title — it is a job function with a job description. Every role has written expectations, deliverables due on specific dates, and regular feedback measured against those expectations. If someone is consistently missing the mark, they go on a formal improvement plan with a deadline and clear targets. If they step up, they keep the role. If they do not, they are transitioned off the leadership team and a new person is brought in. This is exactly how a company protects the quality of its team, and it is how we keep the whole club operating at a high level instead of leaning on one or two people.'),
  sp(),
  h2('The Five Pillars'),
  bullet('Job descriptions — every role has a one-page charter: its mission, its responsibilities, and what "good" looks like in concrete terms.'),
  bullet('Measurable expectations (KPIs) — each role is graded on specific, countable outputs on a fixed cadence, not on impressions or effort.'),
  bullet('Review cadence — a monthly 1:1 check-in plus a formal review each marking period, every one producing a written grade.'),
  bullet('Improvement plan (PIP) — a clear, time-boxed path to fix underperformance before anyone is removed. No surprises, ever.'),
  bullet('Succession — a bench of runner-up applicants kept warm so that if a seat opens mid-year, the club never loses momentum.'),
  sp(120),
  h2('What Each Role Is Graded On'),
  body('These are the measurable expectations behind each title. They map directly to the positions in Part 1, so the same accountability runs end to end.'),
  sp(40),
  twoCol('VP / Chief Operations Officer', 'Meetings start and end on time. Every project team gets a scrum at least every 2 weeks. Blockers are logged and cleared within one week. Target: zero meetings run without a clear owner.', 'CMO / Social Media Manager', '3 posts per meeting across Instagram, TikTok, and Discord, published within 24 hours of each meeting. Monthly report on follower and engagement growth. Target: no meeting happens silently.', CARD_BG, BLUE_BG, PURPLE, BLUE_ACC),
  sp(80),
  twoCol('Treasurer', 'No team waits more than 5 days for funds. Monthly budget report delivered on time. Parent donation drive launched in September. Target: 100% of spending reconciled and documented.', 'Secretary', 'Attendance logged within 24 hours of every meeting. Strike records kept current. Competition-deadline calendar maintained. Target: every dispute resolvable from the documentation alone.', GOLD_BG, TEAL_BG, GOLD_ACC, TEAL),
  sp(120),
  h2('How Performance Is Graded'),
  body('Every role gets one of three simple statuses at each review. The status determines what happens next.'),
  sp(40),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3120, 3120, 3120],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [
      new TableCell({ borders: NO_BORDERS, shading: { fill: TEAL_BG, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 180, right: 80 },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'GREEN', bold: true, size: 24, font: 'Arial', color: TEAL })] }),
          new Paragraph({ children: [new TextRun({ text: 'Hitting all expectations. On track. Eligible for more ownership and recognition.', size: 19, font: 'Arial', color: BODY })] })
        ]}),
      new TableCell({ borders: NO_BORDERS, shading: { fill: GOLD_BG, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 180, right: 80 },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'YELLOW', bold: true, size: 24, font: 'Arial', color: GOLD_ACC })] }),
          new Paragraph({ children: [new TextRun({ text: 'Missing some expectations. Written feedback plus a 2-week window to fix it.', size: 19, font: 'Arial', color: BODY })] })
        ]}),
      new TableCell({ borders: NO_BORDERS, shading: { fill: RED_BG, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 180, right: 80 },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'RED', bold: true, size: 24, font: 'Arial', color: RED_ACC })] }),
          new Paragraph({ children: [new TextRun({ text: 'Consistently missing, or two Yellows in a row. Triggers a formal improvement plan.', size: 19, font: 'Arial', color: BODY })] })
        ]})
    ]})]
  }),
  sp(120),
  h2('Review Cadence'),
  bullet('Monthly 1:1 — each leader meets with a co-president for 10 minutes: what got done, what is blocked, what is next.'),
  bullet('Marking-period review — a formal status (Green / Yellow / Red) is assigned in writing against the role’s expectations.'),
  bullet('End-of-semester review — overall standing, what the role should own next semester, and any role changes.'),
  bullet('Everything is documented by the Secretary so the process is fair, consistent, and never based on memory.'),
  sp(120),
  h2('The Improvement Plan (PIP)'),
  callout('How it works', 'A Red status — or a repeated Yellow — puts a leader on a Performance Improvement Plan. The PIP is a short written agreement: here is exactly what is missing, here is exactly what you need to deliver, and here is the date. The leader keeps their role and full support during the window. At the deadline there are only two outcomes: back on track, or transitioned off the team.', CARD_BG, PURPLE),
  sp(),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 6560],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [
      pipField('Trigger', 'One Red status, or two consecutive Yellow statuses, on the role’s graded expectations.'),
      pipField('Length', '2 to 3 weeks — long enough to show real change, short enough to protect the club.'),
      pipField('Contents', 'The specific expectations being missed, the exact deliverables required to clear it, and the due date — all in writing.'),
      pipField('Support', 'Full access to the co-presidents and advisor. The point is to help the person succeed, not to set them up to fail.'),
      pipField('Sign-off', 'Reviewed and agreed to by both co-presidents and the faculty advisor before it starts.'),
      pipField('Outcomes', 'Met the plan: back to Green and the role continues. Did not: transitioned off the leadership team.'),
    ]
  }),
  sp(120),
  h2('Succession — No Gaps'),
  callout('If a seat opens', 'Because applications require a real project, we will have strong runner-up candidates. We keep that shortlist as a bench. If a leader is transitioned off, we go to the bench, give the next person the role charter, and the club keeps moving. No seat sits empty and no work stalls.', TEAL_BG, TEAL),
  sp(),
  callout('The other side of accountability', 'This cuts both ways. Leaders who stay Green get the upside: more ownership, public credit, first pick of the best projects and competition teams, and a real recommendation from us. Accountability and recognition are the same system — we hold a high bar and we reward the people who clear it.', GOLD_BG, GOLD_ACC),
  sp(),
  callout('Talking point for the meeting', 'Frame it as professional, not punitive: "We are running this like a company because we respect your time and we want this on your resume to mean something. Real role, real expectations, real review — and real credit when you deliver."', RED_BG, RED_ACC),
  sp(),
];

// ─────────────────────────────────────────────────────────────────
// PART 2 — AI TOOLS
// ─────────────────────────────────────────────────────────────────
const part2 = [
  sectionHeader('PART 2 — AI TOOLS AND INNOVATIONS', '25 minutes | What the AI landscape looks like right now'),
  sp(120),
  h2('Claude Opus 4.8', PURPLE),
  body('Released May 28, 2026. This is the model available in this session right now.'),
  sp(40),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3120, 3120, 3120],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [
      new TableCell({ borders: NO_BORDERS, shading: { fill: CARD_BG, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 180, right: 80 },
        children: [
          new Paragraph({ children: [new TextRun({ text: '1M tokens', bold: true, size: 28, font: 'Arial', color: PURPLE })] }),
          new Paragraph({ children: [new TextRun({ text: 'Context window. Feed it your entire codebase at once.', size: 19, font: 'Arial', color: BODY })] })
        ]}),
      new TableCell({ borders: NO_BORDERS, shading: { fill: TEAL_BG, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 180, right: 80 },
        children: [
          new Paragraph({ children: [new TextRun({ text: '96.7%', bold: true, size: 28, font: 'Arial', color: TEAL })] }),
          new Paragraph({ children: [new TextRun({ text: 'USAMO 2026 math score. Up from 69.3% on previous version.', size: 19, font: 'Arial', color: BODY })] })
        ]}),
      new TableCell({ borders: NO_BORDERS, shading: { fill: BLUE_BG, type: ShadingType.CLEAR }, margins: { top: 140, bottom: 140, left: 180, right: 80 },
        children: [
          new Paragraph({ children: [new TextRun({ text: '69.2%', bold: true, size: 28, font: 'Arial', color: BLUE_ACC })] }),
          new Paragraph({ children: [new TextRun({ text: 'SWE-bench Pro. 4x fewer flawed code passages than Opus 4.7.', size: 19, font: 'Arial', color: BODY })] })
        ]})
    ]})]
  }),
  sp(120),
  h2('Claude Code Dynamic Workflows', PURPLE),
  callout('What it does', 'Claude Code now writes JavaScript orchestration scripts that run 10-100+ parallel subagents in the background while your session stays clean and responsive. This is not a chat tool anymore. It is an orchestration engine.', CARD_BG, PURPLE),
  sp(),
  bullet('/plan — Think through the entire approach before touching any files. Claude builds a numbered plan you approve. Press Ctrl+G to edit the plan directly instead of typing changes in chat.'),
  bullet('/goal — Autonomous loop. Claude plans, executes, verifies, repeats until your goal is met. No manual intervention between cycles.'),
  bullet('/workflows — View all saved workflows. Press S on any run to save it as a reusable slash command. Run complex automations in one keystroke after that.'),
  bullet('Ultracode mode — Claude auto-orchestrates every complex task without being asked. Plans workflows automatically, runs them in the background.'),
  sp(80),
  h2('Top Claude Code Tricks', PURPLE),
  bullet('Subagent parallelization: 8 files, 4 subagents, 2 files each. Runs simultaneously. 50-70% faster than sequential.'),
  bullet('Worktrees: each session gets an isolated repo copy with its own branch. Try multiple approaches without conflicts.'),
  bullet('Hooks: enforce project rules automatically. Run tests before stopping. Block edits to protected files. Require issue IDs in commits.'),
  bullet('MCP tools: connect Claude directly to GitHub, Linear, Postgres. Claude finds a bug, creates a ticket automatically.'),
  bullet('Background agents: spawn agents to work async while you continue something else in the main session.'),
  bullet('Per-agent model routing: Opus for hard reasoning, Haiku for high-volume cheap tasks.'),
  sp(80),
  h2('OpenAI Codex CLI', BLUE_ACC),
  twoCol('Codex CLI', 'Terminal-based. Runs in containerized sandboxes. Good for speed when you know exactly what you want. Uses AGENTS.md as its config file.', 'Claude Code', 'Collaborative. Explains its thinking. Better for learning and complex multi-file projects. Uses CLAUDE.md. Currently winning on SWE-bench Pro (69.2% vs GPT 58.6%).', BLUE_BG, CARD_BG, BLUE_ACC, PURPLE),
  sp(80),
  h2('Hermes 4.3 by Nous Research'),
  callout('Open-source frontier model', 'Built on ByteDance Seed 36B. First model trained via the decentralized Psyche network instead of traditional GPU clusters. Strong math and science reasoning. Runs locally on your own hardware with no API cost. This is the gold standard open-source reasoning model available right now.', TEAL_BG, TEAL),
  sp(80),
  h2('OpenClaw'),
  callout('The viral open-source AI agent', '350,000+ GitHub stars. Grew faster than React. A personal AI agent that connects AI models to your local files, WhatsApp, and Discord. 100+ preconfigured AgentSkills. Model-agnostic: bring your own API keys or run local models. MIT licensed. Built by Peter Steinberger (PSPDFKit founder), now governed by an independent open-source foundation after Steinberger joined OpenAI.', CARD_BG, PURPLE),
  sp(),
];

// ─────────────────────────────────────────────────────────────────
// PART 3 — COMPETITIONS
// ─────────────────────────────────────────────────────────────────
const part3 = [
  sectionHeader('PART 3 — AI COMPETITIONS', '15 minutes | What to build toward this summer and next year'),
  sp(120),
  callout('The strategy', 'Most of these competitions reward exactly what the club builds: real AI applications, strong technical depth, and clear communication. The teams of 4 we are building next year are optimally sized for Congressional App Challenge and most hackathons. Start building over summer. Submit in the fall.', GOLD_BG, GOLD_ACC),
  sp(120),
  h2('Primary Competitions'),
  competitionCard(
    'USA AI Olympiad (USAAIO)',
    'usaaio.org',
    'Round 1: Feb 19, 2027',
    'Individual',
    'International team selection (Team USA)',
    'Most prestigious individual AI competition in the US. Qualify for IOAI.'
  ),
  sp(80),
  competitionCard(
    'Congressional App Challenge',
    'congressionalappchallenge.us',
    'October 26, 2026',
    'Up to 4 members',
    'Display in US Capitol + DC trip',
    'Our primary team competition target. 240+ winners invited to Washington.'
  ),
  sp(80),
  competitionCard(
    'International AI Innovation Olympiad (IAI2O)',
    'iai2o-official.org',
    'Check site for 2026-2027',
    'Up to 4 members',
    'International medals',
    'International prestige. Check registration dates for next cycle.'
  ),
  sp(80),
  competitionCard(
    'Presidential AI Challenge',
    'ai.gov/initiatives/presidential-challenge',
    '2027 cycle opens later this year',
    'Team-based',
    'Cash prizes + White House trip (national winners)',
    'National finalist trip to White House. Watch for 2027 registration.'
  ),
  sp(80),
  competitionCard(
    'Canada AI Olympiad',
    'iaiocanada.com',
    'Check site for dates',
    'Individual qualifier, teams for international',
    'Medals + certificates',
    'Open to USA students for competitive rounds. Good benchmark.'
  ),
  sp(120),
  h2('Act Now — Happening This Month'),
  callout('USAII Global AI Hackathon — hack-nation.ai', 'Building week: June 14-21, 2026. That is next week. High school category grand prize: $6,000. Total prize pool $15,000+. Virtual, teams up to 5. Register now.', RED_BG, RED_ACC),
  sp(80),
  callout('USAII AI NextGen Challenge — usaii.org', 'National Hackathon: June 20-21, 2026 in Atlanta. Up to $25,000 per team. 250 students selected for 50 teams. Check eligibility and apply immediately.', GOLD_BG, GOLD_ACC),
  sp(120),
  h2('Additional Competitions Worth Tracking'),
  bullet('World AI Competition for Youth (WAICY) — waicy.org — Ages 6-18, global, multiple tracks including AI Showcase and LLM apps'),
  bullet('OpenCV AI Competition — opencv.org — First prize $5,000. Open to age 13+. Teams of up to 3.'),
  bullet('Regeneron ISEF — societyforscience.org/isef — Via local science fair. Nearly $9M in total awards. International prestige.'),
  sp(),
];

// ─────────────────────────────────────────────────────────────────
// CLOSING
// ─────────────────────────────────────────────────────────────────
const closing = [
  sectionHeader('CLOSING', '5 minutes | What happens next'),
  sp(120),
  h2('Before Summer Ends'),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 6560],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [
      ['June 8', 'Leadership application deadline. Declare your position.'],
      ['June 10', 'Recorded demo deadline (alternative to live presentation).'],
      ['June 15', 'Final meeting. Live project presentations.'],
      ['June 16', 'Leadership decisions announced via Discord.'],
      ['June 17', 'School ends. New leadership Discord server launched.'],
      ['June 14-21', 'USAII Global AI Hackathon building week. Register now.'],
      ['June 20-21', 'USAII NextGen Challenge hackathon in Atlanta.'],
      ['October 26', 'Congressional App Challenge deadline. Start building this summer.'],
    ].map(([date, task]) => new TableRow({ children: [
      new TableCell({ borders: NO_BORDERS, shading: { fill: CARD_BG, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: date, bold: true, size: 19, font: 'Arial', color: PURPLE })] })] }),
      new TableCell({ borders: NO_BORDERS, shading: { fill: WHITE, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: task, size: 19, font: 'Arial', color: BODY })] })] }),
    ]}))
  }),
  sp(120),
  callout('Final meeting — June 15', 'Leadership project presentations. This is not optional for anyone who wants a position next year. Come prepared to show what you built and explain how you used AI tools to build it.', CARD_BG, PURPLE),
  sp(120),
  new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ text: '— Reid & Ben', bold: true, size: 22, font: 'Arial', color: PURPLE })],
    spacing: { before: 200 }
  }),
  new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ text: 'Northern Highlands AI Club, June 1, 2026', size: 18, font: 'Arial', color: MUTED })]
  }),
];

// ─────────────────────────────────────────────────────────────────
// ASSEMBLE DOCUMENT
// ─────────────────────────────────────────────────────────────────
const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 }
      }
    },
    children: [
      coverTable,
      new Paragraph({ children: [new TextRun({ text: '', size: 1 })], pageBreakBefore: true }),
      ...agendaSection,
      new Paragraph({ children: [new TextRun({ text: '', size: 1 })], pageBreakBefore: true }),
      ...part1,
      new Paragraph({ children: [new TextRun({ text: '', size: 1 })], pageBreakBefore: true }),
      ...part1b,
      new Paragraph({ children: [new TextRun({ text: '', size: 1 })], pageBreakBefore: true }),
      ...part2,
      new Paragraph({ children: [new TextRun({ text: '', size: 1 })], pageBreakBefore: true }),
      ...part3,
      new Paragraph({ children: [new TextRun({ text: '', size: 1 })], pageBreakBefore: true }),
      ...closing,
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('C:/Projects/AI_Club_Brain/AI_Club_June1_Meeting_Plan.docx', buffer);
  console.log('Done: AI_Club_June1_Meeting_Plan.docx');
}).catch(e => { console.error(e); process.exit(1); });
