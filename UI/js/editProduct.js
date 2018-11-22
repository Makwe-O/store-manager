const name = document.getElementById('name');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const image = document.getElementById('image');
const category = document.getElementById('category');
const errorId = document.getElementById('errorId');
const editProductForm = document.getElementById('editProductForm');

function editProduct(e) {
  e.preventDefault();
  fetch(`http://localhost:3000/api/v1/products/${productId}`, {
    method: 'PUT',
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
      console.log(data);
      if (data.success === true) {
        window.location.href = `product-admin.html?${productId}`;
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
