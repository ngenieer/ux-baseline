---
name: ux-baseline
description: 웹 UI(HTML/CSS/컴포넌트)를 만들거나 고치거나 검토할 때 쓴다. 접근성(WCAG 2.2·KWCAG 2.2)·한국어 웹·폼·내비게이션·상태 표시·AI 기능 UI 기준과 디자인 토큰 사용 규칙을 적용한다.
---

# ux-baseline — 웹 UI/UX 기준

1. 먼저 `references/core.md`를 읽는다. MUST 룰과 작업 방식(토큰만 사용, 자동 검사 후 보고)이 있다.
   프로젝트에 토큰·기본 스타일이 없으면 `assets/tokens.css`, `assets/base.css` 를 복사해 쓴다.
2. 만들 UI에 해당하는 카테고리 상세를 필요한 것만 읽는다:
   - `references/LAYOUT.md` — 레이아웃
   - `references/TYPO.md` — 타이포그래피
   - `references/COLOR.md` — 색상·대비
   - `references/SPACE.md` — 간격
   - `references/SHAPE.md` — 형태 (반경·그림자·엘리베이션·딤드)
   - `references/NAV.md` — 내비게이션
   - `references/FORM.md` — 폼·입력
   - `references/STATE.md` — 피드백·상태 (로딩·에러·빈 화면)
   - `references/A11Y.md` — 접근성
   - `references/RESP.md` — 반응형
   - `references/MOTION.md` — 모션
   - `references/COPY.md` — 문구·마이크로카피
   - `references/PERF.md` — 성능 체감
   - `references/AI.md` — AI 기능 (스트리밍·중단·재생성·출처·불확실성·오류와 답 없음 구분·검토 확정 흐름)
3. 규격이 있는 컴포넌트는 표준 마크업·CSS를 그대로 쓴다:
   - `references/components/accessible-media.md` — 접근 가능한 미디어
   - `references/components/accordion.md` — 아코디언
   - `references/components/back-button.md` — 뒤로가기 버튼
   - `references/components/badge.md` — 배지
   - `references/components/bottom-sheet.md` — 바텀시트
   - `references/components/breadcrumb.md` — 브레드크럼
   - `references/components/button.md` — 버튼
   - `references/components/calendar.md` — 달력
   - `references/components/carousel.md` — 캐러셀
   - `references/components/checkbox.md` — 체크박스
   - `references/components/coach-mark.md` — 코치마크
   - `references/components/contextual-help.md` — 맥락적 도움말
   - `references/components/critical-alert.md` — 긴급 공지
   - `references/components/data-table.md` — 표
   - `references/components/date-input.md` — 날짜 입력 필드
   - `references/components/disclosure.md` — 디스클로저
   - `references/components/error-summary.md` — 오류 요약
   - `references/components/feedback.md` — 사용자 피드백(만족도 평가)
   - `references/components/file-upload.md` — 파일 업로드
   - `references/components/floating-button.md` — 플로팅 버튼
   - `references/components/footer.md` — 푸터
   - `references/components/header.md` — 헤더
   - `references/components/help-panel.md` — 도움 패널
   - `references/components/identifier.md` — 운영기관 식별자
   - `references/components/image.md` — 이미지
   - `references/components/in-page-navigation.md` — 콘텐츠 내 탐색
   - `references/components/language-switcher.md` — 언어 변경
   - `references/components/link.md` — 링크
   - `references/components/main-menu.md` — 메인 메뉴
   - `references/components/masthead.md` — 공식 배너
   - `references/components/modal.md` — 모달
   - `references/components/pagination.md` — 페이지네이션
   - `references/components/prose.md` — 본문 텍스트 블록
   - `references/components/quantity-stepper.md` — 수량 토글
   - `references/components/radio-group.md` — 라디오 버튼
   - `references/components/range-slider.md` — 범위 슬라이드
   - `references/components/resize.md` — 화면 크기 조정
   - `references/components/select.md` — 셀렉트
   - `references/components/side-navigation.md` — 사이드 메뉴
   - `references/components/skip-link.md` — 건너뛰기 링크
   - `references/components/snackbar.md` — 스낵바
   - `references/components/spinner.md` — 스피너
   - `references/components/sr-only.md` — 숨긴 콘텐츠(스크린 리더 전용 텍스트)
   - `references/components/step-indicator.md` — 단계 표시기
   - `references/components/structured-list.md` — 구조화 목록
   - `references/components/tab-bar.md` — 탭바
   - `references/components/tabs.md` — 탭
   - `references/components/tag.md` — 태그
   - `references/components/text-area.md` — 텍스트 영역
   - `references/components/text-field.md` — 텍스트 입력 필드
   - `references/components/text-list.md` — 텍스트 목록
   - `references/components/toast.md` — 토스트
   - `references/components/toggle-switch.md` — 토글 스위치
   - `references/components/tooltip.md` — 툴팁
   - `references/components/tts.md` — 음성지원
   - `references/components/tutorial-panel.md` — 따라하기 패널
4. 룰끼리 부딪혀 보이면 룰에 적힌 결정(CF-###)을 따른다.
5. 결과물은 자동 검사기로 확인하고 위반을 고친 뒤, 실행한 검사와 결과를 보고한다.
   프로젝트에 `@sizlon/ux-baseline` 이 설치돼 있으면 `npx ux-baseline check` 가 모든 검사를 한 번에 돌리고
   위반을 룰 ID 와 함께 보고한다. 오류가 0이 될 때까지 고치고 다시 돌린다.
