import api from '../utils/api'
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_POSTS      = "GET_POSTS";
export const GET_POSTS_BY_CATEGORY      = "GET_POSTS_BY_CATEGORY";
export const GET_COMMENTS_FOR_POST      = "GET_COMMENTS_FOR_POST";
export const GET_POST_DETAILS           = "GET_POST_DETAILS";

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