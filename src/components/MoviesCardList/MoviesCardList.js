import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards, cardsCount, areSaved }) {
  return (
    <ul className='movies-card-list'>
      {cards.slice(0, cardsCount).map((card) => (
        <li key={card.id}>
          <MoviesCard isSaved={areSaved} card={card}/>
        </li>
      ))}
    </ul>
  );
}

export default MoviesCardList;
