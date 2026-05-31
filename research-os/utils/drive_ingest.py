#!/usr/bin/env python3
import argparse
import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "_", text)
    return text.strip("_") or "untitled"


def load_manifest(path):
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    if isinstance(data, dict) and "files" in data:
        return data["files"]
    if isinstance(data, list):
        return data
    raise SystemExit("Manifest must be a JSON list or an object with a 'files' list.")


def classify(item):
    title = (item.get("title") or item.get("name") or "").lower()
    mime = (item.get("mime_type") or item.get("mimeType") or "").lower()
    if "folder" in mime or item.get("file_or_folder") == "folder":
        return "folder"
    if mime.startswith("video/") or any(title.endswith(ext) for ext in [".mp4", ".mov", ".m4v", ".avi", ".webm"]):
        return "video"
    if mime.startswith("image/") or any(title.endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".heic", ".webp"]):
        return "image"
    if "presentation" in mime or title.endswith((".pptx", ".ppt")):
        return "presentation"
    if "document" in mime or title.endswith((".docx", ".doc", ".txt", ".md")):
        return "document"
    if "spreadsheet" in mime or title.endswith((".xlsx", ".csv", ".tsv")):
        return "spreadsheet"
    if "pdf" in mime or title.endswith(".pdf"):
        return "pdf"
    if "form" in mime:
        return "form"
    return "other"


def write_index(files, out_dir):
    out_dir.mkdir(parents=True, exist_ok=True)
    rows = []
    counts = Counter()
    for item in files:
        kind = classify(item)
        counts[kind] += 1
        title = item.get("title") or item.get("name") or "[untitled]"
        url = item.get("url") or item.get("webViewLink") or ""
        folder = item.get("folder_path") or item.get("path") or "[unknown]"
        status = "queued"
        rows.append((kind, title, folder, url, status))

    index = out_dir / "AI_CLUB_DRIVE_MASTER_INDEX.md"
    lines = [
        "# AI Club Drive Master Index",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        "## Counts",
        "",
    ]
    for kind, count in sorted(counts.items()):
        lines.append(f"- {kind}: {count}")
    lines += [
        "",
        "## Files",
        "",
        "| Type | Title | Folder | URL | Status |",
        "|---|---|---|---|---|",
    ]
    for kind, title, folder, url, status in rows:
        safe_title = str(title).replace("|", "\\|").replace("\n", " ")
        safe_folder = str(folder).replace("|", "\\|").replace("\n", " ")
        lines.append(f"| {kind} | {safe_title} | {safe_folder} | {url} | {status} |")
    index.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return index, counts


def write_processing_plan(files, out_dir):
    summaries = out_dir.parent / "summaries"
    summaries.mkdir(parents=True, exist_ok=True)
    for item in files:
        kind = classify(item)
        title = item.get("title") or item.get("name") or "untitled"
        file_id = item.get("id") or item.get("fileId") or "[unknown]"
        url = item.get("url") or item.get("webViewLink") or ""
        folder = item.get("folder_path") or item.get("path") or "[unknown]"
        path = summaries / f"{kind}_{slugify(title)[:80]}.md"
        if path.exists():
            continue
        body = f"""# Source Summary: {title}

Type: {kind}

File ID: {file_id}

Folder: {folder}

URL: {url}

Processing status: queued

## Extracted Content

[UNVERIFIED: content has not been fetched or transcribed yet.]

## Summary

[UNVERIFIED]

## Decisions / Actions

[UNVERIFIED]

## Reuse Notes

[UNVERIFIED]
"""
        path.write_text(body, encoding="utf-8")


def log_event(root, note):
    log = root / "evals" / "log.jsonl"
    record = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "event": "drive_ingest_manifest_processed",
        "agent": "codex",
        "note": note,
    }
    with log.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, sort_keys=True) + "\n")


def main():
    parser = argparse.ArgumentParser(description="Process a Drive manifest into AI Club brain index files.")
    parser.add_argument("--manifest", required=True, help="Path to JSON manifest exported from Drive/connector/Chrome.")
    parser.add_argument("--out", default="drive_ingest/raw_inventory", help="Output folder for inventory index.")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[1]
    files = load_manifest(args.manifest)
    out_dir = root / args.out
    if args.dry_run:
        counts = Counter(classify(item) for item in files)
        print(json.dumps({"count": len(files), "types": counts}, indent=2, default=dict))
        return
    index, counts = write_index(files, out_dir)
    write_processing_plan(files, out_dir)
    log_event(root, f"Processed {len(files)} manifest entries into {index}")
    print(index)
    print(dict(counts))


if __name__ == "__main__":
    main()

