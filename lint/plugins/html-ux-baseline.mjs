// ux-baseline 자체 html-validate 규칙 — 이 체계의 결정(날짜 표기, 필수 표시, 오류 요약 등)을 정적 HTML 에서 검사한다.
// 각 규칙 이름 옆 주석의 ID 가 근거 룰이다.
import { Rule, definePlugin } from "html-validate";
import { findSensoryRefs, sensoryMessage } from "../../kit/lib/sensory.mjs";

const SKIP = new Set(["script", "style", "code", "pre", "kbd", "samp", "template"]);
const textOf = (node) => (node.textContent || "").replace(/\s+/g, " ").trim();
function* textElements(doc) {
  // 텍스트를 직접 가진 요소만 (자식 요소의 텍스트는 그 자식에서 본다)
  for (const el of doc.querySelectorAll("*")) {
    if (SKIP.has(el.tagName) || el.closest("code, pre, script, style, template")) continue;
    const own = el.childNodes.filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ");
    if (own.trim()) yield [el, own];
  }
}

// COPY-056 — 숫자 날짜는 '2026. 10. 18.' 형식, 연월일은 <time datetime>
const BAD_DATE = /(?<![\d.])(\d{4})(?:([-/])(\d{1,2})\2(\d{1,2})|\.(\d{1,2})\.(\d{1,2})\.?|\. (\d{1,2})\. (\d{1,2})(?!\.))(?![\d.])/;
class DateFormat extends Rule {
  documentation() {
    return { description: "숫자 날짜는 '2026. 10. 18.' 처럼 쓴다 (COPY-056)." };
  }
  setup() {
    this.on("dom:ready", ({ document }) => {
      for (const [el, text] of textElements(document)) {
        const m = text.match(BAD_DATE);
        if (m) this.report(el, `날짜 '${m[0]}' 는 '${m[1]}. ${Number(m[3] || m[5] || m[7])}. ${Number(m[4] || m[6] || m[8])}.' 형식으로 쓴다 (COPY-056)`);
      }
      for (const [el, text] of textElements(document)) {
        // 형식 예시('예: 2026. 10. 25.')는 날짜 값이 아니므로 time 요구에서 뺀다
        const dates = [...text.matchAll(/(예시?:?\s*)?(?<![\d.])\d{4}\. \d{1,2}\. \d{1,2}\./g)].filter((m) => !m[1]);
        if (dates.length && !el.closest("time")) {
          this.report(el, "연월일 날짜는 <time datetime=\"YYYY-MM-DD\"> 로 감싼다 (COPY-056)");
        }
      }
    });
  }
}

// FORM-012 — 한 판정 단위(form, form 밖의 독립 fieldset) 안에서 필수 표시 방식을 섞지 않는다 ('필수'·'선택' 텍스트 vs 별표)
// 표시 텍스트는 '(필수)'·'[선택]' 처럼 괄호로 감싼 것, 또는 텍스트가 '필수'·'선택' 뿐인 하위 요소만 센다
// ('선택 안 함' 옵션·'지역 선택' 같은 레이블 문구는 표시가 아니다).
const MARK_WORD = /[([]\s*(필수|선택)\s*[)\]]/;
const MARK_ONLY = /^[([]?\s*(필수|선택)\s*[)\]]?$/;
class RequiredMarker extends Rule {
  documentation() {
    return { description: "form 과 form 밖 fieldset 안의 필수·선택 표시는 한 가지 방식만 쓴다 (FORM-012)." };
  }
  setup() {
    this.on("dom:ready", ({ document }) => {
      const units = [
        ...document.querySelectorAll("form"),
        ...document.querySelectorAll("fieldset").filter((fs) => !fs.closest("form") && !(fs.parent && fs.parent.closest("fieldset"))),
      ];
      for (const unit of units) {
        const labels = unit.querySelectorAll("label, legend");
        const star = labels.some((l) => /\*/.test(textOf(l)));
        const word = labels.some((l) => MARK_WORD.test(textOf(l)) || l.querySelectorAll("*").some((c) => MARK_ONLY.test(textOf(c))));
        if (star && word) this.report(unit, "필수 표시에 별표(*)와 '필수'·'선택' 글자를 섞어 썼다 — 한 방식만 쓴다 (FORM-012)");
      }
    });
  }
}

