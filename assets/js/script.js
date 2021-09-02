//POPULAR MOVIES TRAILER
//get html element to append all elements for the video
const newReleaseDiv = document.querySelector(".newReleases");
const movieApiKey = '?api_key=c1e65505e4c6142bf89038d711a3cd97';
const popularMovieApi = 'https://api.themoviedb.org/3/movie/popular' + movieApiKey + '&language=en-US&page=1';

function showNewReleases() {
    //fetch to get popular movie ids
    fetch(popularMovieApi + '&append_to_response=videos')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response)
        let popularResults = response.results;
        for (let i = 0; i < 5; i++) {
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
                        videoDiv.classList = 'column is-one-fourth';
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
// call showNewRelease function to run on page load
showNewReleases();
// when the favorite star is clicked on it will change to a solid star
$(document).on('click', '.fa-star', function() {
    console.log($(this));
    $(this).removeClass("far");
    $(this).addClass("fas");
 })
