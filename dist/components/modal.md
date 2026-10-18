# 모달 (`.modal`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

현재 과업을 잠시 멈추고 사용자가 확인·결정·짧은 입력을 해야 할 때 기본 창 위에 띄우는 대화상자다.

## 대신 쓸 것
- 2단계 이상 이어지는 입력·선택 절차 → 별도 화면(단계 표시기 사용) (STATE-013)
- 사용자 행동의 결과를 한 줄로 알리기만 하면 되는 경우 → 토스트 (COPY-050)
- 확인할 필요 없는 결과 알림에 되돌리기·재시도 같은 행동 1개를 붙이는 경우 → 스낵바 (STATE-039)
- 현재 화면을 유지한 채 하는 옵션 선택·부가 정보 확인(모바일) → 바텀시트 (STATE-035)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(대화상자) | `.modal` | `dialog` | 예 | dialog.showModal() 로 연다. 브라우저가 모달 밖을 inert 로 만들고 ::backdrop 딤드를 한 겹 그린다(A11Y-029, SHAPE-005). aria-labelledby 로 제목을, 확인 대화상자는 aria-describedby 로 결과 설명 문단을 연결한다. |
| 헤더 | `.modal__header` | `div` | 예 | 제목 → 닫기(X) 순서로 마크업한다. 화면에서 제목은 왼쪽, 닫기 버튼은 오른쪽 위에 있으므로 DOM 순서와 시각 순서가 같다(A11Y-008, A11Y-015). |
| 제목 | `.modal__title` | `h2` | 예 | 모달이 실행할 기능·확인할 정보를 밝힌다(COPY-003). 페이지 제목 계층에 맞춰 h2 를 기본으로 한다. |
| 닫기 버튼 | `.modal__close` | `button` |  | 접근 가능한 이름 '닫기'(aria-label). 승인 요청 모달(modal--approval)에는 넣지 않는다(STATE-012). 제출·확정 모달에서는 취소와 같은 동작을 한다(STATE-011). |
| 본문 | `.modal__body` | `div` | 예 | 모달 목적과 관련된 내용과 입력폼 컨트롤만 둔다(COPY-023, LAYOUT-034). 입력 컴포넌트는 5개 이하, 탭·아코디언·단계 표시기는 넣지 않는다(FORM-011). 세로로 넘치면 이 영역만 스크롤한다(LAYOUT-035). |
| 푸터 | `.modal__footer` | `div` | 예 | 확정·취소 액션 버튼은 항상 여기에 둔다. 본문 스크롤과 관계없이 보인다(LAYOUT-034, LAYOUT-035). |
| 액션 버튼 | `.modal__action` | `button` | 예 | 실행 버튼 레이블은 '확인·예' 대신 동작 동사로 쓴다(COPY-006). 강조 버튼은 modal__action--primary. |

## 표준 마크업

```html
<button class="modal__trigger" type="button" aria-haspopup="dialog" aria-controls="draft-delete-modal">임시 저장 글 삭제</button>
<dialog class="modal" id="draft-delete-modal" aria-labelledby="draft-delete-title" aria-describedby="draft-delete-desc" open>
  <div class="modal__header">
    <h2 class="modal__title" id="draft-delete-title">임시 저장 글을 삭제할까요?</h2>
    <button class="modal__close" type="button" aria-label="닫기">
      <svg class="modal__close-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </div>
  <div class="modal__body">
    <p id="draft-delete-desc">'전입 신고' 임시 저장 글 1건을 삭제합니다. 삭제한 글은 되돌릴 수 없습니다.</p>
  </div>
  <div class="modal__footer">
    <button class="modal__action" type="button" autofocus>취소</button>
    <button class="modal__action modal__action--primary" type="button">삭제</button>
  </div>
</dialog>
```

## 표준 CSS (토큰만 사용)

