import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducers';
import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducers';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from './app-reducer';
import {AuthActionsType, authReducer} from '../features/Login/auth-reducer';

let rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>

type AllActionsType = TasksActionsType | TodolistsActionsType | AppActionsType | AuthActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>

// @ts-ignore
window.store = store