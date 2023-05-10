import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__element">
        <a href="https://github.com/verdant-yucca/how-to-learn" target="blank" className="portfolio__link">Статичный
          сайт</a>
      </div>
      <div className="portfolio__element">
        <a href="https://github.com/verdant-yucca/russian-travel" target="blank" className="portfolio__link">Адаптивный
          сайт</a>
      </div>
      <div className="portfolio__element">
        <a href="https://github.com/verdant-yucca/react-mesto-api-full" target="blank" className="portfolio__link">Одностраничное
          приложение</a>
      </div>
    </section>
  );
}

export default Portfolio;
