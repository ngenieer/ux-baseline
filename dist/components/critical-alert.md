# 긴급 공지 (`.critical-alert`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

재난·재해, 예고 없는 서비스 장애·이용 중단, 이용 중단 사전 예고처럼 대부분의 사용자가 지금 알아야 하는 상황을 본문 맨 위에 한 줄로 알릴 때 쓴다.

## 대신 쓸 것
- 홍보 콘텐츠, 일반 공지의 전달·강조 → 공지 목록·본문 안내 영역 (STATE-006)
- 입력 검증 결과·완료 상태 같은 피드백 메시지 → 인라인 메시지·알림 메시지 (STATE-006)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(전체 너비 컨테이너) | `.critical-alert` | `section` | 예 | main(본문 영역)의 첫 자식으로 두고 화면 전체 너비를 차지한다(LAYOUT-029). aria-label 로 영역 이름을 준다. 한 화면에 1개만 둔다(COPY-010). |
| 공지 상자 | `.critical-alert__banner` | `div` | 예 | 내용은 스크린 마진 안에 둔다. 그림자는 shadow-2 를 쓴다(SHAPE-004). |
| 긴급도 레이블 | `.critical-alert__level` | `span` | 예 | 텍스트로 '긴급도 상·중·하' 를 쓴다(STATE-007). 색은 보조 단서다(COLOR-001). 레이블 옆 아이콘을 쓰면 aria-hidden="true" 로 숨긴다(A11Y-001, CF-031). |
| 공지 문장 | `.critical-alert__text` | `p` | 예 | 1줄로 쓰고 좁은 화면에서만 2줄까지 허용한다(COPY-021). |
| 상세 링크 | `.critical-alert__link` | `a` |  | 공지 내용과 직접 관련된 상세 화면 링크 1개 이하(COPY-022). 링크 텍스트만으로 목적지를 알 수 있게 쓴다(COPY-002). |

## 표준 마크업

```html
<section class="critical-alert critical-alert--high" aria-label="긴급 공지">
  <div class="critical-alert__banner">
    <span class="critical-alert__level">긴급도 상</span>
    <p class="critical-alert__text">시스템 장애로 10월 18일 14:00부터 전자 민원 신청이 중단되었습니다.</p>
    <a class="critical-alert__link" href="/notices/outage-20261018">장애 복구 안내 보기</a>
  </div>
</section>
<section class="critical-alert critical-alert--medium" aria-label="긴급 공지 (중 예시)">
  <div class="critical-alert__banner">
    <span class="critical-alert__level">긴급도 중</span>
    <p class="critical-alert__text">10월 25일 02:00~06:00에 정기 점검으로 서비스를 이용할 수 없습니다.</p>
    <a class="critical-alert__link" href="/notices/maintenance-20261025">점검 일정 안내 보기</a>
  </div>
</section>
```

## 표준 CSS (토큰만 사용)

