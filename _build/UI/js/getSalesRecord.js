'use strict';

var auth = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/sales/', {
  headers: {
    Authorization: 'Bearer ' + auth
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {

  var output = '';
  // Check is there are products in the store
  if (data.sales_record.length === 0) {
    output += '<h2 class="text-center">There are currently no sales record</h2>\n      ';
  }

  if (decoded.role === 'Attendant') {
    data.sales_record.forEach(function (sale_record) {
      // Filter sales record so only sale record from the current attendant is displayed
      if (sale_record.name === decoded.name) {
        output += '\n           <tr>\n            <td>' + sale_record.sales_record_id + '</td>\n            <td>' + sale_record.product_name + '</td>\n            <td>' + sale_record.price + '</td>\n            <td>' + sale_record.sales_amount + '</td>\n            <td>' + sale_record.price * sale_record.sale_amount + '</td>\n            <td>' + sale_record.date + '</td>\n           ';
      }
    });
  } else {
    data.sales_record.forEach(function (sale_record) {
      output += '\n               <tr>\n                <td>' + sale_record.sales_record_id + '</td>\n                <td>' + sale_record.name + '</td>\n                <td>' + sale_record.product_name + '</td>\n                <td>' + sale_record.price + '</td>\n                <td>' + sale_record.sales_amount + '</td>\n                <td>' + sale_record.price * sale_record.sale_amount + '</td>\n                <td>' + sale_record.date + '</td>\n               ';
    });
  }
  document.querySelector('tbody').innerHTML = output;
});