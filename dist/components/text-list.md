# 텍스트 목록 (`.text-list`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

준비물·자격 조건·절차처럼 짧은 문장이나 구절 여러 개를 글머리 기호나 번호로 나열할 때 쓴다.

## 대신 쓸 것
- 항목마다 제목·속성·행동 버튼이 있는 정보 묶음 → structured-list
- 항목 간 값을 열 단위로 비교해야 하는 경우 → data-table

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.text-list` | `ul 또는 ol` | 예 | 항목 중요도가 같으면 ul, 순서·순위가 있으면 ol 을 쓴다(A11Y-007). 글머리·번호는 CSS 목록 표지(list-style-type)로 그린다. |
| 항목 | `.text-list__item` | `li` | 예 | 같은 수준의 항목은 서술식이나 개조식 한 가지로 쓴다(COPY-027). |
| 하위 목록 | `.text-list` | `ul 또는 ol (li 안)` |  | 상위 항목의 li 안에 넣는다. 3수준까지만 쓴다(LAYOUT-046). |
| 번호 목록 변형 | `.text-list--ordered` | `ol` |  |  |

## 표준 마크업

```html
<ul class="text-list">
  <li class="text-list__item">신분증 원본</li>
  <li class="text-list__item">가족관계 증명 서류
    <ul class="text-list">
      <li class="text-list__item">가족관계증명서(상세)</li>
      <li class="text-list__item">혼인관계증명서
        <ul class="text-list">
          <li class="text-list__item">발급일 3개월 이내</li>
          <li class="text-list__item">주민등록번호 뒷자리 표시</li>
        </ul>
      </li>
    </ul>
  </li>
  <li class="text-list__item">신청서 1부</li>
</ul>
<ol class="text-list text-list--ordered">
  <li class="text-list__item">신청서를 작성합니다.</li>
  <li class="text-list__item">구비 서류를 올립니다.
    <ol class="text-list text-list--ordered">
      <li class="text-list__item">파일은 PDF 또는 JPG로 올려 주세요.</li>
      <li class="text-list__item">파일 하나는 10MB 이하로 올려 주세요.</li>
    </ol>
  </li>
  <li class="text-list__item">신청 내용을 확인하고 제출합니다.</li>
</ol>
```

## 표준 CSS (토큰만 사용)

```css
.text-list {
  margin: 0;
  padding-inline-start: var(--space-padding-7);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
  list-style-type: disc;
}
.text-list .text-list {
  margin-block-start: var(--space-gap-2);
  list-style-type: "– ";
}
.text-list .text-list .text-list {
  list-style-type: circle;
}
.text-list__item + .text-list__item {
  margin-block-start: var(--space-gap-2);
}
.text-list--ordered {
  list-style-type: decimal;
}
.text-list .text-list--ordered {
  list-style-type: lower-alpha;
}
.text-list .text-list .text-list--ordered {
  list-style-type: lower-roman;
}
```

## 동작
- 글머리 기호·번호는 list-style-type 으로 그린다. list-style:none 으로 지우고 번호를 텍스트로 쓰지 않는다 — 일부 스크린 리더(Safari VoiceOver)가 list-style:none 인 목록의 목록 의미를 읽지 않는다(A11Y-007).
- 같은 수준 항목의 어투를 하나로 맞춘다. 첫 항목이 서술식이면 모두 서술식, 개조식이면 모두 개조식으로 쓴다(COPY-027).
- 서술식 항목의 마지막 문장은 마침표·물음표·느낌표로 끝낸다. 개조식 항목은 종결 부호를 한 목록 안에서 모두 쓰거나 모두 생략한다(COPY-028).
- 중첩은 3수준까지만 쓰고, 하위 수준은 padding-inline-start 로 들여쓴다(LAYOUT-046).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| COPY-027 | SHOULD | 같은 수준의 목록 항목은 같은 어투로 쓴다. 첫 항목을 서술식(종결어미로 끝나는 문장)으로 썼으면 같은 수준의 모든 항목을 서술식으로, 개조식(명사·명사형으로 끝남)으로 썼으면 모두 개조식으로 쓴다. |
| COPY-028 | SHOULD | 서술식 목록 항목의 마지막 문장에는 종결 부호(. ? !)를 쓰고, 개조식 목록 항목은 종결 부호를 생략할 수 있다. |
| LAYOUT-046 | SHOULD | 중첩 텍스트 목록은 수준마다 들여쓰기로 계층을 구분하고 3수준 이내로 구성한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.text-list` ↔ `krds-info-list`, `.text-list--ordered` ↔ `krds-info-list ordered`
- KRDS 키트의 ordered 목록은 번호('1.', 'a.', '①')를 span.num 텍스트로 쓰고 CSS 표지를 쓰지 않는다 — 이 규격은 ol 의 list-style-type 으로 번호를 그려 번호와 목록 의미를 함께 전달한다(A11Y-007).
- KRDS 키트 예시는 ul 에 decimal(번호) 변형을 쓴다 — 번호가 보이는 목록은 순서가 있는 것이므로 이 규격은 ol 을 쓴다(A11Y-007).
- KRDS 키트 예시는 목록 사이 간격을 br 로 만든다 — 이 규격은 CSS 간격을 쓴다.
