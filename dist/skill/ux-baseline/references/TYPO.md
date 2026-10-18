# TYPO — 타이포그래피

ux-baseline 확정 룰. 자동 생성 파일이다.

| ID | 강도 | 룰 |
|---|---|---|
| TYPO-001 | MUST | CSS로 같은 시각 표현을 낼 수 있는 텍스트 정보는 텍스트 이미지가 아닌 실제 텍스트로 제공한다. |
| TYPO-002 | MUST | 사용자가 행간을 글자 크기의 1.5배, 문단 뒤 간격을 2배, 자간을 0.12배, 단어 간격을 0.16배 이상으로 바꿔도 콘텐츠와 기능이 손실되지 않게 한다. |
| TYPO-032 | MUST | font-size·font-family·font-weight·line-height 값은 타이포그래피 토큰(var(--font-size-*), var(--font-family-*), var(--font-weight-*), var(--font-line-height-*))에서만 고르고 CSS에 수치나 서체 이름을 직접 쓰지 않는다. |
| TYPO-003 | SHOULD | 본문 텍스트의 글자 크기를 브라우저 기본 글자 크기가 16px일 때 계산값 16px(1rem) 이상으로 한다. |
| TYPO-004 | SHOULD | 본문 텍스트의 행간(line-height)을 글자 크기의 1.5배 이상으로 한다. |
| TYPO-005 | SHOULD | line-height 값은 px 같은 절대 단위가 아니라 단위 없는 수, em, % 중 하나로 지정한다. |
| TYPO-008 | SHOULD | 텍스트 밑줄은 링크에만 쓰고, 링크가 아닌 텍스트의 강조는 색이나 굵기로 표현한다. |
| TYPO-010 | SHOULD | KRDS 표준형 스타일을 적용하는 서비스는 국문·영문 모두 Pretendard GOV를 기본 서체로, 17px(브라우저 기본 16px 기준 1.0625rem)을 본문 기본 크기로 쓴다. |
| TYPO-012 | SHOULD | 푸터의 '개인정보 처리방침' 링크는 글자 크기·색·굵기 중 하나 이상을 다른 고지 링크(이용약관, 저작권 안내 등)와 다르게 표시한다. |
| TYPO-013 | SHOULD | 문장 안에 들어가는 인라인 링크 텍스트는 주변 본문과 같은 글자 크기로 쓴다. |
| TYPO-014 | SHOULD | 배지 문구는 기본 글자 크기에서 한 줄로 표시되는 길이로 쓰고, white-space: nowrap으로 줄바꿈을 막지 않아 텍스트 확대·좁은 화면에서는 줄바꿈되게 한다. |
| TYPO-015 | SHOULD | 표 데이터 셀(td)의 텍스트는 3줄 이하로 표시되게 쓴다. |
| TYPO-016 | SHOULD | 표에서 양적 데이터(개수·퍼센트·용량 등) 셀은 오른쪽 정렬하고, 텍스트와 명목 데이터(날짜·우편번호·전화번호·IP 주소 등) 셀은 왼쪽 정렬한다. |
| TYPO-018 | SHOULD | flex·grid 항목과 표 셀처럼 min-content 너비로 크기가 정해지는 컨테이너 안 텍스트의 넘침 방지에는 overflow-wrap: break-word 대신 overflow-wrap: anywhere를 쓴다. |
| TYPO-019 | SHOULD | word-break: break-word 값을 쓰지 않고, 같은 효과가 필요하면 word-break: normal과 overflow-wrap: anywhere를 쓴다. |
| TYPO-021 | SHOULD | 본문 텍스트에 line-break: anywhere를 쓰지 않는다. |
| TYPO-025 | SHOULD | 본문 텍스트 블록에 text-align: justify를 쓰지 않고 text-align: start(가로쓰기 LTR에서는 left)로 한쪽 정렬한다. |
| TYPO-026 | SHOULD | html(:root) 요소의 font-size를 px로 지정하지 않고, 지정이 필요하면 %로 지정해 사용자의 브라우저 기본 글자 크기 설정을 따르게 한다. |
| TYPO-027 | SHOULD | font-size 값은 rem, em, % 중 하나로 지정하고 px·pt로 지정하지 않는다. |
| TYPO-030 | SHOULD | font-family 목록의 마지막에 generic family(sans-serif, serif, monospace 등)를 둔다. |
| TYPO-031 | SHOULD | 한국어 본문 텍스트 블록의 한 줄 길이를 전각 40자 이하로 제한한다(max-inline-size: 40ic 이하). |
| TYPO-006 | MAY | 한 서비스에서 쓰는 font-weight 값을 4종 이하로 하고, 300 이하(thin·extra light·light)와 800 이상(extra bold·black) 값은 쓰지 않는다. |
| TYPO-007 | MAY | 타입 스케일을 새로 정할 때 제목(heading)과 본문 글자 크기 비율을 1.25~1.5배 범위에서 정한다. |
| TYPO-009 | MAY | 본문과 제목에는 고딕(산세리프) 계열 서체를 쓰고, 고딕 계열이 아닌 자체 서체는 디스플레이·배너 영역에만 쓴다. |
| TYPO-011 | MAY | rem 환산을 10px 기준으로 단순화하려면 html의 font-size를 62.5%로 지정하고, 10px 같은 px 값으로 지정하지 않는다. |
| TYPO-017 | MAY | 한국어 본문·제목 텍스트 블록에 word-break: keep-all을 지정해 한글을 어절(띄어쓰기) 단위로 줄바꿈한다. |
| TYPO-020 | MAY | 한국어 본문 텍스트에 word-break: break-all을 쓰지 않는다. |
| TYPO-022 | MAY | text-wrap: balance(또는 text-wrap-style: balance)는 제목(h1~h6)과 캡션(figcaption, caption)에만 쓰고 본문 문단(p)에는 쓰지 않는다. |
| TYPO-023 | MAY | 본문 문단에 text-wrap: pretty를 쓸 때는 이 선언을 지원하지 않는 브라우저에서 무시되어도 레이아웃이 깨지지 않게 하고, 대량 텍스트 화면에서는 렌더링 성능 영향을 측정한 뒤 적용한다. |
| TYPO-024 | MAY | word-break: auto-phrase를 쓸 때는 같은 규칙 블록에서 그 앞에 word-break: keep-all을 먼저 선언하고, 해당 요소의 lang이 ko로 판별되게 한다. |
| TYPO-028 | MAY | 본문 텍스트의 letter-spacing은 0(normal)으로 두고 음수 값을 쓰지 않는다. |
| TYPO-029 | MAY | letter-spacing을 0이 아닌 값으로 지정할 때는 em 단위로 지정한다. |

## TYPO-001 텍스트 이미지 금지

- 강도: **MUST**
- 룰: CSS로 같은 시각 표현을 낼 수 있는 텍스트 정보는 텍스트 이미지가 아닌 실제 텍스트로 제공한다.
- 측정 기준: 글자가 들어 있는 이미지(img, svg 안의 래스터, CSS background-image, canvas)마다 다음 중 하나에 해당해야 통과: (1) 로고·브랜드명의 일부, (2) 특정 글자 표현이 정보 전달에 필수, (3) 사용자가 글꼴·크기·색·배경을 바꿀 수 있는 이미지. 해당하지 않으면 실패.
- 판정 방법: 수동: 페이지의 이미지 목록을 뽑아(DevTools 또는 스크립트) 글자가 들어 있는 이미지를 찾고, 각 이미지가 위 예외 (1)~(3) 중 하나인지 확인한다.
- 자동 검사: none
- 적용 대상: img, svg image, [style*=background-image], canvas
- 예외: 사용자가 요구에 맞게 시각적으로 바꿀 수 있는 텍스트 이미지 (WCAG 1.4.5)
- 예외: 특정 텍스트 표현이 전달하는 정보에 필수인 경우 — 로고·브랜드명은 필수로 본다 (WCAG 1.4.5 Note)
- 근거: 텍스트 이미지는 사용자가 글자 크기·색·간격을 바꾸거나 확대할 때 깨지거나 바뀌지 않아 저시력·읽기 장애 사용자가 내용을 인지하기 어렵다.
- 출처: WCAG22 SC 1.4.5 Images of Text (Level AA); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html; KRDS 기본 패턴 > 상세 정보 확인 > 접근성 가이드라인 (가이드라인 PDF 2025.08 826쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 422·442쪽)

