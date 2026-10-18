/* 내 알림 설정 — 바닐라 JS. 컴포넌트 동작은 ux-baseline 규격(tabs, accordion, modal, toast)을 따른다. */
(function () {
  'use strict';

  /* ---------- 탭: 로빙 tabindex + 자동 활성화 (components/tabs) ---------- */
  function initTabs(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));

    function select(tab, moveFocus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        if (selected) {
          t.removeAttribute('tabindex');
        } else {
          t.setAttribute('tabindex', '-1');
        }
        panel.hidden = !selected;
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        select(tab, false);
      });
      tab.addEventListener('keydown', function (event) {
        var next = null;
        if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
        else if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
        else if (event.key === 'Home') next = tabs[0];
        else if (event.key === 'End') next = tabs[tabs.length - 1];
        if (next) {
          event.preventDefault();
          select(next, true);
        }
      });
    });

    return { select: select, tabs: tabs };
  }

  /* ---------- 아코디언 (components/accordion): 초점은 버튼에 그대로 둔다 ---------- */
  function initAccordion(root) {
    root.querySelectorAll('.accordion__trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        document.getElementById(trigger.getAttribute('aria-controls')).hidden = expanded;
      });
    });
  }

  /* ---------- 토스트 (components/toast): role=status 영역은 처음부터 DOM 에 있다 ---------- */
  var TOAST_VISIBLE_MS = 3000; // 표시 시간(정보형 2~3초). 애니메이션 지속 시간이 아니다 — 전환은 CSS 모션 토큰이 정한다.
  var toastRegion = document.getElementById('toast');
  var toastTimer = null;

  function removeToastMessage(message) {
    var duration = parseFloat(getComputedStyle(message).transitionDuration) || 0;
    message.classList.add('toast__message--leaving');
    if (duration === 0) {
      message.remove();
      return;
    }
    message.addEventListener('transitionend', function () {
      message.remove();
    }, { once: true });
  }

  function showToast(text) {
    var message = toastRegion.querySelector('.toast__message');
    if (!message) {
      message = document.createElement('p');
      message.className = 'toast__message';
      toastRegion.appendChild(message);
    }
    message.classList.remove('toast__message--leaving');
    message.textContent = text; // 이미 있으면 텍스트만 바꾼다 — 동시에 1개만 표시
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      removeToastMessage(message);
    }, TOAST_VISIBLE_MS);
  }

  /* ---------- 저장 상태 표시: 토스트가 사라져도 결과를 화면에서 확인할 수 있게 한다 (CF-030) ---------- */
  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function markSaved(stateEl, prefix) {
    var now = new Date();
    var isoDate = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    var hm = pad(now.getHours()) + ':' + pad(now.getMinutes()); // 24시각제 (COPY-057)
    var shown = now.getFullYear() + '. ' + (now.getMonth() + 1) + '. ' + now.getDate() + '. ' + hm; // COPY-056
    var time = document.createElement('time');
    time.dateTime = isoDate + 'T' + hm;
    time.textContent = shown;
    stateEl.textContent = prefix + ' ';
    stateEl.appendChild(time);
  }

  /* ---------- 알림 수신 폼 ---------- */
  var topicsForm = document.getElementById('form-topics');
  var topicsState = document.getElementById('save-state-topics');

  topicsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    markSaved(topicsState, '마지막 저장:');
    showToast('알림 설정을 저장했습니다');
  });

  /* ---------- 수신 방법 폼: 제출할 때만 오류를 표시한다 (FORM-080) ---------- */
  var channelsForm = document.getElementById('form-channels');
  var channelsState = document.getElementById('save-state-channels');
  var channelGroup = document.getElementById('channel-group');
  var channelError = document.getElementById('channel-error');
  var emailChannel = document.getElementById('channel-email');
  var emailField = document.getElementById('email-field');
  var emailInput = document.getElementById('email');
  var emailError = document.getElementById('email-error');
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setChannelError(text) {
    if (text) {
      channelError.textContent = text;
      channelError.hidden = false;
      channelGroup.classList.add('checkbox-group--error');
      channelGroup.setAttribute('aria-describedby', 'channel-hint channel-error');
    } else {
      channelError.textContent = '';
      channelError.hidden = true;
      channelGroup.classList.remove('checkbox-group--error');
      channelGroup.setAttribute('aria-describedby', 'channel-hint');
    }
  }

  function setEmailError(text) {
    if (text) {
      emailError.textContent = text;
      emailError.hidden = false;
      emailField.classList.add('text-field--error');
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.setAttribute('aria-describedby', 'email-hint email-error');
    } else {
      emailError.textContent = '';
      emailError.hidden = true;
      emailField.classList.remove('text-field--error');
      emailInput.removeAttribute('aria-invalid');
      emailInput.setAttribute('aria-describedby', 'email-hint');
    }
  }

  channelsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var checked = channelsForm.querySelectorAll('input[name="channel"]:checked');
    var firstInvalid = null;

    if (checked.length === 0) {
      setChannelError('알림을 받을 방법을 1개 이상 선택해 주세요. 모든 알림을 끄려면 화면 아래 모든 알림 해지 버튼을 눌러 주세요.');
      firstInvalid = channelsForm.querySelector('input[name="channel"]');
    } else {
      setChannelError('');
    }

    var email = emailInput.value.trim();
    if (emailChannel.checked && email === '') {
      setEmailError('이메일 주소를 입력해 주세요. 이메일로 알림을 받으려면 주소가 필요합니다.');
      firstInvalid = firstInvalid || emailInput;
    } else if (email !== '' && !EMAIL_PATTERN.test(email)) {
      setEmailError('이메일 주소 형식이 맞지 않습니다. @ 앞뒤를 모두 입력해 주세요. 예: hong@example.com');
      firstInvalid = firstInvalid || emailInput;
    } else {
      setEmailError('');
    }

    if (firstInvalid) {
      firstInvalid.focus(); // 입력값은 지우지 않는다 (FORM-016)
      return;
    }

    markSaved(channelsState, '마지막 저장:');
    showToast('알림 설정을 저장했습니다');
  });

  /* ---------- 모든 알림 해지 확인 대화상자 (components/modal) ---------- */
  var modal = document.getElementById('revoke-modal');
  var openButton = document.getElementById('revoke-open');
  var confirmButton = document.getElementById('revoke-confirm');

  openButton.addEventListener('click', function () {
    modal.showModal(); // 모달 밖은 브라우저가 inert 로 만든다. 초점은 autofocus 가 있는 취소 버튼으로 간다.
  });

  modal.querySelectorAll('[data-modal-cancel]').forEach(function (button) {
    button.addEventListener('click', function () {
      modal.close('cancel'); // 닫기(X)·취소·Esc 는 같은 동작: 아무것도 바꾸지 않는다 (STATE-011)
    });
  });

  modal.addEventListener('close', function () {
    openButton.focus(); // 닫히면 초점을 연 버튼으로 돌려놓는다 (A11Y-015)
    if (modal.returnValue === 'revoke') {
      showToast('모든 알림을 해지했습니다');
    }
    modal.returnValue = '';
  });

  confirmButton.addEventListener('click', function () {
    document.querySelectorAll('input[name="topic"]:not(:disabled), input[name="channel"]').forEach(function (input) {
      input.checked = false;
    });
    setChannelError('');
    setEmailError('');
    markSaved(topicsState, '모든 알림 해지:');
    markSaved(channelsState, '모든 알림 해지:');
    modal.close('revoke');
  });

  /* ---------- 시작 ---------- */
  initTabs(document.querySelector('.tabs'));
  initAccordion(document.querySelector('.accordion'));
})();
