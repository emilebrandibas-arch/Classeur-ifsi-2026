#!/usr/bin/env node
/* Audite la couverture et les liens des fiches IDE enrichies avant déploiement. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const context={window:{}};
for(const file of ['medicaments-repertoire.js','medicaments-fiches-ide.js','medicaments-vigilance-molecules.js']){
  const content=fs.readFileSync(path.join(root,file),'utf8');
  vm.runInNewContext(content,context,{filename:file});
}
const drug=context.window.IFSI_MEDICINES_ALL;
const care=context.window.IFSI_NURSING_DETAILS;
const molecules=context.window.IFSI_NURSING_MOLECULES;
assert.ok(drug && care && molecules,'Sources manquantes');
assert.ok(drug.brands.length>=234,'Régression du nombre de fiches');
const actualUsed=new Set(drug.brands.map(b=>b.family));
for(const [index,b] of drug.brands.entries()){
  const f=drug.families.find(x=>x.family===b.family);
  assert.ok(f,'Aucune famille à la fiche numéro '+index);
  for(const key of ['aim','nurse','monitor','alarm']) assert.ok((f[key]||'').length>15,b.name+' : '+key+' insuffisant');
  const x=care.families[b.family];
  assert.ok(x,b.name+' : profil clinique de famille absent');
  for(const key of ['before','follow','education']) assert.ok((x[key]||'').length>=25,b.name+' : '+key+' trop court');
}
assert.equal(Object.keys(care.families).length,70,'Nombre de familles enrichies inattendu');
assert.equal(actualUsed.size,70,'Famille en plus ou non indexée');
const knownDci=new Set(drug.brands.map(b=>b.dci));
for(const [dci,f] of Object.entries(molecules.molecules)){
  assert.ok(knownDci.has(dci),'DCI non indexée : '+dci);
  assert.ok(f.special.length>=35 && f.follow.length>=25,'Point de vigilance trop court : '+dci);
}
assert.equal(Object.keys(molecules.molecules).length,48);
const html=fs.readFileSync(path.join(root,'medicaments.html'),'utf8');
const js=fs.readFileSync(path.join(root,'medicaments-recherche.js'),'utf8');
for (const f of ['medicaments-repertoire.js','medicaments-prescription.js','medicaments-fiches-ide.js','medicaments-vigilance-molecules.js','medicaments-recherche.js']) {
  assert.ok(html.includes('src="./'+f+'"'),'Script non lié : '+f);
}
assert.ok(html.indexOf('medicaments-fiches-ide.js')<html.indexOf('medicaments-recherche.js'));
for(const fragment of ['careSection(b)','molecularCare?.molecules?.[b.dci]','f.before','f.follow','f.education','global.evaluation','Guide HAS des 5 B']) {
  assert.ok(js.includes(fragment),'Affichage incomplet : '+fragment);
}
for (const dci of ['Clozapine','Valproate de sodium','Carbonate de lithium','Insuline glargine concentrée U300','Apixaban','Paracétamol']) {
  assert.ok(molecules.molecules[dci], 'Vigilance prioritaire absente : '+dci);
}
console.log('OK : '+drug.brands.length+' fiches IDE couvertes, '+actualUsed.size+' familles, '+Object.keys(molecules.molecules).length+' DCI ciblées ; interface et références vérifiées.');
