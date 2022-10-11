import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Movies({movies, searchMovies, toggleCheckBox, updateMovies, isLoading, onSearch, onChecked, isShortFilmChecked, handleLike, deleteSavedMovie, foundMovies, noFoundMoviesMessage}) {
//   React.useEffect(() => {
//     updateMovies();
// }, []);  
       
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onSearch={searchMovies} isShortFilmChecked={isShortFilmChecked} toggleCheckBox={toggleCheckBox}/>
            <MoviesCardList movies={movies} isLoading={isLoading} handleLike={handleLike} deleteSaved={deleteSavedMovie} foundMovies={foundMovies} onDelete={deleteSavedMovie} isShortFilmChecked={isShortFilmChecked} noFoundMoviesMessage={noFoundMoviesMessage} />
          </main>
          <Footer />
        </div>
    );
}

export default Movies;