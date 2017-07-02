import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUser } from '../actions';

class NavigationBar extends Component {

  onLogoutClick = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.history.replace('/');
    this.props.handleLogout();
  }

  // render logout or login button depending on auth
  renderAuthLinks() {
    const { isAuthenticated } = this.props;
    return isAuthenticated ? <a onClick={this.onLogoutClick}>Logout</a> : <Link to="/login">Login</Link>;
  }

  // render signup button depending on auth
  renderSignup() {
    const { isAuthenticated } = this.props;
    return !isAuthenticated && (
      <NavItem>
        <Link to="/signup">Signup</Link>
      </NavItem>
    );
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">FeedBack App</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {
          this.props.isAuthenticated && (
          <Nav>
            <NavItem>
              <Link to="/projects">Projects</Link>
            </NavItem>
          </Nav>
        )
      }
        <Nav pullRight>
          <NavItem>
            { this.renderAuthLinks() }
          </NavItem>
          { this.renderSignup() }
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogout: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationBar));
