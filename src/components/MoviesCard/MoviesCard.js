import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import words from '../../images/covers/33_words.png';




function MoviesCard({cover, title, duration, link}) {

    const location = useLocation();

    const durationHours = Math.floor(duration/60);
    const durationMinutes = duration % 60;
     
      
    return (
        <div className='card'>
            <a href={link} className='link' target='_blank'>
                <img src={`https://api.nomoreparties.co${cover}`} className='card__image' alt='Обложка карточки в виде кадра из фильма' />
            </a>
            <div className='card__title-wrap'>
            <a href='ya.ru' className='link' target='_blank'>
                <span className='card__title'>{title}</span>
            </a>
            {location.pathname === '/saved-movies' ? 
                <button className='card__delete-like-button' type='button'></button> : 
                <button className='card__like-button' type='button'></button>
            }                       
            </div>
                {duration > 60 ? 
                <span className='card__film-duration'>{durationHours}ч {durationMinutes}м</span> :
            <div>
                {(duration % 60) === 0 ?
                <span className='card__film-duration'>{durationHours*60}м</span> :
                <span className='card__film-duration'>{durationMinutes}м</span>
                }
            </div>
            }
            
            
        </div>
    );
}

export default MoviesCard;