좋은 예 — CSS로 같은 표현을 낸 실제 텍스트라 확대·번역·스크린리더가 가능하다
```html
<h2 class="promo-title">가을 할인 30%</h2>
<style>.promo-title{font:700 2rem/1.5 sans-serif;color:var(--palette-point-60)}</style>
```
나쁜 예 — CSS로 낼 수 있는 제목을 글자 이미지로 넣었다
```html
<img src="promo-title.png" alt="가을 할인 30%">
```

## TYPO-002 텍스트 간격 조정 허용

- 강도: **MUST**
- 룰: 사용자가 행간을 글자 크기의 1.5배, 문단 뒤 간격을 2배, 자간을 0.12배, 단어 간격을 0.16배 이상으로 바꿔도 콘텐츠와 기능이 손실되지 않게 한다.
- 측정 기준: 모든 요소에 line-height:1.5 !important; letter-spacing:0.12em !important; word-spacing:0.16em !important, 문단(p)에 margin-bottom:2em !important 를 덮어씌운 상태에서 텍스트 잘림(overflow:hidden에 의한 가림), 텍스트끼리 겹침, 컨트롤 사용 불가가 0건이면 통과.
- 판정 방법: 수동+스크립트: 위 스타일을 주입하는 북마클릿(WCAG Understanding 1.4.12 Test Rules 참고)을 적용하고 주요 화면을 육안 비교한다. 보조로 요소별 scrollHeight > clientHeight 이면서 overflow:hidden 인 텍스트 요소를 스크립트로 찾는다.
- 자동 검사: partial (axe-core/avoid-inline-spacing)
- 적용 대상: 마크업 언어로 구현한 모든 텍스트
- 예외: 해당 언어·문자 체계가 쓰지 않는 텍스트 스타일 속성은 제외하고, 존재하는 속성만으로 충족할 수 있다 (WCAG 1.4.12 Exception)
- 결정 CF-018: 양립. TYPO-004는 기본값, TYPO-002는 사용자가 값을 바꿨을 때의 손실 금지다. 둘 다 적용한다.
- 근거: 저시력·난독증 사용자는 행간·자간·단어 간격을 넓혀 읽는다. 고정 높이·overflow:hidden 등으로 이 재정의가 내용을 가리면 정보를 잃는다.
- 출처: WCAG22 SC 1.4.12 Text Spacing (Level AA); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html; KRDS 디자인 스타일 > 타이포그래피 > 줄 간격 (가이드라인 PDF 2025.08 105쪽)

좋은 예 — 높이가 최소값이라 간격을 늘리면 카드가 함께 늘어난다
```html
<div class="card"><p>신청 서류는 10월 31일까지 제출해 주세요.</p></div>
<style>.card{min-height:6rem}</style>
```
나쁜 예 — 고정 높이와 overflow:hidden 때문에 간격을 늘리면 글자가 잘린다
```html
<div class="card"><p>신청 서류는 10월 31일까지 제출해 주세요.</p></div>
<style>.card{height:6rem;overflow:hidden}</style>
```

## TYPO-032 글자 크기·서체·두께·행간은 토큰만 사용

- 강도: **MUST**
- 룰: font-size·font-family·font-weight·line-height 값은 타이포그래피 토큰(var(--font-size-*), var(--font-family-*), var(--font-weight-*), var(--font-line-height-*))에서만 고르고 CSS에 수치나 서체 이름을 직접 쓰지 않는다.
- 측정 기준: 작성한 CSS에서 font-size·font-family·font-weight·line-height(및 font 단축 속성을 펼친 값)가 var(--font-*) 또는 키워드(inherit, initial, unset, revert)다. line-height에 px 단위가 0건이다. KRDS 키트 등 외부 CSS 파일은 검사 대상 파일에서 뺀다(stylelint 실행 대상·.stylelintignore, CF-049).
- 판정 방법: stylelint scale-unlimited/declaration-strict-value(expandShorthand)와 unit-disallowed-list(line-height px)로 검사한다.
- 자동 검사: partial (stylelint/scale-unlimited/declaration-strict-value, stylelint/declaration-property-unit-disallowed-list)
- 적용 대상: 작성한 CSS (외부 키트 CSS 제외, CF-049)
- 예외: 외부 라이브러리·KRDS 키트 원본 CSS(CF-049)
- 예외: 아이콘 글꼴처럼 서체 자체가 콘텐츠인 경우의 font-family
- 결정 CF-024: SPACE-001, SHAPE-001, MOTION-010을 MUST로 올린다. 색·타이포 토큰 강제 룰은 COLOR-022·TYPO-032(MUST)로 새로 만든다(4단계 토큰 정의 후). 다섯 룰 모두 프로젝트가 작성한 CSS·JS에만 적용하고, 외부 라이브러리·KRDS 키트 원본 CSS는 검사 대상에서 뺀다(CF-049).
- 결정 CF-049: TYPO-017·020을 유지한다. KRDS 키트를 쓰는 프로젝트는 키트 CSS를 검사 대상에서 빼고 프로젝트 CSS에만 적용한다: 선언을 보는 검사(stylelint — TYPO-020·COLOR-022·TYPO-032)는 키트 CSS 파일을 실행 대상(.stylelintignore)에서 빼고, 계산 스타일로 판정하는 검사(TYPO-017·TYPO-020)는 키트 CSS 파일을 불러오지 않은 상태로 페이지를 렌더링해 판정한다.
- 근거: 글자 크기 토큰은 rem 기반이고 PC(1024px 이상)에서 반응형 값으로 바뀐다. 직접 쓴 px 값은 브라우저 글자 크기 설정과 반응형 단계를 따르지 않는다.
- 출처: UXB_CHARTER 디자인 토큰; KRDS 디자인 스타일 > 타이포그래피 (가이드라인 PDF 2025.08 104·107·110~117쪽)

좋은 예 — 타이포 토큰만 쓴다
```css
body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-regular);
  line-height: var(--font-line-height-base);
}
```
나쁜 예 — 서체·크기·행간을 직접 써서 반응형 단계와 사용자 글자 크기 설정을 따르지 않는다
```css
body {
  font-family: "Malgun Gothic";
  font-size: 15px;
  line-height: 22px;
}
```

## TYPO-003 본문 최소 글자 크기

- 강도: **SHOULD**
- 룰: 본문 텍스트의 글자 크기를 브라우저 기본 글자 크기가 16px일 때 계산값 16px(1rem) 이상으로 한다.
- 측정 기준: 브라우저 기본 글자 크기 16px, 확대 100% 상태에서 (1) 본문 텍스트 요소(main 안의 p, li, td, dd, 본문 영역의 span 등)의 getComputedStyle().fontSize 가 16px 이상. (2) 부가 설명·주석 텍스트는 (1) 대신 13px(KRDS body xsmall, 0.8125rem) 이상으로 판정한다. 부가 설명 = KRDS body small 용도('덜 중요한 정보나 부가적인 설명 문구'): 입력 컴포넌트의 도움말(*__hint, *__description)과 필드 아래 시스템 메시지(*__message — KRDS 키트 form-hint-invalid, 도움말과 같은 hint 계열), 글자 수·개수(*__count), 처리 중 상태 텍스트(spinner__text), 캡션(caption, figcaption, *__caption), 파일 크기 같은 메타 정보(*__meta). 주석 = KRDS body xsmall 용도('주석, 보조 설명 또는 부가적인 정보'): 각주(small), 출처·저작권 표기. 이 목록에 들지 않는 텍스트(안내 문단, 표 셀 데이터, 목록 항목, 대화상자 본문 등)는 (1)로 판정한다.
- 판정 방법: Playwright 등으로 본문 영역 텍스트 노드의 부모 요소 계산 글자 크기를 수집해, (2)의 부가 설명·주석 셀렉터에 해당하면 13px 미만, 그 밖은 16px 미만 요소를 보고한다. 본문 여부는 main 안의 문단·목록·표 셀로 판정.
- 자동 검사: none
- 적용 대상: main p, main li, main td, main dd
- 예외: 부가 설명·주석 텍스트(측정 기준 (2)의 목록)는 KRDS 글자 스케일의 body small(15px)·xsmall(13px)을 쓸 수 있다 — KRDS 타이포그래피 '계층별 사용' 표.
- 근거: KRDS는 디지털 취약계층을 포함한 모든 사용자가 읽을 수 있도록 본문 최소 크기를 16px로 정한다.
- 출처: KRDS 디자인 스타일 > 타이포그래피 > 기본 사이즈 (가이드라인 PDF 2025.08 107쪽)

