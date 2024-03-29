//reducer
import {AppThunk} from '../../app/store';
import {switchRequestStatus} from '../../app/app-reducer';
import {authAPI, LoginModelType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {clearTodosData} from '../TodolistsList/todolists-reducers';

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }

}

//actions
export const isLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunks
export const login = (loginModel: LoginModelType): AppThunk => (dispatch) => {
    dispatch(switchRequestStatus('loading'))
    authAPI.login(loginModel)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(isLoggedIn(true))
                dispatch(switchRequestStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logOut = (): AppThunk => (dispatch) => {
    dispatch(switchRequestStatus('loading'))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(isLoggedIn(false))
                dispatch(switchRequestStatus('succeeded'))
                dispatch(clearTodosData())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
//types

type InitialStateType = {
    isLoggedIn: boolean
}

export type AuthActionsType = ReturnType<typeof isLoggedIn>