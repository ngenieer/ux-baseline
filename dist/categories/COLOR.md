# COLOR — 색상·대비

ux-baseline 확정 룰. 자동 생성 파일이다.

| ID | 강도 | 룰 |
|---|---|---|
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-022 | MUST | color·background-color·border-color·outline-color·fill·stroke·text-decoration-color 값은 색 토큰(CSS 변수 var(--color-*))에서만 고르고 CSS에 #hex·rgb()·hsl()·색 이름을 직접 쓰지 않는다. |
| COLOR-005 | SHOULD | 강조(accent) 색은 한 화면 면적의 5% 이하로 쓴다. |
| COLOR-006 | SHOULD | 비활성(disabled) 상태를 표현할 때 알파 값이 1 미만인 색(투명도 색)을 쓰지 않고 팔레트의 불투명 색을 쓴다. |
| COLOR-007 | SHOULD | 상호작용 요소의 기본·hover·pressed(active) 상태 색은 같은 색상 계열 토큰 안에서 명도 단계만 올리거나 내려 표현하고 다른 색상 계열로 바꾸지 않는다. |
| COLOR-009 | SHOULD | 선명한 화면 모드(고대비 모드)를 제공하면 그 모드에서 본문 텍스트는 15:1, 헤딩·레이블 텍스트는 7:1, 아이콘은 7:1(선 두께를 기본 모드보다 굵게 바꾼 아이콘은 4.5:1), 시각 보조 요소는 4.5:1 이상 명도 대비를 갖게 한다. |
| COLOR-010 | SHOULD | 선명한 화면 모드로 전환해도 일반 모드와 같은 정보와 기능을 제공하고, 선명한 화면 모드에서 식별되지 않는 래스터 이미지(JPEG·PNG·GIF)는 모드별 버전을 따로 제공한다. |
| COLOR-011 | SHOULD | 선명한 화면 모드에서는 본문의 모든 인라인 링크와 푸터의 모든 링크에 밑줄을 표시하고, 버튼·입력·선택 컴포넌트의 외곽선과 링크 밑줄을 기본 모드보다 굵게 한다. |
| COLOR-012 | SHOULD | 공식 배너는 헤더의 내비게이션·기능 버튼보다 시각적 주목도가 낮게 표현한다. |
| COLOR-013 | SHOULD | 운영기관 식별자는 푸터의 정보·링크보다 시각적 주목도가 낮게 표현한다. |
| COLOR-014 | SHOULD | 링크를 강조 링크(파란색 또는 서비스 주조색)와 기본 링크 두 단계로 구분하고, 강조 링크는 화면에서 가장 중요한 과업과 연결된 링크에만 쓴다. |
| COLOR-015 | SHOULD | 버튼 강조 단계를 주조색 채움 버튼(가장 중요한 행동), 윤곽선 버튼(중간 강조), 텍스트 버튼(가장 낮은 강조) 세 가지로 쓰고, 주조색 채움 버튼은 한 화면 상태에 1개만 둔다. |
| COLOR-016 | SHOULD | 버튼 그룹에서 가장 높은 강조 단계 버튼에 아이콘이 없으면 그 그룹의 다른 버튼에도 아이콘을 넣지 않는다. |
| COLOR-017 | SHOULD | 배지 배경색으로 서비스 주조색(primary color, 채움 버튼 배경색)을 쓰지 않는다. |
| COLOR-019 | SHOULD | 태그는 한 가지 색을 기본으로 쓰고, 색을 추가하는 경우 색 구분이 사용자에게 의미가 있을 때만 추가하며 동시에 표시되는 태그들이 같은 강조 수준으로 보이게 한다. |
| COLOR-021 | SHOULD | 코치마크의 '그만보기'·'이전' 버튼은 텍스트 버튼 스타일로, '다음'·'마치기' 버튼은 고스트 버튼 스타일로 표시해 본문 액션 버튼보다 강조 수준을 낮춘다. |
| COLOR-004 | MAY | 색 팔레트를 명도 단계 번호로 구성하고, 두 단계 번호 차이가 40 이상이면 3:1, 50 이상이면 4.5:1, 70 이상이면 7:1, 90 이상이면 15:1 이상 대비가 나오도록 단계 색을 맞춘다. |
| COLOR-018 | MAY | 배지 색은 레이블 정보와 색의 일반적 의미가 맞을 때 그 색을 쓰고(예: 중요·경고·반대는 빨강), 한 화면의 배지 색 종류를 늘려 주의를 분산시키지 않는다. |
| COLOR-020 | MAY | 영상 자막 텍스트에는 윤곽선이나 반투명 검은색 배경을 넣어 영상 화면과 대비를 확보한다. |

## COLOR-001 색만으로 정보 전달 금지

- 강도: **MUST**
- 룰: 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다.
- 측정 기준: 색으로 구분되는 정보(상태 색, 필수·오류 필드, 링크와 주변 텍스트, 차트 계열, 선택 상태, 비활성 상태)마다 (a) 색 외의 시각 단서(텍스트, 아이콘, 모양, 패턴, 밑줄)가 있거나 (b) 구분되는 두 색의 상대 휘도 대비가 3:1 이상이면 통과. 둘 다 아니면 실패. (b)의 두 색은 구분되는 두 요소·두 상태에서 같은 부분의 색이다 — 채움 배경끼리, 글자끼리, 테두리끼리(링크와 주변 텍스트는 글자색끼리, 기법 G183). 두 상태 사이에 색이 바뀌는 부분 중 하나라도 3:1 이상이면 통과한다(전경·배경을 뒤바꾼 표시는 채움끼리 비교). 한 상태 안의 글자색과 채움색처럼 다른 부분끼리의 대비는 이 룰이 아니라 COLOR-002·COLOR-003 으로 잰다. 비활성(disabled·aria-disabled="true") 상태와 활성 상태의 구분도 대상이다 — SC 1.4.1 에는 비활성 예외가 없다(COLOR-003 의 inactive 예외는 비텍스트 대비에만 해당).
- 판정 방법: axe-core link-in-text-block으로 본문 링크를 검사하고, 나머지는 수동: 화면을 흑백(grayscale)으로 바꿔 색으로만 구분되던 정보가 여전히 구분되는지 확인한다.
- 자동 검사: partial (axe-core/link-in-text-block)
- 적용 대상: 색으로 의미를 전달하는 모든 요소
- 근거: 색각 이상자(적록·청색맹 등), 저시력 사용자, 흑백 출력 환경에서는 색 차이만으로는 정보를 받을 수 없다.
- 출처: WCAG22 SC 1.4.1 Use of Color (Level A); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html; KWCAG22 검사항목 5.4.1; KRDS 디자인 스타일 > 색상 > 시스템 색상 / 색약자를 위한 고려 (가이드라인 PDF 2025.08 78·87·99쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 274·285·334·343·376·455·502·534·547·567·588쪽); KRDS 디자인 스타일 > 색상 > 색약자를 위한 고려 (가이드라인 PDF 2025.08 78쪽)

