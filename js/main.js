// AOE4 Hub - JS partage multi-page
// Charge apres data.js sur toutes les pages

// ── NAVIGATION MULTI-PAGE ────────────────────────────────────────────────────
function _isInCivs() {
  return window.location.pathname.replace(/\\/g,'/').indexOf('/civs/') !== -1;
}
function _root() {
  return _isInCivs() ? '../' : '';
}

var _PAGE_URLS = {
  'home':           'index.html',
  'guide':          'guide.html',
  'tierlist':       'tierlist.html',
  'pg-teamup':      'teamup.html',
  'pg-buildorders': 'buildorders.html',
  'pg-comparateur': 'comparateur.html',
  'epreuve':        'epreuve.html',
  'pg-glossaire':   'glossaire.html',
  'patches':        'patches.html'
};
var _CIV_IDS = ['anglais','francais','hre','mongols','rus','abbasides','ottomans','mali',
  'byzantins','chine','delhi','japonais','zhuxilegacy','ayyoubides','jeannedarc','ordresmoines',
  'templiers','lancaster','hordedor','macedonienne','sengokudaimyo','tughluq','jindynasty'];

function navigate(pid) {
  var root = _root();
  if (_CIV_IDS.indexOf(pid) !== -1) {
    window.location.href = root + 'civs/' + pid + '.html';
    return;
  }
  if (_PAGE_URLS[pid]) {
    window.location.href = root + _PAGE_URLS[pid];
    return;
  }
}
function goPage(pid) { navigate(pid); }

function navigateFromPanel() {
  var slug = window._panelTargetCiv;
  if (slug) window.location.href = _root() + 'civs/' + slug + '.html';
}

// ── INJECTION NAV ────────────────────────────────────────────────────────────
function _injectNav() {
  var nav = document.querySelector('nav');
  if (!nav) return;
  var root = _root();
  var curPath = window.location.pathname.replace(/\\/g,'/').split('/').pop().replace('.html','');
  var curDir = _isInCivs() ? 'civs' : '';
  function isActive(page) {
    if (page === 'home' && (curPath === 'index' || curPath === '')) return true;
    if (page === 'guide' && curPath === 'guide') return true;
    if (page === 'tierlist' && curPath === 'tierlist') return true;
    if (page === 'pg-teamup' && curPath === 'teamup') return true;
    if (page === 'pg-buildorders' && curPath === 'buildorders') return true;
    if (page === 'pg-comparateur' && curPath === 'comparateur') return true;
    if (page === 'epreuve' && curPath === 'epreuve') return true;
    if (page === 'pg-glossaire' && curPath === 'glossaire') return true;
    if (page === 'patches' && curPath === 'patches') return true;
    if (curDir === 'civs') return page === 'guide';
    return false;
  }
  var svgLogo = '<svg viewBox="0 0 28 28" fill="none"><path d="M14 2L3 8V14C3 19.5 8 24.4 14 26C20 24.4 25 19.5 25 14V8L14 2Z" stroke="#c8a84b" stroke-width="1.5" fill="rgba(200,168,75,0.08)"/><path d="M14 7V21M7 10H21M9 16H19" stroke="#c8a84b" stroke-width="1.2" stroke-linecap="round"/></svg>';
  var links = [
    {page:'home',         url:root+'index.html',       label:'Accueil'},
    {page:'guide',        url:root+'guide.html',        label:'Guide des Civs'},
    {page:'tierlist',     url:root+'tierlist.html',     label:'Tier List'},
    {page:'pg-teamup',    url:root+'teamup.html',       label:'Team-UP'},
    {page:'pg-buildorders',url:root+'buildorders.html', label:'Build Orders'},
    {page:'pg-comparateur',url:root+'comparateur.html', label:'Comparateur'},
    {page:'epreuve',      url:root+'epreuve.html',      label:"L'Epreuve"},
    {page:'pg-glossaire', url:root+'glossaire.html',    label:'Glossaire'}
  ];
  nav.innerHTML =
    '<a class="nav-logo" href="' + root + 'index.html">' + svgLogo + 'AOE IV &middot; COMMAND HUB</a>' +
    '<div class="nav-links" id="nav-links">' +
      links.map(function(l) {
        return '<a class="nav-link' + (isActive(l.page) ? ' active' : '') + '" href="' + l.url + '">' + l.label + '</a>';
      }).join('') +
    '</div>' +
    '<div class="nav-controls">' +
      '<div class="text-size-ctrl" title="Taille du texte">' +
        '<button class="ts-btn" data-size="text-sm" onclick="setTextSize(\'text-sm\')">A</button>' +
        '<button class="ts-btn active" data-size="text-md" onclick="setTextSize(\'text-md\')">A</button>' +
        '<button class="ts-btn" data-size="text-lg" onclick="setTextSize(\'text-lg\')">A</button>' +
      '</div>' +
      '<button id="sound-toggle" class="sound-btn" onclick="toggleSound()" aria-label="Son : on" title="Son">&#128276;</button>' +
    '</div>' +
    '<button class="nav-hamburger" id="nav-hamburger" onclick="toggleNavMenu()" aria-label="Menu" aria-expanded="false">' +
      '<span></span><span></span><span></span>' +
    '</button>';
  renderNewBadges();
}

