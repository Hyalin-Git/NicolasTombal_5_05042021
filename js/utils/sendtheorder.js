function sendOrder() {
    const firstname = document.getElementById('first-name').value
    const lastname = document.getElementById('last-name').value
    const adress = document.getElementById('adress').value
    const zipcode = document.getElementById('zipcode').value
    const city = document.getElementById('city').value
    const email = document.getElementById('email').value
    
    const zipCodeRegex = /\d{2}[ ]?\d{3}/
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

     if (!(
    firstname.length > 1
    && lastname.length > 1
    && adress.length > 6
    && zipcodeRegex.test(zipcode)
    && city.length > 1
    && emailRegex.test(email)
  )) {
    alert("Veuillez remplir les champs correctements avant de procéder au paiement")
    return
  }

  const products = Object.values(Cart.products).map((product) => {
    return product._id
  })

  const order = {
    contact: {
      firstName: firstname,
      lastName: lastname,
      address: adress + ' ' + zipcode,
      city: city,
      email: email,
    },
    products: products,
  }

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  }

  fetch(`${apiUrl}/api/teddies/order`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      localStorage.removeItem('shoppingCart')
      window.location.href = `${window.location.origin}/orderStatus.html?orderId=${json.orderId}`
    })
    .catch(() => {
      alert(error)
    })
}