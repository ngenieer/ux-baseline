// 꾸러미 도입 시험: npm pack → 빈 프로젝트에 설치 → init → check → update
//   node kit/test/e2e.mjs        (저장소 루트에서. Chromium 필요: CHROMIUM_PATH 또는 npx playwright-core install chromium)
// 확인하는 것
//   - init 이 설정·토큰·AGENTS.md 구역·스킬·CLAUDE.md·package.json 스크립트를 만든다
//   - 프로젝트 설정(extends 프리셋)으로 검사가 실제로 돈다: 좋은 화면 오류 0·종료 0, 나쁜 화면은 기대한 룰이 걸리고 종료 1
//   - init 두 번·update 가 AGENTS.md 구역을 늘리지 않고, 사용자가 쓴 내용은 남긴다
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, existsSync, cpSync, rmSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const work = mkdtempSync(join(process.env.E2E_TMP || tmpdir(), "uxb-e2e-"));
let failed = 0;
const ok = (cond, msg) => { console.log(`${cond ? "✓" : "✗"} ${msg}`); if (!cond) failed++; };
const sh = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });
const run = (args, cwd) => spawnSync("npx", ["--no-install", "ux-baseline", ...args], { cwd, encoding: "utf8" });

try {
  const tgz = sh("npm", ["pack", "--silent", "--pack-destination", work], REPO).trim().split("\n").pop();
  const proj = join(work, "proj");
  cpSync(join(REPO, "kit/test/fixtures"), join(proj, "pages"), { recursive: true });
  writeFileSync(join(proj, "package.json"), JSON.stringify({ name: "uxb-e2e", private: true }, null, 2));
  writeFileSync(join(proj, "AGENTS.md"), "# 프로젝트 지침\n\n사용자가 쓴 내용.\n");
  sh("npm", ["i", "-D", "--no-audit", "--no-fund", join(work, tgz)], proj);

  // init
  const i1 = run(["init"], proj);
  ok(i1.status === 0, "init 성공");
  for (const f of ["ux-baseline.config.json", "stylelint.config.mjs", ".htmlvalidate.json", "vendor/ux-baseline/tokens.css",
    "vendor/ux-baseline/base.css", ".claude/skills/ux-baseline/SKILL.md", ".claude/skills/ux-baseline/references/core.md", "CLAUDE.md"]) {
    ok(existsSync(join(proj, f)), `init 이 ${f} 를 만든다`);
  }
  const agents = () => readFileSync(join(proj, "AGENTS.md"), "utf8");
  ok(agents().includes("사용자가 쓴 내용.") && agents().includes("npx ux-baseline check"), "AGENTS.md 에 사용자 내용과 ux-baseline 구역이 함께 있다");
  ok(JSON.parse(readFileSync(join(proj, "package.json"), "utf8")).scripts["ux:check"] === "ux-baseline check", "package.json 에 ux:check 스크립트");
  ok(!/`categories\/|`components\//.test(agents()), "AGENTS.md 구역의 상세 파일 경로가 설치된 스킬을 가리킨다");

  // 페이지를 프로젝트의 vendor 경로에 맞춘다 (fixtures 는 ../vendor 기준 → pages/<x>/ 에서는 ../../vendor)
  for (const d of ["good", "bad", "state"]) {
    const p = join(proj, "pages", d, "index.html");
    writeFileSync(p, readFileSync(p, "utf8").replaceAll('href="../vendor/', 'href="../../vendor/'));
  }

  // check — 좋은 화면
  const g = run(["check", "pages/good", "--json", "good.json"], proj);
  const gj = JSON.parse(readFileSync(join(proj, "good.json"), "utf8"));
  ok(g.status === 0 && gj.summary.errors === 0, `좋은 화면: 종료 0, 오류 0 (종료 ${g.status}, 오류 ${gj.summary.errors})`);
  ok(gj.summary.browser.ran && gj.summary.browser.pages === 1, "좋은 화면: 브라우저 검사를 실제로 했다");
  if (g.status !== 0) console.log(g.stdout);

  // check — 나쁜 화면
  const b = run(["check", "pages/bad", "--json", "bad.json", "--report", "bad.md"], proj);
  const bj = JSON.parse(readFileSync(join(proj, "bad.json"), "utf8"));
  const hit = new Set(bj.findings.flatMap((f) => f.rules));
  ok(b.status === 1 && bj.summary.errors > 0, `나쁜 화면: 종료 1, 오류 있음 (종료 ${b.status}, 오류 ${bj.summary.errors})`);
  for (const id of ["A11Y-016", "COLOR-022", "COPY-056", "FORM-077"]) ok(hit.has(id), `나쁜 화면: ${id} 위반을 찾는다`);
  ok(existsSync(join(proj, "bad.md")) && readFileSync(join(proj, "bad.md"), "utf8").includes("references/A11Y.md"), "보고서가 룰 상세 파일 위치를 알려 준다");

  // 상태(states): 처음 상태는 통과, 버튼을 누른 뒤 상태의 낮은 대비를 잡는다
  const s0 = run(["check", "pages/state"], proj);
  ok(s0.status === 0, `상태 페이지 처음 상태: 종료 0 (종료 ${s0.status})`);
  const cfgPath = join(proj, "ux-baseline.config.json");
  const cfg0 = readFileSync(cfgPath, "utf8");
  const cfg = JSON.parse(cfg0);
  cfg.html = ["pages/state/**/*.html"]; cfg.css = ["pages/state/**/*.css"];
  cfg.states = [{ page: "pages/state/index.html", name: "결과 표시", steps: [{ click: "#show" }, { waitFor: "#result" }] },
    { page: "pages/state/index.html", name: "없는 요소", steps: [{ click: "#nope" }] },
    { page: "pages/state/index.html?show=1", name: "쿼리", steps: [{ waitFor: "#result" }] }];
  writeFileSync(cfgPath, JSON.stringify(cfg));
  const s1 = run(["check", "--json", "state.json"], proj);
  const sj = JSON.parse(readFileSync(join(proj, "state.json"), "utf8"));
  ok(s1.status === 1 && sj.findings.some((f) => f.rule === "color-contrast" && f.where.includes("[상태: 결과 표시]")), "states: 버튼을 누른 뒤 상태의 색 대비 위반을 찾는다");
  ok(sj.findings.some((f) => f.rule === "state-step" && f.where.includes("[상태: 없는 요소]")), "states: 실행할 수 없는 단계를 오류로 알린다");
  ok(sj.summary.browser.states === 2, "states: 단계가 성공한 상태만 검사 수에 센다");
  ok(sj.findings.some((f) => f.rule === "color-contrast" && f.where.includes("[상태: 쿼리]")), "states: page 의 쿼리로 상태를 재현한다");
  writeFileSync(cfgPath, cfg0);

  // 설정 없이(--no-browser) 전체 검사 — vendor·.claude·node_modules 는 빠진다
  const all = run(["check", "--no-browser", "--json", "all.json"], proj);
  const aj = JSON.parse(readFileSync(join(proj, "all.json"), "utf8"));
  ok(!aj.findings.some((f) => /vendor\/|\.claude\/|node_modules\//.test(f.where)), "전체 검사가 관리 파일·의존성을 검사하지 않는다");
  ok(aj.notes.some((n) => n.includes("--no-browser")), "--no-browser 면 보고서에 그 사실을 적는다");

  // init 두 번, update — 구역이 하나로 유지된다
  run(["init"], proj);
  const u = run(["update"], proj);
  ok(u.status === 0, "update 성공");
  ok(agents().split("<!-- ux-baseline:start").length === 2, "AGENTS.md 의 ux-baseline 구역은 하나다");
  ok(agents().includes("사용자가 쓴 내용."), "update 뒤에도 사용자 내용이 남는다");
} finally {
  if (!process.env.E2E_KEEP) rmSync(work, { recursive: true, force: true });
  else console.log(`작업 디렉터리: ${work}`);
}
console.log(failed ? `\n실패 ${failed}건` : "\n꾸러미 도입 시험 통과");
process.exit(failed ? 1 : 0);
