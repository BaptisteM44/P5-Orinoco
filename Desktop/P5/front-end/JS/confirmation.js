//Récupération des différents éléments dans le localStorage afin de les afficher sur la page confirmation
const response = JSON.parse(localStorage.getItem("response"));
const orderId = JSON.parse(localStorage.getItem("orderId"));
let html = "";

html += `
    <h2>Confirmation de la commande</h2>
    <ul>
        <li class="puce">Vos coordonnées</li>
        <li class="puce">Prénom: ${response.firstName}</li>
        <li class="puce">Nom: ${response.lastName}</li>
        <li class="puce">Adresse: ${response.address}</li>
        <li class="puce">Ville: ${response.city}</li>
        <li class="puce">Email: ${response.email}</li>
    </ul>
    <h3>Total: ${prixTotal / 100} €</h3>
    <h3>Numéro de la commande: </br> ${orderId}</h3>`;
document.getElementById("order_confirmed").innerHTML = html;

localStorage.removeItem("response");
localStorage.removeItem("prixTotal");
localStorage.removeItem("orderId");
