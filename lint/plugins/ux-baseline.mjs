// ux-baseline 자체 stylelint 규칙. 내장 규칙으로 표현할 수 없는 확정 룰을 검사한다.
// 각 규칙 이름 옆 주석의 ID가 근거 룰이다.
import stylelint from "stylelint";

const { createPlugin, utils: { report, ruleMessages, validateOptions } } = stylelint;
const NS = "ux-baseline";

// 스크린 리더 전용(시각적으로 숨긴) 텍스트 클래스. 프로젝트에서 다른 이름을 쓰면 classNames 옵션으로 바꾼다.
const DEFAULT_SR_CLASSES = ["sr-only", "visually-hidden", "screen-out", "blind", "a11y-hidden"];

const isZero = (v) => /^(0|0(\.0+)?[a-z%]*)$/i.test(v.trim());
const isNone = (v) => /^(none|0|0px)$/i.test(v.trim());

function srSelector(selector, classes) {
  return classes.some((c) => new RegExp(`\\.${c}(?![\\w-])`).test(selector));
}

function makeRule(name, messages, check) {
  const ruleName = `${NS}/${name}`;
  const msgs = ruleMessages(ruleName, messages);
  const rule = (primary, secondary = {}) => (root, result) => {
    if (!validateOptions(result, ruleName, { actual: primary, possible: [true] })) return;
    check({ root, result, ruleName, msgs, options: secondary });
  };
  rule.ruleName = ruleName;
  rule.messages = msgs;
  return createPlugin(ruleName, rule);
}

// A11Y-016 — outline: none/0 은 같은 상태의 대체 초점 표시가 있어야 한다
const FOCUS_REPLACEMENT = /^(box-shadow|border(-.*)?|outline-(style|width|color|offset)|background(-color)?|text-decoration(-.*)?)$/;
const noOutlineNone = makeRule(
  "no-outline-none-without-replacement",
  { rejected: (sel) => `"${sel}" 에서 outline 을 없앴는데 대체 초점 표시가 없다 (A11Y-016)` },
  ({ root, result, ruleName, msgs }) => {
    const focusReplacements = new Set(); // :focus 가 붙은 선택자의 기본 선택자 중 대체 표시가 있는 것
    root.walkRules((r) => {
      if (!/:focus/.test(r.selector)) return;
      let has = false;
      r.walkDecls((d) => {
        if (FOCUS_REPLACEMENT.test(d.prop) && !isNone(d.value)) has = true;
        if (d.prop === "outline" && !isNone(d.value)) has = true;
      });
      if (has) for (const s of r.selectors) focusReplacements.add(s.replace(/:focus(-visible|-within)?/g, "").trim());
    });
    root.walkDecls("outline", (d) => {
      if (!isNone(d.value)) return;
      const r = d.parent;
      if (r.type !== "rule") return;
      let replaced;
      if (/:focus/.test(r.selector)) {
        replaced = r.nodes.some((n) => n.type === "decl" && FOCUS_REPLACEMENT.test(n.prop) && !isNone(n.value));
      } else {
        replaced = r.selectors.every((s) => focusReplacements.has(s.trim()));
      }
      if (!replaced) report({ ruleName, result, node: d, message: msgs.rejected(r.selector) });
    });
  }
);

// A11Y-046 — 스크린 리더 전용 클래스에 display:none·visibility:hidden 금지
const srNoHidden = makeRule(
  "sr-only-no-display-none",
  { rejected: (p, v) => `스크린 리더 전용 클래스에 ${p}: ${v} 를 쓰면 스크린 리더도 읽지 못한다 (A11Y-046)` },
  ({ root, result, ruleName, msgs, options }) => {
    const classes = options.classNames || DEFAULT_SR_CLASSES;
    root.walkRules((r) => {
      if (!srSelector(r.selector, classes)) return;
      r.walkDecls((d) => {
        if ((d.prop === "display" && d.value.trim() === "none") || (d.prop === "visibility" && d.value.trim() === "hidden")) {
          report({ ruleName, result, node: d, message: msgs.rejected(d.prop, d.value) });
        }
      });
    });
  }
);

// A11Y-047 — 스크린 리더 전용 클래스에 width·height·font-size·line-height 0 금지
const srNoZero = makeRule(
  "sr-only-no-zero-size",
  { rejected: (p) => `스크린 리더 전용 클래스에 ${p}: 0 을 쓰면 일부 스크린 리더가 읽지 않는다 — 1px 과 clip 을 쓸 것 (A11Y-047)` },
  ({ root, result, ruleName, msgs, options }) => {
    const classes = options.classNames || DEFAULT_SR_CLASSES;
    root.walkRules((r) => {
      if (!srSelector(r.selector, classes)) return;
      r.walkDecls(/^(width|height|font-size|line-height)$/, (d) => {
        if (isZero(d.value)) report({ ruleName, result, node: d, message: msgs.rejected(d.prop) });
      });
    });
  }
);

