# 코치마크 (`.coach-mark`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

따라하기 패널에서 시작한 과업을 화면의 실제 요소 옆 말풍선으로 한 단계씩 안내한다.

## 대신 쓸 것
- 한두 문장으로 끝나는 안내 → 맥락적 도움말 (COPY-043)
- 한 과업이 15단계를 넘거나 한 페이지에 4단계를 넘는 경우 → 과업을 나누거나 따라하기 패널의 세부 단계 목록으로 안내 (COPY-047)

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트(말풍선) | `.coach-mark` | `dialog` | 예 | 비모달 대화상자. dialog.show()(showModal 아님)로 열어 페이지의 다른 부분도 계속 조작할 수 있게 한다. aria-labelledby 로 제목을 연결한다. DOM 에서 안내 대상 요소 바로 다음에 둔다(A11Y-008). |
| 기준 영역 | `.coach-mark__anchor` | `div` | 예 | 안내 대상과 말풍선을 묶어 말풍선 위치의 기준이 된다. |
| 안내 대상 강조 | `.coach-mark__target` | `안내 대상 요소에 붙이는 클래스` | 예 | 지금 단계가 가리키는 화면 요소를 테두리로 강조한다. 대상 자체의 초점 표시를 가리지 않는다. |
| 단계 제목 | `.coach-mark__title` | `h2` | 예 | 한 줄로 쓴다(COPY-046). |
| 지시 사항 | `.coach-mark__text` | `p` | 예 | 세 줄 이하로 쓴다(COPY-046). 사용자 행동을 요구하는 단계는 '행동을 마치면 다음 단계로 넘어간다'는 사실을 쓴다(STATE-031). |
| 진행 표시 | `.coach-mark__progress` | `p` | 예 | 예 '4단계 중 1단계'. |
| 버튼 영역 | `.coach-mark__actions` | `div` | 예 |  |
| 버튼 | `.coach-mark__button` | `button` | 예 | '그만보기'·'이전'은 텍스트 버튼(coach-mark__button--text), '다음'·'마치기'는 고스트 버튼(coach-mark__button--ghost). 주조색 채움 버튼은 쓰지 않는다(COLOR-021). |
| 단계 전환 알림 | `.coach-mark__status` | `div` | 예 | role="status" 와 .sr-only 를 준 빈 영역. 말풍선(dialog) 밖에 두어 단계가 바뀌어도 남는다. 사용자 행동을 감지해 자동으로 다음 단계로 넘어갈 때 새 단계 제목과 지시 사항을 넣어 낭독되게 한다(STATE-031 (4)). |

## 표준 마크업

```html
<div class="coach-mark__anchor">
  <div class="coach-mark__target">
    <label for="old-address">이사 전 주소</label>
    <input id="old-address" name="old-address" type="text" autocomplete="address-line1">
  </div>
  <dialog class="coach-mark" aria-labelledby="coach-step-title" open>
    <h2 class="coach-mark__title" id="coach-step-title" tabindex="-1">이사 전 주소 입력</h2>
    <p class="coach-mark__text">이사 전에 살던 곳의 도로명 주소를 입력해 주세요. 주소를 입력하면 다음 단계로 넘어갑니다.</p>
    <div class="coach-mark__footer">
      <p class="coach-mark__progress">4단계 중 1단계</p>
      <div class="coach-mark__actions">
        <button class="coach-mark__button coach-mark__button--text" type="button">그만보기</button>
      </div>
    </div>
  </dialog>
</div>
<div class="coach-mark__status sr-only" role="status"></div>
```

## 표준 CSS (토큰만 사용)

