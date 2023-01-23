function getMarkupInfo(data) {
  const genreD = data.genres.map(genre => genre.name).join(', ');
  const markup = `<div class="film-info__container">
            <h2 class="filmName" data-filmidmodal="">${data.title}</h2> 
            <div class="film-info__item">
                <p class="film-info__itemName">Vote / Votes</p>
                <p class="film-info__itemValue small"> <span class="film-info__vote">${data.vote_average}</span> <spanp class="film-info__votes">/${data.vote_count} </span> </p>
            </div>
            <div class="film-info__item">
                <p class="film-info__itemName">Popularity</p>
                <p class="film-info__itemValue small">${data.popularity}</p>
            </div>
            <div class="film-info__item">
                <p class="film-info__itemName">Original Title</p>
                <p class="film-info__itemValue">${data.original_title}</p>
            </div>
            <div class="film-info__item">        
                <p class="film-info__itemName">Genre</p>
                <p class="film-info__itemValue">${genreD}</p>
            </div>         
            <p class="film-info__desc">ABOUT<br>${data.overview}</p>
        </div>`;

  return markup;
}
function getMarkupImage(data) {
  const markup = `<img class="film-image" src="https://image.tmdb.org/t/p/original${data.poster_path}" alt=${data.title} loading="lazy">`;
  return markup;
}

export { getMarkupInfo, getMarkupImage };
