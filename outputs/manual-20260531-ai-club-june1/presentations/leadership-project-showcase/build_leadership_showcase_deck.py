from __future__ import annotations

import shutil
from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFont, ImageFilter


SRC = Path(r"C:\Users\reid\Downloads\June_1st_Presentation (1).pptx")
OUT = Path(r"C:\Users\reid\Downloads\June_1st_Presentation_Leadership_Showcase_Final.pptx")
BACKUP = Path(r"C:\Users\reid\Downloads\June_1st_Presentation_before_leadership_showcase_update.pptx")
WORK = Path(r"C:\Projects\AI_Club_Brain\outputs\manual-20260531-ai-club-june1\presentations\leadership-project-showcase")
SLIDES = WORK / "generated_slides"

W, H = 3840, 2160
SCALE_X = W / 1440
SCALE_Y = H / 810

FONT_DIR = Path(r"C:\Windows\Fonts")
FONT_BOLD = FONT_DIR / "segoeuib.ttf"
FONT_REG = FONT_DIR / "segoeui.ttf"
FONT_LIGHT = FONT_DIR / "segoeuil.ttf"
FONT_MONO = FONT_DIR / "consola.ttf"

BG = (5, 10, 19)
GRID = (22, 36, 58)
WHITE = (235, 241, 252)
MUTED = (144, 157, 180)
BLUE = (126, 166, 255)
BLUE2 = (84, 128, 244)
CARD = (13, 24, 42)
CARD2 = (16, 30, 54)
LINE = (38, 67, 112)


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def wrap_text(text: str, width: int) -> list[str]:
    return textwrap.wrap(text, width=width, break_long_words=False)


def text(draw: ImageDraw.ImageDraw, xy, s, size=54, fill=WHITE, bold=False, light=False, mono=False, anchor=None, spacing=8):
    path = FONT_MONO if mono else FONT_BOLD if bold else FONT_LIGHT if light else FONT_REG
    draw.multiline_text(xy, s, font=font(path, size), fill=fill, spacing=spacing, anchor=anchor)


def base(label: str = "leadership selection") -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 128):
        d.line((x, 0, x, H), fill=GRID, width=1)
    for y in range(0, H, 128):
        d.line((0, y, W, y), fill=GRID, width=1)

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((2520, -460, 4420, 1040), fill=(42, 92, 185, 58))
    gd.ellipse((-520, 1200, 760, 2680), fill=(18, 60, 132, 35))
    img = Image.alpha_composite(img.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(110))).convert("RGB")
    d = ImageDraw.Draw(img)

    text(d, (130, 110), f"* {label.upper()}", size=38, fill=BLUE, mono=True)
    text(d, (130, H - 92), "NORTHERN HIGHLANDS AI CLUB", size=31, fill=(77, 94, 122), mono=True)
    d.line((130, H - 140, W - 130, H - 140), fill=(20, 34, 57), width=2)
    return img, d


def bullet(draw, x, y, body, width=52, size=42, gap=58, fill=MUTED, marker=BLUE):
    lines = wrap_text(body, width)
    draw.text((x, y + 10), ">", font=font(FONT_MONO, size), fill=marker)
    draw.multiline_text((x + 70, y), "\n".join(lines), font=font(FONT_REG, size), fill=fill, spacing=12)
    return y + max(gap, len(lines) * (size + 14) + 18)


def card(draw, xy, wh, title, body, accent=BLUE, title_size=52, body_size=34):
    x, y = xy
    w, h = wh
    draw.rounded_rectangle((x, y, x + w, y + h), radius=18, fill=CARD, outline=LINE, width=2)
    draw.rectangle((x, y, x + 14, y + h), fill=accent)
    text(draw, (x + 46, y + 42), title, size=title_size, bold=True)
    wrapped = "\n".join(wrap_text(body, 45))
    text(draw, (x + 46, y + 128), wrapped, size=body_size, fill=MUTED, spacing=10)


