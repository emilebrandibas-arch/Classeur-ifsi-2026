/* Complément pharmacie IFSI – 19/11/2026. Source : BDPM / ANSM / VIDAL ; vérification du RCP en stage.
 * Index pédagogique de noms commerciaux et DCI, sans posologie ni recommandation de prescription.
 */
window.IFSI_MEDICINES_CATALOGUE = {
  "updated": "2026-11-19",
  "families": [
    {
      "group": "Neurologie et psychiatrie",
      "family": "Cyamémazine — neuroleptique sédatif",
      "examples": "Cyamémazine (Tercian), comprimés, solution buvable ou injection IM selon spécialité.",
      "aim": "Antipsychotique phénothiazinique utilisé dans certains troubles psychotiques ; autres indications encadrées, notamment anxiété en seconde intention.",
      "nurse": "Vérifier prescription, indication, présentation, voie et interactions. Évaluer vigilance, pression artérielle orthostatique, risque de chute, constipation et rétention urinaire ; ECG et ionogramme selon prescription.",
      "monitor": "Somnolence, conscience, PA, fréquence cardiaque, transit, mictions, effets extrapyramidaux ; ECG/QT si prescrit.",
      "alarm": "Fièvre avec rigidité et confusion (syndrome malin des neuroleptiques), syncope ou palpitations, constipation avec douleur/vomissements, sédation majeure."
    },
    {
      "group": "Neurologie et psychiatrie",
      "family": "Clozapine — antipsychotique à surveillance renforcée",
      "examples": "Clozapine (Leponex).",
      "aim": "Antipsychotique utilisé dans des indications spécialisées, notamment certaines schizophrénies résistantes.",
      "nurse": "Vérifier numération des neutrophiles (PNN/NFS) selon calendrier réglementaire et protocole, conformité de la prescription/dispensation ; rechercher constipation et problèmes cardiaques.",
      "monitor": "PNN/NFS prescrits, température, signes infectieux, transit, vigilance, PA/FC, paramètres métaboliques selon prescription.",
      "alarm": "Fièvre ou angine, constipation prolongée/douleurs abdominales, douleur thoracique, essoufflement, malaise."
    },
    {
      "group": "Neurologie et psychiatrie",
      "family": "Antidépresseurs IRSN",
      "examples": "Venlafaxine (Effexor), duloxétine (Cymbalta).",
      "aim": "Traitement de certains troubles dépressifs et anxieux selon indication.",
      "nurse": "Contrôler prescription, observance et interactions ; pas d’arrêt brutal sans avis médical.",
      "monitor": "Humeur, sommeil, agitation, PA surtout avec venlafaxine, troubles digestifs et syndrome sérotoninergique.",
      "alarm": "Idées suicidaires, agitation importante, hyperthermie avec tremblements, hausse importante de PA."
    },
    {
      "group": "Neurologie et psychiatrie",
      "family": "Antidépresseurs tricycliques",
      "examples": "Amitriptyline (Laroxyl), clomipramine (Anafranil).",
      "aim": "Traitement de certains troubles dépressifs ; autres indications selon molécule.",
      "nurse": "Contrôler prescription, interactions, vigilance et risque cardiovasculaire ; ECG selon prescription.",
      "monitor": "Conscience, rythme cardiaque, PA orthostatique, transit, sécheresse buccale, mictions.",
      "alarm": "Syncope, trouble du rythme, confusion importante, rétention urinaire."
    },
    {
      "group": "Neurologie et psychiatrie",
      "family": "Autres antidépresseurs — mirtazapine",
      "examples": "Mirtazapine (Norset).",
      "aim": "Traitement de certains épisodes dépressifs.",
      "nurse": "Vérifier prescription, somnolence et associations sédatives.",
      "monitor": "Humeur, vigilance, sommeil, appétit, poids et signes inhabituels d’infection.",
      "alarm": "Aggravation psychique, idées suicidaires, fièvre avec angine ou sédation marquée."
    },
    {
      "group": "Neurologie et psychiatrie",
      "family": "Alimémazine — antihistaminique H1 sédatif",
      "examples": "Alimémazine (Théralène), comprimé 5 mg et solution buvable 4 % : présentations distinctes.",
      "aim": "Antihistaminique H1 sédatif de la famille des phénothiazines, indiqué dans certaines insomnies occasionnelles ou transitoires chez l’adulte et, selon la présentation, dans des indications pédiatriques restreintes.",
      "nurse": "Vérifier prescription, indication, âge/poids, présentation et médicaments sédatifs associés ; prévenir le risque de chute et vérifier toute forme buvable avant administration.",
      "monitor": "Vigilance, conscience, somnolence, pression artérielle, fréquence respiratoire selon situation, signes anticholinergiques et risque de chute.",
      "alarm": "Sédation anormale, difficultés respiratoires, syncope ou palpitations, réaction allergique grave."
    },
    {
      "group": "Neurologie et psychiatrie",
      "family": "Hydroxyzine — antihistaminique sédatif",
      "examples": "Hydroxyzine (Atarax).",
      "aim": "Antihistaminique H1 sédatif, indiqué dans certaines situations anxieuses et allergiques.",
      "nurse": "Vérifier indication, prescription et interactions/contre-indications liées au QT ; risque de chute.",
      "monitor": "Vigilance, FC, somnolence, sécheresse buccale.",
      "alarm": "Syncope, palpitations, somnolence marquée."
    }
  ],
  "brands": [
    {
      "name": "Tercian",
      "dci": "Cyamémazine",
      "family": "Cyamémazine — neuroleptique sédatif",
      "vidalUrl": "https://www.vidal.fr/medicaments/gammes/tercian-10184.html",
      "url": "https://base-donnees-publique.medicaments.gouv.fr/medicament/63400513/extrait"
    },
    {
      "name": "Théralène",
      "dci": "Alimémazine",
      "family": "Alimémazine — antihistaminique H1 sédatif",
      "url": "https://base-donnees-publique.medicaments.gouv.fr/medicament/66801066/extrait"
    },
    {
      "name": "Cyamémazine Arrow",
      "dci": "Cyamémazine",
      "family": "Cyamémazine — neuroleptique sédatif"
    },
    {
      "name": "Cyamémazine Biogaran",
      "dci": "Cyamémazine",
      "family": "Cyamémazine — neuroleptique sédatif"
    },
    {
      "name": "Cyamémazine Viatris",
      "dci": "Cyamémazine",
      "family": "Cyamémazine — neuroleptique sédatif"
    },
    {
      "name": "Leponex",
      "dci": "Clozapine",
      "family": "Clozapine — antipsychotique à surveillance renforcée",
      "vidalUrl": "https://www.vidal.fr/medicaments/gammes/leponex-5475.html"
    },
    {
      "name": "Nozinan",
      "dci": "Lévomépromazine",
      "family": "Antipsychotiques",
      "vidalUrl": "https://www.vidal.fr/medicaments/gammes/nozinan-6793.html"
    },
    {
      "name": "Largactil",
      "dci": "Chlorpromazine",
      "family": "Antipsychotiques"
    },
    {
      "name": "Loxapac",
      "dci": "Loxapine",
      "family": "Antipsychotiques"
    },
    {
      "name": "Haldol",
      "dci": "Halopéridol",
      "family": "Antipsychotiques"
    },
    {
      "name": "Solian",
      "dci": "Amisulpride",
      "family": "Antipsychotiques"
    },
    {
      "name": "Risperdal",
      "dci": "Rispéridone",
      "family": "Antipsychotiques"
    },
    {
      "name": "Zyprexa",
      "dci": "Olanzapine",
      "family": "Antipsychotiques"
    },
    {
      "name": "Abilify",
      "dci": "Aripiprazole",
      "family": "Antipsychotiques"
    },
    {
      "name": "Xeroquel",
      "dci": "Quétiapine",
      "family": "Antipsychotiques"
    },
    {
      "name": "Xanax",
      "dci": "Alprazolam",
      "family": "Benzodiazépines"
    },
    {
      "name": "Lexomil",
      "dci": "Bromazépam",
      "family": "Benzodiazépines"
    },
    {
      "name": "Temesta",
      "dci": "Lorazépam",
      "family": "Benzodiazépines"
    },
    {
      "name": "Seresta",
      "dci": "Oxazépam",
      "family": "Benzodiazépines"
    },
    {
      "name": "Valium",
      "dci": "Diazépam",
      "family": "Benzodiazépines"
    },
    {
      "name": "Lysanxia",
      "dci": "Prazépam",
      "family": "Benzodiazépines"
    },
    {
      "name": "Stilnox",
      "dci": "Zolpidem",
      "family": "Hypnotiques apparentés benzodiazépines"
    },
    {
      "name": "Prozac",
      "dci": "Fluoxétine",
      "family": "Antidépresseurs ISRS"
    },
    {
      "name": "Seroplex",
      "dci": "Escitalopram",
      "family": "Antidépresseurs ISRS"
    },
    {
      "name": "Zoloft",
      "dci": "Sertraline",
      "family": "Antidépresseurs ISRS"
    },
    {
      "name": "Deroxat",
      "dci": "Paroxétine",
      "family": "Antidépresseurs ISRS"
    },
    {
      "name": "Effexor",
      "dci": "Venlafaxine",
      "family": "Antidépresseurs IRSN",
      "vidalUrl": "https://www.vidal.fr/medicaments/gammes/effexor-3217.html"
    },
    {
      "name": "Cymbalta",
      "dci": "Duloxétine",
      "family": "Antidépresseurs IRSN"
    },
    {
      "name": "Laroxyl",
      "dci": "Amitriptyline",
      "family": "Antidépresseurs tricycliques"
    },
    {
      "name": "Anafranil",
      "dci": "Clomipramine",
      "family": "Antidépresseurs tricycliques"
    },
    {
      "name": "Norset",
      "dci": "Mirtazapine",
      "family": "Autres antidépresseurs — mirtazapine"
    },
    {
      "name": "Atarax",
      "dci": "Hydroxyzine",
      "family": "Hydroxyzine — antihistaminique sédatif"
    },
    {
      "name": "Dépakine",
      "dci": "Valproate de sodium",
      "family": "Antiépileptiques"
    },
    {
      "name": "Keppra",
      "dci": "Lévétiracétam",
      "family": "Antiépileptiques"
    },
    {
      "name": "Lamictal",
      "dci": "Lamotrigine",
      "family": "Antiépileptiques"
    },
    {
      "name": "Lyrica",
      "dci": "Prégabaline",
      "family": "Antiépileptiques"
    },
    {
      "name": "Téralithe",
      "dci": "Carbonate de lithium",
      "family": "Thymorégulateurs – lithium"
    },
    {
      "name": "Efferalgan",
      "dci": "Paracétamol",
      "family": "Antalgiques non opioïdes"
    },
    {
      "name": "Dafalgan",
      "dci": "Paracétamol",
      "family": "Antalgiques non opioïdes"
    },
    {
      "name": "Topalgic",
      "dci": "Tramadol",
      "family": "Antalgiques opioïdes"
    },
    {
      "name": "Actiskenan",
      "dci": "Morphine",
      "family": "Antalgiques opioïdes"
    },
    {
      "name": "OxyContin",
      "dci": "Oxycodone LP",
      "family": "Antalgiques opioïdes"
    },
    {
      "name": "Oxynorm",
      "dci": "Oxycodone LI",
      "family": "Antalgiques opioïdes"
    },
    {
      "name": "Advil",
      "dci": "Ibuprofène",
      "family": "Anti-inflammatoires non stéroïdiens (AINS)"
    },
    {
      "name": "Profénid",
      "dci": "Kétoprofène",
      "family": "Anti-inflammatoires non stéroïdiens (AINS)"
    },
    {
      "name": "Voltarène",
      "dci": "Diclofénac",
      "family": "Anti-inflammatoires non stéroïdiens (AINS)"
    },
    {
      "name": "Clamoxyl",
      "dci": "Amoxicilline",
      "family": "Antibiotiques bêta-lactamines"
    },
    {
      "name": "Rocéphine",
      "dci": "Ceftriaxone",
      "family": "Antibiotiques bêta-lactamines"
    },
    {
      "name": "Zithromax",
      "dci": "Azithromycine",
      "family": "Antibiotiques macrolides"
    },
    {
      "name": "Ciflox",
      "dci": "Ciprofloxacine",
      "family": "Fluoroquinolones (usage encadré)"
    },
    {
      "name": "Zovirax",
      "dci": "Aciclovir",
      "family": "Antiviraux"
    },
    {
      "name": "Diflucan",
      "dci": "Fluconazole",
      "family": "Antifongiques systémiques"
    },
    {
      "name": "Xarelto",
      "dci": "Rivaroxaban",
      "family": "Anticoagulants oraux directs (AOD)"
    },
    {
      "name": "Pradaxa",
      "dci": "Dabigatran",
      "family": "Anticoagulants oraux directs (AOD)"
    },
    {
      "name": "Coumadine",
      "dci": "Warfarine",
      "family": "Antivitamines K (AVK)"
    },
    {
      "name": "Plavix",
      "dci": "Clopidogrel",
      "family": "Antiagrégants plaquettaires"
    },
    {
      "name": "Brilique",
      "dci": "Ticagrélor",
      "family": "Antiagrégants plaquettaires"
    },
    {
      "name": "Aldactone",
      "dci": "Spironolactone",
      "family": "Diurétiques épargneurs de potassium"
    },
    {
      "name": "Cardensiel",
      "dci": "Bisoprolol",
      "family": "Bêtabloquants"
    },
    {
      "name": "Amlor",
      "dci": "Amlodipine",
      "family": "Inhibiteurs calciques"
    },
    {
      "name": "Triatec",
      "dci": "Ramipril",
      "family": "IEC et sartans (ARA2)"
    },
    {
      "name": "Cozaar",
      "dci": "Losartan",
      "family": "IEC et sartans (ARA2)"
    },
    {
      "name": "Atacand",
      "dci": "Candésartan",
      "family": "IEC et sartans (ARA2)"
    },
    {
      "name": "Cordarone",
      "dci": "Amiodarone",
      "family": "Antiarythmiques"
    },
    {
      "name": "Tahor",
      "dci": "Atorvastatine",
      "family": "Hypolipémiants – statines"
    },
    {
      "name": "Crestor",
      "dci": "Rosuvastatine",
      "family": "Hypolipémiants – statines"
    },
    {
      "name": "Humalog",
      "dci": "Insuline lispro",
      "family": "Insulines rapides"
    },
    {
      "name": "Toujeo",
      "dci": "Insuline glargine concentrée U300",
      "family": "Insulines basales"
    },
    {
      "name": "Tresiba",
      "dci": "Insuline dégludec",
      "family": "Insulines basales"
    },
    {
      "name": "Diamicron",
      "dci": "Gliclazide",
      "family": "Sulfamides hypoglycémiants"
    },
    {
      "name": "Ozempic",
      "dci": "Sémaglutide",
      "family": "Agonistes du récepteur GLP-1"
    },
    {
      "name": "Trulicity",
      "dci": "Dulaglutide",
      "family": "Agonistes du récepteur GLP-1"
    },
    {
      "name": "Januvia",
      "dci": "Sitagliptine",
      "family": "Inhibiteurs DPP-4 (gliptines)"
    },
    {
      "name": "Levothyrox",
      "dci": "Lévothyroxine",
      "family": "Hormones thyroïdiennes"
    },
    {
      "name": "Néo-Mercazole",
      "dci": "Carbimazole",
      "family": "Antithyroïdiens de synthèse"
    },
    {
      "name": "Symbicort",
      "dci": "Budésonide + formotérol",
      "family": "Associations bronchodilatateur longue durée et corticoïde inhalé",
      "vidalUrl": "https://www.vidal.fr/medicaments/gammes/symbicort-77957.html"
    },
    {
      "name": "Spiriva",
      "dci": "Tiotropium",
      "family": "Anticholinergiques inhalés"
    },
    {
      "name": "Bricanyl",
      "dci": "Terbutaline",
      "family": "Bronchodilatateurs bêta-2 mimétiques"
    },
    {
      "name": "Aerius",
      "dci": "Desloratadine",
      "family": "Antihistaminiques H1"
    },
    {
      "name": "Zyrtec",
      "dci": "Cétirizine",
      "family": "Antihistaminiques H1"
    },
    {
      "name": "Mopral",
      "dci": "Oméprazole",
      "family": "Inhibiteurs de la pompe à protons (IPP)"
    },
    {
      "name": "Forlax",
      "dci": "Macrogol",
      "family": "Laxatifs osmotiques"
    },
    {
      "name": "Duphalac",
      "dci": "Lactulose",
      "family": "Laxatifs osmotiques"
    },
    {
      "name": "Movicol",
      "dci": "Macrogol + électrolytes",
      "family": "Laxatifs osmotiques"
    },
    {
      "name": "Imodium",
      "dci": "Lopéramide",
      "family": "Antidiarrhéiques symptomatiques"
    }
  ]
};
