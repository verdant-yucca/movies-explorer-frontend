import './Promo.css';
import promo_image from '../../images/promo-image.png';

function Promo() {
  return (
    <section className="promo">
      <img className="promo__image" src={promo_image} alt="WEB-image"/>
      <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
      {/*<h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>*/}
      <h2 className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h2>
      <a className="nav__link" href="#about-project" >Узнать больше</a>
    </section>

  );
}

export default Promo;