좋은 예 — 본문 계산값이 16px 이상이다
```css
:root{font-size:100%}
body{font-size:1.0625rem} /* 기본 16px에서 17px */
```
좋은 예 — 입력 도움말은 부가 설명이라 15px 를 쓸 수 있다
```css
.text-field__hint{font-size:var(--font-size-body-small)} /* 15px 부가 설명 — (2)로 판정, 13px 이상 */
```
나쁜 예 — 본문이 13px로 16px 미만이다
```css
body{font-size:0.8125rem} /* 기본 16px에서 13px */
```
나쁜 예 — 부가 설명 목록에 없는 안내 문단은 본문이라 16px 이상이어야 한다
```css
.notice p{font-size:var(--font-size-body-small)} /* 안내 문단을 15px 로 */
```

## TYPO-004 본문 행간 150% 이상

- 강도: **SHOULD**
- 룰: 본문 텍스트의 행간(line-height)을 글자 크기의 1.5배 이상으로 한다.
- 측정 기준: 본문 텍스트 요소의 계산값 line-height(px) ÷ font-size(px) ≥ 1.5. line-height: normal 은 실패로 본다.
- 판정 방법: 계산 스타일 수집 스크립트로 main 안 문단·목록 요소의 비율을 계산한다. 소스 단계에서는 stylelint 커스텀으로 본문 셀렉터의 line-height 값이 1.5(또는 150%) 미만인지 검사.
- 자동 검사: none
- 적용 대상: main p, main li, main dd
- 결정 CF-018: 양립. TYPO-004는 기본값, TYPO-002는 사용자가 값을 바꿨을 때의 손실 금지다. 둘 다 적용한다.
- 근거: 줄 간격이 좁으면 시각적 피로가 늘고 저시력·난독증 사용자의 읽기가 어려워진다(KRDS). WCAG 1.4.8(AAA)도 문단 안 줄 간격을 1.5 이상으로 요구한다.
- 출처: KRDS 디자인 스타일 > 타이포그래피 > 줄 간격 (가이드라인 PDF 2025.08 105·124쪽); WCAG22_UNDERSTANDING SC 1.4.8 Visual Presentation; C21; KRDS 스타일 가이드 > 타이포그래피 > 줄 간격 (가이드라인 PDF 2025.08 105쪽); KLREQ 7.4.1 Line Spacing; SHIN_PARK_2003 결과 — 줄 간격

좋은 예 — 행간이 글자 크기의 1.5배다
```css
main p{font-size:1.0625rem;line-height:1.5}
```
나쁜 예 — 행간이 1.2배로 1.5배 미만이다
```css
main p{font-size:1.0625rem;line-height:1.2}
```

## TYPO-005 행간을 상대 단위로

- 강도: **SHOULD**
- 룰: line-height 값은 px 같은 절대 단위가 아니라 단위 없는 수, em, % 중 하나로 지정한다.
- 측정 기준: 스타일시트와 인라인 style의 line-height 선언 값에 px, pt, cm, mm, in, pc, Q 단위가 0건. 디자인 토큰의 line-height 값도 단위 없는 수 또는 %.
- 판정 방법: stylelint declaration-property-unit-disallowed-list 로 소스 검사.
- 자동 검사: full (stylelint/declaration-property-unit-disallowed-list)
- 적용 대상: line-height 선언 전체
- 근거: 글자 크기가 바뀌어도 행간이 비례해 바뀌어야 확대·글자 크기 조정 시 줄이 겹치지 않는다(KRDS).
- 출처: KRDS 디자인 스타일 > 타이포그래피 > 줄 간격 (가이드라인 PDF 2025.08 105쪽)

좋은 예 — 단위 없는 수라 글자 크기가 바뀌어도 비율이 유지된다
```css
body{line-height:1.5}
```
나쁜 예 — px 고정이라 글자를 키우면 줄이 겹친다
```css
body{line-height:24px}
```

## TYPO-008 밑줄은 링크에만

- 강도: **SHOULD**
- 룰: 텍스트 밑줄은 링크에만 쓰고, 링크가 아닌 텍스트의 강조는 색이나 굵기로 표현한다.
- 측정 기준: a[href], [role=link] 및 그 자손이 아닌 텍스트 요소 중 계산값 text-decoration-line 에 underline 이 포함된 요소가 0건(브라우저 기본 밑줄 요소 u·ins·abbr[title]은 별도 검토 목록으로 보고).
- 판정 방법: 계산 스타일 수집 스크립트(커스텀). 소스 단계에서는 링크가 아닌 셀렉터의 text-decoration: underline 선언을 찾는다.
- 자동 검사: none
- 적용 대상: 링크가 아닌 텍스트
- 근거: 밑줄은 웹에서 링크를 나타내는 관습이라 링크가 아닌 텍스트에 쓰면 사용자가 링크로 오인한다(KRDS).
- 출처: KRDS 디자인 스타일 > 타이포그래피 > 사용 가이드 (가이드라인 PDF 2025.08 125쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 285쪽)

좋은 예 — 강조를 굵기와 색으로 표현해 링크와 혼동되지 않는다
```html
<p>신청 기한은 <strong class="emph">10월 31일</strong>까지입니다.</p>
<style>.emph{font-weight:700;color:var(--palette-primary-60)}</style>
```
나쁜 예 — 링크가 아닌 강조에 밑줄을 써서 링크로 오인된다
```html
<p>신청 기한은 <span class="emph">10월 31일</span>까지입니다.</p>
<style>.emph{text-decoration:underline}</style>
```

## TYPO-010 공공 표준형 기본 서체·크기

- 강도: **SHOULD**
- 룰: KRDS 표준형 스타일을 적용하는 서비스는 국문·영문 모두 Pretendard GOV를 기본 서체로, 17px(브라우저 기본 16px 기준 1.0625rem)을 본문 기본 크기로 쓴다.
- 측정 기준: body의 계산값 font-family 첫 항목이 "Pretendard GOV"이고, 브라우저 기본 글자 크기 16px에서 본문(body medium) 계산값 font-size가 17px.
- 판정 방법: 계산 스타일 수집 스크립트 또는 토큰 검사(본문 기본 크기 토큰 = 17px 상당).
- 자동 검사: none
- 적용 대상: KRDS 표준형 스타일 적용 공공 서비스
- 예외: KRDS 표준형을 적용하지 않는 서비스(확장형·일반 프로젝트)에는 적용하지 않는다
- 결정 CF-014: KRDS 표준형 서비스는 font-display: optional 대신 PERF-005의 두 번째 방법(폴백 글꼴 메트릭 맞춤)을 쓴다.
- 근거: KRDS 표준형은 공공기관 접근성·가독성에 맞춘 Pretendard GOV를 쓰며, 이 서체가 다른 서체보다 작아 보이므로 기본 크기를 17px로 정했다.
- 출처: KRDS 디자인 스타일 > 타이포그래피 > 서체 / 기본 사이즈 (가이드라인 PDF 2025.08 103·107·113쪽)

좋은 예 — 표준형 기본 서체와 17px 본문 크기
```css
body{font-family:"Pretendard GOV",sans-serif;font-size:1.0625rem} /* 17px */
```
나쁜 예 — 표준형인데 본문이 16px이다
```css
body{font-family:"Pretendard GOV",sans-serif;font-size:1rem} /* 16px */
```

## TYPO-012 푸터 개인정보 처리방침 링크 구분

- 강도: **SHOULD**
- 룰: 푸터의 '개인정보 처리방침' 링크는 글자 크기·색·굵기 중 하나 이상을 다른 고지 링크(이용약관, 저작권 안내 등)와 다르게 표시한다.
- 측정 기준: 푸터 안 '개인정보 처리방침' 링크의 계산값 font-size, color, font-weight 중 1개 이상이 같은 푸터의 다른 정책·고지 링크 각각과 다르다.
- 판정 방법: 스크립트: footer a 중 텍스트가 '개인정보 처리방침'인 링크와 나머지 정책 링크의 계산 스타일을 비교한다.
- 자동 검사: none
- 적용 대상: footer, 푸터 정책 링크
- 근거: 정보주체가 개인정보 처리방침을 쉽게 찾아 확인할 수 있게 하려는 것(KRDS 푸터). 개인정보 보호 법령상 공개 의무와 연결된다(법령 원문은 미등록 — 제안 파일 new_sources).
- 출처: KRDS 컴포넌트 > 푸터 > 사용성 가이드라인 (가이드라인 PDF 2025.08 249쪽)

