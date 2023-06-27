
//reducer
const initialState = {
    status: 'idle' as RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.requestStatus}
        default:
            return state
    }
}

//actions
export const switchRequestStatus = (requestStatus: RequestStatusType) => ({type: 'APP/SET-STATUS', requestStatus}as const)

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
export type AppActionsType = ReturnType<typeof switchRequestStatus>