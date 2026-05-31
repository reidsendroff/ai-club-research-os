#!/usr/bin/env python3
import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description="Append an event to evals/log.jsonl.")
    parser.add_argument("event", help="Event name, e.g. scaffold_complete")
    parser.add_argument("--agent", default="human_or_codex", help="Agent or actor")
    parser.add_argument("--note", default="", help="Short note")
    parser.add_argument("--dry-run", action="store_true", help="Print event without writing")
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[1]
    record = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "event": args.event,
        "agent": args.agent,
        "note": args.note,
    }
    line = json.dumps(record, sort_keys=True)
    if args.dry_run:
        print(line)
        return
    path = root / "evals" / "log.jsonl"
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        f.write(line + "\n")
    print(line)


if __name__ == "__main__":
    main()

