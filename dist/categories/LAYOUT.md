# LAYOUT — 레이아웃

ux-baseline 확정 룰. 자동 생성 파일이다.

| ID | 강도 | 룰 |
|---|---|---|
| LAYOUT-001 | MUST | 키보드 초점을 받은 컴포넌트가 작성자가 만든 콘텐츠(고정 헤더·고정 푸터·쿠키 배너·비모달 대화상자 등)에 완전히 가려지지 않게 한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-003 | MUST | 이웃한 콘텐츠 블록은 테두리, 구분선, 서로 다른 무늬, 배경색 명도 차이, 줄 간격·글자 간격 조절 중 하나 이상으로 시각적으로 구분한다. |
| LAYOUT-004 | SHOULD | 화면 좌우 가장자리와 콘텐츠 사이 여백(스크린 마진)을 뷰포트 너비 768 CSS px 이상에서 24px 이상, 768px 미만에서 16px 이상으로 둔다. |
| LAYOUT-007 | SHOULD | 본문 콘텐츠 영역에 최대 너비(max-width 또는 max-inline-size)를 지정해 뷰포트가 넓어져도 콘텐츠 영역이 그 값보다 넓어지지 않게 한다(KRDS 표준형: 사이드 메뉴 포함 1200px). |
| LAYOUT-009 | SHOULD | 공식 배너는 모든 화면의 최상단에 두고, DOM에서는 건너뛰기 링크만 공식 배너 앞에 둔다. |
| LAYOUT-010 | SHOULD | 운영기관 식별자의 로고 영역에는 서비스 로고가 아니라 서비스를 운영하는 기관의 로고를 넣고, 서비스 로고는 푸터에 둔다. |
| LAYOUT-011 | SHOULD | 정부 로고(서비스 아이덴티티)를 헤더의 왼쪽 위에 둔다. |
| LAYOUT-012 | SHOULD | 헤더에는 건너뛰기 링크·공식 배너·서비스 아이덴티티·유틸리티 링크·검색·메인 메뉴 같은 필수 항목만 두고 꾸밈 요소와 부가 정보를 넣지 않는다. |
| LAYOUT-013 | SHOULD | 헤더를 화면 상단에 고정할 때는 공식 배너를 뺀 헤더 전체를 고정한다. |
| LAYOUT-014 | SHOULD | 푸터를 모든 페이지의 본문 아래 마지막 요소로 두고, 본문 높이가 뷰포트보다 짧으면 푸터 아래끝을 뷰포트 아래끝에 맞춘다. |
| LAYOUT-015 | SHOULD | 푸터 정보는 서비스 로고, 연락처, 유틸리티 링크, 정책 링크, 저작권 정보 순서로 배치하고, 사유를 기록하지 않고는 이 순서를 바꾸지 않는다. |
| LAYOUT-016 | SHOULD | 메인 메뉴 드롭다운 영역의 하위 링크 목록은 본문 그리드의 가장 왼쪽 칼럼부터 왼쪽 정렬로 배치한다. |
| LAYOUT-017 | SHOULD | 브레드크럼은 본문 제목(h1) 위 왼쪽에 두고, 현재 화면 경로를 생략한 브레드크럼이면 브레드크럼과 본문 제목 사이에 다른 요소를 두지 않는다. |
| LAYOUT-018 | SHOULD | 콘텐츠 내 탐색(목차)의 너비를 페이지마다 같은 고정값으로 정하고, 기본 글자 크기에서 개요 목록 항목 텍스트가 줄바꿈되지 않는 값으로 하되, 사용자가 텍스트를 확대했을 때는 항목 텍스트가 잘리지 않고 줄바꿈되게 한다. |
| LAYOUT-019 | SHOULD | 페이지네이션은 목록 아래에 가운데 정렬로 두고, 한 화면에 하나만 쓴다. |
| LAYOUT-020 | SHOULD | 그룹으로 묶인 버튼은 모두 같은 크기로 만들고, 특정 버튼의 강조는 크기가 아니라 스타일(채움·윤곽선·텍스트)로 구분한다. |
| LAYOUT-021 | SHOULD | 버튼 그룹을 세로로 배열할 때는 최상위 강조 버튼을 맨 위(첫 번째)에 둔다. |
| LAYOUT-023 | SHOULD | 플로팅 버튼은 화면 오른쪽 아래에 두고, 하단 탭바가 있으면 탭바와 겹치지 않게 탭바 위 오른쪽 아래에 둔다. |
| LAYOUT-024 | SHOULD | 플로팅 동작이 2개 이상 필요하면 확장형 플로팅 버튼 하나로 묶고, 확장 항목은 3개 이하, 터치 깊이는 2수준 이하로 한다. |
| LAYOUT-025 | SHOULD | 구조화 목록 항목에는 상세 페이지 콘텐츠 중 핵심 정보만 골라 논리적 순서와 위계가 드러나게 구성한다. |
| LAYOUT-026 | SHOULD | 구조화 목록에서는 목록 정보의 성격과 사용자 방문 목적에 비춰 가장 중요한 행동 하나를 최상위 강조 버튼(CTA)으로 표현한다. |
| LAYOUT-027 | SHOULD | 사용자가 자주 쓰는 기능의 행동 버튼을 구조화 목록 항목에 두어 상세 페이지로 가거나 항목을 펼치지 않고도 목적을 달성하게 한다. |
| LAYOUT-028 | SHOULD | 구조화 목록의 모든 항목은 같은 정보 항목을 같은 순서로 보여 주고, 값이 없는 항목도 자리를 비우지 않는다. |
| LAYOUT-029 | SHOULD | 긴급 공지는 메인 메뉴 아래 본문 콘텐츠의 첫 요소로 두고, 공지 컨테이너가 화면 전체 너비를 차지하게 한다. |
| LAYOUT-030 | SHOULD | 달력 셀에서 이벤트 텍스트가 생략되면 같은 이벤트를 손실 없이 볼 수 있는 표나 목록을 따로 제공하거나, 달력 표시 단위를 주·일로 바꿔 이벤트 표시 영역을 넓힌다. |
| LAYOUT-032 | SHOULD | 디스클로저는 부가 정보를 제공하려는 대상 정보·컨트롤·섹션 바로 아래에 둔다. |
| LAYOUT-034 | SHOULD | 모달의 확정·취소 액션 버튼은 항상 모달 푸터에 두고, 모달 본문에는 입력폼 관련 컨트롤만 둔다. |
| LAYOUT-035 | SHOULD | 모달 본문에 세로 스크롤이 생기면 스크롤바와 본문 하단 흐림 효과로 스크롤 단서를 주고, 액션 버튼이 있는 푸터는 스크롤 위치와 관계없이 항상 보이게 한다. |
| LAYOUT-037 | SHOULD | 아코디언 확장 상태 아이콘은 서비스의 모든 아코디언에서 같은 위치에 두고, 관련 섹션 목록형은 헤더 끝, 트리 구조형은 헤더 시작에 둔다. |
| LAYOUT-038 | SHOULD | 아코디언 패널에 자체 세로·가로 스크롤을 만들지 않고, 긴 패널 내용은 페이지 스크롤로 탐색하게 한다. |
| LAYOUT-039 | SHOULD | 캐러셀 슬라이드는 5개 이하로 두고, 항목이 더 많으면 캐러셀 대신 목록을 쓴다. |
| LAYOUT-040 | SHOULD | 캐러셀의 도형형 항목 식별자는 컨테이너 가운데에, 분수형 식별자는 오른쪽 아래에 두고, 탐색 버튼은 레이아웃 유형에 따라 컨테이너 가운데 좌우 또는 오른쪽 아래에 둔다. |
| LAYOUT-041 | SHOULD | 탭과 탭 패널을 인접하게 배치해 패널이 선택된 탭의 내용임을 시각적으로 드러낸다. |
| LAYOUT-042 | SHOULD | 탭을 중첩하지 않고, 중첩이 불가피하면 수준별 탭 스타일을 서로 다르게 한다. |
| LAYOUT-043 | SHOULD | 아코디언·모달처럼 공간이 제한된 영역에서 표 데이터가 잘리거나 가로 스크롤이 생기면 표를 쓰지 않고 각 열을 세로로 떨어뜨려 배치한다. |
| LAYOUT-045 | SHOULD | 표의 행·셀 자체를 클릭·선택하는 대화형 요소로 만들지 않고(열 헤더 정렬 컨트롤 제외), 데이터에 복잡한 상호작용이 필요하면 표 대신 구조화 목록을 쓴다. |
| LAYOUT-046 | SHOULD | 중첩 텍스트 목록은 수준마다 들여쓰기로 계층을 구분하고 3수준 이내로 구성한다. |
| LAYOUT-047 | SHOULD | 라디오 버튼의 레이블은 원형 양식(컨트롤)의 오른쪽에 둔다. |
| LAYOUT-048 | SHOULD | 태그는 처음에 꼭 필요한 것만 두고, 사용자 의견을 수렴해 필요가 확인된 태그만 추가한다. |
| LAYOUT-049 | SHOULD | 태그 그룹 전체에 동작하는 일괄 액션 버튼(전체 삭제 등)은 태그 그룹 바로 옆(태그 목록의 앞이나 뒤)에 두고, 태그 그룹과 버튼 사이에 다른 콘텐츠를 두지 않는다. |
| LAYOUT-051 | SHOULD | 한 화면의 토글 스위치 항목은 모두 같은 배열(레이블·스위치 위치)을 쓰고, 한 항목에 상태 레이블이나 상태 아이콘을 넣으면 모든 항목에 넣는다. |
| LAYOUT-052 | SHOULD | 단계 표시기의 단계는 왼쪽에서 오른쪽, 또는 위에서 아래로 한 방향으로 나열한다. |
| LAYOUT-053 | SHOULD | 단계 사이 흐름 표시(연결선·화살표·꺾쇠 중 하나)를 사이트 전체에서 한 방식으로 통일한다. |
| LAYOUT-054 | SHOULD | 텍스트 입력 필드의 기본 너비는 그리드·화면 크기에 따라 유동적으로 두고 입력 필드가 속한 섹션 너비 전체를 차지하게 한다. |
| LAYOUT-055 | SHOULD | 업로드한 파일 이름은 한 줄로 표시하고 파일 항목 컨테이너를 넘치면 말줄임표로 줄이되, 줄인 경우 전체 이름을 키보드 초점과 마우스 호버에서 보이는 툴팁이나 펼침으로 볼 수 있게 한다. |
| LAYOUT-056 | SHOULD | 도움 패널·맥락적 도움말을 여는 아이콘 버튼은 도움 대상 컴포넌트나 레이블 바로 옆에 둔다. |
| LAYOUT-057 | SHOULD | 툴팁·맥락적 도움말·코치마크 팝오버는 모든 화면 너비에서 뷰포트 안에 전부 보이게 하고, 활성화 버튼과 안내 대상 본문 요소를 가리지 않는 방향으로 표시한다. |
| LAYOUT-058 | SHOULD | 한 과업의 코치마크 팝오버 너비는 가장 긴 지시 사항 텍스트를 기준으로 정해 모든 단계에서 같게 한다. |
| LAYOUT-059 | SHOULD | 페이지 단위 음성지원 버튼은 페이지 상단 또는 주요 제목(h1) 옆에, 영역 단위 음성지원 버튼은 해당 카드·소제목·약관 등 정보 단위의 제목 옆에 둔다. |
| LAYOUT-005 | MAY | 한 화면(같은 뷰포트 너비) 안에서는 레이아웃 그리드의 칼럼 수를 하나로 통일한다. |
| LAYOUT-006 | MAY | 레이아웃 그리드의 거터(칼럼 사이 간격)를 칼럼 너비의 절반 이하로 둔다. |
| LAYOUT-008 | MAY | 상세 정보 페이지는 본문을 탭으로 나누지 않고 한 화면에 이어서 제공하며, 주요 단락 이동은 콘텐츠 내 탐색으로 한다. |
| LAYOUT-022 | MAY | 플로팅 버튼은 사용자가 반복하는 주요 행동이 하나일 때만 쓰고, 주요 행동이 여럿이거나 지도·캘린더·이미지 편집처럼 제스처 조작이 많은 화면에서는 쓰지 않는다. |
| LAYOUT-031 | MAY | 정기적으로 갱신되지 않는 정보나 한 달 이벤트가 2개 이하인 정보에는 달력 컴포넌트를 쓰지 않는다. |
| LAYOUT-033 | MAY | 한 섹션에는 디스클로저를 1개만 둔다. |
| LAYOUT-036 | MAY | 상위나 하위 요소에 이미 아코디언이나 탭이 있으면 아코디언을 쓰지 않는다. |
| LAYOUT-044 | MAY | 표에 세로 열 구분선을 쓰지 않는다. |
| LAYOUT-050 | MAY | 넓은 컨테이너 안의 토글 스위치는 레이블을 스위치 바로 옆에 붙여 두고, 레이블과 스위치를 컨테이너 양 끝으로 떼어 놓지 않는다. |

## LAYOUT-001 초점이 가려지지 않게

- 강도: **MUST**
- 룰: 키보드 초점을 받은 컴포넌트가 작성자가 만든 콘텐츠(고정 헤더·고정 푸터·쿠키 배너·비모달 대화상자 등)에 완전히 가려지지 않게 한다.
- 측정 기준: Tab·Shift+Tab으로 초점을 옮길 때마다 초점 받은 요소의 경계 상자 중 1 CSS px 이상이 position: fixed·sticky 요소나 다른 오버레이에 덮이지 않고 보인다(일부 가림은 통과, 전부 가림은 실패). 사용자가 위치를 옮길 수 있는 콘텐츠는 초기 위치만 본다. 사용자가 연 콘텐츠가 가리더라도 초점을 옮기지 않고(Esc 등) 드러낼 수 있으면 통과.
- 판정 방법: 뷰포트 320·768·1280 CSS px에서 페이지 처음부터 끝까지 Tab으로 이동하며 각 초점 요소의 가시 여부를 확인한다. 고정 헤더·푸터·배너가 열린 상태와 닫힌 상태를 모두 본다.
- 자동 검사: none
- 적용 대상: :focus, :focus-visible, 고정 헤더, 고정 푸터, 플로팅 버튼, 쿠키 배너
- 예외: 사용자가 위치를 옮길 수 있는 콘텐츠는 초기 위치만 평가한다(SC 2.4.11 Note 1).
- 예외: 사용자가 연 콘텐츠가 초점 요소를 가려도 초점을 옮기지 않고 드러낼 수 있으면 가려진 것으로 보지 않는다(SC 2.4.11 Note 2).
- 근거: 초점 위치를 볼 수 없으면 키보드 사용자는 자신이 어디에 있는지 알 수 없다. 고정 헤더·쿠키 배너가 흔한 원인이다.
- 출처: WCAG22 SC 2.4.11 Focus Not Obscured (Minimum) (Level AA); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html; KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 242쪽 — 헤더만. 스낵바·토스트·플로팅 버튼 컴포넌트는 PDF에 없음)

