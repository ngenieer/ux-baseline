# 변경 기록 — ux-baseline

버전 규칙
- 메이저: MUST 룰 추가·강화, 토큰 이름 변경·삭제처럼 기존 프로젝트 검사가 새로 실패할 수 있는 변경
- 마이너: SHOULD·MAY 룰·컴포넌트 규격·토큰 추가, 검사 추가(경고)
- 패치: 문구·예시·오탐 수정
0.x 동안은 마이너 버전에서도 검사가 강화될 수 있다.

## 0.2.1 — 2026-10-19
공개 저장소(github.com/ngenieer/ux-baseline)로 옮긴 첫 판. 룰·검사 내용은 0.2.0 과 같다.
- 라이선스: 코드 MIT, 룰·결정·규격·문서 CC BY 4.0 (LICENSE). 제3자 자료 조건과 출처 표기는 NOTICE.md
- 설치 주소를 `github:ngenieer/ux-baseline` 로 바꿈

## 0.2.0 — 2026-10-18
공개 전 정비. 기존 프로젝트의 `check` 가 새로 실패할 수 있다(0.x 라 마이너 버전으로 올림).

검사 (`ux-baseline check`)
- 스크립트로 바뀌는 상태 검사 `states`(재현 단계: click·fill·check·select·press·waitFor·wait, page 에 쿼리·해시 허용) — 상태마다 axe-core·320px·초점, 렌더된 DOM 에 html-validate
- 새 검사: COPY-001 감각 표현 후보(경고), STATE-032 입력 중 이탈 확인(경고), STATE-002 1초 미만 진행 표시 깜빡임(경고), A11Y-007 기호 없앤 목록의 role="list"(오류), TYPO-014 배지 nowrap(경고), LAYOUT-020 버튼 그룹 크기(경고)
- 브라우저 동작 검사를 rule-map 도구 `ux-baseline-check` 로 등록(룰 ↔ 검사 대응의 정본을 룰 YAML 로)
- 오탐 수정: 마우스 단계 뒤 초점 표시 판정, MOTION-010 의 `0s`, html-validate prefer-native-element 의 role="list"
- 토큰 규칙 메시지에 속성·값 표시

룰
- KRDS 를 출처로 쓴 확정 룰 약 400개를 가이드라인 PDF(2025.08)와 대조 — 쪽 번호 기록, 원문과 다른 룰 9개 수정(예: NAV-044 숫자 링크 10개, NAV-027 브레드크럼 1수준, COPY-046 강도 MAY)
- 측정 기준이 모호한 룰 27개 정비(시험 3·4 독립 검토), 결정 CF-065~070 추가, CF-066 정정
- 컴포넌트 규격: 목록 8개에 role="list", spinner 의 progressbar 이름·설명 연결

## 0.1.0 — 2026-10-18
첫 배포.
- 확정 룰 484개(MUST 68), 충돌 결정 CF-001~064, 컴포넌트 규격 56개
- `tokens.css`·`base.css`, stylelint·html-validate·axe-core 설정(검사 185개 중 130개 설정 반영)
- `ux-baseline init`·`check`·`update`
