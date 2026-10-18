# 스피너 (`.spinner`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

요청 후 1초 안에 끝나지 않는 처리를 기다리는 동안, 처리가 일어나는 영역 안에 진행 중임을 보여 줄 때 쓴다.

## 대신 쓸 것
- 화면(페이지) 첫 로드 → 스켈레톤 (STATE-020)
- 파일 업로드처럼 진행률을 계산할 수 있고 가로 공간이 있는 처리 → 진행 막대(progress) 또는 확정 스피너(spinner--determinate) (STATE-020)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(상태 영역) | `.spinner` | `div` | 예 | role="status". 처리 영역 안에 비어 있는 상태로 미리 두고, 처리가 1초를 넘으면 안을 채운다(STATE-001, STATE-002, STATE-022). |
| 식별자 | `.spinner__indicator` | `progress` | 예 | 네이티브 progress 를 링 모양으로 그린다. 처리 영역(aria-busy 대상) 전체를 불러오는 로딩이면 aria-labelledby 로 처리 영역의 제목을 이름으로, aria-describedby 로 처리 중 텍스트를 설명으로 준다(WAI-ARIA progressbar, STATE-046). 버튼·입력 필드 안처럼 처리 영역 제목이 없는 컴포넌트 안 대기는 aria-labelledby 로 처리 중 텍스트를 이름으로 준다. 같은 요소를 이름과 설명에 함께 가리키지 않는다. 불확정이면 value 를 두지 않는다(STATE-020). |
| 확정 링 | `.spinner__ring` | `svg` |  | 확정 스피너(spinner--determinate)에서만 쓰는 시각 표현. aria-hidden="true". 값은 함께 두는 progress(value·max)가 보조기술에 전달한다. |
| 처리 중 텍스트 | `.spinner__text` | `span` | 예 | 무엇을 처리 중인지 화면에 텍스트로 쓴다(STATE-002). 예 '목록을 불러오는 중입니다.' |

## 표준 마크업

```html
<section class="spinner-demo" aria-labelledby="result-list-title" aria-busy="true">
  <h2 id="result-list-title">검색 결과</h2>
  <div class="spinner spinner--large" role="status">
    <progress class="spinner__indicator" aria-labelledby="result-list-title" aria-describedby="result-list-loading"></progress>
    <span class="spinner__text" id="result-list-loading">검색 결과를 불러오는 중입니다.</span>
  </div>
</section>
```

## 표준 CSS (토큰만 사용)

```css
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-gap-3);
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.spinner__indicator {
  display: inline-block;
  flex-shrink: 0;
  inline-size: var(--size-height-3);
  block-size: var(--size-height-3);
  appearance: none;
  border: var(--border-width-variable-medium) solid var(--color-element-disabled-light);
  border-block-start-color: var(--color-element-primary);
  border-radius: var(--radius-max);
  background-color: transparent;
  color: transparent;
  animation-name: spinner-rotate;
  animation-duration: var(--motion-duration-max);
  animation-timing-function: var(--motion-easing-linear);
  animation-iteration-count: 10;
}
.spinner__indicator::-webkit-progress-bar,
.spinner__indicator::-webkit-progress-value {
  background-color: transparent;
}
.spinner__indicator::-moz-progress-bar {
  background-color: transparent;
}
.spinner--large {
  flex-direction: column;
}
.spinner--large .spinner__indicator,
.spinner--large .spinner__ring {
  inline-size: var(--size-height-7);
  block-size: var(--size-height-7);
}
.spinner--small .spinner__indicator,
.spinner--small .spinner__ring {
  inline-size: var(--size-height-2);
  block-size: var(--size-height-2);
}
.spinner--page {
  position: fixed;
  inset: 0;
  z-index: 1000;
  flex-direction: column;
  background-color: var(--color-surface-white-subtler);
}
.spinner--page .spinner__indicator {
  inline-size: var(--size-height-7);
  block-size: var(--size-height-7);
  animation-iteration-count: infinite;
}
.spinner--determinate .spinner__indicator {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  animation-name: none;
}
.spinner__ring {
  flex-shrink: 0;
  inline-size: var(--size-height-3);
  block-size: var(--size-height-3);
  transform: rotate(-90deg);
}
.spinner__track,
.spinner__fill {
  fill: none;
  stroke-width: 3;
}
.spinner__track {
  stroke: var(--color-element-disabled-light);
}
.spinner__fill {
  stroke: var(--color-element-primary);
}
@media (prefers-reduced-motion: reduce) {
  .spinner__indicator {
    animation-name: none;
  }
}
@keyframes spinner-rotate {
  to {
    transform: rotate(1turn);
  }
}
```

