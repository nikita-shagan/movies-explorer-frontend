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
import { filterMovies } from "../../utils/filters/moviesFilters";

function Movies({ savedMovies, setSavedMovies }) {
  const [keyWord, setKeyWord] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [moviesCount , setMoviesCount] = useState(7);
  const [moviesCountStep , setMoviesCountStep] = useState(7);
  const [moviesState, setMoviesState] = useState('list')
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const handleWindowChange = () => {
      if (window.innerWidth <= 520) {
        setMoviesCount(5);
        setMoviesCountStep(5);
      } else {
        setMoviesCount(7);
        setMoviesCountStep(7);
      }
    }

    const storedKeyWord = localStorage.getItem('keyWord');
    if (storedKeyWord !== null) {
      const storedMovies = JSON.parse(localStorage.getItem('storedMovies'));
      const storedShortFilmsToggle = JSON.parse(localStorage.getItem('shortFilmsToggle'));
      setMovies(storedMovies);
      setSearchedMovies(filterMovies(storedMovies, storedKeyWord, storedShortFilmsToggle));
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
    setShortFilmsToggle(newShortFilmsToggle);
    setSearchedMovies(filterMovies(movies, keyWord, newShortFilmsToggle));
  }

  const handleSearchSubmit = ({ keyWord, shortFilmsToggle }) => {
    if (movies.length) {
      setSearchedMovies(filterMovies(movies, keyWord, shortFilmsToggle));
    } else {
      setMoviesState('loading');
      moviesApi.getMovies()
        .then((movies) => {
          const newSearchedMovies = filterMovies(movies, keyWord, shortFilmsToggle);
          localStorage.setItem('storedMovies', JSON.stringify(movies))
          localStorage.setItem('keyWord', keyWord)
          localStorage.setItem('shortFilmsToggle', JSON.stringify(shortFilmsToggle))
          setMovies(movies)
          setMoviesState(newSearchedMovies.length ? 'list' : 'empty')
          setSearchedMovies(newSearchedMovies);
        })
        .catch((err) => {
          console.log(err)
          setMoviesState('error')
        });
    }
  }

  const handleMoreCardsClick = () => {
    setMoviesCount(moviesCount + moviesCountStep);
  }

  const isMoreButtonHidden = () => {
    return moviesCount >= searchedMovies.length || moviesState !== 'list';
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
        image: `https://api.nomoreparties.co${image.url}`,
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
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

      {moviesState === 'loading' && <Preloader/>}

      {moviesState === 'empty' && <p>Ничего не найдено</p>}

      {
        moviesState === 'list' &&
          <MoviesCardList
            onLikeCard={onLikeMovie}
            cards={searchedMovies}
            cardsCount={moviesCount}
            savedCards={savedMovies}
          />
      }

      {
        moviesState === 'error' &&
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
