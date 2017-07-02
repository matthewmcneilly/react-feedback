import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getNewProject } from '../../reducers/Projects';
import { setFieldValue } from '../../actions/projects';

class NewProjectForm extends Component {
  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalTitle">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={9}>
            <FormControl
              type="text"
              placeholder="My Project"
              onChange={e => {this.props.updateField('title', e.target.value)}}
              value={this.props.title}
              />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDescription">
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={9}>
            <FormControl
              componentClass="textarea"
              placeholder="My Project"
              onChange={e => this.props.updateField('description', e.target.value)}
              value={this.props.description}
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

function mapStateToProps(state, props) {
  const { title, description } = getNewProject(state);
  return {
    title,
    description
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateField: (field, value) => dispatch(setFieldValue({field, value}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectForm)
