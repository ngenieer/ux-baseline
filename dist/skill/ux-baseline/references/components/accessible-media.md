# 접근 가능한 미디어 (`.accessible-media`)

ux-baseline 컴포넌트 규격. 자동 생성 파일이다. 표준 마크업·CSS는 lint/ 검사기로 검증했다.

사전 녹음된 영상·오디오를 페이지에 넣을 때 자막·화면 해설·대본을 함께 제공하는 틀로 쓴다.

## 구성

| 부분 | 클래스 | 요소 | 필수 | 설명 |
|---|---|---|---|---|
| 루트 | `.accessible-media` | `figure` | 예 | 미디어와 그 대체 수단(자막·해설·대본)을 한 묶음으로 둔다. |
| 제목 | `.accessible-media__title` | `figcaption` | 예 | 미디어의 주제와 재생 시간을 쓴다. |
| 플레이어 | `.accessible-media__player` | `video · audio` | 예 | controls 를 주고 autoplay 를 쓰지 않는다(A11Y-009). 소리가 있는 영상은 kind="captions" track 을 기본(default)으로 넣는다(A11Y-003). 화면 해설 텍스트는 kind="descriptions" track(타임코드가 있는 WebVTT)으로 넣을 수 있다(A11Y-004). |
| 대체 수단 목록 | `.accessible-media__alternatives` | `ul` | 예 | 음성 해설 버전·대본 링크를 플레이어 바로 다음에 둔다(A11Y-002, A11Y-004, A11Y-006). |
| 대본 | `.accessible-media__transcript` | `div` |  | 같은 페이지에 둘 때 쓴다. 대사·화자·의미 있는 효과음과 화면에만 나오는 정보(장면·화면 속 글자)를 모두 담는다(A11Y-004). 다른 페이지에 두면 대체 수단 목록의 링크로 잇는다. |

## 표준 마크업

```html
<figure class="accessible-media">
  <figcaption class="accessible-media__title">2026년 여권 재발급 온라인 신청 방법 (3분 20초)</figcaption>
  <video class="accessible-media__player" controls preload="metadata" src="/media/passport-guide-2026.mp4">
    <track kind="captions" src="/media/passport-guide-2026.ko.vtt" srclang="ko" label="한국어 자막" default>
    <track kind="descriptions" src="/media/passport-guide-2026.desc.ko.vtt" srclang="ko" label="화면 해설">
    이 브라우저는 영상 재생을 지원하지 않습니다. 아래 대본에서 같은 내용을 볼 수 있습니다.
  </video>
  <ul class="accessible-media__alternatives" role="list">
    <li><a href="/media/passport-guide-2026-audio-description">음성 해설이 들어간 영상 보기</a></li>
    <li><a href="#passport-guide-transcript">대본 보기</a></li>
  </ul>
</figure>
<div class="accessible-media__transcript" id="passport-guide-transcript">
  <h2>대본: 2026년 여권 재발급 온라인 신청 방법</h2>
  <p>[화면: 신청 사이트 첫 화면, 검색창에 '여권 재발급'이 입력된다]</p>
  <p>안내자: 검색창에 여권 재발급을 입력해 신청 화면으로 들어갑니다.</p>
  <p>[효과음: 알림음] [화면 자막: 신청 전 준비물 — 신분증, 여권 사진 파일]</p>
</div>
```

## 표준 CSS (토큰만 사용)

```css
.accessible-media {
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-3);
  margin: 0;
}
.accessible-media__title {
  color: var(--color-text-basic);
  font-size: var(--font-size-label-medium);
  font-weight: var(--font-weight-bold);
}
.accessible-media__player {
  display: block;
  inline-size: 100%;
  block-size: auto;
  border-radius: var(--radius-medium3);
  background-color: var(--color-surface-inverse-static);
}
.accessible-media__player::cue {
  background-color: var(--color-background-dim);
  color: var(--color-text-inverse-static);
}
.accessible-media__alternatives {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-gap-2) var(--space-gap-5);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--font-size-body-small);
}
.accessible-media__alternatives a {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--size-height-4);
  color: var(--color-link-default);
  text-decoration: underline;
}
.accessible-media__alternatives a:focus-visible,
.accessible-media__player:focus-visible {
  outline: var(--space-scale-2) solid var(--color-input-border-active);
  outline-offset: var(--space-scale-1);
}
.accessible-media__transcript {
  display: flex;
  flex-direction: column;
  gap: var(--gap-layout-text-text-small);
  padding: var(--padding-card-small);
  border: var(--space-scale-1) solid var(--color-border-gray-light);
  border-radius: var(--radius-medium3);
  color: var(--color-text-basic);
  font-size: var(--font-size-body-medium);
}
```

## 상태
- **오디오 전용(accessible-media--audio)**: 플레이어를 audio controls 로 바꾸고, 대체 수단 목록에 대본만 둔다(A11Y-002). 화면이 커버 이미지뿐인 영상도 이 유형으로 본다(A11Y-041).
- **비디오 전용(소리 없음)**: 자막 track 대신 화면 정보를 설명하는 대본 또는 같은 정보를 말로 전하는 오디오 트랙 링크를 둔다. 소리가 배경음뿐인 영상도 이 유형으로 본다(A11Y-002, A11Y-041).
- **원래 오디오가 화면 정보를 모두 말로 전하는 영상**: 음성 해설 버전 링크를 생략할 수 있다. 자막과 대본은 그대로 둔다(A11Y-006).
- **생중계**: 실시간 자막(문자통역 등)을 켤 수 있는 플레이어를 쓴다(A11Y-005).

