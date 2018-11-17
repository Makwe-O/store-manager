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
      output += `<li>${category.category_name}</li>
    `;
    });
    document.querySelector('.categories-list').innerHTML = output;
  });
