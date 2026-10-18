# 배지 (`.badge`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

목록 항목·카드·메뉴 같은 요소에 상태·분류·개수 같은 속성을 상호작용 없이 짧은 텍스트로 강조할 때 쓴다.

## 대신 쓸 것
- 사용자가 설정한 필터·정렬 조건을 보여 주고 해제하게 하는 경우처럼 클릭·삭제가 필요한 경우 → 태그 (NAV-052)
- 서비스 전체에 알려야 할 장애·재난·이용 중단 안내 → critical-alert (STATE-006)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(레이블) | `.badge` | `span` | 예 | a·button 이 아닌 span 이다. role·tabindex·click 핸들러를 주지 않는다(A11Y-030). 텍스트 레이블이 반드시 있다(COLOR-002). |
| 의미 색 변형 | `.badge--danger` | `span` |  | badge--danger·--warning·--success·--information·--point·--secondary·--gray 중 레이블 의미에 맞는 하나를 붙인다(COLOR-018). 주조색(primary) 변형은 없다(COLOR-017). |
| 숫자형 변형 | `.badge--number` | `span` |  | 개수를 표시한다. 상한을 넘으면 '999+' 처럼 '상한+' 로 쓴다(COPY-024). |

## 표준 마크업

```html
<ul class="badge-demo">
  <li>전입 신고 <span class="badge badge--success">처리 완료</span></li>
  <li>여권 재발급 <span class="badge badge--information">처리 중</span></li>
  <li>사업자 등록 정정 <span class="badge badge--warning">보완 필요</span></li>
  <li>건축 허가 <span class="badge badge--danger">반려</span></li>
  <li>주민등록 등본 <span class="badge badge--gray">임시 저장</span></li>
</ul>
<p class="badge-demo">새 알림 <span class="badge badge--number">999+<span class="sr-only">건</span></span></p>
```

## 표준 CSS (토큰만 사용)

