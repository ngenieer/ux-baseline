# 디자인 토큰 (4단계)

색·간격·타이포·반경·그림자·모션 값은 W3C Design Tokens Community Group 포맷(DTCG JSON)으로만 정의하고,
CSS 변수로 변환해 씁니다. "토큰에 없는 값을 직접 쓰지 말 것"은 MUST 룰로 두고 lint/ 에서 검사합니다.

확정 룰에서 값이 정해지면 채웁니다. DTCG 현행 버전은 sources/registry.yaml 의 DTCG_FORMAT 확인 후 고정합니다.
