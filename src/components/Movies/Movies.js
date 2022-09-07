import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';


function Movies() {
     
      
    return (
        <div className='page'>
          <Header />
          <SearchForm />
          <Footer />
        </div>
    );
}

export default Movies;