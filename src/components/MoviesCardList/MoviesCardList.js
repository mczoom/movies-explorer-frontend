import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList({handleLike}) {
     
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));

          
    return (
        <section className='movies-list'>
            <ul className='movies-list__cards-container'>
                { foundMovies ? 
                  foundMovies.map((movie) => (
                    <li key={movie.id}><MoviesCard movie={movie} cover={movie.image.url} title={movie.nameRU} duration={movie.duration} link={movie.trailerLink} handleLike={handleLike} /></li>
                )) : ''}          
            </ul>
            <button className='pagination-button' type='button'>Ещё</button>
        </section>
    );
}

export default MoviesCardList;