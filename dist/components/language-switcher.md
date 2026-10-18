# 언어 변경 (`.language-switcher`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

같은 서비스를 다른 언어로 볼 수 있을 때 언어를 바꾸는 링크(2개 언어) 또는 드롭다운(3개 이상)으로 쓴다.

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.language-switcher` | `div` | 예 | 지원 언어가 2개면 링크형(language-switcher--link), 3개 이상이면 드롭다운형(language-switcher--dropdown)을 쓴다(NAV-058). 헤더가 햄버거 메뉴로 바뀌는 너비에서는 메뉴 레이어 안이나 푸터에 둔다(RESP-014). |
| 상대 언어 링크(링크형) | `.language-switcher__link` | `a` |  | 전환될 상대 언어의 이름을 그 언어로 쓴다(한국어 화면 'English', 영어 화면 '한국어'). lang·hreflang 을 준다(COPY-037, COPY-015, A11Y-023). |
| 열기 버튼(드롭다운형) | `.language-switcher__toggle` | `button` | 예 | aria-expanded·aria-controls 를 가진 디스클로저 버튼(WAI-ARIA APG Disclosure). 레이블 왼쪽에 지구본 아이콘을 둔다(NAV-057). 높이 40px(size-height-6)(LAYOUT-002). |
| 지구본 아이콘 | `.language-switcher__icon` | `svg` |  | 옆 텍스트가 이름을 주므로 aria-hidden="true"(A11Y-001). |
| 목록 패널 | `.language-switcher__panel` | `div` | 예 | 닫힌 상태에서는 hidden 속성. |
| 목록 | `.language-switcher__list` | `ul` | 예 |  |
| 언어 옵션 | `.language-switcher__option` | `a` | 예 | '원어 이름 (현재 표시 언어로 쓴 이름)' 형식(COPY-040). 원어 이름만 lang 을 준 span 으로 감싼다(A11Y-023). 현재 언어는 aria-current="true" 와 원어 이름만. 국기·언어 코드·국가명을 쓰지 않는다(COPY-015, COPY-038, COPY-039). |
| 원어 이름 | `.language-switcher__endonym` | `span` |  | lang 속성을 그 언어로 준다. |

## 표준 마크업

```html
<div class="language-switcher language-switcher--link">
  <a class="language-switcher__link" href="/en/" lang="en" hreflang="en">English</a>
</div>
<div class="language-switcher language-switcher--dropdown">
  <button class="language-switcher__toggle" type="button" aria-expanded="true" aria-controls="language-list">
    <svg class="language-switcher__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.9a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zM8 8H5.1a8 8 0 0 1 4.3-3.6C8.8 5.5 8.3 6.7 8 8zm4 12c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 0 1-4.3 3.6zm1.7-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4z"/></svg>
    언어 변경
  </button>
  <div class="language-switcher__panel" id="language-list">
    <ul class="language-switcher__list" role="list">
      <li><a class="language-switcher__option" href="/ko/" hreflang="ko" aria-current="true"><span class="language-switcher__endonym">한국어</span></a></li>
      <li><a class="language-switcher__option" href="/en/" hreflang="en"><span class="language-switcher__endonym" lang="en">English</span> (영어)</a></li>
      <li><a class="language-switcher__option" href="/zh/" hreflang="zh"><span class="language-switcher__endonym" lang="zh">中文</span> (중국어)</a></li>
      <li><a class="language-switcher__option" href="/ja/" hreflang="ja"><span class="language-switcher__endonym" lang="ja">日本語</span> (일본어)</a></li>
      <li><a class="language-switcher__option" href="/vi/" hreflang="vi"><span class="language-switcher__endonym" lang="vi">Tiếng Việt</span> (베트남어)</a></li>
    </ul>
  </div>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.language-switcher {
  position: relative;
  display: inline-flex;
}
.language-switcher__link,
.language-switcher__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2);
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-4);
  border: 0;
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-text-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
  cursor: pointer;
}
.language-switcher__link {
  text-decoration: underline;
}
.language-switcher__link:hover,
.language-switcher__toggle:hover {
  background-color: var(--color-button-text-fill-hover);
}
.language-switcher__icon {
  flex: none;
  inline-size: var(--space-scale-9);
  block-size: var(--space-scale-9);
  fill: currentColor;
}
.language-switcher__panel {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-end: 0;
  z-index: 10;
  min-inline-size: var(--size-height-11);
  margin-block-start: var(--space-gap-2);
  padding: var(--space-padding-3);
  border: var(--space-scale-1) solid var(--color-border-gray);
  border-radius: var(--radius-medium3);
  background-color: var(--color-surface-white);
  box-shadow: var(--shadow-2);
}
.language-switcher__panel[hidden] {
  display: none;
}
.language-switcher__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-1);
  margin: 0;
  padding: 0;
  list-style: none;
}
.language-switcher__option {
  display: flex;
  align-items: center;
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-4);
  border-radius: var(--radius-small3);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-small);
  text-decoration: none;
  white-space: nowrap;
}
.language-switcher__option:hover {
  background-color: var(--color-action-primary-hover);
}
.language-switcher__option[aria-current="true"] {
  background-color: var(--color-action-primary-selected);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}
