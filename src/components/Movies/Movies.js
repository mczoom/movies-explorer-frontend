import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Movies({movies, searchMovies, toggleCheckBox, updateMovies, isLoading, onSearch, onChecked, isShortFilmChecked, handleLike, deleteSavedMovie, foundMovies, noFoundMoviesMessage, changeShortFilmStatus, clearAllErrors, serverError}) {
 

// const checkboxStatus = localStorage.setItem('checkboxStatus', JSON.stringify(isShortFilmChecked));
// const checkboxStatus = localStorage.getItem('checkboxStatus');

React.useEffect(() => {
  clearAllErrors();   
}, []);


       console.log(isShortFilmChecked);
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onSearch={searchMovies} isShortFilmChecked={isShortFilmChecked} toggleCheckBox={toggleCheckBox} changeShortFilmStatus={changeShortFilmStatus}/>
            <MoviesCardList movies={movies} isLoading={isLoading} handleLike={handleLike} deleteSaved={deleteSavedMovie} foundMovies={foundMovies} onDelete={deleteSavedMovie} isShortFilmChecked={isShortFilmChecked} noFoundMoviesMessage={noFoundMoviesMessage} serverError={serverError} />
          </main>
          <Footer />
        </div>
    );
}

export default Movies;