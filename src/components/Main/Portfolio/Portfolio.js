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
            href='https://wordpress.org/plugins/post-to-telegram/'
            className='portfolio__item-link'
            target='_blank'
            rel="noreferrer"
          >
            Плагин Post To Telegram
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            href='https://detailingauto24.ru/'
            className='portfolio__item-link'
            target='_blank'
            rel="noreferrer"
          >
            Сайт для салона автодетейлинга
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            href='https://egsite.ru/vpost/'
            className='portfolio__item-link'
            target='_blank'
            rel="noreferrer"
          >
            Плагин VPost
          </a>
        </li>
      </ul>
    </article>
  );
}

export default Portfolio;
