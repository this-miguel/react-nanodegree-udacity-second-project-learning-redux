import {
  GET_CATEGORIES,
  GET_POSTS
} from "../actions/AsychActions";

const initial = {
  categories: null,
  posts: null
}

export default function mainReducer (state = initial, action) {
  switch (action.type) {
    case GET_CATEGORIES :
      return {
        ...state,
        categories: action.categories
      }
    case GET_POSTS :
      return {
        ...state,
        posts: action.posts
      }

    default :
    return state
  }
}