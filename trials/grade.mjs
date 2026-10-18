// 시험 결과물(index.html + *.css)을 ux-baseline 검사기로 채점한다.
//   node grade.mjs <결과물 디렉터리> [--json out.json]
// 검사
//   1. stylelint (lint/stylelint.config.mjs) — 작성한 CSS 만. tokens.css 는 제외
//   2. html-validate (lint/.htmlvalidate.json)
//   3. axe-core — 실제 Chromium 에서 렌더링한 페이지 (lint/axe.config.json). color-contrast 포함
//   4. 키보드 — Tab 으로 초점 가능한 요소를 돌며 초점 표시(outline·box-shadow·border 변화)가 있는지
// 위반은 lint/rule-map.yaml 로 ux-baseline 룰 ID 에 대응시킨다.
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const HERE = dirname(fileURLToPath(import.meta.url));
const LINT = join(HERE, "..", "lint");
const req = createRequire(join(LINT, "package.json"));
const stylelint = (await import(pathToFileURL(req.resolve("stylelint")).href)).default;
const { HtmlValidate, FileSystemConfigLoader } = await import(pathToFileURL(req.resolve("html-validate")).href);
const YAML = (await import(pathToFileURL(req.resolve("yaml")).href)).default;
const axeSource = readFileSync(req.resolve("axe-core/axe.min.js"), "utf8");
const { chromium } = await import("playwright-core");


const { runChecks, formatReport } = await import("../kit/lib/check.mjs");
const ruleMap = YAML.parse(readFileSync(join(LINT, "rule-map.yaml"), "utf8"));
const axeConfig = JSON.parse(readFileSync(join(LINT, "axe.config.json"), "utf8"));
const rulesInfo = JSON.parse(readFileSync(join(HERE, "..", "dist", "rules.json"), "utf8"));
const deps = { stylelint, HtmlValidate, FileSystemConfigLoader, axeSource };

// 검사 엔진은 kit/lib/check.mjs (프로젝트용 `ux-baseline check` 와 같은 엔진). 여기서는 lint/ 설정을 쓴다.
export async function gradeDir(browser, dir, { jsonOut = null, quiet = false } = {}) {
  // 보관된 결과물은 tokens.css·base.css 를 빼고 저장한다 — 없으면 var() 가 풀리지 않아 색 대비·초점 표시가 틀리게 나온다
  const page0 = readFileSync(join(dir, "index.html"), "utf8");
  for (const f of ["tokens.css", "base.css"]) {
    if (page0.includes(`href="${f}"`) && !existsSync(join(dir, f))) console.error(`주의: ${dir}/${f} 가 없다 — 채점 전에 tokens/ 에서 복사할 것`);
  }
  const css = readdirSync(dir).filter((f) => f.endsWith(".css") && f !== "tokens.css" && f !== "base.css").map((f) => join(dir, f));
  const result = await runChecks({
    deps, ruleMap, axeConfig, browser, css, html: [join(dir, "index.html")],
    stylelintOptions: { configFile: join(LINT, "stylelint.config.mjs"), configBasedir: LINT },
    // lint/.htmlvalidate.json(자체 플러그인 포함)을 쓰도록 lint 디렉터리 안의 가상 파일 이름으로 검사한다
    htmlValidateName: () => join(LINT, "fixtures", "index.html"),
    label: (f) => f.slice(dir.length + 1),
  });
  const { findings } = result;
  const byTool = {};
  for (const f of findings) byTool[`${f.tool} ${f.severity}`] = (byTool[`${f.tool} ${f.severity}`] || 0) + 1;
  const summary = { dir, errors: result.summary.errors, warnings: result.summary.warnings, byTool,
    rulesHit: [...new Set(findings.flatMap((f) => f.rules))].sort(), focusables: result.summary.browser.focusables };
  if (!quiet) console.log(formatReport(result, { rules: rulesInfo }));
  if (jsonOut) writeFileSync(jsonOut, JSON.stringify({ summary, findings }, null, 2));
  return { summary, findings };
}

export async function launch() {
  // CHROMIUM_PATH 가 있거나 이 저장소 작업 환경의 사전 설치 경로가 있으면 그것을, 없으면 playwright 가 설치한 Chromium 을 쓴다
  const path = process.env.CHROMIUM_PATH || (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
  return chromium.launch(path ? { executablePath: path } : {});
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dir = resolve(process.argv[2]);
  const jsonOut = process.argv.includes("--json") ? process.argv[process.argv.indexOf("--json") + 1] : null;
  const browser = await launch();
  await gradeDir(browser, dir, { jsonOut });
  await browser.close();
}
