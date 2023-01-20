export { renderHomePage, MOVIE_GENRES };
import { getGenres } from './fetchMovies';

function createMovieCard(movie, genres) {
  return createMovieCardWithGenres(movie, genres);
}

function createMovieCardWithGenres(
  { poster_path, title, genre_ids, release_date, id, vote_average },
  genres
) {
  const movieGenres = genres
    .filter(({ id }) => genre_ids.includes(id))
    .map(({ name }) => name)
    .join(', ');

  const card = `<li class="content__item" data-filmId=${id}>
                  <img class="content__img" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${title}" loading="lazy">
                  <div class="box-description">
                    <h2 class="content__title">${title}</h2>
                    <p class="content__text">
                    ${movieGenres} | ${release_date.slice(0, 4)} ${vote_average==0 ? `<span class="rating">TBA</span>`: `<span class="rating">${vote_average.toFixed(1)}</span>`}
                    </p>
                  </div>
                </li>`;

  return card;
}

async function renderHomePage(gallery, movies) {
  const genres = await getGenres();
  const markup = movies.map(movie => createMovieCard(movie, genres)).join('');
  gallery.insertAdjacentHTML('beforeend', `<ul class= cards__list>${markup}</ul>`);
}
