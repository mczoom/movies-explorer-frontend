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
  const [likedMoviesToRender, setLikedMoviesToRender] = React.useState([]);
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
  const stoaragedSearchQuerySavedMovies = localStorage.getItem('searchQuerySavedMovies');  //???????????????? ???? ???????????????????? ???????????????????

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
    if(likedMovies.length > 0 && resultArr.length === 0) {
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
    if(likedMovies !== null) {
      if(!isSavedShortFilmChecked) {
        const foundSavedFilms = searchedFilms(likedMovies, searchQuery);
        savedMoviesSearchResultMessage(foundSavedFilms);
        setLikedMoviesToRender(foundSavedFilms);
        setSearchQuerySavedMovies(searchQuery);
      } else {
        const foundSavedShortFilms = searchedShortFilms(likedMovies, searchQuery);
        savedMoviesSearchResultMessage(foundSavedShortFilms);
        setLikedMoviesToRender(foundSavedShortFilms);
        setSearchQuerySavedMovies(searchQuery);
      }
    }
  }


  function toggleCheckBox() {
    if(isLogged) {
      if(storagedSearchQuery) {
        searchMovies(storagedSearchQuery);
      }
      searchSavedMovies(stoaragedSearchQuerySavedMovies);
    }
  }

  React.useEffect(() => {
    toggleCheckBox();
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
      .catch(() => setProfileError("???? ?????????????? ?????????????????? ???????????? ??????????????"))
  }

  function handleRegistration(name, email, password) {
    api.register(name, email, password)
      .then((res) => {
        if(res) {
          handleLogin({email, password});
        }
      })
      .catch((err) => {
        setRegistrationResponse('???????????? ?????? ??????????????????????');
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
    .catch(() => {
      setLoginError('???????????? ??????????????????????');
    });
    if(isLoggedIn) {
      api.getContent()
        .then((userInfo) => {
          setCurrentUserInfo(userInfo);
        })
        .catch(() => setProfileError("???? ?????????????? ???????????????? ????????????"))
    }
  };


  function updateSavedMovies() {
    api.getAllSavedMovies()
      .then((movies) => {
        setLikedMovies(movies);
        setLikedMoviesToRender(movies);
      })
      .catch(err => console.log(err));
  }


  function updateUserInfo(name, email) {
    api.updateUser(name, email)
      .then((res) => {
        setCurrentUser({name: res.name, email: res.email})
        setupdateUserInfoResponse('?????????????? ?????????????? ????????????????');
      })
      .catch(() => setupdateUserInfoResponse('?????????????????? ???????????? ?????? ???????????????????? ????????????'));
  }


  function saveMovie (movie) {
    api.saveMovie(movie)
    .then((newMovie) => {
      const updatedSavedMovies = [...likedMovies, newMovie];
      setLikedMovies(updatedSavedMovies);
      setLikedMoviesToRender(updatedSavedMovies);
    })
    .catch(() => setLikeError('?????????????????? ????????????, ?????????? ???? ????????????????'));
  }

  const updatedSavedMovies = (arr, deletedMovie) => arr.filter(
    (movie) => movie._id !== deletedMovie._id,
  );

  function deleteSavedMovie(movie) {
    api.deleteSavedMovie(movie._id)
    .then((deletedMovie) => {
      setLikedMovies(updatedSavedMovies(likedMovies, deletedMovie));
      setLikedMoviesToRender(updatedSavedMovies(likedMoviesToRender, deletedMovie));
    })
    .catch(() => setLikeError('?????????????????? ????????????, ?????????? ???? ????????????'));
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
    if (token) {
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

console.log(likedMovies);
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
              likedMovies={likedMovies}
              changeShortFilmStatus={changeShortFilmStatus}
              searchMovies={searchMovies}
              isLoading={isLoading}
              isLoggedIn={isLoggedIn}
              isShortFilmChecked={isShortFilmChecked}
              handleLike={saveMovie}
              deleteSavedMovie={deleteSavedMovie}
              noFoundMoviesMessage={noFoundMoviesMessage}
              clearAllErrors={clearAllErrors}
              serverError={serverError}
              likeError={likeError}
          />
          <ProtectedRoute path="/saved-movies"
              component={SavedMovies}
              movies={likedMoviesToRender}
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
