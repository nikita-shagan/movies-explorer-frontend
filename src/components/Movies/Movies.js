import "./Movies.css"
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useContext, useEffect, useState} from "react";
import MoviesSection from "../MoviesSection/MoviesSection";
import '../../utils/api/MoviesApi'
import moviesApi from "../../utils/api/MoviesApi";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/api/MainApi";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {filterMovies} from "../../utils/filters/moviesFilters";
import {
  DESKTOP_MOVIES_COUNT,
  LOCAL_STORAGE_KEY_WORD,
  LOCAL_STORAGE_MOVIES,
  LOCAL_STORAGE_SHORTS_TOGGLE,
  MOBILE_MOVIES_COUNT,
  MOBILE_SCREEN_RESOLUTION,
  MOVIES_API_URL,
  SEARCH_EMPTY_STATE,
  SEARCH_ERROR_STATE,
  SEARCH_LIST_STATE,
  SEARCH_LOADING_STATE
} from "../../utils/constants/constants";

function Movies({ savedMovies, setSavedMovies }) {
  const [keyWord, setKeyWord] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [moviesCount , setMoviesCount] = useState(7);
  const [moviesCountStep , setMoviesCountStep] = useState(7);
  const [moviesState, setMoviesState] = useState(SEARCH_LIST_STATE)
  const currentUser = useContext(CurrentUserContext);

  const updateSearchResults = (movies, keyWord, shortFilmsToggle) => {
    const newSearchedMovies = filterMovies(movies, keyWord, shortFilmsToggle);
    setSearchedMovies(newSearchedMovies);
    setMoviesState(newSearchedMovies.length ? SEARCH_LIST_STATE : SEARCH_EMPTY_STATE)
  }

  useEffect(() => {
    const handleWindowChange = () => {
      if (window.innerWidth <= MOBILE_SCREEN_RESOLUTION) {
        setMoviesCount(MOBILE_MOVIES_COUNT);
        setMoviesCountStep(MOBILE_MOVIES_COUNT);
      } else {
        setMoviesCount(DESKTOP_MOVIES_COUNT);
        setMoviesCountStep(DESKTOP_MOVIES_COUNT);
      }
    }

    const storedKeyWord = localStorage.getItem(LOCAL_STORAGE_KEY_WORD);
    if (storedKeyWord !== null) {
      const storedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVIES));
      const storedShortFilmsToggle = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SHORTS_TOGGLE));

      updateSearchResults(storedMovies, storedKeyWord, storedShortFilmsToggle)
      setMovies(storedMovies);
      setKeyWord(storedKeyWord);
      setShortFilmsToggle(storedShortFilmsToggle);
    }

    handleWindowChange();
    window.addEventListener('resize', handleWindowChange);

    return () => {
      window.removeEventListener('resize', handleWindowChange);
    }
  }, [])

  const handleKeyWordChange = (evt) => {
    setKeyWord(evt.target.value)
  }

  const handleShortFilmsToggleChange = (evt) => {
    const newShortFilmsToggle = evt.target.checked;
    const storedKeyWord = localStorage.getItem(LOCAL_STORAGE_KEY_WORD);

    setShortFilmsToggle(newShortFilmsToggle);
    updateSearchResults(movies, storedKeyWord, newShortFilmsToggle);
    localStorage.setItem(LOCAL_STORAGE_SHORTS_TOGGLE, JSON.stringify(newShortFilmsToggle))
  }

  const handleSearchSubmit = ({ keyWord, shortFilmsToggle }) => {
    if (movies.length) {
      updateSearchResults(movies, keyWord, shortFilmsToggle);
      localStorage.setItem(LOCAL_STORAGE_KEY_WORD, keyWord)
      localStorage.setItem(LOCAL_STORAGE_SHORTS_TOGGLE, JSON.stringify(shortFilmsToggle))
    } else {
      setMoviesState(SEARCH_LOADING_STATE);
      moviesApi.getMovies()
        .then((movies) => {
          updateSearchResults(movies, keyWord, shortFilmsToggle);
          setMovies(movies)
          localStorage.setItem(LOCAL_STORAGE_MOVIES, JSON.stringify(movies))
          localStorage.setItem(LOCAL_STORAGE_KEY_WORD, keyWord)
          localStorage.setItem(LOCAL_STORAGE_SHORTS_TOGGLE, JSON.stringify(shortFilmsToggle))
        })
        .catch((err) => {
          console.log(err)
          setMoviesState(SEARCH_ERROR_STATE)
        });
    }
  }

  const handleMoreCardsClick = () => {
    setMoviesCount(moviesCount + moviesCountStep);
  }

  const isMoreButtonHidden = () => {
    return moviesCount >= searchedMovies.length || moviesState !== SEARCH_LIST_STATE;
  }

  const onLikeMovie = ({ updated_at, created_at, image, id, ...cardData }, isLiked) => {
    if (isLiked) {
      mainApi.deleteMovie(savedMovies.find(({ movieId }) => movieId === id)._id)
        .then(() => mainApi.getMovies())
        .then((savedMovies) => setSavedMovies(savedMovies))
        .catch((err) => console.log(err))
    } else {
      mainApi.createMovie({
        ...cardData,
        image: `${MOVIES_API_URL}${image.url}`,
        thumbnail: `${MOVIES_API_URL}${image.formats.thumbnail.url}`,
        owner: currentUser._id,
        movieId: id,
      })
        .then(() => mainApi.getMovies())
        .then((movies) => setSavedMovies(movies))
        .catch((err) => console.log(err))
    }
  }

  return (
    <MoviesSection>
      <SearchForm
        onSubmit={handleSearchSubmit}
        keyWord={keyWord}
        shortFilmsToggle={shortFilmsToggle}
        onKeyWordChange={handleKeyWordChange}
        onShortFilmsChange={handleShortFilmsToggleChange}
      />

      {moviesState === SEARCH_LOADING_STATE && <Preloader/>}

      {moviesState === SEARCH_EMPTY_STATE && <p>Ничего не найдено</p>}

      {
        moviesState === SEARCH_LIST_STATE &&
          <MoviesCardList
            onLikeCard={onLikeMovie}
            cards={searchedMovies}
            cardsCount={moviesCount}
            savedCards={savedMovies}
          />
      }

      {
        moviesState === SEARCH_ERROR_STATE &&
          <p className='movies-section__error'>
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз.
          </p>
      }

      <button
        className={`movies-section__more-button ${isMoreButtonHidden() && 'movies-section__more-button_hidden'}`}
        onClick={handleMoreCardsClick}
      >
        Ещё
      </button>
    </MoviesSection>
  );
}

export default Movies;
