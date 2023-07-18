import {AppThunk} from './store';
import {authAPI} from '../api/todolists-api';
import {isLoggedIn} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

//reducer
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.requestStatus}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//actions
export const switchRequestStatus = (requestStatus: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    requestStatus
} as const)
export const setAppError = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitialized = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized}as const)

//thunks
export const initializeApp = (): AppThunk => (dispatch) => {
    dispatch(switchRequestStatus('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(isLoggedIn(true))
                dispatch(switchRequestStatus('succeeded'))
                dispatch(setIsInitialized(true))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(isLoggedIn(false))
                dispatch(setIsInitialized(true))
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
            dispatch(isLoggedIn(false))
            dispatch(setIsInitialized(true))
        })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
type InitialStateType = {
    status: RequestStatusType
    error: ErrorType
    isInitialized: boolean
}
export type AppActionsType = ReturnType<typeof switchRequestStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitialized>
