import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm() {
     
      
    return (
        <section className='search'>
            <form className='search-form' required>
                <input className='search-form__search-input' type='search' placeholder='Фильм' required></input>
                <button className='search-form__find-button' type='button'></button>
            </form>
            <FilterCheckbox />
            <div className='search__divider'></div>
        </section>
    );
}

export default SearchForm;