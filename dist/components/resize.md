# 화면 크기 조정 (`.resize`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

브라우저 확대 기능을 모르는 사용자가 서비스 안에서 글자·화면 배율을 5단계 이하로 바꿀 때 쓴다.

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.resize` | `div` | 예 |  |
| 열기 버튼 | `.resize__toggle` | `button` | 예 | aria-expanded·aria-controls 를 가진 디스클로저 버튼(WAI-ARIA APG Disclosure). 레이블은 기능을 밝히는 '화면 크기'(COPY-003). 높이 40px(size-height-6)(LAYOUT-002). |
| 펼침 아이콘 | `.resize__icon` | `svg` |  | aria-hidden="true". 열림 상태에서 뒤집는다(A11Y-001). |
| 패널 | `.resize__panel` | `div` | 예 | 닫힌 상태에서는 hidden 속성. |
| 배율 묶음 | `.resize__options` | `fieldset` | 예 | legend 로 묶음 이름을 주고 배율마다 라디오 버튼을 둔다(A11Y-007). 옵션은 5개 이하(RESP-015). |
| 묶음 이름 | `.resize__legend` | `legend` | 예 |  |
| 배율 옵션 | `.resize__option` | `label` | 예 | 라디오 버튼을 감싼 label. 텍스트는 '작게 (90%)' 처럼 말과 배율을 함께 쓴다 — 아이콘이나 숫자만 쓰지 않는다(COPY-003). 높이 40px(LAYOUT-002). |
| 라디오 버튼 | `.resize__radio` | `input[type=radio]` | 예 | 같은 name. 현재 배율이 checked. |
| 기본값 버튼 | `.resize__reset` | `button` |  | 배율을 보통(100%)으로 되돌린다. |

## 표준 마크업

```html
<div class="resize">
  <button class="resize__toggle" type="button" aria-expanded="true" aria-controls="resize-panel">
    화면 크기
    <svg class="resize__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.4 8.6 6 10l6 6 6-6-1.4-1.4-4.6 4.6z"/></svg>
  </button>
  <div class="resize__panel" id="resize-panel">
    <fieldset class="resize__options">
      <legend class="resize__legend">화면 배율 선택</legend>
      <label class="resize__option"><input class="resize__radio" type="radio" name="screen-scale" value="90"> 작게 (90%)</label>
      <label class="resize__option"><input class="resize__radio" type="radio" name="screen-scale" value="100" checked> 보통 (100%)</label>
      <label class="resize__option"><input class="resize__radio" type="radio" name="screen-scale" value="110"> 조금 크게 (110%)</label>
      <label class="resize__option"><input class="resize__radio" type="radio" name="screen-scale" value="130"> 크게 (130%)</label>
      <label class="resize__option"><input class="resize__radio" type="radio" name="screen-scale" value="150"> 가장 크게 (150%)</label>
    </fieldset>
    <button class="resize__reset" type="button">보통 크기로 되돌리기</button>
  </div>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.resize {
  position: relative;
  display: inline-flex;
}
.resize__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2);
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-4);
  border: 0;
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-text-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
  cursor: pointer;
}
.resize__toggle:hover {
  background-color: var(--color-button-text-fill-hover);
}
.resize__icon {
  flex: none;
  inline-size: var(--space-scale-9);
  block-size: var(--space-scale-9);
  fill: currentColor;
}
.resize__toggle[aria-expanded="true"] .resize__icon {
  transform: rotate(180deg);
}
.resize__panel {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-end: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  min-inline-size: var(--size-height-11);
  margin-block-start: var(--space-gap-2);
  padding: var(--space-padding-3);
  border: var(--space-scale-1) solid var(--color-border-gray);
  border-radius: var(--radius-medium3);
  background-color: var(--color-surface-white);
  box-shadow: var(--shadow-2);
}
.resize__panel[hidden] {
  display: none;
}
.resize__options {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-1);
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.resize__legend {
  margin-block-end: var(--space-gap-2);
  padding: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-xsmall);
}
.resize__option {
  display: flex;
  align-items: center;
  gap: var(--space-gap-3);
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-4);
  border-radius: var(--radius-small3);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-small);
  white-space: nowrap;
  cursor: pointer;
}
.resize__option:hover {
  background-color: var(--color-action-primary-hover);
}
.resize__option:has(.resize__radio:checked) {
  background-color: var(--color-action-primary-selected);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}
