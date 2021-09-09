           
//nav bar hamburger menu functionality 
const burgerIcon = document.querySelector('.burger');
const navbarMenu = document.querySelector('#nav-links');
//attach event listener when click burger icon to toggler is-active class
burgerIcon.addEventListener('click', function() {
    navbarMenu.classList.toggle('is-active');
})
//get html element to append all elements for the video
const apiKey = ‘&apiKey=4cc601232d294d0dadc4bcb5f2438b4d’;
            let food = ‘chips’;
            const apiUrl = ‘https://api.spoonacular.com/food/ingredients/search?query=banana&apiKey=4cc601232d294d0dadc4bcb5f2438b4d’;
            function getSnack() {
                fetch(‘https://api.spoonacular.com/food/ingredients/search?query=banana&apiKey=4cc601232d294d0dadc4bcb5f2438b4d’)
                .then(response => {
                    return response.json();
                    })
                .then(function(response){
                    console.log(response)
                })
            }
            getSnack();