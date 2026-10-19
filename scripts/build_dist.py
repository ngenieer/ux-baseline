#!/usr/bin/env python3
"""확정(confirmed) 룰에서 AI용 산출물을 만든다. dist/ 아래 파일은 손으로 고치지 않는다.

산출물
  dist/core.md                       핵심 요약 — MUST 룰 + 공통 지침. 각 프로젝트의 AGENTS.md / CLAUDE.md 에 넣는 분량
  dist/categories/<CAT>.md            카테고리별 상세 — 확정 룰 전체(강도·측정 기준·예외·예시·결정)
  dist/skill/ux-baseline/SKILL.md     Claude 스킬 진입점
  dist/skill/ux-baseline/references/  core.md 와 카테고리별 상세 사본
  dist/rules.json                     확정 룰 요약(ID → 카테고리·강도·제목·문장) — 검사 보고서(ux-baseline check)가 위반을 룰 문장으로 풀어 쓸 때 쓴다

사용
  python scripts/build_dist.py            # 확정 룰만
  python scripts/build_dist.py --check    # 생성 결과가 커밋된 dist/ 와 같은지 검사 (CI용)
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

REPO = Path(__file__).resolve().parent.parent
DIST = REPO / "dist"
STRENGTH_ORDER = {"MUST": 0, "SHOULD": 1, "MAY": 2}


def load_rules() -> list[dict]:
    rules = []
    for p in sorted((REPO / "rules").rglob("*.yaml")):
        d = yaml.safe_load(p.read_text(encoding="utf-8"))
        if d["status"]["value"] == "confirmed":
            rules.append(d)
    return rules


def load_categories() -> dict:
    return yaml.safe_load((REPO / "schema/categories.yaml").read_text(encoding="utf-8"))["categories"]


def load_conflicts() -> dict:
    out = {}
    for p in sorted((REPO / "conflicts").glob("CF-*.yaml")):
        d = yaml.safe_load(p.read_text(encoding="utf-8"))
        out[d["id"]] = d
    return out


def sort_key(r: dict):
    return (STRENGTH_ORDER.get(r.get("strength"), 9), r["id"])


def one_line(text: str) -> str:
    return " ".join(str(text).split())


def rule_decisions(r: dict) -> list[str]:
    ids = [rel["decision"] for rel in r.get("relations") or [] if rel.get("decision")]
    ids += list(r.get("decisions") or [])
    return sorted(set(ids))


CORE_HEAD = """# UI/UX 기준 — 핵심 요약 (ux-baseline)

이 파일은 ngenieer/ux-baseline 에서 자동 생성된다. 고치려면 룰 저장소를 고친다.
웹 UI를 만들거나 고칠 때 아래 MUST 룰을 지킨다. SHOULD·MAY와 상세 측정 기준·예시는 카테고리별 상세 파일을 읽는다.

