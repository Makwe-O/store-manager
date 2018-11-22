'use strict';

var deleteProductForm = document.getElementById('deleteProductForm');

function deleteProduct(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/products/' + productId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.success === true) {
      window.location.href = 'products-admin.html';
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

deleteProductForm.addEventListener('submit', deleteProduct);