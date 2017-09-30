import {
  SETUP_MODAL,
  SHOW_MODAL,
  CLEAR_AND_CLOSE_MODAL
} from "../actions/modalActions";

export default function modalReducer(state = {}, action){

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