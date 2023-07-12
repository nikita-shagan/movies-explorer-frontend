import Api from "./Api";

class MainApi extends Api {
  constructor(url) {
    super(url);
    this._options.credentials = 'include'
  }

  signUp({ name, email, password }) {
    return this.processQuery('/signup', 'POST', { name, email, password });
  }

  signIn({ email, password }) {
    return this.processQuery('/signin', 'POST', { email, password });
  }

  signOut() {
    return this.processQuery('/signout', 'POST');
  }

  getUser() {
    return this.processQuery('/users/me', 'GET');
  }

  updateUser({ name, email }) {
    return this.processQuery('/users/me', 'PATCH', { name, email });
  }

  createMovie(movieData) {
    return this.processQuery('/movies', 'POST', movieData);
  }

  getMovies() {
    return this.processQuery('/movies', 'GET');
  }

  deleteMovie(movieId) {
    return this.processQuery(`/movies/${movieId}`, 'DELETE');
  }
}

const mainApi = new MainApi('http://localhost:3001');
export default mainApi;
