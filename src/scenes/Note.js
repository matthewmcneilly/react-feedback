import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute';
import RotateLoader from 'respinner/lib/RotateLoader';
import { loadRoute } from '../actions/note';
import { isLoading, getNote } from '../reducers/Note';
import Editor from '../components/Note/Editor';

// called after render method
class Note extends Component {
  componentDidMount() {
    const noteId = this.props.match.params.id;
    this.props.handleOnRouteLoad(noteId);
  }

  renderLoading() {
    return this.props.isLoading ? (
      <div style={{width: '60px', margin: 'auto'}}>
        <RotateLoader
          duration={2}
          stroke="#4197ff"
          opacity={0.4}
          size={60}
        />
      </div>
    ) : this.renderContent();
  }

  // inject project title and notes into JSX components
  renderContent() {
    const { note = {} } = this.props;
    return (
      <div>
        <h1>{note.title}</h1>
        <Editor note={note} />
      </div>
    )
  }

  render() {
    return (
      <div className="Note">
        <Grid>
          <Row>
            { this.renderLoading() }
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const note = getNote(state);
  return {
    ...props,
    isLoading: isLoading(state),
    note
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleOnRouteLoad: noteId => {
      dispatch(loadRoute({noteId}))
    }
  };
}

export default passedProps => {
  const NoteWithRouteInfo = props => {
    const newProps = {...passedProps, ...props};
    return <Note{...newProps} />;
  }
  return <PrivateRoute {...passedProps} component={connect(mapStateToProps, mapDispatchToProps)(NoteWithRouteInfo)} />
}