좋은 예 — 개인정보 처리방침만 굵게 표시해 다른 고지 링크와 구분된다
```html
<ul class="footer-policy">
  <li><a href="/privacy" class="is-privacy">개인정보 처리방침</a></li>
  <li><a href="/terms">이용약관</a></li>
</ul>
<style>.footer-policy .is-privacy{font-weight:700}</style>
```
나쁜 예 — 개인정보 처리방침이 다른 고지 링크와 크기·색·굵기가 모두 같다
```html
<ul class="footer-policy">
  <li><a href="/privacy">개인정보 처리방침</a></li>
  <li><a href="/terms">이용약관</a></li>
</ul>
```

## TYPO-013 인라인 링크 글자 크기

- 강도: **SHOULD**
- 룰: 문장 안에 들어가는 인라인 링크 텍스트는 주변 본문과 같은 글자 크기로 쓴다.
- 측정 기준: p, li, td, dd 안에서 텍스트 노드와 형제로 놓인 a[href]의 계산값 font-size가 부모 요소의 계산값 font-size와 같다.
- 판정 방법: 커스텀 DOM 스크립트로 비교.
- 자동 검사: none
- 적용 대상: p a[href], li a[href], td a[href], dd a[href]
- 근거: 링크만 크기가 다르면 문장 흐름이 끊기고 시각적 위계가 어긋난다(KRDS 링크).
- 출처: KRDS 컴포넌트 > 링크 > 사용성 가이드라인 (가이드라인 PDF 2025.08 499~500쪽)

좋은 예 — 링크가 주변 본문과 같은 크기다
```html
<p>자세한 내용은 <a href="/guide">신청 안내</a>를 확인해 주세요.</p>
```
나쁜 예 — 인라인 링크만 작게 표시했다
```html
<p>자세한 내용은 <a href="/guide" class="link-sm">신청 안내</a>를 확인해 주세요.</p>
<style>.link-sm{font-size:0.875em}</style>
```

## TYPO-014 배지 텍스트 한 줄

- 강도: **SHOULD**
- 룰: 배지 문구는 기본 글자 크기에서 한 줄로 표시되는 길이로 쓰고, white-space: nowrap으로 줄바꿈을 막지 않아 텍스트 확대·좁은 화면에서는 줄바꿈되게 한다.
- 측정 기준: (1) 기본 확대(100%)·서비스가 지원하는 각 레이아웃 기준 너비에서 배지 요소의 텍스트 줄 수(요소 내용 높이 ÷ 계산값 line-height, 반올림)가 1. (2) 배지 요소의 계산된 white-space가 nowrap이 아니다.
- 판정 방법: 커스텀 스크립트로 배지 셀렉터(.badge 등)의 줄 수를 계산한다.
- 자동 검사: partial (ux-baseline-check/badge-nowrap)
- 적용 대상: 배지
- 결정 CF-045: 배지 문구를 짧게 써서 기본 크기에서 한 줄을 유지하고, white-space: nowrap으로 강제하지 않는다. 확대·좁은 화면에서는 줄바꿈을 허용한다.
- 근거: 배지는 핵심 정보를 빠르게 파악하도록 하는 짧은 표식이라 줄바꿈되면 인지가 늦어진다(KRDS 배지).
- 출처: KRDS 컴포넌트 > 배지 > 사용성 가이드라인 (가이드라인 PDF 2025.08 401~402쪽)

좋은 예 — 짧은 문구라 기본 크기에서 한 줄이고, nowrap 없이 확대 시 줄바꿈된다
```html
<span class="badge">신규</span>
```
나쁜 예 — 문구가 길어 기본 크기에서 두 줄로 표시된다
```html
<span class="badge">추가 서류 제출 후 처리 대기 중</span>
```

## TYPO-015 표 셀 텍스트 3줄 이하

- 강도: **SHOULD**
- 룰: 표 데이터 셀(td)의 텍스트는 3줄 이하로 표시되게 쓴다.
- 측정 기준: 서비스가 지원하는 각 레이아웃 기준 너비에서 모든 td의 텍스트 줄 수(내용 높이 ÷ 계산값 line-height, 반올림) ≤ 3.
- 판정 방법: 커스텀 스크립트로 표 셀 줄 수를 계산한다.
- 자동 검사: none
- 적용 대상: table td
- 근거: 셀 텍스트가 길면 행 높이가 커져 한 화면에서 비교할 수 있는 데이터가 줄어든다(KRDS 표).
- 출처: KRDS 컴포넌트 > 표 > 사용성 가이드라인 (가이드라인 PDF 2025.08 464쪽)

좋은 예 — 핵심만 담아 한 줄로 표시된다
```html
<td>2026. 10. 18. 접수</td>
```
나쁜 예 — 셀 텍스트가 3줄을 넘는다
```html
<td>2026년 10월 18일에 접수되어 담당 부서에서 서류를 검토하고 있으며 추가 서류가 필요한 경우 별도로 연락드릴 예정입니다.</td>
```

## TYPO-016 표 숫자 오른쪽 정렬

- 강도: **SHOULD**
- 룰: 표에서 양적 데이터(개수·퍼센트·용량 등) 셀은 오른쪽 정렬하고, 텍스트와 명목 데이터(날짜·우편번호·전화번호·IP 주소 등) 셀은 왼쪽 정렬한다.
- 측정 기준: 양적 데이터 열의 td 계산값 text-align이 right(가로쓰기 LTR에서 end 포함), 텍스트·명목 데이터 열의 td가 left(LTR에서 start 포함).
- 판정 방법: 수동+스크립트: 열마다 데이터 유형(양적/명목/텍스트)을 사람이 표시하고, 스크립트로 해당 열 셀의 계산값 text-align을 확인한다.
- 자동 검사: none
- 적용 대상: table td
- 근거: 숫자를 오른쪽 정렬하면 자릿수와 단위 기호(, % KB 등)가 같은 위치에 놓여 비교가 쉽고, 텍스트·명목 데이터는 왼쪽 정렬해야 일정한 위치에서 읽기를 시작할 수 있다(KRDS 표).
- 출처: KRDS 컴포넌트 > 표 > 사용성 가이드라인 (가이드라인 PDF 2025.08 462·464~465쪽)

좋은 예 — 양적 데이터는 오른쪽, 날짜(명목 데이터)는 왼쪽 정렬이다
```html
<td class="num">1,234</td><td>2026. 10. 18.</td>
<style>td.num{text-align:right}</style>
```
나쁜 예 — 양적 데이터를 가운데 정렬해 자릿수 비교가 어렵다
```html
<td class="num">1,234</td><td>2026. 10. 18.</td>
<style>td.num{text-align:center}</style>
```

## TYPO-018 min-content 계산에는 anywhere

- 강도: **SHOULD**
- 룰: flex·grid 항목과 표 셀처럼 min-content 너비로 크기가 정해지는 컨테이너 안 텍스트의 넘침 방지에는 overflow-wrap: break-word 대신 overflow-wrap: anywhere를 쓴다.
- 측정 기준: display가 flex·grid인 요소의 자식, td·th 셀렉터에 overflow-wrap(word-wrap): break-word 선언이 0건. 넘침 방지가 필요한 곳은 overflow-wrap: anywhere.
- 판정 방법: stylelint 커스텀(셀렉터 문맥 판단 필요) 또는 런타임 검사로 scrollWidth > clientWidth 인 flex·grid 항목·셀을 찾는다.
- 자동 검사: partial (stylelint/ux-baseline/flex-grid-child-no-break-word)
- 적용 대상: flex 항목, grid 항목, td, th
- 근거: break-word가 만든 줄바꿈 기회는 min-content 계산에 들어가지 않아, flex 항목·표 셀이 긴 URL·영문 토큰 길이만큼 늘어나 레이아웃을 넘친다. anywhere는 min-content 계산에 반영된다.
- 출처: CSS_TEXT_3 5.4 overflow-wrap (anywhere vs break-word); MDN_BCD css.properties.overflow-wrap.anywhere

