#!/usr/bin/env python3
"""applykit CLI — deterministic outreach draft from JD + CV blurb."""
from __future__ import annotations

import argparse
import re
from pathlib import Path

SKILLS = [
    "laravel", "php", "vue", "nuxt", "react", "next", "flutter", "dart",
    "node", "python", "django", "docker", "redis", "mysql", "postgres",
    "nginx", "chapa", "api", "rest", "typescript", "javascript",
]


def matched(jd: str) -> list[str]:
    toks = set(re.findall(r"[a-z][a-z0-9+.#-]*", jd.lower()))
    return [s for s in SKILLS if s in toks or any(s in t for t in toks)]


def build(name: str, title: str, cv: str, jd: str) -> str:
    m = matched(jd)
    match_line = (
        f"Overlap with this role: {', '.join(m[:8])}."
        if m
        else "I work across Laravel, Vue, Flutter, and Node in production."
    )
    return "\n".join(
        [
            f"Hi — I'm {name}, {title} based in Addis Ababa.",
            "I saw your opening and wanted to reach out.",
            cv.strip(),
            match_line,
            "Happy to share a CV or jump on a short call. Thanks for reading.",
        ]
    )


def main() -> None:
    p = argparse.ArgumentParser(description="Generate a job outreach draft")
    p.add_argument("--jd", required=True, help="Path to job description text")
    p.add_argument("--cv", required=True, help="Path to CV blurb text")
    p.add_argument("--name", default="Biruk Endrias")
    p.add_argument("--title", default="Senior Full Stack Developer")
    args = p.parse_args()
    print(
        build(
            args.name,
            args.title,
            Path(args.cv).read_text(encoding="utf-8"),
            Path(args.jd).read_text(encoding="utf-8"),
        )
    )


if __name__ == "__main__":
    main()
