# 태그 (`.tag`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

사용자가 적용한 필터·정렬 옵션을 짧은 레이블로 보여주고 하나씩 해제하게 하거나, 관련 키워드 화면으로 이동하는 짧은 링크 묶음에 쓴다.

## 대신 쓸 것
- 상호작용 없이 데이터의 분류·속성만 강조하는 경우 → 배지 (NAV-052)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(태그 하나) | `.tag` | `span(삭제형) 또는 a(링크형)` | 예 | 레이블은 2어절 이내, 한 줄로 쓴다(COPY-031). 한 화면의 태그는 한 가지 색을 기본으로 쓴다(COLOR-019). |
| 태그 레이블 | `.tag__label` | `span` |  | 삭제형 태그의 보이는 텍스트. |
| 삭제 버튼 | `.tag__remove` | `button` |  | 접근 가능한 이름에 태그 레이블과 동작을 함께 쓴다(예 '서울특별시 필터 삭제'). 24×24px(LAYOUT-002). |
| 태그 그룹 | `.tag-group` | `div` | 예 | 태그 목록과 일괄 액션 버튼을 담는다. 한 그룹 안에 삭제형(대화형)과 표시형(비대화형) 태그를 섞지 않는다(FORM-040). |
| 태그 목록 | `.tag-group__list` | `ul` | 예 | aria-label 로 목록 이름을 주고 tabindex="-1" 을 둔다 — 마지막 태그를 지웠을 때 초점을 받는다(A11Y-039). |
| 태그 항목 | `.tag-group__item` | `li` | 예 |  |
| 일괄 액션 버튼 | `.tag-group__clear` | `button` |  | 그룹 전체에 동작하는 버튼(전체 삭제 등)은 태그 그룹 오른쪽에 둔다(LAYOUT-049). |

## 표준 마크업

```html
<div class="tag-group">
  <ul class="tag-group__list" role="list" id="applied-filters" aria-label="적용한 필터" tabindex="-1">
    <li class="tag-group__item">
      <span class="tag"><span class="tag__label">서울특별시</span><button type="button" class="tag__remove" aria-label="서울특별시 필터 삭제"><svg class="tag__icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"></path></svg></button></span>
    </li>
    <li class="tag-group__item">
      <span class="tag"><span class="tag__label">청년 지원</span><button type="button" class="tag__remove" aria-label="청년 지원 필터 삭제"><svg class="tag__icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"></path></svg></button></span>
    </li>
  </ul>
  <button type="button" class="tag-group__clear">필터 전체 삭제</button>
</div>
<div class="tag-group">
  <ul class="tag-group__list" role="list" aria-label="관련 키워드">
    <li class="tag-group__item"><a class="tag tag--link" href="/search?keyword=%EC%A3%BC%EA%B1%B0">주거</a></li>
    <li class="tag-group__item"><a class="tag tag--link" href="/search?keyword=%EC%B7%A8%EC%97%85">취업</a></li>
  </ul>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.tag-group {
  display: flex;
  align-items: flex-start;
  gap: var(--space-gap-4);
}
.tag-group__list {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  gap: var(--space-gap-3);
  margin: 0;
  padding: 0;
  list-style: none;
}
.tag-group__list:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-gap-1);
  min-block-size: var(--size-height-5);
  padding-inline: var(--space-padding-4);
  border: var(--border-width-variable-regular) solid var(--color-border-gray-light);
  border-radius: var(--radius-max);
  background-color: var(--color-action-white);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
  line-height: var(--font-line-height-none);
  white-space: nowrap;
}
.tag:has(.tag__remove) {
  padding-inline-end: var(--space-padding-2);
}
.tag__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--size-height-4);
  block-size: var(--size-height-4);
  padding: 0;
  border-style: none;
  border-radius: var(--radius-max);
  background-color: transparent;
  color: var(--color-icon-gray);
  cursor: pointer;
}
.tag__remove:hover {
  background-color: var(--color-action-secondary-hover);
}
.tag__remove:active {
  background-color: var(--color-action-secondary-pressed);
}
.tag__remove:focus-visible,
.tag--link:focus-visible,
.tag-group__clear:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
.tag__icon {
  inline-size: var(--size-height-2);
  block-size: var(--size-height-2);
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
}
.tag--link {
  text-decoration-line: none;
}
.tag--link:hover {
  background-color: var(--color-action-secondary-hover);
  text-decoration-line: underline;
}
.tag--link:active {
  background-color: var(--color-action-secondary-pressed);
}
.tag-group__clear {
  flex: 0 0 auto;
  min-block-size: var(--size-height-5);
  padding-inline: var(--space-padding-1);
  border-style: none;
  background-color: var(--color-button-text-fill);
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
  cursor: pointer;
}
.tag-group__clear:hover {
  background-color: var(--color-button-text-fill-hover);
}
```

## 상태
- **선택형(토글 필터)**: 태그를 button.tag 로 만들고 aria-pressed="true|false" 로 선택 상태를 준다. 선택 상태는 색만이 아니라 체크 아이콘이나 굵기로도 구분한다(COLOR-001, A11Y-025).
- **삭제 후**: 해당 li 를 지운다. 초점은 이전 태그의 삭제 버튼으로, 이전 태그가 없으면 다음 태그의 삭제 버튼으로 — 남은 태그가 없으면 목록(ul, tabindex="-1")으로 옮긴다(A11Y-039).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 삭제 버튼·링크 태그·일괄 액션 버튼을 화면 순서대로 지난다(A11Y-015). |
| Enter / Space | 초점이 있는 삭제 버튼으로 태그를 지운다. 링크 태그는 Enter 로 이동한다. |

