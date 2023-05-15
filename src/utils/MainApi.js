import { serverUrl, jwt, onError } from "./const";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  getBasicInformation() {
    return fetch (`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then (onError);
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then (onError);
  };

  addCard(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.created_at,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id
      })
    })
      .then (onError);
  };

  deleteCard(deleteId) {
    return fetch(`${this._baseUrl}/movies/${deleteId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
    })
      .then (onError);
  };

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
      .then (onError);
  };

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": data.name,
        "email": data.email,
        "password": data.password
      })
    })
      .then (onError);
  }

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": data.email,
        "password": data.password

      })
    })
      .then (onError);
  }

  check(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
      }
    })
      .then (onError);
  }
}

const mainApi = new MainApi({
  baseUrl: serverUrl,
  headers: {
    authorization: jwt,
    'Content-Type': 'application/json'
  }
});

export default mainApi;