function toggleNavMenu() {
  var nl = document.getElementById('nav-links');
  var hb = document.getElementById('nav-hamburger');
  if (!nl) return;
  var open = nl.classList.toggle('open');
  if (hb) hb.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// ── AGE / TECH TABS ──────────────────────────────────────────────────────────
function setAge(idx, btn) {
  var tabs = btn.closest('.age-tabs');
  tabs.querySelectorAll('.age-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  var sib = tabs.nextElementSibling, i = 0;
  while (sib && sib.classList.contains('age-panel')) {
    sib.classList.toggle('active', i === idx);
    sib = sib.nextElementSibling; i++;
  }
}
function setTech(idx, btn) {
  var sec = btn.closest('.section');
  sec.querySelectorAll('.age-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  sec.querySelectorAll('.age-panel[id^="tech-"]').forEach(function(p, i) {
    p.classList.toggle('active', i === idx);
  });
}

// ── TOC SCROLL SPY ───────────────────────────────────────────────────────────
var _tocHandler = null;
function setupToc() {
  var links = document.querySelectorAll('.toc-link');
  var secs = Array.from(document.querySelectorAll('[id]')).filter(function(el) {
    return el.classList.contains('section') || el.classList.contains('civ-hero');
  });
  if (_tocHandler) window.removeEventListener('scroll', _tocHandler);
  _tocHandler = function() {
    var y = window.scrollY + 100; var cur = '';
    secs.forEach(function(s) { if (s.offsetTop <= y) cur = s.id; });
    links.forEach(function(l) { l.classList.toggle('active', l.getAttribute('href') === '#' + cur); });
  };
  window.addEventListener('scroll', _tocHandler, {passive: true});
}

// ── GUIDE + TIERLIST FILTERS ─────────────────────────────────────────────────
var _fDiff = 'all';
var _fStyle = 'all';

function filter(diff, btn) {
  _fDiff = diff;
  document.querySelectorAll('.fbtn-diff').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  _applyGuideFilter();
}
function filterStyle(style, btn) {
  _fStyle = style;
  document.querySelectorAll('.fbtn-style').forEach(function(b) {
    b.classList.toggle('active', b.dataset.style === style);
  });
  _applyGuideFilter();
  if (typeof _applyTierFilter === 'function') _applyTierFilter();
}
function _applyGuideFilter() {
  document.querySelectorAll('.diff-section').forEach(function(s) { s.style.display = ''; });
  document.querySelectorAll('.civ-card').forEach(function(card) {
    var diff = card.dataset.diff || '';
    var styles = (card.dataset.style || '').split(' ');
    var diffOk = _fDiff === 'all' || diff === _fDiff;
    var styleOk = _fStyle === 'all' || styles.indexOf(_fStyle) !== -1;
    card.style.display = (diffOk && styleOk) ? '' : 'none';
  });
  var anyVis = false;
  document.querySelectorAll('.diff-section').forEach(function(sec) {
    var hasVis = false;
    sec.querySelectorAll('.civ-card').forEach(function(c) { if (c.style.display !== 'none') hasVis = true; });
    sec.style.display = hasVis ? '' : 'none';
    if (hasVis) anyVis = true;
  });
  var es = document.getElementById('guide-empty-state');
  if (es) es.style.display = anyVis ? 'none' : '';
}
function initStyleFilters() {
  if (typeof ALL_CIVS === 'undefined') return;
  ALL_CIVS.forEach(function(civ) {
    if (!civ.style) return;
    var favBtn = document.getElementById('gfav-' + civ.id);
    if (favBtn) {
      var card = favBtn.closest('.civ-card');
      if (card) card.setAttribute('data-style', civ.style);
    }
  });
}

// ── FAVORIS ──────────────────────────────────────────────────────────────────
function getFavs() { try { return JSON.parse(localStorage.getItem('aoe4_favs') || '[]'); } catch(e) { return []; } }
function saveFavs(arr) { try { localStorage.setItem('aoe4_favs', JSON.stringify(arr)); } catch(e) {} }
function toggleFav(id) {
  var f = getFavs(); var i = f.indexOf(id);
  if (i === -1) f.push(id); else f.splice(i, 1);
  saveFavs(f); updateFavBtns();
  showToast(i === -1 ? 'Ajoute aux favoris' : 'Retire des favoris');
}
function updateFavBtns() {
  var f = getFavs();
  document.querySelectorAll('.fav-btn').forEach(function(btn) {
    var id = btn.id.replace('fav-btn-', '');
    var on = f.indexOf(id) !== -1;
    btn.textContent = on ? '⭐' : '☆';
    btn.classList.toggle('active', on);
    btn.title = on ? 'Retirer des favoris' : 'Ajouter aux favoris';
  });
  document.querySelectorAll('.guide-fav-btn').forEach(function(btn) {
    var id = btn.id.replace('gfav-', '');
    var on = f.indexOf(id) !== -1;
    btn.textContent = on ? '⭐' : '☆';
    btn.classList.toggle('active', on);
    btn.title = on ? 'Retirer des favoris' : 'Ajouter aux favoris';
  });
}
function renderFavs() {
  var f = getFavs();
  var grid = document.getElementById('fav-grid');
  var empty = document.getElementById('fav-empty');
  if (!grid) return;
  if (!f.length) { if (empty) empty.style.display = 'block'; grid.innerHTML = ''; return; }
  if (empty) empty.style.display = 'none';
  var root = _root();
  grid.innerHTML = f.map(function(id) {
    var c = typeof CIV_FLAG_MAP !== 'undefined' ? CIV_FLAG_MAP[id] : null;
    if (!c) return '';
    var dlc = c.dlc ? '<span class="dlc-tag" style="font-size:.52rem;padding:1px 5px;">' + c.dlc + '</span>' : '';
    return '<div class="fav-card" onclick="navigate(\'' + id + '\')" style="cursor:pointer">' +
      '<button class="fav-remove" onclick="event.stopPropagation();removeFav(\'' + id + '\')">x</button>' +
      '<div class="fav-card-flag">' + c.flag + '</div>' +
      '<div class="fav-card-name">' + c.name + '</div>' +
      '<div class="fav-card-diff">' + c.diff + ' ' + dlc + '</div>' +
    '</div>';
  }).join('');
}
function removeFav(id) { saveFavs(getFavs().filter(function(f) { return f !== id; })); renderFavs(); updateFavBtns(); }

// ── GLOSSAIRE ────────────────────────────────────────────────────────────────
var _glossCat = 'all', _glossSearch = '';
function renderGloss() {
  var grid = document.getElementById('gloss-grid');
  if (!grid || typeof GLOSSARY === 'undefined') return;
  var q = _glossSearch.toLowerCase();
  var labels = {gen:'General', eco:'Economie', mil:'Militaire', tac:'Tactique'};
  grid.innerHTML = GLOSSARY.map(function(g) {
    var show = (_glossCat === 'all' || g.catid === _glossCat) && (!q || g.term.toLowerCase().indexOf(q) !== -1 || g.def.toLowerCase().indexOf(q) !== -1);
    var ex = g.cat ? '<div class="gloss-example">"' + g.cat + '"</div>' : '';
    return '<div class="gloss-card' + (show ? '' : ' hidden') + '">' +
      '<div class="gloss-term">' + g.term + '<span class="gloss-cat-tag ' + g.catid + '">' + (labels[g.catid] || g.catid) + '</span></div>' +
      '<div class="gloss-def">' + g.def + '</div>' + ex +
    '</div>';
  }).join('');
}
function filterGloss() { _glossSearch = (document.getElementById('gloss-search') || {}).value || ''; renderGloss(); }
function filterGlossCat(cat, btn) {
  _glossCat = cat;
  document.querySelectorAll('.gloss-cat').forEach(function(c) { c.classList.remove('active'); });
  btn.classList.add('active');
  renderGloss();
}

// ── PATCH NOTES ──────────────────────────────────────────────────────────────
var _patchesLoaded = false;
function togglePatch(h) { h.classList.toggle('open'); h.nextElementSibling.classList.toggle('open'); }
async function fetchPatches() {
  if (_patchesLoaded) return;
  _patchesLoaded = true;
  var box = document.getElementById('patch-container');
  var tEl = document.getElementById('patch-loaded-time');
  var fallback = [
    {version:'15.2.7380',name:'Hotfix - Torguud & Elephants',date:'4 dec. 2025',isNew:true,
      categories:[{title:'Balance',items:['Torguud - vitesse reduite','Worker Elephant - reequilibre']},
        {title:'Corrections',items:['Fix crash Crucible','Cursed Boons visuel']}],
      source:'https://www.ageofempires.com/news/'},
    {version:'15.1.6970',name:'Saison 12 - Dynasties of the East',date:'4 nov. 2025',
      categories:[{title:'Contenu',items:['Nouvelles civilisations orientales','PS5','Saison 12 ranked']}],
      source:'https://www.ageofempires.com/news/'},
    {version:'13.2.4553',name:'Saison 10 - Rise to Ruin',date:'mai 2025',
      categories:[{title:'Saisonnier',items:['Evenement Rise to Ruin','Nouvelles recompenses','Rotation maps']}],
      source:'https://www.ageofempires.com/news/'}
  ];
  function renderP(arr) {
    if (!box) return;
    box.innerHTML = arr.map(function(p, i) {
      return '<div class="patch-card">' +
        '<div class="patch-header ' + (i === 0 ? 'open' : '') + '" onclick="togglePatch(this)">' +
          '<span class="patch-version">' + p.version + '</span>' +
          (p.isNew ? '<span class="patch-new">RECENT</span>' : '') +
          '<span class="patch-name">' + p.name + '</span>' +
          '<span class="patch-date">' + p.date + '</span>' +
          '<svg class="patch-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 5l5 5 5-5"/></svg>' +
        '</div>' +
        '<div class="patch-body ' + (i === 0 ? 'open' : '') + '">' +
          (p.categories || []).map(function(c) {
            return '<div class="patch-category">' + c.title + '</div>' +
              '<ul class="patch-items">' + (c.items || []).map(function(it) { return '<li class="patch-item">' + it + '</li>'; }).join('') + '</ul>';
          }).join('') +
          (p.source ? '<div class="patch-source">Source - <a href="' + p.source + '" target="_blank">' + p.source + '</a></div>' : '') +
        '</div></div>';
    }).join('');
  }
  renderP(fallback);
  if (box) {
    var notice = document.createElement('div');
    notice.style.cssText = 'margin-top:1.5rem;padding:1rem 1.5rem;background:rgba(200,168,75,.06);border:1px solid rgba(200,168,75,.2);border-radius:6px;font-size:.9rem;color:var(--text-muted);';
    notice.innerHTML = 'Pour les derniers patch notes en temps reel, consultez le site officiel : <a href="https://www.ageofempires.com/news/" target="_blank" rel="noopener" style="color:var(--gold);text-decoration:underline;">ageofempires.com/news</a>';
    box.appendChild(notice);
  }
  if (tEl) tEl.textContent = 'Donnees de reference - voir ageofempires.com pour les mises a jour recentes';
}

// ── RETOURS VISUELS ──────────────────────────────────────────────────────────
function showToast(msg, dur) {
  var t = document.getElementById('hub-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(t._timer);
  t._timer = setTimeout(function() { t.classList.remove('visible'); }, dur || 2000);
}
function scrollToTop() { window.scrollTo({top:0, behavior:'smooth'}); }
function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function() { btn.classList.toggle('visible', window.scrollY > 300); }, {passive:true});
}

