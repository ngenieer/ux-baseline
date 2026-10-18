# 사용자 피드백(만족도 평가) (`.feedback`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

화면·기능 이용을 마친 사용자에게 만족 여부(폐쇄형 질문)를 묻고, 원하면 추가 의견 1~3개를 받는 본문 아래(또는 사이드) 영역이다.

## 대신 쓸 것
- 서비스 전체에 대한 종합 의견을 여러 질문·여러 단계로 받는 경우 → 별도 설문 화면(입력폼)
- 추가 질문이 4개 이상 필요한 경우 → 별도 화면이나 채널

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.feedback` | `section` | 예 | main 의 본문 콘텐츠 뒤 또는 aside 안에 둔다. position: fixed·sticky 로 고정하지 않는다(STATE-004, 린트 ux-baseline/feedback-not-fixed 기본 대상 .feedback·.feedback__trigger). |
| 제목(평가 질문) | `.feedback__title` | `h2~h3` | 예 | 의견을 구하는 대상을 밝히는 질문형 한 문장(COPY-003). 루트의 aria-labelledby 로 연결한다. |
| 설명 | `.feedback__desc` | `p` |  | 선택. 제목에 부가 설명이 필요할 때만. |
| 평가 버튼 묶음 | `.feedback__ratings` | `div[role=group]` | 예 | aria-labelledby 로 제목을 그룹 이름으로 준다(A11Y-007). 감정 평가 2개(네·아니요) 또는 별점 5개 이하. |
| 평가 버튼 | `.feedback__rating` | `button` | 예 | 누르면 평가를 기록하는 명시적 동작이므로 라디오가 아니라 button 을 쓴다(FORM-002). 선택한 버튼은 aria-pressed="true". |
| 맞춤 영역 | `.feedback__more` | `form` |  | 평가 뒤에 나타나는 추가 질문 1~3개와 액션 버튼. 선택 사항. |
| 맞춤 영역 제목 | `.feedback__more-title` | `p` |  |  |
| 추가 질문(선택형) | `.feedback__group` | `fieldset` |  | legend 를 그룹 레이블로 쓴다(FORM-004). 옵션은 가나다순(FORM-032). |
| 선택 옵션 | `.feedback__option` | `div` |  | 체크박스와 label[for] 를 묶는다(FORM-034). |
| 체크박스 | `.feedback__check` | `input[type=checkbox]` |  |  |
| 추가 질문 레이블 | `.feedback__label` | `label` |  |  |
| 부가 설명 | `.feedback__hint` | `p` |  | 형식 안내는 플레이스홀더가 아니라 여기에(FORM-017). textarea 의 aria-describedby 로 연결한다. |
| 의견 입력 | `.feedback__textarea` | `textarea` |  | 개방형 질문은 마지막에 둔다(KRDS). |
| 글자 수 | `.feedback__count` | `p` |  | textarea 바로 다음에 '현재/최대'(FORM-052). 입력마다 갱신(FORM-053). |
| 액션 버튼 묶음 | `.feedback__actions` | `div` |  |  |
| 버튼 | `.feedback__button` | `button` |  | 추가 의견 없이 마치기(건너뛰기)와 제출(의견 보내기). 주 버튼은 feedback__button--primary. |
| 완료 메시지 | `.feedback__result` | `div[role=status]` | 예 | 처음부터 빈 상태로 DOM 에 두고, 제출 뒤 텍스트를 넣어 보조기술에 전달한다(STATE-001). |

## 표준 마크업

```html
<section class="feedback" aria-labelledby="feedback-page-title">
  <h2 class="feedback__title" id="feedback-page-title">이 페이지에 만족하시나요?</h2>
  <div class="feedback__ratings" role="group" aria-labelledby="feedback-page-title">
    <button class="feedback__rating" type="button" aria-pressed="false">네</button>
    <button class="feedback__rating" type="button" aria-pressed="false">아니요</button>
  </div>
  <div class="feedback__result" role="status"></div>
