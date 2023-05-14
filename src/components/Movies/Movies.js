import React, {useEffect, useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { printErrorToConsole, shortMovieDuration} from "../../utils/const";
import moviesApi from "../../utils/MoviesApi";

const Movies = ({onSaveMovie, savedMoviesArray}) => {
  const [allMoviesArray, setAllMoviesArray] = useState([]); //все фильмы
  const [MoviesArray, setMoviesArray] = useState([]);       //фильмы после обработки (фильтр по ключевому слову и длине)
  const [isShortMovies, setIsShortMovies] = useState(localStorage.getItem('isShortMovies') === 'true');
  const [infoMessage, setInfoMessage] = useState('');
  const [inputSearch, setInputSearch] = useState('');

  const [isNullMoviesArray, setIsNullMoviesArray] = useState(false);
  const [isEmptyMoviesArray, setIsEmptyMoviesArray] = useState(false);

  useEffect(() => {
    let keywordsMoviesFromStorage = localStorage.getItem('keywordsMovies');
    keywordsMoviesFromStorage = keywordsMoviesFromStorage === null ? '' : keywordsMoviesFromStorage;
    let shortMoviesFromStorage = localStorage.getItem('isShortMovies') === 'true';
    let allMoviesArrayFromStorage = JSON.parse(localStorage.getItem('allMoviesArray'));
    let MoviesArrayFromStorage = JSON.parse(localStorage.getItem('MoviesArray'));

    setInputSearch(keywordsMoviesFromStorage);
    setIsShortMovies(shortMoviesFromStorage);
    setAllMoviesArray(allMoviesArrayFromStorage);
    setMoviesArray(shortMoviesFromStorage ? MoviesArrayFromStorage : allMoviesArrayFromStorage);

    setIsEmptyMoviesArray(MoviesArrayFromStorage?.length === 0);
    setIsNullMoviesArray(MoviesArrayFromStorage === null);
    setInfoMessage(!MoviesArrayFromStorage?.length ? 'Ничего не найдено' : '');
  }, []);

  useEffect(() => {
    localStorage.setItem('allSavedMoviesArray', JSON.stringify(allMoviesArray));
  }, [allMoviesArray])
  useEffect(() => {
    localStorage.setItem('savedMoviesArray', JSON.stringify(savedMoviesArray));
  }, [savedMoviesArray])
  useEffect(() => {
    localStorage.setItem('keywordsSavedMovies', inputSearch);
  }, [inputSearch])
  useEffect(() => {
    localStorage.setItem('isShortSavedMovies', isShortMovies ? 'true' : '');
  }, [isShortMovies])

  const filterMoviesByDuration = (movies) => movies.filter((movie) => movie.duration <= shortMovieDuration);
  const filterMoviesByKeywords = (movies, keywords) => movies.filter(movie => movie.nameRU.toLowerCase().includes(keywords.toLowerCase()));

  function handleSetInitialMovies(movies, keywords) {
    const resultMoviesArr = filterMoviesByKeywords(movies, keywords);
    setAllMoviesArray(resultMoviesArr);
    setIsNullMoviesArray(resultMoviesArr === null);

    if (isShortMovies) {
      const resultMoviesArrBeforeFiltered = filterMoviesByDuration(resultMoviesArr);
      setMoviesArray(resultMoviesArrBeforeFiltered);
      localStorage.setItem('MoviesArray', JSON.stringify(resultMoviesArrBeforeFiltered));
      setIsEmptyMoviesArray(resultMoviesArrBeforeFiltered?.length === 0);
      setInfoMessage(resultMoviesArrBeforeFiltered?.length === 0 ? 'Ничего не найдено' : '')
    } else {
      setMoviesArray(resultMoviesArr);
      localStorage.setItem('MoviesArray', JSON.stringify(resultMoviesArr));
      setIsEmptyMoviesArray(resultMoviesArr?.length === 0);
      setInfoMessage(resultMoviesArr?.length === 0 ? 'Ничего не найдено' : '')
    }
    localStorage.setItem('isShortMovies', isShortMovies ? 'true' : '');
    localStorage.setItem('allMoviesArray', JSON.stringify(resultMoviesArr));
    localStorage.setItem('keywordsMovies', keywords);
  }

  function getMovies(keywords) {
      moviesApi.getInitialCards()
        .then((movies) => {
          handleSetInitialMovies(movies, keywords);
        })
        .catch((err) => {
          printErrorToConsole(err);
          setMoviesArray([]);
          setIsEmptyMoviesArray(true);
          setInfoMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
  }

  const onChangeFilterDuration = () => {
    setIsShortMovies(!isShortMovies);
    setMoviesArray(isShortMovies ? filterMoviesByDuration(allMoviesArray) : allMoviesArray);
    localStorage.setItem('isShortMovies', isShortMovies ? 'true' : '');
    localStorage.setItem('allMoviesArray', JSON.stringify(allMoviesArray));
    localStorage.setItem('MoviesArray', JSON.stringify(filterMoviesByDuration(allMoviesArray)));

  }

  return (
    <main className='movies'>
      <SearchForm getMovies={getMovies}
                  onChangeFilterDuration={onChangeFilterDuration}
                  isShortMovies={isShortMovies}
                  inputSearch={inputSearch}
                  setInputSearch={setInputSearch}
      />
      <MoviesCardList MoviesArray={MoviesArray}
                      savedMoviesArray={savedMoviesArray}
                      onSaveMovie={onSaveMovie}
                      isNullMoviesArray={isNullMoviesArray}
                      isEmptyMoviesArray={isEmptyMoviesArray}
                      infoMessage={infoMessage}/>
    </main>
  );
}

export default Movies;