// MOTION-012 — top·left·box-shadow 를 전환·애니메이션하지 않는다 (transform 사용)
const POSITION_PROPS = ["top", "left", "box-shadow"];
const noAnimatedPosition = makeRule(
  "no-animated-position-props",
  { rejected: (p) => `${p} 를 애니메이션하지 말고 transform 을 쓸 것 (MOTION-012)` },
  ({ root, result, ruleName, msgs }) => {
    root.walkDecls(/^transition(-property)?$/, (d) => {
      const words = d.value.toLowerCase().split(/[\s,]+/);
      for (const p of POSITION_PROPS) if (words.includes(p)) report({ ruleName, result, node: d, message: msgs.rejected(p) });
    });
    root.walkAtRules(/^(-webkit-)?keyframes$/i, (at) => {
      at.walkDecls((d) => {
        if (POSITION_PROPS.includes(d.prop.toLowerCase())) report({ ruleName, result, node: d, message: msgs.rejected(d.prop) });
      });
    });
  }
);

// ---------------------------------------------------------------------------
// 컴포넌트 범위 규칙. 대상은 선택자 안의 클래스 이름으로 찾는다.
// 기본 클래스 이름은 components/ 의 컴포넌트 규격(체계 기본 이름)이며, 프로젝트는 classNames 옵션으로 바꾼다.
const hasClass = (selector, classes) => classes.some((c) => new RegExp(`\\.${c}(?![\\w-])`).test(selector));
const lastCompound = (selector) => selector.split(/\s+|>|\+|~/).filter(Boolean).pop() || "";

// LAYOUT-044 — 표 셀에 세로 열 구분선 금지
const VERTICAL_BORDER = /^border-(left|right|inline|inline-start|inline-end)(-width|-style)?$/;
const tableNoVerticalBorder = makeRule(
  "table-cell-no-vertical-border",
  { rejected: (p) => `표 셀에 세로 구분선(${p})을 쓰지 않는다 (LAYOUT-044)` },
  ({ root, result, ruleName, msgs, options }) => {
    const allow = options.allowClasses || ["table--bordered"];
    root.walkRules((r) => {
      for (const sel of r.selectors) {
        if (!/^(td|th)(?![\w-])/.test(lastCompound(sel))) continue;
        if (hasClass(sel, allow)) continue;
        r.walkDecls(VERTICAL_BORDER, (d) => {
          if (!isNone(d.value) && !/^(none|hidden)$/i.test(d.value.trim())) report({ ruleName, result, node: d, message: msgs.rejected(d.prop) });
        });
        break;
      }
    });
  }
);

// 같은 규칙 안에 필요한 선언이 모두 있어야 하는 컴포넌트 (LAYOUT-055·NAV-021)
function requiredDecls(name, ruleId, defaults, required) {
  return makeRule(
    name,
    { missing: (sel, what) => `"${sel}" 에 ${what} 가 필요하다 (${ruleId})` },
    ({ root, result, ruleName, msgs, options }) => {
      const classes = options.classNames || defaults;
      root.walkRules((r) => {
        if (!r.selectors.some((s) => hasClass(lastCompound(s), classes))) return;
        if (/:(hover|focus|active|focus-visible|focus-within)/.test(r.selector)) return;
        const decls = {};
        r.walkDecls((d) => { decls[d.prop] = d.value.trim(); });
        for (const [prop, ok, label] of required) {
          if (!(prop in decls) || !ok(decls[prop])) report({ ruleName, result, node: r, message: msgs.missing(r.selector, label) });
        }
      });
    }
  );
}

// LAYOUT-055 — 파일 이름은 한 줄 + 말줄임표
const fileNameEllipsis = requiredDecls("file-name-ellipsis", "LAYOUT-055", ["file-item__name"], [
  ["white-space", (v) => v === "nowrap", "white-space: nowrap"],
  ["overflow", (v) => /^(hidden|clip)$/.test(v), "overflow: hidden"],
  ["text-overflow", (v) => v === "ellipsis", "text-overflow: ellipsis"],
]);

// NAV-021 — 메인 메뉴 드롭다운 높이 70vh 이하 + 자체 스크롤
const vhAtMost = (limit) => (v) => {
  const m = v.match(/^(\d+(\.\d+)?)(d|s|l)?vh$/);
  return Boolean(m) && parseFloat(m[1]) <= limit;
};
const menuPanelHeight = requiredDecls("menu-panel-max-height", "NAV-021", ["main-menu__panel"], [
  ["max-height", vhAtMost(70), "max-height: 70vh 이하"],
  ["overflow-y", (v) => /^(auto|scroll)$/.test(v), "overflow-y: auto"],
]);

