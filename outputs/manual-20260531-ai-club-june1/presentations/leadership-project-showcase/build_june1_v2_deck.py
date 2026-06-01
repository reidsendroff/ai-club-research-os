from __future__ import annotations

from pathlib import Path
import textwrap
import math
import random

from PIL import Image, ImageDraw, ImageFont, ImageFilter


WORK = Path(r"C:\Projects\AI_Club_Brain\outputs\manual-20260531-ai-club-june1\presentations\leadership-project-showcase")
SLIDES = WORK / "v2_generated_slides"
OUT = Path(r"C:\Users\reid\Downloads\June_1st_Presentation_Leadership_Showcase_V2_Audited.pptx")
CONTACT = WORK / "v2_contact_sheet.png"
ASSETS = WORK / "assets"

W, H = 3840, 2160
FONT_DIR = Path(r"C:\Windows\Fonts")
FONT_BOLD = FONT_DIR / "segoeuib.ttf"
FONT_REG = FONT_DIR / "segoeui.ttf"
FONT_LIGHT = FONT_DIR / "segoeuil.ttf"
FONT_MONO = FONT_DIR / "consola.ttf"

BG = (5, 10, 19)
GRID = (21, 36, 59)
WHITE = (235, 241, 252)
MUTED = (154, 169, 195)
BLUE = (126, 166, 255)
BLUE2 = (96, 138, 255)
CARD = (13, 24, 42)
CARD2 = (16, 30, 54)
LINE = (43, 74, 122)
OK = (126, 240, 190)


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def wrap(s: str, chars: int) -> str:
    return "\n".join(textwrap.wrap(s, chars, break_long_words=False))


def text(d: ImageDraw.ImageDraw, xy, s: str, size=48, fill=WHITE, bold=False, light=False, mono=False, spacing=8, anchor=None):
    path = FONT_MONO if mono else FONT_BOLD if bold else FONT_LIGHT if light else FONT_REG
    d.multiline_text(xy, s, font=font(path, size), fill=fill, spacing=spacing, anchor=anchor)


def base(kicker="leadership", page: int | None = None) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 128):
        d.line((x, 0, x, H), fill=GRID, width=1)
    for y in range(0, H, 128):
        d.line((0, y, W, y), fill=GRID, width=1)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((2400, -540, 4500, 980), fill=(42, 92, 185, 55))
    gd.ellipse((-700, 1350, 870, 2700), fill=(18, 60, 132, 32))
    img = Image.alpha_composite(img.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(110))).convert("RGB")
    d = ImageDraw.Draw(img)
    text(d, (128, 92), f"* {kicker.upper()}", size=34, fill=BLUE, mono=True)
    text(d, (128, H - 78), "NORTHERN HIGHLANDS AI CLUB", size=28, fill=(82, 99, 129), mono=True)
    if page is not None:
        text(d, (W - 175, H - 82), f"{page:02d}", size=28, fill=(82, 99, 129), mono=True)
    return img, d


def bullet(d, x, y, body, chars=70, size=42, fill=MUTED, gap=86, marker=BLUE):
    text(d, (x, y + 4), ">", size=size, fill=marker, mono=True)
    text(d, (x + 70, y), wrap(body, chars), size=size, fill=fill, spacing=10)
    lines = max(1, len(textwrap.wrap(body, chars, break_long_words=False)))
    return y + max(gap, lines * (size + 18))


def card(d, x, y, w, h, title, body, accent=BLUE, title_size=46, body_size=33):
    d.rounded_rectangle((x, y, x + w, y + h), radius=18, fill=CARD, outline=LINE, width=2)
    d.rectangle((x, y, x + 14, y + h), fill=accent)
    text(d, (x + 48, y + 40), title, size=title_size, bold=True)
    text(d, (x + 48, y + 118), wrap(body, 46), size=body_size, fill=MUTED, spacing=9)


def arrow(d, x1, y1, x2, y2, fill=BLUE, width=8):
    d.line((x1, y1, x2, y2), fill=fill, width=width)
    if x2 >= x1:
        pts = [(x2, y2), (x2 - 34, y2 - 24), (x2 - 34, y2 + 24)]
    else:
        pts = [(x2, y2), (x2 + 34, y2 - 24), (x2 + 34, y2 + 24)]
    d.polygon(pts, fill=fill)


def node(d, x, y, w, h, title, body="", accent=BLUE, num=None, title_size=42, body_size=30):
    d.rounded_rectangle((x, y, x + w, y + h), radius=22, fill=CARD, outline=LINE, width=3)
    d.rectangle((x, y, x + 12, y + h), fill=accent)
    if num:
        text(d, (x + 42, y + 34), num, size=34, fill=accent, mono=True)
        title_y = y + 88
    else:
        title_y = y + 42
    text(d, (x + 42, title_y), title, size=title_size, fill=WHITE, bold=True)
    if body:
        text(d, (x + 42, title_y + 72), wrap(body, 36), size=body_size, fill=MUTED, spacing=8)


def circle_node(d, cx, cy, r, title, body="", accent=BLUE):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=CARD, outline=accent, width=5)
    text(d, (cx, cy - 42), title, size=34, fill=WHITE, bold=True, anchor="mm")
    if body:
        text(d, (cx, cy + 32), wrap(body, 20), size=24, fill=MUTED, spacing=6, anchor="mm")


