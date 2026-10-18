# 도입 안내 — `@sizlon/ux-baseline`

ux-baseline 의 확정 룰을 다른 웹프로젝트에 적용하는 방법. 사람과 AI 코딩 에이전트가 같은 검사 결과를 보고 고치는 것을 전제로 한다.

## 1. 설치

```sh
npm i -D github:ngenieer/ux-baseline#v0.2.1
npx playwright-core install chromium     # 브라우저 검사용. 이미 있는 Chromium 을 쓰려면 CHROMIUM_PATH 환경 변수
npx ux-baseline init
```

- CI 에서도 같은 명령으로 설치한다. 네트워크 제한으로 GitHub 에서 받지 못하면 릴리스의 `.tgz` 를 내려받아 `npm i -D ./sizlon-ux-baseline-<버전>.tgz` 로 설치한다.
- 버전은 태그로 고정한다(`#v0.2.1`). 올릴 때는 [CHANGELOG.md](../CHANGELOG.md) 를 먼저 본다.

## AI 에게 웹페이지를 만들게 하기

설치(1)를 한 번 해 두면, 그다음은 평소처럼 시키면 된다.

1. **지침은 자동으로 읽힌다.** `init` 이 만든 `AGENTS.md`(ux-baseline 구역)·`CLAUDE.md`(`@AGENTS.md`)·`.claude/skills/ux-baseline/` 를 코딩 AI(Claude Code, Codex, Cursor 등)가 작업 시작 때 읽는다. 지침에는 "UI 를 바꾸면 `npx ux-baseline check` 를 돌리고 오류 0 이 될 때까지 고친 뒤 결과를 보고한다"가 들어 있다.
2. **요청에 적으면 좋은 것**
   - 무슨 화면이고 누가 쓰는지. 공공 서비스면 그렇다고 적는다(KRDS 기반 룰이 적용된다).
   - 빈 결과·오류·로딩·확인 대화상자 같은 **상태**도 만들라고 적는다 — 위반이 가장 많이 나오는 곳이다. 상태는 `ux-baseline.config.json` 의 `states` 에 등록해 함께 검사하게 한다.
   - 마지막 `check` 결과 줄을 그대로 보여 달라고 적는다.

   예:
   > 구청 누리집 공지사항 목록 페이지를 만들어 줘. 검색·표·페이지 이동이 있고, 검색 결과 없음·오류 화면도 만들어 줘. 상태는 states 에 등록하고, 끝나면 `npx ux-baseline check` 마지막 결과 줄을 그대로 보여 줘.
3. **확인은 사람이 검사기로 한다.** AI 의 "지켰다"는 검증이 아니다. 직접 `npx ux-baseline check` 를 돌려 맨 위 줄(`오류 N / 경고 M`)을 본다. 오류가 있으면 보고서 전체를 AI 에게 붙여 넣고 고치게 한다 — 보고서에 어긴 룰 문장과 상세 파일 위치가 있어 바로 고칠 수 있다.
4. **한계**
   - 자동 검사가 모든 룰을 보지는 않는다. 문구가 알기 쉬운지, 감각 특성만으로 대상을 가리키지 않는지 같은 룰은 사람이 확인한다(시험 3 에서 검사 통과 뒤에도 이런 위반이 남았다 — trials/README.md).
   - 검사 명령을 돌릴 수 없는 채팅 화면에서 시키면 검사 → 고침 단계가 빠진다. 프로젝트 폴더에서 일하는 코딩 AI 를 쓴다.

## 2. `init` 이 만드는 것

| 파일 | 성격 | 내용 |
|---|---|---|
| `ux-baseline.config.json` | 프로젝트가 고친다 | 검사할 `html`·`css` glob, 제외할 `ignore`, 개발 서버 `urls`, 상태 재현 `states`, 토큰 위치 `cssDir`, 설치 버전 |
| `stylelint.config.mjs` | 프로젝트가 고친다 | `extends: ["@sizlon/ux-baseline/stylelint"]` + `ignoreFiles`. 이미 있으면 건드리지 않는다 |
| `.htmlvalidate.json` | 프로젝트가 고친다 | 플러그인 `@sizlon/ux-baseline/html-validate` + 프리셋 `ux-baseline:recommended`. 이미 있으면 건드리지 않는다 |
| `vendor/ux-baseline/tokens.css`, `base.css` | 관리 파일 | 디자인 토큰(CSS 변수)과 기본 스타일. `update` 가 다시 쓴다 |
| `AGENTS.md` 의 `ux-baseline` 구역 | 관리 구역 | 검사→고침 루프 지침 + MUST 룰 요약. 구역 밖의 내용은 건드리지 않는다 |
| `CLAUDE.md` | 한 줄 추가 | `@AGENTS.md` (Claude Code 가 AGENTS.md 를 읽게) — 없으면 만들고, 있으면 줄만 더한다 |
| `.claude/skills/ux-baseline/` | 관리 파일 | Claude 스킬: 카테고리별 상세 룰, 컴포넌트 규격 56개 |
| `package.json` | 스크립트 추가 | `"ux:check": "ux-baseline check"` |

관리 파일·구역은 손으로 고치지 않는다. 룰이 프로젝트에 맞지 않으면 룰 저장소(ngenieer/ux-baseline)에 고칠 내용을 올린다.

