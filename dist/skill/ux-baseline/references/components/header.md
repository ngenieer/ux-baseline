# 헤더 (`.header`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

모든 페이지 상단에 서비스 아이덴티티(로고), 유틸리티 링크, 검색·로그인·전체 메뉴 같은 기능 버튼, 메인 메뉴를 같은 순서로 반복해 둘 때 쓴다.

## 대신 쓸 것
- 정부 공식 서비스임을 알리는 문구 → 공식 배너(masthead) — 헤더 요소 밖, 앞에 둔다 (LAYOUT-013)
- 본문으로 바로 가는 링크 → 건너뛰기 링크(skip-link) — 헤더보다 DOM 앞에 둔다 (NAV-001)
- 1수준 메뉴와 드롭다운 → 메인 메뉴(main-menu) — 헤더 안 header__menu 자리에 넣는다

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.header` | `header` | 예 | body 의 직계 자식으로 두면 banner 랜드마크가 된다. 건너뛰기 링크·공식 배너 다음에 둔다. |
| 안쪽 영역 | `.header__inner` | `div` | 예 | 본문 콘텐츠 최대 너비에 맞춘 flex 줄. 넓은 화면에서는 로고 · 기능 버튼 · 유틸리티 링크를 한 줄에 두어 유틸리티 링크가 첫 행 오른쪽 끝에 온다. 좁은 화면에서는 로고 · 기능 버튼 아래 줄로 유틸리티 링크가 내려간다. 두 경우 모두 DOM 순서와 화면 순서가 같다(A11Y-008). |
| 서비스 아이덴티티(로고 링크) | `.header__logo` | `a` | 예 | 메인 화면으로 가는 링크. 안의 img alt 는 서비스 이름이고 '로고'라는 단어를 넣지 않는다(A11Y-027). DOM 에서 헤더의 첫 요소다(LAYOUT-011). |
| 로고 이미지 | `.header__logo-image` | `img` | 예 | width·height 속성으로 공간을 예약한다(PERF-009). |
| 유틸리티 링크 그룹 | `.header__utility` | `nav` | 예 | aria-label 로 다른 nav 와 구분한다. 펼쳐 보이는 링크는 4개 이하, 5번째부터는 드롭다운에 넣는다(NAV-016). |
| 유틸리티 목록 | `.header__utility-list` | `ul` | 예 |  |
| 유틸리티 항목 | `.header__utility-item` | `li` | 예 | 이웃 항목 사이의 디바이더는 CSS 의사 요소로 그려 보조기술에 읽히지 않는다(NAV-015). |
| 유틸리티 링크·드롭다운 버튼 | `.header__utility-link` | `a / button` | 예 |  |
| 드롭다운 목록 | `.header__dropdown` | `ul` |  | 버튼 바로 다음에 두고(A11Y-008) 닫혀 있으면 hidden 속성으로 숨긴다(A11Y-015). WAI-ARIA APG 디스클로저 패턴(버튼 + aria-expanded + aria-controls)을 쓴다. |
| 드롭다운 링크 | `.header__dropdown-link` | `a` |  |  |
| 기능 버튼 그룹 | `.header__actions` | `div` | 예 |  |
| 기능 버튼·링크 | `.header__action` | `button / a` | 예 | 보이는 텍스트 레이블을 함께 둔다. 텍스트를 생략할 수 있는 것은 검색·로그인뿐이다(COPY-016). |
| 메인 메뉴 자리 | `.header__menu` | `div` | 예 | 메인 메뉴(main-menu 규격)의 nav 를 이 안에 넣는다. 헤더 규격은 메인 메뉴 마크업을 정의하지 않는다. |

## 표준 마크업

```html
<header class="header">
  <div class="header__inner">
    <a class="header__logo" href="/">
      <img class="header__logo-image" src="/images/service-logo.svg" alt="국민복지 안내 누리집" width="160" height="40">
    </a>
    <div class="header__actions">
      <button type="button" class="header__action" aria-haspopup="dialog">통합검색</button>
      <a class="header__action" href="/login">로그인</a>
      <button type="button" class="header__action header__action--menu" aria-expanded="false">전체 메뉴</button>
    </div>
    <nav class="header__utility" aria-label="유틸리티 메뉴">
      <ul class="header__utility-list">
        <li class="header__utility-item"><a class="header__utility-link" href="/sitemap">사이트맵</a></li>
        <li class="header__utility-item"><a class="header__utility-link" href="/en" lang="en" hreflang="en">English</a></li>
        <li class="header__utility-item">
          <button type="button" class="header__utility-link" aria-expanded="true" aria-controls="header-related-sites">관련 누리집</button>
          <ul class="header__dropdown" id="header-related-sites">
            <li><a class="header__dropdown-link" href="https://www.gov.kr/">정부24</a></li>
            <li><a class="header__dropdown-link" href="https://www.bokjiro.go.kr/">복지로</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
  <div class="header__menu">
    <!-- 메인 메뉴(main-menu 규격)의 nav 가 여기 들어간다 -->
  </div>
