import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { saveNote } from '../../actions/note';
import { Grid, Row, Col } from 'react-bootstrap';

class Editor extends Component {

  _mounted = false

  _pollingId: undefined

  constructor(props) {
    super(props);
    this.state = {
      contentLastSaved: undefined,
      content: props.note.content,
      title: props.note.title
    };
  }

  componentDidMount = () => {
    this._mounted = true;
    this._pollingId = setInterval(()=> {
      this._saveContent();
    }, 5000);
  }

  componentWillUnmount = () => {
    this._mounted = false;
    this._saveContent();
    clearInterval(this._pollingId);
  }

  _handleTextChange = e => {
    this.setState({content: e.target.value });
  }

  _saveContent = () => {
    const { contentLastSaved, content } = this.state;
    const originalNote = this.props.note;
    const noteWithNewContent = {
      ...originalNote,
      content
    };

    // if content has changed since the last save, save it.
    if ( content !== contentLastSaved ) {
      console.log('saving…');
      this.props.dispatch(saveNote({note: noteWithNewContent}));
      // udate contentLastSaved with the content we just saved.
      if (this._mounted) {
        this.setState({contentLastSaved: content});
      }
    }
  }

  _handleTitleChange = e => {
    this.setState({title: e.target.value});
  }

  _handleTitleBlur = e => {
    // save title on blur
    const { title } = this.state;
    const originalNote = this.props.note;
    const noteWithNewTitle = {
      ...originalNote,
      title
    };
    this.props.dispatch(saveNote({note: noteWithNewTitle}));
  }

  render() {
    const { note } = this.props;

    const editorStyle = {
      width: "100%",
      height: "200px",
      marginLeft: "-15px",
      marginTop: "10px"
    };

    const viewStyle = {
      height: "200px"
    };

    return(
      <div className="Editor">
        <input
          className="note-title"
          value={this.state.title}
          onChange={this._handleTitleChange}
          onBlur={this._handleTitleBlur}
          placeholder="Note Title"
        />

        <Grid>
          <Row>

            <Col xs={12} md={6}>
              <textarea style={editorStyle} value={this.state.content} onChange={this._handleTextChange}/>
            </Col>
            <Col xs={12} md={6} style={viewStyle}>
              <ReactMarkdown source={this.state.content} />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect()(Editor);
