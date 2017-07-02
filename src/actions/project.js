import firebase from 'firebase';
import { browserHistory } from 'react-router';
import { getProject, getNotesForProject, getUsersForProject } from './entities';
import get from 'lodash/get';

export const actionTypes = {
  SET_ROUTE_LOADING_STATUS: 'project_set_route_loading_state',
  SET_ACTIVE_PROJECT: 'project_set_active_project',
  SET_USER_INVITE_EMAIL: 'project_set_user_invite_email',
  SET_DISCUSSION_MESSAGES: 'project_set_discussion_messages'
};

export const setRouteLoadingStatus = ({isLoading}) => {
  return {
    type: actionTypes.SET_ROUTE_LOADING_STATUS,
    isLoading
  };
}

export const setActiveProject = ({projectId}) => {
  return {
    type: actionTypes.SET_ACTIVE_PROJECT,
    projectId
  };
}

export const setUserInviteEmail = ({email}) => {
  return {
    type: actionTypes.SET_USER_INVITE_EMAIL,
    email
  }
}

export const setDiscussionMessages = ({messages}) => {
  return {
    type: actionTypes.SET_DISCUSSION_MESSAGES,
    messages
  };
}

export const getDiscussionForProject = ({projectId}) => {
  return (dispatch, getState )=> {
    const projectDiscussionId = get(getState(), `entities.projects.byId.${projectId}.discussion`);
    return firebase.database().ref(`discussions/${projectDiscussionId}/messages`)
      .on('value', (snapshot) => {
        dispatch(setDiscussionMessages({messages: snapshot.val()}));
      });
    }
}

export const loadRoute = ({projectId}) => {
  console.log({projectId});
  return dispatch => {
    dispatch(setActiveProject({projectId}));
    dispatch(setRouteLoadingStatus({isLoading: true}));
    dispatch(getProject({projectId}))
      .then(() => dispatch(getNotesForProject({projectId})))
      .then(() => dispatch(getUsersForProject({projectId})))
      .then(() => dispatch(getDiscussionForProject({projectId})))
      .then(() => dispatch(setRouteLoadingStatus({isLoading: false})));
  }
}

export const createNote = ({browserHistory, projectId}) => {
  return (dispatch, getState) => {
    const uid = getState().entities.activeUser.uid;
    // create the note
    return firebase.database().ref('/notes')
      .push({
        createdOn: new Date().getTime(),
        owner: uid,
        draft: false,
        title: ''
      })
      .then(noteId => {
        // update the relationship between projects and notes.
        firebase.database().ref(`/projects/${projectId}/notes`)
          .update({
            [noteId.key]: true
          }).then(() => {
            // When note is created redirect to it.
            browserHistory.push(`/notes/${noteId.key}`)
          }).catch(e => console.log(e))
      })
      .catch(e => console.log(e))
  }
}

export const createMessage = ({discussionId, message}) => {
  return (dispatch, getState) => {
    const uid = getState().entities.activeUser.uid;

    return firebase.database().ref(`/discussions/${discussionId}/messages`)
      .push({
        createdOn: new Date().getTime(),
        owner: uid,
        message
      })
      .then(messageId => {
        console.log({messageId})
      })
      .catch(e => console.log(e))
  }
}

export const inviteToProject = ({email, projectId}) => {
  return (dispatch) => {
    return firebase.database()
      .ref('/users')
      .once('value')
      .then(snapshot => {
        let userKey = undefined;
        snapshot.forEach(userSnapshot => {
          const userEmail = userSnapshot.val().email;
          console.log({userEmail})
          if (userEmail === email) {
            userKey = userSnapshot.key;
            return userKey;
          }
        })
        if (!userKey) {
          window.alert(`${email} doesn't exist`)
          throw new Error("User doesn't exist");
        }
        return userKey;
      })
      .then(userKey => {
        console.log({userKey});
        return firebase.database()
          .ref(`/users/${userKey}/projects`)
          .update({[projectId]: true})
          .then(_ => userKey)
          .catch(e => { throw new Error(e) })
      })
      .then(userKey => {
        return firebase.database()
          .ref(`/projects/${projectId}/users`)
          .update({[userKey]: true})
      })
      .then(_ => window.alert(`${email} has been given access`))
      // reset email field
      .then(_ => dispatch(setUserInviteEmail({email: ''})))
      .catch(e => {
        console.log(e);
      })
  }
}
