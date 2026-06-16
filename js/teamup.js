// AOE4 Hub - Team-UP
// Charge apres data.js et main.js

// ── ETAT TEAM-UP ─────────────────────────────────────────────────────────────
var tuMode = 2, tuAlly = [], tuEnemy = [], tuPickTarget = 'ally';

function getTeamSize() { return Math.floor(tuMode / 2); }
function setTeamMode(total, btn) {
  tuMode = total;
  document.querySelectorAll('.tu-mode-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  var size = getTeamSize();
  tuAlly = tuAlly.slice(0, size); tuEnemy = tuEnemy.slice(0, size);
  renderSlots(); analyzeTeam();
}
function resetTeamUp() { tuAlly = []; tuEnemy = []; renderSlots(); analyzeTeam(); }

function _slotStyleCls(s) {
  if (s === 'agressif') return 'sty-agressif';
  if (s === 'mixte')    return 'sty-mixte';
  return 'sty-defensif';
}
function _slotStyleLbl(s) {
  if (s === 'agressif') return 'Agressif';
  if (s === 'mixte')    return 'Flexible';
  return 'Defensif';
}
function _slotSpikeCls(s) {
  if (s === 'feodal')   return 'spike-feodal';
  if (s === 'imperial') return 'spike-imperial';
  return 'spike-chateau';
}
function _slotSpikeLbl(s) {
  if (s === 'feodal')   return 'Feodal';
  if (s === 'imperial') return 'Imperial';
  if (s === 'chateau')  return 'Chateau';
  return '';
}

function renderTimingBar() {
  var bar = document.getElementById('tu-timing-bar');
  if (!bar) return;
  if (!tuAlly.length) { bar.style.display = 'none'; return; }
  var phases = tuAlly.map(function(id) { return (CIV_PROFILES[id] || {}).phase || 'mid'; });
  var size = getTeamSize();
  var n = {early:0, mid:0, late:0};
  phases.forEach(function(p) { if (n[p] !== undefined) n[p]++; });
  var pct = function(v) { return Math.round((v / size) * 100); };
  var hint = '';
  if (n.early >= 2)          hint = "Rush agressif - attaquez entre 5 et 8 minutes";
  else if (n.late >= 2)      hint = "Strategie tardive - defendez en early, dominez en imperial";
  else if (n.early && n.late) hint = "Timing incoherent - coordonnez vos montees d'age";
  else                        hint = "Timing equilibre - bonne coherence de composition";
  var segs = '';
  if (n.early) segs += '<div class="tu-timing-seg seg-early" style="width:' + pct(n.early) + '%"><span>Early (' + n.early + ')</span></div>';
  if (n.mid)   segs += '<div class="tu-timing-seg seg-mid"   style="width:' + pct(n.mid) + '%"><span>Mid (' + n.mid + ')</span></div>';
  if (n.late)  segs += '<div class="tu-timing-seg seg-late"  style="width:' + pct(n.late) + '%"><span>Late (' + n.late + ')</span></div>';
  if (!segs)   segs = '<div class="tu-timing-seg seg-mid" style="width:100%"><span>-</span></div>';
  bar.style.display = 'block';
  bar.innerHTML =
    '<div class="tu-timing-label">Timing de composition</div>' +
    '<div class="tu-timing-track">' + segs + '</div>' +
    '<div class="tu-timing-hint">' + hint + '</div>';
}

function renderSlots() {
  var size = getTeamSize();
  ['ally','enemy'].forEach(function(side) {
    var arr = side === 'ally' ? tuAlly : tuEnemy;
    var c  = document.getElementById('tu-' + side + '-slots');
    var sz = document.getElementById('tu-' + side + '-size');
    var ab = document.getElementById('tu-' + side + '-add');
    if (!c) return;
    sz.textContent = arr.length + ' / ' + size + ' joueur' + (size > 1 ? 's' : '');
    ab.style.display = arr.length < size ? 'block' : 'none';
    c.innerHTML = Array.from({length: size}, function(_, i) {
      var id = arr[i];
      if (id) {
        var m = CIV_FLAG_MAP[id] || {flag:'⚔',name:id};
        var pr = CIV_PROFILES[id] || {};
        var styleBadge = pr.style ? '<span class="tu-slot-badge ' + _slotStyleCls(pr.style) + '">' + _slotStyleLbl(pr.style) + '</span>' : '';
        var spkLbl = _slotSpikeLbl(pr.spike || '');
        var spikeBadge = spkLbl ? '<span class="tu-slot-badge ' + _slotSpikeCls(pr.spike || '') + '">&#9889; ' + spkLbl + '</span>' : '';
        return '<div class="tu-slot filled">' +
          '<span class="tu-slot-num">' + (i+1) + '</span>' +
          '<span class="tu-slot-flag">' + m.flag + '</span>' +
          '<div class="tu-slot-body"><span class="tu-slot-name">' + m.name + '</span>' +
          '<div class="tu-slot-badges">' + styleBadge + spikeBadge + '</div></div>' +
          '<button class="tu-slot-remove" onclick="removeCiv(\'' + side + '\',' + i + ')">x</button>' +
        '</div>';
      }
      return '<div class="tu-slot" onclick="openPicker(\'' + side + '\')">' +
        '<span class="tu-slot-num">' + (i+1) + '</span>' +
        '<span class="tu-slot-flag" style="opacity:.3">⚔️</span>' +
        '<span class="tu-slot-empty">Cliquer pour choisir...</span>' +
      '</div>';
    }).join('');
  });
  renderTimingBar();
}
function removeCiv(side, idx) {
  if (side === 'ally') tuAlly.splice(idx, 1); else tuEnemy.splice(idx, 1);
  renderSlots(); analyzeTeam();
}
function openPicker(side) {
  tuPickTarget = side;
  document.getElementById('tu-picker-title').textContent = side === 'ally' ? "Choisir - Mon equipe" : "Choisir - Equipe adverse";
  document.getElementById('tu-picker-search').value = '';
  document.getElementById('tu-picker').classList.add('open');
  renderPicker();
}
function closePicker() { var p = document.getElementById('tu-picker'); if (p) p.classList.remove('open'); }
function renderPicker() {
  var q = (document.getElementById('tu-picker-search').value || '').toLowerCase();
  var arr = tuPickTarget === 'ally' ? tuAlly : tuEnemy;
  var size = getTeamSize();
  var grid = document.getElementById('tu-picker-grid');
  if (!grid) return;
  grid.innerHTML = ALL_CIVS.filter(function(c) {
    return !q || c.name.toLowerCase().indexOf(q) !== -1 || c.id.indexOf(q) !== -1;
  }).map(function(c) {
    var dis = (arr.indexOf(c.id) !== -1 || (arr.length >= size && arr.indexOf(c.id) === -1)) ? ' disabled' : '';
    var dlc = c.dlc ? '<span class="dlc-tag" style="font-size:.5rem;padding:1px 4px;">' + c.dlc.split(' ')[0] + '</span>' : '';
    return '<div class="tu-picker-civ' + dis + '" onclick="pickCiv(\'' + c.id + '\')">' +
      '<span class="tu-picker-flag">' + c.flag + '</span>' +
      '<span class="tu-picker-name">' + c.name + '</span>' +
      '<span class="tu-picker-diff">' + c.diff + '</span>' + dlc +
    '</div>';
  }).join('');
}
function pickCiv(id) {
  var arr = tuPickTarget === 'ally' ? tuAlly : tuEnemy;
  if (arr.length >= getTeamSize() || arr.indexOf(id) !== -1) return;
  arr.push(id); closePicker(); renderSlots(); analyzeTeam();
}

// ── BUILD ORDER TIMER D'EQUIPE ───────────────────────────────────────────────
var _tbt = { steps:[], idx:-1, handle:null, remain:0, paused:false };
function _tbtStop() { clearInterval(_tbt.handle); _tbt.handle = null; }
function _tbtFmt(s) { return s < 0 ? '0' : String(s); }
function _tbtRenderCol() {
  var step = (_tbt.idx >= 0 && _tbt.idx < _tbt.steps.length) ? _tbt.steps[_tbt.idx] : null;
  var rem = _tbt.remain; var dur = step ? step.dur : 60;
  var pct = step ? Math.min(100, Math.round((rem / dur) * 100)) : 0;
  var urgent = rem <= 10 && _tbt.idx >= 0;
  var running = _tbt.handle !== null && !_tbt.paused;
  var startLbl = running ? 'Pause' : (_tbt.paused ? 'Reprendre' : 'Demarrer');
  var cdTxt = _tbt.idx < 0 ? '--' : _tbtFmt(rem);
  var total = _tbt.steps.length;
  var stepLbl = _tbt.idx < 0 ? 'Appuie sur Demarrer' : ('Etape ' + (_tbt.idx + 1) + ' / ' + total);
  return '<div class="tbt-tc-info">' +
    '<div class="tbt-tc-step" id="tbt-tc-step">' + stepLbl + '</div>' +
    '<div class="tbt-tc-min" id="tbt-tc-min">' + (step ? step.min : '') + '</div>' +
    '<div class="tbt-tc-action" id="tbt-tc-action">' + (step ? step.action : '') + '</div>' +
  '</div>' +
  '<div class="tbt-countdown' + (urgent ? ' urgent' : '') + '" id="tbt-countdown">' + cdTxt + '</div>' +
  '<div class="tbt-pb"><div class="tbt-pb-fill' + (urgent ? ' urgent' : '') + '" id="tbt-pb-fill" style="width:' + pct + '%"></div></div>' +
  '<div class="tbt-ctrls">' +
    '<button class="bo-btn" onclick="tbtPrev()" id="tbt-btn-prev"' + (_tbt.idx <= 0 ? ' disabled' : '') + '>&#9664; Prec.</button>' +
    '<button class="bo-btn' + (running || _tbt.paused ? '' : ' primary') + '" onclick="tbtStart()" id="tbt-btn-start">' + startLbl + '</button>' +
    '<button class="bo-btn" onclick="tbtNext()" id="tbt-btn-next"' + (_tbt.idx >= total - 1 ? ' disabled' : '') + '>Suiv. &#9654;</button>' +
    '<button class="bo-btn" onclick="tbtReset()">&#8635; Reset</button>' +
  '</div>';
}
function _tbtRefreshDisp() {
  var step = _tbt.idx >= 0 ? _tbt.steps[_tbt.idx] : null;
  var rem = _tbt.remain; var dur = step ? step.dur : 60;
  var pct = step ? Math.min(100, Math.round((rem / dur) * 100)) : 0;
  var urgent = rem <= 10 && _tbt.idx >= 0;
  var el;
  el = document.getElementById('tbt-countdown');
  if (el) { el.textContent = _tbt.idx < 0 ? '--' : _tbtFmt(rem); el.className = 'tbt-countdown' + (urgent ? ' urgent' : ''); }
  el = document.getElementById('tbt-pb-fill');
  if (el) { el.style.width = pct + '%'; el.className = 'tbt-pb-fill' + (urgent ? ' urgent' : ''); }
  el = document.getElementById('tbt-tc-step');
  if (el) el.textContent = _tbt.idx < 0 ? 'Appuie sur Demarrer' : ('Etape ' + (_tbt.idx + 1) + ' / ' + _tbt.steps.length);
  el = document.getElementById('tbt-tc-min');
  if (el) el.textContent = step ? step.min : '';
  el = document.getElementById('tbt-tc-action');
  if (el) el.textContent = step ? step.action : '';
}
function _tbtRefreshCtrls() {
  var running = _tbt.handle !== null && !_tbt.paused;
  var el;
  el = document.getElementById('tbt-btn-start');
  if (el) { el.textContent = running ? 'Pause' : (_tbt.paused ? 'Reprendre' : 'Demarrer'); el.className = 'bo-btn' + (running || _tbt.paused ? '' : ' primary'); }
  el = document.getElementById('tbt-btn-prev');
  if (el) el.disabled = _tbt.idx <= 0;
  el = document.getElementById('tbt-btn-next');
  if (el) el.disabled = _tbt.idx >= _tbt.steps.length - 1;
}
function _tbtRefreshSteps() {
  var col = document.getElementById('tbt-steps-col');
  if (!col) return;
  col.querySelectorAll('.tbt-step').forEach(function(row, i) {
    row.classList.toggle('tbt-cur', i === _tbt.idx);
    row.classList.toggle('tbt-done', i < _tbt.idx);
  });
  var cur = col.querySelector('.tbt-cur');
  if (cur) cur.scrollIntoView({block:'nearest', behavior:'smooth'});
}
function tbtStart() {
  if (!_tbt.steps.length) return;
  if (_tbt.handle && !_tbt.paused) { _tbt.paused = true; _tbtRefreshCtrls(); return; }
  if (_tbt.paused) { _tbt.paused = false; _tbtRefreshCtrls(); return; }
  if (_tbt.idx < 0) { _tbt.idx = 0; _tbt.remain = _tbt.steps[0].dur || 60; _tbtRefreshSteps(); }
  _tbt.paused = false; _tbtStop();
  _tbt.handle = setInterval(function() {
    if (_tbt.paused) return;
    _tbt.remain--;
    if (_tbt.remain <= 0) { _tbtAutoNext(); return; }
    _tbtRefreshDisp();
  }, 1000);
  _tbtRefreshCtrls(); _tbtRefreshDisp();
}
function _tbtAutoNext() {
  if (_tbt.idx < _tbt.steps.length - 1) {
    _tbt.idx++; _tbt.remain = _tbt.steps[_tbt.idx].dur || 60;
    _tbtRefreshSteps(); _tbtRefreshDisp(); _tbtRefreshCtrls();
  } else {
    _tbtStop();
    var col = document.getElementById('tbt-timer-col');
    if (col) col.innerHTML = '<div class="bo-complete"><div class="bo-complete-icon">&#10003;</div><div class="bo-complete-txt">Build Order termine !</div></div>' +
      '<div class="tbt-ctrls"><button class="bo-btn primary" onclick="tbtReset()">&#8635; Recommencer</button></div>';
  }
}
function tbtReset() {
  _tbtStop(); _tbt.idx = -1; _tbt.remain = 0; _tbt.paused = false;
  var col = document.getElementById('tbt-timer-col');
  if (col) col.innerHTML = _tbtRenderCol();
  _tbtRefreshSteps();
}
function tbtNext() {
  if (_tbt.idx >= _tbt.steps.length - 1) return;
  _tbt.idx = _tbt.idx < 0 ? 0 : _tbt.idx + 1;
  _tbt.remain = _tbt.steps[_tbt.idx].dur || 60;
  _tbtRefreshSteps(); _tbtRefreshDisp(); _tbtRefreshCtrls();
}
function tbtPrev() {
  if (_tbt.idx <= 0) return;
  _tbt.idx--; _tbt.remain = _tbt.steps[_tbt.idx].dur || 60;
  _tbtRefreshSteps(); _tbtRefreshDisp(); _tbtRefreshCtrls();
}
function tbtJump(i) {
  if (i < 0 || i >= _tbt.steps.length) return;
  _tbt.idx = i; _tbt.remain = _tbt.steps[i].dur || 60;
  _tbtRefreshSteps(); _tbtRefreshDisp(); _tbtRefreshCtrls();
}

// ── ANALYSE D'EQUIPE ─────────────────────────────────────────────────────────
function genCounterSection(ap, ep) {
  if (!ep.length || !ap.length) return '';
  var eRoles = [];
  ep.forEach(function(p) { (p.roles||[]).forEach(function(r){ if(eRoles.indexOf(r)<0) eRoles.push(r); }); });
  var hasCav   = eRoles.indexOf('cavalerie')>=0 || eRoles.indexOf('harass')>=0;
  var hasArch  = eRoles.indexOf('archer')>=0;
  var hasEleph = eRoles.indexOf('elephant')>=0;
  var hasNav   = eRoles.indexOf('naval')>=0;
  var hasSiege = eRoles.indexOf('artillerie')>=0 || eRoles.indexOf('siege')>=0;
  var hasHeal  = eRoles.indexOf('soin')>=0;
  var hasNom   = eRoles.indexOf('nomade')>=0;
  var rows = ap.map(function(p) {
    var recs = [];
    if (hasCav)   recs.push('Piquiers');
    if (hasArch)  recs.push('Cavalerie legere');
    if (hasEleph) { recs.push('Bombardes'); recs.push('Springalds'); }
    if (hasNav)   recs.push('Navires de guerre');
    if (hasSiege) recs.push('Cavalerie rapide (anti-siege)');
    if (hasNom)   recs.push('Infanterie lourde');
    if (hasHeal)  recs.push('Burst DPS - tuer vite');
    var id = p.id;
    if (id==='anglais')    recs.unshift('Longbowmen en kiting');
    if (id==='francais')   recs.unshift('Royal Knights');
    if (id==='mongols')    { recs = recs.filter(function(r){return r!=='Cavalerie legere';}); recs.unshift('Mangudai en kiting'); }
    if (id==='japonais')   recs.unshift('Samurai (bonus vs unites uniques)');
    if (id==='abbasides'||id==='ayyoubides') { if(hasCav) recs.unshift('Chameaux (hard counter cav)'); }
    if (id==='delhi'||id==='tughluq') { if(hasCav) recs.unshift('War Elephant'); }
    if (id==='ottomans')   recs.unshift('Janissaires + Grand Bombard');
    if (id==='byzantins')  { if(hasCav) recs.unshift('Cataphract'); }
    if (id==='hre')        { if(hasCav) recs.unshift('Infanterie + Prelat inspire'); }
    if (id==='rus')        recs.unshift('Streltsy (contre-infanterie)');
    if (id==='mali')       recs.unshift('Musofadi en infiltration');
    if (id==='chine'||id==='zhuxilegacy') { if(hasNav) recs.unshift('Junk + Fire Junk'); }
    var tip = '';
    if (hasEleph) tip = "Ne jamais engager au corps-a-corps - kiting obligatoire";
    else if (hasNom)      tip = "Murs et tours pour ralentir le harass";
    else if (hasCav&&hasArch) tip = "Piquiers devant les archers pour couverture totale";
    var shown = [];
    recs.forEach(function(r){ if(shown.indexOf(r)<0&&shown.length<4) shown.push(r); });
    var html = '<div class="tu-ct-row"><div class="tu-ct-civ"><span>' + (p.flag||'') + '</span><span class="tu-ct-name">' + (p.name||p.id) + '</span></div>';
    html += '<div class="tu-ct-recs">' + shown.map(function(r){return '<span class="tu-ct-unit">' + r + '</span>';}).join('') + '</div>';
    if (tip) html += '<div class="tu-ct-tip">&#9888; ' + tip + '</div>';
    html += '</div>';
    return html;
  }).join('');
  return '<div class="tu-section-title">Contre-strategies</div><div class="tu-ct-section">' + rows + '</div>';
}
function genPhasesSection(ap, ep, syns, phases) {
  if (!ap.length) return '';
  var earlyN = phases.filter(function(p){return p==='early';}).length;
  var lateN  = phases.filter(function(p){return p==='late';}).length;
  var isRush   = earlyN >= Math.ceil(ap.length / 2);
  var isTurtle = lateN  >= Math.ceil(ap.length / 2);
  var ph = { early:[], mid:[], late:[] };
  ap.forEach(function(p) {
    var phase = p.phase || 'mid'; var sty = p.style || 'mixte'; var role = (p.roles || [])[0] || ''; var name = p.name || p.id;
    if (phase==='early'||sty==='agressif')        ph.early.push(name + ' : harass et pression immediate');
    else if (role==='economie'||role==='construction') ph.early.push(name + ' : boom eco - 20+ vils en priorite');
    else                                           ph.early.push(name + ' : eco solide - 16-18 vils avant montee');
    if (phase==='early')                           ph.mid.push(name + ' : continuer pression, ne pas relacher');
    else if (role==='reliques')                    ph.mid.push(name + ' : securiser les reliques en priorite');
    else if (role==='naval')                       ph.mid.push(name + ' : domination navale et routes commerciales');
    else if (sty==='defensif')                     ph.mid.push(name + ' : tenir la ligne, construire les defenses');
    else                                           ph.mid.push(name + ' : monter en Chateau, preparer le push');
    if (phase==='late'||sty==='defensif')          ph.late.push(name + " : Imperial, unites d'elite en avant");
    else if (phase==='early')                      ph.late.push(name + ' : maintien pression ou pivot eco');
    else                                           ph.late.push(name + ' : push decisif avec armee maximale');
  });
  var note = isRush ? "Composition aggressive - attaque coordonnee entre 8 et 10 minutes."
           : isTurtle ? "Composition tardive - defendez en early, dominez en imperial."
           : "Composition equilibree - adaptez-vous au rythme adverse.";
  function blk(id, entries) {
    var lbls = { early:'&#9876; Early  (0-8 min)', mid:'&#9881; Mid  (8-16 min)', late:'&#127961; Late  (16+ min)' };
    var cls  = { early:'tu-ph-early', mid:'tu-ph-mid', late:'tu-ph-late' };
    return '<div class="tu-ph-block ' + cls[id] + '"><div class="tu-ph-title">' + lbls[id] + '</div>' +
      entries.map(function(e){return '<div class="tu-ph-entry">' + e + '</div>';}).join('') + '</div>';
  }
  return '<div class="tu-section-title">Plan de jeu equipe</div>' +
    '<div class="tu-ph-note">' + note + '</div>' +
    blk('early', ph.early) + blk('mid', ph.mid) + blk('late', ph.late);
}
function genTeamBoSection(ap, phases) {
  if (!ap.length) return '';
  _tbtStop(); _tbt.idx = -1; _tbt.remain = 0; _tbt.paused = false;
  var earlyN = phases.filter(function(p){return p==='early';}).length;
  var lateN  = phases.filter(function(p){return p==='late';}).length;
  var isRush   = earlyN >= Math.ceil(ap.length / 2);
  var isTurtle = lateN  >= Math.ceil(ap.length / 2);
  var steps;
  if (isRush) {
    steps = [
      {min:'0:00',dur:50,action:"Placer vils sur nourriture - 5-6 sur moutons ou gibier"},
      {min:'1:30',dur:40,action:"2-3 vils sur bois - Lumber Camp, 1 vil sur or"},
      {min:'3:00',dur:50,action:"Construire casernes et ecuries - preparer le rush"},
      {min:'5:30',dur:55,action:"MONTEE EN FEODAL (14 vils) - synchroniser tous les joueurs"},
      {min:'7:00',dur:45,action:"Produire 4-6 unites de rush par joueur immediatement"},
      {min:'8:30',dur:65,action:"ATTAQUE COORDONNEE - assaut simultane sur deux flancs"},
      {min:'11:00',dur:55,action:"Si ennemi tient : pression continue, ne jamais reculer"},
      {min:'14:00',dur:60,action:"MONTEE EN CHATEAU si eco le permet - unites elite"}
    ];
  } else if (isTurtle) {
    steps = [
      {min:'0:00',dur:55,action:"Placer vils sur nourriture - 8 vils sur moutons"},
      {min:'2:00',dur:50,action:"4 vils bois, 2 vils or - murs de palissade en defense"},
      {min:'4:30',dur:55,action:"Continuer boom - viser 18-20 vils avant montee"},
      {min:'7:00',dur:65,action:"MONTEE EN FEODAL (18-20 vils) - Landmark eco en priorite"},
      {min:'10:00',dur:60,action:"Boom Feodal - 2eme TC, continuer production de vils"},
      {min:'13:00',dur:65,action:"MONTEE EN CHATEAU (25-28 vils) - Landmarks puissants"},
      {min:'17:00',dur:65,action:"Boom Chateau - financer armee complete"},
      {min:'21:00',dur:75,action:"MONTEE EN IMPERIAL - push decisif armee maximale"}
    ];
  } else {
    steps = [
      {min:'0:00',dur:50,action:"Placer vils sur nourriture - 6 vils moutons ou gibier"},
      {min:'2:00',dur:45,action:"2 vils bois - Lumber Camp, 2 vils or - Mining Camp"},
      {min:'4:00',dur:50,action:"Construire 1 caserne - eco et militaire equilibres"},
      {min:'6:30',dur:60,action:"MONTEE EN FEODAL (16 vils) - Landmark au choix"},
      {min:'9:00',dur:55,action:"Produire 3-4 unites par joueur, continuer eco"},
      {min:'11:00',dur:60,action:"COORDINATION - regrouper et timing attack ensemble"},
      {min:'14:00',dur:65,action:"MONTEE EN CHATEAU (22-24 vils) - unites elite"},
      {min:'18:00',dur:70,action:"Push final - armee complete, coordination maximale"}
    ];
  }
  _tbt.steps = steps;
  var stepsHtml = steps.map(function(s, i) {
    return '<div class="tbt-step" onclick="tbtJump(' + i + ')">' +
      '<span class="tbt-min">' + s.min + '</span>' +
      '<span class="tbt-action">' + s.action + '</span>' +
    '</div>';
  }).join('');
  return '<div class="tu-section-title">Build Order Timer equipe</div>' +
    '<div class="tu-tbo-wrap">' +
      '<div class="tbt-steps-col" id="tbt-steps-col">' + stepsHtml + '</div>' +
      '<div class="tbt-timer-col" id="tbt-timer-col">' + _tbtRenderCol() + '</div>' +
    '</div>';
}

function analyzeTeam() {
  var content = document.getElementById('tu-analysis-content');
  var empty   = document.getElementById('tu-empty-msg');
  if (!content) return;
  if (!tuAlly.length && !tuEnemy.length) {
    content.style.display = 'none'; if (empty) empty.style.display = 'block'; return;
  }
  if (empty) empty.style.display = 'none';
  content.style.display = 'block';
  var ap = tuAlly.map(function(id) { return Object.assign({id:id}, CIV_PROFILES[id]||{}, CIV_FLAG_MAP[id]||{}); });
  var ep = tuEnemy.map(function(id) { return Object.assign({id:id}, CIV_PROFILES[id]||{}, CIV_FLAG_MAP[id]||{}); });
  var syns = SYNERGIES.filter(function(s) { return s.civs.every(function(c) { return tuAlly.indexOf(c) !== -1; }); });
  var ar = [];
  ap.forEach(function(p) { (p.roles||[]).forEach(function(r) { if (ar.indexOf(r) === -1) ar.push(r); }); });
  var as = ap.map(function(p) { return p.style || 'mixte'; });
  var aph = ap.map(function(p) { return p.phase || 'mid'; });
  var sc = function(v) { return v >= 8 ? 'good' : v >= 6 ? 'ok' : 'bad'; };
  var synSc = syns.length ? Math.round(syns.reduce(function(s,x){return s+x.score;},0)/syns.length) : (tuAlly.length ? 6 : 0);
  var covSc = computeCoverage(ar);
  var timSc = computeTiming(aph);
  var strengths = computeStrengths(ar, as, syns);
  var weaknesses = computeWeaknesses(ar, as, aph, ep);
  var strategies = buildStrategies(ap, ep, syns, as, aph);
  var tips = buildTips(ap, ep, syns);
  var civBreak = ap.map(function(p) {
    var role = (p.roles||[])[0]||'polyvalent';
    var rl = {cavalerie:'Cavalerie',archer:'Archer',infanterie:'Infanterie',
      defensif:'Defensif',economie:'Eco',naval:'Naval',artillerie:'Artillerie',
      harass:'Harass',soutien:'Soutien',heroine:'Heroine',elephant:'Elephant',
      tech:'Tech','anti-cavalerie':'Anti-cav'}[role]||role;
    return '<div class="tu-civ-mini"><span class="tu-civ-mini-flag">' + (p.flag||'⚔️') + '</span><span class="tu-civ-mini-name">' + (p.name||p.id) + '</span><span class="tu-civ-mini-role">' + rl + '</span></div>';
  }).join('');
  var enemySect = ep.length ? '<div class="tu-section-title">Equipe adverse</div><div class="tu-civ-breakdown">' +
    ep.map(function(p) {
      return '<div class="tu-civ-mini"><span class="tu-civ-mini-flag">' + (p.flag||'⚔️') + '</span><span class="tu-civ-mini-name">' + (p.name||p.id) + '</span><span class="tu-civ-mini-role" style="color:#e06060;border-color:rgba(224,96,96,.3)">' + ((p.roles||[])[0]||'') + '</span></div>';
    }).join('') + '</div>' : '';
  var counterHtml = genCounterSection(ap, ep);
  var phasesHtml  = genPhasesSection(ap, ep, syns, aph);
  var tboHtml     = genTeamBoSection(ap, aph);
  var html = '';
  if (ap.length) {
    html += '<div class="tu-section-title">Composition</div><div class="tu-civ-breakdown">' + civBreak + '</div>';
    html += '<div class="tu-section-title">Scores</div><div class="tu-score-row">' +
      '<div class="tu-score"><div class="tu-score-label">Synergie</div><div class="tu-score-val ' + sc(synSc) + '">' + synSc + '/10</div></div>' +
      '<div class="tu-score"><div class="tu-score-label">Couverture</div><div class="tu-score-val ' + sc(covSc) + '">' + covSc + '/10</div></div>' +
      '<div class="tu-score"><div class="tu-score-label">Timing</div><div class="tu-score-val ' + sc(timSc) + '">' + timSc + '/10</div></div>' +
    '</div>';
    if (syns.length) {
      html += '<div class="tu-section-title">Synergies detectees</div>';
      syns.forEach(function(s) {
        html += '<div class="tu-strat-card priority"><div class="tu-strat-num">SYNERGIE ' + s.score + '/10</div><div class="tu-strat-title">' + s.label + '</div><div class="tu-strat-desc">' + s.desc + '</div></div>';
      });
    }
    html += '<div class="tu-section-title">Forces</div><div class="tu-tag-row">' + strengths.map(function(s){return '<span class="tu-tag str">v ' + s + '</span>';}).join('') + '</div>';
    html += '<div class="tu-section-title">Faiblesses</div><div class="tu-tag-row">' + weaknesses.map(function(w){return '<span class="tu-tag wk">x ' + w + '</span>';}).join('') + '</div>';
  }
  html += enemySect;
  if (strategies.length) {
    html += '<div class="tu-section-title">Strategies recommandees</div>';
    strategies.forEach(function(s, i) {
      html += '<div class="tu-strat-card ' + (i === 0 ? 'priority' : '') + '"><div class="tu-strat-num">STRATEGIE ' + (i+1) + (i===0?' - PRIORITAIRE':'') + '</div><div class="tu-strat-title">' + s.title + '</div><div class="tu-strat-desc">' + s.desc + '</div></div>';
    });
  }
  html += '<div class="tu-section-title">Conseils cles</div><div class="tu-tag-row">' + tips.map(function(t){return '<span class="tu-tag tip">+ ' + t + '</span>';}).join('') + '</div>';
  html += counterHtml + phasesHtml + tboHtml;
  content.innerHTML = html;
}

function computeStrengths(roles, styles, syns) {
  var s = [];
  if(roles.indexOf('cavalerie')>=0) s.push('Pression cavalerie forte');
  if(roles.indexOf('archer')>=0) s.push('Couverture a distance');
  if(roles.indexOf('anti-cavalerie')>=0) s.push('Counter-cavalerie integre');
  if(roles.indexOf('defensif')>=0) s.push('Defense solide');
  if(roles.indexOf('naval')>=0) s.push('Domination navale');
  if(roles.indexOf('elephant')>=0) s.push('Unites de siege vivantes');
  if(roles.indexOf('economie')>=0||roles.indexOf('tech')>=0) s.push('Avantage economique tardif');
  if(styles.filter(function(x){return x==='agressif';}).length>=2) s.push('Double pression precoce');
  if(styles.filter(function(x){return x==='defensif';}).length>=2) s.push('Ligne defensive impermeaable');
  if(syns.length) s.push(syns.length + ' synergie' + (syns.length>1?'s':'') + ' confirmee' + (syns.length>1?'s':''));
  return s.length ? s : ['Composition polyvalente'];
}
function computeWeaknesses(roles, styles, phases, ep) {
  var w = [];
  if(roles.indexOf('cavalerie')<0&&roles.indexOf('anti-cavalerie')<0) w.push('Vulnerable aux rushes cavalerie');
  if(roles.indexOf('archer')<0&&roles.indexOf('defensif')<0) w.push('Pas de couverture a distance');
  if(roles.indexOf('artillerie')<0&&roles.indexOf('elephant')<0) w.push('Manque de siege');
  if(styles.every(function(s){return s==='defensif';})) w.push('Manque initiative offensive');
  if(styles.every(function(s){return s==='agressif';})) w.push('Fragile si le rush echoue');
  if(phases.every(function(p){return p==='late';})) w.push('Early game vulnerable');
  if(ep.some(function(p){return p.id==='mongols'||p.id==='ayyoubides';})) w.push('Harass cavalerie difficile a stopper');
  return w.slice(0, 5);
}
function buildStrategies(ap, ep, syns, styles, phases) {
  var st = [];
  if(syns.length) st.push({title:"Exploiter la synergie - " + syns[0].label, desc:syns[0].desc + " Coordonnez le timing et attaquez ensemble."});
  if(styles.filter(function(s){return s==='agressif';}).length>=2) st.push({title:"Rush Coordonne - Pression precoce",desc:"Attaquez simultanement depuis deux flancs des l'age Feodal. Timing ideal entre 5 et 8 minutes."});
  if(styles.some(function(s){return s==='defensif';})&&styles.some(function(s){return s==='agressif';})) st.push({title:"Defense Active - Roles asymetriques",desc:"Un joueur boom et defend pendant que l'autre presse en continu."});
  if(phases.every(function(p){return p==='late';})) st.push({title:"Turtle jusqu'a l'age Imperial",desc:"Survivez l'early avec des murs. A l'imperial votre avantage devient decisif."});
  if(st.length < 2) {
    st.push({title:"Communication et Timing",desc:"Coordonnez vos montees d'age pour attaquer ensemble a l'age Chateau."});
    st.push({title:"Controle des Ressources",desc:"Visez les reliques avant l'adversaire. Controler le centre donne acces aux meilleures mines."});
  }
  return st.slice(0, 4);
}
function buildTips(ap, ep, syns) {
  var t = [];
  var roles = [];
  ap.forEach(function(p) { (p.roles||[]).forEach(function(r) { roles.push(r); }); });
  if(roles.indexOf('cavalerie')>=0) t.push('Attaquez toujours en groupe - jamais de cavalerie seule');
  if(roles.indexOf('archer')>=0) t.push("Gardez les archers derriere une ligne d'infanterie");
  if(syns.length) t.push('Declenchez les attaques simultanement pour maximiser les synergies');
  if(ap.some(function(p){return p.id==='mongols';})) t.push('Mongols - ne jamais rester statiques, harceler en continu');
  t.push("Assignez des roles clairs - qui boom, qui rush, qui defend");
  t.push("Communiquez vos montees d'age a l'avance");
  return t.slice(0, 5);
}
function computeCoverage(roles) {
  var c = [
    roles.indexOf('cavalerie')>=0||roles.indexOf('anti-cavalerie')>=0,
    roles.indexOf('archer')>=0||roles.indexOf('harass')>=0,
    roles.indexOf('infanterie')>=0||roles.indexOf('defensif')>=0,
    roles.indexOf('artillerie')>=0||roles.indexOf('elephant')>=0||roles.indexOf('naval')>=0,
    roles.indexOf('economie')>=0||roles.indexOf('tech')>=0||roles.indexOf('soutien')>=0
  ];
  return Math.round(c.filter(Boolean).length / c.length * 10);
}
function computeTiming(phases) {
  var e=phases.indexOf('early')>=0,m=phases.indexOf('mid')>=0,l=phases.indexOf('late')>=0;
  if(e&&m) return 9; if(m&&l) return 8; if(e&&l) return 7; if(m) return 8; return 6;
}

// ── INIT TEAM-UP ─────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  renderSlots();
  analyzeTeam();
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePicker();
  });
});