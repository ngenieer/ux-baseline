# 충돌 해소 기록

충돌 1건 = `CF-###.yaml` 1개. 형식은 `schema/conflict.schema.json`. 열린 후보와 처리 현황은 `BACKLOG.md`.

## 룰끼리의 충돌

```yaml
id: CF-001
rules: [A11Y-014, STATE-030]
summary: 무엇이 부딪히는가
principle: 1        # 1 법규·접근성 / 2 과업 완료 / 3 일관성 / 4 미적 선호
decision: 결론
reason: 왜 이렇게 결정했는가
deviates_from_priority: false   # 상위 원칙이 이기는 기본값과 다르게 판단했으면 true + 구체적 이유
date: 2026-10-18
rule_changes: ["STATE-037: statement 수정"]   # 이 결정으로 룰을 고쳤다면
```

관련 룰 양쪽의 `relations`에 `type: conflicts`, `decision: CF-###`, `note: <결론>`을 넣는다.

## 외부 기준과의 충돌

상대가 룰이 아니라 다른 표준의 조항, 법규, 출처 내부 불일치, 프로젝트 지침이면 `against`에 상대를 적는다.
룰이 1개여도 된다. 관련 룰의 `decisions` 목록에 CF ID를 넣는다.

```yaml
id: CF-021
rules: [A11Y-009]
against: KWCAG 2.2 5.4.2(자동 재생 금지)
...
```

결정을 바꿀 때는 기록을 지우지 않고 새 CF를 만들어 이전 CF를 참조한다.
