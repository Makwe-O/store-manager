'use strict';

var name = document.getElementById('name');
var price = document.getElementById('price');
var quantity = document.getElementById('quantity');
var errorId = document.getElementById('errorId');
var editProductForm = document.getElementById('editProductForm');

function editProduct(e) {
  e.preventDefault();
  // eslint-disable-next-line no-template-curly-in-string
  fetch('http://localhost:3000/api/v1/products/${id}', {
    method: 'PUT',
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
    if (data.success === true) {
      window.location.href = 'product-admin.html';
    }
    errorId.innerHTML = '' + data.message;
    errorId.style.display = 'block';
    setTimeout(function () {
      errorId.style.display = 'none';
    }, 3000);
  }).catch(function (error) {
    return console.log(error.message);
  });
}

editProductForm.addEventListener('submit', editProduct);