import React from 'react';
import findButton from '../../images/find-button.svg'


function SearchForm() {
     
      
    return (
        <section className='search'>
            <form className='search-form'>
                <input className='search-form__search-input' type='search' placeholder='Фильм'></input>
                <button className='find'></button>
            </form>
            <label className='short-checkbox'>
                <input type='checkbox' className='checkbox' value='short'></input>
                <span className="checkbox__visible-checkbox visible-checkbox">
                    <span className='visible-checkbox__tumbler'></span>
                </span>
                <span className="visible-checkbox__label">Короткометражки</span>
            </label>
        </section>
    );
}

export default SearchForm;