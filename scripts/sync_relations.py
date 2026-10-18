#!/usr/bin/env python3
"""룰 간 관계(relations) 정합성 맞추기.

1. 폐기(deprecated)된 룰을 가리키는 관계는 그 룰의 superseded_by(정본)로 바꾼다.
2. conflicts 관계는 양방향으로 맞춘다: A가 B와 conflicts면 B에도 A와 conflicts를 넣는다(decision이 있으면 같이 복사).
3. 같은 (type, id) 관계가 중복되면 하나만 남긴다. 자기 자신을 가리키는 관계는 지운다.
폐기된 룰 자신의 relations는 건드리지 않는다.

사용: python scripts/sync_relations.py [--dry-run]
"""
from __future__ import annotations

import argparse
from pathlib import Path

import yaml

REPO = Path(__file__).resolve().parent.parent


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    paths = {p.stem: p for p in (REPO / "rules").rglob("*.yaml")}
    rules = {rid: yaml.safe_load(p.read_text(encoding="utf-8")) for rid, p in paths.items()}

    def canonical(rid: str) -> str:
        seen = set()
        while rid in rules and rules[rid]["status"]["value"] == "deprecated" and rules[rid]["status"].get("superseded_by"):
            if rid in seen:
                break
            seen.add(rid)
            rid = rules[rid]["status"]["superseded_by"]
        return rid

    changed: set[str] = set()
    # 1. 폐기 룰 대상 관계를 정본으로
    for rid, d in rules.items():
        if d["status"]["value"] == "deprecated":
            continue
        for rel in d.get("relations") or []:
            tgt = canonical(rel["id"])
            if tgt != rel["id"]:
                rel["note"] = (rel.get("note", "") + f" (원래 대상 {rel['id']} 폐기 → {tgt})").strip()
                rel["id"] = tgt
                changed.add(rid)
    # 2. conflicts 양방향
    for rid, d in list(rules.items()):
        if d["status"]["value"] == "deprecated":
            continue
        for rel in d.get("relations") or []:
            if rel["type"] != "conflicts" or rel["id"] not in rules:
                continue
            other = rules[rel["id"]]
            if other["status"]["value"] == "deprecated":
                continue
            other_rels = other.setdefault("relations", [])
            if not any(r["type"] == "conflicts" and r["id"] == rid for r in other_rels):
                new = {"type": "conflicts", "id": rid}
                if rel.get("decision"):
                    new["decision"] = rel["decision"]
                new["note"] = f"{rid} 쪽에서 기록한 충돌 후보의 반대 방향"
                other_rels.append(new)
                changed.add(rel["id"])
    # 3. 중복·자기참조 제거
    for rid, d in rules.items():
        if d["status"]["value"] == "deprecated" or not d.get("relations"):
            continue
        seen, keep = set(), []
        for rel in d["relations"]:
            key = (rel["type"], rel["id"])
            if rel["id"] == rid or key in seen:
                changed.add(rid)
                continue
            seen.add(key)
            keep.append(rel)
        d["relations"] = keep

    for rid in sorted(changed):
        print("수정", rid)
        if not args.dry_run:
            paths[rid].write_text(yaml.safe_dump(rules[rid], allow_unicode=True, sort_keys=False, width=110), encoding="utf-8")
    print(f"{len(changed)}개 파일 {'(dry-run)' if args.dry_run else '수정'}")


if __name__ == "__main__":
    main()
