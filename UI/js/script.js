document.getElementById('button').addEventListener('click', function(){
    document.querySelector('.modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function(){
    document.querySelector('.modal').style.display = 'none';
});


<<<<<<< HEAD
=======


document.querySelector('#delete-btn').addEventListener('click', function(){
    document.querySelector('.deleteModal').style.display = 'flex';
});

document.querySelector('.deleteClose').addEventListener('click', function(){
    document.querySelector('.deleteModal').style.display = 'none';
});



// document.querySelector('#toggle').addEventListener('click', function(){
//     document.querySelector('.dashboard-nav').classList.toggle('active-nav');
//     console.log('hello');
// });
function toggleSidebar(){
    document.querySelector('.dashboard-nav').classList.toggle('active-nav');
}
>>>>>>> ch-implement-lfa-frontend-#161798182
