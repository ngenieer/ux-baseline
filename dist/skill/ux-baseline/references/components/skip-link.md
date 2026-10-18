# 건너뛰기 링크 (`.skip-link`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

여러 페이지에 반복되는 헤더·메인 메뉴를 건너뛰어 본문으로 바로 가는 링크를 문서의 첫 초점 요소로 둘 때 쓴다.

## 대신 쓸 것
- 정보 구조 없이 단일 화면으로 된 사이트, main 앞에 메뉴 탐색용 nav 나 반복 블록이 없는 페이지 → 건너뛰기 링크를 두지 않는다 (NAV-020)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.skip-link` | `div` | 예 | body 의 첫 요소로 둔다. 앞에 올 수 있는 것은 쿠키 배너·화면 맥락을 가리는 모달뿐이다(NAV-001 예외). 공식 배너(masthead)보다 앞에 둔다(LAYOUT-009). |
| 링크 | `.skip-link__link` | `a` | 예 | href 는 같은 페이지 안 목적지 id 다. 3개 이하로 두고, 여러 개면 본문으로 가는 링크를 첫 번째에 둔다(NAV-018). 초점을 받기 전에는 시각적으로만 숨기고, 초점을 받으면 화면 맨 위에 나타난다(A11Y-016). KWCAG 를 적용하는 공공 프로젝트는 skip-link__link--visible 을 붙여 초점과 관계없이 항상 보이게 한다(NAV-001 측정 기준 (3), CF-042). |

## 표준 마크업

```html
<div class="skip-link">
  <a class="skip-link__link" href="#skip-link-target">본문 바로가기</a>
</div>
<div id="skip-link-target" tabindex="-1">
  <p>본문 영역입니다. 실제 페이지에서는 브레드크럼·사이드 메뉴 뒤, 본문 제목(h1)을 감싼 영역에 이 id 를 둡니다.</p>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.skip-link__link {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.skip-link__link:focus,
.skip-link__link--visible {
  position: static;
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  min-block-size: var(--size-height-5);
  overflow: visible;
  clip-path: none;
  background-color: var(--color-background-inverse);
  color: var(--color-text-basic-inverse);
  font-size: var(--font-size-body-small);
  outline: var(--space-scale-2) solid var(--color-border-inverse);
  outline-offset: calc(var(--space-scale-3) * -1);
}
```

## 상태
- **초점**: 마크업 변화 없음. :focus 에서 시각적 숨김(clip-path·1px)을 풀어 화면 맨 위에 전체 너비로 표시한다(A11Y-016).
- **공공 프로젝트(KWCAG 적용) — 항상 보임**: 링크에 skip-link__link--visible 을 붙인다. 시각적 숨김 없이 초점과 관계없이 화면 맨 위에 전체 너비로 보인다 — KWCAG 6.4.1 해설 '메뉴 건너뛰기 링크는 화면에 보이도록 구현'에 초점 시 한정이 없기 때문이다. 그 밖의 프로젝트는 기본(초점을 받으면 보임)을 쓴다(NAV-001, CF-042).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 페이지를 연 뒤 첫 Tab 에서 건너뛰기 링크로 초점이 가고 링크가 화면에 나타난다(NAV-001, A11Y-016). |
| Enter | 목적지로 스크롤하고 초점을 목적지 요소로 옮긴다. 다음 Tab 은 목적지 안의 첫 초점 요소로 간다(A11Y-015). |

## 동작
- 건너뛰기 링크는 문서의 첫 초점 요소다. 공식 배너·헤더보다 DOM 앞에 둔다(NAV-001, LAYOUT-009).
- 링크 수는 3개 이하로 두고, 여러 개면 첫 링크의 목적지가 main 이거나 main 안 요소여야 한다(NAV-018).
- 본문 바로가기 목적지에는 사이드 메뉴·브레드크럼·페이지 유틸리티(공유·인쇄)가 포함되지 않게, 그 영역들 뒤의 본문 제목 영역을 목적지로 잡는다(NAV-019).
- 목적지가 기본적으로 초점을 받을 수 없는 요소이면 tabindex="-1" 을 주어 실행 시 초점이 목적지로 옮겨지게 한다. tabindex 에 1 이상 값은 쓰지 않는다(A11Y-015).
- 숨김은 display none·visibility hidden·0 크기가 아니라 1px·clip-path 로 하고, top·left 로 화면 밖으로 옮기지 않는다(A11Y-046, A11Y-047, A11Y-048).
- 링크 문구 '본문 바로가기'는 서비스의 모든 페이지에서 같게 쓴다(COPY-004).
- 메뉴 탐색용 nav 나 반복 블록이 main 앞에 없는 페이지에는 두지 않는다(NAV-020).
- KWCAG 를 적용하는 공공 프로젝트는 건너뛰기 링크를 항상 보이는 변형(skip-link__link--visible)으로, 그 밖의 프로젝트는 초점을 받으면 보이는 기본형으로 둔다(NAV-001, CF-042).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-046 | SHOULD | 스크린 리더에 전달할 숨긴 콘텐츠에는 display:none이나 visibility:hidden을 쓰지 않고 시각적 숨김 스타일(clip·1px 크기 등)을 쓴다. |
| A11Y-047 | SHOULD | 숨긴 콘텐츠에 width:0, height:0, font-size:0, line-height:0을 쓰지 않는다. |
| A11Y-048 | SHOULD | 대화형 요소를 시각적으로 숨길 때 text-indent나 top·left 값으로 본래 위치 밖으로 옮기지 않고 top·left를 auto로 유지한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| LAYOUT-009 | SHOULD | 공식 배너는 모든 화면의 최상단에 두고, DOM에서는 건너뛰기 링크만 공식 배너 앞에 둔다. |
| NAV-001 | MUST | 여러 페이지에 반복되는 콘텐츠 블록(헤더·메인 메뉴 등)이 있는 페이지에는 그 블록을 건너뛰어 본문으로 가는 건너뛰기 링크를 문서의 첫 초점 요소로 제공한다. |
| NAV-018 | SHOULD | 건너뛰기 링크는 3개 이하로 두고, 여러 개일 때는 화면의 핵심 영역(본문)으로 가는 링크를 첫 번째에 둔다. |
| NAV-019 | SHOULD | 본문 바로가기 링크의 목적지 영역에 사이드 메뉴, 브레드크럼, 페이지 유틸리티 버튼·링크를 포함하지 않는다. |
| NAV-020 | SHOULD | 정보 구조 없이 단일 화면으로 된 사이트나, 문서 시작 부분에 메뉴 탐색용 내비게이션이 없는 페이지에는 건너뛰기 링크를 두지 않는다. |

## KRDS 키트와의 관계
- 클래스 대응: `.skip-link` ↔ `#krds-skip-link`, `.skip-link__link` ↔ `#krds-skip-link a`
- KRDS 키트 예시는 목적지를 브레드크럼(href="#breadcrumb")으로 잡는다 — 이 규격은 브레드크럼·사이드 메뉴 뒤의 본문 제목 영역을 목적지로 잡는다(NAV-019).
- KRDS 키트는 건너뛰기 링크 감싸개를 position fixed 로 화면 위에 겹쳐 띄운다 — 이 규격은 초점을 받으면 문서 흐름(static)으로 나타나 다른 콘텐츠를 가리지 않게 한다(A11Y-016).
