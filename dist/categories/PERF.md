# PERF — 성능 체감

ux-baseline 확정 룰. 자동 생성 파일이다.

| ID | 강도 | 룰 |
|---|---|---|
| PERF-001 | SHOULD | 본문용 웹폰트의 @font-face에는 font-display를 swap·fallback·optional 중 하나로 명시하고, block을 쓰거나 font-display를 생략(auto)하지 않는다. |
| PERF-002 | SHOULD | 한글 웹폰트는 unicode-range로 나눈 여러 서브셋 파일로 제공해, 페이지에 쓰인 글자가 속한 범위의 파일만 내려받게 한다. |
| PERF-003 | SHOULD | 웹폰트 파일은 WOFF2 형식으로 제공한다. |
| PERF-004 | SHOULD | unicode-range로 나눈 웹폰트 서브셋 파일을 link rel="preload"로 일괄 미리 불러오지 않고, 폰트 preload는 첫 화면 렌더링에 실제로 쓰이는 파일만 한 형식(WOFF2)으로 지정한다. |
| PERF-006 | SHOULD | 실사용자 측정(RUM) 기준 페이지 로드의 75번째 백분위 LCP를 모바일과 데스크톱 각각 2.5초 이하로 유지한다. |
| PERF-007 | SHOULD | 실사용자 측정(RUM) 기준 75번째 백분위 INP를 모바일과 데스크톱 각각 200ms 이하로 유지하고, 응답성 지표로 FID를 쓰지 않는다. |
| PERF-008 | SHOULD | 실사용자 측정(RUM) 기준 75번째 백분위 CLS를 모바일과 데스크톱 각각 0.1 이하로 유지한다. |
| PERF-009 | SHOULD | 지연 로딩 여부와 관계없이 모든 <img>와 <video>에 width·height 속성을 지정하거나 CSS aspect-ratio로 공간을 예약하고, 반응형 크기 조정은 width: 100%(또는 max-width: 100%)와 height: auto로 한다. |
| PERF-010 | SHOULD | 광고·임베드(지도·동영상·SNS)·iframe처럼 늦게 로드되는 영역은 min-height 또는 aspect-ratio로 공간을 미리 예약하고, 콘텐츠가 오지 않아도 예약 공간을 접지 않고 자리표시자를 보여준다. |
| PERF-011 | SHOULD | 사용자 상호작용 없이 기존 콘텐츠 위나 사이에 배너·폼·목록 항목을 끼워 넣지 않고, 필요하면 공간을 미리 예약하거나 문서 흐름 밖 오버레이로 띄우거나 '더 보기' 같은 사용자 조작으로 불러온다. |
| PERF-013 | SHOULD | loading="lazy"는 첫 화면 뷰포트 밖의 이미지·iframe에만 쓰고, 페이지 로드 시 뷰포트에 보이는 이미지와 LCP 후보 이미지에는 쓰지 않는다. |
| PERF-014 | SHOULD | LCP 후보 이미지는 초기 HTML의 <img src>(또는 <link rel="preload" as="image">)로 발견되게 하고 data-src 같은 JS 지연 로딩을 쓰지 않으며, fetchpriority="high"는 한 페이지에서 최대 2개 이미지에만 준다. |
| PERF-017 | SHOULD | 사용자 조작에 대한 화면 반응(선택 강조·눌림 상태·입력 문자 표시)은 조작 후 100ms 이내에 보여준다. |
| PERF-018 | SHOULD | 스켈레톤 화면은 전체 페이지(화면) 로드에만 쓰고 실제 콘텐츠 배치를 본뜬 자리표시자를 포함하며, 다운로드·업로드·파일 변환 같은 처리 작업에는 스켈레톤 대신 진행 막대를 쓴다. |
| PERF-005 | MAY | 웹폰트가 교체될 때 생기는 레이아웃 이동을 줄이려면 font-display: optional을 쓰거나, 폴백 글꼴용 @font-face에 size-adjust·ascent-override·descent-override·line-gap-override로 웹폰트와 메트릭을 맞춘다. |
| PERF-016 | MAY | 클릭·탭·키 입력의 이벤트 핸들러에서는 다음 프레임에 그릴 시각 피드백(눌림 상태·선택 표시·로딩 표시)만 먼저 반영하고, 저장·분석 전송 같은 나머지 작업은 이후 태스크로 미룬다. |

## PERF-001 웹폰트 font-display 명시