```css
.modal__trigger {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
}
.modal {
  inline-size: min(35rem, 100% - var(--layout-screen-margin-small) * 2);
  max-block-size: calc(100dvh - var(--space-scale-10) * 2);
  padding: 0;
  border: var(--border-width-variable-regular) solid var(--color-border-gray);
  border-radius: var(--radius-xlarge1);
  background-color: var(--color-surface-white-subtler);
  box-shadow: var(--shadow-4);
  color: var(--color-text-basic);
}
.modal[open] {
  display: flex;
  flex-direction: column;
}
.modal::backdrop {
  background-color: var(--color-background-dim);
}
.modal__header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-gap-5);
  padding: var(--space-padding-10) var(--space-padding-10) 0;
}
.modal__title {
  flex: 1;
  margin: 0;
  font-size: var(--font-size-heading-medium);
  font-weight: var(--font-weight-bold);
  line-height: var(--font-line-height-base);
}
.modal__close {
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
.modal__close-icon {
  inline-size: var(--size-height-4);
  block-size: var(--size-height-4);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.modal__body {
  flex: 1;
  min-block-size: 0;
  overflow-y: auto;
  padding: var(--space-padding-6) var(--space-padding-10) var(--space-padding-3);
  font-size: var(--font-size-body-medium);
  line-height: var(--font-line-height-base);
}
.modal__body--overflow::after {
  content: "";
  position: sticky;
  inset-block-end: 0;
  display: block;
  block-size: var(--space-scale-12);
  background-image: linear-gradient(transparent, var(--color-surface-white-subtler));
  pointer-events: none;
}
.modal__footer {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-gap-3);
  padding: var(--space-padding-6) var(--space-padding-10) var(--space-padding-10);
}
.modal__action {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-6);
  border: var(--border-width-variable-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
}
.modal__action--primary {
  border-color: var(--color-button-primary-fill);
  background-color: var(--color-button-primary-fill);
  color: var(--color-text-basic-inverse);
}
.modal__trigger:focus-visible,
.modal__close:focus-visible,
.modal__action:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
@media (prefers-reduced-motion: no-preference) {
  .modal[open] {
    animation-name: modal-enter;
    animation-duration: var(--motion-duration-fast);
    animation-timing-function: var(--motion-easing-enter);
  }
}
@keyframes modal-enter {
  from {
    opacity: 0;
    transform: translateY(var(--space-scale-5));
  }
}
```

## 상태
- **열림**: 열기 버튼을 누르면 dialog.showModal() 을 호출한다(open 속성이 붙는다). 예시 markup 의 open 속성은 검사용 정적 표현이며 실제로는 showModal() 로만 연다 — open 속성만 붙이면 비모달로 열려 초점 가두기·딤드가 없다.
- **본문 넘침**: 본문 scrollHeight > clientHeight 이면 modal__body 에 modal__body--overflow 를 붙여 하단 흐림을 표시한다. 본문 안에 초점 가능한 요소가 없으면 tabindex="0" 과 aria-labelledby(제목 id)를 붙여 키보드로 스크롤할 수 있게 한다.
- **승인 요청(modal--approval)**: 루트에 modal--approval, modal__close 버튼을 넣지 않는다. 푸터에 수락·거절 버튼을 각각 1개 둔다. Esc 로 닫지 않는다(cancel 이벤트에서 preventDefault).
- **입력 모달**: 본문에 form 컨트롤 5개 이하를 넣고, 푸터의 제출 버튼을 form 속성으로 그 form 에 연결한다. 첫 입력 필드에 autofocus.

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 모달 안의 다음·이전 상호작용 요소로 초점을 옮긴다. 마지막 요소에서 Tab 은 첫 요소로, 첫 요소에서 Shift+Tab 은 마지막 요소로 순환한다(A11Y-029). 순서는 제목 옆 닫기 → 본문 → 푸터 버튼으로 화면 순서와 같다(A11Y-015). |
| Esc | 닫기 버튼이 있는 모달을 닫는다(닫기 버튼과 같은 동작). 승인 요청 모달은 Esc 로 닫지 않는다(CF-035). |
| Enter / Space | 초점이 있는 버튼을 실행한다. |
| ↑ / ↓ | 본문이 스크롤되면 본문을 위아래로 스크롤한다. |

