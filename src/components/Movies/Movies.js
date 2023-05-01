import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {cards} from '../../utils/cards';
import './Movies.css';

const Movies = () => {
  const [innerWidthScreen, setInnerWidthScreen] = useState(window.innerWidth);
  window.addEventListener('resize', ()=>{setInnerWidthScreen(window.innerWidth)});

  //временная логика для управления количеством карточек на разных разрешениях
  let arrCards = [];
  let perPage = innerWidthScreen > 900 ? 12 : (innerWidthScreen >= 700 ? 8 : 5);
  let visibleButton = ((innerWidthScreen > 900 && cards.length > 12) ||
                       (innerWidthScreen >= 700 && cards.length > 8) ||
                       (innerWidthScreen < 700 && cards.length > 5));

  for (let i = 0; i < perPage; i++) {
    arrCards.push( cards[i]);
  }

  return (
    <main className='movies'>
      <SearchForm/>
      <MoviesCardList cards={arrCards} visibleButton={visibleButton}/>
    </main>
  );
}

export default Movies;
