import { renderHomePage } from './card.js';
export { selectQueue, selectWatched };

let mode = 'watched';

const refs = {
  gallery: document.querySelector('.cards'),
};

renderLibrary();

function selectWatched() {
  mode = 'watched';
  renderLibrary();
}

function selectQueue() {
  mode = 'queue';
  renderLibrary();
}

function renderLibrary() {
  refs.gallery.innerHTML = '';
  const moviesJSON = localStorage.getItem(mode);

  if (!moviesJSON || moviesJSON == '') {
    return;
  }

  const movies = JSON.parse(moviesJSON);

  renderHomePage(refs.gallery, movies).then(response => {});
}
