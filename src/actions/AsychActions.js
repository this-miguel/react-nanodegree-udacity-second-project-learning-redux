import api from '../utils/api'
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_POSTS      = "GET_POSTS";
export const GET_POSTS_BY_CATEGORY      = "GET_POSTS_BY_CATEGORY";
export const GET_COMMENTS_FOR_POST      = "GET_COMMENTS_FOR_POST";
export const GET_POST_DETAILS           = "GET_POST_DETAILS";
export const GET_COMMENT_DETAILS        = "GET_COMMENT_DETAILS";
export const POSTED_POST                = "POSTED_POST";
export const POSTED_COMMENT             = "POSTED_COMMENT";
export const POST_WAS_VOTED             = "POST_WAS_VOTED";
export const POST_UPDATED               = "POST_UPDATED";
export const POST_DELETED               = "POST_DELETED";
export const COMMENT_DELETED            = "COMMENT_DELETED";
export const COMMENT_UPDATED            = "COMMENT_UPDATED";

export const getCategories = ({categories}) => (
  {
    type: GET_CATEGORIES,
    categories
  }
);

export const asyncGetCategories = (dispatch) => () => {
  api
    .fetchCategories()
    .then(categories => dispatch(getCategories(categories)))
};

export const getPosts = (posts) => (
  {
    type: GET_POSTS,
    posts
  }
);

export const asyncGetPosts = (dispatch) => () => {
  api
    .fetchPosts()
    .then(posts  => dispatch(getPosts(posts)))
};

export const getPostsByCategory = (posts, category) => (
  {
    type: GET_POSTS_BY_CATEGORY,
    posts: posts,
    category: category
  }
);

export const asyncGetPostsByCategory = (dispatch) => (category) => {
  api
    .fetchPostsByCategory(category)
    .then(posts  => dispatch(getPostsByCategory(posts, category)))
};

export const getCommentsForAPost = (postId, comments) => (
  {
    type: GET_COMMENTS_FOR_POST,
    comments: comments,
    postId: postId
  }
);

export const asyncGetCommentsForAPost = (dispatch) => (postId) => {
  api
    .fetchCommentsForAPost(postId)
    .then(comments => dispatch(getCommentsForAPost(postId, comments)))
};

export const voteForAPost = (post) => (
  {
    type: POST_WAS_VOTED,
    post
  }
);

export const asyncVoteForAPost = (dispatch) => (postId, option) => {
  api
    .voteForAPost(postId, option)
    .then(data => dispatch(voteForAPost(data)))
};

export const getPostDetails = (postId, details) => (
  {
    type: GET_POST_DETAILS,
    details: details,
    postId: postId
  }
);

export const asyncGetPostDetails = (dispatch) => (postId) => {
  api
    .fetchPostDetails(postId)
    .then(details => dispatch(getPostDetails(postId, details)))
};

export const updatePost = (data) => (
  {
    type: POST_UPDATED,
    post: data,
  }
);

export const asyncUpdatePost = (dispatch) => ( data ) => {
  api
    .updatePost(data)
    .then(data => dispatch(updatePost(data)))
};

export const deletePost = ({status, statusText, postId}) => (
  {
    type: POST_DELETED,
    status,
    statusText,
    postId
  }
);

export const asyncDeletePost = (dispatch) => ( data ) => {
  api
    .deletePost(data)
    .then(data => dispatch(deletePost(data)))
};

export const deleteComment = ({ data: comment, status, statusText }) => (
  {
    type: COMMENT_DELETED,
    comment,
    status,
    statusText
  }
);

export const asyncDeleteComment = (dispatch) => ( data ) => {
  api
    .deleteComment(data)
    .then(data => dispatch(deleteComment(data)))
};

export const getCommentDetails = (details) => (
  {
    type: GET_COMMENT_DETAILS,
    details: details,
  }
);

export const updateComment = (data) => (
  {
    type: COMMENT_UPDATED,
    comment: data,
  }
);

export const asyncUpdateComment = (dispatch) => ( data ) => {
  api
    .updateComment(data)
    .then(data => dispatch(updateComment(data)))
};

export const asyncGetCommentDetails = (dispatch) => (commentId) => {
  api
    .fetchCommentDetails(commentId)
    .then(details => dispatch(getCommentDetails(details)))
};

export const sentPost = ({data, status, statusText}) => (
  {
    type: POSTED_POST,
    post: data,
    status,
    statusText
  }
);

export const asyncSendPost = (dispatch) => (postData) => {
  api
    .sendPost(postData)
    .then(data => dispatch(sentPost(data)))
};

export const sentComment = ({data, status, statusText}) => (
  {
    type: POSTED_COMMENT,
    comment: data,
    status,
    statusText
  }
);

export const asyncSendComment = (dispatch) => (commentData) => {
  api
    .sendComment(commentData)
    .then(data => dispatch(sentComment(data)))
};