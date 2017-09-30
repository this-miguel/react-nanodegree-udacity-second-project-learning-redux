import { normalize, schema } from 'normalizr';
import {
  GET_COMMENTS_FOR_POST,
  GET_COMMENT_DETAILS,
  POSTED_COMMENT,
  COMMENT_UPDATED,
  COMMENT_DELETED,
  COMMENT_WAS_VOTED,
  statusOK
} from "../actions/AsychActions";

export default function commentsReducer(state= {}, action)  {
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