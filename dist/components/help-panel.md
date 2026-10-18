# 도움 패널 (`.help-panel`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

양이 많거나 복잡한 과업 화면에서 본문 옆에 펼쳐 두고 화면 단위 도움말·관련 서비스를 보여 주는 패널이다.

## 대신 쓸 것
- 한두 문장으로 끝나는 간단한 안내 → 맥락적 도움말 (COPY-043)
- 작업 방법을 단계별로 안내 → 따라하기 패널과 코치마크 (COPY-043)
- 작업을 마치는 데 반드시 알아야 하는 정보 → 본문 인라인 텍스트 (COPY-009)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(패널) | `.help-panel` | `aside` | 예 | 보충(complementary) 랜드마크. aria-labelledby 로 패널 제목을 연결한다. 본문 옆(오른쪽)에 나란히 두고, DOM 에서는 본문 다음에 둔다(A11Y-008). |
| 패널 제목 | `.help-panel__title` | `h2` | 예 | 펼침·접기 버튼을 감싼다(APG 아코디언 머리글과 같은 구조). 루트의 aria-labelledby 가 이 id 를 가리킨다. |
| 펼침·접기 버튼 | `.help-panel__toggle` | `button` | 예 | 접근 가능한 이름 '도움말'(상태와 관계없이 같다), aria-expanded 로 펼침 상태, aria-controls 로 패널 본문을 가리킨다. 여닫는 버튼이 하나이므로 닫은 뒤 초점이 그 버튼에 남는다(A11Y-050). |
| 패널 본문 | `.help-panel__body` | `div` | 예 | 접힌 상태에서는 hidden. |
| 탭 목록 | `.help-panel__tablist` | `div` |  | 따라하기 패널을 함께 제공할 때만 둔다. role="tablist". 처음에는 '도움' 탭을 선택한다(NAV-060, COPY-041). |
| 탭 | `.help-panel__tab` | `button` |  | role="tab", aria-selected, aria-controls. |
| 탭 패널 | `.help-panel__tabpanel` | `div` |  | role="tabpanel", aria-labelledby 로 탭을 연결한다. 따라하기 탭 패널 안에는 따라하기 패널(tutorial-panel) 규격을 넣는다. |
| 도움 섹션 | `.help-panel__section` | `section` | 예 | 섹션 하나는 패널 기본 크기에서 세로 스크롤 없이 보이는 분량으로 쓴다(COPY-042). |
| 섹션 제목 | `.help-panel__heading` | `h3` | 예 |  |
| 관련 링크 목록 | `.help-panel__links` | `ul` |  | 관련 화면·리소스 링크는 새 탭으로 열고 링크 컴포넌트와 같은 새 창 아이콘(svg, aria-hidden="true")과 링크 안 숨긴 텍스트(.sr-only ' (새 창 열림)')을 넣는다(NAV-013, NAV-012, CF-002). |
| 도움 아이콘 버튼 | `.help-panel__trigger` | `button` |  | 본문의 도움 대상 레이블·제목 바로 다음에 두고, 누르면 패널에 그 항목의 상세 도움말을 표시한다(LAYOUT-056). |

## 표준 마크업

