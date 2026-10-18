# 달력 (`.calendar`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

날짜 입력 필드의 달력 열기 버튼으로 여는 날짜 선택 대화상자로, 요일·인접 날짜를 보며 날짜 하나 또는 시작·종료 범위를 고를 때 쓴다.

## 대신 쓸 것
- 정기적으로 갱신되지 않는 정보이거나 한 달 이벤트가 2개 이하인 일정을 보여 주는 경우 → 날짜순 목록 (LAYOUT-031)
- 생년월일처럼 사용자가 이미 아는 날짜를 받는 경우 → date-input(년·월·일 분할, 달력 버튼 없음) (FORM-021)
- '5일 이내'처럼 기준일에서 상대적인 날짜를 받는 경우 → 짧은 숫자 입력 또는 상대 날짜 옵션 셀렉트 (FORM-050)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(대화상자) | `.calendar` | `div` | 예 | role="dialog" aria-modal="true", aria-labelledby 로 달·연 제목을 이름으로 준다(WAI-ARIA APG Date Picker Dialog). 열려 있는 동안 초점은 대화상자 안에서만 돈다(A11Y-029). |
| 머리 | `.calendar__header` | `div` | 예 | 이전 해·이전 달·제목·다음 달·다음 해 순서. 먼 과거·미래 날짜로 빨리 옮길 수 있게 해 단위 이동 버튼을 둔다(FORM-049). |
| 이동 버튼 | `.calendar__nav` | `button` | 예 | 아이콘 버튼이므로 aria-label 로 '이전 달' 등 이름을 준다(A11Y-025). 모든 페이지의 달력에서 같은 이름·아이콘을 쓴다(COPY-004). 크기 40px(size-height-6)(LAYOUT-002). |
| 아이콘 | `.calendar__icon` | `svg` |  | aria-hidden="true"(A11Y-001). |
| 제목 | `.calendar__title` | `h2` | 예 | 보이는 달을 '2026년 10월'로 쓴다. aria-live="polite" 로 달이 바뀌면 읽힌다(STATE-001). |
| 날짜 그리드 | `.calendar__grid` | `table` | 예 | role="grid", aria-labelledby 로 제목과 연결한다. 요일 머리는 th scope="col" 이고 abbr 에 요일 전체 이름을 쓴다(A11Y-007). |
| 요일 | `.calendar__weekday` | `th` | 예 |  |
| 날짜 칸 | `.calendar__day` | `td` | 예 | 칸 하나가 초점을 받는다(roving tabindex — 선택한 날짜 또는 오늘이 tabindex="0", 나머지 "-1"). 상태는 aria-selected·aria-current="date"·aria-disabled 로 노출하고(A11Y-025), 색 외에 굵기·밑줄·취소선을 함께 쓴다(COLOR-001). 다른 달 칸은 비운다. 칸 크기 40px 이상(LAYOUT-002). |
| 범례 | `.calendar__legend` | `ul` |  | 날짜 상태를 텍스트로 풀어 쓴다. 서비스의 모든 달력에서 같은 표현·구조를 쓴다(COPY-004, COLOR-001). |
| 범례 표식 | `.calendar__legend-mark` | `span` |  | 날짜 칸과 같은 상태 클래스를 함께 줘 같은 모양으로 보인다. 옆 텍스트가 뜻을 전하므로 aria-hidden="true"(A11Y-001). |
| 조작 안내 | `.calendar__help` | `p` |  | 방향키 조작을 대화상자의 aria-describedby 로 연결한다(A11Y-012). |
| 바닥 | `.calendar__footer` | `div` | 예 |  |
| 버튼 | `.calendar__button` | `button` | 예 | '취소'와 실행할 동작인 '선택'을 둔다. '확인'만 쓰지 않는다(COPY-006). |

## 표준 마크업

