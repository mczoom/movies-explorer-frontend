import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';




function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [token, setToken] = React.useState({}); 
  const [isLogged, setIsLogged] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);
  const [searchedLikedMovies, setSearchedLikedMovies] = React.useState([]);
  const [updateUserInfoResponse, setupdateUserInfoResponse] = React.useState('');
  const [isSavedSearchUsed, setIsSavedSearchUsed] = React.useState(false);
  const [isShortFilmChecked, setShortFilmChecked] = React.useState(false);
  const [registrationResponse, setRegistrationResponse] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [profileError, setProfileError] = React.useState('');
  const [RegisterError, setRegisterError] = React.useState('');
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  
  
  const history = useHistory();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  

  const checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus'));
  
  
  function initialMovieSearch(searchQuery) {
    setIsLoading(true);
    apiBF.getAllMovies()
        .then((data) => {          
          localStorage.setItem('allMovies', JSON.stringify(data));          
          setMovies(data);
          const searchedMovies = data.filter(movie => {
            return movie.nameRU.toLowerCase().includes(searchQuery);
          })
            localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
            setSearchedMovies(searchedMovies);
          })              
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
  }


  function initialShortMovieSearch(searchQuery) {
    setIsLoading(true);
    apiBF.getAllMovies()
        .then((data) => {          
          localStorage.setItem('allMovies', JSON.stringify(data));          
          setMovies(data);
          const searchedShortMovies = data.filter(movie => {
            return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= 40;
          })
            localStorage.setItem('foundMovies', JSON.stringify(searchedShortMovies));
            setSearchedMovies(searchedShortMovies);
          })              
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
  }
  
  
  function searchMovies(searchQuery) {        
    if(!movies || movies.length < 1) {
      if(!isShortFilmChecked) {
        
        initialMovieSearch(searchQuery)
      } else {
        initialShortMovieSearch(searchQuery)
      }
    } else {
      if(!isShortFilmChecked) {        
        const searchedMovies = movies.filter(movie => {
          return movie.nameRU.toLowerCase().includes(searchQuery);
        })
          localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
          setSearchedMovies(searchedMovies);
      } else {
        const searchedShortMovies = movies.filter(movie => {
          return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= 40;
        })
        localStorage.setItem('foundMovies', JSON.stringify(searchedShortMovies));
        setSearchedMovies(searchedShortMovies);
      }  
    }
  }  
    
  

    function searchSavedMovies(searchQuery) {
      // const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      if(!isShortFilmChecked) {
        const searchedSavedMovies = likedMovies.filter((film) => {
          return film.nameRU.toLowerCase().includes(searchQuery);
        });
        // setMovies(searchedSavedMovies);
        setLikedMovies(searchedSavedMovies);
      } else {
        const searchedSavedShortMovies = likedMovies.filter((film) => {        
          return  film.nameRU.toLowerCase().includes(searchQuery) && film.duration <= 40;
        });
        // setMovies(searchedSavedShortMovies);
        setLikedMovies(searchedSavedShortMovies);
      }
    }


    function toggleCheckBox(searchQuery) {      
        if(isShortFilmChecked) {        
          const searchedMovies = movies.filter(movie => {
            return movie.nameRU.toLowerCase().includes(searchQuery);
          })
            localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
            setSearchedMovies(searchedMovies);
            setShortFilmChecked(!isShortFilmChecked);
        } else {
          const searchedShortMovies = movies.filter(movie => {
            return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= 40;
          })
          localStorage.setItem('foundMovies', JSON.stringify(searchedShortMovies));
          setSearchedMovies(searchedShortMovies);
          setShortFilmChecked(!isShortFilmChecked);
      }
    }  


    function toggleSavedMoviesCheckBox(searchQuery) {      
      if(isShortFilmChecked) {        
        const searchedSavedMovies = likedMovies.filter((film) => {
          return film.nameRU.toLowerCase().includes(searchQuery);
        });          
        setLikedMovies(searchedSavedMovies);
          setShortFilmChecked(!isShortFilmChecked);
      } else {
        const searchedSavedShortMovies = likedMovies.filter((film) => {        
          return  film.nameRU.toLowerCase().includes(searchQuery) && film.duration <= 40;
        });        
        setLikedMovies(searchedSavedShortMovies);
        setShortFilmChecked(!isShortFilmChecked);
    }
  } 





  // function searchMovies(searchQuery) {
  //   const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  //   if(!isShortFilmChecked) {
  //     const searchedMovies = allMovies.filter(movie => {
  //     return movie.nameRU.toLowerCase().includes(searchQuery);
  //   })
  //     localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
  //     setAllMovies(searchedMovies);
  //   } else {
  //     const searchedShortMovies = allMovies.filter(movie => {
  //       return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= 40;
  //     })
  //     localStorage.setItem('foundMovies', JSON.stringify(searchedShortMovies));
  //     setAllMovies(searchedShortMovies);
  //   }    
  // }

  // function searchSavedMovies(searchQuery) {
  //   updateSavedMovies();
  //   const savedMoviess = JSON.parse(localStorage.getItem('savedMovies'));
  //   const foundSavedMovies = savedMoviess.filter((movie) => (movie.owner === currentUser.userId));
    
  //   if(!isShortFilmChecked) {
  //     const searchedFlicks = foundSavedMovies.filter(flick => {        
  //     return flick.nameRU.toLowerCase().includes(searchQuery);
  //   }); 
  //   setFoundSavedMovies(searchedFlicks);
  //   setIsSavedSearchUsed(true);
  //   localStorage.setItem('foundSavedMovies', JSON.stringify(searchedFlicks));
  //   } else {
  //     const searchedShortFlicks = foundSavedMovies.filter((item) => {        
  //     return  item.nameRU.toLowerCase().includes(searchQuery) && item.duration <= 40;
  //     });   
  //     setFoundSavedMovies(searchedShortFlicks);
  //     setIsSavedSearchUsed(true);
  //     localStorage.setItem('foundSavedMovies', JSON.stringify(searchedShortFlicks));
  //   }        
  // }

  // function firstSearch(searchQuery) {
  //   setIsLoading(true);
  //   apiBF.getAllMovies()
  //       .then((data) => {
  //         localStorage.setItem('allMovies', JSON.stringify(data));          
  //         searchMovies(searchQuery);
  //         setIsSearchUsed(true);
  //       })       
  //       .catch(err => console.log(err))
  //       .finally(() => setIsLoading(false));
  // }


  // function handleMovieSearch(searchQuery) {
  //   if(!isSearchUsed) {
  //     firstSearch(searchQuery);
  //   } else {
  //     searchMovies(searchQuery);
  //   }
  // }

   
  

    function setCurrentUserInfo() {
      api.getCurrentUser()
          .then((data) => {            
            setCurrentUser(data);                 
        })
        .catch(() => {setServerError(true)})
    }


  function handleRegistration(name, email, password) {
    api.register(name, email, password)
      .then((res) => {  
        if(res) {          
          handleLogin({email, password})
        } else {
        setRegistrationResponse('Пользователь с таким email уже зарегистрирован')
        }
      })
      .catch((err) => {
        setRegisterError('Что-то пошло не так. Попробуйте ещё раз');
        if (err === 400) {
          return setRegisterError('Неправильно заполнено одно из полей ');
        }
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
        history.push('/movies');      
      }; 
    })
    .catch((err) => {
      setLoginError('Попробуйте еще раз');
      console.log(err);
    });
    if(isLoggedIn) {
      api.getContent()
        .then((userInfo) => {setCurrentUserInfo(userInfo)})
        .catch(() => setProfileError("Не удалось обновить данные"))
    }
  };


  function updateMovies() {    
    setSearchedMovies(searchedMovies);    
  }


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
        setupdateUserInfoResponse('Данные профиля успешно обновлены');
      })
      .catch(() => setupdateUserInfoResponse('Что-то пошло не так! Проверьте введённые данные'));
  }


  function handleLike (movie) {
    api.saveMovie(movie)      
      .catch(err => console.log(err));
      updateSavedMovies();
  }


  

  
