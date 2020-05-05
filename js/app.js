const btnModifier = document.querySelector('#modifier');
btnModifier.style.display="none";
const inputs = document.querySelectorAll('input');
let select = document.querySelector('select');
select = select.options[select.selectedIndex].value;
Afficher();


function Afficher(){

  axios.get('http://167.71.45.243:4000/api/employes?api_key=vrctsrw').then(function(response){
      console.log(response.data)
      let tableUsers = document.querySelector('table').querySelector('tbody');

      for(let employe of response.data){
        const tr=`<td>${employe._id} </td><td>${employe.nom} </td><td>${employe.prenom} </td><td>${employe.estMarie} </td><td>${employe.pays} </td><td>${employe.email} </td><td>${employe.numeroTelephone} </td><td>${employe.poste} </td><td><a id="mod-${employe._id}"><i class="fas fa-edit"></i></a></td><td><a id="supp-${employe._id}"><i class="fas fa-trash-alt"></i></a></td>`;
        tableUsers.insertAdjacentHTML('beforeend',tr)
        
        //Appelle de la fonction Supprimer
        Supprimer(`supp-${employe._id}`,`${employe._id}`,`${employe.prenom}`,`${employe.nom}`);
                  
        //Modifier
        Modifier(`mod-${employe._id}`,`${employe._id}`,`${employe.prenom}`,`${employe.nom}`,`${employe.estMarie}`,`${employe.pays}`,`${employe.email}`,`${employe.numeroTelephone}`,`${employe.poste}`)

    }
  }).catch((erreurs)=>{
      console.log(erreurs);
  })

}


//founction Ajouter

function Ajouter(datas){

  axios.post('http://167.71.45.243:4000/api/employes?api_key=vrctsrw',datas)
  .then(function(response){
      console.log(response.data);
      location.reload();
  })
  .catch(function(erreurs){
      console.log(erreurs)
  })
}

// fonction Modifier
function Modifier(btn,id,prenom,nom,estMarie,pays,email,numeroTelephone,poste){
  const modifier=document.getElementById(btn);
  //recuperation des éléments
  modifier.addEventListener('click',function(e){
  const inputs = document.querySelectorAll('input');
  let select = document.querySelector('select');
  const btnModifier = document.querySelector('#modifier');
  const btnAjouter = document.querySelector('#ajouter');
  btnAjouter.style.display="none";
  btnModifier.style.display="block"
  inputs[0].value = nom;
  inputs[1].value = prenom;
  select.value = estMarie; 
  inputs[2].value = pays; 
  inputs[3].value = email;
  inputs[4].value = numeroTelephone;
  inputs[5].value = poste;
  //validation de la modification
  
  btnModifier.addEventListener("click", (e)=>{
    e.preventDefault();
    select = select.options[select.selectedIndex].value;
    const donneeFormulaire={};
    donneeFormulaire["nom"]= inputs[0].value;
    donneeFormulaire["prenom"]= inputs[1].value;
    donneeFormulaire["estMarie"]= select;
    donneeFormulaire["pays"]= inputs[2].value;
    donneeFormulaire["email"]= inputs[3].value;
    donneeFormulaire["numeroTelephone"]= inputs[4].value;
    donneeFormulaire["poste"]= inputs[5].value;
    console.log(donneeFormulaire);
    axios.put(`http://167.71.45.243:4000/api/employes/${id}?api_key=vrctsrw`,donneeFormulaire)
    .then(function(response){
        console.log(response.data)
        location.reload();
    })
    .catch(function(erreurs){
        console.log(erreurs)
    })
  })
})
}

// la fonction supprimer
function Supprimer(btn,id,prenom,nom){
  const supprimer=document.getElementById(btn);
  supprimer.addEventListener('click',function(e){
      console.log(id);
      if(confirm(`Voulez-vous vraiment supprimer ${prenom} ${nom} de la basse de donnée ! `)){
        axios.delete(`http://167.71.45.243:4000/api/employes/${id}?api_key=vrctsrw`)
        .then(function(){
          location.reload();
        }).catch(function(erreur){
            console.log(erreur)
        })
      }
  })
}



  const btnAjouter = document.querySelector('.button');
  btnAjouter.addEventListener("click", (e)=>{
    e.preventDefault();

    RecupererDonnee();
  })

  function RecupererDonnee(){
    if((!inputs[0].value || inputs[0].length < 2 ) || (!inputs[1].value || inputs[1].length < 2 ) || !inputs[2].value || !inputs[4].value || !inputs[5].value || !inputs[6].value){
      Validation(inputs);
    }else{
      Ajouter(NewObject(inputs,select));

    }

     
      
    
  
  }



  function NewObject(inputs,select){
    const donneeFormulaire={};
    donneeFormulaire["nom"]= inputs[0].value;
    donneeFormulaire["prenom"]= inputs[1].value;
    donneeFormulaire["estMarie"]= select;
    donneeFormulaire["pays"]= inputs[2].value;
    donneeFormulaire["email"]= inputs[3].value;
    donneeFormulaire["numeroTelephone"]= inputs[4].value;
    donneeFormulaire["poste"]= inputs[5].value;
    return donneeFormulaire;
  }



  function Validation(inputs){
    setInterval(() => {
      viderErreur();
      for( input of inputs ){      
        if(!input.value){
          const erreur = `Le ${input.name} ne doit pas être vide ou avoir <2 caractères`;
          const p = document.createElement('p');
          p.setAttribute("class","ui negative message")
          p.innerHTML=erreur;
          const msgError = document.querySelector(`#${input.name}`);
          msgError.appendChild(p)
        }
      }
    },10);
  }
  
 


function viderErreur(){
  const ps = document.querySelectorAll('p');
  for( p of ps){
    p.setAttribute("class","");
    p.innerHTML="";
  }
}



