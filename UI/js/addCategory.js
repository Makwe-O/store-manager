const categoryName = document.getElementById('categoryName');
const errorId = document.getElementById('errorId');
const addCategoryForm = document.getElementById('addCategoryForm');

function addCategory(e) {
  e.preventDefault();
  fetch('https://store-manager-store.herokuapp.com/api/v1/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      category_name: categoryName.value,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success === true) {
        window.location.href = 'categories-admin.html';
      }
      errorId.innerHTML = `${data.message}`;
      errorId.style.display = 'block';
      setTimeout(() => {
        errorId.style.display = 'none';
      }, 3000);
    })
    .catch(error => console.log(error.message));
}


addCategoryForm.addEventListener('submit', addCategory);
