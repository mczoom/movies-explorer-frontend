import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function SavedMovies({
    deleteSavedMovie,     
    onChecked,
    onSearchSaved,   
    updateSavedMovies,
    movies,  
    isShortFilmChecked,
    toggleSavedMoviesCheckBox,
    noFoundMoviesMessage,
    changeShortFilmStatus, 
    clearAllErrors, 
    serverError
}) 
{

  React.useEffect(() => {
    updateSavedMovies();    
    localStorage.setItem('searchQuerySavedMovies', '');
    clearAllErrors();
}, []);
        
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onChecked={onChecked} onSearchSaved={onSearchSaved} toggleSavedMoviesCheckBox={toggleSavedMoviesCheckBox} isShortFilmChecked={isShortFilmChecked} changeShortFilmStatus={changeShortFilmStatus} savedMoviesPage={true} />
            <MoviesCardList movies={movies} onDelete={deleteSavedMovie} noFoundMoviesMessage={noFoundMoviesMessage} serverError={serverError} savedMoviesPage={true}/>
          </main>           
          <Footer />
        </div>
    );
}

export default SavedMovies;