// AOE4 Hub - L'Epreuve
// Charge apres data.js et main.js

// ── SOUS-NAVIGATION EPREUVE ──────────────────────────────────────────────────
var EP_TAB_SECTIONS = {
  'planjeu':       ['ep-planjeu'],
  'presentation':  ['ep-presentation','ep-missions','ep-medailles','ep-modes','ep-difficultes'],
  'perks':         ['ep-perks'],
  'boons':         ['ep-boons'],
  'objectifs':     ['ep-objectifs'],
  'civguide':      ['ep-civguide']
};
function setEpTab(tabId) {
  document.querySelectorAll('.ep-section-panel').forEach(function(s) { s.classList.remove('ep-visible'); });
  var ids = EP_TAB_SECTIONS[tabId] || [];
  ids.forEach(function(id) { var el = document.getElementById(id); if (el) el.classList.add('ep-visible'); });
  document.querySelectorAll('.ep-subnav-btn').forEach(function(b) { b.classList.toggle('active', b.dataset.tab === tabId); });
  var top = document.getElementById('ep-subnav-anchor');
  if (top) top.scrollIntoView({behavior:'smooth', block:'start'});
}
function openEpCiv(civId) {
  var target = document.getElementById('epciv-' + civId);
  var isOpen = target && target.classList.contains('open');
  document.querySelectorAll('.ep-civ-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.ep-civ-panel').forEach(function(p) { p.classList.remove('open'); });
  if (!isOpen && target) {
    target.classList.add('open');
    var btn = document.querySelector('[data-civ="' + civId + '"]');
    if (btn) btn.classList.add('active');
    setTimeout(function() { target.scrollIntoView({behavior:'smooth', block:'nearest'}); }, 50);
  }
}

// ── PLAN DE JEU ──────────────────────────────────────────────────────────────
function _epPlanBoons(civ, diff, mapObj) {
  var set;
  if (diff.tier === 'easy') set = civ.boons_easy.slice();
  else if (diff.tier === 'mid') set = civ.boons_hard.slice();
  else set = civ.boons_expert.slice();
  if (diff.tier === 'expert' && set.indexOf("Reroll de Boon") === -1) {
    set.splice(1, 0, "Reroll de Boon");
    if (set.length > 6) set = set.slice(0, 6);
  }
  var html = '';
  set.forEach(function(b, i) {
    var isReroll = b === "Reroll de Boon";
    var why = civ.boon_why[b] || (isReroll ? "Indispensable en expert : corriger une selection defavorable change le resultat." : "Boon recommande pour cette combinaison.");
    html += '<div class="ep-plan-boon-row' + (isReroll ? ' ep-plan-boon-reroll' : '') + '">' +
      '<div class="ep-plan-boon-n">' + (i+1) + '</div>' +
      '<div class="ep-plan-boon-info">' +
        '<div class="ep-plan-boon-name">' + b + (isReroll ? ' <span style="font-family:Share Tech Mono,monospace;font-size:.6rem;color:var(--text-dim)">(Perk requis)</span>' : '') + '</div>' +
        '<div class="ep-plan-boon-why">' + why + '</div>' +
      '</div></div>';
  });
  return html;
}

function _epPlanPhases(civ, diff, mapObj) {
  var tier = diff.tier; var isOpen = mapObj.open_map; var hasCav = mapObj.cav_threat;
  var earlyEco, earlyMil, midFocus, midDef, lateFocus, lateDef;
  if (tier === 'easy') {
    earlyEco = "Priorite a l'economie : boom libre sans pression. Les vagues sont lentes.";
    earlyMil = "1 caserne ou ecurie suffit. " + civ.key_unit + " en production continue.";
    midFocus = "Monter en age Chateau. Diversifier les types d'unites.";
    midDef = "Construire 2-3 tours si besoin. Pas de murs urgents.";
    lateFocus = "Maximiser la production militaire et economique.";
    lateDef = "La Merveille est rarement en danger. Profiter du mode Sans Fin si debloque.";
  } else if (tier === 'mid') {
    earlyEco = "Equilibre eco/militaire : 60% eco, 40% militaire avant la minute 10.";
    earlyMil = "2 batiments de production. Defenses partielles avant la 3e vague.";
    midFocus = "Ligne de defense complete avant la minute 20. Murs en priorite.";
    midDef = "Rechercher les ameliorations defensives cles. " + civ.key_unit + " avec upgrades.";
    lateFocus = "Maintenir la production malgre les pertes. Reparer les murs entre les vagues.";
    lateDef = "La Merveille peut etre en danger apres 35 min. Garder des unites proches.";
  } else {
    earlyEco = "Defense en priorite : les defenses doivent etre en place AVANT la 1ere vague.";
    earlyMil = "Production militaire immediate. " + civ.key_unit + " en nombre suffisant avant 4 min.";
    midFocus = "Double enceinte si possible. Recherches defensives critiques avant minute 20.";
    midDef = "Identifier les percees et les colmater immediatement. Pas de trous dans la defense.";
    lateFocus = "Survie pure apres 30 min. Chaque unite perdue compte.";
    lateDef = "La Merveille sera sous pression continue. Garder toujours une reserve en arriere.";
  }
  var mapNote = isOpen ? " (carte ouverte : couverture 360 degres obligatoire)" : (hasCav ? " (menace cavalerie : Spearmen en soutien obligatoire)" : "");
  var h = '<div class="ep-plan-phases">';
  h += '<div class="ep-plan-phase early"><div class="ep-plan-phase-label">&#9889; Early Game</div><div class="ep-plan-phase-time">0 - 15 min</div><ul class="ep-plan-phase-items"><li>' + earlyEco + '</li><li>' + earlyMil + '</li>';
  if (tier !== 'easy') h += '<li>Construire les premieres defenses' + mapNote + '</li>';
  h += '</ul></div>';
  h += '<div class="ep-plan-phase mid"><div class="ep-plan-phase-label">&#9876; Mid Game</div><div class="ep-plan-phase-time">15 - 30 min</div><ul class="ep-plan-phase-items"><li>' + midFocus + '</li><li>' + midDef + '</li>';
  if (tier === 'hard' || tier === 'expert') h += '<li>Choisir les Boons defensifs en priorite si pas encore fait</li>';
  h += '</ul></div>';
  h += '<div class="ep-plan-phase late"><div class="ep-plan-phase-label">&#128293; Late Game</div><div class="ep-plan-phase-time">30 - 45 min</div><ul class="ep-plan-phase-items"><li>' + lateFocus + '</li><li>' + lateDef + '</li>';
  if (diff.id >= 5) h += '<li>Reparer les murs entre chaque vague : les PV des batiments font la difference</li>';
  h += '</ul></div>';
  h += '</div>';
  if (diff.tier === 'expert') {
    h += '<div class="ep-plan-conquerant"><div class="ep-plan-conquerant-title">&#9876; Specificites ' + diff.name + '</div><ul class="ep-plan-conquerant-items">';
    if (diff.id === 8) {
      h += '<li>Ressources reduites de 50% : chaque villageois compte double. Ne jamais avoir de villageois inactif.</li>';
      h += '<li>Trebuchets longue portee ennemis : les machines de siege adverses arrivent tot. Antisiege obligatoire.</li>';
      h += '<li>Harass de villageois permanent : garder 2-3 unites militaires en patrol autour des zones de recolte.</li>';
      h += '<li>Vagues quasi-continues apres 25 min : aucune pause de recuperation. La defense doit tenir seule.</li>';
    } else {
      h += '<li>Heros ennemis renforcent les vagues a partir de la minute 15 : les cibler en priorite.</li>';
      h += '<li>Unites geantes (elephants, catapultes) : utiliser les machines de siege ou les groupes de spearmen.</li>';
      h += '<li>Reroll de Boon indispensable : une selection defavorable sur cette difficulte compromet toute la run.</li>';
    }
    h += '</ul></div>';
  }
  return h;
}

