# 따라하기 패널 (`.tutorial-panel`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

여러 세부 단계나 복잡한 입력이 필요한 작업을 과업·단계 목록으로 안내하고, 코치마크로 화면 위에서 따라 하게 하는 패널이다.

## 대신 쓸 것
- 한두 문장으로 끝나는 간단한 안내 → 맥락적 도움말 (COPY-044)
- 화면 단위 도움말·관련 서비스 안내 → 도움 패널 (COPY-043)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.tutorial-panel` | `section` | 예 | 단독으로 쓰거나 도움 패널의 '따라하기' 탭 패널 안에 넣는다. 도움 패널과 함께 쓰면 처음에는 '도움' 탭이 선택된다(NAV-060). 제목 수준은 놓이는 위치에 맞춘다. |
| 제목 | `.tutorial-panel__title` | `h2` | 예 | 안내하는 작업 이름(COPY-003). |
| 과업 목록 | `.tutorial-panel__tasks` | `ol` | 예 | 과업을 실제 수행 순서대로 나열한다. DOM 순서 = 시각 순서(A11Y-008). |
| 과업 항목 | `.tutorial-panel__task` | `li` | 예 | 진행 중인 과업에 tutorial-panel__task--current 와 aria-current="step". |
| 과업 제목 | `.tutorial-panel__task-title` | `h3` | 예 |  |
| 세부 단계 펼침 버튼 | `.tutorial-panel__expand` | `button` | 예 | aria-expanded·aria-controls. Enter·Space 로 펼치고 접으며 초점은 버튼에 남는다(A11Y-031). |
| 세부 단계 목록 | `.tutorial-panel__steps` | `ol` | 예 |  |
| 따라하기 실행 버튼 | `.tutorial-panel__start` | `button` | 예 | 누르면 그 과업의 코치마크를 시작한다. 같은 레이블이 과업마다 있으므로 aria-describedby 로 과업 제목을 연결한다. 코치마크의 '그만보기'를 누르면 초점이 이 버튼으로 돌아온다(A11Y-052). |
| 중단 버튼 | `.tutorial-panel__stop` | `button` | 예 | 레이블 '따라하기 중단하기'. 이 버튼을 누르기 전까지 따라하기 절차를 끝내거나 내용을 바꾸지 않는다(STATE-025). |

## 표준 마크업

```html
<section class="tutorial-panel" aria-labelledby="tutorial-title">
  <h2 class="tutorial-panel__title" id="tutorial-title">이사 전 살던 곳 정보 입력하기</h2>
  <ol class="tutorial-panel__tasks" role="list">
    <li class="tutorial-panel__task tutorial-panel__task--current" aria-current="step">
      <h3 class="tutorial-panel__task-title" id="tutorial-task-1-title">1. 이사 전에 살던 곳 주소 확인 <span class="tutorial-panel__status">(진행 중)</span></h3>
      <button class="tutorial-panel__expand" type="button" aria-expanded="true" aria-controls="tutorial-task-1-steps">세부 단계 2개</button>
      <ol class="tutorial-panel__steps" id="tutorial-task-1-steps">
        <li>주소 조회</li>
        <li>조회 결과 확인</li>
      </ol>
      <button class="tutorial-panel__start" type="button" aria-describedby="tutorial-task-1-title">따라하기 실행</button>
    </li>
    <li class="tutorial-panel__task">
      <h3 class="tutorial-panel__task-title" id="tutorial-task-2-title">2. 이사 갈 가족 구성원 선택</h3>
      <button class="tutorial-panel__expand" type="button" aria-expanded="false" aria-controls="tutorial-task-2-steps">세부 단계 1개</button>
      <ol class="tutorial-panel__steps" id="tutorial-task-2-steps" hidden>
        <li>가족 구성원 선택</li>
      </ol>
      <button class="tutorial-panel__start" type="button" aria-describedby="tutorial-task-2-title">따라하기 실행</button>
    </li>
  </ol>
  <button class="tutorial-panel__stop" type="button">따라하기 중단하기</button>
