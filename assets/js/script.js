//nav bar hamburger menu functionality 
const burgerIcon = document.querySelector('.burger');
const navbarMenu = document.querySelector('#nav-links');
//attach event listener when click burger icon to toggler is-active class
burgerIcon.addEventListener('click', function () {
    navbarMenu.classList.toggle('is-active');
})
//get html element to append all elements for the video
const newReleaseDiv = document.querySelector(".newReleases");
const movieApiKey = '?api_key=c1e65505e4c6142bf89038d711a3cd97';
const popularMovieApi = 'https://api.themoviedb.org/3/movie/popular' + movieApiKey + '&language=en-US&page=1';
const discoverMovieApi = 'https://api.themoviedb.org/3/trending/movie/day' + movieApiKey + '&language=en-US&sort_by=popularity.desc';
//get movie search button from document
const movieSearchBtn = document.querySelector(".movieSearchBtn");
// modal 
const modal = document.querySelector('#catch-modal');
const modalText = document.querySelector('.modal-text');
const closeModalBtn = document.querySelector('#closeBtn');

//POPULAR MOVIES TRAILER
function showNewReleases() {
    //fetch to get popular movie ids
    fetch(popularMovieApi + '&append_to_response=videos')

        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let popularResults = response.results;
            for (let i = 0; i < 4; i++) {
                //get movie id
                let movieId = popularResults[i].id;
                //fetch with movie id to get vidoes
                fetch('https://api.themoviedb.org/3/movie/' + movieId + movieApiKey + '&append_to_response=videos&language=en-US')
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (response) {
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
                                //create div to hold title and star
                                let titleStarDiv = document.createElement('div');
                                titleStarDiv.classList = 'columns'
                                videoDiv.appendChild(titleStarDiv);
                                // create an anchor element to hold the fav icon
                                let favoriteAnchor = document.createElement('a');
                                // create an icon element for favoriting
                                let favoriteIcon = document.createElement('i');
                                if (localStorage.getItem(response.title) !== null) {
                                    favoriteIcon.classList = 'fas fa-star fa-large newStar column';
                                    //if not, save to watch list
                                } else {
                                    favoriteIcon.classList = 'far fa-star fa-large newStar column';
                                }
                                favoriteIcon.setAttribute('id', response.title)
                                //append the fav icon to fav anchor
                                favoriteAnchor.appendChild(favoriteIcon);
                                // append fav anchor to video div element
                                titleStarDiv.appendChild(favoriteAnchor);
                                //append the fav icon to fav anchor
                                favoriteAnchor.appendChild(favoriteIcon);
                                // append fav anchor to video div element
                                titleStarDiv.appendChild(favoriteAnchor);
                                // create title for video/ movie
                                let titleEl = document.createElement("h2");
                                titleEl.classList = 'newReleaseMovieTitle column';
                                titleEl.textContent = response.title;
                                //append the title to the video div
                                titleStarDiv.appendChild(titleEl);
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
                                yearEl.textContent = year;
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
        .catch(function (error) {
            modalText.textContent = "Oops! Something went wrong.";
            modal.style.display = 'block';
        })
}
function searchMovieByTitle(title) {
    // add section to searched movie section to give it that styling
    //make heading for section
    $(".searchResultsHeading").text('Search Results: ');
    // clear the div so it clears every new search
    $(".posters").html(" ");
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
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // let resultArr = [];
            let resultArr = response.results;
            // console.log(resultArr)
            for (let i = 0; i < resultArr.length; i++) {
                let movieId = response.results[i].id;
                //use movieId to run streamingOptions function 
                // streamingOptions(movieId);
                fetch('https://api.themoviedb.org/3/movie/' + movieId + movieApiKey)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        if (response.poster_path) {
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
                            if (localStorage.getItem(response.title) !== null) {
                                favoriteIcon.classList = 'fas fa-star fa-large star';
                                //if not, save to watch list
                            } else {
                                favoriteIcon.classList = 'far fa-star fa-large star';
                            }
                            favoriteIcon.setAttribute('id', response.title)
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
                        }

                    })
            }
            // selects search results section and unhides if hidden
            var searchSection = document.getElementById('search-section');
            console.log(searchSection);
            if (searchSection.style.display === "none") {
                searchSection.style.display = "block";
            }
        })
        .catch(function (error) {
            modalText.textContent = 'Oops! Something went wrong!'
            modal.style.display = 'block';
        })
}


