import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, Responsive, getResources, translate } from 'react-admin';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';

import PostsIcon from '@material-ui/icons/Description';
import UsersIcon from '@material-ui/icons/AccountCircle';

const items = [
  { name: 'posts', icon: <PostsIcon /> },
  { name: 'users', icon: <UsersIcon /> },
];

const Menu = ({ onMenuClick, logout, translate }) => (
  <div>
    {items.map(item => (
      <MenuItemLink 
        key={item.name}
        to={`/${item.name}`} 
        primaryText={translate(`resources.${item.name}.name`, {
          smart_count: 2
        })} 
        leftIcon={ item.icon }
        onClick={onMenuClick} 
      />
    ))}
    <Responsive small={logout} medium={null} />
  </div>
);

const mapStateToProps = state => ({
  resources: getResources(state),
  locale: state.i18n.locale
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
  translate
)

export default enhance(Menu);