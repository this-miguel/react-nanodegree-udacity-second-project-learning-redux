import { normalize, schema } from 'normalizr';
import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_COMMENTS_FOR_POST,
  GET_POST_DETAILS,
  GET_COMMENT_DETAILS,
  POSTED_POST,
  POST_WAS_VOTED,
  POSTED_COMMENT,
  POST_UPDATED,
  COMMENT_UPDATED,
  POST_DELETED,
  COMMENT_DELETED,
  COMMENT_WAS_VOTED,
} from "../actions/AsychActions";

import {
  SETUP_MODAL,
  SHOW_MODAL,
  CLEAR_AND_CLOSE_MODAL
} from "../actions/modalActions";

const initial = {
  categories: {},
  categoriesIds: [],
  posts: {},
  postsIds: [],
  comments: {},
  activeModal: null,
  selectedComment: null,
  selectedPost: null
};

const statusOK = 200;

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

// This is to be able to access all parts of the state inside any reducer, and to not be constraint with names by combineReducers().
export default function mainReducer(state = initial, action) {

  let newState;

  newState = categoriesReducer(state, action);
  newState = postsReducer(newState, action);
  newState = commentsReducer(newState, action);
  newState = modalReducer(newState, action);

  return newState;

}

function categoriesReducer(state = {}, action) {
  switch (action.type) {

    case GET_CATEGORIES :

      const data = prepareCategoryDataForNormalizer(action.categories);

      const category = new schema.Entity('categories');
      const categoriesSchema = {categories: [category]};

      const normalizedData = normalize(data, categoriesSchema);

      return {
        ...state,
        categories: normalizedData.entities.categories,
        categoriesIds: normalizedData.result.categories

      };

    default :
      return state

  }
}


function postsReducer(state = {}, action) {

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

function commentsReducer(state= {}, action)  {
  switch (action.type) {

    case GET_COMMENTS_FOR_POST :

      const {comments, postId} =  action;
      const comment = new schema.Entity('comments');
      const commentsSchema = { comments: [ comment] };
      const commentsNormalizedData = normalize({comments: comments }, commentsSchema);

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
      };

    case COMMENT_UPDATED :

      return commentUpdatedReducer(state, action);

    case COMMENT_WAS_VOTED :

      return commentVotedReducer(state, action);


    case COMMENT_DELETED :

      return commentDeletedReducer(state, action);

    case GET_COMMENT_DETAILS :

      return commentDetailsReducer(state, action);

    case POSTED_COMMENT :

      return postedCommentReducer(state, action);

    default :
    return state
  }
}

function modalReducer(state = {}, action){

  switch (action.type) {

    case CLEAR_AND_CLOSE_MODAL :
        return {
          ...state,
          activeModal: null,
          selectedComment: null,
          selectedPost: null
        };

    case SHOW_MODAL :
        const { key } = action;
      return {
        ...state,
        activeModal: key
      };

    case SETUP_MODAL :
        const { commentId, postId: _postId } = action;
      return {
        ...state,
        selectedComment: commentId,
        selectedPost: _postId
      };

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

function commentDetailsReducer(state, action) {
  const {comment}       =  action;
  const {id: commentId} =  comment;

  return {
    ...state,
    comments: {
      ...state.comments,
      [commentId]: {
        ...state.comments[commentId],
        ...comment
      }
    }
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

function commentVotedReducer(state, action) {
  const { comment } = action;
  const { id: commentId, voteScore} =  comment;

  return {
    ...state,
    comments: {
      ...state.comments,
      [commentId]: {
        ...state.comments[commentId],
        voteScore
      }
    }
  }
}

function postedCommentReducer(state, action) {
  const { comment, status} =  action;
  const { id: commentId, parentId: postId } = comment;

  if (status === statusOK) {

    return {
      ...state,
      comments: {
        ...state.comments,
        [commentId]: comment
      },
      posts: {
        ...state.posts,
        [postId] :{
          ...state.posts[postId],
          comments: state.posts[postId].comments
            ? [ ...state.posts[postId].comments, commentId ]
            : [ commentId ]

        }
      }
    }

  } else {
    return state
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

function commentUpdatedReducer(state, action) {
  const { comment } = action;
  const { id: commentId } = comment;

  return {
    ...state,
    comments: {
      ...state.comments,
      [commentId]: {
        ...state.comments[commentId],
        ...comment
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

function commentDeletedReducer(state, action) {

  const {status, comment} = action;
  const {id: commentId, parentId} = comment;

  if (status === statusOK) {
    return {
      ...state,
      comments: {
        ...state.comments,
        [commentId]: {
          ...comment
        }
      },
      posts: {
        [parentId]: {
          ...state.posts[parentId],
          comments: state.posts[parentId].comments.filter((commentIdOld) => (commentIdOld !== commentId))
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