좋은 예 — 색에 더해 오류 아이콘과 '오류:' 텍스트로 상태를 전달한다
```html
<p class="msg msg--error">
  <svg class="icon-error" aria-hidden="true"></svg>
  오류: 생년월일을 YYYY.MM.DD 형식으로 입력해 주세요.
</p>
<style>.msg--error{color:var(--palette-danger-60)}</style>
```
좋은 예 — 상태 구분 대비는 두 상태의 같은 부분(채움끼리 또는 글자끼리)으로 재고, 하나라도 3:1 이상이면 된다
```css
/* 활성 → 비활성: 채움 쌍 primary-50 ↔ gray-20 은 2.96:1 이지만 글자색 쌍 gray-0 ↔ gray-50 이 4.51:1 이라 (b)로 통과 */
.button--primary{background:var(--color-button-primary-fill);color:var(--color-text-basic-inverse)}
.button--primary[aria-disabled="true"]{background:var(--color-button-disabled-fill);color:var(--color-text-disabled-on)}
```
나쁜 예 — 빨간 글자색 말고는 오류임을 알 단서가 없다
```html
<p class="msg msg--error">생년월일을 YYYY.MM.DD 형식으로 입력해 주세요.</p>
<style>.msg--error{color:var(--palette-danger-60)}</style>
```

## COLOR-002 텍스트 명도 대비

- 강도: **MUST**
- 룰: 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다.
- 측정 기준: WCAG 상대 휘도 공식으로 계산한 글자색:배경색 대비 ≥ 4.5:1. 계산값 font-size ≥ 24px 이거나 font-size ≥ 18.66px 이면서 굵게(font-weight 700 이상) 표시되는 텍스트는 ≥ 3:1.
- 판정 방법: axe-core color-contrast 자동 검사 + 배경 이미지·그라디언트·겹친 요소 위 텍스트는 수동(색 추출 도구로 측정).
- 자동 검사: partial (axe-core/color-contrast)
- 적용 대상: 모든 텍스트, 텍스트 이미지
- 예외: 비활성 UI 컴포넌트의 텍스트 (WCAG 1.4.3)
- 예외: 순수 장식이거나 아무에게도 보이지 않는 텍스트 (WCAG 1.4.3)
- 예외: 다른 중요한 시각 콘텐츠가 들어 있는 사진·그림의 일부인 텍스트 (WCAG 1.4.3)
- 예외: 로고·브랜드명의 일부인 텍스트 (WCAG 1.4.3)
- 결정 CF-048: WCAG 정의를 따른다: 24px(18pt) 이상 또는 굵은 18.66px(14pt) 이상이 큰 텍스트다.
- 결정 CF-065: 일반 크기 텍스트는 4.5:1(큰 텍스트 3:1)을 유지한다(COLOR-002). 확대 가능 여부나 태그 레이블이라는 이유로 3:1 로 낮추지 않는다. 텍스트가 아닌 아이콘은 COLOR-003(3:1, WCAG 1.4.11)으로 판정한다.
- 근거: 명도 대비가 낮으면 저시력·노안·색각 이상 사용자와 밝은 야외 환경 사용자가 글자를 읽지 못한다. 4.5:1은 시력 20/40 상당 사용자의 대비 감도 손실을 보상하는 값이다(Understanding 1.4.3).
- 출처: WCAG22 SC 1.4.3 Contrast (Minimum) (Level AA); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html; KWCAG22 검사항목 5.4.3; KRDS 디자인 스타일 > 타이포그래피 > 글자 색상과 명도 대비 (가이드라인 PDF 2025.08 122~123쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 404·419·567·744쪽)

좋은 예 — 일반 크기 본문이 4.5:1 이상이다
```css
/* --color-gray-70 = #464c53, 흰 배경 대비 8.68:1 (≥ 4.5:1) */
p{color:var(--palette-gray-70);background:var(--palette-gray-0)}
```
나쁜 예 — 일반 크기 본문 대비가 3.08:1로 4.5:1에 못 미친다
```css
/* --color-gray-40 = #8a949e, 흰 배경 대비 3.08:1 (< 4.5:1) */
p{color:var(--palette-gray-40);background:var(--palette-gray-0)}
```

## COLOR-003 비텍스트 대비

- 강도: **MUST**
- 룰: UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다.
- 측정 기준: 입력 필드 테두리, 체크박스·라디오·토글의 경계와 선택 표시, 초점·선택 상태 표시, 의미 있는 아이콘, 차트의 선·막대·범례 표식이 인접 색과 상대 휘도 대비 ≥ 3:1.
- 판정 방법: 수동: 색 추출 도구로 각 컴포넌트·상태(기본, hover, focus, 선택)의 경계·표식 색과 인접 배경색 대비를 측정한다.
- 자동 검사: none
- 적용 대상: input, select, textarea, button, [role=checkbox], [role=radio], [role=switch], svg 아이콘, 차트
- 예외: 비활성(inactive) 컴포넌트 (WCAG 1.4.11)
- 예외: 작성자가 바꾸지 않은 사용자 에이전트 기본 모양의 컴포넌트 (WCAG 1.4.11)
- 예외: 그래픽의 특정 표현이 전달하는 정보에 필수인 경우 (WCAG 1.4.11)
- 근거: 저시력 사용자가 입력 필드·버튼 경계나 체크 상태를 못 보면 컨트롤을 찾거나 상태를 알 수 없다.
- 출처: WCAG22 SC 1.4.11 Non-text Contrast (Level AA); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html; KRDS 디자인 스타일 > 색상 > 색상 적용 (가이드라인 PDF 2025.08 94쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 290·434·533·546·556·578·595·607·631·647·684·695쪽)