def slide_best_project(path: Path):
    img, d = base("the new bar")
    text(d, (130, 360), "Create your\nbest project.", size=178, bold=True, spacing=18)
    text(d, (130, 790), "Showcase it on June 15.", size=92, fill=BLUE, bold=True)
    y = 1010
    y = bullet(d, 145, y, "This is the leadership signal: build something real, then explain it clearly.", width=72, size=48)
    y = bullet(d, 145, y, "Any tool is allowed: Claude Code, Codex, Cursor, Windsurf, Replit, ChatGPT, Gemini, Python, JavaScript, anything.", width=82, size=43)
    y = bullet(d, 145, y, "It does not have to be perfect. It has to show ownership, taste, effort, and learning.", width=78, size=43)
    card(d, (2240, 440), (1260, 360), "June 15", "Everyone applying for leadership presents what they built.", BLUE)
    card(d, (2240, 860), (1260, 360), "5 minute demo", "Short, focused, real. Problem, build, tools, result, next step.", (68, 118, 255))
    card(d, (2240, 1280), (1260, 360), "Go as long as we can", "If many people apply, we keep moving. The goal is to see the work.", (96, 145, 255))
    img.save(path)


def slide_three_signals(path: Path):
    img, d = base("what june 15 proves")
    text(d, (130, 330), "We are looking for\nthree signals.", size=150, bold=True, spacing=10)
    text(d, (130, 720), "Leadership is not just a title. It is evidence that you can build, persist, and communicate.", size=58, fill=MUTED)
    card(d, (220, 1030), (1040, 520), "01  Grit", "Did you keep going when the project got annoying? Did you solve blockers or quit when it got inconvenient?", BLUE)
    card(d, (1400, 1030), (1040, 520), "02  AI + build skill", "Can you use modern AI tools, vibe-code intelligently, debug, wire pieces together, and make something usable?", (92, 137, 255))
    card(d, (2580, 1030), (1040, 520), "03  Presentation skill", "Can you explain your work in a way people understand? Are you clear, personable, and credible in front of the room?", (144, 176, 255))
    text(d, (130, 1790), "Presentation skill matters a lot. Officers represent the club, teach members, pitch projects, and keep people bought in.", size=48, fill=WHITE)
    img.save(path)


def slide_june15_format(path: Path):
    img, d = base("june 15 format")
    text(d, (130, 325), "The June 15 meeting\nis the tryout.", size=146, bold=True, spacing=10)
    text(d, (130, 705), "Anyone who wants leadership should be ready to present live.", size=64, fill=BLUE, bold=True)
    left_x, right_x = 180, 2140
    y = 970
    text(d, (left_x, y), "Demo structure", size=58, bold=True)
    y += 120
    for item in [
        "What did you build?",
        "Why did you build it?",
        "What tools did you use?",
        "What broke, and how did you fix it?",
        "What would you improve next?",
    ]:
        y = bullet(d, left_x, y, item, width=50, size=44, gap=74)
    card(d, (right_x, 950), (1320, 280), "Before June 15", "Submit your project link and short description in Canvas.", BLUE)
    card(d, (right_x, 1280), (1320, 280), "During the meeting", "Give a short demo. Keep it tight. Show the actual thing.", (86, 130, 250))
    card(d, (right_x, 1610), (1320, 280), "After the meeting", "Reid and Ben review the evidence and choose the leadership team.", (126, 160, 255))
    img.save(path)


def slide_scorecard(path: Path):
    img, d = base("selection scorecard")
    text(d, (130, 300), "How leadership gets decided.", size=130, bold=True)
    text(d, (130, 485), "We are not guessing. We are looking at observable evidence.", size=58, fill=MUTED)
    headers = ["Signal", "What we look for", "Why it matters"]
    xs = [150, 930, 2390]
    widths = [700, 1340, 1240]
    y0 = 720
    for x, w, h in zip(xs, widths, headers):
        d.rounded_rectangle((x, y0, x+w, y0+96), radius=14, fill=(20, 38, 70), outline=LINE, width=2)
        text(d, (x+32, y0+24), h, size=34, fill=BLUE, bold=True)
    rows = [
        ("Grit", "Recovered from errors, kept building, improved after feedback.", "Officers hit problems every week."),
        ("AI skill", "Used AI tools well, not blindly. Prompted, debugged, connected pieces.", "The club runs on modern AI workflows."),
        ("Coding / vibe-coding", "Built a real artifact, even if simple. Showed technical taste.", "We need builders, not just talkers."),
        ("Presentation", "Explained clearly, handled questions, came across as credible.", "Personable skills are non-negotiable."),
        ("Role fit", "Matched the project and behavior to a real club need.", "Different roles need different strengths."),
    ]
    y = y0 + 120
    row_h = 210
    for i, row in enumerate(rows):
        fill = CARD if i % 2 == 0 else CARD2
        for x, w, val in zip(xs, widths, row):
            d.rounded_rectangle((x, y, x+w, y+row_h-18), radius=14, fill=fill, outline=(25, 44, 74), width=1)
            size = 45 if x == xs[0] else 34
            text(d, (x+32, y+38), "\n".join(wrap_text(val, 42 if x != xs[0] else 14)), size=size, bold=(x == xs[0]), fill=WHITE if x == xs[0] else MUTED, spacing=8)
        y += row_h
    img.save(path)


