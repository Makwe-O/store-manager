'use strict';

var categoryName = document.getElementById('categoryName');
var errorId = document.getElementById('errorId');
var editCategoryForm = document.getElementById('editCategoryForm');

function editCategory(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/categories/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      category_name: categoryName.value
    })
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

editCategoryForm.addEventListener('submit', editCategory);