# 표 (`.data-table`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

행과 열의 관계가 의미를 갖는 데이터(항목별 사용료·이용 단위·통계 등)를 비교해 읽게 할 때 쓴다.

## 대신 쓸 것
- 요소를 격자로 배치하려는 레이아웃 목적 → CSS grid·flexbox (A11Y-007)
- 행·셀 단위로 선택·실행하는 복잡한 상호작용이 필요한 경우 → structured-list (LAYOUT-045)
- 아코디언·모달처럼 공간이 제한된 영역에서 표가 잘리거나 가로 스크롤이 생기는 경우 → 열을 세로로 쌓은 목록(dl 등) (LAYOUT-043)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(스크롤 영역) | `.data-table` | `section` | 예 | 표가 화면보다 넓으면 이 영역 안에서만 가로 스크롤한다(RESP-003, CF-012). 키보드로 스크롤할 수 있게 tabindex="0" 을 주고, aria-labelledby 로 caption id 를 연결해 이름을 준다 — 이름이 있는 section 은 role="region" 으로 노출된다(A11Y-011). |
| 표 | `.data-table__table` | `table` | 예 | caption·thead·th(scope)를 쓴다(A11Y-007). 세로 구분선이 꼭 필요한 표만 table--bordered 를 붙인다(LAYOUT-044 예외). |
| 제목(캡션) | `.data-table__caption` | `caption` | 예 | 표 제목과 열 구성을 쓴다(A11Y-007). |
| 숫자 셀 | `.data-table__cell--number` | `td` |  | 양적 데이터 셀은 오른쪽 정렬한다(TYPO-016). |
| 세로 구분선 변형 | `.table--bordered` | `table` |  | LAYOUT-044 예외('반드시 필요한 경우'). stylelint ux-baseline/table-cell-no-vertical-border 의 기본 허용 클래스다. |

## 표준 마크업

```html
<section class="data-table" aria-labelledby="facility-table-caption" tabindex="0">
  <table class="data-table__table">
    <caption class="data-table__caption" id="facility-table-caption">시설별 이용 단위와 사용료 — 열: 시설, 이용 단위, 사용료(원), 지난달 이용 건수</caption>
    <thead>
      <tr>
        <th scope="col">시설</th>
        <th scope="col">이용 단위</th>
        <th scope="col" class="data-table__cell--number">사용료(원)</th>
        <th scope="col" class="data-table__cell--number">지난달 이용 건수</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">소회의실</th>
        <td>2시간</td>
        <td class="data-table__cell--number">20,000</td>
        <td class="data-table__cell--number">148</td>
      </tr>
      <tr>
        <th scope="row">대강당</th>
        <td>4시간</td>
        <td class="data-table__cell--number">150,000</td>
        <td class="data-table__cell--number">12</td>
      </tr>
      <tr>
        <th scope="row">야외 마당</th>
        <td>1일</td>
        <td class="data-table__cell--number">-</td>
        <td class="data-table__cell--number">3</td>
      </tr>
    </tbody>
  </table>
</section>
```

## 표준 CSS (토큰만 사용)

```css
.data-table {
  max-inline-size: 100%;
  overflow-x: auto;
}
.data-table:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.data-table__table {
  inline-size: 100%;
  border-collapse: collapse;
  border-block-start: var(--border-width-static-medium) solid var(--color-border-gray-darker);
}
.data-table__caption {
  padding-block-end: var(--space-padding-3);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-bold);
  text-align: start;
}
.data-table__table th,
.data-table__table td {
  padding-block: var(--space-padding-5);
  padding-inline: var(--space-padding-6);
  border-block-end: var(--border-width-static-regular) solid var(--color-divider-gray-light);
  font-size: var(--font-size-label-medium);
  text-align: start;
  vertical-align: top;
  overflow-wrap: anywhere;
}
.data-table__table thead th {
  padding-block: var(--space-padding-3);
  border-block-end-color: var(--color-border-secondary-light);
  background-color: var(--color-surface-secondary-subtler);
  color: var(--color-text-bolder);
  font-size: var(--font-size-heading-xxsmall);
  font-weight: var(--font-weight-bold);
}
.data-table__table tbody th {
  color: var(--color-text-basic);
  font-weight: var(--font-weight-bold);
}
.data-table__table tbody td {
  color: var(--color-text-subtle);
}
.data-table__table .data-table__cell--number {
  text-align: end;
  font-variant-numeric: tabular-nums;
}
.table--bordered th,
.table--bordered td {
  border-inline: var(--border-width-static-regular) solid var(--color-divider-gray-light);
}
```

## 상태
- **빈 값**: 값이 없는 td 에 '-' 를 쓴다(예시의 야외 마당 사용료는 아직 정해지지 않은 값). 빈 문자열·공백만 있는 셀을 두지 않는다(STATE-005).
- **열 정렬**: 열 헤더 th 안에 정렬 button 을 두고 th 에 aria-sort 를 준다. 처음 표시할 때 첫 번째 열 th 에 aria-sort="ascending", 나머지는 aria-sort 없음(NAV-050, A11Y-025).
- **세로 구분선 허용**: 열 구분선이 반드시 필요한 표만 table 에 table--bordered 클래스를 더한다(LAYOUT-044 예외).

