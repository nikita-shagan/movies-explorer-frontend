import './AboutMe.css'
import photo from '../../../images/photo.png'

function AboutMe({ children }) {
  return (
    <section className='about-me'>
      <div className='about-me__container'>
        <h2 className='about-me__title'>
          Студент
        </h2>
        <article className='about-me__content'>
          <div className='about-me__info'>
            <h3 className='about-me__name'>
              Виталий
            </h3>
            <p className='about-me__job'>
              Фронтенд-разработчик, 30 лет
            </p>
            <p className='about-me__description'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ.
              У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
              Недавно начал кодить. С&nbsp;2015 года работал в компании «СКБ Контур».
              После того, как прошёл курс по веб-разработке, начал заниматься
              фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a
              href='https://github.com/nikita-shagan'
              className='about-me__git-repos'
              target='_blank'
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <img src={photo} alt='Портрет в профиль' className='about-me__photo'/>
        </article>
        {children}
      </div>
    </section>
  );
}

export default AboutMe;
