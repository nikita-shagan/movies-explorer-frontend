import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesSection from "../MoviesSection/MoviesSection";

function SavedMovies() {
  const cards = [];

  for (let i = 0; i < 100; i++) {
    cards.push(i);
  }

  return (
    <MoviesSection>
      <SearchForm/>
      <MoviesCardList cards={cards} cardsCount={3} areSaved={true}/>
    </MoviesSection>
  );
}

export default SavedMovies;
