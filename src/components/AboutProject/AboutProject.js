import React from 'react';

function AboutProject() {
     
      
    return (
        <section className='about-project'>
          <h2 className='about-project__header section__header'>О проекте</h2>
          <div className='about-project__underline section__underline'></div>
          <div className='about-project__description description'>
            <div className='about-project__description-wrap'>
                <h3 className='description__header'>Дипломный проект включал 5 этапов</h3>
                <p className='description__text'>Составление плана, работу над бэкендом, вёрстку, 
                  добавление функциональности и финальные доработки.
                </p>
            </div>
            <div className='about-project__description-wrap'>
                <h3 className='description__header'>На выполнение диплома ушло 5 недель</h3>
                <p className='description__text'>У каждого этапа был мягкий и жёсткий дедлайн, 
                  которые нужно было соблюдать, чтобы успешно защититься.
                </p>
            </div>
          </div>
          <div className='about-project__timeline timeline'>
            <div className='timeline__wrap'>
                <div className='timeline__back-end'>
                    <p className='timeline__text'>1 неделя</p>
                </div>
                <span className='timeline__span'>Back-end</span>              
            </div>
            <div className='timeline__wrap'>
                <div className='timeline__front-end'>
                    <p className='timeline__text'>4 недели</p>
                </div>
                <span className='timeline__span'>Front-end</span>
            </div>
          </div>
        </section>
    );
}

export default AboutProject;