# SPACE — 간격

ux-baseline 확정 룰. 자동 생성 파일이다.

| ID | 강도 | 룰 |
|---|---|---|
| SPACE-001 | MUST | margin·padding·gap 등 모든 간격 값은 디자인 토큰의 간격 스케일(KRDS: number 원시 토큰과 gap·padding 토큰)에서만 고르고 CSS에 px 값을 직접 쓰지 않는다. |
| SPACE-002 | SHOULD | 체크박스·라디오 버튼을 가로로 나열할 때는 한 옵션의 레이블 끝과 다음 옵션 컨트롤 사이 간격을 24px(gap-7) 이상으로 두어, 컨트롤과 자기 레이블 사이 간격보다 넓게 한다. |
| SPACE-003 | MAY | 텍스트 입력 필드의 레이블·부가 설명·입력 박스·시스템 메시지 사이 간격을 8px(gap-3)로, 입력 박스 안쪽 좌우 여백을 16px(padding-6)로 둔다. |

## SPACE-001 간격은 정의된 스케일에서만

- 강도: **MUST**
- 룰: margin·padding·gap 등 모든 간격 값은 디자인 토큰의 간격 스케일(KRDS: number 원시 토큰과 gap·padding 토큰)에서만 고르고 CSS에 px 값을 직접 쓰지 않는다.
- 측정 기준: CSS의 margin*, padding*, gap, row-gap, column-gap, inset* 선언 값이 var(--space-*)·레이아웃 여백 토큰 var(--layout-screen-margin-*)(또는 KRDS var(--krds-gap-*), var(--krds-padding-*), var(--krds-number-*)), 0, auto 중 하나다.
- 판정 방법: stylelint로 소스 CSS 전체를 검사한다.
- 자동 검사: partial (stylelint/scale-unlimited/declaration-strict-value)
- 적용 대상: margin, padding, gap, inset
- 예외: 외부 라이브러리·KRDS 키트 원본 CSS(CF-049)
- 결정 CF-024: SPACE-001, SHAPE-001, MOTION-010을 MUST로 올린다. 색·타이포 토큰 강제 룰은 COLOR-022·TYPO-032(MUST)로 새로 만든다(4단계 토큰 정의 후). 다섯 룰 모두 프로젝트가 작성한 CSS·JS에만 적용하고, 외부 라이브러리·KRDS 키트 원본 CSS는 검사 대상에서 뺀다(CF-049).
- 결정 CF-060: FORM-072: aria-disabled 만 쓰고 disabled 금지, aria-disabled 상태에서 클릭·Enter·Space를 해도 값은 경계값 그대로. A11Y-039: 첫 태그를 지우면 새 첫 태그로 초점. STATE-020: 네이티브 progress 우선(html-validate prefer-native-element 와 일치). COPY-048: 아이콘 버튼 이름 툴팁은 대상 아님. SHAPE-004: 플로팅 버튼 2(KRDS에 없는 체계 선택), 긴급 공지 2, 모달 4. KRDS 그림자 단계 설명(PDF 183쪽)의 '4단계: 모달, 긴급 알림'과 엘리베이션 적용(PDF 191쪽)의 '긴급 공지 shadow2'는 같은 컴포넌트(KRDS 컴포넌트 목록에는 '긴급 알림'이 없고 '긴급 공지(Critical alerts)'만 있다)로 보고, 컴포넌트별로 지정한 적용 절(2단계)을 따른다. SPACE-001: var(--layout-screen-margin-*) 도 간격 값으로 허용.
- 근거: 간격 값을 스케일 밖에서 고르면 화면마다 간격이 달라져 일관성이 깨진다.
- 출처: KRDS 디자인 스타일 > 레이아웃 > 간격 (가이드라인 PDF 2025.08 152쪽)

좋은 예 — 간격 값을 간격 토큰에서만 고른다.
```css
.card { padding: var(--space-padding-8); gap: var(--space-gap-5); }
```
나쁜 예 — 토큰 없이 px 값을 직접 썼다.
```css
.card { padding: 23px; gap: 13px; } /* 스케일에 없는 값 직접 입력 */
```

## SPACE-002 가로 나열 선택 컨트롤 간격

- 강도: **SHOULD**
- 룰: 체크박스·라디오 버튼을 가로로 나열할 때는 한 옵션의 레이블 끝과 다음 옵션 컨트롤 사이 간격을 24px(gap-7) 이상으로 두어, 컨트롤과 자기 레이블 사이 간격보다 넓게 한다.
- 측정 기준: 가로 배치된 체크박스·라디오 그룹에서 이웃 옵션 사이 간격(앞 옵션 레이블 right ~ 다음 옵션 컨트롤 left) ≥ 24 CSS px이고, 이 값 > 각 옵션의 컨트롤-레이블 간격이다.
- 판정 방법: 가로 배치 선택 그룹을 개발자 도구로 측정한다.
- 자동 검사: none
- 적용 대상: input[type=checkbox], input[type=radio], 가로 배치 선택 그룹
- 근거: 옵션 간격이 컨트롤-레이블 간격과 같으면 어느 레이블이 어느 컨트롤의 것인지 혼동되고 오조작이 생긴다.
- 출처: KRDS 디자인 스타일 > 레이아웃 > 컴포넌트 리스트 (가이드라인 PDF 2025.08 158쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 529쪽)

좋은 예 — 옵션 간격 24px가 컨트롤-레이블 간격 8px보다 넓다.
```css
.choice-group.horizontal { display: flex; column-gap: var(--space-gap-7); } /* 옵션 사이 24px */
.choice-item { display: inline-flex; gap: var(--space-gap-3); } /* 컨트롤-레이블 8px */
```
나쁜 예 — 옵션 간격이 컨트롤-레이블 간격과 같아 어느 레이블인지 헷갈린다.
```css
.choice-group.horizontal { display: flex; column-gap: var(--space-gap-3); } /* 옵션 사이 8px */
.choice-item { display: inline-flex; gap: var(--space-gap-3); } /* 컨트롤-레이블 8px */
```

## SPACE-003 입력 필드 내부 간격

- 강도: **MAY**
- 룰: 텍스트 입력 필드의 레이블·부가 설명·입력 박스·시스템 메시지 사이 간격을 8px(gap-3)로, 입력 박스 안쪽 좌우 여백을 16px(padding-6)로 둔다.
- 측정 기준: 텍스트 입력 필드 컴포넌트에서 레이블→부가 설명→입력 박스→시스템 메시지 각 요소 사이 세로 간격이 8px이고, input의 padding-inline이 16px이다(KRDS 토큰 gap-3, padding-6).
- 판정 방법: 입력 필드 컴포넌트의 계산 스타일을 확인한다.
- 자동 검사: partial (stylelint/ux-baseline/text-field-spacing)
- 적용 대상: 텍스트 입력 필드, .form-group
- 근거: 입력 필드 내부 간격을 고정하면 폼 전체의 리듬이 일정해진다.
- 출처: KRDS 디자인 스타일 > 레이아웃 > 컴포넌트 내 패딩 (가이드라인 PDF 2025.08 160쪽)

좋은 예 — 입력 필드 요소 간격 8px, 입력 박스 좌우 여백 16px다.
```css
.form-group { display: grid; gap: var(--space-gap-3); } /* 8px */
.form-group input { padding-inline: var(--space-padding-6); } /* 16px */
```
나쁜 예 — 토큰은 썼지만 지정 토큰(gap-3·padding-6)이 아니다.
```css
.form-group { display: grid; gap: var(--space-gap-1); } /* 2px */
.form-group input { padding-inline: var(--space-padding-3); } /* 8px */
```
