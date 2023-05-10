import React, {useState} from 'react';
import {Link} from "react-router-dom";
import accountLogo from '../../../images/profile-icon.svg';
import './HamburgerMenu.css'

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handlerOnOpen = () => setIsOpen(true);
  const handlerOnClose = () => setIsOpen(false);
  const hamburgerButton = `hamburger-menu__button ${isOpen && 'hamburger-menu__button_hidden'}`;
  const hamburgerMenu = `hamburger-menu ${isOpen && 'hamburger-menu__active'}`;

  return (
    <>
      <button className={hamburgerButton} onClick={handlerOnOpen}/>
      <div className={hamburgerMenu}>
        <button className="hamburger-menu__close" onClick={handlerOnClose}/>
        <nav className="hamburger-menu__links">
          <Link className="hamburger-menu__link" to="/">Главная</Link>
          <Link className="hamburger-menu__link hamburger-menu__link_active" to="/movies">Фильмы</Link>
          <Link className="hamburger-menu__link" to="/saved-movies">Сохранённые фильмы</Link>
        </nav>
        <nav className='hamburger-menu__footer'>
          <Link className="hamburger-menu__login" to="/profile">Аккаунт</Link>
          <Link className="hamburger-menu__account" to="/profile" src={accountLogo} alt='изображение аватара'></Link>
        </nav>
      </div>
    </>
  )
}

export default HamburgerMenu;
