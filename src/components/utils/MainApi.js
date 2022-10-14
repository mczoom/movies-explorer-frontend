import {BASE_URL} from './config';
import {checkMovieTrailerUrl} from './validators'; 


const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password})
    })
    .then((res) => handleResponse(res));
  }; 


  export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email, password)
    })
    .then((res) => handleResponse(res));
  };


  export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then((res) => handleResponse(res));
  };


  export const getCurrentUser = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }      
    })
    .then((res) => handleResponse(res));    
  };
  
  
  export const updateUser = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({email, name})
    })
    .then((res) => handleResponse(res));
}

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      country: movie.country || 'n/a',
      director: movie.director || 'n/a',
      duration: movie.duration || 'n/a',
      year: movie.year || 'n/a',
      description: movie.description || 'n/a',
      trailerLink: checkMovieTrailerUrl(movie.trailerLink),
      nameRU: movie.nameRU || 'Название не указано',
      nameEN: movie.nameEN || 'n/a',
      image: `https://api.nomoreparties.co${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id})
  })
  .then((res) => handleResponse(res));
};


export const getAllSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then((res) => handleResponse(res));
  };


  export const deleteSavedMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },        
    })
    .then((res) => handleResponse(res));
}