def slide_roles(path: Path):
    img, d = base("roles and fit")
    text(d, (130, 300), "Different roles need\ndifferent strengths.", size=138, bold=True, spacing=8)
    text(d, (130, 670), "Not everyone has to be the same kind of leader. Everyone has to contribute at a high level.", size=54, fill=MUTED)
    cards = [
        ("VP / COO", "Runs meeting ops, project-team check-ins, scrums, blockers, and follow-through.", "Ops + reliability + people skills"),
        ("CMO / Social Media", "Creates announcements, posts, clips, project showcases, and speaker promotion.", "Communication + taste + consistency"),
        ("Treasurer", "Tracks API budgets, parent donations, reimbursements, and project resources.", "Trust + organization + detail"),
        ("Secretary", "Owns attendance, notes, sign-ins, deadlines, Canvas records, and the AI Club Brain.", "Systems + accuracy + memory"),
        ("TA / Admin Assistant", "Helps members during meetings, supports presentations, and jumps into messy tasks.", "Helpfulness + range + energy"),
        ("Project Leads", "Lead specific builds, keep teams moving, and make demos real.", "Technical ownership + grit"),
    ]
    x0, y0 = 150, 940
    cw, ch = 1120, 310
    for i, (title, body, skill) in enumerate(cards):
        x = x0 + (i % 3) * 1220
        y = y0 + (i // 3) * 390
        card(d, (x, y), (cw, ch), title, body + "\n\n" + skill, BLUE if i % 3 == 0 else (92, 137, 255), title_size=46, body_size=30)
    img.save(path)


def slide_reid_ben(path: Path):
    img, d = base("what reid and ben own")
    text(d, (130, 300), "What Reid and Ben do.", size=138, bold=True)
    text(d, (130, 500), "The officer team should make the club stronger without making Reid the bottleneck.", size=56, fill=MUTED)
    card(d, (220, 820), (1560, 720), "Reid", "Technical vision, advanced projects, AI workflows, competition strategy, project quality bar, and the hardest demos.", BLUE, title_size=66, body_size=42)
    card(d, (2060, 820), (1560, 720), "Ben", "Operations, meeting execution, calendar discipline, officer accountability, and making sure plans become real.", (92, 137, 255), title_size=66, body_size=42)
    text(d, (220, 1710), "The point of leadership is not to watch Reid and Ben do everything. The point is to own a function so the club can scale.", size=52, fill=WHITE)
    img.save(path)


def slide_canvas(path: Path):
    img, d = base("what to do now")
    text(d, (130, 310), "Your next step is simple.", size=138, bold=True)
    text(d, (130, 500), "Pick a project, build it, submit it, then be ready to present.", size=64, fill=BLUE, bold=True)
    steps = [
        ("01", "Choose your best project", "AI app, automation, website, data project, game, agent, research prototype, or anything real."),
        ("02", "Submit it in Canvas", "Add the link, a short description, tools used, and the role you want."),
        ("03", "Prepare a 5 minute demo", "Show the actual project. Explain what you built and what you learned."),
        ("04", "Present on June 15", "Everyone applying for leadership should be ready to share live."),
    ]
    y = 820
    for n, title, body in steps:
        d.rounded_rectangle((230, y, 3560, y+230), radius=18, fill=CARD, outline=LINE, width=2)
        text(d, (300, y+55), n, size=62, fill=BLUE, mono=True)
        text(d, (520, y+42), title, size=54, bold=True)
        text(d, (520, y+118), body, size=38, fill=MUTED)
        y += 285
    img.save(path)


def slide_timeline(path: Path):
    img, d = base("application timeline")
    text(d, (130, 300), "The leadership timeline.", size=134, bold=True)
    text(d, (130, 490), "One plan: build the project, submit it, present it, then we decide based on evidence.", size=54, fill=MUTED)
    items = [
        ("JUN 01", "Process announced", "Leadership expectations, roles, and project showcase explained."),
        ("JUN 08", "Guest speaker + build week", "Keep building. Use the week to improve the project and get unstuck."),
        ("JUN 15", "Project showcase", "Every leadership applicant presents the best thing they built."),
        ("JUN 16", "Reid + Ben review", "We compare evidence, role fit, reliability, and presentation quality."),
        ("JUN 17", "Decisions announced", "New leadership server launches before summer starts."),
    ]
    y = 760
    for date, title, body in items:
        d.rounded_rectangle((210, y, 3600, y + 220), radius=18, fill=CARD, outline=LINE, width=2)
        text(d, (290, y + 56), date, size=48, fill=BLUE, mono=True)
        text(d, (650, y + 42), title, size=54, bold=True)
        text(d, (650, y + 120), body, size=38, fill=MUTED)
        y += 250
    text(d, (210, 1960), "If many people apply, the meeting may run long. That is fine. The work is the point.", size=44, fill=WHITE)
    img.save(path)


def slide_audit_summary(path: Path):
    img, d = base("why this changed")
    text(d, (130, 310), "The bar is higher,\nbut clearer.", size=146, bold=True, spacing=8)
    text(d, (130, 700), "We are choosing leaders based on what they can actually do.", size=62, fill=BLUE, bold=True)
    y = 980
    for item in [
        "Old frame: apply for a title. New frame: show proof of work.",
        "Old frame: vibe-coded AI project. New frame: your best project, built with any tool.",
        "Old frame: technical skill only. New frame: grit, AI/build skill, and presentation skill.",
        "Old frame: everyone is the same candidate. New frame: match people to the role where they can actually deliver.",
    ]:
        y = bullet(d, 170, y, item, width=92, size=48, gap=90)
    img.save(path)


def slide_final_meeting(path: Path):
    img, d = base("final meeting, june 15")
    text(d, (130, 320), "Show what you built.", size=150, bold=True)
    text(d, (130, 520), "Explain how you used the tools.", size=84, fill=BLUE, bold=True)
    text(d, (130, 710), "This is where leadership becomes obvious.", size=58, fill=MUTED)
    card(d, (250, 1020), (970, 430), "Build", "Create your strongest project with whatever tools help you move fastest.", BLUE)
    card(d, (1435, 1020), (970, 430), "Submit", "Put the link, role choice, short description, and tools used into Canvas.", (92, 137, 255))
    card(d, (2620, 1020), (970, 430), "Present", "Give a focused live demo. Be clear, personable, and ready for questions.", (144, 176, 255))
    text(d, (250, 1710), "Leadership candidates should treat this as required. We are looking for grit, AI skill, coding or vibe-coding ability, and presentation skill.", size=48, fill=WHITE)
    img.save(path)


GENERATORS = {
    "replace_05.png": slide_best_project,
    "insert_after_05_what_june15_proves.png": slide_three_signals,
    "insert_after_05_format.png": slide_june15_format,
    "replace_12.png": slide_canvas,
    "replace_13.png": slide_timeline,
    "replace_14.png": slide_scorecard,
    "insert_after_14_roles.png": slide_roles,
    "insert_after_14_reid_ben.png": slide_reid_ben,
    "insert_after_14_audit.png": slide_audit_summary,
    "replace_23.png": slide_final_meeting,
}


def generate_images():
    SLIDES.mkdir(parents=True, exist_ok=True)
    for name, fn in GENERATORS.items():
        fn(SLIDES / name)


def main():
    generate_images()
    print(f"GENERATED_SLIDES={SLIDES}")


if __name__ == "__main__":
    main()
