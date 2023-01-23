import { searchMovies } from './fetchMovies';

const { form, input, submitButton, textMessage } = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form__input'),
  textMessage: document.querySelector('.search-message'),
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
    console.log(searchMovies(searchText, page));
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
