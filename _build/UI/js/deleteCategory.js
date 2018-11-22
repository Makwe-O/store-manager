'use strict';

var deleteCategoryForm = document.getElementById('deleteCategoryForm');

function deleteCategory(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/categories/' + categoryId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.success === true) {
      window.location.href = 'categories-admin.html';
    }
    errorId.innerHTML = '' + data.message;
    errorId.style.display = 'block';
    setTimeout(function () {
      errorId.style.display = 'none';
    }, 3000);
  }).catch(function (error) {
    return console.log(error.message);
  });
}

deleteCategoryForm.addEventListener('submit', deleteCategory);