- 강도: **SHOULD**
- 룰: 본문용 웹폰트의 @font-face에는 font-display를 swap·fallback·optional 중 하나로 명시하고, block을 쓰거나 font-display를 생략(auto)하지 않는다.
- 측정 기준: 본문 텍스트(body·p·li 등)에 쓰이는 font-family의 모든 @font-face 규칙에 font-display 디스크립터가 있고 값이 swap, fallback, optional 중 하나다.
- 판정 방법: stylelint로 @font-face의 font-display 존재와 값을 검사하고, Lighthouse font-display 감사로 실제 로드 시 텍스트가 보이는지 확인한다.
- 자동 검사: partial (stylelint/at-rule-property-required-list, stylelint/declaration-property-value-disallowed-list, lighthouse/font-display)
- 적용 대상: @font-face
- 예외: 특정 글꼴로 그려지지 않으면 페이지를 쓸 수 없는 작은 텍스트(예: 아이콘 폰트)는 block을 쓸 수 있다(CSS Fonts 4 block 설명).
- 근거: 기본 동작(auto)은 브라우저마다 웹폰트가 올 때까지 텍스트를 최대 3초(Chromium·Firefox) 또는 무기한(Safari) 숨긴다. 본문이 보이지 않으면 사용자가 읽기를 시작할 수 없다.
- 출처: CSS_FONTS_4 4.9 font-display; WEBDEV_FONT_BP Font rendering — Choose an appropriate font-display strategy

좋은 예 — 본문 웹폰트에 font-display: swap을 명시했다.
```css
@font-face {
  font-family: "Pretendard GOV";
  src: url(/fonts/pretendard-gov.woff2) format("woff2");
  font-display: swap;
}
```
나쁜 예 — font-display를 생략해 auto(차단)로 동작한다.
```css
@font-face {
  font-family: "Pretendard GOV";
  src: url(/fonts/pretendard-gov.woff2) format("woff2");
  /* font-display 생략 → auto */
}
```

## PERF-002 한글 웹폰트 서브셋·unicode-range 분할

- 강도: **SHOULD**
- 룰: 한글 웹폰트는 unicode-range로 나눈 여러 서브셋 파일로 제공해, 페이지에 쓰인 글자가 속한 범위의 파일만 내려받게 한다.
- 측정 기준: 한글 웹폰트 font-family마다 (1) 같은 family·weight·style에 대한 @font-face 규칙이 2개 이상이고 각각 unicode-range 디스크립터를 가진다. (2) 그 unicode-range들의 합이 한글 음절 U+AC00–D7A3 전체를 덮는다(희귀 음절 누락 방지).
- 판정 방법: CSS를 파싱해 한글 family별 @font-face 개수·unicode-range를 검사하고, 범위 합집합이 U+AC00–D7A3을 포함하는지 계산한다.
- 자동 검사: none
- 적용 대상: @font-face (한글 글꼴)
- 근거: CJK 글꼴은 1만 자가 넘어 파일이 크다. unicode-range로 나누면 브라우저가 페이지에 쓰인 글자가 있는 서브셋만 내려받아 전송량과 텍스트 표시 지연이 줄어든다.
- 출처: WEBDEV_FONT_BP Font delivery — Subset fonts / unicode-range; CSS_FONTS_4 4.5 Character range: the unicode-range descriptor

좋은 예 — unicode-range로 나눈 서브셋 두 개가 한글 음절 U+AC00–D7A3 전체를 덮는다.
```css
@font-face { font-family: "Pretendard GOV"; src: url(/f/pg-0.woff2) format("woff2"); unicode-range: U+AC00-B9FF; font-display: swap; }
@font-face { font-family: "Pretendard GOV"; src: url(/f/pg-1.woff2) format("woff2"); unicode-range: U+BA00-D7A3; font-display: swap; }
```
나쁜 예 — 한글 전체를 한 파일로 제공해 글자 몇 개에도 전체를 내려받는다.
```css
@font-face { font-family: "Pretendard GOV"; src: url(/f/pretendard-gov-full.woff2) format("woff2"); } /* 한 파일 */
```

## PERF-003 웹폰트 WOFF2

- 강도: **SHOULD**
- 룰: 웹폰트 파일은 WOFF2 형식으로 제공한다.
- 측정 기준: 모든 @font-face src의 url()이 format("woff2") 또는 .woff2 파일을 가리키고, 같은 src 목록에 woff·ttf·otf·eot 파일이 없다.
- 판정 방법: stylelint 커스텀 또는 빌드 산출물 확장자 검사.
- 자동 검사: none
- 적용 대상: @font-face src
- 근거: WOFF2는 Brotli 압축으로 WOFF보다 30% 더 작고 최신 브라우저가 모두 지원한다(web.dev). 다른 형식을 함께 두면 실수로 두 번 내려받을 수 있다.
- 출처: WEBDEV_FONT_BP Font delivery — Use WOFF2