좋은 예 — anywhere는 min-content 계산에 반영되어 flex 항목이 줄어든다
```css
.card{display:flex}
.card__body{min-width:0;overflow-wrap:anywhere}
```
나쁜 예 — break-word는 min-content에 반영되지 않아 긴 URL이 카드 밖으로 넘친다
```css
.card{display:flex}
.card__body{overflow-wrap:break-word}
```

## TYPO-019 폐기 예정 word-break: break-word 금지

- 강도: **SHOULD**
- 룰: word-break: break-word 값을 쓰지 않고, 같은 효과가 필요하면 word-break: normal과 overflow-wrap: anywhere를 쓴다.
- 측정 기준: 스타일시트·인라인 style에서 word-break: break-word 선언이 0건.
- 판정 방법: stylelint declaration-property-value-disallowed-list.
- 자동 검사: full (stylelint/declaration-property-value-disallowed-list)
- 적용 대상: word-break 선언 전체
- 근거: word-break: break-word는 레거시 호환용으로 남은 deprecated 값이며 word-break: normal + overflow-wrap: anywhere와 같은 효과다.
- 출처: CSS_TEXT_3 5.1 word-break (legacy break-word)

좋은 예 — 폐기 예정 키워드 대신 같은 효과의 표준 조합을 쓴다
```css
.url{word-break:normal;overflow-wrap:anywhere}
```
나쁜 예 — deprecated 키워드 break-word를 쓴다
```css
.url{word-break:break-word}
```

## TYPO-021 line-break: anywhere 금지

- 강도: **SHOULD**
- 룰: 본문 텍스트에 line-break: anywhere를 쓰지 않는다.
- 측정 기준: 스타일시트·인라인 style에서 본문 요소에 적용되는 line-break: anywhere 선언이 0건(white-space: pre·break-spaces 로 표시하는 코드·터미널 출력 요소는 판정에서 뺀다).
- 판정 방법: stylelint declaration-property-value-disallowed-list.
- 자동 검사: full (stylelint/declaration-property-value-disallowed-list)
- 적용 대상: 본문 텍스트
- 근거: line-break: anywhere는 구두점 주변·단어 중간까지 모든 글자 단위에서 줄을 바꿔, 닫는 괄호·마침표가 줄 첫머리에 오는 등 한글 조판 금칙을 깨뜨린다.
- 출처: CSS_TEXT_3 5.2 line-break (anywhere); KLREQ 7.1.2 글줄 시작 금칙, 7.1.3 글줄 끝 금칙

좋은 예 — 금칙을 지켜 닫는 괄호·마침표가 줄 첫머리에 오지 않는다
```css
p{line-break:auto}
```
나쁜 예 — 금칙을 무시해 마침표·닫는 괄호가 줄 첫머리에 올 수 있다
```css
p{line-break:anywhere}
```

## TYPO-025 본문 양쪽 정렬 금지

- 강도: **SHOULD**
- 룰: 본문 텍스트 블록에 text-align: justify를 쓰지 않고 text-align: start(가로쓰기 LTR에서는 left)로 한쪽 정렬한다.
- 측정 기준: 본문 텍스트 요소(p, li, dd)의 계산값 text-align이 justify가 아니다.
- 판정 방법: stylelint로 선언 검사 + 계산 스타일 검사(WCAG F88 절차: 본문이 양쪽 정렬되지 않았는지 확인).
- 자동 검사: partial (stylelint/declaration-property-value-disallowed-list)
- 적용 대상: p, li, dd
- 예외: 사용자가 양쪽 정렬을 해제하는 수단을 페이지에서 제공하는 경우 (WCAG 1.4.8 G172)
- 결정 CF-023: 웹 본문에는 양쪽 정렬을 쓰지 않는다(TYPO-025, SHOULD 유지).
- 근거: 양쪽 정렬은 단어 간격을 고르지 않게 벌려 난독증 등 일부 사용자의 읽기를 어렵게 한다(WCAG 1.4.8 F88). 한국어 어절 단위 줄바꿈과 함께 쓰면 벌어짐이 더 커질 수 있다(실측 필요).
- 출처: WCAG22_UNDERSTANDING SC 1.4.8 Visual Presentation; C19, G169, F88; KLREQ 7.2.1 Line Adjustment Process; MDN_BCD css.properties.text-justify

좋은 예 — 한쪽 정렬로 단어 간격이 고르다
```css
p{text-align:start}
```
나쁜 예 — 양쪽 정렬로 단어 간격이 불규칙해진다
```css
p{text-align:justify}
```

## TYPO-026 루트 글꼴 크기 px 고정 금지

- 강도: **SHOULD**
- 룰: html(:root) 요소의 font-size를 px로 지정하지 않고, 지정이 필요하면 %로 지정해 사용자의 브라우저 기본 글자 크기 설정을 따르게 한다.
- 측정 기준: html, :root 셀렉터의 font-size 선언 값이 px·pt 등 절대 단위가 아니다(% 또는 미지정).
- 판정 방법: stylelint 커스텀(셀렉터 한정 단위 검사).
- 자동 검사: none
- 적용 대상: html, :root
- 결정 CF-044: 루트 글자 크기는 62.5%만 허용하고 10px은 쓰지 않는다(이미 TYPO-011에 반영).
- 근거: px 글자 크기는 일부 브라우저에서 사용자가 글자 크기를 바꿀 수 없어 접근성이 없다(MDN). 루트에서 고정하면 페이지 전체 rem 값이 사용자 설정을 무시한다.
- 출처: MDN_FONT_SIZE Pixels — Note; WCAG22_UNDERSTANDING SC 1.4.4 Resize Text; C12, C13, C14

좋은 예 — % 지정이라 사용자의 브라우저 기본 글자 크기를 따른다
```css
:root{font-size:100%}
```
나쁜 예 — px 고정이라 사용자 글자 크기 설정이 무시된다
```css
:root{font-size:16px}
```

## TYPO-027 글꼴 크기 상대 단위

- 강도: **SHOULD**
- 룰: font-size 값은 rem, em, % 중 하나로 지정하고 px·pt로 지정하지 않는다.
- 측정 기준: 스타일시트의 font-size(및 font 단축 속성의 크기) 선언에 px, pt 단위가 0건. 디자인 토큰을 px로 정의했다면 CSS 변환 결과가 rem.
- 판정 방법: stylelint declaration-property-unit-disallowed-list + 토큰 변환 결과 검사.
- 자동 검사: full (stylelint/declaration-property-unit-disallowed-list)
- 적용 대상: font-size 선언 전체
- 근거: 사용자 기본 글자 크기를 기준으로 한 상대값이 접근성에 가장 낫고, rem은 em의 누적 문제를 피한다(MDN). KRDS도 개발 시 rem 단위로 변환해 쓰라고 한다.
- 출처: MDN_FONT_SIZE Pixels — Note; Rems; WCAG22_UNDERSTANDING SC 1.4.4; C12, C14, C28; KRDS 스타일 가이드 > 타이포그래피 > 표현 단위(rem) (가이드라인 PDF 2025.08 108쪽)

좋은 예 — rem 지정이라 사용자 기본 크기에 비례한다
```css
h2{font-size:1.5rem}
```
나쁜 예 — px 지정이라 일부 브라우저에서 글자 크기 설정이 반영되지 않는다
```css
h2{font-size:24px}
```

## TYPO-030 font-family generic family 폴백

- 강도: **SHOULD**
- 룰: font-family 목록의 마지막에 generic family(sans-serif, serif, monospace 등)를 둔다.
- 측정 기준: 모든 font-family 선언(및 font 단축 속성)의 마지막 항목이 따옴표 없는 generic family 키워드다. 아이콘 폰트 전용 선언은 판정에서 뺀다.
- 판정 방법: stylelint font-family-no-missing-generic-family-keyword.
- 자동 검사: partial (stylelint/font-family-no-missing-generic-family-keyword)
- 적용 대상: font-family 선언 전체
- 근거: 웹폰트 로드 실패나 서브셋에 없는 글자는 generic family로 대체되며, generic family는 content language(lang=ko)에 맞는 시스템 글꼴로 합성될 수 있다.
- 출처: CSS_FONTS_4 2.1.5 Generic font families; WEBDEV_OPT_CLS Web fonts

좋은 예 — 웹폰트가 없으면 시스템 고딕으로 대체된다
```css
body{font-family:"Pretendard GOV",sans-serif}
```
나쁜 예 — generic family가 없어 웹폰트 실패 시 브라우저 기본(명조 계열)으로 표시될 수 있다
```css
body{font-family:"Pretendard GOV"}
```

