import "./AboutMe.css"
import photo from "../../../images/photo.jpg"

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
              Никита
            </h3>
            <p className='about-me__job'>
              Full-stack разработчик, 23 года
            </p>
            <p className='about-me__description'>
              В прошлом году закончил физмат по профилю учитель математики и информатики.
              После выпуска начал изучать фронтенд разработку и брать заказы на фрилансе.
              Последние пол года работал full-stack разработчиком в компании Egsite.
              Занимался созданием плагинов для wordpress на PHP и React.
              Также в дополнение к плагинам написал телеграм бота на Node.js (grammY + Express.js)
              и API для работы с ВК на Java Spring Boot. Увлекаюсь гитарой и шахматами.
              Люблю решать сложные задачки и радоваться когда все заработало как надо.
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
