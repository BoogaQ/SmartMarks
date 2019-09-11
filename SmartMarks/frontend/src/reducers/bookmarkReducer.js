import {STORE_BOOKMARKS} from '../constants';
import {SIMILAR_TAGS} from '../constants';
import {SORT} from '../constants';

const INITIAL_STATE = [];

const saveBookmarks = (state, action) => {
  let newState = [...action.data];
  console.log(newState);
  return newState;
}

const bookmarkSort = (state, action) => {
  let newState = [...state];
  console.log(action.sortType);
  switch(action.sortType) {
    case "OLDEST" : {
      newState.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      console.log(newState);
      break;
    }
    case "LATEST" : {
      newState.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      console.log(newState);
      break;
    }
  }
  console.log(newState);
  return newState;
}

const similarBookmarks = (state, action) => {
  console.log(action.tag);
  let newState = [];
  state.forEach((bookmark) => {
    bookmark.tags.forEach(tag => {
      tag.id == action.tag ? newState.push(bookmark) : console.log("nothing");
    })
  })
  return newState;
}

const bookmarkReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case STORE_BOOKMARKS : {
      return saveBookmarks(state, action);
      break;
    }
    case SORT : {
      return bookmarkSort(state, action);
      break;
    }
    case SIMILAR_TAGS : {
      return similarBookmarks(state, action);
    }
    default: return state;
  }
}

export default bookmarkReducer;