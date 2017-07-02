import firebase from 'firebase';
import { browserHistory } from 'react-router';
import { getNote, updateNote } from './entities';

export const actionTypes = {
  SET_ROUTE_LOADING_STATUS: 'note_set_route_loading_state',
  SET_ACTIVE_NOTE: 'note_set_active_note'
};

export const setRouteLoadingStatus = ({isLoading}) => {
  return {
    type: actionTypes.SET_ROUTE_LOADING_STATUS,
    isLoading
  };
}

export const setActiveNote = ({noteId}) => {
  return {
    type: actionTypes.SET_ACTIVE_NOTE,
    noteId
  };
}

export const loadRoute = ({noteId}) => {
  return dispatch => {
    dispatch(setActiveNote({noteId}));
    dispatch(setRouteLoadingStatus({isLoading: true}));
    dispatch(getNote({noteId}))
      .then(() => dispatch(setRouteLoadingStatus({isLoading: false})))
      .catch((e) => console.log(e))
  }
}

export const saveNote = ({note}) => {
  return dispatch => {
    dispatch(updateNote({note}));
  }
}