def make_visual(kind: str, w: int, h: int) -> Image.Image:
    rng = random.Random(kind)
    panel = Image.new("RGB", (w, h), (5, 10, 19))
    pd = ImageDraw.Draw(panel)
    for y in range(h):
        t = y / max(1, h - 1)
        r = int(5 + 8 * t)
        g = int(10 + 18 * t)
        b = int(19 + 42 * t)
        pd.line((0, y, w, y), fill=(r, g, b))
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((int(w * .45), -int(h * .25), int(w * 1.25), int(h * .65)), fill=(70, 125, 255, 82))
    gd.ellipse((-int(w * .25), int(h * .55), int(w * .45), int(h * 1.25)), fill=(82, 235, 190, 42))
    panel = Image.alpha_composite(panel.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(70))).convert("RGB")
    pd = ImageDraw.Draw(panel)
    for x in range(0, w, max(44, w // 18)):
        pd.line((x, 0, x, h), fill=(22, 44, 78), width=1)
    for y in range(0, h, max(44, h // 12)):
        pd.line((0, y, w, y), fill=(22, 44, 78), width=1)

    def person(cx, cy, scale=1.0, color=(20, 33, 55)):
        pd.ellipse((cx - 26 * scale, cy - 110 * scale, cx + 26 * scale, cy - 58 * scale), fill=color, outline=(94, 132, 210), width=max(1, int(2 * scale)))
        pd.rounded_rectangle((cx - 42 * scale, cy - 58 * scale, cx + 42 * scale, cy + 78 * scale), radius=int(22 * scale), fill=color, outline=(58, 94, 158), width=max(1, int(2 * scale)))

    def laptop(x, y, ww, hh):
        pd.rounded_rectangle((x, y, x + ww, y + hh), radius=12, fill=(8, 16, 31), outline=(98, 142, 240), width=3)
        pd.rectangle((x + 28, y + 28, x + ww - 28, y + hh - 36), fill=(11, 29, 58))
        for i in range(8):
            yy = y + 56 + i * 25
            pd.line((x + 60, yy, x + ww - 80 - rng.randint(0, 180), yy), fill=(126, 166, 255) if i % 3 else (126, 240, 190), width=3)
        pd.rounded_rectangle((x - 28, y + hh, x + ww + 28, y + hh + 34), radius=10, fill=(23, 40, 67), outline=(67, 103, 165), width=2)

    if kind in ("demo", "classroom"):
        pd.rounded_rectangle((int(w*.50), int(h*.18), int(w*.93), int(h*.54)), radius=22, fill=(9, 23, 47), outline=(110, 155, 255), width=4)
        for i in range(5):
            pd.line((int(w*.55), int(h*.26+i*h*.05), int(w*.87-rng.randint(0, int(w*.12))), int(h*.26+i*h*.05)), fill=(126, 166, 255), width=4)
        for x in [int(w*.22), int(w*.38), int(w*.56), int(w*.72)]:
            person(x, int(h*.78), .85)
        laptop(int(w*.15), int(h*.58), int(w*.70), int(h*.18))
    elif kind in ("coding", "technical"):
        laptop(int(w*.12), int(h*.22), int(w*.76), int(h*.48))
        for i in range(9):
            x = int(w * (.14 + rng.random() * .72))
            y = int(h * (.12 + rng.random() * .72))
            pd.ellipse((x-7, y-7, x+7, y+7), fill=(126, 240, 190))
            if i:
                pd.line((prev_x, prev_y, x, y), fill=(55, 91, 154), width=2)
            prev_x, prev_y = x, y
    elif kind in ("team", "operations"):
        for i, x in enumerate([int(w*.25), int(w*.42), int(w*.59), int(w*.76)]):
            person(x, int(h*.65 + (i % 2) * h*.08), .72)
        laptop(int(w*.24), int(h*.52), int(w*.52), int(h*.18))
        pd.rounded_rectangle((int(w*.12), int(h*.18), int(w*.88), int(h*.34)), radius=18, fill=(10, 26, 52), outline=(80, 124, 205), width=3)
        for i in range(4):
            pd.rounded_rectangle((int(w*(.16+i*.18)), int(h*.22), int(w*(.27+i*.18)), int(h*.29)), radius=8, fill=(17, 43, 82), outline=(72, 112, 185), width=2)
    elif kind in ("competition", "hackathon"):
        for i in range(5):
            x = int(w*(.14+i*.17))
            top = int(h*(.72-rng.random()*.35))
            pd.rounded_rectangle((x, top, x+int(w*.08), int(h*.78)), radius=8, fill=(20, 45, 86), outline=(126, 166, 255), width=3)
        pd.line((int(w*.10), int(h*.80), int(w*.92), int(h*.80)), fill=(126, 240, 190), width=5)
        for x in [int(w*.25), int(w*.50), int(w*.75)]:
            pd.ellipse((x-42, int(h*.28)-42, x+42, int(h*.28)+42), outline=(126, 240, 190), width=5)
            pd.line((x, int(h*.34), x, int(h*.55)), fill=(72, 112, 185), width=4)
    else:
        for i in range(18):
            x = rng.randint(40, w-160)
            y = rng.randint(60, h-110)
            ww = rng.randint(90, 260)
            pd.rounded_rectangle((x, y, x+ww, y+52), radius=10, fill=(14, 31, 58), outline=(52, 86, 145), width=2)

    vignette = Image.new("L", (w, h), 0)
    vd = ImageDraw.Draw(vignette)
    for i in range(80):
        vd.rectangle((i, i, w-i, h-i), outline=min(210, i*3))
    alpha = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(alpha).rectangle((0, 0, w, h), fill=(0, 0, 0, 28))
    panel = Image.alpha_composite(panel.convert("RGBA"), alpha).convert("RGB")
    return panel


def add_visual_panel(img: Image.Image, d: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, kind: str, opacity: int = 230):
    visual = make_visual(kind, w, h).convert("RGBA")
    visual.putalpha(opacity)
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle((0, 0, w, h), radius=28, fill=255)
    framed = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    framed.paste(visual, (0, 0), mask)
    img.alpha_composite(framed, (x, y)) if img.mode == "RGBA" else img.paste(framed.convert("RGB"), (x, y), mask)
    d.rounded_rectangle((x, y, x + w, y + h), radius=28, outline=LINE, width=3)


def title_slide(n, kicker, title, subtitle, pills=None, visual=None):
    img, d = base(kicker, n)
    if visual:
        add_visual_panel(img, d, 2380, 260, 1280, 760, visual, opacity=215)
    text(d, (128, 330), title, size=174, bold=True, spacing=8)
    text(d, (128, 805), wrap(subtitle, 74), size=52, fill=MUTED, spacing=10)
    if pills:
        x = 128
        for pill in pills:
            tw = 1180 if len(pill) > 28 else 760
            d.rounded_rectangle((x, 1120, x + tw, 1260), radius=14, fill=CARD, outline=LINE, width=2)
            text(d, (x + 48, 1162), pill, size=34, fill=BLUE, mono=True)
            x += tw + 38
    return img


def slide_01():
    return title_slide(1, "june 1, 2026 - meeting roadmap", "Meeting\nRoadmap", "Today: leadership criteria. June 15: show what you built. School ends June 17, so the plan has to be clear now.", ["JUNE 1 - criteria", "JUNE 8 - guest speaker", "JUNE 15 - project showcase"], visual="classroom")


def slide_02():
    img, d = base("why leadership matters", 2)
    text(d, (128, 300), "Leadership has to make\nthe club run better.", size=136, bold=True, spacing=8)
    y = 780
    for item in [
        "Next year cannot be Reid doing everything at midnight.",
        "A leadership title means owning a real function every week.",
        "The club should keep moving even when Reid or Ben misses a meeting.",
        "We are choosing for contribution, reliability, and role fit.",
    ]:
        y = bullet(d, 160, y, item, chars=82, size=50, gap=116)
    return img


def slide_03():
    img, d = base("2026-2027 operating model", 3)
    text(d, (128, 285), "What we need\nnext year.", size=150, bold=True, spacing=8)
    card(d, 180, 800, 1030, 420, "Project teams", "Five teams building real projects, not just watching demos.", BLUE)
    card(d, 1400, 800, 1030, 420, "Meeting ops", "Scrums, sign-ins, rooms, calendar, and follow-through.", BLUE2)
    card(d, 2620, 800, 1030, 420, "Public output", "Announcements, clips, showcases, competition submissions.", (145, 178, 255))
    card(d, 790, 1360, 1030, 420, "Resources", "API budget, parent donations, tool access, reimbursements.", BLUE2)
    card(d, 2010, 1360, 1030, 420, "Systems", "Attendance, Canvas records, AI Club Brain, deadlines.", BLUE)
    return img


def slide_04():
    img, d = base("people we need", 4)
    text(d, (128, 300), "We need builders,\noperators, and communicators.", size=136, bold=True, spacing=8)
    text(d, (128, 655), "Not everyone needs the same strengths. Everyone needs proof of real contribution.", size=56, fill=MUTED)
    card(d, 210, 1000, 1040, 510, "Builders", "Can make something real with code, AI tools, no-code tools, data, or a working prototype.", BLUE)
    card(d, 1400, 1000, 1040, 510, "Operators", "Can keep people moving, track details, follow up, and make meetings happen.", BLUE2)
    card(d, 2590, 1000, 1040, 510, "Communicators", "Can explain projects, write announcements, present clearly, and represent the club well.", (145, 178, 255))
    return img


def slide_05():
    img, d = base("a title means ownership", 5)
    text(d, (128, 285), "We are running\nleadership like a company.", size=132, bold=True, spacing=8)
    text(d, (128, 650), "Not corporate. Serious. Clear role ownership, check-ins, standards, and consequences.", size=56, fill=BLUE, bold=True)
    rows = [
        ("Role ownership", "Every leader owns a real function every week. A title is not the contribution."),
        ("Check-ins", "If work starts slipping, Reid, Ben, or the VP/COO will check in directly and privately."),
        ("Notice", "If it keeps slipping, you get a clear written notice: what is missing, what must change, and by when."),
        ("Fix window", "You get a short chance to recover with support. Communicate early, show progress, and get the work back on track."),
        ("Replacement", "If the work still does not happen, we replace the role with someone ready to work harder and own it."),
    ]
    y = 810
    for title, body in rows:
        d.rounded_rectangle((190, y, 3650, y + 190), radius=18, fill=CARD, outline=LINE, width=2)
        text(d, (260, y + 48), title, size=44, fill=BLUE, mono=True)
        text(d, (810, y + 46), wrap(body, 84), size=38, fill=MUTED, spacing=8)
        y += 220
    text(d, (190, 1965), "This is private and fair, but it is real. Leadership has to serve the club.", size=44, fill=OK)
    return img


def slide_06():
    img, d = base("proof of work", 6)
    add_visual_panel(img, d, 2330, 245, 1220, 590, "demo", opacity=210)
    text(d, (128, 295), "June 15 is the\nproof-of-work showcase.", size=132, bold=True, spacing=8)
    text(d, (128, 660), "Create your best project. Show the real thing. Explain what happened.", size=62, fill=BLUE, bold=True)
    card(d, 250, 1020, 970, 430, "Build", "AI app, website, automation, game, data project, agent, research prototype, or anything real.", BLUE)
    card(d, 1435, 1020, 970, 430, "Submit", "Use the leadership form. Include links, resume, role choices, and project evidence.", BLUE2)
    card(d, 2620, 1020, 970, 430, "Present", "4 minutes to demo, 1 minute for questions. Clear beats fancy.", (145, 178, 255))
    text(d, (250, 1710), "This is how we see who builds, who persists, and who can explain the work.", size=52, fill=WHITE)
    return img


def slide_07():
    img, d = base("what we are looking for", 7)
    text(d, (128, 300), "Three signals decide\nthe leadership fit.", size=140, bold=True, spacing=8)
    card(d, 220, 950, 1040, 560, "01  Grit", "Did you keep going when the project got annoying? Did you solve blockers instead of disappearing?", BLUE)
    card(d, 1400, 950, 1040, 560, "02  AI + build skill", "Can you use AI tools, code, vibe-code, debug, connect pieces, and make something usable?", BLUE2)
    card(d, 2580, 950, 1040, 560, "03  Presentation skill", "Can you explain your work in a way people understand? Personable skill matters a lot.", (145, 178, 255))
    text(d, (220, 1760), "Strong leaders do not have to be identical. They do have to show evidence.", size=50, fill=WHITE)
    return img


def slide_08():
    img, d = base("tools are not the signal", 8)
    add_visual_panel(img, d, 2350, 800, 1130, 650, "coding", opacity=210)
    text(d, (128, 300), "Free tools count.", size=164, bold=True)
    text(d, (128, 520), "Paid tools count too. We are judging the project and the judgment, not who bought the best software.", size=58, fill=MUTED)
    y = 840
    for item in [
        "Claude, ChatGPT, Codex, Cursor, Replit, VS Code, school PCs, docs, tutorials, free tiers, and no-code tools all count.",
        "Sean-style constraint solving counts: if you did not have a paid tool and still made something, that is a good signal.",
        "The signal is not the tool. The signal is what you made with it.",
    ]:
        y = bullet(d, 170, y, item, chars=86, size=50, gap=142)
    return img


def slide_09():
    img, d = base("leadership skill stack", 9)
    text(d, (128, 290), "Every leader needs\nvibe-coding fluency.", size=136, bold=True, spacing=8)
    text(d, (128, 660), "Leadership should be comfortable with GitHub, Codex, Claude Code, and modern AI build workflows. For technical roles, this bar is especially high.", size=52, fill=MUTED)
    skills = [
        ("Claude Code", "agentic coding, repo edits, debugging, project acceleration"),
        ("Codex", "implementation, tests, refactors, turning plans into working code"),
        ("Cursor / Windsurf", "fast vibe-coding, iteration, UI and app building"),
        ("Replit / web tools", "quick prototypes, hosting experiments, demos people can open"),
        ("GitHub", "public project evidence, commits, README quality, collaboration"),
        ("Prompting + judgment", "knowing what to ask, checking outputs, fixing weak answers"),
        ("Debugging", "reading errors, isolating problems, not giving up when tools fail"),
        ("Shipping", "making a usable thing by the deadline, even if it is rough"),
    ]
    for i, (title, body) in enumerate(skills):
        x = 200 + (i % 2) * 1710
        y = 890 + (i // 2) * 250
        d.rounded_rectangle((x, y, x + 1560, y + 185), radius=16, fill=CARD if i % 2 == 0 else CARD2, outline=LINE, width=2)
        text(d, (x + 44, y + 38), title, size=42, fill=WHITE, bold=True)
        text(d, (x + 44, y + 100), body, size=31, fill=MUTED)
    text(d, (200, 1930), "The best leaders use AI tools fluently without outsourcing their judgment.", size=44, fill=OK)
    return img


def slide_10_expected_technical_skills():
    img, d = base("expected technical skills", 10)
    text(d, (128, 260), "Expected technical\nleadership skills.", size=132, bold=True, spacing=8)
    text(d, (128, 610), "This is the practical AI-engineer skill list. You do not need perfection, but leaders should be actively building fluency.", size=52, fill=BLUE, bold=True)
    skills = [
        ("Agentic coding", "Claude Code, Codex, Cursor/Windsurf. Plan, execute, debug, verify."),
        ("GitHub fluency", "Repos, commits, branches, README files, issues, pull requests, public proof."),
        ("Prompt engineering", "Clear specs, constraints, examples, iteration, critique, and output checking."),
        ("Debugging judgment", "Read errors, isolate causes, test fixes, avoid blaming the tool."),
        ("App architecture", "Frontend, backend, APIs, auth, env vars, databases, deployment basics."),
        ("Automation", "Google Forms, Sheets, Apps Script, reminders, dashboards, repeatable workflows."),
        ("Data handling", "CSV/Sheets cleanup, validation, basic SQL, privacy, source-of-truth thinking."),
        ("Demo readiness", "Working links, stable demos, backups, screenshots, clear explanation."),
        ("AI honesty", "Disclose help, know what you built, verify claims, explain tradeoffs."),
    ]
    for i, (title, body) in enumerate(skills):
        col = i % 3
        row = i // 3
        x = 175 + col * 1220
        y = 850 + row * 315
        d.rounded_rectangle((x, y, x + 1080, y + 245), radius=18, fill=CARD if i % 2 == 0 else CARD2, outline=LINE, width=2)
        text(d, (x + 42, y + 38), f"{i+1:02d}", size=34, fill=BLUE, mono=True)
        text(d, (x + 150, y + 34), title, size=42, fill=WHITE, bold=True)
        text(d, (x + 42, y + 108), wrap(body, 42), size=31, fill=MUTED, spacing=8)
    text(d, (175, 1905), "Especially for technical roles: show us that you can turn vague ideas into working systems.", size=46, fill=OK)
    return img


def slide_10():
    img, d = base("systems and automation", 11)
    text(d, (128, 285), "Leaders should build\nsystems, not just do tasks.", size=130, bold=True, spacing=8)
    text(d, (128, 635), "We will constantly brainstorm, automate, document, and improve how the club runs.", size=56, fill=BLUE, bold=True)
    rows = [
        ("Brainstorm", "Turn messy club needs into project ideas, workflows, forms, scripts, demos, and member tasks."),
        ("Automate", "Use Codex, Claude Code, Apps Script, GitHub, sheets, and web tools to remove repetitive work."),
        ("Document", "Keep instructions, templates, announcements, and project context inside the AI Club Brain."),
        ("Ship", "Make usable systems: attendance trackers, project dashboards, announcement pipelines, budget logs, and demo pages."),
        ("Improve", "Notice friction during meetings and fix it before it becomes Reid or Ben's job."),
    ]
    y = 850
    for title, body in rows:
        d.rounded_rectangle((220, y, 3620, y + 190), radius=18, fill=CARD, outline=LINE, width=2)
        text(d, (290, y + 48), title, size=46, fill=BLUE, mono=True)
        text(d, (760, y + 46), wrap(body, 82), size=38, fill=MUTED, spacing=8)
        y += 225
    return img


def slide_11():
    img, d = base("positions open", 12)
    text(d, (128, 290), "Core roles +\nproject leads.", size=150, bold=True, spacing=8)
    text(d, (128, 665), "We care more about fit and follow-through than filling a fixed number of titles.", size=56, fill=MUTED)
    roles = [
        ("VP / COO", "meeting ops + team check-ins"),
        ("CMO / Social Media", "announcements + content"),
        ("Treasurer", "funds + donations + API budget"),
        ("Secretary", "records + sign-ins + systems"),
        ("TA / Admin Support", "presentations + member support"),
        ("Project Lead", "owns one team build"),
    ]
    for i, (r, b) in enumerate(roles):
        x = 210 + (i % 2) * 1740
        y = 910 + (i // 2) * 270
        card(d, x, y, 1580, 210, r, b, BLUE if i % 2 == 0 else BLUE2, title_size=48, body_size=34)
    return img


def slide_12_accountability_flow():
    img, d = base("diagram - accountability flow", 13)
    text(d, (128, 270), "Accountability has\na real path.", size=132, bold=True, spacing=8)
    text(d, (128, 620), "If a leader falls behind, the response is private, specific, and serious.", size=56, fill=BLUE, bold=True)
    steps = [
        ("Own role", "Weekly work people can count on.", "01"),
        ("Check-in", "Private conversation about blockers.", "02"),
        ("Written notice", "Clear missing work and deadline.", "03"),
        ("Recovery window", "Short chance to show progress.", "04"),
        ("Reassign / replace", "Role goes to someone ready.", "05"),
    ]
    x, y, w, h, gap = 150, 1020, 640, 430, 90
    for i, (title, body, num) in enumerate(steps):
        node(d, x + i * (w + gap), y, w, h, title, body, BLUE if i < 4 else OK, num=num, title_size=42, body_size=30)
        if i < len(steps) - 1:
            arrow(d, x + i * (w + gap) + w + 14, y + h // 2, x + (i + 1) * (w + gap) - 22, y + h // 2, fill=BLUE2)
    text(d, (150, 1750), "The point is not punishment. The point is that leadership cannot become an empty title.", size=52, fill=WHITE)
    return img


def slide_13_leadership_os():
    img, d = base("diagram - leadership operating system", 14)
    text(d, (128, 230), "The leadership OS.", size=142, bold=True)
    text(d, (128, 470), "Each role owns one part of the machine. Together, the club runs without one person carrying it.", size=43, fill=MUTED)
    cx, cy = 1920, 1245
    d.ellipse((cx - 330, cy - 330, cx + 330, cy + 330), fill=(10, 30, 62), outline=BLUE, width=6)
    text(d, (cx, cy - 50), "AI CLUB", size=72, fill=WHITE, bold=True, anchor="mm")
    text(d, (cx, cy + 55), "builds every week", size=38, fill=OK, anchor="mm")
    roles = [
        (620, 870, "Presidents", "direction + final calls"),
        (1420, 760, "VP / COO", "meetings + project rhythm"),
        (2440, 760, "CMO", "visibility + announcements"),
        (3220, 870, "Treasurer", "resources + budget"),
        (900, 1610, "Secretary", "records + AI Club Brain"),
        (2940, 1610, "Project Leads", "team builds + shipping"),
    ]
    for x, y, title, body in roles:
        circle_node(d, x, y, 210, title, body, BLUE2 if x < cx else OK)
        arrow(d, x + (210 if x < cx else -210), y, cx + (-330 if x < cx else 330), cy + int((y - cy) * 0.35), fill=LINE, width=5)
    return img


def slide_14_selection_funnel():
    img, d = base("diagram - june 15 selection funnel", 15)
    text(d, (128, 265), "June 15 turns interest\ninto evidence.", size=132, bold=True, spacing=8)
    text(d, (128, 625), "We are not guessing who can lead. We are watching who can build, explain, and follow through.", size=54, fill=BLUE, bold=True)
    stages = [
        ("Apply", "role choices + profile"),
        ("Submit project", "links + resume + evidence"),
        ("Demo", "4 minutes + Q&A"),
        ("Review", "Reid / Ben compare signals"),
        ("Role fit", "match strengths to jobs"),
        ("Leadership server", "new team starts"),
    ]
    top_w, shrink = 3260, 420
    y = 820
    for i, (title, body) in enumerate(stages):
        w = top_w - i * shrink
        x = (W - w) // 2
        d.rounded_rectangle((x, y, x + w, y + 155), radius=18, fill=CARD if i % 2 == 0 else CARD2, outline=LINE, width=2)
        text(d, (x + 50, y + 44), f"{i+1:02d}", size=38, fill=BLUE, mono=True)
        text(d, (x + 250, y + 35), title, size=48, bold=True)
        text(d, (x + 860, y + 48), body, size=36, fill=MUTED)
        if i < len(stages) - 1:
            arrow(d, W // 2, y + 165, W // 2, y + 205, fill=BLUE2, width=6)
        y += 205
    text(d, (500, 1900), "Evidence beats assumptions.", size=54, fill=OK, bold=True)
    return img


def slide_15_company_model():
    img, d = base("diagram - company model", 16)
    text(d, (128, 265), "Think like a small\ntechnical company.", size=132, bold=True, spacing=8)
    text(d, (128, 625), "Leaders own functions. Project teams ship the product.", size=48, fill=MUTED)
    items = [
        ("Strategy", "what we build + why", 560, 955),
        ("Operations", "meetings + scrums", 1380, 955),
        ("Product teams", "apps + demos + competitions", 2200, 955),
        ("Marketing", "visibility + announcements", 3020, 955),
        ("Finance", "API budget + resources", 920, 1525),
        ("Systems / memory", "attendance + AI Club Brain", 1920, 1525),
        ("Feedback loop", "notice friction, automate it", 2920, 1525),
    ]
    radius = 175
    for title, body, x, y in items:
        circle_node(d, x, y, radius, title, body, OK if "Product" in title else BLUE)
    for a, b in [(0, 1), (1, 2), (2, 3), (1, 5), (5, 6), (4, 2), (6, 0)]:
        x1, y1 = items[a][2], items[a][3]
        x2, y2 = items[b][2], items[b][3]
        arrow(d, x1 + (radius - 35 if x2 > x1 else -radius + 35), y1, x2 + (-radius + 35 if x2 > x1 else radius - 35), y2, fill=LINE, width=5)
    text(d, (128, 1920), "If a function is not owned, it becomes Reid and Ben's job. That is exactly what we are fixing.", size=46, fill=WHITE)
    return img


def slide_16_technical_stack_diagram():
    img, d = base("diagram - technical leadership stack", 17)
    add_visual_panel(img, d, 2670, 270, 820, 420, "technical", opacity=190)
    text(d, (128, 260), "The technical stack\nleaders should know.", size=132, bold=True, spacing=8)
    text(d, (128, 625), "Especially technical leaders. You do not need mastery on day one, but you need fluency and willingness to learn fast.", size=54, fill=BLUE, bold=True)
    layers = [
        ("Public evidence", "GitHub profile, commits, README, project links"),
        ("Agentic coding", "Claude Code, Codex, Cursor / Windsurf"),
        ("Automation", "Apps Script, forms, sheets, reminders, workflows"),
        ("App basics", "frontend, backend, API calls, auth, databases"),
        ("Deployment", "Railway, Vercel, Replit, environment variables"),
        ("Judgment", "debugging, testing, prompt discipline, honesty"),
    ]
    x, y = 430, 820
    for i, (title, body) in enumerate(layers):
        w = 2980 - i * 210
        xx = x + i * 105
        d.rounded_rectangle((xx, y + i * 165, xx + w, y + i * 165 + 130), radius=18, fill=CARD if i % 2 == 0 else CARD2, outline=LINE, width=2)
        text(d, (xx + 55, y + i * 165 + 35), title, size=42, fill=WHITE, bold=True)
        text(d, (xx + 760, y + i * 165 + 42), body, size=34, fill=MUTED)
    text(d, (430, 1905), "The bar is not owning a paid tool. The bar is using the tools to ship real work.", size=48, fill=OK)
    return img


def slide_17_competition_pipeline():
    img, d = base("diagram - competition pipeline", 18)
    add_visual_panel(img, d, 2550, 250, 880, 430, "competition", opacity=195)
    text(d, (128, 265), "Projects become\ncompetition entries.", size=135, bold=True, spacing=8)
    text(d, (128, 625), "There will be more competitions. The smart move is to build early, then choose the right target.", size=56, fill=MUTED)
    lanes = [
        ("Build now", ["best project", "team prototype", "public GitHub"]),
        ("Match target", ["Congressional App Challenge", "MIT Blueprint", "FBLA"]),
        ("AI circuits", ["USAAIO", "IAI2O", "Presidential AI Challenge"]),
        ("More openings", ["local hackathons", "school events", "new 2026-2027 contests"]),
    ]
    x = 250
    for i, (title, chips) in enumerate(lanes):
        node(d, x, 930, 760, 260, title, "", BLUE if i < 2 else OK, num=f"0{i+1}", title_size=46, body_size=30)
        cy = 1260
        for chip in chips:
            d.rounded_rectangle((x, cy, x + 760, cy + 118), radius=16, fill=CARD2, outline=LINE, width=2)
            text(d, (x + 38, cy + 38), chip, size=31, fill=WHITE, bold=True)
            cy += 145
        if i < len(lanes) - 1:
            arrow(d, x + 790, 1060, x + 930, 1060, fill=BLUE2, width=7)
        x += 920
    text(d, (250, 1865), "The project comes first. The competition is where we prove it under a deadline.", size=50, fill=OK)
    return img


def role_slide(n, title, body, looks_for, kicker="role"):
    img, d = base(kicker, n)
    text(d, (128, 300), title, size=150, bold=True)
    text(d, (128, 520), wrap(body, 82), size=56, fill=MUTED, spacing=10)
    text(d, (190, 1020), "What this role owns", size=58, bold=True)
    y = 1150
    for item in looks_for[:3]:
        y = bullet(d, 210, y, item, chars=80, size=48, gap=112)
    card(d, 2260, 980, 1240, 520, "Looks like", looks_for[3], BLUE, title_size=56, body_size=40)
    text(d, (210, 1905), "Automation expectation: use AI tools to make the role repeatable, documented, and easier for the next person.", size=39, fill=OK)
    return img


def slide_12():
    return role_slide(19, "VP / COO", "Runs the operating rhythm of the club so meetings and project teams do not drift.", ["Meeting setup, flow, transitions, room readiness, and after-meeting follow-up.", "Bi-weekly project-team check-ins, scrum notes, blockers, and action items.", "Automates project dashboards, attendance visibility, reminders, and meeting checklists.", "Calm, organized, direct, reliable. This person keeps the machine moving."], "vp / coo")


def slide_13():
    return role_slide(20, "CMO / Social Media", "Owns the club's public voice: announcements, posts, clips, project showcases, and turnout.", ["Creates announcement drafts, event blurbs, speaker posts, and project spotlights.", "Builds repeatable content workflows using AI, templates, captions, and asset folders.", "Turns member projects into visible momentum across Instagram, TikTok, Discord, and Canvas.", "Taste, consistency, speed, and the ability to make people care."], "cmo")


def slide_14():
    return role_slide(21, "Treasurer", "Owns money, API budget, donations, and resource access so project teams can actually build.", ["Tracks API requests, team budgets, balances, reimbursements, and donation allocations.", "Builds budget sheets/forms that make funding requests easy to review.", "Helps manage parent donation drive logistics and transparent resource distribution.", "Trustworthy, detail-oriented, comfortable saying what is actually available."], "treasurer")


def slide_15():
    return role_slide(22, "Secretary / Systems", "Owns the memory of the club: attendance, notes, deadlines, Canvas records, and AI Club Brain updates.", ["Tracks attendance, 75% participation, sign-ins, deadlines, and leadership records.", "Maintains meeting notes, project logs, form results, and AI Club Brain context.", "Automates records where possible: sheets, forms, reminders, summaries, and archive workflows.", "Precise, consistent, quietly powerful. This role prevents chaos."], "secretary")


def slide_16():
    return role_slide(23, "TA / Admin Support", "Helps the room function: supports members, prepares materials, and jumps into whatever is messy.", ["Helps newer members use tools, debug projects, and get unstuck during build time.", "Supports slides, demos, setup, transitions, and guest speaker logistics.", "Creates small automations, templates, or helper docs that save everyone time.", "Flexible, helpful, unglamorous in the best way. A high-trust utility player."], "admin support")


def slide_17():
    return role_slide(24, "Project Lead", "Owns one team project from idea to demo. Keeps the team moving and makes sure something ships.", ["Divides work clearly, maintains the repo/project board, and keeps the team accountable.", "Solves blockers with GitHub, Claude Code, Codex, Cursor/Windsurf, docs, and debugging.", "Turns brainstorms into prototypes, then prototypes into demos people can actually use.", "Technical judgment plus patience. This person can build and help other people build."], "project lead")


def slide_18():
    img, d = base("what reid and ben own", 25)
    text(d, (128, 300), "What Reid and Ben own.", size=140, bold=True)
    text(d, (128, 500), "Leadership should make the club stronger without making Reid the bottleneck.", size=56, fill=MUTED)
    card(d, 220, 820, 1560, 720, "Reid", "Technical vision, advanced projects, AI workflows, competition strategy, project quality bar, and the hardest demos.", BLUE, title_size=66, body_size=42)
    card(d, 2060, 820, 1560, 720, "Ben", "Operations, meeting execution, calendar discipline, officer accountability, and turning plans into reality.", BLUE2, title_size=66, body_size=42)
    text(d, (220, 1730), "The point is not to watch Reid and Ben do everything. The point is to own a function.", size=50, fill=WHITE)
    return img


def slide_19():
    img, d = base("demo script", 26)
    text(d, (128, 285), "What your demo\nshould answer.", size=146, bold=True, spacing=8)
    questions = [
        "What did you build?",
        "What problem does it solve?",
        "What tools or code did you use?",
        "What was the hardest blocker?",
        "What would you improve next?",
    ]
    y = 820
    for i, q in enumerate(questions, 1):
        d.rounded_rectangle((230, y, 3600, y + 210), radius=18, fill=CARD if i % 2 else CARD2, outline=LINE, width=2)
        text(d, (300, y + 58), f"{i:02d}", size=54, fill=BLUE, mono=True)
        text(d, (540, y + 58), q, size=54, bold=True)
        y += 245
    text(d, (230, 1965), "Show the real thing. A rough working project beats a polished idea.", size=44, fill=OK)
    return img


def slide_20():
    img, d = base("submission logistics", 27)
    text(d, (128, 295), "What to submit\nbefore June 15.", size=146, bold=True, spacing=8)
    rows = [
        ("Where", "Leadership form: ai-club-leadership-form-production.up.railway.app"),
        ("Deadline", "Saturday, June 13, 2026 at 11:59 PM"),
        ("Include", "Project link, demo video if you have one, resume, role choices, and why you fit."),
        ("Demo", "June 15: 4 minutes to show the project, 1 minute for questions."),
        ("If many apply", "We switch to 3-minute lightning demos and publish the order ahead of time."),
    ]
    y = 760
    for label, body in rows:
        d.rounded_rectangle((200, y, 3640, y + 215), radius=18, fill=CARD, outline=LINE, width=2)
        text(d, (270, y + 58), label, size=46, fill=BLUE, mono=True)
        text(d, (780, y + 56), wrap(body, 75), size=44, fill=WHITE if label in ("Deadline", "Demo") else MUTED, spacing=8)
        y += 245
    return img


def slide_21():
    img, d = base("timeline", 28)
    text(d, (128, 300), "The timeline.", size=150, bold=True)
    items = [
        ("JUN 01", "Process announced", "Leadership expectations, roles, and project showcase explained."),
        ("JUN 08", "Guest speaker", "Keep building. Use the week to improve the project and get unstuck."),
        ("JUN 13", "Submission deadline", "Form due by 11:59 PM."),
        ("JUN 15", "Project showcase", "Applicants present the best thing they built."),
        ("JUN 16-17", "Leadership decisions", "Reid and Ben review evidence, role fit, reliability, and presentation."),
    ]
    y = 680
    for date, title, body in items:
        d.rounded_rectangle((210, y, 3600, y + 205), radius=18, fill=CARD, outline=LINE, width=2)
        text(d, (285, y + 54), date, size=46, fill=BLUE, mono=True)
        text(d, (690, y + 40), title, size=52, bold=True)
        text(d, (690, y + 112), body, size=36, fill=MUTED)
        y += 238
    return img


def slide_22():
    img, d = base("accountability next year", 29)
    text(d, (128, 290), "What happens if a leader\nfalls behind?", size=130, bold=True, spacing=8)
    text(d, (128, 640), "We do not let a role quietly fail for months. The process is clear from the start.", size=56, fill=BLUE, bold=True)
    steps = [
        ("01", "Direct check-in", "What is blocking you? What help do you need? What is due next?"),
        ("02", "Written notice", "Specific missing work, specific deadline, specific expectation."),
        ("03", "Recovery window", "Short, private chance to get back on track and prove reliability."),
        ("04", "Role transition", "If it still does not happen, the role is reassigned or replaced."),
    ]
    y = 850
    for num, title, body in steps:
        d.rounded_rectangle((210, y, 3600, y + 205), radius=18, fill=CARD, outline=LINE, width=2)
        text(d, (285, y + 54), num, size=52, fill=BLUE, mono=True)
        text(d, (540, y + 42), title, size=52, bold=True)
        text(d, (540, y + 118), body, size=38, fill=MUTED)
        y += 245
    text(d, (210, 1905), "This is not about embarrassing people. It is about protecting the club from empty titles.", size=46, fill=OK)
    return img


def slide_23():
    img, d = base("current leadership", 30)
    text(d, (128, 300), "Already on the team?", size=140, bold=True)
    text(d, (128, 500), "We would love to have you back. Same clear process as every applicant.", size=58, fill=BLUE, bold=True)
    y = 850
    for item in [
        "This is not a reset because people failed.",
        "It is how we make the next team real and fair.",
        "Current leaders should use June 15 to show what they can own next year.",
        "The strongest team is built from evidence, not assumptions.",
    ]:
        y = bullet(d, 170, y, item, chars=82, size=52, gap=128)
    return img


def slide_24():
    img, d = base("competitions next year", 31)
    add_visual_panel(img, d, 2460, 240, 980, 460, "hackathon", opacity=195)
    text(d, (128, 300), "Competitions reward\nreal projects.", size=145, bold=True, spacing=8)
    text(d, (128, 670), "The point is not to sign up for everything. The point is to build early enough that we can choose well.", size=54, fill=MUTED)
    comps = ["Congressional App Challenge", "USAAIO", "IAI2O", "Presidential AI Challenge", "MIT Blueprint", "FBLA", "Local hackathons"]
    x, y = 220, 1010
    for i, comp in enumerate(comps):
        w = 1040 if i < 6 else 2220
        d.rounded_rectangle((x, y, x + w, y + 150), radius=18, fill=CARD, outline=LINE, width=2)
        text(d, (x + 44, y + 48), comp, size=38, fill=WHITE, bold=True)
        x += w + 55
        if x > 3000:
            x = 220
            y += 205
    text(d, (220, 1810), "Build first. Then match the project to the right competition instead of scrambling at the deadline.", size=50, fill=OK)
    return img


def slide_25():
    img, d = base("questions", 32)
    add_visual_panel(img, d, 2380, 270, 1080, 540, "team", opacity=205)
    text(d, (128, 300), "Questions now.", size=160, bold=True)
    text(d, (128, 520), "Then build.", size=120, fill=BLUE, bold=True)
    card(d, 220, 900, 1560, 520, "Before you leave", "Know what you are building, where to submit, when it is due, and how long your demo is.", BLUE, title_size=58, body_size=42)
    card(d, 2060, 900, 1560, 520, "June 15", "Show us grit, AI/build skill, coding or vibe-coding ability, presentation skill, and role fit.", BLUE2, title_size=58, body_size=42)
    text(d, (220, 1735), "Leadership becomes obvious when people show the work.", size=62, fill=WHITE)
    return img


SLIDE_FNS = [
    slide_01, slide_02, slide_03, slide_04, slide_05, slide_06, slide_07, slide_08, slide_09,
    slide_10_expected_technical_skills, slide_10, slide_11, slide_12_accountability_flow, slide_13_leadership_os, slide_14_selection_funnel,
    slide_15_company_model, slide_16_technical_stack_diagram, slide_17_competition_pipeline,
    slide_12, slide_13, slide_14, slide_15, slide_16, slide_17, slide_18, slide_19, slide_20,
    slide_21, slide_22, slide_23, slide_24, slide_25,
]


def make_contact_sheet(paths: list[Path]):
    thumbs = []
    for path in paths:
        img = Image.open(path).convert("RGB")
        img.thumbnail((480, 270))
        canvas = Image.new("RGB", (500, 310), (7, 12, 22))
        canvas.paste(img, (10, 10))
        d = ImageDraw.Draw(canvas)
        text(d, (18, 284), path.stem.split("_")[0], size=18, fill=BLUE, mono=True)
        thumbs.append(canvas)
    cols = 4
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 500, rows * 310), (5, 10, 19))
    for i, thumb in enumerate(thumbs):
        sheet.paste(thumb, ((i % cols) * 500, (i // cols) * 310))
    sheet.save(CONTACT)


def main():
    SLIDES.mkdir(parents=True, exist_ok=True)
    paths = []
    for i, fn in enumerate(SLIDE_FNS, 1):
        path = SLIDES / f"{i:02d}_slide.png"
        fn().save(path)
        paths.append(path)
    make_contact_sheet(paths)
    print(f"SLIDES={SLIDES}")
    print(f"CONTACT={CONTACT}")
    print(f"OUT={OUT}")


if __name__ == "__main__":
    main()
