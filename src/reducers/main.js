import { normalize, schema } from 'normalizr';
import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_COMMENTS_FOR_POST,
  GET_POST_DETAILS,
  GET_COMMENT_DETAILS
} from "../actions/AsychActions";

const initial = {
  categories: {},
  categoriesIds: [],
  posts: {},
  postIds: [],
  comments: {},

}

// This will just add an id key to the data equal to the key name,
// just to be able to pass this to normalize.
function prepareCategoryDataForNormalizer(rawData) {

  return {
    categories: rawData.map((e) => (
      {
        ...e, id: e.name
      }
    ))
  }

}

export default function mainReducer(state = initial, action)  {
  switch (action.type) {

    case GET_CATEGORIES :

      const  data = prepareCategoryDataForNormalizer(action.categories)

      const category = new schema.Entity('categories')
      const categoriesSchema = { categories: [ category ] }

      const normalizedData =  normalize(data, categoriesSchema)

      return {
        ...state,
        categories: normalizedData.entities.categories,
        categoriesIds: normalizedData.result.categories

      }

    case GET_POSTS :

      const post = new schema.Entity('posts')
      const postsSchema = { posts: [ post ] }
      const normalizePostsData = normalize({ posts: action.posts }, postsSchema)

      return {
        ...state,
        posts: normalizePostsData.entities.posts,
        postsIds: normalizePostsData.result.posts
      }

    case GET_POSTS_BY_CATEGORY :
      return {
        ...state,
        [action.category]: action.posts
      }

    case GET_COMMENTS_FOR_POST :

      const {comments, postId} =  action
      const comment = new schema.Entity('comments');
      const commentsSchema = { comments: [ comment] }
      const commentsNormalizedData = normalize({comments: comments }, commentsSchema)

      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]:{
            ...state.posts[postId],
            comments: commentsNormalizedData.result.comments
          }
        },
        comments: {...state.comments, ...commentsNormalizedData.entities.comments }
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
    posts: {
      ...state.posts,
      [postId]: {
        ...state.posts[postId],
        ...details // We cannot simply replace the post content with the details because the post could have a key 'comments' : [ comments ids ].
      }
    }
  }
}

function commentDetailsReducer(state, action) {
  const {details} =  action

  return {
    ...state,
    ['commentDetails']: details
  }
}