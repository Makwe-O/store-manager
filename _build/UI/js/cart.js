'use strict';

// variables
var cartProducts = document.querySelector('.card-grid');
// functions


function getProductFormLocaleStorage() {
  var localStorageProducts = void 0;
  if (localStorage.getItem('localStorageProducts') === null) {
    localStorageProducts = [];
  } else {
    localStorageProducts = JSON.parse(localStorage.getItem('localStorageProducts'));
  }
  return localStorageProducts;
}

// add to local storage
function addIntoLocalStorage(cartProductInfo) {
  var localStorageProducts = getProductFormLocaleStorage();
  localStorageProducts.push(cartProductInfo);
  localStorage.setItem('localStorageProducts', JSON.stringify(localStorageProducts));
}

// Read the information of the selected product
function getCartProductInfo(cartProduct) {
  // Create object with the course data
  var cartProductInfo = {
    image: cartProduct.querySelector('img').src,
    title: cartProduct.querySelector('.card__title').textContent,
    price: cartProduct.querySelector('.price').textContent,
    id: cartProduct.querySelector('.add-to-cart').getAttribute('data-id')
  };
  addIntoLocalStorage(cartProductInfo);
}

function addProductToCart(e) {
  if (e.target.classList.contains('add-to-cart')) {
    var cartProduct = e.target.parentElement.parentElement.parentElement;

    // Read the values of the product
    getCartProductInfo(cartProduct);
  }
  // use delegation to find product
}

// listeners
cartProducts.addEventListener('click', addProductToCart);