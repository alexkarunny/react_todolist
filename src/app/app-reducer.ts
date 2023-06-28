
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

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
type InitialStateType = {
    status: RequestStatusType
    error: ErrorType
}
export type AppActionsType = ReturnType<typeof switchRequestStatus> | ReturnType<typeof setAppError>