import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useEffect, useState} from "react";
import MoviesSection from "../MoviesSection/MoviesSection";

function Movies() {
  const [cardsCount , setCardsCount] = useState(7);

  useEffect(() => {
    if (window.innerWidth <= 520) {
      setCardsCount(5)
    }
  }, [])

  const cards = [];

  for (let i = 0; i < 100; i++) {
    cards.push(i);
  }

  return (
    <MoviesSection>
      <SearchForm/>
      <MoviesCardList cards={cards} cardsCount={cardsCount}/>
      <button className='movies-section__more-button'>
        Ещё
      </button>
    </MoviesSection>
  );
}

export default Movies;
