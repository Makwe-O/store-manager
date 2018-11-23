'use strict';

var shoppingCartContent = document.querySelector('#cart-content tbody');
var clearCartBtn = document.querySelector('.clear-cart');

function getProductFormLocaleStorage() {
  var localStorageProducts = void 0;
  if (localStorage.getItem('localStorageProducts') === null) {
    localStorageProducts = [];
  } else {
    localStorageProducts = JSON.parse(localStorage.getItem('localStorageProducts'));
  }
  return localStorageProducts;
}

// loads when document is ready and adds products from local storage
function getFromLocaleStorage() {
  var productsLS = getProductFormLocaleStorage();
  console.log(productsLS);
  // Check if cart is empty
  if (productsLS.length === 0) {
    // Create empty cart error message
    var row = document.createElement('h3');
    row.innerHTML = '<h3>Cart is currently empty</h3>';
    shoppingCartContent.appendChild(row);
  } else {
    productsLS.forEach(function (productLS) {
      // Create rows
      var row = document.createElement('tr');

      // Print the contents
      row.innerHTML = '\n      <tr>\n        <td>\n            <img src="' + productLS.image + '" width=150>\n        </td>\n        <td>' + productLS.title + '</td>\n        <td>' + productLS.price + '</td>\n        <td><input type="number" value="1"</td>\n        <td>\n            <a href="#" class="remove" data-id="' + productLS.id + '"><i class="fas fa-trash-alt trash"></i></a>\n        </td>\n    </tr>\n      ';
      shoppingCartContent.appendChild(row);
    });
  }
}

// Function to remove selected product from local storage
function removeProductLocalStorage(localStorageProductId) {
  // get local storage data
  var productsLS = getProductFormLocaleStorage();
  console.log(productsLS);
  // loop through array to find index
  productsLS.forEach(function (productLS, index) {
    if (productLS.id === localStorageProductId) {
      console.log(productsLS.splice(index, 1));
    }
  });

  localStorage.setItem('localStorageProducts', JSON.stringify(productsLS));
}

// Function to clear cart from local storage
function clearCartLocalStorage() {
  var productLS = getProductFormLocaleStorage();
  productLS = [];
  localStorage.setItem('localStorageProducts', JSON.stringify(productLS));
}

// remove product from cart
function removeProduct(e) {
  var localStorageProduct = void 0;
  var localStorageProductId = void 0;
  if (e.target.classList.contains('trash')) {
    e.target.parentElement.parentElement.parentElement.remove();
    localStorageProduct = e.target.parentElement.parentElement.parentElement;
    localStorageProductId = localStorageProduct.querySelector('a').getAttribute('data-id');
  }

  // call function to remove selected product from local storage
  removeProductLocalStorage(localStorageProductId);
}

// Clear the entire cart
function clearCart() {
  shoppingCartContent.innerHTML = '';
  // call function to clear cart from local storage
  clearCartLocalStorage();
  // Link back to sales record page
  window.location.href = 'sales-record.html';
}

document.addEventListener('DOMContentLoaded', getFromLocaleStorage);
shoppingCartContent.addEventListener('click', removeProduct);
clearCartBtn.addEventListener('click', clearCart);