function renderEpPlan() {
  var civId  = document.getElementById('ep-plan-civ').value;
  var mapKey = document.getElementById('ep-plan-map').value;
  var diffKey= document.getElementById('ep-plan-diff').value;
  var civ    = EP_CIV_PLANS[civId];
  var mapObj = EP_PLAN_MAPS[mapKey];
  var diff   = EP_PLAN_DIFFS[diffKey];
  if (!civ || !mapObj || !diff) return;
  var civData = ALL_CIVS.find(function(c) { return c.id === civId; }) || {};
  var result  = document.getElementById('ep-plan-result');
  var dPill = '<span class="ep-plan-diff-pill" style="border-color:' + diff.color + ';color:' + diff.color + '">' + diff.name.toUpperCase() + '</span>';
  result.querySelector('.ep-plan-header-flag').textContent = civ.flag || civData.flag || '🛡️';
  result.querySelector('.ep-plan-header-title').textContent = (civData.name || civId) + ' - ' + mapObj.name;
  result.querySelector('.ep-plan-header-meta').innerHTML = 'Ennemis : ' + diff.enemy + ' &nbsp;' + dPill;
  var boVills = civ.vills; var vStr = [];
  if (boVills.food > 0) vStr.push(boVills.food + ' sur nourriture');
  if (boVills.wood > 0) vStr.push(boVills.wood + ' sur bois');
  if (boVills.gold > 0) vStr.push(boVills.gold + ' sur or');
  if (boVills.stone > 0) vStr.push(boVills.stone + ' sur pierre');
  var ageStr = civ.age_at > 0 ? 'Monter en age Feodal a ' + civ.age_at + ' villageois' : 'Age up au timing habituel via Landmark';
  if (diff.tier === 'expert') ageStr += ' (ou plus tot si la pression est forte)';
  var boItems = ['Repartition de depart : ' + vStr.join(', '), ageStr].concat(civ.first_mil);
  var boHtml = '<ol class="ep-plan-bo">' + boItems.map(function(s){ return '<li>' + s + '</li>'; }).join('') + '</ol>';
  boHtml += '<div class="ep-plan-bo-note">' + civ.bo_note + '</div>';
  result.querySelector('#ep-plan-bo-content').innerHTML = boHtml;
  var civNote = mapObj.civ_notes[civ.style] || mapObj.def_line;
  var dirsHtml = mapObj.attacks.map(function(d){ return '<span class="ep-plan-dir-pill">' + d + '</span>'; }).join('');
  var defHtml = '<div class="ep-plan-def-dirs">' + dirsHtml + '</div><div class="ep-plan-def-line">' + mapObj.def_line + '</div>';
  if (mapObj.terrain) defHtml += '<div style="font-size:.83rem;color:var(--text-muted);margin-bottom:.5rem">' + mapObj.terrain + '</div>';
  defHtml += '<div class="ep-plan-def-civanote">' + civNote + '</div>';
  result.querySelector('#ep-plan-def-content').innerHTML = defHtml;
  result.querySelector('#ep-plan-boons-content').innerHTML = _epPlanBoons(civ, diff, mapObj);
  result.querySelector('#ep-plan-phases-content').innerHTML = _epPlanPhases(civ, diff, mapObj);
  result.classList.add('visible');
  setTimeout(function() { result.scrollIntoView({behavior:'smooth', block:'nearest'}); }, 80);
}

// ── INIT EPREUVE ─────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  setEpTab('planjeu');
});