import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__text'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <p className='footer__year'>
          © 2023
        </p>
        <ul className='footer__links'>
          <li>
            <a href='https://practicum.yandex.ru/' className='footer__link'>
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a href='https://github.com/nikita-shagan' className='footer__link'>
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
