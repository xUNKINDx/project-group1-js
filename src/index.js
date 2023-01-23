import './js/header-home';
// import './js/modal.js';
import { fetchTrandingMovies } from './js/fetchMovies';
import { renderHomePage } from './js/card';

const refs = {
  gallery: document.querySelector('.cards'),
};

fetchTrandingMovies(1).then(movies => {
  renderHomePage(refs.gallery, movies.results).then(response => {});
});