.language-switcher__endonym {
  font-weight: var(--font-weight-bold);
}
.language-switcher__link:focus-visible,
.language-switcher__toggle:focus-visible,
.language-switcher__option:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **닫힘(기본)**: 열기 버튼 aria-expanded="false", 목록 패널에 hidden.
- **열림**: 열기 버튼 aria-expanded="true", 목록 패널의 hidden 을 뺀다.
- **별도 외국어 사이트를 새 창으로 열 때**: 각 옵션에 target="_blank" 를 주고, 링크 컴포넌트와 같은 새 창 아이콘(svg, aria-hidden="true")과 링크 안 숨긴 텍스트(.sr-only ' (새 창 열림)')을 함께 넣는다. title 속성만으로 알리지 않는다(NAV-012).
- **국가별 서비스가 다른 경우**: 국적·접속 국가에 따라 서비스나 정책이 달라질 때만 언어 이름 뒤에 국가명을 붙이고 언어 이름보다 작은 글자 크기 또는 낮은 굵기로 쓴다(COPY-039).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 열기 버튼 → (열려 있으면) 각 언어 옵션 순서로 옮긴다(A11Y-011). 초점 표시가 보인다(A11Y-016). |
| Enter / Space (열기 버튼) | 목록을 열고 닫는다(aria-expanded 전환). |
| Enter (언어 옵션) | 그 언어 화면으로 이동한다. |
| Esc | 목록 안 어디에 초점이 있든 목록을 닫고 초점을 열기 버튼으로 옮긴다(A11Y-040). |

## 동작
- 목록이 열린 상태에서 열기 버튼·목록 패널 밖을 클릭하면 목록을 닫고 aria-expanded="false" 로 바꾼다(A11Y-040).
- 마지막 언어 옵션에서 Tab 으로 목록 밖으로 나가면 목록을 닫는다. 초점을 목록 안에 가두지 않는다(A11Y-011).
- 언어를 바꾸면 이동한 화면의 html lang 이 그 언어이고, 숨긴 텍스트·aria-label 도 그 언어로 바뀌어 있어야 한다(A11Y-049).
- 링크형은 각 언어 화면에서 상대 언어 이름을 보인다 — 한국어 화면 'English', 영어 화면 '한국어'(COPY-037).
- 헤더가 햄버거 메뉴로 바뀌는 너비에서는 이 컴포넌트를 메뉴 레이어 안이나 푸터로 옮긴다(RESP-014).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-023 | MUST | 페이지 기본 언어와 다른 언어로 된 구절·문장에는 그 요소에 lang 속성으로 언어를 지정한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-040 | SHOULD | 셀렉트·언어 변경·화면 크기 조정 같은 드롭다운의 옵션 목록이 펼쳐진 상태에서 레이블·컨테이너·목록이 아닌 영역을 클릭하면 목록을 접고, Esc를 누르면 목록을 접은 뒤 초점을 컨테이너로 옮긴다. |
| A11Y-049 | SHOULD | 서비스 제공 언어를 바꾸면 숨긴 콘텐츠(스크린 리더 전용 텍스트·aria-label)의 텍스트도 같은 언어로 바꾼다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-015 | SHOULD | 언어 선택 메뉴와 언어 변경 링크에는 국기를 쓰지 않고, 각 언어의 이름을 그 언어로 쓴다(예: English, 日本語, 中文). |
| COPY-037 | SHOULD | 두 언어를 오가는 링크형 언어 변경은 각 화면에서 전환될 상대 언어의 이름을 표시하고, 레이블을 한 언어로 고정하거나 현재 언어 이름을 표시하지 않는다. |
| COPY-038 | SHOULD | 언어 변경 레이블을 언어 코드(EN, KO, JP 등)로 줄여 쓰지 않고 언어 이름을 쓴다. |
| COPY-039 | SHOULD | 언어 변경 레이블에 국가명을 쓰지 않고, 국적·접속 국가에 따라 서비스나 정책이 달라질 때만 국가명을 보조 정보로 붙이되 언어명보다 약하게(작은 글자 크기 또는 낮은 굵기) 표시한다. |
| COPY-040 | MAY | 언어 변경 드롭다운의 옵션은 '원어 이름 (현재 표시 언어로 쓴 이름)' 형식으로 쓴다(예: 한국어 화면에서 'English (영어)', '日本語 (일본어)'). |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| NAV-057 | SHOULD | 드롭다운형 언어 변경 버튼은 레이블 왼쪽에 지구본 아이콘을 표시한다. |
| NAV-058 | MAY | 지원 언어가 2개면 링크형 언어 변경을, 3개 이상이면 드롭다운형 언어 변경을 쓴다. |
| RESP-014 | SHOULD | 헤더가 햄버거 메뉴로 바뀌는 너비(RESP-005)에서는 언어 변경 컴포넌트를 햄버거 메뉴 레이어 안이나 푸터에 둔다. |

## KRDS 키트와의 관계
- 클래스 대응: `.language-switcher` ↔ `krds-drop-wrap krds-language`, `.language-switcher__toggle` ↔ `krds-btn drop-btn`, `.language-switcher__panel` ↔ `drop-menu`, `.language-switcher__list` ↔ `drop-list`, `.language-switcher__option` ↔ `item-link`
- KRDS 키트는 lang 을 링크 전체에 줘 '(영어)' 같은 한국어 부분까지 다른 언어로 표시한다 — 이 규격은 원어 이름만 lang 을 준 span 으로 감싼다(A11Y-023).
- KRDS 키트의 열기 버튼에는 aria-expanded·aria-controls 가 없다 — 이 규격은 APG 디스클로저 패턴의 상태를 노출한다(A11Y-025).
- KRDS 키트는 현재 언어를 active 클래스로만 표시한다 — 이 규격은 aria-current="true" 를 준다(A11Y-025).
- KRDS 키트(별도 사이트형)는 새 창 열림을 title="새 창 열림" 으로만 알린다 — 이 규격은 새 창 아이콘과 링크 안 숨긴 텍스트 '(새 창 열림)'으로 알린다(NAV-012).
