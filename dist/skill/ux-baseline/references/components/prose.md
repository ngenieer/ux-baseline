# 본문 텍스트 블록 (`.prose`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

제목·문단·목록·인라인 링크로 된 한국어 본문을 한 줄 40자 이하, 어절 단위 줄바꿈, 행간 1.5로 표시하는 블록이다.

## 대신 쓸 것
- 데이터 표·코드 블록 → .prose 밖의 표·코드 블록 컴포넌트(줄 길이 상한의 예외) (TYPO-031)
- 카드·배지·버튼처럼 컴포넌트 안의 짧은 텍스트 → 각 컴포넌트 규격의 텍스트 스타일

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.prose` | `div 또는 article` | 예 | max-inline-size: 40ic(TYPO-031, 린트 ux-baseline/prose-max-inline-size 기본 대상 .prose). 하위 요소는 클래스 없이 요소 선택자로 꾸민다. |
| 제목 | `.prose` | `h2~h4` |  | 구조는 h 요소로 표시한다(A11Y-007). 굵게만 처리한 p 를 제목처럼 쓰지 않는다. |
| 문단 | `.prose` | `p` |  |  |
| 목록 | `.prose` | `ul / ol / dl` |  |  |
| 인라인 링크 | `.prose` | `a` |  | 밑줄을 표시하고 주변 본문과 같은 글자 크기로 쓴다(TYPO-008, TYPO-013). 링크 텍스트만으로 목적지를 알 수 있게 쓴다(COPY-002). |

## 표준 마크업

```html
<div class="prose">
  <h2>신청 자격</h2>
  <p>신청일 기준으로 주민등록상 주소가 서울특별시에 있는 만 19세 이상 34세 이하 청년이 신청할 수 있습니다. 가구 소득 기준은 연도마다 바뀌므로 신청 전에 확인해 주세요.</p>
  <ul>
    <li>본인 명의의 무주택 임차 계약이 있어야 합니다.</li>
    <li>같은 지원금을 받고 있는 사람은 신청할 수 없습니다.</li>
  </ul>
  <p>자세한 소득 기준은 <a href="/guide/income">가구 소득 기준 안내</a>에서 확인해 주세요.</p>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.prose {
  max-inline-size: 40ic;
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-regular);
  line-height: var(--font-line-height-base);
  text-align: start;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.prose > * {
  margin-block: 0;
}
.prose > * + * {
  margin-block-start: var(--space-gap-6);
}
.prose > * + :is(h2, h3, h4) {
  margin-block-start: var(--space-gap-9);
}
.prose :is(h2, h3, h4) {
  color: var(--color-text-bolder);
  font-weight: var(--font-weight-bold);
  line-height: var(--font-line-height-base);
  text-wrap: balance;
}
.prose h2 {
  font-size: var(--font-size-heading-small);
}
.prose h3 {
  font-size: var(--font-size-heading-xsmall);
}
.prose h4 {
  font-size: var(--font-size-heading-xxsmall);
}
.prose :is(ul, ol) {
  padding-inline-start: var(--space-padding-8);
}
.prose li + li {
  margin-block-start: var(--space-gap-3);
}
.prose a {
  color: var(--color-link-default);
  font-size: inherit;
  text-decoration-line: underline;
}
.prose a:visited {
  color: var(--color-link-visited);
}
.prose a:hover {
  color: var(--color-link-hover);
}
.prose a:active {
  color: var(--color-link-pressed);
}
.prose a:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **텍스트 간격 사용자 조정**: 마크업 변화 없음. 행간 1.5배·문단 뒤 2배·자간 0.12배·단어 간격 0.16배를 덮어써도 잘림·겹침이 없어야 한다 — 높이·overflow: hidden 을 두지 않는다(TYPO-002).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 본문 안 링크로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). |

