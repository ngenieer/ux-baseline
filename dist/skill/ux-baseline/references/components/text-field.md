# 텍스트 입력 필드 (`.text-field`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

한 줄 텍스트(이름·이메일·전화번호·검색어 등)를 입력받을 때 쓴다.

## 대신 쓸 것
- 여러 줄 텍스트가 예상되는 경우 → textarea (FORM-054)
- 응답 내용이나 양식이 미리 정해진 경우 → 라디오 버튼·체크박스·셀렉트 (FORM-057)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.text-field` | `div` | 예 | 구성 요소를 위에서 아래로 레이블 → 부가 설명 → 입력 박스 → 시스템 메시지 순서로 쌓는다(FORM-009). |
| 레이블 | `.text-field__label` | `label` | 예 | for 로 입력 박스 id 와 연결한다. 필수·선택 표시는 서비스 전체에서 한 방식만 쓴다(FORM-012). |
| 부가 설명 | `.text-field__hint` | `p` |  | 형식 힌트는 플레이스홀더가 아니라 여기에 쓴다(FORM-017). 입력 박스의 aria-describedby 로 연결한다. |
| 입력 박스 | `.text-field__input` | `input` | 예 | 본인 정보 필드는 autocomplete 값을 지정한다(FORM-001). 복사·붙여넣기를 막지 않는다(FORM-018). |
| 시스템 메시지(오류) | `.text-field__message` | `p` |  | 제출 시 오류가 있을 때만 넣는다(FORM-080). 입력 박스의 aria-describedby 에 id 를 더한다. |

## 표준 마크업

```html
<div class="text-field">
  <label class="text-field__label" for="applicant-name">이름 (필수)</label>
  <p class="text-field__hint" id="applicant-name-hint">주민등록상 이름을 입력해 주세요.</p>
  <input class="text-field__input" type="text" id="applicant-name" name="name" autocomplete="name" required aria-describedby="applicant-name-hint">
