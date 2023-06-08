import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todolistsReducer} from './todolists-reducers';
import {tasksReducer} from './tasks-reducers';
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store