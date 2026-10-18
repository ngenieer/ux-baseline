// 컴포넌트 규격을 실제 Chromium 에서 검사한다 (jsdom 으로 못 보는 것: 색 대비, 320px 리플로, 초점 표시).
//   node check-components.mjs [id,...]
import { readFileSync, readdirSync, mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { gradeDir, launch } from "./grade.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const req = createRequire(join(REPO, "lint", "package.json"));
const YAML = (await import(pathToFileURL(req.resolve("yaml")).href)).default;
const only = process.argv[2] ? new Set(process.argv[2].split(",")) : null;
const work = join(tmpdir(), "uxb-components");
const browser = await launch();
let failed = 0;
for (const f of readdirSync(join(REPO, "components")).filter((x) => x.endsWith(".yaml")).sort()) {
  const c = YAML.parse(readFileSync(join(REPO, "components", f), "utf8"));
  if (only && !only.has(c.id)) continue;
  const d = join(work, c.id);
  mkdirSync(d, { recursive: true });
  copyFileSync(join(REPO, "tokens", "build", "tokens.css"), join(d, "tokens.css"));
  copyFileSync(join(REPO, "tokens", "base.css"), join(d, "base.css"));
  writeFileSync(join(d, "style.css"), c.css + "\n");
  writeFileSync(join(d, "index.html"), `<!DOCTYPE html>\n<html lang="ko">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${/aria-invalid="true"|error-summary/.test(c.markup) ? "오류: " : ""}${c.title}</title>\n<link rel="stylesheet" href="tokens.css">\n<link rel="stylesheet" href="base.css">\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<main>\n<h1>${c.title}</h1>\n${c.markup}\n</main>\n</body>\n</html>\n`);
  const { summary, findings } = await gradeDir(browser, d, { quiet: true });
  if (summary.errors) {
    failed++;
    console.log(`✗ ${c.id}: 오류 ${summary.errors}`);
    for (const x of findings.filter((y) => y.severity === "error")) console.log(`    ${x.tool}/${x.rule} ${x.message.slice(0, 120)} @ ${String(x.where).slice(0, 90)}`);
  } else console.log(`✓ ${c.id}${summary.warnings ? ` (경고 ${summary.warnings})` : ""}`);
}
await browser.close();
console.log(failed ? `실제 브라우저 검사 실패 ${failed}개` : "실제 브라우저 검사 통과");
process.exit(failed ? 1 : 0);