```html
<div class="calendar" role="dialog" aria-modal="true" aria-labelledby="visit-calendar-title" aria-describedby="visit-calendar-help">
  <div class="calendar__header">
    <button class="calendar__nav" type="button" aria-label="이전 해">
      <svg class="calendar__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M11.4 6 5.4 12l6 6 1.4-1.4L8.2 12l4.6-4.6zm6 0-6 6 6 6 1.4-1.4-4.6-4.6 4.6-4.6z"/></svg>
    </button>
    <button class="calendar__nav" type="button" aria-label="이전 달">
      <svg class="calendar__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"/></svg>
    </button>
    <h2 class="calendar__title" id="visit-calendar-title" aria-live="polite">2026년 10월</h2>
    <button class="calendar__nav" type="button" aria-label="다음 달">
      <svg class="calendar__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z"/></svg>
    </button>
    <button class="calendar__nav" type="button" aria-label="다음 해">
      <svg class="calendar__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.6 18l6-6-6-6-1.4 1.4 4.6 4.6-4.6 4.6zm-6 0 6-6-6-6-1.4 1.4L9.8 12l-4.6 4.6z"/></svg>
    </button>
  </div>
  <table class="calendar__grid" role="grid" aria-labelledby="visit-calendar-title">
    <thead>
      <tr>
        <th class="calendar__weekday" scope="col" abbr="일요일">일</th>
        <th class="calendar__weekday" scope="col" abbr="월요일">월</th>
        <th class="calendar__weekday" scope="col" abbr="화요일">화</th>
        <th class="calendar__weekday" scope="col" abbr="수요일">수</th>
        <th class="calendar__weekday" scope="col" abbr="목요일">목</th>
        <th class="calendar__weekday" scope="col" abbr="금요일">금</th>
        <th class="calendar__weekday" scope="col" abbr="토요일">토</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="calendar__day calendar__day--outside"></td>
        <td class="calendar__day calendar__day--outside"></td>
        <td class="calendar__day calendar__day--outside"></td>
        <td class="calendar__day calendar__day--outside"></td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-01">1</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-02">2</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-03">3</td>
      </tr>
      <tr>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-04">4</td>
        <td class="calendar__day calendar__day--disabled" tabindex="-1" data-date="2026-10-05" aria-disabled="true">5<span class="sr-only"> 휴관일</span></td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-06">6</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-07">7</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-08">8</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-09">9</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-10">10</td>
      </tr>
      <tr>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-11">11</td>
        <td class="calendar__day calendar__day--disabled" tabindex="-1" data-date="2026-10-12" aria-disabled="true">12<span class="sr-only"> 휴관일</span></td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-13">13</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-14">14</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-15">15</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-16">16</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-17">17</td>
      </tr>
      <tr>
        <td class="calendar__day calendar__day--today" tabindex="-1" data-date="2026-10-18" aria-current="date">18</td>
        <td class="calendar__day calendar__day--disabled" tabindex="-1" data-date="2026-10-19" aria-disabled="true">19<span class="sr-only"> 휴관일</span></td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-20">20</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-21">21</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-22">22</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-23">23</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-24">24</td>
      </tr>
      <tr>
        <td class="calendar__day calendar__day--selected" tabindex="0" data-date="2026-10-25" aria-selected="true">25</td>
        <td class="calendar__day calendar__day--disabled" tabindex="-1" data-date="2026-10-26" aria-disabled="true">26<span class="sr-only"> 휴관일</span></td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-27">27</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-28">28</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-29">29</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-30">30</td>
        <td class="calendar__day" tabindex="-1" data-date="2026-10-31">31</td>
      </tr>    </tbody>
  </table>
  <ul class="calendar__legend" role="list">
    <li class="calendar__legend-item"><span class="calendar__legend-mark calendar__day--today" aria-hidden="true">18</span>오늘</li>
    <li class="calendar__legend-item"><span class="calendar__legend-mark calendar__day--selected" aria-hidden="true">25</span>선택한 날짜</li>
    <li class="calendar__legend-item"><span class="calendar__legend-mark calendar__day--disabled" aria-hidden="true">5</span>휴관일(선택할 수 없음)</li>
  </ul>
  <p class="calendar__help" id="visit-calendar-help">방향키로 날짜를 옮기고 Enter 키로 고를 수 있습니다.</p>
  <div class="calendar__footer">
    <button class="calendar__button" type="button">취소</button>
    <button class="calendar__button calendar__button--primary" type="button">선택</button>
  </div>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.calendar {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-4);
  inline-size: 100%;
  padding: var(--padding-card-small);
  border: var(--space-scale-1) solid var(--color-border-gray);
  border-radius: var(--radius-large1);
  background-color: var(--color-surface-white);
  box-shadow: var(--shadow-2);
  color: var(--color-text-basic);
}
.calendar__header {
  display: flex;
  align-items: center;
  gap: var(--space-gap-1);
}
.calendar__title {
  flex: 1 1 auto;
  margin: 0;
  font-size: var(--font-size-heading-xxsmall);
  font-weight: var(--font-weight-bold);
  text-align: center;
}
.calendar__nav {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  inline-size: var(--size-height-6);
  block-size: var(--size-height-6);
  padding: 0;
  border: 0;
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-icon-gray);
  cursor: pointer;
}
.calendar__nav:hover {
  background-color: var(--color-button-tertiary-fill-hover);
}
.calendar__icon {
  inline-size: var(--space-scale-10);
  block-size: var(--space-scale-10);
  fill: currentColor;
}
.calendar__grid {
  inline-size: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.calendar__weekday {
  padding-block: var(--space-padding-2);
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-small);
  font-weight: var(--font-weight-regular);
}
.calendar__day {
  block-size: var(--size-height-6);
  min-inline-size: var(--size-height-6);
  padding: 0;
  border-radius: var(--radius-medium3);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
  text-align: center;
  cursor: pointer;
}
.calendar__day:hover {
  background-color: var(--color-button-tertiary-fill-hover);
}
.calendar__day--outside {
  cursor: default;
}
.calendar__day--today {
  font-weight: var(--font-weight-bold);
  text-decoration: underline;
  text-decoration-thickness: var(--space-scale-2);
  text-underline-offset: var(--space-scale-3);
}
.calendar__day--selected,
.calendar__day--range-start,
.calendar__day--range-end {
  background-color: var(--color-button-primary-fill);
  color: var(--color-text-inverse-static);
  font-weight: var(--font-weight-bold);
}
.calendar__day--selected:hover,
.calendar__day--range-start:hover,
.calendar__day--range-end:hover {
  background-color: var(--color-button-primary-fill-hover);
}
.calendar__day--in-range {
  border-radius: 0;
  background-color: var(--color-surface-primary-subtler);
}
.calendar__day--disabled {
  color: var(--color-text-disabled);
  text-decoration: line-through;
  cursor: not-allowed;
}
.calendar__day--disabled:hover {
  background-color: transparent;
}
.calendar__day:focus-visible,
.calendar__nav:focus-visible,
.calendar__button:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.calendar__legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-4);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--font-size-body-small);
}
.calendar__legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-gap-2);
}
.calendar__legend-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--size-height-4);
  block-size: var(--size-height-4);
  border-radius: var(--radius-small3);
  font-size: var(--font-size-label-xsmall);
}
.calendar__help {
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.calendar__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-gap-3);
}
.calendar__button {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-6);
  border: var(--space-scale-1) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  cursor: pointer;
}
.calendar__button--primary {
  border-color: var(--color-button-primary-fill);
  background-color: var(--color-button-primary-fill);
  color: var(--color-text-inverse-static);
  font-weight: var(--font-weight-bold);
}
```

