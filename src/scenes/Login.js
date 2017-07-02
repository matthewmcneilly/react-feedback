import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Button } from 'react-bootstrap';
import RotateLoader from 'respinner/lib/RotateLoader';
import { Redirect } from 'react-router-dom';

const styles = {
  errorTextStyle: {
    textAlign: 'center',
    color: 'red'
  }
};

// when user changes email update state in redux
class Login extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text.target.value);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.target.value);
  }

  // call loginUser action pass email and password
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  // render rotate loader or button depending if auth is being determined
  renderButton() {
    if (this.props.loading) {
      return <RotateLoader
        duration={2}
        stroke="#4197ff"
        opacity={0.4}
        size={60}
        />;
    }

    return (
      <Button
        onClick={this.onButtonPress.bind(this)}
        >
        Sign in
      </Button>
    );
  }

  render() {
    if (this.props.location.state) {
      console.log('please login first')
    }

    // when authenticated redirect to previous from url or projects if null
    if (this.props.isAuthenticated) {
      const { from } = this.props.location.state || { from: { pathname: '/projects' }} ;
      return <Redirect to={from} />
    }

    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={9}>
            <FormControl
              type="email"
              placeholder="buzzlightyear@andysroom.com"
              onChange={this.onEmailChange.bind(this)}
              value={this.props.email}
              />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={9}>
            <FormControl
              type="password"
              placeholder="toinfinityandbeyond"
              onChange={this.onPasswordChange.bind(this)}
              value={this.props.password}
              />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <h4 style={styles.errorTextStyle}>
          {this.props.error}
        </h4>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            {this.renderButton()}
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, loading, error, isAuthenticated } = auth;
  return { email, password, loading, error, isAuthenticated };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
}) (Login);
