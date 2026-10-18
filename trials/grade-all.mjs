// 여러 결과물 디렉터리를 채점해 표로 요약한다.  node grade-all.mjs <dir1> <dir2> ... [--out summary.json]
import { writeFileSync } from "node:fs";
import { basename } from "node:path";
import { gradeDir, launch } from "./grade.mjs";
const args = process.argv.slice(2);
const out = args.includes("--out") ? args.splice(args.indexOf("--out"), 2)[1] : null;
const browser = await launch();
const rows = [];
for (const d of args) {
  const { summary, findings } = await gradeDir(browser, d, { quiet: true });
  const count = (t, s) => findings.filter((f) => f.tool === t && (!s || f.severity === s)).length;
  rows.push({ name: basename(d), errors: summary.errors, warnings: summary.warnings,
    stylelint: count("stylelint"), html: count("html-validate"), axe: count("axe-core"), browser: count("browser"),
    rules: summary.rulesHit, findings });
}
await browser.close();
console.log("| 결과물 | 오류 | 경고 | stylelint | html-validate | axe-core | 브라우저(리플로·초점) | 걸린 룰 |");
console.log("|---|---|---|---|---|---|---|---|");
for (const r of rows) console.log(`| ${r.name} | ${r.errors} | ${r.warnings} | ${r.stylelint} | ${r.html} | ${r.axe} | ${r.browser} | ${r.rules.join(", ")} |`);
if (out) writeFileSync(out, JSON.stringify(rows, null, 2));
