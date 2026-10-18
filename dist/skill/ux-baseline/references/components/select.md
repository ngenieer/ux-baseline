# 셀렉트 (`.select`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

사용자가 익숙한 7~20개 옵션 목록(시·도, 연도 등)에서 하나를 고를 때 쓰는 브라우저 기본 select 다.

## 대신 쓸 것
- 옵션이 6개 이하이거나 옵션을 서로 비교해야 고를 수 있는 단일 선택 → radio-group (FORM-029)
- 단일 선택 옵션이 20개를 넘는 경우 → 입력으로 옵션을 걸러 주는 콤보 상자, 또는 셀렉트 여러 개로 단계 나누기 (FORM-037)
- 여러 값을 한 번에 골라야 하는 경우 → checkbox 그룹 (FORM-038)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.select` | `div` | 예 | 레이블 → 부가 설명 → 선택 박스 → 시스템 메시지 순서로 쌓는다(텍스트 입력 필드와 같은 배열). |
| 레이블 | `.select__label` | `label` | 예 | for 로 select id 와 연결한다(FORM-004). 무엇을 고르는지 밝힌다(COPY-003). |
| 부가 설명 | `.select__hint` | `p` |  | select 의 aria-describedby 로 연결한다. |
| 선택 박스 틀 | `.select__field` | `div` | 예 | select 와 화살표 아이콘을 같은 그리드 칸에 겹친다(위치 이동 없이 배치). |
| 선택 박스 | `.select__control` | `select` | 예 | 브라우저 기본 select 를 쓴다(FORM-039). appearance none 으로 기본 화살표만 지우고 키보드·옵션 목록은 브라우저에 맡긴다. 주소 같은 본인 정보는 autocomplete 값을 준다(FORM-001). |
| 화살표 아이콘 | `.select__arrow` | `svg` | 예 | aria-hidden 장식. pointer-events none 으로 클릭이 select 에 가게 한다. 인접 색과 3:1 이상 대비(COLOR-003). |
| 시스템 메시지(오류) | `.select__message` | `p` |  | 제출 시 오류가 있을 때만 넣고 aria-describedby 에 id 를 더한다(FORM-003). |

## 표준 마크업

```html
<div class="select">
  <label class="select__label" for="residence-region">거주 지역 (필수)</label>
  <p class="select__hint" id="residence-region-hint">주민등록상 주소지의 시·도를 선택해 주세요.</p>
  <div class="select__field">
    <select class="select__control" id="residence-region" name="region" autocomplete="address-level1" required aria-describedby="residence-region-hint">
      <option value="">시·도 선택</option>
      <option>강원특별자치도</option>
      <option>경기도</option>
      <option>경상남도</option>
      <option>경상북도</option>
      <option>광주광역시</option>
      <option>대구광역시</option>
      <option>대전광역시</option>
      <option>부산광역시</option>
      <option>서울특별시</option>
      <option>세종특별자치시</option>
      <option>울산광역시</option>
      <option>인천광역시</option>
      <option>전라남도</option>
      <option>전북특별자치도</option>
      <option>제주특별자치도</option>
      <option>충청남도</option>
      <option>충청북도</option>
    </select>
    <svg class="select__arrow" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
  </div>
