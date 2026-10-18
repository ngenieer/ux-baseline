# STATE — 피드백·상태 (로딩·에러·빈 화면)

ux-baseline 확정 룰. 자동 생성 파일이다.

| ID | 강도 | 룰 |
|---|---|---|
| STATE-001 | MUST | 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다. |
| STATE-002 | SHOULD | 요청 후 1초 안에 끝나지 않는 처리에는 처리 중인 영역에 진행 표시(스피너 또는 진행 막대)와 처리 중임을 알리는 텍스트를 표시하고, 1초 안에 끝나는 처리에는 진행 표시를 띄우지 않는다. |
| STATE-003 | SHOULD | 확인(재확인) 대화상자는 실행 후 서비스 안에서 되돌릴 수 없거나 사용자가 결과·부작용을 알아야 하는 동작에만 쓰고, 대화상자 본문에 실행될 내용과 그 결과를 쓰며, 실행 버튼과 취소 버튼을 함께 둔다. |
| STATE-004 | SHOULD | 만족도 평가 같은 사용자 피드백 요소는 본문 아래(화면 너비가 좁으면 반드시 본문 아래) 또는 본문 옆 사이드 영역에 두고, 버튼으로 축약해 화면에 고정(플로팅)하지 않으며, 새 기능에 대한 의견을 물을 때는 사용자가 그 기능 이용을 마친 뒤에 표시한다. |
| STATE-005 | SHOULD | 구조화 목록 항목이나 표의 데이터 셀에 표시할 값이 없으면 그 자리를 비워 두지 않고 대시(-)를 표시한다. |
| STATE-006 | SHOULD | 긴급 공지는 STATE-007의 긴급도 상·중·하에 해당하는 내용에만 쓰고, 홍보 콘텐츠, 일반 공지의 전달·강조, 입력 검증 결과·완료 상태 같은 피드백 메시지에는 쓰지 않는다. |
| STATE-008 | SHOULD | 긴급 공지는 공지 내용과 관련된 기간에만 게시하고, 그 기간이 끝나면 내린다. |
| STATE-009 | SHOULD | 긴급 공지에 숨기기·닫기 버튼이나 접기 기능을 두지 않는다. |
| STATE-011 | SHOULD | 입력을 제출하거나 행동을 확정하는 모달·바텀시트의 닫기(X) 버튼은 취소 버튼과 같이 동작해 입력·선택한 내용을 적용하지 않고 창을 닫게 한다. |
| STATE-012 | SHOULD | 사용자가 응답해야 다음 절차로 갈 수 있는 승인 요청 모달에는 'X' 닫기 버튼을 두지 않고, 정보를 수락하거나 거절하는 액션 버튼으로만 닫히게 한다. |
| STATE-013 | SHOULD | 다단계 절차(2단계 이상 이어지는 입력·선택)를 모달 안에서 진행하지 않고 별도 화면에서 진행한다. |
| STATE-015 | SHOULD | 아코디언 헤더의 상태 아이콘은 접힌 상태에서 아래 꺾쇠(V) 또는 '+'를, 펼친 상태에서 위 꺾쇠(^) 또는 '-'를 표시한다. |
| STATE-016 | SHOULD | 캐러셀에 표시할 항목이 1개가 되면 이전·다음 탐색 버튼, 항목 탐색 식별자, 정지·재생 버튼을 숨긴다. |
| STATE-017 | SHOULD | 탭에 비활성(사용 불가) 상태를 쓰지 않고, 표시할 콘텐츠가 없는 탭은 삭제하거나 그 탭의 패널에 콘텐츠가 없는 이유를 텍스트로 표시한다. |
| STATE-019 | SHOULD | 스피너는 처리 중인 작업이 있어 사용자가 기다려야 하는 동안에만 표시하고, 장식이나 화면 전환 연출로 쓰지 않는다. |
| STATE-020 | SHOULD | 진행률을 계산할 수 있는 처리(파일 업로드·다운로드처럼 끝 지점이 정해진 처리)에는 진행률 값을 보여주는 확정 진행 표시를 쓰고, 완료 시점을 알 수 없는 처리에는 불확정 진행 표시를 쓰며, 진행 표시 요소에 접근 가능한 이름을 준다. |
| STATE-021 | SHOULD | 스피너 크기는 배치 유형으로 정한다: 버튼·메뉴 항목·입력 필드 안과 결과 내용을 대신하지 않는 상태 행에는 작은 크기를, 결과가 들어갈 영역의 내용을 대신하는 영역 로딩과 페이지 전체 로딩에는 큰 크기를 쓴다. |
| STATE-022 | SHOULD | 스피너는 처리가 일어나는 영역 안(제출 처리는 제출 버튼 안에 둘 수도 있다)에 두고, 페이지 전체나 맥락이 바뀌는 영역 전체를 불러올 때는 화면 또는 그 영역의 가운데에 둔다. |
| STATE-023 | SHOULD | 화면에 스피너를 동시에 2개 이상 표시하지 않는다. 버튼·입력 필드 같은 컴포넌트 안에 작게 표시하는 스피너와 파일 업로드처럼 항목마다 진행 상태를 보여야 하는 경우는 예외로 한다. |
| STATE-024 | SHOULD | 도움 패널이나 따라하기 패널을 닫았다가 다시 열면(다른 패널로 전환했다가 돌아온 경우 포함) 사용자가 마지막으로 본 콘텐츠를 표시한다. |
| STATE-025 | SHOULD | 사용자가 '중단하기' 버튼을 누르기 전까지 따라하기 패널의 콘텐츠를 다른 콘텐츠로 바꾸거나 따라하기 절차를 끝내지 않는다. |
| STATE-027 | SHOULD | 맥락적 도움말 팝오버는 한 번에 1개만 열고, 팝오버 안에서 다른 맥락적 도움말 팝오버나 모달을 열지 않는다. |
| STATE-029 | SHOULD | 한 화면에 코치마크를 동시에 2개 이상 표시하지 않는다. |
| STATE-030 | SHOULD | 코치마크가 표시되는 동안 알림·배너·토스트 같은 다른 레이어를 띄우지 않고, 그동안 생긴 알림은 버리지 않고 코치마크가 닫힌 직후 표시한다. 시간 제한 경고와 오류·긴급 알림은 예외로 즉시 띄우고 코치마크를 닫는다. |
| STATE-031 | SHOULD | 사용자에게 특정 행동을 요구하는 코치마크는 지시문에 행동을 마치면 다음 단계로 넘어간다는 사실을 쓰고, 시스템이 그 행동의 완료를 확인해 다음 단계로 넘어가게 하며, 행동을 마치기 전에는 넘어가지 않고, 단계가 넘어갈 때 키보드 초점을 강제로 옮기지 않는 대신 새 단계 지시문을 보조기술에 알린다. |
| STATE-032 | SHOULD | 작성 중인 입력 내용이 사라지는 이동(뒤로가기 버튼, 시스템 뒤로가기, 페이지 이탈) 전에는 내용이 사라진다고 경고하고, 계속 이동할지 머무를지 사용자가 고르게 한다. |
| STATE-033 | SHOULD | 바텀시트에는 스와이프와 별도로 '닫기' 버튼(텍스트 '닫기' 또는 접근 가능한 이름이 '닫기'인 X 아이콘 버튼)을 넣고, 그 버튼을 시트 상단에 둔다. |
| STATE-034 | SHOULD | 바텀시트는 한 번에 1개만 띄우고, 불가피하게 여러 개를 겹칠 때는 현재 단계를 표시하며 닫기 동작을 '현재 시트만 닫기'와 '전체 닫기'로 나눠 제공하고, 배경 딤드는 한 겹만 표시한다. |
| STATE-038 | SHOULD | 한 페이지에 스낵바를 1개만 표시하고, 여러 스낵바를 겹치거나 쌓지 않는다. |
| STATE-039 | SHOULD | 스낵바 작업 버튼은 메시지와 직접 관련된 행동(되돌리기·재시도·목록 이동 등)에만 텍스트 버튼으로 최대 1개 두고, 메시지 오른쪽에 둔다. |
| STATE-041 | SHOULD | 목록·표·대시보드 영역에 보여줄 데이터가 없으면 아무것도 없는 빈 영역으로 두지 않고, '데이터 없음(처음 사용)', '사용자 행동의 결과(검색·필터 결과 없음)', '데이터를 가져올 수 없음(권한·시스템 문제·설정 필요)' 중 어느 경우인지 구분해 경우마다 비어 있는 이유와 사용자가 할 수 있는 다음 행동을 텍스트로 표시한다. |
| STATE-042 | SHOULD | 처음 사용 빈 상태에는 데이터가 생기면 이 영역에 무엇이 표시되는지 설명하는 문장을 두고, 사용자가 직접 데이터를 만들 수 있으면 그 행동으로 가는 주 버튼 또는 링크를 1개 둔다. |
| STATE-043 | SHOULD | 없는 주소에 접근하면 HTTP 404 상태 코드로 응답하고, 제목 '페이지를 찾을 수 없습니다'와 주소를 직접 입력했으면 맞는지, 붙여넣었으면 전체를 복사했는지 확인하라는 안내를 보여주며, '404' 같은 기술 용어, 유머·가벼운 표현, 빨간 경고 텍스트, 브레드크럼을 쓰지 않는다. |
| STATE-044 | SHOULD | 예상하지 못한 서버 오류가 나면 5xx 상태 코드로 응답하고, 모든 예상 못한 오류에 같은 화면으로 제목 '서비스에 문제가 있습니다', '잠시 후 다시 시도하세요' 안내, 진행 중이던 입력값의 저장 여부(저장했다면 보관 기간)를 보여주며, '500'·'Internal Server Error' 같은 기술 용어, '기술적인 문제가 발생했습니다' 같은 모호한 문구, 빨간 경고 텍스트, 브레드크럼을 쓰지 않는다. |
| STATE-045 | SHOULD | 오프라인 상태가 되면 네트워크가 필요한 동작(구매·제출·동기화)만 비활성화하거나 연결 후 처리할 대기열에 넣고, 이미 불러온 콘텐츠는 계속 볼 수 있게 하며, 화면 전체를 덮는 모달로 이용을 막지 않는다. |
| STATE-007 | MAY | 긴급 공지에는 긴급도 레이블을 붙이고, 재난·재해 대응과 예고 없는 서비스 장애·이용 중단은 '상', 이용 중단 사전 예고는 '중', 서비스 이용에 중대한 영향은 없지만 대부분의 사용자가 알아야 하는 상황은 '하'로 분류한다. |
| STATE-010 | MAY | 디스클로저는 페이지가 로딩될 때 접힌 상태로 제공한다. |
| STATE-014 | MAY | 한 항목 컨테이너(목록 항목·표 행·카드·글·구역 등)에 보이는 배지를 1개만 붙인다. |
| STATE-035 | MAY | 바텀시트는 현재 화면을 유지한 채 하는 일시적인 짧은 상호작용(옵션 선택·부가 정보 확인)에만 쓰고, 오래 검토해야 하는 정보, 항상 필요한 정보·도구, 서비스 절차의 한 단계에는 쓰지 않는다. |
| STATE-036 | MAY | 같은 인증 절차에서 인증이 연속 2회 이상 실패하면 실패 알림을 토스트가 아닌 모달로 표시한다. |
| STATE-037 | MAY | 토스트에는 사라진 뒤에도 화면의 다른 곳에서 확인할 수 있는 결과만 담고, 중요하거나 긴급한 메시지는 토스트 대신 긴급 공지나 모달로, 사용자가 반드시 읽고 확인해야 하는 설명은 모달로, 개별 입력 항목의 오류·성공·경고 메시지는 해당 입력 필드 옆 인라인 텍스트로 제공한다. |
| STATE-040 | MAY | 스낵바 아이콘은 메시지 의미 전달을 돕는 경우에만 메시지 왼쪽에 두고, 메시지 텍스트보다 눈에 띄게 표현하지 않는다. |
| STATE-046 | MAY | 영역의 콘텐츠를 불러오거나 여러 번에 나눠 갱신하는 동안 그 영역에 aria-busy="true"를 두고, 갱신이 끝나면 aria-busy="false"로 바꾸거나 속성을 제거한다. |

## STATE-001 상태 메시지

