import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards, cardsCount, areSaved }) {
  return (
    <ul className='movies-card-list'>
      {cards.slice(0, cardsCount).map((card, index) => (
        <li key={index}>
          <MoviesCard isSaved={areSaved}/>
        </li>
      ))}
    </ul>
  );
}

export default MoviesCardList;
