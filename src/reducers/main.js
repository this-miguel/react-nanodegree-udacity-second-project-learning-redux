import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POSTS_BY_CATEGORY
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
    case GET_POSTS_BY_CATEGORY :
      return {
        ...state,
        [action.category]: action.posts
      }

    default :
    return state
  }
}