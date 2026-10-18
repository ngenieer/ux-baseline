# 캐러셀 (`.carousel`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

같은 영역에서 홍보 배너·주요 소식 같은 2~5개의 보조 콘텐츠를 한 번에 하나씩 넘겨 보여 줄 때 쓴다.

## 대신 쓸 것
- 항목이 6개 이상인 경우 → 목록(structured-list 등) (LAYOUT-039)
- 작업을 마치는 데 반드시 알아야 하는 정보 → 본문 인라인 텍스트 (COPY-009)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.carousel` | `section` | 예 | aria-roledescription="carousel" 과 aria-label 로 영역 이름을 준다(A11Y-025). |
| 자동 넘김 정지·재생 버튼 | `.carousel__rotation` | `button` |  | 자동 넘김을 쓰면 반드시 두고, 캐러셀 안 첫 번째 상호작용 요소로 마크업한다(MOTION-001). 자동 넘김을 쓰지 않으면 뺀다. |
| 슬라이드 영역 | `.carousel__stage` | `div` | 예 | 이전 버튼 · 슬라이드 묶음 · 다음 버튼을 가로로 배치해 탐색 버튼을 컨테이너 세로 가운데 좌우에 둔다(LAYOUT-040). |
| 이전·다음 버튼 | `.carousel__prev` | `button` | 예 | 스와이프의 단일 클릭 대안이다(A11Y-017). 다음 버튼은 carousel__next. 24×24px 이상(LAYOUT-002). |
| 슬라이드 묶음 | `.carousel__slides` | `div` | 예 | 자동 넘김 중에는 aria-live="off", 정지 상태에서는 aria-live="polite". |
| 슬라이드 | `.carousel__slide` | `div[role=tabpanel]` | 예 | aria-roledescription="slide" 와 aria-label="n / 전체" 를 준다(NAV-048). 현재 슬라이드 외에는 hidden(A11Y-015). |
| 항목 식별자(도형형) | `.carousel__indicators` | `div[role=tablist]` | 예 | 슬라이드마다 탭 하나. 전체 수와 현재 위치를 보인다(NAV-048). 컨테이너 가운데에 둔다(LAYOUT-040). |
| 식별자 탭 | `.carousel__dot` | `button[role=tab]` | 예 |  |

## 표준 마크업

```html
<section class="carousel" aria-roledescription="carousel" aria-label="주요 소식">
  <div class="carousel__toolbar">
    <button type="button" class="carousel__rotation" aria-label="자동 넘김 정지"><span class="carousel__icon" aria-hidden="true">❚❚</span></button>
  </div>
  <div class="carousel__stage">
    <button type="button" class="carousel__prev" aria-controls="news-slides" aria-label="이전 슬라이드"><span class="carousel__icon" aria-hidden="true">‹</span></button>
    <div class="carousel__slides" id="news-slides" aria-live="off">
      <div class="carousel__slide" role="tabpanel" id="news-slide-1" aria-roledescription="slide" aria-label="1 / 3">
        <div class="carousel__text">
          <h2 class="carousel__title">청년 주거비 지원 신청 시작</h2>
          <p class="carousel__body">11월 1일부터 30일까지 온라인으로 신청할 수 있습니다.</p>
          <a class="carousel__link" href="/notices/101">청년 주거비 지원 안내 보기</a>
        </div>
        <img class="carousel__media" src="/images/banner-housing.png" alt="" width="243" height="178">
      </div>
      <div class="carousel__slide" role="tabpanel" id="news-slide-2" aria-roledescription="slide" aria-label="2 / 3" hidden>
        <div class="carousel__text">
          <h2 class="carousel__title">전자 민원 서비스 정기 점검</h2>
          <p class="carousel__body">10월 25일 02:00~06:00에 일부 서비스를 이용할 수 없습니다.</p>
          <a class="carousel__link" href="/notices/maintenance-20261025">점검 일정 안내 보기</a>
        </div>
        <img class="carousel__media" src="/images/banner-maintenance.png" alt="" width="243" height="178">
      </div>
      <div class="carousel__slide" role="tabpanel" id="news-slide-3" aria-roledescription="slide" aria-label="3 / 3" hidden>
        <div class="carousel__text">
          <h2 class="carousel__title">민원 만족도 조사 참여 안내</h2>
          <p class="carousel__body">조사에 참여하면 서비스 개선에 의견이 반영됩니다.</p>
          <a class="carousel__link" href="/survey">민원 만족도 조사 참여하기</a>
        </div>
        <img class="carousel__media" src="/images/banner-survey.png" alt="" width="243" height="178">
      </div>
    </div>
    <button type="button" class="carousel__next" aria-controls="news-slides" aria-label="다음 슬라이드"><span class="carousel__icon" aria-hidden="true">›</span></button>
  </div>
  <div class="carousel__indicators" role="tablist" aria-label="슬라이드 선택">
    <button type="button" class="carousel__dot" role="tab" id="news-dot-1" aria-selected="true" aria-controls="news-slide-1" aria-label="1번 슬라이드"></button>
    <button type="button" class="carousel__dot" role="tab" id="news-dot-2" aria-selected="false" aria-controls="news-slide-2" aria-label="2번 슬라이드" tabindex="-1"></button>
    <button type="button" class="carousel__dot" role="tab" id="news-dot-3" aria-selected="false" aria-controls="news-slide-3" aria-label="3번 슬라이드" tabindex="-1"></button>
  </div>