좋은 예 — 고정 헤더 높이만큼 scroll-padding을 둬 초점 요소가 헤더 밑에 완전히 숨지 않는다.
```css
:root { --layout-header-height: var(--size-height-9); } /* 프로젝트 헤더 높이 — 토큰 값으로 정한다 */
.site-header { position: sticky; top: 0; block-size: var(--layout-header-height); }
html { scroll-padding-block-start: var(--layout-header-height); } /* 초점 이동 스크롤 시 헤더 높이만큼 비켜 둠 */
```
나쁜 예 — 고정 헤더가 초점 요소를 전부 덮어 키보드 사용자가 초점 위치를 볼 수 없다.
```css
:root { --layout-header-height: var(--size-height-9); } /* 프로젝트 헤더 높이 — 토큰 값으로 정한다 */
.site-header { position: fixed; top: 0; block-size: var(--layout-header-height); }
/* scroll-padding 없음 — Shift+Tab으로 위로 갈 때 초점 받은 링크가 헤더 밑에 완전히 숨는다 */
```

## LAYOUT-002 포인터 대상 최소 크기

- 강도: **MUST**
- 룰: 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다.
- 측정 기준: 모든 포인터 대상(a[href], button, input, select, textarea, [role=button], [onclick] 등)의 경계 상자 너비·높이가 각각 24 CSS px 이상이다. 미만이면 간격 예외: 해당 대상 중심의 지름 24px 원이 인접 대상의 경계 상자나 다른 미달 대상의 원과 교차하지 않는다. 예외(문장 안 인라인 링크, 같은 기능의 24px 이상 대체 컨트롤, 작성자가 바꾸지 않은 UA 기본 컨트롤, 필수 표현)에 해당하면 통과.
- 판정 방법: axe-core target-size 실행 후, 검사기가 판단하지 못하는 예외(동등 컨트롤·필수 표현)는 수동으로 확인한다.
- 자동 검사: partial (axe-core/target-size)
- 적용 대상: a[href], button, input, select, textarea, [role=button], [role=link], [tabindex]
- 예외: 간격(Spacing): 24px 미만 대상이 지름 24px 원 기준으로 다른 대상과 겹치지 않는 경우.
- 예외: 동등(Equivalent): 같은 페이지에 같은 기능을 하는 기준 충족 컨트롤이 있는 경우.
- 예외: 인라인(Inline): 문장 안에 있거나 크기가 주변 텍스트의 행간에 묶인 대상.
- 예외: 사용자 에이전트 제어: 크기를 UA가 정하고 작성자가 바꾸지 않은 경우.
- 예외: 필수(Essential): 특정 표현이 정보 전달에 필수이거나 법적으로 요구되는 경우.
- 예외: 슬라이더·색상 선택기처럼 대상 안 위치로 값을 고르는 대상은 대상 하나로 본다(SC 2.5.8 Note).
- 결정 CF-019: 24×24 CSS px 이상(WCAG 2.5.8)을 MUST로 유지한다. 24×24 CSS px 이상인 대상은 대각선이 약 9.0mm(1 CSS px = 0.2646mm)라 KWCAG 6.1.3 권고(대각선 6.0mm 이상)도 충족한다. 2.5.8 예외(간격·인라인·동등·UA 제어·필수)로 24 CSS px보다 작게 둔 대상은 WCAG 2.5.8로만 판정한다. KRDS의 마우스 17×17px은 채택하지 않는다. 터치 44×44px(WCAG 2.5.5 AAA)는 별도 SHOULD 후보로 다룬다.
- 근거: 작은 대상은 손떨림·운동 장애가 있는 사용자와 터치 사용자에게 오조작을 일으킨다.
- 출처: WCAG22 SC 2.5.8 Target Size (Minimum) (Level AA); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html; KWCAG22 검사항목 6.1.3; KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 435·508·520·608·633쪽); CSS_MQ4 4.3 pointer, 4.5 any-pointer and any-hover

좋은 예 — 아이콘 버튼의 포인터 대상이 24×24 CSS px 이상이다.
```css
.icon-btn { min-inline-size: 24px; min-block-size: 24px; } /* WCAG 2.5.8 최소 24×24 CSS px */
```
나쁜 예 — 24px 미만 대상이 붙어 있어 크기·간격 조건을 모두 어긴다.
```html
<style>.icon-btn { inline-size: 16px; block-size: 16px; }</style>
<button type="button" class="icon-btn" aria-label="수정">✎</button><button type="button" class="icon-btn" aria-label="삭제">×</button>
<!-- 16px 대상 두 개가 붙어 지름 24px 원이 서로 겹침 — 간격 예외도 불충족 -->
```

## LAYOUT-003 콘텐츠 간 구분

- 강도: **MUST**
- 룰: 이웃한 콘텐츠 블록은 테두리, 구분선, 서로 다른 무늬, 배경색 명도 차이, 줄 간격·글자 간격 조절 중 하나 이상으로 시각적으로 구분한다.
- 측정 기준: 페이지의 이웃한 콘텐츠 블록 쌍(구역 section, 카드, 목록 항목, 메뉴 그룹, 표 행 등)마다 다음 중 하나 이상이 있다: border 1px 이상, 구분선 요소(hr·border 의사 요소), 배경 이미지·무늬 차이, 배경색 차이, 블록 사이 margin·gap 0 초과.
- 판정 방법: 화면을 위에서 아래로 훑으며 경계가 붙어 하나로 보이는 이웃 블록 쌍이 있는지 수동 확인한다. 의심 쌍은 개발자 도구에서 border·background·margin 계산값을 확인한다.
- 자동 검사: none
- 적용 대상: section, article, li, .card, 카드 목록, 푸터 그룹, 태그
- 근거: 경계가 없는 콘텐츠는 저시력·인지 장애 사용자가 어디서 끝나고 시작하는지 알기 어렵고, 터치 기기에서 이웃 항목 오조작을 부른다(KWCAG 5.4.4 기대효과).
- 출처: KWCAG22 검사항목 5.4.4; KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 249·563쪽)

좋은 예 — 카드 사이 간격과 테두리로 이웃 블록이 구분된다.
```css
.card-list { display: grid; gap: var(--space-gap-7); }
.card { border: 1px solid var(--color-border-gray); }
```
나쁜 예 — 간격·테두리·배경 차이가 모두 없어 이웃 카드의 경계를 알 수 없다.
```css
.card-list { display: grid; gap: 0; }
.card { border: 0; background: var(--color-surface-white); } /* 흰 페이지 위 흰 카드가 붙어 하나로 보임 */
```

## LAYOUT-004 화면 좌우 최소 여백

- 강도: **SHOULD**
- 룰: 화면 좌우 가장자리와 콘텐츠 사이 여백(스크린 마진)을 뷰포트 너비 768 CSS px 이상에서 24px 이상, 768px 미만에서 16px 이상으로 둔다.
- 측정 기준: 뷰포트 너비 360·767px에서 텍스트·이미지·컨트롤 등 콘텐츠 요소의 경계 상자가 뷰포트 좌우 가장자리에서 16px 이상, 768·1024·1280px에서 24px 이상 떨어져 있다. 배경색·배경 이미지만 있는 전체 너비 컨테이너의 배경은 대상이 아니다.
- 판정 방법: 각 뷰포트 너비에서 개발자 도구로 콘텐츠 컨테이너의 padding-inline 또는 margin-inline 계산값을 확인한다.
- 자동 검사: none
- 적용 대상: body, main, .container, 레이아웃 컨테이너
- 근거: 가장자리에 붙은 요소는 모바일에서 터치하기 어렵고 오조작을 부른다(KRDS 사용 가이드).
- 출처: KRDS 디자인 스타일 > 레이아웃 > 그리드 요소 / 사용 가이드 (가이드라인 PDF 2025.08 141·153쪽)

좋은 예 — 뷰포트 너비별 최소 스크린 마진(16px·24px)을 토큰으로 둔다.
```css
.container { padding-inline: var(--space-padding-6); } /* 16px: 768px 미만 */
@media (min-width: 768px) { .container { padding-inline: var(--space-padding-8); } } /* 24px */
```
나쁜 예 — 스크린 마진이 0이라 콘텐츠가 뷰포트 가장자리에 닿는다.
```css
.container { padding-inline: 0; } /* 360px 화면에서 본문 텍스트·버튼이 화면 가장자리에 붙음 */
```

## LAYOUT-007 본문 최대 폭

- 강도: **SHOULD**
- 룰: 본문 콘텐츠 영역에 최대 너비(max-width 또는 max-inline-size)를 지정해 뷰포트가 넓어져도 콘텐츠 영역이 그 값보다 넓어지지 않게 한다(KRDS 표준형: 사이드 메뉴 포함 1200px).
- 측정 기준: 본문 콘텐츠 컨테이너의 max-width(또는 max-inline-size) 계산값이 none이 아니며, 뷰포트 너비 1920 CSS px에서 컨테이너 너비가 그 값 이하다. KRDS 표준형을 따르면 값은 1200px(사이드 메뉴 포함).
- 판정 방법: 뷰포트 1920px에서 개발자 도구로 본문 컨테이너의 max-width와 실제 너비를 확인한다.
- 자동 검사: none
- 적용 대상: main, .container, 본문 콘텐츠 영역
- 결정 CF-033: 본문 한 줄 상한을 40자(40ic)로 하는 TYPO-031(SHOULD)을 신설한다.
- 근거: 넓은 화면에서 콘텐츠 영역이 무한히 넓어지면 한 줄이 길어져 읽기가 어렵고 시선 이동이 커진다.
- 출처: KRDS 디자인 스타일 > 레이아웃 > 콘텐츠 영역 (가이드라인 PDF 2025.08 147·148·150쪽); WCAG22_UNDERSTANDING SC 1.4.8 Visual Presentation; C20, G204; SHIN_PARK_2003 결과 — 줄 길이; MDN_BCD css.types.length.ic

좋은 예 — 본문 컨테이너에 최대 너비가 있어 넓은 화면에서도 1200px를 넘지 않는다.
```css
.container { max-inline-size: var(--layout-content-max); margin-inline: auto; padding-inline: var(--space-padding-8); }
/* --layout-content-max: 1200px (KRDS 표준형, 사이드 메뉴 포함) */
```
나쁜 예 — max-width가 none이라 뷰포트와 함께 본문 영역이 무한히 넓어진다.
```css
.container { inline-size: 100%; padding-inline: var(--space-padding-8); } /* 최대 너비 없음 — 2560px 모니터에서 본문이 화면 끝까지 늘어남 */
```

## LAYOUT-009 공식 배너

- 강도: **SHOULD**
- 룰: 공식 배너는 모든 화면의 최상단에 두고, DOM에서는 건너뛰기 링크만 공식 배너 앞에 둔다.
- 측정 기준: 모든 페이지에서 공식 배너 요소가 화면 맨 위(top 0)에 렌더링되고, DOM 순서상 body의 첫 번째 시각 요소다. 공식 배너 앞에는 건너뛰기 링크만 있다.
- 판정 방법: 대표 페이지 템플릿 전부에서 DOM 순서와 화면 위치를 확인한다.
- 자동 검사: none
- 적용 대상: 공식 배너, 공공 서비스 전 페이지
- 근거: 공식 배너는 정부 서비스임을 확인하는 기준이므로 모든 서비스에서 같은 위치에 있어야 사용자가 신뢰를 판단할 수 있다.
- 출처: KRDS 컴포넌트 > 공식 배너 > 사용성 가이드라인 (가이드라인 PDF 2025.08 221·222·226쪽)

좋은 예 — 건너뛰기 링크 다음, 화면 최상단에 공식 배너가 있다.
```html
<body>
  <a class="skip-link" href="#main">본문 바로가기</a>
  <div class="official-banner">이 누리집은 대한민국 공식 전자정부 누리집입니다.</div>
  <header>…</header>
```
나쁜 예 — 공식 배너가 헤더 아래에 있어 최상단이 아니다.
```html
<body>
  <a class="skip-link" href="#main">본문 바로가기</a>
  <header>…</header>
  <div class="official-banner">이 누리집은 대한민국 공식 전자정부 누리집입니다.</div>
```

## LAYOUT-010 운영기관 식별자

- 강도: **SHOULD**
- 룰: 운영기관 식별자의 로고 영역에는 서비스 로고가 아니라 서비스를 운영하는 기관의 로고를 넣고, 서비스 로고는 푸터에 둔다.
- 측정 기준: 운영기관 식별자 컴포넌트의 로고 이미지가 운영 기관 로고(대체 텍스트가 기관명)이고, 서비스 로고는 footer 안에 있다.
- 판정 방법: 운영기관 식별자와 푸터의 로고 이미지·대체 텍스트를 수동 확인한다.
- 자동 검사: none
- 적용 대상: 운영기관 식별자, footer
- 근거: 식별자는 서비스 운영 책임 기관을 알리는 장치이므로 서비스 로고를 넣으면 운영 주체를 알 수 없다.
- 출처: KRDS 컴포넌트 > 운영기관 식별자 > 사용성 가이드라인 (가이드라인 PDF 2025.08 230쪽)

좋은 예 — 운영기관 식별자에는 운영 기관 로고를, 서비스 로고는 푸터에 둔다.
```html
<footer>
  <img src="/img/service-logo.svg" alt="민원24시">
  …
</footer>
<div class="agency-identifier"><img src="/img/agency-logo.svg" alt="행정안전부"> 이 누리집은 행정안전부에서 운영합니다.</div>
```
나쁜 예 — 운영기관 식별자 로고 영역에 기관 로고 대신 서비스 로고를 넣었다.
```html
<div class="agency-identifier"><img src="/img/service-logo.svg" alt="민원24시"> 이 누리집은 행정안전부에서 운영합니다.</div>
```

## LAYOUT-011 헤더

- 강도: **SHOULD**
- 룰: 정부 로고(서비스 아이덴티티)를 헤더의 왼쪽 위에 둔다.
- 측정 기준: 헤더 안에서 공식 배너·건너뛰기 링크를 뺀 요소 중 정부 로고의 경계 상자가 가장 왼쪽(left 최소)이며 첫 행에 있다. DOM 순서도 건너뛰기 링크 → (공식 배너) → 서비스 아이덴티티.
- 판정 방법: 360·1280px에서 헤더 레이아웃과 DOM 순서를 확인한다.
- 자동 검사: none
- 적용 대상: header, 서비스 아이덴티티
- 근거: 정부 로고 위치를 모든 서비스에서 같게 해 정부와의 연결과 일관된 경험을 준다.
- 출처: KRDS 컴포넌트 > 헤더 > 사용성 가이드라인 (가이드라인 PDF 2025.08 235·236쪽)