- 강도: **MUST**
- 룰: 초점을 옮기지 않고 화면에 표시하는 상태 메시지(작업 결과, 대기 상태, 진행 상황, 오류 발생 알림)는 role(status·alert·log·progressbar) 또는 aria-live 속성으로 지정해 보조기술이 초점 이동 없이 사용자에게 전달할 수 있게 한다.
- 측정 기준: 작업 결과·대기·진행·오류를 알리는 텍스트가 초점 이동이나 페이지 새로고침 없이 추가·변경될 때, 그 텍스트 노드 또는 조상 요소에 role="status"|"alert"|"log"|"progressbar" 또는 aria-live="polite"|"assertive"가 있고, 스크린 리더가 초점 이동 없이 그 텍스트를 읽는다. 입력하는 동안 바뀌는 조건 충족 안내(비밀번호 조건 '(충족)' 등)와 필드 옆 확인 버튼 결과('사용할 수 있는 아이디입니다')도 사용자 동작의 결과라 상태 메시지다 — 필드의 aria-describedby 연결은 초점을 받을 때만 읽히므로 그것만으로는 실패이고, 그 텍스트가 role="status" 또는 aria-live="polite" 영역 안에 있어야 한다(FORM-080, CF-068).
- 판정 방법: 화면의 상태 메시지 목록을 만들고 각 메시지를 발생시킨다. DOM 검사로 role·aria-live를 확인하고, 스크린 리더(NVDA+Chrome 또는 VoiceOver+Safari)에서 초점을 움직이지 않은 채 메시지가 읽히는지 확인한다.
- 자동 검사: none
- 적용 대상: [role=status], [role=alert], [role=log], [aria-live], 상태 메시지(저장 완료·검색 결과 수·처리 중·오류 알림)
- 예외: 초점 이동이나 새 창·대화상자 열림처럼 맥락 변화를 동반하는 메시지는 상태 메시지가 아니다(Understanding 4.1.3 'Examples of changes that are not status messages').
- 예외: 검색 결과 목록 자체는 상태 메시지가 아니다. 결과 수·'검색 중'·'결과 없음' 문구만 해당한다(Understanding 4.1.3).
- 결정 CF-030: 토스트는 사라진 뒤에도 화면의 다른 곳에서 확인할 수 있는 결과 알림만 담고(STATE-037 측정 기준 (4)), role=status로 보조기술에 알린다(STATE-001). 반드시 필요한 정보나 조작은 토스트에만 두지 않으므로 표시 시간은 A11Y-014의 시간 제한에 해당하지 않게 한다. (4)를 충족하지 않는 자동 사라짐 토스트는 A11Y-014로 판정한다.
- 결정 CF-068: 제출 전 조건 안내(입력 중 조건 충족 여부, 필드 옆 확인 버튼 결과)는 필드의 aria-describedby 가 가리키는 요소의 텍스트로 쓰고, 그 요소 또는 조상에 role="status"(또는 aria-live="polite")를 둔다. 이 안내에는 aria-invalid 를 두지 않는다 — 부정 결과('이미 사용 중인 아이디입니다')도 이 텍스트로 FORM-003(SC 3.3.1)의 식별·설명을 충족한다. 제출할 때 그 조건이 여전히 맞지 않으면 FORM-003·FORM-077 대로 오류(aria-invalid, 오류 메시지, 오류 요약)로 다시 표시한다.
- 근거: 초점을 받지 않는 메시지는 화면을 보지 않는 사용자에게 전달되지 않는다. WCAG 2.2 SC 4.1.3(AA)은 상태 메시지를 role·속성으로 판별 가능하게 하라고 요구한다.
- 출처: WCAG22 SC 4.1.3 Status Messages (Level AA); WCAG22_UNDERSTANDING https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html; KRDS 기본 패턴 > 필터링·정렬 > 접근성 가이드라인 (가이드라인 PDF 2025.08 876쪽); KRDS 컴포넌트 (여러 페이지) (가이드라인 PDF 2025.08 595쪽); CSS_VIEW_TRANSITIONS_1 view transition tree는 접근성 트리에 노출되지 않음(3절 및 변경 이력); REACT_USEOPTIMISTIC What happens when the Action fails; 'Adding...' pending 표시 예시; WCAG22_TECH_ARIA23 ARIA23 Example 1 (chat); MDN_ARIA_LOG log role — implicit aria-live=polite, append only, name required; MDN_ARIA_BUSY live regions — suppress partial announcements; MDN_ARIA_LIVE polite live region; WCAG22_TECH_ARIA23 SC 4.1.3 Status Messages; WEBDEV_OFFLINE Inform the user of state changes as soon as possible; don't rely on color alone; WCAG22_UNDERSTANDING 4.1.3 Status Messages; WAI_ARIA_12 status role (implicit aria-live polite, aria-atomic true); alert role (implicit assertive)

좋은 예 — role="status" 영역이 미리 DOM에 있어 초점 이동 없이 저장 결과가 읽힌다.
```html
<div role="status" id="save-msg"></div>
<script>
  // 저장 후 미리 있던 live 영역에 텍스트만 넣는다
  document.getElementById('save-msg').textContent = '저장했습니다';
</script>
```
좋은 예 — 입력 중 바뀌는 조건 충족 안내를 aria-describedby 로 필드에 잇고 role=status 영역에 두어 바뀔 때도 읽힌다(CF-068).
```html
<input id="pw" type="password" autocomplete="new-password" aria-describedby="pw-rules">
<ul id="pw-rules" role="status">
  <li>8자 이상 (충족)</li>
  <li>영문과 숫자 포함 (아직 충족하지 않음)</li>
</ul>
```
나쁜 예 — 상태 메시지에 role·aria-live가 없어 스크린 리더가 저장 결과를 읽지 않는다.
```html
<script>
  // role·aria-live 없는 요소를 새로 만들어 붙임
  const p = document.createElement('p');
  p.textContent = '저장했습니다';
  form.append(p);
</script>
```
나쁜 예 — aria-describedby 연결만 있어 입력하는 동안 바뀐 충족 여부가 전달되지 않는다.
```html
<input id="pw" type="password" autocomplete="new-password" aria-describedby="pw-rules">
<ul id="pw-rules">
  <li>8자 이상 (충족)</li>
</ul>
<!-- 입력 중 '(충족)'으로 바뀌어도 live 영역이 아니라 읽히지 않는다 -->
```

## STATE-002 처리 중 표시

- 강도: **SHOULD**
- 룰: 요청 후 1초 안에 끝나지 않는 처리에는 처리 중인 영역에 진행 표시(스피너 또는 진행 막대)와 처리 중임을 알리는 텍스트를 표시하고, 1초 안에 끝나는 처리에는 진행 표시를 띄우지 않는다.
- 측정 기준: (1) 응답을 2초 지연시켰을 때 요청 후 1초가 지난 시점에 처리 영역 안(또는 제출 버튼 안)에 스피너·진행 막대와 처리 중 텍스트(화면 표시 또는 role=status 영역의 텍스트)가 있다. (2) 응답이 1초 미만으로 끝나는 조건(지연 300ms)에서는 진행 표시 요소가 한 번도 렌더링되지 않는다.
- 판정 방법: 개발자 도구 네트워크 스로틀링 또는 목 서버로 응답 지연을 2초·300ms로 바꿔 같은 동작을 실행하고, 성능 패널 녹화 또는 MutationObserver로 진행 표시 요소의 출현 시점을 확인한다.
- 자동 검사: partial (ux-baseline-check/progress-flash)
- 적용 대상: 서버 요청·파일 처리 등 비동기 처리 대기, form 제출
- 근거: 대기 중 아무 표시가 없으면 사용자는 시스템이 멈췄다고 판단하고 다시 누르거나 이탈한다. 반대로 1초 안에 끝나는 처리에 스피너를 깜빡이면 주의를 흩뜨린다(KRDS 스피너, NN/g).
- 출처: KRDS 기본 패턴 > 입력폼 > 사용성 가이드라인 — '입력폼 처리에 시간이 걸릴 경우 피드백 메시지 및 인디케이터(예 - 스피너)를 사용하여 처리 중임을 안내하는 것이 바람직하다'; KRDS 컴포넌트 > 스피너 > 용례 — '완료 상태로 변경되는 데 안정적으로 1초 미만의 시간이 걸리는 경우 스피너를 사용하지 않는다'; KRDS 컴포넌트 (여러 페이지); NNG_PROGRESS Looped animation: 'For anything that takes less than 1 second to load, it is distracting to use a looped animation'; NNG_SKELETON No Skeleton Screens or Spinners for Quick Page Loads — 'less than 1 second ... aren't necessary'; NNG_RESPONSE_TIMES 1.0 second — 'no special feedback is necessary during delays of more than 0.1 but less than 1.0 second'

좋은 예 — 1초 넘게 걸리는 제출에 버튼 안 스피너와 처리 중 텍스트를 함께 표시한다.
```html
<button type="submit" aria-describedby="submit-status">
  <span class="spinner spinner--sm" aria-hidden="true"></span> 신청
</button>
<p id="submit-status" role="status">신청서를 보내는 중입니다</p>
```
나쁜 예 — 1초 넘는 처리에 진행 표시와 처리 중 텍스트가 없어 사용자가 다시 누르게 된다.
```html
<!-- 2~5초 걸리는 제출인데 누른 뒤 아무 표시가 없다 -->
<button type="submit">신청</button>
```

## STATE-003 확인 대화상자 사용 조건

- 강도: **SHOULD**
- 룰: 확인(재확인) 대화상자는 실행 후 서비스 안에서 되돌릴 수 없거나 사용자가 결과·부작용을 알아야 하는 동작에만 쓰고, 대화상자 본문에 실행될 내용과 그 결과를 쓰며, 실행 버튼과 취소 버튼을 함께 둔다.
- 측정 기준: (1) 확인 대화상자가 뜨는 동작마다: 실행 뒤 같은 서비스에서 되돌리기(복원·취소) 수단이 없거나, 결과·부작용(데이터 삭제, 제출 확정, 비용 발생, 다른 사용자에게 공개 등)이 대화상자 본문에 적혀 있다. 되돌리기 수단이 있고 부작용이 없는 동작(예: 휴지통 이동 후 복원 가능)에는 확인 대화상자가 없다. (2) 본문 텍스트에 실행될 동작과 그 결과가 있다. (3) 실행 버튼 1개와 취소(이전 상태로 돌아가기) 버튼 1개가 모두 있다.
- 판정 방법: 확인 대화상자를 띄우는 동작 목록을 만들어 각 동작의 되돌리기 수단 유무와 대화상자 본문·버튼을 점검표로 확인한다.
- 자동 검사: none
- 적용 대상: [role=alertdialog], dialog, 확인 대화상자
- 근거: 중요도가 낮은 동작마다 확인을 요구하면 사용자가 확인 메시지를 읽지 않게 되어 정말 중요한 확인도 무시한다(KRDS 확인 패턴). 실행·취소 버튼을 함께 두어 오류를 막는다.
- 출처: KRDS 기본 패턴 > 확인 > 사용성 가이드라인 — '결과가 매우 중요한 경우에 확인을 사용해야 한다', '설명을 제공한다', '확정, 취소할 수 있는 버튼을 모두 제공한다' (가이드라인 PDF 2025.08 880·881쪽); KRDS 컴포넌트 > 모달 > 유형 '사용자의 행동을 확인 또는 확정하고자 할 때' — '실행되는 기능, 결과, 위험성에 대한 설명이 반드시 포함되어야 한다' (가이드라인 PDF 2025.08 388쪽)

좋은 예 — 되돌릴 수 없는 동작에만 묻고, 본문에 결과를 쓰며 실행·취소 버튼을 함께 둔다.
```html
<dialog role="alertdialog" aria-labelledby="d-t" aria-describedby="d-d">
  <h2 id="d-t">신청을 취소할까요?</h2>
  <p id="d-d">취소하면 제출한 서류가 삭제되고 다시 신청해야 합니다.</p>
  <button type="button">신청 취소</button>
  <button type="button">돌아가기</button>
</dialog>
```
나쁜 예 — 되돌릴 수 있고 부작용 없는 동작에 확인 대화상자를 띄워 과업을 끊는다.
```html
<!-- 즐겨찾기 해제는 다시 추가하면 되돌릴 수 있는데 확인을 묻는다 -->
<dialog open aria-labelledby="f-t">
  <h2 id="f-t">즐겨찾기를 해제할까요?</h2>
  <button type="button">해제</button><button type="button">취소</button>
</dialog>
```

## STATE-004 만족도 피드백 위치와 시점

- 강도: **SHOULD**
- 룰: 만족도 평가 같은 사용자 피드백 요소는 본문 아래(화면 너비가 좁으면 반드시 본문 아래) 또는 본문 옆 사이드 영역에 두고, 버튼으로 축약해 화면에 고정(플로팅)하지 않으며, 새 기능에 대한 의견을 물을 때는 사용자가 그 기능 이용을 마친 뒤에 표시한다.
- 측정 기준: (1) 피드백 요소가 DOM상 본문(main) 콘텐츠 뒤 또는 aside 안에 있다. (2) 피드백 요소와 그것을 여는 버튼에 position: fixed·sticky가 없다. (3) 시점형(새 기능 의견) 피드백은 페이지 로드 시점에 보이지 않고, 대상 기능의 완료 이벤트(제출 완료 등) 뒤에 나타난다. (4) 사이드 배치 레이아웃은 본문과 사이드를 나란히 둘 수 없는 너비에서 피드백 요소를 본문 아래로 옮긴다.
- 판정 방법: 데스크톱·모바일 너비에서 페이지를 열어 위치와 CSS position을 확인하고, 시점형 피드백은 새로 고침 직후와 기능 완료 직후의 표시 여부를 비교한다.
- 자동 검사: partial (stylelint/ux-baseline/feedback-not-fixed)
- 적용 대상: 사용자 피드백(만족도 평가) 영역
- 근거: 페이지 로딩 직후 강조된 피드백 요청이나 화면에 떠 있는 피드백 버튼은 본문 이용을 방해하고, 서비스를 쓰지 않은 상태의 응답은 의미가 없다(KRDS 사용자 피드백 패턴).
- 출처: KRDS 기본 패턴 > 사용자 피드백 > 사용성 가이드라인·플랫폼 고려 사항 — '화면 하단 또는 본문의 사이드 영역에 배치한다', '작업이 완료된 후에 유도 메시지를 제공한다 … 출현해야 한다', '버튼으로 축약하여 플로팅 시키지 않고 화면 하단에 배치한다' (가이드라인 PDF 2025.08 807·809쪽)

좋은 예 — 만족도 평가를 본문 뒤에 일반 흐름으로 둔다.
```html
<main>…본문…
  <section aria-labelledby="fb-t" class="page-feedback">
    <h2 id="fb-t">이 페이지에 만족하시나요?</h2>
    <button type="button">만족</button> <button type="button">불만족</button>
  </section>
</main>
```
나쁜 예 — 피드백을 버튼으로 축약해 화면에 고정(플로팅)한다.
```html
<style>
  .feedback-fab { position: fixed; inset-inline-end: var(--space-gap-4); inset-block-end: var(--space-gap-4); }
</style>
<button type="button" class="feedback-fab">의견 남기기</button>
```

## STATE-005 빈 값은 대시로 표시

- 강도: **SHOULD**
- 룰: 구조화 목록 항목이나 표의 데이터 셀에 표시할 값이 없으면 그 자리를 비워 두지 않고 대시(-)를 표시한다.
- 측정 기준: 구조화 목록 항목의 각 정보 칸과 표의 td 중 데이터 값이 없는 것의 텍스트 내용이 '-'이다. 공백만 있거나 빈 문자열인 td·정보 칸이 0개다.
- 판정 방법: 값이 비는 레코드가 포함된 데이터로 목록·표를 렌더링해 빈 칸을 찾는다.
- 자동 검사: none
- 적용 대상: table td, 구조화 목록
- 근거: 정보가 비어 있으면 사용자는 로딩 실패인지 값이 없는 것인지 헷갈린다. 대시로 '정보 없음'을 명시한다(KRDS 구조화 목록·표).
- 출처: KRDS 컴포넌트 > 구조화 목록 > 사용성 가이드라인 (가이드라인 PDF 2025.08 357쪽); KRDS 컴포넌트 > 표 > 사용성 가이드라인 — '데이터 값이 존재하지 않는 경우 셀을 비워두지 않고 대시(-)를 제공한다 … 안내해야 한다' (가이드라인 PDF 2025.08 466쪽)

