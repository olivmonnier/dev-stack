import React from 'react';
import { AppBar } from 'react-admin';
import UserMenuCustom from './UserMenu';

const AppBarCustom = props => <AppBar {...props} userMenu={<UserMenuCustom />} />;

export default AppBarCustom;