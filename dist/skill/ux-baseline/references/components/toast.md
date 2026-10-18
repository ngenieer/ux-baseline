# 토스트 (`.toast`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

사용자 행동의 결과(저장 완료·업로드 완료 등)를 한 줄로 잠시 보여 주고 스스로 사라지는 알림이다.

## 대신 쓸 것
- 반드시 읽고 확인해야 하는 내용, 중요·긴급 메시지 → 모달 또는 긴급 공지 (STATE-037)
- 두 줄 이상의 설명이 필요하거나 되돌리기·재시도 같은 추가 행동을 붙여야 하는 결과 알림 → 스낵바 (COPY-050)
- 개별 입력 항목의 오류·성공·경고 → 해당 필드 옆 인라인 메시지(텍스트 입력 필드 규격의 text-field__message) (FORM-003)
- 같은 인증 절차에서 연속 2회 이상 인증 실패 → 모달 (STATE-036)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(알림 영역) | `.toast` | `div` | 예 | role="status" 인 라이브 영역. 페이지를 불러올 때부터 비어 있는 상태로 DOM 에 있어야 하고, 메시지를 넣을 때 새로 만들지 않는다(STATE-001). 화면 하단 중앙에 고정한다. |
| 메시지 | `.toast__message` | `p` | 예 | 사용자 행동의 결과를 한 문장·한 줄로 쓴다(COPY-050). 버튼·링크를 넣지 않는다. |

## 표준 마크업

```html
<div class="toast" role="status">
  <p class="toast__message">임시 저장했습니다.</p>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.toast {
  position: fixed;
  inset-inline: 0;
  inset-block-end: var(--space-gap-7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding-inline: var(--layout-screen-margin-small);
  pointer-events: none;
}
.toast__message {
  max-inline-size: 100%;
  margin: 0;
  padding: var(--space-padding-4) var(--space-padding-6);
  border-radius: var(--radius-medium3);
  background-color: var(--color-surface-inverse);
  box-shadow: var(--shadow-3);
  color: var(--color-text-basic-inverse);
  font-size: var(--font-size-body-small);
  line-height: var(--font-line-height-base);
}
.toast__message--leaving {
  opacity: 0;
}
@media (prefers-reduced-motion: no-preference) {
  .toast__message {
    transition-property: opacity;
    transition-duration: var(--motion-duration-fast);
    transition-timing-function: var(--motion-easing-standard);
  }
}
```

## 상태
- **비어 있음(기본)**: toast 영역 안에 toast__message 가 없다. 영역 자체는 DOM 에 남긴다(라이브 영역을 미리 등록해야 스크린 리더가 다음 메시지를 읽는다).
- **표시**: toast 영역에 toast__message 를 넣는다(이미 있으면 텍스트만 바꾼다). 보조기술은 초점 이동 없이 메시지를 읽는다.
- **사라지는 중**: toast__message 에 toast__message--leaving 을 붙여 불투명도를 0 으로 바꾼 뒤 요소를 지운다.

## 동작
- 메시지는 role="status" 영역에 넣어 초점을 옮기지 않고 보조기술에 전달한다. 메시지마다 영역을 새로 만들지 않는다(STATE-001).
- 토스트에는 다른 곳(화면의 바뀐 상태·목록·저장 상태 표시)에서도 확인할 수 있는 결과만 담는다. 그래서 자동으로 사라져도 A11Y-014 의 시간 제한에 해당하지 않는다(CF-030). 토스트에만 있는 정보·조작이 필요하면 스낵바·모달을 쓴다(STATE-037, COPY-050).
- 표시 시간은 KRDS 토스트 페이지 값(정보형 2~3초, 주의·경고형 3~4초)을 기본으로 하되, 위 조건(다른 곳에서 확인 가능)을 지키는 한 A11Y-014 판정과 무관하다(CF-030).
- 토스트 안에 button·a 를 넣지 않는다. 행동이 필요하면 스낵바를 쓴다(COPY-050).
- 하단 탭 바·플로팅 버튼 위에 띄우고, 키보드 초점을 받은 요소를 완전히 가리지 않게 한다 — 토스트가 떠 있는 동안 문서에 scroll-padding-block-end 를 토스트 높이 이상으로 둔다(LAYOUT-001).
- 동시에 1개만 표시한다. 새 메시지가 오면 기존 메시지 텍스트를 바꾼다.
- 코치마크가 표시되는 동안에는 토스트를 띄우지 않고 보류했다가 코치마크가 끝난 뒤 표시한다(STATE-030, CF-001).
- 같은 인증 절차의 연속 2회 이상 실패는 토스트가 아니라 모달로 알린다(STATE-036). 필드 검증 오류는 토스트로 띄우지 않고 해당 필드에 인라인으로 표시한다(FORM-003, STATE-037).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-014 | MUST | 보안 등 필수 사유가 없으면 콘텐츠에 시간 제한을 두지 않고, 시간 제한을 둘 때는 각 제한마다 시작 전에 끄기, 시작 전에 기본값의 10배 이상으로 조정, 만료 전 경고와 함께 20초 이상의 여유를 주고 단순 동작으로 10회 이상 연장 중 하나를 제공한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| FORM-003 | MUST | 입력 오류를 자동으로 감지하면 오류가 난 항목을 식별하고 오류 내용을 텍스트로 설명한다. |
| LAYOUT-001 | MUST | 키보드 초점을 받은 컴포넌트가 작성자가 만든 콘텐츠(고정 헤더·고정 푸터·쿠키 배너·비모달 대화상자 등)에 완전히 가려지지 않게 한다. |
| MOTION-010 | MUST | 애니메이션·전환의 지속 시간(duration)과 이징(easing)은 모션 디자인 토큰(CSS 변수)에서만 고르고 CSS·JS에 ms 값이나 cubic-bezier() 값을 직접 쓰지 않는다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |
| SHAPE-004 | MAY | 그림자는 정의된 단계 토큰만 쓰고 단계를 용도에 고정한다(KRDS: 셀렉트 shadow2, 툴팁 shadow3, 모달 shadow4와 딤드, 긴급 공지 shadow2와 고도 -1 표면). |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |
| STATE-030 | SHOULD | 코치마크가 표시되는 동안 알림·배너·토스트 같은 다른 레이어를 띄우지 않고, 그동안 생긴 알림은 버리지 않고 코치마크가 닫힌 직후 표시한다. 시간 제한 경고와 오류·긴급 알림은 예외로 즉시 띄우고 코치마크를 닫는다. |
| STATE-036 | MAY | 같은 인증 절차에서 인증이 연속 2회 이상 실패하면 실패 알림을 토스트가 아닌 모달로 표시한다. |
| STATE-037 | MAY | 토스트에는 사라진 뒤에도 화면의 다른 곳에서 확인할 수 있는 결과만 담고, 중요하거나 긴급한 메시지는 토스트 대신 긴급 공지나 모달로, 사용자가 반드시 읽고 확인해야 하는 설명은 모달로, 개별 입력 항목의 오류·성공·경고 메시지는 해당 입력 필드 옆 인라인 텍스트로 제공한다. |
| COPY-050 | SHOULD | 토스트 메시지는 사용자 행동의 결과를 한 줄로 쓰고, 두 줄 이상의 설명이나 사용자의 추가 행동이 필요하면 토스트 대신 스낵바를 쓴다. |

## KRDS 키트와의 관계
- KRDS HTML 키트 v1.1.0 에는 토스트 마크업이 없다. KRDS 페이지는 표시 시간만 정하고 라이브 영역을 말하지 않는다 — 이 규격은 role="status" 영역을 필수로 둔다(STATE-001).
