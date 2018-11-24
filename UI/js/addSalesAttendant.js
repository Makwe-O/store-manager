const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const role = document.getElementById('role');
const errorId = document.getElementById('errorId');
const addSalesAttendantForm = document.getElementById('addSalesAttendantForm');

function addSalesAttendant(e) {
  e.preventDefault();
  fetch('https://store-manager-store.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      role: role.value,
      password: password.value,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success === true) {
        window.location.href = 'sales-attendants.html';
      }
      errorId.innerHTML = `${data.message}`;
      errorId.style.display = 'block';
      setTimeout(() => {
        errorId.style.display = 'none';
      }, 3000);
    })
    .catch(error => console.log(error.message));
}

addSalesAttendantForm.addEventListener('submit', addSalesAttendant);
