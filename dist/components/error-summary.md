# 오류 요약 (`.error-summary`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

폼을 제출했는데 검증 오류가 1개 이상일 때 본문 제목 바로 아래에 오류 목록을 보여 주고, 각 항목에서 해당 입력 필드로 이동하게 한다.

## 대신 쓸 것
- 모달 안 폼이거나 입력 필드가 1개인 폼 → 오류 요약 없이 첫 오류 필드로 초점 이동 (FORM-015)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.error-summary` | `section` | 예 | 본문 제목(h1) 바로 다음, 본문의 첫 요소로 둔다(FORM-077, CF-008·041). 제목으로 이름을 주어 region 으로 만들고, 스크립트로 초점을 옮길 수 있게 tabindex="-1" 을 준다. |
| 제목 | `.error-summary__title` | `h2` | 예 | 오류가 있다는 사실과 할 일을 한 문장으로 쓴다(COPY-005). |
| 오류 목록 | `.error-summary__list` | `ul` | 예 | 항목마다 해당 입력 필드 id 로 가는 링크. 문구는 필드 옆 오류 메시지와 같은 문장으로 쓴다(COPY-053). |

## 표준 마크업

```html
<section class="error-summary" aria-labelledby="error-summary-title" tabindex="-1">
  <h2 class="error-summary__title" id="error-summary-title">입력 내용을 확인해 주세요</h2>
  <ul class="error-summary__list">
    <li><a class="error-summary__link" href="#applicant-name">이름을 입력해 주세요.</a></li>
    <li><a class="error-summary__link" href="#applicant-phone">휴대전화 번호를 010-1234-5678 형식으로 입력해 주세요.</a></li>
  </ul>
</section>
```

## 표준 CSS (토큰만 사용)

```css
.error-summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  padding: var(--space-padding-6);
  border: var(--space-scale-1) solid var(--color-border-danger);
  border-inline-start-width: var(--space-scale-3);
  border-radius: var(--radius-medium3);
  background-color: var(--color-surface-danger-subtler);
}
.error-summary:focus-visible,
.error-summary:focus {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.error-summary__title {
  margin: 0;
  color: var(--color-text-basic);
  font-size: var(--font-size-heading-xsmall);
  font-weight: var(--font-weight-bold);
}
.error-summary__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-2);
  margin: 0;
  padding-inline-start: var(--space-padding-6);
}
.error-summary__link {
  color: var(--color-text-danger);
  text-decoration-line: underline;
}
.error-summary__link:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **표시**: 제출 검증에 실패하면 서버가 다시 그린 페이지(또는 스크립트)가 이 요소를 본문 제목 바로 다음에 넣고, <title> 맨 앞에 '오류: ' 를 붙인다(FORM-079).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 오류 요약 안의 링크를 차례로 지난다. 초점 표시가 보인다(A11Y-016). |
| Enter | 링크가 가리키는 입력 필드로 초점을 옮긴다(href="#필드 id" — 입력 필드 id 로 가면 브라우저가 초점을 옮긴다). |

## 동작
- 오류 요약을 표시한 직후 키보드 초점을 오류 요약(tabindex="-1")으로 옮긴다(FORM-077). KRDS 를 적용하는 공공 프로젝트는 오류 요약은 표시하되 초점은 첫 번째 오류 필드로 옮긴다(CF-007, FORM-015).
- 초점을 받은 오류 요약과 링크로 이동한 입력 필드에서 outline 을 없애지 않는다 — 프로그램으로 옮긴 초점도 눈에 보여야 사용자가 위치를 안다(A11Y-016).
- role="alert" 를 함께 쓰지 않는다 — 초점 이동으로 이미 읽히므로 두 번 읽힌다.
- 각 입력 필드 옆에도 같은 문장의 오류 메시지를 aria-describedby 로 연결해 둔다(FORM-003, COPY-053, components/text-field).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| COPY-005 | SHOULD | 오류 메시지는 오류가 난 항목 이름, 무엇이 잘못됐는지, 고치는 방법(또는 사용자가 할 수 있는 다음 행동)을 담아 높임 종결어미로 쓰고, 사용자를 탓하는 표현과 '오류가 발생했습니다'·'유효하지 않은 값입니다' 같은 일반 문구만으로 된 메시지를 쓰지 않는다. |
| COPY-053 | SHOULD | 오류 요약의 각 항목 문구를 해당 필드 옆에 표시하는 오류 메시지와 같은 문장으로 쓴다. |
| FORM-003 | MUST | 입력 오류를 자동으로 감지하면 오류가 난 항목을 식별하고 오류 내용을 텍스트로 설명한다. |
| FORM-015 | SHOULD | 오류 요약(FORM-077)을 두지 않는 폼(모달 안 폼, 입력 필드가 1개인 폼)이나 KRDS를 적용하는 공공 프로젝트의 폼에서 제출 결과 검증 오류가 있으면 키보드 초점을 오류가 난 첫 번째 입력 필드로 옮기고, 오류를 모달로 알렸다면 모달을 닫은 직후 그 필드로 초점을 옮긴다. |
| FORM-077 | SHOULD | 폼 제출 시 검증 오류가 1개 이상이면 본문 제목(h1) 바로 아래, 본문의 첫 요소로 오류 요약을 표시하고 키보드 초점을 오류 요약으로 옮긴다. |
| FORM-079 | SHOULD | 제출 후 검증 오류를 표시하는 페이지는 <title> 맨 앞에 '오류: '를 붙인다. |
