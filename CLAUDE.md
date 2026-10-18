# ux-baseline 작업 규칙 (AI 에이전트용)

이 저장소는 어느 웹프로젝트에도 적용할 UI/UX 룰을 수집·정규화·충돌 해소·플랫폼화한다.
작업 전에 이 파일과 `README.md`를 읽는다. 응답과 룰 문서는 한국어로 쓴다.

## 단계 — 지금 어느 단계 작업인지 항상 밝힌다
| stage | 단계 | 이 단계를 끝내려면 |
|---|---|---|
| `collected` | 1 수집 | statement + 출처(sources) |
| `normalized` | 2 정규화 | 모든 필드 작성, 중복 병합 |
| `resolved` | 3 충돌 해소 | 모든 `conflicts` 관계에 `decision: CF-###` |
| `platformed` | 4 플랫폼화 | 확정 룰만. 토큰·린트·dist 반영 |

앞 단계 조건을 채우지 못한 룰은 stage를 올리지 않는다.

## 반드시 지킬 것
- 룰 1개 = `rules/<CATEGORY>/<ID>.yaml` 1개. 형식은 `schema/rule.template.yaml`.
- ID는 바꾸거나 지우지 않는다. 버릴 때는 `status.value: deprecated` + `reason`.
- 카테고리는 `schema/categories.yaml`에 있는 것만 쓴다. 새 카테고리는 사람에게 제안만 한다.
- 출처는 `sources/registry.yaml`에 먼저 등록하고 `ref`로 참조한다.
  원문을 직접 열어 확인하기 전에는 `verified: false`. 확정 룰은 검증된 출처만 인용할 수 있다.
- 수치·출처를 지어내지 않는다. 불확실하면 `needs_verification: true` + `verification_note`.
- 디자인 시스템(Material, HIG 등)은 `reference_system`, 근거 없는 관행은 `preference`로 분류한다.
- statement와 measurement에 "적절히·충분히·너무·적당히·가능한 한·가급적·되도록" 같은 표현을 쓰지 않는다.
  수치나 조건으로 바꾼다.
- 판정할 수 없는 룰은 `type: guide`로 두고, guide는 MUST로 만들지 않는다.

## 정규화 기준
2단계 작업은 `docs/normalization-policy.md`를 따른다(중복 병합, 강도 배정, 측정 기준, 검증 표시).

## 충돌 해소 우선순위
1. 법규·접근성 (WCAG 2.2, KWCAG 2.2) → 2. 과업 완료(사용성) → 3. 일관성 → 4. 미적 선호.
충돌은 `conflicts/CF-###.yaml`에 기록하고, 관련 룰 양쪽 `relations`에 `decision`과 결론 요약(`note`)을 적는다.
상대가 룰이 아닌 외부 기준(다른 표준·법규·지침)이면 CF에 `against`를 쓰고 룰의 `decisions`에 CF ID를 넣는다.
관계 정합성은 `python scripts/sync_relations.py`로 맞춘다(폐기 룰 대상 관계를 정본으로, conflicts 양방향).
우선순위와 다르게 판단했으면 `deviates_from_priority: true`와 이유를 남긴다.

## 검증 — 자기 보고는 검증이 아니다
커밋 전에 반드시 실행하고, 오류가 0이 될 때까지 고친다.
```sh
python scripts/validate.py --base origin/main
python -m unittest discover -s tests
python scripts/build_tokens.py --check   # 토큰을 바꿨으면 먼저 python scripts/build_tokens.py
python scripts/build_dist.py --check     # 룰을 바꿨으면 먼저 python scripts/build_dist.py
(cd lint && npm ci && npm test && npm run rulemap:check)  # 룰의 automation 을 바꿨으면 먼저 npm run rulemap
```
컴포넌트 규격(`components/<id>.yaml`)을 고쳤으면 `cd lint && COMPONENTS=<id> node test-components.mjs`로 먼저 확인한다.
`platformed` 는 `lint/rule-map.yaml`에서 그 룰의 stylelint·html-validate·axe-core 검사가 모두 설정에 반영된(`configured: true`) 확정 룰만 받는다.
CI(GitHub Actions)가 같은 검사를 다시 돌린다. "지켰다"고 쓰지 말고 검사 결과를 보고한다.
