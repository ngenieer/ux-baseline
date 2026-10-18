# 링크 (`.link`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

다른 화면이나 같은 화면의 다른 섹션으로 이동할 때 쓰는 텍스트 링크(문장 안 인라인 링크와 독립 링크).

## 대신 쓸 것
- 폼 제출·대화상자 열기·기능 실행처럼 URL 이 바뀌지 않는 동작 → button (NAV-047)
- 필터·분류 키워드를 짧은 묶음으로 보여주는 링크 → tag (tag--link)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.link` | `a` | 예 | href 가 있는 a 요소다(NAV-047). 기본 링크는 본문 글자색 + 밑줄. 링크를 색만으로 구분하지 않도록 밑줄을 항상 표시한다(COLOR-001, TYPO-008). |
| 강조 링크 | `.link--emphasis` | `a` |  | 링크 색(파란색)을 쓰는 강조 단계. 화면에서 가장 중요한 과업과 연결된 링크에만 쓴다(COLOR-014). |
| 독립 링크 | `.link--standalone` | `a` |  | 문단 밖에 홀로 놓이는 링크. 포인터 대상 높이를 24px 이상으로 만들고(LAYOUT-002), 레이블은 모든 화면 너비에서 한 줄 길이로 쓴다(COPY-019). |
| 외부·새 창 아이콘 | `.link__icon` | `svg` |  | 새 창·외부 서비스 링크에만 붙이는 장식 아이콘(aria-hidden). 같은 의미를 링크 안의 숨긴 텍스트로도 제공한다(NAV-012). |
| 새 창 안내 텍스트 | `.sr-only` | `span` |  | 공통 스크린 리더 전용 클래스(A11Y-046·047). 문구는 ' (새 창 열림)' 하나로 서비스 전체에서 같게 쓴다 — 이 체계의 새 창 표시 단일 방식(아이콘 + 숨긴 텍스트, NAV-012 (3)). |

## 표준 마크업

```html
<p>신청 자격은 <a class="link" href="/guide/eligibility">신청 자격 안내</a>에서 확인해 주세요. 문의는 국번 없이 <a class="link" href="tel:110">110</a>으로 전화해 주세요.</p>
<a class="link link--emphasis link--standalone" href="/apply/start">지원금 신청 시작하기</a>
<a class="link link--standalone" href="/files/application-form.hwp">신청서 서식 다운로드 [HWP, 52KB]</a>
<a class="link link--standalone" href="https://www.gov.kr/" target="_blank" rel="noopener">정부24 바로 가기<span class="sr-only"> (새 창 열림)</span><svg class="link__icon" aria-hidden="true" viewBox="0 0 16 16"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"></path></svg></a>
```

## 표준 CSS (토큰만 사용)

```css
.link {
  color: var(--color-text-basic);
  text-decoration-line: underline;
  text-decoration-thickness: var(--border-width-variable-regular);
  text-underline-offset: 0.2em;
}
.link:hover {
  text-decoration-thickness: var(--border-width-variable-medium);
}
.link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
  border-radius: var(--radius-xsmall1);
}
.link--emphasis {
  color: var(--color-link-default);
}
.link--emphasis:visited {
  color: var(--color-link-visited);
}
.link--emphasis:hover {
  color: var(--color-link-hover);
}
.link--emphasis:active {
  color: var(--color-link-pressed);
}
.link--standalone {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-2);
  min-block-size: var(--layout-target-min);
}
.link__icon {
  inline-size: 1em;
  block-size: 1em;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}
