import React from 'react';
import { Admin, Resource } from 'react-admin';
import englishMessages from './i18n/en';
import frenchMessages from './i18n/fr';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import theme from './theme';

import CustomLayout from './Layout';
import CustomMenu from './Menu';

import { PostList, PostEdit, PostCreate } from './posts';

const messages = {
  fr: frenchMessages,
  en: englishMessages
};

const i18nProvider = locale => messages[locale];

const App = () => (
  <Admin 
    locale="fr" 
    i18nProvider={i18nProvider} 
    appLayout={CustomLayout} 
    menu={CustomMenu} 
    theme={theme}
    dataProvider={ dataProvider } 
    authProvider={ (process.env.NODE_ENV === 'production') ? authProvider : null } 
  >
    <Resource name="posts" list={ PostList } edit={ PostEdit } create={ PostCreate } />
  </Admin>
);

export default App;
