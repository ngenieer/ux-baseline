# 파일 업로드 (`.file-upload`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

업무 처리에 꼭 필요한 서류·사진 파일을 폼과 함께 제출받을 때 쓴다.

## 대신 쓸 것
- 파일이 없어도 업무를 처리할 수 있는 경우 → 파일 요청을 빼거나 선택 항목으로 바꾼다 (FORM-058)
- 서로 관련 없는 서류 여러 개(예 신분증 사본과 재직증명서)를 받는 경우 → 서류마다 섹션을 나눈 단일 파일 업로드(multiple 없음) (FORM-065)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.file-upload` | `div` | 예 | text-field 와 같은 순서로 레이블 → 부가 설명(제한 사항) → 드롭 영역 → 시스템 메시지 → 파일 목록을 쌓는다(FORM-009). |
| 레이블 | `.file-upload__label` | `label` | 예 | for 로 input[type=file] 과 연결하고 올릴 파일의 용도를 쓴다(FORM-004, COPY-003). |
| 부가 설명 | `.file-upload__hint` | `p` | 예 | 허용 형식, 파일당 최대 크기와 단위, 최대 개수를 쓴다(FORM-059). input 의 aria-describedby 로 연결한다. |
| 드롭 영역 | `.file-upload__dropzone` | `div` | 예 | 끌어다 놓기 안내 문구와 파일 선택 버튼을 담는다. 끌어다 놓기는 파일 선택 버튼의 대안일 뿐이다(A11Y-021). |
| 버튼 틀 | `.file-upload__control` | `div` | 예 | input 과 보이는 버튼을 같은 격자 칸에 겹쳐 같은 위치·크기로 둔다(CF-051). top·left·text-indent 를 쓰지 않는다(A11Y-048). |
| 파일 입력 | `.file-upload__input` | `input[type=file]` | 예 | opacity: 0 으로만 숨긴 네이티브 입력. 초점·클릭·보조기술 노출을 그대로 받는다(CF-051). hidden·display:none 을 쓰지 않는다(A11Y-046). accept 는 확장자 변형을 모두 담는 MIME 타입으로 쓴다(FORM-060). |
| 파일 선택 버튼(보이는 모양) | `.file-upload__button` | `span` | 예 | aria-hidden="true". 입력이 초점을 받으면 이 요소에 초점 표시를 그린다(A11Y-016). 같은 화면의 제출 버튼보다 낮은 강조(윤곽선) 스타일이다(FORM-064). 높이 56px(size-height-8)(LAYOUT-002). |
| 개수 | `.file-upload__count` | `p` |  | '현재 개수 / 최대 개수'. role="status" 로 파일을 더하거나 지울 때 바뀐 개수가 읽힌다(STATE-001). |
| 시스템 메시지(오류) | `.file-upload__message` | `p` |  | 컴포넌트 전체 오류(필수 파일 없음, 최대 개수 초과)만 쓴다. input 의 aria-describedby 에 id 를 더한다(FORM-003). |
| 파일 목록 | `.file-upload__list` | `ul` |  | 다중 업로드는 ul/li, 단일 업로드는 file-item 하나를 p 대신 div 로 둔다(A11Y-007). |
| 파일 항목 | `.file-item` | `li` | 예 | 하위 블록. 파일 이름·형식과 크기·상태·삭제 버튼을 담는다. |
| 파일 이름 | `.file-item__name` | `span` | 예 | 한 줄로 표시하고 넘치면 말줄임표로 줄인다 — white-space: nowrap, overflow: hidden, text-overflow: ellipsis(LAYOUT-055, 린트 ux-baseline/file-name-ellipsis 기본 대상). 전체 이름은 DOM 에 남아 스크린 리더가 읽는다. |
| 형식·크기 | `.file-item__meta` | `span` |  | '[PDF, 1.2MB]' 형식. 이름이 잘려도 이 부분은 줄이지 않는다. |
| 삭제 버튼 | `.file-item__delete` | `button` |  | 텍스트 '삭제' 에 aria-describedby 로 파일 이름을 연결한다(A11Y-025). 높이 40px(size-height-6)(LAYOUT-002). |
| 항목 오류 | `.file-item__message` | `p` |  | 그 파일의 형식·크기 오류. 파일 이름·문제·고치는 방법을 쓴다(COPY-005, FORM-005). |

## 표준 마크업

```html
<div class="file-upload">
  <label class="file-upload__label" for="site-photos">현장 사진 (필수)</label>
  <p class="file-upload__hint" id="site-photos-hint">JPG, PNG 파일 / 파일당 최대 10MB / 최대 5개</p>
  <div class="file-upload__dropzone">
    <p class="file-upload__dropzone-text">사진 파일을 여기에 끌어다 놓거나 파일 선택 버튼을 눌러 주세요.</p>
    <div class="file-upload__control">
      <input class="file-upload__input" type="file" id="site-photos" name="site_photos" accept="image/jpeg,image/png" multiple aria-describedby="site-photos-hint">
      <span class="file-upload__button" aria-hidden="true">파일 선택</span>
    </div>
  </div>
  <p class="file-upload__count" role="status">2개 / 최대 5개</p>
  <ul class="file-upload__list" role="list">
    <li class="file-item">
      <span class="file-item__name" id="site-photos-file-1" tabindex="0">2026년 10월 현장 점검 북측 출입구 전경 사진.jpg</span>
      <span class="file-item__meta">[JPG, 3.4MB]</span>
      <button class="file-item__delete" type="button" aria-describedby="site-photos-file-1">삭제</button>
    </li>
    <li class="file-item file-item--error">
      <span class="file-item__name" id="site-photos-file-2" tabindex="0">남측 주차장 드론 촬영 원본.png</span>
      <span class="file-item__meta">[PNG, 24MB]</span>
      <button class="file-item__delete" type="button" aria-describedby="site-photos-file-2">삭제</button>
      <p class="file-item__message">남측 주차장 드론 촬영 원본.png 파일이 10MB를 넘습니다. 이 파일을 삭제하고 10MB 이하로 줄인 파일을 선택해 주세요.</p>
    </li>
  </ul>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.file-upload {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
}
.file-upload__label {
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.file-upload__hint {
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.file-upload__dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-gap-4);
  padding: var(--space-padding-8);
  border: var(--space-scale-1) dashed var(--color-border-gray-dark);
  border-radius: var(--radius-large1);
  background-color: var(--color-surface-gray-subtler);
  text-align: center;
}
.file-upload__dropzone--active {
  border-color: var(--color-border-primary);
  background-color: var(--color-surface-primary-subtler);
}
.file-upload__dropzone-text {
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
.file-upload__control {
  display: grid;
}
.file-upload__input,
.file-upload__button {
  grid-area: 1 / 1;
}
.file-upload__input {
  z-index: 1;
  inline-size: 100%;
  block-size: 100%;
  opacity: 0;
  cursor: pointer;
}
.file-upload__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-block-size: var(--size-height-8);
  padding-inline: var(--space-padding-7);
  border: var(--space-scale-1) solid var(--color-button-secondary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-secondary-fill);
  color: var(--color-text-primary);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.file-upload__input:hover + .file-upload__button {
  background-color: var(--color-button-secondary-fill-hover);
}
.file-upload__input:focus-visible + .file-upload__button {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.file-upload__count {
  align-self: flex-end;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.file-upload__message {
  color: var(--color-text-danger);
  font-size: var(--font-size-body-small);
}
.file-upload__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  margin: 0;
  padding: 0;
  list-style: none;
}
.file-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-gap-2) var(--space-gap-3);
  padding: var(--space-padding-4) var(--space-padding-6);
  border: var(--space-scale-1) solid var(--color-border-gray-light);
  border-radius: var(--radius-medium3);
}
.file-item--error {
  border-color: var(--color-border-danger);
}
.file-item__name {
  flex: 1 1 0;
  min-inline-size: 0;
  overflow: hidden;
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-item__meta {
  flex: none;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.file-item__delete {
  flex: none;
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-4);
  border: 0;
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-text-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
  text-decoration: underline;
  cursor: pointer;
}
.file-item__delete:hover {
  background-color: var(--color-button-text-fill-hover);
}
.file-item__delete:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.file-item__message {
  flex-basis: 100%;
  color: var(--color-text-danger);
  font-size: var(--font-size-body-small);
}
```

## 상태
- **끌어다 놓는 중**: 파일을 드롭 영역 위로 끌면 드롭 영역에 file-upload__dropzone--active. 놓은 파일은 파일 선택과 같은 처리를 거친다.
- **항목 오류(형식·크기)**: 항목에 file-item--error 와 file-item__message 를 넣는다. 파일 이름·문제·고치는 방법(허용 형식, 최대 크기)을 쓴다(COPY-005, FORM-005). 개수 영역(role="status")에도 '파일 1개를 올릴 수 없습니다. 목록의 오류 문구를 확인해 주세요.' 를 함께 넣어 초점 이동 없이 알린다(STATE-001).
- **최대 개수 초과**: 파일 선택 버튼·드롭 영역은 그대로 쓸 수 있게 두고(disabled·aria-disabled 없음), 최대 개수에 도달한 상태에서 파일을 더 선택하거나 드롭하면 추가 파일은 목록에 넣지 않고(목록과 file-upload__count 의 개수는 그대로) file-upload__message 에 '현장 사진은 최대 5개까지 올릴 수 있습니다. 파일을 삭제한 뒤 다시 선택해 주세요.' 를 넣고 input 의 aria-describedby 에 더한다. 선택·드롭 직후 표시한다(FORM-063, CF-040, FORM-080 예외).
- **필수 파일 없음(제출 시)**: 제출 버튼을 눌렀을 때 파일이 없으면 input 에 aria-invalid="true", file-upload__message 에 '현장 사진을 1개 이상 선택해 주세요.' 를 넣는다(FORM-080, FORM-003).
- **제출 후 전송 중**: 폼을 제출한 뒤 1초가 지나도 전송이 끝나지 않으면 항목마다 진행 표시와 '전송 중' 텍스트를 보인다. 항목별 진행 표시는 스피너 개수 제한의 예외다(STATE-002, STATE-023).
- **단일 파일**: input 에서 multiple 을 빼고 개수 영역을 두지 않는다. 고른 파일은 ul 대신 div.file-item 하나로 보인다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 파일 입력(보이는 '파일 선택' 버튼 위치에 초점 표시) → 각 파일의 삭제 버튼 순서로 옮긴다(A11Y-016). |
| Enter / Space | 파일 입력에서는 운영체제 파일 선택 창을 연다. 삭제 버튼에서는 그 파일을 목록에서 뺀다. |

## 동작
- 파일을 고르기만 해서는 서버로 보내거나 저장하지 않는다. 폼 제출 버튼을 눌렀을 때 보낸다(FORM-002).
- 파일을 고르면 브라우저에서 형식(accept 와 같은 목록)·크기·개수를 확인해 목록에 넣고, 문제가 있는 파일은 항목 오류로 표시한다. 파일을 고른 동작의 결과이므로 고른 직후에 보여 주고, 필수 파일 누락은 제출 때 보여 준다(FORM-080, FORM-003).
- 파일을 더하거나 지우면 file-upload__count 의 개수를 바꾼다(role="status", STATE-001).
- 삭제 버튼으로 파일을 지우면 초점을 다음 항목의 삭제 버튼(없으면 파일 입력)으로 옮긴다 — 지워진 버튼에 있던 초점이 사라지지 않게 한다(A11Y-011).
- 파일을 올린 뒤에도, 최대 개수에 도달한 뒤에도 파일 입력과 드롭 영역을 사용 가능한 상태로 둔다(FORM-063).
- 드롭 영역에 놓은 파일은 파일 입력으로 고른 파일과 같은 확인을 거친다. 드롭 영역이 없어도 모든 기능을 쓸 수 있다(A11Y-021).
- 이미지 파일에 크기 제한을 두면 제한 이하로 줄이는 자동 압축을 제공하거나, 제공하지 않는 이유를 기록한다(FORM-062). 크기 제한값은 제출 파일 표본의 일반 크기보다 작게 정하지 않는다(FORM-061).
- 오류를 표시한 뒤에도 정상 파일은 목록에서 지우지 않는다(FORM-016).
- 모달 안에서는 입력 컴포넌트를 5개 이하로 두고 다중 파일 업로드를 넣지 않는다(FORM-011).
- 이름이 잘린 파일 항목(scrollWidth > clientWidth)은 파일명에 초점이 가거나 마우스를 올리면 전체 이름을 툴팁으로 보여 준다(title 속성만 쓰지 않는다). 잘리지 않은 항목은 tabindex 를 빼도 된다(LAYOUT-055, RESP-002, CF-061).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-021 | MUST | 드래그로 하는 모든 기능을 드래그 없는 단일 포인터 조작(클릭·탭)으로도 할 수 있게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-046 | SHOULD | 스크린 리더에 전달할 숨긴 콘텐츠에는 display:none이나 visibility:hidden을 쓰지 않고 시각적 숨김 스타일(clip·1px 크기 등)을 쓴다. |
| A11Y-048 | SHOULD | 대화형 요소를 시각적으로 숨길 때 text-indent나 top·left 값으로 본래 위치 밖으로 옮기지 않고 top·left를 auto로 유지한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| COPY-005 | SHOULD | 오류 메시지는 오류가 난 항목 이름, 무엇이 잘못됐는지, 고치는 방법(또는 사용자가 할 수 있는 다음 행동)을 담아 높임 종결어미로 쓰고, 사용자를 탓하는 표현과 '오류가 발생했습니다'·'유효하지 않은 값입니다' 같은 일반 문구만으로 된 메시지를 쓰지 않는다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-003 | MUST | 입력 오류를 자동으로 감지하면 오류가 난 항목을 식별하고 오류 내용을 텍스트로 설명한다. |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-005 | MUST | 입력 오류를 자동으로 감지했고 올바른 값의 형식·범위·허용 값을 알고 있으면 오류 메시지에 그 수정 방법을 텍스트로 제시한다. 보안이나 콘텐츠 목적을 해치는 경우만 예외로 한다. |
| FORM-009 | SHOULD | 텍스트 입력 필드의 구성 요소는 레이블, 부가 설명, 입력 박스, 시스템 메시지(도움말·오류) 순서로 위에서 아래로 배치한다. |
| FORM-011 | SHOULD | 모달 안에서 데이터를 입력받을 때는 입력 컴포넌트를 5개 이하로 두고, 모달 안에 탭·아코디언·다단계 절차를 넣지 않는다. |
| FORM-012 | SHOULD | 입력폼(form 요소와 form 밖의 독립 fieldset)의 필수 항목과 선택 항목을 레이블의 '필수'·'선택' 텍스트, 필수 항목의 별표(*), 또는 '모든 항목이 필수'라는 폼 상단 안내 중 하나로 구분하고, 같은 서비스 안에서는 한 가지 방식만 쓴다. |
| FORM-016 | SHOULD | 검증 오류를 안내한 뒤에도 사용자가 입력하거나 선택한 값을 지우거나 초기화하지 않는다. |
| FORM-058 | SHOULD | 파일 첨부가 없으면 업무를 처리할 수 없을 때만 파일 업로드를 요청한다. |
| FORM-059 | SHOULD | 업로드 파일의 형식·크기·개수에 제한이 있으면 허용 형식 목록, 최대 크기와 단위, 최대 개수를 파일 업로드 영역의 도움말 텍스트로 표시한다. |
| FORM-060 | SHOULD | 업로드 허용 파일 형식은 제출 서류가 실제로 쓰이는 형식을 모두 포함하고, 허용한 형식마다 그 형식의 확장자 변형을 모두 받는다(예: JPEG는 .jpg·.jpeg·.jpe). |
| FORM-061 | SHOULD | 업로드 파일 크기에 제한을 둘 때는 제출 대상 파일의 일반적인 크기를 확인하고 그보다 작은 값으로 정하지 않는다. |
| FORM-062 | MAY | 이미지 파일 제출에 크기 제한을 두면 이미지를 제한 크기 이하로 줄이는 자동 압축 기능을 제공한다. |
| FORM-063 | SHOULD | 파일을 올린 뒤에도, 최대 개수에 도달한 뒤에도 파일 선택 버튼과 드롭 영역을 사용 가능한 상태로 두고, 최대 개수에 도달한 상태에서 파일을 더 선택하거나 드롭하면 추가 파일을 올리지 않고 최대 개수를 알리는 오류 문구를 표시하며, 사용자의 입력 자체를 막아야 할 때만 사용 불가 상태로 바꾼다. |
| FORM-064 | SHOULD | 같은 화면에 폼 제출 버튼 같은 최상위 강조 버튼이 있으면 파일 선택 버튼은 그보다 낮은 강조 수준의 버튼 스타일로 표시한다. |
| FORM-065 | MAY | 다중 파일 업로드는 올리는 파일이 모두 서로 관련 있을 때(예: 사진 여러 장)만 쓰고, 서로 관련 없는 파일 여러 개를 받을 때는 섹션을 나누어 파일마다 단일 파일 업로드 컴포넌트를 따로 둔다. |
| FORM-080 | SHOULD | 입력 필드의 오류(오류 메시지와 aria-invalid="true")는 사용자가 필드를 벗어날 때(blur)나 입력하는 동안이 아니라 다음 단계·제출 버튼을 눌렀을 때 표시하고, 다음 단계·제출 버튼은 입력 상태와 관계없이 비활성화하지 않는다. 제출 전에는 aria-invalid를 설정하지 않고 aria-describedby로 연결한 role="status" 영역의 텍스트만 바꾸는 조건 안내(입력 중 비밀번호 조건 충족 여부, 아이디 '중복 확인' 버튼 결과)를 허용한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-055 | SHOULD | 업로드한 파일 이름은 한 줄로 표시하고 파일 항목 컨테이너를 넘치면 말줄임표로 줄이되, 줄인 경우 전체 이름을 키보드 초점과 마우스 호버에서 보이는 툴팁이나 펼침으로 볼 수 있게 한다. |
| RESP-002 | MUST | 자막과 텍스트 이미지를 제외한 텍스트를 보조기술 없이 200%까지 확대해도 콘텐츠와 기능이 손실되지 않게 한다. |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |
| STATE-002 | SHOULD | 요청 후 1초 안에 끝나지 않는 처리에는 처리 중인 영역에 진행 표시(스피너 또는 진행 막대)와 처리 중임을 알리는 텍스트를 표시하고, 1초 안에 끝나는 처리에는 진행 표시를 띄우지 않는다. |
| STATE-023 | SHOULD | 화면에 스피너를 동시에 2개 이상 표시하지 않는다. 버튼·입력 필드 같은 컴포넌트 안에 작게 표시하는 스피너와 파일 업로드처럼 항목마다 진행 상태를 보여야 하는 경우는 예외로 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.file-upload` ↔ `krds-file-upload`, `.file-upload__dropzone` ↔ `file-upload`, `.file-upload__button` ↔ `krds-btn (file-upload-btn-wrap)`, `.file-upload__count` ↔ `total`, `.file-upload__list` ↔ `upload-list`, `.file-item` ↔ `li (file-info)`, `.file-item__name` ↔ `file-name`, `.file-item__message` ↔ `file-hint-invalid`
- KRDS 키트는 input[type=file] 에 hidden 속성을 주고 label 안에 button 을 넣는다 — hidden 입력은 키보드 초점·보조기술에서 빠지고 label 안 button 은 대화형 요소 중첩이다. 이 규격은 네이티브 입력을 opacity 0 으로 보이는 버튼 위에 겹친다(A11Y-046, A11Y-025, CF-051).
- KRDS 키트는 파일을 고른 직후 항목마다 '업로드 중' 스피너를 보인다 — 이 규격은 폼 제출 전에 서버로 보내지 않으므로 진행 표시는 제출 뒤에만 쓴다(FORM-002, STATE-002).
- KRDS 키트의 삭제 버튼은 어느 파일을 지우는지 연결하지 않는다 — 이 규격은 aria-describedby 로 파일 이름을 연결한다(A11Y-025).
- KRDS 키트의 개수 표시(total)는 상태 메시지로 지정되지 않았다 — 이 규격은 role="status" 를 준다(STATE-001).
- KRDS 키트 오류 문구 '등록 가능한 파일 용량을 초과하였습니다.' 에는 어느 파일인지와 높임 요청형 해결 방법이 없다 — 이 규격은 파일 이름·문제·고치는 방법을 쓴다(COPY-005).