// ── ACCESSIBILITE ────────────────────────────────────────────────────────────
function initTextSize() {
  var saved = 'text-md';
  try { saved = localStorage.getItem('hub_text_size') || 'text-md'; } catch(e) {}
  document.body.classList.remove('text-sm','text-md','text-lg');
  document.body.classList.add(saved);
  document.querySelectorAll('.ts-btn').forEach(function(btn) { btn.classList.toggle('active', btn.dataset.size === saved); });
}
function setTextSize(size) {
  document.body.classList.remove('text-sm','text-md','text-lg');
  document.body.classList.add(size);
  try { localStorage.setItem('hub_text_size', size); } catch(e) {}
  document.querySelectorAll('.ts-btn').forEach(function(btn) { btn.classList.toggle('active', btn.dataset.size === size); });
}

// ── BO FOCUS ─────────────────────────────────────────────────────────────────
var _boFocusOpen = false;
function openBOFocus() {
  var ov = document.getElementById('bo-focus-overlay');
  if (!ov) return;
  var action = document.getElementById('bo-tc-action');
  var step = document.getElementById('bo-tc-step');
  var cd = document.getElementById('bo-countdown');
  var content = ov.querySelector('.bof-content');
  if (content) {
    content.innerHTML =
      '<div class="bof-step">' + (step ? step.textContent : '') + '</div>' +
      '<div class="bof-action">' + (action ? action.textContent : '') + '</div>' +
      '<div class="bof-cd">' + (cd ? cd.textContent : '') + 's</div>';
  }
  ov.classList.add('open');
  _boFocusOpen = true;
}
function closeBOFocus() {
  var ov = document.getElementById('bo-focus-overlay');
  if (ov) ov.classList.remove('open');
  _boFocusOpen = false;
}

