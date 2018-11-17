const authModal = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/categories/', {
  headers: {
    Authorization: `Bearer ${authModal}`,
  },
})
  .then(response => response.json())
  .then((data) => {
    let output = '';
    let counter = 1;
    data.categories.forEach((category) => {
      output += `<option value="${counter}">${category.category_name}</li>
    `;
      counter += 1;
    });
    document.querySelector('.category-list').innerHTML = output;
  });
