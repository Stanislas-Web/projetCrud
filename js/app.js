const inputs = document.querySelectorAll('input');
let select = document.querySelector('select');
select = select.options[select.selectedIndex].value;
function onFormSubmit(){
RecupererDonnee();
}

function Ajouter(datas){
  const tableUsers = document.querySelector('table').querySelector('tbody');
  const tableau = [];
  tableau.push(datas)
  for (const user of tableau) {
    const tr =`<td>${user.id}</td><td>${user.nom}</td><td>${user.prenom}</td><td>${user.email}</td><td>${user.age}</td><td>${user.poste}</td><td>${user.numero}</td><td>${user.statut}</td><td>${user.pays}</td>`
    tableUsers.insertAdjacentHTML('beforeend',tr);
    nettoyerInputs();
    viderErreur()
  }

}


function RecupererDonnee(){
  if(!inputs[0].value || !inputs[1].value || !inputs[2].value || !inputs[4].value || !inputs[5].value || !inputs[6].value){
    Validation(inputs);
  }else{ 
    Ajouter(NewObject(inputs,select));
  }

}

function NewObject(inputs,select){
  const donneeFormulaire={};
  donneeFormulaire["id"]=createId();
  donneeFormulaire["nom"]= inputs[0].value;
  donneeFormulaire["prenom"]= inputs[1].value;
  donneeFormulaire["email"]= inputs[2].value;
  donneeFormulaire["age"]= inputs[3].value;
  donneeFormulaire["poste"]= inputs[4].value;
  donneeFormulaire["numero"]= inputs[5].value;
  donneeFormulaire["statut"]= select;
  donneeFormulaire["pays"]= inputs[6].value;
  return donneeFormulaire;
}

function createId(){
  return Math.round(Math.random() * Math.round(100000000));
}

function Validation(inputs){
  setInterval(() => {
    viderErreur();
    for( input of inputs ){      
      if(!input.value){
        const erreur = `veuillez renseigner un ${input.name}`;
        const p = document.createElement('p');
        p.setAttribute("class","ui negative message")
        p.innerHTML=erreur;
        const msgError = document.querySelector(`#${input.name}`);
        msgError.appendChild(p)
      }
    }
  },10);
}

function nettoyerInputs(){
  const inputs = document.querySelectorAll('input');
  for(input of inputs){
    input.value = "";
  }
}

function viderErreur(){
  const ps = document.querySelectorAll('p');
  for( p of ps){
    p.setAttribute("class","")
    p.innerHTML="";
  }
}