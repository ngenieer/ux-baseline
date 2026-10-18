# 날짜 입력 필드 (`.date-input`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

날짜 하나(예약일·방문일 등), 년·월·일로 나눈 날짜(생년월일 등), 시작일·종료일 범위를 키보드로 직접 입력받을 때 쓴다.

## 대신 쓸 것
- '5일 이내', '1일 후'처럼 기준일에서 상대적인 날짜를 받는 경우 → 짧은 숫자 입력(text-field) 또는 상대 날짜 옵션을 나열한 셀렉트 (FORM-050)
- 사용자가 정확한 일자를 모를 수 있는 날짜를 받는 경우 → 월 단위 입력 또는 시작일·종료일 범위 입력(date-input--range) (FORM-048)
- 날짜 선택기 자체(달력 그리드)의 규격이 필요한 경우 → calendar (FORM-049)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.date-input` | `div (단일) · fieldset (년·월·일 분할, 범위)` | 예 | 단일 입력은 text-field 와 같은 순서로 레이블 → 부가 설명 → 입력 박스 → 시스템 메시지를 쌓는다(FORM-009). 입력이 2개 이상이면 fieldset 으로 묶는다(A11Y-007). |
| 그룹 제목 | `.date-input__legend` | `legend` |  | 분할·범위 입력에서 요청하는 날짜를 설명한다(예 생년월일, 조회 기간). 필수·선택 표시는 서비스 전체에서 한 방식만 쓴다(FORM-012). |
| 레이블 | `.date-input__label` | `label` | 예 | 입력마다 for 로 연결한다. 분할 입력은 각 칸에 '년'·'월'·'일', 범위 입력은 '시작일'·'종료일'(FORM-004, A11Y-025). |
| 부가 설명 | `.date-input__hint` | `p` |  | 입력 형식과 예시는 플레이스홀더가 아니라 여기에 쓴다(FORM-017). 입력의 aria-describedby 로 연결한다. |
| 입력 묶음 | `.date-input__group` | `div` |  | 분할·범위 입력의 칸들을 한 줄에 묶는다. 한 줄에 묶는 것은 하나의 날짜(년·월·일) 또는 시작·종료 일자뿐이다(FORM-010). |
| 칸 | `.date-input__field` | `div` |  | 분할·범위 입력에서 레이블 하나와 입력 하나를 묶는다. |
| 입력 행 | `.date-input__control` | `div` |  | 입력 박스와 달력 열기 버튼을 한 줄에 둔다. |
| 입력 박스 | `.date-input__input` | `input` | 예 | type="text" inputmode="numeric". disabled·readonly 로 막지 않고 직접 입력할 수 있게 한다(A11Y-011). 본인 날짜(생년월일)는 autocomplete bday-year·bday-month·bday-day(FORM-001). 붙여넣기를 막지 않는다(FORM-018, FORM-047). |
| 달력 열기 버튼 | `.date-input__picker` | `button` |  | 먼 날짜·요일이 중요한 날짜·인접 날짜와 비교해 고르는 날짜에만 둔다(FORM-049). 생년월일에는 두지 않는다(FORM-021). aria-label 에 어느 날짜의 달력인지 쓴다(COPY-003). 크기 56px(size-height-8)로 24px 이상이다(LAYOUT-002). |
| 아이콘 | `.date-input__icon` | `svg` |  | 버튼 이름이 따로 있으므로 aria-hidden="true"(A11Y-001). |
| 시스템 메시지(오류) | `.date-input__message` | `p` |  | 제출 시 오류가 있을 때만 넣는다(FORM-080). 입력의 aria-describedby 에 id 를 더한다(FORM-003). |

## 표준 마크업

```html
<div class="date-input date-input--error">
  <label class="date-input__label" for="visit-date">방문 예약일 (필수)</label>
  <p class="date-input__hint" id="visit-date-hint">연, 월, 일 순서로 숫자를 입력하거나 달력에서 골라 주세요. 예: 2026. 10. 25.</p>
  <div class="date-input__control">
    <input class="date-input__input" type="text" inputmode="numeric" id="visit-date" name="visit_date" required aria-invalid="true" aria-describedby="visit-date-hint visit-date-error" value="2026. 13. 25.">
    <button class="date-input__picker" type="button" aria-haspopup="dialog" aria-label="방문 예약일 달력 열기">
      <svg class="date-input__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2zM5 10v10h14V10H5z"/></svg>
    </button>
  </div>
  <p class="date-input__message" id="visit-date-error">방문 예약일의 월을 1부터 12 사이 숫자로 입력해 주세요. 예: 2026. 10. 25.</p>
