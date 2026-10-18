/* 민원 안내 문서 AI 요약 — 가짜 AI 응답으로 동작하는 시연 화면.
   실제 AI 호출 대신 fakeSummarize() 가 지연을 흉내 내며 글자를 조금씩 내보낸다. */
(function () {
  "use strict";

  // 가짜 네트워크 지연(애니메이션 값이 아니다). 첫 응답까지 대기와 글자 묶음 사이 간격.
  var FAKE_FIRST_RESPONSE_DELAY = 900;
  var FAKE_CHUNK_DELAY = 35;
  var FAKE_CHUNK_SIZE = 2;
  var MAX_ITEMS = 4;

  var SAMPLE_DOCUMENT = [
    "전입신고 안내",
    "이사한 날부터 14일 이내에 새 주소지 주민센터에 전입신고를 해야 합니다.",
    "기한을 넘기면 과태료가 부과될 수 있습니다.",
    "신고는 세대주 또는 세대원이 직접 하거나 위임을 받은 사람이 할 수 있습니다.",
    "방문 신고 시 신분증을 꼭 가져와야 합니다.",
    "위임을 받은 사람은 위임장과 위임한 사람의 신분증도 함께 내야 합니다.",
    "정부24에서 온라인으로도 신고할 수 있으며, 이 경우 공동인증서 등 본인 인증이 필요합니다.",
    "다만 세대주가 바뀌는 경우에는 온라인 신고가 제한될 수 있으니 주민센터에 미리 문의하시기 바랍니다.",
    "전입신고 수수료는 없습니다.",
    "문의: 주민센터 민원실 또는 정부민원안내콜센터(국번 없이 110)"
  ].join("\n");

  // 예시 문서용으로 미리 써 둔 요약 두 가지(다시 생성할 때 번갈아 쓴다).
  // source 는 근거 원문 문장을 찾는 열쇠말, uncertain 은 확신이 낮은 구절이다.
  var SAMPLE_SUMMARIES = [
    [
      { text: "이사한 날부터 14일 이내에 새 주소지 주민센터에 전입신고를 해야 하며, 기한을 넘기면 과태료가 부과될 수 있습니다.", sources: ["14일 이내", "과태료"] },
      { text: "세대주나 세대원이 직접 신고하거나, 위임받은 사람이 위임장과 양쪽 신분증을 갖춰 신고할 수 있습니다.", sources: ["세대주 또는 세대원", "위임장"] },
      { text: "정부24에서 본인 인증 후 온라인으로 신고할 수 있지만, 세대주가 바뀌면 온라인 신고가 안 될 수 있습니다.", sources: ["정부24", "세대주가 바뀌는"], uncertain: "세대주가 바뀌면 온라인 신고가 안 될 수 있습니다" },
      { text: "전입신고 수수료는 없습니다.", sources: ["수수료"] }
    ],
    [
      { text: "전입신고 기한은 이사한 날부터 14일이며, 늦으면 과태료 대상이 될 수 있습니다.", sources: ["14일 이내", "과태료"] },
      { text: "방문 신고에는 신분증이 필요하고, 대리인은 위임장과 위임한 사람의 신분증도 내야 합니다.", sources: ["방문 신고", "위임장"] },
      { text: "온라인(정부24) 신고는 공동인증서 등 본인 인증이 필요하며, 세대주 변경이 있으면 주민센터에 먼저 문의해야 합니다.", sources: ["정부24", "세대주가 바뀌는"], uncertain: "세대주 변경이 있으면 주민센터에 먼저 문의해야 합니다" },
      { text: "수수료는 무료이고, 문의는 주민센터 민원실이나 110 콜센터로 합니다.", sources: ["수수료", "문의:"] }
    ]
  ];

  var GUIDE_KEYWORDS = ["신청", "신고", "기한", "이내", "서류", "제출", "수수료", "방법", "발급", "필요", "문의", "접수", "대상", "기간"];
  var UNCERTAIN_PATTERN = /(다만|단,|경우|예외|제한)/;

  // ---------- 요소 ----------
  var $ = function (id) { return document.getElementById(id); };
  var form = $("summary-form");
  var docField = $("doc-field");
  var docInput = $("doc-input");
  var docError = $("doc-input-error");
  var countCurrent = $("doc-input-count-current");
  var countStatus = $("doc-input-status");
  var summarizeButton = $("summarize-button");
  var sampleButton = $("sample-button");

  var result = $("result");
  var resultTitle = $("result-title");
  var editedLabel = $("edited-label");
  var progress = $("progress");
  var stopButton = $("stop-button");
  var resultBody = $("result-body");
  var output = $("ai-output");
  var summaryList = $("summary-list");
  var stoppedNote = $("stopped-note");
  var editPanel = $("edit-panel");
  var editFields = $("edit-fields");
  var editSave = $("edit-save");
  var editCancel = $("edit-cancel");
  var errorBox = $("error-box");
  var emptyBox = $("empty-box");
  var errorLive = $("error-live");
  var retryButton = $("retry-button");
  var repasteButton = $("repaste-button");
  var errorBackButton = $("error-back-button");
  var emptyBackButton = $("empty-back-button");
  var footer = $("result-footer");
  var regenerateButton = $("regenerate-button");
  var editButton = $("edit-button");
  var copyButton = $("copy-button");
  var versionNav = $("version-nav");
  var versionPrev = $("version-prev");
  var versionNext = $("version-next");
  var versionCount = $("version-count");
  var resultStatus = $("result-status");

  // ---------- 상태 ----------
  // versions: 지금까지 받은 요약(완료·중단·사용자 수정). 다시 생성해도 이전 결과를 남긴다(AI-009).
  var versions = [];
  var current = -1;
  var view = "idle"; // idle | streaming | result | editing | error | empty
  var job = null; // 진행 중인 가짜 요청 { cancelled, timers }
  var sampleVariant = 0;
  var lastDocument = "";

  // ---------- 공통 ----------
  function announce(text) {
    // 같은 문장을 두 번 알려도 읽히도록 비운 뒤 넣는다.
    resultStatus.textContent = "";
    window.setTimeout(function () { resultStatus.textContent = text; }, 50);
  }

  function selectedMode() {
    var checked = document.querySelector("input[name='demo-mode']:checked");
    return checked ? checked.value : "normal";
  }

  function splitSentences(text) {
    return text
      .split(/\n+|(?<=[.?!])\s+/)
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 0; });
  }

  function findSentence(sentences, key) {
    for (var i = 0; i < sentences.length; i += 1) {
      if (sentences[i].indexOf(key) !== -1) {
        return { index: i + 1, text: sentences[i] };
      }
    }
    return null;
  }

  // ---------- 가짜 AI ----------
  // 문서에서 요약 항목(문장·근거·확신 낮은 구절)을 만든다. 안내 문장이 없으면 빈 배열(답 없음).
  function buildSummary(documentText, variant) {
    var sentences = splitSentences(documentText);
    if (documentText.trim() === SAMPLE_DOCUMENT.trim()) {
      return SAMPLE_SUMMARIES[variant % SAMPLE_SUMMARIES.length].map(function (item) {
        var seen = {};
        var sources = [];
        item.sources.forEach(function (key) {
          var found = findSentence(sentences, key);
          if (found && !seen[found.index]) {
            seen[found.index] = true;
            sources.push(found);
          }
        });
        return { text: item.text, sources: sources, uncertain: item.uncertain || "" };
      });
    }

    // 붙여 넣은 일반 문서: 안내 열쇠말이 든 문장을 골라 짧게 다듬는다(추출식 가짜 요약).
    var candidates = [];
    sentences.forEach(function (s, i) {
      if (s.length < 12) { return; }
      var score = GUIDE_KEYWORDS.reduce(function (n, k) { return n + (s.indexOf(k) !== -1 ? 1 : 0); }, 0);
      if (score > 0) { candidates.push({ index: i + 1, text: s, score: score }); }
    });
    if (candidates.length === 0) { return []; }
    candidates.sort(function (a, b) { return b.score - a.score || a.index - b.index; });
    var picked = candidates.slice(variant % 2 === 0 ? 0 : 1, (variant % 2 === 0 ? 0 : 1) + MAX_ITEMS);
    if (picked.length === 0) { picked = candidates.slice(0, MAX_ITEMS); }
    picked.sort(function (a, b) { return a.index - b.index; });
    return picked.map(function (c) {
      var text = c.text.replace(/^[-·•*\d.)\s]+/, "");
      var match = text.match(UNCERTAIN_PATTERN);
      var uncertain = "";
      if (match) {
        // 조건·예외가 든 문장은 해석이 갈릴 수 있으므로 확인 필요로 표시한다.
        // '다만'·'단,'으로 시작하는 예외 절은 그 절부터, 그 밖에는 문장 전체를 표시한다.
        var start = /^(다만|단,)$/.test(match[1]) ? match.index : 0;
        uncertain = text.slice(start).replace(/[.。]$/, "");
      }
      return { text: text, sources: [{ index: c.index, text: c.text }], uncertain: uncertain };
    });
  }

  function later(fn, delay) {
    var id = window.setTimeout(function () {
      if (job && !job.cancelled) { fn(); }
    }, delay);
    job.timers.push(id);
  }

  function cancelJob() {
    if (!job) { return; }
    job.cancelled = true;
    job.timers.forEach(function (id) { window.clearTimeout(id); });
    job = null;
  }

  // ---------- 렌더링 ----------
  function renderSourceLine(li, sources) {
    if (sources.length === 0) {
      var none = document.createElement("p");
      none.className = "summary-item__source";
      none.textContent = "근거 원문 없음 — 이 항목의 근거 문장을 문서에서 찾지 못했습니다. 원문을 직접 확인하세요.";
      li.appendChild(none);
      return;
    }
    sources.forEach(function (src) {
      var p = document.createElement("p");
      p.className = "summary-item__source";
      var label = document.createElement("span");
      label.className = "summary-item__source-label";
      label.textContent = "근거 원문 " + src.index + "번째 문장: ";
      var q = document.createElement("q");
      q.textContent = src.text;
      p.appendChild(label);
      p.appendChild(q);
      li.appendChild(p);
    });
  }

  function renderItemText(textEl, item) {
    textEl.textContent = "";
    var pos = item.uncertain ? item.text.indexOf(item.uncertain) : -1;
    if (pos === -1) {
      textEl.textContent = item.text;
      return;
    }
    textEl.appendChild(document.createTextNode(item.text.slice(0, pos)));
    var mark = document.createElement("mark");
    mark.className = "summary-item__uncertain";
    mark.textContent = item.uncertain;
    textEl.appendChild(mark);
    textEl.appendChild(document.createTextNode(item.text.slice(pos + item.uncertain.length)));
  }

  function finishItem(li, textEl, item) {
    renderItemText(textEl, item);
    if (item.uncertain) {
      li.classList.add("summary-item--low");
      var flag = document.createElement("span");
      flag.className = "badge badge--warning summary-item__flag";
      flag.textContent = "확인 필요";
      textEl.parentNode.appendChild(flag);
    }
    renderSourceLine(li, item.sources);
  }

  function createItemElement() {
    var li = document.createElement("li");
    li.className = "summary-item";
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.className = "summary-item__text";
    p.appendChild(span);
    li.appendChild(p);
    summaryList.appendChild(li);
    return { li: li, textEl: span };
  }

  function renderVersion(version) {
    summaryList.textContent = "";
    version.items.forEach(function (item) {
      var el = createItemElement();
      finishItem(el.li, el.textEl, item);
    });
    stoppedNote.hidden = version.status !== "stopped";
    editedLabel.hidden = !version.edited;
    output.setAttribute("data-ai-status", version.status);
  }

  function render() {
    result.hidden = view === "idle";
    resultBody.setAttribute("data-ai-status", view);
    progress.hidden = view !== "streaming";
    output.setAttribute("aria-busy", view === "streaming" ? "true" : "false");
    editPanel.hidden = view !== "editing";
    errorBox.hidden = view !== "error";
    emptyBox.hidden = view !== "empty";
    errorBackButton.hidden = versions.length === 0;
    emptyBackButton.hidden = versions.length === 0;
    footer.hidden = view !== "result";
    if (view === "result" || view === "editing") {
      editedLabel.hidden = !versions[current].edited;
    } else if (view !== "streaming") {
      editedLabel.hidden = true;
    }
    versionNav.hidden = versions.length < 2;
    versionCount.textContent = "결과 " + (current + 1) + "/" + versions.length;
    versionPrev.disabled = current <= 0;
    versionNext.disabled = current >= versions.length - 1;
    summarizeButton.setAttribute("aria-disabled", view === "streaming" ? "true" : "false");
  }

  function showVersion(index) {
    current = index;
    renderVersion(versions[current]);
    view = "result";
    render();
  }

  // ---------- 요약 요청 ----------
  function startSummary(documentText) {
    cancelJob();
    lastDocument = documentText;
    var mode = selectedMode();
    var variant = sampleVariant;
    sampleVariant += 1;

    job = { cancelled: false, timers: [] };
    errorLive.textContent = "";
    summaryList.textContent = "";
    stoppedNote.hidden = true;
    editedLabel.hidden = true;
    output.setAttribute("data-ai-status", "streaming");
    view = "streaming";
    render();
    announce("요약을 만드는 중입니다. 멈추려면 '생성 중단' 버튼을 누르세요.");

    var draft = { items: [], status: "streaming", edited: false, partial: null };
    job.draft = draft;

    later(function () {
      if (mode === "error") { return failWithError(); }
      var items = mode === "empty" ? [] : buildSummary(documentText, variant);
      if (items.length === 0) { return finishEmpty(); }
      streamItems(items, 0, draft);
    }, FAKE_FIRST_RESPONSE_DELAY);
  }

  function streamItems(items, index, draft) {
    if (index >= items.length) {
      draft.status = "complete";
      return finishStreaming(draft);
    }
    var item = items[index];
    var el = createItemElement();
    draft.partial = { item: item, el: el, length: 0 };
    function tick() {
      var partial = draft.partial;
      partial.length = Math.min(item.text.length, partial.length + FAKE_CHUNK_SIZE);
      el.textEl.textContent = item.text.slice(0, partial.length);
      if (partial.length < item.text.length) {
        later(tick, FAKE_CHUNK_DELAY);
      } else {
        finishItem(el.li, el.textEl, item);
        draft.items.push(item);
        draft.partial = null;
        later(function () { streamItems(items, index + 1, draft); }, FAKE_CHUNK_DELAY * 4);
      }
    }
    later(tick, FAKE_CHUNK_DELAY);
  }

  function finishStreaming(draft) {
    job = null;
    versions.push({ items: draft.items, status: draft.status, edited: false });
    // 초점이 있던 '생성 중단' 버튼이 사라지면 결과 제목으로 초점을 옮긴다(초점 분실 방지).
    var hadFocus = document.activeElement === stopButton;
    showVersion(versions.length - 1);
    if (hadFocus) { resultTitle.focus(); }
    var low = draft.items.filter(function (i) { return i.uncertain; }).length;
    if (draft.status === "complete") {
      announce("요약을 마쳤습니다. 요약 " + draft.items.length + "개 항목 중 확인 필요 " + low + "개입니다.");
    } else {
      announce("요약 생성을 중단했습니다. 지금까지 만든 " + draft.items.length + "개 항목을 표시합니다.");
    }
  }

  function stopStreaming() {
    if (!job) { return; }
    var draft = job.draft;
    cancelJob();
    // 쓰던 항목은 나온 데까지 남기고, 근거 확인이 끝나지 않았으므로 확인 필요로 표시한다.
    if (draft.partial && draft.partial.length > 0) {
      var p = draft.partial;
      draft.items.push({
        text: p.item.text.slice(0, p.length) + "…",
        sources: p.item.sources,
        uncertain: p.item.text.slice(0, p.length) + "…"
      });
    }
    if (draft.items.length === 0) {
      // 내용이 나오기 전에 멈췄으면 이전 화면으로 돌아간다.
      if (versions.length > 0) {
        showVersion(current);
      } else {
        view = "idle";
        render();
      }
      if (document.activeElement === stopButton || document.activeElement === document.body) {
        (versions.length > 0 ? resultTitle : summarizeButton).focus();
      }
      announce("요약 생성을 중단했습니다. 만들어진 내용이 없습니다.");
      return;
    }
    draft.status = "stopped";
    finishStreaming(draft);
  }

  function failWithError() {
    job = null;
    output.setAttribute("data-ai-status", "error");
    resultStatus.textContent = "";
    var hadFocus = document.activeElement === stopButton;
    view = "error";
    render();
    if (hadFocus) { retryButton.focus(); }
    errorLive.textContent = "요약을 만들지 못했습니다. 잠시 후 다시 시도하세요.";
  }

  function finishEmpty() {
    job = null;
    output.setAttribute("data-ai-status", "empty");
    var hadFocus = document.activeElement === stopButton;
    view = "empty";
    render();
    if (hadFocus) { repasteButton.focus(); }
    // 답 없음은 오류가 아니므로 alert 가 아닌 status 로 알린다(AI-012).
    announce("요약할 안내 내용을 찾지 못했습니다. 안내 문서의 본문 전체를 붙여 넣어 주세요.");
  }

  // ---------- 입력 검증 ----------
  function showInputError(message) {
    docField.classList.add("text-area--error");
    docInput.setAttribute("aria-invalid", "true");
    docInput.setAttribute("aria-describedby", "doc-input-hint doc-input-count doc-input-error");
    docError.textContent = message;
    docError.hidden = false;
  }

  function clearInputError() {
    docField.classList.remove("text-area--error");
    docInput.removeAttribute("aria-invalid");
    docInput.setAttribute("aria-describedby", "doc-input-hint doc-input-count");
    docError.textContent = "";
    docError.hidden = true;
  }

  function updateCount() {
    var length = docInput.value.length;
    countCurrent.textContent = String(length);
    var max = Number(docInput.getAttribute("maxlength"));
    countStatus.textContent = length >= max ? "최대 " + max.toLocaleString("ko-KR") + "자를 모두 입력했습니다." : "";
  }

  // ---------- 결과 고치기 ----------
  function openEditor() {
    var version = versions[current];
    editFields.textContent = "";
    version.items.forEach(function (item, i) {
      var wrap = document.createElement("div");
      wrap.className = "text-area";
      var id = "edit-item-" + (i + 1);
      var label = document.createElement("label");
      label.className = "text-area__label";
      label.htmlFor = id;
      label.textContent = "요약 " + (i + 1) + "번 항목";
      var ta = document.createElement("textarea");
      ta.className = "text-area__input";
      ta.id = id;
      ta.rows = 3;
      ta.value = item.text;
      ta.setAttribute("aria-describedby", "edit-hint");
      wrap.appendChild(label);
      wrap.appendChild(ta);
      editFields.appendChild(wrap);
    });
    view = "editing";
    render();
    var first = editFields.querySelector("textarea");
    if (first) { first.focus(); }
  }

  function saveEditor() {
    var version = versions[current];
    var changed = false;
    var items = version.items.map(function (item, i) {
      var ta = $("edit-item-" + (i + 1));
      var text = ta.value.trim();
      if (text === item.text) { return item; }
      changed = true;
      // 사람이 고친 문장은 AI 확신 표시 대상이 아니므로 확인 필요 구절을 지운다.
      return { text: text, sources: item.sources, uncertain: "" };
    }).filter(function (item) { return item.text.length > 0; });
    if (changed) {
      version.items = items;
      version.edited = true;
    }
    showVersion(current);
    editButton.focus();
    announce(changed ? "고친 요약을 저장했습니다." : "바뀐 내용이 없어 요약을 그대로 두었습니다.");
  }

  function cancelEditor() {
    showVersion(current);
    editButton.focus();
    announce("요약 고치기를 취소했습니다.");
  }

  // ---------- 복사 ----------
  function versionToText(version) {
    // 서비스 밖으로 내보내는 글에도 AI 생성 사실을 첫 줄에 넣는다(AI-003).
    var lines = [version.edited ? "[AI 생성 요약 · 사용자가 고침]" : "[AI 생성 요약]",
      "이 요약은 AI가 만들었으며 틀릴 수 있습니다. 근거 원문과 함께 확인하세요.", ""];
    version.items.forEach(function (item, i) {
      lines.push((i + 1) + ". " + item.text + (item.uncertain ? " [확인 필요]" : ""));
      item.sources.forEach(function (src) {
        lines.push("   근거 원문 " + src.index + "번째 문장: “" + src.text + "”");
      });
    });
    if (version.status === "stopped") { lines.push("", "(생성 중단됨 — 끝나지 않은 요약입니다)"); }
    return lines.join("\n");
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.className = "sr-only";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    copyButton.focus();
    return ok;
  }

  function copySummary() {
    var text = versionToText(versions[current]);
    var done = function () { announce("요약을 복사했습니다. 복사한 글 첫 줄에 'AI 생성 요약' 표시가 들어 있습니다."); };
    var failed = function () { announce("요약을 복사하지 못했습니다. 요약 문장을 직접 선택해 복사하세요."); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () {
        if (fallbackCopy(text)) { done(); } else { failed(); }
      });
    } else if (fallbackCopy(text)) {
      done();
    } else {
      failed();
    }
  }

  // ---------- 이벤트 ----------
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (view === "streaming") { return; } // 처리 중 두 번째 누름은 무시한다(FORM-013).
    var text = docInput.value.trim();
    if (text.length === 0) {
      showInputError("민원 안내 문서를 붙여 넣어 주세요. 예: 기관 누리집 안내 페이지의 본문을 복사해 붙여 넣습니다.");
      docInput.focus();
      return;
    }
    clearInputError();
    startSummary(text);
  });

  docInput.addEventListener("input", updateCount);

  sampleButton.addEventListener("click", function () {
    docInput.value = SAMPLE_DOCUMENT;
    updateCount();
    clearInputError();
    docInput.focus();
  });

  stopButton.addEventListener("click", stopStreaming);
  retryButton.addEventListener("click", function () { startSummary(lastDocument); });
  regenerateButton.addEventListener("click", function () { startSummary(lastDocument); });

  repasteButton.addEventListener("click", function () {
    docInput.focus();
    docInput.select();
  });

  function backToPrevious() {
    showVersion(versions.length - 1);
    resultTitle.focus();
  }
  errorBackButton.addEventListener("click", backToPrevious);
  emptyBackButton.addEventListener("click", backToPrevious);

  editButton.addEventListener("click", openEditor);
  editSave.addEventListener("click", saveEditor);
  editCancel.addEventListener("click", cancelEditor);
  copyButton.addEventListener("click", copySummary);

  versionPrev.addEventListener("click", function () {
    if (current > 0) {
      showVersion(current - 1);
      if (versionPrev.disabled) { versionNext.focus(); }
      announce("결과 " + (current + 1) + "/" + versions.length + "을 표시합니다.");
    }
  });
  versionNext.addEventListener("click", function () {
    if (current < versions.length - 1) {
      showVersion(current + 1);
      if (versionNext.disabled) { versionPrev.focus(); }
      announce("결과 " + (current + 1) + "/" + versions.length + "을 표시합니다.");
    }
  });

  updateCount();
  render();
})();
