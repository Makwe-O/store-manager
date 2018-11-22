'use strict';

var auth = localStorage.getItem('token');
var urlParams = new URLSearchParams(window.location.search);
var productId = Number(urlParams.toString().replace('=', ''));
fetch('http://localhost:3000/api/v1/products/' + productId, {
  headers: {
    Authorization: 'Bearer ' + auth
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {
  var output = '';
  output += '\n      <div class="single-product-page">\n      <img src="' + data.product.product_image + '" alt="camera">\n      <div>\n          <h4 class="card__title">' + data.product.product_name + '</h4>\n          <div class="card__text">\n              <p><strong>Price:</strong> ' + data.product.price + '</p>\n              <p><strong>Category:</strong> ' + data.product.category_name + '</p>\n              <p><strong>Inventory:</strong> ' + data.product.quantity + '</p>\n              <p><strong>Minimum Inventory Quantity:</strong> ' + data.product.quantity + '</p>\n             \n          </div>\n      </div>\n  </div>\n        ';

  document.querySelector('.card-grid').innerHTML = output;
});