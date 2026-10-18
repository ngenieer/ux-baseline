# 텍스트 영역 (`.text-area`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

사유·의견·상세 설명처럼 여러 문장으로 된 텍스트를 입력받을 때 쓴다.

## 대신 쓸 것
- 한 줄로 끝나는 값(이름·이메일·전화번호·검색어 등)을 받는 경우 → text-field (FORM-054)
- 텍스트 영역 하나의 레이블·안내문이 두 개 이상의 질문을 묻는 경우 → 질문마다 나눈 텍스트 영역, 응답이 정해진 질문은 라디오 버튼·체크박스 (FORM-055)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.text-area` | `div` | 예 | text-field 와 같은 순서로 레이블 → 부가 설명 → 텍스트 영역 → 글자 수 → 시스템 메시지를 위에서 아래로 쌓는다(FORM-009, FORM-052). |
| 레이블 | `.text-area__label` | `label` | 예 | for 로 textarea id 와 연결한다(FORM-004, A11Y-025). 필수·선택 표시는 서비스 전체에서 한 방식만 쓴다(FORM-012). |
| 부가 설명 | `.text-area__hint` | `p` |  | 무엇을 쓰는지·형식 안내는 플레이스홀더가 아니라 여기에 쓴다(FORM-017). textarea 의 aria-describedby 로 연결한다. |
| 텍스트 영역 | `.text-area__input` | `textarea` | 예 | rows 는 예상 최대 입력 길이에 비례해 정한다(FORM-051). 글자 수 제한이 있으면 maxlength 를 준다. 복사·붙여넣기를 막지 않는다(FORM-018). |
| 글자 수 | `.text-area__count` | `p` |  | 글자 수 제한이 있을 때만 넣는다. 텍스트 영역 바로 다음에 두고 내용은 '현재/최대'(예 43/500) 숫자만 쓴다(FORM-052, CF-039). textarea 의 aria-describedby 로 연결해 초점을 받을 때 읽히게 한다. |
| 현재 글자 수 | `.text-area__count-current` | `span` |  | 입력·삭제·붙여넣기 때마다 스크립트가 갱신하는 숫자(FORM-053). |
| 한도 도달 알림 | `.text-area__status` | `p` |  | role="status" 와 .sr-only 를 준 빈 요소. 최대 글자 수에 도달했을 때만 문장을 넣어 보조기술에 한 번 알린다(STATE-001). |
| 시스템 메시지(오류) | `.text-area__message` | `p` |  | 제출 시 오류가 있을 때만 넣는다(FORM-080). textarea 의 aria-describedby 에 id 를 더한다(FORM-003). |

## 표준 마크업

```html
<div class="text-area">
  <label class="text-area__label" for="inquiry-detail">문의 내용 (필수)</label>
  <p class="text-area__hint" id="inquiry-detail-hint">문의할 서비스 이름과 겪은 문제를 함께 적어 주세요.</p>
  <textarea class="text-area__input" id="inquiry-detail" name="inquiry_detail" rows="8" maxlength="500" required aria-describedby="inquiry-detail-hint inquiry-detail-count">여권 재발급 신청 화면에서 사진 파일을 올리면 다음 단계로 넘어가지 않습니다.</textarea>
  <p class="text-area__count" id="inquiry-detail-count"><span class="text-area__count-current">43</span>/500</p>
  <p class="text-area__status sr-only" role="status"></p>
