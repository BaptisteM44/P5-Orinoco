let produitSelection = JSON.parse(window.localStorage.getItem("produit"));
//JSON.parse convertir les données au format JSON en objet JS
// let itemStorage = JSON.parse(window.localStorage.getItem("name", "price"));
// console.log(itemStorage, "ok");
//affichage des produits du panier

const positionElement = document.querySelector("#container-produit-panier");

//si le panier est vide : afficher le panier est vide

if (produitSelection === null || produitSelection == 0) {
  const panierVide = `
            <p>PANIER VIDE</p>`;
  positionElement.innerHTML = panierVide;
} else {
  let structureProduitPanier = [];
  // si le panier n'est pas vide: afficher localStorage
  for (k = 0; k < produitSelection.length; k++) {
    structureProduitPanier =
      structureProduitPanier +
      `
        <ul id="container-recap" class="cartWrap">
          <li class="items odd">
            <div class="infoWrap">
              <div class="cartSection">
                <h3 id="itemName">${produitSelection[k].name}</h3>
                <p>${produitSelection[k].quantity}</p>
                <p id="itemPrice">${produitSelection[k].price} €</p>
                <a id=""class="remove"
                  ><i class="fa fa-trash" aria-hidden="true"></i
                ></a>
              </div>
            </div>
          </li>
        </ul>
      </div>

    `;
    if (k == produitSelection.length) {
    }
  }

  positionElement.innerHTML = structureProduitPanier;
}
//------Fin affichage produit panier

//-----Boutton supprimer article----
let remove = document.querySelectorAll(".remove");

for (let l = 0; l < remove.length; l++) {
  remove[l].addEventListener("click", (event) => {
    event.preventDefault();

    let id_selectionner_supp = produitSelection[l].id;

    produitSelection = produitSelection.filter(
      (el) => el.id !== id_selectionner_supp
    );

    //transformation en JSON et envoi dans la key "produit" du localStorage
    localStorage.setItem("produit", JSON.stringify(produitSelection));

    //alerte produit supprimé et rechargement de page
    alert("Ce produit à bien été supprimer du panier");
    window.location.href = "panier.html";
  });
}

//------------Prix total du panier----------
let prixTotal = [];
for (let m = 0; m < produitSelection.length; m++) {
  let prixPanier = produitSelection[m].price;

  //mettre les prix dans la variable "prixTotal"
  prixTotal.push(prixPanier);
}

//additionner les prix dans tableau variable price
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixFinal = prixTotal.reduce(reducer, 0);
console.log(prixFinal);

//code html prix total
const prixHtml = `
    <div id="total" class="subtotal cf">
      <ul>
        <li class="totalRow final">
          <span class="label">Total ${prixFinal} €</span><span id="value" class="value"></span>
        </li>
        
      </ul>
    </div>`;

positionElement.insertAdjacentHTML("beforeend", prixHtml);

//-----Fin Total Panier-----

//----Formulaire de commande------

const formulaireHtml = () => {
  const positionElement = document.querySelector("#container-produit-panier");

  const structureFormulaire = `    <form class="cart" action="#">
      <h1 class="titre_formulaire">
        Remplissez le formulaire pour valider la commande
      </h1>
      <div class="required">
        <label for="firstname">Prénom</label>
        <input id="firstname" placeholder="Prénom" type="text" />
      </div>
      <div class="required toUpper">
        <label for="name">Nom</label>
        <input id="name" placeholder="Nom de famille" type="text" />
      </div>
      <div class="required toUpper">
        <label for="address">Adresse</label>
        <textarea id="address" placeholder="Adresse"></textarea>
      </div>
      <div class="required">
        <label for="city">Ville</label>
        <input id="city" placeholder="Ville" type="text" />
      </div>
      <div class="required toUpper">
        <label for="email">Email</label>
        <input id="email" placeholder="Email" type="text" />
      </div>
      <div>
        <label>&nbsp;</label>
        <li class="totalRow">
          <a href="./confirmation.html" id="confirmer" class="btn continue">Confirmation de la commande</a>
        </li>
      </div>
    </form>`;

  positionElement.insertAdjacentHTML("afterend", structureFormulaire);
};
//affichage du formulaire
formulaireHtml();

