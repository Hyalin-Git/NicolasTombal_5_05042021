let apiUrl = 
location.hostname === 'localhost' || location.hostname === '127.0.0.1'
? "http://localhost:3000/api/cameras"
: "https://oc-devweb-p5-api.herokuapp.com/api/cameras"

const get = (parameter) => {
    return fetch(APIUrl + parameter) // retourne la promesse du fetch qui retourne l'objet json 
        .then((res) => res.json())
        .then(json => json)
        .catch(err => alert(messageError+ err + APIUrl + parameter))
}

// Post les données de l'API // 
const post = (parameter, dataToSend) => {
    const myHeader = new Headers ({
        "content-Type" : "application/json; charset=utf-8"
    });
    
    const post = { 
        method : "POST",
        headers : myHeader,
        body : dataToSend
    };
    
    return fetch (apiUrl + parameter, post) // retourne la promesse du fetch qui retourne l'objet json
    .then ((response) => response.json())
    .then (json => json)
    .catch (err => alert(err + apiUrl + parameter))
}