</section>
<section class="feedback" aria-labelledby="feedback-guide-title">
  <h2 class="feedback__title" id="feedback-guide-title">이 안내가 도움이 되었나요?</h2>
  <div class="feedback__ratings" role="group" aria-labelledby="feedback-guide-title">
    <button class="feedback__rating" type="button" aria-pressed="true">네</button>
    <button class="feedback__rating" type="button" aria-pressed="false">아니요</button>
  </div>
  <form class="feedback__more" action="/feedback" method="post">
    <p class="feedback__more-title">감사합니다. 개선에 참고할 의견을 더 남겨 주세요. (선택)</p>
    <fieldset class="feedback__group">
      <legend class="feedback__label">어떤 점이 좋았나요? (선택)</legend>
      <div class="feedback__option">
        <input class="feedback__check" type="checkbox" id="feedback-good-1" name="good-easy" value="yes">
        <label for="feedback-good-1">내용을 이해하기 쉬움</label>
      </div>
      <div class="feedback__option">
        <input class="feedback__check" type="checkbox" id="feedback-good-2" name="good-liked" value="yes">
        <label for="feedback-good-2">내용이 마음에 듦</label>
      </div>
      <div class="feedback__option">
        <input class="feedback__check" type="checkbox" id="feedback-good-3" name="good-found" value="yes">
        <label for="feedback-good-3">필요한 정보를 찾음</label>
      </div>
    </fieldset>
    <div class="feedback__field">
      <label class="feedback__label" for="feedback-comment">기타 의견 (선택)</label>
      <p class="feedback__hint" id="feedback-comment-hint">이름·연락처 같은 개인정보는 쓰지 말아 주세요.</p>
      <textarea class="feedback__textarea" id="feedback-comment" name="comment" rows="4" maxlength="100" aria-describedby="feedback-comment-hint feedback-comment-count"></textarea>
      <p class="feedback__count" id="feedback-comment-count">0/100</p>
    </div>
    <div class="feedback__actions">
      <button class="feedback__button" type="button">건너뛰기</button>
      <button class="feedback__button feedback__button--primary" type="submit">의견 보내기</button>
    </div>
  </form>
  <div class="feedback__result" role="status"></div>
</section>
```

## 표준 CSS (토큰만 사용)

```css
.feedback {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-5);
  padding: var(--space-padding-8);
  border-radius: var(--radius-large1);
  background-color: var(--color-surface-gray-subtler);
}
.feedback__title {
  margin: 0;
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-xsmall);
  font-weight: var(--font-weight-bold);
  line-height: var(--font-line-height-base);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.feedback__desc,
.feedback__more-title,
.feedback__hint {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
  line-height: var(--font-line-height-base);
  word-break: keep-all;
}
.feedback__more-title {
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
.feedback__ratings,
.feedback__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-3);
}
.feedback__rating,
.feedback__button {
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-6);
  border: var(--border-width-static-regular) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-medium3);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-family: inherit;
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-regular);
  line-height: var(--font-line-height-base);
  cursor: pointer;
}
.feedback__rating:hover,
.feedback__button:hover {
  background-color: var(--color-button-tertiary-fill-hover);
}
.feedback__rating:active,
.feedback__button:active {
  background-color: var(--color-button-tertiary-fill-pressed);
}
.feedback__rating[aria-pressed="true"] {
  border-width: var(--border-width-static-medium);
  border-color: var(--color-border-primary);
  background-color: var(--color-surface-primary-subtler);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}
