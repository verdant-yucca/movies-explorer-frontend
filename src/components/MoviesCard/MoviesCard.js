import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import './MoviesCard.css';
import deleteMovieButton from '../../images/deleteMovieButton.svg';
import savedButton from '../../images/savedMovieButton.svg';
import {getInterfaceDuration} from "../../utils/const";

const MoviesCard = ({Movie, savedMoviesArray, onSaveMovie}) => {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  const isPageSavedMovies = location.pathname === '/saved-movies';

  useEffect(() => {
    if (savedMoviesArray.length) {
      setIsSaved(savedMoviesArray.some(i => i.movieId === Movie.id));
    }
  }, [savedMoviesArray])

  const handleClickButtonSaveMovie = () => {
    onSaveMovie(Movie);
  };

  return (
    <div className='moviesCard'>
      <div className='moviesCard__container'>
        <h2 className='moviesCard__title'>{Movie.nameRU}</h2>
        <p className='moviesCard__duration'>{getInterfaceDuration(Movie.duration)}</p>
      </div>
      <a href={Movie.trailerLink} target="blank">
        <img className='moviesCard__poster' src={` ${isPageSavedMovies ? Movie?.image: `https://api.nomoreparties.co${Movie.image.url}`}`} alt='постер фильма'/>
      </a>

      {isPageSavedMovies &&
        <button type='button' aria-label='удалить фильм' className='moviesCard__button' onClick={handleClickButtonSaveMovie}>
          <img className='moviesCard__click' alt='удалить' src={deleteMovieButton}/>
        </button>
      }

      {!isPageSavedMovies &&
        <button type='button' aria-label='сохранить'
                className={`moviesCard__button ${!isSaved ? 'moviesCard__button_save' : 'moviesCard__button_saved'}`}
                onClick={handleClickButtonSaveMovie}>
          {!isSaved ? "Сохранить" :
            <img className='moviesCard__add' alt='добавить' src={savedButton}/>}
        </button>
      }
    </div>
  );
};


export default MoviesCard;