## TYPO-031 본문 한 줄 길이 상한

- 강도: **SHOULD**
- 룰: 한국어 본문 텍스트 블록의 한 줄 길이를 전각 40자 이하로 제한한다(max-inline-size: 40ic 이하).
- 측정 기준: 본문 단락(p, li, dd 등 본문 텍스트 블록)의 계산된 inline-size가 40ic 이하이다.
- 판정 방법: 브라우저에서 본문 텍스트 블록의 실제 너비를 같은 요소의 1ic 값으로 나눈 값이 40 이하인지 확인한다.
- 자동 검사: partial (stylelint/ux-baseline/prose-max-inline-size, custom)
- 적용 대상: 본문 텍스트 블록(p, li, dd)
- 예외: 표 셀, 코드 블록, 한 줄짜리 제목
- 결정 CF-033: 본문 한 줄 상한을 40자(40ic)로 하는 TYPO-031(SHOULD)을 신설한다.
- 근거: 한 줄이 길면 줄 끝에서 다음 줄 시작을 찾기 어렵다. WCAG 1.4.8은 CJK 텍스트 너비를 40자 이하로 두고, 신·박(2003)은 30자를 가장 선호하고 50자에서 읽기 속도가 가장 빨랐다고 보고했다.
- 출처: WCAG22 SC 1.4.8 Visual Presentation (Level AAA); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html; SHIN_PARK_2003 줄 길이 10/30/50자 실험

좋은 예 — 본문 한 줄이 전각 40자 이하다
```css
:lang(ko) main p{max-inline-size:40ic}
```
나쁜 예 — 줄 길이 상한이 없어 넓은 화면에서 40자를 넘는다
```css
:lang(ko) main p{max-inline-size:none} /* 1280px 화면에서 한 줄 70자 이상 */
```

## TYPO-006 글자 두께 종류 제한

- 강도: **MAY**
- 룰: 한 서비스에서 쓰는 font-weight 값을 4종 이하로 하고, 300 이하(thin·extra light·light)와 800 이상(extra bold·black) 값은 쓰지 않는다.
- 측정 기준: 스타일시트 전체의 font-weight 선언에서 서로 다른 값의 수 ≤ 4, 그리고 100·200·300·800·900·lighter 값이 0건.
- 판정 방법: stylelint 커스텀 또는 토큰 검사로 font-weight 값 집합을 모은다.
- 자동 검사: partial (stylelint/declaration-property-value-disallowed-list)
- 적용 대상: font-weight 선언·토큰 전체
- 근거: 가는 두께는 배경과 구분이 어렵고 지나치게 두꺼운 두께는 시각 피로를 준다. 두께 종류가 많으면 사용자가 정보 중요도를 혼동할 수 있다(KRDS).
- 출처: KRDS 디자인 스타일 > 타이포그래피 > 글자 두께 (가이드라인 PDF 2025.08 104쪽)

좋은 예 — 두께 3종, 300 이하·800 이상 없음
```css
:root{--font-weight-regular:400;--font-weight-medium:500;--font-weight-bold:700}
```
나쁜 예 — 300(light)은 배경과 구분이 어렵다
```css
.caption{font-weight:300}
```

## TYPO-007 제목·본문 크기 비율

- 강도: **MAY** (판정에 사람의 판단 필요: guide)
- 룰: 타입 스케일을 새로 정할 때 제목(heading)과 본문 글자 크기 비율을 1.25~1.5배 범위에서 정한다.
- 측정 기준: 점검 질문: 타입 스케일 문서에서 본문 기본 크기와, 본문 바로 위 제목 단계(예: h4 또는 h3) 크기의 비율이 1.25~1.5 범위인가? 비교할 제목 단계는 서비스마다 다르므로 사람이 정한다.
- 판정 방법: 수동 검토(타입 스케일 토큰 확인).
- 자동 검사: none
- 적용 대상: 타입 스케일 재설정
- 근거: 제목과 본문 크기 차이를 분명히 하면 사용자가 정보 계층을 파악하기 쉽다(KRDS).
- 출처: KRDS 디자인 스타일 > 타이포그래피 > 글자 스케일 (가이드라인 PDF 2025.08 109쪽)

좋은 예 — 제목:본문 비율이 1.25~1.5 범위다
```
본문 16px, 본문 바로 위 제목 단계 20px(1.25배) — 타입 스케일 재설정 시 기본 크기를 기준으로 비율을 정했다.
```
나쁜 예 — 비율이 1.25 미만이다
```
본문 16px, 본문 바로 위 제목 단계 17px(1.06배)로 정해 제목과 본문이 구분되지 않는다.
```

## TYPO-009 본문은 고딕 계열

- 강도: **MAY**
- 룰: 본문과 제목에는 고딕(산세리프) 계열 서체를 쓰고, 고딕 계열이 아닌 자체 서체는 디스플레이·배너 영역에만 쓴다.
- 측정 기준: body와 h1~h6의 font-family 목록에 나열된 각 서체가 산세리프(고딕) 분류이고 목록이 sans-serif로 끝난다. 고딕이 아닌 서체는 디스플레이·배너용 셀렉터에서만 선언된다.
- 판정 방법: 수동: font-family 선언을 모아 각 서체의 분류를 서체 배포처 정보로 확인한다.
- 자동 검사: none
- 적용 대상: KRDS 확장형 스타일 적용 서비스, body, h1, h2, h3, h4, h5, h6
- 근거: KRDS는 가독성을 위해 본문·제목에 고딕 계열 서체를 권장하고, 고딕이 아니거나 가독성이 낮은 자체 서체는 디스플레이·배너에 한정한다.
- 출처: KRDS 디자인 스타일 > 타이포그래피 > 서체 (가이드라인 PDF 2025.08 103·125쪽)

좋은 예 — 본문·제목은 고딕 계열, 자체 서체는 배너에만 쓴다
```css
body,h1,h2,h3{font-family:"Noto Sans KR","Nanum Gothic",sans-serif}
.banner-title{font-family:"OrgBrand",sans-serif}
```
나쁜 예 — 본문에 명조(세리프) 계열을 썼다
```css
body{font-family:"Nanum Myeongjo",serif}
```

## TYPO-011 rem 기준값

- 강도: **MAY**
- 룰: rem 환산을 10px 기준으로 단순화하려면 html의 font-size를 62.5%로 지정하고, 10px 같은 px 값으로 지정하지 않는다.
- 측정 기준: html(:root)의 font-size 선언이 62.5% 이고, 이 경우 body의 font-size가 rem으로 다시 지정되어 있다(예: 1.7rem).
- 판정 방법: stylelint 커스텀: html·:root 셀렉터 font-size 값 확인 + body font-size 선언 존재 확인.
- 자동 검사: none
- 적용 대상: html, :root
- 결정 CF-044: 루트 글자 크기는 62.5%만 허용하고 10px은 쓰지 않는다(이미 TYPO-011에 반영).
- 근거: 62.5%로 두면 1rem=10px(브라우저 기본 16px일 때)이라 px 시안을 rem으로 바꾸기 쉽고, %라서 사용자의 브라우저 기본 글자 크기 설정도 반영된다.
- 출처: KRDS 디자인 스타일 > 타이포그래피 > 표현 단위 (가이드라인 PDF 2025.08 108쪽)

좋은 예 — 62.5%로 지정하고 body에 rem 크기를 다시 준다
```css
:root{font-size:62.5%}
body{font-size:1.7rem} /* 기본 16px에서 17px */
```
나쁜 예 — px 루트 크기는 사용자의 브라우저 글자 크기 설정을 무시한다
```css
:root{font-size:10px}
body{font-size:1.7rem}
```

## TYPO-017 한국어 어절 단위 줄바꿈(keep-all)

