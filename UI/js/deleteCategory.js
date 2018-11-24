const deleteCategoryForm = document.getElementById('deleteCategoryForm');

function deleteCategory(e) {
  e.preventDefault();
  fetch(`https://store-manager-store.herokuapp.com/api/v1/categories/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