// ── SON ──────────────────────────────────────────────────────────────────────
var _soundEnabled = true;
try { _soundEnabled = localStorage.getItem('hub_sound') !== 'off'; } catch(e) {}
function _playClick() {
  if (!_soundEnabled) return;
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = ctx.createOscillator(); var gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine'; osc.frequency.setValueAtTime(680, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(340, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.045, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.07);
    setTimeout(function() { try { ctx.close(); } catch(err) {} }, 300);
  } catch(e) {}
}
function toggleSound() {
  _soundEnabled = !_soundEnabled;
  try { localStorage.setItem('hub_sound', _soundEnabled ? 'on' : 'off'); } catch(e) {}
  var btn = document.getElementById('sound-toggle');
  if (btn) {
    btn.textContent = _soundEnabled ? '🔔' : '🔕';
    btn.setAttribute('aria-label', _soundEnabled ? 'Son : on' : 'Son : off');
    btn.classList.toggle('muted', !_soundEnabled);
  }
  showToast(_soundEnabled ? 'Son active' : 'Son desactive');
}
function initSoundToggle() {
  var btn = document.getElementById('sound-toggle');
  if (!btn) return;
  btn.textContent = _soundEnabled ? '🔔' : '🔕';
  btn.classList.toggle('muted', !_soundEnabled);
}
function initClickSounds() {
  document.addEventListener('click', function(e) {
    var el = e.target.closest('.dash-card,.nav-link,.fbtn,.civ-card,.tier-civ,.civ-nav-btn,.prog-btn');
    if (el) _playClick();
  }, {passive:true});
}

