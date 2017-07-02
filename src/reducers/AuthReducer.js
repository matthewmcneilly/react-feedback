import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_START,
  LOGOUT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  isAuthenticated: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_START:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        isAuthenticated: true
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Authenticaton Failed.',
        password: '',
        isAuthenticated: false
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
