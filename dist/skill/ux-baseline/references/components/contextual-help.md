# 맥락적 도움말 (`.contextual-help`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

컴포넌트·레이블 바로 옆 도움 아이콘 버튼을 눌렀을 때만, 그 항목에 대한 짧은 설명과 관련 링크를 팝오버로 보여 준다.

## 대신 쓸 것
- 아이콘 단독 버튼의 이름(레이블)만 보여 주면 되는 경우 → 툴팁 (COPY-045)
- 작업을 마치는 데 반드시 알아야 하는 정보 → 본문 인라인 텍스트 또는 도움 패널 (COPY-009)
- 같은 과업 흐름에 도움 패널을 이미 쓰는 경우 → 도움 패널(둘을 섞지 않는다) (NAV-062)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.contextual-help` | `div` | 예 | 도움 대상 레이블과 도움 아이콘 버튼·팝오버를 한 줄로 묶고 팝오버 위치의 기준이 된다. |
| 도움 대상 레이블 | `.contextual-help__label` | `h2·label 등` |  | 도움 아이콘 버튼은 DOM 에서 이 요소의 바로 다음 형제다(LAYOUT-056). |
| 도움 아이콘 버튼 | `.contextual-help__trigger` | `button` | 예 | aria-expanded·aria-controls 로 팝오버를 가리킨다(APG 디스클로저). 아이콘 단독 버튼이므로 툴팁 규격의 말풍선(tooltip__bubble)을 aria-labelledby 로 이름으로 쓴다(A11Y-054, A11Y-025). |
| 팝오버 | `.contextual-help__popover` | `div` | 예 | DOM 에서 버튼 바로 다음에 둔다(A11Y-008). role="tooltip" 을 쓰지 않는다 — 안에 링크·버튼이 있기 때문이다(A11Y-055). role="group" 과 aria-labelledby 로 팝오버 제목을 이름으로 준다. |
| 팝오버 머리 | `.contextual-help__header` | `div` | 예 | 제목 → 닫기 버튼 순서로 마크업한다(DOM 순서 = 시각 순서, A11Y-008). |
| 팝오버 제목 | `.contextual-help__title` | `h3` | 예 |  |
| 닫기 버튼 | `.contextual-help__close` | `button` | 예 | 접근 가능한 이름 '도움말 닫기'. |
| 설명 | `.contextual-help__text` | `p` | 예 |  |
| 관련 링크 | `.contextual-help__link` | `a` |  | 새 탭으로 열고 링크 컴포넌트와 같은 새 창 아이콘(svg, aria-hidden="true")과 링크 안 숨긴 텍스트(.sr-only ' (새 창 열림)')을 넣는다(NAV-013, NAV-012, CF-002). |

## 표준 마크업

```html
<div class="contextual-help">
  <h2 class="contextual-help__label">본인 확인 방법</h2>
  <button class="contextual-help__trigger" type="button" aria-labelledby="identity-help-name" aria-expanded="true" aria-controls="identity-help-popover">
    <svg class="contextual-help__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></svg>
  </button>
  <span class="tooltip__bubble" role="tooltip" id="identity-help-name" hidden>본인 확인 방법 도움말</span>
  <div class="contextual-help__popover" id="identity-help-popover" role="group" aria-labelledby="identity-help-title">
    <div class="contextual-help__header">
      <h3 class="contextual-help__title" id="identity-help-title">본인 확인 방법</h3>
      <button class="contextual-help__close" type="button" aria-label="도움말 닫기">
        <svg class="contextual-help__close-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <p class="contextual-help__text">공동인증서, 금융인증서, 간편인증 중 하나로 본인 확인을 할 수 있습니다.</p>
    <a class="contextual-help__link" href="https://example.com/help/identity" target="_blank" rel="noopener">본인 확인 방법 자세히 보기<span class="sr-only"> (새 창 열림)</span><svg class="contextual-help__new-window" aria-hidden="true" viewBox="0 0 16 16"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"></path></svg></a>
  </div>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.contextual-help {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-gap-2);
}
.contextual-help__label {
  margin: 0;
}
.contextual-help__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: var(--size-height-5);
  min-block-size: var(--size-height-5);
  padding: 0;
  border: 0;
  border-radius: var(--radius-small2);
  background-color: var(--color-action-secondary);
  color: var(--color-icon-information);
}
.contextual-help__icon,
.contextual-help__close-icon {
  inline-size: var(--size-height-3);
  block-size: var(--size-height-3);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.contextual-help__popover {
  position: absolute;
  inset-block-start: calc(100% + var(--space-gap-3));
  inset-inline-start: 0;
  margin: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  inline-size: min(22.5rem, 100vw - var(--layout-screen-margin-small) * 2);
  padding: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-border-gray);
  border-radius: var(--radius-xlarge2);
  background-color: var(--color-surface-white-subtler);
  box-shadow: var(--shadow-3);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-small);
  font-weight: var(--font-weight-regular);
  line-height: var(--font-line-height-base);
}
.contextual-help__popover[hidden] {
  display: none;
}
.contextual-help__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-gap-3);
}
.contextual-help__title {
  margin: 0;
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-xsmall);
  font-weight: var(--font-weight-bold);
}
.contextual-help__close {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-inline-size: var(--layout-target-min);
  min-block-size: var(--layout-target-min);
  padding: 0;
  border: 0;
  border-radius: var(--radius-small2);
  background-color: transparent;
  color: var(--color-icon-gray);
}
.contextual-help__text {
  margin: 0;
}
.contextual-help__link {
  color: var(--color-link-default);
  text-decoration: underline;
}
.contextual-help__new-window {
  inline-size: 1em;
  block-size: 1em;
  margin-inline-start: var(--space-gap-1);
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}
.contextual-help__trigger:focus-visible,
.contextual-help__close:focus-visible,
.contextual-help__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **닫힘(기본)**: 팝오버에 hidden, 버튼은 aria-expanded="false". 사용자가 버튼을 누르기 전에는 표시하지 않는다.
- **열림**: 버튼을 누르면 팝오버의 hidden 을 지우고 aria-expanded="true". 초점은 버튼에 그대로 둔다 — 다음 Tab 으로 팝오버 안 요소에 닿는다(팝오버가 DOM 에서 버튼 바로 다음에 있으므로). 예시 markup 은 열림 상태다.
- **위치 뒤집기**: 팝오버가 뷰포트 밖으로 나가면 위·왼쪽·오른쪽 정렬로 옮긴다. 버튼과 안내 대상을 가리지 않는다.

