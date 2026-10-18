# 버튼 (`.button`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

폼 제출·대화상자 열기·기능 실행처럼 화면을 이동하지 않는 동작을 실행할 때 쓴다.

## 대신 쓸 것
- 다른 화면이나 같은 화면의 다른 섹션으로 이동하는 경우 → link (NAV-047)
- 사용자가 반복하는 주요 행동 하나를 스크롤과 관계없이 늘 보여야 하는 경우 → floating-button (LAYOUT-022)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.button` | `button` | 예 | type 속성을 반드시 쓴다(form 안에서 제출이면 submit, 그 밖은 button). 레이블은 실행할 동작을 동사로 쓴다(COPY-006). 기본 크기는 KRDS 키트 기본값인 large(높이 56px)다. |
| 강조 단계 | `.button--primary` | `button` |  | 주조색 채움(가장 중요한 행동) — button--primary, 윤곽선(중간 강조) — button--secondary·button--tertiary, 텍스트(가장 낮은 강조) — button--text 세 단계만 쓴다(COLOR-015). |
| 크기 | `.button--medium` | `button` |  | button--xsmall(32px)·button--small(40px)·button--medium(48px)·기본 large(56px)·button--xlarge(64px). 그룹 안 버튼은 모두 같은 크기로 만든다(LAYOUT-020). |
| 아이콘 | `.button__icon` | `svg` |  | 레이블과 함께 쓰는 장식 아이콘(aria-hidden). 버튼 그룹의 최상위 강조 버튼에 아이콘이 없으면 다른 버튼에도 넣지 않는다(COLOR-016). 버튼 기능과 일치하는 상징을 쓴다(COPY-025). |
| 버튼 그룹 | `.button-group` | `div` |  | role="group" 과 aria-label 로 묶는다. 그룹 안 버튼은 같은 크기로 늘리고(LAYOUT-020), 세로로 쌓을 때는 최상위 강조 버튼을 맨 위에 둔다(LAYOUT-021). |
| 아이콘 버튼 | `.icon-button` | `button` |  | 텍스트 레이블 없이 아이콘만 있는 버튼. 설정·닫기처럼 대부분의 사용자가 의미를 아는 기능에만 쓴다(COPY-020, COPY-049). 높이·너비 40px(24px 이상, LAYOUT-002). |
| 원형 아이콘 버튼 | `.icon-button--circle` | `button` |  | 정사각형 아이콘 버튼에만 붙이는 원형 변형. border-radius 50% 는 이 클래스에서만 허용된다(SHAPE-003, 린트 ux-baseline/radius-percent-allowlist 기본값). |
| 아이콘 버튼 툴팁 | `.icon-button__tooltip` | `span` |  | role="tooltip". 버튼의 aria-labelledby 가 이 요소를 가리켜 접근 가능한 이름이 된다. 호버·초점에서 보인다(A11Y-054). 위치·모양은 툴팁 컴포넌트 규격을 따른다. |

## 표준 마크업

```html
<div class="button-group" role="group" aria-label="신청서 작업">
  <button type="button" class="button button--secondary">임시 저장</button>
  <button type="button" class="button button--primary">신청서 제출</button>
</div>
<button type="button" class="button button--tertiary button--medium">
  첨부파일 추가
  <svg class="button__icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
</button>
<button type="button" class="button button--text button--small">검색 조건 초기화</button>
<button type="button" class="button button--primary button--medium" disabled aria-describedby="btn-print-reason">증명서 인쇄</button>
<p id="btn-print-reason">발급 처리가 끝나면 인쇄할 수 있습니다.</p>
<button type="button" class="icon-button icon-button--circle" aria-labelledby="btn-settings-tip">
  <svg class="button__icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"></path></svg>
