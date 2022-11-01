import React from 'react';


function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer'>
          <h3 className='footer__header footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
          <div className='footer__divider'></div>
          <div className='footer__wrap'>
              <p className='footer__copyright footer__text'>&copy; {currentYear === 2022 ? currentYear : `2022 - ${currentYear}`}</p>
              <ul className='footer__links links footer__text'>
                  <li className='links__link'><a href='https://practicum.yandex.ru/' className='link' target='_blank' rel="noreferrer">Яндекс.Практикум</a></li>
                  <li className='links__link'><a href='https://github.com/mczoom' className='link' target='_blank' rel="noreferrer">Github</a></li>
              </ul>
          </div>
        </footer>
    );
}

export default Footer;