좋은 예 — 정부 로고가 헤더 첫 행 가장 왼쪽에 있고 DOM에서도 먼저 온다.
```html
<header>
  <div class="header-top">
    <a href="/" class="identity"><img src="/img/gov-symbol.svg" alt="대한민국정부 민원24시 홈"></a>
    <ul class="utility-links"><li><a href="/login">로그인</a></li></ul>
  </div>
  <nav class="main-menu" aria-label="메인 메뉴">…</nav>
</header>
```
나쁜 예 — 정부 로고가 유틸리티 링크 뒤, 헤더 오른쪽에 놓인다.
```html
<header>
  <div class="header-top">
    <ul class="utility-links"><li><a href="/login">로그인</a></li></ul>
    <a href="/" class="identity"><img src="/img/gov-symbol.svg" alt="대한민국정부 민원24시 홈"></a>
  </div>
</header>
<!-- .header-top { display: flex; justify-content: space-between; } — 로고가 오른쪽 위로 감 -->
```

## LAYOUT-012 헤더

- 강도: **SHOULD** (판정에 사람의 판단 필요: guide)
- 룰: 헤더에는 건너뛰기 링크·공식 배너·서비스 아이덴티티·유틸리티 링크·검색·메인 메뉴 같은 필수 항목만 두고 꾸밈 요소와 부가 정보를 넣지 않는다.
- 측정 기준: 점검 질문: 헤더의 각 요소가 KRDS 헤더 구조(건너뛰기 링크, 공식 배너, 서비스 아이덴티티, 유틸리티 링크 그룹, 드롭다운 메뉴, 아이콘 링크·버튼과 레이블, 메인 메뉴)에 속하는가? 속하지 않는 요소는 모든 화면에 반복될 필요가 있는가?
- 자동 검사: none
- 적용 대상: header
- 근거: 헤더는 모든 화면에 반복되므로 불필요한 꾸밈·정보가 있으면 모든 화면에서 이용이 어려워진다.
- 출처: KRDS 컴포넌트 > 헤더 > 사용성 가이드라인 (가이드라인 PDF 2025.08 235·236쪽)

좋은 예 — KRDS 헤더 구조에 속하는 필수 항목만 모든 화면에 반복한다.
```
헤더: 건너뛰기 링크 / 공식 배너 / 정부 로고 / 유틸리티 링크(로그인·회원가입) / 검색 / 메인 메뉴만 둔다.
```
나쁜 예 — 모든 화면에 반복할 필요가 없는 꾸밈·부가 정보가 헤더에 들어갔다.
```
헤더에 행사 홍보 슬라이드와 오늘의 날씨 위젯을 넣어 모든 페이지에 반복 노출한다.
```

## LAYOUT-013 헤더

- 강도: **SHOULD**
- 룰: 헤더를 화면 상단에 고정할 때는 공식 배너를 뺀 헤더 전체를 고정한다.
- 측정 기준: 헤더에 position: sticky 또는 fixed를 쓸 때, 스크롤 후 공식 배너는 화면 밖으로 사라지고 서비스 아이덴티티·유틸리티 링크·검색·메인 메뉴는 모두 화면 상단에 남는다(헤더 일부만 고정하지 않는다).
- 판정 방법: 긴 페이지를 아래로 스크롤해 고정된 영역에 포함된 요소를 확인한다.
- 자동 검사: none
- 적용 대상: header, 고정 헤더
- 근거: 헤더 일부만 고정하면 탐색 수단이 흩어지고, 공식 배너까지 고정하면 본문 공간을 불필요하게 차지한다.
- 출처: KRDS 컴포넌트 > 헤더 > 사용성 가이드라인 (가이드라인 PDF 2025.08 242쪽)

좋은 예 — 공식 배너를 뺀 헤더 전체를 고정한다.
```css
.official-banner { position: static; } /* 스크롤하면 사라짐 */
.site-header { position: sticky; top: 0; } /* 배너 아래 헤더 전체(로고·유틸리티·검색·메인 메뉴) 고정 */
```
나쁜 예 — 헤더 일부(메인 메뉴)만 고정해 로고·유틸리티 링크·검색이 사라진다.
```css
.site-header .main-menu { position: sticky; top: 0; } /* 메인 메뉴만 고정 */
```

## LAYOUT-014 푸터

- 강도: **SHOULD**
- 룰: 푸터를 모든 페이지의 본문 아래 마지막 요소로 두고, 본문 높이가 뷰포트보다 짧으면 푸터 아래끝을 뷰포트 아래끝에 맞춘다.
- 측정 기준: (1) footer(contentinfo)가 body의 마지막 시각 요소다. (2) 본문이 짧은 페이지에서 footer.getBoundingClientRect().bottom이 window.innerHeight와 같다(푸터 아래 빈 공간 0px).
- 판정 방법: 본문이 짧은 페이지(오류·빈 결과 페이지)를 768·1280px 너비, 높이 1000px 이상 창에서 열어 푸터 아래 빈 공간이 없는지 확인한다.
- 자동 검사: none
- 적용 대상: footer, body
- 근거: 푸터가 일관된 위치에 있어야 길을 잃은 사용자가 보조 탐색 수단을 찾을 수 있다.
- 출처: KRDS 컴포넌트 > 푸터 > 사용성 가이드라인 (가이드라인 PDF 2025.08 247·248쪽)

좋은 예 — 푸터가 마지막 요소이고 짧은 페이지에서도 화면 아래끝에 맞는다.
```css
body { min-block-size: 100dvh; display: flex; flex-direction: column; margin: 0; }
main { flex: 1 0 auto; } /* 본문이 짧아도 푸터 아래끝이 뷰포트 아래끝에 붙음 */
```
나쁜 예 — 짧은 페이지에서 푸터가 화면 중간에 떠 아래가 비어 보인다.
```css
body { margin: 0; } /* 최소 높이 없음 — 본문이 짧은 페이지에서 푸터 아래에 빈 공간이 생김 */
```

## LAYOUT-015 푸터

- 강도: **SHOULD**
- 룰: 푸터 정보는 서비스 로고, 연락처, 유틸리티 링크, 정책 링크, 저작권 정보 순서로 배치하고, 사유를 기록하지 않고는 이 순서를 바꾸지 않는다.
- 측정 기준: footer 안 DOM 순서와 시각 순서가 서비스 로고 → 연락처 → 유틸리티 링크 → 정책 링크 → 저작권 정보다.
- 판정 방법: 푸터 마크업 순서와 화면 배치를 확인한다.
- 자동 검사: none
- 적용 대상: footer
- 예외: 원문: 명확한 이유가 있으면 기본 순서를 바꿀 수 있다 — 그 이유를 기록한다.
- 근거: 모든 공공 서비스에서 푸터 정보 순서가 같아야 브랜드가 확립되고 사용자가 정보를 같은 자리에서 찾는다.
- 출처: KRDS 컴포넌트 > 푸터 > 사용성 가이드라인 (가이드라인 PDF 2025.08 249쪽)

좋은 예 — 서비스 로고 → 연락처 → 유틸리티 링크 → 정책 링크 → 저작권 순서다.
```html
<footer>
  <img src="/img/service-logo.svg" alt="민원24시">
  <address>(30112) 세종특별자치시 도움6로 42 · 대표전화 110</address>
  <ul class="utility-links"><li><a href="/sitemap">사이트맵</a></li></ul>
  <ul class="policy-links"><li><a href="/privacy">개인정보처리방침</a></li></ul>
  <p><small>© 행정안전부</small></p>
</footer>
```
나쁜 예 — 기록된 사유 없이 정책 링크를 서비스 로고보다 앞에 두었다.
```html
<footer>
  <ul class="policy-links"><li><a href="/privacy">개인정보처리방침</a></li></ul>
  <img src="/img/service-logo.svg" alt="민원24시">
  <address>(30112) 세종특별자치시 도움6로 42 · 대표전화 110</address>
  <ul class="utility-links"><li><a href="/sitemap">사이트맵</a></li></ul>
  <p><small>© 행정안전부</small></p>
</footer>
```

## LAYOUT-016 메인 메뉴

- 강도: **SHOULD**
- 룰: 메인 메뉴 드롭다운 영역의 하위 링크 목록은 본문 그리드의 가장 왼쪽 칼럼부터 왼쪽 정렬로 배치한다.
- 측정 기준: 모든 1수준 메뉴의 드롭다운에서 첫 하위 링크 목록의 왼쪽 경계 x좌표가 본문 콘텐츠 그리드 첫 칼럼의 왼쪽 경계와 같고(±1px), 링크 레이블이 text-align: start다. 드롭다운을 연 1수준 메뉴의 위치에 따라 목록 시작 위치가 달라지지 않는다.
- 판정 방법: 1024·1280px에서 각 1수준 메뉴를 열어 하위 목록 시작 x좌표를 비교한다.
- 자동 검사: none
- 적용 대상: 메인 메뉴 드롭다운
- 근거: 하위 메뉴 시작 위치가 항상 같아야 사용자가 일관된 위치에서 메뉴를 훑을 수 있다.
- 출처: KRDS 컴포넌트 > 메인 메뉴 > 사용성 가이드라인 (가이드라인 PDF 2025.08 271·272쪽)

좋은 예 — 드롭다운 하위 목록이 본문 그리드 첫 칼럼 왼쪽에서 시작한다.
```css
.main-menu-dropdown { position: absolute; inset-inline: 0; }
.main-menu-dropdown .submenu { max-inline-size: var(--layout-content-max); margin-inline: auto;
  padding-inline: var(--space-padding-8); text-align: start; } /* 어느 메뉴를 열어도 본문 그리드 첫 칼럼에서 시작 */
```
나쁜 예 — 하위 목록 시작 위치가 연 메뉴 위치에 따라 달라진다.
```css
.main-menu > li { position: relative; }
.main-menu-dropdown { position: absolute; inset-inline-start: 0; } /* 연 1수준 메뉴 아래에서 시작해 메뉴마다 목록 위치가 다름 */
```

## LAYOUT-017 브레드크럼

- 강도: **SHOULD**
- 룰: 브레드크럼은 본문 제목(h1) 위 왼쪽에 두고, 현재 화면 경로를 생략한 브레드크럼이면 브레드크럼과 본문 제목 사이에 다른 요소를 두지 않는다.
- 측정 기준: (1) 브레드크럼 nav의 경계 상자가 h1보다 위에 있고 왼쪽 경계가 h1과 같다(±1px). (2) 브레드크럼 마지막 항목이 현재 화면이 아닌 상위 화면이면 DOM에서 브레드크럼 nav 다음 시각 요소가 h1이다.
- 판정 방법: 브레드크럼이 있는 템플릿에서 DOM 순서와 위치를 확인한다.
- 자동 검사: none
- 적용 대상: nav.breadcrumb, h1
- 결정 CF-008: 오류 요약은 본문 제목(h1) 바로 아래, 본문의 첫 요소로 둔다.
- 근거: 브레드크럼 마지막 경로와 본문 제목이 이어져 읽혀야 탐색 경로를 한 번에 파악할 수 있다.
- 출처: KRDS 컴포넌트 > 브레드크럼 > 사용성 가이드라인 (가이드라인 PDF 2025.08 282·284쪽)

좋은 예 — 현재 화면을 생략한 브레드크럼 바로 다음이 본문 제목이다.
```html
<nav aria-label="브레드크럼"><ol><li><a href="/">홈</a></li><li><a href="/minwon">민원</a></li><li><a href="/minwon/resident">주민등록</a></li></ol></nav>
<h1>전입신고</h1>
```
나쁜 예 — 브레드크럼과 본문 제목 사이에 다른 요소가 끼어 있다.
```html
<nav aria-label="브레드크럼"><ol><li><a href="/">홈</a></li><li><a href="/minwon">민원</a></li><li><a href="/minwon/resident">주민등록</a></li></ol></nav>
<div class="banner">이번 달 민원 처리 기간 안내</div>
<h1>전입신고</h1>
```

## LAYOUT-018 콘텐츠 내 탐색

- 강도: **SHOULD**
- 룰: 콘텐츠 내 탐색(목차)의 너비를 페이지마다 같은 고정값으로 정하고, 기본 글자 크기에서 개요 목록 항목 텍스트가 줄바꿈되지 않는 값으로 하되, 사용자가 텍스트를 확대했을 때는 항목 텍스트가 잘리지 않고 줄바꿈되게 한다.
- 측정 기준: (1) 다단 레이아웃(1024px 이상)에서 콘텐츠 내 탐색 컨테이너의 width(또는 inline-size)가 고정 길이 값(토큰)이며 페이지 간 같다. (2) 브라우저 기본 글자 크기·확대 100%에서 각 개요 링크의 높이가 한 줄(line-height 1개분)이다. 텍스트 확대·간격 조정 시에는 줄바꿈을 허용하고 잘리지 않아야 한다. (3) 뷰포트 너비 320 CSS px에서 목차가 본문 위로 쌓이고 document.documentElement.scrollWidth ≤ clientWidth다.
- 판정 방법: 콘텐츠 내 탐색이 있는 페이지 3개 이상에서 컨테이너 너비와 가장 긴 항목의 줄 수를 확인한다.
- 자동 검사: none
- 적용 대상: 콘텐츠 내 탐색, nav.in-page-nav
- 예외: 목차를 본문 위로 쌓는 1단 레이아웃(1024px 미만, components/in-page-navigation)에서는 고정 너비를 쓰지 않는다: inline-size auto, max-inline-size 100%로 두어 가로 스크롤을 만들지 않는다(RESP-003, WCAG 1.4.10). 1024px 는 레이아웃의 다단→1단 전환 브레이크포인트로 바꿀 수 있다.
- 결정 CF-011: 줄바꿈 없는 고정 너비는 기본 글자 크기에서만 요구한다. 텍스트를 확대하면 항목 텍스트가 잘리지 않고 줄바꿈되게 한다.
- 근거: 항목 길이에 따라 너비가 바뀌거나 줄바꿈되면 목차가 버튼·다른 컨트롤과 혼동되고 훑어보기 어렵다.
- 출처: KRDS 컴포넌트 > 콘텐츠 내 탐색 > 사용성 가이드라인 (가이드라인 PDF 2025.08 312쪽)

좋은 예 — 다단 레이아웃에서는 고정 너비 토큰을 쓰고, 확대 시에는 항목 텍스트가 줄바꿈되며, 1024px 미만 1단 레이아웃에서는 본문 위로 쌓여 고정 너비를 쓰지 않는다.
```css
.in-page-nav a { word-break: keep-all; overflow-wrap: anywhere; } /* 텍스트 확대 시 잘리지 않고 줄바꿈 */
@media (min-width: 1024px) { /* 다단 레이아웃: 모든 페이지 같은 고정 너비 토큰 */
  .in-page-nav { inline-size: var(--layout-in-page-navigation-width); }
}
/* 1024px 미만(320 CSS px 포함): 본문 위로 쌓고 고정 너비를 쓰지 않는다 */
```
나쁜 예 — 목차 너비가 고정값이 아니라 페이지마다 달라진다.
```css
.in-page-nav { inline-size: max-content; } /* 항목 길이에 따라 페이지마다 너비가 달라짐 */
```

