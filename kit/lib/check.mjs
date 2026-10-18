// ux-baseline 검사 엔진 — `ux-baseline check`(프로젝트)와 trials/grade.mjs(시험 채점)가 함께 쓴다.
// 검사
//   1. stylelint — 작성한 CSS
//   2. html-validate — HTML 파일(또는 URL 페이지의 렌더된 DOM)
//   3. axe-core — 실제 Chromium 에서 렌더링한 페이지. color-contrast 포함
//   4. 320px 리플로, Tab 초점 표시, 상호작용 동작(대화상자·탭·디스클로저)
// 위반은 rule-map.yaml 로 ux-baseline 룰 ID 에 대응시킨다.
// 의존 모듈은 호출하는 쪽이 넘긴다(deps) — 설치 위치가 달라도 같은 엔진을 쓰기 위해서다.

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

import { findSensoryRefs, sensoryMessage } from "./sensory.mjs";

// 브라우저 동작 검사 이름 — 룰 YAML 의 automation.checks 에 tool: ux-baseline-check, rule: <이름> 으로 적는다.
// 어느 룰에 대응하는지는 rule-map.yaml 이 정한다(룰 YAML 이 정본).
export const BEHAVIOR_CHECKS = [
  "reflow-320", "focus-visible", "dialog-focus-in", "dialog-escape-return", "dialog-focus-trap",
  "tabs-arrow-keys", "disclosure-toggle", "leave-warning", "progress-flash", "sensory-text",
  "list-role", "badge-nowrap", "button-group-equal",
];
export const CHECK_TOOL = "ux-baseline-check";

export function ruleIndex(ruleMap) {
  const toRules = {};
  for (const [rid, e] of Object.entries(ruleMap.rules || ruleMap)) {
    for (const c of e.checks || []) {
      if (!c.rule) continue;
      (toRules[`${c.tool}:${c.rule}`] ||= []).push(rid);
    }
  }
  return (tool, rule) => toRules[`${tool === "browser" ? CHECK_TOOL : tool}:${rule}`] || [];
}

/**
 * @param {object} o
 * @param {object} o.deps        { stylelint, HtmlValidate, FileSystemConfigLoader, axeSource }
 * @param {object} o.ruleMap     rule-map.yaml 을 파싱한 것
 * @param {object} o.axeConfig   axe.config.json
 * @param {string[]} o.css       검사할 CSS 파일(절대 경로)
 * @param {string[]} o.html      검사할 HTML 파일(절대 경로) — 브라우저 검사도 이 파일들을 연다
 * @param {string[]} [o.urls]    브라우저로 열어 검사할 URL (개발 서버 등). html-validate 는 렌더된 DOM 에 돌린다
 * @param {object}  [o.browser]  playwright Browser. 없으면 브라우저 검사를 건너뛴다
 * @param {object}  [o.stylelintOptions]  stylelint.lint 에 더할 옵션 (configFile 등). 없으면 프로젝트 설정을 찾는다
 * @param {(file:string)=>string} [o.htmlValidateName]  html-validate 가 설정을 찾을 파일 이름 (기본: 그 파일)
 * @param {(file:string)=>string} [o.label]  보고서에 쓸 파일 이름
 */