## 키보드

| 키 | 동작 |
|---|---|
| Enter / Space | 도움 아이콘 버튼에서 팝오버를 열고 닫는다. 닫기 버튼에서 팝오버를 닫고 초점을 도움 아이콘 버튼으로 옮긴다. |
| Esc | 초점이 버튼이나 팝오버 안에 있으면 팝오버를 닫고 초점을 도움 아이콘 버튼으로 옮긴다. |
| Tab | 버튼 → 팝오버 안 닫기 → 링크 → 페이지의 다음 요소 순서로 이동한다. 팝오버 밖으로 Tab 으로 나갈 수 있다(A11Y-012). 초점이 팝오버 밖으로 나가도 팝오버를 닫지 않는다. |

## 동작
- 팝오버는 버튼을 눌렀을 때만 연다. 초점·호버만으로 열지 않는다(A11Y-024).
- 팝오버는 한 번에 1개만 연다 — 다른 도움말을 열면 열려 있던 팝오버를 닫는다. 팝오버 안에서 다른 도움말 팝오버나 모달을 열지 않는다(STATE-027).
- 버튼 바깥(문서의 다른 곳)을 누르면 닫는다. 닫힐 때 초점이 팝오버 안에 있었으면 도움 아이콘 버튼으로 옮긴다.
- 도움 아이콘 버튼은 아이콘 단독이므로 툴팁 규격으로 이름('본인 확인 방법 도움말')을 보여 준다. 팝오버가 열려 있는 동안에는 그 툴팁을 표시하지 않는다(A11Y-054, A11Y-010).
- 같은 기능의 도움 아이콘·이름은 모든 화면에서 같게 쓴다(COPY-004).
- 팝오버 안 관련 화면·리소스 링크는 새 탭으로 열고 링크 컴포넌트와 같은 새 창 아이콘(svg, aria-hidden="true")과 링크 안 숨긴 텍스트(.sr-only ' (새 창 열림)')을 넣는다. title 만으로 알리지 않는다(NAV-013, NAV-012, CF-002, CF-043).
- 팝오버는 모든 화면 너비에서 뷰포트 안에 전부 보이고 버튼·안내 대상을 가리지 않게 배치한다(LAYOUT-057).
- 작업 완료에 반드시 필요한 정보는 팝오버에 숨기지 않고 본문·도움 패널로 제공한다. 팝오버에는 보충 설명만 둔다(COPY-045, COPY-009).
- 한 화면에서 정보·물음표 아이콘 툴팁과 맥락적 도움말을 함께 쓰지 않고, 같은 과업 흐름에서 도움 패널과 섞지 않는다(COPY-048, NAV-062).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-010 | MUST | 호버나 키보드 초점으로 나타나는 추가 콘텐츠는 초점·포인터를 옮기지 않고 닫을 수 있고(Esc 등), 그 위로 포인터를 옮겨도 사라지지 않으며, 호버·초점이 없어지거나 사용자가 닫거나 정보가 무효가 될 때까지 유지한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-012 | MUST | 키보드 초점이 들어갈 수 있는 모든 컴포넌트에서 키보드만으로 초점을 빼낼 수 있게 하고, 수정자 없는 방향키·Tab 같은 표준 방법이 아니면 빠져나오는 방법을 안내한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-024 | MUST | UI 컴포넌트가 초점을 받는 것만으로 맥락 변화(새 창 열기, 페이지 이동, 폼 제출, 초점 이동, 화면 의미를 바꾸는 콘텐츠 변경)를 일으키지 않는다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-054 | SHOULD | 텍스트 레이블 없이 아이콘만 있는 메뉴·기능 버튼에는 툴팁을 제공한다. |
| A11Y-055 | SHOULD | 팝오버 안에 링크·버튼 같은 대화형 요소가 필요하면 툴팁 대신 맥락적 도움말을 쓴다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| COPY-009 | SHOULD | 사용자가 작업을 마치는 데 반드시 알아야 하는 정보는 별도 조작 없이 보이는 본문(인라인 텍스트)에 두고, 툴팁·맥락적 도움말·도움 패널·접힌 디스클로저·아코디언·캐러셀 안에만 두지 않는다. |
| COPY-045 | SHOULD | 아이콘 단독 컨트롤의 레이블을 보여줄 때는 맥락적 도움말 대신 툴팁을 쓰고, 작업 완료에 반드시 필요한 정보는 맥락적 도움말 팝오버에 숨기지 않고 인라인 도움말이나 도움 패널로 제공한다. |
| COPY-048 | SHOULD | 한 화면에서 정보·물음표 아이콘 툴팁과 맥락적 도움말·도움 패널을 함께 쓰지 않고, 맥락적 도움말이나 도움 패널이 필요하면 그 화면의 정보·물음표 아이콘을 모두 맥락적 도움말로 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-056 | SHOULD | 도움 패널·맥락적 도움말을 여는 아이콘 버튼은 도움 대상 컴포넌트나 레이블 바로 옆에 둔다. |
| LAYOUT-057 | SHOULD | 툴팁·맥락적 도움말·코치마크 팝오버는 모든 화면 너비에서 뷰포트 안에 전부 보이게 하고, 활성화 버튼과 안내 대상 본문 요소를 가리지 않는 방향으로 표시한다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| NAV-013 | SHOULD | 도움 콘텐츠(도움 패널, 따라하기 패널, 맥락적 도움말, 코치마크) 안의 관련 화면·리소스 링크는 새 탭으로 열고, 새 탭으로 열 때는 NAV-012에 따라 새 탭이 열린다는 사실을 링크에 텍스트로 반드시 표시하며, 표시할 수 없으면 새 탭 대신 같은 탭으로 연다. |
| NAV-062 | SHOULD | 하나의 과업 흐름(같은 절차에 속한 화면들)에서 맥락적 도움말과 도움 패널을 함께 쓰지 않는다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |
| SHAPE-004 | MAY | 그림자는 정의된 단계 토큰만 쓰고 단계를 용도에 고정한다(KRDS: 셀렉트 shadow2, 툴팁 shadow3, 모달 shadow4와 딤드, 긴급 공지 shadow2와 고도 -1 표면). |
| STATE-027 | SHOULD | 맥락적 도움말 팝오버는 한 번에 1개만 열고, 팝오버 안에서 다른 맥락적 도움말 팝오버나 모달을 열지 않는다. |

