import './SearchForm.css';

const SearchForm = () => (
  <section className="search">
    <div className="search__container">
      <form className="search__form" name="searchForm" noValidate>
        <input className="search__input" type="text" name="filmInput" id="filmInput" required placeholder="Фильм"
               minLength="2" maxLength="100"/>
        <button type="submit" className="search__search-btn">Найти</button>
      </form>
    </div>
    <div className="search__shortFilms">
      <div className="search__checkbox-group">
        <input type="checkbox" className="search__checkbox" id="checkbox"/>
        <label htmlFor="checkbox" className="search__checkbox-label"></label>
      </div>
      <p className="search__shortFilms-text">Короткометражки</p>
    </div>
  </section>
);

export default SearchForm;
