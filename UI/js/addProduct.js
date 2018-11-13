const name = document.getElementById('name');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const errorId = document.getElementById('errorId');
const addProductsForm = document.getElementById('addProductsForm');

function addProduct(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name.value,
      price: price.value,
      quantity: quantity.value,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success === true) {
        window.location.href = 'products-admin.html';
      }
      errorId.innerHTML = `${data.message}`;
      errorId.style.display = 'block';
      setTimeout(() => {
        errorId.style.display = 'none';
      }, 3000);
    })
    .catch(error => console.log(error.message));
}

addProductsForm.addEventListener('submit', addProduct);