.feedback__button--primary {
  border-color: var(--color-button-primary-fill);
  background-color: var(--color-button-primary-fill);
  color: var(--color-text-inverse-static);
  font-weight: var(--font-weight-bold);
}
.feedback__button--primary:hover {
  border-color: var(--color-button-primary-fill-hover);
  background-color: var(--color-button-primary-fill-hover);
}
.feedback__button--primary:active {
  border-color: var(--color-button-primary-fill-pressed);
  background-color: var(--color-button-primary-fill-pressed);
}
.feedback__rating:focus-visible,
.feedback__button:focus-visible,
.feedback__check:focus-visible,
.feedback__textarea:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.feedback__more {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-6);
}
.feedback__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.feedback__label {
  padding: 0;
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.feedback__option {
  display: flex;
  align-items: center;
  gap: var(--space-gap-3);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
.feedback__check {
  flex-shrink: 0;
  inline-size: var(--space-scale-10);
  block-size: var(--space-scale-10);
  margin: 0;
  accent-color: var(--color-element-primary);
}
.feedback__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
}
.feedback__textarea {
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
.feedback__count {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
  text-align: end;
}
.feedback__result:empty {
  display: none;
}
.feedback__result {
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
  line-height: var(--font-line-height-base);
}
```

## 상태
- **기본(평가 전)**: 평가 버튼 모두 aria-pressed="false", 맞춤 영역 없음, 완료 메시지 영역은 비어 있다.
- **평가 선택(맞춤 영역 열림)**: 누른 평가 버튼에 aria-pressed="true". 평가 버튼 묶음 바로 다음에 맞춤 영역(form)을 넣는다. 초점은 누른 평가 버튼에 그대로 둔다(KRDS 상호작용 가이드라인, A11Y-015).
- **완료**: 맞춤 영역을 지우고 완료 메시지 영역에 '의견을 보내 주셔서 감사합니다.'를 넣는다(STATE-001). 평가 버튼은 aria-disabled="true" 로 바꿔 다시 보내지 않게 하고(FORM-013), 초점은 선택한 평가 버튼으로 옮긴다(A11Y-015).
- **시점형(새 기능 의견)**: 페이지 로드 때는 렌더링하지 않고, 대상 기능의 완료 이벤트(제출 완료 등) 뒤에 본문 아래에 넣는다(STATE-004).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 평가 버튼 → 맞춤 영역의 체크박스·의견 입력·액션 버튼 순서로 초점을 옮긴다(A11Y-011, A11Y-015). 초점 표시가 보인다(A11Y-016). |
| Enter / Space | 평가 버튼에서 평가를 기록하고 맞춤 영역을 연다(맞춤 영역이 없으면 바로 완료). 액션 버튼에서 제출 또는 건너뛰기. |
| Space | 체크박스를 선택·해제한다(A11Y-035). |

## 동작
- 피드백 요소는 main 의 본문 콘텐츠 뒤나 aside 안에 두고, 버튼으로 축약해 화면에 고정(플로팅)하지 않는다. 사이드에 둔 경우 본문과 나란히 둘 수 없는 너비에서는 본문 아래로 옮긴다(STATE-004).
- 새 기능에 대한 의견을 물을 때는 그 기능의 완료 이벤트 뒤에만 표시한다(STATE-004).
- 평가는 사용자가 평가 버튼을 누를 때만 기록한다. 라디오처럼 값을 고르는 것만으로 제출·맥락 변화를 일으키지 않는다(FORM-002).
- 추가 질문은 3개 이하로 두고, 개방형(의견 입력)은 마지막에 둔다(KRDS). 옵션은 가나다순으로 정렬한다(FORM-032).
- 글자 수 표시는 입력·삭제·붙여넣기마다 갱신한다(FORM-053). 한도는 maxlength 와 서버 검증에서 같은 값으로 둔다(FORM-052).
- 제출·건너뛰기 버튼은 첫 누름 뒤 처리가 끝날 때까지 다시 보내지 않는다(FORM-013).
- 완료 메시지는 처음부터 DOM 에 있는 role=status 영역에 텍스트를 넣어 전달한다(STATE-001).
- AI 결과에 대한 피드백에 이 컴포넌트를 쓰면 함께 전송되는 데이터와 사용 목적을 제출 버튼 앞에 텍스트로 알린다(AI-016).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-019 | MUST | 텍스트나 텍스트 이미지로 된 레이블이 보이는 UI 컴포넌트는 접근 가능한 이름에 보이는 텍스트를 그대로 포함한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-035 | SHOULD | 라디오 버튼·체크박스·토글 스위치에 초점이 있을 때 Space 키를 누르면 값을 선택(체크박스·토글은 상태 전환)하게 한다. |
| AI-016 | SHOULD | AI 결과에 대한 피드백을 보내는 화면에는 피드백과 함께 전송되는 데이터(대화 내용 포함 여부)와 그 데이터의 사용 목적을 제출 버튼 앞에 텍스트로 알린다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-007 | SHOULD | 상호작용 요소의 기본·hover·pressed(active) 상태 색은 같은 색상 계열 토큰 안에서 명도 단계만 올리거나 내려 표현하고 다른 색상 계열로 바꾸지 않는다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| FORM-002 | MUST | 입력 필드·셀렉트·라디오 버튼·체크박스·파일 선택의 값을 바꾸거나 항목을 선택하는 것만으로 폼 제출, 페이지 이동, 새 창 열기, 모달 열기, 선택한 항목이 뜻하는 기능(삭제·정렬·저장 등) 실행을 일으키지 않고, 이런 동작은 함께 제공한 실행 버튼을 눌렀을 때만 일으킨다. 값 입력을 마친 뒤 초점을 다음 필드로 옮기는 동작은 입력 전에 그 동작을 텍스트로 알린 경우에만 쓴다(FORM-026). |
| FORM-004 | MUST | 사용자 입력을 받는 모든 컴포넌트에 무엇을 입력하는지 알려주는 보이는 레이블이나 입력 안내를 제공한다. |
| FORM-012 | SHOULD | 입력폼(form 요소와 form 밖의 독립 fieldset)의 필수 항목과 선택 항목을 레이블의 '필수'·'선택' 텍스트, 필수 항목의 별표(*), 또는 '모든 항목이 필수'라는 폼 상단 안내 중 하나로 구분하고, 같은 서비스 안에서는 한 가지 방식만 쓴다. |
| FORM-013 | SHOULD | 데이터를 전송하는 버튼은 첫 번째 누름 뒤 처리가 끝날 때까지 두 번째 누름(클릭·Enter·Space)으로 다시 전송하지 않게 한다. |
| FORM-017 | SHOULD | 플레이스홀더를 레이블이나 도움말 대신 쓰지 않고, 플레이스홀더에 입력 형식 힌트나 예시를 넣을 때는 같은 내용을 입력 필드 밖의 보이는 텍스트(도움말)로도 제공한다. |
| FORM-018 | SHOULD | 개인 식별 정보 입력 필드, 텍스트 입력 필드, 텍스트 영역에서 복사와 붙여넣기를 막지 않는다. |
| FORM-032 | SHOULD | 라디오 버튼·체크박스 옵션은 가나다순으로 정렬하고, 선택 빈도순 등 다른 정렬은 근거(이용 데이터 등)를 설계 문서에 기록했을 때만 쓴다. |
| FORM-034 | SHOULD | 라디오 버튼·체크박스·토글 스위치는 컨트롤뿐 아니라 보이는 레이블 텍스트를 클릭·탭해도 값이 바뀌게 한다. |
| FORM-052 | SHOULD | 글자 수 제한이 있는 텍스트 영역에는 레이블 바로 다음이나 입력 영역 바로 다음에 '현재 글자 수/최대 글자 수'(예: 37/100) 형식으로 글자 수를 텍스트로 표시한다. |
| FORM-053 | SHOULD | 텍스트 영역의 '현재 글자 수/최대 글자 수' 표시는 사용자가 글자를 입력·삭제·붙여넣을 때마다 갱신한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |
| STATE-004 | SHOULD | 만족도 평가 같은 사용자 피드백 요소는 본문 아래(화면 너비가 좁으면 반드시 본문 아래) 또는 본문 옆 사이드 영역에 두고, 버튼으로 축약해 화면에 고정(플로팅)하지 않으며, 새 기능에 대한 의견을 물을 때는 사용자가 그 기능 이용을 마친 뒤에 표시한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.feedback` ↔ `txt-box bg-gray`, `.feedback__title` ↔ `assess-qu`, `.feedback__ratings` ↔ `assess-an`, `.feedback__rating` ↔ `krds-form-chip-outline`, `.feedback__more` ↔ `assess-opinion-wrap`, `.feedback__more-title` ↔ `assess-opinion-tit`, `.feedback__count` ↔ `textarea-count`, `.feedback__actions` ↔ `btm-btn-wrap`, `.feedback__result` ↔ `assess-end-message`
- KRDS 예시는 평가(네·아니오)를 라디오 칩으로 만들고 선택 즉시 맞춤 영역을 열거나 평가를 제출한다 — 이 규격은 button(aria-pressed)으로 만들어, 값 선택만으로 제출하지 않는다(FORM-002).
- KRDS 예시는 평가 질문을 div, 추가 질문 제목을 p 로 써서 그룹 이름이 없다 — 이 규격은 role=group+aria-labelledby, fieldset+legend 로 연결한다(A11Y-007, FORM-004).
- KRDS 예시의 textarea 는 레이블 대신 title 속성과 '내용을 입력해주세요.' 플레이스홀더를 쓴다 — 이 규격은 보이는 label 과 부가 설명을 쓰고 플레이스홀더를 쓰지 않는다(FORM-004, FORM-017).
- KRDS 예시의 글자 수(22/100)는 두 span 으로 나뉘고 textarea 와 연결되지 않는다 — 이 규격은 한 요소에 '현재/최대'로 쓰고 aria-describedby 로 연결한다(FORM-052, A11Y-025).
- KRDS 예시의 체크박스 옵션 순서는 가나다순이 아니다 — 이 규격은 가나다순으로 정렬한다(FORM-032).
- KRDS 예시는 완료 메시지를 별도 블록(aria-live=polite)으로 둔다 — 이 규격은 같은 루트 안의 role=status 영역에 넣는다(STATE-001).
