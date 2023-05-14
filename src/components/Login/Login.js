import {Link} from 'react-router-dom';
import './Login.css';

import logo from '../../images/logo.svg';
import {useState} from "react";
import isEmail from "validator/es/lib/isEmail";

function Login({handleLogin, infoMessage}) {
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
    handleLogin(values);
  }

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__route"><img className="login__logo" src={logo} alt="лого"/></Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form name="formlogin" className="login__form" noValidate>

          <p className="login__text">E-mail</p>
          <input type="email"  className={`login__input ${errors.email && 'login__input_error'}`} value={values.email} onChange={handleChange} name="email" id="email" required />
          <p className={`login__error`}>{errors.email}</p>

          <p className="login__text">Пароль</p>
          <input type="password"  className={`login__input ${errors.password && 'login__input_error'}`} value={values.password} onChange={handleChange} name="password" id="password" required/>
          <p className={`login__error`}>{errors.password}</p>

          <button type="submit" className="login__save-btn" onClick={handleSubmit} disabled={!isValid}>Войти</button>
          <p className="login__info-message">{infoMessage}</p>

        </form>
        <Link to="/signup" className="login__link">Еще не зарегистрированы?<span
          className="login__blue"> Регистрация</span></Link>
      </div>
    </section>
  );
}

export default Login;
