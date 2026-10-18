# 바텀시트 (`.bottom-sheet`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

현재 화면을 유지한 채 옵션 선택·부가 정보 확인 같은 짧은 상호작용을 화면 아래에서 올라오는 시트로 처리할 때 쓴다.

## 대신 쓸 것
- 오래 검토해야 하는 정보, 항상 보여야 하는 정보·도구, 서비스 절차의 한 단계 → 본문 영역 또는 별도 화면 (STATE-035)
- 반드시 확인·결정해야 하는 내용 → 모달 (STATE-003)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(시트) | `.bottom-sheet` | `dialog` | 예 | dialog.showModal() 로 열어 시트 밖을 inert 로 만들고 ::backdrop 딤드를 한 겹 그린다(SHAPE-005). aria-labelledby 로 제목을 연결한다. |
| 손잡이 | `.bottom-sheet__handle` | `span` |  | 끌어서 닫기·높이 조절을 알리는 장식. aria-hidden="true". 끌기로 하는 기능은 모두 버튼으로도 할 수 있어야 한다(A11Y-017, A11Y-021). |
| 헤더 | `.bottom-sheet__header` | `div` | 예 | 제목 → 닫기 버튼 순서로 마크업한다. 닫기 버튼은 시트 상단(헤더)에 둔다(STATE-033). DOM 순서 = 시각 순서(A11Y-008). |
| 제목 | `.bottom-sheet__title` | `h2` | 예 |  |
| 닫기 버튼 | `.bottom-sheet__close` | `button` | 예 | 접근 가능한 이름 '닫기'. 스와이프와 별도로 항상 둔다(STATE-033). 선택을 확정하는 시트에서는 취소와 같다(STATE-011). |
| 본문 | `.bottom-sheet__body` | `div` | 예 | 넘치면 이 영역만 세로 스크롤한다. 스크롤바를 숨기지 않는다. |
| 푸터 | `.bottom-sheet__footer` | `div` |  | 선택을 확정하는 버튼을 둔다. 즉시 적용형 시트(목록에서 고르면 바로 닫힘)에는 생략한다. |
| 액션 버튼 | `.bottom-sheet__action` | `button` |  |  |
| 겹침 단계 표시 | `.bottom-sheet__step` | `p` |  | 불가피하게 시트를 겹칠 때만 넣는다(STATE-034). 예 '2/3 단계'. |

## 표준 마크업

```html
<button class="bottom-sheet__trigger" type="button" aria-haspopup="dialog" aria-controls="sort-sheet">정렬 기준 변경</button>
<dialog class="bottom-sheet" id="sort-sheet" aria-labelledby="sort-sheet-title" open>
  <span class="bottom-sheet__handle" aria-hidden="true"></span>
  <div class="bottom-sheet__header">
    <h2 class="bottom-sheet__title" id="sort-sheet-title">정렬 기준</h2>
    <button class="bottom-sheet__close" type="button" aria-label="닫기">
      <svg class="bottom-sheet__close-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </div>
  <div class="bottom-sheet__body">
    <form id="sort-sheet-form" method="dialog">
      <fieldset class="bottom-sheet__options">
        <legend class="bottom-sheet__legend">목록 정렬 기준을 선택해 주세요.</legend>
        <label class="bottom-sheet__option"><input type="radio" name="sort" value="latest" checked> 최신순</label>
        <label class="bottom-sheet__option"><input type="radio" name="sort" value="oldest"> 오래된순</label>
        <label class="bottom-sheet__option"><input type="radio" name="sort" value="name"> 이름순</label>
      </fieldset>
    </form>
  </div>
  <div class="bottom-sheet__footer">
    <button class="bottom-sheet__action" type="submit" form="sort-sheet-form">적용</button>
  </div>
</dialog>
```

## 표준 CSS (토큰만 사용)

