import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList() {
     
      
    return (
        <section className='movies-list'>
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
        </section>
    );
}

export default MoviesCardList;