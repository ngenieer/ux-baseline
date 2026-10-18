/* 주문 운영 대시보드 — 바닐라 JS, 가짜 데이터.
   흐름: 상태(state) → fakeFetch(가짜 서버 응답) → render*(화면 갱신) */
(() => {
  'use strict';

  const MIN = 60000;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;
  const PAGE_SIZE = 10;
  const SPINNER_AFTER = 1000; // 1초 안에 끝나는 처리에는 진행 표시를 띄우지 않는다
  const DELAY_PERIOD = 700; // 기간 바꾸기·필터 불러오기 가짜 지연 (1초 미만)
  const DELAY_REFRESH = 2200; // 새로 고침 가짜 지연 (1초 넘음 → 스피너)

  const PERIODS = { 1: '오늘', 7: '7일', 30: '30일' };
  const STATUS_LABEL = { all: '전체', processing: '처리 중', done: '완료', cancelled: '취소' };
  const STATUS_RANK = { processing: 0, done: 1, cancelled: 2 };
  const STATUS_BADGE = { processing: 'badge--information', done: 'badge--success', cancelled: 'badge--danger' };
  const SORTS = {
    id: { label: '주문번호', first: 'desc', get: (o) => o.seq },
    time: { label: '주문 시각', first: 'desc', get: (o) => o.t },
    customer: { label: '고객', first: 'asc', get: (o) => o.customer },
    amount: { label: '금액', first: 'desc', get: (o) => o.amount },
    status: { label: '상태', first: 'asc', get: (o) => STATUS_RANK[o.status] },
    proc: { label: '처리 시간', first: 'desc', get: (o) => (o.status === 'done' ? o.min : null) },
  };

  const $ = (id) => document.getElementById(id);
  const el = {
    periodButtons: [...document.querySelectorAll('[data-period]')],
    statusButtons: [...document.querySelectorAll('[data-status]')],
    refresh: $('refresh'),
    updatedAt: $('updated-at'),
    scenario: $('demo-scenario'),
    live: $('live'),
    region: $('data-region'),
    loading: $('loading'),
    error: $('error-region'),
    content: $('content'),
    rangeText: $('range-text'),
    metrics: $('metrics'),
    summaryEmpty: $('summary-empty'),
    trendTitle: $('trend-title'),
    trendNote: $('trend-note'),
    trendBody: $('trend-body'),
    trendEmpty: $('trend-empty'),
    trendRows: $('trend-rows'),
    trendCaption: $('trend-table-caption'),
    chartCaption: $('chart-caption'),
    chartCanvas: $('chart-canvas'),
    chartDesc: $('chart-desc'),
    ordersSummary: $('orders-summary'),
    ordersTableWrap: $('orders-table-wrap'),
    ordersRows: $('orders-rows'),
    ordersEmpty: $('orders-empty'),
    pagination: $('pagination'),
    sortHeaders: [...document.querySelectorAll('th[data-key]')],
  };

  /* ---------- 가짜 데이터 ---------- */
  function mulberry32(seed) {
    let a = seed;
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rand = mulberry32(20261018);
  const pick = (list) => list[Math.floor(rand() * list.length)];
  const normal = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());

  const SURNAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권'];
  const GIVEN = ['민준', '서연', '지후', '하윤', '도윤', '서준', '지우', '예은', '현우', '수빈', '지민', '유진', '태양', '다은', '시우', '나연'];
  const HOUR_WEIGHT = [1, 1, 1, 1, 1, 2, 3, 5, 7, 9, 11, 13, 14, 12, 10, 10, 11, 12, 14, 15, 14, 10, 6, 3];
  const HOUR_TOTAL = HOUR_WEIGHT.reduce((a, b) => a + b, 0);

  const startOfDay = (ts, offsetDays = 0) => {
    const d = new Date(ts);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + offsetDays).getTime();
  };

  function pickHour() {
    let r = rand() * HOUR_TOTAL;
    for (let h = 0; h < 24; h += 1) {
      r -= HOUR_WEIGHT[h];
      if (r < 0) return h;
    }
    return 23;
  }

  function makeOrder(t, cancelRate) {
    const given = pick(GIVEN);
    const cancelled = rand() < cancelRate;
    const stuck = !cancelled && rand() < 0.004; // 오래 멈춰 있는 주문
    return {
      seq: 0,
      t,
      customer: `${pick(SURNAMES)}*${given.charAt(given.length - 1)}`,
      amount: Math.round(Math.exp(10.4 + 0.7 * normal()) / 100) * 100,
      outcome: cancelled ? 'cancelled' : 'done',
      // 완료·취소까지 걸리는 시간(분). 이 시간이 지나야 처리 중 → 완료/취소가 된다.
      min: stuck ? 1e9 : cancelled ? 3 + rand() * 50 : Math.min(240, Math.max(5, Math.exp(Math.log(26) + 0.55 * normal()))),
    };
  }

  const ORDERS = [];
  let dataClock = Date.now();
  let nextSeq = 100001;

  (function seedHistory(now) {
    const list = [];
    for (let back = 60; back >= 0; back -= 1) {
      const dayStart = startOfDay(now, -back);
      const weekday = new Date(dayStart).getDay();
      const weekend = weekday === 0 || weekday === 6 ? 0.78 : 1;
      const total = Math.round((95 + (60 - back) * 0.5 + 12 * normal()) * weekend);
      const cancelRate = 0.04 + 0.045 * rand();
      for (let i = 0; i < total; i += 1) {
        const t = dayStart + pickHour() * HOUR + Math.floor(rand() * 60) * MIN + Math.floor(rand() * 60) * 1000;
        if (t <= now) list.push(makeOrder(t, cancelRate));
      }
    }
    list.sort((a, b) => a.t - b.t);
    list.forEach((o) => {
      o.seq = nextSeq;
      nextSeq += 1;
      ORDERS.push(o);
    });
    dataClock = now;
  })(dataClock);

  // 새로 고침할 때마다 그 사이 들어온 새 주문을 더한다
  function syncOrders(now) {
    if (now <= dataClock) return;
    const elapsedMin = (now - dataClock) / MIN;
    const count = Math.min(12, Math.max(1, Math.round(elapsedMin * 1.4)));
    const fresh = [];
    for (let i = 0; i < count; i += 1) fresh.push(makeOrder(dataClock + rand() * (now - dataClock), 0.06));
    fresh.sort((a, b) => a.t - b.t);
    fresh.forEach((o) => {
      o.seq = nextSeq;
      nextSeq += 1;
      ORDERS.push(o);
    });
    dataClock = now;
  }

  const statusOf = (o, now) => (now >= o.t + o.min * MIN ? o.outcome : 'processing');

  function windows(days, now) {
    const start = startOfDay(now, -(days - 1));
    const span = days * DAY;
    return { start, prevStart: start - span, prevEnd: now - span };
  }

  function buildResponse(days, scenario, now) {
    syncOrders(now);
    const w = windows(days, now);
    const inRange = (from, to) => ORDERS
      .filter((o) => o.t >= from && o.t <= to)
      .map((o) => ({ ...o, status: statusOf(o, now) }));
    if (scenario === 'empty') return { now, days, ...w, current: [], previous: [] };
    return { now, days, ...w, current: inRange(w.start, now), previous: inRange(w.prevStart, w.prevEnd) };
  }

  // 서버 요청을 흉내 낸다: 지연 후 응답하거나, 시연 상태가 '불러오기 실패'이면 거절한다
  function fakeFetch({ days, scenario, delay }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (scenario === 'error') reject(new Error('시연: 주문 서버가 응답하지 않습니다'));
        else resolve(buildResponse(days, scenario, Date.now()));
      }, delay);
    });
  }

  /* ---------- 표기 ---------- */
  const nf = new Intl.NumberFormat('ko-KR');
  const pad = (n) => String(n).padStart(2, '0');
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isoDate = (ts) => { const d = new Date(ts); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const fmtDate = (ts) => { const d = new Date(ts); return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`; };
  const fmtTime = (ts) => { const d = new Date(ts); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const fmtTimeSec = (ts) => `${fmtTime(ts)}:${pad(new Date(ts).getSeconds())}`;
  const fmtDuration = (m) => {
    const r = Math.round(m);
    return r < 60 ? `${r}분` : `${Math.floor(r / 60)}시간 ${pad(r % 60)}분`;
  };

  /* ---------- 상태 ---------- */
  const state = {
    days: 7,
    status: 'all',
    sortKey: 'id',
    sortDir: 'desc',
    page: 1,
    data: null,
    loading: false,
    failed: false,
    lastOk: null,
    reqId: 0,
  };

  function readUrl() {
    try {
      const q = new URLSearchParams(window.location.search);
      const days = Number(q.get('period'));
      if (PERIODS[days]) state.days = days;
      if (STATUS_LABEL[q.get('status')]) state.status = q.get('status');
      if (SORTS[q.get('sort')]) state.sortKey = q.get('sort');
      if (q.get('dir') === 'asc' || q.get('dir') === 'desc') state.sortDir = q.get('dir');
      const page = Number(q.get('page'));
      if (Number.isInteger(page) && page >= 1) state.page = page;
    } catch (e) { /* 주소 읽기를 못 해도 기본값으로 동작한다 */ }
  }
  const queryFor = (page) => `?period=${state.days}&status=${state.status}&sort=${state.sortKey}&dir=${state.sortDir}&page=${page}`;
  function writeUrl() {
    try { window.history.replaceState(null, '', queryFor(state.page)); } catch (e) { /* 주소 갱신을 못 해도 화면은 동작한다 */ }
  }

  /* ---------- 알림 ---------- */
  function announce(message) {
    el.live.textContent = '';
    window.requestAnimationFrame(() => { el.live.textContent = message; });
  }

  /* ---------- 요약 지표 ---------- */
  function summarize(orders) {
    let cancelled = 0;
    let revenue = 0;
    let procSum = 0;
    let procCount = 0;
    orders.forEach((o) => {
      if (o.status === 'cancelled') cancelled += 1;
      else revenue += o.amount;
      if (o.status === 'done') { procSum += o.min; procCount += 1; }
    });
    return {
      count: orders.length,
      revenue,
      cancelRate: orders.length ? (cancelled / orders.length) * 100 : null,
      avgProc: procCount ? procSum / procCount : null,
    };
  }

  // kind: pct(비율 변화) · point(%p 차이) · minute(분 차이). upIsGood: 늘어나면 좋은 지표인가
  function compare(cur, prev, kind, upIsGood) {
    if (cur === null || prev === null || (kind === 'pct' && prev === 0)) {
      return { dir: 'none', text: '비교할 전 기간 데이터가 없습니다', tone: 'neutral' };
    }
    let diff;
    let unit;
    if (kind === 'pct') { diff = ((cur - prev) / prev) * 100; unit = '%'; }
    else if (kind === 'point') { diff = cur - prev; unit = '%p'; }
    else { diff = cur - prev; unit = '분'; }
    const rounded = kind === 'minute' ? Math.round(diff) : Math.round(diff * 10) / 10;
    if (rounded === 0) return { dir: 'flat', text: '변화 없음', tone: 'neutral' };
    const up = rounded > 0;
    const shown = kind === 'minute' ? String(Math.abs(rounded)) : Math.abs(rounded).toFixed(1);
    return {
      dir: up ? 'up' : 'down',
      text: `${shown}${unit} ${up ? '증가' : '감소'}`,
      tone: up === upIsGood ? 'good' : 'bad',
    };
  }

  const METRICS = [
    { key: 'count', label: '주문 수', basis: '접수된 전체 주문', format: (v) => `${nf.format(v)}건`, kind: 'pct', upIsGood: true },
    { key: 'revenue', label: '매출', basis: '취소 주문 제외', format: (v) => `${nf.format(v)}원`, kind: 'pct', upIsGood: true },
    { key: 'cancelRate', label: '취소율', basis: '전체 주문 중 취소 비율', format: (v) => `${v.toFixed(1)}%`, kind: 'point', upIsGood: false },
    { key: 'avgProc', label: '평균 처리 시간', basis: '완료 주문의 접수부터 완료까지', format: fmtDuration, kind: 'minute', upIsGood: false },
  ];
  const ARROW = { up: '▲', down: '▼', flat: '－', none: '－' };

  function renderMetrics(data) {
    const cur = summarize(data.current);
    const prev = summarize(data.previous);
    const empty = data.current.length === 0;
    el.summaryEmpty.hidden = !empty;
    el.metrics.innerHTML = METRICS.map((m) => {
      const value = cur[m.key];
      const before = prev[m.key];
      const shown = value === null || empty ? '-' : m.format(value);
      const cmp = empty ? { dir: 'none', text: '비교할 데이터가 없습니다', tone: 'neutral' } : compare(value, before, m.kind, m.upIsGood);
      const prevText = before === null || data.previous.length === 0 ? '-' : m.format(before);
      return `<li class="metric">
        <h3 class="metric__label">${m.label}</h3>
        <p class="metric__basis">${m.basis}</p>
        <div class="metric__value">${shown}</div>
        <p class="metric__delta metric__delta--${cmp.tone}"><span aria-hidden="true">${ARROW[cmp.dir]}</span> ${esc(cmp.text)}<span class="sr-only"> (전 기간 대비)</span></p>
        <p class="metric__prev">전 기간 ${prevText}</p>
      </li>`;
    }).join('');
  }

  function renderRange(data) {
    const first = PERIODS[data.days];
    const range = data.days === 1
      ? `오늘(${fmtDate(data.start)} 00:00 ~ ${fmtTime(data.now)})`
      : `${first}(${fmtDate(data.start)} ~ ${fmtDate(data.now)})`;
    const prevRange = data.days === 1
      ? `어제 같은 시각까지(${fmtDate(data.prevStart)} 00:00 ~ ${fmtTime(data.prevEnd)})`
      : `직전 ${data.days}일(${fmtDate(data.prevStart)} ~ ${fmtDate(data.prevEnd)})`;
    el.rangeText.textContent = `조회 기간 ${range}. 증감은 전 기간 ${prevRange} 대비입니다.`;
  }

  /* ---------- 추이: 막대 그래프(SVG 직접 그리기)와 표 ---------- */
  function buildBuckets(data) {
    const hourly = data.days === 1;
    const buckets = [];
    if (hourly) {
      const hours = new Date(data.now).getHours();
      for (let h = 0; h <= hours; h += 1) {
        buckets.push({ from: data.start + h * HOUR, to: data.start + (h + 1) * HOUR, label: `${h}시`, rowLabel: `${pad(h)}:00` });
      }
    } else {
      for (let i = 0; i < data.days; i += 1) {
        const from = startOfDay(data.start, i);
        const d = new Date(from);
        buckets.push({
          from,
          to: startOfDay(data.start, i + 1),
          label: `${d.getMonth() + 1}. ${d.getDate()}.`,
          rowDate: from,
          weekday: WEEKDAY[d.getDay()],
        });
      }
    }
    buckets.forEach((b) => { b.count = 0; b.cancelled = 0; b.revenue = 0; });
    let idx = 0;
    data.current.forEach((o) => { // 주문은 시각 순서로 들어온다
      while (idx < buckets.length - 1 && o.t >= buckets[idx].to) idx += 1;
      const b = buckets[idx];
      b.count += 1;
      if (o.status === 'cancelled') b.cancelled += 1;
      else b.revenue += o.amount;
    });
    return { hourly, buckets };
  }

  function niceStep(raw) {
    const pow = 10 ** Math.floor(Math.log10(raw));
    const m = raw / pow;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * pow;
  }

  function drawChart(buckets) {
    const canvas = el.chartCanvas;
    const width = canvas.clientWidth || 600;
    const fs = parseFloat(window.getComputedStyle(canvas).fontSize) || 15;
    const rootFs = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
    const height = Math.round(rootFs * 16);
    const left = Math.round(fs * 3.6);
    const right = Math.round(fs * 0.6);
    const top = Math.round(fs * 1.8);
    const bottom = Math.round(fs * 2.4);
    const plotW = Math.max(1, width - left - right);
    const plotH = height - top - bottom;
    const maxCount = Math.max(1, ...buckets.map((b) => b.count));
    const step = niceStep(maxCount / 4);
    const yMax = step * Math.ceil(maxCount / step);
    const y = (v) => top + plotH - (v / yMax) * plotH;
    const band = plotW / buckets.length;
    const barW = Math.max(2, band * 0.68);
    const labelEvery = Math.max(1, Math.ceil((fs * 4.4) / band));
    const maxIndex = buckets.findIndex((b) => b.count === maxCount);
    const parts = [];

    for (let v = 0; v <= yMax; v += step) {
      parts.push(`<line class="chart__grid" x1="${left}" x2="${width - right}" y1="${y(v)}" y2="${y(v)}"></line>`);
      parts.push(`<text class="chart__tick" x="${left - 6}" y="${y(v) + fs * 0.35}" text-anchor="end">${nf.format(v)}</text>`);
    }
    buckets.forEach((b, i) => {
      const x = left + band * i + (band - barW) / 2;
      const h = (b.count / yMax) * plotH;
      parts.push(`<rect class="chart__bar" x="${x.toFixed(1)}" y="${(top + plotH - h).toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}"></rect>`);
      if (b.count > 0 && (band >= fs * 2.6 || i === maxIndex)) {
        parts.push(`<text class="chart__value" x="${(x + barW / 2).toFixed(1)}" y="${(top + plotH - h - 5).toFixed(1)}" text-anchor="middle">${nf.format(b.count)}</text>`);
      }
      if (i % labelEvery === 0) {
        parts.push(`<text class="chart__tick" x="${(x + barW / 2).toFixed(1)}" y="${height - bottom + fs * 1.4}" text-anchor="middle">${esc(b.label)}</text>`);
      }
    });
    parts.push(`<line class="chart__axis" x1="${left}" x2="${width - right}" y1="${top + plotH}" y2="${top + plotH}"></line>`);

    canvas.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chart-caption chart-desc" focusable="false">${parts.join('')}</svg>`;
  }

  let currentBuckets = null;

  function renderTrend(data) {
    const empty = data.current.length === 0;
    el.trendBody.hidden = empty;
    el.trendEmpty.hidden = !empty;
    const { hourly, buckets } = buildBuckets(data);
    const unitName = hourly ? '시간대별' : '일별';
    el.trendTitle.textContent = `${unitName} 주문 추이`;
    el.chartCaption.textContent = `${unitName} 주문 수(건)`;
    el.trendCaption.textContent = hourly
      ? '시간대별 주문 수 — 열: 시간대(시작 시각), 주문 수(건), 취소(건), 매출(원)'
      : '일별 주문 수 — 열: 날짜, 주문 수(건), 취소(건), 매출(원)';
    el.trendNote.textContent = hourly
      ? '오늘 0시부터 현재 시각까지 1시간 단위로 센 주문 수입니다. 마지막 항목은 현재 시간대의 집계 중인 값입니다.'
      : '조회 기간의 날짜별 주문 수입니다. 마지막 항목은 오늘 현재 시각까지 집계 중인 값입니다.';
    $('trend-col-label').textContent = hourly ? '시간대' : '날짜';
    if (empty) { currentBuckets = null; el.chartDesc.textContent = ''; el.trendRows.innerHTML = ''; return; }

    el.trendRows.innerHTML = buckets.map((b) => {
      const head = hourly
        ? esc(b.rowLabel)
        : `<time datetime="${isoDate(b.rowDate)}">${fmtDate(b.rowDate)}</time> (${b.weekday})`;
      return `<tr><th scope="row">${head}</th><td class="data-table__cell--number">${nf.format(b.count)}</td><td class="data-table__cell--number">${nf.format(b.cancelled)}</td><td class="data-table__cell--number">${nf.format(b.revenue)}</td></tr>`;
    }).join('');

    const total = buckets.reduce((s, b) => s + b.count, 0);
    const maxB = buckets.reduce((m, b) => (b.count > m.count ? b : m), buckets[0]);
    const minB = buckets.reduce((m, b) => (b.count < m.count ? b : m), buckets[0]);
    el.chartDesc.textContent = `${unitName} 주문 수 막대 그래프. 합계 ${nf.format(total)}건, 가장 많은 구간은 ${maxB.label} ${nf.format(maxB.count)}건, 가장 적은 구간은 ${minB.label} ${nf.format(minB.count)}건입니다. 구간별 값은 옆의 표에 있습니다.`;
    currentBuckets = buckets;
    drawChart(buckets);
  }

  /* ---------- 최근 주문: 필터 · 정렬 · 페이지 ---------- */
  function visibleOrders() {
    const { get } = SORTS[state.sortKey];
    const sign = state.sortDir === 'asc' ? 1 : -1;
    const list = state.data.current.filter((o) => state.status === 'all' || o.status === state.status);
    return list.sort((a, b) => {
      const va = get(a);
      const vb = get(b);
      if (va === vb) return b.seq - a.seq;
      if (va === null) return 1; // 값 없음은 항상 뒤
      if (vb === null) return -1;
      const cmp = typeof va === 'string' ? va.localeCompare(vb, 'ko') : va - vb;
      return cmp * sign;
    });
  }

  function pageItems(total, current, max) {
    if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);
    const items = [];
    if (current < max - 3) {
      for (let p = 1; p <= max - 2; p += 1) items.push(p);
      items.push('…', total);
    } else if (current > total - (max - 4)) {
      items.push(1, '…');
      for (let p = total - (max - 3); p <= total; p += 1) items.push(p);
    } else {
      const mid = max - 4;
      const from = current - Math.floor((mid - 1) / 2);
      items.push(1, '…');
      for (let p = from; p < from + mid; p += 1) items.push(p);
      items.push('…', total);
    }
    return items;
  }

  const wideQuery = window.matchMedia('(min-width: 1024px)');

  function renderPagination(pages) {
    if (pages <= 1) { el.pagination.hidden = true; el.pagination.innerHTML = ''; return; }
    el.pagination.hidden = false;
    const items = pageItems(pages, state.page, wideQuery.matches ? 10 : 7);
    const prev = state.page > 1
      ? `<a class="pagination__nav pagination__nav--prev" href="${queryFor(state.page - 1)}" data-page="${state.page - 1}" aria-label="이전 페이지">이전</a>`
      : '<a class="pagination__nav pagination__nav--prev" aria-disabled="true" aria-label="이전 페이지">이전</a>';
    const next = state.page < pages
      ? `<a class="pagination__nav pagination__nav--next" href="${queryFor(state.page + 1)}" data-page="${state.page + 1}" aria-label="다음 페이지">다음</a>`
      : '<a class="pagination__nav pagination__nav--next" aria-disabled="true" aria-label="다음 페이지">다음</a>';
    const list = items.map((p) => (p === '…'
      ? '<li class="pagination__ellipsis" aria-hidden="true">…</li>'
      : `<li class="pagination__item"><a class="pagination__link" href="${queryFor(p)}" data-page="${p}"${p === state.page ? ' aria-current="page"' : ''}>${p}<span class="sr-only">페이지</span></a></li>`)).join('');
    el.pagination.innerHTML = `${prev}<ul class="pagination__list">${list}</ul>${next}`;
  }

  function renderSortHeaders() {
    el.sortHeaders.forEach((th) => {
      const active = th.dataset.key === state.sortKey;
      if (active) th.setAttribute('aria-sort', state.sortDir === 'asc' ? 'ascending' : 'descending');
      else th.removeAttribute('aria-sort');
      th.querySelector('.sort-button__icon').textContent = active ? (state.sortDir === 'asc' ? '▲' : '▼') : '↕';
    });
  }

  function renderStatusButtons() {
    el.statusButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.status === state.status)));
  }

  function renderOrders() {
    renderStatusButtons();
    renderSortHeaders();
    const all = state.data.current;

    if (all.length === 0) { // 1) 이 기간에 데이터가 없음
      el.ordersTableWrap.hidden = true;
      el.ordersEmpty.hidden = false;
      el.ordersSummary.textContent = '총 0건';
      el.ordersEmpty.innerHTML = `<h3 class="empty-state__title">이 기간에 접수된 주문이 없습니다</h3>
        <p class="empty-state__text">${PERIODS[state.days]} 동안 들어온 주문이 없습니다. 더 긴 기간을 선택하거나 새로 고침해 보세요.</p>`;
      return;
    }

    const list = visibleOrders();
    if (list.length === 0) { // 2) 필터 결과 없음
      el.ordersTableWrap.hidden = true;
      el.ordersEmpty.hidden = false;
      el.ordersSummary.textContent = '총 0건';
      el.ordersEmpty.innerHTML = `<h3 class="empty-state__title">'${STATUS_LABEL[state.status]}' 상태의 주문이 없습니다</h3>
        <p class="empty-state__text">${PERIODS[state.days]} 동안 접수된 주문 ${nf.format(all.length)}건 중 '${STATUS_LABEL[state.status]}' 상태인 주문이 없습니다. 상태를 '전체'로 바꾸면 모든 주문을 볼 수 있습니다.</p>
        <button type="button" class="button button--secondary button--medium" data-action="clear-filter">상태 필터 해제</button>`;
      return;
    }

    el.ordersEmpty.hidden = true;
    el.ordersTableWrap.hidden = false;
    const pages = Math.ceil(list.length / PAGE_SIZE);
    state.page = Math.min(Math.max(1, state.page), pages);
    const from = (state.page - 1) * PAGE_SIZE;
    const slice = list.slice(from, from + PAGE_SIZE);
    el.ordersSummary.textContent = `총 ${nf.format(list.length)}건 중 ${nf.format(from + 1)}~${nf.format(from + slice.length)}건 · ${state.page} / ${pages} 페이지`;
    el.ordersRows.innerHTML = slice.map((o) => `<tr>
      <th scope="row">ORD-${o.seq}</th>
      <td><time datetime="${isoDate(o.t)}T${fmtTime(o.t)}">${fmtDate(o.t)} ${fmtTime(o.t)}</time></td>
      <td>${esc(o.customer)}</td>
      <td class="data-table__cell--number">${nf.format(o.amount)}</td>
      <td><span class="badge ${STATUS_BADGE[o.status]}">${STATUS_LABEL[o.status]}</span></td>
      <td class="data-table__cell--number">${o.status === 'done' ? fmtDuration(o.min) : '-'}</td>
    </tr>`).join('');
    renderPagination(pages);
  }

  /* ---------- 화면 갱신 ---------- */
  function renderPeriodButtons() {
    el.periodButtons.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.period) === state.days)));
  }

  function renderAll() {
    renderPeriodButtons();
    if (!state.data) return;
    renderRange(state.data);
    renderMetrics(state.data);
    renderTrend(state.data);
    renderOrders();
    writeUrl();
  }

  function renderUpdated() {
    if (!state.lastOk) return;
    el.updatedAt.textContent = `${fmtDate(state.lastOk)} ${fmtTimeSec(state.lastOk)}`;
    el.updatedAt.setAttribute('datetime', `${isoDate(state.lastOk)}T${fmtTimeSec(state.lastOk)}`);
  }

  /* ---------- 불러오기 ---------- */
  function setBusy(busy) {
    state.loading = busy;
    el.region.setAttribute('aria-busy', String(busy));
    el.refresh.setAttribute('aria-disabled', String(busy));
  }

  function showError() {
    state.failed = true;
    el.content.hidden = true;
    el.error.innerHTML = `<section class="notice" aria-labelledby="error-title">
      <h2 class="notice__title" id="error-title">주문 데이터를 불러오지 못했습니다</h2>
      <p class="notice__text">주문 서버에서 응답을 받지 못했습니다. 이전 조회 결과와 섞이지 않도록 지표·그래프·표를 숨겼습니다. 잠시 후 다시 시도해 주세요.</p>
      <p class="notice__text">마지막으로 갱신에 성공한 시각: ${state.lastOk ? `<time datetime="${isoDate(state.lastOk)}T${fmtTimeSec(state.lastOk)}">${fmtDate(state.lastOk)} ${fmtTimeSec(state.lastOk)}</time>` : '없음'}</p>
      <div class="notice__actions"><button type="button" class="button button--primary button--medium" data-action="retry">다시 시도</button></div>
    </section>`;
  }

  function clearError() {
    state.failed = false;
    el.error.innerHTML = '';
  }

  async function load({ scenario = 'normal', delay = DELAY_PERIOD, reason = '' } = {}) {
    state.reqId += 1;
    const id = state.reqId;
    setBusy(true);
    const timer = window.setTimeout(() => {
      if (id !== state.reqId) return;
      clearError();
      el.content.hidden = true;
      el.loading.hidden = false;
    }, SPINNER_AFTER);
    try {
      const data = await fakeFetch({ days: state.days, scenario, delay });
      if (id !== state.reqId) return;
      state.data = data;
      state.lastOk = data.now;
      clearError();
      el.content.hidden = false;
      renderAll();
      renderUpdated();
      announce(data.current.length === 0
        ? `${reason}${PERIODS[state.days]} 기간에 접수된 주문이 없습니다.`
        : `${reason}${PERIODS[state.days]} 주문 ${nf.format(data.current.length)}건을 불러왔습니다.`);
    } catch (e) {
      if (id !== state.reqId) return;
      renderPeriodButtons();
      showError();
      announce(`${reason}주문 데이터를 불러오지 못했습니다.`);
    } finally {
      if (id === state.reqId) {
        window.clearTimeout(timer);
        el.loading.hidden = true;
        setBusy(false);
      }
    }
  }

  /* ---------- 이벤트 ---------- */
  el.periodButtons.forEach((b) => b.addEventListener('click', () => {
    const days = Number(b.dataset.period);
    if (days === state.days && !state.failed) return;
    state.days = days;
    state.page = 1;
    renderPeriodButtons();
    load({ reason: `${PERIODS[days]}로 바꿨습니다. ` });
  }));

  el.refresh.addEventListener('click', () => {
    if (state.loading) return; // 처리 중에는 누름을 무시한다 (aria-disabled)
    const scenario = el.scenario.value;
    el.scenario.value = 'normal';
    load({ scenario, delay: DELAY_REFRESH, reason: '새로 고침: ' });
  });

  el.statusButtons.forEach((b) => b.addEventListener('click', () => {
    if (!state.data || b.dataset.status === state.status) return;
    state.status = b.dataset.status;
    state.page = 1;
    renderAll();
    announce(`상태 필터 ${STATUS_LABEL[state.status]}. ${el.ordersSummary.textContent}`);
  }));

  el.sortHeaders.forEach((th) => th.querySelector('button').addEventListener('click', () => {
    if (!state.data) return;
    const key = th.dataset.key;
    if (state.sortKey === key) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    else { state.sortKey = key; state.sortDir = SORTS[key].first; }
    state.page = 1;
    renderAll();
    announce(`${SORTS[key].label} 기준 ${state.sortDir === 'asc' ? '오름차순' : '내림차순'}으로 정렬했습니다.`);
  }));

  el.pagination.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-page]');
    if (!link) return;
    event.preventDefault();
    state.page = Number(link.dataset.page);
    renderAll();
    announce(el.ordersSummary.textContent);
    // 초점은 누른 링크 자리에 둔다. 그 링크가 사라졌으면 현재 페이지 링크로 옮긴다
    const same = el.pagination.querySelector(`a[data-page="${link.dataset.page}"]`)
      || el.pagination.querySelector('a[aria-current="page"]');
    if (same) same.focus();
  });

  el.ordersEmpty.addEventListener('click', (event) => {
    if (!event.target.closest('[data-action="clear-filter"]')) return;
    state.status = 'all';
    state.page = 1;
    renderAll();
    announce(`상태 필터를 해제했습니다. ${el.ordersSummary.textContent}`);
    el.statusButtons[0].focus();
  });

  el.error.addEventListener('click', (event) => {
    if (!event.target.closest('[data-action="retry"]')) return;
    if (state.loading) return;
    el.refresh.focus(); // 눌렀던 버튼이 사라지므로 초점을 새로 고침 버튼에 둔다
    clearError();
    load({ delay: DELAY_REFRESH, reason: '다시 시도: ' });
  });

  // 창 너비가 바뀌면 그래프를 다시 그리고, 페이지 번호 개수를 화면 너비에 맞춘다(전체 페이지 수는 그대로)
  let resizeFrame = 0;
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => { if (currentBuckets && !el.content.hidden) drawChart(currentBuckets); });
    }).observe(el.chartCanvas);
  }
  const onWidthChange = () => { if (state.data && !el.content.hidden && !el.ordersTableWrap.hidden) renderPagination(Math.ceil(visibleOrders().length / PAGE_SIZE)); };
  if (wideQuery.addEventListener) wideQuery.addEventListener('change', onWidthChange);

  /* ---------- 시작: 첫 화면은 지연 없이 바로 채운다 ---------- */
  readUrl();
  state.data = buildResponse(state.days, 'normal', Date.now());
  state.lastOk = state.data.now;
  renderAll();
  renderUpdated();
})();