## 작업 방식
- 페이지는 `tokens.css`(디자인 토큰) → `base.css`(기본 스타일: box-sizing, 한국어 줄바꿈, 행간) → 프로젝트 CSS 순서로 불러온다.
- 색·간격·글자·반경·그림자·모션 값은 디자인 토큰(CSS 변수)만 쓴다. 토큰에 없는 값을 직접 쓰지 않는다.
- 초점 표시(outline)를 없애지 않는다. 스크립트로 초점을 옮기는 제목·영역(tabindex="-1")도 마찬가지다.
- UI를 만든 뒤 자동 검사(axe-core, stylelint, html-validate 등)를 돌리고 위반을 고친다. "지켰다"는 자기 보고는 검증이 아니다 — 검사 결과를 보고한다.
- 룰끼리 부딪혀 보이면 룰에 적힌 결정(CF-###)을 따른다. 결정이 없으면 법규·접근성 > 과업 완료 > 일관성 > 미적 선호 순으로 판단하고, 판단을 사람에게 알린다.
- 한국어 UI: 본문은 lang="ko", 줄바꿈과 날짜·문구 표기는 TYPO·COPY 상세 파일을 따른다.
"""


def wcag_sc(r: dict) -> list[str]:
    out = []
    for s in r["sources"]:
        if s["ref"] == "WCAG22":
            m = re.search(r"SC (\d\.\d+\.\d+)", s.get("locator") or "")
            if m:
                out.append(m.group(1))
    return out


def compact_ok(r: dict) -> bool:
    """WCAG 성공기준을 그대로 옮긴 룰(체계 결정으로 바뀐 것이 없음)은 core 에서 제목과 SC 번호만 쓴다."""
    return bool(wcag_sc(r)) and not rule_decisions(r)


def load_components() -> list[dict]:
    out = []
    for p in sorted((REPO / "components").glob("*.yaml")) if (REPO / "components").exists() else []:
        d = yaml.safe_load(p.read_text(encoding="utf-8"))
        if d["status"] == "confirmed":
            out.append(d)
    return out


def build_component(c: dict, rules_by_id: dict) -> str:
    lines = [f"# {c['title']} (`.{c['id']}`)", "", "ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.", "",
             one_line(c["summary"]), ""]
    if c.get("use_instead"):
        lines.append("## 대신 쓸 것")
        for u in c["use_instead"]:
            lines.append(f"- {u['when']} → {u['use']}" + (f" ({u['rule']})" if u.get("rule") else ""))
        lines.append("")
    lines += ["## 구성", "", "| 부분 | 클래스 | 요소 | 필수 | 설명 |", "|---|---|---|---|---|"]
    for a in c["anatomy"]:
        lines.append(f"| {a['part']} | `.{a['class']}` | `{a['element']}` | {'예' if a.get('required') else ''} | {one_line(a.get('note', ''))} |")
    lines += ["", "## 표준 마크업", "", "```html", c["markup"].rstrip(), "```", "", "## 표준 CSS (토큰만 사용)", "", "```css", c["css"].rstrip(), "```", ""]
    if c.get("states"):
        lines.append("## 상태")
        for st in c["states"]:
            lines.append(f"- **{st['name']}**: {one_line(st['markup_change'])}")
        lines.append("")
    if c.get("keyboard"):
        lines += ["## 키보드", "", "| 키 | 동작 |", "|---|---|"]
        for k in c["keyboard"]:
            lines.append(f"| {k['key']} | {one_line(k['action'])} |")
        lines.append("")
    if c.get("behavior"):
        lines.append("## 동작")
        lines += [f"- {one_line(b)}" for b in c["behavior"]]
        lines.append("")
    lines += ["## 적용 룰", "", "| ID | 강도 | 룰 |", "|---|---|---|"]
    for rid in c["rules"]:
        r = rules_by_id[rid]
        lines.append(f"| {rid} | {r.get('strength', '')} | {one_line(r['statement']).replace('|', '/')} |")
    lines.append("")
    if c.get("kit_differences") or c.get("krds"):
        lines.append("## KRDS 키트와의 관계")
        k = c.get("krds") or {}
        if k.get("kit_classes"):
            lines.append("- 클래스 대응: " + ", ".join(f"`.{a}` ↔ `{b}`" for a, b in k["kit_classes"].items()))
        lines += [f"- {one_line(x)}" for x in c.get("kit_differences") or []]
        lines.append("")
    return "\n".join(lines)


def build_core(rules: list[dict], cats: dict) -> str:
    must_all = [r for r in rules if r.get("strength") == "MUST"]
    lines = [CORE_HEAD, f"\n## MUST 룰 ({len(must_all)}개)\n",
             "WCAG 2.2 성공기준을 그대로 따르는 룰은 'ID 제목 (SC 번호)'만 적었다 — 해당 SC 원문대로 지킨다. "
             "체계가 결정(CF)으로 더 정하거나 WCAG 밖에서 온 룰은 문장 전체를 적었다.\n"]
    for cat in cats:
        must = sorted((r for r in must_all if r["category"] == cat), key=sort_key)
        if not must:
            continue
        lines.append(f"\n### {cat} — {cats[cat]}\n")
        compact = [r for r in must if compact_ok(r)]
        if compact:
            lines.append("- WCAG 그대로: " + " · ".join(
                f"{r['id']} {r.get('title', '')} ({', '.join(wcag_sc(r))})" for r in compact))
        for r in must:
            if not compact_ok(r):
                lines.append(f"- **{r['id']}** {one_line(r['statement'])}")
    counts = {s: sum(1 for r in rules if r.get("strength") == s) for s in ("MUST", "SHOULD", "MAY")}
    lines.append("\n## 상세 파일\n")
    lines.append(f"확정 룰 {len(rules)}개 (MUST {counts['MUST']} / SHOULD {counts['SHOULD']} / MAY {counts['MAY']}). "
                 "카테고리별 상세: `categories/<CAT>.md`.")
    for cat in cats:
        n = sum(1 for r in rules if r["category"] == cat)
        if n:
            lines.append(f"- `categories/{cat}.md` — {cats[cat]} ({n}개)")
    comps = load_components()
    if comps:
        lines.append(f"\n## 컴포넌트 규격 ({len(comps)}개)\n")
        lines.append("아래 컴포넌트를 만들 때는 `components/<이름>.md`의 표준 마크업·CSS·키보드 동작을 그대로 쓴다: "
                     + ", ".join(f"`{c['id']}`({c['title']})" for c in comps) + ".")
    return "\n".join(lines) + "\n"


def fmt_examples(ex: dict) -> list[str]:
    out = []
    for kind, label in (("good", "좋은 예"), ("bad", "나쁜 예")):
        for e in (ex or {}).get(kind) or []:
            note = f" — {one_line(e['note'])}" if e.get("note") else ""
            out.append(f"{label}{note}")
            out.append(f"```{e['lang'] if e['lang'] != 'text' else ''}")
            out.append(e["code"].rstrip("\n"))
            out.append("```")
    return out


def build_category(cat: str, title: str, rules: list[dict], conflicts: dict) -> str:
    lines = [f"# {cat} — {title}", "",
             "ux-baseline 확정 룰. 자동 생성 파일이다.", "",
             "| ID | 강도 | 룰 |", "|---|---|---|"]
    for r in sorted(rules, key=sort_key):
        lines.append(f"| {r['id']} | {r.get('strength', '')} | {one_line(r['statement']).replace('|', '/')} |")
    for r in sorted(rules, key=sort_key):
        lines += ["", f"## {r['id']} {r.get('title', '')}".rstrip(), "",
                  f"- 강도: **{r.get('strength')}**" + (" (판정에 사람의 판단 필요: guide)" if r.get("type") == "guide" else ""),
                  f"- 룰: {one_line(r['statement'])}"]
        m = r.get("measurement")
        if m:
            lines.append(f"- 측정 기준: {one_line(m['criteria'])}")
            if m.get("method"):
                lines.append(f"- 판정 방법: {one_line(m['method'])}")
        a = r.get("automation") or {}
        checks = ", ".join(f"{c['tool']}{'/' + c['rule'] if c.get('rule') else ''}" for c in a.get("checks") or [])
        if a:
            lines.append(f"- 자동 검사: {a.get('feasibility')}" + (f" ({checks})" if checks else ""))
        sc = r.get("scope") or {}
        if sc.get("targets"):
            lines.append(f"- 적용 대상: {', '.join(map(str, sc['targets']))}")
        for ex in r.get("exceptions") or []:
            lines.append(f"- 예외: {one_line(ex)}")
        for cid in rule_decisions(r):
            cf = conflicts.get(cid)
            if cf:
                lines.append(f"- 결정 {cid}: {one_line(cf['decision'])}")
        if r.get("rationale"):
            lines.append(f"- 근거: {one_line(r['rationale'])}")
        srcs = "; ".join(f"{s['ref']}" + (f" {s['locator']}" if s.get("locator") else "") for s in r["sources"])
        lines.append(f"- 출처: {srcs}")
        ex_lines = fmt_examples(r.get("examples"))
        if ex_lines:
            lines.append("")
            lines += ex_lines
    return "\n".join(lines) + "\n"


SKILL = """---
name: ux-baseline
description: 웹 UI(HTML/CSS/컴포넌트)를 만들거나 고치거나 검토할 때 쓴다. 접근성(WCAG 2.2·KWCAG 2.2)·한국어 웹·폼·내비게이션·상태 표시·AI 기능 UI 기준과 디자인 토큰 사용 규칙을 적용한다.
---

# ux-baseline — 웹 UI/UX 기준

1. 먼저 `references/core.md`를 읽는다. MUST 룰과 작업 방식(토큰만 사용, 자동 검사 후 보고)이 있다.
   프로젝트에 토큰·기본 스타일이 없으면 `assets/tokens.css`, `assets/base.css` 를 복사해 쓴다.
2. 만들 UI에 해당하는 카테고리 상세를 필요한 것만 읽는다:
{index}
3. 규격이 있는 컴포넌트는 표준 마크업·CSS를 그대로 쓴다:
{components}
4. 룰끼리 부딪혀 보이면 룰에 적힌 결정(CF-###)을 따른다.
5. 결과물은 자동 검사기로 확인하고 위반을 고친 뒤, 실행한 검사와 결과를 보고한다.
   프로젝트에 `ux-baseline` 이 설치돼 있으면 `npx ux-baseline check` 가 모든 검사를 한 번에 돌리고
   위반을 룰 ID 와 함께 보고한다. 오류가 0이 될 때까지 고치고 다시 돌린다.
"""


def build_all() -> dict[Path, str]:
    rules = load_rules()
    cats = load_categories()
    conflicts = load_conflicts()
    files: dict[Path, str] = {}
    core = build_core(rules, cats)
    files[DIST / "core.md"] = core
    index = []
    for cat, title in cats.items():
        rs = [r for r in rules if r["category"] == cat]
        if not rs:
            continue
        body = build_category(cat, title, rs, conflicts)
        files[DIST / "categories" / f"{cat}.md"] = body
        files[DIST / "skill/ux-baseline/references" / f"{cat}.md"] = body
        index.append(f"   - `references/{cat}.md` — {title}")
    rules_by_id = {r["id"]: r for r in rules}
    comp_index = []
    for c in load_components():
        body = build_component(c, rules_by_id)
        files[DIST / "components" / f"{c['id']}.md"] = body
        files[DIST / "skill/ux-baseline/references/components" / f"{c['id']}.md"] = body
        comp_index.append(f"   - `references/components/{c['id']}.md` — {c['title']}")
    files[DIST / "skill/ux-baseline/assets/tokens.css"] = (REPO / "tokens/build/tokens.css").read_text(encoding="utf-8")
    files[DIST / "skill/ux-baseline/assets/base.css"] = (REPO / "tokens/base.css").read_text(encoding="utf-8")
    files[DIST / "skill/ux-baseline/references/core.md"] = core
    files[DIST / "skill/ux-baseline/SKILL.md"] = SKILL.format(index="\n".join(index),
                                                              components="\n".join(comp_index) or "   - (없음)")
    files[DIST / "rules.json"] = json.dumps(
        {r["id"]: {"category": r["category"], "strength": r.get("strength"), "title": r.get("title", ""),
                   "statement": one_line(r["statement"])} for r in sorted(rules, key=sort_key)},
        ensure_ascii=False, indent=1) + "\n"
    return files


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()
    files = build_all()
    generated = {p for p in files}
    existing = {p for p in DIST.rglob("*") if p.is_file() and p.suffix in (".md", ".css") and p.name != "README.md"}
    if args.check:
        stale = [str(p.relative_to(REPO)) for p, c in files.items() if not p.exists() or p.read_text(encoding="utf-8") != c]
        stale += [str(p.relative_to(REPO)) + " (불필요)" for p in existing - generated]
        if stale:
            print("dist/ 가 룰과 다르다. python scripts/build_dist.py 를 실행해 커밋할 것:")
            print("\n".join("  " + s for s in stale))
            return 1
        print("dist/ 최신")
        return 0
    for p in existing - generated:
        p.unlink()
    for p, c in files.items():
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(c, encoding="utf-8")
    core_lines = files[DIST / "core.md"].count("\n")
    print(f"생성: {len(files)}개 파일, core.md {core_lines}줄")
    return 0


if __name__ == "__main__":
    sys.exit(main())
