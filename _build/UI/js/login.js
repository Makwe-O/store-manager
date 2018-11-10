'use strict';

var email = document.getElementById('email');
var password = document.getElementById('password');
var loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (e) {
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
      // flash message here
      return 'Error';
    }
    localStorage.setItem('token', data.token);
    var decoded = jwt_decode(data.token);
    window.location = decoded.role === 'Admin' ? 'dashboard-admin.html' : 'products.html';
  }).catch(function (e) {
    return console.log(e.message);
  });
  e.preventDefault();
});