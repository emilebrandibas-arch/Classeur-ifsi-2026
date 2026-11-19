/* Fiches de soins IFSI – compléments pédagogiques par familles.
 * Ces repères n'autorisent pas une administration et ne remplacent pas le RCP.
 * Les 234 fiches héritent d'un socle par famille ; les spécificités de la
 * molécule et de la présentation nécessitent une vérification distincte.
 */
window.IFSI_NURSING_DETAILS = {
  updated: "2026-11-19",
  provenance: [
    "https://www.has-sante.fr/jcms/c_1104569/fr/guide-outils-securisation-autoevaluation-administration-medicaments-partie2-mettre-en-oeuvre",
    "https://www.has-sante.fr/jcms/c_2736453/fr/mettre-en-oeuvre-la-conciliation-des-traitements-medicamenteux-en-etablissement-de-sante",
    "https://base-donnees-publique.medicaments.gouv.fr/"
  ],
  families: {
  "Adsorbants et protecteurs digestifs": {
    "before": "Hydratation, fréquence et aspect des selles, durée des symptômes, médicaments pris simultanément",
    "follow": "Signes de déshydratation, poids et diurèse selon situation; bilan ionique si prescrit",
    "education": "Respecter l'espacement avec d'autres traitements oraux lorsque requis; consulter si fièvre, sang dans les selles ou aggravation."
  },
  "Agonistes du récepteur GLP-1": {
    "before": "Indication, glycémies, troubles digestifs, hydratation, dispositif et fréquence prescrite",
    "follow": "Poids, hydratation, glycémie si diabète et traitements associés; fonction rénale si déshydratation",
    "education": "Expliquer l'utilisation du dispositif validé; signaler vomissements persistants ou douleur abdominale intense."
  },
  "Aminosides": {
    "before": "Allergies, fonction rénale, horaires précis, dose prescrite et prélèvements microbiologiques",
    "follow": "Créatinine, diurèse, concentrations plasmatiques prescrites, audition et équilibre",
    "education": "Signaler acouphènes, baisse d'audition, vertiges ou diminution de diurèse."
  },
  "Antalgiques non opioïdes": {
    "before": "Échelle de douleur, traitements associés contenant la même substance, antécédents hépatiques",
    "follow": "Évolution de la douleur et de la température; bilan hépatique seulement selon contexte et prescription",
    "education": "Vérifier les doublons de paracétamol; éviter toute association non validée."
  },
  "Antalgiques opioïdes": {
    "before": "Douleur, vigilance, respiration, transit, rétention urinaire et association à d'autres sédatifs",
    "follow": "FR, saturation si indiquée, sédation, PA, douleur et constipation; réévaluation après administration",
    "education": "Prévenir chutes et constipation; signaler somnolence inhabituelle ou difficulté respiratoire."
  },
  "Anti-inflammatoires non stéroïdiens (AINS)": {
    "before": "Risque rénal et digestif, grossesse, asthme déclenché par AINS, anticoagulants associés",
    "follow": "Douleur, saignement digestif, créatinine et PA selon terrain et prescription",
    "education": "Éviter l'automédication par autres AINS; alerter si méléna, hématémèse ou baisse de diurèse."
  },
  "Antiacides et anti-reflux": {
    "before": "Nature des symptômes, signes d'alarme digestifs et interactions avec d'autres prises orales",
    "follow": "Persistance des douleurs et tolérance digestive; surveillance biologique seulement si pertinente",
    "education": "Respecter les espacements de prise prévus; consulter si dysphagie ou amaigrissement inexpliqué."
  },
  "Antiagrégants plaquettaires": {
    "before": "Antécédents de saignement, chirurgie prévue, anticoagulants/AINS associés",
    "follow": "Ecchymoses, gingivorragies, hématurie, selles noires; NFS selon prescription",
    "education": "Ne pas interrompre sans avis médical; signaler saignement inhabituel ou selles noires."
  },
  "Antiarythmiques": {
    "before": "Indication et rythme de référence, bradycardie, associations allongeant le QT",
    "follow": "FC, PA, ECG et ionogramme selon molécule et prescription",
    "education": "Signaler syncope, palpitations importantes, dyspnée ou étourdissements."
  },
  "Antibiotiques bêta-lactamines": {
    "before": "Antécédents d'allergie aux bêta-lactamines, site infectieux, prélèvements et horaire",
    "follow": "Température, signes d'infection, réaction allergique, diarrhée; fonction rénale selon molécule",
    "education": "Respecter la durée prescrite; signaler urticaire, gêne respiratoire ou diarrhée importante."
  },
  "Antibiotiques macrolides": {
    "before": "Allergies, associations à risque d'interactions ou de QT long, état hépatique",
    "follow": "Température, diarrhée, signes hépatiques; ECG si terrain à risque et prescription",
    "education": "Signaler palpitations, ictère, diarrhée sévère ou réaction cutanée."
  },
  "Antibiotiques nitro-imidazolés": {
    "before": "Diagnostic infectieux, fonction hépatique et interactions, notamment anticoagulants",
    "follow": "Réponse clinique, troubles digestifs ou neurologiques selon durée",
    "education": "Respecter prescription; signaler paresthésies ou confusion."
  },
  "Antibiotiques streptogramines": {
    "before": "Allergies, voie prescrite, interactions et état hépatique",
    "follow": "Tolérance digestive, réactions cutanées, bilan hépatique si prescrit",
    "education": "Alerter si éruption étendue, jaunisse ou diarrhée importante."
  },
  "Antibiotiques tétracyclines": {
    "before": "Grossesse potentielle, interactions avec fer/calcium/antiacides, terrain hépatique",
    "follow": "Tolérance digestive, photosensibilité et amélioration de l'infection",
    "education": "Respecter les précautions de prise du RCP et la protection solaire."
  },
  "Anticholinergiques inhalés": {
    "before": "Vérifier la bonne spécialité, le dispositif, la technique et les antécédents de glaucome",
    "follow": "Dyspnée, fréquence respiratoire, effet bronchodilatateur, sécheresse buccale",
    "education": "Démonstration et retour de geste de l'inhalateur; éviter projection oculaire."
  },
  "Anticoagulants oraux directs (AOD)": {
    "before": "Molécule, indication, fonction rénale, poids et âge selon RCP, interactions",
    "follow": "Saignements, créatinine, hémoglobine selon prescription; pas de suivi INR de routine pour l'effet anticoagulant",
    "education": "Ne pas arrêter seul; déclarer automédication AINS et chutes ou traumatismes crâniens."
  },
  "Antidépresseurs IRSN": {
    "before": "État psychique initial, risque suicidaire, interactions sérotoninergiques, PA",
    "follow": "Humeur, agitation, sommeil, PA et tolérance digestive",
    "education": "Effet progressif; ne pas arrêter brutalement; signaler aggravation psychique ou signes sérotoninergiques."
  },
  "Antidépresseurs ISRS": {
    "before": "Humeur, idées suicidaires, médicaments sérotoninergiques et risque hémorragique",
    "follow": "Humeur, sommeil, agitation, hyponatrémie si risque et prescription",
    "education": "Informer d'un délai d'action; signaler aggravation de l'humeur et éviter arrêt brusque."
  },
  "Antidépresseurs tricycliques": {
    "before": "Risque cardiaque, hypotension orthostatique, sédation, constipation et interactions",
    "follow": "PA, FC, état de conscience, effets anticholinergiques; ECG si prescrit",
    "education": "Prévenir les chutes; signaler syncope, palpitations ou rétention urinaire."
  },
  "Antidiarrhéiques symptomatiques": {
    "before": "Signes de gravité, durée, fièvre, selles sanglantes et hydratation",
    "follow": "Transit, diurèse et signes de déshydratation; bilan si prescrit",
    "education": "La réhydratation reste prioritaire; ne pas masquer une diarrhée fébrile ou sanglante."
  },
  "Antiémétiques": {
    "before": "Évaluer cause des vomissements, déshydratation, transit et interactions",
    "follow": "Réponse, troubles extrapyramidaux ou cardiaques selon molécule",
    "education": "Signaler vomissements persistants, douleurs abdominales ou mouvements anormaux."
  },
  "Antiémétiques antagonistes 5-HT3": {
    "before": "Indication, constipation, associations favorisant QT long",
    "follow": "Nausées, transit, FC; ECG/ionogramme si indiqué",
    "education": "Signaler constipation sévère, palpitations ou malaise."
  },
  "Antiépileptiques": {
    "before": "Type de crise, fréquence, observance, grossesse potentielle, interactions",
    "follow": "Crises, vigilance, état cutané; bilans hépatiques, rénaux, NFS ou concentrations selon molécule",
    "education": "Ne pas arrêter brutalement; alerter pour éruption avec fièvre ou changement majeur d'humeur."
  },
  "Antifongiques systémiques": {
    "before": "Infection documentée, interactions nombreuses et terrain hépatique",
    "follow": "Tolérance digestive, signes hépatiques; bilan hépatique selon prescription",
    "education": "Signaler ictère, urines foncées, éruption sévère ou interactions."
  },
  "Antihistaminiques H1": {
    "before": "Symptômes allergiques, somnolence selon génération, associations sédatives",
    "follow": "Efficacité, vigilance et rétention urinaire selon molécule",
    "education": "Éviter association non validée avec alcool ou sédatifs; prévenir les chutes."
  },
  "Antihypertenseurs centraux et apparentés": {
    "before": "PA et FC initiales, vertiges, sédation et autres hypotenseurs",
    "follow": "PA couchée/debout si besoin, FC, vigilance, signes de chute",
    "education": "Ne pas interrompre brutalement certains traitements; se lever progressivement."
  },
  "Antinéoplasiques hormonaux": {
    "before": "Indication oncologique, bilan initial, risque thromboembolique et effets osseux selon molécule",
    "follow": "Signes de thrombose, tolérance hormonale, bilans prescrits",
    "education": "Signaler douleur thoracique, dyspnée, douleur ou gonflement d'une jambe."
  },
  "Antiparkinsoniens dopaminergiques": {
    "before": "Horaires habituels stricts, mobilité de référence, dyskinésies et hypotension",
    "follow": "Motricité, fluctuations ON/OFF, état psychique, PA orthostatique",
    "education": "Ne pas modifier horaires ou arrêter seul; signaler hallucinations et chutes."
  },
  "Antipsychotiques": {
    "before": "Comportement, vigilance, syndrome extrapyramidal, ECG/risque QT selon molécule",
    "follow": "État mental, PA orthostatique, température, transit, poids et métabolisme selon prescription",
    "education": "Prévenir chutes; alerter si fièvre avec rigidité et confusion."
  },
  "Antispasmodiques digestifs": {
    "before": "Caractérisation de la douleur, signes d'abdomen aigu, transit et mictions",
    "follow": "Évolution de la douleur, constipation, sécheresse buccale selon molécule",
    "education": "Une douleur abdominale aiguë persistante nécessite une réévaluation médicale."
  },
  "Antithyroïdiens de synthèse": {
    "before": "Hyperthyroïdie connue, infection ou fièvre, grossesse, traitements associés",
    "follow": "TSH/T4/T3 et NFS selon prescription; signes d'hypothyroïdie",
    "education": "Fièvre ou angine sous antithyroïdien = contacter rapidement un médecin."
  },
  "Antiviraux": {
    "before": "Indication, début de symptômes, fonction rénale, interactions et voie",
    "follow": "Réponse clinique, signes cutanés, créatinine si indiqué",
    "education": "Respecter les horaires et l'hydratation selon produit et RCP."
  },
  "Antivitamines K (AVK)": {
    "before": "INR récent, indication, interactions et changements de traitement",
    "follow": "INR selon calendrier prescrit, saignements, hémoglobine si indiqué",
    "education": "Prises régulières, alimentation en vitamine K stable; signaler tout nouveau médicament."
  },
  "Associations bronchodilatateur longue durée et corticoïde inhalé": {
    "before": "Identifier inhalateur, indication, technique, adhésion et rinçage buccal",
    "follow": "Dyspnée, exacerbations, fréquence d'utilisation du traitement de secours",
    "education": "Rincer la bouche après corticoïde inhalé; vérifier que le dispositif est utilisé correctement."
  },
  "Autres antidépresseurs — mirtazapine": {
    "before": "État dépressif, risque suicidaire, somnolence et associations sédatives",
    "follow": "Humeur, vigilance, appétit, poids; fièvre/angine à signaler",
    "education": "Éviter arrêt brutal; signaler aggravation psychique et sédation inhabituelle."
  },
  "Benzodiazépines": {
    "before": "Indication, durée, risque de dépendance, chutes, apnée du sommeil et associations sédatives",
    "follow": "Vigilance, FR si nécessaire, PA, cognition et chutes",
    "education": "Éviter alcool et autres sédatifs; pas d'arrêt brutal après prise prolongée."
  },
  "Bêtabloquants": {
    "before": "FC et PA initiales, asthme/BPCO selon molécule, signes d'insuffisance cardiaque",
    "follow": "FC, PA, fatigue, bradycardie, dyspnée et glycémie si diabète",
    "education": "Ne pas arrêter brutalement; signaler malaise ou bradycardie symptomatique."
  },
  "Biguanides": {
    "before": "Fonction rénale, alimentation, déshydratation et risques de situation aiguë",
    "follow": "Glycémie et HbA1c prescrites, tolérance digestive, DFG selon protocole",
    "education": "Signaler vomissements, diarrhée importante ou état de déshydratation."
  },
  "Bisphosphonates": {
    "before": "Voie et forme exactes, fonction rénale, santé bucco-dentaire et calcium",
    "follow": "Douleur osseuse, tolérance digestive, calcémie/fonction rénale selon molécule",
    "education": "Respecter strictement les consignes de prise des formes orales; signaler douleur mandibulaire."
  },
  "Bronchodilatateurs bêta-2 mimétiques": {
    "before": "Symptômes respiratoires, dispositif, autres stimulants et cardiorespiratoire",
    "follow": "FR, dyspnée, FC, tremblements; kaliémie si fortes doses et prescription",
    "education": "Démontrer l'inhalateur; usage inhabituellement fréquent du secours = réévaluer."
  },
  "Clozapine — antipsychotique à surveillance renforcée": {
    "before": "Vérifier carnet et dernier résultat PNN, transit, température, signes d'infection",
    "follow": "PNN selon calendrier actuel, transit, signes cardiaques, sédation, poids et constantes",
    "education": "Fièvre, angine, constipation persistante ou douleur thoracique = alerte immédiate."
  },
  "Corticoïdes inhalés": {
    "before": "Bonne indication, technique d'inhalation et présence de traitement de secours si nécessaire",
    "follow": "Contrôle respiratoire, muguet et dysphonie",
    "education": "Rincer la bouche et recracher après inhalation; ne pas confondre entretien et secours."
  },
  "Corticoïdes systémiques": {
    "before": "Terrain infectieux, glycémie, PA, œdèmes, durée et traitement actuel",
    "follow": "Glycémie, PA, poids, infection et humeur selon durée/contexte",
    "education": "Ne pas interrompre brutalement un traitement prolongé; signaler fièvre ou méléna."
  },
  "Corticostéroïdes injectables — urgences": {
    "before": "Indication urgente, prescription, voie, allergies et surveillance rapprochée",
    "follow": "PA, FC, glycémie, réaction clinique et effets indésirables",
    "education": "Informer des effets transitoires possibles selon contexte; traçabilité complète."
  },
  "Cyamémazine — neuroleptique sédatif": {
    "before": "État de vigilance, PA orthostatique, antécédents de QT long et autres sédatifs",
    "follow": "Somnolence, PA, transit, mictions, symptômes extrapyramidaux",
    "education": "Prévenir les chutes; signaler fièvre avec rigidité, palpitations ou sédation profonde."
  },
  "Dérivés nitrés": {
    "before": "PA de départ, douleur thoracique, traitements vasodilatateurs et inhibiteurs PDE5",
    "follow": "PA, FC, intensité de douleur et céphalées",
    "education": "Risque d'hypotension; douleur thoracique persistante = urgence."
  },
  "Diurétiques de l’anse": {
    "before": "PA, état hydrique, œdèmes, diurèse et fonction rénale",
    "follow": "Poids, entrées-sorties, ionogramme (Na/K), créatinine selon prescription",
    "education": "Signaler vertiges, crampes, soif intense ou faible diurèse."
  },
  "Diurétiques épargneurs de potassium": {
    "before": "Fonction rénale, traitements augmentant la kaliémie et PA",
    "follow": "Kaliémie, créatinine, PA, poids selon prescription",
    "education": "Éviter supplément potassique non validé; alerter pour faiblesse, palpitations."
  },
  "Fluoroquinolones (usage encadré)": {
    "before": "Indication et alternative documentée, risques tendineux, neuropathie, troubles du QT",
    "follow": "Douleurs tendineuses, paresthésies, état mental, rythme si indiqué",
    "education": "Contacter rapidement un médecin si douleur tendineuse ou symptômes neurologiques."
  },
  "Héparines injectables": {
    "before": "Type d'héparine, indication, poids, fonction rénale et risque hémorragique",
    "follow": "Saignements, plaquettes selon contexte, TCA/anti-Xa si protocole, sites d'injection",
    "education": "Ne pas masser la zone de l'injection sous-cutanée; signaler tout saignement."
  },
  "Hormones thyroïdiennes": {
    "before": "Spécialité stable, horaires de prise, interactions fer/calcium et signes d'hypo-/hyperthyroïdie",
    "follow": "TSH et T4 selon calendrier, FC, poids et symptômes",
    "education": "Respecter les modalités de prise du RCP; ne pas changer de marque sans validation."
  },
  "Alimémazine — antihistaminique H1 sédatif": {
    "before": "Indication, âge, forme, concentration, antécédents cardiaques et autres sédatifs",
    "follow": "Vigilance, PA, somnolence, constipation, rétention urinaire",
    "education": "Risques de chutes; ne pas confondre forme en gouttes et autres présentations."
  },
  "Hydroxyzine — antihistaminique sédatif": {
    "before": "Risque QT long, médicaments allongeant le QT, somnolence et chutes",
    "follow": "Vigilance, FC, sécheresse buccale; ECG si indiqué",
    "education": "Éviter autres sédatifs sans avis; alerter si syncope ou palpitations."
  },
  "Hypnotiques apparentés benzodiazépines": {
    "before": "Durée de prescription, risque chutes/confusion, apnée du sommeil, associations sédatives",
    "follow": "Somnolence résiduelle, comportement nocturne inhabituel, FR si pertinent",
    "education": "Ne pas associer à alcool; prévention des chutes; pas d'arrêt brutal sans conseil si usage répété."
  },
  "Hypolipémiants – statines": {
    "before": "Douleurs musculaires initiales, interactions, affection hépatique",
    "follow": "Tolérance musculaire, bilan lipidique, transaminases selon RCP/prescription",
    "education": "Signaler myalgies sévères ou urines foncées."
  },
  "IEC et sartans (ARA2)": {
    "before": "PA, fonction rénale, potassium et grossesse potentielle",
    "follow": "PA, créatinine, kaliémie selon prescription, toux si IEC",
    "education": "Signaler gonflement du visage/lèvres, malaise ou faible diurèse."
  },
  "Immunosuppresseurs": {
    "before": "Infections, vaccinations, statut infectieux, interactions et observance",
    "follow": "NFS, bilan hépatique/rénal et concentrations selon molécule",
    "education": "Alerter rapidement pour fièvre ou lésions suspectes; éviter automédication."
  },
  "Inhibiteurs calciques": {
    "before": "PA et FC de référence, œdèmes et médicaments associés",
    "follow": "PA, œdèmes, hypotension, FC selon molécule",
    "education": "Signaler œdèmes gênants, vertiges ou syncope."
  },
  "Inhibiteurs de la pompe à protons (IPP)": {
    "before": "Indication, durée, saignement digestif ou signes d'alarme",
    "follow": "Douleurs, reflux, selles; magnésium ou vitamine B12 si usage prolongé à risque et prescription",
    "education": "Réévaluer régulièrement nécessité d'un traitement prolongé."
  },
  "Inhibiteurs DPP-4 (gliptines)": {
    "before": "Indication, fonction rénale et associations hypoglycémiantes",
    "follow": "Glycémies et HbA1c prescrites, signes de pancréatite ou allergie",
    "education": "Douleur abdominale importante ou éruption étendue = alerte."
  },
  "Inhibiteurs SGLT2": {
    "before": "Fonction rénale, état hydrique, infections génito-urinaires, contexte de jeûne aigu",
    "follow": "Glycémie, DFG selon prescription, infection, état hydrique, signes d'acidocétose",
    "education": "Nausées avec douleur abdominale ou respiration anormale = avis urgent même avec glycémie peu élevée."
  },
  "Insulines basales": {
    "before": "Vérifier type et concentration U100/U200/U300, horaire, dispositif, glycémie, alimentation",
    "follow": "Glycémies, hypoglycémie, sites d'injection et traçabilité",
    "education": "Ne pas substituer un dispositif ou une concentration sans validation; éducation à l'hypoglycémie."
  },
  "Insulines rapides": {
    "before": "Vérifier prescription, unité, concentration, glycémie et lien avec le repas",
    "follow": "Glycémie avant/après selon protocole, hypoglycémie, sites d'injection",
    "education": "Coordonner l'administration avec le repas et connaître la conduite à tenir en cas d'hypoglycémie."
  },
  "Laxatifs osmotiques": {
    "before": "Transit, hydratation, douleurs abdominales, obstruction suspectée",
    "follow": "Fréquence/consistance des selles, diurèse et hydratation",
    "education": "Boire selon état clinique; douleur abdominale intense ou arrêt gaz/selles = avis."
  },
  "Laxatifs stimulants": {
    "before": "Constipation, occlusion possible, durée de traitement et hydratation",
    "follow": "Transit, douleurs/crampes, déshydratation si diarrhée",
    "education": "Éviter usage prolongé sans réévaluation; signaler diarrhée persistante."
  },
  "Néfopam – antalgique central non opioïde": {
    "before": "Douleur, risque de convulsions, glaucome, rétention urinaire, médicaments associés",
    "follow": "FC, PA, sueurs, agitation, confusion, nausées et douleur",
    "education": "Prévenir vertiges, sueurs et chutes; signaler tachycardie importante ou confusion."
  },
  "Sulfamides hypoglycémiants": {
    "before": "Repas prévu, fonction rénale, glycémie, risque d'hypoglycémie",
    "follow": "Glycémie, signes neurovégétatifs et neuroglycopéniques, HbA1c",
    "education": "Ne pas sauter de repas; reconnaître et signaler l'hypoglycémie."
  },
  "Suppléments de fer par voie orale": {
    "before": "Cause de carence, NFS/ferritine, interactions fer/calcium/thyroxine",
    "follow": "Tolérance digestive, Hb et ferritine selon prescription",
    "education": "Selles foncées possibles; respecter les espacements avec d'autres médicaments."
  },
  "Thymorégulateurs – lithium": {
    "before": "Hydratation, médicaments affectant rein/Na, état clinique, prescription de lithémie",
    "follow": "Lithémie selon protocole, fonction rénale, TSH, ionogramme",
    "education": "Hydratation stable; alerter pour vomissements, tremblements importants, ataxie ou confusion."
  },
  "Traitements symptomatiques des troubles cognitifs": {
    "before": "FC et troubles de conduction, poids et troubles digestifs",
    "follow": "FC, poids, vertiges, sommeil et tolérance digestive",
    "education": "Prévenir syncopes et chutes; informer les aidants du suivi."
  }
},
  molecules: {},
  global: {
    checks: "Avant administration : vérifier deux identifiants du patient, prescription, médicament exact, dose, voie, horaire, allergies, péremption, interactions et paramètres utiles ; suivre les protocoles et le RCP.",
    evaluation: "Après administration : réévaluer efficacité et tolérance au délai adapté, tracer les observations et transmettre tout événement indésirable.",
    scope: "Repères de stage par famille ; ne valent pas validation individuelle de chaque spécialité. Pas de posologie, d'équivalence automatique, ni de substitution au RCP."
  }
};
