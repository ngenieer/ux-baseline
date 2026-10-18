# 플로팅 버튼 (`.floating-button`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

사용자가 화면에서 반복하는 주요 행동 하나를 스크롤과 관계없이 화면 오른쪽 아래에 늘 보여줄 때 쓴다.

## 대신 쓸 것
- 자주 쓰는 주요 행동이 여러 개인 경우 → 메뉴·탭바 (LAYOUT-022)
- 지도·캘린더·이미지 편집처럼 제스처 조작이 많은 화면 → 화면 안의 일반 button (LAYOUT-022)
- 만족도 평가 같은 사용자 피드백 요소 → 본문 아래에 두는 피드백 컴포넌트(화면에 고정하지 않는다) (STATE-004)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(컨테이너) | `.floating-button` | `a 또는 button(단일형), div(확장형)` | 예 | 단일형은 화면 이동이면 a[href], 기능 실행이면 button 이다(NAV-047). 확장형은 트리거와 항목 목록을 담는 div 에 floating-button--expandable 을 더한다. position fixed 로 화면 오른쪽 아래에 두고 다른 콘텐츠보다 위 레이어에 놓는다(LAYOUT-023). 한 화면에 1개만 둔다(LAYOUT-024). |
| 아이콘 | `.floating-button__icon` | `svg` | 예 | 버튼 이름의 의미를 나타내는 장식 아이콘(aria-hidden). 모든 화면에서 같은 기능에 같은 아이콘을 쓴다(COPY-004). |
| 레이블 | `.floating-button__label` | `span` | 예 | 보이는 버튼 이름. 모든 화면에서 같은 기능에 같은 레이블을 쓴다(COPY-004). |
| 확장형 트리거 | `.floating-button__trigger` | `button` |  | 확장형에서만 쓴다. 루트 div 안에서 루트와 같은 모양(채움·원형)을 쓰고 aria-expanded·aria-controls 를 가진다. 펼치면 아이콘을 '+' 에서 'X' 로 바꾼다(KRDS 구조). |
| 확장 항목 목록 | `.floating-button__menu` | `ul` |  | 확장형에서만 쓴다. 항목은 3개 이하, 플로팅 버튼을 누른 뒤 한 번 더 눌러 실행한다(터치 깊이 2수준 이하, LAYOUT-024). |
| 확장 항목 | `.floating-button__item` | `a 또는 button` |  | 확장형의 개별 동작. 이동이면 a, 기능 실행이면 button(NAV-047). |

## 표준 마크업

```html
<a class="floating-button" href="/applications/new">
  <svg class="floating-button__icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
  <span class="floating-button__label">신청서 작성</span>
</a>
```

## 표준 CSS (토큰만 사용)

```css
.floating-button {
  position: fixed;
  inset-inline-end: var(--space-scale-8);
  inset-block-end: var(--space-scale-8);
  z-index: 100;
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2);
  min-block-size: var(--size-height-7);
  padding-inline: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-button-primary-fill);
  border-radius: var(--radius-max);
  background-color: var(--color-button-primary-fill);
  color: var(--color-text-inverse-static);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
  text-decoration-line: none;
  box-shadow: var(--shadow-2);
  transition: background-color var(--motion-duration-fast) var(--motion-easing-standard);
}
.floating-button:hover {
  background-color: var(--color-button-primary-fill-hover);
}
.floating-button:active {
  background-color: var(--color-button-primary-fill-pressed);
}
.floating-button:focus-visible,
.floating-button__item:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.floating-button--expandable {
  flex-direction: column;
  align-items: flex-end;
  padding: 0;
  border-style: none;
  background-color: transparent;
  box-shadow: none;
}
.floating-button__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2);
  min-block-size: var(--size-height-7);
  padding-inline: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-button-primary-fill);
  border-radius: var(--radius-max);
  background-color: var(--color-button-primary-fill);
  color: var(--color-text-inverse-static);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
  box-shadow: var(--shadow-2);
  cursor: pointer;
}
.floating-button__trigger:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.floating-button__icon {
  inline-size: var(--size-height-4);
  block-size: var(--size-height-4);
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.floating-button__menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-gap-3);
  margin: 0 0 var(--space-gap-4);
  padding: 0;
  list-style: none;
}
.floating-button__item {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-max);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  box-shadow: var(--shadow-2);
}
html:has(.floating-button) {
  scroll-padding-block-end: var(--space-scale-21);
}
@media (prefers-reduced-motion: reduce) {
  .floating-button {
    transition: none;
  }
}
```

