import { actionTypes as types } from '../actions/signup';

const INITIAL_STATE = {
  form: {
    email: '',
    password: '',
    BCode: ''
  }
};

export default function Signup(state = INITIAL_STATE, action) {
  const reducerActions = {
    [types.SET_FIELD_VALUE]: () => {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value
        }
      };
    },
    [types.RESET_FORM]: () => {
      return {
        ...state,
        form: {
          ...INITIAL_STATE.form
        }
      }
    }
  };
  return reducerActions[action.type] ? reducerActions[action.type](state, action) : state;
}

// Selectors
