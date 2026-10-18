# 운영기관 식별자 (`.identifier`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

공식 디지털 정부 서비스의 푸터 하단에서 서비스를 운영하는 기관을 로고와 안내 문구로 밝힐 때 쓴다.

## 대신 쓸 것
- 운영 주체가 정부기관이 아닌 사이트 → 운영기관 식별자를 쓰지 않는다 (COPY-014)
- 서비스 자체 로고를 보여줄 때 → 푸터의 서비스 로고(footer__logo) (LAYOUT-010)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.identifier` | `div` | 예 | 푸터(footer) 안 저작권 정보 다음, 푸터의 마지막 요소로 둔다. |
| 운영기관 로고 | `.identifier__logo` | `img` | 예 | 서비스 로고가 아니라 운영 기관의 로고다. alt 는 기관명이다(LAYOUT-010, A11Y-001). width·height 속성으로 공간을 예약한다. |
| 안내 문구 | `.identifier__text` | `p` | 예 | 문구는 '이 누리집은 [운영기관명]에서 운영하는 누리집입니다.' 형식에서 기관명만 바꾼다. 기관이 여럿이면 쉼표로 구분한다(COPY-013). |

## 표준 마크업

```html
<div class="identifier">
  <img class="identifier__logo" src="/images/org-logo.svg" alt="보건복지부" width="136" height="32">
  <p class="identifier__text">이 누리집은 보건복지부에서 운영하는 누리집입니다.</p>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.identifier {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-gap-2);
  inline-size: 100%;
  min-block-size: var(--size-height-6);
  padding-block: var(--space-padding-3);
  padding-inline: var(--space-padding-6);
  border-radius: var(--radius-medium1);
  background-color: var(--color-surface-white);
}
.identifier__logo {
  flex: none;
  inline-size: auto;
  block-size: var(--size-height-3);
}
.identifier__text {
  color: var(--color-text-basic);
  font-size: var(--font-size-body-xsmall);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
@media (min-width: 768px) {
  .identifier {
    flex-direction: row;
    align-items: center;
    gap: var(--space-gap-3);
  }
  .identifier__logo {
    block-size: var(--size-height-4);
  }
  .identifier__text {
    font-size: var(--font-size-body-small);
  }
}
```

## 동작
- 요소 순서는 운영기관 로고 → 안내 문구로 두고 바꾸지 않는다(COPY-013). 좁은 화면(768px 미만)에서는 세로로 쌓되 같은 순서를 유지한다.
- 안내 문구는 정규식 ^이 누리집은 .+에서 운영하는 누리집입니다\.$ 와 일치하게 쓴다(COPY-013).
- 로고 이미지는 운영 기관 로고이고 대체 텍스트는 기관명이다. 서비스 로고는 푸터의 서비스 로고 자리에 둔다(LAYOUT-010, A11Y-001).
- 글자 크기는 본문 작은 글자 이하로 두어 푸터의 연락처·링크보다 주목도를 낮춘다(COLOR-013). 글자와 배경 대비는 4.5:1 이상이다(COLOR-002).
- 이미지 크기를 CSS 로 바꿀 때 한 축은 auto 로 두어 비율을 유지한다(PERF-009).
- 공식 정부 서비스가 아닌 사이트에서는 쓰지 않는다(COPY-014).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-013 | SHOULD | 운영기관 식별자는 푸터의 정보·링크보다 시각적 주목도가 낮게 표현한다. |
| COPY-013 | SHOULD | 운영기관 식별자의 안내 텍스트는 '이 누리집은 [운영기관명]에서 운영하는 누리집입니다.' 형식에서 대괄호 부분만 바꿔 쓰고, 요소 배치를 바꾸지 않는다. |
| COPY-014 | SHOULD | 공식 디지털 정부서비스가 아닌 사이트에서는 운영기관 식별자를 쓰지 않는다. |
| LAYOUT-010 | SHOULD | 운영기관 식별자의 로고 영역에는 서비스 로고가 아니라 서비스를 운영하는 기관의 로고를 넣고, 서비스 로고는 푸터에 둔다. |
| PERF-009 | SHOULD | 지연 로딩 여부와 관계없이 모든 <img>와 <video>에 width·height 속성을 지정하거나 CSS aspect-ratio로 공간을 예약하고, 반응형 크기 조정은 width: 100%(또는 max-width: 100%)와 height: auto로 한다. |
| TYPO-017 | MAY | 한국어 본문·제목 텍스트 블록에 word-break: keep-all을 지정해 한글을 어절(띄어쓰기) 단위로 줄바꿈한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.identifier` ↔ `krds-identifier`, `.identifier__logo` ↔ `logo`, `.identifier__text` ↔ `ban-txt`
- KRDS 키트 예시 문구는 '이 누리집은 보건복지부 누리집입니다.' 이다 — 이 규격은 '이 누리집은 보건복지부에서 운영하는 누리집입니다.' 형식을 쓴다(COPY-013).
- KRDS 키트는 로고를 CSS 배경 이미지 + 숨긴 텍스트(sr-only)로 넣는다 — 이 규격은 alt 가 기관명인 img 로 넣는다(A11Y-001, LAYOUT-010).
- KRDS 키트는 좁은 화면에서 문구에 word-break break-all 을 쓴다 — 이 규격은 keep-all + overflow-wrap anywhere 를 쓴다(TYPO-017).
