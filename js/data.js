// AOE4 Hub - Donnees centralisees
// Ce fichier est importe par toutes les pages

// ── CIVILISATIONS ──────────────────────────────────────────────────────────────
const ALL_CIVS = [
  {id:'anglais',   flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', name:'Anglais',               diff:'Débutant',        dlc:false, style:'defense boom'},
  {id:'francais',  flag:'⚜️',  name:'Français',              diff:'Débutant',        dlc:false, style:'agressif flexible'},
  {id:'hre',       flag:'🦅',  name:'Saint-Empire',           diff:'Facile',          dlc:false, style:'defense boom'},
  {id:'mongols',   flag:'🏹',  name:'Mongols',                diff:'Intermédiaire',   dlc:false, style:'agressif'},
  {id:'rus',       flag:'🪶',  name:'Rus',                    diff:'Intermédiaire',   dlc:false, style:'agressif economique'},
  {id:'abbasides', flag:'🌙',  name:'Abbasides',              diff:'Intermédiaire',   dlc:false, style:'economique flexible'},
  {id:'ottomans',  flag:'🌺',  name:'Ottomans',               diff:'Intermédiaire',   dlc:false, style:'defense boom'},
  {id:'mali',      flag:'🌞',  name:'Mali',                   diff:'Intermédiaire',   dlc:false, style:'economique boom'},
  {id:'byzantins', flag:'🔱',  name:'Byzantins',              diff:'Intermédiaire',   dlc:false, style:'defense flexible'},
  {id:'chine',     flag:'🐉',  name:'Chine',                  diff:'Avancé',          dlc:false, style:'boom flexible'},
  {id:'delhi',     flag:'🐘',  name:'Delhi Sultanat',         diff:'Avancé',          dlc:false, style:'boom defense'},
  {id:'japonais',  flag:'🌸',  name:'Japonais',               diff:'Avancé',          dlc:false, style:'agressif flexible'},
  {id:'zhuxilegacy',flag:'🏯', name:'Héritage de Zhu Xi',    diff:'Avancé',          dlc:'Dynasties of the East', style:'boom economique'},
  {id:'ayyoubides',flag:'⚔️',  name:'Ayyoubides',             diff:'Facile',          dlc:'Sultans Ascend', style:'agressif'},
  {id:'jeannedarc',flag:'⚜️🔥',name:"Jeanne d'Arc",           diff:'Facile',          dlc:"Jeanne d'Arc", style:'agressif flexible'},
  {id:'ordresmoines',  flag:'✝️',  name:'Ordre du Dragon',      diff:'Intermédiaire',   dlc:'The Sultans Ascend', style:'defense'},
  {id:'templiers',     flag:'✝️⚔️',name:'Templiers',             diff:'Expert',          dlc:'Knights of Cross and Rose', style:'defense agressif'},
  {id:'lancaster',     flag:'🌹',  name:'Lancaster',              diff:'Facile',          dlc:'Knights of Cross and Rose', style:'defense boom'},
  {id:'hordedor',      flag:'🐎',  name:"Horde d'Or",             diff:'Avancé',          dlc:'Dynasties of the East', style:'agressif'},
  {id:'macedonienne',  flag:'⚡',  name:'Macédonienne',           diff:'Expert',          dlc:'Dynasties of the East', style:'defense agressif'},
  {id:'sengokudaimyo', flag:'⛩️', name:'Sengoku Daimyo',          diff:'Expert',          dlc:'Dynasties of the East', style:'agressif flexible'},
  {id:'tughluq',       flag:'🕌',  name:'Tughluq',                diff:'Intermédiaire',   dlc:'Dynasties of the East', style:'boom defense'},
  {id:'jindynasty',    flag:'🏮',  name:'Dynastie Jin',           diff:'Expert',          dlc:"Yue Fei's Legacy", style:'defense agressif'},
];
const CIV_FLAG_MAP = Object.fromEntries(ALL_CIVS.map(c=>[c.id,{flag:c.flag,name:c.name,diff:c.diff,dlc:c.dlc}]));
const GLOSSARY = [{term:'APM',def:"Actions Par Minute - Nombre d'actions effectuées par minute (clics, raccourcis). Un indicateur de vitesse d'exécution. En AOE4, 60-80 APM est correct pour débuter en ligne.",cat:'Plus ton APM est élevé, plus tu peux gérer simultanément économie et armée.',catid:'gen'},{term:'ELO',def:'Système de classement numérique. Plus tu gagnes, plus ton ELO monte. En AOE4 : Bronze (0-999), Argent (1000-1199), Or (1200-1399), Platine (1400-1599), Diamant (1600+), Conqueror (top %).',cat:'Atteindre 1200 ELO est un excellent objectif pour un joueur qui commence le ranked.',catid:'gen'},{term:'Meta',def:"L'ensemble des stratégies, civilisations et compositions d'armée considérées comme les plus efficaces à un instant donné. Change après chaque patch.",cat:'En saison 13, les Mongols et Japonais sont très forts dans la meta actuelle.',catid:'gen'},{term:'Ranked',def:'Mode classé où les victoires et défaites affectent ton ELO. Opposite de Quick Match (non classé).',cat:'Joue en Quick Match pour pratiquer sans pression, puis passe au Ranked quand tu te sens prêt.',catid:'gen'},{term:'BO',def:"Build Order - Séquence précise d'actions à effectuer depuis le début de la partie pour atteindre un objectif économique ou militaire optimal.",cat:'Apprendre 1 seul BO par coeur est la chose la plus importante pour progresser.',catid:'gen'},{term:'Replay',def:"Enregistrement d'une partie permettant de la revoir depuis n'importe quel point de vue. Outil d'analyse crucial pour progresser.",cat:'Regarde tes replays après chaque défaite - identifie le moment exact où tu as pris du retard.',catid:'gen'},{term:'Map Pool',def:'Ensemble des cartes disponibles en ranked pour une saison donnée. Change chaque saison.',cat:'',catid:'gen'},{term:'Patch',def:'Mise à jour du jeu modifiant les statistiques, mécaniques ou contenu. Change souvent la meta.',cat:'',catid:'gen'},{term:'Boom',def:'Stratégie consistant à maximiser la production économique (villageois, ressources) avant de produire une armée significative.',cat:"Je vais boom jusqu'à l'âge 3 avant de push.",catid:'eco'},{term:'Fast Castle',def:"Monter rapidement à l'âge Château (âge 3) avec un minimum de ressources dépensées. Sacrifie la défense précoce pour le timing.",cat:'Fast Castle avec les Français pour sortir des Knights très tôt.',catid:'eco'},{term:'Fast Imperial',def:"Monter à l'âge Impérial (âge 4) le plus vite possible, souvent au détriment de l'armée mid-game.",cat:'',catid:'eco'},{term:'Villager',def:"Terme anglais pour villageois. 'Ne jamais stopper la production de vills' est une règle d'or.",cat:'Toujours requeue (relancer la production) tes vills en TC.',catid:'eco'},{term:'TC',def:'Town Center - Centre-Ville. Bâtiment principal qui produit les villageois. Avoir plusieurs TC accélère énormément la production économique.',cat:'Double TC en Féodal = économie qui explose en âge 3.',catid:'eco'},{term:'Idle Time',def:"Temps pendant lequel un bâtiment de production ne produit rien. Minimiser l'idle TC time (TC sans produire) est crucial.",cat:"Mon TC était idle pendant 2 minutes - j'aurais pu produire 6 villageois de plus.",catid:'eco'},{term:'Food/Wood/Gold/Stone',def:"Les 4 ressources du jeu. La nourriture sert aux villageois et unités, le bois aux bâtiments, l'or aux unités militaires et recherches, la pierre aux défenses.",cat:'',catid:'eco'},{term:'Mining Camp / Lumber Camp',def:"Camps de ressources à construire près des gisements d'or/de bois pour que les villageois déposent les ressources plus vite.",cat:'Toujours construire le camp au plus proche de la ressource.',catid:'eco'},{term:'Trade',def:"Commerce - envoyer des Traders sur les routes commerciales pour générer de l'or passif sans miner.",cat:"Les Français avec 6 Traders en âge 3 ont une économie d'or inarrêtable.",catid:'eco'},{term:'Micro',def:'Micro-gestion - Contrôle précis des unités individuelles en combat (focus fire, kiting, retraite).',cat:'Le micro des Mangudai Mongols est très difficile à maîtriser.',catid:'mil'},{term:'Macro',def:"Macro-gestion - Gestion globale de la partie : économie, production, expansion, montée d'âge.",cat:"Même avec un mauvais micro, un bon macro suffit pour monter d'ELO.",catid:'mil'},{term:'Spam',def:"Produire un maximum d'unités du même type en continu depuis plusieurs bâtiments.",cat:'Spam des Man-at-Arms depuis 3 casernes pendant le push.',catid:'mil'},{term:'Counter',def:'Unité ou stratégie qui bat directement une autre. Ex : Spearman counter la cavalerie.',cat:'Les Camels Abbasides counter parfaitement le Royal Knight français.',catid:'mil'},{term:'Kiting',def:'Attaquer en reculant pour faire des dégâts tout en évitant les coups en retour. Très utilisé avec les archers.',cat:"Le Longbowman en kiting est presque impossible à tuer pour de l'infanterie.",catid:'mil'},{term:'Focus Fire',def:'Concentrer les tirs de toutes les unités sur une seule cible pour la tuer rapidement.',cat:'Focus fire sur le Khan Mongol en premier - il inspire les troupes autour.',catid:'mil'},{term:'Raider',def:"Unité ou groupe d'unités envoyé harceler les villageois ennemis plutôt que d'attaquer frontalement.",cat:'Envoyer 2-3 Horsemen raider les villageois pendant que tu continues de boomer.',catid:'mil'},{term:'All-in',def:'Stratégie consistant à tout miser sur une attaque décisive sans plan B. Si ça échoue, la partie est perdue.',cat:"Rush Féodal all-in avec 10 Man-at-Arms - si l'adversaire défend, tu as perdu.",catid:'tac'},{term:'Rush',def:"Attaque très précoce visant à détruire l'adversaire avant qu'il n'ait le temps de s'installer.",cat:'Feudal rush avec les Anglais - Longbowmen dès la minute 5.',catid:'tac'},{term:'Timing Attack',def:"Attaque lancée à un moment précis pour exploiter une fenêtre de vulnérabilité adverse (pendant qu'il monte d'âge, avant ses upgrades).",cat:"Timing attack à la minute 8 juste avant qu'il finisse son TC 2.",catid:'tac'},{term:'Contain',def:"Contrôler l'espace autour de la base adverse pour limiter son expansion et l'accès aux ressources.",cat:"Mettre des tours au milieu de la carte pour contain l'adversaire dans sa base.",catid:'tac'},{term:'Map Control',def:'Contrôle de la carte - occuper les zones de ressources stratégiques, les reliques, les positions élevées.',cat:'Les Mongols prennent le map control très tôt grâce à leur mobilité.',catid:'tac'},{term:'Forward Base',def:'Base avancée construite près de la base ennemie pour réduire le temps de trajet des unités attaquantes.',cat:"Forward TC avec les Mali - construction 2x plus rapide, c'est difficile à stopper.",catid:'tac'},{term:'Wall',def:"Murs de palissade ou de pierre construits pour bloquer les rushes et canaliser l'attaque ennemie.",cat:'Wall + Longbowmen derrière = défense presque impénétrable pour les Anglais.',catid:'tac'},{term:'Siege',def:'Machines de siège (Trébuchet, Springald, Bombard) utilisées pour détruire les bâtiments et murs ennemis.',cat:"Pousser sans siège contre une base wallée c'est suicidaire.",catid:'tac'},{term:'Push',def:"Avancer avec son armée vers la base ennemie pour détruire des structures ou éliminer l'adversaire.",cat:'',catid:'tac'},{term:'Scout',def:'Unité légère servant à explorer la carte et repérer la stratégie adverse le plus tôt possible.',cat:"Scouter l'adversaire à la minute 1-2 pour savoir sa civ et son ouverture.",catid:'tac'},{term:'Snipe',def:"Tuer une unité clé adverse isolée (Khan, Scholar, Prélat, Jeanne d'Arc) pour perturber son économie.",cat:'Sniper le Khan Mongol avec un Springald change complètement la bataille.',catid:'tac'},{term:'Deathball',def:'Grande armée regroupée en boule dense - très puissante mais vulnérable aux Springalds et Trebuchets.',cat:'',catid:'tac'},{term:'Age Up',def:"Monter d'âge - passer de l'âge Sombre au Féodal, Féodal au Château, etc.",cat:'Age up avec 20 villageois pour un boom confortable.',catid:'tac'},{term:'Landmark',def:"Bâtiment spécial choisi à chaque montée d'âge, donnant des bonus uniques selon la civilisation.",cat:'Le Council Hall anglais rend les Longbowmen 2x plus rapides à produire.',catid:'tac'}];
const CIV_IDS_BY_NAME = {
  'english':'anglais','french':'francais','hre':'hre',
  'holy_roman_empire':'hre',
  'mongols':'mongols',
  'rus':'rus',
  'abbasid':'abbasides','abbasid_dynasty':'abbasides',
  'ottomans':'ottomans','malians':'mali',
  'byzantines':'byzantins','chinese':'chine',
  'delhi':'delhi','delhi_sultanate':'delhi',
  'japanese':'japonais',
  'zhu_xi':'zhuxilegacy','zhu_xis_legacy':'zhuxilegacy',
  'ayyubids':'ayyoubides','jeanne_darc':'jeannedarc',
  'order_of_the_dragon':'ordresmoines',
  'templars':'templiers','knights_templar':'templiers',
  'lancaster':'lancaster','house_of_lancaster':'lancaster',
  'golden_horde':'hordedor',
  'macedonian':'macedonienne','macedonian_dynasty':'macedonienne',
  'sengoku':'sengokudaimyo','sengoku_daimyo':'sengokudaimyo',
  'tughluq':'tughluq','tughlaq_dynasty':'tughluq',
  'jin_dynasty':'jindynasty'
};

// ── TIER LIST STATIQUE ──────────────────────────────────────────────────────────

const TL_STATIC_TIERS = {
  anglais:'C', francais:'A', hre:'D', mongols:'S', rus:'A',
  abbasides:'B', ottomans:'C', mali:'B', byzantins:'A', chine:'D',
  delhi:'A', japonais:'A',
  zhuxilegacy:'A', ayyoubides:'A', jeannedarc:'B', ordresmoines:'A',
  templiers:'S', lancaster:'B', hordedor:'S', macedonienne:'A', sengokudaimyo:'D',
  tughluq:'B', jindynasty:'B'
};

// ── EPREUVE ─────────────────────────────────────────────────────────────────────
var EP_PLAN_MAPS={
  'cote':{name:"Cote Contestee",icon:"🌊",attacks:["Sud","Sud-Est"],terrain:"Falaises et criques - couloirs naturels canalisant les vagues vers un seul axe",def_line:"Defenses en ligne compacte sur le flanc Sud. Les falaises bloquent les angles : inutile de couvrir 360 degres.",threat:"infanterie + archers",cav_threat:false,open_map:false,
    civ_notes:{passive_tower:"Parfait pour les tours : 1 ligne de defenses couvre le seul couloir d'approche.",cavalry:"Les Knights bloquent le couloir sans se faire deborder - avantage de terrain majeur.",mobile:"Deployer la base face au Sud - aucun repli necessaire.",siege:"Mangonels en hauteur dominant le couloir Sud = zone de mort totale.",regen:"Defense concentree : la Merveille regenere toute la run sans etre frappee des flancs.",eco_boom:"1 axe seulement : securiser le flanc Sud et boomer librement par derriere."}},
  'vallee':{name:"Vallee Sacree",icon:"🌲",attacks:["Est","Nord-Est"],terrain:"Forets denses avec chemins etroits - chaque passage est un goulot naturel",def_line:"1 tour par passage suffit. Les forets bloquent la cavalerie ennemie : privilegier infanterie et archers de zone.",threat:"mixte avec embuscades",cav_threat:false,open_map:false,
    civ_notes:{passive_tower:"Les tours dans les passages sont inarretables - 100% du flux ennemi passe dessous.",cavalry:"La foret ralentit les ennemis - vos Knights chargent dans les couloirs avec plein avantage.",mobile:"Deployer face Est pour couvrir les passages principaux.",siege:"Mangonels dans les couloirs : degats de zone maximaux sur les vagues canalisees.",regen:"Les arbres ralentissent les vagues - plus de temps de regen entre les assauts.",eco_boom:"Forets = bouclier naturel sur les flancs. Boomer librement sur la moitie securisee."}},
  'steppes':{name:"Steppes Brulantes",icon:"🏜️",attacks:["Tous les cotes - exposition 360 degres"],terrain:"Plaines ouvertes sans protection naturelle - la map la plus difficile de L'Epreuve",def_line:"Defense concentrique obligatoire : 2 cercles de murs minimum. Cavalerie mobile indispensable pour couvrir tous les flancs.",threat:"cavalerie massive",cav_threat:true,open_map:true,
    civ_notes:{passive_tower:"Probleme de couverture : 6+ tours requises pour couvrir 360 degres. Tres couteux.",cavalry:"Map parfaite pour la cavalerie : interception depuis la base centrale vers tous les flancs.",mobile:"Civ ideale pour les Steppes : aucune defense concentrique rigide necessaire.",siege:"Siege en position centrale tirant a 360 degres - protection rapprochee obligatoire.",regen:"Map la plus dangereuse pour la regen : les vagues n'arretent jamais sur aucun flanc.",eco_boom:"Eco sous pression permanente : production rapide d'unites en priorite sur le boom."}},
  'desert':{name:"Remparts du Desert",icon:"⛩️",attacks:["Nord","Ouest"],terrain:"Ruines et sable avec couverts naturels - les ruines servent de murs gratuits",def_line:"Utiliser les ruines comme premiere ligne de defense. Combler les gaps entre ruines avec des murs. Machines de siege ennemies apparaissent tot.",threat:"infanterie + machines de siege",cav_threat:false,open_map:false,
    civ_notes:{passive_tower:"Tours sur les ruines : portee naturellement elevee grace a la hauteur des decombres.",cavalry:"Cavalerie en embuscade depuis les ruines : charge devastatrice sur les approches ennemies.",mobile:"Deployer sur les ruines en position elevee : Mongols dominent naturellement ce terrain.",siege:"Mangonels en hauteur sur les ruines : portee de tir encore amplifiee.",regen:"2 axes seulement : la Merveille regenere facilement entre les vagues Nord et Ouest.",eco_boom:"2 flancs a defendre : concentrer les ressources sur les deux axes Nord et Ouest."}}
};
var EP_PLAN_DIFFS={
  'facile':{name:"Facile",id:1,tier:"easy",color:"#5abf7a",enemy:"sans armure, espacees"},
  'inter':{name:"Intermediaire",id:2,tier:"easy",color:"#7ac870",enemy:"+10% PV, frequence normale"},
  'hard':{name:"Hard",id:3,tier:"mid",color:"#c8a830",enemy:"armure de base, compositions mixtes"},
  'hardest':{name:"Hardest",id:4,tier:"mid",color:"#d09020",enemy:"sous-officiers ennemis, cavalerie lourde"},
  'ridiculous':{name:"Ridiculous",id:5,tier:"hard",color:"#e07020",enemy:"+25% PV et degats, groupes d'elite"},
  'outrageous':{name:"Outrageous",id:6,tier:"hard",color:"#e05010",enemy:"double front possible, siege ennemi tot"},
  'absurde':{name:"Absurde",id:7,tier:"expert",color:"#e04040",enemy:"heros ennemis, unites geantes"},
  'conquerant':{name:"Conquerant",id:8,tier:"expert",color:"#c0102a",enemy:"+60% PV, +40% degats, vagues quasi-continues",special:true}
};
var EP_CIV_PLANS={
  'anglais':{flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",style:'passive_tower',vills:{food:6,wood:3,gold:2,stone:0},age_at:14,first_mil:["Council Hall (Feodal - 1er Landmark)","2 tours de guet en arc devant la Merveille","Camp bois pres des arbres les plus proches"],key_unit:"Longbowman",bo_note:"Le Council Hall double la vitesse de production des Longbowmen. Priorite absolue au Feodal.",boons_easy:["Recolte Intensive","Bastions de Pierre","Forge de Guerre","Murs Renforcees","Boon Bonus"],boons_hard:["Bastions de Pierre","Murs Renforcees","Forge de Guerre","Armure Lourde","Boon Bonus"],boons_expert:["Bastions de Pierre","Murs Renforcees","Armure Lourde","Regeneration de la Merveille","Boon Bonus"],boon_why:{"Recolte Intensive":"Economie solide pour produire des Longbowmen en continu via le Council Hall.","Bastions de Pierre":"Tours Anglaises avec +50% portee : le Network of Castles devient devastateur.","Forge de Guerre":"Longbowmen +20% degats + Network of Castles : les groupes fondent avant impact.","Murs Renforcees":"Canaliser les vagues vers les zones de tir des tours et Longbowmen.","Armure Lourde":"Longbowmen en kite avec -25% degats recus : quasiment invulnerables.","Regeneration de la Merveille":"Defense passive = la Merveille regenere entre chaque vague.","Boon Bonus":"6e slot pour consolider le set a 50 minutes."}},
  'francais':{flag:"⚜️",style:'cavalry',vills:{food:5,wood:4,gold:2,stone:0},age_at:14,first_mil:["Royal Institute (Feodal)","Ecurie -> Royal Knights en continu","1 caserne Spearmen (counter cavalerie adverse)"],key_unit:"Royal Knight",bo_note:"Monter rapidement en Feodal pour les Royal Knights. La charge a plein speed est l'arme principale.",boons_easy:["Recolte Intensive","Chevaliers d'Elite","Forge de Guerre","Caserne Acceleree","Boon Bonus"],boons_hard:["Chevaliers d'Elite","Forge de Guerre","Caserne Acceleree","Murs Renforcees","Boon Bonus"],boons_expert:["Chevaliers d'Elite","Forge de Guerre","Bastions de Pierre","Armure Lourde","Boon Bonus"],boon_why:{"Chevaliers d'Elite":"Royal Knights +30% PV et +20% vitesse : charge inarretable.","Forge de Guerre":"Charge a +20% degats one-shot les unites legeres avant impact sur la Merveille.","Caserne Acceleree":"Flux continu de Knights : les pertes compensees en 30 secondes.","Recolte Intensive":"Financer la production continue de cavalerie lourde.","Murs Renforcees":"Canaliser les vagues pour que les Knights chargent en couloir.","Bastions de Pierre":"Tours en soutien pour les angles que les Knights ne couvrent pas.","Armure Lourde":"Royal Knights avec -25% degats recus en expert : indestructibles.","Boon Bonus":"6e slot pour ajuster en fin de run."}},
  'hre':{flag:"🦅",style:'passive_tower',vills:{food:6,wood:3,gold:2,stone:0},age_at:16,first_mil:["Chapelle -> 1 Prelat immediat","Burgrave Palace ou Meinwerk (Feodal)","2 tours de guet"],key_unit:"Landsknecht",bo_note:"Prelat en priorite absolue : +20% eco permanent qui accelere tout le BO. Age up a 16 vills grace au boost.",boons_easy:["Recolte Intensive","Murs Renforcees","Bastions de Pierre","Forge de Guerre","Boon Bonus"],boons_hard:["Recolte Intensive","Bastions de Pierre","Murs Renforcees","Forge de Guerre","Boon Bonus"],boons_expert:["Bastions de Pierre","Murs Renforcees","Armure Lourde","Regeneration de la Merveille","Boon Bonus"],boon_why:{"Recolte Intensive":"Prelat + Boon : revenus quasi-doubles. Les ressources ne sont plus jamais un probleme.","Bastions de Pierre":"Tours HRE a cout reduit + portee +50% : ligne de defense quasi gratuite.","Murs Renforcees":"Burgrave Palace + murs PV x2 = forteresse impenetrable.","Forge de Guerre":"Landsknecht +20% degats AoE : les vagues denses disparaissent en secondes.","Armure Lourde":"Landsknecht en front avec -25% degats : tiennent indefiniment.","Regeneration de la Merveille":"Defense statique du HRE = Merveille regenere constamment.","Boon Bonus":"6e slot : ajustement en fin de run."}},
  'mongols':{flag:"🏹",style:'mobile',vills:{food:6,wood:3,gold:2,stone:0},age_at:14,first_mil:["Base deployee en position centrale","2 Ecuries -> Mangudai en continu","Khan avec l'armee en permanence"],key_unit:"Mangudai",bo_note:"Deployer la base au centre. Observer la 1ere vague et adapter. Replier si une direction est dominante.",boons_easy:["Recolte Intensive","Chevaliers d'Elite","Forge de Guerre","Cache de Ressources","Boon Bonus"],boons_hard:["Chevaliers d'Elite","Forge de Guerre","Recolte Intensive","Bastions de Pierre","Boon Bonus"],boons_expert:["Chevaliers d'Elite","Forge de Guerre","Bastions de Pierre","Murs Renforcees","Boon Bonus"],boon_why:{"Chevaliers d'Elite":"Mangudai +30% PV : kite indefini, pertes quasi-nulles.","Forge de Guerre":"Bonus immediat en unites + Mangudai amplifient leurs fleches.","Recolte Intensive":"La base mobile recolte moins bien : ce Boon compense le deficit eco.","Cache de Ressources":"Reserve pour les periodes de transition lors du repli/redeploi.","Bastions de Pierre":"Tours fixes comme ancres quand le kite ne suffit plus.","Murs Renforcees":"Minimum de murs pour les vagues qui percent le kite.","Boon Bonus":"6e slot."}},
  'rus':{flag:"🪶",style:'cavalry',vills:{food:5,wood:3,gold:2,stone:0},age_at:14,first_mil:["2 eclaireurs en chasse immediate","Fort en avant-poste (position avancee)","Ecurie -> Horse Archers"],key_unit:"Horse Archer",bo_note:"Les ressources de chasse accelerent tout le BO. Fort en 2e ligne independante de la base principale.",boons_easy:["Commerce Royal","Recolte Intensive","Caserne Acceleree","Bastions de Pierre","Boon Bonus"],boons_hard:["Bastions de Pierre","Caserne Acceleree","Commerce Royal","Murs Renforcees","Boon Bonus"],boons_expert:["Bastions de Pierre","Murs Renforcees","Forge de Guerre","Armure Lourde","Boon Bonus"],boon_why:{"Commerce Royal":"Se cumule avec la chasse passive : revenus en or inarretables.","Recolte Intensive":"Amplifier les revenus deja boostes par la chasse.","Caserne Acceleree":"Horse Archers depuis le Fort en flux ininterrompu.","Bastions de Pierre":"Fort + tours adjacentes + portee +50% = bastion inexpugnable.","Murs Renforcees":"2e ligne derriere le Fort pour les percees.","Forge de Guerre":"Streltsy (expert) + Boon = DPS anti-blindage record.","Armure Lourde":"Horse Archers en kite avec -25% degats recus.","Boon Bonus":"6e slot."}},
  'abbasides':{flag:"🌙",style:'eco_boom',vills:{food:6,wood:3,gold:2,stone:0},age_at:15,first_mil:["House of Wisdom -> Preservation of Knowledge","Granary + Mill","Ecuries -> Camels de guerre"],key_unit:"Camel de guerre",bo_note:"Preservation of Knowledge en priorite : toutes les recherches coutent moins pour toute la run.",boons_easy:["Recolte Intensive","Cache de Ressources","Murs Renforcees","Forge de Guerre","Boon Bonus"],boons_hard:["Murs Renforcees","Recolte Intensive","Bastions de Pierre","Forge de Guerre","Boon Bonus"],boons_expert:["Murs Renforcees","Bastions de Pierre","Armure Lourde","Regeneration de la Merveille","Boon Bonus"],boon_why:{"Recolte Intensive":"Granary + Boon = revenus alimentaires qui financent toutes les recherches.","Cache de Ressources":"Compenser les pics lors des transitions entre ailes.","Murs Renforcees":"Strategie statique : murs PV x2 + recherches defensives.","Bastions de Pierre":"Tours upgradees moins cher grace a Preservation of Knowledge.","Forge de Guerre":"Camels +20% degats : excellents contre la cavalerie des vagues.","Armure Lourde":"Camels avec -25% degats : quasiment invulnerables en front.","Regeneration de la Merveille":"Defense statique = Merveille regenere constamment.","Boon Bonus":"6e slot."}},
  'ottomans':{flag:"🌺",style:'eco_boom',vills:{food:0,wood:4,gold:0,stone:3},age_at:0,first_mil:["Grand Bazaar (priorite 1 absolue)","Military School en avant-poste","Caserne -> Janissaires"],key_unit:"Janissaire",bo_note:"Les vills se produisent seuls via le Bazaar. Assigner les vills manuels au bois et a la pierre uniquement. 0 micro eco.",boons_easy:["Commerce Royal","Caserne Acceleree","Cache de Ressources","Murs Renforcees","Boon Bonus"],boons_hard:["Caserne Acceleree","Commerce Royal","Murs Renforcees","Bastions de Pierre","Boon Bonus"],boons_expert:["Caserne Acceleree","Bastions de Pierre","Murs Renforcees","Armure Lourde","Boon Bonus"],boon_why:{"Commerce Royal":"Se cumule avec le Grand Bazaar : eco la plus stable du jeu.","Caserne Acceleree":"Military School + casernes + Boon : 3 sources simultanees de production.","Cache de Ressources":"Compenser le manque de micro eco en debut de run.","Murs Renforcees":"Janissaires proteges derriere des murs PV x2.","Bastions de Pierre":"Tours + Janissaires en garnison = DPS anti-blindage maximal.","Armure Lourde":"Janissaires avec -25% degats recus : moins fragiles a leur positionnement.","Boon Bonus":"6e slot."}},
  'mali':{flag:"🌞",style:'eco_boom',vills:{food:5,wood:3,gold:0,stone:0},age_at:14,first_mil:["1-2 Pit Mines (priorite absolue)","Griot pres du Centre-Ville","3 tours en arc (construction 2x plus rapide)"],key_unit:"Donso Elite",bo_note:"Pit Mines en priorite : or passif immediat. Construction 2x Mali = defenses en un temps record.",boons_easy:["Commerce Royal","Villageois Bonus","Recolte Intensive","Forge de Guerre","Boon Bonus"],boons_hard:["Commerce Royal","Recolte Intensive","Murs Renforcees","Bastions de Pierre","Boon Bonus"],boons_expert:["Murs Renforcees","Bastions de Pierre","Commerce Royal","Armure Lourde","Boon Bonus"],boon_why:{"Commerce Royal":"Pit Mines + Boon : revenus en or absolument inarretables.","Villageois Bonus":"5 vills + construction Mali 2x = une 2e enceinte construite pendant que les autres finissent leur 1ere.","Recolte Intensive":"Griot + Boon sur la meme ressource = hyper-production sur ce type.","Murs Renforcees":"2 cercles de murs en temps normal grace a la vitesse Mali.","Bastions de Pierre":"Tours construites 2x plus vite + portee +50% = couverture etendue.","Forge de Guerre":"Donsos +20% degats pour compenser leur fragilite aux niveaux eleves.","Armure Lourde":"Indispensable en expert : les Donsos standards ne resistent pas.","Boon Bonus":"6e slot."}},
  'byzantins':{flag:"🔱",style:'passive_tower',vills:{food:5,wood:3,gold:0,stone:3},age_at:15,first_mil:["Hippodrome -> Mercenaires","2-3 Siphonarioi des le Feodal","Chateau -> Kataphraktos"],key_unit:"Siphonarios",bo_note:"3 vills pierre pour Hippodrome et murs de base. Les Siphonarioi (feu) sont la priorite militaire absolue.",boons_easy:["Recolte Intensive","Murs Renforcees","Regeneration de la Merveille","Bastions de Pierre","Boon Bonus"],boons_hard:["Murs Renforcees","Bastions de Pierre","Regeneration de la Merveille","Forge de Guerre","Boon Bonus"],boons_expert:["Murs Renforcees","Bastions de Pierre","Regeneration de la Merveille","Armure Lourde","Boon Bonus"],boon_why:{"Murs Renforcees":"Byzantins = civ defensive reference. Murs PV x2 + Siphonarioi = forteresse.","Bastions de Pierre":"Tours + Siphonarioi en garnison + portee +50% = zone de feu infranchissable.","Regeneration de la Merveille":"Defense statique = Merveille regenere entre chaque vague.","Recolte Intensive":"Financer Hippodrome + Mercenaires + Kataphraktos en parallele.","Forge de Guerre":"Siphonarioi +20% : les flammes durent plus longtemps.","Armure Lourde":"Kataphraktos + Armure = tanks les plus solides du jeu en late game.","Boon Bonus":"6e slot."}},
  'chine':{flag:"🐉",style:'siege',vills:{food:6,wood:4,gold:2,stone:0},age_at:14,first_mil:["2 casernes -> Zhuge Nu en continu","Feodal -> activer 1er bonus dynastique","Chateau -> Nest of Bees"],key_unit:"Zhuge Nu + Nest of Bees",bo_note:"Passer les Dynasties en priorite : chaque bonus s'accumule pour toute la run. 2 casernes de Zhuge Nu en parallele.",boons_easy:["Caserne Acceleree","Forge de Guerre","Bastions de Pierre","Recolte Intensive","Boon Bonus"],boons_hard:["Caserne Acceleree","Bastions de Pierre","Forge de Guerre","Murs Renforcees","Boon Bonus"],boons_expert:["Bastions de Pierre","Caserne Acceleree","Armure Lourde","Murs Renforcees","Boon Bonus"],boon_why:{"Caserne Acceleree":"2 casernes Zhuge Nu + Boon = pluie de fleches ininterrompue.","Forge de Guerre":"Zhuge Nu +20% degats + salve rapide = DPS explosif.","Bastions de Pierre":"Tours + Nest of Bees + portee +50% = zone de mort totale.","Murs Renforcees":"Canaliser vers les Nest of Bees pour maximaliser les AoE.","Recolte Intensive":"Financer 2 casernes en parallele en continu.","Armure Lourde":"Zhuge Nu fragiles : -25% degats recus les maintient en vie.","Boon Bonus":"6e slot."}},
  'delhi':{flag:"🐘",style:'passive_tower',vills:{food:6,wood:3,gold:2,stone:0},age_at:16,first_mil:["2 Scholars dans la Mosquee","Recherches gratuites immediatement","Tower War Elephant au Chateau"],key_unit:"Tower War Elephant",bo_note:"Recherches gratuites : commencer IMMEDIATEMENT. 0 or depense en tech = tout l'or pour l'armee.",boons_easy:["Recolte Intensive","Murs Renforcees","Cache de Ressources","Bastions de Pierre","Boon Bonus"],boons_hard:["Murs Renforcees","Bastions de Pierre","Recolte Intensive","Armure Lourde","Boon Bonus"],boons_expert:["Murs Renforcees","Armure Lourde","Bastions de Pierre","Regeneration de la Merveille","Boon Bonus"],boon_why:{"Recolte Intensive":"0 or en recherches = tout reinvesti. Boon amplifie encore cet avantage.","Murs Renforcees":"Les ressources eco en recherches financent une double enceinte PV x2.","Bastions de Pierre":"Tours upgradees gratuitement + portee +50%.","Armure Lourde":"Tower Elephants + Armure = indestructibles meme en Conquerant.","Cache de Ressources":"Supplementer lors des pics militaires.","Regeneration de la Merveille":"Defense statique Delhi + regen = la Merveille ne descend presque jamais.","Boon Bonus":"6e slot."}},
  'japonais':{flag:"🌸",style:'siege',vills:{food:5,wood:4,gold:0,stone:2},age_at:14,first_mil:["1 Daimyo immediat (rester avec l'armee)","2 Mangonels avant la 5e vague","Trebuchet au Chateau (min 18-22)"],key_unit:"Mangonel + Trebuchet",bo_note:"2 vills pierre pour le siege. Daimyo toujours au centre. Les Japonais produisent le siege plus vite et moins cher.",boons_easy:["Bastions de Pierre","Caserne Acceleree","Forge de Guerre","Recolte Intensive","Boon Bonus"],boons_hard:["Bastions de Pierre","Forge de Guerre","Caserne Acceleree","Murs Renforcees","Boon Bonus"],boons_expert:["Bastions de Pierre","Armure Lourde","Murs Renforcees","Regeneration de la Merveille","Boon Bonus"],boon_why:{"Bastions de Pierre":"Tours + Mangonels + portee +50% = zone de mort avant les murs.","Forge de Guerre":"Daimyo + Boon : toutes les unites sous l'aura +20% degats supplementaires.","Caserne Acceleree":"Infanterie pour combler les breches autour des machines de siege.","Murs Renforcees":"Proteger les machines de siege fragiles derriere des murs solides.","Armure Lourde":"Infanterie de soutien avec -25% degats recus : tient plus longtemps.","Regeneration de la Merveille":"Les Japonais tiennent si bien que la Merveille regenere presque toute la run.","Recolte Intensive":"Financer l'atelier de siege et les Mangonels en continu.","Boon Bonus":"6e slot."}},
  'zhuxilegacy':{flag:"🏯",style:'passive_tower',vills:{food:6,wood:3,gold:2,stone:0},age_at:14,first_mil:["Imperial Academy (Feodal) -> Scholars","3 tours en arc devant la Merveille","Zhuge Nu en garnison dans les tours"],key_unit:"Tours boostees + Zhuge Nu",bo_note:"Les tours Zhu Xi sont les plus destructrices du jeu. 3 tours en arc = defense qui se gere seule jusqu'au niveau 4.",boons_easy:["Bastions de Pierre","Murs Renforcees","Recolte Intensive","Regeneration de la Merveille","Boon Bonus"],boons_hard:["Bastions de Pierre","Murs Renforcees","Regeneration de la Merveille","Forge de Guerre","Boon Bonus"],boons_expert:["Bastions de Pierre","Murs Renforcees","Armure Lourde","Regeneration de la Merveille","Boon Bonus"],boon_why:{"Bastions de Pierre":"Tours deja boostees + Boon = DPS et portee absolument records.","Murs Renforcees":"Murs PV x2 : les vagues s'epuisent avant d'atteindre la Merveille.","Regeneration de la Merveille":"Defense passive : Merveille regenere entre chaque vague.","Recolte Intensive":"Financer 3+ tours et leur garnison en continu.","Forge de Guerre":"Zhuge Nu en garnison + Boon = DPS encore amplifie.","Armure Lourde":"Soutien d'infanterie pres des tours avec -25% degats.","Boon Bonus":"6e slot."}},
  'ayyoubides':{flag:"⚔️",style:'cavalry',vills:{food:5,wood:4,gold:2,stone:0},age_at:14,first_mil:["Economic Wing (debut de run)","Ecuries -> Camel Archers","Fort en avant-poste (Feodal)"],key_unit:"Camel Archer",bo_note:"Economic Wing en debut, puis Military Wing a la minute 15. Le Fort avance est une 2e ligne independante.",boons_easy:["Chevaliers d'Elite","Recolte Intensive","Forge de Guerre","Commerce Royal","Boon Bonus"],boons_hard:["Chevaliers d'Elite","Forge de Guerre","Bastions de Pierre","Murs Renforcees","Boon Bonus"],boons_expert:["Chevaliers d'Elite","Forge de Guerre","Bastions de Pierre","Armure Lourde","Boon Bonus"],boon_why:{"Chevaliers d'Elite":"Camel Archers +30% PV et +20% vitesse = kite indefini.","Recolte Intensive":"Compenser les pics lors des switch de Wing.","Forge de Guerre":"Desert Raiders +20% degats : interception devastatrice.","Commerce Royal":"Apres le Military Wing, revenu passif pour le late game.","Bastions de Pierre":"Fort + tours + portee +50% = bastion avance redoutable.","Murs Renforcees":"2e ligne derriere le Fort pour les debordements.","Armure Lourde":"Camel Archers -25% degats en expert : presque indestructibles.","Boon Bonus":"6e slot."}},
  'jeannedarc':{flag:"⚜️🔥",style:'cavalry',vills:{food:5,wood:3,gold:2,stone:0},age_at:14,first_mil:["Jeanne en Commandante (debut - boost production)","Caserne -> Hommes d'Armes","Passer Jeanne en Champion a la 1ere vague"],key_unit:"Jeanne + Hommes d'Armes",bo_note:"Jeanne Commandante booste la production initiale. Switch en Champion pour la 1ere vague. Elle ne meurt pas definitivement.",boons_easy:["Forge de Guerre","Caserne Acceleree","Recolte Intensive","Chevaliers d'Elite","Boon Bonus"],boons_hard:["Forge de Guerre","Caserne Acceleree","Chevaliers d'Elite","Murs Renforcees","Boon Bonus"],boons_expert:["Forge de Guerre","Chevaliers d'Elite","Bastions de Pierre","Armure Lourde","Boon Bonus"],boon_why:{"Forge de Guerre":"Jeanne Champion + Boon = hero faisant autant que 4 Hommes d'Armes normaux.","Caserne Acceleree":"Les Hommes d'Armes sont la backbone : production plus rapide evite les periodes sans armee.","Recolte Intensive":"Financer la production continue des Hommes d'Armes.","Chevaliers d'Elite":"Si pivot cavalerie, Jeanne Commandante booste aussi la cavalerie.","Murs Renforcees":"Jeanne tient mieux avec une ligne de defense derriere elle.","Bastions de Pierre":"Tours en soutien pour les flancs de Jeanne.","Armure Lourde":"Jeanne avec -25% degats en expert : plus difficile a tuer.","Boon Bonus":"6e slot."}},
  'ordresmoines':{flag:"✝️",style:'regen',vills:{food:5,wood:3,gold:3,stone:0},age_at:14,first_mil:["Monastere en position midfield","3-4 Chevaliers Dragons (Feodal)","Lieux de culte sur les flancs"],key_unit:"Chevalier Dragon",bo_note:"Les Chevaliers Dragons coutent cher : 3 vills or. Monastere entre la Merveille et le front pour la regeneration.",boons_easy:["Regeneration de la Merveille","Recolte Intensive","Murs Renforcees","Armure Lourde","Boon Bonus"],boons_hard:["Regeneration de la Merveille","Armure Lourde","Murs Renforcees","Bastions de Pierre","Boon Bonus"],boons_expert:["Regeneration de la Merveille","Armure Lourde","Bastions de Pierre","Murs Renforcees","Boon Bonus"],boon_why:{"Regeneration de la Merveille":"Theme regen de la civ etendu a la Merveille : tout se repare entre les vagues.","Armure Lourde":"Chevaliers Dragons + Armure : quasiment indestructibles. Penalite vitesse negligeable.","Murs Renforcees":"Canaliser les vagues vers les zones de regen des Chevaliers.","Bastions de Pierre":"Tours en soutien pour les angles.","Recolte Intensive":"Financer la production couteuse de Chevaliers Dragons.","Boon Bonus":"6e slot."}},
  'templiers':{flag:"✝️⚔️",style:'regen',vills:{food:4,wood:3,gold:0,stone:4},age_at:14,first_mil:["Forteresse en position centrale (des le Feodal)","3 Templar Brothers en garde","Commanderie Knights Hospitaller pour le soin"],key_unit:"Templar Brother",bo_note:"4 vills pierre pour les Forteresses des le Feodal. La Commanderie Knights Hospitaller soigne en continu les unites pres de la Merveille.",boons_easy:["Murs Renforcees","Regeneration de la Merveille","Bastions de Pierre","Recolte Intensive","Boon Bonus"],boons_hard:["Murs Renforcees","Bastions de Pierre","Regeneration de la Merveille","Armure Lourde","Boon Bonus"],boons_expert:["Bastions de Pierre","Murs Renforcees","Armure Lourde","Regeneration de la Merveille","Boon Bonus"],boon_why:{"Murs Renforcees":"Forteresse + murs PV x2 = bastion concentrique imprenable.","Regeneration de la Merveille":"Templar Brothers et Merveille regenerent simultanement entre les vagues.","Bastions de Pierre":"Forteresses + portee +50% = zone de mort autour de la Merveille.","Recolte Intensive":"Financer la production couteuse de Templar Brothers.","Armure Lourde":"Templar Brothers + Armure en expert = indestructibles.","Boon Bonus":"6e slot."}},
  'lancaster':{flag:"🌹",style:'passive_tower',vills:{food:2,wood:4,gold:0,stone:3},age_at:14,first_mil:["Manoirs en priorite absolue (ressources passives)","Yeomen en production continue","Lancaster Castle -> Muster de Demilancers/Earl's Guards selon besoin"],key_unit:"Yeoman",bo_note:"Manoirs en priorite : ressources passives + population. Moins de vills sur or, les Manoirs et le Lancaster Castle s'en chargent.",boons_easy:["Commerce Royal","Bastions de Pierre","Recolte Intensive","Forge de Guerre","Boon Bonus"],boons_hard:["Bastions de Pierre","Commerce Royal","Murs Renforcees","Forge de Guerre","Boon Bonus"],boons_expert:["Bastions de Pierre","Murs Renforcees","Armure Lourde","Commerce Royal","Boon Bonus"],boon_why:{"Commerce Royal":"Se cumule avec les revenus passifs des Manoirs : financement illimite pour toute la run.","Bastions de Pierre":"Yeomen ameliores (Synchronized Shot) + portee +50% = le mur de fleches le plus efficace.","Murs Renforcees":"Canaliser les vagues vers les zones de tir des Yeomen.","Recolte Intensive":"Compenser le peu de vills affectes aux ressources.","Forge de Guerre":"Yeomen +20% degats : le DPS archer le plus eleve du jeu.","Armure Lourde":"Earl's Guards et Demilancers en front avec -25% degats : moins a renouveler.","Boon Bonus":"6e slot."}},
  'hordedor':{flag:"🐎",style:'mobile',vills:{food:5,wood:3,gold:2,stone:0},age_at:14,first_mil:["Stable des l'age Sombre -> Kharash/Kipchak Archer en lots de 2","Golden Tent : choisir Khan and Torguuds en Feodal","Keshik au passage en Chateau"],key_unit:"Kipchak Archer",bo_note:"Stable dispo des l'age Sombre : production de Kharash et Kipchak Archer par paires immediatement. Khan and Torguuds debloque Batu Khan + Torguuds (gardes du corps).",boons_easy:["Chevaliers d'Elite","Caserne Acceleree","Forge de Guerre","Recolte Intensive","Boon Bonus"],boons_hard:["Chevaliers d'Elite","Caserne Acceleree","Forge de Guerre","Murs Renforcees","Boon Bonus"],boons_expert:["Chevaliers d'Elite","Forge de Guerre","Bastions de Pierre","Armure Lourde","Boon Bonus"],boon_why:{"Chevaliers d'Elite":"Keshik et Batu Khan +30% PV : noyau de cavalerie tres resistant.","Caserne Acceleree":"Kharash/Kipchak en lots + Boon = flux de cavalerie ininterrompu.","Forge de Guerre":"Bonus immediat en unites + Kipchak Archer amplifies (saignement accru).","Recolte Intensive":"Financer la production en lots et les Ovoos sur la pierre.","Murs Renforcees":"Quand le kite ne suffit plus : les murs de la Merveille tiennent la ligne de dernier recours.","Bastions de Pierre":"Fortified Outposts + portee +50% pour ancrer la defense.","Armure Lourde":"Kipchak Archer -25% degats : kite presque sans perte.","Boon Bonus":"6e slot."}},
  'macedonienne':{flag:"⚡",style:'passive_tower',vills:{food:5,wood:3,gold:2,stone:1},age_at:14,first_mil:["Forteresse Varegue des le Feodal -> Varangian Guard","Vills sur or/pierre pour maximiser l'argent (Galena Gathering)","Arsenal Varegue : premiers paliers payes en argent"],key_unit:"Varangian Guard",bo_note:"Garder quelques vills sur or et pierre pour generer de l'argent passif via Galena Gathering : il finance l'Arsenal Varegue sans ralentir la production militaire.",boons_easy:["Forge de Guerre","Recolte Intensive","Caserne Acceleree","Armure Lourde","Boon Bonus"],boons_hard:["Forge de Guerre","Caserne Acceleree","Armure Lourde","Bastions de Pierre","Boon Bonus"],boons_expert:["Armure Lourde","Bastions de Pierre","Forge de Guerre","Murs Renforcees","Boon Bonus"],boon_why:{"Forge de Guerre":"Varangian Guard et Atgeirmadr +20% degats : pression Feodal devastatrice.","Recolte Intensive":"Compense les vills dedies a l'or/pierre pour Galena Gathering.","Caserne Acceleree":"La Forteresse Varegue produit Varangian Guard en continu.","Armure Lourde":"Cataphractes et Varangian Guard -25% degats : noyau quasi indestructible.","Bastions de Pierre":"Golden Horn Tower + portee +50% = defense renforcee.","Murs Renforcees":"Canaliser les vagues vers la Golden Horn Tower.","Boon Bonus":"6e slot."}},
  'sengokudaimyo':{flag:"⛩️",style:'siege',vills:{food:5,wood:4,gold:2,stone:0},age_at:14,first_mil:["Yatai sur cerfs/sangliers reveles des le debut","Ryokan en Feodal (population + soin)","Daimyo Estate selon matchup (Hojo/Oda/Takeda)"],key_unit:"Daimyo",bo_note:"Les Yatai exploitent le gibier sans jamais l'epuiser : economie alimentaire continue. Le Matsuri booste la recolte des vills proches.",boons_easy:["Caserne Acceleree","Forge de Guerre","Recolte Intensive","Murs Renforcees","Boon Bonus"],boons_hard:["Caserne Acceleree","Forge de Guerre","Murs Renforcees","Bastions de Pierre","Boon Bonus"],boons_expert:["Caserne Acceleree","Armure Lourde","Forge de Guerre","Bastions de Pierre","Boon Bonus"],boon_why:{"Caserne Acceleree":"Production continue de Yari/Yumi/Tanegashima Ashigaru selon le clan choisi.","Forge de Guerre":"Kanabo Samurai et Tanegashima Ashigaru +20% degats : pression constante.","Murs Renforcees":"Daimyo et Ashigaru derriere des murs PV x2 : la ligne ne cede jamais.","Bastions de Pierre":"Castle of the Crow + tours en soutien contre les archers ennemis.","Recolte Intensive":"Compense le temps investi dans Matsuri/Yatai en debut de partie.","Armure Lourde":"Daimyo et Kanabo Samurai -25% degats en expert : quasi indestructibles.","Boon Bonus":"6e slot."}},
  'tughluq':{flag:"🕌",style:'eco_boom',vills:{food:5,wood:3,gold:2,stone:2},age_at:14,first_mil:["Worker Elephants en remplacement des Moulins/Camps des le debut","Dome of the Faith en Feodal -> Healer Elephant + reduction de cout","Raider Elephant et Amir Warriors en defense"],key_unit:"Worker Elephant",bo_note:"Les Worker Elephants servent de Moulin/Camp de Bois/Camp Minier mobiles : place-les pres des ressources eloignees pour eviter de construire des batiments de depot fixes.",boons_easy:["Recolte Intensive","Forge de Guerre","Caserne Acceleree","Armure Lourde","Boon Bonus"],boons_hard:["Forge de Guerre","Armure Lourde","Recolte Intensive","Bastions de Pierre","Boon Bonus"],boons_expert:["Armure Lourde","Bastions de Pierre","Forge de Guerre","Murs Renforcees","Boon Bonus"],boon_why:{"Recolte Intensive":"Compense le surcout de 20% d'Erudition sur les technologies.","Forge de Guerre":"Raider Elephant et Ballista Elephant +20% degats : pression devastatrice.","Caserne Acceleree":"Amir Warriors (sans cout de population) produits en continu.","Armure Lourde":"Elephants -25% degats : noyau quasi indestructible derriere les Forts de Tughlaqabad.","Bastions de Pierre":"Forts de Tughlaqabad + portee +50% = defense des Gouverneurs renforcee.","Murs Renforcees":"Frontier Fortifications + murs renforces = ligne defensive complete.","Boon Bonus":"6e slot."}},
  'jindynasty':{flag:"🏮",style:'passive_tower',vills:{food:5,wood:3,gold:2,stone:0},age_at:14,first_mil:["Grasslands places tot pour generer des chevaux (+PV cavalerie)","Iron Pagoda en fer de lance (Chateau)","Meng'an Mouke pour la defense automatique"],key_unit:"Iron Pagoda",bo_note:"Placer les Grasslands tot : les chevaux generes augmentent les PV de toute la cavalerie. Les emplacements Meng'an Mouke produisent des defenseurs automatiques pour securiser la Merveille.",boons_easy:["Chevaliers d'Elite","Bastions de Pierre","Forge de Guerre","Recolte Intensive","Boon Bonus"],boons_hard:["Chevaliers d'Elite","Forge de Guerre","Bastions de Pierre","Murs Renforcees","Boon Bonus"],boons_expert:["Chevaliers d'Elite","Armure Lourde","Bastions de Pierre","Forge de Guerre","Boon Bonus"],boon_why:{"Chevaliers d'Elite":"Se cumule avec le bonus de PV des Grasslands : Iron Pagoda quasi increvables.","Bastions de Pierre":"Emplacements Meng'an Mouke + portee +50% = defense passive renforcee.","Forge de Guerre":"Iron Pagoda et Mohe Tribesman +20% degats = pression constante.","Recolte Intensive":"Financer les Villageois Montes plus couteux et les Emissaires.","Murs Renforcees":"Ligne de defense supplementaire derriere les emplacements Meng'an Mouke.","Armure Lourde":"Iron Pagoda -25% degats en expert : cavalerie quasi indestructible.","Boon Bonus":"6e slot."}}
};

// ── TEAM-UP ─────────────────────────────────────────────────────────────────────
let tuMode=2,tuAlly=[],tuEnemy=[],tuPickTarget='ally';
const CIV_PROFILES={
  anglais:      {roles:['archer','defensif','economie'],     style:'defensif', phase:'mid',   spike:'feodal'},
  francais:     {roles:['cavalerie','commerce'],             style:'agressif', phase:'early', spike:'feodal'},
  hre:          {roles:['infanterie','reliques','defensif'],  style:'defensif', phase:'mid',   spike:'chateau'},
  mongols:      {roles:['cavalerie','harass','nomade'],       style:'agressif', phase:'early', spike:'feodal'},
  rus:          {roles:['infanterie','chasse'],               style:'mixte',    phase:'mid',   spike:'chateau'},
  abbasides:    {roles:['anti-cavalerie','tech'],             style:'mixte',    phase:'mid',   spike:'chateau'},
  ottomans:     {roles:['artillerie','infanterie'],           style:'defensif', phase:'late',  spike:'imperial'},
  mali:         {roles:['economie','construction'],           style:'mixte',    phase:'mid',   spike:'chateau'},
  byzantins:    {roles:['defensif','cavalerie'],              style:'defensif', phase:'late',  spike:'imperial'},
  chine:        {roles:['naval','construction','tech'],       style:'mixte',    phase:'late',  spike:'imperial'},
  delhi:        {roles:['elephant','tech'],                   style:'defensif', phase:'late',  spike:'imperial'},
  japonais:     {roles:['infanterie','hybride'],              style:'agressif', phase:'mid',   spike:'chateau'},
  zhuxilegacy:  {roles:['naval','production'],                style:'mixte',    phase:'late',  spike:'imperial'},
  ayyoubides:   {roles:['cavalerie','anti-cavalerie'],        style:'agressif', phase:'early', spike:'feodal'},
  jeannedarc:   {roles:['heroine','soutien'],                 style:'mixte',    phase:'mid',   spike:'chateau'},
  ordresmoines: {roles:['defensif','soin'],                   style:'defensif', phase:'mid',   spike:'chateau'},
  templiers:    {roles:['cavalerie','religieux','defensif'],  style:'defensif', phase:'mid',   spike:'chateau'},
  lancaster:    {roles:['archer','defensif','economie'],      style:'defensif', phase:'mid',   spike:'chateau'},
  hordedor:     {roles:['cavalerie','harass','economie'],     style:'agressif', phase:'early', spike:'feodal'},
  macedonienne: {roles:['infanterie','economie','defensif'],  style:'mixte',    phase:'mid',   spike:'chateau'},
  sengokudaimyo:{roles:['infanterie','cavalerie','economie'],  style:'mixte',    phase:'mid',   spike:'chateau'},
  tughluq:      {roles:['elephant','economie','defensif'],    style:'defensif', phase:'late',  spike:'imperial'},
  jindynasty:   {roles:['cavalerie','siege','defensif'],      style:'agressif', phase:'early', spike:'feodal'},
};
const SYNERGIES=[
  {civs:['anglais','francais'],label:'Archer + Cavalerie',desc:'Le Longbowman affaiblit, le Royal Knight finit. Couverture complète des deux types.',score:9},
  {civs:['anglais','hre'],label:'Double Défense',desc:'Longbowman + infanterie HRE = ligne quasi infranchissable avec des Keeps.',score:7},
  {civs:['mongols','francais'],label:'Double Pression Cavalerie',desc:"Deux rushes simultanés depuis des angles différents. L'adversaire ne peut défendre les deux.",score:9},
  {civs:['mongols','mali'],label:'Harass + Construction',desc:'Les Mongols harassent pendant que Mali construit une base avancée très rapidement.',score:8},
  {civs:['abbasides','anglais'],label:'Counter-Cav + Archer',desc:"Chameaux neutralisent la cavalerie, Longbowmen gèrent l'infanterie. Défense parfaite.",score:8},
  {civs:['byzantins','ottomans'],label:'Fortifications + Artillerie',desc:'Byzantins construisent les défenses, Ottomans amènent le Grand Bombard.',score:9},
  {civs:['delhi','anglais'],label:'Éléphant + Couverture',desc:'Le War Elephant a besoin de couverture. Le Longbowman protège parfaitement.',score:8},
  {civs:['japonais','mongols'],label:'Micro Elite + Harass',desc:'Les Mongols créent le chaos pendant que les Samurai gagnent chaque duel.',score:9},
  {civs:['mali','byzantins'],label:'Économie + Défense',desc:'Mali accumule les ressources, Byzantins construisent les défenses. Turtle très solide.',score:7},
  {civs:['chine','byzantins'],label:'Naval + Défense Terrestre',desc:"Chine contrôle l'eau, Byzantins bloquent la terre. Adversaire cerné.",score:8},
  {civs:['ottomans','delhi'],label:'Double Passif',desc:'Production passive ottomane + tech gratuite Delhi. Deux avantages sans micro.',score:8},
  {civs:['jeannedarc','francais'],label:'Synergie Française',desc:'Jeanne inspire et protège les Royal Knights. Synergie thématique avec auras réelles.',score:9},
  {civs:['ayyoubides','mongols'],label:'Double Harass Cavalerie',desc:'Deux civilisations de harass rapides. Pression constante sur les deux flancs.',score:8},
  {civs:['zhuxilegacy','chine'],label:'Double Domination Navale',desc:"Deux variantes chinoises sur l'eau - combo inarrêtable sur toute mappe navale.",score:10},
  {civs:['ordresmoines','hre'],label:'Double Défense Religieuse',desc:"Prélat HRE + Chevalier-Moine de l'Ordre du Dragon = armée tres difficile a tuer avec soin permanent.",score:8},
  {civs:['rus','abbasides'],label:'Forêt + Commerce',desc:'Rus domine les ressources forestières, Abbasides le commerce. Économies complémentaires.',score:7},
  {civs:['templiers','francais'],label:'Croix et Fleur de Lys',desc:"Templiers apportent la puissance des ordres religieux, les Français la cavalerie royale. Synergie cavalerie-chevaliers inarretable.",score:9},
  {civs:['lancaster','anglais'],label:'Roses et Longbowmen',desc:"Lancaster renforce la défense royale pendant que les archers Anglais tiennent la ligne. Duo défensif impérial.",score:8},
  {civs:['hordedor','mongols'],label:'Double Horde de Cavaliers',desc:"Deux armées de cavalerie ultra-mobiles. Encerclement total et harcèlement constant sur toute la carte.",score:9},
  {civs:['macedonienne','byzantins'],label:'Empire Oriental Reconstitué',desc:"Byzantins défendent avec le feu grégeois pendant que les Macedoniens pressent avec les Cataphractes. Domination totale.",score:8},
  {civs:['sengokudaimyo','japonais'],label:'Ère Sengoku et Bushido',desc:"Sengoku Daimyo apporte les masses d'Ashigaru pendant que les Samourai japonais dominent chaque duel.",score:9},
  {civs:['tughluq','delhi'],label:'Double Empire des Éléphants',desc:"Deux civilisations avec War Elephants. Aucune cavalerie adverse ne résiste a cette combinaison.",score:8},
  {civs:['jindynasty','hordedor'],label:'Jin et Horde - Deux Empires du Nord',desc:"Deux civilisations qui ont dominé la Chine du Nord. Pression précoce cavalerie et siège inarretables.",score:8},
  {civs:['mongols','rus'],label:'Steppe + Foret',desc:"Cavalerie nomade harasse en continu pendant que Rus accumule les ressources de la foret. Timing parfait feodal-chateau.",score:8},
  {civs:['japonais','delhi'],label:'Samurai + War Elephant',desc:"Samurai protegent les War Elephants au corps-a-corps. Les elephants avancent, les Samurai finissent. Duo devastateur.",score:9},
  {civs:['ottomans','hre'],label:'Double Puissance Tardive',desc:"HRE accumule les reliques, Ottomans generent des troupes passives. En imperial les deux sont inarretables.",score:8},
  {civs:['francais','mali'],label:'Double Commerce',desc:"Traders francais + or passif Mali = ressources infinies. Economie la plus puissante du jeu en 2v2.",score:8},
  {civs:['abbasides','delhi'],label:'Double Tech Gratuite',desc:"Les deux civilisations de recherche les plus avancees du jeu. Imperial inarretable avec tech totalement libre.",score:9},
  {civs:['rus','chine'],label:'Foret + Domination Navale',desc:"Rus domine les forets et la chasse, Chine domine l'eau. Ensemble ils couvrent toutes les ressources de la carte.",score:7},
  {civs:['ayyoubides','hre'],label:'Rush + Contre-Attaque',desc:"Camel rush ayyoubide force l'adversaire a defendre. HRE counter-attaque avec infanterie lourde et reliques.",score:7},
  {civs:['ottomans','mali'],label:'Double Boom Passif',desc:"Les deux civs accumulent des ressources sans micro intensif. Economie ecrasante et armees solides en mid-game.",score:8},
  {civs:['francais','abbasides'],label:'Cavalerie Royale + Chameaux',desc:"Royal Knights + Chameaux = couverture cavalerie totale. Les Chameaux protegent les flancs, les Knights frappent.",score:9},
  {civs:['japonais','byzantins'],label:'Micro Elite + Infrastructure',desc:"Samurai gagnent chaque duel, Byzantins construisent une infrastructure indestructible. Synergie late game massive.",score:8},
];

// ── BUILD ORDERS ────────────────────────────────────────────────────────────────
const BUILD_ORDERS = [
  {id:'bo-ang-rush',civ:'anglais',style:'rush',styleLabel:'Rush Feodal',diff:'Facile',
   title:'Rush Longbowmen',
   desc:"Pression immediate avec Longbowmen des le Feodal. Objectif : attaquer entre 5 et 7 minutes.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils sur les moutons - ne pas chercher d'autres ressources",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils sur bois - construire Lumber Camp immediatement",dur:40},
    {n:3,vils:10,res:'🍖',action:"2 vils sur nourriture (baies) pres du camp forestier",dur:45},
    {n:4,vils:12,res:'🪙',action:"2 vils sur or - construire Mining Camp",dur:40},
    {n:5,vils:13,res:'🏗️',action:"Construire 1 Caserne depuis les vils bois",dur:30},
    {n:6,vils:14,res:'🏛️',action:"MONTER EN FEODAL (14 vils) - choisir Council Hall",dur:60},
    {n:7,vils:15,res:'🍖',action:"1 vil supplementaire sur nourriture",dur:50},
    {n:8,vils:17,res:'⚔️',action:"Produire 4 Longbowmen depuis Council Hall",dur:45},
    {n:9,vils:18,res:'🪵',action:"2 vils supplementaires bois pour tenir l'economie",dur:30},
    {n:10,vils:18,res:'⚔️',action:"ATTAQUER - kiting avec Longbowmen sur les villageois adverses",dur:60}
  ]},
  {id:'bo-ang-boom',civ:'anglais',style:'boom',styleLabel:'Boom Economique',diff:'Facile',
   title:'Boom Double TC Anglais',
   desc:"Boom avec double Centre-Ville en Feodal pour une economie solide avant l'age 3.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils sur les moutons",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils sur bois - Lumber Camp",dur:40},
    {n:3,vils:10,res:'🍖',action:"2 vils sur nourriture (baies)",dur:45},
    {n:4,vils:12,res:'🪵',action:"2 vils supplementaires bois - objectif 2eme TC",dur:40},
    {n:5,vils:14,res:'🍖',action:"2 vils sur nourriture",dur:45},
    {n:6,vils:15,res:'🏛️',action:"MONTER EN FEODAL (15 vils) - Council Hall",dur:60},
    {n:7,vils:16,res:'🏗️',action:"Construire 2eme TC immediatement depuis les vils bois",dur:45},
    {n:8,vils:20,res:'🍖',action:"Production vils depuis 2 TC - priorite nourriture",dur:60},
    {n:9,vils:24,res:'🪙',action:"4 vils sur or pour financer la montee en Chateau",dur:45},
    {n:10,vils:26,res:'🏛️',action:"MONTER EN CHATEAU (25+ vils) - Landmark au choix",dur:65}
  ]},
  {id:'bo-fra-fc',civ:'francais',style:'chateau',styleLabel:'Fast Chateau',diff:'Facile',
   title:'Fast Chateau Royal Knights',
   desc:"Monter en Chateau rapidement pour produire des Royal Knights depuis l'Ecole de Cavalerie.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils sur nourriture",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils sur bois - Lumber Camp",dur:40},
    {n:3,vils:10,res:'🍖',action:"2 vils nourriture supplementaires",dur:45},
    {n:4,vils:12,res:'🪙',action:"2 vils sur or - Mining Camp",dur:40},
    {n:5,vils:14,res:'🏛️',action:"MONTER EN FEODAL (14 vils) - Ecole de Cavalerie",dur:60},
    {n:6,vils:15,res:'🍖',action:"1 vil supplementaire nourriture",dur:40},
    {n:7,vils:16,res:'⚔️',action:"Produire 2-3 Royal Knights pendant la montee",dur:50},
    {n:8,vils:18,res:'🍖',action:"2 vils sur nourriture pour financer le Chateau",dur:45},
    {n:9,vils:20,res:'🏛️',action:"MONTER EN CHATEAU (20 vils) - Cathedrale ou Ecole Mil.",dur:70},
    {n:10,vils:20,res:'⚔️',action:"Spam Royal Knights depuis 2-3 Ecuries - attaque !",dur:60}
  ]},
  {id:'bo-hre-boom',civ:'hre',style:'boom',styleLabel:'Boom Economique',diff:'Facile',
   title:'Boom Reliques HRE',
   desc:"Utiliser le Prelat pour booster l'economie et collecter les reliques des le Feodal.",
   steps:[
    {n:1,vils:1, res:'🏗️',action:"Prelat va directement inspecter les villageois - inspiration permanente",dur:20},
    {n:2,vils:6, res:'🍖',action:"6 vils sur nourriture avec inspiration du Prelat",dur:55},
    {n:3,vils:8, res:'🪵',action:"2 vils sur bois - Lumber Camp",dur:40},
    {n:4,vils:10,res:'🍖',action:"2 vils nourriture - garder Prelat en rotation constante",dur:45},
    {n:5,vils:14,res:'🏛️',action:"MONTER EN FEODAL (14 vils) - Meinwerk Palace ou Aachen",dur:65},
    {n:6,vils:15,res:'⚔️',action:"Envoyer Prelat collecter 2-3 reliques sur la carte",dur:55},
    {n:7,vils:18,res:'🍖',action:"Continuer boom - 2 TC si possible des le Feodal",dur:60},
    {n:8,vils:20,res:'🪙',action:"Vils sur or - les reliques generent de l'or passif",dur:45},
    {n:9,vils:22,res:'🔬',action:"Rechercher technologies HRE critiques (Landmark).",dur:50},
    {n:10,vils:25,res:'🏛️',action:"MONTER EN CHATEAU - Landmark defensif recommande",dur:70}
  ]},
  {id:'bo-mon-harass',civ:'mongols',style:'harass',styleLabel:'Harass',diff:'Intermediaire',
   title:'Harass Nomade Feodal',
   desc:"Pression constante avec cavalerie legere. Ne jamais rester statique - harceler en permanence.",
   steps:[
    {n:1,vils:5, res:'🍖',action:"5 vils nourriture - Horseman disponible des l'age Sombre !",dur:50},
    {n:2,vils:7, res:'🪵',action:"2 vils bois - pas de maisons necessaires (pop max deja)",dur:40},
    {n:3,vils:9, res:'🍖',action:"2 vils nourriture - produire 2 Horsemen immediatement",dur:45},
    {n:4,vils:10,res:'⚔️',action:"Envoyer 2 Horsemen harceler les villageois adverses",dur:50},
    {n:5,vils:12,res:'🏗️',action:"Plier les batiments et redeployer vers le centre de la carte",dur:35},
    {n:6,vils:14,res:'🏛️',action:"MONTER EN FEODAL (14 vils) - Tente d'Or recommandee",dur:60},
    {n:7,vils:15,res:'⚔️',action:"Produire Mangudai depuis Ovoo (si pierre disponible)",dur:45},
    {n:8,vils:16,res:'🪵',action:"2 vils bois pour expansion economique",dur:40},
    {n:9,vils:18,res:'⚔️',action:"Continuer harass - ne jamais laisser les vils adverses tranquilles",dur:60},
    {n:10,vils:18,res:'⚔️',action:"Timing attack : grouper la cavalerie et attaquer directement",dur:60}
  ]},
  {id:'bo-del-boom',civ:'delhi',style:'boom',styleLabel:'Boom Economique',diff:'Expert',
   title:'Boom Delhi Age Imperial',
   desc:"Survie passive grace aux Scholars - atteindre l'age Imperial avec l'arbre tech complet.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils nourriture",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois - Lumber Camp",dur:40},
    {n:3,vils:10,res:'🔬',action:"Construire 1re Mosquee - produire 2 Scholars immediatement",dur:50},
    {n:4,vils:12,res:'🪙',action:"2 vils or - Mining Camp",dur:40},
    {n:5,vils:13,res:'🔬',action:"Scholars positiones dans la Mosquee - recherches gratuites actives",dur:35},
    {n:6,vils:16,res:'🏛️',action:"MONTER EN FEODAL (16 vils) - Mosque of Feodal",dur:65},
    {n:7,vils:18,res:'🔬',action:"2 Scholars supplementaires dans les Mosquees",dur:45},
    {n:8,vils:22,res:'🍖',action:"Boom : priorite absolue nourriture pour vils",dur:55},
    {n:9,vils:26,res:'🏛️',action:"MONTER EN CHATEAU (25 vils) - Tower of Victory",dur:75},
    {n:10,vils:30,res:'🏛️',action:"MONTER EN IMPERIAL - tech complete = victoire assuree",dur:85}
  ]},
  {id:'bo-ayy-rush',civ:'ayyoubides',style:'rush',styleLabel:'Rush Feodal',diff:'Intermediaire',
   title:'Rush Chameau Feodal',
   desc:"Pression rapide avec Camel Archers - detruire l'economie adverse avant l'age 3.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils nourriture",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois - Lumber Camp",dur:40},
    {n:3,vils:10,res:'🍖',action:"2 vils nourriture",dur:45},
    {n:4,vils:11,res:'🏗️',action:"Construire Ecuries et Caserne des l'age Sombre",dur:30},
    {n:5,vils:14,res:'🏛️',action:"MONTER EN FEODAL (14 vils) - Masteries Cavalerie",dur:60},
    {n:6,vils:15,res:'⚔️',action:"Produire 4-5 Camel Archers immediatement",dur:50},
    {n:7,vils:16,res:'⚔️',action:"Attaquer les villageois adverses avec Camel Archers",dur:55},
    {n:8,vils:17,res:'🪙',action:"2 vils sur or pour maintenir la production militaire",dur:40},
    {n:9,vils:18,res:'⚔️',action:"Renforcer avec plus de Camel Archers - pression continue",dur:50},
    {n:10,vils:18,res:'⚔️',action:"All-in si l'adversaire est affaibli - finir la partie !",dur:60}
  ]},
  {id:'bo-jap-chateau',civ:'japonais',style:'chateau',styleLabel:'Fast Chateau',diff:'Expert',
   title:'Fast Chateau Samurai',
   desc:"Monter rapidement en Chateau pour sortir Samurai et Mounted Samurai d'elite.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils nourriture - Onna-Bugeisha defendront si rush ennemi",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois",dur:40},
    {n:3,vils:10,res:'🍖',action:"2 vils nourriture - transformer en Onna si menace",dur:45},
    {n:4,vils:12,res:'🪙',action:"2 vils or - Mining Camp",dur:40},
    {n:5,vils:14,res:'🏛️',action:"MONTER EN FEODAL (14 vils) - Koka Township",dur:60},
    {n:6,vils:15,res:'⚔️',action:"2 Samurai pour pression defensive",dur:45},
    {n:7,vils:17,res:'🍖',action:"2 vils nourriture supplementaires",dur:40},
    {n:8,vils:20,res:'🏛️',action:"MONTER EN CHATEAU (20 vils) - Castle of the Crow",dur:70},
    {n:9,vils:21,res:'⚔️',action:"Spam Samurai + Mounted Samurai depuis 2 Casernes",dur:55},
    {n:10,vils:22,res:'⚔️',action:"Ozutsu en soutien - push avec l'armee complete",dur:60}
  ]},
  {id:'bo-ott-boom',civ:'ottomans',style:'boom',styleLabel:'Boom Economique',diff:'Facile',
   title:'Boom Passif Ottoman',
   desc:"Laisser les janissaires se produire seuls et focuser 100% sur l'economie.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils nourriture - troupes se produisent automatiquement",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois",dur:40},
    {n:3,vils:10,res:'🍖',action:"2 vils nourriture",dur:45},
    {n:4,vils:12,res:'🪙',action:"2 vils or",dur:40},
    {n:5,vils:14,res:'🏛️',action:"MONTER EN FEODAL (14 vils) - Vizier Point bonus",dur:60},
    {n:6,vils:16,res:'🍖',action:"2 vils supplementaires nourriture - ne pas produire de troupes manuellement",dur:50},
    {n:7,vils:20,res:'🍖',action:"Continuer boom - troupes passives suffisent en early",dur:55},
    {n:8,vils:22,res:'🏛️',action:"MONTER EN CHATEAU (22 vils) - Istanbul Observatory",dur:70},
    {n:9,vils:26,res:'🍖',action:"Continuer boom - viser 28-30 vils avant l'Imperial",dur:60},
    {n:10,vils:28,res:'🏛️',action:"MONTER EN IMPERIAL - Grand Bombard devastateur disponible",dur:85}
  ]},
  {id:'bo-abb-fc',civ:'abbasides',style:'chateau',styleLabel:'Fast Chateau',diff:'Intermediaire',
   title:'Fast Chateau Tech Abbasides',
   desc:"Utiliser la Maison de la Sagesse pour des recherches avancees et monter vite en Chateau.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils nourriture",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois - construire Maison de la Sagesse tot",dur:40},
    {n:3,vils:9, res:'🔬',action:"Choisir la premiere branche tech (Economie recommandee)",dur:30},
    {n:4,vils:12,res:'🍖',action:"3 vils nourriture",dur:45},
    {n:5,vils:14,res:'🏛️',action:"MONTER EN FEODAL (14 vils) - Dar al-Sultan",dur:60},
    {n:6,vils:15,res:'🔬',action:"Rechercher tech Feodal immediatement",dur:40},
    {n:7,vils:16,res:'🪙',action:"2 vils or",dur:40},
    {n:8,vils:18,res:'🔬',action:"Continuer branche tech - objectif Chateau rapide",dur:50},
    {n:9,vils:20,res:'🏛️',action:"MONTER EN CHATEAU (20 vils) - Landmark tech avancee",dur:70},
    {n:10,vils:22,res:'⚔️',action:"Chameaux + tech avancee = domination mid-game",dur:60}
  ]}
  ,{id:'bo-ord-boom',civ:'ordresmoines',style:'boom',styleLabel:'Boom Economique',diff:'Intermediaire',
   title:'Boom Villageois Dores - Ordre du Dragon',
   desc:"Exploiter les Villageois Dores (+27% gathering) pour une eco ultra-solide avant le Chateau.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils sur moutons. Preparer or pour le 1er Villageois Dore",dur:55},
    {n:2,vils:7, res:'🪙',action:"1 vil sur or. Produire Villageois Dore immediatement (priorite absolue)",dur:40},
    {n:3,vils:9, res:'🪵',action:"2 vils sur bois. Construire Lumber Camp",dur:40},
    {n:4,vils:11,res:'🍖',action:"2 vils nourriture. Placer Chapelle pres du TC pour aura de soin",dur:45},
    {n:5,vils:13,res:'🪙',action:"2 vils or. Produire 2e Villageois Dore",dur:40},
    {n:6,vils:15,res:'🍖',action:"2 vils nourriture. Lancer Monument feodal",dur:45},
    {n:7,vils:17,res:'🏛️',action:"MONTER EN FEODAL (16 vils). Chapelle Feodal en priorite",dur:60},
    {n:8,vils:19,res:'🪙',action:"2 vils or supplementaires. 3 Villageois Dores total",dur:45},
    {n:9,vils:21,res:'🍖',action:"Lancer Monument Chateau. 10 nour, 6 bois, 5 or",dur:50},
    {n:10,vils:23,res:'⚔️',action:"MONTER EN CHATEAU (~9min). Chevaliers Dragons + soin permanent",dur:70}
  ]}
  ,{id:'bo-ord-rush',civ:'ordresmoines',style:'rush',styleLabel:'Rush Feodal',diff:'Intermediaire',
   title:'Rush Cavaliers Dores Feodal',
   desc:"Pression feodal rapide avec Cavaliers Dores depuis l'Ecurie. Attaque vers 5-6 minutes.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils sur moutons autour du TC",dur:55},
    {n:2,vils:7, res:'🪙',action:"1 vil sur or. Produire 1 Villageois Dore (gathering 27% plus rapide)",dur:40},
    {n:3,vils:9, res:'🪵',action:"2 vils bois. Construire Ecurie immediatement",dur:40},
    {n:4,vils:11,res:'🍖',action:"2 vils nourriture. Chapelle pres de l'Ecurie pour l'aura",dur:45},
    {n:5,vils:13,res:'🏛️',action:"Lancer Monument feodal avec les vils bois",dur:30},
    {n:6,vils:13,res:'🔍',action:"Eclaireur : reperer nourriture et vils adverses",dur:20},
    {n:7,vils:13,res:'🏛️',action:"MONTER EN FEODAL (~4min15). Produire 2-3 Cavaliers Dores",dur:60},
    {n:8,vils:15,res:'⚔️',action:"Attaquer avec Cavaliers Dores. Viser vils et camps de ressources",dur:45},
    {n:9,vils:17,res:'🍖',action:"Continuer eco. 2 vils nourriture supplementaires",dur:40},
    {n:10,vils:18,res:'⚔️',action:"Maintenir pression. Decider : continuer rush ou transition Chateau",dur:60}
  ]}
  ,{id:'bo-tem-boom',civ:'templiers',style:'boom',styleLabel:'Boom Economique',diff:'Expert',
   title:'Boom Double TC Templiers',
   desc:"Double TC en Feodal pour eco solide avant Templar Brothers au Chateau.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils sur moutons. Construire Maison immediatement",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Construire Lumber Camp",dur:40},
    {n:3,vils:10,res:'🪙',action:"2 vils or. Construire Mining Camp",dur:40},
    {n:4,vils:12,res:'🍖',action:"2 vils nourriture (fermes). Preparer 2eme TC",dur:45},
    {n:5,vils:14,res:'🪵',action:"Lancer Monument feodal. Construire 2eme TC avec bois",dur:50},
    {n:6,vils:16,res:'🏛️',action:"MONTER EN FEODAL (~5min). Rallier 2eme TC sur nourriture",dur:60},
    {n:7,vils:20,res:'🍖',action:"Production depuis 2 TC. 12 nour, 4 bois, 4 or",dur:60},
    {n:8,vils:22,res:'🪙',action:"2 vils or supplementaires pour financer Chateau",dur:45},
    {n:9,vils:24,res:'🏛️',action:"Lancer Monument Chateau. 12 nour, 6 bois, 6 or",dur:60},
    {n:10,vils:26,res:'⚔️',action:"MONTER EN CHATEAU (~9min). Templar Brothers + Commanderie",dur:70}
  ]}
  ,{id:'bo-tem-harass',civ:'templiers',style:'harass',styleLabel:'Harass',diff:'Expert',
   title:'Harass Feodal Templiers',
   desc:"Pression rapide avec cavalerie legere Templar. Age feodal vers 4min30.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"5 vils moutons, 1 vil construit Caserne",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Construire Ecurie",dur:40},
    {n:3,vils:10,res:'🪙',action:"2 vils or pour production cavalerie",dur:40},
    {n:4,vils:12,res:'🍖',action:"2 vils nourriture. Lancer Monument feodal",dur:45},
    {n:5,vils:12,res:'🔍',action:"Eclaireur : reperer eco et vils adverses",dur:20},
    {n:6,vils:12,res:'🏛️',action:"MONTER EN FEODAL (~4min30). 2 Hobelars depuis Ecurie",dur:60},
    {n:7,vils:14,res:'⚔️',action:"Attaquer eco ennemie avec Hobelars. Harceler sans trop engager",dur:45},
    {n:8,vils:15,res:'🍖',action:"1 vil nourriture supplementaire. Maintenir production militaire",dur:40},
    {n:9,vils:17,res:'⚔️',action:"Ajouter infanterie Templar (Man-at-Arms). Continuer harass",dur:45},
    {n:10,vils:18,res:'🏛️',action:"Decider : all-in feodal ou transition Chateau pour Templar Brothers",dur:60}
  ]}
  ,{id:'bo-lan-fc',civ:'lancaster',style:'chateau',styleLabel:'Fast Chateau',diff:'Facile',
   title:'Fast Chateau Lancaster - Manoirs',
   desc:"Utiliser les Manoirs pour eco passive et monter au Chateau vers 8min30.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils moutons. Construire 2 Manoirs immediatement",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Lumber Camp + 3eme Manoir",dur:40},
    {n:3,vils:9, res:'🪙',action:"1 vil or. Mining Camp",dur:40},
    {n:4,vils:11,res:'🍖',action:"2 vils nourriture. Les Manoirs generent ressources passives",dur:45},
    {n:5,vils:13,res:'🪵',action:"6 nour, 4 bois, 3 or. Lancer Monument feodal",dur:45},
    {n:6,vils:15,res:'🏛️',action:"MONTER EN FEODAL (~5min). Lancaster Castle en priorite",dur:60},
    {n:7,vils:18,res:'🍖',action:"Production depuis 2 TC (bonus Lancaster). 3 vils nourriture",dur:55},
    {n:8,vils:20,res:'🪙',action:"2 vils or. Preparer Monument Chateau",dur:45},
    {n:9,vils:22,res:'🏛️',action:"Lancer Monument Chateau. 10 nour, 5 bois, 7 or",dur:55},
    {n:10,vils:24,res:'⚔️',action:"MONTER EN CHATEAU (~8min30). Yeomen + Earl's Guard en masse",dur:70}
  ]}
  ,{id:'bo-lan-rush',civ:'lancaster',style:'rush',styleLabel:'Rush Feodal',diff:'Facile',
   title:'Rush Feodal Yeomen Lancaster',
   desc:"Pression feodal avec Yeomen (archers royaux Lancaster). Attaque vers 5-6 minutes.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils moutons. Construire 1 Manoir pour eco passive",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Lumber Camp + Stand de tir (archers)",dur:40},
    {n:3,vils:10,res:'🍖',action:"2 vils nourriture. 2eme Manoir",dur:45},
    {n:4,vils:11,res:'🪙',action:"1 vil or pour production d'archers",dur:40},
    {n:5,vils:13,res:'🏛️',action:"Lancer Monument feodal (Lancaster Castle)",dur:30},
    {n:6,vils:13,res:'🔍',action:"Eclaireur : reperer eco adverse et position des vils",dur:20},
    {n:7,vils:13,res:'🏛️',action:"MONTER EN FEODAL (~4min15)",dur:60},
    {n:8,vils:14,res:'⚔️',action:"Produire 3-4 Yeomen depuis Stand de tir. Attaquer immediatement",dur:45},
    {n:9,vils:16,res:'🍖',action:"2 vils nourriture supplementaires. Maintenir production Yeomen",dur:40},
    {n:10,vils:18,res:'⚔️',action:"Pression soutenue avec Yeomen. Viser vils et camps de ressources",dur:60}
  ]}
  ,{id:'bo-hor-rush',civ:'hordedor',style:'rush',styleLabel:'Rush Feodal',diff:'Expert',
   title:'Rush Cavalerie Horde - Stable Age Sombre',
   desc:"Produire de la cavalerie depuis l'Age Sombre grace au Stable disponible immediatement.",
   steps:[
    {n:1,vils:4, res:'🍖',action:"4 vils sur moutons (par paires). Construire Ecurie immediatement",dur:55},
    {n:2,vils:6, res:'🪵',action:"2 vils bois. Placer Ger pres du bois (remplace Camp de bucherons)",dur:40},
    {n:3,vils:6, res:'⚔️',action:"Produire 2 Kharash depuis Ecurie. Envoyer harasser a 3min",dur:35},
    {n:4,vils:8, res:'🍖',action:"2 vils nourriture. Ger pres des moutons",dur:40},
    {n:5,vils:8, res:'⚔️',action:"Harasser avec cavalerie. Viser vils et camps adverses",dur:35},
    {n:6,vils:10,res:'🪙',action:"2 vils or. Ger sur gisement or",dur:40},
    {n:7,vils:12,res:'🏛️',action:"Lancer Monument feodal (Berke Palace ou Khan's Palace)",dur:30},
    {n:8,vils:12,res:'🏛️',action:"MONTER EN FEODAL (~5min30). Choisir Khan and Torguuds au Golden Tent",dur:60},
    {n:9,vils:14,res:'⚔️',action:"Kipchak Archers depuis Ecurie. Double pression cavalerie",dur:45},
    {n:10,vils:16,res:'⚔️',action:"Attaque avec Kharash + Kipchak. Decider : all-in ou transition Chateau",dur:60}
  ]}
  ,{id:'bo-hor-boom',civ:'hordedor',style:'boom',styleLabel:'Boom Economique',diff:'Expert',
   title:"Boom Eco Gers Horde d'Or",
   desc:"Maximiser l'efficacite des Gers pour boom solide en late game. Chateau vers 9min.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"4 vils moutons, 2 vils construisent Ger central (drop-off universel)",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Construire 2eme Ger pres boiserie",dur:40},
    {n:3,vils:10,res:'🪙',action:"2 vils or. Ger sur gisement or",dur:40},
    {n:4,vils:12,res:'🍖',action:"2 vils fermes. Construire Caserne",dur:45},
    {n:5,vils:14,res:'🍖',action:"Equilibrer : 6 nour, 4 bois, 4 or. Gers augmentent efficiency",dur:45},
    {n:6,vils:16,res:'🏛️',action:"Lancer Monument feodal (Khan's Palace)",dur:30},
    {n:7,vils:18,res:'🏛️',action:"MONTER EN FEODAL (~6min). Construire Stockyard (4 vils travaillent)",dur:60},
    {n:8,vils:20,res:'🍖',action:"10 nour (Stockyard), 4 bois, 6 or. Preparer Chateau",dur:55},
    {n:9,vils:22,res:'🏛️',action:"Lancer Monument Chateau. Continuer boom",dur:50},
    {n:10,vils:25,res:'⚔️',action:"MONTER EN CHATEAU (~9min). Mangudais d'elite disponibles",dur:70}
  ]}
  ,{id:'bo-mac-rush',civ:'macedonienne',style:'rush',styleLabel:'Rush Feodal',diff:'Expert',
   title:'Phalanx Feodal - Macedonienne',
   desc:"Pression feodal avec Hoplites en formation phalange. Contre la cavalerie adverse.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils moutons. Construire Caserne immediatement",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Lumber Camp",dur:40},
    {n:3,vils:10,res:'🍖',action:"2 vils nourriture fermes",dur:45},
    {n:4,vils:11,res:'🪙',action:"1 vil or pour argent macedonien (Galena Gathering)",dur:40},
    {n:5,vils:13,res:'🏛️',action:"Lancer Monument feodal (Agora macedonienne)",dur:30},
    {n:6,vils:13,res:'🔍',action:"Eclaireur : reperer eco adverse",dur:20},
    {n:7,vils:13,res:'🏛️',action:"MONTER EN FEODAL (~4min30). 3-4 Hoplites depuis Caserne",dur:60},
    {n:8,vils:15,res:'⚔️',action:"Pression en formation phalange. Efficace contre cavalerie",dur:45},
    {n:9,vils:17,res:'🪙',action:"2 vils or/pierre pour generer argent via Galena Gathering",dur:40},
    {n:10,vils:18,res:'⚔️',action:"Soutenir avec Archers macedoniens. Maintenir pression",dur:60}
  ]}
  ,{id:'bo-mac-fc',civ:'macedonienne',style:'chateau',styleLabel:'Fast Chateau',diff:'Expert',
   title:'Fast Chateau Varègues',
   desc:"Monter au Chateau pour deverrouiller les Varangian Guards et l'Arsenal Varègue.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils moutons. Planifier placement des batiments",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Lumber Camp",dur:40},
    {n:3,vils:10,res:'🪙',action:"2 vils or. Mining Camp",dur:40},
    {n:4,vils:11,res:'🪨',action:"1 vil pierre pour generer argent via Galena Gathering",dur:40},
    {n:5,vils:13,res:'🍖',action:"2 vils nourriture (fermes)",dur:45},
    {n:6,vils:15,res:'🏛️',action:"Lancer Monument feodal",dur:30},
    {n:7,vils:17,res:'🏛️',action:"MONTER EN FEODAL (~5min30). Construire Forteresse Varegue",dur:60},
    {n:8,vils:19,res:'🪙',action:"2 vils or supplementaires. Acheter Arsenal Varègue avec argent",dur:45},
    {n:9,vils:21,res:'🏛️',action:"Lancer Monument Chateau. 10 nour, 5 bois, 6 or",dur:55},
    {n:10,vils:23,res:'⚔️',action:"MONTER EN CHATEAU (~8min). Varangian Guard depuis Forteresse",dur:70}
  ]}
  ,{id:'bo-sen-boom',civ:'sengokudaimyo',style:'boom',styleLabel:'Boom Economique',diff:'Expert',
   title:'Boom Matsuri - Sengoku Daimyo',
   desc:"Exploiter le Matsuri et les Yatai pour maximiser la gathering rate. Chateau vers 9min.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils sur cerfs/moutons. Construire Matsuri immediatement",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Lumber Camp",dur:40},
    {n:3,vils:9, res:'🪙',action:"1 vil or. Placer Sake Brewery pour or passif",dur:40},
    {n:4,vils:11,res:'🍖',action:"2 vils nourriture. Placer Yatai pres des ressources",dur:45},
    {n:5,vils:13,res:'🪵',action:"4 bois, 2 or, 7 nour. Construire Manoirs Daimyo",dur:45},
    {n:6,vils:15,res:'🏛️',action:"Lancer Monument feodal. Activer upgrades Daimyo",dur:30},
    {n:7,vils:17,res:'🏛️',action:"MONTER EN FEODAL (~5min30). Choisir Daimyo Estate",dur:60},
    {n:8,vils:19,res:'🪙',action:"2 vils or. Sake Brewery genere Toko-Koji (or passif)",dur:45},
    {n:9,vils:21,res:'🏛️',action:"Lancer Monument Chateau. 10 nour, 6 bois, 5 or",dur:50},
    {n:10,vils:24,res:'⚔️',action:"MONTER EN CHATEAU (~9min). Samurai + Yumi archers",dur:70}
  ]}
  ,{id:'bo-sen-harass',civ:'sengokudaimyo',style:'harass',styleLabel:'Harass',diff:'Expert',
   title:'Rush Ashigaru Feodal',
   desc:"Pression precoce avec Ashigaru (fantassin rapide). Construire Manoirs tot pour or passif.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"5 vils nourriture, 1 vil construit Caserne",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Lumber Camp",dur:40},
    {n:3,vils:9, res:'🪙',action:"1 vil Sake Brewery (or passif genere)",dur:40},
    {n:4,vils:11,res:'🍖',action:"2 vils nourriture. Construire 1-2 Manoirs Daimyo",dur:45},
    {n:5,vils:13,res:'🏛️',action:"Lancer Monument feodal. Envoyer eclaireur",dur:30},
    {n:6,vils:13,res:'🔍',action:"Reperer eco ennemie",dur:20},
    {n:7,vils:13,res:'🏛️',action:"MONTER EN FEODAL (~4min30)",dur:60},
    {n:8,vils:13,res:'⚔️',action:"Produire 3-4 Ashigaru depuis Caserne",dur:45},
    {n:9,vils:15,res:'🍖',action:"2 vils supplementaires. Continuer production Ashigaru",dur:40},
    {n:10,vils:18,res:'⚔️',action:"Attaquer avec Ashigaru. Viser vils et camps de ressources",dur:60}
  ]}
  ,{id:'bo-tug-fc',civ:'tughluq',style:'chateau',styleLabel:'Fast Chateau',diff:'Intermediaire',
   title:'Fast Chateau Worker Elephants',
   desc:"Monter au Chateau pour debloquer les Worker Elephants qui remplacent tous les camps.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils moutons. Les Worker Elephants remplaceront Mill/Camp plus tard",dur:55},
    {n:2,vils:7, res:'🪵',action:"1 vil bois. Construire Camp de bucherons standard",dur:40},
    {n:3,vils:9, res:'🍖',action:"2 vils nourriture",dur:45},
    {n:4,vils:10,res:'🪙',action:"1 vil or. Mining Camp",dur:40},
    {n:5,vils:12,res:'🪵',action:"2 vils bois supplementaires. 7 nour, 4 bois, 3 or",dur:45},
    {n:6,vils:14,res:'🍖',action:"Equilibrer eco. Lancer Monument feodal",dur:45},
    {n:7,vils:16,res:'🏛️',action:"MONTER EN FEODAL (~5min30). Construire Tour defensive",dur:60},
    {n:8,vils:18,res:'🪙',action:"3 vils or supplementaires. Preparer Monument Chateau",dur:45},
    {n:9,vils:20,res:'🏛️',action:"Lancer Monument Chateau. 9 nour, 5 bois, 6 or",dur:55},
    {n:10,vils:22,res:'⚔️',action:"MONTER EN CHATEAU (~9min). Debloquer Worker Elephants",dur:70}
  ]}
  ,{id:'bo-tug-boom',civ:'tughluq',style:'boom',styleLabel:'Boom Economique',diff:'Intermediaire',
   title:'Defense Fortifiee Tughluq',
   desc:"Defense avec Forts de Tughlaqabad puis boom economique protege.",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils nourriture. Construire Tour defensive pres TC",dur:55},
    {n:2,vils:8, res:'🪵',action:"2 vils bois. Lumber Camp",dur:40},
    {n:3,vils:10,res:'🍖',action:"2 vils nourriture. 2eme Tour defensive",dur:45},
    {n:4,vils:12,res:'🪙',action:"2 vils or",dur:40},
    {n:5,vils:14,res:'🍖',action:"7 nour, 4 bois, 3 or. Lancer Monument feodal",dur:45},
    {n:6,vils:16,res:'🏛️',action:"MONTER EN FEODAL (~6min). Tour supplementaire avec pierre",dur:60},
    {n:7,vils:18,res:'🪙',action:"2 vils or, 1 vil bois supplementaires",dur:45},
    {n:8,vils:20,res:'🍖',action:"2 vils nourriture (fermes securisees par tours)",dur:45},
    {n:9,vils:22,res:'🏛️',action:"Lancer Monument Chateau. 10 nour, 6 bois, 6 or",dur:55},
    {n:10,vils:25,res:'⚔️',action:"MONTER EN CHATEAU (~10min). Forts de Tughlaqabad + Elephants",dur:70}
  ]}
  ,{id:'bo-jin-boom',civ:'jindynasty',style:'boom',styleLabel:'Boom Economique',diff:'Expert',
   title:'Boom Villageois Montes - Dynastie Jin',
   desc:"Villageois Montes (gathering + mouvement rapide) sur ressources eloignees. Chateau vers 9min.",
   steps:[
    {n:1,vils:4, res:'🍖',action:"4 vils nourriture. Produire immediatement Villageois Montes (nour+or)",dur:55},
    {n:2,vils:6, res:'🪙',action:"2 vils or (necessaires pour Villageois Montes)",dur:40},
    {n:3,vils:6, res:'🏇',action:"Lancer 2 Villageois Montes. Les envoyer sur ressources eloignees",dur:35},
    {n:4,vils:8, res:'🪵',action:"2 vils bois. Lumber Camp",dur:40},
    {n:5,vils:10,res:'🍖',action:"2 vils nourriture. Meditation Gardens (bonus bois)",dur:45},
    {n:6,vils:12,res:'🪙',action:"2 vils or. Viser 6-8 Villageois Montes totaux",dur:40},
    {n:7,vils:14,res:'🏛️',action:"Lancer Monument feodal. Draft Horses deverrouille en feodal",dur:30},
    {n:8,vils:16,res:'🏛️',action:"MONTER EN FEODAL (~5min30). Draft Horses +15% bois",dur:60},
    {n:9,vils:18,res:'🪙',action:"Ajouter vils or. Preparer Monument Chateau",dur:45},
    {n:10,vils:21,res:'⚔️',action:"MONTER EN CHATEAU (~9min). Iron Pagoda + Emissaires",dur:70}
  ]}
  ,{id:'bo-jin-fc',civ:'jindynasty',style:'chateau',styleLabel:'Fast Chateau',diff:'Expert',
   title:'Fast Chateau Emissaires Jin',
   desc:"Monter vite au Chateau pour deployer Emissaires et Etats Tributaires (nourriture passive).",
   steps:[
    {n:1,vils:6, res:'🍖',action:"6 vils nourriture. Mining Camp sur or",dur:55},
    {n:2,vils:7, res:'🪙',action:"1 vil or pour Villageois Montes",dur:40},
    {n:3,vils:9, res:'🪵',action:"2 vils bois. Lumber Camp",dur:40},
    {n:4,vils:11,res:'🍖',action:"2 vils nourriture. Meditation Gardens (bonus bois)",dur:45},
    {n:5,vils:13,res:'🪵',action:"6 nour, 4 bois, 3 or. Equilibrer",dur:45},
    {n:6,vils:14,res:'🏛️',action:"Lancer Monument feodal (Barbican de l'Est)",dur:30},
    {n:7,vils:16,res:'🏛️',action:"MONTER EN FEODAL (~5min). Chercher Reliques avec Official",dur:60},
    {n:8,vils:18,res:'🪙',action:"2 vils or supplementaires. Preparer Monument Chateau",dur:45},
    {n:9,vils:20,res:'🏛️',action:"9 nour, 5 bois, 6 or. Lancer Monument Chateau",dur:50},
    {n:10,vils:22,res:'⚔️',action:"MONTER EN CHATEAU (~8min30). Emissaires + Iron Pagoda",dur:70}
  ]}
];

