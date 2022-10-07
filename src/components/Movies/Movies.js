import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Movies({movies, searchMovies, updateMovies, isLoading, onSearch, onChecked, isShortFilmChecked, handleLike, deleteSavedMovie, foundMovies}) {
  React.useEffect(() => {
    updateMovies();
}, []);  
       
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onSearch={searchMovies} onChecked={onChecked} isShortFilmChecked={isShortFilmChecked} />
            <MoviesCardList movies={movies} isLoading={isLoading} handleLike={handleLike} deleteSaved={deleteSavedMovie} foundMovies={foundMovies} onDelete={deleteSavedMovie} isShortFilmChecked={isShortFilmChecked} />
          </main>
          <Footer />
        </div>
    );
}

export default Movies;