좋은 예 — WOFF2 파일 하나만 제공한다.
```css
@font-face { font-family: "Pretendard GOV"; src: url(/f/pg.woff2) format("woff2"); }
```
나쁜 예 — WOFF·TTF를 함께 나열했다.
```css
@font-face { font-family: "Pretendard GOV"; src: url(/f/pg.woff2) format("woff2"), url(/f/pg.woff) format("woff"), url(/f/pg.ttf) format("truetype"); }
```

## PERF-004 웹폰트 preload 제한

- 강도: **SHOULD**
- 룰: unicode-range로 나눈 웹폰트 서브셋 파일을 link rel="preload"로 일괄 미리 불러오지 않고, 폰트 preload는 첫 화면 렌더링에 실제로 쓰이는 파일만 한 형식(WOFF2)으로 지정한다.
- 측정 기준: (1) <link rel="preload" as="font">의 대상이 모두 같은 형식(type="font/woff2")이다. (2) preload한 각 폰트 파일이 첫 화면 렌더링에 사용된다 — Chrome 콘솔에 'preloaded … but not used within a few seconds' 경고가 없다. (3) 한 family의 unicode-range 서브셋 파일 전체를 preload하지 않는다.
- 판정 방법: HTML 정적 검사로 (1)(3)을, Playwright로 콘솔 경고를 수집해 (2)를 확인한다.
- 자동 검사: none
- 적용 대상: link[rel=preload][as=font]
- 근거: preload는 unicode-range를 무시하고 브라우저의 형식 협상을 우회하며 다른 자원의 로딩 자원을 빼앗는다. 한글은 서브셋이 수십 개라 일괄 preload하면 첫 화면에 쓰지 않는 파일까지 받는다.
- 출처: WEBDEV_FONT_BP Font loading — Be cautious when using preload to load fonts

좋은 예 — 첫 화면에 쓰이는 WOFF2 파일 하나만 type을 명시해 preload한다.
```html
<link rel="preload" href="/f/pg-0.woff2" as="font" type="font/woff2" crossorigin>
```
나쁜 예 — 서브셋 파일 전체를 preload해 다른 리소스 로딩을 방해한다.
```html
<link rel="preload" href="/f/pg-0.woff2" as="font" crossorigin>
<link rel="preload" href="/f/pg-1.woff2" as="font" crossorigin>
<!-- … 서브셋 92개 전부 -->
```

## PERF-006 LCP 2.5초 이하(p75)

- 강도: **SHOULD**
- 룰: 실사용자 측정(RUM) 기준 페이지 로드의 75번째 백분위 LCP를 모바일과 데스크톱 각각 2.5초 이하로 유지한다.
- 측정 기준: 최근 28일 RUM 데이터(web-vitals onLCP)를 모바일·데스크톱으로 나눠 집계한 p75 LCP가 각각 2500ms 이하이다. RUM이 없는 단계에서는 Lighthouse CI의 largest-contentful-paint ≤ 2500ms를 대리 지표로 쓰되 통과로 간주하지 않는다.
- 판정 방법: web-vitals 라이브러리로 수집한 값을 기기군별 p75로 집계한다. 실험실 값은 회귀 감지용.
- 자동 검사: partial (lighthouse/largest-contentful-paint)
- 적용 대상: 모든 페이지
- 근거: 주요 콘텐츠가 늦게 보이면 사용자는 페이지가 느리다고 느끼고 떠난다. 2.5초는 좋은 사용자 경험의 기준으로 제시된 값이다.
- 출처: WEBDEV_VITALS Core Web Vitals 목록, 75th percentile; WEBDEV_LCP What is a good LCP score?; WEBDEV_CWV_THRESHOLDS 임계값 표

좋은 예 — web-vitals onLCP로 실사용자 LCP를 수집해 p75를 집계한다.
```js
import { onLCP } from 'web-vitals';
onLCP(m => navigator.sendBeacon('/rum', JSON.stringify({ name: m.name, value: m.value })));
```
나쁜 예 — 실험실 측정 1회를 통과 근거로 쓰고 모바일·데스크톱 실사용자 p75를 보지 않는다.
```
판정: Lighthouse 데스크톱 실험실 측정 1회 LCP 1.8초 → 통과 처리. 모바일 실사용자 p75(3.4초)는 수집하지 않음.
```

## PERF-007 INP 200ms 이하(p75)