// ── DLC PURCHASE ────────────────────────────────────────────────────────────────
const DLC_PURCHASE = {
  jeannedarc: {
    name: 'The Sultans Ascend',
    desc: 'Trois nouvelles civilisations arabes et chretiennes avec mecaniques uniques. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/15289-acheter-age-of-empires-iv-the-sultans-ascend-pc-jeu-steam/',
    theme: 'sultans'
  },
  ayyoubides: {
    name: 'The Sultans Ascend',
    desc: 'Trois nouvelles civilisations arabes et chretiennes avec mecaniques uniques. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/15289-acheter-age-of-empires-iv-the-sultans-ascend-pc-jeu-steam/',
    theme: 'sultans'
  },
  ordresmoines: {
    name: 'The Sultans Ascend',
    desc: 'Trois nouvelles civilisations arabes et chretiennes avec mecaniques uniques. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/15289-acheter-age-of-empires-iv-the-sultans-ascend-pc-jeu-steam/',
    theme: 'sultans'
  },
  templiers: {
    name: 'Knights of Cross and Rose',
    desc: 'Deux variantes de civilisations inspirees des ordres militaires medievaux. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/18964-acheter-age-of-empires-iv-knights-of-cross-and-rose-pc-steam/',
    theme: 'knights'
  },
  lancaster: {
    name: 'Knights of Cross and Rose',
    desc: 'Deux variantes de civilisations inspirees des ordres militaires medievaux. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/18964-acheter-age-of-empires-iv-knights-of-cross-and-rose-pc-steam/',
    theme: 'knights'
  },
  zhuxilegacy: {
    name: 'Dynasties of the East',
    desc: 'Cinq civilisations issues des grandes dynasties asiatiques. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/20673-acheter-age-of-empires-iv-dynasties-of-the-east-pc-steam/',
    theme: 'dynasties'
  },
  hordedor: {
    name: 'Dynasties of the East',
    desc: 'Cinq civilisations issues des grandes dynasties asiatiques. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/20673-acheter-age-of-empires-iv-dynasties-of-the-east-pc-steam/',
    theme: 'dynasties'
  },
  macedonienne: {
    name: 'Dynasties of the East',
    desc: 'Cinq civilisations issues des grandes dynasties asiatiques. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/20673-acheter-age-of-empires-iv-dynasties-of-the-east-pc-steam/',
    theme: 'dynasties'
  },
  sengokudaimyo: {
    name: 'Dynasties of the East',
    desc: 'Cinq civilisations issues des grandes dynasties asiatiques. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/20673-acheter-age-of-empires-iv-dynasties-of-the-east-pc-steam/',
    theme: 'dynasties'
  },
  tughluq: {
    name: 'Dynasties of the East',
    desc: 'Cinq civilisations issues des grandes dynasties asiatiques. Extension payante pour Age of Empires IV.',
    url:  'https://www.instant-gaming.com/fr/20673-acheter-age-of-empires-iv-dynasties-of-the-east-pc-steam/',
    theme: 'dynasties'
  },
  jindynasty: {
    name: "Yue Fei's Legacy",
    desc: "La Dynastie Jin, ennemie legendaire du general Song Yue Fei. Extension payante pour Age of Empires IV.",
    url:  'https://store.steampowered.com/app/3746540/Age_of_Empires_IV_Yue_Feis_Legacy/',
    theme: 'yuefei'
  }
};

