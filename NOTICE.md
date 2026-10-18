# 출처 표기와 제3자 저작물

이 저장소는 아래 공개 자료를 근거로 만들었다. 각 자료의 이용 조건과 이 저장소가 지키는 방법을 적는다.
이 프로젝트는 행정안전부·한국지능정보사회진흥원(KRDS 운영), W3C, 국립전파연구원, 과학기술정보통신부와 관계가 없는 독립 프로젝트이며, 이들 기관이 후원하거나 승인한 것이 아니다.

## KRDS — 디지털 정부서비스 UI/UX 가이드라인

- 이용 조건: **공공누리 제1유형**(출처표시). 상업적·비상업적 이용, 변경·2차적 저작물 작성과 배포 허용.
  KRDS 저작권정책 <https://www.krds.go.kr/html/site/utility/utility_06.html> (2025-05-13 갱신분, 2026-10-19 확인).
- 공공누리 제1유형 준수사항(<https://www.kogl.or.kr/info/licenseType1.do>, 2026-10-19 확인): 출처 표시와 가능하면 출처 웹사이트 링크,
  공공기관이 후원하거나 특수한 관계인 것처럼 오인하게 하는 표시 금지, 변경 이용 시 저작인격권 존중(연구 성과·수치를 고쳐 착오를 일으키지 않을 것).
- 이 저장소에서 KRDS 를 쓴 곳: `tokens/vendor/krds/`(HTML Component Kit v1.1.0 토큰 원본), `tokens/` 의 변환 토큰,
  `sources/extracts/KRDS-*`(가이드라인 요약 추출본), KRDS 를 출처로 쓴 룰·컴포넌트 규격.
- 변경 표시: 이 체계가 KRDS 와 다르게 정한 곳은 해당 룰의 충돌 결정(`conflicts/CF-###.yaml`)과 `verification_note` 에 원문과 함께 적었다.
  KRDS 원문과 다른 값을 KRDS 의 값처럼 쓰지 않는다.

출처 표기:

> 본 저작물은 행정안전부에서 2024년 작성하여 공공누리 제1유형으로 개방한 '범정부 UI/UX 디자인시스템(KRDS)'을 이용하였으며,
> 해당 저작물은 'KRDS 디자인시스템 홈페이지(<https://www.krds.go.kr>)'에서 무료로 다운받으실 수 있습니다.
> 이 저장소는 그 내용을 요약·변환하고 다른 기준과의 충돌을 결정해 일부를 바꾸었다(변경 내용은 `conflicts/`).

## WCAG 2.2 — W3C

- Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation 12 December 2024. <https://www.w3.org/TR/WCAG22/>
  Copyright © 2020-2024 World Wide Web Consortium. W3C® liability, trademark and document use rules apply.
- `sources/extracts/WCAG22-A-AA.yaml` 은 성공기준 원문을 **수정 없이** 옮긴 것으로, W3C Document License(<https://www.w3.org/copyright/document-license/>)를 따른다.
  이 파일은 이 저장소의 다른 라이선스로 다시 허락하지 않는다.
- 룰 문장은 성공기준을 한국어로 요약하고 측정 방법을 덧붙인 이 저장소의 저작물이다. WCAG 의 공식 번역이 아니며, 판정은 원문을 따른다.

## KWCAG 2.2 — 한국형 웹 콘텐츠 접근성 지침 (KS X OT0003)

- 국립전파연구원 방송통신표준. 원문 파일은 저장소에 넣지 않았다. 룰에는 검사항목 번호와 짧은 인용만 있다.

## 그 밖의 출처

- 인공지능 투명성 확보 가이드라인(과학기술정보통신부·한국지능정보사회진흥원): 원문 파일을 넣지 않았고 짧은 인용만 있다.
- 법령(개인정보 보호법·시행령, 인공지능 기본법 등): 국가법령정보센터 원문. 법령은 저작권 보호 대상이 아니다(저작권법 제7조).
- 전체 출처 목록과 확인 기록: `sources/registry.yaml`.
