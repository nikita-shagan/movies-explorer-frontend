import "./MoviesCard.css"
import {useLocation} from "react-router-dom";
import {
  MINUTES_IN_HOUR,
  MOVIES_API_URL
} from "../../utils/constants/constants";
import {MOVIES_ROUTE, SAVED_MOVIES_ROUTE} from "../../utils/constants/routes";

function MoviesCard({ isLiked, card, onLikeCard, onDeleteCard }) {
  const currentPath = useLocation().pathname;

  const handleCardClick = (evt) => {
    const classes = evt.target.classList;
    if (!(classes.contains('movies-card__like') || classes.contains('movies-card__delete'))) {
      window.open(card.trailerLink, '_blank')
    }
  }

  const handleLikeClick = () => {
    onLikeCard(card, isLiked)
  }

  const handleDeleteClick = () => {
    onDeleteCard(card._id)
  }

  return (
    <article className='movies-card' onClick={handleCardClick}>
      <div className='movies-card__container'>
        <div className='movies-card__heading'>
          <h3 className='movies-card__title'>
            {card.nameRU}
          </h3>
          <p className='movies-card__subtitle'>
            {Math.trunc(card.duration / MINUTES_IN_HOUR)}ч {card.duration % MINUTES_IN_HOUR}м
          </p>
        </div>
        {
          currentPath === SAVED_MOVIES_ROUTE &&
            <button onClick={handleDeleteClick} className='movies-card__delete'/>
        }
        {
          currentPath === MOVIES_ROUTE &&
            <button
              className={`movies-card__like ${isLiked && 'movies-card__like_active'}`}
              onClick={handleLikeClick}
            />
        }
      </div>
      <img
        src={card.image.url ? `${MOVIES_API_URL}${card.image.url}` : card.image}
        alt='Обложка фильма'
        className='movies-card__image'
      />
    </article>
  );
}

export default MoviesCard;
