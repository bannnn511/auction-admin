// in src/App.js
import * as React from "react"
import { Admin, Resource } from "react-admin"
import jsonServerProvider from "ra-data-json-server"
import { UserList } from "./users"

const dataProvider = jsonServerProvider("http://localhost:4000/api/")
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="buyers" list={UserList}></Resource>
  </Admin>
)

export default App
