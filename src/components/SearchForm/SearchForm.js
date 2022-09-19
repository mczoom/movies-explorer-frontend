import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({onSearch}) {
     
      
    return (
        <section className='search'>
            <form className='search-form' required>
                <input className='search-form__search-input' type='search' placeholder='Фильм' required></input>
                <button className='search-form__find-button' onClick={onSearch} type='submit'></button>
            </form>
            <FilterCheckbox />
            <div className='search__divider'></div>
        </section>
    );
}

export default SearchForm;