# 숨긴 콘텐츠(스크린 리더 전용 텍스트) (`.sr-only`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

화면에는 보이지 않고 스크린 리더만 읽는 텍스트로, 비텍스트 콘텐츠의 복잡한 설명·조작 방법 안내·상태 변화 알림을 전할 때 쓰는 유틸리티 클래스다.

## 대신 쓸 것
- 짧은 이미지 설명이나 버튼·링크·입력의 이름을 전하는 경우 → alt·label·aria-label·aria-labelledby (A11Y-045)
- 작업을 마치는 데 반드시 알아야 하는 정보인 경우 → 화면에 보이는 본문 텍스트 (COPY-009)
- 커스텀 라디오·체크박스·파일 선택처럼 대화형 요소(input)를 시각적으로 숨기는 경우 → opacity: 0 으로 숨긴 네이티브 입력을 보이는 대체 요소와 같은 위치·크기로 겹치고 대체 요소에 초점 표시(예 file-upload__input) (A11Y-048)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 숨긴 텍스트 | `.sr-only` | `span · p (텍스트 요소)` | 예 | clip·1px 크기로 숨긴다. display:none·visibility:hidden·hidden 속성을 이 요소와 조상에 쓰지 않고(A11Y-046), width·height·font-size·line-height 0 을 쓰지 않는다(A11Y-047). 린트 ux-baseline/sr-only-no-display-none·sr-only-no-zero-size 의 기본 대상 클래스다. |
| 초점 시 보이는 변형 | `.sr-only--focusable` | `a` |  | 건너뛰기 링크처럼 초점을 받는 요소에만 쓴다. 초점을 받으면 원래 자리에 나타나고 초점 표시가 보인다(A11Y-016). top·left·text-indent 로 화면 밖에 두지 않는다(A11Y-048). |

## 표준 마크업

```html
<figure>
  <img src="/images/complaints-2026-q1.png" alt="2026년 1분기 월별 민원 접수 건수 막대 그래프" aria-describedby="complaints-chart-desc">
  <p class="sr-only" id="complaints-chart-desc">1월 120건, 2월 95건, 3월 140건입니다. 3월이 가장 많고 2월이 가장 적습니다.</p>
  <figcaption>2026년 1분기 민원 접수 건수</figcaption>
</figure>
<p class="sr-only" role="status">목록을 접수일 최신순으로 정렬했습니다.</p>
```

## 표준 CSS (토큰만 사용)

```css
.sr-only {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: calc(var(--space-scale-1) * -1);
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
.sr-only--focusable:focus {
  position: static;
  inline-size: auto;
  block-size: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  clip-path: none;
  white-space: normal;
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **상태 알림**: 초점을 옮기지 않고 상태 변화를 알릴 때는 숨긴 텍스트에 role="status"(긴급하면 role="alert")를 주고, 요소는 미리 두고 텍스트만 바꾼다(STATE-001).
- **초점을 받는 숨긴 링크**: a 에 sr-only 와 sr-only--focusable 을 함께 준다. 초점을 받으면 원래 자리에 보이고 초점 표시가 나타난다(A11Y-016).

## 동작
- 서비스 언어를 바꾸면 숨긴 텍스트와 aria-label 도 같은 언어로 바꾼다. 숨긴 텍스트를 번역 리소스 키로 관리하고 하드코딩하지 않는다(A11Y-049).
- 숨긴 텍스트를 쓰기 전에 주변 텍스트나 화면에 보이는 표시로 해결할 수 있는지 먼저 확인한다. 과업에 필요한 정보는 보이는 본문에 둔다(COPY-009).
- 숨긴 텍스트의 조상 요소를 display:none·visibility:hidden·hidden 으로 숨기면 스크린 리더도 읽지 않는다 — 상태를 바꿀 때 조상을 숨기지 않는다(A11Y-046).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-045 | MAY | 스크린 리더 전용 숨긴 텍스트는 비텍스트 콘텐츠의 복잡한 설명, 조작 방법 안내, 요소·화면의 상태 변화 정보 전달에 쓰고, 간결한 이미지 설명이나 요소의 접근 가능한 이름 전달에는 alt·label·aria-label을 쓴다. |
| A11Y-046 | SHOULD | 스크린 리더에 전달할 숨긴 콘텐츠에는 display:none이나 visibility:hidden을 쓰지 않고 시각적 숨김 스타일(clip·1px 크기 등)을 쓴다. |
| A11Y-047 | SHOULD | 숨긴 콘텐츠에 width:0, height:0, font-size:0, line-height:0을 쓰지 않는다. |
| A11Y-048 | SHOULD | 대화형 요소를 시각적으로 숨길 때 text-indent나 top·left 값으로 본래 위치 밖으로 옮기지 않고 top·left를 auto로 유지한다. |
| A11Y-049 | SHOULD | 서비스 제공 언어를 바꾸면 숨긴 콘텐츠(스크린 리더 전용 텍스트·aria-label)의 텍스트도 같은 언어로 바꾼다. |
| COPY-009 | SHOULD | 사용자가 작업을 마치는 데 반드시 알아야 하는 정보는 별도 조작 없이 보이는 본문(인라인 텍스트)에 두고, 툴팁·맥락적 도움말·도움 패널·접힌 디스클로저·아코디언·캐러셀 안에만 두지 않는다. |
| SPACE-001 | MUST | margin·padding·gap 등 모든 간격 값은 디자인 토큰의 간격 스케일(KRDS: number 원시 토큰과 gap·padding 토큰)에서만 고르고 CSS에 px 값을 직접 쓰지 않는다. |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.sr-only` ↔ `sr-only (KRDS 페이지 예시 클래스 hidden-text)`
- KRDS 페이지 예시(hidden-text)는 margin -1px 를 직접 쓴다 — 이 규격은 토큰으로 계산한 값(calc(var(--space-scale-1) * -1))을 쓴다(SPACE-001).
- KRDS 페이지의 대화형 요소 숨김 예시(hidden-control)는 20px 크기·1px 글자로 숨긴다 — 이 규격은 대화형 요소에 sr-only 를 쓰지 않고 opacity 0 겹치기와 대체 요소의 초점 표시를 쓴다(CF-051, A11Y-048, A11Y-016).
