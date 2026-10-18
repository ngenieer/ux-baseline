#!/usr/bin/env python3
"""WCAG 2.2 성공기준(A·AA)을 원문 데이터에서 추출해 sources/extracts/WCAG22-A-AA.yaml 로 저장한다.

입력
  --wcag-json : w3c/wcag 저장소 태그 WCAG22-20241212 의 guidelines/wcag.json
  --axe-rules : axe-core getRules() 결과 JSON (선택). SC ↔ axe 규칙 대응에 쓴다.

재현 방법
  git clone --depth 1 --branch WCAG22-20241212 --filter=blob:none --sparse https://github.com/w3c/wcag
  (cd wcag && git sparse-checkout set guidelines)
  npm install axe-core && node -e "console.log(JSON.stringify(require('axe-core').getRules()))" > axe-rules.json
  python scripts/extract_wcag.py --wcag-json wcag/guidelines/wcag.json --axe-rules axe-rules.json --axe-version 4.14.0
"""
from __future__ import annotations

import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path

import yaml

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "sources" / "extracts" / "WCAG22-A-AA.yaml"


def sc_from_tag(tag: str) -> str | None:
    """axe 태그 'wcag1410' → '1.4.10'. 'wcag2a', 'wcag21aa' 같은 수준 태그는 None."""
    m = re.fullmatch(r"wcag(\d)(\d)(\d{1,2})", tag)
    return f"{m.group(1)}.{m.group(2)}.{m.group(3)}" if m else None


class SCText(HTMLParser):
    """성공기준 HTML(guidelines/sc/2x/<id>.html)에서 규범 문장과 주석(Note)을 블록 단위로 뽑는다.

    wcag.json에는 목록·예외 조건이 빠진 성공기준이 있어서 HTML 원문을 쓴다.
    """

    BLOCKS = {"p", "li", "dt", "dd"}

    CONTAINERS = {"div", "ul", "ol", "dl", "section"}

    def __init__(self) -> None:
        super().__init__()
        self.blocks: list[tuple[str, str, str]] = []  # (tag, class, text)
        self._stack: list[tuple[str, str]] = []
        self._buf: list[str] = []
        self._containers: list[bool] = []  # 열린 컨테이너가 note인지

    def _in_note(self) -> bool:
        return any(self._containers) or any("note" in c for _, c in self._stack)

    def handle_starttag(self, tag, attrs):
        cls = dict(attrs).get("class") or ""
        if tag in self.CONTAINERS:
            self._containers.append("note" in cls.split() or self._in_note())
        if tag in self.BLOCKS:
            self._flush()
            if self._in_note() and "note" not in cls:
                cls = (cls + " note").strip()
            self._stack.append((tag, cls))

    def handle_endtag(self, tag):
        if tag in self.CONTAINERS and self._containers:
            self._containers.pop()
        if tag in self.BLOCKS and self._stack:
            self._flush()
            self._stack.pop()

    def handle_data(self, data):
        if self._stack:
            self._buf.append(data)

    def _flush(self):
        text = " ".join("".join(self._buf).split())
        if text and self._stack:
            tag, cls = self._stack[-1]
            self.blocks.append((tag, cls, text))
        self._buf = []


def normative_text(html_path: Path) -> tuple[list[str], list[str]]:
    p = SCText()
    p.feed(html_path.read_text(encoding="utf-8"))
    body, notes, pending_dt = [], [], None
    for tag, cls, text in p.blocks:
        if "conformance-level" in cls or cls == "change":
            continue
        if "note" in cls:
            notes.append(text)
        elif tag == "dt":
            pending_dt = text
        elif tag == "dd" and pending_dt:
            body.append(f"{pending_dt}: {text}")
            pending_dt = None
        else:
            body.append(text)
    return body, notes


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--wcag-json", required=True, type=Path)
    ap.add_argument("--axe-rules", type=Path)
    ap.add_argument("--axe-version", default="")
    args = ap.parse_args()

    data = json.loads(args.wcag_json.read_text(encoding="utf-8"))
    sc_dir = args.wcag_json.parent / "sc"

    axe_by_sc: dict[str, list[str]] = {}
    if args.axe_rules:
        for r in json.loads(args.axe_rules.read_text(encoding="utf-8")):
            for t in r["tags"]:
                sc = sc_from_tag(t)
                if sc:
                    axe_by_sc.setdefault(sc, []).append(r["ruleId"])

    items = []
    for p in data["principles"]:
        for g in p["guidelines"]:
            for s in g["successcriteria"]:
                if s.get("level") not in ("A", "AA"):
                    continue
                slug = s["id"].split(":", 1)[1]
                found = sorted(sc_dir.glob(f"*/{slug}.html"))
                if len(found) != 1:
                    raise SystemExit(f"{s['num']}: HTML 원문을 찾지 못함 ({slug}, {found})")
                body, notes = normative_text(found[0])
                items.append({
                    "sc": s["num"],
                    "level": s["level"],
                    "handle": s["handle"],
                    "guideline": f"{g['num']} {g['handle']}",
                    "new_in": next((v for v in ("2.0", "2.1", "2.2") if v in s["versions"]), None),
                    "url": f"https://www.w3.org/TR/WCAG22/#{slug}",
                    "understanding": f"https://www.w3.org/WAI/WCAG22/Understanding/{slug}.html",
                    "text": body,
                    "notes": notes,
                    "axe_rules": sorted(set(axe_by_sc.get(s["num"], []))),
                })

    doc = {
        "source": "WCAG22",
        "origin": "https://github.com/w3c/wcag tag WCAG22-20241212 guidelines/wcag.json",
        "recommendation": "https://www.w3.org/TR/2024/REC-WCAG22-20241212/",
        "license_note": "W3C 문서 원문 인용(수정 없음). Copyright © 2020-2024 World Wide Web Consortium. W3C 문서 사용 규칙(W3C Document License, https://www.w3.org/copyright/document-license/)에 따른다. 문서 상태: W3C Recommendation 12 December 2024. 이 파일은 저장소의 다른 라이선스를 따르지 않는다(NOTICE.md).",
        "axe_core_version": args.axe_version or None,
        "scope": "Level A·AA 성공기준만. AAA 31개와 삭제된 4.1.1 Parsing은 제외.",
        "count": len(items),
        "criteria": items,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        "# 자동 생성 파일 — 손으로 고치지 않는다. scripts/extract_wcag.py 로 다시 만든다.\n"
        + yaml.safe_dump(doc, allow_unicode=True, sort_keys=False, width=120),
        encoding="utf-8",
    )
    print(f"{OUT.relative_to(REPO)}: {len(items)}개")


if __name__ == "__main__":
    main()
