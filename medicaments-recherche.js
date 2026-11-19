/* Recherche unifiée : fiches IDE rédigées + index officiel BDPM. */
(() => {
  'use strict';
  const curated = window.IFSI_MEDICINES_ALL;
  const bdpm = window.IFSI_BDPM_INDEX;
  const care = window.IFSI_NURSING_DETAILS;
  const molecularCare = window.IFSI_NURSING_MOLECULES;
  const $ = id => document.getElementById(id);
  const search = $('search'), category = $('category'), counter = $('counter');
  const result = $('results'), more = $('more'), rxFilter = $('rx-filter');
  const rules = window.IFSI_IDE_RX;
  const rxFor = b => rules?.evaluate(b) || {type:'non_evalue',reason:'Non évalué',conditions:'Vérifier la réglementation'};
  const rxMark = x => {
    if(x.type==='non_evalue') return '';
    const label = x.period==='ancien' ? 'Déjà prescriptible avant 2026' : 'Nouveau droit de prescription 2026';
    const renewal = x.type==='renouvellement' ? ' · Renouvellement uniquement' : '';
    return '<span class="prescription-mark '+(x.period==='ancien'?'prior':'new')+'">'+esc(label+renewal)+'</span>';
  };
  const rxDetails = x => x.type==='non_evalue'
    ? '<p><b>Prescription IDE :</b> non évaluée automatiquement pour cette spécialité. Absence de marquage ≠ interdiction.</p>'
    : '<p class="rx-info"><b>Prescription infirmière :</b> '+esc(x.reason)+'<br><b>Catégorie :</b> '+esc(x.period==='ancien'?'Déjà prescriptible avant 2026':'Nouveau droit de prescription 2026')+'<br><b>Conditions :</b> '+esc(x.conditions)+'<br><a href="'+esc(x.source)+'" target="_blank" rel="noopener noreferrer">Consulter le texte juridique officiel</a> · vérification documentaire du '+esc(x.verifiedOn)+'</p>';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const norm = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
  if (!curated || !Array.isArray(curated.brands) || !curated.brands.length) {
    counter.textContent = 'Bibliothèque indisponible : fiches non chargées.';
    result.innerHTML = '<div class="empty">Actualisez la page ou vérifiez votre connexion.</div>';
    more.hidden = true;
    return;
  }
  const families = new Map(curated.families.map(f => [f.family, f]));
  const cards = curated.brands.map(b => ({...b, n: norm(b.name), d: norm(b.dci), kind: 'fiche', rx:rxFor(b)}));
  const records = Array.isArray(bdpm?.entries) ? bdpm.entries.map(([cis,name,dci,form,route,status]) => ({cis,name,dci,form,route,status,n:norm(name),d:norm(dci),kind:'officiel',rx:rxFor({name,dci,form,route})})) : [];
  const totalCount = cards.length + records.length;
  const all = [...cards,...records].sort((a,b) => a.name.localeCompare(b.name,'fr',{sensitivity:'base'}));
  const categories = [...new Set(curated.families.map(f => f.group))].sort((a,b) => a.localeCompare(b,'fr',{sensitivity:'base'}));
  category.innerHTML = '<option value="">Toutes les catégories</option>' + categories.map(x => '<option value="'+esc(x)+'">'+esc(x)+'</option>').join('');
  let limit = 48;
  const ranking = (b,n) => {
    if(b.n === n) return b.kind === 'fiche' ? 0 : 1;
    if(b.n.startsWith(n)) return b.kind === 'fiche' ? 2 : 3;
    if(b.n.includes(n)) return b.kind === 'fiche' ? 4 : 5;
    if(b.d === n) return b.kind === 'fiche' ? 6 : 7;
    if(b.d.startsWith(n)) return b.kind === 'fiche' ? 8 : 9;
    if(b.d.includes(n)) return b.kind === 'fiche' ? 10 : 11;
    return 12;
  };
  const para = (label, value, style) => value ? '<p'+(style?' class="'+esc(style)+'"':'')+'><b>'+esc(label)+' :</b> '+esc(value)+'</p>' : '';
  const careSection = b => {
    const f = care?.families?.[b.family] || {};
    const molecule = molecularCare?.molecules?.[b.dci] || {};
    const global = care?.global || {};
    return '<section class="ide-care" aria-label="Surveillances IDE pédagogiques">'+
      '<h4>Préparation et sécurité</h4>'+
      para('Contrôles communs',global.checks)+
      para('Avant administration — vigilance par famille',f.before)+
      (molecule.special ? para('Point spécifique de la molécule',molecule.special,'molecule-point') :
        '<p class="care-caution">Ce médicament dispose de repères par famille, pas encore d’une note spécifique de molécule. Vérifier son RCP.</p>')+
      '<h4>Suivi et accompagnement</h4>'+
      para('Surveillances complémentaires',f.follow)+
      para('Points de surveillance propres à la molécule',molecule.follow)+
      para('Éducation et conseils au patient',f.education)+
      para('Réévaluation et traçabilité',global.evaluation)+
      '<p class="care-caution">'+esc(global.scope || 'Synthèse pédagogique : confirmer avec le RCP et le protocole du service.')+'</p>'+
      '</section>';
  };
  const itemFiche = b => {
    const f = families.get(b.family) || {};
    const ref = b.url ? '<a href="'+esc(b.url)+'" target="_blank" rel="noopener noreferrer">RCP / base officielle</a>' : '<a href="https://base-donnees-publique.medicaments.gouv.fr/" target="_blank" rel="noopener noreferrer">Rechercher dans la base publique</a>';
    const vid = b.vidalUrl ? '<a href="'+esc(b.vidalUrl)+'" target="_blank" rel="noopener noreferrer">Fiche VIDAL</a>' : '';
    return '<details class="drug"><summary><span class="names"><strong class="brand">'+esc(b.name)+'</strong><span class="dci">DCI : '+esc(b.dci)+'</span><span class="group">Fiche IDE · '+esc(f.group || '')+' · '+esc(f.family || b.family)+'</span>'+rxMark(b.rx)+'</span><span class="plus" aria-hidden="true">+</span></summary>'+
      '<div class="info"><div class="care-state">Fiche infirmière enrichie · repères par famille, précisions par molécule lorsqu’elles existent</div>'+rxDetails(b.rx)+'<p><b>Indications / rôle :</b> '+esc(f.aim || 'Consulter le RCP de cette spécialité.')+'</p><p><b>Rôle IDE :</b> '+esc(f.nurse || 'Vérifier prescription et protocole.')+'</p><p><b>Surveillance :</b> '+esc(f.monitor || 'À adapter à la molécule et au patient.')+'</p>'+
      '<p class="alert"><b>Signes d’alerte :</b> '+esc(f.alarm || 'Toute réaction indésirable grave ou aggravation clinique.')+'</p>'+careSection(b)+'<div class="refs">'+ref+vid+'<a href="https://www.has-sante.fr/jcms/c_1104569/fr/guide-outils-securisation-autoevaluation-administration-medicaments-partie2-mettre-en-oeuvre" target="_blank" rel="noopener noreferrer">Guide HAS des 5 B</a></div></div></details>';
  };
  const itemOfficial = b => {
    const url = 'https://base-donnees-publique.medicaments.gouv.fr/medicament/' + encodeURIComponent(b.cis) + '/extrait';
    return '<details class="drug"><summary><span class="names"><strong class="brand">'+esc(b.name)+'</strong><span class="dci">Substance(s) active(s) : '+esc(b.dci || 'Voir RCP')+'</span><span class="group">Référence BDPM · fiche officielle de spécialité</span>'+rxMark(b.rx)+'</span><span class="plus" aria-hidden="true">+</span></summary>'+
      '<div class="info">'+rxDetails(b.rx)+'<p><b>Forme :</b> '+esc(b.form || 'Voir RCP')+'</p><p><b>Voie(s) :</b> '+esc(b.route || 'Voir RCP')+'</p><p><b>État de commercialisation (export BDPM) :</b> '+esc(b.status || 'Non renseigné')+'</p>'+
      '<p><b>Rôle IDE / surveillances :</b> non renseignés dans cet index. Vérifier la spécialité exacte, l’indication, les précautions, les interactions, les contre-indications et le RCP avant toute administration.</p>'+
      '<div class="refs"><a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">Consulter le RCP officiel (CIS '+esc(b.cis)+')</a></div></div></details>';
  };
  function render() {
    const q = norm(search.value.trim()), cat = category.value, rxValue=rxFilter?.value || '';
    const filtered = all.filter(b => {
      if(cat && (b.kind !== 'fiche' || (families.get(b.family)||{}).group !== cat)) return false;
      if(rxValue && (rxValue==='marques' ? b.rx.type==='non_evalue' : ['ancien','nouveau'].includes(rxValue) ? b.rx.period!==rxValue : b.rx.type!==rxValue)) return false;
      return !q || b.n.includes(q) || b.d.includes(q) || (b.kind === 'fiche' && norm(b.family).includes(q));
    });
    if(q) filtered.sort((a,b) => ranking(a,q) - ranking(b,q) || a.name.localeCompare(b.name,'fr',{sensitivity:'base'}));
    const sourceInfo = records.length ? records.length.toLocaleString('fr-FR')+' spécialités BDPM + '+cards.length+' fiches IDE' : cards.length+' fiches IDE (index officiel temporairement indisponible)';
    counter.innerHTML = '<strong>'+filtered.length.toLocaleString('fr-FR')+' résultat(s)</strong><span>sur '+totalCount.toLocaleString('fr-FR')+' entrées · '+sourceInfo+'</span>';
    result.innerHTML = filtered.length ? filtered.slice(0,limit).map(b => b.kind==='fiche' ? itemFiche(b) : itemOfficial(b)).join('') : '<div class="empty"><b>Aucun nom correspondant.</b><p>Essayez une marque ou une DCI. Consultez aussi la <a href="https://base-donnees-publique.medicaments.gouv.fr/" target="_blank" rel="noopener noreferrer">base officielle des médicaments</a>.</p></div>';
    more.hidden = filtered.length <= limit;
    more.textContent = 'Afficher les suivants ('+Math.min(48,Math.max(0,filtered.length-limit))+')';
    const note=$('source-note');
    if(note) note.textContent = records.length ? 'Index officiel BDPM téléchargé le '+new Date(bdpm.downloadedAt).toLocaleDateString('fr-FR')+' · '+records.length.toLocaleString('fr-FR')+' spécialités. Le filtre par famille s’applique uniquement aux fiches IDE relues.' : 'Index BDPM non chargé. Les fiches IDE restent accessibles.';
  }
  search.addEventListener('input', () => {limit=48;render();});
  category.addEventListener('change', () => {limit=48;render();});
  if(rxFilter) rxFilter.addEventListener('change', () => {limit=48;render();});
  more.addEventListener('click', () => {limit+=48;render();});
  $('clear').addEventListener('click', () => {search.value='';category.value='';if(rxFilter)rxFilter.value='';limit=48;render();search.focus();});
  document.querySelectorAll('[data-example]').forEach(btn => btn.addEventListener('click',() => {search.value=btn.dataset.example;category.value='';limit=48;render();search.focus();}));
  const params=new URLSearchParams(window.location.search);
  if(params.has('q')) search.value=params.get('q').slice(0,100);
  render();
})();
