// All movie data retrieved from The Movie Database API
// https://developers.themoviedb.org/3/getting-started/introduction

// Used to hide API key from GitHub
import { key } from "./key.js";

// Used to call all functions needed to display functionality onto page
function init() {
    const movieDisplay = document.getElementById("movie-display");
    const sortMovies = document.getElementById("sort-movies");
    const movieGroup = document.getElementById("movie-group");
    getNowPlaying(movieDisplay, sortMovies);
    toggleHandler(movieDisplay, sortMovies, movieGroup);
    movieSearch(movieDisplay, sortMovies, movieGroup);
}

init();

// GET all Now Playing movies from TMDB API
function getNowPlaying(movieDisplay, sortMovies) {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&region=US&page=1`)
        .then(res => res.json())
        .then(movies => displayMovies(movies, movieDisplay, sortMovies))
        .catch(err => console.log(err));
}


// GET all Upcoming Releases from TMDB API
function getUpcoming(movieDisplay, sortMovies) {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&region=US&page=1`)
        .then(res => res.json())
        .then(movies => displayMovies(movies, movieDisplay, sortMovies))
        .catch(err => console.log(err));
}

// Displays to the page all movies retrieved from API
function displayMovies(movies, movieDisplay, sortMovies) {
    movies.results.forEach(movie => getMovieInfo(movie, movieDisplay));
    movieSort(movies.results, movieDisplay, sortMovies);
    sortMovies.value = "sort-by";
}

// Called for each movie object to display each movie to the page
function getMovieInfo(movie, movieDisplay) {
    const movieCard = document.createElement("div");
    const movieTitle = document.createElement("h3");
    const movieTickets = document.createElement("a");
    const moviePoster = document.createElement("img");
    const movieRating = document.createElement("p");
    const movieReleaseDate = document.createElement("p");

    movieCard.setAttribute("class", "movie-card");
    movieTitle.textContent = movie.title;
    movieTickets.setAttribute("href", `https://www.fandango.com/search?q=${modifyTitle(movie.title)}&mode=all`);
    movieTickets.setAttribute("target", "_blank");
    movieTickets.textContent = "Get tickets here!";

    // Some movies have no poster available, so a generic "No Poster Available" poster is displayed instead
    if(movie.poster_path === null) {
        moviePoster.setAttribute("src", "https://timescineplex.com/times/img/no-poster.png");
        moviePoster.setAttribute("alt", `No poster available for the movie, ${movie.title}`);
    } else {
        moviePoster.setAttribute("src", `https://image.tmdb.org/t/p/original${movie.poster_path}`);
        moviePoster.setAttribute("alt", `Poster for the movie, ${movie.title}`);
    }

    movieRating.textContent = `${movie.vote_average}/10 | ${movie.vote_count} ratings`;
    movieReleaseDate.textContent = movie.release_date;

    movieCard.append(moviePoster, movieTitle, movieReleaseDate, movieRating, movieTickets);
    movieDisplay.appendChild(movieCard);
}

// Click listener to toggle between showing movies now playing and upcoming releases
function toggleHandler(movieDisplay, sortMovies, movieGroup) {
    const viewToggle = document.getElementById("view-toggle");
    viewToggle.addEventListener("click", () => {
        if(viewToggle.textContent === "View Upcoming Releases") {
            toggleHelper(getUpcoming, viewToggle, "View Now Playing", movieGroup, "Coming soon to a theater near you", movieDisplay, sortMovies);
        } else {
            toggleHelper(getNowPlaying, viewToggle, "View Upcoming Releases", movieGroup, "Now Playing", movieDisplay, sortMovies);
        }
    });
}

// Helper function used to display now playing movies or upcoming releases from toggleHandler()
function toggleHelper(toggleDisplay, btn, btnText, header, headerText, movieDisplay, sortMovies) {
    movieDisplay.textContent = "";
    toggleDisplay(movieDisplay, sortMovies);
    btn.textContent = btnText;
    header.textContent = headerText;
}

// GET all movies that match user input from TMDB API
function movieSearch(movieDisplay, sortMovies, movieGroup) {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${event.target[0].value}&page=1&include_adult=false`)
            .then(res => res.json())
            .then(movies => {
                movieDisplay.textContent = "";
                movies.results.forEach(movie => {
                    getMovieInfo(movie, movieDisplay);
                });
                sortMovies.value = "sort-by";
                movieSort(movies.results, movieDisplay, sortMovies);
                movieGroup.textContent = "Search Results";
            })
            .catch(err => console.log(err));
    });
}

// Change listener used to sort movies alphabetically or by user rating
function movieSort(movies, movieDisplay, sortMovies) {
    sortMovies.addEventListener("change", () => {
        if(sortMovies.value === "alphabetical") {
            sortHelper(movieDisplay, movies, "title", -1, 1);
        } else if(sortMovies.value === "rating") {
            sortHelper(movieDisplay, movies, "vote_average", 1, -1);
        }
    })
}

// Helper function used to sort movies alphabetically or by user rating from movieSort()
function sortHelper(movieDisplay, movies, sortType, sortOrder1, sortOrder2) {
    const sortFilms = movies.sort((a, b) => {
        if(a[sortType] < b[sortType]) {
            return sortOrder1;
        } else if(a[sortType] > b[sortType]) {
            return sortOrder2;
        } else {
            return 0;
        }
    });
    movieDisplay.textContent = "";
    sortFilms.forEach(movie => getMovieInfo(movie, movieDisplay));
}

// Used to add a "+" sign in between each word in a movie title and adding that as a query for when the user
// clicks the link to get tickets on Fandango. Fandango actually still searches for most movies without adding
// the + sign, but I did see a few cases where it did not work, so I decided to make this just to be safe
function modifyTitle(title) {
    const addPlusSign = title.split("").map(letter => {
        if(letter === " ") {
            letter = "+";
        }
        return letter;
    });
    return addPlusSign.join("");
}