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
  const [isLogged, setIsLogged] = React.useState(false);
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

  const storagedSearchQuery = localStorage.getItem('searchQuery');
  const stoaragedSearchQuerySavedMovies = localStorage.getItem('searchQuerySavedMovies');  //заменить на переменную состояния?

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

  const moviesSearchResultMessage = (resultArr) => {
    if(resultArr.length === 0) {
      setNoFoundMoviesMessage(true);
    } else {
      setNoFoundMoviesMessage(false);
    }
  }

  const savedMoviesSearchResultMessage = (resultArr) => {
    const savedFilms = JSON.parse(localStorage.getItem('savedMovies'));
    if(savedFilms.length > 0 && resultArr.length === 0) {
      setNoFoundSavedMoviesMessage(true);
    } else {
      setNoFoundSavedMoviesMessage(false);
    }
  }

  const searchedFilms = (films, searchQuery) => films.filter(movie => {
    return movie.nameRU.toLowerCase().includes(searchQuery);
  });

  const searchedShortFilms = (films, searchQuery) => films.filter(movie => {
    return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= SHORT_MOVIE_DURATION;
  })

  function searchMovies(searchQuery) {
    if(movies.length > 0) {
      if(!isShortFilmChecked) {
        const foundMovies = searchedFilms(movies, searchQuery);
        moviesSearchResultMessage(foundMovies);
        setSearchedMovies(foundMovies);
      } else {
        const foundShortFilms = searchedShortFilms(movies, searchQuery);
        moviesSearchResultMessage(foundShortFilms);
        setSearchedMovies(foundShortFilms);
      }
    } else {
      setIsLoading(true);
      setServerError(false);
      apiBF.getAllMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          setMovies(data);
          const foundMovies = searchedFilms(data, searchQuery);
          moviesSearchResultMessage(foundMovies);
          setSearchedMovies(foundMovies);
        })
        .catch(() => setServerError(true))
        .finally(() => setIsLoading(false));
    }
  }


  function searchSavedMovies(searchQuery) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if(savedMovies !== null) {
      if(!isSavedShortFilmChecked) {
        const foundSavedFilms = searchedFilms(savedMovies, searchQuery);
        savedMoviesSearchResultMessage(foundSavedFilms);
        setLikedMovies(foundSavedFilms);
        setSearchQuerySavedMovies(searchQuery);
      } else {
        const foundSavedShortFilms = searchedShortFilms(savedMovies, searchQuery);
        savedMoviesSearchResultMessage(foundSavedShortFilms);
        setLikedMovies(foundSavedShortFilms);
        setSearchQuerySavedMovies(searchQuery);
      }
    }
  }


  React.useEffect(() => {
    if(isLogged) {
      if(storagedSearchQuery) {
      searchMovies(storagedSearchQuery);
      }
      searchSavedMovies(stoaragedSearchQuerySavedMovies);
    }
  }, [isShortFilmChecked, isSavedShortFilmChecked, storagedSearchQuery, stoaragedSearchQuerySavedMovies]);


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
      .catch((err) => {
        setRegistrationResponse('Ошибка при регистрации');
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


  function editProfile () {
    setEditProfilePopupState(!isEditProfilePopupOpen);
  }

  function closeEditProfilePopup () {
    setEditProfilePopupState(false);
  }


  function logOut() {
    localStorage.clear();
    setMovies([]);
    setSearchedMovies([]);
    setIsShortFilmChecked(false);
    setCurrentUser({});
    setIsLogged(false);
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