</button>
<span class="icon-button__tooltip" role="tooltip" id="btn-settings-tip">설정</span>
```

## 표준 CSS (토큰만 사용)

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-gap-2);
  min-block-size: var(--size-height-8);
  padding-inline: var(--space-padding-7);
  border: var(--border-width-variable-regular) solid var(--color-button-primary-fill);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-primary-fill);
  color: var(--color-text-inverse-static);
  font-size: var(--font-size-label-large);
  font-weight: var(--font-weight-regular);
  line-height: var(--font-line-height-none);
  cursor: pointer;
  transition: background-color var(--motion-duration-fast) var(--motion-easing-standard);
}
.button:focus-visible,
.icon-button:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.button--primary:hover {
  background-color: var(--color-button-primary-fill-hover);
}
.button--primary:active {
  background-color: var(--color-button-primary-fill-pressed);
}
.button--secondary {
  border-color: var(--color-button-secondary-border);
  background-color: var(--color-button-secondary-fill);
  color: var(--color-text-primary);
}
.button--secondary:hover {
  background-color: var(--color-button-secondary-fill-hover);
}
.button--secondary:active {
  background-color: var(--color-button-secondary-fill-pressed);
}
.button--tertiary,
.icon-button {
  border-color: var(--color-button-tertiary-border);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
}
.button--tertiary:hover,
.icon-button:hover {
  background-color: var(--color-button-tertiary-fill-hover);
}
.button--tertiary:active,
.icon-button:active {
  background-color: var(--color-button-tertiary-fill-pressed);
}
.button--text {
  min-block-size: var(--size-height-4);
  padding-inline: var(--space-padding-1);
  border-color: var(--color-button-text-border);
  background-color: var(--color-button-text-fill);
  color: var(--color-text-basic);
}
.button--text:hover {
  background-color: var(--color-button-text-fill-hover);
}
.button--text:active {
  background-color: var(--color-button-text-fill-pressed);
}
.button--xsmall {
  min-block-size: var(--size-height-5);
  padding-inline: var(--space-padding-4);
  border-radius: var(--radius-small3);
  font-size: var(--font-size-label-small);
}
.button--small {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-5);
  border-radius: var(--radius-medium1);
  font-size: var(--font-size-label-small);
}
.button--medium {
  min-block-size: var(--size-height-7);
  padding-inline: var(--space-padding-6);
  border-radius: var(--radius-medium2);
  font-size: var(--font-size-label-medium);
}
.button--xlarge {
  min-block-size: var(--size-height-9);
  padding-inline: var(--space-padding-8);
  border-radius: var(--radius-medium4);
}
.button--text.button--small {
  min-block-size: var(--size-height-4);
  padding-inline: var(--space-padding-1);
}
.button:disabled,
.button[aria-disabled="true"],
.icon-button:disabled {
  border-color: var(--color-button-disabled-border);
  background-color: var(--color-button-disabled-fill);
  color: var(--color-text-disabled-on);
  cursor: not-allowed;
}
.button--text:disabled {
  border-color: var(--color-button-text-border);
  background-color: var(--color-button-text-fill);
  color: var(--color-text-disabled);
}
.button__icon {
  inline-size: 1.25em;
  block-size: 1.25em;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.button-group {
  display: flex;
  gap: var(--space-gap-3);
}
.button-group > .button {
  flex: 1 1 0;
}
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--size-height-6);
  block-size: var(--size-height-6);
  padding: 0;
  border-width: var(--border-width-variable-regular);
  border-style: solid;
  border-radius: var(--radius-medium1);
  cursor: pointer;
}
.icon-button--circle {
  border-radius: 50%;
}
.icon-button__tooltip {
  display: none;
  position: absolute;
  margin-block-start: var(--space-gap-3);
  padding: var(--space-padding-2) var(--space-padding-3);
  border-radius: var(--radius-small1);
  background-color: var(--color-surface-inverse);
  color: var(--color-text-basic-inverse);
  font-size: var(--font-size-body-xsmall);
  box-shadow: var(--shadow-3);
}
.icon-button:hover + .icon-button__tooltip,
.icon-button:focus-visible + .icon-button__tooltip,
.icon-button__tooltip:hover {
  display: block;
}
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}
```

## 상태
- **비활성**: button 에 disabled. 다음 단계·제출 버튼에는 쓰지 않는다 — 입력 상태와 관계없이 누를 수 있게 두고 누른 뒤 오류를 안내한다(FORM-080). 비활성 색은 불투명 토큰(button-disabled-*)만 쓴다(COLOR-006). 왜 쓸 수 없는지 버튼 가까이에 텍스트로 알리고 aria-describedby 로 연결한다.
- **처리 중(전송)**: 데이터를 전송하는 버튼은 첫 누름 뒤 응답이 올 때까지 aria-disabled="true" 를 붙이고 두 번째 누름을 무시한다. 초점이 사라지지 않도록 disabled 대신 aria-disabled 를 쓴다(FORM-013). 버튼 안에 작은 스피너를 둔다(STATE-021·022).
- **초점**: 마크업 변화 없음. :focus-visible 에서 외곽선이 보인다(A11Y-016). 아이콘 버튼은 툴팁도 함께 보인다(A11Y-054).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 버튼으로 초점을 옮긴다. 비활성(disabled) 버튼은 건너뛴다. |
| Enter / Space | 버튼 동작을 실행한다. 처리 중(aria-disabled="true")이면 아무것도 하지 않는다(FORM-013). |
| Esc | 아이콘 버튼 툴팁이 보이면 초점을 옮기지 않고 툴팁을 숨긴다(A11Y-010). |

