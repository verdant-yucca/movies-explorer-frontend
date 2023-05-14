export const serverUrl = 'http://localhost:3001';
// export const serverUrl = 'https://api.movies-cohort47.nomoredomains.club';
export const apiMoviesUrl = 'https://api.nomoreparties.co/beatFilm-movies';
export const jwt = `Bearer ${localStorage.getItem('token')}`;
export const getItemFromLocalStorage = (item) => localStorage.getItem(item);
export const getInterfaceDuration = (durationMin) => `${Math.trunc(durationMin/60)}ч ${durationMin % 60}м`;
export const printErrorToConsole = err => console.log(err);
export const onError = res => {if (res.ok) return res.json(); else return Promise.reject(res.status);};
export const shortMovieDuration = 40;


