import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import combinedReducer from './reducers'
// import { mainDataReducer } from './reducers/mainDataReducer'

const initialState = {
  // mainUserData: []
}

const store = createStore(
  combinedReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store