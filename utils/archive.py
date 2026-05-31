#!/usr/bin/env python3
import argparse
import shutil
import time
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description="Archive scratchpads older than N days using copy, verify, delete.")
    parser.add_argument("--days", type=int, default=14)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[1]
    scratch = root / "memory" / "scratchpads"
    transcripts = root / "memory" / "transcripts"
    transcripts.mkdir(parents=True, exist_ok=True)
    cutoff = time.time() - args.days * 86400
    archived = []

    for path in scratch.glob("*.md"):
        if path.stat().st_mtime >= cutoff:
            continue
        target = transcripts / f"{path.stem}_{time.strftime('%Y%m%d_%H%M%S', time.localtime(path.stat().st_mtime))}.md"
        archived.append((path, target))
        if args.dry_run:
            continue
        shutil.copy2(path, target)
        if target.read_bytes() != path.read_bytes():
            raise SystemExit(f"Verification failed for {path}")
        path.unlink()

    for src, dst in archived:
        print(f"{src} -> {dst}")
    if not archived:
        print("No scratchpads old enough to archive.")


if __name__ == "__main__":
    main()