</section>
```

## 표준 CSS (토큰만 사용)

```css
.carousel {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  padding: var(--space-padding-6);
  border-radius: var(--radius-xlarge2);
  background-color: var(--color-surface-gray-subtler);
}
.carousel__toolbar {
  display: flex;
  justify-content: flex-end;
}
.carousel__stage {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-gap-3);
}
.carousel__rotation,
.carousel__prev,
.carousel__next {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: var(--size-height-6);
  min-block-size: var(--size-height-6);
  padding: 0;
  border: var(--border-width-static-regular) solid var(--color-border-gray-dark);
  border-radius: var(--radius-medium3);
  background-color: var(--color-surface-white);
  color: var(--color-icon-gray);
  font-size: var(--font-size-body-medium);
  cursor: pointer;
}
.carousel__slide {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-gap-5);
}
.carousel__text {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: var(--space-gap-3);
  min-inline-size: 0;
}
.carousel__title {
  margin: 0;
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-medium);
  font-weight: var(--font-weight-bold);
}
.carousel__body {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-medium);
}
.carousel__link {
  align-self: flex-start;
  color: var(--color-text-primary);
  font-size: var(--font-size-body-medium);
  text-decoration: underline;
}
.carousel__media {
  max-width: 100%;
  height: auto;
}
.carousel__indicators {
  display: flex;
  justify-content: center;
  gap: var(--space-gap-1);
}
.carousel__dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: var(--layout-target-min);
  min-block-size: var(--layout-target-min);
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}
.carousel__dot::before {
  content: "";
  inline-size: var(--space-scale-5);
  block-size: var(--space-scale-5);
  border-radius: var(--radius-max);
  background-color: var(--color-element-gray);
}
.carousel__dot[aria-selected="true"]::before {
  inline-size: var(--space-scale-9);
  background-color: var(--color-element-secondary);
}
.carousel__rotation:focus-visible,
.carousel__prev:focus-visible,
.carousel__next:focus-visible,
.carousel__link:focus-visible,
.carousel__dot:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **자동 넘김 중**: 정지 버튼 aria-label="자동 넘김 정지", 슬라이드 묶음 aria-live="off". 키보드 초점이 캐러셀 안에 들어오거나 포인터가 캐러셀 위에 있으면 넘김을 멈춘다(MOTION-001).
- **자동 넘김 정지**: 버튼 aria-label="자동 넘김 시작"·아이콘 ▶ 로 바꾸고, 슬라이드 묶음 aria-live="polite" 로 바꾼다.
- **슬라이드 선택**: 선택 탭 aria-selected="true"·tabindex 제거, 해당 슬라이드의 hidden 제거. 나머지 탭은 aria-selected="false"·tabindex="-1", 슬라이드는 hidden. 선택 점은 색과 함께 길이(가로로 긴 막대)로 구분한다(COLOR-001).
- **항목 1개**: 정지·재생 버튼, 이전·다음 버튼, 항목 식별자를 렌더링하지 않는다(STATE-016).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 정지·재생 버튼 → 이전 버튼 → 현재 슬라이드의 링크 → 다음 버튼 → 선택된 식별자 탭 순서로 이동한다. 숨긴 슬라이드에는 초점이 가지 않는다(A11Y-015). 초점 표시가 보인다(A11Y-016). |
| Enter / Space | 정지·재생, 이전·다음 버튼을 실행한다. |
| → / ← | 식별자 탭에 초점이 있을 때 다음·이전 슬라이드 탭으로 초점을 옮기고 그 슬라이드를 보인다. 끝에서 처음으로 순환한다(A11Y-033). |
| Home / End | 식별자 탭에서 첫 번째·마지막 슬라이드를 선택한다. |

