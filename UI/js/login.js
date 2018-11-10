const email = document.getElementById('email');
const password = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
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
        // flash message here
        // console.log('wrong');
      }
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard-admin.html';
    });
  e.preventDefault();
});


// const logout = document.getElementById('logout');
// // logout.addEventListener('click', () => {
// // console.log("dkdv")
// // //   localStorage.removeItem('token');
// // //   window.location.href = 'login.html';
// // });
// console.log(logout)
