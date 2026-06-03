from __future__ import annotations

import importlib.util
import json
import math
import shutil
import subprocess
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WORK = Path(__file__).resolve().parent
SOURCE = WORK / "build_june1_v2_deck.py"
SLIDES = WORK / "v8_readability_slides"
CONTACT = WORK / "v8_readability_contact_sheet.jpg"
PREVIEW = WORK / "V8_Readability_Preview.html"
OUT = WORK / "FINAL_June_1st_Presentation_Leadership_Showcase_V8_Readability.pptx"
ASSEMBLER = WORK / "assemble_v8_readability_deck.js"

W, H = 3840, 2160


def load_source_module():
    spec = importlib.util.spec_from_file_location("june1_deck_source", SOURCE)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot import {SOURCE}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)

    font_dir = Path("/System/Library/Fonts/Supplemental")
    module.FONT_BOLD = font_dir / "Arial Bold.ttf"
    module.FONT_REG = font_dir / "Arial.ttf"
    module.FONT_LIGHT = font_dir / "Arial.ttf"
    module.FONT_MONO = Path("/System/Library/Fonts/Menlo.ttc")
    module.WORK = WORK
    module.SLIDES = SLIDES
    module.CONTACT = CONTACT
    module.OUT = OUT
    return module


def wrap_lines(text: str, font_obj: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    probe = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    for word in words:
        candidate = f"{current} {word}".strip()
        if probe.textbbox((0, 0), candidate, font=font_obj)[2] <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_fit(module, d: ImageDraw.ImageDraw, xy, text_value: str, box_w: int, box_h: int,
             preferred: int, minimum: int, fill, bold=False, mono=False, spacing_ratio=0.24):
    font_path = module.FONT_MONO if mono else module.FONT_BOLD if bold else module.FONT_REG
    for size in range(preferred, minimum - 1, -2):
        font_obj = ImageFont.truetype(str(font_path), size)
        lines = wrap_lines(text_value, font_obj, box_w)
        spacing = max(6, int(size * spacing_ratio))
        line_h = size + spacing
        if len(lines) * line_h - spacing <= box_h:
            d.multiline_text(xy, "\n".join(lines), font=font_obj, fill=fill, spacing=spacing)
            return size, len(lines)
    font_obj = ImageFont.truetype(str(font_path), minimum)
    lines = wrap_lines(text_value, font_obj, box_w)
    max_lines = max(1, box_h // (minimum + 6))
    d.multiline_text(xy, "\n".join(lines[:max_lines]), font=font_obj, fill=fill, spacing=6)
    return minimum, min(len(lines), max_lines)


def patch_typography(module):
    original_text = module.text

    def bigger_card(d, x, y, w, h, title, body, accent=None, title_size=46, body_size=33):
        accent = module.BLUE if accent is None else accent
        d.rounded_rectangle((x, y, x + w, y + h), radius=18, fill=module.CARD, outline=module.LINE, width=2)
        d.rectangle((x, y, x + 16, y + h), fill=accent)

        title_pref = max(title_size + 8, 56)
        body_pref = max(body_size + 16, 50)
        if h <= 230:
            title_pref = max(title_size + 2, 48)
            body_pref = max(body_size + 10, 44)
        if h >= 500:
            title_pref = max(title_pref, 64)
            body_pref = max(body_pref, 58)
        if h >= 700:
            title_pref = max(title_pref, 68)
            body_pref = max(body_pref, 66)

        tx = x + 52
        ty = y + 42
        title_font = ImageFont.truetype(str(module.FONT_BOLD), title_pref)
        d.multiline_text((tx, ty), title, font=title_font, fill=module.WHITE, spacing=8)
        title_height = max(title_pref + 10, len(title.splitlines()) * (title_pref + 8))
        body_y = ty + title_height + 18
        draw_fit(
            module,
            d,
            (tx, body_y),
            body,
            w - 108,
            max(48, y + h - body_y - 34),
            body_pref,
            34,
            module.MUTED,
            bold=False,
            spacing_ratio=0.22,
        )

    def bigger_node(d, x, y, w, h, title, body="", accent=None, num=None, title_size=42, body_size=30):
        accent = module.BLUE if accent is None else accent
        d.rounded_rectangle((x, y, x + w, y + h), radius=22, fill=module.CARD, outline=module.LINE, width=3)
        d.rectangle((x, y, x + 14, y + h), fill=accent)
        if num:
            original_text(d, (x + 42, y + 34), num, size=38, fill=accent, mono=True)
            title_y = y + 92
        else:
            title_y = y + 42
        original_text(d, (x + 42, title_y), title, size=max(title_size + 4, 48), fill=module.WHITE, bold=True)
        if body:
            draw_fit(module, d, (x + 42, title_y + 82), body, w - 88, h - 150, max(body_size + 12, 42), 30, module.MUTED)

    def bigger_bullet(d, x, y, body, chars=70, size=42, fill=None, gap=86, marker=None):
        fill = module.MUTED if fill is None else fill
        marker = module.BLUE if marker is None else marker
        new_size = max(size, 50)
        original_text(d, (x, y + 4), ">", size=new_size, fill=marker, mono=True)
        original_text(d, (x + 72, y), textwrap.fill(body, width=max(46, chars - 8), break_long_words=False), size=new_size, fill=fill, spacing=12)
        lines = max(1, len(textwrap.wrap(body, max(46, chars - 8), break_long_words=False)))
        return y + max(gap + 10, lines * (new_size + 20))

    module.card = bigger_card
    module.node = bigger_node
    module.bullet = bigger_bullet


def selected_slide_functions(module):
    # This preserves the V7 29-slide sequence visible in the current deck.
    return [
        module.slide_01,
        module.slide_03,
        module.slide_04,
        module.slide_06,
        module.slide_07,
        module.slide_08,
        module.slide_09,
        module.slide_10_expected_technical_skills,
        module.slide_10,
        module.slide_11,
        module.slide_12_accountability_flow,
        module.slide_13_leadership_os,
        module.slide_14_selection_funnel,
        module.slide_15_company_model,
        module.slide_16_technical_stack_diagram,
        module.slide_17_competition_pipeline,
        module.slide_12,
        module.slide_13,
        module.slide_14,
        module.slide_15,
        module.slide_16,
        module.slide_17,
        module.slide_18,
        module.slide_19,
        module.slide_20,
        module.slide_21,
        module.slide_22,
        module.slide_24,
        module.slide_25,
    ]


def make_contact_sheet(paths: list[Path]):
    thumbs = []
    for i, path in enumerate(paths, 1):
        img = Image.open(path).convert("RGB")
        img.thumbnail((384, 216), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (384, 248), (7, 12, 22))
        canvas.paste(img, (0, 0))
        d = ImageDraw.Draw(canvas)
        d.text((12, 222), f"{i:02d}", fill=(126, 166, 255))
        thumbs.append(canvas)
    cols = 4
    rows = math.ceil(len(thumbs) / cols)
    sheet = Image.new("RGB", (cols * 384, rows * 248), (5, 10, 19))
    for i, thumb in enumerate(thumbs):
        sheet.paste(thumb, ((i % cols) * 384, (i // cols) * 248))
    sheet.save(CONTACT, quality=92)


def write_assembler():
    ASSEMBLER.write_text(
        f"""const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const slidesDir = {json.dumps(str(SLIDES))};
const out = {json.dumps(str(OUT))};
const pptx = new pptxgen();
pptx.defineLayout({{ name: 'CUSTOM_WIDE', width: 13.333333, height: 7.5 }});
pptx.layout = 'CUSTOM_WIDE';
pptx.author = 'Northern Highlands AI Club';
pptx.subject = 'June 1 AI Club leadership project showcase';
pptx.title = 'June 1 AI Club Leadership Showcase V8 Readability';
pptx.company = 'Northern Highlands AI Club';
pptx.lang = 'en-US';
pptx.theme = {{
  headFontFace: 'Arial',
  bodyFontFace: 'Arial',
  lang: 'en-US',
}};

const files = fs.readdirSync(slidesDir)
  .filter((file) => file.endsWith('.png'))
  .sort((a, b) => Number(a.slice(6, 8)) - Number(b.slice(6, 8)));

for (const file of files) {{
  const slide = pptx.addSlide();
  slide.background = {{ color: '050A13' }};
  slide.addImage({{ path: path.join(slidesDir, file), x: 0, y: 0, w: 13.333333, h: 7.5 }});
}}

pptx.writeFile({{ fileName: out }}).then(() => {{
  console.log(`WROTE=${{out}}`);
  console.log(`SLIDES=${{files.length}}`);
}});
""",
        encoding="utf-8",
    )


def write_preview(paths: list[Path]):
    items = "\n".join(
        f'<section><div class="n">Slide {i}</div><img src="v8_readability_slides/{p.name}" alt="Slide {i}"></section>'
        for i, p in enumerate(paths, 1)
    )
    PREVIEW.write_text(
        f"""<!doctype html>
<html><head><meta charset="utf-8"><title>V8 Readability Preview</title>
<style>
body {{ margin:0; background:#050a13; color:#eaf1fc; font-family: Arial, sans-serif; }}
header {{ position:sticky; top:0; z-index:2; display:flex; justify-content:space-between; align-items:center; padding:14px 22px; background:rgba(5,10,19,.94); border-bottom:1px solid #1d2e49; }}
a {{ color:#8fb2ff; }}
main {{ display:grid; gap:28px; padding:28px; max-width:1280px; margin:0 auto; }}
section {{ border:1px solid #203454; background:#07101f; }}
.n {{ padding:8px 12px; color:#8aa0c5; font-size:14px; }}
img {{ display:block; width:100%; height:auto; }}
</style></head><body>
<header><strong>AI Club Leadership Showcase V8 Readability</strong><a href="{OUT.name}">Open PPTX</a></header>
<main>{items}</main>
</body></html>""",
        encoding="utf-8",
    )


def main():
    module = load_source_module()
    patch_typography(module)
    if SLIDES.exists():
        shutil.rmtree(SLIDES)
    SLIDES.mkdir(parents=True)

    paths = []
    for i, fn in enumerate(selected_slide_functions(module), 1):
        path = SLIDES / f"slide_{i:02d}.png"
        fn().save(path)
        paths.append(path)

    make_contact_sheet(paths)
    write_preview(paths)
    write_assembler()
    subprocess.run(["node", str(ASSEMBLER)], check=True)
    print(f"WROTE={OUT}")
    print(f"SLIDES={len(paths)}")
    print(f"CONTACT={CONTACT}")
    print(f"PREVIEW={PREVIEW}")


if __name__ == "__main__":
    main()