</header>
```

## 표준 CSS (토큰만 사용)

```css
.header {
  border-block-end: var(--border-width-static-regular) solid var(--color-divider-gray-light);
  background-color: var(--color-surface-white);
}
.header--sticky {
  position: sticky;
  inset-block-start: 0;
  z-index: 10;
}
.header__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-gap-3);
  max-inline-size: var(--layout-content-max);
  margin-inline: auto;
  padding-block: var(--space-padding-3);
  padding-inline: var(--layout-screen-margin-small);
}
.header__logo {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-small1);
}
.header__logo-image {
  inline-size: auto;
  block-size: var(--size-height-5);
}
.header__utility {
  flex-basis: 100%;
}
.header__utility-list {
  display: flex;
  align-items: center;
  gap: var(--space-gap-3);
}
.header__utility-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-gap-3);
}
.header__utility-item + .header__utility-item::before {
  content: "";
  inline-size: var(--border-width-static-regular);
  block-size: var(--space-scale-7);
  background-color: var(--color-divider-gray-light);
}
.header__utility-link {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--layout-target-min);
  padding-inline: var(--space-padding-1);
  border: 0;
  border-radius: var(--radius-small1);
  background-color: transparent;
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
}
.header__utility-link:hover {
  background-color: var(--color-action-secondary-hover);
}
.header__dropdown {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-end: 0;
  z-index: 20;
  min-inline-size: 100%;
  padding: var(--space-padding-3);
  border: var(--border-width-static-regular) solid var(--color-border-gray-light);
  border-radius: var(--radius-medium1);
  background-color: var(--color-surface-white);
  box-shadow: var(--shadow-2);
}
.header__dropdown-link {
  display: flex;
  align-items: center;
  min-block-size: var(--size-height-4);
  padding-inline: var(--space-padding-3);
  border-radius: var(--radius-small1);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
  white-space: nowrap;
}
.header__dropdown-link:hover {
  background-color: var(--color-action-secondary-hover);
}
.header__actions {
  display: flex;
  margin-inline-start: auto;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-gap-1);
}
.header__action {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-3);
  border: 0;
  border-radius: var(--radius-medium1);
  background-color: transparent;
  color: var(--color-text-basic);
  font-size: var(--font-size-navigation-depth-small-bold);
  font-weight: var(--font-weight-bold);
}
.header__action:hover {
  background-color: var(--color-action-secondary-hover);
}
.header__action:active {
  background-color: var(--color-action-secondary-pressed);
}
.header__logo:focus-visible,
.header__utility-link:focus-visible,
.header__dropdown-link:focus-visible,
.header__action:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
@media (min-width: 768px) {
  .header__inner {
    padding-inline: var(--layout-screen-margin-medium);
  }
}
@media (min-width: 1024px) {
  .header__logo-image {
    block-size: var(--size-height-7);
  }
  .header__utility {
    flex-basis: auto;
  }
  .header__action {
    font-size: var(--font-size-navigation-depth-medium-bold);
  }
  .header__action--menu {
    display: none;
  }
}
```

## 상태
- **상단 고정**: 루트에 header--sticky. 공식 배너는 헤더 밖에 있어 고정되지 않는다. 문서 루트에 scroll-padding-top 을 헤더 높이 이상으로 주어 초점 요소가 헤더에 가려지지 않게 한다(LAYOUT-013, LAYOUT-001).
- **드롭다운 열림**: 드롭다운 버튼 aria-expanded="true", 드롭다운 목록의 hidden 속성 제거. 닫히면 aria-expanded="false" 와 hidden 을 되돌린다(A11Y-025).
- **좁은 화면(1024px 미만)**: 마크업 변화 없음. 유틸리티 링크 그룹이 로고·기능 버튼 아래 줄로 내려가고, '전체 메뉴' 버튼이 보인다. 버튼은 메인 메뉴 레이어를 여닫는다(RESP-005).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 로고 → 기능 버튼 → 유틸리티 링크 → 메인 메뉴 순서로 초점이 이동한다. 닫힌 드롭다운 안의 링크에는 초점이 가지 않는다(A11Y-015). |
| Enter / Space | 드롭다운 버튼에서 목록을 열고 닫는다. 기능 버튼을 실행한다. |
| Esc | 열린 드롭다운을 닫고 초점을 그 드롭다운 버튼으로 옮긴다(A11Y-040). |

## 동작
- 헤더의 DOM 순서는 서비스 아이덴티티(로고) → 기능 버튼 → 유틸리티 링크 → 메인 메뉴이고 화면 순서(왼쪽→오른쪽, 위→아래)와 같으며, 모든 페이지에서 같다(LAYOUT-011, NAV-004, A11Y-008).
- 헤더에는 서비스 아이덴티티·유틸리티 링크·검색·로그인·전체 메뉴·메인 메뉴만 두고 꾸밈 요소·부가 정보를 넣지 않는다(LAYOUT-012).
- 유틸리티 링크 그룹은 넓은 화면에서 첫 행 오른쪽 끝에 두고(좁은 화면에서는 둘째 줄로 내려가며 숨기지 않는다), 펼쳐 보이는 링크는 4개 이하다. 5번째 링크부터는 aria-expanded 버튼으로 여닫는 드롭다운에 넣는다(NAV-015, NAV-016).
- 드롭다운이 열린 상태에서 버튼·목록 밖을 클릭하면 닫고 aria-expanded="false" 로 바꾼다. Esc 로 닫으면 초점을 드롭다운 버튼으로 옮긴다(A11Y-040, A11Y-025).
- 드롭다운은 호버·초점만으로 열지 않고 클릭·Enter·Space 로만 연다. 호버로 여는 변형을 만들면 Esc 닫기·포인터 이동 유지·시간 제한 없음을 지킨다(A11Y-010, A11Y-011).
- 언어 변경 링크는 국기 없이 그 언어의 이름(English)을 쓰고, 그 언어로 lang 속성을 준다(COPY-015, A11Y-023).
- 기능 버튼·링크에는 보이는 텍스트를 둔다. 아이콘을 함께 쓰면 장식으로 aria-hidden 처리하고, 텍스트를 생략할 수 있는 것은 검색·로그인뿐이다(COPY-016, A11Y-001).
- 전체 메뉴 버튼은 메인 메뉴 레이어를 여닫고, 열림 상태를 aria-expanded 로, 대상을 aria-controls(메인 메뉴 nav 의 id)로 알린다(RESP-005, A11Y-025). 1수준 항목이 한 줄에 다 들어가는 너비에서는 버튼을 숨기고 메뉴 막대를 펼친다(RESP-007).
- 헤더를 상단에 고정할 때는 공식 배너를 뺀 헤더 전체를 고정하고, 고정 헤더가 초점 받은 요소를 완전히 가리지 않게 문서 루트에 scroll-padding-top 을 준다(LAYOUT-013, LAYOUT-001).
- 기능 버튼·링크·유틸리티 링크의 포인터 대상은 24×24 CSS px 이상이다(LAYOUT-002).
- 같은 기능의 버튼은 모든 페이지에서 같은 레이블('통합검색', '로그인', '전체 메뉴')을 쓴다(COPY-004).
- 헤더 앞에는 건너뛰기 링크와 공식 배너가 온다(NAV-001, LAYOUT-009).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-010 | MUST | 호버나 키보드 초점으로 나타나는 추가 콘텐츠는 초점·포인터를 옮기지 않고 닫을 수 있고(Esc 등), 그 위로 포인터를 옮겨도 사라지지 않으며, 호버·초점이 없어지거나 사용자가 닫거나 정보가 무효가 될 때까지 유지한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-023 | MUST | 페이지 기본 언어와 다른 언어로 된 구절·문장에는 그 요소에 lang 속성으로 언어를 지정한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-027 | SHOULD | 헤더의 이미지 로고에는 대체 텍스트를 제공하되, 대체 텍스트에 '로고'라는 단어를 넣지 않는다. |
| A11Y-040 | SHOULD | 셀렉트·언어 변경·화면 크기 조정 같은 드롭다운의 옵션 목록이 펼쳐진 상태에서 레이블·컨테이너·목록이 아닌 영역을 클릭하면 목록을 접고, Esc를 누르면 목록을 접은 뒤 초점을 컨테이너로 옮긴다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| COPY-015 | SHOULD | 언어 선택 메뉴와 언어 변경 링크에는 국기를 쓰지 않고, 각 언어의 이름을 그 언어로 쓴다(예: English, 日本語, 中文). |
| COPY-016 | SHOULD | 헤더의 아이콘 버튼·링크에는 눈에 보이는 텍스트 레이블을 함께 표시하고, 검색·로그인처럼 대부분의 사용자가 의미를 아는 단순한 아이콘만 텍스트 레이블을 생략한다. |
| LAYOUT-001 | MUST | 키보드 초점을 받은 컴포넌트가 작성자가 만든 콘텐츠(고정 헤더·고정 푸터·쿠키 배너·비모달 대화상자 등)에 완전히 가려지지 않게 한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-009 | SHOULD | 공식 배너는 모든 화면의 최상단에 두고, DOM에서는 건너뛰기 링크만 공식 배너 앞에 둔다. |
| LAYOUT-011 | SHOULD | 정부 로고(서비스 아이덴티티)를 헤더의 왼쪽 위에 둔다. |
| LAYOUT-012 | SHOULD | 헤더에는 건너뛰기 링크·공식 배너·서비스 아이덴티티·유틸리티 링크·검색·메인 메뉴 같은 필수 항목만 두고 꾸밈 요소와 부가 정보를 넣지 않는다. |
| LAYOUT-013 | SHOULD | 헤더를 화면 상단에 고정할 때는 공식 배너를 뺀 헤더 전체를 고정한다. |
| NAV-001 | MUST | 여러 페이지에 반복되는 콘텐츠 블록(헤더·메인 메뉴 등)이 있는 페이지에는 그 블록을 건너뛰어 본문으로 가는 건너뛰기 링크를 문서의 첫 초점 요소로 제공한다. |
| NAV-004 | MUST | 여러 페이지에 반복되는 내비게이션은 사용자가 바꾸지 않는 한 매번 같은 상대 순서로 둔다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| NAV-015 | SHOULD | 헤더의 유틸리티 링크 그룹은 헤더 오른쪽 위에 두고, 서로 관련 없는 링크 사이를 디바이더로 구분한다. |
| NAV-016 | SHOULD | 헤더 유틸리티 링크가 5개 이상 필요하면 드롭다운 메뉴를 쓴다. |
| PERF-009 | SHOULD | 지연 로딩 여부와 관계없이 모든 <img>와 <video>에 width·height 속성을 지정하거나 CSS aspect-ratio로 공간을 예약하고, 반응형 크기 조정은 width: 100%(또는 max-width: 100%)와 height: auto로 한다. |
| RESP-005 | MAY | 헤더 너비가 메인 메뉴 1수준 항목 전체를 한 줄에 담지 못하면 메인 메뉴 막대를 숨기고 햄버거 메뉴 버튼과 메뉴 레이어로 메인 메뉴를 제공할 수 있다. |
| RESP-007 | SHOULD | 헤더 너비가 메인 메뉴 1수준 항목 전체를 한 줄에 담을 수 있으면 1수준 항목 전체를 메뉴 막대에 펼쳐 보이게 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.header` ↔ `#krds-header`, `.header__inner` ↔ `header-container inner`, `.header__logo` ↔ `header-branding logo`, `.header__utility` ↔ `header-utility`, `.header__utility-list` ↔ `utility-list`, `.header__dropdown` ↔ `drop-menu`, `.header__actions` ↔ `header-actions`, `.header__action` ↔ `btn-navi`
- KRDS 키트는 유틸리티 링크 묶음을 로고보다 DOM 앞, 로고 줄 위의 별도 줄에 둔다 — 이 규격은 로고를 헤더의 첫 요소로 두고 유틸리티 링크를 기능 버튼 뒤에 두어, 넓은 화면(한 줄)과 좁은 화면(두 줄) 모두 DOM 순서와 화면 순서를 맞춘다(LAYOUT-011, A11Y-008, NAV-015).
- KRDS 키트의 드롭다운 버튼에는 aria-expanded·aria-controls 가 없다 — 이 규격은 디스클로저 패턴으로 상태와 대상을 알린다(A11Y-025).
- KRDS 키트는 로고를 h2 안 링크 + 숨긴 텍스트(sr-only)로 넣는다 — 이 규격은 제목 요소 없이, alt 가 서비스 이름인 img 링크로 넣는다(A11Y-027, A11Y-001).
- KRDS 키트는 새 창 링크를 title 속성('새 창 열기')만으로 알린다 — 이 규격은 새 창 링크를 쓰지 않으며, 쓸 때는 링크 안 텍스트로 알린다(NAV-012).
- KRDS 키트의 '전체메뉴' 버튼은 aria-expanded 가 없다 — 이 규격은 aria-expanded 로 레이어 열림을 알린다(A11Y-025, RESP-005).
- KRDS 키트는 메인 메뉴 nav 를 헤더 마크업 안에 함께 정의한다 — 이 규격은 header__menu 자리만 두고 메뉴는 main-menu 규격을 따른다.
