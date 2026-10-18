# 탭바 (`.tab-bar`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

뷰포트 1024px 미만 화면에서 서비스의 상위 수준 화면 5개 이하로 바로 이동하게 하는 하단 고정 내비게이션이다.

## 대신 쓸 것
- 뷰포트 너비 1024px 이상 → 메인 메뉴 (NAV-067)
- 한 화면 안의 콘텐츠 패널을 전환하는 경우(페이지 이동 없음) → 탭(role=tablist)
- 이동할 상위 화면이 6개 이상 → 탭바 4개 + 전체 메뉴 버튼, 또는 메인 메뉴 (NAV-069)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 컨테이너 | `.tab-bar` | `nav` | 예 | nav 와 aria-label 로 내비게이션 영역임을 알린다(A11Y-007). 화면 하단에 고정한다(NAV-071). |
| 메뉴 목록 | `.tab-bar__list` | `ul` | 예 | 항목은 5개 이하(NAV-069). 홈은 첫 항목, 전체 메뉴는 마지막 항목으로 모든 화면에서 같은 순서를 쓴다(NAV-004). |
| 메뉴 항목 | `.tab-bar__item` | `li` | 예 |  |
| 탭 메뉴(링크·버튼) | `.tab-bar__link` | `a 또는 button` | 예 | 화면 이동은 a[href], 전체 메뉴 열기는 button(NAV-047). 모든 탭 메뉴는 같은 너비·높이(NAV-068). 현재 화면 링크에 aria-current="page". |
| 아이콘 | `.tab-bar__icon` | `svg` | 예 | 옆 레이블과 같은 뜻이라 aria-hidden="true"(A11Y-001). 선택 안 됨은 선 형식, 선택됨은 채운 형식(KRDS). |
| 레이블 | `.tab-bar__label` | `span` | 예 | 화면에 보이는 1~2어절(NAV-070, COPY-052). 말줄임표로 자르지 않는다. |
| 인디케이터 | `.tab-bar__link` | `::before` |  | 선택된 탭 위쪽 막대. 색 외의 단서(막대·채운 아이콘·굵은 레이블)로 선택 상태를 구분한다(COLOR-001). |

## 표준 마크업

```html
<nav class="tab-bar" aria-label="주요 메뉴">
  <ul class="tab-bar__list">
    <li class="tab-bar__item">
      <a class="tab-bar__link" href="/" aria-current="page">
        <svg class="tab-bar__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z"/></svg>
        <span class="tab-bar__label">홈</span>
      </a>
    </li>
    <li class="tab-bar__item">
      <a class="tab-bar__link" href="/search">
        <svg class="tab-bar__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zM15.5 15.5 20 20"/></svg>
        <span class="tab-bar__label">검색</span>
      </a>
    </li>
    <li class="tab-bar__item">
      <a class="tab-bar__link" href="/applications">
        <svg class="tab-bar__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6zM9 10h6M9 14h6M9 18h4"/></svg>
        <span class="tab-bar__label">신청 내역</span>
      </a>
    </li>
    <li class="tab-bar__item">
      <a class="tab-bar__link" href="/notifications">
        <svg class="tab-bar__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15zM10 21h4"/></svg>
        <span class="tab-bar__label">알림</span>
      </a>
    </li>
    <li class="tab-bar__item">
      <button class="tab-bar__link" type="button" aria-expanded="false">
        <svg class="tab-bar__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        <span class="tab-bar__label">전체 메뉴</span>
      </button>
    </li>
  </ul>
</nav>
```

## 표준 CSS (토큰만 사용)

```css
.tab-bar {
  position: fixed;
  inset-inline: 0;
  inset-block-end: 0;
  z-index: 10;
  border-block-start: var(--border-width-static-regular) solid var(--color-divider-gray);
  background-color: var(--color-surface-white);
}
.tab-bar__list {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  margin: 0;
  padding: 0;
  list-style: none;
}
.tab-bar__item {
  display: flex;
}
.tab-bar__link {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-gap-1);
  min-block-size: var(--size-height-9);
  padding-block: var(--space-padding-2);
  padding-inline: var(--space-padding-1);
  border: 0;
  background-color: transparent;
  color: var(--color-text-subtle);
  font-family: inherit;
  font-size: var(--font-size-label-xsmall);
  font-weight: var(--font-weight-regular);
  line-height: var(--font-line-height-base);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}
.tab-bar__link:hover {
  background-color: var(--color-button-text-fill-hover);
}
.tab-bar__link:active {
  background-color: var(--color-button-text-fill-pressed);
}
.tab-bar__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: calc(var(--space-scale-2) * -1);
}
.tab-bar__link[aria-current="page"] {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}
.tab-bar__link[aria-current="page"]::before {
  position: absolute;
  inset-block-start: 0;
  inset-inline: var(--space-scale-7);
  block-size: var(--space-scale-3);
  border-radius: var(--radius-small1);
  background-color: var(--color-element-primary);
  content: "";
}
.tab-bar__icon {
  inline-size: var(--space-scale-10);
  block-size: var(--space-scale-10);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.tab-bar__link[aria-current="page"] .tab-bar__icon {
  fill: currentColor;
}
.tab-bar__label {
  word-break: keep-all;
  overflow-wrap: anywhere;
}
@media (max-width: 1023px) {
  html:has(.tab-bar) {
    scroll-padding-block-end: var(--space-scale-18);
  }
  body:has(.tab-bar) {
    padding-block-end: var(--space-scale-18);
  }
}
@media (min-width: 1024px) {
  .tab-bar {
    display: none;
  }
}
```

