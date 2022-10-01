import React from 'react';
import { useLocation } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList({handleLike, onDelete, getAllSavedMovies}) {

    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation();
     
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    console.log(savedMovies);

    

          
    return (
        <section className='movies-list'>
            <ul className='movies-list__cards-container'>
                {location.pathname === '/movies' ?
                 foundMovies && foundMovies.map((movie) => (
                    <li key={movie.id}><MoviesCard movie={movie} cover={`https://api.nomoreparties.co${movie.image.url}`} title={movie.nameRU} duration={movie.duration} link={movie.trailerLink} handleLike={handleLike} /></li>
                )) :
                savedMovies.map((movie) => (
                    (movie.owner === currentUser.userId) && <li key={movie.movieId}><MoviesCard movie={movie} cover={movie.image} title={movie.nameRU} duration={movie.duration} link={movie.trailerLink} handleLike={handleLike} onDelete={onDelete} /></li>
                ))
                }   
            </ul>
            <button className='pagination-button' type='button'>Ещё</button>
        </section>
    );
}

export default MoviesCardList;