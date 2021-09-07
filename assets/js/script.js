
//get html element to append all elements for the video
const newReleaseDiv = document.querySelector(".newReleases");
const movieApiKey = '?api_key=c1e65505e4c6142bf89038d711a3cd97';
const popularMovieApi = 'https://api.themoviedb.org/3/movie/popular' + movieApiKey + '&language=en-US&page=1';
const discoverMovieApi = 'https://api.themoviedb.org/3/trending/movie/day' + movieApiKey + '&language=en-US&sort_by=popularity.desc';
//get movie search button from document
const movieSearchBtn = document.querySelector(".movieSearchBtn");

//nav bar hamburger menu functionality 
const burgerIcon = document.querySelector('.burger');
const navbarMenu = document.querySelector('#nav-links');
//attach event listener when click burger icon to toggler is-active class
burgerIcon.addEventListener('click', function() {
    navbarMenu.classList.toggle('is-active');
})


//POPULAR MOVIES TRAILER
function showNewReleases() {
    //fetch to get popular movie ids
    fetch(popularMovieApi + '&append_to_response=videos')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // console.log(response)
        let popularResults = response.results;
        for (let i = 0; i < 4; i++) {
            //get movie id
            let movieId = popularResults[i].id;
            //fetch with movie id to get vidoes
            fetch('https://api.themoviedb.org/3/movie/' + movieId + movieApiKey + '&append_to_response=videos&language=en-US')
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
        .catch(function(error) {
            alert("Oops! Something went wrong.")
        })
    }
function searchMovieByTitle(title) {
    //make heading for section
    $(".searchResultsHeading").text('Search Results: ');
    // clear the div so it clears every new search
    $(".posters").html(" ");
    //brings us to the section of the page that shows movies
    window.location.href = "#searchedMovies";
    // get user search value
    let movieTitle = $('#searchMovie').val().trim();
    // get movie api url
    let movieApiUrl = 'https://api.themoviedb.org/3/search/movie' + movieApiKey + '&query=' + movieTitle;
    // if nothing was entered, return out of function
    if (!movieTitle) {
        return;
    }
    // fetch movie search API
    fetch(movieApiUrl) 
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // let resultArr = [];
        let resultArr = response.results;
        // console.log(resultArr)
        for (let i = 0; i < resultArr.length; i++) {
            let movieId = response.results[i].id;
            //use movieId to run streamingOptions function 
            // streamingOptions(movieId);
            fetch('https://api.themoviedb.org/3/movie/' + movieId + movieApiKey)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                // console.log(response)
                //document element that will hold the movie posters
                let moviesEl = document.querySelector(".posters")
                //create a poster div for each movie
                let moviePoster = document.createElement("div");
                moviePoster.classList = 'column is-one-fifth moviePosterDiv';
                moviePoster.id = movieId;
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
    .catch(function(error) {
        alert("Oops something went wrong!");
    })
}


// call showNewRelease function to run on page load
function carouselFetch() {
    //fetch discover movie ids
    fetch(discoverMovieApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // calls the carousel display function and passes the response results object
        carouselDisplay(response.results);
    })
    
}

function carouselDisplay (results) {
    // selects the div element that will hold the carousel
    let carouselEl = document.querySelector("#carousel-hero");

    // iterates over the length of the results and adds element
    for (let i = 0; i < results.length; i++) {

        // create all the elements
        let carouselDivEl = document.createElement('div');
        let posterDivEl = document.createElement('div');
        let titleEl = document.createElement('h2');
        let imgEl = document.createElement('img');
        let ratingYearDiv = document.createElement('div');
        let yearEl = document.createElement('p');
        let ratingEl = document.createElement('p');

        // parse the release date
        let releaseDate = results[i].release_date;
        let year = moment(releaseDate, "YYYY-MM-DD").format('YYYY');

        // sets classes and text content for the elements
        carouselDivEl.className = 'item-' + (i+1);
        posterDivEl.className = 'carousel-poster'
        titleEl.textContent = results[i].title;
        imgEl.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + results[i].poster_path);
        ratingYearDiv.className = 'poster-footer'
        yearEl.className = 'carousel-year';
        yearEl.textContent = year;
        ratingEl.className = 'carousel-rating';
        ratingEl.textContent = "Rating: " + results[i].vote_average + "/10";

        // appends the elements to the carousel element
        carouselDivEl.appendChild(titleEl);
        posterDivEl.appendChild(imgEl);
        ratingYearDiv.appendChild(yearEl);
        ratingYearDiv.appendChild(ratingEl);
        posterDivEl.appendChild(ratingYearDiv);
        carouselDivEl.appendChild(posterDivEl);
        carouselEl.appendChild(carouselDivEl);        
    }

    // starts the carousel
    carouselStart();

}

// carousel function
function carouselStart () {
    bulmaCarousel.attach('#carousel-hero', {
        slidesToScroll: 1,
        slidesToShow: 1,
        infinite: true,
    });
};


// call showNewRelease and carouselFetch function to run on page load
showNewReleases();
carouselFetch();
// when the favorite star is clicked on it will change to a solid star
$(document).on('click', '.fa-star', function() {
    console.log($(this));
    $(this).removeClass("far");
    $(this).addClass("fas");
 })


//when click on the movie poster go to site that shows streaming options
$(document).on('click', '.moviePosterDiv', function() {
    let movieId = $(this)[0].id;
    getStreamingOptions(movieId);
})

//get streaming/ where to watch function
function getStreamingOptions(id) {
    const viewUrl = 'https://api.themoviedb.org/3/movie/' + id + '/watch/providers' + movieApiKey + '&watch_region=us&language=en-US';
     //fetch the view Url
     fetch(viewUrl) 
     .then(function(response) {
         return response.json()
     })
     .then(function(response){
        //  console.log(response.results.US);
         const streamingOption = response.results.US.link;
         window.open(streamingOption, '_blank');
     })
     .catch(function(error) {
         alert("We couldn't find watch options for your movie.")
     })
}

