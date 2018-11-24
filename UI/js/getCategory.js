const auth = localStorage.getItem('token');
const urlParams = new URLSearchParams(window.location.search);
const categoryId = Number(urlParams.toString().replace('=', ''));
fetch(`https://store-manager-store.herokuapp.com/api/v1/categories/${categoryId}`, {
  headers: {
    Authorization: `Bearer ${auth}`,
  },
})
  .then(response => response.json())
  .then((data) => {
    let output = '';
    output += `
   <li>${data.category.category_name}</li>
      `;

    document.querySelector('.categories-list').innerHTML = output;
  });