## 상태
- **대기(기본)**: spinner 영역(role=status)만 비어 있는 상태로 DOM 에 있다. 처리 시작 후 1초 안에 끝나면 아무것도 넣지 않는다(STATE-002).
- **처리 중(불확정)**: 처리가 1초를 넘으면 spinner__indicator 와 spinner__text 를 넣는다. 처리 영역에 aria-busy="true" 를 두고, 식별자 progress 는 처리 영역 제목을 aria-labelledby, 처리 중 텍스트를 aria-describedby 로 가리킨다(STATE-046).
- **처리 중(확정, spinner--determinate)**: 루트에 spinner--determinate, 식별자 progress 에 max="100" value(0~100)를 두고(시각적으로 숨김), 그 앞에 spinner__ring SVG(aria-hidden)를 넣는다 — 원 2개(spinner__track, spinner__fill)에 pathLength="100", spinner__fill 에 stroke-dasharray="<값> 100". 스크립트는 진행률이 바뀔 때마다 progress 의 value 와 spinner__fill 의 stroke-dasharray 속성을 함께 갱신한다. 링을 -90도 돌려 12시 방향에서 시계 방향으로 채운다(MOTION-003). 인라인 style 은 쓰지 않는다.
- **완료**: 처리가 끝나면(확정 스피너는 100% 가 되면) 식별자와 텍스트를 지우고 결과를 표시한다. aria-busy 를 지운다. 결과 요약이 필요하면 같은 status 영역에 '검색 결과 24건' 같은 텍스트를 넣는다(STATE-001).
- **버튼·입력 필드 안(spinner--small)**: 버튼 안에서는 role="status" 를 버튼 안에 두지 않는다. 버튼 레이블을 '제출 중'으로 바꾸고 aria-disabled="true" 를 둔 뒤, 페이지의 별도 status 영역에 처리 중 텍스트를 넣는다. 입력 필드 안 스피너는 필드 오른쪽 안쪽에 겹쳐 두고 status 영역은 필드 밖(필드 다음 형제)에 둔다.
- **전체 화면 로딩(spinner--page)**: 다른 콘텐츠 없이 화면 전체를 덮는 로딩에만 쓴다. 이때만 회전을 무한 반복한다(CF-036).

