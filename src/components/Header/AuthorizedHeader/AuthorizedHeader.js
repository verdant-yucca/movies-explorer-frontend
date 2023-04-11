import {Link} from 'react-router-dom';
import './AuthorizedHeader.css';
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

function AuthorizedHeader() {
  return (
    <nav className="header__authorized">
      <div className="header__links">
        <Link to="/movies" className="header__link">Фильмы</Link>
        <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
      </div>
      <Link to="/profile" className="header__account">
        <p className="header__profile">Аккаунт</p>
        <div className="header__icon"></div>
      </Link>
      <HamburgerMenu/>
    </nav>
  );
}

export default AuthorizedHeader;
