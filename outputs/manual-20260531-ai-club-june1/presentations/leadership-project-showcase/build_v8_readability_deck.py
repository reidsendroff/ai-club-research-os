from __future__ import annotations

import io
import json
import shutil
import subprocess
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

from PIL import Image, ImageFilter, ImageOps


WORK = Path(__file__).resolve().parent
SRC = WORK / "FINAL_June_1st_Presentation_Leadership_Showcase_V7_Technical_Skills.pptx"
OUT = WORK / "FINAL_June_1st_Presentation_Leadership_Showcase_V8_Readability.pptx"
SLIDES = WORK / "v8_readability_slides"
CONTACT = WORK / "v8_readability_contact_sheet.jpg"
ASSEMBLER = WORK / "assemble_v8_readability_deck.js"
MANIFEST = WORK / "v8_readability_manifest.json"

W, H = 3840, 2160
REL_NS = {"rel": "http://schemas.openxmlformats.org/package/2006/relationships"}


def slide_count(zf: zipfile.ZipFile) -> int:
    return len([n for n in zf.namelist() if n.startswith("ppt/slides/slide") and n.endswith(".xml")])


def slide_image(zf: zipfile.ZipFile, slide_no: int) -> Image.Image:
    rel_name = f"ppt/slides/_rels/slide{slide_no}.xml.rels"
    rels = ET.fromstring(zf.read(rel_name))
    for rel in rels.findall("rel:Relationship", REL_NS):
        if "image" not in rel.attrib.get("Type", ""):
            continue
        target = rel.attrib["Target"].replace("../", "ppt/")
        return Image.open(io.BytesIO(zf.read(target))).convert("RGB")
    raise RuntimeError(f"No slide image relationship found for slide {slide_no}")


def foreground_bbox(img: Image.Image) -> tuple[int, int, int, int]:
    small = img.resize((480, 270), Image.Resampling.BILINEAR)
    px = small.load()
    xs: list[int] = []
    ys: list[int] = []
    for y in range(small.height):
        for x in range(small.width):
            r, g, b = px[x, y]
            luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
            blue_accent = b > 82 and g > 45 and r < 160
            visible_text_or_rule = luma > 70 or blue_accent
            if visible_text_or_rule:
                xs.append(x)
                ys.append(y)
    if not xs:
        return (0, 0, img.width, img.height)

    scale_x = img.width / small.width
    scale_y = img.height / small.height
    left = max(0, int(min(xs) * scale_x) - 90)
    top = max(0, int(min(ys) * scale_y) - 70)
    right = min(img.width, int((max(xs) + 1) * scale_x) + 90)
    bottom = min(img.height, int((max(ys) + 1) * scale_y) + 70)
    return (left, top, right, bottom)


def enhance_slide(img: Image.Image) -> tuple[Image.Image, dict]:
    if img.size != (W, H):
        img = img.resize((W, H), Image.Resampling.LANCZOS)

    bbox = foreground_bbox(img)
    left, top, right, bottom = bbox
    bw, bh = right - left, bottom - top

    target_w = int(W * 0.93)
    target_h = int(H * 0.90)
    scale = min(target_w / bw, target_h / bh)
    scale = max(1.08, min(1.18, scale))

    crop_w = min(W, int(W / scale))
    crop_h = min(H, int(H / scale))
    cx = (left + right) // 2
    cy = (top + bottom) // 2

    crop_left = min(max(0, cx - crop_w // 2), W - crop_w)
    crop_top = min(max(0, cy - crop_h // 2), H - crop_h)
    crop = img.crop((crop_left, crop_top, crop_left + crop_w, crop_top + crop_h))
    enlarged = crop.resize((W, H), Image.Resampling.LANCZOS)
    enlarged = ImageOps.autocontrast(enlarged, cutoff=0.35)

    # Subtle sharpening after resampling keeps small body text crisper on projectors.
    crisp = enlarged.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    return crisp, {
        "bbox": bbox,
        "crop": (crop_left, crop_top, crop_left + crop_w, crop_top + crop_h),
        "scale": round(scale, 3),
    }


def make_contact_sheet(paths: list[Path]) -> None:
    thumbs = []
    for idx, path in enumerate(paths, 1):
        im = Image.open(path).convert("RGB")
        im.thumbnail((384, 216), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (384, 248), (7, 12, 22))
        canvas.paste(im, (0, 0))
        thumbs.append(canvas)

    cols = 4
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 384, rows * 248), (7, 12, 22))
    for i, thumb in enumerate(thumbs):
        sheet.paste(thumb, ((i % cols) * 384, (i // cols) * 248))
    sheet.save(CONTACT, quality=92)


def write_assembler() -> None:
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
  headFontFace: 'Segoe UI',
  bodyFontFace: 'Segoe UI',
  lang: 'en-US',
}};

const files = fs.readdirSync(slidesDir)
  .filter((file) => file.endsWith('.png'))
  .sort((a, b) => Number(a.slice(6, 8)) - Number(b.slice(6, 8)));

for (const file of files) {{
  const slide = pptx.addSlide();
  slide.background = {{ color: '050A13' }};
  slide.addImage({{
    path: path.join(slidesDir, file),
    x: 0,
    y: 0,
    w: 13.333333,
    h: 7.5,
  }});
}}

pptx.writeFile({{ fileName: out }}).then(() => {{
  console.log(`WROTE=${{out}}`);
  console.log(`SLIDES=${{files.length}}`);
}});
""",
        encoding="utf-8",
    )


def main() -> None:
    if SLIDES.exists():
        shutil.rmtree(SLIDES)
    SLIDES.mkdir(parents=True)

    manifest: list[dict] = []
    paths: list[Path] = []
    with zipfile.ZipFile(SRC) as zf:
        count = slide_count(zf)
        for slide_no in range(1, count + 1):
            img = slide_image(zf, slide_no)
            enhanced, info = enhance_slide(img)
            out_path = SLIDES / f"slide_{slide_no:02d}.png"
            enhanced.save(out_path)
            info["slide"] = slide_no
            info["file"] = str(out_path)
            manifest.append(info)
            paths.append(out_path)

    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    make_contact_sheet(paths)
    write_assembler()
    subprocess.run(["node", str(ASSEMBLER)], check=True)
    print(f"CONTACT={CONTACT}")
    print(f"MANIFEST={MANIFEST}")


if __name__ == "__main__":
    main()