좋은 예 — 입력 필드 경계가 인접 배경과 3:1 이상이다
```css
/* --color-gray-50 = #6d7882, 흰 배경 대비 4.51:1 (≥ 3:1) */
input[type=text]{border:1px solid var(--palette-gray-50);background:var(--palette-gray-0)}
```
나쁜 예 — 경계 대비가 1.23:1이라 저시력 사용자가 필드를 찾기 어렵다
```css
/* --color-gray-10 = #e6e8ea, 흰 배경 대비 1.23:1 (< 3:1) */
input[type=text]{border:1px solid var(--palette-gray-10);background:var(--palette-gray-0)}
```

## COLOR-022 색 값은 토큰만 사용

- 강도: **MUST**
- 룰: color·background-color·border-color·outline-color·fill·stroke·text-decoration-color 값은 색 토큰(CSS 변수 var(--color-*))에서만 고르고 CSS에 #hex·rgb()·hsl()·색 이름을 직접 쓰지 않는다.
- 측정 기준: 작성한 CSS에서 나열한 색 속성의 값이 var(--color-*) 또는 키워드(inherit, initial, unset, revert, currentColor, transparent, none) 중 하나다. CSS 시스템 색(Canvas, CanvasText, Highlight 등)은 @media (forced-colors: active) 블록 안의 선언에서만 쓴다(CF-064). --palette-* 원시 토큰을 컴포넌트 CSS에서 직접 쓰는 경우도 0건이다. KRDS 키트 등 외부 CSS 파일은 검사 대상 파일에서 뺀다(CF-049).
- 판정 방법: stylelint scale-unlimited/declaration-strict-value(lint/stylelint.config.mjs)로 직접 값을 찾고, grep 'var(--palette-' 로 원시 토큰 직접 사용을 찾는다. 시스템 색은 @media (forced-colors: active) 블록 밖에서 쓰였는지 수동 또는 grep으로 확인한다. 키트 CSS는 stylelint 실행 대상(.stylelintignore)에서 뺀다.
- 자동 검사: partial (stylelint/scale-unlimited/declaration-strict-value)
- 적용 대상: 작성한 CSS (외부 키트 CSS 제외, CF-049)
- 예외: 외부 라이브러리·KRDS 키트 원본 CSS(CF-049)
- 예외: 이미지·동영상 안의 색
- 예외: @media (forced-colors: active) 안에서 쓰는 CSS 시스템 색(Canvas, CanvasText, Highlight 등) — 사용자의 고대비 설정 색이라 토큰으로 대신할 수 없다(CF-064).
- 결정 CF-024: SPACE-001, SHAPE-001, MOTION-010을 MUST로 올린다. 색·타이포 토큰 강제 룰은 COLOR-022·TYPO-032(MUST)로 새로 만든다(4단계 토큰 정의 후). 다섯 룰 모두 프로젝트가 작성한 CSS·JS에만 적용하고, 외부 라이브러리·KRDS 키트 원본 CSS는 검사 대상에서 뺀다(CF-049).
- 결정 CF-049: TYPO-017·020을 유지한다. KRDS 키트를 쓰는 프로젝트는 키트 CSS를 검사 대상에서 빼고 프로젝트 CSS에만 적용한다: 선언을 보는 검사(stylelint — TYPO-020·COLOR-022·TYPO-032)는 키트 CSS 파일을 실행 대상(.stylelintignore)에서 빼고, 계산 스타일로 판정하는 검사(TYPO-017·TYPO-020)는 키트 CSS 파일을 불러오지 않은 상태로 페이지를 렌더링해 판정한다.
- 결정 CF-064: CSS 시스템 색 키워드는 @media (forced-colors: active) 블록 안의 선언에서만 COLOR-022의 예외로 허용하고 린트 허용 값에 넣는다. 현재 stylelint 설정은 선언 위치를 구분하지 않으므로 블록 밖 사용은 수동·grep으로 확인한다.
- 근거: 색을 의미 토큰(text·surface·border 등)으로만 쓰면 고대비 테마(data-theme="high-contrast")에서 대비가 검증된 값으로 한꺼번에 바뀐다. 직접 쓴 색은 테마 전환과 대비 검사(COLOR 대비 룰)에서 빠진다.
- 출처: UXB_CHARTER 디자인 토큰; KRDS 디자인 스타일 > 색상 (가이드라인 PDF 2025.08 80·209~211쪽)

좋은 예 — 의미 색 토큰만 써서 고대비 테마에서 함께 바뀐다
```css
.notice {
  color: var(--color-text-basic);
  background-color: var(--color-surface-information-subtler);
  border-color: var(--color-border-information);
}
```
나쁜 예 — 색을 직접 써서 테마 전환·대비 검증에서 빠진다
```css
.notice {
  color: #1e2124;
  background-color: rgb(236 242 254);
}
```

## COLOR-005 강조 색 면적 제한

- 강도: **SHOULD**
- 룰: 강조(accent) 색은 한 화면 면적의 5% 이하로 쓴다.
- 측정 기준: 서비스가 지원하는 각 레이아웃 기준 너비의 전체 페이지 스크린숏에서 accent 토큰 색(모든 단계) 픽셀 수 ÷ 전체 픽셀 수 ≤ 0.05.
- 판정 방법: 스크린숏 픽셀 집계 스크립트(커스텀). 안티앨리어싱 픽셀은 accent 토큰과 색 차이 ΔE ≤ 2 인 것만 센다.
- 자동 검사: none
- 적용 대상: accent 색 토큰을 쓰는 요소
- 근거: 강조 색을 넓게 쓰면 주목 효과가 사라지고 색맹 사용자가 정보를 인식하기 어렵다(KRDS).
- 출처: KRDS 디자인 스타일 > 색상 > 색상 비율 / 강조 색상 (가이드라인 PDF 2025.08 83·85쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 515쪽)

좋은 예 — 강조 색을 작은 배지 하나에만 써서 화면 면적의 5% 이하다
```html
<main>
  <h1>민원 신청</h1>
  <p>신청서를 작성해 주세요. <span class="badge badge--accent">신규</span></p>
</main>
<style>.badge--accent{background:var(--palette-point-50)}</style>
```
나쁜 예 — 강조 색을 페이지 배경 전체에 써서 5%를 넘는다
```html
<main class="page">
  <h1>민원 신청</h1>
</main>
<style>.page{background:var(--palette-point-50)}</style>
```

