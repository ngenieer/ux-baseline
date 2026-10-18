# 페이지네이션 (`.pagination`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

20개를 넘는 목록을 페이지(화면) 단위로 나누고, 목록 아래에서 이전·다음·첫·마지막·번호 페이지로 이동하게 할 때 쓴다.

## 대신 쓸 것
- 항목 수 추정치가 있고 사용자가 목록 끝으로 갈 필요가 없는 피드형 목록 → 무한 스크롤(페이지네이션과 함께 쓰지 않는다) (NAV-041)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.pagination` | `nav` | 예 | 목록 바로 아래 가운데에 하나만 둔다(LAYOUT-019). aria-label 로 어느 목록의 페이지인지 밝힌다. |
| 이전·다음 링크 | `.pagination__nav` | `a` | 예 | 보이는 텍스트 '이전'·'다음'. 접근 가능한 이름은 '이전 페이지'·'다음 페이지'로 보이는 텍스트를 앞에 포함한다(A11Y-019). |
| 이전 링크 | `.pagination__nav--prev` | `a` | 예 |  |
| 다음 링크 | `.pagination__nav--next` | `a` | 예 |  |
| 번호 목록 | `.pagination__list` | `ul` | 예 | 숫자 링크와 말줄임표를 합쳐 10개 이하, 1024px 미만에서는 7개 이하로 보인다(NAV-044). 첫 페이지(1)와 마지막 페이지 번호는 항상 보인다(NAV-042, NAV-043). |
| 번호 항목 | `.pagination__item` | `li` | 예 |  |
| 번호 링크 | `.pagination__link` | `a` | 예 | 접근 가능한 이름은 'N페이지'. 현재 페이지에는 aria-current="page". |
| 말줄임표 | `.pagination__ellipsis` | `li` | 예 | 장식이라 aria-hidden="true". |

## 표준 마크업

```html
<nav class="pagination" aria-label="공지사항 목록 페이지">
  <a class="pagination__nav pagination__nav--prev" href="?page=3" aria-label="이전 페이지">이전</a>
  <ul class="pagination__list">
    <li class="pagination__item"><a class="pagination__link" href="?page=1">1</a></li>
    <li class="pagination__item pagination__item--wide"><a class="pagination__link" href="?page=2">2</a></li>
    <li class="pagination__ellipsis pagination__ellipsis--narrow" aria-hidden="true">…</li>
    <li class="pagination__item"><a class="pagination__link" href="?page=3">3</a></li>
    <li class="pagination__item"><a class="pagination__link" href="?page=4" aria-current="page">4</a></li>
    <li class="pagination__item"><a class="pagination__link" href="?page=5">5</a></li>
    <li class="pagination__item pagination__item--wide"><a class="pagination__link" href="?page=6">6</a></li>
    <li class="pagination__item pagination__item--wide"><a class="pagination__link" href="?page=7">7</a></li>
    <li class="pagination__item pagination__item--wide"><a class="pagination__link" href="?page=8">8</a></li>
    <li class="pagination__ellipsis" aria-hidden="true">…</li>
    <li class="pagination__item"><a class="pagination__link" href="?page=20">20</a></li>
  </ul>
  <a class="pagination__nav pagination__nav--next" href="?page=5" aria-label="다음 페이지">다음</a>