```css
.badge {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--size-height-4);
  padding-inline: var(--space-padding-3);
  border-radius: var(--radius-small2);
  background-color: var(--color-element-gray-light);
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-small);
  font-weight: var(--font-weight-bold);
  line-height: var(--font-line-height-base);
  vertical-align: middle;
}
.badge--secondary {
  background-color: var(--color-element-secondary-lighter);
  color: var(--color-text-secondary);
}
.badge--point {
  background-color: var(--color-element-point-lighter);
  color: var(--color-text-point);
}
.badge--danger {
  background-color: var(--color-element-danger-lighter);
  color: var(--color-text-danger);
}
.badge--warning {
  background-color: var(--color-element-warning-lighter);
  color: var(--color-text-warning);
}
.badge--success {
  background-color: var(--color-element-success-lighter);
  color: var(--color-text-success);
}
.badge--information {
  background-color: var(--color-element-information-lighter);
  color: var(--color-text-information);
}
.badge--gray {
  background-color: var(--color-element-gray-light);
  color: var(--color-text-subtle);
}
.badge--number {
  min-block-size: var(--size-height-3);
  padding-inline: var(--space-padding-2);
  border-radius: var(--radius-max);
  background-color: var(--color-element-point);
  color: var(--color-text-inverse-static);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

## 상태
- **숫자 상한 초과**: 값 n 이 상한 L(예 999)보다 크면 텍스트를 'L+'(예 999+)로 바꾼다. '+999' 처럼 기호를 앞에 두지 않는다(COPY-024).

## 동작
- 배지는 대화형 요소가 아니다. a·button·role="link"·role="button"·0 이상의 tabindex·click 핸들러를 주지 않는다. 눌러서 무엇을 해야 하면 태그나 버튼을 쓴다(A11Y-030, NAV-052).
- 한 요소(목록 항목·카드 등)에 배지를 1개만 붙인다(STATE-014).
- 색은 레이블 의미에 맞춰 고른다 — 위험·반려는 danger, 주의·보완은 warning, 완료·성공은 success, 안내·진행은 information(COLOR-018). 의미는 레이블 텍스트로 전달하고 색은 보조 단서로만 쓴다(COLOR-001).
- 배경색으로 주조색(채움 버튼 배경색 --color-button-primary-fill)을 쓰지 않는다(COLOR-017).
- 문구는 기본 글자 크기에서 한 줄에 들어가는 길이로 쓰고, white-space: nowrap 으로 줄바꿈을 막지 않는다. 확대·좁은 화면에서는 줄바꿈된다(TYPO-014, CF-045).
- 모든 변형의 글자색:배경색 대비를 4.5:1 이상으로 유지한다(COLOR-002). 키트의 disabled 변형(text-disabled-on/element-disabled-light)은 이 기준에 못 미쳐 두지 않는다.
- 숫자형 배지의 값만으로 의미가 모호하면 단위를 시각적으로 숨긴 텍스트(.sr-only)로 덧붙인다. 숨김은 display:none·크기 0 이 아닌 시각적 숨김으로 한다(A11Y-046, A11Y-047).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-030 | SHOULD | 배지를 대화형 요소로 만들지 않는다: 배지에 a·button 마크업, role="link"·role="button", 0 이상의 tabindex를 주지 않는다. |
| A11Y-046 | SHOULD | 스크린 리더에 전달할 숨긴 콘텐츠에는 display:none이나 visibility:hidden을 쓰지 않고 시각적 숨김 스타일(clip·1px 크기 등)을 쓴다. |
| A11Y-047 | SHOULD | 숨긴 콘텐츠에 width:0, height:0, font-size:0, line-height:0을 쓰지 않는다. |
| COLOR-001 | MUST | 색만으로 정보를 전달하거나 동작·응답 요청·요소를 구분하지 않고, 텍스트·아이콘·패턴·밑줄 같은 다른 시각 단서를 함께 쓰거나 두 색의 명도 대비를 3:1 이상으로 한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-017 | SHOULD | 배지 배경색으로 서비스 주조색(primary color, 채움 버튼 배경색)을 쓰지 않는다. |
| COLOR-018 | MAY | 배지 색은 레이블 정보와 색의 일반적 의미가 맞을 때 그 색을 쓰고(예: 중요·경고·반대는 빨강), 한 화면의 배지 색 종류를 늘려 주의를 분산시키지 않는다. |
| COPY-024 | MAY | 숫자형 배지의 값이 표시 상한을 넘으면 '상한+' 형식(예: 999+)으로 쓰고 '+999'처럼 기호를 앞에 두지 않는다. |
| NAV-052 | MAY | 사용자가 설정한 필터링·정렬 옵션을 표시하고 해제하게 할 때는 태그를 쓰고, 상호작용 없이 데이터의 분류·속성만 강조할 때는 배지를 쓴다. |
| STATE-014 | MAY | 한 항목 컨테이너(목록 항목·표 행·카드·글·구역 등)에 보이는 배지를 1개만 붙인다. |
| TYPO-014 | SHOULD | 배지 문구는 기본 글자 크기에서 한 줄로 표시되는 길이로 쓰고, white-space: nowrap으로 줄바꿈을 막지 않아 텍스트 확대·좁은 화면에서는 줄바꿈되게 한다. |

## KRDS 키트와의 관계
- 클래스 대응: `.badge` ↔ `krds-badge`, `.badge--danger` ↔ `bg-light-danger`, `.badge--number` ↔ `number`
- KRDS 키트는 bg-primary·bg-light-primary·outline-primary 변형과 숫자형 배지의 bg-primary 예시를 제공한다 — 이 규격은 주조색 변형을 두지 않고 숫자형 배지를 point 색으로 쓴다(COLOR-017, CF-047).
- KRDS 키트의 disabled 변형은 글자색과 배경의 대비가 4.5:1 미만이다 — 이 규격은 disabled 변형을 두지 않는다(COLOR-002).
- KRDS 가이드 초안은 배지 텍스트가 줄바꿈되지 않게 하라고 한다 — 이 규격은 문구를 짧게 쓰되 nowrap 을 쓰지 않는다(TYPO-014, CF-045).