## 동작
- 요청 후 1초가 지나도 끝나지 않을 때만 스피너를 표시하고(타이머로 1초 뒤 삽입, 그 전에 끝나면 취소), 처리 없이 타이머만으로 스피너를 보이지 않는다(STATE-002, STATE-019).
- 처리 중 텍스트는 role="status" 영역으로 보조기술에 전달한다. status 영역은 미리 DOM 에 두고 내용만 넣는다(STATE-001).
- 스피너는 처리되는 영역 안(제출은 제출 버튼 안)에 두고, 영역 전체를 불러올 때는 그 영역 가운데에 둔다(STATE-022). 크기는 배치 유형으로 정한다 — 버튼·메뉴 항목·입력 필드 안과 결과 내용을 대신하지 않는 상태 행(결과 영역 위·아래 한 줄)은 spinner--small, 결과가 들어갈 영역(aria-busy 대상)의 내용을 대신하는 영역 로딩은 spinner--large, 화면 전체는 spinner--page. 크기 변형 없는 기본 스피너는 쓰지 않는다(STATE-021).
- 한 화면에 스피너를 2개 이상 동시에 표시하지 않는다. 컴포넌트 안 small 스피너와 파일 항목별 진행 표시는 예외다(STATE-023).
- 회전은 다른 콘텐츠와 함께 보이므로 5초(motion-duration-max 500ms × 10회)가 지나면 멈춘다. 처리 중 텍스트는 처리가 끝날 때까지 그대로 보여 상태를 전한다. 다른 콘텐츠 없이 화면 전체를 덮는 spinner--page 만 무한 회전한다(MOTION-001, CF-036).
- 모션 줄이기 설정(prefers-reduced-motion reduce)에서는 회전하지 않는다. 상태는 텍스트로 전한다(MOTION-004).
- 진행률을 계산할 수 있는 처리에는 확정 스피너(또는 진행 막대)를 쓰고 progress 의 value 를 링 표시와 함께 갱신한다. 100% 가 되면 스피너를 숨기고 결과를 표시한다(STATE-020, MOTION-003).
- 진행 중 색(element-primary)과 트랙 색(element-disabled-light)의 대비 3:1 이상을 유지한다(COLOR-003).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| MOTION-001 | MUST | 자동으로 시작해 5초를 넘게 다른 콘텐츠와 함께 움직이거나 깜빡이거나 스크롤되는 콘텐츠와, 자동으로 시작해 다른 콘텐츠와 함께 표시되는 자동 갱신 콘텐츠에는 일시정지·정지·숨기기 수단(자동 갱신은 갱신 빈도 조절도 가능)을 제공한다. |
| MOTION-003 | SHOULD | 확정 스피너는 식별자를 0도(12시 방향)에서 시계 방향으로 채우되 채운 각도를 실제 진행률에 맞추고, 360도가 채워지면 스피너를 숨기고 결과 화면을 표시한다. |
| MOTION-004 | SHOULD | prefers-reduced-motion: reduce일 때 사용자 상호작용(클릭·탭·스크롤·호버·초점)으로 시작되는 모션 애니메이션 가운데 기능·정보 전달에 필수가 아닌 것은 끄거나 요소의 위치·크기·모양이 변하지 않는 효과로 바꾼다. |
| MOTION-010 | MUST | 애니메이션·전환의 지속 시간(duration)과 이징(easing)은 모션 디자인 토큰(CSS 변수)에서만 고르고 CSS·JS에 ms 값이나 cubic-bezier() 값을 직접 쓰지 않는다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |
| STATE-002 | SHOULD | 요청 후 1초 안에 끝나지 않는 처리에는 처리 중인 영역에 진행 표시(스피너 또는 진행 막대)와 처리 중임을 알리는 텍스트를 표시하고, 1초 안에 끝나는 처리에는 진행 표시를 띄우지 않는다. |
| STATE-019 | SHOULD | 스피너는 처리 중인 작업이 있어 사용자가 기다려야 하는 동안에만 표시하고, 장식이나 화면 전환 연출로 쓰지 않는다. |
| STATE-020 | SHOULD | 진행률을 계산할 수 있는 처리(파일 업로드·다운로드처럼 끝 지점이 정해진 처리)에는 진행률 값을 보여주는 확정 진행 표시를 쓰고, 완료 시점을 알 수 없는 처리에는 불확정 진행 표시를 쓰며, 진행 표시 요소에 접근 가능한 이름을 준다. |
| STATE-021 | SHOULD | 스피너 크기는 배치 유형으로 정한다: 버튼·메뉴 항목·입력 필드 안과 결과 내용을 대신하지 않는 상태 행에는 작은 크기를, 결과가 들어갈 영역의 내용을 대신하는 영역 로딩과 페이지 전체 로딩에는 큰 크기를 쓴다. |
| STATE-022 | SHOULD | 스피너는 처리가 일어나는 영역 안(제출 처리는 제출 버튼 안에 둘 수도 있다)에 두고, 페이지 전체나 맥락이 바뀌는 영역 전체를 불러올 때는 화면 또는 그 영역의 가운데에 둔다. |
| STATE-023 | SHOULD | 화면에 스피너를 동시에 2개 이상 표시하지 않는다. 버튼·입력 필드 같은 컴포넌트 안에 작게 표시하는 스피너와 파일 업로드처럼 항목마다 진행 상태를 보여야 하는 경우는 예외로 한다. |
| STATE-046 | MAY | 영역의 콘텐츠를 불러오거나 여러 번에 나눠 갱신하는 동안 그 영역에 aria-busy="true"를 두고, 갱신이 끝나면 aria-busy="false"로 바꾸거나 속성을 제거한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.spinner` ↔ `krds-spinner`, `.spinner__indicator` ↔ `krds-spinner::before`, `.spinner__text` ↔ `krds-spinner 텍스트 노드`
- KRDS 키트는 처리 중 텍스트를 '로딩 중'(sr-only)과 'Loading data..'로 따로 쓰고 진행 표시 요소에 role·이름이 없다 — 이 규격은 보이는 한국어 텍스트 하나를 쓰고, 식별자를 네이티브 progress(암묵 역할 progressbar)로 만들고 처리 영역 로딩이면 영역 제목을 이름·그 텍스트를 설명으로, 컴포넌트 안 대기면 그 텍스트를 이름으로 준다(STATE-002, STATE-020, STATE-046).
- KRDS 키트 회전은 900ms 무한 반복이다 — 이 규격은 모션 토큰(motion-duration-max)만 쓰고(MOTION-010), 다른 콘텐츠와 함께 보이는 스피너는 5초 뒤 회전을 멈춘다(MOTION-001, CF-036).
- KRDS 키트는 입력 필드 스피너의 role="status" 를 필드 안에 겹쳐 둔다 — 이 규격은 status 영역을 필드 밖에 둔다.
