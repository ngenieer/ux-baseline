"""검증기 자체 테스트. 실행: python -m unittest discover -s tests

여기의 룰 내용은 검증기 동작 확인용 가짜 데이터이며 실제 룰이 아니다.
"""
from __future__ import annotations

import copy
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
import validate  # noqa: E402

REGISTRY = {
    "sources": [
        {"id": "STD_OK", "title": "테스트 표준", "type": "standard", "url": "https://example.com/std", "verified": True},
        {"id": "STD_UNVERIFIED", "title": "미검증 표준", "type": "standard", "url": None, "verified": False},
    ]
}

CONFIRMED = {
    "id": "A11Y-001",
    "category": "A11Y",
    "title": "테스트 룰",
    "stage": "resolved",
    "status": {"value": "confirmed"},
    "type": "rule",
    "strength": "MUST",
    "statement": "버튼에 접근 가능한 이름을 제공한다.",
    "measurement": {"criteria": "모든 button 요소의 accessible name 길이 > 0"},
    "automation": {"feasibility": "full", "checks": [{"tool": "axe-core", "rule": "button-name"}]},
    "rationale": "테스트용",
    "sources": [{"ref": "STD_OK", "locator": "1.1"}],
    "scope": {"level": "global"},
    "exceptions": [],
    "relations": [],
    "examples": {
        "good": [{"lang": "html", "code": "<button>저장</button>"}],
        "bad": [{"lang": "html", "code": "<button><svg></svg></button>"}],
    },
}

COLLECTED = {
    "id": "TYPO-001",
    "category": "TYPO",
    "stage": "collected",
    "status": {"value": "candidate"},
    "statement": "본문 한글에 word-break: keep-all 을 쓴다.",
    "sources": [{"ref": "STD_UNVERIFIED"}],
    "needs_verification": True,
}


class Repo:
    def __init__(self) -> None:
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        (self.root / "rules").mkdir()
        (self.root / "conflicts").mkdir()
        self.write("sources/registry.yaml", REGISTRY)

    def write(self, rel: str, data) -> None:
        p = self.root / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(yaml.safe_dump(data, allow_unicode=True, sort_keys=False), encoding="utf-8")

    def rule(self, data: dict, name: str | None = None) -> None:
        self.write(f"rules/{data['category']}/{name or data['id']}.yaml", data)

    def run(self, base: str | None = None) -> validate.Report:
        return validate.validate(self.root, base)

    def close(self) -> None:
        self.tmp.cleanup()