## 키보드

| 키 | 동작 |
|---|---|
| Tab | 표가 영역보다 넓을 때 스크롤 영역(data-table)에 초점이 간다. 초점 표시가 보인다(A11Y-016). |
| ← / → | 초점이 스크롤 영역에 있을 때 표를 가로로 스크롤한다(브라우저 기본 동작)(A11Y-011). |

## 동작
- 데이터 표는 table·caption·thead·th[scope] 로 마크업하고, caption 에 표 제목과 열 구성을 쓴다. 레이아웃 목적으로 table 을 쓰지 않는다(A11Y-007).
- 표가 화면보다 넓으면 data-table 영역 안에서만 가로 스크롤하고 페이지 전체 가로 스크롤은 만들지 않는다(RESP-003, CF-012). 아코디언·모달 안에서는 표 대신 열을 세로로 쌓는다(LAYOUT-043).
- 스크롤 영역은 키보드 초점을 받아 방향키로 스크롤된다(A11Y-011). 표가 영역보다 좁아 스크롤이 없으면 tabindex 를 빼도 된다.
- 셀에 세로 열 구분선을 쓰지 않는다. 행 구분선(border-block-end)만 쓴다(LAYOUT-044). 예외 변형은 table--bordered 하나로 한정한다.
- 행·셀(tr·td·th)에 click 핸들러·role·tabindex 를 주지 않는다. 대화형 요소는 열 헤더의 정렬 버튼만 허용한다(LAYOUT-045).
- 정렬 버튼이 있는 표는 처음에 첫 번째 열 기준으로 정렬하고 aria-sort 로 상태를 전달한다(NAV-050).
- 양적 데이터(개수·금액·퍼센트) 열은 헤더와 셀을 오른쪽 정렬하고, 텍스트·명목 데이터(날짜·전화번호 등)는 왼쪽 정렬한다(TYPO-016).
- td 텍스트는 지원하는 레이아웃 너비마다 3줄 이하가 되게 쓴다(TYPO-015). 넘침 방지는 overflow-wrap: anywhere 를 쓴다(TYPO-018).
- 빈 셀에는 대시(-)를 쓴다(STATE-005).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-007 | MUST | 시각적으로 표현한 정보·구조·관계(제목, 목록, 표, 입력 그룹, 레이블 연결 등)를 마크업으로 프로그램이 판별할 수 있게 하거나 텍스트로 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| LAYOUT-043 | SHOULD | 아코디언·모달처럼 공간이 제한된 영역에서 표 데이터가 잘리거나 가로 스크롤이 생기면 표를 쓰지 않고 각 열을 세로로 떨어뜨려 배치한다. |
| LAYOUT-044 | MAY | 표에 세로 열 구분선을 쓰지 않는다. |
| LAYOUT-045 | SHOULD | 표의 행·셀 자체를 클릭·선택하는 대화형 요소로 만들지 않고(열 헤더 정렬 컨트롤 제외), 데이터에 복잡한 상호작용이 필요하면 표 대신 구조화 목록을 쓴다. |
| NAV-050 | MAY | 열 헤더에 정렬 버튼이 있는 표는 처음 표시할 때 첫 번째 열 기준으로 정렬한다. |
| RESP-003 | MUST | 세로 스크롤 콘텐츠는 너비 320 CSS px, 가로 스크롤 콘텐츠는 높이 256 CSS px에 해당하는 화면에서 정보와 기능의 손실 없이, 두 방향 스크롤 없이 이용할 수 있게 한다. 사용이나 의미 전달에 2차원 배치가 필요한 부분만 예외로 한다. |
| STATE-005 | SHOULD | 구조화 목록 항목이나 표의 데이터 셀에 표시할 값이 없으면 그 자리를 비워 두지 않고 대시(-)를 표시한다. |
| TYPO-015 | SHOULD | 표 데이터 셀(td)의 텍스트는 3줄 이하로 표시되게 쓴다. |
| TYPO-016 | SHOULD | 표에서 양적 데이터(개수·퍼센트·용량 등) 셀은 오른쪽 정렬하고, 텍스트와 명목 데이터(날짜·우편번호·전화번호·IP 주소 등) 셀은 왼쪽 정렬한다. |
| TYPO-018 | SHOULD | flex·grid 항목과 표 셀처럼 min-content 너비로 크기가 정해지는 컨테이너 안 텍스트의 넘침 방지에는 overflow-wrap: break-word 대신 overflow-wrap: anywhere를 쓴다. |

## KRDS 키트와의 관계
- 클래스 대응: `.data-table` ↔ `krds-table-wrap`, `.data-table__table` ↔ `tbl col data`
- KRDS 키트는 col 에 인라인 style(width 30%)을 쓴다 — 이 규격은 인라인 스타일 없이 CSS 로 열 너비를 정한다.
- KRDS 키트의 표 영역(krds-table-wrap)은 가로 스크롤 시 키보드 초점을 받지 않는다 — 이 규격은 스크롤 영역에 tabindex="0" 과 이름을 준다(A11Y-011).
- KRDS 키트 예시 caption 은 '000에 대한 표로…' 같은 자리표시 문장이다 — 이 규격은 실제 표 제목과 열 구성을 쓴다(A11Y-007).
