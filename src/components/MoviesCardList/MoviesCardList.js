import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import {useLocation} from "react-router-dom";
import {useEffect, useId, useState} from "react";

function MoviesCardList({MoviesArray, onSaveMovie, infoMessage, isNullMoviesArray, isEmptyMoviesArray, savedMoviesArray}) {
  const [innerWidthScreen, setInnerWidthScreen] = useState(window.innerWidth);
  window.addEventListener('resize', ()=>{setInnerWidthScreen(window.innerWidth)});

  const location = useLocation();
  const isPageSavedMovies = location.pathname === '/saved-movies';

  const [page, setPage] = useState(1);
  let perPage = innerWidthScreen > 900 ? 12 : (innerWidthScreen >= 700 ? 8 : 5);
  const [printMoviesArray, setPrintMoviesArray] = useState(MoviesArray?.slice(0, page*perPage));
  const handleClickMoreMovies = () => setPage(page + 1);
  let visibleButton = page < Math.ceil(MoviesArray?.length / perPage);

  useEffect(() => {
    setPrintMoviesArray(MoviesArray?.slice(0, page*perPage));
  }, [page, perPage, MoviesArray]);


  return (
    <section className='movieCardList'>
      <div className='movieCardList__container'>
        {printMoviesArray?.map((Movie) => (
          <MoviesCard key={Movie.id} Movie={Movie} onSaveMovie={onSaveMovie} savedMoviesArray={savedMoviesArray}/>
        ))}
      </div>

      <div className="movieCardList__info-box">
        {isNullMoviesArray &&
          <i className="movieCardList__preloader"/>
        }
        {isEmptyMoviesArray &&
          <p className="movieCardList__info-message">{infoMessage}</p>
        }
      </div>

      {visibleButton ?
        <button className='movieCardList__button' aria-label='Загрузить ещё' type='button' onClick={handleClickMoreMovies}>Ещё</button>
        :
        <div className='movieCardList__plug-button'/>
      }

      {isPageSavedMovies && <div className='movieCardList__plug-button_indent'/>}

    </section>
  );
}

export default MoviesCardList;
