# 사이드 메뉴 (`.side-navigation`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

다단 레이아웃에서 현재 1수준 메뉴에 속한 하위 화면(최대 2수준)을 본문 왼쪽 목록으로 보이고 이동하게 할 때 쓴다.

## 대신 쓸 것
- 화면이 5개 미만이거나, 탐색 계층이 2수준 이내이고 메인 메뉴만으로 모든 화면에 도달할 수 있는 서비스 → 메인 메뉴(main-menu)만 쓴다 (NAV-036)
- 한 페이지 안의 섹션 이동 → 콘텐츠 내 탐색(in-page-navigation) (NAV-039)
- 사이드 메뉴와 본문을 나란히 놓을 수 없는 1단 레이아웃 → 햄버거 메뉴로 축소된 메인 메뉴(main-menu) (RESP-009)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.side-navigation` | `nav` | 예 | aria-labelledby 로 제목을 가리킨다. 본문 왼쪽 열에 두고, DOM 에서는 본문 바로가기 목적지보다 앞에 둔다(NAV-019). |
| 제목 | `.side-navigation__title` | `h2` | 예 | 현재 1수준 메뉴 이름. |
| 1수준 목록 | `.side-navigation__list` | `ul` | 예 |  |
| 항목 | `.side-navigation__item` | `li` | 예 |  |
| 하위 목록 버튼 | `.side-navigation__toggle` | `button` | 예 | 하위 목록이 있는 항목. aria-expanded 와 aria-controls(하위 목록 id)를 가진다(WAI-ARIA APG 디스클로저 패턴). 꺾쇠 아이콘은 CSS 의사 요소로 그리고 펼침 상태에 따라 회전한다. |
| 하위 목록 | `.side-navigation__sublist` | `ul` | 예 | 버튼 바로 다음에 둔다. 접혀 있으면 hidden 속성. 사이드 메뉴의 목록 중첩은 이 수준(2)까지다(NAV-034). |
| 메뉴 링크 | `.side-navigation__link` | `a` | 예 | 현재 화면 링크 1개에만 aria-current="page" 를 붙이고 왼쪽 식별자 막대·굵기로 표시한다(NAV-033). |

## 표준 마크업

```html
<nav class="side-navigation" aria-labelledby="side-navigation-title">
  <h2 class="side-navigation__title" id="side-navigation-title">복지 서비스</h2>
  <ul class="side-navigation__list">
    <li class="side-navigation__item">
      <button type="button" class="side-navigation__toggle" aria-expanded="true" aria-controls="side-navigation-child">아동·청소년</button>
      <ul class="side-navigation__sublist" id="side-navigation-child">
        <li><a class="side-navigation__link" href="/welfare/child/allowance" aria-current="page">아동수당</a></li>
        <li><a class="side-navigation__link" href="/welfare/child/voucher">첫만남이용권</a></li>
      </ul>
    </li>
    <li class="side-navigation__item">
      <button type="button" class="side-navigation__toggle" aria-expanded="false" aria-controls="side-navigation-senior">노인</button>
      <ul class="side-navigation__sublist" id="side-navigation-senior" hidden>
        <li><a class="side-navigation__link" href="/welfare/senior/pension">기초연금</a></li>
        <li><a class="side-navigation__link" href="/welfare/senior/jobs">노인일자리</a></li>
      </ul>
    </li>
    <li class="side-navigation__item"><a class="side-navigation__link side-navigation__link--top" href="/welfare/disability">장애인</a></li>
  </ul>
