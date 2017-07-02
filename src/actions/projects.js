import firebase from 'firebase';
import { browserHistory } from 'react-router';
import { getProjects } from './entities';

export const actionTypes = {
  SET_ROUTE_LOADING_STATUS: 'projects_set_route_loading_state',
  SET_MODAL_VISIBILITY: 'projects_set_modal_visibility',
  SET_FIELD_VALUE: 'projects_set_field_value',
  RESET_FORM: 'projects_reset_form'
};


export const setFieldValue = ({field, value}) => {
  return {
    type: actionTypes.SET_FIELD_VALUE,
    field,
    value
  };
}

export const resetForm = () => {
  return {
    type: actionTypes.RESET_FORM
  };
}

export const setModalVisibility = ({isVisible}) => {
  return {
    type: actionTypes.SET_MODAL_VISIBILITY,
    isVisible
  };
}

export const setRouteLoadingStatus = ({isLoading}) => {
  return {
    type: actionTypes.SET_ROUTE_LOADING_STATUS,
    isLoading
  };
}

export const loadRoute = () => {
  console.log({browserHistory})
  return dispatch => {
    dispatch(setRouteLoadingStatus({isLoading: true}));
    dispatch(getProjects());
  }
}

export const createNewProject = () => {
  return (dispatch, getState) => {
    const fields = getState().projects.newProject;
    const uid = getState().entities.activeUser.uid;

    return firebase.database()
      .ref('/discussions')
      .push({
        messages: {},
        title: ''
      })
      .then(discussion => {
        return firebase.database().ref('/projects')
          .push({
            ...fields,
            createdOn: new Date().getTime(),
            owner: uid,
            discussion: discussion.key,
            users: {
              [uid]: true
            }
          })
          .then((projectId) => {

            firebase.database().ref(`/users/${uid}/projects`)
              .update({
                [projectId.key]: true
              }).then(() => {
                console.log({browserHistory, history})
                dispatch(setModalVisibility({isVisible: false}));
                dispatch(resetForm())
              }).catch(e => console.log(e))
          })
      })
      .catch(e => console.log(e))
  }
}
