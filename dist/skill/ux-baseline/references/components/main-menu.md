# 메인 메뉴 (`.main-menu`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

서비스의 최상위(1수준) 메뉴를 헤더의 메뉴 막대로 보이고, 1수준을 누르면 2·3수준 링크가 담긴 드롭다운 패널을 펼칠 때 쓴다. 좁은 화면에서는 같은 마크업을 전체 메뉴 레이어로 보인다.

## 대신 쓸 것
- 현재 정보 구조 수준 안에서의 하위 화면 이동(다단 레이아웃) → 사이드 메뉴(side-navigation)
- 한 페이지 안의 섹션 이동 → 콘텐츠 내 탐색(in-page-navigation) (NAV-039)
- 좁은 화면에서 주요 화면 3~5개를 오가는 하단 고정 탭 → 하단 탭바 (NAV-067)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.main-menu` | `nav` | 예 | 헤더의 header__menu 자리에 둔다. aria-label 은 '메인 메뉴'. 헤더의 '전체 메뉴' 버튼이 aria-controls 로 이 id 를 가리킨다. |
| 레이어 머리(좁은 화면) | `.main-menu__mobile-header` | `div` | 예 | 좁은 화면 레이어에서만 보이는 제목과 닫기 버튼. 넓은 화면에서는 display none. |
| 레이어 제목 | `.main-menu__mobile-title` | `h2` | 예 |  |
| 닫기 버튼 | `.main-menu__close` | `button` | 예 | 보이는 텍스트 '메뉴 닫기'. |
| 1수준 목록 | `.main-menu__list` | `ul` | 예 | 이용 빈도가 높고 중요한 메뉴를 앞(왼쪽)에 둔다(NAV-024). |
| 1수준 항목 | `.main-menu__item` | `li` | 예 |  |
| 1수준 버튼 | `.main-menu__trigger` | `button` | 예 | 하위 메뉴가 있는 1수준. aria-expanded 와 aria-controls(패널 id)를 가진다(WAI-ARIA APG 디스클로저 내비게이션 패턴). |
| 1수준 링크 | `.main-menu__top-link` | `a` |  | 하위 메뉴가 없는 1수준은 바로 링크로 둔다. |
| 드롭다운 패널 | `.main-menu__panel` | `div` | 예 | 1수준 버튼 바로 다음에 둔다(A11Y-008). 닫혀 있으면 hidden 속성. max-height 70vh 이하 + overflow-y auto(NAV-021 — 린트 ux-baseline/menu-panel-max-height 의 기본 대상 클래스). |
| 패널 안쪽 영역 | `.main-menu__panel-inner` | `div` | 예 | 본문 콘텐츠 그리드와 같은 최대 너비·좌우 여백을 써서 하위 목록이 본문 첫 칼럼 왼쪽에서 시작하게 한다(LAYOUT-016). |
| 패널 제목 | `.main-menu__panel-title` | `h2` | 예 | 1수준 메뉴 이름(NAV-023). |
| 2수준 목록 | `.main-menu__group-list` | `ul` | 예 |  |
| 2수준 항목 | `.main-menu__group` | `li` | 예 |  |
| 2수준 제목 | `.main-menu__group-title` | `h3` | 예 |  |
| 3수준 목록 | `.main-menu__sublist` | `ul` | 예 | 메인 메뉴의 목록 중첩은 이 수준(3)까지다(NAV-022). |
| 메뉴 링크 | `.main-menu__link` | `a` | 예 | 현재 화면의 링크에는 aria-current="page". |
| 링크 설명 | `.main-menu__description` | `p` |  | 레이블만으로 화면 내용을 알기 어려운 메뉴에만 링크 아래에 둔다(NAV-025). 링크의 aria-describedby 로 연결한다. |

## 표준 마크업

```html
<nav class="main-menu" id="main-menu" aria-label="메인 메뉴">
  <div class="main-menu__mobile-header">
    <h2 class="main-menu__mobile-title">전체 메뉴</h2>
    <button type="button" class="main-menu__close">메뉴 닫기</button>
  </div>
  <ul class="main-menu__list">
    <li class="main-menu__item">
      <button type="button" class="main-menu__trigger" aria-expanded="true" aria-controls="main-menu-panel-welfare">복지 서비스</button>
      <div class="main-menu__panel" id="main-menu-panel-welfare">
        <div class="main-menu__panel-inner">
          <h2 class="main-menu__panel-title">복지 서비스</h2>
          <ul class="main-menu__group-list">
            <li class="main-menu__group">
              <h3 class="main-menu__group-title">아동·청소년</h3>
              <ul class="main-menu__sublist">
                <li><a class="main-menu__link" href="/welfare/child/allowance" aria-current="page">아동수당</a></li>
                <li><a class="main-menu__link" href="/welfare/child/voucher">첫만남이용권</a></li>
              </ul>
            </li>
            <li class="main-menu__group">
              <h3 class="main-menu__group-title">노인</h3>
              <ul class="main-menu__sublist">
                <li><a class="main-menu__link" href="/welfare/senior/pension">기초연금</a></li>
                <li>
                  <a class="main-menu__link" href="/welfare/senior/jobs" aria-describedby="main-menu-desc-jobs">노인일자리</a>
                  <p class="main-menu__description" id="main-menu-desc-jobs">만 65세 이상이 참여할 수 있는 공공·민간 일자리를 찾고 신청합니다.</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li class="main-menu__item">
      <button type="button" class="main-menu__trigger" aria-expanded="false" aria-controls="main-menu-panel-health">건강·의료</button>
      <div class="main-menu__panel" id="main-menu-panel-health" hidden>
        <div class="main-menu__panel-inner">
          <h2 class="main-menu__panel-title">건강·의료</h2>
          <ul class="main-menu__group-list">
            <li class="main-menu__group">
              <h3 class="main-menu__group-title">건강검진</h3>
              <ul class="main-menu__sublist">
                <li><a class="main-menu__link" href="/health/checkup/target">검진 대상 조회</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li class="main-menu__item"><a class="main-menu__top-link" href="/notice">알림·소식</a></li>
  </ul>
