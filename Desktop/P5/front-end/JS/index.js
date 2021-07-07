//  Récupération des données API fetch

fetch("http://localhost:3000/api/furniture")
  .then((response) => response.json())
  .then((response) => {
    let html = "";

    // Boucle pour récupére toutes les variables des produits

    for (let i = 0; i < response.length; i++) {
      html += `<article id="meubles" class="produit">
        <h2 id="produit-title" class="produit-title">${response[i].name}</h2>
        <img class="produit-img" src="${
          response[i].imageUrl
        }" alt="images meubles"/>
        <p id="produit-body" class="produit-body">${response[i].description}</p>
        <p id="produit-price" class="produit-price placement">${
          response[i].price / 100
        }€</p>
        <a href="./produits.html?${
          response[i]._id
        }"><button id="produit-id" class="produit-id placement">Voir article</button></a>
        
      </article>`;
    }

    document.getElementById("meubles").innerHTML = html;
  })

  // Message d'erreur
  .catch((e) => {
    errorMessage();
  });
