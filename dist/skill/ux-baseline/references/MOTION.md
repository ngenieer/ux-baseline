# MOTION — 모션

ux-baseline 확정 룰. 자동 생성 파일이다.

| ID | 강도 | 룰 |
|---|---|---|
| MOTION-001 | MUST | 자동으로 시작해 5초를 넘게 다른 콘텐츠와 함께 움직이거나 깜빡이거나 스크롤되는 콘텐츠와, 자동으로 시작해 다른 콘텐츠와 함께 표시되는 자동 갱신 콘텐츠에는 일시정지·정지·숨기기 수단(자동 갱신은 갱신 빈도 조절도 가능)을 제공한다. |
| MOTION-002 | MUST | 초당 3회 이상 깜빡이거나 번쩍이는 콘텐츠를 두지 않는다(상한 없음, 면적·휘도 임계값 예외를 쓰지 않는다). |
| MOTION-010 | MUST | 애니메이션·전환의 지속 시간(duration)과 이징(easing)은 모션 디자인 토큰(CSS 변수)에서만 고르고 CSS·JS에 ms 값이나 cubic-bezier() 값을 직접 쓰지 않는다. |
| MOTION-003 | SHOULD | 확정 스피너는 식별자를 0도(12시 방향)에서 시계 방향으로 채우되 채운 각도를 실제 진행률에 맞추고, 360도가 채워지면 스피너를 숨기고 결과 화면을 표시한다. |
| MOTION-004 | SHOULD | prefers-reduced-motion: reduce일 때 사용자 상호작용(클릭·탭·스크롤·호버·초점)으로 시작되는 모션 애니메이션 가운데 기능·정보 전달에 필수가 아닌 것은 끄거나 요소의 위치·크기·모양이 변하지 않는 효과로 바꾼다. |
| MOTION-005 | SHOULD | JavaScript로 실행하는 모션 애니메이션은 시작 전에 window.matchMedia('(prefers-reduced-motion: no-preference)')가 일치할 때만 실행한다. |
| MOTION-006 | SHOULD | 모션 줄이기 상태에서 모션 애니메이션을 대체 효과로 바꿀 때는 색·불투명도(opacity) 변화만 쓰고 흐림(blur)·크기·위치·모양 변화를 쓰지 않는다. |
| MOTION-007 | SHOULD | 스크롤에 연동해 요소를 움직이는 효과(시차 스크롤, 스크롤 위치에 따라 미끄러져 들어오는 요소, animation-timeline: scroll()/view())는 비필수 모션으로 분류하고, prefers-reduced-motion: reduce일 때 제거한다. |
| MOTION-009 | SHOULD | View Transitions(document.startViewTransition, @view-transition)로 만든 화면 전환은 prefers-reduced-motion: reduce일 때 ::view-transition-group(*)·::view-transition-old(*)·::view-transition-new(*)의 위치·크기 애니메이션을 끄거나 교차 페이드(opacity)로 바꾼다. |
| MOTION-011 | SHOULD | UI 전환 애니메이션의 지속 시간은 100ms 이상 500ms 이하로 하고, 체크박스·토글 같은 단순 상태 피드백은 100ms, 모달·드로어처럼 화면을 크게 바꾸는 전환은 200ms 이상 300ms 이하로 한다. |
| MOTION-012 | SHOULD | 요소를 움직이거나 크기를 바꾸는 애니메이션·전환은 transform으로 만들고, top·left·box-shadow 값을 애니메이션하지 않는다. |
| MOTION-008 | MAY | 운영체제의 모션 줄이기 설정과 별개로, 비필수 애니메이션(시차·장식 애니메이션)을 사이트 전체에서 끄는 설정 컨트롤을 제공하고 선택값을 페이지 이동과 새로고침 뒤에도 유지한다. |

## MOTION-001 움직이는 콘텐츠 정지

