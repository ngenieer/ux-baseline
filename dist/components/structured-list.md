# 구조화 목록 (`.structured-list`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

공고·서비스·민원처럼 같은 형식의 정보 묶음 여러 개를 카드형 항목으로 나열하고, 항목마다 상세 보기와 주요 행동을 제공할 때 쓴다.

## 대신 쓸 것
- 항목 간 값을 열 단위로 비교해야 하고 행·셀에 상호작용이 없는 경우 → data-table
- 문장·짧은 구절만 나열하고 항목별 행동 버튼이 없는 경우 → text-list
- 표 데이터에 행 단위 선택·실행 같은 복잡한 상호작용이 필요한 경우(표 대신 이 컴포넌트를 쓴다) → structured-list (LAYOUT-045)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.structured-list` | `ul` | 예 | 항목 사이 순서와 개수를 보조기술이 알 수 있게 ul/li 로 마크업한다(A11Y-007). |
| 항목 | `.structured-list__item` | `li` | 예 | 모든 항목이 같은 정보 칸을 같은 DOM 순서로 가진다(LAYOUT-028). |
| 분류 배지 | `.badge` | `span` |  | 배지 컴포넌트를 쓴다. 항목 하나에 1개만 붙인다(STATE-014). |
| 제목 | `.structured-list__title` | `h2~h6` | 예 | 페이지 구조에 맞는 수준의 헤딩으로 쓰고, 상세 페이지 링크는 제목 텍스트에만 건다. 헤딩 id 를 행동 버튼의 aria-describedby 대상으로 쓴다. |
| 요약 | `.structured-list__summary` | `p` |  | 상세 콘텐츠 가운데 다음 행동을 고르는 데 필요한 핵심 정보만 쓴다(LAYOUT-025). |
| 속성 목록 | `.structured-list__meta` | `dl` | 예 | 기관·기간·상태처럼 이름-값 짝은 dt/dd 로 쓴다. 값이 없으면 대시(-)를 쓴다(STATE-005). |
| 행동 영역 | `.structured-list__actions` | `div` | 예 | DOM 에서 항목 콘텐츠 뒤에 둔다(A11Y-008). 최상위 강조 버튼(CTA)은 항목마다 1개다(LAYOUT-026). |
| 주요 행동(CTA) | `.structured-list__cta` | `a 또는 button` |  |  |
| 보조 행동 | `.structured-list__action` | `button` |  | 공유·찜하기처럼 자주 쓰는 기능을 상세 페이지에 가지 않고 실행하게 한다(LAYOUT-027). |

## 표준 마크업

```html
<ul class="structured-list" role="list">
  <li class="structured-list__item">
    <span class="badge badge--success">접수 중</span>
    <h2 class="structured-list__title" id="notice-101-title"><a href="/notices/101">2026년 청년 주거비 지원 사업</a></h2>
    <p class="structured-list__summary">만 19~34세 무주택 청년에게 월세를 최대 12개월 동안 지원합니다.</p>
    <dl class="structured-list__meta">
      <div class="structured-list__meta-row">
        <dt>담당 기관</dt>
        <dd>국토교통부</dd>
      </div>
      <div class="structured-list__meta-row">
        <dt>신청 기간</dt>
        <dd><time datetime="2026-11-01">2026. 11. 1.</time> ~ <time datetime="2026-11-30">2026. 11. 30.</time></dd>
      </div>
    </dl>
    <div class="structured-list__actions">
      <a class="structured-list__cta" href="/notices/101/apply" aria-describedby="notice-101-title">신청하기</a>
      <button type="button" class="structured-list__action" aria-describedby="notice-101-title">공유하기</button>
      <button type="button" class="structured-list__action" aria-describedby="notice-101-title" aria-pressed="false">찜하기</button>
    </div>
  </li>
  <li class="structured-list__item">
    <span class="badge badge--gray">마감</span>
    <h2 class="structured-list__title" id="notice-102-title"><a href="/notices/102">2026년 청년 창업 공간 입주자 모집</a></h2>
    <p class="structured-list__summary">창업 3년 이내 청년 기업에 사무 공간을 1년 동안 무상으로 제공합니다.</p>
    <dl class="structured-list__meta">
      <div class="structured-list__meta-row">
        <dt>담당 기관</dt>
        <dd>-</dd>
      </div>
      <div class="structured-list__meta-row">
        <dt>신청 기간</dt>
        <dd><time datetime="2026-09-01">2026. 9. 1.</time> ~ <time datetime="2026-09-30">2026. 9. 30.</time></dd>
      </div>
    </dl>
    <div class="structured-list__actions">
      <a class="structured-list__cta" href="/notices/102/result" aria-describedby="notice-102-title">결과 보기</a>
      <button type="button" class="structured-list__action" aria-describedby="notice-102-title">공유하기</button>
      <button type="button" class="structured-list__action" aria-describedby="notice-102-title" aria-pressed="true">찜하기</button>
    </div>
  </li>
