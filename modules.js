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
    showModal('<h2>Lexique infirmier A–Z</h2><p>Définitions courtes pour réviser. Elles ne remplacent pas les protocoles de soin.</p><label class="module-search-label">Rechercher un terme<input id="lexQuery" type="search" placeholder="Ex. dyspnée"></label><div class="glossary-list" id="lexResults"></div>' + closeButton);
    attachClose();
    const q = document.querySelector('#lexQuery'), root = document.querySelector('#lexResults');
    const update = () => { const needle = norm(q.value); root.innerHTML = dictionary.filter(([word,def])=>!needle||norm(word+' '+def).includes(needle)).map(([word,def])=>'<div class="glossary-item"><b>'+E(word)+'</b><span>'+E(def)+'</span></div>').join('') || '<p>Aucun terme trouvé.</p>'; };
    q.oninput = update; update();
  }
  function visualModule() {
    showModal('<h2>Fiches A5 et cours A4 par UE</h2><p>Choisis un support pour l’ouvrir. L’organisation est commune à toutes les personnes utilisant le lien publié.</p><div class="module-results" id="moduleResults"></div>' + closeButton);
    attachClose();
    results(all().sort((a,b)=>a.ue.localeCompare(b.ue,'fr') || a.title.localeCompare(b.title,'fr')));
  }
  function lawModule() {
    showModal(
      '<h2>Juridique, lois et déontologie infirmière</h2>' +
      '<p>Références officielles consultables par tous. Vérifier sur Légifrance la version en vigueur à la date du soin ou du devoir.</p>' +
      '<h3>Déontologie et exercice infirmier</h3>' +
      '<div class="legal-links">' +
      '<a target="_blank" rel="noopener noreferrer" href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072665/LEGISCTA000006178629/">Code de déontologie des infirmiers — articles R4312-1 à R4312-92 (Légifrance)</a>' +
      '<a target="_blank" rel="noopener noreferrer" href="https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006161001">Exercice et règles professionnelles IDE — articles R4311 et R4312 (Légifrance)</a>' +
      '<a target="_blank" rel="noopener noreferrer" href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000051806032/">Loi n° 2025-581 du 27 juin 2025 sur la profession infirmière</a>' +
      '<a target="_blank" rel="noopener noreferrer" href="https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072665/">Code de la santé publique — texte intégral</a>' +
      '</div>' +
      '<h3>Textes officiels et références de soins</h3>' +
      '<div class="legal-links">' +
      '<a target="_blank" rel="noopener noreferrer" href="https://www.legifrance.gouv.fr/">Légifrance — rechercher lois, décrets et arrêtés</a>' +
      '<a target="_blank" rel="noopener noreferrer" href="https://www.has-sante.fr/">Haute Autorité de santé — recommandations</a>' +
      '<a target="_blank" rel="noopener noreferrer" href="https://ansm.sante.fr/">ANSM — médicaments et sécurité</a>' +
      '<a target="_blank" rel="noopener noreferrer" href="https://sante.gouv.fr/">Ministère chargé de la Santé</a>' +
      '</div>' + closeButton
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
  const modules = { search: searchModule, glossary: glossaryModule, visual: visualModule, law: lawModule, dose: doseModule };
  document.querySelectorAll('button[data-module]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (modules[btn.dataset.module]) modules[btn.dataset.module]();
    });
  });
})();
