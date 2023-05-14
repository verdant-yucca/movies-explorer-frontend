import {Link} from 'react-router-dom';
import './Profile.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useContext, useState} from "react";
import isEmail from "validator/es/lib/isEmail";

function Profile({infoMessage, signOut, handleEditProfile}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isBeChanged, setIsBeChanged] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    if (nameInput === 'name') {
      setName(valueInput);
      setIsBeChanged(valueInput !== currentUser.name || email !== currentUser.email);
    }
    if (nameInput === 'email') {
      setEmail(valueInput);
      setIsBeChanged(name !== currentUser.name || valueInput !== currentUser.email);
      if (isEmail(valueInput)) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity('Некорректный формат E-mail');
      }
    }
    setErrors({ ...errors, [nameInput]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email:email,
    }
    handleEditProfile(data);

    setIsBeChanged(name !== currentUser.name || email !== currentUser.email);
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form name="formprofile" className="profile__form" onSubmit={handleSubmit} noValidate>
            <p className="profile__text">Имя</p>
            <input type="text" className={`profile__input ${errors.name && 'profile__input_error'}`} value={name} onChange={handleChange} name="name" id="name" pattern='^[A-Za-zА-Яа-я /s -]+$' required minLength="2" maxLength="30"/>
            <p className="profile__error">{errors.name}</p>

            <p className="profile__text">E-mail</p>
            <input type="email" className={`profile__input ${errors.email && 'profile__input_error'}`} value={email} onChange={handleChange} name="email" id="email" required />
            <p className="profile__error">{errors.email}</p>

            <button type="submit" className="profile__save-btn" disabled={!isBeChanged || !isValid}>Редактировать</button>
            <p className="profile__info-message">{infoMessage}</p>

          </form>
          <Link to="/" className="profile__link" onClick={signOut}>Выйти из аккаунта</Link>
        </div>
      </section>
    </main>
  );
}

export default Profile;
