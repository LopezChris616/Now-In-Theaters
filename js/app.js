import { key } from "./key.js";

function getNowPlaying() {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`)
        .then(res => res.json())
        .then(films => console.log(films))
        .catch(err => console.log(err))
}

getNowPlaying();