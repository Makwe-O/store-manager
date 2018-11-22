const categoryName = document.getElementById('categoryName');
const errorId = document.getElementById('errorId');
const editCategoryForm = document.getElementById('editCategoryForm');

function editCategory(e) {
  e.preventDefault();
  fetch(`http://localhost:3000/api/v1/categories/${categoryId}`, {
    method: 'PUT',
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
      console.log(data);
      if (data.success === true) {
        window.location.href = `categories-admin.html?${categoryId}`;
      }
      errorId.innerHTML = `${data.message}`;
      errorId.style.display = 'block';
      setTimeout(() => {
        errorId.style.display = 'none';
      }, 3000);
    })
    .catch(error => console.log(error.message));
}

editCategoryForm.addEventListener('submit', editCategory);
