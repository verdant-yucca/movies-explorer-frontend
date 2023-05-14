import {Link} from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import {useState} from "react";
import isEmail from "validator/es/lib/isEmail";

function Register({handleRegister, infoMessage}) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'email') {
      if (isEmail(value)) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity('Некорректный формат E-mail');
      }
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleRegister(values);
  }

  return (
    <main className="main">
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__route"><img className="register__logo" src={logo} alt="Логотип"/></Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form name="formregister" className="register__form" noValidate>

            <p className="register__text">Имя</p>
            <input type="text" className={`register__input ${errors.name && 'register__input_error'}`} value={values.name} onChange={handleChange} name="name" id="name" required
                   minLength="2" maxLength="30" pattern='^[A-Za-zА-Яа-я /s -]+$'/>
            <p className="register__error">{errors.name}</p>

            <p className="register__text">E-mail</p>
            <input type="email" className={`register__input ${errors.email && 'register__input_error'}`} value={values.email} onChange={handleChange} name="email" id="email" required/>
            <p className="register__error">{errors.email}</p>

            <p className="register__text">Пароль</p>
            <input type="password" className={`register__input ${errors.password && 'register__input_error'}`} value={values.password} onChange={handleChange} name="password" id="password" required/>
            <p className="register__error">{errors.password}</p>

            <button type="submit" className="register__save-btn" onClick={handleSubmit} disabled={!isValid}>Зарегистрироваться</button>
            <p className="register__info-message">{infoMessage}</p>

          </form>
          <Link to="/signin" className="register__link">Уже зарегистрированы? <span
            className="register__blue">Войти</span></Link>
        </div>
      </section>
    </main>
  );
}

export default Register;
