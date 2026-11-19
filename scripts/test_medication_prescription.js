#!/usr/bin/env node
/* Contrôles de non-régression du marquage des prescriptions infirmières. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const context={window:{}};
const source=fs.readFileSync(path.join(root,'medicaments-prescription.js'),'utf8');
vm.runInNewContext(source,context,{filename:'medicaments-prescription.js'});
const test=context.window.IFSI_IDE_RX.evaluate;
const cases=[
  [{name:'NICORETTE 2 MG',dci:'Nicotine'},'initiale','ancien'],
  [{name:'DOLIPRANE 500 MG COMPRIME',dci:'Paracétamol',form:'comprimé'},'initiale','nouveau'],
  [{name:'NORLEVO 1,5 MG, COMPRIME',dci:'Lévonorgestrel',form:'comprimé'},'initiale','nouveau'],
  [{name:'OPTILOVA 20/100, COMPRIME',dci:'Ethinylestradiol + Lévonorgestrel',form:'comprimé'},'renouvellement','ancien'],
  [{name:'VAXIGRIP TETRA',dci:'Virus grippal inactivé',form:'suspension injectable'},'initiale','ancien'],
  [{name:'XYLOCAINE 2 POUR CENT, CREME',dci:'Lidocaïne',form:'crème'},'initiale','nouveau'],
  [{name:'CHLORHEXIDINE 0,05%, SOLUTION CUTANEE',dci:'Chlorhexidine',form:'solution cutanée'},'initiale','nouveau'],
  [{name:'TERCIAN 25 MG',dci:'Cyamémazine'},'non_evalue','non_evalue'],
  [{name:'DIAZEPAM 5 MG',dci:'Diazépam'},'non_evalue','non_evalue'],
  [{name:'DOLIPRANE CODEINE',dci:'Paracétamol + Codéine'},'non_evalue','non_evalue'],
  [{name:'DIANE 35, COMPRIME',dci:'Ethinylestradiol + Cyprotérone',form:'comprimé'},'non_evalue','non_evalue'],
  [{name:'VACCIN ANTIRABIQUE',dci:'Antigène de la rage'},'non_evalue','non_evalue'],
  [{name:'XYLOCAINE 1 %, SOLUTION INJECTABLE',dci:'Lidocaïne',form:'solution injectable'},'non_evalue','non_evalue']
];
for (const [drug,type,period] of cases) {
  const found=test(drug);
  assert.equal(found.type,type,'type pour '+drug.name);
  assert.equal(found.period,period,'période pour '+drug.name);
  if(found.type!=='non_evalue') {
    assert.ok(found.source.startsWith('https://www.legifrance.gouv.fr/'),'Lien officiel pour '+drug.name);
    assert.ok(found.conditions.length>15,'Conditions absentes pour '+drug.name);
  }
}
const page=fs.readFileSync(path.join(root,'medicaments.html'),'utf8');
const search=fs.readFileSync(path.join(root,'medicaments-recherche.js'),'utf8');
assert.match(page,/\.prescription-mark\.new\{color:#9e1727/);
assert.match(page,/\.prescription-mark\.prior\{color:#8e2430/);
assert.match(page,/value="ancien"/);
assert.match(page,/value="nouveau"/);
assert.ok(page.indexOf('medicaments-prescription.js')<page.indexOf('medicaments-recherche.js'),'L’ordre des scripts doit être correct');
assert.match(search,/Déjà prescriptible avant 2026/);
assert.match(search,/Nouveau droit de prescription 2026/);
console.log('OK : '+cases.length+' tests de prescription + contrôles de l’interface rouge.');
