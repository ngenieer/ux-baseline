/* 내 알림 설정 — 바닐라 JS (외부 라이브러리 없음) */
(function () {
  'use strict';

  /* ---------- 결과 알림(role="status") ----------
     같은 문구를 연달아 넣으면 화면낭독기가 다시 읽지 않으므로 비운 뒤 다음 프레임에 넣는다.
     자동으로 사라지지 않게 둔다(읽기 시간 제한 없음). */
  function announce(el, message) {
    el.textContent = '';
    window.setTimeout(function () {
      el.textContent = message;
    }, 100);
  }

  function clearStatus(el) {
    el.textContent = '';
  }

  /* ---------- 탭 (WAI-ARIA APG 탭 패턴, 자동 활성화) ---------- */
  var tablist = document.querySelector('[role="tablist"]');
  var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (tab) {
    return document.getElementById(tab.getAttribute('aria-controls'));
  });

  function selectTab(index, moveFocus) {
    tabs.forEach(function (tab, i) {
      var selected = i === index;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (moveFocus) {
      tabs[index].focus();
    }
    try {
      window.history.replaceState(null, '', '#' + tabs[index].id);
    } catch (e) { /* file:// 등에서 실패해도 동작에는 영향 없음 */ }
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      selectTab(i, false);
    });
  });

  tablist.addEventListener('keydown', function (event) {
    var current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    var next = null;
    switch (event.key) {
      case 'ArrowRight': next = (current + 1) % tabs.length; break;
      case 'ArrowLeft': next = (current - 1 + tabs.length) % tabs.length; break;
      case 'Home': next = 0; break;
      case 'End': next = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectTab(next, true);
  });

  // 주소의 #tab-... 로 시작 탭 복원(새로고침·공유 링크)
  var initial = tabs.findIndex(function (tab) {
    return '#' + tab.id === window.location.hash;
  });
  selectTab(initial === -1 ? 0 : initial, false);

  /* ---------- 스위치 ---------- */
  var switches = Array.prototype.slice.call(document.querySelectorAll('input[role="switch"]'));

  function renderSwitchState(input) {
    var label = input.parentElement.querySelector('.switch-state');
    if (label) label.textContent = input.checked ? '켜짐' : '꺼짐';
  }

  switches.forEach(function (input) {
    renderSwitchState(input);
    if (input.getAttribute('aria-disabled') === 'true') {
      // 바꿀 수 없는 스위치: 초점과 안내는 유지하고 상태 변경만 막는다
      input.addEventListener('click', function (event) {
        event.preventDefault();
      });
      return;
    }
    input.addEventListener('change', function () {
      renderSwitchState(input);
      clearStatus(statusTopics);
    });
  });

  /* ---------- 알림 수신 저장 ---------- */
  var formTopics = document.getElementById('form-topics');
  var statusTopics = document.getElementById('status-topics');

  formTopics.addEventListener('submit', function (event) {
    event.preventDefault();
    // 실제 서비스에서는 여기서 서버에 저장 요청을 보낸다.
    announce(statusTopics, '알림 설정을 저장했습니다.');
  });

  /* ---------- 수신 방법 ---------- */
  var formMethods = document.getElementById('form-methods');
  var statusMethods = document.getElementById('status-methods');
  var methodsFieldset = document.getElementById('methods-fieldset');
  var methodsError = document.getElementById('methods-error');
  var methodInputs = Array.prototype.slice.call(formMethods.querySelectorAll('input[name="method"]'));
  var emailCheck = document.getElementById('m-email');
  var emailInput = document.getElementById('email');
  var emailError = document.getElementById('email-error');
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, errorEl, message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input, errorEl) {
    errorEl.textContent = '';
    errorEl.hidden = true;
    input.removeAttribute('aria-invalid');
  }

  function syncEmailRequired() {
    // 이메일을 고르면 주소가 필수가 된다(입력란은 항상 보이게 두어 레이아웃이 바뀌지 않게 한다)
    if (emailCheck.checked) {
      emailInput.setAttribute('aria-required', 'true');
    } else {
      emailInput.removeAttribute('aria-required');
      clearError(emailInput, emailError);
    }
  }

  methodInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      clearStatus(statusMethods);
      if (methodInputs.some(function (i) { return i.checked; })) {
        clearError(methodsFieldset, methodsError);
      }
      syncEmailRequired();
    });
  });

  emailInput.addEventListener('input', function () {
    clearStatus(statusMethods);
    // 오류가 표시된 뒤에만 입력 중 재검사(입력 도중 오류를 먼저 띄우지 않는다)
    if (emailInput.getAttribute('aria-invalid') === 'true') {
      validateEmail();
    }
  });

  function validateEmail() {
    var value = emailInput.value.trim();
    if (!emailCheck.checked && value === '') {
      clearError(emailInput, emailError);
      return true;
    }
    if (emailCheck.checked && value === '') {
      setError(emailInput, emailError, '이메일로 받으려면 이메일 주소를 입력하세요.');
      return false;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError(emailInput, emailError, '이메일 주소 형식이 맞지 않습니다. 예: hong@example.com');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  formMethods.addEventListener('submit', function (event) {
    event.preventDefault();
    clearStatus(statusMethods);

    var firstInvalid = null;

    if (!methodInputs.some(function (i) { return i.checked; })) {
      setError(methodsFieldset, methodsError, '받을 방법을 하나 이상 선택하세요.');
      methodsFieldset.setAttribute('aria-describedby', 'methods-hint methods-error');
      firstInvalid = methodInputs[0];
    } else {
      clearError(methodsFieldset, methodsError);
      methodsFieldset.setAttribute('aria-describedby', 'methods-hint');
    }

    if (!validateEmail() && !firstInvalid) {
      firstInvalid = emailInput;
    }

    if (firstInvalid) {
      // 첫 오류 칸으로 초점 이동 → 연결된 오류 문구가 함께 읽힌다
      firstInvalid.focus();
      return;
    }

    emailInput.value = emailInput.value.trim();
    announce(statusMethods, '알림 설정을 저장했습니다.');
  });

  syncEmailRequired();

  /* ---------- 모든 알림 해지 ---------- */
  var openBtn = document.getElementById('open-unsubscribe');
  var dialog = document.getElementById('unsubscribe-dialog');
  var cancelBtn = document.getElementById('dialog-cancel');
  var confirmBtn = document.getElementById('dialog-confirm');
  var statusUnsub = document.getElementById('status-unsubscribe');

  openBtn.addEventListener('click', function () {
    clearStatus(statusUnsub);
    dialog.showModal();
    cancelBtn.focus(); // 되돌릴 수 없는 동작이므로 기본 초점은 [취소]
  });

  cancelBtn.addEventListener('click', function () {
    dialog.close('cancel');
  });

  confirmBtn.addEventListener('click', function () {
    switches.forEach(function (input) {
      if (input.getAttribute('aria-disabled') === 'true') return; // 재난 문자는 유지
      input.checked = false;
      renderSwitchState(input);
    });
    clearStatus(statusTopics);
    dialog.close('confirm');
  });

  // Esc·취소·해지 모두 여기로 모인다: 초점을 연 버튼으로 되돌린다
  dialog.addEventListener('close', function () {
    openBtn.focus();
    if (dialog.returnValue === 'confirm') {
      announce(statusUnsub, '모든 알림을 해지했습니다.');
    }
    dialog.returnValue = '';
  });

  // 대화상자 바깥(배경) 클릭은 취소로 처리
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) {
      var r = dialog.getBoundingClientRect();
      var inside = event.clientX >= r.left && event.clientX <= r.right &&
        event.clientY >= r.top && event.clientY <= r.bottom;
      if (!inside) dialog.close('cancel');
    }
  });
})();
