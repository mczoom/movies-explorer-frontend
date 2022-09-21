import React from 'react';
import { useForm } from 'react-hook-form';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({onSearch, onChecked, isShortFilmChecked, isSearchUsed}) {

    const { 
        register,
        formState: {errors, isTouched},
        handleSubmit,
        reset,
        getValues,
       } = useForm({
           mode: "onChange"
       });

       
       
    function handleSearchSubmit() {        
        localStorage.setItem('searchQuery', getValues('movie'))
        const search = localStorage.getItem('searchQuery');
        
        onSearch(search);        
    }
    
    
      
    return (
        <section className='search'>
            <form className='search-form' onSubmit={handleSubmit(handleSearchSubmit)}>
                <input className='search-form__search-input' type='search' placeholder='Фильм'
                {...register('movie', {
                    
                    required: 'Необходимо заполнить', 
                    minLength: { 
                        value: 2,
                        message: 'Назване фильма должно быть не менее 2-х симоволов'
                    },        
                    })}
                ></input>
                <button className='search-form__find-button' type='submit'></button>                
            </form>
            <span className=''>{errors.movie && <p>{errors.movie.message || "Ошибка"}</p>}</span>
            <FilterCheckbox onChecked={onChecked} isShortFilmChecked={isShortFilmChecked} />
            <div className='search__divider'></div>
        </section>
    );
}

export default SearchForm;