
//get html element to append all elements for the video
const newReleaseDiv = document.querySelector(".newReleases");
const movieApiKey = '?api_key=c1e65505e4c6142bf89038d711a3cd97';
const popularMovieApi = 'https://api.themoviedb.org/3/movie/popular' + movieApiKey + '&language=en-US&page=1';
//get movie search button from document
const movieSearchBtn = document.querySelector(".movieSearchBtn");

//POPULAR MOVIES TRAILER
function showNewReleases() {
    //fetch to get popular movie ids
    fetch(popularMovieApi + '&append_to_response=videos')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response)
        let popularResults = response.results;
        for (let i = 0; i < 4; i++) {
            //get movie id
            let movieId = popularResults[i].id;
            //fetch with movie id to get vidoes
            fetch('http://api.themoviedb.org/3/movie/' + movieId + movieApiKey + '&append_to_response=videos&language=en-US')
            .then(function(response) {
                return response.json()
            })
            .then(function(response) {
                let videoArr = response.videos.results;
                // defined an empty array to push elements with videos to
                let newVideoArr = [];
                // if the object had videos push to new video array
                if (videoArr.length >= 1) {
                    newVideoArr.push(videoArr);
                    // create a for loop for newvideo array
                    for (let i = 0; i < newVideoArr.length; i++) {
                        //create div to hold video and year/rating
                        let videoDiv = document.createElement("div");
                        //append to document el
                        newReleaseDiv.appendChild(videoDiv);
                        // use bulma column classes
                        videoDiv.classList = 'column';
                        // create an anchor element to hold the fav icon
                        let favoriteAnchor = document.createElement('a');
                        // create an icon element for favoriting
                        let favoriteIcon = document.createElement('i');
                        favoriteIcon.classList = 'far fa-star fa-large newStar';
                        //append the fav icon to fav anchor
                        favoriteAnchor.appendChild(favoriteIcon);
                        // append fav anchor to video div element
                        videoDiv.appendChild(favoriteAnchor);
                        // create title for video/ movie
                        let titleEl = document.createElement("h2");
                        titleEl.classList = 'newReleaseMovieTitle';
                        titleEl.textContent = response.title;
                        //append the title to the video div
                        videoDiv.appendChild(titleEl);
                        // get video key to put in the url to embed the video 
                        let videoKey = response.videos.results[0].key;
                        let videoUrl = 'https://www.youtube.com/embed/' + videoKey;
                        // create iframe element to display video
                        let videoEl = document.createElement('iframe');
                        videoEl.style = "display: block";
                        videoEl.src = videoUrl;
                        //append iframe to the div
                        videoDiv.appendChild(videoEl);
                        // get release date of movie
                        let releaseDate = response.release_date;
                        // format release date to show year
                        let year = moment(releaseDate, "YYYY-MM-DD").format('YYYY');
                        // create year element
                        let yearEl = document.createElement("p");
                        yearEl.classList = "yearEl";
                        yearEl.textContent =  year;
                        // append year element to video div
                        videoDiv.appendChild(yearEl);
                        // get movie rating and create element to hold rating
                        let ratingEl = document.createElement("p");
                        ratingEl.textContent = "Rating: " + response.vote_average + " /10";
                        ratingEl.classList = 'popularRating';
                        // append video rating to video div
                        videoDiv.appendChild(ratingEl);
                    }
                }
            })
        }
        })
    }
    
function searchMovieByTitle(title) {
    $(".posters").html("");
    let movieTitle = $('#searchMovie').val().trim();
    let movieApiUrl = 'https://api.themoviedb.org/3/search/movie' + movieApiKey + '&query=' + movieTitle;
    if (!movieTitle) {
        return;
    }
    fetch(movieApiUrl) 
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // let resultArr = [];
        let resultArr = response.results;
        console.log(resultArr)
        for (let i = 0; i < resultArr.length; i++) {
            let movieId = response.results[i].id;
            fetch('https://api.themoviedb.org/3/movie/' + movieId + movieApiKey)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                console.log(response)
                //document element that will hold the movie posters
                let moviesEl = document.querySelector(".posters")
                //create a poster div for each movie
                let moviePoster = document.createElement("div");
                moviePoster.classList = 'column is-one-fifth moviePosterDiv';
                //create the image element
                let posterImg = document.createElement("img");
                posterImg.src = 'https://image.tmdb.org/t/p/original' + response.poster_path;
                //append movie poster div to document element
                moviesEl.appendChild(moviePoster);
                // append image element to poster div
                moviePoster.appendChild(posterImg);
                // create a clickable favorite star element
                let favoriteAnchor = document.createElement("a");
                // create the star icon element
                let favoriteIcon = document.createElement("i");
                favoriteIcon.classList = 'far fa-star fa-large star';
                // append the anchor to the movie poster
                moviePoster.appendChild(favoriteAnchor);
                // append the icon to the anchor 
                favoriteAnchor.appendChild(favoriteIcon);
                // get release date
                let releaseDate = response.release_date;
                // format the date into just the release year
                let year = moment(releaseDate, "YYYY-MM-DD").format('YYYY');
                //create span to hold the release year
                let yearEl = document.createElement("span");
                yearEl.textContent = "Released: " + year;
                //append the year to the movie poster div
                moviePoster.appendChild(yearEl);
                // create movie rating span
                let movieRating = document.createElement('span');
                // add "rating" class so that there is space between the 2 spans
                movieRating.classList = 'rating';
                movieRating.textContent = response.vote_average + ' /10';
                //append movie rating to the poster div
                moviePoster.appendChild(movieRating);
            })
        }
    })
}

// call showNewRelease function to run on page load
showNewReleases();
// when the favorite star is clicked on it will change to a solid star
$(document).on('click', '.fa-star', function() {
    console.log($(this));
    $(this).removeClass("far");
    $(this).addClass("fas");
 })