- 강도: **SHOULD**
- 룰: 실사용자 측정(RUM) 기준 75번째 백분위 INP를 모바일과 데스크톱 각각 200ms 이하로 유지하고, 응답성 지표로 FID를 쓰지 않는다.
- 측정 기준: 최근 28일 RUM 데이터(web-vitals onINP)를 모바일·데스크톱으로 나눠 집계한 p75 INP가 각각 200ms 이하이다. 성능 대시보드·예산에 FID 항목이 없다.
- 판정 방법: web-vitals onINP로 수집해 기기군별 p75로 집계한다. 실험실 대리 지표로 Lighthouse total-blocking-time을 본다.
- 자동 검사: partial (lighthouse/total-blocking-time)
- 적용 대상: 모든 페이지
- 결정 CF-015: 양립. PERF-017은 조작 직후 화면에 보이는 즉각 반응(눌림·선택 표시)의 상한, PERF-007은 실사용자 측정 지표(INP p75)의 상한이다. 측정 대상이 다르므로 둘 다 적용한다.
- 근거: 클릭·탭·키 입력 뒤 화면이 늦게 바뀌면 사용자는 입력이 무시됐다고 느끼고 반복 입력한다. FID는 2024-03-12 Core Web Vitals에서 INP로 대체됐다.
- 출처: WEBDEV_INP What is a good INP score?; WEBDEV_VITALS Core Web Vitals 목록; WEBDEV_INP_CWV_2024 INP replaces FID on March 12 (2024)

좋은 예 — web-vitals onINP로 실사용자 INP를 수집한다.
```js
import { onINP } from 'web-vitals';
onINP(m => navigator.sendBeacon('/rum', JSON.stringify({ name: m.name, value: m.value })));
```
나쁜 예 — 폐기된 FID만 수집한다.
```js
import { onFID } from 'web-vitals'; // 폐기된 지표만 수집
```

## PERF-008 CLS 0.1 이하(p75)

- 강도: **SHOULD**
- 룰: 실사용자 측정(RUM) 기준 75번째 백분위 CLS를 모바일과 데스크톱 각각 0.1 이하로 유지한다.
- 측정 기준: 최근 28일 RUM 데이터(web-vitals onCLS)를 모바일·데스크톱으로 나눠 집계한 p75 CLS가 각각 0.1 이하이다.
- 판정 방법: web-vitals onCLS로 수집해 기기군별 p75로 집계한다. Lighthouse CI cumulative-layout-shift ≤ 0.1은 로드 구간만 잡는 대리 지표.
- 자동 검사: partial (lighthouse/cumulative-layout-shift)
- 적용 대상: 모든 페이지
- 근거: 읽던 텍스트나 누르려던 버튼이 갑자기 밀려나면 사용자가 위치를 잃거나 잘못 누른다.
- 출처: WEBDEV_CLS What is a good CLS score?; WEBDEV_VITALS Core Web Vitals 목록

좋은 예 — web-vitals onCLS로 실사용자 CLS를 수집한다.
```js
import { onCLS } from 'web-vitals';
onCLS(m => navigator.sendBeacon('/rum', JSON.stringify({ name: m.name, value: m.value })));
```
나쁜 예 — 평균값과 기기 합산으로 판정해 모바일 p75 0.1 초과를 놓친다.
```
판정: 모바일·데스크톱을 합친 평균 CLS 0.06 → 통과 처리. 모바일만 본 p75는 0.18.
```

## PERF-009 이미지·동영상 크기 예약

- 강도: **SHOULD**
- 룰: 지연 로딩 여부와 관계없이 모든 <img>와 <video>에 width·height 속성을 지정하거나 CSS aspect-ratio로 공간을 예약하고, 반응형 크기 조정은 width: 100%(또는 max-width: 100%)와 height: auto로 한다.
- 측정 기준: (1) 모든 img·video 요소에 width와 height 속성이 함께 있거나, 계산된 aspect-ratio가 auto가 아닌 값이다. (2) CSS로 너비를 바꾸는 img는 height가 auto이다(고정 height로 비율이 깨지지 않음). (3) loading="lazy"인 img도 (1)을 만족한다.
- 판정 방법: Lighthouse unsized-images 감사와 HTML 정적 검사로 (1)(3)을, 계산 스타일 검사로 (2)를 확인한다.
- 자동 검사: partial (lighthouse/unsized-images)
- 적용 대상: img, video, img[loading=lazy]
- 예외: <picture>의 <source>마다 가로세로비가 다르면 각 <source>에 width·height를 지정한다(1단계 메모, web.dev 원문 확인 안 함 — 확인 필요).
- 근거: 크기를 모르는 이미지는 로드되는 순간 공간을 차지하며 아래 콘텐츠를 밀어낸다. 지연 로딩 이미지는 크기가 없으면 0×0으로 계산돼 갤러리 이미지가 모두 즉시 로드될 수 있다.
- 출처: WEBDEV_OPT_CLS Images without dimensions; WEBDEV_LAZY_IMG width/height 권고, 0×0 갤러리 문제

