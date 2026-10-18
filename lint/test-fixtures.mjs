// 검사기 설정 자체를 검사한다: good 픽스처는 위반 0, bad 픽스처는 기대한 규칙이 모두 걸려야 한다.
import stylelint from "stylelint";
import { HtmlValidate, FileSystemConfigLoader } from "html-validate";
import { readFileSync } from "node:fs";
import { JSDOM, VirtualConsole } from "jsdom";

let failed = 0;
const fail = (m) => { console.error("실패:", m); failed++; };

const css = async (file) => {
  const r = await stylelint.lint({ files: [file], configFile: "stylelint.config.mjs" });
  return r.results[0].warnings.map((w) => w.rule);
};
const goodCss = await css("fixtures/good.css");
if (goodCss.length) fail(`good.css 위반 ${goodCss.join(", ")}`);
const badCss = await css("fixtures/bad.css");
const strict = badCss.filter((r) => r === "scale-unlimited/declaration-strict-value").length;
if (strict < 5) fail(`bad.css 토큰 위반이 5개 이상이어야 함 (실제 ${strict})`);
for (const r of [
  "declaration-property-value-disallowed-list", "declaration-property-unit-disallowed-list",
  "declaration-property-unit-allowed-list", "at-rule-property-required-list", "media-feature-name-value-allowed-list",
  "ux-baseline/no-outline-none-without-replacement", "ux-baseline/sr-only-no-display-none",
  "ux-baseline/sr-only-no-zero-size", "ux-baseline/no-animated-position-props",
  "ux-baseline/table-cell-no-vertical-border", "ux-baseline/file-name-ellipsis",
  "ux-baseline/menu-panel-max-height", "ux-baseline/text-field-spacing",
  "ux-baseline/radius-percent-allowlist", "ux-baseline/feedback-not-fixed",
  "ux-baseline/flex-grid-child-no-break-word", "ux-baseline/prose-max-inline-size",
]) {
  if (!badCss.includes(r)) fail(`bad.css 에서 ${r} 가 걸리지 않음 (걸린 것: ${[...new Set(badCss)].join(", ")})`);
}

const hv = new HtmlValidate(new FileSystemConfigLoader());
const html = async (file) => {
  const r = await hv.validateString(readFileSync(file, "utf8"), file);
  return r.results.flatMap((x) => x.messages.map((m) => m.ruleId));
};
const goodHtml = await html("fixtures/good.html");
if (goodHtml.length) fail(`good.html 위반 ${goodHtml.join(", ")}`);
const badHtml = await html("fixtures/bad.html");
for (const r of ["empty-title", "wcag/h37", "no-dup-id", "valid-autocomplete", "no-autoplay"]) {
  if (!badHtml.includes(r)) fail(`bad.html 에서 ${r} 가 걸리지 않음 (걸린 것: ${[...new Set(badHtml)].join(", ")})`);
}

// COPY-001 감각 표현 후보 검출 — 걸려야 하는 문장과 걸리면 안 되는 문장
const { findSensoryRefs } = await import("../kit/lib/sensory.mjs");
for (const t of ["오른쪽 버튼을 누르세요.", "빨간색으로 표시된 항목을 고치세요.", "밑줄 친 부분을 확인하세요.", "동그란 아이콘을 누르면 열립니다.", "소리가 나면 다시 시도하세요."]) {
  if (!findSensoryRefs(t).length) fail(`감각 표현을 놓침: ${t}`);
}
for (const t of ["오른쪽의 '다음' 버튼을 누르세요.", "[제출] 버튼을 누르세요.", "빨간 '필수' 표시가 있는 항목을 채우세요.", "화면 위쪽으로 이동합니다.", "아래 목록에서 고르세요.",
  "확신이 낮은 문장에는 '확인 필요' 표시가 붙습니다."]) {
  if (findSensoryRefs(t).length) fail(`감각 표현 오탐: ${t} → ${JSON.stringify(findSensoryRefs(t))}`);
}

// 체계 결정 검사(html-validate 자체 규칙): 나쁜 예에서 모두 걸려야 한다
const badDecisions = await html("fixtures/bad-decisions.html");
for (const r of ["ux-baseline/date-format", "ux-baseline/required-marker-consistency", "ux-baseline/error-summary-position",
  "ux-baseline/error-title-prefix", "ux-baseline/dialog-action-verb", "ux-baseline/sensory-reference"]) {
  if (!badDecisions.includes(r)) fail(`bad-decisions.html 에서 ${r} 가 걸리지 않음 (걸린 것: ${[...new Set(badDecisions)].join(", ")})`);
}
// FORM-012: form 과 form 밖 독립 fieldset 이 각각 판정 단위라 두 번 걸려야 한다
const markerHits = badDecisions.filter((r) => r === "ux-baseline/required-marker-consistency").length;
if (markerHits !== 2) fail(`bad-decisions.html 에서 required-marker-consistency 가 form·독립 fieldset 각각 1번(2번) 걸려야 함 (실제 ${markerHits})`);

// axe-core: 설정(태그 + 명시적으로 켠 규칙)으로 bad.html 을 돌려 기대한 위반이 나와야 한다
const axeCfg = JSON.parse(readFileSync("axe.config.json", "utf8"));
delete axeCfg.$comment;
const dom = new JSDOM(readFileSync("fixtures/bad.html", "utf8"), { pretendToBeVisual: true, virtualConsole: new VirtualConsole() });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const axe = (await import("axe-core")).default;
const axeRes = await axe.run(dom.window.document, { runOnly: axeCfg.runOnly, rules: axeCfg.rules, preload: false });
const axeHit = new Set(axeRes.violations.map((v) => v.id));
for (const r of ["image-alt", "document-title", "autocomplete-valid"]) {
  if (!axeHit.has(r)) fail(`axe: bad.html 에서 ${r} 가 걸리지 않음 (걸린 것: ${[...axeHit].join(", ")})`);
}
const ran = new Set(["passes", "violations", "incomplete", "inapplicable"].flatMap((k) => axeRes[k].map((x) => x.id)));
for (const r of Object.keys(axeCfg.rules)) if (!ran.has(r)) fail(`axe: 명시적으로 켠 ${r} 가 실행되지 않음`);
const hcCfg = JSON.parse(readFileSync("axe.high-contrast.config.json", "utf8"));
const hcRes = await axe.run(dom.window.document, { runOnly: hcCfg.runOnly, preload: false });
const hcRan = new Set(["passes", "violations", "incomplete", "inapplicable"].flatMap((k) => hcRes[k].map((x) => x.id)));
if (!hcRan.has("color-contrast-enhanced")) fail("axe 고대비 설정: color-contrast-enhanced 가 실행되지 않음");

console.log(failed ? `실패 ${failed}건` : "검사기 설정 픽스처 통과");
process.exit(failed ? 1 : 0);