</section>
```

## 표준 CSS (토큰만 사용)

```css
.tutorial-panel {
  display: flex;
  flex-direction: column;
  gap: var(--gap-layout-title-body-small);
  color: var(--color-text-basic);
}
.tutorial-panel__title {
  margin: 0;
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-xsmall);
  font-weight: var(--font-weight-bold);
}
.tutorial-panel__tasks {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-5);
  margin: 0;
  padding: 0;
  list-style: none;
}
.tutorial-panel__task {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-gap-3);
  padding-block-end: var(--space-padding-6);
  border-block-end: var(--border-width-variable-regular) solid var(--color-divider-gray);
}
.tutorial-panel__task-title {
  margin: 0;
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-bold);
}
.tutorial-panel__task--current .tutorial-panel__task-title {
  color: var(--color-text-primary);
}
.tutorial-panel__status {
  font-weight: var(--font-weight-regular);
}
.tutorial-panel__expand,
.tutorial-panel__start,
.tutorial-panel__stop {
  min-block-size: var(--size-height-5);
  padding-inline: var(--space-padding-4);
  border: var(--border-width-variable-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium1);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
}
.tutorial-panel__steps {
  margin: 0;
  padding-inline-start: var(--space-padding-8);
  font-size: var(--font-size-body-small);
  line-height: var(--font-line-height-base);
}
.tutorial-panel__stop {
  align-self: stretch;
  min-block-size: var(--size-height-6);
  border-color: var(--color-button-secondary-border);
  background-color: var(--color-button-secondary-fill);
  color: var(--color-text-primary);
  font-size: var(--font-size-label-medium);
}
.tutorial-panel__expand:focus-visible,
.tutorial-panel__start:focus-visible,
.tutorial-panel__stop:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **세부 단계 펼침**: tutorial-panel__expand 의 aria-expanded 를 true 로, tutorial-panel__steps 의 hidden 을 지운다. 초점은 펼침 버튼에 남는다(A11Y-031).
- **진행 중 과업**: 해당 li 에 tutorial-panel__task--current 와 aria-current="step", 과업 제목에 '(진행 중)' 텍스트. 색 외에 텍스트로도 구분한다.
- **따라하기 중**: 따라하기 실행 버튼을 누르면 코치마크(coach-mark)가 화면에 표시된다. 패널 내용은 '따라하기 중단하기'를 누를 때까지 그대로다(STATE-025).

## 키보드

| 키 | 동작 |
|---|---|
| Enter / Space | 펼침 버튼에서 세부 단계를 펼치거나 접는다. 초점은 버튼에 남는다(A11Y-031). 따라하기 실행·중단 버튼을 실행한다. |
| Tab / Shift+Tab | 패널 안의 버튼 사이를 화면 순서대로 이동하고 패널 밖으로 나갈 수 있다(A11Y-012). |

