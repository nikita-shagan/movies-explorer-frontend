import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useEffect, useState} from "react";
import MoviesSection from "../MoviesSection/MoviesSection";
import '../../utils/MoviesApi'
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";

function Movies() {
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);
  const [initialKeyWord, setInitialKeyWord] = useState('');
  const [initialShortFilmsToggle, setInitialShortFilmsToggle] = useState(false);
  const [cardsCount , setCardsCount] = useState(7);
  const [cardsCountStep , setCardsCountStep] = useState(7);
  const [movies, setMovies] = useState([]);
  const [moviesState, setMoviesState] = useState('list')

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies))
      setInitialKeyWord(localStorage.getItem('keyWord'))
      setInitialShortFilmsToggle(JSON.parse(localStorage.getItem('shortFilmsToggle')))
    }

    const handleWindowChange = () => {
      if (window.innerWidth <= 520) {
        setCardsCount(5);
        setCardsCountStep(5);
      } else {
        setCardsCount(7);
        setCardsCountStep(7);
      }
    }
    handleWindowChange();
    window.addEventListener('resize', handleWindowChange);

    return () => {
      window.removeEventListener('resize', handleWindowChange);
    }
  }, [])

  const handleSearchSubmit = ({ keyWord, shortFilmsToggle }) => {
    setMoviesState('loading');
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies)
        setMoviesState(movies.length ? 'list' : 'empty')
        localStorage.setItem('movies', JSON.stringify(movies))
        localStorage.setItem('keyWord', keyWord)
        localStorage.setItem('shortFilmsToggle', JSON.stringify(shortFilmsToggle))
      })
      .catch(() => {
        setMoviesState('error')
      });
  }

  const handleMoreCardsClick = () => {
    setCardsCount(cardsCount + cardsCountStep);
  }

  useEffect(() => {
    if (cardsCount >= movies.length || moviesState !== 'list') {
      setIsMoreButtonVisible(false)
    } else {
      setIsMoreButtonVisible(true)
    }
  }, [cardsCount, movies, moviesState])


  return (
    <MoviesSection>
      <SearchForm
        onSubmit={handleSearchSubmit}
        initialKeyWord={initialKeyWord}
        initialShortFilmsToggle={initialShortFilmsToggle}
      />
      {moviesState === 'list' && <MoviesCardList cards={movies} cardsCount={cardsCount}/>}
      {moviesState === 'loading' && <Preloader/>}
      {moviesState === 'empty' && <p>Ничего не найдено</p>}
      {moviesState === 'error' &&
        <p className='movies-section__error'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </p>
      }
      <button
        className={`movies-section__more-button ${!isMoreButtonVisible && 'movies-section__more-button_hidden'}`}
        onClick={handleMoreCardsClick}
      >
        Ещё
      </button>
    </MoviesSection>
  );
}

export default Movies;
