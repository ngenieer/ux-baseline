# 2단계 정규화 후속 과제 (batch1, 2026-10-18)

정규화 에이전트 10개가 남긴 제안 중 아직 반영하지 않은 것입니다. 3단계 전에 처리합니다.

## 1. 카테고리 재검토 제안

ID는 바꿀 수 없으므로, 옮기려면 새 카테고리에 새 ID를 만들고 기존 룰을 `superseded_by`로 폐기해야 합니다.
카테고리가 달라도 룰 내용과 검사는 그대로 동작하므로, 4단계 산출물(카테고리별 상세 파일)에서 혼란이 생기는 경우만 옮기기로 합니다.

| ID | 제안 | 이유 | 묶음 |
|---|---|---|---|
| MOTION-003 | STATE | 확정 스피너의 채움 동작 규격. 스피너 룰(STATE-019~023)과 같은 컴포넌트라 STATE가 맞아 보임. | AIPERF |
| MOTION-012 | PERF | 근거가 CLS·렌더링 성능(web.dev Optimize CLS)이고 모션 접근성과 무관. | AIPERF |
| COPY-041 | STATE | 도움 패널 첫 화면(기본 상태·탭 선택) 규칙 — 문구보다 컴포넌트 초기 상태. STATE-024(다시 열 때 마지막 콘텐츠)와 같은 묶음. | COPY |
| COPY-047 | STATE | 코치마크 개수·단계 수 상한 — STATE-029(동시 1개)와 같은 묶음. | COPY |
| COPY-048 | NAV | 툴팁과 맥락적 도움말·도움 패널 혼용 금지 — 컴포넌트 선택 규칙. 비슷한 NAV-062(맥락적 도움말·도움 패널 동시 사용 금지)와 같은 카테고리가 맞음. | COPY |
| COPY-043 | NAV | 도움 패널 대신 맥락적 도움말·따라하기 패널을 쓰는 조건 — 컴포넌트 선택 규칙(COPY-044, COPY-045도 같은 성격). | COPY |
| COPY-012 | LAYOUT | 공식 배너 사용 조건 — 문구보다 컴포넌트 사용 여부(LAYOUT-009 공식 배너 위치와 같은 묶음). COPY-014(운영기관 식별자)도 같음. | COPY |
| COPY-010 | LAYOUT | 안내 영역·긴급 공지 개수 — 화면 구성 규칙. | COPY |
| FORM-040 | NAV | 태그는 KRDS에서 필터링·정렬 옵션 표시·해제용 컴포넌트로 정의됨(용례). 입력 컨트롤이 아니라 NAV-052(필터 표시에 태그)와 같은 맥락. | FORM1 |
| LAYOUT-045 | A11Y 또는 NAV | 표 행·셀을 대화형으로 만들지 않기는 배치가 아니라 상호작용·키보드 접근 문제. | LAYOUT |
| LAYOUT-055 | TYPO | 파일명 한 줄 표시·말줄임은 텍스트 넘침 처리(TYPO의 줄바꿈 룰군과 같은 성격). | LAYOUT |
| LAYOUT-048 | FORM 또는 NAV | 태그 개수 최소화는 필터·분류 UI 설계 문제(NAV-052·FORM-040과 같은 태그 룰군). | LAYOUT |
| LAYOUT-031 | FORM 또는 NAV | 달력 컴포넌트 사용 여부(용례) 판단 — 배치 룰이 아님. 다른 '컴포넌트 선택' 룰(FORM-041~046)과 같은 성격. | LAYOUT |
| NAV-014 | LAYOUT | 콘텐츠 내 탐색의 화면 위치·고정 여부를 정하는 배치 룰 | NAV1 |
| NAV-015 | LAYOUT | 헤더 유틸리티 링크의 위치·디바이더 시각 구분 룰 | NAV1 |
| NAV-011 | LAYOUT | 정렬 컨트롤의 위치 룰(근거도 위치 일관성) — NAV 유지도 무방 | NAV1 |
| NAV-050 | LAYOUT | 표 기본 정렬 상태 — 같은 KRDS 표 페이지 룰은 LAYOUT-043~045, TYPO-015~016, STATE-018에 있음. 탐색이 아닌 데이터 표시 규칙. | NAV2 |
| NAV-051 | FORM | 커스텀 셀렉트 상호작용 — 셀렉트 룰은 FORM-036~039, A11Y-036~038에 있음. | NAV2 |
| NAV-052 | FORM | 태그/배지 선택 — 태그 룰은 FORM-040, A11Y-039, COLOR-019, COPY-031, LAYOUT-048~049에 있음. | NAV2 |
| STATE-016 | NAV | 캐러셀 탐색 컨트롤 표시 조건 — 피드백·상태보다 내비게이션 컴포넌트 규격에 가까움. | STATE |
| STATE-014 | LAYOUT 또는 COPY | 배지 개수 제한은 로딩·에러·빈 화면 상태와 무관. 카테고리 목록에 '컴포넌트 규격' 성격 카테고리가 없음. | STATE |
| STATE-015 | A11Y 또는 NAV | 아코디언 펼침 아이콘 — 상태 표시이긴 하나 STATE(로딩·에러·빈 화면) 정의와 거리 있음. | STATE |
| STATE-010 | LAYOUT | 디스클로저 초기 상태(정보 노출 구조). | STATE |
| STATE-024 | NAV | 도움·따라하기 패널 상태 유지(같은 컴포넌트의 NAV-059 등과 묶임). | STATE |
| STATE-029 | COPY | 코치마크 계열 COPY-046·047, NAV-063, COLOR-021, LAYOUT-058과 흩어져 있음 — 4단계 컴포넌트 규격에서 묶어야 함(카테고리 이동은 선택). | STATE |
| TYPO-012 | COPY | 푸터 정책 링크 표시 규칙. 글자 스타일보다 푸터 구성·고지 의무에 가깝고 COPY-017과 짝. | TYPOCOLOR |
| TYPO-015 | COPY | 표 셀 텍스트 분량(3줄) 제한 — 글 쓰는 분량 규칙. | TYPOCOLOR |
| TYPO-016 | LAYOUT | 표 열 정렬 — 표 컴포넌트 배치 규격. | TYPOCOLOR |
| COLOR-015 | LAYOUT | 버튼 강조 단계(채움·윤곽선·텍스트) — 색보다 컴포넌트 변형 위계. LAYOUT-020과 짝. | TYPOCOLOR |
| COLOR-016 | LAYOUT | 버튼 그룹 아이콘 사용 — 색과 무관. | TYPOCOLOR |
| COLOR-021 | LAYOUT | 코치마크 버튼 변형 지정 — 색보다 컴포넌트 구성. | TYPOCOLOR |

