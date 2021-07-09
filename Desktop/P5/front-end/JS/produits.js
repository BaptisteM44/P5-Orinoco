const productId = window.location.search.substr(1);
console.log(productId);

fetch(`http://localhost:3000/api/furniture/${productId}`)
  .then((response) => response.json())
  .then((response) => {
    let html = "";

    html += `
        <h2 id="produit-title" class="produit-title">${response.name}</h2>
        <img class="produit-img" src="${
          response.imageUrl
        }" alt="images meubles"/>
        <p id="produit-body" class="produit-body">${response.description}</p>
        <p id="produit-price" class="produit-price placement">${
          response.price / 100
        } €</p>
        <form>
          <label for="option-produit">Choisir l'option :</label>
          <select name="option-produit" id="option-produit">
            <option value="option_1">Vernis mat</option>
            <option value="option_1">Vernis satiné</option>
            <option value="option_1">Vernis brillant</option>
          </select>
            <label for="quantite_produit">Choisir la quantité</label>
              <select name="quantite_produit" id="quantite_produit">
              </select>
        </form>
        <button id="btn-envoyer" type="submit" name="btn-envoyer">Ajouter au panier</button>`;

    document.getElementById("position-produit").innerHTML = html;

    //---------Quantite : choisir la quantité de produit possible

    const structureQuantité = `
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    `;
    //Quantité : afficher les quantités de structureQuantite
    const positionElementQuantite = document.querySelector("#quantite_produit");
    positionElementQuantite.innerHTML = structureQuantité;
    //Selection du bouton Ajouter au panier
    const btn_envoyerPanier = document.querySelector("#btn-envoyer");
    console.log(btn_envoyerPanier);

    //Ecouter le bouton et envoyer le panier
    btn_envoyerPanier.addEventListener("click", (event) => {
      event.preventDefault();

      //Quantite : mettre la quantité dans une variable
      const choixQuantite = positionElementQuantite.value;

      //-----récupération des valeurs de formulaire
      let produitSelection = {
        id: response._id,
        name: response.name,
        price: (response.price * choixQuantite) / 100,
        quantity: choixQuantite,
        imageUrl: response.imageUrl,
      };
      console.log(produitSelection);

      //JSON.parse convertir les données au format JSON en objet JS
      let itemStorage = JSON.parse(localStorage.getItem("produit"));

      //fonction fenêtre popup
      const popupConfirmation = () => {
        if (
          window.confirm(
            `${response.name}  a bien été ajouté au panier Consulter le panier OK ou revenir à l'accueil ANNULER`
          )
        ) {
          window.location.href = "panier.html";
        } else {
          window.location.href = "index.html";
        }
      };
      const ajoutProduitLocalStorage = () => {
        itemStorage.push(produitSelection);

        //transformation en JSON et envoi dans la key "produit" du localStorage
        localStorage.setItem("produit", JSON.stringify(itemStorage));
      };
      // vérifie s'il est déja présent
      // si oui, dejaPresent en true et sauvegarde sa place dans le localStorage
      let isAlreadyPresent = false;
      let indexModification;
      for (products of itemStorage) {
        switch (products.name) {
          case produitSelection.name:
            isAlreadyPresent = true;
            indexModification = itemStorage.indexOf(products);
        }
      }

      // si déjaPresent incrémente seulement la quantité
      if (isAlreadyPresent) {
        itemStorage[indexModification].quantity =
          +itemStorage[indexModification].quantity + +produitSelection.quantity;
        localStorage.setItem("produit", JSON.stringify(itemStorage));
        popupConfirmation();
        // si non, ajoute le produit au localStorage
      } else {
        ajoutProduitLocalStorage();
        popupConfirmation();
      }
    });
  });
