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