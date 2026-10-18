# 2단계 정규화 정책

수집(collected) 룰을 정규화(normalized)로 올릴 때 따르는 기준입니다. 사람과 AI 에이전트가 같은 판단을 내리도록 고정해 둡니다.
여기서 정한 기준과 다르게 처리하면 해당 룰의 `verification_note`에 이유를 남깁니다.

## 1. 중복 병합

- **같은 요구**(같은 대상에 같은 조건을 요구)를 하는 룰이 여럿이면 하나만 남긴다.
- 남길 룰(정본)은 출처 강도로 고른다: WCAG/KWCAG > 법규 > KRDS > research > guide > reference_system > preference.
  강도가 같으면: 같은 카테고리 안에서는 번호가 작은 룰, 카테고리가 다르면 **그 요구의 주제에 맞는 카테고리**의 룰
  (예: 상태 유지 요구면 STATE, 키보드·보조기술 요구면 A11Y). 그래도 정해지지 않으면 ID 문자열이 앞서는 룰.
- 정본이 아닌 룰은 지우지 않는다(ID 불변). `status: {value: deprecated, reason: "<정본 ID>로 병합", superseded_by: <정본 ID>}`로 바꾸고,
  그 룰의 출처를 정본 `sources`에 옮겨 적는다. 폐기 룰의 `stage`는 그대로 둔다.
- **일부만 겹치면** 병합하지 않고 `relations`에 `refines`(더 구체화) 또는 `depends`(전제)로 잇는다.
- 다른 카테고리 룰과 병합할 때 정본의 카테고리는 바꾸지 않는다. 카테고리가 맞지 않아 보이면 `verification_note`에 "카테고리 재검토"라고 적는다.

## 2. 강도 (strength)

| 근거 | 강도 |
|---|---|
| WCAG 2.2 Level A·AA, KWCAG 2.2 검사항목, 원문을 확인한 법규 의무 | MUST |
| WCAG AAA | SHOULD (구현 비용이 크면 MAY, 이유 기록) |
| KRDS가 "해야 한다·필수·~하지 않는다"로 쓴 것 | SHOULD + 태그 `public-sector-must` (공공 프로젝트에서는 MUST로 읽는다) |
| KRDS가 "권장·바람직·좋다"로 쓴 것 | MAY (태그 `system-choice`면 MAY) |
| KRDS 상호작용 표처럼 강도 표현 없이 동작을 서술한 것 | SHOULD + 태그 `krds-descriptive` |
| 원문이 "고려한다"처럼 결과를 강제하지 않는 것 | MAY |
| 원 논문을 확인한 연구 결과 | SHOULD |
| guide·reference_system만 근거 | SHOULD 또는 MAY — 근거 문장의 강도를 따른다 |
| preference만 근거 | MAY |

- `type: guide`(판정 불가)는 MUST가 될 수 없다(검증기가 막음).
- 상위 우선순위(법규·접근성)에 근거한 룰의 강도를 낮추지 않는다.

## 3. 유형 (type)과 측정 기준 (measurement)

- `type: rule`: 지켰는지 결정적으로 판정할 수 있다. `measurement.criteria`에 수치·셀렉터·CSS 속성값·ARIA 상태·DOM 조건을 쓴다.
  `measurement.method`에는 판정 방법(자동 검사 도구 또는 수동 절차)을 쓴다. 수동 절차도 단계와 통과 조건이 분명해야 한다.
- `type: guide`: 사람의 판단이 필요해 결정적으로 판정할 수 없다. `measurement`는 생략하거나 점검 질문으로 쓴다.
- statement·criteria에 모호한 말(적절히·충분히·너무·적당히·가능한 한·가급적·되도록·자연스럽게·약간·다소)을 쓰지 않는다.
  원문이 모호하면 수치로 바꾸고 그 수치의 출처를 적는다. 출처가 없으면 `PREFERENCE` 출처를 추가하고 MAY로 둔다.

## 4. 자동 검사 (automation)

- `full`: 기존 검사기 규칙이 이 룰의 측정 기준을 모두 판정한다(규칙 ID 기재).
- `partial`: 일부만 판정(예: axe가 존재 여부만 검사하고 의미 적절성은 수동). 나머지 수동 부분을 `note`에 적는다.
- `none`: 자동 검사 불가. 4단계에서 커스텀 검사를 만들 수 있으면 `note`에 방법을 적는다.
- axe-core 규칙은 `sources/extracts/WCAG22-A-AA.yaml`의 `axe_rules`를 참고하되, 실제로 그 조건을 검사하는지 판단한다.

## 5. 적용 범위·예외·관계

- `scope.level`: global / component / situation. `targets`에 CSS 셀렉터(`button`, `input[type=text]`) 또는 컴포넌트·상황 이름.
- `exceptions`: 출처가 명시한 예외만 쓴다. 지어내지 않는다.
- `relations`: `conflicts/BACKLOG.md`에 있는 충돌 후보는 `type: conflicts`로 연결한다(결정은 3단계).

## 6. 검증 (needs_verification)

- `needs_verification: false`는 정규화하는 사람/에이전트가 **해당 출처 위치를 다시 열어** statement·수치가 원문과 맞는지 확인했을 때만.
  - WCAG: `sources/extracts/WCAG22-A-AA.yaml`의 원문과 대조.
  - KRDS: 해당 페이지를 다시 열어 그 규칙 문장을 확인.
  - 연구·가이드: 원문을 연다. 원문을 열지 못한 출처(`verified: false`)만 근거인 수치는 `needs_verification: true`로 남긴다.
- `verification_note`는 대조 결과로 새로 쓴다: "2026-MM-DD 원문 대조(방법): 결과". 1단계의 메모 중 여전히 유효한 것은 남긴다.

## 7. 예시 (examples)

- 2단계에서는 선택. HTML/CSS로 짧게 쓸 수 있으면 좋은 예·나쁜 예를 하나씩 넣는다. 확정(3단계 이후) 전에는 필수다.

## 8. 단계 표시

- 위 항목을 다 채우면 `stage: normalized`. 하나라도 비면 `collected`로 둔다(검증기가 필수 필드를 검사).
- `status`는 `candidate`를 유지한다. 확정은 3단계 충돌 해소 뒤에 한다.