## 2. 새 룰 후보로 제안된 것 (1단계 수집에서 빠졌거나 잘못 병합된 요구)

- [norm_A11Y] A11Y-014: 1단계에 '같은 요구'로 붙어 있던 KRDS 토스트 출처(2~4초 자동 사라짐, KRDS-components D:109)는 같은 요구가 아니라 BACKLOG의 충돌 후보(토스트 vs A11Y-014)라서 sources에서 뺐다. 토스트 표시 시간 룰은 STATE 쪽에 별도 룰로 수집할지 검토 필요(현재 어느 룰에도 없음).
- [norm_A11Y] A11Y-053: 원 statement에 강도가 다른 두 요구가 섞여 있어(병용 금지='하지 않는다', title 대신 툴팁 우선='좋다') 병용 금지만 남김. 'title 속성 대신 툴팁 컴포넌트 우선'(MAY)은 새 룰 후보 — 새 ID 부여는 오케스트레이터 판단.
- [norm_A11Y] A11Y-010: 1단계에 병합된 CSS_MQ4·Understanding 1.4.13 출처의 요구('정보·기능을 호버로만 드러내지 않기, 호버 효과는 @media (hover: hover)로 감싸기')는 1.4.13(추가 콘텐츠 닫기·머무르기·유지)과 일부만 겹친다. 별도 룰(A11Y 또는 RESP)로 분리하는 안을 제안 — 이번에는 출처만 유지.
- [norm_AIPERF] 새 룰 후보(MOTION, SHOULD): prefers-reduced-motion: reduce일 때 동영상·캐러셀·애니메이션 이미지를 자동 재생하지 않고 사용자가 재생해야 시작 — 출처 WEBDEV_PRM(자동 재생 동영상 자제). MOTION-001에서 뗌(2.2.2는 정지 수단 요구이지 reduce 연동 요구가 아님).
- [norm_AIPERF] 새 룰 후보(MOTION 또는 STATE, SHOULD): 스켈레톤 반짝임(shimmer)·맥동(pulse)·불확정 진행 표시 이동 애니메이션은 reduce에서 정지 또는 불투명도 변화로 — 출처 NNG_SKELETON, WCAG22_TECH_C39, MQ5. MOTION-001에서 뗌. MOTION-004·006과 refines.
- [norm_AIPERF] 새 룰 후보(AI, SHOULD): AI 생성 중 입력창 또는 응답 영역에 생성 중단 버튼을 보이게 두고, 누르면 생성을 멈추되 이미 생성된 부분은 남긴다 — 출처 HAX_GUIDELINES_POSTER G8(G17 간접). MOTION-001에서 뗌. AI-008(중단 표시)이 이 룰을 depends로 가져야 함.
- [norm_AIPERF] 새 룰 후보(RESP 또는 A11Y, SHOULD/AAA): 터치가 감지돼도 마우스·키보드·펜 입력과 그 입력용 UI를 없애지 않음 — 출처 WCAG22_UNDERSTANDING 2.5.6 Concurrent Input Mechanisms(AAA), CSS_MQ4 4.4. RESP-017에서 뗌.
- [norm_AIPERF] KRDS 추출본에서 MOTION-001로 병합 표시된 항목 중 같은 요구가 아닌 것(별도 룰 후보): C:112 불확정 스피너 루프를 멈추지 않음(KRDS 스피너, conflicts 참조), D:137 스플래시 스크린에 중요 정보 금지(component_04_12 '스플래시 스크린에 중요한 정보를 포함하지 않는다' curl 확인), B:85 키보드 초점 진입·마우스 오버 시 캐러셀 자동 재생 멈춤, 키보드로 멈춘 경우 재생 버튼 전까지 재시작 안 함(component_04_09).
- [norm_AIPERF] MOTION-005에서 뺀 부분(MAY 후보): matchMedia change 이벤트로 실행 중 설정 변경을 반영 — SCR40 원문에 없음, 출처 PREFERENCE.
- [norm_AIPERF] RESP-014에서 뺀 부분(MAY 후보): 외국어 콘텐츠 이용 빈도가 높거나 언어 변경이 중요한 서비스는 언어 변경 버튼을 푸터에 둔다 — KRDS '좋다'.
- [norm_AIPERF] PERF-011 원문의 다른 권고(별도 후보): 새 콘텐츠로 교체하는 전환 중에는 링크·컨트롤을 비활성화해 오클릭을 막는다 — WEBDEV_OPT_CLS. FORM-013(제출 중복 방지)과는 다른 요구.
- [norm_AIPERF] NAV2 담당 제안(AI 답변 근거 문장·단락마다 출처 링크)은 AI-001~018에 같은 요구가 없음을 재확인 — 새 AI 룰 후보로 등록 필요(출처 PAIR는 reference_system).
- [norm_AIPERF] STATE-001 하위 사례(AI 대화 role=log, 스트리밍 aria-busy, 완료·중단·실패 status 문구)를 AI 룰로 분리하면 AI-008(중단 표시)·AI-015(assertive 금지)와 refines 관계.
- [norm_COPY] 별도 룰 후보 1 (COPY-003에서 분리): 'UI 문구에 일반화되지 않은 약어·전문용어를 쓰지 않고, 써야 하면 처음 나올 때 풀어 쓴다.' 근거 KR_ADMIN_REG 제7조②(verified:false), WEBDEV_OFFLINE. 1단계에서 WCAG 2.4.6 룰에 '같은 요구'로 병합됐으나 요구가 다름. 출처는 COPY-003에 note를 '관련 요구'로 고쳐 남겨 둠 — 새 COPY 룰로 분리할지 결정 필요.
- [norm_COPY] 별도 룰 후보 2 (COPY-027에서 분리): '서비스 전체 UI 문구의 문장 종결 어미를 하나의 높임 등급(해요체 또는 합쇼체)으로 정해 통일한다.' 직접 근거 없음(PREFERENCE 수준, GOVUK_ERROR_MESSAGE는 간접). COPY-027 출처 note를 '직접 근거 아님'으로 정정해 둠.
- [norm_COPY] 별도 룰 후보 3 (COPY-009에서 분리, AI 카테고리): 'AI 결과 근처에 AI 결과가 틀릴 수 있다는 한계 고지를 보이는 텍스트로 둔다.' HAX G2·PAIR·APPLE 출처. COPY-009(필수 정보 숨김 금지, KRDS)와는 다른 요구 — AI 담당이 AI-005 등과 비교 필요. 출처는 COPY-009에 '적용 사례'로 남겨 둠.
- [norm_COPY] 별도 룰 후보 4 (COPY-049 원문의 다른 요구): KRDS 툴팁 플랫폼 고려 사항 '터치 인터페이스가 감지되면 활성화 버튼의 Click 이벤트로 팝오버를 토글'. 동작 규칙이라 COPY가 아닌 STATE/A11Y 후보.
- [norm_COPY] COPY-046·COPY-047: 한 룰 안에 KRDS 강도가 다른 두 요구가 섞임(제목 1줄 '가능한 한' vs 지시 사항 3줄 단정형 / 페이지당 4개 '이상적' vs 15단계 단정형). 정본 강도는 강한 쪽(SHOULD)으로 두었고, 약한 조건을 MAY 룰로 분리할지 3단계 검토.
- [norm_FORM1] 1단계에서 다른 요구가 같은 룰에 출처로 붙어 있던 것을 떼어냄(정본 룰에서 출처 삭제). 담당 카테고리에서 별도 룰로 수집할지 검토 필요: (a) FORM-006에서 PAIR_GUIDEBOOK(Errors + Graceful Failure / Explainability + Trust — high stakes)·HAX_GUIDELINES_POSTER(G10, G16) —
    'AI가 사용자 대신 전송·게시·결제·삭제·예약을 실행하기 전에 내용을 보여주고 사용자가 실행 버튼으로 확정' → AI 카테고리 신규 룰 후보
    (BACKLOG 'AI 대행 동작 전 확인 vs STATE-003'과 같은 주제. 현재 그 요구를 정본으로 가진 AI 룰이 없음).
