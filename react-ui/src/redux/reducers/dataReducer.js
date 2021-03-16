import {GET_MAIN_DATA} from '../actions/types'


const initialState = {
  mainUserData: []
}

 export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_DATA: 
    return {
      mainUserData: action.payload
    }
    default:
      return state;
  }
}