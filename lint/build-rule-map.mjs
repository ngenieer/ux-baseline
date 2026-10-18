// 확정 룰의 automation.checks 와 실제 검사기 설정을 대조해 lint/rule-map.yaml 을 만든다.
//   node build-rule-map.mjs          생성
//   node build-rule-map.mjs --check  커밋된 파일과 같은지 검사 (CI)
// configured: true  = 그 검사 규칙이 이 디렉터리의 설정(또는 ux-baseline check 의 브라우저 검사)으로 실제 실행된다(설정을 읽어 확인).
// configured: false = 자체 검사(custom)·수동·E2E 등 아직 설정이 없는 검사.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { JSDOM, VirtualConsole } from "jsdom";
import { HtmlValidate, FileSystemConfigLoader } from "html-validate";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const OUT = join(HERE, "rule-map.yaml");
const TOOLS = ["stylelint", "html-validate", "axe-core", "ux-baseline-check"];

// ---- 룰 ----
function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith(".yaml")) yield p;
  }
}
const rules = [...walk(join(REPO, "rules"))]
  .map((p) => YAML.parse(readFileSync(p, "utf8")))
  .filter((r) => r.status?.value === "confirmed")
  .sort((a, b) => a.id.localeCompare(b.id));

// ---- 검사기 설정에서 실제로 켜진 규칙 ----
const stylelintCfg = (await import(join(HERE, "stylelint.config.mjs"))).default;
const stylelintOn = new Set(Object.entries(stylelintCfg.rules).filter(([, v]) => v !== null && v !== false).map(([k]) => k));

const hv = new HtmlValidate(new FileSystemConfigLoader());
const hvCfg = await hv.getConfigFor(join(HERE, "fixtures/good.html"));
const htmlOn = new Set([...hvCfg.getRules()].filter(([, [sev]]) => sev > 0).map(([k]) => k));

const dom = new JSDOM('<!DOCTYPE html><html lang="ko"><head><title>t</title></head><body><main><p>t</p></main></body></html>', { pretendToBeVisual: true, virtualConsole: new VirtualConsole() });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const axe = (await import("axe-core")).default;
const axeOn = new Set();
for (const file of ["axe.config.json", "axe.high-contrast.config.json"]) {
  const cfg = JSON.parse(readFileSync(join(HERE, file), "utf8"));
  const res = await axe.run(dom.window.document, { runOnly: cfg.runOnly, rules: cfg.rules, preload: false });
  for (const k of ["passes", "violations", "incomplete", "inapplicable"]) for (const x of res[k]) axeOn.add(x.id);
}

// ux-baseline check 의 브라우저 동작 검사 (kit/lib/check.mjs)
const { BEHAVIOR_CHECKS } = await import(join(REPO, "kit/lib/check.mjs"));
const enabled = { stylelint: stylelintOn, "html-validate": htmlOn, "axe-core": axeOn, "ux-baseline-check": new Set(BEHAVIOR_CHECKS) };

// ---- 대응표 ----
const map = {};
const used = Object.fromEntries(TOOLS.map((t) => [t, new Set()]));
let total = 0, done = 0;
for (const r of rules) {
  const checks = (r.automation?.checks || []).map((c) => {
    const known = TOOLS.includes(c.tool) && c.rule && !String(c.rule).startsWith("custom");
    const configured = Boolean(known && enabled[c.tool].has(c.rule));
    if (configured) used[c.tool].add(c.rule);
    total++; if (configured) done++;
    return { tool: c.tool, rule: c.rule ?? null, configured };
  });
  map[r.id] = { strength: r.strength, feasibility: r.automation?.feasibility ?? "none", checks };
}
const unreferenced = Object.fromEntries(TOOLS.map((t) => [t, [...enabled[t]].filter((x) => !used[t].has(x)).sort()]));
unreferenced["axe-core"] = unreferenced["axe-core"].length; // axe 는 태그로 켜진 규칙이 많아 개수만 적는다
unreferenced["html-validate"] = unreferenced["html-validate"].length;

const doc = {
  description: "자동 생성(lint/build-rule-map.mjs). 확정 룰 → 검사 규칙과 설정 반영 여부. 손으로 고치지 않는다.",
  summary: { confirmed_rules: rules.length, checks: total, configured: done },
  unreferenced_config: unreferenced,
  rules: map,
};
const out = "# " + doc.description + "\n" + YAML.stringify({ ...doc, description: undefined }, { lineWidth: 0 });

if (process.argv.includes("--check")) {
  if (!existsSync(OUT) || readFileSync(OUT, "utf8") !== out) {
    console.error("lint/rule-map.yaml 이 최신이 아니다. lint 에서 npm run rulemap 실행 후 커밋할 것");
    process.exit(1);
  }
  console.log("rule-map 최신");
} else {
  writeFileSync(OUT, out);
  console.log(`rule-map: 확정 룰 ${rules.length}개, 검사 ${total}개 중 설정 반영 ${done}개`);
}
