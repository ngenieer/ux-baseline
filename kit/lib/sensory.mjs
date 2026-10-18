// COPY-001 — 감각적 특성(위치·색·모양·소리)만으로 대상을 가리키는 문구 후보를 찾는다.
// 같은 문장에 따옴표·대괄호로 쓴 레이블('다음', [제출] 등)이 있으면 대상 이름을 함께 쓴 것으로 보고 넘긴다.
// 후보 검출이다 — 사람이 확인한다(그래서 경고).
// 위·아래(앞뒤 읽기 순서와 같은 위치)는 SC 1.3.3 이해 문서가 허용하는 예라 넣지 않는다. 상단·하단도 같은 이유로 뺀다.

const TARGET = "(?:버튼|아이콘|화살표|항목|링크|메뉴|칸|영역|부분|상자|탭|글자|글씨|표시|문구|단추|표|그래프|그림|차트|사진)";
const PATTERNS = [
  // 위치·방향
  new RegExp(`(?:오른쪽|왼쪽|위쪽|아래쪽|우측|좌측|옆)(?:\\s?(?:에|의))?\\s?(?:있는|보이는|표시된|놓인|위치한)?\\s?(?:의\\s?)?${TARGET}`),
  // 색
  new RegExp(`(?:빨간|빨강|붉은|파란|파랑|푸른|초록|녹색|노란|노랑|주황|회색|검은|흰)\\s?(?:색|색깔)?\\s?(?:으로|로)?\\s?(?:표시된|칠해진|된|인)?\\s?${TARGET}`),
  // 모양·글자 꾸밈
  new RegExp(`(?:밑줄\\s?(?:친|그은|이 있는|표시된)|물결\\s?밑줄|굵게\\s?표시된|굵은|기울어진|기울임꼴|동그란|둥근|네모난|네모|세모|삼각형|원\\s?모양의?|화살표\\s?모양의?|별\\s?모양의?)\\s?${TARGET}`),
  // 소리
  /(?:소리가\s?(?:나면|날\s?때|울리면)|알림음이\s?(?:나면|울리면)|신호음이?\s?(?:나면|울리면))/,
];
const LABEL = /['‘"“「『\[][^'’"”」』\]]{1,40}['’"”」』\]]/;

/** @returns {{sentence: string, match: string}[]} */
export function findSensoryRefs(text) {
  const out = [];
  for (const raw of String(text).split(/(?<=[.!?。])\s+|\n+/)) {
    const sentence = raw.replace(/\s+/g, " ").trim();
    if (!sentence || LABEL.test(sentence)) continue;
    for (const re of PATTERNS) {
      const m = sentence.match(re);
      if (m) { out.push({ sentence, match: m[0] }); break; }
    }
  }
  return out;
}

export const sensoryMessage = (r) => `'${r.match}' — 감각적 특성만으로 대상을 가리킨다. 같은 문장에 대상의 이름·레이블을 함께 쓴다 (COPY-001): "${r.sentence.slice(0, 80)}"`;
