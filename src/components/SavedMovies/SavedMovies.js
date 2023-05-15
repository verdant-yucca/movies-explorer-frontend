import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {useEffect, useState} from "react";
import {shortMovieDuration} from "../../utils/const";

function SavedMovies({allSavedMoviesArray,onSaveMovie}) {
  const [savedMoviesArray, setSavedMoviesArray] = useState(allSavedMoviesArray);
  const [savedFilteredMoviesArray, setSavedFiltrredMoviesArray] = useState(savedMoviesArray);
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isNullMoviesArray, setIsNullMoviesArray] = useState(false);
  const [isEmptyMoviesArray, setIsEmptyMoviesArray] = useState(true);

  useEffect(() => {
    let keywordsMoviesFromStorage = localStorage.getItem('keywordsSavedMovies');
    keywordsMoviesFromStorage = keywordsMoviesFromStorage === null ? '' : keywordsMoviesFromStorage;

    let shortMoviesFromStorage = localStorage.getItem('isShortSavedMovies') === 'true';
    let allMoviesArrayFromStorage = JSON.parse(localStorage.getItem('allSavedMoviesArray'));
    let MoviesArrayFromStorage = JSON.parse(localStorage.getItem('savedMoviesArray'));

    setInputSearch(keywordsMoviesFromStorage);
    setIsShortSavedMovies(shortMoviesFromStorage);
    setSavedMoviesArray(allMoviesArrayFromStorage);
    setSavedFiltrredMoviesArray(shortMoviesFromStorage ? MoviesArrayFromStorage : allMoviesArrayFromStorage);

    setIsEmptyMoviesArray(!MoviesArrayFromStorage?.length);
    setInfoMessage(!MoviesArrayFromStorage?.length ? 'Ничего не найдено' : '');
  }, []);

  const filterMoviesByKeywords = (movies, keywords) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(keywords.toLowerCase()));
  const filterMoviesByDuration = (movies) => movies.filter((movie) => movie.duration <= shortMovieDuration);

  const handleSetInitialMovies = (allSavedMoviesArray, keywords) => {
    const resultMoviesArr = filterMoviesByKeywords(allSavedMoviesArray, keywords);
    setSavedMoviesArray(resultMoviesArr);

    if (isShortSavedMovies) {
      const resultMoviesArrBeforeFiltered = filterMoviesByDuration(resultMoviesArr);
      setSavedFiltrredMoviesArray(resultMoviesArrBeforeFiltered);
      localStorage.setItem('savedMoviesArray', JSON.stringify(resultMoviesArrBeforeFiltered));
      setIsEmptyMoviesArray(!Boolean(resultMoviesArrBeforeFiltered.length));
      setInfoMessage(!Boolean(resultMoviesArrBeforeFiltered.length) ? 'Ничего не найдено' : '')
    } else {
      setSavedFiltrredMoviesArray(resultMoviesArr);
      localStorage.setItem('savedMoviesArray', JSON.stringify(resultMoviesArr));
      setIsEmptyMoviesArray(!Boolean(resultMoviesArr.length));
      setInfoMessage(!Boolean(resultMoviesArr.length) ? 'Ничего не найдено' : '')
    }
    localStorage.setItem('isShortSavedMovies', isShortSavedMovies ? 'true' : '');
    localStorage.setItem('allSavedMoviesArray', JSON.stringify(resultMoviesArr));
    localStorage.setItem('keywordsSavedMovies', keywords);
  }

  const getSavedMovies = (keywords) => allSavedMoviesArray && handleSetInitialMovies(allSavedMoviesArray, keywords);

  const onChangeFilterDuration = () => {
    const isShort = !isShortSavedMovies;
    setIsShortSavedMovies(isShort);
    setSavedFiltrredMoviesArray(isShort ? filterMoviesByDuration(savedMoviesArray) : savedMoviesArray);
    localStorage.setItem('isShortSavedMovies', isShortSavedMovies ? 'true' : '');
    localStorage.setItem('allSavedMoviesArray', JSON.stringify(savedMoviesArray));
    localStorage.setItem('savedMoviesArray', JSON.stringify(filterMoviesByDuration(savedMoviesArray)));
  }

  return (
    <main className="main">
      <SearchForm isShortMovies={isShortSavedMovies}
                  onChangeFilterDuration={onChangeFilterDuration}
                  getMovies={getSavedMovies}
                  inputSearch={inputSearch}
                  setInputSearch={setInputSearch}
      />
      <MoviesCardList MoviesArray={savedFilteredMoviesArray}
                      savedMoviesArray={allSavedMoviesArray}
                      onSaveMovie={onSaveMovie}
                      isNullMoviesArray={isNullMoviesArray}
                      isEmptyMoviesArray={isEmptyMoviesArray}
                      infoMessage={infoMessage}/>
    </main>
  );
}

export default SavedMovies;
