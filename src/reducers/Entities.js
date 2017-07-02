import { actionTypes as types } from '../actions/entities';

const INITIAL_STATE = {
  projects: {
    byId: {},
    newProject: {
      title: '',
      description: ''
    }
  },
  activeUser: {},
  notes: {
    byId: {},
    newNote: {}
  },
  users: {
    byId: {}
  }
};

export default function Entities(state = INITIAL_STATE, action) {
  const reducerActions = {
    [types.SET_ACTIVE_USER_ID]() {
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          uid: action.uid
        }
      }
    },
    [types.RECEIVE_ACTIVE_USER]() {
      return {
        ...state,
        activeUser: {
          ...action.activeUser
        }
      }
    },
    [types.RECEIVE_PROJECTS]: () => {
      return {
        ...state,
        projects: {
          ...state.projects,
          byId: {
            ...state.projects.byId,
            ...action.projects
          }
        }
      };
    },
    [types.RECEIVE_PROJECT]: () => {
      return {
        ...state,
        projects: {
          ...state.projects,
          byId: {
            ...state.project,
            [action.projectId] : {...action.project}
          }
        }
      };
    },
    [types.RECEIVE_NOTES]: () => {
      return {
        ...state,
        notes: {
          ...state.notes,
          byId: {
            ...state.notes.byId,
            ...action.notes
          }
        }
      };
    },
    [types.RECEIVE_NOTE]: () => {
      return {
        ...state,
        notes: {
          ...state.notes,
          byId: {
            ...state.notes.byId,
            [action.noteId]: {...action.note}
          }
        }
      };
    },
    [types.RECEIVE_USERS]: () => {
      return {
        ...state,
        users: {
          ...state.users,
          byId: {
            ...state.users.byId,
            ...action.users
          }
        }
      };
    },
  };

  return reducerActions[action.type] ? reducerActions[action.type](state, action) : state;
}

// Selectors
export const getActiveUser = state => state.entities.activeUser;
export const getActiveUserId = state => state.entities.activeUser.uid;

export const getProjects = state => {
  const projectData = state.entities.projects.byId;
  return Object.keys(projectData).map(key => {
    return { id: key, ...projectData[key] }
  });
}

export const getProject = (state, id) => {
  return state.entities.projects.byId[id];
}

export const getNotesById = (state, noteIds) => {
  const allNotes = state.entities.notes.byId;
  const notes = noteIds.map(id => allNotes[id]);
  return notes;
}

export const getNoteById = (state, noteId) => {
  return state.entities.notes.byId[noteId];
}

export const getUserById = (state, userId) => {
  return state.entities.users.byId[userId];
}

export const getUsersForProject = (state, projectId) => {
  if (!projectId) {
    return [];
  }
  const { users } = getProject(state, projectId);
  return Object.keys(users).map(userId => getUserById(state, userId));
}
