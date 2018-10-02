import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-sails';
import fakeDataProvider from 'ra-data-fakerest';

import { PostList, PostEdit, PostCreate } from './posts';

const dataProvider = (process.env.NODE_ENV === 'production') 
  ? jsonServerProvider('/api') 
  : fakeDataProvider({
    posts: [
      { id: 0, title: 'First Article' },
      { id: 1, title: 'Second Article' }
    ]
  });
const App = () => (
  <Admin dataProvider={ dataProvider } >
    <Resource name="posts" list={ PostList } edit={ PostEdit } create={ PostCreate } />
  </Admin>
);

export default App;
