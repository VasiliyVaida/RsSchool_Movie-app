const searchbar = document.querySelector('.header__searchbar');
searchbar.focus();
const searchbtn = document.querySelector('.header__searchbar-btn');

const fetchFilms = async function getData(title, apiKey = '&apikey=b6e36538', url = 'https://www.omdbapi.com/?') {
  const filmRes = await fetch(url + 't=' + title + apiKey);
  const filmData = await filmRes.json();
  return filmData;
};

const findFilms = async function findData(request, apiKey = '&apikey=b6e36538', url = 'https://www.omdbapi.com/?') {
  const searchRes = await fetch(url + 's=' + request + apiKey);
  const searchData = await searchRes.json();
  console.log(searchData);
  return searchData;
};

const makeFilmCard = (posterId, subtitle, description, parentElem) => {
  let filmsCard = document.createElement('div');
  filmsCard.classList.add('movies-list__card');
  parentElem.append(filmsCard);
  let filmsCardPosterWrapper = document.createElement('div');
  filmsCardPosterWrapper.classList.add('movies-list__card-poster');
  filmsCard.append(filmsCardPosterWrapper);
  let filmsCardPoster = document.createElement('img');
  filmsCardPoster.classList.add('movies-list__card-img');
  filmsCardPoster.src = `${posterId}`;
  filmsCardPosterWrapper.append(filmsCardPoster);
  let filmsCardSubtitle = document.createElement('h3');
  filmsCardSubtitle.classList.add('movies-list__card-subtitle');
  filmsCardSubtitle.textContent = `${subtitle}`;
  filmsCard.append(filmsCardSubtitle);
  let filmsCardReview = document.createElement('div');
  filmsCardReview.classList.add('movies-list__review-wrapper');
  filmsCard.append(filmsCardReview);
  let filmsCardReviewSubtitle = document.createElement('h4');
  filmsCardReviewSubtitle.classList.add('movies-list__review-subtitle');
  filmsCardReviewSubtitle.textContent = 'Review';
  filmsCardReview.append(filmsCardReviewSubtitle);
  let filmsCardReviewDescr = document.createElement('p');
  filmsCardReviewDescr.classList.add('movies-list__review-descr');
  filmsCardReviewDescr.textContent = `${description}`;
  filmsCardReview.append(filmsCardReviewDescr);
};

const startFilms = ['Spider-Man: No Way Home', "The King's Man", 'Encanto', 'Eternals', 'The Requin', 'The Ice Age Adventures of Buck Wild', 'Hotel Transylvania', 'Marry Me', 'The 355', 'Nightmare Alley', 'Red Notice', 'The Jack in the Box: Awakening', 'Through My Window', 'Sing 2', 'Ghostbusters: Afterlife', 'American Siege', 'The Matrix Resurrections', 'Resident Evil: Welcome to Raccoon City', 'Venom: Let There Be Carnage', 'One Shot'];

const showStartFilms = () => {
  const moviesSection = document.querySelector('.movies-list__cards');
  const startFilmsWrapper = document.createElement('div');
  startFilmsWrapper.classList.add('movies-list__cards-start');
  moviesSection.prepend(startFilmsWrapper);
  startFilms.forEach((item) => {
    let film = fetchFilms(item);
    film.then((result) => {
      makeFilmCard(result.Poster, result.Title, result.Plot, startFilmsWrapper);
    });
  });
};

const showSearhedFilms = () => {
  const startFilmsWrapper = document.querySelector('.movies-list__cards-start');
  const moviesSection = document.querySelector('.movies-list__cards');
  startFilmsWrapper.style.display = 'none';
  const searchFilmsWrapper = document.createElement('div');
  searchFilmsWrapper.classList.add('movies-list__cards-search');
  moviesSection.prepend(searchFilmsWrapper);
  const searchFilms = findFilms(searchbar.value);
  searchFilms.then((result) => {
    result.Search.forEach((item) => {
      makeFilmCard(item.Poster, item.Title, item.Plot, searchFilmsWrapper);
    });
  });
};

showStartFilms();

searchbar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    showSearhedFilms();
  }
});

searchbtn.addEventListener('click', () => {
  searchbtn.classList.toggle('header__searchbar-btn_serched');
  if (searchbtn.classList.contains('header__searchbar-btn_serched')) {
    showSearhedFilms();
    searchbtn.style.backgroundImage = "url('./assets/img/close_header_input_btn.png')";
  } else {
    showStartFilms();
    searchbtn.style.backgroundImage = "url('./assets/img/search_header_input_btn.png')";
    searchbar.value = '';
  }
});
