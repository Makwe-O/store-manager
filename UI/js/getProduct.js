const auth = localStorage.getItem('token');
let product_id;
fetch(`http://localhost:3000/api/v1/products/${product_id}`, {
  headers: {
    Authorization: `Bearer ${auth}`,
  },
})
  .then(response => response.json())
  .then((data) => {
    let output = '';
    console.log(data);
    // const {
    //   product_image, product_name, price, category_name, quantity,
    // } = data.products;
    data.products.forEach((product) => {
      output += `
      <div class="single-product-page">
      <img src="${product.product_image}" alt="camera">
      <div>
          <h4 class="card__title">${product.product_name}</h4>
          <div class="card__text">
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Category:</strong> ${product.category_name}</p>
              <p><strong>Inventory:</strong> ${product.quantity}</p>
              <p><strong>Minimum Inventory Quantity:</strong> ${product.quantity}</p>
             
          </div>
          <a href="#" id="button" class="btn btn__color--dark btn__border--orange">Edit</a>
          <a href="#" class="btn btn__color--dark btn__border--orange">Delete</a>
          
      </div>
  </div>
        `;
    });
    document.querySelector('.single-product-page').innerHTML = output;
  });
