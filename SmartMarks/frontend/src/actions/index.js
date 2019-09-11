import {STORE_BOOKMARKS} from '../constants';
import {STORE_TAGS} from '../constants';
import {STORE_PROJECTS} from '../constants';

export const storeBookmarks = data => ({
  type: STORE_BOOKMARKS,
  data
})

export const storeTags = data => ({
  type: STORE_TAGS,
  data
})

export const storeProjects = data => ({
  type: STORE_PROJECTS,
  data
})




