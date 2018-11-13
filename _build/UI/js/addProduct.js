'use strict';

var name = document.getElementById('name');
var price = document.getElementById('price');
var quantity = document.getElementById('quantity');
var errorId = document.getElementById('errorId');
var addProductsForm = document.getElementById('addProductsForm');

function addProduct(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      name: name.value,
      price: price.value,
      quantity: quantity.value
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.success === false) {
      errorId.innerHTML = '' + data.message;
      errorId.style.display = 'block';
      setTimeout(function () {
        errorId.style.display = 'none';
      }, 3000);
    }
    //   window.location.href = 'products-admin.html';
  }).catch(function (error) {
    return console.log(error.message);
  });
}

addProductsForm.addEventListener('submit', addProduct);