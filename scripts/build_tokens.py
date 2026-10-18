#!/usr/bin/env python3
"""디자인 토큰 빌드: KRDS 원본 + 체계 추가 토큰 → DTCG 2025.10 JSON + CSS 변수.

입력
  tokens/vendor/krds/transformed_tokens.json   KRDS 원본 (Tokens Studio 형식, 1rem = 10px)
  tokens/system.tokens.json                    이 체계가 추가로 정의한 토큰 (DTCG, 1rem = 16px)
출력
  tokens/ux-baseline.tokens.json               통합 DTCG 토큰 (1rem = 16px로 환산)
  tokens/build/tokens.css                      CSS 변수 (:root, 고대비 테마, PC 반응형)

사용
  python scripts/build_tokens.py           # 생성
  python scripts/build_tokens.py --check   # 커밋된 결과와 같은지 검사 (CI)
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
KRDS = REPO / "tokens/vendor/krds/transformed_tokens.json"
SYSTEM = REPO / "tokens/system.tokens.json"
OUT_JSON = REPO / "tokens/ux-baseline.tokens.json"
OUT_CSS = REPO / "tokens/build/tokens.css"
PC_MIN_WIDTH = "1024px"  # KRDS: PC 모드 = large(1024px) 이상 (RESP-004)

REF = re.compile(r"^\{([^}]+)\}$")


def hex_to_color(h: str) -> dict:
    h = h.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    out = {"colorSpace": "srgb", "components": [round(r, 4), round(g, 4), round(b, 4)], "hex": "#" + h[:6].lower()}
    if len(h) == 8:
        out["alpha"] = round(int(h[6:8], 16) / 255, 4)
    return out


def rem10_to_dim(v: str) -> dict:
    m = re.fullmatch(r"(-?[\d.]+)rem", v.strip())
    if not m:
        raise ValueError(v)
    return {"value": round(float(m.group(1)) * 10 / 16, 4), "unit": "rem"}


def krds_walk(o, path=()):
    if isinstance(o, dict) and "value" in o and not isinstance(o["value"], dict):
        yield path, o
    elif isinstance(o, dict):
        for k, v in o.items():
            yield from krds_walk(v, path + (k,))


# KRDS 경로 → 통합 토큰 경로 매핑
def map_path(p: tuple) -> tuple | None:
    top = p[0]
    if top == "primitive" and p[1] == "color":
        mode = "light" if p[2] == "light" else "high-contrast"
        return ("palette", mode) + p[3:]
    if top == "primitive" and p[1] == "number":
        return ("space", "scale") + p[2:]
    if top == "primitive" and p[1] == "typo":
        return None  # 서체·두께는 system.tokens.json 에서 정의(KRDS 값은 'Regular' 같은 이름이라 DTCG 형식이 아님)
    if top in ("mode-light", "mode-high-contrast"):
        theme = "light" if top == "mode-light" else "high-contrast"
        return ("theme", theme) + p[1:]
    if top in ("responsive-pc", "responsive-mobile"):
        return ("responsive", "pc" if top.endswith("pc") else "mobile") + p[1:]
    if top == "semantic":
        return ("space",) + p[1:] if p[1] in ("gap", "padding") else (p[1],) + p[2:]
    return None


def convert_ref(v: str, pathmap: dict) -> str:
    m = REF.match(v)
    if not m:
        return v
    src = tuple(m.group(1).split("."))
    tgt = pathmap.get(src)
    if not tgt:
        raise KeyError(f"참조 대상 없음: {v}")
    return "{" + ".".join(tgt) + "}"


def set_in(d: dict, path: tuple, value: dict) -> None:
    for k in path[:-1]:
        d = d.setdefault(k, {})
    d[path[-1]] = value


def build() -> dict:
    krds = json.loads(KRDS.read_text(encoding="utf-8"))
    items = list(krds_walk(krds))
    pathmap = {p: map_path(p) for p, _ in items}
    tokens: dict = {
        "$description": "ux-baseline 디자인 토큰. KRDS v1.1.0 토큰을 1rem = 16px 기준으로 환산하고 체계 토큰을 더했다. 자동 생성 파일.",
    }
    for p, o in items:
        tgt = pathmap[p]
        if not tgt:
            continue
        t, v = o.get("type"), o["value"]
        if isinstance(v, str) and REF.match(v):
            val = convert_ref(v, pathmap)
        elif t == "color":
            val = hex_to_color(v)
        elif t == "dimension":
            val = rem10_to_dim(v)
        else:
            continue
        set_in(tokens, tgt, {"$type": t, "$value": val, "$extensions": {"ux-baseline.source": "KRDS/" + "/".join(p)}})
    system = json.loads(SYSTEM.read_text(encoding="utf-8"))
    for k, v in system.items():
        if k.startswith("$"):
            continue
        if k in tokens:
            raise KeyError(f"system 토큰 그룹 {k} 가 KRDS 그룹과 겹친다")
        tokens[k] = v
    return tokens


# ---------------- CSS ----------------
def flatten(o, path=(), inherited=None):
    t = o.get("$type", inherited) if isinstance(o, dict) else inherited
    if isinstance(o, dict) and "$value" in o:
        yield path, t, o["$value"]
        return
    if isinstance(o, dict):
        for k, v in o.items():
            if not k.startswith("$"):
                yield from flatten(v, path + (k,), t)


def var_name(path: tuple) -> str:
    p = list(path)
    if p[0] == "theme":            # theme.light.color.text.basic → --color-text-basic
        p = p[2:]
    elif p[0] == "responsive":     # responsive.pc.font-size.body.large → --font-size-body-large
        p = p[2:]
    elif p[0] == "palette":        # palette.light.primary.50 → --palette-primary-50 / palette.high-contrast... → --palette-hc-...
        p = ["palette"] + (["hc"] if p[1] == "high-contrast" else []) + p[2:]
    return "--" + "-".join(str(x) for x in p).replace(".", "_")


def css_value(t: str, v, lookup) -> str:
    if isinstance(v, str) and REF.match(v):
        return f"var({var_name(lookup(REF.match(v).group(1)))})"
    if t == "color":
        if "alpha" in v:
            r, g, b = (round(c * 255) for c in v["components"])
            return f"rgb({r} {g} {b} / {v['alpha']})"
        return v["hex"]
    if t in ("dimension", "duration"):
        return f"{v['value']:g}{v['unit']}"
    if t == "cubicBezier":
        return "cubic-bezier(" + ", ".join(f"{x:g}" for x in v) + ")"
    if t == "fontFamily":
        vals = v if isinstance(v, list) else [v]
        return ", ".join(f'"{x}"' if " " in x and x not in ("sans-serif", "serif") else x for x in vals)
    if t in ("fontWeight", "number"):
        return f"{v:g}" if isinstance(v, (int, float)) else str(v)
    if t == "shadow":
        layers = v if isinstance(v, list) else [v]
        out = []
        for s in layers:
            col = css_value("color", s["color"], lookup) if isinstance(s["color"], dict) else css_value("color", s["color"], lookup)
            out.append(" ".join([("inset " if s.get("inset") else "")
                                 + css_value("dimension", s["offsetX"], lookup),
                                 css_value("dimension", s["offsetY"], lookup),
                                 css_value("dimension", s["blur"], lookup),
                                 css_value("dimension", s["spread"], lookup), col]))
        return ", ".join(out)
    raise ValueError(f"CSS 변환 불가 타입 {t}: {v}")


def build_css(tokens: dict) -> str:
    flat = list(flatten(tokens))
    by_path = {".".join(p): p for p, _, _ in flat}

    def lookup(ref: str) -> tuple:
        return by_path[ref]

    root, hc, pc = [], [], []
    for p, t, v in flat:
        line = f"  {var_name(p)}: {css_value(t, v, lookup)};"
        if p[0] == "theme" and p[1] == "high-contrast":
            hc.append(line)
        elif p[0] == "responsive" and p[1] == "pc":
            pc.append(line)
        else:
            root.append(line)
    return "\n".join([
        "/* ux-baseline 디자인 토큰 — 자동 생성(scripts/build_tokens.py). 직접 고치지 않는다. */",
        "/* 1rem = 16px(브라우저 기본) 기준. 루트 font-size 를 px로 고정하지 않는다(TYPO-026). */",
        ":root {", *root, "}", "",
        "/* 고대비(선명한 화면) 모드: <html data-theme=\"high-contrast\"> */",
        ':root[data-theme="high-contrast"] {', *hc, "}", "",
        f"/* PC(뷰포트 {PC_MIN_WIDTH} 이상) 글자·레이아웃 간격 */",
        f"@media (min-width: {PC_MIN_WIDTH}) {{", "  :root {", *["  " + x for x in pc], "  }", "}", ""])


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()
    tokens = build()
    out_json = json.dumps(tokens, ensure_ascii=False, indent=2) + "\n"
    out_css = build_css(tokens)
    if args.check:
        bad = [str(p.relative_to(REPO)) for p, c in ((OUT_JSON, out_json), (OUT_CSS, out_css))
               if not p.exists() or p.read_text(encoding="utf-8") != c]
        if bad:
            print("토큰 산출물이 최신이 아니다. python scripts/build_tokens.py 실행 후 커밋:", *bad, sep="\n  ")
            return 1
        print("토큰 산출물 최신")
        return 0
    OUT_JSON.write_text(out_json, encoding="utf-8")
    OUT_CSS.parent.mkdir(parents=True, exist_ok=True)
    OUT_CSS.write_text(out_css, encoding="utf-8")
    n = sum(1 for _ in flatten(tokens))
    print(f"토큰 {n}개 → {OUT_JSON.relative_to(REPO)}, {OUT_CSS.relative_to(REPO)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