## 동작
- 따라하기 패널은 2단계 이상의 순서 있는 절차나 여러 입력 항목을 채우는 작업에만 쓴다(COPY-044).
- 사용자가 '따라하기 중단하기'를 누르기 전까지 다른 조작(다른 링크·버튼 사용, 도움 패널로 전환, 패널 닫기)을 해도 따라하기 절차와 내용을 유지한다(STATE-025).
- 패널을 닫았다 열거나 도움 탭으로 갔다 돌아오면 마지막으로 보던 과업·단계를 표시한다(STATE-024).
- 패널을 닫기 버튼으로 닫으면 초점을 패널을 연 버튼으로 옮긴다(A11Y-050).
- 코치마크의 '그만보기'를 실행하면 코치마크를 숨기고 초점을 그 과업의 '따라하기 실행' 버튼으로 옮긴다(A11Y-052).
- 각 과업·단계 설명은 패널 기본 크기에서 세로 스크롤 없이 보이는 짧은 문장으로 쓴다(COPY-042).
- 패널 안 관련 화면·리소스 링크는 새 탭으로 열고 링크 컴포넌트와 같은 새 창 아이콘(svg, aria-hidden="true")과 링크 안 숨긴 텍스트(.sr-only ' (새 창 열림)')을 넣는다(NAV-013, NAV-012, CF-002).
- 도움 패널과 한 패널에서 전환해 제공하면 처음에는 '도움' 탭을 선택한다(NAV-060).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-012 | MUST | 키보드 초점이 들어갈 수 있는 모든 컴포넌트에서 키보드만으로 초점을 빼낼 수 있게 하고, 수정자 없는 방향키·Tab 같은 표준 방법이 아니면 빠져나오는 방법을 안내한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-031 | SHOULD | 아코디언 헤더나 패널 안의 펼침 버튼에 초점이 있을 때 Enter·Space로 펼침 상태를 바꾸고, 바꾼 뒤에도 초점을 그 버튼에 유지한다. |
| A11Y-050 | SHOULD | 도움 패널·따라하기 패널을 닫기 버튼(Click·Enter·Space)으로 닫으면 키보드 초점을 그 패널을 연 버튼으로 옮긴다. |
| A11Y-052 | SHOULD | 코치마크의 '그만보기'를 Click·Enter·Space로 실행하면 코치마크 팝오버를 숨기고 키보드 초점을 따라하기 패널의 따라하기 실행 버튼으로 옮긴다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| COPY-042 | MAY | 도움 패널·따라하기 패널의 각 콘텐츠는 짧은 문장으로 써서 패널 기본 크기에서 세로 스크롤 없이 한 번에 보이게 한다. |
| COPY-044 | MAY | 따라하기 패널은 여러 세부 단계를 거치거나 복잡한 입력이 필요한 작업에만 쓰고, 간단한 안내에는 맥락적 도움말을 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| NAV-013 | SHOULD | 도움 콘텐츠(도움 패널, 따라하기 패널, 맥락적 도움말, 코치마크) 안의 관련 화면·리소스 링크는 새 탭으로 열고, 새 탭으로 열 때는 NAV-012에 따라 새 탭이 열린다는 사실을 링크에 텍스트로 반드시 표시하며, 표시할 수 없으면 새 탭 대신 같은 탭으로 연다. |
| NAV-060 | SHOULD | 도움 패널과 따라하기 패널을 한 패널 안에서 전환해 제공할 때는 처음에 도움 패널 탭을 선택된 상태로 둔다. |
| STATE-024 | SHOULD | 도움 패널이나 따라하기 패널을 닫았다가 다시 열면(다른 패널로 전환했다가 돌아온 경우 포함) 사용자가 마지막으로 본 콘텐츠를 표시한다. |
| STATE-025 | SHOULD | 사용자가 '중단하기' 버튼을 누르기 전까지 따라하기 패널의 콘텐츠를 다른 콘텐츠로 바꾸거나 따라하기 절차를 끝내지 않는다. |

## KRDS 키트와의 관계
- 클래스 대응: `.tutorial-panel` ↔ `tab-conts(따라하기) help-conts-area-inner`, `.tutorial-panel__title` ↔ `help-title`, `.tutorial-panel__tasks` ↔ `coach-help-process`, `.tutorial-panel__task-title` ↔ `tit`, `.tutorial-panel__expand` ↔ `btn-conts-expand`, `.tutorial-panel__steps` ↔ `krds-info-list decimal`, `.tutorial-panel__stop` ↔ `coach-btn-stop`
- KRDS 키트 따라하기 탭 제목은 href="#;" 링크에 title="이전으로 돌아가기"를 단 형태다 — 이 규격은 제목을 일반 제목으로 두고, 이전 화면 이동이 필요하면 별도 버튼으로 둔다(A11Y-025, COPY-003).
- KRDS 키트 펼침 버튼('전체 2단계')에 aria-expanded·aria-controls 가 없다 — 이 규격은 넣는다(A11Y-025, A11Y-031).
- KRDS 키트는 진행 중 과업을 class="current" 색으로만 표시한다 — 이 규격은 aria-current="step" 과 '(진행 중)' 텍스트를 함께 쓴다(COLOR-001, A11Y-025).
- KRDS 키트에는 '따라하기 실행' 버튼이 없지만 KRDS 코치마크 페이지는 '그만보기' 뒤 초점을 따라하기 실행 버튼으로 옮기라고 한다 — 이 규격은 과업마다 실행 버튼을 둔다(A11Y-052).
- KRDS 키트 중단 버튼 레이블은 '그만 따라하기'다 — 이 규격은 STATE-025 의 '중단하기'와 맞춰 '따라하기 중단하기'로 쓴다.
