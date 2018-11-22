const shoppingCartContent = document.querySelector('#cart-content tbody');

function getProductFormLocaleStorage() {
  let localStorageProducts;
  if (localStorage.getItem('localStorageProducts') === null) {
    localStorageProducts = [];
  } else {
    localStorageProducts = JSON.parse(localStorage.getItem('localStorageProducts'));
  }
  return localStorageProducts;
}

// loads when document is ready and adds products from local storage
function getFromLocaleStorage() {
  const productsLS = getProductFormLocaleStorage();
  console.log(productsLS);
  // Check if cart is empty
  if (productsLS.length === 0) {
    // Create empty cart error message
    const row = document.createElement('h3');
    row.innerHTML = '<h3>Cart is currently empty</h3>';
    shoppingCartContent.appendChild(row);
  } else {
    productsLS.forEach((productLS) => {
    // Create rows
      const row = document.createElement('tr');

      // Print the contents
      row.innerHTML = `
      <tr>
        <td>
            <img src="${productLS.image}" width=150>
        </td>
        <td>${productLS.title}</td>
        <td>${productLS.price}</td>
        <td><input type="number" value="1"</td>
        <td>
            <a href="#" class="remove" data-id="${productLS.id}"><i class="fas fa-trash-alt trash"></i></a>
        </td>
    </tr>
      `;
      shoppingCartContent.appendChild(row);
    });
  }
}

// Function to remove selected product from local storage
function removeProductLocalStorage(localStorageProductId) {
  // get local storage data
  const productsLS = getProductFormLocaleStorage();
  console.log(productsLS);
  // loop through array to find index
  productsLS.forEach((productLS, index) => {
    if (productLS.id === localStorageProductId) {
      console.log(productsLS.splice(index, 1));
    }
  });

  localStorage.setItem('localStorageProducts', JSON.stringify(productsLS));
}

// remove product from cart
function removeProduct(e) {
  let localStorageProduct;
  let localStorageProductId;
  if (e.target.classList.contains('trash')) {
    e.target.parentElement.parentElement.parentElement.remove();
    localStorageProduct = e.target.parentElement.parentElement.parentElement;
    localStorageProductId = localStorageProduct.querySelector('a').getAttribute('data-id');
  }

  // call function to remove selected product from local storage
  removeProductLocalStorage(localStorageProductId);
}


document.addEventListener('DOMContentLoaded', getFromLocaleStorage);
shoppingCartContent.addEventListener('click', removeProduct);
