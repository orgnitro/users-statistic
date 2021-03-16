import { GET_MAIN_DATA, SET_PAGES_ID } from '../actions/types'


const initialState = {
  mainUserData: [],
  pagesID: [],
}

export default function data(state = initialState, action) {
  switch (action.type) {

    case GET_MAIN_DATA:
      return {
        ...state,
        mainUserData: action.payload
      }

      case SET_PAGES_ID:
        return {
          ...state,
          pagesID: action.payload
        }
        
    default:
      return state;
  }
}