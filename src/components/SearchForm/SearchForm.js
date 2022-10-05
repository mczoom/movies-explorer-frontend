import React from 'react';
import { useForm } from 'react-hook-form';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({onSearch, onSearchSaved, onChecked, isShortFilmChecked, savedMovies}) {

    const { 
        register,
        formState: {errors},
        handleSubmit,
        getValues,
       } = useForm({
           mode: "onChange"
       });

       
       
    function handleMoviesSearch() {        
        localStorage.setItem('searchQuery', getValues('movie'))
        const search = localStorage.getItem('searchQuery');        
        onSearch(search);
    }

    

    function handleSavedMoviesSearch() {
        localStorage.setItem('searchQuery', getValues('movie'))
        const search = localStorage.getItem('searchQuery');        
        onSearchSaved(search);   
    }
    
    
      
    return (
        <section className='search'>
            <form className='search-form' onSubmit={savedMovies? handleSubmit(handleSavedMoviesSearch) : handleSubmit(handleMoviesSearch)}>
                <input className='search-form__search-input' type='search' placeholder='Фильм'
                {...register('movie', {                    
                    required: 'Введите название фильма в строку поиска', 
                    minLength: { 
                        value: 2,
                        message: 'Название фильма должно быть не менее 2-х симоволов'
                    },        
                    })}
                ></input>
                <button className='search-form__find-button' type='submit'></button>                
            </form>
            <span className='search-form__error-message'>{errors.movie && <p>{errors.movie.message || "Ошибка"}</p>}</span>
            <FilterCheckbox onChecked={onChecked} isShortFilmChecked={isShortFilmChecked} />
            <div className='search__divider'></div>
        </section>
    );
}

export default SearchForm;