좋은 예 — 값이 없는 셀에 대시(-)를 넣어 누락이 아닌 "값 없음"임을 보여준다.
```html
<tr><th scope="row">홍길동</th><td>010-1234-5678</td><td>-</td></tr>
```
나쁜 예 — 빈 셀이라 값이 없는지 불러오지 못했는지 구분할 수 없다.
```html
<tr><th scope="row">홍길동</th><td>010-1234-5678</td><td></td></tr>
```

## STATE-006 긴급 공지 사용 제한

- 강도: **SHOULD**
- 룰: 긴급 공지는 STATE-007의 긴급도 상·중·하에 해당하는 내용에만 쓰고, 홍보 콘텐츠, 일반 공지의 전달·강조, 입력 검증 결과·완료 상태 같은 피드백 메시지에는 쓰지 않는다.
- 측정 기준: 서비스에 게시된(또는 게시 예정인) 긴급 공지 각각의 내용이 (a) 재난·재해 대응, 예고 없는 장애·이용 중단, (b) 이용 중단 사전 예고, (c) 대부분의 사용자가 알아야 하는 상황 중 하나다. 폼 검증 결과·완료 메시지를 긴급 공지 컴포넌트로 띄우는 코드가 없다.
- 판정 방법: 긴급 공지 게시 이력과 긴급 공지 컴포넌트 호출 위치를 검토한다.
- 자동 검사: none
- 적용 대상: 긴급 공지
- 근거: 긴급 공지는 메인 메뉴와 히어로 사이에서 주의를 끄는 요소라 남용하면 과업을 방해하고 실제 긴급 상황에서 무시된다(KRDS 긴급 공지).
- 출처: KRDS 컴포넌트 > 긴급 공지 > 용례 (가이드라인 PDF 2025.08 360쪽)

좋은 예 — 재난 대응 내용에만 긴급 공지를 쓴다.
```html
<section class="emergency-notice" aria-labelledby="en-l">
  <strong id="en-l">긴급도: 상</strong> 태풍으로 10월 18일 18:00까지 방문 접수를 중단합니다. <a href="/notice/123">접수 중단 안내 자세히 보기</a>
</section>
```
나쁜 예 — 완료 피드백 메시지를 긴급 공지 컴포넌트로 띄운다.
```html
<section class="emergency-notice" aria-labelledby="en-l">
  <strong id="en-l">긴급도: 하</strong> 회원가입을 마쳤습니다.
</section>
```

## STATE-008 긴급 공지 게시 기간

- 강도: **SHOULD**
- 룰: 긴급 공지는 공지 내용과 관련된 기간에만 게시하고, 그 기간이 끝나면 내린다.
- 측정 기준: 긴급 공지마다 게시 종료 일시(또는 종료 조건)가 정해져 있고, 종료 일시가 지난 긴급 공지가 화면에 표시되지 않는다.
- 판정 방법: 긴급 공지 관리 데이터에서 종료 일시 필드를 확인하고, 종료 일시 이후 시각으로 페이지를 열어 표시 여부를 확인한다.
- 자동 검사: none
- 적용 대상: 긴급 공지
- 근거: 긴급 공지가 늘 떠 있거나 오래된 내용이 남아 있으면 실제 긴급 상황에서 사용자가 주의를 기울이지 않는다(KRDS).
- 출처: KRDS 컴포넌트 > 긴급 공지 > 사용성 가이드라인 (가이드라인 PDF 2025.08 363쪽)

좋은 예 — 게시 종료 일시를 정해 두고 기간이 끝나면 내린다.
```html
<!-- 관리 데이터: {"start":"2026-10-18T09:00","end":"2026-10-18T18:00"} — end가 지나면 렌더링하지 않는다 -->
<section class="emergency-notice" aria-labelledby="en-l">
  <strong id="en-l">긴급도: 상</strong> 태풍으로 오늘 18:00까지 방문 접수를 중단합니다.
</section>
```
나쁜 예 — 관련 기간이 끝난 긴급 공지를 계속 게시한다.
```html
<!-- 2026-10-18 현재: 3주 전 끝난 점검 공지가 종료 일시 없이 계속 표시됨 -->
<section class="emergency-notice" aria-labelledby="en-l">
  <strong id="en-l">긴급도: 중</strong> 9월 28일 02:00~04:00 정기 점검으로 서비스를 중단합니다.
</section>
```

## STATE-009 긴급 공지 숨기기 금지

- 강도: **SHOULD**
- 룰: 긴급 공지에 숨기기·닫기 버튼이나 접기 기능을 두지 않는다.
- 측정 기준: 긴급 공지 컴포넌트 안에 공지를 숨기거나 접는 button·details/summary·aria-expanded 컨트롤이 없다.
- 판정 방법: 긴급 공지 마크업을 검사한다.
- 자동 검사: none
- 적용 대상: 긴급 공지
- 근거: 한 번 숨기면 새로 고침이나 방문 기록 초기화 전까지 사용자가 반드시 알아야 할 공지를 다시 볼 수 없다(KRDS).
- 출처: KRDS 컴포넌트 > 긴급 공지 > 사용성 가이드라인 (가이드라인 PDF 2025.08 364쪽)

좋은 예 — 긴급 공지에 닫기·접기 컨트롤이 없다.
```html
<section class="emergency-notice" aria-labelledby="en-l">
  <strong id="en-l">긴급도: 상</strong> 시스템 장애로 결제가 중단되었습니다. <a href="/notice/9">결제 중단 안내 자세히 보기</a>
</section>
```
나쁜 예 — 긴급 공지를 닫는 버튼이 있어 사용자가 놓칠 수 있다.
```html
<section class="emergency-notice" aria-labelledby="en-l">
  <strong id="en-l">긴급도: 상</strong> 시스템 장애로 결제가 중단되었습니다.
  <button type="button" aria-label="공지 닫기">×</button>
</section>
```

## STATE-011 닫기는 취소와 같게

- 강도: **SHOULD**
- 룰: 입력을 제출하거나 행동을 확정하는 모달·바텀시트의 닫기(X) 버튼은 취소 버튼과 같이 동작해 입력·선택한 내용을 적용하지 않고 창을 닫게 한다.
- 측정 기준: 제출·확정형 모달·바텀시트에서 값을 바꾼 뒤 닫기(X) 버튼을 누르면 창이 닫히고, 서버 요청이나 화면 상태 변경이 취소 버튼을 눌렀을 때와 같다(제출·저장 요청 0건, 원래 화면 값 유지).
- 판정 방법: 값을 바꾼 뒤 취소와 닫기를 각각 눌러 네트워크 요청과 화면 상태를 비교한다.
- 자동 검사: none
- 적용 대상: dialog, 모달, 바텀시트
- 근거: 닫기가 저장·확정처럼 동작하면 사용자가 의도하지 않은 변경이 적용된다. KRDS는 닫기 버튼이 '모달을 닫는 동시에 취소와 동일한 기능'이라고 정의한다.
- 출처: KRDS 컴포넌트 > 모달 > 구조 3. 닫기 버튼 — '데이터를 입력하여 제출하거나 행동을 확정해야 하는 경우, 닫기 버튼은 모달을 닫는 동시에 취소와 동일한 기능을 제공함' (가이드라인 PDF 2025.08 390쪽); KRDS 컴포넌트 > 바텀시트 > 구조 5. 닫기 버튼 — 같은 문장

좋은 예 — X 버튼이 취소와 같은 값(cancel)을 반환해 입력을 적용하지 않는다.
```html
<dialog aria-labelledby="t">
  <form method="dialog">
    <h2 id="t">주소 변경</h2> …
    <button value="cancel" aria-label="닫기">×</button>
    <button value="cancel">취소</button><button value="save">저장</button>
  </form>
</dialog>
```
나쁜 예 — X가 저장처럼 동작해 취소 버튼과 결과가 다르다.
```html
<!-- X를 누르면 입력값을 저장하고 닫는다 -->
<button type="button" aria-label="닫기" onclick="save(); dialog.close()">×</button>
```

## STATE-012 승인 요청 모달은 X 버튼 없음

- 강도: **SHOULD**
- 룰: 사용자가 응답해야 다음 절차로 갈 수 있는 승인 요청 모달에는 'X' 닫기 버튼을 두지 않고, 정보를 수락하거나 거절하는 액션 버튼으로만 닫히게 한다.
- 측정 기준: 승인 요청 모달에 닫기(X) 버튼이 없고, 수락·거절 액션 버튼이 각각 1개 이상 있으며, 각 액션 버튼이 모달을 닫고 정해진 다음 상태(이전 상태 또는 다른 절차)로 이동한다.
- 판정 방법: 승인 요청 모달을 띄워 버튼 구성과 각 버튼의 결과를 확인한다.
- 자동 검사: none
- 적용 대상: 승인 요청 모달
- 결정 CF-035: 양립. 모달은 Esc 또는 모달을 닫는 버튼(닫기·취소·수락·거절) 중 하나를 키보드로 실행해 빠져나올 수 있으면 키보드 함정이 아니다(A11Y-012). X(닫기) 버튼이 있는 모달은 Esc로도 닫고(A11Y-029), X 버튼이 없는 승인 요청 모달(STATE-012)은 Esc를 지원하지 않아도 된다.
- 근거: 승인 요청 모달은 사용자가 정보를 확인·응답하지 않고 다음 절차로 넘어가는 것을 막는 수단이라 응답 없이 닫는 경로를 두지 않는다(KRDS 모달 유형).
- 출처: KRDS 컴포넌트 > 모달 > 유형 '프로세스 진행 전에 사용자의 승인이 필요할 때' — ''X' 아이콘으로 표현되는 닫기 버튼은 제공되지 않으며 … 수용하거나 거절하여 … 액션 버튼이 제공된다' (가이드라인 PDF 2025.08 389쪽)

좋은 예 — 승인 요청을 수락·거절 버튼으로만 닫는다.
```html
<dialog aria-labelledby="t">
  <h2 id="t">개인정보 수집·이용에 동의하시겠습니까?</h2>
  <button type="button">동의</button><button type="button">동의 안 함</button>
</dialog>
```
나쁜 예 — X 버튼이 있어 응답 없이 닫혀 다음 상태가 정해지지 않는다.
```html
<dialog aria-labelledby="t">
  <h2 id="t">개인정보 수집·이용에 동의하시겠습니까?</h2>
  <button type="button" aria-label="닫기">×</button>
  <button type="button">동의</button><button type="button">동의 안 함</button>
</dialog>
```

## STATE-013 모달 안 다단계 절차 금지

- 강도: **SHOULD**
- 룰: 다단계 절차(2단계 이상 이어지는 입력·선택)를 모달 안에서 진행하지 않고 별도 화면에서 진행한다.
- 측정 기준: 모달 안에서 액션 버튼(다음·확인 등)을 눌렀을 때 같은 모달 안에 다른 입력·선택 단계가 이어서 나타나지 않는다. 모달 안에 단계 표시기(1/3 등)가 없다.
- 판정 방법: 모달을 여는 모든 흐름을 끝까지 진행해 단계 수를 센다.
- 자동 검사: none
- 적용 대상: dialog, 모달
- 근거: 기본 화면에서 벗어난 모달에서 다단계 절차를 진행하면 맥락을 잃기 쉽고 안내 장치를 쓰기 어렵다. KRDS는 '모달은 최후의 수단'이라고 쓴다.
- 출처: KRDS 컴포넌트 > 모달 > 용례 (가이드라인 PDF 2025.08 387쪽)

좋은 예 — 다단계 절차를 별도 화면에서 진행한다.
```html
<!-- 3단계 신청 절차는 별도 페이지로 진행 -->
<a href="/apply/step-1">보조금 신청하기</a>
```
나쁜 예 — 모달 안에서 여러 입력 단계를 이어 진행한다.
```html
<dialog open aria-labelledby="s-t">
  <h2 id="s-t">1/3 단계: 기본 정보</h2> …
  <button type="button">다음</button>
</dialog>
```

## STATE-015 아코디언 펼침 아이콘

- 강도: **SHOULD**
- 룰: 아코디언 헤더의 상태 아이콘은 접힌 상태에서 아래 꺾쇠(V) 또는 '+'를, 펼친 상태에서 위 꺾쇠(^) 또는 '-'를 표시한다.
- 측정 기준: aria-expanded="false"인 아코디언 버튼의 아이콘이 아래 꺾쇠 또는 +이고, aria-expanded="true"인 버튼의 아이콘이 위 꺾쇠 또는 -이다. 한 아코디언 안에서 아이콘 쌍(꺾쇠 또는 +/-)이 하나로 통일돼 있다.
- 판정 방법: 각 헤더를 펼치고 접으며 aria-expanded 값과 아이콘을 대조한다.
- 자동 검사: none
- 적용 대상: 아코디언
- 근거: 아이콘이 펼침 방향을 반영해야 접힌 영역이 있음을 알 수 있다(KRDS 아코디언).
- 출처: KRDS 컴포넌트 > 아코디언 > 사용성 가이드라인 (가이드라인 PDF 2025.08 410쪽)

좋은 예 — 접힘은 V, 펼침은 ^로 상태에 따라 아이콘이 바뀐다.
```css
.accordion__btn[aria-expanded="false"] .icon { transform: rotate(0deg); }   /* 아래 꺾쇠 V */
.accordion__btn[aria-expanded="true"]  .icon { transform: rotate(180deg); } /* 위 꺾쇠 ^ */
```
나쁜 예 — 아이콘이 펼침 상태를 나타내지 않는다.
```css
/* 상태와 무관하게 오른쪽 꺾쇠(>)를 고정 표시 */
.accordion__btn .icon { transform: rotate(-90deg); }
```

## STATE-016 캐러셀 항목 1개일 때 컨트롤 숨김

- 강도: **SHOULD**
- 룰: 캐러셀에 표시할 항목이 1개가 되면 이전·다음 탐색 버튼, 항목 탐색 식별자, 정지·재생 버튼을 숨긴다.
- 측정 기준: 항목이 1개인 캐러셀에서 탐색 버튼·항목 식별자(인디케이터)·정지/재생 버튼이 렌더링되지 않거나 hidden(display:none)이다.
- 판정 방법: 항목 1개 데이터로 캐러셀을 렌더링해 확인한다(콘텐츠 변경으로 1개가 되는 경우 포함).
- 자동 검사: none
- 적용 대상: 캐러셀
- 근거: 항목이 1개인데 탐색 단서가 남아 있으면 사용자가 불필요한 탐색을 시도한다(KRDS 캐러셀).
- 출처: KRDS 컴포넌트 > 캐러셀 > 사용성 가이드라인 (가이드라인 PDF 2025.08 438쪽)

