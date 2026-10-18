# 범위 슬라이드 (`.range-slider`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

소리 크기·밝기처럼 정확한 수치보다 범위 안의 상대적인 값이 중요한 설정을 고를 때 쓰는 단일 값 슬라이더다.

## 대신 쓸 것
- 정확한 수치·단위를 입력해야 하는 값 → text-field (inputmode="numeric") (FORM-071)
- ON/OFF, 낮음/보통/높음처럼 이름 붙은 선택지 중 하나를 고르는 값 → radio-group 또는 toggle-switch (FORM-071)
- 기준 값을 포함해 11단계 이내의 수량을 고르는 경우 → quantity-stepper

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.range-slider` | `div` | 예 | 머리줄(레이블·선택 값) → 슬라이더 → 범위 값 순서로 쌓는다. |
| 머리줄 | `.range-slider__header` | `div` | 예 | 레이블을 왼쪽, 선택 값을 오른쪽에 두어 선택 값이 핸들보다 위에 오게 한다(FORM-067). |
| 레이블 | `.range-slider__label` | `label` | 예 | for 로 슬라이더와 연결한다(FORM-004). 무엇을 고르는지 밝힌다(COPY-003). |
| 선택 값 | `.range-slider__value` | `span` | 예 | 현재 값을 텍스트로 늘 보인다(FORM-068). 핸들 아래에 두지 않는다(FORM-067). 보조기술에는 슬라이더의 aria-valuetext 가 같은 값을 전하므로 aria-hidden 으로 중복 낭독을 막는다. |
| 슬라이더 | `.range-slider__input` | `input[type=range]` | 예 | 브라우저 기본 range 입력. 핸들 끌기와 트랙 클릭(단일 포인터) 모두로 값을 바꾼다(A11Y-021). 높이 24px 이상(LAYOUT-002). |
| 범위 값 | `.range-slider__range` | `div` | 예 | 최솟값을 트랙 왼쪽 끝 아래, 최댓값을 오른쪽 끝 아래에 텍스트로 둔다. 값은 input 의 min·max 와 같다(FORM-069). |

## 표준 마크업

```html
<div class="range-slider">
  <div class="range-slider__header">
    <label class="range-slider__label" for="alert-volume">알림 소리 크기</label>
    <span class="range-slider__value" aria-hidden="true">50%</span>
  </div>
  <input class="range-slider__input" type="range" id="alert-volume" name="alert-volume" min="0" max="100" step="10" value="50" aria-valuetext="50%">
  <div class="range-slider__range">
    <span class="range-slider__min">0%</span>
    <span class="range-slider__max">100%</span>
  </div>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.range-slider {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
}
.range-slider__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-gap-4);
}
.range-slider__label {
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.range-slider__value {
  color: var(--color-text-primary);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.range-slider__input {
  inline-size: 100%;
  min-block-size: var(--size-height-4);
  margin: 0;
  accent-color: var(--color-element-primary);
  cursor: pointer;
}
.range-slider__input:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.range-slider__input:disabled {
  accent-color: var(--color-element-disabled-dark);
  cursor: not-allowed;
}
.range-slider__range {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
```

## 상태
- **조절 중**: input 이벤트마다 선택 값 텍스트와 aria-valuetext 를 현재 값(단위 포함)으로 바꾼다. 선택 값 요소를 숨기거나 투명하게 하지 않는다(FORM-068).
- **비활성**: 슬라이더에 disabled. 바꿀 수 없는 이유를 레이블 근처에 텍스트로 쓴다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 슬라이더로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). |
| ← / ↓ , → / ↑ | step 만큼 줄이거나 늘린다(브라우저 기본 range 동작). |
| Home / End | 최솟값·최댓값으로 옮긴다. |
| PageUp / PageDown | 브라우저가 정한 큰 단위로 늘리거나 줄인다. |

## 동작
- 브라우저 기본 input[type=range] 를 쓰고 키보드·포인터 동작을 스크립트로 다시 만들지 않는다(A11Y-011, A11Y-025). 커스텀 슬라이더(role=slider)는 이 규격 밖이다.
- 핸들 끌기 없이 트랙 클릭·탭만으로도 값을 바꿀 수 있다(A11Y-021) — 기본 range 입력이 제공한다.
- 값을 조절하는 동안 선택 값 텍스트와 aria-valuetext 를 계속 갱신한다(FORM-068).
- 선택 값은 핸들 위(머리줄 오른쪽)에 두고 핸들 아래에 두지 않는다(FORM-067).
- 최솟값·최댓값을 텍스트로 표시하고 input 의 min·max 와 같게 한다(FORM-069).
- step 은 (max − min) 의 10~20% 로 정한다(FORM-070). 예시는 0~100 에서 step 10(10%).
- 값을 바꾸는 것만으로 제출·페이지 이동을 하지 않는다(FORM-002).
- 정확한 수치나 이름 붙은 선택지를 받는 데 쓰지 않는다(FORM-071).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-021 | MUST | 드래그로 하는 모든 기능을 드래그 없는 단일 포인터 조작(클릭·탭)으로도 할 수 있게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-067 | SHOULD | 범위 슬라이더의 선택 값은 핸들 위나 슬라이더 끝에 표시하고 핸들 아래에는 두지 않는다. |
| FORM-068 | SHOULD | 사용자가 범위 슬라이더 값을 조절하는 동안 현재 선택 값을 텍스트로 계속 화면에 표시한다. |
| FORM-069 | SHOULD | 범위 슬라이더의 최솟값과 최댓값을 텍스트로 화면에 표시한다. |
| FORM-070 | MAY | 범위 슬라이더의 단계(step)는 전체 범위(max − min)의 10% 이상 20% 이하로 설정한다. |
| FORM-071 | MAY | 정확한 수치·단위를 입력해야 하는 값이나 'ON/OFF'·'낮음/보통/높음'처럼 이름 붙은 선택지 중 하나를 고르는 값은 범위 슬라이더로 받지 않는다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |

## KRDS 키트와의 관계