</div>
<fieldset class="date-input date-input--split">
  <legend class="date-input__legend">생년월일 (필수)</legend>
  <p class="date-input__hint" id="birth-hint">예: 1990년 3월 7일이면 1990, 3, 7을 입력해 주세요.</p>
  <div class="date-input__group">
    <div class="date-input__field date-input__field--year">
      <label class="date-input__label" for="birth-year">년</label>
      <input class="date-input__input" type="text" inputmode="numeric" id="birth-year" name="birth_year" maxlength="4" autocomplete="bday-year" required aria-describedby="birth-hint">
    </div>
    <div class="date-input__field">
      <label class="date-input__label" for="birth-month">월</label>
      <input class="date-input__input" type="text" inputmode="numeric" id="birth-month" name="birth_month" maxlength="2" autocomplete="bday-month" required aria-describedby="birth-hint">
    </div>
    <div class="date-input__field">
      <label class="date-input__label" for="birth-day">일</label>
      <input class="date-input__input" type="text" inputmode="numeric" id="birth-day" name="birth_day" maxlength="2" autocomplete="bday-day" required aria-describedby="birth-hint">
    </div>
  </div>
</fieldset>
<fieldset class="date-input date-input--range">
  <legend class="date-input__legend">조회 기간 (선택)</legend>
  <p class="date-input__hint" id="period-hint">연, 월, 일 순서로 숫자를 입력하거나 달력에서 골라 주세요. 예: 2026. 10. 1.</p>
  <div class="date-input__group">
    <div class="date-input__field">
      <label class="date-input__label" for="period-start">시작일</label>
      <div class="date-input__control">
        <input class="date-input__input" type="text" inputmode="numeric" id="period-start" name="period_start" aria-describedby="period-hint">
        <button class="date-input__picker" type="button" aria-haspopup="dialog" aria-label="조회 시작일 달력 열기">
          <svg class="date-input__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2zM5 10v10h14V10H5z"/></svg>
        </button>
      </div>
    </div>
    <div class="date-input__field">
      <label class="date-input__label" for="period-end">종료일</label>
      <div class="date-input__control">
        <input class="date-input__input" type="text" inputmode="numeric" id="period-end" name="period_end" aria-describedby="period-hint">
        <button class="date-input__picker" type="button" aria-haspopup="dialog" aria-label="조회 종료일 달력 열기">
          <svg class="date-input__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2zM5 10v10h14V10H5z"/></svg>
        </button>
      </div>
    </div>
  </div>