```css
.coach-mark__anchor {
  position: relative;
}
.coach-mark__target {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  padding: var(--padding-card-large);
  border: var(--border-width-variable-regular) solid var(--color-border-primary);
  border-radius: var(--radius-xlarge1);
  outline: var(--space-scale-6) solid var(--color-border-primary-light);
}
.coach-mark {
  position: absolute;
  inset-block-start: calc(100% + var(--space-gap-7));
  inset-inline: auto 0;
  z-index: 100;
  inline-size: min(22.5rem, 100vw - var(--layout-screen-margin-small) * 2);
  margin: 0;
  padding: var(--space-padding-8);
  border: var(--border-width-variable-medium) solid var(--color-border-primary);
  border-radius: var(--radius-xlarge2);
  background-color: var(--color-surface-white);
  box-shadow: var(--shadow-3);
  color: var(--color-text-basic);
}
.coach-mark[open] {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-5);
}
.coach-mark__title {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-xsmall);
  font-weight: var(--font-weight-bold);
}
.coach-mark__text {
  margin: 0;
  font-size: var(--font-size-body-medium);
  line-height: var(--font-line-height-base);
}
.coach-mark__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-gap-3);
}
.coach-mark__progress {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--font-size-label-small);
}
.coach-mark__actions {
  display: flex;
  gap: var(--space-gap-2);
}
.coach-mark__button {
  min-block-size: var(--size-height-5);
  padding-inline: var(--space-padding-4);
  border: var(--border-width-variable-regular) solid transparent;
  border-radius: var(--radius-medium1);
  background-color: transparent;
  color: var(--color-text-basic);
  font-size: var(--font-size-label-small);
}
.coach-mark__button--text {
  text-decoration: underline;
}
.coach-mark__button--ghost {
  border-color: var(--color-button-tertiary-border);
}
.coach-mark__title:focus-visible,
.coach-mark__button:focus-visible {
  outline: var(--space-scale-2) solid var(--color-border-primary);
  outline-offset: var(--space-scale-1);
}
```

## 상태
- **표시**: 사용자가 따라하기 패널의 '따라하기 실행'을 누르면 첫 단계 대상에 coach-mark__target 을 붙이고 그 바로 다음에 dialog.coach-mark 를 넣어 show() 로 연다. 예시 markup 의 open 속성은 검사용 정적 표현이다.
- **행동 요구 단계**: 지시 사항에 '…하면 다음 단계로 넘어갑니다'를 쓰고 '다음' 버튼을 뺀다(STATE-031 예외). '그만보기'는 항상 둔다. 시스템이 행동 완료를 확인하면 다음 단계로 넘기되 초점은 옮기지 않고, 새 단계 지시문을 coach-mark__status(role="status")에 넣는다(CF-006, STATE-031). 예시 markup 이 이 단계다.
- **마지막 단계**: '다음' 대신 '마치기'(고스트 버튼).
- **시간 제한 경고·오류·긴급 알림 발생**: 시간 제한 경고(A11Y-014)·오류·긴급 알림이 생기면 dialog.close() 로 코치마크를 닫고 그 알림을 즉시 표시한다. 그 밖의 알림(토스트·배너 등)은 보류했다가 코치마크가 닫힌 직후 표시한다(STATE-030, CF-001).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 말풍선 안 버튼 사이를 이동하고, 말풍선 밖(페이지 다른 요소)으로도 나갈 수 있다 — 비모달이므로 초점을 가두지 않는다(A11Y-012). |
| Enter / Space | '그만보기'는 말풍선을 숨기고 초점을 따라하기 패널의 따라하기 실행 버튼으로 옮긴다(A11Y-052). '이전'·'다음'은 단계를 바꾼다. |
| Esc | 초점이 말풍선 안에 있으면 '그만보기'와 같게 동작한다. |

