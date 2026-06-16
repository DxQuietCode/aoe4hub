# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Lancer le site

Ouvrir `index.html` dans un navigateur, ou servir localement :

```powershell
python -m http.server 8000
```

## Structure des fichiers

```
css/style.css       — feuille de style unique, partagée par toutes les pages
js/main.js          — JS de index.html (routing SPA, favoris, glossaire, tier list, patches, team-up)
js/civ.js           — JS des pages civ standalone (onglets âge/tech, scroll-spy TOC)
index.html          — SPA principale : toutes les pages en panels .page-panel
guide.html          — grille des civilisations (standalone, liens HTML classiques)
civ-anglais.html    — fiche Anglais standalone
civ-francais.html   — fiche Français standalone
civ-mongols.html    — fiche Mongols standalone
```

## Architecture

### Deux modes de navigation

**1. SPA via index.html** — `navigate('anglais')` affiche le `<div id="page-anglais" class="page-panel">` embarqué. Toutes les 16 fiches civ (dont les 4 DLC : zhuxilegacy, ayyoubides, jeannedarc, ordresmoines) sont dans `index.html`. Le routeur met à jour le hash d'URL (`#anglais`).

**2. Pages standalone** — `civ-anglais.html`, `guide.html` etc. sont des fichiers indépendants accessibles directement.

Les deux coexistent. **Ajouter une nouvelle civ nécessite de l'ajouter dans les deux** si l'on veut couverture complète.

### CSS (`css/style.css`)

Variables de thème dans `:root` :
- Fond : `--bg`, `--surface`, `--surface2`
- Accentuation : `--gold`, `--gold-light`, `--gold-pale`
- Statut : `--green`, `--red`, `--blue`
- Texte : `--text`, `--text-muted`, `--text-dim`
- Bordures : `--border`, `--border-strong`

Ne jamais hardcoder les couleurs — toujours utiliser ces variables.

Le fichier contient quelques duplications internes résiduelles héritées de la fusion des styles par page (`.breadcrumb`, `.page-header`). La dernière définition prend effet, sans impact visuel.

### Routing SPA (`js/main.js`)

```js
const PAGE_IDS = ['home','guide','anglais','francais','hre','mongols','rus','abbasides',
  'ottomans','mali','byzantins','chine','delhi','japonais','tierlist','patches',
  'zhuxilegacy','ayyoubides','jeannedarc','ordresmoines'];

navigate(pid)   // affiche #page-{pid}, met à jour .nav-link.active, déclenche setupToc()
setupToc(pid)   // installe un scroll listener pour mettre en surbrillance les .toc-link
```

Init : `DOMContentLoaded` → `navigate(hash || 'home')`.

### Données embarquées dans `js/main.js`

- `ALL_CIVS[]` — 16 civilisations avec id, flag, nom, difficulté, DLC
- `GLOSSARY[]` — 38 termes (champs : `term`, `def`, `cat`=exemple, `catid`)
- `CIV_PROFILES{}` — rôles, style, phase par civ (pour Team-UP)
- `SYNERGIES[]` — 16 paires de synergies avec score /10

### Onglets âge et recherches

Utilisés dans index.html (via `js/main.js`) et dans les pages standalone (via `js/civ.js`). Les fonctions sont identiques :

```js
setAge(idx, btn)   // onglets troupes par âge — panels id="age-0" à "age-3"
setTech(idx, btn)  // onglets recherches — panels id="tech-0" à "tech-2"
```

Dans index.html, les panels des civs DLC ont des IDs préfixés pour éviter les conflits : `id="age-zhuxilegacy-0"`, etc.

### Favoris

Stockés dans `localStorage('aoe4_favs')` sous forme de tableau JSON de civ IDs. `updateFavBtns()` synchronise tous les boutons étoile du DOM après chaque changement.

### Patch notes

`fetchPatches()` appelle l'API Anthropic avec `web_search` pour charger les derniers patch notes depuis ageofempires.com. Un fallback statique (3 patches) est affiché en cas d'erreur réseau.

### Team-UP

État global : `tuMode` (2/4/6/8 joueurs total), `tuAlly[]`, `tuEnemy[]`. `analyzeTeam()` calcule 3 scores /10 (synergie, couverture de rôles, timing) et génère les stratégies recommandées.

## Ajouter une civilisation

1. Ajouter dans `ALL_CIVS`, `PAGE_IDS`, `PAGE_NAV`, `CIV_IDS_BY_NAME` dans `js/main.js`
2. Copier un `<div id="page-{civ}" class="page-panel">` dans `index.html` et adapter
3. Ajouter la carte dans `#page-guide` avec `onclick="navigate('{civ}')"`
4. Ajouter le profil dans `CIV_PROFILES` et les synergies pertinentes dans `SYNERGIES`
5. *(Optionnel)* Créer `civ-{nom}.html` standalone en copiant `civ-anglais.html`

## Règle critique — apostrophes dans les strings JS

Les strings JS délimités par `'...'` contenant des apostrophes françaises non échappées (`l'eau`, `d'accord`) **cassent silencieusement tout le JS** — page blanche. Ce bug a été déclenché plusieurs fois dans `SYNERGIES[].desc` et dans les messages inline.

**Règle** : tout string contenant du français utilise des guillemets doubles `"..."`.

```js
// Correct
{ desc: "L'adversaire ne peut défendre les deux flancs." }

// Interdit
{ desc: 'L'adversaire...' }  // parse error
```
