import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
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
