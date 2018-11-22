const auth = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/categories/', {
  headers: {
    Authorization: `Bearer ${auth}`,
  },
})
  .then(response => response.json())
  .then((data) => {
    let output = '';
    data.categories.forEach((category) => {
      output += `<li><a href="category-admin.html?${category.category_id}" class="btn--color__orange">${category.category_name}</a></li>
    `;
    });
    document.querySelector('.categories-list').innerHTML = output;
  });