function deleteSavedMovie(movie) {
    api.deleteSavedMovie(movie._id)
    .then(() => updateSavedMovies())     
    .catch(err => console.log(err));     
  }

  

  // function tokenCheck() {
  //   const token = localStorage.getItem('token');  
  //   if(token) {    
  //     api.getContent(token)         
  //       .then((res) => {
  //         localStorage.setItem('isLoggedIn', true);          
  //         setCurrentUser(res);                      
  //       })
  //       .catch(err => console.log(err)); 
  //     }
  // }


  function logOut() {
    localStorage.clear();       
    setCurrentUser({});
    history.push('/');
  }

  
  

    

  function tokenCheck() {
    const token = localStorage.getItem('token');
    const allMovies = localStorage.getItem('allMovies');
    const savedMovies = localStorage.getItem('savedMovies');
    if (token) {
        setToken(token);
        if (allMovies) {
            const movies = JSON.parse(allMovies);
            setMovies(movies);
        }
        if (savedMovies) {
            const likedFilms = JSON.parse(savedMovies);
            setLikedMovies(likedFilms);
        }
        api.getContent(token)
            .then((user) => {
              setCurrentUser(user);
              localStorage.setItem('isLoggedIn', true);
              setIsLogged(true);
              history.push(location.pathname);
            })
            .catch((err) => {
                setServerError(true);
            })
    }
}
React.useEffect(() => {
    tokenCheck();    
}, []);

React.useEffect(() => {
  localStorage.setItem('checkboxStatus', JSON.stringify(isShortFilmChecked));    
}, [isShortFilmChecked]);


  function editProfile () {
    setEditProfilePopupState(!isEditProfilePopupOpen);
  }

  function closeEditProfilePopup () {
    setEditProfilePopupState(false);
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>          
          <Route path="/signup">
            <Register handleRegistration={handleRegistration} registrationResponse={registrationResponse} />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin}/>
          </Route>
          <ProtectedRoute path="/movies" component={Movies} movies={searchedMovies} searchMovies={searchMovies} toggleCheckBox={toggleCheckBox} updateMovies={updateMovies} isLoading={isLoading} isLoggedIn={isLoggedIn} isShortFilmChecked={isShortFilmChecked} handleLike={handleLike} deleteSavedMovie={deleteSavedMovie}/>
          <ProtectedRoute path="/saved-movies" component={SavedMovies} movies={likedMovies} toggleSavedMoviesCheckBox={toggleSavedMoviesCheckBox} likedMovies={likedMovies} updateSavedMovies={updateSavedMovies} foundSavedMovies={foundSavedMovies} isSavedSearchUsed={isSavedSearchUsed} isLoggedIn={isLoggedIn} onSearchSaved={searchSavedMovies} deleteSavedMovie={deleteSavedMovie} isShortFilmChecked={isShortFilmChecked} />
          <ProtectedRoute path="/profile" component={Profile} isLoggedIn={isLoggedIn} onLogout={logOut} setCurrentUserInfo={setCurrentUserInfo} onEdit={editProfile} onUpdate={updateUserInfo} updateUserInfoResponse={updateUserInfoResponse} isEditProfilePopupOpen={isEditProfilePopupOpen} onClose={closeEditProfilePopup} />
          <Route path="/*">
            <Page404 />
          </Route>          
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
