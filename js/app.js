import { key } from "./key.js";

function init() {
    const movieDisplay = document.getElementById("movie-display");
    getNowPlaying(movieDisplay);
    toggleHandler(movieDisplay)
}

init();

function getNowPlaying(movieDisplay) {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&region=US&page=1`)
        .then(res => res.json())
        .then(movies => movies.results.forEach(movie => getMovieInfo(movie, movieDisplay)))
        .catch(err => console.log(err));
}

function getUpcoming(movieDisplay) {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&region=US&page=1`)
        .then(res => res.json())
        .then(movies => {
            movies.results.forEach(movie => getMovieInfo(movie, movieDisplay));
        })
        .catch(err => console.log(err));
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
    moviePoster.setAttribute("src", `https://image.tmdb.org/t/p/original${movie.poster_path}`);
    movieRating.textContent = `${movie.vote_average}/10 | ${movie.vote_count} ratings`;
    movieReleaseDate.textContent = movie.release_date;

    movieCard.append(movieTitle, moviePoster, movieReleaseDate, movieRating, movieTickets);
    movieDisplay.appendChild(movieCard);

    console.log(movie);
}

function toggleHandler(movieDisplay) {
    const viewToggle = document.getElementById("view-toggle");
    viewToggle.addEventListener("click", () => {
        if(viewToggle.textContent === "View Upcoming Releases") {
            movieDisplay.textContent = "";
            getUpcoming(movieDisplay);
            viewToggle.textContent = "View Now Playing";
        } else {
            movieDisplay.textContent = "";
            getNowPlaying(movieDisplay);
            viewToggle.textContent = "View Upcoming Releases";
        }
    })

}

function modifyTitle(title) {
    const newTitle = title.split("").map(letter => {
        if(letter === " ") {
            letter = "+";
        }
        return letter;
    })
    return newTitle.join("");
}