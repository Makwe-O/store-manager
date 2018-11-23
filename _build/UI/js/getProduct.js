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
    console.log(data.product);
    var output = '';
    if (decoded.role === 'Attendant') {
        output += '<div class="card">\n              <img src="' + data.product.product_image + '" alt="camera"/>\n              <div class="card__body ">\n                  <h2 class="card__title">' + data.product.product_name + '</h2>\n                  <div class="card__text">\n                      <p><strong>Price:</strong><span class="price">' + data.product.price + '</span></p>\n                      <p><strong>Category:</strong><span class="category"> ' + data.product.category_name + '</span></p>\n                      <p><strong>Inventory:</strong><span class="quantity"> ' + data.product.quantity + '</span></p>\n                      <p><strong>Minimum Inventory Quantity:</strong> ' + data.product.quantity + '</p>\n                  </div>\n                  <div  class="card-btn">\n                      <a href="#" data-id="' + data.product.product_id + '" id="addToCart" class="btn btn__color--dark btn__border--orange add-to-cart">Add to Cart</a>\n                  </div>\n              </div>\n          </div>\n          ';
    } else {
        output += '\n      <div class="single-product-page">\n      <img src="' + data.product.product_image + '" alt="camera">\n      <div>\n          <h4 class="card__title">' + data.product.product_name + '</h4>\n          <div class="card__text">\n              <p><strong>Price:</strong> ' + data.product.price + '</p>\n              <p><strong>Category:</strong> ' + data.product.category_name + '</p>\n              <p><strong>Inventory:</strong> ' + data.product.quantity + '</p>\n              <p><strong>Minimum Inventory Quantity:</strong> ' + data.product.quantity + '</p>\n             \n          </div>\n      </div>\n  </div>\n        ';
    }

    document.querySelector('.card-grid').innerHTML = output;
});