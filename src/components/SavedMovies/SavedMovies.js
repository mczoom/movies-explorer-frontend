import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function SavedMovies({deleteSavedMovie, foundMovies, onChecked, onSearchSaved, foundSavedMovies, isSavedSearchUsed, updateSavedMovies, movies, likedMovies, toggleCheckBox, isShortFilmChecked, toggleSavedMoviesCheckBox, searchQuerySavedMovies, noFoundMoviesMessage, changeShortFilmStatus}) {

  React.useEffect(() => {
    updateSavedMovies();
    localStorage.setItem('searchQuerySavedMovies', '');
    // changeShortFilmStatus(false);
}, []);
        
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onChecked={onChecked} onSearchSaved={onSearchSaved} toggleSavedMoviesCheckBox={toggleSavedMoviesCheckBox} isShortFilmChecked={isShortFilmChecked} searchQuerySavedMovies={searchQuerySavedMovies} changeShortFilmStatus={changeShortFilmStatus} savedMoviesPage={true} />
            <MoviesCardList movies={movies} likedMovies={likedMovies} onDelete={deleteSavedMovie} foundMovies={foundMovies} foundSavedMovies={foundSavedMovies} isSavedSearchUsed={isSavedSearchUsed} updateSavedMovies={updateSavedMovies} noFoundMoviesMessage={noFoundMoviesMessage} savedMoviesPage={true}/>
          </main>           
          <Footer />
        </div>
    );
}

export default SavedMovies;