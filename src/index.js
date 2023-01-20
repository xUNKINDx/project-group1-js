import {
  fetchTrandingMovies,
  searchMovies,
  getMovieById,
  getGenres,
  getMovieVideo,
} from './js/fetchMovies';
import { renderHomePage, MOVIE_GENRES } from './js/card';

const refs = {
  gallery: document.querySelector('.cards'),
};

fetchTrandingMovies(1).then(movies => {
  renderHomePage(refs.gallery, movies.results).then(response => {});
});

// searchMovies('Harry Potter', 1).then(movies => {
//   console.log(movies);
// });

// getMovieById(315162).then(movie => {
//   console.log(movie);
// });

// getGenres().then(genres => {
//   console.log(genres);
// });

// getMovieVideo(550).then(movie => {
//   console.log(movie);
// });
