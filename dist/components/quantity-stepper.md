# 수량 토글 (`.quantity-stepper`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

증명서 발급 부수·관람 인원처럼 대부분의 사용자가 고르는 값이 정해진 좁은 범위(11단계 이내)에서 수량을 늘리거나 줄일 때 쓴다.

## 대신 쓸 것
- 선택 가능한 값이 기준 값을 포함해 11개를 넘는 경우(나이 등) → text-field (inputmode="numeric") (FORM-073)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.quantity-stepper` | `div` | 예 | 레이블 → 조작부(감소 버튼·수량 필드·증가 버튼) 순서로 쌓는다. |
| 레이블 | `.quantity-stepper__label` | `label` | 예 | for 로 수량 필드와 연결한다(FORM-004). 무엇의 수량인지 밝힌다(COPY-003). |
| 조작부 | `.quantity-stepper__control` | `div` | 예 | 감소 버튼·수량 필드·증가 버튼을 이 순서로 가로 배치해, 두 버튼이 필드 양쪽에 오게 한다(FORM-075). |
| 감소·증가 버튼 | `.quantity-stepper__button` | `button` | 예 | 40×40px(24px 이상, LAYOUT-002). 접근 가능한 이름에 대상과 동작을 쓴다(예 '발급 부수 줄이기'). aria-controls 로 수량 필드를 가리킨다. |
| 수량 필드 | `.quantity-stepper__field` | `input[type=number]` | 예 | 현재 값을 항상 표시한다(FORM-074). min·max·step 으로 범위를 정한다. 네이티브 spinbutton 이라 ↑·↓ 키로도 바꿀 수 있다. |
| 단위 | `.quantity-stepper__unit` | `span` |  | 부·명 같은 단위. 수량 필드 바로 뒤에 둔다. |
| 변경 알림 | `.quantity-stepper__status` | `span` | 예 | role="status". 버튼으로 값을 바꾼 뒤 '발급 부수 2부' 를 넣어 초점 이동 없이 알린다(STATE-001). 공통 sr-only 클래스로 시각적으로 숨긴다. |

## 표준 마크업

```html
<div class="quantity-stepper">
  <label class="quantity-stepper__label" for="certificate-copies">발급 부수</label>
  <div class="quantity-stepper__control">
    <button type="button" class="quantity-stepper__button" aria-label="발급 부수 줄이기" aria-controls="certificate-copies" aria-disabled="true">
      <svg class="quantity-stepper__icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14"></path></svg>
    </button>
    <input class="quantity-stepper__field" type="number" id="certificate-copies" name="copies" inputmode="numeric" min="1" max="10" step="1" value="1">
    <button type="button" class="quantity-stepper__button" aria-label="발급 부수 늘리기" aria-controls="certificate-copies">
      <svg class="quantity-stepper__icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
    </button>
    <span class="quantity-stepper__unit">부</span>
  </div>
  <span class="quantity-stepper__status sr-only" role="status"></span>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.quantity-stepper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-gap-3);
}
.quantity-stepper__label {
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.quantity-stepper__control {
  display: flex;
  align-items: center;
  gap: var(--space-gap-3);
}
.quantity-stepper__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--size-height-6);
  block-size: var(--size-height-6);
  padding: 0;
  border: var(--border-width-variable-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium1);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-icon-gray);
  cursor: pointer;
}
.quantity-stepper__button:hover {
  background-color: var(--color-button-tertiary-fill-hover);
}
.quantity-stepper__button:active {
  background-color: var(--color-button-tertiary-fill-pressed);
}
.quantity-stepper__button:focus-visible,
.quantity-stepper__field:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.quantity-stepper__button[aria-disabled="true"] {
  border-color: var(--color-button-disabled-border);
  background-color: var(--color-button-disabled-fill);
  color: var(--color-icon-disabled);
  cursor: not-allowed;
}
.quantity-stepper__icon {
  inline-size: var(--size-height-3);
  block-size: var(--size-height-3);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.quantity-stepper__field {
  appearance: textfield;
  inline-size: var(--space-scale-18);
  min-block-size: var(--size-height-6);
  margin: 0;
  padding-inline: var(--space-padding-3);
  border: var(--border-width-variable-regular) solid var(--color-input-border);
  border-radius: var(--radius-medium1);
  background-color: var(--color-input-surface);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
  text-align: center;
}
.quantity-stepper__unit {
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
```

## 상태
- **최솟값·최댓값**: 값이 최솟값이면 감소 버튼에, 최댓값이면 증가 버튼에 aria-disabled="true" 를 붙이고 그 사이 값에서는 뺀다(FORM-072). disabled 를 쓰지 않는 이유는 누른 버튼이 비활성이 되는 순간 키보드 초점이 사라지기 때문이다(A11Y-016). aria-disabled 버튼의 클릭은 스크립트가 무시한다.
- **잘못된 값 입력**: 수량 필드에 범위 밖 값이나 빈 값을 입력하고 벗어나면 가장 가까운 허용 값으로 되돌리고 role=status 로 알린다(FORM-074). 오류 메시지를 따로 띄우지 않는다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 감소 버튼 → 수량 필드 → 증가 버튼 순으로 초점을 옮긴다. |
| Enter / Space (버튼) | 수량을 step 만큼 줄이거나 늘린다. 초점은 누른 버튼에 그대로 둔다. |
| ↑ / ↓ (수량 필드) | 네이티브 number 입력 동작으로 step 만큼 늘리거나 줄인다. |

## 동작
- 값은 기준 값을 포함해 11단계 이내로 제한한다 — (max − min) ÷ step + 1 ≤ 11(FORM-073). 더 많으면 텍스트 입력 필드를 쓴다.
- 수량 필드에 현재 값을 늘 표시하고 빈 상태로 두지 않는다. 기본값은 이용 기록에서 가장 많이 고른 값으로 둔다(FORM-074).
- 최솟값·최댓값에서 해당 방향 버튼을 aria-disabled="true" 로 바꾼다(FORM-072).
- 버튼으로 값을 바꾸면 수량 필드 value 를 고치고 role=status 영역에 '발급 부수 2부' 처럼 레이블·값·단위를 넣어 알린다(A11Y-025, STATE-001).
- 감소·증가 버튼은 수량 필드 양쪽에 둔다(FORM-075). 버튼은 24×24px 이상으로 만든다(LAYOUT-002).
- 값을 바꾸는 것만으로 제출·페이지 이동을 하지 않는다(FORM-002). 버튼 기능은 클릭(up 이벤트)에서 실행한다(A11Y-018).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-018 | MUST | 단일 포인터로 실행하는 기능은 down 이벤트에서 실행하지 않거나, up 이벤트에서 완료하면서 완료 전 중단·완료 후 되돌리기 수단을 제공하거나, up 이벤트가 down 이벤트의 결과를 되돌리게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-072 | SHOULD | 수량 토글의 값이 최솟값이면 감소 버튼을, 최댓값이면 증가 버튼을 aria-disabled="true"로 비활성 표시하고, 누른 버튼에서 키보드 초점이 사라지지 않게 disabled 속성은 쓰지 않는다. |
| FORM-073 | SHOULD | 수량 토글의 선택 가능한 값은 기준 값을 포함해 11개 이내로 제한하고, 선택 가능한 값이 그보다 많으면(예: 나이) 수량 토글 대신 텍스트 입력 필드를 쓴다. |
| FORM-074 | SHOULD | 수량 토글의 수량 필드에 현재 값을 항상 표시하고, 기본값은 사용자가 가장 자주 고르는 값으로 둔다. |
| FORM-075 | MAY | 수량 토글의 감소 버튼과 증가 버튼은 수량 필드 양쪽에 하나씩 두고 한쪽에 모아 배치하지 않는다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |

## KRDS 키트와의 관계
