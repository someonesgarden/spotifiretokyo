import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {tasksReducer} from "../redux"

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    app: tasksReducer
})
export default createRootReducer
