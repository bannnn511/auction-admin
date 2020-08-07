import * as React from 'react';
import { fetchUtils, Admin, Resource, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './users';
import { ProductList, PostCreate } from './products';
import authProvider from './authProvider';
import Dashboard from './Dashboard';
import { URL } from './constant';
import UserIcon from '@material-ui/icons/Group';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};
export const dataProvider = jsonServerProvider(URL, httpClient);
//dataProvider.create('')

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    {(permissions) => [
      permissions === 'admin' ? (
        <Resource
          name="buyers"
          list={UserList}
          icon={UserIcon}
          edit={EditGuesser}
        ></Resource>
      ) : null,
      <Resource name="auctions" list={ProductList}></Resource>,
      <Resource name="products" list={PostCreate}></Resource>,
    ]}
  </Admin>
);

export default App;
