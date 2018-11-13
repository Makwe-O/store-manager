const name = document.getElementById('name');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const errorId = document.getElementById('errorId');
const editProductForm = document.getElementById('editProductForm');

function editProduct(e) {
  e.preventDefault();
  // eslint-disable-next-line no-template-curly-in-string
  fetch('http://localhost:3000/api/v1/products/${id}', {
    method: 'PUT',
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
        window.location.href = 'product-admin.html';
      }
      errorId.innerHTML = `${data.message}`;
      errorId.style.display = 'block';
      setTimeout(() => {
        errorId.style.display = 'none';
      }, 3000);
    })
    .catch(error => console.log(error.message));
}


editProductForm.addEventListener('submit', editProduct);
