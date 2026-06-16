// AOE4 Hub - Tier List
// Charge apres data.js et main.js

// ── TIER LIST DYNAMIQUE ──────────────────────────────────────────────────────
var _tlMode  = 'dynamic';
var _tlRank  = 'all';
var _tlCache = {};
var _TL_API  = 'https://aoe4world.com/api/v0/stats/rm_solo/civilizations';
var _TL_RANK_RATING = { all:'', platinum:'>1400', diamond:'>1600', conqueror:'>1700' };

function _applyTierFilter() {
  document.querySelectorAll('.tier-civ').forEach(function(tc) {
    var styles = (tc.dataset.style || '').split(' ');
    var ok = (typeof _fStyle === 'undefined') || _fStyle === 'all' || styles.indexOf(_fStyle) !== -1;
    tc.style.display = ok ? '' : 'none';
  });
  document.querySelectorAll('.tier-row').forEach(function(row) {
    var hasVis = false;
    row.querySelectorAll('.tier-civ').forEach(function(tc) { if (tc.style.display !== 'none') hasVis = true; });
    row.style.display = hasVis ? '' : 'none';
  });
  document.querySelectorAll('.tier-block').forEach(function(block) {
    var hasVis = false;
    block.querySelectorAll('.tier-row').forEach(function(row) { if (row.style.display !== 'none') hasVis = true; });
    block.style.display = hasVis ? '' : 'none';
  });
  var dlcWrap = document.querySelector('.tier-dlc-wrap');
  if (dlcWrap) {
    var hasVis = false;
    dlcWrap.querySelectorAll('.tier-civ').forEach(function(tc) { if (tc.style.display !== 'none') hasVis = true; });
    dlcWrap.style.display = hasVis ? '' : 'none';
  }
}

