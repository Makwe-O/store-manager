'use strict';

var logout = document.getElementById('logout');
logout.addEventListener('click', function () {

  localStorage.removeItem('token');
  window.location.href = 'login.html';
});