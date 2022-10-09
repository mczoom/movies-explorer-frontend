import React from 'react';


function FilterCheckbox({toggleCheckBox}) {   
        
    function handleCheckboxChange() {   
    const search = localStorage.getItem('searchQuery');
    toggleCheckBox(search);    
    }
    
      
    return (        
        <div className='checkbox'>
            <input type="checkbox" className="checkbox__short-checkbox" id="short" name="short-film" onClick={handleCheckboxChange} />
            <label htmlFor="short">Короткометражки</label>
        </div>        
        );
}

export default FilterCheckbox;
