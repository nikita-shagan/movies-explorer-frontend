import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards, savedCards, cardsCount = 99999, onLikeCard, onDeleteCard}) {
  const isCardLiked = (cardId) => {
    return savedCards.some(({ movieId }) => movieId === cardId)
  }

  return (
    <ul className='movies-card-list'>
      {cards.slice(0, cardsCount).map((card) => (
        <li key={card.id || card._id}>
          <MoviesCard
            card={card}
            onLikeCard={onLikeCard}
            onDeleteCard={onDeleteCard}
            isLiked={card.id && isCardLiked(card.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default MoviesCardList;
