//popular movies trailer
const newReleaseDiv = document.querySelector(".newReleases");
const movieApiKey = '?api_key=c1e65505e4c6142bf89038d711a3cd97';
const popularMovieApi = 'https://api.themoviedb.org/3/movie/popular' + movieApiKey + '&language=en-US&page=1';

function showNewReleases() {
fetch(popularMovieApi + '&append_to_response=videos')
.then(function(response) {
    return response.json();
})
.then(function(response) {
    console.log(response)
    let popularResults = response.results;
    for (let i = 0; i < 5; i++) {
        let movieId = popularResults[i].id;
        fetch('http://api.themoviedb.org/3/movie/' + movieId + movieApiKey + '&append_to_response=videos&language=en-US')
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            let videoArr = response.videos.results;
            let newVideoArr = [];
            if (videoArr.length >= 1) {
                newVideoArr.push(videoArr);
                for (let i = 0; i < newVideoArr.length; i++) {
                    //create div to hold video and yaer/rating
                    let videoDiv = document.createElement("div");
                    newReleaseDiv.appendChild(videoDiv);
                    videoDiv.classList = 'column is-one-fourth';
                    let favoriteAnchor = document.createElement('a');
                    let favoriteIcon = document.createElement('i');
                    favoriteIcon.classList = 'far fa-star fa-large newStar';
                    favoriteAnchor.appendChild(favoriteIcon);
                    videoDiv.appendChild(favoriteAnchor);
                    let titleEl = document.createElement("h2");
                    titleEl.classList = 'newReleaseMovieTitle';
                    titleEl.textContent = response.title;
                    videoDiv.appendChild(titleEl);
                    let videoKey = response.videos.results[0].key;
                    let videoUrl = 'https://www.youtube.com/embed/' + videoKey;
                    let videoEl = document.createElement('iframe');
                    videoEl.style = "display: block";
                    videoEl.src = videoUrl;
                    videoDiv.appendChild(videoEl);
                    let releaseDate = response.release_date;
                    console.log(response);
                    let year = moment(releaseDate, "YYYY-MM-DD").format('YYYY');
                    let yearEl = document.createElement("p");
                    yearEl.classList = "yearEl";
                    yearEl.textContent =  year;
                    videoDiv.appendChild(yearEl);
                    let ratingEl = document.createElement("p");
                    ratingEl.textContent = "Rating: " + response.vote_average + " /10";
                    ratingEl.classList = 'popularRating';
                    videoDiv.appendChild(ratingEl);
                }
            }
        })
    }
    })
}

showNewReleases();
$(document).on('click', '.fa-star', function() {
    console.log($(this));
    $(this).removeClass("far");
    $(this).addClass("fas");
 })