좋은 예 — 항목이 1개면 탐색 컨트롤을 숨긴다.
```html
<section aria-roledescription="carousel" aria-label="공지">
  <div class="slide">10월 민원 접수 일정 안내</div>
  <!-- 항목 1개: 탐색·식별자·정지 버튼을 렌더링하지 않는다 -->
</section>
```
나쁜 예 — 항목이 1개인데 이전·다음 버튼과 1/1 식별자를 표시한다.
```html
<section aria-roledescription="carousel" aria-label="공지">
  <button type="button">이전 공지</button>
  <div class="slide">10월 민원 접수 일정 안내</div>
  <button type="button">다음 공지</button> <span>1 / 1</span>
</section>
```

## STATE-017 탭 비활성 금지

- 강도: **SHOULD**
- 룰: 탭에 비활성(사용 불가) 상태를 쓰지 않고, 표시할 콘텐츠가 없는 탭은 삭제하거나 그 탭의 패널에 콘텐츠가 없는 이유를 텍스트로 표시한다.
- 측정 기준: [role=tab] 요소에 disabled·aria-disabled="true"가 없다. 모든 [role=tabpanel]이 콘텐츠를 갖거나, 콘텐츠가 없는 이유를 설명하는 텍스트를 갖는다.
- 판정 방법: 탭 컴포넌트의 각 탭을 선택해 패널 내용을 확인하고 탭 속성을 검사한다.
- 자동 검사: none
- 적용 대상: [role=tab], [role=tabpanel], 탭
- 근거: 비활성 탭은 왜 쓸 수 없는지 알 수 없어 혼동을 준다(KRDS 탭).
- 출처: KRDS 컴포넌트 > 탭 > 사용성 가이드라인 (가이드라인 PDF 2025.08 451쪽)

좋은 예 — 탭을 비활성화하지 않고 패널에 콘텐츠가 없는 이유를 쓴다.
```html
<button role="tab" id="t-2" aria-selected="true" aria-controls="p-2">처리 완료</button>
<div role="tabpanel" id="p-2" aria-labelledby="t-2">
  <p>아직 처리된 신청이 없습니다. 신청이 처리되면 여기에 표시됩니다.</p>
</div>
```
나쁜 예 — 탭을 비활성 상태로 둬 왜 쓸 수 없는지 알 수 없다.
```html
<button role="tab" id="t-2" aria-selected="false" aria-disabled="true">처리 완료</button>
```

## STATE-019 스피너는 실제 대기에만

- 강도: **SHOULD**
- 룰: 스피너는 처리 중인 작업이 있어 사용자가 기다려야 하는 동안에만 표시하고, 장식이나 화면 전환 연출로 쓰지 않는다.
- 측정 기준: (1) 스피너를 보이게 하는 코드는 처리 작업(네트워크 요청, 백그라운드 job, 시연·테스트에서 그 작업 자리에 들어간 목 함수)을 시작한 뒤에만 실행된다. (2) 스피너를 숨기는 코드가 그 작업의 종료(Promise 완료·실패, job 완료 이벤트, 취소·중단)에 묶여 있다. (3) 스피너를 숨기는 조건이 처리 작업과 무관한 고정 시간 타이머뿐인 코드가 없다. 표시를 늦추는 타이머(STATE-002 의 1초 뒤 표시)와 목 함수 안에서 응답 지연을 흉내 내는 타이머는 (3)에 해당하지 않는다. 목 함수는 실제 작업이 들어갈 호출 자리에서 같은 시작·종료 인터페이스(Promise·콜백·이벤트)로 호출될 때만 처리 작업으로 본다.
- 판정 방법: 스피너 표시·숨김 코드를 모두 찾아 각각이 어떤 처리 작업의 시작·종료에 묶였는지 기록한다(코드 검토). 실행 중에는 성능 패널 녹화로 스피너 표시 구간이 요청·처리 구간 안에 있는지 비교한다.
- 자동 검사: none
- 적용 대상: 스피너
- 근거: 빠르게 표시될 수 있는 화면에 스피너를 보여주면 주의가 흩어진다(KRDS 스피너).
- 출처: KRDS 컴포넌트 > 스피너 > 사용성 가이드라인

좋은 예 — 실제 요청이 진행되는 동안에만 스피너를 보인다.
```js
spinner.hidden = false;
try { await fetch(url); } finally { spinner.hidden = true; }
```
좋은 예 — 스피너가 목 함수(처리 작업 자리)의 시작·종료에 묶여 있다. 목 안의 지연 타이머는 응답을 흉내 낼 뿐 스피너를 직접 숨기지 않는다.
```js
// 시연 화면: 실제 요청 자리에 같은 Promise 인터페이스의 목 함수를 넣는다
const summarize = DEMO ? (doc) => new Promise((ok) => setTimeout(() => ok(SAMPLE), 1200)) : requestSummary;
spinner.hidden = false;
try { await summarize(doc); } finally { spinner.hidden = true; }
```
나쁜 예 — 처리 없이 타이머만으로 스피너를 보여 기다리게 한다.
```js
// 데이터가 이미 있는데 연출용으로 1.5초 스피너 표시
spinner.hidden = false;
setTimeout(() => { spinner.hidden = true; }, 1500);
```

## STATE-020 확정·불확정 진행 표시 선택

- 강도: **SHOULD**
- 룰: 진행률을 계산할 수 있는 처리(파일 업로드·다운로드처럼 끝 지점이 정해진 처리)에는 진행률 값을 보여주는 확정 진행 표시를 쓰고, 완료 시점을 알 수 없는 처리에는 불확정 진행 표시를 쓰며, 진행 표시 요소에 접근 가능한 이름을 준다.
- 측정 기준: (1a) 확정 진행 표시는 네이티브 <progress value max>로 만들고, value가 화면 표시와 함께 갱신된다. (1b) 원형 확정 스피너처럼 <progress>로 그릴 수 없는 모양이라 role="progressbar"를 쓴 경우에는 aria-valuenow(필요시 aria-valuemin·aria-valuemax)가 있고, 그 값이 화면 표시와 함께 갱신된다. (2) 불확정 진행 표시는 <progress>에 value가 없거나 role="progressbar"에 aria-valuenow가 없다. (3) 진행 표시 요소에 aria-label·aria-labelledby 또는 label로 접근 가능한 이름이 있다. (4) 바이트 수·처리 건수를 아는 처리에 불확정 표시를 쓰지 않는다.
- 판정 방법: 업로드·다운로드·일괄 처리 화면에서 진행 표시 마크업과 값 갱신을 확인한다.
- 자동 검사: partial (axe-core/aria-progressbar-name)
- 적용 대상: progress, [role=progressbar], 스피너
- 결정 CF-016: 선택 순서: 화면(페이지) 로드 → 스켈레톤, 끝 지점을 아는 처리 → 확정 진행 표시, 끝을 모르는 처리 → 불확정 진행 표시.
- 결정 CF-060: FORM-072: aria-disabled 만 쓰고 disabled 금지, aria-disabled 상태에서 클릭·Enter·Space를 해도 값은 경계값 그대로. A11Y-039: 첫 태그를 지우면 새 첫 태그로 초점. STATE-020: 네이티브 progress 우선(html-validate prefer-native-element 와 일치). COPY-048: 아이콘 버튼 이름 툴팁은 대상 아님. SHAPE-004: 플로팅 버튼 2(KRDS에 없는 체계 선택), 긴급 공지 2, 모달 4. KRDS 그림자 단계 설명(PDF 183쪽)의 '4단계: 모달, 긴급 알림'과 엘리베이션 적용(PDF 191쪽)의 '긴급 공지 shadow2'는 같은 컴포넌트(KRDS 컴포넌트 목록에는 '긴급 알림'이 없고 '긴급 공지(Critical alerts)'만 있다)로 보고, 컴포넌트별로 지정한 적용 절(2단계)을 따른다. SPACE-001: var(--layout-screen-margin-*) 도 간격 값으로 허용.
- 근거: 진행률을 아는데 불확정 표시를 쓰면 사용자가 얼마나 기다릴지 알 수 없다. ARIA 1.2는 값을 알면 aria-valuenow를 주고 모르면 생략하라고 쓴다.
- 출처: KRDS 컴포넌트 > 스피너 > 유형 — '확정 스피너는 … 진행률을 계산할 수 있는 경우에 사용한다', '불확정 스피너는 계산할 수 없는 대기 시간을 표현할 때 사용한다' (가이드라인 PDF 2025.08 590쪽); NNG_RESPONSE_TIMES 10 seconds; 보강 절 'percent-done indicator as well as a clearly signposted way ... to interrupt'; NNG_PROGRESS Percent-done animation: 10 seconds or more; MYERS_1985 3.4 Results; WAI_ARIA_12 progressbar role (name required; aria-valuenow SHOULD, omit when indeterminate SHOULD)

좋은 예 — 끝을 아는 업로드에 값이 있는 확정 진행 표시와 이름을 준다.
```html
<label for="up">증빙 서류 업로드</label>
<progress id="up" value="42" max="100">42%</progress>
```
나쁜 예 — 진행률을 계산할 수 있는 처리에 불확정 진행 표시를 쓴다.
```html
<!-- 업로드 바이트 수를 아는데 값 없는 불확정 표시만 둔다 -->
<label for="up">증빙 서류 업로드</label>
<progress id="up"></progress>
```

## STATE-021 스피너 크기 선택

- 강도: **SHOULD**
- 룰: 스피너 크기는 배치 유형으로 정한다: 버튼·메뉴 항목·입력 필드 안과 결과 내용을 대신하지 않는 상태 행에는 작은 크기를, 결과가 들어갈 영역의 내용을 대신하는 영역 로딩과 페이지 전체 로딩에는 큰 크기를 쓴다.
- 측정 기준: 스피너가 보이는 상태에서 배치 유형을 아래 순서로 정하고, 유형별 크기 변형을 쓴다. (A) 컨트롤 안 — 스피너가 button·[role=button]·[role=menuitem]·[role=option] 또는 입력 필드 컴포넌트 루트(input·textarea·select 를 감싼 text-field·select 등)의 하위에 있다: spinner--small. (D) 페이지 전체 — 스피너가 다른 콘텐츠 없이 뷰포트 전체를 덮는다: spinner--page. (C) 영역 대체 — 스피너가 처리 결과가 들어갈 요소(STATE-046 의 aria-busy 대상 영역) 안에 있고, 표시되는 동안 그 요소 안에 스피너·처리 중 텍스트·그 요소의 제목(h1~h6) 외에 보이는 내용이 없거나 스피너가 내용을 덮는 오버레이다: spinner--large. (B) 그 밖의 배치 — 결과 영역 위·아래의 한 줄 상태 행(처리 중 텍스트·중단 버튼과 함께), 결과 일부와 함께 보이는 진행 표시 등: spinner--small. 크기 변형이 없는 기본 스피너는 (A)~(D) 어디에도 쓰지 않는다. 크기 값은 spinner 규격 토큰(small = --size-height-2, large·page = --size-height-7)이며, (A)·(B)에서 스피너 식별자 높이는 그 컨트롤·행의 높이를 넘지 않는다.
- 판정 방법: 스피너가 보이는 화면 상태마다 DOM 에서 스피너의 조상(A)·덮는 범위(D)·대상 영역의 다른 보이는 내용(C)을 확인해 유형을 정하고, 크기 변형 클래스를 확인한다.
- 자동 검사: none
- 적용 대상: 스피너
- 근거: 공간이 제한된 컨트롤 안에서는 작은 스피너가, 페이지 전체 대기에는 눈에 띄는 큰 스피너가 대기 상태를 알아보기 쉽다(KRDS).
- 출처: KRDS 컴포넌트 > 스피너 > 사용성 가이드라인

좋은 예 — 버튼 안 대기에는 버튼 높이를 넘지 않는 작은 스피너를 쓴다.
```html
<button type="submit"><span class="spinner spinner--sm" aria-hidden="true"></span> 조회</button>
```
좋은 예 — 결과를 대신하지 않는 상태 행은 작은 크기, 결과 자리를 대신하는 영역 로딩은 큰 크기를 쓴다.
```html
<!-- (B) 결과 영역 위 한 줄 상태 행 — 결과는 아래에 이어서 나온다 -->
<div class="result__progress">
  <div class="spinner spinner--small"><progress class="spinner__indicator" aria-labelledby="pg"></progress><span class="spinner__text" id="pg">요약을 만드는 중입니다.</span></div>
  <button type="button">생성 중단</button>
</div>
<!-- (C) 결과 목록 자리를 스피너가 대신한다 -->
<section aria-labelledby="rt" aria-busy="true">
  <h2 id="rt">검색 결과</h2>
  <div class="spinner spinner--large" role="status"><progress class="spinner__indicator" aria-labelledby="rl"></progress><span class="spinner__text" id="rl">검색 결과를 불러오는 중입니다.</span></div>
</section>
```
나쁜 예 — 컨트롤 안에 큰 크기 스피너를 쓴다.
```html
<!-- 버튼 안에 대형(48px) 스피너가 들어가 버튼 높이를 늘린다 -->
<button type="submit"><span class="spinner spinner--lg" aria-hidden="true"></span> 조회</button>
```
나쁜 예 — 영역 내용을 대신하는 로딩에 크기 변형 없는 기본 스피너를 쓴다.
```html
<!-- (C) 영역 내용을 대신하는데 기본 크기 스피너를 쓴다 -->
<section aria-labelledby="rt" aria-busy="true">
  <h2 id="rt">검색 결과</h2>
  <div class="spinner" role="status"><progress class="spinner__indicator" aria-labelledby="rl"></progress><span class="spinner__text" id="rl">검색 결과를 불러오는 중입니다.</span></div>
</section>
```

## STATE-022 스피너 위치

