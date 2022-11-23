import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import {APIBF_BASE_URL, DESKTOP_RES, TABLET_RES, MOBILE_RES, DESKTOP, TABLET, MOBILE} from '../utils/config';



function MoviesCardList({movies, likedMovies, isLoading, handleLike, onDelete, savedMoviesPage, noFoundMoviesMessage, serverError, likeError}) {

    const location = useLocation();

    const [renderedCards, setRenderedCards] = React.useState([]);
    const [moviesToRender, setMoviesToRender] = React.useState(0);
    const [moreMoviesToRender, setMoreMoviesToRender] = React.useState(0);


    React.useEffect(() => {
        const renderOptions = () => {
          const width = window.innerWidth;
          if (width >= DESKTOP_RES) {
            setMoviesToRender(DESKTOP);
            setMoreMoviesToRender(3);
          } else if (width >= TABLET_RES) {
            setMoviesToRender(TABLET);
            setMoreMoviesToRender(2);
          } else if (width >= MOBILE_RES){
            setMoviesToRender(MOBILE);
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

    React.useEffect(() => {
      if(location.pathname === '/movies' ) {
        setRenderedCards(movies.slice(0, moviesToRender));
      } else if(location.pathname === '/saved-movies') {
        setRenderedCards(movies);
      }
    }, [movies, moviesToRender])


    return (
        <section className='movies-list'>
            <div className='movies-list__error-messages'>
              <span className="errMessage search-form__likeErr-message">{likeError}</span>
              <span className="errMessage search-form__not-found-message">{noFoundMoviesMessage ? 'Ничего не найдено' : ''}</span>
              <span className="errMessage search-form__serverErr-message">{serverError ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : ''}</span>
            </div>
            <Preloader isLoading={isLoading} />
            <ul className='movies-list__cards-container'>
                { movies.length > 0 &&
                  renderedCards.map((movie) => (
                    <li key={savedMoviesPage ? movie.movieId : movie.id}><MoviesCard movie={movie} likedMovies={likedMovies} cover={savedMoviesPage ? movie.image : `${APIBF_BASE_URL}${movie.image.url}`} handleLike={handleLike} onDelete={onDelete} savedMoviesPage={savedMoviesPage} /></li>
                  ))
                }
            </ul>
        {location.pathname === '/movies' && movies !==null && moviesToRender < movies.length ? (
            <button className='pagination-button' type='button' onClick={loadMoreMovies}>Ещё</button>
        ) :  ''}
        </section>
    );
}

export default MoviesCardList;