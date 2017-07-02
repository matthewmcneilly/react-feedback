import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { createNote } from '../../actions/project';
import { getActiveProjectId } from '../../reducers/Project';
import { connect } from 'react-redux';

class NoteCreate extends Component {


  render() {
    const glyphStyle = {
      fontSize: "30px",
      color: "white",
      positon: 'relative',
      marginTop: '-5px'
    };
    const { id, projectId } = this.props;
    const containerStyle = {
      backgroundColor: "#ddd",
      width: "125px",
      height: "125px",
      overflow: "hidden",
      borderRadius: "4px",
      margin: "0 20px 20px 0",
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    };
    const contentStyle = {
      textAlign: "center",
      color: "white"
    };
    console.log({projectId})

    return (
        <div style={containerStyle} onClick={() => this.props.createNote(projectId)}>
          <div className="glyphicon glyphicon-plus" style={glyphStyle}></div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    createNote: projectId => dispatch(createNote({ browserHistory: props.history, projectId }))
  }
}

function mapStateToProps(state) {
  return {
    projectId: getActiveProjectId(state)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteCreate));
