'use strict';

var token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}
var decoded = jwt_decode(token);
if (decoded.role !== 'Admin') {
  window.location.href = 'sales-record.html';
}