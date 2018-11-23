'use strict';

var token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}
var decoded = jwt_decode(token);
if (decoded.role !== 'Attendant') {
  window.location.href = 'sales-attendants-admin.html';
}

document.querySelector('.dashboard-header p').innerHTML = decoded.name;