좋은 예 — width·height 속성으로 이미지 공간을 예약한다.
```html
<img src="hero.jpg" alt="민원실 안내" width="1200" height="675">
```
좋은 예 — 반응형 조정은 max-width: 100%와 height: auto로 한다.
```css
img { max-width: 100%; height: auto; }
```
나쁜 예 — 고정 height로 비율이 깨지고, 지연 로딩 이미지에 크기 속성이 없다.
```html
<img src="hero.jpg" alt="민원실 안내" style="height: 400px; width: 100%;">
<img src="g1.jpg" alt="" loading="lazy">
```

## PERF-010 늦게 로드되는 영역 공간 예약

- 강도: **SHOULD**
- 룰: 광고·임베드(지도·동영상·SNS)·iframe처럼 늦게 로드되는 영역은 min-height 또는 aspect-ratio로 공간을 미리 예약하고, 콘텐츠가 오지 않아도 예약 공간을 접지 않고 자리표시자를 보여준다.
- 측정 기준: (1) iframe·광고 슬롯([data-ad-slot])·임베드 컨테이너의 로드 직후(내용 도착 전) 계산 높이가 0보다 크고, min-height 또는 aspect-ratio가 지정돼 있다. (2) 내용이 오지 않는 경우(광고 미노출·임베드 실패)에도 컨테이너 높이가 줄지 않고 자리표시자가 보인다.
- 판정 방법: Playwright로 네트워크를 지연·차단한 상태에서 컨테이너 높이를 로드 직후와 10초 뒤에 비교한다.
- 자동 검사: none
- 적용 대상: iframe, [data-ad-slot], 지도·동영상·SNS 임베드
- 예외: 크기가 바뀌는 광고처럼 정확한 크기를 알 수 없으면 더 큰 컨테이너로 예약하거나 과거 데이터상 가장 흔한 크기로 예약할 수 있다(web.dev — 일부 이동 감수).
- 근거: 임베드 위젯은 로드 전 크기를 모르므로 공간을 예약하지 않으면 도착하는 순간 콘텐츠를 밀어낸다. 예약한 공간을 접는 것도 콘텐츠를 삽입하는 것만큼 CLS를 만든다.
- 출처: WEBDEV_OPT_CLS Ads, embeds, and other late-loaded content — Reserve space for late-loading content

좋은 예 — 지도 임베드 공간을 aspect-ratio로 예약하고 자리표시자 배경을 둔다.
```css
.map-embed { aspect-ratio: 16 / 9; background: var(--color-surface-gray-subtle); }
```
나쁜 예 — 높이 0인 광고 슬롯이 광고 도착 시 늘어나 본문을 밀어낸다.
```html
<div class="ad-slot"></div> <!-- 높이 0, 광고 도착 시 300px로 늘어남 -->
```

## PERF-011 상호작용 없는 콘텐츠 삽입 금지

- 강도: **SHOULD**
- 룰: 사용자 상호작용 없이 기존 콘텐츠 위나 사이에 배너·폼·목록 항목을 끼워 넣지 않고, 필요하면 공간을 미리 예약하거나 문서 흐름 밖 오버레이로 띄우거나 '더 보기' 같은 사용자 조작으로 불러온다.
- 측정 기준: 페이지 로드부터 사용자 입력 없이 10초 동안 관찰했을 때, hadRecentInput=false인 layout-shift 엔트리의 원인(sources)이 새로 삽입된 요소 때문에 밀려난 기존 콘텐츠인 경우가 없다. 쿠키 동의·앱 설치 유도 배너는 예약 공간 안에 있거나 position: fixed/sticky 오버레이다.
- 판정 방법: PerformanceObserver(layout-shift)로 엔트리와 sources를 수집하고 DOM 변이 기록과 대조한다.
- 자동 검사: none
- 적용 대상: 쿠키 동의 배너, 앱 설치 유도 배너, 동적 목록, 실시간 피드
- 예외: 사용자 입력 후 500ms 안에 생기는 이동(CLS에서 제외 — web.dev). 네트워크 요청 등으로 500ms를 넘길 것 같으면 500ms 안에 공간을 먼저 예약한다.
- 근거: 사용자가 보고 있던 콘텐츠 위에 무언가가 끼어들면 위치를 잃거나 잘못 누른다. 사용자 입력 뒤 500ms 안의 이동은 예상된 것으로 보아 CLS에서 빠진다.
- 출처: WEBDEV_OPT_CLS Avoid inserting new content without a user interaction; WEBDEV_CLS hadRecentInput 500ms

