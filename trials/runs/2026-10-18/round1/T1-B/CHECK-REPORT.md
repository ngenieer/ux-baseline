# 채점: <시험 작업 디렉터리>/T1-B
오류 5 / 경고 0 (초점 가능 요소 18개)
- stylelint error: 4
- html-validate error: 1

## stylelint/scale-unlimited/declaration-strict-value ×3 [error] → COLOR-022, MOTION-010, SHAPE-001, SHAPE-004, SPACE-001, TYPO-032
  - style.css:507: 토큰(CSS 변수)만 쓴다 — tokens/build/tokens.css 의 var(--…) 를 쓸 것 (SPACE-001·SHAPE-001·MOTION-010·COLOR-022·TYPO-032) (scale-unlimited/declaration-strict-value)
  - style.css:506: 토큰(CSS 변수)만 쓴다 — tokens/build/tokens.css 의 var(--…) 를 쓸 것 (SPACE-001·SHAPE-001·MOTION-010·COLOR-022·TYPO-032) (scale-unlimited/declaration-strict-value)
  - style.css:501: 토큰(CSS 변수)만 쓴다 — tokens/build/tokens.css 의 var(--…) 를 쓸 것 (SPACE-001·SHAPE-001·MOTION-010·COLOR-022·TYPO-032) (scale-unlimited/declaration-strict-value)

## stylelint/ux-baseline/no-outline-none-without-replacement ×1 [error] → A11Y-016
  - style.css:64: "main:focus" 에서 outline 을 없앴는데 대체 초점 표시가 없다 (A11Y-016) (ux-baseline/no-outline-none-without-replacement)

## html-validate/valid-autocomplete ×1 [error] → FORM-001
  - index.html:81: "tel-national" cannot be used on <input type="tel">
