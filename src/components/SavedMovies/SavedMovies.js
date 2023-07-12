import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesSection from "../MoviesSection/MoviesSection";
import mainApi from "../../utils/api/MainApi";
import {useState} from "react";
import {filterMovies} from "../../utils/filters/moviesFilters";

function SavedMovies({ savedMovies, setSavedMovies }) {
  const [keyWord, setKeyWord] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(true);
  const [searchedMovies, setSearchedMovies] = useState(savedMovies);

  const handleKeyWordChange = (evt) => {
    setKeyWord(evt.target.value)
  }

  const handleShortFilmsToggleChange = (evt) => {
    const newShortFilmsToggle = evt.target.checked;
    setShortFilmsToggle(newShortFilmsToggle);
    setSearchedMovies(filterMovies(savedMovies, keyWord, newShortFilmsToggle));
  }

  const handleSearchSubmit = () => {
    setSearchedMovies(filterMovies(savedMovies, keyWord, shortFilmsToggle))
  }

  const handleDeleteSavedMovie = (id) => {
    mainApi.deleteMovie(id)
      .then(() => mainApi.getMovies())
      .then((movies) => {
        setSavedMovies(movies)
        setSearchedMovies(filterMovies(movies, keyWord, shortFilmsToggle))
      })
      .catch((err) => console.log(err))
  }

  return (
    <MoviesSection>
      <SearchForm
        keyWord={keyWord}
        onKeyWordChange={handleKeyWordChange}
        shortFilmsToggle={shortFilmsToggle}
        onShortFilmsChange={handleShortFilmsToggleChange}
        onSubmit={handleSearchSubmit}
      />
      {searchedMovies.length
        ? <MoviesCardList cards={searchedMovies} onDeleteCard={handleDeleteSavedMovie}/>
        : <p>Ничего не найдено</p>
      }
    </MoviesSection>
  );
}

export default SavedMovies;