- 강도: **MUST**
- 룰: 자동으로 시작해 5초를 넘게 다른 콘텐츠와 함께 움직이거나 깜빡이거나 스크롤되는 콘텐츠와, 자동으로 시작해 다른 콘텐츠와 함께 표시되는 자동 갱신 콘텐츠에는 일시정지·정지·숨기기 수단(자동 갱신은 갱신 빈도 조절도 가능)을 제공한다.
- 측정 기준: (1) 자동 시작 후 5초를 넘게 움직이는·깜빡이는·스크롤되는 요소(자동 회전 캐러셀, 마키, 움직이는 배경 동영상, 5초를 넘는 애니메이션 GIF·CSS 무한 애니메이션 등)마다 일시정지·정지·숨기기 중 하나를 하는 컨트롤이 있고 키보드로 조작된다. (2) 자동 갱신 영역(실시간 피드, 주가·뉴스 티커 등)마다 일시정지·정지·숨기기 또는 갱신 빈도 조절 컨트롤이 있다. (3) <blink>·<marquee> 요소가 없다. (4) 자동 회전 캐러셀은 정지 버튼이 캐러셀 안 첫 번째 상호작용 요소다(KRDS).
- 판정 방법: 페이지 로드 후 6초 동안 화면을 관찰해 움직이는·자동 갱신 요소 목록을 만들고, 각 요소에 대해 정지 컨트롤을 키보드로 조작해 움직임·갱신이 멈추는지 확인한다. (3)은 axe-core.
- 자동 검사: partial (axe-core/blink, axe-core/marquee)
- 적용 대상: [data-carousel][data-autoplay], marquee, blink, video[autoplay], img[src$=".gif"], 자동 갱신 영역
- 예외: 움직임·깜빡임·스크롤이 필수인 활동의 일부인 경우(WCAG 2.2.2).
- 예외: 사전 로딩 단계에서 모든 사용자가 상호작용할 수 없고 진행 표시가 없으면 멈춘 것으로 오인할 수 있는 애니메이션은 필수로 볼 수 있다(WCAG 2.2.2 Note).
- 예외: 자동 갱신·스트리밍 콘텐츠는 일시정지 동안 생성·수신된 정보를 재개 시 보존·표시하지 않아도 된다(WCAG 2.2.2 Note).
- 예외: 로딩 애니메이션이 화면의 유일한 콘텐츠이고 다른 콘텐츠가 함께 보이지 않는 경우 — Understanding 2.2.2 예시 'A "loading" animation'(The animation is the only content on the page … not presented in parallel with other content)(CF-036).
- 결정 CF-036: 로딩 애니메이션이 화면의 유일한 콘텐츠이고 다른 콘텐츠가 함께 보이지 않는 경우만 MOTION-001의 예외로 둔다. 다른 콘텐츠와 함께 5초 넘게 도는 스피너(뒤 콘텐츠가 보이는 반투명 오버레이 위 스피너 포함)에는 MOTION-001을 적용한다.
- 근거: 움직이는 콘텐츠는 주의력 장애 사용자의 집중을 방해하고, 읽는 속도가 느린 사용자와 스크린 리더 사용자가 콘텐츠를 따라가지 못하게 한다.
- 출처: WCAG22 SC 2.2.2 Pause, Stop, Hide (Level A); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html; KWCAG22 검사항목 6.2.2; KRDS 컴포넌트 > 캐러셀 > 접근성 가이드라인 (가이드라인 PDF 2025.08 427·441쪽)

좋은 예 — 자동 회전 캐러셀 안 첫 번째 상호작용 요소로 정지 버튼을 둔다.
```html
<section aria-roledescription="carousel" aria-label="주요 소식">
  <button type="button" aria-pressed="false">자동 넘김 정지</button>
  <!-- 슬라이드 -->
</section>
```
나쁜 예 — 5초마다 자동 회전하는데 멈출 수단이 없다.
```html
<section aria-label="주요 소식" data-autoplay="5000">
  <!-- 정지 버튼 없이 5초마다 자동 회전 -->
</section>
```

## MOTION-002 초당 3~50회 번쩍임 금지

