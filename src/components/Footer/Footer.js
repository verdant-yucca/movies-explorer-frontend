import './Footer.css';
import {Link} from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х
        <Link className={'footer__link footer__link_grey'} to={"/movies"}> BeatFilm.</Link>
      </p>
      <div className="footer__container">
        <p className="footer__copy">&copy; {year}</p>
        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru" target="blank">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/verdant-yucca" target="blank">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
