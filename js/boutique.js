class Boutique {
    constructor() {
        this.produits = [];
        this.categorie = "cameras";
    }
    recupereProduits() {
        fetch(`http://localhost:3000/api/${this.categorie}`).then(function(responce){
            responce.json().then(function(produits){ 
            });
        });
    }
}

let boutique = new Boutique();