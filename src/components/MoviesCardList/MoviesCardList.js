import React from 'react';
import { useLocation } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList({handleLike, onDelete, foundSavedMovies, isSavedSearchUsed, deleteSaved, isShortFilmChecked, getAllSavedMovies}) {

    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation();

    const [moviesToRender, setMoviesToRender] = React.useState(0);
    const [moreMoviesToRender, setMoreMoviesToRender] = React.useState(0);    
    
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

        

    React.useEffect(() => {
        const renderOptions = () => {
          const width = window.innerWidth;
          if (width >= 1280) {
            setMoviesToRender(12);
            setMoreMoviesToRender(3);
          } else if (width >= 768) {
            setMoviesToRender(8);
            setMoreMoviesToRender(2);
          } else {
            setMoviesToRender(5);
            setMoreMoviesToRender(2);
          }
        };
    
        renderOptions();
    
        window.addEventListener("resize", renderOptions);

        return () => window.removeEventListener("resize", renderOptions);
      }, []);
        
    
    const loadMoreMovies = () => {
        setMoviesToRender(moviesToRender + moreMoviesToRender);
    }   
          
    return (
        <section className='movies-list'>
            <ul className='movies-list__cards-container'>
                {foundMovies !== null && location.pathname === '/movies' ?
                  foundMovies.slice(0, moviesToRender).map((movie) => (
                    <li key={movie.id}><MoviesCard movie={movie} cover={`https://api.nomoreparties.co${movie.image.url}`} title={movie.nameRU} duration={movie.duration} link={movie.trailerLink} handleLike={handleLike} onDelete={onDelete} /></li>
                )) : '' }
                {savedMovies !== null && location.pathname === '/saved-movies' && !isSavedSearchUsed ?
                savedMovies.map((movie) => (
                    (movie.owner === currentUser.userId) && <li key={movie.movieId}><MoviesCard movie={movie} cover={movie.image} title={movie.nameRU} duration={movie.duration} link={movie.trailerLink} handleLike={handleLike} onDelete={onDelete} /></li>
                )) : '' }
                {foundSavedMovies !== null && location.pathname === '/saved-movies' ?
                foundSavedMovies.map((movie) => (
                    (movie.owner === currentUser.userId) && <li key={movie.movieId}><MoviesCard movie={movie} cover={movie.image} title={movie.nameRU} duration={movie.duration} link={movie.trailerLink} handleLike={handleLike} onDelete={onDelete} /></li>
                )) : '' }
                
            </ul>
        {foundMovies !==null && moviesToRender < foundMovies.length ? (
            <button className='pagination-button' type='button' onClick={loadMoreMovies}>Ещё</button>
        ) : ''}    
        </section>
    );
}

export default MoviesCardList;