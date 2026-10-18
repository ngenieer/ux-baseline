# 채점: <시험 작업 디렉터리>/T2-B
오류 5 / 경고 0 (초점 가능 요소 34개)
- stylelint error: 3
- html-validate error: 1
- browser error: 1

## stylelint/scale-unlimited/declaration-strict-value ×2 [error] → COLOR-022, MOTION-010, SHAPE-001, SHAPE-004, SPACE-001, TYPO-032
  - style.css:534: 토큰(CSS 변수)만 쓴다 — tokens/build/tokens.css 의 var(--…) 를 쓸 것 (SPACE-001·SHAPE-001·MOTION-010·COLOR-022·TYPO-032) (scale-unlimited/declaration-strict-value)
  - style.css:535: 토큰(CSS 변수)만 쓴다 — tokens/build/tokens.css 의 var(--…) 를 쓸 것 (SPACE-001·SHAPE-001·MOTION-010·COLOR-022·TYPO-032) (scale-unlimited/declaration-strict-value)

## stylelint/ux-baseline/no-outline-none-without-replacement ×1 [error] → A11Y-016
  - style.css:40: "#content:focus" 에서 outline 을 없앴는데 대체 초점 표시가 없다 (A11Y-016) (ux-baseline/no-outline-none-without-replacement)

## html-validate/prefer-native-element ×1 [error]
  - index.html:72: Prefer to use the native <section> element

## browser/reflow-320 ×1 [error]
  - page: 320px 너비에서 가로 스크롤 336px