```html
<div class="help-panel-layout">
  <div class="help-panel-layout__main">
    <h2 class="help-panel-demo__title">전자증명서 발급 <button class="help-panel__trigger" type="button" aria-controls="help-panel-body" aria-label="전자증명서 발급 도움말 보기"><svg class="help-panel__trigger-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01"/></svg></button></h2>
    <p>발급할 증명서를 선택해 주세요.</p>
  </div>
  <aside class="help-panel" aria-labelledby="help-panel-title">
    <h2 class="help-panel__title" id="help-panel-title">
      <button class="help-panel__toggle" type="button" aria-expanded="true" aria-controls="help-panel-body">도움말<svg class="help-panel__toggle-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
    </h2>
    <div class="help-panel__body" id="help-panel-body">
      <div class="help-panel__tablist" role="tablist" aria-label="도움말 종류">
        <button class="help-panel__tab" type="button" role="tab" id="help-tab-help" aria-selected="true" aria-controls="help-tabpanel-help">도움</button>
        <button class="help-panel__tab" type="button" role="tab" id="help-tab-tutorial" aria-selected="false" aria-controls="help-tabpanel-tutorial" tabindex="-1">따라하기</button>
      </div>
      <div class="help-panel__tabpanel" role="tabpanel" id="help-tabpanel-help" aria-labelledby="help-tab-help">
        <section class="help-panel__section" aria-labelledby="help-intro-title">
          <h3 class="help-panel__heading" id="help-intro-title">이 패널 사용 방법</h3>
          <p class="help-panel__text">화면의 항목 옆 도움말 아이콘을 누르면 그 항목의 설명이 여기에 표시됩니다.</p>
        </section>
        <section class="help-panel__section" aria-labelledby="help-related-title">
          <h3 class="help-panel__heading" id="help-related-title">관련 서비스</h3>
          <ul class="help-panel__links" role="list">
            <li><a class="help-panel__link" href="https://example.com/certificates/resident" target="_blank" rel="noopener">주민등록표등본 발급<span class="sr-only"> (새 창 열림)</span><svg class="help-panel__new-window" aria-hidden="true" viewBox="0 0 16 16"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"></path></svg></a></li>
            <li><a class="help-panel__link" href="https://example.com/faq" target="_blank" rel="noopener">자주 묻는 질문<span class="sr-only"> (새 창 열림)</span><svg class="help-panel__new-window" aria-hidden="true" viewBox="0 0 16 16"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"></path></svg></a></li>
          </ul>
        </section>
      </div>
      <div class="help-panel__tabpanel" role="tabpanel" id="help-tabpanel-tutorial" aria-labelledby="help-tab-tutorial" hidden>
        <p class="help-panel__text">따라하기 패널(tutorial-panel) 규격의 내용이 들어갑니다.</p>
      </div>
    </div>
  </aside>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.help-panel-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--gap-layout-contents-right);
  align-items: start;
}
.help-panel {
  position: sticky;
  inset-block-start: 0;
  inline-size: 24.375rem;
  max-block-size: 100dvh;
  overflow-y: auto;
  padding: var(--space-padding-10);
  border-inline-start: var(--border-width-variable-regular) solid var(--color-border-gray);
  background-color: var(--color-surface-gray-subtler);
  box-shadow: var(--shadow-3);
  color: var(--color-text-basic);
}
.help-panel--collapsed {
  inline-size: auto;
  padding: var(--space-padding-6);
  box-shadow: none;
}
.help-panel__title {
  margin: 0;
}
.help-panel__toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
  min-block-size: var(--size-height-6);
  padding: 0;
  border: 0;
  background-color: transparent;
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-small);
  font-weight: var(--font-weight-bold);
}
.help-panel__toggle-icon {
  inline-size: var(--size-height-3);
  block-size: var(--size-height-3);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.help-panel__toggle[aria-expanded="false"] .help-panel__toggle-icon {
  transform: rotate(180deg);
}
.help-panel__tab {
  min-block-size: var(--size-height-5);
  padding-inline: var(--space-padding-4);
  border: var(--border-width-variable-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium1);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
}
.help-panel__tablist {
  display: flex;
  gap: var(--space-gap-2);
  margin-block: var(--space-gap-5);
}
.help-panel__tab {
  flex: 1;
}
.help-panel__tab[aria-selected="true"] {
  border-color: var(--color-border-primary);
  border-block-end-width: var(--space-scale-3);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}
.help-panel__body {
  display: flex;
  flex-direction: column;
  gap: var(--gap-layout-title-body-small);
}
.help-panel__section {
  display: flex;
  flex-direction: column;
  gap: var(--gap-layout-text-text-small);
  padding-block: var(--space-padding-6);
  border-block-start: var(--border-width-variable-regular) solid var(--color-divider-gray-light);
}
.help-panel__heading {
  margin: 0;
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-xsmall);
  font-weight: var(--font-weight-bold);
}
.help-panel__text {
  margin: 0;
  font-size: var(--font-size-body-medium);
  line-height: var(--font-line-height-base);
}
.help-panel__links {
  display: flex;
  flex-direction: column;
  gap: var(--gap-layout-text-text-small);
  margin: 0;
  padding: 0;
  list-style: none;
}
.help-panel__link {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--layout-target-min);
  color: var(--color-text-primary);
  font-size: var(--font-size-body-small);
  text-decoration: underline;
}
.help-panel__new-window {
  inline-size: 1em;
  block-size: 1em;
  margin-inline-start: var(--space-gap-1);
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}
.help-panel__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: var(--size-height-5);
  min-block-size: var(--size-height-5);
  padding: 0;
  border: 0;
  border-radius: var(--radius-medium1);
  background-color: transparent;
  color: var(--color-icon-gray);
  vertical-align: middle;
}
.help-panel__trigger-icon {
  inline-size: var(--size-height-3);
  block-size: var(--size-height-3);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.help-panel__toggle:focus-visible,
.help-panel__tab:focus-visible,
.help-panel__link:focus-visible,
.help-panel__trigger:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
@media (max-width: 1023px) {
  .help-panel-layout {
    grid-template-columns: minmax(0, 1fr);
  }
  .help-panel {
    position: static;
    inline-size: auto;
    max-block-size: none;
    box-shadow: none;
  }
}
```