## COLOR-006 비활성 상태에 투명도 금지

- 강도: **SHOULD**
- 룰: 비활성(disabled) 상태를 표현할 때 알파 값이 1 미만인 색(투명도 색)을 쓰지 않고 팔레트의 불투명 색을 쓴다.
- 측정 기준: :disabled, [aria-disabled=true] 요소의 계산값 color, background-color, border-color 알파가 모두 1(투명 배경 transparent는 제외).
- 판정 방법: 계산 스타일 수집 스크립트(커스텀). 소스 단계에서는 :disabled 셀렉터 안 rgba()/hsla()/알파 토큰 사용을 검사.
- 자동 검사: none
- 적용 대상: :disabled, [aria-disabled=true]
- 근거: 투명도 색은 배경에 따라 결과 색이 달라져 비활성 표현이 화면마다 일정하지 않다(KRDS 사용 가이드).
- 출처: KRDS 디자인 스타일 > 색상 > 투명도 / 사용 가이드 (가이드라인 PDF 2025.08 84·101쪽)

좋은 예 — 비활성 상태를 팔레트의 불투명 회색 토큰으로 표현한다
```css
button:disabled{color:var(--palette-gray-40);background:var(--palette-gray-10)}
```
나쁜 예 — 비활성 글자색에 알파 1 미만 토큰을 써서 배경마다 결과 색이 달라진다
```css
/* --color-black-alpha-38 = rgb(0 0 0 / .38) */
button:disabled{color:var(--color-alpha-inverse50);background:var(--palette-gray-10)}
```

## COLOR-007 상태 색은 같은 색조

- 강도: **SHOULD**
- 룰: 상호작용 요소의 기본·hover·pressed(active) 상태 색은 같은 색상 계열 토큰 안에서 명도 단계만 올리거나 내려 표현하고 다른 색상 계열로 바꾸지 않는다.
- 측정 기준: 각 상호작용 컴포넌트의 기본·:hover·:active 상태 background-color, color, border-color가 같은 팔레트 계열 토큰(예: primary-50 → primary-60 → primary-70)이다. 기본 상태 값이 transparent(또는 지정 없음)인 속성은 색 계열이 없는 시작 단계로 보고, hover·active 값끼리 같은 계열이면 통과한다(예: tertiary 버튼·페이지네이션 배경 transparent → gray-5 → gray-10).
- 판정 방법: 토큰 참조 검사(컴포넌트 토큰이 어떤 팔레트 계열을 참조하는지) 또는 계산 색을 팔레트에 역매핑하는 스크립트(커스텀).
- 자동 검사: none
- 적용 대상: button, a[href], [role=tab], select, 상호작용 컴포넌트
- 근거: 상태 값은 점진적 증가·감소 규칙으로 표현해야 같은 요소의 상태 변화로 인식된다. 색조가 바뀌면 다른 요소나 다른 의미로 오인할 수 있다(KRDS).
- 출처: KRDS 디자인 스타일 > 색상 > 상태 값 색상 / 사용 가이드 (가이드라인 PDF 2025.08 95·101쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 344쪽)

좋은 예 — 기본·hover·active가 같은 primary 계열에서 단계만 바뀐다
```css
.btn-primary{background:var(--palette-primary-50)}
.btn-primary:hover{background:var(--palette-primary-60)}
.btn-primary:active{background:var(--palette-primary-70)}
```
좋은 예 — 기본이 투명이면 hover·active 가 같은 gray 계열이라 통과한다
```css
.btn-text{background:transparent}
.btn-text:hover{background:var(--palette-gray-5)}
.btn-text:active{background:var(--palette-gray-10)}
```
나쁜 예 — hover에서 다른 색상 계열(point)로 바뀌어 다른 요소처럼 보인다
```css
.btn-primary{background:var(--palette-primary-50)}
.btn-primary:hover{background:var(--palette-point-50)}
```

## COLOR-009 고대비 모드 대비 기준

- 강도: **SHOULD**
- 룰: 선명한 화면 모드(고대비 모드)를 제공하면 그 모드에서 본문 텍스트는 15:1, 헤딩·레이블 텍스트는 7:1, 아이콘은 7:1(선 두께를 기본 모드보다 굵게 바꾼 아이콘은 4.5:1), 시각 보조 요소는 4.5:1 이상 명도 대비를 갖게 한다.
- 측정 기준: 선명한 화면 모드 상태에서 본문 텍스트 대비 ≥ 15:1, 헤딩(h1~h6)·레이블(label, 버튼 텍스트) 대비 ≥ 7:1, 의미 있는 아이콘 대비 ≥ 7:1(같은 아이콘의 선 두께 — SVG stroke-width 또는 아이콘 이미지의 획 두께 — 가 기본 모드보다 크면 ≥ 4.5:1), 시각 보조(링크 밑줄, 컴포넌트 외곽선) 대비 ≥ 4.5:1.
- 판정 방법: 모드를 전환한 뒤 axe-core color-contrast-enhanced(7:1/4.5:1)로 텍스트를 검사하고, 15:1 본문과 아이콘·외곽선은 토큰 쌍 대비 계산(커스텀)으로 확인. 4.5:1로 판정하는 아이콘은 두 모드의 선 두께(계산된 stroke-width 또는 아이콘 변형 파일)를 비교한다.
- 자동 검사: partial (axe-core/color-contrast-enhanced)
- 적용 대상: 선명한 화면 모드(고대비 테마) 활성 상태
- 결정 CF-046: 더 엄격한 7:1을 쓴다(COLOR-009 현행 유지).
- 결정 CF-056: 선명한 화면 모드의 의미 있는 아이콘은 7:1 이상으로 한다. 같은 아이콘의 선 두께를 기본 모드보다 굵게 바꾼 경우에는 4.5:1 이상을 허용한다(KRDS 색상 '아이콘 색상 — 선명한 화면 모드: 매직넘버 50 (두께 변화)', PDF 94쪽). 시각 보조 요소는 4.5:1 이상.
- 근거: 선명한 화면 모드는 시각 기능 제약 사용자와 저조도 환경 사용자를 위해 기본 모드보다 높은 대비를 제공하는 모드다(KRDS).
- 출처: KRDS 디자인 스타일 > 선명한 화면 모드 > 대비 (가이드라인 PDF 2025.08 194쪽); KRDS 디자인 스타일 > 타이포그래피 > 선명한 화면 모드 명도 대비 (가이드라인 PDF 2025.08 123쪽); KRDS 디자인 스타일 > 색상 > 색상 적용(글자·아이콘 색상) (가이드라인 PDF 2025.08 93~94쪽); KRDS 디자인 스타일 > 색상 > 아이콘 색상 (가이드라인 PDF 2025.08 94쪽)