- 강도: **MUST**
- 룰: 초당 3회 이상 깜빡이거나 번쩍이는 콘텐츠를 두지 않는다(상한 없음, 면적·휘도 임계값 예외를 쓰지 않는다).
- 측정 기준: 모든 동영상·애니메이션·깜빡이는 UI에서 어떤 1초 구간에도 깜빡임·번쩍임(상대 휘도 10% 이상의 반대 방향 변화 쌍 또는 적색 번쩍임)이 3회 이상 일어나지 않는다. 번쩍이는 면적·휘도가 WCAG 임계값 미만이거나 KWCAG 면적 기준(화면의 10%) 이하여도 예외로 보지 않는다(CF-037).
- 판정 방법: 깜빡이거나 번쩍이는 요소가 있으면 화면 녹화를 PEAT 등 광과민성 분석 도구로 검사하거나, 프레임 단위로 휘도 변화 쌍을 세어 초당 횟수를 계산한다. CSS 애니메이션은 duration·iteration으로 초당 반복 수를 계산한다.
- 자동 검사: none
- 적용 대상: video, canvas, [style*=animation], 스플래시 스크린
- 결정 CF-037: 둘을 합치고 더 엄격하게 둔다: 초당 3회 이상 깜빡이거나 번쩍이는 콘텐츠를 두지 않는다(상한 없음). WCAG 임계값 예외와 KWCAG 면적·정지 조건은 쓰지 않는다.
- 근거: 1초에 3회를 넘는 번쩍임은 광과민성 발작을 일으킬 수 있다.
- 출처: WCAG22 SC 2.3.1 Three Flashes or Below Threshold (Level A); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html; KWCAG22 검사항목 6.3.1; KRDS 컴포넌트 > 스플래시 스크린 > 접근성 가이드라인 (가이드라인 PDF 2025.08 483쪽)

좋은 예 — 토큰 값 400ms 주기로 2번만 깜빡여 어떤 1초 구간에도 2회다(3회 미만).
```css
/* --motion-duration-slow: 400ms, 2회 반복 → 전체 0.8초 동안 2회만 깜빡임 */
.notice-dot { animation: pulse var(--motion-duration-slow) var(--motion-easing-standard) 2; }
```
나쁜 예 — 토큰 값 200ms 주기로 무한 반복해 1초에 5회 번쩍인다(3회 이상).
```css
/* --motion-duration-fast: 200ms, 무한 반복 → 초당 5회 번쩍임 */
.alert { animation: blink var(--motion-duration-fast) var(--motion-easing-linear) infinite; }
```

## MOTION-010 모션 값은 토큰으로만

- 강도: **MUST**
- 룰: 애니메이션·전환의 지속 시간(duration)과 이징(easing)은 모션 디자인 토큰(CSS 변수)에서만 고르고 CSS·JS에 ms 값이나 cubic-bezier() 값을 직접 쓰지 않는다.
- 측정 기준: transition·transition-duration·transition-timing-function·animation·animation-duration·animation-timing-function 선언 값의 시간·이징 부분이 var(--motion-*) 토큰 참조이거나 0s/none이다. JS의 element.animate() duration·easing 인자도 토큰에서 읽은 값이다.
- 판정 방법: stylelint로 CSS를 검사하고, JS는 코드 리뷰(또는 eslint 커스텀)로 숫자 리터럴 duration을 찾는다.
- 자동 검사: partial (stylelint/scale-unlimited/declaration-strict-value)
- 적용 대상: transition, animation, element.animate()
- 예외: 외부 라이브러리·KRDS 키트 원본 CSS(CF-049)
- 결정 CF-024: SPACE-001, SHAPE-001, MOTION-010을 MUST로 올린다. 색·타이포 토큰 강제 룰은 COLOR-022·TYPO-032(MUST)로 새로 만든다(4단계 토큰 정의 후). 다섯 룰 모두 프로젝트가 작성한 CSS·JS에만 적용하고, 외부 라이브러리·KRDS 키트 원본 CSS는 검사 대상에서 뺀다(CF-049).
- 근거: 모션 값이 흩어지면 화면마다 속도가 달라지고, 모션 줄이기·전역 속도 조정을 한곳에서 바꿀 수 없다. 이 체계는 모든 시각 값을 W3C DTCG 토큰으로 정의한다(프로젝트 지침).
- 출처: DTCG_FORMAT 8.5 Duration, 8.6 Cubic Bézier; MATERIAL3_MOTION_TOKENS md-sys-motion duration/easing 토큰

