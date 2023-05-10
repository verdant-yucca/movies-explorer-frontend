import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import {useLocation} from "react-router-dom";
import {useEffect} from "react";


function MoviesCardList({cards, visibleButton}) {
  const location = useLocation();
  const isPageSavedFilms = location.pathname === '/saved-movies';

  return (
    <section className='movieCardList'>
      <div className='movieCardList__container'>
        {cards.map((card) => (
          <MoviesCard key={card.id} card={card}/>
        ))}
      </div>
      {visibleButton ?
        <button className='movieCardList__button' aria-label='Загрузить ещё' type='button'>Ещё</button>
        :
        <div className='movieCardList__plug-button'/>
      }

      {isPageSavedFilms && <div className='movieCardList__plug-button_indent'/>}

    </section>
  );
}

export default MoviesCardList;
