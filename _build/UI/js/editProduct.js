'use strict';

var name = document.getElementById('name');
var price = document.getElementById('price');
var quantity = document.getElementById('quantity');
var image = document.getElementById('image');
var category = document.getElementById('category');
var errorId = document.getElementById('errorId');
var editProductForm = document.getElementById('editProductForm');

function editProduct(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/products/' + productId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      product_image: image.value,
      product_name: name.value,
      price: Number(price.value),
      category_id: Number(category.value),
      quantity: Number(quantity.value)
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    if (data.success === true) {
      window.location.href = 'product-admin.html?' + productId;
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