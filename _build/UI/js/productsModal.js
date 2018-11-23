'use strict';

var authModal = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/products/', {
  headers: {
    Authorization: 'Bearer ' + authModal
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {
  var output = '';
  output += '<option value="" disabled selected>Select Product</option>';
  data.products.forEach(function (product) {
    output += '<option value="' + product.product_id + '">' + product.product_name + '</li>\n    ';
  });
  document.querySelector('.product-list').innerHTML = output;
});