## LAYOUT-019 페이지네이션

- 강도: **SHOULD**
- 룰: 페이지네이션은 목록 아래에 가운데 정렬로 두고, 한 화면에 하나만 쓴다.
- 측정 기준: (1) 페이지네이션 nav가 대상 목록 바로 아래에 있고 수평 중심이 목록 컨테이너 중심과 같다(±1px). (2) 한 페이지의 페이지네이션 컴포넌트 수 ≤ 1.
- 판정 방법: 목록 페이지마다 페이지네이션 수와 위치를 확인한다.
- 자동 검사: partial (custom)
- 적용 대상: nav.pagination, 페이지네이션
- 근거: 페이지네이션 위치가 서비스 전체에서 같아야 찾기 쉽고, 여러 개면 어떤 목록을 조작하는지 구분하기 어렵다.
- 출처: KRDS 컴포넌트 > 페이지네이션 > 사용성 가이드라인 (가이드라인 PDF 2025.08 325·328쪽)

좋은 예 — 목록 아래 가운데 정렬로 페이지네이션 하나를 둔다.
```css
.pagination { display: flex; justify-content: center; margin-block-start: var(--space-gap-8); }
```
나쁜 예 — 페이지네이션이 목록 중심과 맞지 않고 왼쪽에 붙는다.
```css
.pagination { display: flex; justify-content: flex-start; margin-block-start: var(--space-gap-8); } /* 왼쪽 정렬 */
```

## LAYOUT-020 버튼

- 강도: **SHOULD**
- 룰: 그룹으로 묶인 버튼은 모두 같은 크기로 만들고, 특정 버튼의 강조는 크기가 아니라 스타일(채움·윤곽선·텍스트)로 구분한다.
- 측정 기준: 같은 버튼 그룹([role=group], .btn-group 등 한 컨테이너에 나란한 버튼) 안 버튼들의 렌더링 너비·높이가 서로 같다(±1px).
- 판정 방법: 버튼 그룹이 있는 화면에서 각 버튼의 경계 상자 크기를 비교한다.
- 자동 검사: partial (ux-baseline-check/button-group-equal)
- 적용 대상: .btn-group, [role=group] > button
- 근거: 같은 크기는 선택지가 동질적임을 알려 주고, 크기로 강조하면 위계가 흐트러진다.
- 출처: KRDS 컴포넌트 > 버튼 > 사용성 가이드라인 (가이드라인 PDF 2025.08 512·513쪽)

좋은 예 — 그룹 안 버튼이 모두 같은 너비·높이다.
```css
.btn-group { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: var(--space-gap-3); }
.btn-group > button { block-size: var(--size-height-6); } /* 강조는 채움·윤곽선 스타일로만 구분 */
```
나쁜 예 — 강조를 크기로 표현해 그룹 안 버튼 크기가 다르다.
```html
<div class="btn-group"><button type="button" class="btn-lg btn-primary">신청</button><button type="button" class="btn-sm btn-secondary">취소</button></div>
```

## LAYOUT-021 버튼

- 강도: **SHOULD**
- 룰: 버튼 그룹을 세로로 배열할 때는 최상위 강조 버튼을 맨 위(첫 번째)에 둔다.
- 측정 기준: 세로 배열 버튼 그룹(flex-direction: column 등)에서 DOM 첫 버튼이자 화면 맨 위 버튼이 그룹 안 가장 높은 강조 스타일(채움)을 가진다.
- 판정 방법: 좁은 패널·모바일 너비에서 세로로 쌓인 버튼 그룹의 순서를 확인한다.
- 자동 검사: none
- 적용 대상: .btn-group, 세로 버튼 그룹
- 근거: 중요도 순으로 위에서부터 두어야 시선이 가장 중요한 버튼에 먼저 닿는다.
- 출처: KRDS 컴포넌트 > 버튼 > 사용성 가이드라인 (가이드라인 PDF 2025.08 512·516쪽)

좋은 예 — 세로 그룹의 첫 버튼이 최상위 강조(채움) 버튼이다.
```html
<div class="btn-group vertical"><button type="button" class="btn-primary">신청하기</button><button type="button" class="btn-secondary">임시 저장</button></div>
```
나쁜 예 — 최상위 강조 버튼이 세로 그룹 맨 아래에 있다.
```html
<div class="btn-group vertical"><button type="button" class="btn-secondary">임시 저장</button><button type="button" class="btn-primary">신청하기</button></div>
```

## LAYOUT-023 플로팅 버튼

- 강도: **SHOULD**
- 룰: 플로팅 버튼은 화면 오른쪽 아래에 두고, 하단 탭바가 있으면 탭바와 겹치지 않게 탭바 위 오른쪽 아래에 둔다.
- 측정 기준: 플로팅 버튼이 position: fixed이고 right·bottom 기준으로 배치되며, 탭바가 있으면 플로팅 버튼 경계 상자의 bottom ≤ 탭바 경계 상자의 top이다.
- 판정 방법: 360px 너비에서 탭바가 있는 화면과 없는 화면을 스크롤하며 플로팅 버튼 위치를 확인한다.
- 자동 검사: none
- 적용 대상: 플로팅 버튼, .fab
- 근거: 오른손 엄지가 닿기 쉬운 위치이며, 위에서 아래로 흐르는 콘텐츠를 가장 적게 가린다.
- 출처: KRDS 컴포넌트 > 플로팅 버튼 > 사용성 가이드라인

좋은 예 — 플로팅 버튼이 오른쪽 아래, 하단 탭바 위에 있다.
```css
:root { --layout-tabbar-height: var(--size-height-8); } /* 탭바 높이 — 토큰 값 */
.fab { position: fixed; inset-inline-end: var(--space-gap-5);
  inset-block-end: calc(var(--layout-tabbar-height) + var(--space-gap-5)); } /* 탭바 위 오른쪽 아래 */
```
나쁜 예 — 탭바가 있는데 플로팅 버튼이 탭바 위로 올라가지 않아 겹친다.
```css
.fab { position: fixed; inset-inline-end: var(--space-gap-5); inset-block-end: var(--space-gap-5); }
/* 하단 탭바가 있는 화면에서 탭바와 겹침 */
```

## LAYOUT-024 플로팅 버튼

- 강도: **SHOULD**
- 룰: 플로팅 동작이 2개 이상 필요하면 확장형 플로팅 버튼 하나로 묶고, 확장 항목은 3개 이하, 터치 깊이는 2수준 이하로 한다.
- 측정 기준: (1) 한 화면의 플로팅 버튼 수 ≤ 1(확장형 포함). (2) 확장형의 펼침 항목 수 ≤ 3. (3) 플로팅 버튼 탭부터 동작 실행까지 탭 횟수 ≤ 2.
- 판정 방법: 플로팅 버튼이 있는 화면에서 버튼 수, 펼침 항목 수, 실행까지 탭 수를 센다.
- 자동 검사: partial (custom)
- 적용 대상: 플로팅 버튼, 확장형 플로팅 버튼
- 근거: 플로팅 버튼이 많거나 깊으면 시각적 혼란이 커지고 주요 동작에 빠르게 접근한다는 목적이 사라진다.
- 출처: KRDS 컴포넌트 > 플로팅 버튼 > 사용성 가이드라인

좋은 예 — 동작 2개를 확장형 플로팅 버튼 하나로 묶고 2번 탭으로 실행한다.
```html
<div class="fab-expand">
  <button type="button" aria-expanded="false" aria-controls="fab-menu">작성 메뉴</button>
  <ul id="fab-menu" hidden><li><button type="button">민원 작성</button></li><li><button type="button">사진으로 신고</button></li></ul>
</div>
```
나쁜 예 — 한 화면에 플로팅 버튼이 2개다.
```html
<button type="button" class="fab">민원 작성</button>
<button type="button" class="fab fab-second">사진으로 신고</button>
```

## LAYOUT-025 구조화 목록

- 강도: **SHOULD** (판정에 사람의 판단 필요: guide)
- 룰: 구조화 목록 항목에는 상세 페이지 콘텐츠 중 핵심 정보만 골라 논리적 순서와 위계가 드러나게 구성한다.
- 측정 기준: 점검 질문: 항목에 보이는 정보가 사용자가 다음 행동(상세 보기·실행)을 결정하는 데 필요한 것뿐인가? 제목·요약·속성의 시각 위계(글자 크기·굵기)가 중요도 순인가?
- 자동 검사: none
- 적용 대상: 구조화 목록
- 근거: 목록 항목이 상세 정보를 그대로 담으면 훑어보기와 다음 행동 결정이 느려진다.
- 출처: KRDS 컴포넌트 > 구조화 목록 > 개요 (가이드라인 PDF 2025.08 353쪽)

좋은 예 — 다음 행동 결정에 필요한 핵심 정보만 위계대로 보여 준다.
```
민원 목록 항목에 민원명·처리 상태·신청일만 표시하고, 담당 부서 연락처와 근거 법령은 상세 페이지에 둔다.
```
나쁜 예 — 핵심 정보를 고르지 않고 위계 없이 나열했다.
```
목록 항목마다 본문 요약·첨부파일 목록·담당자 전화번호까지 같은 글자 크기로 나열한다.
```

## LAYOUT-026 구조화 목록

- 강도: **SHOULD** (판정에 사람의 판단 필요: guide)
- 룰: 구조화 목록에서는 목록 정보의 성격과 사용자 방문 목적에 비춰 가장 중요한 행동 하나를 최상위 강조 버튼(CTA)으로 표현한다.
- 측정 기준: 점검 질문: 이 목록에서 사용자가 가장 많이 하려는 행동이 무엇인가? 그 행동이 항목의 최상위 강조 버튼인가? 최상위 강조 버튼이 항목마다 하나인가?
- 자동 검사: none
- 적용 대상: 구조화 목록
- 결정 CF-070: 구조화 목록 항목마다 1개인 CTA 는 COLOR-015 의 '한 화면 상태에 주조색 채움 버튼 1개' 계산에서 뺀다. 목록 밖(페이지 머리·폼 하단·알림 등)의 주조색 채움 버튼은 그대로 세어 1개 이하로 둔다. 한 항목 안의 주조색 채움 버튼은 1개다(LAYOUT-026).
- 근거: 가장 중요한 행동을 강조 버튼으로 드러내야 사용자가 목록에서 바로 목적을 달성한다.
- 출처: KRDS 컴포넌트 > 구조화 목록 > 사용성 가이드라인 (가이드라인 PDF 2025.08 356쪽)

좋은 예 — 가장 중요한 행동 하나만 최상위 강조 버튼이다.
```
보조금 목록 항목마다 '신청하기'만 채움 버튼으로 두고, '관심 등록'은 텍스트 버튼으로 둔다.
```
나쁜 예 — 최상위 강조 버튼이 항목마다 여러 개라 핵심 행동이 드러나지 않는다.
```
항목마다 '신청하기'·'관심 등록'·'공유' 세 버튼을 모두 채움 버튼으로 둔다.
```

## LAYOUT-027 구조화 목록

- 강도: **SHOULD** (판정에 사람의 판단 필요: guide)
- 룰: 사용자가 자주 쓰는 기능의 행동 버튼을 구조화 목록 항목에 두어 상세 페이지로 가거나 항목을 펼치지 않고도 목적을 달성하게 한다.
- 측정 기준: 점검 질문: 이용 데이터나 과업 분석상 이 목록에서 자주 쓰는 기능은 무엇인가? 그 기능을 상세 페이지에 가지 않고 목록 항목에서 실행할 수 있는가?
- 자동 검사: none
- 적용 대상: 구조화 목록
- 근거: 자주 쓰는 기능을 목록에서 바로 실행하면 페이지 이동이 줄어든다.
- 출처: KRDS 컴포넌트 > 구조화 목록 > 사용성 가이드라인 (가이드라인 PDF 2025.08 355·357쪽)

좋은 예 — 자주 쓰는 기능을 목록 항목에서 바로 실행한다.
```
자격증 발급 이력 목록 항목에 '증명서 내려받기' 버튼을 두어 상세 페이지에 가지 않고 내려받게 한다.
```
나쁜 예 — 자주 쓰는 기능이 상세 페이지에만 있다.
```
가장 많이 쓰는 '증명서 내려받기'가 상세 페이지 안에만 있어 항목마다 들어갔다 나와야 한다.
```

## LAYOUT-028 구조화 목록

- 강도: **SHOULD**
- 룰: 구조화 목록의 모든 항목은 같은 정보 항목을 같은 순서로 보여 주고, 값이 없는 항목도 자리를 비우지 않는다.
- 측정 기준: 목록의 모든 항목이 같은 필드 집합(예: 기관·기간·상태)을 같은 DOM 순서로 가진다. 원자료에 값이 없는 필드도 생략하지 않고 자리에 대시(-)를 표시한다.
- 판정 방법: 값이 비어 있는 데이터를 포함한 목록 픽스처로 항목별 필드 수와 순서를 비교한다.
- 자동 검사: none
- 적용 대상: 구조화 목록
- 근거: 항목마다 정보 구성이 다르거나 비어 있으면 사용자가 항목을 비교할 때 혼동한다.
- 출처: KRDS 컴포넌트 > 구조화 목록 > 사용성 가이드라인 (가이드라인 PDF 2025.08 357쪽)

좋은 예 — 모든 항목이 같은 필드를 같은 순서로 갖고, 값이 없으면 대시(-)를 둔다.
```html
<ul class="structured-list">
  <li><dl><dt>기관</dt><dd>서울특별시</dd><dt>기간</dt><dd>-</dd></dl></li>
  <li><dl><dt>기관</dt><dd>부산광역시</dd><dt>기간</dt><dd>2026. 10. 1. ~ 2026. 10. 31.</dd></dl></li>
</ul>
```
나쁜 예 — 값이 없는 '기간' 필드를 생략해 항목마다 구조가 다르다.
```html
<ul class="structured-list">
  <li><dl><dt>기관</dt><dd>서울특별시</dd></dl></li>
  <li><dl><dt>기관</dt><dd>부산광역시</dd><dt>기간</dt><dd>2026. 10. 1. ~ 2026. 10. 31.</dd></dl></li>
</ul>
```

## LAYOUT-029 긴급 공지

