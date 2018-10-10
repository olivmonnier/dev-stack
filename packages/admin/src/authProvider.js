import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'react-admin';

const headers = new Headers({ 
  'Content-Type': 'application/json'
});

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request('/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ username, password }),
      headers
    })

    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(token => {
        localStorage.setItem('jwtToken', token);
      });
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('jwtToken');

    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status  = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('jwtToken');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  
  if (type === AUTH_CHECK) {
    return localStorage.getItem('jwtToken') ? Promise.resolve() : Promise.reject();
  }
  
  return Promise.reject('Unkown method');
}