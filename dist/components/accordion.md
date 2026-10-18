# 아코디언 (`.accordion`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

자주 묻는 질문처럼 관련된 여러 섹션의 제목만 먼저 보이고, 사용자가 고른 섹션의 내용을 펼쳐 보게 할 때 쓴다.

## 대신 쓸 것
- 작업을 마치는 데 반드시 읽어야 하거나 중요도가 높은 정보 → 본문에 펼친 상태의 섹션 (COPY-009)
- 상위나 하위 요소에 이미 아코디언이나 탭이 있는 경우 → 헤딩으로 나눈 일반 섹션 (LAYOUT-036)
- 섹션 하나의 부가 설명만 접어 두는 경우 → disclosure (LAYOUT-033)
- 패널 안에 표를 넣었을 때 표가 잘리거나 가로 스크롤이 생기는 경우 → 열을 세로로 쌓은 목록(dl 등) (LAYOUT-043)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.accordion` | `div` | 예 |  |
| 항목 | `.accordion__item` | `div` | 예 |  |
| 헤더 | `.accordion__heading` | `h2~h6` | 예 | 페이지 구조에 맞는 수준의 헤딩으로 쓴다(A11Y-007). 헤딩 안에는 펼침 버튼만 둔다. |
| 펼침 버튼 | `.accordion__trigger` | `button` | 예 | 헤더 너비 전체를 클릭 영역으로 쓴다(LAYOUT-002). aria-expanded 와 aria-controls 를 가진다(A11Y-025). 상태 아이콘은 헤더 끝에 둔다(LAYOUT-037). |
| 패널 | `.accordion__panel` | `div` | 예 | 접힌 동안 hidden 속성으로 숨긴다. 자체 스크롤을 만들지 않는다(LAYOUT-038). |

## 표준 마크업

```html
<div class="accordion">
  <div class="accordion__item">
    <h2 class="accordion__heading">
      <button type="button" class="accordion__trigger" id="faq-1-trigger" aria-expanded="false" aria-controls="faq-1-panel">신청 결과는 언제 알 수 있나요?</button>
    </h2>
    <div class="accordion__panel" id="faq-1-panel" hidden>
      <p>신청일로부터 14일 안에 문자와 이메일로 알려 드립니다.</p>
    </div>
  </div>
  <div class="accordion__item">
    <h2 class="accordion__heading">
      <button type="button" class="accordion__trigger" id="faq-2-trigger" aria-expanded="true" aria-controls="faq-2-panel">신청 내용을 고칠 수 있나요?</button>
    </h2>
    <div class="accordion__panel" id="faq-2-panel">
      <p>심사가 시작되기 전까지 <a href="/my/applications">나의 신청 내역</a>에서 고칠 수 있습니다.</p>
    </div>
  </div>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.accordion {
  border-block-start: var(--border-width-static-regular) solid var(--color-divider-gray-light);
}
.accordion__item {
  border-block-end: var(--border-width-static-regular) solid var(--color-divider-gray-light);
}
.accordion__heading {
  margin: 0;
  font-size: var(--font-size-heading-xsmall);
}
.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-gap-5);
  inline-size: 100%;
  min-block-size: var(--size-height-7);
  padding-block: var(--space-padding-5);
  padding-inline: var(--space-padding-7);
  border: 0;
  background-color: var(--color-action-secondary);
  color: var(--color-text-basic);
  font-family: inherit;
  font-size: var(--font-size-heading-xsmall);
  font-weight: var(--font-weight-bold);
  text-align: start;
  cursor: pointer;
}
.accordion__trigger:hover {
  background-color: var(--color-action-secondary-hover);
}
.accordion__trigger:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: calc(var(--space-scale-2) * -1);
}
.accordion__trigger::after {
  content: "";
  flex: none;
  inline-size: var(--space-scale-5);
  block-size: var(--space-scale-5);
  border-block-end: var(--border-width-static-medium) solid var(--color-icon-gray);
  border-inline-end: var(--border-width-static-medium) solid var(--color-icon-gray);
  transform: rotate(45deg);
}
.accordion__trigger[aria-expanded="true"] {
  color: var(--color-text-secondary);
}
.accordion__trigger[aria-expanded="true"]::after {
  transform: rotate(-135deg);
}
.accordion__panel {
  padding-block: var(--space-padding-6) var(--space-padding-8);
  padding-inline: var(--space-padding-7);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
.accordion__panel > :first-child {
  margin-block-start: 0;
}
.accordion__panel > :last-child {
  margin-block-end: 0;
}
```

## 상태
- **접힘**: 버튼 aria-expanded="false", 패널에 hidden. 아이콘은 아래 꺾쇠(V)(STATE-015).
- **펼침**: 버튼 aria-expanded="true", 패널의 hidden 제거. 아이콘은 위 꺾쇠(^)(STATE-015).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 펼침 버튼과 펼친 패널 안의 링크·컨트롤 사이를 DOM 순서로 이동한다. 초점 표시가 보인다(A11Y-016). |
| Enter / Space | 초점이 있는 펼침 버튼의 펼침 상태를 바꾼다. 바꾼 뒤에도 초점은 그 버튼에 남는다(A11Y-031). |

## 동작
- 펼침 버튼을 누르면 aria-expanded 값을 바꾸고 패널의 hidden 을 넣거나 뺀다. 초점은 옮기지 않는다(A11Y-025, A11Y-031).
- 상태 아이콘은 접힘에 아래 꺾쇠, 펼침에 위 꺾쇠를 쓰고, 서비스의 모든 아코디언에서 헤더 끝에 둔다(트리 구조형만 헤더 시작)(STATE-015, LAYOUT-037).
- 패널에 max-height·overflow 로 자체 스크롤을 만들지 않는다. 긴 내용은 페이지 스크롤로 읽게 한다(LAYOUT-038).
- 아코디언 패널 안에 아코디언·탭을 넣지 않고, 아코디언을 다른 아코디언 패널이나 탭 패널 안에 두지 않는다(LAYOUT-036).
- 작업에 반드시 필요한 정보는 아코디언 안에만 두지 않는다(COPY-009).
- 헤더 버튼은 헤더 너비 전체를 클릭 영역으로 쓰고, 패널 안 링크·버튼과 헤더 사이에 패딩 간격을 둔다(LAYOUT-002).
- 패널 안에 표를 넣을 때 표가 잘리거나 가로 스크롤이 생기면 표 대신 열을 세로로 쌓는다(LAYOUT-043).
- 모든 펼침·접힘을 키보드만으로 할 수 있다(A11Y-011).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-031 | SHOULD | 아코디언 헤더나 패널 안의 펼침 버튼에 초점이 있을 때 Enter·Space로 펼침 상태를 바꾸고, 바꾼 뒤에도 초점을 그 버튼에 유지한다. |
| COPY-009 | SHOULD | 사용자가 작업을 마치는 데 반드시 알아야 하는 정보는 별도 조작 없이 보이는 본문(인라인 텍스트)에 두고, 툴팁·맥락적 도움말·도움 패널·접힌 디스클로저·아코디언·캐러셀 안에만 두지 않는다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-036 | MAY | 상위나 하위 요소에 이미 아코디언이나 탭이 있으면 아코디언을 쓰지 않는다. |
| LAYOUT-037 | SHOULD | 아코디언 확장 상태 아이콘은 서비스의 모든 아코디언에서 같은 위치에 두고, 관련 섹션 목록형은 헤더 끝, 트리 구조형은 헤더 시작에 둔다. |
| LAYOUT-038 | SHOULD | 아코디언 패널에 자체 세로·가로 스크롤을 만들지 않고, 긴 패널 내용은 페이지 스크롤로 탐색하게 한다. |
| LAYOUT-043 | SHOULD | 아코디언·모달처럼 공간이 제한된 영역에서 표 데이터가 잘리거나 가로 스크롤이 생기면 표를 쓰지 않고 각 열을 세로로 떨어뜨려 배치한다. |
| STATE-015 | SHOULD | 아코디언 헤더의 상태 아이콘은 접힌 상태에서 아래 꺾쇠(V) 또는 '+'를, 펼친 상태에서 위 꺾쇠(^) 또는 '-'를 표시한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.accordion` ↔ `krds-accordion type-line`, `.accordion__item` ↔ `accordion-item`, `.accordion__heading` ↔ `accordion-header`, `.accordion__trigger` ↔ `btn-accordion`, `.accordion__panel` ↔ `accordion-collapse accordion-body`
- KRDS 키트의 펼침 버튼에는 aria-expanded 가 없어 펼침 상태가 보조기술에 전달되지 않는다 — 이 규격은 aria-expanded 를 쓰고 상태가 바뀔 때 값을 바꾼다(A11Y-025).
- KRDS 키트는 헤더를 h5 로 고정한다 — 이 규격은 페이지 구조에 맞는 수준의 헤딩을 쓴다(A11Y-007).
- KRDS 키트는 패널 div 에 aria-labelledby 만 주고 역할은 주지 않는다 — 역할 없는 div 에는 이름을 줄 수 없으므로 이 규격은 패널에 이름 속성을 쓰지 않는다. 패널을 region 으로 만들려면 section 요소와 aria-labelledby 를 쓰되, WAI-ARIA APG 는 동시에 펼칠 수 있는 패널이 약 6개를 넘으면 랜드마크가 늘어나므로 region 을 피하라고 한다(A11Y-025).
