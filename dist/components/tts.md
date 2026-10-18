# 음성지원 (`.tts`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

사용자가 요청할 때 페이지나 영역의 핵심 안내를 요약한 낭독문을 음성으로 들려줄 때 쓴다. 스크린 리더를 대신하지 않는 보완 기능이다.

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.tts` | `div` | 예 | 페이지 단위는 h1 과 같은 제목 영역 안, 영역 단위는 그 영역 제목 요소의 바로 다음 형제로 둔다(LAYOUT-059). |
| 버튼 | `.tts__button` | `button` | 예 | 대기 상태는 '…요약 듣기' 버튼 하나, 재생 중에는 '일시정지'·'정지' 두 버튼(A11Y-009). data-tts-source 에 낭독할 요약 문단의 id 를 둔다. 높이 40px(size-height-6)(LAYOUT-002). |
| 아이콘 | `.tts__icon` | `svg` |  | 텍스트 레이블이 있으므로 aria-hidden="true"(A11Y-001). 아이콘만 있는 버튼을 쓰지 않는다(COPY-003). |
| 레이블 | `.tts__label` | `span` | 예 | 동작과 읽을 대상을 함께 쓴다(예 '신청 자격 요약 듣기')(COPY-003). |

## 표준 마크업

```html
<h2 id="eligibility-title">신청 자격</h2>
<div class="tts">
  <button class="tts__button" type="button" data-tts-source="eligibility-summary">
    <svg class="tts__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>
    <span class="tts__label">신청 자격 요약 듣기</span>
  </button>
</div>
<p id="eligibility-summary">서울시에 6개월 이상 거주한 만 19세 이상이면 신청할 수 있습니다.</p>
<h2 id="documents-title">제출 서류</h2>
<div class="tts tts--playing">
  <button class="tts__button" type="button" data-tts-source="documents-summary">
    <svg class="tts__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
    <span class="tts__label">일시정지</span>
  </button>
  <button class="tts__button" type="button">
    <svg class="tts__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6h12v12H6z"/></svg>
    <span class="tts__label">정지</span>
  </button>
</div>
<p id="documents-summary">신분증 사본과 주민등록등본 1부를 제출해 주세요.</p>
```

## 표준 CSS (토큰만 사용)

```css
.tts {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--space-gap-2);
}
.tts__button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2);
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-4);
  border: var(--space-scale-1) solid var(--color-button-tertiary-border);
  border-radius: var(--radius-max);
  background-color: var(--color-button-tertiary-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
  cursor: pointer;
}
.tts__button:hover {
  background-color: var(--color-button-tertiary-fill-hover);
}
.tts__button:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.tts__button:disabled {
  border-color: var(--color-button-disabled-border);
  background-color: var(--color-button-disabled-fill);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
.tts__icon {
  flex: none;
  inline-size: var(--space-scale-9);
  block-size: var(--space-scale-9);
  fill: currentColor;
}
.tts--playing .tts__button {
  border-color: var(--color-border-primary);
  color: var(--color-text-primary);
}
```

## 상태
- **대기(기본)**: 스피커 아이콘과 '…요약 듣기' 레이블을 단 버튼 하나.
- **재생 중**: 루트에 tts--playing. 첫 버튼의 아이콘·레이블을 '일시정지'로 바꾸고 '정지' 버튼을 더한다. 재생 중 언제든 멈출 수 있어야 한다(A11Y-009).
- **일시정지**: 첫 버튼의 레이블을 '이어 듣기'로 바꾸고 '정지' 버튼을 남긴다.
- **비활성**: 버튼에 disabled. 낭독할 내용이 아직 없을 때(예 결과를 불러오는 중)만 쓴다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 음성지원 버튼으로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). |
| Enter / Space | 듣기·일시정지·이어 듣기·정지를 실행한다(A11Y-011). |

## 동작
- 페이지가 열리거나 바뀔 때 자동으로 낭독하지 않는다. 사용자가 버튼을 눌렀을 때만 재생한다(A11Y-009).
- 재생 중에는 일시정지·정지 버튼을 보이고, 재생이 끝나거나 정지하면 대기 상태로 되돌린다. 레이블을 바꾼 버튼에서 초점을 빼지 않는다(A11Y-009, A11Y-025).
- 낭독문은 data-tts-source 가 가리키는, 화면에 보이는 요약 문단을 읽는다. 영역의 텍스트 전체를 그대로 읽지 않고, 낭독으로만 얻는 정보를 만들지 않는다(A11Y-056, A11Y-057).
- 다른 음성지원 버튼을 누르거나 페이지를 떠나면 재생 중인 낭독을 멈춘다. 한 번에 하나만 재생한다.
- 음성지원을 넣었다는 이유로 글자 크기 조절(resize)·대비 향상 같은 다른 접근성 기능을 빼지 않는다(A11Y-056).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-009 | MUST | 페이지가 열리거나 바뀔 때 자동으로 재생하는 소리는 3초 안에 끝나게 하고, 3초 이상 이어지는 소리를 자동으로 재생하면 시스템 음량과 별개인 멈춤·일시정지·음량 조절 수단과 지정 키(Esc)로 멈추는 기능을 함께 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-056 | SHOULD | 음성지원(TTS)이 읽는 정보를 화면 텍스트로도 제공하고, 음성지원을 글자 크기 조절·대비 향상·쉬운 모드 같은 다른 접근성 기능의 대신으로 두지 않는다. |
| A11Y-057 | SHOULD | 음성지원은 영역의 텍스트 전체를 그대로 읽지 않고 사용자에게 필요한 정보를 요약해 읽으며, 스크린 리더가 읽는 내용과 같은 내용을 중복해서 제공하지 않는다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-003 | MUST | 제목(h1~h6, role=heading)과 폼 컨트롤·컴포넌트의 레이블은 그 영역의 주제나 컨트롤의 목적을 밝히는 말로 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-059 | SHOULD | 페이지 단위 음성지원 버튼은 페이지 상단 또는 주요 제목(h1) 옆에, 영역 단위 음성지원 버튼은 해당 카드·소제목·약관 등 정보 단위의 제목 옆에 둔다. |

## KRDS 키트와의 관계
- 클래스 대응: `.tts__button` ↔ `krds-tts`, `.tts__icon` ↔ `krds-tts-icon`, `.tts__label` ↔ `krds-tts-text`
- KRDS 키트(tts_icon)는 텍스트 없이 aria-hidden 아이콘만 든 버튼을 보여 접근 가능한 이름이 비어 있다 — 이 규격은 동작과 대상을 쓴 보이는 레이블을 항상 둔다(A11Y-025, COPY-003).
- KRDS 키트는 버튼 레이블을 '레이블'·'재생' 처럼 대상 없이 쓴다 — 이 규격은 '신청 자격 요약 듣기' 처럼 읽을 대상을 쓴다(COPY-003).
- KRDS 키트는 onclick 인라인 스크립트에 영역 전체 문장을 넣어 읽는다 — 이 규격은 인라인 스크립트를 쓰지 않고, 화면에 보이는 요약 문단을 data-tts-source 로 가리킨다(A11Y-056, A11Y-057).
- KRDS 키트(tts_size small)는 아이콘에 aria-hidden 이 빠져 있다 — 이 규격은 모든 아이콘에 aria-hidden="true" 를 준다(A11Y-001).
- KRDS 키트 마크업에는 재생 중 상태의 일시정지·정지 버튼 예시가 없다 — 이 규격은 재생 중 '일시정지'·'정지' 버튼을 둔다(A11Y-009).
