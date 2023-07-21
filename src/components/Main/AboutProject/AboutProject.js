import "./AboutProject.css"

function AboutProject() {
  return (
    <section className='about-project'>
      <div className='about-project__container'>
        <h2 className='about-project__title'>
          О проекте
        </h2>
        <ul className='about-project__articles'>
          <li>
            <article>
              <h3 className='about-project__article-heading'>
                Дипломный проект включал 5 этапов
              </h3>
              <p className='about-project__article-text'>
                Составление плана, работу над бэкендом, вёрстку,
                добавление функциональности и финальные доработки.
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className='about-project__article-heading'>
                На выполнение диплома ушло 5 недель
              </h3>
              <p className='about-project__article-text'>
                У каждого этапа был мягкий и жёсткий дедлайн,
                которые нужно было соблюдать, чтобы успешно защититься.
              </p>
            </article>
          </li>
        </ul>
        <ul className='about-project__time-scheme'>
          <li
            className='about-project__time-scheme-stepabout-project__time-scheme-step_type_backend'
          >
            <p
              className='
                about-project__time-scheme-step-period
                about-project__time-scheme-step-period_type_backend
              '
            >
              1 неделя
            </p>
            <p className='about-project__time-scheme-step-name'>
              Back-end
            </p>
          </li>
          <li className='about-project__time-scheme-step'>
            <p className='about-project__time-scheme-step-period'>
              4 недели
            </p>
            <p className='about-project__time-scheme-step-name'>
              Front-end
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
