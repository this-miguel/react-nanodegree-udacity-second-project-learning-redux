import { normalize, schema } from 'normalizr';
import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_POST_DETAILS,
  POSTED_POST,
  POST_WAS_VOTED,
  POST_UPDATED,
  POST_DELETED,
  statusOK
} from "../actions/AsychActions";

export default function postsReducer(state = {}, action) {

  switch (action.type) {

    case GET_POSTS :

      return getPostsReducer(state, action);

    case GET_POSTS_BY_CATEGORY :

      return postByCategoryReducer(state, action);

    case  POSTED_POST :

      return postedPostReducer(state, action);

    case GET_POST_DETAILS :

      return postDetailsReducer(state, action);

    case POST_WAS_VOTED :

      return postVotedReducer(state, action);

    case POST_UPDATED :

      return postUpdatedReducer(state, action);

    case POST_DELETED :

      return postDeletedReducer(state, action);

    default :
      return state
  }

}

function postDetailsReducer(state, action) {
  const {details, postId} =  action;

  return {
    ...state,
    posts: {
      ...state.posts,
      [postId]: {
        ...state.posts[postId],
        ...details // We cannot simply replace the post content with the details because the post could have a key 'comments' : [ comments ids ].
      }
    },
    postsIds: [ ...state.postsIds, postId ]
  }
}

function getPostsReducer(state, action) {
  const post = new schema.Entity('posts');
  const postsSchema = { posts: [ post ] };
  const normalizePostsData = normalize({ posts: action.posts }, postsSchema);

  return {
    ...state,
    posts: normalizePostsData.entities.posts,
    postsIds: normalizePostsData.result.posts
  };
}

function postedPostReducer(state, action) {
  const { post, status} =  action;
  const { id: postId } = post;

  if (status === statusOK) {
    return {
      ...state,
      posts: {
        ...state.posts,
        [postId]: post
      },
      postsIds: [ ...state.postsIds, postId ]
    }
  } else {
    return state
  }
}

function postVotedReducer(state, action) {
  const { post } = action;
  const { id: postId, voteScore} =  post;

  return {
    ...state,
    posts: {
      ...state.posts,
      [postId]: {
        ...state.posts[postId],
        voteScore
      }
    }
  }
}

function postUpdatedReducer(state, action) {
  const { post } = action;
  const { id: postId } = post;

  return {
    ...state,
    posts: {
      ...state.posts,
      [postId]: {
        ...state.posts[postId],
        ...post
      }
    }
  }
}

function postDeletedReducer(state, action) {
  const {status, postId} = action;
  if (status === statusOK){
    return {
      ...state,
      posts: {
        ...state.posts,
        [postId]: {
          ...state.posts[postId],
          deleted: true
        }
      }
    }
  } else {
    return state
  }
}

function postByCategoryReducer(state, action) {
  const post = new schema.Entity('posts');
  const postsSchema = { posts: [ post ] };
  const normalizePostsData = normalize({ posts: action.posts }, postsSchema);

  return {
    ...state,
    posts: { ...state.posts, ...normalizePostsData.entities.posts },
    //just makes sure no duplicate Ids are added.
    postsIds: Array.from(new Set([ ...state.postsIds, ...normalizePostsData.result.posts ]))
  };

}