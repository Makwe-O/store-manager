const auth = localStorage.getItem('token');
const urlParams = new URLSearchParams(window.location.search);
const productId = Number(urlParams.toString().replace('=', ''));
fetch(`https://store-manager-store.herokuapp.com/api/v1/products/${productId}`, {
  headers: {
    Authorization: `Bearer ${auth}`,
  },
})
  .then(response => response.json())
  .then((data) => {
    console.log(data.product);
    let output = '';
    if (decoded.role === 'Attendant') {
      output += `<div class="card">
              <img src="${data.product.product_image}" alt="camera"/>
              <div class="card__body ">
                  <h2 class="card__title">${data.product.product_name}</h2>
                  <div class="card__text">
                      <p><strong>Price:</strong><span class="price">${data.product.price}</span></p>
                      <p><strong>Category:</strong><span class="category"> ${data.product.category_name}</span></p>
                      <p><strong>Inventory:</strong><span class="quantity"> ${data.product.quantity}</span></p>
                      <p><strong>Minimum Inventory Quantity:</strong> ${data.product.quantity}</p>
                  </div>
                  <div  class="card-btn">
                      <a href="#" data-id="${data.product.product_id}" id="addToCart" class="btn btn__color--dark btn__border--orange add-to-cart">Add to Cart</a>
                  </div>
              </div>
          </div>
          `;
    } else {
      output += `
      <div class="single-product-page">
      <img src="${data.product.product_image}" alt="camera">
      <div>
          <h4 class="card__title">${data.product.product_name}</h4>
          <div class="card__text">
              <p><strong>Price:</strong> ${data.product.price}</p>
              <p><strong>Category:</strong> ${data.product.category_name}</p>
              <p><strong>Inventory:</strong> ${data.product.quantity}</p>
              <p><strong>Minimum Inventory Quantity:</strong> ${data.product.quantity}</p>
             
          </div>
      </div>
  </div>
        `;
    }

    document.querySelector('.card-grid').innerHTML = output;
  });
