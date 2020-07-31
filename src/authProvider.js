import { URL } from './constant';
import decodeJwt from 'jwt-decode';

export default {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    localStorage.setItem('username', username);
    const url = URL + '/auth/login';
    console.log(url);
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        const decodedToken = decodeJwt(token);
        console.log('========', decodedToken);
        localStorage.setItem('token', token);
        localStorage.setItem('permissions', decodedToken.permissions);
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    const url = URL + '/auth/logout';
    console.log(url);
    const request = new Request(url, {
      method: 'GET',
      //body: JSON.stringify({ email: username, password }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });

    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
      });
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem('token')
      ? Promise.resolve()
      : Promise.reject({ redirectTo: '/no-access' });
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    const role = localStorage.getItem('permissions');
    return role ? Promise.resolve(role) : Promise.reject();
  },
};