- 강도: **MAY**
- 룰: 한국어 본문·제목 텍스트 블록에 word-break: keep-all을 지정해 한글을 어절(띄어쓰기) 단위로 줄바꿈한다.
- 측정 기준: :lang(ko) 범위의 p, li, dd, h1~h6 요소의 계산값 word-break가 keep-all. KRDS 키트 CSS를 쓰는 프로젝트는 키트 CSS 파일을 불러오지 않은 상태로 렌더링한 계산값으로 판정한다 — 키트 CSS가 정한 값은 판정하지 않는다(CF-049).
- 판정 방법: Playwright로 해당 요소의 getComputedStyle().wordBreak 를 수집한다.
- 자동 검사: none
- 적용 대상: :lang(ko) p, :lang(ko) li, :lang(ko) dd, :lang(ko) h1~h6
- 결정 CF-049: TYPO-017·020을 유지한다. KRDS 키트를 쓰는 프로젝트는 키트 CSS를 검사 대상에서 빼고 프로젝트 CSS에만 적용한다: 선언을 보는 검사(stylelint — TYPO-020·COLOR-022·TYPO-032)는 키트 CSS 파일을 실행 대상(.stylelintignore)에서 빼고, 계산 스타일로 판정하는 검사(TYPO-017·TYPO-020)는 키트 CSS 파일을 불러오지 않은 상태로 페이지를 렌더링해 판정한다.
- 결정 CF-052: AI-008: 사용자가 중단한 AI 응답 끝에 '생성 중단됨' 텍스트를 표시한다(MAY). AI-009: AI 결과마다 다시 생성 버튼을 두고 이전 결과를 다시 볼 수 있게 한다(MAY). 보존 방식(버전 탐색 또는 목록)은 둘 다 허용한다. COPY-029: 가로 배치 라디오·체크박스 레이블 길이 판정 기준은 '브레이크포인트 토큰 너비 360·768·1024·1280px(RESP-004)마다 한 줄'로 정한다(MAY). STATE-036: KRDS의 '인증 실패 반복'을 '같은 인증 절차에서 연속 2회 이상 실패'로 정한다(MAY). TYPO-017: 한국어 텍스트 블록의 기본 줄바꿈은 어절 단위(word-break: keep-all)로 정한다(MAY). TYPO-020: 한국어 본문에 word-break: break-all을 쓰지 않는다(MAY). 긴 URL·코드는 overflow-wrap: anywhere로 처리한다. TYPO-028: 본문 letter-spacing 기본값은 0이고 음수 값을 쓰지 않는다(MAY). TYPO-029: 0이 아닌 letter-spacing은 em 단위로 쓴다(MAY). KRDS 표의 px 자간은 글자 크기로 나눠 em으로 환산한다. 모두 강도 MAY로 두고, 근거는 UXB_SYSTEM_CHOICE(CF-052)로 표시한다.
- 근거: 한국어는 음절 단위와 어절 단위 줄바꿈이 모두 정상 관행이며, 어절 단위는 단어가 줄 끝에서 쪼개지지 않아 읽기 흐름이 이어진다. 체계는 어절 단위를 기본으로 택한다(선택 근거는 표준이 아니라 체계의 선택).
- 출처: CSS_TEXT_3 5.1 word-break (keep-all, Note); KLREQ 7.1.1 Line Breaking Rules; UXB_SYSTEM_CHOICE CF-052

좋은 예 — 어절 단위로 줄바꿈하고 긴 어절 넘침은 anywhere로 막는다
```css
:lang(ko) p{word-break:keep-all;overflow-wrap:anywhere}
```
나쁜 예 — 한국어 본문이 음절 단위로 끊긴다(체계 기본값과 다름)
```css
:lang(ko) p{word-break:normal}
```

## TYPO-020 한국어 본문 break-all 금지

- 강도: **MAY**
- 룰: 한국어 본문 텍스트에 word-break: break-all을 쓰지 않는다.
- 측정 기준: :lang(ko) 범위의 본문 요소(p, li, dd, td, h1~h6) 계산값 word-break가 break-all이 아니다. 코드·해시값 표시 요소(code, pre, kbd, samp)는 판정에서 뺀다. KRDS 키트 CSS를 쓰는 프로젝트는 키트 CSS 파일을 불러오지 않은 상태로 렌더링한 계산값으로 판정한다 — 키트 CSS가 정한 값은 판정하지 않는다(CF-049). stylelint 선언 검사도 키트 CSS 파일을 실행 대상에서 뺀다.
- 판정 방법: stylelint declaration-property-value-disallowed-list(코드 셀렉터는 예외 처리) + 계산 스타일 검사.
- 자동 검사: partial (stylelint/declaration-property-value-disallowed-list)
- 적용 대상: :lang(ko) 본문 텍스트
- 결정 CF-049: TYPO-017·020을 유지한다. KRDS 키트를 쓰는 프로젝트는 키트 CSS를 검사 대상에서 빼고 프로젝트 CSS에만 적용한다: 선언을 보는 검사(stylelint — TYPO-020·COLOR-022·TYPO-032)는 키트 CSS 파일을 실행 대상(.stylelintignore)에서 빼고, 계산 스타일로 판정하는 검사(TYPO-017·TYPO-020)는 키트 CSS 파일을 불러오지 않은 상태로 페이지를 렌더링해 판정한다.
- 결정 CF-052: AI-008: 사용자가 중단한 AI 응답 끝에 '생성 중단됨' 텍스트를 표시한다(MAY). AI-009: AI 결과마다 다시 생성 버튼을 두고 이전 결과를 다시 볼 수 있게 한다(MAY). 보존 방식(버전 탐색 또는 목록)은 둘 다 허용한다. COPY-029: 가로 배치 라디오·체크박스 레이블 길이 판정 기준은 '브레이크포인트 토큰 너비 360·768·1024·1280px(RESP-004)마다 한 줄'로 정한다(MAY). STATE-036: KRDS의 '인증 실패 반복'을 '같은 인증 절차에서 연속 2회 이상 실패'로 정한다(MAY). TYPO-017: 한국어 텍스트 블록의 기본 줄바꿈은 어절 단위(word-break: keep-all)로 정한다(MAY). TYPO-020: 한국어 본문에 word-break: break-all을 쓰지 않는다(MAY). 긴 URL·코드는 overflow-wrap: anywhere로 처리한다. TYPO-028: 본문 letter-spacing 기본값은 0이고 음수 값을 쓰지 않는다(MAY). TYPO-029: 0이 아닌 letter-spacing은 em 단위로 쓴다(MAY). KRDS 표의 px 자간은 글자 크기로 나눠 em으로 환산한다. 모두 강도 MAY로 두고, 근거는 UXB_SYSTEM_CHOICE(CF-052)로 표시한다.
- 근거: break-all은 한글 문장 안의 영단어·숫자를 글자 중간에서 끊는다. 넘침 방지가 목적이면 overflow-wrap: anywhere(TYPO-018)가 대안이다.
- 출처: CSS_TEXT_3 5.1 word-break (break-all); UXB_SYSTEM_CHOICE CF-052

좋은 예 — 한국어 본문에 break-all을 쓰지 않는다
```css
:lang(ko) p{word-break:keep-all;overflow-wrap:anywhere}
```
나쁜 예 — 문장 속 영단어·숫자가 중간에서 끊긴다
```css
:lang(ko) p{word-break:break-all}
```

## TYPO-022 balance는 제목·캡션에만

- 강도: **MAY**
- 룰: text-wrap: balance(또는 text-wrap-style: balance)는 제목(h1~h6)과 캡션(figcaption, caption)에만 쓰고 본문 문단(p)에는 쓰지 않는다.
- 측정 기준: text-wrap: balance 또는 text-wrap-style: balance 선언이 있는 셀렉터의 대상이 h1~h6, [role=heading], figcaption, caption 중 하나다.
- 판정 방법: stylelint 커스텀: 해당 선언의 셀렉터 끝 요소 검사.
- 자동 검사: none
- 적용 대상: text-wrap: balance 선언
- 근거: 명세는 balance를 줄 길이가 고른 것이 선호되는 제목·캡션용으로 의도했고, 10줄이 넘으면 브라우저가 auto로 처리해도 되므로 긴 본문에는 효과가 보장되지 않는다.
- 출처: CSS_TEXT_4 5.4 text-wrap-style (balance, Note); MDN_BCD css.properties.text-wrap.balance

좋은 예 — balance를 제목·캡션에만 쓴다
```css
h1,h2,figcaption{text-wrap:balance}
```
나쁜 예 — 본문 문단에 balance를 썼다
```css
p{text-wrap:balance}
```

## TYPO-023 text-wrap: pretty 점진적 향상

