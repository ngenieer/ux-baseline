# 브레드크럼 (`.breadcrumb`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

3수준 이상 정보 구조에서 현재 화면의 상위 경로를 메인 화면부터 한 줄로 보여 주고 상위 화면으로 이동하게 할 때 쓴다.

## 대신 쓸 것
- 메인·랜딩 페이지, 탐색 계층이 1수준인 사이트 → 브레드크럼을 두지 않는다 (NAV-027)
- 신청·결제 같은 절차의 진행 상황 표시 → 단계 표시기 (NAV-028)
- 정보 구조 탐색 수단 자체 → 메인 메뉴(main-menu)·사이드 메뉴(side-navigation) — 브레드크럼은 그 대신 쓰지 않는다 (NAV-032)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.breadcrumb` | `nav` | 예 | main 안, 본문 제목(h1) 바로 위 왼쪽에 둔다(LAYOUT-017). aria-label 은 '현재 위치'. |
| 경로 목록 | `.breadcrumb__list` | `ol` | 예 | 한 줄로 표시한다(NAV-030). |
| 경로 항목 | `.breadcrumb__item` | `li` | 예 | 항목 사이 꺾쇠 구분자는 CSS 의사 요소로 그려 보조기술에 읽히지 않는다(A11Y-001). |
| 경로 링크 | `.breadcrumb__link` | `a` | 예 | 첫 링크는 방문 중인 서비스의 메인 화면이다(NAV-029). 현재 화면은 본문 제목(h1)이 보여 주므로 목록에 넣지 않고, 마지막 링크는 현재 화면의 상위 화면이다(RESP-008). |
| 말줄임 항목 | `.breadcrumb__ellipsis` | `li` | 예 | 축약할 때만 보인다(hidden 해제). '…'만 보이는 장식이라 aria-hidden="true". |

## 표준 마크업

```html
<nav class="breadcrumb" aria-label="현재 위치">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item"><a class="breadcrumb__link" href="/">홈</a></li>
    <li class="breadcrumb__ellipsis" aria-hidden="true" hidden>…</li>
    <li class="breadcrumb__item"><a class="breadcrumb__link" href="/welfare">복지 서비스</a></li>
    <li class="breadcrumb__item"><a class="breadcrumb__link" href="/welfare/child">아동·청소년</a></li>
  </ol>
</nav>
<h2>아동수당</h2>
```

## 표준 CSS (토큰만 사용)

```css
.breadcrumb {
  padding-block-start: var(--gap-layout-header-breadcrumb);
  margin-block-end: var(--gap-layout-breadcrumb-h1);
}
.breadcrumb__list {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--space-gap-2);
  min-inline-size: 0;
}
.breadcrumb__item {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: var(--space-gap-2);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
  white-space: nowrap;
}
.breadcrumb__ellipsis {
  align-items: center;
  gap: var(--space-gap-2);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
}
.breadcrumb__list > li + li::before {
  content: "";
  inline-size: var(--space-scale-4);
  block-size: var(--space-scale-4);
  border-block-start: var(--border-width-static-medium) solid var(--color-icon-gray);
  border-inline-end: var(--border-width-static-medium) solid var(--color-icon-gray);
  transform: rotate(45deg);
}
.breadcrumb__link {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--layout-target-min);
  padding-inline: var(--space-padding-2);
  border-radius: var(--radius-medium2);
  color: var(--color-text-basic);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
