
// Validation du formulaire // 

inputValidity(document.getElementById("last-name"), (event) => event.target.value.length > 1)
inputValidity(document.getElementById("first-name"), (event) => event.target.value.length > 1)
inputValidity(document.getElementById("address"), (event) => event.target.value.length > 5)
inputValidity(document.getElementById("zip-code"), (event) => {
    const zipCodeRegex = /\d{2}[ ]?\d{3}/
    return zipCodeRegex.test(event.target.value)
})
inputValidity(document.getElementById("city"), (event) => event.target.value.length > 2)
inputValidity(document.getElementById("email"), (event) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return emailRegex.test(event.target.value)
})

function inputValidity(element, condition) {
   element.oninput = (event) => {
        if (condition(event)) {                     // ajout du surlignement vert si les caractères saisies sont correctes pendant le saisi // 
            validInputElement(event.target)
        }
   }

   element.onblur = (event) => {
       if (!condition(event)) {
           invalidInputElement(event.target)        // à la perte du focus met la couleur rouge si les caractères saisies sont incorrectes // 
       }
   }
}

// les couleurs sur la bordure de l'element //
function validInputElement(element) {
    element.style.border = "solid 3px green"
}
function invalidInputElement(element) {
    element.style.border ="solid 2px red"
}

// Si tous les éléments sont incorrectes ou seulement un met l'alert // 
function sendOrder() {
    const lastname = document.getElementById('last-name').value
    const firstname = document.getElementById('first-name').value
    const adress = document.getElementById('address').value
    const zipcode = document.getElementById('zip-code').value
    const city = document.getElementById('city').value
    const email = document.getElementById('email').value
  
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const zipCodeRegex = /\d{2}[ ]?\d{3}/

    if (!(
        lastname.length > 1
        && firstname.length > 1
        && adress.length > 5
        && zipCodeRegex.test(zipcode)
        && city.length > 2
        && emailRegex.test(email)
    )) {
        $(".alert-danger").show()
    }  
}
