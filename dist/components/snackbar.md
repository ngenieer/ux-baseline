# 스낵바 (`.snackbar`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

사용자 행동의 결과를 한 문장으로 알리면서 그 결과에 대한 행동(되돌리기·재시도 등) 1개를 함께 제공할 때 쓴다.

## 대신 쓸 것
- 행동 없이 한 줄 결과만 알리는 경우 → 토스트 (COPY-050)
- 두 문장 이상의 중요한 정보, 반드시 확인해야 하는 내용 → 모달 (COPY-051)
- 개별 입력 항목의 오류·성공·경고 → 해당 필드 옆 인라인 메시지 (FORM-003)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.snackbar` | `div` | 예 | 화면 하단 중앙에 고정한다. 한 페이지에 1개만 둔다(STATE-038). DOM 에서는 main 끝에 둬 Tab 으로 닿을 수 있게 한다. |
| 아이콘 | `.snackbar__icon` | `svg` |  | 메시지 의미 전달을 도울 때만 메시지 왼쪽(DOM 에서도 앞)에 둔다. 메시지와 같은 뜻이면 aria-hidden="true"(STATE-040, A11Y-001). |
| 메시지 | `.snackbar__message` | `p` | 예 | role="status". 빈 상태로 미리 DOM 에 두고 텍스트만 바꾼다(STATE-001). 한 문장으로 쓴다(COPY-051). |
| 작업 버튼 | `.snackbar__action` | `button` |  | 메시지가 알린 결과에 대한 행동 1개만, 텍스트 버튼으로 메시지 오른쪽(DOM 에서 메시지 다음)에 둔다(STATE-039). 라이브 영역(메시지) 밖에 둔다. |
| 닫기 버튼 | `.snackbar__close` | `button` | 예 | 스낵바는 시간 제한으로 사라지지 않으므로 닫기 버튼이 필요하다(A11Y-014). 접근 가능한 이름 '알림 닫기'. |

## 표준 마크업

```html
<div class="snackbar">
  <svg class="snackbar__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg>
  <p class="snackbar__message" role="status">파일 3개를 휴지통으로 옮겼습니다.</p>
  <button class="snackbar__action" type="button">되돌리기</button>
  <button class="snackbar__close" type="button" aria-label="알림 닫기">
    <svg class="snackbar__close-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
  </button>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.snackbar {
  position: fixed;
  inset-block-end: var(--space-gap-7);
  inset-inline-start: 50%;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: var(--space-gap-3);
  inline-size: max-content;
  max-inline-size: calc(100% - var(--layout-screen-margin-small) * 2);
  padding: var(--space-padding-3) var(--space-padding-3) var(--space-padding-3) var(--space-padding-6);
  border-radius: var(--radius-medium3);
  background-color: var(--color-surface-inverse);
  box-shadow: var(--shadow-3);
  color: var(--color-text-basic-inverse);
  transform: translateX(-50%);
}
.snackbar[hidden] {
  display: none;
}
.snackbar__icon {
  flex-shrink: 0;
  inline-size: var(--size-height-3);
  block-size: var(--size-height-3);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.snackbar__message {
  flex: 1;
  min-inline-size: 0;
  margin: 0;
  font-size: var(--font-size-body-small);
  line-height: var(--font-line-height-base);
}
.snackbar__action {
  flex-shrink: 0;
  min-block-size: var(--size-height-5);
  padding-inline: var(--space-padding-3);
  border: 0;
  border-radius: var(--radius-small3);
  background-color: transparent;
  color: var(--color-text-basic-inverse);
  font-size: var(--font-size-label-small);
  font-weight: var(--font-weight-bold);
  text-decoration: underline;
}
.snackbar__close {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-inline-size: var(--size-height-5);
  min-block-size: var(--size-height-5);
  padding: 0;
  border: 0;
  border-radius: var(--radius-small3);
  background-color: transparent;
  color: var(--color-icon-inverse);
}
.snackbar__close-icon {
  inline-size: var(--size-height-3);
  block-size: var(--size-height-3);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.snackbar__action:focus-visible,
.snackbar__close:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-inverse);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **숨김(기본)**: 루트에 hidden, 메시지 p 는 비어 있다. 루트를 숨겨도 메시지 p(role=status)는 DOM 에 남겨 둔다.
- **표시**: 루트의 hidden 을 지운 뒤 메시지 p 에 텍스트를 넣는다(순서가 바뀌면 보조기술이 읽지 않을 수 있다). 행동이 없는 메시지면 snackbar__action 을 숨긴다.
- **교체**: 새 스낵바가 필요하면 기존 스낵바의 메시지·작업 버튼을 바꾼다. 두 번째 스낵바를 만들지 않는다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 작업 버튼·닫기 버튼으로 초점을 옮긴다. 스낵바가 나타나도 초점은 옮기지 않는다(STATE-001). |
| Enter / Space | 초점이 있는 작업 버튼·닫기 버튼을 실행한다. |
| Esc | 초점이 스낵바 안에 있을 때 스낵바를 닫는다. |

## 동작
- 메시지는 role="status" 로 초점 이동 없이 보조기술에 전달한다. 작업 버튼은 라이브 영역 밖에 둬 버튼 이름이 메시지와 함께 반복해서 읽히지 않게 한다(STATE-001).
- 스낵바는 시간이 지나도 저절로 사라지지 않는다. 사용자가 닫기·작업 버튼을 누르거나, 다음 스낵바로 교체되거나, 화면을 떠날 때 닫는다. 작업 버튼(되돌리기 등)에 시간 제한을 두지 않기 위해서다(A11Y-014, CF-022).
- 한 번에 1개만 표시한다. 새 스낵바는 기존 스낵바를 교체한다(STATE-038).
- 작업 버튼은 0~1개, 메시지가 알린 결과에 대한 행동만 둔다(STATE-039). 닫기 버튼은 작업 버튼 수에 넣지 않는다.
- 스낵바에 초점이 있는 상태에서 닫히면 초점을 스낵바를 띄운 동작의 버튼(없으면 main 의 h1)으로 옮겨 초점을 잃지 않게 한다(A11Y-015).
- 하단 탭 바·플로팅 버튼 위에 띄우고, 떠 있는 동안 문서에 scroll-padding-block-end 를 스낵바 높이 이상으로 둬 초점 받은 요소를 완전히 가리지 않게 한다(LAYOUT-001).
- 코치마크가 표시되는 동안에는 스낵바를 띄우지 않고 보류했다가 코치마크가 끝난 뒤 표시한다(STATE-030, CF-001).
- 메시지는 한 문장으로 쓰고, 두 문장 이상 중요한 정보는 모달로 보낸다(COPY-051). 필드 오류는 스낵바가 아닌 인라인 메시지로 보낸다(FORM-003).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-014 | MUST | 보안 등 필수 사유가 없으면 콘텐츠에 시간 제한을 두지 않고, 시간 제한을 둘 때는 각 제한마다 시작 전에 끄기, 시작 전에 기본값의 10배 이상으로 조정, 만료 전 경고와 함께 20초 이상의 여유를 주고 단순 동작으로 10회 이상 연장 중 하나를 제공한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-051 | MAY | 스낵바 메시지는 한 문장으로 쓰고, 두 문장 이상의 중요한 정보를 전달해야 하면 스낵바 대신 모달을 쓴다. |
| FORM-003 | MUST | 입력 오류를 자동으로 감지하면 오류가 난 항목을 식별하고 오류 내용을 텍스트로 설명한다. |
| LAYOUT-001 | MUST | 키보드 초점을 받은 컴포넌트가 작성자가 만든 콘텐츠(고정 헤더·고정 푸터·쿠키 배너·비모달 대화상자 등)에 완전히 가려지지 않게 한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |
| SHAPE-004 | MAY | 그림자는 정의된 단계 토큰만 쓰고 단계를 용도에 고정한다(KRDS: 셀렉트 shadow2, 툴팁 shadow3, 모달 shadow4와 딤드, 긴급 공지 shadow2와 고도 -1 표면). |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |
| STATE-030 | SHOULD | 코치마크가 표시되는 동안 알림·배너·토스트 같은 다른 레이어를 띄우지 않고, 그동안 생긴 알림은 버리지 않고 코치마크가 닫힌 직후 표시한다. 시간 제한 경고와 오류·긴급 알림은 예외로 즉시 띄우고 코치마크를 닫는다. |
| STATE-038 | SHOULD | 한 페이지에 스낵바를 1개만 표시하고, 여러 스낵바를 겹치거나 쌓지 않는다. |
| STATE-039 | SHOULD | 스낵바 작업 버튼은 메시지와 직접 관련된 행동(되돌리기·재시도·목록 이동 등)에만 텍스트 버튼으로 최대 1개 두고, 메시지 오른쪽에 둔다. |
| STATE-040 | MAY | 스낵바 아이콘은 메시지 의미 전달을 돕는 경우에만 메시지 왼쪽에 두고, 메시지 텍스트보다 눈에 띄게 표현하지 않는다. |

## KRDS 키트와의 관계
- KRDS HTML 키트 v1.1.0 에는 스낵바 마크업이 없다. 이 규격은 KRDS 스낵바 페이지 규칙(STATE-038·039·040, COPY-051)과 STATE-001·A11Y-014 로 만들었다.
