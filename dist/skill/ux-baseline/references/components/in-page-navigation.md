# 콘텐츠 내 탐색 (`.in-page-navigation`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

계층 구조가 있는 긴 본문(h2 섹션 3개 이상 또는 뷰포트 높이 3배 초과)에서 같은 페이지 안 섹션으로 바로 이동하는 목차를 둘 때 쓴다.

## 대신 쓸 것
- 서비스 정보 구조(다른 페이지) 탐색 → 사이드 메뉴(side-navigation) (NAV-039)
- 무한 스크롤 페이지, 필터 목록 → 콘텐츠 내 탐색을 쓰지 않는다 (NAV-039)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.in-page-navigation` | `nav` | 예 | aria-labelledby 로 제목을 가리킨다. DOM 에서는 본문 제목(h1) 다음, 본문 첫 섹션 앞에 둔다(NAV-014, A11Y-008). |
| 제목 | `.in-page-navigation__title` | `h2` | 예 | 문구는 '이 페이지의 구성'. h1 을 쓰지 않는다(A11Y-028). 서비스 전체에서 같은 문구를 쓴다(COPY-004). |
| 목차 목록 | `.in-page-navigation__list` | `ul` | 예 | 중첩은 3단계 이하(NAV-040). |
| 하위 목차 목록 | `.in-page-navigation__sublist` | `ul` |  | 섹션 안 하위 제목(h3)으로 가는 목록. |
| 목차 링크 | `.in-page-navigation__link` | `a` | 예 | href 는 같은 페이지 안 섹션 id(#…)뿐이다(NAV-039). 화면에 보이는 현재 섹션 링크에 aria-current="true". |

## 표준 마크업

```html
<nav class="in-page-navigation" aria-labelledby="in-page-navigation-title">
  <h2 class="in-page-navigation__title" id="in-page-navigation-title">이 페이지의 구성</h2>
  <ul class="in-page-navigation__list">
    <li><a class="in-page-navigation__link" href="#section-overview" aria-current="true">서비스 개요</a></li>
    <li>
      <a class="in-page-navigation__link" href="#section-detail">서비스 상세</a>
      <ul class="in-page-navigation__sublist">
        <li><a class="in-page-navigation__link" href="#section-detail-target">지원 대상</a></li>
        <li><a class="in-page-navigation__link" href="#section-detail-amount">지원 금액</a></li>
      </ul>
    </li>
    <li><a class="in-page-navigation__link" href="#section-apply">신청 방법 및 절차</a></li>
    <li><a class="in-page-navigation__link" href="#section-documents">제출 서류</a></li>
  </ul>