(b) FORM-007에서 HAX_GUIDELINES_POSTER(G9)·APPLE_WWDC25_248(오류 프롬프트 되돌리기) — 'AI 프롬프트를 수정해 다시 실행할 때 원래 입력을 입력창에 채워 둠'
    → AI 카테고리 신규 룰 후보(AI-009 재생성·AI-010 결과 편집과는 다름).
(c) FORM-016에서 WCAG22_UNDERSTANDING(Understanding 2.2.5 Re-authenticating, AAA)·WCAG22_TECHNIQUES(F12) —
    '세션 만료 후 재인증하면 입력하던 데이터를 잃지 않고 이어서 진행' → A11Y 또는 STATE 신규 룰 후보(WCAG AAA → SHOULD). COPY-054(만료 후 저장 여부 문구)와 관련.
    Understanding 2.2.5 'Users do not lose information or context due to reauthentication', F12 제목은 curl로 확인.
(d) FORM-023에서 KR_HANGUL_ORTHO(제43항 해설·제44항) — '숫자 뒤 단위 명사는 붙여 쓰고 큰 수는 만 단위로 띄어 쓴다' → COPY 신규 룰 후보(표기법).
- [norm_FORM1] 원문 대조 중 확인했으나 FORM-001~040 어디에도 없는 KRDS 요구(수집 누락 후보): 입력폼 섹션마다 <h2>~<h6> 제목 제공(global_08 접근성) / 개인 식별 정보 수집 필요성 확인·용도 설명(global_01) / 전화번호 유형별 명확한 레이블('휴대 전화번호'), 국가 코드 콤보박스, 여러 번호 구분 레이블·주 번호 지정(global_01) / 로마자 이름 필드 너비 '최소 320~360px 이상'(global_01 — FORM-056 필드 너비의 출처 후보) / 모달 안 다중 파일 업로드 금지(component_09_04 — 1단계에서 FORM-011에 묶였으나 다른 요구, FORM-065·066 쪽) / 체크박스 전체 선택 옵션의 중간(indeterminate) 상태 표시(component_06_02 — 1단계에서 FORM-025에 묶였으나 다른 요구, FORM-042 쪽 출처 후보) / 필수 입력 표시를 이미지로 할 때 대체 텍스트(global_08 — FORM-012 측정 기준에 반영함) / 동의 약관 스크롤 영역 키보드 조작(global_03).
- [norm_FORM1] 강도 판단 메모: FORM-031은 KRDS 어미가 '우선적으로 고려해야 한다'(정책상 SHOULD)이나 의무 대상이 '검토'라 결과를 강제하지 않아 MAY로 둠(verification_note에 이유). FORM-014는 서버 검증 '반드시'(SHOULD)와 인라인 표시 '바람직'(MAY)이 한 룰에 섞여 있음 — 3단계에서 분리 검토.
- [norm_FORM2] FORM-074: 한 룰에 SHOULD('항상 표시해야')와 MAY('기본값은 최빈값이 적합') 강도가 섞임 — 3단계에서 기본값 부분 분리 검토.
- [norm_FORM2] 신규 룰 후보(이번에 만들지 않음): KRDS 날짜 입력 필드 접근성 '날짜 선택기를 써도 입력 필드를 사용 불가·읽기 전용으로 바꾸지 않는다', KRDS 파일 업로드 '파일을 자동으로 제출하지 않는다'·'오류 상태별 구체 메시지'·'모달에서 다중 파일 업로드 금지'·'드래그 앤 드롭은 파일 선택 버튼과 함께(A11Y-021 관련)', 범위 슬라이더 '핸들 드래그와 트랙 클릭으로 값 변경'. 1단계 수집 누락으로 보임.
- [norm_LAYOUT] LAYOUT-002: 1단계에 병합된 CSS_MQ4 출처의 '(pointer: coarse/fine)로 크기 조정, any-pointer·any-hover만으로 작은 대상·호버 전용 UI 금지'는 SC 2.5.8과 다른 요구 — RESP에 별도 룰로 분리 제안. 같은 문장이 A11Y-010에도 병합돼 있어(그 룰의 verification_note 참조) 함께 정리 필요.
- [norm_LAYOUT] LAYOUT-001: 1단계에 병합된 KRDS 항목 중 헤더 '2행 초과 헤더는 아래 스크롤 시 고정 해제·위 스크롤 시 고정'(component_02_03)과 토스트·스낵바 '화면 하단 중앙, 탭바·플로팅 버튼과 겹치지 않게'(component_12_05·12_06)는 SC 2.4.11과 다른 요구다. 전자는 LAYOUT-013을 구체화하는 새 LAYOUT 룰, 후자는 STATE 토스트·스낵바 위치 룰로 분리 제안(KRDS-components.yaml 원자료 key A:18, D:107, D:113).
- [norm_LAYOUT] 강도 판단이 갈리는 복합 룰(한 룰에 '해야 한다'와 '바람직하다'가 섞임): LAYOUT-024(플로팅 버튼 개수·깊이), LAYOUT-037(아코디언 아이콘 위치), LAYOUT-042(탭 중첩). 더 강한 표현을 룰 강도로 두고 verification_note에 적었다 — 3단계에서 분리 여부 검토.
- [norm_NAV1] KWCAG 6.4.2는 페이지뿐 아니라 프레임·콘텐츠 블록 제목도 요구 — NAV-002는 <title>만 다룸. iframe title 등은 새 A11Y 룰 후보(WCAG 4.1.2/2.4.1 H64와 연결).
- [norm_NAV2] NAV-046 1단계 출처 정리: PAIR_GUIDEBOOK·HAX_GUIDELINES_POSTER 출처(note: 'AI 답변의 문장·단락별 출처 링크, 자료의 해당 위치로 연결')는 링크 목적지 룰과 같은 요구가 아니어서 NAV-046에서 뺐다. AI 카테고리에 같은 요구 룰이 없음(AI-001~018 확인) — 새 AI 룰 후보로 수집 단계에 되돌리기를 제안: '외부 자료를 근거로 생성한 답변에는 근거 문장·단락마다 출처 링크를 붙이고 링크는 자료의 해당 위치로 연결한다' (출처 강도: PAIR는 reference_system, HAX 포스터 G11은 출처 표시를 직접 요구하지 않음 — 원 수집 메모도 그렇게 적음).
- [norm_NAV2] NAV-056에서 뺀 부분: '선택 단계는 모든 필수 단계 뒤에 둔다'는 원문이 '가능한 한 … 가장 마지막에 제공하는 것이 바람직하다'(권장)라 건너뛰기 수단(제공해야 한다)과 강도가 달라 분리함. 별도 MAY 룰로 수집할지 결정 필요.
- [norm_NAV2] NAV-069: KRDS 탭바 원문 헤딩은 '5개 이내', 같은 문단 근거는 '5개 이상의 메뉴가 있으면 화면이 복잡해지며' — 경계(5 포함 여부) 출처 내부 불일치. BACKLOG '출처 내부 불일치' 표 추가 후보.
- [norm_STATE] 새 룰 후보(AI): AI 결과마다 좋아요·싫어요 버튼 + 접근 가능한 이름 + aria-pressed — 출처 HAX_GUIDELINES_POSTER G15, PAIR_GUIDEBOOK(Errors+Graceful Failure), APPLE_WWDC25_248. STATE-004에서 뗌. BACKLOG의 'AI 결과별 좋아요·싫어요 vs STATE-004' 충돌 후보는 이 새 룰과 STATE-004 사이로 정리.
- [norm_STATE] 새 룰 후보(AI): AI가 제안한 변경을 사용자 데이터에 적용한 뒤 한 번의 조작으로 되돌리기 — 출처 HAX_GUIDELINES_POSTER G9, PAIR_GUIDEBOOK(let users revert). STATE-039에서 뗌.
- [norm_STATE] 새 룰 후보(STATE): 계획된 서비스 중단(503) 화면 — 503 상태, 재개 요일·날짜·시각, 영구 종료 시 대안, '점검 중'만 쓰고 재개 시각 생략 금지 — 출처 GOVUK_503, NA_ERROR_PAGES. STATE-007에서 뗌.
- [norm_STATE] 새 룰 후보(STATE): 빈 상태는 원래 컴포넌트 자리를 대체(헤더만 남은 빈 표 금지, 스크린 리더가 빈 표를 다 읽지 않게) — 출처 CARBON_EMPTY 'Empty states should replace the element'. STATE-017에서 뗌. STATE-041의 bad 예시와 연결.
- [norm_STATE] STATE-001의 하위 사례 출처(AI 스트리밍 role=log·aria-busy, AI 완료·중단·실패 role=status, 오프라인 알림, 낙관적 UI 실패 되돌리기, 뷰 전환으로만 정보 전달 금지)는 4.1.3의 구체 적용이라 STATE-001에 남기되 note를 '하위 사례(별도 룰 분리 후보)'로 고침. 각각 AI·STATE·MOTION 별도 룰로 분리 권장: (a) AI 대화 기록 role=log+이름+끝에만 추가(ARIA23, MDN_ARIA_LOG) (b) 스트리밍 중 aria-busy(MDN_ARIA_BUSY — STATE-046과 refines) (c) AI 완료·중단·실패 status 문구(MDN_ARIA_LIVE) (d) 오프라인·복구 텍스트+아이콘 알림(WEBDEV_OFFLINE) (e) 낙관적 UI(REACT_USEOPTIMISTIC) (f) 뷰 전환 정보의 DOM 대체(CSS_VIEW_TRANSITIONS_1).
- [norm_STATE] 새 룰 후보(STATE, SHOULD): live 컨테이너(role=status 등)를 메시지 삽입 전부터 DOM에 두고, 진행·완료 문구에는 role=alert/assertive를 쓰지 않음 — 출처 WAI_ARIA_12(status/alert), MDN_ARIA_LIVE, KRDS 스피너 접근성('assertive가 아닌 polite를 사용해야 한다'), WCAG22_UNDERSTANDING 4.1.3 실패 사례('role=alert … not important and time-sensitive'). WCAG 4.1.3 자체 요구가 아니라 STATE-001(MUST)에서 분리. AI-015(스트리밍에 assertive 금지)와 refines.
- [norm_STATE] 새 룰 후보(STATE): 10초 이상 걸릴 수 있는 작업에는 중단 수단 제공 — 출처 NNG_RESPONSE_TIMES 보강 절, NNG_PROGRESS('give users the option to stop the process'). STATE-020에 출처는 남겼으나 statement에서 뺌.
- [norm_STATE] 새 룰 후보(STATE, KRDS 사용자 피드백 패턴 global_05): 별점 선택지 5개 이하, 감정 평가 2지선다 권장, 맞춤 영역 추가 질문 최대 3개, 첫 질문은 폐쇄형, 개방형은 마지막 — 원문 확인 완료.
- [norm_STATE] 새 룰 후보(STATE, KRDS 긴급 공지 component_04_02): 긴급 공지는 1개만, 상세 링크 1개만, 문장 1줄(좁은 화면 2줄) 이내, 본문 첫 요소·전체 너비 배치 — 원문 확인 완료. 아직 다른 카테고리에 있는지 확인 필요.
- [norm_STATE] 새 룰 후보(STATE, KRDS 스피너): 불확정 스피너 루프를 멈추지 않는다 — 추출본에 있음(outcome 확인 필요).
- [norm_STATE] 새 룰 후보(STATE, KRDS 토스트): 토스트 노출 2~3초(정보형)/3~4초(주의·경고형), 화면 중앙 하단·탭바와 겹치지 않음 — BACKLOG의 '토스트 2~4초 vs A11Y-014·STATE-001' 충돌의 대상 룰 ID가 없음. 룰로 수집해야 3단계에서 CF 기록 가능.
- [norm_STATE] 새 룰 후보(STATE, Carbon): 여러 빈 상태가 한 화면에 함께 보이면 행동 버튼을 tertiary로(주 버튼 중복 방지); 처음 사용 빈 상태 제목은 긍정형(COPY 후보).
- [norm_STATE] STATE-041: 1단계 statement의 '사용자가 삭제해 비움' 유형은 Carbon·NN/g 어디에도 없어 뺐음. 필요하면 PREFERENCE 출처로 별도 룰 등록 여부를 사람이 결정.
- [norm_STATE] STATE-006: '피드백 메시지에 쓰지 않는다'는 KRDS '해서는 안 된다'(SHOULD), '홍보·일반 공지에 부적합'은 용례 서술(MAY 수준)인데 한 룰로 SHOULD. 3단계에서 분리 검토. STATE-033(닫기 포함 '하여야 한다' / 상단 배치 '좋다')도 같은 문제.
- [norm_TYPOCOLOR] 새 룰 후보(이번에 만들지 않음): (1) word-wrap 대신 overflow-wrap 이름 사용(CSS Text 3 §5.4 'legacy name alias'), (2) KRDS 버튼 '한 페이지에 최상위 강조 버튼은 한 번만', (3) KRDS 선명한 화면 모드 '헤더 유틸리티 링크에 윤곽선/배경색', (4) KRDS 색상 60-30-10 비율, (5) KRDS 태그 '색상으로 의미를 전달해서는 안 된다'(COLOR-001과 같은 요구라 COLOR-001 출처로 추가할지 검토).
- [kwcag-docx] 새 룰 후보(NAV 또는 STATE, SHOULD): KWCAG 2.2 7.2.1 해설 '레이어 팝업은 … 사용하지 않는 것이 바람직하다', '새 창/팝업창/레이어 팝업에 초점이 있을 때 닫음·종료 버튼으로 종료되어야 한다' — 공식 docx 확인(2026-10-18). 모달 규격(4단계)과 함께 검토.

## 3. 정책 보완 (반영함)

- 다른 카테고리 룰끼리 출처 강도가 같을 때의 정본 선택 기준 → `docs/normalization-policy.md` 1절
- KRDS 원문에 강도 표현이 없는 상호작용 표 → 2절 (`krds-descriptive` 태그, SHOULD)
