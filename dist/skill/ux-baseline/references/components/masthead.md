# 공식 배너 (`.masthead`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

대한민국 정부의 공식 디지털 서비스임을 알리는 한 줄 배너를 모든 화면 최상단에 둘 때 쓴다.

## 대신 쓸 것
- 운영 주체가 정부기관이 아닌 사이트 → 공식 배너를 쓰지 않는다 (COPY-012)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.masthead` | `div` | 예 | 건너뛰기 링크 바로 다음, 헤더(header) 앞에 둔다. 헤더 요소 밖에 두어 헤더를 고정해도 함께 고정되지 않게 한다(LAYOUT-009, LAYOUT-013). |
| 안쪽 영역 | `.masthead__inner` | `div` | 예 | 본문 콘텐츠 최대 너비에 맞춘다. |
| 국가 상징 아이콘 | `.masthead__icon` | `svg` |  | 장식이다. aria-hidden="true", focusable="false" 로 보조기술에서 뺀다(A11Y-001). |
| 안내 문구 | `.masthead__text` | `p` | 예 | 문구는 '이 누리집은 대한민국 공식 전자정부 누리집입니다.' 그대로 쓴다. |

## 표준 마크업

```html
<div class="masthead">
  <div class="masthead__inner">
    <svg class="masthead__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><use href="/images/icons.svg#flag"></use></svg>
    <p class="masthead__text">이 누리집은 대한민국 공식 전자정부 누리집입니다.</p>
  </div>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.masthead {
  background-color: var(--color-surface-secondary-subtler);
}
.masthead__inner {
  display: flex;
  align-items: center;
  gap: var(--space-gap-3);
  max-inline-size: var(--layout-content-max);
  min-block-size: var(--size-height-5);
  margin-inline: auto;
  padding-block: var(--space-padding-2);
  padding-inline: var(--layout-screen-margin-small);
}
.masthead__icon {
  flex: none;
  inline-size: var(--size-height-1);
  block-size: var(--size-height-1);
}
.masthead__text {
  color: var(--color-text-basic);
  font-size: var(--font-size-body-small);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
@media (min-width: 768px) {
  .masthead__inner {
    padding-inline: var(--layout-screen-margin-medium);
  }
}
```

## 동작
- 모든 페이지의 최상단에 렌더링한다. DOM 에서 공식 배너 앞에는 건너뛰기 링크만 둔다(LAYOUT-009, NAV-001).
- 헤더를 상단에 고정(sticky·fixed)할 때 공식 배너는 고정하지 않고 스크롤과 함께 화면 밖으로 나가게 한다(LAYOUT-013).
- 배경은 컨테이너 배경색 범위의 옅은 색, 글자는 본문 작은 글자 크기로 두어 헤더의 내비게이션·기능 버튼보다 주목도를 낮춘다(COLOR-012). 글자와 배경의 대비는 4.5:1 이상이다(COLOR-002).
- 한국어 문구는 어절 단위로 줄바꿈하고 좁은 화면에서 넘치지 않게 overflow-wrap anywhere 를 함께 쓴다(TYPO-017).
- 공식 정부 서비스가 아닌 사이트에서는 이 컴포넌트와 문구를 쓰지 않는다(COPY-012).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-012 | SHOULD | 공식 배너는 헤더의 내비게이션·기능 버튼보다 시각적 주목도가 낮게 표현한다. |
| COPY-012 | SHOULD | 공식 디지털 정부서비스가 아닌 사이트에서는 공식 배너('이 누리집은 대한민국 공식 전자정부 누리집입니다')를 쓰지 않는다. |
| LAYOUT-009 | SHOULD | 공식 배너는 모든 화면의 최상단에 두고, DOM에서는 건너뛰기 링크만 공식 배너 앞에 둔다. |
| LAYOUT-013 | SHOULD | 헤더를 화면 상단에 고정할 때는 공식 배너를 뺀 헤더 전체를 고정한다. |
| NAV-001 | MUST | 여러 페이지에 반복되는 콘텐츠 블록(헤더·메인 메뉴 등)이 있는 페이지에는 그 블록을 건너뛰어 본문으로 가는 건너뛰기 링크를 문서의 첫 초점 요소로 제공한다. |
| TYPO-017 | MAY | 한국어 본문·제목 텍스트 블록에 word-break: keep-all을 지정해 한글을 어절(띄어쓰기) 단위로 줄바꿈한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.masthead` ↔ `#krds-masthead`, `.masthead__inner` ↔ `toggle-head inner`, `.masthead__text` ↔ `nuri-txt`
- KRDS 키트는 안내 문구에 word-break break-all 을 쓴다 — 이 규격은 한국어 어절 단위 줄바꿈(word-break keep-all + overflow-wrap anywhere)을 쓴다(TYPO-017).
- KRDS 키트는 안내 문구를 span 으로 쓰고 국가 상징 아이콘을 CSS 배경 이미지로 넣는다 — 이 규격은 문구를 p 로, 아이콘을 aria-hidden 인 인라인 svg 로 넣는다(A11Y-001).
