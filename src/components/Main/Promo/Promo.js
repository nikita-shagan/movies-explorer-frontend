import "./Promo.css"
import landingImage from '../../../images/landing-hero.svg'

function Promo() {
  return (
    <section className='promo'>
      <div className="promo__container">
        <h1 className='promo__text'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img src={landingImage} alt="Спираль" className='promo__image'/>
        </div>
    </section>
  );
}

export default Promo;
