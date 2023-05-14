import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import mainApi from "../../utils/MainApi";
import {printErrorToConsole} from "../../utils/const";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMoviesArray, setSavedMoviesArray] = useState([]);
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      mainApi.getBasicInformation()
        .then(userData => setCurrentUser(userData))
        .catch(printErrorToConsole);

      mainApi.getInitialCards()
        .then(movies => setSavedMoviesArray(movies))
        .catch(printErrorToConsole);
    }
  }, [loggedIn]);

  const handleRegister = (data) => {
    console.log(data)
    mainApi.register(data)
      .then((res) => { if (res) handleLogin(data) })
      .catch((err) => {
        printErrorToConsole(err);
        setInfoMessage(err === 409 ? 'Пользователь с таким email уже существует' : 'При регистрации пользователя произошла ошибка');
      })
  }

  const handleLogin = (data) => {
    mainApi.login(data)
      .then((res) => {
        if (!res.token) return;
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        navigate('/movies');
        window.location.reload();
        setInfoMessage('Авторизация прошла успешно!');
      })
      .catch((err) => {
        printErrorToConsole(err);
        setInfoMessage(err === 401 ? 'Вы ввели неправильный логин или пароль' : 'При авторизации пользователя произошла ошибка')
      })
  }

  const checkToken = () => {
    const jwt = localStorage.getItem('token');

    if (!jwt) return;

    mainApi.check(jwt)
      .then(() => {setLoggedIn(true);})
      .catch(printErrorToConsole)
  }

  const handleEditProfile = (data) => {
    mainApi.editProfile(data)
      .then(result => {
        setCurrentUser(result);
        setInfoMessage('Профиль успешно изменен!');
      })
      .catch((err) => setInfoMessage(err === 409 ? 'Пользователь с таким email уже существует' : 'При обновлении профиля произошла ошибка'));
  }

  const signOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  }

  const onSaveMovie = (movie) => {
    if (!savedMoviesArray) return;
    const isCurrentMoviesaved = Boolean(movie._id);
    if (isCurrentMoviesaved) { //если удаляем фильм со страницы сохранённых
      mainApi.deleteCard(movie._id)
        .then(() => setSavedMoviesArray((state) => state.filter((c) => c._id !== movie._id)))
        .catch(err => {
          printErrorToConsole(err);
          setInfoMessage('Произошла ошибка при удалении фильма!');
        })
    } else { //если сохраняем/удаляем фильм со страницы фильмы
      const isSaved = savedMoviesArray.some(el => el.movieId === movie.id);
      if (!isSaved) {
        mainApi.addCard(movie)
          .then((newMovie) => setSavedMoviesArray([newMovie, ...savedMoviesArray]))
          .catch(err => {
            printErrorToConsole(err);
            setInfoMessage('Произошла ошибка при сохранении фильма!');
          })
      } else {
        let currentSavedMovie = {};
        savedMoviesArray.forEach(el => {
          if (el.movieId === movie.id) currentSavedMovie = el;
        });
        mainApi.deleteCard(currentSavedMovie._id)
          .then(() => setSavedMoviesArray((state) => state.filter((c) => c.movieId !== movie.id)))
          .catch(err => {
            printErrorToConsole(err);
            setInfoMessage('Произошла ошибка при удалении фильма!');
          })
      }
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>

          <Route exact path={'/'} element={
            <>
              <Header loggedIn = {loggedIn}/>
              <Main />
              <Footer />
            </>
          }/>

          <Route exact path={'/movies'} element={
            <ProtectedRoute loggedIn = {loggedIn}>
              <Header loggedIn = {loggedIn}/>
              <Movies savedMoviesArray={savedMoviesArray} onSaveMovie={onSaveMovie}/>
              <Footer />
            </ProtectedRoute>
          }/>

          <Route exact path={'/saved-movies'} element={
            <ProtectedRoute loggedIn = {loggedIn}>
              <Header loggedIn = {loggedIn}/>
              <SavedMovies allSavedMoviesArray={savedMoviesArray} onSaveMovie={onSaveMovie}/>
              <Footer />
            </ProtectedRoute>
          }/>

          <Route exact path={'/profile'} element={
            <ProtectedRoute loggedIn = {loggedIn}>
              <Header loggedIn = {loggedIn}/>
              <Profile handleEditProfile={handleEditProfile} signOut={signOut} infoMessage={infoMessage}/>
            </ProtectedRoute>
          }/>

          <Route exact path={'/signup'} element={<Register handleRegister={handleRegister} infoMessage={infoMessage}/>}/>
          <Route exact path={'/signin'} element={<Login handleLogin={handleLogin} infoMessage={infoMessage}/>}/>
          <Route exact path={'*'} element={<NotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