- 강도: **SHOULD**
- 룰: 긴급 공지는 메인 메뉴 아래 본문 콘텐츠의 첫 요소로 두고, 공지 컨테이너가 화면 전체 너비를 차지하게 한다.
- 측정 기준: (1) 긴급 공지 요소가 main(또는 메인 메뉴 다음 본문 영역)의 첫 자식이며 히어로 영역보다 앞에 있다. (2) 공지 컨테이너의 렌더링 너비가 뷰포트 너비(스크롤바 제외)와 같다. 공지 안의 텍스트는 LAYOUT-004 스크린 마진을 따른다.
- 판정 방법: 긴급 공지가 있는 메인 화면을 360·1280px에서 열어 DOM 위치와 컨테이너 너비를 확인한다.
- 자동 검사: none
- 적용 대상: 긴급 공지
- 근거: 긴급한 정보는 서비스에 접속하자마자 가장 먼저 보여야 한다.
- 출처: KRDS 컴포넌트 > 긴급 공지 > 사용성 가이드라인 (가이드라인 PDF 2025.08 363쪽)

좋은 예 — 긴급 공지가 본문 첫 요소이고 전체 너비를 차지한다.
```html
<main id="main">
  <section class="critical-alert"><div class="container"><strong>긴급</strong> 태풍 북상으로 2026. 10. 20. 현장 접수를 중단합니다.</div></section>
  <section class="hero">…</section>
</main>
<!-- .critical-alert { inline-size: 100%; } 배경은 전체 너비, 텍스트는 .container 스크린 마진 안 -->
```
나쁜 예 — 긴급 공지가 히어로 영역 뒤에 있어 본문 첫 요소가 아니다.
```html
<main id="main">
  <section class="hero">…</section>
  <section class="critical-alert"><div class="container"><strong>긴급</strong> 태풍 북상으로 2026. 10. 20. 현장 접수를 중단합니다.</div></section>
</main>
```

## LAYOUT-030 달력

- 강도: **SHOULD**
- 룰: 달력 셀에서 이벤트 텍스트가 생략되면 같은 이벤트를 손실 없이 볼 수 있는 표나 목록을 따로 제공하거나, 달력 표시 단위를 주·일로 바꿔 이벤트 표시 영역을 넓힌다.
- 측정 기준: 이벤트 텍스트가 잘리는 달력 셀(text-overflow: ellipsis 적용 또는 scrollWidth > clientWidth)이 하나라도 있으면, 같은 페이지에 그 달의 모든 이벤트를 전체 텍스트로 보여 주는 table 또는 ul/ol이 있거나 주·일 단위 보기로 전환할 수 있다.
- 판정 방법: 이벤트가 많은 달 데이터로 달력을 열고 잘린 셀과 대체 목록(또는 보기 전환)의 존재를 확인한다.
- 자동 검사: none
- 적용 대상: 달력, 이벤트 달력
- 근거: 셀에서 잘린 이벤트는 내용을 알 수 없고, 제목이 비슷하면 구분도 안 된다.
- 출처: KRDS 컴포넌트 > 달력 > 사용성 가이드라인 (가이드라인 PDF 2025.08 371·374쪽)

좋은 예 — 셀에서 잘린 이벤트를 전체 텍스트 목록으로 함께 제공한다.
```html
<table class="calendar">…<td><span class="event">청년 취업 박람회 사전…</span></td>…</table>
<h3>10월 일정 전체 목록</h3>
<ul><li><time datetime="2026-10-15">2026. 10. 15.</time> 청년 취업 박람회 사전 등록 마감</li></ul>
```
나쁜 예 — 말줄임된 이벤트를 손실 없이 볼 방법이 없다.
```html
<table class="calendar">…<td><span class="event">청년 취업 박람회 사전…</span></td>…</table>
<!-- 전체 텍스트 목록도, 주·일 보기 전환도 없음 -->
```

## LAYOUT-032 디스클로저

- 강도: **SHOULD**
- 룰: 디스클로저는 부가 정보를 제공하려는 대상 정보·컨트롤·섹션 바로 아래에 둔다.
- 측정 기준: 디스클로저(details 또는 aria-expanded 버튼+영역)가 대상 요소의 다음 형제(DOM)이며 화면에서도 대상 요소 바로 아래에 있다(사이에 다른 콘텐츠 블록 없음).
- 판정 방법: 디스클로저마다 대상 요소를 정하고 DOM·화면 위치를 확인한다.
- 자동 검사: none
- 적용 대상: details, 디스클로저
- 근거: 디스클로저가 대상과 떨어져 있으면 어떤 정보를 보충하는지 알 수 없다.
- 출처: KRDS 컴포넌트 > 디스클로저 > 사용성 가이드라인 (가이드라인 PDF 2025.08 382·383쪽)

좋은 예 — 디스클로저가 대상 입력 필드 바로 아래에 있다.
```html
<label for="rrn">주민등록번호</label><input id="rrn" inputmode="numeric">
<details><summary>주민등록번호가 없는 경우</summary>…</details>
```
나쁜 예 — 대상 필드와 디스클로저 사이에 다른 필드가 끼어 있다.
```html
<label for="rrn">주민등록번호</label><input id="rrn" inputmode="numeric">
<label for="addr">주소</label><input id="addr" autocomplete="street-address">
<details><summary>주민등록번호가 없는 경우</summary>…</details>
```

## LAYOUT-034 모달

- 강도: **SHOULD**
- 룰: 모달의 확정·취소 액션 버튼은 항상 모달 푸터에 두고, 모달 본문에는 입력폼 관련 컨트롤만 둔다.
- 측정 기준: 모달(dialog, [role=dialog])에서 확인·취소·저장·삭제 등 과업 완료·중단 버튼이 푸터 영역(본문 스크롤 컨테이너 밖, 모달 맨 아래)에 있다. 본문 안 버튼은 입력폼 조작용(파일 선택·항목 추가 등)뿐이다.
- 판정 방법: 모달 유형별로 버튼 위치를 확인한다.
- 자동 검사: none
- 적용 대상: dialog, [role=dialog], 모달
- 근거: 액션 버튼 위치가 일정해야 사용자가 모달을 끝내는 방법을 바로 찾는다.
- 출처: KRDS 컴포넌트 > 모달 > 구조 (가이드라인 PDF 2025.08 390쪽)

좋은 예 — 확정·취소 버튼이 모달 푸터에 있다.
```html
<dialog aria-labelledby="dlg-title">
  <header><h2 id="dlg-title">주소 변경</h2></header>
  <div class="modal-body"><label for="new-addr">새 주소</label><input id="new-addr" autocomplete="street-address"></div>
  <footer><button type="button">취소</button><button type="submit" class="btn-primary">저장</button></footer>
</dialog>
```
나쁜 예 — 확정 버튼이 모달 본문 안에 있다.
```html
<dialog aria-labelledby="dlg-title">
  <header><h2 id="dlg-title">주소 변경</h2></header>
  <div class="modal-body"><label for="new-addr">새 주소</label><input id="new-addr" autocomplete="street-address">
    <button type="submit" class="btn-primary">저장</button></div>
  <footer><button type="button">취소</button></footer>
</dialog>
```

## LAYOUT-035 모달

- 강도: **SHOULD**
- 룰: 모달 본문에 세로 스크롤이 생기면 스크롤바와 본문 하단 흐림 효과로 스크롤 단서를 주고, 액션 버튼이 있는 푸터는 스크롤 위치와 관계없이 항상 보이게 한다.
- 측정 기준: 모달 본문 scrollHeight > clientHeight일 때: (1) 본문의 overflow-y가 auto 또는 scroll이고 scrollbar-width: none·::-webkit-scrollbar { display:none }로 스크롤바를 숨기지 않는다. (2) 본문 하단에 그라데이션(흐림) 오버레이가 있다. (3) 본문을 처음·끝으로 스크롤해도 푸터 경계 상자가 뷰포트와 모달 안에 보인다.
- 판정 방법: 360px 너비·짧은 높이 창에서 긴 내용 모달을 열어 스크롤하며 확인한다.
- 자동 검사: none
- 적용 대상: dialog, [role=dialog], 모달
- 근거: 스크롤 단서가 없으면 아래 내용을 놓치고, 액션 버튼이 스크롤 끝에 숨으면 모달을 끝내는 방법을 찾지 못한다.
- 출처: KRDS 컴포넌트 > 모달 > 사용성 가이드라인 (가이드라인 PDF 2025.08 391·393쪽)

좋은 예 — 본문만 스크롤되고 스크롤바·하단 흐림이 단서가 되며 푸터는 항상 보인다.
```css
dialog { display: flex; flex-direction: column; max-block-size: 90dvh; }
.modal-body { overflow-y: auto; } /* 스크롤바 유지 */
.modal-body::after { content: ""; position: sticky; inset-block-end: 0; display: block; block-size: var(--space-gap-8);
  background: linear-gradient(transparent, var(--color-surface-white)); } /* 하단 흐림 */
.modal-footer { flex: none; } /* 푸터는 스크롤 영역 밖 */
```
나쁜 예 — 푸터가 스크롤에 묻히고 스크롤바도 숨겨 단서가 없다.
```css
dialog { overflow-y: auto; } /* 푸터까지 함께 스크롤되어 버튼이 끝에 숨음 */
dialog::-webkit-scrollbar { display: none; }
```

## LAYOUT-037 아코디언

- 강도: **SHOULD**
- 룰: 아코디언 확장 상태 아이콘은 서비스의 모든 아코디언에서 같은 위치에 두고, 관련 섹션 목록형은 헤더 끝, 트리 구조형은 헤더 시작에 둔다.
- 측정 기준: 같은 유형의 모든 아코디언에서 아이콘이 헤더 안 같은 쪽(끝: 텍스트 뒤 inline-end, 시작: 텍스트 앞)에 있다. 관련 섹션 목록형은 끝, 트리 구조형은 시작.
- 판정 방법: 서비스 안 아코디언 인스턴스를 모아 아이콘 위치를 비교한다.
- 자동 검사: none
- 적용 대상: 아코디언 헤더
- 근거: 아이콘 위치가 같으면 헤더 텍스트가 같은 위치에서 시작해 눈의 피로가 줄고, 트리형은 시작 위치 아이콘이 계층을 드러낸다.
- 출처: KRDS 컴포넌트 > 아코디언 > 사용성 가이드라인 (가이드라인 PDF 2025.08 408·409쪽)

좋은 예 — 같은 유형의 아코디언 아이콘이 모두 헤더 끝에 있다.
```css
.accordion-header { display: flex; align-items: center; }
.accordion-header .icon { margin-inline-start: auto; } /* 관련 섹션 목록형: 모든 아코디언에서 아이콘을 헤더 끝에 */
```
나쁜 예 — 같은 유형인데 페이지마다 아이콘 위치가 다르다.
```css
.accordion-header { display: flex; align-items: center; }
.faq .accordion-header .icon { order: -1; } /* 같은 목록형인데 이 페이지만 아이콘이 헤더 시작에 */
```

## LAYOUT-038 아코디언

- 강도: **SHOULD**
- 룰: 아코디언 패널에 자체 세로·가로 스크롤을 만들지 않고, 긴 패널 내용은 페이지 스크롤로 탐색하게 한다.
- 측정 기준: 펼친 아코디언 패널의 overflow-x·overflow-y 계산값이 auto·scroll이 아니고, scrollHeight ≤ clientHeight, scrollWidth ≤ clientWidth다.
- 판정 방법: 내용이 긴 패널을 펼쳐 개발자 도구로 overflow와 크기를 확인한다.
- 자동 검사: none
- 적용 대상: 아코디언 패널
- 근거: 패널 안 스크롤은 페이지 스크롤과 겹쳐 조작이 어렵고 내용을 놓치게 한다.
- 출처: KRDS 컴포넌트 > 아코디언 > 사용성 가이드라인 (가이드라인 PDF 2025.08 408·413쪽)

좋은 예 — 패널에 자체 스크롤이 없다.
```css
.accordion-panel { overflow: visible; } /* 높이 제한 없이 펼쳐 페이지 스크롤로 읽음 */
```
나쁜 예 — 패널 높이를 묶어 패널 자체 스크롤이 생긴다.
```css
.accordion-panel { max-block-size: 300px; overflow-y: auto; } /* 패널 안에 세로 스크롤 생김 */
```

## LAYOUT-039 캐러셀

- 강도: **SHOULD**
- 룰: 캐러셀 슬라이드는 5개 이하로 두고, 항목이 더 많으면 캐러셀 대신 목록을 쓴다.
- 측정 기준: 캐러셀 하나의 슬라이드(항목) 수 ≤ 5.
- 판정 방법: 캐러셀 데이터·DOM의 슬라이드 수를 센다.
- 자동 검사: full (custom)
- 적용 대상: 캐러셀
- 근거: 슬라이드가 많으면 인지 부하가 커지고, 사용자는 대개 3~4개만 보고 탐색을 멈춘다(KRDS).
- 출처: KRDS 컴포넌트 > 캐러셀 > 사용성 가이드라인 (가이드라인 PDF 2025.08 430·431쪽)

좋은 예 — 슬라이드가 5개 이하다.
```html
<section class="carousel" aria-label="주요 소식">
  <ul class="slides"><li>소식 1</li><li>소식 2</li><li>소식 3</li><li>소식 4</li></ul>
</section>
```
나쁜 예 — 슬라이드 7개를 캐러셀에 넣었다(목록으로 바꿔야 함).
```html
<section class="carousel" aria-label="주요 소식">
  <ul class="slides"><li>소식 1</li><li>소식 2</li><li>소식 3</li><li>소식 4</li><li>소식 5</li><li>소식 6</li><li>소식 7</li></ul>
</section>
```

## LAYOUT-040 캐러셀

- 강도: **SHOULD**
- 룰: 캐러셀의 도형형 항목 식별자는 컨테이너 가운데에, 분수형 식별자는 오른쪽 아래에 두고, 탐색 버튼은 레이아웃 유형에 따라 컨테이너 가운데 좌우 또는 오른쪽 아래에 둔다.
- 측정 기준: (1) 도형형(점) 식별자 그룹의 수평 중심 = 캐러셀 컨테이너 수평 중심(±1px). (2) 분수형 식별자는 컨테이너 오른쪽 아래 사분면에 있다. (3) 탐색 버튼은 이전·다음이 컨테이너 세로 중앙 좌우에 있거나 오른쪽 아래에 함께 있다. 서비스 안 같은 레이아웃 유형의 캐러셀은 같은 배치를 쓴다.
- 판정 방법: 캐러셀 인스턴스별 식별자·버튼 위치를 확인한다.
- 자동 검사: none
- 적용 대상: 캐러셀
- 근거: 컨트롤 위치가 일정해야 사용자가 캐러셀임을 알아보고 바로 조작한다.
- 출처: KRDS 컴포넌트 > 캐러셀 > 사용성 가이드라인 (가이드라인 PDF 2025.08 430·435쪽)

