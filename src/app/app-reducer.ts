import {AppThunk} from './store';
import {authAPI} from '../api/todolists-api';
import {isLoggedIn} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

//reducer
const initialState:InitialStateType  = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.requestStatus}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const switchRequestStatus = (requestStatus: RequestStatusType) => ({type: 'APP/SET-STATUS', requestStatus}as const)
export const setAppError = (error: ErrorType) => ({type: 'APP/SET-ERROR', error }as const)

//thunks
export const initializeApp = (): AppThunk => (dispatch) => {
    dispatch(switchRequestStatus('loading'))
    authAPI.me()
        .then(res => {
            debugger
            if(res.data.resultCode === 0) {
                dispatch(isLoggedIn(true))
                dispatch(switchRequestStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(isLoggedIn(false))
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
            dispatch(isLoggedIn(false))
        })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
type InitialStateType = {
    status: RequestStatusType
    error: ErrorType
}
export type AppActionsType = ReturnType<typeof switchRequestStatus> | ReturnType<typeof setAppError>