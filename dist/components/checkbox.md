# 체크박스 (`.checkbox`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

옵션을 0개 이상 함께 고르거나, 제출·적용 같은 확정 동작이 따로 있는 흐름에서 한 항목을 켜고 끌 때 쓴다.

## 대신 쓸 것
- 한 옵션만 고를 수 있는 선택 → radio-group (FORM-028)
- 선택하자마자 적용되는 켜기·끄기 설정 → toggle-switch (FORM-035)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(옵션 하나) | `.checkbox` | `div` | 예 | 네모 양식을 왼쪽, 레이블을 오른쪽에 둔다. |
| 그룹 | `.checkbox-group` | `fieldset` |  | 옵션이 2개 이상이면 fieldset 으로 묶는다(A11Y-007, FORM-004). 단일 동의 체크박스는 그룹 없이 쓸 수 있다. |
| 그룹 레이블 | `.checkbox-group__legend` | `legend` |  | 무엇을 고르는지 밝힌다(COPY-003). |
| 네이티브 입력 | `.checkbox__input` | `input[type=checkbox]` | 예 | opacity 0 으로 숨기고 네모 표시와 같은 칸·같은 크기(24px)로 겹친다. display none·visibility hidden·top/left 이동으로 숨기지 않는다(CF-051, A11Y-048). |
| 네모 표시 | `.checkbox__indicator` | `span` | 예 | aria-hidden 장식. 체크·중간 상태와 키보드 초점 표시를 그린다(A11Y-016, COLOR-003). |
| 체크 아이콘 | `.checkbox__icon` | `svg` | 예 | 체크 표시(path)와 중간 상태 표시(line)를 함께 두고 상태에 맞는 것만 보인다. |
| 레이블 | `.checkbox__label` | `label` | 예 | for 로 입력과 연결해 레이블을 눌러도 바뀐다(FORM-034). |
| 부가 설명 | `.checkbox__description` | `p` |  | 옵션별 보충 설명. 입력의 aria-describedby 로 연결한다(A11Y-007). |

## 표준 마크업

```html
<fieldset class="checkbox-group">
  <legend class="checkbox-group__legend">관심 분야 (선택)</legend>
  <p class="checkbox-group__hint">받고 싶은 소식의 분야를 모두 선택해 주세요.</p>
  <div class="checkbox">
    <input class="checkbox__input" type="checkbox" name="interest" id="interest-education" value="education">
    <span class="checkbox__indicator" aria-hidden="true"><svg class="checkbox__icon" viewBox="0 0 24 24"><path class="checkbox__check" d="M6 12.5l4 4 8-9"></path><path class="checkbox__dash" d="M6 12h12"></path></svg></span>
    <label class="checkbox__label" for="interest-education">교육</label>
  </div>
  <div class="checkbox">
    <input class="checkbox__input" type="checkbox" name="interest" id="interest-culture" value="culture" checked aria-describedby="interest-culture-desc">
    <span class="checkbox__indicator" aria-hidden="true"><svg class="checkbox__icon" viewBox="0 0 24 24"><path class="checkbox__check" d="M6 12.5l4 4 8-9"></path><path class="checkbox__dash" d="M6 12h12"></path></svg></span>
    <label class="checkbox__label" for="interest-culture">문화·예술</label>
    <p class="checkbox__description" id="interest-culture-desc">공연·전시 할인 소식을 함께 보내 드립니다.</p>
  </div>
  <div class="checkbox">
    <input class="checkbox__input" type="checkbox" name="interest" id="interest-welfare" value="welfare">
    <span class="checkbox__indicator" aria-hidden="true"><svg class="checkbox__icon" viewBox="0 0 24 24"><path class="checkbox__check" d="M6 12.5l4 4 8-9"></path><path class="checkbox__dash" d="M6 12h12"></path></svg></span>
    <label class="checkbox__label" for="interest-welfare">복지</label>
  </div>
</fieldset>
```

## 표준 CSS (토큰만 사용)

