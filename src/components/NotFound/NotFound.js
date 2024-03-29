import {Link} from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">страница не найдена</p>
        <Link to="/" className="not-found__link">Назад</Link>
      </div>
    </section>
  );
}

export default NotFound;
