import React from 'react';
import Header from '../Header/Header';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';


function SavedMovies() {
     
      
    return (
        <div className='movies-page'>
          <Header />          
          <MoviesCardList />              
          <Footer />
        </div>
    );
}

export default SavedMovies;