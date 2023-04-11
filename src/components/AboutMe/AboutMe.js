import './AboutMe.css';
import photo from '../../images/portfolio-photo.jfif';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__section-title">Студент</h2>
      <div className="about-me__description">
        <div className="about-me__column">
          <h3 className="about-me__title">Роман</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 25 лет</p>
          <p className="about-me__text">Я родился и живу в Ангарске, закончил факультет ИВТ в АнГТУ.
            Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2020 года работал в компании «К12».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
            ушёл с постоянной работы.
          </p>
          <div className="about-me__links">
            <a className="about-me__link" href="https://github.com/verdant-yucca" target="blank">Github</a>
          </div>
        </div>
        <div className="about-me__column">
          <img className="about-me__photo" src={photo} alt="студент"/>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