function _tlDlcTheme(dlc) {
  if (!dlc || dlc === false) return '';
  var d = String(dlc).toLowerCase();
  if (d.indexOf('knight') >= 0 || d.indexOf('cross') >= 0) return 'knights';
  if (d.indexOf('dynast') >= 0 || d.indexOf('east') >= 0) return 'dynasties';
  if (d.indexOf('yue') >= 0 || d.indexOf('legacy') >= 0) return 'yuefei';
  if (d.indexOf('saison') >= 0 || d.indexOf('season') >= 0) return 'yuefei';
  return 'sultans';
}
function _tlDlcBadge(dlc) {
  if (!dlc || dlc === false) return '';
  var theme = _tlDlcTheme(dlc);
  var dlcName = typeof dlc === 'string' ? dlc : 'DLC';
  return '<span class="tl-dlc-icon tl-dlc-' + theme + '" title="' + _tlQ(dlcName) + '">&#9670;</span>';
}
function _tlRenderStatic() {
  var el = document.getElementById('tl-static-content');
  if (!el) return;
  var grouped = { S:[], A:[], B:[], C:[], D:[] };
  ALL_CIVS.forEach(function(civ) {
    var t = TL_STATIC_TIERS[civ.id] || 'C';
    grouped[t].push(civ);
  });
  var html = '';
  ['S','A','B','C','D'].forEach(function(t) {
    if (!grouped[t].length) return;
    html += '<div class="tier-block"><div class="tier-row">';
    html += '<div class="tier-label ' + t.toLowerCase() + '">' + t + '</div>';
    html += '<div class="tier-civs">';
    grouped[t].forEach(function(civ) {
      var style  = civ.style ? ' data-style="' + civ.style + '"' : '';
      var badge  = _tlDlcBadge(civ.dlc);
      var desc   = "Tier " + t + " (donnees statiques). Passe en mode live pour les winrates en temps reel.";
      html += '<div class="tier-civ"' + style +
        ' onclick="openPanel(\'' + _tlQ(civ.id) + '\',\'' + _tlQ(civ.flag||'') + '\',\'' + _tlQ(civ.name||civ.id) + '\',\'' + t + '\',\'stat\',\'' + _tlQ(desc) + '\')">';
      html += '<span class="tc-flag">' + (civ.flag||'') + '</span>';
      html += '<span class="tc-name">' + (civ.name||civ.id) + '</span>';
      html += badge;
      html += '</div>';
    });
    html += '</div></div></div>';
  });
  el.innerHTML = html;
  _applyTierFilter();
}
function _tlClassify(wr) {
  if (wr >= 53) return 'S'; if (wr >= 51) return 'A';
  if (wr >= 49) return 'B'; if (wr >= 47) return 'C';
  return 'D';
}
function _tlTrend(wr, prev) {
  if (prev === null || prev === undefined) return '';
  var delta = wr - prev;
  if (delta > 0.5) return '<span class="tl-trend up" title="En hausse">&#8593;</span>';
  if (delta < -0.5) return '<span class="tl-trend dn" title="En baisse">&#8595;</span>';
  return '<span class="tl-trend eq" title="Stable">&#8594;</span>';
}
function _tlQ(s) { return (s || '').replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }
function _tlNorm(name) {
  var n = (name || '').toLowerCase().replace(/[^a-z_]/g, '_');
  return CIV_IDS_BY_NAME[n] || CIV_IDS_BY_NAME[(name || '').toLowerCase()] || null;
}
function _tlRender(data) {
  var content = document.getElementById('tl-tier-content');
  var status  = document.getElementById('tl-status');
  if (!content) return;
  if (!data || !data.length) {
    content.innerHTML = '<div class="tl-err">Aucune donnee disponible pour ce filtre de rang.</div>';
    return;
  }
  var tiers = { S:[], A:[], B:[], C:[], D:[] };
  var totalGames = data.reduce(function(s,c){ return s + (c.games_count||0); }, 0);
  data.forEach(function(civ) {
    var name = civ.civilization || civ.name || '';
    var slug = _tlNorm(name);
    if (!slug) return;
    var meta = CIV_FLAG_MAP[slug] || {};
    var wr = typeof civ.win_rate === 'number' ? civ.win_rate
           : (civ.wins_count && civ.games_count ? (civ.wins_count / civ.games_count * 100) : null);
    if (wr === null || wr === undefined) return;
    var pr = (civ.pick_rate != null) ? civ.pick_rate
           : (totalGames > 0 && civ.games_count ? (civ.games_count / totalGames * 100) : null);
    var prev = civ.previous_win_rate != null ? civ.previous_win_rate : null;
    var styleStr = (ALL_CIVS.find(function(c){return c.id===slug;})||{}).style || '';
    var tier = _tlClassify(wr);
    tiers[tier].push({ slug:slug, meta:meta, wr:wr, pr:pr, prev:prev, styleStr:styleStr });
  });
  var html = '';
  ['S','A','B','C','D'].forEach(function(t) {
    if (!tiers[t].length) return;
    tiers[t].sort(function(a,b){ return b.wr - a.wr; });
    html += '<div class="tier-block tl-dyn-block" data-tier="' + t + '"><div class="tier-row">';
    html += '<div class="tier-label ' + t.toLowerCase() + '">' + t + '</div>';
    html += '<div class="tier-civs">';
    tiers[t].forEach(function(c) {
      var wrPct  = (Math.round(c.wr * 10) / 10).toFixed(1);
      var prPct  = c.pr != null ? (Math.round(c.pr * 10) / 10).toFixed(1) : null;
      var trend  = _tlTrend(c.wr, c.prev);
      var desc   = "Winrate reel : " + wrPct + "%" + (prPct ? " | Pick rate : " + prPct + "%" : "") + ". Source : aoe4world.com";
      var styleAttr = c.styleStr ? ' data-style="' + c.styleStr + '"' : '';
      var dlcBadge  = _tlDlcBadge(c.meta.dlc);
      html += '<div class="tier-civ tl-dyn-civ"' + styleAttr +
        ' onclick="openPanel(\'' + _tlQ(c.slug) + '\',\'' + _tlQ(c.meta.flag||'') + '\',\'' + _tlQ(c.meta.name||c.slug) + '\',\'' + t + '\',\'' + wrPct + '%\',\'' + _tlQ(desc) + '\')">';
      html += '<span class="tc-flag">' + (c.meta.flag||'') + '</span>';
      html += '<div class="tl-dyn-body">';
      html += '<span class="tc-name">' + (c.meta.name||c.slug) + '</span>';
      html += '<div class="tl-dyn-stats"><span class="tl-wr wr-count" data-target="' + wrPct + '">0%</span>';
      if (prPct) html += '<span class="tl-pr">PR ' + prPct + '%</span>';
      html += trend + '</div></div>' + dlcBadge + '</div>';
    });
    html += '</div></div></div>';
  });
  if (!html) html = '<div class="tl-err">Aucune civilisation classable avec ces donnees.</div>';
  content.innerHTML = html;
  setTimeout(animateWinrates, 60);
  var now = new Date().toLocaleDateString('fr-FR', {day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'});
  if (status) status.innerHTML = '<span class="tl-live-dot"></span><span class="tl-live-lbl">LIVE</span> aoe4world.com &nbsp;|&nbsp; ' + now;
  _applyTierFilter();
}
async function _tlFetch(rank) {
  var url = _TL_API;
  var rating = _TL_RANK_RATING[rank] || '';
  if (rating) url += '?rating=' + rating;
  var ctrl = new AbortController();
  var tid = setTimeout(function(){ ctrl.abort(); }, 9000);
  try {
    var res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(tid);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var json = await res.json();
    if (Array.isArray(json)) return json;
    if (json && Array.isArray(json.civilizations)) return json.civilizations;
    if (json && Array.isArray(json.data)) return json.data;
    if (json && Array.isArray(json.stats)) return json.stats;
    return [];
  } catch(e) { clearTimeout(tid); throw e; }
}
async function loadDynamicTierList(rank) {
  if (_tlMode !== 'dynamic') return;
  rank = rank || _tlRank;
  var loading = document.getElementById('tl-loading');
  var content = document.getElementById('tl-tier-content');
  var status  = document.getElementById('tl-status');
  var skelHtml = '<div class="tl-loading-skel">' +
    '<div class="skeleton-block sk-row"></div><div class="skeleton-block sk-row"></div>' +
    '<div class="skeleton-block sk-row"></div><div class="skeleton-block sk-row"></div>' +
    '<div class="skeleton-block sk-row"></div></div>';
  if (loading) loading.style.display = 'none';
  if (content) content.innerHTML = skelHtml;
  if (status)  status.innerHTML  = '';
  if (_tlCache[rank]) { if (content) content.innerHTML = ''; _tlRender(_tlCache[rank]); return; }
  try {
    var data = await _tlFetch(rank);
    _tlCache[rank] = data;
    if (content) content.innerHTML = '';
    _tlRender(data);
    lazyObserveNew('.tier-civ');
  } catch(err) {
    if (content) content.innerHTML = '';
    if (status) status.innerHTML = '<span class="tl-err-dot">&#9888;</span> API indisponible - donnees de secours activees.';
    switchToManual();
  }
}
function setTierRank(rank, btn) {
  _tlRank = rank;
  document.querySelectorAll('.fbtn-rank').forEach(function(b) { b.classList.toggle('active', b.dataset.rank === rank); });
  if (_tlMode === 'dynamic') { loadDynamicTierList(rank); }
  else {
    var eloMap = { all:'bronze', platinum:'gold', diamond:'diamond', conqueror:'diamond' };
    var eloId  = eloMap[rank] || 'bronze';
    document.querySelectorAll('.elo-panel').forEach(function(p) { p.classList.toggle('active', p.id === 'elo-' + eloId); });
  }
}
function toggleTierMode() { if (_tlMode === 'dynamic') { switchToManual(); } else { switchToDynamic(); } }
function switchToManual() {
  _tlMode = 'manual';
  var btn  = document.getElementById('tl-toggle-btn');
  var dyn  = document.getElementById('tl-dynamic');
  var stat = document.getElementById('tl-static');
  var status = document.getElementById('tl-status');
  if (btn)    btn.innerHTML = '&#9889; Donnees live';
  if (dyn)    dyn.style.display = 'none';
  if (stat)   stat.style.display = 'block';
  if (status) status.innerHTML = '<span class="tl-manual-lbl">Mode manuel - donnees statiques</span>';
  _tlRenderStatic();
}
function switchToDynamic() {
  _tlMode  = 'dynamic'; _tlCache = {};
  var btn  = document.getElementById('tl-toggle-btn');
  var dyn  = document.getElementById('tl-dynamic');
  var stat = document.getElementById('tl-static');
  var status = document.getElementById('tl-status');
  if (btn)    btn.innerHTML = '&#128203; Mode Manuel';
  if (dyn)    dyn.style.display = 'block';
  if (stat)   stat.style.display = 'none';
  if (status) status.innerHTML = '';
  loadDynamicTierList(_tlRank);
}
function initDynamicTierList() {
  var dyn  = document.getElementById('tl-dynamic');
  var stat = document.getElementById('tl-static');
  if (_tlMode !== 'dynamic') { if (dyn) dyn.style.display = 'none'; if (stat) stat.style.display = 'block'; return; }
  if (dyn)  dyn.style.display  = 'block';
  if (stat) stat.style.display = 'none';
  if (!_tlCache[_tlRank] || !_tlCache[_tlRank].length) { loadDynamicTierList(_tlRank); }
  else { _tlRender(_tlCache[_tlRank]); }
}

// ── CIV INFO PANEL ───────────────────────────────────────────────────────────
window._panelTargetCiv = null;
function openPanel(slug, flag, name, tier, wr, desc) {
  window._panelTargetCiv = slug;
  document.getElementById('cip-flag').textContent = flag;
  document.getElementById('cip-name').textContent = name;
  document.getElementById('cip-tier').textContent = 'Tier ' + tier;
  document.getElementById('cip-wr').textContent = wr;
  document.getElementById('cip-tval').textContent = tier;
  document.getElementById('cip-desc').textContent = desc;
  document.getElementById('civPanel').classList.add('open');
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var p = document.getElementById('civPanel');
    if (p) p.classList.remove('open');
  }
});

// ── INIT TIERLIST ────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  initStyleFilters();
  initDynamicTierList();
});