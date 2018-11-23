'use strict';

var auth = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/products/', {
    headers: {
        Authorization: 'Bearer ' + auth
    }
}).then(function (response) {
    return response.json();
}).then(function (data) {
    var output = '';
    // Check is there are products in the store
    if (data.products.length === 0) {
        output += '<h2 class="text-center">There are currently no products</h2>\n        ';
    }

    if (decoded.role === 'Attendant') {
        data.products.forEach(function (product) {
            output += '<div class="card">\n              <img src="' + product.product_image + '" alt="camera"/>\n              <div class="card__body ">\n                  <h2 class="card__title">' + product.product_name + '</h2>\n                  <div class="card__text">\n                      <p><strong>Price:</strong><span class="price">' + product.price + '</span></p>\n                      <p><strong>Category:</strong><span class="category"> ' + product.category_name + '</span></p>\n                      <p><strong>Inventory:</strong><span class="quantity"> ' + product.quantity + '</span></p>\n                      <p><strong>Minimum Inventory Quantity:</strong> ' + product.quantity + '</p>\n                  </div>\n                  <div  class="card-btn">\n                      <a href="product.html?' + product.product_id + '" id="view" class="btn btn__color--dark btn__border--orange">View</a>\n                      <a href="#" data-id="' + product.product_id + '" id="addToCart" class="btn btn__color--dark btn__border--orange add-to-cart">Add to Cart</a>\n                  </div>\n              </div>\n          </div>\n          ';
        });
    } else {
        data.products.forEach(function (product) {
            output += '<div class="card">\n              <img src="' + product.product_image + '" alt="camera"/>\n              <div class="card__body ">\n                  <h2 class="card__title">' + product.product_name + '</h2>\n                  <div class="card__text">\n                      <p><strong>Price:</strong>' + product.price + '</p>\n                      <p><strong>Category:</strong> ' + product.category_name + '</p>\n                      <p><strong>Inventory:</strong> ' + product.quantity + '</p>\n                      <p><strong>Minimum Inventory Quantity:</strong> ' + product.quantity + '</p>\n                  </div>\n                  <div  class="card-btn">\n                      <a href="product-admin.html?' + product.product_id + '" id="view" class="btn btn__color--dark btn__border--orange">View</a>\n                     \n                  </div>\n              </div>\n          </div>\n          ';
        });
    }
    document.querySelector('.card-grid').innerHTML = output;
});