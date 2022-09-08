import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';


function Movies() {
     
      
    return (
        <div className='movies-page'>
          <Header />
          <SearchForm />
          <MoviesCardList>
              
          </MoviesCardList>          
          <Footer />
        </div>
    );
}

export default Movies;