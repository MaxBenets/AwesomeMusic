import {createStore, combineReducers, applyMiddleware} from "redux"
import {musicReducer} from "./reducers/music_reducer"
import Middleware from "redux-thunk"

let reducers = combineReducers({
   music: musicReducer
})

export const store = createStore(reducers, applyMiddleware(Middleware))

window.store = store