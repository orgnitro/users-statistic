import { combineReducers } from 'redux'
import data from './dataReducer'
import page from './pagesReducer'
import button from './buttonsReducer'

export default combineReducers({
  data,
  page,
  button
})