import React from 'react';
import { Layout } from 'react-admin';
import AppBarCustom from './AppBar';

const CustomLayout = props => (
  <Layout
    {...props}
    appBar={AppBarCustom}
  />
);

export default CustomLayout;