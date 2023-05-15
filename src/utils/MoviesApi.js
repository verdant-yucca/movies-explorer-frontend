import { onError, apiMoviesUrl} from "./const";

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}`)
      .then (onError);
  };
}

const moviesApi = new MoviesApi({
  baseUrl: apiMoviesUrl
});

export default moviesApi;
