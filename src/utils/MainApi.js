import Api from "./Api";

class MainApi extends Api {
  signUp({ name, email, password }) {
    return this._processQuery('/signup', 'POST', { name, email, password });
  }

  signIn({ email, password }) {
    return this._processQuery('/signin', 'POST', { email, password });
  }

  signOut() {
    return this._processQuery('/signout', 'POST');
  }

  getUser() {
    return this._processQuery('/users/me', 'GET');
  }

  updateUser({ name, email }) {
    return this._processQuery('/users/me', 'PATCH', { name, email });
  }

  createMovie(movieData) {
    return this._processQuery('/movies', 'POST', movieData);
  }

  getMovies() {
    return this._processQuery('/movies', 'GET');
  }

  deleteMovie(movieId) {
    return this._processQuery(`/movies/${movieId}`, 'DELETE');
  }
}

const mainApi = new MainApi('http://localhost:3001');
export default mainApi;