- 강도: **SHOULD**
- 룰: 스피너는 처리가 일어나는 영역 안(제출 처리는 제출 버튼 안에 둘 수도 있다)에 두고, 페이지 전체나 맥락이 바뀌는 영역 전체를 불러올 때는 화면 또는 그 영역의 가운데에 둔다.
- 측정 기준: (1) 부분 갱신 스피너는 갱신되는 영역(또는 그 영역을 일으킨 버튼)의 DOM 하위에 있다. (2) 전체 로딩 스피너의 중심 좌표가 뷰포트 또는 대상 영역의 중심 좌표와 같다(가운데 정렬 CSS로 배치).
- 판정 방법: 스피너 표시 상태에서 요소 위치(getBoundingClientRect)를 대상 영역과 비교한다.
- 자동 검사: none
- 적용 대상: 스피너
- 근거: 사용자가 주의를 기울일 위치에 스피너가 있어야 어떤 부분이 처리 중인지 안다(KRDS).
- 출처: KRDS 컴포넌트 > 스피너 > 사용성 가이드라인 (가이드라인 PDF 2025.08 589·593쪽)

좋은 예 — 스피너를 갱신되는 영역 안 가운데에 둔다.
```css
.region { position: relative; }
.region > .spinner { position: absolute; inset: 0; margin: auto; } /* 갱신 영역 안 가운데 */
```
나쁜 예 — 처리 영역과 떨어진 화면 구석에 스피너를 둔다.
```css
/* 목록 영역만 갱신하는데 화면 우상단 고정 위치에 스피너 */
.spinner { position: fixed; inset-block-start: var(--space-gap-2); inset-inline-end: var(--space-gap-2); }
```

## STATE-023 스피너 동시 1개

- 강도: **SHOULD**
- 룰: 화면에 스피너를 동시에 2개 이상 표시하지 않는다. 버튼·입력 필드 같은 컴포넌트 안에 작게 표시하는 스피너와 파일 업로드처럼 항목마다 진행 상태를 보여야 하는 경우는 예외로 한다.
- 측정 기준: 한 시점에 보이는 스피너 중 컴포넌트 내부 소형 스피너와 항목별 진행 표시를 뺀 수가 1개 이하다.
- 판정 방법: 여러 영역을 동시에 불러오는 화면에서 로딩 중 스피너 수를 센다.
- 자동 검사: none
- 적용 대상: 스피너
- 예외: 컴포넌트(버튼·입력 필드 등)의 일부로 작게 표시하는 스피너
- 예외: 파일 업로드처럼 개별 항목에 진행 상태를 표시해야 하는 경우
- 근거: 스피너가 여러 개면 정보 과부하와 시각적 소음이 생긴다(KRDS).
- 출처: KRDS 컴포넌트 > 스피너 > 사용성 가이드라인 (가이드라인 PDF 2025.08 594쪽)

좋은 예 — 페이지 로딩 스피너를 1개만 표시한다.
```html
<main aria-busy="true">
  <div class="spinner spinner--lg" role="status" aria-label="불러오는 중"></div>
</main>
```
나쁜 예 — 영역마다 큰 스피너를 띄워 한 화면에 3개가 동시에 돈다.
```html
<section aria-busy="true"><div class="spinner spinner--lg" role="status" aria-label="공지 불러오는 중"></div></section>
<section aria-busy="true"><div class="spinner spinner--lg" role="status" aria-label="일정 불러오는 중"></div></section>
<section aria-busy="true"><div class="spinner spinner--lg" role="status" aria-label="통계 불러오는 중"></div></section>
```

## STATE-024 도움·따라하기 패널 다시 열면 마지막 콘텐츠

- 강도: **SHOULD**
- 룰: 도움 패널이나 따라하기 패널을 닫았다가 다시 열면(다른 패널로 전환했다가 돌아온 경우 포함) 사용자가 마지막으로 본 콘텐츠를 표시한다.
- 측정 기준: 패널에서 기본 상태가 아닌 콘텐츠 X(따라하기는 단계 N)로 이동 → 패널 닫기(또는 다른 패널로 전환) → 다시 열기 시 X(단계 N)가 표시된다.
- 판정 방법: 같은 페이지 안에서 위 절차를 수행한다.
- 자동 검사: none
- 적용 대상: 도움 패널, 따라하기 패널
- 근거: 다시 열 때마다 처음으로 돌아가면 사용자가 보던 도움말이나 진행 중인 따라하기 단계를 다시 찾아야 한다(KRDS 도움 패널·따라하기 패널).
- 출처: KRDS 컴포넌트 > 도움 패널 > 사용성 가이드라인 (가이드라인 PDF 2025.08 605쪽); KRDS 컴포넌트 > 따라하기 패널 > 사용성 가이드라인 — '패널을 닫거나 도움 패널로 전환하였다 따라하기 패널을 다시 실행하더라도 본문은 사용자가 가장 마지막에 확인한 따라하기 콘텐츠를 표시해야 한다' (가이드라인 PDF 2025.08 615쪽)

좋은 예 — 패널을 다시 열면 마지막으로 본 주제를 보여준다.
```js
panel.addEventListener('close', () => sessionStorage.setItem('help:last', panel.dataset.topic));
openBtn.addEventListener('click', () => showHelp(sessionStorage.getItem('help:last') ?? 'intro'));
```
나쁜 예 — 다시 열 때마다 기본 화면으로 돌아가 보던 위치를 잃는다.
```js
openBtn.addEventListener('click', () => showHelp('intro')); // 항상 첫 화면으로 초기화
```

## STATE-025 따라하기 중단은 사용자만

- 강도: **SHOULD**
- 룰: 사용자가 '중단하기' 버튼을 누르기 전까지 따라하기 패널의 콘텐츠를 다른 콘텐츠로 바꾸거나 따라하기 절차를 끝내지 않는다.
- 측정 기준: 따라하기 진행 중 페이지 안 다른 조작(다른 링크·버튼 사용, 도움 패널 전환, 패널 닫기)을 해도 따라하기 절차가 유지되고, '중단하기'를 눌렀을 때만 절차가 끝난다.
- 판정 방법: 따라하기를 시작한 뒤 위 조작을 각각 해 보고 다시 패널을 연다.
- 자동 검사: none
- 적용 대상: 따라하기 패널
- 근거: 사용자 의도 없이 따라하기가 바뀌거나 끝나면 진행 중인 과업 안내를 잃는다(KRDS 따라하기 패널).
- 출처: KRDS 컴포넌트 > 따라하기 패널 > 사용성 가이드라인 (가이드라인 PDF 2025.08 615쪽); KRDS 컴포넌트 > 따라하기 패널 > 사용성 가이드라인 (사용자가 중단하기 버튼을 누르기 전까지 따라하기 프로세스가 중단되지 않아야 한다 — 근거 문단) (가이드라인 PDF 2025.08 615쪽)

좋은 예 — "중단하기"를 누를 때만 따라하기 절차가 끝난다.
```html
<aside aria-labelledby="wt">
  <h2 id="wt">따라하기: 전입신고 (2/5)</h2> …
  <button type="button">중단하기</button>
</aside>
```
나쁜 예 — 사용자가 중단하지 않았는데 절차를 끝낸다.
```js
// 본문의 다른 링크·버튼을 누르면 따라하기를 자동 종료
document.addEventListener('click', () => walkthrough.end());
```

## STATE-027 맥락적 도움말 중첩 금지

- 강도: **SHOULD**
- 룰: 맥락적 도움말 팝오버는 한 번에 1개만 열고, 팝오버 안에서 다른 맥락적 도움말 팝오버나 모달을 열지 않는다.
- 측정 기준: (1) 맥락적 도움말 팝오버가 열린 상태에서 다른 도움말을 열면 기존 팝오버가 닫혀 열린 팝오버 수가 항상 1개 이하다. (2) 팝오버 안에 다른 도움말 팝오버나 모달을 여는 컨트롤이 없다.
- 판정 방법: 도움말 트리거를 차례로 눌러 열린 팝오버 수를 세고, 팝오버 내부 컨트롤을 검사한다.
- 자동 검사: none
- 적용 대상: [popover], 맥락적 도움말
- 근거: 팝오버가 겹치거나 팝오버에서 모달이 생기면 인터페이스 동작을 혼동한다(KRDS 맥락적 도움말).
- 출처: KRDS 컴포넌트 > 맥락적 도움말 > 사용성 가이드라인 (가이드라인 PDF 2025.08 628쪽); KRDS 컴포넌트 > 맥락적 도움말 > 사용성 가이드라인 — '여러 개의 도움말 팝업을 동시에 활성화 하거나 하나의 팝오버를 다른 팝오버 내부에 중첩시켜서는 안 된다' (가이드라인 PDF 2025.08 628쪽)

좋은 예 — 도움말 팝오버(popover=auto)는 한 번에 1개만 열린다.
```html
<button type="button" popovertarget="h1">소득 기준 도움말</button>
<div id="h1" popover>소득 기준은 직전 연도 소득입니다.</div>
```
나쁜 예 — 팝오버 안에서 다른 도움말 팝오버를 연다.
```html
<div id="h1" popover>소득 기준은 직전 연도 소득입니다.
  <button type="button" popovertarget="h2">소득 산정 방법 도움말</button></div>
<div id="h2" popover>…</div>
```

## STATE-029 코치마크 동시 1개

- 강도: **SHOULD**
- 룰: 한 화면에 코치마크를 동시에 2개 이상 표시하지 않는다.
- 측정 기준: 코치마크 진행 중 어느 시점에도 보이는 코치마크 팝오버가 1개 이하다.
- 판정 방법: 코치마크 전체 단계를 진행하며 각 단계에서 보이는 코치마크 수를 센다.
- 자동 검사: none
- 적용 대상: 코치마크
- 근거: 여러 코치마크가 동시에 보이면 단계별 안내라는 목적과 이용 흐름에 맞지 않는다(KRDS 코치마크).
- 출처: KRDS 컴포넌트 > 코치마크 > 사용성 가이드라인 (가이드라인 PDF 2025.08 642쪽)

좋은 예 — 코치마크를 한 번에 1개만 표시한다.
```html
<div class="coachmark" role="dialog" aria-labelledby="cm1">
  <h2 id="cm1">검색창 (1/3)</h2> …
</div>
```
나쁜 예 — 코치마크 3개를 동시에 띄운다.
```html
<div class="coachmark" role="dialog" aria-label="검색창 안내">…</div>
<div class="coachmark" role="dialog" aria-label="메뉴 안내">…</div>
<div class="coachmark" role="dialog" aria-label="로그인 안내">…</div>
```

## STATE-030 코치마크 중 다른 레이어 금지

- 강도: **SHOULD**
- 룰: 코치마크가 표시되는 동안 알림·배너·토스트 같은 다른 레이어를 띄우지 않고, 그동안 생긴 알림은 버리지 않고 코치마크가 닫힌 직후 표시한다. 시간 제한 경고와 오류·긴급 알림은 예외로 즉시 띄우고 코치마크를 닫는다.
- 측정 기준: (1) 코치마크가 보이는 동안 새로 나타나는 오버레이 레이어(토스트·스낵바·배너·모달·팝오버)가 0개다(시간 제한 경고·오류·긴급 알림 제외). (2) 코치마크 중 발생한 알림은 코치마크가 닫힌 직후 표시된다. (3) 시간 제한 경고·오류·긴급 알림이 발생하면 코치마크가 닫히고 그 알림이 즉시 표시된다.
- 판정 방법: 코치마크 진행 중 알림을 일으키는 조건(새 메시지 수신 등)을 만들어 레이어 출현 여부를 확인한다.
- 자동 검사: none
- 적용 대상: 코치마크
- 예외: 시간 제한 경고(A11Y-014: 만료 20초 이상 전 경고), 오류·긴급 알림 — 즉시 띄우고 코치마크를 닫는다(CF-001).
- 결정 CF-001: 양립. 코치마크 표시 중 생긴 알림은 버리지 않고 코치마크가 닫힌 직후 표시한다. 단, 시간 제한 경고(A11Y-014)와 오류·긴급 알림은 즉시 띄우고 코치마크를 닫는다. 토스트 표시 시간은 CF-030을 따른다.
- 근거: 다른 레이어가 끼어들면 코치마크가 안내하는 과업에 집중할 수 없다(KRDS).
- 출처: KRDS 컴포넌트 > 코치마크 > 사용성 가이드라인 (가이드라인 PDF 2025.08 642쪽)

좋은 예 — 코치마크 동안 일반 알림은 보류했다가 닫힌 직후 표시하고, 시간 제한 경고·오류·긴급 알림은 코치마크를 닫고 즉시 표시한다.
```js
// 일반 알림은 코치마크가 닫힐 때까지 보관하고, 시간 제한 경고·오류·긴급 알림은 코치마크를 닫고 즉시 띄운다
function notify(message) {
  if (!coachmark.active) return show(message);
  if (message.type === 'timeout-warning' || message.type === 'error' || message.urgent) {
    coachmark.close();
    show(message);
    return;
  }
  notifyQueue.hold(message);
}
coachmark.addEventListener('close', () => notifyQueue.flush());
```
나쁜 예 — 코치마크 표시 중 다른 레이어가 겹친다.
```html
<!-- 코치마크 위에 이벤트 배너 팝업이 뜬다 -->
<div class="coachmark" role="dialog" aria-label="검색창 안내">…</div>
<div class="promo-popup" role="dialog" aria-label="이벤트 안내">…</div>
```

## STATE-031 행동 요구 코치마크 자동 진행

- 강도: **SHOULD**
- 룰: 사용자에게 특정 행동을 요구하는 코치마크는 지시문에 행동을 마치면 다음 단계로 넘어간다는 사실을 쓰고, 시스템이 그 행동의 완료를 확인해 다음 단계로 넘어가게 하며, 행동을 마치기 전에는 넘어가지 않고, 단계가 넘어갈 때 키보드 초점을 강제로 옮기지 않는 대신 새 단계 지시문을 보조기술에 알린다.
- 측정 기준: 행동 요구 단계에서 (0) 코치마크 지시문에 행동을 마치면 다음 단계로 넘어간다는 문장이 있고, (1) 요구한 행동을 하면 다음 단계 코치마크가 표시되며, (2) 행동을 하지 않은 상태에서는 다음 단계로 이동하는 수단이 없고(이때 '그만보기' 버튼은 있다), (3) 단계가 넘어갈 때 document.activeElement가 바뀌지 않는다. (4) 단계가 넘어갈 때 새 단계 지시문이 role="status"(aria-live="polite") 영역에 들어가 낭독되거나, 현재 초점 요소의 aria-describedby가 새 단계 지시문 요소를 가리킨다.
- 판정 방법: 행동 요구 단계마다 행동 전·후 상태를 확인하고, 화면 낭독 프로그램(또는 접근성 트리)으로 단계 전환 시 새 지시문이 알려지는지 확인한다.
- 자동 검사: none
- 적용 대상: 코치마크
- 예외: '그만보기' 버튼을 제공하면 행동 요구 단계에서 '다음' 버튼을 생략할 수 있다(KRDS).
- 결정 CF-006: 양립. 코치마크 지시문에 '행동을 마치면 다음 단계로 넘어간다'는 사실을 쓰고, 단계가 넘어갈 때 키보드 초점을 강제로 옮기지 않는다.
- 근거: 사용자가 스스로 완료를 확인하게 하면 행동하지 않고 다음 단계로 가는 오류가 생긴다(KRDS).
- 출처: KRDS 컴포넌트 > 코치마크 > 사용성 가이드라인 (가이드라인 PDF 2025.08 645쪽); WCAG22 SC 4.1.3 Status Messages (Level AA)