```css
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-5);
  margin: 0;
  padding: 0;
  border-style: none;
}
.checkbox-group__legend {
  margin-block-end: var(--space-gap-3);
  padding: 0;
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.checkbox-group__hint {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.checkbox-group--inline {
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: var(--space-gap-7);
}
.checkbox {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: var(--space-gap-3);
  row-gap: var(--space-gap-1);
}
.checkbox__input,
.checkbox__indicator {
  grid-area: 1 / 1;
  inline-size: var(--size-height-4);
  block-size: var(--size-height-4);
  margin: 0;
}
.checkbox__input {
  position: relative;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
}
.checkbox__indicator {
  display: grid;
  place-items: center;
  box-sizing: border-box;
  border: var(--border-width-variable-medium) solid var(--color-element-gray-dark);
  border-radius: var(--radius-small2);
  background-color: var(--color-element-inverse);
}
.checkbox__icon {
  inline-size: var(--size-height-2);
  block-size: var(--size-height-2);
  fill: none;
  stroke: var(--color-element-inverse-static);
  stroke-width: 3;
}
.checkbox__check,
.checkbox__dash {
  visibility: hidden;
}
.checkbox__input:checked + .checkbox__indicator,
.checkbox__input:indeterminate + .checkbox__indicator {
  border-color: var(--color-element-primary);
  background-color: var(--color-element-primary);
}
.checkbox__input:checked + .checkbox__indicator .checkbox__check,
.checkbox__input:indeterminate + .checkbox__indicator .checkbox__dash {
  visibility: visible;
}
.checkbox__input:indeterminate + .checkbox__indicator .checkbox__check {
  visibility: hidden;
}
.checkbox__input:focus-visible + .checkbox__indicator {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.checkbox__input:disabled + .checkbox__indicator {
  border-color: var(--color-element-disabled-dark);
  background-color: var(--color-element-disabled-light);
}
.checkbox__input:disabled + .checkbox__indicator .checkbox__icon {
  stroke: var(--color-element-disabled-dark);
}
.checkbox__input:disabled ~ .checkbox__label {
  color: var(--color-text-disabled);
}
.checkbox__label {
  grid-area: 1 / 2;
  color: var(--color-text-bolder);
  font-size: var(--font-size-label-medium);
  cursor: pointer;
}
.checkbox__description {
  grid-area: 2 / 2;
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-small);
}
.checkbox--chip .checkbox__input,
.checkbox--chip .checkbox__label {
  grid-area: 1 / 1;
  align-self: stretch;
  justify-self: stretch;
  inline-size: auto;
  block-size: auto;
}
.checkbox--chip .checkbox__indicator {
  display: none;
}
.checkbox--chip .checkbox__label {
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
.checkbox--chip .checkbox__input:checked ~ .checkbox__label {
  border-width: var(--border-width-variable-medium);
  border-color: var(--color-border-primary);
  background-color: var(--color-action-primary-selected);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}
.checkbox--chip .checkbox__input:focus-visible ~ .checkbox__label {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **선택됨**: 입력이 checked 가 된다. 네모 표시가 주조색 채움과 흰 체크 표시로 바뀐다 — 색만이 아니라 체크 모양으로도 구분한다(COLOR-001).
- **중간 상태**: 상위 체크박스 입력의 indeterminate 속성(DOM 속성, 스크립트로 설정)을 true 로 한다. 하위 항목 일부만 선택됐을 때만 쓰고 가로줄 표시를 보인다(FORM-042).
- **비활성**: 입력에 disabled. 비활성 색은 불투명 토큰(element-disabled-*)을 쓴다(COLOR-006).
- **칩형**: 옵션 루트에 checkbox--chip. 네모 표시를 숨기고 레이블을 칩 모양으로 그린다. 입력은 레이블과 같은 칸에 겹친다. 선택 상태는 테두리 두께·굵은 글자로도 구분한다(COLOR-001).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 다음·이전 체크박스로 초점을 옮긴다. 초점 표시는 네모 표시 위에 보인다(A11Y-016). |
| Space | 초점이 있는 체크박스를 선택·해제한다(A11Y-035). 네이티브 체크박스가 처리한다. |

## 동작
- 네이티브 input[type=checkbox] 를 쓰고 같은 질문의 옵션은 같은 name 과 서로 다른 value 를 준다. 키보드 동작을 스크립트로 다시 만들지 않는다(A11Y-011, A11Y-025).
- 커스텀 네모 표시를 쓸 때 네이티브 입력은 opacity 0 으로 숨기고 표시와 같은 위치·크기에 겹치며, 표시에 초점 표시를 그린다(CF-051, A11Y-016, A11Y-048).
- 레이블 텍스트를 눌러도 바뀐다(FORM-034).
- 체크박스 값을 바꾸는 것만으로 제출·페이지 이동·새 창 열기를 하지 않는다(FORM-002).
- 일괄 동의 체크박스는 선택하면 모든 항목을 동의로, 해제하면 모두 미동의로 바꾸고, 하나라도 미동의면 해제 상태로 두며, 조작 뒤에도 초점을 일괄 동의 체크박스에 둔다(FORM-025).
- 상위 항목이 하위 항목을 함께 켜고 끄는 계층 선택은 중간 상태를 쓰는 체크박스 목록으로 만든다(FORM-042).
- 옵션은 가나다순으로 정렬하고 세로로 나열한다(FORM-032, FORM-010). 가로로 나열할 때는 옵션 사이 간격을 24px(gap-7) 이상 둔다(SPACE-002).
- 네모 표시의 테두리와 체크 표시는 인접 색과 3:1 이상 대비를 가진다(COLOR-003).
- 선명한 화면 모드에서는 테두리 두께 토큰이 굵어진다 — 테두리 두께를 border-width 토큰으로만 지정한다(COLOR-011).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-035 | SHOULD | 라디오 버튼·체크박스·토글 스위치에 초점이 있을 때 Space 키를 누르면 값을 선택(체크박스·토글은 상태 전환)하게 한다. |
| A11Y-048 | SHOULD | 대화형 요소를 시각적으로 숨길 때 text-indent나 top·left 값으로 본래 위치 밖으로 옮기지 않고 top·left를 auto로 유지한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-006 | SHOULD | 비활성(disabled) 상태를 표현할 때 알파 값이 1 미만인 색(투명도 색)을 쓰지 않고 팔레트의 불투명 색을 쓴다. |
| COLOR-011 | SHOULD | 선명한 화면 모드에서는 본문의 모든 인라인 링크와 푸터의 모든 링크에 밑줄을 표시하고, 버튼·입력·선택 컴포넌트의 외곽선과 링크 밑줄을 기본 모드보다 굵게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-010 | MAY | 입력폼의 입력 컴포넌트는 한 열로 세로 배치하고, 한 줄에 가로로 묶는 것은 하나의 정보를 이루는 필드(성·이름, 전화번호, 신용카드 번호, 우편번호·주소, 시작·종료 일자)로 한정한다. 라디오 버튼·체크박스 옵션은 세로로 나열하고, 가로로 나열할 때는 레이블 길이(COPY-029)와 옵션 간격(SPACE-002) 조건을 지킨다. |
| FORM-025 | SHOULD | 일괄 동의 체크박스를 선택하면 모든 항목을 '동의함'으로, 해제하면 모든 항목을 '동의하지 않음'으로 바꾸고, 개별 항목 중 하나라도 '동의하지 않음'이면 일괄 동의 체크박스를 해제 상태로 두며, Click·Space로 조작한 뒤에도 키보드 초점을 일괄 동의 체크박스에 유지한다. |
| FORM-028 | SHOULD | 여러 옵션을 동시에 고를 수 있는 선택에는 라디오 버튼을 쓰지 않고, 한 옵션만 고를 수 있는 선택에는 체크박스를 쓰지 않는다. |
| FORM-032 | SHOULD | 라디오 버튼·체크박스 옵션은 가나다순으로 정렬하고, 선택 빈도순 등 다른 정렬은 근거(이용 데이터 등)를 설계 문서에 기록했을 때만 쓴다. |
| FORM-034 | SHOULD | 라디오 버튼·체크박스·토글 스위치는 컨트롤뿐 아니라 보이는 레이블 텍스트를 클릭·탭해도 값이 바뀌게 한다. |
| FORM-035 | MAY | 선택하자마자 적용되는 켜기·끄기 설정에는 체크박스 대신 토글 스위치를 검토하고, 체크박스는 적용·제출 같은 별도 확정 동작이 있는 흐름 안의 선택에 쓴다. |
| FORM-042 | SHOULD | 상위 항목이 하위 항목들을 함께 켜고 끄는 계층 구조의 선택 옵션에는 토글 스위치 대신 중간 상태를 표시하는 체크박스 목록을 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| SPACE-002 | SHOULD | 체크박스·라디오 버튼을 가로로 나열할 때는 한 옵션의 레이블 끝과 다음 옵션 컨트롤 사이 간격을 24px(gap-7) 이상으로 두어, 컨트롤과 자기 레이블 사이 간격보다 넓게 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.checkbox-group` ↔ `fieldset`, `.checkbox` ↔ `krds-form-check`, `.checkbox__input` ↔ `krds-form-check input[type=checkbox]`, `.checkbox__label` ↔ `krds-form-check label`, `.checkbox__description` ↔ `krds-form-check-cnt krds-form-check-p`, `.checkbox--chip` ↔ `krds-form-chip`
- KRDS 키트 medium 크기 네모 양식은 20px 이다 — 이 규격은 입력과 표시를 24px 로 만들어 포인터 대상 크기를 직접 충족한다(LAYOUT-002).
- KRDS 키트는 그룹 레이블(legend) 없이 옵션을 나열한다 — 이 규격은 fieldset·legend 로 그룹 레이블을 준다(A11Y-007, FORM-004).
- KRDS 키트는 옵션 부가 설명(krds-form-check-p)을 입력과 연결하지 않는다 — 이 규격은 aria-describedby 로 연결한다(A11Y-007).
- KRDS 키트 칩형은 선택 상태를 색으로만 바꾼다 — 이 규격은 테두리 두께·글자 굵기도 바꾼다(COLOR-001).
