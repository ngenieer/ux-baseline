# 이미지 (`.image`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

사진·그림·도식처럼 내용 이해를 돕는 이미지를 본문에 넣을 때 쓴다. 캡션과 AI 생성 표시를 함께 다룬다.

## 대신 쓸 것
- CSS 로 같은 시각 표현을 낼 수 있는 글자(제목·안내 문구·버튼 문구) → 실제 텍스트 (TYPO-001)
- 여러 이미지를 차례로 넘겨 보여 주는 경우 → carousel

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.image` | `figure` | 예 | 캡션이 없으면 figure 대신 img 하나만 써도 된다. 링크·버튼이 아니면 tabindex·click 핸들러·cursor:pointer 를 주지 않는다(A11Y-032). |
| 이미지 틀 | `.image__frame` | `div` | 예 | AI 생성 표시처럼 이미지 위에 겹치는 요소의 기준 위치다. |
| 이미지 | `.image__media` | `img` | 예 | alt 를 반드시 쓴다 — 정보 이미지는 이미지가 전하는 정보를, 장식 이미지는 alt=""(A11Y-001). width·height 속성으로 공간을 예약한다(PERF-009). |
| 캡션 | `.image__caption` | `figcaption` |  | 출처·설명을 쓴다. 캡션과 alt 에 같은 문장을 되풀이하지 않는다(A11Y-001). |
| AI 생성 표시 | `.image__ai-label` | `span` |  | 생성형 AI 결과 이미지에 이미지 위에 겹쳐 보이는 텍스트로 붙인다(AI-002, AI-004). |

## 표준 마크업

```html
<figure class="image">
  <div class="image__frame">
    <img class="image__media" src="/images/riverside-trail-2025.jpg" alt="강변 산책로를 따라 벚꽃이 핀 모습" width="1200" height="800">
  </div>
  <figcaption class="image__caption">시립 강변공원 산책로 (2025년 4월 촬영)</figcaption>
</figure>
<figure class="image" data-ai-output>
  <div class="image__frame">
    <img class="image__media" src="/images/ai/park-plan-draft.png" alt="공원 재정비 계획안을 그린 조감도. 중앙 잔디 광장을 둘러싼 산책로와 북쪽 어린이 놀이터" width="1024" height="768" loading="lazy">
    <span class="image__ai-label">AI 생성 이미지</span>
  </div>
  <figcaption class="image__caption">공원 재정비 계획 이해를 돕기 위해 생성형 AI로 만든 조감도이며 실제 설계도가 아닙니다.</figcaption>
