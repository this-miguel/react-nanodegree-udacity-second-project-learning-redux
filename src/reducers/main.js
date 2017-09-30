import categoriesReducer from './categories';
import postsReducer      from './posts';
import commentsReducer   from './comments';
import modalReducer      from './modal';

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

// This is to be able to access all parts of the state inside any reducer, and to not be constraint with names by combineReducers().
export default function mainReducer(state = initial, action) {

  let newState;

  newState = categoriesReducer(state, action);
  newState = postsReducer(newState, action);
  newState = commentsReducer(newState, action);
  newState = modalReducer(newState, action);

  return newState;

}