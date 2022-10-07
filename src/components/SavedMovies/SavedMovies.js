import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function SavedMovies({deleteSavedMovie, foundMovies, onChecked, onSearchSaved, foundSavedMovies, isSavedSearchUsed, updateSavedMovies, movies, likedMovies}) {
  React.useEffect(() => {
    updateSavedMovies();
}, []);
        
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onChecked={onChecked} onSearchSaved={onSearchSaved} savedMoviesPage={true} />
            <MoviesCardList movies={movies} likedMovies={likedMovies} onDelete={deleteSavedMovie} foundMovies={foundMovies} foundSavedMovies={foundSavedMovies} isSavedSearchUsed={isSavedSearchUsed} updateSavedMovies={updateSavedMovies} savedMoviesPage={true}/>
          </main>           
          <Footer />
        </div>
    );
}

export default SavedMovies;