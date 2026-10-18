# 라디오 버튼 (`.radio-group`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

서로 배타적인 옵션 2~6개 중 하나만 고르게 할 때, 모든 옵션을 펼쳐 보여주는 단일 선택 그룹이다.

## 대신 쓸 것
- 여러 옵션을 동시에 고를 수 있는 경우 → checkbox (FORM-028)
- 단일 선택 옵션이 7개 이상이고 사용자가 그 목록(시·도, 연도 등)에 익숙한 경우 → select (FORM-030)
- 결과가 즉시 반영되는 켜기·끄기 설정 → toggle-switch (FORM-041)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(그룹) | `.radio-group` | `fieldset` | 예 | 옵션 전체를 fieldset 으로 묶는다(A11Y-007, FORM-004). |
| 그룹 레이블 | `.radio-group__legend` | `legend` | 예 | 질문(무엇을 고르는지)을 쓴다(COPY-003). 필수·선택 표시는 서비스 전체에서 한 방식만 쓴다. |
| 옵션 목록 | `.radio-group__options` | `div` | 예 | 기본은 세로 나열(FORM-010). 가로 배치(radio-group--inline)는 각 레이블이 모든 화면 너비에서 한 줄일 때만 쓴다(COPY-029). |
| 옵션 | `.radio-group__option` | `div` | 예 | 원형 양식을 왼쪽, 레이블을 오른쪽에 둔다(LAYOUT-047). |
| 네이티브 입력 | `.radio-group__input` | `input[type=radio]` | 예 | 같은 그룹은 같은 name 을 쓴다(FORM-027). opacity 0 으로 숨기고 원형 표시와 같은 칸·같은 크기(24px)로 겹친다. display none·visibility hidden·top/left 이동으로 숨기지 않는다(CF-051, A11Y-048). |
| 원형 표시 | `.radio-group__indicator` | `span` | 예 | aria-hidden 장식. 선택 상태와 키보드 초점 표시를 그린다(A11Y-016, COLOR-003). |
| 레이블 | `.radio-group__label` | `label` | 예 | for 로 입력과 연결해 레이블을 눌러도 선택된다(FORM-034). |
| 부가 설명 | `.radio-group__description` | `p` |  | 옵션별 보충 설명. 입력의 aria-describedby 로 연결한다(A11Y-007). |
| 시스템 메시지(오류) | `.radio-group__message` | `p` |  | 제출 시 선택하지 않은 필수 그룹에만 넣는다. fieldset 의 aria-describedby 로 연결한다(A11Y-025). |

## 표준 마크업

```html
<fieldset class="radio-group radio-group--error" aria-describedby="receive-method-error">
  <legend class="radio-group__legend">결과 받을 방법 (필수)</legend>
  <div class="radio-group__options">
    <div class="radio-group__option">
      <input class="radio-group__input" type="radio" name="receive-method" id="receive-method-visit" value="visit" required aria-describedby="receive-method-visit-desc">
      <span class="radio-group__indicator" aria-hidden="true"></span>
      <label class="radio-group__label" for="receive-method-visit">방문 수령</label>
      <p class="radio-group__description" id="receive-method-visit-desc">신청한 주민센터에서 신분증을 보여 주고 받아 주세요.</p>
    </div>
    <div class="radio-group__option">
      <input class="radio-group__input" type="radio" name="receive-method" id="receive-method-post" value="post" required>
      <span class="radio-group__indicator" aria-hidden="true"></span>
      <label class="radio-group__label" for="receive-method-post">우편</label>
    </div>
    <div class="radio-group__option">
      <input class="radio-group__input" type="radio" name="receive-method" id="receive-method-online" value="online" required>
      <span class="radio-group__indicator" aria-hidden="true"></span>
      <label class="radio-group__label" for="receive-method-online">전자문서</label>
    </div>
  </div>
  <p class="radio-group__message" id="receive-method-error">결과 받을 방법을 선택해 주세요.</p>
</fieldset>
```

## 표준 CSS (토큰만 사용)

