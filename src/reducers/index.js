import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import Project from './Project';
import Projects from './Projects';
import Signup from './Signup';
import Entities from './Entities';
import Note from './Note';

export default combineReducers({
  auth: AuthReducer,
  projects: Projects,
  project: Project,
  signup: Signup,
  entities: Entities,
  note: Note
});
