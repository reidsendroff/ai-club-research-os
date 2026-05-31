#!/usr/bin/env python3
import argparse
import re
import shutil
from datetime import date
from pathlib import Path


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "_", text)
    return text.strip("_") or "decision"


def next_id(decisions_dir):
    nums = []
    for path in decisions_dir.glob("D-*.md"):
        m = re.match(r"D-(\d+)_", path.name)
        if m:
            nums.append(int(m.group(1)))
    return f"D-{(max(nums) + 1) if nums else 1:03d}"


def main():
    parser = argparse.ArgumentParser(description="Create a decision record and update the decision index.")
    parser.add_argument("summary", nargs="?", help="One-line decision summary")
    parser.add_argument("--status", default="PROPOSED", choices=["PROPOSED", "ACCEPTED", "SUPERSEDED", "REJECTED"])
    parser.add_argument("--owner", default="human_orchestrator")
    parser.add_argument("--evidence", default="[UNVERIFIED]")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not args.summary:
        parser.print_help()
        return

    root = Path(__file__).resolve().parents[1]
    decisions_dir = root / "decisions"
    decision_id = next_id(decisions_dir)
    filename = f"{decision_id}_{slugify(args.summary)}.md"
    record_path = decisions_dir / filename
    body = f"""# {decision_id}: {args.summary}

Status: {args.status}

Date: {date.today().isoformat()}

Owner: {args.owner}

## Summary

{args.summary}

## Evidence

{args.evidence}

## Alternatives Rejected

[UNVERIFIED]

## Next Action

[UNVERIFIED]
"""
    index = root / "memory" / "canonical" / "02_decisions.md"
    line = f"| {decision_id} | {date.today().isoformat()} | {args.status} | {args.summary} | `decisions/{filename}` |\n"

    if args.dry_run:
        print(record_path)
        print(body)
        print(line)
        return
    if record_path.exists():
        raise SystemExit(f"Refusing to overwrite existing file: {record_path}")
    backup = index.with_suffix(index.suffix + ".bak")
    shutil.copy2(index, backup)
    record_path.write_text(body, encoding="utf-8")
    with index.open("a", encoding="utf-8") as f:
        f.write(line)
    print(record_path)


if __name__ == "__main__":
    main()

