import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import * as apiBF from '../utils/MoviesApi';
import * as api from '../utils/MainApi';
import {SHORT_MOVIE_DURATION} from '../utils/config';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';



function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLogged, setIsLogged] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);
  const [searchQuerySavedMovies, setSearchQuerySavedMovies] = React.useState();
  const [updateUserInfoResponse, setupdateUserInfoResponse] = React.useState('');
  const [isShortFilmChecked, setIsShortFilmChecked] = React.useState(false);
  const [isSavedShortFilmChecked, setIsSavedShortFilmChecked] = React.useState(false);
  const [registrationResponse, setRegistrationResponse] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [noFoundMoviesMessage, setNoFoundMoviesMessage] = React.useState(false);
  const [noFoundSavedMoviesMessage, setNoFoundSavedMoviesMessage] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [profileError, setProfileError] = React.useState('');
  const [likeError, setLikeError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
    
  const history = useHistory();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  function changeShortFilmStatus() {    
      setIsShortFilmChecked(isShortFilmChecked => !isShortFilmChecked);
      localStorage.setItem('checkboxStatus', JSON.stringify(!isShortFilmChecked));
  }

  function changeSavedShortFilmStatus() {    
    setIsSavedShortFilmChecked(isSavedShortFilmChecked => !isSavedShortFilmChecked);
  }  

  const searchResultMessage = (resultArr) => {
    if(resultArr.length === 0) {
      setNoFoundMoviesMessage(true);
    } else {
      setNoFoundMoviesMessage(false);
    }
  }

  const searchSavedMoviesResultMessage = (resultArr) => {
    const savedFilms = JSON.parse(localStorage.getItem('savedMovies'));    
    if(savedFilms.length > 0 && resultArr.length === 0) {
      setNoFoundSavedMoviesMessage(true);
    } else {
      setNoFoundSavedMoviesMessage(false);
    }
  }


  ///////////////////////////////////////////////////////////////////

  function searchMovies(searchQuery) {    
    if(movies.length > 0) {
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      if(!isShortFilmChecked) {
        const searchedMovies = allMovies.filter(movie => {
          return movie.nameRU.toLowerCase().includes(searchQuery);
        })
        searchResultMessage(searchedMovies);
        localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
        setSearchedMovies(searchedMovies);
      } else {
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        const searchedShortMovies = allMovies.filter(movie => {
          return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= SHORT_MOVIE_DURATION;
        })
        searchResultMessage(searchedShortMovies);
        localStorage.setItem('foundMovies', JSON.stringify(searchedShortMovies));
        setSearchedMovies(searchedShortMovies);
      }
    } else {
      setIsLoading(true);
      setServerError(false);
      apiBF.getAllMovies()
        .then((data) => {          
          localStorage.setItem('allMovies', JSON.stringify(data));
          setMovies(data);
          const searchedMovies = data.filter(movie => {
            return movie.nameRU.toLowerCase().includes(searchQuery);
          })
          searchResultMessage(searchedMovies);
          localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
          setSearchedMovies(searchedMovies);
        })              
        .catch(() => setServerError(true))
        .finally(() => setIsLoading(false));
    }
  }

  ///////////////////////////////////////////////////////////////////

  
  
  function initialMovieSearch(searchQuery) {
    setIsLoading(true);
    setServerError(false);
    if(!isShortFilmChecked) {      
      apiBF.getAllMovies()
        .then((data) => {          
          localStorage.setItem('allMovies', JSON.stringify(data));
          setMovies(data);
          const searchedMovies = data.filter(movie => {
            return movie.nameRU.toLowerCase().includes(searchQuery);
          })
          searchResultMessage(searchedMovies);
          localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
          setSearchedMovies(searchedMovies);
        })              
        .catch(() => setServerError(true))
        .finally(() => setIsLoading(false));
    } else {
      apiBF.getAllMovies()
      .then((data) => {          
        localStorage.setItem('allMovies', JSON.stringify(data));          
        setMovies(data);
        const searchedShortMovies = data.filter(movie => {
          return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= SHORT_MOVIE_DURATION;
        })
        searchResultMessage(searchedShortMovies);
        localStorage.setItem('foundMovies', JSON.stringify(searchedShortMovies));
        setSearchedMovies(searchedShortMovies);
      })              
      .catch(() => setServerError(true))
      .finally(() => setIsLoading(false));
    }    
  }


  function searchMoviesAfterInitialSearch (searchQuery) {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    if(allMovies) {
      if(!isShortFilmChecked) {      
        const searchedMovies = allMovies.filter(movie => {
          return movie.nameRU.toLowerCase().includes(searchQuery);
        })
        searchResultMessage(searchedMovies);
        localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
        setSearchedMovies(searchedMovies);
      } else {
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        const searchedShortMovies = allMovies.filter(movie => {
          return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= SHORT_MOVIE_DURATION;
        })
        searchResultMessage(searchedShortMovies);
        localStorage.setItem('foundMovies', JSON.stringify(searchedShortMovies));
        setSearchedMovies(searchedShortMovies);
      }
    }
  }  
  

  function searchMoviess(searchQuery) {        
    if(!movies || movies.length < 1) {             
        initialMovieSearch(searchQuery)      
    } else {
      searchMoviesAfterInitialSearch (searchQuery);  
    }
  } 


  function searchSavedMovies(searchQuery) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if(savedMovies !== null) {
      if(!isSavedShortFilmChecked) {
        const searchedSavedMovies = savedMovies.filter((film) => {
          return film.nameRU.toLowerCase().includes(searchQuery);
      });
        searchSavedMoviesResultMessage(searchedSavedMovies);
        setLikedMovies(searchedSavedMovies);
        setSearchQuerySavedMovies(searchQuery);        
      } else {
        const searchedSavedShortMovies = savedMovies.filter((film) => {        
        return  film.nameRU.toLowerCase().includes(searchQuery) && film.duration <= SHORT_MOVIE_DURATION;
        });
        searchSavedMoviesResultMessage(searchedSavedShortMovies);
        setLikedMovies(searchedSavedShortMovies);
        setSearchQuerySavedMovies(searchQuery);
      }
    }
  }    

  React.useEffect(() => {
    const searchQuery = localStorage.getItem('searchQuery');
    const searchQuerySavedMovies = localStorage.getItem('searchQuerySavedMovies');
    searchMoviesAfterInitialSearch (searchQuery);
    searchSavedMovies(searchQuerySavedMovies);
  }, [isShortFilmChecked, isSavedShortFilmChecked]);


  function clearAllErrors() {
    setNoFoundMoviesMessage(false);
    setupdateUserInfoResponse('');
    setServerError('')
    setLikeError('');
    setNoFoundSavedMoviesMessage(false)
  }

  function setCurrentUserInfo() {
    api.getCurrentUser(token)
      .then((data) => {            
        setCurrentUser(data);                 
      })
      .catch(() => setProfileError("Не удалось загрузить данные профиля"))
  }

  function handleRegistration(name, email, password) {
    api.register(name, email, password)
      .then((res) => {  
        if(res) {          
          handleLogin({email, password});        
        }
      })
      .catch(() => {
        setRegistrationResponse('Пользователь с таким email уже зарегистрирован');
      })      
  }
      
      
  function handleLogin(email, password) {
    api.login(email, password)
    .then((data) => {
      if(data.token) {        
        localStorage.setItem('token', data.token);
        setIsLogged(true);
        localStorage.setItem('isLoggedIn', true);
        setCurrentUserInfo();
        updateSavedMovies();
        setIsSavedShortFilmChecked(false);
        history.push('/movies');      
      }; 
    })
    .catch((err) => {
      setLoginError('Ошибка авторизации');
      console.log('Ошибка авторизации');
    });
    if(isLoggedIn) {
      api.getContent()
        .then((userInfo) => {
          setCurrentUserInfo(userInfo);
        })
        .catch(() => setProfileError("Не удалось обновить данные"))
    }
  };

  
  function updateSavedMovies() {
    api.getAllSavedMovies()
      .then((movies) => {
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        setLikedMovies(movies);
      })
      .catch(err => console.log(err));
  }


  function updateUserInfo(name, email) {
    api.updateUser(name, email)
      .then((res) => {
        setCurrentUser({name: res.name, email: res.email})
        setupdateUserInfoResponse('Профиль успешно обновлен');
      })
      .catch(() => setupdateUserInfoResponse('Произошла ошибка при обновлении данных'));
  }


  function handleLike (movie) {
    api.saveMovie(movie)
    .then((newMovie) => {
      const updatedSavedMovies = [...likedMovies, newMovie];
      setLikedMovies(updatedSavedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
    })
    .catch(() => setLikeError('Произошла ошибка, фильм не сохранён'));    
  }

  function deleteSavedMovie(movie) {
    api.deleteSavedMovie(movie._id)
    .then((deletedMovie) => {
      const updatedSavedMovies = likedMovies.filter(
        (movie) => movie._id !== deletedMovie._id,
      );
      setLikedMovies(updatedSavedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
    })     
    .catch(() => setLikeError('Произошла ошибка, фильм не удалён'));     
  }
  
  console.log(likedMovies);

  function editProfile () {
    setEditProfilePopupState(!isEditProfilePopupOpen);
  }

  function closeEditProfilePopup () {
    setEditProfilePopupState(false);
  }

  
  function logOut() {
    localStorage.clear();
    setCurrentUser({});
    setIsLogged('');
    history.push('/');
  }


  function tokenCheck() {
    const token = localStorage.getItem('token');
    const allMovies = localStorage.getItem('allMovies');
    const savedMovies = localStorage.getItem('savedMovies');
    if (token) {
        if (allMovies) {
            const movies = JSON.parse(allMovies);
            setMovies(movies);
        }
        if (savedMovies) {
            const likedFilms = JSON.parse(savedMovies);
            setLikedMovies(likedFilms);
        }
        api.getContent()
            .then((user) => {
              setCurrentUser(user);
              localStorage.setItem('isLoggedIn', true);
              setIsLogged(true);
              history.push(location.pathname);
            })
            .catch((err) => {
                console.log(err);
            })
    }
  }

  React.useEffect(() => {
      tokenCheck();
      clearAllErrors();
  }, [isLoggedIn]);

  React.useEffect(() => {
    setIsSavedShortFilmChecked(false);  
  }, [location.pathname]);  


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>          
          <Route path="/signup">
            {!isLogged ? <Register handleRegistration={handleRegistration} registrationResponse={registrationResponse} /> : <Redirect to="/" />}            
          </Route>
          <Route path="/signin">
            {!isLogged ? <Login handleLogin={handleLogin} loginError={loginError} /> : <Redirect to="/" />}            
          </Route>
          <ProtectedRoute path="/movies" 
              component={Movies} 
              movies={searchedMovies} 
              changeShortFilmStatus={changeShortFilmStatus} 
              searchMovies={searchMovies}
              isLoading={isLoading} 
              isLoggedIn={isLoggedIn} 
              isShortFilmChecked={isShortFilmChecked} 
              handleLike={handleLike} 
              deleteSavedMovie={deleteSavedMovie} 
              noFoundMoviesMessage={noFoundMoviesMessage} 
              clearAllErrors={clearAllErrors} 
              serverError={serverError} 
              likeError={likeError}
          />
          <ProtectedRoute path="/saved-movies" 
              component={SavedMovies} 
              movies={likedMovies} 
              changeShortFilmStatus={changeSavedShortFilmStatus} 
              searchQuerySavedMovies={searchQuerySavedMovies}    
              isLoggedIn={isLoggedIn}
              updateSavedMovies={updateSavedMovies}
              onSearchSaved={searchSavedMovies} 
              deleteSavedMovie={deleteSavedMovie} 
              isShortFilmChecked={isSavedShortFilmChecked} 
              noFoundMoviesMessage={noFoundSavedMoviesMessage} 
              clearAllErrors={clearAllErrors} 
              serverError={serverError} 
              savedMoviesPage={true}
          />
          <ProtectedRoute path="/profile" 
              component={Profile} 
              isLoggedIn={isLoggedIn} 
              onLogout={logOut} 
              setCurrentUserInfo={setCurrentUserInfo} 
              onEdit={editProfile} 
              onUpdate={updateUserInfo} 
              updateUserInfoResponse={updateUserInfoResponse} 
              isEditProfilePopupOpen={isEditProfilePopupOpen} 
              onClose={closeEditProfilePopup} 
              profileError={profileError}
          />
          <Route path="/*">
            <Page404 />
          </Route>          
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
