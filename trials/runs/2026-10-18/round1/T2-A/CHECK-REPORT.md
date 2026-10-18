# 채점: <시험 작업 디렉터리>/T2-A
오류 4 / 경고 0 (초점 가능 요소 51개)
- stylelint error: 1
- axe-core error: 2
- browser error: 1

## stylelint/ux-baseline/no-outline-none-without-replacement ×1 [error] → A11Y-016
  - style.css:277: ".page__content:focus" 에서 outline 을 없앴는데 대체 초점 표시가 없다 (A11Y-016) (ux-baseline/no-outline-none-without-replacement)

## axe-core/label-content-name-mismatch ×1 [error] → A11Y-019
  - a[aria-label="1페이지"], a[aria-label="2페이지"], a[aria-label="3페이지"], a[aria-label="4페이지"], a[aria-label="5페이지"]: Elements must have their visible text as part of their accessible name (10곳)

## axe-core/p-as-heading ×1 [error] → A11Y-007
  - .footer__logo: Styled <p> elements must not be used as headings (1곳)

## browser/reflow-320 ×1 [error]
  - page: 320px 너비에서 가로 스크롤 4px
