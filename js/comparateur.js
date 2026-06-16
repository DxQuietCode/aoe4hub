// AOE4 Hub - Comparateur de civilisations
// Charge apres data.js et main.js

function _cEsc(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderComparator() {
  var grid = document.getElementById('comp-grid');
  if (!grid) return;
  var selA = document.getElementById('comp-sel-a');
  var selB = document.getElementById('comp-sel-b');
  var idA  = selA ? selA.value : '';
  var idB  = selB ? selB.value : '';

  if (!idA || !idB) {
    grid.innerHTML = '<div class="comp-empty-state">Selectionne deux civilisations dans les menus pour les comparer.</div>';
    return;
  }
  if (idA === idB) {
    grid.innerHTML = '<div class="comp-empty-state">Selectionne deux civilisations differentes.</div>';
    return;
  }

  var metaA = CIV_FLAG_MAP[idA] || {};
  var metaB = CIV_FLAG_MAP[idB] || {};
  var civA  = ALL_CIVS.find(function(c) { return c.id === idA; }) || {};
  var civB  = ALL_CIVS.find(function(c) { return c.id === idB; }) || {};

  // Use CIV_COMPARE_DATA for rich content
  var dataA = (typeof CIV_COMPARE_DATA !== 'undefined' && CIV_COMPARE_DATA[idA]) || {};
  var dataB = (typeof CIV_COMPARE_DATA !== 'undefined' && CIV_COMPARE_DATA[idB]) || {};

  var bonA = dataA.bonuses || [];
  var bonB = dataB.bonuses || [];
  var lmA  = dataA.landmarks || [];
  var lmB  = dataB.landmarks || [];
  var uA   = dataA.uniqueUnits || [];
  var uB   = dataB.uniqueUnits || [];
  var pA   = dataA.playstyle || '';
  var pB   = dataB.playstyle || '';

  var styA = (civA.style || '').split(' ').filter(Boolean);
  var styB = (civB.style || '').split(' ').filter(Boolean);
  var excA = styA.filter(function(s) { return styB.indexOf(s) === -1; });
  var excB = styB.filter(function(s) { return styA.indexOf(s) === -1; });
  var shr  = styA.filter(function(s) { return styB.indexOf(s) !== -1; });
  var uNmA = uA.map(function(u) { return u.name.toLowerCase(); });
  var uNmB = uB.map(function(u) { return u.name.toLowerCase(); });
  var styLbl = { agressif:'Agressif', defense:'Defense', boom:'Boom', flexible:'Flexible', economique:'Economique' };

  function stTag(s, cls) { return '<span class="comp-style-tag ' + cls + '">' + _cEsc(styLbl[s] || s) + '</span>'; }
  function cntVal(n, more) { var cls = more === null ? '' : (more ? ' higher' : ' lower'); return '<span class="comp-count-val' + cls + '">' + n + '</span>'; }
  function secTit(icon, lbl) { return '<div class="comp-section-title"><span>' + icon + '</span>' + lbl + '</div>'; }

  var h = '';
  function civHeader(meta, civ, side, excSty) {
    var dlcStr = typeof meta.dlc === 'string' ? meta.dlc : (meta.dlc ? 'DLC' : '');
    var s = '<div class="comp-header-cell side-' + side + '">';
    s += '<div class="comp-civ-flag">' + _cEsc(meta.flag || '') + '</div>';
    s += '<div class="comp-civ-name comp-name-' + side + '">' + _cEsc(meta.name || civ.id || '') + '</div>';
    s += '<div class="comp-civ-diff">' + _cEsc(meta.diff || '') + '</div>';
    s += '<div class="comp-civ-style">';
    shr.forEach(function(st) { s += stTag(st, 'sty-shared'); });
    excSty.forEach(function(st) { s += stTag(st, 'sty-exc-' + side); });
    s += '</div>';
    if (dlcStr) s += '<div class="comp-dlc-lbl">' + _cEsc(dlcStr) + '</div>';
    s += '</div>';
    return s;
  }
  h += civHeader(metaA, civA, 'a', excA);
  h += civHeader(metaB, civB, 'b', excB);

  // PLAYSTYLE
  h += secTit('🎮', 'Style de jeu');
  h += '<div class="comp-cell side-a"><p class="comp-play-txt">' + _cEsc(pA || 'Description disponible dans la fiche civ.') + '</p></div>';
  h += '<div class="comp-cell side-b"><p class="comp-play-txt">' + _cEsc(pB || 'Description disponible dans la fiche civ.') + '</p></div>';

  // BONUS
  var mA = bonA.length > bonB.length, mB = bonB.length > bonA.length, eqB = !mA && !mB;
  h += secTit('⚡', 'Bonus passifs');
  function renderBonuses(bons, side, isMore, diff) {
    var s = '<div class="comp-cell side-' + side + '">';
    s += '<div class="comp-count-row">' + cntVal(bons.length, eqB ? null : isMore) + ' bonus';
    if (isMore) s += ' <span class="comp-diff-pill more">+' + diff + '</span>';
    s += '</div>';
    bons.forEach(function(b) {
      s += '<div class="comp-bon"><span class="comp-bon-icon">' + _cEsc(b.icon||'') + '</span>';
      s += '<div><div class="comp-bon-title">' + _cEsc(b.title) + '</div>';
      s += '<div class="comp-bon-desc">' + _cEsc(b.desc) + '</div></div></div>';
    });
    return s + '</div>';
  }
  h += renderBonuses(bonA, 'a', mA, bonA.length - bonB.length);
  h += renderBonuses(bonB, 'b', mB, bonB.length - bonA.length);

  // LANDMARKS
  h += secTit('🏯', 'Landmarks par age');
  function renderLandmarks(lms, side) {
    var s = '<div class="comp-cell side-' + side + '">';
    if (!lms.length) { s += '<p class="comp-play-txt" style="font-style:italic;">Voir la fiche civ pour les landmarks.</p>'; }
    lms.forEach(function(lm) {
      s += '<div class="comp-lm-grp"><div class="comp-lm-age-lbl">' + _cEsc(lm.age) + '</div>';
      lm.opts.forEach(function(o, i) {
        if (i) s += '<div class="comp-lm-or">OU</div>';
        s += '<div class="comp-lm-card"><div class="comp-lm-name">' + _cEsc(o.name) + '</div>';
        s += '<div class="comp-lm-desc">' + _cEsc(o.desc) + '</div></div>';
      });
      s += '</div>';
    });
    return s + '</div>';
  }
  h += renderLandmarks(lmA, 'a');
  h += renderLandmarks(lmB, 'b');

  // UNITES SPECIALES
  var muA = uA.length > uB.length, muB = uB.length > uA.length, eqU = !muA && !muB;
  h += secTit('⚔️', 'Unites speciales');
  function renderUnits(units, side, otherNames, isMore, diff) {
    var s = '<div class="comp-cell side-' + side + '">';
    s += '<div class="comp-count-row">' + cntVal(units.length, eqU ? null : isMore) + ' unite' + (units.length !== 1 ? 's' : '');
    if (isMore) s += ' <span class="comp-diff-pill more">+' + diff + '</span>';
    s += '</div>';
    if (!units.length) s += '<p class="comp-play-txt" style="font-style:italic;">Aucune unite speciale.</p>';
    units.forEach(function(u) {
      var excl = otherNames.indexOf(u.name.toLowerCase()) === -1;
      s += '<div class="comp-unit' + (excl ? ' comp-unit-excl-' + side : '') + '">';
      if (excl) s += '<span class="comp-excl-badge excl-' + side + '">EXCLUSIF</span>';
      s += '<div class="comp-unit-name">' + _cEsc(u.name) + '</div>';
      s += '<div class="comp-unit-desc">' + _cEsc(u.desc) + '</div></div>';
    });
    return s + '</div>';
  }
  h += renderUnits(uA, 'a', uNmB, muA, uA.length - uB.length);
  h += renderUnits(uB, 'b', uNmA, muB, uB.length - uA.length);

  // LIEN VERS FICHES
  h += secTit('🔗', 'Fiches completes');
  var root = typeof _root === 'function' ? _root() : '';
  h += '<div class="comp-cell side-a"><a class="comp-fiche-link" href="' + root + 'civs/' + idA + '.html">Voir la fiche ' + _cEsc(metaA.name||idA) + ' →</a></div>';
  h += '<div class="comp-cell side-b"><a class="comp-fiche-link" href="' + root + 'civs/' + idB + '.html">Voir la fiche ' + _cEsc(metaB.name||idB) + ' →</a></div>';

  grid.innerHTML = h;
}

function initComparator() {
  var selA = document.getElementById('comp-sel-a');
  var selB = document.getElementById('comp-sel-b');
  if (!selA || !selB) return;
  [selA, selB].forEach(function(sel) {
    sel.innerHTML = '<option value="">-- Choisir une civilisation --</option>';
    ALL_CIVS.forEach(function(civ) {
      var opt = document.createElement('option');
      opt.value = civ.id;
      opt.textContent = (civ.flag || '') + ' ' + (civ.name || civ.id);
      sel.appendChild(opt);
    });
  });
  selA.addEventListener('change', renderComparator);
  selB.addEventListener('change', renderComparator);
}

window.addEventListener('DOMContentLoaded', function() {
  initComparator();
});