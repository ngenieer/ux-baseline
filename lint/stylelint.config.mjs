// ux-baseline stylelint 설정 — 프로젝트 CSS(작성한 코드)에 적용한다. 외부 키트 CSS는 검사에서 뺀다(CF-049).
// 각 규칙 옆 주석의 ID가 근거 룰이다. 근거 룰에 MUST 가 있으면 error, SHOULD·MAY 만이면 warning.
// 룰 ↔ 검사 대응표: lint/rule-map.yaml (npm run rulemap 으로 생성)
const ALLOWED_KEYWORDS = ["0", "inherit", "initial", "unset", "revert", "revert-layer", "auto", "none", "currentColor", "transparent"];
const warn = { severity: "warning" };
// CSS 시스템 색 — 강제 색상 모드(@media (forced-colors: active))에서 쓰는 값이라 토큰으로 만들 수 없다 (CF-064)
const SYSTEM_COLORS = ["Canvas", "CanvasText", "LinkText", "VisitedText", "ActiveText", "ButtonFace", "ButtonText", "ButtonBorder",
  "Field", "FieldText", "Highlight", "HighlightText", "SelectedItem", "SelectedItemText", "Mark", "MarkText", "GrayText", "AccentColor", "AccentColorText"];

export default {
  plugins: ["stylelint-declaration-strict-value", "./plugins/ux-baseline.mjs"],
  rules: {
    // SPACE-001 · SHAPE-001 · MOTION-010 · COLOR-022 · TYPO-032 — 토큰(CSS 변수) 값만 쓴다 (CF-024) [MUST]
    "scale-unlimited/declaration-strict-value": [
      [
        "/^margin/", "/^padding/", "gap", "row-gap", "column-gap",                 // SPACE-001
        "border-radius", "/^border-.*-radius$/",                                   // SHAPE-001
        "box-shadow",                                                               // SHAPE-004
        "transition-duration", "animation-duration",
        "transition-timing-function", "animation-timing-function",                 // MOTION-010
        "color", "background-color", "border-color", "/^border-.*-color$/",
        "outline-color", "fill", "stroke", "text-decoration-color",                // COLOR-022
        "font-size", "font-family", "font-weight", "line-height"                   // TYPO-032
      ],
      {
        // SHAPE-003: 원형 요소의 50% 는 허용(ux-baseline/radius-percent-allowlist 가 허용 클래스로 제한)
        ignoreValues: { "": [...ALLOWED_KEYWORDS, ...SYSTEM_COLORS], "border-radius": [...ALLOWED_KEYWORDS, "50%"], "/^border-.*-radius$/": [...ALLOWED_KEYWORDS, "50%"],
          // MOTION-010 측정 기준: 시간 값은 var(--motion-*) 이거나 0s (전환 없음)
          "transition-duration": [...ALLOWED_KEYWORDS, "0s", "0ms"], "animation-duration": [...ALLOWED_KEYWORDS, "0s", "0ms"] },
        expandShorthand: true,
        message: "\"${property}: ${value}\" — 토큰(CSS 변수)만 쓴다. tokens.css 에 정의된 var(--…) 로 바꿀 것 (SPACE-001·SHAPE-001·MOTION-010·COLOR-022·TYPO-032)"
      }
    ],
    // A11Y-016 outline 제거 시 대체 초점 표시 [MUST]
    "ux-baseline/no-outline-none-without-replacement": true,
    // A11Y-046 · A11Y-047 스크린 리더 전용 텍스트 숨김 방식 [SHOULD]
    "ux-baseline/sr-only-no-display-none": [true, warn],
    "ux-baseline/sr-only-no-zero-size": [true, warn],
    // MOTION-012 top·left·box-shadow 애니메이션 금지 [SHOULD]
    "ux-baseline/no-animated-position-props": [true, warn],
    // 컴포넌트 범위 규칙 — 기본 클래스 이름은 components/ 규격, 프로젝트 클래스가 다르면 classNames 옵션으로 바꾼다
    "ux-baseline/table-cell-no-vertical-border": [true, warn],      // LAYOUT-044 [MAY]
    "ux-baseline/file-name-ellipsis": [true, warn],                 // LAYOUT-055 [SHOULD]
    "ux-baseline/menu-panel-max-height": [true, warn],              // NAV-021 [SHOULD]
    "ux-baseline/text-field-spacing": [true, warn],                 // SPACE-003 [MAY]
    "ux-baseline/radius-percent-allowlist": [true, warn],           // SHAPE-003 [SHOULD]
    "ux-baseline/feedback-not-fixed": [true, warn],                 // STATE-004 [SHOULD]
    "ux-baseline/flex-grid-child-no-break-word": [true, warn],      // TYPO-018 [SHOULD]
    "ux-baseline/prose-max-inline-size": [true, warn],              // TYPO-031 [SHOULD]
    // TYPO-006 가는·아주 굵은 두께 · TYPO-019 break-word · TYPO-020 break-all · TYPO-021 line-break anywhere
    // TYPO-025 양쪽 정렬 · PERF-001 font-display block·auto [SHOULD·MAY]
    "declaration-property-value-disallowed-list": [
      {
        "font-weight": ["100", "200", "300", "800", "900", "lighter"],
        "word-break": ["break-all", "break-word"],
        "line-break": ["anywhere"],
        "text-align": ["justify"],
        "font-display": ["block", "auto"]
      },
      warn
    ],
    // TYPO-005 행간 절대 단위 · TYPO-027 글자 크기 px·pt · TYPO-032 행간 px [MUST 포함 → error]
    "declaration-property-unit-disallowed-list": {
      "line-height": ["px", "pt", "cm", "mm", "in", "pc", "Q"],
      "font-size": ["px", "pt"],
      "/^font$/": ["px", "pt"]
    },
    // TYPO-029 자간은 em [MAY]
    "declaration-property-unit-allowed-list": [{ "letter-spacing": ["em"] }, warn],
    // TYPO-030 서체 목록 끝에 generic family [SHOULD]
    "font-family-no-missing-generic-family-keyword": [true, warn],
    // PERF-001 @font-face 에 font-display [SHOULD]
    "at-rule-descriptor-value-no-unknown": null,
    "at-rule-property-required-list": [{ "font-face": ["font-display"] }, warn],
    // RESP-004 미디어 쿼리 경계는 토큰 브레이크포인트(360·768·1024·1280px)와 그 직전 값만 [MAY]
    "media-feature-name-value-allowed-list": [
      {
        "min-width": ["/^(360|768|1024|1280)px$/"],
        "max-width": ["/^(359|767|1023|1279)px$/"],
        "width": ["/^[<>]=?\\s*(359|360|767|768|1023|1024|1279|1280)px$/"]
      },
      warn
    ]
  }
};
