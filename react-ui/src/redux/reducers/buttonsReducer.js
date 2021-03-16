import { SET_VISIBLE_BUTTONS, SET_ACTIVE_BUTTON } from '../actions/types'

const initialState = {
  visibleButtons: [],
  activeButton: 1
}

export default function button(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBLE_BUTTONS:
      return {
        ...state,
        visibleButtons: action.payload
      }
    case SET_ACTIVE_BUTTON:
      return {
        ...state,
        activeButton: action.payload
      }
    default:
      return state;
  }
}