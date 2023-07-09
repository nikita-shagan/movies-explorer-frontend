import "./MoviesCard.css"
import {useLocation} from "react-router-dom";

function MoviesCard({ isSaved, card }) {
  const currentPath = useLocation().pathname;

  const handleCardClick = (evt) => {
    if (!evt.target.classList.contains('movies-card__like')) {
      window.open(card.trailerLink, '_blank')
    }
  }

  const handleLikeClick = () => {
    console.log(card.nameRU)
  }

  return (
    <article className='movies-card' onClick={handleCardClick}>
      <div className='movies-card__container'>
        <div className='movies-card__heading'>
          <h3 className='movies-card__title'>
            {card.nameRU}
          </h3>
          <p className='movies-card__subtitle'>
            {Math.trunc(card.duration / 60)}ч {card.duration % 60}м
          </p>
        </div>
        {
          currentPath === '/saved-movies'
            ? <button className='movies-card__delete'/>
            : <button
                className={`movies-card__like ${isSaved && 'movies-card__like_active'}`}
                onClick={handleLikeClick}
              />
        }
      </div>
      <img
        src={`https://api.nomoreparties.co${card.image.url || card.image}`}
        alt='Обложка фильма'
        className='movies-card__image'
      />
    </article>
  );
}

export default MoviesCard;
