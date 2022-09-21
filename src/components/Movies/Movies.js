import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Movies({onSearch, movies, isSearchUsed, onChecked, isShortFilmChecked}) {
     
      
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onSearch={onSearch} movies={movies} isSearchUsed={isSearchUsed} onChecked={onChecked} isShortFilmChecked={isShortFilmChecked} />
            <MoviesCardList />
          </main>
          <Footer />
        </div>
    );
}

export default Movies;