</div>
<div class="text-field text-field--error">
  <label class="text-field__label" for="applicant-email">이메일 (필수)</label>
  <p class="text-field__hint" id="applicant-email-hint">결과를 받을 이메일 주소를 입력해 주세요.</p>
  <input class="text-field__input" type="email" id="applicant-email" name="email" autocomplete="email" required aria-invalid="true" aria-describedby="applicant-email-hint applicant-email-error" value="hong@">
  <p class="text-field__message" id="applicant-email-error">이메일 주소의 @ 뒤에 도메인을 입력해 주세요. 예: hong@example.com</p>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.text-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
}
.text-field__label {
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.text-field__hint {
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.text-field__input {
  inline-size: 100%;
  min-block-size: var(--size-height-8);
  padding-inline: var(--space-padding-6);
  border: var(--space-scale-1) solid var(--color-input-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-input-surface);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
.text-field__input:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.text-field__input:disabled {
  border-color: var(--color-input-border-disabled);
  background-color: var(--color-input-surface-disabled);
  color: var(--color-text-disabled);
}
.text-field--error .text-field__input {
  border-color: var(--color-input-border-error);
}
.text-field__message {
  color: var(--color-text-danger);
  font-size: var(--font-size-body-small);
}
```

## 상태
- **오류**: 루트에 text-field--error, 입력 박스에 aria-invalid="true", 시스템 메시지 p 를 넣고 그 id 를 aria-describedby 에 더한다. 메시지는 항목 이름·문제·고치는 방법을 담는다(FORM-003·005, COPY-005).
- **비활성**: 입력 박스에 disabled. 값을 바꿀 수 없다는 이유를 부가 설명에 쓴다.
- **읽기 전용**: 입력 박스에 readonly. 값은 선택·복사할 수 있어야 한다(FORM-018).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 입력 박스로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). |

## 동작
- 오류는 필드를 벗어날 때(blur)가 아니라 다음 단계·제출 버튼을 눌렀을 때 표시한다(FORM-080).
- 오류를 표시한 뒤에도 사용자가 입력한 값을 지우지 않는다(FORM-016).
- 값을 바꾸는 것만으로 제출·페이지 이동·새 창 열기를 하지 않는다(FORM-002).
- 너비는 섹션 너비를 채우고, 최대 길이를 예측할 수 있는 필드(우편번호 등)만 그 길이에 맞춘다(LAYOUT-054, FORM-056).
- 휴대전화 번호는 type="tel" autocomplete="tel" 로 받는다. tel-national 같은 세부 토큰은 type="text" 에서만 유효하다(FORM-001, html-validate valid-autocomplete).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-005 | SHOULD | 오류 메시지는 오류가 난 항목 이름, 무엇이 잘못됐는지, 고치는 방법(또는 사용자가 할 수 있는 다음 행동)을 담아 높임 종결어미로 쓰고, 사용자를 탓하는 표현과 '오류가 발생했습니다'·'유효하지 않은 값입니다' 같은 일반 문구만으로 된 메시지를 쓰지 않는다. |
| FORM-001 | MUST | 사용자 본인에 관한 정보를 받는 입력 필드 중 목적이 HTML 자동완성 토큰(name, email, tel, bday, street-address 등)에 해당하는 필드에는 그 목적에 맞는 autocomplete 값을 지정한다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-003 | MUST | 입력 오류를 자동으로 감지하면 오류가 난 항목을 식별하고 오류 내용을 텍스트로 설명한다. |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-005 | MUST | 입력 오류를 자동으로 감지했고 올바른 값의 형식·범위·허용 값을 알고 있으면 오류 메시지에 그 수정 방법을 텍스트로 제시한다. 보안이나 콘텐츠 목적을 해치는 경우만 예외로 한다. |
| FORM-009 | SHOULD | 텍스트 입력 필드의 구성 요소는 레이블, 부가 설명, 입력 박스, 시스템 메시지(도움말·오류) 순서로 위에서 아래로 배치한다. |
| FORM-012 | SHOULD | 입력폼(form 요소와 form 밖의 독립 fieldset)의 필수 항목과 선택 항목을 레이블의 '필수'·'선택' 텍스트, 필수 항목의 별표(*), 또는 '모든 항목이 필수'라는 폼 상단 안내 중 하나로 구분하고, 같은 서비스 안에서는 한 가지 방식만 쓴다. |
| FORM-016 | SHOULD | 검증 오류를 안내한 뒤에도 사용자가 입력하거나 선택한 값을 지우거나 초기화하지 않는다. |
| FORM-017 | SHOULD | 플레이스홀더를 레이블이나 도움말 대신 쓰지 않고, 플레이스홀더에 입력 형식 힌트나 예시를 넣을 때는 같은 내용을 입력 필드 밖의 보이는 텍스트(도움말)로도 제공한다. |
| FORM-018 | SHOULD | 개인 식별 정보 입력 필드, 텍스트 입력 필드, 텍스트 영역에서 복사와 붙여넣기를 막지 않는다. |
| FORM-056 | SHOULD | 이름·우편번호·전화번호처럼 입력값 최대 길이를 예측할 수 있는 텍스트 입력 필드는 너비를 최대 길이에 맞춰 고정하고 너비 320 CSS px 화면에서도 최대 길이 입력값이 잘리지 않게 하며, 그 밖의 텍스트 입력 필드는 섹션 너비를 채우게 한다. |
| FORM-057 | SHOULD | 응답 내용이나 양식이 미리 정해진 입력에는 텍스트 입력 필드 대신 라디오 버튼·체크박스·셀렉트를 쓴다. |
| FORM-080 | SHOULD | 입력 필드의 오류(오류 메시지와 aria-invalid="true")는 사용자가 필드를 벗어날 때(blur)나 입력하는 동안이 아니라 다음 단계·제출 버튼을 눌렀을 때 표시하고, 다음 단계·제출 버튼은 입력 상태와 관계없이 비활성화하지 않는다. 제출 전에는 aria-invalid를 설정하지 않고 aria-describedby로 연결한 role="status" 영역의 텍스트만 바꾸는 조건 안내(입력 중 비밀번호 조건 충족 여부, 아이디 '중복 확인' 버튼 결과)를 허용한다. |
| LAYOUT-054 | SHOULD | 텍스트 입력 필드의 기본 너비는 그리드·화면 크기에 따라 유동적으로 두고 입력 필드가 속한 섹션 너비 전체를 차지하게 한다. |
| SPACE-003 | MAY | 텍스트 입력 필드의 레이블·부가 설명·입력 박스·시스템 메시지 사이 간격을 8px(gap-3)로, 입력 박스 안쪽 좌우 여백을 16px(padding-6)로 둔다. |

## KRDS 키트와의 관계
- 클래스 대응: `.text-field` ↔ `form-group`, `.text-field__label` ↔ `form-tit label`, `.text-field__input` ↔ `krds-input`, `.text-field__message` ↔ `form-hint-invalid`
- KRDS 키트는 오류·안내 메시지(form-hint-invalid)를 입력 박스와 aria-describedby 로 연결하지 않는다 — 이 규격은 연결한다(A11Y-025, FORM-003).
- KRDS 키트 예시는 플레이스홀더에 '플레이스홀더' 문구를 넣는다 — 이 규격은 형식 힌트를 부가 설명에 쓰고 플레이스홀더를 쓰지 않는다(FORM-017).
