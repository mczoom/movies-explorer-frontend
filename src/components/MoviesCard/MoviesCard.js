import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import words from '../../images/covers/33_words.png';




function MoviesCard() {

    const location = useLocation();
     
      
    return (
        <div className='card'>
            <a href='https://ya.ru' className='link' target='_blank'>
                <img src={words} className='card__image'></img>
            </a>
            <div className='card__title-wrap'>
            <a href='ya.ru' className='link' target='_blank'>
                <span className='card__title'>33 слова о дизайне</span>
            </a>
            {location.pathname === '/saved-movies' ? 
                <button className='card__delete-like-button'></button> : 
                <button className='card__like-button'></button>
            }                       
            </div>
            <span className='card__film-duration'>1ч 47м</span>
        </div>
    );
}

export default MoviesCard;