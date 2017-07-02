import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getShowModal } from '../../reducers/Projects';
import { setModalVisibility, createNewProject } from '../../actions/projects';
import NewProjectForm from './NewProjectForm';

class NewProjectModal extends Component {
  render() {
    return (
      <Modal show={this.props.isModalVisible} onHide={this.props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewProjectForm />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.hideModal}>Close</Button>
        <Button onClick={this.props.submitForm}>Submit</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isModalVisible: getShowModal(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(setModalVisibility({isVisible: false})),
    submitForm: () => dispatch(createNewProject())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectModal)
