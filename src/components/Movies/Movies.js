import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Movies({onSearch, onChecked, isShortFilmChecked, handleLike, deleteSavedMovie, foundMovies}) {
  const foundMoviess = JSON.parse(localStorage.getItem('foundMovies'));
  const [test, setTest] = React.useState(false);
  function setset() {
    setTest(!test);
  }
//   React.useEffect(() => {
    
// }, [test]);
      
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm onSearch={onSearch} onChecked={onChecked} isShortFilmChecked={isShortFilmChecked} test={test} setset={setset} />
            <MoviesCardList handleLike={handleLike} deleteSaved={deleteSavedMovie} foundMovies={foundMovies} onDelete={deleteSavedMovie} isShortFilmChecked={isShortFilmChecked} />
          </main>
          <Footer />
        </div>
    );
}

export default Movies;