```css
.bottom-sheet__trigger {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
}
.bottom-sheet {
  inline-size: 100%;
  max-inline-size: 100%;
  max-block-size: 90dvh;
  margin: auto 0 0;
  padding: 0;
  border: var(--border-width-variable-regular) solid var(--color-border-gray);
  border-block-end: 0;
  border-start-start-radius: var(--radius-xlarge1);
  border-start-end-radius: var(--radius-xlarge1);
  background-color: var(--color-surface-white-subtler);
  box-shadow: var(--shadow-4);
  color: var(--color-text-basic);
}
.bottom-sheet[open] {
  display: flex;
  flex-direction: column;
}
.bottom-sheet::backdrop {
  background-color: var(--color-background-dim);
}
.bottom-sheet__handle {
  align-self: center;
  inline-size: var(--space-scale-16);
  block-size: var(--space-scale-3);
  margin-block-start: var(--space-gap-3);
  border-radius: var(--radius-max);
  background-color: var(--color-element-gray);
}
.bottom-sheet__header {
  display: flex;
  align-items: center;
  gap: var(--space-gap-5);
  padding: var(--space-padding-6);
}
.bottom-sheet__title {
  flex: 1;
  margin: 0;
  font-size: var(--font-size-heading-small);
  font-weight: var(--font-weight-bold);
  line-height: var(--font-line-height-base);
}
.bottom-sheet__close {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-inline-size: var(--size-height-6);
  min-block-size: var(--size-height-6);
  padding: 0;
  border: 0;
  border-radius: var(--radius-medium3);
  background-color: transparent;
  color: var(--color-icon-gray);
}
.bottom-sheet__close-icon {
  inline-size: var(--size-height-4);
  block-size: var(--size-height-4);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.bottom-sheet__body {
  flex: 1;
  min-block-size: 0;
  overflow-y: auto;
  padding: 0 var(--space-padding-6);
  font-size: var(--font-size-body-medium);
}
.bottom-sheet__options {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  margin: 0;
  padding: 0;
  border: 0;
}
.bottom-sheet__legend {
  margin-block-end: var(--space-gap-3);
  padding: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.bottom-sheet__option {
  display: flex;
  align-items: center;
  gap: var(--space-gap-3);
  min-block-size: var(--size-height-6);
}
.bottom-sheet__step {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-small);
}
.bottom-sheet__footer {
  display: flex;
  gap: var(--space-gap-3);
  padding: var(--space-padding-10) var(--space-padding-6) var(--space-padding-6);
}
.bottom-sheet__action {
  flex: 1;
  min-block-size: var(--size-height-7);
  padding-inline: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-button-primary-fill);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-primary-fill);
  color: var(--color-text-basic-inverse);
  font-size: var(--font-size-label-large);
}
.bottom-sheet__trigger:focus-visible,
.bottom-sheet__close:focus-visible,
.bottom-sheet__action:focus-visible,
.bottom-sheet__option input:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
@media (prefers-reduced-motion: no-preference) {
  .bottom-sheet[open] {
    animation-name: bottom-sheet-enter;
    animation-duration: var(--motion-duration-base);
    animation-timing-function: var(--motion-easing-enter);
  }
}
@keyframes bottom-sheet-enter {
  from {
    transform: translateY(100%);
  }
}
```

## 상태
- **열림**: 열기 버튼을 누르면 dialog.showModal() 을 호출한다. 예시 markup 의 open 속성은 검사용 정적 표현이다.
- **겹친 시트(불가피한 경우)**: 맨 위 시트 헤더 아래에 bottom-sheet__step('2/3 단계' 등)을 넣고, 닫기 버튼을 '이 시트 닫기'(현재 시트만)와 '전체 닫기' 두 개로 나눈다. 아래 시트의 ::backdrop 은 숨겨 딤드를 맨 위 시트 아래 한 겹만 보인다(CF-017).
- **즉시 적용형**: 푸터를 빼고 옵션을 고르면 바로 적용하고 시트를 닫는다. 이때 옵션은 라디오가 아니라 button 목록으로 만든다(라디오 값 변경만으로 시트가 닫히면 FORM-002 위반).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 시트 안에서만 초점이 순환한다(모달과 같음). 순서는 닫기 → 본문 → 푸터. |
| Esc | 시트를 닫는다(닫기 버튼과 같은 동작). |
| ↑ / ↓ / ← / → | 라디오 그룹 안에서 이전·다음 옵션을 선택한다(브라우저 기본 동작). |