// call showNewRelease function to run on page load
function carouselFetch() {
    //fetch discover movie ids
    fetch(discoverMovieApi)

        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // calls the carousel display function and passes the response results object
            carouselDisplay(response.results);
        })
        .catch(function (error) {
            modalText.textContent = 'Oops! Something went wrong!'
            modal.style.display = 'block';
        })

}

function carouselDisplay(results) {

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
        let starEl = document.createElement('i');
        let ratingEl = document.createElement('p');
        let overviewEl = document.createElement('p');

        // parse the release date
        let releaseDate = results[i].release_date;
        let year = moment(releaseDate, "YYYY-MM-DD").format('YYYY');

        // sets classes and text content for the elements
        carouselDivEl.className = 'item-' + (i + 1);
        posterDivEl.className = 'carousel-poster'
        titleEl.textContent = results[i].title;
        imgEl.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + results[i].poster_path);
        imgEl.className = 'carousel-img';
        imgEl.id = results[i].id;
        ratingYearDiv.className = 'poster-footer'
        yearEl.className = 'carousel-year';
        yearEl.textContent = year;
        // starEl.className = 'far fa-star fa-large star star-custom';
        if (localStorage.getItem(results[i].title) !== null) {
            starEl.className = 'fas fa-star fa-large star-custom';
            //if not, save to watch list
        } else {
            starEl.className = 'far fa-star fa-large star-custom';
        }

        starEl.setAttribute('id', results[i].title);
        ratingEl.className = 'carousel-rating';
        ratingEl.textContent = "Rating: " + results[i].vote_average + "/10";
        overviewEl.className = 'overview';
        overviewEl.textContent = results[i].overview;

        // appends the elements to the carousel element
        carouselDivEl.appendChild(titleEl);
        posterDivEl.appendChild(imgEl);
        ratingYearDiv.appendChild(yearEl);
        ratingYearDiv.appendChild(starEl);
        ratingYearDiv.appendChild(ratingEl);
        ratingYearDiv.appendChild(overviewEl);
        posterDivEl.appendChild(ratingYearDiv);
        carouselDivEl.appendChild(posterDivEl);
        carouselEl.appendChild(carouselDivEl);

    }

    // starts the carousel
    carouselStart();

}

// carousel function
function carouselStart() {
    bulmaCarousel.attach('#carousel-hero', {
        slidesToScroll: 1,
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000
    });
};


// when click on the carousel poster go to site that shows streaming options
$(document).on('click', '.carousel-img', function () {
    let movieId = (this).id;
    getStreamingOptions(movieId);
})


// call showNewRelease and carouselFetch function to run on page load
showNewReleases();
carouselFetch();
// when the favorite star is clicked on it will change to a solid star
$(document).on('click', '.fa-star', function () {
    // if movie id already exists in local storage, delete it
    if (localStorage.getItem(this.id) !== null) {
        localStorage.removeItem(this.id);
        saveToWatchList("");
        $(this).addClass("far");
        $(this).removeClass("fas");
        //if not, save to watch list
    } else {
        saveToWatchList(this.id)
        $(this).removeClass("far");
        $(this).addClass("fas");
    }

});


$('.saveBtn').on('click', function () {

    $('input[type="text"]').each(function () {
        var id = $(this).attr('id');
        var value = $(this).val();
        localStorage.setItem(id, value);

    });
});


function saveToWatchList(saveMovie) {
    // save movie title value when star is clicked to watch list
    //the movie title thats clicked

    //save title to localStorage
    if ((saveMovie !== "") && (saveMovie !== undefined)) {
        localStorage.setItem(saveMovie, "MovieFoodie")
    }
    // get one movie title
    var watchListStorage = window.localStorage;
    let j = 0;
    // get movie titles from local storage
    for (let i = 0; i < localStorage.length; i++) {
        //filter through local storage to only grab relevant history
        if (watchListStorage.getItem(watchListStorage.key(i)) == "MovieFoodie") {
            var listMovie = document.getElementById("watchLater" + j);
            // push movie title to watch list
            listMovie.innerHTML = watchListStorage.key(i);
            document.getElementById("watchLater" + j).addEventListener("click", function (event) { event.preventDefault(); searchWatchList(watchListStorage.key(i)); }, false);
            j++;
        }


    }
}

