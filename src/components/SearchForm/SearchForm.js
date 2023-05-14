import './SearchForm.css';
import {useState} from "react";

const SearchForm = ({getMovies, inputSearch, setInputSearch, onChangeFilterDuration, isShortMovies}) => {
  const [placeholder, setPlaceholder] = useState('');
  const handleChangeInput = (e) => {
    setInputSearch(e.target.value);
    setPlaceholder('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputSearch) {setPlaceholder('Нужно ввести ключевое слово')}
    else getMovies(inputSearch);
  }

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" name="searchForm" onClick={handleSubmit} noValidate>
          <div className="search__input-box">
            <input className="search__input" value={inputSearch} onChange={handleChangeInput} type="text" name="MovieInput" id="MovieInput" required
                   minLength="2" maxLength="100" placeholder={placeholder}/>
            <label className={`search__input-label ${(Boolean(inputSearch) || Boolean(placeholder)) && 'search__input-label_top'}`}>Фильм</label>
          </div>
          <button type="submit" className="search__search-btn">Найти</button>
        </form>
      </div>
      <div className="search__shortMovies">
        <div className="search__checkbox-group">
          <input type="checkbox" className="search__checkbox" checked={isShortMovies} onChange={onChangeFilterDuration} id="checkbox"/>
          <label htmlFor="checkbox" className="search__checkbox-label"></label>
        </div>
        <p className="search__shortMovies-text">Короткометражки</p>
      </div>
    </section>
  )
};

export default SearchForm;
