import { renderHomePage } from './card.js';
export { selectQueue, selectWatched, mode, renderLibrary };

let mode = 'watched';

const refs = {
  gallery: document.querySelector('.cards'),
  watchedButton: document.querySelector('button#watched-button'),
  queueButton: document.querySelector('button#queue-button'),
  addToWatched: document.querySelector('.button-watched'),
  addToQueue: document.querySelector('.button-queue'),
};

refs.watchedButton.addEventListener('click', selectWatched);
refs.queueButton.addEventListener('click', selectQueue);
// refs.addToWatched.addEventListener('click', renderLibrary);
// refs.addToQueue.addEventListener('click', renderLibrary);

renderLibrary();

function selectWatched() {
  mode = 'watched';
  renderLibrary();
  refs.watchedButton.classList.add("header-library-buttons__button--active")
  refs.queueButton.classList.remove("header-library-buttons__button--active")
}

function selectQueue() {
  mode = 'queue';
  renderLibrary();
  refs.watchedButton.classList.remove("header-library-buttons__button--active")
  refs.queueButton.classList.add("header-library-buttons__button--active")
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
