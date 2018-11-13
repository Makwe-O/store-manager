'use strict';

var email = document.getElementById('email');
var password = document.getElementById('password');
var loginForm = document.getElementById('loginForm');
var errorId = document.getElementById('errorId');

function login(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.success === false) {
      errorId.style.display = 'block';
      setTimeout(function () {
        errorId.style.display = 'none';
      }, 3000);
    }
    localStorage.setItem('token', data.token);
    var decoded = jwt_decode(data.token);
    window.location = decoded.role === 'Admin' ? 'dashboard-admin.html' : 'sales-record.html';
  }).catch(function (error) {
    return console.log(error.message);
  });
}
loginForm.addEventListener('submit', login);