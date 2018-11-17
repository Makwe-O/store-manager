const auth = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/products/', {
  headers: {
    Authorization: `Bearer ${auth}`,
  },
})
  .then(response => response.json())
  .then((data) => {
    let output = '';
    // const {
    //   product_image, product_name, price, category_name, quantity,
    // } = data.products;
    data.products.forEach((product) => {
      output += `<div class="card">
            <img src="${product.product_image}" alt="camera"/>
            <div class="card__body ">
                <h4 class="card__title">${product.product_name}</h4>
                <div class="card__text">
                    <p><strong>Price:</strong>${product.price}</p>
                    <p><strong>Category:</strong> ${product.category_name}</p>
                    <p><strong>Inventory:</strong> ${product.quantity}</p>
                    <p><strong>Minimum Inventory Quantity:</strong> ${product.quantity}</p>
            </div>
            <div  class="card-btn">
                <a href="#" id="view" class="btn btn__color--dark btn__border--orange">View</a>
            </div>
        </div>
        </div>
        `;
    });
    document.querySelector('.card-grid').innerHTML = output;

    const view = document.getElementById('view');
    view.addEventListener('click', () => {
      window.location.href = 'product-admin.html';
    });
  });