## 상태
- **펼침(로딩 직후 기본)**: 패널 본문이 보이고 help-panel__toggle 은 aria-expanded="true". 초점은 패널로 옮기지 않는다(NAV-059, CF-003). 본문은 '이 패널 사용 방법' 기본 안내이고, 따라하기 탭이 있으면 '도움' 탭이 선택돼 있다(COPY-041, NAV-060).
- **접힘**: 루트에 help-panel--collapsed, help-panel__body 에 hidden, help-panel__toggle 은 aria-expanded="false"(이름은 '도움말' 그대로). 초점은 토글 버튼에 남는다(A11Y-050).
- **항목 상세**: 본문의 help-panel__trigger 를 누르면 '도움' 탭 패널에 그 항목의 help-panel__section(상세 도움말)을 표시하고, 접혀 있으면 펼친다. 초점은 누른 버튼에 그대로 둔다.
- **좁은 화면(1단 레이아웃)**: 본문과 패널을 나란히 놓을 수 없는 너비에서는 패널을 '도움말' 열기 버튼으로 줄이고, 버튼을 누르면 패널 내용을 모달 규격(dialog.showModal, aria-modal)으로 연다. 닫으면 초점을 그 버튼으로 돌려놓는다(RESP-016, A11Y-050).

## 키보드

| 키 | 동작 |
|---|---|
| Enter / Space | 토글 버튼에서 패널을 접거나 펼친다. 초점은 토글 버튼에 남는다(A11Y-050). 도움 아이콘 버튼에서는 해당 항목의 도움말을 표시한다. |
| ← / → | 탭 목록에서 이전·다음 탭으로 초점을 옮기고 그 탭을 선택한다(WAI-ARIA APG Tabs, 자동 활성화). |
| Home / End | 탭 목록에서 첫·마지막 탭을 선택한다. |
| Tab | 탭 목록에서 선택된 탭 패널 안으로 초점을 옮긴다. 패널 밖으로도 Tab 으로 나갈 수 있다(A11Y-012). |

