#!/usr/bin/env node
// ux-baseline — 웹 UI/UX 기준을 프로젝트에 깔고(init·update) 검사한다(check).
//   npx ux-baseline init     설정·토큰·AI 지침·스킬 설치
//   npx ux-baseline check    모든 검사를 돌리고 위반을 룰 ID 와 함께 보고 (오류가 있으면 종료 코드 1)
//   npx ux-baseline update   패키지를 올린 뒤 토큰·AI 지침·스킬을 새 버전으로 교체
import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync, rmSync, statSync, globSync } from "node:fs";
import { join, dirname, relative, resolve, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const PKG_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PKG = JSON.parse(readFileSync(join(PKG_DIR, "package.json"), "utf8"));
const VERSION = PKG.version;
const CWD = process.cwd();
const CONFIG_FILE = "ux-baseline.config.json";
const SKILL_DIR = ".claude/skills/ux-baseline";
const BLOCK_START = "<!-- ux-baseline:start";
const BLOCK_END = "<!-- ux-baseline:end -->";

const DEFAULT_CONFIG = {
  version: VERSION,
  cssDir: "vendor/ux-baseline",
  html: ["**/*.html"],
  css: ["**/*.css"],
  ignore: ["node_modules/**", "vendor/ux-baseline/**", ".claude/**", ".git/**", "dist/**", "build/**", "coverage/**"],
  urls: [],
  states: [],
};

const log = (...a) => console.log(...a);
const fail = (msg, code = 2) => { console.error(msg); process.exit(code); };
const rel = (p) => relative(CWD, p) || ".";

function readConfig({ required = true } = {}) {
  const p = join(CWD, CONFIG_FILE);
  if (!existsSync(p)) {
    if (required) fail(`${CONFIG_FILE} 가 없다. 먼저 npx ux-baseline init 을 실행한다.`);
    return null;
  }
  return { ...DEFAULT_CONFIG, ...JSON.parse(readFileSync(p, "utf8")) };
}

function writeIfAbsent(path, content, { force = false } = {}) {
  const p = join(CWD, path);
  if (existsSync(p) && !force) { log(`  유지  ${path} (이미 있음)`); return false; }
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  log(`  작성  ${path}`);
  return true;
}

// ── 관리 파일: init·update 가 매번 새로 쓴다 ─────────────────────────────
function agentsBlock(cfg) {
  const core = readFileSync(join(PKG_DIR, "dist/core.md"), "utf8")
    .replace(/^(#+) /gm, "##$1 ")   // 제목을 두 단계 내린다 (AGENTS.md 안의 한 구역이므로)
    .replace(/`categories\//g, `\`${SKILL_DIR}/references/`)
    .replace(/`components\//g, `\`${SKILL_DIR}/references/components/`)
    .replace(/`tokens\.css`/g, `\`${cfg.cssDir}/tokens.css\``)
    .replace(/`base\.css`/g, `\`${cfg.cssDir}/base.css\``);
  return `${BLOCK_START} v${VERSION} — 이 구역은 \`npx ux-baseline update\` 가 다시 쓴다. 손으로 고치지 않는다. -->
## UI/UX 기준 (ux-baseline v${VERSION})

HTML·CSS·컴포넌트를 만들거나 고칠 때 이 구역을 따른다.

### 검사 → 고침 루프 (필수)
1. UI를 바꾼 뒤 \`npx ux-baseline check\` 를 실행한다. stylelint·html-validate·axe-core(실제 브라우저)·320px 리플로·키보드 초점·대화상자/탭/펼침 동작을 한 번에 검사한다.
2. 오류가 있으면 보고서에 적힌 룰 문장과 상세 파일을 읽고 고친 뒤 다시 실행한다. 오류가 0이 될 때까지 반복한다.
   경고는 SHOULD·MAY 위반이다 — 룰의 예외에 해당하지 않으면 고치고, 남기면 이유를 보고한다.
3. 작업 보고에는 마지막 check 결과(오류·경고 수)를 그대로 적는다. "지켰다"는 자기 보고는 검증이 아니다.
4. 브라우저 검사를 못 돌렸으면 그렇다고 보고한다. Chromium 설치: \`npx playwright-core install chromium\`.
5. \`check\` 는 페이지를 처음 연 상태를 검사한다. 스크립트로 바뀌는 상태(입력 오류, 로딩·생성 중, 결과, 오류·빈 결과, 열린 패널 등)는
   \`${CONFIG_FILE}\` 의 \`states\` 에 재현 단계를 적어 함께 검사한다. 예:
   \`{"page": "index.html", "name": "입력 오류", "steps": [{"click": "#submit"}, {"waitFor": "#error-summary"}]}\`
   \`page\` 에 쿼리를 붙일 수 있다(\`index.html?demo=empty\`) — 시간·데이터에 따라 달라지는 상태는 쿼리로 재현할 수 있게 만든다.
   단계: \`click\`·\`fill: [선택자, 값]\`·\`check\`·\`select: [선택자, 값]\`·\`press\`·\`waitFor\`·\`wait: ms\`. 화면에 상태를 더하면 states 에도 더한다.
6. 검사 결과가 틀렸다고 판단되면(오탐) 검사 규칙을 끄거나 \`stylelint-disable\` 로 덮지 말고 사람에게 알린다.

### 파일
- 페이지는 \`${cfg.cssDir}/tokens.css\` → \`${cfg.cssDir}/base.css\` → 프로젝트 CSS 순서로 불러온다. 번들러를 쓰면 \`@import "ux-baseline/tokens.css";\` 로 가져와도 된다.
- 카테고리별 상세 룰과 컴포넌트 규격(표준 마크업·CSS): \`${SKILL_DIR}/\` — \`SKILL.md\` 부터 읽는다.

${core.trim()}
${BLOCK_END}
`;
}

function installManaged(cfg) {
  // 토큰·기본 스타일
  const cssDir = join(CWD, cfg.cssDir);
  mkdirSync(cssDir, { recursive: true });
  for (const [src, name] of [["tokens/build/tokens.css", "tokens.css"], ["tokens/base.css", "base.css"]]) {
    const header = `/* ux-baseline v${VERSION} — npx ux-baseline update 가 다시 쓴다. 손으로 고치지 않는다. */\n`;
    writeFileSync(join(cssDir, name), header + readFileSync(join(PKG_DIR, src), "utf8"));
    log(`  갱신  ${cfg.cssDir}/${name}`);
  }
  // Claude 스킬 (통째로 교체)
  const skill = join(CWD, SKILL_DIR);
  rmSync(skill, { recursive: true, force: true });
  mkdirSync(dirname(skill), { recursive: true });
  cpSync(join(PKG_DIR, "dist/skill/ux-baseline"), skill, { recursive: true });
  log(`  갱신  ${SKILL_DIR}/`);
  // AGENTS.md 관리 구역
  const agentsPath = join(CWD, cfg.agentsFile || "AGENTS.md");
  const block = agentsBlock(cfg);
  let text = existsSync(agentsPath) ? readFileSync(agentsPath, "utf8") : "";
  const s = text.indexOf(BLOCK_START), e = text.indexOf(BLOCK_END);
  if (s >= 0 && e > s) text = text.slice(0, s) + block.trimEnd() + text.slice(e + BLOCK_END.length);
  else text = (text.trimEnd() ? text.trimEnd() + "\n\n" : "") + block;
  writeFileSync(agentsPath, text.endsWith("\n") ? text : text + "\n");
  log(`  갱신  ${rel(agentsPath)} (ux-baseline 구역)`);
}

// ── init ────────────────────────────────────────────────────────────────
function init(args) {
  const force = args.includes("--force");
  const cssDirArg = argValue(args, "--css-dir");
  log(`ux-baseline v${VERSION} 설치 → ${CWD}`);
  const existing = readConfig({ required: false });
  const cfg = existing || { ...DEFAULT_CONFIG, ...(cssDirArg ? { cssDir: cssDirArg } : {}) };
  if (cssDirArg && existing) cfg.cssDir = cssDirArg;
  if (cssDirArg) cfg.ignore = [...new Set([...cfg.ignore.filter((g) => g !== "vendor/ux-baseline/**"), `${cssDirArg}/**`])];
  cfg.version = VERSION;
  writeFileSync(join(CWD, CONFIG_FILE), JSON.stringify(cfg, null, 2) + "\n");
  log(`  작성  ${CONFIG_FILE}`);

  writeIfAbsent("stylelint.config.mjs", `// ux-baseline 검사 설정. 프로젝트 규칙은 rules 에 더한다. 외부 키트 CSS 는 ignoreFiles 로 뺀다(CF-049).
export default {
  extends: ["ux-baseline/stylelint"],
  ignoreFiles: ${JSON.stringify(cfg.ignore)},
};
`, { force });
  writeIfAbsent(".htmlvalidate.json", JSON.stringify({
    root: true,
    plugins: ["ux-baseline/html-validate"],
    extends: ["ux-baseline:recommended"],
  }, null, 2) + "\n", { force });

  installManaged(cfg);

  // CLAUDE.md 는 AGENTS.md 를 불러오게 한다 (Claude Code 의 @ 가져오기)
  if (!args.includes("--no-claude-md") && !cfg.agentsFile) {
    const p = join(CWD, "CLAUDE.md");
    const t = existsSync(p) ? readFileSync(p, "utf8") : null;
    if (t === null) { writeFileSync(p, "@AGENTS.md\n"); log("  작성  CLAUDE.md (@AGENTS.md)"); }
    else if (!t.includes("@AGENTS.md") && !t.includes(BLOCK_START)) { writeFileSync(p, t.trimEnd() + "\n\n@AGENTS.md\n"); log("  추가  CLAUDE.md 에 @AGENTS.md"); }
    else log("  유지  CLAUDE.md");
  }

  // package.json 스크립트
  const pj = join(CWD, "package.json");
  if (existsSync(pj)) {
    const j = JSON.parse(readFileSync(pj, "utf8"));
    j.scripts ||= {};
    if (!j.scripts["ux:check"]) { j.scripts["ux:check"] = "ux-baseline check"; writeFileSync(pj, JSON.stringify(j, null, 2) + "\n"); log("  추가  package.json scripts.ux:check"); }
  }
  log(`
다음:
  1. 페이지에서 ${cfg.cssDir}/tokens.css → ${cfg.cssDir}/base.css → 프로젝트 CSS 순서로 불러온다.
  2. Chromium 이 없으면: npx playwright-core install chromium
  3. npx ux-baseline check`);
}

// ── update ──────────────────────────────────────────────────────────────
function update() {
  const cfg = readConfig();
  const from = cfg.version;
  log(`ux-baseline ${from ? `v${from} → ` : ""}v${VERSION}`);
  cfg.version = VERSION;
  writeFileSync(join(CWD, CONFIG_FILE), JSON.stringify(cfg, null, 2) + "\n");
  installManaged(cfg);
  log(`\n변경 기록: ${rel(join(PKG_DIR, "CHANGELOG.md"))}\n설정 파일(stylelint.config.mjs, .htmlvalidate.json)은 건드리지 않았다. 바뀐 룰로 다시 검사: npx ux-baseline check`);
}

// ── check ───────────────────────────────────────────────────────────────
function argValue(args, name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
}
function argValues(args, name) {
  const out = [];
  args.forEach((a, i) => { if (a === name && args[i + 1]) out.push(args[i + 1]); });
  return out;
}

function collect(patterns, ignore) {
  const files = new Set();
  for (const p of patterns) {
    const abs = isAbsolute(p) ? p : join(CWD, p);
    if (existsSync(abs) && statSync(abs).isFile()) { files.add(abs); continue; }
    for (const f of globSync(p, { cwd: CWD, exclude: (n) => ignore.some((g) => matchesGlob(n, g)) })) files.add(join(CWD, f));
  }
  return [...files].filter((f) => !ignore.some((g) => matchesGlob(relative(CWD, f), g))).sort();
}
// 간단한 glob 일치 (** · * · ?) — 무시 목록용
function matchesGlob(path, glob) {
  const re = new RegExp("^" + glob.split("/").map((seg) => seg === "**" ? "(?:.*)" :
    seg.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]")).join("/").replace(/\(\?:\.\*\)\//g, "(?:.*/)?") + "$");
  return re.test(path.split("\\").join("/"));
}

async function launchBrowser() {
  const { chromium } = await import("playwright-core");
  const candidates = [process.env.CHROMIUM_PATH, existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : null].filter(Boolean);
  for (const executablePath of candidates) {
    try { return await chromium.launch({ executablePath }); } catch { /* 다음 후보 */ }
  }
  return chromium.launch();
}

async function check(args) {
  const cfg = readConfig();
  const noBrowser = args.includes("--no-browser");
  const positional = args.filter((a, i) => !a.startsWith("--") && !["--url", "--json", "--report"].includes(args[i - 1]));
  const urls = [...cfg.urls, ...argValues(args, "--url")];
  const ignore = cfg.ignore || [];
  let html, css;
  if (positional.length) {
    const targets = positional.flatMap((p) => {
      const abs = resolve(CWD, p);
      return existsSync(abs) && statSync(abs).isDirectory() ? [`${relative(CWD, abs) || "."}/**/*.html`, `${relative(CWD, abs) || "."}/**/*.css`].map((g) => g.replace(/^\.\//, "")) : [p];
    });
    html = collect(targets.filter((t) => t.endsWith(".html") || t.endsWith(".htm")), ignore);
    css = collect(targets.filter((t) => t.endsWith(".css")), ignore);
  } else {
    html = collect(cfg.html, ignore);
    css = collect(cfg.css, ignore);
  }
  if (!html.length && !css.length && !urls.length) fail("검사할 파일이 없다. ux-baseline.config.json 의 html·css·urls 를 확인한다.");

  const req = createRequire(join(PKG_DIR, "package.json"));
  const stylelint = (await import("stylelint")).default;
  const { HtmlValidate, FileSystemConfigLoader } = await import("html-validate");
  const YAML = (await import("yaml")).default;
  const deps = { stylelint, HtmlValidate, FileSystemConfigLoader, axeSource: readFileSync(req.resolve("axe-core/axe.min.js"), "utf8") };
  const { runChecks, formatReport } = await import("./lib/check.mjs");
  const ruleMap = YAML.parse(readFileSync(join(PKG_DIR, "lint/rule-map.yaml"), "utf8"));
  const axeConfig = JSON.parse(readFileSync(cfg.axeConfig ? join(CWD, cfg.axeConfig) : join(PKG_DIR, "lint/axe.config.json"), "utf8"));
  const rules = JSON.parse(readFileSync(join(PKG_DIR, "dist/rules.json"), "utf8"));

  const notes = [];
  let browser = null, browserMissing = false;
  if (!noBrowser) {
    try { browser = await launchBrowser(); }
    catch (e) {
      browserMissing = true;
      notes.push("**브라우저 검사를 하지 못했다** (Chromium 없음) — 색 대비·320px·초점·동작 검사가 빠졌다. `npx playwright-core install chromium` 후 다시 실행한다.");
    }
  } else notes.push("--no-browser: 브라우저 검사(색 대비·320px·초점·동작)를 하지 않았다. 결과를 보고할 때 이 사실을 함께 적는다.");
  if (cfg.version && cfg.version !== VERSION) notes.push(`설치된 패키지는 v${VERSION}, 프로젝트 지침은 v${cfg.version} — \`npx ux-baseline update\` 를 실행한다.`);

  let result;
  try {
    // 상태(states)는 전체 검사일 때만 — 파일·디렉터리를 골라 검사할 때는 뺀다
    const states = positional.length ? [] : (cfg.states || []);
    result = await runChecks({ deps, ruleMap, axeConfig, browser, css, html, urls, states, progressSelector: cfg.progressSelector, resolvePage: (pg) => join(CWD, pg), stylelintOptions: { cwd: CWD }, label: rel });
  } catch (e) {
    if (browser) await browser.close();
    if (/No configuration provided/i.test(e.message)) fail("stylelint 설정이 없다. npx ux-baseline init 을 실행하거나 stylelint.config.mjs 에 extends: [\"ux-baseline/stylelint\"] 를 넣는다.");
    throw e;
  }
  if (browser) await browser.close();
  const report = formatReport(result, { rules, refDir: `${SKILL_DIR}/references`, version: VERSION, notes });
  process.stdout.write(report);
  const reportPath = argValue(args, "--report");
  if (reportPath) writeFileSync(join(CWD, reportPath), report);
  const jsonPath = argValue(args, "--json");
  if (jsonPath) writeFileSync(join(CWD, jsonPath), JSON.stringify({ version: VERSION, ...result, notes }, null, 2) + "\n");
  process.exitCode = result.summary.errors > 0 || browserMissing ? 1 : 0;
}

// ── main ────────────────────────────────────────────────────────────────
const [cmd, ...rest] = process.argv.slice(2);
const HELP = `ux-baseline v${VERSION}

  npx ux-baseline init [--css-dir <dir>] [--force] [--no-claude-md]
      설정(ux-baseline.config.json, stylelint.config.mjs, .htmlvalidate.json), 토큰·기본 스타일,
      AGENTS.md 의 ux-baseline 구역, Claude 스킬(.claude/skills/ux-baseline)을 설치한다.
      이미 있는 stylelint.config.mjs·.htmlvalidate.json 은 --force 가 없으면 두고 간다.

  npx ux-baseline check [파일·디렉터리...] [--url <주소>]... [--no-browser] [--report <md>] [--json <json>]
      stylelint·html-validate·axe-core(Chromium)·320px 리플로·초점 표시·대화상자/탭/펼침 동작을 검사하고
      위반을 룰 ID·룰 문장과 함께 보고한다. 오류가 있거나 브라우저 검사를 못 하면 종료 코드 1.

  npx ux-baseline update
      패키지를 올린 뒤 실행한다. 토큰·기본 스타일·AGENTS.md 구역·스킬을 새 버전으로 바꾼다.
`;
if (cmd === "init") init(rest);
else if (cmd === "update") update();
else if (cmd === "check") await check(rest);
else if (cmd === "--version" || cmd === "-v") log(VERSION);
else { log(HELP); if (cmd && cmd !== "help" && cmd !== "--help" && cmd !== "-h") process.exitCode = 2; }