//sélection du btn envoyer le formulaire
const btnEnvoyerFormulaire = document.querySelector("#confirmer");
//---------addEventListener---------
btnEnvoyerFormulaire.addEventListener("click", (e) => {
  e.preventDefault();

  class formulaire {
    constructor(input) {
      this.firstname = document.querySelector("#firstname").value;
      this.name = document.querySelector("#name").value;
      this.address = document.querySelector("#address").value;
      this.city = document.querySelector("#city").value;
      this.email = document.querySelector("#email").value;
    }
  }
  const formulaireValues = new formulaire("city");
  // -------------VALIDATION DU FORMULAIRE--------------
  const textAlert = (value) => {
    return `${value}: Chiffre et symbole non autorisé`;
  };
  const regExPrenomNomVille = (value) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
  };
  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };
  const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };
  function prenomControle() {
    //contrôle validité prénom
    const lePrenom = formulaireValues.firstname;
    if (regExPrenomNomVille(lePrenom)) {
      return true;
    } else {
      alert(textAlert("Prénom"));
      return false;
    }
  }
  function nomControle() {
    //contrôle validité nom
    const leNom = formulaireValues.name;
    if (regExPrenomNomVille(leNom)) {
      return true;
    } else {
      alert(textAlert("Nom"));
      return false;
    }
  }
  function adresseControle() {
    //contrôle validité adresse
    const leAdresse = formulaireValues.address;
    if (regExAdresse(leAdresse)) {
      return true;
    } else {
      alert(
        "L'adresse doit contenir que des lettres sans ponctuation et des chiffres"
      );
      return false;
    }
  }
  function villeControle() {
    //contrôle validité ville
    const laVille = formulaireValues.city;
    if (regExPrenomNomVille(laVille)) {
      return true;
    } else {
      alert(textAlert("Ville"));
      return false;
    }
  }
  function emailControle() {
    //contrôle validité email
    const leEmail = formulaireValues.email;
    if (regExEmail(leEmail)) {
      return true;
    } else {
      alert("l'email n'est pas valide");
      return false;
    }
  }
  //contrôle validité avant envoi localStorage
  if (
    prenomControle() &&
    nomControle() &&
    emailControle() &&
    villeControle() &&
    adresseControle()
  ) {
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
    localStorage.setItem("prixFinal", JSON.stringify(prixFinal));
    console.log("prixFinal", prixFinal);

    const envoiInfo = {
      contact: {
        firstName: formulaireValues.firstname,
        lastName: formulaireValues.name,
        address: formulaireValues.address,
        city: formulaireValues.city,
        email: formulaireValues.email,
      },
      products: (formulaireValues.id = []),
    };
    envoieVersServeur(envoiInfo);
  } else {
    alert("veuillez bien remplir le formulaire");
  }
  // -------------FIN VALIDATION DU FORMULAIRE--------------
});

function envoieVersServeur(envoiInfo) {
  // Envoie de l'objet "envoiInfo" vers l'API
  const promise01 = fetch("http://localhost:3000/api/furniture/order/", {
    method: "POST",
    body: JSON.stringify(envoiInfo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //pour voir le résultat du serveur dans la console
  promise01.then(async (response) => {
    //si la promesse n'est pas résolu, si elle est rejeté - gestion des erreurs
    try {
      console.log("response");
      console.log(response);

      const contenu = await response.json();
      console.log(contenu);
      if (response.ok) {
        console.log(`resultat de response.ok ${response.ok}`);

        //récupération de l'ID de la response du serveur
        console.log("id du serveur");
        console.log(contenu.orderId);

        localStorage.setItem("responseId", contenu.orderId);
        //aller vers la page confirmation commande
        window.location = "confirmation.html";
      } else {
        console.log(`réponse du serveur ${response.status}`);
        alert(`Problème avec le serveur ${response.status}`);
      }
    } catch (e) {
      console.log(e);
      console.log("Erreur qui vient du catch()");
      alert(`erreur qui vient du catch() ${e}`);
    }
  });
}

// -----Mettre le contenu du localStorage dans les champs du formulaire----
const dataLocalStorage = localStorage.getItem("formulaireValues");

//convertir en objet JS
const dataLocalObjet = JSON.parse(dataLocalStorage);

// fonction pour que le champ du formulaire soit rempli par les données du local storage
function champLocalStorage(input) {
  if (dataLocalObjet == null) {
  } else {
    document.querySelector(`#${input}`).value = dataLocalObjet[input];
  }
}

champLocalStorage("name");
champLocalStorage("firstname");
champLocalStorage("email");
champLocalStorage("address");
champLocalStorage("city");