좋은 예 — 지시문에 진행 조건을 쓰고, 행동 완료를 확인해야 넘어가며, 새 단계 지시문을 role=status로 알린다.
```html
<div class="coachmark" role="dialog" aria-labelledby="cm2" aria-describedby="cm2-desc">
  <h2 id="cm2">이름 입력 (2/3)</h2>
  <p id="cm2-desc">이름을 입력하면 다음 단계로 넘어갑니다.</p>
  <button type="button">그만보기</button>
</div>
<div role="status" class="sr-only" id="cm-live"></div>
<script>
  nameInput.addEventListener('change', () => {
    if (!nameInput.value) return;
    coachmark.next(); // 초점은 옮기지 않는다
    document.getElementById('cm-live').textContent = '3/3 단계: 연락처를 입력하면 안내가 끝납니다.';
  });
</script>
```
나쁜 예 — 요구한 행동 없이 다음 단계로 넘어갈 수 있다.
```html
<!-- 입력하지 않아도 "다음"으로 넘어간다 -->
<div class="coachmark" role="dialog" aria-labelledby="cm2">
  <h2 id="cm2">이름 입력 (2/3)</h2><p>이름을 입력하세요.</p>
  <button type="button">다음</button>
</div>
```

## STATE-032 입력 유실 전 경고

- 강도: **SHOULD**
- 룰: 작성 중인 입력 내용이 사라지는 이동(뒤로가기 버튼, 시스템 뒤로가기, 페이지 이탈) 전에는 내용이 사라진다고 경고하고, 계속 이동할지 머무를지 사용자가 고르게 한다.
- 측정 기준: 입력 필드 값을 1개 이상 바꾼 뒤 (1) 앱 내 뒤로가기 버튼을 누르면 '이동'·'머무르기' 선택이 있는 확인 대화상자가 뜨고, (2) 브라우저 뒤로가기·새로 고침·탭 닫기 시 beforeunload 확인이 뜬다. 입력이 없거나 저장한 뒤에는 경고가 뜨지 않는다.
- 판정 방법: 입력 화면에서 위 이동을 각각 시도한다.
- 자동 검사: partial (ux-baseline-check/leave-warning)
- 적용 대상: 작성 중인 form이 있는 화면, 뒤로가기 버튼
- 근거: 신청·입력 중 이동으로 내용이 사라지면 사용자가 처음부터 다시 입력해야 한다(KRDS 뒤로가기 버튼).
- 출처: KRDS 컴포넌트 > 뒤로가기 버튼 > 사용성 가이드라인

좋은 예 — 입력이 있으면 이탈 전에 브라우저 확인을 띄운다.
```js
let dirty = false;
form.addEventListener('input', () => { dirty = true; });
form.addEventListener('submit', () => { dirty = false; });
addEventListener('beforeunload', (e) => { if (dirty) e.preventDefault(); });
```
나쁜 예 — 작성 내용이 사라지는 이동 전에 경고하지 않는다.
```html
<!-- 입력 중 눌러도 경고 없이 이전 화면으로 이동 -->
<button type="button" onclick="history.back()">이전 화면</button>
```

## STATE-033 바텀시트 닫기 버튼

- 강도: **SHOULD**
- 룰: 바텀시트에는 스와이프와 별도로 '닫기' 버튼(텍스트 '닫기' 또는 접근 가능한 이름이 '닫기'인 X 아이콘 버튼)을 넣고, 그 버튼을 시트 상단에 둔다.
- 측정 기준: 열린 바텀시트 안에 접근 가능한 이름이 '닫기'인 button이 있고, 시트의 헤더(상단) 영역에 있다. 이 버튼을 누르면 시트가 닫힌다.
- 판정 방법: 바텀시트를 열어 버튼 존재·이름·위치를 확인한다.
- 자동 검사: partial (axe-core/button-name)
- 적용 대상: 바텀시트
- 근거: 핸들 스와이프로 닫는 방법을 모든 사용자가 알지 못하므로 화면에서 인지하기 쉬운 닫기 버튼이 필요하다(KRDS 바텀시트).
- 출처: KRDS 컴포넌트 > 바텀시트 > 사용성 가이드라인

좋은 예 — 시트 상단에 이름이 "닫기"인 버튼을 둔다.
```html
<div role="dialog" aria-modal="true" aria-labelledby="bs-t" class="bottom-sheet">
  <header><h2 id="bs-t">정렬</h2><button type="button" aria-label="닫기">×</button></header> …
</div>
```
나쁜 예 — 스와이프로만 닫혀 키보드·보조기술 사용자가 닫을 수 없다.
```html
<div role="dialog" aria-modal="true" aria-label="정렬" class="bottom-sheet">
  <div class="handle"></div> … <!-- 닫기 버튼 없음, 스와이프로만 닫힘 -->
</div>
```

## STATE-034 바텀시트 겹침

- 강도: **SHOULD**
- 룰: 바텀시트는 한 번에 1개만 띄우고, 불가피하게 여러 개를 겹칠 때는 현재 단계를 표시하며 닫기 동작을 '현재 시트만 닫기'와 '전체 닫기'로 나눠 제공하고, 배경 딤드는 한 겹만 표시한다.
- 측정 기준: (1) 열린 바텀시트가 1개다. 또는 (2) 2개 이상이면 맨 위 시트에 현재 단계 텍스트(예: '2/3' 또는 단계 제목)가 있고, 현재 시트만 닫는 버튼과 모든 시트를 닫는 버튼이 따로 있으며, 배경 딤드 요소가 1개만 보인다.
- 판정 방법: 바텀시트에서 다른 바텀시트를 여는 흐름을 찾아 확인한다.
- 자동 검사: none
- 적용 대상: 바텀시트
- 결정 CF-017: 바텀시트를 겹쳐 띄우더라도 배경 딤드는 맨 위 시트 아래 한 겹만 표시한다.
- 근거: 시트가 겹치면 사용자가 현재 단계를 혼동하므로 하나만 쓰는 것이 기본이다(KRDS 바텀시트).
- 출처: KRDS 컴포넌트 > 바텀시트 > 상호작용 가이드라인

좋은 예 — 겹친 시트에 현재 단계와 "현재만 닫기·전체 닫기"를 따로 둔다.
```html
<div role="dialog" aria-modal="true" aria-labelledby="t2" class="bottom-sheet">
  <header><h2 id="t2">시간 선택 (2/2)</h2>
    <button type="button">이전 시트로</button><button type="button">모두 닫기</button></header> …
</div>
```
나쁜 예 — 여러 시트를 단계 표시·닫기 구분 없이 겹친다.
```html
<!-- 시트 3개가 겹쳐 있고 닫기 하나로 무엇이 닫히는지 알 수 없다 -->
<div role="dialog" aria-label="지역 선택" class="bottom-sheet">…</div>
<div role="dialog" aria-label="날짜 선택" class="bottom-sheet">…</div>
<div role="dialog" aria-label="시간 선택" class="bottom-sheet"><button type="button" aria-label="닫기">×</button>…</div>
```

## STATE-038 스낵바 1개

- 강도: **SHOULD**
- 룰: 한 페이지에 스낵바를 1개만 표시하고, 여러 스낵바를 겹치거나 쌓지 않는다.
- 측정 기준: 어느 시점에도 화면에 보이는 스낵바가 1개 이하다. 새 스낵바가 뜨면 기존 스낵바는 닫히거나 대기열에서 기다린다.
- 판정 방법: 스낵바를 연달아 일으키는 동작을 빠르게 반복해 동시에 보이는 수를 센다.
- 자동 검사: none
- 적용 대상: 스낵바
- 근거: 여러 스낵바는 주의를 분산시킨다(KRDS 스낵바).
- 출처: KRDS 컴포넌트 > 스낵바 > 사용성 가이드라인

좋은 예 — 새 스낵바를 띄우기 전에 기존 스낵바를 닫는다.
```js
let current;
function showSnackbar(msg) { current?.close(); current = createSnackbar(msg); }
```
나쁜 예 — 스낵바 3개를 쌓아 표시한다.
```html
<div class="snackbar" role="status">파일 1을 삭제했습니다</div>
<div class="snackbar" role="status">파일 2를 삭제했습니다</div>
<div class="snackbar" role="status">파일 3을 삭제했습니다</div>
```

## STATE-039 스낵바 작업 버튼

- 강도: **SHOULD**
- 룰: 스낵바 작업 버튼은 메시지와 직접 관련된 행동(되돌리기·재시도·목록 이동 등)에만 텍스트 버튼으로 최대 1개 두고, 메시지 오른쪽에 둔다.
- 측정 기준: 스낵바마다 닫기 버튼을 뺀 작업 버튼이 0~1개이고, 텍스트 버튼 스타일이며, DOM·시각 순서에서 메시지 다음(오른쪽)에 있다. 버튼 레이블이 메시지가 알린 결과에 대한 행동이다.
- 판정 방법: 스낵바 사용처별로 버튼 수·스타일·위치·레이블을 확인한다.
- 자동 검사: none
- 적용 대상: 스낵바
- 근거: 버튼이 여럿이거나 무관한 행동이 붙으면 간단한 조치를 제공하는 스낵바의 목적에서 벗어난다(KRDS 스낵바).
- 출처: KRDS 컴포넌트 > 스낵바 > 사용성 가이드라인

좋은 예 — 메시지와 직접 관련된 텍스트 버튼 1개를 메시지 오른쪽에 둔다.
```html
<div class="snackbar" role="status">
  <span>메일을 보관함으로 옮겼습니다</span>
  <button type="button" class="btn-text">되돌리기</button>
  <button type="button" aria-label="닫기">×</button>
</div>
```
나쁜 예 — 작업 버튼이 2개이고 그중 하나는 메시지와 관련 없는 행동이다.
```html
<div class="snackbar" role="status">
  <span>메일을 보관함으로 옮겼습니다</span>
  <button type="button" class="btn-text">되돌리기</button>
  <button type="button" class="btn-text">새 메일 쓰기</button>
</div>
```

## STATE-041 빈 상태 유형 구분

- 강도: **SHOULD**
- 룰: 목록·표·대시보드 영역에 보여줄 데이터가 없으면 아무것도 없는 빈 영역으로 두지 않고, '데이터 없음(처음 사용)', '사용자 행동의 결과(검색·필터 결과 없음)', '데이터를 가져올 수 없음(권한·시스템 문제·설정 필요)' 중 어느 경우인지 구분해 경우마다 비어 있는 이유와 사용자가 할 수 있는 다음 행동을 텍스트로 표시한다.
- 측정 기준: (1) 데이터 0건 상태에서 해당 영역에 이유를 설명하는 텍스트가 있다(제목만 있는 표·빈 컨테이너가 아님). (2) 세 경우(처음 사용·검색/필터 결과 없음·가져올 수 없음)를 각각 재현했을 때 표시 문구가 서로 다르다. (3) 다음 행동이 있는 경우 그 행동의 안내 또는 버튼·링크가 있다(예: 검색 결과 없음 → 검색어·필터 조정 안내, 권한 문제 → 권한 요청 방법). (4) 안내한 다음 행동은 그 상태에서 실행할 수 있다 — 안내가 가리키는 컨트롤이 화면에 있고 사용할 수 있으며(disabled·aria-disabled="true" 아님) 그 행동이 빈 상태를 바꿀 수 있는 선택지가 남아 있다. 예: 이미 가장 긴 기간(30일)을 고른 상태에서 '더 긴 기간을 선택해 보세요'는 실패. 실행할 수 있는 다음 행동이 없으면 이유만 쓴다.
- 판정 방법: 세 경우를 테스트 데이터·권한·오류 주입으로 재현해 화면을 비교하고, 조회 조건(기간·필터)의 각 값에서 빈 상태를 만들어 안내 문구가 그 값에서 실행 가능한지 확인한다.
- 자동 검사: none
- 적용 대상: 목록, table, 대시보드 위젯, 빈 상태
- 예외: 알림처럼 '처리할 것이 없음' 자체가 정상 결과이고 다음 행동이 없는 경우 보조 설명과 다음 행동은 생략할 수 있다(Carbon 'next steps are not required' 예시).
- 근거: 완전히 빈 화면은 처리가 끝났는지·로딩 중인지·오류인지 알 수 없게 한다(NN/g). 원인별로 사용자가 할 일이 다르므로 유형을 구분해 안내한다(Carbon).
- 출처: CARBON_EMPTY Empty state types — No data / User action / Error management (Permissions issue, Systems issue, Configuration required, Action not supported); NNG_EMPTY_STATES Use Empty States to Communicate System Status — 'Do not default to totally empty states'

좋은 예 — 빈 이유(검색 결과 없음)와 다음 행동을 텍스트로 쓴다.
```html
<section aria-labelledby="t">
  <h2 id="t">신청 내역</h2>
  <p>검색 조건에 맞는 신청 내역이 없습니다. 기간을 늘리거나 상태 필터를 해제해 보세요.</p>
</section>
```
나쁜 예 — 데이터가 0건일 때 머리글만 있는 빈 표를 둔다.
```html
<table>
  <caption>신청 내역</caption>
  <thead><tr><th scope="col">신청일</th><th scope="col">상태</th></tr></thead>
  <tbody></tbody>
</table>
```
나쁜 예 — 이미 가장 긴 기간인데 더 긴 기간을 고르라고 안내한다 — 실행할 수 없는 다음 행동이다.
```html
<button type="button" aria-pressed="true">30일</button> <!-- 가장 긴 기간이 이미 선택됨 -->
<p>선택한 기간에 접수된 주문이 없습니다. 더 긴 기간을 선택해 보세요.</p>
```

