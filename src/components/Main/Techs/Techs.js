import "./Techs.css"

function Techs() {
  return (
    <section className='techs'>
      <div className="techs__container">
        <h2 className='techs__title'>
          Технологии
        </h2>
        <article className='techs__content'>
          <h3 className="techs__content-heading">
            7 технологий
          </h3>
          <p className="techs__content-text">
            На курсе веб-разработки мы освоили технологии,
            которые применили в дипломном проекте.
          </p>
          <ul className='techs__content-techs'>
            <li className='techs__content-techs-item'>
              HTML
            </li>
            <li className='techs__content-techs-item'>
              CSS
            </li>
            <li className='techs__content-techs-item'>
              JS
            </li>
            <li className='techs__content-techs-item'>
              React
            </li>
            <li className='techs__content-techs-item'>
              Git
            </li>
            <li className='techs__content-techs-item'>
              Express.js
            </li>
            <li className='techs__content-techs-item'>
              mongoDB
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Techs;
