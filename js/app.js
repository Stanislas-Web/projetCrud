const inputs = document.querySelectorAll('input');
let select = document.querySelector('select');
select = select.options[select.selectedIndex].value;
const btnValider = document.querySelector('#ajouter');
const btnModifier = document.querySelector('#modifier');
btnModifier.style.display = "none";


btnValider.addEventListener("click",(e)=>{
  e.preventDefault();
  RecupererDonnee();
})



function Ajouter(datas){
  const tableUsers = document.querySelector('table').querySelector('tbody');
  let tableau = [];
  tableau.push(datas);
  for (const user of tableau) {
    const tr =`<td>${user.id}</td><td>${user.nom}</td><td>${user.prenom}</td><td>${user.email}</td><td>${user.age}</td><td>${user.poste}</td><td>${user.numero}</td><td>${user.statut}</td><td>${user.pays}</td><td><a id="mod-${user.id}"><i class="fas fa-edit"></i></a></td><td><a id="supp-${user.id}"><i class="fas fa-trash-alt"></i></a></td>`
    tableUsers.insertAdjacentHTML('beforeend',tr);
    nettoyerInputs();
  
  const modifier=document.getElementById(`mod-${user.id}`);
  //recuperation des éléments
  modifier.addEventListener('click',function(e){
  e.preventDefault();
  btnValider.style.display = "none";
  btnModifier.style.display = "block";
  btnModifier.value = "Mis à jour";
  let select = document.querySelector('select');
  select = select.options[select.selectedIndex].value;
  inputs[0].value = user.nom;
  inputs[1].value = user.prenom;
  inputs[2].value = user.email; 
  inputs[3].value = user.age;
  inputs[4].value = user.poste;
  inputs[5].value = user.numero;
  inputs[6].value = user.pays;
  select.value = user.statut; 
  
  console.log(user.pays);
  
  btnModifier.addEventListener("click",(e)=>{
      e.preventDefault();
      const newrow = `<td>${user.id}</td><td>${inputs[0].value}</td><td>${inputs[1].value}</td><td>${inputs[2].value}</td><td>${inputs[3].value}</td><td>${inputs[4].value}</td><td>${inputs[5].value}</td><td>${select}</td><td>${inputs[6].value}</td><td><a id="mod-${user.id}"><i class="fas fa-edit"></i></a></td><td><a id="supp-${user.id}"><i class="fas fa-trash-alt"></i></a></td>`;
  
      const row = modifier.parentNode.parentNode;
      tableUsers.insertAdjacentHTML("beforeend",newrow)
      row.parentNode.removeChild(row);
      btnValider.style.display = "block";
      btnModifier.style.display = "none";
      nettoyerInputs();
      Supprimer(`supp-${user.id}`,`${user.prenom}`,`${user.nom}`);
    
  })

})


    //appelle de la fonction supprimer
    Supprimer(`supp-${user.id}`,`${user.prenom}`,`${user.nom}`);

  }
}






  function RecupererDonnee(){
    let select = document.querySelector('select');
    select = select.options[select.selectedIndex].value;
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
//fonction Supprimer
function Supprimer(id,prenom,nom){
  const supprimer=document.getElementById(id);
  supprimer.addEventListener('click',function(e){
    if(confirm(`Voulez-vous vraiment supprimer ${prenom} ${nom} de la basse de donnée ! `)){
    const row = this.parentNode.parentNode;
    row.parentNode.removeChild(row); 
    }   
  })
}

function nettoyerInputs(){
  const inputs = document.querySelectorAll('input');
  for(input of inputs){
    input.value = "";
  }
  inputs[7].value = "Ajouter"
}

function viderErreur(){
  const ps = document.querySelectorAll('p');
  for( p of ps){
    p.setAttribute("class","");
    p.innerHTML="";
  }
}