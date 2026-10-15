/* Modules complémentaires du classeur IFSI. Fonctionnent sur la bibliothèque publiée. */
(() => {
  'use strict';
  const E = esc;
  const norm = v => normalized(v);
  const all = () => state.records.filter(d => !d.archived);
  const closeButton = '<div class="modal-footer"><span></span><button type="button" class="btn primary" id="closeModal">Fermer</button></div>';
  const attachClose = () => { const b = document.querySelector('#closeModal'); if (b) b.onclick = closeModal; };
  function go(d) {
    state.sem = d.sem;
    state.bind = d.type === 'FICHE' ? 'A5' : 'A4';
    state.search = '';
    const sb = document.querySelector('#searchBox');
    if (sb) sb.value = '';
    state.at = 0;
    persist();
    closeModal();
    refresh();
    jumpDoc(d.id);
  }
  function results(items) {
    const root = document.querySelector('#moduleResults');
    if (!root) return;
    if (!items.length) { root.innerHTML = '<p>Aucun document trouvé.</p>'; return; }
    root.innerHTML = items.map(d => '<button type="button" class="result-card" data-open="' + E(d.id) + '"><b>UE ' + E(d.ue) + ' · ' + E(d.type === 'FICHE' ? 'Fiche A5' : 'Cours A4') + '</b><span>' + E(d.title) + '</span><span>' + E(d.sem) + ' · ' + E(d.topic) + '</span></button>').join('');
    root.querySelectorAll('[data-open]').forEach(el => el.onclick = () => {
      const d = all().find(x => x.id === el.dataset.open);
      if (d) go(d);
    });
  }
  function searchModule() {
    showModal('<h2>Recherche dans les cours et les fiches</h2><p>Recherche par UE, titre ou thème dans les documents publiés.</p><label class="module-search-label">Mots-clés<input id="moduleQuery" type="search" autocomplete="off" placeholder="Ex. hygiène, douleur, paramètres vitaux…"></label><div class="module-results" id="moduleResults"></div>' + closeButton);
    attachClose();
    const search = document.querySelector('#moduleQuery');
    const update = () => {
      const q = norm(search.value);
      const docs = all().filter(d => !q || norm([d.title, d.ue, d.topic, d.type, d.notes || ''].join(' ')).includes(q));
      results(docs.slice(0, 100));
    };
    search.oninput = update;
    update();
    search.focus();
  }
  const dictionary = [
    ['Asepsie', 'Mesures destinées à éviter la contamination par des micro-organismes.'],
    ['Antisepsie', 'Réduction ou élimination de micro-organismes sur des tissus vivants avec un antiseptique.'],
    ['Bactériémie', 'Présence de bactéries dans le sang.'],
    ['Bradycardie', 'Fréquence cardiaque inférieure à la valeur attendue selon le contexte.'],
    ['Cyanose', 'Coloration bleutée de la peau ou des muqueuses, pouvant traduire un défaut d’oxygénation.'],
    ['Diurèse', 'Volume des urines produites pendant une durée donnée.'],
    ['Dyspnée', 'Sensation de difficulté à respirer.'],
    ['Érythème', 'Rougeur de la peau liée à une augmentation locale de la circulation sanguine.'],
    ['Fièvre', 'Élévation de la température corporelle, généralement ≥ 38 °C selon la méthode de mesure.'],
    ['Fréquence respiratoire', 'Nombre de cycles respiratoires en une minute.'],
    ['Hématémèse', 'Vomissement de sang.'],
    ['Hémostase', 'Ensemble des mécanismes qui permettent l’arrêt d’un saignement.'],
    ['Hypoglycémie', 'Diminution anormale de la glycémie. Son seuil dépend du contexte clinique.'],
    ['Hypoxémie', 'Diminution de la concentration d’oxygène dans le sang artériel.'],
    ['Iatrogène', 'Effet indésirable résultant d’un soin ou d’une intervention de santé.'],
    ['Infection nosocomiale', 'Infection associée aux soins contractée au cours d’un séjour en établissement de santé.'],
    ['Lésion', 'Altération de la structure d’un tissu ou d’un organe.'],
    ['Œdème', 'Accumulation anormale de liquide dans les tissus.'],
    ['Oligurie', 'Diminution du volume d’urines produites.'],
    ['Perfusion', 'Administration d’une solution par une voie d’accès, généralement intraveineuse.'],
    ['Saturation SpO₂', 'Estimation non invasive de la saturation en oxygène de l’hémoglobine par oxymétrie de pouls.'],
    ['Tachycardie', 'Fréquence cardiaque supérieure à la valeur attendue selon le contexte.'],
    ['Tachypnée', 'Fréquence respiratoire supérieure à la valeur attendue selon le contexte.'],
    ['Tension artérielle', 'Pression exercée par le sang sur la paroi des artères.']
  ];
  function glossaryModule() {
    const expanded = Array.isArray(window.IFSI_LEXICON) && window.IFSI_LEXICON.length > 30;
    const source = expanded
      ? window.IFSI_LEXICON
      : dictionary.map(([term,definition]) => ({term,definition,category:'Notions fondamentales'}));
    const entries = [...source].sort((a,b) => a.term.localeCompare(b.term,'fr',{sensitivity:'base'}));
    const categories = [...new Set(entries.map(x=>x.category))].sort((a,b)=>a.localeCompare(b,'fr'));
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const options = (items,allLabel) =>
      '<option value="">' + E(allLabel) + '</option>' +
      items.map(s=>'<option value="'+E(s)+'">'+E(s)+'</option>').join('');
    showModal(
      '<h2>Lexique infirmier A–Z · S1 à S6 et stages</h2>' +
      '<p><b>'+entries.length+' termes</b> : observations, pathologies, médicaments, dispositifs, urgences, psychiatrie, gériatrie, pédiatrie et vocabulaire des stages.</p>' +
      '<p>Lexique pédagogique complémentaire : les thèmes facilitent les révisions, mais ne correspondent pas à une répartition officielle par semestre. Les définitions restent synthétiques.</p>' +
      '<label class="module-search-label" for="lexQuery">Rechercher un terme, un sigle ou une définition' +
      '<input id="lexQuery" type="search" autocomplete="off" placeholder="Ex. dyspnée, RAI, ACR, Glasgow…"></label>' +
      '<div class="lex-filters" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin:12px 0">' +
      '<label>Thème<select id="lexCategory">'+options(categories,'Tous les thèmes')+'</select></label>' +
      '<label>Première lettre<select id="lexLetter">'+options(alphabet,'Toutes les lettres')+'</select></label>' +
      '<label>Type<select id="lexKind"><option value="">Tous les termes</option><option value="abbrev">Sigles et abréviations</option></select></label>' +
      '</div>' +
      '<p id="lexCount" aria-live="polite"></p>' +
      '<div class="glossary-list" id="lexResults"></div>' +
      '<div style="text-align:center;margin:12px"><button type="button" class="btn" id="lexMore" style="display:none">Afficher 75 termes supplémentaires</button></div>' +
      '<p style="font-size:11px">Une définition ne remplace ni un protocole de service, ni une prescription, ni une évaluation clinique. Le vocabulaire peut varier selon les établissements. ' +
      '<a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053568913" target="_blank" rel="noopener noreferrer">Référentiel IDE 2026</a>.</p>' +
      closeButton
    );
    attachClose();
    const q=document.querySelector('#lexQuery');
    const cat=document.querySelector('#lexCategory');
    const letter=document.querySelector('#lexLetter');
    const kind=document.querySelector('#lexKind');
    const root=document.querySelector('#lexResults');
    const counter=document.querySelector('#lexCount');
    const more=document.querySelector('#lexMore');
    let limit=75;
    const abbr = t => {
      const first = t.split(' ')[0];
      return /^[A-ZÀ-Ý0-9₂]{2,9}$/.test(first) &&
        first === first.toUpperCase() && /[A-ZÀ-Ý]/.test(first);
    };
    function update(reset=false) {
      if(reset)limit=75;
      const needle=norm(q.value);
      const filtered=entries.filter(d =>
        (!needle || norm([d.term,d.definition,d.category].join(' ')).includes(needle)) &&
        (!cat.value || d.category===cat.value) &&
        (!letter.value || norm(d.term)[0]===letter.value.toLowerCase()) &&
        (!kind.value || abbr(d.term))
      );
      counter.textContent=filtered.length+' résultat'+(filtered.length>1?'s':'')+
        (filtered.length>limit?' · '+limit+' affichés':'');
      root.innerHTML=filtered.slice(0,limit).map(d =>
        '<div class="glossary-item"><b>'+E(d.term)+'</b>'+
        '<span>'+E(d.definition)+'</span>'+
        '<small>'+E(d.category)+'</small></div>'
      ).join('') || '<p>Aucun terme trouvé. Essaie un autre mot ou enlève un filtre.</p>';
      more.style.display=filtered.length>limit?'inline-block':'none';
    }
    q.oninput=()=>update(true);
    cat.onchange=()=>update(true);
    letter.onchange=()=>update(true);
    kind.onchange=()=>update(true);
    more.onclick=()=>updateLimit();
    function updateLimit(){limit+=75;update(false)}
    update();
  }
  function visualModule() {
    showModal('<h2>Fiches A5 et cours A4 par UE</h2><p>Choisis un support pour l’ouvrir. L’organisation est commune à toutes les personnes utilisant le lien publié.</p><div class="module-results" id="moduleResults"></div>' + closeButton);
    attachClose();
    results(all().sort((a,b)=>a.ue.localeCompare(b.ue,'fr') || a.title.localeCompare(b.title,'fr')));
  }
  
  const lawSections = [
  {
    "heading": "Exercice infirmier et droits des patients",
    "links": [
      [
        "Code de la santé publique",
        "Droits des patients, exercice IDE et établissements de santé",
        "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072665/"
      ],
      [
        "Déontologie des infirmiers",
        "Règles professionnelles et devoirs de l'IDE ; articles R4312",
        "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072665/LEGISCTA000006178629/"
      ],
      [
        "Actes et exercice de la profession infirmière",
        "Textes réglementaires R4311 et R4312 ; vérifier la version applicable",
        "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072665/LEGISCTA000006161001/"
      ],
      [
        "Loi du 27 juin 2025 sur la profession infirmière",
        "Texte législatif sur l'évolution de la profession",
        "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000051806032/"
      ]
    ]
  },
  {
    "heading": "Les grands codes français",
    "links": [
      [
        "Code pénal",
        "Infractions, responsabilités pénales et sanctions",
        "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070719/"
      ],
      [
        "Code civil",
        "Responsabilité civile, contrats, réparation, personnes et biens",
        "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721/"
      ],
      [
        "Code de procédure pénale",
        "Plainte, enquête, procès pénal et droits des victimes",
        "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006071154/"
      ],
      [
        "Code du travail",
        "Contrat de travail, santé, sécurité et droits du salarié",
        "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050/"
      ],
      [
        "Code de la sécurité sociale",
        "Assurance maladie, indemnisation et prestations",
        "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006073189/"
      ],
      [
        "Code de l'action sociale et des familles",
        "Personnes vulnérables, établissements médico-sociaux et protection",
        "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074069/"
      ]
    ]
  },
  {
    "heading": "Vérifier une loi, un article ou une décision",
    "links": [
      [
        "Légifrance — textes officiels",
        "Rechercher le texte, son numéro, sa date et ses versions",
        "https://www.legifrance.gouv.fr/"
      ],
      [
        "Service-Public.fr",
        "Fiches officielles expliquant les droits et démarches",
        "https://www.service-public.fr/"
      ],
      [
        "Vie-publique",
        "Explications sur les lois, les institutions et les réformes",
        "https://www.vie-publique.fr/"
      ],
      [
        "Cour de cassation — Judilibre",
        "Vérifier la jurisprudence judiciaire et pénale",
        "https://www.courdecassation.fr/recherche-judilibre"
      ],
      [
        "Conseil d'État — ArianeWeb",
        "Vérifier la jurisprudence administrative",
        "https://www.conseil-etat.fr/"
      ],
      [
        "EUR-Lex",
        "Textes de l'Union européenne et règlements",
        "https://eur-lex.europa.eu/"
      ]
    ]
  },
  {
    "heading": "Organismes de référence en santé et droits",
    "links": [
      [
        "Haute Autorité de santé (HAS)",
        "Recommandations de bonnes pratiques et qualité des soins",
        "https://www.has-sante.fr/"
      ],
      [
        "ANSM",
        "Médicaments, dispositifs médicaux et informations de sécurité",
        "https://ansm.sante.fr/"
      ],
      [
        "Ministère chargé de la Santé",
        "Politique de santé et informations institutionnelles",
        "https://sante.gouv.fr/"
      ],
      [
        "CNIL",
        "Données personnelles, droits RGPD et réclamations",
        "https://www.cnil.fr/"
      ],
      [
        "Défenseur des droits",
        "Droits des usagers et lutte contre les discriminations",
        "https://www.defenseurdesdroits.fr/"
      ]
    ]
  },
  {
    "heading": "Fiabilité des sites et documents",
    "links": [
      [
        "Cybermalveillance.gouv.fr",
        "Conseils officiels pour identifier les arnaques et sites suspects",
        "https://www.cybermalveillance.gouv.fr/"
      ],
      [
        "Annuaire des entreprises",
        "Vérifier l'existence légale d'une entreprise en France",
        "https://annuaire-entreprises.data.gouv.fr/"
      ],
      [
        "AFNIC — Whois",
        "Consulter les informations publiques sur un nom de domaine",
        "https://www.afnic.fr/outils/whois/"
      ]
    ]
  }
];
  function lawModule() {
    const content = lawSections.map(section =>
      '<h3 class="legal-subhead">' + E(section.heading) + '</h3>' +
      '<div class="legal-links">' +
      section.links.map(([title, description, url]) =>
        '<a class="legal-link" target="_blank" rel="noopener noreferrer" href="' + E(url) + '">' +
        '<b>' + E(title) + ' ↗</b>' +
        '<span>' + E(description) + '</span>' +
        '</a>'
      ).join('') + '</div>'
    ).join('');
    showModal(
      '<h2>Juridique — codes et références officielles</h2>' +
      '<p>Bibliothèque de liens pour les études infirmières, les droits et les recherches juridiques. Les liens ouvrent les textes et sites de référence.</p>' +
      '<div class="legal-callout"><b>Vérifier un texte :</b> relever le numéro de l’article, vérifier la version en vigueur ou la version applicable à la date des faits, puis identifier la source officielle. Une fiche explicative ne remplace pas le texte de loi.</div>' +
      content +
      '<p class="legal-foot" style="margin-top:16px">Accès en ligne : les sites externes peuvent évoluer. Les sources officielles font foi ; cette bibliothèque ne constitue pas un conseil juridique.</p>' +
      closeButton
    );
    attachClose();
  }
  const tests = [
    {q:'Une solution contient 500 mg dans 10 mL. Quel volume contient 150 mg ?', answer:3, unit:'mL', reason:'500 ÷ 10 = 50 mg/mL ; 150 ÷ 50 = 3 mL.'},
    {q:'Un flacon contient 1 g de principe actif dans 20 mL. Quel volume correspond à 250 mg ?', answer:5, unit:'mL', reason:'1 g = 1000 mg ; 1000 ÷ 20 = 50 mg/mL ; 250 ÷ 50 = 5 mL.'},
    {q:'250 mL doivent passer en 2 heures. Quel débit en mL/h ?', answer:125, unit:'mL/h', reason:'250 ÷ 2 = 125 mL/h.'},
    {q:'Une perfusion de 750 mL passe en 5 heures. Quel débit en mL/h ?', answer:150, unit:'mL/h', reason:'750 ÷ 5 = 150 mL/h.'},
    {q:'Un comprimé est dosé à 200 mg. Combien de comprimés de même dosage représentent 400 mg ?', answer:2, unit:'comprimés', reason:'400 ÷ 200 = 2 comprimés.'}
  ];
  function doseModule() {
    let index = 0;
    showModal('<h2>Mini-quiz — calculs de doses</h2><p>Exercices de calcul pour étudiants, sans valeur de prescription. En situation réelle, vérifier la prescription, le protocole et les contrôles de sécurité.</p><div id="doseExercise"></div>' + closeButton);
    attachClose();
    const root = document.querySelector('#doseExercise');
    const show = () => {
      const t = tests[index];
      root.innerHTML = '<div class="dose-card"><p><b>Question '+(index+1)+' / '+tests.length+'</b></p><p>'+E(t.q)+'</p><label>Réponse ('+E(t.unit)+') <input type="number" id="doseAnswer" inputmode="decimal" step="any"></label><div class="dose-feedback" id="doseFeedback"></div><div class="modal-footer"><button type="button" class="btn" id="doseCheck">Corriger</button><button type="button" class="btn primary" id="doseNext">Question suivante</button></div></div>';
      document.querySelector('#doseCheck').onclick = () => {
        const input = document.querySelector('#doseAnswer'), raw = input.value.trim();
        const ok = raw!=='' && Number.isFinite(Number(raw)) && Math.abs(Number(raw)-t.answer)<0.00001;
        document.querySelector('#doseFeedback').innerHTML = '<p class="'+(ok?'good-answer':'try-answer')+'">'+(ok?'Bonne réponse.':'Réponse attendue : '+t.answer+' '+E(t.unit)+'.')+'</p><p>'+E(t.reason)+'</p>';
      };
      document.querySelector('#doseNext').onclick = () => { index=(index+1)%tests.length; show(); };
    };
    show();
  }

  /* Extensions pédagogiques – glossaire tiré des fiches A4/A5 IFSI ; familles
     médicamenteuses : synthèse externe HAS/ANSM/BDPM, 15 octobre 2026. */
  dictionary.push(...[["Accident d’exposition au sang (AES)","Contact accidentel avec du sang ou un liquide biologique à risque : agir immédiatement selon la procédure.","B3"],["Adaptation","Ajustement face à une situation nouvelle selon les ressources de la personne.","B2"],["Adhésion thérapeutique","Participation de la personne au traitement convenu avec les professionnels.","B2"],["Affect","Tonalité émotionnelle d’une expérience, parfois durable.","B2"],["Agent pathogène","Micro-organisme capable de provoquer une maladie.","B3"],["Allodynie","Douleur ressentie après un stimulus normalement non douloureux.","B1"],["Anémie","Diminution du taux d’hémoglobine sous les valeurs de référence adaptées à la personne.","B1"],["Antigène","Élément reconnu par le système immunitaire.","B1"],["Apgar (score)","Évaluation rapide de l’adaptation du nouveau-né à 1 et 5 minutes : cinq critères, chacun coté de 0 à 2.","B2"],["ARS","Agence régionale de santé : met en œuvre la politique de santé sur son territoire.","A2"],["Attachement","Lien affectif contribuant à la sécurité du jeune enfant et à son développement.","B2"],["Autonomie","Capacité à choisir et agir selon ses ressources ; ne se confond pas avec l’absence d’aide.","A1"],["Besoins fondamentaux","Besoins de la personne utilisés comme repères pour évaluer sa situation de soins.","A1"],["Bionettoyage","Entretien destiné à réduire la contamination des surfaces selon les protocoles.","B3"],["Bruit (communication)","Élément qui perturbe la transmission ou la compréhension d’un message.","D1"],["Caractère céphalo-caudal","Développement moteur progressant globalement de la tête vers les membres inférieurs.","B2"],["Charge virale","Quantité de matériel viral mesurée dans un prélèvement ; interprétation selon l’infection.","B1"],["Chaîne de transmission","Suite agent, réservoir, sortie, transmission, entrée et hôte permettant l’infection.","B3"],["Clairance rénale","Estimation de la capacité des reins à éliminer certaines substances.","B1"],["Coagulation","Formation de fibrine stabilisant un caillot sanguin.","B1"],["Communication non verbale","Informations transmises par le regard, les gestes, la posture et les expressions.","D1"],["Compétences psychosociales (CPS)","Capacités cognitives, émotionnelles et sociales utiles pour faire face aux situations de vie.","D1"],["Concept","Idée générale qui sert à décrire et organiser une réalité.","A1"],["Congruence","Cohérence entre expression, attitude et ce qui est vécu ou communiqué.","D1"],["Consentement","Accord libre et éclairé donné après une information adaptée ; peut être retiré.","A2"],["Coping","Stratégies mobilisées pour faire face à une situation stressante.","B2"],["Créatininémie","Concentration sanguine de créatinine, utilisée avec d’autres données pour apprécier la fonction rénale.","B1"],["Débit de filtration glomérulaire (DFG)","Estimation de la capacité de filtration des reins.","B1"],["Décontamination","Ensemble d’actions réduisant la présence ou le risque lié à des contaminants.","B3"],["Défense immunitaire","Mécanismes de l’organisme face aux agents étrangers ou pathogènes.","B1"],["Déontologie infirmière","Ensemble des devoirs professionnels fixés notamment par le Code de la santé publique.","A2"],["Dépendance","Besoin d’une aide pour certaines activités ; à préciser selon le contexte.","A1"],["Désinfection","Procédé qui réduit ou inactive les micro-organismes sur des supports inertes.","B3"],["Déterminants de santé","Facteurs sociaux, économiques, biologiques ou environnementaux influençant la santé.","C1"],["Diagnostic infirmier","Jugement clinique infirmier lié aux réactions et besoins de soins de la personne.","A1"],["Donnée objective","Information observée ou mesurée, par exemple une fréquence respiratoire.","A1"],["Donnée subjective","Information rapportée par la personne, par exemple une douleur ressentie.","A1"],["Douleur aiguë","Douleur récente, généralement associée à une cause ou à un épisode identifiable.","B1"],["Douleur chronique","Douleur qui persiste ou se répète au-delà du temps habituel de guérison, généralement plus de trois mois.","B1"],["Douleur neuropathique","Douleur causée par une lésion ou une maladie du système somatosensoriel.","B1"],["Douleur nociceptive","Douleur liée à l’activation des nocicepteurs lors d’une atteinte réelle ou potentielle des tissus.","B1"],["Échelle numérique (EN)","Outil d’autoévaluation de la douleur, souvent gradué de 0 à 10.","B1"],["Échelle visuelle analogique (EVA)","Outil d’autoévaluation de la douleur sur un repère continu.","B1"],["Écoconception des soins","Démarche réduisant l’impact environnemental des soins sans compromettre sécurité et qualité.","C2"],["Écoute active","Écouter sans interrompre, clarifier et reformuler pour comprendre la personne.","D1"],["Éducation thérapeutique du patient (ETP)","Accompagnement aidant une personne vivant avec une maladie chronique à développer des compétences utiles.","C1"],["Empathie","Comprendre le vécu de l’autre sans se confondre avec lui.","D1"],["Entretien clinique","Échange structuré destiné à recueillir le vécu, les signes et les besoins de la personne.","A1"],["Érythrocytes (hématies)","Globules rouges transportant principalement l’oxygène grâce à l’hémoglobine.","B1"],["Examen clinique","Évaluation associant observation, entretien et examen physique adaptés à la situation.","A1"],["Exposome","Ensemble des expositions vécues au fil de la vie et de leurs effets possibles.","C2"],["Feedback","Retour qui permet de vérifier la compréhension d’un message.","D1"],["Fibrinolyse","Processus de dégradation de la fibrine d’un caillot.","B1"],["Filtration glomérulaire","Étape rénale de formation du filtrat à partir du sang.","B1"],["Fréquence cardiaque (FC)","Nombre de battements du cœur par minute.","B3"],["Glasgow (score)","Évaluation du niveau de conscience par les réponses oculaire, verbale et motrice.","B3"],["Glycémie capillaire","Estimation du glucose sanguin à partir d’une goutte de sang selon un dispositif de mesure.","B3"],["Globules blancs (leucocytes)","Cellules participant à la défense immunitaire.","B1"],["Hématocrite","Proportion du volume sanguin occupée par les globules rouges.","B1"],["Hématopoïèse","Production des cellules sanguines, principalement dans la moelle osseuse.","B1"],["Hémoglobine","Protéine des globules rouges qui transporte l’oxygène.","B1"],["Homéostasie","Maintien d’un équilibre relatif du milieu intérieur malgré les variations.","B1"],["Hyperalgésie","Réponse douloureuse exagérée à un stimulus normalement douloureux.","B1"],["Hyperglycémie","Élévation de la concentration de glucose dans le sang.","B3"],["Hyperkaliémie","Élévation du potassium sanguin, pouvant perturber le rythme cardiaque.","B1"],["Hypokaliémie","Diminution du potassium sanguin, pouvant provoquer troubles musculaires et cardiaques.","B1"],["Hypotension orthostatique","Baisse de pression artérielle au passage debout avec risque de malaise ou de chute.","B3"],["IAS (infection associée aux soins)","Infection survenant pendant ou après une prise en charge et non présente ni incubante au départ.","B3"],["Identitovigilance","Vérifications permettant de relier correctement une personne à ses soins et résultats.","B3"],["Incidence","Nombre de nouveaux cas d’un événement sur une période dans une population à risque.","C1"],["Indicateur de santé","Mesure définie servant à décrire et suivre un phénomène de santé dans une population.","C1"],["Inégalités sociales de santé","Écarts de santé associés à la position et aux conditions sociales.","C1"],["INR","Mesure standardisée de la coagulation, utilisée notamment pour adapter la surveillance des AVK.","B1"],["Kaliémie","Concentration de potassium dans le sang.","B1"],["Létalité","Proportion des personnes atteintes d’une maladie qui en décèdent sur la période étudiée.","C1"],["Lymphocytes","Catégorie de globules blancs intervenant dans l’immunité.","B1"],["Maslow (besoins)","Modèle hiérarchisant des besoins ; repère pédagogique à utiliser sans ordre rigide.","B2"],["Maturation proximo-distale","Développement moteur progressant globalement du centre du corps vers les extrémités.","B2"],["Modèle biopsychosocial","Approche qui relie facteurs biologiques, psychologiques et sociaux.","B2"],["Modèle conceptuel","Cadre de concepts guidant l’observation et l’organisation des soins.","A1"],["Morbidité","Fréquence ou poids des maladies dans une population.","C1"],["Mortalité","Nombre de décès rapporté à une population pendant une période donnée.","C1"],["Motivation","Processus qui déclenche, oriente et maintient une action.","B2"],["NEWS2","Score d’alerte précoce reposant sur plusieurs paramètres physiologiques et le contexte clinique.","B3"],["NFS (numération formule sanguine)","Examen quantifiant notamment globules rouges, globules blancs et plaquettes.","B1"],["Nociception","Détection et traitement nerveux d’un stimulus potentiellement nocif, distincts de la douleur vécue.","B1"],["One Health (Une seule santé)","Approche intégrée reliant santé humaine, animale, végétale et écosystèmes.","C2"],["Osmolarité","Quantité de particules osmotiquement actives par litre de solution.","B1"],["Osmose","Déplacement d’eau à travers une membrane selon les différences de concentration en solutés.","B1"],["Plaquettes (thrombocytes)","Éléments sanguins intervenant dans l’hémostase primaire.","B1"],["PNSE","Plan national santé environnement : orientations nationales de prévention des expositions.","C2"],["Polypnée","Respiration anormalement rapide selon l’âge et le contexte clinique.","B3"],["Prévalence","Nombre de cas existants dans une population à un moment ou pendant une période.","C1"],["Prévention primaire","Actions visant à éviter l’apparition d’une maladie.","C1"],["Prévention secondaire","Actions visant le dépistage et l’intervention précoces.","C1"],["Prévention tertiaire","Actions visant à limiter complications et conséquences d’une maladie.","C1"],["PRSE","Plan régional santé environnement : déclinaison territoriale des priorités et actions.","C2"],["Précautions standard","Mesures de prévention appliquées à chaque patient, pour tout soin et dans tout lieu de soins.","B3"],["Pression artérielle (PA)","Pression du sang sur les parois artérielles, interprétée avec le contexte et les valeurs habituelles.","B3"],["Promotion de la santé","Action visant à renforcer le pouvoir d’agir des personnes et les conditions favorables à leur santé.","C1"],["Raisonnement clinique","Démarche reliant données, hypothèses, vérifications et décisions de soins.","A1"],["Rappel actif","Méthode de révision consistant à retrouver une information sans regarder le cours.","E3"],["Réflexe de Moro","Réflexe archaïque du nourrisson associant extension puis rapprochement des membres supérieurs.","B2"],["Réflexes archaïques","Réponses motrices automatiques du nouveau-né participant à l’évaluation neurologique.","B2"],["Reformulation","Redire autrement ce qui a été entendu pour vérifier la compréhension.","D1"],["Relation soignant-soigné","Relation professionnelle fondée sur écoute, respect et ajustement aux besoins de la personne.","D1"],["Répétition espacée","Révisions répétées à intervalles croissants pour consolider la mémorisation.","E3"],["Représentations de santé","Idées et croyances donnant un sens personnel ou social à la maladie et aux soins.","B2"],["Résilience","Processus d’adaptation s’appuyant sur des ressources individuelles et collectives.","C2"],["Rôle propre infirmier","Champ de soins relevant de l’initiative et de la responsabilité infirmières selon les textes en vigueur.","A2"],["SAED","Transmission structurée : Situation, Antécédents, Évaluation, Demande.","B3"],["Salutogenèse","Approche s’intéressant aux ressources et facteurs qui soutiennent la santé.","C2"],["Saturation pulsée (SpO₂)","Estimation non invasive de la saturation artérielle en oxygène par oxymètre.","B3"],["Score AVPU","Repère de vigilance : alerte, réponse à la voix, à la douleur ou absence de réponse.","B3"],["Secret professionnel","Obligation de protéger les informations confidentielles concernant une personne soignée.","A2"],["Sinner (cercle de)","Modèle du nettoyage associant action chimique, action mécanique, température et temps.","B3"],["Stress","Réponse de l’organisme et de la personne à des contraintes évaluées comme exigeantes.","B2"],["Taux de créatinine","Valeur biologique à interpréter selon âge, masse musculaire et fonction rénale.","B1"],["TCA (temps de céphaline activée)","Test de coagulation utilisé dans certaines évaluations et surveillances, notamment de l’héparine non fractionnée.","B1"],["Toxicologie","Étude des effets nocifs de substances en fonction notamment de la dose, de la voie et de l’exposition.","C2"],["Traçabilité des soins","Enregistrement daté des actes, mesures, observations et transmissions pertinentes.","A1"],["Transmissions ciblées","Écrits de soins structurés autour d’un problème ou événement, avec données, actions et résultats.","A1"],["VAK","Sigle visuel, auditif, kinesthésique : préférences déclarées, sans preuve de styles d’apprentissage fixes.","E3"],["Vigilance","État d’éveil et de réponse aux stimulations, évalué selon la situation clinique.","B3"]]);
  dictionary.sort((a, b) => a[0].localeCompare(b[0], 'fr'));
  const medicineFamilies = [{"group":"Douleur et inflammation","family":"Antalgiques non opioïdes","examples":"Paracétamol, néfopam","aim":"Soulager une douleur ou une fièvre selon l’indication.","nurse":"Vérifier la prescription, les autres spécialités contenant du paracétamol et réévaluer la douleur.","monitor":"Douleur, température ; vigilance hépatique pour le paracétamol, sueurs et tachycardie possibles avec le néfopam.","alarm":"Surdosage suspecté, réaction allergique ou malaise."},{"group":"Douleur et inflammation","family":"Antalgiques opioïdes","examples":"Morphine, oxycodone, tramadol","aim":"Traiter certaines douleurs nécessitant un opioïde.","nurse":"Contrôler la prescription, l’échelle de douleur, la voie, les associations sédatives et la traçabilité.","monitor":"Fréquence respiratoire, sédation, conscience, douleur, nausées, transit, rétention urinaire.","alarm":"Respiration ralentie, somnolence inhabituelle ou difficulté à réveiller : alerter immédiatement."},{"group":"Douleur et inflammation","family":"Anti-inflammatoires non stéroïdiens (AINS)","examples":"Ibuprofène, kétoprofène","aim":"Atténuer douleur et inflammation dans les indications retenues.","nurse":"Vérifier prescription, risques digestifs/rénaux, hydratation et traitements associés.","monitor":"Douleur, saignement digestif, douleurs gastriques, diurèse, fonction rénale selon contexte.","alarm":"Méléna, hématémèse, diminution marquée des urines ou allergie."},{"group":"Douleur et inflammation","family":"Corticoïdes systémiques","examples":"Prednisone, méthylprednisolone, hydrocortisone","aim":"Réduire certaines inflammations et traiter des situations précises.","nurse":"Administrer comme prescrit ; surveiller la tolérance et ne pas interrompre brutalement un traitement prolongé sans consigne.","monitor":"Glycémie, pression artérielle, œdèmes, humeur, signes d’infection selon contexte.","alarm":"Infection sévère, hyperglycémie importante ou aggravation clinique."},{"group":"Infections","family":"Antibiotiques bêta-lactamines","examples":"Amoxicilline, ceftriaxone, pipéracilline/tazobactam","aim":"Traiter des infections bactériennes sensibles.","nurse":"Contrôler allergie connue, prescription, voie, horaires et prélèvements demandés.","monitor":"Température, évolution des signes infectieux, réaction allergique, diarrhées, fonction rénale selon molécule.","alarm":"Difficulté respiratoire, urticaire généralisée, hypotension ou diarrhée sévère."},{"group":"Infections","family":"Antibiotiques macrolides","examples":"Azithromycine, clarithromycine","aim":"Traiter certaines infections bactériennes.","nurse":"Vérifier traitements associés, interactions et antécédents de troubles du rythme.","monitor":"Tolérance digestive, signes de troubles du rythme et ECG si indiqué.","alarm":"Palpitations avec malaise, syncope ou allergie."},{"group":"Infections","family":"Fluoroquinolones (usage encadré)","examples":"Lévofloxacine, ciprofloxacine","aim":"Antibiotiques réservés à des indications ciblées.","nurse":"Vérifier l’indication, les interactions et informer de signaler douleurs tendineuses ou fourmillements.","monitor":"Douleurs tendineuses, troubles sensitifs, état neurologique ; rythme cardiaque si pertinent.","alarm":"Douleur de tendon, neuropathie, confusion marquée ou réaction allergique."},{"group":"Anticoagulation","family":"Héparines injectables","examples":"Énoxaparine (HBPM), héparine sodique (HNF)","aim":"Prévenir ou traiter une thrombose selon prescription.","nurse":"Contrôler type d’héparine, dose prescrite, voie et dispositifs ; surveillances biologiques selon protocole.","monitor":"Saignements, plaquettes, hémoglobine ; fonction rénale, TCA ou anti-Xa selon médicament/indication.","alarm":"Hémorragie, chute brutale des plaquettes ou signes de thrombose."},{"group":"Anticoagulation","family":"Antivitamines K (AVK)","examples":"Warfarine, acénocoumarol","aim":"Anticoagulation orale suivie par INR.","nurse":"Vérifier prescription, dernier INR disponible, interactions et dates des contrôles.","monitor":"INR selon prescription, saignements, hématomes, signes de thrombose.","alarm":"Saignement anormal, chute ou traumatisme crânien."},{"group":"Anticoagulation","family":"Anticoagulants oraux directs (AOD)","examples":"Apixaban, rivaroxaban, dabigatran","aim":"Anticoagulation orale dans leurs indications autorisées.","nurse":"Vérifier molécule, horaire, fonction rénale et observance ; pas de suivi de routine par INR.","monitor":"Saignements, hémoglobine, fonction rénale, événements thrombotiques selon indication.","alarm":"Saignement inexpliqué, choc, signes neurologiques brusques."},{"group":"Anticoagulation","family":"Antiagrégants plaquettaires","examples":"Acide acétylsalicylique faible dose, clopidogrel, ticagrélor","aim":"Réduire l’agrégation des plaquettes dans les indications cardiovasculaires.","nurse":"Vérifier association à d’autres antithrombotiques et les consignes périopératoires.","monitor":"Hématomes, gingivorragies, méléna, dyspnée ou saignements.","alarm":"Saignement persistant ou signe d’hémorragie interne."},{"group":"Cardiovasculaire","family":"Diurétiques de l’anse","examples":"Furosémide, bumétanide","aim":"Augmenter l’élimination urinaire de sel et d’eau.","nurse":"Surveiller les entrées/sorties et administrer selon prescription.","monitor":"Diurèse, poids, œdèmes, pression artérielle, natrémie, kaliémie, créatinine.","alarm":"Hypotension symptomatique, déshydratation ou trouble ionique."},{"group":"Cardiovasculaire","family":"Diurétiques épargneurs de potassium","examples":"Spironolactone, éplérénone","aim":"Agir sur la rétention hydrosodée et certaines maladies cardiaques.","nurse":"Vérifier les derniers bilans prescrits et les associations augmentant le potassium.","monitor":"Kaliémie, fonction rénale, pression artérielle, poids.","alarm":"Hyperkaliémie suspectée, palpitations ou faiblesse importante."},{"group":"Cardiovasculaire","family":"IEC et sartans (ARA2)","examples":"Ramipril, périndopril ; losartan, valsartan","aim":"Traiter hypertension et certaines atteintes cardiorénales.","nurse":"Contrôler la tension, la fonction rénale et les traitements associés.","monitor":"Pression artérielle, créatinine, potassium ; toux sous IEC.","alarm":"Angio-œdème (gonflement du visage/langue), hypotension sévère."},{"group":"Cardiovasculaire","family":"Bêtabloquants","examples":"Bisoprolol, métoprolol, carvédilol","aim":"Ralentir la fréquence cardiaque ou traiter certaines maladies cardiovasculaires.","nurse":"Vérifier FC et PA, rechercher une consigne de non-administration.","monitor":"Fréquence cardiaque, pression artérielle, malaise, fatigue, bronchospasme selon terrain.","alarm":"Bradycardie symptomatique, syncope ou dyspnée importante."},{"group":"Cardiovasculaire","family":"Inhibiteurs calciques","examples":"Amlodipine, nicardipine","aim":"Traiter notamment certaines hypertensions.","nurse":"Vérifier prescription, voie et constantes.","monitor":"PA, œdèmes des chevilles, céphalées, fréquence cardiaque selon molécule.","alarm":"Hypotension symptomatique ou aggravation de l’état clinique."},{"group":"Cardiovasculaire","family":"Antiarythmiques","examples":"Amiodarone, flécaïnide","aim":"Traiter certains troubles du rythme cardiaque.","nurse":"Contrôler prescription et surveillance ECG ; rechercher les interactions.","monitor":"Fréquence et rythme cardiaques, ECG ; bilan thyroïdien et hépatique pour amiodarone selon suivi.","alarm":"Bradycardie importante, syncope ou rythme instable."},{"group":"Diabète et endocrino","family":"Insulines rapides","examples":"Insuline asparte, lispro, glulisine","aim":"Couvrir les besoins en insuline autour des repas ou en correction prescrite.","nurse":"Médicament à haut risque : vérifier identité, type, concentration, prescription, glycémie et repas.","monitor":"Glycémie, signes d’hypoglycémie, prise alimentaire, injection.","alarm":"Hypoglycémie, trouble de conscience ou erreur de type/dose."},{"group":"Diabète et endocrino","family":"Insulines basales","examples":"Insuline glargine, dégludec","aim":"Assurer une couverture insulinique prolongée.","nurse":"Distinguer de l’insuline rapide ; vérifier prescription et dispositif avant injection.","monitor":"Glycémies, hypoglycémies notamment nocturnes, état nutritionnel.","alarm":"Hypoglycémie ou confusion entre stylos."},{"group":"Diabète et endocrino","family":"Biguanides","examples":"Metformine","aim":"Traiter le diabète de type 2 selon indication.","nurse":"Vérifier la fonction rénale et les consignes en cas de déshydratation, examen ou chirurgie.","monitor":"Tolérance digestive, fonction rénale et glycémies selon suivi.","alarm":"État aigu avec déshydratation, dyspnée, faiblesse sévère : prévenir l’équipe."},{"group":"Diabète et endocrino","family":"Sulfamides hypoglycémiants","examples":"Gliclazide, glimépiride","aim":"Stimuler la sécrétion d’insuline dans le diabète de type 2.","nurse":"Vérifier la prise alimentaire et le risque d’hypoglycémie.","monitor":"Glycémie, repas, sueurs, tremblements, confusion.","alarm":"Hypoglycémie ou trouble de conscience."},{"group":"Diabète et endocrino","family":"Inhibiteurs SGLT2","examples":"Empagliflozine, dapagliflozine","aim":"Traiter selon indication diabète de type 2, insuffisance cardiaque ou maladie rénale.","nurse":"Contrôler les consignes en cas de jeûne, chirurgie ou maladie aiguë.","monitor":"Hydratation, tension, signes d’infection génito-urinaire et d’acidocétose.","alarm":"Nausées, douleurs abdominales, respiration anormale : acidocétose possible même sans forte hyperglycémie."},{"group":"Respiratoire","family":"Bronchodilatateurs bêta-2 mimétiques","examples":"Salbutamol, formotérol","aim":"Relâcher les muscles bronchiques.","nurse":"Vérifier dispositif d’inhalation et technique ; aider à l’utilisation.","monitor":"FR, SpO₂, dyspnée, fréquence cardiaque, tremblements.","alarm":"Aggravation de la détresse respiratoire ou inefficacité du traitement."},{"group":"Respiratoire","family":"Corticoïdes inhalés","examples":"Budésonide, béclométasone, fluticasone","aim":"Réduire l’inflammation bronchique dans les indications concernées.","nurse":"Vérifier la technique et le rinçage de bouche après inhalation.","monitor":"Contrôle des symptômes et signes de candidose buccale.","alarm":"Crise respiratoire : ne pas confondre avec un bronchodilatateur de secours."},{"group":"Digestif","family":"Antiémétiques","examples":"Ondansétron, métoclopramide","aim":"Soulager certaines nausées ou vomissements.","nurse":"Vérifier prescription, interactions et hydratation.","monitor":"Nausées, transit, ECG si indiqué ; mouvements anormaux sous métoclopramide.","alarm":"Troubles du rythme ou réaction neurologique anormale."},{"group":"Digestif","family":"Inhibiteurs de la pompe à protons (IPP)","examples":"Oméprazole, pantoprazole","aim":"Réduire l’acidité gastrique.","nurse":"Vérifier indication, modalités de prise et traitements associés.","monitor":"Douleurs digestives, tolérance ; magnésium et autres bilans si traitement prolongé selon prescription.","alarm":"Saignement digestif, douleurs sévères ou signes d’allergie."},{"group":"Digestif","family":"Laxatifs osmotiques","examples":"Macrogol, lactulose","aim":"Faciliter le transit en cas de constipation.","nurse":"Évaluer le transit, l’hydratation et l’indication.","monitor":"Selles, douleurs abdominales, diarrhée et hydratation.","alarm":"Douleur abdominale importante, vomissements ou suspicion d’occlusion."},{"group":"Neurologie et psychiatrie","family":"Benzodiazépines","examples":"Lorazépam, alprazolam, midazolam","aim":"Anxiolyse, sédation ou autres indications selon molécule.","nurse":"Vérifier prescription, niveau de vigilance et associations aux opioïdes.","monitor":"Conscience, respiration, chute, confusion, sédation.","alarm":"Dépression respiratoire ou difficulté à réveiller."},{"group":"Neurologie et psychiatrie","family":"Antidépresseurs ISRS","examples":"Sertraline, escitalopram, fluoxétine","aim":"Traiter certains troubles dépressifs et anxieux.","nurse":"Vérifier traitement habituel, interactions et observance ; surveiller les premiers temps.","monitor":"Humeur, sommeil, agitation, nausées ; syndrome sérotoninergique si association à risque.","alarm":"Idées suicidaires, agitation sévère, hyperthermie avec tremblements."},{"group":"Neurologie et psychiatrie","family":"Antipsychotiques","examples":"Halopéridol, rispéridone, quétiapine","aim":"Traiter certains troubles psychiatriques ou symptômes ciblés.","nurse":"Vérifier prescription, sédation, état moteur et interactions.","monitor":"Conscience, pression artérielle, syndrome extrapyramidal, ECG si indiqué, effets métaboliques.","alarm":"Hyperthermie avec rigidité et confusion : urgence."},{"group":"Neurologie et psychiatrie","family":"Antiépileptiques","examples":"Lévétiracétam, lamotrigine, valproate","aim":"Prévenir certaines crises épileptiques selon indication.","nurse":"Vérifier régularité, interactions et consignes de surveillance ; valproate : restrictions majeures liées à la reproduction.","monitor":"Crises, somnolence, humeur, éruption cutanée ; bilans selon molécule.","alarm":"Éruption grave, trouble de conscience ou aggravation des crises."},{"group":"Urgences et perfusions","family":"Vasopresseurs (milieu surveillé)","examples":"Noradrénaline, adrénaline","aim":"Soutenir la circulation dans certaines urgences.","nurse":"Administration uniquement selon prescription/protocole et en environnement adapté, avec dispositif sécurisé.","monitor":"PA rapprochée, ECG, perfusion périphérique, point de perfusion, diurèse.","alarm":"Trouble du rythme, ischémie ou extravasation."},{"group":"Urgences et perfusions","family":"Solutés de perfusion","examples":"Chlorure de sodium 0,9 %, glucose 5 %, Ringer lactate","aim":"Apport hydrique, support de perfusion ou correction ciblée selon soluté.","nurse":"Vérifier nature du soluté, prescription, compatibilité, débit et abord veineux.","monitor":"Entrées/sorties, œdèmes, diurèse, électrolytes et glycémie selon soluté.","alarm":"Détresse respiratoire, surcharge hydrique ou incident de perfusion."}];


  /* Indications de prescription IDE : arrêté du 26 juin 2026 (art. 1 et annexes).
     Attention : seules les molécules, formes et indications légalement permises le sont ;
     ne jamais généraliser à une famille entière. */
  medicineFamilies.push(...[{"group":"Sevrage et santé sexuelle","family":"Substituts nicotiniques","examples":"Nicotine en patch, gomme à mâcher, pastille ou spray buccal selon spécialité","aim":"Aide à l'arrêt du tabac en traitant les symptômes du manque.","nurse":"Évaluer tabagisme, projet de sevrage et contre-indications ; choisir la forme selon situation et protocole.","monitor":"Envies de fumer, signes de surdosage nicotinique, peau sous patch, nausées.","alarm":"Palpitations importantes, malaise, signes de surdosage."},{"group":"Sevrage et santé sexuelle","family":"Contraceptifs oraux – renouvellement","examples":"Pilules estroprogestatives ou progestatives déjà prescrites, selon prescription initiale","aim":"Assurer la continuité de la contraception orale existante.","nurse":"Vérifier ordonnance médicale de moins d'un an et durée maximale de six mois, non renouvelable ; noter les mentions exigées.","monitor":"Tolérance, facteurs de risque, prise régulière, demande de consultation.","alarm":"Signes de thrombose, céphalée brutale inhabituelle, dyspnée."},{"group":"Sevrage et santé sexuelle","family":"Contraception d'urgence médicamenteuse","examples":"Lévonorgestrel, ulipristal (selon AMM et contexte)","aim":"Prévenir une grossesse après rapport non ou mal protégé.","nurse":"Évaluer délai, contexte, risques d'interactions, allaitement éventuel et besoin d'orientation/IST ; suivre RCP.","monitor":"Vomissements après prise, règles ultérieures et symptômes de grossesse.","alarm":"Douleurs pelviennes intenses, saignement atypique ou suspicion de grossesse ectopique."},{"group":"Soins des plaies et solutions","family":"Anesthésiques locaux non injectables – plaies","examples":"Lidocaïne locale (gel/crème selon spécialité), lidocaïne/prilocaïne selon indication","aim":"Anesthésie locale adaptée dans la prévention ou le traitement d'une plaie.","nurse":"Vérifier indication, peau/muqueuse, forme non injectable, AMM, allergie et surfaces d'application.","monitor":"Peau, tolérance locale, réaction allergique, effets systémiques si risque.","alarm":"Malaise, trouble neurologique ou réaction allergique sévère."},{"group":"Soins des plaies et solutions","family":"Antiseptiques locaux – cadre IDE","examples":"Chlorhexidine, povidone iodée : uniquement produits et indications compatibles avec le cadre légal et l'AMM","aim":"Antisepsie locale dans les situations autorisées.","nurse":"Pour plaie traumatique souillée ou brûlure : uniquement pendant les 5 premiers jours, hors pied diabétique et sans produit antibiotique ; vérifier le cadre de prescription.","monitor":"Réaction cutanée, allergies, état de la plaie, signes infectieux.","alarm":"Réaction allergique grave ou aggravation de la plaie."},{"group":"Soins des plaies et solutions","family":"Nitrate d'argent à faible dosage – hyperbourgeonnement","examples":"Préparation de nitrate d'argent à faible dosage adaptée à l'indication","aim":"Traiter un hyperbourgeonnement dans le cadre des plaies.","nurse":"Vérifier localisation, indication, faible dosage, protection de la peau autour de la lésion et protocole.","monitor":"Évolution du bourgeonnement, douleur, irritation, état de la plaie.","alarm":"Brûlure chimique ou aggravation locale."},{"group":"Soins des plaies et solutions","family":"Sérum physiologique à prescription médicale facultative","examples":"Chlorure de sodium 0,9 % en conditionnement adapté à l'usage autorisé","aim":"Nettoyage ou irrigation selon présentation et indication.","nurse":"Vérifier que la spécialité est à prescription médicale facultative et que la voie prévue est adaptée.","monitor":"Tolérance, propreté du soin, intégrité du dispositif.","alarm":"Ne pas assimiler au droit de prescrire toutes les perfusions IV."},{"group":"Soins des plaies et solutions","family":"Sprays protecteurs cutanés – plaies","examples":"Film protecteur cutané en spray, selon produit de santé","aim":"Protéger la peau périlésionnelle selon indication.","nurse":"Vérifier compatibilité avec plaie, stomie, pansement et état cutané.","monitor":"Rougeur, irritation, évolution des zones fragilisées.","alarm":"Réaction locale importante ou aggravation."}]);
  const idePrescription2026 = {"Vaccins":{"status":"ancien","label":"DÉJÀ PRESCRIPTIBLE avant 2026 – cadre réactualisé","who":"Vaccins autorisés dans le calendrier vaccinal à partir de 11 ans, sauf vivants atténués chez immunodéprimés ; grippe dès 11 ans, Covid-19 dès 5 ans, selon les textes de 2026. Déclaration à l'Ordre ; formation spécifique si l'enseignement n'a pas été reçu, sauf exceptions grippe/Covid.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/","history":"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000047949121"},"Substituts nicotiniques":{"status":"ancien","label":"DÉJÀ PRESCRIPTIBLE avant 2026","who":"Droit créé en 2016 et maintenu par l'arrêté du 26 juin 2026. Concerne les substituts nicotiniques, pas les médicaments de sevrage comme la varénicline.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/","history":"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000031913827"},"Contraceptifs oraux – renouvellement":{"status":"ancien","label":"DÉJÀ POSSIBLE avant 2026 – RENOUVELLEMENT SEUL","who":"Renouvellement d'une ordonnance médicale de moins d'un an : maximum six mois, non renouvelable. Ne donne pas le droit d'initier une contraception orale. Mentions sur l'ordonnance selon annexe II.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/","history":"https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072665/LEGISCTA000006155066/2009-12-16/"},"Antalgiques non opioïdes":{"status":"nouveau","label":"NOUVEAU 2026 – SEULEMENT les antalgiques de palier I","who":"Prescription d'antalgiques de palier I, y compris pour la fièvre : paracétamol, par exemple. Attention : le néfopam cité dans cette fiche n'est pas automatiquement autorisé par cette mention ; vérifier la classification et le RCP.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/"},"Contraception d'urgence médicamenteuse":{"status":"nouveau","label":"NOUVEAU 2026 – CONTRACEPTION D'URGENCE","who":"Prescription de contraceptifs d'urgence dans les conditions de chaque spécialité. À ne pas confondre avec la prescription initiale d'une pilule contraceptive régulière.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/"},"Anesthésiques locaux non injectables – plaies":{"status":"nouveau","label":"NOUVEAU 2026 – PLAIES UNIQUEMENT","who":"Anesthésiques locaux de toute forme galénique sauf la forme injectable, pour la prévention et le traitement d'une plaie, dans les limites du RCP.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/"},"Antiseptiques locaux – cadre IDE":{"status":"nouveau","label":"NOUVEAU 2026 – INDICATIONS ENCADRÉES","who":"Pour brûlure ou plaie traumatique avec souillures : antiseptiques à large spectre sans antibiotique uniquement durant les cinq premiers jours et hors plaie du pied diabétique. L'arrêté prévoit aussi une rubrique « produits antiseptiques » dans les solutions stériles.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/"},"Nitrate d'argent à faible dosage – hyperbourgeonnement":{"status":"nouveau","label":"NOUVEAU 2026 – HYPERBOURGEONNEMENT","who":"Nitrate d'argent à faible dosage, en cas d'hyperbourgeonnement d'une plaie. Aucune autorisation de prescription générale de toutes les présentations.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/"},"Sérum physiologique à prescription médicale facultative":{"status":"nouveau","label":"NOUVEAU 2026 – SÉRUM PHYSIO PMF","who":"Sérum physiologique à prescription médicale facultative (PMF), selon la présentation et l'usage. Ne signifie pas autorisation générale de prescrire une perfusion IV de NaCl, G5 % ou Ringer.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/"},"Sprays protecteurs cutanés – plaies":{"status":"nouveau","label":"NOUVEAU 2026 – SOINS DE PLAIES","who":"Sprays protecteurs cutanés nécessaires à la prévention et au traitement de la plaie, suivant l'indication et la nature du produit.","ref":"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/"}};
  const prescriptionIDE = (m) => idePrescription2026[m.family] || null;
  const rxSource = "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/";
  function medicinesModule() {
    const cats = [...new Set(medicineFamilies.map(m => m.group))];
    const opts = ['<option value="">Toutes les catégories</option>']
      .concat(cats.map(c => '<option value="' + E(c) + '">' + E(c) + '</option>')).join('');
    showModal('<h2>Médicaments • familles et surveillance IDE</h2>' +
      '<p>Fiches de révision ESI : dénominations communes internationales (DCI), exemples représentatifs, rôle et surveillance. <b>Les exemples ne sont pas interchangeables.</b> Toujours suivre la prescription, le RCP et le protocole du service.</p>' +
      '<div class="dose-safety"><b>Sécurité :</b> vérifier les 5B (bon patient, médicament, dose, voie, moment), allergies, interactions, fonction rénale si utile ; évaluer, alerter et tracer. En stage, agir sous encadrement. Aucun dosage ni conseil de prescription ici.</div>' +
      '<div class="med-scope"><b>Prescription IDE en vigueur au 15 octobre 2026</b> · Les mentions rouges précisent le droit <em>exact</em> (partiel ou limité). Le référentiel de formation 2026 ne crée pas à lui seul un droit d\'ordonnance ; c\'est <a href="'+rxSource+'" target="_blank" rel="noopener noreferrer">l\'arrêté du 26 juin 2026</a> qui le fixe. Ces règles concernent déjà les IDE, pas uniquement les diplômés de 2029. Le champ d\'une IPA est différent.</div>' +
      '<div class="med-filters"><label>Recherche (molécule, famille ou surveillance)<input id="medQuery" type="search" placeholder="Ex. morphine, saignement, insuline"></label><label>Catégorie<select id="medGroup">' + opts + '</select></label><label>Prescription IDE<select id="medStatus"><option value="">Toutes</option><option value="ancien">Déjà autorisé avant 2026</option><option value="nouveau">Nouvelles prescriptions 2026</option><option value="sans">Non identifiées comme prescriptibles IDE</option></select></label></div>' +
      '<p class="med-count" id="medCount"></p><div class="medicine-list" id="medResults"></div>' +
      '<details class="med-scope-note"><summary>Autres prescriptions IDE de 2026 (pas des médicaments)</summary><p><b>Plaies :</b> pansements et matériel prévus à l\'article 1, durée initiale de 7 jours ; aides anti-escarres et contention à l\'identique selon limites du texte. <b>Matériels :</b> dispositifs pour incontinence/stomie, sondes et aides à la mobilité dans les conditions énumérées. <b>Examens :</b> NFS, plaquettes, ionogramme, ECBU, glycémie, renouvellement d\'INR, bilans ciblés du diabète, dépistages et bilan cardiovasculaire du sevrage tabagique, uniquement aux conditions de l\'arrêté. <a target="_blank" rel="noopener noreferrer" href="'+rxSource+'">Liste légale complète</a>.</p><p><b>Ne pas confondre :</b> un IDE n\'acquiert pas le droit de prescrire librement antibiotiques, insulines, anticoagulants, morphiniques, psychotropes ou solutés IV sur le seul fondement du référentiel. Certaines prescriptions relèvent d\'une IPA ou d\'un médecin.</p></details>' +
      '<p class="med-sources"><b>Sources de référence :</b> <a href="https://base-donnees-publique.medicaments.gouv.fr/" target="_blank" rel="noopener noreferrer">Base publique des médicaments (RCP)</a> · <a href="https://www.has-sante.fr/jcms/c_946211/fr/outils-de-securisation-et-d-auto-evaluation-de-l-administration-des-medicaments" target="_blank" rel="noopener noreferrer">HAS – administration sécurisée</a> · <a href="https://www.has-sante.fr/jcms/p_3466363/fr/flash-securite-patient-surveillance-biologique-des-anticoagulants-heparines-et-antivitamines-k-une-prise-de-sang-pour-eviter-une-perte-de-sang" target="_blank" rel="noopener noreferrer">HAS – anticoagulants</a>.</p>' + closeButton);
    attachClose();
    const q = document.querySelector('#medQuery'), g = document.querySelector('#medGroup'), st = document.querySelector('#medStatus');
    const root = document.querySelector('#medResults'), count = document.querySelector('#medCount');
    const update = () => {
      const needle = norm(q.value);
      const selected = g.value;
      const found = medicineFamilies.filter(m =>
        (!selected || m.group === selected) &&
        (!st.value || (st.value === 'sans' ? !prescriptionIDE(m) : prescriptionIDE(m)?.status === st.value)) &&
        (!needle || norm([m.group, m.family, m.examples, m.aim, m.nurse, m.monitor, m.alarm, prescriptionIDE(m)?.label||'', prescriptionIDE(m)?.who||''].join(' ')).includes(needle)));
      count.textContent = found.length + ' famille(s) affichée(s) sur ' + medicineFamilies.length;
      root.innerHTML = found.map(m => '<article class="med-card"><div class="med-card-head"><small>' + E(m.group) +
        '</small><h3>' + E(m.family) + '</h3></div><p><b>Exemples :</b> ' + E(m.examples) +
        '</p><p><b>À quoi ça sert :</b> ' + E(m.aim) +
        '</p><p><b>Actes / rôle IDE :</b> ' + E(m.nurse) +
        '</p><p><b>Surveillance :</b> ' + E(m.monitor) +
        '</p><p class="med-alert"><b>Alerte :</b> ' + E(m.alarm) +
        '</p></article>').join('') || '<p>Aucune famille trouvée.</p>';
    };
    q.oninput = update; g.onchange = update; st.onchange = update; update();
  }

  const medCss = document.createElement('style');
  medCss.textContent = '.med-scope{background:#fff5f2;border-left:4px solid #b42318;border-radius:8px;padding:12px;margin:12px 0;font-size:12px;line-height:1.6}.med-ide-annot{border:1px solid #dda8a7;background:#fff5f4;border-radius:8px;margin:8px 0 10px;padding:9px;font-size:11px;line-height:1.5}.med-ide-annot p{margin:7px 0}.med-ide-annot a{color:#a32626;font-weight:700}.med-ide-flag{display:inline-block;background:#a52323;color:white;padding:5px 7px;border-radius:5px;font-size:10px;letter-spacing:.2px}.med-ide-flag.ancien{background:#723344}.med-scope-note{margin:13px 0;padding:12px;border:1px solid #e0d9d1;border-radius:10px;background:#fff}.med-scope-note summary{cursor:pointer;font-weight:700;font-size:12px;color:#344f53}.med-scope-note p{font-size:12px;line-height:1.6}.med-filters{display:grid;grid-template-columns:1.25fr 1fr 1fr;gap:10px;margin:13px 0}.med-filters label{display:grid;gap:5px;font-size:12px;font-weight:700;color:#244b51}.med-filters input,.med-filters select{width:100%;padding:10px;border:1px solid #cadbd6;border-radius:9px;background:#fff;color:#21464b}.med-count{font-size:11px;color:#607579}.medicine-list{max-height:52vh;overflow-y:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:2px}.med-card{border:1px solid #dbe7e1;border-radius:13px;background:#fcfdfb;padding:13px}.med-card-head small{font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#5a827e}.med-card h3{margin:3px 0 7px;font-size:16px;color:#194750}.med-card p{margin:5px 0;font-size:12px;line-height:1.45}.med-card b{color:#24474d}.med-alert{padding:8px;border-radius:8px;background:#fcf0e4}.med-sources{font-size:11px;line-height:1.7;margin-top:15px}@media(max-width:760px){.med-filters,.medicine-list{grid-template-columns:1fr}.medicine-list{max-height:48vh}}';
  document.head.appendChild(medCss);
  const lexBtn = document.querySelector('button[data-module="glossary"]');
  if (lexBtn && !document.querySelector('button[data-module="medicines"]')) {
    const medBtn = document.createElement('button');
    medBtn.type = 'button';
    medBtn.dataset.module = 'medicines';
    medBtn.textContent = 'Médicaments';
    medBtn.setAttribute('aria-label', 'Médicaments par famille et surveillances infirmières');
    lexBtn.insertAdjacentElement('afterend', medBtn);
  }

  // Complément IFSI : familles courantes et médicaments à risque (sans posologie).
  medicineFamilies.push(...[{"group":"Antibiotiques et anti-infectieux","family":"Aminosides","examples":"Gentamicine, amikacine","aim":"Traitement ciblé de certaines infections bactériennes graves.","nurse":"Contrôler allergies, prescription, fonction rénale, horaires et prélèvements si prescrits.","monitor":"Créatinine, diurèse, dosages plasmatiques prescrits, audition et équilibre.","alarm":"Oligurie, troubles auditifs ou vestibulaires."},{"group":"Antibiotiques et anti-infectieux","family":"Glycopeptides","examples":"Vancomycine, téicoplanine","aim":"Traitement de certaines infections à bactéries Gram positives.","nurse":"Vérifier voie, modalités de perfusion, prescription et suivi pharmacocinétique demandé.","monitor":"Tolérance de la perfusion, fonction rénale, concentrations plasmatiques si prescrites.","alarm":"Réaction pendant perfusion, signes d'allergie ou atteinte rénale."},{"group":"Antibiotiques et anti-infectieux","family":"Antibiotiques nitro-imidazolés","examples":"Métronidazole","aim":"Traitement de certaines infections anaérobies et parasitoses.","nurse":"Vérifier indications, allergies et interactions ; administrer selon prescription.","monitor":"Nausées, signes neurologiques inhabituels, tolérance digestive.","alarm":"Confusion ou fourmillements marqués en cours de traitement."},{"group":"Antibiotiques et anti-infectieux","family":"Antibiotiques tétracyclines","examples":"Doxycycline","aim":"Traitement de certaines infections bactériennes ciblées.","nurse":"Vérifier prescription, conditions de prise, grossesse et interactions.","monitor":"Tolérance digestive, photosensibilisation, œsophagite.","alarm":"Éruption sévère ou difficulté à déglutir."},{"group":"Antibiotiques et anti-infectieux","family":"Antiviraux","examples":"Aciclovir, valaciclovir, oseltamivir","aim":"Traitement d'infections virales selon molécule et indication.","nurse":"Contrôler prescription, adaptation rénale et hydratation, notamment si aciclovir IV.","monitor":"Fonction rénale, diurèse, signes neurologiques, évolution de l'infection.","alarm":"Oligurie ou confusion nouvelle."},{"group":"Antibiotiques et anti-infectieux","family":"Antifongiques systémiques","examples":"Fluconazole, caspofungine, amphotéricine B","aim":"Traitement de mycoses selon agent et terrain.","nurse":"Vérifier traitements associés et surveillance propre au produit.","monitor":"Fonction hépatique/rénale, potassium ou magnésium selon molécule, réactions à perfusion.","alarm":"Réaction grave pendant perfusion ou trouble hydroélectrolytique."},{"group":"Cœur, circulation et thromboses","family":"Dérivés nitrés","examples":"Trinitrine, dinitrate d'isosorbide","aim":"Vasodilatation utilisée dans certaines douleurs angineuses ou insuffisances cardiaques.","nurse":"Contrôler PA, prescription, voie ; rechercher hypotension et interactions notamment inhibiteurs PDE5.","monitor":"PA, FC, douleur thoracique, céphalées, vertiges.","alarm":"Hypotension marquée, malaise ou douleur thoracique persistante."},{"group":"Cœur, circulation et thromboses","family":"Hypolipémiants – statines","examples":"Atorvastatine, rosuvastatine, simvastatine","aim":"Réduire le LDL-cholestérol et le risque cardiovasculaire selon indication.","nurse":"Vérifier prescription et interactions, notamment avec certains antibiotiques.","monitor":"Myalgies inhabituelles, faiblesse, bilans hépatiques si indiqués.","alarm":"Douleur musculaire importante avec urines foncées."},{"group":"Cœur, circulation et thromboses","family":"Inhibiteurs calciques bradycardisants","examples":"Vérapamil, diltiazem","aim":"Ralentir la conduction cardiaque et traiter certains troubles cardiovasculaires.","nurse":"Vérifier PA/FC, prescription et association avec bêtabloquants.","monitor":"FC, PA, ECG si prescrit, constipation, malaise.","alarm":"Bradycardie symptomatique, syncope."},{"group":"Cœur, circulation et thromboses","family":"Thrombolytiques – fibrinolytiques","examples":"Altéplase, ténectéplase","aim":"Dissoudre un thrombus dans des indications urgentes très encadrées.","nurse":"Appliquer exclusivement protocole spécialisé et surveillance rapprochée.","monitor":"État neurologique, PA, sites de ponction et saignements.","alarm":"Tout saignement ou déficit neurologique nouveau : urgence."},{"group":"Cœur, circulation et thromboses","family":"Héparinoïdes et apparentés antithrombotiques","examples":"Fondaparinux","aim":"Prévenir ou traiter certains événements thromboemboliques.","nurse":"Vérifier la bonne molécule, la dose prescrite et la fonction rénale.","monitor":"Saignements, fonction rénale, hémoglobine.","alarm":"Hémorragie ou hématome extensif."},{"group":"Diabète et hormones","family":"Agonistes du récepteur GLP-1","examples":"Sémaglutide, liraglutide, dulaglutide","aim":"Traitement de certains diabètes de type 2 et, selon spécialité, de l'obésité.","nurse":"Contrôler indication, dispositif, fréquence, tolérance digestive et association à une insuline.","monitor":"Nausées, vomissements, hydratation, glycémie surtout si association hypoglycémiante.","alarm":"Douleurs abdominales intenses et persistantes, déshydratation."},{"group":"Diabète et hormones","family":"Inhibiteurs DPP-4 (gliptines)","examples":"Sitagliptine, linagliptine","aim":"Traitement de certains diabètes de type 2.","nurse":"Vérifier adaptation rénale selon molécule et associations.","monitor":"Glycémie, tolérance digestive, réaction cutanée.","alarm":"Douleur abdominale persistante ou allergie."},{"group":"Diabète et hormones","family":"Hormones thyroïdiennes","examples":"Lévothyroxine","aim":"Substitution d'une insuffisance thyroïdienne.","nurse":"Vérifier spécialité, horaire et régularité de prise ; éviter les substitutions non validées.","monitor":"TSH/T4 selon prescription, FC, poids, palpitations, fatigue.","alarm":"Troubles du rythme ou signes francs de surdosage."},{"group":"Diabète et hormones","family":"Antithyroïdiens de synthèse","examples":"Carbimazole, thiamazole","aim":"Diminuer la production d'hormones thyroïdiennes.","nurse":"Vérifier prescription et consignes de contrôle de NFS.","monitor":"Fièvre, mal de gorge, signes d'infection, fonction hépatique selon molécule.","alarm":"Fièvre/angine sous traitement : alerte rapide pour exclure agranulocytose."},{"group":"Diabète et hormones","family":"Glucagon – traitement d'urgence","examples":"Glucagon","aim":"Secours de certaines hypoglycémies sévères selon protocole.","nurse":"Vérifier indication, technique, disponibilité et protocole ; prévenir l'équipe.","monitor":"Conscience, glycémie répétée, vomissements ; réévaluation après administration.","alarm":"Trouble de conscience persistant : urgence."},{"group":"Respiratoire et allergies","family":"Anticholinergiques inhalés","examples":"Ipratropium, tiotropium","aim":"Bronchodilatation dans certaines pathologies obstructives.","nurse":"Contrôler le dispositif d'inhalation et la technique.","monitor":"Dyspnée, FR, SpO₂, bouche sèche, difficulté à uriner chez sujet à risque.","alarm":"Aggravation respiratoire ou rétention urinaire aiguë."},{"group":"Respiratoire et allergies","family":"Antihistaminiques H1","examples":"Cétirizine, desloratadine, hydroxyzine","aim":"Traiter des manifestations allergiques ou, selon molécule, des symptômes associés.","nurse":"Vérifier prescription et effet sédatif ; hydroxyzine : vigilance QT et interactions.","monitor":"Somnolence, vigilance, chute, sécheresse buccale.","alarm":"Somnolence importante, palpitations/syncope."},{"group":"Respiratoire et allergies","family":"Mucolytiques / expectorants","examples":"Acétylcystéine, carbocistéine","aim":"Fluidifier les sécrétions dans certaines indications.","nurse":"Vérifier prescription et capacité du patient à expectorer.","monitor":"Toux, encombrement, tolérance digestive.","alarm":"Encombrement aggravé avec incapacité à expectorer."},{"group":"Digestif et nutrition","family":"Antispasmodiques digestifs","examples":"Phloroglucinol, trimébutine","aim":"Soulager certaines douleurs spasmodiques digestives.","nurse":"Rechercher une cause aiguë nécessitant avis médical et réévaluer les symptômes.","monitor":"Douleur, transit, signes associés, tolérance.","alarm":"Douleur aiguë intense, défense abdominale ou vomissements persistants."},{"group":"Digestif et nutrition","family":"Laxatifs stimulants","examples":"Bisacodyl, sennosides","aim":"Faciliter l'évacuation en stimulant la motricité intestinale.","nurse":"Contrôler indication et contre-indications ; accompagner hygiène et hydratation.","monitor":"Fréquence et consistance des selles, crampes, hydratation.","alarm":"Diarrhée importante, signes d'occlusion ou déshydratation."},{"group":"Digestif et nutrition","family":"Antidiarrhéiques symptomatiques","examples":"Lopéramide, racécadotril","aim":"Réduire les symptômes de certaines diarrhées selon indication.","nurse":"Évaluer signes infectieux, fièvre, sang dans les selles, hydratation.","monitor":"Transit, poids, hydratation, état général.","alarm":"Sang dans les selles, fièvre élevée, distension abdominale."},{"group":"Digestif et nutrition","family":"Nutrition entérale","examples":"Mélanges nutritifs complets par sonde (produits selon établissement)","aim":"Assurer un apport nutritionnel par voie digestive lorsque nécessaire.","nurse":"Vérifier prescription, position et perméabilité de la sonde selon protocole, débit, rinçages et installation.","monitor":"Tolérance digestive, diarrhée, vomissements, glycémie, poids, hydratation.","alarm":"Risque d'inhalation, sonde déplacée, détresse respiratoire."},{"group":"Digestif et nutrition","family":"Nutrition parentérale","examples":"Poches ternaires de nutrition parentérale (spécialités selon pharmacie)","aim":"Assurer un apport nutritionnel intraveineux sur indication spécialisée.","nurse":"Vérifier prescription, composition, voie compatible, pompe, conditions d'asepsie.","monitor":"Glycémie, température, cathéter, entrées/sorties, ionogramme et bilan hépatique selon prescription.","alarm":"Fièvre sur cathéter, malaise, trouble métabolique."},{"group":"Neurologie et psychiatrie","family":"Hypnotiques apparentés benzodiazépines","examples":"Zopiclone, zolpidem","aim":"Traitement de courte durée de certaines insomnies.","nurse":"Vérifier prescription, durée, associations sédatives et prévention du risque de chute.","monitor":"Somnolence, confusion, comportement nocturne, respiration si association sédative.","alarm":"Difficulté à réveiller, chute, respiration ralentie."},{"group":"Neurologie et psychiatrie","family":"Thymorégulateurs – lithium","examples":"Carbonate de lithium","aim":"Stabilisation de l'humeur dans certaines maladies psychiatriques.","nurse":"Vérifier observance, hydratation, interactions et bilans prescrits ; marge thérapeutique étroite.","monitor":"Lithiémie, créatinine, TSH, tremblements, nausées et diarrhée.","alarm":"Confusion, tremblements grossiers, vomissements répétés : toxicité possible."},{"group":"Neurologie et psychiatrie","family":"Antiparkinsoniens dopaminergiques","examples":"Lévodopa/carbidopa, lévodopa/bensérazide","aim":"Améliorer certains symptômes moteurs de la maladie de Parkinson.","nurse":"Respecter strictement les horaires prescrits, important pour la mobilité.","monitor":"Mobilité, dyskinésies, hypotension orthostatique, hallucinations.","alarm":"Dégradation motrice brutale, chute, confusion."},{"group":"Neurologie et psychiatrie","family":"Traitements symptomatiques des troubles cognitifs","examples":"Donépézil, rivastigmine, mémantine","aim":"Indications sélectionnées dans certains troubles cognitifs.","nurse":"Vérifier prescription, tolérance et situation du patient.","monitor":"FC pour anticholinestérasiques, transit, nausées, poids, vigilance.","alarm":"Syncope ou bradycardie symptomatique."},{"group":"Urgences et réanimation","family":"Antagonistes opioïdes","examples":"Naloxone","aim":"Réverser une dépression respiratoire liée aux opioïdes en situation appropriée.","nurse":"Appliquer protocole d'urgence, soutien ventilatoire et prescription/protocole autorisé.","monitor":"FR, SpO₂, conscience, retour éventuel de dépression respiratoire.","alarm":"Réapparition de dépression respiratoire : alerte immédiate."},{"group":"Urgences et réanimation","family":"Antidote des benzodiazépines (usage sélectionné)","examples":"Flumazénil","aim":"Antagonisation dans des situations ciblées, avec contre-indications.","nurse":"Uniquement sur prescription/protocole spécialisé, vigilance aux risques convulsifs.","monitor":"Conscience, FR, ECG selon contexte ; réapparition sédation.","alarm":"Convulsions ou détresse respiratoire."},{"group":"Urgences et réanimation","family":"Potassium injectable – électrolyte concentré","examples":"Chlorure de potassium (KCl) concentré","aim":"Corriger une hypokaliémie dans certaines situations.","nurse":"Médicament à haut risque : jamais d'injection IV directe ; dilution, voie, débit et double contrôle selon protocole.","monitor":"Kaliémie, créatinine, diurèse, point de perfusion, ECG si prescrit.","alarm":"Erreur de dilution/débit ou trouble du rythme : urgence."},{"group":"Urgences et réanimation","family":"Magnésium injectable","examples":"Sulfate de magnésium","aim":"Traitement spécialisé de certaines carences, convulsions ou troubles du rythme.","nurse":"Vérifier concentration, débit et voie selon protocole.","monitor":"FR, ROT si concerné, PA, ECG, fonction rénale.","alarm":"Respiration ralentie, hyporéflexie ou hypotension sévère."},{"group":"Urgences et réanimation","family":"Diurétiques osmotiques","examples":"Mannitol","aim":"Utilisé dans des indications spécialisées, notamment neurologiques.","nurse":"Appliquer protocole, vérifier accès IV et surveillance prescrite.","monitor":"Diurèse, bilan hydrique, osmolarité, ionogramme, fonction rénale.","alarm":"Décompensation circulatoire, surcharge ou oligurie."},{"group":"Oncologie, immunologie et os","family":"Anticancéreux cytotoxiques","examples":"Cisplatine, cyclophosphamide, fluorouracile","aim":"Traitements anticancéreux nécessitant protocoles spécialisés.","nurse":"Administration par personnel habilité et formé ; protections et vérifications spécifiques, gestion des excreta.","monitor":"NFS, infection, nausées, atteinte d'organe selon molécule, extravasation.","alarm":"Fièvre neutropénique, extravasation, saignement."},{"group":"Oncologie, immunologie et os","family":"Immunosuppresseurs","examples":"Tacrolimus, ciclosporine, mycophénolate","aim":"Prévenir le rejet de greffe ou traiter des maladies inflammatoires.","nurse":"Vérifier horaires, interactions, observance et prélèvements de taux si prescrits.","monitor":"Signes infectieux, créatinine, PA, hémogramme, dosages selon molécule.","alarm":"Fièvre ou baisse de diurèse chez patient greffé."},{"group":"Oncologie, immunologie et os","family":"Bisphosphonates","examples":"Alendronate, acide zolédronique","aim":"Traitement de certaines maladies osseuses.","nurse":"Respecter modalités d'administration spécifiques ; vérifier fonction rénale si IV.","monitor":"Calcium si prescrit, douleur osseuse, tolérance digestive, état buccodentaire.","alarm":"Douleur mandibulaire persistante, douleur osseuse atypique."},{"group":"Prévention et vaccination","family":"Vaccins","examples":"Vaccin antigrippal, vaccin dTP, vaccin hépatite B","aim":"Prévenir certaines infections.","nurse":"Vérifier indication, calendrier, prescription ou cadre autorisé, lot, conservation et consentement.","monitor":"Réactions locales, malaise, signes d'anaphylaxie, traçabilité du lot et du site.","alarm":"Difficulté respiratoire, hypotension ou réaction allergique généralisée."}]);
  const modules = { search: searchModule, glossary: glossaryModule, medicines: medicinesModule, visual: visualModule, law: lawModule, dose: doseModule };
  document.querySelectorAll('button[data-module]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (modules[btn.dataset.module]) modules[btn.dataset.module]();
    });
  });
})();
