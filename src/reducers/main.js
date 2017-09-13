import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_COMMENTS_FOR_POST,
  GET_POST_DETAILS,
  GET_COMMENT_DETAILS
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

    case GET_COMMENTS_FOR_POST :

      const {comments, postId} =  action

      return {
        ...state,
        [`${postId}Comments`]: comments
      }

    case GET_POST_DETAILS :

      return postDetailsReducer(state, action)

    case GET_COMMENT_DETAILS :

      return commentDetailsReducer(state, action)

    default :
    return state
  }
}

function postDetailsReducer(state, action) {
  const {details, postId} =  action

  return {
    ...state,
    [`${postId}Details`]: details
  }
}

function commentDetailsReducer(state, action) {
  const {details} =  action

  return {
    ...state,
    ['commentDetails']: details
  }
}