## 상태
- **오늘**: 오늘 칸에 calendar__day--today 와 aria-current="date". 굵게·밑줄로 표시한다(COLOR-001).
- **선택**: 선택한 칸에 calendar__day--selected, aria-selected="true", tabindex="0". 채움 배경·흰 글자·굵게로 표시한다.
- **선택 불가**: 칸에 calendar__day--disabled 와 aria-disabled="true", 이유를 .sr-only 텍스트로 칸 안에 덧붙인다(예 ' 휴관일'). 초점은 받되 Enter·클릭으로 고를 수 없다. 취소선으로 표시하고 범례에 뜻을 쓴다(COLOR-001, A11Y-001).
- **범위 선택(calendar--range)**: 시작 칸에 calendar__day--range-start, 끝 칸에 calendar__day--range-end, 사이 칸에 calendar__day--in-range 를 주고 범위 안 모든 칸에 aria-selected="true". 시작·끝 칸 안에 .sr-only 로 ' 시작일'·' 종료일'을 덧붙인다. 첫 Enter 가 시작일, 두 번째 Enter 가 종료일을 정한다.
- **일정 표시**: 이벤트가 있는 칸에 표식과 .sr-only ' 일정 있음' 을 넣고 범례에 뜻을 쓴다. 이벤트 텍스트가 칸에서 잘리면 같은 달 이벤트 전체를 보여 주는 목록·표를 같은 페이지에 두거나 주·일 보기로 바꿀 수 있게 한다(LAYOUT-030).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 이동 버튼 → 날짜 그리드(초점을 가진 칸 하나) → 취소 → 선택 순서로 옮기고, 끝에서 처음으로 돈다(A11Y-029). |
| ← / → | 하루 전·후 칸으로 초점을 옮긴다. 달 경계를 넘으면 이전·다음 달을 보여 준다. |
| ↑ / ↓ | 같은 요일의 한 주 전·후 칸으로 초점을 옮긴다. |
| Home / End | 그 주의 첫 칸(일요일)·마지막 칸(토요일)으로 옮긴다. |
| PageUp / PageDown | 이전·다음 달의 같은 날(없으면 그 달 마지막 날)로 옮긴다. |
| Shift+PageUp / Shift+PageDown | 이전·다음 해의 같은 달·같은 날로 옮긴다. |
| Enter / Space | 날짜 칸에서는 그 날짜를 고르고 대화상자를 닫아 입력 박스에 값을 채운다(aria-disabled 칸은 무시). 버튼에서는 그 버튼을 실행한다. |
| Esc | 값을 바꾸지 않고 대화상자를 닫고, 초점을 달력 열기 버튼으로 돌려준다. |

