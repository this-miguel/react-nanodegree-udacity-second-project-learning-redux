import api from '../utils/api'
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_POSTS      = "GET_POSTS";
export const GET_POSTS_BY_CATEGORY      = "GET_POSTS_BY_CATEGORY";

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