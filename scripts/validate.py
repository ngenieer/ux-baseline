#!/usr/bin/env python3
"""ux-baseline 룰 저장소 검증기.

검사 항목
  1. 형식: 룰·충돌 기록·출처 레지스트리가 JSON 스키마를 따르는가
  2. 위치: 파일명 == ID, 디렉터리 == 카테고리, 카테고리가 목록에 있는가
  3. 단계(stage)별 필수 필드가 채워졌는가
  4. 상태(status)별 조건 (확정 룰은 예시·검증된 출처·측정 기준 필수 등)
  5. 참조 무결성: ID 중복, 존재하지 않는 룰·출처·충돌 기록 참조
  6. 모호한 표현 ("적절히", "충분히" 등) — 확정 룰은 오류, 나머지는 경고
  7. ID 불변성: --base 로 준 git 커밋에 있던 룰·충돌 ID가 사라지면 오류

사용
  python scripts/validate.py                 # 저장소 루트에서
  python scripts/validate.py --base origin/main
  python scripts/validate.py --root tests/fixtures/valid
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

import yaml
from jsonschema import Draft202012Validator

REPO = Path(__file__).resolve().parent.parent
SCHEMA_DIR = REPO / "schema"

STAGE_ORDER = ["collected", "normalized", "resolved", "platformed"]
LINT_TOOLS = {"stylelint", "html-validate", "axe-core"}  # lint/ 패키지가 설정을 가진 검사기

# AI가 해석을 달리할 수 있는 표현. 수치나 조건으로 바꿔야 한다.
VAGUE_PATTERNS = [
    r"적절[히한하]",
    r"충분[히한하]",
    r"너무",
    r"적당[히한하]",
    r"가능한\s*한",
    r"가급적",
    r"되도록",
    r"약간",
    r"다소",
    r"자연스럽[게운]",
]
VAGUE_RE = re.compile("|".join(VAGUE_PATTERNS))


class Report:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, where: str, msg: str) -> None:
        self.errors.append(f"[오류] {where}: {msg}")

    def warn(self, where: str, msg: str) -> None:
        self.warnings.append(f"[경고] {where}: {msg}")


class _Loader(yaml.SafeLoader):
    """날짜(2026-10-18)를 date 객체가 아닌 문자열로 읽는다. 스키마가 date 를 string 으로 정의하기 때문."""


_Loader.yaml_implicit_resolvers = {
    k: [(tag, rx) for tag, rx in v if tag != "tag:yaml.org,2002:timestamp"]
    for k, v in yaml.SafeLoader.yaml_implicit_resolvers.items()
}


def load_yaml(path: Path, report: Report):
    try:
        with path.open(encoding="utf-8") as f:
            return yaml.load(f, Loader=_Loader)  # noqa: S506 (SafeLoader 기반)
    except yaml.YAMLError as e:
        report.error(str(path), f"YAML 파싱 실패: {e}")
        return None


def load_schema(name: str) -> Draft202012Validator:
    with (SCHEMA_DIR / name).open(encoding="utf-8") as f:
        return Draft202012Validator(json.load(f))


def schema_errors(validator: Draft202012Validator, data, where: str, report: Report) -> bool:
    ok = True
    for err in sorted(validator.iter_errors(data), key=lambda e: list(e.path)):
        loc = "/".join(str(p) for p in err.path) or "(최상위)"
        report.error(where, f"스키마 위반 @ {loc}: {err.message}")
        ok = False
    return ok


def stage_at_least(stage: str, target: str) -> bool:
    return STAGE_ORDER.index(stage) >= STAGE_ORDER.index(target)


def check_rule(rule: dict, where: str, report: Report, registry: dict, conflict_ids: set) -> None:
    stage = rule["stage"]
    status = rule["status"]["value"]
    rtype = rule.get("type")
    strength = rule.get("strength")

    # --- 단계별 필수 필드 -------------------------------------------------
    if stage_at_least(stage, "normalized"):
        for field in ("type", "strength", "rationale", "scope", "automation", "exceptions", "relations"):
            if field not in rule:
                report.error(where, f"stage={stage} 이면 '{field}' 필수 (빈 목록이라도 명시)")
        if rtype == "rule" and "measurement" not in rule:
            report.error(where, "type=rule 은 measurement 필수. 판정이 불가능하면 type=guide 로 분류")
        if not rule.get("title"):
            report.warn(where, "title 이 없으면 요약 문서에서 읽기 어렵다")

    if stage_at_least(stage, "resolved"):
        for rel in rule.get("relations", []):
            if rel["type"] == "conflicts" and "decision" not in rel:
                report.error(where, f"stage={stage} 인데 {rel['id']} 와의 충돌에 decision(CF-###) 이 없다")

    if stage == "platformed" and status != "confirmed":
        report.error(where, "platformed 단계는 확정(confirmed) 룰만 가능")

    # --- 유형·강도 -------------------------------------------------------
    if rtype == "guide" and strength == "MUST":
        report.error(where, "guide(판정 불가)는 MUST 가 될 수 없다. 측정 기준을 만들거나 강도를 낮춘다")
    if strength == "MUST" and rtype == "rule" and "measurement" not in rule:
        report.error(where, "MUST 룰은 measurement 필수")

    # --- 상태별 조건 ------------------------------------------------------
    if status == "deprecated" and not rule["status"].get("reason"):
        report.error(where, "폐기(deprecated) 룰은 status.reason 필수")

    if status == "confirmed":
        if not stage_at_least(stage, "resolved"):
            report.error(where, f"확정 룰은 stage 가 resolved 이상이어야 한다 (현재 {stage})")
        ex = rule.get("examples") or {}
        if not ex.get("good") or not ex.get("bad"):
            report.error(where, "확정 룰은 examples.good / examples.bad 를 각각 1개 이상 가져야 한다")
        if rule.get("needs_verification"):
            report.error(where, "needs_verification=true 인 룰은 확정할 수 없다")
        for src in rule["sources"]:
            entry = registry.get(src["ref"])
            if entry and not entry.get("verified"):
                report.error(where, f"확정 룰이 미검증 출처 {src['ref']} 를 인용한다 (registry verified=false)")
        if all((registry.get(s["ref"]) or {}).get("type") == "preference" for s in rule["sources"]) and strength == "MUST":
            report.error(where, "선호(preference) 출처만으로는 MUST 를 확정할 수 없다")

    # --- 참조 ------------------------------------------------------------
    for src in rule["sources"]:
        if src["ref"] not in registry:
            report.error(where, f"출처 '{src['ref']}' 가 sources/registry.yaml 에 없다")
    for rel in rule.get("relations", []):
        if rel["id"] == rule["id"]:
            report.error(where, "자기 자신을 관계로 참조")
        if "decision" in rel and rel["decision"] not in conflict_ids:
            report.error(where, f"충돌 기록 {rel['decision']} 가 conflicts/ 에 없다")
    for cid in rule.get("decisions") or []:
        if cid not in conflict_ids:
            report.error(where, f"충돌 기록 {cid} 가 conflicts/ 에 없다")
    # 체계 선택(검증된 preference 출처)은 그 선택을 기록한 CF를 가리켜야 한다
    for src in rule["sources"]:
        entry = registry.get(src["ref"]) or {}
        if entry.get("type") == "preference" and entry.get("verified"):
            cid = str(src.get("locator") or "")
            if not re.fullmatch(r"CF-\d{3}", cid) or cid not in conflict_ids:
                report.error(where, f"체계 선택 출처 {src['ref']} 의 locator 는 존재하는 CF ID여야 한다 (현재 '{cid}')")
            elif cid not in (rule.get("decisions") or []) and not any(
                    rel.get("decision") == cid for rel in rule.get("relations") or []):
                report.error(where, f"체계 선택 출처가 가리키는 {cid} 가 룰의 decisions 에 없다")
    if rule["status"].get("superseded_by") == rule["id"]:
        report.error(where, "superseded_by 가 자기 자신")

    # --- 모호한 표현 ------------------------------------------------------
    texts = [("statement", rule.get("statement", ""))]
    if "measurement" in rule:
        texts.append(("measurement.criteria", rule["measurement"].get("criteria", "")))
    for field, text in texts:
        m = VAGUE_RE.search(text or "")
        if m:
            msg = f"{field} 에 모호한 표현 '{m.group(0)}' — 수치나 조건으로 바꿀 것"
            if status == "confirmed":
                report.error(where, msg)
            elif stage_at_least(stage, "normalized"):
                report.warn(where, msg)


def git_ids_at(base: str, root: Path) -> tuple[set, set]:
    """base 커밋의 rules/·conflicts/ 파일명에서 ID를 뽑는다."""
    try:
        out = subprocess.run(
            ["git", "ls-tree", "-r", "--name-only", base, "--", "rules", "conflicts"],
            cwd=root, check=True, capture_output=True, text=True,
        ).stdout
    except subprocess.CalledProcessError as e:
        raise SystemExit(f"--base {base} 를 읽을 수 없다: {e.stderr.strip()}")
    rule_ids, cf_ids = set(), set()
    for line in out.splitlines():
        p = Path(line)
        if p.suffix != ".yaml":
            continue
        (rule_ids if p.parts[0] == "rules" else cf_ids).add(p.stem)
    return rule_ids, cf_ids


def validate(root: Path, base: str | None) -> Report:
    report = Report()
    rule_v = load_schema("rule.schema.json")
    conflict_v = load_schema("conflict.schema.json")
    source_v = load_schema("source.schema.json")

    cats = (load_yaml(root / "schema" / "categories.yaml", report)
            if (root / "schema" / "categories.yaml").exists()
            else load_yaml(SCHEMA_DIR / "categories.yaml", report)) or {}
    categories = set((cats.get("categories") or {}).keys())

    # --- 출처 레지스트리 ---------------------------------------------------
    registry: dict = {}
    reg_path = root / "sources" / "registry.yaml"
    if reg_path.exists():
        reg = load_yaml(reg_path, report)
        if reg is not None and schema_errors(source_v, reg, str(reg_path), report):
            for s in reg["sources"]:
                if s["id"] in registry:
                    report.error(str(reg_path), f"출처 ID 중복: {s['id']}")
                registry[s["id"]] = s
                if s["verified"] and not s.get("url"):
                    report.error(str(reg_path), f"{s['id']}: verified=true 인데 url 이 없다")
    else:
        report.error(str(reg_path), "출처 레지스트리가 없다")

    # --- 충돌 기록 --------------------------------------------------------
    conflicts: dict = {}
    for path in sorted((root / "conflicts").glob("*.yaml")):
        data = load_yaml(path, report)
        if data is None or not schema_errors(conflict_v, data, str(path), report):
            continue
        if path.stem != data["id"]:
            report.error(str(path), f"파일명({path.stem})과 id({data['id']})가 다르다")
        if data["id"] in conflicts:
            report.error(str(path), f"충돌 기록 ID 중복: {data['id']}")
        if len(data["rules"]) == 1 and not data.get("against"):
            report.error(str(path), "룰이 1개인 결정은 against(상대 기준)를 적어야 한다")
        if data.get("deviates_from_priority") and len(data["reason"].strip()) < 20:
            report.error(str(path), "우선순위와 다르게 판단했으면 reason 에 이유를 구체적으로 적어야 한다")
        conflicts[data["id"]] = data

    # --- 룰 --------------------------------------------------------------
    rules: dict = {}
    for path in sorted((root / "rules").rglob("*.yaml")):
        where = str(path.relative_to(root))
        data = load_yaml(path, report)
        if data is None or not schema_errors(rule_v, data, where, report):
            continue
        rid, cat = data["id"], data["category"]
        if path.stem != rid:
            report.error(where, f"파일명({path.stem})과 id({rid})가 다르다")
        if rid.split("-")[0] != cat:
            report.error(where, f"id 접두어와 category({cat})가 다르다")
        if path.parent.name != cat:
            report.error(where, f"rules/{cat}/ 디렉터리에 있어야 한다")
        if cat not in categories:
            report.error(where, f"카테고리 '{cat}' 는 schema/categories.yaml 에 없다 (임의 추가 금지)")
        if rid in rules:
            report.error(where, f"룰 ID 중복: {rid}")
        rules[rid] = data
        check_rule(data, where, report, registry, set(conflicts))

    # --- 룰 간 참조 -------------------------------------------------------
    for rid, data in rules.items():
        for rel in data.get("relations", []):
            if rel["id"] not in rules:
                report.error(f"rules/{data['category']}/{rid}.yaml", f"관계 대상 {rel['id']} 가 없다")
        where = f"rules/{data['category']}/{rid}.yaml"
        sup = data["status"].get("superseded_by")
        if sup and sup not in rules:
            report.error(where, f"superseded_by {sup} 가 없다")
        elif sup and rules[sup]["status"]["value"] == "deprecated":
            report.error(where, f"superseded_by {sup} 도 폐기된 룰이다 — 최종 정본을 가리킬 것")
        if data["status"]["value"] != "deprecated":
            for rel in data.get("relations", []):
                other = rules.get(rel["id"])
                if not other:
                    continue
                if other["status"]["value"] == "deprecated":
                    report.warn(where, f"폐기된 룰 {rel['id']} 를 관계로 가리킨다 — scripts/sync_relations.py 로 정본으로 바꿀 것")
                elif rel["type"] == "conflicts" and not any(
                        r["type"] == "conflicts" and r["id"] == rid for r in other.get("relations", [])):
                    report.warn(where, f"{rel['id']} 와의 conflicts 가 한쪽에만 있다 — scripts/sync_relations.py")
    # --- 플랫폼화(4단계): 검사기 설정 반영 -----------------------------------
    platformed = {rid: d for rid, d in rules.items() if d["stage"] == "platformed"}
    if platformed:
        map_path = root / "lint" / "rule-map.yaml"
        rule_map = ((load_yaml(map_path, report) or {}).get("rules") or {}) if map_path.exists() else None
        if rule_map is None:
            report.error("lint/rule-map.yaml", "platformed 룰이 있는데 lint/rule-map.yaml 이 없다 (lint 에서 npm run rulemap)")
        else:
            for rid, d in platformed.items():
                where = f"rules/{d['category']}/{rid}.yaml"
                entry = rule_map.get(rid)
                if entry is None:
                    report.error(where, "lint/rule-map.yaml 에 없다 — npm run rulemap 으로 다시 만들 것")
                    continue
                mapped = {(c["tool"], c.get("rule")): c["configured"] for c in entry.get("checks") or []}
                for c in (d.get("automation") or {}).get("checks") or []:
                    if c["tool"] not in LINT_TOOLS:
                        continue
                    key = (c["tool"], c.get("rule"))
                    if key not in mapped:
                        report.error(where, f"{c['tool']} {c.get('rule')} 가 rule-map 에 없다 — npm run rulemap")
                    elif not mapped[key]:
                        report.error(where, f"platformed 인데 {c['tool']} {c.get('rule')} 가 lint/ 설정에 반영되지 않았다")

    for cid, cf in conflicts.items():
        for rid in cf["rules"]:
            if rid not in rules:
                report.error(f"conflicts/{cid}.yaml", f"룰 {rid} 가 없다")
            elif not (any(r.get("decision") == cid for r in rules[rid].get("relations", []))
                      or cid in (rules[rid].get("decisions") or [])):
                report.error(f"conflicts/{cid}.yaml",
                             f"{rid} 의 relations 에 decision: {cid} 가 없다 (결론을 룰에 명시해야 한다)")

    # --- 확정 룰 예시의 CSS 변수는 토큰에 있어야 한다 -------------------------
    tokens_file = root / "tokens" / "build" / "tokens.css"
    if tokens_file.exists():
        known = set(re.findall(r"^\s+(--[a-z0-9_-]+):", tokens_file.read_text(encoding="utf-8"), re.M))
        for rid, data in rules.items():
            if data["status"]["value"] != "confirmed":
                continue
            for kind in ("good", "bad"):
                for ex in (data.get("examples") or {}).get(kind) or []:
                    declared = set(re.findall(r"(--[a-z0-9_-]+)\s*:", ex["code"]))
                    for var in re.findall(r"var\((--[a-z0-9_-]+)", ex["code"]):
                        if var not in known and var not in declared:
                            report.error(f"rules/{data['category']}/{rid}.yaml",
                                         f"예시({kind})가 토큰에 없는 변수 {var} 를 쓴다 — 토큰을 쓰거나 예시 안에서 토큰 값으로 선언할 것")

    # --- 컴포넌트 규격 (4단계) ---------------------------------------------
    comp_dir = root / "components"
    if comp_dir.exists():
        comp_v = load_schema("component.schema.json")
        tokens_css = root / "tokens" / "build" / "tokens.css"
        token_names = set(re.findall(r"^\s+(--[a-z0-9_-]+):", tokens_css.read_text(encoding="utf-8"), re.M)) if tokens_css.exists() else set()
        for path in sorted(comp_dir.glob("*.yaml")):
            where = str(path.relative_to(root))
            data = load_yaml(path, report)
            if data is None or not schema_errors(comp_v, data, where, report):
                continue
            if path.stem != data["id"]:
                report.error(where, f"파일명({path.stem})과 id({data['id']})가 다르다")
            if data["anatomy"][0]["class"] != data["id"]:
                report.error(where, "anatomy 첫 항목(루트)의 class 는 컴포넌트 id 와 같아야 한다")
            for part in data["anatomy"]:
                if not re.search(r'class="[^"]*\b' + re.escape(part["class"]) + r'(?![\w-])', data["markup"]) and part.get("required"):
                    report.error(where, f"필수 구성 요소 클래스 {part['class']} 가 markup 에 없다")
            for rid in data["rules"]:
                r = rules.get(rid)
                if r is None:
                    report.error(where, f"룰 {rid} 가 없다")
                elif r["status"]["value"] != "confirmed":
                    report.error(where, f"룰 {rid} 는 확정 룰이 아니다 ({r['status']['value']})")
            refs = set(re.findall(r"\(?[A-Z][A-Z0-9]*-\d{3}\)?", " ".join(str(x) for x in (data.get("behavior") or []) + (data.get("kit_differences") or []))))
            for rid in {x.strip("()") for x in refs}:
                if rid in rules and rid not in data["rules"] and not rid.startswith("CF-"):
                    report.warn(where, f"본문이 {rid} 를 언급하는데 rules 목록에 없다")
            if token_names:
                for var in re.findall(r"var\((--[a-z0-9_-]+)", data["css"]):
                    if var not in token_names:
                        report.error(where, f"CSS 가 토큰에 없는 변수 {var} 를 쓴다 (tokens/build/tokens.css)")

    # --- ID 불변성 --------------------------------------------------------
    if base:
        old_rules, old_cfs = git_ids_at(base, root)
        for rid in sorted(old_rules - set(rules)):
            report.error("rules/", f"{rid} 가 사라졌다. ID는 바꾸거나 지우지 않는다 — status: deprecated 로 폐기할 것")
        for cid in sorted(old_cfs - set(conflicts)):
            report.error("conflicts/", f"{cid} 가 사라졌다. 충돌 기록은 지우지 않는다")

    report.counts = {
        "rules": len(rules),
        "conflicts": len(conflicts),
        "sources": len(registry),
        "by_status": {s: sum(1 for r in rules.values() if r["status"]["value"] == s)
                      for s in ("candidate", "confirmed", "deprecated")},
    }
    return report


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=REPO, help="검사할 저장소 루트 (기본: 이 저장소)")
    ap.add_argument("--base", help="ID 불변성 비교 기준 git 커밋 (예: origin/main)")
    ap.add_argument("--strict", action="store_true", help="경고도 실패로 처리")
    args = ap.parse_args()

    report = validate(args.root.resolve(), args.base)
    for line in report.errors + report.warnings:
        print(line)
    c = report.counts
    print(f"\n룰 {c['rules']}개 (후보 {c['by_status']['candidate']} / 확정 {c['by_status']['confirmed']} / "
          f"폐기 {c['by_status']['deprecated']}), 충돌 기록 {c['conflicts']}개, 출처 {c['sources']}개")
    print(f"오류 {len(report.errors)}개, 경고 {len(report.warnings)}개")
    if report.errors or (args.strict and report.warnings):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