## 동작
- 자동 넘김을 쓰면 정지·재생 버튼을 캐러셀의 첫 상호작용 요소로 두고, 초점 진입·포인터 올림 시 멈춘다. 키보드 진입으로 멈춘 경우 사용자가 재생 버튼을 누르기 전까지 다시 시작하지 않는다(MOTION-001).
- 이전·다음 버튼과 식별자 탭으로 모든 전환을 단일 클릭·탭과 키보드로 할 수 있게 한다. 스와이프는 추가 수단이다(A11Y-017, A11Y-011).
- 현재 슬라이드 외에는 hidden 으로 숨겨 초점과 스크린 리더가 접근하지 않게 한다(A11Y-015).
- 슬라이드는 5개 이하로 둔다(LAYOUT-039). 항목이 1개가 되면 탐색 컨트롤을 모두 숨긴다(STATE-016).
- 전체 슬라이드 수와 현재 위치를 식별자로 보인다(NAV-048). 도형형 식별자는 컨테이너 가운데에, 탐색 버튼은 세로 가운데 좌우에 둔다(LAYOUT-040). 1024px 미만에서 분수형('1 / 3') 식별자로 바꾸면 오른쪽 아래에 둔다(LAYOUT-040, RESP-004).
- 각 슬라이드 본문은 지원하는 모든 화면 너비에서 2줄 이하로 쓴다(COPY-026). 슬라이드 텍스트는 이미지가 아닌 실제 텍스트로 넣는다(TYPO-001). 장식 이미지는 alt="" 로 둔다(A11Y-001).
- 작업에 반드시 필요한 정보를 캐러셀에만 두지 않는다(COPY-009).
- 컨트롤 테두리·식별자 점은 인접 배경과 3:1 이상 대비를 갖는다(COLOR-003). 컨트롤은 24×24px 이상이다(LAYOUT-002).
- 슬라이드 전환 애니메이션을 넣으면 transform 으로 만들고 모션 토큰을 쓴다(MOTION-010, MOTION-012).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-017 | MUST | 다중 포인터(핀치·두 손가락) 또는 경로 기반 제스처(스와이프·그리기)로 하는 모든 기능을 경로 없는 단일 포인터 조작(탭·클릭)으로도 할 수 있게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-033 | SHOULD | 캐러셀 페이지네이션 인디케이터 그룹에 초점이 있을 때 ←·→ 방향키로 이전·다음 콘텐츠로 선택을 바꾸게 한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COPY-002 | MUST | 링크의 목적을 링크 텍스트만으로, 또는 링크 텍스트와 프로그램으로 판별되는 링크 맥락(같은 문장·문단·목록 항목·표 셀·aria-describedby)으로 알 수 있게 쓴다. |
| COPY-009 | SHOULD | 사용자가 작업을 마치는 데 반드시 알아야 하는 정보는 별도 조작 없이 보이는 본문(인라인 텍스트)에 두고, 툴팁·맥락적 도움말·도움 패널·접힌 디스클로저·아코디언·캐러셀 안에만 두지 않는다. |
| COPY-026 | SHOULD | 캐러셀 각 항목의 텍스트 콘텐츠는 2줄 이하로 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-039 | SHOULD | 캐러셀 슬라이드는 5개 이하로 두고, 항목이 더 많으면 캐러셀 대신 목록을 쓴다. |
| LAYOUT-040 | SHOULD | 캐러셀의 도형형 항목 식별자는 컨테이너 가운데에, 분수형 식별자는 오른쪽 아래에 두고, 탐색 버튼은 레이아웃 유형에 따라 컨테이너 가운데 좌우 또는 오른쪽 아래에 둔다. |
| MOTION-001 | MUST | 자동으로 시작해 5초를 넘게 다른 콘텐츠와 함께 움직이거나 깜빡이거나 스크롤되는 콘텐츠와, 자동으로 시작해 다른 콘텐츠와 함께 표시되는 자동 갱신 콘텐츠에는 일시정지·정지·숨기기 수단(자동 갱신은 갱신 빈도 조절도 가능)을 제공한다. |
| MOTION-010 | MUST | 애니메이션·전환의 지속 시간(duration)과 이징(easing)은 모션 디자인 토큰(CSS 변수)에서만 고르고 CSS·JS에 ms 값이나 cubic-bezier() 값을 직접 쓰지 않는다. |
| MOTION-012 | SHOULD | 요소를 움직이거나 크기를 바꾸는 애니메이션·전환은 transform으로 만들고, top·left·box-shadow 값을 애니메이션하지 않는다. |
| NAV-048 | SHOULD | 캐러셀에 전체 슬라이드 수와 현재 보고 있는 슬라이드의 순서를 표시한다. |
| RESP-004 | MAY | 브레이크포인트를 3~6단계로 정의하고, KRDS 표준형 스타일을 쓰는 공공 서비스는 small 360px·medium 768px·large 1024px·xlarge 1280px 4단계를 쓴다. |
| STATE-016 | SHOULD | 캐러셀에 표시할 항목이 1개가 되면 이전·다음 탐색 버튼, 항목 탐색 식별자, 정지·재생 버튼을 숨긴다. |
| TYPO-001 | MUST | CSS로 같은 시각 표현을 낼 수 있는 텍스트 정보는 텍스트 이미지가 아닌 실제 텍스트로 제공한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.carousel` ↔ `main-vban-wrap vb-swiper`, `.carousel__slides` ↔ `swiper swiper-wrapper`, `.carousel__slide` ↔ `swiper-slide`, `.carousel__prev` ↔ `swiper-button-prev`, `.carousel__next` ↔ `swiper-button-next`, `.carousel__indicators` ↔ `swiper-pagination`
- KRDS 키트 마크업은 페이지네이션을 빈 div(swiper-pagination)로 두고 스크립트에 맡겨, 식별자의 역할·선택 상태·방향키 이동을 정의하지 않는다 — 이 규격은 tablist·tab·aria-selected 와 방향키 이동을 쓴다(A11Y-033, A11Y-025).
- KRDS 키트 마크업은 보이지 않는 슬라이드를 초점·스크린 리더에서 빼는 속성(hidden·aria-hidden·tabindex)을 정의하지 않는다 — 이 규격은 현재 슬라이드 외에는 hidden 으로 숨긴다(A11Y-015).
- KRDS 키트 예시의 슬라이드에는 전체 수·현재 위치를 보조기술에 전달하는 속성이 없다 — 이 규격은 슬라이드에 aria-roledescription="slide" 와 'n / 전체' 이름을 준다(NAV-048, A11Y-025).
- KRDS 키트의 '더 보기' 링크(href="#")는 목적지를 밝히지 않는 숨긴 텍스트뿐이다 — 이 규격은 슬라이드마다 목적지를 밝힌 링크를 둔다(COPY-002).
- KRDS 키트 슬라이드 제목의 강제 줄바꿈(br.w-hide)은 쓰지 않는다. 줄 수는 문구 길이로 맞춘다(COPY-026).
