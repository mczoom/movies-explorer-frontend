import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function SavedMovies({updateAllSavedMovies, deleteSavedMovie, allSavedMovies}) {

  // React.useEffect(() => {
  //   getAllSavedMovies();  
  // })

      
    return (
        <div className='movies-page'>
          <Header />
          <main>
            <SearchForm />
            <MoviesCardList onDelete={deleteSavedMovie} />
          </main>           
          <Footer />
        </div>
    );
}

export default SavedMovies;