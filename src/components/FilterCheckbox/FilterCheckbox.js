import React from 'react';


function FilterCheckbox({onChecked, isShortFilmChecked}) {
   
   


    // const checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus'));

    function handleCheckboxChange() {        
    // JSON.stringify(localStorage.setItem('checkboxStatus', isShortFilmChecked));
    const search = localStorage.getItem('searchQuery');   
    onChecked(search);
    }

    
      
    return (        
        <div className='checkbox'>
            <input type="checkbox" className="checkbox__short-checkbox" id="short" name="short-film" onChange={handleCheckboxChange} />
            <label htmlFor="short">Короткометражки</label>
        </div>        
        );
}

export default FilterCheckbox;