// ── IMMERSION ───────────────────────────────────────────────────────────────────
var HUB_QUOTES = [
  {text: "La victoire appartient à ceux qui pensent avant d'agir.", author: "Narrateur AOE4"},
  {text: "Un village sans défenses est un village déjà perdu.", author: "Chroniques médiévales"},
  {text: "La cavalerie frappe, mais l'infanterie tient le terrain.", author: "Traité de guerre"},
  {text: "Contrôle les ressources, contrôle la partie.", author: "Stratège anonyme"},
  {text: "Une armistice ne dure que le temps de se réorganiser.", author: "Chroniqueur de campagne"},
  {text: "Chaque landmark porte les espoirs d'une civilisation.", author: "Narrateur AOE4"},
  {text: "Le rush féodal peut briser n'importe quelle économie.", author: "Guide des Conquerors"},
  {text: "Sans éclaireur, tu joues à l'aveugle.", author: "Proverbe du joueur ranked"},
  {text: "L'âge Impérial est une opportunité, pas une victoire.", author: "Maître de guilde"},
  {text: "Deux reliques valent mieux qu'une armée entière.", author: "Chroniques du HRE"},
  {text: "Les murs ne gagnent pas les parties. Les villageois si.", author: "Économiste de guerre"},
  {text: "Celui qui scout en premier dicte le rythme.", author: "Narrateur AOE4"}
];
function renderQuote() {
  var el = document.getElementById('hub-quote');
  if (!el) return;
  var q = HUB_QUOTES[Math.floor(Math.random() * HUB_QUOTES.length)];
  el.innerHTML = '<span class="hq-q">“' + q.text + '”</span>' +
    ' <span class="hq-author">&mdash; ' + q.author + '</span>';
}
var CIV_TIPS = {
  anglais:"Maximise le Council Hall pour produire des Longbowmen en masse dès le Féodal.",
  francais:"Rush Royal Knight au Château avant que l'adversaire ne pose des murs solides.",
  hre:"Prélats sur les miners + push MAA Féodal : la formule gagnante des débutants.",
  mongols:"Déplace ton centre-ville en début de partie pour des bonus de production immédiats.",
  rus:"Scout à cheval 2-3 fois par âge pour garder le contrôle total de la map.",
  abbasides:"Investis dans House of Wisdom tôt : les upgrades gratuits changent tout.",
  ottomans:"Janissaires + Great Bombard en masse peuvent briser n'importe quelle défense.",
  mali:"Pit Mine + Griot : une économie d'or inarrêtable dès le milieu de partie.",
  byzantins:"Varangian Guard et Tagma forment une composition très solide en team games.",
  chine:"Gère tes dynasties : chaque transition est une accélération économique majeure.",
  delhi:"Tech gratuite = choisir la composition la plus rapide à finaliser.",
  japonais:"Samurai + Onna-Musha en combo font des ravages en combat ouvert.",
  zhuxilegacy:"Chu Ko Nu en masse depuis un Barracks supervisé est dévastateur en mid-game.",
  ayyoubides:"Camel mix archers rend la composition très difficile à counter.",
  jeannedarc:"Garde Jeanne hors de la mêlée : elle soutient mieux en arrière-plan.",
  ordresmoines:"Armored Melee + Tour du Génie : une muraille mobile inarrêtable.",
  templiers:"Choisis ta Commanderie selon le matchup : chaque âge offre 3 bonus et unités uniques différents.",
  lancaster:"Construis des Manoirs en priorité : leurs ressources passives financent Yeomen et Keeps en continu.",
  hordedor:"Production en lots de 2 dès le Stable de l'âge Sombre : double ta cavalerie sans double coût.",
  macedonienne:"Laisse quelques vills sur or et pierre : la Galena Gathering convertit ça en argent pour l'Arsenal Varègue gratuitement.",
  sengokudaimyo:"Choisis ton Daimyo Estate (Hojo/Oda/Takeda) selon le matchup : ce choix oriente toute ta composition d'armée.",
  tughluq:"Place tes Worker Elephants pres des ressources eloignees : ils remplacent Moulin, Camp de Bois et Camp Minier sans construction fixe.",
  jindynasty:"Place les Grasslands tôt : les chevaux générés boostent les PV de toute ta cavalerie Iron Pagoda."
};
function renderCivOfDay() {
  var el = document.getElementById('civ-du-jour');
  if (!el) return;
  var today = new Date().toDateString();
  var idx;
  try {
    var stored = JSON.parse(localStorage.getItem('hub_civday') || 'null');
    if (stored && stored.date === today) idx = stored.idx;
  } catch(e) {}
  if (idx === undefined || idx === null) {
    idx = Math.floor(Math.random() * ALL_CIVS.length);
    try { localStorage.setItem('hub_civday', JSON.stringify({date: today, idx: idx})); } catch(e) {}
  }
  var civ = ALL_CIVS[idx];
  if (!civ) return;
  var tip = CIV_TIPS[civ.id] || "Explore les landmarks uniques de cette civilisation pour trouver ton style.";
  el.innerHTML =
    '<div class="cjd-top"><span class="cjd-badge">CIV DU JOUR</span><span class="cjd-flag">' + civ.flag + '</span></div>' +
    '<div class="cjd-name">' + civ.name + '</div>' +
    '<div class="cjd-style">' + (civ.style || '') + '</div>' +
    '<div class="cjd-tip">' + tip + '</div>' +
    '<button class="cjd-cta" onclick="navigate(\'' + civ.id + '\')">Voir la fiche &rarr;</button>';
}
var RECENT_UPDATES = {
  'epreuve': '2026-05-15',
  'tierlist': '2026-06-16',
  'pg-teamup': '2026-06-16',
  'patches': '2026-06-16'
};

