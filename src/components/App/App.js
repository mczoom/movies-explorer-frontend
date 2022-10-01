import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';
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
  const [savedMoviess, setSavedMoviess] = React.useState([]);
  const [updateUserInfoResponse, setupdateUserInfoResponse] = React.useState(''); 
  const [isSearchUsed, setIsSearchUsed] = React.useState(false);
  const [isShortFilmChecked, setShortFilmChecked] = React.useState(false);
  const [registrationResponse, setRegistrationResponse] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  
  
  const history = useHistory();

  
  
  
  function searchMovies(searchQuery) {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    const searchedMovies = allMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(searchQuery);
    })
    localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));    
  }

  function searchShortMovies(searchQuery) {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    const searchedMovies = allMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= 40;
    })
     localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
  }


  
  function handleMovieSearch(searchQuery) {    
      apiBF.getAllMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));          
          (isShortFilmChecked) ? searchShortMovies(searchQuery) : searchMovies(searchQuery);
          setIsSearchUsed(true);
        })       
        .catch(err => console.log(err));        
      }


  // function handleMovieSearch(searchQuery) {    
  //   apiBF.getAllMovies()
  //     .then((data) => {
  //       setAllMovies(data);
  //       (isShortFilmChecked) ? searchShortMovies(searchQuery) : searchMovies(searchQuery);
  //     })  
  //     .catch(err => console.log(err));
      
  //     setIsSearchUsed(true);
  //   }


     
    
    function handleCheckboxChange(searchQuery) {      
      setShortFilmChecked(!isShortFilmChecked);
      if(isSearchUsed && isShortFilmChecked) {
        searchMovies(searchQuery);
      } else if(isSearchUsed && !isShortFilmChecked){
        searchShortMovies(searchQuery);        
      }           
    }


    function setCurrentUserInfo() {
      api.getCurrentUser()
          .then((data) => {            
            setCurrentUser(data);                 
        })
          .catch(err => console.log(err));
    }


  function handleRegistration(name, email, password) {
    api.register(name, email, password)
      .then((res) => {  
        if(res) {
          localStorage.setItem('isLoggedIn', true);
          setCurrentUserInfo();
          history.push('/movies');
        }
        setRegistrationResponse('Пользователь с таким email уже зарегистрирован')
      })
      .catch(err => console.log(err))      
  }
      
      
  function handleLogin(login, password) {
    api.login(login, password)
    .then((data) => {
      if(data.token) {        
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', true);
        setCurrentUserInfo();
        
        history.push('/movies');            
      }
    })
    .catch(err => console.log(err))
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


  function updateAllSavedMovies() {
    api.getAllSavedMovies()
      .then((movies) => {
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        setSavedMoviess(movies);
      })
      .catch(err => console.log(err));
  }
console.log(savedMoviess);

  
function deleteSavedMovie(movie) {
    api.deleteSavedMovie(movie._id)
     
      .catch(err => console.log(err));
      updateAllSavedMovies();
      
  }


  function tokenCheck() {
    const token = localStorage.getItem('token');  
    if(token) {    
      api.getContent(token)         
        .then((res) => {
          localStorage.setItem('isLoggedIn', true);          
          setCurrentUser(res);                      
        })
        .catch(err => console.log(err)); 
      }
  }


  function logOut() {
    localStorage.clear();    
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('checkboxStatus', false);
    setCurrentUser({});
    history.push('/');
  }

  
  const isLoggedIn = localStorage.getItem('isLoggedIn');

    

  React.useEffect(() => {
    tokenCheck();
       
  }, [isLoggedIn])


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
          <ProtectedRoute path="/movies" component={Movies} isLoggedIn={isLoggedIn} onSearch={handleMovieSearch} onChecked={handleCheckboxChange} isShortFilmChecked={isShortFilmChecked} handleLike={handleLike}/>
          <ProtectedRoute path="/saved-movies" component={SavedMovies} isLoggedIn={isLoggedIn} updateAllSavedMovies={updateAllSavedMovies} deleteSavedMovie={deleteSavedMovie} />
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