</figure>
```

## 표준 CSS (토큰만 사용)

```css
.image {
  margin: 0;
}
.image__frame {
  position: relative;
}
.image__media {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-large1);
}
.image__caption {
  margin-block-start: var(--gap-layout-image-text-small);
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.image__ai-label {
  position: absolute;
  inset-block-start: var(--space-scale-5);
  inset-inline-start: var(--space-scale-5);
  padding-block: var(--space-padding-1);
  padding-inline: var(--space-padding-3);
  border-radius: var(--radius-small2);
  background-color: var(--color-surface-inverse-static);
  color: var(--color-text-inverse-static);
  font-size: var(--font-size-label-small);
  font-weight: var(--font-weight-bold);
}
```

## 상태
- **장식 이미지**: alt="" 를 쓰고 캡션을 두지 않는다. 바로 옆 텍스트가 같은 정보를 전하는 이미지도 장식으로 처리한다(A11Y-001).
- **AI 생성 이미지**: figure 에 data-ai-output, 이미지 틀 안에 image__ai-label('AI 생성 이미지')을 넣는다. 실제와 구분하기 어려운 이미지(딥페이크)는 이 표시를 반드시 이미지 위에 보인다(AI-002, AI-004).
- **첫 화면 밖 이미지**: 페이지 로드 시 뷰포트 밖에 있는 이미지만 loading="lazy" 를 붙인다(PERF-013).

## 동작
- 모든 img 에 alt 를 쓴다. 대체 텍스트에 '이미지'·'사진' 같은 역할 중복어, 제작자 정보, 인접 텍스트와 같은 설명, 이미지에 없는 정보를 넣지 않는다(A11Y-001).
- 글자를 이미지로 만들지 않는다. 로고·브랜드명만 예외다(TYPO-001). 이미지 위에 텍스트를 올리면 별도 배경을 깔아 4.5:1 대비를 확보한다(COLOR-002).
- 링크·버튼이 아닌 이미지는 초점을 받거나 클릭에 반응하지 않는다(A11Y-032). 링크·버튼 안 이미지는 그 기능과 맞는 상징을 쓴다(COPY-025).
- 모든 img 에 width·height 속성을 쓰고 CSS 는 max-width:100%·height:auto 로 크기를 조정한다(PERF-009).
- loading="lazy" 는 첫 화면 밖 이미지에만 쓰고, LCP 후보 이미지는 초기 HTML 의 img src 로 넣으며 data-src 지연 로딩을 쓰지 않는다. fetchpriority="high" 는 페이지당 2개 이하(PERF-013, PERF-014).
- 확대 보기를 제공하면 핀치 외에 확대·축소 버튼을 함께 둔다(A11Y-017).
- 모바일 레이아웃(1024px 미만)에서는 의미 없는 이미지를 빼고, 남긴 이미지는 화면 너비에 맞게 줄이거나 잘라 쓴다(RESP-012).
- 생성형 AI 결과 이미지는 화면에서 'AI 생성' 표시를 결과물 안이나 바로 옆에 보이고(AI-002), 실제와 구분하기 어려운 이미지는 이미지 위에 보이는 표시를 쓰며 메타데이터만으로 대신하지 않는다(AI-004).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-017 | MUST | 다중 포인터(핀치·두 손가락) 또는 경로 기반 제스처(스와이프·그리기)로 하는 모든 기능을 경로 없는 단일 포인터 조작(탭·클릭)으로도 할 수 있게 한다. |
| A11Y-032 | SHOULD | 링크·버튼이 아니거나 그 일부가 아닌 이미지는 키보드 초점을 받지 않고 마우스 클릭에 반응하지 않게 한다. |
| AI-002 | MUST | 생성형 AI 결과물을 서비스 화면 안에서 보여줄 때는 (a) 결과물 영역 안이나 바로 옆의 'AI 생성' 표시, (b) 그 서비스 화면에 계속 보이는 AI 로고·문구, (c) 첫 이용 전 화면 안내 중 하나 이상으로 AI가 생성했다는 사실을 표시하고, 로고·아이콘으로 표시하면 접근 가능한 이름을 준다. |
| AI-004 | MUST | 실제와 구분하기 어려운 가상의 이미지·영상·음성(딥페이크)을 다운로드·공유로 서비스 밖으로 내보낼 때는 사람이 보거나 들어서 알 수 있는 AI 생성 표시를 결과물에 넣고 기계 판독 표시만으로 대신하지 않으며, 영상은 AI로 생성한 재생 구간 전체에 표시를 보이고, 이미지는 이미지 안에 표시하고, 음성은 재생 시작 부분에 음성으로 안내한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COPY-025 | MAY | 링크·버튼이거나 그 일부인 이미지에는 그 링크·버튼의 용도·목적·기능과 일치하는 이미지·상징을 쓴다. |
| PERF-009 | SHOULD | 지연 로딩 여부와 관계없이 모든 <img>와 <video>에 width·height 속성을 지정하거나 CSS aspect-ratio로 공간을 예약하고, 반응형 크기 조정은 width: 100%(또는 max-width: 100%)와 height: auto로 한다. |
| PERF-013 | SHOULD | loading="lazy"는 첫 화면 뷰포트 밖의 이미지·iframe에만 쓰고, 페이지 로드 시 뷰포트에 보이는 이미지와 LCP 후보 이미지에는 쓰지 않는다. |
| PERF-014 | SHOULD | LCP 후보 이미지는 초기 HTML의 <img src>(또는 <link rel="preload" as="image">)로 발견되게 하고 data-src 같은 JS 지연 로딩을 쓰지 않으며, fetchpriority="high"는 한 페이지에서 최대 2개 이미지에만 준다. |
| RESP-012 | SHOULD | 모바일 레이아웃(RESP-004 기준 1024px 미만)으로 전환할 때 이미지마다 사용자에게 의미가 있는지 검토해 의미 없는 이미지는 빼고, 남긴 이미지는 화면 너비에 맞게 크기를 조정하거나 잘라서 쓴다. |
| TYPO-001 | MUST | CSS로 같은 시각 표현을 낼 수 있는 텍스트 정보는 텍스트 이미지가 아닌 실제 텍스트로 제공한다. |

## KRDS 키트와의 관계
