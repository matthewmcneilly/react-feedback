import React from 'react';
import { connect } from 'react-redux';
import { getUserById } from '../../reducers/Entities';

const ChatUser = ({user}) => {
  if (!user) { return null;}

  return <strong>{user.name ? user.name : user.email}</strong>
}


function mapStateToProps(state, props) {
  return {
    user: getUserById(state, props.userId),
  };
}

export default connect(mapStateToProps)(ChatUser);