</nav>
```

## 표준 CSS (토큰만 사용)

```css
.side-navigation {
  display: none;
}
.side-navigation__title {
  padding-block-end: var(--space-padding-5);
  border-block-end: var(--border-width-static-medium) solid var(--color-divider-gray);
  color: var(--color-text-bolder);
  font-size: var(--font-size-navigation-title-medium);
  font-weight: var(--font-weight-bold);
  word-break: keep-all;
}
.side-navigation__item {
  border-block-end: var(--border-width-static-regular) solid var(--color-divider-gray-light);
}
.side-navigation__toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-gap-3);
  inline-size: 100%;
  min-block-size: var(--size-height-8);
  padding-inline: var(--space-padding-3);
  border: 0;
  background-color: var(--color-action-secondary);
  color: var(--color-text-basic);
  font-size: var(--font-size-navigation-depth-medium-bold);
  font-weight: var(--font-weight-bold);
  text-align: start;
}
.side-navigation__toggle::after {
  content: "";
  flex: none;
  inline-size: var(--space-scale-5);
  block-size: var(--space-scale-5);
  border-block-end: var(--border-width-static-medium) solid var(--color-icon-gray);
  border-inline-end: var(--border-width-static-medium) solid var(--color-icon-gray);
  transform: rotate(45deg);
}
.side-navigation__toggle[aria-expanded="true"]::after {
  transform: rotate(-135deg);
}
.side-navigation__toggle:hover,
.side-navigation__link:hover {
  background-color: var(--color-action-secondary-hover);
}
.side-navigation__toggle:active,
.side-navigation__link:active {
  background-color: var(--color-action-secondary-pressed);
}
.side-navigation__sublist {
  padding-block: var(--space-padding-2);
}
.side-navigation__link {
  display: flex;
  align-items: center;
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-6);
  border-inline-start: var(--border-width-static-medium) solid transparent;
  border-radius: var(--radius-medium2);
  color: var(--color-text-basic);
  font-size: var(--font-size-navigation-depth-medium);
}
.side-navigation__link--top {
  min-block-size: var(--size-height-8);
  padding-inline: var(--space-padding-3);
  border-radius: 0;
  font-size: var(--font-size-navigation-depth-medium-bold);
  font-weight: var(--font-weight-bold);
}
.side-navigation__link[aria-current="page"] {
  border-inline-start-color: var(--color-action-secondary-active);
  background-color: var(--color-action-secondary-selected);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-bold);
}
.side-navigation__toggle:focus-visible,
.side-navigation__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: calc(var(--space-scale-2) * -1);
}
@media (min-width: 1024px) {
  .side-navigation {
    display: block;
  }
}
```

## 상태
- **하위 목록 펼침**: 버튼 aria-expanded="true", 하위 목록의 hidden 제거. 이미 펼친 다른 하위 목록은 그대로 둔다(NAV-037). 꺾쇠가 위를 향한다.
- **현재 화면**: 현재 화면 링크에 aria-current="page". 페이지를 불러올 때 그 링크가 든 하위 목록을 펼친 상태(aria-expanded="true")로 둔다(NAV-033, NAV-035).
- **1단 레이아웃(1024px 미만)**: 마크업 변화 없음. 사이드 메뉴를 display none 으로 숨기고 같은 링크를 햄버거 메뉴로 축소된 메인 메뉴에서 제공한다(RESP-009).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 버튼·링크를 화면 순서대로 이동한다. 접힌 하위 목록 안으로는 초점이 가지 않는다(A11Y-015). |
| Enter / Space | 하위 목록 버튼에서 목록을 펼치거나 접는다(NAV-037). |

## 동작
- 하위 목록 버튼은 Click·Enter·Space 로 하위 목록을 펼치거나 접고, 상태를 aria-expanded 로 알린다. 한 목록을 펼쳐도 다른 펼친 목록은 접지 않는다(NAV-037, A11Y-011, A11Y-025).
- 접힌 하위 목록은 hidden 속성으로 숨겨 초점이 들어가지 않게 한다(A11Y-015).
- 현재 화면 링크 정확히 1개에 aria-current="page" 를 붙이고, 식별자 막대·굵기·배경으로 표시해 색에만 의존하지 않는다(NAV-033, COLOR-001).
- 페이지를 불러올 때 현재 화면이 속한 하위 목록을 펼친 상태로 보인다(NAV-035).
- 사이드 메뉴는 2수준까지만 쓴다. 더 깊은 화면은 본문 안 하위 탐색으로 제공한다(NAV-034).
- 항목 순서는 모든 페이지에서 같다(NAV-004). 시각적 목록·제목은 ul·li·h2 로 마크업한다(A11Y-007).
- 버튼·링크의 포인터 대상 높이는 24 CSS px 이상이다(LAYOUT-002).
- 사이드 메뉴와 본문을 나란히 놓을 수 없는 1단 구간에서는 숨기고 하위 탐색을 햄버거 메뉴로 축소된 메인 메뉴에서 제공한다. 예시 CSS 의 전환 너비 1024px 는 레이아웃의 다단→1단 전환 브레이크포인트로 바꾼다(RESP-009).
- 화면이 5개 미만이거나 메인 메뉴만으로 모든 화면에 도달하는 2수준 이하 서비스에는 두지 않는다(NAV-036).
- 본문 바로가기 목적지에는 사이드 메뉴가 포함되지 않게 한다(NAV-019).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| NAV-004 | MUST | 여러 페이지에 반복되는 내비게이션은 사용자가 바꾸지 않는 한 매번 같은 상대 순서로 둔다. |
| NAV-019 | SHOULD | 본문 바로가기 링크의 목적지 영역에 사이드 메뉴, 브레드크럼, 페이지 유틸리티 버튼·링크를 포함하지 않는다. |
| NAV-033 | SHOULD | 사이드 메뉴에서 현재 화면에 해당하는 링크를 식별자로 강조 표시하고 그 링크에 aria-current="page"를 붙인다. |
| NAV-034 | SHOULD | 사이드 메뉴 계층은 최대 2수준까지만 쓰고, 더 깊은 탐색은 하위 메뉴를 점진적으로 공개하는 헤더 있는 목록이나 본문의 보조 탐색 수단으로 제공한다. |
| NAV-035 | MAY | 확장형 사이드 메뉴는 페이지를 불러올 때 현재 화면이 속한 하위 목록을 펼친 상태로 보여준다. |
| NAV-036 | MAY | 화면이 5개 미만인 서비스와, 탐색 계층이 2수준 이내이며 메인 메뉴만으로 모든 화면에 도달할 수 있는 서비스에는 사이드 메뉴를 쓰지 않는다. |
| NAV-037 | SHOULD | 꺾쇠 아이콘이 있는 사이드 메뉴 링크는 Click·Enter로 하위 목록을 펼치거나 접고, 한 하위 목록을 펼쳐도 이미 펼쳐진 다른 하위 목록은 펼친 상태로 둔다. |
| NAV-039 | SHOULD | 무한 스크롤 페이지, 필터 목록 표시, 서비스 정보 구조(메뉴) 탐색에는 콘텐츠 내 탐색을 쓰지 않고, 정보 구조 탐색에는 사이드 메뉴 같은 서브 메뉴를 쓴다. |
| RESP-009 | SHOULD | 레이아웃이 사이드 메뉴와 본문을 나란히 놓을 수 없는 1단 구간이 되면 사이드 메뉴를 표시하지 않고, 그 하위 탐색은 햄버거 메뉴로 축소된 메인 메뉴에서 제공한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.side-navigation` ↔ `krds-side-navigation`, `.side-navigation__title` ↔ `lnb-tit`, `.side-navigation__list` ↔ `lnb-list`, `.side-navigation__item` ↔ `lnb-item`, `.side-navigation__toggle` ↔ `lnb-btn lnb-toggle`, `.side-navigation__sublist` ↔ `lnb-submenu ul`, `.side-navigation__link` ↔ `lnb-btn lnb-link`
- KRDS 키트는 role="menubar"·"menu"·"menuitem" 을 쓰지만 방향키 탐색을 구현하지 않는다 — 이 규격은 사이트 내비게이션에 맞는 디스클로저 패턴(button + aria-expanded, 링크는 a)을 쓴다(A11Y-025, A11Y-011).
- KRDS 키트는 3·4수준 팝업 하위 메뉴(lnb-submenu-lv2)를 둔다 — 이 규격은 2수준까지만 쓴다(NAV-034).
- KRDS 키트는 펼침·현재 위치를 active 클래스로 따로 표시한다 — 이 규격은 aria-expanded·aria-current 값을 기준으로 스타일을 바꿔 보조기술에 전달되는 상태와 화면 표시가 어긋나지 않게 한다(A11Y-025).
