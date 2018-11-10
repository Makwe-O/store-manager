const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
} else {
  const decoded = jwt_decode(token);
  window.location = decoded.role === 'Admin' ? 'dashboard-admin.html' : 'sales-record.html';
}
