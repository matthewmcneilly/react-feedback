import { actionTypes as types } from '../actions/projects';

const INITIAL_STATE = {
  isLoading: false,
  projects: {},
  showModal: false,
  newProject: {
    title: '',
    description: ''
  }
};

export default function Projects(state = INITIAL_STATE, action) {
  const reducerActions = {
    [types.SET_ROUTE_LOADING_STATUS]: () => {
      return {
        ...state,
        isLoading: action.isLoading
      };
    },
    [types.RECEIVE_PROJECTS]: () => {
      return {
        ...state,
        projects: {
          ...state.projects,
          ...action.projects
        }
      };
    },
    [types.SET_MODAL_VISIBILITY]: () => {
      return {
        ...state,
        showModal: action.isVisible
      };
    },
    [types.SET_FIELD_VALUE]: () => {
      return {
        ...state,
        newProject: {
          ...state.newProject,
          [action.field]: action.value
        }
      };
    },
    [types.RESET_FORM]: () => {
      return {
        ...state,
        newProject: {
          ...INITIAL_STATE.newProject
        }
      }
    }
  };
  return reducerActions[action.type] ? reducerActions[action.type](state, action) : state;
}

// Selectors
export const isLoading = state => state.projects.isLoading;
export const getShowModal = state => state.projects.showModal;
export const getNewProject = state => state.projects.newProject;