좋은 예 — 선명한 화면 모드 본문이 15:1 이상이다
```css
/* 선명한 화면 모드: 본문 #000 on #fff = 21:1 (≥ 15:1) */
[data-theme="high-contrast"] p{color:var(--palette-gray-100);background:var(--palette-gray-0)}
```
나쁜 예 — 선명한 화면 모드인데 본문 대비가 8.68:1로 15:1에 못 미친다
```css
/* 선명한 화면 모드: 본문 #464c53 on #fff = 8.68:1 (< 15:1) */
[data-theme="high-contrast"] p{color:var(--palette-gray-70);background:var(--palette-gray-0)}
```

## COLOR-010 고대비 모드 전환 무손실

- 강도: **SHOULD**
- 룰: 선명한 화면 모드로 전환해도 일반 모드와 같은 정보와 기능을 제공하고, 선명한 화면 모드에서 식별되지 않는 래스터 이미지(JPEG·PNG·GIF)는 모드별 버전을 따로 제공한다.
- 측정 기준: (1) 두 모드에서 보이는 텍스트·컨트롤·이미지 목록이 같다. (2) 정보를 담은 래스터 이미지의 의미 있는 부분이 선명한 화면 모드 배경과 3:1 이상 대비를 갖거나, 모드별 이미지(picture/source 또는 테마별 src)가 있다. (3) SVG는 색을 디자인 토큰(currentColor 또는 CSS 변수)으로 지정한다.
- 판정 방법: 수동: 주요 화면을 두 모드로 캡처해 요소 목록과 이미지를 비교. (3)은 SVG 소스에서 하드코딩된 fill·stroke 색을 찾는 스크립트.
- 자동 검사: none
- 적용 대상: 선명한 화면 모드(고대비 테마) 제공 서비스
- 근거: 선명한 화면 모드는 같은 서비스의 다른 테마일 뿐이므로 모드 전환으로 정보나 기능을 잃으면 그 모드가 필요한 사용자가 배제된다(KRDS).
- 출처: KRDS 디자인 스타일 > 선명한 화면 모드 > 사용성 / 접근성 (가이드라인 PDF 2025.08 198·204쪽)

좋은 예 — 선명한 화면 모드용 래스터 이미지를 따로 제공한다(서비스 자체 모드 전환이면 테마 클래스로 src를 바꾼다)
```html
<picture>
  <source srcset="chart-hc.png" media="(prefers-contrast: more)">
  <img src="chart.png" alt="2026년 분기별 신청 건수">
</picture>
```
나쁜 예 — 한 가지 이미지만 있어 선명한 화면 모드의 어두운 배경에서 그래프 선이 보이지 않는다
```html
<img src="chart.png" alt="2026년 분기별 신청 건수">
```

## COLOR-011 고대비 모드 링크 밑줄·외곽선

- 강도: **SHOULD**
- 룰: 선명한 화면 모드에서는 본문의 모든 인라인 링크와 푸터의 모든 링크에 밑줄을 표시하고, 버튼·입력·선택 컴포넌트의 외곽선과 링크 밑줄을 기본 모드보다 굵게 한다.
- 측정 기준: 선명한 화면 모드에서 (1) main 안 문장 속 a[href]와 footer a[href]의 계산값 text-decoration-line에 underline 포함, (2) button·input·select·textarea의 border-width(또는 outline-width)와 링크 text-decoration-thickness가 기본 모드 값보다 크다.
- 판정 방법: 두 모드의 계산 스타일을 수집해 비교하는 스크립트(커스텀).
- 자동 검사: none
- 적용 대상: 선명한 화면 모드 활성 상태, main a[href], footer a[href], button, input, select, textarea
- 근거: 시력이 낮은 사용자는 단순 텍스트와 링크·버튼을 구분하지 못할 수 있어, 선명한 화면 모드에서 대화형 요소에 추가 시각 단서를 준다(KRDS 시각 보조).
- 출처: KRDS 디자인 스타일 > 선명한 화면 모드 > 시각 보조 (가이드라인 PDF 2025.08 195쪽)

좋은 예 — 선명한 화면 모드에서 본문·푸터 링크에 밑줄을 두고 외곽선·밑줄을 기본 모드보다 굵게 한다
```css
[data-theme="high-contrast"] main p a,
[data-theme="high-contrast"] footer a{text-decoration:underline;text-decoration-thickness:2px}
[data-theme="high-contrast"] .btn,
[data-theme="high-contrast"] input{border-width:2px} /* 기본 모드 1px */
```
나쁜 예 — 선명한 화면 모드에서 푸터 링크 밑줄을 없앴다
```css
[data-theme="high-contrast"] footer a{text-decoration:none}
```

## COLOR-012 공식 배너 주목도

- 강도: **SHOULD** (판정에 사람의 판단 필요: guide)
- 룰: 공식 배너는 헤더의 내비게이션·기능 버튼보다 시각적 주목도가 낮게 표현한다.
- 측정 기준: 점검 질문: 화면 상단에서 사용자의 시선이 공식 배너보다 헤더 내비게이션·기능 버튼에 먼저 가는가? 배너 배경색이 서비스 디자인 주제의 컨테이너 배경색 범위 안에 있는가?
- 판정 방법: 수동 검토(디자인 리뷰).
- 자동 검사: none
- 적용 대상: 공식 배너
- 근거: 화면 상단에서 사용자가 먼저 집중해야 할 정보는 헤더 내비게이션과 기능 버튼이므로, 신뢰 표시인 공식 배너가 주의를 빼앗지 않아야 한다(KRDS).
- 출처: KRDS 컴포넌트 > 공식 배너 > 사용성 가이드라인 (가이드라인 PDF 2025.08 221·223쪽)