좋은 예 — 점 식별자 그룹이 캐러셀 가운데에 있다.
```css
.carousel { position: relative; }
.carousel .dots { position: absolute; inset-inline: 0; inset-block-end: var(--space-gap-5);
  display: flex; justify-content: center; } /* 도형형 식별자: 컨테이너 가운데 */
```
나쁜 예 — 점 식별자를 컨테이너 왼쪽 아래에 두었다.
```css
.carousel { position: relative; }
.carousel .dots { position: absolute; inset-inline-start: var(--space-gap-5); inset-block-end: var(--space-gap-5); } /* 왼쪽 아래 */
```

## LAYOUT-041 탭

- 강도: **SHOULD**
- 룰: 탭과 탭 패널을 인접하게 배치해 패널이 선택된 탭의 내용임을 시각적으로 드러낸다.
- 측정 기준: [role=tablist]와 그 [role=tabpanel] 사이에 다른 콘텐츠 요소가 없다(DOM·화면 모두). 수평 탭은 패널이 탭 목록 바로 아래, 수직 탭은 바로 옆에 붙어 있다.
- 판정 방법: 탭 컴포넌트의 DOM과 렌더링을 확인한다.
- 자동 검사: partial (custom)
- 적용 대상: [role=tablist], [role=tabpanel]
- 근거: 탭과 패널이 떨어져 있으면 어떤 탭의 내용인지 알기 어렵다.
- 출처: KRDS 컴포넌트 > 탭 > 사용성 가이드라인 (가이드라인 PDF 2025.08 449쪽)

좋은 예 — 탭 목록 바로 아래에 패널이 붙어 있다.
```html
<div role="tablist" aria-label="신청 현황"><button role="tab" id="t1" aria-selected="true" aria-controls="p1">진행 중</button><button role="tab" id="t2" aria-selected="false" aria-controls="p2">완료</button></div>
<div role="tabpanel" id="p1" aria-labelledby="t1">…</div>
```
나쁜 예 — 탭 목록과 패널 사이에 다른 콘텐츠가 있다.
```html
<div role="tablist" aria-label="신청 현황"><button role="tab" id="t1" aria-selected="true" aria-controls="p1">진행 중</button><button role="tab" id="t2" aria-selected="false" aria-controls="p2">완료</button></div>
<p class="notice">신청 내역은 3년간 보관됩니다.</p>
<div role="tabpanel" id="p1" aria-labelledby="t1">…</div>
```

## LAYOUT-042 탭

- 강도: **SHOULD**
- 룰: 탭을 중첩하지 않고, 중첩이 불가피하면 수준별 탭 스타일을 서로 다르게 한다.
- 측정 기준: [role=tabpanel] 안에 [role=tablist]가 있으면, 안쪽 탭의 스타일(배경·테두리·글자 크기·인디케이터 모양 중 하나 이상)이 바깥 탭과 다르다.
- 판정 방법: 중첩 탭이 있는 화면에서 두 수준의 탭 스타일 계산값을 비교한다.
- 자동 검사: partial (custom)
- 적용 대상: [role=tablist]
- 근거: 탭 중첩은 숨은 콘텐츠를 여러 번 판단하게 해 인지 부담을 키우고, 같은 스타일이면 어느 수준인지 구분할 수 없다.
- 출처: KRDS 컴포넌트 > 탭 > 사용성 가이드라인 (가이드라인 PDF 2025.08 452쪽)

좋은 예 — 중첩된 안쪽 탭의 스타일이 바깥 탭과 다르다.
```css
.tabs--line [role=tab][aria-selected=true] { border-block-end: 2px solid var(--palette-primary-60); } /* 바깥 탭: 밑줄형 */
[role=tabpanel] .tabs--pill [role=tab][aria-selected=true] { background: var(--color-surface-gray-subtle); border-radius: var(--radius-max); } /* 안쪽 탭: 채움형 */
```
나쁜 예 — 중첩된 두 수준의 탭 스타일이 같아 수준을 구분할 수 없다.
```css
[role=tab][aria-selected=true] { border-block-end: 2px solid var(--palette-primary-60); } /* 바깥·안쪽 탭이 같은 밑줄형 */
```

## LAYOUT-043 표

- 강도: **SHOULD**
- 룰: 아코디언·모달처럼 공간이 제한된 영역에서 표 데이터가 잘리거나 가로 스크롤이 생기면 표를 쓰지 않고 각 열을 세로로 떨어뜨려 배치한다.
- 측정 기준: 아코디언 패널·모달 안 table마다 scrollWidth ≤ 부모 컨테이너 clientWidth이고 잘린 셀 텍스트가 없다. 아니면 table 대신 열 항목을 세로로 쌓은 구조(dl·카드 등)를 쓴다.
- 판정 방법: 뷰포트 320 CSS px 너비에서 아코디언·모달 안 표를 열어 가로 넘침과 잘림을 확인한다.
- 자동 검사: none
- 적용 대상: .accordion-panel table, dialog table
- 예외: 일반 본문 영역의 데이터 표: 표 영역 안 가로 스크롤을 허용한다(RESP-003 예외, CF-012). 이때 스크롤 컨테이너는 tabindex="0"으로 키보드 초점을 받고, role="region"과 aria-label(또는 표 제목을 가리키는 aria-labelledby)로 접근 가능한 이름을 가진다(WCAG 2.1.1, axe scrollable-region-focusable).
- 결정 CF-012: 양립. LAYOUT-043은 아코디언·모달처럼 공간이 제한된 영역에만 적용한다. 일반 본문의 데이터 표는 표 영역 안에서만 가로 스크롤을 허용하고 페이지 전체 가로 스크롤은 만들지 않는다.
- 근거: 좁은 영역의 표는 데이터가 잘리거나 이중 스크롤을 만들어 정보를 비교하기 어렵다.
- 출처: KRDS 컴포넌트 > 표 > 사용성 가이드라인 (가이드라인 PDF 2025.08 462·463·468쪽)

좋은 예 — 모달 안에서는 표 대신 열 항목을 세로로 쌓는다.
```html
<dialog aria-labelledby="fee-title">
  <h2 id="fee-title">수수료 내역</h2>
  <dl class="stacked"><dt>항목</dt><dd>여권 발급</dd><dt>수수료</dt><dd>53,000원</dd><dt>납부 방법</dt><dd>카드·현금</dd></dl>
</dialog>
```
나쁜 예 — 모달 안 표가 넘쳐 가로 스크롤이 생긴다.
```html
<dialog aria-labelledby="fee-title">
  <h2 id="fee-title">수수료 내역</h2>
  <table style="min-inline-size: 720px">…</table> <!-- 320 CSS px 화면에서 모달 안 표에 가로 스크롤 -->
</dialog>
```

## LAYOUT-045 표

- 강도: **SHOULD**
- 룰: 표의 행·셀 자체를 클릭·선택하는 대화형 요소로 만들지 않고(열 헤더 정렬 컨트롤 제외), 데이터에 복잡한 상호작용이 필요하면 표 대신 구조화 목록을 쓴다.
- 측정 기준: table 안 tr·td·th 요소에 click 핸들러, role(button·link·row 선택), tabindex가 없다. 열 헤더(thead th) 안의 정렬 버튼만 예외.
- 판정 방법: 개발자 도구의 이벤트 리스너 패널과 DOM 속성으로 행·셀의 대화형 여부를 확인한다.
- 자동 검사: partial (custom)
- 적용 대상: table, tr, td
- 근거: 표는 기본적으로 대화형 요소가 아니므로 행 클릭 같은 숨은 상호작용은 발견·키보드 조작이 어렵다.
- 출처: KRDS 컴포넌트 > 표 > 개요 / 용례 (가이드라인 PDF 2025.08 459·460쪽)

좋은 예 — 행 자체가 아니라 셀 안 링크로 이동한다.
```html
<tr><td><a href="/notice/1">10월 민원 처리 안내</a></td><td><time datetime="2026-10-18">2026. 10. 18.</time></td></tr>
```
나쁜 예 — 표 행 전체를 클릭 대상으로 만들었다.
```html
<tr onclick="location.href='/notice/1'"><td>10월 민원 처리 안내</td><td><time datetime="2026-10-18">2026. 10. 18.</time></td></tr>
```

## LAYOUT-046 텍스트 목록

- 강도: **SHOULD**
- 룰: 중첩 텍스트 목록은 수준마다 들여쓰기로 계층을 구분하고 3수준 이내로 구성한다.
- 측정 기준: (1) ul·ol 중첩 깊이 ≤ 3. (2) 하위 수준 목록 항목의 텍스트 시작 x좌표가 상위 수준보다 오른쪽이다(padding-inline-start 또는 margin-inline-start > 0).
- 판정 방법: 중첩 목록의 DOM 깊이와 수준별 시작 위치를 확인한다.
- 자동 검사: partial (custom)
- 적용 대상: ul, ol, 텍스트 목록
- 근거: 글자 크기만으로는 수준을 구분하기 어렵고, 수준이 깊으면 항목 간 상하 관계를 이해하기 어렵다.
- 출처: KRDS 컴포넌트 > 텍스트 목록 > 사용성 가이드라인 (가이드라인 PDF 2025.08 487·491·492쪽)

좋은 예 — 하위 목록이 들여쓰기로 구분된다.
```css
ul ul, ol ol { padding-inline-start: var(--space-padding-8); } /* 수준마다 들여쓰기, 중첩은 3수준까지 */
```
나쁜 예 — 들여쓰기가 없어 목록 계층이 보이지 않는다.
```css
ul ul, ol ol { padding-inline-start: 0; } /* 하위 목록이 상위와 같은 위치에서 시작 */
```

## LAYOUT-047 라디오 버튼

- 강도: **SHOULD**
- 룰: 라디오 버튼의 레이블은 원형 양식(컨트롤)의 오른쪽에 둔다.
- 측정 기준: 각 라디오 버튼에서 레이블 텍스트 경계 상자의 left ≥ input[type=radio](또는 커스텀 양식) 경계 상자의 right이고, 둘의 세로 중심이 같은 줄에 있다.
- 판정 방법: 라디오 그룹을 360·1280px에서 확인한다.
- 자동 검사: none
- 적용 대상: input[type=radio], 라디오 버튼
- 근거: 레이블이 항상 같은 위치에서 시작해야 옵션을 일관되게 읽을 수 있다.
- 출처: KRDS 컴포넌트 > 라디오 버튼 > 사용성 가이드라인 (가이드라인 PDF 2025.08 526·528쪽)

좋은 예 — 레이블이 라디오 양식 오른쪽에 있다.
```html
<label><input type="radio" name="gender" value="m"> 남성</label>
```
나쁜 예 — 레이블이 라디오 양식 왼쪽에 있다.
```html
<label>남성 <input type="radio" name="gender" value="m"></label>
```

## LAYOUT-048 태그

- 강도: **SHOULD** (판정에 사람의 판단 필요: guide)
- 룰: 태그는 처음에 꼭 필요한 것만 두고, 사용자 의견을 수렴해 필요가 확인된 태그만 추가한다.
- 측정 기준: 점검 질문: 각 태그가 사용자의 분류·필터 목적에 쓰이는가? 태그를 늘린 근거(사용자 의견·이용 데이터)가 기록돼 있는가?
- 자동 검사: none
- 적용 대상: 태그
- 근거: 태그가 많을수록 인지 부담이 커진다.
- 출처: KRDS 컴포넌트 > 태그 > 사용성 가이드라인 (가이드라인 PDF 2025.08 562·564쪽)

좋은 예 — 필요가 확인된 태그만 근거를 남겨 늘린다.
```
'복지'·'세금'·'교통' 태그 3개로 시작하고, 검색어 분석에서 반복 확인된 '청년' 태그를 근거와 함께 추가한다.
```
나쁜 예 — 사용 근거 없이 태그를 한꺼번에 늘렸다.
```
예상되는 분류어 30개를 처음부터 모두 태그로 노출한다.
```

## LAYOUT-049 태그

- 강도: **SHOULD**
- 룰: 태그 그룹 전체에 동작하는 일괄 액션 버튼(전체 삭제 등)은 태그 그룹 바로 옆(태그 목록의 앞이나 뒤)에 두고, 태그 그룹과 버튼 사이에 다른 콘텐츠를 두지 않는다.
- 측정 기준: 일괄 액션 버튼이 태그 목록과 같은 부모 컨테이너 안에 있고, DOM에서 태그 목록의 바로 앞 또는 바로 뒤 형제다(사이에 다른 요소 없음). 화면에서도 버튼 경계 상자와 태그 목록 경계 상자 사이에 다른 콘텐츠 블록이 없다.
- 판정 방법: 태그 그룹이 있는 필터 화면에서 확인한다.
- 자동 검사: none
- 적용 대상: 태그 그룹
- 근거: 일괄 액션 위치가 일정해야 개별 태그 삭제와 혼동하지 않는다.
- 출처: KRDS 컴포넌트 > 태그 > 구조 (가이드라인 PDF 2025.08 561쪽)

좋은 예 — 일괄 액션 버튼이 태그 그룹 바로 옆(오른쪽)에 있다. 웹 KRDS 구조 설명과 컴포넌트 규격(components/tag.yaml)은 오른쪽 배치를 쓴다.
```html
<div class="tag-group">
  <ul class="tags"><li>복지</li><li>청년</li></ul>
  <button type="button" class="tag-clear">전체 삭제</button>
</div>
<!-- .tag-group { display: flex; align-items: center; gap: var(--space-gap-3); } — 버튼이 태그 오른쪽 -->
```
나쁜 예 — 일괄 액션 버튼이 태그 그룹과 떨어져 결과 목록 아래에 있어 어느 태그에 동작하는지 알기 어렵다.
```html
<div class="tag-group">
  <ul class="tags"><li>복지</li><li>청년</li></ul>
</div>
<p>검색 결과 120건</p>
<ul class="results">…</ul>
<button type="button" class="tag-clear">전체 삭제</button>
```

## LAYOUT-051 토글 스위치

- 강도: **SHOULD**
- 룰: 한 화면의 토글 스위치 항목은 모두 같은 배열(레이블·스위치 위치)을 쓰고, 한 항목에 상태 레이블이나 상태 아이콘을 넣으면 모든 항목에 넣는다.
- 측정 기준: 같은 화면의 모든 토글 항목에서 레이블과 스위치의 상대 위치(왼쪽/오른쪽, 열 배치)가 같다. 상태 텍스트(켜짐/꺼짐) 또는 상태 아이콘이 있는 항목이 하나라도 있으면 모든 항목에 있다.
- 판정 방법: 토글이 여러 개인 설정 화면에서 항목별 구조를 비교한다.
- 자동 검사: none
- 적용 대상: 토글 스위치, [role=switch]
- 결정 CF-013: 행 전체를 클릭 영역으로 만든 목록형 설정 화면에서는 레이블을 왼쪽 끝, 스위치를 오른쪽 끝에 둘 수 있다. 그 밖에는 LAYOUT-050을 따른다.
- 근거: 항목마다 배열이 다르면 시선 흐름이 끊겨 탐색 피로가 커진다.
- 출처: KRDS 컴포넌트 > 토글 스위치 > 사용성 가이드라인 (가이드라인 PDF 2025.08 573·577쪽)

