const email = document.getElementById('email');
const password = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
const errorId = document.getElementById('errorId');
loginForm.addEventListener('submit', (e) => {
  fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
        errorId.style.display = 'block';
        setTimeout(() => {
          errorId.style.display = 'none';
        }, 3000);
      }
      localStorage.setItem('token', data.token);
      const decoded = jwt_decode(data.token);
      window.location = decoded.role === 'Admin' ? 'dashboard-admin.html' : 'sales-record.html';
    })
    .catch(e => console.log(e.message));
  e.preventDefault();
});
