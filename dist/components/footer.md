# 푸터 (`.footer`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

모든 페이지 본문 아래 마지막에 서비스 로고, 연락처, 유틸리티 링크, 정책 링크, 저작권 정보를 같은 순서로 반복해 둘 때 쓴다.

## 대신 쓸 것
- 운영 기관을 밝히는 로고·문구(공식 정부 서비스) → 운영기관 식별자(identifier) — 푸터 마지막 요소로 넣는다 (LAYOUT-010)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.footer` | `footer` | 예 | body 의 직계 자식이자 마지막 시각 요소로 두면 contentinfo 랜드마크가 된다(LAYOUT-014). |
| 안쪽 영역 | `.footer__inner` | `div` | 예 | 자식 묶음의 DOM 순서는 서비스 로고 → 연락처 → 유틸리티 링크 → 정책 링크 → 저작권 정보 → 운영기관 식별자다(LAYOUT-015). |
| 서비스 로고 | `.footer__logo` | `div` | 예 | 서비스 로고 img 를 담는다. alt 는 서비스 이름이다(A11Y-001, LAYOUT-010). |
| 연락처 | `.footer__contact` | `address` | 예 | 주소·대표전화 등 운영 기관 연락처. 전화번호는 tel 링크로 둔다. |
| 유틸리티 링크 | `.footer__utility` | `nav` |  | 찾아오시는 길·이용안내 같은 링크 묶음. aria-label 로 정책 링크 nav 와 구분한다. |
| 정책 링크 | `.footer__policy` | `nav` | 예 | 개인정보 처리방침·이용약관·저작권 정책 등 고지 링크 묶음. |
| 링크 목록 | `.footer__link-list` | `ul` | 예 |  |
| 링크 | `.footer__link` | `a` | 예 |  |
| 개인정보 처리방침 링크 | `.footer__link--privacy` | `a` | 예 | 링크 텍스트는 정확히 '개인정보 처리방침'이고, 굵기·색으로 다른 고지 링크와 구분한다(COPY-017, TYPO-012). |
| 저작권 정보 | `.footer__copyright` | `p` | 예 |  |

## 표준 마크업

```html
<footer class="footer">
  <div class="footer__inner">
    <div class="footer__logo"><img src="/images/service-logo.svg" alt="국민복지 안내 누리집" width="160" height="40"></div>
    <address class="footer__contact">
      <p>(26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단</p>
      <p>대표전화 <a class="footer__link" href="tel:1577-1000">1577&#8209;1000</a> (유료, 평일 09시~18시)</p>
    </address>
    <nav class="footer__utility" aria-label="이용 안내 링크">
      <ul class="footer__link-list">
        <li><a class="footer__link" href="/guide/location">찾아오시는 길</a></li>
        <li><a class="footer__link" href="/guide">이용안내</a></li>
        <li><a class="footer__link" href="/staff">직원검색</a></li>
      </ul>
    </nav>
    <nav class="footer__policy" aria-label="정책 링크">
      <ul class="footer__link-list">
        <li><a class="footer__link footer__link--privacy" href="/policy/privacy">개인정보 처리방침</a></li>
        <li><a class="footer__link" href="/policy/terms">이용약관</a></li>
        <li><a class="footer__link" href="/policy/copyright">저작권 정책</a></li>
      </ul>
    </nav>
    <p class="footer__copyright">© 국민건강보험공단. <span lang="en">All rights reserved.</span></p>
    <div class="identifier">
      <img class="identifier__logo" src="/images/org-logo.svg" alt="보건복지부" width="136" height="32">
      <p class="identifier__text">이 누리집은 보건복지부에서 운영하는 누리집입니다.</p>
    </div>
  </div>
</footer>
```

## 표준 CSS (토큰만 사용)

```css
.footer {
  border-block-start: var(--border-width-static-regular) solid var(--color-divider-gray-light);
  background-color: var(--color-surface-gray-subtler);
  color: var(--color-text-subtle);
  font-size: var(--font-size-body-small);
}
.footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-6);
  max-inline-size: var(--layout-content-max);
  margin-inline: auto;
  padding-block: var(--space-padding-9);
  padding-inline: var(--layout-screen-margin-small);
}
.footer__logo img {
  inline-size: auto;
  block-size: var(--size-height-5);
}
.footer__contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2);
  font-style: normal;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.footer__link-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-2) var(--space-gap-5);
}
.footer__link {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--layout-target-min);
  border-radius: var(--radius-small1);
  color: var(--color-text-basic);
}
.footer__link:hover {
  text-decoration: underline;
}
.footer__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.footer__link--privacy {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}
.footer__copyright {
  color: var(--color-text-subtle);
}
@media (min-width: 768px) {
  .footer__inner {
    padding-inline: var(--layout-screen-margin-medium);
  }
}
```

## 상태
- **짧은 본문**: 마크업 변화 없음. 본문이 뷰포트보다 짧으면 페이지 레이아웃(body 를 세로 flex, min-block-size 100dvh, main 에 flex 1)으로 푸터 아래끝을 뷰포트 아래끝에 맞춘다(LAYOUT-014).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 서비스 로고 다음의 연락처 링크 → 유틸리티 링크 → 정책 링크 순서로 초점이 이동한다. 화면 순서와 같다(A11Y-008). |

## 동작
- 푸터는 모든 페이지에서 본문 아래 마지막 요소다. 본문이 뷰포트보다 짧으면 푸터 아래끝을 뷰포트 아래끝에 맞춘다(LAYOUT-014).
- 묶음 순서는 서비스 로고 → 연락처 → 유틸리티 링크 → 정책 링크 → 저작권 정보이고, 좁은 화면에서 세로로 쌓아도 DOM·화면 순서가 같다. CSS order·reverse 로 순서를 바꾸지 않는다(LAYOUT-015, RESP-006, A11Y-008).
- 푸터 링크 묶음과 순서는 모든 페이지에서 같다(NAV-004). 같은 기능의 링크는 모든 페이지에서 같은 텍스트를 쓴다(COPY-004).
- 개인정보 처리방침 링크 텍스트는 정확히 '개인정보 처리방침'이고, 색과 굵기로 다른 고지 링크와 구분한다(COPY-017, TYPO-012).
- 결제·주문 기능이 있는 서비스는 정책 링크에 이용약관과 거래 약관을, 연락처 묶음에 사업자 신원 정보(상호·대표자·주소·사업자등록번호)를 둔다(COPY-018).
- 링크가 많아 원하는 링크를 찾기 어려우면 목적별 묶음(nav 또는 제목 있는 목록)으로 나눈다(NAV-017). 사이트맵 링크를 두면 페이지를 찾는 두 번째 수단이 된다(NAV-003).
- 시각적으로 나눈 묶음은 nav·ul·address 로 마크업해 구조를 프로그램이 판별하게 한다(A11Y-007).
- 본문과 푸터는 위쪽 구분선과 배경색 차이로 구분한다(LAYOUT-003).
- 링크의 포인터 대상 높이는 24 CSS px 이상이다(LAYOUT-002). 링크 텍스트만으로 목적지를 알 수 있게 쓴다(COPY-002).
- 페이지 언어와 다른 언어 구절(예 All rights reserved.)에는 lang 속성을 준다(A11Y-023).
- 선명한 화면 모드에서는 푸터의 모든 링크에 밑줄을 표시한다(COLOR-011).
- 푸터 글자색과 배경 대비는 4.5:1 이상이다(COLOR-002).
- 공식 정부 서비스는 푸터 마지막에 운영기관 식별자(identifier 규격)를 둔다. 서비스 로고는 푸터 첫 묶음에 둔다(LAYOUT-010).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-001 | MUST | 텍스트가 아닌 콘텐츠(이미지·아이콘·그래프·차트 등)에는 같은 목적을 전달하는 텍스트 대체를 제공하고, 장식용·서식용 콘텐츠는 보조기술이 무시하도록 처리한다. |
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-023 | MUST | 페이지 기본 언어와 다른 언어로 된 구절·문장에는 그 요소에 lang 속성으로 언어를 지정한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-011 | SHOULD | 선명한 화면 모드에서는 본문의 모든 인라인 링크와 푸터의 모든 링크에 밑줄을 표시하고, 버튼·입력·선택 컴포넌트의 외곽선과 링크 밑줄을 기본 모드보다 굵게 한다. |
| COPY-002 | MUST | 링크의 목적을 링크 텍스트만으로, 또는 링크 텍스트와 프로그램으로 판별되는 링크 맥락(같은 문장·문단·목록 항목·표 셀·aria-describedby)으로 알 수 있게 쓴다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| COPY-017 | SHOULD | 푸터에 개인정보 처리방침 링크를 두고 링크 텍스트를 '개인정보 처리방침'이라는 명칭 그대로 쓴다. |
| COPY-018 | SHOULD | 전자상거래 기능이 있는 서비스는 푸터에 이용약관 링크와 사업자 신원 정보, 거래 약관을 표시한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-003 | MUST | 이웃한 콘텐츠 블록은 테두리, 구분선, 서로 다른 무늬, 배경색 명도 차이, 줄 간격·글자 간격 조절 중 하나 이상으로 시각적으로 구분한다. |
| LAYOUT-010 | SHOULD | 운영기관 식별자의 로고 영역에는 서비스 로고가 아니라 서비스를 운영하는 기관의 로고를 넣고, 서비스 로고는 푸터에 둔다. |
| LAYOUT-014 | SHOULD | 푸터를 모든 페이지의 본문 아래 마지막 요소로 두고, 본문 높이가 뷰포트보다 짧으면 푸터 아래끝을 뷰포트 아래끝에 맞춘다. |
| LAYOUT-015 | SHOULD | 푸터 정보는 서비스 로고, 연락처, 유틸리티 링크, 정책 링크, 저작권 정보 순서로 배치하고, 사유를 기록하지 않고는 이 순서를 바꾸지 않는다. |
| NAV-003 | MUST | 절차의 결과나 한 단계가 아닌 페이지는 사이트 안에서 그 페이지를 찾는 방법을 두 가지 이상 제공한다. |
| NAV-004 | MUST | 여러 페이지에 반복되는 내비게이션은 사용자가 바꾸지 않는 한 매번 같은 상대 순서로 둔다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| NAV-017 | MAY | 푸터 링크가 직관적으로 탐색되지 않으면 목적별·유형별 그룹으로 묶는다. |
| PERF-009 | SHOULD | 지연 로딩 여부와 관계없이 모든 <img>와 <video>에 width·height 속성을 지정하거나 CSS aspect-ratio로 공간을 예약하고, 반응형 크기 조정은 width: 100%(또는 max-width: 100%)와 height: auto로 한다. |
| RESP-006 | SHOULD | 좁은 화면에서 푸터 요소를 세로로 재배열해도 서비스 로고, 연락처, 유틸리티 링크, 정책 링크, 저작권 정보의 순서를 유지한다. |
| TYPO-012 | SHOULD | 푸터의 '개인정보 처리방침' 링크는 글자 크기·색·굵기 중 하나 이상을 다른 고지 링크(이용약관, 저작권 안내 등)와 다르게 표시한다. |
| TYPO-017 | MAY | 한국어 본문·제목 텍스트 블록에 word-break: keep-all을 지정해 한글을 어절(띄어쓰기) 단위로 줄바꿈한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.footer` ↔ `#krds-footer`, `.footer__logo` ↔ `f-logo`, `.footer__contact` ↔ `f-info`, `.footer__utility` ↔ `f-link link-go`, `.footer__policy` ↔ `f-menu`, `.footer__policy-link--privacy` ↔ `point`, `.footer__copyright` ↔ `f-copy`
- KRDS 키트의 개인정보 링크 텍스트는 '개인정보처리방침'(붙여 씀)이다 — 이 규격은 '개인정보 처리방침'을 그대로 쓴다(COPY-017).
- KRDS 키트는 서비스 로고를 CSS 배경 이미지 + 숨긴 텍스트(sr-only)로 넣는다 — 이 규격은 alt 가 서비스 이름인 img 로 넣는다(A11Y-001).
- KRDS 키트는 관련 누리집 버튼·SNS 링크를 title 속성('새 창 열기')만으로 새 창을 알린다 — 새 창 링크를 쓰면 링크 안 텍스트로 알린다(NAV-012).
- KRDS 키트의 저작권 문구는 영어 문장인데 lang 속성이 없다 — 이 규격은 다른 언어 구절에 lang 을 준다(A11Y-023).
- KRDS 키트는 연락처를 div·ul 로, 링크 묶음을 div 로 쓴다 — 이 규격은 address·nav·ul 로 구조를 드러낸다(A11Y-007).
