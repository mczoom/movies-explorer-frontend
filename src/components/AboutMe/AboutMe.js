import React from 'react';
import profileFoto from '../../images/profile-foto.jpg'
import arrow from '../../images/arrow.svg'

function AboutMe() {
     
      
    return (
        <section id='about-me'>
          <h2 className='section__catchword'>Студент</h2>
          <div className='about-me__profile-info'>
                <div className='profile-info__description'>
                    <h3 className='profile-info__name'>Андрей</h3>
                    <h4 className='profile-info__profession'>Фронтенд-разработчик, 38 лет</h4>
                    <p className='profile-info__bio'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                      и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                      После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a href='https://github.com/mczoom' className='profile-info__contact-link link' target='_blank'>Github</a>
                </div>
                <img src={profileFoto} className='profile-info__foto' alt='Моё фото'></img>
          </div>          
          <div className='about-me__portfolio'>
              <h4 className='portfolio__header'>Портфолио</h4>
              <div className='portfolio__project'>
                  <a href='https://github.com/mczoom/how-to-learn' className='link' target='_blank'>Статичный сайт</a><img src={arrow} />
              </div>
              <div className='portfolio__divider'></div>
              <div className='portfolio__project'>
                  <a href='https://mczoom.github.io/russian-travel/' className='link' target='_blank'>Адаптивный сайт</a><img src={arrow} />
              </div>
              <div className='portfolio__divider'></div>
              <div className='portfolio__project'>
                  <a href='https://myflicks.nomoredomains.sbs' className='link' target='_blank'>Одностраничное приложение</a><img src={arrow} />
              </div>
          </div>          
        </section>
    );
}

export default AboutMe;