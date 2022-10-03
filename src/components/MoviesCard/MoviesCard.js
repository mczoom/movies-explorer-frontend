import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';




function MoviesCard({movie, cover, title, duration, link, handleLike, onDelete, deleteSaved}) {

    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation();

    const [isLiked, setIsLiked] = React.useState(false)

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    const currentUserSavedMovies = savedMovies.filter((movie) => (movie.owner === currentUser.userId));

    const isMovieSaved = currentUserSavedMovies.some(function(film) {
        return film.movieId === movie.id;
    });
   
    const likeButtonClassName = `card__like-button ${isMovieSaved ? 'card__like-button_liked' : ''}`;

    const durationHours = Math.floor(duration/60);
    const durationMinutes = duration % 60;

    
    function like() {        
        if(!isMovieSaved) {
            handleLike(movie);
            setIsLiked(!isLiked);
            return;
        } 
        removeLike(movie.id);        
    }
    

    function removeLike(id) {
        const cardId = currentUserSavedMovies.find((movie) => movie.movieId === id)        
        onDelete(cardId);
        setIsLiked(false);
    }


    function unLike() {        
        onDelete(movie);
        setIsLiked(false);
    }
     
      
    return (
        <div className='card'>
            <a href={link} className='link' target='_blank'>
                <img src={cover} className='card__image' alt='Обложка карточки в виде кадра из фильма' />
            </a>
            <div className='card__title-wrap'>
            <a href='ya.ru' className='link' target='_blank'>
                <span className='card__title'>{title}</span>
            </a>
            {location.pathname === '/saved-movies' ? 
                <button className='card__delete-like-button' type='button' onClick={unLike}></button> : 
                <button className={likeButtonClassName} type='button' onClick={like}></button>
            }                       
            </div>
                {duration > 60 && (duration % 60) !== 0 ? 
                <span className='card__film-duration'>{durationHours}ч {durationMinutes}м</span> :
            <>
                {(duration % 60) === 0 ?
                <span className='card__film-duration'>{durationHours}ч</span> :
                <span className='card__film-duration'>{durationMinutes}м</span>
                }
            </>
            }
            
            
        </div>
    );
}

export default MoviesCard;