## 동작
- 코치마크는 사용자가 따라하기 실행 버튼을 눌렀을 때만 시작한다. 초점을 받는 것만으로 시작하거나 단계를 바꾸지 않는다(A11Y-024).
- 시작할 때와 '이전'·'다음'을 눌렀을 때는 새 단계 제목(tabindex="-1")으로 초점을 옮긴다. 사용자 행동을 감지해 자동으로 넘어갈 때는 초점을 옮기지 않고, 새 단계 제목과 지시 사항을 coach-mark__status(sr-only, role="status")에 넣어 보조기술에 알린다(STATE-031 (4), CF-006).
- 한 화면에 말풍선은 1개만 표시한다(STATE-029). 코치마크가 표시되는 동안 토스트·스낵바·배너·모달 같은 다른 레이어를 띄우지 않고 보류했다가 끝난 뒤 표시한다. 단, 시간 제한 경고(A11Y-014)·오류·긴급 알림이 생기면 코치마크를 닫고 그 알림을 즉시 표시한다(STATE-030, CF-001).
- 한 과업은 15단계 이하, 한 페이지에 속한 단계는 4개 이하로 구성한다(COPY-047). 단계는 사용자가 과업을 실제로 수행하는 순서대로 둔다(NAV-063).
- 말풍선 너비는 과업에서 가장 긴 지시 사항을 기준으로 정해 모든 단계에서 같게 한다 — 과업 시작 때 한 번 계산해 모든 단계에 같은 값을 쓴다(LAYOUT-058).
- 말풍선은 모든 화면 너비에서 뷰포트 안에 전부 보이고 안내 대상과 다음에 누를 버튼을 가리지 않게 위·아래·좌우로 배치한다(LAYOUT-057).
- 제목은 한 줄, 지시 사항은 세 줄 이하로 쓴다(COPY-046).
- 말풍선 안 관련 화면·리소스 링크는 새 탭으로 열고, 링크 컴포넌트와 같은 새 창 아이콘(svg, aria-hidden="true")과 링크 안 숨긴 텍스트(.sr-only ' (새 창 열림)')을 넣는다. title 속성만으로 알리지 않는다(NAV-013, NAV-012, CF-002).
- 대상 강조 테두리·말풍선 테두리는 인접 색과 3:1 이상 대비를 갖는다(COLOR-003). 같은 기능의 버튼 이름('그만보기'·'이전'·'다음'·'마치기')은 모든 과업에서 같게 쓴다(COPY-004).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-008 | MUST | 읽는 순서가 의미에 영향을 주는 콘텐츠는 DOM 순서를 시각적 읽기 순서와 같게 한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-012 | MUST | 키보드 초점이 들어갈 수 있는 모든 컴포넌트에서 키보드만으로 초점을 빼낼 수 있게 하고, 수정자 없는 방향키·Tab 같은 표준 방법이 아니면 빠져나오는 방법을 안내한다. |
| A11Y-014 | MUST | 보안 등 필수 사유가 없으면 콘텐츠에 시간 제한을 두지 않고, 시간 제한을 둘 때는 각 제한마다 시작 전에 끄기, 시작 전에 기본값의 10배 이상으로 조정, 만료 전 경고와 함께 20초 이상의 여유를 주고 단순 동작으로 10회 이상 연장 중 하나를 제공한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-024 | MUST | UI 컴포넌트가 초점을 받는 것만으로 맥락 변화(새 창 열기, 페이지 이동, 폼 제출, 초점 이동, 화면 의미를 바꾸는 콘텐츠 변경)를 일으키지 않는다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-052 | SHOULD | 코치마크의 '그만보기'를 Click·Enter·Space로 실행하면 코치마크 팝오버를 숨기고 키보드 초점을 따라하기 패널의 따라하기 실행 버튼으로 옮긴다. |
| COLOR-003 | MUST | UI 컴포넌트와 그 상태를 식별하는 데 필요한 시각 정보(경계·아이콘·상태 표시)와 내용 이해에 필요한 그래픽 부분은 인접 색과 3:1 이상 대비를 갖게 한다. |
| COLOR-021 | SHOULD | 코치마크의 '그만보기'·'이전' 버튼은 텍스트 버튼 스타일로, '다음'·'마치기' 버튼은 고스트 버튼 스타일로 표시해 본문 액션 버튼보다 강조 수준을 낮춘다. |
| COPY-004 | MUST | 여러 페이지에서 같은 기능을 하는 컴포넌트에는 같은 이름·레이블·아이콘·대체 텍스트를 쓴다. |
| COPY-046 | MAY | 코치마크 제목은 1줄로, 지시 사항은 3줄 이하로 쓴다. |
| COPY-047 | SHOULD | 한 과업의 코치마크는 15단계 이하로 구성한다. |
| LAYOUT-002 | MUST | 포인터 입력 대상은 24×24 CSS px 이상으로 만들고, 더 작으면 각 대상 경계 상자 중심에 지름 24 CSS px 원을 그렸을 때 그 원이 다른 대상이나 다른 작은 대상의 원과 겹치지 않게 배치한다. |
| LAYOUT-057 | SHOULD | 툴팁·맥락적 도움말·코치마크 팝오버는 모든 화면 너비에서 뷰포트 안에 전부 보이게 하고, 활성화 버튼과 안내 대상 본문 요소를 가리지 않는 방향으로 표시한다. |
| LAYOUT-058 | SHOULD | 한 과업의 코치마크 팝오버 너비는 가장 긴 지시 사항 텍스트를 기준으로 정해 모든 단계에서 같게 한다. |
| NAV-012 | SHOULD | 외부 서비스로 이동하거나 새 창(탭)을 여는 링크·버튼에는 그 사실을 알리는 아이콘이나 텍스트를 서비스 전체에서 같은 방식으로 표시하고, 같은 내용을 링크 안의 텍스트(시각적으로 숨긴 텍스트 포함)로 제공하며 title 속성만으로 알리지 않는다. |
| NAV-013 | SHOULD | 도움 콘텐츠(도움 패널, 따라하기 패널, 맥락적 도움말, 코치마크) 안의 관련 화면·리소스 링크는 새 탭으로 열고, 새 탭으로 열 때는 NAV-012에 따라 새 탭이 열린다는 사실을 링크에 텍스트로 반드시 표시하며, 표시할 수 없으면 새 탭 대신 같은 탭으로 연다. |
| NAV-063 | SHOULD | 코치마크 단계는 사용자가 과업을 실제로 수행하는 순서대로 배열한다. |
| SHAPE-001 | MUST | 모서리 반경은 디자인 토큰의 단계 값에서만 고르고, 같은 크기 단계에 속하거나 함께 배치되는 비슷한 크기의 컴포넌트에는 같은 반경 토큰을 쓴다. |
| SHAPE-004 | MAY | 그림자는 정의된 단계 토큰만 쓰고 단계를 용도에 고정한다(KRDS: 셀렉트 shadow2, 툴팁 shadow3, 모달 shadow4와 딤드, 긴급 공지 shadow2와 고도 -1 표면). |
| STATE-029 | SHOULD | 한 화면에 코치마크를 동시에 2개 이상 표시하지 않는다. |
| STATE-030 | SHOULD | 코치마크가 표시되는 동안 알림·배너·토스트 같은 다른 레이어를 띄우지 않고, 그동안 생긴 알림은 버리지 않고 코치마크가 닫힌 직후 표시한다. 시간 제한 경고와 오류·긴급 알림은 예외로 즉시 띄우고 코치마크를 닫는다. |
| STATE-031 | SHOULD | 사용자에게 특정 행동을 요구하는 코치마크는 지시문에 행동을 마치면 다음 단계로 넘어간다는 사실을 쓰고, 시스템이 그 행동의 완료를 확인해 다음 단계로 넘어가게 하며, 행동을 마치기 전에는 넘어가지 않고, 단계가 넘어갈 때 키보드 초점을 강제로 옮기지 않는 대신 새 단계 지시문을 보조기술에 알린다. |