## KRDS 키트와의 관계
- 클래스 대응: `.contextual-help` ↔ `krds-contextual-help`, `.contextual-help__trigger` ↔ `tooltip-btn`, `.contextual-help__popover` ↔ `tooltip-popover`, `.contextual-help__title` ↔ `tooltip-title`, `.contextual-help__text` ↔ `tooltip-contents`, `.contextual-help__close` ↔ `tooltip-close`
- KRDS 키트는 링크·닫기 버튼이 든 팝오버에 role="tooltip" 을 쓴다 — 툴팁에는 대화형 요소를 넣을 수 없으므로 이 규격은 role="group" + aria-labelledby 로 바꾼다(A11Y-055, A11Y-025).
- KRDS 키트 첫 예시 버튼에는 aria-expanded 가 없고 어느 예시에도 aria-controls 가 없다 — 이 규격은 둘 다 넣는다(A11Y-025).
- KRDS 키트는 닫기 버튼을 팝오버의 마지막 요소로 두고 오른쪽 위에 배치한다 — 모달 규격과 같은 이유로 이 규격은 제목 바로 다음에 둔다(A11Y-008).
- KRDS 키트 '바로가기' 링크는 href="#;" 이고 새 창 표시가 없다 — 이 규격은 실제 주소와 새 창 아이콘·숨긴 텍스트 '(새 창 열림)'을 쓴다(NAV-012, NAV-013).
