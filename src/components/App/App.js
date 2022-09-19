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

  const [movies, setMovies] = React.useState([]);

  function handleMovieSearch(e) {
    e.preventDefault();
    if (!movies.length) {
      apiBF.getAllMovies()
      .then((data) => setMovies(data))      
      .catch(err => console.log(err))
    }
}






  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
        <Movies onSearch={handleMovieSearch} movies={movies} />
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
