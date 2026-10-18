# 툴팁 (`.tooltip`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

아이콘 단독 버튼의 이름이나 컨트롤에 대한 한 문장 이하 보조 정보를, 마우스를 올리거나 키보드 초점을 줄 때 잠시 보여 준다.

## 대신 쓸 것
- 말풍선 안에 링크·버튼이 필요하거나 제목·여러 문단이 필요한 설명 → 맥락적 도움말 (A11Y-055)
- 한 문장 또는 150자를 넘는 설명 → 맥락적 도움말·도움 패널·별도 도움말 페이지 (COPY-011)
- 작업을 마치는 데 반드시 알아야 하는 정보 → 본문 인라인 텍스트 (COPY-009)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.tooltip` | `span` | 예 | 트리거와 말풍선을 묶어 말풍선 위치의 기준이 된다. 기본은 트리거 옆(가로) 배치, tooltip--vertical 은 위·아래 배치. |
| 트리거 | `.tooltip__trigger` | `button` | 예 | 아이콘 단독 버튼이면 aria-labelledby 로 말풍선을 이름으로 쓰고, 보이는 텍스트가 있는 버튼이면 aria-describedby 로 말풍선을 설명으로 연결한다. title 속성을 쓰지 않는다(A11Y-053). |
| 말풍선 | `.tooltip__bubble` | `span` | 예 | role="tooltip". 텍스트만 넣는다 — 링크·버튼 등 대화형 요소 0개(A11Y-055). 한 문장, 공백 포함 150자 이하(COPY-011, CF-029). 여러 줄 상자형은 tooltip__bubble--box. |

## 표준 마크업

```html
<span class="tooltip">
  <button class="tooltip__trigger tooltip__trigger--icon" type="button" aria-labelledby="print-tooltip">
    <svg class="tooltip__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M7 9V4h10v5M7 17H5v-6h14v6h-2M7 14h10v6H7z"/></svg>
  </button>
  <span class="tooltip__bubble tooltip__bubble--visible" role="tooltip" id="print-tooltip">인쇄</span>
</span>
<span class="tooltip tooltip--vertical">
  <button class="tooltip__trigger" type="button" aria-describedby="draft-tooltip">임시 저장</button>
  <span class="tooltip__bubble tooltip__bubble--box" role="tooltip" id="draft-tooltip">작성 중인 내용을 이 기기에 보관하며, 신청서를 제출하면 지워집니다.</span>
