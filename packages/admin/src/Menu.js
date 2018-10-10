import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, Responsive, getResources, translate } from 'react-admin';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';

const Menu = ({ resources, onMenuClick, logout, translate }) => (
  <div>
    {resources.map(resource => (
      <MenuItemLink 
        key={resource.name}
        to={`/${resource.name}`} 
        primaryText={translate(`resources.${resource.name}.name`, {
          smart_count: 2
        })} 
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