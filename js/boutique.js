class Boutique {
    constructor() 
    {
        this.produits = [];
        this.categorie = "cameras";
    }

    // Requête vers l'API //
    recupereProduits() {
        fetch(`http://localhost:3000/api/${this.categorie}`)
        .then(responce => responce.json())
        .then(produits => { 
            this.produits = produits;
            this.afficheProduits();
            console.table(this.produits);
        });
    }

    // Affiche les produits dans l'ordre dans index.html //
    afficheProduits() {
        let i;
        for(i = 0; i < this.produits.length; i++) {
            document.getElementById("listeproduit")
            .insertAdjacentHTML("beforeend", `
            <div class="col col-lg-3">
                <div class="card shadow border-info mb-5">
                    <img src="${this.produits[i].imageUrl}" alt="Produit appareil photo">
                    <div class="card-body">
                        <h3 class="card-title">${this.produits[i].name}</h3>
                        <p class="card-text lead mb-2">Prix : ${this.produits[i].price / 100}.00 €</p>
                        <p class="card-text">${this.produits[i].description}</p>
                        <a href="produit.html?${this.produits[i]._id}" class="btn btn-info"><i class="fas fa-info mr-2"></i>Voir ce produit</a>          
                    </div>
                </div>
            </div>
            `);
        }
    }

    // Affiche le produit sollicité dans produit.html // 
    detailProduits() {
        const tableLocation = window.location.href.split("?");
        console.log(tableLocation);
        fetch(`http://localhost:3000/api/${this.categorie}/${tableLocation[1]}`)
        .then(responce => responce.json())
        .then(responce => {
            document.querySelector("#displayDetail img").src = responce.imageUrl
            document.querySelector("#displayDetail .card-title").innerHTML = responce.name;
            document.querySelector("#displayDetail .card-text").innerHTML = `${responce.price / 100}.00 €`;
            
            // Permet d'afficher les lenses dans les options //

            const lensesSection = document.getElementsByClassName("lenseOption")[0];
            for (let i = 0; i < responce.lenses.length; i++){
                const lensesOption = document.createElement("option");
                lensesOption.innerHTML = responce.lenses[i];
                lensesSection.appendChild(lensesOption); 
            };
        })
    }
}





let boutique = new Boutique();