</fieldset>
```

## 표준 CSS (토큰만 사용)

```css
.date-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.date-input__legend {
  margin-block-end: var(--space-gap-3);
  padding: 0;
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.date-input__label {
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.date-input--split .date-input__label,
.date-input--range .date-input__label {
  font-size: var(--font-size-label-small);
  font-weight: var(--font-weight-regular);
}
.date-input__hint {
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.date-input__group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-4);
}
.date-input__field {
  display: flex;
  flex: 1 1 var(--size-height-11);
  flex-direction: column;
  gap: var(--space-gap-2);
}
.date-input__field--year {
  flex-grow: 2;
}
.date-input__control {
  display: flex;
  gap: var(--space-gap-2);
}
.date-input__input {
  flex: 1 1 auto;
  inline-size: 100%;
  min-inline-size: 0;
  min-block-size: var(--size-height-8);
  padding-inline: var(--space-padding-6);
  border: var(--space-scale-1) solid var(--color-input-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-input-surface);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
.date-input__input:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.date-input__input:disabled {
  border-color: var(--color-input-border-disabled);
  background-color: var(--color-input-surface-disabled);
  color: var(--color-text-disabled);
}
.date-input--error .date-input__input,
.date-input__input[aria-invalid="true"] {
  border-color: var(--color-input-border-error);
}
.date-input__picker {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  inline-size: var(--size-height-8);
  block-size: var(--size-height-8);
  padding: 0;
  border: var(--space-scale-1) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-icon-gray);
  cursor: pointer;
}
.date-input__picker:hover {
  background-color: var(--color-button-tertiary-fill-hover);
}
.date-input__picker:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.date-input__icon {
  inline-size: var(--space-scale-10);
  block-size: var(--space-scale-10);
  fill: currentColor;
}
.date-input__message {
  color: var(--color-text-danger);
  font-size: var(--font-size-body-small);
}
```

## 상태
- **오류**: 루트에 date-input--error, 오류가 난 입력에 aria-invalid="true", 시스템 메시지 p 를 넣고 그 id 를 aria-describedby 에 더한다. 메시지는 항목 이름·문제·올바른 형식 예시를 담는다(FORM-003·005, COPY-005). 분할·범위 입력은 메시지를 묶음 아래 하나로 두고 오류가 난 칸마다 aria-invalid 와 aria-describedby 를 준다.
- **년·월·일 분할(date-input--split)**: 루트를 fieldset 으로, 요청하는 날짜를 legend 로 쓰고 칸마다 '년'·'월'·'일' label 을 연결한다(A11Y-007). 달력 열기 버튼을 두지 않는다(FORM-021). 원본 문서의 날짜를 받으면 칸 순서·자릿수를 원본 표기와 같게 한다(예 카드 유효기간 MM/YY, FORM-047).
- **범위(date-input--range)**: 루트를 fieldset 으로 하고 '시작일'·'종료일' 칸을 한 줄에 둔다(NAV-010, FORM-010). 좁은 화면에서는 줄바꿈된다(flex-wrap).
- **달력 열림**: 달력 열기 버튼을 누르면 calendar 규격의 대화상자를 연다. 날짜를 고르면 입력 박스 값을 '2026. 10. 25.' 형식으로 채우고 초점을 달력 열기 버튼으로 돌려준다.
- **비활성**: 입력과 달력 열기 버튼에 disabled. 값을 바꿀 수 없다는 이유를 부가 설명에 쓴다. 달력이 있다는 이유로 입력만 disabled·readonly 로 막지 않는다(A11Y-011).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 입력 박스 → 달력 열기 버튼 → 다음 칸 순서로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). |
| Enter / Space (달력 열기 버튼) | 달력 대화상자를 열고 선택된 날짜(없으면 오늘)에 초점을 둔다(calendar 규격). |

## 동작
- 입력 박스는 숫자와 구분 기호(마침표·하이픈·빗금·공백)를 모두 받아 연·월·일로 해석한다. 날짜 텍스트 붙여넣기를 막지 않는다(FORM-018, FORM-047).
- 분할 입력에서 칸이 다 차도 초점을 다음 칸으로 자동으로 옮기지 않는다. 옮긴다면 입력 전에 그 동작을 텍스트로 알리고 FORM-026 의 되돌아가기 요건을 지킨다(FORM-002, FORM-026).
- 오류는 칸을 벗어날 때(blur)가 아니라 다음 단계·제출 버튼을 눌렀을 때 표시하고, 표시한 뒤에도 입력값을 지우지 않는다(FORM-080, FORM-016).
- 값을 바꾸거나 달력에서 날짜를 고르는 것만으로 제출·페이지 이동을 하지 않는다(FORM-002).
- 화면에 날짜를 다시 보여 줄 때(확인 화면 등)는 '2026. 10. 25.' 형식과 time 요소를 쓴다(COPY-056).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-045 | MAY | 스크린 리더 전용 숨긴 텍스트는 비텍스트 콘텐츠의 복잡한 설명, 조작 방법 안내, 요소·화면의 상태 변화 정보 전달에 쓰고, 간결한 이미지 설명이나 요소의 접근 가능한 이름 전달에는 alt·label·aria-label을 쓴다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| COPY-005 | SHOULD | 오류 메시지는 오류가 난 항목 이름, 무엇이 잘못됐는지, 고치는 방법(또는 사용자가 할 수 있는 다음 행동)을 담아 높임 종결어미로 쓰고, 사용자를 탓하는 표현과 '오류가 발생했습니다'·'유효하지 않은 값입니다' 같은 일반 문구만으로 된 메시지를 쓰지 않는다. |
| COPY-056 | SHOULD | 화면에 숫자만으로 날짜를 쓸 때는 '2026. 10. 18.'처럼 연·월·일 자리에 각각 마침표를 찍고 마침표 뒤를 한 칸 띄우며 마지막 마침표를 생략하지 않고, 날짜를 time 요소로 감싸 datetime 속성에 YYYY-MM-DD 형식 값(시각까지 나타내면 YYYY-MM-DDTHH:MM 또는 YYYY-MM-DDTHH:MM:SS)을 넣는다. |
| FORM-001 | MUST | 사용자 본인에 관한 정보를 받는 입력 필드 중 목적이 HTML 자동완성 토큰(name, email, tel, bday, street-address 등)에 해당하는 필드에는 그 목적에 맞는 autocomplete 값을 지정한다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-003 | MUST | 입력 오류를 자동으로 감지하면 오류가 난 항목을 식별하고 오류 내용을 텍스트로 설명한다. |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-005 | MUST | 입력 오류를 자동으로 감지했고 올바른 값의 형식·범위·허용 값을 알고 있으면 오류 메시지에 그 수정 방법을 텍스트로 제시한다. 보안이나 콘텐츠 목적을 해치는 경우만 예외로 한다. |
| FORM-009 | SHOULD | 텍스트 입력 필드의 구성 요소는 레이블, 부가 설명, 입력 박스, 시스템 메시지(도움말·오류) 순서로 위에서 아래로 배치한다. |
| FORM-010 | MAY | 입력폼의 입력 컴포넌트는 한 열로 세로 배치하고, 한 줄에 가로로 묶는 것은 하나의 정보를 이루는 필드(성·이름, 전화번호, 신용카드 번호, 우편번호·주소, 시작·종료 일자)로 한정한다. 라디오 버튼·체크박스 옵션은 세로로 나열하고, 가로로 나열할 때는 레이블 길이(COPY-029)와 옵션 간격(SPACE-002) 조건을 지킨다. |
| FORM-012 | SHOULD | 입력폼(form 요소와 form 밖의 독립 fieldset)의 필수 항목과 선택 항목을 레이블의 '필수'·'선택' 텍스트, 필수 항목의 별표(*), 또는 '모든 항목이 필수'라는 폼 상단 안내 중 하나로 구분하고, 같은 서비스 안에서는 한 가지 방식만 쓴다. |
| FORM-016 | SHOULD | 검증 오류를 안내한 뒤에도 사용자가 입력하거나 선택한 값을 지우거나 초기화하지 않는다. |
| FORM-017 | SHOULD | 플레이스홀더를 레이블이나 도움말 대신 쓰지 않고, 플레이스홀더에 입력 형식 힌트나 예시를 넣을 때는 같은 내용을 입력 필드 밖의 보이는 텍스트(도움말)로도 제공한다. |
| FORM-018 | SHOULD | 개인 식별 정보 입력 필드, 텍스트 입력 필드, 텍스트 영역에서 복사와 붙여넣기를 막지 않는다. |
| FORM-021 | SHOULD | 생년월일 입력에는 날짜 선택기(달력)를 쓰지 않고, 연도와 일 입력에 셀렉트를 쓰지 않는다. |
| FORM-026 | SHOULD | 값을 다 입력하면 초점을 다음 입력 필드로 자동으로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓰고, 그때도 Shift+Tab이나 클릭으로 이전 필드로 돌아가 값을 고칠 수 있게 하며 돌아간 필드에서 초점을 다시 자동으로 옮기지 않는다. |
| FORM-047 | SHOULD | 여권·신용카드처럼 원본 문서에 적힌 날짜를 받을 때는 입력 필드의 구성(구성 요소 순서·자릿수)을 원본의 날짜 형식과 같게 하고, 날짜 텍스트 붙여넣기를 막지 않는다. |
| FORM-048 | SHOULD | 사용자가 특정일을 기억하거나 지정하기 어려운 날짜는 월 단위 입력이나 시작일·종료일 범위 입력으로 받는다. |
| FORM-049 | SHOULD | 서비스 이용 시점에서 먼 과거·미래 날짜, 요일이 중요한 날짜, 인접 날짜와 비교해 고르는 날짜(예약일·방문일 등)를 받는 단일·범위 날짜 입력 필드에는 날짜 선택기를 함께 제공한다. |
| FORM-050 | SHOULD | '5일 이내', '1일 후'처럼 기준일에서 상대적인 날짜는 날짜 입력 필드나 날짜 선택기 대신 짧은 텍스트 입력이나 날짜 옵션을 나열한 셀렉트로 받는다. |
| FORM-080 | SHOULD | 입력 필드의 오류(오류 메시지와 aria-invalid="true")는 사용자가 필드를 벗어날 때(blur)나 입력하는 동안이 아니라 다음 단계·제출 버튼을 눌렀을 때 표시하고, 다음 단계·제출 버튼은 입력 상태와 관계없이 비활성화하지 않는다. 제출 전에는 aria-invalid를 설정하지 않고 aria-describedby로 연결한 role="status" 영역의 텍스트만 바꾸는 조건 안내(입력 중 비밀번호 조건 충족 여부, 아이디 '중복 확인' 버튼 결과)를 허용한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| NAV-010 | SHOULD | 날짜·시간을 기준으로 거르는 필터와 목록 조회 기간 입력은 시작과 끝을 각각 지정하는 범위 입력으로 제공한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.date-input` ↔ `form-group`, `.date-input__label` ↔ `form-tit label`, `.date-input__control` ↔ `calendar-input`, `.date-input__input` ↔ `krds-input datepicker`, `.date-input__picker` ↔ `krds-btn icon form-btn-datepicker`, `.date-input__group` ↔ `input-group range`
- KRDS 키트는 input type="number" 를 쓴다 — 이 규격은 type="text" inputmode="numeric" 을 쓴다. number 는 마침표·공백이 든 날짜 텍스트를 붙여넣으면 값이 비고 앞자리 0 을 지운다(FORM-047, FORM-018).
- KRDS 키트는 형식 안내를 플레이스홀더('YYYY.MM.DD', '시작날짜')로만 준다 — 이 규격은 부가 설명에 쓰고 aria-describedby 로 연결한다(FORM-017).
- KRDS 키트 범위 입력은 label 없이 title 속성('시작날짜 입력')으로만 이름을 준다 — 이 규격은 보이는 '시작일'·'종료일' label 과 fieldset/legend 를 쓴다(FORM-004, A11Y-007).
- KRDS 키트의 달력 열기 버튼은 이름을 sr-only 텍스트로 준다 — 이 규격은 aria-label 에 어느 날짜의 달력인지까지 쓴다(A11Y-045, COPY-003).