</ul>
```

## 표준 CSS (토큰만 사용)

```css
.structured-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-7);
  margin: 0;
  padding: 0;
  list-style: none;
}
.structured-list__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  padding: var(--space-padding-8);
  border: var(--border-width-static-regular) solid var(--color-border-gray);
  border-radius: var(--radius-xlarge2);
  background-color: var(--color-surface-white-subtle);
}
.structured-list__item > .badge {
  align-self: flex-start;
}
.structured-list__title {
  margin: 0;
  color: var(--color-text-basic);
  font-size: var(--font-size-heading-small);
  font-weight: var(--font-weight-bold);
}
.structured-list__title a {
  color: inherit;
  text-decoration: underline;
}
.structured-list__title a:focus-visible,
.structured-list__cta:focus-visible,
.structured-list__action:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.structured-list__summary {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-medium);
}
.structured-list__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-2) var(--space-gap-5);
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.structured-list__meta-row {
  display: flex;
  gap: var(--space-gap-3);
}
.structured-list__meta dt {
  font-weight: var(--font-weight-bold);
}
.structured-list__meta dd {
  margin: 0;
}
.structured-list__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-gap-3);
  padding-block-start: var(--space-padding-6);
  border-block-start: var(--border-width-static-regular) solid var(--color-divider-gray-light);
}
.structured-list__cta {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-6);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-primary-fill);
  color: var(--color-text-inverse-static);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
}
.structured-list__action {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-4);
  border: var(--border-width-static-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
}
.structured-list__action[aria-pressed="true"] {
  border-color: var(--color-border-secondary);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-bold);
}
```

## 상태
- **값 없음**: 원자료에 값이 없는 속성도 dt/dd 짝을 생략하지 않고 dd 에 '-' 를 쓴다(LAYOUT-028, STATE-005).
- **보조 행동 켜짐(찜하기 등)**: 토글형 보조 행동 버튼은 aria-pressed="true" 로 바꾸고, 색 외에 굵기·테두리 변화로도 구분한다(A11Y-025, COLOR-001).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 항목 안에서 제목 링크 → 주요 행동 → 보조 행동 순서로, 화면 읽기 순서와 같게 이동한다(A11Y-008). 초점 표시가 보인다(A11Y-016). |
| Enter | 제목 링크·주요 행동 링크를 실행한다. |
| Enter / Space | 보조 행동 버튼을 실행한다. |

## 동작
- 모든 기능(상세 보기·주요 행동·보조 행동)을 키보드만으로 실행할 수 있게 한다. 항목 전체에 click 핸들러를 걸어 카드 클릭으로만 이동하게 하지 않는다(A11Y-011).
- 같은 이름의 행동 버튼이 항목마다 반복되므로, 각 버튼의 aria-describedby 를 항목 제목 id 로 연결해 어느 항목의 행동인지 전달한다(A11Y-025, COPY-002).
- 항목에 보이는 정보는 사용자가 다음 행동을 고르는 데 필요한 것만 남기고, 제목 → 요약 → 속성 순으로 시각 위계를 둔다(LAYOUT-025).
- 최상위 강조 버튼은 이 목록의 방문 목적에서 가장 중요한 행동 하나만 쓴다(LAYOUT-026). 자주 쓰는 기능은 보조 행동으로 항목 안에 둔다(LAYOUT-027).
- 새 창·외부 서비스로 가는 행동에는 서비스 전체에서 같은 표시와 '새 창' 텍스트(시각적으로 숨긴 텍스트 포함)를 넣는다(NAV-012).
- 목록 위에 정렬·필터 도구 막대를 두면 정렬 컨트롤은 목록 오른쪽 위에 두고(NAV-011), 도구 막대 요소의 순서를 모든 목록 화면에서 같게 한다(NAV-004). 정렬·조회 실행 뒤 초점을 그 컨트롤에 유지한다(NAV-009).
- 날짜는 '2026. 11. 1.' 형식으로 쓰고 time 요소의 datetime 에 YYYY-MM-DD 값을 넣는다(COPY-056).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COPY-002 | MUST | 링크의 목적을 링크 텍스트만으로, 또는 링크 텍스트와 프로그램으로 판별되는 링크 맥락(같은 문장·문단·목록 항목·표 셀·aria-describedby)으로 알 수 있게 쓴다. |
| COPY-056 | SHOULD | 화면에 숫자만으로 날짜를 쓸 때는 '2026. 10. 18.'처럼 연·월·일 자리에 각각 마침표를 찍고 마침표 뒤를 한 칸 띄우며 마지막 마침표를 생략하지 않고, 날짜를 time 요소로 감싸 datetime 속성에 YYYY-MM-DD 형식 값(시각까지 나타내면 YYYY-MM-DDTHH:MM 또는 YYYY-MM-DDTHH:MM:SS)을 넣는다. |
| LAYOUT-025 | SHOULD | 구조화 목록 항목에는 상세 페이지 콘텐츠 중 핵심 정보만 골라 논리적 순서와 위계가 드러나게 구성한다. |
| LAYOUT-026 | SHOULD | 구조화 목록에서는 목록 정보의 성격과 사용자 방문 목적에 비춰 가장 중요한 행동 하나를 최상위 강조 버튼(CTA)으로 표현한다. |
| LAYOUT-027 | SHOULD | 사용자가 자주 쓰는 기능의 행동 버튼을 구조화 목록 항목에 두어 상세 페이지로 가거나 항목을 펼치지 않고도 목적을 달성하게 한다. |
| LAYOUT-028 | SHOULD | 구조화 목록의 모든 항목은 같은 정보 항목을 같은 순서로 보여 주고, 값이 없는 항목도 자리를 비우지 않는다. |
| LAYOUT-045 | SHOULD | 표의 행·셀 자체를 클릭·선택하는 대화형 요소로 만들지 않고(열 헤더 정렬 컨트롤 제외), 데이터에 복잡한 상호작용이 필요하면 표 대신 구조화 목록을 쓴다. |
| NAV-004 | MUST | 여러 페이지에 반복되는 내비게이션은 사용자가 바꾸지 않는 한 매번 같은 상대 순서로 둔다. |
| NAV-009 | SHOULD | 필터·정렬·조회를 실행한 뒤 키보드 초점을, 결과를 즉시 반영하는 방식이면 값을 바꾼 옵션에, 일괄 반영하는 방식이면 적용(제출) 버튼에 유지하고 문서 처음이나 다른 요소로 옮기지 않는다. |
| NAV-011 | MAY | 인라인 정렬(표 열 머리글 정렬 등)을 쓰는 경우를 빼고, 정렬 컨트롤은 대상 목록의 오른쪽 위에 둔다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| STATE-005 | SHOULD | 구조화 목록 항목이나 표의 데이터 셀에 표시할 값이 없으면 그 자리를 비워 두지 않고 대시(-)를 표시한다. |
| STATE-014 | MAY | 한 항목 컨테이너(목록 항목·표 행·카드·글·구역 등)에 보이는 배지를 1개만 붙인다. |

## KRDS 키트와의 관계
- 클래스 대응: `.structured-list` ↔ `krds-structured-list`, `.structured-list__item` ↔ `structured-item`, `.structured-list__title` ↔ `c-tit`, `.structured-list__summary` ↔ `c-txt`, `.structured-list__meta` ↔ `c-date`, `.structured-list__actions` ↔ `c-btn card-btn`
- KRDS 키트는 제목·요약·기간 전체를 하나의 a 로 감싼다 — 이 규격은 제목 텍스트에만 링크를 걸어 링크 이름을 제목으로 한정한다(COPY-002).
- KRDS 키트는 행동 버튼의 대상 항목을 title 속성("타이틀 영역")으로만 알린다 — 이 규격은 aria-describedby 로 항목 제목과 연결한다(A11Y-025).
- KRDS 키트는 신청 기간 같은 이름-값을 strong·span 으로 쓴다 — 이 규격은 dl/dt/dd 로 관계를 마크업한다(A11Y-007).
- KRDS 키트 예시 날짜 '2023.00.00-2024.00.00' 은 마침표 뒤를 붙여 쓴다 — 이 규격은 '2026. 11. 1.' 형식과 time 요소를 쓴다(COPY-056).
- KRDS 키트 예시는 항목 배지로 bg-light-primary 를 쓴다 — 이 규격은 배지 컴포넌트의 의미 색(성공·회색 등)만 쓴다(STATE-014, 배지 규격 참조).
