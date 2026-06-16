// AOE4 Hub - JS specifique aux pages civ
// Charge apres data.js et main.js

// setAge et setTech sont dans main.js

// ── AGE PROGRESS BAR ─────────────────────────────────────────────────────────
function initAgeProgressBar() {
  if (document.querySelector('.age-prog-bar')) return;
  var ageTabs = document.querySelector('.age-tabs');
  if (!ageTabs) return;
  var bar = document.createElement('div');
  bar.className = 'age-prog-bar';
  bar.innerHTML = ['I','II','III','IV'].map(function(a, i) {
    return '<div class="apb-step" data-age="' + i + '">' +
      '<div class="apb-node"></div><div class="apb-lbl">Age ' + a + '</div>' +
    '</div>' + (i < 3 ? '<div class="apb-line"></div>' : '');
  }).join('');
  ageTabs.parentNode.insertBefore(bar, ageTabs);
  var tabs = ageTabs.querySelectorAll('.age-tab');
  function syncBar() {
    var activeIdx = 0;
    tabs.forEach(function(t, i) { if (t.classList.contains('active')) activeIdx = i; });
    bar.querySelectorAll('.apb-step').forEach(function(s, i) {
      s.classList.toggle('active', i === activeIdx);
      s.classList.toggle('past', i < activeIdx);
    });
    bar.querySelectorAll('.apb-line').forEach(function(l, i) {
      l.classList.toggle('filled', i < activeIdx);
    });
  }
  tabs.forEach(function(tab) { tab.addEventListener('click', function() { setTimeout(syncBar, 10); }); });
  syncBar();
}

// ── NOTES PERSONNELLES ───────────────────────────────────────────────────────
function initCivNotes(slug) {
  if (!slug) {
    // Detect slug from URL
    var parts = window.location.pathname.replace(/\\/g,'/').split('/');
    slug = parts[parts.length - 1].replace('.html', '');
  }
  var main = document.querySelector('.main');
  if (!main) return;
  var savedKey = 'notes-' + slug;
  var savedVal = '';
  try { savedVal = localStorage.getItem(savedKey) || ''; } catch(e) {}
  var section = document.createElement('div');
  section.className = 'civ-notes-section';
  section.innerHTML =
    '<div class="civ-notes-hdr">' +
      '<span class="civ-notes-icon">📝</span>' +
      '<span class="civ-notes-label">Notes personnelles</span>' +
      '<span class="civ-notes-saved" id="cns-' + slug + '"></span>' +
    '</div>' +
    '<textarea class="civ-notes-area" id="cna-' + slug + '"' +
      ' placeholder="Tes astuces, rappels et observations sur cette civilisation..."' +
      ' rows="4"></textarea>';
  var navBar = main.querySelector('.civ-nav-bar');
  if (navBar) { main.insertBefore(section, navBar); } else { main.appendChild(section); }
  var ta = section.querySelector('textarea');
  if (savedVal) ta.value = savedVal;
  var hideTimer = null;
  ta.addEventListener('input', function() {
    try { localStorage.setItem(savedKey, ta.value); } catch(e) {}
    var ind = document.getElementById('cns-' + slug);
    if (ind) {
      ind.textContent = 'Sauvegarde';
      ind.classList.add('visible');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function() { ind.classList.remove('visible'); }, 2500);
    }
    if (typeof showToast === 'function') showToast('Notes sauvegardees');
  });
}

// ── DLC PURCHASE BOX ─────────────────────────────────────────────────────────
function initDlcBox(slug) {
  if (!slug) {
    var parts = window.location.pathname.replace(/\\/g,'/').split('/');
    slug = parts[parts.length - 1].replace('.html', '');
  }
  if (typeof DLC_PURCHASE === 'undefined' || !DLC_PURCHASE[slug]) return;
  var info = DLC_PURCHASE[slug];
  var main = document.querySelector('.main');
  if (!main) return;
  var box = document.createElement('div');
  box.className = 'dlc-buy-box dlc-buy-' + info.theme;
  box.innerHTML =
    '<div class="dlc-buy-left">' +
      '<div class="dlc-buy-tag dlc-tag-' + info.theme + '">DLC requis</div>' +
      '<div class="dlc-buy-name dlc-name-' + info.theme + '">' + info.name + '</div>' +
      '<div class="dlc-buy-desc">' + info.desc + '</div>' +
    '</div>' +
    '<a class="dlc-buy-btn dlc-btn-' + info.theme + '" href="' + info.url + '"' +
      ' target="_blank" rel="noopener noreferrer">' +
      '<span class="dlc-buy-btn-icon">🛒</span>' +
      '<span>Obtenir sur Steam</span>' +
    '</a>';
  var navBar = main.querySelector('.civ-nav-bar');
  if (navBar) { main.insertBefore(box, navBar); } else { main.appendChild(box); }
}

// ── INIT CIV PAGE ────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  setupToc();
  initAgeProgressBar();
  initDlcBox();
  initCivNotes();
  updateFavBtns();
});
