// 컴포넌트 규격(components/*.yaml)의 표준 마크업·CSS 를 실제 검사기로 검사한다.
// AI·사람이 "규격대로 만들었다"고 적는 것이 아니라 검사기 결과로 확인한다.
//   - css: stylelint 위반 0 (경고 포함)
//   - markup: html-validate 위반 0, axe-core(jsdom) 위반 0
import stylelint from "stylelint";
import { HtmlValidate, FileSystemConfigLoader } from "html-validate";
import { JSDOM, VirtualConsole } from "jsdom";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = join(HERE, "..", "components");
let failed = 0;
const fail = (m) => { console.error("실패:", m); failed++; };

// COMPONENTS=a,b 로 일부만 검사할 수 있다(작업 중 확인용). CI 는 전체를 검사한다.
const only = process.env.COMPONENTS ? new Set(process.env.COMPONENTS.split(",")) : null;
const files = (existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".yaml")).sort() : [])
  .filter((f) => !only || only.has(f.replace(/\.yaml$/, "")));
const hv = new HtmlValidate(new FileSystemConfigLoader());
const axeCfg = JSON.parse(readFileSync(join(HERE, "axe.config.json"), "utf8"));
delete axeCfg.$comment;

const sections = [];
for (const f of files) {
  const c = YAML.parse(readFileSync(join(DIR, f), "utf8"));
  const id = c.id;

  const sl = await stylelint.lint({ code: c.css, codeFilename: `${id}.css`, configFile: join(HERE, "stylelint.config.mjs") });
  for (const w of sl.results[0].warnings) fail(`${id} css ${w.line}:${w.column} ${w.rule} — ${w.text}`);

  const doc = `<!DOCTYPE html>\n<html lang="ko">\n<head>\n<meta charset="utf-8">\n<title>${/aria-invalid="true"|error-summary/.test(c.markup) ? "오류: " : ""}${c.title}</title>\n</head>\n<body>\n<main>\n<h1>${c.title}</h1>\n${c.markup}\n</main>\n</body>\n</html>\n`;
  const hr = await hv.validateString(doc, `${id}.html`);
  for (const r of hr.results) for (const m of r.messages) fail(`${id} markup ${m.line}:${m.column} ${m.ruleId} — ${m.message}`);

  sections.push({ id, title: c.title, markup: c.markup });
  console.log(`${id}: css·markup 검사 완료`);
}

// axe-core: 모든 규격을 한 문서에 넣고 컴포넌트별 영역(context)으로 나눠 돌린다(jsdom 창 하나에 axe 를 한 번만 올린다).
if (sections.length) {
  const body = sections.map((s) => `<section id="spec-${s.id}" aria-label="${s.title}">\n${s.markup}\n</section>`).join("\n");
  const page = `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><title>컴포넌트 규격</title></head><body><main><h1>컴포넌트 규격</h1>${body}</main></body></html>`;
  const dom = new JSDOM(page, { pretendToBeVisual: true, virtualConsole: new VirtualConsole() });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  const axe = (await import("axe-core")).default;
  for (const s of sections) {
    const ar = await axe.run({ include: [[`#spec-${s.id}`]] }, { runOnly: axeCfg.runOnly, rules: axeCfg.rules, preload: false });
    for (const v of ar.violations) fail(`${s.id} axe ${v.id} — ${v.help} (${v.nodes.length}곳)`);
  }
}

console.log(failed ? `컴포넌트 규격 실패 ${failed}건` : `컴포넌트 규격 ${files.length}개 통과`);
process.exit(failed ? 1 : 0);