## KRDS 키트와의 관계
- 클래스 대응: `.coach-mark` ↔ `coach-balloon`, `.coach-mark__target` ↔ `krds-coach-mark txt-box`, `.coach-mark__title` ↔ `coach-tit`, `.coach-mark__text` ↔ `desc`, `.coach-mark__progress` ↔ `num`, `.coach-mark__actions` ↔ `coach-controls btn-wrap`
- KRDS 키트는 말풍선 제목을 h6(그 앞에 sr-only h5 '따라하기 가이드')로 써서 페이지 제목 계층을 건너뛴다 — 이 규격은 놓이는 위치에 맞는 제목 수준을 쓰고 dialog 의 aria-labelledby 로 연결한다(A11Y-025).
- KRDS 키트 진행 표시는 sr-only '현재 단계'·'총 단계'와 숫자 '1'·'4'를 나눠 둔다 — 이 규격은 '4단계 중 1단계'를 보이는 텍스트 하나로 쓴다.
- KRDS 키트 '다음으로' 버튼은 tertiary(채움) 버튼이다 — 이 규격은 고스트 버튼으로 쓴다(COLOR-021).
- KRDS 키트 말풍선은 word-break break-all 이다 — 이 규격은 한국어 어절 단위 줄바꿈(전역 keep-all)을 따른다(CF-049).
