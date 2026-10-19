# ux-baseline

어느 웹프로젝트에도 적용할 수 있는 UI/UX 룰을 모으고, 룰끼리 충돌하지 않는 하나의 체계로 만드는 저장소입니다.
최종 산출물은 읽는 문서가 아니라 **디자인 토큰 · 컴포넌트 규격 · 자동 검사(린트) · AI 에이전트용 패키지**입니다.

> **상태: 0.x 미리보기.** 확정 룰 484개(MUST 68), 충돌 결정 70건, 컴포넌트 규격 56개, 자동 검사 201개 중 146개 설정 반영.
>
> 한계 — 쓰기 전에 알아 둘 것
> - **사람 전문가 검토 전이다.** 출처 원문(WCAG 2.2, KWCAG 2.2, KRDS 가이드라인 2025.08 PDF, AI 투명성 가이드라인)과의 대조와 결정 검토를 모두 AI 에이전트가 했다. 검토 과정과 찾아 고친 오류는 [trials/README.md](trials/README.md) 에 있다.
> - **자동 검사가 모든 룰을 보지 않는다.** 문구가 알기 쉬운지 같은 룰은 사람이 확인한다. 어느 룰이 검사되는지는 `lint/rule-map.yaml`(`configured: true`).
> - **KRDS 일부 컴포넌트**(토스트·스낵바·바텀시트·범위 슬라이더·수량 토글·플로팅 버튼·음성지원·뒤로가기 버튼)는 가이드라인 PDF 에 없고 웹 페이지에만 있어, 이를 근거로 한 룰은 웹 페이지만 근거다.
> - **시험 범위가 좁다.** AI 적용 시험은 화면 7종, Claude 모델 2종(Opus·Sonnet)으로 했다.
> - 이 체계는 KRDS·WCAG 의 공식 해석이 아니다. 법적 준수 판단은 원문과 전문가 검토로 한다.
> - 라이선스: 코드(검사기·명령·스크립트)는 MIT, 룰·결정·규격·문서는 CC BY 4.0 — [LICENSE](LICENSE). 제3자 자료(KRDS 원본 토큰, WCAG 원문 추출본)는 각자의 조건을 따른다.
> - 미리보기라 이슈·문의 응답이 늦을 수 있다.
> - 출처 자료의 이용 조건과 출처 표기: [NOTICE.md](NOTICE.md) (KRDS 공공누리 제1유형, WCAG W3C Document License). 이 프로젝트는 행정안전부·W3C 등과 관계없는 독립 프로젝트다.

## 다른 프로젝트에 도입하기

GitHub 저장소 `ngenieer/ux-baseline` 의 태그나 릴리스의 .tgz 로 설치한다(아직 npm 레지스트리에 올리지 않았다). 설치된 패키지 이름은 `ux-baseline` 이다.

```sh
npm i -D github:ngenieer/ux-baseline#v0.2.1     # 또는 릴리스의 .tgz: npm i -D ./ux-baseline-0.2.1.tgz
npx playwright-core install chromium          # 브라우저 검사용 (한 번)
npx ux-baseline init                          # 설정·토큰·AI 지침(AGENTS.md)·Claude 스킬 설치
npx ux-baseline check                         # 모든 검사 → 위반을 룰 ID 와 함께 보고 (오류 있으면 종료 코드 1)
```

### AI 에게 웹페이지를 만들게 하려면
1. 위 설치를 한 번 해 둔다. `init` 이 만든 `AGENTS.md`·`CLAUDE.md`·스킬을 코딩 AI(Claude Code, Codex, Cursor 등)가 작업 시작 때 스스로 읽는다 — 룰을 매번 설명하지 않아도 된다.
2. 같은 폴더에서 평소처럼 시킨다. 화면 용도·사용자, 공공 서비스 여부, 만들 상태(빈 결과·오류·로딩)를 적고, 마지막 검사 결과 줄을 보여 달라고 한다.
   > 구청 누리집 공지사항 목록 페이지를 만들어 줘. 검색·표·페이지 이동, 검색 결과 없음·오류 화면 포함. 끝나면 `npx ux-baseline check` 마지막 결과 줄을 그대로 보여 줘.
3. AI 의 "지켰다"를 믿지 말고 직접 `npx ux-baseline check` 를 돌려 맨 위 줄(`오류 N / 경고 M`)을 본다. 오류가 있으면 보고서 전체를 AI 에게 붙여 넣고 고치게 한다.

자동 검사가 모든 룰을 보지는 않는다(문구의 알기 쉬움 등은 사람이 확인). 검사 명령을 돌릴 수 없는 채팅 화면에서 시키면 검사 → 고침 단계가 빠지므로 프로젝트 폴더에서 일하는 코딩 AI 를 권한다.

자세한 내용: [docs/adoption.md](docs/adoption.md). 변경 기록: [CHANGELOG.md](CHANGELOG.md).

## 진행 단계

1. **수집** — 룰 후보를 모은다. 출처를 반드시 남긴다.
2. **정규화** — 모든 룰을 같은 형식으로 다시 쓰고 중복을 합친다.
3. **충돌 해소** — 룰 간 충돌을 우선순위 원칙으로 결정하고 이유를 기록한다.
4. **플랫폼화** — 확정 룰을 토큰 / 컴포넌트 규격 / 검사 항목 / AI 패키지로 변환한다.

각 룰 파일의 `stage` 필드가 그 룰이 어느 단계까지 왔는지 나타냅니다.

## 구조

