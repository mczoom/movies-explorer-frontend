import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';




function MoviesCard({movie, cover, title, savedMoviesPage, link, handleLike, onDelete, deleteSaved}) {

    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation();

    const [isLiked, setIsLiked] = React.useState(false)

    const film = {
        country: movie.country || 'нет',
        director: movie.director || 'Нет',
        duration: movie.duration || 0,
        year: movie.year || 'Нет',
        description: movie.description || 'Нет',
        cover: savedMoviesPage ? movie.image : `https://api.nomoreparties.co${movie.image.url}`,
        link: savedMoviesPage ? movie.trailer : movie.trailerLink,
        thumbnail: savedMoviesPage ? movie.thumbnail : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: savedMoviesPage ? movie._id : movie.id,
        title: movie.nameRU || 'Нет',
        nameEN: movie.nameEN || 'Нет',
    }

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const currentUserSavedMovies = savedMovies.filter((movie) => (movie.owner === currentUser.userId));

    const isMovieSaved = currentUserSavedMovies.some(function(film) {
        return film.movieId === movie.id;
    });
   
    const likeButtonClassName = `card__like-button ${isMovieSaved ? 'card__like-button_liked' : ''}`;

    const durationHours = Math.floor(film.duration/60);
    const durationMinutes = film.duration % 60;

    
    function like() {        
        if(!isMovieSaved) {
            handleLike(movie);
            setIsLiked(!isLiked);
            return;
        } 
        removeLike(movie.id);        
    }

    function unLike() {        
        onDelete(movie);
        setIsLiked(false);
    }    

    function removeLike(id) {
        const cardId = currentUserSavedMovies.find((movie) => movie.movieId === id)        
        onDelete(cardId);
        setIsLiked(false);
    }    
     
      
    return (
        <div className='card'>
            <a href={film.link} className='link' target='_blank'>
                <img src={film.cover} className='card__image' alt='Обложка карточки в виде кадра из фильма' />
            </a>
            <div className='card__title-wrap'>
            <a href='ya.ru' className='link' target='_blank'>
                <span className='card__title'>{film.title}</span>
            </a>
            {location.pathname === '/saved-movie' ? 
                <button className='card__delete-like-button' type='button' onClick={unLike}></button> : 
                <button className={likeButtonClassName} type='button' onClick={like}></button>
            }                       
            </div>
                {film.duration > 60 && (film.duration % 60) !== 0 ? 
                <span className='card__film-duration'>{durationHours}ч {durationMinutes}м</span> :
            <>
                {(film.duration % 60) === 0 ?
                <span className='card__film-duration'>{durationHours}ч</span> :
                <span className='card__film-duration'>{durationMinutes}м</span>
                }
            </>
            }            
        </div>
    );
}

export default MoviesCard;