.breadcrumb__link:hover {
  background-color: var(--color-action-secondary-hover);
}
.breadcrumb__link:active {
  background-color: var(--color-action-secondary-pressed);
}
.breadcrumb__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.breadcrumb--collapsed .breadcrumb__item {
  display: none;
}
.breadcrumb--collapsed .breadcrumb__item:first-child,
.breadcrumb--collapsed .breadcrumb__item:last-child,
.breadcrumb--collapsed .breadcrumb__ellipsis {
  display: inline-flex;
}
.breadcrumb--collapsed .breadcrumb__item:last-child .breadcrumb__link {
  max-inline-size: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## 상태
- **축약(좁은 화면)**: 경로가 한 줄을 넘는 너비에서 루트에 breadcrumb--collapsed, 말줄임 항목의 hidden 제거. 첫 링크(메인 화면)와 마지막 링크(상위 화면)만 보이고 그 사이에 '…'을 둔다(RESP-008).
- **긴 경로(넓은 화면)**: 경로 링크가 5개 이상이면 메인 화면 링크 다음 수준부터 말줄임 항목으로 바꿔 링크를 4개 이하로 보인다(NAV-031).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 경로 링크 사이를 순서대로 이동한다. 숨긴(축약된) 항목의 링크에는 초점이 가지 않는다(A11Y-016). |

## 동작
- 브레드크럼은 main 안 본문 제목(h1) 위 왼쪽에 둔다. 현재 화면을 목록에서 생략하므로 브레드크럼과 h1 사이에 다른 요소를 두지 않는다(LAYOUT-017).
- 첫 항목은 방문 중인 서비스의 메인 화면 링크다(상위 기관 사이트 메인이 아니다)(NAV-029).
- 경로는 한 줄로 표시한다(NAV-030). 스크립트(ResizeObserver)로 목록이 한 줄을 넘는지 재서 넘으면 breadcrumb--collapsed 를 붙여 첫 링크·마지막 링크만 보이고 사이에 말줄임표를 둔다(RESP-008).
- 축약하지 않는 너비에서 경로 링크가 5개 이상이면 메인 화면 링크 다음 수준부터 말줄임표로 줄여 링크를 4개 이하로 보인다(NAV-031). 링크 4개 이하인데도 넘치면 마지막 링크 텍스트를 말줄임한다.
- 축약된 항목은 display none 으로 숨겨 화면에 보이지 않는 링크가 초점을 받지 않게 한다(A11Y-016). 말줄임표는 장식이라 aria-hidden 으로 숨긴다(A11Y-001).
- 경로는 ol·li 로 마크업하고 nav 의 aria-label 로 영역을 알린다(A11Y-007, A11Y-025).
- 링크는 밑줄로 표시해 색에만 의존하지 않는다. 링크가 아닌 텍스트에는 밑줄을 쓰지 않는다(COLOR-001, TYPO-008).
- 링크 텍스트는 목적지 화면 이름이다(COPY-002). 포인터 대상 높이는 24 CSS px 이상이다(LAYOUT-002).
- 꺾쇠 구분자는 인접 배경과 3:1 이상 대비를 갖는 아이콘 색 토큰으로 그린다(COLOR-003).
- 메인·랜딩 페이지와 1수준 사이트에는 두지 않고(NAV-027), 절차 진행 표시에는 단계 표시기를 쓰며(NAV-028), 메인 메뉴·사이드 메뉴 대신 쓰지 않는다(NAV-032).
- 건너뛰기 링크의 본문 바로가기 목적지는 브레드크럼 뒤의 본문 제목 영역이다(NAV-019).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-002 | MUST | 링크의 목적을 링크 텍스트만으로, 또는 링크 텍스트와 프로그램으로 판별되는 링크 맥락(같은 문장·문단·목록 항목·표 셀·aria-describedby)으로 알 수 있게 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-017 | SHOULD | 브레드크럼은 본문 제목(h1) 위 왼쪽에 두고, 현재 화면 경로를 생략한 브레드크럼이면 브레드크럼과 본문 제목 사이에 다른 요소를 두지 않는다. |
| NAV-019 | SHOULD | 본문 바로가기 링크의 목적지 영역에 사이드 메뉴, 브레드크럼, 페이지 유틸리티 버튼·링크를 포함하지 않는다. |
| NAV-027 | MAY | 메인 페이지·랜딩 페이지와, 탐색 계층이 1수준인 사이트에는 브레드크럼을 두지 않는다. |
| NAV-028 | SHOULD | 절차의 진행 상황을 보여줄 때는 브레드크럼 대신 단계 표시기(단계 식별자·진행 상황 표시기)를 쓴다. |
| NAV-029 | SHOULD | 브레드크럼의 첫 항목은 사용자가 실제로 방문 중인 웹사이트의 메인 화면으로 가는 링크로 둔다. |
| NAV-030 | SHOULD | 브레드크럼은 한 줄로 표시한다. |
| NAV-031 | SHOULD | 좁은 화면 축약(RESP-008)이 적용되지 않는 너비에서 브레드크럼은 메인 화면 링크를 포함해 링크를 최대 4개까지 표시하고, 경로가 5개 이상이면 메인 화면 링크 다음 수준부터 말줄임표로 축약한다. |
| NAV-032 | SHOULD | 브레드크럼을 메인 메뉴나 사이드 메뉴 대신 쓰지 않는다. |
| RESP-008 | SHOULD | 브레드크럼이 한 줄에 다 들어가지 않는 너비에서는 첫 번째 경로(메인 화면 링크)와 마지막 경로(현재 화면의 상위 화면 링크)만 표시하고 그 사이에 말줄임표를 둔다. |
| TYPO-008 | SHOULD | 텍스트 밑줄은 링크에만 쓰고, 링크가 아닌 텍스트의 강조는 색이나 굵기로 표현한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.breadcrumb` ↔ `krds-breadcrumb-wrap`, `.breadcrumb__list` ↔ `breadcrumb`, `.breadcrumb__item` ↔ `li`, `.breadcrumb__link` ↔ `txt`
- KRDS 키트는 좁은 화면에서 가운데 경로 항목을 sr-only 로 숨겨, 보이지 않는 링크가 Tab 초점을 받는다 — 이 규격은 축약 항목을 display none 으로 숨겨 초점이 가지 않게 한다(A11Y-016).
- KRDS 키트는 nav 에 id="breadcrumb" 를 주고 건너뛰기 링크 목적지로 쓴다 — 이 규격은 본문 바로가기 목적지를 브레드크럼 뒤 본문 제목 영역으로 잡는다(NAV-019).
- KRDS 키트는 홈 링크 아이콘·꺾쇠를 CSS 마스크 아이콘으로 그린다 — 이 규격은 꺾쇠를 테두리 의사 요소로 그리고 홈은 텍스트 링크로 둔다(A11Y-001).