// ── RACCOURCIS CLAVIER ───────────────────────────────────────────────────────
function initKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (_boFocusOpen) { closeBOFocus(); return; }
      var nl = document.getElementById('nav-links');
      var hb = document.getElementById('nav-hamburger');
      if (nl) nl.classList.remove('open');
      if (hb) hb.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── PARTICULES + CONTENU CONTEXTUEL ─────────────────────────────────────────
function initParticles() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var hero = document.getElementById('dash-hero-particles');
  if (!hero) return;
  var wrap = document.createElement('div');
  wrap.className = 'particles-wrap';
  for (var i = 0; i < 18; i++) {
    var p = document.createElement('span');
    p.className = 'particle-gold';
    p.style.cssText = 'left:' + (Math.random() * 100).toFixed(1) + '%;' +
      'animation-delay:' + (Math.random() * 10).toFixed(2) + 's;' +
      'animation-duration:' + (7 + Math.random() * 6).toFixed(2) + 's;' +
      'width:' + (1.5 + Math.random() * 2.5).toFixed(1) + 'px;' +
      'height:' + (1.5 + Math.random() * 2.5).toFixed(1) + 'px;' +
      'opacity:' + (0.15 + Math.random() * 0.35).toFixed(2) + ';';
    wrap.appendChild(p);
  }
  hero.appendChild(wrap);
}
function renderQuote() {
  var el = document.getElementById('hub-quote');
  if (!el || typeof HUB_QUOTES === 'undefined') return;
  var q = HUB_QUOTES[Math.floor(Math.random() * HUB_QUOTES.length)];
  el.innerHTML = '<span class="hq-q">"' + q.text + '"</span> <span class="hq-author">&mdash; ' + q.author + '</span>';
}
function renderCivOfDay() {
  var el = document.getElementById('civ-du-jour');
  if (!el || typeof ALL_CIVS === 'undefined') return;
  var today = new Date().toDateString();
  var idx;
  try {
    var stored = JSON.parse(localStorage.getItem('hub_civday') || 'null');
    if (stored && stored.date === today) idx = stored.idx;
  } catch(e) {}
  if (idx === undefined || idx === null) {
    idx = Math.floor(Math.random() * ALL_CIVS.length);
    try { localStorage.setItem('hub_civday', JSON.stringify({date:today,idx:idx})); } catch(e) {}
  }
  var civ = ALL_CIVS[idx];
  if (!civ) return;
  var tip = (typeof CIV_TIPS !== 'undefined' && CIV_TIPS[civ.id]) || "Explore les landmarks uniques de cette civilisation pour trouver ton style.";
  el.innerHTML =
    '<div class="cjd-top"><span class="cjd-badge">CIV DU JOUR</span><span class="cjd-flag">' + civ.flag + '</span></div>' +
    '<div class="cjd-name">' + civ.name + '</div>' +
    '<div class="cjd-style">' + (civ.style || '') + '</div>' +
    '<div class="cjd-tip">' + tip + '</div>' +
    '<button class="cjd-cta" onclick="navigate(\'' + civ.id + '\')">Voir la fiche &rarr;</button>';
}
function renderNewBadges() {
  if (typeof RECENT_UPDATES === 'undefined') return;
  var now = new Date();
  Object.keys(RECENT_UPDATES).forEach(function(key) {
    var upd = new Date(RECENT_UPDATES[key]);
    if ((now - upd) / 86400000 > 14) return;
    var navLink = document.querySelector('.nav-link[href*="' + _PAGE_URLS[key] + '"]');
    if (navLink && !navLink.querySelector('.nav-new-badge')) {
      var b = document.createElement('span');
      b.className = 'nav-new-badge'; b.textContent = 'NEW';
      navLink.appendChild(b);
    }
    var card = document.querySelector('.dash-card[data-module="' + key + '"]');
    if (card && !card.querySelector('.card-new-badge')) {
      var b2 = document.createElement('span');
      b2.className = 'card-new-badge'; b2.textContent = 'Nouveau';
      card.appendChild(b2);
    }
  });
}

