/* eslint-disable no-param-reassign */
const search = document.getElementById('search');
function searchAttendant(e) {
  const a = e.target.value.toLowerCase();
  const b = document.querySelectorAll('.filter-name');
  b.forEach((element) => {
    const item = element.firstChild.textContent;
    console.log(item);
    if (item.toLowerCase().indexOf(a) !== -1) {
      element.style.display = 'block';
      element.parentElement.style.display = 'table-row';
    } else {
      element.style.display = 'none';
      // document.querySelector('.card').style.display = 'none';
      element.parentElement.style.display = 'none';
    }
  });
}


search.addEventListener('keyup', searchAttendant);
