import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Movies({movies, likedMovies, searchMovies, isLoading, isShortFilmChecked, handleLike, deleteSavedMovie, noFoundMoviesMessage, changeShortFilmStatus, clearAllErrors, serverError, likeError}) {

  React.useEffect(() => {
    clearAllErrors();
  }, []);


  return (
      <div className='movies-page'>
        <Header />
        <main>
          <SearchForm onSearch={searchMovies} isShortFilmChecked={isShortFilmChecked} changeShortFilmStatus={changeShortFilmStatus} />
          <MoviesCardList movies={movies}
                          likedMovies={likedMovies}
                          isLoading={isLoading}
                          handleLike={handleLike}
                          onDelete={deleteSavedMovie}
                          noFoundMoviesMessage={noFoundMoviesMessage}
                          serverError={serverError}
                          likeError={likeError}
            />
        </main>
        <Footer />
      </div>
    );
}

export default Movies;