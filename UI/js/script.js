document.querySelector('#button').addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';
});


document.querySelector('#delete-btn').addEventListener('click', () => {
  document.querySelector('.deleteModal').style.display = 'flex';
});

document.querySelector('.deleteClose').addEventListener('click', () => {
  document.querySelector('.deleteModal').style.display = 'none';
});


// document.querySelector('#toggle').addEventListener('click', function(){
//     document.querySelector('.dashboard-nav').classList.toggle('active-nav');
//     console.log('hello');
// });
function toggleSidebar() {
  document.querySelector('.dashboard-nav').classList.toggle('active-nav');
}
