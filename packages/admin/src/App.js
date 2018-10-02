import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-sails';

const dataProvider = jsonServerProvider('/api');
const App = () => <Admin dataProvider={ dataProvider } />;

export default App;