// ── PERFORMANCE ──────────────────────────────────────────────────────────────
function animateWinrates() {
  var hasPRM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.wr-count[data-target]').forEach(function(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    if (hasPRM) { el.textContent = target.toFixed(1) + '%'; return; }
    var t0 = null; var dur = 800;
    function step(ts) {
      if (!t0) t0 = ts;
      var prog = Math.min((ts - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - prog, 3);
      el.textContent = (target * ease).toFixed(1) + '%';
      if (prog < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}
function initLazyFade() {
  if (!window.IntersectionObserver) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('lazy-in'); obs.unobserve(e.target); }
    });
  }, {threshold:0.05, rootMargin:'60px 0px'});
  document.querySelectorAll('.civ-card,.tier-civ,.dash-card').forEach(function(el) {
    el.classList.add('lazy-fade'); obs.observe(el);
  });
}
function lazyObserveNew(selector) {
  if (!window.IntersectionObserver) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('lazy-in'); obs.unobserve(e.target); }
    });
  }, {threshold:0.05, rootMargin:'40px 0px'});
  document.querySelectorAll(selector).forEach(function(el) {
    if (!el.classList.contains('lazy-fade') && !el.classList.contains('lazy-in')) {
      el.classList.add('lazy-fade'); obs.observe(el);
    }
  });
}

// ── INIT COMMUN ──────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  _injectNav();
  initBackToTop();
  initTextSize();
  initSoundToggle();
  initClickSounds();
  initKeyboardShortcuts();
  initLazyFade();
  renderQuote();
  renderNewBadges();
  updateFavBtns();
});