## 동작
- 태그를 지우면 초점을 이전 태그로, 남은 태그가 없으면 태그 목록 컨테이너로 옮긴다(A11Y-039). 삭제는 클릭(up 이벤트)·키 입력 완료 때 실행한다(A11Y-018).
- 필터 태그를 지우거나 선택을 바꾼 뒤 결과를 즉시 반영하면 초점을 그 태그 자리(위 규칙)에 두고 문서 처음으로 옮기지 않는다(NAV-009).
- 한 그룹 안에 대화형 태그와 비대화형 태그를 섞지 않는다(FORM-040).
- 태그 레이블은 2어절 이내로 쓰고 줄바꿈하지 않는다(COPY-031). 처음에는 꼭 필요한 태그만 둔다(LAYOUT-048).
- 태그 색은 한 가지를 기본으로 쓰고, 색으로만 의미를 전달하지 않는다(COLOR-019, COLOR-001).
- 태그 레이블과 아이콘은 배경과 대비를 지키고(텍스트 4.5:1, 아이콘 3:1), 태그끼리는 테두리로 구분한다(COLOR-002, COLOR-003, LAYOUT-003).
- 일괄 액션 버튼은 태그 그룹 오른쪽에 둔다(LAYOUT-049).
- 사용자가 설정한 필터·정렬 옵션을 보여주고 해제하게 할 때 태그를 쓰고, 상호작용 없는 분류 표시는 배지를 쓴다(NAV-052).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-015 | MUST | 순차 탐색 순서가 의미나 조작에 영향을 주는 페이지에서는 초점이 의미와 조작을 보존하는 순서로 이동하게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-018 | MUST | 단일 포인터로 실행하는 기능은 down 이벤트에서 실행하지 않거나, up 이벤트에서 완료하면서 완료 전 중단·완료 후 되돌리기 수단을 제공하거나, up 이벤트가 down 이벤트의 결과를 되돌리게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-039 | SHOULD | 태그를 삭제하면 키보드 초점을 삭제한 태그의 이전 태그로 옮기고, 첫 번째 태그를 삭제했으면 새 첫 번째 태그로, 남은 태그가 없으면 태그 목록 컨테이너로 옮긴다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-019 | SHOULD | 태그는 한 가지 색을 기본으로 쓰고, 색을 추가하는 경우 색 구분이 사용자에게 의미가 있을 때만 추가하며 동시에 표시되는 태그들이 같은 강조 수준으로 보이게 한다. |
| COPY-002 | MUST | 링크의 목적을 링크 텍스트만으로, 또는 링크 텍스트와 프로그램으로 판별되는 링크 맥락(같은 문장·문단·목록 항목·표 셀·aria-describedby)으로 알 수 있게 쓴다. |
| COPY-031 | SHOULD | 태그 레이블은 2단어(띄어쓰기로 나뉜 어절 2개) 이내로 쓰고 줄바꿈이 생기지 않게 한다. |
| FORM-040 | SHOULD | 한 태그 그룹 안에 대화형 태그(선택 해제·삭제 등 조작 가능)와 비대화형 태그(분류 표시만)를 섞지 않는다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-003 | MUST | 이웃한 콘텐츠 블록은 테두리, 구분선, 서로 다른 무늬, 배경색 명도 차이, 줄 간격·글자 간격 조절 중 하나 이상으로 시각적으로 구분한다. |
| LAYOUT-048 | SHOULD | 태그는 처음에 꼭 필요한 것만 두고, 사용자 의견을 수렴해 필요가 확인된 태그만 추가한다. |
| LAYOUT-049 | SHOULD | 태그 그룹 전체에 동작하는 일괄 액션 버튼(전체 삭제 등)은 태그 그룹 바로 옆(태그 목록의 앞이나 뒤)에 두고, 태그 그룹과 버튼 사이에 다른 콘텐츠를 두지 않는다. |
| NAV-009 | SHOULD | 필터·정렬·조회를 실행한 뒤 키보드 초점을, 결과를 즉시 반영하는 방식이면 값을 바꾼 옵션에, 일괄 반영하는 방식이면 적용(제출) 버튼에 유지하고 문서 처음이나 다른 요소로 옮기지 않는다. |
| NAV-047 | SHOULD | 다른 화면·같은 화면의 다른 섹션으로 이동하는 동작에는 a[href] 링크를, 폼 제출·대화상자 열기·기능 실행처럼 이동하지 않는 동작에는 button을 쓴다. |
| NAV-052 | MAY | 사용자가 설정한 필터링·정렬 옵션을 표시하고 해제하게 할 때는 태그를 쓰고, 상호작용 없이 데이터의 분류·속성만 강조할 때는 배지를 쓴다. |

## KRDS 키트와의 관계
- 클래스 대응: `.tag-group` ↔ `krds-tag-wrap`, `.tag` ↔ `krds-btn-tag`, `.tag__remove` ↔ `btn-delete`, `.tag--link` ↔ `krds-btn-tag link`
- KRDS 키트 삭제 버튼은 16px 이다 — 이 규격은 24px 로 만들어 포인터 대상 크기를 직접 충족한다(LAYOUT-002).
- KRDS 키트 삭제 버튼 이름은 '삭제' 뿐이라 어느 태그를 지우는지 알 수 없다 — 이 규격은 '[태그 레이블] 필터 삭제' 로 쓴다(A11Y-025, COPY-002).
- KRDS 키트 링크 태그는 href="#" 을 쓴다 — 이 규격은 실제 목적지 URL 을 쓴다(NAV-047).
- KRDS 키트는 태그를 목록(ul/li)으로 묶지 않고 그룹 이름도 없다 — 이 규격은 ul 과 aria-label 로 묶어 삭제 뒤 초점을 받을 컨테이너를 둔다(A11Y-039).