좋은 예 — 쿠키 배너를 문서 흐름 밖 고정 오버레이로 띄운다.
```css
.cookie-banner { position: fixed; inset-block-end: 0; inset-inline: 0; }
```
나쁜 예 — 3초 뒤 본문 앞에 배너를 끼워 읽던 내용을 밀어낸다.
```js
setTimeout(() => document.querySelector('main').prepend(promoBanner), 3000); // 읽던 본문을 밀어냄
```

## PERF-013 첫 화면·LCP 이미지 지연 로딩 금지

- 강도: **SHOULD**
- 룰: loading="lazy"는 첫 화면 뷰포트 밖의 이미지·iframe에만 쓰고, 페이지 로드 시 뷰포트에 보이는 이미지와 LCP 후보 이미지에는 쓰지 않는다.
- 측정 기준: 프로젝트가 지원하는 각 브레이크포인트(RESP-004)의 최소 너비 테스트 뷰포트에서 (1) 로드 직후 뷰포트와 교차하는 img·iframe에 loading="lazy"가 없고, (2) LCP 요소가 img이면 loading="lazy"가 없다.
- 판정 방법: Lighthouse lcp-lazy-loaded 감사로 (2)를, Playwright로 뷰포트 교차 img의 loading 속성을 검사해 (1)을 확인한다.
- 자동 검사: partial (lighthouse/lcp-lazy-loaded)
- 적용 대상: img[loading=lazy], iframe[loading=lazy]
- 근거: 지연 로딩 이미지는 브라우저가 배치를 계산한 뒤에야 요청되므로, 첫 화면 이미지에 쓰면 오히려 늦게 보이고 LCP가 나빠진다.
- 출처: WEBDEV_LAZY_IMG Always eager-load images visible in the first viewport; WEBDEV_OPT_LCP loading=lazy가 LCP 이미지를 늦춤; HTML_LS 2.5.7 Lazy loading attributes (lazy|eager, 기본 eager)

좋은 예 — 첫 화면 이미지는 즉시 로드하고 아래쪽 이미지만 lazy로 둔다.
```html
<img src="hero.jpg" alt="…" width="1200" height="675" fetchpriority="high">
<img src="below.jpg" alt="…" width="600" height="400" loading="lazy">
```
나쁜 예 — 첫 화면 LCP 이미지에 loading="lazy"를 썼다.
```html
<img src="hero.jpg" alt="…" width="1200" height="675" loading="lazy">
```

## PERF-014 LCP 이미지 발견 가능성·우선순위

- 강도: **SHOULD**
- 룰: LCP 후보 이미지는 초기 HTML의 <img src>(또는 <link rel="preload" as="image">)로 발견되게 하고 data-src 같은 JS 지연 로딩을 쓰지 않으며, fetchpriority="high"는 한 페이지에서 최대 2개 이미지에만 준다.
- 측정 기준: (1) LCP 요소가 img이면 그 src·srcset이 서버가 보낸 초기 HTML에 있다(또는 CSS 배경이면 초기 HTML에 preload 링크가 있다). (2) LCP img에 data-src·data-srcset만 있고 src가 비어 있는 패턴이 없다. (3) 문서 안 fetchpriority="high"인 img·link[as=image]가 2개 이하이다.
- 판정 방법: Playwright로 LCP 엔트리의 element를 얻어 초기 HTML(응답 본문)에 그 URL이 있는지 확인하고, HTML 정적 검사로 fetchpriority 개수를 센다.
- 자동 검사: partial (lighthouse/prioritize-lcp-image)
- 적용 대상: LCP 이미지, img[fetchpriority=high]
- 근거: LCP 이미지가 JS나 외부 CSS에서만 참조되면 브라우저 사전 스캐너가 늦게 발견해 로딩이 늦어진다. 높은 우선순위를 여러 이미지에 주면 우선순위 지정이 소용없어진다.
- 출처: WEBDEV_OPT_LCP Eliminate resource load delay; fetchpriority

좋은 예 — LCP 이미지를 초기 HTML의 src로 두고 fetchpriority="high"를 준다.
```html
<img src="/hero.webp" alt="…" width="1200" height="675" fetchpriority="high">
```
나쁜 예 — data-src JS 지연 로딩으로 LCP 이미지 발견이 늦어진다.
```html
<img data-src="/hero.webp" class="js-lazy" alt="…">
```

