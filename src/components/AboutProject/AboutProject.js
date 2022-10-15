import React from 'react';

function AboutProject() {
     
      
    return (
        <section id='about-project'>
          <h2 className='section__catchword'>О проекте</h2>          
          <div className='about-project__description'>
            <div className='about-project__description-article'>
                <h3 className='description__header'>Дипломный проект включал 5 этапов</h3>
                <p className='description__text'>Составление плана, работу над бэкендом, вёрстку, 
                  добавление функциональности и финальные доработки.
                </p>
            </div>
            <div className='about-project__description-article'>
                <h3 className='description__header'>На выполнение диплома ушло 5 недель</h3>
                <p className='description__text'>У каждого этапа был мягкий и жёсткий дедлайн, 
                  которые нужно было соблюдать, чтобы успешно защититься.
                </p>
            </div>
          </div>
          <div className='about-project__timeline'>
            <div className='about-project__timeline-sector-1'>
                <div className='timeline-sector__back-end'>
                    <p className='timeline-sector__text'>1 неделя</p>
                </div>
                <span className='timeline-sector__span'>Back-end</span>              
            </div>
            <div className='about-project__timeline-sector-2'>
                <div className='timeline-sector__front-end'>
                    <p className='timeline-sector__text'>4 недели</p>
                </div>
                <span className='timeline-sector__span'>Front-end</span>
            </div>
          </div>
        </section>
    );
}

export default AboutProject;