import { URL } from './constant';
import decodeJwt from 'jwt-decode';

// called when the user attempts to log in
async function login({ username, password }) {
  console.log('Login');
  console.log(username, password);
  localStorage.setItem('email', username);
  localStorage.setItem('password', password);
  const url = URL + '/auth/login';
  console.log(url);
  const request = await new Request(url, {
    method: 'POST',
    body: JSON.stringify({ email: username, password }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });

  return await fetch(request)
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
}

// called when the user clicks on the logout button
async function logout() {
  console.log('Logout');
  const token = localStorage.getItem('token');
  if (token) {
    if (!token) console.log('=======', decodeJwt(token));
    if (decodeJwt(token).exp < new Date().getTime() / 1000) {
      const username = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      console.log('123456', username, password);
      await login({ username, password });
      console.log('EXPIRED');
    }
    const url = URL + '/auth/logout';
    console.log(url);
    const request = await new Request(url, {
      method: 'GET',
      //body: JSON.stringify({ email: username, password }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });

    return await fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
      });
  } else {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    return Promise.resolve();
  }
}

// called when the API returns an error
function checkError({ status }) {
  console.log('check error');
  if (status === 401 || status === 403) {
    localStorage.removeItem('token');
    return Promise.reject();
  }
  return Promise.resolve();
}

// called when the user navigates to a new location, to check for authentication
function checkAuth() {
  console.log('check auth');
  return localStorage.getItem('token')
    ? Promise.resolve()
    : Promise.reject({ redirectTo: '/no-access' });
}

// called when the user navigates to a new location, to check for permissions / roles
function getPermissions() {
  console.log('get permissions');
  const role = localStorage.getItem('permissions');
  return role ? Promise.resolve(role) : Promise.reject();
}

export default {
  login: login,
  logout: logout,
  checkError: checkError,
  checkAuth: checkAuth,
  getPermissions: getPermissions,
};
