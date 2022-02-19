import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import barberReducer from './Reducers/barberReducer'

let store = createStore(barberReducer,applyMiddleware(thunk))

export default store