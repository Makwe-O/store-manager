const auth = localStorage.getItem('token');
fetch('https://store-manager-store.herokuapp.com/api/v1/products/', {
  headers: {
    Authorization: `Bearer ${auth}`,
  },
})
  .then(response => response.json())
  .then((data) => {
    let output = '';
    // Check is there are products in the store
    if (data.products.length === 0) {
      output += `<h2 class="text-center">There are currently no products</h2>
        `;
    }

    if (decoded.role === 'Attendant') {
      data.products.forEach((product) => {
        output += `<div class="card">
              <img src="${product.product_image}" alt="camera"/>
              <div class="card__body ">
                  <h2 class="card__title">${product.product_name}</h2>
                  <div class="card__text">
                      <p><strong>Price:</strong><span class="price">${product.price}</span></p>
                      <p><strong>Category:</strong><span class="category"> ${product.category_name}</span></p>
                      <p><strong>Inventory:</strong><span class="quantity"> ${product.quantity}</span></p>
                      <p><strong>Minimum Inventory Quantity:</strong> ${product.quantity}</p>
                  </div>
                  <div  class="card-btn">
                      <a href="product.html?${product.product_id}" id="view" class="btn btn__color--dark btn__border--orange">View</a>
                      <a href="#" data-id="${product.product_id}" id="addToCart" class="btn btn__color--dark btn__border--orange add-to-cart">Add to Cart</a>
                  </div>
              </div>
          </div>
          `;
      });
    } else {
      data.products.forEach((product) => {
        output += `<div class="card">
              <img src="${product.product_image}" alt="camera"/>
              <div class="card__body ">
                  <h2 class="card__title">${product.product_name}</h2>
                  <div class="card__text">
                      <p><strong>Price:</strong>${product.price}</p>
                      <p><strong>Category:</strong> ${product.category_name}</p>
                      <p><strong>Inventory:</strong> ${product.quantity}</p>
                      <p><strong>Minimum Inventory Quantity:</strong> ${product.quantity}</p>
                  </div>
                  <div  class="card-btn">
                      <a href="product-admin.html?${product.product_id}" id="view" class="btn btn__color--dark btn__border--orange">View</a>
                     
                  </div>
              </div>
          </div>
          `;
      });
    }
    document.querySelector('.card-grid').innerHTML = output;
  });
