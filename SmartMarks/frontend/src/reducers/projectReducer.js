import {STORE_PROJECTS} from '../constants';

const INITIAL_STATE = [];

const saveProjects = (state, action) => (
  [...state, ...action.data]
)
const projectReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case STORE_PROJECTS : {
      return saveProjects(state, action);
    }
    default: return state;
  }
}

export default projectReducer;