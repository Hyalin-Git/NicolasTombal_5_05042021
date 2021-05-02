class Boutique {
    constructor() 
    {
        this.produits = [];
        this.categorie = "cameras";
        this.panier = [];
        // chargement du panier // 
        const strPanierStorage = localStorage.getItem("cart");
        if (strPanierStorage!= null){
            this.panier = JSON.parse(strPanierStorage);
        }
    }

    // Requête vers l'API //
    recupereProduits() {
        fetch(`http://localhost:3000/api/${this.categorie}`)
        .then(response => response.json())
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
        .then(response => response.json())
        .then(response => {
            document.querySelector("#displayDetail img").src = response.imageUrl
            document.querySelector("#displayDetail .card-title").innerHTML = response.name;
            document.querySelector("#displayDetail .card-text").innerHTML = `${response.price / 100}.00 €`;
            
            // Permet d'afficher les lenses dans les options //
            const lensesSection = document.getElementsByClassName("lenseOption")[0];
            for (let i = 0; i < response.lenses.length; i++){
                const lensesOption = document.createElement("option");
                lensesOption.innerHTML = response.lenses[i];
                lensesSection.appendChild(lensesOption); 
            };

            // Ajout de l'event listener sur le boutton // 
            const btnAddToCart = document.getElementsByClassName("btn-add-to-cart")[0];
            btnAddToCart.addEventListener("click", (event) => {                         
                event.preventDefault();

                const selectedOption = document.getElementsByClassName("form-control")[0].value;
                const optionByDefault = "Choissiez la taille de l'objectif";

                if (selectedOption === optionByDefault){    // Si aucun objectif est choisi met l'alert // 
                    alert("Veuillez choisir un objectif");
                } else {

                    var optionToSend = selectedOption;  // Sinon, conserve l'objectif et insère le produit choisi // 
                    let infoToPush = {...response, option : optionToSend}; 
                    this.panier.push(infoToPush); 
                    console.log(this.panier);
                }

                localStorage.setItem("cart",JSON.stringify(this.panier));  // Envoie au localStorage //    
            }) 
        })
    }
    
    //les produits dans le panier //
    productInCart() {
        const resume = document.getElementById("resume");

        this.panier.forEach( product => {
            
            // div card-body rattaché à resume // 
            const tr = document.createElement("tr");
            tr.classList.add("tr")
            resume.appendChild(tr);

            const th = document.createElement("th");
            th.setAttribute("scope", "row");
            tr.appendChild(th);

            // Ajout des informations des produits 
            const img = document.createElement("img");
            img.classList.add("img-fluid", "shadow", "rounded", "border", "border-dark");
            img.style.maxWidth="95px";
            img.src = product.imageUrl;
            th.appendChild(img);

            const cameraName = document.createElement("td");
            cameraName.classList.add("align-middle");
            cameraName.innerHTML = product.name;
            tr.appendChild(cameraName);

            const lensesOption = document.createElement("td");
            lensesOption.classList.add("align-middle");
            lensesOption.innerHTML = product.option;
            tr.appendChild(lensesOption);

            const quantity = document.createElement("td");
            quantity.classList.add("align-middle");
            quantity.innerHTML = 1;
            tr.appendChild(quantity);
           
            const price = document.createElement("td");
            price.classList.add("align-middle");
            price.innerHTML = `${product.price / 100}.00 €`;
            tr.appendChild(price);
            //

            // Ajout du boutton delete // 
            const removeProduct = document.createElement("td");
            removeProduct.classList.add("btn", "btn-danger", "ml-3", "btn-remove-product-from-cart", "px-4","mx-3", "my-3")
            removeProduct.href = "#";
            removeProduct.type = "button";
            tr.appendChild(removeProduct);

            const iconDelete = document.createElement("i");
            iconDelete.classList.add("fas","fa-trash-alt");
            removeProduct.appendChild(iconDelete)
        })

        // rendre le boutton delete fonctionnel // 
        for (let i = 0; i < this.panier.length; i++) {
            const btnRemoveProductFromCart = document.getElementsByClassName("btn-remove-product-from-cart")[i];
            btnRemoveProductFromCart.addEventListener("click", (event) => {
                event.preventDefault();
                location.reload(5000);
    
                // Supprime l'article du localStorage
                this.panier.splice(i, 1 );
                localStorage.setItem("cart", JSON.stringify(this.panier));
    
                // Enlève l'affichage de la ligne //
                if(event.target.parentElement.classList == "tr") {
                    event.target.parentElement.remove();
                } else {
                    event.target.parentElement.parentElement.remove();
                }
            })
        }
        calculateTotal(this.panier, "subtotal");    // calcul le prix total du panier // 
    }
}

let boutique = new Boutique();