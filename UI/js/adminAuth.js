const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}
const decoded = jwt_decode(token);
if (decoded.role !== 'Admin') {
  window.location.href = 'sales-record.html';
}
