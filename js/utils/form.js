

//  Définition des regex  //
const regex = {
    lastName : /[A-z]{2,}/, 
    firstName : /[A-z]{2,}/,
    address : /[A-z]{2,}/,
    codePostal : /[0-9]{5}(-[0-9]{4})?/,
    city : /[A-z]{2,}/,
    email :/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g 
};

// Compare les données saisies et les regex avant l'autorisation d'enregistrer //
const validateInput = (idHTML, regex, title) => {

    idHTML.addEventListener("input", (event) => {

        const validation = event.target.nextElementSibling; 

        if (regex.test(event.target.value)) {
            validation.textContent = `${title} valide`;
            event.target.classList.add("is-valid");         // Si le champ est valide, cela affiche le nom du champ en question en vert en disant que le champ est valide //
            event.target.classList.remove("is-invalid");
            validation.classList.add("text-success")
            validation.classList.remove("text-danger");
        } else {
            validation.textContent = `${title} invalide`;
            event.target.classList.add("is-invalid");       // Et si c'est invalide, cela affiche le nom du champ en question en rouge en disant que le champ est invalide //
            event.target.classList.remove("is-valid");
            validation.classList.add("text-danger");
            validation.classList.remove("text-success");
        }
        // le bouton enregistré devient cliquable que lorsque les champs sont correctement remplis // 
        enableContactSubmitBtn();
    })
}

const lastName = document.getElementById("last-name");
const firstName = document.getElementById("first-name");
const address = document.getElementById("address");
const codePostal = document.getElementById("zip-code");
const city = document.getElementById("city");
const email = document.getElementById("email");

validateInput(lastName, regex.lastName, "Nom");
validateInput(firstName, regex.firstName, "Prénom");
validateInput(address, regex.address, "Adresse");
validateInput(codePostal, regex.codePostal, "Code postal");
validateInput(city, regex.city, "Ville");
validateInput(email, regex.email, "Email");



// Si tous les results sont un succès, rends cliquable le bouton enregistré // 
const result = document.getElementsByClassName("result");

const enableContactSubmitBtn = () => {

    let counter = 0;

    for (let i = 0; i < result.length ; i++ ) {

        const input = result[i].classList.value
        
        if ( input == ("result text-success")){
            counter += 1;

            if( counter === result.length){ 
                contactSubmited.disabled = false;
            } 
        }
        else {
            contactSubmited.disabled = true;
        }
    }
}



const form = document.getElementById("contact-form"); // visible (par défaut) // 
const registeredInfos = document.getElementById("registered-infos"); // invisible (par défaut) // 
const btnModify = document.getElementById("btn-modify"); // invisible (par défaut) // 
const savedInfo = document.getElementById("saved-info")

// Remplace le formulaire par ce bloc qui récupère les informations du client dans le localStorage pour les afficher ici // 
const replaceBlockRegisteredInfos = () => { 
    
    const contactJSON = JSON.parse(localStorage.getItem("contact"));
    
    registeredInfos.innerHTML = "Nous vous livrons à cette adresse :<br/>"+ contactJSON.firstName + " <b>" + contactJSON.lastName.toUpperCase()+"</b> <br/>" + contactJSON.address+ "<br/>" + contactJSON.codePostal + "<br>" + contactJSON.city + "<br/>" + contactJSON.email; // Insertion dans le bloc infos
    
    const firstNameSaved = document.getElementById("first-name-saved");
    firstNameSaved.innerHTML = contactJSON.firstName; // Afin d'afficher le nom du client dans le message succès // 
}

// Change la visibilité de ces deux éléments //

const toggleVisibilityBlock = () => { 
    form.classList.toggle("unvisible");
    savedInfo.classList.toggle("unvisible");
}

const contactSubmited = document.getElementById("account-submited")
contactSubmited.disabled = true; // Par défaut le bouton enregistrer est désactivé // 

contactSubmited.addEventListener("click", (event) => {    
    event.preventDefault();

    const contact = {
        lastName : lastName.value,
        firstName : firstName.value,
        address : address.value,
        codePostal : codePostal.value,
        city : city.value,
        email : email.value
    }

    localStorage.setItem("contact",JSON.stringify(contact));
    
    $(".alert-success").show(); // Affichage du message avec le nom du client // 

    replaceBlockRegisteredInfos(); // Affiche les données du client à la place du formulaire // 

    // le formulaire devient invisible // 
    toggleVisibilityBlock();
})

//  Si le client s'est déjà enregistré affiche directement le bloc avec les informations ainsi que le bouton modifier si il doit changer de coordonnées //
if (localStorage.getItem("contact")) {
    
    replaceBlockRegisteredInfos(); 

    // Formulaire invisible, block info visibles
    toggleVisibilityBlock();
}

// Si le bouton modifier est cliqué affiche alors le formulaire redeviens et rends invisible le bloc avec les données du client //
btnModify.addEventListener("click", (event) => {
    event.preventDefault();

    toggleVisibilityBlock();
});
