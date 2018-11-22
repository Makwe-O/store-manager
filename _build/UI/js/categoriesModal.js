'use strict';

var authModal = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/categories/', {
  headers: {
    Authorization: 'Bearer ' + authModal
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {
  var output = '';
  var counter = 1;
  output += '<option value="" disabled selected>Select Category</option>';
  data.categories.forEach(function (category) {
    output += '<option value="' + category.category_id + '">' + category.category_name + '</li>\n    ';
    counter += 1;
  });
  document.querySelector('.category-list').innerHTML = output;
});