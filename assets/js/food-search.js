
        const snackResults = document.querySelector('.searchedSnacks');

        function getSnack() {
            snackResults.textContent = "";
            const apiKey = '&apiKey=4cc601232d294d0dadc4bcb5f2438b4d';
            let food = $('#searchSnack').val().trim();
            const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?query=' + food + apiKey;
            // const apiUrl = 'https://api.spoonacular.com/food/ingredients/search?query=' + food + apiKey;
            fetch(apiUrl)
            .then(response => {
                return response.json();
                })
            .then(function(response){
                console.log(response.results)
                let resultsArr = response.results;
                    for (let i = 0; i < 4; i++) {
                    let results = document.createElement('div');
                    // let snackAnchor = document.createElement('a');
                    let snackImg = document.createElement('img');
                    snackImg.src = resultsArr[i].image;
                    let snackTitle = document.createElement('h2');
                    snackTitle.textContent = resultsArr[i].title;
                    results.appendChild(snackTitle);
                    results.appendChild(snackImg);
                    snackResults.appendChild(results);
            }
                // for(let i = 0; i < 5; i++) {
                //     let snackId = resultsArr[i].id;
                //     console.log(snackId)
                //     getRecipeInfo(snackId);
        
                // }
        
        })
        }
        
        // function getRecipeInfo(id) {
        //     let recipeUrl = 'https://api.spoonacular.com/recipes/' + id + '/information' + '?apiKey=4cc601232d294d0dadc4bcb5f2438b4d';
        //     fetch(recipeUrl)
        //     .then(response => {
        //         return response.json();
        //         })
        //     .then(function(response) {
        //         console.log(response);
        //         let results = document.createElement('div');
        //         results.classList = 'column';
        //         let snackAnchor = document.createElement('a');
        //         snackAnchor.href = response.sourceUrl;
        //         snackAnchor.target = '_blank';
        //         let snackImg = document.createElement('img');
        //         snackImg.src = response.image;
        //         snackAnchor.appendChild(snackImg);
        //         results.appendChild(snackAnchor);
        //         snackResults.appendChild(results);
        //     })
        // }
        
        //generate feature photo
        
        // function showFeaturedSnack() {
        //     let featuredDiv = document.createElement('div');
        //     featuredDiv.classList = 'featuredDiv';
        //     let featureImg = document.createElement('img');
        //     featureImg.src = 'https://spoonacular.com/productImages/caramel-popcorn.jpg'
        //     featuredDiv.appendChild(featureImg);
        //     featuredSnack.appendChild(featuredDiv);
        // }
        // showFeaturedSnack();
        
        
        // https://spoonacular.com/productImages/{ID}-{SIZE}.{TYPE}, where {SIZE} is one of the following:
        