좋은 예 — 배너가 헤더 내비게이션·기능 버튼보다 주목도가 낮다
```
공식 배너를 서비스 컨테이너 배경색(연회색) 위 작은 글자 한 줄로 두고, 그 아래 헤더의 메뉴와 '로그인' 버튼이 먼저 눈에 띈다.
```
나쁜 예 — 배너가 헤더보다 주의를 끈다
```
공식 배너를 진한 주조색 배경과 굵은 큰 글자로 만들어 헤더 메뉴보다 먼저 시선이 간다.
```

## COLOR-013 운영기관 식별자 주목도

- 강도: **SHOULD** (판정에 사람의 판단 필요: guide)
- 룰: 운영기관 식별자는 푸터의 정보·링크보다 시각적 주목도가 낮게 표현한다.
- 측정 기준: 점검 질문: 화면 하단에서 사용자의 시선이 운영기관 식별자보다 푸터의 정보·링크에 먼저 가는가? 식별자 배경색이 서비스 디자인 주제의 컨테이너 배경색 범위 안에 있는가?
- 판정 방법: 수동 검토(디자인 리뷰).
- 자동 검사: none
- 적용 대상: 운영기관 식별자
- 근거: 화면 하단에서 사용자가 먼저 집중해야 할 정보는 푸터의 정보와 링크이므로 식별자가 주의를 빼앗지 않아야 한다(KRDS).
- 출처: KRDS 컴포넌트 > 운영기관 식별자 > 사용성 가이드라인 (가이드라인 PDF 2025.08 230쪽)

좋은 예 — 식별자가 푸터 정보·링크보다 주목도가 낮다
```
푸터 아래 운영기관 식별자를 컨테이너 배경색 위 작은 기관 로고와 안내 한 줄로 두고, 푸터의 연락처·정책 링크가 먼저 읽힌다.
```
나쁜 예 — 식별자가 푸터 정보·링크보다 주의를 끈다
```
운영기관 식별자를 원색 배경의 큰 띠 배너로 만들어 푸터 링크보다 먼저 눈에 띈다.
```

## COLOR-014 링크 위계(강조·기본)

- 강도: **SHOULD** (판정에 사람의 판단 필요: guide)
- 룰: 링크를 강조 링크(파란색 또는 서비스 주조색)와 기본 링크 두 단계로 구분하고, 강조 링크는 화면에서 가장 중요한 과업과 연결된 링크에만 쓴다.
- 측정 기준: 점검 질문: 화면의 링크 스타일이 강조·기본 두 단계로 나뉘는가? 강조 링크 스타일이 붙은 링크가 해당 화면의 가장 중요한 과업 링크인가? 중요도가 같은 여러 링크는 기본 링크인가?
- 판정 방법: 수동 검토. 스타일 단계 수(2단계)는 컴포넌트 토큰으로 확인.
- 자동 검사: none
- 적용 대상: a[href]
- 근거: 링크와 관련된 과업 중요도에 따라 위계를 분명히 해야 사용자가 가장 중요한 경로를 먼저 찾는다(KRDS 링크).
- 출처: KRDS 컴포넌트 > 링크 > 사용성 가이드라인 (가이드라인 PDF 2025.08 499·501쪽)

좋은 예 — 가장 중요한 과업 링크 하나만 강조 링크다
```
신청 안내 화면에서 '신청서 작성하기'만 강조 링크(주조색)로 두고, '자주 묻는 질문'·'관련 법령'은 기본 링크로 둔다.
```
나쁜 예 — 모든 링크가 강조되어 위계가 사라진다
```
같은 화면의 링크 6개를 모두 강조 링크(주조색) 스타일로 표시한다.
```

## COLOR-015 버튼 강조 단계(채움·윤곽선·텍스트)

- 강도: **SHOULD**
- 룰: 버튼 강조 단계를 주조색 채움 버튼(가장 중요한 행동), 윤곽선 버튼(중간 강조), 텍스트 버튼(가장 낮은 강조) 세 가지로 쓰고, 주조색 채움 버튼은 한 화면 상태에 1개만 둔다.
- 측정 기준: (1) 버튼(button, 버튼 모양 a)의 강조 스타일이 주조색 채움(button--primary)·윤곽선(button--secondary·button--tertiary)·텍스트(button--text) 세 단계 중 하나다. (2) 한 화면 상태 — 같은 시점에 보이는 화면. hidden·display:none·visibility:hidden·inert 영역은 빼고, 모달 대화상자가 열려 있으면 모달 안만 센다 — 에서 주조색 채움 버튼이 1개 이하다. 세지 않는 것: (가) aria-pressed="true" 토글 버튼, aria-current 가 있는 페이지네이션·탭 항목처럼 선택 상태를 나타내는 채움(행동 강조가 아니라 상태 표시 — COLOR-001 로 판정), (나) 구조화 목록 항목마다 1개인 CTA(LAYOUT-026, CF-070). 오류·빈 상태처럼 화면 상태가 바뀌어 '다시 시도' 같은 채움 버튼이 나타나면 그 상태에서 다시 센다.
- 판정 방법: 화면 상태(첫 화면, 오류 상태, 빈 상태, 처리 중, 모달 열림)마다 보이는 .button--primary(또는 계산 배경색이 주조색 채움 토큰인 버튼) 개수를 센다. 어느 행동이 가장 중요한지는 과업 분석으로 정한다(수동).
- 자동 검사: none
- 적용 대상: button, a.btn
- 결정 CF-070: 구조화 목록 항목마다 1개인 CTA 는 COLOR-015 의 '한 화면 상태에 주조색 채움 버튼 1개' 계산에서 뺀다. 목록 밖(페이지 머리·폼 하단·알림 등)의 주조색 채움 버튼은 그대로 세어 1개 이하로 둔다. 한 항목 안의 주조색 채움 버튼은 1개다(LAYOUT-026).
- 근거: 같은 크기의 버튼 사이에서 위계를 스타일로 구분해야 사용자가 주요 행동을 바로 찾는다(KRDS 버튼).
- 출처: KRDS 컴포넌트 > 버튼 > 사용성 가이드라인 (가이드라인 PDF 2025.08 512·514쪽)