```css
.radio-group {
  margin: 0;
  padding: 0;
  border-style: none;
}
.radio-group__legend {
  margin-block-end: var(--space-gap-3);
  padding: 0;
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.radio-group__options {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-5);
}
.radio-group--inline .radio-group__options {
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: var(--space-gap-7);
}
.radio-group__option {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: var(--space-gap-3);
  row-gap: var(--space-gap-1);
}
.radio-group__input,
.radio-group__indicator {
  grid-area: 1 / 1;
  inline-size: var(--size-height-4);
  block-size: var(--size-height-4);
  margin: 0;
}
.radio-group__input {
  position: relative;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
}
.radio-group__indicator {
  display: grid;
  place-items: center;
  box-sizing: border-box;
  border: var(--border-width-variable-medium) solid var(--color-element-gray-dark);
  border-radius: var(--radius-max);
  background-color: var(--color-element-inverse);
}
.radio-group__indicator::after {
  content: "";
  inline-size: var(--space-scale-7);
  block-size: var(--space-scale-7);
  border-radius: var(--radius-max);
  background-color: transparent;
}
.radio-group__input:checked + .radio-group__indicator {
  border-color: var(--color-element-primary);
}
.radio-group__input:checked + .radio-group__indicator::after {
  background-color: var(--color-element-primary);
}
.radio-group__input:focus-visible + .radio-group__indicator {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.radio-group__input:disabled + .radio-group__indicator {
  border-color: var(--color-element-disabled-dark);
  background-color: var(--color-element-disabled-light);
}
.radio-group__input:disabled:checked + .radio-group__indicator::after {
  background-color: var(--color-element-disabled-dark);
}
.radio-group__input:disabled ~ .radio-group__label {
  color: var(--color-text-disabled);
}
.radio-group__label {
  grid-area: 1 / 2;
  color: var(--color-text-bolder);
  font-size: var(--font-size-label-medium);
  cursor: pointer;
}
.radio-group__description {
  grid-area: 2 / 2;
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-small);
}
.radio-group__message {
  margin-block-start: var(--space-gap-3);
  color: var(--color-text-danger);
  font-size: var(--font-size-body-small);
}
.radio-group--chip .radio-group__options {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--space-gap-3);
}
.radio-group--chip .radio-group__input,
.radio-group--chip .radio-group__label {
  grid-area: 1 / 1;
  align-self: stretch;
  justify-self: stretch;
  inline-size: auto;
  block-size: auto;
}
.radio-group--chip .radio-group__indicator {
  display: none;
}
.radio-group--chip .radio-group__label {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-4);
  border: var(--border-width-variable-regular) solid var(--color-border-gray);
  border-radius: var(--radius-medium1);
  background-color: var(--color-action-white);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
}
.radio-group--chip .radio-group__input:checked ~ .radio-group__label {
  border-width: var(--border-width-variable-medium);
  border-color: var(--color-border-primary);
  background-color: var(--color-action-primary-selected);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}
.radio-group--chip .radio-group__input:focus-visible ~ .radio-group__label {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **선택됨**: 사용자가 고른 옵션의 입력이 checked 가 된다(마크업 속성은 그대로). 원형 표시가 주조색 테두리와 가운데 점으로 바뀐다 — 색만이 아니라 점 모양으로도 구분한다(COLOR-001).
- **오류**: 루트에 radio-group--error, 시스템 메시지 p 를 넣고 그 id 를 fieldset 의 aria-describedby 에 더한다. 오류 요약의 링크는 그룹의 첫 번째 옵션 입력 id 로 연결한다(FORM-078). 메시지는 항목 이름·고치는 방법을 담는다(COPY-005).
- **비활성**: 옵션 입력에 disabled. 비활성 색은 불투명 토큰(element-disabled-*)을 쓴다(COLOR-006).
- **칩형**: 루트에 radio-group--chip. 원형 표시를 숨기고 레이블을 칩 모양으로 그린다. 입력은 레이블과 같은 칸에 겹친다. 선택 상태는 테두리 두께·굵은 글자로도 구분한다(COLOR-001).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 그룹에 들어가면 선택된 옵션(없으면 첫 옵션)으로 초점을 옮기고, 다음 Tab 은 그룹 밖으로 나간다. |
| ↓ / → | 다음 옵션으로 초점을 옮기고 선택한다(A11Y-034). 네이티브 라디오가 처리한다. |
| ↑ / ← | 이전 옵션으로 초점을 옮기고 선택한다(A11Y-034). |
| Space | 초점이 있는 옵션을 선택한다(A11Y-035). |

## 동작
- 네이티브 input[type=radio] 를 쓰고 같은 그룹은 같은 name 으로 묶어, 한 번에 하나만 선택되게 한다(FORM-027). 스크립트로 키보드 동작을 다시 만들지 않는다.
- 커스텀 원형 표시를 쓸 때 네이티브 입력은 opacity 0 으로 숨기고 표시와 같은 위치·크기에 겹치며, 표시에 초점 표시를 그린다(CF-051, A11Y-016, A11Y-048).
- 레이블 텍스트를 눌러도 선택된다(FORM-034).
- 선택을 바꾸는 것만으로 제출·페이지 이동·새 창 열기를 하지 않는다(FORM-002).
- 성별처럼 사용자가 정확히 답해야 하는 그룹은 어떤 옵션도 미리 선택하지 않는다(FORM-019).
- 옵션은 가나다순으로 정렬한다. 다른 정렬은 근거를 설계 문서에 남겼을 때만 쓴다(FORM-032).
- 필수가 아닌 그룹에는 '해당 없음'·'선택 안 함' 같은 옵션을 하나 둔다(FORM-033).
- 옵션은 세로로 나열한다(FORM-010). 가로로 나열할 때는 옵션 사이 간격을 24px(gap-7) 이상으로 두고(SPACE-002), 레이블이 한 줄을 넘으면 세로로 바꾼다(COPY-029).
- 원형 표시의 테두리와 선택 점은 인접 색과 3:1 이상 대비를 가진다(COLOR-003).
- 선명한 화면 모드에서는 테두리 두께 토큰이 굵어진다 — 테두리 두께를 border-width 토큰으로만 지정한다(COLOR-011).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-034 | SHOULD | 라디오 그룹에서 ↑·← 를 누르면 이전 옵션으로, ↓·→ 를 누르면 다음 옵션으로 초점을 옮기고 그 값을 선택한다. |
| A11Y-035 | SHOULD | 라디오 버튼·체크박스·토글 스위치에 초점이 있을 때 Space 키를 누르면 값을 선택(체크박스·토글은 상태 전환)하게 한다. |
| A11Y-048 | SHOULD | 대화형 요소를 시각적으로 숨길 때 text-indent나 top·left 값으로 본래 위치 밖으로 옮기지 않고 top·left를 auto로 유지한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-006 | SHOULD | 비활성(disabled) 상태를 표현할 때 알파 값이 1 미만인 색(투명도 색)을 쓰지 않고 팔레트의 불투명 색을 쓴다. |
| COLOR-011 | SHOULD | 선명한 화면 모드에서는 본문의 모든 인라인 링크와 푸터의 모든 링크에 밑줄을 표시하고, 버튼·입력·선택 컴포넌트의 외곽선과 링크 밑줄을 기본 모드보다 굵게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| COPY-005 | SHOULD | 오류 메시지는 오류가 난 항목 이름, 무엇이 잘못됐는지, 고치는 방법(또는 사용자가 할 수 있는 다음 행동)을 담아 높임 종결어미로 쓰고, 사용자를 탓하는 표현과 '오류가 발생했습니다'·'유효하지 않은 값입니다' 같은 일반 문구만으로 된 메시지를 쓰지 않는다. |
| COPY-029 | MAY | 라디오 버튼·체크박스를 가로로 배치할 때는 각 레이블이 브레이크포인트 토큰 너비(360·768·1024·1280px, RESP-004)마다 한 줄로 표시되는 길이로 쓰고, 한 줄을 넘는 너비에서는 세로 배치로 바꾼다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-010 | MAY | 입력폼의 입력 컴포넌트는 한 열로 세로 배치하고, 한 줄에 가로로 묶는 것은 하나의 정보를 이루는 필드(성·이름, 전화번호, 신용카드 번호, 우편번호·주소, 시작·종료 일자)로 한정한다. 라디오 버튼·체크박스 옵션은 세로로 나열하고, 가로로 나열할 때는 레이블 길이(COPY-029)와 옵션 간격(SPACE-002) 조건을 지킨다. |
| FORM-019 | SHOULD | 개인 식별 정보 입력 필드에 기본값을 미리 채우지 않고, 성별처럼 사용자가 정확히 답해야 하는 라디오 그룹에서는 어떤 옵션도 미리 선택해 두지 않는다. |
| FORM-027 | SHOULD | 한 라디오 그룹에서는 옵션 하나만 선택된 상태가 되게 하고, 새 옵션을 선택하면 이전에 선택한 옵션을 자동으로 해제한다. |
| FORM-028 | SHOULD | 여러 옵션을 동시에 고를 수 있는 선택에는 라디오 버튼을 쓰지 않고, 한 옵션만 고를 수 있는 선택에는 체크박스를 쓰지 않는다. |
| FORM-030 | MAY | 단일 선택 옵션이 7개 이상이고 사용자가 그 옵션 목록(예: 시·도, 연도)에 익숙하면 라디오 버튼 대신 셀렉트나 콤보 상자를 쓴다. |
| FORM-032 | SHOULD | 라디오 버튼·체크박스 옵션은 가나다순으로 정렬하고, 선택 빈도순 등 다른 정렬은 근거(이용 데이터 등)를 설계 문서에 기록했을 때만 쓴다. |
| FORM-033 | MAY | 필수가 아니고 처음에 선택된 옵션이 없는 라디오 그룹에는 '해당 없음'·'잘 모름'·'선택 안 함' 같은 응답하지 않는 옵션을 하나 둔다. |
| FORM-034 | SHOULD | 라디오 버튼·체크박스·토글 스위치는 컨트롤뿐 아니라 보이는 레이블 텍스트를 클릭·탭해도 값이 바뀌게 한다. |
| FORM-041 | SHOULD | 토글 스위치는 부울(켜짐·꺼짐) 두 상태를 전환하고 그 결과가 별도 제출 없이 즉시 반영되는 설정에만 쓰고, 상태가 부울이 아니거나 상호 배타 옵션이 3개 이상이면 라디오 버튼을, 제출·적용 동작을 거쳐야 반영되는 선택이면 체크박스나 라디오 버튼을 쓴다. |
| FORM-078 | SHOULD | 오류 요약의 각 항목을 해당 입력 필드로 이동하는 링크(href="#필드id")로 만들고, 여러 필드로 된 질문은 오류가 있는 첫 필드로(어느 필드인지 모르면 첫 필드로), 라디오·체크박스 그룹은 첫 번째 옵션으로 연결한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-047 | SHOULD | 라디오 버튼의 레이블은 원형 양식(컨트롤)의 오른쪽에 둔다. |
| SPACE-002 | SHOULD | 체크박스·라디오 버튼을 가로로 나열할 때는 한 옵션의 레이블 끝과 다음 옵션 컨트롤 사이 간격을 24px(gap-7) 이상으로 두어, 컨트롤과 자기 레이블 사이 간격보다 넓게 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.radio-group` ↔ `fieldset`, `.radio-group__options` ↔ `krds-check-area chk-column`, `.radio-group__option` ↔ `krds-form-check`, `.radio-group__input` ↔ `krds-form-check input[type=radio]`, `.radio-group__label` ↔ `krds-form-check label`, `.radio-group__description` ↔ `krds-form-check-cnt krds-form-check-p`, `.radio-group--chip` ↔ `krds-form-chip`
- KRDS 키트 medium 크기 원형 양식은 20px 이다 — 이 규격은 입력과 표시를 24px 로 만들어 포인터 대상 크기를 직접 충족한다(LAYOUT-002).
- KRDS 키트는 그룹 레이블(legend) 없이 옵션을 나열한다 — 이 규격은 fieldset·legend 로 그룹 레이블을 준다(A11Y-007, FORM-004).
- KRDS 키트는 옵션 부가 설명(krds-form-check-p)을 입력과 연결하지 않는다 — 이 규격은 aria-describedby 로 연결한다(A11Y-007).
- KRDS 키트 예시의 '선택됨' 옵션은 미리 checked 상태다 — 이 규격은 정확한 응답이 필요한 그룹에서 미리 선택하지 않는다(FORM-019).
- KRDS 키트 칩형은 선택 상태를 색으로만 바꾼다 — 이 규격은 테두리 두께·글자 굵기도 바꾼다(COLOR-001).
