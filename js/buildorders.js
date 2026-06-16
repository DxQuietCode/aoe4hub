// AOE4 Hub - Build Orders
// Charge apres data.js et main.js

var _boFCiv = 'all';
var _boFStyle = 'all';
var _boCurr = null;
var _boIdx = -1;
var _boHandle = null;
var _boRemain = 0;
var _boPaused = false;
var _boDurOvr = null;
var _boSCls = {rush:'bo-sty-rush',chateau:'bo-sty-chateau',boom:'bo-sty-boom',harass:'bo-sty-harass',imperial:'bo-sty-imperial'};

function _boStepDur(step) { return _boDurOvr !== null ? _boDurOvr : (step.dur || 60); }
function setBOCiv(val) { _boFCiv = val; _renderBOList(); }
function setBOStyle(style, btn) {
  _boFStyle = style;
  document.querySelectorAll('.fbtn-bostyle').forEach(function(b) { b.classList.toggle('active', b.dataset.bostyle === style); });
  _renderBOList();
}
function _renderBOList() {
  var list = document.getElementById('bo-list');
  if (!list) return;
  var filtered = BUILD_ORDERS.filter(function(bo) {
    return (_boFCiv === 'all' || bo.civ === _boFCiv) && (_boFStyle === 'all' || bo.style === _boFStyle);
  });
  if (!filtered.length) { list.innerHTML = '<div class="bo-empty">Aucun build order pour ces filtres.</div>'; return; }
  list.innerHTML = filtered.map(function(bo) {
    var meta = CIV_FLAG_MAP[bo.civ] || {};
    var sc = _boSCls[bo.style] || '';
    var isAct = _boCurr && _boCurr.id === bo.id ? ' bo-card-active' : '';
    return '<div class="bo-card' + isAct + '" onclick="openBO(\'' + bo.id + '\')">' +
      '<div class="bo-card-head"><span class="bo-flag">' + (meta.flag || '') + '</span>' +
      '<span class="bo-card-title">' + bo.title + '</span></div>' +
      '<div class="bo-card-meta"><span class="bo-sty-badge ' + sc + '">' + (bo.styleLabel || bo.style) + '</span>' +
      '<span class="bo-diff-tag">' + bo.diff + '</span>' +
      '<span class="bo-diff-tag">' + (meta.name || bo.civ) + '</span></div>' +
      '<div class="bo-card-desc">' + bo.desc + '</div>' +
      '<div class="bo-step-count">&#9889; ' + bo.steps.length + ' etapes</div></div>';
  }).join('');
}
function openBO(id) {
  var bo = BUILD_ORDERS.find(function(b) { return b.id === id; });
  if (!bo) return;
  _boStopTimer(); _boCurr = bo; _boIdx = -1; _boRemain = 0; _boPaused = false;
  _renderBOList(); _renderBOSection();
  var sec = document.getElementById('bo-timer-section');
  if (sec) { sec.style.display = 'block'; setTimeout(function() { sec.scrollIntoView({behavior:'smooth',block:'start'}); }, 50); }
}
function closeBO() {
  _boStopTimer(); _boCurr = null; _boIdx = -1;
  var sec = document.getElementById('bo-timer-section');
  if (sec) sec.style.display = 'none';
  _renderBOList();
}
function _boStopTimer() { clearInterval(_boHandle); _boHandle = null; }
function boStartPause() {
  if (!_boCurr) return;
  if (_boHandle && !_boPaused) { _boPaused = true; _refreshBOCtrls(); return; }
  if (_boPaused) { _boPaused = false; _refreshBOCtrls(); return; }
  if (_boIdx === -1) { _boIdx = 0; _boRemain = _boStepDur(_boCurr.steps[0]); _renderBOStepsCol(); }
  _boPaused = false; _boStopTimer();
  _boHandle = setInterval(function() {
    if (_boPaused) return;
    _boRemain--;
    if (_boRemain <= 0) { _boAutoNext(); return; }
    _refreshBOCountdown();
  }, 1000);
  _refreshBOCtrls(); _refreshBOCountdown();
}
function resetBOTimer() { _boStopTimer(); _boIdx = -1; _boRemain = 0; _boPaused = false; _renderBOSection(); }
function _boAutoNext() {
  if (!_boCurr) return;
  if (_boIdx < _boCurr.steps.length - 1) {
    _boIdx++; _boRemain = _boStepDur(_boCurr.steps[_boIdx]);
    _renderBOStepsCol(); _refreshBOCountdown(); _refreshBOCtrls();
  } else {
    _boStopTimer(); _boHandle = null;
    var col = document.getElementById('bo-timer-col');
    if (col) col.innerHTML = '<div class="bo-complete"><div class="bo-complete-icon">&#10003;</div><div class="bo-complete-txt">Build Order termine !</div><div class="bo-complete-sub">Bonne chance sur le terrain.</div></div>' +
      '<div class="bo-ctrls" style="margin-top:1rem;"><button class="bo-btn primary" onclick="resetBOTimer()">&#8635; Recommencer</button><button class="bo-btn" onclick="closeBO()">Fermer</button></div>';
  }
}
function boNextStep() {
  if (!_boCurr) return;
  var nxt = _boIdx < 0 ? 0 : _boIdx + 1;
  if (nxt >= _boCurr.steps.length) return;
  _boIdx = nxt; _boRemain = _boStepDur(_boCurr.steps[_boIdx]);
  _renderBOStepsCol(); _refreshBOCountdown(); _refreshBOCtrls();
}
function boPrevStep() {
  if (!_boCurr || _boIdx <= 0) return;
  _boIdx--; _boRemain = _boStepDur(_boCurr.steps[_boIdx]);
  _renderBOStepsCol(); _refreshBOCountdown(); _refreshBOCtrls();
}
function jumpBOStep(idx) {
  if (!_boCurr || idx < 0 || idx >= _boCurr.steps.length) return;
  _boIdx = idx; _boRemain = _boStepDur(_boCurr.steps[idx]);
  _renderBOStepsCol(); _refreshBOCountdown(); _refreshBOCtrls();
}
function setBODur(secs, btn) {
  _boDurOvr = secs;
  document.querySelectorAll('.bo-dur-btn').forEach(function(b) { b.classList.toggle('active', parseInt(b.dataset.dur,10) === secs); });
  if (_boCurr && _boIdx >= 0) { _boRemain = secs; _refreshBOCountdown(); }
}
function resetBODur() {
  _boDurOvr = null;
  document.querySelectorAll('.bo-dur-btn').forEach(function(b) { b.classList.remove('active'); });
  if (_boCurr && _boIdx >= 0) { _boRemain = _boCurr.steps[_boIdx].dur || 60; _refreshBOCountdown(); }
}
function _renderBOSection() {
  var sec = document.getElementById('bo-timer-section');
  if (!sec || !_boCurr) return;
  var bo = _boCurr; var meta = CIV_FLAG_MAP[bo.civ] || {}; var sc = _boSCls[bo.style] || '';
  sec.innerHTML =
    '<div class="bo-ts-hdr">' +
      '<div style="display:flex;align-items:center;gap:.7rem;">' +
        '<span style="font-size:1.4rem;">' + (meta.flag || '') + '</span>' +
        '<div><div class="bo-ts-title">' + bo.title + '</div>' +
        '<div style="margin-top:3px;display:flex;gap:.4rem;">' +
          '<span class="bo-sty-badge ' + sc + '">' + (bo.styleLabel || bo.style) + '</span>' +
          '<span class="bo-diff-tag">' + bo.diff + '</span>' +
        '</div></div>' +
      '</div>' +
      '<button class="bo-ts-close" onclick="closeBO()">FERMER X</button>' +
    '</div>' +
    '<div class="bo-ts-body">' +
      '<div class="bo-steps-col" id="bo-steps-col">' + _renderBOStepsHTML() + '</div>' +
      '<div class="bo-timer-col" id="bo-timer-col">' + _renderBOTimerHTML() + '</div>' +
    '</div>';
}
function _renderBOStepsHTML() {
  if (!_boCurr) return '';
  var checkSVG = '<svg class="bo-check-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,12 14,4" class="bo-check-path"/></svg>';
  return _boCurr.steps.map(function(s, i) {
    var cls = i === _boIdx ? ' bo-step-cur' : (i < _boIdx ? ' bo-step-done' : '');
    return '<div class="bo-step-row' + cls + '" onclick="jumpBOStep(' + i + ')">' +
      '<span class="bo-step-num">' + (i < _boIdx ? checkSVG : s.n) + '</span>' +
      '<span class="bo-step-vils">' + s.vils + 'v</span>' +
      '<span class="bo-step-res">' + s.res + '</span>' +
      '<span class="bo-step-txt">' + s.action + '</span>' +
    '</div>';
  }).join('');
}
function _renderBOTimerHTML() {
  if (!_boCurr) return '';
  var step = _boIdx >= 0 ? _boCurr.steps[_boIdx] : null;
  var secs = _boRemain; var total = step ? _boStepDur(step) : 60;
  var pct = step ? Math.min(100, Math.round((secs / total) * 100)) : 0;
  var urgent = secs <= 10 && _boIdx >= 0;
  var notStarted = _boIdx < 0;
  var startLbl = (_boHandle && !_boPaused) ? '&#9208; Pause' : (_boPaused ? '&#9654; Reprendre' : '&#9654; Demarrer');
  var cdTxt = notStarted ? '--' : String(secs);
  return '<div class="bo-tc-info">' +
    '<div class="bo-tc-step" id="bo-tc-step">' + (notStarted ? 'Appuie sur Demarrer' : ('Etape ' + (_boIdx+1) + ' / ' + _boCurr.steps.length)) + '</div>' +
    '<div class="bo-tc-res" id="bo-tc-res">' + (step ? step.res : '') + '</div>' +
    '<div class="bo-tc-action" id="bo-tc-action">' + (step ? step.action : '') + '</div>' +
  '</div>' +
  '<div class="bo-countdown' + (urgent ? ' urgent' : '') + '" id="bo-countdown">' + cdTxt + '</div>' +
  '<div class="bo-pb"><div class="bo-pb-fill' + (urgent ? ' urgent' : '') + '" id="bo-pb-fill" style="width:' + pct + '%"></div></div>' +
  '<div class="bo-ctrls">' +
    '<button class="bo-btn" id="bo-btn-prev" onclick="boPrevStep()"' + (_boIdx <= 0 ? ' disabled' : '') + '>&#9664; Prec.</button>' +
    '<button class="bo-btn' + ((_boHandle || _boPaused) ? '' : ' primary') + '" id="bo-btn-start" onclick="boStartPause()">' + startLbl + '</button>' +
    '<button class="bo-btn" id="bo-btn-next" onclick="boNextStep()"' + (_boCurr && _boIdx >= _boCurr.steps.length - 1 ? ' disabled' : '') + '>Suiv. &#9654;</button>' +
    '<button class="bo-btn" onclick="resetBOTimer()">&#8635; Reset</button>' +
  '</div>' +
  '<div class="bo-dur-row" id="bo-dur-row">Duree / etape :' +
    '<button class="bo-dur-btn' + (_boDurOvr===30?' active':'') + '" data-dur="30" onclick="setBODur(30,this)">30s</button>' +
    '<button class="bo-dur-btn' + (_boDurOvr===45?' active':'') + '" data-dur="45" onclick="setBODur(45,this)">45s</button>' +
    '<button class="bo-dur-btn' + (_boDurOvr===60?' active':'') + '" data-dur="60" onclick="setBODur(60,this)">60s</button>' +
    '<button class="bo-dur-btn' + (_boDurOvr===90?' active':'') + '" data-dur="90" onclick="setBODur(90,this)">90s</button>' +
    '<button class="bo-dur-btn" onclick="resetBODur()">Auto</button>' +
  '</div>' +
  '<button class="bo-focus-btn" onclick="openBOFocus()" title="Mode focus plein ecran">&#9974; Focus</button>';
}
function _renderBOStepsCol() {
  var col = document.getElementById('bo-steps-col');
  if (col) { col.innerHTML = _renderBOStepsHTML(); var cur = col.querySelector('.bo-step-cur'); if (cur) cur.scrollIntoView({block:'nearest',behavior:'smooth'}); }
}
function _refreshBOCountdown() {
  var step = _boIdx >= 0 && _boCurr ? _boCurr.steps[_boIdx] : null;
  var secs = _boRemain; var total = step ? _boStepDur(step) : 60;
  var pct = step ? Math.min(100, Math.round((secs / total) * 100)) : 0;
  var urgent = secs <= 10 && _boIdx >= 0;
  var notStarted = _boIdx < 0;
  var el;
  el = document.getElementById('bo-countdown');
  if (el) { el.textContent = notStarted ? '--' : String(secs); el.className = 'bo-countdown' + (urgent ? ' urgent' : ''); }
  el = document.getElementById('bo-pb-fill');
  if (el) { el.style.width = pct + '%'; el.className = 'bo-pb-fill' + (urgent ? ' urgent' : ''); }
  el = document.getElementById('bo-tc-step');
  if (el) el.textContent = notStarted ? 'Appuie sur Demarrer' : ('Etape ' + (_boIdx+1) + ' / ' + (_boCurr ? _boCurr.steps.length : 0));
  el = document.getElementById('bo-tc-res');
  if (el) el.textContent = step ? step.res : '';
  el = document.getElementById('bo-tc-action');
  if (el) el.textContent = step ? step.action : '';
}
function _refreshBOCtrls() {
  var btnStart = document.getElementById('bo-btn-start');
  if (btnStart) {
    var lbl = (_boHandle && !_boPaused) ? '&#9208; Pause' : (_boPaused ? '&#9654; Reprendre' : '&#9654; Demarrer');
    btnStart.innerHTML = lbl;
    btnStart.className = 'bo-btn' + ((_boHandle || _boPaused) ? '' : ' primary');
  }
  var btnPrev = document.getElementById('bo-btn-prev');
  if (btnPrev) btnPrev.disabled = _boIdx <= 0;
  var btnNext = document.getElementById('bo-btn-next');
  if (btnNext) btnNext.disabled = !_boCurr || _boIdx >= _boCurr.steps.length - 1;
}

// ── INIT BUILD ORDERS ────────────────────────────────────────────────────────
function initBOPage() {
  var civSel = document.getElementById('bo-civ-filter');
  if (!civSel) return;
  civSel.innerHTML = '<option value="all">Toutes les civilisations</option>';
  var seen = new Set();
  BUILD_ORDERS.forEach(function(bo) {
    if (seen.has(bo.civ)) return;
    seen.add(bo.civ);
    var meta = CIV_FLAG_MAP[bo.civ] || {};
    var opt = document.createElement('option');
    opt.value = bo.civ;
    opt.textContent = (meta.flag || '') + ' ' + (meta.name || bo.civ);
    civSel.appendChild(opt);
  });
  _renderBOList();
}

window.addEventListener('DOMContentLoaded', function() {
  initBOPage();
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var ov = document.getElementById('bo-focus-overlay');
      if (ov && ov.classList.contains('open')) { closeBOFocus(); }
    }
  });
});