# 단계 표시기 (`.step-indicator`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

3~7단계로 나뉜 신청·입력 절차에서 전체 단계와 현재 단계, 끝난 단계를 보여 줄 때 쓴다.

## 대신 쓸 것
- 사이트 계층 안의 현재 위치를 보여 주는 경우 → 브레드크럼 (NAV-028)
- 단계가 2개 이하이거나 8개 이상인 경우 → 단계를 합치거나 나눠 3~7단계로 다시 설계 (NAV-053)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(단계 목록) | `.step-indicator` | `ol` | 예 | 순서 있는 목록으로 단계 수와 순서를 보조기술에 전달한다(A11Y-007). 항목은 3~7개(NAV-053). 한 행(가로) 또는 한 열(세로)로만 나열한다(LAYOUT-052). |
| 단계 항목 | `.step-indicator__item` | `li` | 예 | 현재 단계에 aria-current="step" 과 step-indicator__item--current, 끝난 단계에 step-indicator__item--done. |
| 단계 번호 | `.step-indicator__number` | `span` | 예 | 예 '3단계'. |
| 단계 레이블 | `.step-indicator__label` | `span` | 예 | 짧은 단어·구로 쓴다. 설명이 더 필요하면 레이블 옆 보조 텍스트로 따로 둔다(COPY-035, COPY-003). |
| 상태 텍스트 | `.step-indicator__status` | `span` |  | '완료'·'현재 단계' 텍스트. 화면에서는 아이콘·굵기로 보이고 텍스트는 시각적으로만 숨긴다 — 색만으로 상태를 전하지 않는다(COLOR-001). |
| 모바일 요약 | `.step-indicator__summary` | `p` |  | 1024px 미만에서만 보이는 '4단계 중 3단계' 텍스트. 목록이 같은 정보를 보조기술에 주므로 aria-hidden="true"(RESP-013). |

## 표준 마크업

```html
<div class="step-indicator-demo">
  <h2 id="move-in-title">전입 신고</h2>
  <p class="step-indicator__summary" aria-hidden="true">4단계 중 3단계 · 이사 전 살던 곳</p>
  <ol class="step-indicator" role="list" aria-labelledby="move-in-title">
    <li class="step-indicator__item step-indicator__item--done">
      <span class="step-indicator__number">1단계</span>
      <span class="step-indicator__label">유의 사항 확인</span>
      <span class="step-indicator__status">완료</span>
    </li>
    <li class="step-indicator__item step-indicator__item--done">
      <span class="step-indicator__number">2단계</span>
      <span class="step-indicator__label">신청인 정보</span>
      <span class="step-indicator__status">완료</span>
    </li>
    <li class="step-indicator__item step-indicator__item--current" aria-current="step">
      <span class="step-indicator__number">3단계</span>
      <span class="step-indicator__label">이사 전 살던 곳</span>
      <span class="step-indicator__status">현재 단계</span>
    </li>
    <li class="step-indicator__item">
      <span class="step-indicator__number">4단계</span>
      <span class="step-indicator__label">이사 온 곳</span>
    </li>
  </ol>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.step-indicator {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--space-gap-3);
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: none;
}
.step-indicator__item {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-gap-1);
  min-inline-size: 0;
  padding-block-start: var(--space-padding-5);
  border-block-start: var(--border-width-variable-medium) solid var(--color-border-gray-light);
  color: var(--color-text-subtle);
}
.step-indicator__item--done {
  border-block-start-color: var(--color-border-primary);
  color: var(--color-text-basic);
}
.step-indicator__item--current {
  border-block-start-width: var(--space-scale-3);
  border-block-start-color: var(--color-border-primary);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}
.step-indicator__number {
  font-size: var(--font-size-label-small);
}
.step-indicator__label {
  font-size: var(--font-size-label-medium);
}
.step-indicator__item--done .step-indicator__number::after {
  content: " ✓" / "";
}
.step-indicator__status {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.step-indicator__summary {
  display: none;
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
@media (max-width: 1023px) {
  .step-indicator__summary {
    display: block;
  }
  .step-indicator__item .step-indicator__number,
  .step-indicator__item .step-indicator__label {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .step-indicator__item {
    padding-block-start: 0;
  }
}
```

## 상태
- **현재 단계**: 해당 li 에 step-indicator__item--current 와 aria-current="step", 상태 텍스트 '현재 단계'. 색 외에 굵기·두꺼운 상단 막대로 구분한다(NAV-054, COLOR-001).
- **끝난 단계**: li 에 step-indicator__item--done, 상태 텍스트 '완료', 번호 뒤 체크 표시(대체 텍스트 없는 생성 콘텐츠).
- **모바일(1024px 미만)**: step-indicator__summary 를 보이고 각 단계의 번호·레이블은 시각적으로만 숨긴다. ol·li 는 그대로 보조기술에 노출된다(RESP-013, CF-055).
- **건너뛸 수 있는 선택 단계**: 단계 레이블 옆 보조 텍스트에 '(선택)'을 쓰고, 해당 단계 화면에 '이 단계 건너뛰기' 버튼을 둔다(NAV-056).

