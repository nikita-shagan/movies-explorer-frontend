import {SHORT_FILM_DURATION} from "../constants/constants";

const simplifyStrings = (strings) => strings.map((str) => str.toLowerCase().trim())

const filterMovies = (movies = [], keyWord = '', shortFilmsToggle = true, shortFilmDuration = SHORT_FILM_DURATION) => {
  return movies.filter((item) => {
    const [name, key] = simplifyStrings([item.nameRU, keyWord])
    return name.includes(key) && (shortFilmsToggle || item.duration > shortFilmDuration)
  })
}

export { filterMovies };
