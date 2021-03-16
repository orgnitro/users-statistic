import { SET_VISIBLE_BUTTONS, ADD_TOTAL_INFO } from '../actions/types'


const initialState = {
  pagesID: [],
  pageToRender: []
}

export default function page(state = initialState, action) {
  switch (action.type) {

    case ADD_TOTAL_INFO:
      return {
        ...state,
        pageToRender: action.payload
      }

    case SET_VISIBLE_BUTTONS:
      return {
        ...state,
        visibleButtons: action.payload
      }
      
    default:
      return state;
  }
}