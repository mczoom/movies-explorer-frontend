import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function SavedMovies({deleteSavedMovie, foundMovies, onChecked, onSearchSaved, foundSavedMovies, isSavedSearchUsed}) {

  

      
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onChecked={onChecked} onSearchSaved={onSearchSaved} savedMovies={true} />
            <MoviesCardList onDelete={deleteSavedMovie} foundMovies={foundMovies} foundSavedMovies={foundSavedMovies} isSavedSearchUsed={isSavedSearchUsed} />
          </main>           
          <Footer />
        </div>
    );
}

export default SavedMovies;