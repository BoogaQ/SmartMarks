import {combineReducers} from 'redux';
import bookmarkReducer from './bookmarkReducer';
import tagReducer from './tagReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers ({
  bookmarkState: bookmarkReducer,
  tagState: tagReducer,
  projectState: projectReducer,
});

export default rootReducer;