```css
.critical-alert {
  inline-size: 100%;
  padding-block: var(--space-padding-7);
  padding-inline: var(--space-padding-6);
  background-color: var(--color-surface-gray-subtler);
}
@media (min-width: 768px) {
  .critical-alert {
    padding-inline: var(--space-padding-8);
  }
}
.critical-alert__banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-gap-5);
  max-inline-size: var(--layout-content-max);
  margin-inline: auto;
  padding: var(--space-padding-6);
  border: var(--border-width-static-regular) solid var(--color-border-gray-light);
  border-radius: var(--radius-large2);
  background-color: var(--color-surface-white-subtle);
  box-shadow: var(--shadow-2);
}
.critical-alert__level {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--size-height-7);
  padding-inline: var(--space-padding-4);
  border-radius: var(--radius-medium2);
  background-color: var(--color-element-information);
  color: var(--color-text-inverse-static);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-bold);
}
.critical-alert--high .critical-alert__level {
  background-color: var(--color-element-danger);
  color: var(--color-text-inverse-static);
}
.critical-alert--medium .critical-alert__level {
  background-color: var(--color-element-warning);
  color: var(--color-text-static);
}
.critical-alert__text {
  flex: 1 1 0;
  min-inline-size: 0;
  margin: 0;
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-bold);
  overflow-wrap: anywhere;
}
.critical-alert__link {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--layout-target-min);
  color: var(--color-link-default);
  font-size: var(--font-size-body-medium);
  text-decoration: underline;
}
.critical-alert__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **긴급도 상**: 루트에 critical-alert--high, 레이블 텍스트 '긴급도 상'. 재난·재해 대응, 예고 없는 장애·이용 중단(STATE-007).
- **긴급도 중**: 루트에 critical-alert--medium, 레이블 텍스트 '긴급도 중'. 이용 중단 사전 예고(STATE-007).
- **긴급도 하**: 변형 클래스 없이 기본(information 색), 레이블 텍스트 '긴급도 하'. 대부분의 사용자가 알아야 하지만 이용에 중대한 영향은 없는 상황(STATE-007).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 상세 링크로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). |

## 동작
- 긴급 공지는 메인 메뉴 아래 본문 영역(main)의 첫 요소, 히어로 영역보다 앞에 둔다(LAYOUT-029). 한 화면에 1개만 둔다(COPY-010) — markup 의 두 번째 공지는 긴급도 '중' 상태를 보이기 위한 예시다.
- 긴급도 상·중·하에 해당하는 내용에만 쓴다. 홍보, 일반 공지 강조, 폼 검증 결과·완료 메시지에 쓰지 않는다(STATE-006).
- 게시 데이터에 종료 일시를 두고, 종료 일시가 지나면 렌더링하지 않는다(STATE-008).
- 닫기·숨기기 버튼이나 접기 기능을 두지 않는다(STATE-009).
- 공지 문장은 가장 넓은 레이아웃에서 1줄, 좁은 화면에서도 2줄 이하로 쓴다(COPY-021). 상세 내용은 링크 1개로 연결한다(COPY-022).
- 링크 텍스트는 목적지를 밝힌다('자세히 보기' 단독 금지). 좁은 화면에서도 링크 텍스트를 숨기지 않는다(COPY-002).
- 컨테이너 배경은 전체 너비로, 공지 상자는 스크린 마진(768px 미만 16px, 이상 24px) 안에 둔다(LAYOUT-004).
- 시각은 24시각제 '14:00' 형식으로 쓴다(COPY-057).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COPY-002 | MUST | 링크의 목적을 링크 텍스트만으로, 또는 링크 텍스트와 프로그램으로 판별되는 링크 맥락(같은 문장·문단·목록 항목·표 셀·aria-describedby)으로 알 수 있게 쓴다. |
| COPY-010 | SHOULD | 본문 상단의 안내 영역과 긴급 공지는 각각 한 화면에 1개 이하로 둔다. |
| COPY-021 | SHOULD | 긴급 공지 문장은 1줄로 쓰고, 화면 너비가 1줄을 담지 못하는 좁은 화면에서만 2줄까지 허용한다. |
| COPY-022 | SHOULD | 긴급 공지에는 공지 내용과 직접 관련된 상세 화면으로 가는 링크를 1개 이하로 넣는다. |
| COPY-057 | SHOULD | 시각을 숫자로 쓸 때는 시와 분 사이에 쌍점을 앞뒤 붙여 쓰고('14:30', '오전 10:20'), 공공 서비스 화면에서는 24시각제로 쓴다. |
| LAYOUT-004 | SHOULD | 화면 좌우 가장자리와 콘텐츠 사이 여백(스크린 마진)을 뷰포트 너비 768 CSS px 이상에서 24px 이상, 768px 미만에서 16px 이상으로 둔다. |
| LAYOUT-029 | SHOULD | 긴급 공지는 메인 메뉴 아래 본문 콘텐츠의 첫 요소로 두고, 공지 컨테이너가 화면 전체 너비를 차지하게 한다. |
| SHAPE-004 | MAY | 그림자는 정의된 단계 토큰만 쓰고 단계를 용도에 고정한다(KRDS: 셀렉트 shadow2, 툴팁 shadow3, 모달 shadow4와 딤드, 긴급 공지 shadow2와 고도 -1 표면). |
| STATE-006 | SHOULD | 긴급 공지는 STATE-007의 긴급도 상·중·하에 해당하는 내용에만 쓰고, 홍보 콘텐츠, 일반 공지의 전달·강조, 입력 검증 결과·완료 상태 같은 피드백 메시지에는 쓰지 않는다. |
| STATE-007 | MAY | 긴급 공지에는 긴급도 레이블을 붙이고, 재난·재해 대응과 예고 없는 서비스 장애·이용 중단은 '상', 이용 중단 사전 예고는 '중', 서비스 이용에 중대한 영향은 없지만 대부분의 사용자가 알아야 하는 상황은 '하'로 분류한다. |
| STATE-008 | SHOULD | 긴급 공지는 공지 내용과 관련된 기간에만 게시하고, 그 기간이 끝나면 내린다. |
| STATE-009 | SHOULD | 긴급 공지에 숨기기·닫기 버튼이나 접기 기능을 두지 않는다. |

## KRDS 키트와의 관계
- 클래스 대응: `.critical-alert` ↔ `main-urgent-wrap krds-critical-alerts`, `.critical-alert__banner` ↔ `critical-ban`, `.critical-alert__level` ↔ `critical-badge`, `.critical-alert__text` ↔ `critical-txt`, `.critical-alert__link` ↔ `krds-btn medium link basic`
- KRDS 키트는 긴급 공지 3개를 한 목록(ul)에 넣는다 — 이 규격은 한 화면에 1개만 둔다(COPY-010).
- KRDS 키트는 좁은 화면에서 링크 텍스트 '자세히 보기' 를 숨겨(m-hide) 아이콘만 남기고, 텍스트도 목적지를 밝히지 않는다 — 이 규격은 목적지를 밝힌 링크 텍스트를 항상 보인다(COPY-002).
- KRDS 키트의 레이블은 '긴급·안전·안내' 이고 '안전(ok)' 은 긴급도 분류에 없다 — 이 규격은 '긴급도 상·중·하' 레이블을 쓴다(STATE-007).
- KRDS 가이드 초안은 긴급 공지 섹션에 role="banner" 를 주라고 한다 — banner 랜드마크는 페이지 머리글용이고 본문(main) 안에 두면 랜드마크 구조가 어긋나므로, 이 규격은 section 에 aria-label 로 이름을 준다(A11Y-007).
