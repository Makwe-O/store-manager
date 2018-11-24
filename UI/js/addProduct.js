const name = document.getElementById('name');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const image = document.getElementById('image');
const category = document.getElementById('category');
const errorId = document.getElementById('errorId');
const addProductsForm = document.getElementById('addProductsForm');

function addProduct(e) {
  e.preventDefault();
  console.log(Number(name.value));
  fetch('https://store-manager-store.herokuapp.com/api/v1/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_image: image.value,
      product_name: name.value,
      price: Number(price.value),
      category_id: Number(category.value),
      quantity: Number(quantity.value),
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
