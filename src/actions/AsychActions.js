import api from '../utils/api'
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_POSTS      = "GET_POSTS";

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