## 상태
- **확장형(닫힘)**: 루트를 div.floating-button.floating-button--expandable 컨테이너로 바꾸고 그 안에 button.floating-button__trigger(aria-expanded="false", aria-controls=목록 id)와 hidden 을 준 ul.floating-button__menu 를 둔다. 트리거 아이콘은 '+', 레이블은 펼침 상태와 관계없이 같은 이름을 쓴다(COPY-004).
- **확장형(열림)**: 트리거에 aria-expanded="true", 목록의 hidden 을 없애고 아이콘을 'X' 로 바꾼다. 항목은 3개 이하(LAYOUT-024).
- **탭바가 있는 화면**: 마크업 변화 없음. inset-block-end 를 탭바 높이에 간격(space-scale-8)을 더한 값으로 바꿔 탭바 위 오른쪽 아래에 둔다(LAYOUT-023).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 플로팅 버튼으로 초점을 옮긴다. 플로팅 버튼은 본문 마지막 콘텐츠 뒤의 순서로 둔다(DOM 에서 main 콘텐츠 다음). |
| Enter (a) / Enter·Space (button) | 단일형은 동작을 실행한다. 확장형 트리거는 항목 목록을 펼치거나 접는다. |
| Esc | 확장형 목록이 펼쳐져 있으면 접고 초점을 트리거로 옮긴다. |

## 동작
- 사용자가 반복하는 주요 행동이 하나일 때만 쓰고, 주요 행동이 여럿이거나 제스처 중심 화면에서는 쓰지 않는다(LAYOUT-022).
- 화면 오른쪽 아래에 고정하고, 하단 탭바가 있으면 탭바와 겹치지 않게 탭바 위에 둔다(LAYOUT-023).
- 한 화면에 플로팅 버튼은 1개만 두고, 동작이 2개 이상이면 확장형 하나로 묶어 항목 3개 이하·터치 깊이 2수준 이하로 한다(LAYOUT-024).
- 모든 화면에서 같은 주요 작업으로 연결하고 같은 레이블·아이콘을 쓴다(COPY-004).
- 고정된 플로팅 버튼이 키보드 초점을 받은 다른 요소를 완전히 가리지 않도록 문서에 scroll-padding-block-end 를 둔다(LAYOUT-001). 탭바가 있으면 탭바 높이만큼 더한다.
- 화면 이동이면 링크, 기능 실행이면 버튼 요소를 쓴다(NAV-047).
- 확장형 트리거는 aria-expanded 로 펼침 상태를 보조기술에 알린다(A11Y-025).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-011 | SHOULD | 선명한 화면 모드에서는 본문의 모든 인라인 링크와 푸터의 모든 링크에 밑줄을 표시하고, 버튼·입력·선택 컴포넌트의 외곽선과 링크 밑줄을 기본 모드보다 굵게 한다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| LAYOUT-001 | MUST | 키보드 초점을 받은 컴포넌트가 작성자가 만든 콘텐츠(고정 헤더·고정 푸터·쿠키 배너·비모달 대화상자 등)에 완전히 가려지지 않게 한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-022 | MAY | 플로팅 버튼은 사용자가 반복하는 주요 행동이 하나일 때만 쓰고, 주요 행동이 여럿이거나 지도·캘린더·이미지 편집처럼 제스처 조작이 많은 화면에서는 쓰지 않는다. |
| LAYOUT-023 | SHOULD | 플로팅 버튼은 화면 오른쪽 아래에 두고, 하단 탭바가 있으면 탭바와 겹치지 않게 탭바 위 오른쪽 아래에 둔다. |
| LAYOUT-024 | SHOULD | 플로팅 동작이 2개 이상 필요하면 확장형 플로팅 버튼 하나로 묶고, 확장 항목은 3개 이하, 터치 깊이는 2수준 이하로 한다. |
| MOTION-004 | SHOULD | prefers-reduced-motion: reduce일 때 사용자 상호작용(클릭·탭·스크롤·호버·초점)으로 시작되는 모션 애니메이션 가운데 기능·정보 전달에 필수가 아닌 것은 끄거나 요소의 위치·크기·모양이 변하지 않는 효과로 바꾼다. |
| NAV-047 | SHOULD | 다른 화면·같은 화면의 다른 섹션으로 이동하는 동작에는 a[href] 링크를, 폼 제출·대화상자 열기·기능 실행처럼 이동하지 않는 동작에는 button을 쓴다. |
| SHAPE-004 | MAY | 그림자는 정의된 단계 토큰만 쓰고 단계를 용도에 고정한다(KRDS: 셀렉트 shadow2, 툴팁 shadow3, 모달 shadow4와 딤드, 긴급 공지 shadow2와 고도 -1 표면). |
| STATE-004 | SHOULD | 만족도 평가 같은 사용자 피드백 요소는 본문 아래(화면 너비가 좁으면 반드시 본문 아래) 또는 본문 옆 사이드 영역에 두고, 버튼으로 축약해 화면에 고정(플로팅)하지 않으며, 새 기능에 대한 의견을 물을 때는 사용자가 그 기능 이용을 마친 뒤에 표시한다. |

## KRDS 키트와의 관계
