// in src/App.js
import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./users";
import { ProductList } from "./products";

const dataProvider = jsonServerProvider("http://192.168.1.2:4000/api/");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="buyers" list={UserList}></Resource>
    <Resource name="products" list={ProductList}></Resource>
  </Admin>
);

export default App;
