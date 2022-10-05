import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Movies({isLoading, onSearch, onChecked, isShortFilmChecked, handleLike, deleteSavedMovie, foundMovies}) {
  
       
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onSearch={onSearch} onChecked={onChecked} isShortFilmChecked={isShortFilmChecked} />
            <MoviesCardList isLoading={isLoading} handleLike={handleLike} deleteSaved={deleteSavedMovie} foundMovies={foundMovies} onDelete={deleteSavedMovie} isShortFilmChecked={isShortFilmChecked} />
          </main>
          <Footer />
        </div>
    );
}

export default Movies;