// SPACE-003 — 텍스트 입력 필드 간격 토큰
const textFieldSpacing = makeRule(
  "text-field-spacing",
  { wrong: (sel, p, v) => `"${sel}" 의 ${p} 는 ${v} 여야 한다 (SPACE-003)` },
  ({ root, result, ruleName, msgs, options }) => {
    const field = options.fieldClassNames || ["text-field"];
    const input = options.inputClassNames || ["text-field__input"];
    const want = [
      [field, /^(row-)?gap$/, "var(--space-gap-3)"],
      [input, /^padding-inline$/, "var(--space-padding-6)"],
    ];
    root.walkRules((r) => {
      for (const [classes, prop, value] of want) {
        if (!r.selectors.some((s) => hasClass(lastCompound(s), classes))) continue;
        r.walkDecls(prop, (d) => {
          if (d.value.trim() !== value) report({ ruleName, result, node: d, message: msgs.wrong(r.selector, d.prop, value) });
        });
      }
    });
  }
);

// SHAPE-003 — % 반경은 원형 허용 클래스에서 50% 만
const radiusPercent = makeRule(
  "radius-percent-allowlist",
  { rejected: (sel, v) => `"${sel}" 의 border-radius ${v} — % 반경은 원형 요소(허용 클래스)의 50% 만 쓴다 (SHAPE-003)` },
  ({ root, result, ruleName, msgs, options }) => {
    const allow = options.allowClasses || ["avatar", "icon-button--circle"];
    root.walkDecls(/^border(-.*)?-radius$/, (d) => {
      if (!/%/.test(d.value)) return;
      const r = d.parent;
      const sel = r.type === "rule" ? r.selector : "";
      const allowed = r.type === "rule" && r.selectors.every((s) => hasClass(lastCompound(s), allow)) && d.value.trim() === "50%";
      if (!allowed) report({ ruleName, result, node: d, message: msgs.rejected(sel, d.value) });
    });
  }
);

// STATE-004 — 피드백 요소를 화면에 고정하지 않는다
const feedbackNotFixed = makeRule(
  "feedback-not-fixed",
  { rejected: (sel, v) => `"${sel}" 에 position: ${v} — 피드백 요소는 본문 아래·사이드에 둔다 (STATE-004)` },
  ({ root, result, ruleName, msgs, options }) => {
    const classes = options.classNames || ["feedback", "feedback__trigger"];
    root.walkRules((r) => {
      if (!r.selectors.some((s) => hasClass(lastCompound(s), classes))) return;
      r.walkDecls("position", (d) => {
        if (/^(fixed|sticky)$/i.test(d.value.trim())) report({ ruleName, result, node: d, message: msgs.rejected(r.selector, d.value) });
      });
    });
  }
);

// TYPO-018 — flex·grid 항목과 표 셀에서 overflow-wrap: break-word 대신 anywhere
const flexGridBreakWord = makeRule(
  "flex-grid-child-no-break-word",
  { rejected: (sel) => `"${sel}" 는 min-content 로 크기가 정해지는 요소다 — overflow-wrap: anywhere 를 쓴다 (TYPO-018)` },
  ({ root, result, ruleName, msgs }) => {
    const containers = new Set();
    root.walkDecls("display", (d) => {
      if (/^(inline-)?(flex|grid)$/i.test(d.value.trim()) && d.parent.type === "rule") {
        for (const s of d.parent.selectors) containers.add(s.trim());
      }
    });
    root.walkDecls(/^(overflow-wrap|word-wrap)$/, (d) => {
      if (d.value.trim() !== "break-word" || d.parent.type !== "rule") return;
      const r = d.parent;
      const hit = r.selectors.some((s) => {
        if (/^(td|th)(?![\w-])/.test(lastCompound(s))) return true;
        const m = s.match(/^(.*?)\s*>\s*[^>]+$/);
        return Boolean(m && containers.has(m[1].trim()));
      });
      if (hit) report({ ruleName, result, node: d, message: msgs.rejected(r.selector) });
    });
  }
);

// TYPO-031 — 본문 텍스트 블록 한 줄 40자(40ic) 이하
const proseMeasure = makeRule(
  "prose-max-inline-size",
  { wrong: (sel) => `"${sel}" 는 max-inline-size 를 40ic 이하로 둔다 (TYPO-031)` },
  ({ root, result, ruleName, msgs, options }) => {
    const classes = options.classNames || ["prose"];
    root.walkRules((r) => {
      if (!r.selectors.some((s) => hasClass(lastCompound(s), classes))) return;
      if (/:/.test(r.selector)) return;
      let ok = false;
      r.walkDecls(/^(max-inline-size|max-width)$/, (d) => {
        const m = d.value.trim().match(/^(\d+(\.\d+)?)ic$/);
        if (m && parseFloat(m[1]) <= 40) ok = true;
      });
      if (!ok) report({ ruleName, result, node: r, message: msgs.wrong(r.selector) });
    });
  }
);

export default [
  noOutlineNone, srNoHidden, srNoZero, noAnimatedPosition,
  tableNoVerticalBorder, fileNameEllipsis, menuPanelHeight, textFieldSpacing,
  radiusPercent, feedbackNotFixed, flexGridBreakWord, proseMeasure,
];