class ValidateTest(unittest.TestCase):
    def setUp(self) -> None:
        self.repo = Repo()

    def tearDown(self) -> None:
        self.repo.close()

    def assertOk(self, report):
        self.assertEqual(report.errors, [], "\n".join(report.errors))

    def assertFails(self, report, fragment: str):
        self.assertTrue(any(fragment in e for e in report.errors),
                        f"'{fragment}' 오류를 기대했지만:\n" + "\n".join(report.errors))

    def test_valid_confirmed_and_collected(self):
        self.repo.rule(CONFIRMED)
        self.repo.rule(COLLECTED)
        self.assertOk(self.repo.run())

    def test_confirmed_requires_examples(self):
        r = copy.deepcopy(CONFIRMED)
        del r["examples"]["bad"]
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "examples.good / examples.bad")

    def test_confirmed_requires_verified_source(self):
        r = copy.deepcopy(CONFIRMED)
        r["sources"] = [{"ref": "STD_UNVERIFIED"}]
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "미검증 출처")

    def test_guide_cannot_be_must(self):
        r = copy.deepcopy(CONFIRMED)
        r["type"] = "guide"
        del r["measurement"]
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "MUST 가 될 수 없다")

    def test_vague_word_in_confirmed(self):
        r = copy.deepcopy(CONFIRMED)
        r["statement"] = "버튼에 적절한 이름을 제공한다."
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "모호한 표현")

    def test_vague_word_in_normalized_is_warning(self):
        r = copy.deepcopy(CONFIRMED)
        r["stage"] = "normalized"
        r["status"] = {"value": "candidate"}
        r["statement"] = "버튼에 적절한 이름을 제공한다."
        self.repo.rule(r)
        report = self.repo.run()
        self.assertOk(report)
        self.assertTrue(any("모호한 표현" in w for w in report.warnings))

    def test_unknown_category(self):
        r = copy.deepcopy(COLLECTED)
        r["id"], r["category"] = "ICON-001", "ICON"
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "categories.yaml 에 없다")

    def test_filename_must_match_id(self):
        self.repo.rule(COLLECTED, name="TYPO-002")
        self.assertFails(self.repo.run(), "파일명")

    def test_normalized_requires_fields(self):
        r = copy.deepcopy(COLLECTED)
        r["stage"] = "normalized"
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "'strength' 필수")

    def test_resolved_conflict_needs_decision(self):
        a = copy.deepcopy(CONFIRMED)
        b = copy.deepcopy(CONFIRMED)
        b["id"] = "A11Y-002"
        a["relations"] = [{"type": "conflicts", "id": "A11Y-002"}]
        self.repo.rule(a)
        self.repo.rule(b)
        self.assertFails(self.repo.run(), "decision(CF-###) 이 없다")

    def test_conflict_record_must_be_reflected_in_rules(self):
        a = copy.deepcopy(CONFIRMED)
        b = copy.deepcopy(CONFIRMED)
        b["id"] = "A11Y-002"
        a["relations"] = [{"type": "conflicts", "id": "A11Y-002", "decision": "CF-001"}]
        self.repo.rule(a)
        self.repo.rule(b)
        self.repo.write("conflicts/CF-001.yaml", {
            "id": "CF-001", "rules": ["A11Y-001", "A11Y-002"], "summary": "테스트",
            "principle": 1, "decision": "A11Y-001 우선", "reason": "테스트", "date": "2026-10-18",
        })
        self.assertFails(self.repo.run(), "A11Y-002 의 relations 에 decision: CF-001 가 없다")

    def test_unquoted_date_is_accepted(self):
        a = copy.deepcopy(CONFIRMED)
        b = copy.deepcopy(CONFIRMED)
        b["id"] = "A11Y-002"
        a["relations"] = [{"type": "conflicts", "id": "A11Y-002", "decision": "CF-001"}]
        b["relations"] = [{"type": "conflicts", "id": "A11Y-001", "decision": "CF-001"}]
        self.repo.rule(a)
        self.repo.rule(b)
        (self.repo.root / "conflicts" / "CF-001.yaml").write_text(
            "id: CF-001\nrules: [A11Y-001, A11Y-002]\nsummary: 테스트\nprinciple: 1\n"
            "decision: A11Y-001 우선\nreason: 테스트\ndate: 2026-10-18\n", encoding="utf-8")
        self.assertOk(self.repo.run())

    def test_superseded_chain_is_error(self):
        a = copy.deepcopy(COLLECTED)
        b = copy.deepcopy(COLLECTED); b["id"] = "TYPO-002"
        c = copy.deepcopy(COLLECTED); c["id"] = "TYPO-003"
        a["status"] = {"value": "deprecated", "reason": "병합", "superseded_by": "TYPO-002"}
        b["status"] = {"value": "deprecated", "reason": "병합", "superseded_by": "TYPO-003"}
        for r in (a, b, c):
            self.repo.rule(r)
        self.assertFails(self.repo.run(), "도 폐기된 룰")

    def test_one_sided_conflict_warns(self):
        a = copy.deepcopy(CONFIRMED)
        a["stage"], a["status"] = "normalized", {"value": "candidate"}
        b = copy.deepcopy(a); b["id"] = "A11Y-002"
        a["relations"] = [{"type": "conflicts", "id": "A11Y-002"}]
        self.repo.rule(a)
        self.repo.rule(b)
        report = self.repo.run()
        self.assertOk(report)
        self.assertTrue(any("한쪽에만" in w for w in report.warnings))

    def test_system_choice_source_needs_cf(self):
        reg = copy.deepcopy(REGISTRY)
        reg["sources"].append({"id": "CHOICE", "title": "체계 선택", "type": "preference", "url": "https://example.com/cf", "verified": True})
        self.repo.write("sources/registry.yaml", reg)
        r = copy.deepcopy(CONFIRMED)
        r["strength"] = "MAY"
        r["sources"] = [{"ref": "STD_OK"}, {"ref": "CHOICE", "locator": "CF-001"}]
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "존재하는 CF ID")
        self.repo.write("conflicts/CF-001.yaml", {
            "id": "CF-001", "rules": ["A11Y-001"], "against": "선호", "summary": "s", "principle": 3,
            "decision": "d", "reason": "r", "deviates_from_priority": False, "date": "2026-10-18"})
        self.assertFails(self.repo.run(), "decisions 에 없다")
        r["decisions"] = ["CF-001"]
        self.repo.rule(r)
        self.assertOk(self.repo.run())

    def test_platformed_needs_configured_lint(self):
        r = copy.deepcopy(CONFIRMED)
        r["stage"] = "platformed"
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "rule-map.yaml 이 없다")
        self.repo.write("lint/rule-map.yaml", {"rules": {"A11Y-001": {"checks": [
            {"tool": "axe-core", "rule": "button-name", "configured": False}]}}})
        self.assertFails(self.repo.run(), "반영되지 않았다")
        self.repo.write("lint/rule-map.yaml", {"rules": {"A11Y-001": {"checks": [
            {"tool": "axe-core", "rule": "button-name", "configured": True}]}}})
        self.assertOk(self.repo.run())

    def test_component_spec_checks(self):
        self.repo.rule(CONFIRMED)
        css = self.repo.root / "tokens" / "build" / "tokens.css"
        css.parent.mkdir(parents=True, exist_ok=True)
        css.write_text(":root {\n  --space-gap-3: 0.5rem;\n}\n", encoding="utf-8")
        comp = {"id": "text-field", "title": "t", "status": "draft", "summary": "s",
                "anatomy": [{"part": "루트", "class": "text-field", "element": "div", "required": True}],
                "markup": '<div class="text-field"></div>', "css": ".text-field { gap: var(--space-gap-9); }",
                "rules": ["A11Y-001", "FORM-999"]}
        self.repo.write("components/text-field.yaml", comp)
        report = self.repo.run()
        self.assertFails(report, "토큰에 없는 변수 --space-gap-9")
        self.assertFails(report, "룰 FORM-999 가 없다")
        comp["css"] = ".text-field { gap: var(--space-gap-3); }"
        comp["rules"] = ["A11Y-001"]
        self.repo.write("components/text-field.yaml", comp)
        self.assertOk(self.repo.run())

    def test_example_vars_must_be_tokens(self):
        css = self.repo.root / "tokens" / "build" / "tokens.css"
        css.parent.mkdir(parents=True, exist_ok=True)
        css.write_text(":root {\n  --space-gap-3: 0.5rem;\n}\n", encoding="utf-8")
        r = copy.deepcopy(CONFIRMED)
        r["examples"]["good"] = [{"lang": "css", "code": ".a { gap: var(--space-gap-9); }"}]
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "토큰에 없는 변수 --space-gap-9")
        r["examples"]["good"] = [{"lang": "css", "code": ":root { --x: var(--space-gap-3); }\n.a { gap: var(--x); }"}]
        self.repo.rule(r)
        self.assertOk(self.repo.run())

    def test_dangling_relation(self):
        r = copy.deepcopy(CONFIRMED)
        r["relations"] = [{"type": "depends", "id": "COLOR-099"}]
        self.repo.rule(r)
        self.assertFails(self.repo.run(), "COLOR-099 가 없다")

    def test_id_must_not_disappear(self):
        self.repo.rule(CONFIRMED)
        git = ["git", "-c", "user.name=t", "-c", "user.email=t@t", "-C", str(self.repo.root)]
        subprocess.run(["git", "init", "-q", str(self.repo.root)], check=True)
        subprocess.run(git + ["add", "."], check=True)
        subprocess.run(git + ["commit", "-qm", "base"], check=True)
        (self.repo.root / "rules" / "A11Y" / "A11Y-001.yaml").unlink()
        self.assertFails(self.repo.run(base="HEAD"), "A11Y-001 가 사라졌다")


if __name__ == "__main__":
    unittest.main()