## 동작
- 도움 패널이 있는 화면은 로딩 직후 패널을 펼친 상태로 표시하되 초점을 패널로 옮기지 않는다(NAV-059, CF-003, A11Y-024).
- 패널을 처음 표시할 때는 패널 용도·사용법 기본 안내를 보이고, 사용자가 도움 아이콘 버튼을 누르기 전에는 상세 도움말을 표시하지 않는다. 따라하기 패널과 함께 쓰면 '도움' 탭을 선택한 상태로 연다(COPY-041, NAV-060).
- 패널을 접었다 펼치거나 다른 탭으로 갔다 돌아오면 마지막으로 보던 콘텐츠를 다시 표시한다(STATE-024).
- 패널을 닫는 버튼으로 닫으면 초점은 패널을 연 버튼으로 간다 — 이 규격은 여닫는 버튼이 하나라 초점이 그 버튼에 남는다(A11Y-050).
- 패널 안 관련 화면·리소스 링크는 새 탭으로 열고 링크 컴포넌트와 같은 새 창 아이콘(svg, aria-hidden="true")과 링크 안 숨긴 텍스트(.sr-only ' (새 창 열림)')을 넣는다. title 속성만으로 알리지 않는다(NAV-013, NAV-012, CF-002, CF-043).
- 같은 화면·같은 과업 흐름에서 도움 패널과 맥락적 도움말·정보 아이콘 툴팁을 함께 쓰지 않는다(COPY-048, NAV-062).
- 작업 완료에 반드시 필요한 정보는 패널에만 두지 않고 본문에 쓴다(COPY-009). 섹션 하나는 패널 기본 크기에서 스크롤 없이 보이게 짧게 쓴다(COPY-042).
- 패널과 본문은 나란히 놓는다(패널이 본문을 덮지 않는다). 1단 레이아웃이 되는 너비에서는 열기 버튼 + 모달로 바꾼다(RESP-016, LAYOUT-001).
- 같은 기능의 도움 아이콘·레이블은 모든 화면에서 같게 쓴다(COPY-004).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-012 | MUST | 키보드 초점이 들어갈 수 있는 모든 컴포넌트에서 키보드만으로 초점을 빼낼 수 있게 하고, 수정자 없는 방향키·Tab 같은 표준 방법이 아니면 빠져나오는 방법을 안내한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-024 | MUST | UI 컴포넌트가 초점을 받는 것만으로 맥락 변화(새 창 열기, 페이지 이동, 폼 제출, 초점 이동, 화면 의미를 바꾸는 콘텐츠 변경)를 일으키지 않는다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-050 | SHOULD | 도움 패널·따라하기 패널을 닫기 버튼(Click·Enter·Space)으로 닫으면 키보드 초점을 그 패널을 연 버튼으로 옮긴다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| COPY-009 | SHOULD | 사용자가 작업을 마치는 데 반드시 알아야 하는 정보는 별도 조작 없이 보이는 본문(인라인 텍스트)에 두고, 툴팁·맥락적 도움말·도움 패널·접힌 디스클로저·아코디언·캐러셀 안에만 두지 않는다. |
| COPY-041 | SHOULD | 도움 패널을 처음 표시할 때는 패널의 용도와 활용 방법을 짧게 안내하는 기본 상태를 보여주고, 사용자가 아이콘 버튼을 누르기 전에는 상세 도움 정보를 표시하지 않는다. 도움 패널과 따라하기 패널을 함께 제공하면 도움 패널 탭을 선택한 상태로 연다. |
| COPY-042 | MAY | 도움 패널·따라하기 패널의 각 콘텐츠는 짧은 문장으로 써서 패널 기본 크기에서 세로 스크롤 없이 한 번에 보이게 한다. |
| COPY-043 | MAY | 간단한 안내·도움 정보에는 도움 패널 대신 맥락적 도움말을 쓰고, 작업 방법을 단계별로 안내할 때는 도움 패널 대신 따라하기 패널과 코치마크를 쓴다. |
| COPY-048 | SHOULD | 한 화면에서 정보·물음표 아이콘 툴팁과 맥락적 도움말·도움 패널을 함께 쓰지 않고, 맥락적 도움말이나 도움 패널이 필요하면 그 화면의 정보·물음표 아이콘을 모두 맥락적 도움말로 쓴다. |
| LAYOUT-001 | MUST | 키보드 초점을 받은 컴포넌트가 작성자가 만든 콘텐츠(고정 헤더·고정 푸터·쿠키 배너·비모달 대화상자 등)에 완전히 가려지지 않게 한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-056 | SHOULD | 도움 패널·맥락적 도움말을 여는 아이콘 버튼은 도움 대상 컴포넌트나 레이블 바로 옆에 둔다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| NAV-013 | SHOULD | 도움 콘텐츠(도움 패널, 따라하기 패널, 맥락적 도움말, 코치마크) 안의 관련 화면·리소스 링크는 새 탭으로 열고, 새 탭으로 열 때는 NAV-012에 따라 새 탭이 열린다는 사실을 링크에 텍스트로 반드시 표시하며, 표시할 수 없으면 새 탭 대신 같은 탭으로 연다. |
| NAV-059 | SHOULD | 도움 패널을 제공하는 화면은 로딩이 끝났을 때 도움 패널을 펼친 상태로 표시하되, 키보드 초점을 도움 패널로 옮기지 않는다. |
| NAV-060 | SHOULD | 도움 패널과 따라하기 패널을 한 패널 안에서 전환해 제공할 때는 처음에 도움 패널 탭을 선택된 상태로 둔다. |
| NAV-062 | SHOULD | 하나의 과업 흐름(같은 절차에 속한 화면들)에서 맥락적 도움말과 도움 패널을 함께 쓰지 않는다. |
| RESP-016 | SHOULD | 레이아웃이 도움 패널과 본문을 나란히 놓을 수 없는 1단 구간이 되면 도움 패널을 패널 열기 버튼으로 축약하고, 버튼을 누르면 패널을 모달로 연다. |
| STATE-024 | SHOULD | 도움 패널이나 따라하기 패널을 닫았다가 다시 열면(다른 패널로 전환했다가 돌아온 경우 포함) 사용자가 마지막으로 본 콘텐츠를 표시한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.help-panel` ↔ `krds-help-panel`, `.help-panel__toggle` ↔ `btn-help-panel`, `.help-panel__tablist` ↔ `krds-tab-area tab`, `.help-panel__tab` ↔ `btn-tab`, `.help-panel__tabpanel` ↔ `tab-conts`, `.help-panel__section` ↔ `conts-area conts-wrap`, `.help-panel__heading` ↔ `help-title`, `.help-panel__links` ↔ `link-list`
- KRDS 키트는 role="tab" 을 li 에 두고 그 안에 button 을 넣으며 화살표 키 이동이 없다 — 이 규격은 button 자체를 role="tab" 으로 쓰고 APG 탭 키보드(←→·Home·End)를 따른다(A11Y-025, A11Y-011).
- KRDS 키트는 선택 상태를 sr-only 텍스트 '선택됨'으로도 알린다 — aria-selected 와 중복이므로 이 규격은 aria-selected 만 쓴다(A11Y-025).
- KRDS 키트는 새 창 링크를 title="새 창 열림" 으로만 알린다 — 이 규격은 새 창 아이콘과 링크 안 숨긴 텍스트 '(새 창 열림)'으로 알린다(NAV-012, CF-043).
- KRDS 키트는 열기 버튼(패널 밖)과 '접어두기' 버튼(패널 안 마지막)을 따로 두고 열기 버튼에 aria-expanded 가 없다 — 이 규격은 aria-expanded 를 가진 토글 버튼 하나를 패널 제목(h2) 안에 둔다. 닫은 뒤 초점이 여는 버튼에 있게 하는 A11Y-050 을 버튼 하나로 만족한다.
- KRDS 키트는 섹션 제목 안에 span.krds-btn 로 만든 가짜 도움말 아이콘을 둔다(초점·역할 없음) — 이 규격은 도움 대상 옆에 실제 button 을 둔다(LAYOUT-056, A11Y-025).
- KRDS 키트 패널은 position fixed 로 본문 위에 겹친다 — 이 규격은 본문 옆에 나란히 두어 초점 받은 본문 요소를 가리지 않는다(LAYOUT-001).
