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