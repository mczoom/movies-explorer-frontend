import React from 'react';
import { useLocation } from 'react-router-dom';
import {APIBF_BASE_URL} from '../utils/config';
import {checkMovieTrailerUrl} from '../utils/validators';



function MoviesCard({movie, likedMovies, savedMoviesPage, handleLike, onDelete}) {

    const location = useLocation();

    const [isLiked, setIsLiked] = React.useState(false)

    const film = {
        country: movie.country || 'n/a',
        director: movie.director || 'n/a',
        duration: movie.duration || '',
        year: movie.year || 'n/a',
        description: movie.description || 'n/a',
        cover: savedMoviesPage ? movie.image : `${APIBF_BASE_URL}${movie.image.url}`,
        link: checkMovieTrailerUrl(movie.trailerLink),
        thumbnail: savedMoviesPage ? movie.thumbnail : `${APIBF_BASE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: savedMoviesPage ? movie._id : movie.id,
        title: movie.nameRU || 'Название не указано',
        nameEN: movie.nameEN || 'n/a',
    }


    function checkIsMovieSaved() {
        if(likedMovies) {
        return likedMovies.some((film) => film.movieId === movie.id);
        }
    };

    const likeButtonClassName = `card__like-button ${checkIsMovieSaved() ? 'card__like-button_liked' : ''}`;

    const durationHours = Math.floor(film.duration/60);
    const durationMinutes = film.duration % 60;

    function removeLike(id) {
        const cardId = likedMovies.find((movie) => movie.movieId === id)
        onDelete(cardId);
        setIsLiked(false);
    }

    function likeMovie() {
        if(!checkIsMovieSaved()) {
            handleLike(movie);
            setIsLiked(!isLiked);
        } else {
        removeLike(movie.id);
        }
    }

    function unLikeMovie() {
        onDelete(movie);
        setIsLiked(false);
    }



    return (
        <div className='card'>
            <a href={film.link} className='link' target='_blank' rel="noreferrer">
                <img src={film.cover} className='card__image' alt='Обложка карточки в виде кадра из фильма' />
            </a>
            <div className='card__title-wrap'>
            <a href='ya.ru' className='link' target='_blank'>
                <span className='card__title'>{film.title}</span>
            </a>
            {location.pathname === '/saved-movies' ?
                <button className='card__delete-like-button' type='button' onClick={unLikeMovie}></button> :
                <button className={likeButtonClassName} type='button' onClick={likeMovie}></button>
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