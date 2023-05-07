import { key } from "./key.js";

function init() {
    const movieDisplay = document.getElementById("movie-display");
    const sortMovies = document.getElementById("sort-movies");
    getNowPlaying(movieDisplay, sortMovies);
    toggleHandler(movieDisplay, sortMovies);
    movieSearch(movieDisplay, sortMovies);
}

init();

function getNowPlaying(movieDisplay, sortMovies) {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&region=US&page=1`)
        .then(res => res.json())
        .then(movies => {
            displayMovies(movies, movieDisplay, sortMovies);
        })
        .catch(err => console.log(err));
}

function getUpcoming(movieDisplay, sortMovies) {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&region=US&page=1`)
        .then(res => res.json())
        .then(movies => {
            displayMovies(movies, movieDisplay, sortMovies);
        })
        .catch(err => console.log(err));
}

function displayMovies(movies, movieDisplay, sortMovies) {
    movies.results.forEach(movie => getMovieInfo(movie, movieDisplay));
    movieSort(movies.results, movieDisplay, sortMovies);
    sortMovies.value = "sort-by";
    console.log(movies);
}

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

    if(movie.poster_path === null) {
        moviePoster.setAttribute("src", "https://timescineplex.com/times/img/no-poster.png");
    } else {
        moviePoster.setAttribute("src", `https://image.tmdb.org/t/p/original${movie.poster_path}`);
    }
    
    movieRating.textContent = `${movie.vote_average}/10 | ${movie.vote_count} ratings`;
    movieReleaseDate.textContent = movie.release_date;

    movieCard.append(movieTitle, moviePoster, movieReleaseDate, movieRating, movieTickets);
    movieDisplay.appendChild(movieCard);
}

function toggleHandler(movieDisplay, sortMovies) {
    const viewToggle = document.getElementById("view-toggle");
    const movieGroup = document.getElementById("movie-group");
    viewToggle.addEventListener("click", () => {
        if(viewToggle.textContent === "View Upcoming Releases") {
            toggleHelper(getUpcoming, viewToggle, "View Now Playing", movieGroup, "Coming soon to a theater near you", movieDisplay, sortMovies);
        } else {
            toggleHelper(getNowPlaying, viewToggle, "View Upcoming Releases", movieGroup, "Now Playing", movieDisplay, sortMovies);
        }
    });
}

function toggleHelper(toggleDisplay, btn, btnText, header, headerText, movieDisplay, sortMovies) {
    movieDisplay.textContent = "";
    toggleDisplay(movieDisplay, sortMovies);
    btn.textContent = btnText;
    header.textContent = headerText;
}

function movieSearch(movieDisplay, sortMovies) {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${event.target[0].value}&page=1&include_adult=false`)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(movies => {
                movieDisplay.textContent = "";
                movies.results.forEach(movie => {
                    getMovieInfo(movie, movieDisplay);
                })
                sortMovies.value = "sort-by";
                movieSort(movies.results, movieDisplay, sortMovies);
            })
            .catch(err => console.log(err));
    });
}

function movieSort(movies, movieDisplay, sortMovies) {
    sortMovies.addEventListener("change", () => {
        if(sortMovies.value === "alphabetical") {
            sortHelper(movieDisplay, movies, "title", -1, 1);
        } else if(sortMovies.value === "rating") {
            sortHelper(movieDisplay, movies, "vote_average", 1, -1);
        }
    })
}

function sortHelper(movieDisplay, movies, sortType, sortOrder1, sortOrder2) {
    const sorted = movies.sort((a, b) => {
        if(a[sortType] < b[sortType]) {
            return sortOrder1;
        } else if(a[sortType] > b[sortType]) {
            return sortOrder2;
        } else {
            return 0;
        }
    });
    movieDisplay.textContent = "";
    sorted.forEach(movie => getMovieInfo(movie, movieDisplay));
}

function modifyTitle(title) {
    const newTitle = title.split("").map(letter => {
        if(letter === " ") {
            letter = "+";
        }
        return letter;
    });
    return newTitle.join("");
}