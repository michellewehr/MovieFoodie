
        const snackResults = document.querySelector('.searchedSnacks');

        const modal = document.querySelector('#catch-modal');
const modalText = document.querySelector('.modal-text');
const closeModalBtn = document.querySelector('#closeBtn');

        function getSnack() {
            snackResults.textContent = "";
            const apiKey = '&apiKey=4cc601232d294d0dadc4bcb5f2438b4d';
            let food = $('#searchSnack').val().trim();
            const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?query=' + food + apiKey + '&addRecipeInformation=true';
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
                    results.className = 'food-tiles';
                    let snackAnchor = document.createElement('a');
                    snackAnchor.href = resultsArr[i].sourceUrl;
                    snackAnchor.target = '_blank';
                    let snackImg = document.createElement('img');
                    snackImg.src = resultsArr[i].image;
                    let snackTitle = document.createElement('h2');
                    snackTitle.textContent = resultsArr[i].title;
                    results.appendChild(snackTitle);
                    snackAnchor.appendChild(snackImg);
                    results.appendChild(snackAnchor);
                    snackResults.appendChild(results);
            }
        })
        .catch(function (error) {
            modalText.textContent = "Oh no! We cannot access recipe images for 1 or more of the searchd results.";
            modal.style.display = 'block';
        })
        }
  

// search food on enter
$('#foodSearch').submit(function(event) {
    event.preventDefault();
    getSnack();
})

//modal close
$(document).on('click', closeModalBtn, function() {
    modal.style.display = 'none';
})