// Put title of watchlist movie in search bar and click search button
function searchWatchList(title) {
    document.getElementById("searchMovie").value = title;
    document.getElementById("searchButton").click();
}
//when click on the movie poster go to site that shows streaming options
$(document).on('click', '.moviePosterDiv', function () {
    // if user clicks on the star, return out of function
    if (event.target.classList.contains('star')) return;
    let movieId = $(this)[0].id;
    getStreamingOptions(movieId);
})


//get streaming/ where to watch function
function getStreamingOptions(id) {
    const viewUrl = 'https://api.themoviedb.org/3/movie/' + id + '/watch/providers' + movieApiKey + '&watch_region=us&language=en-US';
    //fetch the view Url
    fetch(viewUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            //  console.log(response.results.US);
            const streamingOption = response.results.US.link;
            window.open(streamingOption, '_blank');
        })
        .catch(function (error) {
            modalText.textContent = "We couldnt find watch options for your selected movie. Your selected movie may still be in theaters.";
            modal.style.display = 'block';
        })
}



//Search by genre function
function searchByGenre() {
    // get value related to selected option
    let genreId = $('.genres option:selected').val();
    // api call for filtering by genre
    let genreUrl = 'https://api.themoviedb.org/3/discover/movie' + movieApiKey + '&language=en-US' + '&with_genres=' + genreId;
    // fetch call 
    fetch(genreUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            let searchedByGenreArr = response.results
            for (let i = 0; i < searchedByGenreArr.length; i++) {
                // get html document element to append items to
                let genrePostersDiv = document.querySelector('.genrePosters');
                //set id to movie id to get stream options
                let genreDiv = document.createElement('div');
                genreDiv.id = searchedByGenreArr[i].id;
                genreDiv.classList = 'column is-one-fifth moviePosterDiv';
                //make img element 
                let genreImg = document.createElement('img');
                genreImg.src = 'https://image.tmdb.org/t/p/original' + searchedByGenreArr[i].poster_path;
                //append new div to document element
                genrePostersDiv.appendChild(genreDiv);
                //append image to genre div
                genreDiv.appendChild(genreImg);
                // create a clickable favorite star element
                let favoriteAnchor = document.createElement("a");
                // create the star icon element
                let favoriteIcon = document.createElement("i");
                if (localStorage.getItem(searchedByGenreArr[i].title) !== null) {
                    favoriteIcon.classList = 'fas fa-star fa-large star';
                    //if not, save to watch list
                } else {
                    favoriteIcon.classList = 'far fa-star fa-large star';
                }
                favoriteIcon.setAttribute('id', searchedByGenreArr[i].title);
                // append the anchor to the movie poster
                genreDiv.appendChild(favoriteAnchor);
                // append the icon to the anchor 
                favoriteAnchor.appendChild(favoriteIcon);
                // get release date
                let releaseDate = searchedByGenreArr[i].release_date;
                // format the date into just the release year
                let year = moment(releaseDate, "YYYY-MM-DD").format('YYYY');
                //create span to hold the release year
                let yearEl = document.createElement("span");
                yearEl.textContent = "Released: " + year;
                //append the year to the movie poster div
                genreDiv.appendChild(yearEl);
                // create movie rating span
                let movieRating = document.createElement('span');
                // add "rating" class so that there is space between the 2 spans
                movieRating.classList = 'rating';
                movieRating.textContent = searchedByGenreArr[i].vote_average + ' /10';
                //append movie rating to the poster div
                genreDiv.appendChild(movieRating);
            }

        })
        .catch(function (error) {
            modalText.textContent = "Oops! Something went wrong.";
            modal.style.display = 'block';
        })

}

///genre search
$('.genre-btn').on('click', function () {
    $('.genrePosters').html("");
    searchByGenre();
})

// search movie on submit (enter or click)
$('#searchForm').submit(function (event) {
    event.preventDefault();
    searchMovieByTitle();
})

// show watchList on page load
saveToWatchList("");
//modal close
$(document).on('click', closeModalBtn, function () {
    modal.style.display = 'none';
})