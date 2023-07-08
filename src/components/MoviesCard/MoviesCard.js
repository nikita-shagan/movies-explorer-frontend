import "./MoviesCard.css"
import movieImage from "../../images/movie-sample.png"

function MoviesCard({ isSaved }) {
  return (
    <article className='movies-card'>
      <div className='movies-card__container'>
        <div className='movies-card__heading'>
          <h3 className='movies-card__title'>
            Название Фильма
          </h3>
          <p className='movies-card__subtitle'>
            1ч 42м
          </p>
        </div>
        {
          isSaved
            ? <button className='movies-card__delete'/>
            : <button className={`movies-card__like ${'movies-card__like_active'}`}/>
        }
      </div>
      <img src={movieImage} alt='Обложка фильма'/>
    </article>
  );
}

export default MoviesCard;
