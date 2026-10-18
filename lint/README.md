# 자동 검사 (4단계 플랫폼화)

확정 룰의 `automation.checks`를 실제 검사기 설정으로 옮긴 패키지. AI가 만든 결과물을 이 검사로 확인하고
위반을 고치는 루프를 전제로 한다. 자기 보고("지켰다")는 검증이 아니다 — 아래 검사 결과를 보고한다.

| 파일 | 검사기 | 대상 |
|---|---|---|
| `stylelint.config.mjs` | stylelint 17 | 작성한 CSS. 토큰 외 값 금지(SPACE-001·SHAPE-001·MOTION-010·COLOR-022·TYPO-032), 단위·값 제약 |
| `plugins/html-ux-baseline.mjs` | html-validate 자체 규칙 6개 | 체계 결정: COPY-056 날짜 표기, FORM-012 필수 표시, FORM-077·079 오류 요약, COPY-006 대화상자 버튼, COPY-001 감각 표현 후보(`kit/lib/sensory.mjs`) |
| `plugins/ux-baseline.mjs` | stylelint 자체 규칙 12개 | A11Y-016 초점 표시, A11Y-046·047 스크린 리더 전용 숨김, MOTION-012 위치 애니메이션, 컴포넌트 범위 규칙 8개(아래) |
| `.htmlvalidate.json` | html-validate 11 | 정적 HTML (alt·title·autocomplete·autoplay·중복 id 등) |
| `axe.config.json` | axe-core 4.14 | 렌더된 페이지. WCAG 2.2 A·AA 태그 + 룰이 참조하는 experimental 규칙 |
| `axe.high-contrast.config.json` | axe-core 4.14 | `data-theme="high-contrast"` 상태에서 따로 돌린다. COLOR-009(헤딩·레이블 7:1) |
| `rule-map.yaml` | — | 확정 룰 → 검사 규칙, 설정 반영 여부(`configured`). 자동 생성. `ux-baseline-check` 는 `ux-baseline check` 의 브라우저 동작 검사(kit/lib/check.mjs `BEHAVIOR_CHECKS`) |

## 컴포넌트 범위 규칙과 클래스 이름
선택자 범위가 필요한 룰은 체계 기본 클래스 이름으로 대상을 찾는다. 프로젝트 클래스가 다르면 옵션으로 바꾼다.

| 규칙 | 룰 | 기본 대상 | 옵션 |
|---|---|---|---|
| `ux-baseline/table-cell-no-vertical-border` | LAYOUT-044 | `td`·`th` (`.table--bordered` 제외) | `allowClasses` |
| `ux-baseline/file-name-ellipsis` | LAYOUT-055 | `.file-item__name` | `classNames` |
| `ux-baseline/menu-panel-max-height` | NAV-021 | `.main-menu__panel` | `classNames` |
| `ux-baseline/text-field-spacing` | SPACE-003 | `.text-field`, `.text-field__input` | `fieldClassNames`, `inputClassNames` |
| `ux-baseline/radius-percent-allowlist` | SHAPE-003 | `.avatar`, `.icon-button--circle` | `allowClasses` |
| `ux-baseline/feedback-not-fixed` | STATE-004 | `.feedback`, `.feedback__trigger` | `classNames` |
| `ux-baseline/flex-grid-child-no-break-word` | TYPO-018 | `td`·`th`, 같은 파일의 flex·grid 선택자 직계 자식 | — |
| `ux-baseline/prose-max-inline-size` | TYPO-031 | `.prose` | `classNames` |

예: `"ux-baseline/file-name-ellipsis": [true, { "severity": "warning", "classNames": ["upload-file-name"] }]`

## 끈 규칙
html-validate 의 표기 취향 규칙(`doctype-style`, `attribute-boolean-style`, `attribute-empty-style`, `attr-quotes`, `void-style`, `attr-case`, `element-case`, `tel-non-breaking`, `no-redundant-for`)은 이 체계의 어느 룰과도 대응하지 않아 끈다(AI 적용 시험에서 룰과 무관한 오류만 냈다 — trials/README.md).
stylelint 토큰 규칙은 CSS 시스템 색(Canvas, Highlight 등)을 허용한다 — 강제 색상 모드 대응용(CF-064).

## 심각도
근거 룰에 MUST 가 있으면 `error`, SHOULD·MAY 만이면 `warning`. 예외: 후보만 찾는 검사(COPY-001 감각 표현)는 MUST 룰이라도 `warning` — 사람이 확인한다. 각 설정 옆 주석의 룰 ID가 근거다.

## 프로젝트에 적용
```sh
npm i -D stylelint stylelint-declaration-strict-value html-validate axe-core
```
- stylelint: `extends` 로 이 설정을 가져오고 `plugins/ux-baseline.mjs` 를 함께 복사한다. 외부 키트 CSS 는 `ignoreFiles` 로 뺀다(CF-049).
- `@font-face` 의 `font-family` 는 서체 이름 정의라 토큰을 쓸 수 없다 — `stylelint-disable-next-line scale-unlimited/declaration-strict-value` 주석으로 표시한다.
- 스크린 리더 전용 클래스 이름이 다르면 `ux-baseline/sr-only-*` 규칙의 `classNames` 옵션으로 바꾼다.
- axe-core: `@axe-core/playwright` 등에서 `axe.config.json`(`$comment` 제외)을 options 로 넘긴다. color-contrast 는 실제 브라우저에서 돌린다(jsdom 은 판정 불가).

## 이 디렉터리의 검사
```sh
npm ci
npm test               # 픽스처: good 은 위반 0, bad 는 기대한 규칙이 모두 걸려야 한다
npm run rulemap        # rule-map.yaml 다시 만들기 (룰의 automation 을 바꾼 뒤)
npm run rulemap:check  # CI
```

## platformed 단계
`scripts/validate.py` 는 `stage: platformed` 룰의 stylelint·html-validate·axe-core 검사가 `rule-map.yaml` 에서 모두
`configured: true` 인지 확인한다. 자체 규칙이 아직 없는 검사(`custom: …`, 선택자 범위가 필요한 검사)를 가진 룰은 `resolved` 에 남는다.
`configured` 는 검사 규칙이 켜져 있는지만 본다 — 규칙 옵션이 룰의 값 목록을 담는지는 픽스처 테스트(`fixtures/bad.*`)로 확인한다.