## PERF-017 0.1초 즉각 반응

- 강도: **SHOULD**
- 룰: 사용자 조작에 대한 화면 반응(선택 강조·눌림 상태·입력 문자 표시)은 조작 후 100ms 이내에 보여준다.
- 측정 기준: 대표 상호작용(버튼 클릭, 목록 항목 선택, 텍스트 입력)마다 입력 이벤트 시각부터 대상 요소의 시각 상태가 바뀐 첫 프레임까지가 100ms 이하이다(중급 모바일 기기 또는 CPU 4배 감속 에뮬레이션 기준).
- 판정 방법: Playwright로 CPU 감속 후 입력을 보내고 requestAnimationFrame·PerformanceEventTiming으로 다음 페인트까지 시간을 잰다.
- 자동 검사: none
- 적용 대상: button, [role=option], input, textarea
- 결정 CF-015: 양립. PERF-017은 조작 직후 화면에 보이는 즉각 반응(눌림·선택 표시)의 상한, PERF-007은 실사용자 측정 지표(INP p75)의 상한이다. 측정 대상이 다르므로 둘 다 적용한다.
- 근거: 0.1초 이내면 사용자는 시스템이 즉시 반응한다고 느끼고 객체를 직접 조작한다고 느낀다. 이를 넘으면 지연을 알아챈다.
- 출처: NNG_RESPONSE_TIMES 0.1 second

좋은 예 — :active 상태로 누르는 즉시 눌림 표시가 바뀐다.
```css
button:active { background: var(--color-button-primary-fill-pressed); } /* 즉시 눌림 표시 */
```
나쁜 예 — 서버 응답을 기다린 뒤에야 선택 표시를 한다.
```js
button.addEventListener('click', async () => { await fetch('/api'); button.classList.add('is-selected'); }); // 응답 뒤에야 선택 표시
```

## PERF-018 스켈레톤 사용 범위

- 강도: **SHOULD**
- 룰: 스켈레톤 화면은 전체 페이지(화면) 로드에만 쓰고 실제 콘텐츠 배치를 본뜬 자리표시자를 포함하며, 다운로드·업로드·파일 변환 같은 처리 작업에는 스켈레톤 대신 진행 막대를 쓴다.
- 측정 기준: (1) 스켈레톤 컴포넌트는 화면 전체 로드 상태에서만 렌더링되고, 업로드·다운로드·변환 진행 상태에서는 progress 또는 role="progressbar"가 렌더링된다. (2) 스켈레톤에는 헤더·푸터·배경만이 아니라 본문 콘텐츠 블록(제목·텍스트 줄·이미지 자리)의 자리표시자가 있다.
- 판정 방법: 컴포넌트 규격 리뷰와 상태별 스토리(로드·업로드) 렌더링으로 확인한다.
- 자동 검사: none
- 적용 대상: 스켈레톤, [aria-busy=true] 자리표시자
- 결정 CF-016: 선택 순서: 화면(페이지) 로드 → 스켈레톤, 끝 지점을 아는 처리 → 확정 진행 표시, 끝을 모르는 처리 → 불확정 진행 표시.
- 결정 CF-063: 스플래시 스크린은 이 체계(웹 프로젝트)의 범위 밖으로 둔다. 웹사이트와 웹앱(SPA 포함)의 첫 로드는 '페이지 로드'로 보고 스켈레톤을 쓴다(PERF-018). 설치형 웹앱(PWA)의 실행 화면은 운영체제가 웹 앱 매니페스트(아이콘·배경색)로 그리므로 별도 규격을 두지 않는다. components/splash-screen 규격은 삭제한다.
- 근거: 스켈레톤은 페이지 구조를 미리 보여 줘 기다리는 동안 인지 부담을 줄이지만, 처리 작업에는 남은 양을 알려 주는 진행 막대가 맞다. 헤더·푸터만 그린 스켈레톤은 구조를 알려 주지 못해 스피너와 다를 바 없다.
- 출처: NNG_SKELETON Are Skeleton Screens Better…; Progress Bars Are Best for Process-Related Indicators; Do Not Use a Frame-Display Skeleton Screen

좋은 예 — 페이지 로드 스켈레톤에 제목·텍스트 줄·이미지 자리표시자가 있다.
```html
<main aria-busy="true">
  <div class="sk sk-title"></div><div class="sk sk-line"></div><div class="sk sk-line"></div><div class="sk sk-img"></div>
</main>
```
나쁜 예 — 파일 업로드 처리에 진행 막대 대신 스켈레톤을 쓴다.
```html
<!-- 파일 업로드 중 스켈레톤 표시 -->
<div class="upload"><div class="sk sk-line"></div></div>
```

