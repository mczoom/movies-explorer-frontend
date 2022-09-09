import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList() {
     
      
    return (
        <section className='movies-list'>
            <ul className='movies-list__cards-container'>
                <li><MoviesCard /></li>
                <li><MoviesCard /></li>
                <li><MoviesCard /></li>
                <li><MoviesCard /></li>
                <li><MoviesCard /></li>
                <li><MoviesCard /></li>
            </ul>
            <button className='pagination-button'>Ещё</button>
        </section>
    );
}

export default MoviesCardList;