## 키보드

| 키 | 동작 |
|---|---|
| Tab / Shift+Tab | 플레이어 컨트롤 → 대체 수단 링크 순서로 옮긴다. 초점 표시가 보인다(A11Y-016). |
| Space / Enter | 브라우저 기본 컨트롤에서 재생·일시정지를 실행한다. 자체 플레이어는 재생·일시정지·음량·자막 켜기를 모두 버튼으로 두고 키보드로 실행할 수 있게 한다(A11Y-011). |

## 동작
- 페이지가 열리거나 바뀔 때 소리를 자동으로 재생하지 않는다. autoplay 를 쓰지 않는다(A11Y-009).
- 자막은 대사·화자(2명 이상일 때)·의미 있는 효과음을 담고 오디오와 시간 동기화한다(A11Y-003).
- 화면에만 나오는 정보가 있으면 음성 해설 버전(또는 해설 오디오 트랙)을 고를 수 있게 한다. 대본은 그 정보까지 담는다(A11Y-004, A11Y-006).
- 자막이 플레이어 컨트롤·로고에 가려지거나 흐리게(opacity 1 미만·blur) 표시되지 않게 하고, 영상 속 글자·화자 얼굴과 겹치는 구간은 WebVTT line·position 으로 자막 위치를 옮긴다(A11Y-043).
- 자막 텍스트에는 반투명 검은 배경(::cue background-color)을 넣어 영상과 대비를 확보한다(COLOR-020). 영상 안에 넣은 글자·정보 그래픽은 배경과 4.5:1 이상 대비로 제작한다(COLOR-002).
- 자체 플레이어를 만들면 자막 크기·색·위치를 바꾸는 설정을 둔다(A11Y-044).
- 모든 사용자가 알아야 할 중요 정보를 이 미디어로만 전하면 수어 영상 제공 여부와 그 이유를 기록한다(A11Y-042).

## 적용 룰

| ID | 강도 | 룰 |
|---|---|---|
| A11Y-002 | MUST | 사전 녹음된 오디오 전용 콘텐츠에는 같은 정보를 담은 대본을, 사전 녹음된 비디오 전용 콘텐츠에는 같은 정보를 담은 대본 또는 오디오 트랙을 제공한다. |
| A11Y-003 | MUST | 사전 녹음된 동기화 미디어(영상+소리)의 모든 오디오 내용에 시간 동기화된 자막을 제공한다. |
| A11Y-004 | MUST | 사전 녹음된 동기화 미디어에는 영상 내용의 음성 해설 또는 시간 기반 미디어 대체물(전체 대본)을 제공한다. |
| A11Y-005 | MUST | 실시간 동기화 미디어(생중계 영상)의 모든 오디오 내용에 자막을 제공한다. |
| A11Y-006 | MUST | 사전 녹음된 동기화 미디어의 모든 영상 내용에 음성 해설을 제공한다. |
| A11Y-009 | MUST | 페이지가 열리거나 바뀔 때 자동으로 재생하는 소리는 3초 안에 끝나게 하고, 3초 이상 이어지는 소리를 자동으로 재생하면 시스템 음량과 별개인 멈춤·일시정지·음량 조절 수단과 지정 키(Esc)로 멈추는 기능을 함께 제공한다. |
| A11Y-011 | MUST | 모든 기능을 키 입력 타이밍에 의존하지 않는 키보드 조작만으로 쓸 수 있게 한다. |
| A11Y-016 | MUST | 키보드로 조작할 수 있는 모든 UI에서 키보드 초점 표시가 보이게 한다. |
| A11Y-025 | MUST | 모든 UI 컴포넌트(폼 요소·링크·스크립트로 만든 위젯)의 이름과 역할을 프로그램으로 판별할 수 있게 하고, 사용자가 설정하는 상태·속성·값과 그 변경을 보조기술에 전달한다. |
| A11Y-041 | SHOULD | 화면이 단순 커버 이미지뿐인 비디오는 오디오 전용 콘텐츠로, 소리가 단순 배경음뿐인 비디오는 비디오 전용 콘텐츠로 분류해 그 유형의 대체 수단(A11Y-002)을 제공한다. |
| A11Y-042 | SHOULD | 모든 사용자가 알아야 할 중요 정보를 멀티미디어로만 제공하면 수어 대체 콘텐츠 제공을 검토하고 그 결정을 기록한다. |
| A11Y-043 | SHOULD | 자막이 주변 요소에 가려지거나 흐리게 표시되지 않게 하고, 화면의 중요한 시각 요소와 겹치면 자막 위치를 옮긴다. |
| A11Y-044 | MAY | 자체 플레이어를 만들 때 사용자가 자막의 크기·색·위치를 바꾸는 옵션을 제공한다. |
| COLOR-002 | MUST | 텍스트와 텍스트 이미지는 배경과의 명도 대비를 4.5:1 이상으로 하고, 큰 텍스트(18pt=24px 이상, 또는 굵게 14pt≈18.66px 이상)는 3:1 이상으로 한다. |
| COLOR-020 | MAY | 영상 자막 텍스트에는 윤곽선이나 반투명 검은색 배경을 넣어 영상 화면과 대비를 확보한다. |

## KRDS 키트와의 관계
