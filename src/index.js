import { fetchTrandingMovies, searchMovies, getMovieById, getGenres, getMovieVideo } from './js/fetchMovies';

fetchTrandingMovies(1).then(movies =>{
    console.log(movies);
});

searchMovies('Harry Potter', 1).then(movies => {
    console.log(movies);
})

getMovieById(315162).then(movie =>{
    console.log(movie);
})

getGenres().then(genres => {
    console.log(genres);
})

getMovieVideo(550).then(movie =>{
    console.log(movie);
})