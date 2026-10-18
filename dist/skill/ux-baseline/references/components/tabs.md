# 탭 (`.tabs`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

같은 맥락의 콘텐츠를 성격이 다른 여러 묶음으로 나눠, 한 번에 한 묶음만 보여 주고 사용자가 묶음을 바꿔 보게 할 때 쓴다.

## 대신 쓸 것
- 상세 정보 페이지의 본문 섹션을 나누는 경우(섹션 간 비교가 필요 없고 내용이 복잡한 경우는 예외) → 한 화면에 이어 쓴 섹션 + 콘텐츠 내 탐색 (LAYOUT-008)
- 순서대로 진행해야 하는 절차 → 단계 표시기가 있는 다단계 폼
- 좁은 화면 하단에 고정하는 앱형 전역 메뉴 → 탭바 (NAV-067)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.tabs` | `div` | 예 |  |
| 탭 목록 | `.tabs__list` | `div[role=tablist]` | 예 | aria-label 또는 aria-labelledby 로 탭 묶음의 이름을 준다(A11Y-025). 패널 바로 위에 붙인다(LAYOUT-041). |
| 탭 | `.tabs__tab` | `button[role=tab]` | 예 | aria-selected·aria-controls 를 가진다. 선택되지 않은 탭은 tabindex="-1" 이다. 비활성(disabled) 상태를 두지 않는다(STATE-017). |
| 탭 패널 | `.tabs__panel` | `div[role=tabpanel]` | 예 | aria-labelledby 로 탭과 연결하고 tabindex="0" 으로 초점을 받을 수 있게 한다. 선택되지 않은 패널은 hidden. |

## 표준 마크업

```html
<div class="tabs">
  <div class="tabs__list" role="tablist" aria-label="여권 발급 신청 방법">
    <button type="button" class="tabs__tab" role="tab" id="passport-tab-online" aria-selected="true" aria-controls="passport-panel-online">온라인 신청</button>
    <button type="button" class="tabs__tab" role="tab" id="passport-tab-visit" aria-selected="false" aria-controls="passport-panel-visit" tabindex="-1">방문 신청</button>
    <button type="button" class="tabs__tab" role="tab" id="passport-tab-abroad" aria-selected="false" aria-controls="passport-panel-abroad" tabindex="-1">재외공관 신청</button>
  </div>
  <div class="tabs__panel" role="tabpanel" id="passport-panel-online" aria-labelledby="passport-tab-online" tabindex="0">
    <p>정부24에서 본인 인증 후 신청서를 작성합니다. 사진은 최근 6개월 안에 찍은 것을 올려 주세요.</p>
  </div>
  <div class="tabs__panel" role="tabpanel" id="passport-panel-visit" aria-labelledby="passport-tab-visit" tabindex="0" hidden>
    <p>가까운 시·군·구청 여권 민원실에 신분증과 사진 1장을 가지고 방문해 주세요.</p>
  </div>
  <div class="tabs__panel" role="tabpanel" id="passport-panel-abroad" aria-labelledby="passport-tab-abroad" tabindex="0" hidden>
    <p>현재 이 방법으로 신청할 수 있는 지역이 없습니다. 거주 국가의 재외공관 누리집에서 일정을 확인해 주세요.</p>
  </div>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.tabs__list {
  display: flex;
  gap: var(--space-gap-3);
  border-block-end: var(--border-width-static-regular) solid var(--color-border-gray);
}
.tabs__tab {
  min-block-size: var(--size-height-7);
  padding-inline: var(--space-padding-2);
  border: 0;
  border-block-end: var(--border-width-static-medium) solid transparent;
  background-color: var(--color-action-secondary);
  color: var(--color-text-subtle);
  font-family: inherit;
  font-size: var(--font-size-heading-xsmall);
  font-weight: var(--font-weight-regular);
  cursor: pointer;
}
.tabs__tab:hover {
  background-color: var(--color-action-secondary-hover);
}
.tabs__tab[aria-selected="true"] {
  border-block-end-color: var(--color-action-secondary-active);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-bold);
}
.tabs__tab:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: calc(var(--space-scale-2) * -1);
}
.tabs__panel {
  padding-block-start: var(--space-padding-8);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
.tabs__panel:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **선택됨**: 탭에 aria-selected="true", tabindex 제거, 연결된 패널의 hidden 제거. 나머지 탭은 aria-selected="false"·tabindex="-1", 패널은 hidden. 선택 탭은 색 외에 밑줄(2px)과 굵기로 구분한다(COLOR-001, COLOR-003).
- **콘텐츠 없음**: 탭을 비활성으로 만들지 않는다. 탭을 빼거나, 패널에 콘텐츠가 없는 이유를 텍스트로 쓴다(STATE-017).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 탭 목록에 들어오면 선택된 탭에 초점이 간다. 한 번 더 누르면 선택된 탭 패널로 간다. 초점 표시가 보인다(A11Y-016). |
| → / ← | 다음·이전 탭으로 초점을 옮기고 그 탭을 선택한다(자동 활성화). 끝에서 처음으로, 처음에서 끝으로 순환한다. |
| Home / End | 첫 번째·마지막 탭으로 초점을 옮기고 선택한다. |
| Enter / Space | 패널 표시에 시간이 걸려 수동 활성화 방식을 쓰는 경우, 초점이 있는 탭을 선택한다. |

## 동작
- 탭을 선택하면 aria-selected·tabindex·패널 hidden 을 함께 바꾼다(로빙 tabindex). 모든 탭 전환을 키보드만으로 할 수 있게 한다(A11Y-011, A11Y-025).
- 탭 목록과 선택된 패널 사이에 다른 콘텐츠를 두지 않는다(LAYOUT-041).
- 탭을 중첩하지 않는다. 불가피하면 안쪽 탭의 배경·테두리·글자 크기·인디케이터 중 하나 이상을 바깥 탭과 다르게 한다(LAYOUT-042). 탭 패널 안에 아코디언을 넣지 않는다(LAYOUT-036).
- 탭 목록이 컨테이너 너비보다 넓어지면 숨은 탭을 여는 버튼이나 좌·우 이동 버튼을 보인다(NAV-049).
- 탭에 disabled·aria-disabled 를 쓰지 않는다(STATE-017).
- 상세 정보 페이지 본문을 탭으로 나누지 않는다(LAYOUT-008).
- 여러 페이지에 같은 탭 묶음이 반복되면 탭 순서를 페이지마다 같게 둔다(NAV-004).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| LAYOUT-008 | MAY | 상세 정보 페이지는 본문을 탭으로 나누지 않고 한 화면에 이어서 제공하며, 주요 단락 이동은 콘텐츠 내 탐색으로 한다. |
| LAYOUT-036 | MAY | 상위나 하위 요소에 이미 아코디언이나 탭이 있으면 아코디언을 쓰지 않는다. |
| LAYOUT-041 | SHOULD | 탭과 탭 패널을 인접하게 배치해 패널이 선택된 탭의 내용임을 시각적으로 드러낸다. |
| LAYOUT-042 | SHOULD | 탭을 중첩하지 않고, 중첩이 불가피하면 수준별 탭 스타일을 서로 다르게 한다. |
| NAV-004 | MUST | 여러 페이지에 반복되는 내비게이션은 사용자가 바꾸지 않는 한 매번 같은 상대 순서로 둔다. |
| NAV-049 | SHOULD | 탭 목록이 컨테이너 너비 안에 다 표시되지 않으면 숨은 탭을 여는 팝업 버튼이나 탭 목록을 좌우로 이동하는 컨트롤을 제공한다. |
| NAV-067 | MAY | 하단 탭바는 좁은 화면(RESP-004의 모바일·태블릿 구간)에서만 쓰고, 그보다 넓은 화면에서는 메인 메뉴를 쓴다. |
| STATE-017 | SHOULD | 탭에 비활성(사용 불가) 상태를 쓰지 않고, 표시할 콘텐츠가 없는 탭은 삭제하거나 그 탭의 패널에 콘텐츠가 없는 이유를 텍스트로 표시한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.tabs` ↔ `krds-tab-area`, `.tabs__list` ↔ `tab line`, `.tabs__tab` ↔ `btn-tab`, `.tabs__panel` ↔ `tab-conts`
- KRDS 키트는 role="tab" 을 li 에 주고 그 안에 button 을 둔다 — 탭 안에 대화형 요소가 중첩되고 초점이 button 에 가서 탭 역할이 전달되지 않으므로, 이 규격은 button 에 role="tab" 을 준다(A11Y-025).
- KRDS 키트는 선택 상태를 aria-selected 와 숨긴 텍스트 '선택됨' 으로 이중 전달하고, 탭에 tabindex 관리가 없다 — 이 규격은 aria-selected 와 로빙 tabindex 만 쓴다(A11Y-025, A11Y-011).
- KRDS 키트는 패널을 section 으로 쓰고 숨긴 h3 를 넣는다 — 이 규격은 role="tabpanel" 과 aria-labelledby 로 이름을 준다(A11Y-025).
- KRDS 키트 CSS 는 탭 disabled 스타일을 제공한다 — 이 규격은 탭 비활성 상태를 두지 않는다(STATE-017).
