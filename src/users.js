import * as React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="fullname" />
      <EmailField source="email" />
      <TextField source="address" />
    </Datagrid>
  </List>
);
