'use strict';

var logout = document.getElementById('logout');
logout.addEventListener('click', function () {
  console.log("dkdv");
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});