import React from 'react';
import words from '../../images/covers/33_words.png';



function MoviesCard() {
     
      
    return (
        <div className='card'>
            <img src={words} className='card__image'></img>
            <div className='card__title-wrap'>
                <span className='card__title'>33 слова о дизайне</span>
                <button className='card__like'></button>
            </div>
            <span className='card__film-duration'>1ч 47м</span>
        </div>
    );
}

export default MoviesCard;