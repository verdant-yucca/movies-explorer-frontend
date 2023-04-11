import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {cardsSaved} from "../../utils/cards";

function SavedMovies() {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList cards={cardsSaved}/>
    </main>
  );
}

export default SavedMovies;