## STATE-042 처음 사용 빈 상태의 다음 행동

- 강도: **SHOULD**
- 룰: 처음 사용 빈 상태에는 데이터가 생기면 이 영역에 무엇이 표시되는지 설명하는 문장을 두고, 사용자가 직접 데이터를 만들 수 있으면 그 행동으로 가는 주 버튼 또는 링크를 1개 둔다.
- 측정 기준: 처음 사용 빈 상태 영역에 (1) 표시될 내용을 설명하는 텍스트가 있고, (2) 사용자가 데이터를 만들 수 있는 기능이면 그 기능으로 가는 button 또는 a[href]가 주 행동으로 정확히 1개 있다.
- 판정 방법: 새 계정(데이터 0건)으로 각 목록·대시보드 화면을 연다.
- 자동 검사: none
- 적용 대상: 빈 상태(처음 사용)
- 예외: 사용자가 데이터를 직접 만들 수 없는 영역(시스템이 채우는 목록)에는 주 행동 버튼·링크를 두지 않는다 — Carbon 'If there is an actionable next step'.
- 근거: 빈 상태에서 기능의 용도를 알려주고 바로 시작할 경로를 주면 학습과 첫 사용이 빨라진다(Carbon, NN/g).
- 출처: CARBON_EMPTY No data empty states — 'explaining what will be in the space once it is populated with data, and providing guidance for the next step'; 'include a direct link in your message copy or a primary action button'; NNG_EMPTY_STATES Use Empty States to Provide Learning Cues; Provide Direct Pathways for Key Tasks

좋은 예 — 무엇이 표시될지 설명하고 데이터를 만드는 주 행동 1개를 둔다.
```html
<section data-empty-state="no-data" aria-labelledby="es-t">
  <h2 id="es-t">관심 서비스를 추가해 시작하세요</h2>
  <p>추가한 서비스의 신청 기간과 진행 상태가 여기에 표시됩니다.</p>
  <a class="btn btn--primary" href="/services">서비스 찾기</a>
</section>
```
나쁜 예 — 무엇이 표시될지와 시작할 행동이 없다.
```html
<section data-empty-state="no-data" aria-labelledby="es-t">
  <h2 id="es-t">관심 서비스</h2>
  <p>데이터가 없습니다.</p>
</section>
```

## STATE-043 페이지 없음(404) 화면

- 강도: **SHOULD**
- 룰: 없는 주소에 접근하면 HTTP 404 상태 코드로 응답하고, 제목 '페이지를 찾을 수 없습니다'와 주소를 직접 입력했으면 맞는지, 붙여넣었으면 전체를 복사했는지 확인하라는 안내를 보여주며, '404' 같은 기술 용어, 유머·가벼운 표현, 빨간 경고 텍스트, 브레드크럼을 쓰지 않는다.
- 측정 기준: (1) 존재하지 않는 경로 요청의 응답 상태가 404다. (2) h1이 '페이지를 찾을 수 없습니다'이고 document.title이 이 문구로 시작한다. (3) 본문에 주소 입력·복사 확인 안내가 있다. (4) 보이는 텍스트에 '404'·'Not Found'·'Bad Request'·'앗'·'이런' 같은 표현이 없다. (5) 브레드크럼 nav가 없다. (6) 본문 텍스트 색이 오류(빨강) 토큰이 아니다.
- 판정 방법: 존재하지 않는 URL을 요청해 상태 코드·DOM·계산된 색을 확인한다.
- 자동 검사: partial (custom)
- 적용 대상: 404 응답 페이지
- 근거: 사용자를 탓하거나 기술 용어를 쓰지 않고 다음에 할 일을 알려야 사용자가 스스로 복구할 수 있다(GOV.UK). 정확한 상태 코드는 검색엔진·도구가 페이지 없음을 판단하는 근거다(National Archives).
- 출처: GOVUK_404 How it works — page title, H1 'Page not found', contact information if it helps meet a user need; Do not use: breadcrumbs, technical jargon like 404, informal or humorous words, red text; NA_ERROR_PAGES Page not found — 'The server should return a 404 response code.'

좋은 예 — 404 상태로 응답하고 정해진 제목과 주소 확인 안내를 쓴다.
```html
<!-- HTTP 404 응답 -->
<title>페이지를 찾을 수 없습니다 - 서비스명</title>
<main><h1>페이지를 찾을 수 없습니다</h1>
  <p>주소를 직접 입력했다면 맞게 입력했는지 확인하세요.</p>
  <p>주소를 붙여넣었다면 전체 주소를 복사했는지 확인하세요.</p>
</main>
```
나쁜 예 — 기술 용어·가벼운 표현·빨간 텍스트·브레드크럼을 쓴다.
```html
<nav aria-label="브레드크럼">홈 &gt; 오류</nav>
<h1 class="text-error">404 Not Found 앗! 길을 잃으셨네요</h1>
```

## STATE-044 서비스 문제(5xx) 화면

- 강도: **SHOULD**
- 룰: 예상하지 못한 서버 오류가 나면 5xx 상태 코드로 응답하고, 모든 예상 못한 오류에 같은 화면으로 제목 '서비스에 문제가 있습니다', '잠시 후 다시 시도하세요' 안내, 진행 중이던 입력값의 저장 여부(저장했다면 보관 기간)를 보여주며, '500'·'Internal Server Error' 같은 기술 용어, '기술적인 문제가 발생했습니다' 같은 모호한 문구, 빨간 경고 텍스트, 브레드크럼을 쓰지 않는다.
- 측정 기준: (1) 오류 주입 시 응답 상태가 500~599다. (2) h1·document.title이 '서비스에 문제가 있습니다'로 시작한다. (3) '잠시 후 다시 시도하세요' 문장이 있다. (4) 입력 절차 중에 난 오류면 입력값 저장 여부 문장이 있다. (5) 보이는 텍스트에 '500'·'Internal Server Error'·스택트레이스가 없다. (6) 브레드크럼 nav와 오류(빨강) 색 본문 텍스트가 없다.
- 판정 방법: 서버 오류를 주입(테스트 엔드포인트·목 서버)해 상태 코드와 화면을 확인한다.
- 자동 검사: partial (custom)
- 적용 대상: 5xx 응답 페이지
- 예외: 계획된 서비스 중단(점검)은 이 화면이 아닌 서비스 이용 불가(503) 화면을 쓴다. 문제가 빨리 해결되지 않으면 서비스를 닫고 503 화면으로 바꾼다(GOV.UK).
- 예외: 본문에는 사과 문장('이용에 불편을 드려 죄송합니다' 등)을 쓸 수 있다. 이때도 h1·document.title은 '서비스에 문제가 있습니다'로 시작한다(CF-032).
- 결정 CF-032: 필드 오류 문구에는 높임 요청형('-을 입력해 주세요')을 쓸 수 있다. 사과 표현('죄송합니다')은 서비스 쪽 잘못인 시스템 오류 화면에만 쓴다.
- 근거: 사용자는 무엇이 일어났는지, 입력이 남았는지, 언제 다시 시도할지 알아야 한다. 기술 용어는 도움이 되지 않는다(GOV.UK).
- 출처: GOVUK_500 When to use / How it works — same page for all unexpected problems; H1, 'Try again later.', information about what has happened to their answers; do not use breadcrumbs, jargon like 500, 'We are experiencing technical difficulties', red text; NA_ERROR_PAGES Service issue — 'The server should also return a response code in the 5xx range.'

좋은 예 — 5xx로 응답하고 정해진 제목·재시도 안내·입력값 저장 여부를 쓴다. 본문의 사과 문장은 CF-032로 허용.
```html
<!-- HTTP 500 응답 -->
<title>서비스에 문제가 있습니다 - 서비스명</title>
<main><h1>서비스에 문제가 있습니다</h1>
  <p>이용에 불편을 드려 죄송합니다. 잠시 후 다시 시도하세요.</p>
  <p>입력한 내용은 저장했습니다. 30일 동안 보관됩니다.</p>
</main>
```
나쁜 예 — 상태 코드 번호·기술 용어·스택트레이스를 사용자에게 보인다.
```html
<h1>500 Internal Server Error</h1>
<pre>NullPointerException at …</pre>
```

## STATE-045 오프라인 시 부분 제한

- 강도: **SHOULD**
- 룰: 오프라인 상태가 되면 네트워크가 필요한 동작(구매·제출·동기화)만 비활성화하거나 연결 후 처리할 대기열에 넣고, 이미 불러온 콘텐츠는 계속 볼 수 있게 하며, 화면 전체를 덮는 모달로 이용을 막지 않는다.
- 측정 기준: 개발자 도구 네트워크 '오프라인' 전환 후 (1) 이미 렌더링된 콘텐츠를 스크롤·열람할 수 있다. (2) 화면 전체를 덮는 모달·오버레이가 나타나지 않는다. (3) 네트워크가 필요한 버튼은 disabled 또는 aria-disabled="true"이고 이유 텍스트가 있거나, 누르면 '연결되면 처리됩니다' 같은 대기 상태 메시지와 함께 대기열에 들어간다.
- 판정 방법: 페이지를 연 뒤 오프라인으로 바꿔 위 항목을 확인하고, 다시 온라인으로 바꿔 대기열 처리 여부를 확인한다.
- 자동 검사: none
- 적용 대상: 네트워크 연결 끊김, 이미 로드된 페이지·오프라인 캐시가 있는 웹앱
- 근거: 연결이 불안정할 때 화면 전체를 막으면 사용자는 아무것도 할 수 없다. 연결이 필요한 기능만 제한해야 과업을 이어갈 수 있다(web.dev 오프라인 UX).
- 출처: WEBDEV_OFFLINE Reflect context in the UI; Don't block content

좋은 예 — 네트워크가 필요한 동작만 막고 이유를 알리며 나머지 화면은 그대로 쓸 수 있다.
```html
<button type="button" disabled aria-describedby="off">결제하기</button>
<p id="off" role="status">인터넷 연결이 끊겨 결제할 수 없습니다. 연결되면 다시 시도하세요.</p>
```
나쁜 예 — 화면 전체를 덮는 모달로 이미 불러온 콘텐츠까지 막는다.
```html
<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="off-t" style="position: fixed; inset: 0">
  <h2 id="off-t">인터넷 연결이 끊겼습니다</h2>
</div>
```

## STATE-007 긴급 공지 긴급도 분류

- 강도: **MAY**
- 룰: 긴급 공지에는 긴급도 레이블을 붙이고, 재난·재해 대응과 예고 없는 서비스 장애·이용 중단은 '상', 이용 중단 사전 예고는 '중', 서비스 이용에 중대한 영향은 없지만 대부분의 사용자가 알아야 하는 상황은 '하'로 분류한다.
- 측정 기준: 긴급 공지마다 레이블(텍스트) 1개가 있고 값이 상·중·하(또는 그에 대응하는 서비스 용어) 중 하나이며, 내용과 레이블의 대응이 위 분류와 일치한다.
- 판정 방법: 긴급 공지 목록을 내용별로 분류해 레이블과 대조한다.
- 자동 검사: none
- 적용 대상: 긴급 공지
- 근거: 긴급도에 따라 아이콘·레이블·강조 수준을 달리해 사용자가 상황의 심각성을 빠르게 파악하게 한다(KRDS 긴급 공지 구조).
- 출처: KRDS 컴포넌트 > 긴급 공지 > 구조 (가이드라인 PDF 2025.08 361쪽)

좋은 예 — 예고 없는 장애를 긴급도 상으로 표시한다.
```html
<section class="emergency-notice emergency-notice--high" aria-labelledby="en-l">
  <strong id="en-l">긴급도: 상</strong> 전산 장애로 민원 신청이 중단되었습니다.
</section>
```
나쁜 예 — 사전 예고된 점검(중)을 상으로 잘못 분류한다.
```html
<section class="emergency-notice emergency-notice--high" aria-labelledby="en-l">
  <strong id="en-l">긴급도: 상</strong> 10월 20일 02:00~04:00 정기 점검으로 서비스를 중단합니다.
</section>
```

## STATE-010 디스클로저 초기 상태

- 강도: **MAY**
- 룰: 디스클로저는 페이지가 로딩될 때 접힌 상태로 제공한다.
- 측정 기준: 페이지 로드 직후 디스클로저가 details 요소면 open 속성이 없고, 버튼 패턴이면 트리거의 aria-expanded="false"이며 내용 영역이 숨겨져 있다.
- 판정 방법: 페이지를 새로 열고 DOM을 검사한다.
- 자동 검사: none
- 적용 대상: details, 디스클로저
- 근거: 디스클로저는 부가 정보를 숨겨 훑어보기 부담을 줄이는 용도라 펼친 채 시작하면 목적에 맞지 않는다(KRDS).
- 출처: KRDS 컴포넌트 > 디스클로저 > 사용성 가이드라인 (가이드라인 PDF 2025.08 383쪽)

좋은 예 — 로드 시 open 속성 없이 접힌 상태로 제공한다.
```html
<details>
  <summary>그래프 대체 텍스트 보기</summary>
  <p>2026년 분기별 신청 건수: 1분기 120건, 2분기 180건 …</p>
</details>
```
나쁜 예 — 로드 시 펼친 상태(open)로 제공한다.
```html
<details open>
  <summary>그래프 대체 텍스트 보기</summary>
  <p>2026년 분기별 신청 건수: 1분기 120건, 2분기 180건 …</p>
</details>
```

## STATE-014 배지 1개

- 강도: **MAY**
- 룰: 한 항목 컨테이너(목록 항목·표 행·카드·글·구역 등)에 보이는 배지를 1개만 붙인다.
- 측정 기준: (1) 배지의 항목 컨테이너는 배지에서 가장 가까운 조상 중 li, tr, [role=listitem], [role=row], article, section, dialog, .card(카드 컴포넌트 루트) 에 맞는 요소다. 이런 조상이 없으면 배지의 부모 요소를 항목 컨테이너로 본다. (2) 같은 항목 컨테이너를 가장 가까운 컨테이너로 가지는 보이는 배지(.badge, hidden·display:none 제외)가 1개 이하다. 하위 항목 컨테이너 안의 배지는 그 하위 컨테이너에서 센다. (3) 'AI 생성'처럼 법령 표시(AI-002)를 .badge 로 만들었으면 그것도 센다 — AI-002 는 배지가 아닌 제목·캡션 텍스트로도 충족된다. (4) 배지가 나타나는 모든 화면 상태에서 판정한다.
- 판정 방법: 배지가 나타나는 화면 상태마다 보이는 .badge 의 가장 가까운 항목 컨테이너를 찾아 컨테이너별 개수를 센다.
- 자동 검사: none
- 적용 대상: 배지, .badge
- 근거: 한 항목에 배지가 여러 개면 강조가 분산돼 배지가 정보 훑어보기를 돕지 못한다(KRDS 배지).
- 출처: KRDS 컴포넌트 > 배지 > 사용성 가이드라인

