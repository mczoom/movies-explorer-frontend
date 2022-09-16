import React from 'react';
import words from '../../images/covers/33_words.png';



function MoviesCard() {
     
      
    return (
        <div className='card'>
            <a href='ya.ru' className='link'>
                <img src={words} className='card__image'></img>
            </a>
            <div className='card__title-wrap'>
            <a href='ya.ru' className='link'>
                <span className='card__title'>33 слова о дизайне</span>
            </a>    
            <button className='card__like' type='button'></button>
            </div>
            <span className='card__film-duration'>1ч 47м</span>
        </div>
    );
}

export default MoviesCard;