## 동작
- 모달은 사용자의 버튼·링크 실행 결과로만 연다. 페이지를 열 때 자동으로 띄우지 않는다(A11Y-058, A11Y-024).
- 연 직후 초점은 본문의 첫 입력 필드, 입력이 없는 확인 대화상자는 되돌릴 수 없는 동작이 아닌 쪽(취소) 버튼으로 간다(autofocus). 닫히거나 취소되면 초점을 모달을 연 버튼으로 돌려놓는다(A11Y-015).
- 모달이 열린 동안 모달 밖은 초점·가상 커서가 닿지 않는다. showModal() 을 쓰지 않는 구현은 형제 영역에 inert 를 붙인다(A11Y-029).
- 닫기(X)·Esc·취소는 같은 동작이다. 제출·확정 모달에서 이 동작은 입력·선택 내용을 적용하지 않고 서버 요청을 보내지 않는다(STATE-011).
- 확인 대화상자는 되돌릴 수 없거나 결과·부작용을 알아야 하는 동작에만 쓰고, 본문에 실행될 내용과 결과를 쓰며 실행·취소 버튼을 함께 둔다(STATE-003, COPY-006).
- 모달 안에서 다단계 절차·탭·아코디언을 진행하지 않는다. 입력은 5개 이하로 둔다(STATE-013, FORM-011).
- 본문이 넘쳐도 푸터는 항상 보이고, 스크롤바를 숨기지 않는다(LAYOUT-035, LAYOUT-034).
- 모달 위에서 다른 모달을 열어야 하면 딤드는 맨 위 모달 아래 한 겹만 보인다 — showModal() 은 맨 위 dialog 의 ::backdrop 만 그리므로 아래 모달의 ::backdrop 을 숨긴다(SHAPE-005).
- 브라우저 뒤로가기(history.back)로 모달 안 뒤로가기 버튼과 같은 결과가 나오게 한다 — 모달을 열 때 history 항목을 추가했다면 뒤로가기는 모달만 닫는다(NAV-066).
- 반복 인증 실패(같은 절차에서 연속 2회 이상) 알림은 토스트가 아닌 이 모달로 띄운다(STATE-036).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-012 | MUST | 키보드 초점이 들어갈 수 있는 모든 컴포넌트에서 키보드만으로 초점을 빼낼 수 있게 하고, 수정자 없는 방향키·Tab 같은 표준 방법이 아니면 빠져나오는 방법을 안내한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-024 | MUST | UI 컴포넌트가 초점을 받는 것만으로 맥락 변화(새 창 열기, 페이지 이동, 폼 제출, 초점 이동, 화면 의미를 바꾸는 콘텐츠 변경)를 일으키지 않는다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-029 | SHOULD | 모달이 열려 있는 동안 키보드 초점과 스크린 리더 가상 초점이 모달 안에서만 이동하게 하고, 마지막 상호작용 요소에서 Tab을 누르면 첫 요소로, 첫 요소에서 Shift+Tab을 누르면 마지막 요소로 초점을 옮긴다. |
| A11Y-058 | MUST | 사용자가 링크·버튼을 실행하지 않았는데 새 창·새 탭·팝업 창을 열지 않는다(페이지를 열 때 뜨는 팝업 창 포함). |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| COPY-006 | SHOULD | 확인 대화상자의 실행 버튼 레이블에는 '확인'·'예'·'네'·'OK' 대신 실행할 동작을 동사로 쓴다(예: '삭제', '신청 취소', '제출'). |
| COPY-023 | SHOULD | 모달 본문에는 모달을 연 현재 과업·흐름에 관한 내용만 넣고, 홍보·다른 서비스 안내 같은 무관한 내용을 넣지 않는다. |
| FORM-011 | SHOULD | 모달 안에서 데이터를 입력받을 때는 입력 컴포넌트를 5개 이하로 두고, 모달 안에 탭·아코디언·다단계 절차를 넣지 않는다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-034 | SHOULD | 모달의 확정·취소 액션 버튼은 항상 모달 푸터에 두고, 모달 본문에는 입력폼 관련 컨트롤만 둔다. |
| LAYOUT-035 | SHOULD | 모달 본문에 세로 스크롤이 생기면 스크롤바와 본문 하단 흐림 효과로 스크롤 단서를 주고, 액션 버튼이 있는 푸터는 스크롤 위치와 관계없이 항상 보이게 한다. |
| MOTION-004 | SHOULD | prefers-reduced-motion: reduce일 때 사용자 상호작용(클릭·탭·스크롤·호버·초점)으로 시작되는 모션 애니메이션 가운데 기능·정보 전달에 필수가 아닌 것은 끄거나 요소의 위치·크기·모양이 변하지 않는 효과로 바꾼다. |
| MOTION-010 | MUST | 애니메이션·전환의 지속 시간(duration)과 이징(easing)은 모션 디자인 토큰(CSS 변수)에서만 고르고 CSS·JS에 ms 값이나 cubic-bezier() 값을 직접 쓰지 않는다. |
| MOTION-011 | SHOULD | UI 전환 애니메이션의 지속 시간은 100ms 이상 500ms 이하로 하고, 체크박스·토글 같은 단순 상태 피드백은 100ms, 모달·드로어처럼 화면을 크게 바꾸는 전환은 200ms 이상 300ms 이하로 한다. |
| NAV-066 | SHOULD | 같은 화면에서 앱 내 뒤로가기 버튼과 시스템 뒤로가기(브라우저 뒤로 버튼·뒤로 제스처)가 서로 다른 화면으로 이동하거나 서로 다른 동작(한쪽은 팝업 닫기, 다른 쪽은 페이지 이탈)을 하지 않게 한다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |
| SHAPE-004 | MAY | 그림자는 정의된 단계 토큰만 쓰고 단계를 용도에 고정한다(KRDS: 셀렉트 shadow2, 툴팁 shadow3, 모달 shadow4와 딤드, 긴급 공지 shadow2와 고도 -1 표면). |
| SHAPE-005 | SHOULD | 배경 딤드는 모달·바텀시트·알림 팝업처럼 주의를 집중시켜야 하는 레이어에만 쓰고, 한 번에 한 겹만 표시하며, 딤드 위에서도 닫기 버튼 같은 조작 영역이 분명히 보이게 한다. |
| STATE-003 | SHOULD | 확인(재확인) 대화상자는 실행 후 서비스 안에서 되돌릴 수 없거나 사용자가 결과·부작용을 알아야 하는 동작에만 쓰고, 대화상자 본문에 실행될 내용과 그 결과를 쓰며, 실행 버튼과 취소 버튼을 함께 둔다. |
| STATE-011 | SHOULD | 입력을 제출하거나 행동을 확정하는 모달·바텀시트의 닫기(X) 버튼은 취소 버튼과 같이 동작해 입력·선택한 내용을 적용하지 않고 창을 닫게 한다. |
| STATE-012 | SHOULD | 사용자가 응답해야 다음 절차로 갈 수 있는 승인 요청 모달에는 'X' 닫기 버튼을 두지 않고, 정보를 수락하거나 거절하는 액션 버튼으로만 닫히게 한다. |
| STATE-013 | SHOULD | 다단계 절차(2단계 이상 이어지는 입력·선택)를 모달 안에서 진행하지 않고 별도 화면에서 진행한다. |
| STATE-036 | MAY | 같은 인증 절차에서 인증이 연속 2회 이상 실패하면 실패 알림을 토스트가 아닌 모달로 표시한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.modal` ↔ `krds-modal modal-dialog modal-content`, `.modal__header` ↔ `modal-header`, `.modal__title` ↔ `modal-title`, `.modal__close` ↔ `btn-close`, `.modal__body` ↔ `modal-conts conts-area`, `.modal__footer` ↔ `modal-btn btn-wrap`, `.modal__action` ↔ `krds-btn`
- KRDS 키트는 닫기(X) 버튼을 DOM 의 마지막(푸터 뒤)에 두고 CSS 로 오른쪽 위에 배치한다 — 이 규격은 헤더 안 제목 바로 다음에 둔다. 시각 위치(우상단)와 DOM·Tab 순서가 달라지면 A11Y-008(MUST)·A11Y-015(MUST)를 위반하기 때문이다. KRDS 가 든 우려(스크린 리더 사용자가 본문을 놓침)는 초점을 닫기 버튼이 아니라 첫 입력 필드·취소 버튼으로 보내고(autofocus) 본문을 aria-describedby 로 연결해 해결한다.
- KRDS 키트는 section[role=dialog] 에 aria-modal 이 없고 모달 밖을 막지 않는다 — 이 규격은 dialog.showModal() 로 열어 모달 밖을 inert 로 만든다(A11Y-029).
- KRDS 키트 예시 버튼은 '예'·'아니요' 다 — 이 규격은 실행할 동작 동사('삭제')와 '취소'를 쓴다(COPY-006, STATE-003).
- KRDS 키트는 모달 본문 스크롤바를 ::-webkit-scrollbar 로 다시 그린다 — 이 규격은 스크롤바를 숨기지 않는 범위에서만 꾸민다(LAYOUT-035).