## 상태
- **현재 화면(선택)**: 현재 화면 링크에 aria-current="page". 위쪽 인디케이터 막대·채운 아이콘·굵은 레이블로 색 외 단서를 함께 준다(COLOR-001, A11Y-025).
- **전체 메뉴 열림**: 전체 메뉴 버튼의 aria-expanded="true", 열린 패널의 id 를 aria-controls 로 연결한다.
- **하위 수준 화면**: 정보 구조상 하위 화면(상세·작성 화면 등)에서는 탭바를 렌더링하지 않을 수 있다 — NAV-071 의 예외. 대신 상단바 뒤로가기 버튼을 쓴다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 탭 메뉴 사이를 DOM 순서대로 옮긴다. 초점 표시가 보인다(A11Y-011, A11Y-016). 방향키 이동(탭 패턴)은 쓰지 않는다 — 내비게이션 링크 목록이다. |
| Enter | 링크는 해당 화면으로 이동하고, 전체 메뉴 버튼은 메뉴를 연다. |
| Space | 전체 메뉴 버튼에서 메뉴를 연다(button 기본 동작). |

## 동작
- 뷰포트 1024px 이상에서는 탭바를 표시하지 않고 메인 메뉴를 표시한다(NAV-067, CF-055).
- 스크롤·입력 등 사용자 동작에 따라 탭바를 숨기거나 위치를 바꾸지 않는다 — transform·visibility·display 를 스크롤에 연동하지 않는다(NAV-071).
- 고정 탭바가 초점 받은 요소를 가리지 않게 html 에 scroll-padding-block-end, body 에 padding-block-end 를 탭바 높이 이상으로 둔다. 텍스트 확대로 탭바가 4rem 보다 높아지면 스크립트로 측정한 높이를 같은 속성에 넣는다(LAYOUT-001).
- 탭 메뉴는 5개 이하로 두고, 홈은 맨 왼쪽, 전체 메뉴는 맨 오른쪽에 둔다. 모든 화면에서 순서·레이블·아이콘을 같게 쓴다(NAV-069, NAV-004, COPY-004).
- 레이블은 지원하는 모든 언어에서 1~2어절이고 잘리거나 말줄임표가 생기지 않아야 한다 — 번역 레이블도 360px 화면에서 확인한다(COPY-052).
- 선택되지 않은 탭끼리 색을 다르게 쓰지 않는다. 기본·hover·pressed 는 같은 계열 토큰의 명도 단계로만 바꾼다(COLOR-007).
- 플로팅 버튼을 함께 쓰면 탭바 위 오른쪽 아래에 둔다(LAYOUT-023).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-007 | SHOULD | 상호작용 요소의 기본·hover·pressed(active) 상태 색은 같은 색상 계열 토큰 안에서 명도 단계만 올리거나 내려 표현하고 다른 색상 계열로 바꾸지 않는다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| COPY-052 | SHOULD | 탭바 레이블은 1~2단어(어절)로 쓰고, 번역 레이블을 포함해 모든 지원 화면 너비에서 잘리거나 말줄임표가 생기지 않게 한다. |
| LAYOUT-001 | MUST | 키보드 초점을 받은 컴포넌트가 작성자가 만든 콘텐츠(고정 헤더·고정 푸터·쿠키 배너·비모달 대화상자 등)에 완전히 가려지지 않게 한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-023 | SHOULD | 플로팅 버튼은 화면 오른쪽 아래에 두고, 하단 탭바가 있으면 탭바와 겹치지 않게 탭바 위 오른쪽 아래에 둔다. |
| NAV-004 | MUST | 여러 페이지에 반복되는 내비게이션은 사용자가 바꾸지 않는 한 매번 같은 상대 순서로 둔다. |
| NAV-047 | SHOULD | 다른 화면·같은 화면의 다른 섹션으로 이동하는 동작에는 a[href] 링크를, 폼 제출·대화상자 열기·기능 실행처럼 이동하지 않는 동작에는 button을 쓴다. |
| NAV-067 | MAY | 하단 탭바는 좁은 화면(RESP-004의 모바일·태블릿 구간)에서만 쓰고, 그보다 넓은 화면에서는 메인 메뉴를 쓴다. |
| NAV-068 | SHOULD | 탭바의 모든 탭 메뉴를 같은 너비와 높이로 표시한다. |
| NAV-069 | SHOULD | 탭바 메뉴는 5개 이하로 두고, 그보다 많은 항목은 전체 메뉴나 더 보기 같은 부가 탐색 수단으로 제공한다. |
| NAV-070 | SHOULD | 탭바의 각 탭에 아이콘과 화면에 보이는 텍스트 레이블을 함께 표시한다. |
| NAV-071 | SHOULD | 탭바는 화면 하단에 고정하고, 스크롤 등 사용자 동작에 따라 숨기거나 위치를 바꾸지 않는다. |
| RESP-002 | MUST | 자막과 텍스트 이미지를 제외한 텍스트를 보조기술 없이 200%까지 확대해도 콘텐츠와 기능이 손실되지 않게 한다. |

## KRDS 키트와의 관계
