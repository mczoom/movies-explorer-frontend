import React from 'react';


function FilterCheckbox({isShortFilmChecked, changeShortFilmStatus, savedMoviesPage}) {

       
    function handleCheckboxChange() {
        changeShortFilmStatus();
    }

    const checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus'));
    const checkbox = `checkbox__short-checkbox ${checkboxStatus ? 'checkbox__short-checkbox_checked' : ''}`;
    const checkboxSaved = `checkbox__short-checkbox ${isShortFilmChecked ? 'checkbox__short-checkbox_checked' : ''}`;
    
      
    return (        
        <div className='checkbox'>
            <button type="button" className={savedMoviesPage ? checkboxSaved : checkbox} id="short" name="short-film" onClick={handleCheckboxChange} />
            <label htmlFor="short" className='label'>Короткометражки</label>
        </div>        
        );
}

export default FilterCheckbox;
