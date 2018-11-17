const categoryName = document.getElementById('categoryName');
const errorId = document.getElementById('errorId');
const deleteCategoryForm = document.getElementById('deleteCategoryForm');

function deleteCategory(e) {
  e.preventDefault();
  fetch(`http://localhost:3000/api/v1/categories/${id}`, {
    method: 'DELETE',
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

deleteCategoryForm.addEventListener('submit', deleteCategory);

