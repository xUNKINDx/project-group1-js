export { createModal };
import { getMovieById } from './fetchMovies.js';
import { getMarkupInfo, getMarkupImage } from './markupModal.js';

const QUEUE_KEY = 'queue';
const WATCHED_KEY = 'watched';

const refs = {};

function createModal() {
  refs.openModal = document.querySelector('.cards__list');
  refs.closeModalBtn = document.querySelector('.button-close');
  refs.modal = document.querySelector('.backdrop');
  refs.addToWatched = document.querySelector('.button-watched');
  refs.addToQueue = document.querySelector('.button-queue');
  refs.filmIdElem = document.querySelector('.filmName');
  refs.filmCommon = document.querySelector('.film-container');
  refs.filmInfoContainer = document.querySelector('.film-info__container');
  refs.filmInfo = document.querySelector('.film-info');
  (refs.bodyTag = document.querySelector('body')),
    refs.openModal.addEventListener('click', showModal);
  refs.closeModalBtn.addEventListener('click', closeModal);
}

const handleClick = e => {
  console.log(e.code);
  if (e.code === 'Escape') {
    document.removeEventListener('keydown', handleClick);
    refs.modal.classList.toggle('is-hidden');
    refs.bodyTag.classList.remove('scroll-off');

    refs.addToWatched.removeEventListener('click', saveLocalStorageFilmStatus);
    refs.addToQueue.removeEventListener('click', saveLocalStorageFilmStatus);
  }
};

function getArrayFromLocalStorage(keyLocalStorage) {
  let arrayFilms = [];
  let arrayIdFilms = [];

  const savedSettings = localStorage.getItem(keyLocalStorage);

  if (savedSettings !== null) {
    try {
      arrayFilms = JSON.parse(savedSettings);

      arrayIdFilms = arrayFilms.map(film => film.id);
    } catch (e) {
      console.log('Ошибка парсинга из LocalStorage');
    }
  }

  const parsedSttings = {
    arrayIdFilms: arrayIdFilms,
    arrayFilms: arrayFilms,
  };

  return parsedSttings;
}

function addRemoveFilmsArrayInLocalStorage(arrayKeysLocalStorage, filmIdModal) {
  let keyLocalStorage = '';

  for (let i = 0; i < arrayKeysLocalStorage.length; i++) {
    keyLocalStorage = arrayKeysLocalStorage[i];
    const { arrayIdFilms, arrayFilms } =
      getArrayFromLocalStorage(keyLocalStorage);

    const indexFilm = arrayIdFilms.indexOf(parseInt(filmIdModal, 10));

    if (indexFilm !== -1) {
      arrayFilms.splice(indexFilm, 1);
    } else {
      const dataForLocalStorage = {
        poster_path: filmData.poster_path,
        title: filmData.title,
        genre_ids: filmData.genres.map(genre => genre.id),
        id: filmData.id,
        vote_average: filmData.vote_average,
        release_date: filmData.release_date,
      };

      arrayFilms.push(dataForLocalStorage);
    }

    if (keyLocalStorage === WATCHED_KEY) {
      refs.addToWatched.classList.toggle('hasAlready');
    } else {
      refs.addToQueue.classList.toggle('hasAlready');
    }

    localStorage.setItem(keyLocalStorage, JSON.stringify(arrayFilms));
  }
}

function addClassBtnDependingOnStatus(keyLocalStorage, filmIdModal) {
  const { arrayIdFilms, arrayFilms } =
    getArrayFromLocalStorage(keyLocalStorage);
  const indexFilm = arrayIdFilms.indexOf(parseInt(filmIdModal, 10));
  if (indexFilm !== -1) {
    console.log(`Уже есть ${arrayIdFilms}`);
    if (keyLocalStorage === WATCHED_KEY) {
      refs.addToWatched.classList.add('hasAlready');
    } else {
      refs.addToQueue.classList.add('hasAlready');
    }
  }
}

function removeClassBtnDependingOnStatus() {
  refs.addToWatched.classList.remove('hasAlready');
  refs.addToQueue.classList.remove('hasAlready');
}

const saveLocalStorageFilmStatus = e => {
  if (filmData === null || filmData === undefined) {
    return;
  }

  const filmIdModal = refs.filmIdElem.dataset.filmidmodal;
  let arrayKeysLocalStorage = [];
  if (e.target.classList.contains('button-watched') === true) {
    arrayKeysLocalStorage = [WATCHED_KEY];
  } else {
    arrayKeysLocalStorage = [QUEUE_KEY];
  }
  addRemoveFilmsArrayInLocalStorage(arrayKeysLocalStorage, filmIdModal);
};

let filmData = null;
function showModal(e) {
  if (e.target.nodeName === 'UL') return;
  const movieId = e.target.closest('li').dataset.filmid;

  refs.filmIdElem.dataset.filmidmodal = movieId;
  refs.modal.classList.remove('is-hidden');
  refs.bodyTag.classList.add('scroll-off');

  let response = getMovieById(refs.filmIdElem.dataset.filmidmodal);
  try {
    response.then(data => {
      filmData = data;
      const markupImage = getMarkupImage(data);
      const markupInfo = getMarkupInfo(data);
      const filmImage = document.querySelector('.film-image');
      filmImage.remove();
      refs.filmCommon.insertAdjacentHTML('afterbegin', markupImage);
      refs.filmInfoContainer.innerHTML = '';
      refs.filmInfoContainer.insertAdjacentHTML('afterbegin', markupInfo);
    });

  } catch (error) {
    console.log(error);
  }
  removeClassBtnDependingOnStatus();
  document.addEventListener('keydown', handleClick);
  console.log('is-hidden false');
  addClassBtnDependingOnStatus(
    WATCHED_KEY,
    refs.filmIdElem.dataset.filmidmodal
  );
  addClassBtnDependingOnStatus(QUEUE_KEY, refs.filmIdElem.dataset.filmidmodal);
  refs.addToWatched.addEventListener('click', saveLocalStorageFilmStatus);
  refs.addToQueue.addEventListener('click', saveLocalStorageFilmStatus);
}

function closeModal(e) {
  refs.modal.classList.add('is-hidden');
  refs.bodyTag.classList.remove('scroll-off');

  refs.addToWatched.removeEventListener('click', saveLocalStorageFilmStatus);
  refs.addToQueue.removeEventListener('click', saveLocalStorageFilmStatus);
}
