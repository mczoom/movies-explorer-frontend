import React from 'react';


function FilterCheckbox({toggleCheckBox, toggleSavedMoviesCheckBox}) {   
        
    function handleCheckboxChange() {   
    const search = localStorage.getItem('searchQuery');
    toggleCheckBox(search);    
    }

    function handleCheckboxChangeSaved() {   
        const search = localStorage.getItem('searchQuery');
        toggleSavedMoviesCheckBox(search);    
        }
    
      
    return (        
        <div className='checkbox'>
            <input type="checkbox" className="checkbox__short-checkbox" id="short" name="short-film" onClick={handleCheckboxChangeSaved} />
            <label htmlFor="short">Короткометражки</label>
        </div>        
        );
}

export default FilterCheckbox;