// FORM-077 — 오류 요약은 본문 제목(h1) 바로 다음
class ErrorSummaryPosition extends Rule {
  documentation() {
    return { description: "오류 요약(.error-summary)은 h1 바로 다음 요소로 둔다 (FORM-077)." };
  }
  setup() {
    this.on("dom:ready", ({ document }) => {
      for (const s of document.querySelectorAll(".error-summary")) {
        const parent = s.parent;
        if (!parent) continue;
        const siblings = parent.childElements;
        const prev = siblings[siblings.indexOf(s) - 1];
        if (!prev || prev.tagName !== "h1") this.report(s, "오류 요약은 본문 제목(h1) 바로 다음 요소로 둔다 (FORM-077)");
      }
    });
  }
}

// FORM-079 — 오류 상태 페이지의 <title> 은 '오류: ' 로 시작
class ErrorTitlePrefix extends Rule {
  documentation() {
    return { description: "검증 오류를 보여 주는 페이지의 <title> 은 '오류: ' 로 시작한다 (FORM-079)." };
  }
  setup() {
    this.on("dom:ready", ({ document }) => {
      const hasError = document.querySelector(".error-summary") || document.querySelector('[aria-invalid="true"]');
      const title = document.querySelector("title");
      if (hasError && title && !/^오류: /.test(textOf(title))) this.report(title, "오류를 보여 주는 페이지의 <title> 은 '오류: ' 로 시작한다 (FORM-079)");
    });
  }
}

// COPY-006 — 확인 대화상자 실행 버튼에 '확인'·'예'·'네'·'OK' 를 쓰지 않는다
const VAGUE = new Set(["확인", "예", "네", "ok", "OK", "Ok"]);
class DialogActionVerb extends Rule {
  documentation() {
    return { description: "확인 대화상자의 실행 버튼은 동작 동사로 쓴다 (COPY-006)." };
  }
  setup() {
    this.on("dom:ready", ({ document }) => {
      for (const dlg of document.querySelectorAll('dialog, [role="dialog"], [role="alertdialog"]')) {
        const buttons = dlg.querySelectorAll("button");
        if (buttons.length < 2) continue; // 실행·취소가 있는 확인 대화상자만
        for (const b of buttons) {
          if (VAGUE.has(textOf(b))) this.report(b, `확인 대화상자 버튼 '${textOf(b)}' 대신 실행할 동작(예: '삭제', '제출')을 쓴다 (COPY-006)`);
        }
      }
    });
  }
}

// COPY-001 — 감각적 특성만으로 대상을 가리키는 안내 문구 (후보 검출, 경고)
const BLOCKS = "p, li, dd, dt, label, legend, h1, h2, h3, h4, h5, h6, td, th, figcaption, caption, summary";
class SensoryReference extends Rule {
  documentation() {
    return { description: "'오른쪽 버튼', '빨간 항목', '밑줄 친 부분'처럼 감각적 특성만으로 대상을 가리키지 않는다 (COPY-001)." };
  }
  setup() {
    this.on("dom:ready", ({ document }) => {
      for (const el of document.querySelectorAll(BLOCKS)) {
        if (el.closest("code, pre, script, style, template")) continue;
        // 안쪽에 다른 블록이 있으면 그 블록에서 본다
        if (el.querySelector(BLOCKS)) continue;
        for (const r of findSensoryRefs(textOf(el))) this.report(el, sensoryMessage(r));
      }
    });
  }
}

export default definePlugin({
  name: "ux-baseline",
  rules: {
    "ux-baseline/date-format": DateFormat,
    "ux-baseline/required-marker-consistency": RequiredMarker,
    "ux-baseline/error-summary-position": ErrorSummaryPosition,
    "ux-baseline/error-title-prefix": ErrorTitlePrefix,
    "ux-baseline/dialog-action-verb": DialogActionVerb,
    "ux-baseline/sensory-reference": SensoryReference,
  },
});