// ── DONNEES COMPARATEUR ──────────────────────────────────────────────────────
var CIV_COMPARE_DATA = {
  'anglais':{playstyle:"Les Anglais excellent dans la défense et le contrôle du territoire. Grâce à leurs Longbowmen - la meilleure unité d'archer du jeu - ils créent des zones de déni d'accès redoutables. Leur économie stable basée sur les moutons et leurs centres-villes défensifs en font la civilisation idéale pour apprendre à tenir une position et à punir les attaques adverses.",bonuses:[{icon:"🐑",title:"Wool Industries - Troupeaux de départ",desc:"Démarre avec +4 moutons supplémentaires. Chaque Centre-Ville supplémentaire fait apparaître 4 moutons. Les villageois récoltent la nourriture des moutons 20% plus vite."},{icon:"🏰",title:"Defensive Byrig - Centres-Villes défensifs",desc:"Le Centre-Ville capital tire une flèche supplémentaire. Les villageois brandissent des arcs courts pour attaquer les unités ennemies qui s'approchent du Centre-Ville."},{icon:"👑",title:"A House Unified - Gardes du Comte",desc:"Les Keeps génèrent 3 Gardes du Comte gratuits à leur construction. Chaque Keep actif donne +1 dégât aux Demilancers et Gardes du Comte (max +4, +6 avec Berkshire Palace)."},{icon:"⛵",title:"Shipwrights - Navires moins chers",desc:"Les navires coûtent 10% moins cher à produire."},{icon:"🏡",title:"Feudalism - Manors féodaux",desc:"Peut construire des Manors dès l'âge Féodal. Chaque Manor donne +5 de population. Ils ne génèrent pas de ressources dans la version de base (génération liée au DLC Lancaster uniquement)."},{icon:"⚡",title:"Network of Castles - Vitesse d'attaque accrue",desc:"Les unités proches de Tours, Keeps et Centres-Villes gagnent +25% de vitesse d'attaque. Positionnez vos armées près de vos défenses pour amplifier leur efficacité au combat."}],uniqueUnits:[{name:"Moutons",desc:""},{name:"Longbowman",desc:""},{name:"Demilancer",desc:""},{name:"Le Roi (King)",desc:""},{name:"Manor",desc:""}],landmarks:[]},
  'francais':{playstyle:"Les Français misent sur une cavalerie d'élite disponible très tôt et une économie commerciale extrêmement flexible. Le Royal Knight possède une Charge de Dévastement déclenchable manuellement, dont les dégâts sont proportionnels à la distance parcourue. Les traders peuvent rapporter n'importe quelle ressource. Le Royal Institute regroupe toutes les technologies uniques françaises sans condition d'âge.",bonuses:[{icon:"🐴",title:"Royal Knight - Charge de Dévastement",desc:"Le Royal Knight possède une capacité de charge déclenchable manuellement. Les dégâts bonus sont proportionnels à la distance parcourue avant l'impact. La charge se recharge avec le temps. Aucun cumul de kills."},{icon:"🛒",title:"Traders flexibles",desc:"Les Traders peuvent choisir de rapporter de la nourriture, du bois ou de l'or à chaque retour. Essentiel pour équilibrer ton économie en cours de partie."},{icon:"📜",title:"Chivalry - Régénération du Royal Knight",desc:"La technologie Chivalry, recherchée au Royal Institute, permet aux Royal Knights de régénérer +1 PV par seconde hors combat. Les technologies de forge standard ont un coût normal."},{icon:"🗺️",title:"Trade Posts visibles",desc:"Les Posts de commerce sont révélés sur la carte dès le début de la partie. Avantage commercial dès les premières minutes."}],uniqueUnits:[{name:"Royal Knight",desc:""},{name:"Ribauldequin",desc:""}],landmarks:[]},
  'hre':{playstyle:"Le Saint-Empire mise sur les Prélats pour booster l'efficacité des villageois et sur les reliques pour générer de l'or passif en continu. C'est une civilisation robuste avec une infanterie parmi les plus résistantes du jeu. Facile d'accès grâce à des mécaniques directes - booste tes villageois, accumule les reliques, construis des défenses solides.",bonuses:[{icon:"⛪",title:"Prélat - Inspirateur de villageois",desc:"Le Prélat est une unité unique qui inspire les villageois proches pour collecter des ressources plus vite. Envoie-le systématiquement vers tes chantiers actifs."},{icon:"💎",title:"Reliques - Or passif",desc:"Chaque relique placée dans un Monastère génère de l'or en continu. Priorité à la collecte des reliques dès l'âge Féodal."},{icon:"🏰",title:"Émplacements de Keep améliorés",desc:"Les Keeps du Saint-Empire ont accès à plus d'emplacements d'armes et des défenses plus solides que les autres civilisations."},{icon:"📦",title:"Pushcarts - Villageois portent plus",desc:"Les villageois transportent 40% de ressources supplémentaires par voyage. Réduit les allers-retours et améliore le débit économique."},{icon:"🔧",title:"Réparations d'urgence",desc:"Les bâtiments sous influence d'un Centre-Ville peuvent déclencher une réparation d'urgence automatique."}],uniqueUnits:[{name:"Prélat",desc:""},{name:"Landsknecht",desc:""},{name:"Black Rider",desc:""}],landmarks:[]},
  'mongols':{playstyle:"Les Mongols sont la civilisation la plus agressive et mobile du jeu. Patch 16.2 : le Mangudai est encore plus redoutable avec une vitesse d'attaque amelioree (cap 1.97 -> 1.66), le cout du Double Villager est reduit (125 -> 120 Pierre) et les Ovoos rapportent plus en Chateau (130 -> 140) et en Imperial (160 -> 170). Tous leurs batiments peuvent etre plies et redeployes. Tier S actuel.",bonuses:[{icon:"🏕️",title:"Nomade - Batiments mobiles",desc:"Tous les batiments mongols peuvent etre plies et redeployes a n'importe quel endroit de la carte. Radical."},{icon:"👥",title:"Population max au depart",desc:"Commence avec le plafond de population maximum - pas besoin de maisons."},{icon:"🔥",title:"Pillage des batiments",desc:"Chaque batiment ennemi brule genere des ressources (nourriture + or) directement dans ton stock."},{icon:"🏇",title:"Cavalerie precoce",desc:"Le Horseman est disponible des l'age Sombre - rush cavalry des les premieres minutes."},{icon:"⛏️",title:"Ovoo - Double production amelioree",desc:"Patch 16.2 : les Ovoos rapportent plus de pierre (Chateau 140, Imperial 170). Les batiments dans la zone produisent en double vitesse. Le Double Villager coute desormais 120 Pierre (etait 125)."}],uniqueUnits:[{name:"Mangudai",desc:""},{name:"Keshik",desc:""},{name:"Traction Trebuchet",desc:""},{name:"Mangudai Elite",desc:""},{name:"Cavalerie du Khaganate",desc:""}],landmarks:[]},
  'rus':{playstyle:"Les Rus transforment la chasse en economie principale. Patch 16.2 (buffs) : Wooden Fortress moins chere (175 -> 150 Bois) et le bonus Bounty Food ameliore (5/10/15% -> 10/15/20% par tier de chasse). Ces buffs renforcent leur early game agressif et leur fort avant-poste. Tier A apres patch.",bonuses:[{icon:"🦌",title:"Chasse amelioree - Bounty Food buff",desc:"Patch 16.2 : Bounty Food 10/15/20% par tier (etait 5/10/15%). Le Hunting Cabin genere de l'or passif. Villageois plus productifs sur le gibier."},{icon:"🌲",title:"Bonus foret - Scout d'exploration",desc:"Les scouts generent de petites quantites de ressources en explorant les forets."},{icon:"🏹",title:"Streltsy - Contre-cavalerie",desc:"Le Streltsy est un mousquetaire unique qui inflige des degats enormes aux cavaliers. Indispensable contre des armees de cavalerie."},{icon:"🙏",title:"Warrior Monk - Hybride combat/soin",desc:"Le Warrior Monk peut combattre comme une unite normale tout en soignant les allies proches. Tres polyvalent."},{icon:"🏰",title:"Wooden Fortress - Avant-poste buff",desc:"Patch 16.2 : Wooden Fortress 150 Bois (etait 175). Fort avance moins couteux, plus facile a placer en position aggressive."}],uniqueUnits:[{name:"Streltsy",desc:""},{name:"Warrior Monk",desc:""},{name:"Lodya Ship",desc:""}],landmarks:[]},
  'abbasides':{playstyle:"Les Abbasides (patch 16.2) ont recu un remaniement majeur : l'Administrative Wing (ex-Trade Wing) accorde desormais +50% de bonus par tier du Golden Age etendu a 5 tiers. Les nouvelles technologies City Planning et Siege Directive amplifient encore l'economie et les machines de siege. Les Chameaux restent la meilleure reponse anti-cavalerie du jeu. En contrepartie, les Armored Caravans sont legerement moins resistants et les Medical Centers soignent moins vite.",bonuses:[{icon:"🏛️",title:"Administrative Wing - Golden Age 5 tiers",desc:"La Wing Commerciale devient Administrative et offre +50% de bonus par palier du Golden Age, maintenant etendu a 5 tiers. Plus de Traders offerts, mais des bonus enormes en late game."},{icon:"🌟",title:"City Planning + Siege Directive",desc:"City Planning : les batiments identiques adjacents gagnent +8% PV et productivite. Siege Directive : les machines de siege infligent +25% de degats bonus. Deux nouvelles technologies puissantes."},{icon:"🐪",title:"Chameaux - Anti-cavalerie absolu",desc:"Le Camel Rider et le Camel Archer restent la meilleure reponse a la cavalerie ennemie. Un chameau = deux cavaliers adverses de moins."},{icon:"🔬",title:"Recherche flexible",desc:"La Maison de la Sagesse offre des améliorations dans 4 ailes (Economie, Militaire, Culture, Commerce). Très flexible et personnalisable."},{icon:"🏇",title:"Infanterie de chameau unique",desc:"Le Camel Rider inflige un malus de vitesse aux cavaliers proches. Armored Caravans : armure +2 (nerf depuis patch 16.2, etait +3)."}],uniqueUnits:[{name:"Camel Rider",desc:""},{name:"Camel Archer",desc:""}],landmarks:[]},
  'ottomans':{playstyle:"Les Ottomans ont une mecanique unique : leurs casernes produisent des unites gratuitement en continu. Patch 16.2 (nerfs) : le Sipahi coute desormais 45 Bois au lieu de 40 et se produit en 31s au lieu de 30s. Tier C apres ces ajustements. Le Grand Bombard reste l'artillerie la plus devastatrice du jeu en late game.",bonuses:[{icon:"⚔️",title:"Military Schools - Production passive",desc:"Les Military Schools produisent automatiquement des unites de base en continu. Tu n'as pas a t'en occuper - elles sortent seules."},{icon:"🕌",title:"Imam - Inspirateur de villageois",desc:"L'Imam fonctionne comme le Prelat du HRE - il booste l'efficacite des villageois proches. Gratuit et puissant."},{icon:"💣",title:"Grand Bombard - Artillerie unique",desc:"Le Grand Bombard est le canon de siege le plus destructeur du jeu. Detruit tout batiment ou groupe d'unites en quelques tirs."},{icon:"🏰",title:"Sipahi - Nerf patch 16.2",desc:"Cout augmente : 120 Nour. 45 Bois (etait 40 Bois). Production 31s (etait 30s). Reste un cavalier de soutien mais plus cher a produire en masse."},{icon:"🔥",title:"Janissaire d'elite",desc:"Le Janissaire est un arquebusier premium - degats eleves, resistant, efficace contre toute unite."}],uniqueUnits:[{name:"Imam",desc:""},{name:"Janissaire",desc:""},{name:"Sipahi",desc:""},{name:"Grand Bombard",desc:""}],landmarks:[]},
  'mali':{playstyle:"Les Mali exploitent des Pit Mines uniques qui génèrent de l'or passivement. Leurs villageois construisent 2× plus vite que tout autre civilisation. Le Donso est un chasseur-soldat polyvalent dès le début. La Griot Bara génère des unités de soutien uniques. Style: économie robuste avec une construction de base ultra-rapide.",bonuses:[{icon:"⛏️",title:"Pit Mine - Or passif",desc:"Les Pit Mines génèrent de l'or en continu sans nécessiter de villageois. Construire en priorité sur les sites d'or."},{icon:"🏗️",title:"Construction ultra-rapide",desc:"Tous les bâtiments se construisent 2× plus vite. Permet de rattraper un retard ou d'établir une base avancée très rapidement."},{icon:"🌿",title:"Donso - Chasseur-soldat",desc:"Le Donso est un villageois-soldat hybride dès l'âge Sombre. Il chasse efficacement ET peut combattre."},{icon:"🎵",title:"Griot Bara - Unité de soutien",desc:"La Griot Bara est une chanteuse de guerre qui génère des auras de boost pour les unités alliées proches."},{icon:"🐆",title:"Faune abondante",desc:"Les Maliens ont accès à plus d'animaux à chasser, renforçant l'économie alimentaire précoce."}],uniqueUnits:[{name:"Donso",desc:""},{name:"Sofa",desc:""},{name:"Griot Bara",desc:""},{name:"Musofadi Warrior",desc:""},{name:"Mansa",desc:""}],landmarks:[]},
  'byzantins':{playstyle:"Les Byzantins construisent un reseau de Citernes reliees par des Aqueducs. Patch 16.2 (nerfs) : revenu de l'Olive Grove reduit (20% -> 15% de la Nourriture), Cataphract pietinage nerf (12 -> 10), Cataphract Numeri affaibli (15% 12s -> 10% 10s). En contrepartie : Citerne moins chere (125 -> 100 Pierre), Mercenary Camp moins cher (150 -> 100 Bois), Hardened Limitanei +5 PV. Tier A apres patch.",bonuses:[{icon:"💧",title:"Citernes moins cheres - Boost economique",desc:"Patch 16.2 : Citerne 125 -> 100 Pierre. Chaque Citerne booste villageois et batiments dans sa zone. Aqueducs amplifient les bonus."},{icon:"🌊",title:"Reseau Aqueduc",desc:"Plus le reseau est etendu, plus les bonus s'accumulent. Un reseau complet donne des avantages majeurs en production, recherche et economie."},{icon:"⚔️",title:"Cataphract - Cavalier nerf patch 16.2",desc:"Pietinage reduit : 12 -> 10 degats. Cataphract Numeri : 15% 12s -> 10% 10s. Reste un cavalier lourd d'elite mais moins dominant."},{icon:"🪓",title:"Varangian Guard - Mercenaire nordique",desc:"Infanterie lourde d'elite - tres resistante. Mercenary Camp desormais 100 Bois (etait 150). Acces ameliore aux mercenaires."},{icon:"🏰",title:"Cheirosiphon - Lance-flammes de defense",desc:"Unite defensive unique pouvant etre placee sur les murs pour cracher des flammes. Hardened Limitanei +5 PV (100 -> 105) apres patch."}],uniqueUnits:[{name:"Cataphract",desc:""},{name:"Varangian Guard",desc:""},{name:"Cheirosiphon",desc:""}],landmarks:[]},
  'chine':{playstyle:"La Chine progresse à travers les dynasties (Tang → Song → Yuan → Ming) en plus du système d'âge standard. Chaque dynastie offre des bonus uniques cumulables. Les bâtiments se construisent 2× plus vite. La flotte navale chinoise est la meilleure du jeu sans conteste. L'Imperial Official prélève les taxes et accélère la production. Civilisation très profonde avec un plafond de skill extrêmement haut.",bonuses:[{icon:"👘",title:"Dynasties - Bonus par ère",desc:"En plus de l'âge, tu choisis une Dynastie (Tang, Song, Yuan, Ming) à chaque montée. Chacune offre des bonus uniques : -15% coût landmarks (Tang), vitesse de production (Song), cavalerie (Yuan), puissance de feu (Ming)."},{icon:"📋",title:"Imperial Official - Taxes et production",desc:"L'Imperial Official collecte des taxes sur tous tes bâtiments productifs et peut superviser un bâtiment pour accélérer sa production."},{icon:"🏗️",title:"Construction ultra-rapide",desc:"Tous les bâtiments se construisent 2× plus vite - similaire aux Mali mais avec des unités plus variées."},{icon:"⛵",title:"Naval dominance",desc:"Les navires chinois sont les meilleurs du jeu - Junk, Fire Junk, et Tower Ship dominent toute confrontation navale."},{icon:"🔬",title:"Chimie automatique",desc:"La recherche Chimie est automatiquement accordée à l'âge Impérial - économise des ressources importantes."}],uniqueUnits:[{name:"Imperial Official",desc:""},{name:"Zhuge Nu",desc:""},{name:"Fire Lancer",desc:""},{name:"Junk",desc:""},{name:"Nest of Bees",desc:""},{name:"Fire Junk",desc:""}],landmarks:[]},
  'delhi':{playstyle:"Le Delhi Sultanat est unique : toutes les technologies sont entièrement gratuites. Mais pour les rechercher à vitesse normale, tu dois garnir des Mosquées de Scholars. Sans Scholars, une technologie prend 15-20 minutes. Le War Elephant est l'unité la plus puissante du jeu. Civilisation très lente à démarrer mais dont le late game est impossible à contrer si bien géré.",bonuses:[{icon:"📚",title:"Technologies gratuites",desc:"100% des technologies sont recherchées sans dépenser de ressources. Garnis tes Mosquées de Scholars pour les accélérer."},{icon:"🕌",title:"Scholar - Accélérateur de recherche",desc:"Chaque Scholar dans une Mosquée réduit le temps de recherche. Plus de Scholars = recherche quasi instantanée."},{icon:"🐘",title:"War Elephant - Colosse du champ de bataille",desc:"Le War Elephant est la plus grande et plus puissante unité terrestre du jeu. Il écrase les bâtiments, renverse les unités et absorbe des quantités énormes de dégâts."},{icon:"🗼🐘",title:"Tower Elephant - Artillerie mobile",desc:"Un éléphant avec une tour dessus - tire des flèches sur une large zone en se déplaçant. Combinaison d'artillerie et de siège."},{icon:"🛡️",title:"Infanterie de mosquée",desc:"Les soldats peuvent construire des Palisades - défense rapide sans villageois."}],uniqueUnits:[{name:"Scholar",desc:""},{name:"Ghazi Raider",desc:""},{name:"War Elephant",desc:""},{name:"Tower Elephant",desc:""}],landmarks:[]},
  'japonais':{playstyle:"Les Japonais ont le système de jeu le plus complexe d'AOE IV. Leur système Ikki transforme les villageois en Onna-Bugeisha combattantes. Le Samurai est l'unité d'infanterie la plus puissante du jeu en 1v1. Les Bannermen créent des auras de boost. L'Ozutsu est une artillerie unique qui tire tôt. Civilisation avec un plafond de skill exceptionnel - devastatrice en mains expertes.",bonuses:[{icon:"⚔️",title:"Système Ikki - Villageois-soldats",desc:"Les villageois japonais peuvent se transformer en Onna-Bugeisha (samurai féminin) pour défendre la base. Économie + défense simultanément."},{icon:"🥋",title:"Samurai - Duel absolu",desc:"Le Samurai a la meilleure DPS en duel du jeu. Il contre particulièrement bien toutes les unités uniques adverses."},{icon:"🚩",title:"Bannermen - Auras de combat",desc:"Les Bannermen (Katana, Yumi, Uma) créent des auras qui boostent les unités alliées du même type autour d'eux."},{icon:"🎆",title:"Ozutsu - Artillerie précoce",desc:"L'Ozutsu tire des boulets de canon dès l'âge Château - une forme d'artillerie légère unique disponible très tôt."},{icon:"⛩️",title:"Floating Gate - Landmark naval",desc:"Le Torii flottant améliore les capacités navales. Les moines bouddhistes et shintoïstes offrent des bonus différents."}],uniqueUnits:[{name:"Onna-Bugeisha",desc:""},{name:"Samurai",desc:""},{name:"Yumi Ashigaru",desc:""},{name:"Mounted Samurai",desc:""},{name:"Ozutsu",desc:""},{name:"Bannerman",desc:""},{name:"Samurai Elite",desc:""},{name:"Atakebune",desc:""}],landmarks:[]},
  'zhuxilegacy':{playstyle:"L'Héritage de Zhu Xi est une variante avancée de la Chine axée sur une production accélérée par les Shaolin Monks et une économie de landmarks ultra-efficace. Meilleure civilisation sur l'eau du jeu. Les Imperial Officials supervisent plusieurs bâtiments simultanément. Très haute maîtrise requise pour exploiter toutes les synergies.",bonuses:[{icon:"🧘",title:"Shaolin Monks - Production accélérée",desc:"Les Shaolin Monks peuvent superviser des bâtiments de production pour les accélérer massivement. Plus efficaces que les Imperial Officials standards."},{icon:"🐉",title:"Dynasties héritées",desc:"Hérite du système de dynasties de la Chine - Tang, Song, Yuan, Ming avec leurs bonus respectifs."},{icon:"⛵",title:"Domination navale absolue",desc:"La meilleure flotte du jeu - Junk, Fire Junk et Tower Ship dominent toute confrontation sur l'eau."},{icon:"🏗️",title:"Construction 2x plus rapide",desc:"Tous les bâtiments se construisent deux fois plus vite que les autres civilisations."}],uniqueUnits:[{name:"Imperial Official",desc:""},{name:"Shaolin Monk",desc:""},{name:"Zhuge Nu",desc:""},{name:"Fire Lancer",desc:""},{name:"Junk",desc:""},{name:"Nest of Bees",desc:""},{name:"Fire Junk",desc:""}],landmarks:[]},
  'ayyoubides':{playstyle:"Les Ayyoubides sont une civilisation de cavalerie agressive avec un fort accent sur la mobilité et le harass. Les Camel Corps sont des unités hybrides entre le chameau et le cavalier. Le système de Masteries débloque des améliorations permanentes. Très fort en early agression avec des rushes de cavalerie soutenus.",bonuses:[{icon:"🐪",title:"Camel Corps - Anti-cavalerie mobile",desc:"Le Camel Corps est à la fois cavalier et counter-cavalerie. Il inflige un malus aux cavaliers ennemis tout en restant très mobile."},{icon:"📜",title:"Masteries - Améliorations permanentes",desc:"Le système Masteries débloque des bonus permanents en accomplissant des objectifs en partie."},{icon:"⚡",title:"Desert Raiders - Mobilité accrue",desc:"Certaines unités ayyoubides ont une vitesse de déplacement accrue en terrain ouvert."},{icon:"🕌",title:"Caravane sacrée",desc:"Les routes commerciales ayyoubides génèrent des ressources supplémentaires."}],uniqueUnits:[{name:"Camel Corps",desc:""},{name:"Camel Corps amélioré",desc:""},{name:"Camel Corps Elite",desc:""}],landmarks:[]},
  'jeannedarc':{playstyle:"Jeanne d'Arc est une civilisation unique centrée sur une héroïne qui progresse et évolue tout au long de la partie. Jeanne commence faible mais devient progressivement une unité de combat surpuissante. Elle peut inspirer les troupes, monter à cheval, et déclencher des miracles divins. Sa mort est très pénalisante - il faut la protéger tout en l'utilisant activement.",bonuses:[{icon:"✨",title:"Jeanne - Héroïne évolutive",desc:"Jeanne commence comme unité de soutien et évolue à chaque âge. Elle devient l'une des unités les plus puissantes du jeu à l'âge 4."},{icon:"🙏",title:"Inspiration divine",desc:"Jeanne inspire les unités proches - elles combattent mieux, récupèrent des PV et résistent plus longtemps."},{icon:"⚡",title:"Miracles - Capacités spéciales",desc:"Jeanne peut déclencher des miracles uniques : protection divine, charge héroïque, purification."},{icon:"🏇",title:"Montée à cheval",desc:"À partir de l'âge Château, Jeanne peut monter à cheval pour une mobilité accrue."}],uniqueUnits:[{name:"Jeanne d'Arc (jeune)",desc:""},{name:"Royal Knight",desc:""},{name:"Jeanne à cheval",desc:""},{name:"Jeanne - Pucelle d'Orléans",desc:""}],landmarks:[]},
  'ordresmoines':{playstyle:"L'Ordre du Dragon combine la puissance militaire des chevaliers avec les bénédictions religieuses des moines. Chaque ordre a ses propres règles et bonus : Hospitalliers soignent, Templiers accumulent les richesses, Teutoniques fortifient. Les chapelles de campagne se déploient sur le champ de bataille pour bénir les troupes.",bonuses:[{icon:"✝️",title:"Choix de l'Ordre - Identité de la civilisation",desc:"Au début de la partie, tu choisis ton ordre : Hospitaliers (soin), Templiers (économie or), Teutoniques (défense). Ce choix oriente toute ta stratégie."},{icon:"⛺",title:"Chapelles de campagne",desc:"Des chapelles mobiles peuvent être déployées sur le champ de bataille pour bénir les troupes proches - PV et dégâts améliorés."},{icon:"🛡️",title:"Chevalier-Moine",desc:"Unité hybride combat/religieux - combat comme un Knight et soigne comme un moine."},{icon:"📿",title:"Reliques sacrées",desc:"Les ordres génèrent des bonus supplémentaires grâce aux reliques - or, soin, ou défense selon l'ordre choisi."}],uniqueUnits:[{name:"Chevalier-Moine",desc:""},{name:"Knight de l'Ordre",desc:""},{name:"Chapelle de campagne",desc:""},{name:"Grand Maître",desc:""}],landmarks:[]},
  'templiers':{playstyle:"Les Templiers sont une variante des Français centrée sur le Temple de Salomon. Le Templar Headquarters remplace le Centre-Ville capital et ne construit aucun landmark classique : à chaque montée d'âge, tu choisis l'une de 3 Commanderies alliées (27 combinaisons possibles sur toute la partie), chacune accordant un bonus permanent et débloquant une unité unique. Les Pèlerins remplacent les Traders et rapportent de l'or automatiquement depuis les Sites Sacrés. Aucun accès aux unités à poudre, compensé par des Forteresses dès le Féodal et des Trébuchets à Contrepoids.",bonuses:[{icon:"✝️",title:"Templar Headquarters - Système de Commanderies",desc:"Le QG remplace le Centre-Ville capital et ne construit aucun landmark classique. À chaque âge (Féodal, Château, Impérial), choisis l'une de 3 Commanderies alliées : bonus permanent + unité unique débloquée."},{icon:"🏰",title:"Forteresses dès le Féodal",desc:"Les unités à distance proches d'une Forteresse gagnent +15% de portée. Les Murs de Pierre dans l'influence d'une Forteresse ou du QG ont +25% de PV et tirent des flèches."},{icon:"🚶",title:"Pèlerinage - Or via Sites Sacrés",desc:"Après la recherche Safe Passage, des groupes de Pèlerins partent automatiquement vers les Sites Sacrés proches et rapportent de l'or selon la distance parcourue. Remplacent les Traders."},{icon:"💣",title:"Maîtres du Siège - Pas d'unités à poudre",desc:"Aucun accès aux unités à poudre, mais les Trébuchets à Contrepoids tirent des projectiles supplémentaires et se déploient sur les Forteresses. Atelier de Siège -25% de coût."}],uniqueUnits:[{name:"Templar Brother",desc:""},{name:"Pèlerin",desc:""},{name:"Hospitaller Knight",desc:""},{name:"Genitour",desc:""},{name:"Szlachta Cavalry",desc:""},{name:"Teutonic Knight",desc:""}],landmarks:[]},
  'lancaster':{playstyle:"Lancaster est une variante des Anglais incarnant la maison royale de Lancaster (DLC Knights of Cross and Rose). Son économie repose sur les Manoirs, bâtiments uniques constructibles dès le Féodal qui génèrent des ressources passives et de la population, renforcés par le Lancaster Castle. La civilisation démarre avec des moutons supplémentaires et collecte +20% plus vite sur ces troupeaux. Chaque Keep construit accorde des Earl's Guards gratuits et booste les dégâts des Demilancers et Earl's Guards.",bonuses:[{icon:"🏠",title:"Manoirs - Économie passive",desc:"Bâtiment unique constructible dès le Féodal, génère des ressources au fil du temps et fournit de la population. Le Lancaster Castle leur accorde +500 PV et un emplacement de tir."},{icon:"🐑",title:"Wool Industries - Moutons supplémentaires",desc:"Lancaster démarre avec +4 moutons et chaque Town Center supplémentaire en fait apparaître 4 de plus. Collecte de nourriture +20% plus rapide sur les moutons."},{icon:"🏰",title:"A House Unified - Keeps et Earl's Guards",desc:"Chaque Keep construit accorde 3 Earl's Guards gratuits. Chaque Keep actif donne +1 dégâts aux Demilancers et Earl's Guards (max +4, +6 avec Berkshire Palace)."},{icon:"🛡️",title:"Defensive Byrig",desc:"Le Town Center capital tire une flèche supplémentaire et les villageois ripostent à l'arc court contre les unités ennemies proches."}],uniqueUnits:[{name:"Yeoman",desc:""},{name:"Hobelar",desc:""},{name:"Earl's Guard",desc:""},{name:"Lord of Lancaster",desc:""},{name:"Demilancer",desc:""}],landmarks:[]},
  'hordedor':{playstyle:"La Horde d'Or est une variante des Mongols (DLC Dynasties of the East) inspirée du khanat occidental fondé par Batu Khan. Sa mécanique signature, Hordes, produit la plupart des unités (Villageois, Traders, militaires) par lots de 2. Le Golden Tent est l'unique bâtiment de montée d'âge - pas de Landmarks classiques - et permet d'entraîner Batu Khan et les Torguuds. Les Ovoos construits sur des gisements de pierre alimentent un arbre technologique unique payé en pierre, et les Stockyards remplacent les fermes pour la nourriture.",bonuses:[{icon:"👥",title:"Hordes - Production en lots de 2",desc:"Villageois, Traders et la plupart des unités militaires sont produits par paires pour le coût d'une seule commande (sauf Khan, Shamans, siège, navires et Scouts)."},{icon:"⛺",title:"Golden Tent - Montée d'âge unique",desc:"Seul bâtiment de montée d'âge de la civilisation. À chaque âge, choisis l'une de deux options (ex: Khan and Torguuds en Féodal) et active des Edicts qui modifient les auras des Fortified Outposts."},{icon:"🪨",title:"Ovoos et technologies de pierre",desc:"Les Ovoos construits sur les gisements de pierre permettent une récolte automatique et débloquent un arbre technologique unique payé entièrement en pierre. +1 Ovoo max par âge."},{icon:"🐑",title:"Stockyard et Stables précoces",desc:"Le Stockyard remplace les Fermes/Pâtures : jusqu'à 4 villageois récoltent simultanément la nourriture des moutons avec dépôt direct. Stables disponibles dès l'âge Sombre. Ne peut construire ni Donjons ni Murs de Pierre."}],uniqueUnits:[{name:"Batu Khan",desc:""},{name:"Torguud",desc:""},{name:"Kharash",desc:""},{name:"Kipchak Archer",desc:""},{name:"Rus Tribute",desc:""},{name:"Keshik",desc:""}],landmarks:[]},
  'macedonienne':{playstyle:"La Macédonienne est une variante des Byzantins (DLC Dynasties of the East) incarnant la dynastie macédonienne (867-1056). Elle introduit l'argent comme 5e ressource : la Galena Gathering convertit automatiquement une partie de l'or et de la pierre récoltés. Cet argent finance l'Arsenal Varègue, qui débloque des améliorations militaires uniques sans limite de palier, et les Forteresses Varègues qui produisent des unités nordiques (Atgeirmaðr, Bogmaðr, Riddari, Varangian Guard) dès le Féodal, en plus des Cataphractes et Cheirosiphons hérités des Byzantins.",bonuses:[{icon:"💰",title:"Galena Gathering - Argent passif",desc:"Les villageois extraient automatiquement de l'argent égal à 40% de l'or et de la pierre récoltés. Démarre avec 100 argent en plus des ressources habituelles."},{icon:"⚒️",title:"Varangian Smithing - Arsenal Varègue",desc:"L'Arsenal Varègue propose des améliorations militaires uniques payées en argent, pouvant dépasser les 3 paliers classiques (jusqu'à 8 niveaux)."},{icon:"🏰",title:"Varangian Strongholds",desc:"Remplacent les Casernes : produisent toutes les unités varègues et tirent des flèches pour se défendre."},{icon:"🗿",title:"Varangian Runestones",desc:"Bâtiment unique qui octroie des bonus de combat à toutes les unités varègues proches."}],uniqueUnits:[{name:"Varangian Guard",desc:""},{name:"Atgeirmaðr",desc:""},{name:"Bogmaðr",desc:""},{name:"Riddari",desc:""},{name:"Cataphract",desc:""}],landmarks:[]},
  'sengokudaimyo':{playstyle:"Le Sengoku Daimyo est une variante des Japonais (DLC Dynasties of the East) incarnant les seigneurs de guerre de l'ère Sengoku Jidai (1467-1615). Sa mécanique signature est le Daimyo Estate : choisis l'un des trois clans - Hojo (infanterie de mêlée), Oda (infanterie à distance) ou Takeda (cavalerie) - qui débloque des unités et technologies propres ainsi que le Daimyo, une cavalerie lourde héroïque dont l'aura de vitesse d'attaque persiste même après sa mort. Le Matsuri et les Yatai offrent une économie alimentaire continue et inépuisable, avec tous les cerfs et sangliers révélés dès le début.",bonuses:[{icon:"⛩️",title:"Daimyo Estate - Choix de clan",desc:"Choisis Hojo, Oda ou Takeda. Chaque Daimyo Estate (jusqu'à 3 par clan) débloque des technologies et bonus propres au clan, ainsi que la production de Daimyo."},{icon:"🏯",title:"Daimyo - Aura persistante",desc:"Cavalier lourd héroïque qui augmente la vitesse d'attaque des unités proches, avec un effet d'aura qui persiste même après sa mort."},{icon:"🍶",title:"Matsuri - Marché-festival",desc:"Crée une aura augmentant la vitesse de récolte de nourriture des villageois proches."},{icon:"🦌",title:"Yatai et révélation du gibier",desc:"Les Yatai récoltent nourriture sans épuiser la ressource. Tous les cerfs et sangliers sont révélés dès le début de la partie."}],uniqueUnits:[{name:"Daimyo",desc:""},{name:"Kanabo Samurai",desc:""},{name:"Tanegashima Ashigaru",desc:""},{name:"Ikko-Ikki Monk",desc:""},{name:"Yari Cavalry",desc:""},{name:"Naginata Samurai",desc:""},{name:"Yatai",desc:""}],landmarks:[]},
  'tughluq':{playstyle:"La Dynastie Tughlaq est une variante du Delhi Sultanat (DLC Dynasties of the East) incarnant la dynastie qui domina le sultanat de Delhi (1320-1413). Elle remplace les bâtiments de dépôt classiques par les Worker Elephants (Working Companions), des unités mobiles qui font office de Moulin/Camp de Bois/Camp Minier où elles sont placées. La recherche Erudition accélère toutes les technologies (5 secondes, +20% de coût), tandis que les Forts de Tughlaqabad (Legendary Forts) débloquent jusqu'à 6 Gouverneurs offrant des bonus économiques, militaires ou religieux. Sa puissance militaire repose sur le Raider Elephant, le Ballista Elephant et le Healer Elephant, soutenus par les Amir Warriors sans coût de population.",bonuses:[{icon:"🐘",title:"Working Companions - Worker Elephants",desc:"Les Worker Elephants remplacent le Moulin, le Camp de Bois et le Camp Minier : ils servent de point de dépôt mobile partout où ils sont placés."},{icon:"⏱️",title:"Erudition - Recherche accélérée",desc:"Toutes les technologies (hors emplacements) se recherchent en 5 secondes, mais coûtent 20% de plus."},{icon:"🏯",title:"Legendary Forts - Gouverneurs",desc:"Les Forts de Tughlaqabad remplacent les Donjons et débloquent jusqu'à 6 Gouverneurs (Ajmer, Bhakkar, Jalor, Multan, Sehwan, Uch) offrant des bonus économiques et militaires."},{icon:"🧱",title:"Frontier Fortifications & Basketry",desc:"L'infanterie construit des palissades. Basketry augmente la récolte et le transport de baies, Defensive Deckhands renforce les bateaux de pêche."}],uniqueUnits:[{name:"Worker Elephant",desc:""},{name:"Raider Elephant",desc:""},{name:"Ballista Elephant",desc:""},{name:"Healer Elephant",desc:""},{name:"Amir Warrior",desc:""}],landmarks:[]},
  'jindynasty':{playstyle:"La Dynastie Jin est une variante de la Chine du DLC Yue Fei's Legacy, incarnant l'empire fondé par les Jurchens (1115-1234). Sa mécanique distinctive repose sur les Villageois Montés, plus rapides et meilleurs collecteurs, sur les Emissaires qui établissent des Tributaires pour un revenu passif, et sur les Grasslands qui font naître des chevaux renforçant toute la cavalerie. Les emplacements Meng'an Mouke produisent automatiquement des défenseurs pour la défense de base.",bonuses:[{icon:"🐎",title:"Villageois Montés - Économie mobile",desc:"Jusqu'à 20 Villageois Montés (plus avec des Emissaires actifs) se déplacent et collectent plus rapidement que les villageois standards, en échange d'un coût en nourriture et en or."},{icon:"🌾",title:"Grasslands - Chevaux pour la cavalerie",desc:"Trois emplacements de Grasslands font naître des chevaux au fil du temps. Ces chevaux augmentent les PV de la cavalerie ou permettent un entraînement monté instantané à coût réduit."},{icon:"🏛️",title:"Emissaires et Tributaires",desc:"Jusqu'à deux Emissaires peuvent établir des États Tributaires (revenu en nourriture, +3 Villageois Montés, plus de revenu marchand) ou lancer Bribe pour neutraliser une unité ennemie."},{icon:"🏯",title:"Meng'an Mouke - Défense automatisée",desc:"Les structures défensives améliorées font apparaître automatiquement des défenseurs pour protéger les environs. Le Machine Workshop est accessible dès l'âge Féodal."}],uniqueUnits:[{name:"Iron Pagoda",desc:""},{name:"Mohe Tribesman",desc:""},{name:"Villageois Monté",desc:""},{name:"Bed Crossbow",desc:""},{name:"Eruptor",desc:""},{name:"Zhanma Swordsman",desc:""},{name:"Emissaire",desc:""}],landmarks:[]},
};