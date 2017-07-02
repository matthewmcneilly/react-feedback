import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';
import RotateLoader from 'respinner/lib/RotateLoader';
import { Redirect } from 'react-router-dom';
import { setFieldValue, submitForm} from '../actions/signup';

const styles = {
  errorTextStyle: {
    textAlign: 'center',
    color: 'red'
  }
};

// display rotate loader or render content based on loading state
class Signup extends Component {
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
        onClick={this.props.onButtonPress}
        >
        Sign up
      </Button>
    );
  }

  render() {
    // if authenticated then redirect
    if (this.props.isAuthenticated) {
      const { from } = this.props.location.state || { from: { pathname: '/projects' }} ;

      return <Redirect to={from} />
    }

    // inject data into components from redux store
    // when data changes save to redux store 
    return (
      <Form horizontal>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            BCode
          </Col>
          <Col sm={9}>
            <FormControl
              type="text"
              placeholder="A00000000"
              onChange={e => {this.props.updateField('BCode', e.target.value)}}
              value={this.props.BCode}
              />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={9}>
            <FormControl
              type="email"
              placeholder="buzzlightyear@andysroom.com"
              onChange={e => {this.props.updateField('email', e.target.value)}}
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
              onChange={e => {this.props.updateField('password', e.target.value)}}
              value={this.props.password}
              />
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

const mapStateToProps = ({ signup, auth }) => {
  const { isAuthenticated } = auth;
  const { email, password, BCode } = signup;
  return { email, password, BCode, isAuthenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    updateField: (field, value) => dispatch(setFieldValue({field, value})),
    onButtonPress: () => dispatch(submitForm())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
