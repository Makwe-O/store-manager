'use strict';

var auth = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/categories/', {
  headers: {
    Authorization: 'Bearer ' + auth
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {
  var output = '';
  data.categories.forEach(function (category) {
    output += '<li><a href="category-admin.html?' + category.category_id + '" class="btn--color__orange">' + category.category_name + '</a></li>\n    ';
  });
  document.querySelector('.categories-list').innerHTML = output;
});