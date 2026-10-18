// html-validate 플러그인 + 프리셋. 프로젝트 .htmlvalidate.json:
//   { "plugins": ["@sizlon/ux-baseline/html-validate"], "extends": ["ux-baseline:recommended"] }
// 프리셋 내용은 lint/.htmlvalidate.json 과 같다(룰 저장소에서 검사하는 설정을 그대로 쓴다).
import { readFileSync } from "node:fs";
import base from "../lint/plugins/html-ux-baseline.mjs";

const cfg = JSON.parse(readFileSync(new URL("../lint/.htmlvalidate.json", import.meta.url), "utf8"));

export default {
  ...base,
  configs: {
    recommended: { extends: cfg.extends, rules: cfg.rules },
  },
};
