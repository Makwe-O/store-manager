'use strict';

var name = document.getElementById('name');
var email = document.getElementById('email');
var password = document.getElementById('password');
var role = document.getElementById('role');
var errorId = document.getElementById('errorId');
var addSalesAttendantForm = document.getElementById('addSalesAttendantForm');

function addSalesAttendant(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      role: role.value,
      password: password.value
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.success === true) {
      window.location.href = 'sales-attendants.html';
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

addSalesAttendantForm.addEventListener('submit', addSalesAttendant);