</div>
<div class="select select--error">
  <label class="select__label" for="birth-month">태어난 달 (필수)</label>
  <div class="select__field">
    <select class="select__control" id="birth-month" name="birth-month" autocomplete="bday-month" required aria-invalid="true" aria-describedby="birth-month-error">
      <option value="">월 선택</option>
      <option value="1">1월</option>
      <option value="2">2월</option>
      <option value="3">3월</option>
      <option value="4">4월</option>
      <option value="5">5월</option>
      <option value="6">6월</option>
      <option value="7">7월</option>
      <option value="8">8월</option>
      <option value="9">9월</option>
      <option value="10">10월</option>
      <option value="11">11월</option>
      <option value="12">12월</option>
    </select>
    <svg class="select__arrow" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
  </div>
  <p class="select__message" id="birth-month-error">태어난 달을 선택해 주세요.</p>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.select {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
}
.select__label {
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.select__hint {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.select__field {
  display: grid;
  align-items: center;
}
.select__control,
.select__arrow {
  grid-area: 1 / 1;
}
.select__control {
  appearance: none;
  inline-size: 100%;
  min-block-size: var(--size-height-8);
  margin: 0;
  padding-inline: var(--space-padding-6) var(--space-padding-10);
  border: var(--border-width-variable-regular) solid var(--color-input-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-input-surface);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
  cursor: pointer;
}
.select__control:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.select__control:disabled {
  border-color: var(--color-input-border-disabled);
  background-color: var(--color-input-surface-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
.select__arrow {
  justify-self: end;
  inline-size: var(--size-height-3);
  block-size: var(--size-height-3);
  margin-inline-end: var(--space-padding-6);
  fill: none;
  stroke: var(--color-icon-gray);
  stroke-width: 2;
  pointer-events: none;
}
.select__control:disabled + .select__arrow {
  stroke: var(--color-icon-disabled);
}
.select--error .select__control {
  border-color: var(--color-input-border-error);
}
.select__message {
  margin: 0;
  color: var(--color-text-danger);
  font-size: var(--font-size-body-small);
}
.select--sort .select__control {
  inline-size: auto;
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-1) var(--space-padding-9);
  border-color: transparent;
  font-size: var(--font-size-label-small);
}
.select--sort .select__arrow {
  margin-inline-end: var(--space-padding-1);
}
```

## 상태
- **오류**: 루트에 select--error, select 에 aria-invalid="true", 시스템 메시지 p 를 넣고 그 id 를 aria-describedby 에 더한다. 메시지는 항목 이름과 할 일을 담는다(FORM-003, COPY-005).
- **비활성**: select 에 disabled. 값을 바꿀 수 없는 이유를 부가 설명에 쓴다. 비활성 색은 불투명 토큰을 쓴다(COLOR-006).
- **정렬형**: 루트에 select--sort. 목록 위 정렬 기준 선택에 쓰고 보이는 레이블('정렬')을 그대로 둔다(FORM-004). 정렬을 바꾸는 것만으로 페이지를 이동하거나 폼을 제출하지 않는다(FORM-002).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 선택 박스로 초점을 옮기고 다시 빼낸다(A11Y-012). 초점 표시가 보인다(A11Y-016). |
| ↑ / ↓ / Home / End / 글자 입력 | 브라우저 기본 select 동작으로 옵션을 바꾼다. 스크립트로 다시 만들지 않는다. |
| Alt+↓ / Space / Enter | 브라우저가 옵션 목록을 펼친다(운영체제별 기본 동작). |

## 동작
- 값을 바꾸는 것만으로 폼 제출·페이지 이동·새 창 열기를 하지 않는다. 정렬·필터는 같은 화면 안에서 목록을 다시 그리거나(URL·초점 변화 없음) 함께 둔 적용 버튼으로 실행한다(FORM-002).
- 옵션은 7개 이상 20개 이하일 때 쓴다(FORM-036). 20개를 넘으면 콤보 상자나 단계별 셀렉트로 바꾼다(FORM-037). 6개 이하이거나 비교가 필요한 선택은 라디오 버튼을 검토한다(FORM-029, FORM-030).
- 여러 값을 고르는 데 select[multiple] 을 쓰지 않는다(FORM-038).
- 옵션 텍스트는 선택 박스 너비 안에 다 보이는 길이로 쓴다(COPY-030).
- 첫 옵션은 값이 빈 안내 옵션('시·도 선택')으로 두어 아무것도 고르지 않은 상태를 구분한다. 오류는 제출 때 표시한다(FORM-080).
- 커스텀 드롭다운(role=combobox·listbox)을 만들지 않는다. 브라우저 기본 select 로 표현할 수 없는 요구가 있으면 A11Y-036·037·038·040 을 따르는 별도 규격으로 만든다(FORM-039).
- 선명한 화면 모드에서는 테두리 두께 토큰이 굵어진다 — 테두리 두께를 border-width 토큰으로만 지정한다(COLOR-011).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-012 | MUST | 키보드 초점이 들어갈 수 있는 모든 컴포넌트에서 키보드만으로 초점을 빼낼 수 있게 하고, 수정자 없는 방향키·Tab 같은 표준 방법이 아니면 빠져나오는 방법을 안내한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-036 | SHOULD | 커스텀 셀렉트 컨테이너에 초점이 있을 때 Enter 또는 Space를 누르면 옵션 목록을 펼치거나 접는다. |
| A11Y-037 | SHOULD | 커스텀 셀렉트의 옵션에 초점이 있을 때 Enter를 누르면 그 옵션 값을 선택하고 목록을 접는다. |
| A11Y-038 | SHOULD | 목록이 닫힌 커스텀 셀렉트(선택 전용 콤보박스)에 초점이 있을 때 ↓ 키는 선택값을 바꾸지 않고 목록을 열고, ↑·Home·End 키는 목록을 열며 시각 초점을 첫 옵션·첫 옵션·마지막 옵션으로 옮긴다. |
| A11Y-040 | SHOULD | 셀렉트·언어 변경·화면 크기 조정 같은 드롭다운의 옵션 목록이 펼쳐진 상태에서 레이블·컨테이너·목록이 아닌 영역을 클릭하면 목록을 접고, Esc를 누르면 목록을 접은 뒤 초점을 컨테이너로 옮긴다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-006 | SHOULD | 비활성(disabled) 상태를 표현할 때 알파 값이 1 미만인 색(투명도 색)을 쓰지 않고 팔레트의 불투명 색을 쓴다. |
| COLOR-011 | SHOULD | 선명한 화면 모드에서는 본문의 모든 인라인 링크와 푸터의 모든 링크에 밑줄을 표시하고, 버튼·입력·선택 컴포넌트의 외곽선과 링크 밑줄을 기본 모드보다 굵게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| COPY-005 | SHOULD | 오류 메시지는 오류가 난 항목 이름, 무엇이 잘못됐는지, 고치는 방법(또는 사용자가 할 수 있는 다음 행동)을 담아 높임 종결어미로 쓰고, 사용자를 탓하는 표현과 '오류가 발생했습니다'·'유효하지 않은 값입니다' 같은 일반 문구만으로 된 메시지를 쓰지 않는다. |
| COPY-030 | SHOULD | 셀렉트 옵션 텍스트는 컨테이너와 옵션 목록 너비 안에 다 보이는 길이로 쓰고, 넘칠 수밖에 없으면 마우스 호버와 키보드 초점 모두에서 전체 내용을 보여주는 툴팁을 제공하며 title 속성만으로 대신하지 않는다. |
| FORM-001 | MUST | 사용자 본인에 관한 정보를 받는 입력 필드 중 목적이 HTML 자동완성 토큰(name, email, tel, bday, street-address 등)에 해당하는 필드에는 그 목적에 맞는 autocomplete 값을 지정한다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-003 | MUST | 입력 오류를 자동으로 감지하면 오류가 난 항목을 식별하고 오류 내용을 텍스트로 설명한다. |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-029 | MAY | 사용자가 옵션을 서로 비교해야 고를 수 있거나 선택 속도가 중요한 단일 선택(설문 응답 문항 등)에는 셀렉트·콤보 상자 대신 모든 옵션이 펼쳐 보이는 라디오 버튼을 쓴다. |
| FORM-030 | MAY | 단일 선택 옵션이 7개 이상이고 사용자가 그 옵션 목록(예: 시·도, 연도)에 익숙하면 라디오 버튼 대신 셀렉트나 콤보 상자를 쓴다. |
| FORM-036 | MAY | 셀렉트는 옵션이 7개 이상 20개 이하인 단일 선택에 쓰고, 옵션이 20개를 넘으면 콤보 상자를 쓰거나 셀렉트를 여러 개로 나눈다. |
| FORM-037 | SHOULD | 단일 선택 옵션이 20개를 넘으면 셀렉트 대신 입력으로 옵션을 걸러 주는 콤보 상자를 쓰거나 셀렉트 여러 개로 단계를 나눈다. |
| FORM-038 | SHOULD | 여러 값을 한 번에 골라야 하는 선택에는 단일 선택 셀렉트나 select[multiple]을 쓰지 않고 체크박스 그룹이나 다중 선택 드롭다운을 쓴다. |
| FORM-039 | MAY | 옵션 목록을 펼쳐 둘 공간이 부족하거나 모바일 웹 사용이 중요한 화면의 단일 선택에는 커스텀 드롭다운 대신 브라우저 기본 select 요소를 쓴다. |
| FORM-080 | SHOULD | 입력 필드의 오류(오류 메시지와 aria-invalid="true")는 사용자가 필드를 벗어날 때(blur)나 입력하는 동안이 아니라 다음 단계·제출 버튼을 눌렀을 때 표시하고, 다음 단계·제출 버튼은 입력 상태와 관계없이 비활성화하지 않는다. 제출 전에는 aria-invalid를 설정하지 않고 aria-describedby로 연결한 role="status" 영역의 텍스트만 바꾸는 조건 안내(입력 중 비밀번호 조건 충족 여부, 아이디 '중복 확인' 버튼 결과)를 허용한다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |

## KRDS 키트와의 관계
- 클래스 대응: `.select` ↔ `form-group`, `.select__label` ↔ `form-tit label`, `.select__control` ↔ `krds-form-select`, `.select__hint` ↔ `form-hint`, `.select__message` ↔ `form-hint-invalid`, `.select--sort` ↔ `krds-form-select-sort`
- KRDS 키트는 select 에 title="선택" 을 붙인다 — 이 규격은 보이는 label 로 이름을 주고 title 을 쓰지 않는다(FORM-004).
- KRDS 키트는 도움말·오류 문구(form-hint, form-hint-invalid)를 select 와 aria-describedby 로 연결하지 않는다 — 이 규격은 연결한다(A11Y-025, FORM-003).
- KRDS 키트 정렬 셀렉트(krds-form-select-sort)에는 보이는 레이블이 없다 — 이 규격은 보이는 레이블을 둔다(FORM-004).
- KRDS 키트는 선택 전 글자색을 text-disabled 로 그린다 — 이 규격은 안내 옵션도 본문 글자색으로 그려 4.5:1 대비를 지킨다(COLOR-002).
- KRDS 키트는 :focus 에서 outline none 후 테두리 색만 바꾼다 — 이 규격은 :focus-visible 외곽선을 둔다(A11Y-016).
- KRDS 키트 크기 단계(높이 40·48·56px)와 달리 이 규격의 기본 높이·반경은 text-field 와 같은 56px·radius-medium3 이다 — 같은 폼에 놓이는 입력 컴포넌트의 반경을 맞춘다(SHAPE-001).