좋은 예 — 가장 중요한 행동 하나만 주조색 채움이고 나머지는 윤곽선·텍스트다.
```html
<div class="button-group">
  <button type="submit" class="button button--primary">제출</button>
  <button type="button" class="button button--secondary">임시 저장</button>
  <button type="button" class="button button--text">작성 안내 보기</button>
</div>
```
나쁜 예 — 오류 상태에서 주조색 채움 버튼이 2개 보인다 — 하나를 윤곽선으로 낮춘다.
```html
<button type="button" class="button button--primary">새로 고침</button>
<!-- 불러오기 실패 상태에서 같은 화면에 나타남 -->
<div class="notice"><p>데이터를 불러오지 못했습니다.</p>
  <button type="button" class="button button--primary">다시 시도</button></div>
```

## COLOR-016 버튼 그룹 아이콘 위계

- 강도: **SHOULD**
- 룰: 버튼 그룹에서 가장 높은 강조 단계 버튼에 아이콘이 없으면 그 그룹의 다른 버튼에도 아이콘을 넣지 않는다.
- 측정 기준: 같은 버튼 그룹(공통 부모 안 버튼 2개 이상) 안에서 가장 높은 강조 스타일(주조색 채움 > 윤곽선 > 텍스트) 버튼에 아이콘 요소(svg, img, .icon)가 없으면, 나머지 버튼의 아이콘 요소 수가 0.
- 판정 방법: 커스텀 DOM 검사(버튼 변형 클래스로 강조 단계를 판정).
- 자동 검사: none
- 적용 대상: 버튼 그룹
- 근거: 아이콘이 있는 버튼은 없는 버튼보다 강조 수준이 높게 보이므로, 하위 버튼에만 아이콘이 있으면 위계가 뒤집힌다(KRDS 버튼).
- 출처: KRDS 컴포넌트 > 버튼 > 사용성 가이드라인 (가이드라인 PDF 2025.08 517쪽)

좋은 예 — 가장 높은 강조 버튼에 아이콘이 없으므로 나머지 버튼에도 아이콘이 없다
```html
<div class="btn-group">
  <button class="btn btn--primary">신청하기</button>
  <button class="btn btn--outline">임시 저장</button>
</div>
```
나쁜 예 — 하위 강조 버튼에만 아이콘이 있어 강조 위계가 뒤집힌다
```html
<div class="btn-group">
  <button class="btn btn--primary">신청하기</button>
  <button class="btn btn--outline"><svg aria-hidden="true"></svg>임시 저장</button>
</div>
```

## COLOR-017 배지 배경에 주조색 금지

- 강도: **SHOULD**
- 룰: 배지 배경색으로 서비스 주조색(primary color, 채움 버튼 배경색)을 쓰지 않는다.
- 측정 기준: 배지 요소의 계산값 background-color가 주조색 채움 버튼의 기본 상태 background-color와 같지 않다.
- 판정 방법: 커스텀 스크립트: 배지 셀렉터와 주조색 버튼의 계산 배경색 비교. 토큰 단계에서는 배지 배경 토큰이 primary 기본 단계를 참조하지 않는지 검사.
- 자동 검사: none
- 적용 대상: 배지
- 결정 CF-047: 가이드라인 문장을 따른다. COLOR-017 유지.
- 근거: 배지 배경에 주조색을 쓰면 사용자가 배지를 버튼으로 오인할 수 있다(KRDS 배지).
- 출처: KRDS 컴포넌트 > 배지 > 사용성 가이드라인 (가이드라인 PDF 2025.08 401·403쪽)

좋은 예 — 배지 배경을 주조색이 아닌 정보 색 연한 단계로 쓴다
```html
<span class="badge badge--info">안내</span>
<style>.badge--info{color:var(--palette-information-70);background:var(--palette-information-10)}</style>
```
나쁜 예 — 배지 배경이 주조색 채움 버튼과 같아 버튼으로 오인된다
```html
<span class="badge badge--primary">안내</span>
<style>.badge--primary{color:var(--palette-gray-0);background:var(--palette-primary-50)}</style>
```

## COLOR-019 태그 색 수 제한

- 강도: **SHOULD** (판정에 사람의 판단 필요: guide)
- 룰: 태그는 한 가지 색을 기본으로 쓰고, 색을 추가하는 경우 색 구분이 사용자에게 의미가 있을 때만 추가하며 동시에 표시되는 태그들이 같은 강조 수준으로 보이게 한다.
- 측정 기준: 점검 질문: 한 화면의 태그 색이 1종인가? 2종 이상이면 색 구분이 사용자 과업에 의미가 있는가? 동시에 보이는 태그 중 특정 태그만 더 눈에 띄지 않는가?
- 판정 방법: 수동 검토.
- 자동 검사: none
- 적용 대상: 태그
- 근거: 태그에 여러 색을 쓰면 주의가 분산되고 혼동을 준다(KRDS 태그).
- 출처: KRDS 컴포넌트 > 태그 > 사용성 가이드라인 (가이드라인 PDF 2025.08 562·565쪽)

좋은 예 — 태그 색 1종으로 모든 태그가 같은 강조 수준이다
```
검색 결과의 주제 태그('복지', '교육', '주거')를 모두 같은 회색 계열 한 가지로 표시한다.
```
나쁜 예 — 의미 없는 색 구분으로 특정 태그만 강조된다
```
주제 태그마다 빨강·파랑·노랑·보라를 임의로 배정해, 빨간 태그만 유독 눈에 띈다.
```

## COLOR-021 코치마크 버튼 강조 단계

- 강도: **SHOULD**
- 룰: 코치마크의 '그만보기'·'이전' 버튼은 텍스트 버튼 스타일로, '다음'·'마치기' 버튼은 고스트 버튼 스타일로 표시해 본문 액션 버튼보다 강조 수준을 낮춘다.
- 측정 기준: 코치마크 안 '그만보기'·'이전' 버튼이 텍스트 버튼 변형, '다음'·'마치기' 버튼이 고스트(윤곽선) 버튼 변형이고, 코치마크 안에 주조색 채움 버튼이 0개.
- 판정 방법: 커스텀 DOM 검사(버튼 레이블과 변형 클래스 확인).
- 자동 검사: none
- 적용 대상: 코치마크
- 근거: 코치마크는 본문 과업을 돕는 보조 안내이므로 그 버튼이 본문 액션보다 눈에 띄면 주요 과업에서 주의를 빼앗는다(KRDS 코치마크).
- 출처: KRDS 컴포넌트 > 코치마크 > 사용성 가이드라인 (가이드라인 PDF 2025.08 638·644쪽)

