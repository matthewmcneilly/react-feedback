import { actionTypes as types } from '../actions/note';
import { getNoteById } from '../reducers/Entities';

const INITIAL_STATE = {
  isLoading: false,
  activeNoteId: undefined
};

export default function Note(state = INITIAL_STATE, action) {
  const reducerActions = {
    [types.SET_ROUTE_LOADING_STATUS]: () => {
      return {
        ...state,
        isLoading: action.isLoading
      };
    },
    [types.SET_ACTIVE_NOTE]: () => {
      return {
        ...state,
        activeNoteId: action.noteId
      };
    }
  };
  return reducerActions[action.type] ? reducerActions[action.type](state, action) : state;
}

// Selectors
export const isLoading = state => state.note.isLoading;
export const getActiveNoteId = state => state.note.activeNoteId;
export const getNote = state => {
  const id = getActiveNoteId(state);
  const note = getNoteById(state, id);
  return note;
}