## 동작
- 사용자가 버튼을 실행했을 때만 연다(A11Y-058). 열면 초점을 선택된 옵션(없으면 첫 옵션)으로 옮기고, 닫으면 연 버튼으로 돌려놓는다.
- 끌어 내려 닫기·끌어 올려 높이 키우기는 보조 수단이다. 같은 결과를 닫기 버튼과 버튼 조작으로 낼 수 있어야 한다(A11Y-017, A11Y-021, STATE-033).
- 닫기·Esc·끌어 내리기는 선택을 적용하지 않고 닫는다 — 취소와 같다(STATE-011). 적용은 '적용' 버튼으로만 한다.
- 시트는 한 번에 1개만 띄운다. 겹칠 수밖에 없으면 단계 표시와 '현재 시트만 닫기'·'전체 닫기'를 넣고, 딤드는 맨 위 시트 아래 한 겹만 표시한다(STATE-034, SHAPE-005, CF-017).
- 브라우저 뒤로가기는 앱 안 뒤로가기와 같은 결과를 낸다 — 시트를 열 때 history 항목을 추가했다면 뒤로가기는 시트만 닫는다(NAV-066).
- 시트에는 짧은 상호작용만 둔다. 절차의 한 단계·장문 안내를 넣지 않는다(STATE-035).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-012 | MUST | 키보드 초점이 들어갈 수 있는 모든 컴포넌트에서 키보드만으로 초점을 빼낼 수 있게 하고, 수정자 없는 방향키·Tab 같은 표준 방법이 아니면 빠져나오는 방법을 안내한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-017 | MUST | 다중 포인터(핀치·두 손가락) 또는 경로 기반 제스처(스와이프·그리기)로 하는 모든 기능을 경로 없는 단일 포인터 조작(탭·클릭)으로도 할 수 있게 한다. |
| A11Y-021 | MUST | 드래그로 하는 모든 기능을 드래그 없는 단일 포인터 조작(클릭·탭)으로도 할 수 있게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-029 | SHOULD | 모달이 열려 있는 동안 키보드 초점과 스크린 리더 가상 초점이 모달 안에서만 이동하게 하고, 마지막 상호작용 요소에서 Tab을 누르면 첫 요소로, 첫 요소에서 Shift+Tab을 누르면 마지막 요소로 초점을 옮긴다. |
| A11Y-058 | MUST | 사용자가 링크·버튼을 실행하지 않았는데 새 창·새 탭·팝업 창을 열지 않는다(페이지를 열 때 뜨는 팝업 창 포함). |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| MOTION-004 | SHOULD | prefers-reduced-motion: reduce일 때 사용자 상호작용(클릭·탭·스크롤·호버·초점)으로 시작되는 모션 애니메이션 가운데 기능·정보 전달에 필수가 아닌 것은 끄거나 요소의 위치·크기·모양이 변하지 않는 효과로 바꾼다. |
| MOTION-010 | MUST | 애니메이션·전환의 지속 시간(duration)과 이징(easing)은 모션 디자인 토큰(CSS 변수)에서만 고르고 CSS·JS에 ms 값이나 cubic-bezier() 값을 직접 쓰지 않는다. |
| MOTION-011 | SHOULD | UI 전환 애니메이션의 지속 시간은 100ms 이상 500ms 이하로 하고, 체크박스·토글 같은 단순 상태 피드백은 100ms, 모달·드로어처럼 화면을 크게 바꾸는 전환은 200ms 이상 300ms 이하로 한다. |
| NAV-066 | SHOULD | 같은 화면에서 앱 내 뒤로가기 버튼과 시스템 뒤로가기(브라우저 뒤로 버튼·뒤로 제스처)가 서로 다른 화면으로 이동하거나 서로 다른 동작(한쪽은 팝업 닫기, 다른 쪽은 페이지 이탈)을 하지 않게 한다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |
| SHAPE-004 | MAY | 그림자는 정의된 단계 토큰만 쓰고 단계를 용도에 고정한다(KRDS: 셀렉트 shadow2, 툴팁 shadow3, 모달 shadow4와 딤드, 긴급 공지 shadow2와 고도 -1 표면). |
| SHAPE-005 | SHOULD | 배경 딤드는 모달·바텀시트·알림 팝업처럼 주의를 집중시켜야 하는 레이어에만 쓰고, 한 번에 한 겹만 표시하며, 딤드 위에서도 닫기 버튼 같은 조작 영역이 분명히 보이게 한다. |
| STATE-011 | SHOULD | 입력을 제출하거나 행동을 확정하는 모달·바텀시트의 닫기(X) 버튼은 취소 버튼과 같이 동작해 입력·선택한 내용을 적용하지 않고 창을 닫게 한다. |
| STATE-033 | SHOULD | 바텀시트에는 스와이프와 별도로 '닫기' 버튼(텍스트 '닫기' 또는 접근 가능한 이름이 '닫기'인 X 아이콘 버튼)을 넣고, 그 버튼을 시트 상단에 둔다. |
| STATE-034 | SHOULD | 바텀시트는 한 번에 1개만 띄우고, 불가피하게 여러 개를 겹칠 때는 현재 단계를 표시하며 닫기 동작을 '현재 시트만 닫기'와 '전체 닫기'로 나눠 제공하고, 배경 딤드는 한 겹만 표시한다. |
| STATE-035 | MAY | 바텀시트는 현재 화면을 유지한 채 하는 일시적인 짧은 상호작용(옵션 선택·부가 정보 확인)에만 쓰고, 오래 검토해야 하는 정보, 항상 필요한 정보·도구, 서비스 절차의 한 단계에는 쓰지 않는다. |

## KRDS 키트와의 관계
- 클래스 대응: `.bottom-sheet` ↔ `krds-modal[data-type=bottom-sheet] modal-content`, `.bottom-sheet__header` ↔ `modal-header`, `.bottom-sheet__title` ↔ `modal-title`, `.bottom-sheet__close` ↔ `btn-close`, `.bottom-sheet__body` ↔ `modal-conts`, `.bottom-sheet__footer` ↔ `modal-btn btn-wrap`
- KRDS 키트 바텀시트는 모달(krds-modal data-type=bottom-sheet)과 같은 마크업이라 닫기 버튼이 DOM 마지막에 있고 aria-modal 이 없다 — 이 규격은 닫기 버튼을 헤더 안 제목 다음에 두고(STATE-033, A11Y-008) showModal() 로 연다(A11Y-029).
- KRDS 키트는 bottom 값을 -100%→0 으로 바꿔 시트를 올린다 — 이 규격은 transform 으로 움직이고 모션 줄이기 설정에서는 끈다(MOTION-004, MOTION-010).
