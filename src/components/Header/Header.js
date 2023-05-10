import {Link} from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import AuthorizedHeader from './AuthorizedHeader/AuthorizedHeader';
import UnauthorizedHeader from './UnauthorizedHeader/UnauthorizedHeader';

function Header({loggedIn}) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип"/>
      </Link>
      {loggedIn ? <AuthorizedHeader/> : <UnauthorizedHeader/>}
    </header>
  );
}

export default Header;
