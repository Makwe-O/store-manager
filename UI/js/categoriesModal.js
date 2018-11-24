const authModal = localStorage.getItem('token');
fetch('https://store-manager-store.herokuapp.com/api/v1/categories/', {
  headers: {
    Authorization: `Bearer ${authModal}`,
  },
})
  .then(response => response.json())
  .then((data) => {
    let output = '';
    output += '<option value="" disabled selected>Select Category</option>';
    data.categories.forEach((category) => {
      output += `<option value="${category.category_id}">${category.category_name}</li>
    `;
    });
    document.querySelector('.category-list').innerHTML = output;
  });
