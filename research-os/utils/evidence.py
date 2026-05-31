#!/usr/bin/env python3
import argparse
import re
from datetime import date
from pathlib import Path


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "_", text)
    return text.strip("_") or "finding"


def main():
    parser = argparse.ArgumentParser(description="Create a new evidence file from a template. Refuses overwrite.")
    parser.add_argument("title", nargs="?", help="Evidence title")
    parser.add_argument("--source", default="[UNVERIFIED]", help="Source path or URL")
    parser.add_argument("--finding", default="[UNVERIFIED]", help="One-line finding")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not args.title:
        parser.print_help()
        return

    root = Path(__file__).resolve().parents[1]
    filename = f"{date.today().isoformat()}_{slugify(args.title)}.md"
    path = root / "evidence" / filename
    body = f"""# Evidence: {args.title}

Date captured: {date.today().isoformat()}

Source: {args.source}

## Finding

{args.finding}

## Relevance

[UNVERIFIED]

## Limits

[UNVERIFIED]
"""
    if args.dry_run:
        print(path)
        print(body)
        return
    if path.exists():
        raise SystemExit(f"Refusing to overwrite existing file: {path}")
    path.write_text(body, encoding="utf-8")
    print(path)


if __name__ == "__main__":
    main()

