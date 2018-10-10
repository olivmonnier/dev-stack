import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-sails';
import fakeDataProvider from 'ra-data-fakerest';
import englishMessages from './i18n/en';
import frenchMessages from './i18n/fr';
import authProvider from './authProvider';

import CustomLayout from './Layout';

import { PostList, PostEdit, PostCreate } from './posts';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);

  return fetchUtils.fetchJson(url, options);
}

const dataProvider = (process.env.NODE_ENV === 'production') 
  ? jsonServerProvider('/api', httpClient) 
  : fakeDataProvider({
    posts: [
      { id: 0, title: 'First Article', resume: 'Short description for First Article', content: 'Long text for first Article' },
      { id: 1, title: 'Second Article', resume: 'Short description for Second Article', content: 'Long text for Second Article' }
    ],
    users: [
      { id: 0, username: 'admin', password: 'admin' }
    ]
  });

const messages = {
  fr: frenchMessages,
  en: englishMessages
};

const i18nProvider = locale => messages[locale];

const App = () => (
  <Admin locale="fr" i18nProvider={i18nProvider} appLayout={CustomLayout} dataProvider={ dataProvider } authProvider={ (process.env.NODE_ENV === 'production') ? authProvider : null } >
    <Resource name="posts" list={ PostList } edit={ PostEdit } create={ PostCreate } />
  </Admin>
);

export default App;