좋은 예 — 모든 항목에서 레이블·스위치 배열이 같다.
```html
<label class="toggle"><span>알림 받기</span><input type="checkbox" role="switch"></label>
<label class="toggle"><span>위치 정보 사용</span><input type="checkbox" role="switch"></label>
```
나쁜 예 — 같은 화면에서 항목마다 레이블·스위치 위치가 다르다.
```html
<label class="toggle"><span>알림 받기</span><input type="checkbox" role="switch"></label>
<label class="toggle"><input type="checkbox" role="switch"><span>위치 정보 사용</span></label>
```

## LAYOUT-052 단계 표시기

- 강도: **SHOULD**
- 룰: 단계 표시기의 단계는 왼쪽에서 오른쪽, 또는 위에서 아래로 한 방향으로 나열한다.
- 측정 기준: 단계 항목이 한 행(가로) 또는 한 열(세로)에 있고, DOM 순서 = 시각 순서(가로는 x 증가, 세로는 y 증가)다. 단계가 여러 행으로 줄바꿈되지 않는다.
- 판정 방법: 360·1280px에서 단계 표시기 항목의 위치를 확인한다.
- 자동 검사: none
- 적용 대상: 단계 표시기, ol.steps
- 근거: 단계가 선형으로 놓여야 사용자가 여러 단계 절차 중임과 진행 방향을 안다.
- 출처: KRDS 컴포넌트 > 단계 표시기 > 사용성 가이드라인 (가이드라인 PDF 2025.08 583·585쪽)

좋은 예 — 단계가 한 행에 왼쪽에서 오른쪽으로 나열된다.
```html
<ol class="steps"><li>정보 입력</li><li aria-current="step">확인</li><li>완료</li></ol>
<!-- .steps { display: flex; } — 한 행, 왼쪽에서 오른쪽 -->
```
나쁜 예 — 단계가 여러 행으로 나뉘어 진행 방향이 한 방향이 아니다.
```css
.steps { display: flex; flex-wrap: wrap; }
.steps li { flex-basis: 50%; } /* 4단계가 2행으로 줄바꿈 */
```

## LAYOUT-053 단계 표시기

- 강도: **SHOULD**
- 룰: 단계 사이 흐름 표시(연결선·화살표·꺾쇠 중 하나)를 사이트 전체에서 한 방식으로 통일한다.
- 측정 기준: 사이트의 모든 단계 표시기 인스턴스가 같은 흐름 표시 방식(연결선, 화살표, 꺾쇠 중 하나)을 쓴다.
- 판정 방법: 단계 표시기가 있는 화면을 모아 흐름 표시 방식을 비교한다.
- 자동 검사: none
- 적용 대상: 단계 표시기
- 근거: 흐름 표시가 화면마다 다르면 같은 컴포넌트로 인식되지 않는다.
- 출처: KRDS 컴포넌트 > 단계 표시기 > 사용성 가이드라인 (가이드라인 PDF 2025.08 585쪽)

좋은 예 — 모든 단계 표시기가 같은 연결선 방식을 쓴다.
```css
.steps li + li::before { content: ""; display: block; border-block-start: 1px solid var(--color-border-gray); } /* 사이트 전체 공통: 연결선 */
```
나쁜 예 — 같은 사이트에서 꺾쇠와 연결선을 섞어 쓴다.
```css
.apply .steps li + li::before { content: "›"; } /* 신청 화면: 꺾쇠 */
.change .steps li + li::before { content: ""; display: block; border-block-start: 1px solid var(--color-border-gray); } /* 변경 화면: 연결선 */
```

## LAYOUT-054 텍스트 입력 필드

- 강도: **SHOULD**
- 룰: 텍스트 입력 필드의 기본 너비는 그리드·화면 크기에 따라 유동적으로 두고 입력 필드가 속한 섹션 너비 전체를 차지하게 한다.
- 측정 기준: 길이를 예측할 수 없는 텍스트 입력 필드(input[type=text|email|search|url], textarea)의 렌더링 너비가 속한 폼 섹션(필드 그룹 컨테이너)의 콘텐츠 너비와 같다(width: 100% 또는 inline-size: 100%).
- 판정 방법: 360·768·1280px에서 입력 필드와 섹션 컨테이너의 너비를 비교한다.
- 자동 검사: none
- 적용 대상: input[type=text], input[type=email], textarea, 텍스트 입력 필드
- 예외: 이름·우편번호·전화번호처럼 입력값 길이를 예측할 수 있으면 최대 길이에 맞춰 너비를 고정한다(KRDS 원문, FORM-056).
- 근거: 입력값을 잘림 없이 보고 수정할 수 있어야 한다.
- 출처: KRDS 컴포넌트 > 텍스트 입력 필드 > 사용성 가이드라인 (가이드라인 PDF 2025.08 690쪽)

좋은 예 — 길이를 예측할 수 없는 입력 필드가 섹션 너비를 채운다.
```css
.form-field input[type=email] { inline-size: 100%; } /* 속한 폼 섹션 너비 전체 */
```
나쁜 예 — 길이를 예측할 수 없는 필드의 너비를 고정했다.
```css
.form-field input[type=email] { inline-size: 200px; } /* 길이를 예측할 수 없는 이메일 입력을 좁게 고정 */
```

## LAYOUT-055 파일 업로드

- 강도: **SHOULD**
- 룰: 업로드한 파일 이름은 한 줄로 표시하고 파일 항목 컨테이너를 넘치면 말줄임표로 줄이되, 줄인 경우 전체 이름을 키보드 초점과 마우스 호버에서 보이는 툴팁이나 펼침으로 볼 수 있게 한다.
- 측정 기준: 파일 항목의 파일명 요소에 white-space: nowrap, overflow: hidden, text-overflow: ellipsis가 적용돼 높이가 한 줄이고, 이름이 잘린 항목(scrollWidth > clientWidth)은 초점·호버 시 전체 이름이 화면에 보인다(title 속성만으로 대신하지 않는다).
- 판정 방법: 긴 파일명(100자)을 올려 360px 너비에서 표시를 확인하고, 1280px 창에서 브라우저 확대 200% 상태로 잘린 이름에 초점·호버를 주거나 펼침 버튼을 눌러 전체 이름이 화면에 보이는지 확인한다(CF-061).
- 자동 검사: partial (stylelint/ux-baseline/file-name-ellipsis)
- 적용 대상: 파일 업로드 파일 항목
- 결정 CF-061: 말줄임은 유지하되 잘린 이름은 초점·호버로 전체를 볼 수 있게 한다(LAYOUT-055 statement 수정). title 속성만으로는 대신하지 않는다(키보드·터치에서 보이지 않음).
- 근거: 파일명이 여러 줄로 늘어나면 파일 목록이 길어져 훑어보기 어렵다.
- 출처: KRDS 컴포넌트 > 파일 업로드 > 사용성 가이드라인 (가이드라인 PDF 2025.08 701·709쪽)

좋은 예 — 파일명이 한 줄로 표시되고 넘치면 말줄임표로 줄어든다.
```css
.file-item__name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } /* 한 줄, 넘치면 말줄임 */
```
좋은 예 — 잘린 이름은 초점·호버 때 툴팁으로 전체를 보여 준다(CF-061).
```html
<li class="file-item">
  <span class="file-item__name" tabindex="0" aria-describedby="file-1-full">2026년_사업계획서_최종_수정본_제출용.pdf</span>
  <span role="tooltip" id="file-1-full" class="tooltip">2026년_사업계획서_최종_수정본_제출용.pdf</span>
</li>
```
좋은 예 — 펼침 버튼을 누르면 aria-expanded="true"로 바꾸고 이름을 줄바꿈해 전체를 보여 준다(CF-061).
```html
<li class="file-item">
  <span class="file-item__name" id="file-2-name">2026년_사업계획서_최종_수정본_제출용.pdf</span>
  <button type="button" aria-expanded="false" aria-controls="file-2-name">전체 이름 보기</button>
</li>
```
나쁜 예 — 파일명이 여러 줄로 줄바꿈되어 항목이 한 줄이 아니다.
```css
.file-item__name { overflow-wrap: anywhere; } /* 긴 파일명이 여러 줄로 늘어나 항목 높이가 제각각 */
```

## LAYOUT-056 도움 패널

- 강도: **SHOULD**
- 룰: 도움 패널·맥락적 도움말을 여는 아이콘 버튼은 도움 대상 컴포넌트나 레이블 바로 옆에 둔다.
- 측정 기준: 도움 아이콘 버튼이 대상 레이블·헤딩과 같은 줄에 있고, DOM에서 대상 레이블(또는 헤딩) 요소 바로 다음 형제이거나 그 안에 있다(사이에 다른 요소 없음).
- 판정 방법: 도움 아이콘이 있는 폼·섹션에서 DOM과 화면 위치를 확인한다.
- 자동 검사: none
- 적용 대상: 도움 패널 아이콘 버튼, 맥락적 도움말 아이콘 버튼
- 근거: 아이콘이 대상 옆에 있어야 어떤 요소에 대한 도움말인지 바로 안다.
- 출처: KRDS 컴포넌트 > 도움 패널 > 사용성 가이드라인 (가이드라인 PDF 2025.08 601·604쪽); KRDS 컴포넌트 > 맥락적 도움말 > 사용성 가이드라인 (가이드라인 PDF 2025.08 623·624쪽)

좋은 예 — 도움 버튼이 대상 레이블 바로 다음에 같은 줄로 있다.
```html
<label for="biz">사업자등록번호</label><button type="button" aria-label="사업자등록번호 도움말">?</button>
<input id="biz" inputmode="numeric">
```
나쁜 예 — 도움 버튼이 레이블에서 떨어져 필드 아래 끝에 있다.
```html
<label for="biz">사업자등록번호</label>
<input id="biz" inputmode="numeric">
<p class="hint">숫자 10자리를 입력해 주세요.</p>
<button type="button" aria-label="사업자등록번호 도움말">?</button>
```

## LAYOUT-057 팝오버 위치

- 강도: **SHOULD**
- 룰: 툴팁·맥락적 도움말·코치마크 팝오버는 모든 화면 너비에서 뷰포트 안에 전부 보이게 하고, 활성화 버튼과 안내 대상 본문 요소를 가리지 않는 방향으로 표시한다.
- 측정 기준: 뷰포트 너비 320·360·768·1024·1280 CSS px마다 팝오버를 열었을 때 (1) 팝오버 경계 상자가 뷰포트 안에 완전히 들어 있다(left ≥ 0, right ≤ innerWidth, top ≥ 0, bottom ≤ innerHeight). (2) 팝오버 경계 상자가 활성화 버튼·안내 대상 요소의 경계 상자와 교차하지 않는다.
- 판정 방법: 각 너비에서 화면 가장자리 근처의 활성화 버튼을 포함해 모든 팝오버를 열어 확인한다.
- 자동 검사: none
- 적용 대상: [role=tooltip], 툴팁, 맥락적 도움말, 코치마크
- 근거: 화면 밖으로 잘린 팝오버는 내용을 읽을 수 없고, 대상을 가리면 무엇에 대한 도움말인지 알 수 없다.
- 출처: KRDS 컴포넌트 > 맥락적 도움말 > 사용성 가이드라인 (가이드라인 PDF 2025.08 623·625·626·630쪽); KRDS 컴포넌트 > 툴팁 > 사용성 가이드라인 (가이드라인 PDF 2025.08 652·654·655쪽); KRDS 컴포넌트 > 코치마크 > 사용성 가이드라인 / 플랫폼 고려 사항 (가이드라인 PDF 2025.08 640·646쪽)

좋은 예 — 팝오버를 버튼 아래에 띄우고 뷰포트를 넘으면 반대쪽으로 뒤집는다.
```css
.help-btn { anchor-name: --help; }
.help-popover { position-anchor: --help; position-area: block-end;
  position-try-fallbacks: flip-block, flip-inline; } /* 화면 밖으로 나가면 반대쪽으로 표시 */
```
나쁜 예 — 팝오버가 활성화 버튼을 가린다.
```css
.help-btn { position: relative; }
.help-popover { position: absolute; inset-block-start: 0; inset-inline-start: 0; inline-size: 320px; } /* 버튼 위에 겹쳐 열림 */
```

## LAYOUT-058 코치마크

- 강도: **SHOULD**
- 룰: 한 과업의 코치마크 팝오버 너비는 가장 긴 지시 사항 텍스트를 기준으로 정해 모든 단계에서 같게 한다.
- 측정 기준: 같은 과업의 모든 코치마크 단계에서 팝오버 렌더링 너비가 같다(±1px).
- 판정 방법: 코치마크를 처음부터 끝까지 진행하며 단계별 팝오버 너비를 기록한다.
- 자동 검사: none
- 적용 대상: 코치마크
- 근거: 단계마다 팝오버 크기가 바뀌면 시선이 흔들리고 같은 안내 흐름으로 인식되지 않는다.
- 출처: KRDS 컴포넌트 > 코치마크 > 사용성 가이드라인 (가이드라인 PDF 2025.08 638·641쪽)

좋은 예 — 한 과업의 모든 코치마크 단계가 같은 너비다.
```css
.coachmark[data-task="apply"] { inline-size: 20em; } /* 이 과업에서 가장 긴 지시 문구 기준, 모든 단계 동일 */
```
나쁜 예 — 단계마다 팝오버 너비가 달라진다.
```css
.coachmark { inline-size: max-content; } /* 단계마다 문구 길이에 따라 너비가 바뀜 */
```

## LAYOUT-059 음성지원

- 강도: **SHOULD**
- 룰: 페이지 단위 음성지원 버튼은 페이지 상단 또는 주요 제목(h1) 옆에, 영역 단위 음성지원 버튼은 해당 카드·소제목·약관 등 정보 단위의 제목 옆에 둔다.
- 측정 기준: (1) 페이지 단위 버튼이 h1과 같은 헤딩 영역(같은 부모 컨테이너) 안 또는 main 첫 블록에 있다. (2) 영역 단위 버튼이 낭독 대상 영역 안에 있고 그 영역 제목 요소의 다음 형제(또는 제목 줄 안)에 있다.
- 판정 방법: 음성지원 버튼이 있는 화면에서 DOM 위치를 확인한다.
- 자동 검사: none
- 적용 대상: 음성지원 버튼
- 근거: 버튼이 낭독 대상 가까이에 있어야 무엇을 읽어 주는지 알 수 있다.
- 출처: KRDS 컴포넌트 > 음성지원 > 유형