## 동작
- 이동하지 않는 동작(폼 제출·대화상자 열기·기능 실행)에만 버튼을 쓰고 URL 이 바뀌는 이동에는 링크를 쓴다(NAV-047).
- 강조 단계는 화면에서 가장 중요한 행동 하나만 button--primary 로, 중요도가 같은 기능은 윤곽선, 부가 기능은 텍스트 버튼으로 한다(COLOR-015).
- 그룹 안 버튼은 같은 크기로 만들고 강조는 크기가 아니라 스타일로 구분한다(LAYOUT-020). 세로로 쌓으면 최상위 강조 버튼을 맨 위에 둔다(LAYOUT-021).
- 버튼 그룹의 최상위 강조 버튼에 아이콘이 없으면 그룹의 다른 버튼에도 아이콘을 넣지 않는다(COLOR-016).
- 확인 대화상자의 실행 버튼 레이블은 '확인'·'예' 대신 '삭제'·'신청 취소'처럼 실행할 동작을 쓴다(COPY-006).
- 데이터를 전송하는 버튼은 응답이 올 때까지 다시 전송하지 않는다(FORM-013).
- 기능은 클릭(up 이벤트)에서 실행하고 mousedown·pointerdown 에서 실행하지 않는다(A11Y-018).
- 아이콘 버튼은 공통 인지 아이콘(설정·닫기·검색 등)에만 쓰고(COPY-020), 툴팁 없이도 뜻을 알 수 있는 아이콘을 고른다(COPY-049). 툴팁은 호버·초점에서 보이고, 툴팁 위로 포인터를 옮겨도 사라지지 않으며, Esc 로 닫힌다(A11Y-054, A11Y-010). 툴팁을 단 버튼에 title 속성을 함께 쓰지 않는다(A11Y-053).
- 아이콘은 장식으로 처리하고(aria-hidden) 버튼 이름은 텍스트·툴팁으로 준다(A11Y-001, A11Y-025).
- 버튼이 고정 헤더·고정 푸터·플로팅 버튼에 완전히 가려지지 않게 scroll-padding 을 둔다(LAYOUT-001).
- 선명한 화면 모드에서는 테두리 두께 토큰(border-width-variable-regular)이 굵어진다 — 테두리 두께를 이 토큰으로만 지정한다(COLOR-011).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-010 | MUST | 호버나 키보드 초점으로 나타나는 추가 콘텐츠는 초점·포인터를 옮기지 않고 닫을 수 있고(Esc 등), 그 위로 포인터를 옮겨도 사라지지 않으며, 호버·초점이 없어지거나 사용자가 닫거나 정보가 무효가 될 때까지 유지한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-018 | MUST | 단일 포인터로 실행하는 기능은 down 이벤트에서 실행하지 않거나, up 이벤트에서 완료하면서 완료 전 중단·완료 후 되돌리기 수단을 제공하거나, up 이벤트가 down 이벤트의 결과를 되돌리게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-053 | SHOULD | 툴팁 컴포넌트를 단 요소에 title 속성을 함께 쓰지 않는다. |
| A11Y-054 | SHOULD | 텍스트 레이블 없이 아이콘만 있는 메뉴·기능 버튼에는 툴팁을 제공한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-006 | SHOULD | 비활성(disabled) 상태를 표현할 때 알파 값이 1 미만인 색(투명도 색)을 쓰지 않고 팔레트의 불투명 색을 쓴다. |
| COLOR-011 | SHOULD | 선명한 화면 모드에서는 본문의 모든 인라인 링크와 푸터의 모든 링크에 밑줄을 표시하고, 버튼·입력·선택 컴포넌트의 외곽선과 링크 밑줄을 기본 모드보다 굵게 한다. |
| COLOR-015 | SHOULD | 버튼 강조 단계를 주조색 채움 버튼(가장 중요한 행동), 윤곽선 버튼(중간 강조), 텍스트 버튼(가장 낮은 강조) 세 가지로 쓰고, 주조색 채움 버튼은 한 화면 상태에 1개만 둔다. |
| COLOR-016 | SHOULD | 버튼 그룹에서 가장 높은 강조 단계 버튼에 아이콘이 없으면 그 그룹의 다른 버튼에도 아이콘을 넣지 않는다. |
| COPY-006 | SHOULD | 확인 대화상자의 실행 버튼 레이블에는 '확인'·'예'·'네'·'OK' 대신 실행할 동작을 동사로 쓴다(예: '삭제', '신청 취소', '제출'). |
| COPY-020 | MAY | 텍스트 레이블 없는 아이콘 버튼은 설정·닫기·공감처럼 대부분의 사용자가 다른 서비스에서 익혀 의미를 아는 기능에만 쓴다. |
| COPY-025 | MAY | 링크·버튼이거나 그 일부인 이미지에는 그 링크·버튼의 용도·목적·기능과 일치하는 이미지·상징을 쓴다. |
| COPY-049 | SHOULD | 터치가 주 입력인 환경에서는 툴팁이 뜨지 않을 수 있으므로, 툴팁을 다는 아이콘 버튼에는 툴팁 없이도 메뉴·기능의 의미를 알 수 있는 아이콘을 고른다. |
| FORM-013 | SHOULD | 데이터를 전송하는 버튼은 첫 번째 누름 뒤 처리가 끝날 때까지 두 번째 누름(클릭·Enter·Space)으로 다시 전송하지 않게 한다. |
| FORM-080 | SHOULD | 입력 필드의 오류(오류 메시지와 aria-invalid="true")는 사용자가 필드를 벗어날 때(blur)나 입력하는 동안이 아니라 다음 단계·제출 버튼을 눌렀을 때 표시하고, 다음 단계·제출 버튼은 입력 상태와 관계없이 비활성화하지 않는다. 제출 전에는 aria-invalid를 설정하지 않고 aria-describedby로 연결한 role="status" 영역의 텍스트만 바꾸는 조건 안내(입력 중 비밀번호 조건 충족 여부, 아이디 '중복 확인' 버튼 결과)를 허용한다. |
| LAYOUT-001 | MUST | 키보드 초점을 받은 컴포넌트가 작성자가 만든 콘텐츠(고정 헤더·고정 푸터·쿠키 배너·비모달 대화상자 등)에 완전히 가려지지 않게 한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-020 | SHOULD | 그룹으로 묶인 버튼은 모두 같은 크기로 만들고, 특정 버튼의 강조는 크기가 아니라 스타일(채움·윤곽선·텍스트)로 구분한다. |
| LAYOUT-021 | SHOULD | 버튼 그룹을 세로로 배열할 때는 최상위 강조 버튼을 맨 위(첫 번째)에 둔다. |
| MOTION-004 | SHOULD | prefers-reduced-motion: reduce일 때 사용자 상호작용(클릭·탭·스크롤·호버·초점)으로 시작되는 모션 애니메이션 가운데 기능·정보 전달에 필수가 아닌 것은 끄거나 요소의 위치·크기·모양이 변하지 않는 효과로 바꾼다. |
| NAV-047 | SHOULD | 다른 화면·같은 화면의 다른 섹션으로 이동하는 동작에는 a[href] 링크를, 폼 제출·대화상자 열기·기능 실행처럼 이동하지 않는 동작에는 button을 쓴다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |
| SHAPE-003 | SHOULD | % 단위 반경은 프로필 사진·원형 아이콘 버튼처럼 완전한 원형이 필요한 정사각형 요소에만 쓰고, 그 밖의 컴포넌트에는 px 기반 반경 토큰을 쓴다. |
| STATE-021 | SHOULD | 스피너 크기는 배치 유형으로 정한다: 버튼·메뉴 항목·입력 필드 안과 결과 내용을 대신하지 않는 상태 행에는 작은 크기를, 결과가 들어갈 영역의 내용을 대신하는 영역 로딩과 페이지 전체 로딩에는 큰 크기를 쓴다. |
| STATE-022 | SHOULD | 스피너는 처리가 일어나는 영역 안(제출 처리는 제출 버튼 안에 둘 수도 있다)에 두고, 페이지 전체나 맥락이 바뀌는 영역 전체를 불러올 때는 화면 또는 그 영역의 가운데에 둔다. |