좋은 예 — :root에서 토큰을 정의하고 선언에서는 var(--motion-*)만 쓴다.
```css
:root { --motion-duration-short: 100ms; --motion-easing-standard: cubic-bezier(0.2, 0, 0, 1); }
.chip { transition: background-color var(--motion-duration-fast) var(--motion-easing-standard); }
```
나쁜 예 — 지속 시간과 cubic-bezier 값을 선언에 직접 썼다.
```css
.chip { transition: background-color 120ms cubic-bezier(.4,0,.2,1); }
```

## MOTION-003 확정 스피너 채움 방향과 진행률

- 강도: **SHOULD**
- 룰: 확정 스피너는 식별자를 0도(12시 방향)에서 시계 방향으로 채우되 채운 각도를 실제 진행률에 맞추고, 360도가 채워지면 스피너를 숨기고 결과 화면을 표시한다.
- 측정 기준: 확정 스피너 컴포넌트에서 (1) 진행률 p(0~100%)일 때 채움 각도가 p×3.6도이고, (2) 채움 시작점이 0도(12시)이며 시계 방향으로 늘어나고, (3) p=100%가 되면 스피너 요소가 화면과 접근성 트리에서 사라지고 결과 콘텐츠가 표시된다.
- 판정 방법: 컴포넌트 테스트에서 진행률 0·50·100%를 주입해 채움 각도·방향과 완료 후 숨김을 확인한다.
- 자동 검사: none
- 적용 대상: 스피너, [role=progressbar]
- 근거: 채움 정도가 실제 진행과 다르면 사용자가 남은 대기 시간을 잘못 판단한다.
- 출처: KRDS 컴포넌트 > 스피너 > 상호작용 가이드라인 > 확정 스피너 (가이드라인 PDF 2025.08 596쪽)

좋은 예 — 진행률을 aria-valuenow와 --p로 받아 채움 각도를 실제 진행률(p×3.6도)에 맞춘다.
```html
<div role="progressbar" aria-label="파일 업로드" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" class="spinner" style="--p:50"></div>
```
나쁜 예 — 진행률과 무관하게 일정 속도로 채우는 가짜 진행 표시다.
```html
<!-- 진행률과 무관하게 일정 속도로 채우는 확정 스피너 -->
<div class="spinner spinner--determinate fake-progress"></div>
```

## MOTION-004 모션 줄이기 설정 시 상호작용 모션 제거

- 강도: **SHOULD**
- 룰: prefers-reduced-motion: reduce일 때 사용자 상호작용(클릭·탭·스크롤·호버·초점)으로 시작되는 모션 애니메이션 가운데 기능·정보 전달에 필수가 아닌 것은 끄거나 요소의 위치·크기·모양이 변하지 않는 효과로 바꾼다.
- 측정 기준: OS(또는 브라우저 에뮬레이션)에서 모션 줄이기를 켠 상태에서 상호작용으로 시작되는 각 모션 애니메이션이 (a) 필수(예외 목록에 등록된 것)이거나 (b) 실행되지 않거나 위치·크기·모양을 바꾸지 않는 효과(색·불투명도)로 바뀐다. (a)·(b) 중 하나를 만족해야 통과.
- 판정 방법: WCAG Technique C39 절차: 모션 줄이기 설정 켬 → 모션을 유발하는 상호작용 요소마다 실행 → 필수인지 또는 억제되는지 확인. Playwright emulateMedia({reducedMotion:"reduce"}) 후 상호작용하고 document.getAnimations()의 키프레임에 transform·translate·scale·rotate·top·left·width·height·filter:blur가 남는지 검사.
- 자동 검사: none
- 적용 대상: @media (prefers-reduced-motion: reduce), 상호작용으로 시작되는 transition·animation
- 예외: 기능이나 전달하는 정보에 필수인 애니메이션(WCAG 2.3.3, 예: 애니메이션 저작 도구의 미리보기).
- 예외: 사용자가 스크롤해 새 콘텐츠가 뷰포트로 들어오는 움직임 자체(Understanding 2.3.3).
- 근거: 시차·확대·회전 같은 비필수 모션은 전정기관 장애가 있는 사용자에게 어지럼·메스꺼움·두통, 심하면 편두통과 침상 안정이 필요한 반응을 일으킨다.
- 출처: WCAG22 SC 2.3.3 Animation from Interactions (Level AAA); WCAG22_UNDERSTANDING Understanding 2.3.3 — Intent, Benefits, Examples; MQ5 12.1 prefers-reduced-motion — reduce; WCAG22_TECH_C39 Description, Example 1, Tests