좋은 예 — 페이지 단위 음성지원 버튼이 h1 옆에 있다.
```html
<div class="page-title"><h1>전입신고 안내</h1><button type="button" class="tts">이 페이지 듣기</button></div>
```
나쁜 예 — 페이지 단위 음성지원 버튼이 푸터에 있다.
```html
<h1>전입신고 안내</h1>
…
<footer><button type="button" class="tts">이 페이지 듣기</button></footer>
```

## LAYOUT-005 칼럼 수 혼용 금지

- 강도: **MAY**
- 룰: 한 화면(같은 뷰포트 너비) 안에서는 레이아웃 그리드의 칼럼 수를 하나로 통일한다.
- 측정 기준: 같은 뷰포트 너비에서 페이지의 레이아웃 그리드 컨테이너(본문·카드 목록 등 칼럼 그리드를 쓰는 요소)가 모두 같은 칼럼 수(grid-template-columns의 트랙 수 또는 그리드 시스템의 칼럼 클래스 기준)를 쓴다.
- 판정 방법: 각 브레이크포인트에서 개발자 도구 그리드 오버레이로 그리드 컨테이너의 칼럼 수를 비교한다.
- 자동 검사: none
- 적용 대상: 레이아웃 그리드, [style*=grid-template-columns]
- 근거: 한 화면에서 칼럼 수가 섞이면 요소 정렬선이 어긋나 시각적 일관성이 깨진다(KRDS 칼럼).
- 출처: KRDS 디자인 스타일 > 레이아웃 > 칼럼 (가이드라인 PDF 2025.08 142쪽)

좋은 예 — 같은 뷰포트 너비의 모든 그리드가 같은 칼럼 수 토큰을 쓴다.
```css
:root { --layout-columns: 4; } /* 모바일 4칸 */
@media (min-width: 1024px) { :root { --layout-columns: 12; } } /* PC 12칸 */
.page-grid, .card-grid { display: grid; grid-template-columns: repeat(var(--layout-columns), 1fr); column-gap: var(--space-gap-7); }
/* --layout-columns는 브레이크포인트마다 하나의 값 */
```
나쁜 예 — 한 화면에서 칼럼 수가 달라 정렬선이 어긋난다.
```css
.page-grid { display: grid; grid-template-columns: repeat(12, 1fr); }
.card-grid { display: grid; grid-template-columns: repeat(5, 1fr); } /* 같은 1280px 화면에 12칼럼과 5칼럼이 섞임 */
```

## LAYOUT-006 거터 상한

- 강도: **MAY**
- 룰: 레이아웃 그리드의 거터(칼럼 사이 간격)를 칼럼 너비의 절반 이하로 둔다.
- 측정 기준: 각 브레이크포인트에서 레이아웃 그리드의 column-gap 계산값 ≤ 칼럼 트랙 너비 × 0.5.
- 판정 방법: 360·768·1024·1280px에서 개발자 도구 그리드 오버레이로 칼럼 트랙 너비와 column-gap을 읽어 비교한다.
- 자동 검사: none
- 적용 대상: 레이아웃 그리드
- 근거: 거터가 칼럼보다 지나치게 넓거나 좁으면 요소 사이 관계가 흐려진다(KRDS 가터).
- 출처: KRDS 디자인 스타일 > 레이아웃 > 가터 (가이드라인 PDF 2025.08 143쪽)

좋은 예 — 거터가 칼럼 너비의 절반 이하다.
```css
.grid { display: grid; grid-template-columns: repeat(12, 1fr); column-gap: var(--space-gap-7); }
/* 1200px 컨테이너: 칼럼 약 78px, 거터 24px ≤ 39px */
```
나쁜 예 — 거터가 칼럼 너비의 절반을 넘는다.
```css
.grid { display: grid; grid-template-columns: repeat(4, 40px); column-gap: var(--space-gap-8); }
/* 거터 32px > 칼럼 40px × 0.5 = 20px */
```

## LAYOUT-008 상세 정보 단일 화면

- 강도: **MAY**
- 룰: 상세 정보 페이지는 본문을 탭으로 나누지 않고 한 화면에 이어서 제공하며, 주요 단락 이동은 콘텐츠 내 탐색으로 한다.
- 측정 기준: 상세 정보 페이지의 main 안에 본문 섹션을 전환하는 [role=tablist]가 없다. 섹션이 여러 개면 콘텐츠 내 탐색(목차 링크)으로 이동한다.
- 판정 방법: 상세 정보 페이지 템플릿에서 main 안 tablist 유무를 확인하고, 있으면 예외 사유(아래 exceptions)에 해당하는지 수동 판단한다.
- 자동 검사: partial (custom)
- 적용 대상: 상세 정보 페이지
- 예외: 내용이 한 화면에 담기에 복잡하거나 섹션 간 성격이 달라 사용자가 섹션을 비교하며 볼 필요가 없을 때는 탭을 쓸 수 있다(KRDS 상세 정보 확인 > 유형 > 탭).
- 근거: 상세 정보를 탭으로 나누면 숨은 탭의 정보를 놓치고 섹션 간 비교가 어려워진다.
- 출처: KRDS 기본 패턴 > 상세 정보 확인 > 사용성 가이드라인 (가이드라인 PDF 2025.08 813쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 445쪽)

좋은 예 — 상세 정보를 한 화면에 이어 두고 목차 링크로 단락을 이동한다.
```html
<main>
  <h1>청년 월세 지원</h1>
  <nav aria-label="이 페이지 목차"><a href="#target">지원 대상</a> <a href="#how">신청 방법</a></nav>
  <section id="target"><h2>지원 대상</h2>…</section>
  <section id="how"><h2>신청 방법</h2>…</section>
</main>
```
나쁜 예 — 비교하며 읽을 상세 정보를 탭으로 나눠 '신청 방법'이 숨는다.
```html
<main>
  <h1>청년 월세 지원</h1>
  <div role="tablist"><button role="tab" aria-selected="true">지원 대상</button><button role="tab" aria-selected="false">신청 방법</button></div>
  <div role="tabpanel">…</div>
</main>
```

## LAYOUT-022 플로팅 버튼

- 강도: **MAY** (판정에 사람의 판단 필요: guide)
- 룰: 플로팅 버튼은 사용자가 반복하는 주요 행동이 하나일 때만 쓰고, 주요 행동이 여럿이거나 지도·캘린더·이미지 편집처럼 제스처 조작이 많은 화면에서는 쓰지 않는다.
- 측정 기준: 점검 질문: 이 화면에서 사용자가 반복 수행하는 주요 행동이 하나인가? 화면이 지도·캘린더·이미지 편집 등 제스처 중심인가? 주요 행동이 여럿이면 메뉴·탭바를 검토했는가?
- 자동 검사: none
- 적용 대상: 플로팅 버튼
- 근거: 여러 행동을 플로팅 버튼에 넣으면 혼란스럽고, 제스처 화면에서는 손동작과 콘텐츠를 가린다.
- 출처: KRDS 컴포넌트 > 플로팅 버튼 > 용례

좋은 예 — 반복되는 주요 행동이 하나인 화면에만 플로팅 버튼을 쓴다.
```
민원 목록 화면에 반복 주요 행동인 '새 민원 작성' 플로팅 버튼 하나만 둔다.
```
나쁜 예 — 제스처 조작이 많은 지도 화면에 플로팅 버튼을 썼다.
```
지도 기반 시설 찾기 화면에 '현재 위치' 플로팅 버튼을 띄워 지도 드래그·확대 영역을 가린다.
```

## LAYOUT-031 달력

- 강도: **MAY**
- 룰: 정기적으로 갱신되지 않는 정보나 한 달 이벤트가 2개 이하인 정보에는 달력 컴포넌트를 쓰지 않는다.
- 측정 기준: 달력 컴포넌트를 쓰는 화면마다 (1) 표시 데이터의 월별 이벤트 수 중 3개 이상인 달이 있고, (2) 데이터에 정기 갱신 일정(운영 계획상 주기)이 있다. 둘 중 하나라도 아니면 위반.
- 판정 방법: 달력 데이터 원천과 운영 계획을 확인한다.
- 자동 검사: none
- 적용 대상: 달력
- 근거: 이벤트가 적거나 갱신되지 않는 정보에 달력을 쓰면 빈칸이 대부분이라 정보 밀도가 낮고 탐색이 늘어난다.
- 출처: KRDS 컴포넌트 > 달력 > 용례 (가이드라인 PDF 2025.08 368쪽)

좋은 예 — 정기 갱신되고 월 이벤트가 3개 이상인 데이터에 달력을 쓴다.
```
매주 갱신되는 문화행사 일정(월 12건 안팎)을 달력 컴포넌트로 보여 준다.
```
나쁜 예 — 월 이벤트가 2개 이하인 데이터에 달력을 썼다.
```
1년에 2번 있는 정기 시험 일정(월 0~1건)을 달력 컴포넌트로 보여 준다.
```

## LAYOUT-033 디스클로저

- 강도: **MAY**
- 룰: 한 섹션에는 디스클로저를 1개만 둔다.
- 측정 기준: 같은 섹션(같은 h2·h3 헤딩 아래 영역) 안 디스클로저(details 또는 aria-expanded 디스클로저 버튼) 수 ≤ 1. 연속 배치된 디스클로저가 없다.
- 판정 방법: 섹션별 디스클로저 수를 센다.
- 자동 검사: partial (custom)
- 적용 대상: details, 디스클로저
- 근거: 디스클로저를 연속으로 두면 복잡성이 커져 오히려 혼동을 준다.
- 출처: KRDS 컴포넌트 > 디스클로저 > 사용성 가이드라인 (가이드라인 PDF 2025.08 382·384쪽)

좋은 예 — 한 섹션에 디스클로저가 하나다.
```html
<section><h2>신청 자격</h2>
  <p>만 19~34세 무주택 청년</p>
  <details><summary>소득 기준 자세히 보기</summary>…</details>
</section>
```
나쁜 예 — 한 섹션에 디스클로저 2개가 연달아 있다.
```html
<section><h2>신청 자격</h2>
  <details><summary>소득 기준 자세히 보기</summary>…</details>
  <details><summary>재산 기준 자세히 보기</summary>…</details>
</section>
```

## LAYOUT-036 아코디언

- 강도: **MAY**
- 룰: 상위나 하위 요소에 이미 아코디언이나 탭이 있으면 아코디언을 쓰지 않는다.
- 측정 기준: 아코디언 패널 안에 다른 아코디언·[role=tablist]가 없고, 아코디언이 다른 아코디언 패널이나 [role=tabpanel] 안에 있지 않다.
- 판정 방법: DOM에서 아코디언 조상·자손을 확인한다.
- 자동 검사: full (custom)
- 적용 대상: 아코디언, 탭
- 근거: 콘텐츠를 숨기는 컴포넌트를 겹치면 사용자가 표시 여부를 여러 번 판단해야 해 인지 부담이 커진다.
- 출처: KRDS 컴포넌트 > 아코디언 > 용례 (가이드라인 PDF 2025.08 406쪽)

좋은 예 — 아코디언이 다른 아코디언·탭 안에 있지 않다.
```html
<section><h2>자주 묻는 질문</h2>
  <div class="accordion"><h3><button type="button" aria-expanded="false" aria-controls="q1">신청 자격이 어떻게 되나요?</button></h3><div id="q1" hidden>…</div></div>
</section>
```
나쁜 예 — 탭 패널 안에 아코디언을 중첩했다.
```html
<div role="tabpanel" aria-labelledby="tab-faq">
  <div class="accordion">…</div>
</div>
```

## LAYOUT-044 표

- 강도: **MAY**
- 룰: 표에 세로 열 구분선을 쓰지 않는다.
- 측정 기준: table의 th·td에 border-left·border-right(또는 border-inline) 계산값이 0이다. 행 구분선(border-bottom)은 대상 아님.
- 판정 방법: 개발자 도구로 셀 테두리 계산값을 확인한다.
- 자동 검사: partial (stylelint/ux-baseline/table-cell-no-vertical-border)
- 적용 대상: table, th, td
- 예외: 반드시 필요한 경우에는 열 구분선을 쓸 수 있다(KRDS 원문).
- 근거: 열 구분선은 시각적 복잡성을 높인다.
- 출처: KRDS 컴포넌트 > 표 > 사용성 가이드라인 (가이드라인 PDF 2025.08 462·464쪽)

좋은 예 — 세로 열 구분선 없이 행 구분선만 쓴다.
```css
td, th { border-inline: 0; border-block-end: 1px solid var(--color-border-gray-light); } /* 행 구분선만 */
```
나쁜 예 — 모든 셀에 좌우 테두리가 있어 세로 열 구분선이 생긴다.
```css
td, th { border: 1px solid var(--color-border-gray-light); } /* 세로 열 구분선 포함 */
```

## LAYOUT-050 토글 스위치

- 강도: **MAY**
- 룰: 넓은 컨테이너 안의 토글 스위치는 레이블을 스위치 바로 옆에 붙여 두고, 레이블과 스위치를 컨테이너 양 끝으로 떼어 놓지 않는다.
- 측정 기준: 토글 레이블과 스위치 사이에 다른 요소가 없고, 둘 사이 간격이 컨테이너 너비에 따라 늘어나지 않는다(justify-content: space-between, margin-inline-start: auto 등으로 양 끝 배치하지 않음).
- 판정 방법: 넓은 화면(1280px)과 좁은 화면(360px)에서 레이블-스위치 간격이 같은지 확인한다.
- 자동 검사: none
- 적용 대상: 토글 스위치, [role=switch]
- 예외: 행 전체를 클릭 영역으로 만든 목록형 설정 화면: 레이블 왼쪽 끝, 스위치 오른쪽 끝 배치 허용(CF-013).
- 결정 CF-013: 행 전체를 클릭 영역으로 만든 목록형 설정 화면에서는 레이블을 왼쪽 끝, 스위치를 오른쪽 끝에 둘 수 있다. 그 밖에는 LAYOUT-050을 따른다.
- 근거: 레이블과 스위치가 멀리 떨어지면 두 요소의 관계를 파악하기 어렵다(저시력 확대 사용자는 둘을 동시에 보지 못함).
- 출처: KRDS 컴포넌트 > 토글 스위치 > 사용성 가이드라인 (가이드라인 PDF 2025.08 573·576쪽)

좋은 예 — 레이블과 스위치 간격이 컨테이너 너비와 관계없이 고정된다.
```css
.toggle { display: inline-flex; align-items: center; gap: var(--space-gap-3); } /* 레이블 바로 옆에 스위치 */
```
나쁜 예 — 레이블과 스위치를 컨테이너 양 끝으로 떼어 놓았다.
```css
.toggle { display: flex; justify-content: space-between; inline-size: 100%; } /* 1280px에서 레이블과 스위치가 1000px 넘게 떨어짐 */
```
