'use strict';

var product = document.getElementById('product');
var amount = document.getElementById('amount');
var errorId = document.getElementById('errorId');
var addSalesRecordForm = document.getElementById('addSalesRecordForm');

function addSalesRecord(e) {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      user_id: decoded.user_id,
      product_id: Number(product.value),
      sales_amount: Number(amount.value)
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.success === true) {
      window.location.href = 'sales-record.html';
    }
    errorId.innerHTML = '' + data.message;
    errorId.style.display = 'block';
    setTimeout(function () {
      errorId.style.display = 'none';
    }, 3000);
  }).catch(function (error) {
    return console.log(error.message);
  });
}

addSalesRecordForm.addEventListener('submit', addSalesRecord);