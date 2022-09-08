import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm() {
     
      
    return (
        <section className='search'>
            <form className='search-form'>
                <input className='search-form__search-input' type='search' placeholder='Фильм'></input>
                <button className='search-form__find-button'></button>
            </form>
            <FilterCheckbox />
            <div className='search__divider'></div>
        </section>
    );
}

export default SearchForm;