</nav>
```

## 표준 CSS (토큰만 사용)

```css
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-gap-7) var(--space-gap-3);
  margin-block-start: var(--gap-layout-h2-h3);
  color: var(--color-text-subtle);
}
.pagination__nav,
.pagination__link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-block-size: var(--size-height-6);
  border-radius: var(--radius-medium1);
  background-color: var(--color-action-secondary);
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-medium);
}
.pagination__nav {
  padding-inline: var(--space-padding-3);
}
.pagination__nav:hover,
.pagination__link:hover {
  background-color: var(--color-action-secondary-hover);
}
.pagination__nav:active,
.pagination__link:active {
  background-color: var(--color-action-secondary-pressed);
}
.pagination__nav:focus-visible,
.pagination__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.pagination__list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-gap-1);
}
.pagination__link {
  min-inline-size: var(--size-height-5);
  padding-inline: var(--space-padding-2);
}
.pagination__link[aria-current="page"] {
  background-color: var(--color-action-secondary-active);
  color: var(--color-text-inverse-static);
  font-weight: var(--font-weight-bold);
}
.pagination__ellipsis {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-inline-size: var(--size-height-5);
  color: var(--color-text-subtle);
}
.pagination__item--wide {
  display: none;
}
@media (min-width: 1024px) {
  .pagination__list {
    gap: var(--space-gap-3);
  }
  .pagination__link,
  .pagination__ellipsis {
    min-inline-size: var(--size-height-6);
  }
  .pagination__item--wide {
    display: list-item;
  }
  .pagination__ellipsis--narrow {
    display: none;
  }
}
```

## 상태
- **첫 페이지·마지막 페이지**: 첫 페이지에서는 '이전'을, 마지막 페이지에서는 '다음'을 href 없는 a 에 aria-disabled="true" 로 바꾸고 비활성 색(color-text-disabled)으로 표시한다. 현재 위치 번호(aria-current)가 첫·마지막 이동을 대신한다(NAV-042).
- **좁은 화면(1024px 미만)**: 마크업 변화 없음. pagination__item--wide 항목을 숨기고 pagination__ellipsis--narrow 말줄임표를 보여 번호 목록을 7개 이하로 줄인다. 이전·다음 링크를 위 줄에, 번호 목록을 아래 줄에 둔다(NAV-044, RESP-010).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 이전 → 다음 → 번호 링크 순서로 이동한다. 숨긴 번호 항목에는 초점이 가지 않는다(A11Y-015). |
| Enter | 해당 페이지로 이동한다. |

## 동작
- 페이지네이션은 목록 바로 아래 가운데에 두고, 한 화면에 하나만 쓴다(LAYOUT-019).
- 전체 항목이 20개를 넘거나 목록 높이가 뷰포트 높이의 2배를 넘으면 페이지로 나누고, 페이지당 기본 10개 이상 항목을 보인다(NAV-007).
- 어느 페이지에서든 첫 페이지(1), 마지막 페이지 번호, 이전, 다음으로 갈 수 있다. 말줄임표가 1과 마지막 번호를 가리지 않는다(NAV-042, NAV-044).
- 전체 페이지 수는 마지막 페이지 번호 텍스트로 화면에 보인다(NAV-043).
- 번호 목록은 말줄임표 포함 10개 이하, 1024px 미만에서는 7개 이하다. 서버가 넓은 화면용 전체 항목을 렌더링하고, 좁은 화면에서 숨길 항목에 pagination__item--wide, 좁은 화면에서만 보일 말줄임표에 pagination__ellipsis--narrow 를 붙인다(NAV-044, RESP-004).
- 화면 크기가 바뀌어도 전체 페이지 수와 페이지당 항목 수는 바꾸지 않는다(RESP-011).
- 숫자만 보이는 링크에는 'N페이지' 접근 가능한 이름을 주고(보이는 숫자를 앞에 포함), 현재 페이지는 aria-current="page" 로 알린다(COPY-002, A11Y-019, A11Y-025).
- 현재 페이지는 배경 명도·굵기 차이로 표시해 색상 계열만으로 구분하지 않는다(COLOR-001).
- 링크의 포인터 대상은 24×24 CSS px 이상이다(LAYOUT-002).
- 시각적 번호 목록은 ul·li 로 마크업한다(A11Y-007).
- 무한 스크롤 목록에는 페이지네이션을 함께 두지 않는다(NAV-041).
- 모든 화면에서 DOM 순서(이전 → 번호 목록 → 다음)와 화면 순서가 같다. 1024px 미만에서 한 줄에 들어가지 않으면 flex-wrap 으로 같은 순서대로 다음 줄에 넘긴다(CF-058, RESP-010, A11Y-008, A11Y-015).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-019 | MUST | 텍스트나 텍스트 이미지로 된 레이블이 보이는 UI 컴포넌트는 접근 가능한 이름에 보이는 텍스트를 그대로 포함한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COPY-002 | MUST | 링크의 목적을 링크 텍스트만으로, 또는 링크 텍스트와 프로그램으로 판별되는 링크 맥락(같은 문장·문단·목록 항목·표 셀·aria-describedby)으로 알 수 있게 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-019 | SHOULD | 페이지네이션은 목록 아래에 가운데 정렬로 두고, 한 화면에 하나만 쓴다. |
| NAV-007 | SHOULD | 전체 항목이 20개를 넘거나 한 화면에 모두 표시했을 때 목록 높이가 뷰포트 높이의 2배를 넘는 목록은 페이지 단위로 나누고, 페이지네이션을 쓰면 한 페이지에 기본 10개 이상 항목을 표시한다. |
| NAV-041 | SHOULD | 무한 스크롤은 항목 수 추정치가 있고 사용자가 목록 끝으로 이동할 필요가 없는 목록에만 쓰고, 무한 스크롤을 쓰는 목록에는 페이지네이션을 함께 두지 않는다. |
| NAV-042 | SHOULD | 페이지네이션은 어느 화면에서든 첫 화면, 마지막 화면, 이전 화면, 다음 화면으로 이동하는 수단을 제공한다(목록 확장형 제외). |
| NAV-043 | SHOULD | 페이지네이션에 전체 화면 수를 텍스트로 표시한다. |
| NAV-044 | SHOULD | 페이지네이션 숫자 링크 목록은 말줄임표를 포함해 10개 이하로 표시하고, 좁은 화면 레이아웃(RESP-004의 Mobile 모드, 1024px 미만)에서는 7개 이하로 표시한다. |
| RESP-003 | MUST | 세로 스크롤 콘텐츠는 너비 320 CSS px, 가로 스크롤 콘텐츠는 높이 256 CSS px에 해당하는 화면에서 정보와 기능의 손실 없이, 두 방향 스크롤 없이 이용할 수 있게 한다. 사용이나 의미 전달에 2차원 배치가 필요한 부분만 예외로 한다. |
| RESP-004 | MAY | 브레이크포인트를 3~6단계로 정의하고, KRDS 표준형 스타일을 쓰는 공공 서비스는 small 360px·medium 768px·large 1024px·xlarge 1280px 4단계를 쓴다. |
| RESP-010 | SHOULD | 모바일 레이아웃(RESP-004 기준 1024px 미만)에서는 페이지네이션을 데이터 목록 아래에 두고, 이전 버튼·숫자 링크 목록·다음 버튼을 DOM 순서와 같은 순서로 배치하며, 한 줄에 들어가지 않으면 이 순서대로 세로로 쌓는다. |
| RESP-011 | SHOULD | 화면 크기가 바뀌어도 페이지네이션의 전체 화면(페이지) 수와 화면당 항목 수를 바꾸지 않는다. |

## KRDS 키트와의 관계
- 클래스 대응: `.pagination` ↔ `krds-pagination`, `.pagination__nav` ↔ `page-navi`, `.pagination__nav--prev` ↔ `page-navi prev`, `.pagination__nav--next` ↔ `page-navi next`, `.pagination__list` ↔ `page-links`, `.pagination__link` ↔ `page-link`, `.pagination__ellipsis` ↔ `page-link link-dot`
- KRDS 키트는 좁은 화면에서 이전·다음을 번호 위에 두도록 CSS order 로 배치한다 — 이 규격은 DOM 순서(이전 → 번호 → 다음)를 화면에서도 유지하고 순서를 바꾸지 않는다(CF-058, A11Y-008, A11Y-015).
- KRDS 키트는 비활성 '이전'을 href 속성이 붙은 span 으로 쓴다 — 이 규격은 href 없는 a 에 aria-disabled="true" 를 쓴다(A11Y-025).
- KRDS 키트는 번호 링크를 목록(ul·li) 없이 나열하고 현재 페이지를 active 클래스 + 숨긴 텍스트로 표시한다 — 이 규격은 ul·li 와 aria-current="page" 를 쓴다(A11Y-007, A11Y-025).
- KRDS 키트의 말줄임표는 aria-hidden 이 없는 빈 span 이다 — 이 규격은 aria-hidden="true" 인 li 로 둔다(A11Y-007).