```
schema/        룰·충돌 기록·출처 레지스트리의 JSON 스키마, 카테고리 목록, 룰 템플릿
rules/<CAT>/   룰 1개 = YAML 1개 (예: rules/A11Y/A11Y-001.yaml)
sources/       출처 레지스트리 (registry.yaml) — 룰은 여기 ID로 출처를 참조
conflicts/     충돌 해소 기록 (CF-###.yaml)
tokens/        디자인 토큰 (W3C DTCG JSON → tokens/build/tokens.css) — 4단계
components/    컴포넌트 규격: 표준 마크업·CSS·상태·키보드·적용 룰 (YAML, 검사기로 검증) — 4단계
lint/          stylelint(자체 규칙 포함)·html-validate·axe-core 설정, 룰↔검사 대응표 rule-map.yaml — 4단계
dist/          AI용 산출물: 핵심 요약(AGENTS.md/CLAUDE.md용), 카테고리별 상세, 컴포넌트 규격, Claude 스킬 패키지 — 4단계
kit/          설치 패키지의 명령(ux-baseline init·check·update)과 검사 엔진, 도입 시험(kit/test/e2e.mjs)
trials/        AI 적용 시험 — 패키지만 받은 에이전트의 결과물을 같은 검사 엔진으로 채점
docs/          정규화 정책, 프로젝트 지침 사본(charter.md), 도입 안내(adoption.md)
scripts/       검증기 등 도구
tests/         검증기 테스트
```

## 카테고리

LAYOUT 레이아웃 · TYPO 타이포그래피 · COLOR 색상·대비 · SPACE 간격 · SHAPE 형태 · NAV 내비게이션 ·
FORM 폼·입력 · STATE 피드백·상태 · A11Y 접근성 · RESP 반응형 · MOTION 모션 ·
COPY 문구·마이크로카피 · PERF 성능 체감 · AI AI 기능

목록은 `schema/categories.yaml`이 원본이며, 검증기는 여기에 없는 카테고리를 거부합니다.

## 룰 형식

`schema/rule.template.yaml`을 복사해서 씁니다. 필드와 프로젝트 형식의 대응은 다음과 같습니다.

| 프로젝트 형식 | 필드 |
|---|---|
| ID | `id` (+ `category`) |
| 강도 | `strength`: MUST / SHOULD / MAY |
| 룰 | `statement` |
| 측정 기준 | `measurement` — 판정 불가면 `type: guide` |
| 자동 검사 | `automation` |
| 근거 | `rationale` |
| 출처 | `sources[].ref` → `sources/registry.yaml` |
| 적용 범위 | `scope` |
| 예외 | `exceptions` |
| 관계 | `relations` (conflicts / depends / duplicates / refines) |
| 예시 | `examples.good` / `examples.bad` (확정 룰은 필수) |
| 상태 | `status.value`: candidate(후보) / confirmed(확정) / deprecated(폐기) |

추가 필드: `stage`(진행 단계), `needs_verification`(확인 필요), `korean_specific`(한국어 웹 특수 룰).

## 충돌 시 우선순위

1. 법규·접근성 (WCAG 2.2, KWCAG 2.2)
2. 사용자의 과업 완료 (사용성)
3. 일관성 (체계 내부 규칙과의 정합)
4. 미적 선호

## 출처 신뢰도

`sources/registry.yaml`의 `type`으로 구분합니다.
표준(`standard`)과 검증된 연구(`research`)를 우선하고, 디자인 시스템은 참고 사례(`reference_system`),
근거 없는 관행은 선호(`preference`)로 표시합니다. 원문을 직접 확인하기 전에는 `verified: false`입니다.

## 검증

```sh
pip install -r requirements.txt
python scripts/validate.py                    # 형식·단계·상태·참조·모호한 표현 검사
python scripts/validate.py --base origin/main # + ID 삭제·변경 검사
python -m unittest discover -s tests          # 검증기 자체 테스트
python scripts/build_tokens.py --check        # 토큰 산출물 최신 여부
python scripts/build_dist.py --check          # dist/ 최신 여부
cd lint && npm ci && npm test && npm run rulemap:check   # 검사기 픽스처, 컴포넌트 규격, rule-map
```

검증기가 강제하는 주요 규칙:

- 파일명 = ID, 디렉터리 = 카테고리, 카테고리는 목록에 있는 것만
- 2단계부터 모든 필드 필수, `type: rule`은 측정 기준 필수
- 판정 불가(`guide`)는 MUST 불가
- 3단계부터 모든 충돌 관계에 해소 기록(`CF-###`) 필수, 기록과 룰 양쪽에 결론 반영
- 확정 룰은 좋은 예·나쁜 예, 검증된 출처, `needs_verification: false` 필수
- statement·측정 기준의 모호한 표현("적절히", "충분히" 등): 확정 룰은 오류, 2단계 이상 후보는 경고
- 한번 생긴 룰·충돌 ID가 사라지면 오류 (폐기는 `status`로)
- `platformed`는 rule-map에서 그 룰의 stylelint·html-validate·axe-core 검사가 모두 설정에 반영된 확정 룰만
- 컴포넌트 규격: 적용 룰은 확정 룰만, CSS 변수는 토큰에 있는 것만, 필수 구성 클래스는 마크업에 있어야 함.
  마크업·CSS 자체는 `lint/test-components.mjs`가 stylelint·html-validate·axe-core로 위반 0을 확인

push와 PR마다 GitHub Actions가 같은 검사를 실행합니다.
