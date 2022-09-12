import React from 'react';
import profileFoto from '../../images/profile-foto.jpg'
import arrow from '../../images/arrow.svg'

function AboutMe() {
     
      
    return (
        <section id='about-me'>
          <h2 className='about-me__catchword section__catchword'>Студент</h2>
          <div className='about-me__underline section__underline'></div>
          <div className='about-me__profile profile'>
                <div className='profile__description'>
                    <h3 className='profile__name'>Андрей</h3>
                    <h4 className='profile__profession'>Фронтенд-разработчик, 38 лет</h4>
                    <p className='profile__bio'>Я родился в Москве, в семидесятом.
                        На краю города, моча рано ударила в голову:
                        В четыре активно ругался матом.
                        В детском саду девочки впервые показали мне п****.
                        Потом школа, вонючая форма.
                        Драки, клей - так я становился сильней.
                        Воровал деньги в раздевалке, в восемь начал курить.
                        В одиннадцать кинул первую палку, забил на родителей.
                    </p>
                    <a href='ya.ru' className='profile__github-link link'>Github</a>
                </div>
                <img src={profileFoto} className='profile__foto' alt='Моё фото'></img>
          </div>          
          <div className='about-me__portfolio portfolio'>
              <h4 className='portfolio__header'>Портфолио</h4>
              <div className='portfolio__project'>
                  <a href='ya.ru' className='link'>Статичный сайт</a><img src={arrow} />
              </div>
              <div className='portfolio__divider'></div>
              <div className='portfolio__project'>
                  <a href='ya.ru' className='link'>Адаптивный сайт</a><img src={arrow} />
              </div>
              <div className='portfolio__divider'></div>
              <div className='portfolio__project'>
                  <a href='ya.ru' className='link'>Одностраничное приложение</a><img src={arrow} />
              </div>
          </div>          
        </section>
    );
}

export default AboutMe;