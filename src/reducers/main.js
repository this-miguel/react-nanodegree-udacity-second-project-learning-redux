import {GET_CATEGORIES} from '../actions/AsychActions'
const initial = {
  categories: null
}

export default function mainReducer (state = initial, action) {
  switch (action.type) {
    case GET_CATEGORIES : {
      return {
        ...state,
        categories: action.categories
      }
    }
    default :
    return state
  }
}