export async function runChecks(o) {
  const { deps, css = [], html = [], urls = [], browser = null } = o;
  const label = o.label || ((f) => f);
  const mapRule = ruleIndex(o.ruleMap);
  const findings = [];
  const add = (tool, rule, severity, message, where) => findings.push({ tool, rule, severity, message, where, rules: mapRule(tool, rule) });

  // 1. stylelint
  for (const f of css) {
    const r = await deps.stylelint.lint({ files: [f], ...(o.stylelintOptions || {}) });
    for (const res of r.results) {
      for (const w of res.warnings) add("stylelint", w.rule, w.severity, w.text, `${label(f)}:${w.line}`);
      for (const w of res.invalidOptionWarnings || []) add("stylelint", "invalid-option", "error", w.text, label(f));
      if (res.parseErrors?.length) for (const w of res.parseErrors) add("stylelint", "parse-error", "error", w.text, `${label(f)}:${w.line}`);
    }
  }

  // 2. html-validate
  const hv = new deps.HtmlValidate(new deps.FileSystemConfigLoader());
  const seenHtml = new Set(); // 정적 HTML 에서 이미 보고한 (규칙, 메시지)
  const validateHtml = async (source, name, where, { onlyNew = false } = {}) => {
    const r = await hv.validateString(source, name);
    for (const res of r.results) for (const m of res.messages) {
      const key = `${m.ruleId}|${m.message}`;
      if (onlyNew && seenHtml.has(key)) continue;
      seenHtml.add(key);
      add("html-validate", m.ruleId, m.severity === 2 ? "error" : "warning", m.message, `${where}${onlyNew ? "" : `:${m.line}`}`);
    }
  };
  const htmlSources = [];
  for (const f of html) {
    const src = readFileSync(f, "utf8");
    htmlSources.push(src);
    await validateHtml(src, o.htmlValidateName ? o.htmlValidateName(f) : f, label(f));
  }
  // 정적 HTML 에 이미 있는 문장은 html-validate(sensory-reference)가 봤으므로 브라우저 쪽에서는 스크립트가 만든 문장만 본다
  const inStatic = (sentence) => htmlSources.some((h) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").includes(sentence));

  // 3·4. 실제 브라우저
  const pages = [
    ...html.map((f) => ({ url: pathToFileURL(f).href, where: label(f) })),
    ...urls.map((u) => ({ url: u, where: u, rendered: true })),
  ];
  // 스크립트로 바뀐 상태(오류·로딩·결과 등) — 단계를 실행한 뒤 같은 브라우저 검사를 한다
  for (const st of o.states || []) {
    // 'index.html?empty=1#orders' 처럼 쿼리·해시를 붙여 상태를 재현할 수 있다
    const [, file, rest = ""] = st.page.match(/^([^?#]*)(.*)$/);
    const url = /^https?:/.test(st.page) ? st.page : pathToFileURL(o.resolvePage ? o.resolvePage(file) : file).href + rest;
    pages.push({ url, where: `${st.page} [상태: ${st.name}]`, steps: st.steps || [], state: true, file: /^https?:/.test(st.page) ? null : (o.resolvePage ? o.resolvePage(file) : file) });
  }
  const browserRun = { ran: false, pages: 0, states: 0, focusables: 0 };
  if (browser) {
    browserRun.ran = true;
    for (const p of pages) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      try {
        await page.goto(p.url, { waitUntil: "load" });
        if (p.rendered) {
          const dom = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
          await validateHtml(dom, o.htmlValidateName ? o.htmlValidateName("rendered.html") : "rendered.html", p.where);
        }
        const addHere = (...a) => add(...a.slice(0, 4), `${p.where} ${a[4] || ""}`.trim());
        if (p.steps) {
          await watchProgress(page, o.progressSelector);
          const err = await runSteps(page, p.steps);
          if (err) { add("browser", "state-step", "error", `상태 단계 실패: ${err}`, p.where); continue; }
          await reportProgressFlash(page, addHere);
          // 스크립트가 만든 마크업(오류 요약·결과 영역 등)도 html-validate 로 본다 — 정적 HTML 에서 이미 보고한 것은 빼고
          const dom = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
          await validateHtml(dom, o.htmlValidateName ? o.htmlValidateName("rendered.html") : p.file || "rendered.html", p.where, { onlyNew: true });
        }
        // 스크립트가 만든 문구의 감각 표현 (COPY-001 후보)
        const text = await page.evaluate(() => document.body ? document.body.innerText : "");
        for (const r of findSensoryRefs(text)) if (!inStatic(r.sentence)) addHere("browser", "sensory-text", "warning", sensoryMessage(r), "");
        const r = await browserChecks(page, deps.axeSource, o.axeConfig, addHere, { behavior: !p.state });
        if (p.state) browserRun.states++; else browserRun.pages++;
        browserRun.focusables += r.focusables;
      } catch (e) {
        add("browser", "page-load", "error", `페이지를 열지 못함: ${e.message.split("\n")[0]}`, p.where);
      } finally {
        await page.close();
      }
    }
  }

  const errors = findings.filter((f) => f.severity === "error").length;
  return {
    summary: { errors, warnings: findings.length - errors, css: css.length, html: html.length, urls: urls.length, browser: browserRun },
    findings,
  };
}

// STATE-002 — 1초 안에 끝난 처리에 진행 표시가 깜빡였는지: 상태 단계를 실행하는 동안 진행 표시가 보인 구간을 잰다
const PROGRESS_SELECTOR = '[role="progressbar"], progress, .spinner';
async function watchProgress(page, selector) {
  await page.evaluate((sel) => {
    const log = (window.__uxbProgress = { spans: [], start: null, sel });
    const visible = () => [...document.querySelectorAll(sel)].some((e) => e.getClientRects().length && getComputedStyle(e).visibility !== "hidden");
    window.__uxbTimer = setInterval(() => {
      const v = visible(), t = performance.now();
      if (v && log.start === null) log.start = t;
      if (!v && log.start !== null) { log.spans.push(t - log.start); log.start = null; }
    }, 25);
  }, selector || PROGRESS_SELECTOR);
}
async function reportProgressFlash(page, add) {
  await page.waitForTimeout(100);
  const spans = await page.evaluate(() => { clearInterval(window.__uxbTimer); return window.__uxbProgress ? window.__uxbProgress.spans : []; });
  for (const ms of spans.filter((x) => x < 1000)) {
    add("browser", "progress-flash", "warning", `진행 표시가 ${Math.round(ms)}ms 만 보였다 — 1초 안에 끝나는 처리에는 진행 표시를 띄우지 않는다(1초가 지나도 안 끝날 때 띄운다)`, "");
  }
}

// STATE-032 — 입력 폼에 값을 넣은 뒤 새로 고침하면 beforeunload 확인이 떠야 한다
async function leaveWarningCheck(page, add) {
  const field = await page.evaluateHandle(() => {
    const forms = [...document.querySelectorAll("form")].filter((f) => f.getAttribute("role") !== "search" && !f.closest('[role="search"], search'));
    const TEXT = 'textarea, input:not([type]), input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="url"], input[type="date"]';
    for (const f of forms) {
      const fields = [...f.querySelectorAll(TEXT)].filter((e) => !e.disabled && !e.readOnly && e.getClientRects().length);
      // 입력 폼으로 본다: 여러 줄 입력이 있거나 한 줄 입력이 2개 이상
      if (fields.some((e) => e.tagName === "TEXTAREA") || fields.length >= 2) return fields[0];
    }
    return null;
  });
  const el = field.asElement();
  if (!el) return;
  const where = await el.evaluate((e) => e.outerHTML.slice(0, 80));
  let dialog = null;
  const onDialog = async (d) => { dialog = d.type(); await d.accept().catch(() => {}); };
  page.on("dialog", onDialog);
  try {
    await el.click();
    await page.keyboard.type("테스트");
    await page.reload({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(200);
  } finally {
    page.off("dialog", onDialog);
  }
  if (dialog !== "beforeunload") add("browser", "leave-warning", "warning", "입력 폼에 값을 넣고 새로 고침해도 확인(beforeunload)이 뜨지 않아 입력이 사라진다", where);
}

// 상태 단계: {click: 선택자} {fill: [선택자, 값]} {check: 선택자} {select: [선택자, 값]} {press: 키} {waitFor: 선택자} {wait: ms}
export const STEP_KINDS = ["click", "fill", "check", "select", "press", "waitFor", "wait"];
async function runSteps(page, steps) {
  for (const [i, st] of steps.entries()) {
    const kind = Object.keys(st)[0];
    const v = st[kind];
    const tag = `${i + 1}번째 ${JSON.stringify(st)}`;
    try {
      if (kind === "click") await page.click(v, { timeout: 5000 });
      else if (kind === "fill") await page.fill(v[0], v[1], { timeout: 5000 });
      else if (kind === "check") await page.check(v, { timeout: 5000 });
      else if (kind === "select") await page.selectOption(v[0], v[1], { timeout: 5000 });
      else if (kind === "press") await page.keyboard.press(v);
      else if (kind === "waitFor") await page.waitForSelector(v, { state: "visible", timeout: 10000 });
      else if (kind === "wait") await page.waitForTimeout(Number(v));
      else return `${tag}: 알 수 없는 단계 (${STEP_KINDS.join("·")} 중 하나)`;
    } catch (e) {
      return `${tag}: ${e.message.split("\n")[0]}`;
    }
  }
  return null;
}

async function browserChecks(page, axeSource, axeConfig, add, { behavior = true } = {}) {
  // 등장 애니메이션(opacity 0 → 1)이 끝난 뒤 검사한다 — 중간 상태의 색 대비를 재지 않도록
  // 막 시작한 전환도 잡히도록 두 프레임 기다린 뒤 본다
  await page.evaluate(async () => {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await Promise.all(document.getAnimations().map((a) => a.finished.catch(() => null)));
  });
  // 페이지 자체 스크립트 여부 — axe 를 주입하기 전에 본다
  const hasScript = await page.evaluate(() => document.scripts.length > 0);
  if (!(await page.evaluate(() => typeof window.axe !== "undefined"))) await page.addScriptTag({ content: axeSource });
  const axeRes = await page.evaluate(async (cfg) => {
    // eslint-disable-next-line no-undef
    const r = await axe.run(document, { runOnly: cfg.runOnly, rules: cfg.rules });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map((n) => n.target.join(" ")).slice(0, 5), count: v.nodes.length }));
  }, axeConfig);
  for (const v of axeRes) add("axe-core", v.id, v.impact === "minor" ? "warning" : "error", `${v.help} (${v.count}곳)`, v.nodes.join(", "));

  // 좁은 화면(320px) 가로 넘침 — RESP-003
  await page.setViewportSize({ width: 320, height: 800 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 0) add("browser", "reflow-320", "error", `320px 너비에서 가로 스크롤 ${overflow}px`, "");
  await page.setViewportSize({ width: 1280, height: 900 });

  // 계산 스타일 검사 (stylelint 로는 상속·클래스 조합을 못 본다)
  const computed = await page.evaluate(() => {
    const vis = (e) => e.getClientRects().length && getComputedStyle(e).visibility !== "hidden";
    const short = (e) => e.outerHTML.slice(0, 80);
    const out = { list: [], badge: [], group: [] };
    // A11Y-007 (8) · CF-059: 목록 기호를 없앤 ul·ol 은 role="list"
    for (const l of document.querySelectorAll("ul, ol")) {
      if (!vis(l) || l.hasAttribute("role")) continue;
      const items = [...l.children].filter((c) => c.tagName === "LI");
      if (!items.length) continue;
      const none = getComputedStyle(l).listStyleType === "none" && items.every((li) => getComputedStyle(li).listStyleType === "none" || getComputedStyle(li).display !== "list-item");
      if (none) out.list.push(short(l));
    }
    // TYPO-014 · CF-045: 배지는 줄바꿈을 막지 않는다
    for (const b of document.querySelectorAll(".badge")) if (vis(b) && getComputedStyle(b).whiteSpace === "nowrap") out.badge.push(short(b));
    // LAYOUT-020: 같은 버튼 그룹(.button-group) 안 버튼은 같은 크기(±1px)
    for (const g of document.querySelectorAll(".button-group")) {
      const bs = [...g.querySelectorAll(":scope > .button, :scope > button")].filter(vis);
      if (bs.length < 2) continue;
      const ws = bs.map((b) => b.getBoundingClientRect().width), hs = bs.map((b) => b.getBoundingClientRect().height);
      if (Math.max(...ws) - Math.min(...ws) > 1 || Math.max(...hs) - Math.min(...hs) > 1) out.group.push(`${short(g)} 너비 ${ws.map((w) => w.toFixed(0)).join("/")}px`);
    }
    return out;
  });
  for (const x of computed.list) add("browser", "list-role", "error", '목록 기호를 없앤 목록(list-style-type: none)에 role="list" 가 없다 — 일부 스크린 리더가 목록으로 읽지 못한다', x);
  for (const x of computed.badge) add("browser", "badge-nowrap", "warning", "배지의 white-space 가 nowrap 이다(상속 포함) — 좁은 화면에서 줄바꿈되게 한다", x);
  for (const x of computed.group) add("browser", "button-group-equal", "warning", "같은 버튼 그룹 안 버튼의 크기가 다르다(±1px 초과)", x);

  // 키보드 초점 표시 — A11Y-016
  // 상태 단계에서 마우스로 누른 뒤에는 브라우저가 :focus-visible 을 끄므로, 키를 한 번 눌러 키보드 사용 상태로 돌린다
  await page.keyboard.press("Shift");
  const focusReport = await page.evaluate(async () => {
    const sel = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), summary';
    const els = [...document.querySelectorAll(sel)].filter((e) => e.getClientRects().length && getComputedStyle(e).visibility !== "hidden");
    const style = (e) => { const s = getComputedStyle(e); return [s.outlineStyle, s.outlineWidth, s.outlineColor, s.boxShadow, s.borderColor, s.backgroundColor, s.textDecorationLine].join("|"); };
    const bad = [];
    for (const e of els.slice(0, 80)) {
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      const before = style(e);
      e.focus({ focusVisible: true });
      if (document.activeElement !== e) continue;
      const after = style(e);
      // 커스텀 컨트롤은 숨긴 input 대신 인접 표시 요소가 바뀌므로 다음 형제·부모도 본다
      const sib = e.nextElementSibling, par = e.parentElement;
      if (before === after) {
        const sb = sib ? style(sib) : "", pb = par ? style(par) : "";
        e.blur();
        const sa = sib ? style(sib) : "", pa = par ? style(par) : "";
        if (sb === sa && pb === pa) bad.push(e.outerHTML.slice(0, 80));
      }
    }
    return { total: els.length, bad };
  });
  for (const b of focusReport.bad) add("browser", "focus-visible", "error", "초점을 받아도 시각적 변화가 없음", b);

  // 상호작용 동작 — 스크립트가 있는 페이지만 (WAI-ARIA APG 패턴의 키보드 동작을 실제 키 입력으로 확인)
  if (hasScript && behavior) await behaviorChecks(page, add);
  return { focusables: focusReport.total };
}

async function behaviorChecks(page, add) {
  const active = () => page.evaluate(() => {
    const a = document.activeElement;
    return a ? (a.id ? "#" + a.id : a.tagName.toLowerCase() + (a.className ? "." + String(a.className).split(" ")[0] : "")) : null;
  });
  // 대화상자: 여는 버튼 → 초점이 안으로, Tab 이 안에 머묾(모달), Esc 로 닫히고 초점이 여는 버튼으로
  const triggers = await page.$$('button[aria-haspopup="dialog"], button[aria-controls]');
  let tested = 0;
  for (const t of triggers) {
    if (tested >= 2) break;
    const dlgId = await t.evaluate((b) => {
      const id = b.getAttribute("aria-controls");
      const el = id && document.getElementById(id);
      if (!el || !(el.tagName === "DIALOG" || ["dialog", "alertdialog"].includes(el.getAttribute("role")))) return null;
      const shown = el.tagName === "DIALOG" ? el.open : el.getClientRects().length > 0;
      return shown || b.getClientRects().length === 0 ? null : id;
    });
    if (!dlgId) continue;
    tested++;
    await t.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    const inside = await page.evaluate((id) => document.getElementById(id).contains(document.activeElement), dlgId);
    if (!inside) add("browser", "dialog-focus-in", "error", `대화상자 #${dlgId} 를 열어도 초점이 안으로 가지 않음 (초점: ${await active()})`, `#${dlgId}`);
    const modal = await page.evaluate((id) => { const d = document.getElementById(id); return (d.matches && d.matches(":modal")) || d.getAttribute("aria-modal") === "true"; }, dlgId);
    if (modal) {
      let escaped = false;
      for (let i = 0; i < 12; i++) {
        await page.keyboard.press("Tab");
        // 밖의 페이지 요소로 가면 실패. 브라우저 UI 로 나가는 것(activeElement = body)은 네이티브 모달의 정상 동작
        const out = await page.evaluate((id) => { const a = document.activeElement; return !!a && a !== document.body && a !== document.documentElement && !document.getElementById(id).contains(a); }, dlgId);
        if (out) { escaped = true; break; }
      }
      if (escaped) add("browser", "dialog-focus-trap", "error", `모달 #${dlgId} 에서 Tab 으로 초점이 밖으로 나감`, `#${dlgId}`);
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    const open = await page.evaluate((id) => { const d = document.getElementById(id); return d.tagName === "DIALOG" ? d.open : d.getClientRects().length > 0; }, dlgId);
    const back = await t.evaluate((b) => document.activeElement === b);
    if (open || !back) add("browser", "dialog-escape-return", "error", `Esc 로 #${dlgId} 가 ${open ? "닫히지 않음" : "닫혔지만 초점이 여는 버튼으로 돌아오지 않음"}`, `#${dlgId}`);
  }
  // 탭: 선택된 탭에서 → 를 누르면 다음 탭으로 초점이 간다
  const tab = await page.$('[role="tablist"] [role="tab"][aria-selected="true"]');
  if (tab && (await tab.isVisible())) {
    await tab.focus();
    const before = await active();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(150);
    const after = await page.evaluate(() => document.activeElement && document.activeElement.getAttribute("role"));
    if (after !== "tab" || (await active()) === before) add("browser", "tabs-arrow-keys", "error", "탭 목록에서 → 키로 다음 탭으로 이동하지 않음", before);
  }
  // 디스클로저·아코디언: aria-expanded 버튼을 Enter 로 펼치고 접는다
  const disc = await page.$$('button[aria-expanded]:not([role]):not([aria-haspopup])');
  for (const b of disc.slice(0, 3)) {
    if (!(await b.isVisible())) continue;
    const v0 = await b.getAttribute("aria-expanded");
    await b.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(150);
    const v1 = await b.getAttribute("aria-expanded");
    if (v0 === v1) add("browser", "disclosure-toggle", "error", `aria-expanded 버튼을 Enter 로 눌러도 상태가 바뀌지 않음 (${v0})`, await b.evaluate((e) => e.outerHTML.slice(0, 80)));
    else { await page.keyboard.press("Enter"); await page.waitForTimeout(100); }
  }
  // 페이지를 새로 고치므로 마지막에 한다
  await leaveWarningCheck(page, add);
}

// 사람·AI가 읽고 고칠 보고서(Markdown). 위반을 룰 ID 별로 묶고 룰 문장과 상세 파일 위치를 붙인다.
export function formatReport(result, { rules = {}, refDir = null, version = "", notes = [] } = {}) {
  const { summary, findings } = result;
  const out = [];
  out.push(`# ux-baseline 검사 결과${version ? ` (v${version})` : ""}`, "");
  out.push(`**오류 ${summary.errors} / 경고 ${summary.warnings}** — CSS ${summary.css}개, HTML ${summary.html}개${summary.urls ? `, URL ${summary.urls}개` : ""}, 브라우저 검사 ${summary.browser.ran ? `${summary.browser.pages}쪽${summary.browser.states ? ` + 상태 ${summary.browser.states}개` : ""}` : "안 함"}`);
  for (const n of notes) out.push("", `> ${n}`);
  if (!findings.length) { out.push("", "위반 없음."); return out.join("\n") + "\n"; }
  const groups = new Map();
  for (const f of findings) {
    const key = f.rules.length ? f.rules.join(",") : `${f.tool}/${f.rule}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(f);
  }
  const sev = (fs) => (fs.some((f) => f.severity === "error") ? 0 : 1);
  const sorted = [...groups.entries()].sort((a, b) => sev(a[1]) - sev(b[1]) || a[0].localeCompare(b[0]));
  for (const [key, fs] of sorted) {
    const label = sev(fs) === 0 ? "오류" : "경고";
    const ids = fs[0].rules;
    out.push("", `## [${label}] ${ids.length ? ids.join(" · ") : key} — ${fs.length}건`);
    for (const id of ids) {
      const r = rules[id];
      if (!r) continue;
      out.push(`- **${id}** (${r.strength}) ${r.statement}`);
      if (refDir) out.push(`  상세: \`${refDir}/${r.category}.md\` 에서 ${id}`);
    }
    if (!ids.length) out.push("- 체계 룰에 대응하지 않는 검사 결과(검사기 기본 규칙) — 메시지를 보고 고친다.");
    const byCheck = new Map();
    for (const f of fs) {
      const k = `${f.tool}/${f.rule}`;
      if (!byCheck.has(k)) byCheck.set(k, []);
      byCheck.get(k).push(f);
    }
    for (const [k, xs] of byCheck) {
      out.push(`- 검사 \`${k}\``);
      for (const x of xs.slice(0, 8)) out.push(`  - ${x.where}: ${x.message.replace(/\s+/g, " ").slice(0, 200)}`);
      if (xs.length > 8) out.push(`  - …외 ${xs.length - 8}건`);
    }
  }
  return out.join("\n") + "\n";
}