- 강도: **MAY** (판정에 사람의 판단 필요: guide)
- 룰: 본문 문단에 text-wrap: pretty를 쓸 때는 이 선언을 지원하지 않는 브라우저에서 무시되어도 레이아웃이 깨지지 않게 하고, 대량 텍스트 화면에서는 렌더링 성능 영향을 측정한 뒤 적용한다.
- 측정 기준: 점검 질문: (1) text-wrap: pretty 를 지운 상태에서도 줄 수 변화 때문에 잘림·겹침이 생기지 않는가? (2) 긴 문서 화면에 적용했다면 적용 전후 렌더링 시간을 비교했는가?
- 판정 방법: 수동 검토.
- 자동 검사: none
- 적용 대상: text-wrap: pretty 를 쓰는 본문 문단
- 근거: pretty는 속도보다 줄바꿈 품질을 우선하는 기능이라 개선 내용이 브라우저마다 다르고 Firefox는 지원하지 않는다. 명세는 대량 텍스트에 쓸 때 성능 영향 평가를 권한다.
- 출처: CSS_TEXT_4 5.4 text-wrap-style (pretty); MDN_BCD css.properties.text-wrap.pretty

좋은 예 — 미지원 브라우저 폴백과 대량 텍스트 성능을 확인했다
```
본문 p에 text-wrap: pretty를 넣고, 선언을 지운 상태에서도 잘림·겹침이 없는지 확인했다. 3,000자 이상 공지 화면은 적용 전후 렌더링 시간을 비교한 뒤 적용했다.
```
나쁜 예 — pretty에 의존한 레이아웃이라 미지원 브라우저에서 깨진다
```
카드 높이를 pretty 적용 시 줄 수에 맞춰 고정해, pretty를 지원하지 않는 Firefox에서 마지막 줄이 잘린다.
```

## TYPO-024 auto-phrase는 keep-all 폴백과 함께

- 강도: **MAY**
- 룰: word-break: auto-phrase를 쓸 때는 같은 규칙 블록에서 그 앞에 word-break: keep-all을 먼저 선언하고, 해당 요소의 lang이 ko로 판별되게 한다.
- 측정 기준: word-break: auto-phrase 선언이 있는 모든 규칙 블록에서 그 앞에 word-break: keep-all 선언이 있고, 적용 요소 또는 조상 요소의 lang 속성이 ko(또는 ko-로 시작)다.
- 판정 방법: stylelint 커스텀(선언 순서) + DOM 검사(:lang(ko) 일치 여부).
- 자동 검사: none
- 적용 대상: word-break: auto-phrase 를 쓰는 요소
- 근거: auto-phrase는 실험 기능이라 미지원 브라우저는 선언을 무시하므로 앞의 keep-all이 폴백이 된다. 지원 브라우저도 content language를 모르면 normal(음절 단위)로 동작해 keep-all보다 나빠지므로 lang 지정이 전제다.
- 출처: CSS_TEXT_4 word-break: auto-phrase; MDN_BCD css.properties.word-break.auto-phrase

좋은 예 — keep-all을 먼저 선언해 미지원 브라우저 폴백을 두고 lang=ko로 언어를 판별시킨다
```html
<html lang="ko">
<style>h1{word-break:keep-all;word-break:auto-phrase}</style>
```
나쁜 예 — keep-all 폴백이 없어 미지원 브라우저에서 음절 단위로 끊긴다
```html
<html lang="ko">
<style>h1{word-break:auto-phrase}</style>
```

## TYPO-028 본문 자간 0, 음수 자간 금지

- 강도: **MAY**
- 룰: 본문 텍스트의 letter-spacing은 0(normal)으로 두고 음수 값을 쓰지 않는다.
- 측정 기준: 본문 텍스트 요소(p, li, dd, td)의 계산값 letter-spacing이 normal 또는 0px. 스타일시트에 음수 letter-spacing 선언이 0건.
- 판정 방법: stylelint 커스텀(음수 값 검사) + 계산 스타일 검사.
- 자동 검사: none
- 적용 대상: p, li, dd, td
- 결정 CF-052: AI-008: 사용자가 중단한 AI 응답 끝에 '생성 중단됨' 텍스트를 표시한다(MAY). AI-009: AI 결과마다 다시 생성 버튼을 두고 이전 결과를 다시 볼 수 있게 한다(MAY). 보존 방식(버전 탐색 또는 목록)은 둘 다 허용한다. COPY-029: 가로 배치 라디오·체크박스 레이블 길이 판정 기준은 '브레이크포인트 토큰 너비 360·768·1024·1280px(RESP-004)마다 한 줄'로 정한다(MAY). STATE-036: KRDS의 '인증 실패 반복'을 '같은 인증 절차에서 연속 2회 이상 실패'로 정한다(MAY). TYPO-017: 한국어 텍스트 블록의 기본 줄바꿈은 어절 단위(word-break: keep-all)로 정한다(MAY). TYPO-020: 한국어 본문에 word-break: break-all을 쓰지 않는다(MAY). 긴 URL·코드는 overflow-wrap: anywhere로 처리한다. TYPO-028: 본문 letter-spacing 기본값은 0이고 음수 값을 쓰지 않는다(MAY). TYPO-029: 0이 아닌 letter-spacing은 em 단위로 쓴다(MAY). KRDS 표의 px 자간은 글자 크기로 나눠 em으로 환산한다. 모두 강도 MAY로 두고, 근거는 UXB_SYSTEM_CHOICE(CF-052)로 표시한다.
- 근거: klreq는 한글의 기본 글자사이를 0으로 기술하고 KRDS 본문(Body) 단계 자간도 0px이다. 국내 웹의 음수 자간 관행은 검증된 근거가 없다.
- 출처: KLREQ 7.3.1 Inter-Character Spacing; KRDS 스타일 가이드 > 타이포그래피 > Body 표 (가이드라인 PDF 2025.08 110·111·113쪽); UXB_SYSTEM_CHOICE CF-052

좋은 예 — 본문 자간 0
```css
p{letter-spacing:normal}
```
나쁜 예 — 본문에 음수 자간을 썼다
```css
p{letter-spacing:-0.03em}
```

## TYPO-029 자간 단위 em

- 강도: **MAY**
- 룰: letter-spacing을 0이 아닌 값으로 지정할 때는 em 단위로 지정한다.
- 측정 기준: 스타일시트의 letter-spacing 선언 중 normal·0이 아닌 값의 단위가 모두 em.
- 판정 방법: stylelint declaration-property-unit-allowed-list.
- 자동 검사: full (stylelint/declaration-property-unit-allowed-list)
- 적용 대상: letter-spacing 선언 전체
- 결정 CF-052: AI-008: 사용자가 중단한 AI 응답 끝에 '생성 중단됨' 텍스트를 표시한다(MAY). AI-009: AI 결과마다 다시 생성 버튼을 두고 이전 결과를 다시 볼 수 있게 한다(MAY). 보존 방식(버전 탐색 또는 목록)은 둘 다 허용한다. COPY-029: 가로 배치 라디오·체크박스 레이블 길이 판정 기준은 '브레이크포인트 토큰 너비 360·768·1024·1280px(RESP-004)마다 한 줄'로 정한다(MAY). STATE-036: KRDS의 '인증 실패 반복'을 '같은 인증 절차에서 연속 2회 이상 실패'로 정한다(MAY). TYPO-017: 한국어 텍스트 블록의 기본 줄바꿈은 어절 단위(word-break: keep-all)로 정한다(MAY). TYPO-020: 한국어 본문에 word-break: break-all을 쓰지 않는다(MAY). 긴 URL·코드는 overflow-wrap: anywhere로 처리한다. TYPO-028: 본문 letter-spacing 기본값은 0이고 음수 값을 쓰지 않는다(MAY). TYPO-029: 0이 아닌 letter-spacing은 em 단위로 쓴다(MAY). KRDS 표의 px 자간은 글자 크기로 나눠 em으로 환산한다. 모두 강도 MAY로 두고, 근거는 UXB_SYSTEM_CHOICE(CF-052)로 표시한다.
- 근거: em으로 지정하면 글자 크기가 바뀌어도 자간 비율이 유지된다. TYPO-005(행간 상대 단위)와 같은 원리를 자간에 적용한 체계 선택이다.
- 출처: CSS_TEXT_3 7.2 letter-spacing; UXB_SYSTEM_CHOICE CF-052

좋은 예 — 0이 아닌 자간을 em으로 지정해 글자 크기에 비례한다
```css
.display{letter-spacing:0.025em}
```
나쁜 예 — px 자간은 글자 크기가 바뀌어도 그대로다
```css
.display{letter-spacing:1px}
```
