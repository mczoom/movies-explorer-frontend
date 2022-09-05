import React from 'react';


function Footer() {
     
      
    return (
        <footer className='footer'>
          <h3 className='footer__header footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
          <div className='footer__divider'></div>
          <div className='footer__wrap'>
              <p className='footer__copyright footer__text'>&copy; 2022</p>
              <ul className='footer__links links footer__text'>
                  <li className='links__link'><a href='ya.ru' className='link' >Яндекс.Практикум</a></li>
                  <li className='links__link'><a href='ya.ru' className='link'>Github</a></li>
              </ul>
          </div>
        </footer>
    );
}

export default Footer;