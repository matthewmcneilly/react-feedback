import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getNotesById } from '../../reducers/Entities';
import NoteItem from './NoteItem';
import NoteCreate from './NoteCreate';

const styles = {
  wrapper: {
    marginTop: 40
  },
  title: {
    marginBottom: 20
  }
}

class NotesSection extends Component {
  renderNotes() {
    return this.props.notes.map(note =>
      <NoteItem key={note.id} title={note.title} id={note.id} content={note.content} />
    );
  }

  render() {
    const { notes } = this.props;

    return (
      <div className="Project" style={styles.wrapper}>
        <h4 style={styles.title}>Notes ({this.props.notes.length})</h4>
        <div style={{display: 'inline-flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <NoteCreate />
          {this.renderNotes()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const noteIds = props.noteIds ? Object.keys(props.noteIds) : undefined;
  return {
    notes: noteIds ? getNotesById(state, noteIds) : []
  };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesSection);
