# 뒤로가기 버튼 (`.back-button`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

상단바 왼쪽에 두어 직전에 보던 화면(직전 화면이 없으면 정보 구조상 상위 화면)으로 돌아가게 할 때 쓴다.

## 대신 쓸 것
- 모달·바텀시트처럼 뒤로가기 버튼이 없는 레이어를 닫는 경우 → 그 레이어의 닫기 버튼 (NAV-065)
- 현재 위치의 상위 경로 전체를 보여 주어야 하는 경우 → 브레드크럼

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(뒤로가기 링크) | `.back-button` | `a` | 예 | 이동이므로 button 이 아니라 a[href] 를 쓴다(NAV-047). href 는 정보 구조상 상위 화면 URL — 스크립트가 없거나 직전 화면이 없을 때의 목적지다(NAV-064). 상단바 왼쪽 첫 요소로 둔다(NAV-004). |
| 아이콘 | `.back-button__icon` | `svg` | 예 | 바로 옆 텍스트와 같은 뜻이라 장식으로 처리한다(aria-hidden="true", A11Y-001). |
| 텍스트 레이블 | `.back-button__label` | `span` | 예 | '뒤로'. 아이콘만 쓰려면 프로젝트의 공통 인지 아이콘 목록에 뒤로가기를 넣고(COPY-020) 툴팁을 단다(A11Y-054). 그때도 접근 가능한 이름은 '뒤로'로 둔다(NAV-065 판정 기준). |
| 상단바 | `.top-bar` | `div` |  | 뒤로가기 버튼과 화면 제목을 담는 블록. 같은 상단바에 닫기·취소 버튼을 함께 두지 않는다(NAV-065). |
| 화면 제목 | `.top-bar__title` | `h1~h2` |  | 현재 화면 이름. 페이지의 주 제목이면 h1 로 쓴다(예시는 규격 문서 안이라 h2). |

## 표준 마크업

```html
<div class="top-bar">
  <a class="back-button" href="/applications">
    <svg class="back-button__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg>
    <span class="back-button__label">뒤로</span>
  </a>
  <h2 class="top-bar__title">신청서 작성</h2>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.top-bar {
  display: flex;
  align-items: center;
  gap: var(--space-gap-3);
  min-block-size: var(--size-height-8);
  padding-inline: var(--space-padding-4);
  border-block-end: var(--border-width-static-regular) solid var(--color-divider-gray-light);
  background-color: var(--color-surface-white);
}
.top-bar__title {
  margin: 0;
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-xsmall);
  font-weight: var(--font-weight-bold);
  line-height: var(--font-line-height-base);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.back-button {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--space-gap-1);
  min-block-size: var(--size-height-6);
  padding-inline: var(--space-padding-2);
  border-radius: var(--radius-medium3);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  text-decoration: none;
}
.back-button:hover {
  background-color: var(--color-button-text-fill-hover);
}
.back-button:active {
  background-color: var(--color-button-text-fill-pressed);
}
.back-button:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.back-button__icon {
  inline-size: var(--space-scale-10);
  block-size: var(--space-scale-10);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

## 상태
- **작성 중인 입력이 있음**: 마크업 변화 없음. 누르면 이동 전에 '이동'·'머무르기' 확인 대화상자를 띄운다(STATE-032). 실행 버튼은 동작명으로 쓴다(예: '작성 내용 버리고 이동', COPY-006).
- **직접 진입(서비스 안 직전 화면 없음)**: 마크업 변화 없음. 기본 동작(href 의 상위 화면으로 이동)을 그대로 둔다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 뒤로가기 버튼으로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). |
| Enter | 링크를 실행해 직전 화면(없으면 상위 화면)으로 이동한다(A11Y-011, NAV-064). |

## 동작
- 직전 화면이 같은 서비스 안이면 기본 이동을 막고 history.back() 을 실행해 시스템 뒤로가기와 같은 결과를 낸다. 직전 화면이 없거나 외부면 href(상위 화면)로 이동한다(NAV-064, NAV-066).
- 모달·바텀시트 같은 오버레이가 열린 상태에서는 앱 내 뒤로가기와 브라우저 뒤로가기가 같은 결과(둘 다 오버레이 닫기 또는 둘 다 화면 이동)를 내도록 오버레이를 열 때 history 항목을 함께 관리한다(NAV-066).
- 입력 필드 값을 1개 이상 바꾼 뒤 저장하지 않았으면 이동 전에 확인 대화상자를 띄우고, 브라우저 뒤로가기·새로 고침·탭 닫기에는 beforeunload 확인을 건다. 저장한 뒤에는 경고하지 않는다(STATE-032).
- 같은 상단바에 '닫기'·'취소' 버튼을 두지 않는다. 화면을 벗어나는 수단은 뒤로가기 하나로 한다(NAV-065).
- 모든 화면에서 상단바 왼쪽 첫 요소로 같은 위치·같은 이름('뒤로')·같은 아이콘을 쓴다(NAV-004, COPY-004).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-019 | MUST | 텍스트나 텍스트 이미지로 된 레이블이 보이는 UI 컴포넌트는 접근 가능한 이름에 보이는 텍스트를 그대로 포함한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-054 | SHOULD | 텍스트 레이블 없이 아이콘만 있는 메뉴·기능 버튼에는 툴팁을 제공한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-007 | SHOULD | 상호작용 요소의 기본·hover·pressed(active) 상태 색은 같은 색상 계열 토큰 안에서 명도 단계만 올리거나 내려 표현하고 다른 색상 계열로 바꾸지 않는다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| COPY-006 | SHOULD | 확인 대화상자의 실행 버튼 레이블에는 '확인'·'예'·'네'·'OK' 대신 실행할 동작을 동사로 쓴다(예: '삭제', '신청 취소', '제출'). |
| COPY-020 | MAY | 텍스트 레이블 없는 아이콘 버튼은 설정·닫기·공감처럼 대부분의 사용자가 다른 서비스에서 익혀 의미를 아는 기능에만 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| NAV-004 | MUST | 여러 페이지에 반복되는 내비게이션은 사용자가 바꾸지 않는 한 매번 같은 상대 순서로 둔다. |
| NAV-047 | SHOULD | 다른 화면·같은 화면의 다른 섹션으로 이동하는 동작에는 a[href] 링크를, 폼 제출·대화상자 열기·기능 실행처럼 이동하지 않는 동작에는 button을 쓴다. |
| NAV-064 | SHOULD | 뒤로가기 버튼은 직전에 보던 화면으로 이동시키고, 직전 화면이 없으면(외부에서 바로 진입 등) 정보 구조상 상위 화면으로 이동시킨다. |
| NAV-065 | SHOULD | 뒤로가기 버튼이 있는 상단바에는 닫기(X)·취소 버튼을 함께 두지 않는다. |
| NAV-066 | SHOULD | 같은 화면에서 앱 내 뒤로가기 버튼과 시스템 뒤로가기(브라우저 뒤로 버튼·뒤로 제스처)가 서로 다른 화면으로 이동하거나 서로 다른 동작(한쪽은 팝업 닫기, 다른 쪽은 페이지 이탈)을 하지 않게 한다. |
| STATE-032 | SHOULD | 작성 중인 입력 내용이 사라지는 이동(뒤로가기 버튼, 시스템 뒤로가기, 페이지 이탈) 전에는 내용이 사라진다고 경고하고, 계속 이동할지 머무를지 사용자가 고르게 한다. |

## KRDS 키트와의 관계