## 동작
- 단계 표시기는 진행 상황을 보여 주기만 한다. 단계 항목을 링크·버튼으로 만들지 않는다(이전 단계로 돌아가기는 화면의 '이전' 버튼으로 한다).
- 절차 화면에서 현재 위치는 브레드크럼이 아니라 이 컴포넌트로 보여 준다(NAV-028).
- 단계는 왼쪽→오른쪽(세로 배치면 위→아래) 한 방향으로만 나열하고 여러 행으로 줄바꿈하지 않는다. DOM 순서 = 시각 순서(LAYOUT-052).
- 단계 사이 흐름 표시는 사이트 전체에서 한 방식(이 규격은 상단 연결 막대)만 쓴다(LAYOUT-053).
- 다음 단계 버튼은 필수 입력 전에도 비활성화하지 않는다. 누르면 검증하고 오류를 표시한다(FORM-080, CF-010).
- 선택 단계를 건너뛰면 다음 필수 단계로, 남은 필수 단계가 없으면 최종 검토·제출 단계로 이동한다(NAV-056).
- 레이블은 모든 지원 너비에서 한 줄로 보이는 길이로 쓴다. 1024px 미만에서는 '전체 중 현재' 요약으로 바꾼다(COPY-035, RESP-013).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| COPY-035 | SHOULD | 단계 표시기의 단계 레이블은 짧은 단어나 구로 써서 모든 지원 화면 너비에서 잘리거나 줄바꿈되지 않게 하고, 설명이 더 필요하면 보조 텍스트를 레이블 옆에 따로 둔다. |
| FORM-080 | SHOULD | 입력 필드의 오류(오류 메시지와 aria-invalid="true")는 사용자가 필드를 벗어날 때(blur)나 입력하는 동안이 아니라 다음 단계·제출 버튼을 눌렀을 때 표시하고, 다음 단계·제출 버튼은 입력 상태와 관계없이 비활성화하지 않는다. 제출 전에는 aria-invalid를 설정하지 않고 aria-describedby로 연결한 role="status" 영역의 텍스트만 바꾸는 조건 안내(입력 중 비밀번호 조건 충족 여부, 아이디 '중복 확인' 버튼 결과)를 허용한다. |
| LAYOUT-052 | SHOULD | 단계 표시기의 단계는 왼쪽에서 오른쪽, 또는 위에서 아래로 한 방향으로 나열한다. |
| LAYOUT-053 | SHOULD | 단계 사이 흐름 표시(연결선·화살표·꺾쇠 중 하나)를 사이트 전체에서 한 방식으로 통일한다. |
| NAV-028 | SHOULD | 절차의 진행 상황을 보여줄 때는 브레드크럼 대신 단계 표시기(단계 식별자·진행 상황 표시기)를 쓴다. |
| NAV-053 | MAY | 단계 표시기의 단계 수는 3개 이상 7개 이하로 한다. |
| NAV-054 | SHOULD | 단계 표시기에서 현재 단계를 다른 단계와 시각적으로 구분해 표시한다. |
| NAV-056 | SHOULD | 단계 절차에 선택 단계가 있으면 그 단계를 건너뛰는 수단을 제공하고, 건너뛰면 다음 필수 단계로, 남은 필수 단계가 없으면 최종 검토·제출 단계로 이동시킨다. |
| RESP-013 | MAY | 모바일 레이아웃(RESP-004 기준 1024px 미만)에서는 단계 표시기에서 현재 단계와 전체 단계 수(예: 4단계 중 1단계)를 제외한 정보를 생략할 수 있다. |

## KRDS 키트와의 관계
- 클래스 대응: `.step-indicator` ↔ `krds-step-wrap`, `.step-indicator__item` ↔ `li`, `.step-indicator__item--done` ↔ `done`, `.step-indicator__item--current` ↔ `active`, `.step-indicator__number` ↔ `step`, `.step-indicator__label` ↔ `step-tit`
- KRDS 키트는 단계 번호를 i 요소로, 현재 단계를 sr-only em '현재단계'로만 알리고 끝난 단계(done)는 보조기술에 알리지 않는다 — 이 규격은 aria-current="step" 과 '완료'·'현재 단계' 상태 텍스트를 쓴다(A11Y-007, A11Y-025, COLOR-001).
- KRDS 키트 ol 에는 이름이 없다 — 이 규격은 절차 제목(h2)을 aria-labelledby 로 연결한다(A11Y-007).