</div>
<div class="text-area text-area--error">
  <label class="text-area__label" for="refund-reason">환불 사유 (필수)</label>
  <p class="text-area__hint" id="refund-reason-hint">환불을 요청하는 이유를 적어 주세요.</p>
  <textarea class="text-area__input" id="refund-reason" name="refund_reason" rows="4" maxlength="200" required aria-invalid="true" aria-describedby="refund-reason-hint refund-reason-count refund-reason-error"></textarea>
  <p class="text-area__count" id="refund-reason-count"><span class="text-area__count-current">0</span>/200</p>
  <p class="text-area__status sr-only" role="status"></p>
  <p class="text-area__message" id="refund-reason-error">환불 사유를 입력해 주세요. 예: 신청 기간이 지나 서비스를 이용하지 못했습니다.</p>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.text-area {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
}
.text-area__label {
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.text-area__hint {
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.text-area__input {
  inline-size: 100%;
  padding-block: var(--space-padding-4);
  padding-inline: var(--space-padding-6);
  border: var(--space-scale-1) solid var(--color-input-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-input-surface);
  color: var(--color-text-basic);
  font-family: inherit;
  font-size: var(--font-size-body-medium);
  line-height: var(--font-line-height-base);
  resize: vertical;
}
.text-area__input:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.text-area__input:disabled {
  border-color: var(--color-input-border-disabled);
  background-color: var(--color-input-surface-disabled);
  color: var(--color-text-disabled);
}
.text-area--error .text-area__input {
  border-color: var(--color-input-border-error);
}
.text-area__count {
  align-self: flex-end;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.text-area__count-current {
  color: var(--color-text-basic);
  font-weight: var(--font-weight-bold);
}
.text-area__message {
  color: var(--color-text-danger);
  font-size: var(--font-size-body-small);
}
```

## 상태
- **오류**: 루트에 text-area--error, textarea 에 aria-invalid="true", 시스템 메시지 p 를 넣고 그 id 를 aria-describedby 에 더한다. 메시지는 항목 이름·문제·고치는 방법을 담는다(FORM-003·005, COPY-005).
- **글자 수 제한 없음**: maxlength 를 빼고 글자 수(text-area__count)·한도 도달 알림(text-area__status)을 넣지 않는다. aria-describedby 에서 글자 수 id 를 뺀다.
- **비활성**: textarea 에 disabled. 값을 바꿀 수 없다는 이유를 부가 설명에 쓴다.
- **읽기 전용**: textarea 에 readonly. 값은 선택·복사할 수 있어야 한다(FORM-018).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 텍스트 영역으로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). 텍스트 영역 안에서 Tab 을 가로채지 않는다(A11Y-011). |
| Enter | 텍스트 영역 안에서 줄을 바꾼다. 폼을 제출하지 않는다(FORM-002). |

## 동작
- 입력·삭제·붙여넣기(input 이벤트)마다 text-area__count-current 를 현재 글자 수로 바꾼다(FORM-053). 글자 수 세는 방식은 maxlength·서버 검증과 같게 한다.
- 글자 수 표시는 aria-live 로 두지 않는다 — 입력할 때마다 낭독이 입력 소리와 겹친다. aria-describedby 로 연결해 초점을 받을 때 읽히게 하고, 최대 글자 수에 도달하면 text-area__status 에 '최대 500자를 모두 입력했습니다.' 같은 문장을 한 번 넣는다(STATE-001).
- 오류는 텍스트 영역을 벗어날 때(blur)가 아니라 다음 단계·제출 버튼을 눌렀을 때 표시한다(FORM-080). 오류를 표시한 뒤에도 입력한 값을 지우지 않는다(FORM-016).
- copy·cut·paste 이벤트를 막지 않는다(FORM-018).
- 값을 바꾸는 것만으로 제출·페이지 이동·새 창 열기를 하지 않는다(FORM-002).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-005 | SHOULD | 오류 메시지는 오류가 난 항목 이름, 무엇이 잘못됐는지, 고치는 방법(또는 사용자가 할 수 있는 다음 행동)을 담아 높임 종결어미로 쓰고, 사용자를 탓하는 표현과 '오류가 발생했습니다'·'유효하지 않은 값입니다' 같은 일반 문구만으로 된 메시지를 쓰지 않는다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-003 | MUST | 입력 오류를 자동으로 감지하면 오류가 난 항목을 식별하고 오류 내용을 텍스트로 설명한다. |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-005 | MUST | 입력 오류를 자동으로 감지했고 올바른 값의 형식·범위·허용 값을 알고 있으면 오류 메시지에 그 수정 방법을 텍스트로 제시한다. 보안이나 콘텐츠 목적을 해치는 경우만 예외로 한다. |
| FORM-009 | SHOULD | 텍스트 입력 필드의 구성 요소는 레이블, 부가 설명, 입력 박스, 시스템 메시지(도움말·오류) 순서로 위에서 아래로 배치한다. |
| FORM-012 | SHOULD | 입력폼(form 요소와 form 밖의 독립 fieldset)의 필수 항목과 선택 항목을 레이블의 '필수'·'선택' 텍스트, 필수 항목의 별표(*), 또는 '모든 항목이 필수'라는 폼 상단 안내 중 하나로 구분하고, 같은 서비스 안에서는 한 가지 방식만 쓴다. |
| FORM-016 | SHOULD | 검증 오류를 안내한 뒤에도 사용자가 입력하거나 선택한 값을 지우거나 초기화하지 않는다. |
| FORM-017 | SHOULD | 플레이스홀더를 레이블이나 도움말 대신 쓰지 않고, 플레이스홀더에 입력 형식 힌트나 예시를 넣을 때는 같은 내용을 입력 필드 밖의 보이는 텍스트(도움말)로도 제공한다. |
| FORM-018 | SHOULD | 개인 식별 정보 입력 필드, 텍스트 입력 필드, 텍스트 영역에서 복사와 붙여넣기를 막지 않는다. |
| FORM-051 | SHOULD | 텍스트 영역의 기본 높이(rows 또는 height)를 예상 최대 입력 길이에 비례하게 정한다. |
| FORM-052 | SHOULD | 글자 수 제한이 있는 텍스트 영역에는 레이블 바로 다음이나 입력 영역 바로 다음에 '현재 글자 수/최대 글자 수'(예: 37/100) 형식으로 글자 수를 텍스트로 표시한다. |
| FORM-053 | SHOULD | 텍스트 영역의 '현재 글자 수/최대 글자 수' 표시는 사용자가 글자를 입력·삭제·붙여넣을 때마다 갱신한다. |
| FORM-054 | SHOULD | 여러 줄의 텍스트 입력이 예상되는 필드에는 텍스트 입력 필드(input) 대신 텍스트 영역(textarea)을 쓴다. |
| FORM-055 | SHOULD | 여러 질문의 답을 텍스트 영역 하나로 받지 않고 질문마다 입력을 나누며, 응답이 정해진 질문은 라디오 버튼이나 체크박스로 받는다. |
| FORM-080 | SHOULD | 입력 필드의 오류(오류 메시지와 aria-invalid="true")는 사용자가 필드를 벗어날 때(blur)나 입력하는 동안이 아니라 다음 단계·제출 버튼을 눌렀을 때 표시하고, 다음 단계·제출 버튼은 입력 상태와 관계없이 비활성화하지 않는다. 제출 전에는 aria-invalid를 설정하지 않고 aria-describedby로 연결한 role="status" 영역의 텍스트만 바꾸는 조건 안내(입력 중 비밀번호 조건 충족 여부, 아이디 '중복 확인' 버튼 결과)를 허용한다. |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.text-area` ↔ `form-group`, `.text-area__label` ↔ `form-tit label`, `.text-area__input` ↔ `krds-input (textarea)`, `.text-area__count` ↔ `textarea-count`, `.text-area__count-current` ↔ `count-now`
- KRDS 키트는 글자 수(textarea-count)를 textarea 와 aria-describedby 로 연결하지 않는다 — 이 규격은 연결해 스크린 리더 사용자도 한도를 알 수 있게 한다(A11Y-025, FORM-052).
- KRDS 키트 예시는 플레이스홀더에 '플레이스홀더' 문구를 넣는다 — 이 규격은 안내를 부가 설명에 쓰고 플레이스홀더를 쓰지 않는다(FORM-017).
- KRDS 페이지 본문은 '남은 글자 수'를, 키트는 '0/100' 을 보인다 — 이 규격은 '현재/최대' 형식 하나로 통일한다(CF-039).
