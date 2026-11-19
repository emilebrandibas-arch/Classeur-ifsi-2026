/* Référentiel pédagogique de repérage de la prescription IDE, au 19/11/2026.
 * Source : arrêté du 26/06/2026 (JORFTEXT000054321926), articles 1-3.
 * Classification CONSERVATRICE : une absence de marquage ne signifie PAS une interdiction.
 * La capacité de prescription dépend aussi du patient, de la situation, des formations,
 * des indications du RCP, du cadre professionnel et des textes postérieurs.
 */
window.IFSI_IDE_RX = (() => {
  'use strict';
  const law = 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054321926/';
  const normalize = x => String(x ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[’']/g, ' ').replace(/\s+/g,' ').trim();
  const result = (type,reason,conditions) => ({type,reason,conditions,source:law,verifiedOn:'2026-11-19'});
  const none = result('non_evalue', 'Droit de prescription infirmière non évalué automatiquement pour cette spécialité.', 'Ne pas interpréter l’absence de marquage comme une interdiction ; vérifier la réglementation et le RCP.');
  const has = (a,s) => a.includes(s);
  const solo = (dci, word) => dci === word || dci.replace(/\s+/g,' ') === word;
  const originalForms = /COMPRIME|GELULE|CAPSULE|BUVABLE|ORALE|ORAL/;
  function evaluate(drug) {
    const name = normalize(drug.name), active = normalize(drug.dci);
    const dosage = normalize(drug.name);
    const galenic = normalize([drug.form,drug.route,drug.name].filter(Boolean).join(' '));
    const noninjectable = !/INJECT|PERFUS|INTRAVEINE|INTRAMUSCULAIRE|INTRADERMIQUE|SOUS CUTANE/.test(galenic);
    const oral = originalForms.test(galenic);
    const topical = /CUTANEE|CUTANE|CREME|GEL |POMMADE|SPRAY|APPLICATION LOCALE|EXTERNE/.test(galenic);
    if (!active) return none;

    // Prescription de traitements de substitution nicotinique (pas de mélange d'actifs).
    if ((solo(active,'NICOTINE') || active === 'NICOTINE BASE') &&
        !/INJECT|PERFUS/.test(galenic)) {
      return result('initiale','Substitut nicotinique : prescription IDE possible.',
        'Dans le cadre du sevrage tabagique ; vérifier la présentation, les contre-indications, les interactions et la prise en charge.');
    }

    // Antalgique de palier I. Exclusion des associations opioïdes et autres combinaisons.
    if (solo(active,'PARACETAMOL')) {
      return result('initiale','Paracétamol seul : antalgique de palier I / antipyrétique.',
        'Prescription IDE possible dans le cadre autorisé. Adapter à la situation clinique et contrôler RCP, contre-indications, cumul et fonction hépatique. Ne couvre pas les associations.');
    }

    // Contraception d'urgence : voie orale et doses de spécialités identifiables.
    if (oral && noninjectable && /(?:^|\s)(?:ULIPRISTAL|ACETATE D ULIPRISTAL)(?:\s|$)/.test(active) &&
        (/\b30\s*MG\b/.test(dosage) || /^ELLAONE(?:\s|$)/.test(name))) {
      return result('initiale','Contraception d’urgence par ulipristal, forme orale identifiée.',
        'Prescription IDE possible dans le cadre de la santé sexuelle ; vérifier l’indication, le délai, les interactions, le RCP et les recommandations à jour.');
    }
    if (oral && noninjectable && solo(active,'LEVONORGESTREL') &&
        (/\b1[,.]5\s*MG\b/.test(dosage) || /^NORLEVO(?:\s|$)/.test(name) || /^LEVONELLE(?:\s|$)/.test(name))) {
      return result('initiale','Contraception d’urgence par lévonorgestrel, forme orale identifiée.',
        'Prescription IDE possible dans le cadre de la santé sexuelle ; ne pas confondre avec dispositifs intra-utérins ou contraceptifs d’entretien.');
    }

    // Renouvellement, pas instauration : contraceptifs oraux identifiés à composition évocatrice.
    const progestins = ['LEVONORGESTREL','DESOGESTREL','GESTODENE','DROSPIRENONE','NORGESTIMATE','NORETHISTERONE','NORELGESTROMINE','CYPROTERONE'];
    const combinedPill = active.includes('ETHINYLESTRADIOL') && progestins.some(x => active.includes(x));
    const purePill = ['DESOGESTREL','DROSPIRENONE'].some(x => solo(active,x)) ||
        (solo(active,'LEVONORGESTREL') && /\b0[,.]03\s*MG\b/.test(dosage));
    const specialPill = /^(ZOELY|QLAIRA)(?:\s|$)/.test(name);
    if (oral && noninjectable && (combinedPill || purePill || specialPill) &&
        !/IMPLANT|DISPOSITIF INTRA|INTRA UTER|PATCH|TRANSDERMIQUE/.test(galenic)) {
      return result('renouvellement','Contraceptif oral : renouvellement IDE possible sous conditions, pas de primo-prescription.',
        'Ordonnance initiale de moins d’un an ; renouvellement de six mois maximum, non renouvelable par cette voie. Vérifier les restrictions et la prescription initiale.');
    }

    // Vaccins : un nom de spécialité n’établit jamais à lui seul l’éligibilité du patient.
    const flu = /^(VAXIGRIP|INFLUVAC|FLUARIX|FLUCELVAX|EFLUELDA|FLUAD)(?:\s|$)/.test(name);
    const covid = /^(COMIRNATY|SPIKEVAX|NUVAXOVID|VIDPREVTYN)(?:\s|$)/.test(name);
    if (flu || covid || /\bVACCIN\b/.test(name)) {
      return result('initiale','Vaccin : prescription IDE possible selon le calendrier vaccinal et les exceptions.',
        covid ? 'COVID-19 : à partir de 5 ans selon recommandations et AMM de la présentation ; vérifier les exigences de formation et contre-indications.' :
        flu ? 'Grippe saisonnière : à partir de 11 ans selon recommandations et AMM de la présentation ; vérifier les exigences de formation et contre-indications.' :
        'Vaccins du calendrier : généralement à partir de 11 ans ; exception des vaccins vivants atténués chez les personnes immunodéprimées. Vérifier le calendrier actuel et les exigences de formation.');
    }

    // Soins de plaies : ne pas étendre aux formes injectables ou aux autres indications.
    const localAnesthetic = (solo(active,'LIDOCAINE') || solo(active,'PRILOCAINE') ||
        (active.includes('LIDOCAINE') && active.includes('PRILOCAINE') &&
        !active.includes('ADRENALINE')));
    if (localAnesthetic && noninjectable && topical) {
      return result('initiale','Anesthésique local non injectable : prescription IDE possible pour certaines plaies.',
        'Uniquement dans la prévention/prise en charge de plaies relevant du champ infirmier ; vérifier la forme, le site, la surface, la durée et le RCP.');
    }

    const antiseptics = ['CHLORHEXIDINE','POVIDONE IODEE','OCTENIDINE'];
    if (noninjectable && topical && antiseptics.some(x => solo(active,x))) {
      return result('initiale','Antiseptique local : prescription IDE possible dans des indications de plaies strictement limitées.',
        'Antiseptiques à large spectre sans antibiotique : uniquement les 5 premiers jours après brûlure ou plaie traumatique souillée, hors pied diabétique. Vérifier le RCP et les exclusions.');
    }

    if (active.includes('NITRATE D ARGENT') && !active.includes(' + ') && noninjectable && topical) {
      return result('initiale','Nitrate d’argent local : prescription IDE possible sous conditions.',
        'Faible dosage, en cas d’hyperbourgeonnement et dans le cadre de la prise en charge d’une plaie.');
    }
    return none;
  }
  return {evaluate,law,checkedAt:'2026-11-19'};
})();
