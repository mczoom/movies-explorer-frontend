import React from 'react';
import { useLocation } from 'react-router-dom';


function FilterCheckbox({toggleCheckBox, toggleSavedMoviesCheckBox, savedMoviesPage}) {

    const location = useLocation();
        
    function handleCheckboxChange() {   
      const search = localStorage.getItem('searchQuery');
      toggleCheckBox(search);    
    }

    function handleCheckboxChangeSaved() {   
      const search = localStorage.getItem('searchQuerySavedMovies');
      toggleSavedMoviesCheckBox(search);    
    }
    
      
    return (        
        <div className='checkbox'>
            <input type="checkbox" className="checkbox__short-checkbox" id="short" name="short-film" onClick={location.pathname === '/saved-movies' ? handleCheckboxChangeSaved : handleCheckboxChange} />
            <label htmlFor="short">Короткометражки</label>
        </div>        
        );
}

export default FilterCheckbox;
