const auth = localStorage.getItem('token');
fetch('https://store-manager-store.herokuapp.com/api/v1/sales/', {
  headers: {
    Authorization: `Bearer ${auth}`,
  },
})
  .then(response => response.json())
  .then((data) => {  
    let output = '';
    // Check is there are products in the store
    if (data.sales_record.length === 0) {
      output += `<h2 class="text-center">There are currently no sales record</h2>
      `;
    }

    if (decoded.role === 'Attendant') {
      data.sales_record.forEach((sale_record) => {
        // Filter sales record so only sale record from the current attendant is displayed
        if (sale_record.name === decoded.name) {
          output += `
           <tr>
            <td>${sale_record.sales_record_id}</td>
            <td>${sale_record.product_name}</td>
            <td>${sale_record.price}</td>
            <td>${sale_record.sales_amount}</td>
            <td>${sale_record.price * sale_record.sale_amount}</td>
            <td>${sale_record.date}</td>
           `;
        }
      });
    } else {
      data.sales_record.forEach((sale_record) => {
        output += `
               <tr>
                <td>${sale_record.sales_record_id}</td>
                <td class="filter-name">${sale_record.name}</td>
                <td>${sale_record.product_name}</td>
                <td>${sale_record.price}</td>
                <td>${sale_record.sales_amount}</td>
                <td>${sale_record.price * sale_record.sale_amount}</td>
                <td>${sale_record.date}</td>
               `;
      });
    }
    document.querySelector('tbody').innerHTML = output;
  });
