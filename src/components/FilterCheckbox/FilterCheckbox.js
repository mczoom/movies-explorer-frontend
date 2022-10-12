import React from 'react';
import { useLocation } from 'react-router-dom';


function FilterCheckbox({toggleCheckBox, toggleSavedMoviesCheckBox, isShortFilmChecked, changeShortFilmStatus}) {

    const location = useLocation();
        
    

   

    function handleCheckboxChange() {
        changeShortFilmStatus();
    }

    const checkboxClassName = `checkbox__short-checkbox ${isShortFilmChecked ? 'checkbox__short-checkbox_checked' : ''}`;
    
      
    return (        
        <div className='checkbox'>
            <button type="button" className={checkboxClassName} id="short" name="short-film" onClick={handleCheckboxChange} />
            <label htmlFor="short" className='label'>Короткометражки</label>
        </div>        
        );
}

export default FilterCheckbox;
