import firebase from 'firebase';
import { setRouteLoadingStatus } from './projects';
import { getActiveUserId } from '../reducers/Entities';
import get from 'lodash/get';

// Redux Actions - JavaScript objects that sends/dispatches payloads of
// information to the Redux Store. Must always contain a type property
// i.e. type of action to be performed

export const actionTypes = {
  SET_ACTIVE_USER_ID: 'entities_set_active_user_id',
  RECEIVE_ACTIVE_USER: 'entities_receive_active_user',
  RECEIVE_PROJECTS: 'entities_receive_projects',
  RECEIVE_PROJECT: 'entities_receive_project',
  RECEIVE_NOTES: 'entities_receive_notes',
  RECEIVE_NOTE: 'entities_receive_note',
  RECEIVE_USERS: 'entities_receive_users'
};

export const receiveProjects = ({projects}) => {
  return {
    type: actionTypes.RECEIVE_PROJECTS,
    projects
  };
}

export const receiveProject = ({project, projectId}) => {
  return {
    type: actionTypes.RECEIVE_PROJECT,
    project,
    projectId
  };
}

export const receiveNotes = ({notes}) => {
  return {
    type: actionTypes.RECEIVE_NOTES,
    notes
  };
}

export const receiveNote = ({note, noteId}) => {
  return {
    type: actionTypes.RECEIVE_NOTE,
    note,
    noteId
  };
}

export const receiveUsers = ({users}) => {
  return {
    type: actionTypes.RECEIVE_USERS,
    users
  };
}

export const updateNote = ({note}) => {
  return (dispatch, getState) => {
    return firebase.database().ref(`notes/${note.id}`)
      .update({
        ...note
      }).then(_ => {
        dispatch(receiveNote({note, noteId: note.id}))
      }).catch(e => {
        console.log(e);
      })
  }
}

export const getNote = ({noteId}) => {
  return (dispatch, getState) => {
    return firebase.database().ref(`notes/${noteId}`)
      .once('value')
      .then(note => {
        return { ...note.val(), id: note.key };
      })
      .then(note => dispatch(receiveNote({note, noteId: note.id})))
      .catch(e => console.log(e))
  }
}

export const getNotesForProject = ({projectId, noteIds}) => {
  return (dispatch, getState) => {

    const projectNoteIds = get(getState(), `entities.projects.byId.${projectId}.notes`, {});
    return firebase.database().ref(`notes`)
      .once('value')
      .then(notesSnapshot => {
        const notes = {};
        notesSnapshot.forEach(function(note) {
          const noteKey = note.key;
          if(projectNoteIds[noteKey]) {
            notes[noteKey] = {...note.val(), id: noteKey};
          }
        });
        return notes;
      })
      .then(notes => dispatch(receiveNotes({notes})))
      .catch(e => console.log(e))
  }
}

export const getUsersForProject = ({projectId}) => {
  return (dispatch, getState) => {

    const projectUserIds = get(getState(), `entities.projects.byId.${projectId}.users`, {});
    return firebase.database().ref(`users`)
      .once('value')
      .then(snapshot => {
        const users = {};
        snapshot.forEach(function(user) {
          const userKey = user.key;
          if(projectUserIds[userKey]) {
            users[userKey] = {...user.val(), id: userKey};
          }
        });
        return users;
      })
      .then(users => dispatch(receiveUsers({users})))
      .catch(e => console.log(e))
  }
}

export const getProjects = () => {
  return (dispatch, getState) => {
    // Get the actuve User Id from redux
    const uid = getActiveUserId(getState());

    // Get the actuve users projects by id
    firebase.database().ref(`/users/${uid}`)
    .on('value', snapshot => {
      console.log({uid, snapshot})
      const userSnapshot = snapshot.val();
      console.log({userSnapshot})
      dispatch(receiveActiveUser({activeUser: {uid, ...userSnapshot}}));
      const projectIds = userSnapshot.projects || {};

      // For each project id get project content.
      firebase.database().ref('/projects')
      .on('value', snapshot => {
        const projects = {};
        snapshot.forEach(function(projectSnapshot) {
          const projectKey = projectSnapshot.key;
          if (projectIds[projectKey]) {
            projects[projectKey] = projectSnapshot.val()
          }
        });
        dispatch(receiveProjects({projects}));
        dispatch(setRouteLoadingStatus({isLoading: false}));
      })
    });
  };
};

export const getProject = ({projectId}) => {
  return (dispatch, getState) => {
    const uid = getActiveUserId(getState());

    return firebase.database()
      .ref(`/users/${uid}`)
      .once('value')
      .then(snapshot => {
        const userSnapshot = snapshot.val();
        dispatch(receiveActiveUser({activeUser: {uid, ...userSnapshot}}));
        return userSnapshot.projects;
      })
      .then(projects => {
        return firebase.database()
          .ref(`/projects/${projectId}`)
          .once('value')
          .then(snapshot => {
            if (!projects[projectId]) {
              return;
            }

            const project = snapshot.val();
            return dispatch(receiveProject({project, projectId}));
          });
      })
      .catch(e => console.log(e))
  };
};

export const receiveActiveUser = ({activeUser}) => {
  return {
    type: actionTypes.RECEIVE_ACTIVE_USER,
    activeUser
  }
}

export const setActiveUserId = ({uid}) => {
  return {
    type: actionTypes.SET_ACTIVE_USER_ID,
    uid
  }
}
export const getActiveUser = (uid) => {
  return (dispatch, getState) => {
    firebase.database().ref(`/users/${uid}`)
    .on('value', snapshot => {
      dispatch(
        receiveActiveUser({activeUser: {uid, ...snapshot.val()}})
      );
    });
  }
}
