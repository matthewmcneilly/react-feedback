import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/project';
import { getDiscussionMessages } from '../../reducers/Project';
import ChatUser from './ChatUser';

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  chatBox: {
    backgroundColor: '#e7e7e7',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  chatBoxInner: {

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  },
  chatInput: {
    border: 0,
    width: '100%',
    height: 60,
    borderRadius: '4px',
    padding: '10px'
  },
  chatWindow: {
    position: 'absolute',
    top: 0,
    bottom: 80,
    left: 0,
    right: 0,
    overflow: 'scroll'
  },
  chatItem: {
    padding: "10px 5px",
    display: 'flex'
  },
  chatItemContent: {

  },
  chatAvatar: {
    height: 50,
    width: 50,
    borderRadius: '150%',
    backgroundColor: '#0099CC',
    marginRight: 10
  },
  chatItemBody: {

  },
  chatItemMeta: {

  }
}

class ChatSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newMessage: ''
    };
  }

  componentDidMount() {
    this._scrollToBottom();
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    if (node) {
      node.scrollIntoView({behavior: "smooth"});
    }
  }

  _messageChanged = (e) => {
    this.setState({
      newMessage: e.target.value
    });
  }

  _onSubmit = (e) => {
    e.preventDefault();
    this.props.submitMessage(this.state.newMessage);
    this.setState({newMessage: ''})
  }

  renderChatBox() {
    return (
      <div style={styles.chatBox}>
        <form onSubmit={this._onSubmit} style={styles.chatBoxInner}>
          <textarea
            placeholder="Message project collaborators"
            value={this.state.newMessage}
            onChange={this._messageChanged}
            style={styles.chatInput}
          />
          <button onClick={this._onSubmit}>+</button>
        </form>
      </div>
    )
  }

  renderChatWindow() {
    const { messages } = this.props;
    if (!messages) { return null; }
    return (
      <div style={styles.chatWindow} >
        {Object.keys(messages).map(message => this.renderChatItem(messages[message]))}
        <div ref={el => { this.messagesEnd = el; }}></div>
      </div>
    )
  }

  renderChatItem(message) {
    return (
      <div style={styles.chatItem}>
        <div style={styles.chatAvatar}></div>
        <div style={styles.chatItemBody}>
          <div style={styles.chatItemMeta}>
            <ChatUser userId={message.owner} /> <span>{new Date(message.createdOn).toLocaleTimeString()}</span>
          </div>
          <div style={styles.chatItemContent}>
            {message.message}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {

    } = this.props;

    return (
      <div className="Chat" style={styles.container}>
        {this.renderChatWindow()}
        {this.renderChatBox()}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    messages: getDiscussionMessages(state),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    submitMessage: (message) => dispatch(createMessage({discussionId: props.discussionId, message}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatSection);
