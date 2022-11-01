import React from 'react';
import profileFoto from '../../images/profile-foto.jpg'
import arrow from '../../images/arrow.svg'

function AboutMe() {

    const date = new Date();
    const dateOfBirth = '1983-8-23';
    const dateOfBirthInMS = Date.parse(dateOfBirth);
    const whatIsMyAgeAgain = Math.floor((date - dateOfBirthInMS) / (1000 * 3600 * 24 * 365));


    return (
        <section id='about-me'>
          <h2 className='section__catchword'>Студент</h2>
          <div className='about-me__profile-info'>
                <div className='profile-info__description'>
                    <h3 className='profile-info__name'>Андрей</h3>
                    <h4 className='profile-info__profession'>Фронтенд-разработчик, {whatIsMyAgeAgain} лет</h4>
                    <p className='profile-info__bio'>Я&nbsp;начинающий веб-разработчик. Еще во&nbsp;времена AOL, Yahoo и&nbsp;narod.ru
                        увлекался созданием простейших сайтов и&nbsp;вот, наконец, больше не&nbsp;могу сопротивляться желанию создавать и&nbsp;улучшать веб приложения,
                        пришло время заняться этим серьезно. Большую часть свободного времени
                        совершенствую свои навыки, учусь новому, впитываю информацию.
                        Ещё люблю играть в&nbsp;баскетбол и&nbsp;катать на&nbsp;своих велосипедах, ходить в&nbsp;велопоходы.
                    </p>
                    <a href='https://github.com/mczoom' className='profile-info__contact-link link' target='_blank'>Github</a>
                </div>
                <img src={profileFoto} className='profile-info__foto' alt='Моё фото'></img>
          </div>
          <div className='about-me__portfolio'>
              <h4 className='portfolio__header'>Портфолио</h4>
              <ul className='about-me__portfolio-projects list'>
                <li>
                  <a href='https://github.com/mczoom/how-to-learn' className='portfolio__project' target='_blank'>
                    <span >Статичный сайт</span>
                    <div className='portfolio__link-icon'></div>
                  </a>
                </li>
                <li>
                  <a href='https://mczoom.github.io/russian-travel/' className='portfolio__project' target='_blank'>
                    <span>Адаптивный сайт</span>
                    <div className='portfolio__link-icon'></div>
                  </a>
                </li>
                <li>
                  <a href='https://myflicks.nomoredomains.sbs' className='portfolio__project' target='_blank'>
                    <span>Одностраничное приложение</span>
                    <div className='portfolio__link-icon'></div>
                  </a>
                </li>
              </ul>
          </div>
        </section>
    );
}

export default AboutMe;