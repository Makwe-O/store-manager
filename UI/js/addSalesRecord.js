const product = document.getElementById('product');
const amount = document.getElementById('amount');
const errorId = document.getElementById('errorId');
const addSalesRecordForm = document.getElementById('addSalesRecordForm');

function addSalesRecord(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: decoded.user_id,
      product_id: Number(product.value),
      sales_amount: Number(amount.value),
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success === true) {
        window.location.href = 'sales-record.html';
      }
      errorId.innerHTML = `${data.message}`;
      errorId.style.display = 'block';
      setTimeout(() => {
        errorId.style.display = 'none';
      }, 3000);
    })
    .catch(error => console.log(error.message));
}

addSalesRecordForm.addEventListener('submit', addSalesRecord);