</nav>
```

## 표준 CSS (토큰만 사용)

```css
.main-menu {
  display: none;
  background-color: var(--color-surface-white);
}
.main-menu__mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-gap-3);
  padding-block: var(--space-padding-3);
  padding-inline: var(--layout-screen-margin-small);
  border-block-end: var(--border-width-static-regular) solid var(--color-divider-gray-light);
}
.main-menu__mobile-title {
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-small);
  font-weight: var(--font-weight-bold);
}
.main-menu__close {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-3);
  border: var(--border-width-static-regular) solid var(--color-border-gray);
  border-radius: var(--radius-medium1);
  background-color: var(--color-surface-white);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
}
.main-menu__list {
  display: flex;
  flex-direction: column;
}
.main-menu__trigger,
.main-menu__top-link {
  display: flex;
  align-items: center;
  inline-size: 100%;
  min-block-size: var(--size-height-8);
  padding-inline: var(--layout-screen-margin-small);
  border: 0;
  border-block-end: var(--border-width-static-medium) solid transparent;
  background-color: transparent;
  color: var(--color-text-subtle);
  font-size: var(--font-size-navigation-title-small);
  font-weight: var(--font-weight-bold);
  text-align: start;
}
.main-menu__trigger:hover,
.main-menu__top-link:hover {
  background-color: var(--color-action-secondary-hover);
}
.main-menu__trigger[aria-expanded="true"] {
  border-block-end-color: var(--color-action-secondary-active);
  color: var(--color-text-basic);
}
.main-menu__panel {
  max-height: 70vh;
  overflow-y: auto;
  background-color: var(--color-surface-white);
}
.main-menu__panel-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-5);
  max-inline-size: var(--layout-content-max);
  margin-inline: auto;
  padding-block: var(--space-padding-6);
  padding-inline: var(--layout-screen-margin-small);
}
.main-menu__panel-title {
  color: var(--color-text-bolder);
  font-size: var(--font-size-navigation-title-medium);
  font-weight: var(--font-weight-bold);
}
.main-menu__group-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: var(--space-gap-6);
}
.main-menu__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2);
}
.main-menu__group-title {
  color: var(--color-text-basic);
  font-size: var(--font-size-navigation-depth-medium-bold);
  font-weight: var(--font-weight-bold);
}
.main-menu__sublist {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-1);
}
.main-menu__link {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--size-height-4);
  padding-inline: var(--space-padding-2);
  border-radius: var(--radius-medium2);
  color: var(--color-text-basic);
  font-size: var(--font-size-navigation-depth-medium);
  text-align: start;
}
.main-menu__link:hover {
  background-color: var(--color-action-secondary-hover);
}
.main-menu__link[aria-current="page"] {
  background-color: var(--color-action-secondary-selected);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-bold);
  text-decoration: underline;
}
.main-menu__description {
  padding-inline: var(--space-padding-2);
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.main-menu__close:focus-visible,
.main-menu__trigger:focus-visible,
.main-menu__top-link:focus-visible,
.main-menu__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: calc(var(--space-scale-2) * -1);
}
@media (max-width: 1023px) {
  .main-menu--open {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: block;
    overflow-y: auto;
  }
}
@media (min-width: 1024px) {
  .main-menu {
    position: relative;
    display: block;
  }
  .main-menu__mobile-header {
    display: none;
  }
  .main-menu__list {
    flex-direction: row;
    gap: var(--space-gap-5);
    max-inline-size: var(--layout-content-max);
    margin-inline: auto;
    padding-inline: var(--layout-screen-margin-medium);
  }
  .main-menu__trigger,
  .main-menu__top-link {
    inline-size: auto;
    padding-inline: var(--space-padding-2);
  }
  .main-menu__panel {
    position: absolute;
    inset-block-start: 100%;
    inset-inline: 0;
    z-index: 30;
    max-height: 70vh;
    overflow-y: auto;
    border-block-start: var(--border-width-static-regular) solid var(--color-divider-gray-light);
    box-shadow: var(--shadow-2);
  }
  .main-menu__panel-inner {
    padding-inline: var(--layout-screen-margin-medium);
  }
}
```

## 상태
- **드롭다운 열림**: 1수준 버튼 aria-expanded="true", 해당 패널의 hidden 제거. 다른 1수준 패널은 닫는다(aria-expanded="false", hidden).
- **좁은 화면 레이어 열림(1024px 미만)**: 루트에 main-menu--open, 헤더 '전체 메뉴' 버튼 aria-expanded="true". 레이어 밖 콘텐츠(main·footer 등)에 inert. 닫으면 클래스·inert 를 되돌린다(RESP-005, A11Y-029).
- **현재 화면**: 현재 화면 링크에 aria-current="page". 배경·굵기·밑줄로 표시해 색에만 의존하지 않는다(COLOR-001).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 1수준 버튼·링크 사이를 이동한다. 펼친 패널이 있으면 그 1수준 버튼 다음에 패널 안 링크로 이동한다. 닫힌 패널 안으로는 초점이 가지 않는다(A11Y-015). |
| Enter / Space | 1수준 버튼에서 패널을 펼치고, 다시 누르면 접는다(NAV-026). |
| Esc | 패널 안 어디에서든 모든 패널을 접고 초점을 그 1수준 버튼으로 옮긴다(NAV-026, A11Y-010). 좁은 화면 레이어에서는 레이어를 닫고 초점을 헤더의 '전체 메뉴' 버튼으로 옮긴다(A11Y-015). |

## 동작
- 1수준 버튼은 Click·Enter·Space 로 패널을 펼치고 다시 누르면 접는다. 펼친 상태에서 헤더(패널 포함) 밖을 클릭하면 접는다. Esc 로 접으면 초점을 그 1수준 버튼으로 옮긴다(NAV-026, A11Y-011).
- 펼침 상태는 aria-expanded 로 알리고, 접힌 패널은 hidden 속성으로 숨겨 초점이 들어가지 않게 한다(A11Y-025, A11Y-015).
- 패널은 호버·초점만으로 열지 않는다. 호버로 여는 변형을 만들면 Esc 로 닫히고, 포인터를 패널로 옮겨도 유지되며, 시간 제한으로 닫히지 않게 한다(A11Y-010).
- 패널 높이는 뷰포트 높이의 70% 이하이고 넘치면 패널 자체가 스크롤된다(NAV-021).
- 패널 안 하위 목록은 열린 1수준 위치와 관계없이 본문 그리드 첫 칼럼 왼쪽에서 왼쪽 정렬로 시작한다(LAYOUT-016).
- 패널마다 1수준 이름을 제목으로 둔다(NAV-023). 제목·레이블은 영역 주제를 밝히는 말로 쓴다(COPY-003). 목록은 ul·li, 제목은 h2·h3 로 마크업한다(A11Y-007).
- 메뉴는 3수준까지만 구성한다(NAV-022). 레이블만으로 내용을 알기 어려운 링크에만 설명을 붙인다(NAV-025).
- 1수준 항목은 이용 빈도가 높고 중요한 것을 왼쪽에 두고, 모든 페이지에서 같은 순서다(NAV-024, NAV-004).
- 헤더 너비가 1수준 항목 전체를 한 줄에 담으면 메뉴 막대에 모두 펼쳐 보인다(RESP-007). 담지 못하면 메뉴 막대를 숨기고 헤더의 '전체 메뉴' 버튼으로 이 마크업을 전체 화면 레이어(main-menu--open)로 연다(RESP-005). 예시 CSS 의 전환 너비 1024px 는 1수준 항목 수에 맞게 RESP-004 브레이크포인트 중에서 고른다.
- 좁은 화면 레이어가 열리면 초점을 닫기 버튼으로 옮기고, 레이어 밖 콘텐츠에 inert 를 주어 초점과 가상 커서가 레이어 안에서만 움직이게 한다. 닫기 버튼·Esc 로 닫으면 초점을 '전체 메뉴' 버튼으로 돌려보낸다(A11Y-029, A11Y-015).
- 현재 화면 링크는 aria-current="page" 와 함께 배경·굵기·밑줄로 표시해 색에만 의존하지 않는다(COLOR-001).
- 좁은 화면 레이어는 하단 탭바와 함께 쓰지 않고, 넓은 화면에서는 하단 탭바 대신 메뉴 막대를 쓴다(NAV-067).
- 사이드 메뉴 없이 메인 메뉴만으로 모든 화면에 도달할 수 있는 2수준 이하 서비스는 사이드 메뉴를 두지 않는다(NAV-036).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-010 | MUST | 호버나 키보드 초점으로 나타나는 추가 콘텐츠는 초점·포인터를 옮기지 않고 닫을 수 있고(Esc 등), 그 위로 포인터를 옮겨도 사라지지 않으며, 호버·초점이 없어지거나 사용자가 닫거나 정보가 무효가 될 때까지 유지한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-029 | SHOULD | 모달이 열려 있는 동안 키보드 초점과 스크린 리더 가상 초점이 모달 안에서만 이동하게 하고, 마지막 상호작용 요소에서 Tab을 누르면 첫 요소로, 첫 요소에서 Shift+Tab을 누르면 마지막 요소로 초점을 옮긴다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| LAYOUT-016 | SHOULD | 메인 메뉴 드롭다운 영역의 하위 링크 목록은 본문 그리드의 가장 왼쪽 칼럼부터 왼쪽 정렬로 배치한다. |
| NAV-004 | MUST | 여러 페이지에 반복되는 내비게이션은 사용자가 바꾸지 않는 한 매번 같은 상대 순서로 둔다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| NAV-021 | SHOULD | 메인 메뉴 드롭다운 영역의 높이는 뷰포트 높이의 70% 이하로 하고, 넘치면 브라우저 기본 스크롤이 아니라 드롭다운 영역 자체의 스크롤로 탐색하게 한다. |
| NAV-022 | SHOULD | 메인 메뉴는 최대 3수준까지만 구성한다. |
| NAV-023 | SHOULD | 메인 메뉴 드롭다운 영역에 제목을 둔다. |
| NAV-024 | SHOULD | 메인 메뉴 링크는 이용 빈도가 높고 중요한 콘텐츠로 연결된 것일수록 왼쪽에 배치한다. |
| NAV-025 | MAY | 메뉴 레이블이 어려운 용어나 사용자에게 익숙하지 않은 단어이거나 레이블만으로 화면 내용을 파악하기 어려우면, 링크마다 설명이 붙은 드롭다운을 쓴다. |
| NAV-026 | SHOULD | 1수준 메뉴는 Click 또는 Enter로 하위 메뉴를 펼치고, 다시 Click·Enter하거나 헤더 밖을 클릭하거나 Esc를 누르면 접으며, Esc로 접으면 초점을 그 1수준 메뉴로 옮긴다. |
| NAV-036 | MAY | 화면이 5개 미만인 서비스와, 탐색 계층이 2수준 이내이며 메인 메뉴만으로 모든 화면에 도달할 수 있는 서비스에는 사이드 메뉴를 쓰지 않는다. |
| NAV-039 | SHOULD | 무한 스크롤 페이지, 필터 목록 표시, 서비스 정보 구조(메뉴) 탐색에는 콘텐츠 내 탐색을 쓰지 않고, 정보 구조 탐색에는 사이드 메뉴 같은 서브 메뉴를 쓴다. |
| NAV-067 | MAY | 하단 탭바는 좁은 화면(RESP-004의 모바일·태블릿 구간)에서만 쓰고, 그보다 넓은 화면에서는 메인 메뉴를 쓴다. |
| RESP-004 | MAY | 브레이크포인트를 3~6단계로 정의하고, KRDS 표준형 스타일을 쓰는 공공 서비스는 small 360px·medium 768px·large 1024px·xlarge 1280px 4단계를 쓴다. |
| RESP-005 | MAY | 헤더 너비가 메인 메뉴 1수준 항목 전체를 한 줄에 담지 못하면 메인 메뉴 막대를 숨기고 햄버거 메뉴 버튼과 메뉴 레이어로 메인 메뉴를 제공할 수 있다. |
| RESP-007 | SHOULD | 헤더 너비가 메인 메뉴 1수준 항목 전체를 한 줄에 담을 수 있으면 1수준 항목 전체를 메뉴 막대에 펼쳐 보이게 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.main-menu` ↔ `krds-main-menu / krds-main-menu-mobile`, `.main-menu__list` ↔ `gnb-menu`, `.main-menu__trigger` ↔ `gnb-main-trigger`, `.main-menu__panel` ↔ `gnb-toggle-wrap`, `.main-menu__panel-title` ↔ `gnb-sub-content sub-title`, `.main-menu__group-title` ↔ `gnb-sub-trigger`, `.main-menu__sublist` ↔ `gnb-sub-list ul`
- KRDS 키트의 1수준 버튼에는 aria-expanded·aria-controls 가 없다 — 이 규격은 디스클로저 패턴으로 펼침 상태와 대상을 알린다(A11Y-025, NAV-026).
- KRDS 키트(PC)는 2수준을 버튼으로 두고 선택한 2수준의 3수준 목록만 옆에 보인다 — 이 규격은 2수준을 제목(h3)으로, 그 3수준 링크를 모두 펼쳐 보여 조작 단계를 줄인다(A11Y-007, NAV-022).
- KRDS 키트는 3수준 항목에 링크와 button 을 섞어 쓴다 — 이 규격은 화면 이동 항목을 모두 a 링크로 쓴다(A11Y-025).
- KRDS 키트는 새 창 링크를 title 속성('새 창 열림')만으로 알린다 — 새 창 링크를 쓰면 링크 안 텍스트로 알린다(NAV-012).
- KRDS 키트(모바일)는 1수준을 같은 레이어 안 앵커 링크로 두고 스크롤로 2수준 목록을 보인다 — 이 규격은 넓은 화면과 같은 디스클로저 마크업을 레이어로 보인다(NAV-004, A11Y-025).
- KRDS 키트(모바일) 레이어에는 대화상자 역할·초점 가두기 설명이 없다 — 이 규격은 레이어 밖에 inert 를 주고 닫으면 초점을 '전체 메뉴' 버튼으로 돌려보낸다(A11Y-029, A11Y-015).