## 동작
- 한 줄 길이를 전각 40자(40ic) 이하로 제한한다. 표·코드 블록은 이 블록 밖에 둔다(TYPO-031).
- 한국어 줄바꿈은 word-break: keep-all 로 어절 단위로 하고, 긴 URL·영문 어절의 넘침은 overflow-wrap: anywhere 로 처리한다. break-all·break-word·line-break: anywhere 는 쓰지 않는다(TYPO-017, TYPO-018, TYPO-019, TYPO-020, TYPO-021).
- word-break: auto-phrase 를 추가하려면 같은 규칙 블록에서 keep-all 다음에 선언하고 lang="ko" 를 보장한다(TYPO-024).
- 글자 크기는 body-medium(17px, 16px 이상), 행간은 1.5(단위 없는 수)로 둔다(TYPO-003, TYPO-004, TYPO-005, TYPO-010).
- 양쪽 정렬을 쓰지 않고 시작 정렬한다(TYPO-025). 자간은 0 으로 두고 음수 자간을 쓰지 않는다(TYPO-028).
- text-wrap: balance 는 제목에만 쓴다(TYPO-022). 문단에 text-wrap: pretty 를 더하려면 대량 텍스트 화면의 렌더링 시간을 먼저 측정한다(TYPO-023).
- 본문 콘텐츠 영역의 최대 너비(LAYOUT-007)와는 별개다 — 콘텐츠 영역 안에서 이 블록이 줄 길이를 다시 제한한다.

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COPY-002 | MUST | 링크의 목적을 링크 텍스트만으로, 또는 링크 텍스트와 프로그램으로 판별되는 링크 맥락(같은 문장·문단·목록 항목·표 셀·aria-describedby)으로 알 수 있게 쓴다. |
| LAYOUT-007 | SHOULD | 본문 콘텐츠 영역에 최대 너비(max-width 또는 max-inline-size)를 지정해 뷰포트가 넓어져도 콘텐츠 영역이 그 값보다 넓어지지 않게 한다(KRDS 표준형: 사이드 메뉴 포함 1200px). |
| RESP-002 | MUST | 자막과 텍스트 이미지를 제외한 텍스트를 보조기술 없이 200%까지 확대해도 콘텐츠와 기능이 손실되지 않게 한다. |
| TYPO-002 | MUST | 사용자가 행간을 글자 크기의 1.5배, 문단 뒤 간격을 2배, 자간을 0.12배, 단어 간격을 0.16배 이상으로 바꿔도 콘텐츠와 기능이 손실되지 않게 한다. |
| TYPO-003 | SHOULD | 본문 텍스트의 글자 크기를 브라우저 기본 글자 크기가 16px일 때 계산값 16px(1rem) 이상으로 한다. |
| TYPO-004 | SHOULD | 본문 텍스트의 행간(line-height)을 글자 크기의 1.5배 이상으로 한다. |
| TYPO-005 | SHOULD | line-height 값은 px 같은 절대 단위가 아니라 단위 없는 수, em, % 중 하나로 지정한다. |
| TYPO-008 | SHOULD | 텍스트 밑줄은 링크에만 쓰고, 링크가 아닌 텍스트의 강조는 색이나 굵기로 표현한다. |
| TYPO-010 | SHOULD | KRDS 표준형 스타일을 적용하는 서비스는 국문·영문 모두 Pretendard GOV를 기본 서체로, 17px(브라우저 기본 16px 기준 1.0625rem)을 본문 기본 크기로 쓴다. |
| TYPO-013 | SHOULD | 문장 안에 들어가는 인라인 링크 텍스트는 주변 본문과 같은 글자 크기로 쓴다. |
| TYPO-017 | MAY | 한국어 본문·제목 텍스트 블록에 word-break: keep-all을 지정해 한글을 어절(띄어쓰기) 단위로 줄바꿈한다. |
| TYPO-018 | SHOULD | flex·grid 항목과 표 셀처럼 min-content 너비로 크기가 정해지는 컨테이너 안 텍스트의 넘침 방지에는 overflow-wrap: break-word 대신 overflow-wrap: anywhere를 쓴다. |
| TYPO-019 | SHOULD | word-break: break-word 값을 쓰지 않고, 같은 효과가 필요하면 word-break: normal과 overflow-wrap: anywhere를 쓴다. |
| TYPO-020 | MAY | 한국어 본문 텍스트에 word-break: break-all을 쓰지 않는다. |
| TYPO-021 | SHOULD | 본문 텍스트에 line-break: anywhere를 쓰지 않는다. |
| TYPO-022 | MAY | text-wrap: balance(또는 text-wrap-style: balance)는 제목(h1~h6)과 캡션(figcaption, caption)에만 쓰고 본문 문단(p)에는 쓰지 않는다. |
| TYPO-023 | MAY | 본문 문단에 text-wrap: pretty를 쓸 때는 이 선언을 지원하지 않는 브라우저에서 무시되어도 레이아웃이 깨지지 않게 하고, 대량 텍스트 화면에서는 렌더링 성능 영향을 측정한 뒤 적용한다. |
| TYPO-024 | MAY | word-break: auto-phrase를 쓸 때는 같은 규칙 블록에서 그 앞에 word-break: keep-all을 먼저 선언하고, 해당 요소의 lang이 ko로 판별되게 한다. |
| TYPO-025 | SHOULD | 본문 텍스트 블록에 text-align: justify를 쓰지 않고 text-align: start(가로쓰기 LTR에서는 left)로 한쪽 정렬한다. |
| TYPO-027 | SHOULD | font-size 값은 rem, em, % 중 하나로 지정하고 px·pt로 지정하지 않는다. |
| TYPO-028 | MAY | 본문 텍스트의 letter-spacing은 0(normal)으로 두고 음수 값을 쓰지 않는다. |
| TYPO-031 | SHOULD | 한국어 본문 텍스트 블록의 한 줄 길이를 전각 40자 이하로 제한한다(max-inline-size: 40ic 이하). |
| TYPO-032 | MUST | font-size·font-family·font-weight·line-height 값은 타이포그래피 토큰(var(--font-size-*), var(--font-family-*), var(--font-weight-*), var(--font-line-height-*))에서만 고르고 CSS에 수치나 서체 이름을 직접 쓰지 않는다. |
