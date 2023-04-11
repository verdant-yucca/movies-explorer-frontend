import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';

import './MoviesCard.css';
import deleteFilmButton from '../../images/deleteFilmButton.svg';
import savedButton from '../../images/savedFilmButton.svg';

const MoviesCard = ({card}) => {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);

  function handleClick() {
    setIsSaved(!isSaved);
  }

  return (
    <div className='moviesCard'>
      <div className='moviesCard__container'>
        <h2 className='moviesCard__title'>{card.name}</h2>
        <p className='moviesCard__duration'>{card.time}</p>
      </div>
      <img className='moviesCard__poster' src={card.image} alt='постер фильма'/>

      {location.pathname === '/saved-movies' &&
        <button type='button' aria-label='удалить фильм' className='moviesCard__button' onClick={handleClick}>
          <img className='moviesCard__click' alt='удалить' src={deleteFilmButton}/>
        </button>
      }

      {location.pathname === '/movies' &&
        <button type='button' aria-label='сохранить'
                className={`moviesCard__button ${!isSaved ? 'moviesCard__button_save' : 'moviesCard__button_saved'}`}
                onClick={handleClick}>
          {!isSaved ? "Сохранить" :
            <img className='moviesCard__add' alt='добавить' src={savedButton}/>}
        </button>
      }
    </div>
  );
};


export default MoviesCard;