좋은 예 — 모션 줄이기 설정에서 호버 이동 애니메이션을 끈다.
```css
.card { transition: transform var(--motion-duration-fast) var(--motion-easing-standard); }
.card:hover { transform: translateY(-4px); }
@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
  .card:hover { transform: none; }
}
```
나쁜 예 — 호버 확대·회전 애니메이션에 모션 줄이기 대응이 없다.
```css
.card { transition: transform var(--motion-duration-base) var(--motion-easing-standard); }
.card:hover { transform: scale(1.1) rotate(3deg); }
/* 모션 줄이기 대응 없음 */
```

## MOTION-005 JS 애니메이션의 모션 줄이기 확인

- 강도: **SHOULD**
- 룰: JavaScript로 실행하는 모션 애니메이션은 시작 전에 window.matchMedia('(prefers-reduced-motion: no-preference)')가 일치할 때만 실행한다.
- 측정 기준: 모션 줄이기를 켠 상태(emulateMedia reducedMotion: 'reduce')에서 JS로 시작되는 애니메이션(element.animate(), requestAnimationFrame 루프, 애니메이션 라이브러리 호출)이 위치·크기·회전을 바꾸지 않는다. 코드에서는 해당 호출이 prefers-reduced-motion 질의 결과로 분기된다.
- 판정 방법: Technique SCR40 절차(모션 줄이기 켬 → 상호작용 → 필수이거나 억제되는지 확인). 런타임은 MOTION-004와 같은 Playwright 검사, 코드 리뷰로 matchMedia 분기 확인.
- 자동 검사: none
- 적용 대상: element.animate(), requestAnimationFrame 애니메이션
- 예외: 기능이나 전달하는 정보에 필수인 애니메이션(WCAG 2.3.3).
- 근거: CSS 미디어 쿼리는 JS로 직접 바꾸는 스타일에는 적용되지 않으므로 JS 애니메이션은 따로 설정을 확인해야 한다.
- 출처: WCAG22_TECH_SCR40 Example 1, Tests; MQ5 12.1

좋은 예 — matchMedia로 no-preference일 때만 JS 애니메이션을 실행하고 지속 시간은 토큰에서 읽는다.
```js
const ok = window.matchMedia('(prefers-reduced-motion: no-preference)');
const dur = parseFloat(getComputedStyle(document.documentElement)
  .getPropertyValue('--motion-duration-short')); // 토큰 값(ms)
if (ok.matches) {
  el.animate([{ transform: 'translateY(8px)' }, { transform: 'none' }], dur);
}
```
나쁜 예 — 사용자 모션 설정을 확인하지 않고 JS 애니메이션을 실행한다.
```js
const dur = parseFloat(getComputedStyle(document.documentElement)
  .getPropertyValue('--motion-duration-short'));
el.animate([{ transform: 'translateY(8px)' }, { transform: 'none' }], dur); // 설정 확인 없음
```

## MOTION-006 모션 대체 효과는 색·불투명도만

