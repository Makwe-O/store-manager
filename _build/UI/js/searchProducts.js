'use strict';

/* eslint-disable no-param-reassign */
var search = document.getElementById('search');

function searchProducts(e) {
  var a = e.target.value.toLowerCase();
  var b = document.querySelectorAll('.card__title');
  b.forEach(function (element) {
    var item = element.firstChild.textContent;
    if (item.toLowerCase().indexOf(a) !== -1) {
      element.style.display = 'flex';
      element.parentElement.parentElement.style.display = 'flex';
    } else {
      element.style.display = 'none';
      // document.querySelector('.card').style.display = 'none';
      element.parentElement.parentElement.style.display = 'none';
    }
  });
}

search.addEventListener('keyup', searchProducts);