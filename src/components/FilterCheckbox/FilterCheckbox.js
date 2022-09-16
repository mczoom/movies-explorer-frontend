import React from 'react';


function FilterCheckbox() {
     
      
    return (
        <div className='checkbox-wrap'>
        <label className='checkbox'>
                <input type='checkbox' className='checkbox__short-checkbox' value='short'></input>
                <span className="checkbox__visible-checkbox">
                    <span className='checkbox__tumbler'></span>
                </span>                
            </label>
            <span className="checkbox__name">Короткометражки</span>
        </div>
        );
}

export default FilterCheckbox;