</nav>
```

## 표준 CSS (토큰만 사용)

```css
.in-page-navigation {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-5);
}
.in-page-navigation__title {
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-xsmall);
  font-weight: var(--font-weight-bold);
}
.in-page-navigation__list,
.in-page-navigation__sublist {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2);
}
.in-page-navigation__sublist {
  margin-block-start: var(--space-gap-2);
  padding-inline-start: var(--space-padding-5);
}
.in-page-navigation__link {
  display: block;
  min-block-size: var(--layout-target-min);
  padding-block: var(--space-padding-2);
  padding-inline: var(--space-padding-3);
  border-inline-start: var(--border-width-static-medium) solid transparent;
  border-radius: var(--radius-small3);
  background-color: var(--color-action-secondary);
  color: var(--color-text-subtle);
  font-size: var(--font-size-navigation-depth-small);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.in-page-navigation__link:hover {
  background-color: var(--color-action-secondary-hover);
}
.in-page-navigation__link:active {
  background-color: var(--color-action-secondary-pressed);
}
.in-page-navigation__link[aria-current="true"] {
  border-inline-start-color: var(--color-action-secondary-active);
  background-color: var(--color-action-secondary-selected);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-bold);
}
.in-page-navigation__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: calc(var(--space-scale-2) * -1);
}
@media (min-width: 1024px) {
  .in-page-navigation {
    position: sticky;
    inset-block-start: var(--space-scale-10);
    inline-size: var(--layout-in-page-navigation-width);
  }
}
```

## 상태
- **현재 섹션**: 화면에 보이는 섹션의 링크에 aria-current="true", 이전 링크에서는 제거. 식별자 막대·굵기로도 표시한다(COLOR-001).
- **1단 레이아웃(1024px 미만)**: 마크업 변화 없음. 고정(sticky)하지 않고 DOM 위치 그대로 본문 제목과 본문 사이에 보인다(NAV-014).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 목차 링크를 위에서 아래로 이동한다(A11Y-015). |
| Enter | 해당 섹션으로 이동한다. 다음 Tab 은 그 섹션 안의 첫 초점 요소로 간다(A11Y-015). |

## 동작
- 목차 링크는 같은 페이지 섹션 앵커(href="#id")만 가리킨다. 다른 페이지 탐색·필터·무한 스크롤 목록에는 쓰지 않는다(NAV-039).
- 다단 레이아웃 구간에서는 본문 오른쪽 열에 sticky 로 고정하고, 1단 구간에서는 고정하지 않고 본문 제목과 본문 첫 섹션 사이에 둔다. DOM 순서는 두 구간 모두 h1 → 목차 → 본문이다(NAV-014, A11Y-008). 예시 CSS 의 전환 너비 1024px 는 레이아웃의 다단→1단 전환 브레이크포인트로 바꾼다.
- 목차 너비는 모든 페이지에서 같은 고정값으로 두고, 기본 글자 크기에서 가장 긴 항목이 한 줄에 들어가는 값으로 정한다. 사용자가 텍스트를 확대하면 항목을 자르지 않고 줄바꿈한다(LAYOUT-018).
- 스크롤 위치에 따라 현재 섹션 링크에 aria-current="true" 를 옮긴다. 링크를 실행하면 브라우저 기본 앵커 이동으로 순차 탐색 시작점을 그 섹션으로 옮기고, 스크롤을 스크립트로 처리하면 섹션 제목에 tabindex="-1" 을 주고 focus() 한다(A11Y-015, A11Y-011).
- 목차 제목과 링크에 h1 을 쓰지 않는다(A11Y-028). 제목 문구 '이 페이지의 구성'은 모든 페이지에서 같다(COPY-004).
- 목차 중첩은 3단계 이하다(NAV-040). h2 섹션이 3개 이상이거나 본문이 뷰포트 높이의 3배를 넘는 계층 구조 본문에 둔다(NAV-038).
- 링크의 포인터 대상 높이는 24 CSS px 이상이다(LAYOUT-002).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-028 | SHOULD | 콘텐츠 내 탐색(페이지 안 링크 목록)의 제목과 링크에 h1 요소를 쓰지 않는다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-018 | SHOULD | 콘텐츠 내 탐색(목차)의 너비를 페이지마다 같은 고정값으로 정하고, 기본 글자 크기에서 개요 목록 항목 텍스트가 줄바꿈되지 않는 값으로 하되, 사용자가 텍스트를 확대했을 때는 항목 텍스트가 잘리지 않고 줄바꿈되게 한다. |
| NAV-014 | MAY | 콘텐츠 내 탐색(목차)은 본문 옆에 목차 열을 둘 수 있는 다단 레이아웃 구간에서는 본문 오른쪽 같은 위치에 고정하고, 목차 열을 둘 수 없는 1단 레이아웃 구간에서는 고정하지 않고 제목과 본문 사이에 둔다. |
| NAV-038 | MAY | 계층 구조가 있는 본문이 섹션 3개 이상이거나 높이가 뷰포트 높이의 3배를 넘으면 콘텐츠 내 탐색(목차)을 둔다. |
| NAV-039 | SHOULD | 무한 스크롤 페이지, 필터 목록 표시, 서비스 정보 구조(메뉴) 탐색에는 콘텐츠 내 탐색을 쓰지 않고, 정보 구조 탐색에는 사이드 메뉴 같은 서브 메뉴를 쓴다. |
| NAV-040 | SHOULD | 콘텐츠 내 탐색 목록의 중첩 수준은 3단계 이하로 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.in-page-navigation` ↔ `krds-in-page-navigation-area`, `.in-page-navigation__title` ↔ `in-page-navigation-header quick-caption`, `.in-page-navigation__list` ↔ `in-page-navigation-list ul`, `.in-page-navigation__link` ↔ `in-page-navigation-list a`
- KRDS 키트는 목차 제목('이 페이지의 구성')과 페이지 이름을 p 로 쓴다 — 이 규격은 제목을 h2 로 마크업한다(A11Y-007).
- KRDS 키트는 현재 섹션을 active 클래스로만 표시한다 — 이 규격은 aria-current="true" 로 보조기술에도 알린다(A11Y-025).
- KRDS 키트는 목차를 position fixed 로 화면 오른쪽에 띄우고 nav 를 목록에만 감싼다 — 이 규격은 레이아웃 열 안에서 sticky 로 두고 제목까지 nav 안에 넣는다(NAV-014).
