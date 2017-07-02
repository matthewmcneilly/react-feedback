import React from 'react';
import {
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
  render() {
    const { component, ...props } = this.props;
    return  props.isAuthenticated ? (
        React.createElement(component, ...props)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      );
  }
}


function mapStateToProps(state, props) {
  return {
    ...props,
    isAuthenticated: state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps)(PrivateRoute)
