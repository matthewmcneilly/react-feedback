import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUsers, getInviteEmail, getActiveProjectId } from '../../reducers/Project';
import { setUserInviteEmail, inviteToProject } from '../../actions/project';

const styles = {
  userList: {
    borderTop: '1px dotted #e7e7e7',
  },
  user: {
    borderBottom: '1px dotted #e7e7e7',
    padding: '20px 0'
  },
  wrapper: {
    marginTop: 20
  }
}

class UsersSection extends Component {

  renderUser(user) {
    if (!user) { return null; }

    const { email } = user;
    return (
      <div style={styles.user}>
        {email}
      </div>
    )
  }

  render() {
    const {
      users,
      inviteEmail,
      handleEmailChange,
      inviteToProject,
      inviteError,
      projectId
    } = this.props;
    console.log({users})
    return (
      <div className="Users" style={styles.wrapper}>
        <h4>Collaborators ({users.length})</h4>
        <div style={styles.userList}>
          { users.map(this.renderUser) }
        </div>
        <input value={inviteEmail} onChange={e => handleEmailChange(e.target.value)} placeholder="email@email.com" />
        <button
          onClick={() => inviteToProject({email: inviteEmail, projectId})}
        >
          Invite User
        </button>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    users: getUsers(state),
    projectId: getActiveProjectId(state),
    inviteEmail: getInviteEmail(state)
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleEmailChange: email => dispatch(setUserInviteEmail({email})),
    inviteToProject: ({email, projectId}) => dispatch(inviteToProject({email, projectId}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersSection);