```

## 상태
- **방문함**: 강조 링크(link--emphasis)는 :visited 에서 방문 링크 색으로 바뀐다. 기본 링크는 본문 글자색을 유지한다.
- **초점**: 마크업 변화 없음. :focus-visible 에서 외곽선이 보인다(A11Y-016).
- **사용 불가**: 일시적으로 동작하지 않는 링크는 href 를 빼서 초점과 실행을 막고, 링크 대신 일반 텍스트로 보이게 한다(A11Y-011). 링크 모양을 남겨 두고 클릭만 막지 않는다.

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 링크로 초점을 옮긴다. 초점 표시가 보인다(A11Y-016). |
| Enter | 링크 목적지로 이동한다. |

## 동작
- URL(경로·프래그먼트)이 바뀌는 이동에만 링크를 쓰고, href="#" 이나 href="javascript:…" 에 클릭 핸들러를 붙이지 않는다(NAV-047).
- 링크 텍스트만으로, 또는 같은 문장·문단·목록 항목의 맥락과 함께 목적지를 알 수 있게 쓰고 '여기', '더 보기' 같은 일반어만 쓰지 않는다(COPY-002).
- 링크는 레이블이 설명하는 내용과 가장 관련 있는 목적지(필요하면
- target="_blank" 이거나 다른 출처로 가는 링크는 외부 아이콘과 숨긴 텍스트 '(새 창 열림)'을 서비스 전체에서 같은 방식으로 붙이고, title 속성만으로 알리지 않는다(NAV-012).
- 첨부파일 링크는 파일 이름 바로 뒤에 '[파일 형식, 파일 크기]'를 쓰고 링크 텍스트에 '다운로드'를 넣는다(COPY-007).
- 화면에 표시하는 이메일 주소·전화번호는 mailto:·tel: 링크로 만든다(NAV-045).
- 문장 안 인라인 링크에는 글자 크기를 따로 지정하지 않아 주변 본문과 같은 크기를 유지한다(TYPO-013).
- 밑줄은 링크에만 쓴다. 링크가 아닌 텍스트 강조는 색이나 굵기로 한다(TYPO-008).
- 선명한 화면 모드에서는 밑줄 두께 토큰(border-width-variable-regular)이 굵어진다 — 밑줄 두께를 이 토큰으로만 지정한다(COLOR-011).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-011 | SHOULD | 선명한 화면 모드에서는 본문의 모든 인라인 링크와 푸터의 모든 링크에 밑줄을 표시하고, 버튼·입력·선택 컴포넌트의 외곽선과 링크 밑줄을 기본 모드보다 굵게 한다. |
| COLOR-014 | SHOULD | 링크를 강조 링크(파란색 또는 서비스 주조색)와 기본 링크 두 단계로 구분하고, 강조 링크는 화면에서 가장 중요한 과업과 연결된 링크에만 쓴다. |
| COPY-002 | MUST | 링크의 목적을 링크 텍스트만으로, 또는 링크 텍스트와 프로그램으로 판별되는 링크 맥락(같은 문장·문단·목록 항목·표 셀·aria-describedby)으로 알 수 있게 쓴다. |
| COPY-007 | SHOULD | 첨부파일 링크는 파일 이름 바로 뒤에 '[파일 형식, 파일 크기]'를 KB·MB·GB 단위로 표시하고, 링크 텍스트나 바로 옆 텍스트에 '다운로드'라는 말을 넣어 링크를 누르면 파일을 받는다는 것을 알린다. |
| COPY-019 | SHOULD | 문단 밖에 독립으로 놓이는 링크의 레이블은 프로젝트가 지원하는 모든 화면 너비에서 한 줄로 표시되는 길이로 쓴다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| NAV-045 | SHOULD | 화면에 표시하는 이메일 주소와 전화번호는 각각 mailto:·tel: 링크로 마크업한다. |
| NAV-046 | SHOULD | 링크는 레이블이 설명하는 내용과 가장 관련 있는 목적지로 바로 연결하고, 목적지 페이지의 특정 섹션이 더 관련 있으면 그 섹션(#앵커)으로 연결한다. |
| NAV-047 | SHOULD | 다른 화면·같은 화면의 다른 섹션으로 이동하는 동작에는 a[href] 링크를, 폼 제출·대화상자 열기·기능 실행처럼 이동하지 않는 동작에는 button을 쓴다. |
| TYPO-008 | SHOULD | 텍스트 밑줄은 링크에만 쓰고, 링크가 아닌 텍스트의 강조는 색이나 굵기로 표현한다. |
| TYPO-013 | SHOULD | 문장 안에 들어가는 인라인 링크 텍스트는 주변 본문과 같은 글자 크기로 쓴다. |

## KRDS 키트와의 관계
- 클래스 대응: `.link` ↔ `krds-btn link basic`, `.link--emphasis` ↔ `krds-btn link`, `.link__icon` ↔ `svg-icon ico-go`
- KRDS 키트는 새 창 링크를 title="새 창 열림" 으로만 알린다 — 이 규격은 링크 안 숨긴 텍스트로 알리고 title 을 쓰지 않는다(NAV-012).
- KRDS 키트에는 밑줄 없는 링크 변형(밑줄 없음, 가상클래스 상태 시 밑줄)이 있다 — 이 규격은 링크를 색만으로 구분하지 않도록 밑줄을 항상 표시한다(COLOR-001).
- KRDS 키트 예시는 href="#!" 자리표시를 쓴다 — 이 규격은 실제 목적지 URL 을 쓴다(NAV-047).
- KRDS 키트는 링크에 버튼 클래스(krds-btn)를 함께 쓴다 — 이 규격은 링크 전용 클래스를 쓰고 버튼과 모양을 섞지 않는다(NAV-047).
