'use strict';

var auth = localStorage.getItem('token');
var urlParams = new URLSearchParams(window.location.search);
var categoryId = Number(urlParams.toString().replace('=', ''));
fetch('http://localhost:3000/api/v1/categories/' + categoryId, {
  headers: {
    Authorization: 'Bearer ' + auth
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {
  var output = '';
  output += '\n   <li>' + data.category.category_name + '</li>\n      ';

  document.querySelector('.categories-list').innerHTML = output;
});