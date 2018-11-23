const authModal = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/products/', {
  headers: {
    Authorization: `Bearer ${authModal}`,
  },
})
  .then(response => response.json())
  .then((data) => {
    let output = '';
    output += '<option value="" disabled selected>Select Product</option>';
    data.products.forEach((product) => {
      output += `<option value="${product.product_id}">${product.product_name}</li>
    `;
    });
    document.querySelector('.product-list').innerHTML = output;
  });
