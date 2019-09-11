import {STORE_TAGS} from '../constants';

const INITIAL_STATE = [];

const saveTags = (state, action) => (
  [...state, ...action.data]
)

const similarTags = (state, action) => {

}

const tagReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case STORE_TAGS: {
      return saveTags(state, action);
    }
    default: return state;
  }
}

export default tagReducer;