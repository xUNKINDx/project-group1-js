import { searchMovies } from './fetchMovies';
import { renderHomePage } from './card';

const { form, input, textMessage, gallery } = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form__input'),
  textMessage: document.querySelector('.search-message'),
  gallery: document.querySelector('.cards'),
};

let page = 1;

form.addEventListener('submit', onFormSubmitHandler);
input.addEventListener('click', onInputHandler);
input.addEventListener('input', onInputHandler);

async function onFormSubmitHandler(e) {
  e.preventDefault();
  const searchText = input.value.trim();
  e.target.reset();
  console.log(searchText);
  try {
    const data = await searchMovies(searchText, page);
    searchMovies(searchText, page).then(movies => {
      renderHomePage(gallery, movies.results).then(response => {});
    });
    textMessage.classList.add('hidden');

    if (searchText === '' || searchText === undefined) {
      textMessage.classList.remove('hidden');
    } else if (data.total_results === 0) {
      textMessage.classList.remove('hidden');
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

function onInputHandler(e) {
  e.preventDefault();
  textMessage.classList.add('hidden');
}
