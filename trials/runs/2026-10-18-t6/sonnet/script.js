/* 모아몰 회원가입 — 서버 대신 이 파일 안의 가짜 응답을 쓴다. */
(function () {
  'use strict';

  var SITE_NAME = '모아몰';
  var TITLE_BASE = '회원가입 | ' + SITE_NAME;
  var SPINNER_AFTER = 1000; // 처리가 이 시간(ms)을 넘으면 스피너를 보인다(STATE-002)

  /* ---------- 가짜 서버 ---------- */
  var FAKE_TAKEN_IDS = ['admin', 'test', 'user01', 'moamall', 'hong1234'];
  var FAKE_CHECK_DELAY = 1400;
  var FAKE_SIGNUP_DELAY = 1800;

  function fakeCheckUserId(userid) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({ available: FAKE_TAKEN_IDS.indexOf(userid) === -1 });
      }, FAKE_CHECK_DELAY);
    });
  }

  function fakeSignup(payload) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({ ok: true, memberNo: 'M' + String(payload.userid.length).padStart(4, '0') });
      }, FAKE_SIGNUP_DELAY);
    });
  }

  /* ---------- 요소 ---------- */
  function $(id) { return document.getElementById(id); }

  var form = $('signup-form');
  var summarySlot = $('error-summary-slot');
  var el = {
    userid: $('userid'),
    useridCheck: $('userid-check'),
    useridStatus: $('userid-status'),
    password: $('password'),
    passwordConfirm: $('password-confirm'),
    confirmStatus: $('password-confirm-status'),
    name: $('name'),
    phone: $('phone'),
    email: $('email'),
    year: $('birth-year'),
    month: $('birth-month'),
    day: $('birth-day'),
    all: $('terms-all'),
    submit: $('submit'),
    submitStatus: $('submit-status')
  };
  var termGroups = {
    service: { yes: $('terms-service-yes'), no: $('terms-service-no') },
    privacy: { yes: $('terms-privacy-yes'), no: $('terms-privacy-no') },
    marketing: { yes: $('terms-marketing-yes'), no: $('terms-marketing-no') }
  };

  /* ---------- 상태 ---------- */
  // 중복 확인 결과: { value, available } — 아이디를 고치면 무효가 된다.
  var idCheck = null;
  var idChecking = false;
  var submitting = false;

  /* ---------- 오류 표시 도우미 ---------- */
  // 필드별 오류 표시 대상. inputs 의 aria-describedby 기본값은 data-base-describedby 에 보관한다.
  var FIELDS = {
    userid: { root: 'userid-field', rootClass: 'text-field--error', msg: 'userid-error', inputs: [el.userid], focus: el.userid },
    password: { root: 'password-field', rootClass: 'text-field--error', msg: 'password-error', inputs: [el.password], focus: el.password },
    passwordConfirm: { root: 'password-confirm-field', rootClass: 'text-field--error', msg: 'password-confirm-error', inputs: [el.passwordConfirm], focus: el.passwordConfirm },
    name: { root: 'name-field', rootClass: 'text-field--error', msg: 'name-error', inputs: [el.name], focus: el.name },
    phone: { root: 'phone-field', rootClass: 'text-field--error', msg: 'phone-error', inputs: [el.phone], focus: el.phone },
    email: { root: 'email-field', rootClass: 'text-field--error', msg: 'email-error', inputs: [el.email], focus: el.email },
    birth: { root: 'birth-field', rootClass: 'date-input--error', msg: 'birth-error', inputs: [el.year, el.month, el.day], focus: el.year },
    service: { root: 'terms-service-field', rootClass: 'radio-group--error', msg: 'terms-service-error', inputs: [], group: true, focus: termGroups.service.yes },
    privacy: { root: 'terms-privacy-field', rootClass: 'radio-group--error', msg: 'terms-privacy-error', inputs: [], group: true, focus: termGroups.privacy.yes }
  };

  Object.keys(FIELDS).forEach(function (key) {
    var f = FIELDS[key];
    f.rootEl = $(f.root);
    f.msgEl = $(f.msg);
    f.inputs.forEach(function (input) {
      input.setAttribute('data-base-describedby', input.getAttribute('aria-describedby') || '');
    });
  });

  function setFieldError(key, message) {
    var f = FIELDS[key];
    f.msgEl.textContent = message;
    f.msgEl.hidden = false;
    f.rootEl.classList.add(f.rootClass);
    f.inputs.forEach(function (input) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', (input.getAttribute('data-base-describedby') + ' ' + f.msg).trim());
    });
    if (f.group) { f.rootEl.setAttribute('aria-invalid', 'true'); }
  }

  function clearFieldError(key) {
    var f = FIELDS[key];
    if (f.msgEl.hidden) { return; }
    f.msgEl.hidden = true;
    f.msgEl.textContent = '';
    f.rootEl.classList.remove(f.rootClass);
    f.inputs.forEach(function (input) {
      input.removeAttribute('aria-invalid');
      input.setAttribute('aria-describedby', input.getAttribute('data-base-describedby'));
    });
    if (f.group) { f.rootEl.removeAttribute('aria-invalid'); }
    removeSummaryItem(key);
  }

  /* ---------- 오류 요약 ---------- */
  var summaryEl = null;

  function showSummary(errors) {
    removeSummary();
    summaryEl = document.createElement('section');
    summaryEl.className = 'error-summary';
    summaryEl.setAttribute('aria-labelledby', 'error-summary-title');
    summaryEl.tabIndex = -1;

    var title = document.createElement('h2');
    title.className = 'error-summary__title';
    title.id = 'error-summary-title';
    title.textContent = '입력 내용을 확인해 주세요. 고쳐야 할 항목이 ' + errors.length + '개 있습니다.';
    summaryEl.appendChild(title);

    var list = document.createElement('ul');
    list.className = 'error-summary__list';
    errors.forEach(function (err) {
      var li = document.createElement('li');
      li.setAttribute('data-key', err.key);
      var a = document.createElement('a');
      a.className = 'error-summary__link';
      a.href = '#' + FIELDS[err.key].focus.id;
      a.textContent = err.message;
      li.appendChild(a);
      list.appendChild(li);
    });
    summaryEl.appendChild(list);
    summarySlot.appendChild(summaryEl);

    document.title = '오류: ' + TITLE_BASE; // FORM-079
    summaryEl.focus();                      // FORM-077
  }

  function removeSummary() {
    summarySlot.textContent = '';
    summaryEl = null;
    document.title = TITLE_BASE;
  }

  function removeSummaryItem(key) {
    if (!summaryEl) { return; }
    var li = summaryEl.querySelector('li[data-key="' + key + '"]');
    if (li) { li.parentNode.removeChild(li); }
    if (!summaryEl.querySelector('li')) { removeSummary(); }
  }

  // 링크를 누르면 해당 입력으로 초점을 옮긴다(주소 해시는 바꾸지 않는다).
  summarySlot.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a.error-summary__link');
    if (!link) { return; }
    event.preventDefault();
    var target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) { target.focus(); }
  });

  /* ---------- 검증 ---------- */
  var USERID_RE = /^[a-z][a-z0-9]{3,19}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^01[016789][0-9]{7,8}$/;

  function isUserIdFormatOk(value) { return USERID_RE.test(value); }

  function passwordRules(value) {
    return {
      length: value.length >= 8 && value.length <= 20,
      mix: /[A-Za-z]/.test(value) && /[0-9]/.test(value),
      space: value.length > 0 && !/\s/.test(value)
    };
  }

  function digitsOnly(value) { return value.replace(/[\s-]/g, ''); }

  function daysInMonth(year, month) { return new Date(year, month, 0).getDate(); }

  function validate() {
    var errors = [];
    function add(key, message) { errors.push({ key: key, message: message }); }

    var userid = el.userid.value;
    if (userid === '') {
      add('userid', '아이디를 입력해 주세요. 영문 소문자로 시작하는 4자 이상 20자 이하의 영문 소문자·숫자로 입력합니다.');
    } else if (!isUserIdFormatOk(userid)) {
      add('userid', '아이디 형식이 맞지 않습니다. 영문 소문자로 시작하는 4자 이상 20자 이하의 영문 소문자·숫자로 입력해 주세요.');
    } else if (!idCheck || idCheck.value !== userid) {
      add('userid', '아이디 중복 확인을 해 주세요. 입력란 옆의 \'중복 확인\' 버튼을 누르면 사용할 수 있는지 알려 드립니다.');
    } else if (!idCheck.available) {
      add('userid', '이미 사용 중인 아이디입니다. 다른 아이디를 입력한 뒤 \'중복 확인\'을 눌러 주세요.');
    }

    var pw = el.password.value;
    if (pw === '') {
      add('password', '비밀번호를 입력해 주세요. 8자 이상 20자 이하로, 영문과 숫자를 각각 1자 이상 넣고 공백은 쓰지 않습니다.');
    } else {
      var r = passwordRules(pw);
      if (!(r.length && r.mix && r.space)) {
        add('password', '비밀번호가 규칙에 맞지 않습니다. 8자 이상 20자 이하로, 영문과 숫자를 각각 1자 이상 넣고 공백은 빼 주세요.');
      }
    }

    var pc = el.passwordConfirm.value;
    if (pc === '') {
      add('passwordConfirm', '비밀번호 확인을 입력해 주세요. 위에 입력한 비밀번호를 한 번 더 입력하면 됩니다.');
    } else if (pc !== pw) {
      add('passwordConfirm', '비밀번호 확인이 비밀번호와 같지 않습니다. 같은 비밀번호를 다시 입력해 주세요.');
    }

    if (el.name.value.trim() === '') {
      add('name', '이름을 입력해 주세요.');
    }

    var phone = el.phone.value;
    if (phone.trim() === '') {
      add('phone', '휴대전화 번호를 입력해 주세요. 010-1234-5678처럼 숫자만 또는 하이픈을 넣어 입력합니다.');
    } else if (!PHONE_RE.test(digitsOnly(phone.trim()))) {
      add('phone', '휴대전화 번호 형식이 맞지 않습니다. 010-1234-5678처럼 010으로 시작하는 번호를 숫자만 또는 하이픈을 넣어 입력해 주세요.');
    }

    var email = el.email.value.trim();
    if (email === '') {
      add('email', '이메일을 입력해 주세요. 예: hong@example.com');
    } else if (!EMAIL_RE.test(email)) {
      add('email', '이메일 주소 형식이 맞지 않습니다. @ 앞뒤와 도메인을 모두 넣어 hong@example.com 형식으로 입력해 주세요.');
    }

    var birthMsg = validateBirth();
    if (birthMsg) { add('birth', birthMsg); }

    if (!termGroups.service.yes.checked) {
      add('service', '이용약관 동의 여부에서 \'동의함\'을 선택해 주세요. 필수 약관에 동의해야 가입할 수 있습니다.');
    }
    if (!termGroups.privacy.yes.checked) {
      add('privacy', '개인정보 수집·이용 동의 여부에서 \'동의함\'을 선택해 주세요. 필수 약관에 동의해야 가입할 수 있습니다.');
    }

    return errors;
  }

  function validateBirth() {
    var y = el.year.value.trim();
    var m = el.month.value.trim();
    var d = el.day.value.trim();
    if (y === '' || m === '' || d === '') {
      return '생년월일을 입력해 주세요. 1990년 3월 7일이면 년에 1990, 월에 3, 일에 7을 입력합니다.';
    }
    if (!/^\d{4}$/.test(y) || !/^\d{1,2}$/.test(m) || !/^\d{1,2}$/.test(d)) {
      return '생년월일 형식이 맞지 않습니다. 년은 숫자 4자리, 월과 일은 숫자 1~2자리로 입력해 주세요.';
    }
    var yn = Number(y), mn = Number(m), dn = Number(d);
    if (yn < 1900 || mn < 1 || mn > 12 || dn < 1 || dn > daysInMonth(yn, mn)) {
      return '생년월일이 실제 있는 날짜가 아닙니다. 1900년 이후의 날짜를 확인해 다시 입력해 주세요.';
    }
    var birth = new Date(yn, mn - 1, dn);
    if (birth.getTime() > Date.now()) {
      return '생년월일이 오늘 이후 날짜입니다. 지난 날짜를 입력해 주세요.';
    }
    return '';
  }

  /* ---------- 아이디 중복 확인 ---------- */
  var spinnerTimers = new WeakMap();

  // 상태 영역(role=status)은 미리 DOM 에 있고 내용만 바꾼다. 스피너는 1초 넘게 걸릴 때만 붙인다.
  function showBusy(statusEl, text) {
    clearStatus(statusEl);
    statusEl.className = 'status-line spinner spinner--small';
    var label = document.createElement('span');
    label.className = 'spinner__text';
    label.id = statusEl.id + '-text';
    label.textContent = text;
    statusEl.appendChild(label);
    var timer = setTimeout(function () {
      var bar = document.createElement('progress');
      bar.className = 'spinner__indicator';
      bar.setAttribute('aria-labelledby', label.id);
      statusEl.insertBefore(bar, label);
    }, SPINNER_AFTER);
    spinnerTimers.set(statusEl, timer);
  }

  function clearStatus(statusEl) {
    var timer = spinnerTimers.get(statusEl);
    if (timer) { clearTimeout(timer); spinnerTimers.delete(statusEl); }
    statusEl.textContent = '';
    statusEl.className = 'status-line spinner spinner--small';
  }

  function showResult(statusEl, text, tone) {
    clearStatus(statusEl);
    statusEl.className = 'status-line spinner spinner--small' + (tone ? ' status-line--' + tone : '');
    statusEl.textContent = text;
  }

  function resetIdCheck() {
    idCheck = null;
    if (!idChecking) { clearStatus(el.useridStatus); }
  }

  el.userid.addEventListener('input', function () {
    resetIdCheck();
    clearFieldError('userid');
  });

  el.useridCheck.addEventListener('click', function () {
    if (idChecking) { return; } // 처리 중 두 번째 누름은 무시(FORM-013)
    var value = el.userid.value;
    if (!isUserIdFormatOk(value)) {
      showResult(el.useridStatus, '중복 확인 전에 아이디를 형식에 맞게 입력해 주세요. 영문 소문자로 시작하는 4자 이상 20자 이하의 영문 소문자·숫자입니다.', 'bad');
      el.userid.focus();
      return;
    }
    idChecking = true;
    el.useridCheck.setAttribute('aria-disabled', 'true');
    el.useridCheck.textContent = '확인 중';
    showBusy(el.useridStatus, '아이디를 확인하는 중입니다.');

    fakeCheckUserId(value).then(function (res) {
      idChecking = false;
      el.useridCheck.removeAttribute('aria-disabled');
      el.useridCheck.textContent = '중복 확인';
      if (el.userid.value !== value) { // 확인하는 사이 아이디를 고쳤다
        clearStatus(el.useridStatus);
        return;
      }
      idCheck = { value: value, available: res.available };
      clearFieldError('userid');
      if (res.available) {
        showResult(el.useridStatus, '사용할 수 있는 아이디입니다.', 'ok');
      } else {
        showResult(el.useridStatus, '이미 사용 중인 아이디입니다. 다른 아이디를 입력해 주세요.', 'bad');
      }
    });
  });

  /* ---------- 비밀번호 규칙 안내(입력하는 동안 텍스트만 바꾼다. aria-invalid 는 건드리지 않는다: FORM-080) ---------- */
  var ruleItems = {};
  Array.prototype.forEach.call(document.querySelectorAll('#password-rules li'), function (li) {
    ruleItems[li.getAttribute('data-rule')] = li;
  });

  function updatePasswordRules() {
    var r = passwordRules(el.password.value);
    Object.keys(ruleItems).forEach(function (rule) {
      var li = ruleItems[rule];
      var state = li.querySelector('.rule-list__state');
      var ok = r[rule];
      state.textContent = ok ? '(충족)' : '(아직 충족하지 않음)';
      li.classList.toggle('rule-list__item--met', ok);
    });
  }

  function updateConfirmStatus() {
    var pc = el.passwordConfirm.value;
    var s = el.confirmStatus;
    if (pc === '') {
      s.textContent = '';
      s.className = 'match-status';
    } else if (pc === el.password.value) {
      s.textContent = '비밀번호와 같습니다.';
      s.className = 'match-status match-status--ok';
    } else {
      s.textContent = '비밀번호와 아직 같지 않습니다.';
      s.className = 'match-status';
    }
  }

  el.password.addEventListener('input', function () {
    updatePasswordRules();
    updateConfirmStatus();
    clearFieldError('password');
    clearFieldError('passwordConfirm');
  });
  el.passwordConfirm.addEventListener('input', function () {
    updateConfirmStatus();
    clearFieldError('passwordConfirm');
  });

  [['name', el.name], ['phone', el.phone], ['email', el.email]].forEach(function (pair) {
    pair[1].addEventListener('input', function () { clearFieldError(pair[0]); });
  });
  [el.year, el.month, el.day].forEach(function (input) {
    input.addEventListener('input', function () { clearFieldError('birth'); });
  });

  /* ---------- 약관 동의 ---------- */
  function syncAllFromItems() {
    el.all.checked = ['service', 'privacy', 'marketing'].every(function (k) {
      return termGroups[k].yes.checked;
    });
  }

  // 전체 동의: 켜면 모두 '동의함', 끄면 모두 '동의하지 않음'. 초점은 전체 동의 체크박스에 그대로 둔다(FORM-025).
  el.all.addEventListener('change', function () {
    var agree = el.all.checked;
    Object.keys(termGroups).forEach(function (k) {
      termGroups[k].yes.checked = agree;
      termGroups[k].no.checked = !agree;
    });
    clearFieldError('service');
    clearFieldError('privacy');
  });

  Object.keys(termGroups).forEach(function (k) {
    ['yes', 'no'].forEach(function (v) {
      termGroups[k][v].addEventListener('change', function () {
        syncAllFromItems();
        if (FIELDS[k]) { clearFieldError(k); }
      });
    });
  });

  /* ---------- 작성 중 이탈 경고(STATE-032) ---------- */
  var dirty = false;
  form.addEventListener('input', function () { dirty = true; });
  form.addEventListener('change', function () { dirty = true; });
  window.addEventListener('beforeunload', function (event) {
    if (!dirty) { return; }
    event.preventDefault();
    event.returnValue = '';
  });

  /* ---------- 제출 ---------- */
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (submitting) { return; } // 중복 제출 방지(FORM-013)

    Object.keys(FIELDS).forEach(function (key) { clearFieldError(key); });
    removeSummary();

    var errors = validate();
    if (errors.length > 0) {
      errors.forEach(function (err) { setFieldError(err.key, err.message); });
      showSummary(errors);
      return;
    }

    submitting = true;
    el.submit.setAttribute('aria-disabled', 'true');
    el.submit.textContent = '가입 처리 중';
    showBusy(el.submitStatus, '회원가입을 처리하는 중입니다.');

    var payload = {
      userid: el.userid.value,
      name: el.name.value,
      phone: digitsOnly(el.phone.value.trim()),
      email: el.email.value.trim(),
      marketing: termGroups.marketing.yes.checked
    };

    fakeSignup(payload).then(function () {
      submitting = false;
      showDone(payload);
    });
  });

  // 처리 중에는 버튼을 눌러도 제출되지 않는다(aria-disabled 는 클릭을 막지 않으므로 직접 막는다).
  el.submit.addEventListener('click', function (event) {
    if (submitting) { event.preventDefault(); }
  });

  /* ---------- 가입 완료 화면 ---------- */
  function showDone(payload) {
    dirty = false;
    $('signup-view').hidden = true;
    $('done-userid').textContent = payload.userid;
    $('done-name').textContent = payload.name;
    $('done-email').textContent = payload.email;
    $('done-marketing').textContent = payload.marketing ? '동의함' : '동의하지 않음';
    $('done-lead').textContent = payload.name + '님, ' + SITE_NAME + ' 회원이 되신 것을 환영합니다. 가입한 아이디로 로그인할 수 있습니다.';
    $('done-view').hidden = false;
    document.title = '회원가입 완료 | ' + SITE_NAME;
    window.scrollTo(0, 0);
    $('done-title').focus();
  }
})();