## 동작
- 열 때 선택된 날짜(없으면 오늘)의 칸에 초점을 둔다. 닫으면 초점을 연 버튼(date-input__picker)으로 돌려준다.
- 초점을 옮길 때 이전 칸은 tabindex="-1", 새 칸은 tabindex="0" 으로 바꾼다. 달이 바뀌면 제목 텍스트를 바꿔 aria-live 로 읽히게 한다(STATE-001).
- 날짜를 고르는 것만으로 제출·페이지 이동을 하지 않는다. 고른 값은 입력 박스에만 채운다(FORM-002).
- 모든 기능을 마우스·키보드·터치로 실행할 수 있게 한다. 드래그로 범위를 고르는 기능을 넣으면 Enter 두 번(시작·종료)으로도 고를 수 있어야 한다(A11Y-011, A11Y-021).
- 날짜 상태와 범례는 서비스의 모든 달력에서 같은 모양·같은 문구로 쓴다(COPY-004).
- 이벤트를 보여 주는 달력에서 칸 안 텍스트가 잘리면 그 달 이벤트 전체를 목록·표로 함께 제공한다(LAYOUT-030).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-012 | MUST | 키보드 초점이 들어갈 수 있는 모든 컴포넌트에서 키보드만으로 초점을 빼낼 수 있게 하고, 수정자 없는 방향키·Tab 같은 표준 방법이 아니면 빠져나오는 방법을 안내한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-021 | MUST | 드래그로 하는 모든 기능을 드래그 없는 단일 포인터 조작(클릭·탭)으로도 할 수 있게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-029 | SHOULD | 모달이 열려 있는 동안 키보드 초점과 스크린 리더 가상 초점이 모달 안에서만 이동하게 하고, 마지막 상호작용 요소에서 Tab을 누르면 첫 요소로, 첫 요소에서 Shift+Tab을 누르면 마지막 요소로 초점을 옮긴다. |
| A11Y-040 | SHOULD | 셀렉트·언어 변경·화면 크기 조정 같은 드롭다운의 옵션 목록이 펼쳐진 상태에서 레이블·컨테이너·목록이 아닌 영역을 클릭하면 목록을 접고, Esc를 누르면 목록을 접은 뒤 초점을 컨테이너로 옮긴다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| COPY-006 | SHOULD | 확인 대화상자의 실행 버튼 레이블에는 '확인'·'예'·'네'·'OK' 대신 실행할 동작을 동사로 쓴다(예: '삭제', '신청 취소', '제출'). |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-021 | SHOULD | 생년월일 입력에는 날짜 선택기(달력)를 쓰지 않고, 연도와 일 입력에 셀렉트를 쓰지 않는다. |
| FORM-049 | SHOULD | 서비스 이용 시점에서 먼 과거·미래 날짜, 요일이 중요한 날짜, 인접 날짜와 비교해 고르는 날짜(예약일·방문일 등)를 받는 단일·범위 날짜 입력 필드에는 날짜 선택기를 함께 제공한다. |
| FORM-050 | SHOULD | '5일 이내', '1일 후'처럼 기준일에서 상대적인 날짜는 날짜 입력 필드나 날짜 선택기 대신 짧은 텍스트 입력이나 날짜 옵션을 나열한 셀렉트로 받는다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-030 | SHOULD | 달력 셀에서 이벤트 텍스트가 생략되면 같은 이벤트를 손실 없이 볼 수 있는 표나 목록을 따로 제공하거나, 달력 표시 단위를 주·일로 바꿔 이벤트 표시 영역을 넓힌다. |
| LAYOUT-031 | MAY | 정기적으로 갱신되지 않는 정보나 한 달 이벤트가 2개 이하인 정보에는 달력 컴포넌트를 쓰지 않는다. |
| NAV-010 | SHOULD | 날짜·시간을 기준으로 거르는 필터와 목록 조회 기간 입력은 시작과 끝을 각각 지정하는 범위 입력으로 제공한다. |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.calendar` ↔ `calendar-wrap`, `.calendar__header` ↔ `calendar-head`, `.calendar__nav` ↔ `btn-cal-move`, `.calendar__title` ↔ `calendar-switch-wrap (btn-cal-switch)`, `.calendar__grid` ↔ `calendar-tbl`, `.calendar__day` ↔ `td (button.btn-set-date)`, `.calendar__day--today` ↔ `today`, `.calendar__day--disabled` ↔ `disabled`, `.calendar__day--range-start` ↔ `period start`, `.calendar__day--range-end` ↔ `period end`, `.calendar__day--in-range` ↔ `period`, `.calendar__footer` ↔ `calendar-footer`
- KRDS 키트는 달력 영역에 role 없이 aria-label="달력" 만 준다 — 이 규격은 role="dialog" aria-modal="true" 와 제목 연결(aria-labelledby)을 쓰고 초점을 대화상자 안에 가둔다(A11Y-025, A11Y-029).
- KRDS 키트는 날짜마다 button 을 두어 Tab 정지점이 40개를 넘는다 — 이 규격은 APG 그리드 패턴(role="grid", roving tabindex, 방향키 이동)을 쓴다(A11Y-011, A11Y-012).
- KRDS 키트는 오늘·선택·기간 상태를 클래스(today·active·period)로만 표시해 보조기술에 전달하지 않는다 — 이 규격은 aria-current="date"·aria-selected·aria-disabled 로 노출한다(A11Y-025, A11Y-001).
- KRDS 키트 요일 머리 th 에 scope 가 없다 — 이 규격은 scope="col" 과 abbr(요일 전체 이름)을 쓴다(A11Y-007).
- KRDS 키트는 바닥 버튼을 '확인' 으로 쓴다 — 이 규격은 실행할 동작 '선택' 을 쓴다(COPY-006).
- KRDS 키트는 연·월을 드롭다운 목록 버튼으로 고른다 — 이 규격은 APG 의 이전·다음 해 버튼과 Shift+PageUp·PageDown 으로 대신한다. 연 드롭다운을 더하면 A11Y-040(바깥 클릭·Esc 로 닫기)을 지킨다.
