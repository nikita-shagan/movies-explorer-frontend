import "./Portfolio.css"

function Portfolio() {
  return (
    <article className='portfolio'>
      <h3 className='portfolio__title'>
        Портфолио
      </h3>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a
            href='https://nikita-shagan.github.io/soy-landing/'
            className='portfolio__item-link'
            target='_blank'
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            href='https://nikita-shagan.github.io/silk-road/'
            className='portfolio__item-link'
            target='_blank'
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            href='https://detailingauto24.ru/'
            className='portfolio__item-link'
            target='_blank'
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </article>
  );
}

export default Portfolio;