</span>
```

## 표준 CSS (토큰만 사용)

```css
.tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.tooltip__trigger {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
}
.tooltip__trigger--icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: var(--size-height-6);
  padding: 0;
}
.tooltip__icon {
  inline-size: var(--size-height-4);
  block-size: var(--size-height-4);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.tooltip__trigger:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.tooltip__bubble {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: calc(100% + var(--space-gap-3));
  z-index: 100;
  display: none;
  padding: var(--space-padding-2) var(--space-padding-5);
  border-radius: var(--radius-small3);
  background-color: var(--color-surface-inverse);
  box-shadow: var(--shadow-3);
  color: var(--color-text-basic-inverse);
  font-size: var(--font-size-body-small);
  line-height: var(--font-line-height-base);
  white-space: nowrap;
  transform: translateY(-50%);
}
.tooltip__bubble--visible {
  display: block;
}
.tooltip__bubble--box {
  inline-size: max-content;
  max-inline-size: min(22.5rem, 100vw - var(--layout-screen-margin-small) * 2);
  padding: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-border-gray);
  border-radius: var(--radius-xlarge2);
  background-color: var(--color-surface-white-subtler);
  color: var(--color-text-basic);
  white-space: normal;
}
.tooltip--vertical .tooltip__bubble {
  inset-block: auto calc(100% + var(--space-gap-3));
  inset-inline-start: 50%;
  transform: translateX(-50%);
}
.tooltip--vertical .tooltip__bubble--below {
  inset-block: calc(100% + var(--space-gap-3)) auto;
}
```

## 상태
- **숨김(기본)**: 말풍선에 tooltip__bubble--visible 이 없다(display none). 말풍선 요소와 id 는 DOM 에 남겨 aria-labelledby·aria-describedby 가 계속 이름·설명을 준다.
- **표시**: 트리거에 마우스를 올리거나(pointerenter) 키보드 초점이 오면(focus) 말풍선에 tooltip__bubble--visible 을 붙인다. 예시 markup 은 검사를 위해 표시 상태로 둔다.
- **위치 뒤집기**: 말풍선이 뷰포트 밖으로 나가면 반대쪽(tooltip--vertical 은 tooltip__bubble--below, 가로형은 왼쪽 배치)으로 옮긴다. 트리거를 가리지 않는다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 트리거에 초점이 오면 말풍선을 표시하고, 초점이 떠나면 숨긴다. |
| Esc | 초점을 옮기지 않고 말풍선을 숨긴다(A11Y-010). 트리거 버튼의 동작은 실행하지 않는다. |

## 동작
- 말풍선은 트리거 호버·초점 동안 유지하고, 포인터를 트리거에서 말풍선 위로 옮겨도 사라지지 않는다(트리거와 말풍선 사이 간격을 포인터 이동 경로로 함께 판정). 시간이 지났다고 숨기지 않는다(A11Y-010).
- Esc 로 초점·포인터를 옮기지 않고 숨길 수 있다(A11Y-010).
- 툴팁을 단 요소에는 title 속성을 쓰지 않는다 — 브라우저 기본 툴팁이 겹쳐 나온다(A11Y-053, CF-043).
- 말풍선에는 텍스트만 넣는다. 링크·버튼이 필요하면 맥락적 도움말을 쓴다(A11Y-055).
- 문구는 한 문장, 공백 포함 150자 이하로 쓰고 필수 정보를 넣지 않는다(COPY-011, CF-029, COPY-009).
- 텍스트 레이블 없는 아이콘 단독 메뉴·기능 버튼에는 이 툴팁으로 이름을 보여 준다(A11Y-054). 터치 환경에서는 툴팁이 뜨지 않을 수 있으므로 의미를 알 수 있는 공통 인지 아이콘을 고른다(COPY-049).
- 툴팁에 별도의 활성화 버튼(예 정보 아이콘)이 있으면 터치 인터페이스(hover none)에서 그 버튼을 탭할 때 말풍선을 열고 다시 탭하면 닫는다(RESP-017).
- 말풍선은 모든 화면 너비에서 뷰포트 안에 전부 보이고 트리거·안내 대상을 가리지 않게 배치한다(LAYOUT-057).
- 한 화면에서 정보·물음표 아이콘으로 여는 툴팁을 맥락적 도움말·도움 패널과 함께 쓰지 않는다(COPY-048).
- 말풍선은 DOM 에서 트리거 바로 다음에 둔다(A11Y-008).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-010 | MUST | 호버나 키보드 초점으로 나타나는 추가 콘텐츠는 초점·포인터를 옮기지 않고 닫을 수 있고(Esc 등), 그 위로 포인터를 옮겨도 사라지지 않으며, 호버·초점이 없어지거나 사용자가 닫거나 정보가 무효가 될 때까지 유지한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-053 | SHOULD | 툴팁 컴포넌트를 단 요소에 title 속성을 함께 쓰지 않는다. |
| A11Y-054 | SHOULD | 텍스트 레이블 없이 아이콘만 있는 메뉴·기능 버튼에는 툴팁을 제공한다. |
| A11Y-055 | SHOULD | 팝오버 안에 링크·버튼 같은 대화형 요소가 필요하면 툴팁 대신 맥락적 도움말을 쓴다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COPY-009 | SHOULD | 사용자가 작업을 마치는 데 반드시 알아야 하는 정보는 별도 조작 없이 보이는 본문(인라인 텍스트)에 두고, 툴팁·맥락적 도움말·도움 패널·접힌 디스클로저·아코디언·캐러셀 안에만 두지 않는다. |
| COPY-011 | SHOULD | 툴팁에는 한 문장(공백 포함 150자) 이하의 보조 정보만 넣고, 그보다 긴 설명은 맥락적 도움말·도움 패널·별도 도움말 페이지로 제공한다. |
| COPY-048 | SHOULD | 한 화면에서 정보·물음표 아이콘 툴팁과 맥락적 도움말·도움 패널을 함께 쓰지 않고, 맥락적 도움말이나 도움 패널이 필요하면 그 화면의 정보·물음표 아이콘을 모두 맥락적 도움말로 쓴다. |
| COPY-049 | SHOULD | 터치가 주 입력인 환경에서는 툴팁이 뜨지 않을 수 있으므로, 툴팁을 다는 아이콘 버튼에는 툴팁 없이도 메뉴·기능의 의미를 알 수 있는 아이콘을 고른다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-057 | SHOULD | 툴팁·맥락적 도움말·코치마크 팝오버는 모든 화면 너비에서 뷰포트 안에 전부 보이게 하고, 활성화 버튼과 안내 대상 본문 요소를 가리지 않는 방향으로 표시한다. |
| RESP-017 | SHOULD | 툴팁에 별도의 활성화 버튼이 있으면, 터치 인터페이스가 감지됐을 때 그 버튼의 click(탭) 이벤트로 툴팁 팝오버를 열고 닫는다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |
| SHAPE-004 | MAY | 그림자는 정의된 단계 토큰만 쓰고 단계를 용도에 고정한다(KRDS: 셀렉트 shadow2, 툴팁 shadow3, 모달 shadow4와 딤드, 긴급 공지 shadow2와 고도 -1 표면). |

## KRDS 키트와의 관계
- 클래스 대응: `.tooltip__trigger` ↔ `krds-tooltip`, `.tooltip__bubble` ↔ `krds-tooltip-popover`, `.tooltip__bubble--box` ↔ `tooltip-box`, `.tooltip--vertical` ↔ `tooltip-vertical`
- KRDS 키트는 툴팁 문구를 data-tooltip 속성에 두고 스크립트로 body 끝에 말풍선을 만든다 — 말풍선이 트리거와 aria 로 연결되지 않고 DOM 에서도 멀리 떨어진다. 이 규격은 role="tooltip" 요소를 트리거 바로 다음에 두고 aria-labelledby·aria-describedby 로 연결한다(A11Y-025, A11Y-008).
- KRDS 키트 아이콘 버튼은 sr-only '도움말'로 이름을 따로 주고 툴팁 문구와 다르다 — 이 규격은 아이콘 단독 버튼의 이름을 말풍선 문구 하나로 쓴다(A11Y-025, A11Y-054).
- KRDS 툴팁 상자형 설명은 '150자 내외'다 — 이 규격은 한 문장·150자 이하로 정한다(COPY-011, CF-029).
