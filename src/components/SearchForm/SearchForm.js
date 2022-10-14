import React from 'react';
import { useForm } from 'react-hook-form';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({onSearch, onSearchSaved, onChecked, isShortFilmChecked, savedMoviesPage, toggleCheckBox, toggleSavedMoviesCheckBox, changeShortFilmStatus}) {

    React.useEffect(() => {
        const searchQuery = localStorage.getItem('searchQuery');
        if(searchQuery && !savedMoviesPage) {        
        setValue('movie', searchQuery);
        }
      }, []);

    
    const { 
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        getValues,
       } = useForm({
           mode: "onSubmit"
       });
       
       
    function handleMoviesSearch() {        
        localStorage.setItem('searchQuery', getValues('movie'))
        const search = localStorage.getItem('searchQuery');        
        onSearch(search);
    }

    function handleSavedMoviesSearch() {
        localStorage.setItem('searchQuerySavedMovies', getValues('movie'))
        const search = localStorage.getItem('searchQuerySavedMovies');           
         onSearchSaved(search);   
    }
      
    return (
        <section className='search'>
            <form className='search-form' onSubmit={savedMoviesPage? handleSubmit(handleSavedMoviesSearch) : handleSubmit(handleMoviesSearch)}>
                <input className='search-form__search-input' type='search' placeholder='Фильм'
                {...register('movie', {                    
                    required: 'Нужно ввести ключевое слово',                    
                    })}
                ></input>
                <button className='search-form__find-button' type='submit' ></button>
            </form>
            {errors.movie && <span className='search-form__error-message'>{errors.movie.message || "Ошибка"}</span>}
            <FilterCheckbox onChecked={onChecked} isShortFilmChecked={isShortFilmChecked} toggleCheckBox={toggleCheckBox} toggleSavedMoviesCheckBox={toggleSavedMoviesCheckBox} changeShortFilmStatus={changeShortFilmStatus}/>
            <div className='search__divider'></div>
        </section>
    );
}

export default SearchForm;