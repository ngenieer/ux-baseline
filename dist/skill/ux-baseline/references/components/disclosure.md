# 디스클로저 (`.disclosure`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

특정 정보·컨트롤·섹션에 대한 부가 설명을 기본으로 접어 두고, 필요한 사용자만 펼쳐 보게 할 때 쓴다.

## 대신 쓸 것
- 작업을 마치는 데 반드시 알아야 하는 정보(자격 조건·제출 서류·마감일·수수료·오류 내용 등) → 본문 인라인 텍스트 (COPY-009)
- 같은 섹션에서 여러 묶음을 접고 펼쳐야 하는 경우 → accordion (LAYOUT-033)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.disclosure` | `details` | 예 | 부가 정보를 제공하려는 대상 요소의 다음 형제로 둔다(LAYOUT-032). 페이지 로드 시 open 속성 없이 접힌 상태다(STATE-010). |
| 펼침 컨트롤 | `.disclosure__summary` | `summary` | 예 | 브라우저가 버튼 역할과 펼침 상태를 보조기술에 전달하고 Enter·Space 로 토글한다(A11Y-025, A11Y-011). 문구는 펼쳐질 내용의 주제를 쓴다. |
| 내용 | `.disclosure__content` | `div` | 예 |  |

## 표준 마크업

```html
<section class="disclosure-demo" aria-labelledby="identity-title">
  <h2 id="identity-title">본인 확인</h2>
  <p>공동인증서 또는 간편인증으로 본인 확인을 할 수 있습니다.</p>
  <details class="disclosure">
    <summary class="disclosure__summary">간편인증 이용 방법</summary>
    <div class="disclosure__content">
      <ul>
        <li>휴대전화에 인증 앱을 설치합니다.</li>
        <li>인증 요청을 받으면 앱에서 승인합니다.</li>
      </ul>
    </div>
  </details>
</section>
<section class="disclosure-demo" aria-labelledby="fee-title">
  <h2 id="fee-title">수수료 납부</h2>
  <p>수수료는 신청 단계에서 카드 또는 계좌이체로 냅니다.</p>
  <details class="disclosure" open>
    <summary class="disclosure__summary">수수료 감면 대상 확인 방법</summary>
    <div class="disclosure__content">
      <p>국민기초생활보장 수급자는 신청서의 감면 항목을 선택하면 수수료가 자동으로 감면됩니다.</p>
    </div>
  </details>
</section>
```

## 표준 CSS (토큰만 사용)

```css
.disclosure {
  margin-block-start: var(--space-gap-3);
}
.disclosure__summary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2);
  min-block-size: var(--layout-target-min);
  color: var(--color-text-bolder);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
}
.disclosure__summary::before {
  content: "";
  inline-size: var(--space-scale-4);
  block-size: var(--space-scale-4);
  border-block-end: var(--border-width-static-medium) solid currentColor;
  border-inline-end: var(--border-width-static-medium) solid currentColor;
  transform: rotate(-45deg);
}
.disclosure[open] > .disclosure__summary::before {
  transform: rotate(45deg);
}
.disclosure__summary::-webkit-details-marker {
  display: none;
}
.disclosure__summary:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.disclosure__content {
  margin-block-start: var(--space-gap-2);
  padding: var(--padding-card-small);
  border-radius: var(--radius-xlarge2);
  background-color: var(--color-surface-gray-subtle);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
```

## 상태
- **접힘(기본)**: details 에 open 속성이 없다. 페이지 로드 시 이 상태다(STATE-010).
- **펼침**: 사용자가 펼치면 브라우저가 details 에 open 속성을 붙인다. 꺾쇠 아이콘이 아래를 향한다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 펼침 컨트롤(summary)로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). |
| Enter / Space | 내용을 펼치거나 접는다. 초점은 펼침 컨트롤에 남는다(A11Y-011). |

## 동작
- 기본 구현은 네이티브 details·summary 다. 스크립트로 button + 영역 패턴을 쓰면 button 에 aria-expanded·aria-controls 를 주고 상태가 바뀔 때 값을 바꾼다(A11Y-025).
- 디스클로저는 부가 설명을 제공할 대상 정보·컨트롤·섹션의 바로 아래(DOM 다음 형제)에 둔다(LAYOUT-032).
- 한 섹션(같은 h2·h3 아래)에 디스클로저를 1개만 두고, 디스클로저를 연달아 배치하지 않는다(LAYOUT-033).
- 페이지 로드 시 접힌 상태로 둔다(STATE-010). 작업에 반드시 필요한 정보는 디스클로저 안에만 두지 않는다(COPY-009).
- 펼침 컨트롤의 포인터 대상 높이를 24px 이상으로 둔다(LAYOUT-002).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COPY-009 | SHOULD | 사용자가 작업을 마치는 데 반드시 알아야 하는 정보는 별도 조작 없이 보이는 본문(인라인 텍스트)에 두고, 툴팁·맥락적 도움말·도움 패널·접힌 디스클로저·아코디언·캐러셀 안에만 두지 않는다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-032 | SHOULD | 디스클로저는 부가 정보를 제공하려는 대상 정보·컨트롤·섹션 바로 아래에 둔다. |
| LAYOUT-033 | MAY | 한 섹션에는 디스클로저를 1개만 둔다. |
| STATE-010 | MAY | 디스클로저는 페이지가 로딩될 때 접힌 상태로 제공한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.disclosure` ↔ `krds-disclosure conts-expand-area`, `.disclosure__summary` ↔ `btn-conts-expand`, `.disclosure__content` ↔ `expand-wrap expand-in`
- KRDS 키트의 펼침 버튼(btn-conts-expand)은 aria-expanded·aria-controls 없이 클래스(active)로만 상태를 바꾼다 — 이 규격은 details·summary 로 상태를 보조기술에 전달한다(A11Y-025).
