import Api from "./Api";
import {MOVIES_API_URL} from "../constants/constants";

class MoviesApi extends Api {
  getMovies() {
    return this.processQuery('/beatfilm-movies', 'GET')
  }
}

const moviesApi = new MoviesApi(MOVIES_API_URL);
export default moviesApi;
