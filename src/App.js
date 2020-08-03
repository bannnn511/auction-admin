import * as React from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './users';
import { ProductList } from './products';
import authProvider from './authProvider';
import Dashboard from './Dashboard';
import { URL } from './constant';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider(URL, httpClient);

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    {(permissions) => [
      permissions === 'admin' ? (
        <Resource name="buyers" list={UserList}></Resource>
      ) : null,
      <Resource name="products" list={ProductList}></Resource>,
    ]}
  </Admin>
);

export default App;
