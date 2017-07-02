import { actionTypes as types } from '../actions/project';
import { getUsersForProject } from './Entities';

const INITIAL_STATE = {
  isLoading: false,
  activeProject: undefined,
  userInviteEmail: '',
  messages: {}
};

export default function Project(state = INITIAL_STATE, action) {
  const reducerActions = {
    [types.SET_ROUTE_LOADING_STATUS]: () => {
      return {
        ...state,
        isLoading: action.isLoading
      };
    },
    [types.SET_ACTIVE_PROJECT]: () => {
      return {
        ...state,
        activeProject: action.projectId
      };
    },
    [types.SET_USER_INVITE_EMAIL]: () => {
      return {
        ...state,
        userInviteEmail: action.email
      }
    },
    [types.SET_DISCUSSION_MESSAGES]: () => {
      return {
        ...state,
        messages: action.messages
      }
    }
  };
  return reducerActions[action.type] ? reducerActions[action.type](state, action) : state;
}

// Selectors
export const isLoading = state => state.project.isLoading;
export const getActiveProjectId = state => state.project.activeProject;
export const getUsers = state => getUsersForProject(state, getActiveProjectId(state));
export const getInviteEmail = state => state.project.userInviteEmail;
export const getDiscussionMessages = state => state.project.messages;
