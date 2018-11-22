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
    output += '<option value="" disabled selected>Select Category</option>';
    data.categories.forEach((category) => {
      output += `<option value="${category.category_id}">${category.category_name}</li>
    `;
      counter += 1;
    });
    document.querySelector('.category-list').innerHTML = output;
  });