- 강도: **SHOULD**
- 룰: 모션 줄이기 상태에서 모션 애니메이션을 대체 효과로 바꿀 때는 색·불투명도(opacity) 변화만 쓰고 흐림(blur)·크기·위치·모양 변화를 쓰지 않는다.
- 측정 기준: emulateMedia({reducedMotion:'reduce'}) 상태에서 document.getAnimations()와 계산된 transition-property의 애니메이션 대상 속성이 opacity, color, background-color, border-color, outline-color, fill, stroke 중에서만 나온다.
- 판정 방법: Playwright로 모션 줄이기를 켜고 상호작용·화면 전환을 실행한 뒤 실행 중인 애니메이션 키프레임 속성 목록을 수집한다.
- 자동 검사: none
- 적용 대상: @media (prefers-reduced-motion: reduce)
- 예외: 기능이나 전달하는 정보에 필수인 애니메이션(WCAG 2.3.3).
- 근거: WCAG 정의상 색·불투명도 변화는 모션 애니메이션이 아니므로 전정기관 장애 사용자에게 상태 변화를 알리면서도 움직임을 만들지 않는다. 정오표로 흐림(blur)은 모션에서 제외되지 않게 정의가 바뀌었다.
- 출처: WCAG22_UNDERSTANDING Understanding 2.3.3 — Key Terms 'motion animation' + Errata 'Amending the definition to not exclude blurring'; CHROME_VT_SAME_DOC React to the 'reduced motion' preference

좋은 예 — 모션 줄이기 상태의 대체 효과로 불투명도만 바꾼다.
```css
@media (prefers-reduced-motion: reduce) {
  .toast { animation: fade var(--motion-duration-fast) var(--motion-easing-standard); }
}
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
```
나쁜 예 — 대체 효과에 흐림(blur)을 써서 모션으로 취급되는 변화가 남는다.
```css
@media (prefers-reduced-motion: reduce) {
  .toast { animation: blur-in var(--motion-duration-fast) var(--motion-easing-standard); }
}
@keyframes blur-in { from { filter: blur(8px); } to { filter: none; } }
```

## MOTION-007 시차·스크롤 연동 효과 제거

- 강도: **SHOULD**
- 룰: 스크롤에 연동해 요소를 움직이는 효과(시차 스크롤, 스크롤 위치에 따라 미끄러져 들어오는 요소, animation-timeline: scroll()/view())는 비필수 모션으로 분류하고, prefers-reduced-motion: reduce일 때 제거한다.
- 측정 기준: (1) animation-timeline 선언과 스크롤 연동 키프레임은 @media (prefers-reduced-motion: no-preference) 블록 안에만 있다. (2) emulateMedia({reducedMotion:'reduce'}) 상태에서 페이지를 끝까지 스크롤하는 동안 스크롤 이동 외에 위치·크기가 바뀌는 요소가 없다(JS 스크롤 리스너 기반 시차 포함).
- 판정 방법: stylelint 커스텀으로 (1)을, Playwright 스크롤 녹화와 요소 boundingBox 비교로 (2)를 검사.
- 자동 검사: none
- 적용 대상: animation-timeline, 시차 스크롤, 스크롤 연동 애니메이션
- 예외: 사용자가 스크롤해 새 콘텐츠가 뷰포트로 들어오는 움직임 자체(Understanding 2.3.3).
- 근거: 배경과 전경이 다른 속도로 움직이는 시차 스크롤은 전정기관 장애 반응을 일으키는 대표적인 비필수 모션이다.
- 출처: WCAG22_UNDERSTANDING Understanding 2.3.3 — Intent(parallax scrolling), Examples(Parallax scrolling with option to turn off); WEBDEV_PRM Motion-triggered vestibular spectrum disorder

좋은 예 — 스크롤 연동 애니메이션을 no-preference 미디어 쿼리 안에만 선언한다.
```css
@media (prefers-reduced-motion: no-preference) {
  .reveal { animation: slide-in var(--motion-easing-linear) both; animation-timeline: view(); }
}
```
나쁜 예 — 시차 스크롤이 모션 줄이기 설정에서도 실행된다.
```css
.hero-bg { animation: parallax var(--motion-easing-linear); animation-timeline: scroll(); } /* 모션 줄이기에서도 실행 */
```

## MOTION-009 화면 전환 애니메이션의 모션 줄이기 대응