페이지는 `tokens.css` → `base.css` → 프로젝트 CSS 순서로 불러온다. 번들러를 쓰면 `@import "@sizlon/ux-baseline/tokens.css";` 처럼 패키지에서 바로 가져와도 된다(그때는 `cssDir` 사본을 쓰지 않아도 된다).

## 3. `check`

```sh
npx ux-baseline check                       # 설정의 html·css 전체
npx ux-baseline check src/pages/signup      # 디렉터리·파일만
npx ux-baseline check --url http://localhost:5173/   # 개발 서버 페이지 (렌더된 DOM 에 html-validate 도 돌린다)
npx ux-baseline check --report ux-report.md --json ux-report.json
```

| 검사 | 도구 | 대상 |
|---|---|---|
| 토큰 외 값, 초점 표시 제거, 단위·서체 규칙 | stylelint + 자체 규칙 | CSS 파일 |
| 대체 텍스트·레이블·랜드마크·체계 결정(날짜 표기, 필수 표시, 오류 요약, 대화상자 버튼 문구) | html-validate + 자체 규칙 | HTML 파일·렌더된 DOM |
| WCAG 2.2 A·AA (색 대비 포함) | axe-core | Chromium 에서 연 페이지 |
| 320px 가로 넘침, Tab 초점 표시, 대화상자 초점·Esc·초점 가둠, 탭 방향키, 펼침 Enter, 입력 중 이탈 확인(경고) | 자체 브라우저 검사 | Chromium 에서 연 페이지 |
| 감각 표현 문구 후보(COPY-001, 경고), 1초 안에 끝난 처리의 진행 표시 깜빡임(STATE-002, 경고) | 자체 검사 | HTML·스크립트가 만든 문구, `states` 실행 중 |

### 스크립트로 바뀌는 상태 검사 (`states`)
`check` 는 페이지를 처음 연 상태만 본다. 입력 오류·로딩·결과·오류 화면·열린 패널처럼 스크립트로 바뀌는 상태는 `ux-baseline.config.json` 의 `states` 에 재현 단계를 적으면 그 상태에서도 axe-core·320px·초점 검사를 한다(전체 검사일 때).

```json
"states": [
  { "page": "index.html", "name": "입력 오류", "steps": [{ "click": "#submit" }, { "waitFor": "#error-summary" }] },
  { "page": "index.html", "name": "서비스 오류", "steps": [{ "check": "#demo-error" }, { "click": "#submit" }, { "waitFor": "#error-box" }] }
]
```
`page` 에 쿼리·해시를 붙일 수 있다(`"index.html?demo=empty"`) — 시간·데이터에 따라 달라지는 상태는 페이지가 쿼리로 재현 모드를 받게 만들어 둔다.
단계: `click`(선택자) · `fill`([선택자, 값]) · `check`(선택자) · `select`([선택자, 값]) · `press`(키) · `waitFor`(선택자가 보일 때까지) · `wait`(ms). 실행할 수 없는 단계는 오류(`state-step`)로 보고한다.
상태를 재현하는 동안 진행 표시(`[role=progressbar]`·`progress`·`.spinner`, 다르면 설정 `progressSelector`)가 1초 미만으로 보였다 사라지면 STATE-002 경고를 낸다.
AGENTS.md 지침이 AI 에이전트에게 상태를 더할 때 states 도 더하라고 한다.

- 보고서는 위반을 룰 ID 로 묶고 룰 문장과 상세 파일 위치(`.claude/skills/ux-baseline/references/<CAT>.md`)를 붙인다. 오류 = MUST 근거, 경고 = SHOULD·MAY 근거.
- 종료 코드: 오류가 있거나 Chromium 이 없어 브라우저 검사를 못 하면 1. `--no-browser` 는 정적 검사만 하고, 보고서에 그 사실을 적는다.
- 자동 검사가 없는 룰(확정 룰의 일부)은 사람이 확인한다. 어떤 룰이 검사되는지는 패키지의 `lint/rule-map.yaml`(`configured: true`)에 있다.

### CI 예 (GitHub Actions)
```yaml
- run: npm ci
- run: npx playwright-core install --with-deps chromium
- run: npx ux-baseline check --report ux-report.md
```

## 4. `update`

```sh
npm i -D github:ngenieer/ux-baseline#v<새 버전>
npx ux-baseline update
npx ux-baseline check
```
토큰·기본 스타일·AGENTS.md 구역·스킬을 새 버전으로 바꾼다. `stylelint.config.mjs`·`.htmlvalidate.json`·`ux-baseline.config.json` 의 프로젝트 설정은 그대로 둔다.

## 5. 검사 설정 조정

- 클래스 이름이 규격과 다르면 자체 규칙 옵션으로 바꾼다(예: `ux-baseline/sr-only-*` 의 `classNames`) — lint/README.md 의 표.
- 외부 UI 키트 CSS 는 `ignoreFiles`·`ignore` 로 뺀다(CF-049).
- 규칙을 끄는 것은 룰을 어기는 것이다. 오탐이면 룰 저장소에 알린다 — 시험에서 찾은 오탐은 검사기를 고쳐 왔다(trials/README.md).
