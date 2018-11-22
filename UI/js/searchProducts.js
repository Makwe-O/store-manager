/* eslint-disable no-param-reassign */
const search = document.getElementById('search');


function searchProducts(e) {
  const a = e.target.value.toLowerCase();
  const b = document.querySelectorAll('.card__title');
  b.forEach((element) => {
    const item = element.firstChild.textContent;
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