- 강도: **SHOULD**
- 룰: View Transitions(document.startViewTransition, @view-transition)로 만든 화면 전환은 prefers-reduced-motion: reduce일 때 ::view-transition-group(*)·::view-transition-old(*)·::view-transition-new(*)의 위치·크기 애니메이션을 끄거나 교차 페이드(opacity)로 바꾼다.
- 측정 기준: (1) ::view-transition-* 선택자나 @view-transition 규칙이 있는 스타일시트에 @media (prefers-reduced-motion: reduce) 블록이 있고 그 안에서 ::view-transition-group(*)의 animation이 none이거나, old/new 의사 요소의 키프레임이 opacity만 바꾼다. (2) emulateMedia({reducedMotion:'reduce'}) 상태에서 전환 중 getAnimations()에 transform·width·height 키프레임이 없다.
- 판정 방법: stylelint 커스텀으로 (1), Playwright로 화면 전환을 실행해 (2)를 검사.
- 자동 검사: none
- 적용 대상: ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*), @view-transition
- 예외: 기능이나 전달하는 정보에 필수인 애니메이션(WCAG 2.3.3).
- 근거: 화면 전환의 미끄러짐·확대 애니메이션도 상호작용으로 시작되는 비필수 모션이다. Understanding 2.3.3은 페이지 넘김 전환을 모션 줄이기에서 끄는 예를 든다.
- 출처: CHROME_VT_SAME_DOC React to the 'reduced motion' preference; CSS_VIEW_TRANSITIONS_1 1 Introduction (전환은 CSS Animations로 구동); WCAG22_UNDERSTANDING Understanding 2.3.3 — Example 'Transitions that support the reduce motion preference'(page-flipping)

좋은 예 — 모션 줄이기 설정에서 View Transitions 의사 요소의 애니메이션을 끈다.
```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) { animation: none !important; }
}
```
나쁜 예 — 밀어내기 화면 전환에 모션 줄이기 대응이 없다.
```css
::view-transition-old(root) { animation: slide-out var(--motion-duration-base) var(--motion-easing-standard); }
::view-transition-new(root) { animation: slide-in var(--motion-duration-base) var(--motion-easing-standard); }
/* 모션 줄이기 대응 없음 */
```

## MOTION-011 애니메이션 지속 시간 범위

- 강도: **SHOULD**
- 룰: UI 전환 애니메이션의 지속 시간은 100ms 이상 500ms 이하로 하고, 체크박스·토글 같은 단순 상태 피드백은 100ms, 모달·드로어처럼 화면을 크게 바꾸는 전환은 200ms 이상 300ms 이하로 한다.
- 측정 기준: 모션 duration 토큰 값과 실제 transition/animation duration이 (1) 모두 100~500ms 범위에 있고, (2) 체크박스·라디오·토글 상태 전환은 100ms, (3) 모달·드로어·바텀시트 열림·닫힘은 200~300ms이다.
- 판정 방법: 토큰 JSON의 duration 값을 범위 검사하고, 컴포넌트별 사용 토큰을 규격 표와 대조한다.
- 자동 검사: none
- 적용 대상: transition, animation, 모션 duration 토큰
- 예외: 불확정 스피너처럼 대기 상태 동안 반복되는 로딩 애니메이션(전환이 아님).
- 결정 CF-050: MOTION-011의 100~500ms 범위를 유지한다.
- 근거: 너무 빠른 애니메이션은 알아보기 어렵고 어지러우며, 500ms쯤 되면 사용자는 지연으로 느낀다(NN/g). 단순 피드백 100ms는 직접 조작하는 느낌을 준다.
- 출처: NNG_ANIM_DURATION Duration 절; MATERIAL3_MOTION_TOKENS duration short/medium/long/extra-long

좋은 예 — 단순 피드백 100ms, 모달 250ms로 범위 안의 토큰 값을 정의했다.
```css
:root { --motion-duration-feedback: 100ms; --motion-duration-modal: 250ms; }
```
나쁜 예 — 모달 전환 토큰 값이 800ms로 100~500ms 범위와 모달 200~300ms를 벗어난다.
```css
:root { --motion-duration-modal: 800ms; } /* 모달 전환 800ms: 500ms 상한 초과 */
.modal { transition: transform var(--motion-duration-base) var(--motion-easing-standard); }
```

