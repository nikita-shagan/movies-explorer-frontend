import Api from "./Api";

class MoviesApi extends Api {
  getMovies() {
    return this.processQuery('/beatfilm-movies', 'GET')
  }
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co');
export default moviesApi;