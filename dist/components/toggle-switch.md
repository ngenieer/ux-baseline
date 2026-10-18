# 토글 스위치 (`.toggle-switch`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

켜짐·꺼짐 두 상태를 바꾸고 그 결과가 제출 없이 바로 반영되는 설정(알림 수신 등)에 쓴다.

## 대신 쓸 것
- 제출·적용 버튼을 눌러야 반영되는 선택 → checkbox 또는 radio-group (FORM-041)
- 상호 배타 옵션이 3개 이상이거나 부울이 아닌 선택 → radio-group (FORM-041)
- 상위 항목이 하위 항목들을 함께 켜고 끄는 계층 선택 → 중간 상태를 쓰는 checkbox 목록 (FORM-042)
- 레이블 하나로 두 상태의 뜻을 설명할 수 없는 경우 → 각자 레이블을 가진 radio-group 옵션 2개 (FORM-043)
- 아직 선택하지 않음 상태가 필요한 질문 → radio-group (FORM-044)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.toggle-switch` | `div` | 예 | 스위치와 레이블을 바로 옆에 붙여 둔다(LAYOUT-050). 한 화면의 토글 항목은 모두 같은 배열(스위치 왼쪽·레이블 오른쪽)을 쓴다(LAYOUT-051). |
| 네이티브 입력 | `.toggle-switch__input` | `input[type=checkbox][role=switch]` | 예 | 처음부터 켜짐(checked) 또는 꺼짐 상태를 가진다(FORM-044). opacity 0 으로 숨기고 트랙과 같은 칸·같은 크기(40×24px)로 겹친다. display none·visibility hidden·top/left 이동으로 숨기지 않는다(CF-051, A11Y-048). |
| 트랙 | `.toggle-switch__track` | `span` | 예 | aria-hidden 장식. 켜짐은 주조색, 꺼짐은 회색. 인접 배경과 3:1 이상(COLOR-003). 키보드 초점 표시를 트랙에 그린다(A11Y-016). |
| 핸들 | `.toggle-switch__thumb` | `span` | 예 | 켜짐이면 오른쪽, 꺼짐이면 왼쪽. 위치로 상태를 전달한다(COPY-033). |
| 레이블 | `.toggle-switch__label` | `label` | 예 | for 로 입력과 연결해 레이블을 눌러도 바뀐다(FORM-034). 명사형으로 쓰고(COPY-032) 상태가 바뀌어도 바꾸지 않는다(COPY-033). |
| 도움말 | `.toggle-switch__hint` | `p` |  | 무엇이 켜지고 꺼지는지 레이블만으로 부족할 때 쓴다. 입력의 aria-describedby 로 연결한다(COPY-032, A11Y-007). |
| 상태 텍스트 | `.toggle-switch__state` | `span` |  | 선택. '켜짐'·'꺼짐'을 레이블과 분리된 별도 텍스트로 스위치 바로 옆에 둔다(COPY-034). 한 항목에 넣으면 화면의 모든 토글에 넣는다(LAYOUT-051). 상태는 role=switch 가 전달하므로 aria-hidden 으로 둔다. |

## 표준 마크업

```html
<div class="toggle-switch">
  <input class="toggle-switch__input" type="checkbox" role="switch" id="notify-sms" name="notify-sms" checked aria-describedby="notify-sms-hint">
  <span class="toggle-switch__track" aria-hidden="true"><span class="toggle-switch__thumb"></span></span>
  <label class="toggle-switch__label" for="notify-sms">문자 알림 수신</label>
  <p class="toggle-switch__hint" id="notify-sms-hint">신청 처리 결과를 휴대전화 문자로 받습니다. 바꾸면 바로 저장됩니다.</p>
