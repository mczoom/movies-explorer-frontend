import React from 'react';


function FilterCheckbox() {
     
      
    return (
        <label className='checkbox'>
                <input type='checkbox' className='checkbox__short-checkbox' value='short'></input>
                <span className="checkbox__visible-checkbox">
                    <span className='checkbox__tumbler'></span>
                </span>
                <span className="checkbox__name">Короткометражки</span>
            </label>
        );
}

export default FilterCheckbox;





