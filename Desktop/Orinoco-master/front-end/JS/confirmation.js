//Récupération de l'id de la commande dans le Local storage
const responseId = localStorage.getItem("responseId");

//récupération du prix total de la commande
const prixFinal = localStorage.getItem("prixFinal");

//La structure HTML de la page confirmation

const positionElement2 = document.querySelector("#container-commande");

const structureConfirmation = `
  <h2>Merci pour votre commande</h2>
  <div class="recapCommande">
    <p class="txt">Votre commande numéro: <span>${responseId}</span> a bien été prise en compte</p>
    <p class="txt">Le total de votre commande: <span>${prixFinal} €</span></p>
  </div>`;

//Injection HTML
positionElement2.insertAdjacentHTML("afterbegin", structureConfirmation);

//effacer le localStorage sauf le formulaire

function deleteLocalStorage(key) {
  localStorage.removeItem(key);
}

deleteLocalStorage("prixFinal");
deleteLocalStorage("produit");
deleteLocalStorage("responseId");
