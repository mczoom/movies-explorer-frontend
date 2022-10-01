export const BASE_URL = 'https://api.myflicks.nomoredomains.sbs';


export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password})
    })
    .then((res) => {
      try {
        if (res.status === 201){
          return res.json();
        }
      } catch(e){
        return (e)
      }
    })
    .catch((err) => console.log(err));
  }; 


  export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email, password)
    })
    .then((res) => {
      try {
        if (res.status === 200){
          return res.json();
        }
      } catch(e){
        return (e)
      }
    })
    .catch((err) => console.log(err));
  };


  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(res => res.json())    
    .catch((err) => console.log(err));
  };


  export const getCurrentUser = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }      
    })
    .then(res => res.json())    
    .catch((err) => console.log(err));    
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
    .then(res => res.json())    
    .catch((err) => console.log(err));
}

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id})
  })
  .then(res => res.json())    
  .catch((err) => console.log(err));
};


export const getAllSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then(res => res.json())    
    .catch((err) => console.log(err));
  };


  export const deleteSavedMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },        
    })
    .then(res => res.json())    
    .catch((err) => console.log(err));
}