.resize__radio {
  flex: none;
  inline-size: var(--space-scale-9);
  block-size: var(--space-scale-9);
  margin: 0;
  accent-color: var(--color-element-primary);
}
.resize__reset {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-4);
  border: var(--space-scale-1) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
  cursor: pointer;
}
.resize__toggle:focus-visible,
.resize__radio:focus-visible,
.resize__reset:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **닫힘(기본)**: 열기 버튼 aria-expanded="false", 패널에 hidden.
- **열림**: 열기 버튼 aria-expanded="true", 패널의 hidden 을 뺀다.
- **배율 선택**: 고른 라디오 버튼이 checked. 선택된 옵션은 배경·굵기로 함께 표시한다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 열기 버튼 → (열려 있으면) 선택된 라디오 버튼 → 기본값 버튼 순서로 옮긴다(A11Y-011, A11Y-016). |
| Enter / Space (열기 버튼) | 패널을 열고 닫는다(aria-expanded 전환). |
| ↑ / ↓ (라디오 버튼) | 이전·다음 배율을 고른다. 고른 배율을 바로 화면에 적용한다. |
| Esc | 패널 안 어디에 초점이 있든 패널을 닫고 초점을 열기 버튼으로 옮긴다(A11Y-040). |

## 동작
- 배율을 고르면 스크립트가 html 요소의 font-size 를 그 배율(90·100·110·130·150%)로 바꾼다. 글자·간격 토큰이 rem 이라 함께 커진다. 배율을 바꾸는 것은 제출·페이지 이동·새 창 열기가 아니다(FORM-002).
- 가장 큰 배율에서도 콘텐츠와 기능이 잘리거나 겹치지 않고, 세로 스크롤 콘텐츠에 가로 스크롤이 생기지 않게 레이아웃이 재배치돼야 한다 — 이 컴포넌트를 두는 서비스는 RESP-002·RESP-003 을 먼저 지킨다.
- 배율이 바뀌어도 콘텐츠 내용 자체는 바꾸지 않는다(RESP-002).
- 패널이 열린 상태에서 열기 버튼·패널 밖을 클릭하면 패널을 닫는다(A11Y-040). 마지막 요소에서 Tab 으로 나가면 패널을 닫는다.
- 이 컴포넌트는 브라우저 확대 기능을 대신하지 않는다. viewport 의 user-scalable=no·maximum-scale 2 미만으로 브라우저 확대를 막지 않는다(RESP-002).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-040 | SHOULD | 셀렉트·언어 변경·화면 크기 조정 같은 드롭다운의 옵션 목록이 펼쳐진 상태에서 레이블·컨테이너·목록이 아닌 영역을 클릭하면 목록을 접고, Esc를 누르면 목록을 접은 뒤 초점을 컨테이너로 옮긴다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| RESP-002 | MUST | 자막과 텍스트 이미지를 제외한 텍스트를 보조기술 없이 200%까지 확대해도 콘텐츠와 기능이 손실되지 않게 한다. |
| RESP-003 | MUST | 세로 스크롤 콘텐츠는 너비 320 CSS px, 가로 스크롤 콘텐츠는 높이 256 CSS px에 해당하는 화면에서 정보와 기능의 손실 없이, 두 방향 스크롤 없이 이용할 수 있게 한다. 사용이나 의미 전달에 2차원 배치가 필요한 부분만 예외로 한다. |
| RESP-015 | MAY | 화면 크기 조정 컴포넌트의 배율 옵션은 5개 이하로 둔다. |

## KRDS 키트와의 관계
- 클래스 대응: `.resize` ↔ `krds-drop-wrap krds-resize`, `.resize__toggle` ↔ `krds-btn drop-btn`, `.resize__panel` ↔ `drop-menu`, `.resize__options` ↔ `drop-list`, `.resize__option` ↔ `item-link (button)`, `.resize__reset` ↔ `drop-bottom krds-btn`
- KRDS 키트는 옵션을 button 목록과 active 클래스로 만들어 현재 배율을 보조기술에 알리지 않는다 — 이 규격은 fieldset 안 라디오 버튼으로 선택 상태를 노출한다(A11Y-025, A11Y-007).
- KRDS 키트의 열기 버튼에는 aria-expanded·aria-controls 가 없다 — 이 규격은 APG 디스클로저 패턴의 상태를 노출한다(A11Y-025).
- KRDS 키트 옵션은 '작게'·'크게' 처럼 말만 쓴다 — 이 규격은 '작게 (90%)' 처럼 배율을 함께 쓴다. KRDS 페이지가 든 기본 배율(90·100·110·130·150%)을 따른다(COPY-003, RESP-015).
- KRDS 키트의 초기화 버튼 레이블 '초기화' 대신 되돌릴 상태를 밝힌 '보통 크기로 되돌리기' 를 쓴다(COPY-003).
