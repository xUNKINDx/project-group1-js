import axios from 'axios';

export {
  fetchTrandingMovies,
  searchMovies,
  getMovieById,
  getGenres,
  getMovieVideo,
};
const API_KEY = 'bc23d88e8c379b88dcc9e69c75bc8f78';
const URI = 'https://api.themoviedb.org/3';
const MOVIE_GENRES = 'movie-genres';


async function fetchTrandingMovies(page) {
  const url = `${URI}/trending/movie/day?api_key=${API_KEY}&page=${page}`;

  return await getRequest(url);
}

async function searchMovies(searchText, page) {
  const query = encodeURIComponent(searchText);

  const url = `${URI}/search/movie?api_key=${API_KEY}&page=${page}&query=${query}`;

  return await getRequest(url);
}

async function getMovieById(movieId) {
  const url = `${URI}/movie/${movieId}?api_key=${API_KEY}`;

  return await getRequest(url);
}

async function getGenres() {
  const url = `${URI}/genre/movie/list?api_key=${API_KEY}`;

  let genres = localStorage.getItem(MOVIE_GENRES);
  if (genres) {
    return JSON.parse(genres);
  } else {
    genres = await getRequest(url);
    localStorage.setItem(MOVIE_GENRES, JSON.stringify(genres.genres));
    return genres.genres;
  }

}

async function getMovieVideo(movieId) {
  const url = `${URI}/movie/${movieId}/videos?api_key=${API_KEY}`;

  return await getRequest(url);
}

async function getRequest(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