## KRDS 키트와의 관계
- 클래스 대응: `.button` ↔ `krds-btn`, `.button--primary` ↔ `krds-btn primary`, `.button--secondary` ↔ `krds-btn secondary`, `.button--tertiary` ↔ `krds-btn tertiary`, `.button--text` ↔ `krds-btn text`, `.button--xsmall` ↔ `krds-btn xsmall`, `.button--small` ↔ `krds-btn small`, `.button--medium` ↔ `krds-btn medium`, `.button--xlarge` ↔ `krds-btn xlarge`, `.button__icon` ↔ `svg-icon`, `.icon-button` ↔ `krds-btn icon`, `.icon-button--circle` ↔ `krds-btn icon border`
- KRDS 키트의 도움말 아이콘 버튼(btn-help-exec)에는 type 속성이 없다 — 이 규격은 모든 버튼에 type 을 쓴다(폼 안에서 의도하지 않은 제출 방지).
- KRDS 키트 아이콘 버튼은 숨긴 텍스트(sr-only)로만 이름을 주고 툴팁이 없다 — 이 규격은 보이는 툴팁을 연결해 이름으로 쓴다(A11Y-054).
- KRDS 키트 아이콘 버튼의 원형 모양은 border 클래스로 표현한다 — 이 규격은 원형 반경(50%)을 허용 클래스 icon-button--circle 로만 준다(SHAPE-003).
- KRDS 키트는 :focus 에서 배경색을 pressed 색으로 바꾼다 — 이 규격은 :focus-visible 외곽선으로 초점을 표시하고 배경색 변화를 초점 표시로 쓰지 않는다(A11Y-016).