</div>
<div class="toggle-switch">
  <input class="toggle-switch__input" type="checkbox" role="switch" id="notify-email" name="notify-email">
  <span class="toggle-switch__track" aria-hidden="true"><span class="toggle-switch__thumb"></span></span>
  <label class="toggle-switch__label" for="notify-email">이메일 알림 수신</label>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.toggle-switch {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: var(--space-gap-3);
  row-gap: var(--space-gap-1);
  justify-items: start;
}
.toggle-switch__input,
.toggle-switch__track {
  grid-area: 1 / 1;
  inline-size: var(--space-scale-14);
  block-size: var(--size-height-4);
  margin: 0;
}
.toggle-switch__input {
  position: relative;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
}
.toggle-switch__track {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: var(--radius-max);
  background-color: var(--color-element-gray);
  transition: background-color var(--motion-duration-fast) var(--motion-easing-standard);
}
.toggle-switch__thumb {
  box-sizing: border-box;
  inline-size: var(--size-height-4);
  block-size: var(--size-height-4);
  border: var(--border-width-variable-medium) solid var(--color-element-gray);
  border-radius: var(--radius-max);
  background-color: var(--color-element-inverse);
  transition: transform var(--motion-duration-fast) var(--motion-easing-standard);
}
.toggle-switch__input:checked + .toggle-switch__track {
  background-color: var(--color-element-primary);
}
.toggle-switch__input:checked + .toggle-switch__track .toggle-switch__thumb {
  border-color: var(--color-element-primary);
  transform: translateX(var(--space-scale-8));
}
.toggle-switch__input:focus-visible + .toggle-switch__track {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.toggle-switch__input:disabled + .toggle-switch__track {
  background-color: var(--color-element-disabled-light);
}
.toggle-switch__input:disabled + .toggle-switch__track .toggle-switch__thumb {
  border-color: var(--color-element-disabled-light);
  background-color: var(--color-element-disabled-dark);
}
.toggle-switch__input:disabled ~ .toggle-switch__label {
  color: var(--color-text-disabled);
}
.toggle-switch__label {
  grid-area: 1 / 2;
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  cursor: pointer;
}
.toggle-switch__hint {
  grid-area: 2 / 2;
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.toggle-switch__state {
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-small);
}
@media (prefers-reduced-motion: reduce) {
  .toggle-switch__track,
  .toggle-switch__thumb {
    transition: none;
  }
}
```

## 상태
- **켜짐**: 입력이 checked 가 된다. 트랙이 주조색이 되고 핸들이 오른쪽으로 간다 — 색과 핸들 위치 두 단서로 구분한다(COLOR-001). 레이블 텍스트는 바꾸지 않는다(COPY-033).
- **비활성**: 입력에 disabled. 바꿀 수 없는 이유를 도움말에 쓴다. 비활성 색은 불투명 토큰을 쓴다(COLOR-006).
- **상태 텍스트 사용**: 트랙 바로 뒤에 span.toggle-switch__state(aria-hidden="true")를 두고 상태에 맞춰 '켜짐'·'꺼짐'으로 바꾼다. 화면의 모든 토글에 같은 방식으로 넣는다(COPY-034, LAYOUT-051).
- **목록형 설정 화면**: 행 전체를 클릭 영역으로 만든 설정 목록에서는 레이블을 왼쪽 끝, 스위치를 오른쪽 끝에 둘 수 있다(CF-013). 그 밖에는 바로 옆에 붙인다(LAYOUT-050).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 스위치로 초점을 옮긴다. 초점 표시는 트랙 위에 보인다(A11Y-016). |
| Space | 켜짐·꺼짐을 바꾼다(A11Y-035). 네이티브 체크박스가 처리한다. |

## 동작
- input[type=checkbox] 에 role="switch" 를 주어 스위치 역할과 켜짐·꺼짐 상태를 보조기술에 전달한다(A11Y-025). 키보드 동작은 스크립트로 다시 만들지 않는다.
- 커스텀 트랙을 쓸 때 네이티브 입력은 opacity 0 으로 숨기고 트랙과 같은 위치·크기에 겹치며, 트랙에 초점 표시를 그린다(CF-051, A11Y-016, A11Y-048).
- 상태를 바꾸면 제출 버튼 없이 바로 저장·반영하고, 저장 결과(실패 포함)를 role="status" 영역으로 알린다(FORM-041, STATE-001). 저장에 실패하면 스위치를 이전 상태로 되돌린다.
- 상태 변경으로 페이지 이동·새 창 열기를 하지 않는다(FORM-002).
- 레이블 텍스트를 눌러도 상태가 바뀐다(FORM-034).
- 레이블은 명사형('문자 알림 수신')으로 쓰고, 켜면 무엇이 바뀌는지 드러나지 않으면 도움말을 붙인다(COPY-032).
- 핸들 이동은 transform 으로만 움직이고, prefers-reduced-motion: reduce 에서는 전환 효과를 끈다(MOTION-004, MOTION-012).
- 트랙·핸들은 인접 배경과 3:1 이상 대비를 가진다(COLOR-003).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-035 | SHOULD | 라디오 버튼·체크박스·토글 스위치에 초점이 있을 때 Space 키를 누르면 값을 선택(체크박스·토글은 상태 전환)하게 한다. |
| A11Y-048 | SHOULD | 대화형 요소를 시각적으로 숨길 때 text-indent나 top·left 값으로 본래 위치 밖으로 옮기지 않고 top·left를 auto로 유지한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-006 | SHOULD | 비활성(disabled) 상태를 표현할 때 알파 값이 1 미만인 색(투명도 색)을 쓰지 않고 팔레트의 불투명 색을 쓴다. |
| COPY-032 | SHOULD | 토글 스위치 레이블은 명사형으로 쓰고(예: '알림 수신'), 명사형으로는 켜고 끄는 대상이 드러나지 않으면 동사형으로 쓰거나 도움말을 붙인다. |
| COPY-033 | SHOULD | 토글 스위치의 상태가 바뀌어도 레이블 텍스트를 바꾸지 않고, 상태는 핸들 위치·상태 아이콘·별도 상태 텍스트로 전달한다. |
| COPY-034 | SHOULD | 토글 상태를 텍스트('켜짐'·'꺼짐')로 보여줄 때는 레이블과 분리된 별도 텍스트로 스위치 바로 옆에 둔다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-034 | SHOULD | 라디오 버튼·체크박스·토글 스위치는 컨트롤뿐 아니라 보이는 레이블 텍스트를 클릭·탭해도 값이 바뀌게 한다. |
| FORM-041 | SHOULD | 토글 스위치는 부울(켜짐·꺼짐) 두 상태를 전환하고 그 결과가 별도 제출 없이 즉시 반영되는 설정에만 쓰고, 상태가 부울이 아니거나 상호 배타 옵션이 3개 이상이면 라디오 버튼을, 제출·적용 동작을 거쳐야 반영되는 선택이면 체크박스나 라디오 버튼을 쓴다. |
| FORM-042 | SHOULD | 상위 항목이 하위 항목들을 함께 켜고 끄는 계층 구조의 선택 옵션에는 토글 스위치 대신 중간 상태를 표시하는 체크박스 목록을 쓴다. |
| FORM-043 | MAY | 토글 레이블 하나로 켜짐·꺼짐 두 상태의 뜻을 설명할 수 없으면 토글 대신 각자 레이블을 가진 라디오 버튼 2개로 나눈다. |
| FORM-044 | SHOULD | 켜짐·꺼짐 중 어느 쪽도 아닌 '아직 선택하지 않음' 상태가 필요한 선택에는 토글 스위치를 쓰지 않는다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-050 | MAY | 넓은 컨테이너 안의 토글 스위치는 레이블을 스위치 바로 옆에 붙여 두고, 레이블과 스위치를 컨테이너 양 끝으로 떼어 놓지 않는다. |
| LAYOUT-051 | SHOULD | 한 화면의 토글 스위치 항목은 모두 같은 배열(레이블·스위치 위치)을 쓰고, 한 항목에 상태 레이블이나 상태 아이콘을 넣으면 모든 항목에 넣는다. |
| MOTION-004 | SHOULD | prefers-reduced-motion: reduce일 때 사용자 상호작용(클릭·탭·스크롤·호버·초점)으로 시작되는 모션 애니메이션 가운데 기능·정보 전달에 필수가 아닌 것은 끄거나 요소의 위치·크기·모양이 변하지 않는 효과로 바꾼다. |
| MOTION-012 | SHOULD | 요소를 움직이거나 크기를 바꾸는 애니메이션·전환은 transform으로 만들고, top·left·box-shadow 값을 애니메이션하지 않는다. |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.toggle-switch` ↔ `krds-form-toggle-switch large`, `.toggle-switch__input` ↔ `krds-form-toggle-switch input[type=checkbox]`, `.toggle-switch__track` ↔ `switch-toggle`, `.toggle-switch__thumb` ↔ `switch-toggle > i`, `.toggle-switch__label` ↔ `krds-form-toggle-switch label`
- KRDS 키트 기본(medium) 스위치는 높이 20px 이다 — 이 규격은 키트 large 크기(40×24px)를 기본으로 해 포인터 대상 크기를 직접 충족한다(LAYOUT-002).
- KRDS 키트는 input[type=checkbox] 에 role="switch" 가 없어 체크박스로 읽힌다 — 이 규격은 role="switch" 를 준다(A11Y-025).
- KRDS 키트는 스위치 모양(switch-toggle)을 label 안에 넣고 입력 위치와 맞추지 않는다 — 이 규격은 입력과 트랙을 같은 칸에 겹쳐 초점 표시가 트랙 위에 보이게 한다(CF-051, A11Y-016).
- KRDS 키트는 핸들 위치를 left 값으로 옮긴다 — 이 규격은 transform 으로 옮긴다(MOTION-012).