좋은 예 — 그만보기·이전은 텍스트 버튼, 다음은 고스트 버튼으로 본문 액션보다 강조가 낮다
```html
<div class="coachmark__actions">
  <button class="btn btn--text">그만보기</button>
  <button class="btn btn--text">이전</button>
  <button class="btn btn--ghost">다음</button>
</div>
```
나쁜 예 — 코치마크 '다음'이 주조색 채움 버튼이라 본문 액션 버튼과 강조 수준이 같다
```html
<div class="coachmark__actions">
  <button class="btn btn--text">그만보기</button>
  <button class="btn btn--primary">다음</button>
</div>
```

## COLOR-004 명도 단계로 대비 보장

- 강도: **MAY**
- 룰: 색 팔레트를 명도 단계 번호로 구성하고, 두 단계 번호 차이가 40 이상이면 3:1, 50 이상이면 4.5:1, 70 이상이면 7:1, 90 이상이면 15:1 이상 대비가 나오도록 단계 색을 맞춘다.
- 측정 기준: 팔레트 토큰의 모든 단계 쌍(같은 색상 계열 및 gray 0/100과의 쌍)에 대해 번호 차이 d ≥ 40 → 대비 ≥ 3:1, d ≥ 50 → ≥ 4.5:1, d ≥ 70 → ≥ 7:1, d ≥ 90 → ≥ 15:1.
- 판정 방법: 토큰 JSON을 읽어 모든 쌍의 WCAG 대비를 계산하는 스크립트(커스텀).
- 자동 검사: none
- 적용 대상: 색 팔레트 디자인 토큰
- 근거: 단계 번호 차이만 보고 대비 충족 여부를 알 수 있으면 디자이너·개발자·AI가 색 조합마다 대비를 다시 계산하지 않아도 된다(KRDS 매직넘버).
- 출처: KRDS 디자인 스타일 > 색상 > 접근성과 매직넘버 (가이드라인 PDF 2025.08 76~77쪽)

좋은 예 — 단계 번호 차이만으로 보장 대비를 알 수 있다
```css
:root{
  --color-gray-0:#ffffff;  /* 0 */
  --color-gray-40:#8a949e; /* 차이 40 → 3.08:1 ≥ 3:1 */
  --color-gray-50:#6d7882; /* 차이 50 → 4.51:1 ≥ 4.5:1 */
  --color-gray-70:#464c53; /* 차이 70 → 8.68:1 ≥ 7:1 */
  --color-gray-90:#1e2124; /* 차이 90 → 16.18:1 ≥ 15:1 */
}
```
나쁜 예 — 단계 번호 50 차이가 4.5:1을 보장하지 않아 번호만 보고 쓰면 대비가 부족하다
```css
:root{
  --color-gray-0:#ffffff;
  --color-gray-50:#8a949e; /* 차이 50인데 3.08:1 — 4.5:1 미달 */
}
```

## COLOR-018 배지 색 의미 체계

- 강도: **MAY** (판정에 사람의 판단 필요: guide)
- 룰: 배지 색은 레이블 정보와 색의 일반적 의미가 맞을 때 그 색을 쓰고(예: 중요·경고·반대는 빨강), 한 화면의 배지 색 종류를 늘려 주의를 분산시키지 않는다.
- 측정 기준: 점검 질문: 빨강·노랑·초록·파랑 계열 배지가 각각 위험·주의·성공·안내 의미의 레이블에만 쓰였는가? 의미와 무관한 색 배지가 있는가?
- 판정 방법: 수동 검토.
- 자동 검사: none
- 적용 대상: 배지
- 근거: 레이블 정보와 색의 일반적 의미가 일치하면 사용자가 정보를 더 빨리 처리하지만, 색을 과하게 쓰면 주의가 분산된다(KRDS 배지).
- 출처: KRDS 컴포넌트 > 배지 > 사용성 가이드라인 (가이드라인 PDF 2025.08 401~402쪽)

좋은 예 — 색의 일반 의미와 레이블이 맞는다
```
'마감 임박' 배지는 빨강(danger), '접수 중' 배지는 초록(success)으로 표시하고 레이블 텍스트로 의미를 함께 전달한다.
```
나쁜 예 — 색 의미가 레이블과 반대이고 색 종류가 많아 주의가 분산된다
```
'접수 완료' 배지를 빨강, '반려' 배지를 초록으로 표시하고, 한 목록에 배지 색을 6종 쓴다.
```

## COLOR-020 자막 텍스트 윤곽선·배경

- 강도: **MAY**
- 룰: 영상 자막 텍스트에는 윤곽선이나 반투명 검은색 배경을 넣어 영상 화면과 대비를 확보한다.
- 측정 기준: 자막 요소(::cue 또는 커스텀 자막 컨테이너)의 계산값에 text-shadow(윤곽선 효과), -webkit-text-stroke, 또는 알파 0보다 크고 1보다 작은 검은색 계열 background-color 중 1개 이상이 있다.
- 판정 방법: 수동+스크립트: 플레이어 자막 스타일을 확인한다.
- 자동 검사: none
- 적용 대상: video 자막, ::cue
- 근거: 자막 뒤 영상 장면은 계속 바뀌므로 윤곽선·반투명 배경이 없으면 밝은 장면에서 자막을 읽지 못할 수 있다(KRDS 접근 가능한 미디어).
- 출처: KRDS 컴포넌트 > 접근 가능한 미디어 > 디자인 (가이드라인 PDF 2025.08 745쪽)

좋은 예 — 자막 뒤에 반투명 검은 배경을 둬 밝은 장면에서도 읽힌다
```css
video::cue{color:var(--palette-gray-0);background:var(--color-alpha-inverse75)} /* rgba(0,0,0,.75) */
```
나쁜 예 — 윤곽선도 배경도 없어 밝은 장면에서 흰 자막이 묻힌다
```css
video::cue{color:var(--palette-gray-0);background:transparent}
```