## MOTION-012 레이아웃 유발 속성 애니메이션 금지

- 강도: **SHOULD**
- 룰: 요소를 움직이거나 크기를 바꾸는 애니메이션·전환은 transform으로 만들고, top·left·box-shadow 값을 애니메이션하지 않는다.
- 측정 기준: transition-property(또는 transition 단축 속성)와 @keyframes 안에 top, left, box-shadow가 없다. 위치·크기 변화는 transform(translate·scale·rotate)으로 구현돼 있다.
- 판정 방법: stylelint 플러그인으로 transition·@keyframes 속성을 검사한다.
- 자동 검사: partial (stylelint/ux-baseline/no-animated-position-props)
- 적용 대상: transition, @keyframes
- 근거: top·left 변경은 요소가 별도 레이어에 있어도 레이아웃 이동을 일으키고, box-shadow는 리레이아웃·페인트를 유발한다. transform 합성 애니메이션은 다른 요소에 영향을 주지 않아 CLS에 포함되지 않는다.
- 출처: WEBDEV_OPT_CLS Animations 절

좋은 예 — 서랍 이동을 transform으로 구현했다.
```css
.drawer { transition: transform var(--motion-duration-base) var(--motion-easing-standard); transform: translateX(-100%); }
.drawer.is-open { transform: none; }
```
나쁜 예 — left 값을 애니메이션해 레이아웃 이동이 생긴다.
```css
.drawer { transition: left var(--motion-duration-base) var(--motion-easing-standard); left: -320px; }
.drawer.is-open { left: 0; }
```

## MOTION-008 사이트 내 모션 끄기 컨트롤

- 강도: **MAY**
- 룰: 운영체제의 모션 줄이기 설정과 별개로, 비필수 애니메이션(시차·장식 애니메이션)을 사이트 전체에서 끄는 설정 컨트롤을 제공하고 선택값을 페이지 이동과 새로고침 뒤에도 유지한다.
- 측정 기준: (1) 모든 페이지에서 접근할 수 있는 위치(헤더 유틸리티 또는 설정 화면)에 모션 끄기 컨트롤이 있다. (2) 켜면 MOTION-004의 reduce 상태와 같은 결과(비필수 모션 없음)가 된다. (3) 다른 페이지로 이동하거나 새로고침해도 설정이 유지된다.
- 판정 방법: 설정을 켠 뒤 3개 이상의 페이지를 이동·새로고침하며 비필수 애니메이션이 실행되지 않는지 확인한다.
- 자동 검사: none
- 적용 대상: 사이트 설정, 헤더 유틸리티
- 근거: 모든 사용자가 OS 설정을 바꿀 수 있거나 그 존재를 아는 것은 아니다. Understanding 2.3.3은 사이트 전역 끄기 컨트롤을 해결책 중 하나로 든다.
- 출처: WCAG22_UNDERSTANDING Understanding 2.3.3 — Example 'Parallax scrolling with option to turn off unnecessary motion globally', Techniques 'Gx: Allowing users to set a preference that prevents animation'

좋은 예 — 모든 페이지 헤더에 두는 애니메이션 끄기 토글 버튼.
```html
<button type="button" aria-pressed="false" data-motion-toggle>애니메이션 끄기</button>
```
좋은 예 — 선택값을 저장해 다른 페이지와 새로고침 뒤에도 유지한다.
```js
btn.addEventListener('click', () => {
  const off = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', String(off));
  document.documentElement.dataset.motion = off ? 'off' : 'on';
  localStorage.setItem('motion', off ? 'off' : 'on'); // 새로고침·페이지 이동 뒤 복원
});
```
나쁜 예 — 끄기 설정이 페이지 이동이나 새로고침 뒤 유지되지 않는다.
```html
<button type="button" aria-pressed="false" data-motion-toggle>애니메이션 끄기</button>
<!-- 상태를 저장하지 않아 다른 페이지로 가면 다시 켜짐 -->
```