## PERF-005 웹폰트 교체로 인한 레이아웃 이동 줄이기

- 강도: **MAY**
- 룰: 웹폰트가 교체될 때 생기는 레이아웃 이동을 줄이려면 font-display: optional을 쓰거나, 폴백 글꼴용 @font-face에 size-adjust·ascent-override·descent-override·line-gap-override로 웹폰트와 메트릭을 맞춘다.
- 측정 기준: 웹폰트를 쓰는 font-family마다 (a) 그 웹폰트 @font-face의 font-display가 optional이거나, (b) font-family 목록에서 웹폰트 바로 뒤에 local() 시스템 글꼴을 src로 하는 폴백 @font-face가 있고 size-adjust·ascent-override·descent-override·line-gap-override 중 하나 이상을 지정한다.
- 판정 방법: CSS 파싱으로 (a)(b)를 검사하고, 효과는 Lighthouse CLS·웹 바이탈 CLS(PERF-008)로 확인한다.
- 자동 검사: none
- 적용 대상: @font-face, font-family
- 예외: KRDS 표준형 서비스: font-display: optional 대신 폴백 글꼴 메트릭 맞춤을 쓴다(CF-014).
- 결정 CF-014: KRDS 표준형 서비스는 font-display: optional 대신 PERF-005의 두 번째 방법(폴백 글꼴 메트릭 맞춤)을 쓴다.
- 근거: 폴백 글꼴로 먼저 배치된 텍스트는 웹폰트로 바뀔 때 글자 크기·행 높이 차이만큼 주변 콘텐츠를 밀어낸다. 숨긴 텍스트(FOIT)도 폴백 글꼴로 배치되므로 같은 이동이 생긴다.
- 출처: WEBDEV_FONT_BP Reduce the shift between your fallback font and your webfont; WEBDEV_OPT_CLS Web fonts; MDN_BCD css.at-rules.font-face.size-adjust

좋은 예 — 폴백 글꼴용 @font-face에 size-adjust를 지정해 메트릭을 맞췄다.
```css
@font-face { font-family: "PG-fallback"; src: local("Apple SD Gothic Neo"), local("Malgun Gothic"); size-adjust: 102%; }
body { font-family: "Pretendard GOV", "PG-fallback", sans-serif; }
```
나쁜 예 — swap 교체 시 메트릭 조정이 없어 레이아웃이 이동한다.
```css
body { font-family: "Pretendard GOV", sans-serif; } /* swap + 메트릭 조정 없음 */
```

## PERF-016 시각 피드백 먼저, 나머지는 양보

- 강도: **MAY** (판정에 사람의 판단 필요: guide)
- 룰: 클릭·탭·키 입력의 이벤트 핸들러에서는 다음 프레임에 그릴 시각 피드백(눌림 상태·선택 표시·로딩 표시)만 먼저 반영하고, 저장·분석 전송 같은 나머지 작업은 이후 태스크로 미룬다.
- 측정 기준: 점검 질문: (1) 이벤트 핸들러가 시각 갱신에 필요하지 않은 작업(네트워크 전송·분석 이벤트·대량 계산)을 동기적으로 실행하는가? (2) 그런 작업이 setTimeout·scheduler.yield 등으로 다음 태스크로 미뤄져 있는가?
- 판정 방법: 코드 리뷰와 Chrome DevTools Performance 패널의 상호작용 트레이스로 핸들러의 긴 태스크를 확인한다.
- 자동 검사: none
- 적용 대상: click·keydown·pointerup 이벤트 핸들러
- 근거: 핸들러가 모든 작업을 끝낸 뒤에야 화면을 그리면 입력에 대한 반응이 늦어진다. 시각 갱신만 먼저 하면 다음 프레임이 빨리 그려진다.
- 출처: WEBDEV_OPT_INP Yield to allow rendering work to occur sooner

좋은 예 — 눌림 상태를 먼저 반영하고 저장·분석 전송은 다음 태스크로 미룬다.
```js
button.addEventListener('click', () => {
  button.setAttribute('aria-pressed', 'true'); // 시각 갱신 먼저
  setTimeout(() => { saveSetting(); sendAnalytics(); }, 0);
});
```
나쁜 예 — 동기 작업이 끝난 뒤에야 눌림 상태가 바뀐다.
```js
button.addEventListener('click', () => {
  saveSettingSync(); sendAnalyticsSync(); // 긴 작업 뒤에야 화면 갱신
  button.setAttribute('aria-pressed', 'true');
});
```