좋은 예 — 항목 하나에 배지 1개만 붙인다.
```html
<li>2026 청년 지원사업 <span class="badge">접수 중</span></li>
```
좋은 예 — 구역(section)에 배지 1개, 목록 항목(li)에 배지 1개 — 각 항목 컨테이너에서 1개씩이다.
```html
<section aria-labelledby="rt">
  <h2 id="rt">요약 결과</h2>
  <span class="badge badge--information">AI 생성 · 사용자가 고침</span>
  <ol><li>신청 기한은 30일입니다. <span class="badge badge--warning">확인 필요</span></li></ol>
</section>
```
나쁜 예 — 한 항목에 배지 3개를 붙여 어느 상태가 중요한지 흐려진다.
```html
<li>2026 청년 지원사업 <span class="badge">신규</span><span class="badge">접수 중</span><span class="badge">인기</span></li>
```
나쁜 예 — 가장 가까운 항목 컨테이너(section)에 보이는 배지가 2개다(법령 표시 'AI 생성' 배지도 센다).
```html
<section aria-labelledby="rt">
  <div class="result__head">
    <h2 id="rt">요약 결과</h2>
    <span class="badge badge--information">AI 생성</span>
    <span class="badge badge--gray">사용자가 고침</span>
  </div>
</section>
```

## STATE-035 바텀시트 용도

- 강도: **MAY** (판정에 사람의 판단 필요: guide)
- 룰: 바텀시트는 현재 화면을 유지한 채 하는 일시적인 짧은 상호작용(옵션 선택·부가 정보 확인)에만 쓰고, 오래 검토해야 하는 정보, 항상 필요한 정보·도구, 서비스 절차의 한 단계에는 쓰지 않는다.
- 측정 기준: 점검 질문: (1) 시트 내용이 항상 보여야 하는 정보·도구인가? (2) 서비스 신청 절차의 필수 단계인가? (3) 정책 안내처럼 읽는 데 오래 걸리는 내용인가? — 하나라도 '예'면 위반.
- 판정 방법: 바텀시트 사용처 목록을 점검 질문으로 검토한다.
- 자동 검사: none
- 적용 대상: 바텀시트
- 근거: 바텀시트는 화면 일부를 가리는 일시적 UI라 오래 쓰거나 늘 필요한 내용에는 맞지 않는다(KRDS).
- 출처: KRDS 컴포넌트 > 바텀시트 > 상호작용 가이드라인/용례

좋은 예 — 현재 화면을 유지한 짧은 옵션 선택이다.
```
목록 정렬 기준(최신순·조회순)을 고르는 바텀시트
```
나쁜 예 — 오래 읽어야 하는 내용을 일시적 시트에 담는다.
```
개인정보 처리방침 전문(30개 조항)을 바텀시트로 표시
```

## STATE-036 반복 인증 실패는 모달로

- 강도: **MAY**
- 룰: 같은 인증 절차에서 인증이 연속 2회 이상 실패하면 실패 알림을 토스트가 아닌 모달로 표시한다.
- 측정 기준: 인증을 1회 실패하면 토스트 또는 인라인 메시지가, 연속 2회째 실패부터 모달 대화상자가 표시된다.
- 판정 방법: 잘못된 인증 정보로 연속 2회 시도한다.
- 자동 검사: none
- 적용 대상: 인증 실패 알림, 토스트
- 결정 CF-052: AI-008: 사용자가 중단한 AI 응답 끝에 '생성 중단됨' 텍스트를 표시한다(MAY). AI-009: AI 결과마다 다시 생성 버튼을 두고 이전 결과를 다시 볼 수 있게 한다(MAY). 보존 방식(버전 탐색 또는 목록)은 둘 다 허용한다. COPY-029: 가로 배치 라디오·체크박스 레이블 길이 판정 기준은 '브레이크포인트 토큰 너비 360·768·1024·1280px(RESP-004)마다 한 줄'로 정한다(MAY). STATE-036: KRDS의 '인증 실패 반복'을 '같은 인증 절차에서 연속 2회 이상 실패'로 정한다(MAY). TYPO-017: 한국어 텍스트 블록의 기본 줄바꿈은 어절 단위(word-break: keep-all)로 정한다(MAY). TYPO-020: 한국어 본문에 word-break: break-all을 쓰지 않는다(MAY). 긴 URL·코드는 overflow-wrap: anywhere로 처리한다. TYPO-028: 본문 letter-spacing 기본값은 0이고 음수 값을 쓰지 않는다(MAY). TYPO-029: 0이 아닌 letter-spacing은 em 단위로 쓴다(MAY). KRDS 표의 px 자간은 글자 크기로 나눠 em으로 환산한다. 모두 강도 MAY로 두고, 근거는 UXB_SYSTEM_CHOICE(CF-052)로 표시한다.
- 근거: 반복 실패는 사용자가 원인을 놓치고 있다는 신호라 사라지는 토스트보다 확인이 필요한 모달로 알린다(KRDS 토스트).
- 출처: KRDS 컴포넌트 > 토스트 > 사용성 가이드라인; UXB_SYSTEM_CHOICE CF-052

좋은 예 — 연속 2회째 실패부터 모달로 알린다.
```html
<dialog open aria-labelledby="t">
  <h2 id="t">인증에 실패했습니다</h2>
  <p>인증서 비밀번호를 2회 잘못 입력했습니다. 5회 잘못 입력하면 인증서가 잠깁니다.</p>
  <button type="button">다시 입력</button>
</dialog>
```
나쁜 예 — 반복 실패를 사라지는 토스트로만 알린다.
```html
<!-- 3회째 실패도 몇 초 뒤 사라지는 토스트로만 알림 -->
<div class="toast" role="status">인증에 실패했습니다</div>
```

## STATE-037 토스트를 쓰지 않는 경우

- 강도: **MAY**
- 룰: 토스트에는 사라진 뒤에도 화면의 다른 곳에서 확인할 수 있는 결과만 담고, 중요하거나 긴급한 메시지는 토스트 대신 긴급 공지나 모달로, 사용자가 반드시 읽고 확인해야 하는 설명은 모달로, 개별 입력 항목의 오류·성공·경고 메시지는 해당 입력 필드 옆 인라인 텍스트로 제공한다.
- 측정 기준: (1) 토스트 텍스트가 한 문장(마침표 1개 이하)이다. (2) STATE-007 긴급도 분류에 해당하는 메시지와 사용자 확인이 필요한 메시지를 토스트로 띄우지 않는다. (3) 폼 필드 검증 메시지를 토스트로 띄우지 않는다. (4) 토스트로 알린 결과는 토스트가 사라진 뒤에도 같은 화면 또는 한 번의 이동으로 갈 수 있는 화면(목록의 바뀐 항목, 상태 표시, 알림 목록 등)에서 확인할 수 있다. (4)를 충족하지 않는 자동 사라짐 토스트는 시간 제한 콘텐츠로 보고 A11Y-014(MUST)로 판정한다.
- 판정 방법: 토스트를 호출하는 코드와 메시지 목록을 검토하고, 메시지마다 토스트가 사라진 뒤 같은 결과를 확인할 수 있는 위치를 적는다.
- 자동 검사: none
- 적용 대상: 토스트
- 결정 CF-004: 메시지 종류는 중요도로 먼저 나눈다: 반드시 읽고 확인해야 하는 내용 → 모달, 그렇지 않은 두 줄 이상 또는 추가 행동이 필요한 결과 알림 → 스낵바, 한 줄 결과 알림 → 토스트.
- 결정 CF-030: 토스트는 사라진 뒤에도 화면의 다른 곳에서 확인할 수 있는 결과 알림만 담고(STATE-037 측정 기준 (4)), role=status로 보조기술에 알린다(STATE-001). 반드시 필요한 정보나 조작은 토스트에만 두지 않으므로 표시 시간은 A11Y-014의 시간 제한에 해당하지 않게 한다. (4)를 충족하지 않는 자동 사라짐 토스트는 A11Y-014로 판정한다.
- 근거: 토스트는 잠깐 보였다 사라지는 행동 결과 알림이라 중요한 정보·긴 설명·필드별 오류를 전달하면 놓친다(KRDS 토스트).
- 출처: KRDS 컴포넌트 > 토스트 > 용례; WCAG22_UNDERSTANDING Understanding 2.2.1 Timing Adjustable (toast 예)

좋은 예 — 토스트에는 한 문장의 행동 결과만 넣고, 같은 결과를 화면의 다른 곳에서도 확인할 수 있다.
```html
<div class="toast" role="status">저장했습니다</div>
<!-- 같은 화면 문서 목록의 해당 행에 '저장됨 10:42' 상태가 표시된다 -->
```
나쁜 예 — 개별 필드 검증 메시지를 필드 옆이 아닌 토스트로 보낸다.
```html
<!-- 비밀번호 필드 검증 메시지를 토스트로 띄운다 -->
<div class="toast" role="status">비밀번호는 8자 이상 입력하세요.</div>
```

## STATE-040 스낵바 아이콘

- 강도: **MAY** (판정에 사람의 판단 필요: guide)
- 룰: 스낵바 아이콘은 메시지 의미 전달을 돕는 경우에만 메시지 왼쪽에 두고, 메시지 텍스트보다 눈에 띄게 표현하지 않는다.
- 측정 기준: 점검 질문: (1) 아이콘이 메시지 왼쪽(DOM상 메시지 앞)에 있는가? (2) 아이콘 없이도 메시지 의미가 같은가 — 같다면 아이콘이 필요한가? (3) 아이콘 크기·색이 메시지 텍스트보다 시선을 먼저 끄는가?
- 판정 방법: 스낵바 사용처를 점검 질문으로 검토한다.
- 자동 검사: none
- 적용 대상: 스낵바
- 근거: 아이콘이 메시지보다 두드러지면 메시지 톤과 어긋나고 주의를 흩뜨린다(KRDS 스낵바).
- 출처: KRDS 컴포넌트 > 스낵바 > 사용성 가이드라인

좋은 예 — 의미를 돕는 작은 아이콘을 메시지 왼쪽에 둔다.
```html
<div class="snackbar" role="status">
  <svg class="icon icon--sm" aria-hidden="true">…</svg><span>업로드에 실패했습니다</span>
</div>
```
나쁜 예 — 아이콘을 메시지 오른쪽에 텍스트보다 크게 둬 시선을 먼저 끈다.
```html
<div class="snackbar" role="status">
  <span>업로드에 실패했습니다</span><svg class="icon icon--xl" aria-hidden="true">…</svg>
</div>
```

## STATE-046 로딩 영역 aria-busy

- 강도: **MAY**
- 룰: 영역의 콘텐츠를 불러오거나 여러 번에 나눠 갱신하는 동안 그 영역에 aria-busy="true"를 두고, 갱신이 끝나면 aria-busy="false"로 바꾸거나 속성을 제거한다.
- 측정 기준: (1) 로딩·연속 갱신 중 대상 영역에 aria-busy="true"가 있다. (2) 로딩·갱신 완료(성공·실패·중단 모두) 뒤 그 영역에 aria-busy="true"가 남아 있지 않다. (3) role=progressbar(네이티브 progress 포함)로 그 영역 전체의 로딩 진행을 표시하면, progressbar 에 접근 가능한 이름이 있고(WAI-ARIA 1.2 progressbar 'Accessible Name Required' — 처리 영역의 제목을 aria-labelledby 로 가리킨다) aria-describedby 가 처리 중 상태 텍스트('검색 결과를 불러오는 중입니다.')를 가리킨다. 이름과 설명에 같은 요소를 함께 가리키지 않는다. 버튼·입력 필드 안 대기처럼 영역 전체의 로딩이 아닌 progressbar 는 (3) 대상이 아니다(이름만 있으면 된다).
- 판정 방법: 로딩 전·중·후(성공·실패 각각) DOM을 검사한다.
- 자동 검사: none
- 적용 대상: [aria-busy], 비동기로 갱신되는 영역, [role=feed], [aria-live]
- 근거: 여러 번에 나눈 갱신을 하나로 묶어 전달하고, 불완전한 위젯 상태가 노출되지 않게 한다(WAI-ARIA 1.2 aria-busy).
- 출처: WAI_ARIA_12 aria-busy state — 'authors MAY set aria-busy to true … then set it to false when the last change is complete'; progressbar role — 'SHOULD use aria-describedby … and set the aria-busy attribute to true on the region until it is finished loading'; 'authors MUST set aria-busy to true on the widget' (필수 하위 요소가 빠지는 갱신); MDN_ARIA_BUSY aria-busy — live region 변경을 busy 동안 보류하고 false가 되면 알림

좋은 예 — 성공·실패와 무관하게 끝나면 aria-busy를 해제한다.
```js
results.setAttribute('aria-busy', 'true');
try { await load(); } finally { results.setAttribute('aria-busy', 'false'); }
```
좋은 예 — 영역 로딩 progressbar 는 영역 제목을 이름, 처리 중 텍스트를 설명으로 가리킨다(스피너 규격).
```html
<section aria-labelledby="list-title" aria-busy="true">
  <h2 id="list-title">검색 결과</h2>
  <div class="spinner spinner--large" role="status">
    <progress class="spinner__indicator" aria-labelledby="list-title" aria-describedby="list-loading"></progress>
    <span class="spinner__text" id="list-loading">검색 결과를 불러오는 중입니다.</span>
  </div>
</section>
```
나쁜 예 — 오류가 나면 aria-busy="true"가 남아 영역 내용이 무시될 수 있다.
```js
results.setAttribute('aria-busy', 'true');
await load();               // 실패하면 아래 줄이 실행되지 않음
results.removeAttribute('aria-busy');
```
