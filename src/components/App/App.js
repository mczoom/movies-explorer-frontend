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
  const [allMovies, setAllMovies] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [updateUserInfoResponse, setupdateUserInfoResponse] = React.useState(''); 
  const [isSearchUsed, setIsSearchUsed] = React.useState(false);
  const [isSavedSearchUsed, setIsSavedSearchUsed] = React.useState(false);
  const [isShortFilmChecked, setShortFilmChecked] = React.useState(false);
  const [registrationResponse, setRegistrationResponse] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [profileError, setProfileError] = React.useState('');
  const [RegisterError, setRegisterError] = React.useState('');
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
  
  
  const history = useHistory();
  const pathname = useLocation();

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  
  // function searchMovies(searchQuery) {
  //   const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  //   const searchedMovies = allMovies.filter(movie => {
  //     return movie.nameRU.toLowerCase().includes(searchQuery);
  //   })
  //   localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
  // }


  // function searchShortMovies(searchQuery) {
  //   const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  //   const searchedMovies = allMovies.filter(movie => {
  //     return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= 40;
  //   })
  //    localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));     
  // }

  // function handleMovieSearch(searchQuery) {
  //   if(!isSearchUsed) {
  //     apiBF.getAllMovies()
  //       .then((data) => {
  //         localStorage.setItem('allMovies', JSON.stringify(data));          
  //         (isShortFilmChecked) ? searchShortMovies(searchQuery) : searchMovies(searchQuery);
  //         setIsSearchUsed(true);
  //       })       
  //       .catch(err => console.log(err));
  //   } else {
  //       (isShortFilmChecked) ? searchShortMovies(searchQuery) : searchMovies(searchQuery);
  //   }
  // }
      
    
  //   function handleCheckboxChange(searchQuery) {      
  //     setShortFilmChecked(!isShortFilmChecked);
  //     if(isShortFilmChecked) {
  //       searchMovies(searchQuery);
  //     } else if(!isShortFilmChecked){
  //       searchShortMovies(searchQuery);        
  //     }           
  //   }



  function searchMovies(searchQuery) {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    if(isShortFilmChecked) {
      const searchedMovies = allMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(searchQuery);
    })
      localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
      setAllMovies(searchedMovies);
    } else {
      const searchedShortMovies = allMovies.filter(movie => {
        return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= 40;
      })
      localStorage.setItem('foundMovies', JSON.stringify(searchedShortMovies));
      setAllMovies(searchedShortMovies);
    }    
  }

  async function searchSavedMovies(searchQuery) {
    updateAllSavedMovies();
    const savedMoviess = JSON.parse(localStorage.getItem('savedMovies'));
    const foundSavedMovies = savedMoviess.filter((movie) => (movie.owner === currentUser.userId));
    console.log(foundSavedMovies);
    
    if(!isShortFilmChecked) {
      const searchedFlicks = await foundSavedMovies.filter(flick => {        
      return flick.nameRU.toLowerCase().includes(searchQuery);
    });
    console.log(searchedFlicks); 
    setFoundSavedMovies(searchedFlicks);
    setIsSavedSearchUsed(true);
    localStorage.setItem('foundSavedMovies', JSON.stringify(searchedFlicks));
    } else {
      const searchedShortFlicks = await foundSavedMovies.filter((item) => {        
      return  item.nameRU.toLowerCase().includes(searchQuery) && item.duration <= 40;
      });
      console.log(searchedShortFlicks);   
      setFoundSavedMovies(searchedShortFlicks);
      setIsSavedSearchUsed(true);
      localStorage.setItem('foundSavedMovies', JSON.stringify(searchedShortFlicks));
    }        
  }
console.log(foundSavedMovies);

  function firstSearch(searchQuery) {
    apiBF.getAllMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));          
          searchMovies(searchQuery);
          setIsSearchUsed(true);
        })       
        .catch(err => console.log(err));
  }


  function handleMovieSearch(searchQuery) {
    if(!isSearchUsed) {
      firstSearch(searchQuery);
    } else {
      searchMovies(searchQuery);
    }
  }

  function handleCheckboxChange(searchQuery) {
    setShortFilmChecked(!isShortFilmChecked);     
    searchMovies(searchQuery);     
  }  
  

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
        updateAllSavedMovies();     
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


  function updateAllSavedMovies() {
    api.getAllSavedMovies()
      .then((movies) => {
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        setSavedMovies(movies);
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
      updateAllSavedMovies();
  }


  

  
function deleteSavedMovie(movie) {
    api.deleteSavedMovie(movie._id)
    .then(() => updateAllSavedMovies())     
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
            setAllMovies(movies);
        }
        if (savedMovies) {
            const likedMovies = JSON.parse(savedMovies);
            setSavedMovies(likedMovies);
        }
        api.getContent(token)
            .then((user) => {
              setCurrentUser(user);
              localStorage.setItem('isLoggedIn', true);
              setIsLogged(true);
              history.push(pathname.pathname);
            })
            .catch((err) => {
                setServerError(true);
            })
    }
}
React.useEffect(() => {
    tokenCheck();
}, []);


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
          <ProtectedRoute path="/movies" component={Movies} foundMovies={foundMovies} savedMovies={savedMovies} isLoggedIn={isLoggedIn} onSearch={handleMovieSearch} onChecked={handleCheckboxChange} isShortFilmChecked={isShortFilmChecked} handleLike={handleLike} deleteSavedMovie={deleteSavedMovie}/>
          <ProtectedRoute path="/saved-movies" component={SavedMovies} foundMovies={foundMovies} savedMovies={savedMovies} foundSavedMovies={foundSavedMovies} isSavedSearchUsed={isSavedSearchUsed} isLoggedIn={isLoggedIn} onSearchSaved={searchSavedMovies} deleteSavedMovie={deleteSavedMovie} onChecked={handleCheckboxChange} isShortFilmChecked={isShortFilmChecked} />
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
