import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import * as apiBF from '../utils/MoviesApi';




function App() {

  const [allMovies, setAllMovies] = React.useState([]);
  const [isSearchUsed, setIsSearchUsed] = React.useState(false);
  const [isShortFilmChecked, setShortFilmChecked] = React.useState(false);
  

  function searchMovies(searchQuery) {
    const searchedMovies = allMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(searchQuery);
     })
     localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
  }

  function searchShortMovies(searchQuery) {
    const searchedMovies = allMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= 40;
     })
     localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
  }


  function handleMovieSearch(searchQuery) {    
    apiBF.getAllMovies()
      .then((data) =>setAllMovies(data))      
      .catch(err => console.log(err));
      (isShortFilmChecked) ? searchShortMovies(searchQuery) : searchMovies(searchQuery) ;
      setIsSearchUsed(true);
    }

console.log(isSearchUsed);
  // function handleMovieSearch(searchQuery) {    
  //   apiBF.getAllMovies()
  //     .then((data) =>setAllMovies(data))      
  //     .catch(err => console.log(err));
  //     const searchedMovies = allMovies.filter(movie => {
  //      return movie.nameRU.toLowerCase().includes(searchQuery) && movie.duration <= 40;
  //     })
  //     localStorage.setItem('foundMovies', JSON.stringify(searchedMovies));
  //   }

    
    
    function handleCheckboxChange(searchQuery) {      
      setShortFilmChecked(!isShortFilmChecked);
      if(isSearchUsed && isShortFilmChecked) {
        searchMovies(searchQuery);
      } else if(isSearchUsed && !isShortFilmChecked){
        searchShortMovies(searchQuery);        
      }           
    }

  //   React.useEffect(() => {        
      
  //     setShortFilmChecked(checkboxStatus);
  // }, [])
    

    
      
      
    







  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
        <Movies onSearch={handleMovieSearch} onChecked={handleCheckboxChange} isShortFilmChecked={isShortFilmChecked} movies={allMovies} isSearchUsed={isSearchUsed} />
        </Route>
        <Route exact path="/saved-movies">
        <SavedMovies />
        </Route>
        <Route exact path="/profile">
        <Profile />
        </Route>
        <Route exact path="/signup">
        <Register />
        </Route>
        <Route exact path="/signin">
        <Login />
        </Route>
        <Route exact path="/*">
        <Page404 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
