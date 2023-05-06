import { key } from "./key.js";

function getNowPlaying() {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&region=US&page=1`)
        .then(res => res.json())
        .then(movies => movies.results.forEach(movie => getMovieInfo(movie)))
        .catch(err => console.log(err))
}

getNowPlaying();

function getMovieInfo(movie) {
    const nowPlaying = document.getElementById("now-playing");
    const movieCard = document.createElement("div");
    const movieTitle = document.createElement("h3");
    const movieTickets = document.createElement("a");
    const moviePoster = document.createElement("img");
    const movieRating = document.createElement("p");
    const movieReleaseDate = document.createElement("p");

    movieCard.setAttribute("class", "movie-card");
    movieTitle.textContent = movie.original_title;
    movieTickets.setAttribute("href", `https://www.fandango.com/search?q=${modifyTitle(movie.original_title)}&mode=all`);
    movieTickets.setAttribute("target", "_blank");
    movieTickets.textContent = "Get tickets here!";
    moviePoster.setAttribute("src", `https://image.tmdb.org/t/p/original${movie.poster_path}`);
    movieRating.textContent = `${movie.vote_average}/10 | ${movie.vote_count} ratings`;
    movieReleaseDate.textContent = movie.release_date;

    movieCard.append(movieTitle, moviePoster, movieReleaseDate, movieRating, movieTickets);
    nowPlaying.appendChild(movieCard);
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